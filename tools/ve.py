#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""VẼ: dựng một ấn phẩm (file JSON) ra ảnh, PDF ở một hay nhiều thể thức, kèm báo cáo kiểm.

    python3 tools/ve.py <an-pham.json>                      # mọi thể thức khai trong file, bản xuất đầy đủ
    python3 tools/ve.py <an-pham.json> --tt vuong,doc-9x16  # chỉ vài thể thức
    python3 tools/ve.py <an-pham.json> --nhap               # bản nháp nhanh (1x), kèm tờ tổng thể
    python3 tools/ve.py <an-pham.json> --tt a4-ngang --in   # thêm PDF in CMYK (tools/in_an.py)
    python3 tools/ve.py <an-pham.json> --tt "tu-do:1536x768,in:600x300mm+5mm@150dpi"

Ra đâu (dự án = thư mục cha của thư mục thiet-ke/ chứa file JSON; --ra để đổi):
  - bản nháp (--nhap): <dự án>/nhap/<tên ấn phẩm>/ (dự án nằm trong thư mục Nháp: cau-hinh.json > thuMucDuAn);
  - bản cuối: <thuMucThanhPham>/<tên dự án>/<tên ấn phẩm>/ (cau-hinh.json > thuMucThanhPham, hoặc biến XUONG_THANH_PHAM);
    chưa đặt thì <dự án>/xuat/<tên ấn phẩm>/.
Đường dẫn trong cau-hinh.json có thể tương đối so với repo (vd "../Nhap"). Mỗi lần chạy ghi <tên>-bao-cao.json (cảnh báo bố cục, vùng an toàn, cỡ chữ, tương phản) và in tóm tắt.

Hai máy vẽ (cùng một khuôn HTML nên cùng kết quả):
  - playwright (sandbox đám mây, mặc định khi có): Chromium kèm Playwright.
  - chrome (máy Mac của người dùng, chỉ cần Python có sẵn): điều khiển Google Chrome qua ống CDP, không cài gì thêm.
Pillow có thì nhúng hồ sơ màu sRGB và xuất JPG 4:4:4; không có thì giữ PNG của trình duyệt.
"""
import argparse
import base64
import datetime
import functools
import http.server
import json
import math
import os
import re
import shutil
import subprocess
import sys
sys.dont_write_bytecode = True  # không để __pycache__ trong repo
import tempfile
import threading
import urllib.parse

TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)
sys.path.insert(0, TOOLS)
MM = 96 / 25.4

try:
    from PIL import Image, ImageCms, ImageDraw, ImageFont  # noqa
    CO_PIL = True
except Exception:  # máy Mac chỉ có Python chuẩn
    CO_PIL = False


# ---------------------------------------------------------------- dữ liệu chung
def doc_json(p):
    with open(p, encoding='utf-8') as f:
        return json.load(f)


@functools.lru_cache(None)
def kho_the_thuc():
    return doc_json(os.path.join(GOC, 'chuan', 'kho-the-thuc.json'))['the-thuc']


@functools.lru_cache(None)
def brand():
    """brand/brand.json của người dùng; chưa có (bản vừa tải, chưa thiết lập) thì dùng bản khởi đầu brand.mau.json."""
    p = os.path.join(GOC, 'brand', 'brand.json')
    return doc_json(p if os.path.exists(p) else os.path.join(GOC, 'brand', 'brand.mau.json'))


def giai_the_thuc(tt):
    """id trong kho, hoặc 'tu-do:WxH' (px), hoặc 'in:WxHmm[+3mm][@300dpi]'."""
    k = kho_the_thuc()
    if tt in k:
        return dict(k[tt], id=tt)
    m = re.fullmatch(r'tu-do:(\d+)x(\d+)', tt)
    if m:
        w, h = int(m.group(1)), int(m.group(2))
        return {'id': tt, 'ten': f'Tự do {w}x{h} px', 'loai': 'so', 'nhom': nhom_theo_ti_le(w / h), 'w': w, 'h': h,
                'an': {'tren': 0, 'duoi': 0, 'trai': 0, 'phai': 0}, 'le': 5, 'xuat': {'tiLe': 1, 'dinhDang': ['png']}}
    m = re.fullmatch(r'in:(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)mm(?:\+(\d+(?:\.\d+)?)mm)?(?:@(\d+)dpi)?(?::1-(\d+))?', tt)
    if m:
        w, h = float(m.group(1)), float(m.group(2))
        return {'id': tt, 'ten': f'In tự do {w:g}x{h:g} mm', 'loai': 'in', 'nhom': nhom_theo_ti_le(w / h),
                'wMm': w, 'hMm': h, 'traMm': float(m.group(3) or 3), 'dpi': int(m.group(4) or 300),
                'tiLeThietKe': int(m.group(5) or 1), 'an': {'tren': 3, 'duoi': 3, 'trai': 3, 'phai': 3}, 'le': 6,
                'xuat': {'dinhDang': ['pdf-in', 'png']}}
    raise SystemExit(f'Không có thể thức "{tt}" trong chuan/kho-the-thuc.json (xem danh sách: python3 tools/ve.py --ds-the-thuc)')


def nhom_theo_ti_le(r):
    if r >= 2.4:
        return 'bang'
    if r >= 1.25:
        return 'ngang'
    if r >= 0.92:
        return 'vuong'
    if r >= 0.7:
        return 'doc-nhe'
    return 'doc'


def hinh_hoc(tt):
    """Kích thước khung CSS px (đã gồm tràn lề) và mật độ điểm ảnh khi xuất."""
    if tt['loai'] == 'in':
        s = tt.get('tiLeThietKe', 1)
        k = MM / s
        tra = tt.get('traMm', 0) * k
        W, H = tt['wMm'] * k + 2 * tra, tt['hMm'] * k + 2 * tra
        return W, H, tra, tt.get('dpi', 300) / 96
    return tt['w'], tt['h'], 0, (tt.get('xuat') or {}).get('tiLe', 1)


def cau_hinh():
    p = os.path.join(GOC, 'cau-hinh.json')
    if os.path.exists(p):
        try:
            return doc_json(p)
        except Exception:
            pass
    return {}


def duong_cau_hinh(khoa, bien=None):
    """Đường dẫn trong cau-hinh.json (tương đối thì tính từ repo); biến môi trường `bien` được ưu tiên."""
    v = (os.environ.get(bien) if bien else None) or (cau_hinh().get(khoa) or '')
    v = v.strip()
    if not v:
        return None
    v = os.path.expanduser(v)
    return os.path.normpath(v if os.path.isabs(v) else os.path.join(GOC, v))


def thu_muc_ra(du_an, ten, nhap=False):
    if nhap:
        return os.path.join(du_an, 'nhap', ten)
    tp = duong_cau_hinh('thuMucThanhPham', 'XUONG_THANH_PHAM')
    if tp:
        return os.path.join(tp, os.path.basename(os.path.normpath(du_an)), ten)
    return os.path.join(du_an, 'xuat', ten)


def thu_muc_du_an(spec_path):
    d = os.path.dirname(os.path.abspath(spec_path))
    return os.path.dirname(d) if os.path.basename(d) == 'thiet-ke' else d


def trong_repo(duong):
    r = os.path.realpath(os.path.abspath(os.path.expanduser(str(duong))))
    g = os.path.realpath(GOC)
    return r == g or r.startswith(g + os.sep)


def thu_muc_tam(*con):
    """Vùng tạm của công cụ và Claude, NGOÀI repo: <thuMucDuAn>/_tam/..., chưa đặt thì thư mục tạm của hệ thống."""
    goc = duong_cau_hinh('thuMucDuAn')
    base = os.path.join(goc, '_tam') if goc else os.path.join(tempfile.gettempdir(), 'xuong-tam')
    return os.path.join(base, *con)


def chan_ghi_repo(duong, vai='đầu ra'):
    """Repo chỉ chứa NĂNG LỰC: nháp, thành phẩm, việc tạm luôn nằm ngoài repo (QUY-TRINH mục 1, Repo sạch)."""
    if trong_repo(duong) and not os.environ.get('XUONG_CHO_PHEP_GHI_REPO'):
        raise SystemExit(
            f'DỪNG: {vai} nằm trong repo ({duong}). Repo chỉ chứa năng lực, không chứa nháp, thành phẩm hay thư mục tạm.\n'
            f'  - Ấn phẩm thật: đặt dự án trong thuMucDuAn (python3 tools/du-an-moi.py "Tên dự án").\n'
            f'  - Thử tạm: thêm --ra "{thu_muc_tam("thu")}" (vùng tạm ngoài repo).')


def thuong_hieu_mac_dinh():
    b = brand()
    return b.get('thuongHieuMacDinh') or next(iter(b.get('thuongHieu') or {'chinh': {}}))


def tron_chu_de(spec):
    b = brand()
    th_id = spec.get('thuongHieu') or thuong_hieu_mac_dinh()
    th = dict(b['thuongHieu'].get(th_id) or {}, id=th_id)
    cd_id = spec.get('chuDe') or th.get('chuDeMacDinh') or 'giay-muc'
    if cd_id not in b['chuDe']:
        raise SystemExit(f'Không có chủ đề "{cd_id}" trong brand/brand.json')
    cd = json.loads(json.dumps(b['chuDe'][cd_id]))
    cd['id'] = cd_id
    cd['mau'].update(spec.get('mauRieng') or {})
    if spec.get('phongRieng'):
        cd['phong'].update(spec['phongRieng'])
    return th, cd


def dung_goi(spec, tt_id, goc_url, che_do='xuat'):
    th, cd = tron_chu_de(spec)
    return {
        'spec': spec, 'tt': tt_id, 'theThuc': giai_the_thuc(tt_id), 'chuDe': cd, 'thuongHieu': th,
        'tatCaThuongHieu': brand()['thuongHieu'], 'nhanVat': brand().get('nhanVat', {}),
        'duongDan': {'kho': goc_url + '/kho/', 'logo': goc_url + '/kho/brand/logo/', 'duAn': goc_url + '/du-an/'},
        'cheDo': che_do,
    }


# ---------------------------------------------------------------- máy chủ tĩnh nội bộ
class _Handler(http.server.SimpleHTTPRequestHandler):
    goc_kho = GOC
    goc_du_an = GOC

    def log_message(self, *a):
        pass

    def translate_path(self, path):
        p = urllib.parse.unquote(urllib.parse.urlsplit(path).path)
        if p.startswith('/kho/'):
            base, rest = self.goc_kho, p[5:]
        elif p.startswith('/du-an/'):
            base, rest = self.goc_du_an, p[7:]
        else:
            return os.path.join(self.goc_kho, '__khong_co__')
        full = os.path.realpath(os.path.join(base, rest))
        if not (full == os.path.realpath(base) or full.startswith(os.path.realpath(base) + os.sep)):
            return os.path.join(self.goc_kho, '__khong_co__')
        return full

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()


def mo_may_chu(du_an):
    H = type('H', (_Handler,), {'goc_kho': GOC, 'goc_du_an': du_an})
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f'http://127.0.0.1:{srv.server_address[1]}'


# ---------------------------------------------------------------- máy vẽ Playwright
class MayPlaywright:
    ten = 'playwright'

    def __enter__(self):
        from playwright.sync_api import sync_playwright
        self._p = sync_playwright().start()
        self.b = self._p.chromium.launch(args=['--force-color-profile=srgb', '--font-render-hinting=none',
                                               '--disable-lcd-text', '--hide-scrollbars'])
        return self

    def __exit__(self, *a):
        self.b.close()
        self._p.stop()

    def ve(self, url, goi, W, H, dsf, ra_png=None, ra_pdf=None, trong_suot=False):
        ctx = self.b.new_context(viewport={'width': math.ceil(W), 'height': math.ceil(H)}, device_scale_factor=dsf)
        pg = ctx.new_page()
        loi = []
        pg.on('pageerror', lambda e: loi.append(str(e)))
        pg.goto(url, wait_until='load')
        kq = pg.evaluate('g => XUONG.dung(g)', goi)
        if ra_png:
            if trong_suot:
                pg.evaluate("document.querySelector('.canvas').style.background='transparent'")
            pg.locator('.canvas').screenshot(path=ra_png, animations='disabled', scale='device', omit_background=trong_suot)
        if ra_pdf:
            pg.pdf(path=ra_pdf, prefer_css_page_size=True, print_background=True)
        ctx.close()
        if loi:
            kq.setdefault('canhBao', []).append({'loai': 'loi-js', 'id': '-', 'chiTiet': '; '.join(loi)[:400]})
        return kq


# ---------------------------------------------------------------- máy vẽ Chrome qua ống CDP (Mac, chỉ Python chuẩn)
def tim_chrome():
    ung_vien = [os.environ.get('XUONG_CHROME', ''),
                '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                os.path.expanduser('~/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
                '/Applications/Chromium.app/Contents/MacOS/Chromium',
                '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
                shutil.which('google-chrome') or '', shutil.which('chromium') or '', shutil.which('chromium-browser') or '']
    for c in ung_vien:
        if c and os.path.exists(c):
            return c
    return None


class _CDP:
    def __init__(self, chrome):
        self.r_cha, self.w_con = os.pipe()
        self.r_con, self.w_cha = os.pipe()
        self.tmp = tempfile.mkdtemp(prefix='xuong-cdp-')
        args = [chrome, '--headless', '--remote-debugging-pipe', f'--user-data-dir={self.tmp}', '--no-first-run',
                '--no-default-browser-check', '--hide-scrollbars', '--mute-audio', '--force-color-profile=srgb',
                '--font-render-hinting=none', 'about:blank']
        if sys.platform.startswith('linux') and os.geteuid() == 0:
            args.insert(1, '--no-sandbox')
        rc, wc = self.r_con, self.w_con

        def truoc():
            a, b = os.dup(rc), os.dup(wc)
            os.dup2(a, 3)
            os.dup2(b, 4)
            os.close(a)
            os.close(b)
        self.p = subprocess.Popen(args, preexec_fn=truoc, close_fds=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        os.close(self.r_con)
        os.close(self.w_con)
        self.rf = os.fdopen(self.r_cha, 'rb', buffering=0)
        self.buf, self.n, self.su_kien = b'', 0, []

    def _doc(self):
        while b'\0' not in self.buf:
            k = self.rf.read(1 << 20)
            if not k:
                raise RuntimeError('Chrome đóng ống')
            self.buf += k
        m, self.buf = self.buf.split(b'\0', 1)
        return json.loads(m)

    def gui(self, method, params=None, s=None):
        self.n += 1
        m = {'id': self.n, 'method': method, 'params': params or {}}
        if s:
            m['sessionId'] = s
        os.write(self.w_cha, json.dumps(m).encode() + b'\0')
        while True:
            r = self._doc()
            if r.get('id') == self.n:
                if 'error' in r:
                    raise RuntimeError(f"{method}: {r['error']}")
                return r['result']
            self.su_kien.append(r)

    def cho(self, ten, s):
        for i, e in enumerate(self.su_kien):
            if e.get('method') == ten and e.get('sessionId') == s:
                return self.su_kien.pop(i)
        while True:
            e = self._doc()
            if e.get('method') == ten and e.get('sessionId') == s:
                return e

    def dong(self):
        try:
            self.gui('Browser.close')
        except Exception:
            pass
        try:
            self.p.wait(10)
        except Exception:
            self.p.kill()
        shutil.rmtree(self.tmp, ignore_errors=True)


class MayChrome:
    ten = 'chrome'

    def __init__(self, chrome=None):
        self.chrome = chrome or tim_chrome()
        if not self.chrome:
            raise SystemExit('Không tìm thấy Google Chrome. Cài Chrome hoặc đặt biến XUONG_CHROME tới tệp chạy của trình duyệt.')

    def __enter__(self):
        self.c = _CDP(self.chrome)
        return self

    def __exit__(self, *a):
        self.c.dong()

    def ve(self, url, goi, W, H, dsf, ra_png=None, ra_pdf=None, trong_suot=False):
        c = self.c
        tid = c.gui('Target.createTarget', {'url': 'about:blank'})['targetId']
        s = c.gui('Target.attachToTarget', {'targetId': tid, 'flatten': True})['sessionId']
        c.gui('Page.enable', s=s)
        c.gui('Emulation.setDeviceMetricsOverride', {'width': math.ceil(W), 'height': math.ceil(H), 'deviceScaleFactor': dsf, 'mobile': False}, s)
        c.gui('Page.navigate', {'url': url}, s)
        c.cho('Page.loadEventFired', s)
        r = c.gui('Runtime.evaluate', {'expression': f'XUONG.dung({json.dumps(goi, ensure_ascii=False)})',
                                       'awaitPromise': True, 'returnByValue': True}, s)
        if 'exceptionDetails' in r:
            raise RuntimeError('Lỗi khi dựng: ' + json.dumps(r['exceptionDetails'], ensure_ascii=False)[:500])
        kq = r['result'].get('value') or {}
        if ra_png:
            if trong_suot:
                c.gui('Emulation.setDefaultBackgroundColorOverride', {'color': {'r': 0, 'g': 0, 'b': 0, 'a': 0}}, s)
                c.gui('Runtime.evaluate', {'expression': "document.querySelector('.canvas').style.background='transparent'"}, s)
            d = c.gui('Page.captureScreenshot', {'format': 'png', 'captureBeyondViewport': False,
                                                 'clip': {'x': 0, 'y': 0, 'width': W, 'height': H, 'scale': 1}}, s)['data']
            with open(ra_png, 'wb') as f:
                f.write(base64.b64decode(d))
        if ra_pdf:
            d = c.gui('Page.printToPDF', {'printBackground': True, 'preferCSSPageSize': True, 'displayHeaderFooter': False}, s)['data']
            with open(ra_pdf, 'wb') as f:
                f.write(base64.b64decode(d))
        c.gui('Target.closeTarget', {'targetId': tid})
        return kq


def chon_may(ten=None):
    if ten in (None, 'playwright'):
        try:
            import playwright  # noqa
            return MayPlaywright()
        except Exception:
            if ten == 'playwright':
                raise SystemExit('Chưa có Playwright trên máy này.')
    return MayChrome()


# ---------------------------------------------------------------- hậu kỳ ảnh, kiểm tương phản
def ho_so_srgb():
    for p in ('/usr/share/color/icc/sRGB2014.icc', '/usr/share/color/icc/colord/sRGB.icc',
              '/System/Library/ColorSync/Profiles/sRGB Profile.icc'):
        if os.path.exists(p):
            return open(p, 'rb').read()
    return ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()


def hau_ky(png, dinh_dang, dpi=144, trong_suot=False):
    """Nhúng sRGB vào PNG; xuất JPG 4:4:4 chất lượng 92 nếu cần."""
    ra = [png]
    if not CO_PIL:
        return ra
    icc = ho_so_srgb()
    im = Image.open(png)
    im.load()
    im.save(png, 'PNG', icc_profile=icc, optimize=True, dpi=(dpi, dpi))
    if 'jpg' in dinh_dang and not trong_suot:
        jp = png[:-4] + '.jpg'
        im.convert('RGB').save(jp, 'JPEG', quality=92, subsampling=0, icc_profile=icc, dpi=(dpi, dpi), optimize=True, progressive=True)
        ra.append(jp)
    if 'png' not in dinh_dang and 'jpg' in dinh_dang:
        os.remove(png)
        ra.remove(png)
    return ra


def _mau(css):
    m = re.match(r'rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)', css or '')
    if not m:
        return None
    return tuple(float(x) for x in m.groups()[:3]), float(m.group(4) or 1)


def _do_sang(rgb):
    def k(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = rgb
    return 0.2126 * k(r) + 0.7152 * k(g) + 0.0722 * k(b)


def kiem_tuong_phan(png, kq, dsf):
    """Ước lượng tương phản WCAG giữa màu chữ và nền thật phía sau (lấy mẫu trên ảnh đã vẽ)."""
    if not CO_PIL:
        return []
    try:
        import numpy as np
    except Exception:
        return []
    im = Image.open(png).convert('RGB')
    a = np.asarray(im).astype('float32')
    lin = np.where(a / 255 <= 0.03928, a / 255 / 12.92, ((a / 255 + 0.055) / 1.055) ** 2.4)
    L = 0.2126 * lin[..., 0] + 0.7152 * lin[..., 1] + 0.0722 * lin[..., 2]
    ngan = min(kq['W'], kq['H'])
    ra = []
    for b in kq.get('chuBlocks', []):
        if b.get('gradient'):
            continue
        m = _mau(b['mau'])
        if not m or m[1] < 0.5:
            continue
        x, y, w, h = [v * dsf for v in b['hop']]
        x0, y0, x1, y1 = max(0, int(x)), max(0, int(y)), min(a.shape[1], int(x + w)), min(a.shape[0], int(y + h))
        if x1 - x0 < 3 or y1 - y0 < 3:
            continue
        Lt = _do_sang(m[0])
        vung = L[y0:y1, x0:x1].ravel()
        tp = (np.maximum(vung, Lt) + 0.05) / (np.minimum(vung, Lt) + 0.05)
        if tp.size < 40:
            continue
        nen = tp[tp >= np.percentile(tp, 50)]  # nửa điểm ảnh khác màu chữ nhất = nền
        nen = nen[nen >= 1.25]
        if nen.size < 20:
            continue
        xau = float(np.percentile(nen, 10))
        lon = b['coPx'] >= ngan * 0.06 or (b['dam'] and b['coPx'] >= ngan * 0.048)
        nguong = 3.0 if lon else 4.5
        if xau < nguong:
            ra.append({'loai': 'tuong-phan', 'id': b['id'],
                       'chiTiet': f'tương phản khoảng {xau:.1f}:1 ở phần nền xấu nhất, cần {nguong}:1 ({"chữ lớn" if lon else "chữ thường"}): "{b["chu"][:40]}"'})
    return ra


def to_tong_the(ds_anh, ra, tieu_de=''):
    """Tờ tổng thể: mọi thể thức đặt cạnh nhau cùng chiều cao, có nhãn, để duyệt một lần."""
    if not CO_PIL or not ds_anh:
        return None
    cao = 900
    o = []
    for p, nhan in ds_anh:
        im = Image.open(p).convert('RGB')
        r = cao / im.height
        im = im.resize((max(1, int(im.width * r)), cao), Image.LANCZOS)
        if im.width > 1700:
            r2 = 1700 / im.width
            im = im.resize((1700, int(im.height * r2)), Image.LANCZOS)
        o.append((im, nhan))
    le, khe = 40, 36
    hang, cur, w = [], [], le
    for im, nhan in o:
        if cur and w + im.width + khe > 4200:
            hang.append(cur)
            cur, w = [], le
        cur.append((im, nhan))
        w += im.width + khe
    hang.append(cur)
    W = max(sum(i.width for i, _ in h) + khe * (len(h) - 1) for h in hang) + 2 * le
    H = sum(max(i.height for i, _ in h) + 70 for h in hang) + 2 * le + 50
    to = Image.new('RGB', (W, H), (236, 233, 226))
    d = ImageDraw.Draw(to)
    try:
        f = ImageFont.truetype(_phong_he_thong(), 26)
    except Exception:
        f = ImageFont.load_default()
    d.text((le, 14), tieu_de, fill=(40, 40, 40), font=f)
    y = le + 40
    for h in hang:
        x = le
        for im, nhan in h:
            to.paste(im, (x, y + 40))
            d.text((x, y + 6), nhan, fill=(60, 60, 60), font=f)
            x += im.width + khe
        y += max(i.height for i, _ in h) + 70
    to.save(ra, 'JPEG', quality=86)
    return ra


def _phong_he_thong():
    for p in ('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/System/Library/Fonts/Supplemental/Arial Unicode.ttf',
              '/Library/Fonts/Arial Unicode.ttf', '/System/Library/Fonts/Helvetica.ttc'):
        if os.path.exists(p):
            return p
    raise OSError


# ---------------------------------------------------------------- kiểm chữ theo quy ước của người dùng
KHUON_TRI_THUC = {'so-do-tri-thuc', 'hoi-dap', 'lich-thong-tin'}

# Hai lớp luật chữ. Lớp chung (dưới đây) đúng cho mọi người viết tiếng Việt trên ấn phẩm. Lớp riêng của người dùng
# (từ ngữ phải viết đúng, từ không dùng) nằm ở phong-cach/tu-ngu.json, đi cùng phong-cach/PHONG-CACH.md mục 4.
# tuCam: luôn sai, báo "tu-ngu". tuNenTranh: dấu hiệu văn AI, sáo ngữ; báo "goi-y-chu" để Claude cân nhắc theo ngữ cảnh.
TU_CAM_CHUNG = [
    (r'—', 'không dùng gạch dài (—): đổi thành gạch ngang thường hoặc dấu hai chấm'),
    (r'…', 'không dùng dấu ba chấm Unicode (…): gõ ba dấu chấm (...)'),
    (r'(đừng để|kẻo|không muốn) bị bỏ lại|tụt hậu|đi trước đối thủ', 'không dùng khung "đua tranh, bị bỏ lại" trong quảng bá'),
    (r'\bchỉ còn \d+ (chỗ|suất|ghế|vé)', 'không nêu số ghế cụ thể; nói khan hiếm thật bằng lời định tính'),
]
TU_NEN_TRANH_CHUNG = [
    (r'\b(hành trình|kỷ nguyên|cuộc cách mạng|chìa khoá|chìa khóa|bí quyết|lăng kính|cánh cửa|bức tranh toàn cảnh)\b',
     'danh từ "to lớn" dễ thành sáo (văn AI): giữ khi là nghĩa thật, không thì gọi đúng điều cụ thể'),
    (r'\b(đột phá|vượt trội|tiên tiến|liền mạch|ngoạn mục|đáng kinh ngạc|toàn diện|then chốt)\b',
     'tính từ "đẹp lời" rỗng: thay bằng thông tin cụ thể (con số, việc làm được)'),
    (r'\b(kiến tạo|vun đắp|ươm mầm|đắm mình|vén màn|chinh phục|khai phá|phát huy tối đa)\b',
     'động từ "khai sáng" sáo: thay bằng động từ cụ thể'),
    (r'\b(vô cùng|cực kỳ|hết sức)\b', 'trạng từ phóng đại: bỏ hoặc thay bằng chi tiết'),
    (r'trong (thời đại|kỷ nguyên|bối cảnh)|hãy cùng|đừng bỏ lỡ|người bạn đồng hành|mở ra (một )?(chương|kỷ nguyên|cánh cửa)|hơn bao giờ hết|mang lại trải nghiệm',
     'cụm sáo văn AI: viết thẳng điều người xem nhận được'),
    (r'\bkhông chỉ\b.*\bmà còn\b', 'đối ngẫu "không chỉ... mà còn" (dấu hiệu văn AI): tối đa một lần cho cả bộ ấn phẩm'),
    (r'[“”]', 'dấu nháy cong: chữ thường dùng nháy thẳng "..."; dấu ngoặc trang trí lớn đặt ở ô ngoac'),
]


@functools.lru_cache(None)
def tu_ngu_rieng():
    """Luật chữ riêng của người dùng: phong-cach/tu-ngu.json > tuCam, tuNenTranh (mỗi mục {mau, lyDo})."""
    p = os.path.join(GOC, 'phong-cach', 'tu-ngu.json')
    if not os.path.exists(p):
        return [], []
    d = doc_json(p)
    lay = lambda k: [(m['mau'], m.get('lyDo', '')) for m in d.get(k, []) if isinstance(m, dict) and m.get('mau')]
    return lay('tuCam'), lay('tuNenTranh')


def luat_chu():
    cam, nen = tu_ngu_rieng()
    return TU_CAM_CHUNG + cam, TU_NEN_TRANH_CHUNG + nen


def kiem_chu(spec):
    ra = []
    tu_cam, tu_nen_tranh = luat_chu()

    def duyet(v, duong):
        if isinstance(v, str):
            la_ten = re.search(r'(^|\.)(ten|hoTen|tacGia|chucDanh|nguoi|nguon|logo|chuongTrinh|kicker|suKien|donVi)[^.]*$', duong or '') or re.search(r'\b(ThS|TS|PGS|GS|BS|NCS)\b', v)
            for mau, ly_do in tu_cam:
                if re.search(mau, v, flags=re.I):
                    ra.append({'loai': 'tu-ngu', 'id': duong, 'chiTiet': ly_do})
            if not re.search(r'(^|\.)ngoac$', duong or ''):
                for mau, ly_do in tu_nen_tranh:
                    m = re.search(mau, v, flags=re.I)
                    if m:
                        ra.append({'loai': 'goi-y-chu', 'id': duong, 'chiTiet': f'"{m.group(0)[:30]}": {ly_do}'})
            tu = [t for t in re.findall(r"[^\W\d_]+", v) if len(t) > 1]
            if not la_ten and len(tu) >= 4 and sum(1 for t in tu if t[0].isupper()) == len(tu) and not v.isupper():
                ra.append({'loai': 'title-case', 'id': duong, 'chiTiet': 'có vẻ viết hoa chữ cái đầu mọi từ (Title Case): dùng sentence case hoặc FULL-CAP'})
        elif isinstance(v, dict):
            for k, x in v.items():
                duyet(x, f'{duong}.{k}' if duong else k)
        elif isinstance(v, list):
            for i, x in enumerate(v):
                duyet(x, f'{duong}.{i}')
    duyet(spec.get('noiDung', {}), '')
    for k in ('theoTheThuc', 'theoNhom'):
        for tt, c in (spec.get(k) or {}).items():
            duyet((c or {}).get('noiDung', {}), f'{k}.{tt}')
    return ra


# ---------------------------------------------------------------- chạy
def ve_an_pham(spec_path, ds_tt=None, ra=None, nhap=False, may=None, lam_in=False, ho_so_in=None,
               tong_the=True, trong_suot=False, im_lang=False):
    spec = doc_json(spec_path)
    ten = os.path.splitext(os.path.basename(spec_path))[0]
    du_an = thu_muc_du_an(spec_path)
    if not ds_tt:
        ds_tt = spec.get('theThuc') or ['ig-4x5']
    khuon = os.path.join(GOC, 'khuon', spec['khuon'], 'khuon.html')
    if not os.path.exists(khuon):
        raise SystemExit(f'Không có khuôn "{spec["khuon"]}" (khuon/{spec["khuon"]}/khuon.html)')
    ra_mac_dinh = not ra
    ra = ra or thu_muc_ra(du_an, ten, nhap)
    chan_ghi_repo(ra, 'thư mục ra')
    os.makedirs(ra, exist_ok=True)
    # bản cuối vào Thanh pham chỉ gồm ảnh, PDF; tờ tổng thể và báo cáo kiểm (hồ sơ làm việc) ở lại thư mục nháp của dự án
    ho_so = thu_muc_ra(du_an, ten, True) if (ra_mac_dinh and not nhap) else ra
    chan_ghi_repo(ho_so, 'thư mục hồ sơ (tờ tổng thể, báo cáo)')
    os.makedirs(ho_so, exist_ok=True)
    srv, goc_url = mo_may_chu(du_an)
    url = f'{goc_url}/kho/khuon/{urllib.parse.quote(spec["khuon"])}/khuon.html'
    bao_cao = {'anPham': spec_path, 'khuon': spec['khuon'], 'luc': datetime.datetime.now().isoformat(timespec='seconds'),
               'thuMucRa': os.path.abspath(ra), 'banNhap': bool(nhap), 'kiemChu': kiem_chu(spec), 'theThuc': {}}
    anh_tong = []
    try:
        with (may or chon_may()) as m:
            for tt_id in ds_tt:
                tt = giai_the_thuc(tt_id)
                W, H, tra, dsf = hinh_hoc(tt)
                if nhap:
                    dsf = 1 if tt['loai'] == 'so' else min(dsf, 150 / 96)
                if W * H * dsf * dsf > 100e6:
                    dsf = math.sqrt(95e6 / (W * H))
                dinh_dang = (tt.get('xuat') or {}).get('dinhDang', ['png'])
                goi = dung_goi(spec, tt_id, goc_url)
                png = os.path.join(ra, f'{ten}-{tt_id.replace(":", "_")}.png')
                pdf = None
                if tt['loai'] == 'in' and ('pdf-in' in dinh_dang or 'pdf' in dinh_dang) and (lam_in or not nhap):
                    pdf = os.path.join(ra, f'{ten}-{tt_id}-RGB.pdf')
                kq = m.ve(url, goi, W, H, dsf, ra_png=png, ra_pdf=pdf, trong_suot=trong_suot)
                cb = list(kq.get('canhBao', []))
                cb += kiem_tuong_phan(png, kq, dsf)
                dm = tt.get('chuToiDa')
                if dm and kq.get('soTieng'):
                    he_so = 1.4 if spec['khuon'] in KHUON_TRI_THUC else 1
                    if kq['soTieng'] > dm['tran'] * he_so:
                        cb.append({'loai': 'nhieu-chu', 'id': 'canvas',
                                   'chiTiet': f'{kq["soTieng"]} tiếng trên hình, quá ngưỡng {round(dm["tran"] * he_so)} của thể thức này '
                                              f'(nên khoảng {round(dm["lyTuong"] * he_so)}): chuyển chi tiết xuống caption, alt text '
                                              'hoặc khung khác (chuan/08)'})
                if tt.get('nhom') == 'doc' and (kq.get('co') or 1) < 0.9:
                    cb.append({'loai': 'can-rut-gon', 'id': 'canvas',
                               'chiTiet': f'khổ dọc 9:16 phải co chữ còn {round((kq.get("co") or 1) * 100)}%: rút gọn chữ cho nhóm doc '
                                          '(theoNhom.doc.noiDung: tiêu đề ngắn, bỏ mô tả, giữ ngày và nút), không để chữ nhỏ'})
                tep = hau_ky(png, ['png'] + (['jpg'] if 'jpg' in dinh_dang and not nhap else []),
                             dpi=round(96 * dsf * (tt.get('tiLeThietKe', 1) if tt['loai'] == 'in' else 1)) if tt['loai'] == 'in' else 144,
                             trong_suot=trong_suot)
                muc = {'ten': tt.get('ten'), 'khung': [round(W, 1), round(H, 1)], 'diemAnh': [round(W * dsf), round(H * dsf)],
                       'soTieng': kq.get('soTieng'), 'chuToiDa': tt.get('chuToiDa'),
                       'tep': [os.path.relpath(t, du_an) for t in tep], 'co': kq.get('co'), 'canhBao': cb,
                       'phanTu': kq.get('phanTu')}
                if pdf and lam_in:
                    import in_an
                    kq_in = in_an.lam_pdf_in(pdf, tt, ho_so=ho_so_in, ten=ten)
                    muc['in'] = kq_in
                    tep.append(kq_in.get('tep'))
                elif pdf:
                    muc['tep'].append(os.path.relpath(pdf, du_an))
                bao_cao['theThuc'][tt_id] = muc
                anh_tong.append((png if os.path.exists(png) else tep[0], f'{tt_id}  {round(W * dsf)}x{round(H * dsf)}'))
                if not im_lang:
                    print(f'  {tt_id:<18} {round(W * dsf)}x{round(H * dsf)}  {len(cb)} cảnh báo' + (f'  (co chữ {kq.get("co")})' if kq.get('co', 1) < 1 else ''))
                    for c in cb:
                        print(f'      - [{c["loai"]}] {c["id"]}: {c["chiTiet"]}')
    finally:
        srv.shutdown()
    if tong_the and len(anh_tong) > 0:
        p = to_tong_the(anh_tong, os.path.join(ho_so, f'{ten}-tong-the.jpg'), f'{ten} - {spec["khuon"]} - {bao_cao["luc"]}')
        if p:
            bao_cao['tongThe'] = os.path.relpath(p, du_an)
    for c in bao_cao['kiemChu']:
        if not im_lang:
            print(f'  [chữ] {c["id"]}: {c["chiTiet"]}')
    with open(os.path.join(ho_so, f'{ten}-bao-cao.json'), 'w', encoding='utf-8') as f:
        json.dump(bao_cao, f, ensure_ascii=False, indent=1)
    if not im_lang:
        print(f'Xong: {ra}' + (f'\nTờ tổng thể, báo cáo: {ho_so}' if ho_so != ra else ''))
    return bao_cao


def main():
    ap = argparse.ArgumentParser(description='Dựng ấn phẩm ra ảnh, PDF theo kho thể thức.')
    ap.add_argument('an_pham', nargs='?')
    ap.add_argument('--tt', help='danh sách id thể thức, cách nhau bằng dấu phẩy; "tat-ca" = mọi thể thức khai trong file')
    ap.add_argument('--ra', help='thư mục ra (mặc định: nháp <dự án>/nhap/<tên>/, bản cuối <thuMucThanhPham>/<dự án>/<tên>/)')
    ap.add_argument('--nhap', action='store_true', help='bản nháp nhanh 1x')
    ap.add_argument('--in', dest='lam_in', action='store_true', help='làm PDF in CMYK cho thể thức in')
    ap.add_argument('--ho-so-in', help='hồ sơ màu in: japan2001, japan2011, fogra39, pso3, pso-khong-trang (mặc định japan2011)')
    ap.add_argument('--may', choices=['playwright', 'chrome'])
    ap.add_argument('--trong-suot', action='store_true', help='PNG nền trong suốt (lớp chữ để ghép)')
    ap.add_argument('--ds-the-thuc', action='store_true', help='liệt kê kho thể thức')
    a = ap.parse_args()
    if a.ds_the_thuc:
        for k, v in kho_the_thuc().items():
            kt = f'{v["w"]}x{v["h"]} px' if v['loai'] == 'so' else f'{v["wMm"]:g}x{v["hMm"]:g} mm'
            print(f'{k:<20} {v["nhom"]:<8} {kt:<16} {v["ten"]}')
        return
    if not a.an_pham:
        ap.error('cần đường dẫn file ấn phẩm .json')
    ds = None
    if a.tt and a.tt != 'tat-ca':
        ds = [x.strip() for x in a.tt.split(',') if x.strip()]
    may = chon_may(a.may)
    ve_an_pham(a.an_pham, ds, a.ra, a.nhap, may, a.lam_in, a.ho_so_in, trong_suot=a.trong_suot)


if __name__ == '__main__':
    main()
