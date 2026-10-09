#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""CÀI ĐẶT XƯỞNG THIẾT KẾ - một lệnh, chạy lại bao nhiêu lần cũng an toàn.

    python3 tools/cai-dat.py                     # làm mọi bước còn thiếu, rồi dựng thử một ấn phẩm mẫu
    python3 tools/cai-dat.py --trang-thai        # chỉ xem: bước nào xong, máy vẽ nào dùng được, việc tiếp theo
    python3 tools/cai-dat.py --anh               # cài thêm thư viện chỉnh ảnh (opencv, pillow-heif) và PDF in (pikepdf)
    python3 tools/cai-dat.py --tach-nen          # cài thêm thư viện tách nền (rembg, khoảng 300 MB kèm mô hình)
    python3 tools/cai-dat.py --khong-cai         # không cài gì qua mạng, chỉ kiểm và dựng thử
    python3 tools/cai-dat.py --khong-thu         # bỏ bước dựng thử
    python3 tools/cai-dat.py --danh-dau thiet-lap|gioi-thieu   # trợ lý ghi dấu sau bước thiết lập phong cách, buổi giới thiệu

Các bước (mỗi bước tự bỏ qua nếu đã xong):
  1. Python 3.8+.
  2. cau-hinh.json (chép từ cau-hinh.mau.json): hồ sơ dự án và nháp ở ../Du an, thành phẩm ở ../Thanh pham, cạnh repo
     (người dùng bản cũ đã có ../Nhap mà chưa có ../Du an thì giữ ../Nhap).
  3. Tạo hai thư mục làm việc đó (và Du an/_tam cho việc tạm) NGOÀI repo; chép các tệp phong cách của bạn từ bản
     khởi đầu (brand/brand.json, phong-cach/PHONG-CACH.md, tu-ngu.json, PHAN-TICH-MAU.md, minh-hoa/an-du.json) nếu chưa có.
  4. Máy vẽ: Playwright + Chromium (mọi hệ điều hành), hoặc Google Chrome có sẵn (Mac, Linux).
     Chưa có cái nào thì cài Playwright (cần mạng; mỗi lần chạy tối đa khoảng 150 giây, thoát mã 2 = chạy lại y nguyên).
  5. Thư viện ảnh nhẹ: Pillow, NumPy (JPG 4:4:4, nhúng sRGB, kiểm tương phản).
  6. Dựng thử khuôn trich-dan ra Du an/_tam/dung-thu/.
Trạng thái ghi vào cau-hinh.json > caiDat (không lên git).

Nơi không có trình duyệt và không cài được (ví dụ máy ảo của Claude Cowork): vẫn dùng được mọi phần khác; dựng ảnh
qua sandbox đám mây của phiên hoặc hàng đợi dựng trên máy thật (docs/QUY-TRINH-KY-THUAT.md mục 2).
"""
import argparse
import datetime
import importlib
import json
import os
import platform
import re
import shutil
import subprocess
import sys
import time

sys.dont_write_bytecode = True  # không để __pycache__ trong repo
TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)
CAU_HINH = os.path.join(GOC, 'cau-hinh.json')
MAU = os.path.join(GOC, 'cau-hinh.mau.json')
HAN_GIAY = 150
BAT_DAU = time.time()


# ---------------------------------------------------------------- tiện ích
def doc_cau_hinh():
    if os.path.exists(CAU_HINH):
        try:
            with open(CAU_HINH, encoding='utf-8') as f:
                return json.load(f)
        except ValueError:
            print('! cau-hinh.json hỏng (không đọc được JSON): sửa tay hoặc xoá để tạo lại.')
            sys.exit(1)
    return {}


def ghi_cau_hinh(ch):
    with open(CAU_HINH, 'w', encoding='utf-8') as f:
        json.dump(ch, f, ensure_ascii=False, indent=2)
        f.write('\n')


def duong(ch, khoa):
    v = (ch.get(khoa) or '').strip()
    if not v:
        return None
    v = os.path.expanduser(v)
    return os.path.normpath(v if os.path.isabs(v) else os.path.join(GOC, v))


def co_module(ten):
    try:
        importlib.import_module(ten)
        return True
    except Exception:
        return False


def pip_cai(goi):
    """Cài gói Python cho đúng trình thông dịch đang chạy; tự thử lại khi gặp môi trường 'externally managed'."""
    lenh = [sys.executable, '-m', 'pip', 'install', '--user', '--quiet', '--disable-pip-version-check'] + goi
    if os.environ.get('VIRTUAL_ENV'):
        lenh.remove('--user')
    r = subprocess.run(lenh, capture_output=True, text=True)
    if r.returncode != 0 and 'externally-managed' in (r.stdout + r.stderr):
        r = subprocess.run(lenh + ['--break-system-packages'], capture_output=True, text=True)
    if r.returncode != 0:
        print('    ' + ((r.stderr or r.stdout).strip().splitlines() or ['pip lỗi'])[-1][:300])
    importlib.invalidate_caches()
    return r.returncode == 0


def tim_chrome():
    try:
        sys.path.insert(0, TOOLS)
        import ve
        return ve.tim_chrome()
    except Exception:
        return None


def playwright_chay_duoc():
    if not co_module('playwright'):
        return False
    ma = ('from playwright.sync_api import sync_playwright\n'
          'with sync_playwright() as p:\n b = p.chromium.launch(); b.close()\n')
    try:
        r = subprocess.run([sys.executable, '-c', ma], capture_output=True, text=True, timeout=90)
        return r.returncode == 0
    except Exception:
        return False


def may_ve():
    """Trả (tên máy vẽ dùng được hoặc None, ghi chú)."""
    if playwright_chay_duoc():
        return 'playwright', 'Playwright + Chromium'
    c = tim_chrome()
    if c and os.name != 'nt':
        return 'chrome', c
    return None, ('có Chrome nhưng trên Windows cần Playwright' if c else 'chưa có Playwright, không thấy Google Chrome')


CHO_TRONG = re.compile(r'\[(?:\.\.\.|TÊN BẠN|Tên|Học vị|Chức danh|ví dụ|ngày|Mô tả|họ chính|họ phụ|tên họ|danh sách|có / chưa|mặc định|dùng|khi nào|loại ấn phẩm|tên tổ chức)[^\]]*\]')


def cho_trong_phong_cach():
    """Các chỗ còn để trống trong phong-cach/PHONG-CACH.md (dấu [...] của bản khởi đầu)."""
    p = os.path.join(GOC, 'phong-cach', 'PHONG-CACH.md')
    if not os.path.exists(p):
        return ['(không có tệp)']
    with open(p, encoding='utf-8') as f:
        return CHO_TRONG.findall(f.read())


def da_dien_phong_cach():
    return not cho_trong_phong_cach()


def con_thoi_gian():
    return HAN_GIAY - (time.time() - BAT_DAU)


# ---------------------------------------------------------------- trạng thái
def trang_thai(in_ra=True):
    ch = doc_cau_hinh()
    cd = ch.get('caiDat', {})
    nhap, tp = duong(ch, 'thuMucDuAn'), duong(ch, 'thuMucThanhPham')
    ten_may, ghi_chu = may_ve()
    tt = {
        'python': sys.version.split()[0],
        'heDieuHanh': f'{platform.system()} {platform.machine()}',
        'cauHinh': bool(ch),
        'thuMucNhap': nhap if nhap and os.path.isdir(nhap) else None,
        'thuMucThanhPham': tp if tp and os.path.isdir(tp) else None,
        'mayVe': ten_may,
        'pillow': co_module('PIL'),
        'numpy': co_module('numpy'),
        'opencv': co_module('cv2'),
        'pikepdf': co_module('pikepdf'),
        'rembg': co_module('rembg'),
        'dungThu': bool(cd.get('dungThu')),
        'daThietLap': bool(cd.get('daThietLap')) and da_dien_phong_cach(),
        'daGioiThieu': bool(cd.get('daGioiThieu')),
    }
    if in_ra:
        v = lambda b: 'có' if b else 'chưa'
        print('TRẠNG THÁI XƯỞNG THIẾT KẾ')
        print(f'  Repo:            {GOC}')
        print(f'  Python:          {tt["python"]} ({tt["heDieuHanh"]})')
        print(f'  cau-hinh.json:   {v(tt["cauHinh"])}')
        print(f'  Thư mục dự án:   {tt["thuMucNhap"] or "chưa có"}')
        print(f'  Thư mục thành phẩm: {tt["thuMucThanhPham"] or "chưa có"}')
        print(f'  Máy vẽ:          {ten_may or "KHÔNG CÓ"} ({ghi_chu})')
        print(f'  Thư viện:        Pillow {v(tt["pillow"])}, NumPy {v(tt["numpy"])}, OpenCV {v(tt["opencv"])}, '
              f'pikepdf {v(tt["pikepdf"])}, rembg {v(tt["rembg"])}')
        nd, lo = shutil.which('node'), shutil.which('soffice') or shutil.which('libreoffice')
        print(f'  Bài trình chiếu: Node.js {v(nd)}, LibreOffice (xem trước) {v(lo)}' + ('' if nd else ' (cần Node.js để dựng slide: nodejs.org)'))
        print(f'  Dựng thử:        {"ĐẠT" if tt["dungThu"] else "chưa"}')
        con = cho_trong_phong_cach()
        print(f'  Phong cách:      {"đã thiết lập" if tt["daThietLap"] else f"CHƯA ({len(con)} chỗ trống trong phong-cach/PHONG-CACH.md)"}')
        print(f'  Giới thiệu xưởng: {"đã" if tt["daGioiThieu"] else "chưa"}')
        print('\nViệc tiếp theo: ' + viec_tiep(tt))
    return tt


def viec_tiep(tt):
    if not tt['cauHinh'] or not tt['thuMucNhap'] or not tt['thuMucThanhPham']:
        return 'chạy python3 tools/cai-dat.py'
    if not tt['mayVe']:
        return ('nơi này không có trình duyệt: dựng ảnh qua sandbox đám mây của phiên, hoặc hàng đợi dựng '
                '(Dung tren may.command / .bat) trên máy thật; hoặc chạy python3 tools/cai-dat.py ở máy có mạng để cài Playwright')
    if not tt['dungThu']:
        return 'chạy python3 tools/cai-dat.py để dựng thử'
    if not tt['daThietLap']:
        return 'thiết lập phong cách: skill skills/thiet-ke-thiet-lap/SKILL.md'
    if not tt['daGioiThieu']:
        return 'giới thiệu xưởng cho người dùng: skills/thiet-ke-thiet-lap/references/gioi-thieu-xuong.md'
    return 'xưởng sẵn sàng: làm ấn phẩm đầu tiên (skill skills/thiet-ke/SKILL.md)'


# ---------------------------------------------------------------- các bước
def buoc_python():
    if sys.version_info < (3, 8):
        print(f'✗ Python {sys.version.split()[0]} quá cũ, cần 3.8 trở lên (python.org).')
        sys.exit(1)
    print(f'✓ Python {sys.version.split()[0]}')


def buoc_cau_hinh():
    ch = doc_cau_hinh()
    if ch.get('thuMucDuAn') and ch.get('thuMucThanhPham'):
        print('✓ cau-hinh.json')
        return ch
    mau = {}
    if os.path.exists(MAU):
        with open(MAU, encoding='utf-8') as f:
            mau = {k: v for k, v in json.load(f).items() if not k.startswith('_')}
    ch = dict({'thuMucDuAn': '../Du an', 'thuMucThanhPham': '../Thanh pham'}, **mau, **ch)
    cu, moi = os.path.join(GOC, '..', 'Nhap'), os.path.join(GOC, '..', 'Du an')
    if os.path.isdir(cu) and not os.path.isdir(moi):
        ch['thuMucDuAn'] = '../Nhap'  # người dùng bản cũ: giữ thư mục đang có (đổi tên sang Du an được, xem docs/DONG-GOP.md)
    ghi_cau_hinh(ch)
    print(f'✓ tạo cau-hinh.json (dự án và nháp ở {ch["thuMucDuAn"]}, thành phẩm ở ../Thanh pham, cạnh repo)')
    return ch


def buoc_thu_muc(ch):
    for khoa, ten in (('thuMucDuAn', 'dự án và nháp'), ('thuMucThanhPham', 'thành phẩm')):
        d = duong(ch, khoa)
        r, g = os.path.realpath(d), os.path.realpath(GOC)
        if r == g or r.startswith(g + os.sep):
            print(f'✗ cau-hinh.json > {khoa} trỏ vào trong repo ({d}): đổi ra ngoài repo, ví dụ "../Du an".')
            sys.exit(1)
        os.makedirs(d, exist_ok=True)
        print(f'✓ thư mục {ten}: {d}')
    os.makedirs(os.path.join(duong(ch, 'thuMucDuAn'), '_tam'), exist_ok=True)


TEP_CUA_BAN = [('brand/brand.mau.json', 'brand/brand.json'), ('phong-cach/PHONG-CACH.mau.md', 'phong-cach/PHONG-CACH.md'),
               ('phong-cach/tu-ngu.mau.json', 'phong-cach/tu-ngu.json'), ('phong-cach/PHAN-TICH-MAU.mau.md', 'phong-cach/PHAN-TICH-MAU.md'),
               ('minh-hoa/an-du.mau.json', 'minh-hoa/an-du.json')]


def buoc_tep_cua_ban():
    """Phần của người dùng: chép từ bản khởi đầu *.mau.* nếu chưa có; không bao giờ ghi đè bản đã có."""
    tao = []
    for mau, that in TEP_CUA_BAN:
        pm, pt = os.path.join(GOC, mau), os.path.join(GOC, that)
        if os.path.exists(pm) and not os.path.exists(pt):
            shutil.copyfile(pm, pt)
            tao.append(that)
    print('✓ tệp phong cách của bạn: ' + ('tạo ' + ', '.join(tao) if tao else 'đã có (giữ nguyên)'))


def buoc_may_ve(khong_cai):
    ten, ghi_chu = may_ve()
    if ten:
        print(f'✓ máy vẽ: {ten} ({ghi_chu})')
        return ten
    if khong_cai:
        print(f'! chưa có máy vẽ ({ghi_chu}); bỏ qua cài vì --khong-cai')
        return None
    print('… cài Playwright (thư viện điều khiển trình duyệt để dựng ảnh)')
    if not co_module('playwright') and not pip_cai(['playwright']):
        print('! không cài được Playwright qua mạng.')
        return None
    if con_thoi_gian() < 40:
        print('… hết lượt thời gian, chạy lại lệnh này để cài tiếp.')
        sys.exit(2)
    print('… tải Chromium cho Playwright (khoảng 150 MB)')
    try:
        r = subprocess.run([sys.executable, '-m', 'playwright', 'install', 'chromium'], capture_output=True, text=True,
                           timeout=max(30, con_thoi_gian() - 5))
        if r.returncode != 0:
            print('    ' + ((r.stderr or r.stdout).strip().splitlines() or ['lỗi'])[-1][:300])
    except subprocess.TimeoutExpired:
        print('… chưa tải xong, chạy lại lệnh này để tải tiếp.')
        sys.exit(2)
    ten, ghi_chu = may_ve()
    if ten:
        print(f'✓ máy vẽ: {ten}')
        return ten
    print('! không tải được Chromium ở nơi này (mạng chặn hoặc thiếu thư viện hệ thống).')
    return None


def buoc_thu_vien(khong_cai, anh, tach_nen):
    can = [('PIL', 'pillow'), ('numpy', 'numpy')]
    if anh:
        can += [('cv2', 'opencv-python-headless'), ('pillow_heif', 'pillow-heif'), ('pikepdf', 'pikepdf')]
    if tach_nen:
        can += [('rembg', 'rembg[cpu]')]
    thieu = [g for m, g in can if not co_module(m)]
    if not thieu:
        print('✓ thư viện: ' + ', '.join(g for _, g in can))
        return
    if khong_cai:
        print('! thiếu thư viện (bỏ qua vì --khong-cai): ' + ', '.join(thieu))
        return
    print('… cài thư viện: ' + ', '.join(thieu))
    for g in thieu:
        if con_thoi_gian() < 20:
            print('… hết lượt thời gian, chạy lại lệnh này để cài tiếp.')
            sys.exit(2)
        pip_cai([g])
    con = [g for m, g in can if not co_module(m)]
    print('✓ thư viện đủ' if not con else '! chưa cài được: ' + ', '.join(con) + ' (xưởng vẫn chạy, kém vài tính năng)')


def buoc_dung_thu(ch, ten_may):
    if not ten_may:
        print('- bỏ qua dựng thử: nơi này chưa có máy vẽ')
        return False
    ra = os.path.join(duong(ch, 'thuMucDuAn'), '_tam', 'dung-thu')
    shutil.rmtree(ra, ignore_errors=True)
    mau = os.path.join(GOC, 'khuon', 'trich-dan', 'mau.json')
    r = subprocess.run([sys.executable, os.path.join(TOOLS, 've.py'), mau, '--nhap', '--tt', 'vuong', '--ra', ra, '--may', ten_may],
                       capture_output=True, text=True, env=dict(os.environ, PYTHONDONTWRITEBYTECODE='1'))
    anh = [f for f in (os.listdir(ra) if os.path.isdir(ra) else []) if f.endswith('.png')]
    if r.returncode == 0 and anh:
        print(f'✓ dựng thử ĐẠT: {os.path.join(ra, anh[0])}')
        return True
    print('✗ dựng thử KHÔNG ĐẠT:\n    ' + '\n    '.join((r.stdout + r.stderr).strip().splitlines()[-8:]))
    return False


# ---------------------------------------------------------------- chạy
def main():
    ap = argparse.ArgumentParser(description='Cài đặt, kiểm môi trường Xưởng thiết kế.')
    ap.add_argument('--trang-thai', action='store_true')
    ap.add_argument('--anh', action='store_true')
    ap.add_argument('--tach-nen', action='store_true')
    ap.add_argument('--khong-cai', action='store_true')
    ap.add_argument('--khong-thu', action='store_true')
    ap.add_argument('--danh-dau', choices=['thiet-lap', 'gioi-thieu'])
    a = ap.parse_args()
    if a.trang_thai:
        trang_thai()
        return
    if a.danh_dau:
        ch = doc_cau_hinh()
        cd = ch.setdefault('caiDat', {})
        cd['daThietLap' if a.danh_dau == 'thiet-lap' else 'daGioiThieu'] = datetime.date.today().isoformat()
        ghi_cau_hinh(ch)
        print(f'✓ đã ghi dấu {a.danh_dau}')
        return
    print(f'CÀI ĐẶT XƯỞNG THIẾT KẾ ({GOC})\n')
    buoc_python()
    ch = buoc_cau_hinh()
    buoc_thu_muc(ch)
    buoc_tep_cua_ban()
    ten_may = buoc_may_ve(a.khong_cai)
    buoc_thu_vien(a.khong_cai, a.anh, a.tach_nen)
    ch = doc_cau_hinh()
    cd = ch.setdefault('caiDat', {})
    if not a.khong_thu:
        cd['dungThu'] = buoc_dung_thu(ch, ten_may)
    cd['mayVe'] = ten_may
    cd['luc'] = datetime.datetime.now().isoformat(timespec='seconds')
    ghi_cau_hinh(ch)
    print()
    tt = trang_thai(in_ra=False)
    if tt['dungThu'] or (a.khong_thu and ten_may):
        print('✓ CÀI XONG.')
    elif not ten_may:
        print('✓ CÀI XONG PHẦN KHÔNG CẦN TRÌNH DUYỆT.')
    print('Việc tiếp theo: ' + viec_tiep(tt))


if __name__ == '__main__':
    main()
