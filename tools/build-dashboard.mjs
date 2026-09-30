import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { LEGACY } from './data/legacy.mjs';
import { GESTURES } from './data/gestures.mjs';
import { cluster } from './data/clusters.mjs';
import { EXAMPLES } from './data/examples.mjs';
import { prop } from './data/props.mjs';
import { buildLessons } from './data/lessons.mjs';
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

// Giáo án giảng bài cũng là prompt, nên cũng phải có card để giáo viên tìm thấy.
// Nhãn trên card chỉ được lặp lại những gì validate.mjs bắt buộc có trong CẢ 39 file giáo án —
// thêm nhãn mới mà không có quy định tương ứng phía sau là quảng cáo khống.
const LESSON_CHIPS = [
  'GIÁO ÁN',
  'bảng phấn · vật thật',
  'vật thật → sơ đồ → phép tính',
  'tiết 35 phút · ba chặng',
  'phiếu bài tập in A4',
  'không camera vẫn dạy được',
];

const lessons = buildLessons(rows, { cluster, prop, EXAMPLES, GAMES }).map((L) => {
  const rel = `prompts/giao-an/${L.id}-${L.slug}.md`;
  if (!fs.existsSync(path.join(ROOT, rel))) throw new Error('Đường dẫn giáo án không tồn tại: ' + rel);
  return {
    id: L.id,
    name: L.ten,
    grade: L.lop,
    subject: 'Toán',
    kind: 'lesson',
    objective: L.muc_tieu,
    mission: L.khoi_dong,
    cluster: L.cluster,
    topic: cluster(L.cluster).noi_dung,
    // Giáo án không có mã cử chỉ của game: cô giáo cầm bài bằng chuột và bàn phím.
    controls: [],
    controlLabels: [],
    chips: LESSON_CHIPS,
    prompt: rel,
  };
});

const controls = Object.entries(GESTURES)
  .map(([code, g]) => ({ code, vi: g.vi, count: games.filter((x) => x.controls.includes(code)).length }))
  .filter((c) => c.count > 0);

const banner = '// SINH TỰ ĐỘNG từ catalogs/GAME_CATALOG.csv + tools/data — KHÔNG sửa tay file này.\n// Chạy: node tools/build.mjs\n';

fs.writeFileSync(
  OUT,
  banner +
    'window.MITI_CATALOG = ' +
    JSON.stringify({ generatedBy: 'tools/build-dashboard.mjs', games, legacy, lessons, controls, lessonClusters: [...new Set(lessons.map((l) => l.cluster))] }, null, 1) +
    ';\n',
  'utf8',
);

console.log(
  `Đã sinh catalogs/GAME_CATALOG.js: ${games.length} game chuẩn + ${legacy.length} legacy + ${lessons.length} giáo án (trên ${new Set(lessons.map((l) => l.cluster)).size} cụm vật thật), ${controls.length} kiểu điều khiển.`,
);
