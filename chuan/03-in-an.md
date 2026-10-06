# Chuẩn in ấn: tràn lề, độ phân giải, màu CMYK, khổ giấy, file giao nhà in

Bản chưng cất từ `nghien-cuu/B-print-stage.md` và `nghien-cuu/D-toolchain.md` (2026-10-06, đã thử thật với Chromium 141, Ghostscript 10.02 và 10.08, pikepdf). Sân khấu, phông, LED ở chuan/04.

## 1. Mười con số in ấn

| Chủ đề | Con số | Ghi chú |
|---|---|---|
| Tràn lề [bleed] khổ nhỏ | **3 mm** mỗi cạnh | nhà in Việt Nam thống nhất; danh thiếp 90x54 thì file 96x60 |
| Vùng an toàn khổ nhỏ | **3 mm** trong đường xén (4-5 mm cho danh thiếp, sổ đóng ghim) | không đặt chữ, logo sát mép, sát nếp gấp |
| Tràn lề bạt hiflex | **từ 5 cm**, an toàn 5-10 cm | chỗ bấm khoen |
| Standee cuốn | đáy 7-10 cm cuộn vào hộp: không đặt nội dung quan trọng ở **15 cm cuối** | luôn xin file khuôn của nhà in |
| Độ phân giải | 300 ppi ở kích thước thật (offset, kỹ thuật số); 150 ppi (standee, poster xem từ 1 m) | công thức theo khoảng cách ở mục 3 |
| Hồ sơ màu | **Japan Color 2001 Coated** phổ biến ở nhà in Việt Nam; FOGRA39 (ISO Coated v2) là dự phòng quốc tế | luôn hỏi nhà in |
| Tổng mực [TAC] | Japan Color 2001 Coated 350%, FOGRA39 330%, PSO Coated v3 300%; mục tiêu an toàn **≤ 300%** | |
| Đen giàu cho mảng lớn (từ 5 mm) | **C60 M40 Y40 K100** | |
| Chữ đen, nét mảnh | **chỉ K100**, in chồng [overprint] trên nền màu | trình duyệt cho #000 thành đen 4 màu nếu không xử lý (mục 4) |
| Tối thiểu | nét 0,25 pt; chữ 6 pt (8 pt chữ trắng trên nền màu, 9 pt trên giấy không tráng phủ); **chữ Việt cộng thêm 1 pt** | dấu hỏi, ngã bít mực trước |

## 2. Khổ và sản phẩm thường làm (có trong kho thể thức)

| Sản phẩm | Kích thước | Id trong kho | Ghi chú |
|---|---|---|---|
| Handout, tờ rơi, worksheet | A4 210x297, A5 148x210 | `a4-doc`, `a5-doc` | giấy C120-C150; viết lên được: couche mờ hoặc Fort |
| Giấy chứng nhận | A4 ngang | `a4-ngang` | ivory, mỹ thuật; ép kim cần lớp riêng |
| Poster | A3, 60x90 cm | `a3-doc`, `poster-60x90` | 60x90 rất phổ biến |
| Danh thiếp | 90x54 mm | `danh-thiep` | C300-C350 |
| Thẻ đeo | 9x13 cm | `the-deo` | đo vỏ thật, ruột nhỏ hơn vỏ 2-5 mm |
| Standee chữ X | 60x160, 80x180 cm | `standee-x-60x160` | bốn góc khoen để trống |
| Standee cuốn | 80x200 cm (85, 100, 120 x 200) | `rollup-80x200` | đáy 15 cm cấm nội dung |
| Brochure gấp ba A4 | các tấm 100/100/97 mm | tự do `in:297x210mm` | tấm gập vào trong hẹp hơn 3 mm |
| Sổ, workbook | A5, B5 (176x250), sách 16x24 | tự do | số trang chia hết cho 4 nếu đóng ghim |

Thể thức in tự do: `in:<rộng>x<cao>mm+<tràn lề>mm@<dpi>dpi:1-<tỉ lệ>`, ví dụ `in:297x210mm+3mm@300dpi`.

## 3. Độ phân giải theo khoảng cách xem

Thị lực 20/20 phân biệt khoảng 1 phút góc: **ppi tối thiểu ≈ 87 / khoảng cách (m)**; để chữ, logo trên ảnh sắc, lấy gấp đôi (≈ 175 / m), trần 300.

| Khoảng cách | Tối thiểu | Nên dùng | Ví dụ |
|---|---|---|---|
| 0,35 m | 249 | 300 | handout, danh thiếp, chứng nhận |
| 1 m | 87 | 150-175 | poster A2, A1, standee xem gần |
| 2 m | 44 | 90-100 | photo wall, X-banner |
| 3 m | 29 | 60 | phông nhìn từ hàng đầu |
| 10 m | 9 | 20-30 | cuối hội trường, băng rôn treo |

Ảnh chụp đưa vào khuôn in: `tools/anh.py kham` báo ảnh có đủ cho A4, A5 ở 300 ppi không. Chữ và hình vẽ bằng code của hệ thống là vector, không phụ thuộc ppi.

## 4. Đường đi file in của hệ thống (đã kiểm)

```
khuôn HTML ─ Chromium ─> PDF RGB (chữ vector, phông nhúng, khổ = thành phẩm + tràn lề)
   └ tools/in_an.py:
       1. sửa khổ trang (Chromium làm tròn tới 0,2 mm), thêm TrimBox (thành phẩm) và BleedBox
       2. đổi xám trung tính RGB sang DeviceGray: chữ đen nằm trọn bản K, không thành đen 4 màu
       3. Ghostscript đổi sang CMYK theo hồ sơ nhà in:
            Ghostscript ≥ 10.06 -> PDF/X-4 (giữ trong suốt, chữ sống)
            bản cũ, trang không trong suốt -> PDF/X-3; có trong suốt -> PDF CMYK 1.6 không nhãn X
       4. kiểm: phông nhúng, không còn màu RGB, tổng mực tối đa (đo thật), nhãn PDF/X, OutputIntent
```

Lệnh: `python3 tools/ve.py <ấn phẩm.json> --tt a4-ngang --in [--ho-so japan2001|japan2011|fogra39|pso3|pso-khong-trang]`. Ra `<tên>-<thể thức>-IN-CMYK-<hồ sơ>.pdf` cạnh bản RGB và PNG xem trước.

Kết quả đã kiểm (2026-10-06, giấy chứng nhận A4 ngang, Ghostscript 10.08): PDF/X-4, OutputIntent Japan Color 2011 Coated, TrimBox đúng 297x210 mm trong MediaBox 303x216 mm, 8 phông CID TrueType nhúng đủ (Be Vietnam Pro, Lora, dấu tiếng Việt nguyên vẹn), không còn lệnh màu RGB, tổng mực tối đa đo được 287% (dưới giới hạn 350%).

**Hồ sơ màu (tệp .icc)**: Japan Color 2011 Coated, ISO Coated v2 (FOGRA39), PSO Coated v3 (FOGRA51), PSO Uncoated v3 (FOGRA52) cho phép dùng, nhúng, chia sẻ tự do (không sửa, không bán): sandbox Ubuntu có sẵn trong gói `icc-profiles`; trên Mac tải từ eci.org rồi đặt vào `in-an/icc/`. **Japan Color 2001 Coated** nằm trong bộ hồ sơ của Adobe (miễn phí dùng, hạn chế phân phối): máy có Adobe Creative Cloud thường đã có trong `/Library/Application Support/Adobe/Color/Profiles/Recommended/`, công cụ tự tìm; không đưa tệp này vào repo.

**Ghostscript**: Mac `brew install ghostscript` (10.08, đủ PDF/X-4). Sandbox đám mây Ubuntu chỉ có 10.02: chạy `bash tools/cai-gs.sh` (khoảng 4-5 phút, dựng 10.08 vào `~/.cache/xuong-gs`) khi cần nhãn PDF/X-4 cho trang có trong suốt; không có thì công cụ tự lùi về PDF CMYK 1.6, nhà in Việt Nam vẫn nhận.

**Ba bẫy đã gặp khi thử** (đừng lặp lại):

1. Ghostscript đổi thẳng thì chữ #000 thành C72 M68 Y67 K88 (đen 4 màu, lệch bản ở chữ nhỏ). Các tuỳ chọn `-dBlackText`, `-dUseFastColor`, `-dKPreserve` đều không giải quyết đúng. Cách đúng là bước 2 ở trên. Xám #333 thành K80 in ra đậm hơn màn hình: chữ xám nên dùng từ #4d4d4d (K70) trở lên.
2. Phông biến thiên [variable font] thành Type 3 trong PDF của Chromium (Illustrator không sửa được, preflight báo lỗi): hệ thống chỉ nhúng phông tĩnh.
3. PDF/X-1a, X-3 không chấp nhận trong suốt: Ghostscript sẽ dàn phẳng CẢ TRANG thành một ảnh 720 dpi (mất chữ sống). Khuôn dùng nhiều trong suốt (thẻ kính, bóng đổ), nên cần PDF/X-4 hoặc PDF CMYK không nhãn X.

**Vàng kim**: in CMYK thành vàng đất đục. Muốn ánh kim: mực pha nhũ hoặc ép kim, nhà in cần một lớp riêng (K100 hoặc màu pha đặt tên "Foil", in chồng); hệ thống chưa tự tách lớp này, cần làm riêng với nhà in khi có yêu cầu.

## 5. Giấy thường gặp ở Việt Nam

| Tên | Là gì | Định lượng, dùng cho | Ảnh hưởng thiết kế |
|---|---|---|---|
| Couche (C) bóng, mờ | giấy tráng phủ | C100-150 tờ rơi, brochure; C200-250 bìa, poster; C300-350 danh thiếp | hồ sơ Coated; muốn viết lên thì couche mờ |
| Ivory | bìa tráng một mặt | 210-400: bìa, thiệp, chứng nhận | mặt tráng như couche |
| Fort, Ford (offset) | không tráng phủ | 70-100 ruột sách, workbook; 120-150 handout | hồ sơ Uncoated, màu tối và đục hơn, tránh chữ trắng mảnh, TAC ≤ 280-300% |
| Kraft | nâu chưa tẩy | túi, tag, chứng nhận phong cách mộc | không có trắng, màu sẫm lại, dùng mảng đậm |
| Mỹ thuật, nhũ | giấy đặc biệt | chứng nhận, thiệp mời | vân giấy làm gãy nét mảnh, chữ nhỏ |

## 6. Kiểm trước khi gửi nhà in

Tự động (in_an.py đã chạy): khổ và TrimBox, BleedBox; nhãn PDF/X và OutputIntent; phông nhúng; không còn RGB; chữ đen là K; tổng mực. Bằng mắt và trao đổi:

1. Ghi rõ kích thước thành phẩm (ngang x cao), số lượng, giấy, gia công (cán màng, bế, gấp, ép kim).
2. Tràn lề 3 mm (khổ nhỏ), 5 cm (hiflex), theo file khuôn (standee).
3. Không có gì quan trọng gần nếp gấp, khoen, 15 cm đáy roll-up, góc standee chữ X.
4. Đúng hồ sơ màu nhà in dùng; muốn chắc màu thương hiệu thì xin in thử, ký duyệt bản in mẫu.
5. Ảnh đủ ppi ở kích thước thật; không phóng ảnh nhỏ.
6. Nhà in xin file AI, CDR có chữ đã chuyển nét: gửi PDF/X-4 trước (đã nhúng phông); họ vẫn cần thì nói rõ cần chuyển nét ở bước của họ.
7. Một file cho một sản phẩm, trang đơn (không ghép trang đôi) trừ khi được yêu cầu.

Nhà in có bộ kiểm chuyên dụng (Acrobat Preflight, callas pdfToolbox) là bước xác nhận cuối; mã nguồn mở hiện chưa có công cụ kiểm PDF/X được chứng nhận.
