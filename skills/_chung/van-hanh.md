# Vận hành chung cho mọi skill thiet-ke-*

## Đọc gì trước

`CLAUDE.md` (trợ lý khác Claude: `AGENTS.md` trước), `docs/QUY-TRINH-KY-THUAT.md`, `phong-cach/PHONG-CACH.md` của repo. Rồi SKILL.md của việc đang làm và các file `chuan/` nó trỏ tới.

## Nơi chạy lệnh và cách chuyển tệp

Ba trường hợp ở `docs/QUY-TRINH-KY-THUAT.md` mục 2. Xác định trường hợp ngay đầu phiên bằng `python3 tools/cai-dat.py --trang-thai` (in thư mục làm việc và máy vẽ dùng được).

- Thư mục gắn vào phiên nên là thư mục cha (gợi ý tên "AI Designer") chứa repo, `Du an/`, `Thanh pham/`. Chỉ gắn riêng repo thì vẫn làm được nhưng cần xin quyền thêm thư mục cha khi ghi nháp, thành phẩm. Claude Cowork: xem `ls $HOME/mnt/` trước.
- **Trường hợp A (trợ lý chạy trên máy người dùng)**: mọi lệnh chạy tại chỗ, không chuyển tệp.
- **Trường hợp B.1 (Claude Cowork có sandbox đám mây)**: máy ảo gắn thư mục (`device_bash`) dùng để đọc, sửa file ấn phẩm, brief, tài liệu, tạo dự án; sandbox (`Bash`) dùng để dựng ảnh, PDF, chỉnh ảnh, tách nền.
  - Đưa repo lên sandbox (mỗi phiên một lần, vài MB): trên máy `cd <repo> && mkdir -p "../Du an/_tam" && tar czf "../Du an/_tam/repo.tgz" --exclude=.git --exclude="Claude outputs" .` (đóng gói RA NGOÀI repo, ghi đè được) rồi stage tệp đó, giải nén vào thư mục làm việc ở sandbox.
  - Ở sandbox dựng lại đúng cây thư mục của máy: `<làm việc>/<repo>` (có `cau-hinh.json`), `<làm việc>/Du an/<dự án>/`, `<làm việc>/Thanh pham/`. Nhờ đường dẫn tương đối trong `cau-hinh.json`, ve.py tự ghi nháp vào `Du an/<dự án>/nhap/` và bản cuối vào `Thanh pham/<dự án>/` như trên máy.
  - Đưa dự án lên: stage `thiet-ke/<tên>.json` và các ảnh trong `anh/` mà ấn phẩm dùng, đặt vào `Du an/<dự án>/` ở sandbox (giữ nguyên thư mục con để đường dẫn tương đối còn đúng).
  - Đưa kết quả về: chép tệp xuất vào thư mục đầu ra của phiên rồi ghi về đúng chỗ tương ứng trên máy (`device_commit_files`): nháp `Du an/<dự án>/nhap/<tên>/`, bản cuối `Thanh pham/<dự án>/NN <tên>/`. Sửa file ấn phẩm ở sandbox thì ghi lại đúng đường dẫn cũ, kèm kiểm thời điểm sửa (`expectedMtimeMs`) để không ghi đè chỉnh tay mới của người dùng.
- **Trường hợp B.2 (không có sandbox, máy ảo không có trình duyệt)**: `python3 tools/hang-doi-dung.py them <dự án>/thiet-ke/<tên>.json --nhap` (thêm `--tt ...`, `--in` khi cần), nhờ người dùng bấm đúp `Dung tren may.command` (Mac) hoặc `Dung tren may.bat` (Windows) ở gốc repo, chờ tệp `Du an/_tam/hang-doi/<mã>.xong.json` (mã thoát, tóm tắt), rồi nhìn ảnh trong thư mục ra. Một lần bấm đúp phục vụ mọi việc trong 30 phút.
- Người dùng tự chỉnh trên Bàn thiết kế (bấm đúp `Mo ban thiet ke.command` hoặc `.bat`); đọc lại file ấn phẩm là thấy thay đổi.

## Nguyên lý trước khuôn mẫu

Giá trị mặc định là điểm xuất phát đã kiểm. Ấn phẩm nào cần khác vì người xem thì làm khác và nói rõ lý do khi trình. Bất biến là quy tắc cứng trong `CLAUDE.md`.

## Chữ và chức danh

Nguồn duy nhất: `phong-cach/PHONG-CACH.md` mục 1 và 4 (máy đọc: `brand/brand.json` > `nhanVat`, `phong-cach/tu-ngu.json`). Người dùng nói chức danh theo dự án thì ghi vào BRIEF.md của dự án và dùng nguyên văn; không nói thì dùng mặc định. Chữ trên ấn phẩm đọc soát từng âm tiết trước khi trình.

## Trình duyệt

Gửi tờ tổng thể (`<tên>-tong-the.jpg`) kèm 3-6 dòng: lựa chọn chính và lý do, cảnh báo còn lại, điều cần người dùng chốt. Góp ý ghi `SO-GOP-Y.md` của dự án; lặp lần hai thì sửa nguồn mặc định và ghi sổ tay PHONG-CACH.

## Repo sạch (bắt buộc, mọi phiên)

Repo chỉ chứa năng lực. Bảng nơi ghi từng loại tệp nằm ở `docs/QUY-TRINH-KY-THUAT.md` mục 1 ("Repo sạch"); phần việc của trợ lý:

1. Đầu phiên: chạy `python3 tools/kiem-sach.py` để biết repo có sạch sẵn không.
2. Trong phiên: mọi nháp, việc tạm, đầu ra ghi NGOÀI repo (`Du an/<dự án>/`, `Du an/_tam/`, `Thanh pham/`). Không đóng gói vào repo, không đặt `--ra` trong repo. Thiếu quyền thư mục `Du an/` hay `Thanh pham/` thì xin quyền; công cụ tự dừng nếu bị bắt ghi vào repo.
3. Ứng dụng Claude có thể chép một bản mỗi tệp gửi vào chat thành `Claude outputs/` trong thư mục gắn đầu tiên: bản thật đã nằm ở `Du an/` hoặc `Thanh pham/`, bản chép này là rác của phiên.
4. Cuối phiên (kể cả phiên chỉ sửa tài liệu): chạy lại `python3 tools/kiem-sach.py`. Còn nháp lạc thì xin phép người dùng xoá một lần, rồi `python3 tools/kiem-sach.py --xoa`. Người dùng từ chối thì nói rõ tệp nào còn nằm lại và vì sao. Tệp lạ (ảnh, PDF, tệp lớn) chưa rõ là gì: hỏi, không tự xoá.
5. Câu trả lời cuối nói rõ: repo sạch (ĐẠT) hay còn gì, và đã dọn gì.
