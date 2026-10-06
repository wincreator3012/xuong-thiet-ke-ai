# Nghiệm thu: máy kiểm gì, người kiểm gì, theo thứ tự nào

Một ấn phẩm chỉ được báo "xong" khi qua cả hai lớp. Lớp máy chạy tự động trong `tools/ve.py` (mọi lần dựng) và `tools/in_an.py` (bản in); lớp người là Claude nhìn ảnh đã dựng rồi người dùng duyệt. Máy chứng minh file đúng kỹ thuật, không chứng minh thiết kế đúng ý: luôn nhìn ảnh thật ở cỡ thật trước khi trình người dùng.

## 1. Lớp máy (tự động)

| Mã cảnh báo | Nghĩa | Xử lý |
|---|---|---|
| `tran-vung` | nội dung tràn vùng chữ dù đã co 28% | LỖI: bớt chữ cho thể thức đó (`theoNhom`, `theoTheThuc`) hoặc đổi bố cục |
| `tran-chu` | một ô chữ vượt số dòng cho phép ở cỡ tối thiểu | LỖI: rút gọn chữ |
| `loi-js`, `so-do` | khuôn hoặc sơ đồ lỗi | LỖI: sửa khuôn, dữ liệu sơ đồ |
| `co-toan-bo` | lõi đã co mọi chữ để vừa | xem: dưới 85% nên bớt chữ |
| `co-chu-nhieu` | một ô đã co tới mức tối thiểu | xem |
| `lan-vung-an-toan` | phần tử ra ngoài vùng an toàn của nền tảng, gia công | sửa, trừ phần tử chủ ý tràn mép (đánh dấu `tran-mep`) |
| `de-vung-trong` | đè vùng phải để trống (ảnh đại diện, nhãn thời lượng, khoen standee) | sửa |
| `chu-nho` | chữ dưới ngưỡng đọc (số: 2,2% cạnh ngắn; in khổ nhỏ: 7 pt) | tăng cỡ hoặc bớt chữ |
| `tuong-phan` | tương phản đo trên ảnh dưới 4,5:1 (thường) hay 3:1 (lớn) | đổi màu chữ, thêm màn, dời chữ |
| `gach-dai`, `tu-ngu`, `title-case` | vi phạm quy ước viết của người dùng | sửa chữ |

`tools/kiem-khuon.py` dựng lại mọi khuôn từ nội dung mẫu: chạy sau mỗi lần sửa `he-thong/`, `minh-hoa/`, một khuôn; phải ra "KIỂM KHUÔN: ĐẠT".

## 2. Lớp người (Claude nhìn trước, rồi người dùng duyệt)

Chạy theo thứ tự, ghi đạt hay không kèm mã quy tắc (chuan/01, 05, 06):

1. **Mục đích**: một câu: cho ai, họ cần cảm, biết, làm gì? Tiêu điểm có phục vụ điều đó? (R1.1)
2. **Thử 5 giây**: sau 5 giây người xem nói được cái gì, khi nào ở đâu, làm gì tiếp? (R1.2, R7.1)
3. **Thử nheo mắt**: thu ảnh còn 5-10% (tờ tổng thể của ve.py là đúng cỡ để thử): thứ bậc chính, phụ, nút còn rõ? Có quá ba mảng tranh nhau? (R1.2, R1.9)
4. **Lưới và căn**: mọi thứ có trục; lề, khoảng cách nhất quán; bật lớp vùng an toàn trên Bàn thiết kế. (R2.1-R2.8)
5. **Chữ**: phông có tiếng Việt, dấu không chạm, giãn dòng đủ, không mồ côi, cụm từ không bị tách, sentence case, không gạch dài, **đọc soát từng âm tiết** (sai dấu là sai nghĩa), tên, chức danh đúng nguyên văn `phong-cach/PHONG-CACH.md` mục 1. (R3.x)
6. **Tương phản**: mọi cặp chữ nền, cả chữ đè ảnh. (R4.3, R5.5)
7. **Ảnh**: thật, có đồng ý, cùng tông, chỉnh có đạo đức, không AI thay người thật, ánh nhìn hỗ trợ đường đọc, không chữ đè mặt. (R5.x)
8. **Tri thức**: kiểu sơ đồ khớp logic khái niệm, nhãn trên hình, có báo hiệu, không chi tiết lạc đề, không số bịa, ghi tác giả framework. (R6.x)
9. **Đạo đức quảng bá**: bằng chứng xã hội thật, khan hiếm thật nói định tính, không khung đua tranh, không upsell, có kế hoạch văn bản thay thế. (R7.x)
10. **Phương tiện**: số: xem cỡ điện thoại, cắt lưới IG, dạng thu nhỏ Zalo, sRGB. In: CMYK, xem trước, tràn lề, ppi, đen giàu, vàng kim, PDF/X. Sân khấu: xem ở tỉ lệ với người và bục, đọc từ hàng cuối. (chuan/02-04)
11. **Loạt**: đặt cạnh 3 ấn phẩm gần nhất của cùng chiến dịch: còn là một hệ? (R1.8, R5.6)

## 3. Trình duyệt cho người dùng

- Gửi **tờ tổng thể** (`<tên>-tong-the.jpg`, mọi thể thức cạnh nhau) thay vì từng ảnh lẻ.
- Kèm 3-6 dòng: đã quyết định gì và vì sao (theo người xem), cảnh báo máy còn lại và lý do chấp nhận, điều cần người dùng chốt (chức danh, câu chữ, chọn ảnh).
- Góp ý của người dùng ghi vào `SO-GOP-Y.md` của dự án; góp ý lặp lần hai cùng một kiểu là tín hiệu sửa NGUỒN MẶC ĐỊNH (khuôn, brand.json, chuan) và ghi vào sổ tay góp ý ở `phong-cach/PHONG-CACH.md`.
