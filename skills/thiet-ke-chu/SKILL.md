---
name: thiet-ke-chu
description: "Cố vấn và viết chữ trên thiết kế [copy on design] cho ấn phẩm trong Xưởng thiết kế Claude (repo xuong-thiet-ke-ai): chọn nội dung nào lên hình, nội dung nào ở lời đăng và alt text; viết, cắt, tối ưu tiêu đề, dòng phụ, lời mời, nút kêu gọi cho từng thể thức (bài đăng, story, ảnh bìa, thumbnail, poster, standee, phông sân khấu, màn LED, thẻ đeo, chứng nhận, handout) dựa trên nghiên cứu về đọc lướt, tải nhận thức, tiêu đề, ngôn ngữ hỗ trợ tự chủ, thuyết phục có đạo đức; giữ trọn giọng và quy ước chữ của người dùng. Kích hoạt khi người dùng nói 'viết chữ cho ấn phẩm', 'nên ghi gì lên ảnh', 'tối ưu nội dung thiết kế', 'rút gọn chữ', 'chữ nhiều quá', 'đặt tiêu đề poster', 'câu kêu gọi', 'chữ cho phông', 'chữ cho story', 'soát chữ ấn phẩm', 'copy cho banner', hoặc khi skill thiet-ke đến bước brief cần chốt chữ nguyên văn. KHÔNG dùng để viết bài đăng dài, bài báo, landing page hay lập kế hoạch chiến dịch."
---

# Chữ trên thiết kế: chọn, viết, cắt, soát

Đi cùng skill thiet-ke (lõi brief, khuôn, dựng). Đọc trước: `chuan/08-chu-tren-thiet-ke.md` (chuẩn vận hành, định mức, bảng chuyển đổi), `phong-cach/PHONG-CACH.md` mục 1 và 4 (chức danh, quy ước chữ, giọng của người dùng), `phong-cach/tu-ngu.json` (từ người dùng không dùng). Khi cần lý do sâu hay nguồn: `nghien-cuu/E-chu-tren-thiet-ke.md`.

Tinh thần: chữ trên hình là lời mời từ một người thật tới một người thật. Rõ ràng là một dạng tôn trọng; người xem có quyền nói không. Thuyết phục bằng sự cụ thể, trung thực và đồng cảm, không bằng sợ hãi, áp lực hay hứa quá.

## Bước 1 - Hiểu người xem trước khi viết chữ

- Một câu: "Sau khi xem, [ai] cảm..., biết..., làm...", và họ thấy ấn phẩm ở đâu, trong bao lâu (lướt điện thoại vài giây, nhìn phông từ hàng ghế cuối, cầm handout cả buổi).
- Việc người học "thuê" chương trình để làm [jobs-to-be-done]: nói bằng lời của họ, không bằng lời của người bán.
- Chiến dịch nhiều ấn phẩm: dựng **ngôi nhà thông điệp** (mái một câu, ba cột, móng bằng chứng). Người dùng đã có kế hoạch truyền thông thì lấy thông điệp từ đó.
- Tư liệu người dùng đưa (nội dung chương trình, bài viết, bản ghi lời giảng): rút ra ý, giữ nguyên tên mô hình, tên chặng, chức danh; không tự đặt tên mới.

## Bước 2 - Chọn nội dung lên hình

Theo bảng "Lên hình hay ở lại caption" (`chuan/08` mục 3): hình gánh một ý chính, tên, ngày, người, lời nhắc hành động; caption gánh câu chuyện, chi tiết, nguồn, liên kết, câu hỏi mở; alt text chứa đúng chữ trên hình. Ba tầng thông tin, hiếm khi bốn. Ý thứ hai sang khung khác hoặc xuống caption.

## Bước 3 - Viết

- **Tiêu đề**: đưa 2-3 phương án khác nhau về cách tiếp cận (gọi tên trải nghiệm cụ thể, câu hỏi soi chiếu thật, lời hứa cụ thể có thật), mỗi phương án một dòng lý do theo người xem; đánh dấu phương án đề xuất. Hai tiếng đầu mang nghĩa; cụ thể vừa đủ; câu hỏi chỉ khi mang thông tin; khoảng trống tò mò phải được lấp bằng chính nội dung; khung được, không doạ.
- **Lời mời, nút**: ngôn ngữ hỗ trợ tự chủ (bảng chuyển đổi `chuan/08` mục 5); một lời kêu gọi chính nói đúng việc sẽ xảy ra, động từ đầu; ngày cụ thể thay tần suất; khan hiếm chỉ khi thật, lý do định tính, không nêu số ghế; không upsell.
- **Khung viết quảng bá** chỉ dùng bản đã điều chỉnh: Nhận diện - Đồng cảm - Lối mở thay PAS; 3U cộng kịp thời có thật thay 4U; AIDA chỉ làm danh mục kiểm.
- **Chức danh, tên**: nguyên văn PHONG-CACH mục 1; mô hình của người khác hay của chính người dùng đều ghi tác giả.
- **Chữ tiếng Việt**: theo PHONG-CACH mục 4 (mặc định: thuần Việt có [English] khi cần; sentence case hoặc FULL-CAP, không Title Case; không gạch dài); ngắt tiêu đề theo nhịp nghĩa (`\n`), giữ cụm bằng `~`.
- Viết thẳng vào file ấn phẩm: `noiDung` cho bản đầy đủ, `theoNhom.doc.noiDung` cho story, `theoNhom.bang.noiDung` hay `theoTheThuc.<id>.noiDung` cho khổ chật khác.

## Bước 4 - Cắt theo định mức thể thức

- Định mức đếm theo tiếng: `chuToiDa` trong `chuan/kho-the-thuc.json` và bảng `chuan/08` mục 6. Dựng nháp (`tools/ve.py --nhap`): báo cáo ghi `soTieng` từng khổ; `nhieu-chu` là quá trần, `can-rut-gon` là story còn phải co chữ.
- Thứ tự cắt: chữ trang trí và lặp ý, rồi mô tả dài, rồi tính năng phụ; không cắt tên, chức danh nguyên văn, ngày, nơi, lời kêu gọi. Cắt xong vẫn chật thì đổi bố cục, không thu nhỏ chữ.
- Story 9:16 luôn là bản rút gọn: tiêu đề, người, ngày, nút.

## Bước 5 - Soát và thử

- Máy: `tools/ve.py` báo `tu-ngu` (từ cấm chung và từ trong `phong-cach/tu-ngu.json`, luôn sửa), `goi-y-chu` (dấu hiệu văn AI, sửa trừ khi đúng nghĩa thật), `title-case`.
- Mắt: rà sáo ngữ văn AI (PHONG-CACH mục 4), đọc soát dấu từng âm tiết, đối chiếu danh mục loại bỏ (`chuan/08` mục 7).
- Thử: kiểm 5 giây (ấn phẩm nói gì, mời làm gì), nheo mắt, xem ở cỡ điện thoại, đọc to bằng giọng của người dùng.
- Kèm alt text cho từng ảnh và gợi ý ý chính cho caption (lời đăng đầy đủ do người dùng viết, hoặc trợ lý gợi ý khi được nhờ).

## Cách trình người dùng

Một bảng ngắn trong brief (chốt 1 của thiet-ke): người xem và việc của họ, mái thông điệp; phương án tiêu đề kèm lý do; chữ trên hình theo nhóm thể thức kèm số tiếng so với định mức; ý chính caption; alt text; điều đã cắt và vì sao; điều cần người dùng chốt. Người dùng sửa chữ ở bản nào thì giữ nguyên văn bản đó; góp ý về chữ lặp lần hai thì ghi sổ tay PHONG-CACH mục 6 (và `phong-cach/tu-ngu.json` nếu là một từ cần máy bắt).

## Quy tắc cứng

- Quy ước chữ của người dùng và chức danh nguyên văn là bất biến; mọi kỹ thuật thuyết phục phải qua bộ lọc đạo đức `chuan/08` mục 7.
- Không bịa con số, lời chứng thực, khan hiếm, hạn chót; mọi dữ kiện có nguồn ghi trong BRIEF.
- Không khung đua tranh, bị bỏ lại; không tiêu cực để kéo nhấp; không ngôn ngữ ra lệnh dày đặc; không upsell.
- Thông tin thiết yếu luôn có trong caption và alt text, không chỉ nằm trong ảnh.
- Cắt chữ trước, không thu nhỏ chữ dưới ngưỡng đọc.
