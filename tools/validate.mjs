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
import { IDENTITIES } from './data/identities.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const errors = [];
const bad = (msg) => errors.push(msg);

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
  for (const [needle, label, ...mins] of [...RHYTHM_DOC_NEEDLES, ...VOICE_DOC_NEEDLES]) {
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

if (errors.length) {
  console.error('Xác minh thất bại — ' + errors.length + ' vấn đề:');
  for (const e of errors.slice(0, 40)) console.error('  • ' + e);
  if (errors.length > 40) console.error('  ... và ' + (errors.length - 40) + ' vấn đề khác.');
  process.exit(1);
}
console.log(`Xác minh đạt: ${rows.length} dòng catalog, ${GAMES.length} prompt game, ${VAR_COUNT} prompt biến thể, ${CLUSTER_KEYS.length} cụm kiến thức, ${LEGACY.length} prompt legacy, ${cat.games.length + cat.legacy.length} card dashboard, bảng kiểm ${checkRows}/${MACHINE_ITEMS.length} mục máy + ${HUMAN_CHECKS.length} việc người thử.`);
