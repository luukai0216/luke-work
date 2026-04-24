# Design System Inspired by Antimetal

## 1. Visual Theme & Atmosphere

Antimetal's design system embodies a modern, tech-forward aesthetic centered on clarity and precision. The visual language combines a deep, professional color foundation with strategic accent highlights—particularly luminous lime-green (`#D0F100`) that cuts through the dark palette, commanding attention for primary actions. The design evokes reliability and sophistication, using subtle transparency, delicate shadows, and generous whitespace to create depth without visual clutter. Geometric precision, minimal ornamentation, and a measured use of micro-interactions establish trust and technical competence, making complex infrastructure concepts feel approachable. The overall mood is one of calm confidence—a platform that understands the chaos of deployment and renders it intelligible.

**Key Characteristics**
- Deep, professional navy foundation with high-contrast accent colors
- Strategic use of luminous lime-green (`#D0F100`) for primary CTAs
- Subtle transparency and layered depth effects
- Minimal, geometric visual language
- Generous whitespace and breathing room
- High accessibility with clear color contrast
- Tech-forward but human-centered aesthetic

## 2. Color Palette & Roles

### Primary
- **Deep Navy** (`#1B2540`): Primary background, dominating layout structure; used extensively for surfaces and containers
- **Darker Navy** (`#0C264D`): Secondary background for nested or grouped content areas
- **Lime Green** (`#D0F100`): Primary call-to-action button, high-impact interactive states; signals action and urgency

### Accent Colors
- **Bright Blue** (`#005BF6`): Secondary accent for links, highlights, or data visualizations
- **Magenta** (`#FF00EA`): Tertiary accent for emphasis or special interactive states
- **Pink** (`#FFA2FB`): Soft accent for supporting visual elements or gradient transitions
- **Sky Blue** (`#E0F6FF`): Light accent for backgrounds or hover states; signals openness and clarity

### Interactive
- **Lime Green Button** (`#D0F100`): Primary CTA with text color `#1B2540`; used for main conversion actions
- **Secondary Dark Button** (`#001033`): Secondary actions with light text; high elevation shadow treatment
- **Ghost Button** (transparent with `#FAFEFF` text): Navigation and tertiary actions

### Neutral Scale
- **Off-White** (`#FAFEFF`): Primary light text and interface elements; default typography color
- **Pure White** (`#FFFFFF`): Accent text, highlights, and highest contrast needs
- **Light Gray-Blue** (`#F8F9FC`): Subtle background for disabled or inactive states
- **Pale Green** (`#E3FAEE`): Success state background or confirmation contexts

### Surface & Borders
- **Translucent Glass** (`rgba(255, 255, 255, 0.01)`): Card and container background; ultra-subtle presence with transparency
- **Subtle Border** (`#B0C6E9`): Refined border color for cards and input fields; maintains visual hierarchy

### Semantic / Status
- **Warning** (`#FECA00`): Alert and warning states; draws attention without aggression
- **Warning Secondary** (`#F4A43A`): Secondary warning indicator or degraded states
- **Error / Danger** (`#FF1C11`): Critical errors and destructive actions; highest alert level
- **Error Secondary** (`#EB3441`): Secondary error states or related error information
- **Info Light** (`#FFF2D4`): Informational backgrounds or light notice containers

## 3. Typography Rules

### Font Family
- **Primary Display Font:** ivarTextFont (serif, for headings and prominent text)
- **UI/Body Font:** abcdFont (sans-serif, for interface text, buttons, and body copy)
- **Fallback Stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| **Display / H1** | ivarTextFont | 46px | 400 | 48px | 0px | Hero headlines and page titles |
| **Heading / H3** | abcdFont | 15px | 400 | 20px | 0px | Section headers and subheadings |
| **Body / Paragraph** | abcdFont | 20px | 400 | 26px | 0px | Main content, descriptions, body text |
| **Button / CTA** | abcdFont | 14px | 450 | 20px | 0px | Primary and secondary button text |
| **Button Large** | abcdFont | 16px | 400 | 24px | 0px | Large primary buttons and prominent CTAs |
| **Link / Navigation** | abcdFont | 16px | 400 | 24px | 0px | Hyperlinks and navigation text |
| **Link Small** | abcdFont | 14px | 450 | 20px | 0px | Inline links and supplementary navigation |
| **Input / Form** | abcdFont | 15px | 400 | 24px | 0px | Form fields, input placeholders, and labels |
| **Caption / Meta** | abcdFont | 12px | 400 | 16px | 0px | Helper text, timestamps, and metadata |

### Principles
- **Hierarchy through size and weight:** Weight changes are subtle (400 to 450); size carries the load
- **Line height generosity:** Maintains readability and breathing room, especially in body copy
- **Serif for emphasis:** ivarTextFont reserves used sparingly for maximum impact and formality
- **Sans-serif utility:** abcdFont dominates UI for clarity and modern aesthetic
- **Consistency:** All interactive text uses precise size/weight combinations for predictability
- **Accessibility:** Minimum `14px` for interactive elements; sufficient contrast with all backgrounds

## 4. Component Stylings

### Buttons

**Primary CTA Button**
- Background: `#D0F100`
- Text Color: `#1B2540`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `abcdFont`
- Padding: `0px 24px`
- Height: `44px`
- Border Radius: `3.35544e+07px` (fully rounded pill)
- Border: `0px solid`
- Box Shadow: `rgba(255, 255, 255, 0.08) 0px 0px 16px 8px inset, rgba(255, 255, 255, 0.08) 0px 0px 8px 4px inset, rgba(255, 255, 255, 0.08) 0px 0px 4px 2px inset, rgba(255, 255, 255, 0.12) 0px 0px 2px 1px inset`
- Line Height: `24px`
- Hover State: Opacity increase to 0.9; subtle brightness lift
- Active State: Opacity decrease to 0.85; press-down effect

**Secondary Button (Dark)**
- Background: `#001033`
- Text Color: `#FAFEFF`
- Font Size: `15px`
- Font Weight: `450`
- Font Family: `abcdFont`
- Padding: `12px 24px`
- Height: `auto`
- Border Radius: `3.35544e+07px`
- Border: `0px solid`
- Box Shadow: `rgba(24, 37, 66, 0.32) 0px 1px 3px 0px, rgba(24, 37, 66, 0.12) 0px 0.5px 0.5px 0px, rgba(24, 37, 66, 0.44) 0px 12px 24px -12px, rgba(219, 247, 255, 0.06) 0px 8px 16px 0px inset, rgba(219, 247, 255, 0.48) 0px 0.5px 0.5px 0px inset, rgba(219, 247, 255, 0.04) 0px -4px 8px 0px inset, rgba(219, 247, 255, 0.24) 0px -0.5px 0.5px 0px inset`
- Line Height: `20px`
- Hover State: Increase shadow intensity; slight background lift
- Active State: Reduce shadow; press-down visual feedback

**Ghost Button (Text Link)**
- Background: `rgba(0, 0, 0, 0)`
- Text Color: `#FAFEFF`
- Font Size: `14px`
- Font Weight: `450`
- Font Family: `abcdFont`
- Padding: `0px 12px` or `0px 13px`
- Height: `28px`
- Border Radius: `3.35544e+07px`
- Border: `0px solid`
- Box Shadow: `none`
- Line Height: `20px`
- Hover State: Background color `rgba(250, 254, 255, 0.1)`; underline appears
- Active State: Background `rgba(250, 254, 255, 0.15)`

### Cards & Containers

**Light Glass Card (Small)**
- Background: `rgba(255, 255, 255, 0.01)`
- Text Color: `#1B2540`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `abcdFont`
- Padding: `10px 18px`
- Border Radius: `16px`
- Border: `0px solid`
- Box Shadow: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 39, 80, 0.03) 0px 56px 72px -16px, rgba(0, 39, 80, 0.03) 0px 32px 32px -16px, rgba(0, 39, 80, 0.04) 0px 6px 12px -3px, rgba(0, 39, 80, 0.04) 0px 0px 0px 1px`
- Line Height: `24px`

**Light Glass Card (Medium)**
- Background: `rgba(255, 255, 255, 0.01)`
- Text Color: `#1B2540`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `abcdFont`
- Padding: `10px 18px`
- Border Radius: `16px`
- Border: `0px solid`
- Box Shadow: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 39, 80, 0.03) 0px 56px 72px -16px, rgba(0, 39, 80, 0.03) 0px 32px 32px -16px, rgba(0, 39, 80, 0.04) 0px 6px 12px -3px, rgba(0, 39, 80, 0.04) 0px 0px 0px 1px`
- Line Height: `24px`

**Minimal Container (Large)**
- Background: `rgba(255, 255, 255, 0.01)`
- Text Color: `#1B2540`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `abcdFont`
- Padding: `0px`
- Border Radius: `20px`
- Border: `0px solid`
- Box Shadow: `none`
- Line Height: `24px`

### Inputs & Forms

**Text Input / Form Field**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `#1B2540`
- Font Size: `15px`
- Font Weight: `400`
- Font Family: `abcdFont`
- Padding: `15px 20px`
- Height: `54px`
- Border Radius: `0px`
- Border: `0px solid` (rely on box-shadow for visual definition)
- Box Shadow: `none` or subtle inset for focus state
- Line Height: `24px`
- Focus State: Box shadow `inset 0px 0px 0px 1px #B0C6E9`; background shift to `rgba(255, 255, 255, 0.02)`
- Disabled State: Opacity `0.6`; text color `#B0C6E9`
- Placeholder: Color `#B0C6E9`; opacity `0.7`

### Navigation

**Navigation Link (Text)**
- Background: `rgba(0, 0, 0, 0)`
- Text Color: `#1B2540`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `abcdFont`
- Padding: `0px`
- Border Radius: `0px`
- Border: `0px solid`
- Box Shadow: `none`
- Line Height: `24px`
- Hover State: Text color shifts to `#005BF6`; underline appears
- Active State: Text color `#005BF6`; underline persistent

**Navigation Link (Button Style)**
- Background: `rgba(0, 0, 0, 0)`
- Text Color: `#FAFEFF`
- Font Size: `14px`
- Font Weight: `450`
- Font Family: `abcdFont`
- Padding: `0px 12px`
- Height: `28px`
- Border Radius: `3.35544e+07px`
- Border: `0px solid`
- Box Shadow: `none`
- Line Height: `20px`
- Hover State: Background `rgba(250, 254, 255, 0.1)`

### Badges & Status Tags

**Warning Badge**
- Background: `#FECA00`
- Text Color: `#1B2540`
- Font Size: `12px`
- Font Weight: `500`
- Font Family: `abcdFont`
- Padding: `4px 12px`
- Border Radius: `16px`
- Border: `0px solid`
- Box Shadow: `none`
- Line Height: `16px`

**Error Badge**
- Background: `#FF1C11`
- Text Color: `#FFFFFF`
- Font Size: `12px`
- Font Weight: `500`
- Font Family: `abcdFont`
- Padding: `4px 12px`
- Border Radius: `16px`
- Border: `0px solid`
- Box Shadow: `none`
- Line Height: `16px`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Spacing Scale:**
- `4px` – Micro padding, tight component internal spacing
- `8px` – Small gap between sibling elements
- `12px` – Standard gap, default padding increment
- `16px` – Default padding, primary internal spacing
- `20px` – Generous padding, content containers
- `24px` – Large padding, section separation
- `28px` – Extra-large padding, major section division
- `32px` – Margin between major content blocks
- `36px` – Large margin for distinct sections
- `44px` – Extra-large padding for hero areas and large buttons
- `52px` – Margin between page sections
- `56px` – Maximum margin for vertical section separation

**Usage Context:**
- Components use `12px`–`24px` padding
- Sections use `32px`–`56px` margin
- Button internal spacing uses `12px`–`24px`
- Card padding ranges `10px`–`20px` depending on density

### Grid & Container

**Max Width:** `1200px` (standard desktop container)

**Column Strategy:**
- Desktop: 12-column flexible grid with `24px` gutter
- Tablet: 8-column grid with `16px` gutter
- Mobile: Single-column layout with `16px` safe margin

**Section Patterns:**
- Hero sections: Full-width with centered container, `44px`–`56px` vertical padding
- Content sections: Constrained width (max `1200px`), horizontal padding `24px`–`40px`
- Sidebar layouts: 70/30 or 60/40 splits with `24px` gap
- Card grids: 3-column desktop, 2-column tablet, 1-column mobile, `24px` gap between cards

### Whitespace Philosophy

Antimetal embraces generous, purposeful whitespace to convey clarity and sophistication. Negative space is treated as an active design element rather than wasted area. Content breathes, reducing cognitive load and emphasizing critical information. Sections are separated by substantial vertical gaps (`32px`–`56px`) rather than visual dividers, creating a flowing, hierarchical reading experience. Internal component whitespace (`16px`–`24px` padding) ensures text and elements never feel cramped, supporting readability and accessibility.

### Border Radius Scale

- `0px` – Sharp corners for input fields and minimal forms
- `4px` – Slight rounding for subtle UI elements and tight components
- `16px` – Standard card and container rounding; soft but professional
- `20px` – Larger containers and feature cards; increased warmth
- `28px` – Extra-large radius for full-height or expansive components
- `3.35544e+07px` – Fully rounded pill buttons; used exclusively for all button styles

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| **None** | No shadow; `box-shadow: none` | Flat UI elements, disabled states, minimal containers |
| **Small (Subtle)** | `rgba(0, 39, 80, 0.03) 0px 56px 72px -16px, rgba(0, 39, 80, 0.03) 0px 32px 32px -16px, rgba(0, 39, 80, 0.04) 0px 6px 12px -3px, rgba(0, 39, 80, 0.04) 0px 0px 0px 1px` | Cards, light containers; minimal elevation for visual hierarchy |
| **Medium** | `rgba(0, 39, 80, 0.08) 0px 6px 16px -3px, rgba(0, 39, 80, 0.04) 0px 0px 0px 1px` | Card hover states, elevated surfaces |
| **Large (Interactive)** | `rgba(24, 37, 66, 0.32) 0px 1px 3px 0px, rgba(24, 37, 66, 0.12) 0px 0.5px 0.5px 0px, rgba(24, 37, 66, 0.44) 0px 12px 24px -12px, rgba(219, 247, 255, 0.06) 0px 8px 16px 0px inset, rgba(219, 247, 255, 0.48) 0px 0.5px 0.5px 0px inset, rgba(219, 247, 255, 0.04) 0px -4px 8px 0px inset, rgba(219, 247, 255, 0.24) 0px -0.5px 0.5px 0px inset` | Secondary buttons, interactive surfaces with depth feedback |
| **Extra Large (Prominent)** | `rgba(255, 255, 255, 0.08) 0px 0px 16px 8px inset, rgba(255, 255, 255, 0.08) 0px 0px 8px 4px inset, rgba(255, 255, 255, 0.08) 0px 0px 4px 2px inset, rgba(255, 255, 255, 0.12) 0px 0px 2px 1px inset` | Primary CTA buttons, hero elements; maximum depth and prominence |

**Shadow Philosophy:**

Shadows are used sparingly and deliberately to create layered depth without visual clutter. Rather than relying solely on offset shadows, Antimetal employs multi-layer shadow compositions with inset highlights and subtle borders to create sophisticated depth perception. The large elevation shadows include inset light highlights, mimicking subtle rim lighting that suggests the surface is active and pressable. This creates a tactile quality while maintaining the clean, minimal aesthetic. Shadows are always cool-toned (dark navy) or warm-tinted (light inset), never pure black, preserving the design's professional warmth.

## 7. Do's and Don'ts

### Do
- **Use lime green (`#D0F100`) for all primary CTAs** – This is the conversion color; make it impossible to miss
- **Maintain at least `16px` padding inside cards and containers** – Breathing room supports legibility and perceived quality
- **Apply multi-layer shadows** – Combine offset, inset, and border shadows for sophisticated depth; never use a single flat shadow
- **Keep button text at `14px`–`16px` with weight `400`–`450`** – This balance ensures clarity without overshadowing
- **Use off-white (`#FAFEFF`) for light text over dark backgrounds** – Pure white creates too much contrast and visual fatigue; off-white is sophisticated
- **Embrace negative space between sections** – Use `32px`–`56px` margins to separate content meaningfully
- **Test all interactive states** – Hover, active, focus, and disabled states must have distinct visual feedback
- **Apply the full shadow stack on interactive elements** – Multi-layer shadows signal clickability and depth
- **Use `16px` or `20px` border radius for cards** – Maintain the soft-professional aesthetic across containers

### Don't
- **Don't use pure black backgrounds** – Always use `#1B2540` or `#0C264D` for the deep navy foundation
- **Don't mix serif and sans-serif fonts in buttons or navigation** – Reserve ivarTextFont for display-level headings only
- **Don't apply transparency to interactive elements unnecessarily** – Use solid colors for buttons and form fields; transparency is reserved for backgrounds
- **Don't create shadows with pure black (`#000000`)** – Shadows are always dark navy (`rgba(24, 37, 66, ...)`) or light inset tints
- **Don't use the lime green for text on light backgrounds** – It lacks sufficient contrast; reserve it for backgrounds and buttons on dark/medium backgrounds
- **Don't compress padding below `12px` inside components** – Visual density suffers and legibility decreases
- **Don't use border radius under `16px` for cards** – Sharpness undermines the refined aesthetic
- **Don't exceed two distinct font weights in UI text** – `400` and `450` provide sufficient hierarchy; going heavier (e.g., `600`) feels forced
- **Don't mix card elevation levels inconsistently** – All cards at the same prominence level should have matching shadow depth
- **Don't reduce line height below `20px` for buttons** or `24px` for body text – Readability and accessibility require generous leading

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| **Mobile (XS)** | `320px–575px` | Single-column layout, `16px` safe margins, full-width cards, stacked buttons, reduced heading sizes (36px–40px for H1) |
| **Tablet (SM)** | `576px–767px` | Two-column grid for cards, 8-column layout, `16px`–`20px` padding, stacked navigation, body font remains `20px` |
| **Tablet (MD)** | `768px–991px` | Two-column cards grid, hybrid navigation (sidebar + top nav), `24px` section padding, heading sizes increase slightly |
| **Desktop (LG)** | `992px–1199px` | Three-column card grid, full horizontal navigation, `24px`–`32px` section padding, full `46px` H1 headings, container max-width `1000px` |
| **Desktop (XL)** | `1200px+` | Full 12-column grid, unrestricted layout, `40px`–`56px` section margins, container max-width `1200px` |

### Touch Targets

- **Minimum Interactive Size:** `44px × 44px` (buttons, links, icons)
- **Button Padding:** `12px 24px` minimum (height `44px`); smaller buttons (`28px` height) acceptable for secondary actions but not primary CTAs
- **Input Field Height:** `54px` minimum for mobile accessibility
- **Link Tap Area:** `44px` vertical spacing between separate links
- **Icon Target Area:** `40px × 40px` for icon-only buttons; `32px × 32px` acceptable for grouped icon sets with `12px` spacing

### Collapsing Strategy

**Typography Scaling:**
- H1 (Display): `46px` (desktop) → `36px` (tablet) → `32px` (mobile)
- H3 (Heading): `15px` (desktop) → `14px` (tablet/mobile)
- Body: `20px` (desktop) → `18px` (tablet) → `16px` (mobile)
- Button text: `14px`–`16px` (all breakpoints; font size remains stable)

**Spacing Compression:**
- Section margin: `56px` (XL) → `36px` (LG) → `28px` (MD) → `20px` (SM) → `16px` (XS)
- Card padding: `18px` (desktop) → `14px` (tablet) → `12px` (mobile)
- Button padding: `24px` horizontal (desktop) → `16px` (tablet) → `12px` (mobile)

**Layout Shifts:**
- Desktop: 3-column card grid → Tablet: 2-column → Mobile: single column (stacked)
- Navigation: Horizontal (desktop/tablet) → Hamburger menu (mobile with drawer)
- Hero section: Dual-column with image (desktop) → Single column, centered text (tablet) → Single column, stacked (mobile)
- Forms: Multi-column layouts (desktop) → Two-column (tablet) → Single column (mobile)

**Gesture & Interaction:**
- Hover states disabled on touch devices; focus states manage all interactive feedback
- Buttons increase hit area from `44px` to `52px` on mobile for easier tapping
- Modal drawers slide from bottom on mobile instead of centering
- Tooltips become tappable popovers on mobile to avoid accidental triggers

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Lime Green (`#D0F100`)
- **Primary Background:** Deep Navy (`#1B2540`)
- **Secondary Background:** Darker Navy (`#0C264D`)
- **Light Text:** Off-White (`#FAFEFF`)
- **Secondary Button:** Dark Navy (`#001033`)
- **Secondary Text:** Off-White (`#FAFEFF`)
- **Accent Link:** Bright Blue (`#005BF6`)
- **Warning State:** Golden Yellow (`#FECA00`)
- **Error State:** Red (`#FF1C11`)
- **Card Background:** Translucent (`rgba(255, 255, 255, 0.01)`)
- **Border/Input:** Pale Blue (`#B0C6E9`)

### Iteration Guide

1. **All primary buttons must use `#D0F100` background with `#1B2540` text, `44px` height, fully rounded (`border-radius: 3.35544e+07px`), and the extra-large inset shadow stack for depth.**

2. **Typography hierarchy uses only two font families: ivarTextFont for display headings (`46px`, weight `400`) and abcdFont for all UI, body, and interactive text; never reverse or mix these roles.**

3. **Cards always have `rgba(255, 255, 255, 0.01)` background, `16px` or `20px` border radius, and the subtle multi-layer shadow stack (`rgba(0, 39, 80, 0.03)` outer layers with `0px 0px 0px 1px` border definition).**

4. **Navigation and secondary buttons use `#001033` background (or transparent ghost style) with `#FAFEFF` text, rounded pill shape, and the large interactive shadow for secondary button states.**

5. **All body text is `20px` with line-height `26px` on desktop; scale to `18px` / `24px` on tablet and `16px` / `22px` on mobile to maintain readable proportions.**

6. **Section spacing follows the scale: `32px` margin (small sections), `44px` (medium), `56px` (large sections); compress by 30% on tablet and 50% on mobile.**

7. **Input fields are `54px` height with `15px 20px` padding, transparent background, no visible border (rely on focus state shadow), and placeholder text in `#B0C6E9`.**

8. **Warning badges use `#FECA00` background with `#1B2540` text; error badges use `#FF1C11` with white text; both have `4px 12px` padding and `16px` border radius.**

9. **All shadows are cool-toned (dark navy or inset light); never use pure black; multi-layer shadows always include at least three shadow planes (outer glow, mid-depth, inset highlight).**

10. **Responsive breakpoints: 12-column desktop (1200px+), 8-column tablet (768px–1199px), single-column mobile (320px–767px); all padding, margins, and font sizes adjust proportionally at each breakpoint.**