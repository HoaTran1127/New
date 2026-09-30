import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { GESTURES, BANK } from './data/gestures.mjs';
import { cluster } from './data/clusters.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { readCatalog } from './lib/csv.mjs';
import { AR_RENDER, TASKS_VISION } from './lib/ar.mjs';
import { RULES } from './lib/rules.mjs';
import { MOTION, FEEL } from './lib/feel.mjs';
import { CLASSROOM } from './lib/classroom.mjs';
import { ACCESS } from './lib/access.mjs';
import { VERIFY, ADAPT } from './lib/verify.mjs';
import { HUMAN_CHECKS } from './lib/acceptance.mjs';
import { PE, PE_NO_CAMERA } from './lib/pe.mjs';
import { MEMORY } from './lib/memory.mjs';
import { HYPE } from './lib/hype.mjs';
import { PLAYERS, VOICE_TURN, modelLine } from './lib/players.mjs';
import { INPUT } from './lib/input.mjs';
import { COMPETE } from './lib/compete.mjs';
import { EFFECTS } from './lib/effects.mjs';
import { CORE_DIGEST, NO_ADS_LINE, MITI_LINES } from './lib/skeleton.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'prompts', 'VARIANTS_425.md');

// 5 biến thể điều khiển cho CÙNG một game: cùng thế giới, cùng ngân hàng dữ liệu, khác mỗi cách chốt đáp án.
// finger: biến thể đọc ngón tay → khi 2–3 bạn áp dụng khối INPUT (theo lượt / cổ tay đồng thời).
const VARIANTS = [
  { code: 'V1', label: 'CAMERA POINT', gesture: 'POINT', finger: true },
  { code: 'V2', label: 'CAMERA SWIPE', gesture: 'SWIPE', finger: true },
  { code: 'V3', label: 'DRAG & GRAB', gesture: 'DRAG', finger: true },
  { code: 'V4', label: 'VOICE', gesture: 'VOICE', finger: false },
  { code: 'V5', label: 'NO-CAMERA', gesture: null, finger: false },
];

const grab = () => GESTURES.GRAB;
const join = (...xs) => xs.filter(Boolean).join(' ');

function controlBlock(v) {
  if (!v.gesture) {
    return `**Điều khiển (V5 — KHÔNG CAMERA):** phím mũi tên / WASD di chuyển con trỏ, Space hoặc Enter chốt đáp án; chuột và chạm màn hình mô phỏng ĐÚNG hành động chính của game (${grab().fallback}, ${GESTURES.POINT.fallback}).
**Fallback:** đây chính là bản không camera — game chạy trọn ván và vẫn đủ 100% mục tiêu học tập trên máy không có webcam, không có micro, hoặc mạng trường chặn CDN. Có nhãn "Chế độ không dùng camera".`;
  }
  const gm = GESTURES[v.gesture];
  const extra =
    v.gesture === 'DRAG'
      ? `\nThao tác phụ — ${grab().vi}: ${grab().landmark} Điều kiện bốc/thả: ${grab().hinh_hoc}`
      : '';
  return `**Điều khiển (${v.label}):** ${gm.landmark}
**Chốt đáp án:** ${gm.hinh_hoc}
**Biên độ động tác:** ${gm.bien_do}
**Khung hình camera:** ${CLASSROOM.framing}
**Vùng an toàn cho chữ:** ${CLASSROOM.safeZone}
**Làm mượt + chống spam:** ${gm.muot} Ngưỡng: ${gm.nguong} Cử chỉ chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim; confidence thấp thì không chốt.
**Học sinh thấy gì:** ${gm.nguoi_choi}
**Hòa vào nền AR:** ${gm.ar}${extra}
**Fallback:** nếu camera bị từ chối, bị chặn hoặc CDN lỗi thì báo một dòng tiếng Việt và tự chuyển sang ${gm.fallback}, game vẫn chơi đủ.`;
}

// Chế độ 1/2/3 người theo biến thể: bản đọc cơ thể có đủ luật làn; VOICE giành lượt nói; NO-CAMERA chỉ giữ làn + phím.
function playersBlock(v) {
  const camera = v.gesture !== null;
  const voice = v.gesture === 'VOICE';
  const players = camera && !voice
    ? Object.values(PLAYERS)
    : [PLAYERS.select, PLAYERS.lanes, PLAYERS.fallback, ...(voice ? [VOICE_TURN] : [])];
  const lines = [`**Chế độ 1/2/3 người:** ${join(...players)}`];
  if (v.finger) {
    lines.push(`**Nhận tay:** ${join(...Object.values(INPUT))}`);
  }
  lines.push(`**Thi đua:** ${join(...Object.values(COMPETE))}`);
  return lines.join('\n');
}

function block(n, row, g, v) {
  const cl = cluster(g.cluster);
  const bank = BANK[row.mon];
  const gradeTxt = row.mon === 'Toán' ? `Toán lớp ${row.lop}` : `Tiếng Anh lớp ${row.lop}`;
  const english = row.mon === 'Tiếng Anh';
  const voice = v.code === 'V4';
  const camera = v.gesture !== null;
  const cameraLine = voice
    ? `**Camera + micro:** nền AR vẫn là khung hình webcam nhưng biến thể này KHÔNG cần nhận diện tay — dùng Web Speech API SpeechRecognition (en-US hoặc en-GB), tối đa 3 lần thử mỗi câu. getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }) để lấy nền; khung 4:3, crop nếu camera cho tỉ lệ khác, lật gương ngang khi hiển thị.`
    : `**Camera:** MediaPipe Tasks Vision pin phiên bản — import ${TASKS_VISION.bundle}, wasm ${TASKS_VISION.wasm}; ${modelLine([v.gesture])} getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }); khung 4:3, crop nếu camera cho tỉ lệ khác, lật gương ngang khi hiển thị và khi tính tọa độ.`;
  const calib = camera && !voice ? RULES.calibration : 'Biến thể này không đọc chuyển động tay nên không cần calibration; vẫn phải có một màn hướng dẫn ngắn, không tutorial dài.';
  const subjectNote = english ? 'tiếng Anh giữ nguyên tiếng Anh' : 'dùng đúng thuật ngữ SGK ' + gradeTxt;
  const motion = camera
    ? join(MOTION.amplitude, MOTION.reach, MOTION.variety)
    : 'Bản phím/chuột không bắt buộc vận động toàn thân nhưng vẫn giữ ba hiệp và trạm nghỉ 5 giây, màn tổng kết hiện thẻ "Em đã trả lời N lượt trong M phút".';
  // Bản có nhận diện cơ thể đo được cường độ; VOICE/NO-CAMERA giữ khung buổi thể dục nhưng đổi cách đo.
  const pe = join(PE.warmCool, PE.pace, PE.loadCap, camera && !voice ? '' : PE_NO_CAMERA);
  const hype = join(HYPE.hook, HYPE.climax, HYPE.reveal);
  const memory = join(MEMORY.review, MEMORY.interleave, MEMORY.recall);
  const effects = join(...Object.values(EFFECTS));
  const handCheck = v.finger ? ' + cách nhận tay' : '';
  const selfCheck = voice
    ? `nền AR phủ kín khung hình, alpha không vượt 0.45 · có vật neo vào landmark · sóng âm và khối từ nổi đặt trong khung hình thật, transcript không che người nói · chọn 1/2/3 người + gán làn + giơ tay giành lượt nói`
    : camera
      ? `nền AR + toScreen(lx, ly), không còn lx * W · vật thể có z từ 1.6 và bóng dưới chân · có vật neo vào landmark · hover không bị tính là chọn · chọn 1/2/3 người + gán làn${handCheck}`
      : 'chạy trọn ván chỉ bằng phím, chuột, chạm, không tải MediaPipe, không xin quyền camera · chọn 1/2/3 người + làn phím A/S/D · mũi tên · J/K/L';

  return `## Prompt ${String(n).padStart(3, '0')} — ${row.id} — ${v.code} — ${v.label}

**Game:** ${row.ten_game} · ${gradeTxt} · Cụm kiến thức: \`${g.cluster}\`
**Mục tiêu học tập:** ${cl.noi_dung}.
**Nhiệm vụ của học sinh mỗi lượt:** ${g.mission}
**Bối cảnh:** ${g.setting}
**Định dạng đầu ra:** DUY NHẤT 1 file HTML hoàn chỉnh (HTML + CSS nội tuyến trong một khối <style> + JavaScript), không file .css/.js/.json/ảnh/mp3 ngoài, không Tailwind Play CDN, không Tone.js.
**${CORE_DIGEST.split(':')[0]}:**${CORE_DIGEST.slice(CORE_DIGEST.indexOf(':') + 1)}

${playersBlock(v)}

${camera ? `**Nền AR:**
${AR_RENDER}
${cameraLine}
**Xin quyền + trạng thái:** chỉ xin camera${voice ? ' và micro' : ''} SAU khi học sinh bấm BẮT ĐẦU; nhãn tiếng Việt Đang tải → Xin quyền ${voice ? 'micro' : 'camera'} → Sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại). ${voice ? 'Micro bị từ chối hoặc trình duyệt không hỗ trợ SpeechRecognition thì hiện nút "Nghe mẫu + chọn đáp án bằng chuột".' : 'Camera bị chặn vì môi trường không an toàn thì báo "Muốn dùng camera thì mở game qua HTTPS hoặc file trên máy em" rồi vào thẳng chế độ không camera.'}
${controlBlock(v)}` : controlBlock(v)}

**Vòng chơi:** 12 lượt chính (theo lượt ngón tay: 8 câu mỗi em); +10 nhân chuỗi đúng, 5 tim. ${RULES.antiLuck} ${RULES.autoPause} ${calib}
**Độ khó thích ứng:** ${ADAPT.level}
**Vận động:** ${motion}
**Thể dục có cấu trúc:** ${pe}
**Nhớ bài có lịch:** ${memory}
**Cao trào:** ${hype}
**Hiệu ứng:** ${effects}
**Cảm giác arcade:** ${FEEL.juice} ${FEEL.nearMiss}
**Tự kiểm chứng đề:** ${VERIFY.bank}
**Ngân hàng dữ liệu:** \`const QUESTION_DATA = [...]\` đặt ở ĐẦU khối <script>, engine đặt phía sau; tối thiểu ${bank.so} mục chia 3 mức độ theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet }; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; ${bank.luu_y} errorTag lấy đúng một trong: ${cl.tags.join(', ')}; loiViet là cụm tiếng Việt có dấu lấy nguyên văn từ danh sách lỗi: ${ERROR_NOTES[g.cluster]}. Xáo trộn vị trí đáp án có seed theo lượt.
**Phản hồi học tập:** đúng thì phản hồi tích cực ngay kèm một dòng ghi nhớ; sai thì DỪNG 2 giây, ${cl.giai_thich}, chỉ rõ bước hoặc chữ số hoặc từ cần sửa, không hiệu ứng nào che lời giải; câu sai xếp vào CUỐI vòng để luyện lại. Tổng kết theo errorTag ("Em hay sai ở: <loiViet>") kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.${english ? ` ${RULES.listening} ${RULES.speechSynthesis}` : ''}
**Tiếp cận:** ${ACCESS.perceive}${camera && !voice ? `\n**Tay thuận:** ${ACCESS.handedness}` : ''}
**Giao diện:** đề bài >= 28px trên desktop và >= 20px trên điện thoại, responsive cả dọc lẫn ngang; HUD có nhiệm vụ + điểm + chuỗi đúng + tiến độ${camera ? ' + trạng thái camera' : ''}; có Pause, Replay, Giảm hiệu ứng${camera ? ' và Tắt camera' : ''}. ${NO_ADS_LINE} ${RULES.perf} ${RULES.audio}
**An toàn + riêng tư + tiếng Việt:** ${RULES.safety} Mỗi động tác đều có phiên bản ngồi tại chỗ; không rời vùng camera. Không upload ảnh/video từ camera, chỉ giữ landmark trong bộ nhớ, tiến độ lưu localStorage máy đó. Toàn bộ UI, tên nút, hướng dẫn, thông báo và lời giải bằng TIẾNG VIỆT (chỉ học liệu ${subjectNote}); không để lộ thuật ngữ kỹ thuật confidence / cooldown / fallback cho học sinh.
**Chữ ký MiTi (bắt buộc trong HTML):** ${MITI_LINES.join(' ')}
**Nghiệm thu:** người thử làm ${HUMAN_CHECKS.length} việc bấm tay trong \`prompts/CHECKLIST_NGHIEP_THU.md\`; việc nào không áp dụng cho biến thể ${v.code} thì bỏ qua.
**Xuất file:** chạy được ngay khi lưu thành .html, không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không lỗi console. Tự kiểm tra: ${selfCheck} · Scoreboard/Podium/kỷ lục + hiệu ứng · QUESTION_DATA đủ ${bank.so} mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · localStorage "miti-review" + "miti-collection" · chữ ký MiTi ở ba màn.

---
`;
}

const rows = readCatalog(path.join(ROOT, 'catalogs', 'GAME_CATALOG.csv'));
const byId = new Map(GAMES.map((g) => [g.id, g]));
if (rows.length !== 85) throw new Error(`Cần đúng 85 game để sinh biến thể, catalog có ${rows.length}.`);

let out = `# 🎯 425 PROMPT BIẾN THỂ — MiTi (85 game × 5 kiểu điều khiển)

> **File này do \`tools/build-variants.mjs\` sinh ra từ \`tools/data/games.mjs\` + \`tools/data/gestures.mjs\`.** Muốn đổi nội dung thì sửa dữ liệu rồi chạy \`node tools/build.mjs\`, đừng sửa tay.
>
> 85 game trong catalog × 5 biến thể điều khiển = **425 prompt độc lập**. Mỗi block \`## Prompt NNN\` copy riêng được, dán vào **Google Gemini → chế độ Canvas** là ra một game 1 file HTML.
>
> Năm biến thể: **V1 CAMERA POINT** (chỉ ngón trỏ) · **V2 CAMERA SWIPE** (vuốt chém) · **V3 DRAG & GRAB** (nắm kéo thả) · **V4 VOICE** (nói to đáp án) · **V5 NO-CAMERA** (phím + chuột).
> Cùng một thế giới và cùng một ngân hàng dữ liệu, chỉ khác cách chốt đáp án — nên một lớp có thể chơi nhiều kiểu điều khiển khác nhau mà vẫn học đúng một bài.
>
> Bản chuẩn đầy đủ (khi muốn viết prompt mới từ đầu): \`prompts/00-master-canvas-prompt.md\`. Bảng game + copy nhanh: \`index.html\` hoặc \`catalogs/GAME_CATALOG.md\`.

## Quy ước chung áp cho mọi block

- ${CORE_DIGEST}
- Một file HTML duy nhất, CSS nội tuyến, không thư viện ngoài trừ MediaPipe Tasks Vision đã pin \`@1.0.1\`.
- **Nền AR**: camera là màn chơi, không phải ảnh trang trí; tọa độ landmark chỉ đi qua \`toScreen(lx, ly)\`.
- Số câu tối thiểu: ${BANK['Toán'].so} mục cho game Toán, ${BANK['Tiếng Anh'].so} mục cho game Tiếng Anh; mỗi mục có \`errorTag\` + \`loiViet\`.
- Camera/micro chỉ xin sau nút BẮT ĐẦU; luôn có chế độ không camera chơi trọn game; không upload ảnh/video camera.
- **Chế độ 1/2/3 người:** màn "Mấy bạn cùng chơi?" chia N làn màu P1/P2/P3; game đọc cơ thể chạy PoseLandmarker cho mọi em cùng lúc; V1–V3 (ngón tay) khi 2–3 bạn đọc tay theo lượt và tự chuyển sang cổ tay khi máy yếu; V4 giơ tay giành lượt nói; V5 mỗi em một cụm phím.
- **Thi đua + cao trào:** Scoreboard trực tiếp, Podium có danh hiệu cho mọi em, đuổi kịp x2 có trần; chơi một mình so kỷ lục "miti-best"; ba hiệp leo thang, hiệp 3 "HIỆP QUYẾT ĐỊNH" (hệ số không vượt x2), mở thưởng cuối hiệp luôn có quà.
- **Ham quay lại:** "Còn 1 câu nữa tới mốc <m>" khi sắp chạm mốc 10/20/30 · lịch ôn "miti-review" +1/+3/+7 ngày · lưới bộ sưu tập "miti-collection" 6 ô. Không chuỗi ngày, không quyền thông báo, nghỉ chơi không bị phạt.
- **Hiệu ứng:** spotlight chuyển lượt, hạt màu theo làn, Scoreboard lăn số, Podium trồi từng bậc; mọi nhấp nháy ≤ 3 lần/giây, nút "Giảm hiệu ứng" dịu hẳn mà nội dung học giữ nguyên.
- **Đề phải tự kiểm được:** engine chạy \`verifyQuestionBank()\` một lần lúc nạp và loại mọi mục lỗi; độ khó thích ứng ẩn với học sinh.
- **Nghiệm thu:** ${HUMAN_CHECKS.length} việc người thử bấm tay, in sẵn để cầm tay khi vào lớp: \`prompts/CHECKLIST_NGHIEP_THU.md\`.
- Chữ ký MiTi có ở ba màn: Bắt đầu, HUD, Kết quả.

`;

let n = 0;
for (const row of rows) {
  const g = byId.get(row.id);
  if (!g) throw new Error(`Thiếu enrichment cho game ${row.id} — không sinh được biến thể.`);
  out += `# ${row.id} — ${row.ten_game} — ${row.lop} — ${row.mon}\n\n`;
  for (const v of VARIANTS) {
    try {
      out += block(++n, row, g, v);
    } catch (e) {
      throw new Error(`${row.id} ${v.code}: ${e.message}`);
    }
  }
}

if (n !== 425) throw new Error(`Số block biến thể là ${n}, phải là 425.`);
fs.writeFileSync(OUT, out, 'utf8');
console.log(`Đã sinh ${n} prompt biến thể (85 game × 5 kiểu điều khiển) vào prompts/${path.basename(OUT)}.`);
