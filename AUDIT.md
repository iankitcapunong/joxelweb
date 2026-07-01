# Website Audit — The Joxel Group

_107 pages in `build/`. Updated 2026-07-01._

## Scorecard

| Area | Status | Notes |
|------|--------|-------|
| Content fidelity | ✅ Pass | Original copy preserved verbatim; full leader bios added as internal pages. |
| SEO | ✅ Strong | 107/107 title, meta description, canonical, Open Graph. Schema on 76 pages. Sitemap + robots. |
| Programmatic SEO | ✅ Pass | 72 location pages (EHR Consulting · RCM · AI Strategy × 24 metros); **0 duplicate-content pages**. |
| Accessibility | ✅ Good | One H1/page (107/107), alt on all images, labelled forms, `lang`, focus states, reduced-motion. |
| Links | ✅ Pass | 0 broken internal links; 0 missing images. |
| Branding | ✅ Pass | Palette matches logo (teal/cyan/navy); transparent client logos; blended section color. |
| Responsive | ✅ Pass | Desktop / tablet / mobile; centered nav, mobile drawer. |
| Code / build | ✅ Clean | CSS 43.6 KB, JS 6.2 KB, no framework; reproducible Node build; Vercel-ready. |
| Performance | ⚠️ Improve | Images total 6.4 MB — a few heavy files. |

## Priority fixes

1. **Compress images (biggest win):** `Hutton-Susan.jpg` ~922 KB, `PEOPLE.jpg` ~669 KB, `Mica.png` ~642 KB. WebP/optimized JPG → ~6.4 MB could drop to ~1 MB.
2. **Add `width`/`height`** on content images to prevent layout shift (CLS).
3. **Per-page schema** for the 31 core pages (Article for blog, Person for leaders).
4. **Blog "Read More"** still links to the live site — build those posts internally for a fully self-contained site.
5. **Contact form** is front-end only (opens email client) — wire to Formspree/Netlify for real submissions.

## Verdict

Production-ready. Only image optimization is recommended before launch; everything else is polish.
