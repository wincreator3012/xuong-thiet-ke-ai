---
name: thiet-ke-thiet-lap
description: "Thiết lập Xưởng thiết kế Claude (repo Claude-Designer-for-Speaker) lần đầu cho một người dùng mới: cài và kiểm môi trường bằng tools/cai-dat.py, phỏng vấn ngắn để điền phong-cach/PHONG-CACH.md, brand/brand.json, phong-cach/tu-ngu.json theo phong cách của chính họ (tên, chức danh nguyên văn, họ màu, logo, giọng chữ), phân tích mẫu tham khảo họ thích, dựng thử ấn phẩm mẫu mang tên họ để duyệt bằng mắt, rồi giới thiệu xưởng có hệ thống. Kích hoạt khi người dùng nói 'thiết lập xưởng', 'bắt đầu', 'cài đặt', 'cá nhân hoá', 'đổi phong cách', 'đổi màu, logo, chức danh mặc định', 'phân tích mẫu tham khảo của tôi', hoặc khi phong-cach/PHONG-CACH.md còn chỗ trống hay chưa có cau-hinh.json. Cũng kích hoạt để GIỚI THIỆU XƯỞNG khi người dùng nói 'xưởng làm được gì', 'giới thiệu xưởng', 'hướng dẫn tôi cách dùng', 'mới vào chưa biết làm gì', hoặc khi thiết lập vừa xong mà chưa giới thiệu."
---

# Thiết lập xưởng thiết kế lần đầu

Mục tiêu: sau khoảng 40-60 phút, người dùng (chuyên gia, giảng viên, diễn giả mới dùng AI) có một xưởng chạy được trên máy của họ, mang tên, chức danh, màu, logo và giọng chữ đúng ý họ, đã thấy một ấn phẩm mẫu mang tên mình, hiểu xưởng làm được gì và biết câu đầu tiên cần nói. Nguyên tắc: hỏi ít, mỗi lượt tối đa 4 câu, luôn có phương án mặc định, giải thích bằng lời thường, không bắt người dùng đọc tài liệu kỹ thuật. Người dùng vắng mặt thì chọn mặc định và ghi rõ giả định vào PHONG-CACH.md.

Phong cách là của NGƯỜI DÙNG. Không đề xuất tên, chức danh, màu, câu chữ của tác giả xưởng hay của bất kỳ ai khác.

## Bước 0 - Định vị

Đọc `CLAUDE.md` (trợ lý khác Claude: `AGENTS.md`) nếu chưa đọc trong phiên. Xác định nơi chạy lệnh (`docs/QUY-TRINH-KY-THUAT.md` mục 2): trợ lý chạy thẳng trên máy người dùng, hay Claude Cowork có máy ảo gắn thư mục (và có sandbox đám mây hay không). Chưa có quyền vào thư mục xưởng thì dừng, hướng dẫn người dùng thêm thư mục (Claude: nút thêm thư mục trong Cowork; ứng dụng khác: mở thư mục làm dự án) theo `BAT-DAU.md` bước 3.

Kiểm vị trí: repo nên nằm trong một thư mục cha (gợi ý "AI Designer") để nháp và thành phẩm ở cạnh repo. Repo đang nằm thẳng trong Documents, Desktop hay Downloads thì đề nghị người dùng tạo thư mục cha và chuyển repo vào trước (giải thích một câu: để nháp, thành phẩm không lẫn với tài liệu khác), rồi gắn thư mục cha vào phiên.

## Bước 1 - Cài và kiểm môi trường

Chạy ở gốc repo: `python3 tools/cai-dat.py` (Windows: `py tools\cai-dat.py` hoặc `python tools\cai-dat.py`). Lệnh tự bỏ qua bước đã xong. Mã thoát 2 = đang tải, chạy lại y nguyên tới khi thấy "CÀI XONG". Báo tiến độ bằng lời thường ("đang cài bộ dựng ảnh").

- Có máy vẽ và dựng thử ĐẠT: sang bước 2.
- Không có máy vẽ (thường gặp ở máy ảo Claude Cowork): không phải lỗi. Nếu phiên có sandbox đám mây thì dựng ở đó (`skills/_chung/van-hanh.md`); không thì dùng hàng đợi dựng (`Dung tren may.command` / `.bat`) ở bước 4. Báo người dùng một câu: "Máy làm việc của mình không có trình duyệt, nên khi cần dựng ảnh mình sẽ nhờ bạn bấm đúp một tệp để máy bạn dựng."
- Dựng thử KHÔNG ĐẠT: đọc chẩn đoán, sửa (thường thiếu Chrome hoặc Playwright chưa tải xong), chạy lại. Chưa đạt thì chưa làm ấn phẩm thật.
- Người dùng muốn chỉnh ảnh, tách nền, làm file in: `python3 tools/cai-dat.py --anh` (và `--tach-nen`); không cần thì để sau.

## Bước 2 - Phỏng vấn phong cách (3 lượt)

Đọc `phong-cach/PHONG-CACH.md` (bước 1 đã chép từ bản khởi đầu `PHONG-CACH.mau.md`, còn chỗ trống trong ngoặc vuông; sửa bản không có `.mau`) và phần `chuDe` của `brand/brand.json` trước. Dùng câu hỏi có lựa chọn sẵn (Claude: AskUserQuestion), mỗi lượt tối đa 4 câu.

**Lượt 1, về người dùng**: tên hiển thị kèm học vị (hỏi đúng cách viết học vị: "TS" hay "TS."); chức danh đúng nguyên văn (nhấn mạnh sẽ hiện y như vậy trên mọi ấn phẩm, hỏi lại chính tả chữ dễ nhầm); có bản chức danh thứ hai không (bản ngắn, bản dễ hiểu, bản tiếng Anh) và khi nào dùng; đơn vị, chương trình thường đứng tên. Lĩnh vực chuyên môn và người xem chính hỏi luôn nếu chưa rõ.

**Lượt 2, về sản phẩm và cảm giác**: ấn phẩm hay làm (đa chọn: bài mạng xã hội, giới thiệu diễn giả, sơ đồ kiến thức, trích dẫn, chứng nhận, tài liệu in, phông sự kiện); kênh đăng; ba từ tả cảm giác muốn người xem nhận được; họ màu: trình sáu họ khởi đầu bằng một câu cảm giác mỗi họ (giay-muc điềm tĩnh và sâu; than-dong trầm ấm; dem-vang sang trọng cho sự kiện; dem-xanh rõ ràng cho giải thích; am-ap gần gũi; trang-xanh hiện đại), kèm lựa chọn "pha từ màu logo của tôi" và "mô tả riêng". Gợi ý một họ chính cho ấn phẩm thường ngày và một họ cho sự kiện.

**Lượt 3, về chữ, logo, mẫu**: xưng hô với người xem; từ ngữ phải viết đúng (tên chương trình, thuật ngữ nghề) và từ không bao giờ dùng; giữ hay đổi quy ước chữ mặc định của xưởng (PHONG-CACH mục 4); có logo không (có thì nhờ thả vào `brand/logo/` ngay); có ấn phẩm mẫu nào thích không (có thì nhờ thả vào `phong-cach/mau-tham-khao/`).

Mỗi lượt xong, ghi ngay vào PHONG-CACH.md (thay đúng chỗ trống tương ứng, giữ cấu trúc tệp, đổi cả tiêu đề tệp thành tên người dùng), rồi mới hỏi lượt kế. Ghi máy đọc song song:

- `brand/brand.json`: `nhanVat.chinh` (ten, hocVi, tenDayDu, chungChi, chucDanh với các bản), `thuongHieu.chinh` (ten, chuDeMacDinh, chuDeHop, logo theo tệp đã thả, khauHieu, website), `cap-nhat`. Giữ nguyên `thuongHieu.mau` (dùng cho kiểm khuôn).
- Họ màu riêng (pha từ logo hay mô tả): chép một họ gần nhất trong `chuDe` thành khoá mới, đổi mã màu theo vai; quy tắc: `chu` trên `nen` tương phản ít nhất 7:1, `chuPhu` ít nhất 4.5:1, `nhan` là màu duy nhất có cá tính, `vienThe`, `vachMo` chỉ nhạt hơn nền một chút; nền tối thì `toi: true`.
- `phong-cach/tu-ngu.json`: mỗi từ không dùng một mục `{"mau": "\\btừ\\b", "lyDo": "dùng ... thay cho ..."}` trong `tuCam`.
- Logo: ghi tên tệp vào `thuongHieu.chinh.logo` (`nenSang`, `nenToi`, biểu tượng nếu có). Logo chỉ có một bản: dùng cho loại nền hợp với nó, ghi chú trong PHONG-CACH mục 5.

## Bước 3 - Phân tích mẫu tham khảo (nếu có)

Có tệp trong `phong-cach/mau-tham-khao/`: nhìn từng mẫu, ghi `phong-cach/PHAN-TICH-MAU.md` theo bốn mục trong tệp đó (điều làm mẫu đẹp, điều chưa đạt chuẩn, chữ ký thị giác chung, ánh xạ sang khuôn). Đề xuất chỉnh họ màu, phông theo mẫu nếu khác nhiều; người dùng gật thì sửa brand.json. Học nguyên lý, không sao chép thiết kế, logo, hình minh hoạ của người khác.

## Bước 4 - Dựng thử ấn phẩm mẫu mang tên người dùng

Tạo một dự án thử: `python3 tools/du-an-moi.py "Thu phong cach" --khuon trich-dan` rồi thêm một file thứ hai từ khuôn `thong-cao` hoặc `gioi-thieu-chuyen-gia` (chép `khuon/<id>/mau.json` vào `thiet-ke/`, đổi `thuongHieu` thành `chinh`, thay tên, chức danh bằng của người dùng, một câu trích dẫn hoặc tên chương trình thật của họ; ảnh thì dùng ảnh mẫu trung tính nếu chưa có ảnh thật). Dựng nháp ở họ màu chính và họ sự kiện (`ve.py --nhap`, nơi có trình duyệt hoặc qua hàng đợi dựng), gửi tờ tổng thể. Hỏi đúng ba điều: màu có đúng cảm giác không, chữ và chức danh đúng chưa, logo cân đối chưa. Sửa brand.json, PHONG-CACH theo góp ý, dựng lại tới khi gật. Mỗi góp ý về chữ, chức danh ghi vào sổ tay góp ý (PHONG-CACH mục 6).

Không dựng được ở đâu cả: bỏ qua, ghi chú "chưa duyệt thử" trong PHONG-CACH, sẽ duyệt ở ấn phẩm đầu tiên.

Xong bước này: `python3 tools/cai-dat.py --danh-dau thiet-lap`.

## Bước 5 - Giới thiệu xưởng và bàn giao

Thiết lập xong mà người dùng chưa biết xưởng làm được gì cho họ thì chưa thật sự bàn giao.

**5a. Tóm tắt thiết lập (5-7 câu).** Đã cài gì, máy vẽ nào, họ màu nào, logo, cái gì còn treo (thư viện ảnh, logo chưa có). Nhắc: mọi thứ vừa chọn đều đổi được bằng một câu nói, hoặc sửa tay `phong-cach/PHONG-CACH.md`.

**5b. Giới thiệu có hệ thống (khoảng 10 phút).** Làm theo `references/gioi-thieu-xuong.md`: sáu chặng, mỗi lượt một chặng, kết bằng một câu hỏi; cá nhân hoá bằng những gì người dùng vừa kể. Cuối chặng 6: `python3 tools/cai-dat.py --danh-dau gioi-thieu`.

Người dùng nói "để sau" hay vắng mặt: tóm tắt chặng 1 và 6 trong một tin nhắn, vẫn ghi dấu, nói họ gọi lại bằng câu "giới thiệu lại xưởng". Kết bằng câu đầu tiên họ có thể nói để làm ấn phẩm thật.

Cuối phiên: dọn dự án thử nếu người dùng không cần (hỏi trước), và `python3 tools/kiem-sach.py` ĐẠT.

## Khi người dùng hỏi xưởng làm được gì (bất cứ lúc nào)

Không chạy lại thiết lập. Làm 5b (sáu chặng, hoặc chỉ chặng được hỏi), cập nhật theo PHONG-CACH và các dự án đã có trong `Nhap/`. Người dùng cũ hỏi "nên làm gì tiếp" thì gợi ý theo dự án họ đã làm (đã có bài đăng mà chưa có story, chưa có ảnh bìa trang...).

## Khi người dùng muốn đổi phong cách về sau

Đọc PHONG-CACH hiện tại, chỉ hỏi về phần muốn đổi, sửa PHONG-CACH + brand.json (+ tu-ngu.json), dựng thử lại một ấn phẩm để xác nhận, ghi sổ tay góp ý. Không hỏi lại từ đầu.

## Quy tắc cứng

- Chức danh, tên viết đúng nguyên văn người dùng đưa; không tự rút gọn, không tự "sửa cho hay".
- Không đưa tên, chức danh, màu, câu chữ của tác giả xưởng hay của người khác vào phong cách của người dùng.
- Ghi PHONG-CACH sau mỗi lượt hỏi, không gom tới cuối; máy đọc (brand.json, tu-ngu.json) luôn khớp người đọc (PHONG-CACH).
- Không xoá `thuongHieu.mau` và nội dung mẫu của khuôn (cần cho kiểm khuôn).
- Chưa dựng thử ĐẠT thì nói rõ, không nói "xưởng đã sẵn sàng".
