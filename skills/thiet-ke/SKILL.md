---
name: thiet-ke
description: "Thiết kế ấn phẩm trong Xưởng thiết kế Claude (repo Claude-Designer-for-Speaker) theo phong cách của người dùng: bài quảng bá mạng xã hội (Facebook, Instagram, LinkedIn, Zalo, Threads), story, ảnh bìa trang, kênh, thumbnail, ảnh chia sẻ web, banner email, nền Zoom, poster số; một nội dung dựng ra mọi thể thức (1:1, 4:5, 9:16, 16:9, bìa) nhanh và chính xác; mở Bàn thiết kế để người dùng tự sửa; nghiệm thu đúng chuẩn ngành. Kích hoạt khi người dùng nói 'thiết kế', 'làm ảnh quảng bá', 'làm bài đăng', 'poster', 'banner', 'ảnh bìa', 'thumbnail', 'resize ra các khổ', 'làm bộ ấn phẩm cho chương trình', 'thông cáo khai giảng', 'giới thiệu giảng viên', 'mở bàn thiết kế', 'sửa ấn phẩm này', hoặc gửi mẫu muốn làm tương tự. Là lõi cho mọi ấn phẩm: in ấn, sân khấu dùng thêm thiet-ke-in-su-kien; ảnh, sơ đồ dùng thêm thiet-ke-hinh; chọn và viết chữ trên hình dùng thêm thiet-ke-chu; lần đầu dùng chạy thiet-ke-thiet-lap. KHÔNG dùng cho slide thuyết trình, landing page, đồ họa video."
---

# Thiết kế ấn phẩm: brief, khuôn, đa thể thức, nghiệm thu

Đọc trước: `CLAUDE.md`, `docs/QUY-TRINH-KY-THUAT.md`, `phong-cach/PHONG-CACH.md`, `skills/_chung/van-hanh.md` (nơi chạy lệnh, chuyển tệp). Chuẩn: `chuan/01-nguyen-ly-thiet-ke.md`, `chuan/02-mang-xa-hoi-web.md`, `chuan/07-nghiem-thu.md`. Danh mục khuôn và ô nội dung: `khuon/README.md`. Nháp và thành phẩm luôn nằm ngoài repo, trong thư mục cha của repo: dự án và bản nháp trong `Nhap/<YYYY-MM tên dự án>/`, bản cuối trong `Thanh pham/<tên dự án>/<tên ấn phẩm>/` (`cau-hinh.json` > `thuMucDuAn`, `thuMucThanhPham`). Người dùng muốn đẩy sang chỗ khác thì nói ở đầu cuộc trò chuyện: dùng chỗ đó cho phiên ấy (`--goc`, `--ra`), không sửa `cau-hinh.json`.

Ba nguyên tắc xuyên suốt:

1. **Người xem trước, khuôn sau.** Ai xem, ở đâu, trong bao lâu, cần cảm, biết, làm gì: trả lời xong mới chọn khuôn, họ màu, thể thức.
2. **Một nguồn, nhiều thể thức.** Nội dung viết một lần vào file ấn phẩm; khuôn tự dàn theo nhóm tỉ lệ, lõi tự chừa vùng an toàn và co chữ; khác biệt theo khổ ghi vào `theoNhom`, `theoTheThuc`; dịch chuyển tay ở `chinhTay`. Không bao giờ thiết kế lại từ đầu cho từng khổ, không bao giờ sửa ảnh xuất bằng tay.
3. **Đúng chuẩn mà vẫn mang phong cách người dùng.** Số liệu kỹ thuật lấy từ `chuan/`; thẩm mỹ lấy từ PHONG-CACH mục 3 và `phong-cach/PHAN-TICH-MAU.md` (nếu người dùng đã đưa mẫu); cải thiện chỗ mẫu chưa đạt chuẩn (chữ phụ nhỏ, nút trong vùng bị che) và nói rõ khi trình.

## Bước 1 - Brief (chốt 1)

- Tạo dự án nếu chưa có: `python3 tools/du-an-moi.py "<tên>" --khuon <id> [--thuong-hieu <id>]`. Điền `BRIEF.md` từ lời người dùng và tư liệu; hỏi MỘT lượt những gì còn thiếu: người xem, chữ nguyên văn, chức danh (không nói thì chọn theo PHONG-CACH mục 1 và nói rõ đã chọn bản nào; phân vân thì hỏi), ngày giờ nơi, nút kêu gọi, thể thức, ảnh nào.
- Đề xuất: khuôn (bảng `khuon/README.md`), họ màu (PHONG-CACH mục 3, `brand/brand.json` > `chuDe`), bộ thể thức (mặc định bài feed `ig-4x5` + `vuong` + `doc-9x16`; thêm `fb-bia`, `og-191`, `yt-thumb`, `zalo-bai`... theo kênh người dùng dùng; xem `python3 tools/ve.py --ds-the-thuc`). Nội dung có tri thức cần hình tượng hoá, ảnh cần chỉnh, tách nền: gọi skill thiet-ke-hinh. Có thể thức in, sân khấu: gọi skill thiet-ke-in-su-kien.
- Chữ trên hình: theo skill thiet-ke-chu (chọn gì lên hình, gì ở caption và alt text; 2-3 phương án tiêu đề; cắt theo định mức `chuToiDa`; `chuan/08`). Chữ theo PHONG-CACH mục 4 (mặc định: thuần Việt có [English], sentence case, không gạch dài, không từ sáo văn AI, từ ngữ người dùng đã chốt, không khung đua tranh, khan hiếm thật không nêu số ghế); nối cụm bằng `~` cho tên riêng, học vị và tên, số và đơn vị; ngắt tiêu đề theo nghĩa bằng `\n`.
- Story 9:16 luôn rút gọn: chỉ tiêu đề, người, ngày, nút; phần phụ tự ẩn theo khuôn; câu còn dài thì viết bản ngắn vào `theoNhom.doc.noiDung` ngay từ brief.
- Người dùng duyệt brief (thông điệp, chữ nguyên văn, khuôn, họ màu, thể thức) rồi mới dựng.

## Bước 2 - Viết file ấn phẩm, dựng nháp

- File `<dự án>/thiet-ke/<tên>.json` theo mẫu `khuon/<id>/mau.json` (nội dung mẫu là giả định, thay hết; cấu trúc đầy đủ: `docs/QUY-TRINH-KY-THUAT.md` mục 4). Ảnh trỏ `anh/...` (đã qua `tools/anh.py`); logo tự lấy theo thương hiệu và độ sáng nền.
- Dựng nháp ở nơi có trình duyệt (`skills/_chung/van-hanh.md`): `python3 tools/ve.py <file> --nhap` → `<dự án>/nhap/<tên>/`: ảnh từng khổ, `<tên>-tong-the.jpg`, `<tên>-bao-cao.json`, tóm tắt cảnh báo. Nơi không có trình duyệt: hàng đợi dựng (`tools/hang-doi-dung.py`).
- Đọc cảnh báo theo `chuan/07-nghiem-thu.md`. LỖI (`tran-vung`, `tran-chu`, `loi-js`, `so-do`) phải sửa. `co-toan-bo` dưới 85% ở một khổ: bớt chữ cho khổ đó trong `theoNhom` / `theoTheThuc` thay vì để chữ bé. `goi-y-chu`: dấu hiệu văn AI, sáo ngữ; sửa trừ khi đúng nghĩa thật. `nhieu-chu` (quá định mức tiếng của thể thức): chuyển chi tiết xuống caption, alt text, khung khác. `can-rut-gon` (story vẫn phải co chữ): viết bản ngắn hơn trong `theoNhom.doc.noiDung`. `lan-vung-an-toan`, `de-vung-trong`: dời hoặc ẩn ở khổ đó. `tuong-phan`: đổi màu chữ, thêm màn, dời chữ khỏi vùng ảnh sáng.
- NHÌN tờ tổng thể và từng khổ ở cỡ thật. Kiểm lớp người của `chuan/07`: tiêu điểm, thử 5 giây, nheo mắt, căn lưới, dấu tiếng Việt từng âm tiết, tên và chức danh nguyên văn, ánh nhìn trong ảnh hướng về chữ, loạt có còn là một hệ.
- Một khổ cần bố cục khác hẳn mà khuôn chưa dàn: chỉnh trong `theoNhom.<nhóm>.css` hoặc `theoTheThuc.<id>.css`; khổ đó sẽ dùng lại nhiều lần thì sửa khuôn (rồi `tools/kiem-khuon.py`).

## Bước 3 - Trình người dùng (chốt 2), sửa theo góp ý

- Gửi tờ tổng thể kèm 3-6 dòng: lựa chọn chính và lý do theo người xem, cảnh báo còn lại và vì sao chấp nhận, điều cần người dùng chốt.
- Người dùng muốn tự chỉnh: nhắc bấm đúp `Mo ban thiet ke.command` (Mac) hoặc `Mo ban thiet ke.bat` (Windows) ở gốc repo rồi chọn ấn phẩm. Bàn ghi vào chính file ấn phẩm (`noiDung`, `chinhTay`, `theoTheThuc`); sau khi người dùng lưu, đọc lại file, giữ nguyên mọi `chinhTay`, không sinh lại file từ đầu.
- Góp ý bằng lời: sửa file ấn phẩm, dựng lại nháp những khổ bị ảnh hưởng, ghi `SO-GOP-Y.md`. Góp ý lặp lần hai cùng kiểu: sửa nguồn mặc định (khuôn, brand.json, tu-ngu.json, chuan) và ghi sổ tay góp ý PHONG-CACH mục 6.

## Bước 4 - Xuất, giao

- `python3 tools/ve.py <file>` (không `--nhap`) → `Thanh pham/<tên dự án>/<tên>/`: khổ feed xuất 2x (Facebook giữ tới 2048 px cạnh dài), Instagram 3:4 đúng 1080, sRGB nhúng, PNG + JPG 4:4:4 chất lượng 92 theo kho thể thức.
- Đưa về đúng `Thanh pham/<tên dự án>/<tên>/` trên máy người dùng (hoặc chỗ người dùng chỉ định ở đầu cuộc trò chuyện). Kèm gợi ý văn bản thay thế [alt text] cho từng ảnh (ảnh nhiều chữ: đủ chữ trên ảnh) và lưu ý đăng (ảnh bìa: kiểm cả điện thoại lẫn máy tính; Zalo OA: đăng thử vì quy cách chưa rõ).
- Thể thức mới cho cùng chiến dịch sau này: chỉ thêm id vào `theThuc` rồi dựng lại.
- Dọn cuối phiên theo `skills/_chung/van-hanh.md` mục "Repo sạch"; `python3 tools/kiem-sach.py` ĐẠT rồi mới báo xong.

## Thêm khuôn, sửa lõi

Khuôn mới khi một dạng ấn phẩm lặp lại mà chưa khuôn nào hợp: theo `khuon/README.md` mục "Viết một khuôn mới" (cqmin, biến vai, `.vung`, dàn đủ nhóm, `mau.json` với nội dung giả định), `python3 tools/kiem-khuon.py <id>` ĐẠT, nhìn tờ tổng thể, thêm dòng vào danh mục. Mẫu tham khảo của người dùng gợi ra khuôn mới thì ghi vào `phong-cach/PHAN-TICH-MAU.md`. Sửa `he-thong/` hay `minh-hoa/`: chạy `tools/kiem-khuon.py` cho cả kho.

## Quy tắc cứng

- Tên, chức danh, từ ngữ theo PHONG-CACH mục 1, 4 nguyên văn; chữ trên ấn phẩm theo PHONG-CACH mục 4; không Title Case, không gạch dài, không emoji.
- Story 9:16 rút gọn chữ, không co chữ nhỏ cho vừa.
- Hai chốt duyệt: brief trước khi dựng; tờ tổng thể trước khi xuất bản cuối.
- Không báo "xong" khi ve.py còn LỖI hoặc chưa nhìn ảnh thật; đọc soát dấu tiếng Việt từng âm tiết.
- File ấn phẩm là nguồn sự thật; giữ nguyên `chinhTay` người dùng đã chỉnh; không sửa ảnh xuất bằng tay.
- Không ảnh AI thay người, lớp, sự kiện thật; không bịa số liệu, lời chứng thực, khan hiếm; ghi tác giả mô hình, công cụ của người khác; học mẫu tham khảo ở mức nguyên lý, không sao chép.
- Repo sạch: nháp, thành phẩm, thử nghiệm không bao giờ ghi vào repo (việc tạm ở `Nhap/_tam/`); cuối phiên `python3 tools/kiem-sach.py` ĐẠT.
- Không tự commit git; không xoá tệp của người dùng khi chưa được phép.
