# 08 - Chữ trên thiết kế: chọn gì, viết thế nào

Chuẩn vận hành cho phần chữ đặt trên ấn phẩm [copy on design]: chọn nội dung nào lên hình, nội dung nào ở lại lời đăng [caption] và văn bản thay thế [alt text], rồi viết và cắt cho vừa từng thể thức. Cơ sở: `nghien-cuu/E-chu-tren-thiet-ke.md` (tổng quan nghiên cứu, nguồn đầy đủ, mức chứng cứ A/B/C). Chuẩn ngôn ngữ nền: `phong-cach/PHONG-CACH.md` mục 4. Skill dùng chuẩn này: thiet-ke-chu.

Mức chứng cứ: **A** nghiên cứu bình duyệt, tiêu chuẩn chính thức; **B** dữ liệu ngành, tổ chức thực hành uy tín; **C** quy tắc kinh nghiệm, dùng làm điểm xuất phát. Đơn vị đếm là **tiếng** (âm tiết), đúng cách người Việt đếm chữ.

## 1. Ba lớp chữ của một ấn phẩm

Mỗi ấn phẩm có ba lớp chữ, viết cùng lúc chứ không phải chữ trên hình trước rồi caption chắp vá sau:

| Lớp | Việc của nó | Người xem dùng thế nào |
|---|---|---|
| Chữ trên hình | dừng lướt, nhận ra ai, cái gì, khi nào; một lời nhắc hành động | vài giây, đọc lướt, thường trên điện thoại |
| Lời đăng [caption] | ngữ cảnh, câu chuyện, lập luận, chi tiết, nguồn, liên kết thật, câu hỏi mở | đọc có chủ ý khi đã dừng lại |
| Văn bản thay thế [alt text] | chứa đúng chữ in trên hình và mô tả ngắn hình ảnh | người dùng trình đọc màn hình, máy tìm kiếm |

Hệ quả: chữ trên hình được phép ngắn tới mức "chưa đủ" vì caption gánh phần còn lại; ngược lại, thông tin thiết yếu (ngày, nơi, cách đăng ký) luôn có mặt trong caption dù đã có trên hình (W3C, WCAG 1.4.5 và Images Tutorial, A).

## 2. Quy trình bảy bước

1. **Người xem và việc của họ.** Ai thấy, ở đâu, trong bao lâu; họ "thuê" chương trình này để làm việc gì trong đời mình [jobs-to-be-done] (Christensen và cộng sự, 2016). Viết một câu: "Sau khi xem, [người xem] cảm..., biết..., làm...".
2. **Ngôi nhà thông điệp** [message house] cho cả chiến dịch: mái là thông điệp chính (một câu), ba cột là thông điệp hỗ trợ, móng là bằng chứng (nghiên cứu, ghi công, kinh nghiệm thật). Mái lên phông, poster, ảnh bìa; mỗi cột thành một bài bảng tin; móng nằm ở caption, handout. Chiến dịch đã có kế hoạch ESCAPE (skill escape-campaign-planner) thì lấy thông điệp từ đó, không viết lại.
3. **Chọn nội dung lên hình** theo bảng mục 3.
4. **Viết** tiêu đề, dòng phụ, lời kêu gọi hành động theo mục 4, 5; luôn đưa 2-3 phương án tiêu đề khác nhau về cách tiếp cận (không chỉ khác giọng), mỗi phương án một dòng lý do.
5. **Cắt theo định mức** của từng thể thức (mục 6, `chuToiDa` trong `chuan/kho-the-thuc.json`; ve.py báo `nhieu-chu`). Story 9:16 luôn là bản rút gọn.
6. **Rà** chuẩn ngôn ngữ (ve.py `tu-ngu`, `goi-y-chu` và đọc bằng mắt), đạo đức (mục 7), tiếp cận (alt text, caption lặp thông tin thiết yếu).
7. **Thử**: kiểm 5 giây (nhìn 5 giây rồi nói lại ấn phẩm nói gì, mời làm gì), nheo mắt, xem ở cỡ điện thoại, đọc to bằng giọng của chính người dùng. Câu nào nghe như quảng cáo hay như máy viết thì sửa (Gronier, 2016, B; còn lại C).

## 3. Lên hình hay ở lại caption

| Lên hình | Ở lại caption |
|---|---|
| một ý chính, câu mở | câu chuyện, ngữ cảnh, lập luận |
| tên chương trình, ngày, giờ, nơi (nếu là sự kiện) | lịch chi tiết, chi phí, điều kiện, dành cho ai và không dành cho ai |
| tên người hướng dẫn và chức danh theo PHONG-CACH mục 1 | tiểu sử, học vị đầy đủ, thành tích |
| tên framework và tác giả (dạng gọn) | ghi công đầy đủ, nguồn khoa học, DOI |
| lời nhắc hành động ngắn (kèm QR, đường dẫn ngắn với ấn phẩm in) | liên kết thật, hashtag |
| | câu hỏi mở kết bài |

- **R8.1 Một khung, một thông điệp (C; cơ chế: giới hạn trí nhớ làm việc khoảng 4 cụm, Cowan, 2001, A).** Ý thứ hai sang khung khác (carousel, story kế tiếp) hoặc xuống caption.
- **R8.2 Ba tầng, hiếm khi bốn (C).** Tiêu đề, dòng phụ hoặc thông tin thực dụng, chi tiết (người, ghi công, logo). Cần tầng năm là nội dung cần biên tập lại, không phải thiết kế lại.
- **R8.3 Thuật ngữ chuyên môn ở caption, chữ đời thường trên hình khi người xem là đại chúng (A).** Biệt ngữ làm người đọc thấy mình không thuộc về, kể cả khi có định nghĩa kèm (Shulman và cộng sự, 2020). Người xem là học viên, đồng nghiệp trong nghề thì thuật ngữ đã chung được phép.

## 4. Tiêu đề và câu mở

- **R8.4 Hai tiếng đầu mang nghĩa (B).** Người lướt thường chỉ thấy vài từ đầu (Nielsen, 2009): đưa danh từ, động từ mang nghĩa lên đầu dòng; không mở bằng "Chương trình", "Thông báo", "Cùng".
- **R8.5 Cụ thể vừa đủ (A).** Độ cụ thể có quan hệ chữ U ngược với tỉ lệ nhấp; quá cụ thể cũng làm mất người xem như quá mơ hồ (Le Quéré & Matias, 2025). Gọi tên trải nghiệm cụ thể, nhất là trải nghiệm thân thể (vai, hơi thở, nhịp tim), không kể hết nội dung.
- **R8.6 Câu hỏi chỉ khi mang thông tin (A).** Tiêu đề dạng câu hỏi bị coi là kém thông tin và làm giảm tương tác (Fang & Wheeler, 2026); câu hỏi tu từ lộ liễu khiến người xem soi người nói thay vì nội dung (Ahluwalia & Burnkrant, 2004); câu hỏi hợp với người xem đang bình tâm (Hagtvedt, 2015). Hệ quả cho người dùng: câu hỏi soi chiếu thật (như "Ở ngoài công ty, bạn là ai?") giữ được trên hình; câu hỏi mở kết bài đặt ở caption; tránh chuỗi "Bạn có...? Bạn có...?".
- **R8.7 Khoảng trống tò mò phải được lấp bằng chính nội dung (A).** Loewenstein (1994) giải thích sức kéo của khoảng trống thông tin; YouTube xếp hạng thử nghiệm thumbnail theo thời lượng xem, không theo tỉ lệ nhấp. Hứa gì trên hình, giao đủ trong bài; không chạm vào lo âu.
- **R8.8 Khung được thường đủ (A).** Khác biệt giữa nhấn điều được và nhấn điều mất là nhỏ (Gallagher & Updegraff, 2012); không cần doạ để thuyết phục. Tiêu cực kéo nhấp (Robertson và cộng sự, 2023) nhưng xưởng chủ động không dùng.
- **R8.9 Con số khi là thông tin thật** (thời lượng, số buổi, ngày), không dùng con số để làm kêu.
- **R8.10 Ngắt tiêu đề theo nhịp nghĩa** (`\n`), giữ cụm bằng `~`, không để một tiếng đứng một mình ở dòng cuối (C-01 R3.8).

## 5. Lời mời và lời kêu gọi hành động

- **R8.11 Ngôn ngữ hỗ trợ tự chủ (A).** "Bạn có thể", "gợi ý bạn" cho kết quả học sâu và bền hơn "bạn phải", "bạn nên" (Vansteenkiste và cộng sự, 2004); ngôn ngữ ra lệnh gây phản kháng tâm lý [psychological reactance], một câu trả lại quyền chọn cho người xem giúp giảm điều đó (Miller và cộng sự, 2007; Rains, 2013). Một chữ "hãy" trong nút không sao; chuỗi "hãy... hãy..." trên một khung đọc như ra lệnh.

| Kiểm soát | Hỗ trợ tự chủ |
|---|---|
| Bạn phải học cách buông bỏ | Buông bỏ có thể bắt đầu từ một hơi thở ra dài |
| Đăng ký ngay! | Chọn buổi phù hợp với bạn: 12/10 hoặc 19/10 |
| Đừng bỏ lỡ | Nếu chủ đề này chạm tới bạn, lớp nhận đăng ký đến hết 05/10 |
| Hãy yêu thương bản thân | Thử hỏi mình: lúc này mình cần điều gì? |
| Bắt buộc mang theo sổ | Mang theo một cuốn sổ nếu bạn thích ghi chép |

- **R8.12 Một lời kêu gọi chính, nói đúng điều sẽ xảy ra (B).** Cụ thể, chân thành, có nghĩa khi đứng một mình, gọn (Moran, 2019); động từ đầu: "Đăng ký buổi 12/10", "Nhận bộ bài tập thở", "Xem lịch hai buổi". Tránh "Tìm hiểu thêm", "Bấm vào đây". Hành động phụ nếu có thì nhỏ, nhạt.
- **R8.13 Ngày cụ thể thay tần suất** ("Thứ Bảy 12/10, 8:30-11:30" thay "lớp mở hằng tháng"); khan hiếm chỉ khi thật, nói bằng lý do định tính ("lớp nhỏ để mỗi người được hướng dẫn riêng") và hạn ngày, không nêu số ghế (quy ước của người dùng).
- **R8.14 Ảnh bảng tin không bấm được (C).** Chữ kêu gọi trên hình là lời nhắc; liên kết thật nằm ở caption, nút quảng cáo, nhãn dán story; ấn phẩm in dùng QR kèm đường dẫn ngắn đọc được bằng mắt.

## 6. Định mức theo thể thức

Số liệu máy đọc: `chuToiDa` trong `chuan/kho-the-thuc.json` (`tieuDe`: tiếng tối đa của tiêu đề; `lyTuong`: tổng nên nhắm; `tran`: ngưỡng ve.py báo `nhieu-chu`; khuôn tri thức nhân 1,4). Tất cả là mức C, dựng trên nguyên lý tải nhận thức, đọc lướt, đọc từ xa (khoảng một từ mỗi giây phơi sáng với ấn phẩm ngoài trời, Clear Channel Outdoor, B; con số "7 từ" của bảng quảng cáo không có nghiên cứu gốc).

| Thể thức | Tiêu đề | Tổng nên nhắm (trần) | Ghi chú |
|---|---|---|---|
| Bảng tin 1:1, 4:5, 16:9 | 12 | 35 (60) | thông cáo sự kiện thường chạm trần: ưu tiên chuyển tính năng, mô tả xuống caption |
| Story 9:16 | 10 | 25 (40) | một ý, một hành động, phần phụ tự ẩn (`data-rut-gon`) |
| Ảnh chia sẻ web (OG) | 10 | 15 (25) | tên bài, nhận diện; phần còn lại ở og:title, og:description |
| Ảnh bìa trang, kênh, email | 8 | 20 (30) | câu định vị và tên; lịch, tiểu sử ở phần giới thiệu |
| Thumbnail YouTube | 6 | 8 (12) | cụm bổ sung cho tiêu đề video, không lặp tiêu đề |
| Poster A3, 60x90 | 12 | 70 (100) | tiêu đề, ngày, nơi, người, QR, ghi công |
| Standee, roll-up | 10 | 40 (60) | thông tin chính ở 2/3 trên, QR ngang ngực |
| Phông sân khấu | 12 | 30 (45) | tên chương trình, chủ đề, ngày nơi, đơn vị; không lời kêu gọi bán hàng |
| Thẻ đeo | 6 | 20 (30) | tên lớn nhất, chức danh, vai trò |
| Giấy chứng nhận | 6 | 90 (130) | các trường cố định, ghi công, chữ ký, số hiệu |
| Handout A4 | 12 | 350 (500) | một nhiệm vụ một trang, hướng dẫn đánh số, chỗ viết, câu hỏi phản tư |

## 7. Đạo đức: dùng, điều chỉnh, loại bỏ

- **Dùng**: ngôn ngữ hỗ trợ tự chủ; chữ dễ đọc (chữ khó đọc khiến việc được mời có vẻ khó làm: Song & Schwarz, 2008, A); cụ thể vừa đủ; khung được, khổ đau được ghi nhận kèm lối mở; câu hỏi thật; ghi công tác giả; alt text đầy đủ; ngôi nhà thông điệp, jobs-to-be-done.
- **Điều chỉnh**: AIDA thành danh mục kiểm (đã có điểm dừng lướt chưa, có hành động chưa), không thành kịch bản tạo ham muốn; PAS (vấn đề, khuấy động, giải pháp) thành **Nhận diện - Đồng cảm - Lối mở** (nhận diện trải nghiệm cụ thể, ghi nhận nó là phổ biến và dễ hiểu, mời một bước nhỏ); 4U thành **3U** (hữu ích, độc đáo, cụ thể vừa đủ) cộng **kịp thời có thật** (hạn ngày, mùa, sự kiện); bằng chứng xã hội chỉ với lời thật, có đồng ý, có ngày.
- **Loại bỏ**: khung sợ bị bỏ lại, so bì, đua tranh; khẩn cấp giả, đồng hồ đếm ngược, "chỉ còn X suất"; làm xấu hổ người từ chối; lời chứng thực, con số, khuôn mặt bịa hay do AI tạo đóng vai người thật; upsell trên ấn phẩm quảng bá; biệt ngữ làm tiêu đề cho người xem đại chúng; ngôn ngữ ra lệnh dày đặc; cụm sáo văn AI, gạch dài, Title Case. Danh mục mẫu thiết kế lừa dối [dark patterns]: Brignull; Mathur và cộng sự (2019).

## 8. Cách trình tư vấn chữ cho người dùng

Mỗi ấn phẩm hay chiến dịch, Claude trình một bảng ngắn trước khi dựng (nằm trong brief, chốt 1):

1. Câu người xem và việc của họ; mái của ngôi nhà thông điệp.
2. 2-3 phương án tiêu đề, mỗi phương án: chữ nguyên văn, cách tiếp cận (vd "gọi tên trải nghiệm thân thể", "câu hỏi soi chiếu", "lời hứa cụ thể"), một dòng lý do theo người xem; đánh dấu phương án Claude đề xuất.
3. Bảng ba lớp: chữ trên hình theo từng nhóm thể thức (feed, story, bìa, in) với số tiếng so với định mức; caption (ý chính; người dùng muốn tự viết thì chỉ gợi ý); alt text.
4. Điều đã cắt và lý do; điều cần người dùng chốt (chức danh, con số cần kiểm chứng, hạn đăng ký thật).

Sau khi dựng, nhìn lại ở cỡ thật: chữ nào không đọc được trên điện thoại hay từ hàng ghế cuối thì cắt chữ trước, đổi bố cục sau.
