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
import { ACCESS, ACCESS_SHORT } from './lib/access.mjs';
import { VERIFY, ADAPT, VERIFY_SHORT } from './lib/verify.mjs';
import { CHALK, CHALK_SHORT, CHALK_SHORT_HINH, CHALK_SHORT_THAN, chalkShortFor, SOLID_CLUSTERS, BODY_CLUSTERS, SO_QUY_DINH, SO_TU_CHUNG } from './lib/chalk.mjs';
import { LESSON, LESSON_SHORT, HO_TRO, LESSON_BAN_WORDS } from './lib/lesson.mjs';
import { AR_LESSON, AR_LESSON_SHORT } from './lib/ar.mjs';
import { PROP_KEYS, prop } from './data/props.mjs';
import { buildLessons, LESSON_EXTRA, LESSON_EXTRA_KEYS, LESSON_FIELDS, OVERRIDE_FIELDS, notesCuaGiaoAn, CHU_DE_CHI_CO_GIAO_AN, CHUA_CO_GAME_CUM } from './data/lessons.mjs';
import { danhSachNhanLoi, noteChoLoi, ERROR_TAGS, ERROR_TAG_KEYS } from './data/error-tags.mjs';

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
// Quy định của BỘ GIÁO ÁN: khai báo ở đây để dùng cho cả hai chiều kiểm —
// giáo án phải có đủ, và prompt game thì không được mang.
const CHALK_RULES = [
  [CHALK.board, 'thiếu quy định bảng phấn ảo (alpha, cỡ bảng, trần occlusion theo vai)'],
  [CHALK.chalkWrite, 'thiếu quy định viết phấn bằng pinch ngón 4–8 và lau bằng nắm bàn tay'],
  [CHALK.concretize, 'thiếu quy định mọi con số thành vật đếm được'],
  [CHALK.represent, 'thiếu chặng SƠ ĐỒ của khung Concrete-Representational-Abstract'],
  [CHALK.wordProblem, 'thiếu quy định dựng bài toán đố thành cảnh kéo được'],
  [CHALK.fractionCut, 'thiếu quy định chia phân số theo số phần 2–12'],
  [CHALK.measure, 'thiếu quy định đọc số đo từ dụng cụ có vạch chia'],
  [CHALK.narrate, 'thiếu quy định lời giải viết phấn từng bước có hỏi lại'],
  [CHALK.handCare, 'thiếu quy định chống mỏi tay và đóng băng nét khi mất tay'],
  [CHALK.persist, 'thiếu quy định lưu bảng của tiết dạy vào localStorage'],
];
// Hai quy định hình học chỉ đúng với một số cụm kiến thức, nên kiểm cả hai chiều:
// bài có khối mà thiếu là lỗ hổng, bài chỉ có phân số mà mang theo là rác trong prompt.
const CHALK_COND = [
  [CHALK.solid3d, SOLID_CLUSTERS, 'khối 3D', 'thiếu quy định vẽ khối (cạnh khuất nét đứt, xoay khối, mở hộp, xếp lớp đếm tầng)'],
  [CHALK.bodyTool, BODY_CLUSTERS, 'dụng cụ thân người', 'thiếu quy định dùng thân người làm thước góc và ê-ke (đỉnh là vai 11/12, hai tia qua khuỷu 13/14)'],
];
// Vế rút gọn trong checklist tự kiểm (mục 10) phải đi theo đúng hai danh sách trên, cùng chiều
// với mục 4. Trước vòng 7 hai vế này nằm thường trực trong CHALK_SHORT nên bài phân số cũng bị
// yêu cầu "xoay khối", học sinh kiểm nhau bằng một việc không tồn tại trong tiết.
const CHALK_COND_SHORT = [
  [CHALK_SHORT_HINH, SOLID_CLUSTERS, 'vế khối 3D của checklist'],
  [CHALK_SHORT_THAN, BODY_CLUSTERS, 'vế thân người làm thước góc của checklist'],
];
// Checklist tự kiểm (mục 10) được lắp từ các chuỗi *_SHORT, còn quy định đầy đủ in ra ở mục 4.
// Vòng 7b phải bắt bằng tay một vụ lệch đúng loại này: vế "xoay khối" vẫn nằm trong checklist trong
// khi mục 4 đã thôi không bắt bài phân số xoay khối nữa, thành thử cả lớp tự kiểm một việc tiết học
// không có. Cửa dưới chặn cùng loại lỗi ở chiều xuôi: mỗi con số trong một vế rút gọn phải còn có
// mặt trong quy định đầy đủ cùng cặp. Chiều ngược (mọi quy định có số phải vào checklist) chưa siết
// được vì nhiều quy định đầy đủ không thuộc phần tự kiểm, ADAPT_SHORT lại là của họ game — nhánh
// giáo án không được sửa chuỗi dùng chung đó.
const CAC_CAP_SHORT = [
  ['CHALK_SHORT', CHALK_SHORT, CHALK],
  ['CHALK_SHORT_HINH', CHALK_SHORT_HINH, CHALK],
  ['CHALK_SHORT_THAN', CHALK_SHORT_THAN, CHALK],
  ['LESSON_SHORT', LESSON_SHORT, LESSON],
  ['AR_LESSON_SHORT', AR_LESSON_SHORT, AR_LESSON],
  ['VERIFY_SHORT', VERIFY_SHORT, VERIFY],
  ['ACCESS_SHORT', ACCESS_SHORT, ACCESS],
];
// AR_LESSON là một chuỗi liền, các khối kia là object {ten: chui} — quy về một mối trước khi so.
const loiDayDu = (x) => (typeof x === 'string' ? x : Object.values(x).join(' '));
// Bỏ hết ký tự không phải số trong từng token để "0.55" và "0,55" so được với nhau.
const soTrong = (s) => (String(s).match(/\d[\d.,]*/g) || []).map((n) => n.replace(/\D/g, ''));
for (const [ten, ngan, dayDu] of CAC_CAP_SHORT) {
  const canon = new Set(soTrong(loiDayDu(dayDu)));
  for (const ve of String(ngan).split(' · ')) {
    for (const n of soTrong(ve)) {
      if (!canon.has(n)) bad(`${ten} mang con số ${n} trong khi quy định đầy đủ cùng cặp không còn số đó (vế: "${ve.trim().slice(0, 70)}") — sửa ${ten} cho khớp vế đầy đủ, hoặc sửa vế đầy đủ rồi chạy lại node tools/build.mjs.`);
    }
  }
}
const LESSON_RULES = [
  [LESSON.teacher, 'thiếu chế độ giáo viên trình bày trên màn chiếu'],
  [LESSON.boardText, 'thiếu quy định quyền ưu tiên cỡ chữ cỡ bảng khi giảng bài'],
  [LESSON.noGame, 'thiếu quy định cấm cơ chế game trong tiết giảng'],
  [LESSON.pace, 'thiếu quy định nhịp giảng do giáo viên quyết định'],
  [LESSON.flow, 'thiếu năm bước của giáo án kèm ngân sách phút của tiết 35 phút'],
  [LESSON.handover, 'thiếu quy định "Mời em lên bảng"'],
  [LESSON.strayHands, 'thiếu quy định bỏ qua bàn tay lạ trong lớp đông'],
  [LESSON.classVote, 'thiếu quy định cả lớp trả lời bằng ngón tay'],
  [LESSON.voteMap, 'thiếu quy định ánh xạ số ngón tay sang nhãn đáp án A–D'],
  [LESSON.diagnose, 'thiếu bảng chẩn đoán cuối tiết theo errorTag'],
  [LESSON.retain, 'thiếu quy định bảng không bao giờ tự lau'],
  [LESSON.recog, 'thiếu quy định phản hồi nhận diện trên màn chiếu (bộ xương 21 khớp, trạng thái bốn mức, độ trễ ms)'],
  [LESSON.release, 'thiếu quy định rút hỗ trợ dần dần ba mức (cô làm mẫu / cả lớp làm cùng cô / em tự làm)'],
];
// Ngân hàng LESSON_DATA phải được kiểm chứng y hệt QUESTION_DATA, nếu không thì giáo án âm thầm dạy sai.
const LESSON_VERIFY_RULES = [
  [VERIFY.selfCheck, 'thiếu hàm verifyQuestionBank() kiểm LESSON_DATA trước Bước 5'],
  [VERIFY.distractorValid, 'thiếu quy định phương án nhiễu của LESSON_DATA sai theo một lỗi thật'],
  [VERIFY.rangeGuard, 'thiếu guard phạm vi kiến thức cho LESSON_DATA'],
  [VERIFY.noGuessable, 'thiếu quy định chống đoán mò bằng cấu trúc đáp án cho LESSON_DATA'],
];
const LESSON_FAMILY_RULES = [...CHALK_RULES, ...CHALK_COND, ...LESSON_RULES].map(([n]) => n).concat([AR_LESSON]);
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
  // Hai sản phẩm tách bạch: quy định bảng phấn và chế độ giảng bài chỉ thuộc về prompts/giao-an/.
  for (const needle of LESSON_FAMILY_RULES) {
    if (t.includes(needle)) bad(`${g.id}: prompt game mang quy định của bộ giáo án ("${needle.slice(0, 40)}...") — bảng phấn thuộc về prompts/giao-an/.`);
  }
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
  for (const [re, msg] of AR_RULES.filter(([, m]) => m !== 'thiếu mô tả AR của cử chỉ chính')) {
    if (!re.test(t)) bad(`${l.id}: ${msg}.`);
  }
  if (/cdn\.tailwindcss\.com|@mediapipe\/hands|@mediapipe\/camera_utils|Tone\.js/.test(t.replace(/LEGACY \(LEG-[\d]+\)[^\n]*/, ''))) bad(`${l.id}: vẫn còn phụ thuộc bị cấm (Tailwind CDN / MediaPipe legacy / Tone.js).`);
  for (const needle of LESSON_FAMILY_RULES) if (t.includes(needle)) bad(`${l.id}: prompt legacy mang quy định của bộ giáo án ("${needle.slice(0, 40)}...").`);
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
    for (const needle of LESSON_FAMILY_RULES) if (b.includes(needle)) bad(`${tag}: block biến thể mang quy định của bộ giáo án ("${needle.slice(0, 40)}...").`);
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
  // Năm quy định tiếp cận áp cho cả V5 (không camera) — chỉ có tay thuận là riêng của biến thể đọc chuyển động tay.
  const ACCESS_NEEDLES = [ACCESS.flash, ACCESS.reducedMotion, ACCESS.notColorOnly, ACCESS.caption, ACCESS.contrast];
  // Ngân hàng câu hỏi và thích ứng là quy định về NỘI DUNG, mọi biến thể điều khiển đều phải mang.
  const Q_NEEDLES = [VERIFY.selfCheck, VERIFY.distractorValid, VERIFY.rangeGuard, VERIFY.noGuessable, VERIFY.difficultySteps, ADAPT.levelShift, ADAPT.failFloor, ADAPT.hiddenLevel];
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

// 4c. Bộ giáo án giảng bài (prompts/giao-an/): tách hẳn khỏi 85 prompt game.
// Hai bộ dùng chung chalk.mjs và props.mjs nhưng PHẢI khác nhau về cơ chế — giáo án mà lẫn
// tim, điểm, combo hay mascot thì em lên bảng sợ sai hơn là muốn hiểu.
const LESSON_DIR = path.join(ROOT, 'prompts', 'giao-an');
let LESSON_COUNT = 0;
if (!fs.existsSync(LESSON_DIR)) {
  bad('Thiếu prompts/giao-an/ — chạy `node tools/build-lessons.mjs`.');
} else {
  const lessons = buildLessons(rows, { cluster, prop, EXAMPLES, GAMES });
  LESSON_COUNT = lessons.length;
  const LESSON_MUST = [
    '0. ĐÂY LÀ CÔNG CỤ GIẢNG BÀI, KHÔNG PHẢI GAME',
    '1. MỤC TIÊU VÀ ĐỒ DÙNG',
    '2. MẠCH BÀI GỒM NĂM BƯỚC',
    '3. DỮ LIỆU CỦA BÀI (LESSON_DATA)',
    '4. BẢNG PHẤN VÀ VẬT THẬT',
    '5. CẢ LỚP THAM GIA',
    '6. NỀN AR, CAMERA VÀ NHẬN DIỆN TAY',
    '7. CHẾ ĐỘ KHÔNG CAMERA (bắt buộc, đây là chế độ dạy chính ở nhiều lớp)',
    '8. TIẾP CẬN, AN TOÀN VÀ HIỆU NĂNG',
    '9. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML',
    '10. ĐẦU RA',
  ];
  // Cơ chế chỉ được có ở game. Lọt sang giáo án là sai mục đích của cả nhánh này.
  // Cơ chế chỉ được có ở game. Với ngân hàng câu hỏi thì bắt đúng CHỮ KÝ KHAI BÁO
  // "const QUESTION_DATA", vì giáo án được phép NHẮC tên QUESTION_DATA khi so sánh với
  // LESSON_DATA — cái cấm là mang luôn ngân hàng của game vào tiết giảng.
  const GAME_ONLY = [
    'const QUESTION_DATA', 'miti-collection', '12 lượt chính', '+10 nhân chuỗi', 'hết 5 tim',
    MOTION.amplitude, MOTION.breather, FEEL.hitStop, FEEL.combo, FEEL.bonus, FEEL.mascot,
    RULES.antiLuck, RULES.summary, CLASSROOM.mastery, CLASSROOM.twoPlayer,
    // Ba vế này lọt vào giáo án qua khối AR dùng chung từ 2026-09-30 đến vòng 3 mới bị chặn:
    // giáo án vẽ video trong panel còn game vẽ phủ khung hình, nên hai hình học khác nhau.
    'CHÍNH LÀ màn chơi', 'vị trí spawn, va chạm', 'đường tốc độ (speed lines) dọc hai bên mép',
  ];
  const files = fs.readdirSync(LESSON_DIR);
  if (!files.includes('README.md')) bad('Thiếu prompts/giao-an/README.md — trang mục lục của bộ giáo án.');
  const expected = new Set([...lessons.map((l) => `${l.id}-${l.slug}.md`), 'README.md']);
  for (const f of files) if (!expected.has(f)) bad(`prompts/giao-an/ thừa file không khớp danh sách giáo án: ${f}.`);
  if (files.length !== expected.size) bad(`prompts/giao-an/ phải có đúng ${expected.size} file (${lessons.length} giáo án + README), hiện có ${files.length}.`);

  const ids = new Set();
  const clusterPairs = new Set();
  for (const L of lessons) {
    if (ids.has(L.id)) bad(`Trùng mã giáo án: ${L.id}`);
    ids.add(L.id);
    clusterPairs.add(`${L.cluster}|${L.lop}`);
    const rel = `prompts/giao-an/${L.id}-${L.slug}.md`;
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) { bad(`Thiếu file giáo án: ${rel}`); continue; }
    const t = fs.readFileSync(file, 'utf8');
    const tag = L.id;
    for (const m of LESSON_MUST) if (!t.includes(m)) bad(`${tag}: giáo án thiếu mục ${m}.`);
    for (const [needle, msg] of CHALK_RULES) if (!t.includes(needle)) bad(`${tag}: ${msg}.`);
    for (const [needle, msg] of LESSON_RULES) if (!t.includes(needle)) bad(`${tag}: ${msg}.`);
    for (const [needle, msg] of LESSON_VERIFY_RULES) if (!t.includes(needle)) bad(`${tag}: ${msg}.`);
    // Bậc rút hỗ trợ: ba giá trị ho_tro, phân bố 2-2-2, và hai mục mẫu phải mang đúng hai mức đầu.
    for (const h of HO_TRO) if (!t.includes(h)) bad(`${tag}: thiếu mức hỗ trợ "${h}" của trường ho_tro.`);
    if (!t.includes('ho_tro')) bad(`${tag}: khuôn LESSON_DATA thiếu trường ho_tro.`);
    if (!t.includes('2-2-2')) bad(`${tag}: thiếu phân bố bắt buộc 2-2-2 của ba mức hỗ trợ.`);
    if (!t.includes('ho_tro: ' + JSON.stringify(HO_TRO[0])) || !t.includes('ho_tro: ' + JSON.stringify(HO_TRO[1]))) {
      bad(`${tag}: hai mục mẫu chưa mang hai mức hỗ trợ đầu tiên (cô làm mẫu, cả lớp làm cùng cô).`);
    }
    // "cùng độ khó" là lệnh thả cả lớp từ chỗ cô cầm tay sang chỗ tự làm, đã bị LESSON.release thay.
    if (t.includes('cùng độ khó')) bad(`${tag}: vẫn bắt LESSON_DATA "cùng độ khó" — phải chia bậc hỗ trợ 2-2-2 theo LESSON.release.`);
    // AR của tiết học: bảng >= 70% màn chiếu và camera chỉ là panel soi tay, không phải nền lớp học.
    if (!t.includes(AR_LESSON)) bad(`${tag}: thiếu khối AR riêng của công cụ giảng bài (AR_LESSON trong tools/lib/ar.mjs).`);
    for (const [re, msg] of [
      [/boardFrom\(cam\)/, 'thiếu phép biến đổi một điểm bàn tay → một điểm trên mặt bảng'],
      [/camX \+ \(1 - lx\) \* camW/, 'thiếu hàm chiếu landmark theo chữ nhật panel'],
      [/độ trễ X ms|độ trễ giữa chuyển động tay và nét phấn/, 'thiếu số đo độ trễ thật của nét phấn'],
    ]) if (!re.test(t)) bad(`${tag}: ${msg}.`);
    // Quy định hình học nối theo cụm: thiếu ở bài có hình học là lỗ, thừa ở bài không có là rác.
    const soThem = CHALK_COND.filter(([, list]) => list.includes(L.cluster)).length;
    if (!t.includes(`4. BẢNG PHẤN VÀ VẬT THẬT — ${SO_QUY_DINH[SO_TU_CHUNG + soThem]} QUY ĐỊNH BẮT BUỘC`)) {
      bad(`${tag}: tiêu đề mục 4 ghi sai số quy định (bài này thuộc ${SO_TU_CHUNG + soThem} quy định).`);
    }
    for (const [needle, list, nhan, thieu] of CHALK_COND) {
      if (list.includes(L.cluster)) { if (!t.includes(needle)) bad(`${tag}: ${thieu}.`); }
      else if (t.includes(needle)) bad(`${tag}: quy định "${nhan}" lọt vào bài không có hình học khối/góc (${L.cluster}).`);
    }
    for (const [needle, list, nhan] of CHALK_COND_SHORT) {
      if (list.includes(L.cluster)) { if (!t.includes(needle)) bad(`${tag}: checklist tự kiểm (mục 10) thiếu ${nhan} trong khi mục 4 đã bắt làm việc đó.`); }
      else if (t.includes(needle)) bad(`${tag}: ${nhan} lọt vào bài không có hình học khối/góc (${L.cluster}) — học sinh sẽ tự kiểm một việc tiết này không có.`);
    }
    for (const [needle, msg] of ACCESS_RULES) if (!t.includes(needle)) bad(`${tag}: ${msg}.`);
    if (!t.includes(CLASSROOM.safeZone)) bad(`${tag}: thiếu vùng an toàn cho chữ trên màn chiếu.`);
    if (!t.includes(CLASSROOM.framing)) bad(`${tag}: thiếu đàm phán theo mức camera đang thấy.`);
    // Vật thật và sơ đồ phải in nguyên văn, không để mô hình tự bịa vật khác cho cùng một cụm.
    // Bảy trường này lấy từ clusters.mjs và props.mjs — nguồn DÙNG CHUNG với prompt game — nên giáo
    // án được phép ghi đè lời qua khối `giao_an`. Kiểm cả nguồn gốc: đúng lời override hay nguyên văn data.
    const p = prop(L.cluster);
    const cl = cluster(L.cluster);
    const ovBase = LESSON_EXTRA[L.cluster]?.giao_an || {};
    // theo_lop là lớp phủ thứ hai: cùng cụm nhưng lớp 4 và lớp 5 dạy hai nội dung khác nhau.
    const ov = { ...ovBase, ...(ovBase.theo_lop?.[L.lop] || {}) };
    const nguonGoc = {
      muc_tieu: cl.noi_dung.charAt(0).toUpperCase() + cl.noi_dung.slice(1),
      giai_thich: cl.giai_thich,
      vat: p.vat,
      don_vi: p.don_vi,
      ngon_tay: p.ngon_tay,
      so_do: p.so_do,
      doc: p.doc,
    };
    for (const f of OVERRIDE_FIELDS) {
      const nguon = ov[f] || nguonGoc[f];
      if (L[f] !== nguon) {
        bad(`${tag}: trường ${f} không khớp nguồn duy nhất (khối giao_an của cụm ${L.cluster} trong tools/data/lessons.mjs, hoặc nguyên văn clusters.mjs/props.mjs).`);
      }
      if (!t.includes(nguon)) bad(`${tag}: giáo án thiếu nội dung ${f} của cụm ${L.cluster}.`);
    }
    // Ba trường viết tay cũng đi qua cùng một cửa override, nên phải kiểm nguồn y như bảy trường kia.
    const extra = LESSON_EXTRA[L.cluster];
    for (const f of LESSON_FIELDS) {
      const nguon = ov[f] || extra[f];
      if (L[f] !== nguon) bad(`${tag}: trường ${f} không khớp nguồn duy nhất (khối giao_an của cụm ${L.cluster}, hoặc ba trường viết tay trong tools/data/lessons.mjs).`);
      if (!t.includes(L[f])) bad(`${tag}: giáo án thiếu nội dung ${f} từ tools/data/lessons.mjs.`);
    }
    // Câu mẫu nằm trong file dưới dạng JSON.stringify nên phải so theo đúng dạng đã escape dấu nháy.
    for (const ex of EXAMPLES[L.cluster]) if (!t.includes(JSON.stringify(ex.prompt)) || !t.includes(JSON.stringify(ex.answer))) bad(`${tag}: thiếu câu luyện tập mẫu của cụm ${L.cluster}.`);
    for (const s of [chalkShortFor(L.cluster), LESSON_SHORT, VERIFY_SHORT, ACCESS_SHORT, AR_LESSON_SHORT]) if (!t.includes(s)) bad(`${tag}: checklist tự kiểm thiếu một dòng rút gọn (${s.slice(0, 30)}...).`);
    // Cùng loại rò rỉ vòng 7b nhưng ở vế viết tay: đuôi checklist từng tự nhắc hình học nên bài phân
    // số cũng bị đòi "xoay khối". Bản canon theo cụm đã lo việc này, nên checklist không được còn từ
    // khoá hình học khi mục 4 của bài đó không yêu cầu.
    const check = t.split('\n').find((l) => l.startsWith('- Tự kiểm tra trước khi xuất:')) || '';
    if (!SOLID_CLUSTERS.includes(L.cluster) && /khối|cạnh khuất|mở hộp/.test(check)) bad(`${tag}: checklist nhắc hình học khối trong khi cụm ${L.cluster} không có quy định đó ở mục 4 — để chalkShortFor() quyết định, đừng viết tay.`);
    if (!BODY_CLUSTERS.includes(L.cluster) && /ê-ke|thước góc/.test(check)) bad(`${tag}: checklist nhắc dụng cụ thân người làm thước góc trong khi cụm ${L.cluster} không có quy định đó ở mục 4 — để chalkShortFor() quyết định, đừng viết tay.`);
    for (const needle of ['LESSON_DATA', '#FFD84D', 'MiTi • Giảng bài bằng vật thật', 'tasks-vision@1.0.1', 'Không dùng Tailwind Play CDN']) {
      if (!t.includes(needle)) bad(`${tag}: giáo án thiếu ${needle}.`);
    }
    for (const needle of GAME_ONLY) if (t.includes(needle)) bad(`${tag}: cơ chế game lọt vào giáo án ("${String(needle).slice(0, 36)}").`);
    // Cơ chế thì GAME_ONLY chặn được, còn TỪ VỰNG thì không: lời của cụm trong clusters.mjs và
    // props.mjs mang theo "trận boss", "cửa ải", "thẻ gợi ý" vì hai họ dùng chung dữ liệu.
    // Bỏ dòng trỏ tới prompt game và code span (tên cụm, tên file là định danh kỹ thuật, không phải lời dạy).
    const loi = t
      .split('\n')
      .filter((l) => !l.includes('prompts/'))
      .join('\n')
      .replace(/`[^`\n]*`/g, ' ')
      .toLowerCase();
    const tuBan = LESSON_BAN_WORDS.filter((w) => loi.includes(w));
    if (tuBan.length) {
      bad(`${tag}: từ vựng game lọt vào lời giáo án (${tuBan.map((w) => `"${w}"`).join(', ')}) — thêm khối \`giao_an\` cho cụm ${L.cluster} trong tools/data/lessons.mjs để viết lại lời mà vẫn giữ kiến thức.`);
    }
    // Banco lỗi của giáo án phải tự nuôi được hai mục mẫu: verifyQuestionBank() khai báo rằng
    // errorTag phải thuộc danh sách in ở mục 3, nên mục mẫu mang nhãn ngoài danh sách sẽ bị chính
    // app loại ngay lúc nạp — giáo án mất hai mục bắt buộc mà không báo lỗi.
    const notes = notesCuaGiaoAn(L);
    const tagsCum = cluster(L.cluster).tags;
    if (notes.length !== tagsCum.length) {
      bad(`${tag}: danh sách lỗi có ${notes.length} mô tả nhưng cụm ${L.cluster} khai ${tagsCum.length} nhãn errorTag.`);
    }
    const nhanLoi = danhSachNhanLoi(L.cluster, EXAMPLES[L.cluster]);
    for (const n of nhanLoi) if (!t.includes(n)) bad(`${tag}: thiếu nhãn lỗi "${n}" trong danh sách errorTag khai báo ở mục 3.`);
    for (const [i, ex] of EXAMPLES[L.cluster].entries()) {
      const v = noteChoLoi(L.cluster, notes, ex.errorTag);
      if (!v || !String(v).trim()) bad(`${tag}: mục mẫu q${i + 1} không phân giải được loiViet cho nhãn ${ex.errorTag}.`);
      if (!t.includes(JSON.stringify(v))) bad(`${tag}: mục mẫu q${i + 1} phải mang loiViet ${JSON.stringify(v)} — bảng chẩn đoán cuối tiết gom theo loiViet nên nhãn rỗng hoặc sai là vô nghĩa.`);
    }
    if (t.includes('${')) bad(`${tag}: còn ký tự template chưa nội suy (${t.match(/\$\{[^}]*}/)[0]}).`);
    if (/[\u3400-\u9fff\u3040-\u30ff]/.test(t)) bad(`${tag}: giáo án lẫn ký tự CJK.`);
    // Chỉ bắt URL thật: câu "không dùng Tone.js" trong quy định âm thanh là lời CẤM, không phải phụ thuộc.
    if (/@mediapipe\/hands|@mediapipe\/camera_utils|cdn\.tailwindcss\.com/.test(t)) bad(`${tag}: còn phụ thuộc bị cấm.`);
    const lines = t.split('\n').length;
    if (lines < 110) bad(`${tag}: giáo án chỉ ${lines} dòng — nội dung bị cắt.`);
  }


  // Bảng tra dùng chung phải phủ kín: nhãn ngoài danh sách cụm vẫn phải có tiếng Việt để in vào
  // mục mẫu, và bảng không được chứa nhãn chết (dấu hiệu data đã đổi tên lỗi mà quên cập nhật).
  for (const [ck, exRows] of Object.entries(EXAMPLES)) {
    const tagsCk = cluster(ck).tags;
    for (const r of exRows) {
      if (!tagsCk.includes(r.errorTag) && !ERROR_TAGS[r.errorTag]) {
        bad(`Cụm ${ck}: câu mẫu mang errorTag "${r.errorTag}" không thuộc cụm và chưa có mô tả trong tools/data/error-tags.mjs.`);
      }
    }
  }
  for (const k of ERROR_TAG_KEYS) {
    const dung = Object.entries(EXAMPLES).some(([ck, exRows]) => !cluster(ck).tags.includes(k) && exRows.some((r) => r.errorTag === k));
    if (!dung) bad(`tools/data/error-tags.mjs: nhãn "${k}" là mục chết — không câu mẫu nào dùng nó ngoài cụm của chính nó.`);
  }

  // Mỗi cặp (cụm Toán, lớp) trong catalog phải có đúng một giáo án, không sót cụm nào.
  const mathPairs = new Set();
  for (const r of rows) {
    if (r.mon !== 'Toán') continue;
    const g = GAMES.find((x) => x.id === r.id);
    if (g) mathPairs.add(`${g.cluster}|${r.lop}`);
  }
  for (const k of mathPairs) if (!clusterPairs.has(k)) bad(`Cặp kiến thức Toán ${k} chưa có giáo án trong prompts/giao-an/.`);
  // Chiều ngược lại được phép lệch, nhưng chỉ theo một đường đã khai báo: cặp (cụm, lớp) không có
  // game Toán chỉ hợp lệ khi nó nằm trong CHU_DE_CHI_CO_GIAO_AN. Khai báo mà thực tế lại có game
  // thì builder đã chặn; còn có giáo án mà không khai báo nghĩa là cụm mới lọt vào không qua quy trình.
  const lessonOnly = new Set(CHU_DE_CHI_CO_GIAO_AN.map((them) => `${them.cluster}|${them.lop}`));
  for (const k of lessonOnly) if (!clusterPairs.has(k)) bad(`CHU_DE_CHI_CO_GIAO_AN khai báo cặp ${k} nhưng không có giáo án nào trong prompts/giao-an/.`);
  for (const k of clusterPairs) if (!mathPairs.has(k) && !lessonOnly.has(k)) bad(`Giáo án ${k} không có game Toán nào trong catalog, và cũng không được khai báo trong CHU_DE_CHI_CO_GIAO_AN của tools/data/lessons.mjs.`);
  for (const L of lessons) {
    if (L.chi_co_giao_an !== lessonOnly.has(`${L.cluster}|${L.lop}`)) bad(`${L.id}: cờ chi_co_giao_an không khớp CHU_DE_CHI_CO_GIAO_AN (cụm ${L.cluster} lớp ${L.lop}).`);
    if (!L.chi_co_giao_an) continue;
    const noi = fs.readFileSync(path.join(ROOT, `prompts/giao-an/${L.id}-${L.slug}.md`), 'utf8');
    if (!noi.includes(CHUA_CO_GAME_CUM)) bad(`${L.id}: bài chỉ có giáo án mà đầu file không ghi rõ chưa có bản game cùng cụm.`);
  }
  // props.mjs phải phủ đúng các cụm Toán đang có (game + chủ đề chỉ có giáo án), không thừa không thiếu.
  const mathClusters = new Set([...mathPairs, ...lessonOnly].map((k) => k.split('|')[0]));
  if (mathClusters.size !== PROP_KEYS.length) bad(`props.mjs phải phủ đúng ${mathClusters.size} cụm Toán, hiện có ${PROP_KEYS.length} cụm.`);
  for (const k of PROP_KEYS) if (!mathClusters.has(k)) bad(`props.mjs thừa cụm không có giáo án Toán nào dùng: ${k}.`);
  for (const k of LESSON_EXTRA_KEYS) if (!mathClusters.has(k)) bad(`lessons.mjs thừa cụm không có giáo án Toán nào dùng: ${k}.`);
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
console.log(`Xác minh đạt: ${rows.length} dòng catalog, ${GAMES.length} prompt game, ${VAR_COUNT} prompt biến thể, ${LESSON_COUNT} giáo án giảng bài trên ${PROP_KEYS.length} cụm vật thật, ${CLUSTER_KEYS.length} cụm kiến thức, ${LEGACY.length} prompt legacy, ${cat.games.length + cat.legacy.length} card dashboard.`);
