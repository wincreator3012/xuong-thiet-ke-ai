#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""DỰ ÁN MỚI: tạo thư mục một dự án thiết kế (nháp và thành phẩm nằm NGOÀI repo).

Trên máy người dùng: dự án (nơi làm nháp) nằm trong "AI Designer/Du an", bản cuối xuất sang "AI Designer/Thanh pham/<tên dự án>/"
(cau-hinh.json > thuMucDuAn, thuMucThanhPham). Người dùng nói đẩy sang chỗ khác ở đầu cuộc trò chuyện thì dùng --goc cho phiên đó.

    python3 tools/du-an-moi.py "Khoá học mùa thu" [--goc <thư mục dự án>] [--khuon thong-cao] [--thuong-hieu chinh]

Cấu trúc tạo ra:
    <thuMucDuAn>/<YYYY-MM tên>/
      BRIEF.md          mục đích, người xem, thông điệp, thể thức, nội dung nguyên văn, chức danh, hạn (Claude điền cùng người dùng)
      SO-GOP-Y.md       góp ý của người dùng theo từng vòng
      nguon/            tư liệu người dùng đưa: ảnh gốc, logo đối tác, văn bản
      anh/              ảnh đã chuẩn hoá, sửa, tách nền (đưa vào khuôn)
      thiet-ke/         file ấn phẩm .json (nguồn sự thật; Bàn thiết kế ghi vào đây)
      nhap/             bản dựng nháp theo từng ấn phẩm (ve.py --nhap)
    Bản cuối: <thuMucThanhPham>/<YYYY-MM tên>/NN <ấn phẩm>/ (ve.py không --nhap); người dùng duyệt thì tools/dong-goi.py đóng gói và dọn nháp
"""
import argparse
import datetime
import json
import os
import re
import sys
sys.dont_write_bytecode = True  # không để __pycache__ trong repo
import unicodedata

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ve  # noqa: E402

TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)

BRIEF = """# Brief: {ten}

Tạo {ngay}. Claude điền cùng người dùng trước khi dựng; mục nào chưa rõ thì ghi "cần hỏi".

## Mục đích và người xem
- Ấn phẩm để làm gì (mời đăng ký, thông báo, chia sẻ tri thức, nhận diện sự kiện):
- Người xem là ai, họ đang ở đâu (lướt Facebook trên điện thoại, nhận qua Zalo, nhìn phông từ hàng ghế cuối):
- Sau khi xem, họ cảm, biết, làm gì:

## Thông điệp và nội dung nguyên văn
- Một câu thông điệp:
- Chữ trên ấn phẩm (nguyên văn, đã duyệt):
- Chức danh, tên người (nguyên văn, theo phong-cach/PHONG-CACH.md mục 1):
- Dữ kiện cần kiểm chứng (con số, năm, trích dẫn, tác giả framework) và nguồn:

## Hình thức
- Thương hiệu, họ màu:
- Khuôn dự kiến:
- Thể thức (số, in, sân khấu):
- Ảnh dùng (ảnh thật nào, có đồng ý chưa), minh hoạ cần vẽ:
- In ấn: nhà in, giấy, số lượng, hồ sơ màu nhà in dùng, gia công, hạn giao:

## Mốc
- Bản nháp:
- Bản duyệt:
- Đăng, in:
"""


def slug(s):
    s = unicodedata.normalize('NFC', s.strip())
    s = re.sub(r'[\\/:*?"<>|]+', '-', s)
    return re.sub(r'\s+', ' ', s)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('ten')
    ap.add_argument('--goc')
    ap.add_argument('--khuon')
    ap.add_argument('--thuong-hieu', help='id trong brand/brand.json > thuongHieu (mặc định: thuongHieuMacDinh)')
    a = ap.parse_args()
    goc = a.goc or ve.duong_cau_hinh('thuMucDuAn')
    if not goc:
        sys.exit('Chưa biết thư mục dự án: truyền --goc hoặc điền thuMucDuAn trong cau-hinh.json')
    hom_nay = datetime.date.today()
    d = os.path.join(os.path.expanduser(goc), f'{hom_nay:%Y-%m} {slug(a.ten)}')
    ve.chan_ghi_repo(d, 'thư mục dự án')
    for con in ('nguon', 'anh', 'thiet-ke', 'nhap'):
        os.makedirs(os.path.join(d, con), exist_ok=True)
    if not os.path.exists(os.path.join(d, 'BRIEF.md')):
        open(os.path.join(d, 'BRIEF.md'), 'w', encoding='utf-8').write(BRIEF.format(ten=a.ten, ngay=hom_nay.isoformat()))
    if not os.path.exists(os.path.join(d, 'SO-GOP-Y.md')):
        open(os.path.join(d, 'SO-GOP-Y.md'), 'w', encoding='utf-8').write(f'# Sổ góp ý: {a.ten}\n\nMỗi dòng: ngày - ấn phẩm, thể thức - góp ý - đã sửa thế nào.\n')
    if a.khuon:
        mau = os.path.join(GOC, 'khuon', a.khuon, 'mau.json')
        spec = json.load(open(mau, encoding='utf-8')) if os.path.exists(mau) else {'khuon': a.khuon, 'noiDung': {}}
        spec.pop('_ghiChu', None)
        spec['thuongHieu'] = a.thuong_hieu or ve.thuong_hieu_mac_dinh()
        spec['phienBan'] = 1
        ra = os.path.join(d, 'thiet-ke', f'{a.khuon}.json')
        if not os.path.exists(ra):
            json.dump(spec, open(ra, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
            print(f'Ấn phẩm khởi đầu (nội dung mẫu, cần thay): {ra}')
    print(f'Dự án: {d}')
    tp = ve.duong_cau_hinh('thuMucThanhPham', 'XUONG_THANH_PHAM')
    if tp:
        print(f'Bản cuối sẽ ra: {os.path.join(tp, os.path.basename(d))}')


if __name__ == '__main__':
    main()
