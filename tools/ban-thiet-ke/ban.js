/* Bàn thiết kế: trang điều khiển. Ấn phẩm hiện trong iframe (chính khuôn HTML thật, cùng nguồn), Moveable gắn vào
 * tài liệu của iframe để kéo thả, đổi cỡ, xoay. Mọi thay đổi ghi vào đối tượng spec (file ấn phẩm) rồi lưu về máy. */
(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const S = { duong: null, spec: null, phienBan: null, tt: null, kho: {}, brand: {}, lichSu: [], doi: false, W: 0, H: 0, goi: null, chon: null, mv: null };
  const khung = $('#khung');

  /* ---------- tiện ích ---------- */
  const sao = (o) => JSON.parse(JSON.stringify(o));
  function bao(chu, ms = 4000) {
    const d = document.createElement('div'); d.className = 'thong-bao'; d.innerHTML = chu; document.body.appendChild(d);
    setTimeout(() => d.remove(), ms);
  }
  function danhDau(doi = true) { S.doi = doi; $('#trang-thai').textContent = doi ? 'Có thay đổi chưa lưu' : 'Đã lưu'; }
  function ghiLichSu() { S.lichSu.push(JSON.stringify(S.spec)); if (S.lichSu.length > 80) S.lichSu.shift(); }
  async function api(duong, than) {
    const r = await fetch(duong, than === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(than) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok && r.status !== 409) throw new Error(j.loi || r.statusText);
    return Object.assign(j, { _ma: r.status });
  }
  function layDuong(o, duong) { return duong.split('.').reduce((a, k) => (a == null ? undefined : a[k]), o); }
  function datDuong(o, duong, v) {
    const ks = duong.split('.'); let a = o;
    ks.slice(0, -1).forEach((k, i) => { if (a[k] == null) a[k] = /^\d+$/.test(ks[i + 1]) ? [] : {}; a = a[k]; });
    a[ks[ks.length - 1]] = v;
  }
  function nguonNoiDung(khoaDay) {
    // chỉnh vào đúng tầng đang cấp nội dung: theo thể thức > theo nhóm > chung
    const dau = khoaDay.split('.')[0];
    const tt = (S.spec.theoTheThuc || {})[S.tt];
    if (tt && tt.noiDung && dau in tt.noiDung) return tt.noiDung;
    const nhom = (S.kho[S.tt] || {}).nhom;
    const tn = (S.spec.theoNhom || {})[nhom];
    if (tn && tn.noiDung && dau in tn.noiDung) return tn.noiDung;
    S.spec.noiDung = S.spec.noiDung || {};
    return S.spec.noiDung;
  }
  function chinhTay() { S.spec.chinhTay = S.spec.chinhTay || {}; return (S.spec.chinhTay[S.tt] = S.spec.chinhTay[S.tt] || {}); }
  function theoTT() { S.spec.theoTheThuc = S.spec.theoTheThuc || {}; return (S.spec.theoTheThuc[S.tt] = S.spec.theoTheThuc[S.tt] || {}); }
  function khoaCua(el) { return el.dataset.oDay || el.dataset.id || (el.dataset.logo ? 'logo:' + el.dataset.logo : null); }

  /* ---------- mở ấn phẩm ---------- */
  async function moDanhSach() {
    const ds = await api('/api/ds-du-an');
    const sel = $('#chon-an-pham');
    sel.innerHTML = '<option value="">Chọn ấn phẩm...</option>';
    ds.duAn.forEach((d) => d.anPham.forEach((a) => {
      const o = document.createElement('option'); o.value = `${d.duong}/thiet-ke/${a}`; o.textContent = `${d.ten} / ${a}`;
      if (o.value === S.duong) o.selected = true; sel.appendChild(o);
    }));
    if (!ds.thuMucDuAn) $('#ten-an-pham').textContent = 'Chưa đặt thuMucDuAn trong cau-hinh.json: mở bằng đường dẫn file ấn phẩm.';
  }
  async function moAnPham(duong) {
    if (S.doi && !confirm('Có thay đổi chưa lưu. Bỏ qua và mở ấn phẩm khác?')) return;
    const d = await api('/api/an-pham?duong=' + encodeURIComponent(duong));
    Object.assign(S, { duong, spec: d.spec, phienBan: d.phienBan, kho: d.theThuc, brand: d.brand, lichSu: [], chon: null });
    S.spec.theThuc = S.spec.theThuc && S.spec.theThuc.length ? S.spec.theThuc : ['ig-4x5'];
    S.tt = S.spec.theThuc[0];
    history.replaceState(null, '', '?duong=' + encodeURIComponent(duong));
    $('#ten-an-pham').textContent = `khuôn: ${S.spec.khuon}`;
    dungBenTrai();
    danhDau(false);
    await ve();
  }

  function dungBenTrai() {
    const ds = $('#ds-the-thuc'); ds.innerHTML = '';
    S.spec.theThuc.forEach((id) => {
      const k = S.kho[id] || { ten: id };
      const b = document.createElement('button');
      b.className = id === S.tt ? 'dang' : '';
      b.innerHTML = `<span>${id}</span><small>${k.w ? k.w + 'x' + k.h : (k.wMm ? k.wMm + 'x' + k.hMm + ' mm' : '')}</small>`;
      b.title = k.ten || id;
      b.onclick = () => { S.tt = id; S.chon = null; dungBenTrai(); ve(); };
      b.oncontextmenu = (e) => {
        e.preventDefault();
        if (S.spec.theThuc.length > 1 && confirm(`Bỏ ${id} khỏi danh sách thể thức của ấn phẩm?`)) {
          ghiLichSu(); S.spec.theThuc = S.spec.theThuc.filter((x) => x !== id); if (S.tt === id) S.tt = S.spec.theThuc[0]; danhDau(); dungBenTrai(); ve();
        }
      };
      ds.appendChild(b);
    });
    const them = $('#them-the-thuc');
    them.innerHTML = '<option value="">+ thêm thể thức...</option>' + Object.entries(S.kho).filter(([id]) => !S.spec.theThuc.includes(id))
      .map(([id, k]) => `<option value="${id}">${id} · ${k.ten}</option>`).join('');
    const cd = $('#chon-chu-de');
    cd.innerHTML = '<option value="">(theo thương hiệu)</option>' + Object.entries(S.brand.chuDe).map(([id, c]) => `<option value="${id}" ${S.spec.chuDe === id ? 'selected' : ''}>${c.ten}</option>`).join('');
    const th = $('#chon-thuong-hieu');
    th.innerHTML = Object.entries(S.brand.thuongHieu).map(([id, t]) => `<option value="${id}" ${S.spec.thuongHieu === id ? 'selected' : ''}>${t.ten}</option>`).join('');
  }

  /* ---------- vẽ ---------- */
  let dangVe = null;
  async function ve() {
    const lan = Symbol(); dangVe = lan;
    const d = await api('/api/goi', { spec: S.spec, tt: S.tt });
    if (dangVe !== lan) return;
    S.goi = d.goi; S.W = Math.ceil(d.W); S.H = Math.ceil(d.H);
    khung.style.width = S.W + 'px'; khung.style.height = S.H + 'px';
    await new Promise((r) => { khung.onload = r; khung.src = `/kho/khuon/${encodeURIComponent(S.spec.khuon)}/khuon.html?v=${Date.now()}`; });
    const win = khung.contentWindow;
    const kq = await win.XUONG.dung(S.goi);
    if (dangVe !== lan) return;
    vuaKhung(); veAnToan(); hienCanhBao(kq.canhBao || []);
    await ganMoveable();
    if (S.chon) { const el = timTrongKhung(S.chon); if (el) chonPhanTu(el); else S.chon = null; }
    if (!S.chon) $('#thuoc-tinh').innerHTML = '<span class="nhat">Chưa chọn phần tử nào.</span>';
  }
  function vuaKhung() {
    const g = $('#vung-giua').getBoundingClientRect();
    const s = Math.min((g.width - 80) / S.W, (g.height - 90) / S.H, 1.5);
    S.tiLe = s;
    const kx = $('#khung-xem');
    kx.style.width = S.W + 'px'; kx.style.height = S.H + 'px';
    kx.style.transform = `translate(${-S.W * s / 2}px, ${-S.H * s / 2 - 14}px) scale(${s})`;
  }
  function veAnToan() {
    const l = $('#lop-an-toan'); l.innerHTML = '';
    const win = khung.contentWindow;
    const hh = win.XUONG.hinhHoc(S.goi.theThuc);
    if ($('#xem-luoi').checked) l.insertAdjacentHTML('beforeend', `<div class="luoi" style="background-size:${Math.min(S.W, S.H) / 12}px ${Math.min(S.W, S.H) / 12}px"></div>`);
    if (!$('#xem-an-toan').checked) return;
    if (hh.tra > 0) l.insertAdjacentHTML('beforeend', `<div class="tra" style="left:${hh.tra}px;top:${hh.tra}px;width:${hh.W - 2 * hh.tra}px;height:${hh.H - 2 * hh.tra}px" title="đường xén thành phẩm"></div>`);
    l.insertAdjacentHTML('beforeend', `<div class="o" style="left:${hh.an.l}px;top:${hh.an.t}px;width:${hh.W - hh.an.l - hh.an.r}px;height:${hh.H - hh.an.t - hh.an.b}px" title="vùng an toàn"></div>`);
    (S.goi.theThuc.vungTrong || []).forEach((v) => {
      l.insertAdjacentHTML('beforeend', `<div class="cam" style="left:${hh.tra + hh.doi(v.x)}px;top:${hh.tra + hh.doi(v.y)}px;width:${hh.doi(v.w)}px;height:${hh.doi(v.h)}px">${v.ten}</div>`);
    });
  }
  function hienCanhBao(ds) {
    $('#canh-bao').innerHTML = ds.length ? ds.map((c) => `<div class="cb ${/co-|chu-nho/.test(c.loai) ? 'vang' : ''}"><b>${c.loai}</b> · ${c.id}<br>${c.chiTiet}</div>`).join('') : 'Không có cảnh báo.';
  }

  /* ---------- chọn, kéo thả trong iframe ---------- */
  function timTrongKhung(k) {
    const doc = khung.contentDocument;
    if (k.startsWith('logo:')) return doc.querySelector(`[data-logo="${k.slice(5)}"]`);
    return doc.querySelector(`[data-o-day="${k}"]`) || doc.querySelector(`[data-id="${k}"]`);
  }
  async function ganMoveable() {
    const win = khung.contentWindow, doc = khung.contentDocument;
    if (!win.Moveable) {
      await new Promise((r) => { const s = doc.createElement('script'); s.src = '/ban/vendor/moveable.min.js'; s.onload = r; doc.head.appendChild(s); });
    }
    const st = doc.createElement('style');
    st.textContent = '[data-o]:not(.an),[data-id],[data-logo],[data-o-nen]{cursor:pointer} [contenteditable]{outline:2px solid #5CC2F7;cursor:text} .chon-hover{outline:1px dashed rgba(92,194,247,.8)}';
    doc.head.appendChild(st);
    const canvas = doc.querySelector('.canvas');
    S.mv = new win.Moveable(doc.body, {
      target: null, draggable: true, resizable: true, rotatable: true, origin: false, keepRatio: false,
      snappable: true, snapThreshold: 6, isDisplaySnapDigit: true, zoom: 1 / S.tiLe,
      elementGuidelines: [canvas], horizontalGuidelines: [0, S.H / 2, S.H], verticalGuidelines: [0, S.W / 2, S.W],
    });
    const t = () => { const k = khoaCua(S.mv.target); const ct = chinhTay(); ct[k] = ct[k] || {}; return ct[k]; };
    const ap = (el, x) => {
      if (x.w != null) el.style.width = x.w + 'px';
      if (x.h != null) el.style.height = x.h + 'px';
      el.style.transform = `translate(${x.dx || 0}px, ${x.dy || 0}px)` + (x.rot ? ` rotate(${x.rot}deg)` : '');
    };
    S.mv.on('dragStart', (e) => { ghiLichSu(); const x = t(); e.set([x.dx || 0, x.dy || 0]); })
      .on('drag', (e) => { const x = t(); x.dx = Math.round(e.beforeTranslate[0] * 10) / 10; x.dy = Math.round(e.beforeTranslate[1] * 10) / 10; ap(e.target, x); })
      .on('resizeStart', (e) => { ghiLichSu(); const x = t(); e.setOrigin(['%', '%']); if (e.dragStart) e.dragStart.set([x.dx || 0, x.dy || 0]); })
      .on('resize', (e) => { const x = t(); x.w = Math.round(e.width); x.h = Math.round(e.height); x.dx = Math.round(e.drag.beforeTranslate[0]); x.dy = Math.round(e.drag.beforeTranslate[1]); ap(e.target, x); })
      .on('rotateStart', (e) => { ghiLichSu(); e.set(t().rot || 0); })
      .on('rotate', (e) => { const x = t(); x.rot = Math.round(e.beforeRotate * 10) / 10; ap(e.target, x); })
      .on('dragEnd', () => { danhDau(); veThuocTinh(); })
      .on('resizeEnd', () => { danhDau(); veThuocTinh(); })
      .on('rotateEnd', () => { danhDau(); veThuocTinh(); });
    doc.addEventListener('mousedown', (e) => {
      if (e.target.closest('.moveable-control-box')) return;
      if (e.target.isContentEditable) return;
      const el = e.target.closest('[data-o-day], [data-id], [data-logo]');
      if (el && el !== S.mv.target) { chonPhanTu(el); S.mv.dragStart(e); }
      else if (!el) boChon();
    }, true);
    doc.addEventListener('dblclick', (e) => {
      const el = e.target.closest('[data-o-day]');
      if (!el || el.tagName === 'IMG' || el.hasAttribute('data-o-nen')) return;
      suaChu(el);
    });
    doc.addEventListener('keydown', phim);
  }
  function chonPhanTu(el) { S.chon = khoaCua(el); S.elChon = el; S.mv.target = el; veThuocTinh(); }
  function boChon() { S.chon = null; S.elChon = null; if (S.mv) S.mv.target = null; $('#thuoc-tinh').innerHTML = '<span class="nhat">Chưa chọn phần tử nào.</span>'; }

  function suaChu(el) {
    const k = el.dataset.oDay;
    const nguon = nguonNoiDung(k);
    const tho = layDuong(nguon, k);
    if (typeof tho !== 'string' && tho != null) return;
    S.mv.target = null;
    el.setAttribute('contenteditable', 'plaintext-only');
    el.textContent = tho || '';
    el.focus();
    const xong = () => {
      el.removeEventListener('blur', xong);
      el.removeAttribute('contenteditable');
      const moi = el.innerText.replace(/\r/g, '').normalize('NFC');
      if (moi !== (tho || '')) { ghiLichSu(); datDuong(nguon, k, moi); danhDau(); }
      ve();
    };
    el.addEventListener('blur', xong);
  }

  /* ---------- bảng thuộc tính ---------- */
  function veThuocTinh() {
    const el = S.elChon || (S.mv && S.mv.target); const k = S.chon;
    if (!el || !k) return;
    const laAnh = el.tagName === 'IMG' || el.hasAttribute('data-o-nen');
    const laLogo = !!el.dataset.logo && !el.dataset.oDay;
    const x = (S.spec.chinhTay || {})[S.tt] ? S.spec.chinhTay[S.tt][k] : null;
    const an = ((S.spec.theoTheThuc || {})[S.tt] || {}).an || [];
    let h = `<div class="the-tt"><b>${k}</b><br><span class="nho">${el.tagName.toLowerCase()} · ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)} px</span></div>`;
    if (el.dataset.oDay && !laAnh) {
      const v = layDuong(nguonNoiDung(k), k);
      if (typeof v === 'string' || v == null) h += `<label>Nội dung (cú pháp *nghiêng* **đậm** ~ \\n)<textarea id="tt-chu">${(v || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</textarea></label><button id="tt-ap-chu">Áp nội dung</button>`;
      const co = parseFloat(khung.contentWindow.getComputedStyle(el).fontSize);
      h += `<label>Cỡ chữ ở thể thức này: <b id="tt-co-so">${Math.round(co)}</b> px<input type="range" id="tt-co" min="${Math.round(co * 0.5)}" max="${Math.round(co * 1.8)}" value="${Math.round(co)}"></label>`;
    }
    if (laAnh && el.dataset.oDay) {
      const v = layDuong(nguonNoiDung(k), k) || {};
      const td = (typeof v === 'object' && v.tieuDiem) || [0.5, 0.35];
      h += `<button id="tt-thay-anh">Thay ảnh...</button>
        <label>Tiêu điểm ngang <input type="range" id="tt-tdx" min="0" max="1" step="0.01" value="${td[0]}"></label>
        <label>Tiêu điểm dọc <input type="range" id="tt-tdy" min="0" max="1" step="0.01" value="${td[1]}"></label>`;
    }
    if (laLogo) h += '<p class="nho">Logo lấy từ brand/brand.json theo thương hiệu và màu nền; đổi thương hiệu ở cột trái.</p>';
    if (x) h += `<p class="nho">Đã chỉnh tay: ${['dx', 'dy', 'w', 'h', 'rot', 'coChu'].filter((q) => x[q] != null).map((q) => `${q} ${x[q]}`).join(', ')}</p>`;
    h += `<button id="tt-dat-lai">Đặt lại vị trí, cỡ (thể thức này)</button>`;
    h += `<label class="hop-chon"><input type="checkbox" id="tt-an" ${an.includes(k) ? 'checked' : ''}> Ẩn ở thể thức này</label>`;
    h += `<button id="tt-chep">Chép vị trí sang thể thức cùng nhóm</button>`;
    $('#thuoc-tinh').innerHTML = h;
    const on = (id, ev, f) => { const n = $(id); if (n) n.addEventListener(ev, f); };
    on('#tt-ap-chu', 'click', () => { ghiLichSu(); datDuong(nguonNoiDung(k), k, $('#tt-chu').value.normalize('NFC')); danhDau(); ve(); });
    on('#tt-co', 'input', (e) => { $('#tt-co-so').textContent = e.target.value; el.style.fontSize = e.target.value + 'px'; });
    on('#tt-co', 'change', (e) => { ghiLichSu(); const ct = chinhTay(); ct[k] = Object.assign(ct[k] || {}, { coChu: +e.target.value }); danhDau(); ve(); });
    on('#tt-dat-lai', 'click', () => { ghiLichSu(); delete chinhTay()[k]; danhDau(); ve(); });
    on('#tt-an', 'change', (e) => {
      ghiLichSu(); const t = theoTT(); t.an = (t.an || []).filter((q) => q !== k); if (e.target.checked) t.an.push(k); danhDau(); ve();
    });
    on('#tt-chep', 'click', () => {
      const nhom = (S.kho[S.tt] || {}).nhom; const goc = chinhTay()[k]; if (!goc) return bao('Phần tử này chưa chỉnh tay ở thể thức hiện tại.');
      ghiLichSu(); let n = 0;
      S.spec.theThuc.forEach((id) => { if (id !== S.tt && (S.kho[id] || {}).nhom === nhom) { S.spec.chinhTay[id] = S.spec.chinhTay[id] || {}; S.spec.chinhTay[id][k] = sao(goc); n++; } });
      danhDau(); bao(`Đã chép sang ${n} thể thức cùng nhóm "${nhom}".`);
    });
    const doiTD = () => { ghiLichSu(); const ng = nguonNoiDung(k); let v = layDuong(ng, k); v = typeof v === 'string' ? { src: v } : Object.assign({}, v); v.tieuDiem = [+$('#tt-tdx').value, +$('#tt-tdy').value]; datDuong(ng, k, v); danhDau(); ve(); };
    on('#tt-tdx', 'change', doiTD); on('#tt-tdy', 'change', doiTD);
    on('#tt-thay-anh', 'click', () => {
      const f = $('#chon-tep'); f.value = '';
      f.onchange = async () => {
        const tep = f.files[0]; if (!tep) return;
        const r = await fetch('/api/anh?ten=' + encodeURIComponent(tep.name), { method: 'POST', body: tep });
        const j = await r.json(); if (!r.ok) return bao('Không tải được ảnh: ' + (j.loi || ''));
        ghiLichSu(); const ng = nguonNoiDung(k); let v = layDuong(ng, k); v = typeof v === 'object' && v ? Object.assign({}, v) : {}; v.src = j.src; datDuong(ng, k, v); danhDau(); ve();
      };
      f.click();
    });
  }

  /* ---------- lưu, xuất, hoàn tác ---------- */
  function donRong() {
    const ct = S.spec.chinhTay || {};
    for (const [tt, ds] of Object.entries(ct)) {
      for (const [k, v] of Object.entries(ds)) if (!v || !Object.keys(v).length) delete ds[k];
      if (!Object.keys(ds).length) delete ct[tt];
    }
    if (S.spec.chinhTay && !Object.keys(S.spec.chinhTay).length) delete S.spec.chinhTay;
  }
  async function luu(ghiDe = false) {
    donRong();
    const r = await api('/api/luu', { duong: S.duong, spec: S.spec, phienBan: S.phienBan, ghiDe });
    if (r._ma === 409) {
      if (confirm(r.loi + '\n\nOK = ghi đè bằng bản đang chỉnh trên bàn.\nCancel = giữ bản trên máy (nạp lại, mất thay đổi chưa lưu).')) return luu(true);
      S.doi = false; return moAnPham(S.duong);
    }
    S.phienBan = r.phienBan; danhDau(false); bao('Đã lưu vào ' + S.duong.split('/').slice(-2).join('/'));
  }
  async function xuat(tatCa) {
    if (S.doi) await luu();
    $('#ket-qua-xuat').textContent = 'Đang xuất bằng Chrome trên máy...';
    try {
      const r = await api('/api/xuat', { duong: S.duong, tt: tatCa ? null : [S.tt] });
      $('#ket-qua-xuat').innerHTML = `<div>Đã xuất vào: ${r.thuMucRa || ''}</div>` +
        r.tep.map((t) => `<div><a href="${t.url}" target="_blank">${t.ten}</a></div>`).join('') +
        (r.canhBao.length ? `<div>${r.canhBao.length} cảnh báo: xem cột phải.</div>` : '<div>Không có cảnh báo.</div>');
    } catch (e) { $('#ket-qua-xuat').textContent = 'Lỗi xuất: ' + e.message; }
  }
  function hoanTac() { if (!S.lichSu.length) return; S.spec = JSON.parse(S.lichSu.pop()); danhDau(); dungBenTrai(); ve(); }
  function phim(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); luu(); }
    else if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !(e.target && e.target.isContentEditable)) { e.preventDefault(); hoanTac(); }
    else if (e.key === 'Escape') { if (e.target && e.target.isContentEditable) e.target.blur(); else boChon(); }
    else if (S.mv && S.mv.target && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) && !(e.target && (e.target.isContentEditable || /INPUT|TEXTAREA/.test(e.target.tagName)))) {
      e.preventDefault(); ghiLichSu();
      const b = e.shiftKey ? 10 : 1; const k = S.chon; const ct = chinhTay(); const x = (ct[k] = ct[k] || {});
      if (e.key === 'ArrowLeft') x.dx = (x.dx || 0) - b; if (e.key === 'ArrowRight') x.dx = (x.dx || 0) + b;
      if (e.key === 'ArrowUp') x.dy = (x.dy || 0) - b; if (e.key === 'ArrowDown') x.dy = (x.dy || 0) + b;
      S.mv.target.style.transform = `translate(${x.dx || 0}px, ${x.dy || 0}px)` + (x.rot ? ` rotate(${x.rot}deg)` : '');
      S.mv.updateRect(); danhDau();
    }
  }

  /* ---------- gắn sự kiện ---------- */
  $('#nut-luu').onclick = () => luu();
  $('#nut-hoan-tac').onclick = hoanTac;
  $('#nut-xuat-mot').onclick = () => xuat(false);
  $('#nut-xuat-het').onclick = () => xuat(true);
  $('#xem-an-toan').onchange = veAnToan;
  $('#xem-luoi').onchange = veAnToan;
  $('#them-the-thuc').onchange = (e) => { if (!e.target.value) return; ghiLichSu(); S.spec.theThuc.push(e.target.value); S.tt = e.target.value; danhDau(); dungBenTrai(); ve(); };
  $('#chon-chu-de').onchange = (e) => { ghiLichSu(); if (e.target.value) S.spec.chuDe = e.target.value; else delete S.spec.chuDe; danhDau(); ve(); };
  $('#chon-thuong-hieu').onchange = (e) => { ghiLichSu(); S.spec.thuongHieu = e.target.value; danhDau(); ve(); };
  $('#chon-an-pham').onchange = (e) => { if (e.target.value) moAnPham(e.target.value); };
  document.addEventListener('keydown', phim);
  window.addEventListener('resize', () => { if (S.W) { vuaKhung(); if (S.mv) { S.mv.zoom = 1 / S.tiLe; S.mv.updateRect(); } } });
  window.addEventListener('beforeunload', (e) => { if (S.doi) { e.preventDefault(); e.returnValue = ''; } });
  window.__BAN = S;

  const q = new URLSearchParams(location.search).get('duong');
  moDanhSach().catch(() => null);
  if (q) moAnPham(q).catch((e) => bao('Không mở được: ' + e.message, 8000));
})();
