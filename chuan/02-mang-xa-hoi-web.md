# Chuẩn số: mạng xã hội, web, email, trực tuyến

Bản chưng cất từ `nghien-cuu/A-digital-specs.md` (2026-10-06). Con số dùng để dựng nằm ở `chuan/kho-the-thuc.json`; file này giải thích vì sao, mức tin cậy, và cách dùng. Nền tảng đổi quy cách thường xuyên: con số nào đánh dấu "cần kiểm" thì đăng thử trước khi làm hàng loạt, và cập nhật kho kèm ngày khi có thay đổi.

Ký hiệu mức tin cậy: **[CT]** trang chính thức của nền tảng; **[2N]** ít nhất hai hướng dẫn uy tín khớp nhau; **[MT]** nguồn mâu thuẫn, đã chọn phương án an toàn; **[TÍNH]** tự tính từ hình học.

## 1. Mười con số cần nhớ

| # | Quy tắc | Mức |
|---|---|---|
| 1 | Khung feed mặc định **1080x1350 (4:5)** cho Facebook, Instagram, LinkedIn, Threads; **1080x1440 (3:4)** khi đẹp trên lưới hồ sơ Instagram quan trọng nhất | 2N |
| 2 | Video, ảnh dọc **1080x1920 (9:16)**; vùng an toàn Reels của Meta: chừa **trên 14% (269 px), dưới 35% (672 px), hai bên 6% (65 px)**; Stories: dưới 20% (384 px) | CT qua 2 nguồn |
| 3 | Hộp an toàn 9:16 chung cho Reels, TikTok, Shorts: **x 120-888, y 288-1248** | TÍNH |
| 4 | Lưới hồ sơ Instagram cắt mọi bài về **3:4** (từ 01/2025): bài 4:5 mất khoảng 34 px mỗi bên, bài vuông mất 135 px mỗi bên, ảnh bìa Reels mất 240 px trên và dưới | 2N, TÍNH |
| 5 | Ảnh chia sẻ liên kết (Open Graph) **1200x630**, tối thiểu 200x200, tối đa 8 MB; khai báo og:image:width, height, alt | CT |
| 6 | Thumbnail YouTube: khuyến nghị chính thức nay là **3840x2160**, tối đa 50 MB trên máy tính, **2 MB khi tải từ điện thoại**; 1280x720 vẫn được nhận | CT |
| 7 | Ảnh bìa kênh YouTube **2560x1440**, vùng hiện mọi thiết bị **1546x423** ở giữa, tối đa 6 MB | 2N |
| 8 | Ảnh bìa hồ sơ LinkedIn **1584x396 (4:1)**, tối đa 8 MB; bìa trang công ty 4200x700 (6:1) | 2N |
| 9 | Quảng cáo Meta: bề ngang khuyến nghị nay là **1440 px** (1440x1800, 1440x2560); 1080 vẫn đạt tối thiểu; ảnh tối đa 30 MB; quy tắc 20% chữ đã bỏ từ 2020 nhưng ít chữ vẫn phân phối tốt hơn | 2N |
| 10 | Luôn xuất **sRGB, 8 bit, có nhúng hồ sơ màu**; PNG cho ảnh nhiều chữ trên Facebook, JPG chất lượng cao cho ảnh chụp | 2N |

## 2. Theo nền tảng (đã nạp vào kho thể thức)

| Thể thức trong kho | Kích thước | Vùng an toàn, vùng trống | Ghi chú |
|---|---|---|---|
| `vuong` | 1080x1080 | lưới IG chỉ hiện 810 px giữa | nhiều nội dung cũ; trên lưới IG trông bị cắt |
| `ig-4x5` | 1080x1350 | lưới IG cắt 34 px mỗi bên | mặc định feed |
| `ig-3x4` | 1080x1440 | hiện trọn trên lưới IG | tải đúng 1080 px ngang |
| `doc-9x16` | 1080x1920 | trên 269, dưới 384, bên 65 (Stories Meta) | ảnh story, Zalo story |
| `reels-9x16` | 1080x1920 | x 120-888, y 288-1248 | ảnh bìa video dọc, mọi nền tảng |
| `doc-1x2` | 1080x2160 | phần quan trọng trong dải giữa cao 1350 | Facebook cắt về 4:5 trên feed |
| `ngang-16x9` | 1920x1080 | | trình chiếu, bài LinkedIn, nền Zoom |
| `og-191` | 1200x630 | chữ trong khoảng giữa 1000x500 | web, Zalo, Facebook link |
| `fb-bia` | 1640x924 | dải máy tính y 150-774, tránh góc trái dưới (ảnh đại diện) | an toàn cả máy tính và điện thoại [MT] |
| `fb-bia-rong` | 1640x624 | điện thoại cắt về 16:9 giữa: chữ trong x 266-1374 | bìa trang có chữ ở giữa |
| `fb-su-kien` | 1920x1005 | chữ trong 1600x840 giữa | |
| `yt-thumb` | 1280x720 (xuất 2x) | góc phải dưới có nhãn thời lượng | chữ từ 100 px, 2-5 từ |
| `yt-banner` | 2560x1440 | 1546x423 giữa | |
| `li-banner` | 1584x396 | x 480-1390, y 40-300; ảnh đại diện đè góc trái dưới | LinkedIn không công bố toạ độ [MT] |
| `zalo-bai` | 1280x720 | vùng hiển thị 14:9: x 80-1200 [CT] | ảnh tin ZNS dưới 500 KB, chữ không quá 50% diện tích |
| `zalo-bia` | 1280x1400 | dải giữa y 360-1040 | nguồn thứ ba mâu thuẫn, đăng thử [MT] |
| `email-dau` | 1200x400 | | hiển thị 600 px, mỗi ảnh dưới 200 KB |
| `zoom-nen` | 1920x1080 | chừa vùng đầu vai giữa dưới | logo, tên ở góc trên |

Chưa nạp vào kho (thêm khi cần): ảnh đại diện trang (720x720, nội dung trong hình tròn), quảng cáo cột phải Facebook (1080x1080, hiện rất nhỏ: 1-3 từ), thẻ băng chuyền quảng cáo (1080x1080), bìa nhóm Facebook (1640x856), bìa bài viết, bản tin LinkedIn (1920x1080, 1280x720), bìa sự kiện LinkedIn (1776x444), X (1600x900, header 1500x500), bộ favicon (32, 180, 192, 512 px và SVG). Chi tiết ở `nghien-cuu/A-digital-specs.md`.

**Điểm cần kiểm khi đăng thử**: vùng hiển thị ảnh bìa Zalo OA; toạ độ ảnh đại diện đè trên bìa LinkedIn; vùng an toàn TikTok chính xác (tải mẫu trong TikTok Ads Manager); Instagram giữ 1080 hay 1440 px.

## 3. Xuất file đúng cách

| Nền tảng | Nền tảng làm gì với ảnh | Nên xuất |
|---|---|---|
| Facebook | giữ tới **2048 px cạnh dài**, nén lại JPEG; PNG ít hỏng hơn với ảnh nhiều chữ | ảnh nhiều chữ: PNG ở bản 2x (kho để `tiLe: 2`: 2160x2700 rồi Facebook thu về 1638x2048) |
| Instagram | trang trợ giúp nói tối đa 1080 ngang, nén lại JPEG | **đúng 1080 px ngang** cho ảnh nhiều chữ (thể thức ig-3x4 để `tiLe: 1`) |
| LinkedIn | nén ảnh; tài liệu PDF hiện từng trang | bài dạng tài liệu (carousel): PDF vector, phông nhúng, tối đa 100 MB, 300 trang |
| YouTube | thumbnail tới 4K | 2560x1440 hoặc 3840x2160, dưới 2 MB nếu tải từ điện thoại |

- **Không gian màu**: sRGB có nhúng hồ sơ (ve.py tự nhúng). Ảnh iPhone (Display P3) được `tools/anh.py chuan-hoa` đổi sang sRGB trước khi đưa vào khuôn.
- **Định dạng**: PNG cho ảnh nhiều chữ, màu phẳng; JPG 85-95 cho ảnh chụp (ve.py xuất JPG 92, lấy mẫu màu 4:4:4 để chữ màu không nhoè); web dùng AVIF, WebP kèm JPG dự phòng; không tải WebP, AVIF lên mạng xã hội.
- **Chống vỡ chữ khi nền tảng nén lại**: tạo tương phản bằng độ sáng (sáng trên tối, tối trên sáng) chứ không chỉ bằng sắc màu; tránh nét quá mảnh; dấu tiếng Việt chồng (ế, ộ, ữ, ẳ) là chi tiết mất đầu tiên, nên giữ chữ đủ cỡ, đủ đậm; tránh nền chuyển màu lớn phẳng lì (lõi có lớp hạt mịn `lop-hat` chống vệt); không làm nét quá tay.

## 4. Cỡ chữ tối thiểu theo khung (đọc trên điện thoại)

Cơ sở: ảnh ngang 1080 px hiện khoảng 360-430 px CSS trên điện thoại (tỉ lệ khoảng 0,36); chữ đọc thoải mái khoảng 16 px CSS, sàn 12 px CSS.

| Khung | Tiêu đề tối thiểu | Thân tối thiểu | Chữ phụ sàn | Số chữ trên hình |
|---|---|---|---|---|
| Feed 4:5, 3:4, 1:1 (ngang 1080) | 72-96 px | 40-44 px | 28-32 px (lõi cảnh báo dưới 24 px) | 20-25 từ |
| Carousel, tài liệu LinkedIn | 72-110 px | 40-48 px | 32 px | tối đa 40 từ, 6-8 dòng mỗi trang |
| 9:16 | 80-110 px | 44-52 px | 36 px | ngắn |
| Ảnh bìa đọc được trên lưới IG | từ 120 px | không đọc được | | 2-5 từ |
| Thumbnail YouTube (1280) | từ 100 px | không đọc được | | 3-5 từ |
| Ảnh liên kết 1200x630 | từ 64 px | từ 40 px | | tối đa 10 từ |
| Slide Zoom 1920x1080 | từ 56 px | từ 37 px (khoảng 28 pt) | | |

Nhiều bộ ấn phẩm làm sẵn dùng chữ phụ khoảng 16-20 px (quy về khung 1080): đẹp khi xem lớn nhưng khó đọc trên điện thoại. Các khuôn trong repo nâng chữ phụ lên 22-26 px và lõi tự co toàn bộ khi một thể thức quá chật; khi lõi báo "co toàn bộ" dưới 85%, nên bớt chữ ở thể thức đó (trường `theoNhom` hay `theoTheThuc` của ấn phẩm) thay vì chấp nhận chữ bé.

## 5. Một ấn phẩm, nhiều thể thức (resize nhanh và chính xác)

Cách các đội chuyên nghiệp làm (thích nghi một hình chủ đạo [key visual adaptation]) và cách hệ thống này làm:

1. **Một nguồn**: file ấn phẩm (`thiet-ke/<tên>.json`) giữ nội dung một lần; khuôn HTML giữ bố cục theo **nhóm tỉ lệ** (vuong, doc-nhe, doc, ngang, bang); kho thể thức giữ kích thước và vùng an toàn. Thêm một thể thức là thêm một id vào mảng `theThuc`, không thiết kế lại.
2. **Mỗi lớp thích nghi một cách**: nền (ảnh, màu, hoạ tiết) co và cắt quanh tiêu điểm (`tieuDiem` của ảnh); nhân vật chính dời chỗ và đổi cỡ theo nhóm; chữ chảy lại (xuống dòng, cỡ thay đổi theo đơn vị cqmin), không bao giờ chỉ thu nhỏ; logo cố định theo cạnh ngắn; nút và ngày giờ chảy lại, bỏ đi ở khổ quá nhỏ.
3. **Thứ tự làm**: dọc trước (9:16, 3:4, 4:5), rồi vuông, rồi ngang (16:9, 1.91:1), rồi dải (bìa, banner).
4. **Khác biệt theo khổ đặt trong file ấn phẩm**: `theoNhom.<nhóm>` và `theoTheThuc.<id>` cho nội dung rút gọn, phần tử ẩn hiện, CSS riêng; `chinhTay.<id>` cho dịch chuyển tay từ Bàn thiết kế.
5. **Kiểm mỗi bản**: lớp vùng an toàn bật (Bàn thiết kế), xem ở cỡ điện thoại, xem cắt lưới IG 3:4, tương phản, dung lượng, văn bản thay thế. `tools/ve.py` tự kiểm lấn vùng an toàn, đè vùng trống, tràn chữ, chữ nhỏ, tương phản và in tờ tổng thể để duyệt một lần.

## 6. Web, email, trực tuyến

- **Hero web**: bản máy tính 1920x1080 hoặc 2560x1440 (giữ chủ thể tránh cột chữ), bản điện thoại cắt riêng 4:5 qua `<picture>`; chữ tiêu đề, nút để bằng HTML thật, không nướng vào ảnh (tiếp cận, SEO, độ nét).
- **Ảnh nổi bật bài blog**: dùng chung 1200x630 với Open Graph.
- **Email**: rộng 600-640 px hiển thị, ảnh xuất 2x, mỗi ảnh dưới 200 KB; HTML trên 102 KB bị Gmail cắt; luôn có văn bản thay thế; logo PNG trong suốt cần viền sáng để không biến mất ở chế độ tối.
- **Nền ảo Zoom**: 1920x1080, chừa vùng đầu vai giữa dưới (x 560-1360, y 300-1080); người khác thấy chữ đúng chiều.
- **Slide chia sẻ Zoom**: 1920x1080, chữ thân từ 37 px, tiêu đề từ 56 px; chừa góc phải trên nếu khung người nói nổi ở đó.

## 7. Tiếp cận

- Tương phản WCAG 2.2: xem chuan/01 R4.3 (phần lớn chữ trên ảnh mạng xã hội cần 4,5:1).
- Văn bản thay thế cho mọi ảnh đăng: ảnh nhiều chữ thì văn bản thay thế chứa đủ chữ trên ảnh; carousel thì tả từng trang; tài liệu LinkedIn thì đưa thông điệp chính vào phần lời đăng.
- Không nhấp nháy quá 3 lần mỗi giây; phụ đề video dọc nằm trong hộp an toàn (khoảng y 900-1200).
