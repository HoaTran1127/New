import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { LEGACY } from './data/legacy.mjs';
import { GESTURES } from './data/gestures.mjs';
import { cluster } from './data/clusters.mjs';
import { readCatalog } from './lib/csv.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'catalogs', 'GAME_CATALOG.js');

const rows = readCatalog(path.join(ROOT, 'catalogs', 'GAME_CATALOG.csv'));
const byId = new Map(rows.map((r) => [r.id, r]));

const games = GAMES.map((g) => {
  const r = byId.get(g.id);
  if (!r) throw new Error('Game thiếu trong GAME_CATALOG.csv: ' + g.id);
  if (!fs.existsSync(path.join(ROOT, r.prompt))) throw new Error('Đường dẫn prompt không tồn tại: ' + r.prompt);
  const cl = cluster(g.cluster);
  return {
    id: g.id,
    name: g.name,
    grade: r.lop,
    subject: r.mon,
    objective: r.muc_tieu_hoc_tap,
    mission: g.mission,
    cluster: g.cluster,
    topic: cl.noi_dung,
    controls: g.gestures,
    controlLabels: g.gestures.map((c) => GESTURES[c].vi),
    prompt: r.prompt,
  };
});

const legacy = LEGACY.map((l) => ({
  id: l.id,
  name: l.name,
  grade: l.lop,
  subject: l.mon,
  objective: l.mo_ta,
  mission: l.mo_ta,
  controls: l.gestures.split('+'),
  controlLabels: l.gestures.split('+').map((c) => GESTURES[c].vi),
  prompt: l.file,
  legacy: true,
}));

const controls = Object.entries(GESTURES)
  .map(([code, g]) => ({ code, vi: g.vi, count: games.filter((x) => x.controls.includes(code)).length }))
  .filter((c) => c.count > 0);

const banner = '// SINH TỰ ĐỘNG từ catalogs/GAME_CATALOG.csv + tools/data — KHÔNG sửa tay file này.\n// Chạy: node tools/build.mjs\n';

fs.writeFileSync(
  OUT,
  banner + 'window.MITI_CATALOG = ' + JSON.stringify({ generatedBy: 'tools/build-dashboard.mjs', games, legacy, controls }, null, 1) + ';\n',
  'utf8',
);

console.log(`Đã sinh catalogs/GAME_CATALOG.js: ${games.length} game chuẩn + ${legacy.length} legacy, ${controls.length} kiểu điều khiển.`);
