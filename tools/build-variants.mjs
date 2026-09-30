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
import { VERIFY, ADAPT, VERIFY_SHORT, ADAPT_SHORT } from './lib/verify.mjs';
import { ACCEPT, ACCEPT_SHORT, MACHINE_ITEMS, HUMAN_CHECKS, CAMERA_ONLY } from './lib/acceptance.mjs';
import { PE, PE_SHORT, PE_NO_CAMERA } from './lib/pe.mjs';
import { RETENTION, RETENTION_SHORT } from './lib/memory.mjs';
import { HYPE, HYPE_SHORT } from './lib/hype.mjs';
import { ANT, ANT_SHORT } from './lib/anticipation.mjs';
import { LIGHT, LIGHT_SHORT } from './lib/light.mjs';
import { CELEBRATE, CELEBRATE_SHORT } from './lib/celebrate.mjs';
import { IDENTITY, IDENTITY_SHORT } from './lib/identity.mjs';
import { identity } from './data/identities.mjs';

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
  const it = identity(g.id);
  if (!it) throw new Error(`Thiếu bản sắc cho game ${g.id} — bổ sung tools/data/identities.mjs.`);
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
  const qCheck = ' · ' + LIGHT_SHORT + ' · ' + CELEBRATE_SHORT + ' · ' + IDENTITY_SHORT + ' · ' + PE_SHORT + ' · ' + RETENTION_SHORT + ' · ' + HYPE_SHORT + ' · ' + ANT_SHORT + ' · ' + VERIFY_SHORT + ' · ' + ADAPT_SHORT + ' · ' + ACCEPT_SHORT;
  // Dòng nghiệm thu cho mọi block: game phải tự chứng minh nó đạt, người thử không phải đọc code.
  const accept = ACCEPT.selfReport + ' ' + ACCEPT.printable + ' ' + ACCEPT.failRule + (camera ? '' : ' ' + ACCEPT.noCamera);
  const selfCheck = voice
    ? 'nền AR phủ kín khung hình với lớp tối alpha không vượt 0.45 · sóng âm và khối từ nổi đặt ngay trong khung hình thật · transcript lệch một bên không che người nói · ' + MOTION_SHORT + ' · ' + FEEL_SHORT + ' · ' + voiceShort + ' · ' + ACCESS_SHORT + qCheck
    : camera
      ? 'nền AR phủ kín khung hình với alpha không vượt 0.45 · mọi tọa độ qua toScreen(lx, ly), không còn lx * W · vật thể có z từ 1.6 và bóng dưới chân · có vật neo vào landmark · hover không bị tính là chọn · ' + MOTION_SHORT + ' · ' + FEEL_SHORT + ' · ' + CLASSROOM_SHORT + ' · ' + ACCESS_SHORT + qCheck
      : 'game chạy trọn 12 lượt chỉ bằng phím và chuột, không tải MediaPipe · phụ đề lời đọc cho mọi phản hồi âm thanh · không xin quyền camera · hồ sơ "miti-mastery" vẫn ghi và vẫn đọc được · ' + FEEL_SHORT + ' · ' + ACCESS_SHORT + qCheck;
  const subjectNote = english ? 'tiếng Anh giữ nguyên tiếng Anh' : 'dùng đúng thuật ngữ SGK ' + gradeTxt;
  const motion = camera
    ? `${MOTION.amplitude} ${MOTION.reach} ${MOTION.variety} ${MOTION.breather} ${MOTION.meter}`
    : 'Bản phím/chuột không bắt buộc vận động toàn thân nhưng vẫn chia 12 lượt thành 3 hiệp, giữa hai hiệp nghỉ 5 giây có đếm ngược, và màn tổng kết hiện thẻ "Em đã trả lời N lượt trong M phút".';
  // Cấu trúc buổi thể dục: bản có nhận diện cơ thể đo được cường độ, bản VOICE/NO-CAMERA giữ nguyên khung nhưng đổi cách đo.
  const pe = camera && !voice
    ? `${PE.warmUp} ${PE.pace} ${PE.activeShare} ${PE.coolDown} ${PE.water} ${PE.loadCap}`
    : `${PE.warmUp} ${PE.pace} ${PE.coolDown} ${PE.water} ${PE.loadCap} ${PE_NO_CAMERA}`;
  const hype = `${HYPE.hook} ${HYPE.personalBest} ${HYPE.ghost} ${HYPE.climax} ${HYPE.reveal} ${HYPE.sharedGoal}`;
  const ant = `${ANT.nearMiss} ${ANT.carryToken} ${ANT.openLoop} ${ANT.comeback} ${ANT.collectionGap} ${ANT.saveCeremony}`;
  const memory = `${RETENTION.spacedQueue} ${RETENTION.interleave} ${RETENTION.recallPrimer} ${RETENTION.explainBack} ${RETENTION.forgettingGuard} ${RETENTION.teacherNote}`;

  return `## Prompt ${String(n).padStart(3, '0')} — ${row.id} — ${v.code} — ${v.label}

**Game:** ${row.ten_game} · ${gradeTxt} · Cụm kiến thức: \`${g.cluster}\`
**Mục tiêu học tập:** ${cl.noi_dung}.
**Nhiệm vụ của học sinh mỗi lượt:** ${g.mission}
**Bối cảnh:** ${g.setting}
**Bản sắc riêng của game này:** \`const IDENTITY_DATA\` đặt ở ĐẦU khối <script> với đúng năm giá trị — mascot **${it.mascot}** (${it.tinhCach}) · \`--miti-1: ${it.palette[0]}\`, \`--miti-2: ${it.palette[1]}\`, \`--miti-3: ${it.palette[2]}\` · khoảnh khắc chữ ký "${it.signature}" · đạo cụ AR neo người chơi "${it.prop}" · ba câu thoại: khen "${it.lines[0]}", đỡ khi sai "${it.lines[1]}", hô mở đầu "${it.lines[2]}".
**Định dạng đầu ra:** DUY NHẤT 1 file HTML hoàn chỉnh (HTML + CSS nội tuyến trong một khối <style> + JavaScript), không file .css/.js/.json/ảnh/mp3 ngoài, không Tailwind Play CDN, không Tone.js.

${camera ? `**Nền AR:** ${AR_SHORT}
${cameraLine}
**Xin quyền + trạng thái:** chỉ xin camera${voice ? ' và micro' : ''} SAU khi học sinh bấm BẮT ĐẦU; nhãn tiếng Việt Đang tải → Xin quyền ${voice ? 'micro' : 'camera'} → Sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại). ${voice ? 'Micro bị từ chối hoặc trình duyệt không hỗ trợ SpeechRecognition thì hiện nút "Nghe mẫu + chọn đáp án bằng chuột".' : 'Camera bị chặn vì môi trường không an toàn thì báo "Muốn dùng camera thì mở game qua HTTPS hoặc file trên máy em" rồi vào thẳng chế độ không camera.'}
${controlBlock(v, g)}` : controlBlock(v, g)}

**Vòng chơi:** 12 lượt. ${RULES.antiLuck} ${RULES.autoPause} ${calib}
**Nhịp và độ khó:** lượt 5 và lượt 9 chỉ là mốc NHỊP — thêm một bước trung gian và rút thời gian hiển thị hạt, không rút thời gian đọc đề; level không đổi theo vị trí mà do thích ứng quyết định. ${ADAPT.levelShift} ${ADAPT.failFloor} ${ADAPT.hiddenLevel}
**Vận động:** ${motion}
**Thể dục có cấu trúc:** ${pe}
**Nhớ bài có lịch:** ${memory}
**Thi đua + cao trào:** ${hype}
**Ham quay lại:** ${ant}
**Tự kiểm chứng đề:** ${VERIFY.selfCheck} ${VERIFY.distractorValid} ${VERIFY.rangeGuard} ${VERIFY.noGuessable} ${VERIFY.difficultySteps}
**Nhẹ đầu (Toán là hình dung, không phải tính nhẩm):** ${LIGHT.oneThought} ${LIGHT.visualShare} ${LIGHT.shortPrompt} ${LIGHT.motionScores} ${LIGHT.noRush} ${LIGHT.playStation}
**Ngân hàng dữ liệu:** \`const QUESTION_DATA = [...]\` đặt ở ĐẦU khối <script>, engine đặt phía sau; tối thiểu ${bank.so} mục chia 3 mức độ theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; ${bank.luu_y} errorTag lấy đúng một trong: ${cl.tags.join(', ')}; loiViet là cụm tiếng Việt có dấu lấy nguyên văn từ danh sách lỗi: ${ERROR_NOTES[g.cluster]}. Xáo trộn vị trí đáp án có seed theo lượt.
**Phản hồi học tập:** đúng thì phản hồi tích cực ngay kèm một dòng ghi nhớ; sai thì DỪNG 2 giây, ${cl.giai_thich}, chỉ rõ bước hoặc chữ số hoặc từ cần sửa, không hiệu ứng nào che lời giải; câu sai xếp vào CUỐI vòng để luyện lại. ${RULES.summary}${english ? ` ${RULES.listening} ${RULES.speechSynthesis}` : ''}
**Cảm giác arcade:** ${FEEL.hitStop} ${FEEL.combo} ${FEEL.cheer} ${FEEL.bonus} ${FEEL.fx} ${camera ? FEEL.mascot : 'Mascot của game đứng ở góc HUD, nhảy lên khi đúng và gật đầu khi sai — phản ứng theo kết quả chứ không theo chuyển động.'}
**Hồ sơ tiến bộ:** ${CLASSROOM.mastery}
**Khoảnh khắc ăn mừng:** ${CELEBRATE.confetti} ${CELEBRATE.sfx} ${CELEBRATE.slowmo} ${CELEBRATE.haptics} ${CELEBRATE.slapstick} ${CELEBRATE.crowd}
**Bản sắc riêng của game:** ${IDENTITY.mascot} ${IDENTITY.palette} ${IDENTITY.signature} ${IDENTITY.prop} ${IDENTITY.lines} ${IDENTITY.guard}
**Tiếp cận + an toàn thần kinh:** ${ACCESS.flash} ${ACCESS.reducedMotion} ${ACCESS.notColorOnly} ${ACCESS.caption} ${ACCESS.contrast}
${camera && !voice ? `**Chế độ lớp:** ${CLASSROOM.twoPlayer}\n**Tay thuận:** ${ACCESS.handedness}\n` : ''}**Giao diện:** đề bài >= 28px trên desktop và >= 20px trên điện thoại, tương phản chữ >= 4.5:1, responsive cả dọc lẫn ngang; HUD có nhiệm vụ + điểm + chuỗi đúng + tiến độ + trạng thái camera; có Pause, Replay, Giảm hiệu ứng chuyển động${camera ? ' và Tắt camera' : ''}; không leaderboard, không quảng cáo. ${RULES.perf}
**An toàn + riêng tư + tiếng Việt:** ${RULES.safety} Mỗi động tác đều có phiên bản ngồi tại chỗ; không quay chạy nhảy, không rời vùng camera. Không upload ảnh/video từ camera, chỉ giữ landmark trong bộ nhớ, tiến độ lưu localStorage máy đó. Toàn bộ UI, tên nút, hướng dẫn, thông báo và lời giải bằng TIẾNG VIỆT (chỉ học liệu ${subjectNote}); không để lộ thuật ngữ kỹ thuật confidence / cooldown / fallback cho học sinh.
**Chữ ký MiTi (bắt buộc trong HTML):** ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang hoặc màn kết quả có dòng "MiTi • Học bằng chuyển động"; không xóa hay đổi tên thương hiệu khi replay hoặc ở chế độ không camera.
**Bảng kiểm nghiệm thu:** ${accept} ${ACCEPT.items} ${ACCEPT.manual}
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
- **Thi đua + cao trào:** cú "ồ" 3 giây đầu khi vào gameplay · "miti-best" + sự kiện "PHÁ KỶ LỤC!" khi thật sự vượt mốc của chính em · vệt ghost alpha <= 0.35 chạy theo lượt tốt nhất phiên trước · hiệp 3 "HIỆP QUYẾT ĐỊNH" nhân đôi điểm (vẫn 4 lượt + trạm nghỉ 5 giây) · nghi thức mở thưởng 2,5 giây cuối hiệp, luôn có quà, không đổi level thích ứng · đích chung "Cả nhóm: <x>/<mốc 40>" và không bao giờ là bảng xếp hạng bạn.
- **Ham quay lại:** dòng "Còn 1 câu nữa tới mốc <m>" khi em cách mốc 10/20/30 đúng một câu · "khiên chuỗi" trong localStorage \`miti-tokens\` (tối đa 2, chỉ giữ chuỗi — vẫn trừ tim, vẫn hiện lời giải, vẫn vào hàng đợi luyện lại) · màn tổng kết hé "Chương tiếp theo" theo đúng errorTag em còn yếu + nút "Xem trước" 6 giây · hẹn "Lần sau em quay lại sẽ có <n> câu đang chờ" đếm từ \`miti-review\` · lưới bộ sưu tập 6 ô, ô chưa mở là "? ? ?" kèm "còn thiếu <k> thẻ" · nghi thức lưu phiên 3 giây "Đã lưu: ...". Không chuỗi ngày, không quyền thông báo, nghỉ chơi không bị phạt.
- **Thể dục có cấu trúc:** khởi động 60–90 giây trước hiệp 1 (không tính điểm), thẻ bay vào 3,0–4,5 giây và ở lại <= 8 giây, >= 12 nhịp chuyển động mỗi phút, đồng hồ vận động >= 60% thời lượng phiên, hạ nhiệt 45–60 giây trước màn tổng kết, nhắc uống nước đúng một lần, và trần tải trọng (cấm nhảy tiếp đất, xoay nhanh quá 90 độ, giữ tay trên cao quá 15 giây).
- **Lớp học thật:** chữ và HUD không đè lên thân học sinh, cơ chế chọn theo mức camera đang thấy, hồ sơ tiến bộ "miti-mastery" xếp câu theo lỗi yếu nhất, có chế độ hai học sinh trong một khung hình (trừ biến thể VOICE).
- **Tiếp cận:** không hiệu ứng nào nhấp nháy quá 3 lần/giây, \`prefers-reduced-motion\` được đọc lúc khởi động và bật sẵn chế độ Giảm hiệu ứng (không giảm nội dung học), đúng/sai phân biệt bằng >= 2 kênh ngoài màu, mọi âm thanh có bản chữ, tương phản chữ >= 4.5:1, có chọn tay thuận lúc calibration (trừ biến thể VOICE và NO-CAMERA).
- **Nhẹ đầu:** một lượt chỉ MỘT thao tác tư duy (đề \`tinh\` tối đa một dấu phép tính), >= 60% mục là \`dang: "nhin"\` nhìn–chỉ–chọn, đề <= 16 từ và được đọc to bằng speechSynthesis; điểm một lượt là +6 động tác / +3 đáp án, hiệu ứng nổ tại điểm chạm trước khi biết đúng sai; không có đồng hồ đếm ngược nào trên câu hỏi và trạm nghỉ 5 giây giữa hiệp là một mini-trạm chơi không hỏi bài.
- **Khoảnh khắc ăn mừng:** pháo giấy 40–60 hạt chỉ nổ ở 4 loại mốc (đích chung, PHÁ KỶ LỤC, mở thưởng hiệp 3, xong mini-trạm nghỉ) chứ không nổ mỗi câu đúng; AudioContext chỉ mở sau cú bấm Bắt đầu, mỗi SFX <= 200 ms, master gain <= 0.25, <= 4 giọng đồng thời, có nút "Tắt tiếng" lưu \`miti-mute\`; slow-mo 0,45× đúng 600 ms cho thẻ vàng và 1,5 giây cuối hiệp 3; \`navigator.vibrate\` 20/60/100 ms bọc trong \`if (navigator.vibrate)\`; mascot có một màn hài hình thể 3 giây mỗi hiệp khi chuỗi đạt 3; trước hiệp 3 là 4 giây "Cả lớp: 3 – 2 – 1 – CHỐT!" để bốn em cùng hô và cùng làm một động tác mở màn.
- **Bản sắc riêng:** mỗi game có mascot tên riêng <= 2 từ xuất hiện >= 5 chỗ, bộ ba màu \`--miti-1/2/3\` riêng (hai game cùng cụm kiến thức phải cách nhau >= 60/441 RGB ở \`--miti-1\`), đúng MỘT khoảnh khắc chữ ký 1 lần/phiên dài >= 2 giây không đổi luật, MỘT đạo cụ AR neo vào landmark của em, và ba câu thoại riêng <= 6 từ đọc bằng speechSynthesis; tất cả khai trong \`IDENTITY_DATA\` ở đầu khối <script> và \`verifyIdentity()\` kiểm lúc nạp — 85 game không được trùng tên, trùng màu hay trùng chữ ký.
- **Đề phải tự kiểm được:** engine chạy \`verifyQuestionBank()\` một lần lúc nạp và loại mọi mục lỗi (đáp án không có trong choices, hai phương án trùng nhau, level lệch với số bước, số vượt phạm vi SGK); vị trí đáp án đúng phân bố đều 1/3 ± 10%.
- **Độ khó theo năng lực:** 2 câu đúng liên tiếp thì lên một level, 2 câu sai liên tiếp thì xuống một level cùng \`errorTag\`; không em nào được phép sai quá 3 câu liên tiếp; level ẩn với học sinh và chỉ hiện ở tổng kết cho giáo viên.
- **Nhớ bài có lịch:** câu đã sửa đúng 2 lần được xếp ôn lại vào +1, +3, +7 ngày (nhớ vững thì giãn +21) trong localStorage \`miti-review\`; phiên có >= 3 lượt xen cụm khác và >= 1 lượt ôn đến hạn; 10 giây "Em còn nhớ không?" trước lượt 1; "Vì sao đúng?" ở 4/12 lượt; quên thì không trừ tim, tổng kết chia "vẫn nhớ / cần ôn lại" kèm tờ rời copy cho giáo viên.
- **Nghiệm thu:** mọi block đều đòi một bảng kiểm ẩn mở bằng 7 lần chạm logo MiTi, trạng thái do code kiểm thật lúc chạy — ${MACHINE_ITEMS.length} mục máy tự kiểm (trong đó ${CAMERA_ONLY.length} mục gắn 📷 chỉ áp dụng khi có webcam) + ${HUMAN_CHECKS.length} việc người thử bấm tay. Bảng in sẵn để cầm tay khi vào lớp: \`prompts/CHECKLIST_NGHIEP_THU.md\`.
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
