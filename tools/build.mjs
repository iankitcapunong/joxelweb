import fs from 'fs';
import path from 'path';
import { COMPANY, SOCIAL, NAV, esc, url, icon, layout } from './lib.mjs';
import { pseoBuild } from './pseo.mjs';

const ALL = JSON.parse(fs.readFileSync('content/_all.json', 'utf8'));
const DATA = JSON.parse(fs.readFileSync('content/data.json', 'utf8'));
const TEAM = JSON.parse(fs.readFileSync('content/team.json', 'utf8'));
const teamSlugByName = Object.fromEntries(TEAM.map(t => [t.name, t.slug]));
const leaderPageId = slug => 'leader-' + slug;
const OUT = 'build';

/* ---------- helpers ---------- */
const contentKey = slug => slug === 'index' ? 'home' : slug;
const blocksOf = slug => { const k = contentKey(slug); return ALL[k] ? ALL[k].blocks : []; };
const clip = (s, n = 155) => { s = (s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1).trim() + '…' : s; };

function firstPara(slug) {
  const b = blocksOf(slug).find(x => x.type === 'p');
  return b ? b.text : '';
}
function pageTitle(name) { return `${name} — ${COMPANY.name}`; }

function parentOf(slug) {
  for (const item of NAV) if (item.children && item.children.some(c => c.slug === slug)) return item;
  return null;
}
function breadcrumb(slug, label) {
  const parent = parentOf(slug);
  let html = `<a href="${url('index')}">Home</a><span class="sep">/</span>`;
  if (parent) html += `<a href="${url(parent.slug)}">${esc(parent.label)}</a><span class="sep">/</span>`;
  html += `<span class="current">${esc(label)}</span>`;
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">${html}</nav>`;
}

const ICON_FOR = {
  'healthcare-consulting': 'pulse', 'ehr-selection': 'target', 'ehr-implementations': 'layers',
  'ehr-optimization': 'chart', 'avatar-consulting': 'cpu', 'evolv-consulting': 'brain',
  'project-management': 'briefcase', 'strategic-consulting': 'compass', 'office-of-the-cio': 'shield',
  'revenue-cycle-management': 'chart', 'strategic-services': 'sparkle', 'custom-solutions': 'bulb',
  'emr-configuration': 'cog', 'outsourcing-support': 'users', 'partnerships': 'handshake',
  'about-us': 'heart', 'our-leaders': 'users', 'joxel-365': 'globe', 'client-testimonials': 'star',
  'contact-us': 'send', 'blog': 'book',
};
const iconFor = slug => ICON_FOR[slug] || 'sparkle';

/* ---------- reusable sections ---------- */
function banner(slug, label, lede) {
  return `
<section class="page-banner">
  <span class="blob sage" style="width:360px;height:360px;top:-140px;right:-60px"></span>
  <div class="container">
    ${breadcrumb(slug, label)}
    <h1 data-reveal>${esc(label)}</h1>
    ${lede ? `<p class="lede banner-lede" data-reveal data-delay="1">${esc(lede)}</p>` : ''}
  </div>
</section>`;
}

function ctaBand({ title = "Let's build something exceptional together.", text = 'Joxel offers experienced, expert assistance throughout every phase of your journey. Reach out to start the conversation.', primary = { label: 'Get in Touch', slug: 'contact-us' } } = {}) {
  return `
<section class="section cta-band">
  <div class="container">
    <div class="cta-inner" data-reveal>
      <span class="eyebrow center">Ideas · Insights · Solutions</span>
      <h2>${esc(title)}</h2>
      <p>${esc(text)}</p>
      <div class="cta-actions">
        <a class="btn light" href="${url(primary.slug)}">${esc(primary.label)} ${icon('arrow')}</a>
        <a class="btn ghost" href="tel:${COMPANY.phoneHref}" style="box-shadow:inset 0 0 0 1.5px rgba(251,248,241,.5);color:#fff">${icon('phone')} ${COMPANY.phone}</a>
      </div>
    </div>
  </div>
</section>`;
}

/* Render an ordered list of content blocks into premium prose + cards */
function renderBlocks(blocks, { checklistTitleFromPara = true } = {}) {
  let html = '';
  let i = 0;
  let stepCount = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.type === 'h1') { i++; continue; }
    if (b.type === 'p') {
      // gather following list into a titled block
      html += `<p data-reveal>${esc(b.text)}</p>`;
      i++;
      continue;
    }
    if (b.type === 'list') {
      const cls = b.items.length > 5 ? 'check-list two' : 'check-list';
      html += `<div class="soft-card" data-reveal><ul class="${cls}">` +
        b.items.map(it => `<li><span class="tick">${icon('check')}</span><span>${esc(it)}</span></li>`).join('') +
        `</ul></div>`;
      i++;
      continue;
    }
    if (b.type === 'h2' || b.type === 'h3') {
      stepCount++;
      html += `<h2 class="subhead" data-reveal>${esc(b.text)}</h2>`;
      i++;
      continue;
    }
    if (b.type === 'h4') { html += `<h3 class="subhead" data-reveal>${esc(b.text)}</h3>`; i++; continue; }
    if (b.type === 'button') { html += `<p data-reveal><a class="link-arrow" href="${b.href}" target="_blank" rel="noopener">${esc(b.text)} ${icon('arrow')}</a></p>`; i++; continue; }
    if (b.type === 'img') { i++; continue; }
    i++;
  }
  return html;
}

/* sidebar for service pages */
function serviceSidebar(slug) {
  const parent = parentOf(slug);
  let siblings = '';
  if (parent) {
    siblings = `<div class="widget" data-reveal data-delay="1">
      <h4>${esc(parent.label)}</h4>
      <ul>${parent.children.map(c => `<li><a href="${url(c.slug)}" ${c.slug === slug ? 'style="color:var(--sage-deep);font-weight:600"' : ''}>${esc(c.label)} ${c.slug === slug ? '' : icon('arrow')}</a></li>`).join('')}</ul>
    </div>`;
  }
  return `
<aside class="sidebar">
  <div class="widget" data-reveal style="background:linear-gradient(160deg,var(--sage),var(--sage-deep));color:var(--cream)">
    <span class="eyebrow" style="color:var(--bronze-soft)">Ideas · Insights · Solutions</span>
    <h4 style="color:#fff;margin-bottom:.7rem">Let's talk</h4>
    <p style="color:rgba(251,248,241,.85);font-size:.95rem;margin-bottom:1.3rem">Not sure where to start? Our experts are ready to help you find the right path forward.</p>
    <a class="btn light block" href="${url('contact-us')}">Get in Touch ${icon('arrow')}</a>
    <div style="margin-top:1.2rem;display:grid;gap:.55rem;font-size:.9rem">
      <a href="tel:${COMPANY.phoneHref}" style="display:flex;gap:.55rem;align-items:center;color:rgba(251,248,241,.9)">${icon('phone')} ${COMPANY.phone}</a>
      <a href="mailto:${COMPANY.email}" style="display:flex;gap:.55rem;align-items:center;color:rgba(251,248,241,.9)">${icon('mail')} ${COMPANY.email}</a>
    </div>
  </div>
  ${siblings}
</aside>`;
}

/* ============================================================
   PAGE RENDERERS
   ============================================================ */
const pages = {};

/* ----- HOME ----- */
pages['index'] = () => {
  const intro = firstPara('index'); // The Joxel Group, LLC is a business consulting...
  const cards = DATA.homeCards;
  const showcase = [
    { label: 'Healthcare Consulting', slug: 'healthcare-consulting', img: 'PEOPLE.jpg', tall: true },
    { label: 'Strategic Consulting', slug: 'strategic-consulting', img: 'Strategic_Consulting_B.jpg' },
    { label: 'Strategic Services', slug: 'strategic-services', img: 'Strategic_Servicers.jpg' },
    { label: 'About Us', slug: 'about-us', img: 'About_Us.jpg' },
  ];
  const tCards = DATA.testimonials.slice(0, 6).map((t, idx) => testimonialCard(t, idx)).join('');
  const posts = DATA.blog.posts.slice(0, 3).map((p, idx) => postCard(p, idx)).join('');
  const logos = DATA.clientLogos.filter((v, i, a) => a.findIndex(x => x.src === v.src) === i);
  const logoRow = [...logos, ...logos].map(l => `<img src="${l.src}" alt="${esc(l.alt || 'Client logo')}">`).join('');

  const jsonld = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Organization',
    name: COMPANY.name, url: 'https://thejoxelgroup.com/',
    logo: 'https://thejoxelgroup.com/wp-content/uploads/joxel_logo_rgb_transparent_lowres-1.png',
    telephone: COMPANY.phone, email: COMPANY.email,
    address: { '@type': 'PostalAddress', streetAddress: '6737 W. Washington St., Suite 3470', addressLocality: 'West Allis', addressRegion: 'WI', postalCode: '53214', addressCountry: 'US' },
    sameAs: [SOCIAL.linkedin, SOCIAL.facebook, SOCIAL.twitter],
  });

  const main = `
<section class="hero">
  <span class="blob sage" style="width:420px;height:420px;top:-120px;left:-120px"></span>
  <span class="blob blue" style="width:360px;height:360px;bottom:-140px;right:-80px"></span>
  <div class="container wide">
    <div class="hero-grid">
      <div class="hero-copy">
        <span class="eyebrow" data-reveal>Ideas · Insights · Solutions</span>
        <h1 data-reveal data-delay="1">The <span class="accent">Joxel</span> Group</h1>
        <p class="lede" data-reveal data-delay="2">${esc(intro)}</p>
        <div class="hero-actions" data-reveal data-delay="3">
          <a class="btn" href="${url('about-us')}">Read More ${icon('arrow')}</a>
          <a class="btn ghost" href="${url('contact-us')}">Get in Touch</a>
        </div>
      </div>
      <div class="hero-visual" data-reveal data-delay="2">
        <div class="hero-figure"><img src="assets/img/PEOPLE.jpg" alt="The Joxel Group team" loading="eager"></div>
        <div class="hero-frame"></div>
        <div class="float-chip c1"><div class="fc-icon">${icon('award')}</div><div><div class="fc-num">20+</div><div class="fc-label">Years of Experience</div></div></div>
        <div class="float-chip c2"><div class="fc-icon">${icon('star')}</div><div><div class="fc-num" style="font-size:1rem">Best Places to Work</div><div class="fc-label">2020 Recipient</div></div></div>
      </div>
    </div>
  </div>
</section>

<section class="section tight" style="padding-top:0">
  <div class="container wide">
    <p class="center muted" style="font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;margin-bottom:1.6rem" data-reveal>Trusted by leading organizations</p>
    <div class="logo-strip" data-reveal><div class="logo-track">${logoRow}</div></div>
  </div>
</section>

<section class="section">
  <div class="container wide">
    <div class="section-head" data-reveal>
      <span class="eyebrow">What We Do</span>
      <h2>Expertise across the entire lifecycle of your organization</h2>
    </div>
    <div class="showcase">
      ${showcase.map((s, idx) => `
      <a class="showcase-item ${s.tall ? 'tall' : ''}" href="${url(s.slug)}" data-reveal data-delay="${idx}">
        <img src="assets/img/${s.img}" alt="${esc(s.label)}">
        <div class="showcase-body">
          <span class="eyebrow">Ideas · Insights · Solutions</span>
          <h3>${esc(s.label)}</h3>
          <span class="link-arrow">Read More ${icon('arrow')}</span>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section" style="background:linear-gradient(180deg,transparent,var(--bg-tint))">
  <div class="container">
    <div class="grid" style="grid-template-columns:repeat(3,1fr)">
      ${cards.map((c, idx) => `
      <div class="card feature-card" data-reveal data-delay="${idx}">
        <div class="card-icon">${icon(iconFor(c.title === 'Healthcare Consulting' ? 'healthcare-consulting' : c.title === 'Strategic Consulting' ? 'strategic-consulting' : 'strategic-services'))}</div>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.text)}</p>
        <div class="card-foot"><a class="link-arrow" href="${url(c.title === 'Healthcare Consulting' ? 'healthcare-consulting' : c.title === 'Strategic Consulting' ? 'strategic-consulting' : 'strategic-services')}">Read More ${icon('arrow')}</a></div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section tight">
  <div class="container wide">
    <div class="stats" data-reveal>
      <div class="stat"><div class="n"><span data-count="20" data-suffix="">0</span><span class="plus">+</span></div><div class="l">Years of Experience</div></div>
      <div class="stat"><div class="n">2006</div><div class="l">Founded</div></div>
      <div class="stat"><div class="n"><span data-count="100">0</span><span class="plus">+</span></div><div class="l">Tools &amp; Templates</div></div>
      <div class="stat"><div class="n">2020</div><div class="l">Best Places to Work</div></div>
    </div>
  </div>
</section>

<section class="section" style="background:var(--bg-tint)">
  <div class="container wide">
    <div class="section-head center" data-reveal>
      <span class="eyebrow center">Client Testimonials</span>
      <h2>Trusted partners, proven results</h2>
    </div>
    <div class="grid" style="grid-template-columns:repeat(3,1fr)">${tCards}</div>
    <div class="center" style="margin-top:2.4rem" data-reveal><a class="btn ghost" href="${url('client-testimonials')}">View All Testimonials ${icon('arrow')}</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split" data-reveal>
      <div class="split-media video">
        <div class="video-frame">
          <iframe src="https://www.youtube-nocookie.com/embed/IoHYDsYkav8?rel=0" title="The Joxel Group — Best Places to Work 2020" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <div class="video-badge"><img src="assets/img/MBJ_BPTW.jpg" alt="Best Places to work"></div>
      </div>
      <div>
        <span class="eyebrow">Recognition</span>
        <h2>Best Places to Work 2020</h2>
        <p class="lede" style="margin-top:1rem">Our people are the heart of everything we do. We are proud to be recognized as a Best Places to Work award recipient — a reflection of the culture, care and commitment our team brings to every client engagement.</p>
        <div style="margin-top:1.6rem"><a class="btn" href="${url('our-leaders')}">Meet Our Leaders ${icon('arrow')}</a></div>
      </div>
    </div>
  </div>
</section>

<section class="section" style="background:linear-gradient(180deg,var(--bg-tint),transparent)">
  <div class="container wide">
    <div class="section-head" data-reveal style="display:flex;justify-content:space-between;align-items:flex-end;max-width:none;gap:1rem;flex-wrap:wrap">
      <div><span class="eyebrow">Latest Posts</span><h2>Insights from our team</h2></div>
      <a class="link-arrow" href="${url('blog')}">View All Posts ${icon('arrow')}</a>
    </div>
    <div class="post-grid">${posts}</div>
  </div>
</section>

${ctaBand({ title: 'At Joxel, we love solving your difficult problems.', text: 'Joxel offers experienced, expert assistance throughout every phase of your EHR lifecycle. Let’s start the conversation today.' })}
`;
  return layout({ slug: 'index', title: `${COMPANY.name} — Healthcare & Strategic Consulting`, desc: clip(intro), bodyClass: 'home', main, jsonld });
};

function testimonialCard(t, idx) {
  if (/interested in submitting/i.test(t.org)) {
    return `<div class="tcard cta" data-reveal data-delay="${idx % 3}">
      <div class="quote-mark" style="color:rgba(251,248,241,.5)">”</div>
      <h4>${esc(t.org)}</h4>
      <p>${esc(t.quote.replace(t.org, '').trim())}</p>
    </div>`;
  }
  return `<div class="tcard" data-reveal data-delay="${idx % 3}">
    <div class="quote-mark">”</div>
    <blockquote>${esc(t.quote)}</blockquote>
    <div class="t-foot"><div class="t-org">${esc(t.org)}</div>${t.person ? `<div class="t-person">${esc(t.person)}</div>` : ''}</div>
  </div>`;
}

function postCard(p, idx) {
  const thumb = p.img
    ? `<div class="post-thumb"><img src="${p.img}" alt="${esc(p.title)}" loading="lazy"></div>`
    : `<div class="post-thumb placeholder"><span class="ph-mark">Joxel</span></div>`;
  const cat = (p.cats && p.cats[0]) || 'Joxel Blog';
  return `<article class="post-card" data-reveal data-delay="${idx % 3}">
    ${thumb}
    <div class="post-body">
      <div class="post-meta"><span class="tag">${esc(cat)}</span>${p.date ? `<span>${esc(p.date)}</span>` : ''}</div>
      <h3>${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</h3>
      ${p.excerpt ? `<p>${esc(clip(p.excerpt, 150))}</p>` : ''}
      ${p.link ? `<a class="link-arrow" href="${p.link}" target="_blank" rel="noopener">Read More ${icon('arrow')}</a>` : ''}
    </div>
  </article>`;
}

/* ----- HUB PAGES (list of children as cards) ----- */
function hubPage(slug) {
  const label = ALL[slug].blocks.find(b => b.type === 'h1')?.text || slug;
  const paras = blocksOf(slug).filter(b => b.type === 'p');
  const parent = NAV.find(n => n.slug === slug);
  const children = parent ? parent.children : [];
  const cards = children.map((c, idx) => `
    <a class="card" href="${url(c.slug)}" data-reveal data-delay="${idx % 3}">
      <div class="card-icon">${icon(iconFor(c.slug))}</div>
      <h3>${esc(c.label)}</h3>
      <p>${esc(clip(firstPara(c.slug), 120))}</p>
      <div class="card-foot"><span class="link-arrow">Read More ${icon('arrow')}</span></div>
    </a>`).join('');

  const main = `
${banner(slug, label, paras[0] ? paras[0].text : '')}
<section class="section">
  <div class="container">
    ${paras.length > 1 ? `<div class="rich" style="max-width:760px;margin-bottom:clamp(2rem,4vw,3.2rem)" data-reveal>${paras.slice(1).map(p => `<p>${esc(p.text)}</p>`).join('')}</div>` : ''}
    <div class="grid" style="grid-template-columns:repeat(3,1fr)">${cards}</div>
  </div>
</section>
${ctaBand()}`;
  return layout({ slug, title: pageTitle(label), desc: clip(paras[0]?.text || label), main });
}

/* ----- GENERIC SERVICE / DETAIL PAGE ----- */
function servicePage(slug) {
  const label = ALL[slug].blocks.find(b => b.type === 'h1')?.text || slug;
  const rest = blocksOf(slug);
  const bodyHtml = renderBlocks(rest);
  const main = `
${banner(slug, label)}
<section class="section">
  <div class="container wide">
    <div class="blog-layout">
      <div class="service-body rich-body">
        ${bodyHtml}
      </div>
      ${serviceSidebar(slug)}
    </div>
  </div>
</section>
${ctaBand()}`;
  return layout({ slug, title: pageTitle(label), desc: clip(firstPara(slug) || label), main });
}

/* ----- ABOUT US ----- */
pages['about-us'] = () => {
  const b = blocksOf('about-us');
  const quote = b.find(x => x.type === 'p')?.text || '';
  // sections keyed by h3
  const getSection = (name) => {
    const idx = b.findIndex(x => (x.type === 'h3' || x.type === 'h4') && x.text === name);
    if (idx < 0) return { paras: [], list: null };
    const paras = []; let list = null;
    for (let i = idx + 1; i < b.length; i++) {
      if (b[i].type === 'h3' || b[i].type === 'h4') break;
      if (b[i].type === 'p') paras.push(b[i].text);
      if (b[i].type === 'list') list = b[i].items;
    }
    return { paras, list };
  };
  const story = getSection('Our Story');
  const focus = getSection('Our Focus');
  const promise = getSection('Our Promise');
  const valIcons = ['bulb', 'shield', 'scale', 'sparkle'];
  const values = (promise.list || []).map((v, idx) => {
    const dash = v.indexOf('–') >= 0 ? '–' : (v.indexOf('-') >= 0 ? '-' : null);
    let title = v, desc = '';
    if (dash) { const p = v.split(dash); title = p[0].trim(); desc = p.slice(1).join(dash).trim(); }
    return `<div class="value" data-reveal data-delay="${idx % 2}">
      <div class="v-ic">${icon(valIcons[idx % valIcons.length])}</div>
      <div><h4>${esc(title)}</h4><p>${esc(desc)}</p></div>
    </div>`;
  }).join('');

  const main = `
${banner('about-us', 'About Us')}
<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container narrow center">
    <div class="callout" style="border:none;background:none;margin:0" data-reveal>
      <div class="quote-mark" style="font-family:var(--font-serif);font-size:3rem;color:var(--sage-soft);line-height:.5">”</div>
      <p style="font-size:clamp(1.3rem,2.6vw,1.9rem);font-family:var(--font-serif);font-style:italic;color:var(--heading);line-height:1.4">${esc(quote)}</p>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="split" data-reveal>
      <div class="split-media"><img src="assets/img/About_Us.jpg" alt="About The Joxel Group"></div>
      <div>
        <span class="eyebrow">Our Story</span>
        <h2>Our Story</h2>
        ${story.paras.map(p => `<p style="margin-top:1rem">${esc(p)}</p>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="section" style="background:var(--bg-tint)">
  <div class="container">
    <div class="split rev" data-reveal>
      <div class="split-media"><img src="assets/img/Strategic_Consulting_B.jpg" alt="Our Focus"></div>
      <div>
        <span class="eyebrow">Our Focus</span>
        <h2>Our Focus</h2>
        ${focus.paras.map(p => `<p style="margin-top:1rem">${esc(p)}</p>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center" data-reveal>
      <span class="eyebrow center">Our Promise</span>
      <h2>Our Promise</h2>
      ${promise.paras.map(p => `<p class="lede" style="margin-top:1rem">${esc(p)}</p>`).join('')}
    </div>
    <div class="value-grid">${values}</div>
  </div>
</section>
${ctaBand()}`;
  return layout({ slug: 'about-us', title: pageTitle('About Us'), desc: clip(story.paras[0] || quote), main });
};

/* ----- OUR LEADERS ----- */
pages['our-leaders'] = () => {
  const members = DATA.leaders.map((m, idx) => {
    const slug = teamSlugByName[m.name];
    const href = slug ? url(leaderPageId(slug)) : m.link;
    const internal = !!slug;
    return `
    <article class="member" data-reveal data-delay="${idx % 4}">
      <a class="member-photo"${internal ? '' : ' target="_blank" rel="noopener"'} href="${href}" aria-label="${esc(m.name)}">${m.img ? `<img src="${m.img}" alt="${esc(m.name)}" loading="lazy">` : ''}</a>
      <div class="member-body">
        <div class="role">${esc(m.role)}</div>
        <h4><a href="${href}"${internal ? '' : ' target="_blank" rel="noopener"'}>${esc(m.name)}</a></h4>
        <p>${esc(m.excerpt)}</p>
        <a class="link-arrow" href="${href}"${internal ? '' : ' target="_blank" rel="noopener"'}>Read More ${icon('arrow')}</a>
      </div>
    </article>`;
  }).join('');
  const main = `
${banner('our-leaders', 'Our Leaders', 'The experienced team guiding every Joxel engagement.')}
<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container wide"><div class="team-grid">${members}</div></div>
</section>
${ctaBand({ title: 'Work with a team that goes the extra mile.', text: 'Our leaders bring decades of combined expertise in healthcare, technology and the pension industries.' })}`;
  return layout({ slug: 'our-leaders', title: pageTitle('Our Leaders'), desc: 'Meet the leadership team of The Joxel Group, LLC.', main });
};

/* ----- LEADER BIO (individual) ----- */
function leaderPage(t) {
  const pid = leaderPageId(t.slug);
  const others = TEAM.filter(x => x.slug !== t.slug);
  const crumb = `<nav class="breadcrumbs" aria-label="Breadcrumb">
    <a href="${url('index')}">Home</a><span class="sep">/</span>
    <a href="${url('about-us')}">About Us</a><span class="sep">/</span>
    <a href="${url('our-leaders')}">Our Leaders</a><span class="sep">/</span>
    <span class="current">${esc(t.name)}</span>
  </nav>`;
  const main = `
<section class="page-banner" style="padding-bottom:clamp(1.5rem,3vw,2.2rem)">
  <span class="blob sage" style="width:360px;height:360px;top:-140px;right:-60px"></span>
  <div class="container">${crumb}</div>
</section>
<section class="section" style="padding-top:clamp(1rem,3vw,2rem)">
  <div class="container">
    <div class="split" data-reveal>
      <div class="split-media" style="aspect-ratio:4/4.4;max-width:440px">
        ${t.img ? `<img src="${t.img}" alt="${esc(t.name)}">` : ''}
      </div>
      <div>
        <span class="eyebrow">Our Leaders</span>
        <h1 style="font-size:clamp(2.1rem,4.4vw,3.2rem)">${esc(t.name)}</h1>
        <div class="pill-tag" style="margin-top:1rem">${esc(t.role)}</div>
        <div class="rich-body" style="margin-top:1.6rem">
          ${t.bio.map(p => `<p>${esc(p)}</p>`).join('')}
        </div>
        <div style="margin-top:1.8rem;display:flex;gap:.8rem;flex-wrap:wrap">
          <a class="btn" href="${url('contact-us')}">Get in Touch ${icon('arrow')}</a>
          <a class="btn ghost" href="${url('our-leaders')}">Back to Our Leaders</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section tight" style="background:var(--bg-tint)">
  <div class="container wide">
    <div class="section-head" data-reveal><span class="eyebrow">Leadership</span><h2>Meet the rest of the team</h2></div>
    <div class="team-grid">
      ${others.map((o, idx) => `
      <article class="member" data-reveal data-delay="${idx % 4}">
        <a class="member-photo" href="${url(leaderPageId(o.slug))}" aria-label="${esc(o.name)}">${o.img ? `<img src="${o.img}" alt="${esc(o.name)}" loading="lazy">` : ''}</a>
        <div class="member-body">
          <div class="role">${esc(o.role)}</div>
          <h4><a href="${url(leaderPageId(o.slug))}">${esc(o.name)}</a></h4>
          <a class="link-arrow" href="${url(leaderPageId(o.slug))}">View Profile ${icon('arrow')}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
${ctaBand()}`;
  return layout({ slug: pid, title: pageTitle(`${t.name} — ${t.role}`), desc: clip(t.bio[0] || t.name), main });
}

/* ----- JOXEL 365 ----- */
pages['joxel-365'] = () => {
  const b = blocksOf('joxel-365');
  const h2 = b.find(x => x.type === 'h2')?.text || 'Community Involvement and Volunteer Work';
  const imgs = DATA.community.images;
  const intlHead = b.find(x => x.type === 'h3')?.text || 'International Community Support';
  const intlList = b.find(x => x.type === 'list')?.items || [];
  const gallery = imgs.map((im, idx) => {
    const isLogo = /logo|CHW|mequon|rescue|Paralyzed|ISHA/i.test(im.src);
    return `<figure data-reveal data-delay="${idx % 4}"><img class="${isLogo ? 'logo-fit' : ''}" src="${im.src}" alt="${esc(im.alt || 'Joxel 365 community')}" loading="lazy"></figure>`;
  }).join('');
  const main = `
${banner('joxel-365', 'Joxel 365', 'Giving back to the communities we serve — every day of the year.')}
<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container">
    <div class="section-head center" data-reveal><span class="eyebrow center">Joxel 365</span><h2>${esc(h2)}</h2></div>
    <div class="gallery">${gallery}</div>
  </div>
</section>
<section class="section" style="background:var(--bg-tint)">
  <div class="container narrow center">
    <div class="card tinted" data-reveal style="text-align:center">
      <div class="card-icon" style="margin-inline:auto">${icon('globe')}</div>
      <h3>${esc(intlHead)}</h3>
      ${intlList.map(i => `<p class="lede" style="margin-top:.6rem">${esc(i)}</p>`).join('')}
    </div>
  </div>
</section>
${ctaBand()}`;
  return layout({ slug: 'joxel-365', title: pageTitle('Joxel 365'), desc: 'Community involvement and volunteer work at The Joxel Group.', main });
};

/* ----- CLIENT TESTIMONIALS ----- */
pages['client-testimonials'] = () => {
  const logos = DATA.clientLogos.filter((v, i, a) => a.findIndex(x => x.src === v.src) === i);
  const logoGrid = logos.map((l, idx) => `<figure data-reveal data-delay="${idx % 4}"><img class="logo-fit" src="${l.src}" alt="${esc(l.alt || 'Client')}" loading="lazy"></figure>`).join('');
  const tCards = DATA.testimonials.map((t, idx) => testimonialCard(t, idx)).join('');
  const main = `
${banner('client-testimonials', 'Client Testimonials', 'Hear directly from the organizations we are proud to partner with.')}
<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container">
    <div class="gallery" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr))">${logoGrid}</div>
  </div>
</section>
<section class="section" style="background:var(--bg-tint);padding-top:clamp(2rem,4vw,3rem)">
  <div class="container wide">
    <div class="grid" style="grid-template-columns:repeat(3,1fr)">${tCards}</div>
  </div>
</section>
${ctaBand()}`;
  return layout({ slug: 'client-testimonials', title: pageTitle('Client Testimonials'), desc: 'Client testimonials for The Joxel Group, LLC.', main });
};

/* ----- PARTNERSHIPS ----- */
pages['partnerships'] = () => {
  const para = firstPara('partnerships');
  const main = `
${banner('partnerships', 'Partnerships')}
<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container">
    <div class="split" data-reveal>
      <div class="split-media contain"><img src="assets/img/LSS-Logo-1.jpg" alt="Lutheran Social Services"></div>
      <div>
        <span class="eyebrow">Partnerships</span>
        <h2>The LSS Partnership Circle</h2>
        <p class="lede" style="margin-top:1rem">${esc(para)}</p>
      </div>
    </div>
  </div>
</section>
${ctaBand()}`;
  return layout({ slug: 'partnerships', title: pageTitle('Partnerships'), desc: clip(para), main });
};

/* ----- CONTACT ----- */
pages['contact-us'] = () => {
  const info = [
    { k: 'Email', v: COMPANY.email, ic: 'mail', href: `mailto:${COMPANY.email}` },
    { k: 'Phone', v: COMPANY.phone, ic: 'phone', href: `tel:${COMPANY.phoneHref}` },
    { k: 'Office', v: COMPANY.addressLines.join(', '), ic: 'pin', href: '#' },
  ].map(i => `<a class="info-card" href="${i.href}" data-reveal><span class="ic">${icon(i.ic)}</span><span><span class="k">${i.k}</span><span class="v" style="display:block">${esc(i.v)}</span></span></a>`).join('');

  const main = `
${banner('contact-us', 'Contact Us', 'Joxel loves hearing from their clients. Let’s start a conversation.')}
<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        ${info}
        <div class="info-card" style="background:linear-gradient(150deg,var(--sage),var(--sage-deep));border:none;color:var(--cream)" data-reveal>
          <span class="ic" style="background:rgba(255,255,255,.15);color:#fff">${icon('users')}</span>
          <span><span class="k" style="color:var(--bronze-soft)">Social</span>
          <span class="v" style="display:flex;gap:.7rem;margin-top:.3rem">
            <a href="${SOCIAL.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn" style="color:#fff">${icon('linkedin')}</a>
            <a href="${SOCIAL.facebook}" target="_blank" rel="noopener" aria-label="Facebook" style="color:#fff">${icon('facebook')}</a>
            <a href="${SOCIAL.twitter}" target="_blank" rel="noopener" aria-label="Twitter" style="color:#fff">${icon('twitter')}</a>
          </span></span>
        </div>
      </div>
      <div class="form-wrap" data-reveal data-delay="1">
        <form id="joxelContactForm" novalidate>
          <div class="field">
            <label>Name <span class="req">*</span></label>
            <div class="field-row">
              <div><input type="text" name="first" required aria-label="First name"><span class="sub-label">First</span></div>
              <div><input type="text" name="last" required aria-label="Last name"><span class="sub-label">Last</span></div>
            </div>
          </div>
          <div class="field">
            <label for="org">Organization: <span class="req">*</span></label>
            <input type="text" id="org" name="organization" required>
          </div>
          <div class="field">
            <label>Preferred Method of Contact <span class="req">*</span></label>
            <div class="choice-group">
              <span class="choice"><input type="radio" id="pm-email" name="preferred" value="Email"><label for="pm-email">Email</label></span>
              <span class="choice"><input type="radio" id="pm-phone" name="preferred" value="Phone"><label for="pm-phone">Phone</label></span>
            </div>
          </div>
          <div class="field-row">
            <div class="field"><label for="email">Email <span class="req">*</span></label><input type="email" id="email" name="email"></div>
            <div class="field"><label for="phone">Phone Number <span class="req">*</span></label><input type="text" id="phone" name="phone"></div>
          </div>
          <div class="field">
            <label for="request">Please describe your request <span class="req">*</span></label>
            <textarea id="request" name="request" required></textarea>
          </div>
          <div class="field">
            <label>Where did you hear about us? <span class="req">*</span></label>
            <div class="choice-group">
              ${['Netsmart', 'Social Media', 'Google Search', 'Referral', 'Other'].map((o, i) => `<span class="choice"><input type="checkbox" id="src-${i}" name="source" value="${o}"><label for="src-${i}">${o}</label></span>`).join('')}
            </div>
          </div>
          <button type="submit" class="btn block">Submit ${icon('send')}</button>
          <p id="formNote" class="muted" style="font-size:.85rem;margin-top:1rem;display:none"></p>
        </form>
      </div>
    </div>
  </div>
</section>`;
  return layout({ slug: 'contact-us', title: pageTitle('Contact Us'), desc: 'Contact The Joxel Group, LLC — Joxel loves hearing from their clients.', main });
};

/* ----- BLOG ----- */
pages['blog'] = () => {
  const posts = DATA.blog.posts.map((p, idx) => postCard(p, idx)).join('');
  const cats = DATA.blog.categories.map(c => `<li><a href="${url('blog')}">${esc(c)}</a></li>`).join('');
  const arch = DATA.blog.archives.map(a => `<li><a href="${url('blog')}">${esc(a)}</a></li>`).join('');
  const main = `
${banner('blog', 'Blog', 'Insights, spotlights and stories from the Joxel family.')}
<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container wide">
    <div class="blog-layout">
      <div>
        <div class="post-grid">${posts}</div>
        <nav class="pagination" aria-label="Blog pagination">
          <span class="curr">1</span>
          <a href="https://thejoxelgroup.com/blog/page/2/" target="_blank" rel="noopener">2</a>
          <a href="https://thejoxelgroup.com/blog/page/2/" target="_blank" rel="noopener" aria-label="Next">${icon('arrow')}</a>
        </nav>
      </div>
      <aside class="sidebar">
        <div class="widget" data-reveal><h4>Category</h4><ul>${cats}</ul></div>
        <div class="widget" data-reveal data-delay="1"><h4>Archives</h4><ul>${arch}</ul></div>
      </aside>
    </div>
  </div>
</section>
${ctaBand()}`;
  return layout({ slug: 'blog', title: pageTitle('Blog'), desc: 'The Joxel Group blog — insights, spotlights and stories.', main });
};

/* ----- LEGAL PAGES ----- */
function legalPage(slug, label) {
  const b = blocksOf(slug);
  let html = '';
  let skippedDup = false;
  for (const x of b) {
    if (x.type === 'h1') continue;
    if (x.type === 'p') {
      if (!skippedDup && x.text.trim() === label) { skippedDup = true; continue; }
      const isQ = x.text.trim().endsWith('?') && x.text.length < 120;
      html += isQ ? `<p class="q">${esc(x.text)}</p>` : `<p>${esc(x.text)}</p>`;
    } else if (x.type === 'list') {
      html += `<ul>${x.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
    } else if (x.type === 'h2' || x.type === 'h3') {
      html += `<h2>${esc(x.text)}</h2>`;
    }
  }
  const main = `
${banner(slug, label)}
<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container"><div class="prose" data-reveal>${html}</div></div>
</section>`;
  return layout({ slug, title: pageTitle(label), desc: `${label} — ${COMPANY.name}.`, main });
}

/* ============================================================
   BUILD
   ============================================================ */
const HUBS = ['healthcare-consulting', 'strategic-consulting', 'strategic-services'];
const SERVICES = ['ehr-selection', 'ehr-implementations', 'ehr-optimization', 'avatar-consulting', 'evolv-consulting', 'project-management', 'office-of-the-cio', 'revenue-cycle-management', 'custom-solutions', 'emr-configuration', 'outsourcing-support'];

function labelFor(slug) {
  for (const item of NAV) {
    if (item.slug === slug) return item.label;
    if (item.children) for (const c of item.children) if (c.slug === slug) return c.label;
  }
  return ALL[slug]?.blocks.find(b => b.type === 'h1')?.text || slug;
}

const build = {};
build['index'] = pages['index'];
for (const h of HUBS) build[h] = () => hubPage(h);
for (const s of SERVICES) build[s] = () => servicePage(s);
build['about-us'] = pages['about-us'];
build['our-leaders'] = pages['our-leaders'];
for (const t of TEAM) build[leaderPageId(t.slug)] = () => leaderPage(t);
build['joxel-365'] = pages['joxel-365'];
build['contact-us'] = pages['contact-us'];
build['client-testimonials'] = pages['client-testimonials'];
build['partnerships'] = pages['partnerships'];
build['blog'] = pages['blog'];
build['terms-of-use'] = () => legalPage('terms-of-use', 'Terms of Use');
build['privacy-policy'] = () => legalPage('privacy-policy', 'Privacy Policy');

/* Programmatic SEO: location pages, service hubs, locations index */
Object.assign(build, pseoBuild());

/* clean + prepare output */
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets/css'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets/js'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets/img'), { recursive: true });

/* copy assets */
fs.copyFileSync('src/css/style.css', path.join(OUT, 'assets/css/style.css'));
fs.copyFileSync('src/js/main.js', path.join(OUT, 'assets/js/main.js'));
for (const f of fs.readdirSync('assets/img')) fs.copyFileSync(path.join('assets/img', f), path.join(OUT, 'assets/img', f));

/* write pages */
let count = 0;
const written = [];
for (const slug of Object.keys(build)) {
  const html = build[slug]();
  const file = slug === 'index' ? 'index.html' : slug + '.html';
  fs.writeFileSync(path.join(OUT, file), html);
  written.push(file);
  count++;
}

/* sitemap + robots */
const today = '2026-07-01';
const sm = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n` +
  Object.keys(build).map(s => `  <url><loc>https://thejoxelgroup.com/${s === 'index' ? '' : s + '/'}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sm);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://thejoxelgroup.com/sitemap.xml\n`);

console.log(`Built ${count} pages ->`, written.join(', '));
