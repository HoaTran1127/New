import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { GAMES } from './data/games.mjs';
import { LEGACY } from './data/legacy.mjs';
import { GESTURES } from './data/gestures.mjs';
import { CLUSTER_KEYS, cluster } from './data/clusters.mjs';
import { EXAMPLES } from './data/examples.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { BASELINE } from './data/baseline.mjs';
import { readCatalog } from './lib/csv.mjs';
import { RULES } from './lib/rules.mjs';
import { MOTION, FEEL } from './lib/feel.mjs';
import { CLASSROOM } from './lib/classroom.mjs';
import { ACCESS } from './lib/access.mjs';
import { VERIFY, ADAPT } from './lib/verify.mjs';
import { HUMAN_CHECKS } from './lib/acceptance.mjs';
import { PE, PE_NO_CAMERA } from './lib/pe.mjs';
import { MEMORY } from './lib/memory.mjs';
import { HYPE } from './lib/hype.mjs';
import { PLAYERS, isFingerGame } from './lib/players.mjs';
import { INPUT } from './lib/input.mjs';
import { COMPETE } from './lib/compete.mjs';
import { EFFECTS } from './lib/effects.mjs';
import {
  SECTIONS, SIZE_RATIO, SCREEN_FLOW, NO_ADS_LINE, MITI_LINES, FINGER_MAYBE_PREFIX,
  SCORE_LINE, WRONG_LINE, SUMMARY_LINE, PRIVACY_LINE,
} from './lib/skeleton.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const errors = [];
const bad = (msg) => errors.push(msg);
// Mọi phép đo trên văn bản đã chuẩn hóa xuống dòng (cùng đơn vị với tools/data/baseline.mjs).
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
const count = (t, needle) => t.split(needle).length - 1;
const short = (s, n = 40) => (s.length > n ? s.slice(0, n) + '...' : s);

const rows = readCatalog(path.join(ROOT, 'catalogs', 'GAME_CATALOG.csv'));

// 1. Catalog: đúng 85 dòng, id duy nhất, file prompt tồn tại, gesture hợp lệ, không còn MIXED.
if (rows.length !== 85) bad(`GAME_CATALOG.csv phải có 85 dòng game, hiện có ${rows.length}.`);
const seen = new Set();
for (const r of rows) {
  if (seen.has(r.id)) bad(`Trùng id trong catalog: ${r.id}`);
  seen.add(r.id);
  if (!fs.existsSync(path.join(ROOT, r.prompt))) bad(`${r.id}: file prompt không tồn tại (${r.prompt}).`);
  if (/MIXED/i.test(r.dieu_khien)) bad(`${r.id}: điều khiển vẫn là MIXED.`);
  for (const c of r.dieu_khien.split('+')) if (!GESTURES[c]) bad(`${r.id}: mã điều khiển không có trong GESTURES (${c}).`);
  for (const [k, v] of Object.entries(r)) if (v.startsWith('"') || v.endsWith('"')) bad(`${r.id}: giá trị cột ${k} còn dấu nháy lọt (${v}).`);
  if (!r.muc_tieu_hoc_tap || !r.nhiem_vu) bad(`${r.id}: thiếu mục tiêu hoặc nhiệm vụ.`);
}

// 1b. GESTURES là nguồn duy nhất của khối điều khiển: 14 mã (10 catalog + 4 mở rộng), mỗi mã phải đủ 9 trường.
// Thiếu trường `ar` thì prompt chỉ còn mô tả cử chỉ trên nền trắng, không còn chất AR.
const GESTURE_FIELDS = ['vi', 'landmark', 'hinh_hoc', 'muot', 'nguong', 'nguoi_choi', 'bien_do', 'ar', 'fallback'];
if (Object.keys(GESTURES).length !== 14) {
  bad(`GESTURES phải có đúng 14 mã điều khiển (10 mã catalog + CLAP/PINCH/HOLD_POSE/FINGER_COUNT), hiện có ${Object.keys(GESTURES).length}.`);
}
for (const [code, g] of Object.entries(GESTURES)) {
  for (const f of GESTURE_FIELDS) if (!g[f] || !String(g[f]).trim()) bad(`GESTURES.${code}: thiếu trường ${f}.`);
}

// ─── Bảng kiểm dùng chung ───────────────────────────────────────────────────
// Heading: đúng các tiêu đề SECTIONS, mỗi tiêu đề đúng một dòng, theo thứ tự, bốn Core_Section trước mục dữ liệu.
const MUST = SECTIONS.map((s) => s.title);
const DATA_IDX = SECTIONS.findIndex((s) => s.key === 'data');
function checkHeadings(id, t) {
  const pos = MUST.map((title) => {
    const needle = '\n' + title + '\n';
    const n = count(t, needle);
    if (n !== 1) bad(`${id}: heading "${title}" xuất hiện ${n} lần (cần đúng 1).`);
    return t.indexOf(needle);
  });
  for (let i = 1; i < pos.length; i++) {
    if (pos[i - 1] >= 0 && pos[i] >= 0 && pos[i] <= pos[i - 1]) bad(`${id}: mục "${MUST[i]}" đứng trước "${MUST[i - 1]}" — sai thứ tự SECTIONS.`);
  }
  const lastCore = Math.max(...SECTIONS.map((s, i) => (s.core ? pos[i] : -1)));
  if (pos[DATA_IDX] >= 0 && lastCore > pos[DATA_IDX]) bad(`${id}: Core_Section phải đứng trước "${MUST[DATA_IDX]}".`);
}

// Hợp đồng AR: thiếu một trong các ràng buộc này thì game chỉ còn là canvas 2D có webcam kèm theo.
const AR_RULES = [
  [/toScreen\(lx, ly\)/, 'thiếu hàm chiếu toScreen'],
  [/Math\.max\(W \/ video\.videoWidth/, 'thiếu công thức cover-fit cho khung hình camera'],
  [/alpha không vượt 0\.45/, 'thiếu trần alpha của lớp phủ tối'],
  [/z từ 1\.6/, 'thiếu chiều sâu z của vật thể AR'],
  [/NEO VÀO CƠ THỂ/, 'thiếu quy tắc neo vật thể ảo vào landmark'],
];
const GESTURE_AR = [/Hòa vào nền AR/, 'thiếu mô tả AR của cử chỉ chính'];

// Bảng chuỗi luật — sinh từ các lib còn lại, so khớp nguyên văn nên lời quy định và lời kiểm không lệch nhau.
const entries = (name, obj) => Object.entries(obj).map(([k, v]) => [v, `${name}.${k}`]);
// Core_Section (mục 1–4) — in đầy đủ ở mọi prompt, kể cả legacy compact.
const CORE_RULES = [
  [HYPE.hook, 'HYPE.hook'], [HYPE.climax, 'HYPE.climax'], [HYPE.reveal, 'HYPE.reveal'],
  [FEEL.juice, 'FEEL.juice'], [FEEL.nearMiss, 'FEEL.nearMiss'], [SCORE_LINE, 'SCORE_LINE'],
  ...entries('EFFECTS', EFFECTS),
  ...entries('PLAYERS', PLAYERS),
  ...entries('COMPETE', COMPETE),
  [MOTION.amplitude, 'MOTION.amplitude'], [MOTION.reach, 'MOTION.reach'], [MOTION.variety, 'MOTION.variety'],
  [PE.warmCool, 'PE.warmCool'], [PE.pace, 'PE.pace'], [PE.loadCap, 'PE.loadCap'],
  [RULES.antiLuck, 'RULES.antiLuck'],
  [WRONG_LINE, 'WRONG_LINE'],
  [MEMORY.review, 'MEMORY.review'], [MEMORY.interleave, 'MEMORY.interleave'], [MEMORY.recall, 'MEMORY.recall'],
  [ADAPT.level, 'ADAPT.level'], [SUMMARY_LINE, 'SUMMARY_LINE'],
];
// Mục 5–9 bản đầy đủ (prompt game + master; legacy dùng bản compact nên không kiểm các chuỗi này).
const FULL_RULES = [
  [VERIFY.bank, 'VERIFY.bank'],
  [CLASSROOM.framing, 'CLASSROOM.framing'], [CLASSROOM.safeZone, 'CLASSROOM.safeZone'],
  [RULES.calibration, 'RULES.calibration'],
  [ACCESS.perceive, 'ACCESS.perceive'], [ACCESS.handedness, 'ACCESS.handedness'],
  [NO_ADS_LINE, 'NO_ADS_LINE'],
  [RULES.autoPause, 'RULES.autoPause'], [RULES.perf, 'RULES.perf'], [RULES.audio, 'RULES.audio'], [RULES.safety, 'RULES.safety'],
  [PRIVACY_LINE, 'PRIVACY_LINE'],
  ...MITI_LINES.map((s, i) => [s, `MITI_LINES[${i}]`]),
];
const SCREEN_RULE = [SCREEN_FLOW, 'SCREEN_FLOW (bố cục luồng màn)'];

function exactlyOnce(id, t, table) {
  for (const [needle, label] of table) {
    const n = count(t, needle);
    if (n !== 1) bad(`${id}: ${label} xuất hiện ${n} lần (cần đúng 1): "${short(needle)}".`);
  }
}
function never(id, t, table, why) {
  for (const [needle, label] of table) {
    const n = count(t, needle);
    if (n) bad(`${id}: ${label} xuất hiện ${n} lần — ${why}.`);
  }
}
// INPUT.*: đúng một lần ở Finger_Game, 0 lần ở game khác.
function checkInput(id, t, finger) {
  const table = entries('INPUT', INPUT);
  if (finger) exactlyOnce(id, t, table);
  else never(id, t, table, 'khối nhận tay chỉ in cho game dùng tay/ngón tay');
}
// Câu "model:": game pose chạy numPoses = N; Finger_Game có cả Turn_Mode (numHands = 2) lẫn Wrist_Mode (cổ tay 15/16).
function checkModelLine(id, t, fingerCodes) {
  const needles = fingerCodes ? ['numHands = 2', 'cổ tay 15/16'] : ['numPoses = N'];
  for (const n of needles) if (!t.includes(n)) bad(`${id}: câu "model:" thiếu "${n}".`);
}

// 2. Prompt game: đủ mục theo SECTIONS, mỗi luật đúng một lần, không rò ký tự template, không lẫn ký tự tiếng Hoa.
const PATH_OF = new Map(rows.map((r) => [r.id, r.prompt]));
const SUBJ_OF = new Map(rows.map((r) => [r.id, r.mon]));
const PROMPT_TEXT = new Map();
for (const g of GAMES) {
  const rel = PATH_OF.get(g.id);
  if (!rel) { bad(`${g.id}: không có đường dẫn prompt trong catalog.`); continue; }
  if (!fs.existsSync(path.join(ROOT, rel))) { bad(`Thiếu file prompt: ${rel}`); continue; }
  const t = read(rel);
  PROMPT_TEXT.set(g.id, t);
  const english = SUBJ_OF.get(g.id) === 'Tiếng Anh';
  const finger = isFingerGame(g.gestures);

  checkHeadings(g.id, t);
  for (const [re, msg] of [...AR_RULES, GESTURE_AR]) if (!re.test(t)) bad(`${g.id}: ${msg}.`);
  exactlyOnce(g.id, t, [...CORE_RULES, ...FULL_RULES, SCREEN_RULE]);
  checkInput(g.id, t, finger);
  checkModelLine(g.id, t, finger);
  if (english) exactlyOnce(g.id, t, [[RULES.listening, 'RULES.listening (nghe-trước)']]);
  if (t.includes(PE_NO_CAMERA)) bad(`${g.id}: prompt có camera nhưng lẫn dòng PE_NO_CAMERA.`);
  if (!t.includes(GESTURES[g.gestures[0]].bien_do)) bad(`${g.id}: prompt thiếu biên độ động tác của cử chỉ chính ${g.gestures[0]}.`);
  if (t.includes('${')) bad(`${g.id}: còn ký tự template chưa nội suy (${t.match(/\$\{[^}]*}/)[0]}).`);
  if (/[\u3400-\u9fff\u3040-\u30ff]/.test(t)) bad(`${g.id}: prompt lẫn ký tự CJK.`);
  if (t.includes('MIXED')) bad(`${g.id}: prompt vẫn ghi điều khiển MIXED.`);
  // "Tăng độ khó ở lượt 5 và lượt 9" là thang level theo VỊ TRÍ, đã bị ADAPT.level thay thế.
  if (/[Tt]ăng độ khó ở lượt 5/.test(t)) bad(`${g.id}: vẫn dùng độ khó theo vị trí lượt chơi, phải theo thích ứng (ADAPT.level).`);
  if (!t.includes('tasks-vision@1.0.1')) bad(`${g.id}: prompt chưa pin MediaPipe Tasks Vision 1.0.1.`);
  if (!t.includes('không Tailwind Play CDN')) bad(`${g.id}: prompt chưa cấm Tailwind Play CDN.`);
  if (!/loiViet/.test(t)) bad(`${g.id}: QUESTION_DATA chưa có trường loiViet.`);
  // Chặn prompt bị cắt cụt theo kích thước (trần trên nằm ở kiểm kích thước bên dưới).
  if (t.length < 12000) bad(`${g.id}: prompt chỉ ${t.length} ký tự (< 12 000) — nội dung bị cắt.`);
}

// 3. Độ phủ dữ liệu: mọi cụm dùng phải có giải thích, mẫu và nhãn lỗi.
for (const g of GAMES) {
  if (!CLUSTER_KEYS.includes(g.cluster)) bad(`${g.id}: cụm kiến thức lạ (${g.cluster}).`);
  if (!EXAMPLES[g.cluster]) bad(`${g.id}: cụm ${g.cluster} thiếu câu mẫu.`);
  if (!ERROR_NOTES[g.cluster]) bad(`${g.id}: cụm ${g.cluster} thiếu mô tả lỗi.`);
}
for (const g of GAMES) {
  const cl = cluster(g.cluster);
  if (!cl || !ERROR_NOTES[g.cluster]) continue;
  const notes = ERROR_NOTES[g.cluster].split('; ');
  if (notes.length !== cl.tags.length) bad(`Cụm ${g.cluster}: ${notes.length} mô tả lỗi nhưng ${cl.tags.length} nhãn errorTag.`);
  const t = PROMPT_TEXT.get(g.id);
  if (!t) continue;
  for (const tag of cl.tags) if (!t.includes(tag)) bad(`${g.id}: thiếu nhãn lỗi ${tag} trong prompt.`);
}

// 4. Legacy: đủ 12 file, đã gắn nhãn + khối luật theo SECTIONS (bản compact) + không còn phụ thuộc bị cấm.
// Mục data/tech/ui của legacy là bản rút gọn (COMPACT), nên chỉ kiểm Core_Section + luồng màn + hợp đồng AR.
const LEGACY_TEXT = new Map();
for (const l of LEGACY) {
  if (!fs.existsSync(path.join(ROOT, l.file))) { bad(`Thiếu file legacy: ${l.file}`); continue; }
  const t = read(l.file);
  LEGACY_TEXT.set(l.file, t);
  const codes = l.gestures.split('+');
  const head = t.indexOf('\n' + MUST[0] + '\n');
  // Cờ finger giống upgrade-legacy.mjs: mã cử chỉ là Finger_Game, hoặc thân prompt (trước khối luật) nhắc HandLandmarker.
  const finger = isFingerGame(codes) || (head >= 0 && t.slice(0, head).includes('HandLandmarker'));
  if (!t.includes('LEGACY (LEG-')) bad(`${l.id}: chưa gắn nhãn legacy.`);
  checkHeadings(l.id, t);
  exactlyOnce(l.id, t, [...CORE_RULES, SCREEN_RULE]);
  checkInput(l.id, t, finger);
  checkModelLine(l.id, t, isFingerGame(codes));
  if (l.mon === 'Tiếng Anh') exactlyOnce(l.id, t, [[RULES.listening, 'RULES.listening (nghe-trước)']]);
  if (!t.includes('#FFD84D')) bad(`${l.id}: thiếu chữ ký MiTi trong prompt.`);
  for (const [re, msg] of AR_RULES) if (!re.test(t)) bad(`${l.id}: ${msg}.`);
  if (/cdn\.tailwindcss\.com|@mediapipe\/hands|@mediapipe\/camera_utils|Tone\.js/.test(t.replace(/LEGACY \(LEG-[\d]+\)[^\n]*/, ''))) bad(`${l.id}: vẫn còn phụ thuộc bị cấm (Tailwind CDN / MediaPipe legacy / Tone.js).`);
}

// 4b. Bộ 425 biến thể: đủ block, mọi block camera phải mang hợp đồng AR, không block nào còn phụ thuộc bị cấm.
// Block biến thể dùng AR_RENDER đầy đủ; "neo vào landmark" có ở dòng tự kiểm của block camera.
const VAR_AR_RULES = [...AR_RULES.slice(0, 4), [/neo vào landmark/, 'thiếu quy tắc neo vật thể ảo vào landmark']];
const VAR_FILE = path.join(ROOT, 'prompts', 'VARIANTS_425.md');
let VAR_COUNT = 0;
let vtextLower = null;
if (!fs.existsSync(VAR_FILE)) {
  bad('Thiếu prompts/VARIANTS_425.md — chạy `node tools/build-variants.mjs`.');
} else {
  const vtext = fs.readFileSync(VAR_FILE, 'utf8').replace(/\r\n/g, '\n');
  vtextLower = vtext.toLowerCase();
  const blocks = vtext.split('\n## Prompt ').slice(1);
  VAR_COUNT = blocks.length;
  if (blocks.length !== 425) bad(`VARIANTS_425.md phải có 425 block (85 game × 5 biến thể), hiện có ${blocks.length}.`);
  const head = vtext.slice(0, vtext.indexOf('\n## Prompt '));
  for (const line of ['- **Chế độ 1/2/3 người:**', '- **Thi đua + cao trào:**', '- **Ham quay lại:**', '- **Hiệu ứng:**', '- **Nghiệm thu:**', 'prompts/CHECKLIST_NGHIEP_THU.md']) {
    if (!head.includes(line)) bad(`Phần Quy ước chung của VARIANTS_425.md thiếu "${line}".`);
  }
  const CLASS_NEEDLES = [RULES.antiLuck, RULES.perf, RULES.autoPause, RULES.safety, NO_ADS_LINE];
  // Nội dung, thi đua, hiệu ứng: mọi biến thể điều khiển đều phải mang (người dùng copy riêng từng block).
  const ALL_NEEDLES = [
    VERIFY.bank, ADAPT.level, FEEL.juice, FEEL.nearMiss, HYPE.hook, HYPE.climax, HYPE.reveal,
    MEMORY.review, MEMORY.interleave, MEMORY.recall, PE.warmCool, PE.pace, PE.loadCap, ACCESS.perceive,
    PLAYERS.select, PLAYERS.lanes, PLAYERS.fallback,
    ...Object.values(COMPETE), ...Object.values(EFFECTS), ...MITI_LINES,
  ];
  const LINE_LABELS = ['**Chế độ 1/2/3 người:**', '**Thi đua:**', '**Vòng chơi:**', '**Độ khó thích ứng:**', '**Vận động:**', '**Thể dục có cấu trúc:**', '**Nhớ bài có lịch:**', '**Cao trào:**', '**Hiệu ứng:**', '**Cảm giác arcade:**', '**Tự kiểm chứng đề:**', '**Tiếp cận:**', '**Nghiệm thu:**'];
  blocks.forEach((b, i) => {
    const tag = `biến thể #${i + 1}`;
    const camera = b.includes('**Nền AR:**');
    const voice = b.includes('V4 — VOICE');
    const noCam = b.includes('V5 — NO-CAMERA');
    const fingerVar = camera && !voice; // V1–V3 đọc ngón tay
    for (const need of ['QUESTION_DATA', 'loiViet', '#FFD84D', 'miti-collection', 'Chữ ký MiTi']) {
      if (!b.includes(need)) bad(`${tag}: thiếu ${need}.`);
    }
    if (/@mediapipe\/hands|@mediapipe\/camera_utils|cdn\.tailwindcss\.com/.test(b)) bad(`${tag}: còn phụ thuộc bị cấm.`);
    if (/[Tt]ăng độ khó ở lượt 5/.test(b)) bad(`${tag}: vẫn dùng độ khó theo vị trí lượt chơi.`);
    for (const l of LINE_LABELS) if (!b.includes(l)) bad(`${tag}: thiếu dòng ${l}`);
    for (const n of CLASS_NEEDLES) if (!b.includes(n)) bad(`${tag}: thiếu quy định "${short(n, 32)}".`);
    for (const n of ALL_NEEDLES) if (!b.includes(n)) bad(`${tag}: thiếu quy tắc "${short(n, 32)}".`);
    const calibNeedle = noCam || voice ? 'không cần calibration' : RULES.calibration;
    if (!b.includes(calibNeedle)) bad(`${tag}: thiếu quy định calibration của đúng kiểu điều khiển.`);
    // Nhận tay theo lượt/cổ tay chỉ cho biến thể ngón tay; VOICE/NO-CAMERA không có.
    for (const n of Object.values(INPUT)) {
      if (fingerVar !== b.includes(n)) bad(`${tag}: ${fingerVar ? 'thiếu' : 'không được có'} quy tắc nhận tay "${short(n, 30)}".`);
    }
    if (fingerVar && !b.includes('**Nhận tay:**')) bad(`${tag}: biến thể ngón tay thiếu dòng Nhận tay.`);
    // Bản đo được cơ thể giữ đồng hồ vận động; VOICE/NO-CAMERA đổi cách đo.
    if (fingerVar === b.includes(PE_NO_CAMERA)) bad(`${tag}: dòng PE_NO_CAMERA ${fingerVar ? 'không được có ở' : 'phải có ở'} biến thể này.`);
    if (camera) {
      for (const [re, msg] of VAR_AR_RULES) if (!re.test(b)) bad(`${tag}: ${msg}.`);
      if (!b.includes('Hòa vào nền AR')) bad(`${tag}: block camera thiếu mô tả AR của cử chỉ.`);
      if (!b.includes('tasks-vision@1.0.1') && !voice) bad(`${tag}: block camera chưa pin MediaPipe Tasks Vision 1.0.1.`);
      for (const n of [MOTION.amplitude, MOTION.reach, MOTION.variety, CLASSROOM.safeZone, CLASSROOM.framing]) {
        if (!b.includes(n)) bad(`${tag}: block camera thiếu "${short(n, 30)}".`);
      }
      if (!b.includes('**Biên độ động tác:**')) bad(`${tag}: block camera thiếu biên độ riêng của cử chỉ.`);
      if (fingerVar) {
        for (const n of [...Object.values(PLAYERS), ACCESS.handedness]) if (!b.includes(n)) bad(`${tag}: block đọc cơ thể thiếu "${short(n, 30)}".`);
      }
    } else if (!noCam) {
      bad(`${tag}: block không camera nhưng không phải V5 — NO-CAMERA.`);
    }
  });
  const arBlocks = blocks.filter((b) => b.includes('**Nền AR:**')).length;
  if (arBlocks !== 340) bad(`VARIANTS_425.md phải có 340 block nền AR (85 × 4 biến thể camera), hiện có ${arBlocks}.`);
}

// 5. Dashboard: dữ liệu sinh ra khớp catalog, mọi mục có players = [1, 2, 3].
const dashFile = path.join(ROOT, 'catalogs', 'GAME_CATALOG.js');
let cat = null;
if (!fs.existsSync(dashFile)) bad('Thiếu catalogs/GAME_CATALOG.js — chạy node tools/build.mjs.');
else {
  cat = JSON.parse(fs.readFileSync(dashFile, 'utf8').replace(/^[\s\S]*?window\.MITI_CATALOG = /, '').replace(/;\s*$/, ''));
  if (cat.games.length !== 85) bad(`Dashboard phải có 85 game, hiện có ${cat.games.length}.`);
  if (cat.legacy.length !== 12) bad(`Dashboard phải có 12 prompt legacy, hiện có ${cat.legacy.length}.`);
  const ids = new Set(cat.games.map((g) => g.id));
  for (const r of rows) if (!ids.has(r.id)) bad(`Dashboard thiếu game ${r.id} có trong catalog.`);
  for (const g of cat.games.concat(cat.legacy)) {
    if (!fs.existsSync(path.join(ROOT, g.prompt))) bad(`${g.id}: dashboard trỏ tới file prompt không có thật (${g.prompt}).`);
    if (JSON.stringify(g.players) !== '[1,2,3]') bad(`${g.id}: GAME_CATALOG.js phải có players = [1,2,3], hiện là ${JSON.stringify(g.players)}.`);
  }
}

// 6. Demo game: mọi thẻ script/link trỏ file thật và CDN đã pin phiên bản.
for (const dir of fs.readdirSync(path.join(ROOT, 'games'))) {
  const html = path.join(ROOT, 'games', dir, 'index.html');
  if (!fs.existsSync(html)) { bad(`games/${dir} thiếu index.html.`); continue; }
  const t = fs.readFileSync(html, 'utf8');
  for (const m of t.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|#|data:|mailto:)/.test(ref)) continue;
    if (!fs.existsSync(path.join(ROOT, 'games', dir, ref))) bad(`games/${dir}: thiếu file được tham chiếu (${ref}).`);
  }
  for (const m of t.matchAll(/https:\/\/cdn\.jsdelivr\.net\/npm\/([^"'\s]+)/g)) {
    if (!/^(@[^/]+\/)?[^/]+@[^/]+/.test(m[1])) bad(`games/${dir}: CDN jsDelivr chưa pin phiên bản (${m[1]}).`);
  }
}

// 7. Số liệu công khai không được lệch nhau.
const claims = [
  ['README.md', /85/],
  ['prompts/README.md', /85/],
  ['catalogs/GAME_CATALOG.md', /85 game/],
];
for (const [f, re] of claims) {
  if (!re.test(read(f))) bad(`${f}: chưa ghi đúng số 85 prompt.`);
}

// 7c. Bảng kiểm người thử: file sinh từ HUMAN_CHECKS, đủ số dòng và khớp từng việc.
const CHECK_REL = 'prompts/CHECKLIST_NGHIEP_THU.md';
let humanRows = 0;
let checklist = '';
if (!fs.existsSync(path.join(ROOT, CHECK_REL))) {
  bad(`Thiếu ${CHECK_REL} — chạy \`node tools/build-acceptance.mjs\`.`);
} else {
  checklist = read(CHECK_REL);
  humanRows = checklist.split('\n').filter((l) => /^\d+\. /.test(l)).length;
  if (humanRows !== HUMAN_CHECKS.length) bad(`Bảng kiểm phải có ${HUMAN_CHECKS.length} việc người thử, hiện có ${humanRows}.`);
  if (!checklist.includes(`${HUMAN_CHECKS.length} việc`)) bad(`Bảng kiểm phải ghi đúng số ${HUMAN_CHECKS.length} việc người thử.`);
  for (const item of HUMAN_CHECKS) if (!checklist.includes(item)) bad(`Bảng kiểm thiếu việc người thử "${short(item)}".`);
}

// 7b. Template phải liệt kê đủ mọi mã trong GESTURES — thêm mã mới mà quên ghi template thì người viết prompt không biết mà dùng.
const tpl = read('prompts/templates/game-prompt-template.md');
if (!tpl.includes(`một trong ${Object.keys(GESTURES).length} mã`)) {
  bad(`Template phải ghi "một trong ${Object.keys(GESTURES).length} mã" khớp số mã trong tools/data/gestures.mjs.`);
}
for (const code of Object.keys(GESTURES)) {
  if (!new RegExp('\\b' + code + '\\b').test(tpl)) bad(`Template thiếu mã điều khiển ${code}.`);
}

// 7d. Master prompt (sinh bởi tools/build-master.mjs): đúng các mục SECTIONS theo thứ tự, heading cấp 1 = số mục khung,
// ba chỗ trống cho game cụ thể và bảng mã cử chỉ đủ mọi mã trong GESTURES.
const MASTER_REL = 'prompts/00-master-canvas-prompt.md';
const master = read(MASTER_REL);
checkHeadings('Master', master);
const masterSections = (master.match(/^[0-9]+\. [A-ZÀ-Ỹ]/gm) || []).length;
if (masterSections !== SECTIONS.length) bad(`Master prompt có ${masterSections} heading cấp 1, khung SECTIONS có ${SECTIONS.length} mục.`);
for (const slot of ['<TÊN GAME>', '<MỤC TIÊU>', '<CỬ CHỈ>']) if (!master.includes(slot)) bad(`Master prompt thiếu chỗ trống ${slot}.`);
for (const code of Object.keys(GESTURES)) if (!master.includes(`- ${code} — `)) bad(`Master prompt: bảng mã cử chỉ thiếu ${code}.`);

// 7e. Master: mọi chuỗi luật đúng một lần (bản đầy đủ), hợp đồng AR, luồng màn.
exactlyOnce('Master', master, [...CORE_RULES, ...FULL_RULES, SCREEN_RULE]);
for (const [re, msg] of AR_RULES) if (!re.test(master)) bad(`Master: ${msg}.`);
if (!master.includes('tasks-vision@1.0.1')) bad('Master: chưa pin MediaPipe Tasks Vision 1.0.1.');

// 7g. Master chưa biết game có dùng tay: đủ INPUT.* kèm tiền tố điều kiện, mỗi dòng đúng một lần, không có bản trần.
for (const [s, label] of entries('INPUT', INPUT)) {
  const withPrefix = count(master, FINGER_MAYBE_PREFIX + s);
  if (withPrefix !== 1) bad(`Master: ${label} kèm tiền tố "${FINGER_MAYBE_PREFIX.trim()}" xuất hiện ${withPrefix} lần (cần đúng 1).`);
  if (count(master, s) !== withPrefix) bad(`Master: ${label} có bản không kèm tiền tố điều kiện.`);
}

// Con số cũ ("< 8 động tác lớn mỗi phút") KHÔNG THỂ đạt với phiên 12 lượt / 4–6 phút — chặn nếu quay lại.
const SUPERSEDED = />= 8 động tác lớn mỗi phút/;
for (const f of [MASTER_REL, 'README.md', 'prompts/README.md']) {
  if (SUPERSEDED.test(read(f))) bad(`${f}: còn dùng con số cường độ cũ (>= 8 động tác lớn mỗi phút) — đã thay bằng >= 12 nhịp chuyển động mỗi phút.`);
}

// 8. Chuỗi cấm (Property 2): mọi prompt đầu ra, mọi lib, README.md, prompts/README.md.
const FORBIDDEN = [
  'không xếp hạng', 'Không leaderboard', 'maxNumHands: 2', 'numHands = 2N', '7 lần chạm logo',
  'mục máy tự kiểm', 'tờ rời', 'Chế độ hai học sinh (nút bật/tắt',
];
const FORBIDDEN_LOWER = FORBIDDEN.map((s) => s.toLowerCase());
const forbiddenIn = (name, lower) => {
  for (let i = 0; i < FORBIDDEN.length; i++) if (lower.includes(FORBIDDEN_LOWER[i])) bad(`${name}: còn chuỗi cấm "${FORBIDDEN[i]}".`);
};
for (const g of GAMES) {
  const t = PROMPT_TEXT.get(g.id);
  if (t) forbiddenIn(PATH_OF.get(g.id), t.toLowerCase());
}
for (const [file, t] of LEGACY_TEXT) forbiddenIn(file, t.toLowerCase());
forbiddenIn(MASTER_REL, master.toLowerCase());
if (vtextLower) forbiddenIn('prompts/VARIANTS_425.md', vtextLower);
if (checklist) forbiddenIn(CHECK_REL, checklist.toLowerCase());
// Lib: kiểm mọi chuỗi XUẤT KHẨU (đệ quy qua object/array), vì đó là thứ đi vào prompt; chú thích trong mã nguồn
// được phép nhắc tên luật cũ để giải thích vì sao đã gỡ.
const libStrings = (v, out, seenObj = new Set()) => {
  if (typeof v === 'string') out.push(v);
  else if (v && typeof v === 'object' && !seenObj.has(v)) { seenObj.add(v); for (const x of Object.values(v)) libStrings(x, out, seenObj); }
  return out;
};
for (const f of fs.readdirSync(path.join(ROOT, 'tools', 'lib')).filter((x) => x.endsWith('.mjs'))) {
  const mod = await import(pathToFileURL(path.join(ROOT, 'tools', 'lib', f)).href);
  forbiddenIn('tools/lib/' + f, libStrings(mod, []).join('\n').toLowerCase());
}
for (const f of ['README.md', 'prompts/README.md', 'prompts/templates/game-prompt-template.md']) forbiddenIn(f, read(f).toLowerCase());

// 9. Ngân sách kích thước (Property 4): mọi tệp đầu ra có baseline, len ≤ floor(SIZE_RATIO × baseline).
const OUTPUTS = [
  ...rows.map((r) => r.prompt),
  ...LEGACY.map((l) => l.file),
  MASTER_REL,
];
const SIZE = new Map();
for (const rel of OUTPUTS) {
  if (!(rel in BASELINE)) { bad(`${rel}: tệp đầu ra không có baseline trong tools/data/baseline.mjs.`); continue; }
  if (!fs.existsSync(path.join(ROOT, rel))) continue; // thiếu tệp đã báo ở mục 1/4
  const len = read(rel).length;
  const cap = Math.floor(SIZE_RATIO * BASELINE[rel]);
  SIZE.set(rel, { len, base: BASELINE[rel], cap });
  if (len > cap) bad(`${rel}: ${len} ký tự > trần ${cap} (baseline ${BASELINE[rel]}).`);
}
for (const rel of Object.keys(BASELINE)) {
  if (!OUTPUTS.includes(rel)) bad(`tools/data/baseline.mjs có ${rel} nhưng tệp này không còn là đầu ra của build.`);
}
const LEGACY_FILES = new Set(LEGACY.map((l) => l.file));
const GROUPS = [
  ['Toán 4 (L4)', (f) => f.startsWith('prompts/01-toan4/')],
  ['Toán 5 (T5)', (f) => f.startsWith('prompts/02-toan5/')],
  ['Tiếng Anh 4 (E4)', (f) => f.startsWith('prompts/03-english4/')],
  ['Tiếng Anh 5 (E5)', (f) => f.startsWith('prompts/04-english5/')],
  ['Legacy 01–12', (f) => LEGACY_FILES.has(f)],
  ['Master 00', (f) => f === MASTER_REL],
];
const fmt = (n) => Math.round(n).toLocaleString('en-US').replace(/,/g, ' ');
console.log('Kích thước prompt (ký tự, trước = baseline main, sau = bản hiện tại):');
console.log('| Nhóm | Số tệp | Trước TB | Sau TB | Sau lớn nhất | Tỉ lệ lớn nhất | Trần |');
console.log('|---|---|---|---|---|---|---|');
for (const [name, match] of GROUPS) {
  const xs = [...SIZE].filter(([f]) => match(f)).map(([, v]) => v);
  if (!xs.length) continue;
  const avg = (k) => xs.reduce((a, v) => a + v[k], 0) / xs.length;
  const maxLen = Math.max(...xs.map((v) => v.len));
  const maxRatio = Math.max(...xs.map((v) => v.len / v.base));
  console.log(`| ${name} | ${xs.length} | ${fmt(avg('base'))} | ${fmt(avg('len'))} | ${fmt(maxLen)} | ${(maxRatio * 100).toFixed(1)}% | ${Math.round(SIZE_RATIO * 100)}% |`);
}

if (errors.length) {
  console.error('Xác minh thất bại — ' + errors.length + ' vấn đề:');
  for (const e of errors.slice(0, 40)) console.error('  • ' + e);
  if (errors.length > 40) console.error('  ... và ' + (errors.length - 40) + ' vấn đề khác.');
  process.exit(1);
}
console.log(`Xác minh đạt: ${rows.length} dòng catalog, ${GAMES.length} prompt game, ${VAR_COUNT} prompt biến thể, ${CLUSTER_KEYS.length} cụm kiến thức, ${LEGACY.length} prompt legacy, ${cat.games.length + cat.legacy.length} card dashboard, bảng kiểm ${humanRows} việc người thử, ${SIZE.size} tệp trong ngân sách ${Math.round(SIZE_RATIO * 100)}%.`);
