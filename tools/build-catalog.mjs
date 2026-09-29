import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { cluster } from './data/clusters.mjs';
import { GESTURES } from './data/gestures.mjs';
import { readCatalog, writeCatalog } from './lib/csv.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const CSV = path.join(ROOT, 'catalogs', 'GAME_CATALOG.csv');
const MD = path.join(ROOT, 'catalogs', 'GAME_CATALOG.md');

const HEADER = ['id', 'ten_game', 'lop', 'mon', 'muc_tieu_hoc_tap', 'nhiem_vu', 'dieu_khien', 'chuc_nang_chinh', 'prompt'];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const old = new Map(readCatalog(CSV).map((r) => [r.id, r]));

const rows = GAMES.map((g) => {
  const prev = old.get(g.id);
  if (!prev) throw new Error('Thiếu dòng trong GAME_CATALOG.csv: ' + g.id);
  const cl = cluster(g.cluster);
  const chuc = (prev.chuc_nang_chinh || '').replace(/^"+|"+$/g, '').replace(/"/g, '');
  return {
    id: g.id,
    ten_game: g.name,
    lop: prev.lop,
    mon: prev.mon,
    muc_tieu_hoc_tap: cap(cl.noi_dung),
    nhiem_vu: g.mission,
    dieu_khien: g.rawGestures,
    chuc_nang_chinh: chuc || cl.tags.join('; '),
    prompt: prev.prompt,
  };
});

writeCatalog(CSV, HEADER, rows);

const groups = [
  ['4', 'Toán', 'Toán lớp 4'],
  ['5', 'Toán', 'Toán lớp 5'],
  ['4', 'Tiếng Anh', 'Tiếng Anh lớp 4'],
  ['5', 'Tiếng Anh', 'Tiếng Anh lớp 5'],
];

let md = `# 🎮 MiTi — Danh mục game\n\n**${rows.length} game có file prompt thật.** Mỗi dòng một game: mục tiêu học tập lấy theo cụm kiến thức, điều khiển là mã gesture cụ thể (không dùng MIXED), link prompt trỏ đúng file.\n\nNguồn dữ liệu: \`tools/data/games.mjs\`. Chạy \`node tools/build.mjs\` để dựng lại catalog, prompt và dashboard.\n`;

for (const [lop, mon, title] of groups) {
  const sub = rows.filter((r) => r.lop === lop && r.mon === mon);
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
