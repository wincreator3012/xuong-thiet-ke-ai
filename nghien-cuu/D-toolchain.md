# D. Toolchain validation for the AI design workspace

Research date: 2026-10-06. Sandbox: Ubuntu 24.04 (noble) x86_64, 2 vCPU, 8 GB RAM, no GPU.
Tests were run in a temporary research sandbox; the test scripts named below (t1/ to t9/) are not shipped with this repo.
"TESTED" = run in this sandbox with the output quoted. "NOT TESTED" = from documentation only.

---

## 0. Versions found (current as of 2026-10-06)

| Component | Sandbox | Latest upstream | License |
|---|---|---|---|
| Playwright (Python and npm) | 1.56.0 | 1.63.0 (PyPI 2026-09-15) | Apache-2.0 |
| Chromium bundled with PW 1.56 | 141.0.7390.37 (`chromium-1194`, plus `chromium_headless_shell-1194`) | n/a | BSD |
| Ghostscript | 10.02.1 (apt, noble) + **10.08.0 built from source here** | 10.08.0 (2026-09-08), Homebrew stable 10.08.0 | AGPL-3.0-or-later |
| WeasyPrint | 70.0 (pip) | 70.0 (2026-09-08) | BSD-3-Clause |
| pikepdf | 10.13 | 10.16.0 | MPL-2.0 |
| Pillow | 12.3.0 | 12.3.0 | MIT-CMU (HPND) |
| OpenCV (contrib) | 5.0.0.93 | 5.0.0.93 | Apache-2.0 |
| scikit-image | 0.26.0 | 0.26.0 | BSD-3 |
| MediaPipe | 0.10.32 | 1.0.1 | Apache-2.0 |
| rembg | 2.0.85 | 2.0.85 (2026-09-20) | MIT (models vary, see 5.3) |
| pillow-heif | 1.8.0 (libheif 1.23.4, x265 encoder, libde265 decoder) | 1.8.0 | BSD-3 (wheel bundles LGPL/GPL codecs, see 8) |
| psd-tools | 1.23.0 | 1.23.0 (2026-10-01) | MIT |
| pytoshop | - | 1.2.1 (2018-11-30, unmaintained) | BSD |
| ag-psd (npm) | 31.0.2 | 31.0.2 | MIT |
| PptxGenJS | 4.0.1 | 4.0.1 (last publish 2025-06) | MIT |
| Moveable | 0.53.0 | 0.53.0 (last publish 2023-12-03) | MIT |
| Selecto | 1.26.3 | 1.26.3 (2023-12) | MIT |
| interact.js | 1.10.28 | 1.10.28 (2026-08) | MIT |
| GrapesJS | - | 0.23.6 (2026-08) | BSD-3-Clause |
| Konva / Fabric | - | 10.7.1 / 7.4.0 | MIT / MIT |
| Polotno | - | 4.15.3 | **Commercial** (60-day eval, subscription for any production use, including internal tools) |
| @fontsource/be-vietnam-pro | 5.3.0 | 5.3.0 | OFL-1.1 |

---

## 1. Raster export: exact PNG/JPG with Playwright and with Chrome on macOS

Tests: `t1/render.py`, `t1/template.html`, `t1/spec.json`, `t1/maxsize.py`, `t2/cdp_pipe_render.py`.

### 1.1 Playwright: what works (TESTED)

```python
ctx  = await browser.new_context(viewport={'width': W, 'height': H}, device_scale_factor=2)
page = await ctx.new_page()
await page.goto(template_url)
await page.evaluate('([s,k]) => renderDesign(s,k)', [spec, fmt])   # fills content, loads fonts, fits text
await page.locator('#canvas').screenshot(path='out@2x.png', animations='disabled', scale='device')
```

Results for one template rendered to 5 formats at DSF 2 (all exact):

```
ig-portrait (2160, 2700)  square (2160, 2160)  story (2160, 3840)  landscape (3840, 2160)  og (2400, 1256)
~0.25-0.5 s per format after the browser is up
```

Findings:

- **Font waiting.** `document.fonts.ready` alone is not enough when fonts are split by `unicode-range` (Fontsource/Google Fonts Vietnamese subsets): a subset only starts loading after layout needs it. Do this before the screenshot (tested; all 6 subset faces reported `loaded`):
  ```js
  const txt = Object.values(spec.content).join(' ');
  await Promise.all([document.fonts.load('400 16px "Be Vietnam Pro"', txt),
                     document.fonts.load('700 16px "Playfair Display"', txt)]);
  await document.fonts.ready;
  ```
- **Transparent PNG**: `page.screenshot(omit_background=True)` plus `html, body, .canvas { background: transparent }` gives RGBA with alpha 0 (tested: corner pixel `(0,0,0,0)`).
- **JPG**: `type='jpeg', quality=92` works, but Chromium encodes **4:2:0 chroma subsampling** (tested with `JpegImagePlugin.get_sampling` = 2). Colored text gets soft edges. Recommendation: **capture PNG only, then encode JPG once in Pillow** with `quality=90-92, subsampling=0` (4:4:4).
- **ICC**: Chromium PNG screenshots have **no iCCP/sRGB chunk** (tested: chunks `IHDR, IDAT, IEND`). Chromium JPEGs do embed a 456-byte sRGB profile. Embed sRGB yourself:
  ```python
  from PIL import Image, ImageCms
  SRGB = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()   # 588 B, "sRGB built-in" (lcms)
  im = Image.open('out@2x.png'); im.load()
  im.save('out@2x.png', 'PNG', icc_profile=SRGB, optimize=True)
  im.convert('RGB').save('out@2x.jpg', 'JPEG', quality=92, subsampling=0, icc_profile=SRGB, dpi=(144,144), optimize=True)
  ```
  For a canonical profile instead of the lcms built-in one, use `sRGB_v4_ICC_preference.icc` or `sRGB2014.icc` from the ICC (licence permits embedding and redistribution; present in Ubuntu package `icc-profiles`).
- **Color management of the renderer**: launch with `--force-color-profile=srgb` so the output never depends on a monitor profile (matters on macOS).
- **Max size (TESTED)**: output up to 10000 x 10000 device px (100 MP) is correct. **12000 x 12000 (144 MP) and larger return a full-size PNG that is blank in the lower-right** with no error. 3000 x 17000 (51 MP) is fine, so the limit is area, not one side. Rule: keep W x H x DSF² <= ~100 MP; for posters use the PDF path or tile with `clip`.
- `text-wrap: balance`, `text-wrap: pretty`, container query units (`cqw/cqh/cqmin`) are all supported in Chromium 141 (tested with `CSS.supports`).

### 1.2 Chrome headless on macOS: CLI flags and a real problem (TESTED on Linux Chrome 141)

The plain CLI:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --hide-scrollbars --force-color-profile=srgb \
  --force-device-scale-factor=2 --window-size=1080,1350 \
  --virtual-time-budget=5000 --screenshot=/abs/out.png file:///abs/design.html

"$CHROME" --headless --no-pdf-header-footer --virtual-time-budget=5000 \
  --print-to-pdf=/abs/out.pdf file:///abs/design.html          # honours @page size and prints backgrounds (tested)

# transparent PNG
"$CHROME" --headless --default-background-color=00000000 --screenshot=/abs/out.png ...   # tested: RGBA, alpha 0
```

Notes:
- `--headless` and `--headless=new` are the same thing now; since Chrome 132 the old headless only exists as the separate `chrome-headless-shell` binary (developer.chrome.com). `--headless=old` on Chrome 141 silently behaves like new.
- On Linux, add `--no-sandbox` only when running as root.
- **Bug (TESTED): with `--screenshot --window-size=W,H` the viewport is 87 CSS px shorter than H** (the screenshot is W x H but the bottom 87 px are blank, and content below H-87 is cut). Same with DSF 1 and 2, and with `--headless=new|old`. `chrome-headless-shell` is exact. Workarounds: `--window-size=1080,1437` then crop the top 1350 px (works here, but the offset is platform dependent; Cypress reports 79 px on another setup), or better:
- **Recommended for macOS: drive Chrome over CDP with `--remote-debugging-pipe`, stdlib only.** `t2/cdp_pipe_render.py` (~90 lines, no dependencies) launches Chrome, calls `Emulation.setDeviceMetricsOverride {width,height,deviceScaleFactor}`, awaits `document.fonts.ready` + 2 rAF, then `Page.captureScreenshot {clip, format, quality}` or `Page.printToPDF {preferCSSPageSize:true, printBackground:true}`. TESTED with the full Chrome binary: PNG 2160 x 2700 exact (lime marker in the bottom-right corner present), JPG, transparent PNG via `Emulation.setDefaultBackgroundColorOverride {a:0}`, PDF with @page size. 0.86 s per render including browser start.
  - Gotcha found while testing: Chrome reads CDP on fd 3 and writes on fd 4. In `preexec_fn`, `dup()` both pipe ends to high fds first, then `dup2` onto 3 and 4, and pass `close_fds=False`; otherwise `dup2(4,4)` is a no-op that leaves FD_CLOEXEC set and Chrome exits immediately.
  - `preexec_fn` works on macOS and Linux (not Windows).
- Alternative on macOS: `pip install playwright` and launch with `channel="chrome"` (uses installed Google Chrome, no browser download) or `playwright install chromium-headless-shell`. Viewport emulation via CDP is exact in both cases.
- Cross-platform risk (NOT TESTED on macOS): glyph rasterisation/hinting differs between Linux and macOS, which can move a line break by one word. Use the same webfont files everywhere (never system fonts), and let the fit-text routine re-check after layout. Compare line counts between the sandbox and the Mac for each template once.

---

## 2. Print PDF from Chromium, crop marks, CMYK PDF/X

Tests: `t3/print.html`, `t3/mkpdf.py`, `t3/pagesize.py`, `t3/rgbblack2gray.py`, `t3/conv.sh`, `t3/pdfcolors.py`, `t3/print_pipeline.py` (integrated), `t4/wp_full.html` (WeasyPrint).

### 2.1 Chromium page.pdf (TESTED)

```css
/* trim A5 148x210, bleed 3, slug 10 for marks: page = trim + 2*(3+10) */
@page { size: 174mm 236mm; margin: 0 }
html, body { margin: 0; print-color-adjust: exact; -webkit-print-color-adjust: exact }
```
```python
await page.pdf(path='raw.pdf', prefer_css_page_size=True, print_background=True)
```

- Text stays **vector** with ToUnicode (`pdftotext` returns correct Vietnamese). Fonts are **embedded as CID TrueType subsets** (`pdffonts`: `emb yes sub yes uni yes`). One subset per woff2 file, so a Fontsource family shows 3-5 subsets: harmless.
- JPEG images are **passed through untouched** (same bytes, keeps its ICC; `pdfimages -list` shows `jpeg`, 220 ppi at the placed size).
- Colors are written as **DeviceRGB** (`0 0 0 rg`).
- **Variable fonts become Type 3** in Chromium PDFs (TESTED with `@fontsource-variable/inter`: 11 `Type 3 Custom` fonts). Type 3 prints, but Illustrator cannot edit it and many preflight profiles flag it. For print, load **static** instances (`@fontsource/inter`, not `@fontsource-variable/inter`).
- **Page size is rounded** (TESTED):
  ```
  216mm 303mm -> 612.000 x 858.960 pt = 215.900 x 303.022 mm
  210mm 297mm -> 594.960 x 841.920 pt = 209.889 x 297.011 mm
  106mm 154mm -> 300.000 x 437.040 pt = 105.833 x 154.178 mm
  ```
  Up to ~0.2 mm error, and Chromium writes no TrimBox/BleedBox. Fix both with pikepdf right after rendering (content is top-anchored, so shift the MediaBox origin by the height difference):
  ```python
  MM = 72/25.4; W = (tw+2*(bleed+slug))*MM; H = (th+2*(bleed+slug))*MM
  y0 = float(page.mediabox[3]) - H
  page.MediaBox = [0, y0, W, y0+H]
  page.BleedBox = [slug*MM, y0+slug*MM, W-slug*MM, y0+H-slug*MM]
  page.TrimBox  = [(slug+bleed)*MM, y0+(slug+bleed)*MM, W-(slug+bleed)*MM, y0+H-(slug+bleed)*MM]
  ```
- **Crop marks drawn in HTML** (TESTED, `t3/print.html`): 8 absolutely positioned divs, 0.25 pt, 5 mm long, starting 3 mm (= bleed) outside the trim edge, color `#000`. They land in the slug area outside the BleedBox. Rendering checked visually.

### 2.2 RGB to CMYK with Ghostscript (TESTED with 10.02.1 and 10.08.0)

Free CMYK profiles, legally: Ubuntu/Debian multiverse package **`icc-profiles`** (installed here with apt) ships `ISOcoated_v2_eci.icc` (FOGRA39), `PSOcoated_v3.icc` (FOGRA51), `PSOuncoated_v3_FOGRA52.icc`, `JapanColor2011Coated.icc`, GRACoL/SWOP (IDEAlliance), `sRGB2014.icc`, `eciRGB_v2.icc`. Licences from `/usr/share/doc/icc-profiles/copyright`:
- ECI / Heidelberg profiles (ISO Coated v2, PSO): "may be used, embedded, exchanged, and shared without restriction. It may not be altered or sold". Heidelberg ones must travel with their licence text when redistributed.
- Japan Color 2011 (JPMA/X-Rite): use, embed, share freely; no altering or selling.
- Upstream: https://www.eci.org/en/downloads (ECI_Offset_2009 and PSO Coated v3 zips).
- Adobe ICC profiles (US Web Coated SWOP v2, Coated FOGRA39, **Japan Color 2001 Coated**, etc.): "free to use, distribution restricted" (bundler EULA). Download them on each machine from Adobe; do not commit them to the repository.
- Which one to use is the printer's call. Ask for the profile; for offset on coated paper in Europe-style workflows it is FOGRA39 (ISO Coated v2) or FOGRA51 (PSO Coated v3); many Asian shops use Japan Color 2001/2011 Coated.

Base command (works on 10.02 and 10.08):

```bash
gs -q -dNOPAUSE -dBATCH -dSAFER --permit-file-read=/abs/icc/ \
  -sDEVICE=pdfwrite -dPDFX=4 \
  -sColorConversionStrategy=CMYK -sProcessColorModel=DeviceCMYK \
  -sOutputICCProfile=/abs/icc/ISOcoated_v2_eci.icc -dRenderIntent=1 -dBlackPtComp=1 \
  -dEmbedAllFonts=true -dSubsetFonts=true -dAutoRotatePages=/None \
  -dAutoFilterColorImages=false -dColorImageFilter=/DCTEncode -dJPEGQ=95 -dDownsampleColorImages=false \
  -sOutputFile=out_cmyk.pdf PDFX_fogra39.ps in_rgb.pdf
```

`PDFX_fogra39.ps` is a copy of Ghostscript's `lib/PDFX_def.ps` with three edits: `/ICCProfile (/abs/icc/ISOcoated_v2_eci.icc) def`, `/OutputConditionIdentifier (FOGRA39)`, `/OutputCondition (...)`. Without the def file Ghostscript errors out.

Version-dependent behaviour (TESTED):

| | gs 10.02.1 (Ubuntu apt) | gs 10.08.0 (source build / Homebrew) |
|---|---|---|
| `-dPDFX=4` (integer) | `rangecheck in .putdeviceprops`; only boolean `-dPDFX` (= X-3) works | X-1a, X-3, X-4 all work (support for X-1a and X-4 added in 10.06.0) |
| PDF/X-3 or X-1a, page **without** transparency | vector text kept, fonts embedded | same |
| PDF/X-3 or X-1a, page **with** `opacity`, rgba, `box-shadow` | **whole page rasterised** to one 4932x6690 CMYK JPEG at 720 dpi, 0 fonts | same (X-1a and X-3 are PDF 1.3: no transparency) |
| PDF/X-4 | n/a | PDF 1.6, XMP, OutputIntent FOGRA39, TrimBox/BleedBox kept, **9 fonts kept, transparency kept** |
| PDF/X-1a TrimBox/BleedBox | - | **dropped** (output has no TrimBox, so it is not valid X-1a): re-add with pikepdf |

So: **use Ghostscript >= 10.06 and `-dPDFX=4`**. On the Mac, `brew install ghostscript` gives 10.08.0. In a Debian/Ubuntu cloud sandbox, apt's 10.02 is too old: build from source (`./configure --without-x --disable-cups --disable-gtk --without-tesseract && make -j2 && make install`, about 4 minutes on 2 vCPU here; the source tarball downloads from the `ArtifexSoftware/ghostpdl-downloads` GitHub release `gs10080`). If you must stay on 10.02, avoid transparency in print templates, or skip `-dPDFX` and use `-dCompatibilityLevel=1.6` (TESTED: CMYK conversion with live transparency and fonts kept, but no PDF/X tag).

**Pure-K black text: what the options actually do (TESTED, checked with `-sDEVICE=tiffsep` separations).**

| Strategy | Result for `#000` text |
|---|---|
| Default conversion (FOGRA39, relative colorimetric) | **72 / 67.5 / 67 / 88** rich black, 295 % ink. Bad for small text (registration) |
| `-dUseFastColor=true` | `1 1 1 0 k`: C+M+Y and **no K**. Worse |
| `-dBlackText` | forces *all* text to black, colored text included. It is a "print as black" option, not black preservation |
| `-dKPreserve` | CMYK->CMYK only (documented for output devices such as tiffsep); does nothing for RGB sources |
| `-dDeviceGrayToK` | applies to DeviceGray sources; has no effect on RGB black |
| **Rewrite `0 0 0 rg/RG` to `0 g/G` (DeviceGray) before gs** | pdfwrite keeps DeviceGray in the CMYK output; separations: **K = 100 %, C/M/Y = 0 under the text**. Works on 10.02 and 10.08 |

The rewrite is 20 lines of pikepdf (`t3/rgbblack2gray.py`, also inside `t3/print_pipeline.py`); it touches only the page content stream and Form XObjects. DeviceGray is permitted in PDF/X-1a/3/4 and lands on the K plate. Chromium never sets overprint, so black text knocks out the background; most RIPs offer "black overprint" at output. Ghostscript's pdfwrite has no switch for this.

Also observed: 10.02 and 10.08 give slightly different CMYK numbers for the same RGB (e.g. #F4EFE6 -> 2/4/8/0 vs 5/6/11/0). Pin one Ghostscript version per environment, preferably the same on the Mac and in the sandbox.

**Integrated pipeline (TESTED end to end with gs 10.08):**
```bash
python3 t3/print_pipeline.py page.html out.pdf --trim 148x210 --bleed 3 --slug 10 \
    --icc icc/ISOcoated_v2_eci.icc --oc FOGRA39 --pdfx 4 --gs /path/to/gs
# -> PDF/X-4, OutputIntent FOGRA39, TrimBox [36.85 36.85 456.38 632.13], BleedBox set,
#    black text = DeviceGray 0, 9 CID TrueType fonts, transparency kept
```
Ghostscript is AGPL: calling the unmodified `gs` binary as a separate process is fine for a local tool; if the workspace is offered as a network service and gs is modified, the AGPL source obligations apply.

### 2.3 WeasyPrint 70 as an alternative (TESTED)

What works:
- `@page { size: 148mm 210mm; bleed: 3mm; marks: crop cross }` produces native crop marks and registration crosses (rendered and checked). Use bleed >= ~10 mm so the marks fit; WeasyPrint draws them inside the bleed area. TrimBox is set correctly.
- `color: device-cmyk(0 0 0 1)` is written as DeviceCMYK `0 0 0 1 scn`: real pure K.
- `@color-profile --fogra39 { src: url(ISOcoated_v2_eci.icc); components: c, m, y, k; }` then `color(--fogra39 0.6 0 0.4 0.3)` works. **`components:` is mandatory**: without it WeasyPrint 70 crashes (`TypeError: object of type 'NoneType' has no len()`).
- `weasyprint --pdf-variant=pdf/x-4 --output-intent=--fogra39 in.html out.pdf` writes a PDF 1.6 with OutputIntent and XMP. The `=` is required, otherwise argparse reads `--fogra39` as a flag.

What does not:
- **Vietnamese broke with Fontsource's split woff2 subsets** (TESTED: "dừng" rendered as "dpng", "lại" as "lci"). With the full TTFs (from `@expo-google-fonts/be-vietnam-pro`, MIT + OFL) it is correct. WeasyPrint also warns it will drop fontTools subsetting in favour of HarfBuzz-subset >= 4.1 (install `libharfbuzz-subset0`).
- It does **not convert colors**: sRGB colors and images stay RGB, and its crop marks are drawn in DeviceRGB, so "pdf/x-4" here is mostly metadata. Real conversion still needs Ghostscript.
- No JavaScript (no fit-text), no container queries, weaker flex/grid than Chromium.

Verdict: keep Chromium as the single renderer (same engine as the editor, so WYSIWYG) and use Ghostscript for CMYK. Consider WeasyPrint only for text-heavy multi-page documents designed with CMYK colors from the start, with full TTF fonts.

---

## 3. Browser design desk: direct manipulation of DOM elements

Tests: `t5/desk.html`, `t5/server.py`, `t5/test_desk.py`.

| Library | Fit for "move/resize/rotate real HTML elements" | Size (min / gzip) | Maintenance | License |
|---|---|---|---|---|
| **Moveable 0.53.0** | Yes: drag, resize, rotate, scale, warp, snapping and guidelines, groups; ships its own handles UI; works with transformed ancestors | 246 KB / 78 KB, single UMD file | No release since 2023-12 (feature-complete, many open issues) | MIT |
| Selecto 1.26.3 | Companion for marquee/shift multi-select | 62 KB / 19 KB | same author, same status | MIT |
| interact.js 1.10.28 | Drag/resize/gesture events only: no rotation handles or guides, you draw the UI yourself | 98 KB / 29 KB | Active (2026-08) | MIT |
| GrapesJS 0.23.6 | Full page builder (iframe canvas, style manager, its own component model) | ~12 MB unpacked | Active | BSD-3 |
| Konva / Fabric | Canvas scene graph: the source of truth becomes canvas objects, not HTML/CSS | - | Active | MIT |
| Polotno | Canvas (Konva) editor SDK | - | Active | Commercial subscription, even for internal tools |

**Recommendation: Moveable + Selecto as two vendored files**, with interact.js as the fallback if Moveable's maintenance becomes a problem.
- `https://cdnjs.cloudflare.com/ajax/libs/moveable/0.53.0/moveable.min.js`
- `https://cdnjs.cloudflare.com/ajax/libs/selecto/1.26.3/selecto.min.js`
- (`https://cdnjs.cloudflare.com/ajax/libs/interact.js/1.10.28/interact.min.js`)
- jsDelivr equivalents: `https://cdn.jsdelivr.net/npm/moveable@0.53.0/dist/moveable.min.js`, `.../selecto@1.26.3/dist/selecto.min.js`

**Prototype (TESTED with real mouse events in Playwright):** the design (1080 x 1350) is shown scaled to 0.607 inside the desk with `transform: scale(s)` on a wrapper, and Moveable reports geometry in unscaled design px.
```
after drag    {'x': 279.2, 'y': 1051.2, 'w': 120, 'h': 120, 'rot': 0}      (asked +200,-100 from 80,1150)
after rotate  {'x': 279.2, 'y': 1051.2, 'w': 120, 'h': 120, 'rot': 30.4}   (asked ~30 deg)
after resize  {'x': 267.9, 'y': 1070.7, 'w': 203, 'h': 142, 'rot': 30.4}
text edit     "Khi ta dừng lại đủ lâu và thở"   (dblclick -> contenteditable="plaintext-only" -> blur -> saved)
```
Persistence pattern:
1. Each element has a base box in the spec, and `overrides[format][id] = {x,y,w,h,rot}`; the override wins.
2. During the gesture, apply Moveable's `e.transform` to the element. On `dragEnd/resizeEnd/rotateEnd`, **normalise** it: read `getComputedStyle(el).transform` as a `DOMMatrix`, `rot = atan2(b, a)`, center = left/top + w/2,h/2 + (m.e, m.f), write back `left/top/width/height` plus a pure `rotate()`, then save `{x,y,w,h,rot}` rounded to 0.1 px. Never store Moveable's raw transform strings.
3. Save with `PUT /api/design` to a stdlib `ThreadingHTTPServer` that validates JSON, writes a `.bak`, and replaces atomically (`tempfile` + `os.replace`); `t5/server.py` is 30 lines.

Gotchas found:
- A `transform: scale()` wrapper does not change layout size. Give the wrapper explicit `width/height = W*s, H*s`, or the page scrolls when a contenteditable gets focus (seen in the first run).
- Use `contenteditable="plaintext-only"` (Chromium) so pasted rich text does not bring styles.
- Set `mv.target = null` while editing text, or the drag handler eats the caret clicks.
- Normalise edited text to NFC before saving (macOS input can produce NFD). Chromium renders NFC and NFD identically (TESTED, 0 % pixel difference), but search, PPTX and WeasyPrint behave better on NFC.

---

## 4. One template, many formats

Tests: `t1/template.html`, `t1/spec.json`.

**Units (TESTED in 5 formats).** Make the design root a size container and express everything in container units:
```css
.canvas { width: var(--W); height: var(--H); container-type: size; }
.inner  { position: absolute; inset: 7cqmin; }
.title  { font-size: 8cqmin; text-wrap: balance; }
.body   { font-size: 3.8cqmin; text-wrap: pretty; max-width: 80cqw; }
@container (aspect-ratio > 1.4) { .inner { inset: 6cqh 8cqw } .title { max-width: 70cqw } }   /* landscape layout */
```
`cqmin` = 1 % of the shorter side, which is the `--u = min(W,H)/100` idea without any JS. Width-based formats (1:1, 4:5, 9:16 are all 1080 wide) then get the same type size, which is what social formats want; the 9:16 story still needs a per-format override (move the block away from the top and bottom areas that the Instagram UI covers; check the current platform guidance for exact margins).

**Per-format overrides in JSON** (tested `display:none` for the body in the 1.91:1 OG format and `maxLines: 2` for the title):
```json
"formats": {
  "ig-portrait": {"w":1080,"h":1350},
  "story":       {"w":1080,"h":1920, "overrides": {"inner": {"top":"18cqh","bottom":"22cqh"}}},
  "og":          {"w":1200,"h":628,  "overrides": {"body": {"display":"none"}, "title": {"maxLines":2}}},
  "a4-print":    {"w_mm":210,"h_mm":297,"bleed_mm":3,"dpi":300}
}
```
Keep two override layers: template-defined per-format CSS (the designer's intent) and user moves from the desk (`overrides[format][id]` as in section 3).

**Shrink-to-fit (TESTED)**: binary search on px font size, 14 iterations, constraint `scrollHeight <= maxLines * fontSize * lineHeight` and no horizontal overflow. OG format: title went from 86.4 px to 48.2 px and fit in 2 lines; other formats kept the designed size.
```js
function fitText(el,{maxPx,minPx,maxH}){let lo=minPx,hi=maxPx,best=minPx;
  for(let i=0;i<14;i++){const mid=(lo+hi)/2;el.style.fontSize=mid+'px';
    if(el.scrollHeight<=maxH&&el.scrollWidth<=el.clientWidth+1){best=mid;lo=mid}else{hi=mid}}
  el.style.fontSize=best+'px';return best}
```
Run it after the fonts are loaded. Report back to the agent when `best == minPx` (text too long) instead of silently shipping tiny text.

**Vietnamese line breaking (TESTED in Chromium 141):**
- Chromium breaks only at spaces, so a syllable is never split, but words made of two syllables are: in the 4:5 render "đủ / lâu" and "tâm / trí" fell on different lines.
- `text-wrap: balance` (Chromium 114+, only for blocks of **6 lines or fewer**) evens the lines; `text-wrap: pretty` avoids a one-word last line. Neither knows Vietnamese words.
- ICU has no Vietnamese word dictionary, so `Intl.Segmenter('vi', {granularity:'word'})` returns syllables. To keep phrases together, mark them in content: author with a tilde (`"đủ~lâu"`, `"tâm~trí"`) and convert to U+00A0 at render, or wrap `<span style="white-space:nowrap">`. Let the AI agent insert the tildes for headlines; leave body text alone.
- `hyphens: auto` does nothing for Vietnamese (no dictionary), which is correct.

---

## 5. Photo enhancement and background removal (Python, CPU)

Tests: `t6/enhance.py`, `t6/bg.py`, `t6/bg2.py`, comparison images `t6/cmp_enhance.png`, `t6/cmp_bg.png`.

### 5.1 Conservative auto-enhance (TESTED)

`t6/enhance.py` (numpy + OpenCV + Pillow, ~170 lines), applied in this order, every step capped:
1. Load: `pillow_heif.register_heif_opener()`, `ImageOps.exif_transpose`, convert the embedded ICC (Display P3 etc.) to sRGB (section 8).
2. White balance: gray world **in linear light, mid-tones only** (ignores clipped, very dark and saturation > 0.6 pixels), strength 0.7, gains clamped to [1/1.3, 1.3], luminance preserved.
3. Auto levels on luminance between the 0.3 and 99.7 percentiles, same for all channels (hue kept), stretch <= 1.35.
4. Exposure: gamma that moves the median luminance toward 0.46, clamped to 0.7-1.3.
5. Gentle S-curve (blend 12 % smoothstep).
6. Faces: OpenCV **YuNet** (`cv2.FaceDetectorYN`, model `face_detection_yunet_2023mar.onnx`, 232 KB, MIT, from opencv_zoo) with Haar cascade fallback (ships inside `cv2.data`). Brighten each face with a blurred elliptical mask, gain <= 1.18 toward median face luminance 0.55.
7. Vibrance: boost scales with (1 - S), skin hues (H 5-50 deg) get 70 % less, S capped at 0.85.
8. Denoise: `cv2.fastNlMeansDenoisingColored(h=4)`.
9. Unsharp mask: radius `max(0.8, longest_side/2500)` px, amount 0.45, threshold 0.02.
10. Save JPEG q92, 4:4:4, sRGB ICC.

Results on degraded test images (512 px; 0.8 s each including model load):
```
astronaut: wb_gains [0.771, 1.037, 1.303]  levels scale 1.06  gamma 0.873  YuNet found 1 face, gain 1.0
coffee:    wb_gains [0.829, 1.042, 1.089]  levels scale 1.148 gamma 0.70   no faces
```
Visual check: the coffee image is restored well. The astronaut image (dominant orange suit) **hit the blue cap and came out slightly cool**: the classic gray-world failure. Mitigations: lower the cap to ~1.15-1.2 by default, or estimate WB from neutral candidates only (white-patch on near-neutral highlights) or from detected skin. Show before/after to the user and expose one strength slider.

MediaPipe 0.10.32 is installed, but its Tasks API needs `.tflite` models from `storage.googleapis.com`, which is blocked in this sandbox, so it was not tested. YuNet is enough for face boxes.

### 5.2 Background removal with rembg 2.0.85 (TESTED, CPU, 2 vCPU)

`pip install --break-system-packages "rembg[cpu]"` works. Models download from GitHub releases into `$REMBG_HOME` (set it; the default is `~/.rembg`).

| Model | File | Load | 1024 px infer | Peak RSS | Weights license |
|---|---|---|---|---|---|
| `u2net` | 168 MB | 3.7 s | 0.7-0.9 s | 625 MB | Apache-2.0 |
| `isnet-general-use` | 171 MB | 3.1 s | 2.1-2.4 s | 866 MB | Code Apache-2.0, but trained on DIS5K, whose terms prohibit commercial use: treat as non-commercial |
| `birefnet-general-lite` | 214 MB | 2.7 s | **OOM-killed above 6 GB RSS** (8 GB box), even with ORT arena off and 2 threads | - | MIT |
| `birefnet-general / -portrait` | ~900 MB | not tried (lite already OOM) | - | - | MIT |
| `bria-rmbg` (RMBG-2.0) | - | not tried | - | - | **CC BY-NC 4.0** (commercial license from BRIA) |

Quality on the astronaut portrait: both u2net and isnet produce clean cut-outs at preview size; no difference was judged at full resolution. **Recommendation: `u2net` by default (fast, Apache-2.0), `u2net_human_seg` for people, `birefnet-portrait` only on the Mac with 16 GB+.** Add `alpha_matting=True` for hair when needed (slower).

### 5.3 Upscaling

- **Real-ESRGAN** (code BSD-3-Clause) and **realesrgan-ncnn-vulkan** (MIT; release v0.2.5.0 zip 47 MB, includes `realesrgan-x4plus` and anime models). It needs Vulkan. TESTED here through Chromium's SwiftShader Vulkan ICD (`VK_ICD_FILENAMES=.../vk_swiftshader_icd.json`): **no output after 100 s even for a 96 px image**, so not feasible in a GPU-less sandbox. On Apple Silicon the macOS build uses MoltenVK (bundled) and is fast (NOT TESTED here).
- CPU-feasible options: OpenCV `dnn_superres` (present in opencv-contrib 5.0; ESPCN/FSRCNN models are small and fast but modest quality; models download from GitHub repos, which are blocked in this sandbox) or plain Lanczos + light unsharp mask for <= 2x. The `realesrgan` pip package (0.3.0) pulls in torch/basicsr: heavy, CPU minutes per megapixel.
- Policy: in the cloud sandbox, refuse > 2x upscales and tell the user; on the Mac, offer Real-ESRGAN ncnn.

---

## 6. Editable exports from the same spec

Tests: `t9/dom2svg.js`, `t9/test_svg.py`, `pptx_test.mjs`, `psd_test.mjs`, `t8/`.

| Format | How | Tested result | Pros | Cons |
|---|---|---|---|---|
| **SVG with real `<text>`** | `t9/dom2svg.js`: walk text nodes, group graphemes (`Intl.Segmenter`, so combining marks stay attached) by line using `Range.getClientRects()`, emit one `<text>` per block with a positioned `<tspan>` per visual line; baseline from a zero-height inline-block probe; `@font-face` copied into `<style>` | Re-rendered SVG vs HTML: mean abs diff 0.108/255, **0.004 % of pixels differ by > 64**. 4 text elements, 3.8 KB | Opens with live text in Illustrator, Figma, Inkscape; line breaks frozen exactly as rendered | Each line is separate point text (no reflow); gradients, filters and shadows must be rasterised to `<image>`; editors need the fonts installed |
| SVG with `<foreignObject>` | wrap the HTML | not pursued | Pixel perfect in browsers | **Illustrator, Inkscape, Figma and many online tools drop or blank foreignObject** (draw.io FAQ; Inkscape forum). Use only for browser previews |
| **PPTX** (PptxGenJS 4.0.1) | `defineLayout({width: W/96, height: H/96})` (1 CSS px = 1/96 in), `fontSize = px*0.75`, `x,y,w,h = px/96`, `rotate`, `margin:0`, `lang:'vi-VN'` | 281 KB file; LibreOffice render matches the positions; Vietnamese fine | Editable in PowerPoint, Keynote, Google Slides, Canva import; easy for non-designers | **No font embedding**: the recipient needs Be Vietnam Pro/Playfair installed, otherwise PowerPoint substitutes and reflows. No CSS effects. Slide side max 56 in (fine up to 5376 px at 96/in) |
| **Layered PSD** (ag-psd 31.0.2) | `writePsdBuffer(psd, {invalidateTextLayers: true})` with pixel layers (rendered PNGs) and text layers (`text`, `style.font.name` = PostScript name, `fontSize`, `fillColor`, `boxBounds`) | 1.1 MB PSD; psd-tools reads back `pixel 'Background'`, `pixel 'Logo' (80,1150,200,1270)`, `type 'Title'` with text "Khi ta dừng lại đủ lâu", size 86 | Real Photoshop type layers, editable | Text layers carry no pixels (bbox 0x0); Photoshop re-renders them on open ("update text layers") and other apps show them empty. Always also include a flattened render layer |
| PSD via psd-tools 1.23 | `PSDImage.new` + `PixelLayer.frompil(img, psd, name, top, left)` + `save` | Works, composite OK | Pure Python | Pixel layers only, cannot create type layers |
| pytoshop | - | not tested | - | Unmaintained since 2018 |
| **PDF for Illustrator** | the Chromium print PDF | NOT TESTED in Illustrator (not available) | Vector, fonts embedded, ToUnicode correct | Illustrator opens Chromium PDFs as many clip groups and per-run text fragments; with Fontsource subsets one word can be split across font subsets; variable fonts are Type 3 (not editable). Treat as "editable with effort" |

Recommended export set: PNG/JPG + print PDF (primary), **SVG with `<text>`** (best editable vector), PPTX (for non-designers), PSD from ag-psd (flattened layer + per-element layers + type layers) only on request.

---

## 7. Fonts

- Self-host from **Fontsource** (`npm i @fontsource/be-vietnam-pro @fontsource/playfair-display @fontsource/lora @fontsource/inter ...`), version 5.x, OFL-1.1. Each of Be Vietnam Pro, Playfair Display, Lora, Inter, Montserrat, Noto Serif, Cormorant Garamond, EB Garamond and Roboto has `latin`, `latin-ext` **and `vietnamese`** subsets (checked in `metadata.json`).
- **You must load latin + latin-ext + vietnamese together.** The Vietnamese subset only covers `U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB`; base letters come from `latin`, and "ư/ơ/ạ" come from different files. Importing `@fontsource/<family>/<weight>.css` brings all subsets. For a vendored, offline setup copy `files/*-{latin,latin-ext,vietnamese}-{weight}-normal.woff2` and the matching `@font-face` blocks.
- Chromium renders all Vietnamese diacritics correctly from subset woff2 (TESTED visually, including stacked marks such as ẳ ẵ ặ ể ễ ổ ỗ ỷ ỹ), in NFC and NFD alike.
- Use **static** weights for anything that becomes a PDF (variable fonts become Type 3, see 2.1). For WeasyPrint and for PPTX/PSD/SVG recipients, use **full single-file TTF/OTF** (e.g. `@expo-google-fonts/be-vietnam-pro` ships full TTFs, MIT + OFL; or the google/fonts repository) because split subsets broke WeasyPrint and desktop apps need installable fonts.
- OFL permits bundling the font files with the workspace and embedding them in PDFs/SVGs; keep `OFL.txt` next to them and do not sell the fonts alone.
- Keep a `fonts.json` registry: family -> CSS family name, PostScript name per weight (needed for PSD `font.name` and for Illustrator), file paths, license.

---

## 8. Image color profiles and HEIC

TESTED (`t7/p3test.py`):
```python
import io, pillow_heif
from PIL import Image, ImageCms, ImageOps
pillow_heif.register_heif_opener()                     # Image.open() now reads .heic/.heif
im = ImageOps.exif_transpose(Image.open(path))
icc = im.info.get('icc_profile')
if icc:
    src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
    im = ImageCms.profileToProfile(im.convert('RGB'), src, ImageCms.createProfile('sRGB'),
                                   renderingIntent=ImageCms.Intent.PERCEPTUAL, outputMode='RGB')
```
- Display P3 test (a P3 matrix/TRC profile built for the test; JPEG and HEIC both carried the ICC through pillow-heif): P3 (200,60,50) -> sRGB (219,41,40), while ignoring the profile gives (201,60,51), i.e. visibly duller and wrong. P3 pure red clips to sRGB (255,0,0).
- Use PERCEPTUAL for photos (smooth gamut compression with v2 LUT profiles; matrix profiles fall back to colorimetric clipping) and RELATIVE_COLORIMETRIC for logos and flat colors.
- pillow-heif 1.8.0 bundles libheif 1.23.4 with the libde265 decoder and the x265 encoder (both work here). HEIC files can carry color as NCLX instead of ICC: check `im.info.get('nclx_profile')` (`color_primaries` 12 = P3-D65, `transfer_characteristics` 13 = sRGB curve) and treat that as Display P3 when no ICC is present. iPhone photos normally carry an ICC "Display P3".
- HEVC patents: pillow-heif's wheels include LGPL/GPL codecs (libde265 LGPL, x265 GPL). Fine for a local tool; check before redistributing a bundled app.
- Chromium should color-manage a P3-tagged `<img>` into the sRGB output (NOT TESTED here). Convert uploads to sRGB once at import anyway, so every exporter (PDF/CMYK, PPTX, PSD) starts from the same pixels.

---

## 9. Summary of recommendations

1. **Renderer**: Playwright Python + Chromium (headless shell) in the cloud. On macOS, the stdlib CDP-pipe script driving installed Google Chrome; **do not use `--screenshot --window-size`** (87 px short viewport). Always `--force-color-profile=srgb`, wait for `document.fonts.load(...)` of the actual text, capture PNG, then encode JPG with Pillow at 4:4:4 + sRGB ICC. Keep each output <= ~100 MP.
2. **Print**: Chromium `page.pdf(prefer_css_page_size=True)` with static fonts, crop marks in HTML -> pikepdf (exact MediaBox, BleedBox/TrimBox, black -> DeviceGray) -> **Ghostscript >= 10.06 `-dPDFX=4`** with ISO Coated v2 / PSO Coated v3 from the `icc-profiles` package or ECI. Avoid X-1a/X-3 when the design uses any transparency.
3. **Editor**: Moveable 0.53 + Selecto from cdnjs (MIT), with normalised `{x,y,w,h,rot}` overrides per format saved through a stdlib JSON server.
4. **Multi-format**: `container-type:size` + `cqmin` units + `@container (aspect-ratio)` rules + JSON per-format overrides + binary-search fit-text + `text-wrap: balance/pretty` + `~` -> NBSP phrase glue for Vietnamese headlines.
5. **Photos**: capped pipeline in `t6/enhance.py`; rembg `u2net` on CPU; no Real-ESRGAN in the cloud sandbox.
6. **Editable exports**: SVG with `<text>` (tested near pixel-identical), PPTX via PptxGenJS (fonts must be installed), PSD via ag-psd (type layers re-render in Photoshop).
7. **Fonts**: Fontsource static woff2 for rendering (all three subsets), full TTFs for WeasyPrint and desktop apps; all OFL.

---

## Sources

- Playwright `page.screenshot` / `page.pdf`: https://playwright.dev/python/docs/api/class-page
- Chrome headless (old headless only as chrome-headless-shell since 132.0.6793.0): https://developer.chrome.com/docs/chromium/headless , https://developer.chrome.com/blog/removing-headless-old-from-chrome
- Short viewport with new headless: https://github.com/cypress-io/cypress/issues/27260 , https://github.com/GoogleChrome/lighthouse/issues/15309
- `text-wrap: balance` (Chrome 114, 6-line limit): https://developer.chrome.com/docs/css-ui/css-text-wrap-balance ; MDN https://developer.mozilla.org/docs/Web/CSS/text-wrap
- Ghostscript docs (pdfwrite, PDF/X, ColorConversionStrategy): https://ghostscript.readthedocs.io/en/latest/VectorDevices.html ; color options (KPreserve, OverrideICC, DeviceGrayToK, RenderIntent): https://ghostscript.readthedocs.io/en/latest/GhostscriptColorManagement.html ; BlackText/BlackVector: https://ghostscript.readthedocs.io/en/latest/Use.html ; release dates: https://ghostscript.readthedocs.io/en/latest/ReleaseDates.html ; 10.06 news (X-1a and X-4 added): https://ghostscript.readthedocs.io/en/gs10.06.0/News.html ; Homebrew: https://formulae.brew.sh/formula/ghostscript
- ECI profiles: https://www.eci.org/en/downloads ; Debian `icc-profiles` licences: `/usr/share/doc/icc-profiles/copyright` (package page https://packages.debian.org/sid/icc-profiles)
- Adobe ICC profiles (list, "free to use, distribution restricted"): https://github.com/pld-linux/adobe-ICC-profiles/blob/master/adobe-ICC-profiles.spec , https://supportdownloads.adobe.com/detail.jsp?ftpID=4075
- WeasyPrint API/CLI (device-cmyk, @color-profile, pdf/x variants, bleed/marks): https://doc.courtbouillon.org/weasyprint/stable/api_reference.html
- Moveable: https://github.com/daybrush/moveable , https://cdnjs.com/libraries/moveable ; Selecto: https://cdnjs.com/libraries/selecto ; interact.js: https://cdnjs.com/libraries/interact.js ; Polotno licence: `LICENSE.md` in the npm package polotno@4.15.3
- rembg: https://github.com/danielgatis/rembg ; model licence allowlist: https://github.com/bon5co/rembg-railway ; RMBG-2.0: https://huggingface.co/briaai/RMBG-2.0
- Real-ESRGAN ncnn release: https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.2.5.0
- YuNet: https://github.com/opencv/opencv_zoo/tree/main/models/face_detection_yunet
- foreignObject support in editors: https://www.drawio.com/doc/faq/svg-export-text-problems ; https://inkscape.org/forums/other/inkscape-viewer-does-not-support-full-svg-11/
- pillow-heif image info (icc_profile, nclx_profile): https://pillow-heif.readthedocs.io/en/latest/reference/HeifImage.html
- Fontsource: https://fontsource.org/fonts/be-vietnam-pro
