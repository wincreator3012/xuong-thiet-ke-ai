# BẮT ĐẦU: cài xưởng lần đầu, từng bước

Tài liệu này dành cho người chưa từng dùng AI làm việc với tệp trên máy. Điều cần biết trước: repo này là **bản mẫu**. Bạn không tải nó về rồi làm việc trong đó; bạn đưa đường link cho trợ lý AI, trợ lý học từ bản mẫu rồi dựng cho bạn một **xưởng riêng** trên máy, mang tên, phong cách và bộ skill của bạn. Đọc hết một lần mất khoảng 10 phút; làm theo mất khoảng 60-90 phút, phần lớn là ngồi chờ máy tải và trả lời vài câu hỏi. Bạn gần như không phải gõ lệnh nào: trợ lý AI làm thay.

## Trước khi bắt đầu, bạn cần

- **Một máy tính** Mac (Apple Silicon M1 trở lên là êm nhất; máy Intel đời gần đây cũng được) hoặc Windows 10/11.
- **Một ứng dụng AI làm việc được với thư mục trên máy** (bước 1 bên dưới). Trợ lý AI chỉ chat trên trang web, không mở được thư mục trên máy bạn, thì không vận hành được xưởng.
- **Mạng ổn định** trong lúc cài (tải khoảng 150-500 MB tuỳ máy).
- **Khoảng 1 GB trống** trên ổ đĩa.
- **Tư liệu để thử** (tuỳ chọn nhưng nên có): logo của bạn (PNG nền trong suốt là tốt nhất), một ảnh chân dung gốc, và vài ấn phẩm bạn thích (của bạn hay của người khác) để xưởng học phong cách.

## Bước 1: cài một ứng dụng AI làm việc được với thư mục

Xưởng được viết và kiểm chứng trên Claude; các ứng dụng khác dùng được vì xưởng là tệp chữ và công cụ Python thông thường, nhưng ít được thử hơn. Chọn MỘT:

| Ứng dụng | Hợp với ai | Tải ở đâu | Ghi chú |
|---|---|---|---|
| **Claude Desktop** (chế độ Cowork) | người mới, muốn ít trục trặc nhất | [claude.ai/download](https://claude.ai/download) | Khuyên dùng. Cowork cần gói trả phí (Pro, Max, Team, Enterprise); có cho Mac và Windows. Claude làm việc trong một máy ảo gắn thư mục của bạn; khi cần dựng ảnh mà máy ảo không có trình duyệt, Claude dùng môi trường đám mây của phiên hoặc nhờ bạn bấm đúp một tệp để máy bạn dựng |
| **ChatGPT desktop** (đã gộp Codex) | người đang dùng ChatGPT | [chatgpt.com/download](https://chatgpt.com/download) | Có cho Mac (Apple Silicon), Windows, Linux. Mở một thư mục rồi làm việc trong đó; ChatGPT chạy được lệnh trên máy nên dựng ảnh ngay tại chỗ |
| **Google Antigravity** | người quen sản phẩm Google, không ngại giao diện kiểu phần mềm lập trình | [antigravity.google](https://antigravity.google) | Có cho Mac, Windows, Linux; miễn phí ở thời điểm viết. Mở thư mục làm dự án |
| **Claude Code**, **Codex CLI**, Cursor... | người quen dòng lệnh, lập trình | trang của từng công cụ | Chạy thẳng trên máy, dựng ảnh tại chỗ |

Giá, gói và tên gọi của các ứng dụng AI thay đổi nhanh; xem trang chính thức của từng hãng trước khi đăng ký.

Cài xong, mở ứng dụng và đăng nhập. Với Claude Desktop: chọn chế độ **Cowork** ở thanh bên.

## Bước 2: tạo thư mục làm việc

Mở **Documents** (Tài liệu), tạo một thư mục mới tên **AI Designer**. Đây là nơi chứa xưởng của bạn và mọi việc bạn làm với nó. Để trống cũng được: trợ lý sẽ tự lấy bản mẫu về.

## Bước 3: mở thư mục trong ứng dụng AI

Thêm **thư mục AI Designer** vào ứng dụng:

- **Claude Desktop, Cowork**: bắt đầu một phiên mới, bấm nút thêm thư mục (biểu tượng thư mục hoặc chữ "Add folder"), chọn `AI Designer`. Lần đầu, máy có thể hỏi quyền truy cập thư mục: bấm cho phép.
- **ChatGPT desktop, Codex**: chọn mở thư mục (Open folder) hoặc tạo dự án từ thư mục `AI Designer`.
- **Antigravity, Cursor**: File, Open Folder, chọn `AI Designer`.

Từ lúc này trợ lý đọc và ghi được trong thư mục đó, và chỉ thư mục đó.

## Bước 4: nói câu đầu tiên

Gõ vào khung chat (dán nguyên câu, kể cả đường link):

> Đọc https://github.com/wincreator3012/xuong-thiet-ke-ai, bắt đầu từ tệp BAN-MAU.md, rồi dựng cho tôi một xưởng thiết kế riêng trong thư mục này.

Chuyện gì sẽ xảy ra, theo thứ tự:

**Lấy bản mẫu về (1-3 phút, bạn chỉ chờ).** Trợ lý tải bản mẫu vào `AI Designer/_ban-mau/xuong-thiet-ke-ai/`. Thư mục này chỉ để trợ lý đọc và để so sánh khi cập nhật về sau; bạn không cần mở nó. Nếu ứng dụng AI của bạn không tải được từ mạng, trợ lý sẽ nhờ bạn: trên trang GitHub của repo bấm nút xanh **Code**, chọn **Download ZIP**, giải nén (Mac: bấm đúp tệp ZIP; Windows: bấm chuột phải, chọn "Extract All"), đổi tên thư mục `xuong-thiet-ke-ai-main` thành `xuong-thiet-ke-ai`, rồi đặt vào `AI Designer/_ban-mau/`.

**Dựng xưởng riêng (khoảng 5 phút).** Trợ lý hỏi ba điều: tên hiển thị của bạn, tên thư mục xưởng (ví dụ `xuong-thiet-ke-ha`), và một tên ngắn không dấu làm tiền tố cho skill (ví dụ `ha`, để skill của bạn tên `ha-thiet-ke`, `ha-thiet-ke-slide`...). Rồi trợ lý dựng xưởng của bạn cạnh bản mẫu. Từ đây mọi việc làm trong xưởng của bạn.

**Cài và kiểm môi trường (5-15 phút, bạn chỉ chờ).** Trợ lý chạy lệnh cài tự động: kiểm Python, tạo hai thư mục làm việc, tìm hoặc cài bộ dựng ảnh (Google Chrome có sẵn, hoặc Playwright), cài thư viện ảnh nhẹ, rồi dựng thử một ấn phẩm mẫu. Bạn sẽ thấy dòng "dựng thử ĐẠT". Máy thiếu Python thì trợ lý hướng dẫn cài (Mac: một lệnh; Windows: tải từ python.org, nhớ đánh dấu "Add python.exe to PATH").

Với Claude Cowork, máy làm việc của Claude có thể không có trình duyệt. Đó không phải lỗi: Claude sẽ dùng môi trường đám mây của phiên, hoặc khi cần sẽ nhờ bạn bấm đúp tệp `Dung tren may.command` (Mac) hay `Dung tren may.bat` (Windows) trong xưởng của bạn để máy bạn dựng ảnh.

**Vài câu hỏi về bạn (10-15 phút).** Trợ lý hỏi ba lượt ngắn, mỗi lượt vài câu có sẵn lựa chọn:

- Bạn là ai: tên hiển thị kèm học vị, chức danh đúng nguyên văn (trợ lý giữ y như vậy, không tự rút gọn), đơn vị, người xem chính.
- Bạn hay làm ấn phẩm gì, đăng ở đâu, muốn người xem cảm thấy thế nào. Có sáu họ màu để chọn: *giấy-mực* (điềm tĩnh, sâu), *than-đồng* (trầm ấm), *đêm-vàng* (sang trọng cho sự kiện), *đêm-xanh* (rõ ràng cho giải thích), *ấm áp* (gần gũi), *trắng-xanh* (hiện đại). Không ưng cái nào thì pha từ màu logo của bạn hoặc tả ba từ về cảm giác.
- Chữ viết thế nào (xưng hô với người xem, từ phải viết đúng, từ không bao giờ dùng), có logo không, có mẫu nào bạn thích không.

Trả lời tới đâu trợ lý ghi tới đó vào `phong-cach/PHONG-CACH.md` trong xưởng của bạn. Sau này bạn mở tệp đó đọc lại, sửa tay được, hoặc chỉ cần nói "từ nay đổi X thành Y".

**Logo và mẫu bạn thích (nếu có).** Thả logo vào `brand/logo/`, ấn phẩm bạn thích vào `phong-cach/mau-tham-khao/` (trong xưởng của bạn), rồi báo trợ lý. Không có logo cũng được: ấn phẩm hiện tên bạn bằng chữ.

**Dựng thử ấn phẩm mang tên bạn (5-10 phút).** Trợ lý dựng một ảnh trích dẫn và một ảnh giới thiệu với tên, chức danh, màu, logo của bạn, gửi bạn xem. Bạn góp ý về màu, chữ, logo; trợ lý sửa tới khi bạn ưng.

**Tạo bộ skill của bạn và lưu vào tài khoản AI (10-15 phút).** Skill là những "tờ quy trình nghề" giúp trợ lý làm đúng từng việc mà bạn không phải dặn lại. Trợ lý giải thích ngắn skill là gì, viết phần mô tả skill theo đúng những câu bạn hay nói, đóng gói, rồi hướng dẫn bạn lưu vào tài khoản theo ứng dụng bạn dùng: với Claude, bạn bấm lưu trên thẻ đề xuất hoặc tải tệp ZIP lên; với ChatGPT (gói có skill), tải tệp ZIP lên; với Codex, Antigravity, mở thư mục là dùng được ngay. Đầy đủ: `skills/README.md` trong xưởng.

**Buổi giới thiệu xưởng (khoảng 10 phút).** Trợ lý giải thích xưởng làm được gì cho bạn, một ấn phẩm chạy qua những bước nào, các thói quen dùng hiệu quả, những gì xưởng chưa làm, rồi cùng bạn chọn ấn phẩm đầu tiên. Muốn nghe lại lúc nào cũng được: "giới thiệu lại xưởng".

Kết quả:

```
Documents/
└── AI Designer/
    ├── _ban-mau/xuong-thiet-ke-ai/   bản mẫu, chỉ đọc
    ├── xuong-thiet-ke-<tên bạn>/     xưởng của bạn
    ├── Du an/                        dự án, nháp
    ├── Thanh pham/                   bản cuối
    └── Goi skill/                    skill đóng gói để tải lên tài khoản
```

Vì sao tách ra như vậy: xưởng của bạn chỉ chứa "năng lực" (công cụ, khuôn, phong cách, skill), việc của bạn nằm riêng ở `Du an`, `Thanh pham`, còn bản mẫu nằm riêng ở `_ban-mau`. Nhờ vậy bạn sửa xưởng thoải mái, và lúc lấy kinh nghiệm mới từ bản mẫu không có gì của bạn bị ghi đè.

## Bước 5: làm ấn phẩm đầu tiên

Nói với trợ lý một câu có đủ ba ý: làm gì, cho ai, đăng ở đâu. Ví dụ:

> Làm bộ ảnh thông cáo khoá "Lắng nghe trọn vẹn" khai giảng tối thứ Năm 12/11, học trực tuyến 8 buổi, cho phụ huynh có con tuổi teen. Đăng Facebook, Instagram và story. Ảnh của tôi ở đây [kèm ảnh].

Trợ lý tạo một thư mục dự án trong `Du an/`, viết **brief** (thông điệp, chữ nguyên văn, khuôn, họ màu, các khổ) và hỏi những gì còn thiếu. Bạn duyệt. Trợ lý dựng bản nháp mọi khổ và gửi **tờ tổng thể** (tất cả khổ cạnh nhau). Bạn góp ý bằng lời, hoặc tự mở Bàn thiết kế sửa. Ưng rồi trợ lý xuất **bản cuối** vào `Thanh pham/<tên dự án>/`, kèm văn bản thay thế cho từng ảnh và lưu ý khi đăng. Đó là tệp bạn đăng.

Cách đặt yêu cầu cho từng loại ấn phẩm, ví dụ câu nói, Bàn thiết kế, xử lý khi có gì lạ: đọc tiếp [HUONG-DAN.md](HUONG-DAN.md).

## Những điều nên biết

- **Hai tệp bấm đúp ở gốc xưởng của bạn**: `Mo ban thiet ke` (mở Bàn thiết kế để tự chỉnh) và `Dung tren may` (khi trợ lý nhờ máy bạn dựng ảnh). Mac dùng bản `.command`, Windows dùng bản `.bat`. Lần đầu, Mac có thể chặn: bấm chuột phải vào tệp, chọn Open, rồi Open lần nữa; Windows có thể hiện "Windows protected your PC": bấm "More info" rồi "Run anyway".
- **Giữ ứng dụng AI mở và máy không ngủ** khi trợ lý đang dựng cả bộ hay xuất file in.
- **Ảnh của bạn ở trên máy bạn.** Thư mục `Du an/` và `Thanh pham/` nằm trên máy. Ứng dụng AI chạy trên đám mây chỉ nhận những tệp cần cho bước đang làm, như khi bạn gửi ảnh vào khung chat.
- **Dùng trên hai máy**: đặt thư mục `AI Designer` vào iCloud Drive, Dropbox hay OneDrive là dùng chung được; chờ tệp tải hết về máy đang ngồi trước khi làm việc lớn. Trên mỗi máy mới, nói với trợ lý "kiểm tra xưởng" để nó cài phần còn thiếu. Muốn sao lưu kỹ hơn: nhờ trợ lý tạo một repo git RIÊNG TƯ cho xưởng của bạn (không phải repo bản mẫu này).
- **Đã cài theo hướng dẫn cũ** (làm việc thẳng trong thư mục `xuong-thiet-ke-ai`): nói với trợ lý "chuyển sang xưởng riêng theo BAN-MAU.md"; phong cách, logo và dự án của bạn được mang sang nguyên vẹn.
- **Muốn đổi phong cách** (màu, chức danh, logo, cách viết): nói "đổi phong cách" và nêu điều muốn đổi. Không cần làm lại từ đầu.
- **Muốn chỉnh ảnh, tách nền, làm file in CMYK**: nói với trợ lý, nó cài thêm thư viện cần thiết (vài trăm MB) lần đầu dùng.

## Khi có gì không chạy

Nói với trợ lý điều bạn thấy, bằng lời thường ("nó dừng ở chỗ cài", "không thấy ảnh xuất"). Trợ lý có tài liệu chẩn đoán bên trong thư mục. Ba việc bạn tự kiểm được: thư mục `AI Designer` còn được thêm vào ứng dụng không; máy còn mạng không (lúc cài); ổ đĩa còn chỗ không. Muốn trợ lý tự kiểm toàn bộ, nói: "kiểm tra xưởng".
