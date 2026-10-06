/* minh-hoa/so-do.js - vẽ sơ đồ tri thức bằng code từ dữ liệu, theo màu và phông của chủ đề đang dùng.
 *
 * Mỗi loại sơ đồ là một CẤU TRÚC KHẲNG ĐỊNH (chuan/06-minh-hoa-tri-thuc.md mục 2): chọn loại theo logic của khái niệm,
 * không theo sở thích. Ô nội dung: <div data-o-so-do="soDo"></div>; giá trị: { loai, ...dữ liệu }.
 *
 *   radar        { truc: [{ma, nhan, phu, gt (0-1)}], luoi: 4 }                  hồ sơ nhiều chiều cùng thang
 *   chuoi        { buoc: [{nhan, phu}], huong: 'ngang'|'doc'|'tu-dong' }          tiến trình có thứ tự, tích luỹ
 *   vong-lap     { buoc: [{nhan, phu}], tam: 'chữ ở tâm' }                        quá trình lặp lại thật
 *   tang         { tang: [{nhan, phu}] (trên xuống), kieu: 'thap'|'chong' }       tầng nền tảng, tầng dưới nâng tầng trên
 *   trung-tam    { tam: {nhan, phu}, nhanh: [{nhan, phu}] }                        một lõi và các mặt ngang hàng
 *   hanh-trinh   { tram: [{nhan, phu}] }                                           đường phát triển dài, có chặng
 *   ma-tran      { trucNgang: [trái, phải], trucDoc: [dưới, trên], o: [tl, tr, bl, br] (mỗi ô {nhan, phu}) }
 *   the-luoi     { the: [{bieuTuong|so, nhan, phu}], cot: 3 }                     các mục ngang hàng có mô tả
 *   so-sanh      { trai: {nhan, muc: []}, phai: {nhan, muc: []} }                  trước và sau, hai cách
 *   anh          { src }                                                            sơ đồ vẽ sẵn (SVG, PNG) trong dự án
 * Mọi loại nhận thêm: nhanMau (màu vai cho từng mục: 'nhan', 'phu1'...), mucNhan (chỉ số mục được báo hiệu, bắt đầu 0).
 */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  let _ctx;

  function phong(el, loai) {
    const goc = el.closest('.canvas');
    const cs = getComputedStyle(goc);
    const v = (k, d) => (cs.getPropertyValue(k) || '').trim().replace(/^"|"$/g, '') || d;
    return { td: v('--phong-tieu-de', 'Playfair Display'), nd: v('--phong-noi-dung', 'Be Vietnam Pro'), co: parseFloat(cs.getPropertyValue('--co')) || 1 };
  }
  function doRong(chu, font) {
    _ctx = _ctx || document.createElement('canvas').getContext('2d');
    _ctx.font = font;
    return _ctx.measureText(chu).width;
  }
  function ngat(chu, rong, font) {
    const tu = String(chu || '').split(/\s+/).filter(Boolean);
    const dong = [];
    let cur = '';
    for (const t of tu) {
      const thu = cur ? cur + ' ' + t : t;
      if (doRong(thu.replace(/~/g, ' '), font) <= rong || !cur) cur = thu; else { dong.push(cur); cur = t; }
    }
    if (cur) dong.push(cur);
    return dong.map((d) => d.replace(/~/g, ' '));
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // chữ nhiều dòng canh giữa tại (x, y) = đỉnh khối
  function khoiChu(x, y, chu, o) {
    const font = `${o.nghieng ? 'italic ' : ''}${o.dam || 400} ${o.co}px "${o.phong}"`;
    const ds = o.rong ? ngat(chu, o.rong, font) : [String(chu)];
    const lh = o.co * (o.lh || 1.25);
    const neo = o.neo || 'middle';
    let s = `<text x="${x.toFixed(1)}" y="${(y + o.co * 0.92).toFixed(1)}" text-anchor="${neo}" style="font-family:'${o.phong}';font-size:${o.co.toFixed(2)}px;font-weight:${o.dam || 400};${o.nghieng ? 'font-style:italic;' : ''}fill:${o.mau || 'var(--chu)'};${o.gian ? `letter-spacing:${o.gian}em;` : ''}${o.hoa ? 'text-transform:uppercase;' : ''}">`;
    ds.forEach((d, i) => { s += `<tspan x="${x.toFixed(1)}" dy="${i ? lh.toFixed(1) : 0}">${esc(o.hoa ? d.toUpperCase() : d)}</tspan>`; });
    s += '</text>';
    return { svg: s, cao: ds.length * lh, dong: ds.length };
  }
  function bocSvg(w, h, ben) {
    return `<svg xmlns="${NS}" viewBox="0 0 ${w.toFixed(1)} ${h.toFixed(1)}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="overflow:visible">${ben}</svg>`;
  }
  const mauVai = (v, i, mac) => {
    const ds = v.nhanMau;
    if (Array.isArray(ds) && ds[i]) return `var(--${ds[i]})`;
    return mac;
  };

  /* ---------------- radar ---------------- */
  function radar(el, v, u, f) {
    const w = el.clientWidth, h = el.clientHeight;
    const n = v.truc.length;
    const R = Math.max(u * 10, Math.min(w / 2 - u * 21, h / 2 - u * 14.5));
    const cx = w / 2, cy = h / 2 + u * 3.2;
    const luoi = v.luoi || 4;
    const pt = (i, r) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
    let s = '';
    for (let k = luoi; k >= 1; k--) {
      const ds = v.truc.map((_, i) => pt(i, (R * k) / luoi).map((x) => x.toFixed(1)).join(',')).join(' ');
      s += `<polygon points="${ds}" style="fill:${k === luoi ? 'color-mix(in srgb, var(--nhanDam) 22%, transparent)' : 'none'};stroke:var(--vachMo);stroke-width:${(u * 0.14).toFixed(2)}"/>`;
    }
    v.truc.forEach((_, i) => { const [x, y] = pt(i, R); s += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" style="stroke:var(--vachMo);stroke-width:${(u * 0.12).toFixed(2)}"/>`; });
    const dl = v.truc.map((t, i) => pt(i, R * Math.max(0.05, Math.min(1, t.gt ?? 0.6))));
    s += `<polygon points="${dl.map((p) => p.map((x) => x.toFixed(1)).join(',')).join(' ')}" style="fill:color-mix(in srgb, var(--chuPhu) 45%, transparent);stroke:var(--nhanSang);stroke-width:${(u * 0.35).toFixed(2)};stroke-linejoin:round"/>`;
    dl.forEach(([x, y]) => { s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(u * 0.9).toFixed(2)}" style="fill:var(--nhanSang);stroke:var(--nen);stroke-width:${(u * 0.3).toFixed(2)}"/>`; });
    v.truc.forEach((t, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const [x, y] = pt(i, R + u * 6.5);
      const lech = Math.cos(a);
      const neo = Math.abs(lech) < 0.3 ? 'middle' : lech > 0 ? 'start' : 'end';
      const xx = neo === 'middle' ? x : x + (lech > 0 ? -u * 1.5 : u * 1.5);
      let yy = y - u * 2.2;
      if (Math.sin(a) < -0.6) yy -= u * 3.2;
      if (t.ma) {
        const bx = neo === 'middle' ? xx : neo === 'start' ? xx + u * 2.4 : xx - u * 2.4;
        s += `<circle cx="${bx.toFixed(1)}" cy="${(yy - u * 2.6).toFixed(1)}" r="${(u * 2.3).toFixed(2)}" style="fill:var(--nhan)"/>`;
        s += khoiChu(bx, yy - u * 4.2, t.ma, { co: u * 2.3, dam: 800, phong: f.nd, mau: 'var(--nhanChu)' }).svg;
      }
      s += khoiChu(xx, yy + u * 0.6, t.nhan, { co: u * 2.4 * f.co, dam: 800, phong: f.nd, mau: 'var(--nhanSang)', neo, hoa: true, gian: 0.02 }).svg;
      if (t.phu) s += khoiChu(xx, yy + u * 3.6, t.phu, { co: u * 2.2 * f.co, dam: 400, phong: f.nd, mau: 'var(--chu)', neo }).svg;
    });
    el.innerHTML = bocSvg(w, h, s);
  }

  /* ---------------- chuỗi ---------------- */
  function chuoi(el, v, u, f) {
    const w = el.clientWidth, h = el.clientHeight;
    const n = v.buoc.length;
    let huong = v.huong || 'tu-dong';
    const nhomKhung = (el.closest('.canvas') || {}).dataset ? el.closest('.canvas').dataset.nhom : '';
    if (huong === 'tu-dong') huong = nhomKhung === 'doc' ? 'doc' : (w / h > 1.2 || (n <= 5 && w / h > 0.85) ? 'ngang' : 'doc');
    let s = '';
    const nhanIdx = v.mucNhan;
    if (huong === 'ngang') {
      const pad = w / n / 2;
      const y = h * 0.38;
      s += `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" style="stroke:var(--vach);stroke-width:${(u * 0.18).toFixed(2)}"/>`;
      v.buoc.forEach((b, i) => {
        const x = pad + (i * (w - 2 * pad)) / Math.max(1, n - 1);
        const r = u * 2.3;
        const sang = nhanIdx == null || nhanIdx === i;
        s += `<rect x="${(x - r).toFixed(1)}" y="${(y - r).toFixed(1)}" width="${(2 * r).toFixed(1)}" height="${(2 * r).toFixed(1)}" transform="rotate(45 ${x.toFixed(1)} ${y.toFixed(1)})" style="fill:${sang ? 'var(--nhan)' : 'var(--theDam)'};stroke:var(--nhanSang);stroke-width:${(u * 0.25).toFixed(2)}"/>`;
        const k1 = khoiChu(x, y + u * 4.4, b.nhan, { co: u * 2.6 * f.co, dam: 800, phong: f.nd, mau: sang ? mauVai(v, i, 'var(--nhanSang)') : 'var(--chuMo)', hoa: true, rong: (w / n) * 0.96, gian: 0.03 });
        s += k1.svg;
        if (b.phu) s += khoiChu(x, y + u * 5 + k1.cao, b.phu, { co: u * 2 * f.co, phong: f.nd, mau: 'var(--chuPhu)', rong: (w / n) * 0.92, lh: 1.35 }).svg;
      });
    } else {
      const x = u * 4;
      const pad = u * 4;
      const buocY = (h - 2 * pad) / Math.max(1, n - 1);
      s += `<line x1="${x}" y1="${pad}" x2="${x}" y2="${h - pad}" style="stroke:var(--vach);stroke-width:${(u * 0.18).toFixed(2)}"/>`;
      v.buoc.forEach((b, i) => {
        const y = pad + i * buocY;
        const r = u * 2;
        const sang = nhanIdx == null || nhanIdx === i;
        s += `<rect x="${(x - r).toFixed(1)}" y="${(y - r).toFixed(1)}" width="${(2 * r).toFixed(1)}" height="${(2 * r).toFixed(1)}" transform="rotate(45 ${x} ${y.toFixed(1)})" style="fill:${sang ? 'var(--nhan)' : 'var(--theDam)'};stroke:var(--nhanSang);stroke-width:${(u * 0.25).toFixed(2)}"/>`;
        const k1 = khoiChu(x + u * 5, y - u * 1.9, b.nhan, { co: u * 3 * f.co, dam: 800, phong: f.nd, mau: sang ? mauVai(v, i, 'var(--nhanSang)') : 'var(--chuMo)', neo: 'start', hoa: true, gian: 0.03 });
        s += k1.svg;
        if (b.phu) s += khoiChu(x + u * 5, y - u * 1.6 + k1.cao, b.phu, { co: u * 2.3 * f.co, phong: f.nd, mau: 'var(--chuPhu)', neo: 'start', rong: w - x - u * 6 }).svg;
      });
    }
    el.innerHTML = bocSvg(w, h, s);
  }

  /* ---------------- vòng lặp ---------------- */
  function vongLap(el, v, u, f) {
    const w = el.clientWidth, h = el.clientHeight;
    const n = v.buoc.length;
    const R = Math.max(u * 12, Math.min(w / 2 - u * 27, h / 2 - u * 13));
    const cx = w / 2, cy = h / 2 + u * 1.5;
    const rn = u * 5.2;
    let s = `<defs><marker id="mt" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="${(u * 0.9).toFixed(1)}" markerHeight="${(u * 0.9).toFixed(1)}" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--nhan)"/></marker></defs>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R.toFixed(1)}" style="fill:none;stroke:var(--vachMo);stroke-width:${(u * 0.15).toFixed(2)};stroke-dasharray:${(u * 0.6).toFixed(1)} ${(u * 0.8).toFixed(1)}"/>`;
    const goc = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    for (let i = 0; i < n; i++) {
      const a0 = goc(i) + (rn * 1.25) / R, a1 = goc(i + 1) - (rn * 1.35) / R;
      const p0 = [cx + R * Math.cos(a0), cy + R * Math.sin(a0)], p1 = [cx + R * Math.cos(a1), cy + R * Math.sin(a1)];
      s += `<path d="M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${R.toFixed(1)} ${R.toFixed(1)} 0 0 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}" style="fill:none;stroke:var(--nhan);stroke-width:${(u * 0.3).toFixed(2)}" marker-end="url(#mt)"/>`;
    }
    v.buoc.forEach((b, i) => {
      const a = goc(i);
      const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rn.toFixed(1)}" style="fill:var(--theDam);stroke:var(--nhan);stroke-width:${(u * 0.3).toFixed(2)}"/>`;
      s += khoiChu(x, y - u * 1.9, String(i + 1).padStart(2, '0'), { co: u * 2.8, dam: 700, phong: f.td, mau: 'var(--nhanSang)' }).svg;
      const ra = Math.cos(a), duoi = Math.sin(a);
      const neo = Math.abs(ra) < 0.35 ? 'middle' : ra > 0 ? 'start' : 'end';
      const lx = x + (neo === 'middle' ? 0 : ra > 0 ? rn + u * 1.6 : -rn - u * 1.6);
      const ly = neo === 'middle' ? (duoi < 0 ? y - rn - u * 7.2 : y + rn + u * 1.2) : y - u * 2.6;
      const k1 = khoiChu(lx, ly, b.nhan, { co: u * 2.7 * f.co, dam: 800, phong: f.nd, mau: mauVai(v, i, 'var(--chu)'), neo, hoa: true, gian: 0.03 });
      s += k1.svg;
      if (b.phu) s += khoiChu(lx, ly + k1.cao + u * 0.2, b.phu, { co: u * 2.1 * f.co, phong: f.nd, mau: 'var(--chuPhu)', neo, rong: neo === 'middle' ? u * 30 : u * 19 }).svg;
    });
    if (v.tam) s += khoiChu(cx, cy - u * 3, v.tam, { co: u * 3.4 * f.co, dam: 600, phong: f.td, nghieng: true, mau: 'var(--nhanSang)', rong: R * 1.2 }).svg;
    el.innerHTML = bocSvg(w, h, s);
  }

  /* ---------------- tầng ---------------- */
  function tang(el, v, u, f) {
    const w = el.clientWidth, h = el.clientHeight;
    const n = v.tang.length;
    const khe = u * 1;
    const cao = (h - khe * (n - 1)) / n;
    const thap = (v.kieu || 'thap') === 'thap';
    let s = '';
    v.tang.forEach((t, i) => {
      const y = i * (cao + khe);
      const tren = thap ? w * (0.28 + (0.72 * i) / n) : w * 0.9;
      const duoi = thap ? w * (0.28 + (0.72 * (i + 1)) / n) : w * 0.9;
      const x0 = (w - tren) / 2, x1 = (w - duoi) / 2;
      const sang = v.mucNhan == null ? i === 0 : v.mucNhan === i;
      s += `<path d="M${x0.toFixed(1)} ${y.toFixed(1)} H${(x0 + tren).toFixed(1)} L${(x1 + duoi).toFixed(1)} ${(y + cao).toFixed(1)} H${x1.toFixed(1)} Z" style="fill:${sang ? 'var(--nhan)' : `color-mix(in srgb, var(--nhan) ${Math.round(14 + (i * 30) / n)}%, var(--theDam))`};stroke:var(--vienThe);stroke-width:${(u * 0.15).toFixed(2)}"/>`;
      const mau = sang ? 'var(--nhanChu)' : 'var(--chu)';
      const k = khoiChu(w / 2, y + cao / 2 - u * (t.phu ? 3 : 1.6), t.nhan, { co: u * 2.8 * f.co, dam: 800, phong: f.nd, mau, hoa: true, gian: 0.04, rong: Math.min(tren, duoi) * 0.9 });
      s += k.svg;
      if (t.phu) s += khoiChu(w / 2, y + cao / 2 - u * 3 + k.cao + u * 0.3, t.phu, { co: u * 2.1 * f.co, phong: f.nd, mau: sang ? 'var(--nhanChu)' : 'var(--chuPhu)', rong: Math.min(tren, duoi) * 0.86 }).svg;
    });
    el.innerHTML = bocSvg(w, h, s);
  }

  /* ---------------- trung tâm và nhánh ---------------- */
  function trungTam(el, v, u, f) {
    const w = el.clientWidth, h = el.clientHeight;
    const n = v.nhanh.length;
    const cx = w / 2;
    const bw = Math.min(u * 30, Math.max(u * 22, (w / Math.max(3, n)) * 1.1));
    // đo trước từng thẻ để biết chiều cao thật
    const the = v.nhanh.map((b) => {
      const k1 = khoiChu(0, 0, b.nhan, { co: u * 2.6 * f.co, dam: 800, phong: f.nd, rong: bw * 0.86 });
      const k2 = b.phu ? khoiChu(0, 0, b.phu, { co: u * 1.95 * f.co, phong: f.nd, rong: bw * 0.86 }) : { cao: 0 };
      return { b, cao: k1.cao + k2.cao + u * 3.4, k1 };
    });
    const bhMax = Math.max(...the.map((t) => t.cao));
    const rt = Math.max(u * 9, Math.min(Math.min(w, h) * 0.16, h / 2 - bhMax - u * 4));
    const goc = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const sins = v.nhanh.map((_, i) => Math.sin(goc(i)));
    const sMin = Math.min(...sins), sMax = Math.max(...sins);
    const Rx = Math.max(rt + bw / 2 + u * 3, w / 2 - bw / 2 - u);
    const Ry = Math.max(rt + bhMax / 2 + u * 3, (h - bhMax - u * 2) / Math.max(1, sMax - sMin));
    const cy2 = h / 2 - (Ry * (sMin + sMax)) / 2;
    let s = '';
    v.nhanh.forEach((_, i) => {
      const a = goc(i);
      s += `<line x1="${(cx + rt * Math.cos(a)).toFixed(1)}" y1="${(cy2 + rt * Math.sin(a)).toFixed(1)}" x2="${(cx + Rx * Math.cos(a)).toFixed(1)}" y2="${(cy2 + Ry * Math.sin(a)).toFixed(1)}" style="stroke:var(--vach);stroke-width:${(u * 0.18).toFixed(2)}"/>`;
    });
    s += `<circle cx="${cx}" cy="${cy2}" r="${(rt + u * 1.2).toFixed(1)}" style="fill:none;stroke:var(--vachMo);stroke-width:${(u * 0.15).toFixed(2)}"/>`;
    s += `<circle cx="${cx}" cy="${cy2}" r="${rt.toFixed(1)}" style="fill:var(--theDam);stroke:var(--nhan);stroke-width:${(u * 0.35).toFixed(2)}"/>`;
    const kt = khoiChu(0, 0, v.tam.nhan, { co: u * 3 * f.co, dam: 800, phong: f.nd, rong: rt * 1.6 });
    const kp = v.tam.phu ? khoiChu(0, 0, v.tam.phu, { co: u * 1.9 * f.co, phong: f.nd, rong: rt * 1.5 }) : { cao: 0 };
    const y0 = cy2 - (kt.cao + kp.cao + u * 0.4) / 2;
    s += khoiChu(cx, y0, v.tam.nhan, { co: u * 3 * f.co, dam: 800, phong: f.nd, mau: 'var(--nhanSang)', hoa: true, gian: 0.05, rong: rt * 1.6 }).svg;
    if (v.tam.phu) s += khoiChu(cx, y0 + kt.cao + u * 0.4, v.tam.phu, { co: u * 1.9 * f.co, phong: f.nd, mau: 'var(--chu)', rong: rt * 1.5 }).svg;
    the.forEach((t, i) => {
      const a = goc(i);
      const x = cx + Rx * Math.cos(a), y = cy2 + Ry * Math.sin(a);
      const bh = t.cao;
      s += `<rect x="${(x - bw / 2).toFixed(1)}" y="${(y - bh / 2).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="${u.toFixed(1)}" style="fill:${mauVai(v, i, 'var(--theDam)')};stroke:var(--vienThe);stroke-width:${(u * 0.15).toFixed(2)}"/>`;
      s += khoiChu(x, y - bh / 2 + u * 1.5, t.b.nhan, { co: u * 2.6 * f.co, dam: 800, phong: f.nd, mau: 'var(--nhanSang)', rong: bw * 0.86 }).svg;
      if (t.b.phu) s += khoiChu(x, y - bh / 2 + u * 1.9 + t.k1.cao, t.b.phu, { co: u * 1.95 * f.co, phong: f.nd, mau: 'var(--chuPhu)', rong: bw * 0.86 }).svg;
    });
    el.innerHTML = bocSvg(w, h, s);
  }

  /* ---------------- hành trình ---------------- */
  function hanhTrinh(el, v, u, f) {
    const w = el.clientWidth, h = el.clientHeight;
    const n = v.tram.length;
    const pad = u * 6;
    const pts = v.tram.map((_, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      return [pad + t * (w - 2 * pad), h * 0.78 - t * h * 0.5 + Math.sin(t * Math.PI * 2) * h * 0.06];
    });
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < n; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      const mx = (x0 + x1) / 2;
      d += ` C${mx.toFixed(1)} ${y0.toFixed(1)} ${mx.toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    }
    let s = `<path d="${d}" style="fill:none;stroke:var(--vachMo);stroke-width:${(u * 2.2).toFixed(1)};stroke-linecap:round"/>`;
    s += `<path d="${d}" style="fill:none;stroke:var(--nhan);stroke-width:${(u * 0.3).toFixed(2)};stroke-dasharray:${(u * 1).toFixed(1)} ${(u * 0.9).toFixed(1)}"/>`;
    v.tram.forEach((t, i) => {
      const [x, y] = pts[i];
      const sang = v.mucNhan == null || v.mucNhan === i;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(u * 2.8).toFixed(1)}" style="fill:${sang ? 'var(--nhan)' : 'var(--theDam)'};stroke:var(--nhanSang);stroke-width:${(u * 0.3).toFixed(2)}"/>`;
      s += khoiChu(x, y - u * 1.6, String(i + 1), { co: u * 2.6, dam: 800, phong: f.nd, mau: sang ? 'var(--nhanChu)' : 'var(--nhanSang)' }).svg;
      const rong = Math.min(u * 24, (w / n) * 1.05);
      const k = khoiChu(x, y + u * 4, t.nhan, { co: u * 2.5 * f.co, dam: 800, phong: f.nd, mau: 'var(--nhanSang)', hoa: true, gian: 0.03, rong });
      s += k.svg;
      if (t.phu) s += khoiChu(x, y + u * 4.4 + k.cao, t.phu, { co: u * 1.95 * f.co, phong: f.nd, mau: 'var(--chuPhu)', rong }).svg;
    });
    el.innerHTML = bocSvg(w, h, s);
  }

  /* ---------------- ma trận 2x2 ---------------- */
  function maTran(el, v, u, f) {
    const w = el.clientWidth, h = el.clientHeight;
    const m = u * 6;
    const x0 = m, y0 = u * 2, W = w - m - u * 2, H = h - u * 2 - m;
    let s = '';
    const o = v.o || [];
    [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([c, r], i) => {
      const x = x0 + c * W / 2, y = y0 + r * H / 2;
      const sang = v.mucNhan === i;
      s += `<rect x="${(x + u * 0.5).toFixed(1)}" y="${(y + u * 0.5).toFixed(1)}" width="${(W / 2 - u).toFixed(1)}" height="${(H / 2 - u).toFixed(1)}" rx="${u}" style="fill:${sang ? 'color-mix(in srgb, var(--nhan) 30%, var(--theDam))' : 'var(--theDam)'};stroke:var(--vienThe);stroke-width:${(u * 0.15).toFixed(2)}"/>`;
      const q = o[i] || {};
      if (q.nhan) {
        const k = khoiChu(x + W / 4, y + H / 4 - u * 3, q.nhan, { co: u * 2.8 * f.co, dam: 800, phong: f.nd, mau: 'var(--nhanSang)', rong: W / 2 - u * 4 });
        s += k.svg;
        if (q.phu) s += khoiChu(x + W / 4, y + H / 4 - u * 2.6 + k.cao, q.phu, { co: u * 2 * f.co, phong: f.nd, mau: 'var(--chuPhu)', rong: W / 2 - u * 5 }).svg;
      }
    });
    s += `<line x1="${x0}" y1="${y0 + H}" x2="${x0 + W}" y2="${y0 + H}" style="stroke:var(--nhan);stroke-width:${(u * 0.25).toFixed(2)}"/>`;
    s += `<line x1="${x0}" y1="${y0 + H}" x2="${x0}" y2="${y0}" style="stroke:var(--nhan);stroke-width:${(u * 0.25).toFixed(2)}"/>`;
    const tn = v.trucNgang || [], td = v.trucDoc || [];
    if (tn[0]) s += khoiChu(x0, y0 + H + u * 1.2, tn[0], { co: u * 2 * f.co, phong: f.nd, mau: 'var(--chuPhu)', neo: 'start' }).svg;
    if (tn[1]) s += khoiChu(x0 + W, y0 + H + u * 1.2, tn[1] + ' →', { co: u * 2 * f.co, dam: 700, phong: f.nd, mau: 'var(--nhanSang)', neo: 'end' }).svg;
    if (td[1]) s += `<g transform="rotate(-90 ${x0 - u * 2.2} ${y0})">${khoiChu(x0 - u * 2.2, y0 - u * 1.6, '← ' + td[1], { co: u * 2 * f.co, dam: 700, phong: f.nd, mau: 'var(--nhanSang)', neo: 'end' }).svg}</g>`;
    if (td[0]) s += `<g transform="rotate(-90 ${x0 - u * 2.2} ${y0 + H})">${khoiChu(x0 - u * 2.2, y0 + H - u * 1.6, td[0], { co: u * 2 * f.co, phong: f.nd, mau: 'var(--chuPhu)', neo: 'start' }).svg}</g>`;
    el.innerHTML = bocSvg(w, h, s);
  }

  /* ---------------- thẻ lưới (HTML) ---------------- */
  function theLuoi(el, v, u, f) {
    const n = v.the.length;
    const cot = v.cot || (el.clientWidth / el.clientHeight > 1.6 ? Math.min(n, 4) : n === 4 ? 2 : Math.min(n, 3));
    let h = `<div class="sd-luoi" style="--cot:${cot}">`;
    v.the.forEach((t, i) => {
      const dau = t.bieuTuong ? `<i class="bt bt-${esc(t.bieuTuong)}"></i>` : `<span class="sd-so">${esc(t.so || String(i + 1).padStart(2, '0'))}</span>`;
      h += `<div class="sd-the${v.mucNhan === i ? ' nhan' : ''}">${dau}<div class="sd-nhan">${window.XUONG.dangChu(t.nhan || '')}</div>${t.phu ? `<div class="sd-phu">${window.XUONG.dangChu(t.phu)}</div>` : ''}</div>`;
    });
    el.innerHTML = h + '</div>';
  }

  /* ---------------- so sánh (HTML) ---------------- */
  function soSanh(el, v) {
    const cot = (c, lop) => `<div class="sd-cot ${lop}"><div class="sd-cot-nhan">${window.XUONG.dangChu(c.nhan || '')}</div><ul>${(c.muc || []).map((m) => `<li>${window.XUONG.dangChu(m)}</li>`).join('')}</ul></div>`;
    el.innerHTML = `<div class="sd-so-sanh">${cot(v.trai || {}, 'trai')}<div class="sd-mui"><i class="bt bt-mui-ten"></i></div>${cot(v.phai || {}, 'phai')}</div>`;
  }

  function anh(el, v, u, f, goi) {
    const src = /^(https?:|data:|\/)/.test(v.src) ? v.src : (v.src.startsWith('kho:') ? goi.duongDan.kho + v.src.slice(4) : goi.duongDan.duAn + v.src);
    el.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:contain" alt="">`;
  }

  const LOAI = { radar, chuoi, 'vong-lap': vongLap, tang, 'trung-tam': trungTam, 'hanh-trinh': hanhTrinh, 'ma-tran': maTran, 'the-luoi': theLuoi, 'so-sanh': soSanh, anh };

  window.XUONG_SO_DO = {
    loai: Object.keys(LOAI),
    ve(el, v, goi) {
      const fn = LOAI[v.loai];
      if (!fn) throw new Error(`không có loại sơ đồ "${v.loai}" (có: ${Object.keys(LOAI).join(', ')})`);
      const goc = el.closest('.canvas');
      const r = goc.getBoundingClientRect();
      const u = Math.min(r.width, r.height) / 100;
      el.dataset.loai = v.loai;
      fn(el, v, u, phong(el), goi);
    },
  };
})();
