#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""BÀN THIẾT KẾ: máy chủ nhỏ để người dùng tự tay chỉnh ấn phẩm trên trình duyệt (bấm chữ để sửa, kéo thả, đổi cỡ, xoay,
thay ảnh, đổi thể thức, xuất ảnh). Chỉ dùng thư viện chuẩn của Python 3.8+: chạy được bằng python3 có sẵn trên Mac.
Người dùng mở bằng cách bấm đúp "Mo ban thiet ke.command" ở gốc repo.

    python3 tools/ban-thiet-ke.py [<file ấn phẩm .json | thư mục dự án>] [--cong 8790] [--mo]

Nguyên tắc:
  - File ấn phẩm (thiet-ke/<tên>.json) là nguồn sự thật duy nhất. Bàn chỉ ghi vào đúng file đó: nội dung vào "noiDung",
    vị trí kéo thả vào "chinhTay"[thể thức], ẩn hiện theo thể thức vào "theoTheThuc". Claude đọc lại file là thấy hết.
  - Ghi có khoá lạc quan: file đã đổi từ lúc mở (Claude vừa sửa, iCloud đồng bộ) thì từ chối ghi và hỏi người dùng.
    Mọi lần ghi chép bản cũ vào thiet-ke/_phien-ban/.
  - Chỉ nghe trên 127.0.0.1. Xuất ảnh dùng Google Chrome có sẵn trên máy (tools/ve.py, máy vẽ "chrome").
"""
import argparse
import datetime
import glob
import hashlib
import json
import mimetypes
import os
import re
import shutil
import sys
sys.dont_write_bytecode = True  # không để __pycache__ trong repo
import tempfile
import threading
import urllib.parse
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)
APP = os.path.join(TOOLS, 'ban-thiet-ke')
sys.path.insert(0, TOOLS)
import ve  # noqa: E402

KHOA = threading.Lock()
TRANG_THAI = {'duAn': None}
LOAI = {'.json': 'application/json; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
        '.html': 'text/html; charset=utf-8', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.pdf': 'application/pdf'}


def cau_hinh():
    p = os.path.join(GOC, 'cau-hinh.json')
    if os.path.exists(p):
        try:
            return ve.doc_json(p)
        except Exception:
            pass
    return {}


def trong(goc, p):
    goc = os.path.realpath(goc)
    p = os.path.realpath(p)
    return p == goc or p.startswith(goc + os.sep)


def bam(p):
    with open(p, 'rb') as f:
        return hashlib.sha1(f.read()).hexdigest()[:16]


def ds_du_an():
    goc = ve.duong_cau_hinh('thuMucDuAn') or ''
    ra = []
    if goc and os.path.isdir(goc):
        for d in sorted(os.listdir(goc)):
            td = os.path.join(goc, d, 'thiet-ke')
            if os.path.isdir(td):
                ra.append({'ten': d, 'duong': os.path.join(goc, d),
                           'anPham': sorted(os.path.basename(x) for x in glob.glob(os.path.join(td, '*.json')))})
    return {'thuMucDuAn': goc, 'duAn': ra}


class Xu(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def _gui(self, ma, du_lieu, loai='application/json; charset=utf-8'):
        if not isinstance(du_lieu, (bytes, bytearray)):
            du_lieu = json.dumps(du_lieu, ensure_ascii=False).encode('utf-8')
        self.send_response(ma)
        self.send_header('Content-Type', loai)
        self.send_header('Content-Length', str(len(du_lieu)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(du_lieu)

    def _tep(self, p):
        if not os.path.isfile(p):
            return self._gui(404, {'loi': 'không có tệp'})
        with open(p, 'rb') as f:
            d = f.read()
        self._gui(200, d, LOAI.get(os.path.splitext(p)[1].lower()) or mimetypes.guess_type(p)[0] or 'application/octet-stream')

    def _doc_than(self):
        n = int(self.headers.get('Content-Length') or 0)
        return self.rfile.read(n) if n else b''

    def do_GET(self):
        u = urllib.parse.urlsplit(self.path)
        q = dict(urllib.parse.parse_qsl(u.query))
        p = urllib.parse.unquote(u.path)
        if p in ('/', '/ban', '/ban/'):
            return self._tep(os.path.join(APP, 'index.html'))
        if p.startswith('/ban/'):
            f = os.path.join(APP, p[5:])
            return self._tep(f) if trong(APP, f) else self._gui(403, {})
        if p.startswith('/kho/'):
            f = os.path.join(GOC, p[5:])
            return self._tep(f) if trong(GOC, f) else self._gui(403, {})
        if p.startswith('/thanh-pham/'):
            d = ve.duong_cau_hinh('thuMucThanhPham', 'XUONG_THANH_PHAM')
            if not d:
                return self._gui(404, {'loi': 'chưa đặt thuMucThanhPham'})
            f = os.path.join(d, p[12:])
            return self._tep(f) if trong(d, f) else self._gui(403, {})
        if p.startswith('/du-an/'):
            d = TRANG_THAI['duAn']
            if not d:
                return self._gui(404, {'loi': 'chưa mở dự án'})
            f = os.path.join(d, p[7:])
            return self._tep(f) if trong(d, f) else self._gui(403, {})
        if p == '/api/ds-du-an':
            return self._gui(200, ds_du_an())
        if p == '/api/an-pham':
            duong = q.get('duong', '')
            if not duong.endswith('.json') or not os.path.isfile(duong):
                return self._gui(404, {'loi': 'không thấy file ấn phẩm'})
            TRANG_THAI['duAn'] = ve.thu_muc_du_an(duong)
            return self._gui(200, {'spec': ve.doc_json(duong), 'phienBan': bam(duong), 'duong': duong,
                                   'duAn': TRANG_THAI['duAn'], 'theThuc': ve.kho_the_thuc(), 'brand': ve.brand(),
                                   'khuon': sorted(os.path.basename(os.path.dirname(x)) for x in glob.glob(os.path.join(GOC, 'khuon', '*', 'khuon.html')))})
        return self._gui(404, {'loi': 'không có đường này'})

    def do_POST(self):
        u = urllib.parse.urlsplit(self.path)
        q = dict(urllib.parse.parse_qsl(u.query))
        p = u.path
        try:
            if p == '/api/goi':
                d = json.loads(self._doc_than() or b'{}')
                tt = d['tt']
                goi = ve.dung_goi(d['spec'], tt, '', che_do='ban')
                goi['duongDan'] = {'kho': '/kho/', 'logo': '/kho/brand/logo/', 'duAn': '/du-an/'}
                W, H, tra, dsf = ve.hinh_hoc(goi['theThuc'])
                return self._gui(200, {'goi': goi, 'W': W, 'H': H})
            if p == '/api/luu':
                d = json.loads(self._doc_than() or b'{}')
                duong = d['duong']
                if not os.path.isfile(duong) or not duong.endswith('.json'):
                    return self._gui(400, {'loi': 'đường dẫn không hợp lệ'})
                with KHOA:
                    hien = bam(duong)
                    if d.get('phienBan') and d['phienBan'] != hien and not d.get('ghiDe'):
                        return self._gui(409, {'loi': 'File đã đổi từ lúc mở (Claude vừa sửa hoặc máy kia đồng bộ). Nạp bản mới hay ghi đè?', 'phienBan': hien})
                    kho = os.path.join(os.path.dirname(duong), '_phien-ban')
                    os.makedirs(kho, exist_ok=True)
                    moc = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
                    shutil.copy2(duong, os.path.join(kho, f'{os.path.splitext(os.path.basename(duong))[0]}-{moc}.json'))
                    fd, tam = tempfile.mkstemp(dir=os.path.dirname(duong), suffix='.tam')
                    with os.fdopen(fd, 'w', encoding='utf-8') as f:
                        json.dump(d['spec'], f, ensure_ascii=False, indent=2)
                    os.replace(tam, duong)
                    return self._gui(200, {'ok': True, 'phienBan': bam(duong)})
            if p == '/api/anh':
                d = TRANG_THAI['duAn']
                ten = re.sub(r'[^\w.\-]+', '-', urllib.parse.unquote(q.get('ten', 'anh.jpg')), flags=re.U).strip('-') or 'anh.jpg'
                os.makedirs(os.path.join(d, 'anh'), exist_ok=True)
                dich = os.path.join(d, 'anh', ten)
                goc_ten, duoi = os.path.splitext(dich)
                i = 2
                while os.path.exists(dich):
                    dich = f'{goc_ten}-{i}{duoi}'
                    i += 1
                with open(dich, 'wb') as f:
                    f.write(self._doc_than())
                return self._gui(200, {'src': os.path.relpath(dich, d).replace(os.sep, '/')})
            if p == '/api/xuat':
                d = json.loads(self._doc_than() or b'{}')
                ds = d.get('tt') or None
                bc = ve.ve_an_pham(d['duong'], ds, may=ve.chon_may(), im_lang=True)
                du_an = ve.thu_muc_du_an(d['duong'])
                tp = ve.duong_cau_hinh('thuMucThanhPham', 'XUONG_THANH_PHAM')

                def lien_ket(t):
                    a = os.path.normpath(os.path.join(du_an, t))
                    if tp and trong(tp, a):
                        return {'ten': os.path.relpath(a, tp), 'url': '/thanh-pham/' + urllib.parse.quote(os.path.relpath(a, tp).replace(os.sep, '/'))}
                    return {'ten': t, 'url': '/du-an/' + urllib.parse.quote(t.replace(os.sep, '/'))}
                tep = []
                for k, v in bc['theThuc'].items():
                    tep += [lien_ket(t) for t in v.get('tep', []) if t]
                    for c in v.get('canhBao', []):
                        c['tt'] = k
                return self._gui(200, {'ok': True, 'tep': tep, 'thuMucRa': bc.get('thuMucRa'), 'canhBao': [c for v in bc['theThuc'].values() for c in v['canhBao']],
                                       'tongThe': bc.get('tongThe')})
        except Exception as e:
            return self._gui(500, {'loi': f'{type(e).__name__}: {e}'})
        return self._gui(404, {'loi': 'không có đường này'})


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('dich', nargs='?')
    ap.add_argument('--cong', type=int, default=8790)
    ap.add_argument('--mo', action='store_true')
    a = ap.parse_args()
    srv = None
    for cong in range(a.cong, a.cong + 20):
        try:
            srv = ThreadingHTTPServer(('127.0.0.1', cong), Xu)
            break
        except OSError:
            continue
    if not srv:
        raise SystemExit('Không mở được cổng nào.')
    url = f'http://127.0.0.1:{srv.server_address[1]}/ban/'
    if a.dich:
        dich = os.path.abspath(a.dich)
        if os.path.isdir(dich):
            ds = sorted(glob.glob(os.path.join(dich, 'thiet-ke', '*.json')) + glob.glob(os.path.join(dich, '*.json')))
            dich = ds[0] if ds else None
        if dich:
            url += '?duong=' + urllib.parse.quote(dich)
    print(f'Bàn thiết kế đang chạy: {url}\nGiữ cửa sổ này mở trong lúc chỉnh; xong thì đóng cửa sổ.')
    if a.mo:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
