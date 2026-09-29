import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { GESTURES, BANK } from './data/gestures.mjs';
import { cluster } from './data/clusters.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { readCatalog } from './lib/csv.mjs';
import { AR_SHORT, TASKS_VISION } from './lib/ar.mjs';
import { RULES } from './lib/rules.mjs';
import { MOTION, FEEL, MOTION_SHORT, FEEL_SHORT } from './lib/feel.mjs';
import { CLASSROOM, CLASSROOM_SHORT } from './lib/classroom.mjs';
import { ACCESS, ACCESS_SHORT } from './lib/access.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'prompts', 'VARIANTS_425.md');

// 5 biến thể điều khiển cho CÙNG một game: cùng thế giới, cùng ngân hàng dữ liệu, khác mỗi cách chốt đáp án.
const VARIANTS = [
  { code: 'V1', label: 'CAMERA POINT', gesture: 'POINT' },
  { code: 'V2', label: 'CAMERA SWIPE', gesture: 'SWIPE' },
  { code: 'V3', label: 'DRAG & GRAB', gesture: 'DRAG' },
  { code: 'V4', label: 'VOICE', gesture: 'VOICE' },
  { code: 'V5', label: 'NO-CAMERA', gesture: null },
];

const grab = (g) => GESTURES.GRAB;

function controlBlock(v, g) {
  if (!v.gesture) {
    return `**Điều khiển (V5 — KHÔNG CAMERA):** phím mũi tên / WASD di chuyển con trỏ, Space hoặc Enter chốt đáp án; chuột và chạm màn hình mô phỏng ĐÚNG hành động chính của game (${grab().fallback}, ${GESTURES.POINT.fallback}).
**Fallback:** đây chính là bản không camera — game chạy trọn 12 lượt và vẫn đủ 100% mục tiêu học tập trên máy không có webcam, không có micro, hoặc mạng trường chặn CDN. Có nhãn "Chế độ không dùng camera".`;
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

function block(n, row, g, v) {
  const cl = cluster(g.cluster);
  const bank = BANK[row.mon];
  const gradeTxt = row.mon === 'Toán' ? `Toán lớp ${row.lop}` : `Tiếng Anh lớp ${row.lop}`;
  const english = row.mon === 'Tiếng Anh';
  const voice = v.code === 'V4';
  const camera = v.gesture !== null;
  const cameraLine = voice
    ? `**Camera + micro:** nền AR vẫn là khung hình webcam nhưng biến thể này KHÔNG cần nhận diện tay — dùng Web Speech API SpeechRecognition (en-US hoặc en-GB), tối đa 3 lần thử mỗi câu. getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }) để lấy nền; khung 4:3, crop nếu camera cho tỉ lệ khác, lật gương ngang khi hiển thị.`
    : `**Camera:** MediaPipe Tasks Vision pin phiên bản — import ${TASKS_VISION.bundle}, wasm ${TASKS_VISION.wasm}, model ${TASKS_VISION.hand}. getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }); khung 4:3, crop nếu camera cho tỉ lệ khác, lật gương ngang khi hiển thị và khi tính tọa độ.`;
  const calib = camera && !voice ? RULES.calibration : 'Biến thể này không đọc chuyển động tay nên không cần calibration; vẫn phải có một màn hướng dẫn ngắn, không tutorial dài.';
  // Biến thể VOICE chỉ có một micro nên không có chế độ hai người chơi: lấy 3 vế đầu của chuỗi rút gọn.
  const voiceShort = CLASSROOM_SHORT.split(' · ').slice(0, 3).join(' · ');
  const selfCheck = voice
    ? 'nền AR phủ kín khung hình với lớp tối alpha không vượt 0.45 · sóng âm và khối từ nổi đặt ngay trong khung hình thật · transcript lệch một bên không che người nói · ' + MOTION_SHORT + ' · ' + FEEL_SHORT + ' · ' + voiceShort + ' · ' + ACCESS_SHORT
    : camera
      ? 'nền AR phủ kín khung hình với alpha không vượt 0.45 · mọi tọa độ qua toScreen(lx, ly), không còn lx * W · vật thể có z từ 1.6 và bóng dưới chân · có vật neo vào landmark · hover không bị tính là chọn · ' + MOTION_SHORT + ' · ' + FEEL_SHORT + ' · ' + CLASSROOM_SHORT + ' · ' + ACCESS_SHORT
      : 'game chạy trọn 12 lượt chỉ bằng phím và chuột, không tải MediaPipe · phụ đề lời đọc cho mọi phản hồi âm thanh · không xin quyền camera · hồ sơ "miti-mastery" vẫn ghi và vẫn đọc được · ' + FEEL_SHORT + ' · ' + ACCESS_SHORT;
  const subjectNote = english ? 'tiếng Anh giữ nguyên tiếng Anh' : 'dùng đúng thuật ngữ SGK ' + gradeTxt;
  const motion = camera
    ? `${MOTION.amplitude} ${MOTION.reach} ${MOTION.variety} ${MOTION.breather} ${MOTION.meter}`
    : 'Bản phím/chuột không bắt buộc vận động toàn thân nhưng vẫn chia 12 lượt thành 3 hiệp, giữa hai hiệp nghỉ 5 giây có đếm ngược, và màn tổng kết hiện thẻ "Em đã trả lời N lượt trong M phút".';

  return `## Prompt ${String(n).padStart(3, '0')} — ${row.id} — ${v.code} — ${v.label}

**Game:** ${row.ten_game} · ${gradeTxt} · Cụm kiến thức: \`${g.cluster}\`
**Mục tiêu học tập:** ${cl.noi_dung}.
**Nhiệm vụ của học sinh mỗi lượt:** ${g.mission}
**Bối cảnh:** ${g.setting}
**Định dạng đầu ra:** DUY NHẤT 1 file HTML hoàn chỉnh (HTML + CSS nội tuyến trong một khối <style> + JavaScript), không file .css/.js/.json/ảnh/mp3 ngoài, không Tailwind Play CDN, không Tone.js.

${camera ? `**Nền AR:** ${AR_SHORT}
${cameraLine}
**Xin quyền + trạng thái:** chỉ xin camera${voice ? ' và micro' : ''} SAU khi học sinh bấm BẮT ĐẦU; nhãn tiếng Việt Đang tải → Xin quyền ${voice ? 'micro' : 'camera'} → Sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại). ${voice ? 'Micro bị từ chối hoặc trình duyệt không hỗ trợ SpeechRecognition thì hiện nút "Nghe mẫu + chọn đáp án bằng chuột".' : 'Camera bị chặn vì môi trường không an toàn thì báo "Muốn dùng camera thì mở game qua HTTPS hoặc file trên máy em" rồi vào thẳng chế độ không camera.'}
${controlBlock(v, g)}` : controlBlock(v, g)}

**Vòng chơi:** 12 lượt. ${RULES.antiLuck} ${RULES.autoPause} Độ khó tăng ở lượt 5 và lượt 9 bằng cách thêm bước trung gian hoặc rút ngắn thời gian hiển thị hạt, không rút thời gian đọc đề. ${calib}
**Vận động:** ${motion}
**Ngân hàng dữ liệu:** \`const QUESTION_DATA = [...]\` đặt ở ĐẦU khối <script>, engine đặt phía sau; tối thiểu ${bank.so} mục chia 3 mức độ theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet }; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; ${bank.luu_y} errorTag lấy đúng một trong: ${cl.tags.join(', ')}; loiViet là cụm tiếng Việt có dấu lấy nguyên văn từ danh sách lỗi: ${ERROR_NOTES[g.cluster]}. Xáo trộn vị trí đáp án có seed theo lượt.
**Phản hồi học tập:** đúng thì phản hồi tích cực ngay kèm một dòng ghi nhớ; sai thì DỪNG 2 giây, ${cl.giai_thich}, chỉ rõ bước hoặc chữ số hoặc từ cần sửa, không hiệu ứng nào che lời giải; câu sai xếp vào CUỐI vòng để luyện lại. ${RULES.summary}${english ? ` ${RULES.listening} ${RULES.speechSynthesis}` : ''}
**Cảm giác arcade:** ${FEEL.hitStop} ${FEEL.combo} ${FEEL.cheer} ${FEEL.bonus} ${FEEL.fx} ${camera ? FEEL.mascot : 'Mascot của game đứng ở góc HUD, nhảy lên khi đúng và gật đầu khi sai — phản ứng theo kết quả chứ không theo chuyển động.'}
**Hồ sơ tiến bộ:** ${CLASSROOM.mastery}
**Tiếp cận + an toàn thần kinh:** ${ACCESS.flash} ${ACCESS.reducedMotion} ${ACCESS.notColorOnly} ${ACCESS.caption} ${ACCESS.contrast}
${camera && !voice ? `**Chế độ lớp:** ${CLASSROOM.twoPlayer}\n**Tay thuận:** ${ACCESS.handedness}\n` : ''}**Giao diện:** đề bài >= 28px trên desktop và >= 20px trên điện thoại, tương phản chữ >= 4.5:1, responsive cả dọc lẫn ngang; HUD có nhiệm vụ + điểm + chuỗi đúng + tiến độ + trạng thái camera; có Pause, Replay, Giảm hiệu ứng chuyển động${camera ? ' và Tắt camera' : ''}; không leaderboard, không quảng cáo. ${RULES.perf}
**An toàn + riêng tư + tiếng Việt:** ${RULES.safety} Mỗi động tác đều có phiên bản ngồi tại chỗ; không quay chạy nhảy, không rời vùng camera. Không upload ảnh/video từ camera, chỉ giữ landmark trong bộ nhớ, tiến độ lưu localStorage máy đó. Toàn bộ UI, tên nút, hướng dẫn, thông báo và lời giải bằng TIẾNG VIỆT (chỉ học liệu ${subjectNote}); không để lộ thuật ngữ kỹ thuật confidence / cooldown / fallback cho học sinh.
**Chữ ký MiTi (bắt buộc trong HTML):** ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang hoặc màn kết quả có dòng "MiTi • Học bằng chuyển động"; không xóa hay đổi tên thương hiệu khi replay hoặc ở chế độ không camera.
**Xuất file:** chạy được ngay khi lưu thành .html, không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không lỗi console. Tự kiểm tra: ${selfCheck} · QUESTION_DATA đủ ${bank.so} mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · bộ sưu tập lưu localStorage "miti-collection" · chữ ký MiTi ở ba màn.

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
> Cùng một thế giới và cùng một ngân hàng dữ liệu, chỉ khác cách chốt đáp án — nên một lớp có thể chơi bốn kiểu điều khiển khác nhau mà vẫn học đúng một bài.
>
> Bản chuẩn đầy đủ (khi muốn viết prompt mới từ đầu): \`prompts/00-master-canvas-prompt.md\`. Bảng game + copy nhanh: \`index.html\` hoặc \`catalogs/GAME_CATALOG.md\`.

## Quy ước chung áp cho mọi block

- Một file HTML duy nhất, CSS nội tuyến, không thư viện ngoài trừ MediaPipe Tasks Vision đã pin \`@1.0.1\`.
- **Nền AR**: camera là màn chơi, không phải ảnh trang trí; tọa độ landmark chỉ đi qua \`toScreen(lx, ly)\`.
- Số câu tối thiểu: ${BANK['Toán'].so} mục cho game Toán, ${BANK['Tiếng Anh'].so} mục cho game Tiếng Anh; mỗi mục có \`errorTag\` + \`loiViet\`.
- Camera/micro chỉ xin sau nút BẮT ĐẦU; luôn có chế độ không camera chơi trọn game; không upload ảnh/video camera.
- **Vận động + arcade:** mỗi lượt là một động tác to (>= 50% tầm với), vùng đích nằm sát mép khung, 3 hiệp kèm trạm nghỉ 5 giây; cú chạm có hit-stop, combo và chữ khen bật lên trong khung hình.
- **Lớp học thật:** chữ và HUD không đè lên thân học sinh, cơ chế chọn theo mức camera đang thấy, hồ sơ tiến bộ "miti-mastery" xếp câu theo lỗi yếu nhất, có chế độ hai học sinh trong một khung hình (trừ biến thể VOICE).
- **Tiếp cận:** không hiệu ứng nào nhấp nháy quá 3 lần/giây, \`prefers-reduced-motion\` được đọc lúc khởi động và bật sẵn chế độ Giảm hiệu ứng (không giảm nội dung học), đúng/sai phân biệt bằng >= 2 kênh ngoài màu, mọi âm thanh có bản chữ, tương phản chữ >= 4.5:1, có chọn tay thuận lúc calibration (trừ biến thể VOICE và NO-CAMERA).
- Chữ ký MiTi có ở ba màn: Bắt đầu, HUD, Kết quả.

`;

let n = 0;
for (const row of rows) {
  const g = byId.get(row.id);
  if (!g) throw new Error(`Thiếu enrichment cho game ${row.id} — không sinh được biến thể.`);
  out += `# ${row.id} — ${row.ten_game} — ${row.lop} — ${row.mon}\n\n`;
  for (const v of VARIANTS) out += block(++n, row, g, v);
}

if (n !== 425) throw new Error(`Số block biến thể là ${n}, phải là 425.`);
fs.writeFileSync(OUT, out, 'utf8');
console.log(`Đã sinh ${n} prompt biến thể (85 game × 5 kiểu điều khiển) vào prompts/${path.basename(OUT)}.`);
