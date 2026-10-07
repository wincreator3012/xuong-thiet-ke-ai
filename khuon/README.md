# Kho khuôn

Mỗi khuôn là một thư mục: `khuon.html` (cấu trúc), `khuon.css` (bố cục theo nhóm tỉ lệ: vuong, doc-nhe, doc, ngang, bang), `mau*.json` (nội dung mẫu để kiểm). Khuôn không chứa nội dung, màu, kích thước: những thứ đó đến từ file ấn phẩm, `brand/brand.json` và `chuan/kho-the-thuc.json`. Ảnh mẫu trung tính (hình bán thân cách điệu) ở `_chung/`.

Thử một khuôn: `python3 tools/kiem-khuon.py <id>` (kết quả ở `Du an/_tam/kiem-khuon/`, ngoài repo); thử riêng một mẫu: `python3 tools/ve.py khuon/<id>/mau.json --nhap --ra "<thư mục Nhap>/_tam/thu"` (ve.py từ chối `--ra` trong repo). Phần phụ của khuôn (mô tả dài, chú thích, nhãn phụ) gắn `data-rut-gon` để tự ẩn ở story 9:16 (nhóm `doc`); khuôn mới cũng phải đánh dấu như vậy. Kiểm cả kho sau khi sửa: `python3 tools/kiem-khuon.py`.

## Danh mục

| Khuôn | Dùng cho | Nhóm đã dàn bố cục | Ô nội dung chính |
|---|---|---|---|
| `thong-cao` | thông cáo chương trình, khoá học, sự kiện có 1-3 người trình bày; cũng dùng cho standee, poster | vuong, doc-nhe, doc, ngang, bang | `tieuDe1`, `tieuDe2` (vàng kim), `phuDe`, `moTa`, `nguoi[]` {anh (tách nền), vai, ten, chucDanh}, `ngay`, `nhanNgay`, `diemNhan`, `diemNhanPhu`, `tinhNang[]` {nhan, moTa}, `cta` |
| `cau-hoi-chan-dung` | một câu hỏi soi chiếu lớn + chân dung; quảng cáo, bài mở chiến dịch | vuong, doc-nhe, doc, ngang, bang | `chuongTrinh1`, `chuongTrinh2`, `nhanDac`, `nhanPhu`, `ngoac` ("“"), `cauHoi`, `anhNen` (ảnh tràn) hoặc `anhTach` (tách nền), `vai`, `ten`, `chucDanh`, `cta`; `bienThe: "the"` cho thẻ tên có khung |
| `thu-ngo` | thư ngỏ, lời mời cá nhân, thư cảm ơn | vuong, doc-nhe, doc, ngang | `chuongTrinh1`, `chuongTrinh2`, `nhanDac`, `nhanPhu`, `anhTach`, `anhNen` (mờ), `kicker`, `loiChao`, `doan[]` {chu}, `chuKy`, `ten`, `chungChi`, `chucDanh`, `cta` |
| `gioi-thieu-chuyen-gia` | giới thiệu giảng viên, diễn giả, khách mời (1 người tràn khung hoặc 2 người chia cột) | doc, vuong, ngang | `nguoi[]` {anh (ảnh thật), kicker, vai, ten, chucDanh, loiHua, nhanh[] {chu}}, `chuongTrinh`, `ngay`, `cta` |
| `so-do-tri-thuc` | framework, mô hình, số liệu, so sánh: 10 loại sơ đồ vẽ bằng code | mọi nhóm | `kicker`, `tieuDe1`, `tieuDe2`, `dan`, `soDo` {loai, ...} (xem `minh-hoa/so-do.js`), `ketLuan`, `nguon` |
| `lich-thong-tin` | thông tin khai giảng, lịch buổi học | vuong, doc-nhe, doc | `tieuDe1`, `tieuDe2`, `lich` {thang, nam, ngayNhan[], ngayPhu[]}, `ngay`, `nhanNgay`, `thongTin[]` {bieuTuong, nhan, phu}, `cta` |
| `hoi-dap` | hỏi đáp, lợi ích, các bước, danh sách thẻ + người trả lời | vuong, doc-nhe, doc, ngang | `tieuDe1`, `tieuDe2`, `phuDe`, `ngay`, `thu`, `gio`, `nhanMuc`, `nhanMucPhu`, `muc[]` {dau, nhan, chu}, `nguoi[]` {anh, vai, ten, chucDanh} |
| `trich-dan` | thuần chữ: trích dẫn, chiêm nghiệm, ghi chú từ sàn tập | mọi nhóm | `kicker`, `ngoac`, `trich`, `tacGia`, `nguon`, `cauHoiMo` |
| `backdrop-su-kien` | phông sân khấu, màn LED, standee sự kiện | bang, ngang, doc | `logoPhu[]` {logo: "thuongHieu:khoa"}, `kicker`, `tieuDe1`, `tieuDe2`, `phuDe`, `thongTin`, `anhNen` |
| `chung-nhan` | giấy chứng nhận, giấy khen | ngang (A4) | `kicker`, `tieuDe`, `trao`, `nguoiNhan`, `noiDung`, `ngayNoi`, `nguoiKy[]` {chuKy (ảnh), ten, chucDanh}, `trien`, `soHieu`, `logoPhu[]` |
| `the-deo` | thẻ đeo sự kiện | doc-nhe | `suKien`, `ten`, `donVi`, `vai` |
| `photo-wall` | photo wall, step-and-repeat | vuong, ngang | `logoLap[]` ("thuongHieu:khoa"), `kicker`, `tieuDe`, `hashtag` |

## Viết một khuôn mới

1. Chép khuôn gần nhất, đổi tên lớp gốc `.khuon-<id>`.
2. Mọi cỡ, khoảng cách bằng `cqmin` và nhân `var(--co)` cho chữ; mọi màu bằng biến vai (`--nen`, `--the`, `--chu`, `--chuPhu`, `--nhan`, `--nhanSang`, `--kimLoai`...). Không viết mã màu cứng trong khuôn (trừ vật thể có màu riêng như tờ lịch giấy).
3. Dàn bố cục cho từng nhóm bằng `.khuon-<id>[data-nhom="..."]`. Vùng chữ đặt trong `.vung` (lõi tự chừa vùng an toàn của thể thức); phần tử cố ý tràn mép gắn lớp `tran-mep`, hoạ tiết gắn `trang-tri`.
4. Ô nội dung: `data-o`, `data-o-nen`, `data-o-bt`, `data-o-lich`, `data-o-so-do`, lặp `data-lap`, logo `data-logo`; phần tử không mang nội dung nhưng cần kéo được trên Bàn thiết kế: `data-id`. Chữ có nguy cơ dài: `data-vua="N"`.
5. Viết `mau.json` khai các thể thức đại diện cho mọi nhóm đã dàn, chạy `tools/kiem-khuon.py <id>`, nhìn tờ tổng thể, sửa tới khi ĐẠT và đẹp; thêm một dòng vào bảng trên.
