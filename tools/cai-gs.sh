#!/bin/bash
# Dựng Ghostscript 10.08 (đủ PDF/X-4 cho trang có trong suốt) vào ~/.cache/xuong-gs trong sandbox đám mây.
# Ubuntu chỉ có 10.02 (không làm được PDF/X-4). Khoảng 4-5 phút với 2 CPU. Mac: dùng `brew install ghostscript`.
set -e
DICH="$HOME/.cache/xuong-gs"
if [ -x "$DICH/bin/gs" ]; then echo "Đã có: $("$DICH/bin/gs" --version)"; exit 0; fi
TAM=$(mktemp -d)
cd "$TAM"
curl -sSfL -o gs.tar.xz https://github.com/ArtifexSoftware/ghostpdl-downloads/releases/download/gs10080/ghostscript-10.08.0.tar.xz
tar xf gs.tar.xz
cd ghostscript-10.08.0
./configure --prefix="$DICH" --without-x --disable-cups --disable-gtk --without-tesseract >/dev/null
make -j"$(nproc)" >/dev/null
make install >/dev/null
echo "Xong: $("$DICH/bin/gs" --version) tại $DICH/bin/gs (tools/in_an.py tự tìm)"
