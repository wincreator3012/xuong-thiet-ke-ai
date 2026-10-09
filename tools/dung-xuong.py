#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""DỰNG XƯỞNG RIÊNG từ bản mẫu, đóng gói skill cho tài khoản AI, cập nhật từ bản mẫu mới.

Bản mẫu (repo xuong-thiet-ke-ai, có tệp BAN-MAU.md) là tài liệu để trợ lý AI học và dựng xưởng. Người dùng KHÔNG làm
việc trong bản mẫu, không git pull, push, commit vào đó. Xưởng của người dùng là một thư mục riêng, dựng bằng lệnh dưới
đây, mang tên và skill riêng của họ, nằm cạnh bản mẫu trong thư mục cha (gợi ý "AI Designer"):

    AI Designer/
    ├── _ban-mau/xuong-thiet-ke-ai/   bản mẫu: chỉ đọc, làm mốc để cập nhật về sau
    ├── <xưởng của bạn>/              xưởng riêng (có XUONG.json): mọi việc làm ở đây
    ├── Du an/, Thanh pham/           dự án, nháp, thành phẩm
    ├── Goi skill/                    skill đóng gói thành ZIP để tải lên tài khoản AI
    └── .agents/skills/, .claude/skills/   skill cho ứng dụng tự đọc từ thư mục (Codex, Antigravity, Claude Code)

Chạy trong BẢN MẪU:
    python3 tools/dung-xuong.py --dich "../../xuong-thiet-ke-ha" --chu "ThS Trần Thu Hà" --tien-to ha [--xung-ho "chị"]
        chép phần năng lực sang thư mục đích, tạo README.md, .gitignore, XUONG.json, cá nhân hoá skill (tên <tiền tố>-<skill>)
        thêm --mang-theo "<thư mục cũ>": người dùng bản cũ đã cài thẳng trong một bản sao repo; mang phong cách, logo,
        mẫu tham khảo, từ điển ẩn dụ, cau-hinh.json từ đó sang xưởng mới (không chép đè tệp nào đã có)

Chạy trong XƯỞNG RIÊNG:
    python3 tools/dung-xuong.py --trang-thai
    python3 tools/dung-xuong.py --goi-skill
        đóng gói skill: ../.agents/skills/, ../.claude/skills/, ../Goi skill/<tên>.zip (để tải lên Claude, ChatGPT)
    python3 tools/dung-xuong.py --da-luu claude|chatgpt|codex|antigravity|claude-code
        ghi dấu người dùng đã lưu skill vào nơi đó
    python3 tools/dung-xuong.py --cap-nhat "../_ban-mau/xuong-thiet-ke-ai-moi" [--lam]
        so bản mẫu mới với mốc: liệt kê (mặc định) hoặc áp (--lam) phần năng lực bạn chưa sửa; liệt kê phần cần trộn tay
    python3 tools/dung-xuong.py --xong-cap-nhat "../_ban-mau/xuong-thiet-ke-ai-moi"
        sau khi đã trộn tay xong: ghi mốc mới, đưa bản mẫu mới vào chỗ mốc, giữ bản cũ ở _ban-mau/_cu-<ngày>
"""
import argparse
import datetime
import fnmatch
import hashlib
import json
import os
import re
import shutil
import subprocess
import tempfile
import sys
import zipfile

sys.dont_write_bytecode = True  # không để __pycache__ trong xưởng

TOOLS = os.path.dirname(os.path.abspath(__file__))
GOC = os.path.dirname(TOOLS)
NGUON_GOC = 'https://github.com/wincreator3012/xuong-thiet-ke-ai'
DAU_BAN_MAU = 'BAN-MAU.md'
TEP_XUONG = 'XUONG.json'

# không chép từ bản mẫu sang xưởng riêng
BO_GOC = {DAU_BAN_MAU, 'README.md', 'BAT-DAU.md', '.gitignore', 'cau-hinh.json', TEP_XUONG}
BO_THU_MUC = {'.git', '__pycache__', 'Claude outputs', 'node_modules', '.agents', '.claude', '_tam', '_to_delete'}
BO_TEN = ['.DS_Store', '*.pyc', '*.zip', '*.tgz']
# phần của người dùng: tạo từ bản *.mau.* lúc cài, không bao giờ chép đè từ bản mẫu
CUA_NGUOI_DUNG = {'brand/brand.json', 'phong-cach/PHONG-CACH.md', 'phong-cach/tu-ngu.json', 'phong-cach/PHAN-TICH-MAU.md',
                  'minh-hoa/an-du.json'}
GIU_TRONG_THU_MUC_RIENG = {'brand/logo': ('README.md', 'logo-mau-'), 'phong-cach/mau-tham-khao': ('README.md',)}


# ---------------------------------------------------------------- tiện ích
def bam(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for khoi in iter(lambda: f.read(1 << 16), b''):
            h.update(khoi)
    return h.hexdigest()


def doc(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


def ghi(p, text):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(text)


def la_ban_mau(goc):
    return os.path.exists(os.path.join(goc, DAU_BAN_MAU))


def doc_xuong(goc=GOC):
    p = os.path.join(goc, TEP_XUONG)
    if not os.path.exists(p):
        return None
    with open(p, encoding='utf-8') as f:
        return json.load(f)


def ghi_xuong(x, goc=GOC):
    ghi(os.path.join(goc, TEP_XUONG), json.dumps(x, ensure_ascii=False, indent=1) + '\n')


def rel(p, goc):
    return os.path.relpath(p, goc).replace(os.sep, '/')


def tep_nang_luc(goc):
    """Mọi tệp năng lực của một bản mẫu (đường dẫn tương đối, dấu /)."""
    ra = []
    for dp, dn, fn in os.walk(goc):
        dn[:] = sorted(d for d in dn if d not in BO_THU_MUC)
        r_dir = rel(dp, goc)
        for f in sorted(fn):
            r = f if r_dir == '.' else f'{r_dir}/{f}'
            if r in BO_GOC or r in CUA_NGUOI_DUNG or any(fnmatch.fnmatch(f, g) for g in BO_TEN):
                continue
            thu_muc = os.path.dirname(r)
            if thu_muc in GIU_TRONG_THU_MUC_RIENG and not f.startswith(GIU_TRONG_THU_MUC_RIENG[thu_muc]):
                continue  # logo, mẫu tham khảo của ai đó lỡ để trong bản mẫu: không mang sang
            ra.append(r)
    return ra


def ten_skill_ban_mau(goc):
    d = os.path.join(goc, 'skills')
    return sorted(s for s in os.listdir(d) if os.path.exists(os.path.join(d, s, 'SKILL.md')))


def la_tep_skill(r):
    phan = r.split('/')
    return len(phan) >= 3 and phan[0] == 'skills' and phan[1] != '_chung' and r.endswith('.md')


# ---------------------------------------------------------------- cá nhân hoá skill
def ca_nhan_hoa_skill(text, r, x, ds_skill):
    """Đổi một tệp .md trong skills/<s>/ từ bản mẫu thành bản của xưởng riêng (máy móc; trợ lý tinh chỉnh tiếp)."""
    tt, ten, chu = x['tienTo'], x['ten'], x['chu']
    # mô tả kích hoạt có trần 1024 ký tự: dùng cách gọi ngắn; vẫn dài (tên, tiền tố dài) thì gọi "xưởng riêng"
    m = re.search(r'^description: .*$', text, flags=re.M)
    if m:
        mo = m.group(0)
        for goi in (f'xưởng của {chu}', 'xưởng riêng'):
            moi = mo.replace('Xưởng thiết kế Claude (repo xuong-thiet-ke-ai)', goi)
            mau_ten = '|'.join(re.escape(s) for s in sorted(ds_skill, key=len, reverse=True))
            if len(re.sub(r'(?<![\w/.-])(' + mau_ten + r')(?![\w/-])', lambda k: f'{tt}-{k.group(1)}', moi)) <= 1024 + 14:
                break
        text = text[:m.start()] + moi + text[m.end():]
    text = text.replace('Xưởng thiết kế Claude (repo xuong-thiet-ke-ai)', f'xưởng thiết kế riêng của {chu} (thư mục {ten})')
    text = text.replace('repo **xuong-thiet-ke-ai**', f'xưởng **{ten}**')
    text = text.replace('repo xuong-thiet-ke-ai', f'xưởng {ten}')
    mau = '|'.join(re.escape(s) for s in sorted(ds_skill, key=len, reverse=True))
    text = re.sub(r'(?<![\w/.-])(' + mau + r')(?![\w/-])', lambda m: f'{tt}-{m.group(1)}', text)
    s = r.split('/')[1]
    if r.endswith('/SKILL.md'):
        text = re.sub(r'^name: .*$', f'name: {tt}-{s}', text, count=1, flags=re.M)
        dau = (f'\n> Xưởng: thư mục `{ten}` trong thư mục cha "AI Designer" của {chu}'
               + (f' ({x["duongDanMay"]})' if x.get('duongDanMay') else '') + '. '
               f'Nguồn của skill này là `skills/{s}/SKILL.md` trong xưởng: sửa ở đó trước, rồi đóng gói lại cho tài khoản AI '
               f'(`python3 tools/dung-xuong.py --goi-skill`). Chưa thấy xưởng trong phiên: xin {x.get("xungHo") or "người dùng"} '
               f'nối thư mục "AI Designer" trước rồi mới làm; công cụ, khuôn, chuẩn nằm trong xưởng, skill chỉ là quy trình. '
               f'Dựng từ bản mẫu Xưởng thiết kế Claude của Lương Dũng Nhân (ldn.edu.vn), giấy phép CC BY 4.0.\n')
        text = re.sub(r'^(# .*\n)', lambda m: m.group(1) + dau, text, count=1, flags=re.M)
    return text


def mo_ta(text):
    m = re.search(r'^description: "?(.*?)"?$', text, flags=re.M)
    return m.group(1) if m else ''


# ---------------------------------------------------------------- dựng xưởng
README_XUONG = """# {ten_hien}

Xưởng thiết kế riêng của **{chu}**, làm việc cùng trợ lý AI ngay trên máy: ấn phẩm mạng xã hội, ảnh web, đồ in, đồ sự kiện, sơ đồ tri thức, bài trình chiếu. Mọi ấn phẩm mang phong cách trong `phong-cach/PHONG-CACH.md` và `brand/brand.json`.

Đây là xưởng CỦA BẠN, không phải bản sao để đồng bộ với ai: bạn và trợ lý sửa, thêm, bớt tuỳ ý. Xưởng được dựng ngày {ngay} từ bản mẫu [Xưởng thiết kế Claude]({nguon}) của nhà giáo dục Lương Dũng Nhân (ldn.edu.vn), giữ ghi công theo `GHI-CONG.md`.

## Dùng hằng ngày

- Mở thư mục cha "AI Designer" trong ứng dụng AI (Claude Desktop Cowork, ChatGPT, Codex, Antigravity...) rồi nói việc cần làm bằng lời thường. Trợ lý đọc `CLAUDE.md` (hoặc `AGENTS.md`) và làm theo skill phù hợp.
- Hướng dẫn từng tính năng, cách đặt yêu cầu, xử lý sự cố: `HUONG-DAN.md`.
- Skill của xưởng (tên bắt đầu bằng `{tt}-`): nguồn trong `skills/`, cách lưu vào tài khoản AI và cách dùng ở `skills/README.md`.
- Nháp ở `../Du an/`, thành phẩm ở `../Thanh pham/`, gói skill ở `../Goi skill/`, bản mẫu tham khảo ở `{ban_mau}`.

## Sao lưu, cập nhật

- Sao lưu: chép cả thư mục "AI Designer", hoặc nhờ trợ lý tạo một repo git RIÊNG TƯ cho xưởng này (phong cách, logo của bạn nằm trong đó). Không đẩy xưởng của bạn vào repo của tác giả bản mẫu.
- Lấy kinh nghiệm mới từ bản mẫu: nói "cập nhật xưởng từ bản mẫu mới"; trợ lý tải bản mẫu mới về `_ban-mau/`, so với mốc cũ và chỉ mang sang phần bạn chưa sửa, phần đã sửa thì trộn tay cùng bạn (`docs/DONG-GOP.md`).
"""

GITIGNORE_XUONG = """# rác hệ thống và bản chép của ứng dụng (xưởng không chứa nháp, tạm; tools/kiem-sach.py kiểm)
Claude outputs/
__pycache__/
*.pyc
.DS_Store
node_modules/
# cấu hình riêng từng máy
cau-hinh.json
# hồ sơ màu tải về (giấy phép hạn chế phân phối)
in-an/icc/*.icc
in-an/icc/*.icm
# Phong cách, logo, từ ngữ của bạn ĐƯỢC giữ trong git của xưởng (nếu bạn tạo repo riêng tư cho xưởng này).
"""


def dung(a):
    if not la_ban_mau(GOC):
        sys.exit(f'✗ Lệnh --dich chỉ chạy trong bản mẫu (thư mục có {DAU_BAN_MAU}). Đây là: {GOC}')
    tt = (a.tien_to or '').strip().lower()
    if not re.fullmatch(r'[a-z][a-z0-9]{1,9}', tt):
        sys.exit('✗ --tien-to cần 2-10 chữ thường không dấu, bắt đầu bằng chữ cái (ví dụ: ha, ntma, minhan).')
    if not (a.chu or '').strip():
        sys.exit('✗ thiếu --chu (tên chủ xưởng, viết đúng như người dùng muốn).')
    dich = os.path.abspath(os.path.join(GOC, a.dich)) if not os.path.isabs(a.dich) else a.dich
    r_dich, r_goc = os.path.realpath(dich), os.path.realpath(GOC)
    if r_dich == r_goc or r_dich.startswith(r_goc + os.sep) or r_goc.startswith(r_dich + os.sep):
        sys.exit('✗ Thư mục đích phải nằm NGOÀI bản mẫu và không chứa bản mẫu (ví dụ "../../xuong-thiet-ke-ha").')
    if os.path.basename(os.path.dirname(r_dich)) == '_ban-mau':
        sys.exit('✗ Thư mục đích đang nằm trong _ban-mau/. Xưởng phải nằm thẳng trong thư mục cha "AI Designer", cạnh _ban-mau '
                 '(bản mẫu ở AI Designer/_ban-mau/xuong-thiet-ke-ai thì dùng --dich "../../<tên xưởng>").')
    if os.path.exists(dich) and os.listdir(dich):
        if doc_xuong(dich):
            sys.exit(f'✗ {dich} đã là một xưởng (có {TEP_XUONG}). Cập nhật thì chạy --cap-nhat trong xưởng đó.')
        sys.exit(f'✗ {dich} đã có tệp. Chọn tên thư mục khác, hoặc hỏi người dùng trước khi dùng thư mục này.')
    ten = os.path.basename(os.path.normpath(dich))
    x = {
        '_huong-dan': 'Hồ sơ xưởng riêng, do tools/dung-xuong.py tạo và cập nhật. banMau.bam: dấu vân tay từng tệp năng lực '
                      'của bản mẫu làm mốc; caNhanHoa: dấu vân tay tệp skill sau khi cá nhân hoá. Đừng sửa tay hai mục này.',
        'ten': ten, 'chu': a.chu.strip(), 'tienTo': tt, 'xungHo': (a.xung_ho or '').strip() or None,
        'duongDanMay': (a.duong_dan_may or '').strip() or None,
        'dungLuc': datetime.date.today().isoformat(),
        'banMau': {'nguon': NGUON_GOC, 'thuMuc': rel(GOC, dich), 'bam': {}},
        'caNhanHoa': {},
        'skill': {'danhSach': [], 'goiLuc': None, 'daLuu': []},
    }
    ds_skill = ten_skill_ban_mau(GOC)
    canh = []
    for r in tep_nang_luc(GOC):
        nguon, dich_p = os.path.join(GOC, r), os.path.join(dich, r)
        os.makedirs(os.path.dirname(dich_p), exist_ok=True)
        x['banMau']['bam'][r] = bam(nguon)
        if la_tep_skill(r):
            text = ca_nhan_hoa_skill(doc(nguon), r, x, ds_skill)
            ghi(dich_p, text)
            x['caNhanHoa'][r] = bam(dich_p)
            if r.endswith('/SKILL.md') and len(mo_ta(text)) > 1024:
                canh.append(f'{r}: description {len(mo_ta(text))} ký tự, cần rút dưới 1024')
        else:
            shutil.copy2(nguon, dich_p)
    x['skill']['danhSach'] = [f'{tt}-{s}' for s in ds_skill]
    mang = []
    if a.mang_theo:
        cu = os.path.abspath(os.path.join(GOC, a.mang_theo)) if not os.path.isabs(a.mang_theo) else a.mang_theo
        rieng = list(CUA_NGUOI_DUNG) + ['cau-hinh.json']
        for thu_muc in GIU_TRONG_THU_MUC_RIENG:
            d = os.path.join(cu, thu_muc)
            if os.path.isdir(d):
                rieng += [f'{thu_muc}/{f}' for f in sorted(os.listdir(d)) if os.path.isfile(os.path.join(d, f))]
        for r in rieng:
            nguon, dich_p = os.path.join(cu, r), os.path.join(dich, r)
            if os.path.isfile(nguon) and not os.path.exists(dich_p) and not os.path.basename(r).startswith('.'):
                os.makedirs(os.path.dirname(dich_p), exist_ok=True)
                shutil.copy2(nguon, dich_p)
                mang.append(r)
    ghi(os.path.join(dich, 'README.md'), README_XUONG.format(
        ten_hien=f'Xưởng thiết kế của {x["chu"]}', chu=x['chu'], ngay=x['dungLuc'], nguon=NGUON_GOC, tt=tt,
        ban_mau=x['banMau']['thuMuc'] + '/'))
    ghi(os.path.join(dich, '.gitignore'), GITIGNORE_XUONG)
    ghi_xuong(x, dich)
    print(f'✓ ĐÃ DỰNG XƯỞNG: {dich}')
    print(f'  {len(x["banMau"]["bam"])} tệp năng lực; {len(ds_skill)} skill: ' + ', '.join(x['skill']['danhSach']))
    if a.mang_theo:
        print(f'  mang theo từ xưởng cũ: {len(mang)} tệp' + (': ' + ', '.join(mang) if mang else ' (không thấy tệp riêng nào)'))
    for c in canh:
        print('  ! ' + c)
    print('\nViệc tiếp theo (trong xưởng mới, KHÔNG làm tiếp trong bản mẫu):')
    print(f'  1. python3 "{os.path.join(dich, "tools", "cai-dat.py")}"   (cài, kiểm môi trường, tạo tệp phong cách)')
    print('  2. thiết lập phong cách: skill skills/thiet-ke-thiet-lap/SKILL.md bước 4-5 (đọc trong xưởng mới)')
    print(f'  3. đóng gói skill: python3 tools/dung-xuong.py --goi-skill (trong xưởng mới), rồi hướng dẫn lưu vào tài khoản AI')


# ---------------------------------------------------------------- xưởng riêng
def can_xuong():
    x = doc_xuong()
    if not x:
        if la_ban_mau(GOC):
            sys.exit('✗ Đây là BẢN MẪU, chưa phải xưởng. Dựng xưởng riêng trước: '
                     'python3 tools/dung-xuong.py --dich "../../<tên xưởng>" --chu "<tên>" --tien-to <tt> (xem BAN-MAU.md)')
        sys.exit(f'✗ Không thấy {TEP_XUONG}: thư mục này chưa phải xưởng dựng từ bản mẫu.')
    return x


def cha():
    return os.path.dirname(GOC)


def goi_skill(a):
    x = can_xuong()
    if os.path.basename(cha()) == '_ban-mau':
        sys.exit('✗ Xưởng đang nằm trong _ban-mau/: chuyển thư mục xưởng ra thẳng thư mục cha "AI Designer" rồi đóng gói.')
    noi = [os.path.join(cha(), '.agents', 'skills'), os.path.join(cha(), '.claude', 'skills')]
    thu_zip = os.path.join(cha(), 'Goi skill')
    os.makedirs(thu_zip, exist_ok=True)
    ds = []
    for s in sorted(os.listdir(os.path.join(GOC, 'skills'))):
        thu = os.path.join(GOC, 'skills', s)
        p = os.path.join(thu, 'SKILL.md')
        if not os.path.exists(p):
            continue
        m = re.search(r'^name: "?([^"\n]+)"?$', doc(p), flags=re.M)
        ten = m.group(1).strip() if m else s
        if len(mo_ta(doc(p))) > 1024:
            print(f'  ! skills/{s}/SKILL.md: description quá 1024 ký tự, tài khoản AI sẽ từ chối: rút gọn rồi chạy lại')
        tep = []
        for dp, dn, fn in os.walk(thu):
            dn[:] = [d for d in dn if d not in BO_THU_MUC]
            for f in fn:
                if not any(fnmatch.fnmatch(f, g) for g in BO_TEN):
                    tep.append(os.path.relpath(os.path.join(dp, f), thu))
        for n in noi:
            for t in tep:
                d = os.path.join(n, ten, t)
                os.makedirs(os.path.dirname(d), exist_ok=True)
                shutil.copyfile(os.path.join(thu, t), d)
        with zipfile.ZipFile(os.path.join(thu_zip, f'{ten}.zip'), 'w', zipfile.ZIP_DEFLATED) as z:
            for t in sorted(tep):
                z.write(os.path.join(thu, t), f'{ten}/{t.replace(os.sep, "/")}')
        ds.append(ten)
    x['skill']['danhSach'] = ds
    x['skill']['goiLuc'] = datetime.datetime.now().isoformat(timespec='seconds')
    ghi_xuong(x)
    print(f'✓ ĐÃ ĐÓNG GÓI {len(ds)} SKILL: ' + ', '.join(ds))
    print(f'  ZIP để tải lên tài khoản (Claude, ChatGPT): {thu_zip}')
    print(f'  Bản cho ứng dụng tự đọc khi mở thư mục cha: {noi[0]} (Codex, Antigravity), {noi[1]} (Claude Code)')
    print('  Cách lưu vào từng ứng dụng và cách dùng: skills/README.md')


def da_luu(a):
    x = can_xuong()
    ghi_nho = x['skill'].setdefault('daLuu', [])
    moc = {'noi': a.da_luu, 'luc': datetime.date.today().isoformat(), 'goiLuc': x['skill'].get('goiLuc')}
    x['skill']['daLuu'] = [m for m in ghi_nho if m.get('noi') != a.da_luu] + [moc]
    ghi_xuong(x)
    print(f'✓ đã ghi: skill đã lưu vào {a.da_luu}')


def trang_thai_skill(x):
    goi = x['skill'].get('goiLuc')
    moi_nhat = max((os.path.getmtime(os.path.join(dp, f)) for dp, _, fn in os.walk(os.path.join(GOC, 'skills'))
                    for f in fn if f.endswith('.md')), default=0)
    cu = bool(goi) and datetime.datetime.fromtimestamp(moi_nhat) > datetime.datetime.fromisoformat(goi)
    return goi, cu


def trang_thai(a):
    if la_ban_mau(GOC) and not doc_xuong():
        print(f'ĐÂY LÀ BẢN MẪU ({GOC}).')
        print('Không làm ấn phẩm, không git pull, push, commit ở đây. Dựng xưởng riêng: BAN-MAU.md, '
              'skill skills/thiet-ke-thiet-lap/SKILL.md bước 1-2.')
        return
    x = can_xuong()
    goi, cu = trang_thai_skill(x)
    print(f'XƯỞNG {x["ten"]} của {x["chu"]} (dựng {x["dungLuc"]}, tiền tố skill "{x["tienTo"]}-")')
    print(f'  Bản mẫu làm mốc: {x["banMau"]["thuMuc"]} ({"có" if os.path.isdir(os.path.join(GOC, x["banMau"]["thuMuc"])) else "KHÔNG THẤY"})')
    if x['banMau'].get('capNhatLuc'):
        print(f'  Cập nhật từ bản mẫu lần cuối: {x["banMau"]["capNhatLuc"]}')
    print(f'  Skill: {", ".join(x["skill"].get("danhSach") or [])}')
    print(f'  Đóng gói skill: {goi or "CHƯA"}' + (' (skill đã sửa sau lần đóng gói: chạy lại --goi-skill)' if cu else ''))
    luu = x['skill'].get('daLuu') or []
    print('  Đã lưu vào: ' + (', '.join(f'{m["noi"]} ({m["luc"]})' for m in luu) if luu else 'CHƯA (skills/README.md)'))


# ---------------------------------------------------------------- cập nhật từ bản mẫu mới
def phan_loai(x, moi):
    cu_bam = x['banMau']['bam']
    ds = {'chep': [], 'moi': [], 'tron': [], 'tron-skill': [], 'ban-da-xoa': [], 'bo': []}
    tep_moi = tep_nang_luc(moi)
    for r in tep_moi:
        h_moi, h_cu = bam(os.path.join(moi, r)), cu_bam.get(r)
        if h_moi == h_cu:
            continue
        p = os.path.join(GOC, r)
        if not os.path.exists(p):
            ds['ban-da-xoa' if h_cu else 'moi'].append(r)
        elif la_tep_skill(r):
            ds['tron-skill'].append(r)
        elif bam(p) == x['caNhanHoa'].get(r, h_cu):
            ds['chep'].append(r)
        else:
            ds['tron'].append(r)
    ds['bo'] = sorted(set(cu_bam) - set(tep_moi))
    return ds


def tron_tu_dong(r, cu, moi, x, ds_skill):
    """Trộn ba chiều bằng git merge-file (nếu máy có git): mốc cũ, bản mẫu mới, bản của xưởng. Sạch thì ghi, xung đột thì để trộn tay."""
    p_cu, p_moi, p_xuong = os.path.join(cu, r), os.path.join(moi, r), os.path.join(GOC, r)
    if not (shutil.which('git') and os.path.exists(p_cu) and os.path.exists(p_xuong)) or not r.endswith(('.md', '.json', '.js', '.css', '.html', '.py', '.txt')):
        return False
    goc_text, moi_text = doc(p_cu), doc(p_moi)
    if la_tep_skill(r):
        goc_text, moi_text = ca_nhan_hoa_skill(goc_text, r, x, ds_skill), ca_nhan_hoa_skill(moi_text, r, x, ds_skill)
    with tempfile.TemporaryDirectory() as tam:
        pb, pt = os.path.join(tam, 'goc'), os.path.join(tam, 'moi')
        ghi(pb, goc_text)
        ghi(pt, moi_text)
        kq = subprocess.run(['git', 'merge-file', '-p', p_xuong, pb, pt], capture_output=True)
    if kq.returncode != 0:
        return False
    with open(p_xuong, 'wb') as f:
        f.write(kq.stdout)
    x['banMau']['bam'][r] = bam(p_moi)
    if la_tep_skill(r):
        x['caNhanHoa'][r] = bam(p_xuong)
    return True


def cap_nhat(a):
    x = can_xuong()
    moi = os.path.abspath(os.path.join(GOC, a.cap_nhat)) if not os.path.isabs(a.cap_nhat) else a.cap_nhat
    if not la_ban_mau(moi):
        sys.exit(f'✗ {moi} không phải bản mẫu (thiếu {DAU_BAN_MAU}).')
    ds = phan_loai(x, moi)
    cu = os.path.normpath(os.path.join(GOC, x['banMau']['thuMuc']))
    ds_skill = ten_skill_ban_mau(moi)
    nhan = {'chep': 'CHÉP ĐÈ (bản mẫu đổi, bạn chưa sửa)', 'moi': 'TỆP MỚI (thêm vào xưởng)',
            'tron': 'TRỘN TAY (bản mẫu đổi VÀ bạn đã sửa)', 'tron-skill': 'TRỘN TAY SKILL (giữ phần cá nhân hoá)',
            'ban-da-xoa': 'BẢN MẪU ĐỔI, BẠN ĐÃ XOÁ Ở XƯỞNG (hỏi người dùng có lấy lại không)',
            'bo': 'BẢN MẪU ĐÃ BỎ (xưởng giữ nguyên; hỏi người dùng có bỏ theo không)'}
    tong = sum(len(v) for v in ds.values())
    print(f'CẬP NHẬT TỪ BẢN MẪU: {moi}\n  mốc cũ: {cu}\n  {tong} tệp khác mốc')
    for k, v in ds.items():
        if v:
            print(f'\n{nhan[k]}: {len(v)}')
            for r in v:
                print('  ' + r)
    mau_doi = [r for r in ds['chep'] + ds['moi'] if '.mau.' in r]
    if mau_doi:
        print('\nBản khởi đầu *.mau.* đổi: so với bản của người dùng (brand.json, PHONG-CACH.md...) để thêm khoá, họ màu, '
              'mục mới mà không đổi giá trị họ đã đặt.')
    if not a.lam:
        print('\nChưa đổi gì (xem trước). Áp phần CHÉP ĐÈ và TỆP MỚI: thêm --lam.')
        return
    for r in ds['chep'] + ds['moi']:
        nguon, dich = os.path.join(moi, r), os.path.join(GOC, r)
        os.makedirs(os.path.dirname(dich), exist_ok=True)
        if la_tep_skill(r):  # skill mới hoàn toàn trong bản mẫu
            text = ca_nhan_hoa_skill(doc(nguon), r, x, ds_skill)
            ghi(dich, text)
            x['caNhanHoa'][r] = bam(dich)
        else:
            shutil.copy2(nguon, dich)
        x['banMau']['bam'][r] = bam(nguon)
    con_tron = []
    for r in ds['tron'] + ds['tron-skill']:
        if tron_tu_dong(r, cu, moi, x, ds_skill):
            print(f'  ✓ tự trộn được (không đụng phần bạn sửa): {r}')
        else:
            con_tron.append(r)
    ghi_xuong(x)
    print(f'\n✓ đã áp {len(ds["chep"]) + len(ds["moi"])} tệp, tự trộn {len(ds["tron"]) + len(ds["tron-skill"]) - len(con_tron)} tệp.')
    if con_tron:
        print('CÒN TRỘN TAY: ' + ', '.join(con_tron))
        print('Trộn tay từng tệp: đọc khác biệt giữa mốc cũ và bản mẫu mới (diff "<mốc cũ>/<tệp>" "<bản mẫu mới>/<tệp>"), '
              'đưa đúng phần đổi đó vào tệp của xưởng, giữ phần người dùng đã sửa và phần cá nhân hoá '
              '(tên skill có tiền tố, khối "Xưởng:" đầu skill).')
    print(f'Xong hết thì: python3 tools/dung-xuong.py --xong-cap-nhat "{a.cap_nhat}", rồi --goi-skill nếu skill đổi.')


def xong_cap_nhat(a):
    x = can_xuong()
    moi = os.path.abspath(os.path.join(GOC, a.xong_cap_nhat)) if not os.path.isabs(a.xong_cap_nhat) else a.xong_cap_nhat
    if not la_ban_mau(moi):
        sys.exit(f'✗ {moi} không phải bản mẫu (thiếu {DAU_BAN_MAU}).')
    con = phan_loai(x, moi)
    if con['chep'] or con['moi']:
        sys.exit('✗ còn tệp chưa áp: chạy --cap-nhat ... --lam trước.')
    x['banMau']['bam'] = {r: bam(os.path.join(moi, r)) for r in tep_nang_luc(moi)}
    for r in list(x['banMau']['bam']):
        if la_tep_skill(r) and os.path.exists(os.path.join(GOC, r)):
            x['caNhanHoa'][r] = bam(os.path.join(GOC, r))
    cu = os.path.normpath(os.path.join(GOC, x['banMau']['thuMuc']))
    if os.path.realpath(cu) != os.path.realpath(moi):
        if os.path.isdir(cu):
            luu = os.path.join(os.path.dirname(cu), f'_cu-{datetime.date.today().strftime("%Y%m%d")}-{os.path.basename(cu)}')
            os.rename(cu, luu)
            print(f'✓ bản mẫu cũ chuyển sang {luu} (xoá khi người dùng cho phép)')
        os.rename(moi, cu)
        print(f'✓ bản mẫu mới vào chỗ mốc: {cu}')
    x['banMau']['capNhatLuc'] = datetime.date.today().isoformat()
    ghi_xuong(x)
    print('✓ đã ghi mốc mới vào XUONG.json. Chạy tiếp: tools/kiem-tai-lieu.py, tools/kiem-khuon.py, tools/kiem-sach.py; '
          'skill có đổi thì --goi-skill và lưu lại vào tài khoản AI.')


def main():
    ap = argparse.ArgumentParser(description='Dựng xưởng riêng từ bản mẫu, đóng gói skill, cập nhật từ bản mẫu mới.')
    ap.add_argument('--dich', help='(trong bản mẫu) thư mục xưởng riêng sẽ dựng, ví dụ "../../xuong-thiet-ke-ha" (cạnh _ban-mau)')
    ap.add_argument('--chu', help='tên chủ xưởng, đúng như người dùng muốn hiện')
    ap.add_argument('--tien-to', help='tiền tố tên skill, 2-10 chữ thường không dấu (ví dụ: ha)')
    ap.add_argument('--xung-ho', help='trợ lý gọi người dùng là gì (bạn, anh, chị, thầy, cô...)')
    ap.add_argument('--mang-theo', help='(khi dựng) thư mục xưởng kiểu cũ để mang phong cách, logo, cấu hình sang')
    ap.add_argument('--duong-dan-may', help='đường dẫn thư mục "AI Designer" như người dùng thấy trên máy (tuỳ chọn)')
    ap.add_argument('--goi-skill', action='store_true')
    ap.add_argument('--da-luu', choices=['claude', 'chatgpt', 'codex', 'antigravity', 'claude-code', 'khac'])
    ap.add_argument('--cap-nhat', metavar='BAN_MAU_MOI')
    ap.add_argument('--lam', action='store_true')
    ap.add_argument('--xong-cap-nhat', metavar='BAN_MAU_MOI')
    ap.add_argument('--trang-thai', action='store_true')
    a = ap.parse_args()
    if a.dich:
        dung(a)
    elif a.goi_skill:
        goi_skill(a)
    elif a.da_luu:
        da_luu(a)
    elif a.cap_nhat:
        cap_nhat(a)
    elif a.xong_cap_nhat:
        xong_cap_nhat(a)
    else:
        trang_thai(a)


if __name__ == '__main__':
    main()
