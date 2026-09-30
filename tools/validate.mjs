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
import { ACCESS } from './lib/access.mjs';
import { VERIFY, ADAPT } from './lib/verify.mjs';
import { ACCEPT, MACHINE_ITEMS, HUMAN_CHECKS, CAMERA_ONLY, OFFLINE_ITEMS } from './lib/acceptance.mjs';
import { PE, PE_NO_CAMERA } from './lib/pe.mjs';
import { RETENTION } from './lib/memory.mjs';
import { HYPE, HYPE_SHORT } from './lib/hype.mjs';
import { ANT, ANT_SHORT } from './lib/anticipation.mjs';

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
const MUST = ['1. HỌC TẬP', '2. THẾ GIỚI AR VÀ VÒNG CHƠI', '3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)', '4. NỀN AR, CAMERA VÀ GESTURE', '5. FALLBACK (bắt buộc)', '6. PHẢN HỒI HỌC TẬP', '7. GIAO DIỆN VÀ AN TOÀN', '8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML', '9. NGHIỆM THU', '10. ĐẦU RA'];
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
// Tiếp cận + an toàn thần kinh: hiệu ứng giật sáng không trần, đúng/sai chỉ phân biệt bằng đỏ-xanh lá,
// audio không có bản chữ, và nút Giảm hiệu ứng mà không em nào bấm là bốn cách loại học sinh ra khỏi game.
const ACCESS_RULES = [
  [ACCESS.flash, 'thiếu trần nhấp nháy an toàn (3 lần/giây)'],
  [ACCESS.reducedMotion, 'thiếu quy định tự đọc prefers-reduced-motion'],
  [ACCESS.notColorOnly, 'thiếu quy định màu không là kênh duy nhất'],
  [ACCESS.caption, 'thiếu bản chữ tương đương cho âm thanh'],
  [ACCESS.contrast, 'thiếu ngưỡng tương phản chữ 4.5:1'],
  [ACCESS.handedness, 'thiếu câu hỏi tay thuận lúc calibration'],
];
// Kiểm chứng nội tại + thích ứng: "mỗi mục một đáp án đúng duy nhất" là lời hứa, không phải cơ chế.
// Không có hàm tự kiểm thì vài mục sai trong 60 mục lọt vào game và dạy sai mà không ai biết.
const VERIFY_RULES = [
  [VERIFY.selfCheck, 'thiếu hàm tự kiểm chứng verifyQuestionBank chạy lúc nạp'],
  [VERIFY.distractorValid, 'thiếu quy định phương án nhiễu sai theo một lỗi thật'],
  [VERIFY.rangeGuard, 'thiếu guard phạm vi kiến thức của số và từ'],
  [VERIFY.noGuessable, 'thiếu quy định chống đoán mò bằng cấu trúc đáp án'],
  [VERIFY.difficultySteps, 'thiếu quy định level khớp số bước thật'],
];
const ADAPT_RULES = [
  [ADAPT.levelShift, 'thiếu quy định độ khó thích ứng theo chuỗi đúng/sai'],
  [ADAPT.failFloor, 'thiếu sàn chống nản (không cho sai quá 3 câu liên tiếp)'],
  [ADAPT.hiddenLevel, 'thiếu quy định ẩn level với học sinh'],
];
// Nghiệm thu: không có bảng kiểm thì 40 quy định trước đó chỉ là 40 lời mong đợi — không ai biết file HTML nhận về có đạt không.
const ACCEPT_RULES = [
  [ACCEPT.selfReport, 'thiếu bảng kiểm tự nghiệm thu trong game'],
  [ACCEPT.items, `thiếu danh sách ${MACHINE_ITEMS.length} mục máy tự kiểm`],
  [ACCEPT.printable, 'thiếu quy định xuất bản văn bảng kiểm'],
  [ACCEPT.failRule, 'thiếu quy định mục chưa đạt phải kèm nguyên nhân'],
  [ACCEPT.manual, `thiếu bảng ${HUMAN_CHECKS.length} việc người thử phải bấm tay`],
];
// Thể dục có cấu trúc: "vận động to" mà không khởi động, không đo nhịp, không hạ nhiệt thì vẫn chỉ là trò chơi, chưa phải bài thể dục.
const PE_RULES = [
  [PE.warmUp, 'thiếu bước khởi động 60–90 giây trước hiệp 1'],
  [PE.pace, 'thiếu nhịp thẻ 3,0–4,5 giây / >= 12 nhịp chuyển động mỗi phút'],
  [PE.activeShare, 'thiếu đồng hồ thời gian vận động >= 60% thời lượng phiên'],
  [PE.coolDown, 'thiếu bước hạ nhiệt 45–60 giây trước màn tổng kết'],
  [PE.water, 'thiếu nhắc uống nước đúng một lần ở tổng kết'],
  [PE.loadCap, 'thiếu trần tải trọng động (cấm nhảy tiếp đất, xoay nhanh, tay trên cao quá 15 giây)'],
];
// Nhớ bài lâu dài: một game dạy rất vui trong 5 phút mà không có mốc ôn thì trả lại kiến thức cho cô giáo sau ba ngày.
const RET_RULES = [
  [RETENTION.spacedQueue, 'thiếu lịch ôn có mốc +1/+3/+7 ngày trong "miti-review"'],
  [RETENTION.interleave, 'thiếu quy định >= 3/12 lượt xen cụm kiến thức khác'],
  [RETENTION.recallPrimer, 'thiếu câu mở màn "Em còn nhớ không?" 10 giây trước lượt 1'],
  [RETENTION.explainBack, 'thiếu câu hỏi lại "Vì sao đúng?" ở 4/12 lượt'],
  [RETENTION.forgettingGuard, 'thiếu quy định quên không bị phạt + tổng kết "vẫn nhớ / cần ôn lại"'],
  [RETENTION.teacherNote, 'thiếu tờ rời copy được cho giáo viên'],
];
// Thi đua + cao trào: cảm giác chờ đợi và mốc để phá là thứ giữ học sinh quay lại, không phải cú chạm đẹp.
const HYPE_RULES = [
  [HYPE.hook, 'thiếu cú "ồ" ba giây đầu khi vào gameplay'],
  [HYPE.personalBest, 'thiếu kỷ lục của chính em trong "miti-best" + sự kiện PHÁ KỶ LỤC'],
  [HYPE.ghost, 'thiếu vệt ghost của lượt tốt nhất phiên trước (alpha <= 0.35)'],
  [HYPE.climax, 'thiếu hiệp 3 "HIỆP QUYẾT ĐỊNH" (nhân đôi điểm, vẫn 4 lượt)'],
  [HYPE.reveal, 'thiếu nghi thức mở thưởng 2,5 giây cuối mỗi hiệp'],
  [HYPE.sharedGoal, 'thiếu đích chung "Cả nhóm: <x>/<mốc>", không xếp hạng bạn'],
];
// Ham quay lại: cảm giác "sắp chạm mốc" và "có thứ đang chờ mình" là hai lý do trẻ bấm Chơi lại.
const ANT_RULES = [
  [ANT.nearMiss, 'thiếu dòng báo "Còn 1 câu nữa tới mốc <m>" (10/20/30 câu đúng)'],
  [ANT.carryToken, 'thiếu khiên chuỗi để dành trong "miti-tokens" (tối đa 2, vẫn trừ tim)'],
  [ANT.openLoop, 'thiếu dòng "Chương tiếp theo" hé mở ở màn tổng kết'],
  [ANT.comeback, 'thiếu hẹn "Lần sau em quay lại sẽ có <n> câu đang chờ" từ "miti-review"'],
  [ANT.collectionGap, 'thiếu chỗ trống gọi tên "? ? ?" trong lưới 6 ô của bộ sưu tập'],
  [ANT.saveCeremony, 'thiếu nghi thức lưu phiên 3 giây "Đã lưu: ..."'],
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
  for (const [needle, msg] of ACCESS_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of VERIFY_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of ADAPT_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of ACCEPT_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of PE_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of RET_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of HYPE_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of ANT_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  if (!t.includes(HYPE_SHORT)) bad(`${g.id}: chuỗi tự kiểm ở phần ĐẦU RA thiếu phần thi đua + cao trào.`);
  if (!t.includes(ANT_SHORT)) bad(`${g.id}: chuỗi tự kiểm ở phần ĐẦU RA thiếu phần ham quay lại.`);
  // Bố cục phải nhét khởi động vào TRƯỚC 12 lượt và hạ nhiệt vào TRƯỚC màn tổng kết, không phải để ngoài luồng.
  if (!t.includes('KHỞI ĐỘNG 60–90 giây → 10 giây "Em còn nhớ không?" → 12 lượt chính')) bad(`${g.id}: bố cục thiếu khởi động rồi thiếu câu "Em còn nhớ không?" ngay trước 12 lượt chính.`);
  if (!t.includes('HẠ NHIỆT 45–60 giây → Kết quả')) bad(`${g.id}: bố cục thiếu bước hạ nhiệt ngay trước màn Kết quả.`);
  if (!t.includes(GESTURES[g.gestures[0]].bien_do)) bad(`${g.id}: prompt thiếu biên độ động tác của cử chỉ chính ${g.gestures[0]}.`);
  if (SUBJ_OF.get(g.id) === 'Tiếng Anh' && !t.includes(RULES.listening)) bad(`${g.id}: game Tiếng Anh thiếu nguyên tắc nghe-trước.`);
  if (t.includes('${')) bad(`${g.id}: còn ký tự template chưa nội suy (${t.match(/\$\{[^}]*}/)[0]}).`);
  if (/[\u3400-\u9fff\u3040-\u30ff]/.test(t)) bad(`${g.id}: prompt lẫn ký tự CJK.`);
  if (t.includes('MIXED')) bad(`${g.id}: prompt vẫn ghi điều khiển MIXED.`);
  // "Tăng độ khó ở lượt 5 và lượt 9" là thang level theo VỊ TRÍ, đã bị ADAPT.levelShift thay thế.
  if (/[Tt]ăng độ khó ở lượt 5/.test(t)) bad(`${g.id}: vẫn dùng độ khó theo vị trí lượt chơi, phải theo thích ứng (ADAPT.levelShift).`);
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
  for (const needle of ['60/40', 'calibration 3 giây', 'tự Pause', 'ba thẻ chữ to', 'hit-stop', 'trạm nghỉ', 'VẬN ĐỘNG TO + CẢM GIÁC ARCADE', 'LỚP HỌC THẬT', 'miti-mastery', 'maxNumHands: 2', 'TIẾP CẬN + AN TOÀN THẦN KINH', '3 lần mỗi giây', 'prefers-reduced-motion', '>= 4.5:1', 'Em thuận tay nào?', '✓ ✗', 'verifyQuestionBank()', '1/4 số mục', '1/3 số mục ± 10%', 'Sàn chống nản', 'cùng errorTag với câu vừa sai', 'Level ẩn với học sinh']) {
    if (!t.includes(needle)) bad(`${l.id}: khối chuẩn MiTi thiếu quy định lớp học "${needle}".`);
  }
  if (!t.includes('#FFD84D')) bad(`${l.id}: thiếu chữ ký MiTi trong prompt.`);
  for (const [needle, msg] of ACCEPT_RULES) if (!t.includes(needle)) bad(`${l.id}: ${msg}.`);
  for (const [needle, msg] of PE_RULES) if (!t.includes(needle)) bad(`${l.id}: ${msg}.`);
  for (const [needle, msg] of RET_RULES) if (!t.includes(needle)) bad(`${l.id}: ${msg}.`);
  for (const [needle, msg] of HYPE_RULES) if (!t.includes(needle)) bad(`${l.id}: ${msg}.`);
  for (const [needle, msg] of ANT_RULES) if (!t.includes(needle)) bad(`${l.id}: ${msg}.`);
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
  if (!vtext.includes('- **Thi đua + cao trào:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Thi đua + cao trào.');
  if (!vtext.includes('- **Ham quay lại:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Ham quay lại.');
  if (!vtext.includes('- **Nghiệm thu:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Nghiệm thu.');
  if (!vtext.includes('prompts/CHECKLIST_NGHIEP_THU.md')) bad('Phần Quy ước chung của VARIANTS_425.md không trỏ tới bảng kiểm in sẵn.');
  VAR_COUNT = blocks.length;
  const CLASS_NEEDLES = [RULES.antiLuck, RULES.perf, RULES.autoPause, RULES.safety, RULES.summary];
  const FEEL_NEEDLES = [FEEL.hitStop, FEEL.combo, FEEL.cheer, FEEL.bonus, FEEL.fx];
  // Năm quy định tiếp cận áp cho cả V5 (không camera) — chỉ có tay thuận là riêng của biến thể đọc chuyển động tay.
  const ACCESS_NEEDLES = [ACCESS.flash, ACCESS.reducedMotion, ACCESS.notColorOnly, ACCESS.caption, ACCESS.contrast];
  // Ngân hàng câu hỏi và thích ứng là quy định về NỘI DUNG, mọi biến thể điều khiển đều phải mang.
  const Q_NEEDLES = [VERIFY.selfCheck, VERIFY.distractorValid, VERIFY.rangeGuard, VERIFY.noGuessable, VERIFY.difficultySteps, ADAPT.levelShift, ADAPT.failFloor, ADAPT.hiddenLevel];
  // Bảng kiểm nghiệm thu phải đi theo TỪNG block: người dùng copy một block riêng thì không có chỗ nào khác mà đọc quy định.
  const ACCEPT_NEEDLES = [ACCEPT.selfReport, ACCEPT.items, ACCEPT.printable, ACCEPT.failRule, ACCEPT.manual];
  // Thể dục có cấu trúc: năm bước giống nhau cho mọi biến thể; riêng đồng hồ vận động cần cơ thể trong khung hình.
  const PE_NEEDLES = [PE.warmUp, PE.pace, PE.coolDown, PE.water, PE.loadCap];
  // Nhớ bài phải đi theo từng block: người dùng copy một block thì lịch ôn không được biến mất.
  const RET_NEEDLES = [RETENTION.spacedQueue, RETENTION.interleave, RETENTION.recallPrimer, RETENTION.explainBack, RETENTION.forgettingGuard, RETENTION.teacherNote];
  const HYPE_NEEDLES = [HYPE.hook, HYPE.personalBest, HYPE.ghost, HYPE.climax, HYPE.reveal, HYPE.sharedGoal];
  const ANT_NEEDLES = [ANT.nearMiss, ANT.carryToken, ANT.openLoop, ANT.comeback, ANT.collectionGap, ANT.saveCeremony];
  blocks.forEach((b, i) => {
    for (const needle of CLASS_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy định "${needle.slice(0, 32)}...".`);
    const calibNeedle = b.includes('V5 — NO-CAMERA') || b.includes('V4 — VOICE') ? 'không cần calibration' : RULES.calibration;
    if (!b.includes(calibNeedle)) bad(`biến thể #${i + 1}: thiếu quy định calibration của đúng kiểu điều khiển.`);
    if (!b.includes('**Vận động:**')) bad(`biến thể #${i + 1}: thiếu dòng Vận động.`);
    if (!b.includes('**Cảm giác arcade:**')) bad(`biến thể #${i + 1}: thiếu dòng Cảm giác arcade.`);
    for (const needle of FEEL_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc arcade "${needle.slice(0, 30)}...".`);
    if (!b.includes('**Hồ sơ tiến bộ:**')) bad(`biến thể #${i + 1}: thiếu dòng Hồ sơ tiến bộ.`);
    if (!b.includes(CLASSROOM.mastery)) bad(`biến thể #${i + 1}: thiếu hồ sơ tiến bộ "miti-mastery".`);
    if (!b.includes('**Tiếp cận + an toàn thần kinh:**')) bad(`biến thể #${i + 1}: thiếu dòng Tiếp cận + an toàn thần kinh.`);
    for (const needle of ACCESS_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc tiếp cận "${needle.slice(0, 30)}...".`);
    if (!b.includes('**Tự kiểm chứng đề:**')) bad(`biến thể #${i + 1}: thiếu dòng Tự kiểm chứng đề.`);
    if (!b.includes('**Nhịp và độ khó:**')) bad(`biến thể #${i + 1}: thiếu dòng Nhịp và độ khó.`);
    for (const needle of Q_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc nội dung "${needle.slice(0, 30)}...".`);
    if (/[Tt]ăng độ khó ở lượt 5/.test(b)) bad(`biến thể #${i + 1}: vẫn dùng độ khó theo vị trí lượt chơi.`);
    if (!b.includes('**Bảng kiểm nghiệm thu:**')) bad(`biến thể #${i + 1}: thiếu dòng Bảng kiểm nghiệm thu.`);
    for (const needle of ACCEPT_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc nghiệm thu "${needle.slice(0, 30)}...".`);
    if (!/\*\*Nền AR:\*\*/.test(b) && !b.includes(ACCEPT.noCamera)) bad(`biến thể #${i + 1}: bản không camera thiếu dòng nói rõ mục nào được bỏ.`);
    if (!b.includes('**Thể dục có cấu trúc:**')) bad(`biến thể #${i + 1}: thiếu dòng Thể dục có cấu trúc.`);
    if (!b.includes('**Nhớ bài có lịch:**')) bad(`biến thể #${i + 1}: thiếu dòng Nhớ bài có lịch.`);
    for (const needle of RET_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc nhớ bài "${needle.slice(0, 30)}...".`);
    if (!b.includes('**Thi đua + cao trào:**')) bad(`biến thể #${i + 1}: thiếu dòng Thi đua + cao trào.`);
    for (const needle of HYPE_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc hào hứng "${needle.slice(0, 30)}...".`);
    if (!b.includes(HYPE_SHORT)) bad(`biến thể #${i + 1}: dòng tự kiểm thiếu phần thi đua + cao trào.`);
    if (!b.includes('**Ham quay lại:**')) bad(`biến thể #${i + 1}: thiếu dòng Ham quay lại.`);
    for (const needle of ANT_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc chờ đợi "${needle.slice(0, 30)}...".`);
    if (!b.includes(ANT_SHORT)) bad(`biến thể #${i + 1}: dòng tự kiểm thiếu phần ham quay lại.`);
    for (const needle of PE_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc thể dục "${needle.slice(0, 30)}...".`);
    const tracksBody = /\*\*Nền AR:\*\*/.test(b) && !b.includes('V4 — VOICE');
    if (tracksBody) {
      if (!b.includes(PE.activeShare)) bad(`biến thể #${i + 1}: block nhận diện cơ thể thiếu đồng hồ thời gian vận động.`);
    } else if (!b.includes(PE_NO_CAMERA)) {
      bad(`biến thể #${i + 1}: block không đo cơ thể thiếu dòng đổi cách đo cường độ.`);
    }
    if (/\*\*Nền AR:\*\*/.test(b)) {
      for (const needle of [MOTION.amplitude, MOTION.reach, MOTION.variety, MOTION.breather, MOTION.meter, FEEL.mascot]) {
        if (!b.includes(needle)) bad(`biến thể #${i + 1}: block camera thiếu "${needle.slice(0, 30)}...".`);
      }
      if (!b.includes('**Biên độ động tác:**')) bad(`biến thể #${i + 1}: block camera thiếu biên độ riêng của cử chỉ.`);
      if (!b.includes(CLASSROOM.safeZone)) bad(`biến thể #${i + 1}: block camera thiếu vùng an toàn cho HUD.`);
      if (!b.includes(CLASSROOM.framing)) bad(`biến thể #${i + 1}: block camera thiếu đàm phán mức camera.`);
      if (!b.includes('V4 — VOICE') && !b.includes(CLASSROOM.twoPlayer)) bad(`biến thể #${i + 1}: block camera thiếu chế độ hai học sinh.`);
      if (!b.includes('V4 — VOICE') && !b.includes(ACCESS.handedness)) bad(`biến thể #${i + 1}: block camera thiếu câu hỏi tay thuận.`);
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

// 7c. Bảng kiểm nghiệm thu in được: file phải tồn tại, đủ số dòng, và khớp từng chuỗi trong lib.
const CHECK_FILE = path.join(ROOT, 'prompts', 'CHECKLIST_NGHIEP_THU.md');
let checkRows = 0;
if (!fs.existsSync(CHECK_FILE)) {
  bad('Thiếu prompts/CHECKLIST_NGHIEP_THU.md — chạy `node tools/build-acceptance.mjs`.');
} else {
  const c = fs.readFileSync(CHECK_FILE, 'utf8').replace(/\r\n/g, '\n');
  for (const needle of [ACCEPT.selfReport, ACCEPT.items, ACCEPT.printable, ACCEPT.failRule, ACCEPT.manual]) {
    if (!c.includes(needle)) bad(`Bảng kiểm thiếu quy định nghiệm thu "${needle.slice(0, 40)}...".`);
  }
  checkRows = c.split('\n').filter((l) => l.startsWith('- [ ] ')).length;
  if (checkRows !== MACHINE_ITEMS.length) bad(`Bảng kiểm phải có ${MACHINE_ITEMS.length} dòng máy tự kiểm, hiện có ${checkRows}.`);
  const humanRows = c.split('\n').filter((l) => /^\d+\. /.test(l)).length;
  if (humanRows !== HUMAN_CHECKS.length) bad(`Bảng kiểm phải có ${HUMAN_CHECKS.length} việc người thử, hiện có ${humanRows}.`);
  const camRows = c.split('\n').filter((l) => l.startsWith('- [ ] ') && l.includes('📷')).length;
  if (camRows !== CAMERA_ONLY.length) bad(`Bảng kiểm phải gắn 📷 cho đúng ${CAMERA_ONLY.length} mục camera, hiện có ${camRows}.`);
  if (!c.includes(String(OFFLINE_ITEMS))) bad(`Bảng kiểm phải ghi rõ bản không camera còn ${OFFLINE_ITEMS} mục phải đạt.`);
  for (const item of MACHINE_ITEMS) if (!c.includes(item)) bad(`Bảng kiểm thiếu mục máy tự kiểm "${item.slice(0, 40)}...".`);
  for (const item of HUMAN_CHECKS) if (!c.includes(item)) bad(`Bảng kiểm thiếu việc người thử "${item.slice(0, 40)}...".`);
}

// 7d. Master prompt phải ghi đúng số mục của bảng kiểm — lib đổi số mà master vẫn giữ số cũ thì người viết prompt làm theo bản sai.
const masterFile = path.join(ROOT, 'prompts', '00-master-canvas-prompt.md');
const master = fs.readFileSync(masterFile, 'utf8');
for (const needle of [`${MACHINE_ITEMS.length} MỤC MÁY TỰ KIỂM`, `${HUMAN_CHECKS.length} VIỆC NGƯỜI THỬ`, '11. NGHIỆM THU', 'prompts/CHECKLIST_NGHIEP_THU.md', `${CAMERA_ONLY.length} mục`, `${OFFLINE_ITEMS} mục còn lại`]) {
  if (!master.includes(needle)) bad(`Master prompt thiếu/ch lệch nghiệm thu "${needle}".`);
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

// 7e. Tài liệu hướng dẫn (master · template · README) phải giữ đúng số mục và đủ sáu quy định thể dục.
// Những file này sửa tay nên lệch số là chuyện xảy ra thật: lib đổi 16 -> 19 mục mà README vẫn viết 16
// thì người viết prompt làm theo bản sai, và không có gì báo.
const PE_DOC_NEEDLES = [
  ['60–90', 'khởi động'],
  ['3,0–4,5', 'nhịp thẻ'],
  ['nhịp chuyển động mỗi phút', 'cường độ đếm được'],
  ['45–60', 'hạ nhiệt'],
  ['ngụm nước', 'nhắc uống nước'],
  ['90 độ', 'trần tải trọng'],
  ['+1', 'lịch ôn +1/+3/+7 ngày'],
  ['Em còn nhớ không?', 'câu mở màn kiểm trí nhớ'],
  ['Vì sao', 'hỏi lại vì sao đúng'],
  ['tờ rời', 'tờ rời cho giáo viên'],
  ['PHÁ KỶ LỤC', 'sự kiện phá kỷ lục của chính em'],
  ['HIỆP QUYẾT ĐỊNH', 'hiệp 3 leo thang'],
  ['miti-best', 'kỷ lục lưu trong miti-best'],
  ['mở thưởng', 'nghi thức mở thưởng cuối hiệp'],
  ['Cả nhóm', 'đích chung của nhóm, không xếp hạng'],
  ['ghost', 'vệt ghost của phiên trước'],
  ['miti-tokens', 'khiên chuỗi để dành trong miti-tokens'],
  ['Chương tiếp theo', 'màn tổng kết hé chương tiếp theo'],
  ['câu đang chờ', 'hẹn lần sau bằng số câu đến hạn'],
  ['? ? ?', 'chỗ trống chưa mở trong bộ sưu tập'],
  ['Đã lưu', 'nghi thức lưu phiên'],
  ['Còn 1 câu nữa tới mốc', 'dòng báo sắp chạm mốc'],
];
// Con số cũ của vòng 6 ("< 8 động tác lớn mỗi phút") là yêu cầu KHÔNG THỂ đạt với phiên 12 lượt / 4–6 phút.
// Giữ nó trong tài liệu sẽ sinh game luôn báo CHƯA ĐẠT ở mục cường độ, nên phải bị chặn.
const SUPERSEDED = [
  [/>= 8 động tác lớn mỗi phút/, 'còn dùng con số cường độ cũ (>= 8 động tác lớn mỗi phút) — đã thay bằng >= 12 nhịp chuyển động mỗi phút'],
];
const DOC_FILES = [
  ['prompts/00-master-canvas-prompt.md', master],
  ['prompts/templates/game-prompt-template.md', tpl],
  ['README.md', fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8')],
  ['prompts/README.md', fs.readFileSync(path.join(ROOT, 'prompts', 'README.md'), 'utf8')],
];
for (const [docName, docText] of DOC_FILES) {
  for (const [needle, label] of PE_DOC_NEEDLES) {
    if (!docText.includes(needle)) bad(`${docName} thiếu quy định (${label}): không thấy "${needle}".`);
  }
  for (const [re, msg] of SUPERSEDED) if (re.test(docText)) bad(`${docName}: ${msg}.`);
}
// Mọi con số nói về bảng kiểm trong tài liệu phải khớp lib — tính bằng regex, khôngHard-code số cũ.
const COUNT_PATTERNS = [
  [/([0-9]+) MỤC MÁY TỰ KIỂM/g, MACHINE_ITEMS.length, 'số mục máy tự kiểm (chữ hoa)'],
  [/([0-9]+) mục máy tự kiểm/g, MACHINE_ITEMS.length, 'số mục máy tự kiểm'],
  [/([0-9]+) VIỆC NGƯỜI THỬ/g, HUMAN_CHECKS.length, 'số việc người thử (chữ hoa)'],
  [/([0-9]+) việc người thử/g, HUMAN_CHECKS.length, 'số việc người thử'],
  [/([0-9]+) mục còn lại/g, OFFLINE_ITEMS, 'số mục bản không camera còn phải đạt'],
];
for (const [docName, docText] of DOC_FILES) {
  for (const [re, want, label] of COUNT_PATTERNS) {
    for (const m of docText.matchAll(re)) {
      if (Number(m[1]) !== want) bad(`${docName} ghi "${m[0]}" (${label}) nhưng lib hiện có ${want} — chạy lại build hoặc sửa tài liệu.`);
    }
  }
  // COUNT_PATTERNS chỉ chặn số SAI; xóa hẳn con số thì vẫn xanh (probe D8 vòng 9). Tài liệu hướng dẫn
  // mà không nêu số mục thì người viết prompt không biết bảng kiểm dài bao nhiêu để đối chiếu.
  for (const [re, label] of [[/([0-9]+) mục máy tự kiểm/i, 'số mục máy tự kiểm'], [/([0-9]+) việc người thử/i, 'số việc người thử'], [/([0-9]+) mục còn lại/i, 'số mục bản không camera còn phải đạt']]) {
    if (!re.test(docText)) bad(`${docName} không còn nêu ${label} — tài liệu phải ghi con số hiện hành của bảng kiểm để người viết prompt đối chiếu.`);
  }
}
// Số mục của khung master phải khớp số heading cấp 1 thật trong file, để không ai quảng cáo "khung 10 mục" cho một file 13 mục.
const masterSections = (master.match(/^[0-9]+\. [A-ZÀ-Ỹ]/gm) || []).length;
for (const [docName, docText] of DOC_FILES.filter(([n]) => n !== 'prompts/00-master-canvas-prompt.md')) {
  if (!new RegExp(`khung( chuẩn| master)? ${masterSections} mục`, 'i').test(docText)) {
    bad(`${docName} phải ghi "khung ${masterSections} mục" khớp số mục thật của master prompt (file hiện có ${masterSections} heading cấp 1).`);
  }
}

// 7g. Mỗi tầng quy định phải còn cả heading trong master lẫn dòng checklist trong template.
// Probe vòng 9: xóa heading "8.3 HAM QUAY LẠI" hoặc xóa dòng "Phần ham quay lại đã điền đủ" thì
// validate vẫn xanh, vì sáu chuỗi quy định vẫn còn ở mục khác của file — nghĩa là tài liệu hướng
// dẫn có thể mất trọn một mục mà không ai báo.
const DOC_LAYERS = [
  ['vận động to', '4.3 BIÊN ĐỘ VẬN ĐỘNG', 'Phần vận động đã điền đủ'],
  ['độ khó thích ứng', '4.4 ĐỘ KHÓ THÍCH ỨNG', 'Phần thích ứng đã điền đủ'],
  ['thể dục có cấu trúc', '4.5 THỂ DỤC CÓ CẤU TRÚC', 'Phần thể dục có cấu trúc đã điền đủ'],
  ['nhớ bài có lịch', '5.1 NHỚ BÀI CÓ LỊCH', 'Phần nhớ bài đã điền đủ'],
  ['hồ sơ tiến bộ + lớp học', '6.1 HỒ SƠ TIẾN BỘ XUYÊN PHIÊN', 'Phần lớp học đã điền đủ'],
  ['tự kiểm chứng đề', '6.2 TỰ KIỂM CHỨNG NGÂN HÀNG CÂU HỎI', 'Phần kiểm chứng đề đã điền đủ'],
  ['cảm giác arcade', '8.1 CẢM GIÁC ARCADE', 'Phần arcade đã điền đủ'],
  ['thi đua + cao trào', '8.2 THI ĐUA + CAO TRÀO', 'Phần thi đua + cao trào đã điền đủ'],
  ['ham quay lại', '8.3 HAM QUAY LẠI', 'Phần ham quay lại đã điền đủ'],
  ['tiếp cận + an toàn thần kinh', '9.1 TIẾP CẬN + AN TOÀN THẦN KINH', 'Phần tiếp cận đã điền đủ'],
];
for (const [label, heading, bullet] of DOC_LAYERS) {
  if (!master.includes(heading)) bad(`Master prompt thiếu mục "${heading}" (${label}) — quy định có trong lib nhưng khung hướng dẫn mất mục thì người viết prompt theo master sẽ không thấy.`);
  if (!tpl.includes(bullet)) bad(`Template thiếu dòng checklist "${bullet}" (${label}) — người viết prompt không bị nhắc phải điền tầng này.`);
}

if (errors.length) {
  console.error('Xác minh thất bại — ' + errors.length + ' vấn đề:');
  for (const e of errors.slice(0, 40)) console.error('  • ' + e);
  if (errors.length > 40) console.error('  ... và ' + (errors.length - 40) + ' vấn đề khác.');
  process.exit(1);
}
console.log(`Xác minh đạt: ${rows.length} dòng catalog, ${GAMES.length} prompt game, ${VAR_COUNT} prompt biến thể, ${CLUSTER_KEYS.length} cụm kiến thức, ${LEGACY.length} prompt legacy, ${cat.games.length + cat.legacy.length} card dashboard, bảng kiểm ${checkRows}/${MACHINE_ITEMS.length} mục máy + ${HUMAN_CHECKS.length} việc người thử.`);
