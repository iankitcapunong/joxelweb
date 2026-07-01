import * as cheerio from 'cheerio';
import fs from 'fs';

const clean = s => (s || '').replace(/\s+/g, ' ').trim();
const localImg = s => s ? 'assets/img/' + s.split('?')[0].split('/').pop() : '';

const slugs = ['neel-eswara', 'nicki-maslanka', 'zubair-dhala', 'mica-yurk', 'lisa-gillen', 'susan-hutton', 'nan-pilllai', 'sushil-pillai'];
const team = [];
const imgsNeeded = [];

for (const slug of slugs) {
  const $ = cheerio.load(fs.readFileSync('raw/team/' + slug + '.html', 'utf8'));
  const ca = $('.content-area');
  ca.find('script,style,noscript').remove();
  const name = clean(ca.find('h1').first().text());
  const role = clean(ca.find('h2,h3,h4,h5,h6').first().text());
  let img = ca.find('img').first().attr('src') || '';
  const bio = [];
  ca.find('p').each((_, p) => { const t = clean($(p).text()); if (t) bio.push(t); });
  const li = localImg(img);
  if (li) imgsNeeded.push(li.replace('assets/img/', ''));
  team.push({ slug, name, role, img: li, bio });
}

fs.writeFileSync('content/team.json', JSON.stringify(team, null, 2));
fs.writeFileSync('content/_teamimgs.txt', [...new Set(imgsNeeded)].join('\n'));
for (const t of team) console.log(`${t.name.padEnd(16)} | ${t.role.padEnd(34)} | paras:${t.bio.length} | img:${t.img.replace('assets/img/', '')}`);
