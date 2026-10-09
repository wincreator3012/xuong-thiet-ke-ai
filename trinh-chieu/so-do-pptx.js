/* trinh-chieu/so-do-pptx.js - 15 loại sơ đồ tri thức dựng bằng hình khối GỐC của PPTX (sửa được từng nhãn trên Google Slides,
 * PowerPoint, Keynote), cùng dữ liệu và cùng nghĩa với minh-hoa/so-do.js của lõi HTML: một framework vẽ một lần,
 * lên slide, poster, handout giống hệt tên, thứ tự, màu (chuan/06 R6.6).
 *
 * Chọn loại theo LOGIC của khái niệm (chuan/06 mục 2), không theo sở thích:
 *   chuoi       { buoc: [{nhan, phu}], huong: 'ngang'|'doc'|'tu-dong' }        tiến trình có thứ tự
 *   hanh-trinh  { tram: [{nhan, phu}] }                                          phát triển dài, có chặng
 *   vong-lap    { buoc: [{nhan, phu}], tam }                                     quá trình lặp lại thật
 *   tang        { tang: [{nhan, phu}] (trên xuống), kieu: 'thap'|'chong' }       tầng dưới nâng tầng trên
 *   trung-tam   { tam: {nhan, phu}, nhanh: [{nhan, phu}] }                       một lõi, các mặt ngang hàng
 *   ma-tran     { trucNgang: [trái, phải], trucDoc: [dưới, trên], o: [tl, tr, bl, br] }
 *   the-luoi    { the: [{bieuTuong|so, nhan, phu}], cot }                        các mục ngang hàng
 *   so-sanh     { trai: {nhan, muc: []}, phai: {nhan, muc: []}, muiTen }         trước và sau, hai cách
 *   radar       { truc: [{nhan, phu, gt (0-1)}], luoi }                          hồ sơ nhiều chiều cùng thang
 *   venn        { tap: [{nhan, phu}] (2-3), giao: {nhan, phu} }                  tập hợp có phần chung thật
 *   dong-tam    { lop: [{nhan, phu}] (trong ra ngoài) }                          phạm vi lồng nhau
 *   tang-bang   { noi: {nhan, muc: []}, chim: {nhan, muc: []} }                  phần thấy tựa trên phần khuất
 *   pho         { trai, phai, doan: [{nhan, phu}], diem: {vi (0-1), nhan} }       dải liên tục giữa hai cực
 *   xoan-oc     { buoc: [{nhan, phu}] }                                          lặp lại và sâu dần qua mỗi vòng
 *   isotype     { hang: [{nhan, gt, gtChu, bieuTuong}], bieuTuong, donVi }        số lượng bằng số biểu tượng (R6.8)
 * Mọi loại nhận thêm: mucNhan (chỉ số mục được báo hiệu, từ 0; trinhTu ở slide tự sinh mỗi mục một slide),
 * nhanMau (màu vai cho từng mục).
 */
'use strict';
const path = require('path');
const { bieuTuongPng } = require('./ve');

const L = 18, LMIN = 14, P = 14, PMIN = 12; // nhãn, mô tả (pt)
const IN = (pt) => pt / 72;

function hoaNhan(ds) {
  return ds.every((x) => String((x && x.nhan) || '').length <= 22);
}
function sang(v, i) { return v.mucNhan == null || v.mucNhan === i; }

/** Cỡ chung cho một loạt nhãn: lớn nhất mà mọi nhãn đều vừa hộp. */
function coChung(t, ds, o) {
  let co = o.co;
  for (const s of ds) {
    if (!s) continue;
    const r = t.do(s, { ...o, co });
    co = Math.min(co, r.co);
  }
  return co;
}

function khoiNhan(t, m, i, v, o) {
  // nhãn (đậm) + mô tả, trả chiều cao đã vẽ
  const hoa = o.hoa;
  const sg = sang(v, i);
  let y = o.y;
  const r1 = t.chu(m.nhan, { x: o.x, y, w: o.w, co: o.coL, coMin: o.coL, dam: true, hoa, canh: o.canh,
    vai: sg ? (o.vaiNhan || 'nhanDoc') : 'chuMo', id: `soDo.${i}.nhan`, gianDong: 1.18 });
  y += r1.cao + 0.05;
  let r2 = { cao: 0 };
  if (m.phu) {
    r2 = t.chu(m.phu, { x: o.x, y, w: o.w, co: o.coP, coMin: o.coP, canh: o.canh, vai: sg ? 'chuPhu' : 'chuMo',
      id: `soDo.${i}.phu`, nguongDoc: PMIN, gianDong: 1.3 });
  }
  return r1.cao + (m.phu ? 0.05 + r2.cao : 0);
}
function doKhoiNhan(t, m, o) {
  const a = t.do(m.nhan, { w: o.w, co: o.coL, coMin: o.coL, dam: true, hoa: o.hoa, gianDong: 1.18 });
  const b = m.phu ? t.do(m.phu, { w: o.w, co: o.coP, coMin: o.coP, gianDong: 1.3 }) : { cao: 0 };
  return a.cao + 0.04 + (m.phu ? 0.05 + b.cao + 0.04 : 0);
}

function nut(t, cx, cy, r, so, sg, o = {}) {
  t.hinh('ellipse', { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, to: sg ? 'nhan' : t.b.tron('nhan', 0.12, 'nen'), vien: sg ? 'nhan' : 'vienThe', net: 1.25 });
  if (so != null) {
    t.chu(String(so), { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, co: o.co || Math.max(12, Math.round(r * 72 * 0.62)), dam: true, canh: 'center', doc: 'middle',
      vai: sg ? 'nhanChu' : 'nhanDoc', khongDem: true, nguongDoc: 11, nenDuoi: sg ? t.b.chu('nhan') : t.b.tron('nhan', 0.12, 'nen'), gianDong: 1 });
  }
}

/* ---------------- chuỗi ---------------- */
function chuoi(t, v, k) {
  const ds = v.buoc || [];
  const n = ds.length;
  let huong = v.huong || 'tu-dong';
  if (huong === 'tu-dong') huong = n <= 6 && k.w / k.h > 1.25 ? 'ngang' : 'doc';
  const hoa = hoaNhan(ds);
  if (huong === 'ngang') {
    const cot = k.w / n;
    const wNhan = cot * 0.88;
    const r = Math.min(0.38, cot * 0.16);
    const coL = coChung(t, ds.map((m) => m.nhan), { w: wNhan, h: 0.9, co: n <= 4 ? L + 2 : L, coMin: LMIN, dam: true, hoa, gianDong: 1.18 });
    const coP = coChung(t, ds.map((m) => m.phu), { w: wNhan, h: Math.max(0.6, k.h - 2 * r - 1.3), co: n <= 4 ? P + 2 : P, coMin: PMIN, gianDong: 1.3 });
    const caoKhoi = Math.max(...ds.map((m) => doKhoiNhan(t, m, { w: wNhan, coL, coP, hoa })));
    const tong = 2 * r + 0.25 + caoKhoi;
    const y0 = k.y + Math.max(0, (k.h - tong) / 2);
    const cy = y0 + r;
    const xs = ds.map((_, i) => k.x + cot * (i + 0.5));
    for (let i = 0; i < n - 1; i++) {
      t.duong(xs[i] + r + 0.08, cy, xs[i + 1] - r - 0.1, cy, { vai: 'vach', net: 1.25, muiTen: true });
    }
    ds.forEach((m, i) => {
      nut(t, xs[i], cy, r, String(i + 1).padStart(2, '0'), sang(v, i));
      khoiNhan(t, m, i, v, { x: xs[i] - wNhan / 2, y: cy + r + 0.22, w: wNhan, coL, coP, hoa, canh: 'center' });
    });
  } else {
    const r = Math.min(0.28, (k.h / n) * 0.3);
    const hang = k.h / n;
    const xNut = k.x + r;
    const wNhan = k.w - 2 * r - 0.35;
    const coL = coChung(t, ds.map((m) => m.nhan), { w: wNhan, h: hang * 0.45, co: L, coMin: LMIN, dam: true, hoa, gianDong: 1.18 });
    const coP = coChung(t, ds.map((m) => m.phu), { w: wNhan, h: Math.max(0.25, hang - IN(coL) * 1.3 - 0.12), co: P, coMin: PMIN, gianDong: 1.3 });
    t.duong(xNut, k.y + hang / 2, xNut, k.y + k.h - hang / 2, { vai: 'vachMo', net: 1.25 });
    ds.forEach((m, i) => {
      const cy = k.y + hang * (i + 0.5);
      nut(t, xNut, cy, r, String(i + 1), sang(v, i));
      const h = doKhoiNhan(t, m, { w: wNhan, coL, coP, hoa });
      khoiNhan(t, m, i, v, { x: xNut + r + 0.3, y: cy - Math.min(h, hang) / 2, w: wNhan, coL, coP, hoa });
    });
  }
}

/* ---------------- hành trình ---------------- */
function hanhTrinh(t, v, k) {
  const ds = v.tram || [];
  const n = ds.length;
  const hoa = hoaNhan(ds);
  const r = 0.27;
  const wNhan = Math.min(2.6, (k.w / n) * 1.5);
  const coL = coChung(t, ds.map((m) => m.nhan), { w: wNhan, h: 0.8, co: L, coMin: LMIN, dam: true, hoa, gianDong: 1.18 });
  const coP = coChung(t, ds.map((m) => m.phu), { w: wNhan, h: 0.9, co: P + 1, coMin: PMIN, gianDong: 1.3 });
  const caoKhoi = Math.max(...ds.map((m) => doKhoiNhan(t, m, { w: wNhan, coL, coP, hoa })));
  const yTren = k.y + caoKhoi + 0.2 + r, yDuoi = k.y + k.h - caoKhoi - 0.2 - r;
  const pad = Math.max(wNhan / 2, r + 0.1);
  // đường đi lên đều, hơi uốn (đạo hàm luôn dương: không có đoạn đi xuống làm sai nghĩa "phát triển")
  const pts = ds.map((_, i) => {
    const s = n === 1 ? 0.5 : i / (n - 1);
    const len = s - 0.05 * Math.sin(2 * Math.PI * s);
    return [k.x + pad + s * (k.w - 2 * pad), yDuoi - len * (yDuoi - yTren)];
  });
  const cong = [];
  for (let j = 0; j <= 60; j++) {
    const s = j / 60;
    const len = s - 0.05 * Math.sin(2 * Math.PI * s);
    cong.push([k.x + pad + s * (k.w - 2 * pad), yDuoi - len * (yDuoi - yTren)]);
  }
  t.tuDo(cong, { vai: 'vachMo', net: 9 });
  t.tuDo(cong, { vai: 'nhan', net: 1.5, netDut: true });
  ds.forEach((m, i) => {
    const [x, y] = pts[i];
    nut(t, x, y, r, String(i + 1), sang(v, i), { co: 13 });
    const h = doKhoiNhan(t, m, { w: wNhan, coL, coP, hoa });
    const tren = i % 2 === 1;
    khoiNhan(t, m, i, v, { x: x - wNhan / 2, y: tren ? y - r - 0.15 - h : y + r + 0.15, w: wNhan, coL, coP, hoa, canh: 'center' });
  });
}

/* ---------------- vòng lặp ---------------- */
function vongLap(t, v, k) {
  const ds = v.buoc || [];
  const n = ds.length;
  const hoa = hoaNhan(ds);
  const cx = k.x + k.w / 2, cy = k.y + k.h / 2;
  const r = 0.36;
  const lech = n % 2 === 0 ? Math.PI / n : 0;
  const goc = (i) => -Math.PI / 2 + lech + (i * 2 * Math.PI) / n;
  let coL = L, coP = P, xep = null;
  for (let lan = 0; lan < 8 && !xep; lan++) {
    for (let R = Math.min(k.h / 2 - r, k.w / 2 - r); R >= 0.95; R -= 0.05) {
      const khoi = [];
      let ok = true;
      for (let i = 0; i < n && ok; i++) {
        const a = goc(i), c = Math.cos(a), s = Math.sin(a);
        const giua = Math.abs(c) < 0.3;
        const ax = giua ? cx + R * c : cx + R * c + Math.sign(c) * (r + 0.2), ay = cy + R * s + Math.sign(s) * (r + 0.12);
        const avail = giua ? 3.2 : c > 0 ? k.x + k.w - ax : ax - k.x;
        const w = Math.min(giua ? 3.2 : 3.0, avail);
        if (w < 1.7) { ok = false; break; }
        const h = doKhoiNhan(t, ds[i], { w, coL, coP, hoa });
        let x = giua ? ax - w / 2 : c > 0 ? ax : ax - w;
        let y = giua ? (s < 0 ? ay - h : ay) : cy + R * s - h / 2;
        if (y < k.y - 0.01 || y + h > k.y + k.h + 0.01 || x < k.x - 0.01 || x + w > k.x + k.w + 0.01) ok = false;
        khoi.push({ x, y, w, h, canh: giua ? 'center' : c > 0 ? 'left' : 'right' });
      }
      if (ok) { xep = { R, khoi }; break; }
    }
    if (!xep) { coL = Math.max(LMIN, coL - 1); coP = Math.max(PMIN, coP - 0.5); }
  }
  if (!xep) { t.canh('so-do', 'vong-lap', 'vùng sơ đồ quá chật cho vòng lặp: rút nhãn, bớt mô tả hoặc cho sơ đồ cả slide'); return; }
  const { R, khoi } = xep;
  // vòng mờ và các cung có mũi tên nối nút
  t.hinh('ellipse', { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, vien: 'vachMo', net: 1, netDut: true });
  for (let i = 0; i < n; i++) {
    const d = (r + 0.1) / R;
    const a0 = goc(i) + d, a1 = goc(i + 1) - d - 0.04;
    const cung = [];
    for (let j = 0; j <= 16; j++) { const a = a0 + ((a1 - a0) * j) / 16; cung.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
    t.tuDo(cung, { vai: 'nhan', net: 1.75, muiTen: true });
  }
  ds.forEach((m, i) => {
    const a = goc(i);
    nut(t, cx + R * Math.cos(a), cy + R * Math.sin(a), r, String(i + 1).padStart(2, '0'), sang(v, i), { co: 14 });
    const b = khoi[i];
    khoiNhan(t, m, i, v, { x: b.x, y: b.y, w: b.w, coL, coP, hoa, canh: b.canh });
  });
  if (v.tam) {
    const w = R * 1.35;
    const h = t.do(v.tam, { w, co: 20, coMin: 14, nghieng: true, phong: 'td', gianDong: 1.2 });
    t.chu(v.tam, { x: cx - w / 2, y: cy - h.cao / 2, w, co: 20, coMin: 14, nghieng: true, phong: 'td', canh: 'center', vai: 'nhanDoc', gianDong: 1.2, id: 'soDo.tam' });
  }
}

/* ---------------- tầng ---------------- */
function tang(t, v, k) {
  const ds = v.tang || [];
  const n = ds.length;
  const hoa = hoaNhan(ds);
  const khe = 0.08;
  const cao = (k.h - khe * (n - 1)) / n;
  const thap = (v.kieu || 'thap') === 'thap';
  const mauLop = (i) => (v.mucNhan === i ? 'nhan' : t.b.tron('nhan', v.mucNhan == null ? 0.22 + (0.5 * i) / Math.max(1, n - 1) : 0.14, 'nen'));
  if (thap) {
    const pw = Math.min(k.w * 0.42, k.h * 1.25);
    const x0 = k.x;
    const wNhan = k.w - pw - 0.55;
    const coL = coChung(t, ds.map((m) => m.nhan), { w: wNhan, h: cao * 0.5, co: L, coMin: LMIN, dam: true, hoa, gianDong: 1.18 });
    const coP = coChung(t, ds.map((m) => m.phu), { w: wNhan, h: Math.max(0.25, cao - IN(coL) * 1.25 - 0.08), co: P, coMin: PMIN, gianDong: 1.3 });
    ds.forEach((m, i) => {
      const y = k.y + i * (cao + khe);
      const tren = pw * (0.16 + (0.84 * i) / n), duoi = pw * (0.16 + (0.84 * (i + 1)) / n);
      const cxp = x0 + pw / 2;
      t.tuDo([[cxp - tren / 2, y], [cxp + tren / 2, y], [cxp + duoi / 2, y + cao], [cxp - duoi / 2, y + cao]], { dong: true, to: mauLop(i), vien: false });
      const nenSo = v.mucNhan === i ? t.b.chu('nhan') : mauLop(i);
      t.chu(String(n - i).padStart(2, '0'), { x: cxp - 0.5, y, w: 1, h: cao, co: Math.min(16, Math.max(11, cao * 72 * 0.32)), coMin: 11, dam: true, canh: 'center', doc: 'middle',
        vai: t.b.tuongPhan(t.b.chu('nhanChu'), nenSo) >= 3 ? 'nhanChu' : 'chu', nenDuoi: nenSo, khongDem: true, nguongDoc: 11, gianDong: 1 });
      const cy = y + cao / 2;
      t.duong(cxp + (tren + duoi) / 4 + 0.08, cy, x0 + pw + 0.4, cy, { vai: 'vachMo', net: 0.75 });
      const h = doKhoiNhan(t, m, { w: wNhan, coL, coP, hoa });
      khoiNhan(t, m, i, v, { x: x0 + pw + 0.5, y: cy - h / 2, w: wNhan, coL, coP, hoa });
    });
  } else {
    const wNhan = Math.min(3.6, k.w * 0.34);
    const coL = coChung(t, ds.map((m) => m.nhan), { w: wNhan - 0.5, h: cao * 0.85, co: L, coMin: LMIN, dam: true, hoa, gianDong: 1.18 });
    const coP = coChung(t, ds.map((m) => m.phu), { w: k.w - wNhan - 0.6, h: cao * 0.85, co: P + 1, coMin: PMIN, gianDong: 1.3 });
    ds.forEach((m, i) => {
      const y = k.y + i * (cao + khe);
      const sg = sang(v, i);
      const to = v.mucNhan === i ? 'nhan' : t.b.tron('nhan', 0.06 + (0.16 * i) / Math.max(1, n - 1), 'nen');
      t.hinh('roundRect', { x: k.x, y, w: k.w, h: cao, to, vien: 'vienThe', net: 0.75, bo: 0.08 });
      const nenO = v.mucNhan === i ? t.b.chu('nhan') : to;
      t.chu(m.nhan, { x: k.x + 0.3, y, w: wNhan - 0.4, h: cao, co: coL, coMin: coL, dam: true, hoa, doc: 'middle',
        vai: v.mucNhan === i ? 'nhanChu' : sg ? 'nhanDoc' : 'chuMo', nenDuoi: nenO, id: `soDo.${i}.nhan`, gianDong: 1.18 });
      if (m.phu) t.chu(m.phu, { x: k.x + wNhan + 0.2, y, w: k.w - wNhan - 0.5, h: cao, co: coP, coMin: coP, doc: 'middle',
        vai: v.mucNhan === i ? 'nhanChu' : sg ? 'chu' : 'chuMo', nenDuoi: nenO, id: `soDo.${i}.phu`, nguongDoc: PMIN });
    });
  }
}

/* ---------------- trung tâm và nhánh ---------------- */
function trungTam(t, v, k) {
  // lõi ở giữa, các mặt ngang hàng xếp hai cột trái phải theo chiều kim đồng hồ: đọc được trên khổ 16:9, không đè lõi
  const ds = v.nhanh || [];
  const n = ds.length;
  const bw = Math.min(3.4, k.w * 0.3);
  const wN = bw - 0.4;
  const nPhai = Math.ceil(n / 2);
  let coL = L, coP = P, cao, tong;
  for (let lan = 0; lan < 10; lan++) {
    cao = ds.map((m) => doKhoiNhan(t, m, { w: wN, coL, coP }) + 0.34);
    tong = [cao.slice(0, nPhai), cao.slice(nPhai)].map((c) => c.reduce((a, b) => a + b, 0) + 0.18 * Math.max(0, c.length - 1));
    if (Math.max(...tong) <= k.h || (coL <= LMIN && coP <= PMIN)) break;
    coL = Math.max(LMIN, coL - 1); coP = Math.max(PMIN, coP - 0.5);
  }
  if (Math.max(...tong) > k.h + 0.01) t.canh('tran-chu', 'trung-tam', 'các nhánh không vừa chiều cao vùng sơ đồ: rút mô tả hoặc bớt nhánh');
  const cx = k.x + k.w / 2, cy = k.y + k.h / 2;
  const rt = Math.max(0.8, Math.min(1.45, k.h / 2 - 0.05, (k.w - 2 * bw) / 2 - 0.65));
  const viTri = [];
  [[0, nPhai, true], [nPhai, n, false]].forEach(([a, b, phai]) => {
    const c = cao.slice(a, b);
    const tg = c.reduce((x, y) => x + y, 0);
    const khe = c.length > 1 ? Math.min(0.6, (k.h - tg) / (c.length - 1)) : 0;
    let y = cy - (tg + khe * (c.length - 1)) / 2;
    const thuTu = phai ? [...Array(c.length).keys()] : [...Array(c.length).keys()].reverse(); // trái: dưới lên = theo chiều kim đồng hồ
    const ys = [];
    c.forEach((h) => { ys.push(y); y += h + khe; });
    thuTu.forEach((j, idx) => viTri[a + j] = { x: phai ? k.x + k.w - bw : k.x, y: ys[idx], h: c[j], phai });
  });
  ds.forEach((_, i) => {
    const p = viTri[i];
    const tx = p.phai ? p.x : p.x + bw, ty = p.y + p.h / 2;
    const d = Math.hypot(tx - cx, ty - cy);
    t.duong(cx + ((tx - cx) / d) * (rt + 0.12), cy + ((ty - cy) / d) * (rt + 0.12), tx, ty, { vai: 'vach', net: 1 });
  });
  t.hinh('ellipse', { x: cx - rt - 0.12, y: cy - rt - 0.12, w: 2 * rt + 0.24, h: 2 * rt + 0.24, vien: 'vachMo', net: 0.75 });
  t.hinh('ellipse', { x: cx - rt, y: cy - rt, w: 2 * rt, h: 2 * rt, to: 'nhan', vien: 'nhan', net: 1 });
  const tam = v.tam || {};
  const wT = rt * 1.5;
  const a1 = t.do(tam.nhan, { w: wT, h: rt * 1.1, co: 22, coMin: 14, dam: true, gianDong: 1.15 });
  const a2 = tam.phu ? t.do(tam.phu, { w: wT, co: 14, coMin: 12, gianDong: 1.25 }) : { cao: 0 };
  const yt = cy - (a1.cao + (tam.phu ? a2.cao + 0.06 : 0)) / 2;
  const nenTam = t.b.chu('nhan');
  t.chu(tam.nhan, { x: cx - wT / 2, y: yt, w: wT, h: rt * 1.1, tuDong: true, co: 22, coMin: 14, dam: true, canh: 'center', vai: 'nhanChu', nenDuoi: nenTam, id: 'soDo.tam', gianDong: 1.15 });
  if (tam.phu) t.chu(tam.phu, { x: cx - wT / 2, y: yt + a1.cao + 0.06, w: wT, co: 14, coMin: 12, canh: 'center', vai: 'nhanChu', nenDuoi: nenTam, nguongDoc: 12, id: 'soDo.tam.phu', gianDong: 1.25 });
  const mauThe = t.b.tron('nhan', 0.07, 'nen');
  ds.forEach((m, i) => {
    const p = viTri[i];
    const sg = sang(v, i);
    t.hinh('roundRect', { x: p.x, y: p.y, w: bw, h: p.h, to: v.mucNhan === i ? t.b.tron('nhan', 0.22, 'nen') : mauThe, vien: sg ? 'nhan' : 'vienThe', net: v.mucNhan === i ? 2 : 0.75, bo: 0.08 });
    khoiNhan(t, m, i, v, { x: p.x + 0.2, y: p.y + 0.17, w: wN, coL, coP, canh: p.phai ? 'left' : 'right' });
  });
}

/* ---------------- ma trận 2x2 ---------------- */
function maTran(t, v, k) {
  const m = 0.55;
  const x0 = k.x + m, y0 = k.y, W = k.w - m, H = k.h - m;
  const o = v.o || [];
  const wO = W / 2 - 0.5;
  const coL = coChung(t, o.map((q) => q && q.nhan), { w: wO, h: 0.7, co: L + 2, coMin: LMIN, dam: true, gianDong: 1.18 });
  const coP = coChung(t, o.map((q) => q && q.phu), { w: wO, h: H / 2 - 1.0, co: P, coMin: PMIN, gianDong: 1.3 });
  [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([c, r], i) => {
    const x = x0 + (c * W) / 2, y = y0 + (r * H) / 2;
    const nh = v.mucNhan === i;
    t.hinh('roundRect', { x: x + 0.06, y: y + 0.06, w: W / 2 - 0.12, h: H / 2 - 0.12, to: nh ? t.b.tron('nhan', 0.25, 'nen') : t.b.tron('nhan', 0.07, 'nen'), vien: nh ? 'nhan' : 'vienThe', net: nh ? 1.75 : 0.75, bo: 0.06 });
    const q = o[i] || {};
    if (q.nhan) {
      const h = doKhoiNhan(t, q, { w: wO, coL, coP });
      khoiNhan(t, q, i, { mucNhan: v.mucNhan }, { x: x + 0.25, y: y + (H / 2 - h) / 2, w: wO, coL, coP, canh: 'center' });
    }
  });
  t.duong(x0, y0 + H + 0.08, x0 + W, y0 + H + 0.08, { vai: 'nhan', net: 1.5, muiTen: true });
  t.duong(x0 - 0.08, y0 + H, x0 - 0.08, y0, { vai: 'nhan', net: 1.5, muiTen: true });
  const tn = v.trucNgang || [], td = v.trucDoc || [];
  if (tn[0]) t.chu(tn[0], { x: x0, y: y0 + H + 0.16, w: W / 2, co: 13, coMin: 12, vai: 'chuPhu', nguongDoc: 12, id: 'trucNgang.0' });
  if (tn[1]) t.chu(tn[1], { x: x0 + W / 2, y: y0 + H + 0.16, w: W / 2 - 0.1, co: 13, coMin: 12, dam: true, vai: 'nhanDoc', canh: 'right', nguongDoc: 12, id: 'trucNgang.1' });
  // trục dọc: chữ xoay 270 độ
  const vDoc = (s, yGiua, dam, vai, canh) => t.s.addText(s, { x: x0 - 0.5 - H / 4 + 0.05, y: yGiua - 0.18, w: H / 2, h: 0.36, rotate: 270, fontFace: t.ctx.phong.nd,
    fontSize: 13, bold: dam, color: t.mau(vai), align: canh, valign: 'middle', margin: 0, lang: 'vi-VN' });
  if (td[1]) vDoc(td[1], y0 + H / 4, true, 'nhanDoc', 'right');
  if (td[0]) vDoc(td[0], y0 + (3 * H) / 4, false, 'chuPhu', 'left');
}

/* ---------------- lưới thẻ ---------------- */
async function theLuoi(t, v, k) {
  const ds = v.the || [];
  const n = ds.length;
  const cot = v.cot || (n <= 4 && k.w / k.h > 2 ? n : n === 4 ? 2 : Math.min(n, 3));
  const hang = Math.ceil(n / cot);
  const khe = 0.25;
  const wT = (k.w - khe * (cot - 1)) / cot;
  let hT = Math.min((k.h - khe * (hang - 1)) / hang, 3.2);
  const dau = 0.5;
  const coL = coChung(t, ds.map((m) => m.nhan), { w: wT - 0.5, h: 0.75, co: L + 1, coMin: LMIN, dam: true, gianDong: 1.18 });
  const coP = coChung(t, ds.map((m) => m.phu), { w: wT - 0.5, h: Math.max(0.3, hT - dau - 0.55 - IN(coL) * 2.4), co: P + 1, coMin: PMIN, gianDong: 1.3 });
  const hCan = 0.25 + dau + 0.2 + Math.max(...ds.map((m) => doKhoiNhan(t, m, { w: wT - 0.5, coL, coP }))) + 0.3;
  hT = Math.min(hT, Math.max(hCan, 1.6));
  const y0 = k.y + (k.h - (hT * hang + khe * (hang - 1))) / 2;
  for (let i = 0; i < n; i++) {
    const m = ds[i];
    const c = i % cot, r = Math.floor(i / cot);
    const soCotHang = r === hang - 1 ? n - r * cot : cot;
    const lechX = ((cot - soCotHang) * (wT + khe)) / 2;
    const x = k.x + lechX + c * (wT + khe), y = y0 + r * (hT + khe);
    const nh = v.mucNhan === i, sg = sang(v, i);
    t.hinh('roundRect', { x, y, w: wT, h: hT, to: nh ? t.b.tron('nhan', 0.16, 'nen') : t.b.tron('nhan', 0.06, 'nen'), vien: nh ? 'nhan' : 'vienThe', net: nh ? 1.75 : 0.75, bo: 0.06 });
    const mauDau = sg ? t.b.nhanDoc : t.b.chu('chuMo');
    let png = m.bieuTuong ? await bieuTuongPng(t.ctx.kho, t.ctx.tam, m.bieuTuong, mauDau) : null;
    if (m.bieuTuong && !png) t.canh('bieu-tuong', `the.${i}`, `không có biểu tượng "${m.bieuTuong}" trong he-thong/bieu-tuong.css`);
    if (png) t.anh(png, { x: x + 0.25, y: y + 0.25, w: dau, h: dau });
    else t.chu(m.so || String(i + 1).padStart(2, '0'), { x: x + 0.25, y: y + 0.18, w: 1.4, co: 26, coMin: 22, phong: 'td', dam: true, vai: sg ? 'nhanDoc' : 'chuMo', khongDem: true, gianDong: 1.1 });
    khoiNhan(t, m, i, v, { x: x + 0.25, y: y + 0.25 + dau + 0.2, w: wT - 0.5, coL, coP });
  }
  t.coHinh = true;
}

/* ---------------- so sánh ---------------- */
function soSanh(t, v, k) {
  const muiTen = v.muiTen !== false;
  const giua = muiTen ? 0.9 : 0.5;
  const wC = (k.w - giua) / 2;
  const cot = [v.trai || {}, v.phai || {}];
  const coL = coChung(t, cot.map((c) => c.nhan), { w: wC - 0.7, h: 0.8, co: L + 4, coMin: LMIN, dam: true, gianDong: 1.18 });
  const coM = Math.min(...cot.map((c) => t.do(c.muc || [], { w: wC - 0.7, h: k.h - 1.4, co: 22, coMin: PMIN + 2, dauDong: true, gianDong: 1.3, cachDoan: 8 }).co));
  const cao = cot.map((c) => {
    const a = t.do(c.nhan, { w: wC - 0.7, co: coL, coMin: coL, dam: true, gianDong: 1.18 }).cao;
    const b = t.do(c.muc || [], { w: wC - 0.7, co: coM, coMin: coM, dauDong: true, gianDong: 1.3, cachDoan: 8 }).cao;
    return { a, b };
  });
  const hC = Math.min(k.h, Math.max(2.6, 0.35 + Math.max(...cao.map((c) => c.a)) + 0.4 + Math.max(...cao.map((c) => c.b)) + 0.45));
  const y0 = k.y + (k.h - hC) / 2;
  const hNhan = Math.max(...cao.map((c) => c.a));
  cot.forEach((c, i) => {
    const x = k.x + i * (wC + giua);
    const phai = i === 1;
    const nh = v.mucNhan == null ? phai : v.mucNhan === i;
    t.hinh('roundRect', { x, y: y0, w: wC, h: hC, to: nh ? t.b.tron('nhan', 0.12, 'nen') : t.b.tron('chuMo', 0.08, 'nen'), vien: nh ? 'nhan' : 'vienThe', net: nh ? 1.5 : 0.75, bo: 0.05 });
    t.chu(c.nhan, { x: x + 0.35, y: y0 + 0.35, w: wC - 0.7, co: coL, coMin: coL, dam: true, vai: nh ? 'nhanDoc' : 'chuPhu', id: `${phai ? 'phai' : 'trai'}.nhan`, gianDong: 1.18 });
    t.duong(x + 0.35, y0 + 0.35 + hNhan + 0.15, x + wC - 0.35, y0 + 0.35 + hNhan + 0.15, { vai: nh ? 'nhan' : 'vienThe', net: 0.75 });
    t.chu(c.muc || [], { x: x + 0.35, y: y0 + 0.35 + hNhan + 0.4, w: wC - 0.7, h: hC - hNhan - 0.85, co: coM, coMin: coM, dauDong: true, vai: nh ? 'chu' : 'chuPhu', id: `${phai ? 'phai' : 'trai'}.muc`, gianDong: 1.3, cachDoan: 8 });
  });
  if (muiTen) {
    const cx = k.x + wC + giua / 2, cy = y0 + hC / 2;
    t.hinh('ellipse', { x: cx - 0.3, y: cy - 0.3, w: 0.6, h: 0.6, to: 'nhan', vien: 'nhan' });
    t.duong(cx - 0.14, cy, cx + 0.16, cy, { vai: 'nhanChu', net: 2, muiTen: true });
  }
}

/* ---------------- radar ---------------- */
function radar(t, v, k) {
  const ds = v.truc || [];
  const n = ds.length;
  const luoi = v.luoi || 4;
  const cx = k.x + k.w / 2, cy = k.y + k.h / 2 + 0.05;
  const wN = Math.min(2.6, k.w * 0.22);
  const coL = coChung(t, ds.map((m) => m.nhan), { w: wN, h: 0.6, co: L - 2, coMin: LMIN, dam: true, gianDong: 1.18 });
  const coP = coChung(t, ds.map((m) => m.phu), { w: wN, h: 0.6, co: P - 1, coMin: PMIN, gianDong: 1.25 });
  const hN = Math.max(...ds.map((m) => doKhoiNhan(t, m, { w: wN, coL, coP })));
  const R = Math.max(0.9, Math.min(k.h / 2 - hN - 0.2, k.w / 2 - wN - 0.3));
  const pt = (i, rr) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; };
  for (let g = luoi; g >= 1; g--) {
    const vong = ds.map((_, i) => pt(i, (R * g) / luoi));
    t.tuDo([...vong, vong[0]], { dong: g === luoi, to: g === luoi ? t.b.tron('nhan', 0.06, 'nen') : null, vai: 'vachMo', net: 0.75 });
  }
  ds.forEach((_, i) => { const [x, y] = pt(i, R); t.duong(cx, cy, x, y, { vai: 'vachMo', net: 0.75 }); });
  const dl = ds.map((m, i) => pt(i, R * Math.max(0.05, Math.min(1, m.gt == null ? 0.6 : m.gt))));
  t.tuDo([...dl, dl[0]], { dong: true, to: { ...t.b.mang('nhan'), transparency: 62 }, vai: 'nhan', net: 2 });
  dl.forEach(([x, y]) => t.hinh('ellipse', { x: x - 0.07, y: y - 0.07, w: 0.14, h: 0.14, to: 'nhan', vien: 'nen', net: 1 }));
  ds.forEach((m, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const c = Math.cos(a), s = Math.sin(a);
    const [ax, ay] = pt(i, R + 0.22);
    const giua = Math.abs(c) < 0.3;
    const h = doKhoiNhan(t, m, { w: wN, coL, coP });
    const x = giua ? ax - wN / 2 : c > 0 ? ax : ax - wN;
    const y = giua ? (s < 0 ? ay - h : ay) : ay - h / 2;
    khoiNhan(t, m, i, v, { x, y, w: wN, coL, coP, canh: giua ? 'center' : c > 0 ? 'left' : 'right' });
  });
}

/* ---------------- Venn ---------------- */
function venn(t, v, k) {
  const ds = (v.tap || []).slice(0, 3);
  const n = ds.length;
  if (n < 2) { t.canh('so-do', 'venn', 'Venn cần 2 hoặc 3 tập'); return; }
  const cx = k.x + k.w / 2, cy = k.y + k.h / 2;
  const r = n === 2 ? Math.min(k.h / 2 - 0.05, k.w / 3.6) : Math.min(k.h / 3.3, k.w / 4.2);
  const d = r * (n === 2 ? 0.62 : 0.6);
  const tam = n === 2 ? [[cx - d, cy], [cx + d, cy]] : [[cx, cy - d * 0.95], [cx - d * 1.05, cy + d * 0.62], [cx + d * 1.05, cy + d * 0.62]];
  const mau = (i) => t.b.phu[i % t.b.phu.length];
  tam.forEach(([x, y], i) => t.hinh('ellipse', { x: x - r, y: y - r, w: 2 * r, h: 2 * r, to: { color: mau(i), transparency: 78 }, vien: mau(i), net: 1.5 }));
  const wN = r * 0.95;
  const coL = coChung(t, ds.map((m) => m.nhan), { w: wN, h: 0.7, co: L, coMin: LMIN, dam: true, gianDong: 1.18 });
  const coP = coChung(t, ds.map((m) => m.phu), { w: wN, h: 0.9, co: P, coMin: PMIN, gianDong: 1.3 });
  ds.forEach((m, i) => {
    const [x, y] = tam[i];
    const huong = n === 2 ? [i === 0 ? -1 : 1, 0] : [[0, -1], [-0.87, 0.5], [0.87, 0.5]][i];
    const px = x + huong[0] * r * 0.42, py = y + huong[1] * r * 0.45;
    const h = doKhoiNhan(t, m, { w: wN, coL, coP });
    khoiNhan(t, m, i, v, { x: px - wN / 2, y: py - h / 2, w: wN, coL, coP, canh: 'center' });
  });
  if (v.giao) {
    const wG = n === 2 ? r * 0.7 : r * 0.62;
    const h = doKhoiNhan(t, v.giao, { w: wG, coL: coL - 1, coP: coP - 1 });
    const gy = n === 2 ? cy : cy + d * 0.1;
    khoiNhan(t, v.giao, 99, { mucNhan: null }, { x: cx - wG / 2, y: gy - h / 2, w: wG, coL: coL - 1, coP: coP - 1, canh: 'center', vaiNhan: 'chu' });
  }
}

/* ---------------- vòng đồng tâm ---------------- */
function dongTam(t, v, k) {
  // các vòng lồng nhau chạm chung một đáy: mỗi vòng chừa một dải phía trên cho nhãn, đường dẫn nằm ngang song song
  const ds = v.lop || [];
  const n = ds.length;
  const Rm = Math.min(k.h / 2, k.w * 0.22);
  const cx = k.x + Rm, day = k.y + k.h - (k.h - 2 * Rm) / 2;
  const ban = (i) => Rm * (0.3 + (0.7 * (i + 1)) / n); // i = 0 trong cùng
  const dinh = (i) => day - 2 * ban(i);
  const neo = (i) => (i === 0 ? dinh(0) + ban(0) * 0.55 : (dinh(i) + dinh(i - 1)) / 2);
  const xT = k.x + 2 * Rm + 0.7, wN = k.x + k.w - xT;
  const khe = n > 1 ? Math.min(...ds.slice(1).map((_, j) => neo(j) - neo(j + 1))) : k.h;
  const coL = coChung(t, ds.map((m) => m.nhan), { w: wN, h: 0.45, co: L, coMin: LMIN, dam: true, gianDong: 1.18 });
  const coP = coChung(t, ds.map((m) => m.phu), { w: wN, h: Math.max(0.25, khe - IN(coL) * 1.25 - 0.12), co: P + 1, coMin: PMIN, gianDong: 1.25 });
  for (let i = n - 1; i >= 0; i--) {
    const rr = ban(i);
    const nh = v.mucNhan === i;
    t.hinh('ellipse', { x: cx - rr, y: day - 2 * rr, w: 2 * rr, h: 2 * rr, to: nh ? 'nhan' : t.b.tron('nhan', 0.12 + (0.5 * (n - 1 - i)) / Math.max(1, n - 1), 'nen'), vien: 'nen', net: 1.5 });
  }
  ds.forEach((m, i) => {
    const y = neo(i);
    t.duong(cx + 0.07, y, xT - 0.15, y, { vai: 'vach', net: 0.75 });
    t.hinh('ellipse', { x: cx - 0.07, y: y - 0.07, w: 0.14, h: 0.14, to: 'nen', vien: 'nhanDoc', net: 1 });
    const h = doKhoiNhan(t, m, { w: wN, coL, coP });
    khoiNhan(t, m, i, v, { x: xT, y: y - IN(coL) * 0.62, w: wN, coL, coP });
    if (h > khe + 0.15 && i > 0) t.canh('so-do', `lop.${i}`, 'nhãn các vòng chồng nhau: rút mô tả cho ngắn');
  });
}

/* ---------------- tảng băng ---------------- */
function tangBang(t, v, k) {
  const pw = Math.min(k.w * 0.42, k.h * 1.25);
  const yN = k.y + k.h * 0.3;
  const cxp = k.x + pw / 2;
  const a = yN - k.y, b = k.y + k.h - yN;
  const P2 = (ds, d) => ds.map(([u, f]) => [cxp + u * pw, yN + f * d]);
  // nét gãy tối giản; không ghi tỉ lệ phần nổi, chìm (chuan/06 R6.9)
  const noi = P2([[-0.2, 0], [-0.1, -0.55], [-0.03, -0.92], [0.04, -0.68], [0.09, -0.8], [0.21, 0]], a);
  const chim = P2([[-0.2, 0], [0.21, 0], [0.38, 0.22], [0.45, 0.5], [0.33, 0.82], [0.12, 0.98], [-0.12, 0.95], [-0.36, 0.75], [-0.47, 0.42], [-0.36, 0.15]], b);
  t.tuDo(chim, { dong: true, to: t.b.tron('nhan', 0.45, 'nen'), vien: false });
  t.tuDo(noi, { dong: true, to: t.b.tron('nhan', 0.15, 'nen'), vien: 'nhan', net: 1 });
  const song = [];
  for (let x = k.x - 0.1; x <= k.x + k.w; x += 0.1) song.push([x, yN + Math.sin((x - k.x) * 5) * 0.03]);
  t.tuDo(song, { vai: 'vach', net: 1 });
  const xN = k.x + pw + 0.6, wN = k.x + k.w - xN;
  const khoi = (o, y, h, i, nhanVai) => {
    if (!o) return;
    const r1 = t.chu(o.nhan, { x: xN, y, w: wN, co: L + 2, coMin: LMIN, dam: true, hoa: true, vai: nhanVai, id: `${i ? 'chim' : 'noi'}.nhan`, gianDong: 1.18 });
    t.chu(o.muc || [], { x: xN, y: y + r1.cao + 0.1, w: wN, h: h - r1.cao - 0.1, co: P + 4, coMin: PMIN, dauDong: true, vai: 'chuPhu', id: `${i ? 'chim' : 'noi'}.muc` });
  };
  khoi(v.noi, k.y, yN - k.y - 0.15, 0, 'chu');
  khoi(v.chim, yN + 0.3, k.y + k.h - yN - 0.3, 1, 'nhanDoc');
}

/* ---------------- phổ, dải liên tục ---------------- */
function pho(t, v, k) {
  const ds = v.doan || [];
  const n = Math.max(1, ds.length);
  const cao = 0.62;
  const w = k.w / n;
  const coL = coChung(t, ds.map((m) => m.nhan), { w: w - 0.3, h: 0.8, co: L + 2, coMin: LMIN, dam: true, gianDong: 1.18 });
  const coP = coChung(t, ds.map((m) => m.phu), { w: w - 0.3, h: 1.3, co: P + 2, coMin: PMIN, gianDong: 1.3 });
  const hKhoi = Math.max(0, ...ds.map((m) => doKhoiNhan(t, m, { w: w - 0.3, coL, coP })));
  const tong = 0.5 + cao + 0.25 + hKhoi;
  const y0 = k.y + Math.max(0, (k.h - tong) / 2);
  const y = y0 + 0.5;
  ds.forEach((m, i) => {
    const nh = v.mucNhan === i;
    const to = v.mucNhan == null ? t.b.tron('nhan', 0.2 + (0.6 * i) / Math.max(1, n - 1), 'nen') : nh ? 'nhan' : t.b.tron('nhan', 0.16, 'nen');
    t.hinh('rect', { x: k.x + i * w, y, w: w - 0.05, h: cao, to });
    khoiNhan(t, m, i, v, { x: k.x + i * w + 0.15, y: y + cao + 0.25, w: w - 0.3, coL, coP, canh: 'center' });
  });
  if (v.trai) t.chu('← ' + v.trai, { x: k.x, y: y0, w: k.w / 2, co: 15, coMin: 13, vai: 'chuPhu', id: 'pho.trai', nguongDoc: 13 });
  if (v.phai) t.chu(v.phai + ' →', { x: k.x + k.w / 2, y: y0, w: k.w / 2, co: 15, coMin: 13, vai: 'chuPhu', canh: 'right', id: 'pho.phai', nguongDoc: 13 });
  if (v.diem && v.diem.vi != null) {
    const x = k.x + Math.max(0, Math.min(1, v.diem.vi)) * k.w;
    t.tuDo([[x - 0.13, y - 0.02], [x + 0.13, y - 0.02], [x, y + 0.2]], { dong: true, to: 'chu', vien: false });
    if (v.diem.nhan) t.chu(v.diem.nhan, { x: x - 1.2, y: y - 0.45, w: 2.4, co: 15, coMin: 13, dam: true, canh: 'center', vai: 'chu', id: 'pho.diem' });
  }
}


/* ---------------- xoắn ốc tiến (lặp lại và sâu dần) ---------------- */
function xoanOc(t, v, k) {
  // mỗi chặng là một vòng; đường vừa quay lại vừa tiến lên, vòng sau lớn hơn vòng trước: "lặp lại nhưng không như cũ"
  const ds = v.buoc || [];
  const n = ds.length;
  if (!n) return;
  const hoa = hoaNhan(ds);
  const cot = k.w / n;
  const wNhan = cot * 0.9;
  const coL = coChung(t, ds.map((m) => m.nhan), { w: wNhan, h: 0.8, co: L, coMin: LMIN, dam: true, hoa, gianDong: 1.18 });
  const coP = coChung(t, ds.map((m) => m.phu), { w: wNhan, h: 1.0, co: P + 1, coMin: PMIN, gianDong: 1.3 });
  const hKhoi = Math.max(...ds.map((m) => doKhoiNhan(t, m, { w: wNhan, coL, coP, hoa })));
  const a = cot / (2 * Math.PI);
  const rMax = Math.min(2.1 * a, (k.h - hKhoi - 0.45) / 2);
  const rMin = Math.min(1.45 * a, rMax * 0.75);
  const T0 = Math.PI * 0.45, T1 = Math.PI * (2 * n - 0.4);
  const r = (tt) => rMin + ((rMax - rMin) * (tt - T0)) / (T1 - T0);
  const tong = 2 * rMax + 0.4 + hKhoi;
  const yc = k.y + Math.max(0, (k.h - tong) / 2) + rMax;
  const x0 = k.x + cot / 2 - a * Math.PI;
  const diem = (tt) => [x0 + a * tt + r(tt) * Math.sin(tt), yc + r(tt) * Math.cos(tt)];
  const duong = [];
  const so = 40 * n;
  for (let j = 0; j <= so; j++) duong.push(diem(T0 + ((T1 - T0) * j) / so));
  t.tuDo(duong, { vai: 'vach', net: 1.5, muiTen: true });
  ds.forEach((m, i) => {
    const [x, y] = diem(Math.PI * (2 * i + 1));
    nut(t, x, y, 0.26, String(i + 1), sang(v, i), { co: 13 });
    khoiNhan(t, m, i, v, { x: k.x + cot * i + (cot - wNhan) / 2, y: yc + rMax + 0.4, w: wNhan, coL, coP, hoa, canh: 'center' });
  });
}

/* ---------------- isotype: số lượng bằng số biểu tượng ---------------- */
async function isotype(t, v, k) {
  // R6.8: nhiều hơn là NHIỀU biểu tượng hơn, không phải biểu tượng to hơn; một kiểu biểu tượng; ghi rõ một hình bằng bao nhiêu
  const ds = v.hang || [];
  const n = ds.length;
  if (!n) return;
  const max = Math.max(...ds.map((h) => h.gt || 0), 1);
  const wN = Math.min(3.4, k.w * 0.28);
  const hDonVi = v.donVi ? 0.45 : 0;
  const hang = Math.min(1.1, (k.h - hDonVi) / n);
  const vung = k.w - wN - 1.2;
  const s = Math.min(hang * 0.62, vung / max / 1.15);
  if (s < 0.16) t.canh('so-do', 'isotype', `quá nhiều biểu tượng (${max}) cho bề rộng: tăng giá trị mỗi biểu tượng (donVi)`);
  const y0 = k.y + (k.h - hDonVi - hang * n) / 2;
  const coL = coChung(t, ds.map((h) => h.nhan), { w: wN, h: hang * 0.9, co: L, coMin: LMIN, dam: true, gianDong: 1.18 });
  for (let i = 0; i < n; i++) {
    const h = ds[i];
    const y = y0 + i * hang;
    const sg = sang(v, i);
    const mau = sg ? t.b.nhanDoc : t.b.chu('chuMo');
    const r = t.do(h.nhan, { w: wN, co: coL, coMin: coL, dam: true, gianDong: 1.18 });
    t.chu(h.nhan, { x: k.x, y: y + (hang - r.cao) / 2, w: wN, co: coL, coMin: coL, dam: true, canh: 'right', vai: sg ? 'chu' : 'chuMo', id: `hang.${i}.nhan`, gianDong: 1.18 });
    const png = await bieuTuongPng(t.ctx.kho, t.ctx.tam, h.bieuTuong || v.bieuTuong || 'nguoi', mau);
    const nguyen = Math.floor(h.gt || 0), du = (h.gt || 0) - nguyen;
    for (let j = 0; j < nguyen; j++) if (png) t.anh(png, { x: k.x + wN + 0.35 + j * s * 1.15, y: y + (hang - s) / 2, w: s, h: s });
    if (du > 0.05 && png) t.anh(png, { x: k.x + wN + 0.35 + nguyen * s * 1.15, y: y + (hang - s) / 2, w: s, h: s, trongSuot: 65 });
    t.chu(String(h.gtChu || h.gt), { x: k.x + wN + 0.45 + Math.ceil(h.gt || 0) * s * 1.15, y: y + (hang - 0.4) / 2, w: 1.2, co: 18, coMin: 14, dam: true, vai: sg ? 'nhanDoc' : 'chuMo', id: `hang.${i}.gt`, khongDem: true, gianDong: 1.1 });
  }
  if (v.donVi) t.chu(v.donVi, { x: k.x + wN + 0.35, y: k.y + k.h - 0.36, w: k.w - wN - 0.35, co: 13, coMin: 12, nghieng: true, vai: 'chuPhu', id: 'donVi', nguongDoc: 12 });
}

const LOAI = {
  chuoi, 'hanh-trinh': hanhTrinh, 'vong-lap': vongLap, tang, 'trung-tam': trungTam, 'ma-tran': maTran,
  'the-luoi': theLuoi, 'so-sanh': soSanh, radar, venn, 'dong-tam': dongTam, 'tang-bang': tangBang, pho,
  'xoan-oc': xoanOc, isotype,
};

/** Số mục của một sơ đồ (để tự sinh chuỗi slide báo hiệu từng mục). */
function soMuc(v) {
  const k = { chuoi: 'buoc', 'vong-lap': 'buoc', 'hanh-trinh': 'tram', tang: 'tang', 'trung-tam': 'nhanh', 'the-luoi': 'the',
    radar: 'truc', venn: 'tap', 'dong-tam': 'lop', pho: 'doan', 'xoan-oc': 'buoc', isotype: 'hang' }[v.loai];
  if (k) return (v[k] || []).length;
  if (v.loai === 'ma-tran') return 4;
  if (v.loai === 'so-sanh') return 2;
  return 0;
}

async function veSoDo(t, v, k) {
  const fn = LOAI[v.loai];
  if (!fn) { t.canh('so-do', 'soDo.loai', `không có loại sơ đồ "${v.loai}" (có: ${Object.keys(LOAI).join(', ')})`); return; }
  t.coHinh = true;
  await fn(t, v, k);
}

module.exports = { veSoDo, LOAI, soMuc };
