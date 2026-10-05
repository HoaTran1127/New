import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { cluster } from './data/clusters.mjs';
import { GESTURES } from './data/gestures.mjs';
import { readCatalog, writeCatalog } from './lib/csv.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const CSV = path.join(ROOT, 'catalogs', 'GAME_CATALOG.csv');
const MD = path.join(ROOT, 'catalogs', 'GAME_CATALOG.md');

const HEADER = ['id', 'ten_game', 'lop', 'mon', 'band', 'muc_tieu_hoc_tap', 'nhiem_vu', 'dieu_khien', 'chuc_nang_chinh', 'prompt'];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Mạch Tiếng Anh tổ chức theo band Cambridge YLE, không theo lớp.
const DIR_OF = { ST: 'prompts/03-english-starters', MV: 'prompts/04-english-movers', FY: 'prompts/05-english-flyers' };

const old = new Map(readCatalog(CSV).map((r) => [r.id, r]));

const rows = GAMES.map((g) => {
  const prev = old.get(g.id) || {};
  const cl = cluster(g.cluster);
  const chuc = (prev.chuc_nang_chinh || '').replace(/^"+|"+$/g, '').replace(/"/g, '');
  if (g.band && !g.slug) throw new Error('Game band ' + g.id + ' thiếu slug để đặt tên file prompt.');
  return {
    id: g.id,
    ten_game: g.name,
    lop: g.lop ?? prev.lop,
    mon: g.band ? 'Tiếng Anh' : prev.mon,
    band: g.band ?? '',
    muc_tieu_hoc_tap: cap(cl.noi_dung),
    nhiem_vu: g.mission,
    dieu_khien: g.rawGestures,
    chuc_nang_chinh: chuc || cl.tags.join('; '),
    prompt: g.band ? `${DIR_OF[g.band]}/${g.id}-${g.slug}.md` : prev.prompt,
  };
});
const thieu = rows.filter((r) => !r.lop || !r.mon || !r.prompt);
if (thieu.length) throw new Error('Catalog thiếu lop/mon/prompt cho: ' + thieu.map((r) => r.id).join(', '));

writeCatalog(CSV, HEADER, rows);

const groups = [
  { title: 'Toán lớp 4', lop: '4', mon: 'Toán' },
  { title: 'Toán lớp 5', lop: '5', mon: 'Toán' },
  { title: 'Tiếng Anh · Pre A1 Starters (Cambridge)', band: 'ST' },
  { title: 'Tiếng Anh · A1 Movers (Cambridge)', band: 'MV' },
  { title: 'Tiếng Anh · A2 Flyers (Cambridge)', band: 'FY' },
];

let md = `# 🎮 MiTi — Danh mục game\n\n**${rows.length} game có file prompt thật.** Mỗi dòng một game: mục tiêu học tập lấy theo cụm kiến thức, điều khiển là mã gesture cụ thể (không dùng MIXED), link prompt trỏ đúng file. Mạch Tiếng Anh chia theo band Cambridge YLE (Starters · Movers · Flyers), cột \`lop\` chỉ còn là chú giải SGK.\n\nNguồn dữ liệu: \`tools/data/games.mjs\` + \`tools/data/yle.mjs\`. Chạy \`node tools/build.mjs\` để dựng lại catalog, prompt và dashboard.\n`;

for (const grp of groups) {
  const sub = grp.band
    ? rows.filter((r) => r.band === grp.band)
    : rows.filter((r) => !r.band && r.mon === grp.mon && r.lop === grp.lop);
  const title = grp.title;
  md += `\n## ${title} (${sub.length})\n\n| ID | Tên game | Mục tiêu | Nhiệm vụ | Điều khiển | Prompt |\n|---|---|---|---|---|---|\n`;
  for (const r of sub) {
    md += `| ${r.id} | ${r.ten_game} | ${r.muc_tieu_hoc_tap} | ${r.nhiem_vu} | ${r.dieu_khien.split('+').map((c) => `\`${c}\``).join(' + ')} | [Mở prompt](../${r.prompt.replace(/\\/g, '/')}) |\n`;
  }
}

md += `\n## Gesture được dùng\n\n| Mã | Tên tiếng Việt | Số game |\n|---|---|---|\n`;
for (const [code, g] of Object.entries(GESTURES)) {
  const n = rows.filter((r) => r.dieu_khien.split('+').includes(code)).length;
  if (n) md += `| \`${code}\` | ${g.vi} | ${n} |\n`;
}

fs.writeFileSync(MD, md, 'utf8');
console.log(`Đã dựng catalogs/GAME_CATALOG.csv + .md: ${rows.length} game, ${groups.length} nhóm lớp/môn.`);
