# Chuẩn trình chiếu: slide cho lớp học, hội thảo, toạ đàm, Zoom

Bản chưng cất cho bài trình chiếu, đi cùng lõi `trinh-chieu/` và skill `thiet-ke-slide`. Nguồn: `nghien-cuu/A-digital-specs.md` (slide chia sẻ Zoom), `nghien-cuu/B-print-stage.md` (máy chiếu), `nghien-cuu/C-principles.md` (thang cỡ chữ R2.4, minh hoạ R6), `chuan/06-minh-hoa-tri-thuc.md`, và kinh nghiệm dựng slide thật mở trên Google Slides, PowerPoint (2026).

## 1. Slide là phần hình của lời giảng

Người xem slide vừa nghe vừa nhìn. Ba điều suy ra từ đó:

- **Không chiếu lại lời mình nói.** Nguyên tắc dư thừa [redundancy principle] của Mayer: người học tiếp thu kém hơn khi chữ trên màn hình lặp nguyên văn lời giảng (Mayer, 2021, Multimedia learning, bản 3). Lời giảng nằm ở ghi chú người nói (`ghiChu`); trên slide chỉ còn thông điệp, từ khoá và hình.
- **Một slide một ý.** Hai ý thì hai slide. Tiêu đề nói thông điệp ("Học là một vòng, không phải một đường thẳng"), không nói tên mục ("Mô hình Kolb").
- **Báo hiệu và phân đoạn.** Framework nhiều chặng giảng từng chặng: slide tổng quan rồi mỗi chặng một slide có chặng đó được tô (`"trinhTu": true`), người xem luôn biết mình đang ở đâu trong toàn cảnh (chuan/06 R6.3; Noetel và cộng sự, 2022).

## 2. Khổ và nơi chiếu

| Nơi | Khổ | Lưu ý |
|---|---|---|
| Máy chiếu, màn hình hội trường | 16:9, 13,333 x 7,5 in (mặc định của lõi) | nhiều phòng khách sạn là 16:10 (1920x1200): hỏi địa điểm, khổ 16:9 vẫn chiếu được với hai dải đen |
| Zoom, Google Meet | 16:9 | người xem thường nhìn cửa sổ nhỏ hoặc điện thoại: chữ thân không dưới 18 pt; chừa góc phải trên nếu khung người nói nổi ở đó |
| Màn LED sân khấu | theo bản đồ điểm ảnh, hiếm khi 16:9 | không dùng PPTX: dựng ảnh bằng `tools/ve.py --tt tu-do:WxH` (chuan/04 mục 3) |
| Phát lại, gửi tài liệu sau buổi | PDF | `tools/slide.py` bản cuối có PDF chiếu dự phòng; tài liệu đọc riêng (handout) là ấn phẩm khác, dày hơn, có lưới đọc |

## 3. Cỡ chữ, mật độ

Thang cỡ chữ tỉ số khoảng 1,33 (R2.4). Cỡ ở đây là pt trên khổ 13,333 in; lõi tự co trong khoảng cho phép rồi báo khi không vừa.

| Thành phần | Mặc định | Tối thiểu | Ghi chú |
|---|---|---|---|
| Tiêu đề bìa | 46 | 32 | phông tiêu đề của chủ đề |
| Tiêu đề slide | 32 | 24 | căn trái, không gạch chân, không vạch nhấn dưới tiêu đề (dấu hiệu slide làm bằng AI) |
| Thân chữ | 22 | 16 (Zoom: 18) | căn trái; tối đa 6-7 dòng |
| Nhãn sơ đồ | 18-20 | 14 | |
| Mô tả trong sơ đồ | 14-16 | 12 | |
| Nhãn nhỏ (kicker), chân trang, nguồn | 10-13 | 10 | chỉ cho chữ phụ |

Ngưỡng đọc khi chiếu: 14 pt cho chữ mang nội dung (máy báo `chu-nho`).

Định mức số tiếng mỗi slide (máy báo `nhieu-chu` khi quá trần):

| Nhóm kiểu | Lý tưởng | Trần |
|---|---|---|
| ý chính, hai cột, ảnh, thực hành | 30 | 50 |
| sơ đồ (nhãn và mô tả) | 45 | 75 |
| bìa, số lớn | 25 | 45 |
| chuyển phần | 20 | 35 |
| trích dẫn, câu hỏi, kết | 30-35 | 50-55 |

## 4. Chọn kiểu slide theo việc người xem cần làm

| Người xem cần | Kiểu |
|---|---|
| biết mình đang ở đâu trong bài | `muc-luc`, `chuyen-phan` |
| hiểu một ý, có vài dòng chứng minh | `y-chinh` kèm một hình mang nghĩa (sơ đồ nhỏ, biểu tượng, số lớn) |
| thấy cấu trúc của một framework, quy trình | `so-do` (chọn loại theo chuan/06 mục 2), `trinhTu` khi giảng từng chặng |
| so hai cách, trước và sau | `so-do` loại `so-sanh` (`muiTen: false` khi hai bên ngang hàng); `hai-cot` khi mỗi bên có chữ dài |
| nhớ một con số | `so-lon` (một đến ba số, có nguồn) |
| thấy xu hướng, tỉ lệ | `bieu-do` (cột bắt đầu từ 0, có nguồn, số ghi trên cột thay cho trục) |
| dừng lại suy ngẫm | `trich-dan`, `cau-hoi` |
| làm bài tập tại lớp | `thuc-hanh` (các bước, thời gian, hình thức) |
| cảm được không khí thật | `anh` (ảnh thật, có đồng ý, chữ bên cạnh, không đè lên mặt) |

Nhịp của cả bài: bìa và chuyển phần nền tối, nội dung nền sáng (hoặc tối toàn bài cho sự kiện buổi tối, chủ đề đêm-vàng, đêm-xanh). Không để quá ba slide liền nhau cùng một kiểu; xen một câu hỏi chiêm nghiệm sau mỗi phần dài.

## 5. Hình trên slide

- **Mỗi slide nội dung có một yếu tố hình mang nghĩa** (máy báo `thieu-hinh`). Trang trí không mang nghĩa không được tính (R6.4).
- **Sơ đồ gốc trước, hình dựng sẵn sau.** Sơ đồ bằng hình khối gốc (`soDo`) sửa được trên Google Slides và giữ đúng tên, thứ tự, màu của framework như trên poster và video (R6.6). Hình đặc thù (ẩn dụ vẽ SVG, cây rễ, sơ đồ vị trí) dựng bằng lõi HTML qua trường `anPham` rồi chèn thành ảnh: đẹp, nhưng nhãn không sửa được trên Google Slides; dùng khi sơ đồ gốc không diễn đạt nổi. Hình đặc thù cho slide dựng KHÔNG kèm tiêu đề, logo (slide đã có).
- **Ghi tác giả** mọi framework, công cụ trên chính slide (`nguon`), kể cả framework của chính tác giả bài.
- **Không số liệu bịa.** Số trên slide có nguồn; số giả định để thử bố cục phải ghi "giả định" ngay trên slide.
- **Ảnh thật** theo chuan/05; không ảnh AI thay người, lớp học, sự kiện thật. Ảnh chân dung tách nền đặt ở bìa (`bia.anh`).
- **Biểu tượng** lấy từ `he-thong/bieu-tuong.css` (cùng nét với ấn phẩm). Thiếu biểu tượng thì vẽ thêm vào đó theo cùng lưới 24 và nét 1,6, không lấy bộ biểu tượng khác.

## 6. Máy kiểm

`tools/slide.py` ghi `<tên>-bao-cao.json` và in tóm tắt.

| Mã | Nghĩa | Xử lý |
|---|---|---|
| `tran-chu` | chữ không vừa hộp ở cỡ tối thiểu | LỖI: rút chữ, tách slide, chuyển lời giảng xuống `ghiChu` |
| `gian-chu` | tệp có thuộc tính giãn chữ | LỖI: Google Slides sẽ chồng chữ tiếng Việt (mục 7) |
| `xml` | đoạn văn có nhiều định dạng đoạn | LỖI: lõi tự sửa; còn báo là lõi hỏng |
| `so-do`, `loi-js`, `kieu`, `anh` | dữ liệu sơ đồ, kiểu slide, ảnh hỏng | LỖI: sửa file bài trình chiếu |
| `tu-ngu`, `gach-dai` | vi phạm quy ước viết | LỖI: sửa chữ |
| `chu-nho` | chữ nội dung dưới 14 pt | xem: bớt chữ để lõi không phải co |
| `nhieu-chu` | quá trần số tiếng | xem: tách slide, chuyển xuống ghi chú |
| `thieu-hinh` | slide chỉ có chữ | xem: thêm hình mang nghĩa hoặc đặt `chuOnly` khi chủ ý |
| `tuong-phan` | chữ trên nền tương phản thấp | xem |
| `mo-coi` | tiêu đề có dòng cuối một chữ | xem: ngắt theo nghĩa bằng `\n` hoặc nối `~` |
| `thieu-nguon` | biểu đồ không có nguồn | xem |
| `goi-y-chu`, `title-case` | dấu hiệu văn AI, viết hoa mọi chữ đầu | xem |
| `phong-la` | phông ngoài hệ của xưởng | xem |

Máy đo chữ bằng chính tệp phông, với biên an toàn khoảng 4%: PowerPoint, Google Slides và LibreOffice dàn chữ hơi khác nhau, nên Claude vẫn NHÌN ảnh xem trước và người dùng xem lướt trên Google Slides trước buổi giảng.

## 7. Google Slides, PowerPoint, Keynote

Lỗi đã gặp thật (09/10/2026): tệp mở trên Google Drive bị chồng chữ, mất khoảng trắng ở dòng chữ in hoa ("PHẦN 1 · AN TRỤ THÂN-TÂM" thành "PHẦN · ANTRỤTHÂN-TÂM"), vì thuộc tính giãn chữ (`charSpacing` của PptxGenJS, ghi thành `spc` trong XML). PowerPoint và LibreOffice hiển thị bình thường nên kiểm bằng ảnh không phát hiện được. Quy tắc:

1. Không giãn chữ ở bất kỳ đâu, không giả giãn chữ bằng dấu cách ("W I S E"). Nhãn nhỏ nổi bật bằng chữ in hoa, đậm, màu nhấn.
2. Khoảng cách dòng ghi bằng điểm cố định (`lineSpacing`), không dùng bội số: ba phần mềm dàn giống nhau và phép đo của máy đúng.
3. Ngôn ngữ chữ `vi-VN` (bài tiếng Anh: `en-US`) để kiểm chính tả và ngắt dòng đúng.
4. Phông: Lora, Playfair Display, Be Vietnam Pro đều có trong thư viện Google Fonts nên Google Slides hiển thị đúng. PowerPoint, Keynote trên máy chưa cài phông sẽ thay phông khác và dàn lại chữ: cài một lần từ `python3 tools/slide.py --xuat-phong <thư mục>` (TTF đủ dấu, giấy phép SIL OFL).
5. Không tự co chữ khi tràn (Google Slides bỏ qua): lõi đo trước và báo `tran-chu`.
6. PptxGenJS ghi nhiều định dạng đoạn cho một đoạn văn có chữ nhấn (sai lược đồ OOXML, mất gạch đầu dòng): `tools/slide.py` tự sửa sau khi dựng và kiểm lại (`xml`).
7. Sửa trên Google Slides rồi muốn Claude làm tiếp: tải bản đã sửa về dạng PPTX, Claude đọc và đưa thay đổi ngược vào file `.json` trước khi dựng lại (dựng lại từ `.json` sẽ ghi đè thay đổi chỉ có trên Google Slides).

## 8. Chữ trên slide

### Tiếng Việt

Theo `phong-cach/PHONG-CACH.md` mục 4 (chuẩn ngôn ngữ của người dùng): thuần Việt có thuật ngữ gốc trong ngoặc vuông ("trí tuệ cảm xúc [emotional intelligence]"); ngoặc tròn cho chú thích thông tin; sentence case hoặc FULL-CAP, không Title Case; không gạch dài; từ ngữ người dùng đã chốt; không cụm sáo văn AI; câu kết là một câu hỏi mở thật. Tên, chức danh nguyên văn theo PHONG-CACH mục 1.

**Trung thành tuyệt đối với nội dung gốc**: không tự cắt, thêm, diễn giải lại. Cần rút cho vừa slide thì đề xuất, người dùng đồng ý rồi mới đổi; phần rút ra chuyển xuống ghi chú người nói chứ không bỏ.

### Tiếng Anh

1. Tiếng Anh viết chuẩn, rõ, chính xác, giọng học thuật trau chuốt; không tiếng lóng, không từ đệm, không biệt ngữ thừa.
2. Sentence case cho tiêu đề ("The architecture of transformative learning"), hoặc FULL-CAP; không Title Case.
3. Không gạch dài; dùng gạch ngang thường hoặc dấu hai chấm.
4. Gọn nhưng đủ ngữ pháp: không viết kiểu điện tín trừ khi có chủ ý tu từ.
5. Thuật ngữ chuyên môn (tâm lý, giáo dục, triết học phương Đông, trí tuệ soma) dùng đúng từ tiếng Anh chuyên ngành; khái niệm gốc từ truyền thống khác ghi từ gốc trong ngoặc tròn ở lần đầu: "Dependent origination (pratītyasamutpāda)".
6. Bìa luôn có tên và đơn vị của tác giả.

## 9. Nghiệm thu lớp người

Sau khi máy không còn LỖI, Claude NHÌN tờ tổng thể rồi từng slide ở cỡ thật, theo thứ tự:

1. **Mạch**: đọc riêng các tiêu đề từ đầu đến cuối có thành một câu chuyện không.
2. **Thử 5 giây** mỗi slide: người ở hàng ghế cuối nói được ý chính không.
3. **Hình**: sơ đồ đúng logic khái niệm, chặng được tô đúng chỗ đang giảng, có tác giả, không số bịa.
4. **Chữ**: đọc soát từng âm tiết; tên, chức danh nguyên văn; không mồ côi ở tiêu đề.
5. **Nhịp**: sáng tối xen đúng chỗ, không lặp một kiểu quá ba slide, có khoảng lặng (câu hỏi, trích dẫn).
6. **Ghi chú người nói** có cho các slide cần lời giảng dài.
7. **Phương tiện**: Zoom thì chữ thân từ 18 pt; hội trường lớn thì thử nhìn tờ tổng thể ở cỡ nhỏ (như từ hàng cuối).

Trình người dùng: tờ tổng thể kèm 3-6 dòng (lựa chọn chính và lý do theo người xem, cảnh báo còn lại, điều cần người dùng chốt) và tệp PPTX nháp để người dùng mở thử trên Google Slides.
