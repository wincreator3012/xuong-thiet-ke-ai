---
name: thiet-ke-thiet-lap
description: "Dựng và thiết lập xưởng thiết kế riêng cho người dùng từ bản mẫu Xưởng thiết kế Claude (xuong-thiet-ke-ai): lấy bản mẫu về máy chỉ để đọc, dựng xưởng riêng bằng tools/dung-xuong.py (tên, tiền tố skill riêng), cài môi trường, phỏng vấn ngắn để điền phong cách của chính họ (tên, chức danh nguyên văn, họ màu, logo, giọng chữ), dựng thử ấn phẩm mang tên họ, tạo bộ skill riêng và hướng dẫn lưu vào tài khoản AI, giới thiệu xưởng có hệ thống, cập nhật xưởng từ bản mẫu mới. Kích hoạt khi người dùng đưa link hay thư mục bản mẫu, nói 'dựng xưởng', 'thiết lập xưởng', 'bắt đầu', 'cài đặt', 'đổi phong cách', 'đổi màu, logo, chức danh mặc định', 'tạo skill', 'lưu skill vào tài khoản', 'skill là gì', 'cập nhật xưởng từ bản mẫu mới', 'xưởng làm được gì', 'giới thiệu xưởng', 'hướng dẫn tôi cách dùng', hoặc khi chưa có xưởng riêng, phong cách còn chỗ trống, skill chưa lưu, chưa giới thiệu xưởng."
---

# Dựng và thiết lập xưởng thiết kế riêng

Mục tiêu: sau khoảng 60-90 phút, người dùng (chuyên gia, giảng viên, diễn giả mới dùng AI) có một xưởng RIÊNG chạy được trên máy của họ, mang tên, chức danh, màu, logo và giọng chữ đúng ý họ; có bộ skill mang tên họ đã lưu vào tài khoản AI và hiểu skill dùng thế nào; đã thấy một ấn phẩm mẫu mang tên mình; biết xưởng làm được gì và câu đầu tiên cần nói. Nguyên tắc: hỏi ít, mỗi lượt tối đa 4 câu, luôn có phương án mặc định, giải thích bằng lời thường, không bắt người dùng đọc tài liệu kỹ thuật. Người dùng vắng mặt thì chọn mặc định và ghi rõ giả định vào PHONG-CACH.md.

Phong cách là của NGƯỜI DÙNG. Không đề xuất tên, chức danh, màu, câu chữ của tác giả bản mẫu hay của bất kỳ ai khác.

Bản mẫu chỉ để đọc. Không làm việc, không cài, không ghi phong cách trong bản mẫu; không `git pull`, `git push`, commit hay mở pull request (`BAN-MAU.md`). Mọi bước từ bước 3 trở đi chạy TRONG xưởng riêng.

## Bước 0 - Định vị

Đọc `CLAUDE.md` (trợ lý khác Claude: `AGENTS.md`) và `BAN-MAU.md` nếu chưa đọc trong phiên. Xác định nơi chạy lệnh (`docs/QUY-TRINH-KY-THUAT.md` mục 2): trợ lý chạy thẳng trên máy người dùng, hay Claude Cowork có máy ảo gắn thư mục (và có sandbox đám mây hay không). Chưa có quyền vào thư mục nào trên máy thì dừng, hướng dẫn người dùng tạo thư mục "AI Designer" và thêm vào ứng dụng (Claude: nút thêm thư mục trong Cowork; ứng dụng khác: mở thư mục làm dự án) theo `BAT-DAU.md`.

Rồi xem đang có gì trong thư mục cha:

| Thấy | Làm |
|---|---|
| Chưa có bản mẫu trên máy (người dùng chỉ đưa link) | bước 1 |
| Có bản mẫu (`BAN-MAU.md`), chưa có xưởng riêng (`XUONG.json`) | bản mẫu nằm ngoài `_ban-mau/` thì chuyển vào đó (giải thích một câu: bản mẫu chỉ để đọc, xưởng của bạn sẽ ở cạnh), rồi bước 2 |
| Đã có xưởng riêng | bỏ qua bước 1-2; `python3 tools/cai-dat.py --trang-thai` và `python3 tools/dung-xuong.py --trang-thai` trong xưởng cho biết làm tiếp từ bước nào |
| Xưởng kiểu cũ (thư mục `xuong-thiet-ke-ai` đã có `brand/brand.json`, chưa có `XUONG.json`) | hỏi người dùng có muốn chuyển sang xưởng riêng không (mất khoảng 10 phút, giữ nguyên phong cách và dự án); đồng ý thì bước 1, rồi bước 2 với `--mang-theo "<thư mục cũ>"` |

## Bước 1 - Lấy bản mẫu về máy

Tải bản mẫu vào `AI Designer/_ban-mau/xuong-thiet-ke-ai/` theo `BAN-MAU.md` mục "Lấy bản mẫu về máy". Mạng của trợ lý bị chặn: nhờ người dùng tải ZIP và đặt đúng chỗ, hướng dẫn từng cú bấm. Báo người dùng một câu: "Mình tải bản mẫu về để học; nó chỉ để đọc, xưởng của bạn sẽ được dựng riêng bên cạnh."

## Bước 2 - Dựng xưởng riêng

Hỏi một lượt ba câu (Claude: AskUserQuestion), giải thích ngắn từng câu:

1. **Tên hiển thị** của người dùng, đúng cách họ muốn (học vị, dấu chấm): dùng cho README của xưởng và phần đầu skill. Chức danh đầy đủ hỏi ở bước 4.
2. **Tên thư mục xưởng**: gợi ý `xuong-thiet-ke-<tên ngắn không dấu>`; không dấu, không ký tự lạ để mọi ứng dụng đọc được.
3. **Tiền tố skill**: 2-10 chữ thường không dấu, thường là chữ viết tắt tên (Trần Thu Hà: `ha` hoặc `tth`). Giải thích: skill của bạn sẽ tên `<tiền tố>-thiet-ke`, `<tiền tố>-thiet-ke-slide`... để không trùng skill khác trên tài khoản và bạn nhận ra ngay skill của mình. Hỏi luôn cách người dùng muốn được gọi (bạn, chị, thầy, cô...).

Chạy trong bản mẫu: `python3 tools/dung-xuong.py --dich "../../<tên thư mục xưởng>" --chu "<tên hiển thị>" --tien-to <tiền tố> --xung-ho "<cách gọi>"` (thêm `--duong-dan-may "<đường dẫn AI Designer như người dùng thấy>"` nếu biết; thêm `--mang-theo "<thư mục cũ>"` khi chuyển từ xưởng kiểu cũ). Lệnh chép phần năng lực sang xưởng mới, tạo `README.md`, `.gitignore`, `XUONG.json`, và cá nhân hoá skill (tên có tiền tố, khối "Xưởng:" đầu mỗi skill). Báo người dùng bằng lời thường: xưởng của bạn đã có ở thư mục nào, từ nay mọi việc làm ở đó.

Từ đây chuyển hẳn sang xưởng mới: đọc lại `CLAUDE.md` của xưởng nếu cần, mọi lệnh chạy ở gốc xưởng mới.

## Bước 3 - Cài và kiểm môi trường

Chạy ở gốc xưởng riêng: `python3 tools/cai-dat.py` (Windows: `py tools\cai-dat.py` hoặc `python tools\cai-dat.py`). Lệnh tự bỏ qua bước đã xong. Mã thoát 2 = đang tải, chạy lại y nguyên tới khi thấy "CÀI XONG". Báo tiến độ bằng lời thường ("đang cài bộ dựng ảnh").

- Có máy vẽ và dựng thử ĐẠT: sang bước 4.
- Không có máy vẽ (thường gặp ở máy ảo Claude Cowork): không phải lỗi. Nếu phiên có sandbox đám mây thì dựng ở đó (`skills/_chung/van-hanh.md`); không thì dùng hàng đợi dựng (`Dung tren may.command` / `.bat`) ở bước 5. Báo người dùng một câu: "Máy làm việc của mình không có trình duyệt, nên khi cần dựng ảnh mình sẽ nhờ bạn bấm đúp một tệp để máy bạn dựng."
- Dựng thử KHÔNG ĐẠT: đọc chẩn đoán, sửa (thường thiếu Chrome hoặc Playwright chưa tải xong), chạy lại. Chưa đạt thì chưa làm ấn phẩm thật.
- Người dùng muốn chỉnh ảnh, tách nền, làm file in: `python3 tools/cai-dat.py --anh` (và `--tach-nen`); không cần thì để sau.

## Bước 4 - Phỏng vấn phong cách (3 lượt)

Đọc `phong-cach/PHONG-CACH.md` (bước 3 đã chép từ bản khởi đầu `PHONG-CACH.mau.md`, còn chỗ trống trong ngoặc vuông; sửa bản không có `.mau`) và phần `chuDe` của `brand/brand.json` trước. Dùng câu hỏi có lựa chọn sẵn (Claude: AskUserQuestion), mỗi lượt tối đa 4 câu.

**Lượt 1, về người dùng**: tên hiển thị kèm học vị (hỏi đúng cách viết học vị: "TS" hay "TS."); chức danh đúng nguyên văn (nhấn mạnh sẽ hiện y như vậy trên mọi ấn phẩm, hỏi lại chính tả chữ dễ nhầm); có bản chức danh thứ hai không (bản ngắn, bản dễ hiểu, bản tiếng Anh) và khi nào dùng; đơn vị, chương trình thường đứng tên. Lĩnh vực chuyên môn và người xem chính hỏi luôn nếu chưa rõ.

**Lượt 2, về sản phẩm và cảm giác**: ấn phẩm hay làm (đa chọn: bài mạng xã hội, giới thiệu diễn giả, sơ đồ kiến thức, trích dẫn, chứng nhận, tài liệu in, phông sự kiện); kênh đăng; ba từ tả cảm giác muốn người xem nhận được; họ màu: trình sáu họ khởi đầu bằng một câu cảm giác mỗi họ (giay-muc điềm tĩnh và sâu; than-dong trầm ấm; dem-vang sang trọng cho sự kiện; dem-xanh rõ ràng cho giải thích; am-ap gần gũi; trang-xanh hiện đại), kèm lựa chọn "pha từ màu logo của tôi" và "mô tả riêng". Gợi ý một họ chính cho ấn phẩm thường ngày và một họ cho sự kiện.

**Lượt 3, về chữ, logo, mẫu**: xưng hô với người xem; từ ngữ phải viết đúng (tên chương trình, thuật ngữ nghề) và từ không bao giờ dùng; giữ hay đổi quy ước chữ mặc định của xưởng (PHONG-CACH mục 4); có logo không (có thì nhờ thả vào `brand/logo/` ngay); có ấn phẩm mẫu nào thích không (có thì nhờ thả vào `phong-cach/mau-tham-khao/`).

Mỗi lượt xong, ghi ngay vào PHONG-CACH.md (thay đúng chỗ trống tương ứng, giữ cấu trúc tệp, đổi cả tiêu đề tệp thành tên người dùng), rồi mới hỏi lượt kế. Ghi máy đọc song song:

- `brand/brand.json`: `nhanVat.chinh` (ten, hocVi, tenDayDu, chungChi, chucDanh với các bản), `thuongHieu.chinh` (ten, chuDeMacDinh, chuDeHop, logo theo tệp đã thả, khauHieu, website), `cap-nhat`. Giữ nguyên `thuongHieu.mau` (dùng cho kiểm khuôn).
- Họ màu riêng (pha từ logo hay mô tả): chép một họ gần nhất trong `chuDe` thành khoá mới, đổi mã màu theo vai; quy tắc: `chu` trên `nen` tương phản ít nhất 7:1, `chuPhu` ít nhất 4.5:1, `nhan` là màu duy nhất có cá tính, `vienThe`, `vachMo` chỉ nhạt hơn nền một chút; nền tối thì `toi: true`.
- `phong-cach/tu-ngu.json`: mỗi từ không dùng một mục `{"mau": "\\btừ\\b", "lyDo": "dùng ... thay cho ..."}` trong `tuCam`.
- Logo: ghi tên tệp vào `thuongHieu.chinh.logo` (`nenSang`, `nenToi`, biểu tượng nếu có). Logo chỉ có một bản: dùng cho loại nền hợp với nó, ghi chú trong PHONG-CACH mục 5.

## Bước 5 - Phân tích mẫu, dựng thử ấn phẩm mang tên người dùng

**5a. Phân tích mẫu tham khảo (nếu có).** Có tệp trong `phong-cach/mau-tham-khao/`: nhìn từng mẫu, ghi `phong-cach/PHAN-TICH-MAU.md` theo bốn mục trong tệp đó (điều làm mẫu đẹp, điều chưa đạt chuẩn, chữ ký thị giác chung, ánh xạ sang khuôn). Đề xuất chỉnh họ màu, phông theo mẫu nếu khác nhiều; người dùng gật thì sửa brand.json. Học nguyên lý, không sao chép thiết kế, logo, hình minh hoạ của người khác.

**5b. Dựng thử.** Tạo một dự án thử: `python3 tools/du-an-moi.py "Thu phong cach" --khuon trich-dan` rồi thêm một file thứ hai từ khuôn `thong-cao` hoặc `gioi-thieu-chuyen-gia` (chép `khuon/<id>/mau.json` vào `thiet-ke/`, đổi `thuongHieu` thành `chinh`, thay tên, chức danh bằng của người dùng, một câu trích dẫn hoặc tên chương trình thật của họ; ảnh thì dùng ảnh mẫu trung tính nếu chưa có ảnh thật). Dựng nháp ở họ màu chính và họ sự kiện (`ve.py --nhap`, nơi có trình duyệt hoặc qua hàng đợi dựng), gửi tờ tổng thể. Hỏi đúng ba điều: màu có đúng cảm giác không, chữ và chức danh đúng chưa, logo cân đối chưa. Sửa brand.json, PHONG-CACH theo góp ý, dựng lại tới khi gật. Mỗi góp ý về chữ, chức danh ghi vào sổ tay góp ý (PHONG-CACH mục 6).

Không dựng được ở đâu cả: bỏ qua, ghi chú "chưa duyệt thử" trong PHONG-CACH, sẽ duyệt ở ấn phẩm đầu tiên.

Xong bước này: `python3 tools/cai-dat.py --danh-dau thiet-lap`.

## Bước 6 - Tạo skill riêng và lưu vào tài khoản AI

Xưởng đã có sáu skill mang tiền tố của người dùng (`XUONG.json` > `skill`). Bước này làm chúng thật sự là của người dùng, đưa chúng lên tài khoản AI, và giúp người dùng hiểu để tự dùng. Nguồn sự thật cho mọi điều nói với người dùng: `skills/README.md`.

**6a. Cá nhân hoá mô tả kích hoạt.** Với từng `skills/*/SKILL.md`, viết lại phần `description` theo người dùng: câu họ hay nói, ấn phẩm họ hay làm, tên chương trình của họ (lấy từ bước 4), cách họ muốn được gọi ("Kích hoạt khi chị Hà nói..."). Giữ nguyên `name`, giữ phần "KHÔNG dùng cho...", tên skill khác có tiền tố, dưới 1024 ký tự, không ngoặc nhọn. Không đổi các bước trong thân skill. Rồi `python3 tools/kiem-tai-lieu.py` ĐẠT.

**6b. Giải thích skill là gì (3-5 câu, lời thường).** Theo `skills/README.md` mục "Skill là gì": skill là tờ quy trình nghề của trợ lý; trợ lý đọc mô tả, khớp lời bạn thì làm theo từng bước; nhờ vậy kết quả nhất quán và bạn không phải dặn lại; skill là quy trình, đồ nghề nằm trong xưởng nên vẫn cần mở thư mục "AI Designer".

**6c. Đóng gói.** `python3 tools/dung-xuong.py --goi-skill`: tạo ZIP trong `AI Designer/Goi skill/` và bản cho ứng dụng tự đọc trong `AI Designer/.agents/skills/`, `AI Designer/.claude/skills/`.

**6d. Lưu vào tài khoản, theo đúng ứng dụng người dùng đang dùng** (`skills/README.md` mục "Lưu skill vào tài khoản AI"):

- Claude Cowork có công cụ đề xuất skill (thẻ duyệt trong cuộc trò chuyện): đề xuất các skill vừa cá nhân hoá, mỗi thẻ tối đa ba skill, nội dung là trọn `SKILL.md` của xưởng; nói người dùng đọc rồi bấm lưu. Không có công cụ đó: hướng dẫn tải từng ZIP lên, từng cú bấm, chờ người dùng báo xong từng bước.
- ChatGPT (gói có skill): hướng dẫn tải ZIP lên. Gói chưa có: nói thẳng, và nói trợ lý vẫn đọc skill từ thư mục khi mở "AI Designer".
- Codex, Antigravity, Claude Code: không cần tải lên; mở thư mục "AI Designer" là thấy. Người dùng muốn dùng ở mọi thư mục thì chép sang thư mục skill chung của ứng dụng (đường dẫn trong `skills/README.md`), hỏi trước khi chép.

Lưu xong ở đâu: `python3 tools/dung-xuong.py --da-luu <nơi>`.

**6e. Thử một lần.** Người dùng nói một câu kích hoạt thật (từ mô tả vừa viết), trợ lý cho biết skill nào được dùng. Không kích hoạt: sửa mô tả, đóng gói, lưu lại.

**6f. Ba thói quen dùng skill** (nói ngắn): nói tự nhiên là đủ, muốn chắc thì gọi đích danh tên skill; luôn mở hay nối thư mục "AI Designer"; sửa quy trình thì nhờ trợ lý sửa nguồn trong xưởng rồi lưu lại, không sửa thẳng trên tài khoản.

Người dùng muốn để sau: ghi chú trong PHONG-CACH mục 6, nói xưởng vẫn chạy đầy đủ khi mở thư mục, và câu gọi lại: "tạo skill cho tôi".

## Bước 7 - Giới thiệu xưởng và bàn giao

Thiết lập xong mà người dùng chưa biết xưởng làm được gì cho họ thì chưa thật sự bàn giao.

**7a. Tóm tắt thiết lập (5-7 câu).** Xưởng ở đâu, đã cài gì, máy vẽ nào, họ màu nào, logo, skill nào đã lưu ở đâu, cái gì còn treo (thư viện ảnh, logo chưa có, skill chưa lưu). Nhắc: mọi thứ vừa chọn đều đổi được bằng một câu nói, hoặc sửa tay `phong-cach/PHONG-CACH.md`.

**7b. Giới thiệu có hệ thống (khoảng 10 phút).** Làm theo `references/gioi-thieu-xuong.md`: sáu chặng, mỗi lượt một chặng, kết bằng một câu hỏi; cá nhân hoá bằng những gì người dùng vừa kể. Cuối chặng 6: `python3 tools/cai-dat.py --danh-dau gioi-thieu`.

Người dùng nói "để sau" hay vắng mặt: tóm tắt chặng 1 và 6 trong một tin nhắn, vẫn ghi dấu, nói họ gọi lại bằng câu "giới thiệu lại xưởng". Kết bằng câu đầu tiên họ có thể nói để làm ấn phẩm thật.

Cuối phiên: dọn dự án thử nếu người dùng không cần (hỏi trước), và `python3 tools/kiem-sach.py` ĐẠT.

## Khi người dùng hỏi xưởng làm được gì (bất cứ lúc nào)

Không chạy lại thiết lập. Làm 7b (sáu chặng, hoặc chỉ chặng được hỏi), cập nhật theo PHONG-CACH và các dự án đã có trong `Du an/`. Người dùng cũ hỏi "nên làm gì tiếp" thì gợi ý theo dự án họ đã làm (đã có bài đăng mà chưa có story, chưa có ảnh bìa trang...).

## Khi người dùng muốn đổi phong cách về sau

Đọc PHONG-CACH hiện tại, chỉ hỏi về phần muốn đổi, sửa PHONG-CACH + brand.json (+ tu-ngu.json), dựng thử lại một ấn phẩm để xác nhận, ghi sổ tay góp ý. Không hỏi lại từ đầu. Đổi cách xưng hô, tên hiển thị hay những câu hay nói thì sửa luôn mô tả skill (bước 6a), đóng gói và nhắc lưu lại.

## Khi người dùng muốn cập nhật xưởng từ bản mẫu mới

Người dùng nói "cập nhật xưởng", "lấy bản mới", hay hỏi bản mẫu có gì mới. Làm theo `docs/DONG-GOP.md` mục "Cập nhật xưởng từ bản mẫu mới": tải bản mẫu mới vào `_ban-mau/xuong-thiet-ke-ai-moi/`; trong xưởng chạy `python3 tools/dung-xuong.py --cap-nhat "../_ban-mau/xuong-thiet-ke-ai-moi"` để xem, kể cho người dùng bằng lời thường có gì mới; rồi `--lam` (chép phần họ chưa sửa, tự trộn phần không đụng nhau); trộn tay phần còn lại, mỗi chỗ người dùng đã sửa thì hỏi giữ bản nào; `--xong-cap-nhat`; chạy các cổng kiểm; skill đổi thì đóng gói và lưu lại (bước 6c-6d). Không bao giờ chép đè phần người dùng đã sửa mà không hỏi.

## Quy tắc cứng

- Chức danh, tên viết đúng nguyên văn người dùng đưa; không tự rút gọn, không tự "sửa cho hay".
- Không đưa tên, chức danh, màu, câu chữ của tác giả xưởng hay của người khác vào phong cách của người dùng.
- Ghi PHONG-CACH sau mỗi lượt hỏi, không gom tới cuối; máy đọc (brand.json, tu-ngu.json) luôn khớp người đọc (PHONG-CACH).
- Không xoá `thuongHieu.mau` và nội dung mẫu của khuôn (cần cho kiểm khuôn).
- Bản mẫu chỉ để đọc: không làm việc, không sửa, không pull, push, commit trong đó; không đẩy xưởng của người dùng lên repo của tác giả.
- Skill của người dùng sửa ở nguồn trong xưởng trước, rồi mới đóng gói và lưu lại; mô tả kích hoạt dưới 1024 ký tự.
- Chưa dựng thử ĐẠT thì nói rõ, không nói "xưởng đã sẵn sàng".
