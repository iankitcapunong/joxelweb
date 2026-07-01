/* Shared site config, layout, partials, icons */

export const COMPANY = {
  name: 'The Joxel Group, LLC',
  short: 'The Joxel Group',
  addressLines: ['6737 W. Washington St., Suite 3470', 'West Allis, WI 53214'],
  address: '6737 W. Washington St., Suite 3470 West Allis, WI 53214',
  phone: '(414) 800-4242',
  phoneHref: '+14148004242',
  email: 'info@thejoxelgroup.com',
  founded: '2006',
};

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/thejoxelgroupllc/',
  facebook: 'https://www.facebook.com/TheJoxelGroup/',
  twitter: 'https://twitter.com/TheJoxelGroup',
};

/* Navigation structure. href values are page slugs (no extension). */
export const NAV = [
  { label: 'Home', slug: 'index' },
  {
    label: 'Healthcare Consulting', slug: 'healthcare-consulting',
    children: [
      { label: 'EHR Selection', slug: 'ehr-selection' },
      { label: 'EHR Implementations', slug: 'ehr-implementations' },
      { label: 'EHR Optimization', slug: 'ehr-optimization' },
      { label: 'Avatar Consulting', slug: 'avatar-consulting' },
      { label: 'Evolv Consulting', slug: 'evolv-consulting' },
      { label: 'Project Management', slug: 'project-management' },
    ],
  },
  {
    label: 'Strategic Consulting', slug: 'strategic-consulting',
    children: [
      { label: 'Office of the CIO', slug: 'office-of-the-cio' },
      { label: 'Revenue Cycle Management', slug: 'revenue-cycle-management' },
    ],
  },
  {
    label: 'Strategic Services', slug: 'strategic-services',
    children: [
      { label: 'Custom Solutions', slug: 'custom-solutions' },
      { label: 'EHR Configuration', slug: 'emr-configuration' },
      { label: 'Outsourcing Support', slug: 'outsourcing-support' },
    ],
  },
  { label: 'Locations', slug: 'locations' },
  { label: 'Blog', slug: 'blog' },
  {
    label: 'About Us', slug: 'about-us',
    children: [
      { label: 'Our Leaders', slug: 'our-leaders' },
      { label: 'Joxel 365', slug: 'joxel-365' },
      { label: 'Contact Us', slug: 'contact-us' },
      { label: 'Client Testimonials', slug: 'client-testimonials' },
      { label: 'Partnerships', slug: 'partnerships' },
    ],
  },
];

export const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* link to a page slug (flat .html output) */
export const url = slug => slug === 'index' ? 'index.html' : slug + '.html';

/* ---------- Icons (24x24 stroke) ---------- */
const P = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  arrowUp: '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z"/>',
  pulse: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2z"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 8a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 3.6h.1A1.7 1.7 0 0 0 11 2.1V2a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 17 3.6a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.9.7-2.2-.1-3a2.1 2.1 0 0 0-2.9 0z"/><path d="M12 15 9 12a11 11 0 0 1 6-9 11 11 0 0 1 4 4 11 11 0 0 1-9 6z"/><path d="M9 12H4l4-4h3M12 15v5l4-4v-3"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 3-4 3 3 4-6"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4L15 9"/><path d="m9 15-3-3 4.5-4.5a2 2 0 0 1 2.8 0L15 9"/><path d="M3 12 8 7M16 10l5 5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z"/>',
  quote: '<path d="M7 7h4v6a4 4 0 0 1-4 4M13 7h4v6a4 4 0 0 1-4 4"/>',
  brain: '<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 5 2V4a2 2 0 0 0-1-1z"/><path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-5 2"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v7M10 10.5V6a2 2 0 0 0-4 0v8a6 6 0 0 0 6 6h1a6 6 0 0 0 6-6v-3a2 2 0 0 0-4 0"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 8-11 16-11 0 8-5 16-9 16z"/><path d="M4 20c2-4 6-7 10-8"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2a4 4 0 0 1 2-2z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  twitter: '<path d="M23 4.5a8.4 8.4 0 0 1-2.4.7A4.2 4.2 0 0 0 22.4 3a8.3 8.3 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.8A11.7 11.7 0 0 1 3 3.7a4.1 4.1 0 0 0 1.3 5.5A4 4 0 0 1 2.4 8.7a4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 1 17.5a11.7 11.7 0 0 0 18-9.9c.8-.6 1.5-1.3 2-2.1z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M19 3v18"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  scale: '<path d="M12 3v18M7 21h10M5 7l-3 6a4 4 0 0 0 6 0L5 7zm14 0-3 6a4 4 0 0 0 6 0l-3-6zM5 7h14"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  flag: '<path d="M4 22V4s2-1 5-1 4 2 7 2 4-1 4-1v10s-1 1-4 1-4-2-7-2-5 1-5 1"/>',
};

export function icon(name, cls = 'ico') {
  const d = P[name] || P.sparkle;
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
}

/* ---------- Header ---------- */
export function header(active) {
  const items = NAV.map(item => {
    const isActive = active === item.slug || (item.children && item.children.some(c => c.slug === active));
    if (item.children) {
      const sub = item.children.map(c =>
        `<a href="${url(c.slug)}"><span class="dot"></span>${esc(c.label)}</a>`).join('');
      return `<li class="nav-item">
        <a class="nav-link${isActive ? ' active' : ''}" href="${url(item.slug)}">${esc(item.label)}${icon('chevron', 'caret')}</a>
        <div class="dropdown">${sub}</div>
      </li>`;
    }
    return `<li class="nav-item"><a class="nav-link${isActive ? ' active' : ''}" href="${url(item.slug)}">${esc(item.label)}</a></li>`;
  }).join('');

  return `
<div class="topbar">
  <div class="container">
    <div class="tb-left">
      <a href="tel:${COMPANY.phoneHref}">${icon('phone')}${COMPANY.phone}</a>
      <a href="mailto:${COMPANY.email}">${icon('mail')}${COMPANY.email}</a>
    </div>
    <div class="tb-right">
      <a href="${SOCIAL.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon('linkedin')}</a>
      <a href="${SOCIAL.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
      <a href="${SOCIAL.twitter}" target="_blank" rel="noopener" aria-label="Twitter">${icon('twitter')}</a>
    </div>
  </div>
</div>
<header class="site-header">
  <div class="container wide">
    <nav class="nav" aria-label="Primary">
      <a class="brand" href="index.html" aria-label="${esc(COMPANY.name)} home">
        <img src="assets/img/joxel_logo_rgb_transparent_lowres-1.png" alt="${esc(COMPANY.name)} logo" width="140" height="42">
      </a>
      <ul class="nav-menu">${items}</ul>
      <div class="nav-cta">
        <a class="btn" href="${url('contact-us')}">Get in Touch ${icon('arrow')}</a>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileDrawer">
          <span class="hamburger"><span></span><span></span><span></span></span>
        </button>
      </div>
    </nav>
  </div>
</header>`;
}

/* ---------- Mobile drawer ---------- */
export function drawer() {
  const groups = NAV.map(item => {
    if (item.children) {
      const sub = item.children.map(c => `<a href="${url(c.slug)}">${esc(c.label)}</a>`).join('');
      return `<div class="m-group">
        <button class="m-top">${esc(item.label)}${icon('chevron', 'caret')}</button>
        <div class="m-sub"><a href="${url(item.slug)}">${esc(item.label)} Overview</a>${sub}</div>
      </div>`;
    }
    return `<div class="m-group"><a class="m-top" href="${url(item.slug)}" style="justify-content:flex-start">${esc(item.label)}</a></div>`;
  }).join('');

  return `
<div class="drawer-backdrop"></div>
<aside class="mobile-drawer" id="mobileDrawer" aria-label="Mobile menu">
  <div class="drawer-head">
    <img src="assets/img/joxel_logo_rgb_transparent_lowres-1.png" alt="${esc(COMPANY.name)}" style="height:38px">
    <button class="drawer-close nav-toggle" aria-label="Close menu"><span class="hamburger"><span></span><span></span><span></span></span></button>
  </div>
  <nav class="drawer-nav" aria-label="Mobile primary">${groups}</nav>
  <div class="drawer-foot">
    <a class="btn block" href="${url('contact-us')}">Get in Touch ${icon('arrow')}</a>
    <div style="margin-top:1.1rem;display:flex;flex-direction:column;gap:.5rem;font-size:.9rem;color:var(--ink-2)">
      <a href="tel:${COMPANY.phoneHref}" style="display:flex;gap:.5rem;align-items:center">${icon('phone')}${COMPANY.phone}</a>
      <a href="mailto:${COMPANY.email}" style="display:flex;gap:.5rem;align-items:center">${icon('mail')}${COMPANY.email}</a>
    </div>
  </div>
</aside>`;
}

/* ---------- Footer ---------- */
export function footer() {
  const col = (title, links) =>
    `<div class="footer-col"><h5>${title}</h5><ul>${links.map(l => `<li><a href="${url(l.slug)}">${esc(l.label)}</a></li>`).join('')}</ul></div>`;

  const services = [
    { label: 'EHR Consulting', slug: 'ehr-consulting' },
    { label: 'Revenue Cycle Management', slug: 'revenue-cycle-management' },
    { label: 'AI Strategy', slug: 'ai-strategy' },
    { label: 'Healthcare Consulting', slug: 'healthcare-consulting' },
    { label: 'Strategic Services', slug: 'strategic-services' },
    { label: 'Locations', slug: 'locations' },
  ];
  const company = [
    { label: 'About Us', slug: 'about-us' },
    { label: 'Our Leaders', slug: 'our-leaders' },
    { label: 'Joxel 365', slug: 'joxel-365' },
    { label: 'Client Testimonials', slug: 'client-testimonials' },
    { label: 'Partnerships', slug: 'partnerships' },
    { label: 'Blog', slug: 'blog' },
  ];

  return `
<footer class="site-footer">
  <div class="container wide">
    <div class="footer-main">
      <div class="footer-brand">
        <img src="assets/img/joxel_logo_rgb_transparent_lowres-1.png" alt="${esc(COMPANY.name)}">
        <p>A business consulting and development firm with expertise in the health care and pension industries — dedicated to innovate, improve and deliver high quality results.</p>
        <div class="footer-social">
          <a href="${SOCIAL.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon('linkedin')}</a>
          <a href="${SOCIAL.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
          <a href="${SOCIAL.twitter}" target="_blank" rel="noopener" aria-label="Twitter">${icon('twitter')}</a>
        </div>
      </div>
      ${col('Services', services)}
      ${col('Company', company)}
      <div class="footer-col">
        <h5>Get in Touch</h5>
        <ul class="footer-contact">
          <li>${icon('pin')}<span>${COMPANY.addressLines.join('<br>')}</span></li>
          <li>${icon('phone')}<a href="tel:${COMPANY.phoneHref}">${COMPANY.phone}</a></li>
          <li>${icon('mail')}<a href="mailto:${COMPANY.email}">${COMPANY.email}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© ${COMPANY.name}. All rights reserved.</div>
      <div class="footer-legal">
        <a href="${url('terms-of-use')}">Terms of Use</a>
        <a href="${url('privacy-policy')}">Privacy Policy</a>
      </div>
    </div>
  </div>
</footer>`;
}

/* ---------- Full page layout ---------- */
export function layout({ slug, title, desc, bodyClass = '', main, jsonld = '' }) {
  const active = slug;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#0E7C74">
<link rel="canonical" href="https://thejoxelgroup.com/${slug === 'index' ? '' : slug + '.html'}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:site_name" content="${esc(COMPANY.name)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon.ico" sizes="any">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
${jsonld ? `<script type="application/ld+json">${jsonld}</script>` : ''}
</head>
<body class="${bodyClass}">
<div class="preloader"><div class="pl-mark">Joxel<span class="pl-bar"></span></div></div>
<div class="scroll-progress"></div>
${header(active)}
${drawer()}
<main id="content" class="page-fade">
${main}
</main>
${footer()}
<a class="to-top" aria-label="Back to top">${icon('arrowUp')}</a>
<script src="assets/js/main.js" defer></script>
</body>
</html>`;
}
