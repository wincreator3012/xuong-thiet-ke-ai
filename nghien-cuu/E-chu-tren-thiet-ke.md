# Chữ trên thiết kế: tổng quan nghiên cứu và thực hành

Báo cáo E trong bộ tư liệu `nghien-cuu/` (A: quy cách số, B: in và sân khấu, C: nguyên lý thiết kế, D: công cụ). Ngày lập: 2026-10-06. Phạm vi: chữ đặt TRÊN ấn phẩm [copy on design] gồm ảnh bảng tin, story, ảnh bìa, thumbnail YouTube, ảnh chia sẻ web, poster, phông sân khấu, màn LED, standee, thẻ đeo, giấy chứng nhận, handout. Mục đích: giúp trợ lý thiết kế tư vấn cho người dùng (chuyên gia, giảng viên, diễn giả) hai việc: (a) chọn nội dung nào lên hình, nội dung nào ở lại trong phần chú thích bài đăng [caption]; (b) tối ưu câu chữ cho từng thể thức mà vẫn trung thành với hệ giá trị nhân bản.

Báo cáo viết bằng tiếng Việt (khác bốn báo cáo trước) vì phần lớn khuyến nghị là câu chữ tiếng Việt. Khi cần con số kỹ thuật (cỡ chữ, vùng an toàn), tra `A-digital-specs.md`, `B-print-stage.md` và `chuan/`.

**Quy ước mức chứng cứ** (áp cho mọi nhận định):

| Mức | Nghĩa | Cách dùng |
|---|---|---|
| **A** | nghiên cứu bình duyệt [peer-reviewed], phân tích gộp [meta-analysis], tiêu chuẩn chính thức (W3C) hoặc hướng dẫn chính thức của nền tảng | mặc định; chỉ phá khi có lý do ghi rõ |
| **B** | dữ liệu ngành, tổ chức thực hành uy tín (Nielsen Norman Group, Clear Channel), một nghiên cứu đơn lẻ có giới hạn lớn | áp dụng nhưng xét bối cảnh |
| **C** | quy tắc kinh nghiệm được lặp lại nhiều, bằng chứng yếu hoặc không truy được gốc | điểm xuất phát, không gọi là "khoa học" |

Đơn vị đếm: tiếng Việt có từ nhiều âm tiết (*giáo dục*, *chánh niệm*), nên báo cáo đếm theo **tiếng** (âm tiết, đúng cách người Việt đếm "chữ"). Các quy tắc gốc tiếng Anh đếm theo từ [word]; quy đổi gần đúng 1 từ tiếng Anh ≈ 1,3-1,7 tiếng Việt là ước lượng của người viết, chưa có nguồn kiểm chứng (C).

---

## Tóm tắt điều rút ra

1. **Một khung, một thông điệp.** Mỗi hình chỉ gánh một ý chính; ý thứ hai sang khung khác hoặc xuống caption (C, suy ra từ tải nhận thức và giới hạn trí nhớ làm việc khoảng 4 cụm: Cowan, 2001, mức A cho cơ chế).
2. **Chữ dễ đọc làm việc được mời có vẻ dễ làm.** Hướng dẫn in phông khó đọc khiến người đọc đánh giá bài tập khó hơn và ít muốn làm hơn (Song & Schwarz, 2008) (A). Với lời mời thực hành, độ trôi chảy khi xử lý [processing fluency] là một phần của thông điệp.
3. **Hai tiếng đầu quyết định.** Người lướt thường chỉ thấy khoảng hai từ đầu của tiêu đề, liên kết (Nielsen, 2009) (B): đưa danh từ, động từ mang nghĩa lên đầu dòng.
4. **Cụ thể vừa đủ, không phải càng cụ thể càng tốt.** Trên gần 9.000 thử nghiệm tiêu đề, độ cụ thể có quan hệ hình chữ U ngược với tỉ lệ nhấp, và nửa số tiêu đề đã "quá cụ thể" (Le Quéré & Matias, 2025) (A).
5. **Câu hỏi chỉ hiệu quả khi mang thông tin.** Câu hỏi tu từ lộ liễu khiến người xem soi nguồn thay vì nghĩ về nội dung (Ahluwalia & Burnkrant, 2004); tiêu đề dạng câu hỏi bị coi là kém thông tin và làm giảm tương tác (Fang & Wheeler, 2026); câu hỏi hợp với người xem đang bình tâm hơn người đang hưng phấn (Hagtvedt, 2015) (A).
6. **Khoảng trống tò mò phải được lấp bằng chính nội dung.** Loewenstein (1994) giải thích vì sao khoảng trống thông tin kéo người xem (A); YouTube tối ưu thử nghiệm thumbnail theo thời lượng xem chứ không theo tỉ lệ nhấp và xử lý "giật tít nghiêm trọng" (A, chính thức). Hứa gì trên hình, giao đủ trong bài.
7. **Ngôn ngữ hỗ trợ tự chủ thay cho ngôn ngữ kiểm soát.** "Bạn có thể", "gợi ý bạn" cho kết quả học sâu và bền hơn "bạn phải", "bạn nên" (Vansteenkiste và cộng sự, 2004); ngôn ngữ ra lệnh gây phản kháng tâm lý [psychological reactance] (Miller và cộng sự, 2007; Rains, 2013) (A).
8. **Tiêu cực kéo nhấp nhưng không phải lựa chọn của xưởng.** Mỗi từ tiêu cực tăng tỉ lệ nhấp khoảng 2,3% trong dữ liệu Upworthy (Robertson và cộng sự, 2023) (A). Biết cơ chế để chủ động không dùng, không phải để khai thác.
9. **Khung được thường đủ dùng.** Phân tích gộp 94 nghiên cứu: thông điệp nhấn điều được hiệu quả hơn nhẹ cho hành vi phòng ngừa, không khác biệt cho thái độ, ý định (Gallagher & Updegraff, 2012) (A). Không cần dọa để thuyết phục.
10. **Biệt ngữ khiến người đọc thấy mình không thuộc về.** Chú thích định nghĩa cũng không gỡ được tác dụng này (Shulman và cộng sự, 2020) (A). Trên hình, dùng chữ đời thường; thuật ngữ chuyên môn để trong caption hoặc handout.
11. **Lời kêu gọi hành động [CTA] cụ thể, một nút, nói đúng điều sẽ xảy ra.** Theo bốn chữ S: cụ thể, chân thành, có nghĩa khi đứng một mình, gọn (Moran, 2019) (B). Thử nghiệm "của tôi" và "của bạn" trên nút là giai thoại A/B, không đủ làm quy tắc (C).
12. **Chữ trên hình luôn có bản chữ thật đi kèm.** Văn bản thay thế [alt text] chứa đúng chữ in trên hình; thông tin thiết yếu phải có trong caption (W3C, WCAG 1.4.5 và hướng dẫn Images Tutorial) (A).
13. **Chữ đọc từ xa: khoảng một từ mỗi giây phơi sáng.** Hướng dẫn ngành ngoài trời ghi "bảy từ trở xuống" và "một từ mỗi giây" (Clear Channel Outdoor) (B); con số "7 từ" không có nghiên cứu gốc truy được (C).
14. **Tài liệu học: bỏ chữ trang trí, đặt nhãn sát hình, đánh dấu cấu trúc.** Các nguyên lý mạch lạc [coherence], báo hiệu [signaling], liền kề không gian [spatial contiguity] có hỗ trợ từ phân tích gộp (Mayer, 2020; Noetel và cộng sự, 2022) (A).
15. **Thử nhanh trước khi đăng: kiểm 5 giây, nheo mắt, xem ở cỡ điện thoại, đọc to.** Kiểm 5 giây đo ấn tượng đầu tiên chứ không đo khả năng dùng (Gronier, 2016) (B); A/B với khán giả nhỏ thường không đủ cỡ mẫu (Kohavi và cộng sự, 2020) (A cho nguyên tắc thống kê).

---

## 1. Người xem xử lý chữ trên hình như thế nào

### 1.1 Bảng tin là môi trường lướt

- **Lướt, không đọc.** Nghiên cứu theo dõi mắt [eye-tracking] của Nielsen Norman Group cho thấy mẫu hình chữ F chỉ xuất hiện khi trang thiếu định dạng; ngoài ra còn mẫu "bánh nhiều tầng" (chỉ đọc tiêu đề), "điểm rải rác", "cam kết" (đọc hết khi thật sự quan tâm) (Pernice, 2017) (B). Mẫu chữ F và chữ Z không phải đích để thiết kế theo; chúng là triệu chứng khi bố cục không có điểm nhấn. Một tiêu điểm mạnh luôn thắng đường đọc mặc định (xem C-principles R1.4).
- **Hai từ đầu.** Khi lướt danh sách, người dùng thường chỉ thấy khoảng 2 từ (chừng 11 ký tự) đầu dòng (Nielsen, 2009) (B). Với tiếng Việt, tương đương 2-4 tiếng đầu. Hệ quả: "Thở chậm lại để..." mạnh hơn "Một trong những cách giúp bạn...".
- **Ấn tượng thẩm mỹ hình thành rất nhanh.** Đánh giá độ hấp dẫn thị giác hình thành trong khoảng 50 ms (Lindgaard và cộng sự, 2006) (A, đã kiểm trong báo cáo C). Chữ là yếu tố đọc chậm nhất trong khung: hình và màu được "xem" trước khi chữ được "đọc".
- **Cửa sổ chú ý.** Con số "1,7 giây trên điện thoại, 2,5 giây trên máy tính" thường được gán cho Facebook IQ (khoảng 2016). Tôi chỉ tìm thấy các trang thứ cấp trích lại, không mở được bản gốc: **chưa kiểm chứng**, không trích như sự thật. Điều chắc chắn hơn là nhận định định tính: người xem quyết định dừng hay lướt trong vài giây đầu, và chữ phải đọc được trong khoảng đó (C).

### 1.2 Độ trôi chảy khi xử lý

- Alter và Oppenheimer (2009) tổng hợp các dạng trôi chảy (tri giác, ngôn ngữ, khái niệm) và cho thấy cảm giác "dễ xử lý" ảnh hưởng đến phán đoán về sự thật, sự thích, sự tự tin (A). Reber, Schwarz và Winkielman (2004) gắn độ trôi chảy với cảm nhận thẩm mỹ (A).
- **Phát hiện quan trọng nhất cho người dùng:** Song và Schwarz (2008) in hướng dẫn một bài tập thể dục bằng phông dễ đọc và phông khó đọc. Nhóm đọc phông khó ước lượng bài tập tốn sức hơn và ít sẵn lòng làm hơn (A). Với lời mời thực hành chánh niệm, thở, chú tâm vào thân, chữ khó đọc (phông thư pháp mảnh, chữ đè lên ảnh nhiều chi tiết) có thể khiến chính việc thực hành trông nặng nề.
- **Còn ý kiến "chữ khó đọc giúp nhớ" thì sao?** Ý tưởng "khó khăn đáng có" [desirable difficulty] từng được áp cho phông khó đọc. Phân tích gộp 25 nghiên cứu, 3.135 người (Xie, Zhou & Liu, 2018): chữ khó đọc không cải thiện ghi nhớ (d = -0,01) hay chuyển giao (d = 0,03), chỉ làm người học kém tự tin hơn và tốn thời gian hơn (A). Vậy không có lý do dùng chữ khó đọc, kể cả trên tài liệu học: ấn phẩm quảng bá, lời mời, handout đều dùng chữ trôi chảy tối đa (A).

### 1.3 Tải nhận thức và cụm thông tin

- Lý thuyết tải nhận thức [cognitive load theory] (Sweller, 1988) cho rằng trí nhớ làm việc có giới hạn và thiết kế tài liệu phải tránh tải không liên quan (A).
- Dung lượng trí nhớ làm việc khoảng 4 cụm [chunks] (Cowan, 2001) (A); con số "7 ± 2" của Miller (1956) là ước lượng cũ hơn, ngày nay thường được hiểu là áp cho chuỗi đã gộp cụm.
- **Hệ quả cho chữ trên hình:** một khung không nên buộc người xem giữ quá 3-4 đơn vị thông tin cùng lúc (ví dụ: tên chương trình, lời hứa, ngày giờ, cách đăng ký). Đó là lý do bảng định mức cuối báo cáo giữ tổng số chữ thấp (C, suy luận từ A).

### 1.4 Nguyên tắc một khung một thông điệp

Không có nghiên cứu nào đo trực tiếp "một thông điệp mỗi khung" trên ảnh mạng xã hội; đây là suy luận từ 1.1-1.3 và từ thực hành quảng cáo ngoài trời (C). Cách vận dụng:

- Viết ra một câu: "Người xem khung này cần nhớ đúng một điều: ...". Nếu không viết được một câu, nội dung chưa sẵn sàng để thiết kế.
- Carousel và loạt slide cho phép mỗi khung một ý (C-principles R6.11).
- Thứ tự ưu tiên trên một khung quảng bá: tiêu điểm hình ảnh, tiêu đề, một dòng hỗ trợ, thông tin thực dụng (ngày, nơi), hành động.

### 1.5 Lượng chữ trên ảnh mạng xã hội, thumbnail, story

- **Meta và quy tắc 20%.** Meta bỏ công cụ kiểm tra lớp chữ và quy tắc 20% chữ trên ảnh quảng cáo từ tháng 9/2020; quảng cáo không còn bị từ chối vì tỉ lệ chữ, nhưng Meta vẫn khuyên ảnh ít chữ thường được phân phối rộng hơn (B: nguồn thứ cấp Jon Loomer và Hootsuite, đã ghi ở A-digital-specs; trang trợ giúp "About text in ad images" của Meta chặn công cụ đọc tự động nên tôi không mở được nguyên văn).
- **Zalo.** Ảnh mẫu tin ZNS: chữ phủ không quá 50% diện tích ảnh (A, chính thức Zalo, ghi trong A-digital-specs).
- **YouTube.** Trang trợ giúp chính thức về thử nghiệm A/B tiêu đề và thumbnail viết rằng thử nghiệm được tối ưu theo **thời lượng xem** chứ không theo tỉ lệ nhấp, vì "tiêu đề và thumbnail tốt giúp người xem hiểu video nói về điều gì để không mất thời gian nhấp nhầm" (YouTube Help, A/B test titles & thumbnails) (A). Tháng 12/2024, YouTube Ấn Độ công bố tăng xử lý "giật tít nghiêm trọng" [egregious clickbait]: tiêu đề hay thumbnail hứa điều video không có (Google India Blog, 2024) (A). Đây là tín hiệu nền tảng thưởng cho sự trung thực, trùng với giá trị của người dùng.
- **Số chữ trên thumbnail.** "3-5 từ" là quy tắc thực hành phổ biến, không có nghiên cứu gốc (C). Cơ sở kỹ thuật: thumbnail hiển thị khoảng 160-360 px CSS trên điện thoại, nên chữ phải cao từ 100 px trên khung 1280x720 (A-digital-specs, suy luận). Thumbnail và tiêu đề video nên bổ sung cho nhau, không lặp nhau (C).
- **Story.** Chữ nằm trong vùng an toàn (trên 14%, dưới 20%, hai bên 6% theo hướng dẫn quảng cáo Meta, nguồn thứ cấp) (B). Mỗi khung story chỉ hiện vài giây; chữ dài buộc người xem bấm giữ để đọc (C).

### 1.6 Chữ in hoa và dấu tiếng Việt

- Arditi và Cho (2007) thấy chữ in hoa tiếng Anh đọc được ở cỡ nhỏ hơn khoảng 0,1 log đơn vị và đọc nhanh hơn ở cỡ sát ngưỡng thị lực, lợi thế biến mất ở cỡ lớn (A, nhưng mẫu chỉ 9 người, phông Arial). Nghiên cứu này không kiểm chữ có dấu chồng.
- Tiếng Việt in hoa có dấu chồng (Ầ, Ẫ, Ặ) vượt chiều cao chữ hoa, dễ va dòng trên và bị nén mất khi nền tảng nén ảnh (Trương, *Vietnamese Typography*; A-digital-specs) (B). Vì vậy: FULL-CAP chỉ cho chuỗi ngắn (nhãn, tên bước của framework, tên sự kiện trên phông), giãn dòng từ 1,25 (C-principles R3.3, R3.7) (C).

---

## 2. Tiêu đề và câu mở

### 2.1 Cụ thể hay trừu tượng

- Packard và Berger (2021): nhân viên chăm sóc khách hàng dùng ngôn ngữ cụ thể khiến khách thấy được lắng nghe hơn, hài lòng hơn (A, bối cảnh dịch vụ). Miller và cộng sự (2007): thông điệp dùng từ cụ thể được chú ý hơn, được coi là quan trọng hơn và nguồn được đánh giá tích cực hơn (A).
- Le Quéré và Matias (2025) phân tích 8.977 thử nghiệm tiêu đề trong kho Upworthy: quan hệ giữa độ cụ thể và tỉ lệ nhấp là đường cong; tiêu đề vừa phải tốt nhất; chỉ 8,7% tiêu đề quá mơ hồ, trong khi 50,9% quá cụ thể (A). Diễn giải: tiêu đề nên cho biết đủ để người xem biết nội dung có liên quan đến mình, nhưng để lại điều đáng khám phá.
- **Vận dụng:** cụ thể ở hình ảnh cảm giác và tình huống ("Vai bạn đang nhô lên lúc đọc dòng này?"), không nhất thiết cụ thể ở toàn bộ kết luận. Tránh trừu tượng rỗng ("Kiến tạo giá trị sống bền vững").

### 2.2 Câu hỏi trong tiêu đề

Bằng chứng lẫn lộn, cần đọc kỹ:

| Nghiên cứu | Phát hiện | Mức |
|---|---|---|
| Lai & Farbrot (2014) | Trên Twitter (6.350 người theo dõi) và một chợ mạng Na Uy, tiêu đề câu hỏi có nhiều lượt nhấp hơn câu khẳng định, nhất là câu hỏi tự quy chiếu ("bạn") | A, nhưng bối cảnh hẹp, chính tác giả nói chưa giải thích được cơ chế |
| Ahluwalia & Burnkrant (2004) | Khi người xem nhận ra kỹ thuật tu từ, họ chuyển sang đánh giá nguồn thay vì nội dung | A |
| Hagtvedt (2015) | Người đang bình tâm (ít hưng phấn) đánh giá sản phẩm tốt hơn với câu hỏi; người đang hưng phấn thích câu khẳng định rõ | A |
| Scacco & Muddiman (2016) | Thực nghiệm 2.057 người Mỹ: tiêu đề câu hỏi kiểu giật tít tạo kỳ vọng tiêu cực và giảm nhẹ ý định đọc | B (báo cáo của Center for Media Engagement) |
| Fang & Wheeler (2026) | Bốn nghiên cứu (Reddit, hơn 3 triệu bài khoa học, 22.743 thử nghiệm tin tức, thí nghiệm đăng ký trước 400 người): tiêu đề câu hỏi giảm tương tác vì bị coi là kém thông tin | A |

**Tổng hợp cho người dùng:**

- Câu hỏi thật [genuine question], mở ra một quan sát cụ thể, hợp với bối cảnh chiêm nghiệm và người xem đang lắng (Hagtvedt). Ví dụ: "Lần gần nhất bạn thở trọn một hơi là khi nào?"
- Câu hỏi tu từ đã biết đáp án ("Bạn có muốn sống hạnh phúc hơn không?") vừa kém thông tin vừa dễ bị nhận là kỹ thuật thuyết phục: tránh.
- Câu hỏi trên hình nên chứa danh từ mang thông tin (thân, hơi thở, cơn giận, con) để không bị coi là rỗng.
- Quy ước mặc định của xưởng (bài đăng công khai kết bằng câu hỏi mở thật sự) đặt câu hỏi ở **cuối caption**, nơi người đọc đã có ngữ cảnh. Trên hình, câu hỏi là một lựa chọn, không phải mặc định.

### 2.3 Con số

Tôi không tìm được nghiên cứu bình duyệt vững chắc cho nhận định "tiêu đề có con số được nhấp nhiều hơn"; các con số lưu hành (ví dụ "tiêu đề số lẻ tăng 20% nhấp") đến từ báo cáo doanh nghiệp tôi không kiểm được (C). Điều chắc chắn: con số phải thật, có nguồn và có ngày; con số làm nội dung cụ thể hơn (2.1). Không dùng con số trang trí ("90% vấn đề nằm dưới tảng băng") khi không có nguồn (C-principles R6.9).

### 2.4 Khoảng trống tò mò: dùng có đạo đức

- Loewenstein (1994): tò mò khởi sinh khi người ta nhận ra khoảng trống giữa điều đã biết và điều muốn biết; khoảng trống quá lớn hoặc quá nhỏ đều không kéo (A).
- Blom và Hansen (2015) mô tả "tham chiếu tới trước" [forward-reference] ("Điều này sẽ thay đổi cách bạn...") là thủ pháp chính của giật tít (A, phân tích ngôn ngữ học).
- **Ranh giới đạo đức:** khoảng trống hợp lệ khi (1) nội dung lấp đầy nó, (2) người xem không bị lừa về loại nội dung, (3) không khai thác lo âu. YouTube định nghĩa giật tít nghiêm trọng đúng ở điểm (1) (A).
- Ví dụ hợp lệ: "Cơ thể nhớ điều tâm trí đã quên: ba dấu hiệu trong ngày thường" (có hứa hẹn cụ thể, bài giao đủ ba dấu hiệu). Không hợp lệ: "Điều không ai nói với bạn về chấn thương tâm lý" (mập mờ, ám chỉ bí mật, chạm vào lo âu).

### 2.5 Tự quy chiếu và cách xưng hô

- Hiệu ứng tự quy chiếu [self-reference effect]: thông tin liên hệ với bản thân được nhớ tốt hơn (Symons & Johnson, 1997, phân tích gộp) (A).
- Burnkrant và Unnava (1995) nghiên cứu tự quy chiếu trong quảng cáo (A, tôi xác minh được thông tin thư mục nhưng không mở được tóm tắt; theo hiểu biết của tôi, tự quy chiếu tăng mức xử lý thông điệp và hiệu quả phụ thuộc chất lượng lập luận, cần đọc lại trước khi trích chi tiết).
- **Tiếng Việt:** "bạn" trung tính cho bảng tin; "anh chị" trang trọng cho thư mời, poster hội thảo người đi làm; "mình" thân mật cho story. Chọn một cách xưng hô cho cả chiến dịch (C). Câu hỏi tự quy chiếu ("Bạn đã...?") có bằng chứng tăng nhấp (Lai & Farbrot, 2014), nhưng dùng dày đặc sẽ nghe như kịch bản bán hàng (C).

### 2.6 Khung được và khung mất

- Tversky và Kahneman (1981) chứng minh cùng một lựa chọn trình bày theo được hay mất làm đổi quyết định (A).
- Gallagher và Updegraff (2012), phân tích gộp 189 hệ số từ 94 nghiên cứu sức khoẻ: khung được hiệu quả hơn khung mất cho hành vi phòng ngừa (r = 0,083, nhỏ), không khác biệt cho thái độ, ý định và hành vi phát hiện bệnh (A). Hiệu ứng nhỏ: không có lý do dùng khung mất để "mạnh hơn".
- Robertson và cộng sự (2023), 22.743 thử nghiệm Upworthy: mỗi từ tiêu cực tăng tỉ lệ nhấp khoảng 2,3%, mỗi từ tích cực giảm khoảng 1% (A). Có một bài phản biện độ vững trên Journal of Robustness Reports mà tôi chưa đọc. Ý nghĩa thực hành: thuật toán và thói quen người xem sẽ thưởng cho tiêu cực; người thiết kế phải chủ động chọn không theo, và chấp nhận đánh đổi một phần lượt nhấp.
- **Vận dụng:** nói về khổ đau được (là thật, và nhiều truyền thống chăm sóc tinh thần coi đó là chất liệu để thấu hiểu), nhưng đặt khổ đau như điều được nhìn nhận, kèm lối mở, không như lời đe doạ. "Mệt mà không biết vì sao? Thân bạn có thể đang nói điều đó trước." thay vì "Nếu không xử lý căng thẳng ngay, bạn sẽ kiệt sức."

### 2.7 Biệt ngữ chuyên môn

Shulman và cộng sự (2020): người đọc văn bản nhiều thuật ngữ thấy kém hứng thú, kém tự tin và cảm thấy mình không thuộc về; định nghĩa kèm theo không xoá được tác dụng (A). Trên hình: "điều hoà hệ thần kinh" thay cho "điều hoà phế vị"; tên lý thuyết (lý thuyết đa phế vị, Stephen Porges) để ở caption hoặc handout, kèm ghi công tác giả.

---

## 3. Thuyết phục có đạo đức và thao túng

### 3.1 Phân loại mẫu thiết kế lừa dối

- Brignull (deceptive.design, từ 2010; sách *Deceptive Patterns*, 2023) liệt kê 18 loại, trong đó liên quan trực tiếp đến chữ trên ấn phẩm: **khan hiếm giả** [fake scarcity], **khẩn cấp giả** [fake urgency], **bằng chứng xã hội giả** [fake social proof], **làm xấu hổ người từ chối** [confirmshaming], **câu chữ đánh lừa** [trick wording], **quảng cáo trá hình** [disguised ads], **can thiệp thị giác** [visual interference] (B).
- Gray và cộng sự (2018) gom thành năm chiến lược: nài nỉ [nagging], cản trở [obstruction], lén lút [sneaking], can thiệp giao diện [interface interference], ép buộc [forced action] (A).
- Mathur và cộng sự (2019) quét khoảng 11.000 trang mua sắm, tìm 1.818 trường hợp thuộc 15 loại, 183 trang dùng thủ thuật lừa dối rõ ràng (đồng hồ đếm ngược giả, "chỉ còn 2 sản phẩm" giả) và 22 bên thứ ba bán sẵn các thủ thuật này (A).
- Pháp lý: Ủy ban Thương mại Liên bang Mỹ [FTC] (2022) coi nhiều mẫu này là lừa dối; Luật Bảo vệ quyền lợi người tiêu dùng Việt Nam số 19/2023/QH15 cấm cung cấp thông tin gian dối, gây nhầm lẫn (bối cảnh, không phải tư vấn pháp lý; đã ghi ở báo cáo C).

### 3.2 Nguyên tắc Cialdini dùng trung thực

Cialdini (2021) nêu bảy nguyên tắc ảnh hưởng. Chúng hiệu quả, vì vậy có thể bị lạm dụng. Bảng phân biệt cho chữ trên ấn phẩm (C, phân tích của người viết dựa trên Cialdini và quy ước mặc định của xưởng):

| Nguyên tắc | Dùng trung thực | Thao túng (loại bỏ) |
|---|---|---|
| Có đi có lại | tặng bài tập, tài liệu thật sự dùng được, không đòi gì | "quà tặng" để bắt để lại số điện thoại rồi gọi bán |
| Cam kết, nhất quán | mời một bước nhỏ tự chọn (thử 3 phút thở) | chuỗi "có" ép buộc dẫn tới mua |
| Bằng chứng xã hội | lời học viên thật, có đồng ý, ghi tên hoặc chữ cái đầu và vai trò, có ngày | lời chứng thực bịa, ảnh mặt người do AI tạo |
| Uy tín | học vị, chứng nhận ghi nhỏ, chính xác ở tầng chữ thứ ba | học vị làm tiêu đề, phóng đại danh hiệu |
| Thiện cảm | giọng thật, ảnh thật của người dùng | thân mật giả tạo |
| Khan hiếm | giới hạn có thật nói định tính ("lớp nhỏ để mỗi người được hướng dẫn riêng"), hạn đăng ký ngày cụ thể | đếm số ghế, đồng hồ đếm ngược, "sắp hết" không thật |
| Đồng thuộc [unity] | "những người làm nghề chăm sóc" như một cộng đồng mở | "người thành công" đối lập "người bị bỏ lại" |

### 3.3 Ngôn ngữ hỗ trợ tự chủ và phản kháng tâm lý

- **Thuyết tự quyết** [Self-Determination Theory]: ba nhu cầu tâm lý cơ bản là tự chủ, năng lực, gắn kết; bối cảnh hỗ trợ tự chủ nuôi động lực nội sinh (Ryan & Deci, 2000) (A).
- **Bằng chứng trực tiếp về câu chữ:** Vansteenkiste và cộng sự (2004) đưa cùng một bài học với hai kiểu lời dẫn: hỗ trợ tự chủ ("bạn có thể", "chúng tôi gợi ý bạn") và kiểm soát ("bạn phải", "bạn nên"). Nhóm hỗ trợ tự chủ xử lý sâu hơn, làm bài kiểm tra tốt hơn và kiên trì hơn (A, nguồn mô tả: Vansteenkiste, Lens & Deci, 2006).
- **Phản kháng tâm lý:** Brehm (1966) đề xuất rằng khi tự do bị đe doạ, người ta có động cơ khôi phục nó, kể cả bằng cách làm ngược lại (A, lý thuyết nền). Miller và cộng sự (2007): ngôn ngữ ra lệnh trong thông điệp sức khoẻ gây kết quả tiêu cực; một câu tái khẳng định tự do ở cuối [restoration postscript] cho kết quả tốt hơn (A). Rains (2013), phân tích gộp: phản kháng là tổ hợp giận và ý nghĩ tiêu cực (A). Steindl và cộng sự (2015) tổng quan các phát triển mới của lý thuyết (A).
- **Bảng chuyển đổi câu chữ tiếng Việt** (C, vận dụng của người viết; chưa có nghiên cứu tiếng Việt kiểm chứng):

| Kiểm soát | Hỗ trợ tự chủ |
|---|---|
| Bạn phải học cách buông bỏ | Buông bỏ có thể bắt đầu từ một hơi thở ra dài |
| Đăng ký ngay! | Chọn buổi phù hợp với bạn: 12/10 hoặc 19/10 |
| Đừng bỏ lỡ | Nếu chủ đề này chạm tới bạn, lớp mở đăng ký đến hết 05/10 |
| Hãy yêu thương bản thân | Thử hỏi mình: lúc này mình cần điều gì? |
| Bắt buộc mang theo sổ | Mang theo một cuốn sổ nếu bạn thích ghi chép |

Lưu ý riêng: "hãy" trong tiếng Việt vừa là lời mời vừa là mệnh lệnh nhẹ. Một chữ "hãy" trong CTA không sao; chuỗi "hãy... hãy... hãy..." trên một khung đọc như ra lệnh (C).

- **Giao tiếp phi bạo lực** [Nonviolent Communication] (Rosenberg, 2015): bốn thành phần quan sát, cảm nhận, nhu cầu, đề nghị; phân biệt đề nghị [request] với đòi hỏi [demand] (B, thực hành có ảnh hưởng, bằng chứng thực nghiệm hạn chế). Áp vào chữ trên ấn phẩm: mô tả quan sát cụ thể thay vì phán xét ("Ngày nào cũng 'ổn' nhưng tối về vẫn thấy nặng" thay vì "Bạn đang sống sai cách"), CTA là đề nghị có thể từ chối.
- **Marketing nhân bản** [humane marketing]: Santacroce (2021) đề xuất 7P của marketing nhân bản, chống lối bán hàng gây áp lực (C, sách thực hành, không có nghiên cứu thực nghiệm đi kèm). Hữu ích như ngôn ngữ chung, không phải bằng chứng.

---

## 4. Câu chữ cho lời kêu gọi hành động

- **Cụ thể và chân thành.** Moran (2019, NN/g) đề xuất bốn chữ S cho nhãn liên kết, nút: cụ thể [specific], chân thành [sincere: đặt kỳ vọng đúng và đáp ứng ngay], có nghĩa khi đứng riêng [substantial], gọn [succinct]; tránh "Tìm hiểu thêm", "Bấm vào đây" (B). Độ dài không phải mục tiêu chính: một nhãn dài vẫn tốt nếu cụ thể.
- **Động từ đầu, nói đúng việc sẽ xảy ra:** "Đăng ký buổi 12/10", "Nhận bộ bài tập thở (PDF)", "Xem lịch hai buổi". (C, áp dụng NN/g và nguyên tắc hai từ đầu.)
- **Một CTA chính mỗi ấn phẩm** (C-principles R7.1) (C). Nhiều lựa chọn ngang nhau làm loãng hành động; nếu có hành động phụ, làm nó nhỏ, nhạt.
- **"Của tôi" hay "của bạn" trên nút.** Thử nghiệm của Michael Aagaard (ContentVerve) với "Start my free 30 day trial" thường được kể là tăng khoảng 90% so với "your". Tôi chỉ thấy các blog thứ cấp kể lại, không mở được bản gốc, và đây là một thử nghiệm A/B đơn lẻ trên một trang (C, chưa kiểm chứng). Không dùng làm quy tắc. Với tiếng Việt, ngôi thứ nhất trên nút ("Tôi muốn nhận tài liệu") đôi khi tự nhiên, đôi khi gượng; ưu tiên câu tự nhiên.
- **CTA trên hình và CTA trong caption.** Ảnh bảng tin không bấm được: CTA trên hình là lời nhắc (có ngày và đường dẫn ngắn hoặc QR trên ấn phẩm in), còn liên kết thật nằm trong caption, nút quảng cáo hoặc sticker story (C).
- **Ngày cụ thể thay cho tần suất:** "Buổi gần nhất: thứ Bảy 12/10, 8:30-11:30" thay cho "Lớp diễn ra hằng tháng" (quy ước mặc định của xưởng; phù hợp nguyên tắc cụ thể 2.1).
- **Không upsell trên ấn phẩm:** CTA chỉ cho đúng sản phẩm đang giới thiệu; không "Mua thêm gói VIP" trên poster hay landing page (quy ước mặc định của xưởng).

---

## 5. Phân cấp thông tin: cái gì lên hình, cái gì ở caption

### 5.1 Thang tiêu đề, dòng phụ, chi tiết

Ba tầng, hiếm khi bốn (C-principles R1.2): tầng 1 tiêu đề (lời hứa hoặc câu mở), tầng 2 dòng phụ hoặc thông tin thực dụng (ngày, nơi), tầng 3 chi tiết (người hướng dẫn, ghi công, logo). Nếu cần tầng năm, nội dung cần biên tập lại, không phải thiết kế lại.

### 5.2 Quy tắc phân chia hình và caption

| Lên hình | Ở lại caption |
|---|---|
| một ý chính, câu mở | câu chuyện, ngữ cảnh, lập luận |
| tên chương trình, ngày, giờ, nơi (nếu là sự kiện) | lịch chi tiết, chi phí, điều kiện |
| tên người hướng dẫn, logo | học vị đầy đủ, tiểu sử |
| tên framework và tác giả (dạng gọn) | ghi công đầy đủ, nguồn khoa học, DOI |
| lời nhắc hành động ngắn | liên kết thật, hashtag |
| | câu hỏi mở kết bài |

Cơ sở: hình cho nhận diện và dừng lướt; caption cho đọc có chủ ý. Cách chia này cũng giúp tiếp cận và tìm kiếm (5.3) (C cho cách chia; A cho phần tiếp cận).

### 5.3 Tiếp cận: chữ trong hình là chữ "đóng băng"

- WCAG 2.x tiêu chí 1.4.5 Hình ảnh chứa chữ [Images of Text] (mức AA): nếu công nghệ cho phép, dùng chữ thật thay cho hình ảnh chứa chữ, trừ logo và trường hợp hình thức là thiết yếu; lý do: người thị lực kém, người khó theo dòng, người có khó khăn nhận thức cần chỉnh cỡ chữ, khoảng cách, màu (W3C) (A).
- Hướng dẫn Images Tutorial của W3C WAI: văn bản thay thế cho hình chứa chữ phải chứa đúng chữ trên hình; không mô tả hiệu ứng trang trí (A).
- **Hệ quả:** (1) mọi ảnh đăng mạng xã hội có alt text chứa đúng chữ in trên hình (Facebook, Instagram, LinkedIn đều cho nhập alt text thủ công); (2) thông tin thiết yếu (ngày, nơi, cách đăng ký) luôn lặp lại trong caption; (3) trên web, tiêu đề và nút là HTML thật, không nướng vào ảnh (chuan/02) (A).

### 5.4 Đặc thù tiếng Việt

- Ngắt dòng theo cụm nghĩa, không để tách từ hai âm tiết (*chánh / niệm*), tên riêng, số với đơn vị, chức danh với tên (C-principles R3.8; không tìm được chuẩn W3C hay quốc gia cho ngắt dòng tiếng Việt) (C).
- Không để một tiếng đứng một mình ở dòng cuối tiêu đề (C).
- Ngắt tiêu đề theo nhịp đọc: "Trở về với hơi thở / để nghe thân thể nói" (C).
- Không Title Case; câu viết hoa chữ đầu hoặc FULL-CAP ngắn; không gạch dài, dùng gạch ngang thường hoặc dấu hai chấm (quy ước mặc định của xưởng).
- Dấu chồng là chi tiết mất đầu tiên khi ảnh bị nén; chữ trên hình cần đủ cỡ, đủ đậm, tương phản bằng độ sáng (chuan/02) (B).

---

## 6. Câu chữ theo khoảng cách và thể thức

### 6.1 Quảng cáo ngoài trời và quy tắc "bảy từ"

- Hướng dẫn sáng tạo của Clear Channel Outdoor: "một từ cho mỗi giây phơi sáng", "bảy từ trở xuống"; màn kỹ thuật số hiển thị khoảng 8 giây; chữ cao ít nhất 1 foot để đọc ở khoảng 500 feet (B, hướng dẫn ngành, không trích nghiên cứu). Meadow Outdoor gọi "bảy từ trở xuống" là "quy tắc vàng" và cũng không dẫn nguồn (C).
- Tôi không tìm được nghiên cứu gốc của OAAA hay học thuật xác lập con số 7; nó là quy ước nghề (C). Nghiên cứu học thuật về biển quảng cáo chủ yếu đo khả năng gây chú ý và an toàn giao thông, ví dụ Wilson và Casper (2016) về vị trí và độ nổi bật thị giác ảnh hưởng đến khả năng tài xế nhận thấy biển (A), không đo số từ tối ưu.
- Tỉ lệ chiều cao chữ theo khoảng cách có nhiều quy ước lệch nhau: Clear Channel ngụ ý khoảng 1/500; báo cáo B tổng hợp "1 inch chiều cao chữ hoa cho mỗi 10 feet" (khoảng 1 cm mỗi 3 m) là ngưỡng đọc được, đọc thoải mái khoảng 1 cm mỗi 1,5-2 m (B/C). Dùng mức thận trọng của báo cáo B cho sự kiện trong nhà.

### 6.2 Poster đọc từ xa (A3, A2)

Poster được xem hai lần: lần lướt từ 2-5 m (chỉ thấy tiêu đề, hình) và lần đứng đọc ở 0,5-1 m (đọc ngày, nơi, QR). Viết cho cả hai: tiêu đề đọc được trong 2-3 giây từ xa; khối thông tin thực dụng gom một chỗ (C). Giữ đúng các yếu tố người xem kỳ vọng ở một poster: tiêu đề, ngày, nơi, ai, cách đăng ký (C-principles R1.11).

### 6.3 Standee và roll-up

Người xem thường đi ngang qua ở 1-3 m. Tiêu đề ở 2/3 phía trên (phần dưới 15 cm có thể chui vào hộp cuốn, báo cáo B); thông tin theo thứ tự đọc từ trên xuống; một QR ở độ cao ngực (C).

### 6.4 Phông sân khấu

- Nguồn thực hành Việt Nam: người xem có 3-5 giây, chữ không chân, tương phản cao, đặt logo nơi không bị người nói, bục che (báo cáo B, thegioibackdrop) (C).
- Phông còn là nền ảnh chụp: chữ quan trọng không đặt ở vùng ngang đầu người đứng (người nói sẽ che), tên sự kiện ở phần trên (C).
- Nội dung: tên chương trình, dòng phụ (chủ đề), ngày và nơi, đơn vị tổ chức, đồng hành. Không đặt nội dung bài giảng, không đặt CTA bán hàng.

### 6.5 Màn LED sân khấu

Màn LED đổi theo phiên: màn chờ (tên chương trình, phiên hiện tại, giờ), màn giới thiệu diễn giả (tên, vai trò), màn trích dẫn (một câu, có ghi tác giả). Một màn tối đa khoảng 6 dòng, chữ lớn, nền tối chữ sáng để giảm chói trên máy quay (C, suy từ báo cáo B về LED).

### 6.6 Thẻ đeo

- Hướng dẫn của 4over4 (nhà in): tên gọi 28-36 pt đậm đọc được ở khoảng 1,8 m; họ 20-24 pt; tổ chức 14-16 pt; chức danh 12-14 pt; in hai mặt hoặc dùng dây chống lật (B, kinh nghiệm nhà in, không dẫn nghiên cứu).
- Tiếng Việt: người Việt gọi nhau bằng tên (âm tiết cuối) nên **tên gọi** in lớn nhất, sau đó là họ tên đầy đủ (C). Ví dụ: "AN" lớn, "Nguyễn Minh An" nhỏ hơn, "Người hướng dẫn" nhỏ hơn nữa.
- Vai trò ghi theo chức năng trong sự kiện (Học viên, Người hướng dẫn, Ban tổ chức, Tình nguyện viên), có thể kèm màu phân biệt; tên sự kiện nhỏ ở đỉnh thẻ (C).

### 6.7 Giấy chứng nhận

- Không tìm được chuẩn quốc tế về câu chữ trên giấy chứng nhận khoá học ngắn hạn; đây là quy ước (C).
- Bối cảnh Việt Nam: "văn bằng, chứng chỉ" là khái niệm của hệ thống giáo dục quốc dân, được quản lý theo Luật Giáo dục 2019 và Thông tư 21/2019/TT-BGDĐT về quy chế quản lý văn bằng, chứng chỉ. Với workshop, khoá phát triển cá nhân, an toàn hơn khi dùng "Giấy chứng nhận hoàn thành" hoặc "Giấy chứng nhận tham dự" thay vì "Chứng chỉ" (C; nhận định của người viết, nên hỏi ý kiến pháp lý trước khi in số lượng lớn).
- Cấu trúc thường gặp: tên đơn vị cấp; tiêu đề (GIẤY CHỨNG NHẬN); câu chứng nhận ("Chứng nhận anh/chị [Họ và tên] đã hoàn thành chương trình [Tên chương trình], thời lượng [số] giờ, từ ngày ... đến ngày ..."); nội dung chính hoặc phương pháp và ghi công tác giả framework; địa điểm và ngày cấp ("TP. Hồ Chí Minh, ngày ... tháng ... năm ..."); chữ ký, họ tên, vai trò người ký; số hiệu để tra cứu (C).
- Ghi đúng thời lượng thật, không gán danh hiệu ngụ ý năng lực hành nghề nếu khoá không đào tạo hành nghề (đạo đức, C).

### 6.8 Handout và phiếu thực hành

Handout là thể thức duy nhất trong danh sách mà người xem có thời gian đọc. Áp nguyên lý học đa phương tiện (mục 7): mỗi trang một nhiệm vụ, tiêu đề nói rõ mục đích, hướng dẫn đánh số, chừa chỗ viết, ghi công tác giả công cụ, câu hỏi phản tư ở cuối. Dùng ngôn ngữ hỗ trợ tự chủ cho lời dẫn bài tập (3.3).

---

## 7. Tri thức trên hình

- **Mã hoá kép** [dual coding] (Paivio, 1986; Clark & Paivio, 1991): thông tin được mã hoá cả bằng lời và hình được nhớ tốt hơn (A).
- **Nguyên lý học đa phương tiện** (Mayer, 2020) áp cho ấn phẩm tĩnh: mạch lạc (bỏ chữ, hình không liên quan), báo hiệu (đánh số, màu nhấn cho cấu trúc), liền kề không gian (nhãn sát phần hình nó mô tả), phân đoạn (chia nhỏ theo nhịp người học), dư thừa (không chép cùng một đoạn dài ở hai chỗ) (A). Noetel và cộng sự (2022) tổng hợp 29 tổng quan: liền kề và báo hiệu có hiệu ứng lớn nhất, thiết kế tốt quan trọng hơn với tài liệu phức tạp (A). Schneider và cộng sự (2018): báo hiệu cải thiện ghi nhớ và chuyển giao (A). Sundararajan và Adesope (2020): chi tiết hấp dẫn nhưng không liên quan [seductive details] làm hại việc học (A).
- **Tránh chữ trang trí:** câu trích dẫn đẹp nhưng không liên quan, chữ mờ làm hoạ tiết nền, chữ nước ngoài làm "không khí" đều là chi tiết hấp dẫn không liên quan (A, suy từ Sundararajan & Adesope).
- **Nhãn sơ đồ:** gọi tên từng bước ngay trên hình, động từ hoặc danh từ ngắn, một dòng mô tả; số thứ tự chỉ khi có thứ tự thật; tên framework và tác giả ở góc (C-principles R6.2, R6.6) (A/C).
- **Đặt tri thức thành câu hỏi:** tiêu đề tri thức dạng câu hỏi có thể mời người học tự tìm câu trả lời trước khi đọc, nhưng chú ý phát hiện của Fang và Wheeler (2026): câu hỏi trống làm giảm cảm nhận thông tin. Cách dung hoà: câu hỏi + nội dung trả lời ngay trên cùng khung ("Vì sao thở ra dài giúp dịu lại? Vì thở ra kích hoạt phanh của hệ thần kinh") (C cho cách dung hoà; tôi chưa tìm được nghiên cứu riêng về câu hỏi trên infographic).
- **Tiêu đề nói điều cần hiểu:** Borkin và cộng sự (2016) thấy tiêu đề và chữ đi kèm là nơi người xem lấy thông điệp của hình (A, đã kiểm ở báo cáo C). Tiêu đề kết luận ("Thân phản ứng trước khi tâm kịp gọi tên") tốt hơn tiêu đề chủ đề ("Về phản ứng cơ thể").

---

## 8. Các khung viết quảng bá và cách điều chỉnh

| Khung | Nguồn gốc | Nhận xét | Với người dùng |
|---|---|---|---|
| **AIDA** (chú ý, quan tâm, mong muốn, hành động) | Strong (1925) mô tả và gán cho E. St. Elmo Lewis (A cho nguồn lịch sử; tôi chưa đọc được bài nghiên cứu lịch sử của Iwamoto về gốc AIDA) | mô hình tuyến tính kiểu bán hàng, ít bằng chứng rằng người xem đi đúng bốn bước | **điều chỉnh**: dùng như danh mục kiểm tra (đã có điểm dừng lướt chưa, có hành động chưa), không như kịch bản tạo "mong muốn" |
| **PAS** (vấn đề, khuấy động, giải pháp) | nguồn gốc không truy được (C) | bước "khuấy động" [agitate] là chỗ sinh ra dọa dẫm | **điều chỉnh** thành **Nhận diện, Đồng cảm, Lối mở**: gọi tên trải nghiệm cụ thể, ghi nhận nó là phổ biến và dễ hiểu, mời một bước nhỏ |
| **4U** (hữu ích, khẩn cấp, độc đáo, siêu cụ thể) | thường gán cho Michael Masterson và AWAI; chưa kiểm được nguồn gốc (C) | chữ U "khẩn cấp" dễ thành khẩn cấp giả | **giữ 3U** (hữu ích, độc đáo, cụ thể vừa đủ); thay khẩn cấp bằng **kịp thời có thật** (hạn ngày cụ thể, mùa, sự kiện) |
| **FAB** (đặc điểm, lợi thế, lợi ích) | thực hành đào tạo bán hàng, chưa kiểm được nguồn gốc (C) | hữu ích để chuyển "khoá có 6 buổi" thành điều người học nhận | **dùng**, nhưng lợi ích nói bằng trải nghiệm thật ("ngủ dễ hơn sau 2 tuần" chỉ khi có dữ liệu), không hứa kết quả trị liệu |
| **Message house** (ngôi nhà thông điệp: mái là thông điệp chính, cột là thông điệp hỗ trợ, móng là bằng chứng) | công cụ truyền thông, quan hệ công chúng; chưa tìm được nguồn gốc học thuật (C) | rất hợp để đồng bộ nhiều thể thức của một chương trình | **dùng** cho mọi chiến dịch nhiều ấn phẩm: mái lên phông, poster; cột thành các bài bảng tin; móng (nghiên cứu, ghi công) ở caption, handout |
| **Jobs-to-be-done** | Christensen, Hall, Dillon và Duncan (2016) | hỏi người học "thuê" chương trình để làm việc gì trong đời họ | **dùng** ở bước tìm thông điệp; phù hợp tinh thần lấy người học làm trung tâm |

Nguyên tắc chung khi điều chỉnh: giữ phần khung giúp **rõ ràng** (thứ tự, cụ thể, có bằng chứng), loại phần khung tạo **áp lực** (khuấy động, khẩn cấp giả, mong muốn nhân tạo).

---

## 9. Kiểm thử và đánh giá

- **Kiểm 5 giây** [5-second test]: cho người xem nhìn 5 giây rồi hỏi ấn phẩm nói gì, cần làm gì. Christine Perfetti (User Interface Engineering) phổ biến phương pháp này khoảng năm 2005 (B; bài gốc hiện đăng lại trên Center Centre); công cụ trực tuyến phổ biến là UsabilityHub, nay đổi tên thành Lyssna (yêu cầu ghi "Lyft" có lẽ là nhầm với Lyssna). Gronier (2016, Journal of Usability Studies): 5 giây đủ để thu ấn tượng đầu và chất lượng yếu tố thiết kế, nhưng phần lớn vấn đề khả dụng chỉ lộ ra sau đó (B). Với ấn phẩm tĩnh, kiểm 5 giây rất hợp vì người xem thật cũng chỉ có vài giây.
- **Kiểm nheo mắt** [squint test]: nheo hoặc làm mờ đến khi không đọc được chữ; cái còn thấy là phân cấp thật (C, thực hành, không có nghiên cứu kiểm định).
- **Kiểm cỡ thật:** xem ảnh bảng tin ở bề ngang khoảng 375 px, thumbnail ở 160-360 px; in thử poster A4 rồi đứng ở khoảng cách quy đổi (C).
- **Đọc to:** đọc to chữ trên hình bằng giọng người dùng; câu nào nghe như quảng cáo hay như máy viết thì sửa (C). Rà thêm danh mục sáo ngữ văn AI ở PHONG-CACH mục 4.
- **Kiểm đạo đức:** đối chiếu danh sách 3.1 và 10.2 (C).
- **A/B với khán giả nhỏ:** Kohavi, Tang và Xu (2020) nhấn mạnh thử nghiệm có kiểm soát cần đủ cỡ mẫu để phát hiện khác biệt; khác biệt nhỏ cần rất nhiều người xem, và nhìn kết quả sớm làm tăng dương tính giả (A). Với một trang cá nhân vài nghìn lượt xem, chỉ khác biệt rất lớn mới đáng tin; kết luận "mẫu B thắng" từ vài trăm lượt hiển thị thường là nhiễu (A cho nguyên tắc). Khuyến nghị: dùng kiểm 5 giây định tính với 5-8 người đúng đối tượng; dùng công cụ thử của nền tảng (YouTube Test & Compare, tối đa 3 phương án, xếp hạng theo thời lượng xem) khi có đủ lượt hiển thị (A).

---

## 10. Đối chiếu với hệ giá trị mặc định của xưởng (nhân bản, tôn trọng tự chủ)

### 10.1 Dùng

- Ngôn ngữ hỗ trợ tự chủ, lời mời có thể từ chối, câu tái khẳng định tự do ("Bạn tự chọn nhịp của mình") (Vansteenkiste và cộng sự, 2004; Miller và cộng sự, 2007). Khớp với tinh thần nhân bản và đồng sáng tạo.
- Chữ trôi chảy, dễ đọc cho mọi lời mời thực hành (Song & Schwarz, 2008): tôn trọng người xem, không đặt rào cản.
- Cụ thể vừa đủ, gọi tên trải nghiệm thân thể cụ thể (vai, hơi thở, nhịp tim). Khớp với các tiếp cận lấy trải nghiệm thân thể làm trung tâm: chữ chạm vào thân trước khi chạm vào khái niệm.
- Khung được, khổ đau được ghi nhận kèm lối mở (Gallagher & Updegraff, 2012; tinh thần trắc ẩn).
- Câu hỏi thật, nhất là ở cuối caption; trên hình chỉ khi câu hỏi mang thông tin.
- Ghi công tác giả framework trên hình (dạng gọn) và trong caption (đầy đủ).
- Alt text đầy đủ, thông tin thiết yếu lặp trong caption: tiếp cận là một dạng trắc ẩn hướng tới người khác.
- Message house, jobs-to-be-done, FAB, 3U như công cụ làm rõ.

### 10.2 Điều chỉnh

- **AIDA** thành danh mục kiểm tra, không thành kịch bản tạo mong muốn.
- **PAS** thành Nhận diện, Đồng cảm, Lối mở.
- **4U** thành 3U cộng kịp thời có thật.
- **Khoảng trống tò mò** chỉ dùng khi nội dung lấp được đầy đủ, không chạm vào lo âu.
- **Bằng chứng xã hội** chỉ với lời thật, có đồng ý, có ngày; con số học viên chỉ khi đúng và có mốc thời gian.
- **Khan hiếm** nói bằng lý do sư phạm định tính ("lớp nhỏ để mỗi người được hướng dẫn riêng") và hạn ngày cụ thể; không bao giờ nêu số ghế.
- **Tự quy chiếu "bạn"**: có chừng mực, tránh chuỗi câu hỏi "Bạn có...? Bạn có...?" kiểu kịch bản bán hàng.

### 10.3 Loại bỏ

- Khung sợ bị bỏ lại, so bì, đua tranh ("Đừng để con bạn thua ngay từ vạch xuất phát").
- Khẩn cấp giả, đồng hồ đếm ngược, "chỉ còn X suất", "giá tăng sau 24 giờ" khi không thật.
- Làm xấu hổ người từ chối ("Không, tôi không quan tâm đến hạnh phúc của mình").
- Lời chứng thực, con số, ảnh khuôn mặt bịa hoặc do AI tạo đóng vai người thật.
- Tận dụng từ tiêu cực để tăng nhấp (Robertson và cộng sự, 2023), dù dữ liệu cho thấy nó hiệu quả.
- Upsell trên ấn phẩm quảng bá, landing page.
- Biệt ngữ chuyên môn làm tiêu đề (Shulman và cộng sự, 2020).
- Ngôn ngữ ra lệnh dày đặc ("phải", "bắt buộc", chuỗi "hãy").
- Cụm sáo kiểu văn máy (hành trình, kỷ nguyên, chìa khoá, đột phá, vượt trội, "hãy cùng"), gạch dài, Title Case.

### 10.4 Một ví dụ chuyển đổi trọn vẹn

Bản ban đầu (poster workshop): "ĐỪNG ĐỂ STRESS HỦY HOẠI CUỘC SỐNG CỦA BẠN! Hành trình chữa lành đột phá. Chỉ còn 5 suất. Đăng ký ngay!"

Bản điều chỉnh:
- Tiêu đề: "Khi thân thể lên tiếng trước lời nói"
- Dòng phụ: "Buổi thực hành soma cho người làm nghề chăm sóc"
- Thông tin: "Thứ Bảy 12/10 · 8:30-11:30 · Quận 3, TP.HCM"
- Hành động: "Đăng ký trước 05/10 · [QR] · tenmien.vn/thuc-hanh"
- Người hướng dẫn: "TS Nguyễn Minh An / Chuyên gia tâm lý học thực hành" (nguyên văn theo `phong-cach/PHONG-CACH.md` mục 1)
- Dòng ghi công: tên phương pháp kèm tên tác giả, người đồng phát triển, cách viết lấy theo PHONG-CACH hoặc hỏi người dùng
- Caption: câu chuyện, lý do lớp nhỏ, nguồn khoa học, câu hỏi mở cuối bài.

(Ví dụ minh hoạ cách viết; địa điểm, đường dẫn là giả định, cần thay bằng thông tin thật.)

---

## 11. Giới hạn và những điều chưa kiểm chứng

- Con số "1,7 giây điện thoại, 2,5 giây máy tính" của Facebook IQ: chỉ thấy nguồn thứ cấp.
- Trang trợ giúp của Meta về chữ trên ảnh quảng cáo: bị chặn khi đọc tự động; dựa vào nguồn thứ cấp (Jon Loomer, Hootsuite).
- Nguồn gốc "quy tắc 7 từ" của biển quảng cáo: không tìm được nghiên cứu hay văn bản OAAA gốc.
- Thử nghiệm "my/your" trên nút của ContentVerve: chỉ thấy blog kể lại.
- Tóm tắt Burnkrant & Unnava (1995) và Taylor, Franke & Bang (2006): xác minh được thư mục, không mở được tóm tắt.
- Nguồn gốc PAS, 4U, FAB, message house: không truy được tác giả gốc đáng tin.
- Bài của Iwamoto về gốc AIDA: thấy tên, không mở được.
- Năm xuất bản sách của Santacroce: lấy theo bản in trên Amazon (2021), chưa kiểm trang bản quyền.
- Phản biện về Robertson và cộng sự (2023) trên Journal of Robustness Reports: chưa đọc.
- Không tìm được nghiên cứu nào về chữ trên ảnh mạng xã hội bằng tiếng Việt, về ngắt dòng tiếng Việt, hay về ảnh hưởng của dấu chồng in hoa lên tốc độ đọc.
- Các định mức số chữ trong bảng dưới đây là tổng hợp của người viết (C), không phải chuẩn đã kiểm định.
- Quy đổi từ tiếng Anh sang tiếng Việt (1 từ ≈ 1,3-1,7 tiếng) là ước lượng của người viết.
- Nhận định về chữ "Chứng chỉ" trên giấy chứng nhận khoá ngắn hạn là suy luận từ tên văn bản pháp luật, không phải tư vấn pháp lý.

---

## Nguồn

Ahluwalia, R., & Burnkrant, R. E. (2004). Answering questions about questions: A persuasion knowledge perspective for understanding the effects of rhetorical questions. *Journal of Consumer Research, 31*(1), 26-42. https://doi.org/10.1086/383421

Alter, A. L., & Oppenheimer, D. M. (2009). Uniting the tribes of fluency to form a metacognitive nation. *Personality and Social Psychology Review, 13*(3), 219-235. https://doi.org/10.1177/1088868309341564

Arditi, A., & Cho, J. (2007). Letter case and text legibility in normal and low vision. *Vision Research, 47*(19), 2499-2505. https://doi.org/10.1016/j.visres.2007.06.010 (bản PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC2016788)

Blom, J. N., & Hansen, K. R. (2015). Click bait: Forward-reference as lure in online news headlines. *Journal of Pragmatics, 76*, 87-100. https://doi.org/10.1016/j.pragma.2014.11.010

Borkin, M. A., Bylinskii, Z., Kim, N. W., Bainbridge, C. M., Yeh, C. S., Borkin, D., Pfister, H., & Oliva, A. (2016). Beyond memorability: Visualization recognition and recall. *IEEE Transactions on Visualization and Computer Graphics, 22*(1), 519-528. https://doi.org/10.1109/TVCG.2015.2467732

Brehm, J. W. (1966). *A theory of psychological reactance*. Academic Press.

Brignull, H. (2023). *Deceptive patterns: Exposing the tricks tech companies use to control you*. Testimonium. Trang phân loại: https://deceptive.design/

Burnkrant, R. E., & Unnava, H. R. (1995). Effects of self-referencing on persuasion. *Journal of Consumer Research, 22*(1), 17-26. https://doi.org/10.1086/209432

Christensen, C. M., Hall, T., Dillon, K., & Duncan, D. S. (2016). Know your customers' "jobs to be done." *Harvard Business Review, 94*(9), 54-62. https://hbr.org/2016/09/know-your-customers-jobs-to-be-done

Cialdini, R. B. (2021). *Influence, new and expanded: The psychology of persuasion*. Harper Business.

Clark, J. M., & Paivio, A. (1991). Dual coding theory and education. *Educational Psychology Review, 3*(3), 149-210. https://doi.org/10.1007/BF01320076

Clear Channel Outdoor. (n.d.). *Tips for creating effective OOH* (Creative resources). Bản lưu: https://www.projectyellowlight.com/wp-content/uploads/2024/10/OOH_Best_Practices.pdf

Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. *Behavioral and Brain Sciences, 24*(1), 87-114. https://doi.org/10.1017/S0140525X01003922

Fang, D., & Wheeler, S. C. (2026). Titles framed as questions reduce reader engagement. *Journal of Consumer Psychology*. Advance online publication. https://doi.org/10.1002/jcpy.70031

Federal Trade Commission. (2022). *Bringing dark patterns to light* (Staff report). https://www.ftc.gov/reports/bringing-dark-patterns-light

4over4. (n.d.). *Conference badge design that reads at six feet*. https://www.4over4.com/guide/how-to-design-unique-conference-badges-that-stand-out

Gallagher, K. M., & Updegraff, J. A. (2012). Health message framing effects on attitudes, intentions, and behavior: A meta-analytic review. *Annals of Behavioral Medicine, 43*(1), 101-116. https://doi.org/10.1007/s12160-011-9308-7

Google India Blog. (2024, December 18). *Strengthening enforcement against egregious clickbait on YouTube*. https://blog.google/intl/en-in/products/platforms/strengthening-enforcement-against-egregious-clickbait-on-youtube/

Gray, C. M., Kou, Y., Battles, B., Hoggatt, J., & Toombs, A. L. (2018). The dark (patterns) side of UX design. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (Paper 534). ACM. https://doi.org/10.1145/3173574.3174108

Gronier, G. (2016). Measuring the first impression: Testing the validity of the 5 second test. *Journal of Usability Studies, 12*(1). https://dl.acm.org/doi/10.5555/3040226.3040228

Hagtvedt, H. (2015). Promotional phrases as questions versus statements: An influence of phrase style on product evaluation. *Journal of Consumer Psychology, 25*(4). https://doi.org/10.1016/j.jcps.2014.12.005

Kohavi, R., Tang, D., & Xu, Y. (2020). *Trustworthy online controlled experiments: A practical guide to A/B testing*. Cambridge University Press. https://doi.org/10.1017/9781108653985

Lai, L., & Farbrot, A. (2014). What makes you click? The effect of question headlines on readership in computer-mediated communication. *Social Influence, 9*(4), 289-299. https://doi.org/10.1080/15534510.2013.847859

Le Quéré, M. A., & Matias, J. N. (2025). When curiosity gaps backfire: Effects of headline concreteness on information selection decisions. *Scientific Reports, 15*, Article 994. https://doi.org/10.1038/s41598-024-81575-9

Lindgaard, G., Fernandes, G., Dudek, C., & Brown, J. (2006). Attention web designers: You have 50 milliseconds to make a good first impression! *Behaviour & Information Technology, 25*(2), 115-126. https://doi.org/10.1080/01449290500330448

Loewenstein, G. (1994). The psychology of curiosity: A review and reinterpretation. *Psychological Bulletin, 116*(1), 75-98. https://doi.org/10.1037/0033-2909.116.1.75

Loomer, J. (2020). *Facebook removes 20 percent text rule for ads*. https://www.jonloomer.com/facebook-text-rule-ads-change/

Luật Bảo vệ quyền lợi người tiêu dùng số 19/2023/QH15. (2023). Quốc hội nước Cộng hoà xã hội chủ nghĩa Việt Nam.

Luật Giáo dục số 43/2019/QH14. (2019). Quốc hội nước Cộng hoà xã hội chủ nghĩa Việt Nam.

Mathur, A., Acar, G., Friedman, M. J., Lucherini, E., Mayer, J., Chetty, M., & Narayanan, A. (2019). Dark patterns at scale: Findings from a crawl of 11K shopping websites. *Proceedings of the ACM on Human-Computer Interaction, 3*(CSCW), Article 81. https://doi.org/10.1145/3359183

Mayer, R. E. (2020). *Multimedia learning* (3rd ed.). Cambridge University Press. https://doi.org/10.1017/9781316941355

Meadow Outdoor. (n.d.). *Outdoor advertising design guidelines*. https://www.meadowoutdoor.com/creative-services/design-guidelines

Miller, C. H., Lane, L. T., Deatrick, L. M., Young, A. M., & Potts, K. A. (2007). Psychological reactance and promotional health messages: The effects of controlling language, lexical concreteness, and the restoration of freedom. *Human Communication Research, 33*(2), 219-240. https://doi.org/10.1111/j.1468-2958.2007.00297.x

Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. *Psychological Review, 63*(2), 81-97. https://doi.org/10.1037/h0043158

Moran, K. (2019, March 24). *Better link labels: 4Ss for encouraging clicks*. Nielsen Norman Group. https://www.nngroup.com/articles/better-link-labels/

Nielsen, J. (2009, April 6). *First 2 words: A signal for the scanning eye*. Nielsen Norman Group. https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/

Noetel, M., Griffith, S., Delaney, O., Harris, N. R., Sanders, T., Parker, P., del Pozo Cruz, B., & Lonsdale, C. (2022). Multimedia design for learning: An overview of reviews with meta-meta-analysis. *Review of Educational Research, 92*(3), 413-454. https://doi.org/10.3102/00346543211052329

Packard, G., & Berger, J. (2021). How concrete language shapes customer satisfaction. *Journal of Consumer Research, 47*(5), 787-806. https://doi.org/10.1093/jcr/ucaa038

Paivio, A. (1986). *Mental representations: A dual coding approach*. Oxford University Press.

Perfetti, C. (2005). *5-second tests: Measuring your site's content pages*. User Interface Engineering. Bản đăng lại: https://articles.centercentre.com/five_second_test/

Pernice, K. (2017, November 12). *F-shaped pattern of reading on the web: Misunderstood, but still relevant (even on mobile)*. Nielsen Norman Group. https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/

Rains, S. A. (2013). The nature of psychological reactance revisited: A meta-analytic review. *Human Communication Research, 39*(1), 47-73. https://doi.org/10.1111/j.1468-2958.2012.01443.x

Reber, R., Schwarz, N., & Winkielman, P. (2004). Processing fluency and aesthetic pleasure: Is beauty in the perceiver's processing experience? *Personality and Social Psychology Review, 8*(4), 364-382. https://doi.org/10.1207/s15327957pspr0804_3

Robertson, C. E., Pröllochs, N., Schwarzenegger, K., Pärnamets, P., Van Bavel, J. J., & Feuerriegel, S. (2023). Negativity drives online news consumption. *Nature Human Behaviour, 7*, 812-822. https://doi.org/10.1038/s41562-023-01538-4

Rosenberg, M. B. (2015). *Nonviolent communication: A language of life* (3rd ed.). PuddleDancer Press.

Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. *American Psychologist, 55*(1), 68-78. https://doi.org/10.1037/0003-066X.55.1.68

Santacroce, S. (2021). *Marketing like we're human: A radical business approach to get new clients with integrity and kindness*. Tự xuất bản. https://humane.marketing/marketing-like-were-human/

Scacco, J. M., & Muddiman, A. (2016). *Investigating the influence of "clickbait" news headlines*. Engaging News Project, Center for Media Engagement. https://mediaengagement.org/wp-content/uploads/2016/08/ENP-Investigating-the-Influence-of-Clickbait-News-Headlines.pdf

Schneider, S., Beege, M., Nebel, S., & Rey, G. D. (2018). A meta-analysis of how signaling affects learning with media. *Educational Research Review, 23*, 1-24. https://doi.org/10.1016/j.edurev.2017.11.001

Shulman, H. C., Dixon, G. N., Bullock, O. M., & Colón Amill, D. (2020). The effects of jargon on processing fluency, self-perceptions, and scientific engagement. *Journal of Language and Social Psychology, 39*(5-6), 579-597. https://doi.org/10.1177/0261927X20902177

Song, H., & Schwarz, N. (2008). If it's hard to read, it's hard to do: Processing fluency affects effort prediction and motivation. *Psychological Science, 19*(10), 986-988. https://doi.org/10.1111/j.1467-9280.2008.02189.x

Steindl, C., Jonas, E., Sittenthaler, S., Traut-Mattausch, E., & Greenberg, J. (2015). Understanding psychological reactance: New developments and findings. *Zeitschrift für Psychologie, 223*(4), 205-214. https://doi.org/10.1027/2151-2604/a000222

Strong, E. K. (1925). Theories of selling. *Journal of Applied Psychology, 9*(1), 75-86. https://doi.org/10.1037/h0070123

Sundararajan, N., & Adesope, O. (2020). Keep it coherent: A meta-analysis of the seductive details effect. *Educational Psychology Review, 32*, 707-734. https://doi.org/10.1007/s10648-020-09522-4

Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science, 12*(2), 257-285. https://doi.org/10.1207/s15516709cog1202_4

Symons, C. S., & Johnson, B. T. (1997). The self-reference effect in memory: A meta-analysis. *Psychological Bulletin, 121*(3), 371-394. https://doi.org/10.1037/0033-2909.121.3.371

Thông tư 21/2019/TT-BGDĐT ban hành Quy chế quản lý bằng tốt nghiệp trung học cơ sở, bằng tốt nghiệp trung học phổ thông, văn bằng giáo dục đại học và chứng chỉ của hệ thống giáo dục quốc dân. (2019). Bộ Giáo dục và Đào tạo.

Trương, D. (2015-2025). *Vietnamese typography*. https://vietnamesetypography.com

Tversky, A., & Kahneman, D. (1981). The framing of decisions and the psychology of choice. *Science, 211*(4481), 453-458. https://doi.org/10.1126/science.7455683

Vansteenkiste, M., Lens, W., & Deci, E. L. (2006). Intrinsic versus extrinsic goal contents in self-determination theory: Another look at the quality of academic motivation. *Educational Psychologist, 41*(1), 19-31. https://doi.org/10.1207/s15326985ep4101_4

Vansteenkiste, M., Simons, J., Lens, W., Sheldon, K. M., & Deci, E. L. (2004). Motivating learning, performance, and persistence: The synergistic effects of intrinsic goal contents and autonomy-supportive contexts. *Journal of Personality and Social Psychology, 87*(2), 246-260. https://doi.org/10.1037/0022-3514.87.2.246

W3C. (2023). *Understanding success criterion 1.4.5: Images of text* (WCAG 2.2). https://www.w3.org/WAI/WCAG22/Understanding/images-of-text

W3C Web Accessibility Initiative. (2022). *Images of text* (Images tutorial). https://www.w3.org/WAI/tutorials/images/textual/

Wilson, R. T., & Casper, J. (2016). The role of location and visual saliency in capturing attention to outdoor advertising: How location attributes increase the likelihood for a driver to notice a billboard ad. *Journal of Advertising Research, 56*(3), 259-273. https://doi.org/10.2501/JAR-2016-020

Xie, H., Zhou, Z., & Liu, Q. (2018). Null effects of perceptual disfluency on learning outcomes in a text-based educational context: A meta-analysis. *Educational Psychology Review, 30*, 745-771. https://doi.org/10.1007/s10648-018-9442-x

YouTube Help. (n.d.). *A/B test titles & thumbnails*. Google. https://support.google.com/youtube/answer/16391400

---

## Định mức gợi ý theo thể thức

Đếm theo **tiếng** (âm tiết). "Tiêu đề" là dòng lớn nhất; "tổng trên hình" không tính logo, QR, đường dẫn. Mọi con số là điểm xuất phát (C) dựa trên nguyên lý có mức chứng cứ ghi ở cột cuối; khi lõi `tools/ve.py` báo co chữ dưới 85%, bớt chữ thay vì thu nhỏ.

| Thể thức | Tiêu đề tối đa | Tổng trên hình | Lên hình | Ở caption hoặc nơi khác | Cơ sở, mức |
|---|---|---|---|---|---|
| Bài bảng tin 4:5, 1:1 | 10-12 tiếng | 30-35 tiếng (carousel: tới 50 tiếng mỗi slide tri thức) | câu mở hoặc ý chính, một dòng hỗ trợ, tên framework và tác giả dạng gọn, nhận diện thương hiệu; nếu là sự kiện: ngày, nơi | câu chuyện, lập luận, nguồn khoa học, liên kết, câu hỏi mở cuối bài, alt text chép đúng chữ trên hình | một khung một thông điệp (C); tải nhận thức (A); A-digital-specs 20-25 từ (C); WCAG 1.4.5 (A) |
| Story 9:16 | 8-10 tiếng | 20-25 tiếng mỗi khung | một ý, một hành động (sticker liên kết) trong vùng an toàn | chi tiết sang khung kế tiếp hoặc trang đích | vùng an toàn Meta (B); thời gian hiển thị ngắn (C) |
| Ảnh bìa trang (Facebook, LinkedIn, Zalo OA) | 6-8 tiếng | 12-20 tiếng | định vị một câu, tên, có thể một dòng chương trình hiện hành; tránh ngày tháng nếu không thay thường xuyên | tiểu sử, liên hệ, chương trình chi tiết ở phần giới thiệu | hiển thị bị cắt trên điện thoại (A-digital-specs, B); C |
| Thumbnail YouTube | 4-6 tiếng (3-5 từ) | 4-8 tiếng | một cụm từ bổ sung cho tiêu đề, khuôn mặt hoặc hình chủ thể; tránh góc phải dưới | tiêu đề video mang phần thông tin còn lại; không hứa điều video không có | YouTube tối ưu theo thời lượng xem, chống giật tít (A); số từ (C) |
| Ảnh chia sẻ web (OG 1200x630) | 8-10 tiếng | 12-15 tiếng | tên bài hoặc chương trình, nhận diện | og:title, og:description hiện ngay dưới ảnh; không lặp nguyên văn | A-digital-specs ≤10 từ (C) |
| Poster A3, A2 | 10-12 tiếng | 50-70 tiếng | tiêu đề, dòng phụ, ngày giờ nơi, người hướng dẫn, một CTA có QR và đường dẫn ngắn, ghi công | chương trình chi tiết, chi phí, chính sách ở trang đích | hai lần xem xa và gần (C); kỳ vọng thể loại (B, C-principles R1.11) |
| Standee, roll-up | 8-10 tiếng | 30-40 tiếng | tiêu đề ở 2/3 trên, ba đến năm dòng thông tin, QR ngang ngực; không gì quan trọng ở 15 cm cuối | tài liệu phát tay, trang đích | xem khi đi qua 1-3 m (C); "một từ mỗi giây" (B) |
| Phông sân khấu | 10-12 tiếng (tên chương trình) | 20-30 tiếng | tên chương trình, chủ đề, ngày và nơi, đơn vị tổ chức, đồng hành; chữ chính ở phần trên, tránh vùng ngang đầu người đứng | nội dung bài giảng lên LED, slide; CTA bán hàng: không đặt | xem 3-5 giây, nền ảnh chụp (C, báo cáo B); bảy từ trở xuống (B/C) |
| Màn LED sân khấu | 8-10 tiếng | 25-30 tiếng mỗi màn, tối đa khoảng 6 dòng | màn chờ: tên chương trình, phiên, giờ; màn diễn giả: tên, vai trò; màn trích dẫn: một câu và tác giả | slide chi tiết, handout | khoảng cách xem, một màn một ý (C); báo cáo B |
| Thẻ đeo | tên gọi 1-2 tiếng (lớn nhất) | 12-20 tiếng | tên gọi, họ tên đầy đủ, vai trò trong sự kiện, tổ chức; tên sự kiện nhỏ; in hai mặt | danh sách, lịch: in mặt sau hoặc tài liệu riêng | tên 28-36 pt đọc ở 1,8 m (B, 4over4); cách gọi tên của người Việt (C) |
| Giấy chứng nhận | 3-6 tiếng (GIẤY CHỨNG NHẬN) | 50-90 tiếng | đơn vị cấp, tiêu đề, câu chứng nhận có họ tên, tên chương trình, thời lượng, ngày, ghi công phương pháp, nơi và ngày cấp, chữ ký, số hiệu | nội dung khoá học chi tiết: phụ lục hoặc trang tra cứu | quy ước hành chính (C); tránh chữ "Chứng chỉ" cho khoá ngắn hạn (C, cần kiểm pháp lý) |
| Handout A4 | 8-12 tiếng | 200-350 tiếng mỗi trang phiếu thực hành (tới khoảng 500 cho trang đọc) | một nhiệm vụ mỗi trang, hướng dẫn đánh số, nhãn sát hình, chỗ viết, ghi công công cụ, câu hỏi phản tư | nguồn khoa học đầy đủ ở trang cuối hoặc mã QR | Mayer: mạch lạc, báo hiệu, liền kề, phân đoạn (A); số chữ (C) |
