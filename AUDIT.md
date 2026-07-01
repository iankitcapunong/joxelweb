# Website Audit — The Joxel Group Redesign

_Scope: 32 static pages in `build/`. Date: 2026-07-01._

## Scorecard

| Area | Status | Notes |
|------|--------|-------|
| Content fidelity | ✅ Pass | All original text preserved verbatim; spot‑checked exact phrases across pages. |
| SEO | ✅ Good | 32/32 pages have `<title>`, meta description, canonical, Open Graph. Sitemap + robots present. |
| Accessibility | ✅ Good | One `<h1>` per page, `alt` on all 217 images, labelled form fields, `lang="en"`, focus states, `prefers-reduced-motion`. |
| Responsive | ✅ Pass | Verified desktop / tablet / mobile; sticky nav + mobile drawer. |
| Code / build | ✅ Clean | CSS 42.6 KB, JS 6.2 KB (no framework). Reproducible Node build. |
| Performance | ⚠️ Improve | Images total 5.8 MB; a few are heavy (see below). |
| Links | ✅ Pass | 0 broken internal links; leader bios now internal. |

## Priority fixes

1. **Compress images (biggest win).** Heaviest: `Hutton-Susan.jpg` 922 KB, `PEOPLE.jpg` 669 KB, `Mica.png` 642 KB, `Strategic_Consulting_B.jpg` 637 KB. Re‑export to WebP/optimized JPG → ~5.8 MB could drop to ~1 MB.
2. **Add explicit `width`/`height`** on content images to prevent layout shift (CLS).
3. **Per‑page JSON‑LD** — currently Organization schema only on home; add `Article` (blog) and `Person` (leaders) schema.
4. **Blog “Read More”** still links to the live site (post detail pages were out of scope) — build them internally for a fully self‑contained site.
5. **Contact form** is front‑end only (opens email client); wire to a backend/service (Formspree, Netlify Forms) for real submissions.

## Verdict
Production‑ready as a static marketing site. Only image optimization is recommended before launch; everything else is polish.
