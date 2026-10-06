# Phông chữ

Tự lưu trữ để mọi máy (sandbox đám mây, Mac, Bàn thiết kế) dựng ra cùng một kết quả, không phụ thuộc phông cài trên máy. Nguồn: Fontsource (gói npm `@fontsource/*` 5.x), giấy phép SIL Open Font License 1.1 (tệp `OFL.txt` trong từng thư mục): được dùng, nhúng vào PDF, SVG, đóng gói kèm repo; không bán riêng tệp phông.

| Họ | Độ đậm có sẵn | Vai |
|---|---|---|
| Playfair Display | 400-800, nghiêng 400-700 | tiêu đề sang trọng, câu nhấn nghiêng (họ đêm-vàng) |
| Lora | 400-700, nghiêng 400-600 | tiêu đề chiêm nghiệm (giấy-mực, than-đồng), thân chữ handout dài |
| Be Vietnam Pro | 300-800, nghiêng 400-600 | nội dung, nhãn, số liệu, giao diện |
| JetBrains Mono | 400, 600 | mã, số kỹ thuật |

Mỗi độ đậm có ba tệp con (latin, latin-ext, vietnamese) nạp theo `unicode-range`: bắt buộc đủ cả ba vì chữ cái gốc nằm ở latin còn dấu nằm ở vietnamese. Chỉ dùng phông TĨNH: phông biến thiên thành Type 3 trong PDF (không sửa được, preflight báo lỗi). `fonts.css` khai `font-display: block` để ảnh không bao giờ chụp bằng phông dự phòng.

Thêm họ phông: kiểm có tiếng Việt (chuan/01 mục 3), chạy phép thử dấu, `npm i @fontsource/<họ>` trong sandbox, chép các tệp `*-{latin,latin-ext,vietnamese}-<độ đậm>-<kiểu>.woff2` và khối `@font-face` tương ứng vào đây (đổi `font-display` thành `block`), thêm dòng vào bảng trên.

Cần phông để mở file ở máy khác (PowerPoint, Illustrator): tải bản TTF đầy đủ của cùng họ từ Google Fonts và cài vào máy; không dùng các tệp woff2 tách nhỏ ở đây cho việc đó.
