/* trinh-chieu/chu.js - đo chữ bằng chính tệp phông của xưởng (fonts/), ngắt dòng tiếng Việt, co chữ cho vừa hộp.
 *
 * Vì sao phải đo: PPTX không tự co chữ đáng tin (Google Slides bỏ qua "shrink on overflow"), nên máy phải biết trước
 * mỗi hộp chữ cần bao nhiêu dòng ở cỡ nào, rồi báo LỖI khi không vừa (giống tran-chu của ve.py).
 * Khoảng cách dòng luôn ghi bằng điểm cố định (lineSpacing, pt) để PowerPoint, Google Slides và LibreOffice
 * cùng dàn một kiểu và phép đo ở đây đúng với cả ba.
 *
 * Cú pháp chữ (giống khung.js của lõi HTML): *nghiêng nhấn*, **đậm**, ==tô màu nhấn==, ~ giữ cụm từ, \n xuống dòng.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const fontkit = require('fontkit');

const SLUG = { 'Be Vietnam Pro': 'be-vietnam-pro', Lora: 'lora', 'Playfair Display': 'playfair-display', 'JetBrains Mono': 'jetbrains-mono' };
const _bo = new Map();

function boPhong(thuMucFonts, ten, dam, nghieng) {
  const k = `${ten}|${dam}|${nghieng}`;
  if (_bo.has(k)) return _bo.get(k);
  const slug = SLUG[ten];
  let ds = [];
  if (slug) {
    const dir = path.join(thuMucFonts, slug);
    const tim = (w, st) => fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(`-${w}-${st}.woff2`)) : [];
    let tep = tim(dam ? 700 : 400, nghieng ? 'italic' : 'normal');
    if (!tep.length && nghieng) tep = tim(dam ? 600 : 400, 'italic');
    if (!tep.length) tep = tim(dam ? 700 : 400, 'normal');
    // thứ tự ưu tiên: vietnamese trước để dấu thanh lấy đúng tệp con
    tep.sort((a, b) => (b.includes('vietnamese') - a.includes('vietnamese')) || (a.includes('ext') - b.includes('ext')));
    ds = tep.map((f) => fontkit.openSync(path.join(dir, f)));
  }
  _bo.set(k, ds);
  return ds;
}

function doRongMot(chu, bo, co) {
  // chiều rộng (inch) của một chuỗi ở cỡ co (pt); không có phông thì ước lượng 0,55 em mỗi ký tự
  if (!bo.length) return (chu.length * 0.55 * co) / 72;
  let tong = 0;
  for (const ch of chu.normalize('NFC')) {
    const cp = ch.codePointAt(0);
    let g = null, upm = 1000;
    for (const f of bo) {
      if (f.hasGlyphForCodePoint(cp)) { g = f.glyphForCodePoint(cp); upm = f.unitsPerEm; break; }
    }
    tong += g ? g.advanceWidth / upm : 0.55;
  }
  return (tong * co) / 72;
}

/** Tách chữ có cú pháp nhấn thành các đoạn {t, nghieng, dam, nhan}. */
function tachDoan(s) {
  const ra = [];
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|==(.+?)==)/g;
  let i = 0, m;
  const str = String(s == null ? '' : s).normalize('NFC');
  while ((m = re.exec(str))) {
    if (m.index > i) ra.push({ t: str.slice(i, m.index) });
    if (m[2] != null) ra.push({ t: m[2], dam: true });
    else if (m[3] != null) ra.push({ t: m[3], nghieng: true, nhan: true });
    else ra.push({ t: m[4], nhan: true });
    i = re.lastIndex;
  }
  if (i < str.length) ra.push({ t: str.slice(i) });
  return ra;
}
const tron = (s) => tachDoan(s).map((d) => d.t).join('');

/** Ngắt dòng một đoạn văn (có thể nhiều đoạn nhấn) theo bề rộng. Trả về số dòng và các dòng (chuỗi trơn). */
function ngat(doan, rong, kieu, fonts) {
  // kieu: {phong, co, dam, nghieng}
  const tu = []; // {t, kieu}
  for (const d of doan) {
    const bo = boPhong(fonts, kieu.phong, kieu.dam || d.dam, kieu.nghieng || d.nghieng);
    String(d.t).split(/(\n)/).forEach((p) => {
      if (p === '\n') { tu.push({ xuong: true }); return; }
      p.split(/ +/).forEach((w, j) => { if (w) tu.push({ t: w, bo, dinh: j === 0 && !/^\s/.test(p) }); });
    });
  }
  const cach = doRongMot(' ', boPhong(fonts, kieu.phong, kieu.dam, kieu.nghieng), kieu.co);
  const dong = [];
  let cur = '', w = 0, dai = 0;
  for (const x of tu) {
    if (x.xuong) { dong.push(cur); dai = Math.max(dai, w); cur = ''; w = 0; continue; }
    const tw = doRongMot(x.t.replace(/~/g, ' '), x.bo, kieu.co);
    const them = cur ? cach + tw : tw;
    if (cur && w + them > rong) { dong.push(cur); dai = Math.max(dai, w); cur = x.t; w = tw; }
    else { cur = cur ? cur + ' ' + x.t : x.t; w += them; }
  }
  if (cur || !dong.length) { dong.push(cur); dai = Math.max(dai, w); }
  return { dong: dong.map((d) => d.replace(/~/g, ' ')), soDong: dong.length, dai };
}

/** Đo một khối nhiều đoạn văn (mảng chuỗi = mỗi phần tử một đoạn) ở cỡ co. */
function doKhoi(ds, rong, kieu, fonts) {
  const lh = kieu.co * (kieu.gianDong || 1.3);
  const sau = kieu.cachDoan == null ? kieu.co * 0.45 : kieu.cachDoan;
  let cao = 0, soDong = 0, dai = 0, cuoi = 0;
  const thut = kieu.dauDong ? (kieu.thut != null ? kieu.thut : kieu.co * 1.15) / 72 : 0;
  ds.forEach((p, i) => {
    const r = ngat(tachDoan(p), rong - thut, kieu, fonts);
    soDong += r.soDong;
    dai = Math.max(dai, r.dai + thut);
    cao += r.soDong * lh + (i < ds.length - 1 ? sau : 0);
    if (i === ds.length - 1) cuoi = r.soDong > 1 ? r.dong[r.dong.length - 1].split(/\s+/).filter(Boolean).length : 0;
  });
  return { caoPt: cao, cao: cao / 72, soDong, dai, lh, cuoi };
}

/** Tìm cỡ lớn nhất trong [coMin, co] để khối vừa hộp (rong x cao inch). */
function vua(ds, rong, cao, kieu, fonts) {
  const mang = Array.isArray(ds) ? ds : [ds];
  let co = kieu.co;
  const coMin = kieu.coMin || Math.max(10, Math.round(kieu.co * 0.72));
  let r = doKhoi(mang, rong, { ...kieu, co }, fonts);
  while (r.cao > cao + 1e-3 && co > coMin) {
    co = Math.max(coMin, co - (co > 24 ? 1 : 0.5));
    r = doKhoi(mang, rong, { ...kieu, co }, fonts);
  }
  return { co, ...r, tran: r.cao > cao + 1e-3, tiLe: co / kieu.co };
}

/** Đếm số tiếng (âm tiết) của chữ hiển thị: đơn vị định mức chữ của chuan/08. */
function soTieng(s) {
  return tron(s).split(/[\s~]+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

module.exports = { boPhong, doRongMot, tachDoan, tron, ngat, doKhoi, vua, soTieng };
