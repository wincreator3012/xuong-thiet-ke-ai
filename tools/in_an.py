#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""IN ẤN: biến PDF RGB do trình duyệt xuất (tools/ve.py) thành PDF in CMYK đúng chuẩn nhà in.

Các bước (đã kiểm trong nghiên cứu nghien-cuu/D-toolchain.md, B-print-stage.md):
  1. pikepdf: đặt MediaBox đúng khổ (Chromium làm tròn tới 0,2 mm), thêm TrimBox (thành phẩm) và BleedBox (tràn lề).
  2. pikepdf: đổi màu xám trung tính RGB (r=g=b) sang DeviceGray để chữ đen nằm trọn bản K (không thành đen 4 màu).
  3. Ghostscript: đổi sang CMYK theo hồ sơ màu nhà in. Ghostscript >= 10.06: PDF/X-4 (giữ trong suốt, chữ sống).
     Bản cũ hơn: trang không có trong suốt -> PDF/X-3; có trong suốt -> PDF CMYK 1.6 không gắn nhãn X (nhà in VN vẫn nhận).
  4. Kiểm: phông nhúng đủ, không còn màu RGB, tổng mực tối đa (TAC), tỉ lệ ảnh.

Dùng trực tiếp:  python3 tools/in_an.py <RGB.pdf> --tt a4-ngang [--ho-so japan2011]
Thường được tools/ve.py gọi khi có cờ --in.
"""
import argparse
import os
import re
import shutil
import subprocess
import sys
sys.dont_write_bytecode = True  # không để __pycache__ trong repo
import tempfile

TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)
PT = 72 / 25.4

HO_SO = {
    # id: (tên tệp, OutputConditionIdentifier, mô tả, TAC tối đa %)
    'japan2001': ('JapanColor2001Coated.icc', 'JC200103', 'Japan Color 2001 Coated', 350),
    'japan2001-khong-trang': ('JapanColor2001Uncoated.icc', 'JCN200104', 'Japan Color 2001 Uncoated', 310),
    'japan2011': ('JapanColor2011Coated.icc', 'Japan Color 2011 Coated', 'Japan Color 2011 Coated (JCS2011)', 350),
    'fogra39': ('ISOcoated_v2_eci.icc', 'FOGRA39', 'Offset, coated paper (ISO Coated v2)', 330),
    'fogra39-300': ('ISOcoated_v2_300_eci.icc', 'FOGRA39', 'Offset, coated paper, TAC 300% (ISO Coated v2 300%)', 300),
    'pso3': ('PSOcoated_v3.icc', 'FOGRA51', 'PSO Coated v3', 300),
    'pso-khong-trang': ('PSOuncoated_v3_FOGRA52.icc', 'FOGRA52', 'PSO Uncoated v3', 300),
}
MAC_DINH = 'japan2011'
NOI_TIM_ICC = [os.path.join(GOC, 'in-an', 'icc'), '/usr/share/color/icc', '/usr/share/color/icc/colord',
               '/Library/ColorSync/Profiles', os.path.expanduser('~/Library/ColorSync/Profiles'),
               '/Library/Application Support/Adobe/Color/Profiles/Recommended']


def tim_icc(ho_so):
    ten = HO_SO[ho_so][0]
    for d in NOI_TIM_ICC:
        p = os.path.join(d, ten)
        if os.path.exists(p):
            return p
    return None


def tim_gs():
    ung_vien = [os.environ.get('XUONG_GS', ''), os.path.expanduser('~/.cache/xuong-gs/bin/gs'), '/opt/homebrew/bin/gs',
                '/usr/local/bin/gs', shutil.which('gs') or '']
    tot = None
    for g in ung_vien:
        if g and os.path.exists(g):
            try:
                v = subprocess.run([g, '--version'], capture_output=True, text=True, timeout=20).stdout.strip()
                so = tuple(int(x) for x in re.findall(r'\d+', v)[:2])
            except Exception:
                continue
            if tot is None or so > tot[1]:
                tot = (g, so, v)
    return tot


def _hop(W, H, y0, tra):
    return {'/MediaBox': [0, y0, W, y0 + H], '/BleedBox': [0, y0, W, y0 + H],
            '/TrimBox': [tra, y0 + tra, W - tra, y0 + H - tra]}


def sua_pdf(src, dst, tt):
    """Khổ trang đúng, TrimBox/BleedBox, xám trung tính -> DeviceGray. Trả về số lệnh màu đã đổi."""
    import pikepdf
    s = tt.get('tiLeThietKe', 1)
    tra = tt.get('traMm', 0) / s * PT
    W = tt['wMm'] / s * PT + 2 * tra
    H = tt['hMm'] / s * PT + 2 * tra
    n = 0

    def doi(dong_lenh):
        nonlocal n
        ra = []
        for toan_hang, lenh in dong_lenh:
            t = str(lenh)
            if t in ('rg', 'RG') and len(toan_hang) == 3:
                r, g, b = (float(x) for x in toan_hang)
                if max(r, g, b) - min(r, g, b) < 0.003:
                    ra.append(([r], pikepdf.Operator('g' if t == 'rg' else 'G')))
                    n += 1
                    continue
            ra.append((toan_hang, lenh))
        return ra

    with pikepdf.open(src) as pdf:
        da_xem = set()

        def form(res):
            for _, xo in (res.get('/XObject') or {}).items():
                if xo.get('/Subtype') == '/Form' and xo.objgen not in da_xem:
                    da_xem.add(xo.objgen)
                    xo.write(pikepdf.unparse_content_stream(doi(pikepdf.parse_content_stream(xo))))
                    if '/Resources' in xo:
                        form(xo.Resources)
        for trang in pdf.pages:
            y0 = float(trang.mediabox[3]) - H
            for k, v in _hop(W, H, y0, tra).items():
                trang[pikepdf.Name(k)] = pikepdf.Array(v)
            trang.Contents = pdf.make_stream(pikepdf.unparse_content_stream(doi(pikepdf.parse_content_stream(trang))))
            if '/Resources' in trang:
                form(trang.Resources)
        pdf.save(dst)
    return n, (W, H, tra)


def co_trong_suot(pdf_path):
    import pikepdf
    with pikepdf.open(pdf_path) as pdf:
        for o in pdf.objects:
            if isinstance(o, pikepdf.Dictionary):
                if o.get('/Type') == '/ExtGState':
                    for k in ('/ca', '/CA'):
                        if k in o and float(o[k]) < 0.999:
                            return True
                    if '/SMask' in o and str(o['/SMask']) != '/None':
                        return True
                    if '/BM' in o and str(o['/BM']) not in ('/Normal', '/Compatible'):
                        return True
                if o.get('/Subtype') == '/Image' and '/SMask' in o:
                    return True
    return False


def tep_pdfx(gs, icc, oc_id, oc_mo_ta, tieu_de, ra):
    lib = subprocess.run([gs, '-q', '-dNODISPLAY', '-dNOSAFER', '-c',
                          '(PDFX_def.ps) findlibfile {pop ==} {pop (none) ==} ifelse quit'],
                         capture_output=True, text=True).stdout.strip().strip('()')
    if not lib or lib == 'none' or not os.path.exists(lib):
        raise RuntimeError('Không tìm thấy PDFX_def.ps của Ghostscript')
    s = open(lib, encoding='latin-1').read()
    s = re.sub(r'/ICCProfile \(.*?\) def', f'/ICCProfile ({icc}) def', s)
    s = re.sub(r'/OutputConditionIdentifier \(.*?\)', f'/OutputConditionIdentifier ({oc_id})', s)
    s = re.sub(r'/OutputCondition \(.*?\)', f'/OutputCondition ({oc_mo_ta})', s)
    s = re.sub(r'/Title \(.*?\)', f'/Title ({tieu_de.encode("ascii", "replace").decode()})', s)
    open(ra, 'w', encoding='latin-1').write(s)


def kiem_pdf(p, gs, tac_toi_da):
    import pikepdf
    kq = {'phongChuaNhung': [], 'conRGB': 0, 'tacToiDa': None, 'pdfx': None, 'outputIntent': None}
    with pikepdf.open(p) as pdf:
        kq['pdfx'] = str(pdf.docinfo.get('/GTS_PDFXVersion', '')) or None
        oi = pdf.Root.get('/OutputIntents')
        if oi:
            kq['outputIntent'] = str(oi[0].get('/OutputConditionIdentifier', ''))
        for trang in pdf.pages:
            fonts = (trang.Resources.get('/Font') or {}) if '/Resources' in trang else {}
            for ten, f in fonts.items():
                fd = f.get('/FontDescriptor')
                if fd is None and '/DescendantFonts' in f:
                    fd = f.DescendantFonts[0].get('/FontDescriptor')
                if f.get('/Subtype') != '/Type3' and fd is not None and not any(k in fd for k in ('/FontFile', '/FontFile2', '/FontFile3')):
                    kq['phongChuaNhung'].append(str(f.get('/BaseFont', ten)))
            for toan_hang, lenh in pikepdf.parse_content_stream(trang):
                if str(lenh) in ('rg', 'RG'):
                    kq['conRGB'] += 1
    # tổng mực: dựng thô CMYK 40 dpi rồi lấy giá trị lớn nhất
    try:
        with tempfile.TemporaryDirectory() as td:
            tif = os.path.join(td, 'tac.tif')
            subprocess.run([gs, '-q', '-dSAFER', '-dNOPAUSE', '-dBATCH', '-sDEVICE=tiff32nc', '-r40', '-o', tif, p],
                           check=True, capture_output=True, timeout=180)
            from PIL import Image
            import numpy as np
            a = np.asarray(Image.open(tif)).astype('float32')
            tong = a.sum(axis=2) / 255 * 100
            kq['tacToiDa'] = round(float(np.percentile(tong, 99.9)), 1)
            kq['tacVuot'] = kq['tacToiDa'] > tac_toi_da
    except Exception as e:  # không chặn việc in vì bước kiểm phụ
        kq['loiTac'] = str(e)[:200]
    return kq


def lam_pdf_in(pdf_rgb, tt, ho_so=None, ten='an-pham'):
    """pdf_rgb: PDF do trình duyệt xuất (đã gồm tràn lề). Trả về báo cáo, tệp ra cạnh tệp vào."""
    ho_so = ho_so or MAC_DINH
    if ho_so not in HO_SO:
        raise SystemExit(f'Hồ sơ in "{ho_so}" không có; chọn: {", ".join(HO_SO)}')
    icc = tim_icc(ho_so)
    if not icc:
        thay = next((h for h in ('japan2011', 'fogra39', 'pso3') if tim_icc(h)), None)
        if not thay:
            raise SystemExit('Không tìm thấy tệp hồ sơ màu CMYK nào. Xem chuan/03-in-an.md mục "Hồ sơ màu" để tải.')
        print(f'  ! Không có hồ sơ {ho_so}, tạm dùng {thay}. Nhà in yêu cầu hồ sơ nào thì đặt tệp .icc vào in-an/icc/.')
        ho_so, icc = thay, tim_icc(thay)
    ten_icc, oc_id, oc_mo_ta, tac = HO_SO[ho_so]
    g = tim_gs()
    if not g:
        raise SystemExit('Chưa có Ghostscript. Mac: brew install ghostscript; sandbox: bash tools/cai-gs.sh')
    gs, phien_ban, chu_pb = g
    goc, _ = os.path.splitext(pdf_rgb)
    ra = re.sub(r'-RGB$', '', goc) + f'-IN-CMYK-{ho_so}.pdf'
    bao = {'hoSo': ho_so, 'icc': icc, 'ghostscript': chu_pb}
    with tempfile.TemporaryDirectory() as td:
        sua = os.path.join(td, 'sua.pdf')
        n, (W, H, tra) = sua_pdf(pdf_rgb, sua, tt)
        bao['denThanhK'] = n
        trong_suot = co_trong_suot(sua)
        bao['coTrongSuot'] = trong_suot
        if phien_ban >= (10, 6):
            che_do = ['-dPDFX=4']
            bao['chuan'] = 'PDF/X-4'
        elif not trong_suot:
            che_do = ['-dPDFX']
            bao['chuan'] = 'PDF/X-3'
        else:
            che_do = ['-dCompatibilityLevel=1.6']
            bao['chuan'] = 'PDF CMYK 1.6 (không gắn nhãn PDF/X vì Ghostscript < 10.06 sẽ dàn phẳng trang có trong suốt thành ảnh)'
        lenh = [gs, '-q', '-dNOPAUSE', '-dBATCH', '-dSAFER', f'--permit-file-read={os.path.dirname(icc)}/',
                '-sDEVICE=pdfwrite', *che_do, '-sColorConversionStrategy=CMYK', '-sProcessColorModel=DeviceCMYK',
                f'-sOutputICCProfile={icc}', '-dRenderIntent=1', '-dBlackPtComp=1', '-dEmbedAllFonts=true',
                '-dSubsetFonts=true', '-dAutoRotatePages=/None', '-dAutoFilterColorImages=false',
                '-dColorImageFilter=/DCTEncode', '-dJPEGQ=95', '-dDownsampleColorImages=false', f'-sOutputFile={ra}']
        if any(x.startswith('-dPDFX') for x in che_do):
            dfile = os.path.join(td, 'PDFX_def.ps')
            tep_pdfx(gs, icc, oc_id, oc_mo_ta, ten, dfile)
            lenh += [f'--permit-file-read={td}/', dfile]
        lenh.append(sua)
        r = subprocess.run(lenh, capture_output=True, text=True)
        if r.returncode != 0:
            raise RuntimeError('Ghostscript lỗi: ' + (r.stderr or r.stdout)[-800:])
    # gắn lại hộp trang (một số chế độ của Ghostscript bỏ TrimBox)
    import pikepdf
    with pikepdf.open(ra, allow_overwriting_input=True) as pdf:
        for trang in pdf.pages:
            y0 = float(trang.mediabox[1])
            for k, v in _hop(W, H, y0, tra).items():
                if k != '/MediaBox':
                    trang[pikepdf.Name(k)] = pikepdf.Array(v)
        pdf.save(ra)
    bao['kiem'] = kiem_pdf(ra, gs, tac)
    bao['tep'] = ra
    k = bao['kiem']
    print(f'  PDF in: {os.path.basename(ra)} | {bao["chuan"]} | hồ sơ {ho_so} | đen->K: {n} lệnh'
          f' | TAC ~{k.get("tacToiDa")}% (giới hạn {tac}%) | RGB còn lại: {k["conRGB"]}'
          + (f' | PHÔNG CHƯA NHÚNG: {k["phongChuaNhung"]}' if k['phongChuaNhung'] else ''))
    return bao


def main():
    sys.path.insert(0, TOOLS)
    import ve
    ap = argparse.ArgumentParser(description='PDF RGB từ trình duyệt -> PDF in CMYK')
    ap.add_argument('pdf')
    ap.add_argument('--tt', required=True, help='id thể thức in trong kho (để biết khổ, tràn lề)')
    ap.add_argument('--ho-so', default=MAC_DINH, choices=list(HO_SO))
    a = ap.parse_args()
    lam_pdf_in(a.pdf, ve.giai_the_thuc(a.tt), a.ho_so, os.path.basename(a.pdf))


if __name__ == '__main__':
    main()
