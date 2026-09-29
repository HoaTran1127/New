import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { LEGACY } from './data/legacy.mjs';
import { GESTURES } from './data/gestures.mjs';
import { CLUSTER_KEYS, cluster } from './data/clusters.mjs';
import { EXAMPLES } from './data/examples.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { readCatalog } from './lib/csv.mjs';
import { RULES } from './lib/rules.mjs';
import { MOTION, FEEL } from './lib/feel.mjs';
import { CLASSROOM } from './lib/classroom.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const errors = [];
const bad = (msg) => errors.push(msg);

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

// 2. Prompt game: đủ khối bắt buộc, không rò ký tự template, không lẫn ký tự tiếng Hoa.
const PATH_OF = new Map(rows.map((r) => [r.id, r.prompt]));
const MUST = ['1. HỌC TẬP', '2. THẾ GIỚI AR VÀ VÒNG CHƠI', '3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)', '4. NỀN AR, CAMERA VÀ GESTURE', '5. FALLBACK (bắt buộc)', '6. PHẢN HỒI HỌC TẬP', '7. GIAO DIỆN VÀ AN TOÀN', '8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML', '9. ĐẦU RA'];
// Hợp đồng AR: thiếu một trong các ràng buộc này thì game chỉ còn là canvas 2D có webcam kèm theo.
const AR_RULES = [
  [/toScreen\(lx, ly\)/, 'thiếu hàm chiếu toScreen'],
  [/Math\.max\(W \/ video\.videoWidth/, 'thiếu công thức cover-fit cho khung hình camera'],
  [/alpha không vượt 0\.45/, 'thiếu trần alpha của lớp phủ tối'],
  [/z từ 1\.6/, 'thiếu chiều sâu z của vật thể AR'],
  [/NEO VÀO CƠ THỂ/, 'thiếu quy tắc neo vật thể ảo vào landmark'],
  [/Hòa vào nền AR/, 'thiếu mô tả AR của cử chỉ chính'],
];
// Quy định lớp học thật (máy yếu, tab bị ẩn, ánh sáng kém, học sinh phát hiện vung bừa vẫn thắng).
// So khớp nguyên văn chuỗi trong tools/lib/rules.mjs để lời quy định và lời kiểm không lệch nhau.
const SUBJ_OF = new Map(rows.map((r) => [r.id, r.mon]));
const CLASS_RULES = [
  [RULES.antiLuck, 'thiếu tỉ lệ 60/40 + quy tắc chống ăn may'],
  [RULES.calibration, 'thiếu calibration động theo cơ thể học sinh'],
  [RULES.perf, 'thiếu ngân sách hiệu năng'],
  [RULES.autoPause, 'thiếu quy tắc tự Pause khi tab ẩn'],
  [RULES.safety, 'thiếu nhắc an toàn không gian + ánh sáng'],
  [RULES.summary, 'thiếu màn tổng kết ba thẻ'],
];
// Vận động to + cảm giác arcade: thiếu là game trở lại kiểu "ngồi một chỗ nhấc ngón tay" hoặc "làm bài tập có nền camera".
const ACTIVITY_RULES = [
  [MOTION.amplitude, 'thiếu quy định biên độ động tác >= 50% tầm với'],
  [MOTION.reach, 'thiếu quy định vùng đích sát mép khung hình'],
  [MOTION.variety, 'thiếu quy định xen kẽ nhóm cơ'],
  [MOTION.breather, 'thiếu quy định 3 hiệp + trạm nghỉ'],
  [MOTION.meter, 'thiếu thẻ đếm số động tác ở tổng kết'],
  [FEEL.hitStop, 'thiếu hit-stop cho cú chạm'],
  [FEEL.combo, 'thiếu combo nhìn thấy + nghe thấy'],
  [FEEL.cheer, 'thiếu chữ khen tại điểm chạm'],
  [FEEL.bonus, 'thiếu sự kiện ngẫu nhiên'],
  [FEEL.fx, 'thiếu FX arcade trên nền AR'],
  [FEEL.mascot, 'thiếu nhân vật phản ứng theo động tác'],
];
// Lớp học thật: chữ đè lên người học sinh, game đòi toàn thân trong khi camera chỉ thấy tay,
// mỗi phiên bắt đầu từ số 0, và một máy một em là quá chậm cho lớp đông.
const CLASSROOM_RULES = [
  [CLASSROOM.safeZone, 'thiếu vùng an toàn cho HUD (chữ đè lên học sinh)'],
  [CLASSROOM.framing, 'thiếu đàm phán cơ chế theo mức camera đang thấy'],
  [CLASSROOM.mastery, 'thiếu hồ sơ tiến bộ xuyên phiên "miti-mastery"'],
  [CLASSROOM.twoPlayer, 'thiếu chế độ hai học sinh maxNumHands: 2'],
];
for (const g of GAMES) {
  const rel = PATH_OF.get(g.id);
  if (!rel) { bad(`${g.id}: không có đường dẫn prompt trong catalog.`); continue; }
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { bad(`Thiếu file prompt: ${rel}`); continue; }
  const t = fs.readFileSync(file, 'utf8');
  for (const m of MUST) if (!t.includes(m)) bad(`${g.id}: prompt thiếu mục ${m}.`);
  for (const [re, msg] of AR_RULES) if (!re.test(t)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of CLASS_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of ACTIVITY_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of CLASSROOM_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  if (!t.includes(GESTURES[g.gestures[0]].bien_do)) bad(`${g.id}: prompt thiếu biên độ động tác của cử chỉ chính ${g.gestures[0]}.`);
  if (SUBJ_OF.get(g.id) === 'Tiếng Anh' && !t.includes(RULES.listening)) bad(`${g.id}: game Tiếng Anh thiếu nguyên tắc nghe-trước.`);
  if (t.includes('${')) bad(`${g.id}: còn ký tự template chưa nội suy (${t.match(/\$\{[^}]*}/)[0]}).`);
  if (/[\u3400-\u9fff\u3040-\u30ff]/.test(t)) bad(`${g.id}: prompt lẫn ký tự CJK.`);
  if (t.includes('MIXED')) bad(`${g.id}: prompt vẫn ghi điều khiển MIXED.`);
  if (!t.includes('tasks-vision@1.0.1')) bad(`${g.id}: prompt chưa pin MediaPipe Tasks Vision 1.0.1.`);
  if (!t.includes('Không dùng Tailwind Play CDN')) bad(`${g.id}: prompt chưa cấm Tailwind Play CDN.`);
  if (!/loiViet/.test(t)) bad(`${g.id}: QUESTION_DATA chưa có trường loiViet.`);
  const lines = t.split('\n').length;
  if (lines < 85) bad(`${g.id}: prompt chỉ ${lines} dòng — nội dung bị cắt.`);
}

// 3. Độ phủ dữ liệu: mọi cụm dùng phải có giải thích, mẫu và nhãn lỗi.
for (const g of GAMES) {
  if (!CLUSTER_KEYS.includes(g.cluster)) bad(`${g.id}: cụm kiến thức lạ (${g.cluster}).`);
  if (!EXAMPLES[g.cluster]) bad(`${g.id}: cụm ${g.cluster} thiếu câu mẫu.`);
  if (!ERROR_NOTES[g.cluster]) bad(`${g.id}: cụm ${g.cluster} thiếu mô tả lỗi.`);
}
for (const g of GAMES) {
  const cl = cluster(g.cluster);
  const notes = ERROR_NOTES[g.cluster].split('; ');
  if (notes.length !== cl.tags.length) bad(`Cụm ${g.cluster}: ${notes.length} mô tả lỗi nhưng ${cl.tags.length} nhãn errorTag.`);
  const t = fs.readFileSync(path.join(ROOT, PATH_OF.get(g.id)), 'utf8');
  for (const tag of cl.tags) if (!t.includes(tag)) bad(`${g.id}: thiếu nhãn lỗi ${tag} trong prompt.`);
}

// 4. Legacy: đủ 12 file, đã gắn nhãn + khối yêu cầu chuẩn + không còn phụ thuộc bị cấm.
for (const l of LEGACY) {
  const file = path.join(ROOT, l.file);
  if (!fs.existsSync(file)) { bad(`Thiếu file legacy: ${l.file}`); continue; }
  const t = fs.readFileSync(file, 'utf8');
  if (!t.includes('LEGACY (LEG-')) bad(`${l.id}: chưa gắn nhãn legacy.`);
  if (!t.includes('YÊU CẦU BẮT BUỘC THEO CHUẨN MiTi')) bad(`${l.id}: chưa có khối yêu cầu chuẩn MiTi.`);
  for (const needle of ['60/40', 'calibration 3 giây', 'tự Pause', 'ba thẻ chữ to', 'hit-stop', 'trạm nghỉ', 'VẬN ĐỘNG TO + CẢM GIÁC ARCADE', 'LỚP HỌC THẬT', 'miti-mastery', 'maxNumHands: 2']) {
    if (!t.includes(needle)) bad(`${l.id}: khối chuẩn MiTi thiếu quy định lớp học "${needle}".`);
  }
  if (!t.includes('#FFD84D')) bad(`${l.id}: thiếu chữ ký MiTi trong prompt.`);
  for (const [re, msg] of AR_RULES.filter(([, m]) => m !== 'thiếu mô tả AR của cử chỉ chính')) {
    if (!re.test(t)) bad(`${l.id}: ${msg}.`);
  }
  if (/cdn\.tailwindcss\.com|@mediapipe\/hands|@mediapipe\/camera_utils|Tone\.js/.test(t.replace(/LEGACY \(LEG-[\d]+\)[^\n]*/, ''))) bad(`${l.id}: vẫn còn phụ thuộc bị cấm (Tailwind CDN / MediaPipe legacy / Tone.js).`);
}

// Block biến thể dùng bản hợp đồng AR rút gọn nên bộ kiểm cũng lấy theo từng vế của bản đầy đủ.
const VAR_AR_RULES = [
  AR_RULES[0], AR_RULES[1], AR_RULES[2], AR_RULES[3],
  [/neo vào landmark/, 'thiếu quy tắc neo vật thể ảo vào landmark'],
];

// 4b. Bộ 425 biến thể: đủ block, mọi block camera phải mang hợp đồng AR, không block nào còn phụ thuộc bị cấm.
const VAR_FILE = path.join(ROOT, 'prompts', 'VARIANTS_425.md');
let VAR_COUNT = 0;
if (!fs.existsSync(VAR_FILE)) {
  bad('Thiếu prompts/VARIANTS_425.md — chạy `node tools/build-variants.mjs`.');
} else {
  const vtext = fs.readFileSync(VAR_FILE, 'utf8').replace(/\r\n/g, '\n');
  const blocks = vtext.split('\n## Prompt ').slice(1);
  if (blocks.length !== 425) bad(`VARIANTS_425.md phải có 425 block (85 game × 5 biến thể), hiện có ${blocks.length}.`);
  let arBlocks = 0;
  blocks.forEach((b, i) => {
    const tag = `biến thể #${i + 1}`;
    const camera = /\*\*Nền AR:\*\*/.test(b);
    if (camera) arBlocks++;
    for (const need of ['QUESTION_DATA', 'loiViet', '#FFD84D', 'miti-collection', 'Chữ ký MiTi']) {
      if (!b.includes(need)) bad(`${tag}: thiếu ${need}.`);
    }
    if (/@mediapipe\/hands|@mediapipe\/camera_utils|cdn\.tailwindcss\.com/.test(b)) bad(`${tag}: còn phụ thuộc bị cấm.`);
    if (camera) {
      for (const [re, msg] of VAR_AR_RULES) if (!re.test(b)) bad(`${tag}: ${msg}.`);
      if (!b.includes('Hòa vào nền AR')) bad(`${tag}: block camera thiếu mô tả AR của cử chỉ.`);
      if (!b.includes('tasks-vision@1.0.1') && !b.includes('V4 — VOICE')) bad(`${tag}: block camera chưa pin MediaPipe Tasks Vision 1.0.1.`);
    } else if (!b.includes('V5 — NO-CAMERA')) {
      bad(`${tag}: block không camera nhưng không phải V5 — NO-CAMERA.`);
    }
  });
  if (arBlocks !== 340) bad(`VARIANTS_425.md phải có 340 block nền AR (85 × 4 biến thể camera), hiện có ${arBlocks}.`);
  VAR_COUNT = blocks.length;
  const CLASS_NEEDLES = [RULES.antiLuck, RULES.perf, RULES.autoPause, RULES.safety, RULES.summary];
  const FEEL_NEEDLES = [FEEL.hitStop, FEEL.combo, FEEL.cheer, FEEL.bonus, FEEL.fx];
  blocks.forEach((b, i) => {
    for (const needle of CLASS_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy định "${needle.slice(0, 32)}...".`);
    const calibNeedle = b.includes('V5 — NO-CAMERA') || b.includes('V4 — VOICE') ? 'không cần calibration' : RULES.calibration;
    if (!b.includes(calibNeedle)) bad(`biến thể #${i + 1}: thiếu quy định calibration của đúng kiểu điều khiển.`);
    if (!b.includes('**Vận động:**')) bad(`biến thể #${i + 1}: thiếu dòng Vận động.`);
    if (!b.includes('**Cảm giác arcade:**')) bad(`biến thể #${i + 1}: thiếu dòng Cảm giác arcade.`);
    for (const needle of FEEL_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc arcade "${needle.slice(0, 30)}...".`);
    if (!b.includes('**Hồ sơ tiến bộ:**')) bad(`biến thể #${i + 1}: thiếu dòng Hồ sơ tiến bộ.`);
    if (!b.includes(CLASSROOM.mastery)) bad(`biến thể #${i + 1}: thiếu hồ sơ tiến bộ "miti-mastery".`);
    if (/\*\*Nền AR:\*\*/.test(b)) {
      for (const needle of [MOTION.amplitude, MOTION.reach, MOTION.variety, MOTION.breather, MOTION.meter, FEEL.mascot]) {
        if (!b.includes(needle)) bad(`biến thể #${i + 1}: block camera thiếu "${needle.slice(0, 30)}...".`);
      }
      if (!b.includes('**Biên độ động tác:**')) bad(`biến thể #${i + 1}: block camera thiếu biên độ riêng của cử chỉ.`);
      if (!b.includes(CLASSROOM.safeZone)) bad(`biến thể #${i + 1}: block camera thiếu vùng an toàn cho HUD.`);
      if (!b.includes(CLASSROOM.framing)) bad(`biến thể #${i + 1}: block camera thiếu đàm phán mức camera.`);
      if (!b.includes('V4 — VOICE') && !b.includes(CLASSROOM.twoPlayer)) bad(`biến thể #${i + 1}: block camera thiếu chế độ hai học sinh.`);
    }
  });
}

// 5. Dashboard: dữ liệu sinh ra khớp catalog.
const dashFile = path.join(ROOT, 'catalogs', 'GAME_CATALOG.js');
let cat = null;
if (!fs.existsSync(dashFile)) bad('Thiếu catalogs/GAME_CATALOG.js — chạy node tools/build.mjs.');
else {
  cat = JSON.parse(fs.readFileSync(dashFile, 'utf8').replace(/^[\s\S]*?window\.MITI_CATALOG = /, '').replace(/;\s*$/, ''));
  if (cat.games.length !== 85) bad(`Dashboard phải có 85 game, hiện có ${cat.games.length}.`);
  if (cat.legacy.length !== 12) bad(`Dashboard phải có 12 prompt legacy, hiện có ${cat.legacy.length}.`);
  const ids = new Set(cat.games.map((g) => g.id));
  for (const r of rows) if (!ids.has(r.id)) bad(`Dashboard thiếu game ${r.id} có trong catalog.`);
  for (const g of cat.games.concat(cat.legacy)) if (!fs.existsSync(path.join(ROOT, g.prompt))) bad(`${g.id}: dashboard trỏ tới file prompt không có thật (${g.prompt}).`);
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
  const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
  if (!re.test(t)) bad(`${f}: chưa ghi đúng số 85 prompt.`);
}

// 7b. Template phải liệt kê đủ mọi mã trong GESTURES — thêm mã mới mà quên ghi template thì người viết prompt không biết mà dùng.
const tplFile = path.join(ROOT, 'prompts', 'templates', 'game-prompt-template.md');
const tpl = fs.readFileSync(tplFile, 'utf8');
if (!tpl.includes(`một trong ${Object.keys(GESTURES).length} mã`)) {
  bad(`Template phải ghi "một trong ${Object.keys(GESTURES).length} mã" khớp số mã trong tools/data/gestures.mjs.`);
}
for (const code of Object.keys(GESTURES)) {
  if (!new RegExp('\\b' + code + '\\b').test(tpl)) bad(`Template thiếu mã điều khiển ${code}.`);
}

if (errors.length) {
  console.error('Xác minh thất bại — ' + errors.length + ' vấn đề:');
  for (const e of errors.slice(0, 40)) console.error('  • ' + e);
  if (errors.length > 40) console.error('  ... và ' + (errors.length - 40) + ' vấn đề khác.');
  process.exit(1);
}
console.log(`Xác minh đạt: ${rows.length} dòng catalog, ${GAMES.length} prompt game, ${VAR_COUNT} prompt biến thể, ${CLUSTER_KEYS.length} cụm kiến thức, ${LEGACY.length} prompt legacy, ${cat.games.length + cat.legacy.length} card dashboard.`);
