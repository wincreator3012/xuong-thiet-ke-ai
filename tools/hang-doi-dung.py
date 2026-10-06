#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""HÀNG ĐỢI DỰNG: cho Claude nhờ máy thật của người dùng dựng ảnh khi nơi Claude đang chạy không có trình duyệt
(ví dụ máy ảo của Cowork). Claude xếp việc vào hàng đợi, người dùng bấm đúp "Dung tren may.command" (Mac) hoặc
"Dung tren may.bat" (Windows) một lần; máy thật dựng bằng Google Chrome hoặc Playwright rồi ghi kết quả cạnh việc.

    python3 tools/hang-doi-dung.py them <ấn phẩm.json> [--nhap] [--tt vuong,doc-9x16] [--in]   # Claude: xếp một việc
    python3 tools/hang-doi-dung.py chay [--cho 1800]                                         # máy thật: làm hết rồi chờ việc mới
    python3 tools/hang-doi-dung.py xem                                                       # xem việc đang chờ, đã xong

Hàng đợi nằm NGOÀI repo: <thuMucDuAn>/_tam/hang-doi/ (cau-hinh.json). Mỗi việc là <mã>.json; khi xong có <mã>.xong.json
(mã thoát, tóm tắt, thư mục ra). Đường dẫn ấn phẩm ghi tương đối so với repo nên máy ảo và máy thật hiểu như nhau.
"""
import argparse
import datetime
import glob
import json
import os
import subprocess
import sys
import time

sys.dont_write_bytecode = True  # không để __pycache__ trong repo
TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)
sys.path.insert(0, TOOLS)
import ve  # noqa: E402


def thu_muc():
    d = ve.thu_muc_tam('hang-doi')
    ve.chan_ghi_repo(d, 'hàng đợi dựng')
    os.makedirs(d, exist_ok=True)
    return d


def them(an_pham, tham_so):
    p = os.path.abspath(an_pham)
    if not os.path.exists(p):
        raise SystemExit(f'Không thấy ấn phẩm: {an_pham}')
    ma = datetime.datetime.now().strftime('%Y%m%d-%H%M%S-%f')[:-3]
    viec = {'anPham': os.path.relpath(p, GOC), 'thamSo': tham_so, 'taoLuc': datetime.datetime.now().isoformat(timespec='seconds')}
    ra = os.path.join(thu_muc(), ma + '.json')
    with open(ra, 'w', encoding='utf-8') as f:
        json.dump(viec, f, ensure_ascii=False, indent=2)
    print(f'Đã xếp việc {ma}: {viec["anPham"]} {" ".join(tham_so)}')
    print('Nhờ người dùng bấm đúp "Dung tren may.command" (Mac) hoặc "Dung tren may.bat" (Windows) ở gốc repo.')
    return ma


def cho_viec(d):
    return sorted(p for p in glob.glob(os.path.join(d, '*.json'))
                  if not p.endswith(('.xong.json', '.dang-chay.json')))


def lam(d, p):
    ma = os.path.basename(p)[:-5]
    dang = os.path.join(d, ma + '.dang-chay.json')
    os.replace(p, dang)
    viec = json.load(open(dang, encoding='utf-8'))
    an_pham = viec['anPham'] if os.path.isabs(viec['anPham']) else os.path.join(GOC, viec['anPham'])
    print(f'\n== {ma}: {viec["anPham"]} {" ".join(viec.get("thamSo", []))}', flush=True)
    bat_dau = time.time()
    r = subprocess.run([sys.executable, os.path.join(TOOLS, 've.py'), an_pham] + list(viec.get('thamSo', [])),
                       capture_output=True, text=True, env=dict(os.environ, PYTHONDONTWRITEBYTECODE='1'))
    dong = (r.stdout + r.stderr).strip().splitlines()
    print('\n'.join(dong[-12:]), flush=True)
    kq = dict(viec, ma=ma, maThoat=r.returncode, giay=round(time.time() - bat_dau, 1),
              xongLuc=datetime.datetime.now().isoformat(timespec='seconds'), tomTat=dong[-40:])
    with open(os.path.join(d, ma + '.xong.json'), 'w', encoding='utf-8') as f:
        json.dump(kq, f, ensure_ascii=False, indent=2)
    os.remove(dang)
    print('  XONG' if r.returncode == 0 else f'  LỖI (mã {r.returncode}): xem {ma}.xong.json', flush=True)


def chay(cho):
    d = thu_muc()
    print(f'Hàng đợi: {d}\nĐang chờ việc Claude xếp (tối đa {cho // 60} phút không có việc thì tự dừng; đóng cửa sổ để dừng ngay).', flush=True)
    for p in glob.glob(os.path.join(d, '*.dang-chay.json')):  # lần trước bị ngắt giữa chừng: làm lại
        os.replace(p, p.replace('.dang-chay.json', '.json'))
    han = time.time() + cho
    while time.time() < han:
        ds = cho_viec(d)
        if not ds:
            time.sleep(3)
            continue
        for p in ds:
            try:
                lam(d, p)
            except Exception as e:  # một việc hỏng không chặn việc khác
                print(f'  LỖI: {e}', flush=True)
        han = time.time() + cho
    print('Hết thời gian chờ, hàng đợi dừng. Bấm đúp lại khi Claude nhờ.')


def xem():
    d = thu_muc()
    for p in cho_viec(d):
        print('chờ   ', os.path.basename(p))
    for p in sorted(glob.glob(os.path.join(d, '*.dang-chay.json'))):
        print('đang  ', os.path.basename(p))
    for p in sorted(glob.glob(os.path.join(d, '*.xong.json')))[-10:]:
        k = json.load(open(p, encoding='utf-8'))
        print('xong  ' if k.get('maThoat') == 0 else 'lỗi   ', os.path.basename(p), k.get('anPham'), f'{k.get("giay")} giây')


def main():
    ap = argparse.ArgumentParser(description='Hàng đợi dựng trên máy thật của người dùng.')
    sp = ap.add_subparsers(dest='lenh', required=True)
    t = sp.add_parser('them')
    t.add_argument('an_pham')
    c = sp.add_parser('chay')
    c.add_argument('--cho', type=int, default=1800, help='số giây chờ việc mới trước khi tự dừng')
    sp.add_parser('xem')
    a, du = ap.parse_known_args()
    if a.lenh == 'them':
        them(a.an_pham, du)
    elif a.lenh == 'chay':
        chay(a.cho)
    else:
        xem()


if __name__ == '__main__':
    main()
