import * as cheerio from 'cheerio';
import fs from 'fs';

const clean = s => (s || '').replace(/\s+/g, ' ').trim();
const load = f => cheerio.load(fs.readFileSync('raw/' + f, 'utf8'));
const localImg = src => 'assets/img/' + (src || '').split('?')[0].split('/').pop();

const data = {};

// ---------- Testimonials (from home, complete set) ----------
{
  const $ = load('home.html');
  const seen = new Set();
  const list = [];
  $('figcaption').each((_, fc) => {
    const $fc = $(fc);
    const org = clean($fc.find('h4').first().text());
    const person = clean($fc.find('h6').first().text());
    const quote = clean($fc.find('.testimonial-content, p').first().text());
    if (org && quote && !seen.has(org + quote)) {
      seen.add(org + quote);
      list.push({ org, person, quote });
    }
  });
  data.testimonials = list;
}

// ---------- Leaders ----------
{
  const $ = load('our-leaders.html');
  const leaders = [];
  $('.content-area figure, .content-area .team-member, .content-area .our-team, .content-area li, .content-area .column, .content-area article').each(() => {});
  // Robust: iterate h3 (names) inside content-area
  $('.content-area h3').each((_, h) => {
    const $h = $(h);
    const name = clean($h.text());
    const role = clean($h.nextAll('h6').first().text()) || clean($h.parent().find('h6').first().text());
    // find nearby excerpt paragraph and image
    let $scope = $h.closest('figcaption').length ? $h.closest('figure') : $h.parent();
    let img = $scope.find('img').first().attr('src') || $scope.prevAll().find('img').first().attr('src');
    let excerpt = clean($scope.find('p').first().text());
    let link = $scope.find('a').filter((_, a) => /read more/i.test($(a).text())).first().attr('href') || '';
    if (name) leaders.push({ name, role, excerpt, img: img ? localImg(img) : '', link });
  });
  data.leaders = leaders;
}

// ---------- Blog posts (both list pages structure identical) ----------
{
  const $ = load('blog.html');
  const posts = [];
  $('.content-area h3').each((_, h) => {
    const $h = $(h);
    const title = clean($h.text());
    if (!title || /^(Category|Archives|Recent Posts)$/i.test(title)) return;
    let $scope = $h.parent();
    let excerpt = clean($scope.find('p').first().text()) || clean($h.nextAll('p').first().text());
    let img = $scope.find('img').first().attr('src') || $h.nextAll('img').first().attr('src')
      || $h.prevAll('img').first().attr('src');
    let link = $scope.find('a').filter((_, a) => /read more/i.test($(a).text())).first().attr('href')
      || $h.nextAll('a').filter((_, a) => /read more/i.test($(a).text())).first().attr('href') || '';
    posts.push({ title, excerpt, img: img && img.includes('uploads') ? localImg(img) : '', link });
  });
  // sidebar
  const cats = [], archives = [];
  $('.content-area h3, .content-area h4').each((_, h) => {
    const t = clean($(h).text());
    if (t === 'Category' || t === 'Categories') $(h).nextAll('ul').first().find('li').each((_, li) => cats.push(clean($(li).text())));
    if (t === 'Archives') $(h).nextAll('ul').first().find('li').each((_, li) => archives.push(clean($(li).text())));
  });
  data.blog = { posts, categories: cats, archives };
}

// ---------- Home service cards (excerpt trio) ----------
{
  const $ = load('home.html');
  const cards = [];
  $('#main h4').each((_, h) => {
    const t = clean($(h).text());
    if (['Healthcare Consulting', 'Strategic Consulting', 'Strategic Services'].includes(t)) {
      const p = clean($(h).nextAll('p').first().text()) || clean($(h).parent().find('p').first().text());
      if (p) cards.push({ title: t, text: p });
    }
  });
  // dedupe by title
  const uniq = [];
  const s = new Set();
  for (const c of cards) if (!s.has(c.title)) { s.add(c.title); uniq.push(c); }
  data.homeCards = uniq;
}

// ---------- Joxel 365 community orgs (images) ----------
{
  const $ = load('joxel-365.html');
  const imgs = [];
  $('.content-area img').each((_, im) => { const s = $(im).attr('src'); if (s) imgs.push({ src: localImg(s), alt: clean($(im).attr('alt')) }); });
  data.community = { images: imgs };
}

// ---------- Client logos (testimonials page) ----------
{
  const $ = load('client-testimonials.html');
  const logos = [];
  $('.content-area img').each((_, im) => { const s = $(im).attr('src'); if (s) logos.push({ src: localImg(s), alt: clean($(im).attr('alt')) }); });
  data.clientLogos = logos;
}

fs.writeFileSync('content/data.json', JSON.stringify(data, null, 2));
console.log('testimonials:', data.testimonials.length);
console.log('leaders:', data.leaders.length, data.leaders.map(l => l.name).join(', '));
console.log('blog posts:', data.blog.posts.length);
console.log('home cards:', data.homeCards.length);
console.log('community imgs:', data.community.images.length);
console.log('client logos:', data.clientLogos.length);
