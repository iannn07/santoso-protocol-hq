# XLSMART Package Advisor — UI Specification

> Version 2.0 — Refactored design for brand alignment and professional polish.
> Designer: Langston | For: Quinn (Engineer)
> Date: 2026-04-14

---

## 1. Brand Guidelines

### 1.1 Color Palette

The current purple (#7B2FBE) scheme does not align with XLSMART/XL Axiata branding. The refactored palette uses XL corporate blue as primary, with XLSMART accent red for CTAs and emphasis.

| Token Name | Hex | Usage |
|---|---|---|
| `--xl-blue` | `#003087` | Primary brand color — headers, active states, step indicators, selected borders |
| `--xl-blue-dark` | `#001F5C` | Hover states on primary elements, header gradient end |
| `--xl-blue-light` | `#E8EEF7` | Light background tint for selected cards, info boxes, summary panels |
| `--xl-blue-mid` | `#335FA3` | Secondary text on blue backgrounds, link color |
| `--xl-red` | `#E4002B` | CTA buttons (Contact Sales), required field indicators, error states |
| `--xl-red-dark` | `#B80023` | CTA hover state |
| `--xl-red-light` | `#FDE8EC` | Error message background |
| `--neutral-50` | `#FAFAFA` | Page background |
| `--neutral-100` | `#F5F5F5` | Card backgrounds, input field backgrounds |
| `--neutral-200` | `#E5E5E5` | Borders, dividers, inactive step connectors |
| `--neutral-400` | `#A3A3A3` | Placeholder text, disabled icons |
| `--neutral-600` | `#525252` | Secondary body text, labels |
| `--neutral-800` | `#262626` | Primary body text |
| `--neutral-900` | `#171717` | Headings |
| `--white` | `#FFFFFF` | Card surfaces, text on dark backgrounds |

### 1.2 Typography

| Element | Font | Weight | Size (mobile) | Size (desktop) | Line Height | Color |
|---|---|---|---|---|---|---|
| Page title (hero) | Geist Sans | 700 (bold) | 24px | 36px | 1.2 | `--white` |
| Page subtitle | Geist Sans | 400 (regular) | 14px | 16px | 1.5 | `--white` at 85% opacity |
| Section heading (step title) | Geist Sans | 600 (semibold) | 18px | 22px | 1.3 | `--neutral-900` |
| Card label | Geist Sans | 500 (medium) | 14px | 14px | 1.4 | `--neutral-800` |
| Body text | Geist Sans | 400 (regular) | 14px | 15px | 1.6 | `--neutral-600` |
| Button text | Geist Sans | 600 (semibold) | 14px | 15px | 1.0 | `--white` (primary) or `--xl-blue` (secondary) |
| Badge text | Geist Sans | 600 (semibold) | 11px | 12px | 1.0 | `--white` (on blue) or `--xl-blue` (on light) |
| Caption / helper text | Geist Sans | 400 (regular) | 12px | 13px | 1.4 | `--neutral-400` |

Font stack: `'Geist Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### 1.3 Spacing Scale

Use a 4px base unit. All spacing references below use this scale:

| Token | Value | Usage |
|---|---|---|
| `xs` | 4px | Inline spacing, icon-to-label gap |
| `sm` | 8px | Tight padding within badges, compact gaps |
| `md` | 12px | Standard inner padding, form field padding |
| `base` | 16px | Standard gap between elements, card padding on mobile |
| `lg` | 20px | Card padding on tablet+ |
| `xl` | 24px | Section spacing, wizard area padding on mobile |
| `2xl` | 32px | Section spacing on desktop |
| `3xl` | 48px | Major section breaks |

### 1.4 Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 6px | Badges, small buttons |
| `radius-md` | 8px | Input fields, checkboxes appearance |
| `radius-lg` | 12px | Cards, modals, wizard container |
| `radius-xl` | 16px | Hero section bottom corners |
| `radius-full` | 9999px | Step indicator circles, pill shapes |

### 1.5 Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-card` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Default card elevation |
| `shadow-card-hover` | `0 4px 12px rgba(0,48,135,0.12)` | Card hover state (blue-tinted) |
| `shadow-wizard` | `0 2px 8px rgba(0,0,0,0.06)` | Wizard container |
| `shadow-button` | `0 1px 2px rgba(0,0,0,0.05)` | Buttons at rest |

---

## 2. Page Layout

### 2.1 Overall Structure

```
+--------------------------------------------------+
|  HEADER (blue gradient)                           |
|  Logo + Title + Subtitle                          |
+--------------------------------------------------+
|                                                    |
|  WIZARD CONTAINER (white card, centered)          |
|    [ WizardProgress ]                             |
|    [ Active Step Content ]                        |
|    [ Navigation Buttons ]                         |
|                                                    |
+--------------------------------------------------+
|  FOOTER (minimal)                                 |
+--------------------------------------------------+
```

### 2.2 Container Widths

| Breakpoint | Container max-width | Horizontal padding |
|---|---|---|
| Mobile (< 768px) | 100% | 16px |
| Tablet (768px–1279px) | 720px | 24px |
| Desktop (>= 1280px) | 800px | 32px |

The wizard container is centered horizontally with `margin: 0 auto`.

### 2.3 Header

- **Background**: Linear gradient at 135deg from `--xl-blue` (#003087) to `--xl-blue-dark` (#001F5C)
- **Height**: Auto, with vertical padding of 32px (mobile) / 48px (desktop)
- **Bottom corners**: `radius-xl` (16px) to create a soft transition to the page body
- **Content alignment**: Center-aligned text
- **Logo**: "XLSMART" in bold white, 20px, with "for BUSINESS" in regular weight 14px on the same line or directly below (mobile)
- **Title**: "Temukan Paket Bisnis Terbaik Anda" — page title styling
- **Subtitle**: "Jawab 3 pertanyaan singkat, dapatkan rekomendasi produk yang tepat" — subtitle styling
- **Bottom margin**: -24px overlap into wizard container (wizard card sits partially over header bottom edge for visual depth)

### 2.4 Wizard Container

- **Background**: `--white`
- **Border radius**: `radius-lg` (12px)
- **Shadow**: `shadow-wizard`
- **Padding**: 16px (mobile) / 24px (tablet) / 32px (desktop)
- **Margin top**: -24px (overlapping into header)
- **Margin bottom**: 48px
- **Border**: 1px solid `--neutral-200`

### 2.5 Footer

- **Padding**: 24px vertical
- **Border top**: 1px solid `--neutral-200`
- **Content**: "Powered by XLSMART for Business" — caption styling, center-aligned
- **Color**: `--neutral-400`

---

## 3. Step 1 — Industry Selector

### 3.1 Step Title

- Text: "Pilih Industri Anda" (Choose Your Industry)
- Style: Section heading
- Margin bottom: `lg` (20px)

### 3.2 Industry Card Grid

- **Layout**: CSS Grid
  - Mobile (< 768px): 2 columns, gap 10px
  - Tablet (768px+): 3 columns, gap 12px
  - Desktop (1280px+): 4 columns, gap 12px
- **Total cards**: 22 industries (from question-options.json)

### 3.3 Individual Industry Card

- **Dimensions**: Auto height, minimum 80px tall
- **Padding**: 12px vertical, 8px horizontal
- **Border radius**: `radius-md` (8px)
- **Text alignment**: Center
- **Display**: Flex column, items centered, justify center

**Default state:**
- Background: `--neutral-100`
- Border: 1.5px solid `--neutral-200`
- Icon: Emoji at 24px
- Label: Card label style, `--neutral-800`
- Cursor: pointer

**Hover state:**
- Border color: `--xl-blue-mid` (#335FA3)
- Shadow: `shadow-card-hover`
- Background: `--white`

**Selected state:**
- Border color: `--xl-blue` (#003087), 2px solid
- Background: `--xl-blue-light` (#E8EEF7)
- Label color: `--xl-blue` (#003087)
- Font weight: 600 (semibold)
- A subtle inner glow: `inset 0 0 0 1px rgba(0,48,135,0.1)`

**Focus state (keyboard navigation):**
- Outline: 2px solid `--xl-blue`, 2px offset
- Same visual as hover

### 3.4 Next Button (Step 1)

- Full width on mobile, max-width 320px centered on tablet+
- Text: "Lanjutkan" with right arrow icon
- Style: Primary button (see Section 6.2)
- Margin top: `xl` (24px)
- Disabled when no industry selected

---

## 4. Step 2 — Business Profile

### 4.1 Step Title

- Text: "Profil Bisnis Anda" (Your Business Profile)
- Style: Section heading
- Margin bottom: `lg` (20px)

### 4.2 Layout

- **Mobile**: Single column, full width
- **Tablet+ (768px)**: Two-column layout, equal widths, gap 24px
  - Left column: Company size selector
  - Right column: Needs checkboxes

### 4.3 Company Size Selector

**Section label:**
- Text: "Jumlah Karyawan" (Number of Employees)
- Style: Card label, margin bottom `md` (12px)

**Radio group — 4 options stacked vertically:**

Each option is a card-style radio:

- **Height**: 48px
- **Padding**: 12px left, 16px right
- **Border radius**: `radius-md` (8px)
- **Display**: Flex row, items center
- **Gap**: 12px between radio circle and text
- **Margin bottom**: 8px between options

**Default state:**
- Background: `--neutral-100`
- Border: 1.5px solid `--neutral-200`
- Radio circle: 18px diameter, 2px border `--neutral-400`, white fill

**Selected state:**
- Background: `--xl-blue-light`
- Border: 1.5px solid `--xl-blue`
- Radio circle: 18px diameter, 2px border `--xl-blue`, inner dot 8px filled `--xl-blue`
- Text color: `--xl-blue`
- Font weight: 600

**Options:**
1. "1–10 karyawan" (Bisnis kecil)
2. "11–50 karyawan" (UKM)
3. "51–200 karyawan" (UKM besar)
4. "200+ karyawan" (Enterprise)

### 4.4 Primary Needs Checkboxes

**Section label:**
- Text: "Kebutuhan Utama" (Primary Needs)
- Sub-label: "Pilih maksimal 2" (Choose max 2) — caption style, `--neutral-400`
- Margin bottom: `md` (12px)

**Checkbox group — 8 options stacked vertically:**

Each option is a card-style checkbox:

- Same dimensions and spacing as radio options above
- **Checkbox**: 18px square, 2px border `--neutral-400`, `radius-sm` (6px), white fill

**Default state:** Same as radio default

**Selected state:**
- Background: `--xl-blue-light`
- Border: 1.5px solid `--xl-blue`
- Checkbox: Filled `--xl-blue` with white checkmark SVG inside
- Text color: `--xl-blue`
- Font weight: 600

**Disabled state (when 2 already selected, remaining unselected options):**
- Opacity: 0.45
- Cursor: not-allowed
- No hover effect

**Options:**
1. "Konektivitas Internet" (Internet Connectivity)
2. "IoT & Otomasi" (IoT & Automation)
3. "Keamanan Jaringan" (Network Security)
4. "Cloud & Kolaborasi" (Cloud & Collaboration)
5. "AI & Analitik" (AI & Analytics)
6. "Software Operasional" (Operations Software)
7. "Fleet & Logistik" (Fleet & Logistics)
8. "Mobilitas Karyawan" (Employee Mobility)

### 4.5 Navigation Buttons (Step 2)

- **Layout**: Flex row, space-between on mobile; centered with gap 16px on tablet+
- **Back button**: Secondary button style, text "Kembali" with left arrow
- **Submit button**: Primary button style, text "Lihat Rekomendasi" with right arrow
- Disabled when company size is not selected OR no needs selected
- Max-width: each button 200px on tablet+

---

## 5. Step 3 — Recommendation Result

### 5.1 Summary Box

- **Background**: `--xl-blue-light` (#E8EEF7)
- **Border**: 1px solid rgba(0,48,135,0.15)
- **Border radius**: `radius-lg` (12px)
- **Padding**: `lg` (20px)
- **Margin bottom**: `xl` (24px)

**Content:**
- Heading: "Ringkasan Profil Anda" (Your Profile Summary) — card label style
- Three inline items: Industry badge, Company size badge, Needs badges
- Badges: Background `--white`, border 1px `--neutral-200`, `radius-sm` (6px), padding 4px 10px, badge text style

### 5.2 AI Reasoning Text

- **Background**: `--white`
- **Border left**: 3px solid `--xl-blue`
- **Padding**: 16px
- **Margin bottom**: `xl` (24px)
- **Text**: Body text style, italic
- **Icon**: Small blue lightbulb or sparkle icon before the text block (optional)
- Content: The `summary` field from the API response (2-3 sentences in Indonesian)

### 5.3 Primary Recommendation Card (Rank 1)

- **Border**: 2px solid `--xl-blue`
- **Border radius**: `radius-lg` (12px)
- **Shadow**: `shadow-card`
- **Padding**: `lg` (20px) on mobile, `xl` (24px) on desktop
- **Margin bottom**: `base` (16px)
- **Background**: `--white`

**Card header:**
- Badge: "Rekomendasi Utama" — background `--xl-blue`, text `--white`, `radius-sm`, padding 4px 12px, badge text style, uppercase tracking 0.5px
- Product name: Section heading style, margin top `sm` (8px)
- Category: Caption style, `--neutral-400`

**Card body:**
- `fit_reason` text: Body text style, margin top `md` (12px)
- Key features list (from product data): Unordered list with blue bullet points (`--xl-blue`), body text style, margin top `md` (12px)
  - Display 3–5 key features from the product's `key_features` array

**Card footer:**
- `cta` text: Caption style, `--neutral-600`, margin top `md` (12px)

### 5.4 Alternative Recommendation Card (Rank 2)

- **Border**: 1px solid `--neutral-200`
- **Border radius**: `radius-lg` (12px)
- **Shadow**: none
- **Padding**: `base` (16px)
- **Margin bottom**: `xl` (24px)
- **Background**: `--neutral-50`

**Card header:**
- Badge: "Alternatif" — background `--neutral-200`, text `--neutral-600`, same badge styling
- Product name: Card label style (not section heading)
- Category: Caption style

**Card body:**
- `fit_reason` text only (no features list — keep it compact)

### 5.5 CTA Button

- **Style**: CTA/accent button (red)
- **Background**: `--xl-red` (#E4002B)
- **Hover**: `--xl-red-dark` (#B80023)
- **Text**: "Hubungi Sales via Telegram" — button text style, `--white`
- **Icon**: Telegram icon (paper plane) to the left of text, 18px
- **Full width** on mobile, max-width 360px centered on tablet+
- **Height**: 48px
- **Border radius**: `radius-md` (8px)
- **Shadow**: `shadow-button`
- **Link**: Opens XLSMART Telegram in new tab

### 5.6 Start Over Link

- **Text**: "Mulai Ulang" (Start Over)
- **Style**: Text link, `--xl-blue`, underline on hover
- **Placement**: Center-aligned, margin top `base` (16px) below the CTA button
- **Icon**: Small refresh/rotate icon to the left, 14px
- **Action**: Resets wizard to Step 1, clears all selections

---

## 6. Navigation and Progress

### 6.1 WizardProgress (Step Indicator)

**Layout:**
- Horizontal flex row, centered, at the top of the wizard container
- Margin bottom: `xl` (24px)
- Three circles connected by lines

**Step circle:**
- Size: 32px diameter
- Border radius: `radius-full`
- Display: Flex center (number or checkmark inside)
- Font: 14px, semibold

**Connector line:**
- Height: 2px
- Width: flex-grow (fills space between circles)
- Margin: 0 8px (gap between circle edge and line)

**States:**

| State | Circle BG | Circle Border | Circle Text | Connector |
|---|---|---|---|---|
| Completed | `--xl-blue` | none | White checkmark (14px) | `--xl-blue` |
| Active | `--white` | 2px solid `--xl-blue` | `--xl-blue` (step number) | `--neutral-200` |
| Upcoming | `--neutral-100` | 1.5px solid `--neutral-200` | `--neutral-400` (step number) | `--neutral-200` |

**Step labels (below each circle):**
- Text: "Industri", "Profil", "Hasil"
- Style: Caption, center-aligned
- Color: `--xl-blue` for completed/active, `--neutral-400` for upcoming
- Margin top: 6px

### 6.2 Button Styles

**Primary button:**
- Background: `--xl-blue` (#003087)
- Hover: `--xl-blue-dark` (#001F5C)
- Text: `--white`, button text style
- Height: 44px
- Padding: 0 24px
- Border radius: `radius-md` (8px)
- Shadow: `shadow-button`
- Transition: background-color 150ms ease, box-shadow 150ms ease
- Active: Scale 0.98

**Primary button (disabled):**
- Background: `--xl-blue` at 40% opacity
- Cursor: not-allowed
- No hover effect
- No shadow

**Secondary button (Back):**
- Background: `--white`
- Border: 1.5px solid `--neutral-200`
- Text: `--neutral-600`, button text style
- Hover: border-color `--xl-blue-mid`, text `--xl-blue`
- Same dimensions as primary

**CTA button (Telegram):**
- Background: `--xl-red` (#E4002B)
- Hover: `--xl-red-dark` (#B80023)
- Text: `--white`, button text style
- Height: 48px
- Padding: 0 28px
- Border radius: `radius-md` (8px)
- Shadow: `shadow-button`

### 6.3 Loading State (Step 3)

While the API call resolves, Step 3 displays a loading state instead of results:

- **Container**: Same wizard container, centered content
- **Spinner**: 40px diameter, 3px border, `--xl-blue` on top arc, `--neutral-200` on remaining arc, CSS animation spin 0.8s linear infinite
- **Text below spinner**: "Menganalisis kebutuhan bisnis Anda..." (Analyzing your business needs...) — body text style, `--neutral-600`, center-aligned
- **Margin top**: 8px below spinner
- **Overall vertical centering**: Min-height 300px for the loading container to prevent layout jump

### 6.4 Error State

If the API call fails (and fallback also fails):

- **Alert box**: Background `--xl-red-light`, border 1px solid rgba(228,0,43,0.2), `radius-md`, padding 16px
- **Icon**: Warning triangle, `--xl-red`, 20px
- **Text**: "Terjadi kesalahan. Silakan coba lagi." (An error occurred. Please try again.) — body text, `--neutral-800`
- **Retry button**: Secondary button style, text "Coba Lagi"

---

## 7. Component Inventory

Quinn should implement the following components. Each maps to a single React component file.

| Component | File | Description |
|---|---|---|
| `WizardProgress` | `WizardProgress.tsx` | Step indicator with 3 circles, connector lines, and labels. Props: `currentStep` (1-3), `completedSteps` (number[]) |
| `IndustrySelector` | `IndustrySelector.tsx` | Grid of 22 clickable industry cards with emoji icons. Props: `selected` (string), `onSelect` (fn) |
| `BusinessProfile` | `BusinessProfile.tsx` | Two-section form: radio group for company size + checkbox group for needs (max 2). Props: `companySize` (string), `needs` (string[]), `onSizeChange` (fn), `onNeedsChange` (fn) |
| `RecommendationResult` | `RecommendationResult.tsx` | Displays primary + alternative product cards, AI reasoning, CTA, and start-over link. Props: `recommendations` (array), `summary` (string), `profile` (object), `onReset` (fn) |
| `LoadingSpinner` | `LoadingSpinner.tsx` | Centered spinner animation with "Analyzing..." text. No props (or optional `message` string) |
| `ErrorAlert` | `ErrorAlert.tsx` | Error message box with retry button. Props: `message` (string), `onRetry` (fn) |
| `AdvisorWizard` | `AdvisorWizard.tsx` | Orchestrator: manages wizard state, step transitions, form data, API calls. Renders the active step component + WizardProgress + navigation buttons. |

---

## 8. Tailwind / CSS Token Mapping

For Quinn's implementation, here is the mapping from design tokens to Tailwind config extensions:

```
colors:
  xl-blue:        '#003087'
  xl-blue-dark:   '#001F5C'
  xl-blue-light:  '#E8EEF7'
  xl-blue-mid:    '#335FA3'
  xl-red:         '#E4002B'
  xl-red-dark:    '#B80023'
  xl-red-light:   '#FDE8EC'

CSS custom properties to replace in globals.css:
  --xlsmart-purple       -> --xl-blue: #003087
  --xlsmart-purple-dark  -> --xl-blue-dark: #001F5C
  --xlsmart-purple-light -> --xl-blue-light: #E8EEF7
```

All inline `style` attributes currently referencing `#7B2FBE`, `#5c2090`, or `#f5eeff` should be replaced with the corresponding `--xl-blue`, `--xl-blue-dark`, or `--xl-blue-light` tokens. Quinn should migrate these to Tailwind utility classes referencing the extended color config above, removing inline styles entirely.

---

## 9. Responsive Breakpoint Summary

| Breakpoint | Width | Key Layout Changes |
|---|---|---|
| Mobile | < 768px | Single column everywhere. Industry grid: 2 cols. Buttons: full width. Padding: 16px. |
| Tablet | 768px–1279px | Wizard max-width 720px. Industry grid: 3 cols. Business profile: 2 cols. Buttons: centered, max-width 200px each. |
| Desktop | >= 1280px | Wizard max-width 800px. Industry grid: 4 cols. More generous padding (32px). |

---

## 10. Interaction and Transition Notes

- **Card selection**: 150ms ease transition on border-color and background-color
- **Button hover**: 150ms ease on background-color
- **Step transition**: No animated slide between steps — instant swap is fine (keeps implementation simple)
- **Spinner**: CSS `@keyframes spin` — 0.8s linear infinite rotation
- **Focus management**: When advancing to a new step, focus should move to the step title (for screen reader accessibility)
- **Scroll**: On step change, scroll wizard container into view if it's below the fold

---

*End of specification. All sections are ready for Quinn's implementation.*
