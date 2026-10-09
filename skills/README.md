# Skill của xưởng

Tài liệu này giải thích skill là gì, xưởng có những skill nào, cách lưu chúng vào tài khoản AI của bạn và cách dùng hằng ngày. Trợ lý AI đọc tệp này ở bước 6 của buổi thiết lập để hướng dẫn bạn; bạn đọc lại bất cứ lúc nào.

## Skill là gì

Hãy hình dung một người thợ giỏi có một ngăn kéo đựng các tờ quy trình nghề: làm bộ thông cáo thì theo tờ này, làm file in thì theo tờ kia. Skill chính là một tờ quy trình như vậy cho trợ lý AI. Mỗi skill là một thư mục có tệp `SKILL.md` gồm hai phần:

- **Phần đầu**: tên skill và một đoạn mô tả kích hoạt, nói skill dùng khi nào, bạn hay nói câu gì, khi nào không dùng.
- **Phần thân**: các bước làm, quy tắc cứng, tài liệu cần đọc.

Trợ lý chỉ đọc lướt phần mô tả của mọi skill. Khi lời bạn khớp với một mô tả ("làm bộ ảnh thông cáo khoá học cho Facebook và story"), nó mở toàn bộ skill đó và làm theo từng bước. Nhờ vậy việc nào cũng đi đúng quy trình đã kiểm chứng, kết quả nhất quán giữa các lần, và bạn không phải dặn lại những điều đã dặn.

Skill là quy trình, xưởng là nơi có đồ nghề. Công cụ dựng, khuôn, chuẩn, phong cách của bạn nằm trong thư mục xưởng; skill chỉ chỉ đường tới đó. Vì vậy dù skill đã lưu trên tài khoản, trợ lý vẫn cần vào được thư mục "AI Designer" mới làm ra ấn phẩm.

## Sáu skill của xưởng

Trong xưởng riêng, mỗi skill mang tiền tố của bạn (ví dụ `ha-thiet-ke`), đặt lúc dựng xưởng và ghi trong `XUONG.json`.

| Skill (thư mục trong `skills/`) | Tên trên tài khoản | Dùng khi |
|---|---|---|
| `thiet-ke-thiet-lap/` | `<tiền tố>-thiet-ke-thiet-lap` | dựng xưởng, thiết lập hay đổi phong cách, tạo và lưu skill, cập nhật xưởng, giới thiệu xưởng |
| `thiet-ke/` | `<tiền tố>-thiet-ke` | mọi ấn phẩm (lõi) |
| `thiet-ke-chu/` | `<tiền tố>-thiet-ke-chu` | chọn và viết chữ trên ấn phẩm |
| `thiet-ke-hinh/` | `<tiền tố>-thiet-ke-hinh` | ảnh thật và hình minh hoạ tri thức |
| `thiet-ke-in-su-kien/` | `<tiền tố>-thiet-ke-in-su-kien` | đồ in và đồ sự kiện |
| `thiet-ke-slide/` | `<tiền tố>-thiet-ke-slide` | bài trình chiếu (slide PPTX) tiếng Việt, tiếng Anh |
| `_chung/` | (không lưu riêng) | phần vận hành dùng chung (nơi chạy lệnh, repo sạch, bảo trì skill) |

Vì sao skill mang tên bạn: tài khoản AI có thể chứa nhiều skill của nhiều nguồn; tiền tố giúp skill của xưởng không trùng tên với skill khác, và bạn nhận ra ngay đâu là skill của mình. Lúc dựng xưởng, trợ lý còn viết lại phần mô tả kích hoạt theo đúng những câu bạn hay nói, cách bạn muốn được gọi, nên skill nhận ra yêu cầu của bạn tốt hơn bản chung.

Trong bản mẫu (thư mục có `BAN-MAU.md`), các skill là khuôn chưa cá nhân hoá, tên chưa có tiền tố. Đừng tải chúng thẳng lên tài khoản: dựng xưởng trước, skill sẽ được tạo theo tên và phong cách của bạn.

## Ba nơi skill sống

1. **Nguồn**: `skills/` trong xưởng của bạn. Đây là bản gốc; mọi chỉnh sửa bắt đầu ở đây.
2. **Bản cho ứng dụng tự đọc khi mở thư mục**: `AI Designer/.agents/skills/` (Codex, Google Antigravity) và `AI Designer/.claude/skills/` (Claude Code). Hai thư mục bắt đầu bằng dấu chấm nên thường bị ẩn trong Finder, File Explorer; không sao cả.
3. **Bản lưu trên tài khoản AI** (Claude, ChatGPT): tải lên từ các tệp ZIP trong `AI Designer/Goi skill/`. Skill trên tài khoản giúp trợ lý nhận ra việc thiết kế ở bất kỳ cuộc trò chuyện nào, kể cả khi bạn chưa nhắc tới xưởng.

Trợ lý tạo bản 2 và bản 3 bằng một lệnh: `python3 tools/dung-xuong.py --goi-skill`.

## Lưu skill vào tài khoản AI

Tên menu, gói dịch vụ và điều kiện của các ứng dụng AI thay đổi nhanh; nếu không thấy đúng chữ như dưới đây, mở trang hướng dẫn chính thức của hãng hoặc nhờ trợ lý tra giúp. Lưu xong ở đâu, nói với trợ lý để nó ghi lại (`python3 tools/dung-xuong.py --da-luu claude`, hoặc `chatgpt`, `codex`, `antigravity`, `claude-code`).

### Claude (claude.ai, Claude Desktop, Cowork)

- **Cách nhanh nhất**: trong Claude Cowork, trợ lý có thể hiện một thẻ đề xuất skill ngay trong cuộc trò chuyện; bạn đọc nội dung rồi bấm lưu. Mỗi thẻ chứa tối đa ba skill, nên sáu skill cần hai lượt.
- **Cách tải lên**: (1) gói Free, Pro, Max: vào Settings, Capabilities, bật "Code execution and file creation"; gói Team, Enterprise: chủ tổ chức cần bật Skills trong phần cài đặt tổ chức. (2) Vào Customize, Skills, bấm dấu cộng, chọn "Create skill", rồi "Upload a skill". (3) Chọn một tệp ZIP trong `AI Designer/Goi skill/`. (4) Bật công tắc của skill vừa tải. Lặp lại cho từng tệp ZIP. Hướng dẫn chính thức: [Use Skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude).
- Tải lên báo lỗi: thường do mô tả quá 1024 ký tự, tên thư mục trong ZIP khác tên skill, hoặc thiếu tệp `SKILL.md`. Nhờ trợ lý kiểm và đóng gói lại.

### ChatGPT

- Ở thời điểm viết, tính năng skill của ChatGPT dành cho gói Business, Enterprise, Edu và tuỳ quản trị viên cho phép. Ở thanh bên chọn Plugins, trong Plugin Directory chọn thẻ Skills, chọn Create, rồi "Upload from your computer", chọn tệp ZIP trong `AI Designer/Goi skill/`. ChatGPT quét skill trước khi cho dùng; skill bị đánh dấu cần xem lại thì đọc thông báo và nhờ trợ lý sửa. Hướng dẫn chính thức: [Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt).
- Gói của bạn chưa có tính năng này: không sao, dùng ChatGPT desktop hay Codex mở thư mục "AI Designer" là trợ lý vẫn đọc skill từ thư mục.

### Codex, Google Antigravity

- Không cần tải lên. Mở thư mục "AI Designer" là ứng dụng tự thấy skill trong `.agents/skills/`. Không thấy thì khởi động lại ứng dụng.
- Muốn dùng skill ở mọi thư mục: nhờ trợ lý chép các thư mục skill sang `~/.agents/skills/` (Codex) hoặc `~/.gemini/config/skills/` (Antigravity). Hướng dẫn chính thức: [Codex](https://learn.chatgpt.com/docs/build-skills), [Antigravity](https://antigravity.google/docs/skills).

### Claude Code

- Mở thư mục "AI Designer" là thấy skill trong `.claude/skills/`; dùng ở mọi thư mục thì chép sang `~/.claude/skills/`.

## Dùng skill hằng ngày

- **Nói tự nhiên**: "làm bộ ảnh thông cáo khoá X cho Facebook và story", "làm slide cho buổi toạ đàm từ dàn ý này". Trợ lý tự chọn skill khớp mô tả.
- **Gọi đích danh khi muốn chắc chắn**: "Dùng skill ha-thiet-ke-slide, làm slide từ dàn ý này". Một số ứng dụng có cú pháp gọi nhanh (Claude Code: gõ `/` rồi tên skill; Codex: gõ `$` rồi tên skill).
- **Luôn mở hoặc nối thư mục "AI Designer"** trong cuộc trò chuyện. Thiếu thư mục, skill sẽ dừng lại và nhờ bạn nối trước, vì đồ nghề nằm trong đó.
- **Trợ lý không dùng skill dù bạn đã nói đúng việc**: gọi đích danh một lần, rồi nói "thêm câu tôi vừa nói vào mô tả skill" để lần sau nó tự nhận ra.
- **Muốn biết đang dùng skill nào**: hỏi thẳng "bạn đang làm theo skill nào?".

## Giữ skill luôn khớp với xưởng

- Sửa skill: sửa nguồn trong `skills/` trước (trợ lý làm), rồi `--goi-skill` và lưu lại bản mới vào tài khoản (trên Claude, ChatGPT: thay bản cũ cùng tên). Bản trên tài khoản cũ hơn nguồn thì trợ lý có thể làm theo quy trình cũ.
- Cập nhật xưởng từ bản mẫu mới mà skill có đổi: đóng gói và lưu lại như trên.
- `python3 tools/dung-xuong.py --trang-thai` cho biết skill đã đóng gói chưa, đã lưu vào đâu, có sửa gì sau lần đóng gói cuối không.
- Thêm một skill mới cho xưởng: tạo thư mục trong `skills/` (tên thư mục không tiền tố, `name` trong `SKILL.md` có tiền tố), thêm một dòng vào bảng "Việc nào, skill nào" của `CLAUDE.md`, chạy `python3 tools/kiem-tai-lieu.py`, rồi đóng gói. Quy tắc viết skill: `skills/_chung/bao-tri-skill.md`.
