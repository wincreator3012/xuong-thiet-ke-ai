# Digital design deliverables: current specs (research as of 2026-10-06)

Scope: social platforms (Facebook, Instagram, LinkedIn, YouTube, TikTok, Zalo OA, Threads, X), website/email/webinar assets, export practice, and multi-format adaptation. Written for Vietnamese educators, experts and speakers who publish on social media and a personal or company website.

How to read this report
- **[OFFICIAL]** = number quoted from the platform's own help/developer page (fetched during this research).
- **[3P x2]** = consistent across at least two reputable third-party guides (Buffer, Hootsuite, Sprout Social, PosterMyWall, etc.).
- **[CONFLICT]** = sources disagree; the conflict and my recommended "safe" choice are stated.
- **[DERIVED]** = my own arithmetic from the numbers above (geometry, scaling); not a platform statement.
- Canvas coordinates are given as (x, y) from the top-left corner of the canvas, in px.

Key third-party references used throughout:
- Buffer, updated 2026-05-12: https://buffer.com/resources/social-media-image-sizes/
- Hootsuite, dated 2026-10-01: https://blog.hootsuite.com/social-media-image-sizes-guide/
- Sprout Social, updated 2026-05-11: https://sproutsocial.com/insights/social-media-image-sizes-guide/
- PosterMyWall, 2026-07-20: https://www.postermywall.com/blog/2026/07/20/social-media-image-sizes/
- Hootsuite Facebook ad sizes, 2026-07-16: https://blog.hootsuite.com/facebook-ad-sizes/

---

## 0. The ten numbers to remember

| # | Rule | Status |
|---|---|---|
| 1 | Default social canvas: **1080 x 1350 (4:5)** for FB/IG/LinkedIn/Threads feed; **1080 x 1440 (3:4)** if Instagram grid appearance matters most | [3P x2] |
| 2 | Vertical video/story canvas **1080 x 1920 (9:16)**; Meta Reels safe zone = keep top **14% (269 px)**, bottom **35% (672 px)**, sides **6% (65 px)** clear | [OFFICIAL Meta, quoted via 2 sources] |
| 3 | One "universal" 9:16 safe box that clears Meta Reels, TikTok and YouTube Shorts: **x 120-888, y 288-1248 (768 x 960 px)** | [DERIVED] |
| 4 | Instagram profile grid crops everything to **3:4**; a 4:5 post loses ~34 px per side, a 1:1 post loses 135 px per side, a 9:16 Reel cover loses 240 px top and bottom | [3P x2, geometry DERIVED] |
| 5 | Open Graph / link share: **1200 x 630 (1.91:1)**, min 200 x 200, max 8 MB, declare og:image:width/height/alt | [OFFICIAL Meta] |
| 6 | YouTube thumbnail: official recommendation is now **3840 x 2160**, min width 640, **50 MB desktop / 2 MB mobile** (the classic 1280 x 720 / 2 MB is still valid but no longer the stated recommendation) | [OFFICIAL YouTube] |
| 7 | YouTube banner **2560 x 1440**, safe area **1546 x 423** centred, max 6 MB | [3P x2] |
| 8 | LinkedIn personal banner **1584 x 396 (4:1)**, max 8 MB; company cover **4200 x 700 (6:1)** (older 1128 x 191, same ratio) | [3P x2] |
| 9 | Meta ads: recommended width is now **1440 px** (1440 x 1800, 1440 x 2560, 1440 x 1440); 1080 still meets minimums; images max 30 MB | [3P x2, quoting Meta Ads Guide] |
| 10 | Always export **sRGB (IEC61966-2.1), 8-bit, profile embedded**; PNG for text-heavy graphics on Facebook, high-quality JPG for photos | [3P x2] |

---

## 1. Facebook

### 1.1 Organic posts and Page assets

| Item | Pixel size (upload) | Ratio | Safe zone / overlay | Max file | Format | Text guidance | Notes / sources |
|---|---|---|---|---|---|---|---|
| Feed image, portrait | **1080 x 1350** (or up to 1638 x 2048, see notes) | 4:5 | Keep ~5% margins (54 px) from edges; tall images beyond 4:5 are cropped to 4:5 in feed | 8 MB (Sprout); 30 MB for Stories (Hootsuite) | PNG for text graphics, JPG for photos | Headline >= 64 px on 1080 canvas, body >= 40 px [DERIVED, see section 10] | [3P x2] Buffer, Sprout, PosterMyWall. Facebook keeps up to **2048 px on the longest side** (Louise Myers: https://louisem.com/1730/how-to-optimize-photos-for-facebook), so a 1638 x 2048 export gives sharper text than 1080 x 1350. |
| Feed image, square | **1080 x 1080** | 1:1 | ~54 px margins | 8 MB | as above | as above | [3P x2] |
| Feed image, landscape | 1200 x 630 or 1080 x 566 | 1.91:1 | ~60 px top/bottom, ~120 px sides (adnabu) | 8 MB | as above | Takes the least screen space on mobile; avoid for organic | Buffer, PosterMyWall, Hootsuite |
| Link share / OG image | **1200 x 630** (min 200 x 200; 600 x 315 low-res fallback) | 1.91:1 | Keep text inside centre ~1080 x 540; some surfaces crop to 1:1 | **8 MB** | JPG/PNG | Few words; title is shown below the image anyway | **[OFFICIAL]** https://developers.facebook.com/docs/sharing/webmasters/images/ : "at least 1200 x 630 pixels", "minimum allowed image dimension is 200 x 200", "as close to 1.91:1 as possible", "must not exceed 8 MB". Use Sharing Debugger to re-scrape. |
| Stories (organic) | **1080 x 1920** | 9:16 | Use Meta Stories margins: top 14% (269 px), bottom 20% (384 px), sides 6% (65 px) | 30 MB (Hootsuite) | JPG/PNG/MP4 | | adnabu https://blog.adnabu.com/meta-ads/meta-safe-zones/ ; adnova https://www.adnova.ai/blogs/meta-ad-safe-zones-guide |
| Reels | **1080 x 1920** | 9:16 | **Top 269, bottom 672, sides 65 px** (box x 65-1015, y 269-1248) | video up to 4 GB | MP4/MOV H.264 | Captions/handle/buttons occupy bottom third | Meta Ads Guide quoted by solidlabs https://www.solidlabs.com/social-safe-zones : "leaving at least 14% of the top, 35% of the bottom and 6% on each side free". |
| Page cover photo | **Recommended working canvas 1640 x 924 (16:9 @2x)**; official minimum 400 x 150; Meta's classic advice 851 x 315 | Displays 820 x 312 desktop (~2.63:1), 640 x 360 mobile (16:9) | **[DERIVED] safe text box: x 180-1460, y 150-774 (1280 x 624) on a 1640 x 924 canvas**; keep bottom-left ~ 25% width x 30% height free of key content (profile photo overlap on Pages) | Meta's tip: under 100 KB for fastest load (not a hard limit) | sRGB JPG; PNG if logo/text | Short text, large; no small print | See 1.3 for the geometry and the conflict. Sources: ContentStudio https://contentstudio.io/blog/facebook-cover-photo-size ; socialsizes https://socialsizes.io/facebook-cover-photo-size/ ; Sprout. |
| Event cover | **1920 x 1005** | 1.91:1 | Keep text in centre ~1600 x 840 | ~8 MB typical (unverified) | JPG/PNG | | [3P x2] Buffer, PosterMyWall, Sprout |
| Group cover | **1640 x 856** | 1.91:1 | Centre; mobile crops sides | | JPG/PNG | | [3P x2] Buffer, ContentStudio |
| Profile photo | **320 x 320 min**; upload 720 x 720 or larger for sharpness | 1:1, circle crop | Keep logo/face within central circle (diameter = canvas width, minus ~10% padding) | | PNG for logo | Text inside profile photo is illegible at 40 px display, avoid | Displays 176 x 176 desktop, 196 x 196 mobile (Sprout) |

### 1.2 Facebook ads placements

| Placement | Recommended size | Ratio | Safe zone | Max file | Notes |
|---|---|---|---|---|---|
| Feed (FB + IG) | **1440 x 1800** (4:5) or 1440 x 1440 (1:1); 1080-wide still accepted | 4:5, 1:1 | 4:5: ~250 px top/bottom, ~100 px sides on 1080 x 1350 (adnabu); some guides apply 14%/20% top/bottom | **30 MB** image, 4 GB video | Hootsuite 2026-07; biddyco quotes Meta Ads Guide: "Meta now recommends 1440 pixels wide: 1440x1800, 1440x2560 and 1440x1440" https://www.biddyco.com/blog-posts/meta-ad-specs |
| Stories | **1440 x 2560** (or 1080 x 1920) | 9:16 | top 14%, bottom 20%, sides 6% | 30 MB | Hootsuite; adnova |
| Reels | **1440 x 2560** (or 1080 x 1920) | 9:16 | **top 14%, bottom 35%, sides 6%**; bottom 40% if a disclaimer is shown (biddyco) | 30 MB / 4 GB | Design all vertical ads to the Reels margins and they clear Stories too |
| Right column (desktop FB) | **1080 x 1080** min | 1:1 | Shown tiny (approx. 254 x 133 or small square): 1-3 words max | 30 MB | Hootsuite; superscale https://superscale.ai/learn/meta-ad-sizes |
| Carousel card | **1080 x 1080** (4:5 allowed, all cards same ratio) | 1:1 | ~100 px padding all sides | 30 MB per image | 2-10 cards. superscale; Hootsuite |
| Marketplace, Search | 1080 x 1080 | 1:1 | | 30 MB | Hootsuite |
| In-stream video | 1920 x 1080 | 16:9 (1:1 fallback) | | 4 GB | superscale |

**Meta's current guidance on text in ad images.** The 20% text rule (and the Text Overlay tool that enforced it) was retired in **September 2020**; ads are no longer rejected or throttled by a percentage test. Meta still advises that images with less text tend to get broader delivery and better results. Hootsuite 2026: "Meta no longer enforces the old 20% text rule, but ads with less text on the image still tend to get broader delivery and better results." History: Jon Loomer https://www.jonloomer.com/facebook-text-rule-ads-change/ . Practical rule: one short headline on the image, the rest in primary text (125 chars before "See more"), headline (40 chars).

### 1.3 Facebook cover: why sources conflict, and the safe answer [CONFLICT]

- Display sizes (consistent across sources): desktop 820 x 312 (2.63:1), mobile 640 x 360 (16:9).
- Source A (ContentStudio, Sprout, Meta's long-standing help text): upload 851 x 315, keep content in 820 x 312. With this upload the mobile view (16:9) can only show a 560-px-wide centre slice of the 851-px width, so ~145 px per side are cut [DERIVED].
- Source B (socialsizes.io): upload 820 x 312 and keep text in the centre 640 x 312, because "mobile crops ~90 px from each side". Sprout even labels the cover "16:9", which contradicts 851 x 315.
- Professional practice that satisfies both views: **design on 1640 x 924 (16:9 at 2x)**. Mobile shows the whole 16:9 frame; desktop shows a 2.63:1 band of 1640 x 624, i.e. it crops **150 px top and bottom** [DERIVED]. Put all text and logos inside the central band **y 150-774**, and also inside **x 180-1460** in case Facebook re-crops sides, and keep the **bottom-left corner** (approx. x 0-420, y 600-924) free of key content because the Page profile photo overlaps there on most layouts.
- Always check both views after upload (Facebook lets you reposition the cover).

---

## 2. Instagram

### 2.1 What changed in 2025

- **January 2025**: the profile grid changed from square tiles to **3:4 vertical tiles**. Adam Mosseri: "The vast majority of what is uploaded to Instagram today is vertical... cropping it down to square is pretty brutal." (Planoly, 2025-01-20: https://www.planoly.com/blog/instagram-updates-jan-2025 ; UNN: https://unn.ua/en/news/square-is-the-legacy-of-instagram-social-network-changes-the-format-of-the-profile-grid). Users can adjust the grid thumbnail crop after posting.
- **~May 2025**: 3:4 (1080 x 1440) uploads accepted in feed without cropping (IGCompressor https://www.igcompressor.com/blog/instagram-grid-3-4-size-explained ; DreamPixelForge https://www.dreampixelforge.com/blog/instagram-post-size ). Not confirmed on an Instagram help page during this research; treat as [3P x2].
- Carousel limit raised from 10 to **20** items (Sprout; DreamPixelForge notes uneven rollout).
- [CONFLICT on dates] PosterMyWall says the grid switch happened "in early 2026", DigitalStack says "August 2025". Primary reporting (Planoly, UNN quoting Mosseri) dates it to **January 2025**; the later dates are wrong or refer to regional rollouts.

### 2.2 Spec table

| Item | Pixel size | Ratio | Safe zone / overlay | Max file | Format | Notes / sources |
|---|---|---|---|---|---|---|
| Feed, portrait 4:5 | **1080 x 1350** | 4:5 | Grid shows centre **1012 x 1350** (cuts ~34 px each side) | 8 MB (Sprout) | JPG/PNG | Still the most common "safe" choice across FB/IG/LinkedIn/Threads |
| Feed, 3:4 | **1080 x 1440** | 3:4 | Grid shows the whole image | 8 MB | JPG/PNG | Best when grid aesthetics matter; slightly taller in feed than 4:5 |
| Feed, square | 1080 x 1080 | 1:1 | Grid shows centre **810 x 1080** (cuts 135 px each side, 25% of width) | 8 MB | | Square posts now look cropped on the grid: keep text in the centre 810 px |
| Feed, landscape | 1080 x 566 | 1.91:1 | Grid shows only centre ~424 px width | 8 MB | | Avoid for a grid-conscious profile |
| Carousel | 1080 x 1350 or 1080 x 1440, all slides same ratio | 4:5 or 3:4 | All slides are cropped to the **first slide's ratio** | 8 MB / slide | | Up to 20 slides |
| Stories | **1080 x 1920** | 9:16 | Top 14% (269 px), bottom 20% (384 px), sides 65 px. Older organic guidance: keep in 1080 x 1610 (Sprout/Hootsuite) or 1080 x 1420 (Adsmurai) | 30 MB | | [CONFLICT] three different organic safe zones exist; use the Meta ads margins (strictest common one) |
| Reels | **1080 x 1920** | 9:16 | **Top 269, bottom 672, sides 65 px** | 4 GB video | MP4 H.264 | Reels now up to 3 minutes (Planoly) |
| Reels cover in grid | 1080 x 1920 source | 3:4 crop | Grid shows centre **1080 x 1440** (y 240-1680) | | | Put the cover title between y 300 and y 1200 so it survives both the grid crop and the Reels UI [DERIVED] |
| Profile photo | 320 x 320 (upload 720+) | 1:1 circle | | | | Buffer, Hootsuite |

Grid-crop numbers: IGCompressor (2026-09-15) and Hootsuite ("Grid Display: 1012 x 1350") agree. DreamPixelForge says a 4:5 post is trimmed "top and bottom": this is geometrically wrong (a 4:5 image is wider than a 3:4 tile, so it is trimmed at the sides). [CONFLICT resolved by geometry]

**Resolution kept:** Instagram's help page describes uploading "at the best quality resolution possible (up to 1080 ...)" (https://help.instagram.com/1631821640426723/). Some guides (HaveCameraWillTravel) say Instagram accepts 1440 or 2048 wide and serves more on high-density screens. [CONFLICT/uncertain] Safe practice: export exactly **1080 px wide** (no surprise resampling) for text-heavy graphics; for photos, 1440 wide does no harm.

---

## 3. LinkedIn

| Item | Pixel size | Ratio | Safe zone / overlay | Max file | Format | Notes / sources |
|---|---|---|---|---|---|---|
| Feed image, portrait | **1080 x 1350** | 4:5 | ~54 px margins | 5 MB (Hootsuite) | JPG/PNG | Oktopost, Buffer |
| Feed image, square | 1080 x 1080 (or 1200 x 1200) | 1:1 | | 5 MB | | PosterMyWall, Sprout |
| Feed image, landscape / link | **1200 x 627** | 1.91:1 | | 5 MB | | Buffer, Hootsuite |
| Document (PDF) "carousel" post | **1080 x 1350** per page (also 1080 x 1080, 1920 x 1080) | 4:5 | Keep >= 50 px (better 80 px) margins; LinkedIn overlays page counter and arrows | **100 MB, 300 pages** | **PDF** (also PPT/PPTX/DOC/DOCX) | Oktopost 2026 https://www.oktopost.com/blog/linkedin-carousel-pdf-best-practices/ : 5-15 slides recommended; body text not smaller than ~24 pt in design tools; "text smaller than 20 pt becomes difficult to read". Export as vector PDF with embedded fonts, never as rasterised images. Also add a document title (shown above the viewer). |
| Personal profile banner | **1584 x 396** | 4:1 | Profile photo overlaps bottom-left. Estimates: ~170 x 170 px desktop, ~220 x 220 px mobile (linkedgrow); mobile crops ~15% per side. **[DERIVED] safe text box: x 480-1390, y 40-300**, right-aligned text works best | **8 MB** | PNG/JPG | [CONFLICT/uncertain] LinkedIn publishes no official overlap coordinates; third parties give different shapes (cropyourimage, rightblogger, wavegen). Use the conservative box and preview on a phone. Sources: Neal Schaffer https://nealschaffer.com/linkedin-banner-size/ ; linkedgrow https://linkedgrow.ai/blog/linkedin-banner-size |
| Company page cover | **4200 x 700** (current), 1128 x 191 (legacy) | 6:1 | Logo overlaps bottom-left; centre content | 3 MB | PNG/JPG | [CONFLICT] Hootsuite, PosterMyWall, Wavegen still list 1128 x 191; Sprout and Neal Schaffer list 4200 x 700. Same ratio, so design 4200 x 700 and both work. |
| Company logo | 400 x 400 | 1:1 | | 3 MB | PNG | |
| Article cover | **1920 x 1080** (16:9); 1280 x 720 min commonly cited | 16:9 | Centre; may be cropped to ~1.91:1 in feed | | JPG/PNG | [3P, not verified on LinkedIn help] |
| Newsletter cover | **1280 x 720** (16:9) | 16:9 | Centre | | | Wavegen https://wavegen.ai/linkedin-cover-photo-size ; newsletter logo commonly 300 x 300 [unverified] |
| Event cover | **1776 x 444** | 4:1 | Centre | | | Wavegen, Moda https://moda.app/resources/sizes/linkedin-event-cover [3P x2, not verified on LinkedIn help] |
| Profile photo | 400 x 400 (min 268 x 268) | 1:1 circle | | 8 MB | | Sprout says max 3 MB for profile image; Neal Schaffer 8 MB [CONFLICT, minor] |

---

## 4. YouTube

| Item | Pixel size | Ratio | Safe zone / overlay | Max file | Format | Notes / sources |
|---|---|---|---|---|---|---|
| Video thumbnail | **Official: 3840 x 2160** recommended; min width 640; classic **1280 x 720** still fine | 16:9 | Bottom-right corner (approx. last 20% width x 15% height) is covered by the duration stamp; progress bar along bottom edge | **Desktop 50 MB; mobile 2 MB** | JPG or PNG | **[OFFICIAL]** https://support.google.com/youtube/answer/72431 : "resolution of 3840 x 2160 pixels for videos and 2160 x 3840 for Shorts... Mobile: 2 MB for video thumbnails or 10 MB for podcasts. Desktop: 50MB". Announced Oct 2025 (9to5Google https://9to5google.com/2025/10/30/youtube-video-thumbnail-file-size-limits/). Third-party guides that still say "1280 x 720, 2 MB max" are outdated on the limit, though 1280 x 720 remains acceptable. |
| Shorts thumbnail | 2160 x 3840 (min height 640) | 9:16 | | 50 MB desktop | JPG/PNG | Custom Shorts thumbnails only from YouTube Studio on desktop [OFFICIAL same page] |
| Podcast playlist thumbnail | 1:1 (e.g. 1280 x 1280) | 1:1 | | 10 MB mobile | | Official page + Hootsuite |
| Channel banner | **2560 x 1440** (min 2048 x 1152) | 16:9 | **Safe area 1546 x 423 centred** = x 507-2053, y 508-931; desktop shows full-width band ~2560 x 423; TV shows the whole image | **6 MB** | JPG/PNG/BMP/non-animated GIF | HaveCameraWillTravel https://havecamerawilltravel.com/workflow/youtube-banner-size/ ; Sprout; PosterMyWall. |
| Profile picture | 800 x 800 (renders at 98 x 98) | 1:1 circle | | 4-15 MB (sources differ) | | Sprout (4 MB), Hootsuite (15 MB) [minor CONFLICT] |
| Shorts video | 1080 x 1920 | 9:16 | Google (Shorts ads): avoid **top 10% (192 px), bottom 25% (480 px), right 10% (108 px)**; "all YouTube placements" overlay: top 288, bottom 672, left 48, right 192 | | | solidlabs, citing Google Ads help |
| End screen | Part of the 16:9 video | 16:9 | Last **5-20 s**; video must be >= 25 s; up to **4 elements**; leave the area for element tiles free of important visuals | | | **[OFFICIAL]** https://support.google.com/youtube/answer/6388789 ; custom images >= 300 x 300 |

Thumbnail design note: the thumbnail is mostly seen at 160-360 CSS px wide on mobile, i.e. a scale of ~0.13-0.28 of a 1280-wide canvas [DERIVED]. Text needs to be **>= 100 px tall on a 1280 x 720 canvas** (>= 300 px on 3840 x 2160) and limited to 3-5 words.

---

## 5. TikTok (9:16)

| Item | Pixel size | Ratio | Safe zone | Max file | Notes |
|---|---|---|---|---|---|
| Video / photo post | **1080 x 1920** | 9:16 (4:5 also allowed for photo mode) | See conflict below | Ads: <= 500 MB video | Photo carousel up to 35 images (Buffer). Official ads spec: 9:16, >= 540 x 960, "safe zone size is determined by the dimension, ad caption length, and any additional formats"; downloadable template ZIP in Ads Manager. https://ads.tiktok.com/help/article/tiktok-auction-in-feed-ads |
| Profile photo | 200 x 200 (ads: 98 x 98, < 50 KB, key element in centre 66 x 66) | 1:1 | | | [OFFICIAL] TikTok ads help |

**[CONFLICT] TikTok safe-zone pixels (1080 x 1920):**
- Cadenus (from TikTok's downloadable templates, July 2026): top **130**, bottom **484**, left **44**, right **140** (safe box 896 x 1306). https://cadenus.io/resources/blog/tiktok-safe-zone/
- solidlabs (TikTok Ads Manager help, checked 2026-08-07): top **240**, bottom **660**, left **120**, right **120**, and the right margin widens to **300 px below the vertical midpoint** where the like/comment/share rail sits. https://www.solidlabs.com/social-safe-zones
- TikTok itself says longer captions shrink the safe zone upward.
- **Recommendation:** use the stricter set: top 240, bottom 660, left 120, right 140 (and keep the lower-right quadrant clear to x 780).

**Universal 9:16 safe box [DERIVED]:** taking the strictest margin from Meta Reels (top 269, bottom 672, sides 65), TikTok (top 240, bottom 660, left 120, right 140/300) and YouTube "all placements" (top 288, bottom 672, left 48, right 192): **top 288, bottom 672, left 120, right 192 => box x 120-888, y 288-1248 (768 x 960 px)**. Anything inside this box is safe on Reels, Stories, TikTok and Shorts.

---

## 6. Zalo OA (Vietnam)

Zalo publishes only minimums; third-party Vietnamese sources disagree substantially. Treat all display numbers as **to be verified by test upload**.

| Item | Official (oa.zalo.me / Zalo Business) | Third-party claims | Recommendation | Sources |
|---|---|---|---|---|
| OA avatar | min **320 x 180** px (same rule as cover), **< 15 MB** | 200 x 200 recommended, min 150 x 150, max 1 MB (CNV, smsthuonghieu, quantrimang) | Upload **720 x 720** PNG/JPG, logo inside centre circle | Official: https://oa.zalo.me/home/documents/guides/trang-thong-tin-oa_73 ; CNV https://cnv.vn/kich-thuoc-anh-zalo-oa/ |
| OA cover | min **320 x 180** px, **< 15 MB** | (a) 640 x 700 display, safe **640 x 340**, max 1 MB (CNV) or 15 MB (Moti); (b) 640 x 700, safe 320 x 350 (zoa.vn); (c) legacy 320 x 350 with safe 320 x 180 (quantrimang, toponseek, personal Zalo) | **[DERIVED] design on 1280 x 1400 (2x of 640 x 700); place all text/logo in the central band y 360-1040 (1280 x 680)**. That band is 2x the claimed 640 x 340 safe area and also fits inside a 16:9 centre crop (1280 x 720), so it survives either display model. Test on phone and desktop. | Moti https://moti.com.vn/kich-thuoc-anh-bia-zalo-oa-moi-nhat-2025 ; zoa https://zoa.vn/kich-thuoc-anh-bia-zalo-oa/ ; Quantrimang https://quantrimang.com/cong-nghe/kich-thuoc-anh-bia-zalo-zalo-oa-chuan-163498 |
| Article (bài viết) thumbnail / cover | **16:9, with a 14:9 safe display zone**, PNG or JPG, **max 15 MB** | 320 x 180 (old), >= 1200 px wide 4:3 or 16:9, 1-5 MB | **1280 x 720** (or 1920 x 1080); keep text inside centre **1120 x 720** (80 px side margins = 14:9) [DERIVED] | **[OFFICIAL]** https://oa.zalo.me/home/documents/guides/tao-bai-viet_5 |
| Broadcast (tin truyền thông) | Broadcast messages send an OA article, so the image shown is the article cover (16:9, 14:9 safe) | | Same as article thumbnail | https://oa.zalo.me/home/documents/vie/guides/tin-truyen-thong-broadcast_71 (page did not expose the image table to the fetcher) |
| ZNS / ZBS template image | **16:9 landscape, <= 500 KB, .jpg/.png**, 1-3 images in header; **text overlay must not exceed 50% of image area**; no QR codes; AI images must be disclosed | | 1280 x 720 JPG, compressed under 500 KB | **[OFFICIAL]** Zalo Business Solutions https://zalo.solutions/news/huong-dan-cac-quy-dinh-xet-duyet-template-zns-chua-module-hinh-anh/pkk6ds8irzpv7mok9hebggji |
| Product / shop image | | 500 x 500 or 800 x 800, 1:1, 1 MB | 1080 x 1080 | CNV, prodima |
| Zalo Ads | | 1024 x 533 (2 MB) or 480 x 250; video thumbnail 1200 x 627 | Use 1200 x 628 master | CNV, quantrimang (conflicting, likely format-specific) |
| Link sharing on Zalo | Zalo reads Open Graph tags | | Same 1200 x 630 OG image; re-scrape cache with Zalo's sharing debug tool if the preview is stale (developers.zalo.me, verify URL) | toponseek |

Note: OA profile changes on verified accounts need Zalo approval (2-3 business days, up to 7) per the official guide.

---

## 7. Threads and X (brief)

| Item | Size | Ratio | Max file | Notes / sources |
|---|---|---|---|---|
| Threads post image | **1080 x 1350** (4:5) recommended; 1:1, 9:16, 1.91:1 also | 4:5 | 8 MB (Hootsuite) vs 100 MB (Linearity) [CONFLICT] | Hootsuite (Oct 2026) says native 3:4 at 1440 x 1920 and up to 20 images; Linearity (May 2025) says up to 10. Threads accepts almost any ratio (0.01:1 to 10:1). |
| Threads link preview | 1200 x 600 (2:1) | 2:1 | | Buffer, Linearity. In practice Threads uses the page's OG image, so a 1200 x 630 OG with centre-safe text is fine. |
| Threads profile | 320 x 320 (Hootsuite: 640 x 640) | circle | | |
| X single image | **1600 x 900** (16:9) or 1080 x 1350 (4:5) | | **5 MB mobile / 15 MB web** (GIF 15 MB) | Timeline can crop toward ~2:1; keep focal content in central band. Mintycrop https://blog.mintycrop.com/x-post-image-sizes-in-2026-what-actually-works ; Sprout |
| X header | **1500 x 500** (3:1) | 3:1 | 5 MB | Edges clip on mobile, ~60 px may be cropped top/bottom (Hootsuite); profile photo overlaps bottom-left |
| X profile | 400 x 400 | circle | 2-5 MB | |
| X link card (summary_large_image) | 1200 x 628 / 2:1 | | ~5 MB | Uses twitter:image or og:image; keep text centred (unverified on X developer docs in this pass) |

---

## 8. Website, email, webinar

### 8.1 Website images

| Item | Pixel size | Ratio | Safe zone | Max file | Format | Notes / sources |
|---|---|---|---|---|---|---|
| Hero banner, desktop | Master **2560 x 1440** or **1920 x 1080** (full-bleed); wide variant 1920 x 800 (2.4:1) | 16:9 or ~2.4:1 | Keep subject away from the text column; on wide screens CSS `object-fit: cover` crops top/bottom | Aim **< 200-300 KB** after compression | **AVIF + WebP + JPG fallback** via `<picture>` | Provide `srcset` widths e.g. 640, 960, 1280, 1920, 2560 with `sizes="100vw"`. Put headline/CTA in live HTML text, not baked into the image (accessibility, SEO, translation, sharpness). |
| Hero banner, mobile (art direction) | **1080 x 1350** (4:5) or 828 x 1104 (3:4) | 4:5 / 3:4 | Re-compose: subject top, text area bottom | < 150 KB | as above | Use `<picture><source media="(max-width: 767px)" srcset="hero-mobile.avif">` for a different crop, not just a smaller file. |
| Open Graph image | **1200 x 630** | 1.91:1 | Keep text in centre ~1000 x 500; Zalo/LinkedIn/Threads may centre-crop | **8 MB** max (Meta); aim < 300 KB | JPG/PNG | Add `og:image:width`, `og:image:height`, `og:image:alt` (ogp.me https://ogp.me/ ; Meta https://developers.facebook.com/docs/sharing/webmasters/images/). Add `twitter:card=summary_large_image`. |
| Blog featured image | **1200 x 630** (same as OG, one file serves both) or 1600 x 900 for in-page display with a 1.91:1 safe band | 1.91:1 / 16:9 | | < 200 KB | AVIF/WebP + JPG | |
| Favicon set (2026) | `favicon.ico` **32 x 32**; `icon.svg` (supports dark mode via media query); `apple-touch-icon.png` **180 x 180**; `icon-192.png`; `icon-512.png`; `icon-mask.png` **512 x 512** maskable (keep artwork inside central circle of **409 px** diameter) | 1:1 | | | ICO/SVG/PNG | Evil Martians, updated 2026 https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs . Snippet: `<link rel="icon" href="/favicon.ico" sizes="32x32">`, `<link rel="icon" href="/icon.svg" type="image/svg+xml">`, `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`, `<link rel="manifest" href="/manifest.webmanifest">` |

Format support (web): WebP is Baseline "widely available" (all major browsers since Sept 2020); AVIF reached all major browsers on 2024-01-26 (Baseline 2024) and so passes the 30-month "widely available" threshold around mid-2026. RUMvision: https://www.rumvision.com/blog/modern-image-formats-webp-avif-browser-support/ . Still ship a JPG/PNG fallback in `<picture>` if your audience includes older iOS/Android devices.

### 8.2 Email newsletter

| Item | Size | Notes / sources |
|---|---|---|
| Template width | **600-640 px** (display) | Industry standard; avoid > 800 px for Outlook Windows. Tabular https://tabular.email/blog/email-template-size-width-and-height |
| Header image | Display 600 x 100-200 px; **export at 2x: 1200 x 200-400** | Set `width="600"` in HTML so retina files render at display size |
| Full-width hero | Display 600 x 300-400; export 1200 x 600-800 | |
| File size | **< 200 KB per image** (hard ceiling ~1 MB); GIF < 500 KB | |
| Gmail clipping | HTML over **102 KB** is clipped; target ~75 KB | |
| Accessibility | Alt text on every image; never put the only copy of key information inside an image (many clients block images by default); test dark mode (dark text on transparent PNG disappears on dark backgrounds, so give logos a light outline or a solid background) | |

### 8.3 Webinar / meeting visuals

| Item | Size | Notes / sources |
|---|---|---|
| Zoom virtual background | **1920 x 1080** (16:9); minimum 1280 x 720 | JPG/PNG. Your self-view is mirrored by default, but other participants see text the correct way round. Keep the centre-lower area (roughly x 560-1360, y 300-1080) free for your head and shoulders; place logo/name in a top corner. Tapflare https://tapflare.com/articles/virtual-background-image-specifications |
| Microsoft Teams background | 1920 x 1080 (16:9) | Tapflare |
| Google Meet background | 16:9, 1920 x 1080 or higher, static only | Tapflare |
| Slides for Zoom/Meet sharing | **1920 x 1080 (16:9)** | Viewers often watch in a reduced window or on phones: minimum ~28 pt (about 37 px on a 1920 canvas) for body text, 40+ pt for titles [DERIVED rule of thumb]. Keep the top-right free if the speaker thumbnail floats there. |
| YouTube end screen | Last 5-20 s of a 16:9 video, up to 4 elements | See section 4 |

---

## 9. Export best practices

### 9.1 What platforms actually do with your file

| Platform | Max kept / behaviour | Implication |
|---|---|---|
| Facebook | Keeps up to **2048 px on the longest side**; larger images are downscaled; re-encodes to JPEG; PNG uploads are often preserved with less damage for graphics; cover photos under ~100 KB are reportedly not recompressed | Export text-heavy feed graphics at **2048 px long side** (e.g. 1638 x 2048 for 4:5) as **PNG**; covers as small PNG/JPG. Louise Myers https://louisem.com/1730/how-to-optimize-photos-for-facebook |
| Instagram | Help page: "up to 1080" wide; all uploads re-encoded to JPEG (estimated quality ~70-75 by SammaPix, unverified); untagged files assumed sRGB; Display P3 behaviour inconsistent | Upload **exactly 1080 px wide** (1080 x 1350 / 1080 x 1440 / 1080 x 1920) so Instagram does not resample; JPG at quality 90-95 or PNG; sRGB embedded. SammaPix https://www.sammapix.com/blog/instagram-image-quality-loss-fix ; colormanagement.guide https://colormanagement.guide/en/troubleshooting/instagram-colors-changed/ |
| LinkedIn | Re-encodes images; PDFs in document posts are rendered page by page | For document posts upload a **vector PDF with embedded fonts**: text stays crisp at any zoom |
| YouTube | Thumbnails served at up to 4K | 3840 x 2160 PNG/JPG under 50 MB (desktop upload) |
| X | 5 MB mobile / 15 MB web; re-encodes large PNGs to JPG | Keep PNGs under 5 MB to avoid conversion |

### 9.2 Format choice

| Content | Best upload format | Why |
|---|---|---|
| Text-heavy graphics, flat colours, quotes, carousels | **PNG-24** (or PNG-8 if few colours) | No pre-compression artifacts; edges stay sharp before the platform re-encodes |
| Photos, gradients | **JPG quality 85-95, sRGB, progressive** | Smaller files; platforms recompress anyway |
| Website delivery | **AVIF** (primary) + **WebP** + JPG fallback | 30-50% smaller than JPG at equal quality |
| Social uploads | Avoid WebP/AVIF (support varies; often converted) | Upload JPG/PNG |
| Print/PDF carousel | Vector PDF | |

### 9.3 Colour

- Convert to **sRGB IEC61966-2.1, 8-bit, profile embedded** before export (Photoshop: Edit > Convert to Profile; Figma/Canva export sRGB by default). Untagged or Adobe RGB/P3 files shift colour (desaturate) after upload. CMYK files are forcibly converted and shift visibly (ContentStudio).

### 9.4 Minimising artifacts on text-heavy graphics

1. **Chroma subsampling:** platforms re-encode to JPEG, usually with 4:2:0 chroma subsampling, which halves colour resolution. Thin, saturated text (red on blue, orange on purple, pure red on black) smears first. Mitigation: build text contrast mainly from **lightness** (light on dark or dark on light), not hue alone; avoid hairline weights; if you export JPG yourself, choose **4:4:4 / "chroma subsampling off"** (e.g. in Squoosh/mozjpeg) so you do not add a second round of smearing.
2. **Size and weight:** use at least Regular/Medium weights at the sizes in section 10; avoid 1-px strokes and fine textures behind text.
3. **Vietnamese diacritics:** stacked marks (ế, ộ, ữ, ẳ) are the first details lost to compression and downscaling. Use fonts with solid Vietnamese support (e.g. Be Vietnam Pro, Inter, Lexend, Roboto, Noto Sans/Serif), line-height 1.3-1.45 for body, and avoid ultra-thin/condensed display fonts at small sizes.
4. **Exact pixel dimensions:** upload at the size the platform stores (1080 wide for Instagram, <= 2048 long side for Facebook) to avoid an extra resample.
5. **Avoid flat large gradients** behind text (banding after recompression); add 1-2% noise if needed.
6. **Do not pre-sharpen heavily**; sharpening halos get amplified by JPEG.

### 9.5 Export at 2x or 1x?

- Design at 1x logical size (1080 x 1350) in Figma/Canva for predictable type sizes; export at:
  - Instagram: **1x (1080 wide)**.
  - Facebook organic: **up to 2048 long side** (about 1.5x-1.9x) for text graphics.
  - LinkedIn images: 1x-2x is fine within 5 MB; PDF as vector.
  - YouTube thumbnail: 3x (3840 x 2160) or 1x (1280 x 720), both accepted.
  - Web: generate a `srcset` from a 2x master (e.g. 2560 or 3840 wide) and let the browser pick.
  - Email: **2x** with HTML width attributes at 1x.

---

## 10. Multi-format adaptation ("key visual adaptation")

### 10.1 How professional teams structure it

1. **One key visual (KV) master**, built in layers that adapt differently:
   - **Background layer** (photo, texture, colour field): *scales and crops*; extend it with generous bleed (design the background at least 20-30% larger than any single frame, or generate extensions) so 9:16 and 16:9 crops are both possible.
   - **Hero element** (portrait, object, illustration): *repositions and rescales* per format, anchored to a focal point.
   - **Headline / copy**: *re-flows* (line breaks and size change per format), never just scaled down. 16:9 and 1.91:1 often need a shorter headline variant.
   - **Logo / brand mark**: fixed size relative to the short side of the canvas (e.g. 6-8% of the short side), pinned to a corner inside the safe zone.
   - **CTA / date / handle**: re-flows; dropped entirely in tiny formats (right column, favicon, profile photo).
2. **Format family**, produced from the master in this order (tallest to widest): **9:16 (1080 x 1920) -> 3:4 (1080 x 1440) -> 4:5 (1080 x 1350) -> 1:1 (1080 x 1080) -> 16:9 (1920 x 1080) -> 1.91:1 (1200 x 630) -> banners (4:1, 6:1, 2.7:1)**. Designing vertical first is the advice of Buffer 2026 ("Start with vertical. A 4:5 or 9:16 image works well on most platforms").
3. **Tooling:** Figma (frames with Auto Layout + constraints + variables for copy variants), Canva "Resize/Magic Switch" (then manually re-flow text: auto-resize never respects safe zones), Adobe Express/InDesign alternate layouts. Keep a library of **safe-zone overlay frames** (locked, hidden on export) for each platform.
4. **QA checklist per output:** safe zone overlay on, text on-device preview at 100% phone size, grid preview (Instagram 3:4), contrast check, file size check, alt text written.

### 10.2 Safe boxes per format (for the overlay library)

| Format | Canvas | Safe box for text/logo | Source |
|---|---|---|---|
| 9:16 universal (Reels, Stories, TikTok, Shorts) | 1080 x 1920 | **x 120-888, y 288-1248** | [DERIVED] from Meta, TikTok, YouTube |
| 9:16 Meta only | 1080 x 1920 | x 65-1015, y 269-1248 | Meta Ads Guide |
| 3:4 IG | 1080 x 1440 | x 60-1020, y 60-1380 | [DERIVED] 5.5% margin |
| 4:5 feed (IG grid-safe) | 1080 x 1350 | **x 90-990, y 70-1280** (stays inside IG's 1012-wide grid crop) | [DERIVED] |
| 1:1 feed (IG grid-safe) | 1080 x 1080 | **x 150-930** (grid shows only the centre 810 px) | [DERIVED] |
| 16:9 YouTube thumb | 1280 x 720 | x 64-1216, y 48-672; keep bottom-right (x > 1000, y > 600) clear of the duration stamp | [DERIVED] |
| 1.91:1 OG / link | 1200 x 630 | x 100-1100, y 60-570 | [DERIVED] |
| FB cover | 1640 x 924 | x 180-1460, y 150-774 (minus bottom-left avatar zone) | [DERIVED] section 1.3 |
| LinkedIn banner | 1584 x 396 | x 480-1390, y 40-300 | [DERIVED/uncertain] section 3 |
| YouTube banner | 2560 x 1440 | x 507-2053, y 508-931 | YouTube safe area |
| Zalo OA article | 1280 x 720 | x 80-1200 (14:9) | Zalo official ratio |

### 10.3 Minimum font sizes for mobile legibility [DERIVED]

Basis: a 1080-px-wide post is shown about 360-430 CSS px wide on a phone, a scale of **~0.33-0.40**. A comfortable reading size is ~16 CSS px, the practical floor ~12 CSS px. On Instagram's 3-column profile grid each tile is ~125-140 CSS px wide (scale ~0.12).

| Format (canvas) | Display scale | Headline min | Body min | Fine print floor | Words on image |
|---|---|---|---|---|---|
| Feed 4:5 / 3:4 / 1:1 (1080 wide) | ~0.36 | **72-96 px** | **40-44 px** (= ~16 CSS px) | 32 px (~12 CSS px) | <= 20-25 words per slide |
| Carousel / LinkedIn PDF slide (1080 x 1350) | ~0.36 | 72-110 px | 40-48 px | 32 px | <= 40 words per slide, 6-8 lines |
| 9:16 story/reel (1080 x 1920) | ~0.36 | 80-110 px | 44-52 px | 36 px | short; on-screen time matters |
| Grid-legible cover (IG 3:4 tile) | ~0.12 | **>= 120 px** (~14 CSS px at tile size) | not legible | | 2-5 words |
| YouTube thumbnail (1280 x 720) | ~0.13-0.28 | **>= 100 px** (>= 300 px on 3840 canvas) | not legible | | 3-5 words |
| OG / link image (1200 x 630) | ~0.30 | >= 64 px | >= 40 px | | <= 10 words |
| FB cover / LinkedIn banner | ~0.25-0.45 | >= 64 px (on 1x canvas) | >= 36 px | | one line |
| Email (600 display) | 1.0 (CSS px) | 28-32 px | 16 px | 14 px | live HTML text preferred |
| Slides 1920 x 1080 for Zoom | ~0.2-0.5 | >= 56 px | >= 37 px (~28 pt) | | |

Oktopost's PDF guidance (body >= 24 pt; < 20 pt hard to read) is consistent with this only if "pt" refers to a ~540-pt-wide slide in PowerPoint/Keynote; on a 1080-px canvas the equivalent is ~48 px. When a guide quotes "pt" without the canvas size, convert using the ratio of the canvas width to the phone display width.

### 10.4 Accessibility

- **Contrast, WCAG 2.2 SC 1.4.3 (AA)**: at least **4.5:1** for normal text and **3:1** for large text; large text = at least 18 pt (= 24 CSS px) regular or 14 pt (~18.66 CSS px) bold. Applies explicitly to **images of text**. AAA (SC 1.4.6) = 7:1. Non-text graphics and UI (SC 1.4.11) = 3:1. W3C: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- **Important for social graphics [DERIVED]:** the "large text" threshold is measured in CSS px *as displayed*. At a ~0.36 display scale, 24 CSS px corresponds to ~**65 px on a 1080 canvas**. So any text smaller than ~65 px (regular) or ~52 px (bold) on a 1080 canvas should meet **4.5:1**, not 3:1.
- Do not rely on colour alone (e.g. red/green for right/wrong in a quiz carousel); add icons or labels.
- **Alt text:** write custom alt text for every image on Facebook, Instagram (Advanced settings > Accessibility), LinkedIn, X, Threads, websites (`alt`), OG (`og:image:alt`) and email. For text-heavy graphics, the alt text should contain the full text of the image; for carousels, describe each slide. For LinkedIn PDF documents, also put the key message in the post body because document text is not reliably read by screen readers.
- **Captions:** burn-in or upload captions for Reels/TikTok/Shorts/YouTube; keep burned-in captions inside the universal 9:16 safe box (y 288-1248), typically around y 900-1200.
- **Motion:** avoid fast flashing (> 3 flashes per second, WCAG 2.3.1).

---

## 11. Open issues / items to verify by test upload

1. Zalo OA cover actual display geometry (640 x 700 vs 16:9): conflicting third-party data; official page only gives a minimum (320 x 180) and a 15 MB cap.
2. LinkedIn profile-photo overlap coordinates on the 1584 x 396 banner: no official numbers.
3. TikTok exact safe-zone pixels: two incompatible third-party extractions of TikTok's own templates; download the ZIP in TikTok Ads Manager for the authoritative overlay.
4. Instagram native resolution (1080 vs 1440 kept) and 3:4 upload support: not confirmed on an Instagram help page in this pass.
5. LinkedIn event, article and newsletter cover sizes: third-party only.
6. Threads image limits (8 MB vs 100 MB; 10 vs 20 items).
7. Meta official Ads Guide pages block automated fetching (robots.txt); Meta numbers here are quoted through 2+ third-party sources that cite them verbatim.
