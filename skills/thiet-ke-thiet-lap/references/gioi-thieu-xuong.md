# Giới thiệu xưởng cho người mới: nói gì, theo thứ tự nào

Kịch bản cho trợ lý AI khi người dùng vừa thiết lập xong, hoặc bất cứ lúc nào họ hỏi "xưởng làm được gì", "tôi nên dùng thế nào", "hướng dẫn tôi", "mới vào chưa biết bắt đầu từ đâu". Mục tiêu: sau khoảng 10 phút, người dùng hiểu xưởng làm ra được gì cho họ, biết một ấn phẩm đi qua những bước nào, nắm vài thói quen dùng hiệu quả, và có một bước đầu tiên cụ thể để làm ngay.

## Nguyên tắc trình bày

- **Có hệ thống, nhưng từng chặng một.** Sáu chặng dưới đây theo thứ tự cố định. Mỗi lượt chỉ nói một chặng (vài đoạn ngắn), rồi hỏi một câu để người dùng chọn đi tiếp, đi sâu hay bỏ qua. Không đổ cả danh mục một lần.
- **Lời thường, không thuật ngữ kỹ thuật.** Không nhắc Playwright, CDP, CMYK, ICC, sandbox trừ khi người dùng hỏi. Nói theo thứ họ sẽ thấy: "bản nháp", "tờ tổng thể", "Bàn thiết kế", "bản cuối".
- **Cá nhân hoá bằng `phong-cach/PHONG-CACH.md`.** Ấn phẩm họ hay làm (mục 2) đưa lên đầu ở chặng 2, ví dụ lấy từ lĩnh vực và chương trình của họ.
- **Chỉ nói điều xưởng thật sự có.** Nguồn sự thật: bảng skill trong `CLAUDE.md`, `README.md`, `HUONG-DAN.md`, `khuon/README.md`. Không hứa tính năng chưa có.
- **Người dùng vắng mặt hoặc muốn bỏ qua:** tóm tắt chặng 1 và 6 trong một tin nhắn, ghi dấu đã giới thiệu, nói họ gọi lại bằng câu "giới thiệu lại xưởng".

## Chặng 1. Xưởng là gì, và ba lời hứa

Một câu mở đầu: "Bạn nói bằng lời thường mình cần ấn phẩm gì, cho ai, đăng ở đâu; mình lo phần thiết kế đúng chuẩn, dựng ra mọi khổ cần thiết, và bạn duyệt bằng mắt."

Ba lời hứa, mỗi lời một hai câu:

1. **Mọi ấn phẩm mang dấu ấn của bạn.** Tên, chức danh nguyên văn, màu, logo, giọng chữ vừa thiết lập được áp đều cho mọi ấn phẩm; đổi bằng một câu nói.
2. **Một nội dung, mọi khổ.** Viết một lần, xưởng dựng ra bài vuông, bài dọc 4:5, story 9:16, ảnh ngang, ảnh bìa, cả khổ in và phông sân khấu, mỗi khổ tự chừa vùng bị nền tảng che.
3. **Chưa qua cổng kiểm thì chưa báo xong.** Máy kiểm chữ có lấn vùng bị che không, có quá nhỏ để đọc trên điện thoại không, tương phản đủ không, có từ ngữ bạn không dùng không; mình nhìn ảnh thật và soát từng chữ trước khi trình.

Thêm: **bạn luôn là người quyết.** Hai chốt duyệt bắt buộc (brief trước khi dựng, tờ tổng thể trước khi xuất bản cuối); và bạn tự tay sửa được mọi thứ trên Bàn thiết kế.

Kết chặng: "Bạn muốn xem xưởng làm ra được những gì không?"

## Chặng 2. Bản đồ năng lực: bạn cần gì, xưởng làm ra gì

Đưa các dòng khớp với PHONG-CACH lên đầu, các dòng còn lại gói trong một câu "ngoài ra xưởng còn...". Mỗi dòng kèm câu mẫu.

| Bạn cần | Xưởng làm ra | Khuôn, skill | Câu mẫu |
|---|---|---|---|
| Quảng bá khoá học, chương trình, sự kiện | Bộ thông cáo đủ khổ: feed, story, ảnh bìa trang, ảnh chia sẻ web | `thong-cao`, `lich-thong-tin`; skill `thiet-ke` | "Làm bộ ảnh thông cáo khoá X khai giảng 15/11 cho Facebook và story" |
| Giới thiệu bạn hay khách mời | Ảnh giới thiệu diễn giả, giảng viên (một hoặc hai người) | `gioi-thieu-chuyen-gia` | "Làm ảnh giới thiệu tôi làm diễn giả hội thảo Y" |
| Mở một chiến dịch bằng câu hỏi chạm người xem | Ảnh một câu hỏi lớn kèm chân dung | `cau-hoi-chan-dung`; skill `thiet-ke-chu` | "Làm ảnh câu hỏi mở chiến dịch cho khoá Z" |
| Lời mời, thư ngỏ, thư cảm ơn | Ảnh thư có chữ ký | `thu-ngo` | "Viết và thiết kế thư mời học viên cũ" |
| Hỏi đáp, lợi ích, các bước | Ảnh thẻ hỏi đáp có người trả lời | `hoi-dap` | "Làm ảnh ba câu hỏi thường gặp về khoá học" |
| Mô hình, quy trình, so sánh, số liệu của bạn | Sơ đồ tri thức vẽ bằng code (10 kiểu: chuỗi, hành trình, vòng lặp, tầng, trung tâm, radar, ma trận, lưới thẻ, so sánh, ảnh vẽ sẵn) | `so-do-tri-thuc`; skill `thiet-ke-hinh` | "Vẽ mô hình bốn bước của tôi thành ảnh vuông" |
| Một câu nói đáng nhớ | Ảnh trích dẫn thuần chữ | `trich-dan` | "Làm ảnh trích câu này của tôi" |
| Ảnh chân dung, ảnh lớp học chưa đẹp | Khám, chỉnh nhẹ có giới hạn an toàn, tách nền, đồng bộ màu cả bộ | skill `thiet-ke-hinh` | "Ảnh này tối và ám vàng, chỉnh giúp tôi" |
| Chữ trên ảnh quá nhiều, chưa biết viết gì | Chọn gì lên hình, gì để ở lời đăng; 2-3 phương án tiêu đề; cắt cho vừa từng khổ | skill `thiet-ke-chu` | "Tư vấn chữ cho ấn phẩm này" |
| Đồ in, đồ sự kiện | Chứng nhận, thẻ đeo, handout, poster, standee, roll-up, phông sân khấu, màn LED, photo wall; file in CMYK đúng chuẩn nhà in | `chung-nhan`, `the-deo`, `backdrop-su-kien`, `photo-wall`; skill `thiet-ke-in-su-kien` | "Làm phông sân khấu 6x3 m và thẻ đeo cho sự kiện" |
| Bài trình chiếu cho lớp học, hội thảo, Zoom | Slide PPTX sửa được trên Google Slides, PowerPoint, Keynote: sơ đồ gốc (15 kiểu, giảng từng chặng), biểu đồ, ảnh thật, ghi chú người nói, PDF chiếu dự phòng | skill `thiet-ke-slide` | "Làm slide cho buổi toạ đàm từ dàn ý này" |
| Tự sửa vài chỗ nhỏ | Bàn thiết kế trên trình duyệt: bấm chữ để sửa, kéo thả, đổi cỡ, thay ảnh, xuất ảnh | Bàn thiết kế | "Mở bàn thiết kế cho ấn phẩm này" |

Ba cách kết hợp phổ biến (chọn cách hợp với người dùng):

- **Một chương trình, một bộ nhận diện:** thông cáo, giới thiệu giảng viên, lịch khai giảng, hỏi đáp, rồi phông, thẻ đeo, chứng nhận ngày sự kiện, tất cả cùng một họ màu.
- **Một mô hình chuyên môn:** sơ đồ tri thức cho bài đăng, cùng sơ đồ trong bài trình chiếu (sửa được nhãn), bản in cho handout.
- **Một ý chiêm nghiệm:** ảnh trích dẫn kèm câu hỏi mở, lời đăng do bạn viết.

Kết chặng: "Bạn muốn xem một ấn phẩm đi từ đầu tới cuối trông thế nào không?"

## Chặng 3. Một ấn phẩm chạy thế nào

Kể năm bước, nhấn rõ ai làm gì (chi tiết ở `HUONG-DAN.md`):

1. **Bạn** nói nhu cầu (ai xem, đăng ở đâu, chữ nguyên văn nếu có) và đưa tư liệu (ảnh gốc, logo đối tác).
2. **Mình** lập brief trong thư mục dự án (`Du an/<tên dự án>/BRIEF.md`) và hỏi những gì còn thiếu. Đây là **chốt 1**; sửa ở đây rẻ nhất.
3. **Mình** dựng bản nháp mọi khổ và gửi **tờ tổng thể** (tất cả khổ cạnh nhau) kèm vài dòng giải thích. Bạn góp ý bằng lời, hoặc tự mở Bàn thiết kế sửa. Đây là **chốt 2**.
4. **Mình** xuất bản cuối (ảnh nét gấp đôi đúng chuẩn nền tảng; PDF in khi cần) vào `Thanh pham/<tên dự án>/`, kèm văn bản thay thế cho người khiếm thị và lưu ý khi đăng.
5. Góp ý đáng nhớ được ghi vào sổ tay để lần sau không lặp lại.

Nhắc: nơi mình chạy không có trình duyệt thì mình sẽ nhờ bạn bấm đúp `Dung tren may` một lần để máy bạn dựng (nếu đúng trường hợp của người dùng). Thời gian: một bộ 3-5 khổ thường 15-30 phút kể cả lúc bạn duyệt.

Kết chặng: "Mình nói thêm vài thói quen giúp xưởng ra kết quả tốt hơn nhé?"

## Chặng 4. Dùng hiệu quả nhất

Đọc `HUONG-DAN.md` mục "Dùng xưởng hiệu quả nhất" và nói lại bằng lời của mình. Chọn năm hoặc sáu thói quen quan trọng nhất cho người này, thường là:

- bắt đầu bằng một ấn phẩm thật, nhỏ, làm trọn một vòng tới bản cuối;
- nói ai xem, ở đâu, trong một câu;
- đưa chữ nguyên văn và ảnh gốc (không ảnh chụp màn hình, không ảnh đã nén qua ứng dụng nhắn tin);
- dành sức cho brief vì sửa ở đó rẻ nhất;
- góp ý cụ thể theo khổ ("story: tên to hơn"), và "chê một lần rồi dặn từ nay" để xưởng học;
- nghĩ cả bộ khổ ngay từ đầu, và dùng Bàn thiết kế cho chỉnh nhỏ.
- dùng skill của mình (đã lưu ở bước 6 của thiết lập): nói tự nhiên là đủ, muốn chắc thì gọi đích danh tên skill; luôn mở thư mục "AI Designer" vì đồ nghề nằm trong xưởng; muốn đổi quy trình thì nhờ trợ lý sửa skill trong xưởng rồi lưu lại bản mới.

Kết chặng: "Còn vài điều xưởng chưa làm, mình nói thẳng để bạn khỏi mất công thử."

## Chặng 5. Giới hạn, nói thẳng

Đọc `HUONG-DAN.md` mục "Xưởng không làm gì". Cần nói rõ: không tạo ảnh người, lớp học, sự kiện bằng AI; không sao chép thiết kế của người khác; không tự đăng lên nền tảng nào; không làm video, trang web; ảnh nguồn kém (tối, nhoè, độ phân giải thấp) thì chỉ cứu được một phần; Windows ít được kiểm hơn Mac. Nhờ thứ xưởng không có thì nói thẳng "xưởng chưa có", đề xuất cách gần nhất.

Kết chặng: "Giờ mình chọn việc đầu tiên nhé."

## Chặng 6. Chọn bước đầu tiên và khép lại

Hỏi một câu có lựa chọn: "Bạn muốn làm gì đầu tiên?", bốn lựa chọn sát người dùng nhất từ chặng 2, cộng "Để mình xem sau". Với lựa chọn đã chọn:

1. Nói rõ cần đưa gì (chữ, ảnh, logo đối tác, ngày giờ).
2. Đưa đúng câu họ sẽ nói (từ cột "Câu mẫu").
3. Nhắc nơi tìm hướng dẫn: `HUONG-DAN.md` cho việc hằng ngày, và câu "giới thiệu lại xưởng" để nghe lại phần này.
4. Ghi dấu đã giới thiệu: `python3 tools/cai-dat.py --danh-dau gioi-thieu`.

Kết bằng một câu hỏi mở thật, ví dụ: "Ấn phẩm nào bạn đang mong làm xong nhất trong tuần này?"

Xưởng do nhà giáo dục Lương Dũng Nhân (ldn.edu.vn) tạo ra và chia sẻ miễn phí; người dùng hỏi nguồn gốc thì nói như vậy và chỉ `GHI-CONG.md`.
