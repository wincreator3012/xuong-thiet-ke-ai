# Cập nhật và đóng góp

## Xưởng được cập nhật thế nào

Tác giả (Lương Dũng Nhân, ldn.edu.vn) dùng một xưởng riêng hằng ngày cho ấn phẩm thật. Kinh nghiệm mới (công cụ sửa lỗi, khuôn mới, chuẩn nền tảng đổi, bài học từ dự án) được đưa sang repo chung này bằng một quy trình có cổng kiểm: phần kỹ thuật chép máy móc, phần tài liệu được khái quát hoá, và một cổng chặn để không mang theo bất cứ thứ gì riêng (tên, chức danh, thương hiệu, chương trình, mẫu, logo). Vì vậy `tools/`, `he-thong/`, `khuon/` (trừ nội dung mẫu), `minh-hoa/so-do.js`, `trinh-chieu/`, `chuan/`, `nghien-cuu/`, `skills/` (trừ `thiet-ke-thiet-lap`) và `docs/` của bản mẫu có thể đổi qua từng bản. Bản mẫu chỉ là nguồn kinh nghiệm: xưởng của bạn là thư mục riêng trên máy bạn, chỉ nhận thay đổi khi bạn yêu cầu cập nhật.

## Cập nhật xưởng từ bản mẫu mới

Xưởng của bạn là thư mục riêng, không nối với bản mẫu bằng git, nên không tự đổi theo. Khi muốn lấy kinh nghiệm mới, bạn chỉ cần nói với trợ lý: **"Cập nhật xưởng từ bản mẫu mới."** Trợ lý làm theo trình tự sau (lệnh chạy trong xưởng của bạn):

1. Tải bản mẫu mới vào `AI Designer/_ban-mau/xuong-thiet-ke-ai-moi/` (cách tải như `BAN-MAU.md` mục "Lấy bản mẫu về máy", chỉ đổi tên thư mục đích). Không `git pull` trong bản mẫu cũ: bản cũ là mốc để so.
2. Xem trước: `python3 tools/dung-xuong.py --cap-nhat "../_ban-mau/xuong-thiet-ke-ai-moi"`. Công cụ so từng tệp năng lực với mốc (dấu vân tay trong `XUONG.json`) và chia năm nhóm: chép đè (bản mẫu đổi, bạn chưa sửa), tệp mới, trộn tay (bản mẫu đổi và bạn cũng đã sửa), trộn tay skill (giữ phần cá nhân hoá), và tệp bản mẫu đã bỏ. Trợ lý kể lại bằng lời thường có gì mới.
3. Áp: thêm `--lam`. Phần chép đè và tệp mới được áp; phần trộn tay được thử trộn ba chiều tự động (cần git trên máy), chỗ nào không đụng nhau thì xong luôn.
4. Trộn tay phần còn lại cùng bạn: mỗi chỗ bạn đã sửa mà bản mẫu cũng đổi, trợ lý cho bạn xem hai bên và hỏi giữ bản nào. Bản khởi đầu `*.mau.*` đổi thì trợ lý so với bản của bạn (`brand/brand.json`, `phong-cach/PHONG-CACH.md`...) để thêm họ màu, khoá, mục mới mà không đổi giá trị bạn đã đặt.
5. Chốt: `python3 tools/dung-xuong.py --xong-cap-nhat "../_ban-mau/xuong-thiet-ke-ai-moi"` ghi mốc mới, đưa bản mẫu mới vào chỗ mốc, giữ bản cũ ở `_ban-mau/_cu-<ngày>-...` (xoá khi bạn cho phép). Rồi `python3 tools/kiem-tai-lieu.py`, `python3 tools/kiem-khuon.py`, `python3 tools/kiem-sach.py` ĐẠT.
6. Skill có đổi: `python3 tools/dung-xuong.py --goi-skill` và lưu lại bản mới vào tài khoản AI (`skills/README.md`).

Không bao giờ bị ghi đè: `Du an/`, `Thanh pham/` (nằm ngoài xưởng), phong cách và thương hiệu của bạn (`brand/brand.json`, logo, các tệp trong `phong-cach/` trừ bản `*.mau.*`, `minh-hoa/an-du.json`, `cau-hinh.json`), và mọi tệp bạn đã sửa mà chưa đồng ý cho thay.

Đang dùng xưởng kiểu cũ (làm việc thẳng trong thư mục `xuong-thiet-ke-ai` tải về, chưa có `XUONG.json`): nói "chuyển sang xưởng riêng theo BAN-MAU.md". Trợ lý tải bản mẫu mới vào `_ban-mau/`, dựng xưởng riêng với `--mang-theo "<thư mục cũ>"` để mang phong cách, logo, mẫu tham khảo, từ điển ẩn dụ, cấu hình sang; dự án trong `Du an/`, `Thanh pham/` giữ nguyên. Có thư mục `Nhap/` từ bản rất cũ: đổi tên thành `Du an` và sửa `thuMucDuAn` trong `cau-hinh.json` thành `"../Du an"`.

## Đóng góp

Bạn làm được ấn phẩm tốt hơn nhờ một quy tắc mới, một khuôn mới, hay bắt được một lỗi? Mở issue hoặc pull request trên GitHub. Lưu ý:

- Không đưa thông tin riêng của bạn (tên, logo, nội dung khách hàng) vào pull request; nội dung mẫu của khuôn luôn là giả định. Không đẩy cả xưởng riêng của bạn lên đây: pull request chỉ mang đúng phần năng lực muốn góp, viết lại ở dạng chung (tên skill không tiền tố, không khối "Xưởng:" đầu skill).
- Thay đổi ở `tools/`, `he-thong/`, `khuon/`, `chuan/`, `skills/` sẽ được tác giả đưa về xưởng gốc trước rồi mới vào bản chung ở lần cập nhật sau, để hai bên không lệch nhau.
- Trước khi gửi: `python3 tools/kiem-tai-lieu.py` và `python3 tools/kiem-khuon.py` phải ĐẠT.
- Mọi đóng góp được nhận theo cùng giấy phép của repo (MIT cho mã, CC BY 4.0 cho tài liệu).
