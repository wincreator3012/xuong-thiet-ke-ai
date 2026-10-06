#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ẢNH: khám, sửa nhẹ, tách nền, đồng bộ màu một bộ ảnh thật (chân dung, lớp học, sự kiện) trước khi đưa vào khuôn.

Triết lý: KHÁM - KÊ ĐƠN - SOI LẠI. Đa số ảnh không cần sửa; sửa thì nhỏ, tự nhiên,
có trần an toàn; người dùng duyệt bằng một ảnh so sánh trước/sau. Không đổi hình dáng mặt, thân; không làm mịn da kiểu nhựa;
không dùng ảnh do AI tạo thay cho người, lớp học, sự kiện thật (chuan/05-anh-chan-dung-lop-hoc.md).

    python3 tools/anh.py kham <ảnh...>                        # đo, phát hiện mặt, kết luận đạt hay nên sửa
    python3 tools/anh.py sua <ảnh> [--muc 0.7] [--ra out.jpg]  # chỉnh nhẹ có trần (cân trắng, sáng, tương phản, mặt, nét)
    python3 tools/anh.py so-sanh <gốc> <đã sửa>               # ảnh ghép trước | sau để duyệt
    python3 tools/anh.py tach-nen <ảnh> [--mo-hinh u2net_human_seg] [--toc]
    python3 tools/anh.py dong-bo <ảnh mẫu> <ảnh...> [--muc 0.6] # kéo màu cả bộ về gần ảnh mẫu
    python3 tools/anh.py chuan-hoa <ảnh...> [--canh-dai 3000]  # HEIC/Display P3 -> sRGB JPG, xoay đúng chiều
    python3 tools/anh.py tieu-diem <ảnh>                       # gợi ý tieuDiem [x, y] theo khuôn mặt cho file ấn phẩm
Cần: Pillow, numpy, opencv-python; tách nền cần rembg (pip install "rembg[cpu]"), chạy ở sandbox đám mây.
"""
import argparse
import io
import json
import os
import sys
sys.dont_write_bytecode = True  # không để __pycache__ trong repo

import numpy as np

os.environ.setdefault('OPENCV_LOG_LEVEL', 'ERROR')
try:
    import cv2
except Exception:
    cv2 = None
from PIL import Image, ImageCms, ImageOps, ImageDraw, ImageFont

TOOLS = os.path.dirname(os.path.abspath(__file__))


def _chan_ghi_repo(duongs):
    """Repo chỉ chứa NĂNG LỰC: ảnh xử lý ghi vào <dự án>/anh/ (hoặc --ra ngoài repo), không vào repo."""
    g = os.path.realpath(os.path.dirname(TOOLS))
    for d in duongs:
        r = os.path.realpath(os.path.abspath(os.path.expanduser(d)))
        if (r == g or r.startswith(g + os.sep)) and not os.environ.get('XUONG_CHO_PHEP_GHI_REPO'):
            sys.exit(f'DỪNG: đầu ra sẽ nằm trong repo ({d}). Chép ảnh vào <dự án>/nguon/ rồi xử lý ở đó, '
                     f'hoặc thêm --ra <đường dẫn ngoài repo>.')
YUNET = os.path.join(TOOLS, 'models', 'face_detection_yunet_2023mar.onnx')
W_LUM = np.array([0.2126, 0.7152, 0.0722], np.float32)

# trần an toàn
TRAN = {'canTrang': 1.18, 'keoMuc': 1.30, 'gamma': (0.78, 1.25), 'nangMat': 1.16, 'tuoiMau': 0.16, 'tuongPhan': 0.12}


def mo_srgb(p):
    try:
        import pillow_heif
        pillow_heif.register_heif_opener()
    except Exception:
        pass
    im = ImageOps.exif_transpose(Image.open(p))
    icc = im.info.get('icc_profile')
    alpha = im.getchannel('A') if im.mode == 'RGBA' else None
    rgb = im.convert('RGB')
    ten_ho_so = 'không nhúng (coi là sRGB)'
    if icc:
        src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        ten_ho_so = (ImageCms.getProfileDescription(src) or '').strip()
        if 'sRGB' not in ten_ho_so:
            rgb = ImageCms.profileToProfile(rgb, src, ImageCms.createProfile('sRGB'),
                                            renderingIntent=ImageCms.Intent.PERCEPTUAL, outputMode='RGB')
    return rgb, alpha, ten_ho_so


def luu(im, p, chat_luong=92):
    srgb = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
    if p.lower().endswith('.png'):
        im.save(p, icc_profile=srgb, optimize=True)
    else:
        im.convert('RGB').save(p, quality=chat_luong, subsampling=0, icc_profile=srgb, optimize=True, progressive=True)


def tuyen_tinh(x):
    return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)


def phi_tuyen(x):
    return np.where(x <= 0.0031308, x * 12.92, 1.055 * np.power(np.clip(x, 0, None), 1 / 2.4) - 0.055)


def tim_mat(rgb8):
    if cv2 is None:
        return []
    bgr = cv2.cvtColor(rgb8, cv2.COLOR_RGB2BGR)
    h, w = bgr.shape[:2]
    s = min(1.0, 1600 / max(h, w))
    nho = cv2.resize(bgr, (int(w * s), int(h * s))) if s < 1 else bgr
    if os.path.exists(YUNET):
        det = cv2.FaceDetectorYN.create(YUNET, '', (nho.shape[1], nho.shape[0]), score_threshold=0.7)
        _, f = det.detect(nho)
        if f is not None:
            return [tuple(int(v / s) for v in x[:4]) for x in f]
        return []
    cc = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    r = cc.detectMultiScale(cv2.cvtColor(nho, cv2.COLOR_BGR2GRAY), 1.1, 5)
    return [tuple(int(v / s) for v in x) for x in r]


# ------------------------------------------------------------------ KHÁM
def kham(p):
    im, alpha, ho_so = mo_srgb(p)
    a = np.asarray(im).astype(np.float32) / 255
    lum = a @ W_LUM
    h, w = lum.shape
    mx, mn = a.max(-1), a.min(-1)
    bh = (mx - mn) / (mx + 1e-6)
    p5, p50, p95 = (float(x) for x in np.percentile(lum, [5, 50, 95]))
    chay = float((a.max(-1) > 0.985).mean())
    den = float((a.max(-1) < 0.02).mean())
    giua = (lum > 0.08) & (lum < 0.9) & (bh < 0.5)
    lech = (a[giua].mean(0) - a[giua].mean()) if giua.sum() > 500 else np.zeros(3)
    mat = tim_mat((a * 255).astype(np.uint8))
    net = None
    if cv2 is not None:  # độ nét đo trên mặt lớn nhất (nền xoá phông không làm sai kết luận), không có mặt thì đo vùng giữa
        xam = cv2.cvtColor((a * 255).astype(np.uint8), cv2.COLOR_RGB2GRAY)
        if mat:
            x, y, fw, fh = max(mat, key=lambda f: f[2] * f[3])
            vung = xam[max(0, y):y + fh, max(0, x):x + fw]
            if vung.shape[0] > 400:
                vung = cv2.resize(vung, (int(vung.shape[1] * 400 / vung.shape[0]), 400))
        else:
            vung = xam[h // 4:3 * h // 4, w // 4:3 * w // 4]
        net = float(cv2.Laplacian(vung, cv2.CV_64F).var())
    mat_sang = []
    for (x, y, fw, fh) in mat:
        mat_sang.append(round(float(np.median(lum[max(0, y):y + fh, max(0, x):x + fw])), 3))
    benh = []
    if p50 < 0.30:
        benh.append('tối (trung vị độ sáng thấp)')
    if p50 > 0.68:
        benh.append('sáng quá')
    if p95 - p5 < 0.55:
        benh.append('bạc, thiếu tương phản')
    if chay > 0.04:
        benh.append(f'cháy sáng {chay:.0%} diện tích')
    if max(abs(lech)) > 0.035:
        kenh = 'đỏ' if lech[0] > max(lech[1], lech[2]) else ('xanh lục' if lech[1] > lech[2] else 'xanh dương')
        benh.append(f'có thể ám {kenh} (nhìn vùng da, áo trắng, tường để xác nhận; đừng tin số khi khung có nhiều cây cỏ hay tường màu)')
    if mat_sang and min(mat_sang) < 0.38:
        benh.append('mặt chìm, cần nâng sáng vùng mặt')
    if net is not None and net < 25:
        benh.append('mờ, rung hoặc mất nét')
    mp = w * h / 1e6
    kq = {
        'tep': p, 'kichThuoc': [w, h], 'megapixel': round(mp, 1), 'hoSoMau': ho_so, 'trongSuot': alpha is not None,
        'sang': {'p5': round(p5, 3), 'p50': round(p50, 3), 'p95': round(p95, 3)}, 'chay': round(chay, 4), 'den': round(den, 4),
        'lechKenh': [round(float(x), 3) for x in lech], 'doNet': round(net, 1) if net is not None else None,
        'mat': mat, 'sangMat': mat_sang, 'benh': benh,
        'ketLuan': 'đạt, không cần sửa' if not benh else 'nên sửa nhẹ: ' + '; '.join(benh),
        'dungDuoc': {
            'mxh 1080 px': w >= 1080 or h >= 1080,
            'in A4 300 ppi (cần ~2480x3508)': min(w, h) >= 2480 and max(w, h) >= 3508,
            'in A5 300 ppi (cần ~1748x2480)': min(w, h) >= 1748 and max(w, h) >= 2480,
            'chân dung trên phông 1:10 (cần cạnh dài >= 3000)': max(w, h) >= 3000,
        },
    }
    return kq


# ------------------------------------------------------------------ SỬA
def sua(p, ra, muc=0.7):
    im, alpha, _ = mo_srgb(p)
    a = np.asarray(im).astype(np.float32) / 255
    bc = {'muc': muc}
    # 1. cân trắng: gray-world trên vùng trung tính, trong không gian tuyến tính, có trần
    lin = tuyen_tinh(a)
    lum = lin @ W_LUM
    mx, mn = a.max(-1), a.min(-1)
    bh = (mx - mn) / (mx + 1e-6)
    m = (lum > 0.03) & (lum < 0.85) & (bh < 0.35)
    if m.sum() > 1000:
        tb = lin[m].mean(0)
        g = tb.mean() / tb
        g = 1 + muc * 0.8 * (g - 1)
        g = np.clip(g, 1 / TRAN['canTrang'], TRAN['canTrang'])
        g = g / (g @ W_LUM)
        lin = lin * g
        bc['canTrang'] = [round(float(x), 3) for x in g]
    a = np.clip(phi_tuyen(lin), 0, 1)
    # 2. kéo mức đen trắng theo độ sáng (giữ sắc độ)
    l2 = a @ np.array([0.299, 0.587, 0.114], np.float32)
    lo, hi = np.percentile(l2, [0.3, 99.7])
    lo, hi = min(lo, 0.08), max(hi, 0.85)
    k = min(1 / (hi - lo), TRAN['keoMuc'])
    k = 1 + muc * (k - 1)
    lo = lo * muc
    a = np.clip((a - lo) * k, 0, 1)
    bc['keoMuc'] = round(float(k), 3)
    # 3. phơi sáng trung tính
    med = float(np.median(a @ np.array([0.299, 0.587, 0.114], np.float32)))
    gam = np.log(0.47) / np.log(min(max(med, 0.05), 0.95))
    gam = float(np.clip(1 + muc * (gam - 1), *TRAN['gamma']))
    a = np.power(a, gam)
    bc['gamma'] = round(gam, 3)
    # 4. tương phản chữ S nhẹ
    t = TRAN['tuongPhan'] * muc
    a = (1 - t) * a + t * (a * a * (3 - 2 * a))
    # 5. nâng sáng mặt
    mat = tim_mat((a * 255).astype(np.uint8))
    bc['mat'] = len(mat)
    if mat and cv2 is not None:
        h, w = a.shape[:2]
        mask = np.zeros((h, w), np.float32)
        lum = a @ np.array([0.299, 0.587, 0.114], np.float32)
        for (x, y, fw, fh) in mat:
            fl = float(np.median(lum[max(y, 0):y + fh, max(x, 0):x + fw]))
            g = float(np.clip(0.55 / max(fl, 1e-3), 1.0, TRAN['nangMat']))
            g = 1 + muc * (g - 1)
            if g > 1.01:
                mm = np.zeros((h, w), np.float32)
                cv2.ellipse(mm, (x + fw // 2, y + fh // 2), (int(fw * 0.58), int(fh * 0.78)), 0, 0, 360, g - 1, -1)
                mask = np.maximum(mask, mm)
        mask = cv2.GaussianBlur(mask, (0, 0), max(3, w / 120))
        # chỉ nâng vùng trung và tối: tường sáng sau đầu không bị loé quầng
        trong_so = np.clip((0.82 - lum) / 0.4, 0, 1)
        a = np.clip(a * (1 + (mask * trong_so)[..., None]), 0, 1)
    # 6. tươi màu có bảo vệ màu da
    if cv2 is not None:
        hsv = cv2.cvtColor(a.astype(np.float32), cv2.COLOR_RGB2HSV)
        hh, s = hsv[..., 0], hsv[..., 1]
        tang = TRAN['tuoiMau'] * muc * (1 - s)
        da = ((hh > 5) & (hh < 50) & (s > 0.15) & (s < 0.65)).astype(np.float32)
        tang *= 1 - 0.7 * cv2.GaussianBlur(da, (0, 0), 3)
        hsv[..., 1] = np.minimum(s * (1 + tang), np.maximum(s, 0.85))
        a = np.clip(cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB), 0, 1)
        # 7. giảm nhiễu nhẹ rồi làm nét cho cỡ xuất
        a8 = cv2.fastNlMeansDenoisingColored((a * 255 + 0.5).astype(np.uint8), None, 3, 3, 7, 21)
        a = a8.astype(np.float32) / 255
        r = max(0.8, max(a.shape[:2]) / 2500)
        mo = cv2.GaussianBlur(a, (0, 0), r)
        d = a - mo
        d = np.where(np.abs(d) < 0.02, 0, d)
        a = np.clip(a + 0.4 * muc * d, 0, 1)
    out = Image.fromarray((a * 255 + 0.5).astype(np.uint8))
    if alpha is not None:
        out.putalpha(alpha)
        if not ra.lower().endswith('.png'):
            ra = os.path.splitext(ra)[0] + '.png'
    luu(out, ra)
    bc['ra'] = ra
    return bc


# ------------------------------------------------------------------ SO SÁNH
def so_sanh(goc, moi, ra=None):
    a, _, _ = mo_srgb(goc)
    b, _, _ = mo_srgb(moi)
    cao = 1000
    a = a.resize((int(a.width * cao / a.height), cao))
    b = b.resize((int(b.width * cao / b.height), cao))
    to = Image.new('RGB', (a.width + b.width + 30, cao + 70), (236, 233, 226))
    to.paste(a, (0, 70))
    to.paste(b, (a.width + 30, 70))
    d = ImageDraw.Draw(to)
    try:
        f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 30)
    except Exception:
        f = ImageFont.load_default()
    d.text((10, 18), 'TRƯỚC', fill=(40, 40, 40), font=f)
    d.text((a.width + 40, 18), 'SAU', fill=(40, 40, 40), font=f)
    ra = ra or os.path.splitext(moi)[0] + '-so-sanh.jpg'
    to.save(ra, quality=88)
    return ra


# ------------------------------------------------------------------ TÁCH NỀN
def tach_nen(p, ra=None, mo_hinh='u2net_human_seg', toc=False):
    from rembg import remove, new_session
    im, _, _ = mo_srgb(p)
    s = new_session(mo_hinh)
    kw = {'alpha_matting': True, 'alpha_matting_foreground_threshold': 240, 'alpha_matting_background_threshold': 12,
          'alpha_matting_erode_size': 8} if toc else {}
    nho = im.copy()
    if max(im.size) > 2400:
        nho.thumbnail((2400, 2400))
    o = remove(nho, session=s, **kw)
    if o.size != im.size:  # dùng mặt nạ ở cỡ nhỏ, áp vào ảnh gốc cỡ lớn
        mask = o.getchannel('A').resize(im.size, Image.LANCZOS)
        o = im.convert('RGBA')
        o.putalpha(mask)
    # làm mềm mép 1 px, cắt sát
    if cv2 is not None:
        al = np.asarray(o.getchannel('A')).astype(np.float32)
        al = cv2.GaussianBlur(al, (0, 0), 0.8)
        o.putalpha(Image.fromarray(np.clip(al, 0, 255).astype(np.uint8)))
    bb = o.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    if bb:
        o = o.crop(bb)
    ra = ra or os.path.splitext(p)[0] + '-tach.png'
    luu(o, ra)
    mat = tim_mat(np.asarray(o.convert('RGB')))
    return {'ra': ra, 'kichThuoc': o.size, 'mat': mat}


# ------------------------------------------------------------------ ĐỒNG BỘ MÀU
def dong_bo(mau, ds, muc=0.6, ra_dir=None):
    def lab(im):
        return cv2.cvtColor(np.asarray(im).astype(np.float32) / 255, cv2.COLOR_RGB2LAB)
    m, _, _ = mo_srgb(mau)
    L = lab(m)
    mt, ms = L.reshape(-1, 3).mean(0), L.reshape(-1, 3).std(0)
    ra = []
    for p in ds:
        im, alpha, _ = mo_srgb(p)
        X = lab(im)
        xt, xs = X.reshape(-1, 3).mean(0), X.reshape(-1, 3).std(0)
        tl = np.clip(ms / (xs + 1e-6), 0.85, 1.18)
        moi = (X - xt) * tl + xt + np.clip(mt - xt, [-6, -4, -4], [6, 4, 4])
        Y = X + muc * (moi - X)
        rgb = np.clip(cv2.cvtColor(Y.astype(np.float32), cv2.COLOR_LAB2RGB), 0, 1)
        out = Image.fromarray((rgb * 255 + 0.5).astype(np.uint8))
        if alpha is not None:
            out.putalpha(alpha)
        d = ra_dir or os.path.dirname(p)
        q = os.path.join(d, os.path.splitext(os.path.basename(p))[0] + ('-dong-bo.png' if alpha is not None else '-dong-bo.jpg'))
        luu(out, q)
        ra.append(q)
    return ra


def chuan_hoa(p, canh_dai=3000):
    im, alpha, ho_so = mo_srgb(p)
    if alpha is not None:
        im.putalpha(alpha)
    if max(im.size) > canh_dai:
        im.thumbnail((canh_dai, canh_dai), Image.LANCZOS)
    ra = os.path.splitext(p)[0] + ('-srgb.png' if alpha is not None else '-srgb.jpg')
    luu(im, ra)
    return {'ra': ra, 'tuHoSo': ho_so, 'kichThuoc': im.size}


def tieu_diem(p):
    im, _, _ = mo_srgb(p)
    mat = tim_mat(np.asarray(im))
    if not mat:
        return {'tieuDiem': [0.5, 0.35], 'ghiChu': 'không thấy mặt, dùng mặc định'}
    x, y, w, h = max(mat, key=lambda f: f[2] * f[3])
    return {'tieuDiem': [round((x + w / 2) / im.width, 3), round((y + h * 0.45) / im.height, 3)], 'mat': mat}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest='lenh', required=True)
    k = sp.add_parser('kham'); k.add_argument('anh', nargs='+')
    s = sp.add_parser('sua'); s.add_argument('anh'); s.add_argument('--muc', type=float, default=0.7); s.add_argument('--ra')
    c = sp.add_parser('so-sanh'); c.add_argument('goc'); c.add_argument('moi'); c.add_argument('--ra')
    t = sp.add_parser('tach-nen'); t.add_argument('anh'); t.add_argument('--ra'); t.add_argument('--mo-hinh', default='u2net_human_seg'); t.add_argument('--toc', action='store_true')
    d = sp.add_parser('dong-bo'); d.add_argument('mau'); d.add_argument('anh', nargs='+'); d.add_argument('--muc', type=float, default=0.6); d.add_argument('--ra')
    h = sp.add_parser('chuan-hoa'); h.add_argument('anh', nargs='+'); h.add_argument('--canh-dai', type=int, default=3000)
    f = sp.add_parser('tieu-diem'); f.add_argument('anh')
    a = ap.parse_args()
    if a.lenh not in ('kham', 'tieu-diem'):
        vao = a.anh if isinstance(getattr(a, 'anh', None), list) else [getattr(a, 'anh', None) or getattr(a, 'moi', None)]
        _chan_ghi_repo([a.ra] if getattr(a, 'ra', None) else [os.path.dirname(os.path.abspath(p)) for p in vao if p])
    if a.lenh == 'kham':
        out = [kham(p) for p in a.anh]
    elif a.lenh == 'sua':
        out = sua(a.anh, a.ra or os.path.splitext(a.anh)[0] + '-sua.jpg', max(0.2, min(1.0, a.muc)))
        out['soSanh'] = so_sanh(a.anh, out['ra'])
    elif a.lenh == 'so-sanh':
        out = so_sanh(a.goc, a.moi, a.ra)
    elif a.lenh == 'tach-nen':
        out = tach_nen(a.anh, a.ra, a.mo_hinh, a.toc)
    elif a.lenh == 'dong-bo':
        out = dong_bo(a.mau, a.anh, a.muc, a.ra)
    elif a.lenh == 'chuan-hoa':
        out = [chuan_hoa(p, a.canh_dai) for p in a.anh]
    else:
        out = tieu_diem(a.anh)
    print(json.dumps(out, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()
