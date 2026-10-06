# Chuẩn ảnh: chân dung, lớp học, sự kiện, bộ chi tiết đồng bộ

Bản chưng cất từ `nghien-cuu/C-principles.md` mục 5 và `nghien-cuu/D-toolchain.md` mục 5, 8; triết lý màu: **KHÁM - KÊ ĐƠN - SOI LẠI**, đa số ảnh không cần sửa, sửa thì nhỏ và tự nhiên, người dùng duyệt bằng một ảnh trước/sau.

## 1. Chọn ảnh

- **R5.1 Ảnh làm đúng một việc.** Thứ tự tiêu chí: (1) khoảnh khắc thật của thực hành (hiện diện, ấm áp, giao tiếp bằng mắt hoặc đắm mình thật); (2) nền sạch hoặc làm dịu được; (3) có sáng trên mặt; (4) có khoảng trống cho chữ ở phía người trong ảnh hướng tới; (5) kỹ thuật: mắt nét, không nhoè chuyển động.
- **R5.2 Dùng ánh nhìn như mũi tên (B).** Muốn người xem đọc tiêu đề, nút: chọn ảnh người nhìn VỀ PHÍA chữ và đặt chữ ở hướng đó (Sajjacholapunt và Ball, 2014: ánh nhìn nghiêng về chữ tăng chú ý và ghi nhớ thông điệp). Ảnh nhìn thẳng ống kính dành cho bài cần kết nối với chính người đó (giới thiệu giảng viên); khi ấy giữ thông điệp ngắn vì gương mặt sẽ chiếm sự chú ý.
- **R5.3 Không để người nhìn hay bước ra khỏi khung.** Mặt gần mép phải quay vào trong (tham số `lat` của ảnh lật ngang khi cần, chỉ khi không có chữ, logo trên áo, micro bị đảo nghĩa).
- **R5.4 Tách nền hay tràn khung.** Tràn khung cho không khí, cảm xúc (retreat, thiên nhiên, năng lượng phòng học). Tách nền cho thông báo người trình bày gọn gàng và loạt ấn phẩm đồng bộ (một chiến dịch nhiều người trình bày); cần mép tóc sạch, hướng sáng khớp nền. Không tách nền ảnh nhóm, ảnh khoảnh khắc (trông như hình dán). Không cắt ngang khớp (cổ tay, đầu gối, cổ): cắt giữa chi hoặc giữ trọn khớp.
- **R5.5 Chữ đè ảnh cần màn [scrim] (A cho tương phản, C cho kỹ thuật).** Mặc định: dải chuyển từ 0% tới 55-70% màu tối của thương hiệu chỉ phủ vùng chữ, không phủ mặt; hoặc một thẻ nền. Đo 4,5:1 với điểm sáng nhất sau chữ (ve.py tự đo). Không bao giờ đặt chữ ngang mặt người.
- **R5.6 Đồng bộ tông cả bộ (C).** Một chiến dịch một "look": cân trắng (chọn một hướng theo thương hiệu, ví dụ trung tính hơi ấm), cùng đường cong tương phản, cùng độ bão hoà, cùng điểm đen. `tools/anh.py dong-bo <ảnh mẫu> <các ảnh>` kéo cả bộ về gần ảnh mẫu (có trần).

## 2. Quy trình sửa (có trần an toàn)

Thứ tự chuẩn nghề (R5.7): cắt, thẳng; cân trắng từ vùng trung tính (áo trắng, tường xám); phơi sáng để da ở vùng trung-cao tự nhiên; đường cong tương phản, điểm đen trắng; bão hoà, độ tươi nhẹ (da không ngả cam, đỏ tía); sáng tối cục bộ trên mặt; giảm nhiễu rồi làm nét theo cỡ xuất; xuất sRGB cho số, CMYK chỉ ở bước in.

`tools/anh.py` làm đúng thứ tự đó, mỗi bước có trần (không vượt dù mắt muốn thêm):

| Bước | Cách làm | Trần |
|---|---|---|
| Cân trắng | gray-world trong không gian tuyến tính, chỉ trên vùng trung tính, giữ độ sáng | hệ số kênh 0,85-1,18 |
| Kéo mức | theo độ sáng giữa phân vị 0,3 và 99,7, giữ sắc độ | hệ số kéo ≤ 1,30 |
| Phơi sáng | gamma đưa trung vị về khoảng 0,47 | gamma 0,78-1,25 |
| Tương phản | chữ S nhẹ | pha 12% |
| Nâng mặt | phát hiện mặt (YuNet, OpenCV), mặt nạ elip mềm, chỉ nâng vùng trung và tối để tường sáng sau đầu không loé quầng | ≤ 1,16 |
| Độ tươi | tăng nhiều ở vùng nhạt, giảm 70% trên dải màu da | ≤ 16%, bão hoà ≤ 0,85 |
| Giảm nhiễu, làm nét | NLMeans nhẹ; unsharp mask bán kính theo cỡ ảnh | nét 0,4 x mức |

Mặc định `--muc 0.7`; ảnh tốt sẵn thì không sửa (kết luận "đạt" của `kham`). Bài học khi thử: gray-world có thể làm lạnh ảnh có một mảng màu lớn (áo cam, phông xanh): luôn nhìn ảnh so sánh, không tin số liệu đơn thuần; ánh đèn sân khấu tím, xanh là thật của bối cảnh, đừng "sửa" mất không khí.

**Tách nền**: rembg mô hình `u2net_human_seg` cho người (giấy phép Apache-2.0, chạy CPU khoảng 1 giây); `--toc` bật alpha matting cho tóc (chậm hơn). Không dùng `isnet-general-use` và `bria-rmbg` cho việc thương mại (giấy phép dữ liệu huấn luyện, CC BY-NC). BiRefNet cần trên 6 GB RAM: không chạy được trong sandbox. Ảnh tách xong luôn xem lại mép tóc, tay cầm micro, khe giữa tay và thân.

**Phóng to ảnh nhỏ**: Real-ESRGAN không chạy được trong sandbox đám mây (không có GPU); trên Mac Apple Silicon bản ncnn chạy nhanh. Trong sandbox: không phóng quá 2 lần, báo người dùng xin ảnh gốc lớn hơn.

**Ảnh iPhone**: HEIC và hồ sơ Display P3 đọc được (`pillow-heif`), luôn đổi sang sRGB một lần khi nhập (`tools/anh.py chuan-hoa`); bỏ qua bước này màu đỏ, cam sẽ xỉn sai.

## 3. Đạo đức chỉnh ảnh (bắt buộc)

- **R5.8 Được phép**: mụn, vết tạm thời, tóc rối lạc, vật thừa ở nền, ám màu, méo ống kính. **Không được**: đổi dáng mặt, thân, làm thon, làm da kiểu nhựa (giữ vân da, lỗ chân lông), đổi tuổi, màu da, dấu hiệu sắc tộc, thêm bớt người. Tiền lệ: luật Pháp (01/10/2017) bắt gắn nhãn "ảnh đã chỉnh sửa" khi đổi dáng người trong ảnh thương mại; Getty Images cấm ảnh làm thon, làm đầy cơ thể. Một thương hiệu dạy tự trắc ẩn và căn tính sẽ mất tin cậy với những gương mặt "hoàn hảo hoá".
- **R5.9 Không dùng ảnh AI thay người thật, lớp học thật, sự kiện thật.** Không tạo học viên giả, lớp học giả, gương mặt cho lời chứng thực, "ảnh sự kiện". Ảnh AI chỉ chấp nhận cho chất liệu minh hoạ rõ là minh hoạ (kết cấu, phong cảnh biểu tượng, hình ý niệm) và nên nhận ra được là minh hoạ. Trong nghi ngờ: dùng ảnh thật, thiết kế thuần chữ, hoặc hình vẽ bằng code (`minh-hoa/`).
- **R5.10 Đồng ý và phẩm giá.** Chỉ dùng ảnh học viên khi có đồng ý; tránh ảnh người đang đau khổ để quảng bá công việc tâm lý.

## 4. Bộ chi tiết đồng bộ trong ảnh

"Bộ chi tiết đồng bộ" là những lớp thiết kế đặt cùng ảnh để cả loạt ấn phẩm nhận ra nhau (R1.8): khung nẹp góc, vòng cung mảnh, vạch vàng mờ hai đầu, thẻ kính, nhãn khung viền, dải màn chuyển. Hệ thống đã có sẵn thành lớp trong `he-thong/khung.css` (`khung-vien`, `vong`, `vach-mo`, `the`, `nhan-vien`, `nen-man-*`, `lop-nui`, `lop-hat`) và tự đổi màu theo họ màu. Quy tắc: cùng một chiến dịch dùng cùng bộ chi tiết; chi tiết trang trí không được lấn vùng mặt và không thay cho nội dung.
