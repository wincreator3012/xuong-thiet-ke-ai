/* he-thong/khung.js - lõi dựng ấn phẩm từ khuôn HTML + file ấn phẩm JSON.
 *
 * Một khuôn (khuon/<id>/khuon.html) chỉ mô tả CẤU TRÚC và BỐ CỤC theo nhóm thể thức; nội dung, thương hiệu,
 * kích thước, chỉnh tay đều đến từ "gói" do tools/ve.py (hoặc Bàn thiết kế) truyền vào XUONG.dung(goi).
 *
 *   goi = {
 *     spec:      nội dung file ấn phẩm (thiet-ke/<ten>.json),
 *     tt:        id thể thức đang dựng (vd 'ig-4x5'),
 *     theThuc:   mục tương ứng trong chuan/kho-the-thuc.json (đã giải),
 *     chuDe:     mục trong brand.json > chuDe (đã trộn mauRieng của ấn phẩm),
 *     thuongHieu:mục trong brand.json > thuongHieu (kèm id),
 *     tatCaThuongHieu: brand.json > thuongHieu (để giải logo đồng thương hiệu 'mau:nenToi'),
 *     duongDan:  { logo, duAn, kho } URL thư mục (kết thúc bằng '/'); ảnh 'kho:đường/dẫn' lấy từ repo,
 *     cheDo:     'xuat' | 'ban'   ('ban' = Bàn thiết kế: giữ phần tử trống để còn bấm vào sửa)
 *   }
 *
 * Quy ước trong khuôn:
 *   data-o="khoa"        ô nội dung: chữ (có cú pháp nhỏ), ảnh (<img>), hoặc nền (data-o-nen)
 *   data-lap="khoa"      lặp phần tử con đầu tiên cho từng mục của mảng spec.noiDung[khoa]
 *   data-logo="tu-dong"  logo theo độ sáng nền; hoặc tên khoá logo (nenSang, nenToi, trien...)
 *   data-vua="N"         co chữ cho vừa tối đa N dòng (data-vua-min = tỉ lệ nhỏ nhất, mặc định 0.6)
 *   data-id="ten"        phần tử không mang nội dung nhưng người dùng muốn kéo thả được trên Bàn thiết kế
 *   data-giu             giữ phần tử dù nội dung trống
 *   data-rut-gon["=nhóm"] phần phụ tự ẩn ở nhóm thể thức chật (mặc định "doc": story 9:16); spec.rutGon=false để tắt,
 *                        theoNhom.<nhóm>.hien để hiện lại; chữ ngắn riêng cho nhóm đó viết ở theoNhom.<nhóm>.noiDung
 *   data-o-bt="khoa"    biểu tượng nét theo tên (he-thong/bieu-tuong.css), data-o-lich: lịch tháng {thang, nam, ngayNhan[]}
 *   data-o-so-do="khoa"  sơ đồ tri thức vẽ bằng minh-hoa/so-do.js (khuôn phải nạp file đó)
 * Cú pháp chữ: *nghiêng nhấn*  **đậm nhấn**  ==tô màu nhấn==  ^chỉ số trên^  ~ (khoảng trắng không ngắt)  \n (xuống dòng)
 */
(function () {
  'use strict';
  const MM = 96 / 25.4;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function dangChu(s) {
    let h = esc(String(s).normalize('NFC'));
    h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    h = h.replace(/\*(.+?)\*/g, '<em>$1</em>');
    h = h.replace(/==(.+?)==/g, '<mark>$1</mark>');
    h = h.replace(/\^(.+?)\^/g, '<sup>$1</sup>');
    h = h.replace(/~/g, '&nbsp;');
    h = h.replace(/\n/g, '<br>');
    return h;
  }
  function laTrong(v) {
    return v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
  }

  /* ---------- hình học thể thức ---------- */
  function hinhHoc(tt) {
    const an = tt.an || { tren: 0, duoi: 0, trai: 0, phai: 0 };
    if (tt.loai === 'in') {
      const s = tt.tiLeThietKe || 1;
      const k = MM / s;
      const tra = (tt.traMm || 0) * k;
      const Wt = tt.wMm * k, Ht = tt.hMm * k;
      return {
        W: Wt + 2 * tra, H: Ht + 2 * tra, tra, Wt, Ht, donVi: 'mm', s,
        an: { t: tra + an.tren * k, b: tra + an.duoi * k, l: tra + an.trai * k, r: tra + an.phai * k },
        doi: (v) => v * k, // mm thành phẩm -> px khung
      };
    }
    return {
      W: tt.w, H: tt.h, tra: 0, Wt: tt.w, Ht: tt.h, donVi: 'px', s: 1,
      an: { t: an.tren, b: an.duoi, l: an.trai, r: an.phai },
      doi: (v) => v,
    };
  }

  /* ---------- áp chủ đề ---------- */
  function apChuDe(c, chuDe) {
    const m = chuDe.mau || {};
    for (const [k, v] of Object.entries(m)) c.style.setProperty('--' + k, v);
    const p = chuDe.phong || {};
    if (p.tieuDe) c.style.setProperty('--phong-tieu-de', `"${p.tieuDe}"`);
    if (p.noiDung) c.style.setProperty('--phong-noi-dung', `"${p.noiDung}"`);
    if (p.kicker) c.style.setProperty('--phong-kicker', `"${p.kicker}"`);
    c.dataset.toi = chuDe.toi ? '1' : '0';
    (chuDe.hoaTiet || []).forEach((h) => c.classList.add('ht-' + h));
  }

  /* ---------- giải đường dẫn ảnh ---------- */
  function urlAnh(goi, src) {
    if (!src) return '';
    if (/^(https?:|data:|file:|blob:|\/)/.test(src)) return src;
    if (src.startsWith('kho:')) return (goi.duongDan.kho || '') + src.slice(4).split('/').map(encodeURIComponent).join('/');
    return (goi.duongDan.duAn || '') + src.split('/').map(encodeURIComponent).join('/');
  }
  function urlLogo(goi, khoa, el) {
    let th = goi.thuongHieu, k = khoa;
    if (khoa && khoa.includes(':')) {
      const [idTh, kk] = khoa.split(':');
      th = (goi.tatCaThuongHieu || {})[idTh] || th; k = kk;
    }
    const logo = (th && th.logo) || {};
    const toi = goi.chuDe && goi.chuDe.toi;
    let ten;
    if (!k || k === 'tu-dong') ten = toi ? (logo.nenToi || logo.nenSang) : (logo.nenSang || logo.nenToi);
    else if (k === 'bieu-tuong') ten = toi ? (logo.bieuTuongToi || logo.bieuTuongSang) : (logo.bieuTuongSang || logo.bieuTuongToi);
    else ten = logo[k];
    if (!ten) return '';
    return (goi.duongDan.logo || '') + encodeURIComponent(ten);
  }

  /* ---------- điền nội dung ---------- */
  function dienPhanTu(el, val, goi) {
    const giu = el.hasAttribute('data-giu') || goi.cheDo === 'ban';
    if (el.tagName === 'IMG') {
      const o = typeof val === 'string' ? { src: val } : (val || {});
      if (!o.src) { if (!giu) el.classList.add('an'); else el.removeAttribute('src'); return; }
      el.src = urlAnh(goi, o.src);
      const td = o.tieuDiem || [0.5, 0.35];
      el.style.objectPosition = `${td[0] * 100}% ${td[1] * 100}%`;
      if (o.phong) el.style.setProperty('--phong-anh', o.phong);
      if (o.lat) el.style.setProperty('--lat', '-1');
      el.classList.remove('an');
      return;
    }
    if (el.hasAttribute('data-o-bt')) {
      [...el.classList].filter((c) => c.startsWith('bt-')).forEach((c) => el.classList.remove(c));
      if (laTrong(val)) { if (!giu) el.classList.add('an'); return; }
      el.classList.add('bt', 'bt-' + val); el.classList.remove('an');
      return;
    }
    if (el.hasAttribute('data-o-lich')) {
      if (laTrong(val)) { if (!giu) el.classList.add('an'); return; }
      veLich(el, val); el.classList.remove('an');
      return;
    }
    if (el.hasAttribute('data-o-nen')) {
      const o = typeof val === 'string' ? { src: val } : (val || {});
      if (!o.src) { if (!giu) el.classList.add('an'); return; }
      el.style.backgroundImage = `url("${urlAnh(goi, o.src)}")`;
      const td = o.tieuDiem || [0.5, 0.35];
      el.style.backgroundPosition = `${td[0] * 100}% ${td[1] * 100}%`;
      el.classList.remove('an');
      return;
    }
    if (laTrong(val)) {
      if (!giu) el.classList.add('an');
      el.innerHTML = '';
      return;
    }
    el.classList.remove('an');
    el.innerHTML = dangChu(val);
  }

  const CHON_O = '[data-o], [data-o-nen], [data-o-bt], [data-o-lich]';
  const khoaO = (el) => el.dataset.o || el.dataset.oNen || el.dataset.oBt || el.dataset.oLich;
  function dien(goc, du, goi) {
    // lặp trước (để các data-o bên trong mục lặp lấy dữ liệu của mục)
    goc.querySelectorAll('[data-lap]').forEach((ds) => {
      if (ds.closest('[data-lap-mau]')) return;
      const khoa = ds.dataset.lap;
      const mau = ds.querySelector(':scope > [data-lap-mau]') || ds.firstElementChild;
      if (!mau) return;
      mau.setAttribute('data-lap-mau', '');
      mau.classList.add('an-mau');
      ds.querySelectorAll(':scope > .muc-lap').forEach((x) => x.remove());
      const ds2 = du[khoa];
      if (laTrong(ds2)) { if (!ds.hasAttribute('data-giu')) ds.classList.add('an'); return; }
      ds.classList.remove('an');
      ds.dataset.soMuc = String(ds2.length);
      ds2.forEach((muc, i) => {
        const b = mau.cloneNode(true);
        b.removeAttribute('data-lap-mau');
        b.classList.remove('an-mau');
        b.classList.add('muc-lap');
        b.dataset.chiSo = String(i + 1);
        const m = typeof muc === 'object' && muc !== null ? muc : { chu: muc };
        m.stt = m.stt || String(i + 1).padStart(2, '0');
        b.querySelectorAll(CHON_O).forEach((el) => {
          const k = khoaO(el);
          el.dataset.oDay = `${khoa}.${i}.${k}`;
          dienPhanTu(el, m[k], goi);
        });
        if (b.hasAttribute('data-o')) dienPhanTu(b, m[b.dataset.o], goi);
        [...(b.hasAttribute('data-logo') ? [b] : []), ...b.querySelectorAll('[data-logo]')].forEach((el) => {
          const u = urlLogo(goi, m[el.dataset.logo] || el.dataset.logo, el);
          if (u) el.src = u; else el.classList.add('an');
        });
        ds.appendChild(b);
      });
    });
    goc.querySelectorAll(CHON_O).forEach((el) => {
      if (el.closest('[data-lap-mau]') || el.closest('.muc-lap')) return;
      const k = khoaO(el);
      el.dataset.oDay = k;
      dienPhanTu(el, du[k], goi);
    });
    goc.querySelectorAll('[data-logo]').forEach((el) => {
      if (el.closest('[data-lap-mau]') || el.closest('.muc-lap')) return;
      const u = urlLogo(goi, el.dataset.logo, el);
      if (u) { el.src = u; el.classList.remove('an'); } else el.classList.add('an');
    });
  }

  /* ---------- lịch tháng (tuần bắt đầu thứ Hai) ---------- */
  function veLich(el, v) {
    const thang = v.thang, nam = v.nam;
    const nhan = new Set(v.ngayNhan || []);
    const phu = new Set(v.ngayPhu || []);
    const dau = new Date(nam, thang - 1, 1);
    const soNgay = new Date(nam, thang, 0).getDate();
    const lech = (dau.getDay() + 6) % 7;
    const thu = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    let h = `<div class="lich-dau"><span class="lich-thang">Tháng ${thang}</span><span class="lich-nam">${nam}</span></div><div class="lich-luoi">`;
    thu.forEach((t, i) => { h += `<span class="lich-thu${i === 6 ? ' cn' : ''}">${t}</span>`; });
    for (let i = 0; i < lech; i++) h += '<span class="lich-o trong"></span>';
    for (let d = 1; d <= soNgay; d++) {
      const cot = (lech + d - 1) % 7;
      h += `<span class="lich-o${cot === 6 ? ' cn' : ''}${nhan.has(d) ? ' nhan' : ''}${phu.has(d) ? ' phu' : ''}">${d}</span>`;
    }
    h += '</div>';
    el.innerHTML = h;
  }

  /* ---------- chỉnh theo nhóm, thể thức, chỉnh tay ---------- */
  function timPhanTu(goc, id) {
    if (id.startsWith('logo:')) return goc.querySelector(`[data-logo="${id.slice(5)}"]`);
    return goc.querySelector(`[data-o="${id}"]`) || goc.querySelector(`[data-id="${id}"]`) ||
      goc.querySelector(`[data-o-day="${id}"]`);
  }
  function apChinh(goc, chinh) {
    if (!chinh) return;
    (chinh.lop || '').split(/\s+/).filter(Boolean).forEach((l) => goc.classList.add(l));
    (chinh.an || []).forEach((id) => { const el = timPhanTu(goc, id); if (el) el.classList.add('an', 'an-chu-y'); });
    (chinh.hien || []).forEach((id) => { const el = timPhanTu(goc, id); if (el) el.classList.remove('an', 'an-chu-y'); });
    for (const [id, css] of Object.entries(chinh.css || {})) {
      const el = id === 'canvas' ? goc : timPhanTu(goc, id);
      if (!el) continue;
      for (const [k, v] of Object.entries(css)) el.style.setProperty(k, v);
    }
  }
  function apChinhTay(goc, ds) {
    if (!ds) return;
    for (const [id, t] of Object.entries(ds)) {
      const el = timPhanTu(goc, id);
      if (!el) continue;
      el.classList.add('da-chinh-tay');
      if (t.w != null) el.style.width = t.w + 'px';
      if (t.h != null) el.style.height = t.h + 'px';
      const tr = [];
      if (t.dx || t.dy) tr.push(`translate(${t.dx || 0}px, ${t.dy || 0}px)`);
      if (t.rot) tr.push(`rotate(${t.rot}deg)`);
      el.style.transform = tr.join(' ');
      if (t.coChu) el.style.fontSize = t.coChu + 'px';
    }
  }

  /* ---------- chờ phông và ảnh ---------- */
  async function choPhong(goc) {
    const viec = new Map();
    goc.querySelectorAll('*').forEach((el) => {
      if (el.classList.contains('an') || !el.childNodes.length) return;
      let chu = '';
      el.childNodes.forEach((n) => { if (n.nodeType === 3) chu += n.textContent; });
      if (!chu.trim()) return;
      const cs = getComputedStyle(el);
      const fam = cs.fontFamily.split(',')[0].trim();
      const k = `${cs.fontStyle} ${cs.fontWeight} 16px ${fam}`;
      viec.set(k, (viec.get(k) || '') + chu);
    });
    await Promise.all([...viec.entries()].map(([k, chu]) => document.fonts.load(k, chu).catch(() => null)));
    await document.fonts.ready;
  }
  async function choAnh(goc) {
    const ds = [...goc.querySelectorAll('img')].filter((i) => i.src && !i.classList.contains('an'));
    await Promise.all(ds.map((i) => (i.complete ? Promise.resolve() : new Promise((r) => { i.onload = r; i.onerror = r; }))
      .then(() => (i.decode ? i.decode().catch(() => null) : null))));
    // ảnh nền CSS
    const nen = [...goc.querySelectorAll('[data-o-nen]')].map((el) => el.style.backgroundImage).filter(Boolean);
    await Promise.all(nen.map((b) => new Promise((r) => {
      const m = /url\("?(.*?)"?\)/.exec(b); if (!m) return r();
      const im = new Image(); im.onload = r; im.onerror = r; im.src = m[1];
    })));
  }
  const hoanTat = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  /* ---------- co chữ ---------- */
  function soDong(el) {
    const cs = getComputedStyle(el);
    const fs = parseFloat(cs.fontSize);
    let lh = parseFloat(cs.lineHeight);
    if (isNaN(lh)) lh = fs * 1.2;
    return { dong: Math.round(el.scrollHeight / lh), lh, fs };
  }
  function vuaChu(el, canhBao) {
    const n = parseInt(el.dataset.vua, 10);
    if (!n) return;
    el.style.fontSize = '';
    const cs = getComputedStyle(el);
    const goc = parseFloat(cs.fontSize);
    const tiLeLh = (parseFloat(cs.lineHeight) || goc * 1.2) / goc;
    const min = goc * (parseFloat(el.dataset.vuaMin) || 0.6);
    const vua = (px) => {
      el.style.fontSize = px + 'px';
      return el.scrollHeight <= n * px * tiLeLh + px * 0.35 && el.scrollWidth <= el.clientWidth + 1;
    };
    if (vua(goc)) { el.style.fontSize = ''; return; }
    let lo = min, hi = goc, tot = min;
    for (let i = 0; i < 14; i++) { const g = (lo + hi) / 2; if (vua(g)) { tot = g; lo = g; } else hi = g; }
    el.style.fontSize = tot + 'px';
    if (!vua(tot)) canhBao.push({ loai: 'tran-chu', id: el.dataset.oDay || el.dataset.id, chiTiet: `đã co tới mức tối thiểu ${Math.round(min)} px mà vẫn quá ${n} dòng: rút gọn chữ` });
    else if (tot <= min * 1.02) canhBao.push({ loai: 'co-chu-nhieu', id: el.dataset.oDay || el.dataset.id, chiTiet: `phải co chữ tới mức tối thiểu (${Math.round(tot)} px so với ${Math.round(goc)} px thiết kế)` });
  }
  function vuaVung(goc, canhBao) {
    // co toàn bộ chữ (biến --co) khi vùng nội dung tràn
    const vungs = [...goc.querySelectorAll('.vung, [data-vua-vung]')].filter((v) => !v.classList.contains('an'));
    let co = 1;
    const tran = () => vungs.some((v) => v.scrollHeight > v.clientHeight + 2 || v.scrollWidth > v.clientWidth + 2);
    goc.style.setProperty('--co', '1');
    while (tran() && co > 0.72) {
      co = Math.round((co - 0.03) * 100) / 100;
      goc.style.setProperty('--co', String(co));
    }
    if (co < 1) canhBao.push({ loai: tran() ? 'tran-vung' : 'co-toan-bo', id: 'vung', chiTiet: tran() ? 'nội dung vẫn tràn vùng sau khi co 28%: cắt bớt chữ hoặc đổi bố cục' : `đã co toàn bộ chữ còn ${Math.round(co * 100)}%` });
    return co;
  }

  /* ---------- kiểm sau khi dựng ---------- */
  function kiem(goc, hh, tt, canhBao) {
    const rc = goc.getBoundingClientRect();
    const an = { l: hh.an.l, t: hh.an.t, r: hh.W - hh.an.r, b: hh.H - hh.an.b };
    const vungTrong = (tt.vungTrong || []).map((v) => ({
      ten: v.ten, l: hh.tra + hh.doi(v.x), t: hh.tra + hh.doi(v.y), r: hh.tra + hh.doi(v.x + v.w), b: hh.tra + hh.doi(v.y + v.h),
    }));
    const chuBlocks = [];
    const ngan = Math.min(hh.Wt, hh.Ht);
    const nguongPx = tt.loai === 'in' ? null : ngan * 0.022;
    goc.querySelectorAll('[data-o], [data-o-nen], [data-o-bt], [data-id], [data-logo]').forEach((el) => {
      if (el.closest('[data-lap-mau]') || el.closest('.an') || el.closest('.trang-tri')) return;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      const b = { l: r.left - rc.left, t: r.top - rc.top, r: r.right - rc.left, b: r.bottom - rc.top };
      const id = el.dataset.oDay || el.dataset.id || ('logo:' + el.dataset.logo);
      const laNen = el.classList.contains('lop-nen') || el.hasAttribute('data-o-nen') || el.classList.contains('tran-mep') || el.classList.contains('trang-tri');
      if (!laNen && (b.l < an.l - 1 || b.t < an.t - 1 || b.r > an.r + 1 || b.b > an.b + 1)) {
        canhBao.push({ loai: 'lan-vung-an-toan', id, chiTiet: `hộp [${Math.round(b.l)},${Math.round(b.t)} - ${Math.round(b.r)},${Math.round(b.b)}] vượt vùng an toàn [${Math.round(an.l)},${Math.round(an.t)} - ${Math.round(an.r)},${Math.round(an.b)}]` });
      }
      if (!laNen) vungTrong.forEach((v) => {
        if (b.l < v.r && b.r > v.l && b.t < v.b && b.b > v.t) canhBao.push({ loai: 'de-vung-trong', id, chiTiet: `đè lên vùng phải để trống: ${v.ten}` });
      });
      let chuRieng = '';
      el.childNodes.forEach((n) => { if (n.nodeType === 3 || (n.nodeType === 1 && /^(EM|STRONG|MARK|SUP|BR|SPAN)$/.test(n.tagName) && !n.hasAttribute('data-o'))) chuRieng += n.textContent; });
      if (el.tagName !== 'IMG' && chuRieng.trim()) {
        const cs = getComputedStyle(el);
        const fs = parseFloat(cs.fontSize);
        const laGradient = cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text';
        chuBlocks.push({ id, hop: [b.l, b.t, b.r - b.l, b.b - b.t], mau: cs.color, coPx: fs, dam: parseInt(cs.fontWeight, 10) >= 600, gradient: laGradient, chu: el.textContent.trim().slice(0, 80) });
        if (nguongPx && fs < nguongPx) canhBao.push({ loai: 'chu-nho', id, chiTiet: `cỡ ${fs.toFixed(1)} px dưới ngưỡng đọc trên điện thoại (khoảng ${nguongPx.toFixed(0)} px ở khung này)` });
        if (tt.loai === 'in' && (hh.s || 1) === 1) {
          const pt = fs * 0.75;
          if (pt < 7) canhBao.push({ loai: 'chu-nho', id, chiTiet: `cỡ ${pt.toFixed(1)} pt dưới 7 pt (chữ Việt có dấu nên từ 7 pt trở lên)` });
        }
        if (/—/.test(el.textContent)) canhBao.push({ loai: 'gach-dai', id, chiTiet: 'có gạch dài (—): đổi thành gạch ngang thường hoặc dấu hai chấm' });
      }
    });
    return chuBlocks;
  }

  function hopPhanTu(goc) {
    const rc = goc.getBoundingClientRect();
    const ds = [];
    goc.querySelectorAll('[data-o], [data-id], [data-logo]').forEach((el) => {
      if (el.closest('[data-lap-mau]')) return;
      const r = el.getBoundingClientRect();
      ds.push({ id: el.dataset.oDay || el.dataset.id || ('logo:' + el.dataset.logo), an: el.classList.contains('an') || !!el.closest('.an'), hop: [r.left - rc.left, r.top - rc.top, r.width, r.height] });
    });
    return ds;
  }

  /* ---------- hoạ tiết vẽ bằng code ---------- */
  function hatNgauNhien(seed) {
    let s = seed >>> 0;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function veNui(el, W, H, seed) {
    // dãy núi xa nhiều lớp (đường sống núi dịch điểm giữa), mờ dần lên trên; cùng hạt cho cùng kết quả
    const rnd = hatNgauNhien(seed || 7);
    const lop = 4;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" width="100%" height="100%"><defs>`;
    for (let i = 0; i < lop; i++) {
      svg += `<linearGradient id="n${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--nui-dinh);stop-opacity:${(0.16 + i * 0.1).toFixed(2)}"/><stop offset="0.75" style="stop-color:var(--nui-chan);stop-opacity:0"/></linearGradient>`;
    }
    svg += '</defs>';
    for (let i = 0; i < lop; i++) {
      const n = 128;
      const y = new Array(n + 1).fill(0);
      let buoc = n, bienDo = 1;
      y[0] = rnd(); y[n] = rnd();
      while (buoc > 1) {
        const nua = buoc / 2;
        for (let k = nua; k < n; k += buoc) y[k] = (y[k - nua] + y[k + nua]) / 2 + (rnd() - 0.5) * bienDo;
        buoc = nua; bienDo *= 0.52;
      }
      const mn = Math.min(...y), mx = Math.max(...y);
      const day = H * (0.42 + i * 0.15), cao = H * (0.36 - i * 0.05);
      let d = `M0 ${H}`;
      for (let k = 0; k <= n; k++) {
        const yy = day - ((y[k] - mn) / (mx - mn || 1)) * cao;
        d += ` L${((k / n) * W).toFixed(1)} ${yy.toFixed(1)}`;
      }
      d += ` L${W} ${H} Z`;
      svg += `<path d="${d}" fill="url(#n${i})"/>`;
    }
    svg += '</svg>';
    el.innerHTML = svg;
  }

  /* ---------- hàm chính ---------- */
  async function dung(goi) {
    const goc = document.querySelector('.canvas');
    const tt = goi.theThuc;
    const hh = hinhHoc(tt);
    const spec = goi.spec || {};
    const canhBao = [];

    goc.style.setProperty('--W', hh.W + 'px');
    goc.style.setProperty('--H', hh.H + 'px');
    goc.style.setProperty('--tra', hh.tra + 'px');
    goc.style.setProperty('--an-t', hh.an.t + 'px');
    goc.style.setProperty('--an-b', hh.an.b + 'px');
    goc.style.setProperty('--an-l', hh.an.l + 'px');
    goc.style.setProperty('--an-r', hh.an.r + 'px');
    goc.style.setProperty('--le-tt', String(tt.le != null ? tt.le : 6.5));
    goc.dataset.nhom = tt.nhom;
    goc.dataset.tt = goi.tt;
    goc.dataset.loai = tt.loai;
    goc.dataset.tiLe = (hh.W / hh.H).toFixed(3);
    if (spec.bienThe) goc.dataset.bienThe = spec.bienThe;
    if (goi.cheDo) goc.dataset.cheDo = goi.cheDo;
    apChuDe(goc, goi.chuDe || {});

    if (tt.loai === 'in') {
      const st = document.getElementById('kich-thuoc-trang') || document.head.appendChild(Object.assign(document.createElement('style'), { id: 'kich-thuoc-trang' }));
      st.textContent = `@page { size: ${(hh.W / MM).toFixed(3)}mm ${(hh.H / MM).toFixed(3)}mm; margin: 0 }`;
    }

    // nội dung: chung, rồi theo nhóm, rồi theo thể thức
    const du = Object.assign({}, spec.noiDung || {},
      ((spec.theoNhom || {})[tt.nhom] || {}).noiDung || {},
      ((spec.theoTheThuc || {})[goi.tt] || {}).noiDung || {});
    dien(goc, du, goi);
    // rút gọn mặc định: khổ chật (story 9:16) bỏ phần phụ thay vì co chữ
    if (spec.rutGon !== false) {
      goc.querySelectorAll('[data-rut-gon]').forEach((el) => {
        const nhoms = (el.dataset.rutGon || 'doc').split(/\s+/);
        if (nhoms.includes(tt.nhom)) el.classList.add('an', 'an-chu-y', 'rut-gon');
      });
    }
    apChinh(goc, (spec.theoNhom || {})[tt.nhom]);
    apChinh(goc, (spec.theoTheThuc || {})[goi.tt]);

    goc.querySelectorAll('.lop-nui').forEach((el) => veNui(el, 1200, 400, spec.hatNui || 7));
    await choPhong(goc);
    await choAnh(goc);
    await hoanTat();
    if (window.XUONG_SO_DO) {
      const phongs = getComputedStyle(goc);
      const nd = (phongs.getPropertyValue('--phong-noi-dung') || '"Be Vietnam Pro"').trim();
      const td = (phongs.getPropertyValue('--phong-tieu-de') || '"Playfair Display"').trim();
      const chuSoDo = JSON.stringify(du).replace(/[{}\[\]":,]/g, ' ');
      await Promise.all(['400', '600', '700', '800'].map((w) => document.fonts.load(`${w} 16px ${nd}`, chuSoDo).catch(() => null))
        .concat([document.fonts.load(`italic 600 16px ${td}`, chuSoDo).catch(() => null), document.fonts.load(`700 16px ${td}`, chuSoDo).catch(() => null)]));
      goc.querySelectorAll('[data-o-so-do]').forEach((el) => {
        const v = du[el.dataset.oSoDo];
        if (laTrong(v)) { el.classList.add('an'); return; }
        try { window.XUONG_SO_DO.ve(el, v, goi); el.classList.remove('an'); } catch (e) { canhBao.push({ loai: 'so-do', id: el.dataset.oSoDo, chiTiet: String(e) }); }
      });
    }

    await choPhong(goc);
    await hoanTat();

    goc.querySelectorAll('[data-vua]').forEach((el) => { if (!el.closest('.an') && !el.closest('[data-lap-mau]')) vuaChu(el, canhBao); });
    const co = vuaVung(goc, canhBao);
    goc.querySelectorAll('[data-vua]').forEach((el) => { if (!el.closest('.an') && !el.closest('[data-lap-mau]') && co < 1) vuaChu(el, canhBao); });

    apChinhTay(goc, (spec.chinhTay || {})[goi.tt]);
    await hoanTat();

    const chuBlocks = kiem(goc, hh, tt, canhBao);
    // số tiếng (âm tiết) người xem thật sự thấy trên hình: đối chiếu chuToiDa của thể thức (chuan/08)
    const soTieng = (goc.innerText || '').split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
    const ketQua = {
      ok: true, tt: goi.tt, W: hh.W, H: hh.H, tra: hh.tra, an: hh.an, co, soTieng,
      canhBao, chuBlocks, phanTu: hopPhanTu(goc),
    };
    window.__XONG = ketQua;
    return ketQua;
  }

  window.XUONG = { dung, dangChu, hinhHoc, hopPhanTu, veNui, phienBan: '1.0' };
})();
