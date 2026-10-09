# AGENTS.md - dành cho trợ lý AI khác Claude

Bạn là trợ lý AI (ChatGPT, Codex, Antigravity, Gemini, Cursor, Copilot...) vừa được mở trong một thư mục của **Xưởng thiết kế Claude** (do nhà giáo dục Lương Dũng Nhân, ldn.edu.vn, chia sẻ miễn phí): hoặc bản mẫu (repo `xuong-thiet-ke-ai`, có `BAN-MAU.md`), hoặc xưởng riêng của người dùng dựng từ bản mẫu (có `XUONG.json`). Xưởng được viết và kiểm chứng trên Claude, nhưng phần lõi là Python, HTML, CSS và tài liệu thuần chữ, nên trợ lý nào chạy được lệnh trên máy người dùng cũng dùng được.

## Làm gì trước

1. Xem bạn đang ở đâu. Thư mục có `BAN-MAU.md` (không có `XUONG.json`) là BẢN MẪU: đọc `BAN-MAU.md` ngay; bản mẫu chỉ để học và dựng cho người dùng một xưởng riêng trên máy họ, không phải repo để làm việc, kéo về (`git pull`) hay đẩy lên (`git push`). Thư mục có `XUONG.json` là xưởng riêng của người dùng: làm việc ở đó.
2. Đọc `CLAUDE.md`: mọi hướng dẫn trong đó (bản mẫu hay xưởng, thứ tự đọc, bảng việc nào skill nào, quy tắc cứng) áp dụng cho bạn như áp dụng cho Claude.
3. Skill là tệp `skills/<tên>/SKILL.md` trong xưởng: khi người dùng nói một việc khớp bảng trong `CLAUDE.md`, mở đúng SKILL.md đó và làm theo từng bước. Đọc thẳng từ thư mục là đủ để làm việc; bản đóng gói (`python3 tools/dung-xuong.py --goi-skill`) giúp ứng dụng của bạn tự nhận ra skill: Codex và Antigravity đọc `.agents/skills/` ở thư mục người dùng mở, ChatGPT nhận skill tải lên (`skills/README.md`).
4. Chưa có xưởng, chưa thiết lập (còn dấu `[...]` trong `phong-cach/PHONG-CACH.md` hoặc chưa có `cau-hinh.json`), hay chưa tạo skill cho người dùng: làm theo `skills/thiet-ke-thiet-lap/SKILL.md`.

## Đổi tên công cụ cho đúng với bạn

Tài liệu đôi chỗ nhắc công cụ riêng của ứng dụng Claude. Dùng công cụ tương đương của bạn:

| Tài liệu nhắc | Nghĩa là | Bạn dùng |
|---|---|---|
| `device_bash`, "máy của người dùng" | chạy lệnh trong thư mục xưởng trên máy người dùng | terminal, shell, công cụ chạy lệnh của bạn |
| `Bash`, "sandbox đám mây" | một môi trường khác có trình duyệt để dựng ảnh | thường không cần: bạn chạy thẳng trên máy người dùng (xem `docs/QUY-TRINH-KY-THUAT.md` mục 2) |
| `AskUserQuestion` | hỏi người dùng có lựa chọn sẵn | hỏi bằng lời, đưa sẵn 2-4 phương án và một mặc định |
| `SendUserFile`, gửi ảnh vào chat | cho người dùng xem ảnh | đưa đường dẫn tệp, hoặc mở ảnh bằng công cụ xem của bạn |
| `device_request_delete_permission` | xin phép xoá tệp | hỏi người dùng bằng lời trước khi xoá |
| Read một ảnh để "nhìn" | trợ lý tự xem ảnh đã dựng | dùng khả năng đọc ảnh của bạn; không đọc được ảnh thì nói thẳng và nhờ người dùng nhìn tờ tổng thể |

## Ghi nhớ

- Mọi ấn phẩm mang phong cách của người dùng (`phong-cach/PHONG-CACH.md`, `brand/brand.json`), không phải của tác giả xưởng.
- Bản mẫu chỉ để đọc. Không clone bản mẫu làm xưởng, không commit, push, mở pull request thay người dùng; cập nhật xưởng bằng `tools/dung-xuong.py --cap-nhat` (`docs/DONG-GOP.md`).
- Nháp và thành phẩm luôn ở ngoài repo (`Du an/`, `Thanh pham/` cạnh repo). Cuối phiên chạy `python3 tools/kiem-sach.py`.
- Người dùng duyệt dự án thì đóng gói và dọn nháp bằng `tools/dong-goi.py` (CLAUDE.md quy tắc 11).
- Chưa qua cổng nghiệm thu thì chưa nói "xong".
