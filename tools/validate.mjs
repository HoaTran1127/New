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
import { VERIFY, ADAPT } from './lib/verify.mjs';
import { CHALK, CHALK_SHORT } from './lib/chalk.mjs';
import { LESSON, LESSON_SHORT } from './lib/lesson.mjs';
import { HANDOUT, HANDOUT_SHORT } from './lib/handout.mjs';
import { PROP_KEYS, PROP_FIELDS, prop } from './data/props.mjs';
import { buildLessons, LESSON_EXTRA_KEYS, LESSON_FIELDS } from './data/lessons.mjs';

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
const LESSON_RULES = [
  [LESSON.teacher, 'thiếu chế độ giáo viên trình bày trên màn chiếu'],
  [LESSON.noGame, 'thiếu quy định cấm cơ chế game trong tiết giảng'],
  [LESSON.pace, 'thiếu quy định nhịp giảng do giáo viên quyết định'],
  [LESSON.flow, 'thiếu năm bước của giáo án kèm ngân sách phút'],
  [LESSON.handover, 'thiếu quy định "Mời em lên bảng"'],
  [LESSON.strayHands, 'thiếu quy định bỏ qua bàn tay lạ trong lớp đông'],
  [LESSON.classVote, 'thiếu quy định cả lớp trả lời bằng ngón tay'],
  [LESSON.retain, 'thiếu quy định bảng không bao giờ tự lau'],
  [LESSON.backRow, 'thiếu quy định chữ đọc được từ dãy cuối lớp'],
  [LESSON.noNetwork, 'thiếu quy định dạy được khi mất mạng'],
  [LESSON.verifyData, 'thiếu hàm tự kiểm chứng verifyLessonBank chạy lúc nạp'],
  [LESSON.fullPeriod, 'thiếu quy định chia đủ 35 phút của một tiết học'],
  [LESSON.multiClass, 'thiếu quy định một giáo án dạy nhiều lớp trong buổi'],
  [LESSON.inclusion, 'thiếu quy định em trả lời tại chỗ không bị tính là thiếu tích cực'],
  [LESSON.classBoard, 'thiếu quy định bảng con cho cả lớp trả lời không cần camera'],
  [LESSON.privacy, 'thiếu quy định quyền riêng tư khi camera hướng vào cả lớp'],
  [LESSON.pairShare, 'thiếu nhịp nghĩ riêng - nói với bạn - chia trước lớp'],
  [LESSON.predict, 'thiếu quy định đoán trước khi thao tác vật thật'],
  [LESSON.fadedExample, 'thiếu quy định làm mẫu rồi che dần từng bước'],
  [LESSON.exitTicket, 'thiếu vé kết thúc tiết 2 phút cuối'],
  [LESSON.noProjector, 'thiếu quy định dạy khi phòng không có máy chiếu'],
  [LESSON.oldHardware, 'thiếu trần tài nguyên đo được cho máy cũ'],
  [LESSON.browserCompat, 'thiếu quy định phát hiện năng lực trình duyệt thay vì khai phiên bản'],
  [LESSON.cameraGeometry, 'thiếu quy định một camera chỉ quay được một hướng (soi bảng hoặc quay lớp)'],
  [LESSON.noAdmin, 'thiếu quy định máy trường không có quyền quản trị'],
  [LESSON.physicalAccess, 'thiếu đường trả lời cho em không giơ được tay'],
  [LESSON.boardEquity, 'thiếu bộ đếm lượt lên bảng cho cả lớp'],
  [LESSON.rehearsal, 'thiếu chế độ chạy thử không cần lớp và checklist chuẩn bị'],
  [LESSON.lessonStudy, 'thiếu đường dùng chung giáo án cho tổ chuyên môn'],
  [LESSON.bigClass, 'thiếu quy định mọi con số về lớp phải là hàm của sĩ số'],
  [LESSON.powerCut, 'thiếu quy định dạy tiếp khi mất điện'],
  [LESSON.paperProps, 'thiếu đường vật thật bằng giấy khi lớp không có đồ dùng'],
  [LESSON.timeSlack, 'thiếu kế hoạch cho tiết thừa giờ và tiết cháy giữa bước'],
  [LESSON.groupWork, 'thiếu quy định làm việc theo nhóm 4 em'],
  [LESSON.fastFinishers, 'thiếu đường đi sâu cho em làm xong sớm'],
  [LESSON.numberFormat, 'thiếu quy định hiển thị và đọc số theo kiểu Việt Nam'],
  [LESSON.latePupil, 'thiếu đường cho em đến muộn hoặc vắng buổi trước'],
  [LESSON.repairWork, 'thiếu bước trả bài và chữa bài'],
  [LESSON.homeLanguage, 'thiếu quy định tiếng Việt là ngôn ngữ thứ hai và nút "Ít chữ hơn"'],
  [LESSON.noSlate, 'thiếu quy định bảng con là bất kì mặt phẳng nào trong lớp'],
  [LESSON.movementBreak, 'thiếu quy định nhịp vận động gắn với Toán sau khi ngồi liền mạch'],
  [LESSON.roomFootprint, 'thiếu quy định khoảng trống sàn của phòng học cho nhịp đứng và nhóm'],
  [LESSON.tightRoomFocus, 'thiếu quy định hạ ngưỡng ngồi và bù tần suất cho nhịp đứng-tại-chỗ khi phòng chật'],
  [LESSON.detectionEquity, 'thiếu quy định không đổi "máy không thấy tay" thành "em không trả lời"'],
  [LESSON.privateView, 'thiếu quy định dải điều khiển riêng của cô chỉ thật khi máy chiếu không soi gương'],
];
// Từ bảng ra vở: một tiết giảng chỉ thật sự xong khi các em làm được bài trên giấy.
const HANDOUT_RULES = [
  [HANDOUT.worksheet, 'thiếu quy định in phiếu bài tập từ LESSON_DATA'],
  [HANDOUT.printRun, 'thiếu quy định một lượt in của cả lớp ra ít tờ và chữ đọc được trên giấy'],
  [HANDOUT.answerKey, 'thiếu quy định trang đáp án riêng cho giáo viên'],
  [HANDOUT.notebook, 'thiếu quy định khung nội dung để chép vào vở'],
];
const LESSON_FAMILY_RULES = [...CHALK_RULES, ...LESSON_RULES, ...HANDOUT_RULES].map(([n]) => n);

// Tính tự nhất quán của bộ quy định: khi một quy định dẫn chứng một quy định khác bằng `tênQuYĐịnh`,
// cái tên đó phải có thật. detectionEquity (vòng 18) từng viết `wholeClassVote` trong khi quy định
// đếm ngón tay thật tên là classVote — mô hình sẽ copy nguyên cái tên ma vào cả 39 giáo án.
// Bộ từ khoá không-phải-quy-định cho phép: tên trường dữ liệu và API trình duyệt được bọc trong
// dấu chấm ngược, không phải tên quy định.
const RULE_KEYS = new Set([...Object.keys(CHALK), ...Object.keys(LESSON), ...Object.keys(HANDOUT)]);
const NON_RULE_TOKENS = new Set(['errorTag', 'loiViet', 'localStorage', 'speechSynthesis']);
const RULE_REF = /^[a-z][a-zA-Z0-9]*[A-Z][a-zA-Z0-9]*$/; // camelCase thuần, không dấu chấm/gạch
function checkRuleRefs(label, text) {
  for (const m of String(text).matchAll(/`([A-Za-z_][A-Za-z0-9_]*)`/g)) {
    const ref = m[1];
    if (!RULE_REF.test(ref)) continue;
    if (RULE_KEYS.has(ref) || NON_RULE_TOKENS.has(ref)) continue;
    bad(`${label}: tham chiếu tới quy định \`${ref}\` không có thật trong bộ (tên phải khớp một khoá đã xuất).`);
  }
}
for (const [k, v] of Object.entries(LESSON)) checkRuleRefs(`LESSON.${k}`, v);
for (const [k, v] of Object.entries(CHALK)) checkRuleRefs(`CHALK.${k}`, v);
for (const [k, v] of Object.entries(HANDOUT)) checkRuleRefs(`HANDOUT.${k}`, v);

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
// Hai bộ đi từ cùng một cụm kiến thức nhưng PHẢI khác nhau về cơ chế — giáo án mà lẫn
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
    '4. BẢNG PHẤN VÀ VẬT THẬT — MƯỜI QUY ĐỊNH BẮT BUỘC',
    '5. CẢ LỚP THAM GIA',
    '6. NỀN AR, CAMERA VÀ NHẬN DIỆN TAY',
    '7. DẠY KHI KHÔNG CÓ CAMERA, KHÔNG CÓ MẠNG, VÀ KHI MẤT ĐIỆN (bắt buộc, đây là chế độ dạy chính ở nhiều lớp)',
    '8. TIẾP CẬN, AN TOÀN VÀ HIỆU NĂNG',
    '9. TỪ BẢNG RA VỞ — PHIẾU BÀI TẬP, ĐÁP ÁN VÀ NỘI DUNG CHÉP',
    '10. TRƯỚC KHI LÊN LỚP VÀ SAU KHI DẠY XONG (ba việc chỉ có cô giáo làm được)',
    '11. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML',
    '12. ĐẦU RA',
  ];
  // Cơ chế chỉ được có ở game. Lọt sang giáo án là sai mục đích của cả nhánh này.
  const GAME_ONLY = [
    'QUESTION_DATA', 'miti-collection', '12 lượt chính', '+10 nhân chuỗi', 'hết 5 tim',
    MOTION.amplitude, MOTION.breather, FEEL.hitStop, FEEL.combo, FEEL.bonus, FEEL.mascot,
    RULES.antiLuck, RULES.summary, CLASSROOM.mastery, CLASSROOM.twoPlayer,
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
    // Kiểm tra giáo án bị cắt TH_FIRST: một file cụt sẽ sinh hàng chục lỗi "thiếu quy định" dây chuyền,
    // nhấn chìm chẩn đoán thật xuống dưới cửa sổ in 40 dòng. Báo nó đứng đầu để đọc được ngay.
    const lines = t.split('\n').length;
    if (lines < 110) bad(`${tag}: giáo án chỉ ${lines} dòng — nội dung bị cắt.`);
    for (const m of LESSON_MUST) if (!t.includes(m)) bad(`${tag}: giáo án thiếu mục ${m}.`);
    for (const [needle, msg] of CHALK_RULES) if (!t.includes(needle)) bad(`${tag}: ${msg}.`);
    for (const [needle, msg] of LESSON_RULES) if (!t.includes(needle)) bad(`${tag}: ${msg}.`);
    for (const [needle, msg] of HANDOUT_RULES) if (!t.includes(needle)) bad(`${tag}: ${msg}.`);
    for (const [needle, msg] of ACCESS_RULES) if (!t.includes(needle)) bad(`${tag}: ${msg}.`);
    if (!t.includes(CLASSROOM.safeZone)) bad(`${tag}: thiếu vùng an toàn cho chữ trên màn chiếu.`);
    if (!t.includes(CLASSROOM.framing)) bad(`${tag}: thiếu đàm phán theo mức camera đang thấy.`);
    // Vật thật và sơ đồ phải in nguyên văn, không để mô hình tự bịa vật khác cho cùng một cụm.
    const p = prop(L.cluster);
    for (const f of PROP_FIELDS) if (!t.includes(p[f])) bad(`${tag}: giáo án thiếu trường ${f} của vật thật cụm ${L.cluster}.`);
    for (const f of LESSON_FIELDS) if (!t.includes(L[f])) bad(`${tag}: giáo án thiếu nội dung ${f} từ tools/data/lessons.mjs.`);
    // Câu mẫu nằm trong file dưới dạng JSON.stringify nên phải so theo đúng dạng đã escape dấu nháy.
    for (const ex of EXAMPLES[L.cluster]) if (!t.includes(JSON.stringify(ex.prompt)) || !t.includes(JSON.stringify(ex.answer))) bad(`${tag}: thiếu câu luyện tập mẫu của cụm ${L.cluster}.`);
    for (const s of [CHALK_SHORT, LESSON_SHORT, HANDOUT_SHORT, ACCESS_SHORT]) if (!t.includes(s)) bad(`${tag}: checklist tự kiểm thiếu một dòng rút gọn (${s.slice(0, 30)}...).`);
    for (const needle of ['LESSON_DATA', '#FFD84D', 'MiTi • Giảng bài bằng vật thật', 'tasks-vision@1.0.1', 'Không dùng Tailwind Play CDN']) {
      if (!t.includes(needle)) bad(`${tag}: giáo án thiếu ${needle}.`);
    }
    for (const needle of GAME_ONLY) if (t.includes(needle)) bad(`${tag}: cơ chế game lọt vào giáo án ("${String(needle).slice(0, 36)}").`);
    if (t.includes('${')) bad(`${tag}: còn ký tự template chưa nội suy (${t.match(/\$\{[^}]*}/)[0]}).`);
    if (/[\u3400-\u9fff\u3040-\u30ff]/.test(t)) bad(`${tag}: giáo án lẫn ký tự CJK.`);
    // Chỉ bắt URL thật: câu "không dùng Tone.js" trong quy định âm thanh là lời CẤM, không phải phụ thuộc.
    if (/@mediapipe\/hands|@mediapipe\/camera_utils|cdn\.tailwindcss\.com/.test(t)) bad(`${tag}: còn phụ thuộc bị cấm.`);
  }

  // verifyData (phủ nhãn lỗi) và repairWork (số hàng trang Chữa bài) lấy trần từ SỐ NHÃN THẬT của cụm,
  // nên dữ liệu đổi là hai quy định đó phải đổi theo — chặn ở đây chứ không để prompt vô nghiệm.
  for (const L of lessons) {
    const cl = cluster(L.cluster);
    const n = (ERROR_NOTES[L.cluster] || '').split('; ').length;
    if (n !== cl.tags.length) bad(`${L.id}: cụm ${L.cluster} có ${cl.tags.length} errorTag nhưng ${n} mô tả loiViet.`);
    if (n > 3) bad(`${L.id}: cụm ${L.cluster} có ${n} nhãn lỗi trong khi verifyData và repairWork chỉ tính trần 3 hàng — phải viết lại hai quy định đó trước khi thêm nhãn.`);
    if (n < 2) bad(`${L.id}: cụm ${L.cluster} chỉ có ${n} nhãn lỗi — bảng tổng kết và trang chữa bài nhóm theo lỗi sẽ vô nghĩa.`);
  }

  // Mỗi cặp (cụm Toán, lớp) trong catalog phải có đúng một giáo án, không sót cụm nào.
  const mathPairs = new Set();
  for (const r of rows) {
    if (r.mon !== 'Toán') continue;
    const g = GAMES.find((x) => x.id === r.id);
    if (g) mathPairs.add(`${g.cluster}|${r.lop}`);
  }
  for (const k of mathPairs) if (!clusterPairs.has(k)) bad(`Cặp kiến thức Toán ${k} chưa có giáo án trong prompts/giao-an/.`);
  for (const k of clusterPairs) if (!mathPairs.has(k)) bad(`Giáo án ${k} không có game Toán nào trong catalog tương ứng.`);
  // props.mjs phải phủ đúng các cụm Toán đang có, không thừa không thiếu.
  const mathClusters = new Set([...mathPairs].map((k) => k.split('|')[0]));
  if (mathClusters.size !== PROP_KEYS.length) bad(`props.mjs phải phủ đúng ${mathClusters.size} cụm Toán, hiện có ${PROP_KEYS.length} cụm.`);
  for (const k of PROP_KEYS) if (!mathClusters.has(k)) bad(`props.mjs thừa cụm không có game Toán nào dùng: ${k}.`);
  for (const k of LESSON_EXTRA_KEYS) if (!mathClusters.has(k)) bad(`lessons.mjs thừa cụm không có game Toán nào dùng: ${k}.`);
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
  for (const g of cat.games.concat(cat.legacy, cat.lessons || [])) if (!fs.existsSync(path.join(ROOT, g.prompt))) bad(`${g.id}: dashboard trỏ tới file prompt không có thật (${g.prompt}).`);

  // Giáo án phải nổi lên dashboard ngang game: giáo viên mở index.html mà chỉ thấy game thì bộ
  // prompts/giao-an/ coi như vô hình. Số card lấy thẳng từ LESSON_COUNT nên không thể lệch nhau.
  if (!Array.isArray(cat.lessons)) bad('Dashboard thiếu mảng lessons — build-dashboard.mjs chưa đưa giáo án lên lưới card.');
  else {
    if (cat.lessons.length !== LESSON_COUNT) bad(`Dashboard phải có ${LESSON_COUNT} card giáo án, hiện có ${cat.lessons.length}.`);
    const lessonIds = new Set();
    for (const l of cat.lessons) {
      if (lessonIds.has(l.id)) bad(`Dashboard trùng mã giáo án: ${l.id}`);
      lessonIds.add(l.id);
      if (l.kind !== 'lesson') bad(`${l.id}: card giáo án phải có kind "lesson" để tab giáo án lọc đúng.`);
      if (l.subject !== 'Toán') bad(`${l.id}: card giáo án sai môn (${l.subject}).`);
      if (!l.name || !l.objective || !l.mission) bad(`${l.id}: card giáo án thiếu tên/mục tiêu/câu khởi động.`);
      if (!Array.isArray(l.chips) || !l.chips.length) bad(`${l.id}: card giáo án thiếu nhãn quy định.`);
      if (!/^(4|5)$/.test(String(l.grade))) bad(`${l.id}: card giáo án có lớp không hợp lệ (${l.grade}).`);
    }
    const clusters = new Set(cat.lessons.map((l) => l.cluster));
    if (!Array.isArray(cat.lessonClusters) || cat.lessonClusters.length !== clusters.size) {
      bad(`Dashboard phải có lessonClusters đúng ${clusters.size} cụm đã có giáo án.`);
    }
  }
  const dashHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  for (const needle of ['CAT.lessons', 'data-tab="lesson"', 'lessonPlans', 'Giáo án giảng bài']) {
    if (!dashHtml.includes(needle)) bad(`index.html thiếu ${needle} — lưới card không còn hiển thị bộ giáo án.`);
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
console.log(`Xác minh đạt: ${rows.length} dòng catalog, ${GAMES.length} prompt game, ${VAR_COUNT} prompt biến thể, ${LESSON_COUNT} giáo án giảng bài trên ${PROP_KEYS.length} cụm vật thật, ${CLUSTER_KEYS.length} cụm kiến thức, ${LEGACY.length} prompt legacy, ${cat.games.length + cat.legacy.length + cat.lessons.length} card dashboard (${cat.games.length} game + ${cat.lessons.length} giáo án + ${cat.legacy.length} legacy).`);
