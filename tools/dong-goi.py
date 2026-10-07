#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ĐÓNG GÓI DỰ ÁN ĐÃ DUYỆT: đưa bản cuối trong Thành phẩm về dạng tự đủ, rồi dọn nháp của dự án.

Vòng đời một dự án: làm trong <thuMucDuAn>/<YYYY-MM tên>/, xuất bản cuối (ve.py không --nhap) vào
<thuMucThanhPham>/<YYYY-MM tên>/NN <ấn phẩm>/, người dùng nói "duyệt", rồi:

    python3 tools/dong-goi.py "<dự án>"              # xem: việc sẽ làm (không ghi gì)
    python3 tools/dong-goi.py "<dự án>" --lam        # đóng gói: đánh số thư mục chưa có số, chép báo cáo nghiệm thu,
                                                     #   tạo DANG.md (khuôn) cho từng ấn phẩm; Claude điền DANG.md
    python3 tools/dong-goi.py "<dự án>" --don        # liệt kê nháp sẽ dọn (nhap/, thiet-ke/_phien-ban/, _to_delete/, xuat/)
    python3 tools/dong-goi.py "<dự án>" --don --xoa  # xoá thật (chỉ sau khi người dùng duyệt và đã cho quyền xoá)

"<dự án>" là tên thư mục trong thuMucDuAn (đủ hoặc một phần duy nhất), hoặc đường dẫn.
Giữ lại ở hồ sơ dự án: BRIEF.md, SO-GOP-Y.md, nguon/, anh/, thiet-ke/*.json (đủ để dựng lại bất cứ lúc nào).
Mỗi thư mục ấn phẩm trong Thành phẩm sau đóng gói: ảnh, PDF mọi thể thức, <ấn phẩm>-bao-cao.json (nghiệm thu máy),
DANG.md (văn bản thay thế, lời đăng gợi ý, lưu ý đăng hoặc gửi in). Anh sao lưu cả dự án bằng cách dời MỘT thư mục.
"""
import argparse
import datetime
import json
import os
import re
import shutil
import sys
sys.dont_write_bytecode = True  # không để __pycache__ trong repo

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ve  # noqa: E402

SO = re.compile(r'^(\d{2}) (.+)$')
NHAP = ('nhap', os.path.join('thiet-ke', '_phien-ban'), '_to_delete', 'xuat')

DANG = """# Đăng: {ten}

Dự án: {du_an}. Đóng gói {ngay}. Claude điền các mục dưới khi đóng gói; người dùng xem lại trước khi đăng hoặc gửi in.

## Tệp

| Tệp | Thể thức | Điểm ảnh |
|---|---|---|
{bang}

Nghiệm thu máy: `{bao_cao}`{ghi_chu_bc}

## Văn bản thay thế [alt text]

(Một hai câu tả hình cho người không nhìn thấy: ai, đang làm gì, chữ chính trên hình nguyên văn.)

## Lời đăng gợi ý

(Theo skill viết của người dùng; dòng đầu tự đứng được; kết bằng một câu hỏi mở thật nếu là bài chia sẻ.)

## Lưu ý đăng hoặc gửi in

(Kênh, khổ nào cho kênh nào, nguồn ảnh cần ghi, giờ đăng; với bản in: nhà in, giấy, hồ sơ màu, số lượng.)
"""


def tim_du_an(ten):
    if os.path.isdir(ten):
        return os.path.abspath(ten)
    goc = ve.duong_cau_hinh('thuMucDuAn')
    if not goc or not os.path.isdir(goc):
        sys.exit('Chưa biết thư mục dự án: điền thuMucDuAn trong cau-hinh.json hoặc truyền đường dẫn')
    ds = [d for d in sorted(os.listdir(goc)) if not d.startswith(('_', '.')) and os.path.isdir(os.path.join(goc, d))]
    if ten in ds:
        return os.path.join(goc, ten)
    khop = [d for d in ds if ten.lower() in d.lower()]
    if len(khop) != 1:
        sys.exit(f'Không xác định được dự án "{ten}" ({len(khop)} khớp): ' + '; '.join(khop or ds))
    return os.path.join(goc, khop[0])


def thu_muc_tp(du_an):
    tp = ve.duong_cau_hinh('thuMucThanhPham', 'XUONG_THANH_PHAM')
    if not tp:
        sys.exit('Chưa đặt thuMucThanhPham trong cau-hinh.json')
    return os.path.join(tp, os.path.basename(os.path.normpath(du_an)))


def danh_so(cha, lam):
    """Thư mục ấn phẩm chưa có số: đánh tiếp theo thứ tự thời gian tạo (giữ số đã có)."""
    con = [d for d in os.listdir(cha) if os.path.isdir(os.path.join(cha, d)) and not d.startswith(('.', '_'))]
    co_so = [int(SO.match(d).group(1)) for d in con if SO.match(d)]
    chua = sorted([d for d in con if not SO.match(d)], key=lambda d: os.path.getmtime(os.path.join(cha, d)))
    n = max(co_so) if co_so else 0
    ra = [(os.path.join(cha, d), d) for d in sorted(con) if SO.match(d)]
    for d in chua:
        n += 1
        moi = f'{n:02d} {d}'
        print(f'  đánh số: {d} -> {moi}')
        if lam:
            os.rename(os.path.join(cha, d), os.path.join(cha, moi))
        ra.append((os.path.join(cha, moi if lam else d), moi))
    return sorted(ra, key=lambda x: x[1])


def bang_tep(thu_muc, ten, bc):
    hang = []
    tt = (bc or {}).get('theThuc', {})
    for f in sorted(os.listdir(thu_muc)):
        if not re.search(r'\.(png|jpe?g|pdf|webp|tiff?)$', f, re.I):
            continue
        goc = os.path.splitext(f)[0]
        ma = goc[len(ten) + 1:] if goc.startswith(ten + '-') else ''
        ma_tt = next((k for k in tt if ma == k.replace(':', '_') or ma.startswith(k.replace(':', '_') + '-')), None)
        ten_tt = tt[ma_tt]['ten'] if ma_tt else ''
        dien = ''
        try:
            from PIL import Image
            if not f.lower().endswith('.pdf'):
                with Image.open(os.path.join(thu_muc, f)) as im:
                    dien = f'{im.width}x{im.height}'
        except Exception:
            pass
        hang.append(f'| `{f}` | {ten_tt or ma or "-"} | {dien or "-"} |')
    return '\n'.join(hang) or '| (chưa có tệp) | | |'


def dong_goi(du_an, ds, lam):
    for p, d in ds:
        ten = SO.match(d).group(2)
        nguon_bc = os.path.join(du_an, 'nhap', ten, f'{ten}-bao-cao.json')
        dich_bc = os.path.join(p, f'{ten}-bao-cao.json')
        bc = None
        if os.path.exists(nguon_bc):
            bc = json.load(open(nguon_bc, encoding='utf-8'))
            if not os.path.exists(dich_bc) or os.path.getmtime(nguon_bc) > os.path.getmtime(dich_bc):
                print(f'  {d}: chép báo cáo nghiệm thu' + (' (lượt dựng NHÁP: xuất lại bản cuối để có báo cáo của bản cuối)' if bc.get('banNhap') else ''))
                if lam:
                    shutil.copy2(nguon_bc, dich_bc)
        elif os.path.exists(dich_bc):
            bc = json.load(open(dich_bc, encoding='utf-8'))
        else:
            print(f'  {d}: KHÔNG có báo cáo nghiệm thu (dựng lại bằng ve.py để có)')
        dang = os.path.join(p, 'DANG.md')
        if not os.path.exists(dang):
            print(f'  {d}: tạo DANG.md (khuôn, Claude điền)')
            if lam:
                ghi_chu = ''
                if bc and bc.get('banNhap'):
                    ghi_chu = f' (báo cáo của lượt dựng nháp {bc.get("luc", "")}, cùng file ấn phẩm)'
                if bc:
                    n_cb = sum(len(v.get('canhBao', [])) for v in bc.get('theThuc', {}).values()) + len(bc.get('kiemChu', []))
                    ghi_chu += f'; {n_cb} cảnh báo.'
                open(dang, 'w', encoding='utf-8').write(DANG.format(
                    ten=ten, du_an=os.path.basename(du_an), ngay=datetime.date.today().isoformat(),
                    bang=bang_tep(p, ten, bc), bao_cao=f'{ten}-bao-cao.json' if bc else 'chưa có', ghi_chu_bc=ghi_chu))
        else:
            print(f'  {d}: đã có DANG.md (giữ nguyên)')


def don(du_an, xoa):
    tong = 0
    ds = []
    for c in NHAP:
        p = os.path.join(du_an, c)
        if os.path.exists(p):
            n = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(p) for f in fs)
            tong += n
            ds.append((p, n))
            print(f'  nháp: {os.path.relpath(p, du_an)}  {n / 1048576:.1f} MB')
    ban_cuoi = set()
    cha = thu_muc_tp(du_an)
    if os.path.isdir(cha):
        ban_cuoi = {SO.match(d).group(2) if SO.match(d) else d for d in os.listdir(cha)}
    for f in sorted(os.listdir(os.path.join(du_an, 'thiet-ke'))) if os.path.isdir(os.path.join(du_an, 'thiet-ke')) else []:
        if f.endswith('.json') and os.path.splitext(f)[0] not in ban_cuoi:
            print(f'  lưu ý: thiet-ke/{f} chưa có bản cuối trong Thành phẩm (phương án nháp; file ấn phẩm vẫn giữ để dựng lại)')
    if not ds:
        print('  không còn nháp nào')
        return
    print(f'  tổng {tong / 1048576:.1f} MB; giữ BRIEF.md, SO-GOP-Y.md, nguon/, anh/, thiet-ke/*.json')
    if xoa:
        for p, _ in ds:
            ve.chan_ghi_repo(p, 'thư mục dọn')
            shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)
        print('ĐÃ DỌN')
    else:
        print('(Xem trước. Người dùng duyệt và cho quyền xoá thì chạy lại với --don --xoa.)')


def main():
    ap = argparse.ArgumentParser(description='Đóng gói dự án đã duyệt vào Thành phẩm và dọn nháp.')
    ap.add_argument('du_an')
    ap.add_argument('--lam', action='store_true', help='đóng gói thật (đánh số, báo cáo, DANG.md)')
    ap.add_argument('--don', action='store_true', help='dọn nháp của dự án (xem trước; thêm --xoa để xoá)')
    ap.add_argument('--xoa', action='store_true')
    a = ap.parse_args()
    du_an = tim_du_an(a.du_an)
    print(f'Dự án: {du_an}')
    if a.don:
        don(du_an, a.xoa)
        return
    cha = thu_muc_tp(du_an)
    if not os.path.isdir(cha):
        sys.exit(f'Chưa có bản cuối: {cha} (xuất bằng ve.py không --nhap trước)')
    print(f'Thành phẩm: {cha}')
    dong_goi(du_an, danh_so(cha, a.lam), a.lam)
    if not a.lam:
        print('(Xem trước. Chạy lại với --lam để đóng gói.)')
    else:
        print('ĐÃ ĐÓNG GÓI. Claude điền DANG.md, rồi khi người dùng duyệt: --don, xin quyền xoá, --don --xoa.')


if __name__ == '__main__':
    main()
