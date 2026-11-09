# Portfolio research: frontend engineering achievements in CM_Babel_CSS_Vite

Date of analysis: 27 October 2026
Repository: `C:\work\GIT\CM_Babel_CSS_Vite`. Branch analysed: `storybook_pcgh`; figures come from `origin/master` unless stated otherwise.
Method: a read-only review of the source code and git history. Nothing in the codebase was changed.

> **How to read this document**
> Every claim is marked with how certain it is:
> - **Confirmed**: proven by the source code and by git authorship.
> - **Inferred**: the code points strongly to it, but it is not proven.
> - **Potential**: a possible future improvement, not existing work.
>
> Where the code shows a technical effect but nothing measured it, the text says so. No performance numbers, Lighthouse scores or time savings are invented.

---

## Contents

1. Codebase architecture overview
2. Technical achievement inventory (prioritised table)
3. Top three portfolio case studies
4. Portfolio section concept
5. Interactive demonstration ideas
6. Portfolio-ready copy (German)
7. Evidence and limitations

---

## Part 1: Codebase architecture overview

### 1.1 What the codebase is

- **Scope:** one SCSS code base for **8 publishing brands**: pcgameshardware.de, pcgames.de, buffed.de, gamesaktuell.de, gamezone.de, videogameszone.de, linux-magazin.de and computec.de.
- **Build:** Vite compiles about **1,015 SCSS files**. The output is per-brand, content-hashed CSS bundles in `dist/css/<brand>/…`, plus brand-independent bundles in `dist/css/global/…`.
- **Two parallel trees:**
  - `src/scss/global/{desktop,mobile}`: shared structure and components.
  - `src/scss/local/<brand>/{desktop,mobile}`: brand tokens, brand utilities and brand overrides.
- **Desktop and mobile are separate stylesheets.** Mobile files end in `…M.scss` and are served as their own bundles. This is a deliberate decision: mobile loads only the M files, so the mobile CSS has to be complete on its own (see the comment in `src/scss/global/mobile/components/countDownGlobalM.scss:7`).
- **Bundling:** `vite.config.prod.js` defines the bundles. Six are preload bundles (`base`, `general` and `utility`, each for desktop and mobile). `dist/all-css.json` is the manifest the live sites load.

### 1.2 Theme and token layers (current state)

```
┌──────────────────────────────────────────────────────────────────────┐
│ Global primitives        colorsGlobal(M).scss                        │
│                          --wh, --bk, grey scale --gr5 … --gr93       │
├──────────────────────────────────────────────────────────────────────┤
│ Brand primitives         local/<brand>/…/colorsLocal(M).scss         │
│                          --PrCl1…n (primary), --AcCl* (accent)       │
├──────────────────────────────────────────────────────────────────────┤
│ Semantic tokens          same file, mapped onto primitives           │
│                          --txB, --txMt, --artTtl, --lk, --lkHov,     │
│                          --bgB, --bgPage, --bgMd, --sf1…--sfN,       │
│                          --brd, --brdLt, --btnPrimBg/Tx/Hov …        │
├──────────────────────────────────────────────────────────────────────┤
│ Dark mode                [data-theme="dark"] { … } re-points only    │
│                          the semantic tokens to other primitives     │
├──────────────────────────────────────────────────────────────────────┤
│ Utilities                global: spacing/flex/position (~478 classes)│
│                          local: .txtCc1…5, .bgCc1…10 → semantic      │
├──────────────────────────────────────────────────────────────────────┤
│ Components               global SCSS uses only semantic tokens and   │
│                          resolves itself per brand and theme         │
└──────────────────────────────────────────────────────────────────────┘
```

**How it works:**
- A global component uses only semantic tokens, for example `color: var(--lk)`.
- Each brand bundle ships its own `colorsLocal` with `:root` values and `[data-theme="dark"]` values.
- So the same selector looks different on PCGH, PCG or buffed, in light and in dark mode, without any duplicated CSS.

**Who built this:** the token layers in this form are largely your work (see Part 2, #1). The dark-mode mechanism itself (the `[data-theme]` attribute, the JS switch and the dark blocks) and the spacer map already existed in the initial commit of 3 July 2025.

### 1.3 Quality assurance

- **Storybook** on `storybook_pcgh`:
  - 60 story files, plus a brand and theme switch in the toolbar.
  - Visual regression with Playwright: 691 reference PNGs and 651 computed-style JSON files, at 1280px and 320px, in light and dark mode.
  - An automated axe colour-contrast audit, and a deploy gate (`scripts/visual-gate.ps1`) that blocks a red deploy.
- **Ownership:** the infrastructure is largely Herbert Haida's work. Your contributions to it are listed in Part 2, #7.

### 1.4 Authorship

Counted on `origin/master`, excluding merge commits and the automatic "Updated build" commits:

| Author | Commits |
|---|---|
| **daniel.popa** | **1,603** |
| Herbert Haida | 603 |
| marc.luedders | 31 |
| Markus Wollny (initial import, 3 July 2025) | 2 |

SCSS commits by area, across all branches, without merges:

| Area | daniel.popa | Herbert Haida | marc.luedders |
|---|---|---|---|
| global/desktop/layouts | 106 | 46 | 0 |
| global/desktop/modules | 123 | 101 | 2 |
| global/desktop/components | 87 | 38 | 31 |
| global/desktop/landingpages | 43 | 2 | 0 |
| global/mobile | 259 | 174 | 8 |
| local/pcgameshardware.de | 270 | 115 | 5 |
| local/pcgames.de | 169 | 112 | 12 |
| local/buffed.de | 152 | 33 | 6 |
| local/linux-magazin.de | 156 | 87 | 5 |
| local/gamesaktuell.de, gamezone.de, videogameszone.de | 90 / 91 / 88 | 27 / 26 / 25 | 6 each |

> **Transparency note: AI assistance.** Since 26 August 2026 some commits carry "Co-Authored-By: Claude". On master, 19 of your commits are tagged this way; across all branches it is 48. That includes the Countdown module, the gallery work and your Storybook commits. **None of your colour-token refactorings, the Linux-Magazin migration or the Fontello work is AI co-authored.** On your portfolio you can mention AI-assisted work openly ("umgesetzt mit KI-gestütztem Workflow"); that is credible and current.

---

## Part 2: Technical achievement inventory

### 2.1 Prioritised table

Ranked by portfolio value for a Senior Web Designer with strong UI/UX expertise and growing frontend engineering skills.

| Priority | Achievement | Problem solved | Technical depth | Portfolio impact | Certainty | Evidence |
|---|---|---|---|---|---|---|
| 1 | Semantic token system for 7 brands | Numbered colour variables with no meaning (`--Cc1…--Cc36`) that meant something different in every brand | High | Very high | Confirmed | `local/*/…/colorsLocal(M).scss`, `global/*/abstracts/colorsGlobal(M).scss`; legacy usages 7,136 → 54 |
| 2 | Countdown module: 6 layout variants from one markup pattern | One module for landing pages and product pages, in very different column widths, desktop and mobile, light and dark | High | Very high | Confirmed (AI-assisted) | `global/desktop/components/countDownGlobal.scss`, `…M.scss`, `stories/lp/countdown.stories.js` |
| 3 | Content-aware layouts with `:has()` and container queries | Spacing and widths that depend on the module's content or on ads that may be missing | High | High | Confirmed | `moduleSpacingGlobalM.scss:81-95`, `galleryGlobal.scss:11-20, 587-595` |
| 4 | Consistent spacing system for landing-page modules | Spacing between modules was inconsistent | Medium | High (visually demonstrable) | Confirmed | Ticket#769815, 86 commits, 14–31 Aug 2026 |
| 5 | Contrast improvements and WCAG contrast tooling | Low text contrast; no tool for checking colour pairs | Medium | High | Confirmed (scope limited) | `04f51646`, Ticket#768197, `stories/ui/uiHelpers.js:137-189`, `stories/atelier/farbkontraste.js` |
| 6 | Brand migration and feature unification | Linux-Magazin had to move into the shared system; PCG/PCGH/buffed had diverged | Medium | Medium–high | Confirmed | `51c61911`, Tickets 7610019 / 7610020, `e93c403b` |
| 7 | Storybook contributions: brand switch, LP snapshot pipeline, UI-Atelier | Real page markup was missing; there was no visual token reference | Medium | Medium | Confirmed (part of team infrastructure) | `2f8a70ad`, `538c5bff`, `34ac6cca`, `b4905ea7` |
| 8 | Ad slots: keeping space reservations working for new ad-server IDs | New ad-server IDs would have lost the existing space reservations | Medium | Medium (only with an honest framing) | Confirmed as maintenance, CLS effect not measured | `374a3d76`, Ticket#768335, `a578e6f9` (Ticket#7610066) |
| 9 | Modern CSS detail techniques | Gradient border with radius; ticket notches without images | Medium | Medium (good as a detail) | Confirmed | `affiliateButtonsGlobal.scss:1450-1466`, `countDownGlobal.scss` (Variant 6) |
| 10 | Unified icon font (Fontello) | Inconsistent icon sets | Low–medium | Low | Confirmed | `9bcbff85` (18 Nov 2025) |

### 2.2 Details per achievement

#### #1: Semantic multi-brand token system

**Problem**
- The initial commit used numbered colour variables: `--Cc1: #134b7d; --Cc2: #fff; …` (`beed1966`, PCGH `colorsLocal.scss:25-30`).
- A name like `--Cc5` said nothing about its purpose and meant a different colour in each brand.
- There were **7,136 usages**, of which **7,103 were in the brand files**. Shared global components were almost impossible this way, because every brand had to style its components itself.

**Solution**
A system with three layers:
1. **Global primitives:** `colorsGlobal(M).scss`, a neutral grey scale named by percentage of black (`--gr5 … --gr93`). You created this file (`8480ec30`, 16 Dec 2025, "PCGH Colors Refactoring").
2. **Brand primitives:** `--PrCl1…`, `--AcCl…`.
3. **Semantic tokens** for every role: text, title, link states, backgrounds, surfaces, borders and button states.

Dark mode re-points only the semantic layer.

**Technical implementation**
- CSS custom properties in two levels: semantic → primitive.
- Brand bundles with their own `colorsLocal`.
- The utility classes `.txtCc*` and `.bgCc*` are mapped onto semantic tokens (`local/pcgameshardware.de/desktop/abstracts/utilityLocal.scss:349-426`).
- The rollout went **brand by brand**:
  - PCGH: Dec 2025 – Feb 2026
  - Linux-Magazin: Jan 2026 (`bfb353d2`)
  - PCG: Feb 2026 (`7a9be224`, 232 files)
  - buffed: Feb–Mar 2026 (`8b83c8dc`)
  - gamezone: Apr 2026 (`c0ffb7d2`)
  - gamesaktuell: May 2026 (`9085c935`)
  - videogameszone: Aug 2026 (`d51e9cf2`)

**Measured result** (from git, not from performance)

| Metric | Before (`beed1966`, Jul 2025) | Today (`origin/master`) |
|---|---|---|
| Usages of `var(--CcN)` | 7,136 | **54** (only computec.de error/login pages) |
| Semantic token usages | — | about **8,200** |
| Brands on the semantic system | 0 | **7 of 8** |
| Net legacy usages removed (git diff analysis) | — | daniel.popa **7,249** · Herbert Haida −47 |
| Commits on the colour refactoring (message search) | — | daniel.popa ~79–81 · Herbert Haida 8 |

**Value**
- **Users:** consistent colours and states across the brands, in light and dark mode.
- **Developers:** one global component can serve every brand. Colour changes happen in one place.
- **Designers:** colours are named by role, which is the basis for a real design system.

**Certainty:** **Confirmed.** Your authorship is clear from both the diff analysis and the commits.

**Not yours:**
- The dark-mode mechanism (it already existed).
- Linux-Magazin's dark-mode tuning and the automated contrast audit (Herbert Haida).

computec.de has not been migrated yet (54 remaining usages). That is a natural "next step" for the portfolio story.

**Portfolio potential:** very high. This is the central system achievement. It shows architecture thinking, persistence over 8 months, and design-system expertise.

#### #2: Countdown module with six variants

**Problem**
One module for landing pages **and** product pages. It has to work in very different contexts:
- the left column (675px), the right column (300px) and full width (1000px)
- separate desktop and mobile stylesheets
- light and dark mode, multiple brands
- two states: running and expired

**Solution**
- Each variant has **one HTML structure**. Only `grid-template-areas` in the matching stylesheet changes the layout.
- The script switches to the expired state with a single class, `.isExpired`.
- Colours come from tokens and utilities, so there are no new colour variables.

**Technical implementation** (`src/scss/global/desktop/components/countDownGlobal.scss`)
- **Grid areas instead of separate markup:**
  - Desktop: `"kicker image" "title image" "timer timer" "footer footer"`
  - Mobile (`…M.scss`): `"kicker kicker" "title title" "timer timer" "image release" "button button"`
- **Context-dependent layout:** `.column.right .CountdownModule…` switches to a compact, stacked arrangement in the 300px column.
- **Variant 6 "Release-Ticket":** ticket notches drawn with two `radial-gradient` masks and `calc(100% - 22rem)`, positioned exactly on the perforation. No images needed.
- **Variant 5:** an exactly square image area at 50% of the card width (`aspect-ratio: 1/1` on a wrapper).
- **Accessibility:**
  - `:focus-visible` outline with offset.
  - The arrow animation is switched off with `prefers-reduced-motion: reduce`.
  - Contrast was calculated for each colour pair (for example PCGH unit labels: `--txB` 6.45:1 instead of `--txMt` at only 4.55:1).
  - Markup with `role="timer"`, `aria-hidden` on decorative separators, and `<time datetime>`.
- **Documentation:** Storybook stories for every variant (running and expired), with the source shown as an HTML template for the developers.

**Value:** one module covers a wide range of designs, documented and ready to implement.

**Certainty:** **Confirmed**, all commits are yours, 23–26 Oct 2026. **AI-assisted** (co-authored by Claude); say so openly.

**Portfolio potential:** very high visually. It is ideal for an interactive demo with variants, columns, themes and states. It is less strong as an "architecture" story because it is a single module.

#### #3: Content-aware layouts with `:has()` and container queries

**Problem**
Spacing and widths must react to what is actually rendered:
- a module with only one teaser
- a ticker that starts with a date separator
- an ad that an ad blocker has hidden

**Solution**

1. **`:has()` as a layout-state engine** (`src/scss/global/mobile/layouts/moduleSpacingGlobalM.scss:81-95`). Spacing depends on the module's content:
   ```scss
   .lpModule.teaserModul:has(> .teaserItem:only-child) { margin-bottom: 0; }
   .lpModule.articleTicker:not(:last-child):not(:first-child):has(> .dayseparator:first-child) { margin-top: 0; }
   ```
   `git blame`: 15 of 16 lines in this block are yours.

2. **A container query chosen deliberately over `:has()`** (`src/scss/global/desktop/components/galleryGlobal.scss:11-20, 587-595`; commits `38350a19` and `8cf5cfad`, 21 Oct 2026). Your comment in the code explains the decision:
   > "Bewusst nicht :has(.rectad): das Ad-Element bleibt auch bei Adblocker im HTML, nur unsichtbar - die Container-Query misst dagegen die tatsächlich verfügbare Breite. px statt rem, da rem in Query-Bedingungen nicht überall die 62.5%-Basis nutzt."

   This shows that you **choose between two modern tools** based on a real edge case (ad blockers) and a spec detail: `rem` in query conditions refers to the browser's initial font size, not to the `html` font size.

3. **Ad slots by ID with `:has()`** (`eddieadsGlobal.scss`, e.g. `&:has(#ct_dt_mr1, #Ads_BA_CAD, …)`). See #8.

**Certainty:** **Confirmed.** The gallery container query is AI-assisted. The `:has()` spacing work (Jan–Sep 2026) mostly predates the AI tagging.

**Not yours:** the gallery modernisation (PhotoSwipe, `container-type: size`, `cqw/cqh` units) is **marc.luedders' work** (`88c3b30e` … `660aca0d`). Do not claim it.

**Portfolio potential:** high for frontend leads. It shows current CSS knowledge applied to real problems.

#### #4: Consistent spacing system for landing-page modules

**Problem:** spacing between landing-page modules was inconsistent (Ticket#769815, "Uneinheitliches Abstandskonzept bei LP-Modulen").

**Solution:** 86 commits between 14 and 31 Aug 2026. Spacing is defined per module type, in combination with neighbouring modules (`+`) and position (`:not(:last-child)`). Content-dependent exceptions use `:has()` (see #3).
- Examples: articles `margin-bottom: 2rem`, landing pages `6rem` (`moduleSpacingGlobalM.scss:4-33`).
- Changes touched `disrupterGlobal`, `tickerGlobal`, `mainGlobal`, `landingpageGlobal` and the teaser files of several brands.

**Certainty:** **Confirmed** (all 86 commits by daniel.popa).

**Portfolio potential:** high, because it is very easy to show as a before/after: the vertical rhythm of a page.

#### #5: Contrast improvements and WCAG contrast tooling

**Confirmed contributions by you:**
- **Google Preferred Sources badge** (`a455654b`, `04f51646`, 28 May 2026): colour changed from `#3b78f0` to `#154C99`.

  | Background | Before | After | Note |
  |---|---|---|---|
  | White | 4.09:1 | 8.31:1 | Before: just below AA for small text |
  | `#f2f2f2` | 3.66:1 | 7.43:1 | |

  Ratios calculated with the WCAG formula.
- **PCGH overlay navigation** (Ticket#768197, 6–13 Feb 2026, 7 commits): background and autofill colours of the search field.
- **TripleTeaser** colour and date contrast for Linux-Magazin and PCGH (`7f0534f3`, `004ad504`).
- **WCAG tooling in Storybook:**
  - `stories/ui/uiHelpers.js:137-189` implements the WCAG relative-luminance formula, AA/AAA thresholds, the large-text rule and the 3:1 non-text threshold (1.4.11).
  - `stories/atelier/farbkontraste.js` builds a contrast matrix across the brand tokens (UI-Atelier, `34ac6cca`).
  - "UI Elements / Buttons" with a WCAG 2.2 check (`b4905ea7`).
- **Countdown module:** focus, reduced motion and calculated contrast pairs (see #2).

**Team work, not yours** (mention as "im Team" at most):
- skip link (WCAG 2.4.1)
- 24px target sizes (2.5.8)
- the Ticket#769497 series
- the automated axe contrast audit and its CI gating

All of these are Herbert Haida's work.

**Problems found in your own code** (honest openings for improvement, see Part 7):
- `.visually-hidden { display: none; }` in `global/desktop/components/multilanguageGlobal.scss:19-20` and in the mobile version. `display: none` also hides the text from screen readers, so this is not a real visually-hidden pattern.
- Across the codebase there are 153 `outline: none/0` rules and only 14 `:focus-visible` rules. Mostly legacy code, but a real, documentable opportunity.

**Certainty:** colour changes and tooling are **Confirmed**. That they improve accessibility in practice is an **Inference**; only contrast was checked. Screen readers and keyboard use need manual testing.

**Portfolio potential:** high if framed honestly as "contrast and states", not "WCAG compliance".

#### #6: Brand migration and feature unification

- **Linux-Magazin migration** (`51c61911`, 9 Sep 2025, 126 files): a bulk port into the shared system, followed by colour-token migration and adjustments (`bfb353d2`, `cb0fceca`).
- **Feature unification across PCG, PCGH and buffed:** Tickets 7610019 / 7610020 ("PCGH um PCG-/buffed-Features erweitern", `7e8357be`; "Schritt 2/3 PCG-Landingpages um PCGH-Features erweitern", `e93c403b`).

**Certainty:** **Confirmed.**

**Portfolio potential:** medium to high, as context for #1: "a new brand in the system".

#### #7: Storybook contributions

**Infrastructure** (Herbert Haida): config, visual-regression addon, specs, reference images, deploy gate.

**Yours:**
- brand switch and shared CSS package (`2f8a70ad`)
- CSS loading (`e54b6d35`)
- **LP snapshot pipeline:** `scripts/storybook-snapshot-lp.mjs` extracts real landing-page markup, which feeds `stories/pages/lpFrame.js` (`538c5bff`)
- UI-Atelier: workbench, colour contrasts, utility classes with icon gallery (`34ac6cca`)
- Buttons with a WCAG check (`b4905ea7`)
- Countdown stories

**Certainty:** **Confirmed.** Present these as contributions to a team tool.

#### #8: Ad slots and layout stability (honest framing)

**What exists:** reserved heights for ad slots. Examples:
- billboard `min-height: 25rem` (250px)
- sticky rail `min-height: 600px`
- hard `height: 250px` for banners 2–4
- mobile `banner_1` `height: 275px`
- mobile half page `min-height: 644px`

These reservations come almost entirely from the initial import, **before the git history began** (`beed1966`).

**Your part:**
- **Ticket#768335, BusinessAd tagging** (`374a3d76` and the series `084bfe99` … `68b6d2ee`): you added the new ad-server IDs `#Ads_BA_*` to the existing space reservations, sticky rules and label rules. Without that, the new slots would have lost their reservations (`eddieadsGlobal.scss:959-965`, `baseGlobalM.scss:130-132`, confirmed by blame).
- **Ticket#7610066** (`a578e6f9`): moved the PCGH-only width reservation (940px) to a global `95rem`.
- A code signature "DP" from 2023 (`eddieadsGlobal.scss` around line 1002): a bug fix for a "line above content ads while loading". This is older work, attested only by the comment.

**Critical assessment:**
- Space reserved before the ad loads prevents shifts if the creative fits. Fixed heights cannot shift, but may clip larger creatives.
- Remaining risks in the code:
  - featured articles reserve 0 or 90px for a 250px billboard
  - in-text content ads reserve 250px, while a 300×600 creative can appear
  - mobile CAD2/CAD3 reserve 270px
- **There are no CLS measurements in the repo** (no web-vitals data, no Lighthouse data, no CrUX data). The only measured CLS figure is marc.luedders' gallery value ("CLS fällt auf 0,0085", `3b58b8da`); it is not about ads.

**Certainty:** **Confirmed as maintenance and extension.** Any claim of "CLS reduced" is **not proven**.

**Portfolio potential:** medium today. It becomes high if you measure (see Part 7). Do **not** present it as "CLS optimised" until then.

#### #9: Modern CSS detail techniques

- **Gradient border with border-radius** (`affiliateButtonsGlobal.scss:1450-1466`, `b6b428d1`, 12 Jun 2026): a pseudo-element with a gradient, masked with `-webkit-mask-composite: xor` and the standard `mask-composite: exclude`. Blame: all lines are yours.
- **Ticket notches with masks** (Countdown Variant 6, see #2).
- **iOS Safari feature detection** `@supports (-webkit-touch-callout: none)` for gradient text in rating stars (`ratgeberGlobalM.scss:306-311`). Authorship is not checked line by line, so it is not cited as yours.

**Certainty:** **Confirmed** for the first two items.

**Portfolio potential:** medium, good as "details" in a case study.

#### #10: Fontello unified icons

`9bcbff85` (18 Nov 2025, about 1,900 changed lines): one icon set for all brands.

**Certainty:** **Confirmed.**

**Portfolio potential:** low to medium, as a supporting point for "consistency across brands".

---

## Part 3: Top three portfolio case studies

### Case study 1: One design language, seven brands

**Working title:** "Ein Token-System für sieben Marken: Wie aus 7.136 nummerierten Farbvariablen eine semantische Design-Sprache wurde"

#### The challenge
- Seven gaming and tech portals share one CSS code base, but colours were addressed by number (`--Cc1` to `--Cc36`).
- `--Cc5` was white in one brand and something else in the next.
- So nobody could see what a colour was for. Shared components were hard to reuse, and every colour change was risky.

#### My approach
- **Name colours by role, not by value.** Text, title, link, background, surface, border and button each get a semantic token.
- **Underneath, two primitive layers:**
  - a shared neutral grey scale
  - per-brand primary and accent colours
- **Dark mode re-points only the semantic layer.** Components never notice which brand or theme is active.
- **Migrate brand by brand rather than all at once,** so the live sites stay stable.

#### The implementation

Before (initial commit, July 2025):
```scss
/* local/pcgameshardware.de/desktop/abstracts/colorsLocal.scss */
--Cc1: #134b7d;
--Cc2: #fff;
--Cc3: #000;
/* global/desktop/components/tabNavigationGlobal.scss */
color: var(--Cc5);
```

After (today):
```scss
/* colorsGlobal.scss: shared primitives */
--wh: #fff;  --bk: #000;  --gr5: #f2f2f2;  --gr57: #6e6e6e;  /* … */

/* local/pcgameshardware.de/…/colorsLocal.scss: brand primitives + semantic */
--PrCl1: #134b7d;              /* Dark Blue */
--txB:   var(--gr66);          /* Body text */
--artTtl: var(--bk);           /* Article titles */
--lk:    var(--PrCl1);         /* Link */

[data-theme="dark"] {
  --artTtl: var(--wh);
  --lk:     var(--wh);
  --bgMd:   var(--PrCl3);
}

/* global component: brand- and theme-agnostic */
.CountdownModule { background: var(--bgMd); color: var(--txB); }
```

The same token in two brands:

| Token | PCGH light | PCGH dark | PCG light | PCG dark |
|---|---|---|---|---|
| `--lk` | `--PrCl1` (#134b7d) | `--wh` | #134b7d | `--wh` |
| `--bgMd` | `--gr5` | `--PrCl3` (#0b2d4a) | `--gr5` | `--gr75` |
| `--btnPrimBg` | `--PrCl1` | `--gr23` | `--bk` | `--wh` |

#### The result
**Measured, from git:**
- Legacy usages dropped from **7,136 to 54**.
- **7 of 8 brands** migrated.
- About **8,200 semantic token usages** today.
- **7,249 legacy usages removed net**, by you.

**What you can see in the implementation:**
- Global components can serve every brand.
- Colour changes happen centrally.
- Utility classes (`.txtCc*`, `.bgCc*`) carry the semantics into the HTML.

**Expected but not measured:** less effort and fewer regressions when changing colours. Phrase this as an expectation.

#### Why it matters
Multi-brand publishing is common, and its core problem is consistency without copying. A token system like this is the foundation for theming, dark mode and design-system tooling. With it, the Storybook brand and theme switch can show any brand at the click of a button.

#### Suggested visual presentation
- **Interactive token demo:** one module, with a brand switch (PCGH / PCG / buffed) and a theme switch (light / dark). Next to it, a token list that shows live which primitive each token currently points to.
- **"Before → after" diagram:** `--Cc5` (meaningless) → `--lk → --PrCl1 → #134b7d` (three layers).
- **Migration timeline:** a bar per brand, Dec 2025 → Aug 2026, with the falling count of legacy usages.

### Case study 2: Countdown module, one structure and many forms

**Working title:** "Ein Modul, sechs Gesichter: Countdown-Varianten mit CSS Grid, Tokens und Barrierefreiheit"

#### The challenge
- A release countdown has to work on landing pages and product pages, at 300 to 1,000 pixels wide, on desktop and mobile, in light and dark mode, in several brands, and before and after the release.
- Developers need a clear HTML template.

#### My approach
- Per variant, the HTML stays the same; the layout comes only from CSS (`grid-template-areas`).
- The state changes with a single class (`.isExpired`).
- Colours and spacing come from existing tokens and utilities, with no new colour variables.
- Contrast is calculated, not guessed.

#### The implementation
```scss
/* Desktop: image top right */
.CountdownModule {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas: "kicker image" "title image" "timer timer" "footer footer";
}
/* Mobile (separate M stylesheet): image next to the release date */
.CountdownModule {
  grid-template-areas: "kicker kicker" "title title" "timer timer" "image release" "button button";
}
/* Variant 6: ticket notches drawn with masks, no images */
.CountdownModule.countdownVariant6 {
  mask:
    radial-gradient(circle at calc(100% - 22rem) 0,    transparent 1rem, #000 1.05rem) top    / 100% 51% no-repeat,
    radial-gradient(circle at calc(100% - 22rem) 100%, transparent 1rem, #000 1.05rem) bottom / 100% 51% no-repeat;
}
/* Arrow animation only without reduced motion */
@media (prefers-reduced-motion: reduce) {
  .CountdownModule .countdownArrow { transition: none; }
}
```

Contrast (PCGH, light / dark, WCAG 2.x):

| Element | Light | Dark |
|---|---|---|
| Days figure, kicker (`txtCc2`) | 8.05:1 | 14.11:1 |
| Unit labels (`txtCc3`) | 6.45:1 | 8.09:1 |
| Rejected alternative `txtMuted` | 4.55:1 (borderline) | n/a |

#### The result
**What you can see:**
- 6 variants, each in 2 states.
- 3 desktop column widths plus mobile.
- Light and dark mode.
- Fully documented in Storybook.

**Not measured:** user behaviour and click rates.

#### Why it matters
It shows how design work becomes a *system* rather than a single layout. The design decisions (hierarchy, ticket metaphor) and the engineering decisions (grid areas, tokens, states, accessibility) belong together.

#### Suggested visual presentation
- An interactive "variant explorer" with tabs (V1–V6), a toggle (running / expired), a width slider (300 → 1,000 px) and a theme switch.
- A grid-area overlay: the named areas appear as coloured boxes while the layout changes.

> Note: the module was built AI-assisted. You can name that confidently as part of a modern workflow; the design decisions, iterations and acceptance were yours (see the commit history).

### Case study 3: Layouts that react to content

**Working title:** "Layouts, die mitdenken: :has() und Container Queries gegen Abstands-Chaos und Adblocker-Lücken"

#### The challenge
- On landing pages, the same modules appear in different combinations.
- One teaser, several teasers, a ticker that starts with a date: each case needs different spacing.
- In the image gallery, the header has to be wider when there is no ad. But with an ad blocker, the ad element stays in the HTML; it is only invisible.

#### My approach
- **Spacing depends on content,** not on extra classes in the HTML: `:has()` for structural states.
- **Width depends on the actually available space:** a container query instead of `:has(.rectad)`, because `:has()` sees the hidden ad element, while a container query measures the real width.
- **A spacing concept for all landing-page modules,** consistent across modules (Ticket#769815).

#### The implementation
```scss
/* Spacing depends on content */
.lpModule.teaserModul:has(> .teaserItem:only-child) { margin-bottom: 0; }
.lpModule.articleTicker:not(:last-child):not(:first-child):has(> .dayseparator:first-child) { margin-top: 0; }

/* Gallery header (galleryGlobal.scss): left = title/info bar, right = content ad (300px).
   If an ad blocker hides the ad (.rectad { display: none }), the left column gets the full width via flex. */
.galleryWrapperHeader {
  display: flex;
  gap: 1.5rem;
  .galleryWrapperHeaderLeft { flex: 1; min-width: 0; container-type: inline-size; }
}
/* Narrow header column = ad is shown (950px - 300px ad - 1.5rem gap = 635px; without ad 950px).
   Deliberately not :has(.rectad): the ad element stays in the HTML even with an ad blocker, only
   invisible. The container query measures the width that is actually available.
   px instead of rem, because rem in query conditions does not always use the 62.5% base. */
@container (max-width: 800px) {
  .articleInfoItem:has(.Breadcrumb) { max-width: 52.8rem; }
}
```

#### The result
**What you can see:**
- Consistent vertical rhythm on landing pages.
- No layout gaps when an ad blocker is active.
- No extra HTML classes needed.

**Not measured:** no before/after screenshots or metrics in the repo. Create them for the portfolio (Part 7).

#### Why it matters
It shows current CSS knowledge applied to a real edge case. You chose consciously between two modern tools and documented the decision in the code.

#### Suggested visual presentation
- A "with / without ad blocker" toggle: the gallery header with `:has()` (wrong: a gap) next to the container query (right).
- A landing-page rhythm comparison: before (uneven spacing, marked) and after (consistent rhythm, with a spacing overlay).

---

## Part 4: Portfolio section concept

### Recommended title

> **Behind the Interface**
> *Die technischen Entscheidungen, die Websites konsistenter, zugänglicher und wartbarer machen.*

**Why this title:** the strongest findings are system and structural decisions (tokens, grid areas, content-aware CSS), not performance metrics. "Behind the Interface" promises exactly that, without promising more than the evidence supports. ("Selected Engineering Improvements" would also fit, but is drier.)

### Structure

1. **Intro** (2–3 sentences): Senior Web Designer for a multi-brand publishing network with eight portals. Design and SCSS architecture from a single source.
2. **Four achievement cards** (editorial, not a dashboard):

   | Card | Category | Visual on the card |
   |---|---|---|
   | Ein Token-System für sieben Marken | Design System | Mini brand switch: one button that changes colour on hover/focus |
   | Ein Modul, sechs Gesichter | Komponenten & Layout | Animated grid-area silhouette |
   | Layouts, die mitdenken | Modernes CSS | Two boxes with and without an ad |
   | Kontrast, der trägt | Barrierefreiheit | Contrast ratio "4.09 → 8.31" as large type |

   Each card follows **Problem → Lösung → Nutzen**, in at most 3 short lines plus a "Case Study ansehen" link.
3. **Case-study pages** with a sticky table of contents, code snippets (collapsible), the interactive demo and an "Evidenz" box (ticket and commit range, without internal URLs).

### Design notes
- **Typography:** a strong grotesque for headlines, plus a monospace for tokens and code. Show token names as "chips".
- **Detail:** small colour swatches next to token names. Show contrast values as badges (AA / AAA).
- **Accessibility of the portfolio itself:** `:focus-visible` everywhere, `prefers-reduced-motion` for all demo animations, contrast ≥ 4.5:1. That is credible proof of the topic in its own right.
- **Responsive:** cards in one column on mobile. Demos with large touch targets (≥ 44px).
- **Honesty element:** a small "Rolle & Team" line on every case study, e.g. "Konzept & Umsetzung · Team: 2 Frontend-Entwickler". This builds trust.

---

## Part 5: Interactive demonstration ideas

| Demo | What visitors see | Interaction | Concept | Effort | Real or new? |
|---|---|---|---|---|---|
| **A. Token theme lab** | A button, a link, a teaser and a countdown tile | Brand switch (3–7 brands), light/dark, live token table | Semantic tokens → primitives | Medium (1–2 days) | **Reflects real work.** Rebuild it with your actual token names and values |
| **B. Contrast checker** | Colour pairs from the system, with their ratios | Hover/focus on a pair; AA/AAA filter; "Google badge before/after" | WCAG relative luminance, 4.5:1 / 3:1 | Low (you already have the logic in `uiHelpers.js`) | **Reflects real work** (tooling + badge fix) |
| **C. Countdown variant explorer** | The countdown module | Tabs V1–V6, running/expired, width slider, theme | Grid areas, container width, state classes | Medium | **Reflects real work** (copy the Storybook HTML/CSS) |
| **D. Ad-blocker layout** | Gallery header with an ad slot | Toggle "Ad / Adblocker / no slot"; switch "`:has()` vs. container query" | Container queries vs. `:has()` | Low–medium | **Reflects real work** |
| **E. Ad-slot stability** | A text column with an ad slot | No ad, 250, 300, 600px; "reserved / not reserved" | Space reservation, trade-off between CLS and whitespace | Medium | **New concept demo**, *not* proof of improved Core Web Vitals. Label it as an illustration |

**Recommended order:** A (strongest system story), C (visually strongest), B (fast and credible), D. Only build E once you have real measurements, or label it clearly as an illustration.

---

## Part 6: Portfolio-ready copy (German)

### 1. Token-System für sieben Marken

**Headline:** Ein Token-System für sieben Marken

**Ein Satz:** Aus 7.136 nummerierten Farbvariablen habe ich eine semantische Token-Architektur gemacht, mit der ein gemeinsamer Code sieben Gaming- und Tech-Portale in Light- und Dark-Mode gestaltet.

**Karte:** Farben hießen `--Cc1` bis `--Cc36` und bedeuteten in jeder Marke etwas anderes. Ich habe sie durch Tokens ersetzt, die nach Aufgabe benannt sind: Text, Link, Fläche, Button. Darunter liegen eine gemeinsame Graustufen-Palette und die Markenfarben. Ergebnis: sieben von acht Marken migriert, gemeinsame Komponenten statt Kopien.

**Case-Study-Einleitung:** Acht Portale, ein CSS-Code, und trotzdem sah jede Marke ihre Farben anders. Wer `--Cc5` las, wusste nicht, ob gerade Weiß, ein Hintergrund oder eine Linkfarbe gemeint war. Über acht Monate habe ich das Farbsystem Marke für Marke auf semantische Tokens umgestellt, von PCGH über PCG und buffed bis videogameszone. Heute verwenden die globalen Komponenten nur noch Rollen wie `--lk` oder `--bgMd`. Welche Farbe daraus wird, entscheidet die jeweilige Marke, im Light- und im Dark-Mode.

**Technische Lösung kurz:** Drei Ebenen aus CSS Custom Properties: globale Primitive (`--gr5…--gr93`), Marken-Primitive (`--PrCl*`) und semantische Tokens (`--txB`, `--lk`, `--bgMd`, `--btnPrimBg` …). Der Dark-Mode (`[data-theme="dark"]`) setzt nur die semantische Ebene um. Utility-Klassen wie `.txtCc2` oder `.bgCc1` bringen die Rollen ins HTML.

### 2. Countdown-Modul

**Headline:** Ein Modul, sechs Gesichter

**Ein Satz:** Ein Release-Countdown in sechs Varianten. Pro Variante ein HTML-Gerüst; das Layout entsteht für Desktop, Mobil und drei Spaltenbreiten allein über CSS Grid.

**Karte:** Vom kompakten Sidebar-Modul bis zum Release-Ticket mit Perforation: jede Variante passt sich an Spalte, Gerät, Marke und Theme an. Nach dem Release wechselt eine einzige Klasse den Zustand. Kontraste habe ich berechnet, Fokus und reduzierte Bewegung berücksichtigt.

**Case-Study-Einleitung:** Ein Countdown wirkt simpel, bis er auf Landingpages und Produktseiten, in 300 bis 1.000 Pixel breiten Spalten, mobil und am Desktop, hell und dunkel funktionieren muss. Und das in mehreren Marken, vor und nach dem Release. Ich habe das Modul als System entworfen: Das HTML bleibt pro Variante gleich, das Layout entsteht über benannte Grid-Bereiche. Farben und Abstände kommen aus vorhandenen Tokens und Utilities. Entstanden ist das Modul in einem KI-gestützten Workflow, Gestaltung und Abnahme lagen bei mir.

**Technische Lösung kurz:** `grid-template-areas` pro Viewport und Spalte, Zustand über `.isExpired`, Ticket-Einkerbungen per `mask` mit `radial-gradient`, `:focus-visible`-Outline, `prefers-reduced-motion`, `role="timer"` und `<time datetime>`. Jede Variante ist in Storybook dokumentiert.

### 3. Content-abhängige Layouts

**Headline:** Layouts, die mitdenken

**Ein Satz:** Mit `:has()` und Container Queries reagieren Abstände und Breiten auf den tatsächlichen Inhalt, auch wenn ein Adblocker Werbung ausblendet.

**Karte:** Ein Teaser oder fünf? Werbung sichtbar oder blockiert? Statt zusätzlicher Klassen fragt das CSS die Struktur selbst ab. Für die Bildergalerie habe ich bewusst eine Container Query statt `:has()` gewählt, weil ein geblocktes Werbeelement im HTML bleibt.

**Case-Study-Einleitung:** Auf Landingpages stehen dieselben Module in immer neuen Kombinationen, und jede Kombination braucht eigene Abstände. In einem einheitlichen Abstandskonzept für alle LP-Module habe ich Regeln definiert, die sich nach Modultyp, Nachbarn und Inhalt richten. Bei der Bildergalerie kam ein Sonderfall dazu: Mit Adblocker bleibt das Werbe-Element im Code, nimmt aber keinen Platz ein. Eine Container Query misst die wirklich verfügbare Breite und löst das zuverlässig.

**Technische Lösung kurz:** `:has()` mit `:only-child` und `:first-child` für inhaltsabhängige Abstände, Geschwister-Selektoren für Modul-Kombinationen, `container-type: inline-size` mit `@container (max-width: 800px)`. Der `px`-Wert ist bewusst gewählt, weil `rem` in Query-Bedingungen nicht auf die 62,5-%-Basis zurückgreift.

### 4. Kontrast und Barrierefreiheit

**Headline:** Kontrast, der trägt

**Ein Satz:** Ich prüfe Farbpaare nach WCAG und verbessere sie gezielt. Ein Beispiel: Ein Badge stieg von 4,09:1 auf 8,31:1.

**Karte:** Barrierefreiheit beginnt bei lesbaren Farben. Ich habe Kontrastprobleme in Navigation, Teasern und Badges behoben und in Storybook ein Werkzeug gebaut, das Kontraste nach WCAG berechnet und als Matrix über alle Marken-Tokens zeigt.

**Case-Study-Einleitung:** Ein Farbwert sieht auf dem Bildschirm des Designers gut aus und ist trotzdem für viele Menschen schwer lesbar. Ich habe Kontrastberechnung zum festen Teil meiner Arbeit gemacht: bei Korrekturen bestehender Elemente wie dem Google-Preferred-Sources-Badge und bei neuen Modulen wie dem Countdown. Dafür gibt es in Storybook ein eigenes Werkzeug. Automatisierte Prüfungen und Skip-Links hat das Team ergänzt, und gemeinsam arbeiten wir an mehr Barrierefreiheit über alle Marken.

**Technische Lösung kurz:** WCAG-Formel für relative Leuchtdichte (`stories/ui/uiHelpers.js`), AA/AAA-Schwellen für normalen und großen Text, 3:1 für UI-Elemente, eine Kontrastmatrix über die Marken-Tokens (`stories/atelier/farbkontraste.js`), `:focus-visible` und `prefers-reduced-motion` in neuen Komponenten.

---

## Part 7: Evidence and limitations

### 7.1 Key files

| Topic | Files |
|---|---|
| Tokens | `src/scss/global/{desktop,mobile}/abstracts/colorsGlobal(M).scss`, `src/scss/local/<brand>/{desktop,mobile}/abstracts/colorsLocal(M).scss`, `…/utilityLocal(M).scss` (`.txtCc*`, `.bgCc*`) |
| Countdown | `src/scss/global/desktop/components/countDownGlobal.scss`, `src/scss/global/mobile/components/countDownGlobalM.scss`, `src/scss/local/pcgameshardware.de/*/components/countDownLocal(M).scss`, `stories/lp/countdown.stories.js` |
| `:has()` / container queries | `src/scss/global/mobile/layouts/moduleSpacingGlobalM.scss` (81-95), `src/scss/global/desktop/components/galleryGlobal.scss` (11-20, 587-595), `src/scss/global/desktop/widgets/galleryImgGlobal.scss` (9-20) |
| Ads | `src/scss/global/desktop/modules/eddieadsGlobal.scss`, `src/scss/global/mobile/layouts/baseGlobalM.scss` (25-170, 1721-1744), `src/scss/global/desktop/modules/bannerGlobal.scss` |
| Contrast tooling | `stories/ui/uiHelpers.js` (137-189), `stories/atelier/farbkontraste.js` |
| Details | `src/scss/global/desktop/widgets/affiliateButtonsGlobal.scss` (1450-1466) |

### 7.2 Key commits (daniel.popa)

| Commit | Date | Subject |
|---|---|---|
| `bb49c327` | 2025-12-09 | PCGH-Farbvariable-Refactoring (first `--btnPrimBg`) |
| `8480ec30` | 2025-12-16 | PCGH Colors Refactoring (creates `colorsGlobal`) |
| `bfb353d2` | 2026-01-21 | Linux Magazin Color-Vars Refactoring |
| `7a9be224` | 2026-02 | PCG Color Vars Refactoring Anpassungen (232 files) |
| `8b83c8dc` | 2026-02/03 | BFD Color Vars Refactoring |
| `c0ffb7d2` | 2026-04 | GZ Color Vars Refactoring |
| `9085c935` | 2026-05 | GA Color Vars Refactoring |
| `d51e9cf2` | 2026-08 | VGZ Color Refactoring |
| `51c61911` | 2025-09-09 | Linux-Magazin Migration Anpassungen |
| `9bcbff85` | 2025-11-18 | Fontello Unified Icons |
| `04f51646` | 2026-05-28 | Google Preferred Sources: contrast improvements |
| `b6b428d1` | 2026-06-12 | Price-radar CTA (gradient border) |
| `374a3d76` | 2026-06-24 | Business Ads adjustments (Ticket#768335) |
| `be26603d` … `37550ec9` | 2026-08-14 … 08-31 | Ticket#769815 spacing concept for LP modules (86 commits) |
| `a578e6f9` | 2026-09-02 | Ticket#7610066 reserved areas for banner ad slots |
| `38350a19`, `8cf5cfad` | 2026-10-21 | Gallery: container query instead of `:has(.rectad)` |
| `b4905ea7`, `34ac6cca` | 2026-10 | Storybook: buttons with WCAG check, UI-Atelier |
| `6a2e412c` … `77d5b48f` | 2026-10-23 … 10-26 | Countdown module, Variants 1–6 |

### 7.3 Clearly not your work

Mention these at most as "im Team":

| Area | Author |
|---|---|
| Dark-mode mechanism and JS switch, spacer map, Vite bundle concept, breakpoint mixins | Initial commit, Markus Wollny, 3 July 2025 |
| Storybook infrastructure, visual regression (691 PNGs), deploy gate, axe contrast audit, skip link, 24px target sizes, CLS logger in `comentarioM.html`, deploy scripts | Herbert Haida |
| Gallery modernisation (PhotoSwipe, `container-type: size`, `cqw`/`cqh`), the only measured CLS value (`3b58b8da`) | marc.luedders |

### 7.4 Needs verification / measurements missing

1. **CLS / Core Web Vitals:** there are no measurements in the repo. Before any CLS claim:
   - pull **CrUX data** (PageSpeed Insights / CrUX dashboard) for PCGH, PCG and buffed, ideally as a time series around the BusinessAd changeover (June 2026)
   - use **RUM** with the `web-vitals` library and attribution (`onCLS` with `attribution.largestShiftTarget`) to see which elements cause shifts
   - run Lighthouse / WebPageTest on articles with in-text content ads and with a 300×600 creative
2. **Accessibility beyond contrast:** screen readers (NVDA/VoiceOver), keyboard tab order, Windows High Contrast / `forced-colors` (no support in the code yet), 200%/400% zoom with reflow. Only contrast has been checked automatically so far.
3. **Before/after visuals:** create screenshots for the spacing concept (Ticket#769815) and the token migration, for example from git checkouts of `beed1966` versus today, rendered in Storybook.
4. **Line-level authorship:** for individual quotes, check `git blame` on the cited lines. Some files are shared work.
5. **Older work before the git history:** some code comments carry "DP" signatures from 2019 and 2023 (e.g. `baseGlobal.scss:13-18`, `eddieadsGlobal.scss` around line 1002). They suggest work before July 2025 but are not proof in git. Use them at most as "since 2019 on the platform", if your CV confirms it.

### 7.5 Opportunities found (possible future case studies)

| Finding | File | Effort | Story value |
|---|---|---|---|
| `.visually-hidden { display: none }` hides text from screen readers too; replace with the standard clip pattern | `global/desktop/components/multilanguageGlobal.scss:19-20`, mobile equivalent | Small | "Accessibility audit of my own code" |
| 153 × `outline: none/0`, only 14 × `:focus-visible` | codebase-wide | Medium | "Focus states across 7 brands" |
| `border: none` on `:focus` / `:focus-visible` (legacy) | `local/pcgameshardware.de/mobile/layouts/navigationLocalM.scss:1009-1012` | Small | Part of the focus project |
| No `forced-colors` support | codebase-wide | Medium | "High-contrast mode" |
| Ad-slot reservation gaps: featured articles 0/90px vs 250px billboard; in-text 250px vs 300×600 | `eddieadsGlobal.scss:97-116, 1002-1006`, `baseGlobalM.scss:129-134` | Medium + measurement | **Strong CLS case study once measured** |
| computec.de still on the legacy variables (54 usages) | `local/computec.de/desktop/pages/{error,login}Local.scss` | Small | Completes case study 1 ("8 of 8 brands") |
| `--spacer-N` tokens used only in the Countdown so far | `utilityGlobal.scss:1605-1623` | Medium | "Extending the spacing system into tokens" |

---

*Created with a read-only analysis of the source code and git history (`origin/master` and `storybook_pcgh`). Contrast values were calculated with the WCAG 2.x formula. All counts can be reproduced with the commands described in the text (`git grep`, `git log -S`, `git blame`).*
