# The Joxel Group — Premium Website Redesign

A complete visual + UX redesign of **thejoxelgroup.com** into a modern, premium,
soft‑tone corporate website. **Every piece of original text, caption, heading and
description is preserved verbatim** — only the layout, structure, styling, motion,
responsiveness and information architecture were reimagined.

## What's inside

```
build/                 ← the finished website (deploy this folder)
  *.html               ← 24 fully‑designed pages
  assets/css/style.css ← design system
  assets/js/main.js    ← interactions
  assets/img/          ← all brand imagery (logos, photos, icons)
  sitemap.xml, robots.txt

src/                   ← editable source for CSS + JS
tools/                 ← Node build pipeline
  extract*.mjs         ← scraped the original site → content/*.json (exact text)
  lib.mjs              ← nav, layout, header/footer, icon set
  build.mjs            ← generates build/ from content + design system
  serve.mjs            ← tiny local static server
content/               ← exact extracted content (source of truth for wording)
raw/                   ← original page HTML captured for reference
assets/img/            ← master copy of downloaded brand assets
```

## Preview locally

```bash
node tools/serve.mjs 8099
# open http://localhost:8099
```

## Rebuild after editing `src/` or `content/`

```bash
npm install          # first time only (installs cheerio, used by extractors)
node tools/build.mjs # regenerates the build/ folder
```

## Deploy

The site is 100% static — upload the **`build/`** folder to any host
(Netlify, Vercel, S3/CloudFront, Apache/Nginx, GitHub Pages, cPanel, etc.).
No server or database required.

## Design system

- **Palette** — sage `#6B8A7A`, dusty blue `#7DA0B6`, warm bronze `#A67C52`,
  soft beige `#F2EDE3`, sage surface `#DCE3DD`, ink `#4A5560` / `#6B7280`.
  No pure black, pure white, navy or harsh contrast.
- **Typography** — *Fraunces* (elegant serif display) + *Inter* (clean UI sans).
- **Depth** — layered soft shadows, frosted glass cards, subtle gradient blobs.
- **Motion** — scroll‑reveal, hover lifts, floating chips, count‑ups, parallax,
  animated marquee, premium preloader — all respect `prefers-reduced-motion`.
- **Responsive** — mobile‑first; sticky translucent nav with mega‑dropdowns on
  desktop and a full‑height drawer on mobile.
- **SEO / a11y** — per‑page titles + meta descriptions, canonical + Open Graph,
  Organization JSON‑LD, sitemap/robots, single `<h1>` per page, alt text on every
  image, labelled form fields, keyboard‑focusable UI.

## Pages (all preserved from the original)

Home · Healthcare Consulting (EHR Selection, EHR Implementations, EHR Optimization,
Avatar Consulting, Evolv Consulting, Project Management) · Strategic Consulting
(Office of the CIO, Revenue Cycle Management) · Strategic Services (Custom Solutions,
EHR Configuration, Outsourcing Support) · Blog · About Us (Our Leaders, Joxel 365,
Contact Us, Client Testimonials, Partnerships) · Terms of Use · Privacy Policy.

> The contact form composes an email to `info@thejoxelgroup.com` (no backend
> required). Individual blog posts and team bios link to the corresponding pages on
> the live site, since those detail pages were outside the redesign scope.
