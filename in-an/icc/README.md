# Hồ sơ màu in (tệp .icc)

Đặt ở đây hồ sơ màu nhà in yêu cầu mà máy chưa có; `tools/in_an.py` tìm ở thư mục này trước, rồi tới thư mục hệ thống (Ubuntu `/usr/share/color/icc`, Mac `/Library/ColorSync/Profiles`, thư mục hồ sơ của Adobe). Tệp .icc không được đưa lên git (xem `.gitignore`).

| Id trong in_an.py | Tệp | Lấy ở đâu | Giấy phép |
|---|---|---|---|
| japan2001 | JapanColor2001Coated.icc | có sẵn khi cài Adobe Creative Cloud (`/Library/Application Support/Adobe/Color/Profiles/Recommended/`) hoặc gói "Adobe ICC Profiles" | miễn phí dùng, hạn chế phân phối lại |
| japan2001-khong-trang | JapanColor2001Uncoated.icc | như trên | như trên |
| japan2011 | JapanColor2011Coated.icc | gói `icc-profiles` (Ubuntu) | dùng, nhúng, chia sẻ tự do; không sửa, không bán |
| fogra39, fogra39-300 | ISOcoated_v2_eci.icc, ISOcoated_v2_300_eci.icc | https://www.eci.org/en/downloads (ECI_Offset_2009) | ECI: dùng, nhúng, chia sẻ tự do; không sửa, không bán |
| pso3, pso-khong-trang | PSOcoated_v3.icc, PSOuncoated_v3_FOGRA52.icc | eci.org (PSO Coated v3, PSO Uncoated v3) | như trên |

Không biết nhà in dùng gì: hỏi "nhà in dùng hồ sơ màu nào?". Mặc định của công cụ là japan2011 (gần Japan Color 2001 Coated phổ biến ở Việt Nam, và luôn có sẵn trong sandbox).
