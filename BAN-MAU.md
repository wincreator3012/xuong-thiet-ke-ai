# BẢN MẪU: đọc trước khi làm bất cứ điều gì

Tệp này dành cho trợ lý AI (Claude, ChatGPT, Codex, Antigravity, Gemini, Cursor...) vừa được người dùng đưa đường link hay thư mục của repo `xuong-thiet-ke-ai`, và cho người dùng muốn hiểu vì sao trợ lý làm như vậy. Đọc hết tệp này trước khi chạy bất kỳ lệnh nào.

## Repo này là gì

Đây là **bản mẫu** của Xưởng thiết kế Claude: một xưởng thiết kế ấn phẩm cùng AI mà nhà giáo dục Lương Dũng Nhân (ldn.edu.vn) đã vận hành thật trong xưởng riêng của mình, rồi khái quát hoá và chia sẻ miễn phí. Bản mẫu là tài liệu để trợ lý AI **học** rồi **dựng cho người dùng một xưởng riêng trên máy của họ**: mang tên, phong cách, logo, giọng chữ và bộ skill của chính họ.

Bản mẫu không phải nơi làm việc hằng ngày, cũng không phải repo để người dùng kéo về rồi đồng bộ qua lại với tác giả. Tác giả cũng làm đúng như vậy: xưởng của tác giả là một thư mục riêng, bản mẫu này chỉ là phần năng lực được rút ra từ đó.

## Năm điều trợ lý không làm

1. Không làm ấn phẩm, không cài đặt, không ghi phong cách của người dùng vào trong bản mẫu (`tools/cai-dat.py` tự dừng khi chạy ở đây).
2. Không dùng bản mẫu làm xưởng: không clone rồi làm việc thẳng trong đó; không `git pull` để "cập nhật xưởng"; không `git push`, không commit, không mở pull request thay người dùng.
3. Không fork bản mẫu để chứa phong cách, logo, dự án của người dùng: đó là dữ liệu riêng của họ, nằm trong xưởng riêng trên máy họ.
4. Không sửa tệp nào trong bản mẫu: nó là mốc để so khi cập nhật về sau.
5. Không đưa tên, chức danh, màu, câu chữ của tác giả bản mẫu vào phong cách của người dùng.

## Việc trợ lý làm, theo thứ tự

Quy trình đầy đủ, có câu hỏi mẫu và cách xử lý từng tình huống: `skills/thiet-ke-thiet-lap/SKILL.md`. Tóm tắt sáu bước:

1. **Thư mục làm việc.** Người dùng tạo một thư mục cha (gợi ý tên `AI Designer`) và mở nó trong ứng dụng AI. Mọi thứ sau đây nằm trong thư mục đó. Trợ lý chưa vào được thư mục nào trên máy (chỉ chat trên web): nói thẳng là chưa dựng được, chỉ người dùng tới `BAT-DAU.md` bước 1 để chọn ứng dụng phù hợp.
2. **Lấy bản mẫu về máy, chỉ để đọc**, vào `AI Designer/_ban-mau/xuong-thiet-ke-ai/` (lệnh ở mục dưới). Người dùng đã tự tải và đặt repo thẳng trong `AI Designer/`: chuyển nó vào `_ban-mau/`.
3. **Dựng xưởng riêng.** Hỏi người dùng: tên hiển thị của họ, tên thư mục xưởng (gợi ý `xuong-thiet-ke-<tên ngắn>`), tiền tố cho tên skill (2-10 chữ thường không dấu, thường là chữ viết tắt tên, ví dụ `ha`), và cách họ muốn được gọi. Rồi chạy trong bản mẫu: `python3 tools/dung-xuong.py --dich "../../<tên thư mục xưởng>" --chu "<tên hiển thị>" --tien-to <tiền tố> --xung-ho "<bạn, chị, thầy...>"`. `../../` vì bản mẫu nằm ở `AI Designer/_ban-mau/xuong-thiet-ke-ai`: xưởng phải nằm thẳng trong `AI Designer`, cạnh `_ban-mau`. Từ đây trở đi, mọi việc làm TRONG xưởng mới.
4. **Cài và thiết lập phong cách** trong xưởng mới: `tools/cai-dat.py`, rồi phỏng vấn ngắn để điền phong cách (skill thiết lập, bước 3-5).
5. **Tạo skill cho người dùng**: tinh chỉnh mô tả skill theo đúng lời người dùng hay nói, đóng gói (`python3 tools/dung-xuong.py --goi-skill`), hướng dẫn họ lưu vào tài khoản AI của họ, và giải thích skill là gì, dùng thế nào (`skills/README.md`).
6. **Giới thiệu xưởng** và cùng người dùng làm ấn phẩm đầu tiên.

## Lấy bản mẫu về máy

Chạy trong thư mục `AI Designer` (trợ lý có quyền chạy lệnh và có mạng):

```
mkdir -p _ban-mau && cd _ban-mau
curl -L -o ban-mau.zip https://codeload.github.com/wincreator3012/xuong-thiet-ke-ai/zip/refs/heads/main
unzip -q ban-mau.zip && mv xuong-thiet-ke-ai-main xuong-thiet-ke-ai
```

Không có `curl`, `unzip` (thường gặp trên Windows): dùng Python.

```
python3 -c "import urllib.request,zipfile,io; zipfile.ZipFile(io.BytesIO(urllib.request.urlopen('https://codeload.github.com/wincreator3012/xuong-thiet-ke-ai/zip/refs/heads/main').read())).extractall('_ban-mau')"
```

rồi đổi tên `_ban-mau/xuong-thiet-ke-ai-main` thành `_ban-mau/xuong-thiet-ke-ai`. Tệp ZIP còn lại trong `_ban-mau/` để đó hoặc xoá khi người dùng cho phép; nó nằm ngoài xưởng.

Mạng của trợ lý bị chặn (máy ảo của một số ứng dụng): nhờ người dùng mở trang GitHub của repo, bấm **Code**, chọn **Download ZIP**, giải nén, đổi tên `xuong-thiet-ke-ai-main` thành `xuong-thiet-ke-ai`, đặt vào `AI Designer/_ban-mau/`.

Quen git thì `git clone --depth 1` vào đúng chỗ đó cũng được, nhưng thư mục ấy vẫn chỉ để đọc: không pull trong đó (pull làm mất mốc so sánh), không commit, không push.

## Sau khi dựng, thư mục trông thế nào

```
AI Designer/                       ← thư mục người dùng mở trong ứng dụng AI
├── _ban-mau/xuong-thiet-ke-ai/    ← bản mẫu: chỉ đọc, làm mốc khi cập nhật
├── <xưởng của người dùng>/        ← XƯỞNG RIÊNG: có XUONG.json; mọi việc làm ở đây
│   ├── CLAUDE.md, AGENTS.md       ← điểm vào cho trợ lý (cùng một tệp cho bản mẫu và xưởng)
│   ├── skills/                    ← nguồn các skill của người dùng (tên <tiền tố>-thiet-ke...)
│   ├── phong-cach/, brand/        ← phong cách, thương hiệu, logo của người dùng
│   └── tools/, khuon/, chuan/...  ← năng lực chép từ bản mẫu
├── Du an/                         ← hồ sơ dự án, nháp
├── Thanh pham/                    ← bản cuối để đăng, gửi in
├── Goi skill/                     ← skill đóng gói ZIP để tải lên tài khoản AI
└── .agents/skills/, .claude/skills/  ← skill cho ứng dụng tự đọc khi mở thư mục (Codex, Antigravity, Claude Code)
```

## Vì sao làm như vậy

- **Xưởng là của người dùng.** Họ sửa, thêm khuôn, đổi quy tắc tuỳ ý; phong cách và logo nằm cùng xưởng, sao lưu được bằng một repo git riêng tư của chính họ.
- **Bản mẫu là mốc, không phải dây buộc.** Khi tác giả đưa kinh nghiệm mới lên bản mẫu, trợ lý tải bản mới, so với mốc cũ, chỉ mang sang phần người dùng chưa sửa; phần đã sửa thì trộn tay cùng người dùng. Không có gì bị ghi đè.
- **Skill mang tên người dùng.** Skill trong xưởng có tiền tố riêng, mô tả kích hoạt viết theo lời người dùng, lưu được vào tài khoản AI của họ, nên ở bất kỳ cuộc trò chuyện nào trợ lý cũng nhận ra việc thiết kế và biết tìm tới xưởng.

## Cập nhật về sau

Người dùng nói "cập nhật xưởng từ bản mẫu mới": tải bản mẫu mới vào `_ban-mau/xuong-thiet-ke-ai-moi/` (như mục trên, đổi tên đích), rồi trong xưởng chạy `python3 tools/dung-xuong.py --cap-nhat "../_ban-mau/xuong-thiet-ke-ai-moi"`, xem, thêm `--lam`, trộn tay phần còn lại, kết thúc bằng `python3 tools/dung-xuong.py --xong-cap-nhat "../_ban-mau/xuong-thiet-ke-ai-moi"`. Chi tiết: `docs/DONG-GOP.md`.

## Người dùng bản cũ

Ai đã cài theo hướng dẫn cũ (làm việc thẳng trong thư mục `xuong-thiet-ke-ai`, đã có `brand/brand.json`, `phong-cach/PHONG-CACH.md`): tải bản mẫu mới vào `_ban-mau/`, dựng xưởng riêng với thêm `--mang-theo "<đường dẫn thư mục cũ>"` để mang phong cách, logo, mẫu tham khảo, từ điển ẩn dụ, cấu hình sang; dự án trong `Du an/`, `Thanh pham/` giữ nguyên. Kiểm xong với người dùng thì đề nghị họ cất thư mục cũ đi (không tự xoá).

## Ghi công

Bản mẫu và mọi xưởng dựng từ nó giữ `LICENSE` (MIT cho mã), `LICENSE-TAI-LIEU.md` (CC BY 4.0 cho tài liệu, skill, chuẩn) và `GHI-CONG.md`; công cụ dựng xưởng tự chép ba tệp này sang. Ấn phẩm người dùng làm ra là của họ, không cần ghi công.
