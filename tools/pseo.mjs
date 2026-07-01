/* ============================================================
   Programmatic SEO engine — location pages for core services
   across major U.S. metropolitan markets.
   Content is composed from real geo data + multiple deterministic
   template variants so no two pages are identical (anti-duplicate).
   ============================================================ */
import { COMPANY, SOCIAL, esc, url, icon, layout } from './lib.mjs';

/* ---------- Major U.S. metropolitan markets (real geo data) ---------- */
export const METROS = [
  { city: 'New York', state: 'New York', abbr: 'NY', region: 'Northeast', metro: 'New York City', tier: 5, nearby: ['Newark, NJ', 'Jersey City, NJ', 'Yonkers, NY'] },
  { city: 'Los Angeles', state: 'California', abbr: 'CA', region: 'West Coast', metro: 'Greater Los Angeles', tier: 5, nearby: ['Long Beach', 'Anaheim', 'Santa Ana'] },
  { city: 'Chicago', state: 'Illinois', abbr: 'IL', region: 'Midwest', metro: 'Chicagoland', tier: 5, nearby: ['Naperville', 'Aurora', 'Elgin'] },
  { city: 'Dallas', state: 'Texas', abbr: 'TX', region: 'South', metro: 'Dallas–Fort Worth', tier: 5, nearby: ['Fort Worth', 'Arlington', 'Plano'] },
  { city: 'Houston', state: 'Texas', abbr: 'TX', region: 'South', metro: 'Greater Houston', tier: 5, nearby: ['Sugar Land', 'The Woodlands', 'Pasadena'] },
  { city: 'Washington', state: 'District of Columbia', abbr: 'DC', region: 'Mid-Atlantic', metro: 'the D.C. metro', tier: 10, nearby: ['Arlington, VA', 'Alexandria, VA', 'Bethesda, MD'] },
  { city: 'Philadelphia', state: 'Pennsylvania', abbr: 'PA', region: 'Northeast', metro: 'Greater Philadelphia', tier: 10, nearby: ['Camden, NJ', 'Wilmington, DE', 'King of Prussia'] },
  { city: 'Atlanta', state: 'Georgia', abbr: 'GA', region: 'Southeast', metro: 'Metro Atlanta', tier: 10, nearby: ['Sandy Springs', 'Marietta', 'Alpharetta'] },
  { city: 'Miami', state: 'Florida', abbr: 'FL', region: 'Southeast', metro: 'South Florida', tier: 10, nearby: ['Fort Lauderdale', 'Hialeah', 'West Palm Beach'] },
  { city: 'Phoenix', state: 'Arizona', abbr: 'AZ', region: 'Southwest', metro: 'the Valley of the Sun', tier: 10, nearby: ['Mesa', 'Scottsdale', 'Chandler'] },
  { city: 'Boston', state: 'Massachusetts', abbr: 'MA', region: 'New England', metro: 'Greater Boston', tier: 15, nearby: ['Cambridge', 'Quincy', 'Newton'] },
  { city: 'San Francisco', state: 'California', abbr: 'CA', region: 'West Coast', metro: 'the Bay Area', tier: 15, nearby: ['Oakland', 'San Jose', 'Berkeley'] },
  { city: 'Detroit', state: 'Michigan', abbr: 'MI', region: 'Midwest', metro: 'Metro Detroit', tier: 15, nearby: ['Warren', 'Dearborn', 'Livonia'] },
  { city: 'Seattle', state: 'Washington', abbr: 'WA', region: 'Pacific Northwest', metro: 'the Puget Sound', tier: 15, nearby: ['Bellevue', 'Tacoma', 'Everett'] },
  { city: 'Minneapolis', state: 'Minnesota', abbr: 'MN', region: 'Upper Midwest', metro: 'the Twin Cities', tier: 15, nearby: ['St. Paul', 'Bloomington', 'Plymouth'] },
  { city: 'Denver', state: 'Colorado', abbr: 'CO', region: 'Mountain West', metro: 'the Front Range', tier: 15, nearby: ['Aurora', 'Lakewood', 'Boulder'] },
  { city: 'Tampa', state: 'Florida', abbr: 'FL', region: 'Southeast', metro: 'Tampa Bay', tier: 25, nearby: ['St. Petersburg', 'Clearwater', 'Brandon'] },
  { city: 'Charlotte', state: 'North Carolina', abbr: 'NC', region: 'Southeast', metro: 'the Charlotte region', tier: 25, nearby: ['Concord', 'Gastonia', 'Huntersville'] },
  { city: 'St. Louis', state: 'Missouri', abbr: 'MO', region: 'Midwest', metro: 'Greater St. Louis', tier: 25, nearby: ['Clayton', 'Chesterfield', 'Florissant'] },
  { city: 'Milwaukee', state: 'Wisconsin', abbr: 'WI', region: 'Upper Midwest', metro: 'the Milwaukee area', tier: 25, nearby: ['Waukesha', 'Wauwatosa', 'West Allis'] },
  { city: 'Nashville', state: 'Tennessee', abbr: 'TN', region: 'Southeast', metro: 'Middle Tennessee', tier: 25, nearby: ['Franklin', 'Murfreesboro', 'Brentwood'] },
  { city: 'Columbus', state: 'Ohio', abbr: 'OH', region: 'Midwest', metro: 'Central Ohio', tier: 25, nearby: ['Dublin', 'Westerville', 'Grove City'] },
  { city: 'Portland', state: 'Oregon', abbr: 'OR', region: 'Pacific Northwest', metro: 'the Portland metro', tier: 25, nearby: ['Beaverton', 'Gresham', 'Hillsboro'] },
  { city: 'Madison', state: 'Wisconsin', abbr: 'WI', region: 'Upper Midwest', metro: 'the Madison area', tier: 25, nearby: ['Fitchburg', 'Middleton', 'Sun Prairie'] },
];

/* ---------- Core service offerings (AI-forward positioning) ---------- */
export const SERVICES = [
  {
    slug: 'ehr-consulting', name: 'EHR Consulting', ic: 'pulse',
    serviceType: 'Electronic Health Record Consulting',
    hubExists: false,
    expertise: 'EHR', tag: 'EHR selection, implementation & optimization',
    outcome: 'select, implement and optimize their EHR with confidence',
    outcome2: 'get more value from myAvatar, myEvolv, Epic and Cerner',
    outcome3: 'streamline clinical documentation, workflows and system adoption',
    caps: [
      'EHR selection and vendor evaluation with a weighted scoring matrix',
      'Full-lifecycle EHR implementation and go-live support',
      'EHR optimization, workflow redesign and adoption',
      'myAvatar and myEvolv configuration and support',
      'Data conversion, custom reporting and dashboards',
      'Staff training and ongoing managed support',
    ],
    faq2: {
      q: 'Which EHR systems do you support in {city}?',
      a: 'Our {city}-area consultants have deep, hands-on experience with myAvatar, myEvolv, Epic, Cerner and myInsight — covering selection, implementation, optimization and support.',
    },
  },
  {
    slug: 'revenue-cycle-management', name: 'Revenue Cycle Management', ic: 'chart',
    serviceType: 'Healthcare Revenue Cycle Management',
    hubExists: true, hubSlug: 'revenue-cycle-management',
    expertise: 'revenue cycle', tag: 'billing, denials, collections & AR management',
    outcome: 'strengthen their revenue cycle and protect their bottom line',
    outcome2: 'reduce AR days and recover more of the revenue they have earned',
    outcome3: 'tighten billing, denials and collections workflows end to end',
    caps: [
      'Full revenue cycle assessment and process improvement',
      'Charge capture, coding and documentation review',
      'Claims, denials and collections management',
      'AR days reduction and cash-flow acceleration',
      'Payer, authorization and eligibility management',
      'Revenue analytics, KPIs and executive reporting',
    ],
    faq2: {
      q: 'How can you improve our revenue cycle in {city}?',
      a: 'We take a 360-degree view of your revenue cycle — registration, authorization, billing, denials and AR — and implement targeted improvements tailored to {state} payers and your patient mix.',
    },
  },
  {
    slug: 'ai-strategy', name: 'AI Strategy', ic: 'cpu',
    serviceType: 'Healthcare AI Strategy Consulting',
    hubExists: false,
    expertise: 'healthcare AI and analytics', tag: 'AI readiness, data strategy & responsible governance',
    outcome: 'turn their data into a measurable, responsible competitive advantage',
    outcome2: 'adopt AI safely, practically and with clear governance',
    outcome3: 'build an AI roadmap grounded in clean data and sound governance',
    caps: [
      'AI readiness assessment across data, workflows and governance',
      'Data strategy, integration and warehouse foundations',
      'Predictive analytics for population health and outcomes',
      'Workflow automation and administrative efficiency',
      'Responsible, ethical and compliant AI governance',
      'Pragmatic AI roadmap and implementation planning',
    ],
    faq2: {
      q: 'Is our {city} organization ready to adopt AI?',
      a: 'We begin with an AI readiness assessment that reviews your data quality, workflows and governance, then deliver a practical roadmap so {city}-area organizations can adopt AI responsibly and effectively.',
    },
  },
];

/* ---------- helpers ---------- */
const slugify = s => s.toLowerCase().replace(/[.'']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const citySlug = m => `${slugify(m.city)}-${m.abbr.toLowerCase()}`;
export const locSlug = (svc, m) => `${svc.slug}-${citySlug(m)}`;

const hash = s => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
const pick = (arr, seed) => arr[seed % arr.length];
const tierPhrase = t => t <= 5 ? 'one of the five largest metro areas' : t <= 10 ? 'one of the ten largest metro areas' : t <= 15 ? 'one of the fifteen largest metro areas' : 'a major metropolitan market';

const CANON = slug => `https://thejoxelgroup.com/${slug}/`;

/* ---------- content variants ---------- */
function introPara(svc, m, seed) {
  const tier = tierPhrase(m.tier);
  const variants = [
    `${svc.name} is mission-critical for behavioral health and human services organizations across ${m.city}, ${m.state}. As ${tier} in the ${m.region}, ${m.city} providers face rising caseloads, complex payer requirements and growing demand for measurable outcomes. The Joxel Group brings over 20 years of ${svc.expertise} expertise to ${m.metro} — helping local agencies ${svc.outcome}.`,
    `Care organizations throughout ${m.metro} turn to The Joxel Group for ${svc.name.toLowerCase()} that moves the needle. From ${m.nearby[0]} to ${m.nearby[1]}, ${m.state} agencies rely on our consultants to ${svc.outcome2}, drawing on lessons from hundreds of engagements across the ${m.region} and beyond.`,
    `In ${m.city}, ${m.state}, the pressure to do more with less has never been greater. The Joxel Group partners with ${m.region} providers to deliver ${svc.name.toLowerCase()} grounded in real workflows — not theory. Our team helps ${m.city}-area organizations ${svc.outcome3}, so technology serves care instead of getting in its way.`,
    `The healthcare landscape across ${m.metro} is complex, and ${svc.name.toLowerCase()} is where many organizations get stuck. The Joxel Group helps ${m.city}-area behavioral health and human services teams ${svc.outcome} — pairing deep ${svc.expertise} experience with a hands-on, ${m.region}-savvy approach.`,
  ];
  return pick(variants, seed);
}

function localPara(svc, m, seed) {
  const variants = [
    `Serving ${m.city} means understanding the ${m.region}. Our team supports providers from ${m.nearby[0]} and ${m.nearby[1]} to ${m.nearby[2]}, aligning every engagement with the realities of ${m.state} regulations, payers and community needs — on-site when it helps, and remotely when it's more efficient.`,
    `${m.metro} — including ${m.nearby[0]}, ${m.nearby[1]} and the surrounding communities — is home to a wide range of behavioral health, substance-use and human services organizations. The Joxel Group tailors ${svc.name.toLowerCase()} to the specific operating environment of ${m.state}, so your investment reflects local priorities rather than a generic playbook.`,
    `Whether your organization sits in the heart of ${m.city} or serves surrounding communities like ${m.nearby[0]} and ${m.nearby[2]}, our consultants adapt to how care actually happens across ${m.state}. That local fluency is why agencies throughout the ${m.region} choose Joxel for ${svc.name.toLowerCase()}.`,
  ];
  return pick(variants, seed);
}

function whyChoose(svc, m, seed) {
  const local = `Local focus on ${m.city} and the wider ${m.region}, with flexible on-site and remote delivery`;
  const pool = [
    'Over 20 years of behavioral health and human services experience',
    'A proven, proprietary methodology refined across hundreds of engagements',
    'Consultants who understand both IT and day-to-day operations',
    'Named a Best Places to Work recipient — a team that goes the extra mile',
    'Transparent project governance, communication and measurable results',
    'Mentorship built in, so your team is equipped long after go-live',
  ];
  const rotated = pool.slice(seed % pool.length).concat(pool.slice(0, seed % pool.length));
  return [local, ...rotated.slice(0, 4)];
}

function faqs(svc, m) {
  return [
    { q: `Does The Joxel Group provide ${svc.name} in ${m.city}, ${m.abbr}?`,
      a: `Yes. The Joxel Group serves behavioral health and human services organizations throughout ${m.city} and the surrounding ${m.region}, delivering ${svc.name.toLowerCase()} both on-site and remotely.` },
    { q: svc.faq2.q.replace(/{city}/g, m.city).replace(/{state}/g, m.state),
      a: svc.faq2.a.replace(/{city}/g, m.city).replace(/{state}/g, m.state) },
    { q: `How do we get started with ${svc.name} in ${m.city}?`,
      a: `Contact The Joxel Group for a free consultation. We'll talk through your goals in ${m.city}, ${m.state}, review your current state and outline a plan tailored to your organization.` },
  ];
}

function schema(svc, m, slug, faqList) {
  const g = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': 'https://thejoxelgroup.com/#org', name: COMPANY.name,
        url: 'https://thejoxelgroup.com/', telephone: COMPANY.phone, email: COMPANY.email,
        sameAs: [SOCIAL.linkedin, SOCIAL.facebook, SOCIAL.twitter] },
      { '@type': 'Service', name: `${svc.name} in ${m.city}, ${m.abbr}`, serviceType: svc.serviceType,
        provider: { '@id': 'https://thejoxelgroup.com/#org' }, url: CANON(slug),
        areaServed: { '@type': 'City', name: `${m.city}, ${m.state}` } },
      { '@type': 'FAQPage', mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thejoxelgroup.com/' },
        { '@type': 'ListItem', position: 2, name: 'Locations', item: CANON('locations') },
        { '@type': 'ListItem', position: 3, name: `${svc.name} — ${m.city}, ${m.abbr}`, item: CANON(slug) },
      ] },
    ],
  };
  return JSON.stringify(g);
}

/* ---------- shared bits ---------- */
const cta = () => `
<section class="section cta-band">
  <div class="container">
    <div class="cta-inner" data-reveal>
      <span class="eyebrow center">Ideas · Insights · Solutions</span>
      <h2>Ready to move forward?</h2>
      <p>Talk with The Joxel Group about your goals. Our experts offer a free consultation to help you find the right path.</p>
      <div class="cta-actions">
        <a class="btn light" href="${url('contact-us')}">Get in Touch ${icon('arrow')}</a>
        <a class="btn ghost" href="tel:${COMPANY.phoneHref}" style="box-shadow:inset 0 0 0 1.5px rgba(251,248,241,.5);color:#fff">${icon('phone')} ${COMPANY.phone}</a>
      </div>
    </div>
  </div>
</section>`;

/* ---------- location page ---------- */
function locationPage(svc, m) {
  const slug = locSlug(svc, m);
  const seed = hash(slug);
  const faqList = faqs(svc, m);
  const why = whyChoose(svc, m, seed);
  const hubHref = svc.hubExists ? url(svc.hubSlug) : url(svc.slug);
  // related: same service in 3 other metros of the same region (fallback: neighbors by index)
  const idx = METROS.indexOf(m);
  const sameRegion = METROS.filter(x => x !== m && x.region === m.region);
  let related = sameRegion.slice(0, 3);
  if (related.length < 3) {
    const extra = METROS.filter(x => x !== m && !related.includes(x));
    related = related.concat(extra.slice(0, 3 - related.length));
  }
  const otherSvcs = SERVICES.filter(s => s.slug !== svc.slug);

  const heroSubs = [
    `Expert ${svc.tag} for ${m.city}-area behavioral health and human services organizations.`,
    `Helping ${m.metro} providers with ${svc.tag}.`,
    `${svc.tag}, tailored to ${m.city}, ${m.state}.`,
  ];

  const main = `
<section class="page-banner">
  <span class="blob sage" style="width:360px;height:360px;top:-140px;right:-60px"></span>
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="${url('index')}">Home</a><span class="sep">/</span>
      <a href="${url('locations')}">Locations</a><span class="sep">/</span>
      <a href="${hubHref}">${esc(svc.name)}</a><span class="sep">/</span>
      <span class="current">${esc(m.city)}, ${m.abbr}</span>
    </nav>
    <span class="eyebrow" data-reveal>${esc(svc.name)} · ${esc(m.city)}, ${m.abbr}</span>
    <h1 data-reveal data-delay="1">${esc(svc.name)} in ${esc(m.city)}, ${m.abbr}</h1>
    <p class="lede banner-lede" data-reveal data-delay="2">${esc(pick(heroSubs, seed))}</p>
  </div>
</section>

<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container wide">
    <div class="blog-layout">
      <div class="rich-body">
        <p data-reveal>${esc(introPara(svc, m, seed))}</p>
        <p data-reveal>${esc(localPara(svc, m, seed + 1))}</p>

        <h2 class="subhead" data-reveal>Why ${esc(m.city)} organizations choose Joxel</h2>
        <div class="soft-card" data-reveal>
          <ul class="check-list">
            ${why.map(w => `<li><span class="tick">${icon('check')}</span><span>${esc(w)}</span></li>`).join('')}
          </ul>
        </div>

        <h2 class="subhead" data-reveal>${esc(svc.name)} services in ${esc(m.city)}</h2>
        <div class="soft-card" data-reveal>
          <ul class="check-list two">
            ${svc.caps.map(c => `<li><span class="tick">${icon('check')}</span><span>${esc(c)}</span></li>`).join('')}
          </ul>
        </div>

        <h2 class="subhead" data-reveal>Frequently asked questions</h2>
        <div class="stack" data-reveal>
          ${faqList.map(f => `<div class="soft-card" style="margin:.5rem 0"><h3 style="font-size:1.15rem;margin-bottom:.5rem">${esc(f.q)}</h3><p style="margin:0">${esc(f.a)}</p></div>`).join('')}
        </div>

        <h2 class="subhead" data-reveal>Explore more</h2>
        <p data-reveal>Other services for ${esc(m.city)}-area organizations:</p>
        <div class="stack" data-reveal>
          ${otherSvcs.map(s => `<a class="link-arrow" href="${url(locSlug(s, m))}">${esc(s.name)} in ${esc(m.city)}, ${m.abbr} ${icon('arrow')}</a>`).join('<br>')}
        </div>
        <p data-reveal style="margin-top:1.2rem"><a class="link-arrow" href="${hubHref}">All ${esc(svc.name)} services ${icon('arrow')}</a></p>
      </div>

      <aside class="sidebar">
        <div class="widget" data-reveal style="background:linear-gradient(160deg,var(--sage),var(--sage-deep));color:var(--cream)">
          <span class="eyebrow" style="color:var(--bronze-soft)">Free Consultation</span>
          <h4 style="color:#fff;margin-bottom:.7rem">${esc(svc.name)} in ${esc(m.city)}?</h4>
          <p style="color:rgba(251,248,241,.85);font-size:.95rem;margin-bottom:1.3rem">Let's talk about your goals in ${esc(m.city)}, ${m.abbr}. Our experts are ready to help.</p>
          <a class="btn light block" href="${url('contact-us')}">Get in Touch ${icon('arrow')}</a>
          <div style="margin-top:1.2rem;display:grid;gap:.55rem;font-size:.9rem">
            <a href="tel:${COMPANY.phoneHref}" style="display:flex;gap:.55rem;align-items:center;color:rgba(251,248,241,.9)">${icon('phone')} ${COMPANY.phone}</a>
            <a href="mailto:${COMPANY.email}" style="display:flex;gap:.55rem;align-items:center;color:rgba(251,248,241,.9)">${icon('mail')} ${COMPANY.email}</a>
          </div>
        </div>
        <div class="widget" data-reveal data-delay="1">
          <h4>${esc(svc.name)} nearby</h4>
          <ul>${related.map(r => `<li><a href="${url(locSlug(svc, r))}">${esc(svc.name)} in ${esc(r.city)}, ${r.abbr} ${icon('arrow')}</a></li>`).join('')}</ul>
        </div>
      </aside>
    </div>
  </div>
</section>
${cta()}`;

  const metaVariants = [
    `${svc.name} in ${m.city}, ${m.abbr}. The Joxel Group helps ${m.region} behavioral health & human services organizations ${svc.outcome}. Free consultation.`,
    `Looking for ${svc.name.toLowerCase()} in ${m.city}, ${m.state}? The Joxel Group delivers ${svc.tag} across ${m.metro}. Talk to our experts.`,
    `${svc.name} for ${m.city}-area organizations. 20+ years of ${svc.expertise} expertise serving the ${m.region}. Contact The Joxel Group today.`,
  ];
  return layout({
    slug, title: `${svc.name} in ${m.city}, ${m.abbr} | ${COMPANY.name}`,
    desc: pick(metaVariants, seed), main, jsonld: schema(svc, m, slug, faqList),
  });
}

/* ---------- service hub (national overview + all locations) ---------- */
function serviceHub(svc) {
  const slug = svc.slug;
  const cards = METROS.map((m, i) => `
    <a class="card" href="${url(locSlug(svc, m))}" data-reveal data-delay="${i % 3}" style="padding:1.2rem 1.4rem">
      <div style="display:flex;align-items:center;gap:.7rem">
        <span class="tick" style="background:rgba(107,138,122,.14)">${icon('pin')}</span>
        <div><strong style="color:var(--heading)">${esc(m.city)}, ${m.abbr}</strong><div class="muted" style="font-size:.82rem">${esc(m.metro)}</div></div>
      </div>
    </a>`).join('');
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Service', name: svc.name, serviceType: svc.serviceType,
    provider: { '@type': 'Organization', name: COMPANY.name, url: 'https://thejoxelgroup.com/' },
    areaServed: METROS.map(m => ({ '@type': 'City', name: `${m.city}, ${m.state}` })),
    url: CANON(slug),
  });
  const main = `
<section class="page-banner">
  <span class="blob sage" style="width:360px;height:360px;top:-140px;right:-60px"></span>
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="${url('index')}">Home</a><span class="sep">/</span>
      <a href="${url('locations')}">Locations</a><span class="sep">/</span>
      <span class="current">${esc(svc.name)}</span>
    </nav>
    <span class="eyebrow" data-reveal>${esc(svc.tag)}</span>
    <h1 data-reveal data-delay="1">${esc(svc.name)}</h1>
    <p class="lede banner-lede" data-reveal data-delay="2">The Joxel Group delivers ${esc(svc.name.toLowerCase())} for behavioral health and human services organizations across major U.S. markets — helping teams ${esc(svc.outcome)}.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="rich" style="max-width:760px;margin-bottom:clamp(2rem,4vw,3rem)" data-reveal>
      <div class="soft-card"><ul class="check-list two">${svc.caps.map(c => `<li><span class="tick">${icon('check')}</span><span>${esc(c)}</span></li>`).join('')}</ul></div>
    </div>
    <div class="section-head" data-reveal><span class="eyebrow">Service Areas</span><h2>${esc(svc.name)} by metropolitan market</h2></div>
    <div class="grid" style="grid-template-columns:repeat(3,1fr)">${cards}</div>
  </div>
</section>
${cta()}`;
  return layout({ slug, title: `${svc.name} Across the U.S. | ${COMPANY.name}`,
    desc: `The Joxel Group provides ${svc.name.toLowerCase()} for behavioral health & human services organizations in major U.S. metros. ${svc.tag}.`,
    main, jsonld });
}

/* ---------- locations index (AI-forward positioning) ---------- */
function locationsIndex() {
  const svcBlocks = SERVICES.map((svc, si) => {
    const links = METROS.map(m => `<a class="pill-tag" style="margin:.2rem" href="${url(locSlug(svc, m))}">${esc(m.city)}, ${m.abbr}</a>`).join(' ');
    const hubHref = svc.hubExists ? url(svc.hubSlug) : url(svc.slug);
    return `
    <div class="section-head" data-reveal style="max-width:none;margin-top:${si ? '2.6rem' : '0'};margin-bottom:1.2rem;display:flex;align-items:center;gap:.9rem">
      <span class="card-icon" style="margin:0;width:48px;height:48px">${icon(svc.ic)}</span>
      <div><span class="eyebrow" style="margin:0">${esc(svc.tag)}</span><h2 style="margin-top:.2rem"><a href="${hubHref}">${esc(svc.name)}</a></h2></div>
    </div>
    <div data-reveal style="line-height:2.4">${links}</div>`;
  }).join('');
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Locations — The Joxel Group',
    url: CANON('locations'), about: SERVICES.map(s => s.name),
  });
  const main = `
<section class="page-banner">
  <span class="blob sage" style="width:400px;height:400px;top:-160px;right:-80px"></span>
  <span class="blob blue" style="width:320px;height:320px;bottom:-120px;left:-60px"></span>
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${url('index')}">Home</a><span class="sep">/</span><span class="current">Locations</span></nav>
    <span class="eyebrow" data-reveal>AI-Forward Healthcare Consulting</span>
    <h1 data-reveal data-delay="1">Serving healthcare organizations nationwide</h1>
    <p class="lede banner-lede" data-reveal data-delay="2">From EHR and revenue cycle to a modern AI strategy, The Joxel Group partners with behavioral health and human services organizations across major U.S. metropolitan markets. Find dedicated ${SERVICES.length}-service coverage for your region below.</p>
  </div>
</section>
<section class="section" style="padding-top:clamp(2rem,4vw,3rem)">
  <div class="container">${svcBlocks}</div>
</section>
${cta()}`;
  return layout({ slug: 'locations', title: `Locations & Service Areas | ${COMPANY.name}`,
    desc: `The Joxel Group serves behavioral health & human services organizations across major U.S. metros with EHR Consulting, Revenue Cycle Management and AI Strategy.`,
    main, jsonld });
}

/* ---------- export: register all pSEO pages into the build map ---------- */
export function pseoBuild() {
  const out = {};
  out['locations'] = () => locationsIndex();
  for (const svc of SERVICES) {
    if (!svc.hubExists) out[svc.slug] = () => serviceHub(svc);
    for (const m of METROS) out[locSlug(svc, m)] = () => locationPage(svc, m);
  }
  return out;
}

export function pseoSlugs() { return Object.keys(pseoBuild()); }
