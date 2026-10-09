# Chuẩn minh hoạ tri thức: sơ đồ, ẩn dụ, framework có tên

Bản chưng cất từ `nghien-cuu/C-principles.md` mục 6 và nguyên lý hình tượng hoá tri thức trong video giải thích. Một khái niệm nên giữ cùng một ẩn dụ hình ảnh trên mọi phương tiện (ảnh, slide, video) để thương hiệu tri thức của người dùng nhất quán.

## 1. Vì sao hình phải đi cùng chữ

- **Mã hoá kép** (Paivio; Clark và Paivio, 1991): chữ và hình được ghi nhớ ở hai kênh, củng cố nhau khi cùng nói một ý.
- **Nguyên tắc đa phương tiện của Mayer** áp vào hình tĩnh: đa phương tiện (chữ + hình hơn chữ đơn), mạch lạc (bỏ thứ thừa), báo hiệu (nhấn cấu trúc then chốt), liền kề không gian (chữ đặt sát phần hình nó nói), phân đoạn. Tổng quan tổng quan của Noetel và cộng sự (2022, 29 tổng quan, 1.189 nghiên cứu): báo hiệu và liền kề có hiệu ứng lớn nhất; chi tiết hấp dẫn nhưng lạc đề [seductive details] làm giảm học (Sundararajan và Adesope, 2020).
- **Ẩn dụ khái niệm và sơ đồ hình ảnh** (Lakoff và Johnson; Johnson 1987; Parsons 2018): tư duy trừu tượng dựa trên các sơ đồ có gốc cơ thể: chứa đựng, đường đi, cân bằng, trung tâm và ngoại vi, vòng lặp, bộ phận và toàn thể, liên kết, trên dưới, gần xa, lực. **Hình dạng sơ đồ là một lời khẳng định về cấu trúc** (Ziemkiewicz và Kosara, 2008): chọn sơ đồ theo logic của khái niệm.
- **Đáng nhớ** (Borkin và cộng sự 2013, 2016): hình nhận ra được, màu, mật độ có tổ chức, hình dạng khác thường (sơ đồ, cây, mạng) đáng nhớ hơn biểu đồ tối giản phổ thông; tiêu đề nói thông điệp; trang trí CÓ LIÊN QUAN giúp nhớ, trang trí lạc đề làm hại.

## 2. Chọn kiểu sơ đồ theo logic khái niệm

Trước khi vẽ, viết một câu: "Các phần [có thứ tự / lặp lại / lồng nhau / song song / đối lập]; quan hệ giữa chúng là [điều kiện tiên quyết / dòng chảy / bao chứa / căng kéo]". Rồi chọn:

| Kiểu | Sơ đồ hình ảnh | Trung thực khi | Gây hiểu lầm khi | Có trong so-do.js (slide: so-do-pptx.js) |
|---|---|---|---|---|
| Tiến trình thẳng, bậc thang | đường đi, trên dưới | các chặng có thứ tự, phần lớn một chiều; bậc thang chỉ khi chặng sau xây trên chặng trước | thực tế lặp lại, hoặc "cao hơn" ngụ ý chặng sau tốt hơn | `chuoi` |
| Hành trình | đường đi | phát triển dài, nhiều chặng, có quanh co | ngụ ý đỉnh "giác ngộ", hơn người | `hanh-trinh` |
| Vòng lặp | vòng lặp | quá trình thật sự lặp (thực hành, phản tư, điều chỉnh) | có điểm đầu, điểm cuối thật, hoặc sâu dần qua mỗi vòng (khi đó dùng xoắn ốc) | `vong-lap` |
| Xoắn ốc tiến | vòng lặp, đường đi | lặp lại nhưng mỗi vòng sâu, rộng hơn (học qua nhiều chu kỳ) | các chặng không thật sự quay lại | tự vẽ (slide: `xoan-oc`) |
| Kim tự tháp, tầng | trên dưới, bộ phận và toàn thể | tầng dưới là điều kiện của tầng trên và/hoặc nhiều hơn về lượng | các tầng song song, chồng lấn, hoặc tác giả không khẳng định thứ tự (trường hợp kim tự tháp Maslow) | `tang` (thap, chong) |
| Trung tâm và nhánh, mandala | trung tâm và ngoại vi, cân bằng | một nguyên lý lõi và các mặt ngang hàng | các nhánh có thứ tự thật hoặc nặng nhẹ khác nhau | `trung-tam` |
| Radar | nhiều trục từ một tâm | hồ sơ 5-8 chiều cùng thang, đọc như một hình dạng | diện tích đánh lừa độ lớn; đổi thứ tự trục đổi hình; so nhiều hồ sơ | `radar` |
| Ma trận 2x2 | hai thang trực giao | hai chiều độc lập, liên tục, góc phần tư có nghĩa | hai chiều tương quan hay là phân loại; nhãn ô quy kết "kiểu người" | `ma-tran` |
| Lưới thẻ | song song | các mục ngang hàng có mô tả | thực ra có thứ tự hay phụ thuộc | `the-luoi` |
| So sánh hai cột | đẩy kéo, đối lập | hai cách, trước và sau | đúng sai tuyệt đối, bêu xấu một phía | `so-sanh` |
| Cây, rễ | bộ phận và toàn thể, liên kết | kết quả thấy được mọc từ nền tảng khuất | ngụ ý quan hệ nhân quả chưa có | tự vẽ (SVG trong dự án, loại `anh`) |
| Tảng băng | chứa đựng, trên dưới | phần thấy được tựa trên phần khuất lớn hơn (hành vi và niềm tin, nhu cầu) | ngụ ý tỉ lệ cụ thể ("90% khuất") không có bằng chứng | tự vẽ (slide: `tang-bang`) |
| Vòng đồng tâm, củ hành | chứa đựng, trung tâm | phạm vi lồng nhau (bản thân, quan hệ, tổ chức, xã hội) | các lớp không thật sự lồng nhau | tự vẽ (slide: `dong-tam`) |
| Venn | chứa đựng (giao nhau) | tập hợp có phần tử chung thật, phần giao là điểm chính | chỉ để nói "có liên quan"; hơn ba tập | tự vẽ (slide: `venn`) |
| Phổ, dải liên tục | đẩy kéo, gần xa | một đại lượng biến thiên liên tục giữa hai cực, các vùng có ranh giới mờ (vùng dung nạp, mức độ) | các loại rời rạc không có thứ tự; ngụ ý một cực là "tốt" khi tác giả không nói | tự vẽ (slide: `pho`) |

Cảnh báo kinh điển: kim tự tháp Maslow không do Maslow vẽ và hình kim tự tháp thêm hàm ý (tầng bắt buộc tuần tự, có đỉnh) mà ông không khẳng định (Bridgman và cộng sự, 2019); "kim tự tháp học tập" với tỉ lệ ghi nhớ 10% đọc, 90% dạy là bịa ghép vào Nón kinh nghiệm của Dale (Subramony và cộng sự, 2014). Không bao giờ dùng hai hình này như kiến thức.

## 3. Quy tắc dựng sơ đồ

- **R6.1 Mỗi khái niệm có cả hình lẫn nhãn chữ (A).** Không biểu tượng trơ trọi, không hình không nhãn.
- **R6.2 Nhãn đặt trên hình, không dùng chú giải rời (A, liền kề không gian).**
- **R6.3 Báo hiệu cấu trúc (A).** Đánh số chặng; một màu nhấn cho chặng đang nói (trường `mucNhan`); tiêu đề nói điều rút ra; mũi tên chỉ khi có hướng, dòng chảy thật.
- **R6.4 Bỏ chi tiết lạc đề (A).** Viền hoa sen trang trí, ảnh "bộ não" có sẵn, biểu tượng hay trích dẫn không mang nội dung: bỏ. Mỗi thành phần hoặc mang nội dung, hoặc thuộc khung thương hiệu (lề, logo).
- **R6.5 Chọn kiểu theo logic khái niệm, không theo sở thích (B/C).** Hai kiểu cùng hợp thì chọn kiểu ít hàm ý sai hơn.
- **R6.6 Framework có tên (C).** (a) Tên và số thứ tự mỗi chặng giống hệt nhau trên poster, handout, slide, video; (b) mỗi chặng một biểu tượng hay màu lặp lại qua mọi tài liệu; (c) động từ hay danh động từ ngắn và một dòng mô tả; (d) thể hiện điều chuyển người học sang chặng sau nếu framework có nói; (e) framework cho phép đi không tuyến tính thì vẽ mũi tên quay lại, xoắn ốc; (f) **ghi tên tác giả trên hình** (quy ước của người dùng với mọi công cụ, mô hình của người khác và của chính người dùng).
- **R6.7 Đáng nhớ nhờ phong phú có liên quan (B).** Tiêu đề nói thông điệp, một hình nhận ra được cho mỗi khái niệm, hình dạng riêng nhưng trung thực, mã hoá thừa (nhãn + biểu tượng + vị trí).
- **R6.8 Số lượng thì theo lối Isotype (B/C).** Nhiều hơn là nhiều biểu tượng hơn, không phải biểu tượng to hơn; một kiểu biểu tượng; một biểu tượng = một đơn vị có ghi rõ (slide: loại `isotype`).
- **R6.9 Không bịa số, tỉ lệ (A).** Không phần trăm trên tảng băng, kim tự tháp khi không có nguồn; biểu đồ cột bắt đầu từ 0 và ghi nguồn. Mọi dữ kiện trên hình có dòng "Kiểm chứng:" trong brief (giống kịch bản infomotion).
- **R6.10 Mật độ theo phương tiện (B/C).** Carousel: một ý một trang. Poster: một framework nhìn một lần là thấy. Handout, infographic: được dày hơn, có lưới, mục đánh số, đường đọc.
- **R6.11 Chữ trên sơ đồ theo chuẩn ngôn ngữ trong PHONG-CACH mục 4 (quy ước).** Nhãn thuần Việt, thuật ngữ gốc trong [ngoặc vuông] (trừ tên chặng framework vốn bằng tiếng Anh); không từ sáo văn AI (PHONG-CACH mục 4); chữ đời thường thay biệt ngữ khi người xem là đại chúng (Shulman và cộng sự, 2020: biệt ngữ làm người đọc thấy mình không thuộc về, định nghĩa kèm theo cũng không gỡ được); câu kết ưu tiên một câu hỏi mở thật thay câu khẩu hiệu. Cách chọn và viết chữ chi tiết: `chuan/08-chu-tren-thiet-ke.md`.

## 4. Ẩn dụ phương Đông, tâm-thể: dùng có chủ ý, tránh sáo

| Ẩn dụ | Hợp cho | Rủi ro, cách dùng |
|---|---|---|
| Sen (bùn - sen) | chuyển hoá đi qua khổ đau | rất sáo trong truyền thông chữa lành Việt Nam, sắc thái tôn giáo có thể khiến người ngoài đạo thấy mình không thuộc về: vẽ nét đơn trừu tượng, chỉ khi nội dung thật sự nói về điều này |
| Dòng sông, nước | dòng chảy, vô thường, dòng trong hệ thống | tránh khi các chặng rời rạc |
| Hơi thở | nhịp, vòng vào ra; hợp nội dung tâm-thể, chánh niệm | vẽ thành sóng hay vòng tròn nở co |
| Rễ, cây | nền tảng, "bên dưới bề mặt", hệ thống | qua phép thử trung thực của kiểu cây ở mục 2 |
| Đường núi | phát triển dài, có khúc quanh | tránh ngụ ý đỉnh "giác ngộ", hơn người |
| Enso, vòng tròn, mandala | trọn vẹn, trung tâm và ngoại vi | không dùng biểu tượng thiêng (tượng Phật, bánh xe pháp) làm trang trí |

Ba phép thử trước khi đề xuất ẩn dụ mới: (1) người Việt không cần giải thích vẫn đọc ra; (2) vẽ được bằng vài nét, không cần ảnh; (3) không trùng ẩn dụ đã dùng cho khái niệm khác.

**Từ điển ẩn dụ của người dùng**: `minh-hoa/an-du.json` (khái niệm đã được người dùng duyệt kèm sơ đồ hình ảnh, ẩn dụ, hình thức). Khi minh hoạ một khái niệm cố định của người dùng (tên framework, mô hình, thuật ngữ riêng của họ), tra từ điển này trước; có thì dùng cùng ẩn dụ để mọi ấn phẩm nói cùng một ngôn ngữ hình; chưa có thì đề xuất, đánh dấu "ẨN DỤ MỚI - cần duyệt", người dùng duyệt xong thì ghi vào `minh-hoa/an-du.json`. Người dùng có thêm một từ điển ẩn dụ ở công cụ khác (ví dụ xưởng dựng video) thì giữ hai từ điển khớp nhau.

## 5. Cách hệ thống vẽ

- Sơ đồ có cấu trúc: `minh-hoa/so-do.js` vẽ bằng code từ dữ liệu (10 loại ở bảng mục 2), tự lấy màu vai và phông của chủ đề, tự đo chữ để xuống dòng đúng tiếng Việt, tự co theo khung. Đặt vào khuôn `so-do-tri-thuc` hoặc bất kỳ khuôn nào có ô `data-o-so-do`.
- Sơ đồ đặc thù (tảng băng, cây rễ, vòng đồng tâm): vẽ một tệp SVG riêng trong thư mục dự án theo cùng màu vai (`var(--nhan)`, `var(--chu)`...), đưa vào bằng loại `anh`; sơ đồ dùng lại được qua nhiều dự án thì nâng thành một loại mới trong so-do.js (kèm mẫu `khuon/so-do-tri-thuc/mau-<loai>.json`, chạy `tools/kiem-khuon.py`).
- Slide: cùng dữ liệu, vẽ bằng hình khối gốc PPTX để sửa được trên Google Slides (`trinh-chieu/so-do-pptx.js`, 15 loại, `chuan/09`).
- Biểu tượng nét: `he-thong/bieu-tuong.css` (39 biểu tượng vẽ riêng, cùng nét 1,6; danh sách: `grep -o "bt-[a-z-]*" he-thong/bieu-tuong.css`). Thêm biểu tượng thì giữ cùng nét, cùng lưới 24.
- Không dùng ảnh do AI tạo cho sơ đồ; không dùng ảnh minh hoạ có sẵn thay cho một ẩn dụ được thiết kế.
