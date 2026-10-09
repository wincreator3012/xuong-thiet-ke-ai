# Trình chiếu: slide PPTX sửa được, cùng hệ hình với ấn phẩm

Lõi dựng bài trình chiếu của xưởng. Một file `.json` mô tả bài trình chiếu (nguồn sự thật), `tools/slide.py` dựng ra PPTX mở được trên Google Slides, PowerPoint, Keynote, kèm máy kiểm, ảnh xem trước từng slide, tờ tổng thể và PDF chiếu dự phòng. Cách làm (brief, dàn ý, dựng, nghiệm thu): skill `skills/thiet-ke-slide/SKILL.md`. Chuẩn nghề: `chuan/09-trinh-chieu.md`.

Vì sao là PPTX gốc chứ không phải ảnh: người dùng mở bài trên Google Slides, sửa một chữ, đổi một nhãn sơ đồ ngay trước giờ giảng mà không cần Claude. Mọi chữ, kể cả nhãn sơ đồ, là chữ sống; sơ đồ dựng bằng hình khối gốc. Hình đặc thù cần đẹp hơn khả năng của hình khối (ẩn dụ vẽ SVG, khung có hoạ tiết) thì dựng bằng lõi HTML (`tools/ve.py`) rồi chèn thành ảnh: đổi lại là không sửa được nhãn trên Google Slides.

## Một nguồn với lõi ấn phẩm

| Thứ | Lấy từ |
|---|---|
| Màu theo vai, phông tiêu đề và nội dung, hoạ tiết | `brand/brand.json` > `chuDe` (chủ đề sáng cho slide nội dung; chủ đề tối cùng thương hiệu cho bìa, chuyển phần, kết) |
| Logo theo độ sáng nền | `brand/brand.json` > `thuongHieu.<id>.logo` |
| Sơ đồ tri thức | cùng dữ liệu và cùng nghĩa với `minh-hoa/so-do.js`; vẽ lại bằng hình khối gốc ở `so-do-pptx.js` |
| Biểu tượng nét | `he-thong/bieu-tuong.css` (chuyển thành PNG theo màu nhấn) |
| Luật chữ | `tools/ve.py` (luật chung), `phong-cach/tu-ngu.json` (luật riêng) |
| Phông đo chữ | `fonts/` (đo bằng chính tệp phông nên biết trước chữ có vừa hộp không) |

## Tệp

| Tệp | Việc |
|---|---|
| `dung.js` | nhận gói do `tools/slide.py` chuẩn bị, dựng PPTX, ghi báo cáo theo trang |
| `bo-cuc.js` | các kiểu slide (bảng dưới) |
| `so-do-pptx.js` | 15 loại sơ đồ bằng hình khối gốc |
| `ve.js` | lớp vẽ một trang: hộp chữ có đo và báo tràn, hình, đường, đường tự do, ảnh, biểu tượng |
| `chu.js` | đo chữ bằng tệp phông, ngắt dòng tiếng Việt, co chữ cho vừa, đếm số tiếng |
| `mau.js` | màu CSS của brand.json sang màu PPTX (trộn alpha, chọn màu nhấn đọc được như chữ) |
| `mau/*.json` | deck mẫu để kiểm lõi (`python3 tools/slide.py --kiem`), nội dung giả định |

Thư viện Node (pptxgenjs 4, fontkit 2, sharp) có sẵn ở sandbox đám mây; thiếu thì `tools/slide.py` tự cài vào `Du an/_tam/node/`, không bao giờ vào repo.

## File bài trình chiếu

Đặt ở `Du an/<dự án>/slide/<tên>.json` (`python3 tools/du-an-moi.py "<dự án>" --slide <tên>` tạo khung). Đường dẫn ảnh tính từ thư mục dự án (`anh/...`), `kho:<đường dẫn>` lấy từ repo.

```json
{
  "loai": "trinh-chieu",
  "ngonNgu": "vi",
  "tieuDe": "tên bài, ghi vào thuộc tính tệp",
  "thuongHieu": "id trong brand.json (bỏ trống: thương hiệu mặc định)",
  "chuDe": "chủ đề cho slide nội dung (bỏ trống: chủ đề mặc định của thương hiệu)",
  "chuDeToi": "chủ đề cho bìa, chuyển phần, kết (bỏ trống: chủ đề tối đầu tiên trong chuDeHop của thương hiệu)",
  "mauRieng": {}, "phongRieng": {},
  "logo": true,
  "chanTrang": { "chu": "dòng chân trang", "so": true },
  "slide": [ { "kieu": "...", "ghiChu": "lời giảng cho người nói" } ]
}
```

Trường chung của mọi slide: `kieu`, `kicker` (nhãn nhỏ trên tiêu đề), `tieuDe` (nói thông điệp, không phải tên mục), `ghiChu` (ghi chú người nói, chuỗi hoặc mảng), `nguon` (dòng nguồn cuối slide), `nen` (`toi` hoặc `sang` để đổi nền một slide), `an` (bỏ qua slide), `chuOnly` (chủ ý chỉ có chữ, tắt cảnh báo thiếu hình). Cú pháp chữ như lõi HTML: `*nghiêng nhấn*`, `**đậm**`, `==tô màu nhấn==`, `~` giữ cụm từ, `\n` xuống dòng.

### Kiểu slide

| `kieu` | Dùng khi | Trường riêng |
|---|---|---|
| `bia` | mở bài | `kicker`, `tieuDe`, `phuDe`, `nguoi` (mảng: tên, chức danh), `ngay`, `anh` (người tách nền, đặt bên phải) |
| `muc-luc` | bài trên 10 slide, nhiều phần | `muc` (mảng), `mucNhan` (phần đang tới) |
| `chuyen-phan` | sang phần mới | `so`, `tieuDe`, `phuDe` |
| `y-chinh` | một ý và vài dòng chứng minh | `than` (chuỗi hoặc mảng gạch đầu dòng), `dauDong`, `hinh` (`{soDo}`, `{bieuTuong, nhan}`, `{so, nhan}`, `{anh}`, `{anPham}`) |
| `so-do` | framework, quy trình, quan hệ | `soDo` (bảng dưới), `chuThich`, `trinhTu`, `tieuDeTungMuc`, `ghiChuTungMuc` |
| `hai-cot` | hai mặt ngang hàng có chữ dài | `trai`, `phai`: `{nhan, muc hoặc than, bieuTuong}` |
| `so-lon` | một đến ba con số có nguồn | `so`: `[{gt, nhan, phu}]` |
| `trich-dan` | một câu đáng dừng lại | `loi`, `tacGia` (kèm năm, trang) |
| `cau-hoi` | câu hỏi chiêm nghiệm, khoảng lặng | `cauHoi`, `goiY`, `nhan`, `bieuTuong` |
| `thuc-hanh` | hướng dẫn bài tập tại lớp | `buoc` (mảng chuỗi hoặc `{nhan, phu}`), `thoiGian`, `hinhThuc` |
| `anh` | ảnh thật của lớp, sự kiện | `anh` (`{src, tieuDiem}`), `benAnh` (`trai`, `phai`), `than`, `altText`, `chuThichAnh` |
| `hinh` | hình đặc thù dựng sẵn | `anh` hoặc `anPham` (file `thiet-ke/*.json` của lõi HTML, dựng ra PNG đúng tỉ lệ ô), `chuThich` |
| `bieu-do` | số liệu có nguồn | `bieuDo`: `{loai: cot, ngang, duong, tron; nhan; chuoi: [{ten, gt}]; dinhDang; hienTruc}` |
| `ket` | khép bài | `tieuDe`, `cauHoi` (câu hỏi mở thật), `lienHe` |

### Loại sơ đồ (`soDo.loai`)

Chọn theo logic của khái niệm (`chuan/06` mục 2). Mọi loại nhận `mucNhan` (mục được báo hiệu, từ 0).

| Loại | Dữ liệu |
|---|---|
| `chuoi` | `buoc: [{nhan, phu}]`, `huong: ngang, doc, tu-dong` |
| `hanh-trinh` | `tram: [{nhan, phu}]` |
| `vong-lap` | `buoc: [{nhan, phu}]`, `tam` |
| `tang` | `tang: [{nhan, phu}]` (trên xuống), `kieu: thap` (đánh số từ đáy) hoặc `chong` |
| `trung-tam` | `tam: {nhan, phu}`, `nhanh: [{nhan, phu}]` (xếp hai cột theo chiều kim đồng hồ) |
| `ma-tran` | `trucNgang: [trái, phải]`, `trucDoc: [dưới, trên]`, `o: [trên trái, trên phải, dưới trái, dưới phải]` |
| `the-luoi` | `the: [{bieuTuong hoặc so, nhan, phu}]`, `cot` |
| `so-sanh` | `trai`, `phai`: `{nhan, muc: []}`, `muiTen` (false khi hai bên ngang hàng, không phải trước và sau) |
| `radar` | `truc: [{nhan, phu, gt 0-1}]`, `luoi` |
| `venn` | `tap: [{nhan, phu}]` (2-3), `giao: {nhan, phu}` |
| `dong-tam` | `lop: [{nhan, phu}]` (trong ra ngoài) |
| `tang-bang` | `noi: {nhan, muc}`, `chim: {nhan, muc}` |
| `pho` | `trai`, `phai` (hai cực), `doan: [{nhan, phu}]`, `diem: {vi 0-1, nhan}` |
| `xoan-oc` | `buoc: [{nhan, phu}]` (lặp lại, mỗi vòng sâu hơn) |
| `isotype` | `hang: [{nhan, gt, gtChu, bieuTuong}]`, `bieuTuong` (mặc định `nguoi`), `donVi` (bắt buộc ghi: một hình bằng bao nhiêu) |

`"trinhTu": true` trên slide sơ đồ: dựng slide tổng quan rồi tự sinh mỗi mục một slide có mục đó được báo hiệu (giảng từng chặng mà người xem vẫn thấy toàn cảnh); `"trinhTu": "chi-tung-muc"` bỏ slide tổng quan.

## Bài có sẵn (làm ngoài xưởng)

`python3 tools/slide.py "<tệp>.pptx"`: không dựng gì, chỉ kiểm tương thích Google Slides (giãn chữ, định dạng đoạn hỏng, phông ngoài hệ), dựng ảnh xem trước, tờ tổng thể và chép chữ cùng ghi chú người nói từng slide ra `<tên>-chu.md` (mặc định vào `Du an/_tam/xem-pptx/<tên>/`). Dùng để soát một bài cũ, hoặc làm bước đầu khi chuyển bài cũ sang file `.json` của xưởng: dàn ý viết lại từ `<tên>-chu.md`, giữ nguyên văn.

## Thêm một kiểu slide, một loại sơ đồ

Viết hàm trong `bo-cuc.js` hoặc `so-do-pptx.js` theo mẫu sẵn có (đo trước bằng `t.do`, vẽ chữ bằng `t.chu` để máy kiểm tràn, màu bằng tên vai), đăng ký vào `KIEU` hoặc `LOAI`, thêm một slide dùng nó vào `mau/mau.json`, chạy `python3 tools/slide.py --kiem` tới ĐẠT, NHÌN tờ tổng thể, cập nhật hai bảng trên và `chuan/09`. Loại sơ đồ mới nên có bản tương ứng trong `minh-hoa/so-do.js` để poster và slide nói cùng một hình.
