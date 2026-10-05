// tools/validate.mjs — bộ kiểm prompt bản nén (v2, hậu CORE_LINES).
// Kiến trúc mới: mỗi prompt game = header + khối ```text 5 mục + ghi chú; 26 module quy định
// cũ đã được thay bằng 14 dòng CORE trong tools/lib/core.mjs, nên bộ kim needle cũ (~270 chuỗi)
// không còn áp dụng. File này chỉ kiểm hợp đồng cấu trúc mới + trần độ dài + chuỗi cấm.
import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { LEGACY } from './data/legacy.mjs';
import { GESTURES, BANK } from './data/gestures.mjs';
import { cluster, CLUSTER_KEYS } from './data/clusters.mjs';
import { standard } from './data/standards.mjs';
import { EXAMPLES } from './data/examples.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { readCatalog } from './lib/csv.mjs';
import { CORE, CORE_LINES, CORE_TITLE, CORE_SHORT } from './lib/core.mjs';
import { identity } from './data/identities.mjs';
import { sport } from './data/sports.mjs';
import { folk } from './data/folk.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const errors = [];
const bad = (msg) => errors.push(msg);
const alarms = [];

// Windows từng đổi file sang CRLF làm regex đầu dòng lek — chuẩn hóa ngay tại cửa đọc.
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const bytes = (text) => Buffer.byteLength(text, 'utf8');

const MAX_BYTES = 15000; // Trần độ dài: prompt > trần này làm Gemini sinh game lỗi.
if (CORE_LINES.length !== 14) bad(`CORE_LINES phải có đúng 14 dòng, hiện ${CORE_LINES.length} — sửa tools/lib/core.mjs.`);

// ── 0. Hard-fail đồng bộ dữ liệu lỗi: errorTag câu mẫu ↔ tag cụm ↔ ghi chú lỗi ──
// Ba điều kiện bất biến để jsonBlock không bao giờ rơi loiViet về notes[0]:
//   (1) mọi tag cụm là mã máy ASCII /^[a-z0-9_]+$/; (2) số mục ERROR_NOTES == số tags;
//   (3) mọi errorTag trong EXAMPLES nằm trong tags của đúng cụm. Lệch là DỪNG BUILD.
{
  const TAG_RE = /^[a-z0-9_]+$/;
  const lech = [];
  for (const key of CLUSTER_KEYS) {
    const tags = cluster(key).tags;
    for (const t of tags) {
      if (!TAG_RE.test(t)) lech.push(`[tag sai định dạng] ${key}: "${t}" phải khớp /^[a-z0-9_]+$/ (không dấu, không khoảng trắng, không hoa).`);
    }
    const notes = (ERROR_NOTES[key] ?? '').split('; ');
    if (notes.length !== tags.length) {
      lech.push(`[đếm lệch] ${key}: ERROR_NOTES có ${notes.length} mục nhưng tags có ${tags.length} — phải bằng nhau để tag[i] ↔ notes[i].`);
    }
    (EXAMPLES[key] ?? []).forEach((e, i) => {
      if (!tags.includes(e.errorTag)) lech.push(`[errorTag lạc] ${key}[${i}]: "${e.errorTag}" không thuộc tags [${tags.join(', ')}].`);
    });
  }
  if (lech.length) throw new Error('Lệch dữ liệu lỗi (hard-fail) — ' + lech.length + ' vấn đề:\n' + lech.map((x) => '  • ' + x).join('\n'));
}

// ── 1. Catalog: đúng 85 dòng, khớp id với tools/data/games.mjs, đường dẫn prompt tồn tại ──
const CAT_REL = 'catalogs/GAME_CATALOG.csv';
let rows = [];
if (!exists(CAT_REL)) {
  bad(`Thiếu ${CAT_REL} — chạy \`node tools/build-catalog.mjs\`.`);
} else {
  rows = readCatalog(path.join(ROOT, CAT_REL));
  if (rows.length !== 85) bad(`GAME_CATALOG.csv phải có đúng 85 dòng game, hiện ${rows.length}.`);
  const catIds = new Set(rows.map((r) => r.id));
  const gameIds = new Set(GAMES.map((g) => g.id));
  for (const id of gameIds) if (!catIds.has(id)) bad(`Catalog thiếu game ${id} (có trong games.mjs).`);
  for (const id of catIds) if (!gameIds.has(id)) bad(`Catalog có id ${id} không tồn tại trong games.mjs.`);
  if (GAMES.length !== 85) bad(`games.mjs phải có 85 game, hiện ${GAMES.length}.`);
}

// ── 2. Kiểm một prompt theo hợp đồng mới: 5 mục + 14 dòng CORE + trường dữ liệu riêng game ──
const SECTION_TITLES = [
  '1. Ý TƯỞNG',
  '2. MỤC TIÊU HỌC TẬP',
  CORE_TITLE,
  '4. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)',
  '5. TỰ KIỂM TRA TRƯỚC KHI XUẤT',
];
const CJK_RE = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/;
const FORBIDDEN_LIB_RE = /@mediapipe\/hands|@mediapipe\/camera_utils|cdn\.tailwindcss\.com/;

// Mục phải xuất hiện đúng 1 lần với số thứ tự tăng dần, và có ít nhất 1 dòng "- " (không rỗng).
function checkSections(text, where) {
  let last = -1;
  const lines = text.split('\n');
  for (const title of SECTION_TITLES) {
    const idxs = [];
    lines.forEach((l, i) => { if (l.replace(/\s+$/, '') === title) idxs.push(i); });
    if (idxs.length === 0) { bad(`${where}: thiếu mục "${title.slice(0, 40)}".`); continue; }
    if (idxs.length > 1) bad(`${where}: mục "${title.slice(0, 40)}" xuất hiện ${idxs.length} lần (phải đúng 1).`);
    const i = idxs[0];
    if (i <= last) bad(`${where}: mục "${title.slice(0, 40)}" sai thứ tự (phải sau mục trước).`);
    last = i;
    const next = lines.slice(i + 1).findIndex((l) => SECTION_TITLES.includes(l.replace(/\s+$/, '')));
    const body = lines.slice(i + 1, next === -1 ? undefined : i + 1 + next);
    if (!body.some((l) => l.startsWith('- ') || l.startsWith('  '))) bad(`${where}: mục "${title.slice(0, 40)}" rỗng — không có dòng nội dung nào.`);
  }
}

function checkCore(text, where) {
  for (const line of CORE_LINES) {
    if (!text.includes(line)) bad(`${where}: thiếu 1 dòng CORE (thiếu bất kỳ dòng nào là hỏng): "${line.slice(0, 60)}…"`);
  }
}

function checkLength(rel, text, where) {
  const b = bytes(text);
  if (b > MAX_BYTES) {
    bad(`${where}: VƯỢT TRẦN ĐỘ DÀI — ${b} byte > ${MAX_BYTES}. File ngắn lại hoặc tách quy định chung vào tools/lib/core.mjs.`);
    alarms.push(`⚠ BÁO ĐỘNG ĐỘ DÀI: ${rel} = ${b} byte (trần ${MAX_BYTES}).`);
  }
  return b;
}

// ── 3. 85 prompt game ──
const byId = new Map(rows.map((r) => [r.id, r]));
const sizeStats = [];
for (const g of GAMES) {
  const row = byId.get(g.id);
  if (!row) continue; // đã báo ở mục catalog
  const rel = row.prompt;
  const where = `prompt ${g.id} (${rel})`;
  if (!exists(rel)) { bad(`${where}: file không tồn tại — chạy \`node tools/build-prompts.mjs\`.`); continue; }
  const text = read(rel);
  const b = checkLength(rel, text, where);
  sizeStats.push({ rel, b });

  // Khung file: # <ID> — <Tên>, 1 khối ```text, khối ghi chú cuối file.
  if (!text.startsWith(`# ${g.id} — `)) bad(`${where}: dòng đầu phải là "# ${g.id} — <Tên game>".`);
  if (!text.includes('## Ghi chú cho người tạo prompt (không gửi Gemini)')) bad(`${where}: thiếu khối "## Ghi chú cho người tạo prompt (không gửi Gemini)".`);
  const fence = text.match(/^```text\n([\s\S]*?)\n```$/m);
  if (!fence) { bad(where + ': không tìm thấy khối ```text ... ``` (prompt gửi Gemini nằm ở đây).'); continue; }
  const fences = (text.match(/^```/gm) || []).length / 2;
  if (fences !== 1) bad(where + ': phải có ĐÚNG 1 khối ```text, hiện có ' + fences + ' khối.');
  checkSections(fence[1], where);
  checkCore(text, where);

  // Chữ ký MiTi bắt buộc trong mọi prompt.
  for (const s of ['#FFD84D', '#07111F', 'MiTi • Học bằng chuyển động']) {
    if (!text.includes(s)) bad(`${where}: thiếu chữ ký MiTi "${s}".`);
  }

  // Chuỗi cấm: ${, CJK, TODO/pseudocode (ngoài trừ 14 dòng CORE đã nêu chúng trong câu cấm).
  if (text.includes('${')) bad(`${where}: chứa chuỗi cấm "\${" (placeholder lọt từ template — Gemini sẽ đổ lỗi cú pháp).`);
  const cjk = text.match(CJK_RE);
  if (cjk) bad(`${where}: chứa ký tự CJK "${cjk[0]}" — mọi bản gửi Gemini phải thuần tiếng Việt.`);
  const noCore = CORE_LINES.reduce((acc, l) => acc.split(l).join(''), text);
  for (const word of ['TODO', 'pseudocode']) {
    if (noCore.includes(word)) bad(`${where}: chứa chuỗi cấm "${word}" ngoài 14 dòng CORE.`);
  }

  // Giữ lại từ validator cũ (bản đơn giản): không được pin API MediaPipe cũ hoặc Tailwind CDN.
  const libHit = text.match(FORBIDDEN_LIB_RE);
  if (libHit) bad(`${where}: nhắc tới phụ thuộc bị cấm "${libHit[0]}" — chỉ dùng @mediapipe/tasks-vision@1.0.1.`);

  // Trường dữ liệu riêng game — phải lấy nguyên văn từ tools/data, không được rỗng/lệch.
  const cl = cluster(g.cluster);
  const st = standard(g.cluster);
  const sp = sport(g.gestures[0]);
  const fk = folk(g.gestures[0]);
  const it = identity(g.id);
  const main = GESTURES[g.gestures[0]];
  const bank = BANK[row.mon];
  const errList = ERROR_NOTES[g.cluster];
  const need = [
    [g.setting, 'bối cảnh (games.mjs)'],
    [g.mission, 'nhiệm vụ mỗi lượt (games.mjs)'],
    [it && it.mascot, 'tên mascot (identities.mjs)'],
    [it && it.signature, 'khoảnh khắc chữ ký (identities.mjs)'],
    [sp && sp.mon, 'môn thể thao (sports.mjs)'],
    [fk && fk.tro, 'trò chơi dân gian (folk.mjs)'],
    [main && main.fallback, 'dòng fallback không camera (gestures.mjs)'],
    [cl && cl.noi_dung, 'nội dung cụm kiến thức (clusters.mjs)'],
    [st && st.yc, 'dòng "Yêu cầu cần đạt" (standards.mjs)'],
    [errList, 'danh sách lỗi học sinh (error-notes.mjs)'],
    [bank && `Tối thiểu ${bank.so} mục`, `số mục ngân hàng tối thiểu (${row.mon})`],
    ['{ id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }', 'khuôn QUESTION_DATA'],
    [CORE_SHORT, 'bản rút gọn CORE ở mục tự kiểm'],
  ];
  for (const [needle, label] of need) {
    if (!needle) { bad(`${where}: dữ liệu nguồn "${label}" thiếu trong tools/data — không có gì để kiểm.`); continue; }
    if (!text.includes(needle)) bad(`${where}: thiếu ${label} ("${String(needle).slice(0, 52)}…") trong prompt.`);
  }
  for (const hex of (it ? it.palette : [])) {
    if (!text.includes(hex)) bad(`${where}: thiếu mã màu riêng game ${hex} (identities.mjs).`);
  }
}

// ── 4. Bản sắc riêng: mascot + bảng màu không được trùng giữa 85 game (giữ từ validator cũ) ──
{
  const seenMascot = new Map();
  const seenPalette = new Map();
  for (const g of GAMES) {
    const it = identity(g.id);
    if (!it) continue;
    if (seenMascot.has(it.mascot)) bad(`Mascot "${it.mascot}" trùng giữa ${seenMascot.get(it.mascot)} và ${g.id}.`);
    seenMascot.set(it.mascot, g.id);
    const key = it.palette.join('|');
    if (seenPalette.has(key)) bad(`Bảng màu ${key} trùng giữa ${seenPalette.get(key)} và ${g.id}.`);
    seenPalette.set(key, g.id);
  }
}

// ── 5. Brand/document: master + template phải mang đủ CORE và nằm trong trần dài ──
for (const rel of ['prompts/00-master-canvas-prompt.md', 'prompts/templates/game-prompt-template.md']) {
  if (!exists(rel)) { bad(`Thiếu ${rel} — đang được viết lại theo hợp đồng 14 dòng CORE.`); continue; }
  const text = read(rel);
  checkLength(rel, text, rel);
  checkCore(text, rel);
}

// ── 6. VARIANTS_425.md: đúng 425 block, mỗi block ≤ trần ──
{
  const rel = 'prompts/VARIANTS_425.md';
  if (!exists(rel)) {
    bad(`Thiếu ${rel} — chạy \`node tools/build-variants.mjs\`.`);
  } else {
    const text = read(rel);
    const parts = text.split(/^## Prompt /m);
    const blocks = parts.slice(1);
    if (blocks.length !== 425) bad(`${rel}: phải có đúng 425 block "## Prompt NNN", hiện ${blocks.length}.`);
    blocks.forEach((b, i) => {
      const size = bytes(b);
      if (size > MAX_BYTES) {
        bad(`${rel}: block #${i + 1} vượt trần — ${size} byte > ${MAX_BYTES}.`);
        alarms.push(`⚠ BÁO ĐỘNG ĐỘ DÀI: ${rel} block #${i + 1} = ${size} byte (trần ${MAX_BYTES}).`);
      }
    });
  }
}

// ── 7. 12 prompt legacy: ≤ trần + đủ 14 dòng CORE (upgrade-legacy.mjs lo phần viết lại) ──
for (const l of LEGACY) {
  if (!exists(l.file)) { bad(`Legacy ${l.id}: thiếu ${l.file}.`); continue; }
  const text = read(l.file);
  checkLength(l.file, text, `legacy ${l.id} (${l.file})`);
  checkCore(text, `legacy ${l.id} (${l.file})`);
}

// ── 8. Tổng kết đo được ──
const total = sizeStats.reduce((s, x) => s + x.b, 0);
const max = sizeStats.reduce((m, x) => (x.b > m.b ? x : m), { rel: '-', b: 0 });
console.log(`Đo 85 prompt game: ${sizeStats.length} file đã đọc, tổng ${total.toLocaleString('vi')} byte, `
  + `trung bình ${sizeStats.length ? Math.round(total / sizeStats.length).toLocaleString('vi') : 0} byte/file, `
  + `lớn nhất ${max.b.toLocaleString('vi')} byte (${max.rel}). Trần ${MAX_BYTES} byte.`);
if (alarms.length) console.warn(alarms.join('\n'));

if (errors.length) {
  console.error('Xác minh thất bại — ' + errors.length + ' vấn đề:');
  for (const e of errors.slice(0, 60)) console.error('  • ' + e);
  if (errors.length > 60) console.error('  ... và ' + (errors.length - 60) + ' vấn đề khác.');
  process.exit(1);
}
console.log(`Xác minh đạt: ${rows.length} dòng catalog, ${GAMES.length} prompt game (CORE ${CORE.split('\n').length} dòng), `
  + 'master + template, VARIANTS 425 block, ' + LEGACY.length + ' prompt legacy.');
