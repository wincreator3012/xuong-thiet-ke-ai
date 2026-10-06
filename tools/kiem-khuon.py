#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KIỂM KHUÔN: dựng nháp mọi khuôn từ nội dung mẫu (khuon/<id>/mau*.json) ở mọi thể thức khai trong mẫu, gom cảnh báo.
Chạy sau mỗi lần sửa he-thong/, minh-hoa/ hay một khuôn, trước khi dùng cho ấn phẩm thật. Kết quả ở <thuMucDuAn>/_tam/kiem-khuon/ (ngoài repo, ghi đè mỗi lần chạy).

    python3 tools/kiem-khuon.py                 # mọi khuôn
    python3 tools/kiem-khuon.py thong-cao so-do-tri-thuc
    python3 tools/kiem-khuon.py --them-tt vuong,doc-9x16,ngang-16x9   # ép thêm thể thức để thử độ co giãn

ĐẠT khi: không lỗi JS, không 'tran-vung', không 'tran-chu', không 'loi-js'. Các cảnh báo khác in ra để người duyệt bằng mắt.
"""
import argparse
import glob
import json
import os
import shutil
import sys
sys.dont_write_bytecode = True  # không để __pycache__ trong repo

TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)
sys.path.insert(0, TOOLS)
import ve  # noqa: E402

NANG = {'tran-vung', 'tran-chu', 'loi-js', 'so-do'}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('khuon', nargs='*')
    ap.add_argument('--them-tt', default='')
    a = ap.parse_args()
    ra_goc = ve.thu_muc_tam('kiem-khuon')
    ds = sorted(glob.glob(os.path.join(GOC, 'khuon', '*', 'mau*.json')))
    if a.khuon:
        ds = [p for p in ds if os.path.basename(os.path.dirname(p)) in a.khuon]
    them = [x for x in a.them_tt.split(',') if x]
    loi = 0
    with ve.chon_may() as may:
        class Giu:  # giữ một trình duyệt cho mọi khuôn
            def __enter__(self):
                return may

            def __exit__(self, *x):
                pass
        for p in ds:
            khuon = os.path.basename(os.path.dirname(p))
            ten = os.path.splitext(os.path.basename(p))[0]
            ra = os.path.join(ra_goc, f'{khuon}-{ten}')
            shutil.rmtree(ra, ignore_errors=True)
            spec = ve.doc_json(p)
            tt = list(dict.fromkeys((spec.get('theThuc') or ['ig-4x5']) + them))
            print(f'== {khuon}/{os.path.basename(p)}')
            bc = ve.ve_an_pham(p, tt, ra=ra, nhap=True, may=Giu(), im_lang=True)
            for t, m in bc['theThuc'].items():
                nang = [c for c in m['canhBao'] if c['loai'] in NANG]
                khac = [c for c in m['canhBao'] if c['loai'] not in NANG]
                loi += len(nang)
                print(f'   {t:<18} {"LỖI" if nang else "đạt"}  {len(khac)} cảnh báo khác' + (f'  co {m["co"]}' if (m.get('co') or 1) < 1 else ''))
                for c in nang:
                    print(f'      ! [{c["loai"]}] {c["id"]}: {c["chiTiet"]}')
            for c in bc['kiemChu']:
                print(f'      [chữ] {c["id"]}: {c["chiTiet"]}')
    print(f'\n{"KIỂM KHUÔN: ĐẠT" if not loi else f"KIỂM KHUÔN: {loi} LỖI"}  (tờ tổng thể từng khuôn trong {ra_goc}/)')
    sys.exit(1 if loi else 0)


if __name__ == '__main__':
    main()
