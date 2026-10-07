# BÀI HỌC

Bài học đã chưng cất, mỗi dòng có nguồn (ngày, dự án hoặc thử nghiệm). Cách làm đúng từ nay đã sửa vào skill, chuan, khuôn; ở đây giữ câu chuyện để hiểu vì sao. Thêm một dòng vào đúng chủ đề, không nối ghi chú có ngày vào cuối QUY-TRINH.

## Dựng và xuất

- 2026-10-06 (kiểm công cụ) - Chrome dòng lệnh `--screenshot --window-size` cho khung nhìn thiếu 87 px, đáy ảnh bị cắt: mọi lần xuất đi qua `ve.py` (Playwright ở sandbox, Chrome qua ống CDP trên Mac).
- 2026-10-06 - Phông tách theo `unicode-range` chỉ tải khi bố cục cần: chờ `document.fonts.ready` là chưa đủ, lõi gọi `document.fonts.load` với đúng chữ của từng kiểu phông trước khi chụp.
- 2026-10-06 - Chromium xuất JPEG 4:2:0 và PNG không nhúng hồ sơ màu: chụp PNG rồi tự mã hoá JPG 4:4:4, nhúng sRGB.
- 2026-10-06 - Ảnh trên 100 triệu điểm ảnh ra nửa trắng không báo lỗi: ve.py tự hạ mật độ; phông lớn thiết kế ở tỉ lệ.
- 2026-10-06 - Sơ đồ SVG có chữ tràn hộp làm phần tử cha "tràn" giả, lõi co chữ mãi không dừng: vùng sơ đồ cắt tràn (`overflow: hidden`) và các hàm vẽ chừa lề nhãn đủ rộng.

## Bố cục đa thể thức

- 2026-10-06 (thử nghiệm bố cục thông cáo) - Khổ 9:16 theo vùng an toàn Stories (trên 14%, dưới 20%) chỉ còn 66% chiều cao cho nội dung: thông cáo nhiều chữ bị co; ở khổ dọc nên bớt mô tả hoặc dùng bản `reels` cho ảnh bìa video, không cố nhồi.
- 2026-10-06 (người dùng góp ý) - Story 9:16 không co chữ cho vừa mà rút gọn: khuôn đánh dấu phần phụ `data-rut-gon`, lõi tự ẩn ở nhóm doc, ve.py báo `can-rut-gon` khi vẫn phải co dưới 90%.
- 2026-10-06 (đổi chức danh) - Tên kèm học vị dài nối `~` thành một dòng quá dài trên thẻ đeo, tràn vùng: học vị xuống dòng riêng (`ThS~BS\nNguyễn~Minh~An`) ở khổ hẹp.
- 2026-10-06 - Playfair Display mặc định số kiểu cũ (5.0 lệch dòng) ở mọi chỗ chưa khai báo: đặt `lining-nums` ngay trên `.canvas`.
- 2026-10-06 - Bộ mẫu dùng chữ phụ 16-20 px (quy về 1080): đẹp khi xem lớn, khó đọc trên điện thoại; khuôn nâng lên 22-26 px và để lõi cảnh báo dưới 24 px.

## In ấn

- 2026-10-06 (kiểm công cụ) - Ghostscript đổi #000 thành đen 4 màu (C72 M68 Y67 K88); các tuỳ chọn có sẵn không chữa đúng; cách đúng là đổi xám trung tính sang DeviceGray trước khi đổi CMYK (in_an.py).
- 2026-10-06 - Ghostscript 10.02 với PDF/X-3 dàn phẳng cả trang có trong suốt thành ảnh 720 dpi; cần 10.06+ cho PDF/X-4 (Homebrew có 10.08; sandbox dựng bằng `tools/cai-gs.sh`).
- 2026-10-06 - Phông biến thiên thành Type 3 trong PDF Chromium: chỉ nhúng phông tĩnh.

## Ảnh

- 2026-10-06 (kiểm công cụ) - Gray-world làm lạnh ảnh có mảng màu lớn: trần cân trắng 1,18, luôn nhìn ảnh so sánh.
- 2026-10-06 - Nâng sáng mặt bằng mặt nạ elip làm loé quầng trên tường sáng sau đầu: chỉ nâng vùng trung và tối.
- 2026-10-06 - Độ nét đo trên cả ảnh xoá phông cho kết luận "mờ" sai: đo trên vùng mặt.

## Tổ chức workspace

- 2026-10-07 (chuẩn hoá hai xưởng) - Thành phẩm ghi phẳng `Thanh pham/<dự án>/<ấn phẩm>/` không đánh số, không kèm nghiệm thu và lời đăng; nháp ở lại dự án mãi. Sửa: thư mục hồ sơ dự án đổi tên `Nhap` thành `Du an`, `ve.py` đánh số `NN <ấn phẩm>` khi xuất bản cuối lần đầu, `tools/dong-goi.py` đóng gói (báo cáo nghiệm thu, `DANG.md`) và dọn nháp khi người dùng duyệt. Một thư mục ấn phẩm tự đủ để đăng, gửi in, sao lưu.
- 2026-10-06 (đóng gói xưởng cho nhiều người) - Luật chữ riêng của từng người (từ cấm, từ nên tránh) để trong mã thì không ai tự đổi được: tách ra `phong-cach/tu-ngu.json`, mã chỉ giữ luật chung; thương hiệu mặc định đọc từ `brand/brand.json` > `thuongHieuMacDinh`. Máy ảo của Claude Cowork không tải được Chromium nên khi phiên không có sandbox đám mây cần hàng đợi dựng trên máy thật (`tools/hang-doi-dung.py`, `Dung tren may.command` / `.bat`). Tên skill `thiet-ke` trùng tên thư mục dự án `thiet-ke/` làm `kiem-sach.py` báo nhầm: thư mục ngay dưới `skills/` không bao giờ là nháp.
- 2026-10-06 (yêu cầu repo thật sạch) - Repo tích tụ rác dù hướng dẫn nói nháp không nằm trong repo: `.tam/` (12 MB: ba file nén repo, một bản sao cả repo, cache) vì hướng dẫn cũ cho `.tam/` làm vùng tạm và bảo đóng gói vào đó; `Claude outputs/` do ứng dụng chép mỗi file gửi vào chat; `__pycache__`, `.DS_Store`; `kiem-khuon.py` ghi kết quả vào `.tam/`. Quy tắc có ngoại lệ thì ngoại lệ thành thói quen: nay không còn ngoại lệ, công cụ tự dừng khi bị bắt ghi vào repo, việc tạm chuyển sang `Du an/_tam/`, có cổng `tools/kiem-sach.py` ở đầu và cuối mỗi phiên.
