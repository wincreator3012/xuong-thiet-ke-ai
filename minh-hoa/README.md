# Minh hoạ tri thức

- `so-do.js`: vẽ sơ đồ bằng code từ dữ liệu: `radar`, `chuoi`, `vong-lap`, `tang`, `trung-tam`, `hanh-trinh`, `ma-tran`, `the-luoi`, `so-sanh`, `anh` (SVG, PNG vẽ sẵn trong dự án). Tự lấy màu vai và phông của chủ đề, tự đo chữ để xuống dòng, tự co theo khung. Mẫu từng loại: `khuon/so-do-tri-thuc/mau-*.json`.
- `an-du.json`: từ điển ẩn dụ của người dùng, chỉ ghi mục ĐÃ ĐƯỢC NGƯỜI DÙNG DUYỆT (bắt đầu trống). Khái niệm nào đã có ở đây thì mọi ấn phẩm dùng cùng sơ đồ hình ảnh và ý ẩn dụ để nói cùng một ngôn ngữ hình.

Nguyên lý chọn sơ đồ, ẩn dụ, quy tắc framework có tên: `chuan/06-minh-hoa-tri-thuc.md`.

Slide dùng CÙNG dữ liệu sơ đồ nhưng vẽ bằng hình khối gốc của PPTX (sửa được trên Google Slides): `trinh-chieu/so-do-pptx.js`, có thêm sáu loại chưa có ở đây (`venn`, `dong-tam`, `tang-bang`, `pho`, `xoan-oc`, `isotype`). Đổi nghĩa hay dữ liệu của một loại ở một bên thì đổi bên kia, để poster và slide của cùng framework nói cùng một hình.

Thêm một loại sơ đồ: viết hàm trong `so-do.js` theo mẫu các hàm sẵn có (đơn vị `u` = 1% cạnh ngắn khung, chữ qua `khoiChu` để tự xuống dòng, màu bằng `var(--vai)`), đăng ký trong `LOAI`, thêm `khuon/so-do-tri-thuc/mau-<loai>.json`, chạy `python3 tools/kiem-khuon.py so-do-tri-thuc`, nhìn tờ tổng thể ở các nhóm thể thức, cập nhật bảng ở chuan/06 mục 2.
