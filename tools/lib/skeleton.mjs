// Khung prompt dùng chung: thứ tự mục và ngân sách kích thước.
// build-prompts, upgrade-legacy, build-master đều ghép prompt qua đây; validate lấy heading từ SECTIONS.

import { HYPE } from './hype.mjs';
import { FEEL, MOTION } from './feel.mjs';
import { CLASSROOM } from './classroom.mjs';
import { MEMORY } from './memory.mjs';
import { VERIFY, ADAPT } from './verify.mjs';
import { PE, PE_NO_CAMERA } from './pe.mjs';
import { ACCESS } from './access.mjs';
import { RULES } from './rules.mjs';
import { AR_RENDER, AR_COMPACT, TASKS_VISION } from './ar.mjs';
import { PLAYERS } from './players.mjs';
import { INPUT } from './input.mjs';
import { COMPETE } from './compete.mjs';
import { EFFECTS } from './effects.mjs';

// Thứ tự cố định: 4 Core_Section trước, rồi dữ liệu, rồi phần kỹ thuật/phụ.
export const SECTIONS = [
  { key: 'hook',    title: '1. VÒNG LẶP THU HÚT',               core: true },
  { key: 'players', title: '2. CHẾ ĐỘ 1/2/3 NGƯỜI VÀ THI ĐUA',    core: true },
  { key: 'motion',  title: '3. CHƠI VẬN ĐỘNG',                   core: true },
  { key: 'memory',  title: '4. GHI NHỚ BÀI HỌC',                 core: true },
  { key: 'data',    title: '5. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)' },
  { key: 'tech',    title: '6. KỸ THUẬT: NỀN AR, CAMERA, FALLBACK' },
  { key: 'ui',      title: '7. GIAO DIỆN, AN TOÀN, TIẾP CẬN' },
  { key: 'brand',   title: '8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML' },
  { key: 'output',  title: '9. ĐẦU RA' },
];
export const CORE_KEYS = SECTIONS.filter((s) => s.core).map((s) => s.key);

// Mỗi tệp đầu ra phải ≤ floor(SIZE_RATIO × baseline) ký tự.
export const SIZE_RATIO = 0.6;

// parts[key] là mảng dòng (giữ nguyên định dạng người gọi đưa vào).
// Trả về các mục theo đúng thứ tự SECTIONS, mỗi mục là heading + các dòng, cách nhau một dòng trống.
// Ném lỗi kèm id (g.id hoặc đường dẫn tệp) khi thiếu mục hoặc một dòng luật xuất hiện hai lần (Yêu cầu 5.6).
export function renderSections(parts, id) {
  const seen = new Set();
  const blocks = [];
  for (const s of SECTIONS) {
    const lines = parts?.[s.key];
    if (!Array.isArray(lines) || !lines.some((l) => String(l).trim())) {
      throw new Error(`${id}: thiếu mục ${s.title}`);
    }
    for (const l of lines) {
      const k = String(l).trim();
      if (!k) continue;
      if (seen.has(k)) throw new Error(`${id}: dòng luật lặp: ${k.slice(0, 40)}`);
      seen.add(k);
    }
    blocks.push([s.title, ...lines].join('\n'));
  }
  return blocks.join('\n\n');
}

const bullet = (s) => '- ' + s;
const bullets = (obj) => Object.values(obj).map(bullet);

// Tiền tố cho khối INPUT ở master (finger: 'maybe') — chưa biết game có dùng tay hay không.
export const FINGER_MAYBE_PREFIX = 'Nếu game dùng tay/ngón tay: ';

// Bố cục luồng màn (design mục 2) — validate so nguyên văn.
export const SCREEN_FLOW =
  'Bố cục: Bắt đầu → Chọn số người (1/2/3) → Kiểm tra thiết bị → Hiệu chỉnh từng làn → 2 lượt luyện mẫu → KHỞI ĐỘNG 60–90 giây → 10 giây "Em còn nhớ không?" → 12 lượt chính (Scoreboard nếu ≥ 2 người) → Ôn câu sai → HẠ NHIỆT 45–60 giây → Podium / Kỷ lục cá nhân → Chơi lại.';

// Thay dòng "Không leaderboard, không quảng cáo" cũ.
export const NO_ADS_LINE =
  'Không quảng cáo, không bảng xếp hạng online; Scoreboard chỉ gồm các em đang đứng trước máy.';

// Bốn dòng chữ ký MiTi, giữ nguyên văn từ tools/build-prompts.mjs.
export const MITI_LINES = [
  'Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.',
  'Xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; nhỏ, không che vùng tương tác.',
  'Chân trang hoặc màn kết quả có dòng: MiTi • Học bằng chuyển động.',
  'Không xóa hoặc đổi tên thương hiệu khi replay, khi vào gameplay hoặc ở chế độ không camera.',
];

// Dòng riêng của skeleton (không thuộc lớp luật nào khác).
export const SCORE_LINE =
  'Điểm: +10 nhân chuỗi đúng; 5 tim, sai trừ 1 tim nhưng vẫn hiện đủ lời giải; 12 lượt chính (theo lượt ngón tay: 8 câu mỗi em), hết lượt là tổng kết.';
export const WRONG_LINE =
  'Sai: DỪNG 2 giây, hiện lời giải, chỉ rõ bước/chữ số/từ cần sửa; câu sai xếp cuối vòng để luyện lại trong cùng phiên.';
export const SUMMARY_LINE =
  'Tổng kết theo errorTag ("Em hay sai ở: <loiViet>") kèm số câu đúng/sai theo mức độ, không chỉ báo điểm; ba thẻ "Làm tốt / Cần luyện / Động tác lần sau".';
export const PRIVACY_LINE =
  'KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân.';

// Bản ngắn cho mục data/tech/ui của legacy (sharedRuleLines compact: true). Thân legacy đã tự mô tả kỹ thuật,
// nên các dòng này gộp nhiều luật kỹ thuật vào một câu; Core_Section và EFFECTS vẫn in đầy đủ.
export const COMPACT = {
  data: '`const QUESTION_DATA = [...]` ở ĐẦU <script>, mỗi mục { id, level, prompt, choices, answer, explanation, errorTag, loiViet }, ≥ 40 mục, level 1/2/3 theo số bước, một đáp án đúng, xáo vị trí có seed; verifyQuestionBank() chạy trước vòng đầu, loại mục sai kèm console.warn tiếng Việt.',
  camera: 'Camera: Tasks Vision pin 1.0.1, getUserMedia facingMode "user" 640×480, lật gương; chỉ xin quyền SAU khi bấm BẮT ĐẦU, trạng thái tiếng Việt tới Lỗi (nút Thử lại); cử chỉ chốt ở lượt chuyển trạng thái (hysteresis + cooldown); lỗi camera/CDN/model thì vào "Chế độ không dùng camera" (chuột/chạm/phím, nút Tắt camera), học đủ 100%.',
  screen: 'Chữ to (đề >= 28px), responsive; Pause, Replay, Tắt camera, Giảm hiệu ứng; tab ẩn thì tự Tạm dừng, về đếm 3-2-1; FPS dưới 28 giảm chi tiết, không giảm nội dung; âm thanh Web Audio API; bộ sưu tập "miti-collection".',
  privacy: 'Không upload ảnh/video, chỉ giữ landmark trong bộ nhớ; UI tiếng Việt, không hiện thuật ngữ kỹ thuật; trạng thái đúng/sai phân biệt ngoài màu (✓ ✗, chữ); dọn vật cản, giữ cách tường một bước.',
};

// Khối luật chung không phụ thuộc game (legacy + master + nền cho prompt game).
// english: in RULES.listening (đúng một lần) + giọng đọc; camera: false bỏ phần AR/camera, thêm PE_NO_CAMERA;
// finger: true → INPUT.*; 'maybe' → INPUT.* kèm FINGER_MAYBE_PREFIX; false → không in INPUT. EFFECTS.* luôn in.
// compact: true (chỉ legacy — thân prompt đời đầu đã tự mô tả kỹ thuật): mục data/tech/ui dùng các dòng COMPACT_* ngắn;
// bốn Core_Section (gồm PLAYERS/INPUT/COMPETE) và EFFECTS in đầy đủ như prompt game.
// Dữ liệu riêng của game (mục tiêu, gesture, lỗi thường gặp, số mục ngân hàng, dòng "model:") do người gọi thêm.
export function sharedRuleLines({ english = false, camera = true, finger = false, compact = false } = {}) {
  const input =
    finger === true ? bullets(INPUT)
    : finger === 'maybe' ? Object.values(INPUT).map((s) => bullet(FINGER_MAYBE_PREFIX + s))
    : [];
  const handCheck = finger === true ? ' + cách nhận tay' : finger === 'maybe' ? ' (+ cách nhận tay với game tay)' : '';

  const hook = [
    bullet(HYPE.hook),
    bullet(HYPE.climax),
    bullet(HYPE.reveal),
    bullet(FEEL.juice),
    bullet(FEEL.nearMiss),
    bullet(SCORE_LINE),
    ...bullets(EFFECTS),
  ];

  const players = [...bullets(PLAYERS), ...input, ...bullets(COMPETE)];

  const motion = [
    bullet(MOTION.amplitude),
    bullet(MOTION.reach),
    bullet(MOTION.variety),
    bullet(PE.warmCool),
    bullet(PE.pace),
    bullet(PE.loadCap),
    ...(camera ? [] : [bullet(PE_NO_CAMERA)]),
    bullet('Chống ăn may: ' + RULES.antiLuck),
  ];

  const memory = [
    bullet(WRONG_LINE),
    bullet(MEMORY.review),
    bullet(MEMORY.interleave),
    bullet(MEMORY.recall),
    bullet(ADAPT.level),
    bullet(SUMMARY_LINE),
    ...(english ? [bullet(RULES.listening), bullet(RULES.speechSynthesis + ' Đọc to khi trả lời đúng, có nút phát lại ở màn học liệu.')] : []),
  ];

  const data = compact
    ? [bullet(COMPACT.data)]
    : [
        bullet('Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt sau; mỗi mục { id, level, prompt, choices, answer, explanation, errorTag, loiViet }, level 1/2/3, một đáp án đúng duy nhất.'),
        bullet('errorTag là mã máy của lỗi, loiViet là cụm tiếng Việt hiện cho học sinh; câu sai lưu cả hai. Xáo vị trí đáp án có seed theo lượt.'),
        bullet(VERIFY.bank),
      ];

  const tech = !camera
    ? [bullet('Bản không camera: chuột/chạm/phím là điều khiển chính, mô phỏng đúng hành động của cơ chế; không tải MediaPipe, không xin quyền camera; mục tiêu học tập đủ 100%.')]
    : compact
      ? [AR_COMPACT, bullet(COMPACT.camera)]
      : [
          AR_RENDER,
          bullet(`MediaPipe Tasks Vision pin 1.0.1: import từ ${TASKS_VISION.bundle}; wasm: ${TASKS_VISION.wasm}.`),
          bullet('Camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }), khung 4:3 crop không giãn, lật gương khi hiển thị và khi tính tọa độ.'),
          bullet('Chỉ xin quyền camera SAU khi bấm BẮT ĐẦU. Trạng thái tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).'),
          bullet(CLASSROOM.framing),
          bullet(CLASSROOM.safeZone),
          bullet(RULES.calibration),
          bullet('Cử chỉ chỉ fire ở lượt chuyển trạng thái, hysteresis hai ngưỡng + cooldown; giữ nguyên tư thế không spam event; confidence thấp thì không chốt.'),
          bullet('Camera cần HTTPS, localhost hoặc file trên máy; bị chặn, CDN hay model lỗi thì báo một dòng tiếng Việt rồi vào thẳng chế độ không camera, game vẫn chơi đủ.'),
          bullet('Fallback chuột/chạm/phím mô phỏng đúng hành động chính; nhãn "Chế độ không dùng camera", nút Tắt camera không tải lại trang; mục tiêu học tập đủ 100%.'),
        ];

  const vietnamese = 'Toàn bộ UI, nút, hướng dẫn, thông báo, lời giải bằng TIẾNG VIỆT' + (english ? ' (chỉ học liệu tiếng Anh giữ nguyên)' : '') + '; không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện với học sinh.';
  const ui = compact
    ? [bullet(SCREEN_FLOW), bullet(COMPACT.screen + ' ' + NO_ADS_LINE), bullet(COMPACT.privacy)]
    : [
        bullet(SCREEN_FLOW),
        bullet('Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive dọc và ngang.'),
        bullet(ACCESS.perceive),
        bullet(ACCESS.handedness),
        bullet('Có Pause, Replay, Tắt camera, Giảm hiệu ứng và nút "Chỉnh lại tư thế". ' + NO_ADS_LINE),
        bullet(RULES.autoPause),
        bullet(RULES.perf),
        bullet(RULES.audio),
        bullet('Bộ sưu tập: mỗi màn thắng mở 1 thẻ theo chủ đề game, lưu localStorage "miti-collection"; màn "Sưu tập của em" vẽ lưới 6 ô mỗi bộ (ô chưa mở là khung nét đứt "? ? ?") kèm dòng "Bộ <chủ đề> còn thiếu <k> thẻ", <k> tính từ chính máy này.'),
        bullet(RULES.safety),
        bullet(PRIVACY_LINE),
        bullet(vietnamese),
      ];

  const brand = MITI_LINES.map(bullet);

  const output = [
    bullet('Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.'),
    bullet('Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".'),
    bullet(`Tự kiểm trước khi xuất: camera sau nút Bắt đầu · nền AR + toScreen · chọn 1/2/3 người + gán làn${handCheck} · Scoreboard/Podium/kỷ lục + hiệu ứng · fallback chơi trọn · QUESTION_DATA đủ mục · localStorage ôn tập + bộ sưu tập · chữ ký MiTi.`),
    bullet('File chạy độc lập, không lỗi console.'),
  ];

  return { hook, players, motion, memory, data, tech, ui, brand, output };
}

// Tóm tắt một dòng cho block biến thể (build-variants.mjs), thay mọi hằng *_SHORT đã gỡ.
export const CORE_DIGEST =
  'Cốt lõi MiTi: chọn 1/2/3 người, mỗi em một làn màu P1/P2/P3 · Scoreboard trực tiếp + Podium, mọi em có danh hiệu, đuổi kịp x2 có trần; chơi một mình so kỷ lục "miti-best" · động tác lớn trong tầm tay, KHỞI ĐỘNG 60–90 giây và HẠ NHIỆT 45–60 giây · 12 lượt chính, 5 tim, sai dừng 2 giây hiện lời giải · ôn "miti-review" +1/+3/+7 ngày, level thích ứng ẩn · hiệu ứng theo làn, nhấp nháy ≤ 3 lần/giây, nút Giảm hiệu ứng · chữ ký MiTi ở ba màn.';
