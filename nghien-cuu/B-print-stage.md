# B. Print production and large-format / stage design standards

Research date: 2026-10-06. Audience: Vietnamese educators, experts and speakers producing flyers, brochures, handouts/workbooks, certificates, name cards, posters, standees, banners, stage backdrops (phông sân khấu), photo walls (step-and-repeat), LED stage screens.

Legend: **[V]** = verified by a local test in this session (Ghostscript 10.02.1, WeasyPrint 70.0, Chromium 141 headless, pikepdf 10.13); **[S]** = stated by the cited source; **[P]** = practitioner synthesis / my recommendation, not a formal standard; **[?]** = uncertain or sources disagree.

---

## 0. TL;DR numbers

| Topic | Number to use | Notes |
|---|---|---|
| Bleed, small format (offset/digital) | **3 mm** each side | VN shops universally say 3 mm [S]. Some EU packaging printers want 5-10 mm. |
| Safe zone, small format | **3 mm** inside trim (so 6 mm from bleed edge); 4-5 mm for name cards/booklets is safer [P] | |
| Bleed, hiflex/banners | **≥ 5 cm** pulled-through background for eyelets (khoen) [S]; safe zone 5-10 cm [S] | |
| Bleed, roll-up/X-standee | 3 mm bleed + roll-up bottom **7-10 cm hidden in cassette** (keep key info out of bottom 15 cm), top 1 cm rail; X-standee: keep 4 corners clear for eyelets [S] | |
| Resolution | 300 ppi at final size (offset), 150 ppi (standee/roll-up/poster viewed ≥1 m), 72-150 ppi (backdrop), ≈ 87/d(m) ppi = acuity floor | formula in §1.3 |
| CMYK profile in VN | **Japan Color 2001 Coated** is the de-facto default at VN offset shops [S]; FOGRA39 (ISO Coated v2) is the international fallback; FOGRA51 (PSO Coated v3) only if the printer names it | Ask the shop. |
| TAC (total ink) | Japan Color 2001 Coated 350%, FOGRA39 330% (ECI) / 350% (Adobe), PSO Coated v3 300%, JC2001 Uncoated 310%; safe universal target **≤ 300%** | |
| Rich black (large areas ≥ 5 mm) | **C60 M40 Y40 K100** (240%) | |
| Black text / thin lines | **K100 only (C0 M0 Y0 K100)**, overprint on colour | Chrome #000 becomes ~C72 M68 Y67 K88 after naive ICC conversion [V] - must be fixed (§2). |
| Min line weight | 0.25 pt offset (never < 0.2 pt), 0.4 pt digital [S] | |
| Min type | 6 pt positive, 8 pt reversed (9 pt on uncoated) [S]; ≤ 8 pt never in 2+ process colours [S] | Vietnamese diacritics: add 1 pt [P]. |
| Handout body | 10-11 pt, leading 130-150% for Vietnamese [P] | |
| PDF delivery | PDF/X-1a or PDF/X-4 (VN shop guides) [S]; Ghostscript can make **PDF/X-3** reliably [V]; WeasyPrint 70 can label PDF/X-1a/3/4 but does **not** convert RGB [V] | |
| PDF page size limit | **200 × 200 in (5.08 m)** per side [S] -> design big backdrops at 1:10 (or 1:2/1:4) | |
| LED wall resolution | px = physical mm / pitch mm; P3.91 cabinet 500×500 = 128×128 px; P2.6 = 192×192; P4.81 = 104×104; P3 fixed module 192×192 mm = 64×64 px; P2.5 module 320×160 mm = 128×64 px | |
| LED file | MP4 H.264 (H.265 for 4K), 25/30 fps (or 50/60), 8-20 Mbps at 1080p; PNG at exact pixel map; RGB never CMYK [S] | |
| Letter height vs distance | 1 in cap height per 10 ft ≈ **1 cm per 3 m** = maximum/"registers" distance; comfortable reading ≈ 1 cm per 1.5-2 m [S][?] | sources disagree on whether 10 ft is "max" or "effective" |

---

## 1. Prepress fundamentals

### 1.1 Bleed, trim, safe zone, crop marks

| Element | Small format (card, flyer, brochure, certificate, workbook) | Large format |
|---|---|---|
| Trim (thành phẩm) | final size | final size |
| Bleed (tràn lề) | 3 mm each side -> name card 90×54 file = **96×60 mm**; A5 = 154×216; A4 = 216×303 ([indaiphat.vn](https://indaiphat.vn/blog/thong-so-ky-thuat-file-in)) | Roll-up/X-standee 3 mm ([innhanhthudo.com](https://innhanhthudo.com/tin-tuc/file-thiet-ke-standee-chuan), [printsimple.eu](https://www.printsimple.eu/en/help/design-guidelines-roll-up-banners)); hiflex **≥ 5 cm** "kéo nền tràn viền tối thiểu 5cm đối với bạt Hiflex" ([inananh.com](https://inananh.com/kich-thuoc-banner-backdrop-hiflex)); step-and-repeat: extend background past trim, keep live art ≥ 3 in (7.5 cm) inside finished edge ([4over4](https://www.4over4.com/guide/backdrop-banners-sizes-and-setup-guide)) |
| Safe zone (vùng an toàn) | 3 mm inside trim ([indaiphat.vn](https://indaiphat.vn/blog/thong-so-ky-thuat-file-in)); 3 mm from folds ([orbprint](https://www.orbprint.co.uk/template/a4t.pdf)) | standee ≥ 5 mm ([innhanhthudo](https://innhanhthudo.com/tin-tuc/file-thiet-ke-standee-chuan)); roll-up 5-10 mm sides ([theprintwarehouse](https://theprintwarehouse.uk/blog/roller-banner-dimensions)); hiflex 5-10 cm ([inananh](https://inananh.com/kich-thuoc-banner-backdrop-hiflex)), "chừa biên ra tầm 10cm" ([medium/ngovang](https://medium.com/@ngovang082017/th%C3%B4ng-s%E1%BB%91-chu%E1%BA%A9n-in-b%E1%BA%A1t-hiflex-%C4%91%E1%BA%B9p-495bbab0ac4d)) |
| Crop marks | Usually **not** required by VN digital/offset shops if bleed is present and size is stated; some ask "PDF có bleed và crop marks" ([innhanhthudo](https://innhanhthudo.com/tin-tuc/file-thiet-ke-standee-chuan)). For PDF/X submission, prefer TrimBox/BleedBox + no marks; the RIP/imposition adds marks [P]. | not used |

Page boxes matter: a print-ready PDF should have **MediaBox = BleedBox = trim + bleed** and **TrimBox = finished size**. Chrome's PDF output has only a MediaBox [V]; you must add TrimBox/BleedBox yourself (script in §2.3).

Other dimensional rules:
- **Brochure A4 tri-fold (roll fold, gấp 3 cuốn)**: fold-in panel must be ~3 mm narrower: panels **100 / 100 / 97 mm** ([metroprint.ph](https://www.metroprint.ph/help/creating-data/designing-for-folds)). Outside face (left -> right): flap-inside 97 | back 100 | cover 100. Inside face: 100 | 100 | 97 (flap). Some UK templates use 98/99/100 ([orbprint](https://www.orbprint.co.uk/template/a4t.pdf)). **Z-fold**: 99/99/99. **Gatefold**: outer flaps 2 mm narrower ([metroprint.ph](https://www.metroprint.ph/help/creating-data/designing-for-folds)).
- **Saddle-stitched workbooks (đóng ghim)**: page count multiple of 4; keep text ≥ 5 mm from trim and from spine; creep becomes noticeable above ~48 pages [P].

### 1.2 Resolution

| Use | ppi at final physical size | Source |
|---|---|---|
| Offset / digital small format (card, flyer, workbook photos) | **300** (72 = "mờ, vỡ hạt") | [indaiphat.vn](https://indaiphat.vn/blog/thong-so-ky-thuat-file-in), [printgo poster](https://printgo.vn/kich-thuoc-poster-v1121) |
| Standee / roll-up | **150** at real size | [innhanhthudo](https://innhanhthudo.com/tin-tuc/file-thiet-ke-standee-chuan), [theprintwarehouse](https://theprintwarehouse.uk/blog/roller-banner-dimensions) |
| Banner > 1 m | 72-150 (small details/logos ideally vector or 300) | [indaiphat.vn](https://indaiphat.vn/blog/thong-so-ky-thuat-file-in) |
| Stage backdrop viewed ≥ 10 m | 72-150 | [inananh](https://inananh.com/kich-thuoc-banner-backdrop-hiflex) |
| Backdrop (VN design guides) | min 150 at final size | [thegioibackdrop](https://thegioibackdrop.com/nguyen-tac-thiet-ke-backdrop) |
| Step-and-repeat | build at 1:10 at 1500 dpi = **150 ppi at full size** | [4over4](https://www.4over4.com/guide/backdrop-banners-sizes-and-setup-guide) |
| Hiflex (VN shop folklore) | "72 dpi là đủ", "50 dpi cho bạt lớn" | [medium/ngovang](https://medium.com/@ngovang082017/th%C3%B4ng-s%E1%BB%91-chu%E1%BA%A9n-in-b%E1%BA%A1t-hiflex-%C4%91%E1%BA%B9p-495bbab0ac4d) [?] low-authority but reflects practice |

### 1.3 Formula: ppi needed vs viewing distance

Based on 1 arc-minute visual acuity (20/20): one pixel should subtend ≤ 1′.

- **ppi_min = 3438 / d_inches** ([pixelcraft](https://pixelcraft.photo.blog/2022/10/24/the-math-behind-visual-acuity/); [photoseek](https://photoseek.com/2011/print-sharp-maximum-size-quality-resolution-viewing-distance/) uses 3500/d).
- Metric (my conversion): **ppi_min ≈ 8733 / d_cm ≈ 87 / d_m**. (pixelcraft prints "8595/h" for cm, which does not match 3438 × 2.54 = 8733 [?]; use 87/d_m.)
- For photographic detail with hard edges (text in images, logos raster), use ~2× the floor (Nyquist margin) [P]: **ppi_rec ≈ 175 / d_m**, capped at 300.

| Viewing distance | Acuity floor (87/d) | Recommended raster (≈175/d, cap 300) | Typical item |
|---|---|---|---|
| 0.35 m | 249 | 300 | handout, name card, certificate |
| 0.5 m | 175 | 300 | brochure, table tent |
| 1 m | 87 | 150-175 | A2/A1 poster, standee read close |
| 1.5 m | 58 | 120 | roll-up, photo wall shot by phone |
| 2 m | 44 | 90-100 | photo wall, X-banner |
| 3 m | 29 | 60 | front row to backdrop |
| 5 m | 17 | 35-50 | backdrop mid-room |
| 10 m | 9 | 20-30 | back of ballroom, hanging banner |

Key implication **[P]**: the common VN practice "design at 1:10 at 300 ppi" = **30 ppi at full size**. That is fine for a stage backdrop viewed from ≥ 3 m, but **too soft for a photo wall** that cameras capture from 1.5-2 m and audiences zoom into; for photo walls use 1:10 at 500-600 ppi (= 50-60 ppi full size) or 1:5 at 300 ppi, and keep logos/text vector.

### 1.4 Colour: CMYK, ICC profiles used in Vietnam, ink limits

**Which profile?**
- **Japan Color 2001 Coated** is explicitly described as "Phổ biến tại các nhà in Việt Nam" ([sadesign.vn](https://sadesign.vn/cam-nang-toan-tap-cach-chuyen-doi-he-mau-cmyk-va-rgb-trong-photoshop)). It is the Adobe default CMYK in Asia-Pacific Creative Suite installs, which is why VN designers' files are usually separated with it. Characterisation **JC200103**: ISO 12647-2:1996, sheet-fed offset, positive plates, 69 lines/cm (175 lpi), type 1 coated 105 g/m² ([color.org registry](https://registry.color.org/cmyk-registry/jc200103)). Adobe profile TAC **350%**; OutputConditionIdentifier **"JC200103"**; Japan Color 2001 Uncoated = **"JCN200104"**, TAC **310%** ([CTAN pdfx AdobeColorProfiles.tex](https://mirrors.mit.edu/CTAN/macros/latex/contrib/pdfx/AdobeColorProfiles.tex)).
- **Japan Color 2011 Coated** (JCS2011, ISO 12647-2:2004): TAC 350%, max black 80%, TVI 14% ([color.org registry](https://registry.color.org/profile-registry/JapanColor2011Coated)). Rarely requested in VN [?].
- **FOGRA39 / ISO Coated v2 (ECI)**: TAC **330%**; **ISO Coated v2 300% (ECI)**: TAC **300%** ([ECI](https://eci.org/doku.php_id=en_colorstandards_offset.html)). Adobe's "Coated FOGRA39" is listed at 350% ([CTAN](https://mirrors.mit.edu/CTAN/macros/latex/contrib/pdfx/AdobeColorProfiles.tex)).
- **FOGRA51 / PSO Coated v3**: TAC **300%**, premium coated with optical brighteners, M1 measurement ([print.app](https://print.app/resources/icc-profiles/pso-coated-v3)). "Adopt this standard only if your printer specifies it by name."
- **Uncoated (giấy Fort/Ford, offset)**: FOGRA52 / PSO Uncoated v3, or Japan Color 2001 Uncoated (310%).

**Recommendation [P]**: ask the shop "nhà in dùng profile nào?". Default: Japan Color 2001 Coated for couche (C) papers; Japan Color 2001 Uncoated (or PSO Uncoated v3) for Fort/Ford/kraft. If unknown, aim content to stay ≤ 300% TAC so it is safe under any of them.

**TAC by process** ([prepressure.com](https://www.prepressure.com/design/basics/tic)): sheet-fed coated 320-340%; heat-set web 300-320%; SWOP 300%; newsprint 240-260%; inkjet/copier 300-350%. Several POD/printers enforce **300%** ([printpeppermint](https://www.printpeppermint.com/guides/file-setup/cmyk-rich-black-and-ink-limits)).

**Rich black vs 100K**
- Rich black **C60 M40 Y40 K100 = 240%**, only for solid areas ≥ 5 mm across ([printpeppermint](https://www.printpeppermint.com/guides/file-setup/cmyk-rich-black-and-ink-limits), [4over4](https://www.4over4.com/guide/rich-black-explained-the-cmyk-recipe)). VN shops quote the same recipe ([innhanhthudo](https://innhanhthudo.com/tin-tuc/file-thiet-ke-standee-chuan)). Variants [P]: cool C70 M50 Y30 K100; warm C40 M60 Y60 K100 (keep ≤ 300%).
- **Never** rich black / registration (400%) for type, thin lines, QR codes: use **K100** ([printpeppermint](https://www.printpeppermint.com/guides/file-setup/cmyk-rich-black-and-ink-limits), [prepressure](https://www.prepressure.com/design/basics/tic)).
- **Overprint**: small K100 type and lines should overprint coloured backgrounds; large black areas and anything white must not ([printpeppermint](https://www.printpeppermint.com/guides/file-setup/cmyk-rich-black-and-ink-limits)). White set to overprint disappears; VN checklist: "Avoid incorrect Overprint settings; no knockout white overlays" ([indaiphat](https://indaiphat.vn/blog/thong-so-ky-thuat-file-in)).

**Line weight and type size**
| Item | Minimum | Source |
|---|---|---|
| Line, offset | 0.25 pt (never < 0.2 pt) | [metroprint](https://www.metroprint.ph/help/creating-data/text-size-line-weights), [prepressure](https://www.prepressure.com/design/optimize_design/3) |
| Line, digital | 0.4 pt | [metroprint](https://www.metroprint.ph/help/creating-data/text-size-line-weights) |
| Line positive / reversed (metric) | 0.1 mm / 0.2 mm (STI: 0.1 / 0.15 mm) | [printpeppermint](https://www.printpeppermint.com/guides/file-setup/cmyk-rich-black-and-ink-limits), [STI Group](https://www.sti-group.com/fileadmin/user_upload/sti-group.com/Documents_Dokumente/Technische_Richtlinien_DTP_Offset_EN.pdf) |
| Type positive | 6 pt (STI allows 5 pt) | same |
| Type reversed | 8 pt coated, 9 pt uncoated | [printpeppermint](https://www.printpeppermint.com/guides/file-setup/cmyk-rich-black-and-ink-limits) |
| Type in ≥ 2 process colours | not below 8 pt | [prepressure](https://www.prepressure.com/design/optimize_design/3) |
| Vietnamese text [P] | add ~1 pt to each minimum; avoid reversed thin serif fonts below 9 pt, tone marks (dấu hỏi, ngã) fill in first | [vietnamesetypography.com](https://vietnamesetypography.com/design-challenges/) ("tone marks need to be as clear and as strong as their base letters") |

### 1.5 PDF/X-1a vs PDF/X-4, fonts, spot colours

| | PDF/X-1a (2001/2003) | PDF/X-3 (2002/2003) | PDF/X-4 (2008/2010) |
|---|---|---|---|
| Colour | CMYK + spot only | CMYK, spot, plus ICC-based (device-independent) | same as X-3, ICC-based allowed |
| Transparency | **flattened** (PDF 1.3/1.4) | flattened (PDF 1.3) | **live transparency**, layers (PDF 1.6) |
| Typical VN request | "PDF/X-4 hoặc PDF/X-1a" ([indaiphat](https://indaiphat.vn/blog/thong-so-ky-thuat-file-in)); "PDF/X-1a" for large format ([inananh](https://inananh.com/kich-thuoc-banner-backdrop-hiflex)) | rarely named | EU printers default to "PDF/X-4 with transparencies" + ISO Coated v2 ([STI Group](https://www.sti-group.com/fileadmin/user_upload/sti-group.com/Documents_Dokumente/Technische_Richtlinien_DTP_Offset_EN.pdf)); WeasyPrint docs: "PDF/X-4 should be preferred: it allows transparency" ([WeasyPrint](https://doc.courtbouillon.org/weasyprint/stable/common_use_cases.html)) |

- **Fonts**: embed all fonts (all PDF/X require it). VN shops additionally ask to "outline tất cả font chữ" for AI/CDR/PDF ([indaiphat](https://indaiphat.vn/blog/thong-so-ky-thuat-file-in), [printsimple](https://www.printsimple.eu/en/help/design-guidelines-roll-up-banners)). With a correct PDF, embedded subset fonts are enough; outlining is a defensive habit because many VN shops open PDFs in Illustrator/CorelDRAW, where non-outlined Vietnamese text can reflow or lose diacritics [P].
- **Spot colours / Pantone**: only if the job is printed with an extra ink (logo in Pantone, metallic, nhũ vàng on certificates, ép kim foil). Foil/emboss/spot-UV need a separate 100% K or spot layer named by the shop (e.g. "Foil") set to overprint [P]. For normal 4-colour work, convert spots to CMYK.
- **No security**, no RGB, no JPEG/PNG for offset (export PDF), "State final dimensions explicitly" ([indaiphat](https://indaiphat.vn/blog/thong-so-ky-thuat-file-in), [STI](https://www.sti-group.com/fileadmin/user_upload/sti-group.com/Documents_Dokumente/Technische_Richtlinien_DTP_Offset_EN.pdf)).

### 1.6 Paper types common in Vietnam and their effect

| VN name | What it is | Typical gsm / use | Effect on design |
|---|---|---|---|
| **Couche (C) bóng / mờ (matt)** | coated art paper | C100-C150: tờ rơi, brochure; C200-C250: catalogue cover, poster; **C300-C350**: danh thiếp, folder ([xuonginhanoi](https://xuonginhanoi.vn/giay-couches-phan-biet-giay-couches), [inlamhong](https://inlamhong.com/giay-couche-300gsm-c200-c150-cho-san-pham-in-an/)) | coated profile (Japan Color 2001 Coated); matt is writable, gloss is not -> **workbooks/handouts that people write on: couche mờ or Fort** |
| **Ivory** | single-side coated board | 210-400 gsm: hộp, bìa, thiệp, certificates | coated side behaves like couche; back is rougher |
| **Fort / Ford (offset, Bãi Bằng)** | uncoated woodfree | 70-100 gsm: ruột sách, workbook, giấy viết; 120-150 for handouts | **uncoated profile**, higher dot gain, duller and darker colours; avoid fine reversed text; keep TAC ≤ 300% (ideally ≤ 280%) [P] |
| **Kraft** | brown unbleached | 120-300 gsm: túi, tag, eco certificates | no white: colours darken/shift; white needs extra white ink; use bold shapes [P] |
| **Mỹ thuật (fine/textured, nhũ)** | specialty | 200-300 gsm: certificates, invitations, premium cards | textures break thin lines and small type; test before spot UV/foil [P] |
| **Formex, PP, Decal** | plastic sheets for standee/large format | see §5 | |

---

## 2. Print-ready CMYK PDF from HTML / Chrome (open-source toolchain)

### 2.1 What Chrome actually writes [V]

Rendered a test page in Chromium 141 headless (`page.pdf({preferCSSPageSize:true, printBackground:true})`):
- all colours are **DeviceRGB** operators (`0 0 0 rg` for `#000`, `.2 .2 .2 rg` for `#333`), no ICC, no TrimBox/BleedBox, `rgba()` becomes live transparency (`/ca .502`).
- fonts are embedded as CID TrueType subsets (Vietnamese OK).

### 2.2 The black-text trap [V]

Naive conversion

```bash
gs -q -dNOPAUSE -dBATCH -dSAFER -sDEVICE=pdfwrite -dCompatibilityLevel=1.6 \
   -sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK \
   -sOutputICCProfile=FOGRA39L_coated.icc -o out.pdf in_rgb.pdf
```

produced for `#000` text: **C72.2 M67.5 Y67.1 K88.2** (≈295% four-colour black) and for `#333`: C67.5 M63.1 Y62.7 K58.4. Adding `-sDefaultRGBProfile=srgb.icc -dRenderIntent=1` changed nothing. Small text in four colours = registration fringing. Ghostscript devs note DeviceRGB fills use PostScript-style conversion unless the source is ICC-based ([gs bug 698723 mirror](https://gs-bugs.ghostscript.narkive.com/XJlIZEO4/bug-698723-ghostscript-convert-rgb-pdf-to-cmyk-with-icc-profile-yields-wrong-black)).

`-dBlackText` / `-dBlackVector` exist but **force all text/vectors to black** (colours above an L* threshold go to white) ([Ghostscript Use](https://ghostscript.readthedocs.io/en/latest/Use.html)) -> not usable for colour designs.

**Working fix [V]**: Ghostscript maps **DeviceGray to pure K** by default when output is CMYK (`-dDeviceGrayToK`, [GS colour mgmt](https://ghostscript.readthedocs.io/en/latest/GhostscriptColorManagement.html)). So rewrite neutral RGB (r = g = b) to DeviceGray *before* conversion. Result: `#000` -> `0 g` (= K100 only), `#333` -> `0.2 g` (= K80 only), coloured fills converted by ICC, large black areas also become K100 (if you want rich black for a big solid area, give it a non-neutral colour such as `rgb(2,2,3)`: ICC turns it into ~C72 M68 Y67 K88 ≈ 295%, within a 300% limit) [V].

Note: `#333` -> K80 prints darker than it looks on screen (dot gain); use `#4d4d4d` (K70) or lighter for "grey text" [P].

### 2.3 Scripts (tested)

`neutral2gray.py` (pikepdf):

```python
#!/usr/bin/env python3
"""Rewrite neutral DeviceRGB colours (r==g==b) as DeviceGray so Ghostscript keeps
them on the K plate when converting to CMYK. Usage: python3 -I neutral2gray.py in.pdf out.pdf"""
import sys, pikepdf
from pikepdf import Operator

def fix(ops):
    out = []
    for operands, op in ops:
        name = str(op)
        if name in ("rg", "RG") and len(operands) == 3:
            r, g, b = (float(x) for x in operands)
            if max(r, g, b) - min(r, g, b) < 0.003:          # neutral grey/black
                out.append(([r], Operator("g" if name == "rg" else "G")))
                continue
        out.append((operands, op))
    return out

def walk_forms(res, seen):
    for _, xo in (res.get("/XObject") or {}).items():
        if xo.get("/Subtype") == "/Form" and xo.objgen not in seen:
            seen.add(xo.objgen)
            xo.write(pikepdf.unparse_content_stream(fix(pikepdf.parse_content_stream(xo))))
            if "/Resources" in xo:
                walk_forms(xo.Resources, seen)

pdf = pikepdf.open(sys.argv[1]); seen = set()
for page in pdf.pages:
    page.Contents = pdf.make_stream(
        pikepdf.unparse_content_stream(fix(pikepdf.parse_content_stream(page))))
    walk_forms(page.Resources, seen)
pdf.save(sys.argv[2])
```

`boxes.py` (sets TrimBox/BleedBox; page must already be trim + 2×bleed, e.g. CSS `@page { size: 216mm 303mm; margin:0 }` for A4 + 3 mm):

```python
"""python3 -I boxes.py in.pdf out.pdf BLEED_MM"""
import sys, pikepdf
mm = 72/25.4; b = float(sys.argv[3])*mm
pdf = pikepdf.open(sys.argv[1])
for p in pdf.pages:
    x0, y0, x1, y1 = [float(v) for v in p.MediaBox]
    p.TrimBox  = pikepdf.Array([x0+b, y0+b, x1-b, y1-b])
    p.BleedBox = pikepdf.Array([x0, y0, x1, y1])
pdf.save(sys.argv[2])
```

PDF/X definition file: copy Ghostscript's `lib/PDFX_def.ps` (here `/usr/share/ghostscript/10.02.1/lib/PDFX_def.ps`) and customise three lines ([GS VectorDevices](https://ghostscript.readthedocs.io/en/latest/VectorDevices.html)):

```bash
ICC=$PWD/JapanColor2001Coated.icc       # or FOGRA39L_coated.icc / PSOcoated_v3.icc
sed -e "s|(ISO Coated sb.icc)|($ICC)|" \
    -e "s|(CGATS TR001)|(JC200103)|" \
    -e "s|(Commercial and specialty printing)|(Japan Color 2001 Coated)|" \
    -e "s|/Title (Title)|/Title (Workbook)|" \
    /usr/share/ghostscript/*/lib/PDFX_def.ps > my_pdfx.ps
# identifiers: JC200103 (Japan Color 2001 Coated), JCN200104 (JC2001 Uncoated), FOGRA39, FOGRA51
```

### 2.4 Full pipeline: HTML (Chrome / Puppeteer / Paged.js) -> PDF/X-3 CMYK [V]

```bash
# 1) render: CSS @page size = trim + 2*bleed, margin 0, backgrounds extended into bleed
#    (Puppeteer/Playwright: page.pdf({path:'rgb.pdf', preferCSSPageSize:true, printBackground:true}))
# 2) neutrals -> gray, 3) add boxes
python3 -I neutral2gray.py rgb.pdf rgb_k.pdf
python3 -I boxes.py rgb_k.pdf rgb_kb.pdf 3
# 4) convert + PDF/X-3 (Ghostscript 10.02: -dPDFX is BOOLEAN; -dPDFX=3 crashes with /typecheck)
gs -q -dPDFX -dNOPAUSE -dBATCH -dSAFER --permit-file-read=$ICC \
   -sDEVICE=pdfwrite -sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK \
   -sOutputICCProfile=$ICC -o print_x3.pdf my_pdfx.ps rgb_kb.pdf
# 5) verify
pdffonts print_x3.pdf                     # emb=yes for every font
pdfimages -list print_x3.pdf              # colour=cmyk, x-ppi >= 300
gs -q -o - -sDEVICE=ink_cov print_x3.pdf  # average % C M Y K per page
```

Verified output: `GTS_PDFXVersion = PDF/X-3:2002`, `/Trapped /False`, PDF 1.3, OutputIntent `FOGRA39` with embedded profile, TrimBox 8.504 pt inset, BleedBox = MediaBox, fonts embedded subset, text `0 g` (K only).

**Caveats [V]**
1. **Transparency**: with any `rgba()`, `opacity`, `box-shadow`, `filter`, blend mode, or semi-transparent PNG on the page, Ghostscript's PDF/X-3 path **flattens the whole page into one 720 ppi CMYK image** (text becomes raster; fine for print quality, bad for editing/preflight "text as image"). Without transparency the page stays vector. Options: (a) design print HTML without transparency (bake shadows/overlays into images); (b) skip the PDF/X label and output plain CMYK PDF 1.6, which keeps live transparency [V] (most VN shops accept "PDF CMYK"); (c) use WeasyPrint `pdf/x-4` with care (below).
2. **PDF/X-4 in Ghostscript [?]**: current docs say `-dPDFX` "value should be 1, 3 or 4, default is 3" yet the same page later says "Ghostscript supports creation of PDF/X-1 and PDF/X-3 formats, other formats of PDF/X are not supported" ([GS VectorDevices](https://ghostscript.readthedocs.io/en/latest/VectorDevices.html)). On 10.02.1 only boolean `-dPDFX` works. Treat Ghostscript PDF/X-4 as unverified; test on your version.
3. **Images** are converted with the output ICC (perceptual by default; `-dRenderIntent=1` for relative colorimetric). Saturated RGB greens/blues/oranges will dull; soft-proof first.
4. Third-party advice that "PDF/X does not support transparency" ([doublej ref](https://github.com/doublej/claude-skills/blob/main/pdf/references/ghostscript-color-reference.md)) is true only for X-1a/X-3, not X-4.
5. No full open-source PDF/X validator exists (veraPDF does PDF/A, PDF/UA only). Final check = shop's RIP or Acrobat Pro Preflight [P].

### 2.5 Raster TIFF for large-format shops [V]

```bash
gs -q -dSAFER -dNOPAUSE -dBATCH -sDEVICE=tiff32nc -r300 -sCompression=lzw \
   -sOutputICCProfile=$ICC -dUseCropBox -o backdrop_1-10_300ppi.tif backdrop_1-10.pdf
```
Produces CMYK TIFF with embedded profile at the requested ppi. (`-dUseTrimBox` would crop the bleed.)

### 2.6 WeasyPrint 70.0 (2026-09-08) [V]

Changelog: v67.0 (2025-12-02) "Support CMYK colors, PDF/X, color profiles"; v69.0 replaced `--srgb` with `--output-intent=srgb|device-cmyk|<profile>` ([changelog](https://doc.courtbouillon.org/weasyprint/stable/changelog.html)). CLI `--pdf-variant` accepts `pdf/x-1a, pdf/x-3, pdf/x-4, pdf/x-5g` ([API ref](https://doc.courtbouillon.org/weasyprint/stable/api_reference.html)).

```css
@color-profile device-cmyk { components: cyan, magenta, yellow, black;
                             src: url(JapanColor2001Coated.icc); }
@page { size: A5; margin: 12mm; bleed: 3mm; marks: crop cross; }
body  { color: device-cmyk(0 0 0 1); }                 /* K100 text */
h1    { color: device-cmyk(0% 80% 90% 10%); }
.rich { background: device-cmyk(60% 40% 40% 100%); }   /* rich black area */
```
```bash
weasyprint --pdf-variant=pdf/x-4 page.html out.pdf
```
Test results:
- `device-cmyk()` written as DeviceCMYK `scn` exactly as specified (true K100 text) ✔
- `bleed: 3mm` -> MediaBox/BleedBox extended by 8.504 pt, **TrimBox = A5** ✔
- `marks: crop cross` drawn **inside the 3 mm bleed** and in **RGB** (`0 0 0 RG`) ✘ -> for PDF/X leave marks off.
- Any hex/`rgb()` colour stays **RGB** even under `pdf/x-1a` (WeasyPrint does not convert) ✘ -> every colour and image must be authored CMYK, or post-convert with Ghostscript.
- OutputConditionIdentifier was filled with the profile's description text, not a registered ID [?].
- Open bug: transparency groups always DeviceRGB, "violating PDF/X-4", workaround = pikepdf patch ([#2723](https://github.com/Kozea/WeasyPrint/issues/2723)).
- WeasyPrint itself: "generated documents are not guaranteed to be valid" ([API ref](https://doc.courtbouillon.org/weasyprint/stable/api_reference.html)).

### 2.7 Paged.js

Supports `@page { bleed: 3mm; marks: crop cross; }` in Chrome ([pagedjs docs](https://pagedjs.org/documentation/5-web-design-for-print/)); output is still Chrome RGB PDF -> apply §2.4 pipeline. Paged.js draws marks outside the trim inside its own enlarged sheet; when using its marks, the page box math differs, so set boxes accordingly [P].

### 2.8 Recommended toolchain [P]

| Product | Path |
|---|---|
| Handouts/workbooks/certificates (text-heavy, opaque) | HTML + Chrome -> neutral2gray -> boxes -> Ghostscript PDF/X-3 (Japan Color 2001 Coated or Uncoated) |
| Pieces needing live transparency | Chrome -> neutral2gray -> Ghostscript CMYK PDF 1.6 (no X label), or WeasyPrint with all-`device-cmyk` CSS + PDF/X-4 + pikepdf group fix |
| Large format | HTML at 1:10 -> Chrome PDF (vector) -> Ghostscript CMYK PDF; plus CMYK TIFF via `tiff32nc` if the shop asks for "file ảnh" |
| LED / projector | RGB PNG at exact pixel map / MP4 H.264 (no CMYK) |

---

## 3. Standard sizes

### 3.1 ISO 216 / JIS (mm)

| A | size | B (ISO) | size |
|---|---|---|---|
| A0 | 841 × 1189 | B4 | 250 × 353 |
| A1 | 594 × 841 | B5 | 176 × 250 |
| A2 | 420 × 594 | JIS B5 | 182 × 257 [?] (copy shops in VN sometimes mean JIS when they say "B5") |
| A3 | 297 × 420 | | |
| A4 | 210 × 297 | | |
| A5 | 148 × 210 | | |
| A6 | 105 × 148 | | |

### 3.2 Vietnam product sizes

| Product | Common sizes | Notes & sources |
|---|---|---|
| **Name card (danh thiếp)** | **90 × 54 mm** (VN standard); 90 × 50 also seen; 90 × 55 [?] some shops; US 88.9 × 50.8; UK 85 × 55 | file 96 × 60 with 3 mm bleed ([inansaigon](https://inansaigon.vn/tin-tuc/kich-thuoc-card-visit-mm), [indaiphat](https://indaiphat.vn/blog/thong-so-ky-thuat-file-in)); paper C300/C350 or mỹ thuật |
| Flyer (tờ rơi) | A5 148 × 210, A4 210 × 297 | C120-C150 |
| Brochure | A4 tri-fold -> 99 × 210 folded, panels 100/100/97 | §1.1 |
| Certificate (giấy chứng nhận, giấy khen) | A4 297 × 210 landscape (most), A3 420 × 297; also 36 × 23.7 cm, 29 × 19, 21 × 15 cm for training certificates | ([insacmau](https://insacmau.com/blog/kich-thuoc-giay-khen/)); state-award bằng khen follow government templates, not needed for training certs [?] |
| Poster | A3, A2, A1, **60 × 90 cm** (very common), 40 × 60, 50 × 70, 70 × 100 | ([printgo](https://printgo.vn/kich-thuoc-poster-v1121)) |
| **X-standee (chữ X)** | **60 × 160**, **80 × 180** cm | 4 corners eyelets: leave corners clear ([innhanhthudo](https://innhanhthudo.com/tin-tuc/file-thiet-ke-standee-chuan), [instandee](https://instandee.com/kich-thuoc-standee/)) |
| **Roll-up (standee cuốn)** | **80 × 200**, 85 × 200, 100 × 200, 120 × 200 (also 60 × 160, 80 × 180) | bottom 7-10 cm rolls into base, avoid key content in last 15 cm ([innhanhthudo](https://innhanhthudo.com/tin-tuc/file-thiet-ke-standee-chuan)); top 10 mm rail, bottom 40 mm ([printsimple](https://www.printsimple.eu/en/help/design-guidelines-roll-up-banners)); UK: 70-100 mm hidden ([theprintwarehouse](https://theprintwarehouse.uk/blog/roller-banner-dimensions)). **Always get the shop's template**: some print 200 cm visible + hidden extra, others count hidden part inside 200 [?] |
| A-frame / desk standee | 60 × 90 (A1), 85 × 120 (A0); desk 20 × 30, 25 × 35, 30 × 40 cm | ([instandee](https://instandee.com/kich-thuoc-standee/), [fbcasean](https://fbcasean.vn/kich-thuoc-standee-chuan-hien-nay-ban-nen-biet/)) |
| Handheld banner | 15 × 45, 20 × 50 cm on C300 | ([inananh](https://inananh.com/kich-thuoc-banner-backdrop-hiflex)) |
| Hiflex roll widths | 1.2, 1.5, 2.2, 2.8, **3.2 m** (50 m rolls); larger = ghép (seamed) | design to roll width to avoid waste ([inananh](https://inananh.com/kich-thuoc-banner-backdrop-hiflex), [kienanphat](https://kienanphat.net/in-kho-lon-tren-chat-lieu-bat-hiflex-pp-decal-canvas-2273.html)) |
| Photo wall / check-in | **2.5 × 2.3 m** (most common), 3 × 2.5 m; step-and-repeat US: 8 × 8 ft (2.4 × 2.4 m) default, 10 × 8 ft | ([nhomin](https://nhomin.com.vn/kich-thuoc-backdrop-su-kien/), [4over4](https://www.4over4.com/guide/backdrop-banners-sizes-and-setup-guide)) |
| Stage backdrop (phông sân khấu) | conference 4 × 2.5, 5 × 3, **6 × 3 m**; larger stage 3 × 4, 4 × 6, 5 × 8 m; hội thảo/sân khấu 2.5 × 3.2 | ([thegioibackdrop](https://thegioibackdrop.com/nguyen-tac-thiet-ke-backdrop), [quangcaoata](https://quangcaoata.com/kich-thuoc-backdrop/), [nhomin](https://nhomin.com.vn/kich-thuoc-backdrop-su-kien/)). VN sources mix "W × H" and "H × W"; always write **ngang × cao** [?] |
| Badge / thẻ đeo | **9 × 13 cm**, 9 × 12, 7 × 11, 10 × 14 cm; card-size 54 × 86 mm | ([brandboost](https://brandboost.vn/the-ban-to-chuc-su-kien/)); sleeves sold as 9.5 × 13.5 / 9 × 14 cm, so make the insert ~2-5 mm smaller than the sleeve and measure [P]; lanyard 10-20 mm |
| Table tent / bảng tên để bàn | conference 6 × 15 or 6 × 18 cm; director 8 × 24 / 10 × 30 cm (mica chữ A) | ([indongloi](https://indongloi.com/kich-thuoc-bang-ten-de-ban/)); paper tent: A4 folded is a common DIY [P] |
| Workbook / sách | A5, B5 (17.6 × 25), A4; VN book trims 13 × 19, 14.5 × 20.5, **16 × 24** (academic), 17 × 24, 19 × 26.5 | ([printgo](https://printgo.vn/kich-thuoc-sach-v4589), [inkythuatso](https://inkythuatso.com/kich-thuoc/kich-thuoc-sach-4390.html)) |

### 3.3 Stage backdrop and photo wall layout rules

Sources give only qualitative rules ("position logos where they won't be hidden by speakers, podiums, or people", viewers have "3-5 seconds", sans-serif, high contrast, [thegioibackdrop](https://thegioibackdrop.com/nguyen-tac-thiet-ke-backdrop)). Quantified synthesis **[P]** for a backdrop of height H on a stage 0.4-0.8 m high:
- **Bottom ~1.7 m above stage floor is occupied** by standing people; a podium (bục phát biểu) is ~1.1-1.2 m tall. For H = 3 m, that is the bottom 55-60%. Keep this zone to background texture/colour only.
- **Event title, logo, date in the top 40%** (from ~1.8 m up to ~0.2 m below the top edge), centred or offset away from the podium side; repeat the logo near the podium height on the podium itself (logo bục).
- If an LED screen sits in the middle, the printed backdrop is only the side wings and header: put the title band above the LED.
- Wide event photos are cropped 3:2 / 16:9 around people's heads: the most photographed band is ~1.5-2.5 m above stage floor.
- Top 10-20 cm can be hidden by truss/lighting/khung: keep safe.
- Hiflex: request **matte / đế xám (grey-back) blockout**; glossy hiflex causes flash hot spots ([thegioibackdrop](https://thegioibackdrop.com/nguyen-tac-thiet-ke-backdrop), [4over4](https://www.4over4.com/guide/backdrop-banners-sizes-and-setup-guide), [inananh](https://inananh.com/kich-thuoc-banner-backdrop-hiflex)).
- Seams (ghép bạt) on > 3.2 m pieces: keep faces, logos and text away from seams [P].

Step-and-repeat ([4over4](https://www.4over4.com/guide/backdrop-banners-sizes-and-setup-guide)): logos **8-12 in (20-30 cm) wide**, gap ≈ half a logo width, **stagger every other row by half a tile**, live art ≥ 3 in (7.5 cm) inside edge, matte material, build at 1:10 at 1500 dpi (150 ppi full size). For a 2.5 × 2.3 m wall that gives roughly 5-6 columns × 6-7 rows [P].

---

## 4. LED stage screens

### 4.1 Pixel pitch, cabinets, resolution

**px_width = W_mm / pitch_mm, px_height = H_mm / pitch_mm**, rounded to whole cabinets. Nominal pitch names are rounded: 500/128 = 3.906 ("P3.91"), 500/192 = 2.604 ("P2.6"), 500/168 = 2.976 ("P2.97"), 500/104 = 4.808 ("P4.81").

| Pitch | Module / cabinet | px per unit | Source |
|---|---|---|---|
| P3.91 (rental, most common for events) | cabinet 500 × 500 / 500 × 1000 mm; module 250 × 250 | 128 × 128 / 128 × 256; module 64 × 64 | [colorlitled](https://www.colorlitled.com/p3-91-led-display/) |
| P2.6 / P2.97 | cabinet 500 × 500 | 192 × 192 / 168 × 168 | [atop-led](https://atop-led.com/P2-6-Indoor-500x500mm-Led-Cabinet-Rental-Led-Display-Screen-pd45401944.html), [leeman](https://leemanledscreen.com/product/p2-976-led-video-wall-rental-indoor-led-panel-display-screen-500mmx500mm-rental-led-cabinet/) |
| P4.81 | cabinet 500 × 500 | 104 × 104 | computed [P] |
| P3 (fixed indoor, restaurants/halls in VN) | module **192 × 192 mm** | **64 × 64**; a 576 × 576 cabinet (3×3 modules) = 192 × 192 px [P] | [led68](https://www.led68.vn/kich-thuoc-man-hinh-led-p3-va-do-phan-giai-man-hinh-led-p3) |
| P2.5 (fixed indoor) | module **320 × 160 mm** | **128 × 64** | [thienhop](https://thienhop.com/module-led-p2-5-trong-nha/) (size), px computed |

Worked examples [P]:
| Wall | P3.91 (500 cab) | P2.6 | P4.81 | P3 fixed |
|---|---|---|---|---|
| 6 × 3 m (12 × 6 cab) | **1536 × 768** (2:1) | 2304 × 1152 | 1248 × 624 | 1984 × 1024 (31 × 16 mod = 5.95 × 3.07 m) |
| 5 × 3 m (10 × 6) | 1280 × 768 (5:3) | 1920 × 1152 | 1040 × 624 | |
| 4 × 2.5 m (8 × 5) | 1024 × 640 (8:5) | 1536 × 960 | 832 × 520 | |
| 16:9 example | 7 × 4 m -> 14 × 8 cab = 1792 × 1024 (≈ 7:4) | | | 20 × 15 modules = 3.84 × 2.88 m [S, led68] (note: this is 4:3, not 16:9 as led68 states [?]); 1920 × 1080 needs 5.76 × 3.24 m |

Viewing distance: P3.91 "4 m - 40 m" ([colorlitled](https://www.colorlitled.com/p3-91-led-display/)); rule of thumb minimum distance (m) ≈ pitch (mm), comfortable ≈ 2-3 × [P]; 4Wall cautions there is no definitive formula ([4wall](https://www.4wall.com/blog/2025/10/31/pixel-perspectives-a-guide-to-led-pixel-pitch)). Brightness indoor 600-1000 nit, refresh 1920-7680 Hz (higher is better for cameras) ([colorlitled](https://www.colorlitled.com/p3-91-led-display/)).

**Important: LED walls are rarely 16:9.** Always ask the rental company for the **pixel map (e.g. 1536 × 768)** and design at exactly that size; the processor (NovaStar etc.) will otherwise scale 1920 × 1080 into it, distorting or letterboxing.

### 4.2 Content design guidance

| Rule | Source |
|---|---|
| Match content to native resolution & aspect; or 2× native for downscaled sharpness | [dynamo-led](https://dynamo-led-displays.co.uk/led-video-codecs-formats-bitrates/), [nmrevents](https://www.nmrevents.com/post/led-content-best-practices) |
| RGB colour space, never CMYK | [dynamo-led](https://dynamo-led-displays.co.uk/led-video-codecs-formats-bitrates/) |
| MP4 + H.264 (H.265 for 4K); 1080p 8-15 Mbps (≤ 20 high motion), 4K 25-50 Mbps; VBR | [dynamo-led](https://dynamo-led-displays.co.uk/led-video-codecs-formats-bitrates/) |
| 25/30 fps (no interlace) or 30/60; constant frame rate; MP4 H.264 12-15 Mbps typical | [advision](https://www.advision.digital/2026/04/21/requirements-led-screen-content/), [nmrevents](https://www.nmrevents.com/post/led-content-best-practices) |
| Safe zone 5-7% from each edge | [advision](https://www.advision.digital/2026/04/21/requirements-led-screen-content/) |
| High contrast (white on dark blue good, white on yellow bad); bold simple shapes; avoid intricate detail; no strobe; fine geometric patterns cause moiré; dither gradients to avoid banding | [advision](https://www.advision.digital/2026/04/21/requirements-led-screen-content/), [nmrevents](https://www.nmrevents.com/post/led-content-best-practices) |
| Black = LEDs off: dark backgrounds look "transparent"/deep and reduce glare on speakers and on camera; avoid full-white fills (blinding, washes out faces, power) | [P] (widely practised; operators may cap bright fills [advision]) |
| Text ≥ ~24-32 px cap height on P3.91 walls, strokes ≥ 2-3 px, no hairlines/serifs at small sizes | [P] |
| Keep key info in the **upper 2/3**: the bottom edge (usually 0.6-1 m above stage floor) is blocked by presenters and by audience heads from rows 5+ | [P] |
| Stills: PNG (lossless, exact pixel map) or high-quality JPEG | [dynamo-led](https://dynamo-led-displays.co.uk/led-video-codecs-formats-bitrates/) |
| Projector: 1920 × 1080 (16:9); many hotel ballroom projectors are WUXGA 1920 × 1200 (16:10) [?] - ask venue | [P] |

---

## 5. Large-format files

- **Scale**: design at **1:10** (also 1:5, 1:2) - VN designers' forum consensus ([vietdesigner forum](https://forum.vietdesigner.net/threads/hoi-ve-ti-le-size-khi-thiet-ke-backdrop-co-lon.70973/)); 1:10 at 300 ppi = 30 ppi full size (see §1.3 for when this is too low). Label the file: `Backdrop_6000x3000mm_TL1-10_CMYK.pdf`.
- **PDF page limit**: 14,400 units = **200 × 200 in (5.08 m)**; beyond that you need UserUnit (PDF 1.6), which Adobe apps don't write; recommended workaround: design at 1/2, 1/4, 1/10 and let the RIP scale ([Caldera](https://helpdesk.caldera.com/hc/en-us/articles/360019375414-How-to-bypass-the-PDF-maximum-size), [BFO](https://bfo.com/blog/2018/03/22/how_to_create_very_very_large_pages_in_pdf/)). A 6 m or 8 m backdrop **cannot** be a 1:1 standard PDF.
- **Vector preferred**: logos AI/EPS/PDF vector ([thegioibackdrop](https://thegioibackdrop.com/nguyen-tac-thiet-ke-backdrop)); HTML->Chrome PDF keeps text/shapes vector, so only embedded photos need ppi checks.
- **Formats VN shops accept**: PDF, AI, **CDR (CorelDRAW, very common in VN sign shops)**, TIFF (best quality, large), JPG max quality; "hỏi trước bên kia có phần mềm đọc file" ([medium/ngovang](https://medium.com/@ngovang082017/th%C3%B4ng-s%E1%BB%91-chu%E1%BA%A9n-in-b%E1%BA%A1t-hiflex-%C4%91%E1%BA%B9p-495bbab0ac4d), [indepanhduong](https://indepanhduong.com/tu-van/lua-chon-dinh-dang-file-in-an.html)); "PDF/X-1a" for large format ([inananh](https://inananh.com/kich-thuoc-banner-backdrop-hiflex)). Outline fonts in AI/CDR.
- **Colour**: solvent/eco-solvent inkjet CMYK on hiflex has a gamut and white point different from offset; the RIP uses its own media profile, so the embedded offset profile is only an intent. Expect dull bright oranges/greens/blues and slightly darker overall; colours vary per shop -> "test prints recommended" ([medium/ngovang](https://medium.com/@ngovang082017/th%C3%B4ng-s%E1%BB%91-chu%E1%BA%A9n-in-b%E1%BA%A1t-hiflex-%C4%91%E1%BA%B9p-495bbab0ac4d)). For brand-critical colours, ask for an in thử (test strip) [P].
- **File weight**: 6 × 3 m at 100 ppi = 23,622 × 11,811 px ≈ 279 MP ≈ 1.1 GB uncompressed CMYK 8-bit [P computed] -> another reason for 1:10 vector PDF.

**Materials** ([kienanphat](https://kienanphat.net/in-kho-lon-tren-chat-lieu-bat-hiflex-pp-decal-canvas-2273.html), [thegioibackdrop](https://thegioibackdrop.com/nguyen-tac-thiet-ke-backdrop), [inananh](https://inananh.com/kich-thuoc-banner-backdrop-hiflex)):
| Material | Width | Use | Notes |
|---|---|---|---|
| Hiflex (bạt) | up to 3.2 m, 50-80 m long; seam for larger | backdrop, banner, outdoor | cheap, weatherproof, glare under flash; 0.36 mm std; đế xám blocks light |
| PP (có keo / không keo) | 0.914-1.52 m | posters, standee, roll-up | better image quality; indoor water-based / outdoor oil-based ink |
| Decal (sữa, trong, lưới) | ≤ 1.52 m | glass, stickers, boards | |
| Canvas / vải | | premium indoor backdrop | no glare, best for photos |
| Formex 5 mm | | rigid standee/mô hình | |

---

## 6. Typography for print and stage

### 6.1 Distance legibility

- **1 inch of capital height per 10 ft** (≈ 1 cm per 3 m). SignTeam calls this the *effective* distance ("registers without effort") ([signteam](https://signteam.us/sign-letter-size-rule/)); Pannier calls 10 ft the *maximum readable* distance and says comfortable reading is 30-50% shorter ([pannier](https://www.panniergraphics.com/blog/letter-height-visibility-chart-for-outdoor-sign-readability)) [?]. Use the conservative reading:
  - **max legible: cap height (cm) = distance (m) / 3**
  - **comfortable: cap height (cm) = distance (m) / 1.5-2**

| Item | Distance | Min cap height (max) | Recommended cap height |
|---|---|---|---|
| Roll-up headline | 3 m | 1 cm | 2-3 cm; headline 6-10 cm |
| Poster A1 | 2 m | 0.7 cm | 1-1.5 cm body |
| Backdrop secondary text (date, venue) | 15 m (back row) | 5 cm | 8-10 cm |
| Backdrop title | 15-25 m | 5-8 cm | 20-40 cm |
| Hanging banner | 20 m | 7 cm | 12-15 cm |
- Cap height ≈ 0.7 × font size for most sans fonts: 1 cm cap ≈ 40 pt [P].

### 6.2 Handouts / workbooks [P]
- Body **10-11 pt** (serif or humanist sans); 12 pt for older learners or writing-heavy workbooks; captions ≥ 8 pt (≥ 9 pt on Fort).
- Leading **130-150%** for Vietnamese (accented capitals "pose a challenge for leading because of the limit of space", [vietnamesetypography](https://vietnamesetypography.com/design-challenges/)); headings in ALL CAPS need extra line spacing (stacked marks Ấ Ầ Ẩ Ẫ Ậ).
- Line length 55-75 characters; write-in lines spaced ≥ 8 mm.
- Use fonts with real Vietnamese support (precomposed + well-positioned stacked marks): e.g. Be Vietnam Pro, Inter, Noto Sans/Serif, Lora, Montserrat, Source Serif; test the string "Ỹ Ỗ Ặ ậ ẫ ữ ợ Ấn Ẩm Ễ" before committing (rendered correctly in the Chrome and WeasyPrint tests here [V]). Avoid fonts that fake Vietnamese by fallback (mixed glyphs in one word) ([vietnamesetypography](https://vietnamesetypography.com/)).
- Diacritics must not collide with neighbours; tone marks must be as strong as the base letter ([vietnamesetypography](https://vietnamesetypography.com/design-challenges/)) -> avoid ultra-light weights under 10 pt and reversed thin type.

---

## 7. Preflight checklist

Acrobat Pro: *Print Production > Preflight > PDF/X compliance > "Verify compliance with PDF/X-1a / PDF/X-4"*, and Output Preview (separations, TAC highlight) [P, standard Acrobat workflow]; GWG profiles (Ghent Workgroup GWG2015/2022) add stricter checks ([gwg.org](https://gwg.org/pdf-x-workflow/)).

Open-source equivalents [V]:
| Check | Command / method | Pass criterion |
|---|---|---|
| Page size, trim, bleed | `python3 -c "import pikepdf;p=pikepdf.open('f.pdf');pg=p.pages[0];print(pg.MediaBox,pg.TrimBox,pg.BleedBox)"` | TrimBox = finished size; BleedBox = trim + 3 mm (8.504 pt) |
| PDF/X marker + output intent | `pikepdf`: `docinfo['/GTS_PDFXVersion']`, `Root.OutputIntents[0].OutputConditionIdentifier` | e.g. `PDF/X-3:2002`, `JC200103`/`FOGRA39` |
| Fonts embedded | `pdffonts f.pdf` | `emb = yes` everywhere |
| Image colour & ppi | `pdfimages -list f.pdf` | `cmyk` (or gray), x-ppi ≥ 300 small format / per §1.3 |
| No RGB left | `qpdf --qdf --object-streams=disable f.pdf q.pdf; grep -a -E ' (rg|RG)$' q.pdf` | no hits (only `k`, `g`, `scn` in CMYK/Separation) |
| Black text is K-only | in q.pdf look for `0 g` / `0 0 0 1 k` on text; no `0.72 0.67 0.67 0.88 k` | |
| TAC | `gs -q -dSAFER -o tac.tif -sDEVICE=tiff32nc -r50 f.pdf` then Python: `max(sum(CMYK))*100/255` | ≤ profile limit (≤ 300% safe) |
| Average ink | `gs -q -o - -sDEVICE=ink_cov f.pdf` (`inkcov` gives *fraction of pixels covered*, not ink amount) | |
| Transparency | ExtGState with `/ca`<1, `/SMask`, `/BM` | none for X-1a/X-3 |
| Visual | `pdftoppm -r 100 -png f.pdf proof` | check bleed fill, safe zone, diacritics |

Manual checklist (designer):
1. Final size stated (ngang × cao), orientation, quantity, paper, finishing (cán màng, bế, gấp, ép kim).
2. Bleed 3 mm (small) / 5 cm (hiflex) / per template (standee).
3. Safe zone respected; nothing important near folds, eyelets, roll-up bottom 15 cm, X-standee corners.
4. CMYK, correct profile, TAC ≤ limit; no RGB, no Lab, no stray spot colours.
5. Black text/thin lines K100 + overprint; rich black only on large areas; white not set to overprint.
6. Lines ≥ 0.25 pt; type ≥ 6 pt (8-9 pt reversed); Vietnamese ≥ +1 pt.
7. Images ≥ required ppi at final size; no upscaled low-res images.
8. Fonts embedded (and outlined if delivering AI/CDR).
9. PDF/X-1a / X-3 / X-4 as requested, no security, single pages (not spreads) unless asked, one file per product.
10. Proof: soft proof on screen with the profile, then in thử / ký duyệt bản in mẫu for colour-critical work.

---

## 8. Uncertainties and gaps

- **Japan Color 2001 Coated as VN default** rests on VN blog/shop sources, not a national standard; individual shops may use FOGRA39 or their own press profile. Ask.
- **Ghostscript PDF/X-4**: docs contradict themselves; 10.02.1 supports only boolean `-dPDFX` (= X-3). Not verified on newer versions.
- **PDF/X validity** of the Ghostscript/WeasyPrint outputs was checked structurally (markers, intent, boxes, fonts, colour operators) but not with a certified validator (Acrobat/callas pdfToolbox).
- **Roll-up hidden zone**: 4-15 cm depending on stand; whether 200 cm includes it varies by shop.
- **Name card 90 × 55** vs 90 × 54: sources mostly say 90 × 54; 90 × 55 appears but less authoritative.
- **Letter-height rule**: sources disagree whether 1 in/10 ft is max or comfortable; table uses the conservative interpretation.
- **Backdrop safe zones** and **LED text-pixel minimums** are practitioner synthesis, not standards.
- **Badge sizes**: sleeve vs insert dimensions vary by supplier.
- **ppi formula constant**: pixelcraft's metric constant (8595) inconsistent with 3438 × 2.54 = 8733; report uses 8733 / d_cm ≈ 87 / d_m.
- The JIS vs ISO meaning of "B5" in VN copy shops not confirmed.
- Japan Color 2001 Coated ICC file on Linux: comes from Adobe ICC Profiles (bundling license allows redistribution, [Adobe](https://www.adobe.com/support/downloads/iccprofiles/icc_eula_win_dist.html); openSUSE `AdobeICCProfiles` package). Tests here used FOGRA39L_coated.icc (TeX Live colorprofiles) because the Adobe file was not present.
