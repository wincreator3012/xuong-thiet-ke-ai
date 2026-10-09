/* trinh-chieu/bo-cuc.js - các kiểu slide (bố cục) trên khổ 16:9 rộng 13,333 x 7,5 in.
 * Mỗi kiểu là một cách tổ chức NGƯỜI XEM ĐỌC, không phải một mẫu trang trí: một slide một ý, tiêu đề nói thông điệp,
 * mỗi slide nội dung có một yếu tố hình mang nghĩa (sơ đồ, biểu tượng, số lớn, ảnh thật, biểu đồ).
 * Danh mục kiểu và trường: trinh-chieu/README.md. Chuẩn: chuan/09-trinh-chieu.md.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { Trang, bieuTuongPng } = require('./ve');
const { veSoDo } = require('./so-do-pptx');

const W = 13.333, H = 7.5, LE = 0.8, DAY = 6.8, CHAN = 7.0;
const NHAN_MAC = {
  vi: { cauHoi: 'CÂU HỎI CHIÊM NGHIỆM', thucHanh: 'THỰC HÀNH', nguon: 'Nguồn', mucLuc: 'NỘI DUNG' },
  en: { cauHoi: 'REFLECTION', thucHanh: 'PRACTICE', nguon: 'Source', mucLuc: 'CONTENTS' },
};

async function kichThuocAnh(tep) {
  const sharp = require('sharp');
  const m = await sharp(tep).metadata();
  const xoay = m.orientation && m.orientation >= 5;
  return xoay ? { w: m.height, h: m.width } : { w: m.width, h: m.height };
}

/** Ảnh vừa khung (contain), trả về vị trí thật. */
async function anhVua(t, tep, k, o = {}) {
  if (!tep || !fs.existsSync(tep)) { t.canh('anh', o.id || 'anh', `không tìm thấy ảnh ${tep}`); return null; }
  const kt = await kichThuocAnh(tep);
  const tl = Math.min(k.w / kt.w, k.h / kt.h);
  const w = kt.w * tl, h = kt.h * tl;
  const x = o.canh === 'left' ? k.x : o.canh === 'right' ? k.x + k.w - w : k.x + (k.w - w) / 2;
  const y = o.doc === 'bottom' ? k.y + k.h - h : o.doc === 'top' ? k.y : k.y + (k.h - h) / 2;
  t.anh(tep, { x, y, w, h, altText: o.altText });
  return { x, y, w, h };
}

/** Ảnh phủ kín khung (cover), cắt quanh tiêu điểm [x, y] (0-1) như lõi HTML, ghi bản cắt vào thư mục tạm. */
async function anhPhu(t, tep, k, tieuDiem, o = {}) {
  if (!tep || !fs.existsSync(tep)) { t.canh('anh', o.id || 'anh', `không tìm thấy ảnh ${tep}`); return; }
  const sharp = require('sharp');
  const kt = await kichThuocAnh(tep);
  const tlKhung = k.w / k.h;
  let cw = kt.w, ch = Math.round(kt.w / tlKhung);
  if (ch > kt.h) { ch = kt.h; cw = Math.round(kt.h * tlKhung); }
  const [fx, fy] = tieuDiem || [0.5, 0.4];
  const left = Math.round(Math.max(0, Math.min(kt.w - cw, fx * kt.w - cw / 2)));
  const top = Math.round(Math.max(0, Math.min(kt.h - ch, fy * kt.h - ch / 2)));
  const ra = path.join(t.ctx.tam, `cat-${path.basename(tep, path.extname(tep))}-${left}-${top}-${cw}x${ch}.jpg`);
  if (!fs.existsSync(ra)) {
    await sharp(tep).rotate().extract({ left, top, width: cw, height: ch }).resize({ width: Math.min(cw, 2400) }).jpeg({ quality: 90 }).toFile(ra);
  }
  t.anh(ra, { ...k, altText: o.altText });
}

async function logo(t, ctx, k, toi, o = {}) {
  const lg = (ctx.thuongHieu && ctx.thuongHieu.logo) || {};
  const ten = toi ? lg.nenToi || lg.bieuTuongToi : lg.nenSang || lg.motMau;
  if (!ten) return;
  const tep = path.join(ctx.kho, 'brand', 'logo', ten);
  await anhVua(t, tep, k, { canh: o.canh || 'right', doc: o.doc || 'top', id: 'logo' });
}

/* ---------------- hoạ tiết theo chủ đề (brand.json > chuDe.hoaTiet): mảnh, mang nhịp thương hiệu, không mang nội dung */
function hoaTiet(t, chuDe, manh = 1) {
  const ht = chuDe.hoaTiet || [];
  if (ht.includes('vong-cung') || ht.includes('quang-sang') || ht.includes('vach-mau')) {
    const cx = W + 0.9, cy = H * 0.74;
    [1.9, 2.6, 3.3].forEach((r, i) => t.hinh('ellipse', { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, vien: i === 1 ? 'vach' : 'vachMo', net: 0.75 * manh }));
  }
  if (ht.includes('goc-khung')) {
    const m = 0.42, d = 0.55;
    t.tuDo([[m, m + d], [m, m], [m + d, m]], { vai: 'nhan', net: 1.25 });
    t.tuDo([[W - m - d, H - m], [W - m, H - m], [W - m, H - m - d]], { vai: 'nhan', net: 1.25 });
  }
}

/* ---------------- đầu trang: kicker + tiêu đề (nói thông điệp) ---------------- */
function dau(t, s, o = {}) {
  const w = o.w || W - 2 * LE;
  const x = o.x || LE;
  let y = 0.6;
  if (s.kicker) {
    t.chu(s.kicker, { x, y, w, co: 12, coMin: 11, dam: true, hoa: true, vai: 'nhanDoc', nguongDoc: 11, gianDong: 1.2, id: 'kicker' });
    y += 0.38;
  } else y = 0.68;
  if (!s.tieuDe) return y + 0.1;
  const r = t.chu(s.tieuDe, { x, y, w, h: o.hTieuDe || 1.4, tuDong: true, co: o.co || 32, coMin: 24, phong: 'td', vai: 'chu', gianDong: 1.15, id: 'tieuDe' });
  return y + r.cao + (o.cach == null ? 0.38 : o.cach);
}

function nguon(t, s, ctx) {
  if (!s.nguon) return;
  const nh = NHAN_MAC[ctx.ngonNgu].nguon;
  t.chu(`${nh}: ${s.nguon}`, { x: LE, y: DAY + 0.02, w: W - 2 * LE - 1.2, co: 11, coMin: 10, vai: 'chuMo', nguongDoc: 10, khongDem: true, id: 'nguon', gianDong: 1.2 });
}

function chanTrang(t, deck, ctx) {
  const ct = deck.chanTrang || {};
  if (ct.chu) t.chu(ct.chu, { x: LE, y: CHAN + 0.06, w: 7, co: 10, coMin: 10, vai: 'chuMo', nguongDoc: 10, khongDem: true, id: 'chanTrang', gianDong: 1.2 });
  if (ct.so !== false) {
    t.s.slideNumber = { x: W - LE - 0.8, y: CHAN + 0.04, w: 0.8, h: 0.26, fontFace: ctx.phong.nd, fontSize: 10, color: t.mau('chuMo'), align: 'right', margin: 0 };
  }
}

/* ---------------- phần hình bên phải của slide ý chính ---------------- */
async function phanHinh(t, h, k, ctx) {
  if (!h) return;
  if (h.soDo) return veSoDo(t, h.soDo, k);
  if (h.bieuTuong) {
    const d = Math.min(k.w, k.h, 3.0);
    const cx = k.x + k.w / 2, cy = k.y + k.h / 2 - (h.nhan ? 0.35 : 0);
    t.hinh('ellipse', { x: cx - d / 2, y: cy - d / 2, w: d, h: d, to: t.b.tron('nhan', 0.12, 'nen'), vien: 'vachMo', net: 0.75 });
    const png = await bieuTuongPng(ctx.kho, ctx.tam, h.bieuTuong, t.b.nhanDoc, 512);
    if (!png) t.canh('bieu-tuong', 'hinh.bieuTuong', `không có biểu tượng "${h.bieuTuong}" trong he-thong/bieu-tuong.css`);
    else t.anh(png, { x: cx - d * 0.25, y: cy - d * 0.25, w: d * 0.5, h: d * 0.5 });
    if (h.nhan) t.chu(h.nhan, { x: k.x, y: cy + d / 2 + 0.2, w: k.w, co: 16, coMin: 14, dam: true, canh: 'center', vai: 'chuPhu', id: 'hinh.nhan' });
    t.coHinh = true;
    return;
  }
  if (h.so) {
    const r = t.chu(h.so, { x: k.x, y: k.y + k.h * 0.22, w: k.w, co: 80, coMin: 48, phong: 'td', dam: true, canh: 'center', vai: 'nhanDoc', id: 'hinh.so', gianDong: 1.05 });
    if (h.nhan) t.chu(h.nhan, { x: k.x + 0.2, y: k.y + k.h * 0.22 + r.cao + 0.1, w: k.w - 0.4, co: 18, coMin: 14, canh: 'center', vai: 'chuPhu', id: 'hinh.nhan' });
    t.coHinh = true;
    return;
  }
  if (h.tepAnh) { await anhVua(t, h.tepAnh, k, { altText: h.altText, id: 'hinh.anh' }); t.coHinh = true; }
}

/* ================================================================ các kiểu slide */
const KIEU = {
  async bia(t, s, deck, ctx) {
    hoaTiet(t, ctx.chuDeTrang, 1);
    const coAnh = !!s.tepAnh;
    const wChu = coAnh ? 7.4 : 9.0;
    if (coAnh) await anhVua(t, s.tepAnh, { x: W - 5.6, y: 0.5, w: 5.2, h: H - 0.5 }, { canh: 'right', doc: 'bottom', id: 'bia.anh', altText: s.altText });
    if (deck.logo !== false) await logo(t, ctx, { x: coAnh ? LE : W - LE - 2.6, y: 0.55, w: 2.6, h: 0.62 }, true, { canh: coAnh ? 'left' : 'right' });
    const yK = coAnh && deck.logo !== false ? 1.45 : 0.62;
    if (s.kicker) t.chu(s.kicker, { x: LE, y: yK, w: wChu, co: 13, coMin: 11, dam: true, hoa: true, vai: 'nhanDoc', id: 'kicker', gianDong: 1.2, nguongDoc: 11 });
    const a = t.do(s.tieuDe, { w: wChu, h: 2.7, co: 46, coMin: 32, phong: 'td', gianDong: 1.12 });
    const b = s.phuDe ? t.do(s.phuDe, { w: wChu, h: 1.2, co: 22, coMin: 16, phong: 'td', nghieng: true, gianDong: 1.3 }) : { cao: 0 };
    const khoi = a.cao + (s.phuDe ? 0.3 + b.cao : 0);
    const y0 = Math.max(yK + 0.7, 3.45 - khoi / 2);
    const r = t.chu(s.tieuDe, { x: LE, y: y0, w: wChu, h: 2.7, tuDong: true, co: 46, coMin: 32, phong: 'td', gianDong: 1.12, id: 'tieuDe' });
    if (s.phuDe) t.chu(s.phuDe, { x: LE, y: y0 + r.cao + 0.3, w: wChu, h: 1.2, tuDong: true, co: 22, coMin: 16, phong: 'td', nghieng: true, vai: 'chuPhu', id: 'phuDe' });
    let y = 5.55;
    if (s.nguoi) {
      const ds = Array.isArray(s.nguoi) ? s.nguoi : [s.nguoi];
      const r1 = t.chu(ds[0], { x: LE, y, w: wChu, co: 17, coMin: 14, dam: true, vai: 'chu', id: 'nguoi', gianDong: 1.2 });
      y += r1.cao + 0.04;
      if (ds.length > 1) { const r2 = t.chu(ds.slice(1), { x: LE, y, w: wChu, co: 14, coMin: 12, vai: 'chuPhu', id: 'chucDanh', cachDoan: 0, gianDong: 1.3, nguongDoc: 12 }); y += r2.cao; }
    }
    if (s.ngay) t.chu(s.ngay, { x: LE, y: y + 0.12, w: wChu, co: 14, coMin: 12, vai: 'chuMo', id: 'ngay', gianDong: 1.2, nguongDoc: 12 });
    t.coHinh = true;
  },

  async 'chuyen-phan'(t, s, deck, ctx) {
    hoaTiet(t, ctx.chuDeTrang, 1);
    const so = s.so != null ? String(s.so) : null;
    let y = 2.0;
    if (so) { const r = t.chu(so, { x: LE, y: 1.55, w: 3, co: 72, coMin: 60, phong: 'td', vai: 'nhanDoc', khongDem: true, id: 'so', gianDong: 1 }); y = 1.55 + r.cao + 0.15; }
    const r = t.chu(s.tieuDe, { x: LE, y, w: 9.2, h: 2.2, tuDong: true, co: 40, coMin: 30, phong: 'td', gianDong: 1.12, id: 'tieuDe' });
    if (s.phuDe) t.chu(s.phuDe, { x: LE, y: y + r.cao + 0.25, w: 8.6, h: 1.4, tuDong: true, co: 20, coMin: 16, phong: 'td', nghieng: true, vai: 'chuPhu', id: 'phuDe' });
    t.coHinh = true;
  },

  async 'muc-luc'(t, s, deck, ctx) {
    const top = dau(t, { kicker: s.kicker || NHAN_MAC[ctx.ngonNgu].mucLuc, tieuDe: s.tieuDe }, {});
    const ds = s.muc || [];
    const cot = ds.length > 5 ? 2 : 1;
    const moiCot = Math.ceil(ds.length / cot);
    const hang = Math.min(0.95, (DAY - top) / moiCot);
    const wCot = (W - 2 * LE - (cot - 1) * 0.6) / cot;
    ds.forEach((m, i) => {
      const c = Math.floor(i / moiCot), r = i % moiCot;
      const x = LE + c * (wCot + 0.6), y = top + r * hang;
      const nh = s.mucNhan == null || s.mucNhan === i;
      t.chu(String(i + 1).padStart(2, '0'), { x, y, w: 0.9, co: 26, coMin: 20, phong: 'td', vai: nh ? 'nhanDoc' : 'chuMo', khongDem: true, id: `muc.${i}.so`, gianDong: 1 });
      t.chu(m, { x: x + 1.0, y: y + 0.06, w: wCot - 1.0, h: hang - 0.1, co: 22, coMin: 16, vai: nh ? 'chu' : 'chuMo', dam: s.mucNhan === i, id: `muc.${i}`, gianDong: 1.25 });
      if (r < moiCot - 1) t.duong(x + 1.0, y + hang - 0.08, x + wCot, y + hang - 0.08, { vai: 'vachMo', net: 0.5 });
    });
    t.coHinh = true;
    chanTrang(t, deck, ctx);
  },

  async 'y-chinh'(t, s, deck, ctx) {
    const h = s.hinh;
    const coH = !!(h && (h.soDo || h.bieuTuong || h.so || h.tepAnh));
    const wChu = coH ? (h.soDo ? 5.0 : 6.3) : 10.6;
    const top = dau(t, s, { w: coH ? W - 2 * LE : 10.6 });
    const than = s.than;
    const laDs = Array.isArray(than) && s.dauDong !== false;
    t.chu(than, { x: LE, y: top, w: wChu, h: DAY - top - (s.nguon ? 0.35 : 0), co: 22, coMin: 16, dauDong: laDs, vai: 'chu', id: 'than', gianDong: 1.35, cachDoan: 10 });
    if (coH) {
      const xH = LE + wChu + 0.6;
      await phanHinh(t, h, { x: xH, y: top, w: W - LE - xH, h: DAY - top - (s.nguon ? 0.35 : 0) }, ctx);
    }
    nguon(t, s, ctx);
    chanTrang(t, deck, ctx);
  },

  async 'so-do'(t, s, deck, ctx) {
    const top = dau(t, s);
    const duoi = (s.chuThich ? 0.55 : 0) + (s.nguon ? 0.3 : 0);
    const k = { x: LE, y: top, w: W - 2 * LE, h: DAY - top - duoi };
    if (s.soDo) await veSoDo(t, s.soDo, k);
    else t.canh('so-do', 'soDo', 'slide so-do thiếu trường soDo');
    if (s.chuThich) t.chu(s.chuThich, { x: LE, y: DAY - duoi + 0.1, w: W - 2 * LE, co: 15, coMin: 13, nghieng: true, vai: 'chuPhu', id: 'chuThich', nguongDoc: 13, gianDong: 1.25 });
    nguon(t, s, ctx);
    chanTrang(t, deck, ctx);
  },

  async 'hai-cot'(t, s, deck, ctx) {
    const top = dau(t, s);
    const cot = [s.trai || {}, s.phai || {}];
    const wC = (W - 2 * LE - 0.9) / 2;
    for (let i = 0; i < 2; i++) {
      const c = cot[i];
      const x = LE + i * (wC + 0.9);
      let y = top;
      if (c.bieuTuong) {
        const png = await bieuTuongPng(ctx.kho, ctx.tam, c.bieuTuong, t.b.nhanDoc);
        if (png) { t.anh(png, { x, y, w: 0.55, h: 0.55 }); y += 0.75; t.coHinh = true; }
      }
      const r = t.chu(c.nhan, { x, y, w: wC, co: 22, coMin: 16, dam: true, vai: 'nhanDoc', id: `${i ? 'phai' : 'trai'}.nhan`, gianDong: 1.18 });
      y += r.cao + 0.18;
      const nd = c.muc || c.than;
      t.chu(nd, { x, y, w: wC, h: DAY - y, co: 19, coMin: 15, dauDong: Array.isArray(nd), vai: 'chu', id: `${i ? 'phai' : 'trai'}.than`, gianDong: 1.35, cachDoan: 8 });
    }
    t.duong(LE + wC + 0.45, top, LE + wC + 0.45, DAY - 0.2, { vai: 'vachMo', net: 0.75 });
    t.coHinh = true;
    nguon(t, s, ctx);
    chanTrang(t, deck, ctx);
  },

  async 'so-lon'(t, s, deck, ctx) {
    const top = dau(t, s);
    const ds = s.so || [];
    const n = Math.max(1, ds.length);
    const wC = (W - 2 * LE - (n - 1) * 0.6) / n;
    const y0 = top + Math.max(0, (DAY - top - 3.0) / 2);
    ds.forEach((m, i) => {
      const x = LE + i * (wC + 0.6);
      const r = t.chu(m.gt, { x, y: y0, w: wC, co: n === 1 ? 96 : 72, coMin: 44, phong: 'td', dam: true, vai: 'nhanDoc', canh: n === 1 ? 'left' : 'center', id: `so.${i}.gt`, gianDong: 1.02 });
      const r2 = t.chu(m.nhan, { x, y: y0 + r.cao + 0.15, w: wC, co: 20, coMin: 15, dam: true, canh: n === 1 ? 'left' : 'center', vai: 'chu', id: `so.${i}.nhan`, gianDong: 1.25 });
      if (m.phu) t.chu(m.phu, { x, y: y0 + r.cao + 0.25 + r2.cao, w: wC, co: 15, coMin: 13, canh: n === 1 ? 'left' : 'center', vai: 'chuPhu', id: `so.${i}.phu`, nguongDoc: 13 });
      if (i < n - 1) t.duong(x + wC + 0.3, y0 + 0.2, x + wC + 0.3, y0 + 2.6, { vai: 'vachMo', net: 0.75 });
    });
    t.coHinh = true;
    nguon(t, s, ctx);
    chanTrang(t, deck, ctx);
  },

  async 'trich-dan'(t, s, deck, ctx) {
    const a = t.do(s.loi, { w: 10.6, h: 3.6, co: 34, coMin: 22, phong: 'td', nghieng: true, gianDong: 1.3 });
    const y0 = Math.max(1.9, 3.6 - a.cao / 2);
    t.chu('“', { x: LE + 0.45, y: y0 - 1.35, w: 1.5, co: 120, coMin: 120, phong: 'td', vai: 'nhan', khongDem: true, id: 'ngoac', gianDong: 1 });
    const r = t.chu(s.loi, { x: LE + 0.6, y: y0, w: 10.6, h: 3.6, tuDong: true, co: 34, coMin: 22, phong: 'td', nghieng: true, vai: 'chu', id: 'loi', gianDong: 1.3 });
    if (s.tacGia) t.chu(`- ${s.tacGia}`, { x: LE + 0.6, y: y0 + r.cao + 0.35, w: 10.6, co: 16, coMin: 13, vai: 'chuPhu', id: 'tacGia' });
    t.coHinh = true;
    chanTrang(t, deck, ctx);
  },

  async 'cau-hoi'(t, s, deck, ctx) {
    const png = await bieuTuongPng(ctx.kho, ctx.tam, s.bieuTuong || 'hoi', t.b.nhanDoc);
    if (png) t.anh(png, { x: LE, y: 1.25, w: 0.6, h: 0.6 });
    t.chu(s.nhan || NHAN_MAC[ctx.ngonNgu].cauHoi, { x: LE + (png ? 0.8 : 0), y: 1.38, w: 9, co: 13, coMin: 11, dam: true, hoa: true, vai: 'nhanDoc', khongDem: true, id: 'nhan', nguongDoc: 11 });
    const r = t.chu(s.cauHoi, { x: LE, y: 2.25, w: 10.6, h: 2.6, tuDong: true, co: 36, coMin: 24, phong: 'td', vai: 'chu', id: 'cauHoi', gianDong: 1.22 });
    if (s.goiY) t.chu(s.goiY, { x: LE, y: 2.25 + r.cao + 0.45, w: 10.4, h: DAY - 2.7 - r.cao, co: 19, coMin: 15, dauDong: Array.isArray(s.goiY), vai: 'chuPhu', id: 'goiY', gianDong: 1.35, cachDoan: 6 });
    t.coHinh = true;
    chanTrang(t, deck, ctx);
  },

  async 'thuc-hanh'(t, s, deck, ctx) {
    const top = dau(t, { kicker: s.kicker || NHAN_MAC[ctx.ngonNgu].thucHanh, tieuDe: s.tieuDe });
    const wTrai = 7.6;
    await veSoDo(t, { loai: 'chuoi', huong: 'doc', buoc: (s.buoc || []).map((b) => (typeof b === 'string' ? { nhan: b } : b)), mucNhan: s.mucNhan },
      { x: LE, y: top, w: wTrai, h: DAY - top });
    const xR = LE + wTrai + 0.6, wR = W - LE - xR;
    t.hinh('roundRect', { x: xR, y: top, w: wR, h: 2.6, to: t.b.tron('nhan', 0.1, 'nen'), vien: 'vienThe', net: 0.75, bo: 0.06 });
    const png = await bieuTuongPng(ctx.kho, ctx.tam, 'dong-ho', t.b.nhanDoc);
    if (png) t.anh(png, { x: xR + 0.35, y: top + 0.35, w: 0.55, h: 0.55 });
    if (s.thoiGian) t.chu(s.thoiGian, { x: xR + 0.35, y: top + 1.0, w: wR - 0.7, co: 40, coMin: 28, phong: 'td', dam: true, vai: 'nhanDoc', id: 'thoiGian', gianDong: 1.05 });
    if (s.hinhThuc) t.chu(s.hinhThuc, { x: xR + 0.35, y: top + 1.75, w: wR - 0.7, h: 0.7, co: 17, coMin: 14, vai: 'chuPhu', id: 'hinhThuc' });
    chanTrang(t, deck, ctx);
  },

  async anh(t, s, deck, ctx) {
    const phai = s.benAnh === 'phai';
    const wA = W * 0.46;
    await anhPhu(t, s.tepAnh, { x: phai ? W - wA : 0, y: 0, w: wA, h: H }, s.tieuDiem, { altText: s.altText, id: 'anh' });
    t.coHinh = true;
    const x = phai ? LE : wA + 0.7, w = W - wA - 0.7 - LE;
    const top = dau(t, s, { x, w });
    t.chu(s.than, { x, y: top, w, h: DAY - top, co: 21, coMin: 16, dauDong: Array.isArray(s.than), vai: 'chu', id: 'than', gianDong: 1.35, cachDoan: 8 });
    if (s.chuThichAnh) t.chu(s.chuThichAnh, { x, y: DAY - 0.1, w, co: 11, coMin: 10, vai: 'chuMo', nguongDoc: 10, khongDem: true, id: 'chuThichAnh' });
  },

  async hinh(t, s, deck, ctx) {
    const top = s.tieuDe || s.kicker ? dau(t, s) : 0.6;
    const duoi = (s.chuThich ? 0.55 : 0) + (s.nguon ? 0.3 : 0);
    await anhVua(t, s.tepAnh, { x: LE, y: top, w: W - 2 * LE, h: DAY - top - duoi }, { altText: s.altText, id: 'hinh' });
    t.coHinh = true;
    if (s.chuThich) t.chu(s.chuThich, { x: LE, y: DAY - duoi + 0.1, w: W - 2 * LE, co: 15, coMin: 13, nghieng: true, vai: 'chuPhu', id: 'chuThich', nguongDoc: 13 });
    nguon(t, s, ctx);
    chanTrang(t, deck, ctx);
  },

  async 'bieu-do'(t, s, deck, ctx) {
    const top = dau(t, s);
    const bd = s.bieuDo || {};
    const loai = { cot: 'bar', ngang: 'bar', duong: 'line', tron: 'doughnut' }[bd.loai || 'cot'] || 'bar';
    const du = (bd.chuoi || []).map((c) => ({ name: c.ten || '', labels: bd.nhan || [], values: c.gt || [] }));
    const mau = t.b.phu.length > 1 ? t.b.phu : [t.b.nhanDoc, t.b.chu('chuMo')];
    const op = {
      x: LE, y: top, w: W - 2 * LE, h: DAY - top - (s.nguon ? 0.35 : 0),
      chartColors: loai === 'doughnut' ? mau : mau.slice(0, Math.max(1, du.length)),
      barDir: bd.loai === 'ngang' ? 'bar' : 'col', barGapWidthPct: 60,
      catAxisLabelColor: t.mau('chuPhu'), catAxisLabelFontFace: ctx.phong.nd, catAxisLabelFontSize: 15, catAxisLineColor: t.mau('vienThe'),
      valAxisLabelColor: t.mau('chuMo'), valAxisLabelFontFace: ctx.phong.nd, valAxisLabelFontSize: 12,
      valAxisMinVal: 0, valAxisHidden: bd.hienTruc !== true, valGridLine: bd.hienTruc === true ? { color: t.mau('vachMo'), size: 0.5 } : { style: 'none' }, catGridLine: { style: 'none' },
      catAxisLineShow: true, valAxisLineShow: false, valAxisLabelFormatCode: bd.dinhDang || 'General',
      showValue: true, dataLabelColor: t.mau('chu'), dataLabelFontFace: ctx.phong.nd, dataLabelFontSize: 15, dataLabelFormatCode: bd.dinhDang || 'General',
      showLegend: du.length > 1 || loai === 'doughnut', legendPos: 'b', legendFontFace: ctx.phong.nd, legendFontSize: 13, legendColor: t.mau('chuPhu'),
      lineSize: 2.5, lineDataSymbolSize: 8, holeSize: 62, showPercent: loai === 'doughnut', showLabel: false,
    };
    if (bd.ve === false) { t.canh('bieu-do', 'bieuDo', 'bỏ vẽ'); } else t.s.addChart(t.pres.charts[loai.toUpperCase()], du, op);
    t.coHinh = true;
    if (!s.nguon) t.canh('thieu-nguon', 'bieuDo', 'biểu đồ không có nguồn: mọi số liệu trên hình cần nguồn (chuan/06 R6.9)');
    nguon(t, s, ctx);
    chanTrang(t, deck, ctx);
  },

  async ket(t, s, deck, ctx) {
    hoaTiet(t, ctx.chuDeTrang, 1);
    if (deck.logo !== false) await logo(t, ctx, { x: LE, y: 0.6, w: 2.6, h: 0.62 }, true, { canh: 'left' });
    let y = 2.0;
    if (s.tieuDe) { const r = t.chu(s.tieuDe, { x: LE, y, w: 9.6, h: 1.8, tuDong: true, co: 40, coMin: 30, phong: 'td', id: 'tieuDe', gianDong: 1.12 }); y += r.cao + 0.35; }
    if (s.cauHoi) { const r = t.chu(s.cauHoi, { x: LE, y, w: 9.6, h: 2.2, tuDong: true, co: 26, coMin: 20, phong: 'td', nghieng: true, vai: 'nhanDoc', id: 'cauHoi', gianDong: 1.25 }); y += r.cao + 0.35; }
    if (s.lienHe) t.chu(s.lienHe, { x: LE, y: Math.max(y, 5.4), w: 9.6, co: 15, coMin: 13, vai: 'chuPhu', id: 'lienHe', cachDoan: 2, gianDong: 1.3 });
    t.coHinh = true;
  },
};

const TOI_MAC = new Set(['bia', 'chuyen-phan', 'ket']);

module.exports = { KIEU, TOI_MAC, W, H, LE, DAY };
