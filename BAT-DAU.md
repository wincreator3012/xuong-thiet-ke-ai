# BẮT ĐẦU: cài xưởng lần đầu, từng bước

Tài liệu này dành cho người chưa từng dùng AI làm việc với tệp trên máy. Đọc hết một lần mất khoảng 10 phút; làm theo mất khoảng 30-60 phút, phần lớn là ngồi chờ máy tải và trả lời vài câu hỏi. Bạn gần như không phải gõ lệnh nào: trợ lý AI làm thay.

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

## Bước 2: tải xưởng về máy

1. Mở **Documents** (Tài liệu), tạo một thư mục mới tên **AI Designer**. Đây là nơi chứa xưởng và mọi việc bạn làm với nó.
2. Trên trang GitHub của repo này, bấm nút xanh **Code**, chọn **Download ZIP**.
3. Giải nén (Mac: bấm đúp tệp ZIP; Windows: bấm chuột phải, chọn "Extract All"). Bạn có một thư mục tên `Claude-Designer-for-Speaker-main`; đổi tên thành `Claude-Designer-for-Speaker` và kéo vào trong **AI Designer**.

Quen dùng Terminal: `cd ~/Documents/AI\ Designer && git clone <địa chỉ repo>` cho kết quả tương tự và sau này cập nhật dễ hơn.

Kết quả:

```
Documents/
└── AI Designer/
    └── Claude-Designer-for-Speaker/
```

Hai thư mục `Nhap` (nháp) và `Thanh pham` (thành phẩm) sẽ được tạo tự động bên cạnh repo ở bước cài. Vì sao tách ra: repo chỉ chứa "năng lực" của xưởng, còn việc của bạn nằm riêng, nên lúc cập nhật xưởng không đụng tới dự án nào của bạn.

## Bước 3: mở thư mục trong ứng dụng AI

Thêm **thư mục AI Designer** (thư mục cha, không phải riêng repo) vào ứng dụng:

- **Claude Desktop, Cowork**: bắt đầu một phiên mới, bấm nút thêm thư mục (biểu tượng thư mục hoặc chữ "Add folder"), chọn `AI Designer`. Lần đầu, máy có thể hỏi quyền truy cập thư mục: bấm cho phép.
- **ChatGPT desktop, Codex**: chọn mở thư mục (Open folder) hoặc tạo dự án từ thư mục `AI Designer`.
- **Antigravity, Cursor**: File, Open Folder, chọn `AI Designer`.

Từ lúc này trợ lý đọc và ghi được trong thư mục đó, và chỉ thư mục đó.

## Bước 4: nói câu đầu tiên

Gõ vào khung chat:

> Đọc file CLAUDE.md trong thư mục Claude-Designer-for-Speaker rồi thiết lập xưởng thiết kế cho tôi.

Ứng dụng khác Claude:

> Đọc file AGENTS.md trong thư mục Claude-Designer-for-Speaker rồi thiết lập xưởng thiết kế cho tôi.

Chuyện gì sẽ xảy ra, theo thứ tự:

**Cài và kiểm môi trường (5-15 phút, bạn chỉ chờ).** Trợ lý chạy lệnh cài tự động: kiểm Python, tạo hai thư mục làm việc, tìm hoặc cài bộ dựng ảnh (Google Chrome có sẵn, hoặc Playwright), cài thư viện ảnh nhẹ, rồi dựng thử một ấn phẩm mẫu. Bạn sẽ thấy dòng "dựng thử ĐẠT". Máy thiếu Python thì trợ lý hướng dẫn cài (Mac: một lệnh; Windows: tải từ python.org, nhớ đánh dấu "Add python.exe to PATH").

Với Claude Cowork, máy làm việc của Claude có thể không có trình duyệt. Đó không phải lỗi: Claude sẽ dùng môi trường đám mây của phiên, hoặc khi cần sẽ nhờ bạn bấm đúp tệp `Dung tren may.command` (Mac) hay `Dung tren may.bat` (Windows) để máy bạn dựng ảnh.

**Vài câu hỏi về bạn (10-15 phút).** Trợ lý hỏi ba lượt ngắn, mỗi lượt vài câu có sẵn lựa chọn:

- Bạn là ai: tên hiển thị kèm học vị, chức danh đúng nguyên văn (trợ lý giữ y như vậy, không tự rút gọn), đơn vị, người xem chính.
- Bạn hay làm ấn phẩm gì, đăng ở đâu, muốn người xem cảm thấy thế nào. Có sáu họ màu để chọn: *giấy-mực* (điềm tĩnh, sâu), *than-đồng* (trầm ấm), *đêm-vàng* (sang trọng cho sự kiện), *đêm-xanh* (rõ ràng cho giải thích), *ấm áp* (gần gũi), *trắng-xanh* (hiện đại). Không ưng cái nào thì pha từ màu logo của bạn hoặc tả ba từ về cảm giác.
- Chữ viết thế nào (xưng hô với người xem, từ phải viết đúng, từ không bao giờ dùng), có logo không, có mẫu nào bạn thích không.

Trả lời tới đâu trợ lý ghi tới đó vào `phong-cach/PHONG-CACH.md`. Sau này bạn mở tệp đó đọc lại, sửa tay được, hoặc chỉ cần nói "từ nay đổi X thành Y".

**Logo và mẫu bạn thích (nếu có).** Thả logo vào `brand/logo/`, ấn phẩm bạn thích vào `phong-cach/mau-tham-khao/`, rồi báo trợ lý. Không có logo cũng được: ấn phẩm hiện tên bạn bằng chữ.

**Dựng thử ấn phẩm mang tên bạn (5-10 phút).** Trợ lý dựng một ảnh trích dẫn và một ảnh giới thiệu với tên, chức danh, màu, logo của bạn, gửi bạn xem. Bạn góp ý về màu, chữ, logo; trợ lý sửa tới khi bạn ưng.

**Buổi giới thiệu xưởng (khoảng 10 phút).** Trợ lý giải thích xưởng làm được gì cho bạn, một ấn phẩm chạy qua những bước nào, các thói quen dùng hiệu quả, những gì xưởng chưa làm, rồi cùng bạn chọn ấn phẩm đầu tiên. Muốn nghe lại lúc nào cũng được: "giới thiệu lại xưởng".

## Bước 5: làm ấn phẩm đầu tiên

Nói với trợ lý một câu có đủ ba ý: làm gì, cho ai, đăng ở đâu. Ví dụ:

> Làm bộ ảnh thông cáo khoá "Lắng nghe trọn vẹn" khai giảng tối thứ Năm 12/11, học trực tuyến 8 buổi, cho phụ huynh có con tuổi teen. Đăng Facebook, Instagram và story. Ảnh của tôi ở đây [kèm ảnh].

Trợ lý tạo một thư mục dự án trong `Nhap/`, viết **brief** (thông điệp, chữ nguyên văn, khuôn, họ màu, các khổ) và hỏi những gì còn thiếu. Bạn duyệt. Trợ lý dựng bản nháp mọi khổ và gửi **tờ tổng thể** (tất cả khổ cạnh nhau). Bạn góp ý bằng lời, hoặc tự mở Bàn thiết kế sửa. Ưng rồi trợ lý xuất **bản cuối** vào `Thanh pham/<tên dự án>/`, kèm văn bản thay thế cho từng ảnh và lưu ý khi đăng. Đó là tệp bạn đăng.

Cách đặt yêu cầu cho từng loại ấn phẩm, ví dụ câu nói, Bàn thiết kế, xử lý khi có gì lạ: đọc tiếp [HUONG-DAN.md](HUONG-DAN.md).

## Những điều nên biết

- **Hai tệp bấm đúp ở gốc repo**: `Mo ban thiet ke` (mở Bàn thiết kế để tự chỉnh) và `Dung tren may` (khi trợ lý nhờ máy bạn dựng ảnh). Mac dùng bản `.command`, Windows dùng bản `.bat`. Lần đầu, Mac có thể chặn: bấm chuột phải vào tệp, chọn Open, rồi Open lần nữa; Windows có thể hiện "Windows protected your PC": bấm "More info" rồi "Run anyway".
- **Giữ ứng dụng AI mở và máy không ngủ** khi trợ lý đang dựng cả bộ hay xuất file in.
- **Ảnh của bạn ở trên máy bạn.** Thư mục `Nhap/` và `Thanh pham/` nằm trên máy. Ứng dụng AI chạy trên đám mây chỉ nhận những tệp cần cho bước đang làm, như khi bạn gửi ảnh vào khung chat.
- **Dùng trên hai máy**: đặt thư mục `AI Designer` vào iCloud Drive, Dropbox hay OneDrive là dùng chung được; chờ tệp tải hết về máy đang ngồi trước khi làm việc lớn. Trên mỗi máy mới, nói với trợ lý "kiểm tra xưởng" để nó cài phần còn thiếu.
- **Muốn đổi phong cách** (màu, chức danh, logo, cách viết): nói "đổi phong cách" và nêu điều muốn đổi. Không cần làm lại từ đầu.
- **Muốn chỉnh ảnh, tách nền, làm file in CMYK**: nói với trợ lý, nó cài thêm thư viện cần thiết (vài trăm MB) lần đầu dùng.

## Khi có gì không chạy

Nói với trợ lý điều bạn thấy, bằng lời thường ("nó dừng ở chỗ cài", "không thấy ảnh xuất"). Trợ lý có tài liệu chẩn đoán bên trong thư mục. Ba việc bạn tự kiểm được: thư mục `AI Designer` còn được thêm vào ứng dụng không; máy còn mạng không (lúc cài); ổ đĩa còn chỗ không. Muốn trợ lý tự kiểm toàn bộ, nói: "kiểm tra xưởng".
