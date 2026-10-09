/* trinh-chieu/ve.js - lớp vẽ một trang slide: chữ (đo trước, báo tràn), hình khối, đường, đường tự do, ảnh, biểu tượng.
 * Mọi toạ độ tính bằng inch trên khổ 13,333 x 7,5 (16:9 rộng của PowerPoint); cỡ chữ bằng pt.
 * Không bao giờ ghi giãn chữ (charSpacing): Google Slides vỡ chữ tiếng Việt có dấu (BAI-HOC, 09/10/2026).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const C = require('./chu');

const NGUONG_DOC = 14; // pt: dưới mức này khó đọc khi chiếu (chuan/09)

class Trang {
  constructor(pres, slide, ctx, bang, soTrang) {
    this.pres = pres;
    this.s = slide;
    this.ctx = ctx; // { fonts, phong: {td, nd}, canhBao: [], tam, kho, ngonNgu }
    this.b = bang;
    this.so = soTrang;
    this.soTieng = 0;
    this.coHinh = false;
  }

  canh(loai, id, chiTiet) {
    this.ctx.canhBao.push({ trang: this.so, loai, id, chiTiet });
  }

  mau(v) {
    if (!v) return this.b.chu('chu');
    if (/^[0-9A-F]{6}$/i.test(v)) return v.toUpperCase();
    if (v === 'nhanDoc') return this.b.nhanDoc;
    return this.b.chu(v);
  }

  mang(v) {
    if (!v) return undefined;
    if (typeof v === 'object') return v;
    if (/^[0-9A-F]{6}$/i.test(v)) return { color: v.toUpperCase() };
    return this.b.mang(v);
  }

  /** Hộp chữ. noiDung: chuỗi hoặc mảng đoạn. o: {x,y,w,h, phong:'td'|'nd', co, coMin, dam, nghieng, hoa, vai, vaiNhan,
   *  canh:'left'|'center'|'right', doc:'top'|'middle'|'bottom', gianDong, cachDoan (pt), dauDong, id, tuDong (h theo chữ)}
   *  Trả về {cao, co, soDong}. */
  chu(noiDung, o) {
    let ds = (Array.isArray(noiDung) ? noiDung : [noiDung]).filter((x) => x != null && String(x).trim() !== '').map(String);
    if (!ds.length) return { cao: 0, co: o.co, soDong: 0 };
    if (o.hoa) ds = ds.map((p) => p.toLocaleUpperCase(this.ctx.ngonNgu === 'en' ? 'en' : 'vi'));
    const phong = o.phong === 'td' ? this.ctx.phong.td : o.phong && o.phong !== 'nd' ? o.phong : this.ctx.phong.nd;
    const thut = o.dauDong ? Math.round(o.co * 1.15) : 0;
    const kieu = { phong, co: o.co, coMin: o.coMin, dam: o.dam, nghieng: o.nghieng, gianDong: o.gianDong || 1.3,
      cachDoan: o.cachDoan, dauDong: !!o.dauDong };
    const hMax = o.h == null ? 99 : o.h;
    const r = C.vua(ds, o.w * 0.955, hMax, { ...kieu, thut }, this.ctx.fonts);
    const id = o.id || C.tron(ds[0]).slice(0, 32);
    if (r.tran) this.canh('tran-chu', id, `chữ không vừa hộp ở cỡ tối thiểu ${r.co} pt (${r.soDong} dòng, cần ${r.cao.toFixed(2)} in, có ${hMax.toFixed(2)} in): rút gọn chữ hoặc tách slide`);
    if (r.co < (o.nguongDoc || NGUONG_DOC) - 0.01) this.canh('chu-nho', id, `chữ ${r.co} pt, dưới ngưỡng đọc khi chiếu ${o.nguongDoc || NGUONG_DOC} pt`);
    let cuoi = r.cuoi;
    if (o.phong === 'td' && cuoi !== 1 && r.soDong > 1) {
      // renderer có thể dàn rộng hơn phép đo thận trọng: thử thêm ở đúng bề rộng hộp
      const r2 = C.vua(ds, o.w, hMax, { ...kieu, co: r.co, coMin: r.co, thut }, this.ctx.fonts);
      if (r2.cuoi === 1) cuoi = 1;
    }
    if (o.phong === 'td' && cuoi === 1 && r.soDong <= 3) this.canh('mo-coi', id, 'dòng cuối chỉ còn một chữ (mồ côi): ngắt dòng theo nghĩa bằng \\n hoặc nối cụm bằng ~');
    if (!o.khongDem) this.soTieng += ds.reduce((t, p) => t + C.soTieng(p), 0);
    const mau = this.mau(o.vai || 'chu');
    const mauNhan = this.mau(o.vaiNhan || 'nhanDoc');
    if (this.b.tuongPhan(mau, o.nenDuoi || this.nenTrang) < (r.co >= 18 || (o.dam && r.co >= 14) ? 3 : 4.5)) {
      this.canh('tuong-phan', id, `chữ màu ${mau} trên nền ${o.nenDuoi || this.nenTrang} tương phản thấp`);
    }
    const lh = r.co * (o.gianDong || 1.3);
    const runs = [];
    ds.forEach((p, i) => {
      const doan = C.tachDoan(p);
      doan.forEach((d, j) => {
        const op = {
          bold: !!(o.dam || d.dam), italic: !!(o.nghieng || d.nghieng), color: d.nhan ? mauNhan : mau,
          lineSpacing: Math.round(lh * 10) / 10, paraSpaceAfter: i < ds.length - 1 ? (o.cachDoan == null ? Math.round(r.co * 0.45) : o.cachDoan) : 0,
          align: o.canh || 'left',
        };
        if (j === doan.length - 1 && i < ds.length - 1) op.breakLine = true;
        if (o.dauDong && j === 0) op.bullet = { code: o.kyHieu || '2022', indent: thut };
        runs.push({ text: d.t.replace(/~/g, ' '), options: op });
      });
    });
    const cao = o.h == null || o.tuDong ? Math.max(r.cao + 0.04, (lh / 72) * 0.98) : o.h;
    this.s.addText(runs, {
      x: o.x, y: o.y, w: o.w, h: cao, fontFace: phong, fontSize: r.co, color: mau,
      margin: 0, valign: o.doc || 'top', align: o.canh || 'left', fit: 'none', wrap: true,
      lang: this.ctx.ngonNgu === 'en' ? 'en-US' : 'vi-VN', lineSpacing: Math.round(lh * 10) / 10,
    });
    return { cao: o.h == null || o.tuDong ? cao : r.cao, coThat: o.h, co: r.co, soDong: r.soDong, dai: r.dai };
  }

  /** Đo trước (không vẽ) để bố cục. */
  do(noiDung, o) {
    let ds = (Array.isArray(noiDung) ? noiDung : [noiDung]).filter((x) => x != null && String(x).trim() !== '').map(String);
    if (!ds.length) return { cao: 0, co: o.co, soDong: 0, dai: 0 };
    if (o.hoa) ds = ds.map((p) => p.toLocaleUpperCase('vi'));
    const phong = o.phong === 'td' ? this.ctx.phong.td : o.phong && o.phong !== 'nd' ? o.phong : this.ctx.phong.nd;
    const thut = o.dauDong ? Math.round(o.co * 1.15) : 0;
    return C.vua(ds, o.w * 0.955, o.h == null ? 99 : o.h, { phong, co: o.co, coMin: o.coMin, dam: o.dam, nghieng: o.nghieng,
      gianDong: o.gianDong || 1.3, cachDoan: o.cachDoan, dauDong: !!o.dauDong, thut }, this.ctx.fonts);
  }

  /** Hình khối có sẵn. loai: 'rect' | 'roundRect' | 'ellipse' | 'diamond' | 'triangle' | ... (tên ShapeType của PptxGenJS) */
  hinh(loai, o) {
    const op = { x: o.x, y: o.y, w: o.w, h: o.h };
    const to = this.mang(o.to);
    op.fill = to ? { color: to.color, transparency: to.transparency || 0 } : { type: 'none' };
    if (o.vien) op.line = { color: this.mau(o.vien), width: o.net || 1, dashType: o.netDut ? 'dash' : 'solid' };
    else op.line = { type: 'none' };
    if (o.bo != null) op.rectRadius = o.bo;
    if (o.xoay) op.rotate = o.xoay;
    if (o.angleRange) op.angleRange = o.angleRange;
    if (o.arcThicknessRatio) op.arcThicknessRatio = o.arcThicknessRatio;
    this.s.addShape(this.pres.shapes[TEN_HINH[loai] || loai], op);
  }

  duong(x1, y1, x2, y2, o = {}) {
    const x = Math.min(x1, x2), y = Math.min(y1, y2);
    const op = {
      x, y, w: Math.max(Math.abs(x2 - x1), 0.0001), h: Math.max(Math.abs(y2 - y1), 0.0001),
      line: { color: this.mau(o.vai || 'vach'), width: o.net || 1, dashType: o.netDut ? 'dash' : 'solid',
        transparency: o.trongSuot || 0 },
    };
    if ((x2 < x1) !== (y2 < y1) && Math.abs(x2 - x1) > 1e-4 && Math.abs(y2 - y1) > 1e-4) op.flipV = true;
    if (o.muiTen) op.line[x2 < x1 || (x2 === x1 && y2 < y1) ? 'beginArrowType' : 'endArrowType'] = 'triangle';
    if (o.muiTenDau) op.line.beginArrowType = 'triangle';
    this.s.addShape(this.pres.shapes.LINE, op);
  }

  /** Đường tự do qua các điểm (inch tuyệt đối). dong: true thì khép kín và tô. */
  tuDo(diem, o = {}) {
    const xs = diem.map((p) => p[0]), ys = diem.map((p) => p[1]);
    const x0 = Math.min(...xs), y0 = Math.min(...ys);
    const w = Math.max(Math.max(...xs) - x0, 0.01), h = Math.max(Math.max(...ys) - y0, 0.01);
    const points = diem.map((p, i) => (i === 0 ? { x: p[0] - x0, y: p[1] - y0, moveTo: true } : { x: p[0] - x0, y: p[1] - y0 }));
    if (o.dong) points.push({ close: true });
    const to = o.dong ? this.mang(o.to) : null;
    const op = { x: x0, y: y0, w, h, points,
      fill: to ? { color: to.color, transparency: to.transparency || 0 } : { type: 'none' },
      line: o.vien === false ? { type: 'none' } : { color: this.mau(o.vien || o.vai || 'vach'), width: o.net || 1, dashType: o.netDut ? 'dash' : 'solid' } };
    if (o.muiTen && op.line.color) op.line.endArrowType = 'triangle';
    this.s.addShape(this.pres.shapes.CUSTOM_GEOMETRY, op);
  }

  anh(tep, o) {
    if (!tep || !fs.existsSync(tep)) { this.canh('anh', o.id || String(tep), `không tìm thấy ảnh ${tep}`); return; }
    this.coHinh = true;
    const op = { path: tep, x: o.x, y: o.y, w: o.w, h: o.h };
    if (o.trongSuot) op.transparency = o.trongSuot;
    if (o.altText) op.altText = o.altText;
    this.s.addImage(op);
  }
}

const TEN_HINH = {
  rect: 'RECTANGLE', roundRect: 'ROUNDED_RECTANGLE', ellipse: 'OVAL', diamond: 'DIAMOND', triangle: 'ISOSCELES_TRIANGLE',
  arc: 'ARC', blockArc: 'BLOCK_ARC', donut: 'DONUT', chevron: 'CHEVRON', homePlate: 'PENTAGON', trapezoid: 'TRAPEZOID',
};

/** Biểu tượng nét của xưởng (he-thong/bieu-tuong.css) ra PNG theo màu, cache ở thư mục tạm. */
let _bt = null;
function dsBieuTuong(goc) {
  if (_bt) return _bt;
  _bt = {};
  const css = fs.readFileSync(path.join(goc, 'he-thong', 'bieu-tuong.css'), 'utf8');
  for (const m of css.matchAll(/\.bt-([a-z0-9-]+)\s*\{\s*--bt:\s*url\("data:image\/svg\+xml,([^"]+)"\)/g)) {
    _bt[m[1]] = decodeURIComponent(m[2]);
  }
  return _bt;
}

async function bieuTuongPng(goc, tam, ten, mauHex, px = 256) {
  const ds = dsBieuTuong(goc);
  if (!ds[ten]) return null;
  const ra = path.join(tam, `bt-${ten}-${mauHex}.png`);
  if (fs.existsSync(ra)) return ra;
  const sharp = require('sharp');
  let svg = ds[ten].replace(/stroke="#000"/g, `stroke="#${mauHex}"`).replace(/fill="#000"/g, `fill="#${mauHex}"`);
  svg = svg.replace('<svg ', `<svg width="${px}" height="${px}" `);
  await sharp(Buffer.from(svg), { density: 300 }).resize(px, px).png().toFile(ra);
  return ra;
}

module.exports = { Trang, dsBieuTuong, bieuTuongPng, NGUONG_DOC };
