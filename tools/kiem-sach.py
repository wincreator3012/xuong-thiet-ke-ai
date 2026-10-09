#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KIỂM SẠCH: repo chỉ chứa NĂNG LỰC (chuẩn, thương hiệu, khuôn, lõi dựng, công cụ, skill, tài liệu).
Nháp, thành phẩm, việc tạm, file nén, bản sao repo luôn nằm NGOÀI repo (QUY-TRINH-KY-THUAT.md mục 1, "Repo sạch").
Chạy ở đầu và cuối mỗi phiên làm việc; cuối phiên phải ĐẠT mới được báo "xong".

    python3 tools/kiem-sach.py          # kiểm, liệt kê; thoát 1 nếu còn nháp lạc hoặc file lạ
    python3 tools/kiem-sach.py --xoa    # xoá phần NHÁP LẠC (chỉ chạy khi người dùng đã cho phép xoá); file LẠ không bao giờ tự xoá

Hai nhóm kết quả:
  NHÁP LẠC  chắc chắn là rác của phiên: thư mục .tam, Claude outputs, nhap, xuat, _to_delete, _phien-ban, __pycache__,
            file nén (.tgz, .zip), .pyc, .DS_Store, tờ tổng thể và báo cáo kiểm, file khoá thừa. Được phép xoá bằng --xoa.
  LẠ        ảnh, PDF, video nằm ngoài các thư mục tài nguyên, hoặc file lớn bất thường: hỏi người dùng là tài nguyên mới hay nháp.
            Muốn giữ làm ví dụ thì chép vào vi-du/ (sau khi người dùng đồng ý); vi-du/ được bỏ qua khi kiểm.
Ngoài ra báo nếu cau-hinh.json trỏ thư mục nháp, thành phẩm vào trong repo.
"""
import argparse
import fnmatch
import os
import shutil
import subprocess
import sys

sys.dont_write_bytecode = True  # không để __pycache__ trong repo

TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)

THU_MUC_NHAP = {'.tam', 'Claude outputs', 'nhap', 'xuat', 'thiet-ke', '_tam', '_to_delete', '_phien-ban',
                '__pycache__', 'node_modules', '.pytest_cache', '.ipynb_checkpoints'}
TEN_NHAP = ['*.tgz', '*.tar', '*.tar.gz', '*.zip', '*.pyc', '*.bak', '*.orig', '*.rej', '*.tmp', '*.swp', '*~',
            '.DS_Store', '*-bao-cao.json', '*-tong-the.jpg', '*-tong-the.png', 'git-index.lock*', '*lock-thua*']
THU_MUC_TAI_NGUYEN = ('brand', 'fonts', 'in-an', 'phong-cach', 'nghien-cuu', 'minh-hoa',
                      os.path.join('tools', 'models'), os.path.join('tools', 'ban-thiet-ke'), os.path.join('khuon', '_chung'))
THU_MUC_SKILL = {'skills', 'skills-nguon'}
BO_QUA = {'vi-du'}  # ví dụ chủ ý giữ (người dùng đã đồng ý)
DUOI_MEDIA = {'.png', '.jpg', '.jpeg', '.webp', '.heic', '.gif', '.pdf', '.psd', '.ai', '.mp4', '.mov', '.mp3', '.wav', '.pptx', '.key', '.odp'}
NGUONG_LON = 3 * 1024 * 1024


def kich_thuoc(p):
    try:
        if os.path.isfile(p):
            return os.path.getsize(p)
        tong = 0
        for dp, _, fn in os.walk(p):
            for f in fn:
                try:
                    tong += os.path.getsize(os.path.join(dp, f))
                except OSError:
                    pass
        return tong
    except OSError:
        return 0


def dep(n):
    for d in ('B', 'KB', 'MB', 'GB'):
        if n < 1024 or d == 'GB':
            return f'{n:.0f} {d}' if d == 'B' else f'{n:.1f} {d}'
        n /= 1024


def trong_tai_nguyen(rel):
    return any(rel == t or rel.startswith(t + os.sep) for t in THU_MUC_TAI_NGUYEN)


def quet():
    nhap, la = [], []
    for dp, dn, fn in os.walk(GOC):
        rel_dir = os.path.relpath(dp, GOC)
        giu = []
        for d in sorted(dn):
            rel = os.path.normpath(os.path.join(rel_dir, d))
            if rel == '.git' or rel in BO_QUA:
                continue
            if d in THU_MUC_NHAP and os.path.basename(rel_dir) not in THU_MUC_SKILL:  # tên skill (vd skills/thiet-ke) không phải nháp
                nhap.append((rel, 'thư mục nháp, tạm'))
                continue
            giu.append(d)
        dn[:] = giu
        for f in sorted(fn):
            rel = os.path.normpath(os.path.join(rel_dir, f))
            if any(fnmatch.fnmatch(f, g) for g in TEN_NHAP):
                nhap.append((rel, 'file nháp, tạm, nén, rác hệ thống'))
                continue
            if trong_tai_nguyen(rel):
                continue
            p = os.path.join(dp, f)
            duoi = os.path.splitext(f)[1].lower()
            if duoi in DUOI_MEDIA:
                la.append((rel, 'ảnh, PDF, video ngoài thư mục tài nguyên'))
            elif kich_thuoc(p) > NGUONG_LON:
                la.append((rel, f'file lớn bất thường ({dep(kich_thuoc(p))})'))
    return nhap, la


def cau_hinh_trong_repo():
    try:
        sys.path.insert(0, TOOLS)
        import ve
    except Exception:
        return []
    loi = []
    for khoa in ('thuMucDuAn', 'thuMucThanhPham'):
        d = ve.duong_cau_hinh(khoa)
        if d and ve.trong_repo(d):
            loi.append(f'cau-hinh.json > {khoa} trỏ vào trong repo ({d}): đổi ra ngoài repo (ví dụ "../Du an", "../Thanh pham")')
    return loi


def chua_vao_git():
    if not os.path.isdir(os.path.join(GOC, '.git')):
        return []
    try:
        r = subprocess.run(['git', '-C', GOC, 'status', '--porcelain'], capture_output=True, text=True, timeout=30)
    except Exception:
        return []
    return [ln[3:].strip().strip('"') for ln in r.stdout.splitlines() if ln.startswith('??')]


def xoa(muc):
    for rel, _ in muc:
        p = os.path.join(GOC, rel)
        try:
            if os.path.isdir(p) and not os.path.islink(p):
                shutil.rmtree(p)
            else:
                os.remove(p)
            print(f'  đã xoá: {rel}')
        except OSError as e:
            print(f'  KHÔNG xoá được {rel}: {e.strerror} (cần người dùng cho phép xoá trong thư mục này)')


def in_ds(tieu_de, ds):
    print(f'\n{tieu_de} ({len(ds)})')
    for rel, vi_sao in ds:
        print(f'  {rel}  [{dep(kich_thuoc(os.path.join(GOC, rel)))}]  {vi_sao}')


def main():
    ap = argparse.ArgumentParser(description='Kiểm repo sạch: chỉ chứa năng lực.')
    ap.add_argument('--xoa', action='store_true', help='xoá phần NHÁP LẠC (người dùng đã cho phép xoá)')
    a = ap.parse_args()
    nhap, la = quet()
    if a.xoa and nhap:
        print('Xoá nháp lạc trong repo:')
        xoa(nhap)
        nhap, la = quet()
    cfg = cau_hinh_trong_repo()
    if nhap:
        in_ds('NHÁP LẠC trong repo, cần xoá', nhap)
    if la:
        in_ds('FILE LẠ, hỏi người dùng là tài nguyên mới hay nháp (muốn giữ làm ví dụ thì chép vào vi-du/)', la)
    for c in cfg:
        print(f'\nCẤU HÌNH: {c}')
    ngoai_git = [p for p in chua_vao_git() if not any(p.rstrip('/') == r or p.startswith(r + '/') for r, _ in nhap + la)]
    if ngoai_git:
        print(f'\nChưa vào git (thông tin, người dùng tự commit): {len(ngoai_git)} mục')
        for p in ngoai_git[:12]:
            print(f'  {p}')
    sach = not (nhap or la or cfg)
    print('\nREPO SẠCH: ĐẠT' if sach else f'\nREPO CHƯA SẠCH: {len(nhap)} nháp lạc, {len(la)} file lạ'
          + (', cấu hình sai' if cfg else '')
          + ('. Xin phép người dùng xoá rồi chạy lại với --xoa.' if nhap else '.'))
    sys.exit(0 if sach else 1)


if __name__ == '__main__':
    main()
