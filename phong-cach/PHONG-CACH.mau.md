# PHONG CÁCH THIẾT KẾ CỦA [TÊN BẠN]

Bản đồ phong cách Claude đọc trước mỗi ấn phẩm. Một chỗ duy nhất giữ tên, chức danh nguyên văn, từ ngữ phải viết đúng, tông thị giác và các góp ý đã chốt; chỗ khác (skill, quy trình, chuẩn) chỉ trỏ về đây. Claude điền file này cùng bạn ở bước thiết lập (skill `skills/thiet-ke-thiet-lap/`). Bạn sửa tay lúc nào cũng được, hoặc nói "từ nay đổi X thành Y" là Claude cập nhật file này và nguồn mặc định tương ứng (`brand/brand.json`, `phong-cach/tu-ngu.json`, khuôn).

Mục 1 và 4 là nguyên văn, giữ tuyệt đối. Các mục còn lại là tinh thần và điểm xuất phát: từng ấn phẩm ứng biến theo nội dung và người xem, nói rõ lý do khi đi khác mặc định.

Tệp này được chép từ bản khởi đầu `phong-cach/PHONG-CACH.mau.md` ở bước cài; bản của bạn không lên git chung và không bị bản cập nhật của xưởng ghi đè. Dấu `[...]` là chỗ chưa điền. Còn dấu này thì Claude chạy bước thiết lập trước mọi việc khác.

## 1. Tên và chức danh (nguyên văn, không rút gọn, không đổi chữ)

Dữ liệu máy đọc ở `brand/brand.json` > `nhanVat.chinh`.

- **Tên hiển thị**: [Tên đầy đủ, có học vị nếu muốn hiện, ví dụ "TS Nguyễn Minh An"]. Cách viết học vị: [ví dụ "TS", "ThS", có hay không dấu chấm].
- **Chức danh mặc định**: [Chức danh nguyên văn, ví dụ "Chuyên gia tâm lý học thực hành"].
- **Bản chức danh khác** (nếu có): [ví dụ bản ngắn cho thẻ người trên bài đăng nhiều người; bản dễ hiểu cho người xem đại chúng; bản tiếng Anh]. Quy tắc chọn: [khi nào dùng bản nào].
- **Chứng chỉ** (nếu có): [ví dụ "PCC, M.Ed."]; dùng khi: [ví dụ ấn phẩm tiếng Anh].
- Dự án nào bạn nói chức danh riêng thì dùng nguyên văn trong dự án đó, ghi vào BRIEF.md, không đưa ngược thành mặc định. Bạn không nói thì Claude chọn theo quy tắc trên và nói rõ đã chọn bản nào khi trình brief; phân vân thì hỏi.
- **Đơn vị, chương trình thường đứng tên**: [tên tổ chức, chương trình; logo tương ứng khai ở `brand/brand.json` > `thuongHieu`].
- Nhân vật khác (khách mời, đồng giảng viên, học viên): lấy nguyên văn từ brief của dự án; chưa có thì hỏi trước khi dựng, không suy ra từ tên chương trình.

## 2. Ấn phẩm thường làm và người xem

- **Lĩnh vực**: [ví dụ tâm lý học, giáo dục, y khoa, quản trị].
- **Người xem chính**: [ví dụ phụ huynh có con tuổi teen; quản lý cấp trung; học viên cũ].
- **Ấn phẩm hay làm**: [ví dụ thông cáo khoá học, giới thiệu diễn giả, sơ đồ kiến thức, trích dẫn, chứng nhận, phông sự kiện].
- **Kênh đăng**: [ví dụ Facebook, Instagram, LinkedIn, Zalo, YouTube, website].
- **Thể thức mặc định**: [mặc định của xưởng: bài feed 4:5 (1080x1350) + vuông + story 9:16; thêm ảnh bìa, thumbnail theo kênh]. Một ấn phẩm luôn nghĩ tới cả bộ thể thức ngay từ đầu (chuan/02 mục 5).

## 3. Tông và cảm giác

- **Ba từ tả cảm giác muốn người xem nhận được**: [ví dụ "điềm tĩnh, sâu, ấm"].
- **Họ màu đã chọn** (chi tiết mã màu ở `brand/brand.json` > `chuDe`): [họ chính] cho [loại ấn phẩm]; [họ phụ] cho [loại ấn phẩm]. Sáu họ khởi đầu của xưởng:
  - **giay-muc**: giấy ngà, mực than, nhấn lục trầm. Điềm tĩnh, sâu, sạch: tri thức, chiêm nghiệm, handout.
  - **than-dong**: than, kem, đồng ấm. Trầm, ấm: trích dẫn, thông điệp sâu, nội dung buổi tối.
  - **dem-vang**: xanh thẫm đêm, vàng kim chuyển sắc, vòng cung mảnh. Sang trọng: chương trình cao cấp, sự kiện, giới thiệu giảng viên.
  - **dem-xanh**: xanh đêm, xanh trời, hổ phách. Rõ ràng: giải thích cơ chế, số liệu, framework.
  - **am-ap**: kem, đất nung, xanh ô liu. Gần gũi, tin cậy: kỹ năng sống, nuôi dạy con, cộng đồng.
  - **trang-xanh**: trắng, xanh dương. Hiện đại, năng động: công nghệ, kinh doanh, đào tạo doanh nghiệp.
  - Họ riêng của bạn (pha từ màu logo hoặc mô tả cảm giác): [tên họ, nếu có].
- Một chiến dịch một họ màu, không pha.
- **Chữ**: [mặc định: Lora hoặc Playfair Display cho tiêu đề, Be Vietnam Pro cho nội dung; cả bốn phông có sẵn đều đủ dấu tiếng Việt].
- **Ảnh**: [ví dụ người thật, khoảnh khắc thật đang giảng; tách nền gọn hay ảnh tràn khung]. Không ảnh do AI tạo thay người thật, lớp học thật, sự kiện thật.
- **Mẫu tham khảo bạn thích**: [có / chưa có]; phân tích ở `phong-cach/PHAN-TICH-MAU.md`, ảnh gốc ở `phong-cach/mau-tham-khao/`.

## 4. Chữ trên ấn phẩm

Quy ước mặc định của xưởng (giữ, hoặc nói với Claude điều bạn muốn khác):

- Tiêu đề: sentence case (viết hoa chữ đầu câu), hoặc FULL-CAP cho nhãn ngắn, tên chương trình. Không viết hoa chữ cái đầu mọi từ (Title Case).
- Dấu gạch: gạch ngang thường (-) hoặc dấu hai chấm; không gạch dài (—). Dấu nháy thẳng "...", ba chấm gõ tay (...).
- Thuật ngữ tiếng Anh: viết thuần Việt, từ gốc trong ngoặc vuông, ví dụ "an toàn tâm lý [psychological safety]"; ngoặc tròn cho chú thích thông tin. Hoặc viết thuần Anh; không trộn tuỳ tiện.
- Tránh từ, cụm "đẹp lời" của văn AI: hành trình, kỷ nguyên, chìa khoá, bí quyết, đột phá, vượt trội, kiến tạo, khai phá, chinh phục, "hãy cùng", "đừng bỏ lỡ", "người bạn đồng hành", "mở ra cánh cửa"; viết thẳng điều người xem nhận được.
- Quảng bá: không khung "đua tranh, bị bỏ lại"; không upsell lộ liễu; khan hiếm chỉ khi có thật và không nêu số ghế; cho chọn ngày cụ thể thay vì tả tần suất lặp lại.
- Mọi mô hình, công cụ, checklist của người khác được nhắc tới: ghi tên tác giả trên ấn phẩm. Dữ kiện (con số, năm, trích dẫn) phải có nguồn đối chiếu trước khi lên hình.
- Story 9:16 rút gọn chữ: khổ dọc chỉ giữ tiêu đề, người, ngày và nút kêu gọi; phần phụ tự ẩn; không để máy co chữ nhỏ cho vừa.

Của riêng bạn:

- **Xưng hô với người xem**: [ví dụ "bạn" cho bảng tin, "anh chị" cho thư mời người đi làm].
- **Từ ngữ PHẢI viết đúng** (tên chương trình, thuật ngữ nghề, cách viết riêng): [danh sách]. Từ không dùng và từ thay thế ghi luôn vào `phong-cach/tu-ngu.json` để máy tự bắt.
- **Giọng**: [ví dụ ấm, chừng mực, không phô; hay sôi nổi, trẻ trung].
- **Kết ấn phẩm**: [ví dụ ưu tiên một câu hỏi mở thật hơn câu khẩu hiệu].
- Phần lời bài đăng đi kèm ấn phẩm: [dùng skill viết riêng của bạn nếu có, hoặc để Claude gợi ý].

## 5. Logo

- [Mô tả các bản logo đã thả vào `brand/logo/`: bản cho nền sáng, nền tối, biểu tượng vuông; bản nào chỉ dùng cho ấn phẩm trang trọng].
- Đồng thương hiệu: logo chủ trì trước, logo đối tác sau, cách bằng một vạch mảnh; chiều cao thị giác cân nhau.
- Chưa có logo: ấn phẩm hiện tên bạn bằng chữ, chỗ logo tự bỏ.

## 6. Sổ tay góp ý đã chốt

Một góp ý lặp lại lần thứ hai là tín hiệu sửa nguồn mặc định (khuôn, brand.json, chuan), không chỉ sửa ấn phẩm đang làm. Mỗi dòng: ngày - điều đã góp ý - đã sửa ở đâu.

- [ngày] - Khởi tạo ở bước thiết lập.
