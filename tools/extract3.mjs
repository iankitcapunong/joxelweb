import * as cheerio from 'cheerio';
import fs from 'fs';

const clean = s => (s || '').replace(/\s+/g, ' ').trim();
const localImg = s => s ? 'assets/img/' + s.split('?')[0].split('/').pop() : '';

function posts(file) {
  const $ = cheerio.load(fs.readFileSync('raw/' + file, 'utf8'));
  const out = [];
  $('article.hentry, article.post').each((_, art) => {
    const $a = $(art);
    const $t = $a.find('.post-title a').first();
    const title = clean($t.text());
    const link = $t.attr('href') || '';
    const date = clean($a.find('.post-date').first().text());
    const cats = $a.find('.post-categories a').map((_, a) => clean($(a).text())).get();
    let img = $a.find('img').first().attr('src') || '';
    // excerpt: entry-content / excerpt paragraph
    let excerpt = clean($a.find('.entry-content, .entry-summary, .post-content').first().text());
    if (!excerpt) excerpt = clean($a.find('p').first().text());
    out.push({ title, link, date, cats, img: img && img.includes('uploads') ? localImg(img) : '', excerpt });
  });
  return out;
}

const p1 = posts('blog.html');
const p2 = posts('blog2.html');
const all = [...p1, ...p2];

const data = JSON.parse(fs.readFileSync('content/data.json', 'utf8'));
data.blog.posts = all;
data.blog.categories = ['Healthcare Solutions', 'Electronic Health Records', 'Joxel Blog', 'Joxel Spotlights'];
data.blog.archives = ['May 2024', 'September 2023', 'January 2022', 'October 2021', 'September 2021', 'June 2021', 'March 2021', 'January 2021', 'July 2020', 'May 2020', 'March 2020', 'December 2019'];
fs.writeFileSync('content/data.json', JSON.stringify(data, null, 2));

console.log('total posts:', all.length);
for (const p of all) console.log(` - ${p.date.padEnd(20)} | img:${p.img ? 'Y' : 'n'} | ex:${p.excerpt.length} | ${p.title}`);
// emit image url list for page2
const need = all.filter(p => p.img).map(p => p.img.replace('assets/img/', ''));
fs.writeFileSync('content/_blogimgs.txt', need.join('\n'));
