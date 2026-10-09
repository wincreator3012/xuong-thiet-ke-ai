# QUY TRÌNH KỸ THUẬT

Môi trường, lệnh, bản đồ tài nguyên, cổng nghiệm thu và cách xử lý khi một khâu hỏng. Tài liệu cho trợ lý AI; người dùng không cần đọc. Chỉ giữ điều đang đúng: sự thật đổi thì sửa thẳng vào đúng mục, bài học kèm câu chuyện thì ghi `docs/BAI-HOC.md`.

## 1. Bản đồ tài nguyên chuẩn

| Thứ | Ở đâu | Ghi chú |
|---|---|---|
| Tên, chức danh, từ ngữ, tông, sổ góp ý của người dùng | `phong-cach/PHONG-CACH.md` | bất khả xâm phạm mục 1, 4 |
| Luật chữ riêng cho máy kiểm | `phong-cach/tu-ngu.json` | ve.py đọc; luật chung đã có sẵn trong ve.py |
| Phân tích mẫu người dùng thích | `phong-cach/PHAN-TICH-MAU.md`, `phong-cach/mau-tham-khao/` | |
| Thương hiệu, họ màu, logo, nhân vật | `brand/brand.json`, `brand/logo/` | đổi giá trị chung: hỏi người dùng trước |
| Thể thức (kích thước, vùng an toàn, xuất) | `chuan/kho-the-thuc.json` | `python3 tools/ve.py --ds-the-thuc` |
| Chuẩn nghề (số, in, sân khấu, ảnh, minh hoạ, nghiệm thu, chữ) | `chuan/01` tới `chuan/08` | tư liệu gốc `nghien-cuu/` |
| Lõi dựng | `he-thong/khung.js`, `he-thong/khung.css`, `he-thong/bieu-tuong.css` | sửa xong chạy `tools/kiem-khuon.py` |
| Khuôn | `khuon/<id>/` (danh mục `khuon/README.md`) | 12 khuôn, mỗi khuôn có nội dung mẫu giả định |
| Sơ đồ tri thức, từ điển ẩn dụ | `minh-hoa/so-do.js`, `minh-hoa/an-du.json` | |
| Bài trình chiếu (PPTX) | `trinh-chieu/` (lõi, danh mục kiểu slide và sơ đồ ở README), `tools/slide.py`, `chuan/09-trinh-chieu.md` | sửa lõi xong chạy `tools/slide.py --kiem` |
| Phông | `fonts/` | tĩnh, OFL, đủ dấu tiếng Việt |
| Dựng, xuất, kiểm | `tools/ve.py` | |
| PDF in CMYK | `tools/in_an.py` (ve.py `--in` gọi), `tools/cai-gs.sh`, `in-an/icc/` | |
| Ảnh | `tools/anh.py`, `tools/models/` (YuNet) | |
| Bàn thiết kế | `Mo ban thiet ke.command` (Mac), `Mo ban thiet ke.bat` (Windows), `tools/ban-thiet-ke.py`, `tools/ban-thiet-ke/` | |
| Dựng trên máy thật khi nơi trợ lý chạy không có trình duyệt | `Dung tren may.command`, `Dung tren may.bat`, `tools/hang-doi-dung.py` | mục 2 |
| Thiết lập, kiểm môi trường | `tools/cai-dat.py` | `--trang-thai` |
| Tạo dự án | `tools/du-an-moi.py` | |
| Kiểm cả kho khuôn | `tools/kiem-khuon.py` | cổng sau khi sửa lõi, khuôn |
| Kiểm tài liệu, skill | `tools/kiem-tai-lieu.py` | cổng sau khi sửa tài liệu |
| Kiểm repo sạch | `tools/kiem-sach.py` | đầu và cuối phiên |
| Skill | `skills/` | bản ở đây là gốc |
| Bản khởi đầu phần của người dùng | `brand/brand.mau.json`, `phong-cach/PHONG-CACH.mau.md`, `phong-cach/tu-ngu.mau.json`, `phong-cach/PHAN-TICH-MAU.mau.md`, `minh-hoa/an-du.mau.json` | `tools/cai-dat.py` chép thành tệp không có `.mau` nếu chưa có; bản của người dùng không lên git (`.gitignore`), không bị cập nhật ghi đè |
| Đường dẫn riêng từng máy | `cau-hinh.json` (tạo bởi `tools/cai-dat.py` từ `cau-hinh.mau.json`, không lên git; đường dẫn tương đối tính từ repo) | `thuMucDuAn` = `../Du an`, `thuMucThanhPham` = `../Thanh pham` |

**Nháp và thành phẩm không bao giờ nằm trong repo.** Người dùng có một thư mục cha (gợi ý tên "AI Designer") chứa repo và hai thư mục làm việc cạnh nó: `Du an/<YYYY-MM tên dự án>/` chứa BRIEF.md, SO-GOP-Y.md, `nguon/`, `anh/`, `thiet-ke/` và bản dựng nháp `nhap/<tên ấn phẩm>/`; `Thanh pham/<tên dự án>/NN <tên ấn phẩm>/` chứa bản cuối (ảnh 2x, JPG, PDF in) do `ve.py` (không `--nhap`) hoặc nút Xuất của Bàn thiết kế ghi ra. `tools/cai-dat.py` tạo sẵn hai thư mục này. Người dùng muốn đẩy sang chỗ khác ở đầu cuộc trò chuyện thì dùng `--goc`, `--ra` cho phiên đó, không sửa `cau-hinh.json`. Cấu trúc dự án ở `tools/du-an-moi.py`; dự án có bài trình chiếu thêm `slide/<tên>.json` (`--slide`), bản cuối là `<tên>.pptx` và PDF chiếu dự phòng.

### Repo sạch (bất biến)

Repo chỉ chứa năng lực: chuẩn, thương hiệu và phong cách của người dùng, khuôn, lõi dựng, công cụ, skill, tài liệu. Mỗi loại tệp có đúng một nơi:

| Loại tệp | Nơi ghi |
|---|---|
| Brief, tư liệu người dùng đưa, ảnh đã xử lý, file ấn phẩm, bản nháp, tờ tổng thể, báo cáo kiểm | `Du an/<YYYY-MM tên dự án>/` |
| Bản cuối (ảnh 2x, PDF in), khi đóng gói thêm báo cáo nghiệm thu và `DANG.md` | `Thanh pham/<YYYY-MM tên dự án>/NN <tên ấn phẩm>/` (NN do `ve.py` đánh theo thứ tự xuất bản cuối lần đầu, xuất lại giữ số cũ) |
| Việc tạm của công cụ và trợ lý: kiểm khuôn, thử khuôn, hàng đợi dựng, ảnh so sánh, script dùng một lần | `Du an/_tam/`; ghi đè được, không cần lưu |
| Bản chép tệp gửi vào chat (ứng dụng Claude có thể tự tạo `Claude outputs/` trong thư mục đầu tiên được gắn) | không phải nơi làm việc: xoá cuối phiên, bản thật đã nằm ở `Du an/` hoặc `Thanh pham/` |

Máy giữ giúp: `ve.py`, `anh.py`, `du-an-moi.py`, `hang-doi-dung.py` từ chối ghi vào repo (báo DỪNG); `kiem-khuon.py` ghi vào `Du an/_tam/kiem-khuon/`; công cụ không để `__pycache__`. Cổng kiểm: `python3 tools/kiem-sach.py` liệt kê nháp lạc và tệp lạ trong repo, ĐẠT khi không còn gì. Dọn: nháp lạc thì xin phép người dùng xoá rồi `python3 tools/kiem-sach.py --xoa`; tệp lạ chưa rõ là gì thì hỏi, không tự xoá.

## 2. Nơi chạy lệnh

Việc dựng ảnh, PDF cần một trình duyệt Chromium (Playwright) hoặc Google Chrome. Mọi việc khác (đọc, sửa file ấn phẩm, brief, tạo dự án, kiểm tài liệu) chỉ cần Python 3.8+. Xác định mình đang ở trường hợp nào ngay đầu phiên (`python3 tools/cai-dat.py --trang-thai` in máy vẽ dùng được):

**A. Trợ lý chạy thẳng trên máy người dùng** (Claude Code, Codex, ChatGPT desktop, Antigravity, Cursor...). Chạy mọi lệnh tại chỗ. Máy vẽ: `chrome` (Mac, Linux: điều khiển Google Chrome có sẵn qua ống CDP, chỉ cần Python chuẩn) hoặc `playwright` (mọi hệ điều hành, kể cả Windows: `tools/cai-dat.py` cài `pip install playwright` rồi `python -m playwright install chromium`). ve.py tự chọn: có Playwright thì dùng, không thì Chrome.

**B. Claude Cowork trong ứng dụng Claude Desktop.** Claude chạm thư mục của người dùng qua một máy ảo Linux (`device_bash`) có gắn thư mục; máy ảo này thường **không có trình duyệt** và không tải được Chromium. Đọc, sửa, tạo dự án làm ở đó. Dựng ảnh theo thứ tự ưu tiên:
1. Phiên có sandbox đám mây (`Bash`, có Playwright và Chromium sẵn): đưa repo và dự án lên sandbox, dựng, đưa kết quả về đúng thư mục trên máy người dùng (cách làm ở `skills/_chung/van-hanh.md`).
2. Không có sandbox: xếp việc vào hàng đợi (`python3 tools/hang-doi-dung.py them <ấn phẩm.json> --nhap`), nhờ người dùng bấm đúp `Dung tren may.command` (Mac) hoặc `Dung tren may.bat` (Windows) ở gốc repo một lần; cửa sổ đó dựng bằng Chrome hoặc Playwright trên máy thật rồi chờ việc mới trong 30 phút. Đọc kết quả ở `Du an/_tam/hang-doi/<mã>.xong.json` và ảnh trong thư mục ra của ấn phẩm.
3. Người dùng tự xuất trên Bàn thiết kế (nút Xuất).

**C. Trợ lý chỉ chat trên web, không chạy được lệnh trên máy**: không vận hành được xưởng. Hướng dẫn người dùng cài một ứng dụng có quyền làm việc với thư mục (`BAT-DAU.md` bước 1).

Máy người dùng là bản gốc; sandbox đám mây mất khi hết phiên.

### Khởi động phiên ở sandbox đám mây (trường hợp B.1)

```bash
# 1. lấy repo: đóng gói trên máy RA NGOÀI repo rồi stage tệp đó (hoặc git clone nếu đã có mạng tới GitHub)
#    trên máy: cd <repo> && mkdir -p "../Du an/_tam" && tar czf "../Du an/_tam/repo.tgz" --exclude=.git --exclude="Claude outputs" .
#    ở sandbox: giải nén thành <làm việc>/<tên repo>, cạnh <làm việc>/Du an và <làm việc>/Thanh pham
# 2. thư viện (Playwright, Chromium thường đã có trong sandbox; không chạy "playwright install" nếu đã có)
pip install --break-system-packages pikepdf pillow-heif opencv-python-headless "rembg[cpu]"
# 3. khi cần PDF/X-4 cho trang có trong suốt (in ấn): khoảng 5 phút
bash tools/cai-gs.sh
# 4. kiểm nhanh
python3 tools/kiem-khuon.py thong-cao
```

Hồ sơ màu CMYK miễn phí trên Ubuntu nằm ở `/usr/share/color/icc` (gói `icc-profiles`); máy khác tải theo `in-an/icc/README.md`. Mô hình tách nền `u2net_human_seg` tự tải lần đầu (176 MB) vào `~/.u2net`.

### Trên máy người dùng (một lần, `tools/cai-dat.py` làm giúp)

- Python 3.8+ (Mac: có sẵn hoặc `xcode-select --install`; Windows: python.org, đánh dấu "Add python.exe to PATH").
- Google Chrome (Mac, Linux) hoặc Playwright (Windows, hoặc khi không có Chrome).
- `cau-hinh.json` từ `cau-hinh.mau.json`; thư mục `../Du an`, `../Thanh pham`.
- Tuỳ chọn: `pip install pillow numpy` (JPG 4:4:4, nhúng sRGB, kiểm tương phản), `opencv-python-headless pillow-heif` (chỉnh ảnh, ảnh iPhone), `pikepdf` và Ghostscript (PDF in CMYK: Mac `brew install ghostscript`).

## 3. Lệnh thường dùng

```bash
python3 tools/cai-dat.py [--trang-thai]                            # thiết lập, kiểm môi trường, dựng thử
python3 tools/du-an-moi.py "Tên dự án" --khuon thong-cao           # tạo dự án trong Du an/
python3 tools/ve.py <dự án>/thiet-ke/<tên>.json --nhap            # nháp nhanh mọi thể thức + tờ tổng thể + báo cáo
python3 tools/ve.py <...>.json                                      # bản xuất (2x cho feed, sRGB, PNG + JPG 4:4:4)
python3 tools/ve.py <...>.json --tt vuong,doc-9x16                  # chỉ vài thể thức
python3 tools/ve.py <...>.json --tt a4-ngang --in --ho-so-in japan2011  # thêm PDF in CMYK
python3 tools/ve.py <...>.json --tt "tu-do:1536x768"                # màn LED theo bản đồ điểm ảnh
python3 tools/ve.py <...>.json --trong-suot --tt ig-4x5             # PNG nền trong suốt (lớp chữ để ghép)
python3 tools/hang-doi-dung.py them <...>.json --nhap | chay | xem  # nhờ máy thật dựng (mục 2, B.2)
python3 tools/anh.py kham <ảnh...> | sua <ảnh> | tach-nen <ảnh> | dong-bo <mẫu> <ảnh...> | chuan-hoa <ảnh...> | tieu-diem <ảnh>
python3 tools/kiem-khuon.py [khuôn...]                              # cổng kiểm kho khuôn (kết quả ở Du an/_tam/kiem-khuon/)
python3 tools/kiem-tai-lieu.py                                      # cổng kiểm tài liệu, skill
python3 tools/kiem-sach.py [--xoa]                                  # cổng repo sạch
python3 tools/slide.py <dự án>/slide/<tên>.json --nhap               # trình chiếu nháp: PPTX + ảnh xem trước + tờ tổng thể + báo cáo (sandbox)
python3 tools/slide.py <...>.json                                   # bản cuối: PPTX + PDF chiếu dự phòng vào Thanh pham
python3 tools/slide.py --kiem                                       # cổng kiểm lõi trình chiếu (deck mẫu trinh-chieu/mau/)
python3 tools/slide.py "<bài có sẵn>.pptx"                           # bài làm ngoài xưởng: kiểm Google Slides, ảnh xem trước, chép chữ và ghi chú ra <tên>-chu.md (vào Du an/_tam/)
python3 tools/slide.py --xuat-phong "<thư mục ngoài repo>"          # phông TTF đủ dấu để cài cho PowerPoint, Keynote
python3 tools/du-an-moi.py "Tên dự án" --slide bai-noi [--chu-de giay-muc] [--en]
python3 tools/dong-goi.py "<dự án>" [--lam | --don [--xoa]]          # người dùng duyệt: đóng gói vào Thành phẩm (số, báo cáo, DANG.md), rồi dọn nháp
```

## 4. File ấn phẩm (thiet-ke/<tên>.json)

```json
{
  "khuon": "thong-cao",
  "thuongHieu": "chinh",
  "chuDe": "dem-vang",
  "theThuc": ["ig-4x5", "vuong", "doc-9x16", "fb-bia"],
  "bienThe": "the",
  "noiDung": { "tieuDe1": "...", "nguoi": [{ "anh": { "src": "anh/nguoi-tach.png", "tieuDiem": [0.5, 1] }, "ten": "TS~Nguyễn~Minh~An" }] },
  "theoNhom": { "ngang": { "an": ["moTa"], "noiDung": { "tieuDe1": "..." }, "css": { "nguoi.0.anh": { "height": "90%" } } } },
  "theoTheThuc": { "doc-9x16": { "an": [], "noiDung": {}, "css": {} } },
  "chinhTay": { "ig-4x5": { "ten": { "dx": 12, "dy": -30, "w": 420, "rot": 0, "coChu": 38 } } },
  "mauRieng": { "nhan": "#C9A24E" },
  "hatNui": 7
}
```

- Thứ tự áp: nội dung chung, rồi `theoNhom` (vuong, doc-nhe, doc, ngang, bang), rồi `theoTheThuc`; cuối cùng `chinhTay` (Bàn thiết kế ghi).
- `thuongHieu` bỏ trống thì lấy `brand/brand.json` > `thuongHieuMacDinh`; `chuDe` bỏ trống thì lấy chủ đề mặc định của thương hiệu.
- Đường dẫn ảnh tính từ thư mục dự án (`anh/...`); `kho:<đường dẫn>` lấy từ repo (logo, ảnh mẫu); logo đồng thương hiệu viết `"<id thương hiệu>:nenToi"`.
- Cú pháp chữ: `*nghiêng nhấn*`, `**đậm nhấn**`, `==tô màu nhấn==`, `^chỉ số trên^`, `~` giữ cụm từ, `\n` xuống dòng.
- Khoá phần tử trong mục lặp: `nguoi.0.ten` (dùng cho `an`, `css`, `chinhTay`).
- Ghi đè một biến màu, cỡ cho một phần tử: `css` nhận biến CSS (ví dụ `"cauHoi": {"--co": "0.88"}`); `font-size` đặt thẳng bị lõi co chữ ghi đè, nên dùng `--co`.

## 5. Cổng nghiệm thu

1. `tools/ve.py` không có cảnh báo LỖI (`tran-vung`, `tran-chu`, `loi-js`, `so-do`); cảnh báo khác đã xem và có lý do (`chuan/07`).
2. Trợ lý NHÌN tờ tổng thể và từng thể thức ở cỡ thật trước khi trình; đọc soát từng âm tiết chữ Việt; tên, chức danh đúng PHONG-CACH mục 1.
3. In ấn: báo cáo `in_an` đạt (phông nhúng, không RGB, TAC dưới giới hạn, hộp trang đúng).
4. Sửa lõi hay khuôn: `tools/kiem-khuon.py` ĐẠT trước khi dùng cho ấn phẩm thật; sửa lõi trình chiếu: `tools/slide.py --kiem` ĐẠT. Sửa tài liệu, skill: `tools/kiem-tai-lieu.py` ĐẠT.
5. Repo sạch: `python3 tools/kiem-sach.py` ĐẠT. Chạy cuối mọi phiên có chạm vào repo hoặc gửi tệp cho người dùng.
6. Bài trình chiếu: `tools/slide.py` không còn LỖI (`tran-chu`, `gian-chu`, `xml`, `so-do`, `tu-ngu`...), Claude đã NHÌN ảnh xem trước từng slide (chuan/09 mục 6, 9).

## 6. Khi một khâu hỏng

| Triệu chứng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| ve.py báo không có máy vẽ | không có Playwright, không tìm thấy Chrome | `python3 tools/cai-dat.py`; nơi không có trình duyệt thì dùng hàng đợi dựng (mục 2, B.2) |
| Chữ ra phông dự phòng, mất dấu | phông chưa nạp kịp, thiếu tệp con vietnamese | lõi chờ `document.fonts.load` theo chữ thật; kiểm `fonts/fonts.css` có đủ latin, latin-ext, vietnamese |
| Ảnh trống, khung đen | đường dẫn ảnh sai (tính từ thư mục dự án), tên có ký tự lạ | kiểm `noiDung`, dùng `tools/anh.py chuan-hoa` |
| Logo không hiện | `brand.json` chưa khai tên tệp, hoặc tên tệp khác tệp trong `brand/logo/` | sửa `thuongHieu.<id>.logo`; chưa có logo thì khuôn tự bỏ chỗ logo |
| Ảnh xuất bị cắt đáy khi tự dùng Chrome dòng lệnh | lỗi Chrome `--screenshot --window-size` thiếu 87 px | luôn xuất qua `ve.py` |
| Ảnh lớn hơn 100 triệu điểm ảnh ra nửa trắng | giới hạn của Chromium | ve.py tự hạ mật độ; phông lớn thiết kế ở tỉ lệ 1:10 |
| PDF in thành một ảnh lớn, mất chữ sống | Ghostscript < 10.06 với PDF/X-3 trên trang có trong suốt | in_an.py tự lùi về PDF CMYK 1.6; cần nhãn X-4 thì `bash tools/cai-gs.sh` (Linux) hoặc `brew install ghostscript` (Mac) |
| Chữ đen in ra 4 màu | bỏ qua bước xám trung tính sang K | luôn qua `in_an.py`, không gọi Ghostscript tay |
| Bàn thiết kế báo "file đã đổi" | trợ lý vừa sửa tệp hoặc dịch vụ đồng bộ đám mây vừa ghi | chọn nạp bản mới, hoặc ghi đè nếu chắc chắn; bản cũ luôn có trong `thiet-ke/_phien-ban/` |
| Sơ đồ chữ tràn, chồng | dữ liệu quá dài cho khung | rút nhãn; đổi `huong`; đổi kiểu sơ đồ; hoặc tăng vùng sơ đồ ở thể thức đó |
| Công cụ báo DỪNG vì đầu ra nằm trong repo | ấn phẩm hay `--ra` đang trỏ vào repo (ví dụ chạy thẳng `khuon/<id>/mau.json`) | tạo dự án ở `Du an/` (`du-an-moi.py`) hoặc thêm `--ra "../Du an/_tam/thu"` |
| Slide mở trên Google Slides bị chồng chữ, mất khoảng trắng | thuộc tính giãn chữ `spc` (charSpacing) | lõi không bao giờ giãn chữ; `tools/slide.py` báo `gian-chu` là LỖI (chuan/09 mục 7) |
| Slide mở trên PowerPoint, Keynote đổi phông, chữ tràn | máy chưa cài Lora, Playfair Display, Be Vietnam Pro | `python3 tools/slide.py --xuat-phong "<thư mục>"` rồi cài các tệp TTF; Google Slides không cần |
| Gạch đầu dòng mất ở đoạn có chữ đậm, nghiêng | PptxGenJS ghi nhiều `<a:pPr>` trong một đoạn | `tools/slide.py` tự sửa sau khi dựng; còn báo `xml` thì lõi hỏng |
| `kiem-sach.py` thấy `Claude outputs/` trong repo | ứng dụng chép tệp gửi vào chat | xin phép xoá rồi `python3 tools/kiem-sach.py --xoa` |
| macOS chặn tệp `.command` | tệp tải từ mạng chưa được tin cậy | bấm chuột phải, chọn Open, rồi Open lần nữa (một lần) |
| Windows: `python` không chạy | chưa cài Python hoặc chưa thêm vào PATH | cài từ python.org, đánh dấu "Add python.exe to PATH"; tệp `.bat` tự thử `py` và `python` |

## 7. Cập nhật bản mới của xưởng

Xưởng được tác giả cập nhật từ kinh nghiệm dùng thật. Lấy bản mới mà không mất phần của mình: `docs/DONG-GOP.md` mục "Cập nhật bản mới". Phần của người dùng không bao giờ bị ghi đè: `brand/brand.json`, logo trong `brand/logo/`, các tệp trong `phong-cach/` (trừ bản `*.mau.*`), `minh-hoa/an-du.json`, `cau-hinh.json`, và toàn bộ `Du an/`, `Thanh pham/` (nằm ngoài repo).
