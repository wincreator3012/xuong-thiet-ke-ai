# HƯỚNG DẪN SỬ DỤNG XƯỞNG THIẾT KẾ

Tài liệu cho người dùng, đọc sau khi đã cài xong ([BAT-DAU.md](BAT-DAU.md)). Bạn không cần đọc hết một lần: mục 1-3 đủ để làm ấn phẩm đầu tiên, các mục sau tra khi cần. Mọi việc dưới đây bạn chỉ cần nói bằng lời thường với trợ lý AI; tên tệp và lệnh trong ngoặc là để bạn biết nó nằm ở đâu, không phải để bạn gõ.

## 1. Một ấn phẩm đi qua những bước nào

1. **Bạn nói nhu cầu**, kèm tư liệu nếu có (ảnh gốc, logo đối tác, nội dung chương trình). Một câu tốt có ba ý: làm gì, cho ai, đăng ở đâu.
2. **Trợ lý lập brief** trong thư mục dự án (`Du an/<năm-tháng tên dự án>/BRIEF.md`): mục đích, người xem, chữ nguyên văn, chức danh, khổ, họ màu, khuôn. Nó hỏi bạn MỘT lượt những gì còn thiếu. **Chốt 1: bạn duyệt brief.** Sửa ở đây rẻ nhất.
3. **Trợ lý dựng bản nháp** mọi khổ và gửi **tờ tổng thể** (tất cả khổ đặt cạnh nhau) kèm vài dòng giải thích lựa chọn và cảnh báo còn lại. Bạn góp ý bằng lời, hoặc tự mở Bàn thiết kế sửa. **Chốt 2: bạn duyệt tờ tổng thể.**
4. **Trợ lý xuất bản cuối** vào `Thanh pham/<tên dự án>/NN <tên ấn phẩm>/` (mỗi ấn phẩm một thư mục đánh số): ảnh nét gấp đôi đúng chuẩn từng nền tảng (PNG và JPG), PDF in CMYK khi cần in; kèm văn bản thay thế [alt text] cho từng ảnh và lưu ý khi đăng.
5. **Bạn nói "duyệt"**: trợ lý đóng gói (mỗi thư mục ấn phẩm có thêm báo cáo nghiệm thu và `DANG.md`: văn bản thay thế, lời đăng gợi ý, lưu ý đăng hoặc gửi in), xin phép bạn một lần rồi dọn nháp của dự án. Hồ sơ dự án chỉ còn brief, sổ góp ý, tư liệu, ảnh đã xử lý và file ấn phẩm, đủ để dựng lại khi cần.
6. **Góp ý đáng nhớ được ghi lại**: góp ý của từng dự án vào `SO-GOP-Y.md` của dự án; góp ý lặp lại lần thứ hai thì trợ lý sửa luôn mặc định của xưởng và ghi vào sổ tay góp ý trong `phong-cach/PHONG-CACH.md`, để lần sau không phải nói lại.

Trước khi báo "xong", trợ lý phải qua cổng nghiệm thu: máy không báo lỗi (chữ tràn, lấn vùng bị che), trợ lý đã nhìn ảnh thật và đọc soát từng chữ.

## 2. Đặt yêu cầu thế nào

Công thức: **làm gì + cho ai + đăng ở đâu + chữ nguyên văn (nếu có) + ảnh (nếu có)**. Thiếu gì trợ lý sẽ hỏi, có mặc định từ phong cách của bạn.

| Bạn muốn | Câu mẫu | Khuôn trợ lý thường chọn |
|---|---|---|
| Thông cáo khoá học, sự kiện | "Làm bộ ảnh thông cáo khoá X khai giảng 15/11, học trực tuyến 8 buổi, cho người làm nhân sự. Đăng Facebook, LinkedIn, story." | `thong-cao` |
| Lịch khai giảng, thông tin buổi học | "Làm ảnh lịch khai giảng tháng 11, tô ngày 15, ba dòng: giờ, hình thức, điểm nổi bật." | `lich-thong-tin` |
| Giới thiệu bạn hoặc khách mời | "Làm ảnh giới thiệu tôi làm diễn giả hội thảo Y, ảnh của tôi đây." | `gioi-thieu-chuyen-gia` |
| Một câu hỏi chạm người xem | "Làm ảnh câu hỏi mở chiến dịch cho khoá Z, có ảnh tôi tách nền." | `cau-hoi-chan-dung` |
| Thư ngỏ, thư mời, thư cảm ơn | "Viết và thiết kế thư mời học viên cũ quay lại khoá nâng cao." | `thu-ngo` |
| Hỏi đáp, lợi ích, các bước | "Làm ảnh ba câu hỏi thường gặp về khoá học, có ảnh hai giảng viên." | `hoi-dap` |
| Mô hình, quy trình, số liệu của bạn | "Vẽ mô hình bốn bước của tôi thành ảnh vuông và bản ngang cho slide." | `so-do-tri-thuc` |
| Trích dẫn | "Làm ảnh trích câu này của tôi, kèm một câu hỏi mở." | `trich-dan` |
| Ảnh bìa trang, kênh, thumbnail | "Làm ảnh bìa Facebook và banner YouTube cho trang của tôi." | `thong-cao` hoặc khuôn hợp nhất |
| Chứng nhận | "Làm giấy chứng nhận A4 ngang cho 30 học viên, danh sách đây." | `chung-nhan` |
| Thẻ đeo | "Làm thẻ đeo cho ban tổ chức và diễn giả sự kiện." | `the-deo` |
| Phông sân khấu, màn LED, standee | "Làm phông 6x3 m và hình màn LED 1536x768 cho lễ khai giảng." | `backdrop-su-kien` |
| Photo wall | "Làm photo wall có logo lặp và hashtag." | `photo-wall` |
| Bài trình chiếu | "Làm slide 20 trang cho buổi toạ đàm từ dàn ý này, tiếng Việt." / "Make English slides from this outline." | (skill slide) |
| Chỉnh ảnh | "Ảnh này tối và ám vàng, chỉnh giúp tôi." / "Tách nền ảnh chân dung này." | (skill ảnh) |
| Tư vấn chữ | "Tư vấn chữ cho ấn phẩm này: nên ghi gì lên ảnh, gì để ở lời đăng." | (skill chữ) |
| Thêm khổ cho ấn phẩm cũ | "Thêm bản story và ảnh bìa sự kiện Facebook cho bộ thông cáo tuần trước." | khuôn cũ |
| Làm giống một mẫu | "Làm tương tự mẫu này nhưng theo màu của tôi." [kèm ảnh] | trợ lý chọn hoặc đề xuất khuôn mới |

Mẹo nhỏ khi viết chữ nguyên văn:

- Dấu `~` giữ hai chữ không bị tách dòng: `TS~Nguyễn~Minh~An`, `90~phút`.
- `*chữ nghiêng*` để nhấn nhẹ, `**chữ đậm**` để nhấn mạnh, `==chữ tô màu==` để tô màu nhấn.
- Xuống dòng tiêu đề theo nghĩa: nói với trợ lý "ngắt sau chữ X".

## 3. Các khổ (thể thức) thường dùng

Một nội dung dựng ra nhiều khổ; mỗi khổ tự chừa vùng bị nền tảng che (ảnh đại diện, nút, thanh tiêu đề) và có định mức số chữ để vẫn đọc được trên điện thoại.

| Khổ | Kích thước | Dùng cho |
|---|---|---|
| `ig-4x5` | 1080x1350 | bài đăng dọc Facebook, Instagram (chiếm nhiều chỗ nhất trên bảng tin) |
| `vuong` | 1080x1080 | bài đăng vuông, LinkedIn, Zalo |
| `doc-9x16` | 1080x1920 | story Facebook, Instagram, Zalo (luôn là bản rút gọn chữ) |
| `ngang-16x9` | 1920x1080 | ảnh ngang, slide, màn hình |
| `og-191` | 1200x630 | ảnh chia sẻ link web |
| `fb-bia`, `fb-su-kien`, `yt-banner`, `li-banner`, `zalo-bia` | theo nền tảng | ảnh bìa trang, sự kiện, kênh |
| `yt-thumb` | 1280x720 | thumbnail YouTube |
| `a4-doc`, `a4-ngang`, `a5-doc`, `a3-doc`, `poster-60x90` | khổ in | handout, chứng nhận, poster |
| `the-deo`, `danh-thiep` | khổ in nhỏ | thẻ đeo, danh thiếp |
| `standee-x-60x160`, `rollup-80x200`, `backdrop-6x3`, `backdrop-4x25`, `photo-wall-25x23` | khổ sự kiện | standee, roll-up, phông, photo wall |

Muốn xem đủ 30 khổ: "liệt kê các khổ xưởng làm được". Khổ không có sẵn (màn LED theo bản đồ điểm ảnh, phông kích thước lạ): nói kích thước thật, trợ lý dựng khổ tự do.

## 4. Bàn thiết kế: tự sửa trong trình duyệt

Mở: vào thư mục repo, **bấm đúp `Mo ban thiet ke.command`** (Mac) hoặc **`Mo ban thiet ke.bat`** (Windows). Trình duyệt mở trang Bàn thiết kế; giữ cửa sổ dòng lệnh mở trong lúc làm.

- **Chọn ấn phẩm** ở ô trên cùng (danh sách lấy từ các dự án trong `Du an/`), hoặc trợ lý gửi bạn đường dẫn mở thẳng.
- **Khổ** ở cột trái: bấm để chuyển khổ; "+ thêm thể thức" để ra thêm khổ mới từ cùng nội dung; bấm chuột phải vào một khổ để bỏ.
- **Bấm một phần tử** để chọn: kéo để dời, kéo góc để đổi cỡ, kéo chấm tròn để xoay, phím mũi tên để dời 1 px (giữ Shift: 10 px).
- **Bấm đúp vào chữ** để sửa ngay trên ấn phẩm; Esc hoặc bấm ra ngoài để xong.
- **Cột phải**: sửa nội dung, đổi cỡ chữ riêng cho khổ này, thay ảnh, chỉnh tiêu điểm ảnh (phần mặt luôn được giữ khi cắt), ẩn phần tử ở khổ này, đặt lại vị trí, chép vị trí sang các khổ cùng nhóm. Bên dưới là **cảnh báo kiểm** (chữ quá nhỏ, lấn vùng an toàn, tương phản thấp...).
- **Xem vùng an toàn**: khung xanh nét đứt là vùng nền tảng không che; vùng đỏ là chỗ phải để trống.
- **Chủ đề màu, thương hiệu** ở cột trái: đổi cả bộ màu, logo chỉ bằng một lựa chọn.
- **Lưu** (Cmd+S hoặc Ctrl+S), **Hoàn tác** (Cmd+Z hoặc Ctrl+Z). Mọi lần lưu giữ bản cũ trong `thiet-ke/_phien-ban/` của dự án.
- **Xuất khổ này / mọi khổ**: ra ảnh bản cuối trong `Thanh pham/<tên dự án>/`.

Thay đổi vị trí, cỡ chữ, ẩn hiện chỉ áp cho khổ đang xem; thay đổi nội dung chữ, ảnh áp cho mọi khổ. Sửa xong, nói với trợ lý "tôi chỉnh xong rồi": nó đọc lại và giữ nguyên mọi chỉnh tay của bạn.

## 5. Khi trợ lý nhờ "bấm đúp Dung tren may"

Một số ứng dụng AI (ví dụ Claude Cowork) làm việc trong một máy ảo không có trình duyệt nên không tự dựng ảnh được. Khi đó trợ lý xếp việc vào hàng đợi và nhờ bạn bấm đúp **`Dung tren may.command`** (Mac) hoặc **`Dung tren may.bat`** (Windows) ở gốc repo. Một cửa sổ mở ra, máy bạn dựng ảnh rồi chờ việc mới trong 30 phút; trợ lý tự biết khi xong. Bạn chỉ cần để cửa sổ mở, xong thì đóng.

## 6. Phong cách của bạn

Ba tệp giữ phong cách của bạn (tạo ở bước cài từ bản khởi đầu cùng tên có thêm `.mau`; chúng không lên git chung và không bị bản cập nhật của xưởng ghi đè). Bạn đọc, sửa tay được, nhưng cách dễ nhất là nói với trợ lý:

- `phong-cach/PHONG-CACH.md`: tên, chức danh nguyên văn, ấn phẩm hay làm, cảm giác, họ màu, quy ước chữ, logo, sổ tay góp ý. Đây là "bản đồ" trợ lý đọc trước mỗi ấn phẩm.
- `brand/brand.json`: phần máy đọc: họ màu (mã màu theo vai: nền, chữ, nhấn...), thương hiệu và logo, tên và các bản chức danh.
- `phong-cach/tu-ngu.json`: từ bạn không bao giờ dùng và từ thay thế; máy tự bắt khi dựng.

Những câu hay dùng:

- "Từ nay chữ phụ to hơn một chút." / "Từ nay không dùng chữ X, dùng Y." (trợ lý sửa mặc định, không chỉ ấn phẩm đang làm)
- "Đổi chức danh mặc định thành..." / "Thêm bản chức danh ngắn cho thẻ người trên bài đăng nhiều người."
- "Thêm logo đối tác A" (thả logo vào `brand/logo/` trước).
- "Pha một họ màu từ logo của tôi." / "Họ màu cho sự kiện tối hơn một chút."
- "Phân tích mẫu tham khảo của tôi" (sau khi thả ấn phẩm bạn thích vào `phong-cach/mau-tham-khao/`).
- "Đổi phong cách" để làm lại từng phần của bước thiết lập.

## 7. Ảnh: chuẩn bị và chỉnh

- **Gửi ảnh gốc** từ máy ảnh, điện thoại (đừng gửi ảnh chụp màn hình, ảnh đã nén qua ứng dụng nhắn tin). Ảnh iPhone dạng HEIC dùng được, trợ lý tự đổi.
- **Ảnh tốt cho ấn phẩm**: khoảnh khắc thật đang giảng, đang lắng nghe; mặt có sáng, mắt nét; nền gọn; ánh nhìn hướng về phía sẽ đặt chữ (hoặc nhìn thẳng khi muốn kết nối).
- **Quy trình chỉnh ba bước**: trợ lý khám ảnh (độ sáng, ám màu, độ nét trên mặt, đủ độ phân giải để in không), kê đơn chỉnh nhẹ có giới hạn an toàn, rồi gửi bạn ảnh so sánh trước/sau để duyệt. Đa số ảnh không cần sửa.
- **Tách nền** cho khuôn cần người đứng riêng (thông cáo, câu hỏi chân dung): trợ lý kiểm kỹ mép tóc, tay; không tách nền ảnh nhóm.
- **Đồng bộ màu cả bộ** khi một chiến dịch dùng ảnh từ nhiều máy.
- **Giới hạn đạo đức**: được xoá mụn, vết tạm thời, vật thừa ở nền; không đổi dáng mặt, thân, tuổi, màu da; không thêm bớt người; không dùng ảnh AI thay người, lớp học, sự kiện thật; ảnh học viên cần có sự đồng ý.

Lần đầu chỉnh ảnh, trợ lý cài thêm thư viện (vài trăm MB).

## 8. In ấn và sự kiện

Cho trợ lý biết càng sớm càng tốt:

- **In**: khổ thành phẩm, số lượng, loại giấy, gia công (cán màng, gấp, bế, ép kim), nhà in nào và họ dùng hồ sơ màu gì (không biết thì trợ lý mặc định Japan Color và ghi rõ là giả định), hạn giao file.
- **Phông sân khấu**: kích thước thật, chiều cao sân khấu, vị trí bục phát biểu, có màn LED ở giữa không, khoảng cách tới hàng ghế cuối, vật liệu.
- **Màn LED**: bản đồ điểm ảnh (ví dụ 1536x768) từ đơn vị cho thuê màn.
- **Standee, roll-up**: xin file khuôn của nhà in.

Trợ lý xuất PDF in CMYK đúng chuẩn (tràn lề, vùng an toàn, chữ đen chỉ một màu mực, phông nhúng, tổng mực dưới giới hạn) kèm ghi chú gửi nhà in. Vàng kim in CMYK sẽ thành vàng đất đục: trợ lý sẽ hỏi bạn muốn ép kim, mực nhũ hay đổi màu.

### Bài trình chiếu (slide)

Đưa trợ lý dàn ý, bài viết hay tài liệu, nói người xem là ai, chiếu ở đâu (hội trường, Zoom), tiếng Việt hay Anh. Trợ lý trình **dàn ý** (từng slide, tiêu đề, loại sơ đồ và lý do) để bạn duyệt, rồi dựng và gửi **tờ tổng thể** cùng tệp PPTX nháp. Bản cuối nằm trong `Thanh pham/<dự án>/NN <tên bài>/`: tệp `.pptx` và một PDF chiếu dự phòng.

- Mở bằng Google Slides (tải lên Google Drive): mọi chữ, kể cả nhãn trên sơ đồ, sửa được ngay; phông của xưởng có sẵn trên Google Slides. Mở bằng PowerPoint, Keynote: cài phông một lần (nhờ trợ lý xuất bộ phông TTF).
- Lời giảng nằm ở ghi chú người nói dưới mỗi slide; mô hình giảng từng chặng thì mỗi chặng một slide, chặng đang nói được tô màu.
- Dựng slide cần Node.js trên máy chạy lệnh (trợ lý tự cài thư viện vào `Du an/_tam/`); có LibreOffice thì trợ lý xem trước được từng slide trước khi gửi bạn.
- Sửa trên Google Slides rồi muốn trợ lý làm tiếp: tải bản đã sửa về dạng PPTX gửi trợ lý, để không mất chỗ bạn sửa.

## 9. Thư mục dự án

Trong thư mục `AI Designer`, cạnh repo:

- `Du an/<năm-tháng tên dự án>/` (trợ lý tạo): `BRIEF.md`, `SO-GOP-Y.md`, `nguon/` (tư liệu bạn đưa), `anh/` (ảnh đã xử lý), `thiet-ke/` (file ấn phẩm, Bàn thiết kế ghi vào đây), `nhap/` (bản dựng nháp, tờ tổng thể).
- `Thanh pham/<năm-tháng tên dự án>/NN <tên ấn phẩm>/`: ảnh, PDF bản cuối để đăng, gửi in; sau khi duyệt có thêm báo cáo nghiệm thu và `DANG.md`. Sao lưu cả dự án bằng cách dời một thư mục.

Repo không bao giờ chứa nháp hay thành phẩm: trợ lý ghi mọi thứ ra ngoài repo và cuối mỗi phiên kiểm repo còn sạch. Thấy thư mục lạ như `Claude outputs/` trong repo: đó là bản chép ứng dụng tạo khi gửi ảnh vào khung chat; trợ lý sẽ dọn.

## 10. Dùng xưởng hiệu quả nhất

1. **Bắt đầu nhỏ và thật.** Một ấn phẩm bạn sắp đăng, làm trọn một vòng tới bản cuối, rồi mới làm cả chiến dịch.
2. **Nói ai xem, ở đâu.** "Học viên cũ trên Zalo" và "khách mời doanh nghiệp xem phông từ cuối hội trường" dẫn tới hai ấn phẩm rất khác nhau.
3. **Đưa chữ nguyên văn khi đã có**, nhất là tên chương trình, ngày giờ, giá, đường dẫn. Chưa có thì nhờ trợ lý tư vấn chữ.
4. **Đưa ảnh gốc**, không ảnh chụp màn hình.
5. **Dành sức cho brief.** Đổi thông điệp, khổ, họ màu ở brief mất một câu; đổi ở bản cuối mất cả buổi.
6. **Nghĩ cả bộ khổ ngay từ đầu.** Một nội dung, mọi kênh: bài đăng, story, ảnh bìa sự kiện, ảnh chia sẻ web.
7. **Story luôn ít chữ.** Khổ dọc chỉ giữ tiêu đề, người, ngày, nút; phần còn lại ở lời đăng.
8. **Góp ý cụ thể theo khổ**: "story: tên to hơn", "bản ngang: dời ảnh sang phải".
9. **Chê một lần rồi dặn "từ nay"** để xưởng ghi vào sổ tay và các ấn phẩm sau không lặp lại.
10. **Dùng Bàn thiết kế cho chỉnh nhỏ** (dời một chữ, đổi một ảnh): nhanh hơn mô tả bằng lời.
11. **Giữ một họ màu cho một chiến dịch**; đổi họ màu cho chiến dịch khác để người xem nhận ra.
12. **Ghi công tác giả** mọi mô hình, công cụ của người khác bạn nhắc trên ấn phẩm; trợ lý sẽ nhắc nếu bạn quên.

## 11. Xưởng không làm gì

- Không tạo ảnh người, lớp học, sự kiện bằng AI; không sao chép thiết kế, logo, hình minh hoạ của người khác (học nguyên lý từ mẫu thì được).
- Không bịa số liệu, lời chứng thực, khan hiếm giả.
- Không tự đăng lên nền tảng nào; không làm video, trang web, sách dàn trang dài (slide thuyết trình thì có: skill `thiet-ke-slide`).
- Không thay bạn quyết định: hai chốt duyệt là của bạn.
- Ảnh nguồn kém (tối, nhoè, quá nhỏ) chỉ cứu được một phần; ảnh in khổ lớn cần ảnh gốc đủ lớn.
- Windows ít được kiểm hơn Mac; trợ lý có thể cần rà soát thêm vài bước cài.

Nhờ thứ xưởng chưa có, trợ lý sẽ nói thẳng "xưởng chưa có" và đề xuất cách gần nhất.

## 12. Câu nói nhanh

| Bạn nói | Trợ lý làm |
|---|---|
| "Xưởng làm được gì?" / "Giới thiệu lại xưởng" | giới thiệu có hệ thống, cá nhân hoá theo phong cách của bạn |
| "Kiểm tra xưởng" | kiểm môi trường, cài phần thiếu, dựng thử |
| "Mở bàn thiết kế cho ấn phẩm này" | chuẩn bị và nhắc bạn bấm đúp tệp mở Bàn |
| "Tôi chỉnh xong rồi" | đọc lại file, giữ chỉnh tay, dựng lại nếu cần |
| "Thêm khổ X cho ấn phẩm Y" | dựng thêm khổ từ cùng nội dung |
| "Xuất bản cuối" | xuất ảnh, PDF vào `Thanh pham/` |
| "Làm file in gửi nhà in Z" | PDF CMYK đúng hồ sơ màu kèm ghi chú |
| "Từ nay..." | sửa mặc định, ghi sổ tay góp ý |
| "Đổi phong cách" | làm lại phần thiết lập bạn muốn đổi |
| "Cập nhật xưởng từ bản mới" | cập nhật theo `docs/DONG-GOP.md`, giữ phần của bạn |

## 13. Sự cố thường gặp

| Bạn thấy | Thường là | Làm gì |
|---|---|---|
| Mac báo không mở được tệp `.command` | macOS chặn tệp tải từ mạng | bấm chuột phải vào tệp, chọn Open, rồi Open lần nữa (một lần) |
| Windows báo "Windows protected your PC" | SmartScreen chặn tệp `.bat` | bấm "More info" rồi "Run anyway" |
| Windows báo không có Python | chưa cài hoặc chưa thêm vào PATH | cài từ python.org, đánh dấu "Add python.exe to PATH", rồi nói trợ lý "kiểm tra xưởng" |
| Trợ lý nói không dựng được ảnh | nơi nó chạy không có trình duyệt | bấm đúp `Dung tren may` khi được nhờ; hoặc nói "kiểm tra xưởng" |
| Chữ trên ảnh mất dấu, sai phông | phông chưa nạp | nói với trợ lý, nó dựng lại; báo lỗi nếu lặp lại |
| Bàn thiết kế báo "file đã đổi" | trợ lý vừa sửa, hoặc dịch vụ đồng bộ đám mây vừa ghi | chọn nạp bản mới; bản cũ luôn còn trong `thiet-ke/_phien-ban/` |
| Logo không hiện | chưa khai tên tệp logo | nói "logo của tôi là tệp X trong brand/logo" |
| Không thấy ảnh xuất | ảnh nằm ở `Thanh pham/`, không ở trong repo | mở `AI Designer/Thanh pham/<tên dự án>/` |

Còn lại: nói với trợ lý điều bạn thấy bằng lời thường, nó có tài liệu chẩn đoán bên trong thư mục.

## 14. Cập nhật xưởng

Xưởng được tác giả cập nhật từ kinh nghiệm dùng thật (khuôn mới, chuẩn nền tảng mới, sửa lỗi). Lấy bản mới mà không mất phong cách, logo, dự án của bạn: [docs/DONG-GOP.md](docs/DONG-GOP.md). Cách dễ nhất: tải bản mới về thư mục tạm rồi nói "cập nhật xưởng từ thư mục <tên>, giữ nguyên phong cách của tôi".

---

Xưởng thiết kế Claude do nhà giáo dục Lương Dũng Nhân ([ldn.edu.vn](https://ldn.edu.vn)) tạo ra và chia sẻ miễn phí. Dùng lại, chia sẻ tiếp: giữ dòng ghi công theo [GHI-CONG.md](GHI-CONG.md).
