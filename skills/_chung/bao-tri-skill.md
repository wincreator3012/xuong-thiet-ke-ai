# Bảo trì skill thiet-ke-*

1. Sửa ở `skills/<skill>/` trong repo. Đây là nguồn duy nhất.
2. Nếu có cài skill vào tài khoản Claude (`skills/README.md`): cập nhật bản trên tài khoản ngay sau khi sửa (bản cập nhật thay toàn bộ SKILL.md). Skill tài khoản chỉ mang SKILL.md, nên mọi tham chiếu ghi đủ đường dẫn trong repo (`chuan/...`, `skills/_chung/...`).
3. Thêm skill mới: thêm một dòng vào bảng "Việc nào, skill nào" của `CLAUDE.md`.
4. Skill chứa CÁCH LÀM; số liệu chuẩn ở `chuan/`, chữ và chức danh ở PHONG-CACH, môi trường và lệnh ở `docs/QUY-TRINH-KY-THUAT.md`: chỉ trỏ tới, không chép lại.
5. Trường description là mô tả KÍCH HOẠT (khi nào dùng, câu người dùng hay nói, khi nào không dùng), tối đa 1024 ký tự, không ngoặc nhọn, không ghi lịch sử thay đổi.
6. Mục "Quy tắc cứng" chỉ gồm bất biến, 6-10 dòng.
7. Skill nào có ghi tệp thì chỉ trỏ tới `Du an/`, `Du an/_tam/`, `Thanh pham/`; không bao giờ viết đường dẫn ra nằm trong repo.
8. Không viết tên, chức danh, thương hiệu của bất kỳ ai cụ thể vào skill: mọi thứ riêng lấy từ PHONG-CACH và brand.json.
9. Sửa xong chạy `python3 tools/kiem-tai-lieu.py` phải ĐẠT.
