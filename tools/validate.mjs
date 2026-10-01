import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
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
import { LIGHT } from './lib/light.mjs';
import { CELEBRATE } from './lib/celebrate.mjs';
import { IDENTITY } from './lib/identity.mjs';
import { RHYTHM } from './lib/rhythm.mjs';
import { QUEUE } from './lib/queue.mjs';
import { LESSON } from './lib/lesson.mjs';
import { CURRICULUM, CURRICULUM_SHORT } from './lib/curriculum.mjs';
import { SPORT } from './lib/sport.mjs';
import { FAMILY } from './lib/family.mjs';
import { PACE } from './lib/pacing.mjs';
import { PLAYZONE } from './lib/playzone.mjs';
import { FOLK } from './lib/folk.mjs';
import { QUIZ } from './lib/quiz.mjs';
import { STANDARDS, STANDARD_KEYS, MACH_TEN, SCHOOL_YEAR, hocKiCua } from './data/standards.mjs';
import { SPORTS, SPORT_KEYS } from './data/sports.mjs';
import { FOLK as FOLK_BANK, FOLK_KEYS, FOLK_PROPS, FOLK_BANNED } from './data/folk.mjs';
import { QUIZ as QUIZ_BANK, QUIZ_KEYS, quizFrames } from './data/quiz.mjs';
import { IDENTITIES } from './data/identities.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const errors = [];
const bad = (msg) => errors.push(msg);
// Probe 20g: một mục neo phải là CẶP [needle, label]. Nếu spread `...(? [x, y] : [])` ném thẳng mảng vào
// danh sách, vòng `for (const [needle, label] of ...)` gắp từng KÝ TỰ của chuỗi làm needle, thế là
// `t.includes('T')` luôn đúng và kim tưởng rằng đang chạy mà chưa kiểm gì cả (85 prompt mất hẳn nhãn
// tuần vẫn xanh). capsNeo chặn kiểu đó ngay tại chỗ: thà để validate crash còn hơn báo ĐẠT.
const capsNeo = (arr, where) => {
  for (const p of arr) {
    if (!Array.isArray(p) || p.length < 2 || typeof p[0] !== 'string' || !p[0]) throw new Error(`${where}: mục neo phải là cặp [needle, label], nhận được ${JSON.stringify(p).slice(0, 70)}`);
  }
  return arr;
};

// Vòng 19: trên Windows một lần sửa file bằng Python đã đổi cả README.md sang CRLF, và khối
// pipeline bị `pipelineBlock()` trả về rỗng — validate báo 40 lỗi "không còn khối pipeline nào"
// trong khi nội dung vẫn nguyên. Mọi regex neo đầu dòng (^```, ^## ) đều lek khi còn \r.
// Chặn ngay ở cửa đọc: mọi text đọc vào validator đều chỉ còn \n.
const readFileSyncRaw = fs.readFileSync;
fs.readFileSync = (file, encoding) => {
  const text = readFileSyncRaw(file, encoding);
  return typeof text === 'string' ? text.replace(/\r\n/g, '\n') : text;
};

// 1a. Đăng ký tầng quy định, đọc thẳng từ tools/lib thay vì gõ tay danh sách.
// Vòng 10 chuẩn hoá: ba vụ lệch đã xảy ra thật — hype.mjs bị quên trong danh sách pipeline của
// prompts/README, chuỗi tự kiểm rơi đoạn, và heading master thiếu tên lib. Tất cả đều lọt vì
// danh sách cũ viết tay nên không ai cập nhật khi thêm lib mới.
const LIB_DIR = path.join(ROOT, 'tools/lib');
const LIB_UTIL = ['csv.mjs'];
const layerLibs = fs.readdirSync(LIB_DIR).filter((f) => f.endsWith('.mjs') && !LIB_UTIL.includes(f)).sort();
const chainSegments = [];
for (const f of layerLibs) {
  const mod = await import(pathToFileURL(path.join(LIB_DIR, f)).href);
  for (const [name, value] of Object.entries(mod)) {
    if (name.endsWith('_SHORT') && typeof value === 'string') chainSegments.push({ lib: f, name, text: value });
  }
}
// AR_SHORT nằm ở dòng "Nền AR" riêng của biến thể, MOTION/CLASSROOM chỉ áp dụng cho kiểu có nhận diện
// cơ thể — nên ba đoạn này không bắt buộc có mặt trong mọi dòng tự kiểm.
const CHAIN_SKIP = { prompt: ['AR_SHORT'], variant: ['AR_SHORT', 'MOTION_SHORT', 'CLASSROOM_SHORT'] };
// Tên lib phải xuất hiện trong heading của tầng tương ứng trong master, để người sửa master biết sửa file nào.
const MASTER_LIB = [
  ['2.0', 'ar.mjs'], ['4.5', 'pe.mjs'], ['5.1', 'memory.mjs'], ['6.1', 'classroom.mjs'],
  ['6.2', 'verify.mjs'], ['6.3', 'light.mjs'], ['8.1', 'feel.mjs'], ['8.2', 'hype.mjs'], ['8.3', 'anticipation.mjs'], ['8.4', 'celebrate.mjs'],
  ['9.1', 'access.mjs'], ['11.', 'acceptance.mjs'], ['8.5', 'identity.mjs'], ['8.6', 'rhythm.mjs'],
  ['7.2', 'queue.mjs'], ['4.6', 'lesson.mjs'], ['4.7', 'curriculum.mjs'], ['4.8', 'sport.mjs'], ['4.9', 'family.mjs'],
  ['4.10', 'pacing.mjs'], ['4.11', 'playzone.mjs'], ['4.12', 'folk.mjs'], ['4.13', 'quiz.mjs'],
];

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
// Vòng 21: nhãn khối ở đầu mỗi tầng là thứ người dán prompt nhìn thấy trước tiên. Probe 21: xóa hẳn
// dòng header "CHỖ CHƠI AN TOÀN (vòng 21: ...)" khỏi build-prompts.mjs thì sáu quy định vẫn còn nguyên
// trong prompt nên build xanh — nhưng người đọc không còn biết sáu dòng đó đến từ lib nào và vì sao tồn
// tại, tức là lần sửa sau sẽ xóa luôn cả lib. Kiểm nhãn riêng, không chỉ kiểm nội dung.
const ZONE_RULES = [
  ['- CHỖ CHƠI AN TOÀN (', 'thiếu khối "CHỖ CHƠI AN TOÀN" nêu nguồn tools/lib/playzone.mjs — sáu quy định chỗ chơi không còn nhãn để người viết prompt đối chiếu'],
  ['- SÂN CHƠI VIỆT NAM (', 'thiếu khối "SÂN CHƠI VIỆT NAM" nêu nguồn tools/lib/folk.mjs — sáu quy định sân chơi không còn nhãn để người viết prompt đối chiếu'],
  ['- ĐỐ BẠN — EM ĐẶT ĐỀ CHO BẠN ĐÁP (', 'thiếu khối ĐỐ BẠN nêu nguồn tools/lib/quiz.mjs — sáu quy định đố bạn không còn nhãn để người viết prompt đối chiếu'],
];
// Các tầng "phải có MỌI luật, nguyên văn, ở MỌI nơi": bộ kiểm lấy thẳng Object.entries(lib) thay vì
// gõ tay danh sách. Probe vòng 11 cho thấy danh sách gõ tay là lỗ hổng thật — xóa ${LIGHT.visualShare}
// khỏi build-prompts.mjs hoặc xóa ${LIGHT.oneThought} khỏi upgrade-legacy.mjs thì 85 prompt và 12 legacy
// vẫn xanh, vì chuỗi bị xóa không còn ở đâu để mà tìm. Thêm luật vào lib là mọi prompt/biến thể/legacy
// buộc phải mang nó, không cần sửa validate.
const FULL_LAYERS = [
  ['nhẹ đầu', 'light.mjs', 'LIGHT', LIGHT],
  ['khoảnh khắc ăn mừng', 'celebrate.mjs', 'CELEBRATE', CELEBRATE],
  ['bản sắc riêng', 'identity.mjs', 'IDENTITY', IDENTITY],
  ['nhạc nền theo nhịp', 'rhythm.mjs', 'RHYTHM', RHYTHM],
  ['vai chờ có vận động', 'queue.mjs', 'QUEUE', QUEUE],
  ['tiết học 45 phút + gắng sức', 'lesson.mjs', 'LESSON', LESSON],
  ['chuẩn kiến thức SGK', 'curriculum.mjs', 'CURRICULUM', CURRICULUM],
  ['chất thể thao', 'sport.mjs', 'SPORT', SPORT],
  ['gia đình', 'family.mjs', 'FAMILY', FAMILY],
  ['tuần học', 'pacing.mjs', 'PACE', PACE],
  ['chỗ chơi an toàn', 'playzone.mjs', 'PLAYZONE', PLAYZONE],
  ['sân chơi Việt Nam', 'folk.mjs', 'FOLK', FOLK],
  ['đố bạn', 'quiz.mjs', 'QUIZ', QUIZ],
];
const FULL_RULES = FULL_LAYERS.flatMap(([label, file, objName, obj]) =>
  Object.entries(obj).map(([key, text]) => [text, `thiếu quy định ${label} ${objName}.${key} của tools/lib/${file}`]));
// Con số của từng tầng phải NEO trong lib. Hạ ngưỡng ngay trong lib thì prompt, biến thể, legacy và bảng
// kiểm cùng đổi theo một cách tự nhất quán, nên kiểm chữ không bắt được; chỉ so với con số chuẩn mới
// chặn được kiểu ">= 60% -> >= 30%" hoặc "200 ms -> 2000 ms" sửa âm thầm.
const FULL_PINS = [
  ['light.mjs', LIGHT.visualShare, '>= 60%', 'tỉ lệ mục dang:"nhin" tối thiểu'],
  ['light.mjs', LIGHT.shortPrompt, '16 từ', 'trần số từ của đề'],
  ['light.mjs', LIGHT.motionScores, '+6 cho ĐỘNG TÁC', 'điểm động tác trong một lượt'],
  ['light.mjs', LIGHT.motionScores, '+3 cho ĐÁP ÁN ĐÚNG', 'điểm đáp án trong một lượt'],
  ['celebrate.mjs', CELEBRATE.sfx, '200 ms', 'trần độ dài một SFX'],
  ['celebrate.mjs', CELEBRATE.sfx, '0.25', 'trần master gain'],
  ['celebrate.mjs', CELEBRATE.confetti, '40–60 hạt', 'số hạt pháo giấy một đợt'],
  ['celebrate.mjs', CELEBRATE.slowmo, '0,45×', 'tốc độ thẻ khi slow-mo'],
  ['celebrate.mjs', CELEBRATE.haptics, 'navigator.vibrate(20)', 'cú rung khi chốt đúng'],
  ['celebrate.mjs', CELEBRATE.haptics, 'if (navigator.vibrate)', 'bọc điều kiện để máy không hỗ trợ vẫn chạy'],
  ['identity.mjs', IDENTITY.mascot, 'tối đa HAI từ', 'trần độ dài tên mascot'],
  ['identity.mjs', IDENTITY.mascot, '>= 5 chỗ', 'số chỗ mascot tên riêng phải xuất hiện'],
  ['identity.mjs', IDENTITY.palette, '60/441', 'khoảng cách màu tối thiểu giữa hai game cùng cụm'],
  ['identity.mjs', IDENTITY.lines, 'Ba câu thoại riêng', 'số câu thoại riêng của mỗi game'],
  ['identity.mjs', IDENTITY.signature, '1 lần/phiên', 'số lần khoảnh khắc chữ ký diễn ra'],
  ['identity.mjs', IDENTITY.signature, '>= 2 giây', 'độ dài khoảnh khắc chữ ký'],
  ['identity.mjs', IDENTITY.lines, '6 từ', 'trần số từ một câu thoại'],
  ['identity.mjs', IDENTITY.guard, 'verifyIdentity()', 'hàm kiểm bản sắc lúc nạp'],
  ['rhythm.mjs', RHYTHM.beat, '100–116 BPM', 'tempo nhạc nền ở hiệp 1 và 2'],
  ['rhythm.mjs', RHYTHM.beat, 'gain <= 0.18', 'trần gain của bus nhạc nền'],
  ['rhythm.mjs', RHYTHM.beat, 'CẤM hotlink file .mp3/.wav/.ogg', 'nhạc tự tổng hợp, đầu ra vẫn một file HTML'],
  ['rhythm.mjs', RHYTHM.move, 'trần 128 BPM', 'trần BPM để xung hình ảnh theo nhịp không vượt trần nhấp nháy'],
  ['rhythm.mjs', RHYTHM.duck, '<= 30% gain', 'mức nhạc nền hạ khi speechSynthesis đọc đề'],
  ['rhythm.mjs', RHYTHM.quiet, 'vạch nhịp', 'nhịp nhìn được khi tắt tiếng'],
  // Probe vòng 14: thay "vạch nhịp đập theo đúng BPM" bằng "một dòng chữ đang tắt tiếng" thì pin dưới
  // vẫn xanh vì mệnh đề reduced-motion phía sau còn hai chữ "vạch nhịp". Neo cả cơ chế, không neo từ.
  ['rhythm.mjs', RHYTHM.quiet, 'vạch nhịp đập theo đúng BPM', 'cơ chế nhịp nhìn được khi tắt tiếng'],
  ['rhythm.mjs', RHYTHM.guard, 'verifyMusic()', 'hàm kiểm nhạc nền lúc nạp'],
  ['queue.mjs', QUEUE.roles, '8 nhịp', 'số nhịp một lần cổ vũ của vai chờ'],
  ['queue.mjs', QUEUE.rotate, '3 lượt mỗi em', 'số lượt cầm máy của mỗi em trong 12 lượt'],
  ['queue.mjs', QUEUE.waitCap, 'Trần đứng chờ 20 giây', 'trần thời gian một em đứng không'],
  ['queue.mjs', QUEUE.waitCap, '15 giây', 'giây mascot gọi tên em đang chờ'],
  ['queue.mjs', QUEUE.spacing, '1 sải tay', 'vòng đứng riêng của mỗi em'],
  ['queue.mjs', QUEUE.spacing, '>= 1,2 m', 'khoảng cách máy tới em đang chơi'],
  ['queue.mjs', QUEUE.teamScore, '+5 điểm động tác', 'điểm vai chờ vào thanh Cả nhóm'],
  ['queue.mjs', QUEUE.guard, 'verifyQueue()', 'hàm kiểm vai chờ lúc nạp'],
  // Probe vòng 15d: mấy đột biến viết lại câu "cấm/phủ định" vẫn xanh vì số ở đầu câu còn nguyên —
  // nghĩa là lật ngược một lệnh cấm trong lib lọt qua. Neo thẳng mệnh đề cấm, không chỉ neo số.
  ['queue.mjs', QUEUE.roles, 'CẤM để một em làm "người xem"', 'lệnh cấm em đứng xem không có việc'],
  ['queue.mjs', QUEUE.rotate, 'không trừ tim', 'nút đổi người chơi không phạt giáo viên'],
  ['queue.mjs', QUEUE.spacing, '20 giây "vào vị trí"', 'thời gian vào vị trí khi đổi người'],
  ['queue.mjs', QUEUE.teamScore, 'KHÔNG cộng vào "miti-best"', 'điểm vai chờ không vào kỷ lục cá nhân'],
  ['queue.mjs', QUEUE.guard, 'kiểm đúng bốn điều', 'số điều verifyQueue() phải kiểm'],
  // Tầng tiết học (vòng 16): trần thời lượng và độ mệt thật là hai con số duy nhất nối "game vận động"
  // với một tiết 45 phút, nên neo cả số lẫn mệnh đề cấm (kinh nghiệm probe vòng 15d).
  ['lesson.mjs', LESSON.sessionCap, '8–10 phút', 'trần thời lượng một phiên'],
  ['lesson.mjs', LESSON.sessionCap, 'phút thứ 10', 'điểm phiên tự khép'],
  ['lesson.mjs', LESSON.sessionCap, '>= 20px', 'chữ đồng hồ phiên tối thiểu'],
  ['lesson.mjs', LESSON.sessionCap, 'RANH GIỚI lượt kế tiếp', 'phiên không cắt giữa lượt đang chơi'],
  ['lesson.mjs', LESSON.sessionCap, 'vẫn KHÔNG có đồng hồ đếm ngược', 'lệnh cấm đồng hồ trên thẻ câu hỏi'],
  ['lesson.mjs', LESSON.rotationFit, 'Kế hoạch tiết 45 phút', 'dòng kế hoạch giáo viên đọc được'],
  ['lesson.mjs', LESSON.rotationFit, 'Nút "Kết phiên"', 'giáo viên kết phiên được bất cứ lúc nào'],
  ['lesson.mjs', LESSON.rotationFit, 'không trừ tim, không hỏi lý do', 'kết phiên không phạt em'],
  ['lesson.mjs', LESSON.rpe, 'báo gắng sức trên bốn mức', 'thang tự báo mệt của em'],
  ['lesson.mjs', LESSON.rpe, '"dễ quá" · "vừa" · "mệt" · "kiệt"', 'bốn mức cụ thể của thang gắng sức'],
  ['lesson.mjs', LESSON.rpe, '>= 56px', 'kích thước nút gắng sức'],
  ['lesson.mjs', LESSON.rpe, 'localStorage "miti-effort"', 'nơi lưu gắng sức theo hiệp'],
  ['lesson.mjs', LESSON.rpe, 'không mức nào bị coi là sai', 'lệnh cấm phạt em báo mệt'],
  ['lesson.mjs', LESSON.recovery, '15 giây "hồi nhịp"', 'thời gian hồi nhịp giữa hiệp'],
  ['lesson.mjs', LESSON.recovery, 'hít vào 4 nhịp – thở ra 6 nhịp', 'cơ chế hô hấp của hồi nhịp'],
  ['lesson.mjs', LESSON.recovery, 'không phải đo mạch', 'ghi chú trung thực của số nhịp ước lượng'],
  ['lesson.mjs', LESSON.lessonSheet, '"Bản tiết học"', 'khối bằng chứng cho giáo viên'],
  ['lesson.mjs', LESSON.lessonSheet, 'đúng bốn dòng', 'số dòng của Bản tiết học'],
  ['lesson.mjs', LESSON.lessonSheet, 'chưa ghi được', 'cách xử lý dòng thiếu dữ liệu thật, không bịa số'],
  ['lesson.mjs', LESSON.guard, 'verifyLesson()', 'hàm kiểm tiết học lúc nạp'],
  ['lesson.mjs', LESSON.guard, 'kiểm đúng bốn điều', 'số điều verifyLesson() phải kiểm'],
  ['lesson.mjs', LESSON.guard, 'Bản không camera', 'bản chuột/chạm vẫn bắt buộc đủ bốn điều'],
  // Probe vòng 16: viết lại câu thành "Bản không camera được bỏ qua hai điều đầu" vẫn xanh vì bốn chữ
  // "Bản không camera" còn nguyên — phải neo chính mệnh đề BẮT BUỘC.
  ['lesson.mjs', LESSON.guard, 'vẫn bắt buộc đủ bốn điều', 'bản không camera không được miễn kiểm'],
  ['lesson.mjs', LESSON.guard, 'phút thứ 10', 'điểm tự khép mà verifyLesson() phải kiểm'],
  ['curriculum.mjs', CURRICULUM.machNhan, 'tools/data/standards.mjs', 'bảng chuẩn là nguồn duy nhất của nhãn mạch'],
  ['curriculum.mjs', CURRICULUM.machNhan, 'tám mạch', 'tổng số mạch kiến thức — neo cả mệnh đề cấm mạch thứ chín'],
  ['curriculum.mjs', CURRICULUM.machNhan, 'cấm thêm mạch thứ chín', 'bảng mạch là đóng, không để mô hình tự mở rộng'],
  ['curriculum.mjs', CURRICULUM.machNhan, 'Toán 4 mạch', 'số mạch Toán'],
  ['curriculum.mjs', CURRICULUM.machNhan, 'Tiếng Anh 3 mạch', 'số mạch Tiếng Anh'],
  ['curriculum.mjs', CURRICULUM.machNhan, '<= 18 ký tự', 'trần độ dài nhãn HUD'],
  ['curriculum.mjs', CURRICULUM.machNhan, '>= 18px', 'cỡ chữ tối thiểu nhãn mạch'],
  ['curriculum.mjs', CURRICULUM.machNhan, 'CẤM tự đặt tên mạch', 'lệnh cấm tự bịa mạch — neo cả mệnh đề, không chỉ bốn chữ "tự đặt"'],
  ['curriculum.mjs', CURRICULUM.machNhan, 'CẤM HUD không có nhãn mạch.', 'HUD bắt buộc có nhãn mạch — lệnh cấm thứ hai, không được ẩn khi hẹp chỗ'],
  ['curriculum.mjs', CURRICULUM.ycDong, 'NGUYÊN VĂN', 'yêu cầu cần đạt phải copy, không viết lại'],
  ['curriculum.mjs', CURRICULUM.ycDong, 'đúng một dòng', 'số dòng yêu cầu ở mỗi màn'],
  ['curriculum.mjs', CURRICULUM.ycDong, '>= 20px', 'cỡ chữ dòng yêu cầu cần đạt'],
  ['curriculum.mjs', CURRICULUM.ycDong, 'Copy tờ rời', 'dòng yêu cầu phải nằm trong khối copy được'],
  ['curriculum.mjs', CURRICULUM.machTron, '9/12', 'trần lượt của mạch chính'],
  ['curriculum.mjs', CURRICULUM.machTron, '>= 3 lượt thuộc mạch', 'số lượt phủ mạch khác'],
  ['curriculum.mjs', CURRICULUM.machTron, 'cấm bịa chủ đề ngoài chương trình', 'lệnh cấm câu khác mạch lạc khỏi SGK'],
  ['curriculum.mjs', CURRICULUM.machTron, 'Hôm nay em chạm <n> mạch', 'dòng tổng kết đếm đúng số mạch thật đã hỏi — bằng chứng duy nhất rằng tiết có xen mạch'],
  ['curriculum.mjs', CURRICULUM.bayTruoc, 'Câu ĐẦU TIÊN', 'vị trí dòng Dễ nhầm'],
  ['curriculum.mjs', CURRICULUM.bayTruoc, 'BÁO TRƯỚC', 'báo trước khi bấm, khác chữ đỡ sau khi sai'],
  ['curriculum.mjs', CURRICULUM.bayTruoc, '6 giây', 'trần thời gian hiện dòng Dễ nhầm'],
  ['curriculum.mjs', CURRICULUM.bayTruoc, '<= 16 từ', 'trần độ dài dòng Dễ nhầm'],
  ['curriculum.mjs', CURRICULUM.meoDongTac, '<= 12 từ', 'trần độ dài mẹo nhớ'],
  ['curriculum.mjs', CURRICULUM.meoDongTac, 'động tác 3 giây', 'mẹo nhớ phải kèm động tác'],
  ['curriculum.mjs', CURRICULUM.meoDongTac, 'không phải điều kiện cộng điểm', 'động tác mẹo không biến thành thi đua'],
  ['curriculum.mjs', CURRICULUM.guard, 'verifyStandard()', 'hàm kiểm chuẩn kiến thức lúc nạp'],
  ['curriculum.mjs', CURRICULUM.guard, 'kiểm đúng bốn điều', 'số điều verifyStandard() phải kiểm'],
  ['curriculum.mjs', CURRICULUM.guard, 'vẫn bắt buộc kiểm đủ bốn điều', 'bản một em và bản không camera không được miễn kiểm'],
  // Tầng chất thể thao (vòng 18): tên môn, liều động tác và trần hạ nhiệt là những con số duy nhất nối
  // "game vung tay" với một giờ giáo dục thể chất, nên neo cả số lẫn mệnh đề CẤM (kinh nghiệm probe 15d/16).
  ['sport.mjs', SPORT.monDanh, 'tools/data/sports.mjs', 'bảng môn thể thao là nguồn duy nhất, không để mô hình tự đặt môn'],
  ['sport.mjs', SPORT.monDanh, '<= 4 từ', 'trần độ dài tên môn trên HUD'],
  ['sport.mjs', SPORT.monDanh, '>= 18px', 'cỡ chữ tối thiểu tên môn'],
  ['sport.mjs', SPORT.monDanh, 'Hôm nay ta tập môn', 'dòng tên môn ở màn khởi động'],
  ['sport.mjs', SPORT.monDanh, 'Môn thi đấu hôm nay', 'dòng tên môn ở màn tổng kết'],
  ['sport.mjs', SPORT.monDanh, 'Copy tờ rời', 'tên môn phải nằm trong khối giáo viên copy được'],
  ['sport.mjs', SPORT.monDanh, 'CẤM thay tên môn bằng mô tả động tác chung chung', 'lệnh cấm "vung tay chọn đáp án" thay cho tên môn'],
  ['sport.mjs', SPORT.monDanh, 'CẤM đổi môn giữa chừng trong một phiên', 'lệnh cấm đổi môn — một phiên một môn'],
  ['sport.mjs', SPORT.dongTacChinh, '<= 6 từ', 'trần độ dài động tác đặc trưng'],
  ['sport.mjs', SPORT.dongTacChinh, '<= 4 từ', 'trần độ dài hiệu lệnh của môn'],
  ['sport.mjs', SPORT.dongTacChinh, '>= 50% tầm với', 'biên độ động tác vẫn theo chuẩn vận động to'],
  ['sport.mjs', SPORT.dongTacChinh, 'Em đã <động tác> <n> lần', 'tổng kết đếm số lần tập bằng số thật, không phải điểm'],
  ['sport.mjs', SPORT.dongTacChinh, 'cấm nhảy tiếp đất', 'trần tải trọng trong quy định động tác của môn'],
  ['sport.mjs', SPORT.dongTacChinh, '90 độ', 'trần xoay nhanh của trần tải trọng'],
  ['sport.mjs', SPORT.dongTacChinh, 'PE.loadCap', 'động tác của môn dẫn chiếu trần tải trọng của tầng thể dục, không tự đặt số mới'],
  ['sport.mjs', SPORT.tiepSuc, 'đường tiếp sức', '12 lượt là một đường tiếp sức, không phải chuỗi câu hỏi rời rạc'],
  ['sport.mjs', SPORT.tiepSuc, '<= 0.45', 'trần alpha của gậy tiếp sức ảo'],
  ['sport.mjs', SPORT.tiepSuc, 'CẤM coi rơi gậy là thua', 'lệnh cấm phạt khi gậy lệch'],
  ['sport.mjs', SPORT.tiepSuc, 'Không sao, chạy tiếp', 'dòng an ủi duy nhất khi rơi gậy'],
  ['sport.mjs', SPORT.tiepSuc, 'không trừ tim, không trừ điểm', 'rơi gậy không bị phạt điểm'],
  ['sport.mjs', SPORT.tiepSuc, 'CẤM dựng thêm bảng đích thứ hai', 'vạch đích tiếp sức dùng lại thanh đích chung của tầng thi đua'],
  ['sport.mjs', SPORT.tinhThan, 'đúng hai lần một phiên', 'số lần nghi thức tinh thần thể thao'],
  ['sport.mjs', SPORT.tinhThan, 'lời hay <= 6 từ', 'trần độ dài lời hay khi bạn sai'],
  ['sport.mjs', SPORT.tinhThan, 'CẤM mọi dòng chế bai', 'lệnh cấm chế bai — lỗi lớn nhất của game thi đua'],
  ['sport.mjs', SPORT.tinhThan, 'lời hay đã nói', 'tổng kết đếm lời hay bằng số thật'],
  ['sport.mjs', SPORT.tinhThan, 'chưa ghi được', 'cách xử lý dòng thiếu dữ liệu thật, không bịa số'],
  ['sport.mjs', SPORT.thanhTich, 'ba mốc giảm dần', 'số mốc của bảng thành tích'],
  ['sport.mjs', SPORT.thanhTich, 'CẢ ĐỘI', 'thành tích tính cho đội, không cho cá nhân'],
  ['sport.mjs', SPORT.thanhTich, 'x > y > z', 'ba mốc phải giảm dần thật, không phải ba mốc trùng nhau'],
  ['sport.mjs', SPORT.thanhTich, 'miti-sport', 'nơi lưu huy chương của cả đội'],
  ['sport.mjs', SPORT.thanhTich, 'Kỳ trước cả đội đạt', 'dòng đọc lại thành tích kỳ trước'],
  ['sport.mjs', SPORT.thanhTich, 'CẤM xếp hạng cá nhân', 'lệnh cấm bảng xếp hạng bạn trong lớp'],
  ['sport.mjs', SPORT.thanhTich, 'CẤM biến huy chương thành điều kiện mở khóa nội dung', 'lệnh cấm đổi huy chương lấy nội dung'],
  ['sport.mjs', SPORT.hoiTinh, 'duỗi riêng của môn', 'động tác duỗi đặc trưng của môn trong hạ nhiệt'],
  ['sport.mjs', SPORT.hoiTinh, 'PE.coolDown', 'hồi tĩnh dẫn chiếu trần hạ nhiệt của tầng thể dục, không tự đặt cửa sổ mới'],
  ['sport.mjs', SPORT.hoiTinh, '45–60 giây', 'cửa sổ hạ nhiệt mà động tác duỗi của môn phải nằm trong'],
  ['sport.mjs', SPORT.hoiTinh, '15 giây', 'thời lượng động tác duỗi của môn, đúng bằng suất một động tác của PE'],
  ['sport.mjs', SPORT.hoiTinh, 'Cơ em đang duỗi', 'HUD nêu tên cơ đang duỗi'],
  ['sport.mjs', SPORT.hoiTinh, '>= 20px', 'cỡ chữ HUD hồi tĩnh'],
  ['sport.mjs', SPORT.hoiTinh, 'CẤM duỗi bật nhịp', 'lệnh cấm duỗi ballistic'],
  ['sport.mjs', SPORT.hoiTinh, 'CẤM ép em chạm gót tay xuống đất', 'lệnh cấm tư thế ép buộc'],
  ['sport.mjs', SPORT.hoiTinh, 'HAI động tác duỗi, mỗi động tác 10 giây', 'bản reduced-motion rút gọn nhưng vẫn duỗi'],
  // Probe vòng 18f: mấy pin trên chỉ an toàn khi con số bị đổi thành chuỗi KHÔNG chứa nó. "15 giây"
  // vẫn còn nguyên ở vế "duỗi tay ngang ngực 15 giây mỗi bên" nên đổi suất của động tác môn thành
  // 45 giây vẫn xanh — phải pin cả cột dữ liệu lẫn con số ngay cạnh nhau.
  ['sport.mjs', SPORT.hoiTinh, '`duoiCo`, **15 giây**', 'suất thời lượng của đúng động tác duỗi môn, không phải của động tác PE'],
  ['sport.mjs', SPORT.dongTacChinh, 'làm mẫu **3 giây**', 'thời lượng mascot làm mẫu động tác của môn'],
  ['sport.mjs', SPORT.tiepSuc, 'truyền tay', 'hành động truyền gậy — tiếp sức mà không truyền tay thì thành bốn em chơi riêng'],
  ['sport.mjs', SPORT.tiepSuc, 'hết 3 lượt', 'ngưỡng đổi người của đường tiếp sức'],
  ['sport.mjs', SPORT.tiepSuc, 'HYPE.sharedGoal', 'vạch đích tiếp sức dẫn chiếu thanh đích chung của tầng thi đua'],
  ['sport.mjs', SPORT.tinhThan, 'chạm khuỷu hoặc bắt tay **3 giây**', 'thời lượng nghi thức chơi đẹp trước hiệp 1'],
  ['sport.mjs', SPORT.tinhThan, 'hiện trên HUD **4 giây**', 'thời gian lời hay nằm trên HUD để em kịp đọc'],
  ['sport.mjs', SPORT.guard, 'verifySport()', 'hàm kiểm chất thể thao lúc nạp'],
  ['sport.mjs', SPORT.guard, 'kiểm đúng bốn điều', 'số điều verifySport() phải kiểm'],
  ['sport.mjs', SPORT.guard, 'vẫn bắt buộc kiểm đủ bốn điều', 'bản tắt tiếng, reduced-motion và không camera không được miễn kiểm'],
  // Tầng gia đình (vòng 19): tờ gửi bố mẹ chỉ còn là một khối chữ nếu bốn dòng, trần 20 từ và việc 3 phút
  // còn nguyên; rút một dòng hay đổi một trần là nó biến thành tin nhắn quảng cáo hoặc bài tập về nhà.
  // Neo cả số lẫn mệnh đề CẤM theo đúng kinh nghiệm probe 15d/16/18f.
  ['family.mjs', FAMILY.guiBoMe, 'ĐÚNG MỘT khối "Gửi bố mẹ"', 'tờ gửi về chỉ có đúng một khối, không hai'],
  ['family.mjs', FAMILY.guiBoMe, 'đúng BỐN dòng', 'số dòng của khối'],
  ['family.mjs', FAMILY.guiBoMe, '<= 20 từ', 'trần độ dài mỗi dòng'],
  ['family.mjs', FAMILY.guiBoMe, 'chữ >= 20px', 'cỡ chữ tối thiểu để bố mẹ đọc không cần kính'],
  ['family.mjs', FAMILY.guiBoMe, 'nút "Copy tờ rời"', 'khối phải nằm trong chữ copy được'],
  ['family.mjs', FAMILY.guiBoMe, 'không screensaver', 'cấm biến tờ gửi về thành hiệu ứng'],
  ['family.mjs', FAMILY.guiBoMe, 'không phải mở thêm ứng dụng nào khác', 'cấm bắt bố mẹ cài thêm thứ gì'],
  ['family.mjs', FAMILY.guiBoMe, '"Hôm nay con tập môn <môn> — <n> động tác"', 'dòng 1: môn + số động tác thật'],
  ['family.mjs', FAMILY.guiBoMe, '"Con học <tên mạch ngắn>, <k> câu đúng trên <tổng>"', 'dòng 2: mạch + tỉ lệ đúng'],
  ['family.mjs', FAMILY.guiBoMe, '"Mẹo con mang về: <mẹo>"', 'dòng 3'],
  ['family.mjs', FAMILY.guiBoMe, '"Việc 3 phút ở nhà: <một hoạt động>"', 'dòng 4'],
  ['family.mjs', FAMILY.guiBoMe, 'in "chưa ghi được"', 'dòng thiếu dữ liệu phải nhận, không được điền chữ khác'],
  ['family.mjs', FAMILY.guiBoMe, 'CẤM bịa số', 'lệnh cấm bịa thành tích của con'],
  ['family.mjs', FAMILY.baPhut, 'đúng MỘT hoạt động dài 3 phút', 'số việc và thời lượng giao về nhà'],
  ['family.mjs', FAMILY.baPhut, 'KHÔNG màn hình và KHÔNG viết', 'việc ở nhà không mở thêm thiết bị, không ghi vở'],
  ['family.mjs', FAMILY.baPhut, 'cột `dongTac` trong `tools/data/sports.mjs`', 'động tác cả nhà làm lấy từ bảng môn, không tự đặt'],
  ['family.mjs', FAMILY.baPhut, 'hỏi nhau MIỆNG đúng MỘT đề', 'đề nhắc lại chỉ một, đọc miệng'],
  ['family.mjs', FAMILY.baPhut, '`QUESTION_DATA` của phiên vừa chơi', 'đề lấy từ đúng phiên đã chơi, không ra đề mới'],
  ['family.mjs', FAMILY.baPhut, 'đề <= 16 từ', 'trần độ dài đề, cùng trần của tầng nhẹ đầu'],
  ['family.mjs', FAMILY.baPhut, 'CẤM biến thành bài tập về nhà có ghi vở', 'lệnh cấm biến game thành giao bài'],
  ['family.mjs', FAMILY.baPhut, 'CẤM giao thêm đề thứ hai', 'lệnh cấm chất đề'],
  ['family.mjs', FAMILY.baPhut, 'CẤM yêu cầu bố mẹ chụp ảnh hay quay video gửi lại', 'lệnh cấm giao việc cho người lớn'],
  ['family.mjs', FAMILY.baPhut, 'CẤM đòi mua thêm đồ dùng', 'lệnh cấm đòi đồ chơi'],
  ['family.mjs', FAMILY.baPhut, 'CẤM kèm thang điểm hay lời phê', 'lệnh cấm chấm điểm ở nhà'],
  ['family.mjs', FAMILY.meoNha, 'NGUYÊN VĂN cột `meo` (<= 12 từ)', 'mẹo mang về chép nguyên văn từ bảng chuẩn'],
  ['family.mjs', FAMILY.meoNha, '`tools/data/standards.mjs`', 'bảng chuẩn là nguồn của mẹo, không tự viết'],
  ['family.mjs', FAMILY.meoNha, 'không viết lại, không tóm tắt, không đổi số', 'cấm biến báo mẹo khi chép về nhà'],
  ['family.mjs', FAMILY.meoNha, 'MỘT động tác 3 giây bố mẹ làm cùng con', 'động tác kèm mẹo, đúng bằng động tác mascot'],
  ['family.mjs', FAMILY.meoNha, 'CẤM phát minh mẹo khác ở tờ gửi về', 'lệnh cấm hai bản mẹo lệch nhau'],
  ['family.mjs', FAMILY.riengTu, 'CẤM in tên bạn khác', 'tờ gửi về không nêu danh tính bạn'],
  ['family.mjs', FAMILY.riengTu, 'CẤM xếp hạng "con đứng thứ <n>"', 'lệnh cấm xếp hạng cá nhân trên tờ giấy'],
  ['family.mjs', FAMILY.riengTu, 'CẤM bất kỳ dòng so sánh nào với một em cụ thể', 'lệnh cấm so con với bạn'],
  ['family.mjs', FAMILY.riengTu, '"Cả nhóm: <x>/<mốc>"', 'thành tích tập thể chỉ đọc bằng đúng một dòng của tầng thi đua'],
  ['family.mjs', FAMILY.riengTu, 'CẤM nêu số điện thoại, email, ảnh', 'lệnh cấm dữ liệu cá nhân của gia đình'],
  ['family.mjs', FAMILY.khongDoi, 'giọng đe dọa hay tạo nghĩa vụ', 'giọng đi kèm của tờ gửi về'],
  ['family.mjs', FAMILY.khongDoi, '"nếu không luyện con sẽ tụt"', 'một trong ba câu dọa phải cấm, neo nguyên văn'],
  ['family.mjs', FAMILY.khongDoi, 'một dòng duy nhất <= 24 từ', 'trần độ dài dòng chốt'],
  ['family.mjs', FAMILY.khongDoi, '"Nhà mình làm cùng nhau khi nào cũng được"', 'dạng chốt thứ nhất'],
  ['family.mjs', FAMILY.khongDoi, '"Khi nào con muốn chơi lại thì con tự bấm"', 'dạng chốt thứ hai'],
  ['family.mjs', FAMILY.khongDoi, 'CẤM in cả hai dòng', 'chỉ được chốt bằng MỘT trong hai dạng'],
  ['family.mjs', FAMILY.guard, 'verifyFamily()', 'hàm kiểm tờ gửi bố mẹ lúc nạp'],
  ['family.mjs', FAMILY.guard, 'kiểm đúng bốn điều', 'số điều verifyFamily() phải kiểm'],
  ['family.mjs', FAMILY.guard, 'khối "Gửi bố mẹ" có ĐÚNG MỘT lần', 'điều 1 mà hàm phải bắt'],
  ['family.mjs', FAMILY.guard, 'chứ không phải chữ chép sẵn', 'điều 2: bốn dòng phải từ số thật của phiên'],
  ['family.mjs', FAMILY.guard, 'Bản một học sinh, bản không camera và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều', 'không bản nào được miễn kiểm'],
  // Tầng tuần học (vòng 20) MƯỢN toàn bộ con số: khoảng tuần ở cột `tuan`, năm học 35 tuần và các mốc
  // ở SCHOOL_YEAR. Vì lib nối số bằng biểu thức nên đổi SCHOOL_YEAR là prompt tự đổi theo — pin đơn
  // chuỗi không thấy gì. Neo số thành chữ đen ngay trong lib: đổi 2 tuần nước rút thành 8, kéo trần
  // 10 tuần lên 20 hay hạ >= 3/12 xuống >= 1/12 là hỏng pin, không phải hỏng im lặng.
  ['pacing.mjs', PACE.nhanTuan, 'ĐÚNG MỘT nhãn "Tuần <a>–<b> · Học kì <n>"', 'một nhãn tuần, ở hai màn'],
  ['pacing.mjs', PACE.nhanTuan, 'NGUYÊN VĂN cột `tuan`', 'khoảng tuần chép từ bảng chuẩn, không tự đặt'],
  ['pacing.mjs', PACE.nhanTuan, '`tuan[0]` <= 18 là Học kì 1', 'ranh giới Học kì 1/Học kì 2'],
  ['pacing.mjs', PACE.nhanTuan, 'chữ >= 18px', 'cỡ chữ tối thiểu của nhãn tuần'],
  ['pacing.mjs', PACE.nhanTuan, 'nằm TRONG khối chữ mà nút "Copy tờ rời" copy được', 'nhãn tuần phải đi được về nhà trên tờ giấy'],
  ['pacing.mjs', PACE.nhanTuan, 'CẤM tự đặt khoảng tuần khác bảng chuẩn', 'lệnh cấm chế lịch'],
  ['pacing.mjs', PACE.nhanTuan, 'CẤM in "cả năm" hoặc để trống', 'lệnh cấm hai cách trốn nhãn tuần'],
  ['pacing.mjs', PACE.nhanTuan, 'CẤM một cụm phủ quá 10 tuần', 'trần bề rộng một khoảng tuần'],
  ['pacing.mjs', PACE.nhanTuan, '<= 14 từ "theo phân phối chung — cô xác nhận tuần của lớp em"', 'dòng nhắc cô giáo mới là người xác nhận tuần của lớp'],
  ['pacing.mjs', PACE.hoiMotCau, 'ĐÚNG MỘT LẦN, ở phiên ĐẦU TIÊN', 'một câu hỏi tuần, chỉ ở phiên đầu'],
  ['pacing.mjs', PACE.hoiMotCau, '1–' + SCHOOL_YEAR.soTuan, 'dải nút tuần đúng bằng năm học trong SCHOOL_YEAR'],
  ['pacing.mjs', PACE.hoiMotCau, 'localStorage "miti-week"', 'nơi lưu tuần của lớp'],
  ['pacing.mjs', PACE.hoiMotCau, 'HUD ghi "Tuần: chưa chọn"', 'chưa chọn tuần thì game vẫn chạy'],
  ['pacing.mjs', PACE.hoiMotCau, 'CẤM chặn nút "Bắt đầu"', 'câu hỏi tuần không được thành rào cản'],
  ['pacing.mjs', PACE.hoiMotCau, 'CẤM hỏi giữa phiên', 'lệnh cấm ngắt giữa lượt'],
  ['pacing.mjs', PACE.hoiMotCau, 'CẤM tiện đó hỏi tên học sinh', 'lệnh cấm mượn chỗ hỏi tuần để thu dữ liệu cá nhân'],
  ['pacing.mjs', PACE.onTheoTuan, '>= 3/12 lượt', 'số lượt ôn theo tuần'],
  ['pacing.mjs', PACE.onTheoTuan, 'b < tuần đang học', 'tiêu chí "đã qua tuần" của cụm'],
  ['pacing.mjs', PACE.onTheoTuan, 'trùng được với ba lượt xen mạch của tầng chuẩn kiến thức', 'hai bộ ba dùng chung một ngân sách 12 lượt'],
  ['pacing.mjs', PACE.onTheoTuan, '"Tuần <t> · em ôn lại <n> cụm đã học"', 'dòng tổng kết bằng số thật'],
  ['pacing.mjs', PACE.onTheoTuan, 'CẤM chọn làm đề MỚI một cụm chưa tới tuần mở bài', 'lệnh cấm đánh đố trước chương trình'],
  ['pacing.mjs', PACE.nuocRut, 'Trong ' + SCHOOL_YEAR.nuocRut + ' tuần trước một mốc kiểm tra', 'độ dài vùng nước rút lấy từ SCHOOL_YEAR'],
  ['pacing.mjs', PACE.nuocRut, 'Còn <n> tuần tới kiểm tra', 'nhãn nước rút trên HUD'],
  ['pacing.mjs', PACE.nuocRut, 'hai lượt ĐẦU', 'số lượt ưu tiên cụm yếu nhất'],
  ['pacing.mjs', PACE.nuocRut, 'errorTag yếu nhất của em trong "miti-mastery"', 'nguồn xếp thứ tự ở vùng nước rút'],
  ['pacing.mjs', PACE.nuocRut, 'CẤM tăng độ khó', 'nước rút không siết độ khó'],
  ['pacing.mjs', PACE.nuocRut, 'CẤM trừ tim nhiều hơn', 'nước rút không phạt nặng hơn'],
  ['pacing.mjs', PACE.nuocRut, 'CẤM biến 12 lượt thành đề thi thử có đồng hồ', 'nước rút không biến game thành kiểm tra'],
  ['pacing.mjs', PACE.nuocRut, 'CẤM kéo dài phiên quá trần 10 phút', 'nước rút không vượt trần của tầng tiết học'],
  ['pacing.mjs', PACE.nuocRut, 'CẤM bỏ khởi động và hạ nhiệt', 'nước rút không cắt phần thể dục'],
  ['pacing.mjs', PACE.tongOn, 'Từ tuần ' + SCHOOL_YEAR.tongOnTu, 'tuần bắt đầu tổng ôn lấy từ SCHOOL_YEAR'],
  ['pacing.mjs', PACE.tongOn, '>= 6/12 lượt', 'số lượt ôn ở chế độ tổng ôn'],
  ['pacing.mjs', PACE.tongOn, 'CẤM giới thiệu cụm mới', 'tổng ôn không mở bài mới'],
  ['pacing.mjs', PACE.tongOn, '"Cả năm có <k> cụm, em vững <m> cụm"', 'dòng tổng kết tổng ôn bằng số thật'],
  ['pacing.mjs', PACE.tongOn, 'CẤM bịa', 'lệnh cấm bịa số ở dòng tổng ôn'],
  ['pacing.mjs', PACE.guard, 'verifyPacing()', 'hàm kiểm tầng tuần học lúc nạp'],
  ['pacing.mjs', PACE.guard, 'kiểm đúng bốn điều', 'số điều verifyPacing() phải kiểm'],
  ['pacing.mjs', PACE.guard, 'nằm trong 1–' + SCHOOL_YEAR.soTuan, 'điều 1: khoảng tuần phải trong năm học'],
  ['pacing.mjs', PACE.guard, 'chạy ĐÚNG MỘT lần ở phiên đầu', 'điều 2 mà hàm phải bắt'],
  ['pacing.mjs', PACE.guard, '`tuan[1]` nhỏ hơn tuần đó', 'điều 3: tiêu chí cụm đã qua tuần'],
  ['pacing.mjs', PACE.guard, 'không đổi luật chơi, không đổi trần tải trọng của tầng thể dục', 'điều 4: nước rút và tổng ôn chỉ đổi thứ tự'],
  ['pacing.mjs', PACE.guard, 'Bản không camera, bản một học sinh và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều', 'không bản nào được miễn kiểm'],
  // Tầng chỗ chơi an toàn (vòng 21): toàn bộ là SỐ và LỆNH CẤM — hạ ngưỡng hay lật lệnh cấm trong lib thì
  // 85 prompt đổi theo im lặng, nên neo cả đơn vị đo lẫn mệnh đề cấm (kinh nghiệm probe vòng 15d).
  ['playzone.mjs', PLAYZONE.depCho, 'THẺ "DẸP CHỖ CHƠI"', 'thẻ dẹp chỗ chơi có tên riêng để nghiệm thu'],
  ['playzone.mjs', PLAYZONE.depCho, 'đúng BỐN dòng <= 12 từ', 'bốn dòng kiểm được, không phải một lời nhắc dài'],
  ['playzone.mjs', PLAYZONE.depCho, 'CẤM mở thêm một màn hình riêng trước khởi động', 'thẻ không vượt trần 10 phút của tầng tiết học'],
  ['playzone.mjs', PLAYZONE.depCho, 'một vòng 1 sải tay tính từ vai', 'đơn vị khoảng cách đo được, thay cho "một bước"'],
  ['playzone.mjs', PLAYZONE.depCho, '>= 1,2 m', 'máy cách em đang chơi, thống nhất với tầng vai chờ'],
  ['playzone.mjs', PLAYZONE.depCho, 'tối đa 20 giây', 'trần thời gian của thẻ'],
  ['playzone.mjs', PLAYZONE.depCho, 'CẤM dùng "một bước" làm đơn vị khoảng cách', 'lệnh cấm đơn vị mơ hồ'],
  ['playzone.mjs', PLAYZONE.depCho, 'CẤM chặn nút "Bắt đầu"', 'dẹp chỗ không thành rào cản'],
  ['playzone.mjs', PLAYZONE.giayDep, 'MỘT hàng ba lựa chọn giày dép', 'hàng chọn giày dép trên thẻ'],
  ['playzone.mjs', PLAYZONE.giayDep, '"miti-foot"', 'nơi lưu lựa chọn giày dép'],
  ['playzone.mjs', PLAYZONE.giayDep, '0/12 lượt được là động tác nhấc chân cao', 'trần lượt nhấc chân khi đi dép lê'],
  ['playzone.mjs', PLAYZONE.giayDep, 'CẤM từ đầu đến cuối phiên mọi động tác đòi đứng một chân', 'lệnh cấm thăng bằng một chân'],
  ['playzone.mjs', PLAYZONE.giayDep, 'CẤM in chữ "không an toàn" cạnh tên em', 'không dán nhãn lỗi lên người em'],
  ['playzone.mjs', PLAYZONE.lopChat, 'Một nút "Lớp mình chật"', 'nút chuyển bản tại chỗ'],
  ['playzone.mjs', PLAYZONE.lopChat, '"miti-space"', 'nơi lưu lựa chọn chật'],
  ['playzone.mjs', PLAYZONE.lopChat, '>= 15% tầm với đã calibration', 'biên độ giữ nguyên khi chơi tại chỗ'],
  ['playzone.mjs', PLAYZONE.lopChat, '>= 12 nhịp chuyển động mỗi phút', 'thước đo cường độ không đổi vì chật'],
  ['playzone.mjs', PLAYZONE.lopChat, 'CẤM trừ điểm, CẤM rút số lượt', 'chật không bị tính là em kém'],
  ['playzone.mjs', PLAYZONE.lopChat, 'hình quạt 90 độ PHÍA TRƯỚC', 'trần không gian của vật thể AR'],
  ['playzone.mjs', PLAYZONE.lopChat, 'mặc định BẬT SẴN nút này', 'bản không camera mặc định tại chỗ'],
  ['playzone.mjs', PLAYZONE.locDongTac, 'chốt MỘT LẦN đầu phiên', 'bộ động tác không đổi giữa phiên'],
  ['playzone.mjs', PLAYZONE.locDongTac, 'CẤM mở rộng bộ động tác giữa phiên', 'lệnh cấm làm em bất ngờ bằng động tác cần chỗ hơn'],
  ['playzone.mjs', PLAYZONE.locDongTac, 'chỉ có hiệu lực ở PHIÊN kế tiếp', 'đổi lựa chọn giữa phiên không cắt ngang động tác đang chạy'],
  ['playzone.mjs', PLAYZONE.nutMet, 'Nút "Em mệt / em đau" hiện ĐÚNG MỘT chỗ', 'nút xin nghỉ có chỗ duy nhất trên HUD'],
  ['playzone.mjs', PLAYZONE.nutMet, '>= 56px', 'cỡ nút xin nghỉ bấm được bằng tay trẻ'],
  ['playzone.mjs', PLAYZONE.nutMet, 'CẤM biến nó thành nút "Tạm dừng"', 'quyền nghỉ không bị lẫn vào tạm dừng'],
  ['playzone.mjs', PLAYZONE.nutMet, 'CẤM mascot bình luận "cố lên"', 'không thuyết phục em chơi tiếp khi đang đau'],
  ['playzone.mjs', PLAYZONE.nutMet, 'CẤM đòi cô giáo xác nhận', 'em nghỉ không cần ai cho phép'],
  ['playzone.mjs', PLAYZONE.nutMet, 'HẠ NHIỆT 45–60 GIÂY', 'nghỉ sớm vẫn đi qua hạ nhiệt'],
  ['playzone.mjs', PLAYZONE.nutMet, '"miti-stop"', 'bằng chứng phiên dừng sớm'],
  ['playzone.mjs', PLAYZONE.guard, 'verifyPlayzone()', 'hàm kiểm tầng chỗ chơi lúc nạp'],
  ['playzone.mjs', PLAYZONE.guard, 'kiểm đúng bốn điều', 'số điều verifyPlayzone() phải kiểm'],
  ['playzone.mjs', PLAYZONE.guard, 'Bản không camera, bản một học sinh và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều', 'không bản nào được miễn kiểm chỗ chơi'],
  // Probe 21: mười lăm con số và lệnh cấm dưới đây bị sửa ngay trong lib mà build vẫn xanh, vì pin cũ
  // chỉ neo tên thẻ và kích thước nút. Mỗi dòng là một chỗ hỏng thật: thẻ 5 giây thì em chưa kịp dọn
  // chỗ đã vào hiệp; nút 16px thì tay trẻ bấm trúng "Chỗ chơi ổn rồi" thay vì "Em mệt"; ">= 20%" thì
  // bản tại chỗ rớt dưới trần cường độ của tầng thể dục mà không ai báo.
  ['playzone.mjs', PLAYZONE.depCho, 'NGAY TRONG 60–90 GIÂY khởi động', 'thẻ dẹp chỗ nằm TRONG khởi động, không phải một màn riêng 5 giây'],
  ['playzone.mjs', PLAYZONE.depCho, '"Chỗ chơi ổn rồi" >= 56px', 'cỡ nút xác nhận chỗ chơi'],
  ['playzone.mjs', PLAYZONE.depCho, 'CẤM trừ tim vì chưa dẹp', 'dẹp chỗ không thành điều kiện phạt'],
  ['playzone.mjs', PLAYZONE.depCho, 'một nút "Bỏ qua"', 'giáo viên có đường bỏ qua, thẻ không chặn phiên'],
  ['playzone.mjs', PLAYZONE.giayDep, '"Động tác hôm nay: bản tại chỗ (dép lê)"', 'dòng tổng kết nói rõ bản động tác nào đã chơi'],
  ['playzone.mjs', PLAYZONE.lopChat, 'đồng hồ vận động >= 60%', 'trần vận động không hạ vì lớp chật'],
  ['playzone.mjs', PLAYZONE.lopChat, 'CẤM mọi chỉ dẫn "lùi lại"', 'không đòi em lùi khỏi vùng đã khai giữa 12 lượt'],
  ['playzone.mjs', PLAYZONE.locDongTac, 'HUD ghi "Vùng chơi: tại chỗ"', 'HUD phải nói em đang ở bản vùng chơi nào'],
  ['playzone.mjs', PLAYZONE.locDongTac, '"Vùng chơi: 1 sải tay" ở chữ >= 18px', 'cỡ chữ của nhãn vùng chơi'],
  ['playzone.mjs', PLAYZONE.nutMet, 'không bao giờ mờ, không bao giờ bị che', 'nút xin nghỉ luôn bấm được'],
  ['playzone.mjs', PLAYZONE.nutMet, 'CẤM trừ tim, CẤM trừ điểm, CẤM hỏi lý do', 'nghỉ sớm không phải một lỗi'],
  ['playzone.mjs', PLAYZONE.nutMet, '"Em xin nghỉ ở phút <n> — nghỉ đúng lúc cũng là chơi giỏi"', 'dòng tổng kết tôn trọng cú bấm nghỉ'],
  ['playzone.mjs', PLAYZONE.guard, '0/12 lượt nhấc chân cao khi chân đất / dép lê', 'điều 2 của verifyPlayzone() phải nêu con số 0/12'],
  ['playzone.mjs', PLAYZONE.guard, 'bộ động tác không đổi giữa phiên', 'điều 3 của verifyPlayzone()'],
  ['playzone.mjs', PLAYZONE.guard, '`console.warn` tiếng Việt nêu đúng phần lệch', 'thiếu điều nào phải nói rõ điều đó, không im lặng'],
  ['rules.mjs', RULES.safety, 'giữ cách tường một vòng 1 sải tay', 'dòng an toàn 85/85 prompt phải dùng đơn vị sải tay của vòng 21, không quay lại "một bước"'],
  ['folk.mjs', FOLK.chonTro, 'đúng MỘT trò chơi dân gian', 'mỗi game một trò dẫn dắt, không phải danh sách để model tự chọn'],
  ['folk.mjs', FOLK.chonTro, 'NGUYÊN VĂN từ `tools/data/folk.mjs`', 'trò phải lấy từ bảng dữ liệu, không để mô hình tự bịa trò'],
  ['folk.mjs', FOLK.chonTro, 'mười bốn mã, mười bốn trò', 'bảng trò phủ đủ mã điều khiển'],
  ['folk.mjs', FOLK.chonTro, '(cột `tro`, <= 4 từ)', 'trần độ dài tên trò nằm ngay trên nhãn HUD'],
  ['folk.mjs', FOLK.chonTro, '(cột `loiCho`, <= 8 từ)', 'trần độ dài dòng cách chơi để em đọc hết trong một hơi'],
  ['folk.mjs', FOLK.chonTro, 'CẤM xuất hiện ở góc HUD trên', 'tên trò không được giành chỗ tên môn thể thao của vòng 18'],
  ['folk.mjs', FOLK.chonTro, 'CẤM đổi trò giữa phiên', 'đổi trò giữa phiên là đổi luôn cách chơi đang chạy'],
  ['folk.mjs', FOLK.dongDao, '(<= 8 tiếng)', 'trần độ dài lời hô theo nhịp'],
  ['folk.mjs', FOLK.dongDao, 'ba lần một phiên, không hơn', 'ngân sách lời hô phải nằm dưới trần 3 câu mỗi phút'],
  ['folk.mjs', FOLK.dongDao, 'CẤM thay lời hô bằng beep đếm số', 'không có lời hô thì em đếm bằng tiếng beep vô nghĩa'],
  ['folk.mjs', FOLK.dongDao, 'CẤM biến chant thành câu hỏi hay thành điều kiện chốt đáp án', 'lời hô là nhịp, không thành thêm một câu hỏi'],
  ['folk.mjs', FOLK.dongDao, 'KHÔNG tính vào ngân sách 3 câu thoại mỗi phút', 'chant do vai Cổ vũ hô, không phải mascot đọc'],
  ['folk.mjs', FOLK.dongDao, '(<= 8 từ, đọc giọng en-US)', 'game Tiếng Anh hô bằng mẫu câu đang luyện, đọc giọng Anh'],
  ['folk.mjs', FOLK.dongDao, 'không nhấp nháy quá 3 lần mỗi giây', 'chữ sáng theo nhịp vẫn chịu trần nhấp nháy của tầng tiếp cận'],
  ['folk.mjs', FOLK.banAnToan, 'vòng 1 sải tay và trong hình quạt 90 độ', 'bản tại chỗ của trò dân gian phải khớp trần chỗ chơi vòng 21'],
  ['folk.mjs', FOLK.banAnToan, 'Năm trò bị loại thẳng', 'phải nêu đích danh trò bị cấm, không để model tự đoán'],
  ['folk.mjs', FOLK.banAnToan, 'CẤM mọi động tác nắm tay bạn', 'trò đôi bạn không được biến thành tiếp xúc thật'],
  ['folk.mjs', FOLK.banAnToan, 'KHÔNG làm đổi tên trò', 'thẻ dẹp chỗ chơi chỉ đổi động tác, không đổi khung chơi'],
  ['folk.mjs', FOLK.doDung, 'đúng MỘT đồ dùng sân trường', 'một đạo cụ thật duy nhất để HUD không thành cửa hàng'],
  ['folk.mjs', FOLK.doDung, 'vạch phấn · dây nhảy · khăn vải · viên sỏi', 'ngân hàng tám món sân trường là nguồn duy nhất'],
  ['folk.mjs', FOLK.doDung, 'CẤM đòi em cầm, nhặt, bốc, thổi, đội hay truyền tay vật thật', 'lớp 45 em thì phát thu đồ là hết nửa tiết'],
  ['folk.mjs', FOLK.doDung, 'ván trượt, giày patin, dơi bóng chày', 'đồ dùng trường làng không có thì game không chạy được'],
  ['folk.mjs', FOLK.doiBan, 'ĐỔI vai sau mỗi 3 lượt', 'trò đôi bạn phải khớp trần 3 lượt một vai của tầng vai chờ'],
  ['folk.mjs', FOLK.doiBan, 'CẤM đòi thêm bạn ngoài lớp', 'một máy trong một lớp không được chờ đủ người mới chơi'],
  ['folk.mjs', FOLK.doiBan, 'CẤM in dòng đó khi phiên không có cú hô chant nào', 'dòng tổng kết chỉ nói điều thật sự xảy ra'],
  ['folk.mjs', FOLK.guard, '`verifyFolk()` chạy MỘT LẦN', 'hàm kiểm tầng sân chơi lúc nạp'],
  ['folk.mjs', FOLK.guard, 'kiểm đúng bốn điều', 'số điều verifyFolk() phải kiểm'],
  ['folk.mjs', FOLK.guard, 'hô đúng BA lần một phiên', 'điều 2 của verifyFolk() phải nêu đủ số lần hô'],
  ['folk.mjs', FOLK.guard, 'không một lượt nào trong 12 lượt đòi em cầm vật thật', 'điều 3 của verifyFolk()'],
  ['folk.mjs', FOLK.guard, 'Bản không camera, bản một học sinh và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều', 'sân chơi và lời hô không phụ thuộc webcam'],
  ['folk.mjs', FOLK.chonTro, 'chữ >= 18px', 'trần cỡ chữ của tên trò ở dòng "Cách chơi" và nhãn mini-trạm'],
  ['folk.mjs', FOLK.chonTro, 'CẤM bịa trò không ai chơi', 'ngân hàng trò thật, không để mô hình tự nghĩ'],
  ['folk.mjs', FOLK.chonTro, 'CẤM gọi trò bằng tên chung chung', 'tên trò phải là trò thật, không phải "vận động cùng bạn"'],
  ['folk.mjs', FOLK.chonTro, 'builder báo lỗi, không để mô hình tự chọn', 'thiếu trò trong bảng thì dừng build'],
  ['folk.mjs', FOLK.dongDao, 'CẤM gọi lời đếm', 'lời đếm không được mang nhãn "đồng dao"'],
  ['folk.mjs', FOLK.dongDao, 'Bản "miti-mute"', 'bản tắt tiếng hiện chữ lời hô trên vạch nhịp'],
  ['folk.mjs', FOLK.doDung, 'NGUYÊN VĂN một phần tử trong tám món', 'đồ dùng lấy từ FOLK_PROPS, không tự đặt tên'],
  ['folk.mjs', FOLK.doiBan, 'CẤM chờ đủ bốn em mới cho bắt đầu', 'một máy trong lớp không được thành "không chơi được"'],
  ['folk.mjs', FOLK.doiBan, 'in ĐÚNG MỘT dòng "Trò chơi hôm nay:', 'dòng tổng kết chỉ in khi phiên có cú hô thật'],
  ['folk.mjs', FOLK.guard, '· không trò nào thuộc năm trò đã loại', 'điều 4 của verifyFolk() phải kiểm đủ năm trò'],
  ['folk.mjs', FOLK.guard, '`console.warn` tiếng Việt nêu đúng phần lệch', 'hàm kiểm phải nói được chỗ lệch bằng tiếng Việt'],
  ['quiz.mjs', QUIZ.nguonDe, 'đúng BA lượt là lượt "Đố bạn"', 'số lượt đố trong một phiên'],
  ['quiz.mjs', QUIZ.nguonDe, 'mỗi hiệp MỘT lượt, luôn ở vị trí CUỐI hiệp', 'vị trí lượt đố trong hiệp'],
  ['quiz.mjs', QUIZ.nguonDe, 'NGUYÊN VĂN MỘT trong ba mẫu câu của mạch kiến thức game này', 'đề đố lấy nguyên văn từ bảng mẫu câu, không tự bịa'],
  ['quiz.mjs', QUIZ.nguonDe, 'điền đúng MỘT số hoặc MỘT từ đang hiện trên thẻ của lượt đó', 'chỗ trống chỉ điền một giá trị đang có trên màn hình'],
  ['quiz.mjs', QUIZ.nguonDe, 'game không nhận diện tiếng nói', 'lượt đố không bật recognition'],
  ['quiz.mjs', QUIZ.nguonDe, 'Chín lượt còn lại vẫn lấy từ ngân hàng đề đã có', 'phần còn lại của phiên vẫn là đề máy'],
  ['quiz.mjs', QUIZ.nguonDe, 'CẤM đảo thành 12/12 lượt đố', 'trần lượt đố không được nới thành cả phiên'],
  ['quiz.mjs', QUIZ.cachDo, 'MỘT hàng ba mẫu câu đúng mạch, chữ >= 20px', 'cỡ chữ của thẻ đố'],
  ['quiz.mjs', QUIZ.cachDo, 'tự tắt sau 6 giây hoặc khi em chạm', 'thời gian sống của thẻ đố'],
  ['quiz.mjs', QUIZ.cachDo, 'đọc to MỘT mẫu câu trong 3 giây', 'cửa sổ đọc đề của em đố'],
  ['quiz.mjs', QUIZ.cachDo, 'CẤM game bật microphone ở lượt này (chỉ ba game mã VOICE mới có micro)', 'micro chỉ thuộc ba game VOICE'],
  ['quiz.mjs', QUIZ.cachDo, 'CẤM hiện sẵn đáp án đúng trên thẻ "Đố bạn"', 'thẻ đố không được spoiler'],
  ['quiz.mjs', QUIZ.dapCuaBan, 'ĐÚNG MỘT động tác thuộc mã điều khiển của game này', 'một động tác duy nhất để đáp'],
  ['quiz.mjs', QUIZ.dapCuaBan, 'vẫn trong vòng 1 sải tay và hình quạt 90 độ', 'động tác đáp án vẫn trong vùng an toàn'],
  ['quiz.mjs', QUIZ.dapCuaBan, 'CẤM biến lượt đố thành lượt ngồi xem', 'lượt đố không được thành lượt nghỉ'],
  ['quiz.mjs', QUIZ.dapCuaBan, 'mẫu câu đố đọc giọng en-US', 'giọng đọc mẫu câu tiếng Anh'],
  ['quiz.mjs', QUIZ.xuLyLech, 'KHÔNG trừ tim, KHÔNG cắt chuỗi đúng', 'đề lệch không phạt em đố'],
  ['quiz.mjs', QUIZ.xuLyLech, 'ngân sách 3 câu thoại mỗi phút, <= 6 từ', 'câu đỡ của mascot nằm trong trần giọng'],
  ['quiz.mjs', QUIZ.xuLyLech, 'thẻ "Đố bạn" tự đổi sang đề ngân hàng ở lượt kế', 'đường lùi khi đề ra ngoài phạm vi'],
  ['quiz.mjs', QUIZ.xuLyLech, 'nút "Em chịu, bạn đáp giúp"', 'nút nhận thua cho em được đố'],
  ['quiz.mjs', QUIZ.xuLyLech, 'CẤM phạt em đặt đề sai', 'em đặt đề không bị trừ gì'],
  ['quiz.mjs', QUIZ.diemVai, '+5 điểm vào thanh "Cả nhóm', 'điểm lượt đố hợp lệ'],
  ['quiz.mjs', QUIZ.diemVai, 'KHÔNG cộng vào "miti-best"', 'điểm đố không vào bảng xếp hạng cá nhân'],
  ['quiz.mjs', QUIZ.diemVai, 'ĐÚNG MỘT dòng "Em đố hôm nay: <tên> <n> đề"', 'dòng tổng kết lượt đố'],
  ['quiz.mjs', QUIZ.diemVai, 'CẤM xếp hạng riêng người đố', 'không lập bảng điểm cho em đặt đề'],
  ['quiz.mjs', QUIZ.guard, '`verifyQuiz()` chạy MỘT LẦN', 'hàm kiểm tầng đố bạn lúc nạp'],
  ['quiz.mjs', QUIZ.guard, 'kiểm đúng bốn điều', 'số điều verifyQuiz() phải kiểm'],
  ['quiz.mjs', QUIZ.guard, 'đúng BA lượt "Đố bạn" một phiên ở cuối mỗi hiệp', 'điều 1 của verifyQuiz() phải nêu đủ số lượt'],
  ['quiz.mjs', QUIZ.guard, 'không bật microphone và không hiện sẵn đáp án', 'điều 2 của verifyQuiz()'],
  ['quiz.mjs', QUIZ.guard, 'đề lệch không trừ tim không cắt chuỗi', 'điều 3 của verifyQuiz()'],
  ['quiz.mjs', QUIZ.guard, 'Bản một học sinh, bản không camera và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều', 'lượt đố không phụ thuộc webcam'],
  ['quiz.mjs', QUIZ.guard, '`console.warn` tiếng Việt nêu đúng phần lệch', 'hàm kiểm phải nói được chỗ lệch bằng tiếng Việt'],
  ['quiz.mjs', QUIZ.nguonDe, '`tools/data/quiz.mjs`', 'lượt đố phải lấy mẫu câu từ bảng quiz, không phải bảng trò dân gian'],
  ['quiz.mjs', QUIZ.guard, '`tools/data/quiz.mjs`', 'verifyQuiz() phải đối chiếu mẫu câu với đúng bảng quiz'],
  ['quiz.mjs', QUIZ.cachDo, 'Bản một học sinh: chính em bấm "Em đố", đọc mẫu câu rồi tự đáp, thẻ vẫn hiện đủ ba mẫu', 'một em vẫn có lượt đố, không được bỏ'],
  ['quiz.mjs', QUIZ.dapCuaBan, 'vai "Thư ký" đọc to lại cả đề lẫn đáp án đúng theo tầng vai chờ', 'lượt đố có vai chờ thật, không thành lượt ngồi xem'],
  ['quiz.mjs', QUIZ.xuLyLech, 'CẤM in chữ "đề sai" cạnh tên em', 'đề lệch không biến thành nhãn xấu trước lớp'],
];
for (const [file, text, needle, label] of FULL_PINS) {
  if (!text.includes(needle)) bad(`tools/lib/${file} không còn nêu "${needle}" (${label}) — con số nghiệm thu phải sửa cùng tài liệu và bảng kiểm, không đổi âm thầm trong lib.`);
}
// Ngân sách giọng viết ở HAI lib: celebrate.mjs giữ phần SFX, rhythm.mjs giữ phần nhạc nền. Một bên
// đổi số mà bên kia không đổi thì game phải cắt nhạc hoặc bỏ tiếng để vừa trần — pin đơn lib không bắt
// được vì mỗi lib vẫn tự nhất quán; chỉ so tập hợp số giữa hai lib mới thấy lệch.
const voiceNums = (t) => [...t.matchAll(/(\d+)\s*giọng/g)].map((m) => m[1]).sort().join(',');
if (voiceNums(CELEBRATE.sfx) !== voiceNums(RHYTHM.duck)) {
  bad(`Ngân sách giọng lệch giữa tools/lib/celebrate.mjs (${voiceNums(CELEBRATE.sfx)}) và tools/lib/rhythm.mjs (${voiceNums(RHYTHM.duck)}) — trần giọng SFX, trần giọng nhạc nền và tổng trần phải nêu giống nhau ở cả hai lib.`);
}
// Chuỗi tự kiểm ("Tự kiểm tra trước khi xuất") là chỗ duy nhất người dán prompt nhìn thấy khi đối
// chiếu nhanh, nên nó phải giữ lại con số của tầng chứ không được rút thành mô tả chung. Probe vòng 14:
// xóa "· verifyMusic() kiểm lúc nạp" khỏi RHYTHM_SHORT thì build vẫn xanh — chuỗi ngắn tự nó nhất quán,
// chỉ so với danh sách con số khóa ở đây mới phát hiện nó bị cụt.
const SHORT_PINS = {
  LIGHT_SHORT: ['>= 60%', '16 từ', '+6 động tác', '+3 đáp án'],
  CELEBRATE_SHORT: ['40–60 hạt', '200 ms', '0.25', '4 giọng SFX', '0,45×'],
  IDENTITY_SHORT: ['2 từ', '>= 5 chỗ', '60/441', '1 lần/phiên', '6 từ'],
  RHYTHM_SHORT: ['100–116 BPM', '128', '0.18', '30% gain', 'vạch nhịp', 'verifyMusic()'],
  QUEUE_SHORT: ['8 nhịp', '3 lượt/em', 'trần 20 giây', 'giây 15', '1 sải tay', '1,2 m', '+5 điểm', 'verifyQueue()'],
  LESSON_SHORT: ['8–10 phút', 'phút thứ 10', 'Kế hoạch tiết 45 phút', 'Kết phiên', 'bốn mức gắng sức', '>= 56px', 'miti-effort', '15 giây hồi nhịp', 'Bản tiết học', 'verifyLesson()'],
  CURRICULUM_SHORT: ['<= 18 ký tự', 'Yêu cầu cần đạt', 'nguyên văn', 'Copy tờ rời', '<= 9/12 lượt', '>= 3 lượt thuộc mạch khác', 'Dễ nhầm', '<= 16 từ', 'Mẹo nhớ', '<= 12 từ', 'động tác 3 giây', 'verifyStandard()'],
  SPORT_SHORT: ['tên môn thể thao <= 4 từ', 'động tác đặc trưng của môn <= 6 từ', 'hiệu lệnh <= 4 từ', 'truyền tay sau 3 lượt', 'rơi gậy không trừ tim', 'chạm khuỷu 3 giây', 'lời hay <= 6 từ', 'ba mốc', 'cả đội', 'miti-sport', 'cấm xếp hạng cá nhân', 'duỗi riêng của môn 15 giây', 'hạ nhiệt 45–60 giây', 'verifySport()'],
  FAMILY_SHORT: ['khối "Gửi bố mẹ" 4 dòng', '<= 20 từ', '>= 20px', '"Copy tờ rời"', 'việc 3 phút ở nhà không màn hình', 'cột `dongTac`', '<= 16 từ', 'cột `meo` <= 12 từ', 'động tác 3 giây', 'không tên bạn khác', 'không xếp hạng', 'không đe dọa', 'verifyFamily()'],
  PACE_SHORT: ['"Tuần <a>–<b> · Học kì <n>"', 'cột tuan', 'tối đa 10 tuần', 'đúng MỘT lần ở phiên đầu', 'lưu "miti-week"', 'không chặn nút "Bắt đầu"', '>= 3/12 lượt', SCHOOL_YEAR.nuocRut + ' tuần trước mốc kiểm tra', 'cấm đổi luật', 'từ tuần ' + SCHOOL_YEAR.tongOnTu, '>= 6/12 lượt ôn', 'cấm cụm mới', 'verifyPacing()'],
  PLAYZONE_SHORT: ['"Dẹp chỗ chơi"', '4 dòng <= 12 từ', '60–90 giây', '20 giây', '1 sải tay', '>= 1,2 m', '"miti-foot"', '0/12 lượt nhấc chân cao', 'đứng một chân', '"Lớp mình chật"', '"miti-space"', '>= 12 nhịp/phút', '>= 60%', '90 độ', 'chốt một lần đầu phiên', '"Em mệt / em đau"', '>= 56px', 'hạ nhiệt 45–60 giây', 'không trừ tim', '"miti-stop"', 'verifyPlayzone()'],
  QUIZ_SHORT: ['đúng BA/12 lượt "Đố bạn"', 'cuối mỗi hiệp', 'tools/data/quiz.mjs', 'mạch kiến thức', 'nguyên văn', 'điền MỘT số/từ', 'chín lượt còn lại', 'ngân hàng đề', '>= 20px', 'tự tắt sau 6 giây', 'không bật microphone', 'không hiện sẵn đáp án', 'một động tác của mã điều khiển', '1 sải tay', 'Thư ký đọc lại', 'đề lệch không trừ tim', 'không cắt chuỗi', '<= 6 từ', 'Em chịu, bạn đáp giúp', '+5 điểm', '"Cả nhóm"', 'miti-best', 'Em đố hôm nay', 'Copy tờ rời', 'verifyQuiz()'],
  FOLK_SHORT: ['trò dân gian dẫn dắt', 'tools/data/folk.mjs', 'tên <= 4 từ', '"Cách chơi"', '>= 18px', 'chant <= 8 tiếng', 'BA lần một phiên', 'vạch nhịp 8 nhịp', 'đồng dao', 'mẫu câu <= 8 từ', 'giọng en-US', 'nhảy lò cò', 'trồng cây chuối', 'bịt mắt bắt dê', 'kéo co dây thật', '1 sải tay', 'tám món FOLK_PROPS', 'alpha <= 0.45', 'đổi vai sau 3 lượt', 'Trò chơi hôm nay', 'không giành góc HUD của tên môn', 'lời đếm cấm gọi là đồng dao', 'cấm đòi cầm vật thật', 'verifyFolk()'],
};
for (const seg of chainSegments) {
  for (const needle of SHORT_PINS[seg.name] || []) {
    if (!seg.text.includes(needle)) bad(`tools/lib/${seg.lib}: chuỗi ${seg.name} không còn nêu "${needle}" — rút gọn chuỗi tự kiểm mất con số thì người dán prompt không còn gì để đối chiếu khi game thiếu quy định.`);
  }
}
// Số mục nghiệm thu cũng là con số của chuỗi: lấy thẳng từ lib, không gõ tay.
for (const seg of chainSegments) {
  if (seg.name !== 'ACCEPT_SHORT') continue;
  if (!seg.text.includes(`${MACHINE_ITEMS.length} mục máy tự kiểm`) || !seg.text.includes(`${HUMAN_CHECKS.length} việc người thử`)) {
    bad(`tools/lib/${seg.lib}: chuỗi ACCEPT_SHORT không còn nêu "${MACHINE_ITEMS.length} mục máy tự kiểm" hoặc "${HUMAN_CHECKS.length} việc người thử" — bảng kiểm thay số mà chuỗi vẫn số cũ.`);
  }
}
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
  for (const [needle, msg] of FULL_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  for (const [needle, msg] of ZONE_RULES) if (!t.includes(needle)) bad(`${g.id}: ${msg}.`);
  // Chuỗi tự kiểm phải mang đủ mọi tầng: thêm lib mới mà quên nối vào dòng này thì người dán
  // prompt không còn cách nào biết game thiếu quy định.
  const chainLine = (t.match(/^- Tự kiểm tra trước khi xuất:.*$/m) || [''])[0];
  if (!chainLine) bad(`${g.id}: phần ĐẦU RA thiếu dòng "Tự kiểm tra trước khi xuất:".`);
  for (const seg of chainSegments) {
    if (CHAIN_SKIP.prompt.includes(seg.name)) continue;
    if (!chainLine.includes(seg.text)) bad(`${g.id}: dòng "Tự kiểm tra trước khi xuất" thiếu đoạn ${seg.name} của tools/lib/${seg.lib}.`);
  }
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

// 2b. Bản sắc riêng: mỗi game phải mang ĐÚNG dữ liệu của chính nó, không mang dữ liệu chung.
// Prompt chỉ cần chứa sáu quy định generic là qua FULL_RULES; check này bắt từng file chứa tên mascot,
// ba mã hex, chữ ký và ba câu thoại của đúng id game — builder gắn nhầm bản sắc của game bên cạnh sẽ bị bắt.
{
  const hexOf = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const rgbDist = (a, b) => Math.round(Math.hypot(...hexOf(a).map((v, i) => v - hexOf(b)[i])));
  const ID_WORDS = (t) => t.replace(/[«»".,?!;:]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const byCluster = new Map();
  for (const g of GAMES) {
    const it = IDENTITIES[g.id];
    if (!it) { bad(`${g.id}: tools/data/identities.mjs chưa có bản sắc.`); continue; }
    (byCluster.get(g.cluster) || byCluster.set(g.cluster, []).get(g.cluster)).push(g);
    if (ID_WORDS(it.mascot) > 2) bad(`${g.id}: mascot "${it.mascot}" dài ${ID_WORDS(it.mascot)} từ, chuẩn là tối đa 2 từ.`);
    if (it.lines.length !== 3) bad(`${g.id}: phải có đúng 3 câu thoại (khen / đỡ sai / hô mở đầu), hiện có ${it.lines.length}.`);
    it.lines.forEach((l, i) => { const w = ID_WORDS(l); if (w > 6) bad(`${g.id}: câu thoại ${i + 1} "${l}" dài ${w} từ, vượt trần 6 từ.`); });
    if (it.palette.length !== 3 || it.palette.some((h) => !/^#[0-9A-Fa-f]{6}$/.test(h))) bad(`${g.id}: bộ ba màu phải là đúng 3 mã #RRGGBB (${it.palette.join(' ')}).`);
    if (!it.signature || !it.prop || !it.tinhCach) bad(`${g.id}: thiếu chữ ký, đạo cụ hoặc tính cách trong bản sắc.`);
    const t = fs.readFileSync(path.join(ROOT, PATH_OF.get(g.id)), 'utf8');
    if (!t.includes('**' + it.mascot + '**')) bad(`${g.id}: prompt không nêu mascot "${it.mascot}" của chính nó.`);
    for (const h of it.palette) if (!t.includes(h)) bad(`${g.id}: prompt thiếu mã màu riêng ${h} của chính nó.`);
    if (!t.includes(it.signature)) bad(`${g.id}: prompt thiếu khoảnh khắc chữ ký của chính nó.`);
    for (const l of it.lines) if (!t.includes('"' + l + '"')) bad(`${g.id}: prompt thiếu câu thoại "${l}" của chính nó.`);
    if (!t.includes('IDENTITY_DATA') || !t.includes('verifyIdentity()')) bad(`${g.id}: prompt chưa yêu cầu IDENTITY_DATA + verifyIdentity().`);
  }
  for (const [id] of Object.entries(IDENTITIES)) if (!GAMES.some((g) => g.id === id)) bad(`identities.mjs có id lạ ${id} không có trong games.mjs.`);
  const seenName = new Map(), seenSig = new Map(), seenLine = new Map(), seenPal = new Map();
  for (const g of GAMES) {
    const it = IDENTITIES[g.id];
    if (!it) continue;
    for (const [map, key, label] of [[seenName, it.mascot, 'tên mascot'], [seenSig, it.signature, 'chữ ký'], [seenPal, it.palette.join(','), 'bộ ba màu']]) {
      if (map.has(key)) bad(`${g.id} và ${map.get(key)} trùng ${label} — 85 game phải khác nhau thật, không phải cùng một game mặc 85 bộ áo.`);
      else map.set(key, g.id);
    }
    for (const l of it.lines) {
      if (seenLine.has(l)) bad(`${g.id} và ${seenLine.get(l)} trùng câu thoại "${l}" — mỗi game ba câu thoại riêng.`);
      else seenLine.set(l, g.id);
    }
  }
  for (const [cl, list] of byCluster) {
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const d = rgbDist(IDENTITIES[list[i].id].palette[0], IDENTITIES[list[j].id].palette[0]);
      if (d < 60) bad(`Cùng cụm ${cl}: ${list[i].id} và ${list[j].id} có --miti-1 chỉ cách ${d}/441 RGB, chuẩn là >= 60 để mở hai game cạnh nhau vẫn nhận ra hai thế giới.`);
    }
  }
}
// 425 biến thể cũng phải mang đủ sáu quy định bản sắc — check "b" ở đầu file dựng sẵn block của TỪNG game
// từ đúng dữ liệu trong identities.mjs, nếu builder đánh mất một dòng thì chỗ này bắt.
{
  const vt = fs.readFileSync(path.join(ROOT, 'prompts', 'VARIANTS_425.md'), 'utf8');
  for (const [key, text] of Object.entries(IDENTITY)) {
    if (!vt.includes(text)) bad(`425 biến thể thiếu quy định bản sắc IDENTITY.${key} của tools/lib/identity.mjs.`);
  }
  if (!vt.includes('- **Bản sắc riêng:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Bản sắc riêng.');
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
  for (const [needle, msg] of FULL_RULES) if (!t.includes(needle)) bad(`${l.id}: ${msg}.`);
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
  if (!vtext.includes('- **Khoảnh khắc ăn mừng:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Khoảnh khắc ăn mừng.');
  if (!vtext.includes('- **Nhạc nền theo nhịp:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Nhạc nền theo nhịp.');
  if (!vtext.includes('- **Vai chờ có vận động:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Vai chờ có vận động — người copy một block biến thể ra dùng không còn biết ba em chưa tới lượt phải làm gì.');
  if (!vtext.includes('- **Tiết học 45 phút + gắng sức:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Tiết học 45 phút + gắng sức — biến thể copy riêng được mà không còn trần thời lượng lẫn thang gắng sức.');
  if (!vtext.includes('- **Chuẩn kiến thức SGK:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Chuẩn kiến thức SGK — biến thể copy riêng được mà không còn nhãn mạch lẫn dòng yêu cầu cần đạt.');
  if (!vtext.includes('- **Chất thể thao:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Chất thể thao — biến thể copy riêng được mà không còn tên môn, đường tiếp sức lẫn động tác duỗi của môn.');
  if (!vtext.includes('- **Gia đình — tờ gửi bố mẹ:**')) bad('Phần Quy ước chung của VARIANTS_425.md thiếu dòng Gia đình — tờ gửi bố mẹ — người copy một block biến thể ra dùng sẽ không còn biết màn tổng kết phải in tờ nào về nhà.');
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
    if (!b.includes('**Ham quay lại:**')) bad(`biến thể #${i + 1}: thiếu dòng Ham quay lại.`);
    for (const needle of ANT_NEEDLES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: thiếu quy tắc chờ đợi "${needle.slice(0, 30)}...".`);
    if (!b.includes('**Nhẹ đầu')) bad(`biến thể #${i + 1}: thiếu dòng Nhẹ đầu.`);
    if (!b.includes('**Khoảnh khắc ăn mừng:**')) bad(`biến thể #${i + 1}: thiếu dòng Khoảnh khắc ăn mừng.`);
    if (!b.includes('**Bản sắc riêng của game:**')) bad(`biến thể #${i + 1}: thiếu dòng Bản sắc riêng của game.`);
    if (!b.includes('**Nhạc nền theo nhịp:**')) bad(`biến thể #${i + 1}: thiếu dòng Nhạc nền theo nhịp.`);
    if (!b.includes('**Vai chờ có vận động:**')) bad(`biến thể #${i + 1}: thiếu dòng Vai chờ có vận động.`);
    if (!b.includes('**Tiết học 45 phút + gắng sức:**')) bad(`biến thể #${i + 1}: thiếu dòng Tiết học 45 phút + gắng sức.`);
    if (!b.includes('**Chuẩn kiến thức SGK:**')) bad(`biến thể #${i + 1}: thiếu dòng Chuẩn kiến thức SGK.`);
    if (!b.includes('**Chất thể thao:**')) bad(`biến thể #${i + 1}: thiếu dòng Chất thể thao.`);
    if (!b.includes('**Gia đình — tờ gửi bố mẹ:**')) bad(`biến thể #${i + 1}: thiếu dòng Gia đình — tờ gửi bố mẹ.`);
    if (!b.includes('**Tuần học:**')) bad(`biến thể #${i + 1}: thiếu dòng Tuần học.`);
    if (!b.includes('**Chỗ chơi an toàn:**')) bad(`biến thể #${i + 1}: thiếu dòng Chỗ chơi an toàn — người copy riêng một block biến thể ra dùng sẽ không còn biết chỗ đứng của em phải dọn thế nào và xin nghỉ bằng nút nào.`);
    if (!b.includes('bản tại chỗ nằm gọn trong vòng 1 sải tay')) bad(`biến thể #${i + 1}: thiếu câu bắt bản tại chỗ của động tác đặc trưng khi bật "Lớp mình chật" — block copy được mà vẫn đòi em lùi ra khỏi vùng đã khai.`);
    // Block biến thể copy riêng được, nên phải mang đúng dữ liệu bản sắc của chính game nó nói tới.
    // split('\n## Prompt ') đã ăn luôn hai chữ "## Prompt", nên dòng đầu block bắt đầu bằng số thứ tự.
    const vid = (b.match(/^\d+ — (\S+) — V\d/) || [])[1];
    const vit = vid && IDENTITIES[vid];
    if (!vit) bad(`biến thể #${i + 1}: không tra được bản sắc game cho block (${vid || 'không đọc được id'}).`);
    else {
      if (!b.includes('**Bản sắc riêng của game này:**')) bad(`biến thể #${i + 1} (${vid}): thiếu dòng dữ liệu bản sắc của chính game.`);
      if (!b.includes('**' + vit.mascot + '**')) bad(`biến thể #${i + 1} (${vid}): thiếu mascot "${vit.mascot}" của chính game.`);
      for (const h of vit.palette) if (!b.includes(h)) bad(`biến thể #${i + 1} (${vid}): thiếu mã màu riêng ${h}.`);
      if (!b.includes(vit.signature)) bad(`biến thể #${i + 1} (${vid}): thiếu khoảnh khắc chữ ký của chính game.`);
      if (!b.includes('IDENTITY_DATA') || !b.includes('verifyIdentity()')) bad(`biến thể #${i + 1} (${vid}): thiếu IDENTITY_DATA + verifyIdentity().`);
    }
    for (const [needle, msg] of FULL_RULES) if (!b.includes(needle)) bad(`biến thể #${i + 1}: ${msg}.`);
    // Block biến thể copy riêng được, nên phải mang đủ dữ liệu chuẩn của đúng game nó nói tới —
    // probe vòng 17: builder thay "Mạch của cụm X là Y" bằng một câu chung chung thì prompt game vẫn còn
    // đủ nhưng 425 block biến thể mất hết mạch, yêu cầu cần đạt và bẫy, mà validate trước đó vẫn xanh.
    const vgame = vid && GAMES.find((g) => g.id === vid);
    const vstd = vgame && STANDARDS[vgame.cluster];
    if (vstd) {
      for (const [needle, label] of capsNeo([
        [`Mạch của cụm ${vgame.cluster} là "${vstd.mach}"`, 'dòng mạch của ĐÚNG cụm — block chỉ liệt kê tám mạch chung chung là không đủ'],
        [vstd.ngan, 'nhãn HUD'], [vstd.yc, 'yêu cầu cần đạt'],
        [vstd.meo, 'mẹo nhớ'], ['"Dễ nhầm: ' + ERROR_NOTES[vgame.cluster].split('; ')[0] + '"', 'bẫy báo trước'],
        // Pair phải nằm trong MỘT mảng nữa: `...([x, y])` ném hai chuỗi vào danh sách, vòng destruct
        // sẽ gắp từng ký tự và kim trở thành vô hình (đây chính là lỗ probe 20g bắt được).
        ...(Array.isArray(vstd.tuan) ? [[`**Tuần ${vstd.tuan[0]}–${vstd.tuan[1]} · Học kì ${hocKiCua(vstd.tuan[0])}**`, 'nhãn tuần của ĐÚNG cụm']] : []),
      ], 'mục neo block biến thể')) {
        if (!b.includes(needle)) bad(`biến thể #${i + 1} (${vid}): thiếu ${label} của cụm ${vgame.cluster} ("${needle.slice(0, 48)}") — builder phải lấy thẳng tools/data/standards.mjs vào từng block.`);
      }
    }
    // Block biến thể copy riêng được nên còn phải mang đúng MÔN của chính kiểu điều khiển nó dùng:
    // V1–V4 có mã điều khiển riêng, V5 không có nên mượn môn của game. Bảng đối chiếu dưới là bản sao
    // có chủ đích của VARIANTS trong build-variants.mjs — đổi kiểu điều khiển cho một biến thể mà quên
    // sửa đây thì block vẫn còn đủ chữ "chất thể thao" nhưng sai tên môn, và chính check này bắt.
    const vm = b.match(/^\d+ — (\S+) — (V\d)/);
    const vcode = vm && vm[2];
    const vGesture = { V1: 'POINT', V2: 'SWIPE', V3: 'DRAG', V4: 'VOICE', V5: null }[vcode];
    const vsp = vgame && SPORTS[vGesture || (vgame.gestures || [])[0]];
    if (!vcode || !vsp) {
      bad(`biến thể #${i + 1} (${vid || 'không đọc được id'}): không tra được môn thể thao cho kiểu điều khiển ${vcode || 'lệch nhãn'} — bảng VARIANTS của builder và validate đã lệch nhau.`);
    } else {
      for (const [needle, label] of [
        [`Môn của block ${vcode} này là "${vsp.mon}"`, 'tên môn của ĐÚNG kiểu điều khiển — block liệt kê quy định thể thao chung chung là không đủ'],
        [`(mã điều khiển ${vGesture || (vgame.gestures || [])[0]}, không tự đổi môn trong một phiên)`, 'mã điều khiển mà môn này gắn theo'],
        [`động tác đặc trưng "${vsp.dongTac}"`, 'động tác đặc trưng của môn'],
        [`hiệu lệnh mở đầu "${vsp.hieuLenh}"`, 'hiệu lệnh của môn'],
        [`lời hay khi bạn sai "${vsp.loiHay}"`, 'lời hay của môn khi bạn sai'],
        [`động tác duỗi cơ cuối buổi "${vsp.duoiCo}"`, 'động tác duỗi cơ riêng của môn'],
      ]) {
        if (!b.includes(needle)) bad(`biến thể #${i + 1} (${vid}): thiếu ${label} của môn "${vsp.mon}" ("${needle.slice(0, 48)}") — builder phải lấy thẳng tools/data/sports.mjs vào từng block.`);
      }
    }
    // Bốn dòng "Gửi bố mẹ" của block này phải là dữ liệu THẬT của đúng game + đúng kiểu điều khiển.
    // Probe vòng 19: một block chỉ ghi "<môn>" chung chung vẫn xanh nếu sáu quy định generic còn nguyên,
    // nên neo từng dòng kèm dữ liệu — builder đánh mất một dòng là 425 block cùng đỏ.
    if (vsp && vstd) {
      for (const [needle, label] of [
        [`Bốn dòng "Gửi bố mẹ" của block ${vcode} này:`, 'dòng dữ liệu gia đình của ĐÚNG kiểu điều khiển'],
        [`"Hôm nay con tập môn ${vsp.mon} — <n> động tác"`, 'dòng 1 mang tên môn của block này'],
        [`"Con học ${vstd.ngan}, <k> câu đúng trên <tổng>"`, 'dòng 2 mang nhãn mạch của cụm này'],
        [`"Mẹo con mang về: ${vstd.meo}"`, 'dòng 3 mang mẹo nguyên văn của cụm này'],
        [`"Việc 3 phút ở nhà: cả nhà cùng ${vsp.dongTac} rồi hỏi nhau miệng một đề vừa chơi"`, 'dòng 4 mang động tác đặc trưng của môn này'],
      ]) {
        if (!b.includes(needle)) bad(`biến thể #${i + 1} (${vid}): thiếu ${label} ("${needle.slice(0, 48)}") — builder phải nối tools/data/sports.mjs và tools/data/standards.mjs vào đúng block.`);
      }
    }
    // Trò dẫn dắt cũng là dữ liệu theo KIỂU ĐIỀU KHIỂN: block copy riêng được thì phải mang đúng trò
    // của chính nó chứ không phải danh sách mười bốn trò — V1–V4 có mã riêng, V5 mượn mã đầu của game.
    const vfk = vgame && FOLK_BANK[vGesture || (vgame.gestures || [])[0]];
    const vq = vstd ? quizFrames(vstd.mach) : null;
    if (!vfk || !vsp) {
      bad(`biến thể #${i + 1} (${vid || 'không đọc được id'}): không tra được trò dân gian cho kiểu điều khiển ${vcode || 'lệch nhãn'} — bảng folk của builder và validate đã lệch nhau.`);
    } else {
      for (const [needle, label] of [
        ['**Sân chơi Việt Nam:**', 'dòng khối sân chơi Việt Nam — người copy riêng một block sẽ không còn biết game phải mang trò dân gian nào'],
        [`Trò dân gian dẫn dắt của block ${vcode} này là **${vfk.tro}**`, 'tên trò của ĐÚNG kiểu điều khiển — block liệt kê quy định sân chơi chung chung là không đủ'],
        [`cách chơi "${vfk.loiCho}"`, 'dòng cách chơi của trò'],
        [`lời hô theo nhịp "${vfk.chant}" (\`${vfk.loai}\``, 'chant kèm nhãn loại lời hô'],
        [`đồ dùng AR "${vfk.doDung}"`, 'đồ dùng sân trường của trò'],
        [`trò ${vfk.dieu};`, 'loại động hay tĩnh của trò'],
        [`tên trò không chiếm góc HUD của môn "${vsp.mon}"`, 'trò dân gian không giành góc HUD của tên môn'],
        [`năm trò đã loại (${FOLK_BANNED.map((x) => x.tro.toLowerCase()).join(', ')})`, 'năm trò bị loại nêu đích danh ngay trong block'],
      ]) {
        if (!b.includes(needle)) bad(`biến thể #${i + 1} (${vid}): thiếu ${label} của trò ${vfk.tro} ("${needle.slice(0, 48)}") — builder phải lấy thẳng tools/data/folk.mjs vào từng block.`);
      }
    }
    if (vstd && vsp && vq) {
      for (const [needle, label] of [
        ['**Đố bạn — em đặt đề cho bạn đáp:**', 'dòng khối đố bạn — người copy riêng một block sẽ không biết lượt đố lấy mẫu câu ở đâu'],
        [`Ba mẫu câu "Đố bạn" của block ${vcode} này (mạch "${vstd.mach}"`, 'mạch kiến thức đi kèm ba mẫu câu của block này'],
        [`"${vq[0]}" · "${vq[1]}" · "${vq[2]}"`, 'ba mẫu câu nguyên văn của ĐÚNG mạch này'],
        [`bạn đáp bằng động tác "${vsp.dongTac}"`, 'động tác đặc trưng của môn block này'],
      ]) {
        if (!b.includes(needle)) bad(`biến thể #${i + 1} (${vid}): thiếu ${label} ("${needle.slice(0, 48)}") — builder phải lấy thẳng tools/data/quiz.mjs vào đúng block.`);
      }
    }
    // Chuỗi tự kiểm của biến thể cũng phải mang đủ mọi tầng, cùng registry như prompt.
    const vChain = (b.match(/^\*\*Xuất file:\*\*.*$/m) || [''])[0];
    if (!vChain) bad(`biến thể #${i + 1}: thiếu dòng "**Xuất file:**" chứa chuỗi tự kiểm.`);
    for (const seg of chainSegments) {
      if (CHAIN_SKIP.variant.includes(seg.name)) continue;
      if (!vChain.includes(seg.text)) bad(`biến thể #${i + 1}: chuỗi tự kiểm thiếu đoạn ${seg.name} của tools/lib/${seg.lib}.`);
    }
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
// Ba con số quyết định của tầng nhẹ đầu phải hiện ra trong mọi tài liệu hướng dẫn. Probe vòng 11:
// tài liệu bị sửa lại thành hợp đồng điểm cũ thì validate vẫn xanh, vì bộ kiểm chỉ đếm số mục bảng
// kiểm — mà tài liệu mới là thứ người viết prompt làm theo khi sinh game.
const LIGHT_DOC_NEEDLES = [
  ['>= 60%', 'tỉ lệ đề nhìn tối thiểu'],
  ['16 từ', 'trần số từ của đề'],
  ['dang', 'khóa dang:"nhin"/"tinh" trong QUESTION_DATA'],
];
// +6 động tác và +3 đáp án phải đọc được trên cùng một dòng: hai con số rời rạc không đủ để người
// viết prompt hiểu động tác mới là phần thưởng chính.
const LIGHT_DOC_REGEX = [
  [/\+6[^\n]{0,220}\+3/, 'điểm một lượt tách +6 động tác / +3 đáp án'],
];
// Tài liệu phải giữ cả hợp đồng âm thanh + pháo giấy, vì hai thứ này nằm ngoài "cảm giác arcade" và
// người viết prompt chỉ đọc tài liệu. Probe vòng 12: xóa "200 ms" khỏi template thì file sinh ra vẫn
// có tiếng dài cả giây mà không check nào báo — AudioContext và SFX là hai lỗi gặp ngay phút đầu.
const CELEBRATE_DOC_NEEDLES = [
  ['200 ms', 'trần độ dài một SFX'],
  ['0.25', 'trần master gain'],
  ['40–60 hạt', 'số hạt pháo giấy một đợt'],
  ['0,45×', 'tốc độ thẻ khi slow-mo'],
  ['navigator.vibrate', 'rung có kiểm soát trên điện thoại'],
  ['3 – 2 – 1 – CHỐT', '4 giây cả lớp hô cùng trước hiệp 3'],
];
// Tầng bản sắc chỉ có tác dụng khi tài liệu hướng dẫn nói rõ con số: tên <= 2 từ, ba mã màu riêng,
// một chữ ký 1 lần/phiên, khoảng cách RGB. Probe vòng 13: xóa "60/441" khỏi master thì validate vẫn xanh
// vì sáu quy định generic vẫn còn ở 85 prompt — mà người sửa master mới là người quyết định thresholds.
const IDENTITY_DOC_NEEDLES = [
  ['--miti-1', 'bảng màu riêng ba mã hex của game'],
  ['60/441', 'khoảng cách màu tối thiểu giữa hai game cùng cụm'],
  ['verifyIdentity()', 'hàm kiểm bản sắc lúc nạp'],
  ['khoảnh khắc chữ ký', 'một cao trào riêng của mỗi game'],
  ['2 từ', 'trần độ dài tên mascot'],
  ['6 từ', 'trần độ dài một câu thoại'],
];
// Vòng 14: nhạc nền chỉ là quy định khi tài liệu nêu được BPM và gain. Probe cùng kiểu vòng 13 — xóa
// "0.18" khỏi master thì 85 prompt vẫn mang nguyên văn quy định trong lib nên vẫn xanh, mà người sửa
// master mới là người quyết định các ngưỡng này cho các vòng sau.
// Probe vòng 14c còn chỉ ra một lỗ nữa: ĐẾM TỒN TẠI không đủ. Xóa "100–116 BPM" khỏi §8.6 của template
// thì hai chỗ khác vẫn còn số đó nên build vẫn xanh, dù chính §8.6 là nơi định nghĩa luật. Vì vậy mỗi
// con số ở hai tài liệu chuẩn (master, template) phải còn ĐÚNG SỐ LẦN NÊU hiện tại; hai README là tài
// liệu kể chuyện nên chỉ cần nêu một lần. Thêm chỗ nêu là vô hại; xóa một chỗ nêu thì phải sửa bảng này
// kèm lý do, đúng kiểu "số nghiệm thu đổi thì tài liệu đổi cùng" mà các vòng trước đã áp dụng.
// [needle, label, master, template, README, prompts/README]
const RHYTHM_DOC_NEEDLES = [
  ['100–116 BPM', 'tempo nhạc nền hiệp 1–2', 2, 3, 1, 1],
  ['128 BPM', 'trần BPM của nhịp nhạc', 2, 3, 1, 1],
  ['0.18', 'trần gain bus nhạc nền', 6, 5, 1, 1],
  ['30% gain', 'mức nhạc nhường lời đọc đề', 2, 3, 1, 1],
  ['verifyMusic()', 'hàm kiểm nhạc nền lúc nạp', 3, 4, 1, 1],
  ['vạch nhịp', 'nhịp nhìn được khi tắt tiếng', 5, 5, 1, 1],
];
// Ngân sách giọng 4 + 3 <= 7 phải đọc được nguyên vẹn ở §8.4 (nơi đặt luật) lẫn bảng kiểm. Probe vòng
// 14c: thu §8.4 về "tối đa 4 giọng đồng thời" thì mỗi con số vẫn còn ở mục khác nên lọt.
const VOICE_DOC_NEEDLES = [
  ['4 giọng SFX', 'trần giọng SFX đồng thời', 4, 4, 1, 1],
  ['3 giọng', 'trần giọng nhạc nền trên bus riêng', 4, 4, 1, 1],
  ['7 giọng', 'tổng trần mọi giọng đang phát', 3, 4, 1, 1],
];
// Tầng vai chờ (vòng 15): sáu con số phân biệt "một máy một em chơi, ba em đứng xem" với "bốn em đều vận động".
// Probe vòng 15: xóa trọn mục 7.2 của master hoặc block VAI CHỜ của template thì mỗi số vẫn còn ở mục khác,
// nên bảng này neo ĐÚNG số lần nêu hiện có — tài liệu có thể thêm chỗ nêu, nhưng xóa một chỗ thì phải sửa bảng kèm lý do.
const QUEUE_DOC_NEEDLES = [
  ['8 nhịp', 'số nhịp cổ vũ mỗi lần', 10, 10, 9, 3],
  ['3 lượt', 'số lượt mỗi em trong 12 lượt', 12, 8, 6, 2],
  ['20 giây', 'trần đứng chờ và vào vị trí', 5, 7, 4, 2],
  ['1 sải tay', 'vòng đứng của mỗi em', 2, 3, 2, 1],
  ['1,2 m', 'máy cách em đang chơi', 2, 3, 2, 1],
  ['+5 điểm', 'điểm vai chờ vào "Cả nhóm"', 6, 7, 3, 1],
  ['verifyQueue()', 'hàm kiểm vai chờ lúc nạp', 4, 4, 4, 2],
  ['Lượt của em', 'bộ đếm lượt trên HUD', 4, 4, 2, 1],
  ['vào vị trí', '20 giây vào vị trí khi đổi người', 2, 3, 1, 1],
  ['giây 15', 'lúc mascot gọi tên em đang chờ', 4, 4, 4, 2],
  ['bốn điều', 'số điều verifyQueue() kiểm', 6, 3, 3, 3],
];
// Tầng tiết học (vòng 16): thời lượng và độ mệt là hai con số nối một phiên game với một tiết thể dục thật.
// Cùng nguyên tắc với bảng trên — neo ĐÚNG số lần nêu hiện có ở bốn tài liệu, thêm chỗ nêu thì vô hại,
// xóa một chỗ (kể cả xóa trọn mục 4.6 của master hay block TIẾT HỌC của template) là build đỏ.
const LESSON_DOC_NEEDLES = [
  ['8–10 phút', 'trần thời lượng một phiên', 1, 2, 3, 2],
  ['phút thứ 10', 'điểm phiên tự khép', 3, 4, 5, 2],
  ['20px', 'chữ đồng hồ phiên tối thiểu', 3, 3, 1, 1],
  ['RANH GIỚI lượt', 'phiên không cắt giữa lượt đang chơi', 3, 1, 2, 1],
  ['Kế hoạch tiết 45 phút', 'dòng kế hoạch in từ số thật', 4, 4, 5, 3],
  ['Kết phiên', 'nút giáo viên bấm bất cứ lúc nào', 2, 3, 2, 1],
  ['dễ quá', 'mức đầu của thang gắng sức', 5, 4, 4, 1],
  ['56px', 'kích thước nút gắng sức', 2, 3, 2, 1],
  ['miti-effort', 'nơi lưu gắng sức theo hiệp', 4, 5, 4, 1],
  ['hồi nhịp', '15 giây giữa các hiệp', 5, 6, 6, 2],
  ['4 nhịp', 'hít vào 4 nhịp – thở ra 6 nhịp', 3, 3, 2, 1],
  ['Bản tiết học', 'khối bằng chứng cho giáo viên', 3, 5, 4, 1],
  ['bốn dòng', 'số dòng của Bản tiết học', 4, 5, 5, 1],
  ['chưa ghi được', 'dòng thiếu dữ liệu thật, không bịa số', 2, 1, 1, 1],
  ['verifyLesson()', 'hàm kiểm tiết học lúc nạp', 3, 4, 4, 2],
  // Câu kể chuyện ở README ("verifyLesson() là mục máy tự kiểm thứ 35") là chỗ duy nhất nói người đọc
  // mục nào trong bảng kiểmứng với tầng này — probe vòng 16: viết lại thành "mục cuối bảng" vẫn xanh.
  ['máy tự kiểm thứ 35', 'số mục của verifyLesson() trong bảng kiểm', 0, 0, 1, 0],
];
// Tầng chuẩn kiến thức SGK (vòng 17): tám mạch + yêu cầu cần đạt + bẫy báo trước + mẹo nhớ là bốn con số
// nối một câu hỏi trong game với đúng một dòng trong Chương trình GDPT 2018.
// Cùng nguyên tắc với hai bảng trên — neo ĐÚNG số lần nêu hiện có ở bốn tài liệu: thêm chỗ nêu thì vô hại,
// xóa một chỗ (kể cả xóa trọn mục 4.7 của master hay block CHUẨN KIẾN THỨC của template) là build đỏ.
const CURRICULUM_DOC_NEEDLES = [
  ['tám mạch', 'tổng số mạch kiến thức — neo cả mệnh đề cấm mạch thứ chín', 2, 3, 4, 1],
  ['Yêu cầu cần đạt', 'dòng chuẩn in ở hai màn', 5, 5, 4, 2],
  ['NGUYÊN VĂN', 'cấm viết lại dòng yêu cầu cần đạt', 4, 3, 2, 1],
  ['<= 18 ký tự', 'trần dài nhãn mạch trên HUD', 3, 4, 4, 1],
  ['18px', 'cỡ chữ nhãn mạch tối thiểu', 3, 3, 2, 1],
  ['9/12', 'trần số lượt mà một mạch được chiếm', 4, 5, 4, 1],
  ['3 lượt thuộc mạch khác', 'số lượt xen mạch tối thiểu', 2, 4, 2, 1],
  ['Dễ nhầm', 'bẫy báo trước ở câu đầu tiên của cụm', 5, 6, 4, 2],
  ['Mẹo nhớ', 'mẹo nhớ kèm động tác', 3, 5, 3, 1],
  ['<= 12 từ', 'trần dài mẹo nhớ', 3, 5, 3, 1],
  ['động tác 3 giây', 'mẹo nhớ phải gắn một động tác', 4, 5, 3, 1],
  ['verifyStandard()', 'hàm kiểm chuẩn kiến thức lúc nạp', 3, 4, 3, 3],
  ['máy tự kiểm thứ 36', 'số mục của verifyStandard() trong bảng kiểm', 0, 0, 1, 0],
  ['Sáu quy định "chuẩn kiến thức SGK"', 'heading mục kể chuyện tầng 17 ở README', 0, 0, 1, 0],
  ['Tầng "chuẩn kiến thức SGK"', 'heading mục kể chuyện tầng 17 ở prompts/README', 0, 0, 0, 1],
  ['người thử số 27', 'việc người thử tương ứng ở prompts/README', 0, 0, 0, 1],
  ['việc người thử thứ 27', 'việc người thử tương ứng ở README', 0, 0, 1, 0],
];
// Tầng chất thể thao (vòng 18): tên môn, liều động tác của môn, nghi thức chơi đẹp, thành tích cả đội
// và động tác duỗi của môn là năm con số nối "một cú vung tay chọn đáp án" với một giờ thể dục có tên.
// Cùng nguyên tắc ba bảng trên — neo ĐÚNG số lần nêu hiện có ở bốn tài liệu.
const SPORT_DOC_NEEDLES = [
  ['môn thể thao', 'tên môn thật thay cho mô tả động tác chung', 6, 5, 4, 3],
  ['<= 4 từ', 'trần độ dài tên môn trên HUD', 6, 8, 5, 2],
  ['Hôm nay ta tập môn', 'dòng tên môn ở màn khởi động', 2, 2, 1, 1],
  ['Môn thi đấu hôm nay', 'dòng tên môn ở màn tổng kết', 2, 2, 1, 1],
  ['<= 6 từ', 'trần độ dài động tác đặc trưng', 9, 12, 6, 3],
  ['hiệu lệnh', 'khẩu lệnh của mascot trước lượt đầu', 4, 5, 3, 1],
  ['tiếp sức', '12 lượt là một đường tiếp sức', 2, 4, 2, 1],
  // Heading 4.8 của master viết hoa toàn bộ nên kim thường ở dòng trên không với tới: xóa "ĐƯỜNG TIẾP
  // SỨC" khỏi heading (probe 18f) vẫn xanh vì các vế còn lại giữ nguyên số "tiếp sức" lowercase.
  ['ĐƯỜNG TIẾP SỨC', 'heading 4.8 gọi 12 lượt là một đường tiếp sức', 1, 0, 0, 0],
  ['Không sao, chạy tiếp', 'dòng duy nhất khi rơi gậy, không trừ tim', 2, 2, 1, 1],
  ['chạm khuỷu', 'nghi thức trước hiệp 1', 4, 4, 2, 2],
  ['chế bai', 'lệnh cấm mọi dòng mỉa bạn sai', 3, 3, 2, 1],
  ['Tinh thần thể thao', 'dòng tổng kết đếm lời hay', 1, 1, 2, 2],
  ['ba mốc', 'Vàng/Bạc/Đồng cho cả đội', 4, 5, 3, 1],
  ['miti-sport', 'nơi lưu huy chương của đội', 3, 4, 2, 1],
  ['xếp hạng cá nhân', 'lệnh cấm so hạng giữa các em', 3, 3, 2, 2],
  ['duỗi', 'động tác duỗi riêng của môn trong hạ nhiệt', 18, 12, 12, 7],
  ['Cơ em đang duỗi', 'HUD hồi tĩnh nêu tên cơ', 2, 2, 1, 1],
  ['verifySport()', 'hàm kiểm chất thể thao lúc nạp', 3, 4, 3, 3],
  // Nhãn khối là chỗ duy nhất nói với người viết prompt rằng bảy quy định dưới nó là MỘT tầng có tên.
  // Probe vòng 18f: đổi "- CHẤT THỂ THAO (nguồn:" thành "- (nguồn:" ở template vẫn xanh vì cả bảy quy
  // định còn nguyên — khối luật không tên thì tài liệu chỉ còn là một đoạn văn dài.
  ['- CHẤT THỂ THAO (nguồn:', 'nhãn khối chất thể thao trong template', 0, 1, 0, 0],
  ['máy tự kiểm thứ 37', 'số mục của verifySport() trong bảng kiểm', 0, 0, 1, 0],
  ['Sáu quy định "chất thể thao"', 'heading mục kể chuyện tầng 18 ở README', 0, 0, 1, 0],
  ['Tầng "chất thể thao"', 'heading mục kể chuyện tầng 18 ở prompts/README', 0, 0, 0, 1],
  ['người thử số 28', 'việc người thử tương ứng ở prompts/README', 0, 0, 0, 1],
  ['việc người thử thứ 28', 'việc người thử tương ứng ở README', 0, 0, 1, 0],
];
// Tầng gia đình (vòng 19) là tầng đầu tiên có người đọc KHÔNG ở trong lớp, nên tài liệu chuẩn phải giữ
// đủ cả bốn nơi: master cho luật, template cho người viết prompt điền theo, hai README cho lý do.
// Counts đo từ tài liệu thật rồi hạ một bậc làm sàn — xóa cả một mục kể chuyện ở README thì kim dưới
// với tới, xóa đúng chỗ đó.
const FAMILY_DOC_NEEDLES = [
  ['Gửi bố mẹ', 'khối chữ bốn dòng đưa về nhà', 2, 4, 2, 1],
  ['bốn dòng', 'số dòng của khối "Gửi bố mẹ"', 6, 8, 7, 3],
  ['<= 20 từ', 'trần số từ mỗi dòng gửi về nhà', 2, 3, 1, 1],
  ['Copy tờ rời', 'khối chữ mà nút copy lấy được tờ gửi về', 12, 12, 6, 5],
  ['3 phút', 'thời lượng một việc cả nhà làm cùng nhau', 5, 7, 6, 4],
  ['dongTac', 'động tác của môn trong việc 3 phút ở nhà', 4, 5, 4, 2],
  ['<= 16 từ', 'trần số từ của đề hỏi nhau miệng ở nhà (mượn light.mjs)', 5, 10, 5, 3],
  ['chưa ghi được', 'dòng in khi thiếu số thật của phiên', 4, 4, 2, 2],
  ['cấm bịa', 'lệnh cấm bịa số trên tờ gửi về', 2, 2, 1, 1],
  ['<= 12 từ', 'trần số từ của "Mẹo con mang về" (mượn curriculum.mjs)', 4, 7, 4, 2],
  ['động tác 3 giây', 'động tác bố mẹ làm cùng con ở nhà', 5, 6, 5, 2],
  ['xếp hạng', 'lệnh cấm xếp hạng con trên tờ gửi về', 12, 8, 6, 4],
  ['đe dọa', 'lệnh cấm giọng đe dọa ở tờ gửi về', 3, 5, 4, 2],
  ['bài tập về nhà', 'lệnh cấm biến game thành bài tập về nhà', 2, 1, 1, 2],
  ['chụp ảnh', 'cấm đòi bố mẹ chụp ảnh gửi lại', 1, 1, 1, 1],
  ['mua đồ', 'cấm đòi mua thêm đồ dùng', 1, 1, 1, 1],
  ['Nhà mình làm cùng nhau', 'một trong hai dòng kết của khối', 1, 1, 1, 1],
  ['Khi nào con muốn chơi lại', 'dòng kết còn lại, chỉ được in một trong hai', 1, 1, 1, 1],
  ['verifyFamily()', 'hàm kiểm tầng gia đình lúc nạp', 2, 4, 2, 2],
  ['Việc 3 phút ở nhà', 'dòng thứ tư của khối "Gửi bố mẹ"', 2, 4, 1, 0],
  // Probe 19f: xóa riêng dòng nhãn bullet đầu §4.9 ở master vẫn xanh vì cả bốn dòng mô tả bên dưới còn
  // nguyên — tài liệu mất tên của quy định mà không mất chữ nào. Neo đúng nhãn in hoa của bullet.
  ['ĐÚNG MỘT KHỐI "GỬI BỐ MẸ"', 'nhãn bullet đầu của §4.9 ở master', 1, 0, 0, 0],
  ['hỏi nhau MIỆNG', 'việc 3 phút hỏi nhau bằng miệng, không viết', 1, 1, 0, 0],
  ['ĐÚNG MỘT khối', 'lệnh đúng một khối "Gửi bố mẹ" mỗi phiên', 1, 2, 0, 0],
  ['ghi vở', 'cấm biến tờ gửi về thành bài tập ghi vở', 2, 2, 1, 1],
  ['screensaver', 'cấm trang riêng, tờ gửi về phải nằm trong khối copy được', 1, 1, 1, 0],
  ['- GIA ĐÌNH (nguồn:', 'nhãn khối gia đình trong template', 0, 1, 0, 0],
  ['máy tự kiểm thứ 38', 'số mục của verifyFamily() trong bảng kiểm', 0, 0, 1, 0],
  ['Sáu quy định "gia đình"', 'heading mục kể chuyện tầng 19 ở README', 0, 0, 1, 0],
  ['Tầng "gia đình"', 'heading mục kể chuyện tầng 19 ở prompts/README', 0, 0, 0, 1],
  ['người thử số 29', 'việc người thử tương ứng ở prompts/README', 0, 0, 0, 1],
  ['việc người thử thứ 29', 'việc người thử tương ứng ở README', 0, 0, 1, 0],
  ['phụ huynh', 'khảo sát 0/85 mở đầu tầng gia đình', 1, 0, 1, 1],
];
// Tầng tuần học (vòng 20) mượn toàn bộ con số từ dữ liệu, nên tài liệu chuẩn phải giữ đủ cả nhãn tuần
// lẫn dòng "cô xác nhận" — thiếu một trong hai thì người đọc tài liệu không biết khoảng tuần là giả định
// hay là thời khóa biểu. Counts đo từ tài liệu thật rồi hạ một bậc làm sàn.
const PACE_DOC_NEEDLES = [
  ['NHÃN TUẦN Ở HAI MÀN', 'nhãn bullet đầu của §4.10 ở master', 1, 0, 0, 0],
  ['HỎI TUẦN ĐÚNG MỘT CÂU', 'nhãn bullet câu hỏi tuần ở master', 1, 0, 0, 0],
  ['ĐÃ QUA TUẦN', 'nhãn bullet >= 3/12 lượt ôn theo tuần ở master', 1, 0, 0, 0],
  ['NƯỚC RÚT CHỈ ĐỔI THỨ TỰ', 'nhãn bullet hai tuần nước rút ở master', 1, 0, 0, 0],
  ['TỪ TUẦN 33 LÀ TỔNG ÔN', 'nhãn bullet chế độ tổng ôn ở master', 1, 0, 0, 0],
  ['TỰ KIỂM BẰNG `verifyPacing()`', 'nhãn bullet hàm tự kiểm ở master', 1, 0, 0, 0],
  ['Học kì', 'nhãn Học kì đi kèm khoảng tuần', 4, 4, 3, 3],
  ['verifyPacing()', 'hàm kiểm tầng tuần học lúc nạp', 2, 3, 3, 2],
  ['miti-week', 'nơi lưu tuần của lớp', 3, 4, 2, 1],
  ['>= 3/12 lượt', 'số lượt ôn theo tuần đã qua', 2, 6, 2, 2],
  ['>= 6/12 lượt', 'số lượt ở chế độ tổng ôn', 1, 2, 1, 1],
  ['nước rút', 'vùng hai tuần trước mốc kiểm tra', 2, 2, 3, 2],
  ['tổng ôn', 'chế độ từ tuần 33', 2, 3, 2, 1],
  ['phân phối chung', 'dòng nói rõ khoảng tuần là phân phối chung, không phải lịch trường', 1, 1, 0, 1],
  ['cô xác nhận tuần của lớp em', 'cô giáo mới là người chốt tuần thật của lớp', 0, 1, 0, 1],
  ['>= 18px', 'cỡ chữ tối thiểu của nhãn tuần', 5, 6, 4, 2],
  ['10 tuần', 'trần bề rộng một khoảng tuần', 1, 3, 1, 1],
  ['1–35', 'độ dài năm học mà hàng nút tuần phủ hết', 2, 3, 1, 1],
  ['chặn nút', 'lệnh cấm biến câu hỏi tuần thành rào cản', 3, 5, 2, 1],
  ['errorTag yếu nhất', 'nguồn xếp thứ tự hai lượt đầu ở vùng nước rút', 1, 1, 1, 1],
  ['không đổi luật', 'nước rút và tổng ôn chỉ đổi thứ tự câu', 4, 3, 2, 2],
  ['thời khóa biểu', 'lời nhắc đối chiếu nhãn tuần với lịch thật của lớp', 1, 0, 1, 1],
  ['cột `tuan`', 'bảng chuẩn là nguồn duy nhất của khoảng tuần', 2, 4, 2, 2],
  ['SCHOOL_YEAR', 'năm học + mốc kiểm tra mà tầng này neo vào', 3, 2, 1, 1],
  ['<= 14 từ', 'trần độ dài dòng "theo phân phối chung"', 1, 1, 0, 1],
  ['đánh đố trước chương trình', 'lệnh cấm lấy cụm chưa học làm đề mới', 1, 0, 1, 1],
  ['em ôn lại', 'dòng tổng kết đếm cụm đã qua tuần', 1, 1, 1, 1],
  ['Còn <n> tuần tới kiểm tra', 'nhãn nước rút trên HUD', 1, 1, 0, 0],
  ['hôm nay tuần 13', 'câu hỏi của một giáo viên cầm 85 thẻ', 1, 0, 0, 1],
  ['- TUẦN HỌC (nguồn:', 'nhãn khối tuần học trong template', 0, 1, 0, 0],
  ['Phần tuần học đã điền đủ', 'dòng checklist tuần học trong template', 0, 1, 0, 0],
  ['máy tự kiểm thứ 39', 'số mục của verifyPacing() trong bảng kiểm', 0, 0, 1, 0],
  ['57 khoảng tuần', 'validate đối chiếu dữ liệu chứ không chỉ so chữ', 0, 0, 1, 0],
  ['Sáu quy định "tuần học"', 'heading mục kể chuyện tầng 20 ở README', 0, 0, 1, 0],
  ['Tầng "tuần học"', 'heading mục kể chuyện tầng 20 ở prompts/README', 0, 0, 0, 1],
  ['người thử số 30', 'việc người thử tương ứng ở prompts/README', 0, 0, 0, 1],
  ['việc người thử thứ 30', 'việc người thử tương ứng ở README', 0, 0, 1, 0],
  ['35 tuần', 'độ dài năm học nêu trong tài liệu', 0, 0, 1, 1],
];
// Vòng 21: tầng "chỗ chơi an toàn". Các mốc dưới ĐO TỪ tài liệu thật rồi hạ một bậc làm sàn, giống
// cách PACE_DOC_NEEDLES làm ở vòng 20. Lý do phải có sàn: sáu quy định này sống ở ba chỗ khác nhau
// (master §4.11, template, hai README) và một lần sửa tay ở chỗ nào cũng làm tầng đó biến mất khỏi
// chỗ đó mà build vẫn xanh — đúng kiểu hỏng mà vòng 10 (hype.mjs) và vòng 20 đã bị.
const PLAYZONE_DOC_NEEDLES = [
  ['THẺ DẸP CHỖ CHƠI NẰM TRONG KHỞI ĐỘNG', 'nhãn bullet thẻ dẹp chỗ chơi ở master', 1, 0, 0, 0],
  ['HÀNG BA LỰA CHỌN GIÀY DÉP', 'nhãn bullet hàng ba lựa chọn giày dép ở master', 1, 0, 0, 0],
  ['NÚT "LỚP MÌNH CHẬT"', 'nhãn bullet nút lớp chật + trần 90 độ ở master', 1, 0, 0, 0],
  ['BỘ ĐỘNG TÁC CHỐT MỘT LẦN ĐẦU PHIÊN', 'nhãn bullet lọc động tác một lần ở master', 1, 0, 0, 0],
  ['NÚT EM MỆT / EM ĐAU', 'nhãn bullet quyền nghỉ ở master', 1, 0, 0, 0],
  ['TỰ KIỂM BẰNG `verifyPlayzone()`', 'nhãn bullet hàm tự kiểm ở master', 1, 0, 0, 0],
  ['[40] verifyPlayzone()', 'mục 40 của bảng kiểm máy tự kiểm trong master', 1, 0, 0, 0],
  ['Dẹp chỗ chơi', 'tên thẻ dẹp chỗ chơi', 3, 5, 2, 1],
  ['1 sải tay', 'đơn vị khoảng cách chuẩn của cả thư viện từ vòng 21', 6, 9, 8, 6],
  ['>= 1,2 m', 'trần khoảng cách giữa máy và em đang chơi', 3, 5, 4, 3],
  ['miti-foot', 'nơi lưu lựa chọn giày dép', 2, 4, 3, 1],
  ['miti-space', 'nơi lưu nút "Lớp mình chật"', 2, 4, 3, 1],
  ['miti-stop', 'nơi lưu bằng chứng em xin nghỉ', 2, 4, 3, 1],
  ['verifyPlayzone()', 'hàm kiểm tầng chỗ chơi lúc nạp', 1, 3, 3, 1],
  ['>= 56px', 'cỡ nút tối thiểu của "Chỗ chơi ổn rồi" và "Em mệt / em đau"', 5, 8, 6, 3],
  ['90 độ', 'hình quạt không gian mà vật thể AR được phép chiếm', 4, 4, 2, 2],
  ['chân đất / dép lê', 'lựa chọn giày dép kích hoạt bản tại chỗ', 3, 4, 4, 1],
  ['đứng một chân', 'nhóm động tác bị cấm vĩnh viễn khi đi dép lê', 2, 4, 2, 1],
  ['nhấc chân cao', 'nhóm động tác đổi thành 0/12 lượt khi đi dép lê', 3, 4, 3, 1],
  ['60–90 giây', 'khởi động — nơi thẻ dẹp chỗ chơi phải nằm trong đó', 3, 6, 4, 2],
  ['hạ nhiệt 45–60 giây', 'nút xin nghỉ đưa thẳng vào hạ nhiệt', 4, 8, 3, 2],
  ['tối đa 20 giây', 'trần thời lượng của thẻ dẹp chỗ chơi', 2, 4, 2, 1],
  ['vùng vung tay', 'vùng em thật sự va phải nếu chưa dọn', 1, 1, 1, 1],
  ['dép lê', 'đôi dép phổ biến ở lớp Việt Nam', 4, 5, 5, 3],
  ['Lớp mình chật', 'lựa chọn khai lớp chật', 2, 4, 3, 1],
  ['Em mệt / em đau', 'nhãn nút xin nghỉ', 1, 4, 4, 1],
  ['cố lên', 'dòng mascot bị cấm khi em xin nghỉ', 1, 1, 1, 1],
  ['>= 12 nhịp/phút', 'trần nhịp phải giữ nguyên ở bản tại chỗ', 1, 2, 3, 1],
  ['4 dòng <= 12 từ', 'bốn dòng của thẻ dẹp chỗ chơi trong chuỗi tự kiểm', 0, 1, 1, 0],
  ['- CHỖ CHƠI AN TOÀN (nguồn:', 'nhãn khối chỗ chơi trong template', 0, 1, 0, 0],
  ['Phần chỗ chơi đã điền đủ', 'dòng checklist chỗ chơi trong template', 0, 1, 0, 0],
  ['máy tự kiểm thứ 40', 'số mục của verifyPlayzone() trong bảng kiểm', 0, 0, 1, 0],
  ['việc người thử thứ 31', 'việc người thử tương ứng ở README', 0, 0, 1, 0],
  ['người thử số 31', 'việc người thử tương ứng ở prompts/README', 0, 0, 0, 1],
  ['Sáu quy định "chỗ chơi an toàn"', 'heading mục kể chuyện tầng 21 ở README', 0, 0, 1, 0],
  ['Tầng "chỗ chơi an toàn"', 'heading mục kể chuyện tầng 21 ở prompts/README', 0, 0, 0, 1],
  // Probe vòng 21: prompts/README trỏ từng quy định của tầng này về đúng một dòng bảng kiểm bằng
  // "mục `[40]`". Viết trỏ thành "mục `[39]`" thì người đọc mở nhầm dòng của tầng tuần học mà
  // các needle chữ ở trên vẫn xanh hết.
  ['mục `[40]`', 'con trỏ từ prompts/README về đúng dòng bảng kiểm của verifyPlayzone()', 0, 0, 0, 5],
];
// Vòng 22: tầng "sân chơi Việt Nam". Các mốc dưới ĐO TỪ tài liệu thật rồi hạ một bậc làm sàn,
// giống cách PLAYZONE_DOC_NEEDLES làm ở vòng 21. Lý do phải có sàn: sáu quy định này sống ở ba chỗ khác
// nhau (master §4.12, template, hai README) và một lần sửa tay ở chỗ nào cũng làm tầng đó biến mất khỏi
// chỗ đó mà build vẫn xanh.
const FOLK_DOC_NEEDLES = [
  ["TRÒ DẪN DẮT LẤY NGUYÊN VĂN TỪ", "nhãn bullet trò dẫn dắt ở master", 1, 0, 0, 0],
  ["MỘT LỜI HÔ THEO NHỊP, BA LẦN MỘT PHIÊN", "nhãn bullet lời hô ở master", 1, 0, 0, 0],
  ["NĂM TRÒ BỊ LOẠI THẲNG CỔ", "nhãn bullet năm trò bị loại ở master", 1, 0, 0, 0],
  ["MỘT ĐỒ DÙNG SÂN TRƯỜNG TRONG TÁM MÓN", "nhãn bullet đồ dùng ở master", 1, 0, 0, 0],
  ["TRÒ ĐÔI BẠN CHƠI BẰNG HAI EM CẠNH NHAU", "nhãn bullet trò đôi bạn ở master", 1, 0, 0, 0],
  ["TỰ KIỂM BẰNG `verifyFolk()`", "nhãn bullet hàm tự kiểm ở master", 1, 0, 0, 0],
  ["[41] verifyFolk()", "mục 41 của bảng kiểm máy tự kiểm trong master", 1, 0, 0, 0],
  ["- SÂN CHƠI VIỆT NAM (nguồn:", "nhãn khối sân chơi trong template", 0, 1, 0, 0],
  ["Phần sân chơi đã điền đủ", "dòng checklist sân chơi trong template", 0, 1, 0, 0],
  ["Sáu quy định \"sân chơi Việt Nam\"", "heading mục kể chuyện tầng 22 ở README", 0, 0, 1, 0],
  ["Tầng \"sân chơi Việt Nam\"", "heading mục kể chuyện tầng 22 ở prompts/README", 0, 0, 0, 1],
  ["máy tự kiểm thứ 41", "số mục của verifyFolk() trong bảng kiểm", 0, 0, 1, 0],
  ["việc người thử thứ 32", "việc người thử tương ứng ở README", 0, 0, 1, 0],
  ["người thử số 32", "việc người thử tương ứng ở prompts/README", 0, 0, 0, 1],
  ["mục `[41]`", "con trỏ từ prompts/README về đúng dòng bảng kiểm của verifyFolk()", 0, 0, 0, 1],
  ["sports.mjs + folk.mjs", "danh sách file data trong pipeline prompts/README", 0, 0, 0, 1],
  ["· playzone.mjs · folk.mjs", "danh sách file lib trong pipeline prompts/README", 0, 0, 0, 1],
  ["tools/data/folk.mjs", "ngân hàng trò dân gian", 4, 3, 3, 3],
  ["tools/lib/folk.mjs", "tầng quy định sân chơi", 1, 1, 2, 1],
  ["FOLK_PROPS", "danh sách tám món đồ dùng", 2, 2, 3, 1],
  ["verifyFolk()", "hàm kiểm tầng sân chơi lúc nạp", 1, 1, 2, 5],
  ["Nhảy lò cò", "trò bị loại 1 (đứng một chân)", 2, 1, 1, 1],
  ["Trồng cây chuối", "trò bị loại 2 (đứng một chân)", 2, 1, 1, 1],
  ["Bịt mắt bắt dê", "trò bị loại 3 (che mắt)", 2, 1, 1, 1],
  ["Rồng rắn chạy vòng", "trò bị loại 4 (chạy quanh sân)", 1, 1, 1, 1],
  ["Kéo co dây thật", "trò bị loại 5 (dây căng ngang người)", 2, 1, 1, 1],
  ["vạch phấn", "đồ dùng sân trường thứ nhất", 2, 1, 1, 1],
  ["dây nhảy", "đồ dùng sân trường thứ hai", 1, 1, 1, 1],
  ["khăn vải", "đồ dùng sân trường thứ ba", 1, 1, 1, 1],
  ["viên sỏi", "đồ dùng sân trường thứ tư", 3, 1, 2, 1],
  ["gậy tre", "đồ dùng sân trường thứ năm", 1, 1, 1, 1],
  ["quả cầu giấy", "đồ dùng sân trường thứ sáu", 1, 1, 1, 1],
  ["túi đậu", "đồ dùng sân trường thứ bảy", 1, 1, 1, 1],
  ["vòng tròn", "đồ dùng sân trường thứ tám", 1, 1, 1, 1],
  ["Ô ăn quan", "trò dẫn dắt của mã GRAB", 1, 0, 1, 1],
  ["Nhảy dây", "trò dẫn dắt của mã STEP", 1, 0, 1, 0],
  ["Rồng rắn lên mây", "trò dẫn dắt của mã VOICE", 1, 0, 1, 0],
  ["Tập tầm vông", "trò dẫn dắt của mã FINGER_COUNT", 1, 0, 1, 0],
  ["Gánh nước", "trò dẫn dắt của mã TWO_HAND_BALANCE ở prompts/README", 0, 0, 0, 1],
  ["Chi chi chành chành", "trò dẫn dắt của mã POINT ở prompts/README", 0, 0, 0, 1],
  ["Gánh gánh gồng gồng", "chant đồng dao làm ví dụ ở master", 1, 0, 0, 0],
  ["Thả đỉa ba ba", "chant đồng dao làm ví dụ ở master", 1, 0, 0, 0],
  ["đồng dao", "loại lời hô mà tầng sân chơi buộc dùng thật", 3, 3, 5, 2],
  ["trò chơi dân gian", "chữ \"trò chơi dân gian\"", 1, 1, 2, 1],
  ["sân trường", "nơi trò chơi dân gian tồn tại", 2, 1, 5, 2],
  ["<= 4 từ", "trần độ dài tên trò dẫn dắt", 6, 8, 6, 2],
  ["<= 8 từ", "trần độ dài dòng cách chơi", 1, 1, 1, 1],
  ["<= 8 tiếng", "trần độ dài lời hô theo nhịp", 2, 2, 2, 1],
  ["vạch nhịp 8 nhịp", "nhịp mà lời hô phải bám theo", 1, 1, 1, 1],
  ["BA lần một phiên", "số lần hô lời hô trong một phiên", 1, 1, 1, 1],
  ["alpha <= 0.45", "trần phủ của đồ dùng AR", 3, 2, 1, 1],
  ["Trò chơi hôm nay", "dòng tổng kết tên trò ở màn khép phiên", 0, 1, 1, 1],
];
// Con số cũ của vòng 6 ("< 8 động tác lớn mỗi phút") là yêu cầu KHÔNG THỂ đạt với phiên 12 lượt / 4–6 phút.
// Giữ nó trong tài liệu sẽ sinh game luôn báo CHƯA ĐẠT ở mục cường độ, nên phải bị chặn.
const SUPERSEDED = [
  [/>= 8 động tác lớn mỗi phút/, 'còn dùng con số cường độ cũ (>= 8 động tác lớn mỗi phút) — đã thay bằng >= 12 nhịp chuyển động mỗi phút'],
  [/cách tường một bước/, 'còn dùng "một bước" làm đơn vị khoảng cách an toàn — vòng 21 chuẩn hóa thành "một vòng 1 sải tay" theo tools/lib/playzone.mjs và tools/lib/rules.mjs'],
];
// Vòng 23: tầng "đố bạn". Các mốc dưới ĐO TỪ tài liệu thật rồi hạ một bậc làm sàn, giống cách
// FOLK_DOC_NEEDLES ở vòng 22. Sáu quy định này sống ở bốn chỗ (master §4.13, template, hai README) nên
// một lần sửa tay ở chỗ nào cũng làm tầng đố bạn biến mất khỏi chỗ đó mà build vẫn xanh.
const QUIZ_DOC_NEEDLES = [
  ['ĐÚNG BA TRÊN MƯỜI HAI LƯỢT LÀ LƯỢT "ĐỐ BẠN"', 'nhãn bullet nguồn đề ở master', 1, 0, 0, 0],
  ['THẺ "ĐỐ BẠN" MỘT HÀNG BA MẪU CÂU', 'nhãn bullet thẻ đố ở master', 1, 0, 0, 0],
  ['BẠN ĐÁP BẰNG ĐÚNG MỘT ĐỘNG TÁC CỦA MÃ ĐIỀU KHIỂN', 'nhãn bullet bạn đáp ở master', 1, 0, 0, 0],
  ['ĐỀ LỆCH KHÔNG PHẠT AI', 'nhãn bullet đề lệch ở master', 1, 0, 0, 0],
  ['ĐIỂM ĐỐ VÀO "CẢ NHÓM"', 'nhãn bullet điểm đố ở master', 1, 0, 0, 0],
  ['TỰ KIỂM BẰNG `verifyQuiz()`', 'nhãn bullet hàm tự kiểm ở master', 1, 0, 0, 0],
  ['[42] verifyQuiz()', 'mục 42 của bảng kiểm máy tự kiểm trong master', 1, 0, 0, 0],
  ['- ĐỐ BẠN — EM ĐẶT ĐỀ CHO BẠN ĐÁP (nguồn:', 'nhãn khối đố bạn trong template', 0, 1, 0, 0],
  ['Phần đố bạn đã điền đủ', 'dòng checklist đố bạn trong template', 0, 1, 0, 0],
  ['Sáu quy định "đố bạn"', 'heading mục kể chuyện tầng 23 ở README', 0, 0, 1, 0],
  ['Tầng "đố bạn"', 'heading mục kể chuyện tầng 23 ở prompts/README', 0, 0, 0, 1],
  ['máy tự kiểm thứ 42', 'số mục của verifyQuiz() trong bảng kiểm', 0, 0, 1, 0],
  ['việc người thử thứ 33', 'việc người thử tương ứng ở README', 0, 0, 1, 0],
  ['người thử số 33', 'việc người thử tương ứng ở prompts/README', 0, 0, 0, 1],
  ['mục `[42]`', 'con trỏ từ prompts/README về đúng dòng bảng kiểm của verifyQuiz()', 0, 0, 0, 1],
  ['folk.mjs + quiz.mjs', 'danh sách file data trong pipeline prompts/README', 0, 0, 0, 1],
  ['quiz.mjs · verify.mjs', 'danh sách file lib trong pipeline prompts/README', 0, 0, 0, 1],
  ['tools/data/quiz.mjs', 'bảng mẫu câu đố bạn', 4, 3, 4, 3],
  ['tools/lib/quiz.mjs', 'tầng quy định đố bạn', 1, 1, 2, 1],
  ['verifyQuiz()', 'hàm kiểm tầng đố bạn lúc nạp', 2, 2, 3, 6],
  ['Đố bạn', 'chữ "Đố bạn"', 6, 5, 4, 3],
  ['BA/12 lượt', 'trần lượt đố trong một phiên', 0, 2, 2, 1],
  ['Em chịu, bạn đáp giúp', 'nút nhận thua của em được đố', 3, 3, 5, 2],
  ['Em đố hôm nay', 'dòng tổng kết lượt đố', 1, 2, 2, 1],
  ['ngân hàng đề', 'chỗ dựa của chín lượt còn lại', 1, 0, 0, 0],
  ['MỘT hàng ba mẫu câu', 'thẻ đố một hàng ba mẫu', 2, 1, 0, 0],
  ['mỗi mẫu <= 8 từ', 'trần độ dài một mẫu câu đố', 1, 1, 1, 0],
  ['một chỗ trống', 'mỗi mẫu câu chỉ có một chỗ điền', 1, 1, 2, 1],
  ['tám mạch', 'số mạch kiến thức của bảng mẫu câu', 3, 3, 6, 2],
  ['CUỐI hiệp', 'vị trí lượt đố trong hiệp', 0, 0, 0, 1],
  ['MỘT hàng ba mẫu câu đúng mạch, chữ >= 20px', 'trần chữ của thẻ đố ở master', 1, 0, 0, 0],
  ['CẤM bật microphone', 'lượt đố không bật micro ở master', 1, 0, 0, 0],
  ['thì game KHÔNG trừ tim, KHÔNG cắt chuỗi đúng', 'đề lệch không phạt ai, chốt ở master', 1, 0, 0, 0],
  ['(tám mạch, mỗi mạch ba mẫu, mỗi mẫu <= 8 từ và có đúng một chỗ trống)', 'bản chốt bảng mẫu câu ở master', 1, 0, 0, 0],
  ['Thẻ "Đố bạn" hiện MỘT hàng ba mẫu câu, chữ >= 20px', 'trần chữ của thẻ đố ở template', 0, 1, 0, 0],
  ['Cấm bật microphone ở lượt này', 'lượt đố không bật micro ở template', 0, 1, 0, 0],
  ['Có nút "Em chịu, bạn đáp giúp"', 'nút nhận thua ở template', 0, 1, 0, 0],
  ['(mỗi mẫu <= 8 từ, đúng một chỗ trống)', 'bản chốt bảng mẫu câu ở template', 0, 1, 0, 0],
  ['`verifyQuiz()` chạy', 'hàm kiểm tầng đố bạn ở template', 0, 1, 0, 0],
  ['| **Đúng BA/12 lượt do em đặt đề** |', 'dòng bảng kể chuyện tầng đố bạn ở README', 0, 0, 1, 0],
  ['chữ **>= 20px**, **tự tắt sau 6 giây**', 'trần chữ và trần thời gian thẻ ở README', 0, 0, 1, 0],
  ['**không trừ tim, không cắt chuỗi đúng**', 'đề lệch không phạt ai ở README', 0, 0, 1, 0],
  ['mỗi mẫu **<= 8 từ**, đúng **một chỗ trống**', 'bản chốt bảng mẫu câu ở hai README', 0, 0, 1, 1],
  ['có nút **"Em chịu, bạn đáp giúp"**', 'nút nhận thua ở hai README', 0, 0, 1, 1],
  ['(tám mạch × ba mẫu', 'bản chốt bảng mẫu câu ở hai README', 0, 0, 1, 1],
  ['Đúng **BA lượt "Đố bạn"** một phiên', 'dòng bảng kể chuyện tầng đố bạn ở prompts/README', 0, 0, 0, 1],
  ['mỗi hiệp **MỘT lượt** ở **CUỐI hiệp**', 'vị trí lượt đố ở hai README', 0, 0, 1, 1],
];
const DOC_FILES = [
  ['prompts/00-master-canvas-prompt.md', master],
  ['prompts/templates/game-prompt-template.md', tpl],
  ['README.md', fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8')],
  ['prompts/README.md', fs.readFileSync(path.join(ROOT, 'prompts', 'README.md'), 'utf8')],
];
for (const [docSlot, [docName, docText]] of DOC_FILES.entries()) {
  for (const [needle, label] of PE_DOC_NEEDLES) {
    if (!docText.includes(needle)) bad(`${docName} thiếu quy định (${label}): không thấy "${needle}".`);
  }
  for (const [needle, label] of LIGHT_DOC_NEEDLES) {
    if (!docText.includes(needle)) bad(`${docName} thiếu con số nhẹ đầu (${label}): không thấy "${needle}".`);
  }
  for (const [needle, label] of CELEBRATE_DOC_NEEDLES) {
    if (!docText.includes(needle)) bad(`${docName} thiếu con số ăn mừng/âm thanh (${label}): không thấy "${needle}".`);
  }
  for (const [needle, label] of IDENTITY_DOC_NEEDLES) {
    if (!docText.includes(needle)) bad(`${docName} thiếu con số bản sắc riêng (${label}): không thấy "${needle}".`);
  }
  for (const [needle, label, ...mins] of [...RHYTHM_DOC_NEEDLES, ...VOICE_DOC_NEEDLES, ...QUEUE_DOC_NEEDLES, ...LESSON_DOC_NEEDLES, ...CURRICULUM_DOC_NEEDLES, ...SPORT_DOC_NEEDLES, ...FAMILY_DOC_NEEDLES, ...PACE_DOC_NEEDLES, ...PLAYZONE_DOC_NEEDLES, ...FOLK_DOC_NEEDLES, ...QUIZ_DOC_NEEDLES]) {
    const want = mins[docSlot];
    const got = docText.split(needle).length - 1;
    if (got < want) bad(`${docName} chỉ còn nêu "${needle}" (${label}) ${got} lần, chuẩn hiện hành là ${want} lần — tài liệu chuẩn phải giữ đủ chỗ nêu ở CẢ phần luật lẫn bảng kiểm tự kiểm, không được để một phần mất số.`);
  }
  for (const [re, label] of LIGHT_DOC_REGEX) {
    if (!re.test(docText)) bad(`${docName} không còn nêu ${label} trên cùng một dòng — người viết prompt sẽ quay về hợp đồng điểm cũ.`);
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
  // Probe vòng 16: template ghi "Mục máy tự kiểm (35 mục," — số nằm trong ngoặc nên các pattern ở trên
  // không bắt; đổi về "(34 mục," vẫn xanh.
  [/Mục máy tự kiểm \(([0-9]+) mục/g, MACHINE_ITEMS.length, 'số mục máy tự kiểm trong §9 của template'],
  // Probe vòng 21: README nói về bảng kiểm bằng "dòng", không phải "mục" ("đếm đủ 40 dòng máy tự kiểm +
  // 31 dòng người thử"). Các pattern ở trên chỉ bắt chữ "mục"/"việc" nên đổi "40 dòng" thành "39 dòng"
  // vẫn xanh — tài liệu sẽ describes một bảng kiểm không còn tồn tại.
  [/([0-9]+) dòng máy tự kiểm/g, MACHINE_ITEMS.length, 'số dòng máy tự kiểm trong bảng kiểm'],
  [/([0-9]+) dòng người thử/g, HUMAN_CHECKS.length, 'số dòng người thử trong bảng kiểm'],
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
// Master liệt kê từng mục máy tự kiểm bằng số [1] [2]... — viết tắt nên không so nguyên văn được, nhưng
// danh sách phải ĐỦ số lượng và đánh số liên tục. Probe vòng 13: xóa dòng "[32] verifyIdentity()..." khỏi
// master thì validate vẫn xanh vì mọi dòng còn lại tự nhất quán — khung hướng dẫn mất một mục mà không ai
// báo, và người dán prompt theo master sẽ không yêu cầu game kiểm tra bản sắc riêng.
{
  const items = [...master.matchAll(/^\s+\[(\d+)\] .*$/gm)].map((m) => Number(m[1]));
  if (items.length !== MACHINE_ITEMS.length) bad(`Master prompt liệt kê ${items.length} mục máy tự kiểm nhưng tools/lib/acceptance.mjs có ${MACHINE_ITEMS.length} — thiếu mục nào thì thêm lại vào §11, không xóa.`);
  for (let i = 0; i < items.length; i++) if (items[i] !== i + 1) { bad(`Master §11 đánh số mục không liên tục (vị trí ${i + 1} lại là [${items[i]}]).`); break; }
}
// 7h. Registry tầng quy định: thêm lib mà quên ghi vào tài liệu thì lib đó vô hình với người sửa.
// Vòng 10 bắt buộc: heading master phải nêu tên lib nguồn, và cả hai README phải liệt kê lib trong
// khối pipeline. Probe trước đây phát hiện hype.mjs bị thiếu trong danh sách pipeline của prompts/README
// mà không có check nào báo — vì toàn bộ danh sách này viết tay.
for (const [heading, libFile] of MASTER_LIB) {
  const line = (master.match(new RegExp('^' + heading.replace('.', '\\.') + '.*$', 'm')) || [''])[0];
  if (!line) bad(`Master prompt thiếu heading "${heading} ..." (nơi nêu tools/lib/${libFile}).`);
  else if (!line.includes(libFile)) bad(`Mục "${heading}" của master không nêu tools/lib/${libFile} — người sửa quy định không biết phải mở file nào.`);
}
// Mỗi lib phải nằm trong KHỐI PIPELINE (đoạn code liệt kê `node tools/build.mjs`) của cả hai README,
// không chỉ "được nhắc đến đâu đó trong file". Probe vòng 14c: xóa dòng `tools/lib/rhythm.mjs ...` khỏi
// khối pipeline của README thì vẫn xanh, vì tên lib còn xuất hiện ở heading của mục kể chuyện — người
// đọc khối pipeline lại không biết file đó tồn tại để sửa.
const pipelineBlock = (docText) => {
  const blocks = [...docText.matchAll(/^```[a-z]*\n([\s\S]*?)^```/gm)].map((m) => m[1]);
  return blocks.filter((b) => b.includes('node tools/build.mjs')).join('\n');
};
for (const libFile of layerLibs) {
  for (const [docName, docText] of DOC_FILES.filter(([n]) => n === 'README.md' || n === 'prompts/README.md')) {
    const block = pipelineBlock(docText);
    if (!block) bad(`${docName} không còn khối pipeline nào có \`node tools/build.mjs\` — không nơi nào để đối chiếu lib.`);
    else if (!block.includes(libFile)) bad(`${docName}: tools/lib/${libFile} không nằm trong khối pipeline — lib mới phải được liệt kê ở khối đó, không chỉ được nhắc ở một mục kể chuyện.`);
  }
}
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
  ['nhẹ đầu', '6.3 NHẸ ĐẦU', 'Phần nhẹ đầu đã điền đủ'],
  ['khoảnh khắc ăn mừng + âm thanh', '8.4 KHOẢNH KHẮC ĂN MỪNG', 'Phần ăn mừng + âm thanh đã điền đủ'],
  ['bản sắc riêng của từng game', '8.5 BẢN SẮC RIÊNG', 'Phần bản sắc riêng đã điền đủ'],
  ['nhạc nền theo nhịp', '8.6 NHẠC NỀN THEO NHỊP', 'Phần nhạc nền đã điền đủ'],
  ['vai chờ có vận động', '7.2 BỐN EM MỘT MÁY', 'Phần vai chờ đã điền đủ'],
  ['tiết học 45 phút + gắng sức', '4.6 TIẾT HỌC 45 PHÚT', 'Phần tiết học đã điền đủ'],
  ['chuẩn kiến thức SGK', '4.7 CHUẨN KIẾN THỨC', 'Phần chuẩn kiến thức đã điền đủ'],
  ['chất thể thao', '4.8 CHẤT THỂ THAO', 'Phần chất thể thao đã điền đủ'],
  ['gia đình', '4.9 GIA ĐÌNH', 'Phần gia đình đã điền đủ'],
  ['tuần học', '4.10 TUẦN HỌC', 'Phần tuần học đã điền đủ'],
  ['cảm giác arcade', '8.1 CẢM GIÁC ARCADE', 'Phần arcade đã điền đủ'],
  ['thi đua + cao trào', '8.2 THI ĐUA + CAO TRÀO', 'Phần thi đua + cao trào đã điền đủ'],
  ['ham quay lại', '8.3 HAM QUAY LẠI', 'Phần ham quay lại đã điền đủ'],
  ['tiếp cận + an toàn thần kinh', '9.1 TIẾP CẬN + AN TOÀN THẦN KINH', 'Phần tiếp cận đã điền đủ'],
];
for (const [label, heading, bullet] of DOC_LAYERS) {
  if (!master.includes(heading)) bad(`Master prompt thiếu mục "${heading}" (${label}) — quy định có trong lib nhưng khung hướng dẫn mất mục thì người viết prompt theo master sẽ không thấy.`);
  if (!tpl.includes(bullet)) bad(`Template thiếu dòng checklist "${bullet}" (${label}) — người viết prompt không bị nhắc phải điền tầng này.`);
}

// 7i. Tầng NHẸ ĐẦU kiểm bằng dữ liệu thật, không chỉ bằng chữ trong prompt: câu mẫu của chính repo
// phải gương mẫu — nếu một câu mẫu dài 21 từ hay mang hai phép tính thì mô hình sẽ bám theo nó mà bỏ
// qua quy định, và cả 85 prompt đều lệch hướng như vòng 10 đã phát hiện.
const LIGHT_WORDS = (t) => t.replace(/[«»".,?!;:]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
const LIGHT_OPS = /\s[+−\-×:]\s/g;
{
  let nhin = 0, total = 0;
  for (const [k, rows] of Object.entries(EXAMPLES)) {
    rows.forEach((r, i) => {
      total++;
      if (r.dang !== 'nhin' && r.dang !== 'tinh') { bad(`${k}|${i}: thiếu khóa dang hợp lệ ("nhin"/"tinh") trong câu mẫu.`); return; }
      if (r.dang === 'nhin') nhin++;
      const w = LIGHT_WORDS(r.prompt);
      if (w > 16) bad(`${k}|${i}: câu mẫu dài ${w} từ, vượt trần 16 từ của tầng nhẹ đầu — đề phải viết lại.`);
      if (r.dang === 'tinh') {
        const n = (r.prompt.match(LIGHT_OPS) || []).length;
        if (n > 1) bad(`${k}|${i}: mục dang:"tinh" mang ${n} dấu phép tính, chuẩn là tối đa MỘT — hoặc engine dựng sẵn bước trước, hoặc đổi sang "nhin".`);
      }
    });
  }
  if (nhin / total < 0.6) bad(`Câu mẫu chỉ có ${nhin}/${total} mục dang:"nhin" (${Math.round((nhin / total) * 100)}%), dưới chuẩn 60% — few-shot sẽ dạy mô hình sinh toàn câu tính.`);
  for (const r of rows) {
    const t = fs.readFileSync(path.join(ROOT, r.prompt), 'utf8');
    if (!t.includes('errorTag, loiViet, dang }')) bad(`${r.id}: khuôn QUESTION_DATA chưa có khóa dang — tầng nhẹ đầu bị mất khi sinh prompt.`);
  }
}
// Bảng kiểm nghiệm thu của lớp nhẹ đầu không được biến mất âm thầm: xóa một mục khỏi MACHINE_ITEMS thì
// CHECKLIST_NGHIEP_THU.md được sinh lại khớp y nguyên, nên phải bắt buộc nội dung mục chứ không đếm số.
if (!MACHINE_ITEMS.some((s) => s.includes('dang: "nhin"') && s.includes('>= 60%'))) bad('Bảng kiểm máy tự kiểm không còn mục nào nghiệm thu tỉ lệ đề nhìn >= 60% — lớp nhẹ đầu mất người canh.');
if (!MACHINE_ITEMS.some((s) => s.includes('+6') && s.includes('+3'))) bad('Bảng kiểm máy tự kiểm không còn mục nào nghiệm thu điểm +6 động tác / +3 đáp án của một lượt.');
if (!MACHINE_ITEMS.some((s) => s.includes('resume') && s.includes('"Bắt đầu"'))) bad('Bảng kiểm máy tự kiểm không còn mục nào nghiệm thu "AudioContext chỉ resume sau cú bấm Bắt đầu" — lỗi file Canvas câm từ đầu đến cuối sẽ lọt.');
if (!MACHINE_ITEMS.some((s) => s.includes('miti-mute') && s.includes('200 ms'))) bad('Bảng kiểm máy tự kiểm không còn mục nào nghiệm thu trần SFX 200 ms + nút tắt tiếng "miti-mute" — lớp âm thanh mất người canh.');
if (!MACHINE_ITEMS.some((s) => s.includes('40–60 hạt'))) bad('Bảng kiểm máy tự kiểm không còn mục nào nghiệm thu pháo giấy theo mốc — đúng chỗ trẻ hét lên.');
if (!HUMAN_CHECKS.some((s) => /tính nhẩm/.test(s))) bad('Bảng việc người thử không còn câu hỏi "em có phải nhíu mắt tính nhẩm không" — chỗ duy nhất phát hiện game nặng đầu mà số liệu vẫn xanh.');
// Tầng bản sắc: xóa hai mục nghiệm thu này thì 85 game quay về một game mặc 85 bộ áo mà không check nào báo,
// vì toàn bộ quy định generic vẫn còn nguyên trong prompt và lib.
if (!MACHINE_ITEMS.some((s) => s.includes('verifyIdentity()') && s.includes('--miti-1'))) bad('Bảng kiểm máy tự kiểm không còn mục nào nghiệm thu bản sắc riêng (verifyIdentity + --miti-1) — lớp "mỗi game một gương mặt" mất người canh.');
if (!HUMAN_CHECKS.some((s) => /bộ áo/.test(s))) bad('Bảng việc người thử không còn câu "một game mặc hai bộ áo" — chỗ duy nhất phát hiện 85 game vẫn giống hệt nhau.');
// Tầng nhạc nền: mục máy kiểm BPM/gain và việc người thử "nhạc có giữ nhịp cho em vận động không" là hai
// thứ duy nhất bắt được game kê "có nhạc nền" mà thực tế chỉ im lặng rồi phát một tiếng "ting".
if (!MACHINE_ITEMS.some((s) => s.includes('verifyMusic()') && s.includes('100–128'))) bad('Bảng kiểm máy tự kiểm không còn mục nào nghiệm thu nhạc nền (verifyMusic + trần BPM 100–128) — lớp nhịp mất người canh.');
if (!MACHINE_ITEMS.some((s) => s.includes('4 giọng SFX') && s.includes('3 giọng'))) bad('Bảng kiểm máy tự kiểm không còn mục nào nghiệm thu ngân sách giọng 4 giọng SFX + 3 giọng nhạc nền — hai lib sẽ lại cãi nhau về trần âm thanh.');
if (!HUMAN_CHECKS.some((s) => /nhịp/i.test(s) && /Tắt tiếng/.test(s))) bad('Bảng việc người thử không còn câu "tắt tiếng rồi nhịp chuyển động có rớt không" — chỗ duy nhất phát hiện nhạc nền chỉ là tiếng nền vô định.');
// Tầng vai chờ: một máy bốn em mà bỏ hai mục này thì game vẫn đạt 33 mục còn lại trong khi ba em
// đứng xem trọn tiết học — đúng điều mục tiêu thể dục cấm.
if (!MACHINE_ITEMS.some((s) => s.includes('verifyQueue()') && s.includes('3 lượt'))) bad('Bảng kiểm máy tự kiểm không còn mục nghiệm thu vai chờ (verifyQueue() + 3 lượt/em) — ba em đứng xem lọt qua nghiệm thu mà không ai báo.');
if (!HUMAN_CHECKS.some((s) => /bốn em đứng quanh/.test(s) && /20 giây/.test(s))) bad('Bảng việc người thử không còn câu "bốn em đứng quanh một máy, em chờ có vận động không" — chỗ duy nhất phát hiện một tiết học chỉ một em được động đậy.');
// Tầng tiết học: thiếu hai mục này thì game vẫn báo đạt trong khi một nhóm chơi 20 phút và ba nhóm kia
// hết tiết chưa tới lượt, còn "vận động >= 60%" vẫn xanh dù bài quá sức với em lớp 4.
if (!MACHINE_ITEMS.some((s) => s.includes('verifyLesson()') && s.includes('miti-effort'))) bad('Bảng kiểm máy tự kiểm không còn mục nghiệm thu tiết học (verifyLesson() + "miti-effort") — trần thời lượng và thang gắng sức lọt qua nghiệm thu mà không ai báo.');
// Probe vòng 16: mục [35] bỏ đúng một vế ("15 giây hồi nhịp") vẫn xanh vì hai vế kia còn nguyên. verifyLesson()
// chỉ có nghĩa khi mục bảng kiểm liệt kê đủ bốn đối tượng nó kiểm, nên neo cả bốn vế vào cùng một mục.
{
  const lessonItem = MACHINE_ITEMS.find((s) => s.includes('verifyLesson()'));
  for (const clause of ['phút thứ 10', 'miti-effort', '15 giây', 'Bản tiết học']) {
    if (lessonItem && !lessonItem.includes(clause)) bad(`Mục bảng kiểm "verifyLesson()" không còn nêu "${clause}" — mục nghiệm thu tiết học phải liệt kê đủ bốn điều verifyLesson() kiểm, thiếu một vế là game báo ĐẠT mà không kiểm.`);
  }
}
if (!HUMAN_CHECKS.some((s) => /phút thứ 10/.test(s) && /45 phút/.test(s))) bad('Bảng việc người thử không còn câu bấm giờ thật cho phiên 8–10 phút — máy không tự kiểm được việc bốn nhóm có kịp chơi trong một tiết 45 phút.');

// Vòng 17: chuẩn kiến thức SGK phải còn nguyên trong bảng kiểm, không rút thành "có nhãn mạch".
if (!MACHINE_ITEMS.some((s) => s.includes('verifyStandard()') && s.includes('Yêu cầu cần đạt'))) bad('Bảng kiểm máy tự kiểm không còn mục nghiệm thu chuẩn kiến thức (verifyStandard() + "Yêu cầu cần đạt") — thiếu mục này thì game in sai yêu cầu của lớp mà vẫn báo ĐẠT.');
{
  const stdItem = MACHINE_ITEMS.find((s) => s.includes('verifyStandard()'));
  for (const clause of ['18 ký tự', 'NGUYÊN VĂN', '9/12', '3 lượt thuộc mạch khác', 'Dễ nhầm', '12 từ']) {
    if (stdItem && !stdItem.includes(clause)) bad(`Mục bảng kiểm "verifyStandard()" không còn nêu "${clause}" — mục nghiệm thu chuẩn kiến thức phải liệt kê đủ bốn điều verifyStandard() kiểm.`);
  }
}
if (!HUMAN_CHECKS.some((s) => /Yêu cầu cần đạt/.test(s) && /mạch nào/.test(s))) bad('Bảng việc người thử không còn câu đối chiếu "Yêu cầu cần đạt" với sách giáo khoa — máy so được chuỗi nguyên văn nhưng không biết chuỗi đó có đúng chuẩn lớp học thật không.');

// Vòng 17: bảng chuẩn kiến thức là DỮ LIỆU, không phải chữ trong prompt. Thiếu một dòng
// standards.mjs thì build-prompts throw, nhưng sửa nội dung (thu ngắn mẹo, đổi mạch, viết lại
// yêu cầu cần đạt) thì không tầng nào bắt — nên đối chiếu thẳng 57 cụm với bảng chuẩn ở đây.
const soTu = (s) => s.trim().split(/\s+/).length;
for (const k of CLUSTER_KEYS) {
  const s = STANDARDS[k];
  if (!s) { bad(`clusters.mjs có cụm ${k} nhưng standards.mjs chưa có dòng chuẩn — thêm mach/ngan/yc/meo.`); continue; }
  if (!MACH_TEN.includes(s.mach)) bad(`standards.mjs: cụm ${k} gán mạch "${s.mach}" ngoài tám mạch của MACH.`);
  if (s.ngan.length > 18) bad(`standards.mjs: cụm ${k} có nhãn HUD "${s.ngan}" dài ${s.ngan.length} ký tự — trần là 18 ký tự để vừa góc HUD.`);
  if (soTu(s.meo) > 12) bad(`standards.mjs: cụm ${k} có mẹo nhớ ${soTu(s.meo)} từ — trần 12 từ, dài hơn thì em không nhớ nổi mà mascot cũng không đọc kịp một hơi.`);
  if (s.yc.length < 40) bad(`standards.mjs: cụm ${k} có yêu cầu cần đạt chỉ ${s.yc.length} ký tự — dòng này in ra tờ rời, cụt quá thì giáo viên không đối chiếu được.`);
}
for (const k of STANDARD_KEYS) if (!CLUSTER_KEYS.includes(k)) bad(`standards.mjs có dòng ${k} không có trong clusters.mjs.`);
if (STANDARD_KEYS.length !== CLUSTER_KEYS.length) bad(`standards.mjs có ${STANDARD_KEYS.length} dòng nhưng clusters.mjs có ${CLUSTER_KEYS.length} cụm — bảng chuẩn phải phủ đủ.`);

// Vòng 20: khoảng tuần là DỮ LIỆU chứ không phải chữ trong prompt.Lib nối số bằng biểu thức nên đổi
// SCHOOL_YEAR là 85 prompt đổi theo im lặng — chỉ đối chiếu thẳng bảng chuẩn mới thấy. Kiểm: hình dáng
// cột tuan, trần 10 tuần, cụm ôn tập nằm cuối năm, phủ kín 35 tuần (mỗi tuần >= 2 game để mở), và bốn
// con số năm học mà cả tài liệu lẫn quy định đang trích dẫn.
{
  const ON_TAP = 'Ôn tập tổng hợp';
  if (SCHOOL_YEAR.soTuan !== 35) bad(`SCHOOL_YEAR.soTuan = ${SCHOOL_YEAR.soTuan} nhưng tài liệu và hàng nút tuần đang nêu 35 tuần — đổi năm học thì phải sửa cùng PACE, master, template và hai README.`);
  if (SCHOOL_YEAR.nuocRut !== 2) bad(`SCHOOL_YEAR.nuocRut = ${SCHOOL_YEAR.nuocRut} nhưng quy định nước rút đang nêu HAI tuần — vùng nước rút không được đổi âm thầm trong dữ liệu.`);
  if (SCHOOL_YEAR.tongOnTu !== 33) bad(`SCHOOL_YEAR.tongOnTu = ${SCHOOL_YEAR.tongOnTu} nhưng quy định tổng ôn đang nêu "từ tuần 33" — mốc tổng ôn phải sửa cùng tài liệu.`);
  if (SCHOOL_YEAR.hocKi[1][1] !== 18) bad(`SCHOOL_YEAR.hocKi[1] = ${JSON.stringify(SCHOOL_YEAR.hocKi[1])} nhưng quy định nhãn tuần đang chốt Học kì 1 ở tuần 18 — ranh giới hai học kì phải nhất quán với PACE.nhanTuan.`);
  if (SCHOOL_YEAR.moc.length !== 4) bad(`SCHOOL_YEAR.moc có ${SCHOOL_YEAR.moc.length} mốc, chuẩn là 4 (giữa học kì 1, cuối học kì 1, giữa học kì 2, cuối học kì 2) — nước rút tính theo đúng bốn bài kiểm tra định kì.`);
  const mocTuan = SCHOOL_YEAR.moc.map((m) => m.tuan);
  for (let i = 1; i < mocTuan.length; i++) if (mocTuan[i] <= mocTuan[i - 1]) bad(`SCHOOL_YEAR.moc không tăng dần (${mocTuan.join(', ')}) — mốc sau phải xa hơn mốc trước thì "còn <n> tuần tới kiểm tra" mới tính được.`);
  for (const m of SCHOOL_YEAR.moc) if (m.tuan < 1 || m.tuan > SCHOOL_YEAR.soTuan) bad(`SCHOOL_YEAR.moc "${m.ten}" đặt ở tuần ${m.tuan}, ngoài năm học 1–${SCHOOL_YEAR.soTuan}.`);
  if (hocKiCua(18) !== 1 || hocKiCua(19) !== 2) bad(`hocKiCua() phải trả Học kì 1 ở tuần 18 và Học kì 2 ở tuần 19 — nhãn "Tuần a–b · Học kì n" in ra từ chính hàm này.`);

  const phanTuan = new Array(SCHOOL_YEAR.soTuan + 1).fill(0);
  for (const k of CLUSTER_KEYS) {
    const s = STANDARDS[k];
    if (!s) continue;
    const t = s.tuan;
    if (!Array.isArray(t) || t.length !== 2) { bad(`standards.mjs: cụm ${k} thiếu cột tuan [a, b] — tầng tuần học không có khoảng để in nhãn.`); continue; }
    const [a, b] = t;
    if (!Number.isInteger(a) || !Number.isInteger(b)) { bad(`standards.mjs: cụm ${k} có tuan = [${a}, ${b}] không phải số nguyên.`); continue; }
    if (a < 1 || b > SCHOOL_YEAR.soTuan || a > b) bad(`standards.mjs: cụm ${k} có khoảng tuần ${a}–${b} sai chuẩn — phải nằm trong 1–${SCHOOL_YEAR.soTuan} và a <= b.`);
    if (b - a + 1 > 10) bad(`standards.mjs: cụm ${k} phủ ${b - a + 1} tuần, quá trần 10 tuần của PACE.nhanTuan — một cụm trải cả học kì thì nhãn tuần không giúp giáo viên chọn game nào.`);
    if (s.mach === ON_TAP && !(a >= SCHOOL_YEAR.tongOnTu - 3 && b === SCHOOL_YEAR.soTuan)) bad(`standards.mjs: cụm ôn tập tổng hợp ${k} có khoảng ${a}–${b} — cụm "Ôn tập tổng hợp" phải khép ở hết năm (b = ${SCHOOL_YEAR.soTuan}) và mở từ vùng tổng ôn.`);
    for (let w = a; w <= b; w++) phanTuan[w]++;
  }
  for (let w = 1; w <= SCHOOL_YEAR.soTuan; w++) {
    if (phanTuan[w] < 2) bad(`Tuần ${w} chỉ có ${phanTuan[w]} cụm phủ — mỗi tuần trong năm học phải có ít nhất 2 game để giáo viên mở đúng tuần, nếu không nhãn "Tuần ${w}" là chỗ trống.`);
  }
}

// Mỗi prompt game phải mang đúng dữ liệu chuẩn của CỤM của nó, không phải một dòng chung chung.
for (const g of GAMES) {
  const s = STANDARDS[g.cluster];
  if (!s) continue;
  const rel = PATH_OF.get(g.id);
  if (!rel || !fs.existsSync(path.join(ROOT, rel))) continue;
  const t = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const [needle, label] of capsNeo([
    // Tên mạch đứng MỘT MÌNH thì yếu: chính quy định machNhan đã liệt kê sẵn tám tên mạch trong mọi
    // prompt, nên block nào cũng "có" tên mạch. Neo cả cụm mach + nhãn HUD in liền nhau.
    [`**${s.mach}** — nhãn ngắn trên HUD: "${s.ngan}"`, 'dòng mạch + nhãn HUD của ĐÚNG cụm'],
    [s.yc, 'yêu cầu cần đạt'], [s.meo, 'mẹo nhớ'],
    ['"Dễ nhầm" báo TRƯỚC', 'dòng báo trước bẫy ở câu đầu tiên'],
    [ERROR_NOTES[g.cluster].split('; ')[0], 'ý lỗi đầu tiên của cụm mà dòng "Dễ nhầm" phải lấy'],
    // Vòng 20: cùng lý do — prompt nào cũng có chữ "Tuần", nên phải neo đúng khoảng của CLUSTER này,
    // tính Học kì bằng chính hocKiCua() chứ không gõ tay (xóa `tuan` khỏi builder là 85 prompt mất nhãn).
    // Cặp [needle, label] phải bọc trong MỘT mảng nữa: spread thẳng `[x, y]` ném hai chuỗi vào danh sách,
    // vòng destruct bèn gắp từng ký tự làm needle — kim chạy 85 lần mà không kiểm gì (lỗ probe 20g bắt).
    ...(Array.isArray(s.tuan) ? [[`Tuần ${s.tuan[0]}–${s.tuan[1]} · Học kì ${hocKiCua(s.tuan[0])}`, 'nhãn tuần của ĐÚNG cụm']] : []),
  ], 'mục neo prompt game')) {
    if (!t.includes(needle)) bad(`${g.id}: prompt thiếu ${label} của cụm ${g.cluster} ("${needle.slice(0, 48)}") — builder phải lấy thẳng tools/data/standards.mjs.`);
  }
}

// Vòng 18: chất thể thao phải còn nguyên trong bảng kiểm, không rút thành "có tên môn".
if (!MACHINE_ITEMS.some((s) => s.includes('verifySport()') && s.includes('miti-sport'))) bad('Bảng kiểm máy tự kiểm không còn mục nghiệm thu chất thể thao (verifySport() + "miti-sport") — thiếu mục này thì game bỏ hẳn tên môn và thành tích cả đội mà vẫn báo ĐẠT.');
{
  const sportItem = MACHINE_ITEMS.find((s) => s.includes('verifySport()'));
  for (const clause of ['<= 4 từ', '3 giây', 'hiệu lệnh <= 4 từ', 'hai lần', 'chạm khuỷu 3 giây', 'lời hay <= 6 từ', 'ba mốc', 'CẢ ĐỘI', '15 giây', '45–60 giây']) {
    if (sportItem && !sportItem.includes(clause)) bad(`Mục bảng kiểm "verifySport()" không còn nêu "${clause}" — mục nghiệm thu chất thể thao phải liệt kê đủ bốn điều verifySport() kiểm, thiếu một vế là game báo ĐẠT mà không kiểm.`);
  }
}
if (!HUMAN_CHECKS.some((s) => /tập môn gì/.test(s) && /CẢ ĐỘI/.test(s))) bad('Bảng việc người thử không còn câu hỏi "mình đang tập môn gì" — máy kiểm được chuỗi tên môn trên HUD nhưng không biết trẻ có thật sự hình dung mình đang tập một môn thể thao.');

// Vòng 19: tờ gửi bố mẹ phải còn nguyên trong bảng kiểm. Probe 19f: đổi "verifyFamily() đã chạy lúc nạp"
// thành "Gia đình đã được nhắc đến" trong acceptance.mjs vẫn xanh, vì không kim nào bắt mục [38] phải
// liệt kê đủ bốn điều — mục nghiệm thu rút thành chữ kê sẵn đúng là cái bug mà cả thư viện này sinh ra
// để chặn, nên nó không được lọt qua chính bảng kiểm.
if (!MACHINE_ITEMS.some((s) => s.includes('verifyFamily()') && s.includes('"Gửi bố mẹ"'))) bad('Bảng kiểm máy tự kiểm không còn mục nghiệm thu tầng gia đình (verifyFamily() + khối "Gửi bố mẹ") — thiếu mục này thì game bỏ hẳn tờ gửi về nhà mà vẫn báo ĐẠT.');
{
  const famItem = MACHINE_ITEMS.find((s) => s.includes('verifyFamily()'));
  for (const clause of ['đúng bốn dòng', '<= 20 từ', '>= 20px', '"Copy tờ rời"', 'chưa ghi được', '3 phút', 'dongTac', '<= 16 từ', 'tên bạn khác', 'xếp hạng', 'đe dọa']) {
    if (famItem && !famItem.includes(clause)) bad(`Mục bảng kiểm "verifyFamily()" không còn nêu "${clause}" — mục nghiệm thu tầng gia đình phải liệt kê đủ bốn điều verifyFamily() kiểm; bớt một vế là game in tờ gửi về rỗng mà vẫn báo ĐẠT.`);
  }
}
if (!HUMAN_CHECKS.some((s) => /bố mẹ đọc tại chỗ/.test(s) && /3 phút/.test(s))) bad('Bảng việc người thử không còn câu "copy tờ rời đưa cho bố mẹ đọc tại chỗ" — máy đếm được bốn dòng nhưng không biết một người lớn đứng ở cổng trường có đọc nổi tờ đó trong mười giây không.');

// Vòng 20: tầng tuần học mượn toàn bộ con số từ dữ liệu, nên mục bảng kiểm phải nêu lại đủ bốn điều
// verifyPacing() kiểm — bớt một vế thì game in nhãn tuần bừa vẫn báo ĐẠT. Probe: xóa "không chặn nút
// 'Bắt đầu'" khỏi mục [39] thì chuỗi trong lib vẫn nguyên, chỉ mục nghiệm thu là cụt.
if (!MACHINE_ITEMS.some((s) => s.includes('verifyPacing()') && s.includes('miti-week'))) bad('Bảng kiểm máy tự kiểm không còn mục nghiệm thu tầng tuần học (verifyPacing() + "miti-week") — thiếu mục này thì game bỏ hẳn nhãn tuần và câu hỏi tuần mà vẫn báo ĐẠT.');
{
  const paceItem = MACHINE_ITEMS.find((s) => s.includes('verifyPacing()'));
  for (const clause of ['"Tuần <a>–<b> · Học kì <n>"', 'NGUYÊN VĂN cột tuan', '1–35', 'tối đa 10 tuần', '>= 18px', '"Copy tờ rời"', 'ĐÚNG MỘT lần ở phiên đầu', 'không chặn nút "Bắt đầu"', '>= 3/12 lượt', 'tuan[1] nhỏ hơn tuần đó', 'SCHOOL_YEAR', 'không đổi luật chơi', 'không đổi trần tải trọng']) {
    if (paceItem && !paceItem.includes(clause)) bad(`Mục bảng kiểm "verifyPacing()" không còn nêu "${clause}" — mục nghiệm thu tầng tuần học phải liệt kê đủ bốn điều verifyPacing() kiểm; bớt một vế là game tự đặt khoảng tuần mà vẫn báo ĐẠT.`);
  }
}
if (!HUMAN_CHECKS.some((s) => /thời khóa biểu/.test(s) && /hai lượt đầu/.test(s))) bad('Bảng việc người thử không còn câu đối chiếu nhãn tuần với thời khóa biểu thật của lớp — máy so được chuỗi với cột tuan nhưng không biết lớp có thật đang học tới tuần đó không, và cũng không biết hai lượt nước rút có thật là chỗ em yếu nhất hay không.');

// Vòng 21: tầng chỗ chơi an toàn nghiệm thu KHÔNG GIAN THẬT và QUYỀN NGHỈ, nên mục bảng kiểm phải nêu lại
// đủ bốn điều verifyPlayzone() kiểm — thiếu một vế (ví dụ "đứng một chân") thì game bỏ đúng chỗ dễ chấn
// thương nhất mà vẫn báo ĐẠT.
if (!MACHINE_ITEMS.some((s) => s.includes('verifyPlayzone()') && s.includes('"miti-stop"'))) bad('Bảng kiểm máy tự kiểm không còn mục nghiệm thu tầng chỗ chơi an toàn (verifyPlayzone() + "miti-stop") — thiếu mục này thì game bỏ hẳn thẻ dẹp chỗ chơi và nút xin nghỉ mà vẫn báo ĐẠT.');
{
  const zoneItem = MACHINE_ITEMS.find((s) => s.includes('verifyPlayzone()'));
  // "không thêm màn hình trước nút 'Bắt đầu'" và "không một động tác đứng một chân nào" phải nguyên văn:
  // probe vòng 21 xóa hai vế đó khỏi mục bảng kiểm thì build vẫn xanh, vì clause "20 giây" và
  // "đứng một chân" vẫn còn ở các vế khác của cùng dòng.
  for (const clause of ['"Dẹp chỗ chơi"', 'bốn dòng <= 12 từ', '60–90 giây', '20 giây', 'không thêm màn hình trước nút "Bắt đầu"', '"miti-foot"', '0/12 lượt nhấc chân cao', 'không một động tác đứng một chân nào', '"miti-space"', '>= 12 nhịp/phút', '90 độ', 'MỘT LẦN đầu phiên', 'không mở rộng giữa phiên', '"Em mệt / em đau"', '>= 56px', 'hạ nhiệt 45–60 giây', 'không trừ tim', '"miti-stop"']) {
    if (zoneItem && !zoneItem.includes(clause)) bad(`Mục bảng kiểm "verifyPlayzone()" không còn nêu "${clause}" — mục nghiệm thu tầng chỗ chơi phải liệt kê đủ bốn điều verifyPlayzone() kiểm; bớt một vế là chỗ hỏng đó lọt qua nghiệm thu.`);
  }
}
if (!HUMAN_CHECKS.some((s) => /dép lê/.test(s) && /Em mệt/.test(s))) bad('Bảng việc người thử không còn câu nhìn xuống sàn chỗ em đứng và bấm thử nút "Em mệt / em đau" — máy kiểm được chuỗi nhưng không biết chỗ đó có bàn ghế chắn ngang thật không và em nghỉ có được thật không.');
{
  // Việc người thử 31 là chỗ DUY NHẤT bốn điều verifyPlayzone() được dịch thành hành động thật. Probe
  // vòng 21: xóa hỏi "nhấc chân cao có biến mất thật không" thì mục máy vẫn nguyên, build vẫn xanh,
  // nhưng người thử không còn phát hiện game chỉ đổi mỗi chữ trên HUD.
  const zoneCheck = HUMAN_CHECKS.find((s) => s.includes('đứng đúng chỗ em sẽ chơi'));
  for (const clause of ['dang hai tay', 'chạm bàn', 'vừa lau', '"chân đất / dép lê"', '"Dẹp chỗ chơi"', 'nhấc chân cao', '12 lượt', '"Lớp mình chật"', 'né sang bên', 'bấm nút "Em mệt / em đau"', 'hạ nhiệt', 'không trừ tim', 'không hỏi lý do', '"cố lên"']) {
    if (zoneCheck && !zoneCheck.includes(clause)) bad(`Việc người thử "đứng đúng chỗ em sẽ chơi" không còn nêu "${clause}" — người thử phải đi hết cả bốn điều của verifyPlayzone() bằng tay; thiếu một vế thì lỗi thật ở đúng chỗ đó không ai nhìn thấy.`);
  }
}
// Hai tầng nói về cùng MỘT khoảng cách: nếu một trong hai đổi đơn vị thì prompt sẽ mang hai chuẩn khác nhau.
if (!PLAYZONE.depCho.includes('1 sải tay') || !QUEUE.spacing.includes('1 sải tay')) bad('PLAYZONE.depCho và QUEUE.spacing phải cùng dùng đơn vị "1 sải tay" — một tầng đổi sang mét hay "bước" là 85 prompt mang hai chuẩn khoảng cách mâu thuẫn nhau.');

// Vòng 22: tầng sân chơi Việt Nam nghiệm thu KHUNG CHƠI và LỜI HÔ, nên mục bảng kiểm phải nêu lại đủ
// bốn điều verifyFolk() kiểm — thiếu một vế (ví dụ "không lời đếm nào bị gọi là đồng dao") thì game bịa
// một câu đếm vô nghĩa vẫn báo ĐẠT.
if (!MACHINE_ITEMS.some((s) => s.includes('verifyFolk()') && s.includes('FOLK_PROPS'))) bad('Bảng kiểm máy tự kiểm không còn mục nghiệm thu tầng sân chơi Việt Nam (verifyFolk() + FOLK_PROPS) — thiếu mục này thì game bỏ hẳn trò dân gian, lời hô và đồ dùng mà vẫn báo ĐẠT.');
if (!MACHINE_ITEMS.some((s) => s.includes("verifyQuiz()") && s.includes('BA lượt "Đố bạn"'))) bad('Bảng kiểm máy tự kiểm không còn mục nghiệm thu tầng đố bạn (verifyQuiz() + BA lượt "Đố bạn") — thiếu mục này thì game bỏ hẳn lượt em đặt đề mà vẫn báo ĐẠT.');
{
  const qItem = MACHINE_ITEMS.find((s) => s.includes("verifyQuiz()")) || '';
  for (const clause of ['tools/data/quiz.mjs', 'NGUYÊN VĂN', 'mạch kiến thức', 'CUỐI mỗi hiệp', 'chín lượt còn lại', 'ngân hàng đề', 'một hàng ba mẫu câu', '>= 20px', '6 giây', 'không bật microphone', 'không hiện sẵn đáp án', 'MỘT động tác', 'mã điều khiển', '1 sải tay', 'đề lệch', 'không trừ tim', 'không cắt chuỗi', 'Em chịu, bạn đáp giúp', '+5 điểm', 'Cả nhóm', 'Em đố hôm nay', 'Copy tờ rời']) {
    if (!qItem.includes(clause)) bad(`Mục verifyQuiz() của bảng kiểm không còn nêu "${clause}" — bảng kiểm lỏng hơn quy định trong tools/lib/quiz.mjs thì game thiếu lượt đố vẫn được đóng dấu ĐẠT.`);
  }
  if (!HUMAN_CHECKS.some((s) => s.includes('Đố bạn') && s.includes('động tác'))) bad('Bảng kiểm hết việc người thử cho tầng đố bạn — cô không bấm thử lượt đố thì không ai biết thẻ "Đố bạn" có thật hay chỉ là chữ trên màn hình.');
}
{
  const folkItem = MACHINE_ITEMS.find((s) => s.includes('verifyFolk()'));
  for (const clause of ['tools/data/folk.mjs', 'NGUYÊN VĂN', 'tên <= 4 từ', '"Cách chơi"', 'nhãn mini-trạm', 'không chiếm góc HUD của tên môn', 'cột `chant`', '<= 8 tiếng', 'BA lần một phiên', 'vạch nhịp 8 nhịp', '"miti-mute"', 'không lời đếm nào bị gọi là "đồng dao"', 'tám món FOLK_PROPS', 'alpha <= 0.45', 'không một lượt nào trong 12 lượt đòi em cầm vật thật', '"Nhảy lò cò"', '"Trồng cây chuối"', '"Bịt mắt bắt dê"', '"Rồng rắn chạy vòng"', '"Kéo co dây thật"', '1 sải tay', 'dép lê / lớp chật']) {
    if (folkItem && !folkItem.includes(clause)) bad(`Mục bảng kiểm "verifyFolk()" không còn nêu "${clause}" — mục nghiệm thu tầng sân chơi phải liệt kê đủ bốn điều verifyFolk() kiểm; bớt một vế là chỗ hỏng đó lọt qua nghiệm thu.`);
  }
}
if (!HUMAN_CHECKS.some((s) => /sân trường/.test(s) && /vật thật/.test(s))) bad('Bảng việc người thử không còn câu hỏi trò chơi có phải trò em thật sự từng chơi ở sân trường và game có lúc nào đòi cầm vật thật không — máy so được chuỗi với bảng dữ liệu nhưng không biết trò đó có tồn tại ở sân trường em không.');
{
  const folkCheck = HUMAN_CHECKS.find((s) => s.includes('chơi thử một phiên ngay tại chỗ'));
  for (const clause of ['trò chơi dân gian', 'sân trường', 'Đọc to lời hô theo nhịp', 'hô khớp vạch nhịp', 'sớm hơn động tác', 'cầm, nhặt, thổi vật thật', 'năm trò đã bị loại', '"Nhảy lò cò"', '"Trồng cây chuối"', '"Bịt mắt bắt dê"', '"Rồng rắn chạy vòng"', '"Kéo co dây thật"', '1 sải tay']) {
    if (folkCheck && !folkCheck.includes(clause)) bad(`Việc người thử "chơi thử một phiên ngay tại chỗ" không còn nêu "${clause}" — người thử phải đi hết bốn điều của verifyFolk() bằng tay; thiếu một vế thì lỗi thật ở đúng chỗ đó không ai nhìn thấy.`);
  }
}
// Chữ "đồng dao" là thứ DỄ bị đổi nhất khi người sửa thấy một lời đếm: nếu lib gọi nó là "vè" hay
// "ca dao" thì bảy lời cam kết ở data mất chỗ đối chiếu, và cô giáo không còn biết dòng nào là thật.
if (!FOLK.dongDao.includes('"dong dao"') || !FOLK.dongDao.includes('"dem"')) bad('FOLK.dongDao không còn nêu hai giá trị nhãn `dong dao` và `dem` của cột loai — quy định mất chỗ dựa thì bảy dòng đồng dao trong data thành lời hứa miệng.');

// Vòng 18: bảng môn thể thao là DỮ LIỆU theo MÃ ĐIỀU KHIỂN. GESTURES có 14 mã nên bảng môn phải phủ đủ
// 14; thiếu mã thì builder throw, nhưng sửa nội dung (đổi tên môn, viết dài động tác, để hai mã trùng
// một môn) thì không tầng nào bắt — nên đối chiếu thẳng ở đây.
{
  const codes = Object.keys(GESTURES);
  for (const c of codes) if (!SPORT_KEYS.includes(c)) bad(`GESTURES có mã ${c} nhưng sports.mjs chưa có dòng môn thể thao — bổ sung mon/dongTac/hieuLenh/loiHay/duoiCo.`);
  for (const k of SPORT_KEYS) if (!GESTURES[k]) bad(`sports.mjs có dòng ${k} không có trong GESTURES — bảng môn gắn theo mã điều khiển, không được tự thêm mã.`);
  if (SPORT_KEYS.length !== codes.length) bad(`sports.mjs có ${SPORT_KEYS.length} dòng nhưng GESTURES có ${codes.length} mã điều khiển — bảng môn phải phủ đủ.`);
  const TU_CAP = { mon: 4, dongTac: 6, hieuLenh: 4, loiHay: 6, duoiCo: 6 };
  const seenMon = new Map();
  for (const k of SPORT_KEYS) {
    const s = SPORTS[k];
    for (const f of ['mon', 'dongTac', 'hieuLenh', 'loiHay', 'duoiCo']) {
      if (!s[f] || !String(s[f]).trim()) { bad(`sports.mjs.${k}: thiếu trường ${f}.`); continue; }
      const w = soTu(s[f]);
      if (w > TU_CAP[f]) bad(`sports.mjs.${k}.${f} = "${s[f]}" dài ${w} từ, trần ${TU_CAP[f]} từ — tên môn và động tác phải ngắn để còn nằm vừa góc HUD và mascot đọc xong trong một hơi.`);
    }
    if (seenMon.has(s.mon)) bad(`sports.mjs: ${seenMon.get(s.mon)} và ${k} cùng mang môn "${s.mon}" — mỗi mã điều khiển một môn riêng, hai kiểu điều khiển tập trùng một môn thì trẻ không phân biệt được mình đang làm gì.`);
    else seenMon.set(s.mon, k);
    if (/[\u3400-\u9fff\u3040-\u30ff]/.test(JSON.stringify(s))) bad(`sports.mjs.${k}: lẫn ký tự CJK.`);
  }
  // Con số dùng CHUNG với tầng thể dục: động tác duỗi của môn nằm TRONG cửa sổ hạ nhiệt và trần tải
  // trọng của môn dẫn chiếu đúng số của PE. Hai lib tự nhất quán nên pin đơn lib không bắt được lệch.
  if (!SPORT.hoiTinh.includes('45–60 giây') || !PE.coolDown.includes('45–60')) bad('Cửa sổ hạ nhiệt lệch giữa tools/lib/sport.mjs và tools/lib/pe.mjs — động tác duỗi của môn sẽ rơi khỏi khoảng PE đã quy định.');
  if (!SPORT.hoiTinh.includes('15 giây') || !PE.coolDown.includes('15 giây')) bad('Thời lượng một động tác duỗi không còn là 15 giây ở cả sport.mjs lẫn pe.mjs — tầng thể thao phải dùng đúng suất thời lượng PE đã chia.');
  for (const num of ['90 độ', '15 giây']) if (!SPORT.dongTacChinh.includes(num) || !PE.loadCap.includes(num)) bad(`Trần tải trọng "${num}" lệch giữa sport.mjs và pe.mjs — một trong hai lib đã đổi số còn lib kia thì không.`);
  // Vạch đích tiếp sức KHÔNG có số riêng: nó mượn đúng một thanh đích mà tầng thi đua đã dựng, nên
  // reference phải còn ở cả hai phía. Probe vòng 18f: xóa `HYPE.sharedGoal` khỏi sport.mjs vẫn xanh vì
  // HUD "Đội mình" trong tiepSuc tự nó là một chuỗi hợp lệ — chỉ so với lib kia mới thấy nó là bản second.
  if (!SPORT.tiepSuc.includes('HYPE.sharedGoal') || !HYPE.sharedGoal) bad('Đường tiếp sức không còn dùng lại thanh đích chung của tầng thi đua (`HYPE.sharedGoal`) — hai vạch đích trên một HUD sẽ cạnh tranh nhau chỗ và cạnh tranh luôn sự chú ý của bốn em.');
}
// Vòng 22: bảng trò chơi dân gian cũng là DỮ LIỆU theo MÃ ĐIỀU KHIỂN, và nó mang hai thứ mà các
// tầng khác không có: TÊN TRÒ THẬT (game tự bịa "trò vận động cùng bạn" thì không em nào nhận ra) và
// LỜI HÔ gán nhãn "đồng dao" (cô nghe ra ngay lời đếm bịa, và mất tin vào cả phần còn lại). Sửa nội
// dung trong tools/data/folk.mjs — đổi tên trò, viết dài chant, gọi một lời đếm là đồng dao — thì không
// tầng nào ở trên bắt được, nên đối chiếu thẳng ở đây.
{
  const codes = Object.keys(GESTURES);
  for (const c of codes) if (!FOLK_KEYS.includes(c)) bad(`GESTURES có mã ${c} nhưng folk.mjs chưa có dòng trò chơi dân gian — bổ sung tro/loiCho/chant/loai/doDung/dieu.`);
  for (const k of FOLK_KEYS) if (!GESTURES[k]) bad(`folk.mjs có dòng ${k} không có trong GESTURES — bảng trò gắn theo mã điều khiển, không được tự thêm mã.`);
  if (FOLK_KEYS.length !== codes.length) bad(`folk.mjs có ${FOLK_KEYS.length} dòng nhưng GESTURES có ${codes.length} mã điều khiển — bảng trò phải phủ đủ.`);
  const TU_CAP = { tro: 4, loiCho: 8 };
  const seenTro = new Map();
  for (const k of FOLK_KEYS) {
    const f = FOLK_BANK[k];
    for (const fld of ['tro', 'loiCho', 'chant', 'loai', 'doDung', 'dieu']) {
      if (!f[fld] || !String(f[fld]).trim()) bad(`folk.mjs.${k}: thiếu trường ${fld} — builder sẽ in ra một chỗ trống ngay giữa dòng luật sân chơi.`);
    }
    for (const fld of ['tro', 'loiCho']) {
      const w = soTu(f[fld] || '');
      if (w > TU_CAP[fld]) bad(`folk.mjs.${k}.${fld} = "${f[fld]}" dài ${w} từ, trần ${TU_CAP[fld]} từ — tên trò còn phải nằm vừa dòng "Cách chơi" dưới màn chào, còn cách chơi thì mascot phải đọc xong trong một hơi.`);
    }
    // chant đo bằng TIẾNG chứ không phải bằng từ: tiếng Việt một từ = một tiếng, nên đếm từ là đếm
    // tiếng. Trần 8 tiếng là đúng một vạch nhịp — dài hơn thì vai "Cổ vũ" hô chưa xong đã hết nhịp.
    const tieng = soTu(f.chant || '');
    if (tieng > 8) bad(`folk.mjs.${k}.chant = "${f.chant}" dài ${tieng} tiếng, trần 8 tiếng — câu hô dài hơn một vạch nhịp 8 nhịp thì chant biến thành một câu đọc chứ không phải nhịp tập thể dục.`);
    if (!FOLK_PROPS.includes(f.doDung)) bad(`folk.mjs.${k}.doDung = "${f.doDung}" không nằm trong tám món FOLK_PROPS — đồ dùng ngoài ngân hàng sân trường thì trường làng không có, và quy định "một màu, alpha <= 0.45" cũng không còn áp dụng cho nó.`);
    if (!['dong', 'tinh'].includes(f.dieu)) bad(`folk.mjs.${k}.dieu = "${f.dieu}" không phải "dong" hay "tinh" — dòng tổng kết "Trò chơi hôm nay: <trò> — bản <động/tĩnh> tại chỗ" không còn giá trị để in.`);
    if (!['dong dao', 'dem'].includes(f.loai)) bad(`folk.mjs.${k}.loai = "${f.loai}" không phải "dong dao" hay "dem" — chỉ hai nhãn đó phân biệt được lời hô có thật với lời đếm do thư viện soạn.`);
    if (seenTro.has(f.tro)) bad(`folk.mjs: ${seenTro.get(f.tro)} và ${k} cùng mang trò "${f.tro}" — hai kiểu điều khiển cùng một trò thì dòng "Trò chơi hôm nay" của hai game cạnh nhau không còn khác nhau.`);
    else seenTro.set(f.tro, k);
    if (/[\u3400-\u9fff\u3040-\u30ff]/.test(JSON.stringify(f))) bad(`folk.mjs.${k}: lẫn ký tự CJK.`);
  }
  // Mỗi món trong ngân hàng tám đồ dùng phải có ÍT NHẤT một game dùng: món không ai dùng là chữ trang
  // trí trong bảng, và người đọc prompt không còn cách nào biết nó thật sự xuất hiện trên màn hình.
  for (const p of FOLK_PROPS) if (!FOLK_KEYS.some((k) => FOLK_BANK[k].doDung === p)) bad(`FOLK_PROPS có "${p}" nhưng không dòng trò nào mang cột doDung giá trị đó — một món không game nào dùng thì nó nằm trong bảng cho đủ tám, còn game thật lại vẽ đồ dùng khác.`);
  // Nhãn "dong dao" là một LỜI CAM KẾT văn hóa, không phải metadata: bảy dòng dưới là lời đồng dao thật
  // trong trí nhớ sân trường. Thêm dòng mang nhãn này mà không có trong danh sách thì validate dừng —
  // người thêm phải tự xác nhận đó là lời thật, vì không code nào phân biệt được đồng dao với lời đếm.
  const DONG_DAO = [
    'Chi chi chành chành',
    'Kéo cưa lừa xẻ, ông thợ nào khỏe',
    'Chim bay cò bay',
    'Gánh gánh gồng gồng',
    'Rồng rắn lên mây, có cây lúc lắc',
    'Thả đỉa ba ba, con đỉa bắt mày',
    'Tập tầm vông, tay không tay có',
  ];
  const labeled = FOLK_KEYS.filter((k) => FOLK_BANK[k].loai === 'dong dao');
  if (labeled.length !== DONG_DAO.length) bad(`folk.mjs có ${labeled.length} dòng gắn nhãn "dong dao" nhưng danh sách đồng dao thật chốt ở validate là ${DONG_DAO.length} — thêm dòng mang nhãn này là phải xác nhận đó là lời đồng dao có thật, không phải lời đếm tự soạn.`);
  for (const k of labeled) if (!DONG_DAO.includes(FOLK_BANK[k].chant)) bad(`folk.mjs.${k} gắn nhãn "dong dao" cho chant "${FOLK_BANK[k].chant}" — dòng đó không nằm trong bảy lời đồng dao đã xác nhận. Gọi một lời đếm là "đồng dao" trước lớp thì cô và trò đều nghe ra, và cả phần còn lại của game mất tin.`);
  // Năm trò bị loại phải được NÊU ĐÍCH DANH ở cả lib lẫn bảng kiểm — chỉ ghi "năm trò bị cấm" chung
  // chung thì game dựng lại "Nhảy lò cò" dưới một tên na ná vẫn báo ĐẠT.
  for (const b of FOLK_BANNED) {
    if (!FOLK.banAnToan.includes(b.tro)) bad(`FOLK_BANNED có "${b.tro}" nhưng quy định FOLK.banAnToan không nêu đích danh — game dựng lại trò đã loại dưới một tên na ná vẫn vượt qua luật.`);
    if (!FOLK.guard.includes(b.tro)) bad(`FOLK_BANNED có "${b.tro}" nhưng bốn điều của verifyFolk() không nêu tên — mục bảng kiểm không còn cơ sở để chặn.`);
  }
  if (FOLK_BANNED.length !== 5) bad(`FOLK_BANNED có ${FOLK_BANNED.length} trò nhưng lib và bảng kiểm đang chốt "năm trò bị loại" — thêm hay bớt trò phải sửa cả ba chỗ cùng lúc, không để luật nói năm mà danh sách nói bốn.`);
  // Con số của tầng sân chơi MƯỢN từ tầng khác; đổi một bên thì 85 prompt mang hai chuẩn mâu thuẫn.
  if (!FOLK.banAnToan.includes('1 sải tay') || !PLAYZONE.depCho.includes('1 sải tay')) bad('Khoảng cách an toàn lệch giữa tools/lib/folk.mjs và tools/lib/playzone.mjs — một tầng đổi sang mét hay "một bước" là trò dân gian và thẻ dẹp chỗ chơi mô tả hai không gian khác nhau.');
  if (!FOLK.banAnToan.includes('90 độ') || !PE.loadCap.includes('90 độ')) bad('Hình quạt 90 độ lệch giữa folk.mjs và pe.mjs — bản "tại chỗ" của trò dân gian sẽ thoát trần xoay thân mà tầng thể dục đã đặt.');
  if (!FOLK.dongDao.includes('8 nhịp') || !RHYTHM.move.includes('8 nhịp')) bad('Vạch nhịp 8 nhịp lệch giữa folk.mjs và rhythm.mjs — lời hô đếm theo vạch mà nhạc nền không cùng nhịp thì em hô trước động tác một nhịp.');
  if (!FOLK.dongDao.includes('3 câu thoại mỗi phút') || !IDENTITY.lines.includes('3 câu thoại mỗi phút')) bad('Ngân sách giọng "3 câu thoại mỗi phút" không còn được cả tầng mascot lẫn tầng chant viện — chant sẽ đè lên lời mascot đọc đề.');
  if (!FOLK.doiBan.includes('3 lượt') || !QUEUE.rotate.includes('3 lượt mỗi em')) bad('Trần 3 lượt một vai lệch giữa folk.mjs và queue.mjs — trò đôi bạn sẽ đòi em cầm máy lâu hơn suất mà tầng vai chờ đã chia.');
  if (!FOLK.doDung.includes('<= 0.45') || !SPORT.tiepSuc.includes('<= 0.45')) bad('Trần alpha đạo cụ AR <= 0.45 lệch giữa folk.mjs và sport.mjs — hai lớp đồ họa trong suốt chồng lên nhau sẽ che mất em đang chơi.');
}

// Vòng 23: bảng mẫu câu "Đố bạn" là DỮ LIỆU theo MẠCH kiến thức (khác bảng trò dân gian, vốn theo mã
// điều khiển). Sửa nội dung trong tools/data/quiz.mjs — viết dài mẫu câu, thêm chỗ trống thứ hai, bỏ
// một mạch — thì không quy định nào ở trên bắt được, nên đối chiếu thẳng ở đây.
{
  const machs = new Set(Object.values(STANDARDS).map((std) => std.mach));
  for (const m of machs) {
    let frames;
    try { frames = quizFrames(m); } catch { bad(`tools/data/quiz.mjs thiếu mạch "${m}" — game thuộc mạch này sẽ build lỗi hoặc tự bịa mẫu câu đố.`); continue; }
    if (frames.length !== 3) bad(`tools/data/quiz.mjs: mạch "${m}" có ${frames.length} mẫu câu, chuẩn là 3 — thẻ "Đố bạn" hiển thị MỘT hàng ba mẫu nên thêm hay bớt đều vỡ bố cục.`);
    for (const q of frames) {
      if ((q.match(/…/g) || []).length !== 1) bad(`tools/data/quiz.mjs: mẫu "${q}" có ${((q.match(/…/g) || []).length)} chỗ trống, chuẩn là ĐÚNG MỘT — hai chỗ trống thì em đố phải đọc hai đáp án trong một lượt.`);
      const w = soTu(q);
      if (w > 8) bad(`tools/data/quiz.mjs: mẫu "${q}" dài ${w} từ, trần 8 từ — mẫu dài hơn không nằm vừa thẻ "Đố bạn" chữ >= 20px mà em đố cũng đọc không xong trong 3 giây.`);
    }
  }
  if (QUIZ_KEYS.length !== machs.size) bad(`tools/data/quiz.mjs có ${QUIZ_KEYS.length} mạch nhưng STANDARDS đang dùng ${machs.size} mạch — bảng mẫu câu phải phủ đủ, không tự thêm mạch lạ.`);
  for (const m of QUIZ_KEYS) if (!machs.has(m)) bad(`tools/data/quiz.mjs có mạch "${m}" không game nào thuộc mạch đó — bảng mẫu câu lệch chuẩn SGK thì em đố một câu ngoài mạch đang học.`);
  for (const m of QUIZ_KEYS) if (/[\u3400-\u9fff\u3040-\u30ff]/.test(JSON.stringify(QUIZ_BANK[m]))) bad(`tools/data/quiz.mjs.${m}: lẫn ký tự CJK.`);
  // Probe vòng 23: sửa chữ một mẫu câu ngay trong tools/data/quiz.mjs thì prompt và biến thể cùng đổi
  // theo (builder đọc thẳng data), nên không một pin nào ở trên thấy lệch. Đối chiếu nguyên văn cả 24
  // mẫu câu với bản chốt ở đây — đổi chữ là 85 prompt phải đổi cùng một lần, không đổi âm thầm.
  const QUIZ_BANK_EXPECT = {
  'Số và phép tính': ['Kết quả đúng là số …?', 'Số còn thiếu là số …?', 'Ở hàng …, chữ số là mấy?'],
  'Hình học và đo lường': ['Hình này có … cạnh?', 'Góc này là góc …?', 'Chu vi hình bằng …?'],
  'Giải toán có lời văn': ['Bước đầu ta tìm …?', 'Đáp số của bài là …?', 'Bài toán hỏi nhiều hơn …?'],
  'Một số yếu tố thống kê và xác suất': ['Cột cao nhất là …?', 'Bảng có … số liệu?', 'Sự kiện nào chắc chắn …?'],
  'Đọc và viết': ['Read the word: …?', 'Which letter is missing, …?', 'Spell the word: …?'],
  'Nghe và nói': ['Can you say it, …?', 'Say the number: …?', 'Listen and repeat: …?'],
  'Kiến thức ngôn ngữ': ['Choose the correct word, …?', 'What is the opposite of …?', 'Which word comes next, …?'],
  'Ôn tập tổng hợp': ['Câu này đúng hay …?', 'Bạn chọn đáp án …?', 'Thiếu số nào đây, …?'],
  };
  for (const m of Object.keys(QUIZ_BANK_EXPECT)) {
    const got = (QUIZ_BANK[m] || []).join(" · ");
    const want = QUIZ_BANK_EXPECT[m].join(" · ");
    if (got !== want) bad(`tools/data/quiz.mjs mạch "${m}" lệch bản chốt:\n    đang là "${got}"\n    chuẩn là "${want}" — sửa mẫu câu là sửa lời em đọc trước lớp, phải đổi cùng lúc ở 85 prompt, 425 block và bảng kiểm.`);
  }
  if (QUIZ_KEYS.length !== Object.keys(QUIZ_BANK_EXPECT).length) bad(`tools/data/quiz.mjs có ${QUIZ_KEYS.length} mạch nhưng bản chốt ở validate là ${Object.keys(QUIZ_BANK_EXPECT).length} mạch — thêm hay bớt mạch phải sửa cả STANDARDS và master §4.13.`);
  const QBE = Object.keys(QUIZ_BANK_EXPECT);
  for (const m of QBE) {
    const inStandards = Object.values(STANDARDS).some((std) => std.mach === m);
    if (!inStandards) bad(`validate chốt mạch "${m}" nhưng không cụm kiến thức nào trong standards.mjs mang mạch đó — bảng chốt và SGK đã lệch nhau.`);
  }
  // Các con số lượt đố MƯỢN từ tầng khác; đổi một bên thì 85 prompt mang hai chuẩn mâu thuẫn.
  if (!QUIZ.dapCuaBan.includes('1 sải tay') || !PLAYZONE.depCho.includes('1 sải tay')) bad('Khoảng cách an toàn lệch giữa tools/lib/quiz.mjs và tools/lib/playzone.mjs — lượt đố sẽ vẽ lại một vùng đứng khác vùng đã dẹp chỗ chơi.');
  if (!QUIZ.dapCuaBan.includes('90 độ') || !PE.loadCap.includes('90 độ')) bad('Hình quạt 90 độ lệch giữa quiz.mjs và pe.mjs — động tác đáp án sẽ thoát trần xoay thân mà tầng thể dục đã đặt.');
  if (!QUIZ.cachDo.includes('>= 20px') || !CURRICULUM.bayTruoc.includes('>= 20px')) bad('Cỡ chữ thẻ >= 20px lệch giữa quiz.mjs và curriculum.mjs — thẻ "Đố bạn" nhỏ hơn thẻ báo-trước thì em ngồi sau không đọc được đề.');
  if (!QUIZ.cachDo.includes('6 giây') || !CURRICULUM.bayTruoc.includes('6 giây')) bad('Trần 6 giây của thẻ lệch giữa quiz.mjs và curriculum.mjs — hai loại thẻ trên cùng một HUD sống hai khoảng thời gian khác nhau.');
  if (!QUIZ.diemVai.includes('+5 điểm') || !QUEUE.teamScore.includes('+5')) bad('Điểm +5 vai phụ lệch giữa quiz.mjs và queue.mjs — lượt đố và vai chờ sẽ cộng vào thanh "Cả nhóm" theo hai mức khác nhau.');
  if (!QUIZ.diemVai.includes('miti-best') || !QUEUE.teamScore.includes('miti-best')) bad('Quy ước không cộng vào "miti-best" không còn ở cả quiz.mjs lẫn queue.mjs — điểm đố sẽ tràn vào xếp hạng cá nhân.');
  if (!QUIZ.diemVai.includes('Copy tờ rời') || !QUEUE.teamScore.includes('Copy tờ rời')) bad('Dòng tổng kết lượt đố không còn nằm trong khối "Copy tờ rời" của tầng vai chờ — giáo viên copy một lần sẽ mất phần đố bạn.');
  if (!QUIZ.xuLyLech.includes('3 câu thoại mỗi phút') || !IDENTITY.lines.includes('3 câu thoại mỗi phút')) bad('Ngân sách giọng "3 câu thoại mỗi phút" không còn được cả tầng mascot lẫn tầng đố bạn viện — câu đỡ của mascot sẽ đè lên lời đọc đề.');
  if (!QUIZ.dapCuaBan.includes('Thư ký') || !QUEUE.roles.includes('Thư ký')) bad('Vai "Thư ký" đọc lại đề bị lệch giữa quiz.mjs và queue.mjs — lượt đố sẽ giao việc cho một vai chờ không tồn tại trên HUD.');
  if (!QUIZ.guard.includes('Bản một học sinh') || !QUEUE.guard.includes('Bản một học sinh')) bad('Bản một học sinh không còn được cả hai tầng đố bạn và vai chờ quy định — game một em sẽ tự chọn bỏ lượt đố hay bỏ HUD vai chờ.');
}
// Vòng 19: tầng gia đình KHÔNG tự đặt con số nào — trần 16 từ mượn của tầng nhẹ đầu, trần 12 từ và
// động tác 3 giây mượn của tầng chuẩn kiến thức, khối "Copy tờ rời" và dòng "Cả nhóm" mượn của tầng
// thi đua/chuẩn. Mỗi lib đứng riêng vẫn tự nhất quán nên pin đơn lib không thấy lệch; chỉ đối chiếu
// trực tiếp hai lib mới phát hiện một bên đã âm thầm đổi số.
{
  if (!FAMILY.baPhut.includes('<= 16 từ') || !LIGHT.shortPrompt.includes('16 từ')) bad('Trần độ dài đề lệch giữa tools/lib/family.mjs và tools/lib/light.mjs — đề mang về nhà dài hơn đề trên màn hình thì "việc 3 phút" biến thành giờ luyện đọc.');
  if (!FAMILY.meoNha.includes('<= 12 từ') || !CURRICULUM.meoDongTac.includes('<= 12 từ')) bad('Trần độ dài mẹo nhớ lệch giữa tools/lib/family.mjs và tools/lib/curriculum.mjs — hai bản mẹo dài ngắn khác nhau là con phải nhớ hai lần.');
  if (!FAMILY.meoNha.includes('động tác 3 giây') || !CURRICULUM.meoDongTac.includes('động tác 3 giây')) bad('Động tác kèm mẹo nhớ không còn cùng một suất 3 giây ở hai tầng — bố mẹ làm theo động tác khác động tác mascot vừa dạy.');
  if (!FAMILY.guiBoMe.includes('Copy tờ rời') || !CURRICULUM.ycDong.includes('Copy tờ rời')) bad('Tờ "Gửi bố mẹ" không còn nằm trong khối "Copy tờ rời" của tầng chuẩn kiến thức — giáo viên copy một lần mà mất phần của gia đình.');
  if (!FAMILY.riengTu.includes('Cả nhóm: <x>/<mốc>') || !HYPE.sharedGoal.includes('Cả nhóm: <x>/<mốc>')) bad('Dòng thành tích tập thể trên tờ gửi về không còn chép đúng định dạng của tầng thi đua — hai chỗ cùng nói "Cả nhóm" theo hai kiểu là bốn em không biết đọc số nào.');
  for (const k of SPORT_KEYS) if (!SPORTS[k].dongTac) bad(`sports.mjs.${k}: thiếu cột dongTac — dòng "Việc 3 phút ở nhà" của mọi game gắn theo mã này sẽ rỗng, và bố mẹ không biết cùng con làm động tác gì.`);
}

// Mỗi prompt game phải mang đúng MÔN của chính mã điều khiển mình, không phải danh sách môn chung.
for (const g of GAMES) {
  const s = SPORTS[g.gestures[0]];
  const std = STANDARDS[g.cluster];
  if (!s) continue;
  const rel = PATH_OF.get(g.id);
  if (!rel || !fs.existsSync(path.join(ROOT, rel))) continue;
  const t = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const [needle, label] of [
    // Khối luật phải được GỌI TÊN kèm vòng sinh ra nó: bảy quy định đứng trơ thì người đọc prompt không
    // biết chúng chữa cái lỗ "0/85 môn thể thao" đo được ở vòng 18.
    ['- CHẤT THỂ THAO (vòng 18:', 'nhãn khối chất thể thao kèm khảo sát'],
    // Tên môn đứng một mình thì yếu: quy định monDanh đã nêu ví dụ trong mọi prompt. Neo liền mã điều
    // khiển + tên môn + động tác, để block khác môn bị đổi vẫn bị bắt.
    [`(mã điều khiển ${g.gestures[0]}, không tự đổi môn trong một phiên): **${s.mon}** — động tác đặc trưng "${s.dongTac}"`, 'dòng môn + động tác của ĐÚNG mã điều khiển'],
    [`hiệu lệnh mở đầu "${s.hieuLenh}"`, 'hiệu lệnh của môn'],
    [`lời hay khi bạn sai "${s.loiHay}"`, 'lời hay của môn khi bạn sai'],
    [`động tác duỗi cơ cuối buổi "${s.duoiCo}"`, 'động tác duỗi riêng của môn'],
  ]) {
    if (!t.includes(needle)) bad(`${g.id}: prompt thiếu ${label} của môn ${s.mon} ("${needle.slice(0, 48)}") — builder phải lấy thẳng tools/data/sports.mjs theo mã ${g.gestures[0]}.`);
  }
  // Tầng gia đình cũng nối vào đúng dữ liệu của game này: bốn dòng tờ gửi về mang tên môn, nhãn mạch,
  // mẹo nguyên văn và động tác đặc trưng. Probe vòng 19 nhắm vào đây: nếu builder chỉ để "<môn> <mẹo>"
  // chung chung thì 85 prompt vẫn xanh mà tờ gửi về nhà của mọi game lại giống nhau một màu.
  if (std) {
    for (const [needle, label] of [
      ['- GIA ĐÌNH — TỜ GỬI BỐ MẸ (vòng 19:', 'nhãn khối gia đình kèm khảo sát'],
      [`Bốn dòng của khối "Gửi bố mẹ" ở màn tổng kết`, 'dòng dữ liệu gia đình'],
      [`"Hôm nay con tập môn **${s.mon}** — <n> động tác"`, 'dòng 1 mang tên môn của chính game này'],
      [`"Con học ${std.ngan}, <k> câu đúng trên <tổng>"`, 'dòng 2 mang nhãn mạch của chính cụm này'],
      [`"Mẹo con mang về: ${std.meo}"`, 'dòng 3 mang mẹo nguyên văn của chính cụm này'],
      [`"Việc 3 phút ở nhà: cả nhà cùng ${s.dongTac} rồi hỏi nhau miệng một đề vừa chơi"`, 'dòng 4 mang động tác đặc trưng của chính môn này'],
    ]) {
      if (!t.includes(needle)) bad(`${g.id}: prompt thiếu ${label} ("${needle.slice(0, 48)}") — tờ gửi bố mẹ phải nối tools/data/sports.mjs và tools/data/standards.mjs của đúng game, không được để chỗ trống chung.`);
    }
  }
}

// Mỗi prompt game phải mang ĐÚNG TRÒ của mã điều khiển mình, kèm chant, đồ dùng và loại động/tĩnh.
// Probe vòng 22: builder thay dòng dữ liệu bằng một câu chung chung ("hôm nay em chơi một trò dân
// gian") thì khối SÂN CHƠI VIỆT NAM vẫn nguyên, 85 prompt vẫn xanh, mà không em nào biết trò của mình
// là trò nào — nên neo từng mẩu dữ liệu ngay trong prompt đã sinh.
for (const g of GAMES) {
  const f = FOLK_BANK[g.gestures[0]];
  if (!f) continue;
  const rel = PATH_OF.get(g.id);
  if (!rel || !fs.existsSync(path.join(ROOT, rel))) continue;
  const t = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const [needle, label] of [
    ['- SÂN CHƠI VIỆT NAM (vòng 22:', 'nhãn khối sân chơi kèm khảo sát'],
    [`(cùng mã điều khiển ${g.gestures[0]}, lấy nguyên văn từ \`tools/data/folk.mjs\`, không tự đổi trò trong một phiên): **${f.tro}**`, 'tên trò của ĐÚNG mã điều khiển'],
    [`cách chơi "${f.loiCho}"`, 'dòng cách chơi của trò'],
    [`lời hô theo nhịp "${f.chant}" (\`${f.loai}\`)`, 'chant kèm nhãn loại lời hô'],
    [`đồ dùng AR "${f.doDung}"`, 'đồ dùng sân trường của trò'],
    [`trò ${f.dieu}.`, 'loại động hay tĩnh của trò'],
    ['KHÔNG chiếm góc HUD của tên môn', 'câu cấm tên trò giành góc HUD của tên môn'],
  ]) {
    if (!t.includes(needle)) bad(`${g.id}: prompt thiếu ${label} của trò ${f.tro} ("${needle.slice(0, 48)}") — builder phải lấy thẳng tools/data/folk.mjs theo mã ${g.gestures[0]}.`);
  }
}

// Mỗi prompt game phải mang đúng BA MẪU CÂU của mạch kiến thức mình. Probe vòng 23: builder thay dòng
// dữ liệu bằng "em đố bạn một câu hỏi trong mạch" thì khối ĐỐ BẠN vẫn nguyên, 85 prompt vẫn xanh, mà
// không game nào biết mẫu câu nào thuộc mạch nào — nên neo từng mẫu câu ngay trong prompt đã sinh.
for (const g of GAMES) {
  const stdQ = STANDARDS[g.cluster];
  if (!stdQ) continue;
  const qf = quizFrames(stdQ.mach);
  const rel = PATH_OF.get(g.id);
  if (!rel || !fs.existsSync(path.join(ROOT, rel))) continue;
  const t = fs.readFileSync(path.join(ROOT, rel), "utf8");
  for (const [needle, label] of [
    ['- ĐỐ BẠN — EM ĐẶT ĐỀ CHO BẠN ĐÁP (vòng 23:', 'nhãn khối đố bạn kèm khảo sát'],
        [`- Mẫu câu "Đố bạn" của game này (mạch "${stdQ.mach}"`, 'dòng dữ liệu mẫu câu kèm đúng mạch của game'],
        [`"${qf[0]}" · "${qf[1]}" · "${qf[2]}"`, 'ba mẫu câu nguyên văn của ĐÚNG mạch này'],
    ['đúng BA/12 lượt ở cuối mỗi hiệp', 'trần lượt đố nêu ngay trong prompt game'],
  ]) {
    if (!t.includes(needle)) bad(`${g.id}: prompt thiếu ${label} ("${needle.slice(0, 48)}") — builder phải lấy thẳng tools/data/quiz.mjs theo mạch ${stdQ.mach}.`);
  }
}

if (errors.length) {
  console.error('Xác minh thất bại — ' + errors.length + ' vấn đề:');
  for (const e of errors.slice(0, 40)) console.error('  • ' + e);
  if (errors.length > 40) console.error('  ... và ' + (errors.length - 40) + ' vấn đề khác.');
  process.exit(1);
}
console.log(`Xác minh đạt: ${rows.length} dòng catalog, ${GAMES.length} prompt game, ${VAR_COUNT} prompt biến thể, ${CLUSTER_KEYS.length} cụm kiến thức, ${LEGACY.length} prompt legacy, ${cat.games.length + cat.legacy.length} card dashboard, bảng kiểm ${checkRows}/${MACHINE_ITEMS.length} mục máy + ${HUMAN_CHECKS.length} việc người thử.`);
