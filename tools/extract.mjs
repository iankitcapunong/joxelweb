import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const RAW = 'raw';
const OUT = 'content';
fs.mkdirSync(OUT, { recursive: true });

const pages = fs.readFileSync('urls.txt', 'utf8').trim().split('\n').map(l => {
  const [p, slug] = l.split('|');
  return { path: p, slug };
});

const clean = s => (s || '').replace(/\s+/g, ' ').trim();

function blocksFrom($, root) {
  const out = [];
  const walk = (el) => {
    $(el).contents().each((_, node) => {
      if (node.type === 'tag') {
        const tag = node.tagName.toLowerCase();
        const $n = $(node);
        if (['h1','h2','h3','h4','h5','h6'].includes(tag)) {
          const t = clean($n.text());
          if (t) out.push({ type: tag, text: t });
        } else if (tag === 'p') {
          const t = clean($n.text());
          if (t) out.push({ type: 'p', text: t });
        } else if (tag === 'ul' || tag === 'ol') {
          const items = [];
          $n.children('li').each((__, li) => { const t = clean($(li).text()); if (t) items.push(t); });
          if (items.length) out.push({ type: 'list', ordered: tag === 'ol', items });
        } else if (tag === 'img') {
          const src = $n.attr('src') || $n.attr('data-src') || '';
          out.push({ type: 'img', src, alt: clean($n.attr('alt')) });
        } else if (tag === 'a') {
          const href = $n.attr('href') || '';
          const t = clean($n.text());
          const cls = $n.attr('class') || '';
          if (t && (cls.includes('button') || cls.includes('btn') || cls.includes('read'))) {
            out.push({ type: 'button', text: t, href });
          } else {
            walk(node);
          }
        } else if (tag === 'br' || tag === 'script' || tag === 'style' || tag === 'noscript') {
          // skip
        } else {
          walk(node);
        }
      }
    });
  };
  walk(root);
  // dedupe consecutive identical blocks
  const dedup = [];
  for (const b of out) {
    const key = JSON.stringify(b);
    if (dedup.length && JSON.stringify(dedup[dedup.length-1]) === key) continue;
    dedup.push(b);
  }
  return dedup;
}

const result = {};

for (const pg of pages) {
  const file = path.join(RAW, pg.slug + '.html');
  if (!fs.existsSync(file)) continue;
  const $ = cheerio.load(fs.readFileSync(file, 'utf8'));
  $('#main').find('script,style,noscript').remove();

  let title = clean($('title').text());
  let banner = clean($('.innerbanner').text());
  let container = $('.content-area');
  if (!container.length) container = $('#main');

  const blocks = blocksFrom($, container.get(0));
  result[pg.slug] = { slug: pg.slug, path: pg.path, title, banner, blocks };

  // readable markdown
  let md = `# ${pg.slug}  (${pg.path})\nTITLE: ${title}\n\n`;
  for (const b of blocks) {
    if (b.type.startsWith('h')) md += `\n${'#'.repeat(+b.type[1])} ${b.text}\n`;
    else if (b.type === 'p') md += `${b.text}\n\n`;
    else if (b.type === 'list') md += b.items.map(i => `- ${i}`).join('\n') + '\n\n';
    else if (b.type === 'img') md += `![${b.alt}](${b.src})\n`;
    else if (b.type === 'button') md += `[BTN: ${b.text}](${b.href})\n`;
  }
  fs.writeFileSync(path.join(OUT, pg.slug + '.md'), md);
}

fs.writeFileSync(path.join(OUT, '_all.json'), JSON.stringify(result, null, 2));
console.log('Extracted', Object.keys(result).length, 'pages');
for (const s of Object.keys(result)) console.log(' ', s.padEnd(26), result[s].blocks.length, 'blocks');
