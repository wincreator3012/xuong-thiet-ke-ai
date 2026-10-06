# Graphic design principles and practice: a literature review for an AI design agent

Prepared 2026-10-06. Audience: an AI agent that designs social posts, event posters, workshop handouts, stage backdrops and knowledge infographics for Vietnamese educators, experts and speakers (knowledge-rich content; frameworks with named stages). Rules marked "workshop default" are the shared defaults of this workshop; each user can change them in phong-cach/PHONG-CACH.md.

## 0. How to use this document

Every rule is numbered (R1.1, R1.2 ...) so it can be quoted in a design brief or a QA log. Each rule carries an evidence grade so the agent knows how hard to hold it:

| Grade | Meaning | How to treat it |
|---|---|---|
| **A** | Meta-analysis, replicated experimental findings, or a formal standard (WCAG) | Default; break only with a written reason |
| **B** | One or a few peer-reviewed studies; plausible but context-bound | Apply, but check fit for the piece |
| **C** | Canonical practitioner literature (Bringhurst, Müller-Brockmann, Lupton, Williams, Tufte, NN/g, Material/HIG) | Professional consensus; strong default |
| **D** | Folk heuristic, no good empirical support found | Use as a starting point only; never cite as "science" |

Where I could not verify a source or a number, I say so. I did not invent citations; items marked "(verify)" are ones I am confident exist but could not open the primary page in this session.

---

## 1. Visual hierarchy, reading patterns, gestalt, whitespace

### 1.1 What the sources say

- **Gestalt grouping** (proximity, similarity, common region, continuity, closure, figure/ground) is one of the most replicated bodies of perception research; Wagemans et al. (2012) review a century of it and confirm that grouping is fast and largely automatic, though the classic "laws" are better seen as tendencies that interact (Wagemans et al., 2012, *Psychological Bulletin* 138(6), 1172-1217, doi:10.1037/a0029333).
- **CRAP** (Contrast, Repetition, Alignment, Proximity) is the most teachable practitioner synthesis (Williams, *The Non-Designer's Design Book*, 4th ed., 2014). Williams' core advice: if two elements are not the same, make them *very* different; timid contrast reads as a mistake.
- **Reading patterns.** NN/g eye-tracking (original 2006 study; Pernice, 2017 update, https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) found the F-pattern on text-heavy pages *without* strong formatting, and names other patterns: layer-cake (scanning headings), spotted, marking, bypassing and commitment (reading everything when motivated). The F-pattern is a symptom of poor formatting, not a target to design for.
- **Z-pattern / Gutenberg diagram** (attributed to newspaper designer Edmund Arnold; included in Lidwell, Holden & Butler, *Universal Principles of Design*, rev. ed. 2010) is a practitioner model with weak direct evidence. Lidwell et al. themselves note it applies mainly to evenly distributed, homogeneous layouts; a strong focal point overrides it. I found no peer-reviewed eye-tracking study validating the Z-pattern for posters. Grade D as a law; grade C as a "default path when nothing else pulls the eye."
- **First impressions are fast and aesthetic.** Lindgaard et al. (2006) showed visual-appeal judgments of web pages form within ~50 ms and correlate with longer viewings (*Behaviour & IT* 25(2), 115-126, doi:10.1080/01449290500330448). Reinecke et al. (2013) found computational measures of *visual complexity* and *colorfulness*, plus viewer demographics, explain about half the variance in appeal ratings after 500 ms exposure (CHI 2013, 2049-2058, doi:10.1145/2470654.2481281). Tuch et al. (2012, *IJHCS* 70(11), 794-811, doi:10.1016/j.ijhcs.2012.06.003 (verify)) found low complexity + high prototypicality (looks like its genre) is judged most appealing. Harrison, Reinecke & Chang (2015, "Infographic aesthetics: designing for the first impression", CHI 2015, doi:10.1145/2702123.2702545) extended the complexity/colorfulness model to infographics. Reinecke & Gajos (2014, CHI, doi:10.1145/2556288.2557052 (verify)) found these preferences vary by country, age and education, so there is no single "universal" optimal complexity.
- **Aesthetic-usability effect.** Kurosu & Kashimura (1995, CHI '95 companion, doi:10.1145/223355.223680 (verify)) and Tractinsky, Katz & Ikar (2000, *Interacting with Computers* 13(2), 127-145, doi:10.1016/S0953-5438(00)00031-X) found attractive interfaces were perceived as more usable. Caution: Tuch et al. (2012, *Computers in Human Behavior* 28(5), 1596-1607, doi:10.1016/j.chb.2012.03.024) found the causal arrow can run the other way (poor usability lowers post-use beauty ratings). Beauty buys a first-impression credit, not a pass for poor function.
- **Whitespace / ma.** Japanese *ma* (間, the meaningful interval) entered Western design discourse notably through Arata Isozaki's 1978 exhibition "Ma: Space-Time in Japan." The often-repeated claim that "whitespace increases comprehension by 20%" could not be traced to a solid primary source; do not repeat it. Defensible evidence for whitespace is indirect: it lowers measured visual complexity (Reinecke et al., 2013) and strengthens proximity grouping (Wagemans et al., 2012).
- **Squint/blur test.** A practitioner technique (blur or squint until text is unreadable; what remains visible is the real hierarchy). No validation study found; grade C as a QA tool.

### 1.2 Actionable rules

- **R1.1 One focal point per surface (C/B).** Decide the single element the viewer must see first (usually the headline or the face). Make it win on at least two contrast channels at once (size + weight, size + color, value + isolation). Rationale: gestalt figure/ground; first-impression speed (Lindgaard 2006).
- **R1.2 Three levels of hierarchy, rarely four (C).** Primary (hook/headline), secondary (subhead, key facts such as date/venue), tertiary (body, CTA detail, credits). A fourth level (fine print, logos) is allowed only if visually quiet. If you need five levels, the content needs editing, not design.
- **R1.3 Scale contrast heuristics (D, practitioner).** Headline at least 2x the body size on handouts, and 3-6x on posters/social posts viewed on a phone. Adjacent levels should differ by at least one step of a modular scale (see 2.2). Make differences obvious (Williams' "don't be a wimp").
- **R1.4 Design the eye path explicitly (C/D).** For a poster or post: focal point -> headline -> supporting line -> date/place -> CTA/logo. In left-to-right Vietnamese (Latin script), a top-left to bottom-right default path is reasonable, but a strong focal point, gaze cue (5.1) or directional shape overrides it. I found no Vietnam-specific eye-tracking research; assume Western LTR findings transfer with caution.
- **R1.5 Format text for layer-cake scanning, not F-scanning (B, NN/g).** On handouts and long infographics: informative headings with the key word first, short paragraphs, bolded key phrases (sparingly), bullets for parallel items.
- **R1.6 Group by proximity before adding boxes or lines (A/C).** Space within a group should be visibly smaller than space between groups (practitioner ratio: between-group gap at least 2x within-group gap). Use common region (a tinted panel) only when proximity alone fails. Tufte's "1 + 1 = 3" warning (*Envisioning Information*, 1990): every added line or border creates extra visual "activity" between elements.
- **R1.7 Align everything to something (C).** Every element's edge or center should share an axis with another element. Prefer one dominant alignment (flush left for Vietnamese body text; centered only for short, symmetric, ceremonial compositions such as stage backdrops or quote cards).
- **R1.8 Repeat to build a system (C).** Same heading style, same color roles, same corner radius, same icon style, same photo grade across every item in a campaign, so the series is recognizable before it is read.
- **R1.9 Budget visual complexity (B).** Fewer distinct elements, fewer colors, larger empty areas for promotional pieces, where first-impression appeal matters (Reinecke 2013; Tuch 2012). Knowledge infographics may carry more density (see 6.3 on memorability), but density must be *organized* (grid + grouping), not scattered.
- **R1.10 Treat whitespace as an active element (C).** Reserve 30-50% of a promotional surface as empty or near-empty space (D, practitioner heuristic). For calm, knowledge-led brands, generous *ma* is also brand-congruent: it signals calm and confidence, not lack of content.
- **R1.11 Keep it prototypical enough (B).** A workshop poster should still be recognizable as a poster (title, date, place, who, how to register). Novelty should live in imagery and typography, not in hiding the expected information (Tuch et al., 2012 IJHCS).

---

## 2. Grids, layout systems, spacing and proportion

### 2.1 What the sources say

- **Modular grids.** Müller-Brockmann, *Grid Systems in Graphic Design* (1981, Niggli): the grid gives "objective, functional" order; fields (modules) are separated by gutters equal to one line of text, and module height is tied to the baseline (lines of type) so that text and images align. Lupton, *Thinking with Type* (3rd ed., 2024, Princeton Architectural Press) offers a modern teaching version (column, modular, hierarchical grids).
- **Baseline grid.** Bringhurst (*The Elements of Typographic Style*, v4.0, 2012) treats leading as the basic unit of vertical rhythm; spacing above/below headings should be multiples or simple fractions of the body leading.
- **8-point spacing.** Material Design uses an 8dp grid for components and spacing with a 4dp sub-grid for small elements and type (Material 2 "Spacing methods", https://m2.material.io/design/layout/spacing-methods.html; Material 3 spacing, https://m3.material.io/styles/spacing). It is a convention for consistency and for even scaling across screen densities, not a perceptual law (C).
- **Modular type scales.** Tim Brown, "More Meaningful Typography" (A List Apart, 2011) popularized musical-interval ratios (1.2 minor third, 1.25 major third, 1.333 perfect fourth, 1.5 perfect fifth, 1.618 golden). Bringhurst presents the classical type scale (6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 21, 24, 36, 48, 60, 72). Grade C: these give consistency, not measurable comprehension gains.
- **Golden ratio skepticism.** Markowsky (1992, "Misconceptions about the golden ratio", *College Mathematics Journal* 23(1), 2-19) debunks many claimed occurrences in art and architecture. Green (1995, *Perception* 24(8), 937-968) reviewed the psychology of golden-section preference and found the evidence weak and method-dependent. Use phi as one pleasant ratio among many, never as a claim of "scientific beauty" (D).
- **Rule of thirds.** Amirshahi et al. (2014, *Art & Perception* 2, 163-182, doi:10.1163/22134913-00002024) found aesthetic ratings correlated only weakly with subjective ROT scores and "not at all" with computed ROT values; high-quality photographs did not follow ROT more than controls. Useful as a cropping starting point (D/C), not a quality criterion.
- **Margins.** I found no authoritative standard stating "margin = X% of short side." Classical book canons (Van de Graaf, Tschichold; discussed by Bringhurst) are for books. For posters/social graphics the following is a practitioner heuristic (D).
- **Platform safe zones.** Meta's recommended Feed ratio is 4:5 (1080x1350) and 9:16 (1080x1920) for Stories/Reels; commonly cited Reels safe zones keep the top ~14% and bottom ~20-35% free of key text, with ~6% side margins (secondary sources summarizing Meta Ads Manager guidance, e.g., https://blog.adnabu.com/meta-ads/meta-safe-zones/; Meta's own help pages blocked automated fetching, so verify in Ads Manager's safe-zone overlay before publishing).

### 2.2 Actionable rules

- **R2.1 Start every layout from a grid (C).** Social post 1080x1350: 6-column or 4x5 modular grid. A4 handout: 6- or 12-column grid with 4-5 mm gutters. Poster A2/A1: 6-column or 6x8 modular. Stage backdrop (often 16:9 or wider, e.g., 6x3 m): 12-column with a central "speaker safe zone."
- **R2.2 Margins as a share of the short side (D).** Social/digital: 6-8% of short side (1080 px -> 64-88 px). Print poster: 5-8% plus bleed (see 4.3). Handout: at least 12-15 mm, and more on the inner edge if bound. Backdrop: keep critical text away from the bottom 20-25% (lectern, speaker's body, front-row heads) and outer 5-8% (lighting falloff, truss). Rationale: consistent breathing room and platform UI overlap.
- **R2.3 Use one spacing scale (C).** 4/8-based: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (px at 1080-wide canvas; scale proportionally for print). Never use arbitrary gaps like 13 or 27. Gaps between groups jump at least two steps from gaps within groups (R1.6).
- **R2.4 Pick one modular type scale per project (C).** Ratio by medium: 1.2-1.25 for dense handouts; 1.333 for slides and infographics; 1.5-1.618 for posters/social, where few levels and dramatic contrast are needed. Round to whole pixels/points.
- **R2.5 Baseline rhythm on text-heavy pieces (C).** Body leading = base unit (e.g., 10/14.5 pt -> 14.5 pt unit). Space above heading = 1.5-2 units, below = 0.5-1 unit (closer to the text it introduces: proximity).
- **R2.6 Phi and thirds as starting points only (D).** Allowed: placing a horizon or a face on a third line; a 1:1.618 split between image and text panel. Not allowed: claiming in copy or rationale that these make a design "scientifically beautiful."
- **R2.7 Design adaptively with constraints, not by scaling (C).** Build each campaign as a master layout with *roles*: anchor (logo, date), flexible (image fills remaining space, cropped on focal point), and stack (text block with fixed internal spacing). Use auto-layout/flex logic: text containers hug content, images fill, pins/constraints to edges. Generate variants for 1:1, 4:5, 9:16, 16:9, A4 and A2 from the same roles, then hand-tune each. Re-crop photos per ratio around the face/eyes; never squash.
- **R2.8 Respect platform safe zones (C/B).** For 9:16, keep headline and CTA inside the central ~60% vertical band; preview in the platform overlay.

---

## 3. Typography (with Vietnamese-specific rules)

### 3.1 What the sources say

- **Measure.** Bringhurst: 45-75 characters is satisfactory for single-column text, 66 ideal; 40-50 for multi-column. Butterick's *Practical Typography* (https://practicaltypography.com) suggests 45-90 characters. WCAG 2.2 SC 1.4.8 (AAA) caps lines at 80 characters.
- **Leading.** Butterick: "optimal line spacing is between 120% and 145% of the point size" (https://practicaltypography.com/line-spacing.html). WCAG 2.2 SC 1.4.12 requires content to survive user overrides of line height 1.5, paragraph spacing 2x, letter spacing 0.12em, word spacing 0.16em.
- **All caps.** Butterick: use caps for short headings, labels, captions, and "always add letterspacing to caps" (amount not specified; common practice 5-12% of em / 50-120 units in design tools, grade D).
- **Pairing.** Lupton (2024) and Bringhurst both advise pairing faces with contrasting roles but compatible structure (similar x-height, proportions, historical logic). Serif display + sans body (or the reverse) is a convention, not a rule.
- **Faux styles.** Bringhurst and Lupton both condemn mechanically slanted "italic" and synthetic bold; use true designed weights/italics.
- **Vietnamese.** Donny Trương's *Vietnamese Typography* (https://vietnamesetypography.com, CC-licensed web book, 10th anniversary edition) is the main English-language authority. Key points: diacritics must be "clear and balanced with the base glyphs"; acute/grave/hook above combined with circumflex are usually placed *to the right of* the circumflex rather than stacked straight up, because marks on top "might affect the leading"; marks "must not collide with adjacent letters"; the hook above must be smaller than a question mark; a breve must be curved, not a pointed caron; capitals need modified, flatter marks (https://vietnamesetypography.com/diacritical-details/, /design-challenges/). The Google Fonts production guide confirms Vietnamese needs stacked-mark anchors and special `.case` marks for capitals (https://googlefonts.github.io/gf-guide/diacritics.html). A TypeDrawers discussion (2017) documents that Vietnamese stacked capitals often exceed standard Latin ascender metrics, so type designers either enlarge font metrics or compress marks (https://typedrawers.com/discussion/2488/vietnamese-diacritic-ascender-adjustments). Practical consequence: tight leading collides or clips.
- **Line breaking.** Vietnamese writes each syllable as a space-separated unit; a "word" (e.g., *giáo dục*, *chánh niệm*) is often two or more syllables. Browsers and layout engines break at any space. I found no W3C "Vietnamese layout requirements" or gap-analysis document (W3C has them for Lao, Khmer, Thai and others, not Vietnamese as of this search), and no formal Vietnamese typesetting standard on phrase-keeping. The rules below are therefore grade C/D practice.
- **Font support check (verified 2026-10-06 against the `google/fonts` GitHub repository METADATA.pb files, field `subsets: "vietnamese"`).**

| Supports Vietnamese subset | Does NOT declare Vietnamese subset |
|---|---|
| Be Vietnam Pro, Inter, Montserrat, Noto Sans, Noto Serif, Noto Serif Display, Lora, Playfair Display, Playfair (2.0), Cormorant, Cormorant Garamond, EB Garamond, Fraunces, Literata, Newsreader, Source Serif 4, Merriweather, Spectral, Alegreya, Crimson Pro, Gelasio, Prata, IBM Plex Sans/Serif, Lexend, Manrope, Nunito, Mulish, Work Sans, Plus Jakarta Sans, Public Sans, Source Sans 3, Roboto, Open Sans, Raleway, Josefin Sans, Oswald, Quicksand, Philosopher, Arima, Dancing Script, Great Vibes | DM Serif Display, DM Sans, Libre Baskerville, Instrument Serif, Young Serif, Bodoni Moda, Cinzel, Marcellus, Bellefair, Lustria |

  Caveat: declaring the subset means the glyphs exist, not that they are well designed. Trương's criteria (mark size/weight balance, right-side stacking, no collisions, distinct hook above, curved breve, flattened capital marks) still need a visual check. Be Vietnam Pro was designed specifically for Vietnamese; Noto, Inter, Literata and Source Serif 4 are generally reliable; display serifs with high contrast (Playfair, Cormorant) need checking at the actual size, especially in all caps.

### 3.2 Actionable rules

- **R3.1 Choose from verified Vietnamese-capable families (A, factual).** Never use a family from the right-hand column for Vietnamese text: missing glyphs fall back to a system font mid-word, producing mixed-font words.
- **R3.2 Run the diacritic stress string before committing a font (C).** Set at headline and body size, regular and bold, lower and upper case: `Ầ Ẫ Ặ Ẩ Ở Ữ Ự Ỡ Ợ Ệ Ễ Ố Ỗ Ộ ầ ẫ ặ ẩ ở ữ ự ỡ ợ ệ ễ ố ỗ ộ đ Đ - "Người hướng dẫn thực hành chánh niệm, Tiến trình chuyển hoá"`. Fail the font if marks collide with neighbors or lines above, if the hook above looks like a question mark, if the breve is pointed, or if capital marks are clipped.
- **R3.3 Leading for Vietnamese (C/D).** Body: 1.4-1.6 (Butterick's 1.2-1.45 plus headroom for stacked marks; WCAG-tolerant). Display/headlines: at least 1.15-1.25, and at least 1.25 for ALL-CAPS Vietnamese headlines, because capital stacked marks (Ầ, Ẫ, Ặ) rise well above cap height. Never set Vietnamese at leading 1.0 or below; check that no mark touches a descender from the line above (g, y, p in particular).
- **R3.4 Measure 45-75 characters for body (C).** Vietnamese syllables are short, so a line holds more words; still keep about 10-14 words per line on handouts. Social posts: keep body lines short (roughly 20-40 characters) because they are read on phones.
- **R3.5 Two families maximum; three to four sizes maximum (C).** Typical pairing for an educator brand: a Vietnamese-capable serif for display and quotes (e.g., Playfair Display, Lora, Literata, Noto Serif Display, Cormorant Garamond after a diacritic check) + a humanist or neo-grotesque sans for body/UI text (Be Vietnam Pro, Inter, Noto Sans). The reverse (sans display + serif body) suits long handouts.
- **R3.6 Never fake styles (C).** Only use weights and italics that exist in the family. Faux-bold smears diacritics; faux-italic skews marks off their base letters.
- **R3.7 All caps: short strings only, tracked +5-10% (D/C).** Labels, kickers, stage names of framework steps. Do not set Vietnamese paragraphs or long headlines in caps; caps plus stacked marks reduce word-shape cues and create a "spiky" top edge.
- **R3.8 Keep Vietnamese words and phrases together at line breaks (D, no formal standard found).** Insert non-breaking spaces (U+00A0) or no-wrap spans inside multi-syllable words and tight phrases: proper names (*Nguyễn Minh An*), framework names, numbers + units (*12 tháng 10*, *90 phút*), title + name (*TS. Trần Thu Hà*), and short function words that should not dangle at line end (*và, của, là, cho, với, những, các*). Break headlines manually by sense units ("Trở về với hơi thở / để nghe thân thể nói"), never by box width. No automatic hyphenation for Vietnamese.
- **R3.9 Avoid widows and orphans (C).** No single syllable alone on the last line of a paragraph or headline; rebalance with manual breaks or slight tracking (never more than ±2% on body).
- **R3.10 Text encoding hygiene (C).** Use Unicode NFC (precomposed) Vietnamese. Decomposed sequences (base + combining marks) render badly in some fonts and tools. Never use legacy VNI/TCVN3 (".Vn...") fonts.
- **R3.11 Workshop default conventions (users may change them).** Headings in sentence case or FULL CAPS, never Title Case; no em dash in Vietnamese copy (use a hyphen or colon); round brackets for information notes, square brackets for English terms/glosses (e.g., *khởi sinh [emergence]*). Apply these in all on-artwork text.
- **R3.12 Minimum sizes (C/D).** Social post body at least 28-32 px on a 1080 canvas; handout body 10-11.5 pt; poster body readable at 1.5-2 m (roughly 18-24 pt on A2); stage backdrop headline cap height at least ~1/200 of the farthest viewing distance as a rough legibility floor (D; e.g., 20 m -> about 10 cm cap height). Verify with a scale preview.

---

## 4. Color

### 4.1 What the sources say

- **60-30-10.** Originates in interior decorating practice (dominant/secondary/accent). I found no empirical study supporting the specific proportions. Grade D: useful as a discipline against using too many equal-weight colors.
- **Color psychology.** Elliot & Maier (2014, *Annual Review of Psychology* 65, 95-120, doi:10.1146/annurev-psych-010213-115035) conclude the field is promising but theoretically and methodologically immature; many popular claims are unsupported, and effects are context-dependent. Jonauskaitė & Mohr's systematic review of 132 articles over 128 years (2025, *Psychonomic Bulletin & Review*, doi:10.3758/s13423-024-02615-z) finds consistent *associations* (light = positive, dark = negative; saturated/red/yellow = high arousal; blue/green/grey = low arousal; red/black/purple = power), but stresses they were mostly measured as abstract associations, not induced feelings. Jonauskaitė et al. (2020, *Psychological Science* 31(10), 1245-1260) found largely universal color-emotion patterns modulated by language and geography. Practical reading: colors carry reliable *connotations*, but "blue makes people trust you" is not a demonstrated causal effect.
- **Contrast.** WCAG 2.2 (W3C Recommendation, 2023; https://www.w3.org/TR/WCAG22/): SC 1.4.3 text contrast at least 4.5:1, or 3:1 for large text (at least 18 pt, or 14 pt bold, roughly 24 px / 18.66 px bold); SC 1.4.6 (AAA) 7:1 / 4.5:1; SC 1.4.11 non-text UI/graphics at least 3:1. **APCA** is not part of any WCAG standard: it was removed from the WCAG 3 draft in 2023, and the WCAG 3 contrast method is still "to be determined" (Roselli, April 2026, https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html). APCA may be used as a secondary check (it handles dark mode and thin fonts better) but never instead of WCAG 2.
- **Cultural and audience preferences** for colorfulness differ by country and demographics (Reinecke & Gajos, 2014), so palettes should be tested on the actual audience rather than assumed universal.
- **Print vs screen.** Screens display additive RGB (sRGB, Display P3); offset print uses subtractive CMYK with a smaller gamut. Saturated blues, greens, oranges and all metallics fall outside CMYK. Metallic gold cannot be printed in CMYK; it needs a spot metallic ink (e.g., a Pantone metallic) or foil; in CMYK it becomes a mustard/ochre. (Standard prepress knowledge; C.)

### 4.2 Two common brand aesthetics for educators

| | **Navy + gold ("dark luxurious")** | **Paper + ink ("calm, contemplative")** |
|---|---|---|
| Connotation | Authority, depth, premium, evening event | Openness, mindfulness, humility, daylight, study |
| Fits | Premium programs, gala/awards, stage backdrops under stage lighting, certificates | Handouts, knowledge infographics, reflective social posts, retreat materials |
| Roles | Background navy (60%), mid-tone/secondary (30%: deep teal, slate, cream text), accent gold (10%: rules, numerals, small emphasis) | Background warm off-white (60%), ink near-black or deep brown/indigo for text (30%), one earthy accent (10%: terracotta, moss, saffron, indigo) |
| Risks | Gold text on navy often fails 4.5:1 if gold is mid-tone; gold reads "corporate luxury" and can clash with a humble, humanistic voice; prints muddy without spot ink | Low contrast "aesthetic beige" text (light grey on cream) fails WCAG; can look washed out on phones in sunlight |
| Fixes | Use gold for large display or ornaments only; body text in cream/white; verify each pair; for print specify a spot metallic or switch gold to a flat warm ochre with checked contrast | Body text at least 7:1 if possible; accent used for shapes, not body text; test on a phone at reduced brightness |

### 4.3 Actionable rules

- **R4.1 Define palette by roles, not swatches (C).** Background, surface, text-primary, text-secondary, accent, accent-on-dark, and data categorical colors (max 5-6 for diagrams). Every color in a design must map to a role.
- **R4.2 Dominance discipline (D).** Approximately 60/30/10 by area; one accent per piece; accent reserved for the single thing you want noticed (CTA, a key stage, a key word).
- **R4.3 Contrast is non-negotiable (A, WCAG 2.2).** Text at least 4.5:1 (body) or 3:1 (large display); diagram lines/shapes that carry meaning at least 3:1 against their background. Check every text-background pair, including text over photos (see 5.3). Optionally also report APCA Lc as advisory.
- **R4.4 Do not encode meaning by hue alone (A, WCAG 1.4.1).** In stage diagrams, pair color with number, label, position or shape; about 8% of men of Northern European descent have color-vision deficiency (rates differ across populations; no Vietnam-specific figure verified here).
- **R4.5 Use color connotation, not color "magic" (B).** Choose hues for association and coherence with the theme (e.g., warm earth for somatic/grounding content, deep blue for depth/stillness), and never claim in copy that a color *causes* calm or trust.
- **R4.6 Pick the aesthetic by purpose (C).** Navy+gold for premium/event/stage; paper+ink for learning and reflection. Do not mix them within one campaign; the series consistency rule (R1.8) outranks variety.
- **R4.7 Work in the destination color space (C).** Digital: design and export in sRGB. Print: convert to the printer's CMYK profile (commonly FOGRA39/FOGRA51 for coated paper in Europe/Asia, GRACoL in the US; ask the Vietnamese print shop which they use), soft-proof, and expect saturation loss. Rich black for large dark areas (e.g., C60 M40 Y40 K100), 100% K only for small text. Keep total ink coverage under the printer's limit (often 300% on coated stock).
- **R4.8 Gold in print = spot or foil (C).** If the budget lacks spot ink, redesign gold as a warm ochre/sand and test its contrast; do not expect metallic sheen.

---

## 5. Photography in design

### 5.1 What the sources say

- **Gaze cueing.** Eye gaze automatically shifts observers' attention in the gazed direction (lab literature since Friesen & Kingstone, 1998). In advertising, Sajjacholapunt & Ball (2014, *Frontiers in Psychology* 5:166, doi:10.3389/fpsyg.2014.00166) found faces with *averted* gaze toward the ad text increased attention to the text and product and improved recognition memory, while *direct* gaze pulled fixations onto the face and reduced memory for the message. Hutton & Nolte (2011, *Applied Cognitive Psychology* 25(6), 887-892, doi:10.1002/acp.1763) report gaze cues steering attention in print ads. Grade B: replicated direction of effect, modest sizes, context-dependent.
- **Text over images.** NN/g (Harley, 2015, reviewed 2026, https://www.nngroup.com/articles/text-over-images/): text must still meet 4.5:1 / 3:1; techniques include semi-transparent overlays (about 30-50% black), gradient "floor fades", blur behind text, and placing text where the image is calm; design for the worst-case background.
- **Retouching ethics.** France's law (in force 1 October 2017) requires commercial images whose body shape was digitally altered to carry the label "photographie retouchée." Getty Images (policy effective 1 October 2017) bans submissions where body shape was retouched to look thinner or larger, while allowing skin retouching, blemish removal, hair color change (https://petapixel.com/2017/09/26/getty-images-bans-photos-containing-photoshopped-weight/). Professional photojournalism codes (e.g., NPPA Code of Ethics) prohibit altering content that misleads viewers.
- **AI-generated people/events.** No single binding standard for educational marketing; press organizations (e.g., World Press Photo contest rules, major wire agencies) exclude generative images from documentary categories, and platforms (Meta) now label AI-generated media. The ethical principle that applies here: representations of real people, real classes and real events must be real.

### 5.2 Actionable rules

- **R5.1 Choose hero photos that do one job (C).** Criteria in order: (1) authentic moment of the practice (presence, warmth, eye contact or genuine absorption); (2) clean background or one that can be calmed; (3) light on the face; (4) space for text on the side the subject faces; (5) technical quality (sharp eyes, no motion blur).
- **R5.2 Use gaze as an arrow (B).** If the goal is to get the headline/CTA read, pick a photo where the person looks *toward* the text, and place the text in that direction. Use direct-to-camera gaze when the goal is connection and trust with the person (portrait-led posts, "meet your teacher"), and keep the message short because the face will dominate.
- **R5.3 Never let the subject look or walk off the page (C).** Faces near an edge should face inward.
- **R5.4 Cut-out vs full-bleed (C).** Full-bleed for atmosphere and emotion (retreat, nature, the room's energy). Cut-out (background removed) for clean speaker/teacher announcements and consistent series; requires clean hair edges and a matching shadow/light direction; avoid cut-outs of group or candid scenes (they look like stickers). Never crop at joints (wrists, knees, neck); crop mid-limb or include the joint.
- **R5.5 Text on photos needs a scrim (A for contrast, C for technique).** Default: a gradient from 0% to 55-70% of the brand dark color, covering the text area only, so the face stays untouched; or a solid panel. Verify 4.5:1 against the lightest pixel behind the text. Never put text across a face.
- **R5.6 Grade a series consistently (C).** For a campaign, set one look: white balance target (for example neutral-warm), similar contrast curve, same saturation level, same black point. Apply as a preset and adjust exposure per image. Mixed grades break repetition (R1.8).
- **R5.7 Correction workflow (C, standard practice).** In order: (1) crop/straighten; (2) white balance from a neutral (white shirt, grey wall); (3) exposure so skin sits in a natural mid-high range; (4) contrast/tone curve and black/white points; (5) saturation/vibrance conservatively (skin tones must not turn orange or magenta); (6) local dodge/burn on the face: lift eye sockets slightly, even uneven lighting, gently reduce harsh shadows; (7) noise reduction, then sharpening for output size; (8) export in sRGB for digital, CMYK conversion only at print stage.
- **R5.8 Retouch ethically (C, with legal precedent).** Allowed: temporary blemishes, stray hairs, distracting background objects, color casts, lens distortion. Not allowed: reshaping faces or bodies, slimming, skin "plasticizing" (keep texture and pores visible), changing age, skin tone or ethnicity cues, removing or adding people. A humanistic brand that teaches self-compassion and authenticity loses credibility with "perfected" faces.
- **R5.9 No AI-generated stand-ins for real people or events (C, ethics).** Do not generate fake participants, fake classroom scenes, fake testimonials' faces, or "event photos." AI imagery is acceptable only for clearly illustrative/abstract material (textures, symbolic landscapes, conceptual illustrations) and should be recognizable as illustration. When in doubt, use real photos, typography-only designs, or drawn illustration.
- **R5.10 Consent and dignity (C).** Use photos of participants only with consent; avoid images of people in visible distress for promotion of psychological work (therapeutic contexts are sensitive).

---

## 6. Knowledge visualization for education

### 6.1 What the sources say

- **Dual coding.** Paivio's theory (1971, 1986; Clark & Paivio, 1991, *Educational Psychology Review* 3(3), 149-210): verbal and imagery systems are separate but linked; information coded in both is better remembered.
- **Mayer's multimedia principles** (Mayer, *Multimedia Learning*, 3rd ed., Cambridge UP, 2020). Applicable to static graphics: multimedia (words + pictures beat words alone), coherence (exclude extraneous material), signaling (highlight essential organization), spatial contiguity (put words next to the graphic parts they describe), segmenting (break into learner-paced parts), and redundancy (in static print, this mostly means: do not duplicate the same long text in two places).
- **Meta-analytic support.** Noetel et al. (2022, *Review of Educational Research* 92(3), 413-454, doi:10.3102/00346543211052329): an overview of 29 reviews (1,189 studies, 78,177 participants) found 11 principles with positive effects; the largest included temporal/spatial contiguity and signaling; good design mattered more for complex material. Schneider, Beege, Nebel & Rey (2018, *Educational Research Review* 23, 1-24) meta-analysis: signaling improves retention and transfer. Schroeder & Cenkci (2018, *Educational Psychology Review* 30, 679-701) and Ginns (2006, *Learning and Instruction* 16(6), 511-525): spatial contiguity effects are robust. Sundararajan & Adesope (2020, *Educational Psychology Review* 32, 707-734, "Keep it coherent"): seductive details (interesting but irrelevant additions) reliably harm learning.
- **Conceptual metaphor and image schemas.** Lakoff & Johnson (*Metaphors We Live By*, 1980) and Johnson (*The Body in the Mind*, 1987) describe embodied image schemas: CONTAINER, PATH (source-path-goal), BALANCE, CENTER-PERIPHERY, CYCLE, PART-WHOLE, LINK, UP-DOWN (verticality), NEAR-FAR, FORCE. Parsons (2018, "Conceptual metaphor theory as a foundation for communicative visualization design", IEEE VIS VisComm workshop, https://par.nsf.gov/biblio/10087033) argues these should ground communicative visualization design. Ziemkiewicz & Kosara (2008, "The shaping of information by visual metaphors", *IEEE TVCG* 14(6), 1269-1276) showed that the visual metaphor (containment vs. levels) interacts with how a verbal metaphor frames a hierarchy, affecting task performance. Implication: the diagram shape *asserts* a structure; choose the schema that matches the concept's logic.
- **Memorability.** Borkin et al. (2013, "What makes a visualization memorable?", *IEEE TVCG* 19(12), 2306-2315, doi:10.1109/TVCG.2013.234): recognizable objects/pictograms, color, higher visual density and unusual chart types (diagrams, trees/networks, grids) were more memorable than minimalist common charts. Borkin et al. (2016, "Beyond memorability", *IEEE TVCG* 22(1), 519-528, doi:10.1109/TVCG.2015.2467732): titles and supporting text should convey the message; pictograms, used appropriately, do not interfere and can improve recognition; redundancy helps; visualizations memorable at a glance also convey their message better. Caveat: memorability is not comprehension or accuracy.
- **Chartjunk vs "useful junk".** Tufte (*The Visual Display of Quantitative Information*, 1983/2001) argues to maximize data-ink and remove chartjunk. Bateman et al. (2010, "Useful junk?", CHI 2010, 2573-2582, doi:10.1145/1753326.1753716) found embellished charts were no less accurately interpreted and better recalled after 2-3 weeks (small sample). Later work (e.g., Skau, Harrison & Kosara, 2015, *Computer Graphics Forum* 34(3)) found some embellishments do harm reading accuracy. Synthesis: *relevant* embellishment that encodes or reinforces the message helps memory; *irrelevant* decoration is a seductive detail.
- **Isotype.** Otto Neurath's *International Picture Language* (1936) and the Isotype method (with Marie Neurath and Gerd Arntz): consistent pictograms, repetition for quantity (more icons, not bigger icons), limited colors. Haroz, Kosara & Franconeri (2015, "ISOTYPE visualization: working memory, performance, and engagement with pictographs", CHI 2015 (verify DOI 10.1145/2702123.2702275)) found pictographs that *represent the data* performed as well as or better than plain bars and supported working memory, while superfluous images distracted.
- **Honest vs misleading diagram archetypes.** Cairo (*The Functional Art*, 2012; *The Truthful Art*, 2016; *How Charts Lie*, 2019): a graphic's form is a claim; viewers infer structure, magnitude and causality from shape. Documented cautionary cases: "Maslow's pyramid" was not drawn by Maslow and the pyramid form added implications (strict prerequisite levels, a peak) he did not claim (Bridgman, Cummings & Ballard, 2019, *Academy of Management Learning & Education* 18(1), 81-98). The "learning pyramid"/"cone of learning" with retention percentages (10% read, 90% teach) is a fabrication grafted onto Dale's Cone of Experience (Subramony, Molenda, Betrus & Thalheimer, 2014, *Educational Technology* 54(6), 6-16).

### 6.2 Diagram archetypes: when honest, when misleading

| Archetype | Image schema | Honest when | Misleading when |
|---|---|---|---|
| Linear process / path / staircase | PATH, UP-DOWN | Stages are ordered and mostly one-directional; staircase only if each step builds capacity | The real process is iterative, or "higher" implies superiority of later stages |
| Cycle | CYCLE | The process genuinely repeats (practice-reflect-adjust) | There is a real start/end or growth across iterations (use spiral) |
| Spiral | CYCLE + PATH | Repetition with deepening (returning to the same theme at a new depth) | Used only for style |
| Pyramid / hierarchy | UP-DOWN, PART-WHOLE | Lower levels are prerequisites AND/OR larger in quantity | Levels are parallel, overlapping, or the author never claimed strict order (Maslow case) |
| Tree / roots | PART-WHOLE, UP-DOWN, LINK | Visible outcomes grow from hidden foundations; branching categories | Implies causal links that are not established |
| Iceberg | CONTAINER, UP-DOWN | A visible part rests on a larger hidden part (behaviour vs beliefs/needs) | Implies a specific proportion (the "90% hidden" claim) without evidence |
| Layered onion / concentric | CONTAINER, CENTER-PERIPHERY | Nested scopes (self -> relationships -> organization -> society), or core vs surface | Layers are not actually nested |
| Hub-and-spoke / mandala | CENTER-PERIPHERY, BALANCE | A central principle/essence with equal facets around it; non-hierarchical wholeness | Spokes have real order or unequal weight |
| Venn | CONTAINER (overlap) | Sets with genuine shared members; the overlap is the point | Used for "things that relate" without real set logic; more than three sets |
| 2x2 matrix | Two orthogonal scales | Two independent, continuous dimensions with meaningful quadrants | Dimensions are correlated or categorical; quadrant labels overclaim types |
| Radar | Multiple axes from a center | Profiles on comparable scales for few (5-8) items, as a gestalt shape | Area misleads magnitude; axis order changes the shape; comparing many profiles |
| Balance / scale | BALANCE | Two forces in tension, equilibrium as the goal | Only one side is actually weighable |

### 6.3 Actionable rules

- **R6.1 Pair every key concept with a visual and a verbal label (A, dual coding/multimedia).** No concept-only icons, no unlabeled shapes.
- **R6.2 Put labels on the graphic, not in a legend (A, spatial contiguity).** Name each stage directly on or beside its shape; explanatory text sits adjacent to the part it describes.
- **R6.3 Signal the structure (A).** Number the stages, use one accent color for the current/focal stage, a clear title stating the takeaway, and arrows only where there is real direction or flow.
- **R6.4 Remove seductive details (A).** Decorative lotus borders, stock "brain" images, irrelevant icons or quotes that do not encode content should be cut. Every visual element must either carry content or be part of the brand frame (margins, logo).
- **R6.5 Choose the archetype from the concept's logic, not from taste (B/C).** Before drawing, write one sentence: "The stages are [ordered/iterative/nested/parallel/opposed]; the relation between them is [prerequisite/flow/containment/tension]." Then pick from table 6.2. If two archetypes fit, prefer the one with fewer false implications.
- **R6.6 For frameworks with named stages (C).** (a) Name and number each stage identically everywhere (posters, handouts, slides). (b) Give each stage a consistent glyph or color that recurs across materials (repetition, R1.8). (c) Use a short verb/gerund and a one-line descriptor per stage. (d) Show transitions (what moves the learner to the next stage) if the framework specifies them. (e) If the framework's author allows non-linear movement, show it (return arrows, spiral). (f) Credit the framework's author on the graphic (workshop default: always credit the author of any tool/checklist).
- **R6.7 Make it memorable through relevant richness (B).** A strong title that states the message, one recognizable pictographic element per concept, a distinctive (but honest) shape, and redundant encoding (label + icon + position). Memorable is good only when it carries the message (Borkin 2016).
- **R6.8 Use Isotype logic for quantities (B/C).** Show more as more icons, not bigger icons; one icon style; one icon = a stated unit.
- **R6.9 Never invent numbers or proportions (A, ethics).** No percentages on icebergs or pyramids without a source; no fabricated "retention" figures; data charts start bars at zero and label sources.
- **R6.10 Eastern/somatic metaphors: use with intention, avoid cliché (C/D).**
  - *Lotus*: growth from difficulty ("bùn - sen"); honest for transformation through suffering; cliché risk is high in Vietnamese wellness marketing (overused, religious connotation may exclude secular audiences). Use abstractly (a single line drawing, not glossy 3D petals), or only when the content is explicitly about this.
  - *River/water*: flow, impermanence, systems flows; good for process and change; avoid when stages are discrete.
  - *Breath*: rhythm, cycle of in/out; strong for somatic and mindfulness pieces (cycle schema); can be rendered as a wave or expanding/contracting circle.
  - *Roots/tree*: grounding, foundations, systems; good for "beneath the surface" (pair with the honest-use test above).
  - *Mountain path*: effortful progression with switchbacks; honest for long developmental journeys; avoid implying a summit of "enlightenment" or superiority.
  - *Enso / circle / mandala*: wholeness, center-periphery; avoid using Buddhist sacred symbols (Buddha images, dharma wheel) as decoration, which can offend practitioners and narrow the audience.
  - Rule: the metaphor must map the concept's structure (Parsons 2018; Ziemkiewicz & Kosara 2008) and be rendered with restraint consistent with the brand.
- **R6.11 Density by medium (B/C).** Social carousels: one idea per slide. Posters: one framework at a glance. Handouts/infographics: higher density allowed, organized by grid, numbered sections, and a reading path.

---

## 7. Persuasive yet ethical educational marketing design

### 7.1 What the sources say

- **Persuasion principles.** Cialdini (*Influence*, new and expanded ed., 2021): reciprocity, commitment, social proof, authority, liking, scarcity, unity. These work, which is why they can be abused.
- **Dark patterns.** Mathur et al. (2019, "Dark patterns at scale", *Proc. ACM HCI* 3(CSCW), 81, doi:10.1145/3359183) crawled ~11K shopping sites and documented fake countdown timers, false low-stock and fake activity messages, confirmshaming and more. The US FTC staff report *Bringing Dark Patterns to Light* (2022) and the EU Digital Services Act (Art. 25) treat such designs as unfair/deceptive. Vietnam's Law on Protection of Consumers' Rights (No. 19/2023/QH15, effective 1 July 2024) prohibits deceptive or misleading information to consumers; I did not verify specific dark-pattern provisions, so treat this as context, not legal advice.
- **Vietnamese audience.** DataReportal *Digital 2026: Vietnam* (data October 2025; https://datareportal.com/reports/digital-2026-vietnam): 85.6 M internet users (84.2%); 79.0 M social media user identities; Facebook ad reach 79.0 M; TikTok ad reach 76.1 M adults; Zalo 78.3 M monthly active users (91.4% of internet users); YouTube 62.1 M. Decision Lab's *Connected Consumer* Q4 2025 (https://www.decisionlab.co/blog/vietnams-digital-dynamics-q4-2025): Facebook top, then Zalo and YouTube; Gen Z's Facebook appeal is declining and Zalo is rising in their must-have apps. Implication: design mobile-first for Facebook feed (4:5) and Zalo sharing (images forwarded in chats/groups, often viewed small), and short vertical video placements.

### 7.2 Actionable rules

- **R7.1 One primary CTA per piece (C).** Visually dominant within the action zone (contrast + size), verb-first and specific ("Đăng ký tham dự ngày 12/10", "Nhận bộ tài liệu"), with the practical details adjacent (date, time, place, link/QR). Secondary actions are visually quieter (outline or text).
- **R7.2 Make the CTA findable in the layout's terminal area (C/D).** Bottom-right or bottom-center on posters/posts, in the safe zone; on 9:16, above the bottom UI band.
- **R7.3 QR codes that work (C).** Minimum printed size about 2-2.5 cm on handouts, larger on posters/backdrops (rough rule: scanning distance about 10x the code width, D); quiet zone around it; high contrast; test with two phones; print the short URL beside it.
- **R7.4 Social proof must be real and attributable (C, ethics).** Real names (with consent) or initials + role, real photos (R5.9), real numbers with date ("hơn 1.200 học viên từ 2019" only if true). No invented testimonials, no AI faces.
- **R7.5 Scarcity only when true; no exact seat counts (workshop default + ethics).** State genuine constraints in qualitative terms (e.g., small-group format, registration closes on a specific date) and give concrete choosable dates rather than vague recurring frequency. No fake timers, no "only 3 seats left" unless system-verified (and the workshop default is not to state seat numbers at all).
- **R7.6 No competitive-fear framing (workshop default).** Avoid "đừng để bị bỏ lại phía sau" / race-to-the-top messaging; use invitation, curiosity and care.
- **R7.7 No explicit upsell on landing/promo graphics (workshop default).**
- **R7.8 Authority with humility (C).** Credentials in the tertiary level (small, factual), not as the headline; credit co-developers and framework authors.
- **R7.9 Accessibility = reach (A).** Contrast per R4.3; minimum sizes per R3.12; alt text for every posted image (Facebook supports custom alt text); captions for video; never put essential information only in the image without also stating it in the post text.
- **R7.10 Mobile-first test (C).** Preview every social graphic at actual phone size (about 375 px wide) and as a Zalo chat thumbnail; headline must be readable in under 2 seconds.
- **R7.11 Export for platform compression (C/D).** 1080 px wide, sRGB; text-heavy graphics as PNG (or high-quality JPEG) to limit compression artifacts around Vietnamese diacritics; avoid hairline type that compression erases.

---

## 8. Design QA and critique frameworks

### 8.1 What the sources say

- **Heuristic evaluation.** Nielsen's 10 usability heuristics (1994; https://www.nngroup.com/articles/ten-usability-heuristics/) are for interfaces but adapt to graphics (visibility, consistency, recognition over recall, aesthetic and minimalist design, error prevention).
- **Visual principles checklists.** NN/g's "5 principles of visual design in UX" (Harley, 2015): scale, visual hierarchy, balance, contrast, gestalt. Williams' CRAP (2014). Cairo's five qualities of good graphics (*The Truthful Art*, 2016): truthful, functional, beautiful, insightful, enlightening.
- **5-second test.** A first-impression method (show for 5 seconds, ask what it was about and what to do); popularized by Christine Perfetti (User Interface Engineering, 2005) and tools like Lyssna. Consistent with the 50-500 ms first-impression research (Lindgaard 2006; Reinecke 2013). Grade C.
- **Squint/blur test.** Practitioner (C), see 1.1.
- **Print proofing.** Standard prepress practice: preflight to PDF/X (PDF/X-1a or PDF/X-4), fonts embedded/outlined, images at least 300 ppi at final size for close viewing (large-format backdrops typically 100-150 ppi at full size because of viewing distance), bleed (3 mm is the common Vietnamese/European standard; 0.125 in in the US), safe area, CMYK/spot separation check, overprint preview, and a hard proof for color-critical work. (C; confirm specs with the print vendor.)

### 8.2 The agent's QA protocol

Run in this order; log pass/fail per item with rule numbers.

1. **Purpose check.** One sentence: who is this for, what should they feel/know/do? Does the focal point serve that? (R1.1)
2. **5-second test (self-simulation and, when possible, a human).** After 5 seconds can a viewer say what, when/where and how to act? (R1.2, R7.1)
3. **Squint/blur test.** Blur the design to about 5-10% of its size: is the hierarchy still primary -> secondary -> CTA? Are there more than three competing blobs? (R1.2, R1.9)
4. **Grid and alignment overlay.** Every element on the grid; consistent margins and spacing scale; nothing within the platform safe zones' danger areas. (R2.1-R2.8)
5. **Typography pass.** Vietnamese-capable font (R3.1), diacritic stress check (R3.2), leading (R3.3), measure (R3.4), max two families and three-four sizes (R3.5), no faux styles (R3.6), phrase-keeping and no orphans (R3.8-R3.9), sentence case/no Title Case, no em dash (R3.11), spelling and tone marks proofread syllable by syllable (wrong tone marks change meaning).
6. **Contrast pass.** Every text-background pair at least 4.5:1 / 3:1, including over photos; meaning not by color alone. (R4.3-R4.4, R5.5)
7. **Image pass.** Authentic, consented, consistently graded, ethically retouched, no AI stand-ins, gaze direction supports reading path, no text over faces. (R5.1-R5.10)
8. **Knowledge pass.** Archetype matches concept logic, labels on the graphic, signaling present, no seductive details, no invented numbers, framework author credited. (R6.1-R6.10)
9. **Ethics pass.** Real social proof, truthful scarcity, no competitive-fear framing, no upsell, accessible alt text plan. (R7.4-R7.9)
10. **Medium pass.** Digital: phone-size preview, Zalo thumbnail, export sRGB/PNG. Print: CMYK conversion, soft proof, bleed, ppi, rich black, spot gold specified, PDF/X preflight. Backdrop: scale-model preview with a human silhouette and lectern; legibility from the back row. (R4.7-R4.8, R7.10-R7.11)
11. **Series check.** Put the new piece next to the last three pieces of the campaign: same system? (R1.8, R5.6)

---

## 9. One-page rule digest for the agent

1. One focal point; three hierarchy levels; obvious contrast.
2. Group by proximity; align to a grid; repeat a system.
3. Use whitespace generously, which suits a contemplative brand.
4. One spacing scale (4/8) and one modular type scale per project.
5. Golden ratio and rule of thirds are starting points, not science.
6. Vietnamese: verified fonts only, diacritic stress test, leading 1.4-1.6 body and at least 1.15-1.25 display, phrase-keeping line breaks, NFC text.
7. Two families max; real weights only; caps only for short labels.
8. Palette by roles; about 60/30/10; one accent; WCAG 2.2 contrast always; APCA advisory only.
9. Navy+gold for premium/stage; paper+ink for learning; gold in print requires spot/foil.
10. Real photos, natural retouching, consistent grade, gaze toward text, scrims for legibility.
11. Diagram shape must match the concept's logic; label on the graphic; signal; cut decoration.
12. Memorable = relevant richness plus a message-stating title.
13. Eastern metaphors with restraint; avoid sacred symbols as decoration.
14. One CTA; true scarcity in qualitative terms; real social proof; no fear-of-missing-out framing.
15. QA: 5-second, squint, grid, type, contrast, image, knowledge, ethics, medium, series.

---

## References

Standards, guidelines and practitioner sources
- Brown, T. (2011). More meaningful typography. *A List Apart*. https://alistapart.com/article/more-meaningful-typography/
- Bringhurst, R. (2012). *The elements of typographic style* (v4.0). Hartley & Marks.
- Butterick, M. (n.d., continuously updated). *Practical typography*. https://practicaltypography.com
- Cairo, A. (2012). *The functional art*. New Riders. Cairo, A. (2016). *The truthful art*. New Riders. Cairo, A. (2019). *How charts lie*. W. W. Norton.
- Cialdini, R. B. (2021). *Influence: The psychology of persuasion* (new and expanded ed.). Harper Business.
- DataReportal / Kemp, S. (2025). *Digital 2026: Vietnam*. https://datareportal.com/reports/digital-2026-vietnam
- Decision Lab. (2026). *Vietnam's digital dynamics: Connected Consumer Q4 2025*. https://www.decisionlab.co/blog/vietnams-digital-dynamics-q4-2025
- Federal Trade Commission. (2022). *Bringing dark patterns to light* (staff report).
- Google Fonts. (n.d.). *Diacritics* (GF production guide). https://googlefonts.github.io/gf-guide/diacritics.html
- Harley, A. (2015, reviewed 2026). Ensure high contrast for text over images. NN/g. https://www.nngroup.com/articles/text-over-images/
- Lidwell, W., Holden, K., & Butler, J. (2010). *Universal principles of design* (rev. ed.). Rockport.
- Lupton, E. (2024). *Thinking with type* (3rd ed.). Princeton Architectural Press.
- Material Design. (n.d.). Spacing methods (M2); Spacing (M3). https://m2.material.io/design/layout/spacing-methods.html ; https://m3.material.io/styles/spacing
- Mayer, R. E. (2020). *Multimedia learning* (3rd ed.). Cambridge University Press.
- Müller-Brockmann, J. (1981). *Grid systems in graphic design*. Niggli.
- Neurath, O. (1936). *International picture language*. Kegan Paul.
- Nielsen, J. (1994, updated). 10 usability heuristics. NN/g. https://www.nngroup.com/articles/ten-usability-heuristics/
- Pernice, K. (2017). F-shaped pattern of reading on the web: Misunderstood, but still relevant. NN/g. https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- Roselli, A. (2026, April). WCAG3 contrast as of April 2026. https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html
- Trương, D. (2015-2025). *Vietnamese typography*. https://vietnamesetypography.com (chapters: /diacritical-details/, /design-challenges/, /type-recommendations/)
- Tufte, E. R. (2001). *The visual display of quantitative information* (2nd ed.). Graphics Press. Tufte, E. R. (1990). *Envisioning information*. Graphics Press.
- W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
- Ware, C. (2008). *Visual thinking for design*. Morgan Kaufmann.
- Williams, R. (2014). *The non-designer's design book* (4th ed.). Peachpit.
- Getty Images retouching policy (2017), reported by PetaPixel: https://petapixel.com/2017/09/26/getty-images-bans-photos-containing-photoshopped-weight/

Peer-reviewed research
- Amirshahi, S. A., Hayn-Leichsenring, G. U., Denzler, J., & Redies, C. (2014). Evaluating the rule of thirds in photographs and paintings. *Art & Perception, 2*, 163-182. https://doi.org/10.1163/22134913-00002024
- Bateman, S., Mandryk, R. L., Gutwin, C., Genest, A., McDine, D., & Brooks, C. (2010). Useful junk? The effects of visual embellishment on comprehension and memorability of charts. *CHI 2010*, 2573-2582. https://doi.org/10.1145/1753326.1753716
- Borkin, M. A., Vo, A. A., Bylinskii, Z., Isola, P., Sunkavalli, S., Oliva, A., & Pfister, H. (2013). What makes a visualization memorable? *IEEE TVCG, 19*(12), 2306-2315. https://doi.org/10.1109/TVCG.2013.234
- Borkin, M. A., Bylinskii, Z., Kim, N. W., Bainbridge, C. M., Yeh, C. S., Borkin, D., Pfister, H., & Oliva, A. (2016). Beyond memorability: Visualization recognition and recall. *IEEE TVCG, 22*(1), 519-528. https://doi.org/10.1109/TVCG.2015.2467732
- Bridgman, T., Cummings, S., & Ballard, J. (2019). Who built Maslow's pyramid? *Academy of Management Learning & Education, 18*(1), 81-98.
- Clark, J. M., & Paivio, A. (1991). Dual coding theory and education. *Educational Psychology Review, 3*(3), 149-210.
- Elliot, A. J., & Maier, M. A. (2014). Color psychology: Effects of perceiving color on psychological functioning in humans. *Annual Review of Psychology, 65*, 95-120. https://doi.org/10.1146/annurev-psych-010213-115035
- Ginns, P. (2006). Integrating information: A meta-analysis of the spatial contiguity and temporal contiguity effects. *Learning and Instruction, 16*(6), 511-525.
- Green, C. D. (1995). All that glitters: A review of psychological research on the aesthetics of the golden section. *Perception, 24*(8), 937-968.
- Haroz, S., Kosara, R., & Franconeri, S. L. (2015). ISOTYPE visualization: Working memory, performance, and engagement with pictographs. *CHI 2015*. (verify DOI: 10.1145/2702123.2702275)
- Harrison, L., Reinecke, K., & Chang, R. (2015). Infographic aesthetics: Designing for the first impression. *CHI 2015*. https://doi.org/10.1145/2702123.2702545
- Hutton, S. B., & Nolte, S. (2011). The effect of gaze cues on attention to print advertisements. *Applied Cognitive Psychology, 25*(6), 887-892. https://doi.org/10.1002/acp.1763
- Jonauskaitė, D., & Mohr, C. (2025). Do we feel colours? A systematic review of 128 years of psychological research linking colours and emotions. *Psychonomic Bulletin & Review*. https://doi.org/10.3758/s13423-024-02615-z
- Jonauskaitė, D., et al. (2020). Universal patterns in color-emotion associations are further shaped by linguistic and geographic proximity. *Psychological Science, 31*(10), 1245-1260.
- Kurosu, M., & Kashimura, K. (1995). Apparent usability vs. inherent usability. *CHI '95 Conference Companion*, 292-293. (verify DOI: 10.1145/223355.223680)
- Lakoff, G., & Johnson, M. (1980). *Metaphors we live by*. University of Chicago Press. Johnson, M. (1987). *The body in the mind*. University of Chicago Press.
- Lindgaard, G., Fernandes, G., Dudek, C., & Brown, J. (2006). Attention web designers: You have 50 milliseconds to make a good first impression! *Behaviour & Information Technology, 25*(2), 115-126. https://doi.org/10.1080/01449290500330448
- Markowsky, G. (1992). Misconceptions about the golden ratio. *College Mathematics Journal, 23*(1), 2-19.
- Mathur, A., Acar, G., Friedman, M. J., Lucherini, E., Mayer, J., Chetty, M., & Narayanan, A. (2019). Dark patterns at scale: Findings from a crawl of 11K shopping websites. *Proc. ACM HCI, 3*(CSCW), 81. https://doi.org/10.1145/3359183
- Noetel, M., et al. (2022). Multimedia design for learning: An overview of reviews with meta-meta-analysis. *Review of Educational Research, 92*(3), 413-454. https://doi.org/10.3102/00346543211052329
- Parsons, P. (2018). Conceptual metaphor theory as a foundation for communicative visualization design. *IEEE VIS Workshop on Visualization for Communication (VisComm)*. https://par.nsf.gov/biblio/10087033
- Reinecke, K., Yeh, T., Miratrix, L., Mardiko, R., Zhao, Y., Liu, J., & Gajos, K. Z. (2013). Predicting users' first impressions of website aesthetics with a quantification of perceived visual complexity and colorfulness. *CHI 2013*, 2049-2058. https://doi.org/10.1145/2470654.2481281
- Reinecke, K., & Gajos, K. Z. (2014). Quantifying visual preferences around the world. *CHI 2014*. (verify DOI: 10.1145/2556288.2557052)
- Sajjacholapunt, P., & Ball, L. J. (2014). The influence of banner advertisements on attention and memory: Human faces with averted gaze can enhance advertising effectiveness. *Frontiers in Psychology, 5*, 166. https://doi.org/10.3389/fpsyg.2014.00166
- Schneider, S., Beege, M., Nebel, S., & Rey, G. D. (2018). A meta-analysis of how signaling affects learning with media. *Educational Research Review, 23*, 1-24.
- Schroeder, N. L., & Cenkci, A. T. (2018). Spatial contiguity and spatial split-attention effects in multimedia learning environments: A meta-analysis. *Educational Psychology Review, 30*, 679-701.
- Skau, D., Harrison, L., & Kosara, R. (2015). An evaluation of the impact of visual embellishments in bar charts. *Computer Graphics Forum, 34*(3).
- Subramony, D., Molenda, M., Betrus, A., & Thalheimer, W. (2014). The mythical retention chart and the corruption of Dale's Cone of Experience. *Educational Technology, 54*(6), 6-16.
- Sundararajan, N., & Adesope, O. (2020). Keep it coherent: A meta-analysis of the seductive details effect. *Educational Psychology Review, 32*, 707-734. https://doi.org/10.1007/s10648-020-09522-4
- Tractinsky, N., Katz, A. S., & Ikar, D. (2000). What is beautiful is usable. *Interacting with Computers, 13*(2), 127-145. https://doi.org/10.1016/S0953-5438(00)00031-X
- Tuch, A. N., Roth, S. P., Hornbæk, K., Opwis, K., & Bargas-Avila, J. A. (2012). Is beautiful really usable? *Computers in Human Behavior, 28*(5), 1596-1607. https://doi.org/10.1016/j.chb.2012.03.024
- Tuch, A. N., Presslaber, E. E., Stöcklin, M., Opwis, K., & Bargas-Avila, J. A. (2012). The role of visual complexity and prototypicality regarding first impression of websites. *International Journal of Human-Computer Studies, 70*(11), 794-811. (verify DOI: 10.1016/j.ijhcs.2012.06.003)
- Wagemans, J., Elder, J. H., Kubovy, M., Palmer, S. E., Peterson, M. A., Singh, M., & von der Heydt, R. (2012). A century of Gestalt psychology in visual perception I. *Psychological Bulletin, 138*(6), 1172-1217. https://doi.org/10.1037/a0029333
- Ziemkiewicz, C., & Kosara, R. (2008). The shaping of information by visual metaphors. *IEEE TVCG, 14*(6), 1269-1276.

Known gaps (searched, not found): a W3C or Vietnamese national typesetting standard for Vietnamese line breaking/phrase-keeping; Vietnam-specific eye-tracking of poster/social layouts; empirical support for 60-30-10, the "whitespace +20% comprehension" claim, or any fixed margin percentage; Meta's primary safe-zone documentation (blocked from automated fetch; numbers come from secondary summaries).
