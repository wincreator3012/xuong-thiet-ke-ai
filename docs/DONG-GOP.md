# Cập nhật và đóng góp

## Xưởng được cập nhật thế nào

Tác giả (Lương Dũng Nhân, ldn.edu.vn) dùng một xưởng riêng hằng ngày cho ấn phẩm thật. Kinh nghiệm mới (công cụ sửa lỗi, khuôn mới, chuẩn nền tảng đổi, bài học từ dự án) được đưa sang repo chung này bằng một quy trình có cổng kiểm: phần kỹ thuật chép máy móc, phần tài liệu được khái quát hoá, và một cổng chặn để không mang theo bất cứ thứ gì riêng (tên, chức danh, thương hiệu, chương trình, mẫu, logo). Vì vậy `tools/`, `he-thong/`, `khuon/` (trừ nội dung mẫu), `minh-hoa/so-do.js`, `chuan/`, `nghien-cuu/`, `skills/` (trừ `thiet-ke-thiet-lap`) và `docs/` có thể đổi qua từng bản.

## Cập nhật bản mới mà không mất phần của bạn

Phần của bạn không bao giờ bị bản mới ghi đè:

- ngoài repo: `Nhap/`, `Thanh pham/` (mọi dự án, nháp, thành phẩm);
- trong repo nhưng là của bạn: `brand/brand.json`, logo bạn thả vào `brand/logo/`, `phong-cach/PHONG-CACH.md`, `phong-cach/tu-ngu.json`, `phong-cach/PHAN-TICH-MAU.md`, `phong-cach/mau-tham-khao/`, `minh-hoa/an-du.json`, `cau-hinh.json`. Các tệp này được tạo trên máy bạn ở bước cài, từ bản khởi đầu cùng tên có thêm `.mau` (ví dụ `brand/brand.mau.json`); repo chung chỉ chứa bản khởi đầu, và `.gitignore` giữ bản của bạn ngoài git, nên bản cập nhật chỉ có thể thay bản khởi đầu, không đụng tới bản của bạn.

Cách cập nhật, chọn một:

1. **Nhờ trợ lý AI** (dễ nhất): tải bản mới (nút Code, Download ZIP trên GitHub), giải nén ra một thư mục tạm cạnh repo, rồi nói: "Cập nhật xưởng từ thư mục <tên thư mục tạm>, giữ nguyên brand, phong-cach, an-du.json, cau-hinh.json của tôi". Trợ lý chép phần năng lực mới vào repo, giữ phần của bạn, so `brand/brand.mau.json` bản mới với `brand/brand.json` của bạn để thêm họ màu, khoá mới (nếu có) mà không đổi giá trị bạn đã đặt, rồi chạy `python3 tools/kiem-tai-lieu.py`, `python3 tools/kiem-khuon.py`, `python3 tools/kiem-sach.py`.
2. **Dùng git** (nếu bạn đã `git clone`): `git pull`. Phần của bạn nằm ngoài git nên không xung đột; sau đó nhờ trợ lý so bản khởi đầu mới với bản của bạn như cách 1.

## Đóng góp

Bạn làm được ấn phẩm tốt hơn nhờ một quy tắc mới, một khuôn mới, hay bắt được một lỗi? Mở issue hoặc pull request trên GitHub. Lưu ý:

- Không đưa thông tin riêng của bạn (tên, logo, nội dung khách hàng) vào pull request; nội dung mẫu của khuôn luôn là giả định.
- Thay đổi ở `tools/`, `he-thong/`, `khuon/`, `chuan/`, `skills/` sẽ được tác giả đưa về xưởng gốc trước rồi mới vào bản chung ở lần cập nhật sau, để hai bên không lệch nhau.
- Trước khi gửi: `python3 tools/kiem-tai-lieu.py` và `python3 tools/kiem-khuon.py` phải ĐẠT.
- Mọi đóng góp được nhận theo cùng giấy phép của repo (MIT cho mã, CC BY 4.0 cho tài liệu).
