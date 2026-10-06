---
name: thiet-ke-in-su-kien
description: "Thiết kế và chuẩn bị file cho ấn phẩm vật lý trong Xưởng thiết kế Claude (repo Claude-Designer-for-Speaker): handout, worksheet, workbook, tờ rơi, brochure, poster, giấy chứng nhận, danh thiếp, thẻ đeo, bảng tên; phông sân khấu, backdrop, màn LED, máy chiếu, standee chữ X, roll-up, photo wall; đúng chuẩn nhà in Việt Nam (tràn lề, vùng an toàn, ppi theo khoảng cách xem, CMYK, hồ sơ màu Japan Color hay FOGRA, đen K100, tổng mực, PDF/X-4) và chuẩn sân khấu (vùng người đứng, chữ đọc từ hàng ghế cuối, bản đồ điểm ảnh LED). Kích hoạt khi người dùng nói 'in', 'file in', 'gửi nhà in', 'handout', 'workbook', 'chứng nhận', 'giấy khen', 'danh thiếp', 'thẻ đeo', 'standee', 'roll-up', 'phông sân khấu', 'backdrop', 'màn LED', 'photo wall', 'bộ nhận diện sự kiện', hoặc khi một ấn phẩm của skill thiet-ke có thể thức in hay sân khấu. Dùng cùng thiet-ke (lõi brief, khuôn, nghiệm thu). KHÔNG dùng cho ấn phẩm chỉ đăng mạng (thiet-ke) hay sách dàn trang dài (cần công cụ dàn trang riêng)."
---

# In ấn và sân khấu: từ khuôn tới file nhà in, màn LED

Đi cùng skill thiet-ke (brief, file ấn phẩm, Bàn thiết kế, nghiệm thu chung). Đọc trước: `skills/_chung/van-hanh.md`, `chuan/03-in-an.md`, `chuan/04-san-khau-su-kien.md`; số đo từng thể thức ở `chuan/kho-the-thuc.json` (`python3 tools/ve.py --ds-the-thuc`).

## Bước 1 - Hỏi đủ thông số thật trước khi dựng

Bổ sung vào BRIEF.md của dự án (hỏi một lượt, chỉ những gì chưa rõ):

- **In**: khổ thành phẩm ngang x cao, số lượng, giấy (couche bóng, mờ, Fort, ivory, kraft, mỹ thuật), gia công (cán màng, gấp, bế, ép kim, đóng ghim), nhà in và **hồ sơ màu nhà in dùng** (không biết thì mặc định Japan Color, ghi rõ là giả định), hạn giao file.
- **Phông**: kích thước thật, chiều cao sân khấu, vị trí bục phát biểu, có màn LED ở giữa không, khoảng cách hàng ghế cuối, vật liệu (hiflex mờ đế xám, canvas), đơn vị thi công có file khuôn không.
- **Màn LED**: **bản đồ điểm ảnh** từ đơn vị thuê màn (vd 1536x768), ảnh tĩnh hay video, bộ xử lý nhận định dạng nào. Không có bản đồ thì tính từ kích thước và bước điểm ảnh (chuan/04 mục 3) và ghi là giả định.
- **Standee, roll-up**: xin file khuôn nhà in (phần đáy cuộn, khoen).

## Bước 2 - Chọn thể thức và khuôn

- Có trong kho: `a4-doc`, `a4-ngang`, `a5-doc`, `a3-doc`, `poster-60x90`, `danh-thiep`, `the-deo`, `standee-x-60x160`, `rollup-80x200`, `backdrop-6x3`, `backdrop-4x25`, `photo-wall-25x23`. Khổ khác: `in:<rộng>x<cao>mm+<tràn lề>mm@<dpi>dpi:1-<tỉ lệ>` (phông lớn hơn 5 m luôn thiết kế ở tỉ lệ 1:10, photo wall 1:5); màn LED, máy chiếu: `tu-do:<W>x<H>` (RGB, không CMYK). Kích thước thường dùng nhiều lần thì thêm vào kho kèm vùng an toàn và nguồn.
- Khuôn: `backdrop-su-kien` (phông, LED, standee sự kiện), `chung-nhan`, `the-deo`, `photo-wall`; `thong-cao` cũng dàn được standee, poster (nhóm doc, doc-nhe). Handout, worksheet nhiều trang chưa có khuôn: dựng khuôn mới theo `khuon/README.md` với lưới 6 hoặc 12 cột, chữ thân 10-11 pt (khoảng 1,9-2,1 cqmin trên A4), giãn dòng 1,4-1,5, rồi `tools/kiem-khuon.py`.
- **Bộ nhận diện sự kiện**: một file nội dung, nhiều thể thức (phông, LED, standee, thẻ đeo, bài đăng, story): cùng thông tin, cùng họ màu, khác bố cục theo khổ.

## Bước 3 - Dựng, xem như người thật sẽ thấy

- Nháp: `python3 tools/ve.py <file> --nhap`. Bàn thiết kế tô vùng an toàn, vùng phải để trống (khoen, người đứng trước phông).
- Phông, standee: xem ở tỉ lệ có bóng người 1,7 m và bục; chữ đọc được theo khoảng cách (chiều cao chữ hoa ≈ khoảng cách / 3 là giới hạn, / 1,5-2 là thoải mái); thông tin chính ở 40% trên của phông; không đặt mặt người, logo, chữ trên đường ghép bạt.
- Chữ trên phông, standee, màn LED, thẻ đeo, chứng nhận, handout: chọn và cắt theo skill thiet-ke-chu (định mức số tiếng `chuan/08` mục 6; đọc từ xa khoảng một từ mỗi giây); phông không mang lời kêu gọi bán hàng.
- Màn LED: thông tin chính ở 2/3 trên, nền tối, tương phản cao, không nét mảnh, không hoa văn li ti (moiré khi quay).
- Ảnh chụp trong ấn phẩm in: đủ ppi ở kích thước thật (`tools/anh.py kham` báo đủ cho A4, A5 chưa); không phóng ảnh nhỏ.
- Vàng kim của họ đêm-vàng: in CMYK thành vàng đất đục. Hỏi người dùng: ép kim, mực nhũ (cần lớp riêng cho nhà in, làm cùng nhà in) hay đổi sang vàng đất phẳng và kiểm lại tương phản.

## Bước 4 - Xuất file nhà in

- `python3 tools/ve.py <file> --tt <id> --in --ho-so-in <japan2001|japan2011|fogra39|pso3|pso-khong-trang>`: PDF RGB (chữ vector) → `tools/in_an.py`: khổ và TrimBox, BleedBox đúng, chữ đen về K100, CMYK theo hồ sơ, PDF/X-4 khi Ghostscript ≥ 10.06 (Linux, sandbox: `bash tools/cai-gs.sh` một lần mỗi phiên; Mac: `brew install ghostscript`), kiểm phông nhúng, không còn RGB, tổng mực dưới giới hạn. Ra `<tên>-<khổ>-IN-CMYK-<hồ sơ>.pdf` cùng PNG xem trước.
- Đọc báo cáo in: TAC vượt giới hạn thì giảm mảng tối, đen giàu; còn RGB, phông chưa nhúng là LỖI.
- Màn LED, máy chiếu: PNG RGB đúng bản đồ điểm ảnh (`--tt tu-do:WxH`); video không thuộc xưởng này.
- Nhà in xin TIFF CMYK (một số xưởng bạt): `gs -dSAFER -dNOPAUSE -dBATCH -sDEVICE=tiff32nc -r<dpi> -sCompression=lzw -sOutputICCProfile=<icc> -o <ra>.tif <PDF in>`.
- Kèm ghi chú gửi nhà in: khổ thành phẩm, tràn lề, hồ sơ màu đã dùng, giấy, gia công, số lượng; đề nghị in thử khi màu thương hiệu quan trọng. Nhà in đòi file AI, CDR chữ chuyển nét: gửi PDF/X-4 trước, nói rõ họ cần chuyển nét ở khâu của họ.

## Quy tắc cứng

- Tràn lề và vùng an toàn theo kho thể thức; không đặt nội dung quan trọng ở nếp gấp, khoen, 15 cm đáy roll-up, vùng người đứng trước phông.
- File in luôn qua `in_an.py` (không gọi Ghostscript tay): chữ đen K100, CMYK đúng hồ sơ, phông nhúng, TAC dưới giới hạn.
- Màn LED luôn RGB, đúng bản đồ điểm ảnh; không gửi 1920x1080 cho màn không phải 16:9.
- Chữ đọc được ở khoảng cách xem thật; chữ in khổ nhỏ từ 7 pt (Việt có dấu), chữ trắng trên nền màu từ 8-9 pt.
- Giả định (hồ sơ màu, kích thước, bản đồ điểm ảnh) phải ghi rõ trong BRIEF và nói với người dùng trước khi gửi nhà in.
- Tên, chức danh trên thẻ đeo, chứng nhận, phông theo PHONG-CACH mục 1 nguyên văn; chữ theo PHONG-CACH mục 4.
- File in cuối ghi vào `Thanh pham/<tên dự án>/<tên>/` (hoặc chỗ người dùng chỉ định ở đầu cuộc trò chuyện). Bản in thử, PDF nháp, báo cáo `in_an` ở `Nhap/<dự án>/nhap/`; không file in nào ở trong repo (`ve.py` tự dừng). Dọn cuối phiên: `skills/_chung/van-hanh.md` mục "Repo sạch".
