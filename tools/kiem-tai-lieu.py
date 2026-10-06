#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KIỂM TÀI LIỆU: skill, tài liệu, cấu hình của xưởng có còn nói đúng với nhau không.

    python3 tools/kiem-tai-lieu.py          # kiểm; thoát mã 0 = ĐẠT

Cổng kiểm khuôn (kiem-khuon.py) không đọc chữ; cổng này làm việc đó cho tài liệu:
  1. SKILL.md: phần đầu YAML có name trùng tên thư mục, description dưới 1024 ký tự, không ngoặc nhọn.
  2. Mỗi skill có mặt trong bảng "Việc nào, skill nào" của CLAUDE.md; tên skill nhắc trong tài liệu đều có thật.
  3. Không có gạch dài (em dash) trong tài liệu (quy ước chữ mặc định của xưởng: gạch thường hoặc dấu hai chấm).
  4. Đường dẫn viết trong dấu `...` bắt đầu bằng một thư mục của repo (chuan/, tools/, skills/...) trỏ tới tệp hay
     thư mục có thật (`chuan/08` khớp tiền tố); bỏ qua mẫu có <x>, *, và đường dẫn bên trong một dự án.
  5. Mọi tệp JSON trong repo đọc được; brand.json (hoặc bản khởi đầu brand.mau.json) có thuongHieuMacDinh trỏ tới một
     thương hiệu có thật, và mọi tệp logo khai trong đó có trong brand/logo/.
"""
import glob
import json
import os
import re
import sys

sys.dont_write_bytecode = True  # không để __pycache__ trong repo
TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)
BO_QUA_THU_MUC = {'.git', '__pycache__', 'Claude outputs', 'node_modules', 'mau-tham-khao'}
GACH_DAI = chr(0x2014)
DUONG_DAN = re.compile(r'`([^`\s]+)`')
# đường dẫn bên trong một dự án, ngoài repo, hay sinh ra lúc chạy: không kiểm tồn tại
BO_QUA_DAU = ('nguon/', 'anh/', 'thiet-ke/', 'nhap/', 'xuat/', 'Nhap/', 'Thanh pham/', '../', '_tam', '_to_delete', '$', '~',
              '/', 'http', 'kho:', 'Claude outputs', 'thiet-ke/_phien-ban', 'references/<', 'AI Designer')
SINH_KHI_DUNG = ('cau-hinh.json', 'in-an/icc/', 'phong-cach/mau-tham-khao/', 'brand/brand.json', 'phong-cach/PHONG-CACH.md',
                 'phong-cach/tu-ngu.json', 'phong-cach/PHAN-TICH-MAU.md', 'minh-hoa/an-du.json')  # tạo từ bản *.mau.* lúc cài
KY_TU_MAU = set('<>{}*|$=,:;()[]\'"')


def tep_van_ban():
    for dp, dn, fn in os.walk(GOC):
        dn[:] = [d for d in dn if d not in BO_QUA_THU_MUC]
        for f in fn:
            if f.endswith('.md'):
                yield os.path.join(dp, f)


def doc(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


def dau_yaml(text):
    if not text.startswith('---\n'):
        return None, 'không mở bằng ---'
    j = text.find('\n---', 4)
    if j < 0:
        return None, 'phần đầu YAML không đóng'
    d = {}
    for dong in text[4:j].splitlines():
        if ':' in dong:
            k, v = dong.split(':', 1)
            v = v.strip()
            if len(v) >= 2 and v[0] == v[-1] == '"':
                v = v[1:-1]
            d[k.strip()] = v
    return d, None


def main():
    loi, canh = [], []
    skills = sorted(os.path.basename(os.path.dirname(p)) for p in glob.glob(os.path.join(GOC, 'skills', '*', 'SKILL.md')))
    claude = doc(os.path.join(GOC, 'CLAUDE.md'))
    for s in skills:
        rel = f'skills/{s}/SKILL.md'
        d, e = dau_yaml(doc(os.path.join(GOC, rel)))
        if e:
            loi.append(f'{rel}: {e}')
            continue
        if d.get('name') != s:
            loi.append(f'{rel}: name "{d.get("name")}" khác tên thư mục "{s}"')
        mo = d.get('description', '')
        if not mo:
            loi.append(f'{rel}: thiếu description')
        elif len(mo) > 1024:
            loi.append(f'{rel}: description {len(mo)} ký tự (trần 1024)')
        elif '<' in mo or '>' in mo:
            loi.append(f'{rel}: description chứa ngoặc nhọn')
        if f'`skills/{s}/`' not in claude:
            loi.append(f'CLAUDE.md: bảng "Việc nào, skill nào" thiếu skills/{s}/')
    ten_skill = re.compile(r'(?<![\w/-])(thiet-ke(?:-[a-z]+)*)(?![\w/.-])')
    for p in tep_van_ban():
        rel = os.path.relpath(p, GOC)
        text = doc(p)
        for i, dong in enumerate(text.splitlines(), 1):
            if GACH_DAI in dong.replace('(' + GACH_DAI + ')', ''):  # '(—)' là chỗ tài liệu nêu chính dấu ấy
                loi.append(f'{rel}:{i}: có gạch dài (em dash)')
            for m in ten_skill.finditer(dong):
                t = m.group(1)
                if t not in skills:
                    canh.append(f'{rel}:{i}: nhắc "{t}" nhưng không có skill tên này')
            for m in DUONG_DAN.finditer(dong):
                d = m.group(1).rstrip('.,;:')
                if any(c in KY_TU_MAU for c in d) or d.startswith(BO_QUA_DAU) or d.startswith(SINH_KHI_DUNG) or '/' not in d:
                    continue
                dau = d.split('/')[0]
                if not os.path.exists(os.path.join(GOC, dau)):
                    continue  # tên ngoài repo (repo khác, thư mục của dự án): không kiểm được
                if not (os.path.exists(os.path.join(GOC, d)) or glob.glob(os.path.join(GOC, d) + '*')):
                    loi.append(f'{rel}:{i}: đường dẫn `{d}` không có trong repo')
    for p in glob.glob(os.path.join(GOC, '**', '*.json'), recursive=True):
        if any(x in p.split(os.sep) for x in BO_QUA_THU_MUC):
            continue
        try:
            json.load(open(p, encoding='utf-8'))
        except ValueError as e:
            loi.append(f'{os.path.relpath(p, GOC)}: JSON lỗi ({e})')
    try:
        pb = os.path.join(GOC, 'brand', 'brand.json')
        b = json.load(open(pb if os.path.exists(pb) else os.path.join(GOC, 'brand', 'brand.mau.json'), encoding='utf-8'))
        if b.get('thuongHieuMacDinh') not in b.get('thuongHieu', {}):
            loi.append('brand/brand.json: thuongHieuMacDinh không trỏ tới thương hiệu có thật')
        for k, th in b.get('thuongHieu', {}).items():
            for vai, tep in (th.get('logo') or {}).items():
                if tep and not os.path.exists(os.path.join(GOC, 'brand', 'logo', tep)):
                    loi.append(f'brand/brand.json: logo {k}.{vai} = "{tep}" không có trong brand/logo/')
    except (OSError, ValueError):
        pass
    for c in canh:
        print('  cảnh báo: ' + c)
    if loi:
        print(f'KIỂM TÀI LIỆU: KHÔNG ĐẠT ({len(loi)} lỗi)')
        for l in loi:
            print('  ' + l)
        sys.exit(1)
    print(f'KIỂM TÀI LIỆU: ĐẠT ({len(skills)} skill)')


if __name__ == '__main__':
    main()
