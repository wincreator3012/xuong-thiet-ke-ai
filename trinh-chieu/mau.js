/* trinh-chieu/mau.js - màu theo VAI của brand.json cho PPTX.
 *
 * brand.json ghi màu kiểu CSS (#hex, rgba(), linear-gradient()). PPTX chỉ nhận hex 6 ký tự kèm độ trong suốt cho mảng,
 * còn CHỮ phải là màu đặc: chữ rgba được trộn sẵn với nền. Gradient lấy màu giữa (PPTX của PptxGenJS không có gradient,
 * và Google Slides cũng không nhận gradient từ PPTX một cách ổn định).
 */
'use strict';

function phan(css) {
  const s = String(css || '').trim();
  let m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 };
  }
  m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(',').map((x) => parseFloat(x));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  m = s.match(/gradient\((.+)\)$/i);
  if (m) {
    const ds = [...s.matchAll(/#[0-9a-f]{6}|#[0-9a-f]{3}\b|rgba?\([^)]+\)/gi)].map((x) => phan(x[0]));
    if (ds.length) return ds[Math.floor(ds.length / 2)];
  }
  return null;
}

const hex = (c) => [c.r, c.g, c.b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('').toUpperCase();

function tron(tren, duoi) {
  // trộn màu có alpha lên nền đặc
  const a = tren.a == null ? 1 : tren.a;
  return { r: tren.r * a + duoi.r * (1 - a), g: tren.g * a + duoi.g * (1 - a), b: tren.b * a + duoi.b * (1 - a), a: 1 };
}

function doSang(c) {
  const k = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * k(c.r) + 0.7152 * k(c.g) + 0.0722 * k(c.b);
}
function tuongPhan(a, b) {
  const x = doSang(a), y = doSang(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** Bảng màu dùng được ngay cho PPTX từ một chủ đề brand.json.
 *  bang.chu(vai)  -> hex đặc (đã trộn với nền) cho chữ, đường
 *  bang.mang(vai) -> { color, transparency } cho mảng tô
 *  bang.nhanDoc   -> màu nhấn đọc được như CHỮ trên nền (tương phản >= 4,5), chọn trong nhan, nhanDam, nhanSang */
function bangMau(chuDe) {
  const m = chuDe.mau || {};
  const nen = phan(m.nen) || { r: 255, g: 255, b: 255, a: 1 };
  const lay = (vai, mac) => phan(m[vai]) || phan(m[mac]) || nen;
  const chu = (vai, mac) => hex(tron(lay(vai, mac), nen));
  const mang = (vai, mac) => {
    const c = lay(vai, mac);
    return { color: hex(c), transparency: Math.round((1 - (c.a == null ? 1 : c.a)) * 100) };
  };
  const ung = ['nhan', 'nhanDam', 'nhanSang'].map((v) => ({ v, c: tron(lay(v, 'nhan'), nen) }));
  const tot = ung.find((x) => tuongPhan(x.c, nen) >= 4.5) || ung.sort((a, b) => tuongPhan(b.c, nen) - tuongPhan(a.c, nen))[0];
  const toi = chuDe.toi != null ? !!chuDe.toi : doSang(nen) < 0.3;
  // màu phụ cho mã hoá từng mục (phu1..3, nhan2); thiếu thì suy từ nhấn
  const phu = ['phu1', 'phu2', 'phu3', 'nhan2'].filter((v) => m[v]).map((v) => chu(v));
  return {
    toi,
    nen: hex(nen),
    chu,
    mang,
    nhanDoc: hex(tot.c),
    nhanDocVai: tot.v,
    phu: phu.length ? phu : [chu('nhan')],
    tuongPhan: (a, b) => tuongPhan(phan('#' + a), phan('#' + b)),
    tron: (vai, ti, vaiNen) => hex(tron({ ...lay(vai, 'nhan'), a: ti }, phan('#' + chu(vaiNen || 'nen')))),
  };
}

module.exports = { phan, hex, tron, tuongPhan, bangMau };
