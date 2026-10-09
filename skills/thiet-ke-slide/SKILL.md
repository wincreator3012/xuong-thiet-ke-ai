---
name: thiet-ke-slide
description: "Làm và sửa bài trình chiếu (slide deck) tiếng Việt hoặc tiếng Anh trong Xưởng thiết kế Claude (repo xuong-thiet-ke-ai) theo phong cách của người dùng: PPTX sửa được trên Google Slides, PowerPoint, Keynote; màu, phông theo brand.json; sơ đồ tri thức bằng hình khối gốc (chuỗi, vòng lặp, tầng, trung tâm, ma trận, Venn, đồng tâm, tảng băng, phổ, xoắn ốc, isotype, radar), biểu đồ, ảnh thật, ghi chú người nói; máy kiểm tràn chữ và tương thích Google Slides, ảnh xem trước, PDF dự phòng. Kích hoạt khi người dùng nói 'làm slide', 'tạo deck', 'bài trình chiếu', 'bài thuyết trình', 'presentation', 'slide cho workshop, khoá học, hội thảo, bài giảng', 'English slides', 'slide tiếng Anh', 'sửa slide này', 'thêm sơ đồ vào slide', 'soát bài slide cũ', hoặc gửi outline, bài viết, tệp PPTX muốn chuyển thành hay nâng cấp thành slide, kể cả khi không gọi tên skill. KHÔNG dùng cho ấn phẩm mạng xã hội, poster (thiet-ke), màn LED sân khấu (thiet-ke-in-su-kien), slide trong video."
---

# Bài trình chiếu: brief, dàn ý, dựng, nghiệm thu

Workspace: repo **xuong-thiet-ke-ai** (trong thư mục cha của người dùng, gợi ý tên "AI Designer"). Một skill, hai ngôn ngữ, cùng hệ hình với poster và các ấn phẩm khác của xưởng.

Đọc trước: `CLAUDE.md`, `docs/QUY-TRINH-KY-THUAT.md`, `phong-cach/PHONG-CACH.md`, `skills/_chung/van-hanh.md` (hai nơi chạy lệnh, chuyển file). Chuẩn: `chuan/09-trinh-chieu.md` (trình chiếu, Google Slides, chữ Việt và Anh), `chuan/06-minh-hoa-tri-thuc.md` (chọn sơ đồ). Lõi và mọi trường của file bài trình chiếu: `trinh-chieu/README.md`. Công cụ: `tools/slide.py` (chạy ở sandbox đám mây, cần Node và LibreOffice, tự cài thư viện vào `Du an/_tam/node/`).

Chưa thấy repo trong phiên (thư mục chứa xưởng chưa nối): xin người dùng nối thư mục trước rồi mới làm. Đừng dựng slide bằng cách tự viết mã ngoài lõi: lõi là thứ giữ đúng thương hiệu, đo chữ bằng chính tệp phông và kiểm tương thích Google Slides; làm ngoài lõi thì mất cả ba.

## Ba nguyên tắc

1. **Slide là phần hình của lời giảng.** Một slide một ý, tiêu đề nói thông điệp, lời giảng nằm ở ghi chú người nói. Người xem không đọc và nghe cùng lúc được, nên slide chỉ giữ điều cần thấy.
2. **Trung thành tuyệt đối với nội dung gốc.** Không tự cắt, thêm, diễn giải lại. Cần rút cho vừa slide thì đề xuất, người dùng đồng ý rồi mới đổi, phần rút ra chuyển xuống ghi chú người nói để không mất ý nào.
3. **Hình mang nghĩa, sửa được.** Mỗi slide nội dung có một hình mang nghĩa; sơ đồ dựng bằng hình khối gốc để người dùng sửa ngay trên Google Slides trước giờ giảng mà không cần Claude; cùng tên, thứ tự, màu với poster và video của cùng framework.

## Chọn lối vào

| Tình huống | Làm gì |
|---|---|
| Bài mới từ outline, bài viết, tài liệu | Đi đủ năm bước dưới đây |
| Sửa nhỏ một bài đã dựng bằng xưởng (đổi chữ, thêm, bớt một slide, đổi loại sơ đồ) | Bỏ qua brief và dàn ý: sửa file `.json`, dựng `--nhap`, nhìn các slide đổi, gửi người dùng ảnh slide đó; vẫn qua máy kiểm. Hai chốt duyệt sinh ra để khỏi làm sai hướng cả bài; việc nhỏ đã rõ hướng |
| Bài làm ngoài xưởng (PPTX cũ, tệp người khác gửi) | `python3 tools/slide.py "<tệp>.pptx"`: kiểm Google Slides, ảnh xem trước, chép chữ và ghi chú ra `<tên>-chu.md`. Chỉ cần sửa vài chữ: sửa thẳng trong PPTX bằng python-pptx (không thêm giãn chữ), chạy lại lệnh để soát. Muốn nâng hình, đổi sơ đồ, đồng bộ thương hiệu: đề xuất chuyển sang file `.json` của xưởng, dàn ý viết từ `<tên>-chu.md` giữ nguyên văn, người dùng duyệt rồi đi từ bước 2 |
| Người dùng đã sửa tay trên Google Slides | Xin bản tải về dạng PPTX, đưa thay đổi ngược vào `.json` trước khi dựng lại; không dựng đè lên chỉnh sửa của người dùng |

## Bước 1 - Brief (chốt 1)

Hỏi MỘT lượt những gì còn thiếu; điều đã có trong lời người dùng hay tư liệu thì bỏ qua và bắt tay vào làm:

- Nội dung gốc (outline, bài viết, tệp), bối cảnh (lớp học, hội thảo, toạ đàm, Zoom), người xem, thời lượng.
- Ngôn ngữ (Việt hay Anh), thương hiệu và họ màu (đề xuất theo PHONG-CACH mục 3: giấy-mực cho tri thức ban ngày, than-đồng cho chiêm nghiệm, đêm-vàng cho sự kiện cao cấp, đêm-xanh cho giải thích cơ chế), logo, tên và chức danh trên bìa (PHONG-CACH mục 1; bài tiếng Anh: chuan/09 mục 8).
- Nơi mở và nơi chiếu: Google Slides, PowerPoint hay Keynote (hỏi người dùng thường mở ở đâu), máy chiếu 16:9; phòng khách sạn 16:10 hay màn LED thì nói (chuan/09 mục 2).

Tạo dự án nếu chưa có: `python3 tools/du-an-moi.py "<tên>" --slide <tên bài> [--chu-de <id>] [--en]` (trên máy người dùng) rồi ghi brief vào `BRIEF.md`.

## Bước 2 - Dàn ý (trình người dùng trước khi dựng)

Trình một bảng: số thứ tự, kiểu slide (`trinh-chieu/README.md`), tiêu đề thông điệp, nội dung chính, hình gì (loại sơ đồ theo chuan/06 mục 2 kèm một câu lý do theo logic khái niệm; biểu tượng; số lớn; ảnh), có ghi chú người nói hay không. Sửa ở dàn ý rẻ hơn nhiều so với sửa sau khi dựng, nên chốt cấu trúc ở đây.

- Framework giảng từng chặng: đánh dấu `trinhTu` để người xem vẫn thấy toàn cảnh khi đi từng chặng.
- Kiểm nhịp: chuyển phần nền tối, câu hỏi chiêm nghiệm sau phần dài, không quá ba slide liền cùng kiểu.
- Khái niệm cố định của người dùng: tra `minh-hoa/an-du.json` trước khi chọn hình (skill thiet-ke-hinh mục B), để cùng một khái niệm luôn mang cùng một hình.

## Bước 3 - Viết file bài trình chiếu, dựng nháp

- Viết `Du an/<dự án>/slide/<tên>.json` theo `trinh-chieu/README.md`. Chữ theo chuan/09 mục 8 (tiếng Việt: thuần Việt có [English], sentence case, từ ngữ đã chốt, không gạch dài; tiếng Anh: chuẩn học thuật, sentence case). Nối cụm bằng `~` cho tên riêng, học vị và tên; ngắt tiêu đề theo nghĩa bằng `\n`. Ghi nguồn mọi framework, số liệu vào `nguon`; dữ kiện cần kiểm chứng ghi "Kiểm chứng:" trong BRIEF.
- Hình đặc thù mà sơ đồ gốc không diễn đạt nổi (ẩn dụ vẽ SVG): làm file `thiet-ke/<tên>.json` của lõi HTML theo skill thiet-ke-hinh, không kèm tiêu đề, logo, rồi trỏ trường `anPham` tới nó. Đổi lại, nhãn trong hình này không sửa được trên Google Slides, nên chỉ dùng khi thật cần.
- Ảnh thật qua `tools/anh.py` (skill thiet-ke-hinh mục A) trước khi đưa vào slide.
- Dựng ở sandbox (đưa repo và dự án lên theo `skills/_chung/van-hanh.md`): `python3 tools/slide.py "<dự án>/slide/<tên>.json" --nhap` → `<dự án>/nhap/<tên>/`: PPTX nháp, ảnh xem trước từng slide (`xem/`), `<tên>-tong-the.jpg`, `<tên>-bao-cao.json`.
- Xử lý cảnh báo theo chuan/09 mục 6:
  - LỖI phải hết: `tran-chu`, `gian-chu`, `xml`, `so-do`, `loi-js`, `kieu`, `anh`, `tu-ngu`, `gach-dai`.
  - `nhieu-chu`, `chu-nho`: tách slide hoặc chuyển chữ xuống `ghiChu`; không để chữ nhỏ, vì hàng cuối phòng sẽ không đọc được.
  - `thieu-hinh`: thêm hình mang nghĩa, hoặc đặt `chuOnly` khi chủ ý chỉ có chữ.
  - `mo-coi`, `tuong-phan`, `goi-y-chu`: sửa, trừ khi có lý do rõ.
- NHÌN tờ tổng thể rồi từng slide ở cỡ thật (Read ảnh trong `xem/`), theo chuan/09 mục 9: mạch tiêu đề đọc liền thành câu chuyện, thử 5 giây, hình đúng logic, đọc soát từng âm tiết, nhịp, ghi chú người nói. Máy kiểm bắt được tràn và lỗi kỹ thuật, không bắt được hình sai nghĩa hay dấu sai; mắt người mới bắt được.

## Bước 4 - Trình người dùng (chốt 2), sửa theo góp ý

- Gửi tờ tổng thể kèm 3-6 dòng (lựa chọn chính và lý do theo người xem, cảnh báo còn lại, điều cần người dùng chốt) và tệp PPTX nháp để người dùng mở thử trên Google Slides.
- Góp ý bằng lời: sửa file `.json`, dựng lại, ghi `SO-GOP-Y.md`. Góp ý lặp lần hai cùng kiểu: sửa nguồn mặc định (`trinh-chieu/`, `brand/brand.json` sau khi hỏi người dùng, `chuan/09`) và ghi sổ tay góp ý PHONG-CACH mục 6, để lần sau người dùng không phải nói lại.

## Bước 5 - Bản cuối, giao

- `python3 tools/slide.py "<dự án>/slide/<tên>.json"` (không `--nhap`) → `Thanh pham/<dự án>/NN <tên>/`: `<tên>.pptx` và `<tên>.pdf` (chiếu dự phòng khi máy tại chỗ thiếu phông hay hỏng tệp). Đưa về đúng chỗ trên máy người dùng (`device_commit_files`).
- Nhắc người dùng: tải PPTX lên Google Drive rồi mở bằng Google Slides; xem lướt mọi tiêu đề và sơ đồ trước buổi giảng. Máy dùng PowerPoint, Keynote cần cài phông một lần: `python3 tools/slide.py --xuat-phong "<thư mục ngoài repo>"`.
- Người dùng nói "duyệt": khép dự án bằng `tools/dong-goi.py` như mọi ấn phẩm (skill thiet-ke bước 5).
- Dọn cuối phiên theo `skills/_chung/van-hanh.md` mục "Repo sạch"; `python3 tools/kiem-sach.py` ĐẠT rồi mới báo xong.

## Sửa lõi trình chiếu

Thêm kiểu slide, loại sơ đồ, đổi bố cục dùng chung: theo `trinh-chieu/README.md` mục cuối; `python3 tools/slide.py --kiem` phải ĐẠT và đã NHÌN tờ tổng thể của mọi deck mẫu trước khi dùng cho bài thật, vì một thay đổi ở lõi chạm tới mọi bài sau này. Loại sơ đồ mới nên có bản tương ứng trong `minh-hoa/so-do.js` để poster và slide nói cùng một hình.

## Quy tắc cứng

- Trung thành tuyệt đối với nội dung gốc; mọi thay đổi nội dung phải được người dùng đồng ý.
- Tên, chức danh, từ ngữ theo PHONG-CACH mục 1, 4 nguyên văn; không Title Case, không gạch dài, không emoji; bài tiếng Anh theo chuan/09 mục 8.
- Không giãn chữ ở bất kỳ đâu (Google Slides vỡ chữ tiếng Việt); máy báo `gian-chu` là LỖI.
- Hai chốt duyệt cho bài mới: dàn ý trước khi dựng; tờ tổng thể và PPTX nháp trước bản cuối.
- Không báo "xong" khi `tools/slide.py` còn LỖI hoặc chưa NHÌN ảnh xem trước; đọc soát dấu tiếng Việt từng âm tiết.
- File `.json` là nguồn sự thật; không dựng đè lên chỉnh sửa người dùng làm trên Google Slides.
- Không ảnh AI thay người, lớp, sự kiện thật; không số liệu bịa; ghi tác giả mọi framework, công cụ trên slide.
- Repo sạch: bài trình chiếu, nháp, PPTX, PDF không bao giờ ghi vào repo; cuối phiên `python3 tools/kiem-sach.py` ĐẠT. Không tự commit git.
