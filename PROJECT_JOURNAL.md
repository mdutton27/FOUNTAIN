# Fountain X — Project Journal

## 2026-04-15

### FNT-44: Launch Fountain X (done)

Board requested two changes to launch the consulting company site:

1. **Logo update** — Task referenced `FountainLogo.png` but no PNG existed in repo. CTO team replaced text-based logo spans with SVG `<img>` tags across all 4 HTML pages (nav: `fountain-logo.svg`, footer: `fountain-logo-white.svg`). Commit `345da8d`.

2. **New services** — Added "Service Design" and "AI in Design" as full service detail blocks on `services.html` and preview cards on `index.html`, matching the established format and NZ English. Commit `51b17ed`.

**Subtasks:**
- FNT-45: Logo update → CTO → done
- FNT-46: Service sections → CTO → done

**Decision:** Used existing SVGs instead of the referenced PNG since no PNG was available. If the board provides a specific PNG later, the img src paths can be swapped.

---

## 2026-04-16

### FNT-49: Elevate site design — mouse effects, scroll animations, modern polish (done)

Board requested premium design elevation on a feature branch for review.

**Branch:** `feature/elevate-design` (commit `7f00138`) — NOT merged to main.

**Deliverables:**

1. **`js/animations.js`** (new file, vanilla JS, zero dependencies)
   - Scroll reveal system (`.reveal` + IntersectionObserver) — fade+slide-up on entry
   - Auto-stagger for all grid children (service cards, engagement cards, principles, values, expertise)
   - Timeline items slide in from left with stagger
   - Experience logos scale in with stagger
   - Hero parallax — content drifts subtly with cursor position
   - Magnetic CTA buttons — drift toward cursor on hover
   - Subtle 3D card tilt (rotateX/Y on mousemove)
   - Animated section title underline draws on scroll entry
   - `prefers-reduced-motion` respected throughout

2. **`css/styles.css`** additions (~270 lines appended)
   - `@keyframes`: fadeInUp, fadeInLeft, scaleIn, drawLine, floatY, shimmer, pulse-ring
   - Floating orb decorations on hero and page-hero (CSS pseudo-elements)
   - Service card left accent gradient line + icon colour flip + rotate on hover
   - Button shimmer sweep on hover; magnetic lift via JS
   - Pulse ring on CTA section primary button
   - Animated nav link underlines (slide in/out)
   - Footer link hover shift; form field micro-lift on focus
   - Enhanced `.header.is-scrolled` shadow

3. **All 4 HTML pages** updated to load `js/animations.js` after `main.js`

**Decision:** Kept dependencies at zero — no AOS/GSAP. All effects via vanilla IntersectionObserver + CSS transitions + requestAnimationFrame. Board to review branch and decide merge vs revert.

### FNT-47: Update logo to FountainLogo.png (done)

Board provided actual `FountainLogo.png` via attachment. Downloaded to repo, replaced SVG references across all 4 pages. Footer uses CSS brightness/invert filter for dark background. Commit `246d568`.

### FNT-50: Fix Fountain Design (done)

Board reviewed the elevated design and provided detailed feedback via screenshots.

**FNT-51: Implement board design feedback (done)** — Commit `d842e10`:
- Experience logos: swapped Ministry of Education → ACC, CreativeNZ, NZTA; removed button hover on logos
- Button effects: removed magnetic movement, slowed shimmer to 3s auto-repeat on all CTAs
- Service icon: replaced problematic sun/brightness icon
- Section underline: extended across full "How We Can Help" heading
- Hero/About layout: centered content for wide screens
- Footer: fixed branding to "FOUNTAIN X" with "INNOVATION, EXPERIENCE, & RESEARCH CONSULTANTS", updated email to Hello@fntn.co.nz, phone to +64 28 8515 1882, fixed copyright line
- Removed "User Research Consultant" references

Feature branch merged to main after all fixes.

### FNT-44: Board approved merge + new service request (in_progress)

Board approved the elevated design for main. Requested one final addition before deployment:
- **FNT-52**: Add "Product Management" service — validate product roadmaps with end users, Kano/MoSCoW prioritisation methodologies. Assigned to CTO.

Once FNT-52 lands, deploy to production.
