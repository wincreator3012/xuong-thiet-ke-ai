# Chuẩn sân khấu và sự kiện: phông, màn LED, standee, photo wall, thẻ đeo

Bản chưng cất từ `nghien-cuu/B-print-stage.md` mục 3.3, 4, 5, 6 (2026-10-06). Phần lớn quy tắc bố cục ở đây là tổng hợp thực hành [P], không phải tiêu chuẩn: đo thật sân khấu và hỏi đơn vị thi công trước khi chốt.

## 1. Phông sân khấu (backdrop)

- **Kích thước thường gặp**: hội thảo 4x2,5 m, 5x3 m, **6x3 m**; sân khấu lớn 4x6, 5x8 m. Nguồn Việt Nam lẫn lộn "rộng x cao" với "cao x rộng": luôn viết **ngang x cao**.
- **Thiết kế ở tỉ lệ**: PDF chuẩn tối đa 5,08 m mỗi cạnh, nên phông lớn thiết kế ở 1:10 (kho: `backdrop-6x3`, `backdrop-4x25`). 1:10 ở 300 dpi bằng 30 ppi khổ thật: đủ cho người xem từ 3 m trở ra, chữ và hình vẽ của hệ thống vẫn là vector. Đặt tên file kèm tỉ lệ: `Backdrop_6000x3000mm_TL1-10_CMYK.pdf`.
- **Vùng người đứng**: phía dưới khoảng **1,7 m** tính từ sàn sân khấu bị người và bục phát biểu (cao 1,1-1,2 m) che. Với phông cao 3 m là 55-60% dưới. Vùng này chỉ để nền, hoạ tiết (kho thể thức đã đặt `an.duoi = 1700 mm`, Bàn thiết kế tô đỏ vùng này).
- **Tên sự kiện, logo, ngày ở 40% phía trên**, canh giữa hoặc lệch khỏi phía có bục; lặp logo trên chính bục phát biểu.
- **Có màn LED ở giữa** thì phông in chỉ còn hai cánh và dải đầu: đặt dải tiêu đề phía trên LED.
- **Ảnh chụp sự kiện** thường cắt 3:2, 16:9 quanh đầu người: dải được chụp nhiều nhất là 1,5-2,5 m trên sàn sân khấu.
- **Mép trên 10-20 cm** có thể bị khung, đèn, giàn che: chừa trống.
- **Vật liệu**: bạt hiflex mờ, đế xám chống xuyên sáng; bạt bóng loá đèn flash. Khổ bạt tối đa 3,2 m, lớn hơn phải ghép: không đặt mặt người, logo, chữ trên đường ghép. Canvas, vải đẹp nhất cho ảnh.
- **Màu**: máy in bạt (dung môi, dung môi nhẹ) có gam màu khác offset, cam, lục, lam rực bị xỉn và cả phông tối hơn; màu thương hiệu quan trọng thì xin in thử một dải.

## 2. Chữ đọc được từ xa

Quy tắc khoảng cách: **chiều cao chữ hoa (cm) ≈ khoảng cách (m) / 3** là giới hạn đọc được; đọc thoải mái cần **khoảng cách / 1,5-2**. Chiều cao chữ hoa ≈ 0,7 cỡ chữ: 1 cm chữ hoa ≈ 40 pt.

| Ấn phẩm | Khoảng cách | Chữ hoa tối thiểu | Nên dùng |
|---|---|---|---|
| Tiêu đề standee cuốn | 3 m | 1 cm | tiêu đề 6-10 cm, chữ 2-3 cm |
| Poster A1 | 2 m | 0,7 cm | thân 1-1,5 cm |
| Chữ phụ trên phông (ngày, nơi) | 15 m (hàng cuối) | 5 cm | 8-10 cm |
| Tiêu đề phông | 15-25 m | 5-8 cm | 20-40 cm |
| Băng rôn treo | 20 m | 7 cm | 12-15 cm |

Trong khuôn `backdrop-su-kien`, đơn vị cqmin tính theo cạnh ngắn (chiều cao phông): với phông cao 3 m, 1 cqmin = 3 cm khổ thật. Tiêu đề dòng hai 8,6 cqmin là cỡ chữ khoảng 26 cm, tức chữ hoa khoảng 18 cm (đọc thoải mái từ khoảng 30 m); dòng thông tin 2,6 cqmin là cỡ khoảng 8 cm, chữ hoa khoảng 5,5 cm (đọc được tới khoảng 15 m). Lõi co chữ khi chật thì các con số này nhỏ đi tương ứng: đọc báo cáo `co` của ve.py.

## 3. Màn LED sân khấu

- **Số điểm ảnh = kích thước thật / bước điểm ảnh [pixel pitch]**, làm tròn theo số tủ.

| Bước | Tủ, module | Điểm ảnh mỗi đơn vị |
|---|---|---|
| P3.91 (thuê sự kiện phổ biến nhất) | tủ 500x500 mm | 128x128 |
| P2.6 / P2.97 | tủ 500x500 | 192x192 / 168x168 |
| P4.81 | tủ 500x500 | 104x104 |
| P3 cố định (hội trường, nhà hàng) | module 192x192 mm | 64x64 |
| P2.5 cố định | module 320x160 mm | 128x64 |

Ví dụ: tường 6x3 m bằng P3.91 = 12x6 tủ = **1536x768** (2:1, không phải 16:9); 5x3 m = 1280x768; 4x2,5 m = 1024x640.

- **Màn LED hiếm khi là 16:9**: luôn xin đơn vị thuê màn **bản đồ điểm ảnh** (vd 1536x768) và thiết kế đúng cỡ đó bằng thể thức tự do `tu-do:1536x768`. Gửi 1920x1080 thì bộ xử lý sẽ co méo hoặc chừa viền đen.
- **File**: ảnh tĩnh PNG đúng bản đồ điểm ảnh; video MP4 H.264 (H.265 cho 4K), 25 hoặc 30 hình mỗi giây cố định, 8-15 Mbps cho 1080p; luôn RGB, không bao giờ CMYK.
- **Nội dung**: lề an toàn 5-7% mỗi cạnh; thông tin chính ở **2/3 phía trên** (mép dưới thường cao 0,6-1 m, bị người nói và đầu khán giả từ hàng 5 che); tương phản cao (trắng trên xanh thẫm tốt, trắng trên vàng kém); hình khối rõ, tránh chi tiết li ti và hoa văn hình học mảnh (gây vân moiré khi quay phim); nền tối là đèn tắt: sâu, đỡ chói người nói và máy quay, tránh mảng trắng lớn. Chữ trên P3.91 tối thiểu khoảng 24-32 px chiều cao chữ hoa, nét tối thiểu 2-3 px, không chân mảnh ở cỡ nhỏ.
- **Máy chiếu**: 1920x1080 (16:9); nhiều phòng khách sạn dùng WUXGA 1920x1200 (16:10): hỏi địa điểm.

## 4. Standee, photo wall, thẻ đeo

- **Standee chữ X** 60x160, 80x180 cm: bốn góc bấm khoen để trống (kho đã khai `vungTrong`); 150 ppi khổ thật.
- **Standee cuốn** 80x200 cm (và 85, 100, 120 x 200): đáy 7-10 cm cuộn vào hộp, không đặt nội dung quan trọng ở 15 cm cuối; mép trên 1 cm vào thanh kẹp. Có nhà in tính phần giấu nằm trong 200 cm, có nơi cộng thêm: luôn xin file khuôn.
- **Photo wall, check-in**: 2,5x2,3 m phổ biến (3x2,5 m); người được chụp từ 1,5-2 m nên cần nét hơn phông: 1:5 ở 300 dpi (60 ppi khổ thật), logo và chữ vector. Logo lặp rộng 20-30 cm, khoảng cách bằng nửa logo, **so le nửa ô mỗi hàng**, nội dung cách mép thành phẩm từ 7,5 cm; vật liệu mờ. Khuôn `photo-wall` tự lặp logo theo kích thước thật.
- **Thẻ đeo** 9x13 cm (9x12, 7x11, 10x14); vỏ bán theo cỡ 9,5x13,5 hay 9x14: đo vỏ thật, ruột nhỏ hơn 2-5 mm; tên người đọc được từ 2 m (chữ hoa từ khoảng 0,7 cm). In hàng loạt từ danh sách: mỗi người một file ấn phẩm sinh từ danh sách (việc của skill in ấn, sự kiện).
- **Bảng tên để bàn**: hội nghị 6x15, 6x18 cm; mica chữ A 8x24, 10x30 cm.

## 5. Kiểm riêng cho sân khấu, sự kiện

1. Xem trước ở tỉ lệ với một bóng người cao 1,7 m và bục phát biểu đặt lên (Bàn thiết kế tô vùng người đứng).
2. Đọc thử dòng chữ nhỏ nhất ở cỡ tương ứng khoảng cách hàng ghế cuối (bảng mục 2).
3. Màn LED: đúng bản đồ điểm ảnh, RGB, thông tin chính ở 2/3 trên.
4. Đồng bộ một bộ nhận diện sự kiện (phông, LED, standee, thẻ đeo, bài đăng) từ cùng một file nội dung: khác thể thức, cùng thông tin, cùng họ màu.
