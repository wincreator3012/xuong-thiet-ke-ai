# Logo

Logo bạn thả vào đây ở lại trên máy bạn (`.gitignore` giữ chúng ngoài git chung). Thả logo của bạn vào đây (PNG nền trong suốt là tốt nhất; SVG cũng được), rồi báo Claude để ghi tên tệp vào `brand/brand.json` > `thuongHieu.chinh.logo`:

- `nenSang`: logo đặt trên nền sáng (thường là bản màu, chữ tối)
- `nenToi`: logo đặt trên nền tối (thường là bản trắng)
- `bieuTuongSang`, `bieuTuongToi`: biểu tượng vuông cho khổ nhỏ, ảnh đại diện
- khoá riêng tuỳ ý, ví dụ `trien` cho con dấu trên chứng nhận

Logo đối tác, chương trình khác: thả vào đây và thêm một mục trong `thuongHieu` (ví dụ `"doi-tac-a": {"ten": "...", "logo": {"nenSang": "..."}}`), trong ấn phẩm gọi bằng `"doi-tac-a:nenSang"`.

`logo-mau-sang.png`, `logo-mau-toi.png` là logo giả định của thương hiệu `mau` dùng cho nội dung mẫu của khuôn (`tools/kiem-khuon.py`). Giữ lại để kiểm khuôn chạy được.
