#!/bin/bash
# DỰNG TRÊN MÁY: để Claude nhờ máy Mac của bạn dựng ảnh (khi nơi Claude chạy không có trình duyệt).
# Cách dùng: khi Claude nhờ, mở Finder, vào thư mục repo, bấm đúp file này. Giữ cửa sổ mở tới khi Claude báo xong;
# cửa sổ tự dừng sau 30 phút không có việc mới.
# Nếu macOS báo "không mở được vì từ nhà phát triển không xác định":
#   bấm chuột phải vào file, chọn Open (Mở), rồi Open lần nữa. Chỉ cần làm một lần.

cd "$(dirname "$0")" || exit 1

PY=""
for c in /opt/homebrew/bin/python3 /usr/local/bin/python3 /usr/bin/python3 python3; do
  if command -v "$c" >/dev/null 2>&1 && "$c" -c "import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)" 2>/dev/null; then
    PY="$c"; break
  fi
done
if [ -z "$PY" ]; then
  echo "Chưa có Python 3 trên máy. Mở Terminal, gõ:  xcode-select --install  rồi bấm đúp lại file này."
  if [ -t 0 ]; then read -r -n 1 -p "Bấm phím bất kỳ để đóng cửa sổ này..."; fi
  exit 1
fi

export PYTHONDONTWRITEBYTECODE=1  # không để __pycache__ trong repo
"$PY" tools/hang-doi-dung.py chay --cho 1800
if [ -t 0 ]; then read -r -n 1 -p "Bấm phím bất kỳ để đóng cửa sổ này..."; fi
