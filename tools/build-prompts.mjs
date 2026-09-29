import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { GESTURES, BANK } from './data/gestures.mjs';
import { CLUSTER_KEYS, cluster } from './data/clusters.mjs';
import { EXAMPLES } from './data/examples.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { readCatalog } from './lib/csv.mjs';
import { AR_RENDER, TASKS_VISION } from './lib/ar.mjs';
import { RULES } from './lib/rules.mjs';
import { MOTION, FEEL, MOTION_SHORT, FEEL_SHORT } from './lib/feel.mjs';
import { CLASSROOM, CLASSROOM_SHORT } from './lib/classroom.mjs';
import { ACCESS, ACCESS_SHORT } from './lib/access.mjs';
import { VERIFY, ADAPT, VERIFY_SHORT, ADAPT_SHORT } from './lib/verify.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

const DIR_OF = { '4-Toán': '01-toan4', '5-Toán': '02-toan5', '4-Tiếng Anh': '03-english4', '5-Tiếng Anh': '04-english5' };

// In hai mục mẫu theo đúng khuôn QUESTION_DATA, có cả nhãn lỗi tiếng Việt hiển thị cho học sinh.
const jsonBlock = (rows, tags, notes) =>
  rows
    .map((r, i) => {
      const o = {
        id: 'q' + (i + 1),
        level: i + 1,
        prompt: r.prompt,
        choices: r.choices ?? null,
        answer: r.answer,
        explanation: r.explanation,
        errorTag: r.errorTag,
        loiViet: notes[tags.indexOf(r.errorTag)] ?? notes[0],
      };
      return '  ' + Object.entries(o).map(([k, v]) => k + ': ' + JSON.stringify(v)).join(', ');
    })
    .join('\n');

function gestureBlock(gestures) {
  const main = GESTURES[gestures[0]];
  if (!main) throw new Error('Không có khối gesture: ' + gestures[0]);
  let out = `- Cử chỉ chính — ${main.vi}: ${main.landmark}\n`;
  out += `- Biên độ động tác của cơ chế này: ${main.bien_do}\n`;
  out += `- Điều kiện chốt đáp án (hit): ${main.hinh_hoc}\n`;
  out += `- Làm mượt và chống spam: ${main.muot}\n`;
  out += `- Ngưỡng tin cậy: ${main.nguong}\n`;
  out += `- Phản hồi hình ảnh cho người chơi: ${main.nguoi_choi}\n`;
  out += `- Hòa vào nền AR: ${main.ar}\n`;
  if (gestures[1]) {
    const sub = GESTURES[gestures[1]];
    if (!sub) throw new Error('Không có khối gesture phụ: ' + gestures[1]);
    out += `- Cử chỉ phụ — ${sub.vi}: ${sub.landmark}\n- Chỉ dùng cho thao tác phụ, không được tranh chấp với cử chỉ chính: ${sub.hinh_hoc}\n`;
  }
  return out;
}

function render(c) {
  const g = c.game;
  const cl = cluster(g.cluster);
  const ex = EXAMPLES[g.cluster];
  const bank = BANK[c.subject];
  const gradeTxt = c.subject === 'Toán' ? `Toán lớp ${c.grade}` : `Tiếng Anh lớp ${c.grade}`;
  const english = c.subject === 'Tiếng Anh';

  return `# ${g.id} — ${g.name}

> ${c.subject} lớp ${c.grade} · Điều khiển: ${GESTURES[g.gestures[0]].vi} · Cụm kiến thức: ${g.cluster}
> Prompt độc lập: copy nguyên khối \`text\` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

\`\`\`text
Tạo game giáo dục web "${g.name.toUpperCase()}" cho học sinh Việt Nam lớp ${c.grade}, môn ${c.subject}.
Toàn bộ game nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

1. HỌC TẬP
- Mục tiêu học tập: ${cl.noi_dung}.
- Nhiệm vụ của học sinh trong mỗi lượt: ${g.mission}
- Phạm vi kiến thức: chỉ dùng nội dung ${gradeTxt} đã học. Cấm ra đề vượt chương trình, cấm số hoặc từ vựng ngoài phạm vi trên.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): ${ERROR_NOTES[g.cluster]}.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. THẾ GIỚI AR VÀ VÒNG CHƠI
- Bối cảnh: ${g.setting}
- Không gian chơi: học sinh đứng trước camera và mọi vật thể xuất hiện NGAY TRONG khung hình thật của các em (đi vào từ phía sau, tiến về phía người chơi), không nằm trong một bảng game tách rời.
- Cơ chế chính: ${GESTURES[g.gestures[0]].vi}. Nhiệm vụ hiển thị bằng một dòng chữ to trên HUD, không cần đọc hướng dẫn.
- ${MOTION.amplitude}
- ${MOTION.reach}
- ${MOTION.variety}
- ${MOTION.breather}
- Độ dài: 12 lượt chính. Lượt 5 và lượt 9 chỉ là mốc NHỊP: thêm một bước trung gian và rút thời gian hiển thị hạt, không rút thời gian đọc đề. Level của lượt chơi không đổi theo vị trí mà do thích ứng quyết định (bốn dòng dưới).
- ${ADAPT.levelShift}
- ${ADAPT.failFloor}
- ${ADAPT.hiddenLevel}
- Điểm: +10 nhân chuỗi trả lời đúng. Sai không phạt bằng cách biến mất kiến thức: vẫn hiện lời giải đầy đủ.
- Điều kiện thua: ${english ? 'hết 5 tim (mỗi đáp án sai trừ 1 tim)' : 'hết 5 tim (mỗi đáp án sai trừ 1 tim)'}. Điều kiện thắng: hết 12 lượt, hiện tổng kết.
- Chống ăn may: ${RULES.antiLuck}
- ${english ? 'Từ và câu tiếng Anh xuất hiện trong phần học liệu; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt.' : 'Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK ' + gradeTxt + '.'}

3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo \`const QUESTION_DATA = [...]\` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet }.
- Tối thiểu ${bank.so} mục, chia 3 mức độ (level 1/2/3), mỗi mục có một đáp án đúng duy nhất kiểm chứng được bằng code.
- ${bank.luu_y}
- errorTag là mã máy của lỗi, lấy đúng một trong các nhãn: ${cl.tags.join(', ')}. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 1, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt; không để đáp án đúng luôn ở một vị trí.
- Trước khi viết engine, liệt kê trong comment 3 mục theo đúng khuôn rồi mới viết trọn mảng.
- ${VERIFY.selfCheck}
- ${VERIFY.distractorValid}
- ${VERIFY.rangeGuard}
- ${VERIFY.noGuessable}
- ${VERIFY.difficultySteps}
- Hai mục mẫu để bám theo khuôn (viết tiếp ${bank.so - 2} mục nữa, không được ít hơn):
${jsonBlock(ex, cl.tags, ERROR_NOTES[g.cluster].split('; '))}

4. NỀN AR, CAMERA VÀ GESTURE
${AR_RENDER}
- MediaPipe Tasks Vision, pin phiên bản: import từ ${TASKS_VISION.bundle}
  wasm: ${TASKS_VISION.wasm}
  model: ${g.gestures.some((x) => ['STEP', 'TWO_HAND_STRETCH', 'TWO_HAND_BALANCE', 'ANGLE_POSE'].includes(x)) ? TASKS_VISION.pose + ' (PoseLandmarker)' : TASKS_VISION.hand + ' (HandLandmarker)'}
${g.gestures.includes('VOICE') ? '- Riêng phần nói dùng Web Speech API SpeechRecognition (en-US), không dùng MediaPipe.\n' : ''}- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }). Khung hình 4:3; nếu camera cho tỉ lệ khác thì crop về vùng vẽ cố định, không để giãn hình làm sai tọa độ. Lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU. Trạng thái bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- ${CLASSROOM.framing}
- ${CLASSROOM.safeZone}
- Calibration động: ${RULES.calibration}
- ${ACCESS.handedness}
- Camera chỉ bật được trong môi trường an toàn (HTTPS, localhost hoặc mở file trực tiếp). Nếu trình duyệt chặn, báo một dòng tiếng Việt "Muốn dùng camera thì mở game qua HTTPS hoặc file trên máy em" rồi vào thẳng chế độ không camera, không để học sinh kẹt ở màn lỗi tiếng Anh.
${gestureBlock(g.gestures)}- Cử chỉ chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim.
- Confidence thấp thì không chốt đáp án.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi tự chuyển sang chế độ không camera, game vẫn chơi đủ.

5. FALLBACK (bắt buộc)
- Mouse / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính: ${GESTURES[g.gestures[0]].fallback}.
- Có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng, không cần tải lại trang.
- Mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.

6. PHẢN HỒI HỌC TẬP
- Đúng: phản hồi tích cực ngay (âm thanh vui + hạt sáng) và một dòng ghi nhớ ngắn.
- ${FEEL.hitStop}
- ${FEEL.cheer}
- ${ACCESS.notColorOnly}
- ${ACCESS.caption}
- Sai: DỪNG 2 giây, ${cl.giai_thich}; chỉ rõ bước hoặc chữ số hoặc từ cần sửa; không để hiệu ứng che lời giải.
- Câu sai được xếp vào CUỐI vòng chơi để luyện lại trong cùng phiên, ưu tiên xuất hiện lại sớm.
- Màn tổng kết nhóm theo errorTag: "Em hay sai ở: ${ERROR_NOTES[g.cluster].split('; ')[0]}" — kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.
- ${RULES.summary}
- ${MOTION.meter}
- ${CLASSROOM.mastery}
${english ? `- ${RULES.listening}\n` : ''}${english ? `- ${RULES.listening}\n- Dùng window.speechSynthesis đọc to từ/câu tiếng Anh (en-US hoặc en-GB) khi trả lời đúng, có nút phát lại ở màn học liệu.` : '- Hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài của ' + gradeTxt + '.'}

7. GIAO DIỆN VÀ AN TOÀN
- Bố cục: Bắt đầu → Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive cả dọc và ngang.
- ${ACCESS.contrast}
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động và nút "Chỉnh lại tư thế". Không leaderboard, không quảng cáo.
- ${ACCESS.flash}
- ${ACCESS.reducedMotion}
- ${RULES.autoPause}
- ${RULES.perf}
- ${RULES.audio}
- ${FEEL.combo}
- ${FEEL.fx}
- ${FEEL.bonus}
- ${FEEL.mascot}
- ${CLASSROOM.twoPlayer}
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề ${g.name}, lưu localStorage key "miti-collection", có màn "Sưu tập của em".
- Ngồi tại chỗ vẫn chơi được; không yêu cầu chạy nhảy hay động tác nguy hiểm; không rời khỏi vùng camera.
- ${RULES.safety}
- KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân.
- Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi, lời giải thích bằng TIẾNG VIỆT${english ? ' (chỉ học liệu tiếng Anh giữ nguyên tiếng Anh)' : ''}. Không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.

8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.
- Xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; nhỏ, không che vùng tương tác.
- Chân trang hoặc màn kết quả có dòng: MiTi • Học bằng chuyển động.
- Không xóa hoặc đổi tên thương hiệu khi replay, khi vào gameplay hoặc ở chế độ không camera.

9. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.
- Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".
- Tự kiểm tra trước khi xuất: camera xin sau nút Bắt đầu · có loading/error/định vị · 640×480 và lật gương · nền AR là khung hình camera với lớp phủ tối không vượt 0.45 · mọi tọa độ đi qua toScreen, không còn phép nhân thô với W/H · vật thể có z và bóng dưới chân · có ít nhất một vật ảo neo vào landmark cơ thể · gesture fire theo lượt chuyển + cooldown + confidence · không tính hover là đã chọn · calibration đo tầm tay và đặt ngưỡng theo đơn vị vừa đo · ${MOTION_SHORT} · ${FEEL_SHORT} · ${CLASSROOM_SHORT} · ${ACCESS_SHORT} · ${VERIFY_SHORT} · ${ADAPT_SHORT} · tab ẩn hoặc mất tiêu điểm là tự Pause, quay lại đếm 3-2-1 · nhận diện 1 lần mỗi 2–3 khung hình, particle có pool, tự giảm chi tiết khi FPS tụt · tổng kết ba thẻ "Làm tốt / Cần luyện / Động tác lần sau" · ${GESTURES[g.gestures[0]].vi.toLowerCase()} hoạt động đúng cơ chế · fallback chuột/chạm chơi trọn vẹn · QUESTION_DATA đủ ${bank.so} mục, mỗi mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · tổng kết theo nhóm lỗi · bộ sưu tập lưu localStorage · chữ ký MiTi ở ba màn · file chạy độc lập không lỗi console.
\`\`\`

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: \`${g.cluster}\` — đổi cluster nếu đổi dạng bài.
- Gesture: \`${g.rawGestures}\` — mỗi game tối đa 2 mã, mã đầu là mechanic chính.
- Muốn thêm nội dung mới: sửa \`tools/data/games.mjs\` rồi chạy \`node tools/build-prompts.mjs\`, không sửa tay file này.
`;
}

const rows = readCatalog(path.join(ROOT, 'catalogs/GAME_CATALOG.csv'));
const byId = new Map(GAMES.map((g) => [g.id, g]));
const missing = rows.filter((r) => !byId.has(r.id));
if (missing.length) throw new Error('Thiếu enrichment cho: ' + missing.map((r) => r.id).join(', '));
const orphan = GAMES.filter((g) => !rows.find((r) => r.id === g.id));
if (orphan.length) throw new Error('Enrichment không khớp catalog: ' + orphan.map((g) => g.id).join(', '));

let n = 0;
for (const r of rows) {
  const g = byId.get(r.id);
  const target = path.join(ROOT, r.prompt);
  if (!fs.existsSync(target)) throw new Error('Đường dẫn catalog không tồn tại: ' + r.prompt);
  fs.writeFileSync(target, render({ grade: r.lop, subject: r.mon, id: r.id, game: g }), 'utf8');
  n++;
}
console.log('Đã sinh', n, 'prompt game.', CLUSTER_KEYS.length, 'cụm kiến thức.');
