---
name: thiet-ke-hinh
description: "Làm lớp hình cho ấn phẩm trong Xưởng thiết kế Claude (repo xuong-thiet-ke-ai), hai mảng: (1) ảnh thật - chân dung người dùng, chuyên gia, lớp học, sự kiện: khám, chỉnh nhẹ có trần an toàn cho sáng và màu đẹp tự nhiên, tách nền, đồng bộ tông cả bộ, đổi HEIC và Display P3 sang sRGB, chọn ảnh và tiêu điểm, đặt bộ chi tiết đồng bộ; (2) minh hoạ tri thức - sơ đồ framework, mô hình, quy trình, so sánh, số liệu, ẩn dụ hình ảnh vẽ bằng code, chọn kiểu sơ đồ theo logic khái niệm, giữ từ điển ẩn dụ riêng của người dùng. Kích hoạt khi người dùng nói 'chỉnh ảnh', 'ảnh tối', 'ám màu', 'da xấu', 'làm ảnh đẹp hơn', 'tách nền', 'xoá phông', 'đồng bộ màu bộ ảnh', 'chọn ảnh', 'vẽ sơ đồ', 'minh hoạ framework', 'hình tượng hoá khái niệm', 'infographic', 'vẽ mô hình', hoặc khi ấn phẩm của skill thiet-ke cần ảnh hay hình tri thức. KHÔNG dùng để tạo ảnh AI thay người thật, lớp học, sự kiện thật; không dùng cho màu video hay hình động."
---

# Lớp hình: ảnh thật và minh hoạ tri thức

Đi cùng skill thiet-ke. Đọc trước: `skills/_chung/van-hanh.md`, `chuan/05-anh-chan-dung-lop-hoc.md` (ảnh), `chuan/06-minh-hoa-tri-thuc.md` (minh hoạ). Công cụ: `tools/anh.py` (cần opencv, pillow-heif; tách nền cần rembg; chạy được ở bất kỳ nơi nào có các thư viện này, kể cả không có trình duyệt), `minh-hoa/so-do.js` (lõi tự gọi khi dựng).

## A. Ảnh thật: KHÁM - KÊ ĐƠN - SOI LẠI

Triết lý: **đa số ảnh không cần sửa**; sửa thì nhỏ, tự nhiên, có trần; người dùng chỉ duyệt một ảnh trước/sau.

1. **Nhập**: ảnh gốc người dùng gửi vào `<dự án>/nguon/`. `python3 tools/anh.py chuan-hoa <ảnh...>`: HEIC, Display P3 sang sRGB, xoay đúng chiều, cạnh dài tối đa 3000 px (in khổ lớn thì giữ ảnh gốc). Ảnh đã qua Zalo, chụp màn hình: xin bản gốc.
2. **Chọn ảnh** (R5.1-R5.4): khoảnh khắc thật đang giảng, lắng nghe; nền sạch; mặt có sáng; ánh nhìn hướng về phía sẽ đặt chữ (muốn người xem đọc thông điệp) hoặc nhìn thẳng (muốn kết nối với chính người đó); mắt nét. Gợi ý 2-3 ảnh kèm lý do khi người dùng gửi nhiều.
3. **KHÁM**: `python3 tools/anh.py kham <ảnh...>`: độ sáng (p5, p50, p95), cháy, lệch kênh, độ nét trên mặt, số mặt, đủ ppi cho A4, A5 không. Rồi NHÌN ảnh: "lệch kênh" thường là cây cỏ, tường màu, đèn sân khấu tím xanh của bối cảnh, không phải ám màu; ám thật phải thấy trên da, áo trắng, tường xám.
4. **KÊ ĐƠN**: ảnh đạt thì không sửa. Cần sửa: `python3 tools/anh.py sua <ảnh> --muc 0.5-0.8` (cân trắng, kéo mức, phơi sáng, tương phản nhẹ, nâng sáng mặt không loé quầng, độ tươi bảo vệ da, giảm nhiễu, làm nét; mọi bước có trần, chuan/05 mục 2). Cần vượt trần là bệnh nặng từ khâu chụp: báo người dùng, đề xuất ảnh khác.
5. **SOI LẠI**: lệnh `sua` tự tạo ảnh so sánh trước/sau; trợ lý nhìn trước (da tự nhiên, nền không cháy, không "màu instagram"), rồi gửi người dùng duyệt.
6. **Tách nền** khi khuôn cần người tách nền: `python3 tools/anh.py tach-nen <ảnh> [--toc]` (u2net_human_seg; `--toc` cho mép tóc). Nhìn kỹ mép tóc, tay cầm micro, khe tay và thân; lỗi rõ thì thử `--toc` hoặc chọn ảnh nền đơn giản hơn. Không tách nền ảnh nhóm, ảnh khoảnh khắc.
7. **Đồng bộ một bộ**: `python3 tools/anh.py dong-bo <ảnh mẫu> <các ảnh> --muc 0.6` để cả chiến dịch cùng tông (R5.6).
8. **Tiêu điểm**: `python3 tools/anh.py tieu-diem <ảnh>` cho `tieuDiem` [x, y] trong file ấn phẩm, để mọi khổ cắt quanh khuôn mặt.

Đạo đức (bắt buộc): được xoá mụn, vết tạm thời, vật thừa ở nền, ám màu; không đổi dáng mặt, thân, không làm da nhựa, không đổi tuổi, màu da; không thêm bớt người; ảnh học viên phải có đồng ý; không ảnh AI thay người, lớp, sự kiện thật.

## B. Minh hoạ tri thức

1. **Hiểu cấu trúc trước khi vẽ**: viết một câu "các phần [có thứ tự / lặp lại / lồng nhau / song song / đối lập]; quan hệ là [điều kiện / dòng chảy / bao chứa / căng kéo]". Hỏi người dùng nếu mô hình có quy tắc riêng (đi không tuyến tính, chặng nào là lõi).
2. **Chọn kiểu** theo bảng `chuan/06` mục 2: `chuoi`, `hanh-trinh`, `vong-lap`, `tang`, `trung-tam`, `radar`, `ma-tran`, `the-luoi`, `so-sanh`; kiểu đặc thù (cây rễ, tảng băng, vòng đồng tâm, Venn) thì vẽ SVG riêng trong dự án theo màu vai (`var(--nhan)`, `var(--chu)`...) và đưa vào bằng loại `anh`. Hai kiểu cùng hợp thì chọn kiểu ít hàm ý sai hơn; không dùng kim tự tháp khi các tầng song song.
3. **Tra từ điển ẩn dụ** khi minh hoạ một khái niệm cố định của người dùng: `minh-hoa/an-du.json`. Có thì dùng cùng ý ẩn dụ; chưa có thì đề xuất MỘT ẩn dụ tối giản qua ba phép thử, đánh dấu "ẨN DỤ MỚI - cần duyệt"; người dùng duyệt xong mới ghi vào `minh-hoa/an-du.json`.
4. **Viết dữ liệu sơ đồ** vào ô `soDo` (khuôn `so-do-tri-thuc` hoặc ô `data-o-so-do` của khuôn khác): nhãn ngắn (động từ, danh động từ), mô tả một dòng, `mucNhan` để báo hiệu chặng đang nói, tên và thứ tự chặng giống hệt mọi tài liệu khác của framework; tiêu đề nói thông điệp; dòng `nguon` ghi tác giả (cả mô hình của chính người dùng).
5. **Kiểm chứng**: mọi con số, năm, trích dẫn, tên nghiên cứu trên hình có nguồn ghi trong BRIEF ("Kiểm chứng: ..."); không phần trăm trên tảng băng, kim tự tháp khi không có nguồn; không dùng "kim tự tháp học tập", tháp Maslow như kiến thức.
6. **Dựng và nhìn** ở mọi khổ (`tools/ve.py --nhap`): nhãn không tràn, không chồng; sơ đồ đủ lớn để đọc trên điện thoại; khổ dọc thì sơ đồ chuyển hướng dọc (chuỗi, so sánh, lưới thẻ tự chuyển). Sơ đồ chật: rút nhãn trước, đổi kiểu sau.
7. **Ẩn dụ phương Đông, tâm-thể** (sen, dòng sông, hơi thở, rễ, đường núi, vòng tròn): dùng có chủ ý, nét tối giản, không dùng biểu tượng thiêng làm trang trí (chuan/06 mục 4).
8. Kiểu sơ đồ đặc thù dùng lần thứ hai: nâng thành một loại trong `minh-hoa/so-do.js` (mẫu `khuon/so-do-tri-thuc/mau-<loai>.json`, `tools/kiem-khuon.py so-do-tri-thuc` ĐẠT, cập nhật bảng chuan/06).

## Quy tắc cứng

- Ảnh: không sửa khi không có bệnh; sửa trong trần an toàn; người dùng duyệt ảnh trước/sau trước khi dùng.
- Không đổi hình dáng người, không làm da nhựa, không thêm bớt người; ảnh học viên phải có đồng ý.
- Không ảnh, clip AI thay người thật, lớp học thật, sự kiện thật; không ảnh minh hoạ có sẵn thay cho một ẩn dụ được thiết kế.
- Kiểu sơ đồ theo logic khái niệm; nhãn trên hình; không số liệu bịa; ghi tác giả framework trên hình.
- Ẩn dụ mới luôn đánh dấu chờ duyệt; chỉ ghi từ điển sau khi người dùng duyệt.
- Ảnh sau xử lý ghi vào `<dự án>/anh/` (ảnh gốc giữ ở `nguon/`), ảnh thử và so sánh để ở `Du an/_tam/`; không bao giờ vào repo (`tools/anh.py` tự dừng). Dọn cuối phiên: `skills/_chung/van-hanh.md` mục "Repo sạch".
