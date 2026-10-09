#!/usr/bin/env node
/* trinh-chieu/dung.js - dựng file PPTX từ một gói đã chuẩn bị bởi tools/slide.py (đừng gọi tay).
 *   node trinh-chieu/dung.js <goi.json>
 * Gói: { deck, ra, baoCao, kho, fonts, tam, ngonNgu, chuDe: {sang, toi}, thuongHieu }
 * Ghi PPTX và báo cáo JSON (cảnh báo theo trang, số tiếng mỗi trang).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');
const { bangMau } = require('./mau');
const { Trang } = require('./ve');
const { KIEU, TOI_MAC } = require('./bo-cuc');

// định mức số tiếng trên một slide [lý tưởng, trần] theo nhóm kiểu (chuan/09 mục 3)
const DINH_MUC = {
  mac: [30, 50], 'so-do': [45, 75], 'bieu-do': [30, 50],
  bia: [25, 45], 'chuyen-phan': [20, 35], ket: [30, 50], 'trich-dan': [35, 55], 'cau-hoi': [30, 55], 'so-lon': [25, 45], 'muc-luc': [35, 60],
};

async function main() {
  const goi = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const deck = goi.deck;
  fs.mkdirSync(goi.tam, { recursive: true });
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.title = deck.tieuDe || '';
  pres.author = deck.tacGia || '';
  pres.company = deck.donVi || '';
  pres.theme = { headFontFace: goi.chuDe.sang.phong.tieuDe, bodyFontFace: goi.chuDe.sang.phong.noiDung, lang: goi.ngonNgu === 'en' ? 'en-US' : 'vi-VN' };
  const canhBao = [];
  const trang = [];
  let so = 0;
  for (const s of deck.slide || []) {
    if (s.an) continue;
    so += 1;
    const kieu = s.kieu || 'y-chinh';
    const fn = KIEU[kieu];
    const toi = s.nen ? s.nen === 'toi' : TOI_MAC.has(kieu);
    const chuDeTrang = toi ? goi.chuDe.toi : goi.chuDe.sang;
    const bang = bangMau(chuDeTrang);
    const slide = pres.addSlide();
    slide.background = { color: bang.nen };
    const ctx = {
      fonts: goi.fonts, kho: goi.kho, tam: goi.tam, ngonNgu: goi.ngonNgu, canhBao, thuongHieu: goi.thuongHieu, chuDeTrang,
      phong: { td: chuDeTrang.phong.tieuDe, nd: chuDeTrang.phong.noiDung },
    };
    const t = new Trang(pres, slide, ctx, bang, so);
    t.nenTrang = bang.nen;
    if (!fn) { t.canh('kieu', kieu, `không có kiểu slide "${kieu}" (có: ${Object.keys(KIEU).join(', ')})`); continue; }
    try {
      await fn(t, s, deck, ctx);
    } catch (e) {
      t.canh('loi-js', kieu, String(e && e.stack ? e.stack.split('\n').slice(0, 3).join(' | ') : e));
    }
    if (s.ghiChu) slide.addNotes(Array.isArray(s.ghiChu) ? s.ghiChu.join('\n') : String(s.ghiChu));
    const nhom = DINH_MUC[kieu] ? kieu : (kieu === 'the' ? 'so-do' : 'mac');
    const [lt, tran] = DINH_MUC[nhom];
    const heSo = kieu === 'y-chinh' && s.hinh && s.hinh.soDo ? 1.5 : 1;
    if (t.soTieng > tran * heSo) {
      t.canh('nhieu-chu', 'trang', `${t.soTieng} tiếng trên slide, quá trần ${Math.round(tran * heSo)} (nên khoảng ${Math.round(lt * heSo)}): tách slide, chuyển lời giảng vào ghi chú người nói (ghiChu)`);
    }
    if (!t.coHinh && !s.chuOnly) {
      t.canh('thieu-hinh', 'trang', 'slide chỉ có chữ: thêm một yếu tố hình mang nghĩa (hinh.soDo, hinh.bieuTuong, hinh.so) hoặc đổi kiểu slide; chủ ý chỉ chữ thì đặt "chuOnly": true');
    }
    trang.push({ so, kieu, toi, soTieng: t.soTieng, tieuDe: s.tieuDe || s.cauHoi || s.loi || '' });
  }
  fs.mkdirSync(path.dirname(goi.ra), { recursive: true });
  await pres.writeFile({ fileName: goi.ra });
  fs.writeFileSync(goi.baoCao, JSON.stringify({ soSlide: so, canhBao, trang }, null, 1));
}

main().catch((e) => { console.error(e); process.exit(1); });
