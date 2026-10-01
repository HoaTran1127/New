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
import { ACCEPT, ACCEPT_SHORT, MACHINE_ITEMS } from './lib/acceptance.mjs';
import { PE, PE_SHORT } from './lib/pe.mjs';
import { RETENTION, RETENTION_SHORT } from './lib/memory.mjs';
import { HYPE, HYPE_SHORT } from './lib/hype.mjs';
import { ANT, ANT_SHORT } from './lib/anticipation.mjs';
import { LIGHT, LIGHT_SHORT } from './lib/light.mjs';
import { CELEBRATE, CELEBRATE_SHORT } from './lib/celebrate.mjs';
import { IDENTITY, IDENTITY_SHORT } from './lib/identity.mjs';
import { RHYTHM, RHYTHM_SHORT } from './lib/rhythm.mjs';
import { QUEUE, QUEUE_SHORT } from './lib/queue.mjs';
import { LESSON, LESSON_SHORT } from './lib/lesson.mjs';
import { CURRICULUM, CURRICULUM_SHORT } from './lib/curriculum.mjs';
import { SPORT, SPORT_SHORT } from './lib/sport.mjs';
import { FAMILY, FAMILY_SHORT } from './lib/family.mjs';
import { PACE, PACE_SHORT, hocKi } from './lib/pacing.mjs';
import { PLAYZONE, PLAYZONE_SHORT } from './lib/playzone.mjs';
import { FOLK, FOLK_SHORT } from './lib/folk.mjs';
import { QUIZ, QUIZ_SHORT } from './lib/quiz.mjs';
import { standard } from './data/standards.mjs';
import { sport } from './data/sports.mjs';
import { folk } from './data/folk.mjs';
import { quizFrames } from './data/quiz.mjs';
import { identity } from './data/identities.mjs';

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
        dang: r.dang,
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
  const st = standard(g.cluster);
  const sp = sport(g.gestures[0]);
  const fk = folk(g.gestures[0]);
  const qf = quizFrames(st.mach);
  const ex = EXAMPLES[g.cluster];
  const it = identity(g.id);
  if (!it) throw new Error(`Thiếu bản sắc cho game ${g.id} — bổ sung tools/data/identities.mjs.`);
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
- Mạch kiến thức (bảng chuẩn ${gradeTxt}, không tự đặt tên khác): **${st.mach}** — nhãn ngắn trên HUD: "${st.ngan}".
- Yêu cầu cần đạt của cụm này (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời" copy được, cấm viết lại hoặc tóm tắt): "${st.yc}"
- Tuần học của cụm này: **Tuần ${st.tuan[0]}–${st.tuan[1]} · Học kì ${hocKi(st.tuan[0])}** — in đúng nhãn đó ở màn khởi động và màn tổng kết (chữ >= 18px, nằm trong khối "Copy tờ rời"), lấy từ cột \`tuan\` của \`tools/data/standards.mjs\`, kèm đúng một dòng <= 14 từ "theo phân phối chung — cô xác nhận tuần của lớp em".
- Mẹo nhớ của cụm (<= 12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm MỘT động tác 3 giây làm mẫu): "${st.meo}"
- "Dễ nhầm" báo TRƯỚC câu đầu tiên của cụm trong phiên (chọn đúng một ý trong danh sách lỗi dưới đây, <= 16 từ, tắt sau 6 giây, không che đề): "${ERROR_NOTES[g.cluster].split('; ')[0]}".
- Môn thể thao của game này (mã điều khiển ${g.gestures[0]}, không tự đổi môn trong một phiên): **${sp.mon}** — động tác đặc trưng "${sp.dongTac}", hiệu lệnh mở đầu "${sp.hieuLenh}", lời hay khi bạn sai "${sp.loiHay}", động tác duỗi cơ cuối buổi "${sp.duoiCo}".
- Trò chơi dân gian dẫn dắt của game này (cùng mã điều khiển ${g.gestures[0]}, lấy nguyên văn từ \`tools/data/folk.mjs\`, không tự đổi trò trong một phiên): **${fk.tro}** — cách chơi "${fk.loiCho}", lời hô theo nhịp "${fk.chant}" (\`${fk.loai}\`), đồ dùng AR "${fk.doDung}", trò ${fk.dieu}. Tên trò nằm ở dòng "Cách chơi" dưới màn chào và ở nhãn mini-trạm, KHÔNG chiếm góc HUD của tên môn.
- Mẫu câu "Đố bạn" của game này (mạch "${st.mach}", lấy nguyên văn ba mẫu dưới đây từ \`tools/data/quiz.mjs\`, đúng BA/12 lượt ở cuối mỗi hiệp em đố đọc to MỘT mẫu và điền MỘT số hoặc MỘT từ đang hiện trên thẻ, game không bật microphone): "${qf[0]}" · "${qf[1]}" · "${qf[2]}".
- Bốn dòng của khối "Gửi bố mẹ" ở màn tổng kết (in đúng bốn dòng này, chỉ thay chỗ <n>, <k>, <tổng> bằng số thật của phiên): "Hôm nay con tập môn **${sp.mon}** — <n> động tác" · "Con học ${st.ngan}, <k> câu đúng trên <tổng>" · "Mẹo con mang về: ${st.meo}" · "Việc 3 phút ở nhà: cả nhà cùng ${sp.dongTac} rồi hỏi nhau miệng một đề vừa chơi".
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): ${ERROR_NOTES[g.cluster]}.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. THẾ GIỚI AR VÀ VÒNG CHƠI
- Bối cảnh: ${g.setting}
- Bản sắc riêng của game này — \`const IDENTITY_DATA\` đặt ở ĐẦU khối <script>, dùng đúng năm giá trị sau, không thay bằng generic và không chép của game khác:
  - Mascot: **${it.mascot}** — ${it.tinhCach}
  - Bảng màu: \`--miti-1: ${it.palette[0]}\` cho vật thể AR chính, \`--miti-2: ${it.palette[1]}\` cho particle và viền hit, \`--miti-3: ${it.palette[2]}\` cho điểm nhấn HUD
  - Khoảnh khắc chữ ký: ${it.signature}
  - Đạo cụ AR neo vào người chơi: ${it.prop}
  - Ba câu thoại: khen "${it.lines[0]}" · đỡ khi sai "${it.lines[1]}" · hô mở đầu "${it.lines[2]}"
- ${IDENTITY.mascot}
- ${IDENTITY.palette}
- ${IDENTITY.signature}
- ${IDENTITY.prop}
- ${IDENTITY.lines}
- ${IDENTITY.guard}
- Không gian chơi: học sinh đứng trước camera và mọi vật thể xuất hiện NGAY TRONG khung hình thật của các em (đi vào từ phía sau, tiến về phía người chơi), không nằm trong một bảng game tách rời.
- Cơ chế chính: ${GESTURES[g.gestures[0]].vi}. Nhiệm vụ hiển thị bằng một dòng chữ to trên HUD, không cần đọc hướng dẫn.
- ${MOTION.amplitude}
- ${MOTION.reach}
- ${MOTION.variety}
- ${MOTION.breather}
- ${LIGHT.playStation}
- ${PE.warmUp}
- ${PE.pace}
- ${PE.activeShare}
- ${PE.coolDown}
- ${PE.loadCap}
- Độ dài: 12 lượt chính. Lượt 5 và lượt 9 chỉ là mốc NHỊP: thêm một bước trung gian và rút thời gian hiển thị hạt, không rút thời gian đọc đề. Level của lượt chơi không đổi theo vị trí mà do thích ứng quyết định (bốn dòng dưới).
- ${ADAPT.levelShift}
- ${ADAPT.failFloor}
- ${ADAPT.hiddenLevel}
- ${LIGHT.noRush}
- ${RETENTION.spacedQueue}
- ${RETENTION.interleave}
- ${HYPE.climax}
- ${HYPE.personalBest}
- ${HYPE.ghost}
- ${HYPE.sharedGoal}
- ${ANT.nearMiss}
- ${ANT.carryToken}
- ${LIGHT.motionScores}
- Sai không phạt bằng cách biến mất kiến thức: vẫn hiện lời giải đầy đủ.
- Điều kiện thua: ${english ? 'hết 5 tim (mỗi đáp án sai trừ 1 tim)' : 'hết 5 tim (mỗi đáp án sai trừ 1 tim)'}. Điều kiện thắng: hết 12 lượt, hiện tổng kết.
- Chống ăn may: ${RULES.antiLuck}
- ${english ? 'Từ và câu tiếng Anh xuất hiện trong phần học liệu; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt.' : 'Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK ' + gradeTxt + '.'}

3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo \`const QUESTION_DATA = [...]\` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }.
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
- ${LIGHT.oneThought}
- ${LIGHT.visualShare}
- ${LIGHT.shortPrompt}
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
- ${RETENTION.recallPrimer}
- ${RETENTION.explainBack}
- ${RETENTION.forgettingGuard}
- Màn tổng kết nhóm theo errorTag: "Em hay sai ở: ${ERROR_NOTES[g.cluster].split('; ')[0]}" — kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.
- ${RULES.summary}
- ${MOTION.meter}
- ${CLASSROOM.mastery}
- ${RETENTION.teacherNote}
- ${ANT.openLoop}
- ${ANT.comeback}
- ${ANT.saveCeremony}
${english ? `- ${RULES.listening}\n` : ''}${english ? `- ${RULES.listening}\n- Dùng window.speechSynthesis đọc to từ/câu tiếng Anh (en-US hoặc en-GB) khi trả lời đúng, có nút phát lại ở màn học liệu.` : '- Hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài của ' + gradeTxt + '.'}

7. GIAO DIỆN VÀ AN TOÀN
- Bố cục: Bắt đầu → Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → KHỞI ĐỘNG 60–90 giây → 10 giây "Em còn nhớ không?" → 12 lượt chính → Phản hồi → Ôn câu sai → HẠ NHIỆT 45–60 giây → Kết quả → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive cả dọc và ngang.
- ${ACCESS.contrast}
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động và nút "Chỉnh lại tư thế". Không leaderboard, không quảng cáo.
- ${ACCESS.flash}
- ${ACCESS.reducedMotion}
- ${RULES.autoPause}
- ${RULES.perf}
- ${RULES.audio}
- ${CELEBRATE.sfx}
- ${FEEL.combo}
- ${FEEL.fx}
- ${FEEL.bonus}
- ${CELEBRATE.slowmo}
- ${FEEL.mascot}
- ${CELEBRATE.slapstick}
- ${CELEBRATE.confetti}
- ${CELEBRATE.haptics}
- ${CELEBRATE.crowd}
- NHẠC NỀN THEO NHỊP (vòng 14: khảo sát 85 prompt đếm "nhạc nền" 0/85, "BPM" 0/85 — giữa hai cú chạm game chỉ im lặng rồi "ting"):
- ${RHYTHM.beat}
- ${RHYTHM.move}
- ${RHYTHM.duck}
- ${RHYTHM.crescendo}
- ${RHYTHM.quiet}
- ${RHYTHM.guard}
- ${HYPE.hook}
- ${HYPE.reveal}
- ${CLASSROOM.twoPlayer}
- VAI CHỜ CÓ VẬN ĐỘNG (vòng 15: khảo sát 85 prompt đếm "bốn em" 85/85 nhưng "cổ vũ" 0/85, "trọng tài" 0/85, "đến lượt" 0/85 — game biết lớp có bốn em mà không nói ba em kia làm gì):
- ${QUEUE.roles}
- ${QUEUE.rotate}
- ${QUEUE.waitCap}
- ${QUEUE.spacing}
- ${QUEUE.teamScore}
- ${QUEUE.guard}
- TIẾT HỌC 45 PHÚT + GẮNG SỨC THẬT (vòng 16: khảo sát 85 prompt đếm "8–10 phút" 0/85, "45 phút" 0/85, "gắng sức" 0/85, "hồi nhịp" 0/85 — game biết em phải với tay xa nhưng không biết một phiên dài bao lâu và em đã mệt tới đâu):
- ${LESSON.sessionCap}
- ${LESSON.rotationFit}
- ${LESSON.rpe}
- ${LESSON.recovery}
- ${LESSON.lessonSheet}
- ${LESSON.guard}
- CHUẨN KIẾN THỨC SGK (vòng 17: khảo sát 85 prompt đếm "mạch kiến thức" 0/85, "yêu cầu cần đạt" 0/85, "chuẩn kiến thức" 0/85, "mẹo nhớ" 0/85, "Dễ nhầm" 0/85 — game biết ra đề trong phạm vi SGK nhưng không câu nào nói nó thuộc mạch nào và lớp cần đạt tới đâu, nên giáo viên không đối chiếu được và cái bẫy học sinh hay mắc thì không ai báo trước):
- ${CURRICULUM.machNhan}
- ${CURRICULUM.ycDong}
- ${CURRICULUM.machTron}
- ${CURRICULUM.bayTruoc}
- ${CURRICULUM.meoDongTac}
- ${CURRICULUM.guard}
- CHẤT THỂ THAO (vòng 18: khảo sát 85 prompt đếm "môn thể thao" 0/85, "đồng đội" 0/85, "tinh thần thể thao" 0/85, "bảng thành tích" 0/85, "duỗi cơ" 0/85, "hồi tĩnh" 0/85 — game biết em phải với tay xa, mệt tới đâu và câu đó thuộc mạch nào, nhưng không động tác nào là động tác của một môn thể thao có tên, nên trẻ không hình dung mình đang tập thể dục thể thao còn giáo viên thì không có thành tích của cả đội để tuyên dương):
- ${SPORT.monDanh}
- ${SPORT.dongTacChinh}
- ${SPORT.tiepSuc}
- ${SPORT.tinhThan}
- ${SPORT.thanhTich}
- ${SPORT.hoiTinh}
- ${SPORT.guard}
- GIA ĐÌNH — TỜ GỬI BỐ MẸ (vòng 19: khảo sát 85 prompt đếm "phụ huynh" 0/85, "gia đình" 0/85, "bố mẹ" 0/85, "ở nhà" 0/85, "bài tập về nhà" 0/85 trong khi "tờ rời" đã 85/85 — tờ rời hiện hành viết cho GIÁO VIÊN đối chiếu yêu cầu cần đạt và tính giờ lên lớp, không một dòng nào nói cho người ở nhà biết con vừa tập môn gì, mẹo nào, và làm gì cùng con mà không phải mở thêm một màn hình):
- ${FAMILY.guiBoMe}
- ${FAMILY.baPhut}
- ${FAMILY.meoNha}
- ${FAMILY.riengTu}
- ${FAMILY.khongDoi}
- ${FAMILY.guard}
- TUẦN HỌC — LỚP ĐANG HỌC TỚI TUẦN MẤY (vòng 20: khảo sát 85 prompt đếm "tuần 1" 0/85, "tuần 12" 0/85, "theo tuần" 0/85, "phân phối chương trình" 0/85, "học kì" 0/85, "giữa kì" 0/85, "đến tuần" 0/85 — kể cả catalogs/curriculum/toan-lop-4-5-sgk-matrix.md cũng 0 lần chữ "tuần": game biết câu hỏi thuộc mạch nào và lớp cần đạt tới đâu, nhưng không biết mạch đó thường dạy từ tuần mấy, nên giáo viên cầm 85 thẻ mà không biết mở game nào cho tiết hôm nay):
- ${PACE.nhanTuan}
- ${PACE.hoiMotCau}
- ${PACE.onTheoTuan}
- ${PACE.nuocRut}
- ${PACE.tongOn}
- ${PACE.guard}
- CHỖ CHƠI AN TOÀN (vòng 21: khảo sát 85 prompt đếm "dép" 0/85, "quai hậu" 0/85, "giày" 0/85, "chân đất" 0/85, "sàn trơn" 0/85, "bàn ghế" 0/85, "chật" 0/85, "đứng tại chỗ" 0/85, "vùng vung tay" 0/85 — dòng an toàn hiện hành của RULES.safety có ở 85/85 prompt nhưng chỉ là MỘT câu mơ hồ dùng đơn vị "một bước" trong khi tầng vai chờ đã đo bằng "1 sải tay" và ">= 1,2 m", lại CẤM "rời khỏi chỗ" mà không có bản thay thế tại chỗ, không nói gì về giày dép hay sàn vừa lau, và không có cách nào để một em đang đau xin dừng mà không bị trừ tim):
- ${PLAYZONE.depCho}
- ${PLAYZONE.giayDep}
- ${PLAYZONE.lopChat}
- ${PLAYZONE.locDongTac}
- ${PLAYZONE.nutMet}
- ${PLAYZONE.guard}
- SÂN CHƠI VIỆT NAM (vòng 22: khảo sát 85 prompt đếm "dân gian" 0/85, "đồng dao" 0/85, "ô ăn quan" 0/85, "nhảy dây" 0/85, "kéo co" 0/85, "rồng rắn" 0/85, "sân trường" 0/85, "vạch phấn" 0/85, "viên sỏi" 0/85 — trong khi "GO" 0/85 và "TEAM" 0/85 nên chữ Tây trên HUD đã bị chặn từ lâu: thứ còn thiếu là KHUNG CHƠI. Vòng 18 bắt em tập bắn cung, bóng bàn, phi tiêu là những môn không có ở sân trường làng, nên em không hình dung động tác mình vừa làm là của cái gì; không tầng nào quy định tiếng đếm giữa các nhịp nên khoảng trống đó đầy beep điện tử trong khi đồng dao mới là nhịp tập thể dục của trẻ Việt Nam; và không quy định nào về đồ dùng nên mô hình hay đòi em nhặt viên sỏi, cầm quả chuyền — ở lớp 45 em là mất nửa tiết để phát và thu):
- ${FOLK.chonTro}
- ${FOLK.dongDao}
- ${FOLK.banAnToan}
- ${FOLK.doDung}
- ${FOLK.doiBan}
- ${FOLK.guard}
- ĐỐ BẠN — EM ĐẶT ĐỀ CHO BẠN ĐÁP (vòng 23: khảo sát 85 prompt đếm "đố bạn" 0/85, "người đố" 0/85, "em ra đề" 0/85, "tự đặt đề" 0/85, "hoàn thành câu" 0/85, "em đọc to" 0/85, micro chỉ 3/85 tức đúng ba game mã VOICE — ngược lại "ngân hàng câu hỏi" 85/85 và "đề bài hiện" 85/85: trong mọi game hiện hành đề luôn do máy đưa ra và em chỉ trả lời, nên em không bao giờ bị đặt vào mức phải hiểu câu hỏi đủ sâu để tự đặt nó, và tiếng nói của em gần như không có việc dù rules.mjs bắt luyện phát âm; thêm nữa em bị bạn đố một câu ngoài tầm thì không có đường lùi nào ngoài mất 1 tim):
- ${QUIZ.nguonDe}
- ${QUIZ.cachDo}
- ${QUIZ.dapCuaBan}
- ${QUIZ.xuLyLech}
- ${QUIZ.diemVai}
- ${QUIZ.guard}
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề ${g.name}, lưu localStorage key "miti-collection", có màn "Sưu tập của em".
- ${ANT.collectionGap}
- Ngồi tại chỗ vẫn chơi được; không yêu cầu chạy nhảy hay động tác nguy hiểm; không rời khỏi vùng camera.
- ${RULES.safety}
- ${PE.water}
- KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân.
- Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi, lời giải thích bằng TIẾNG VIỆT${english ? ' (chỉ học liệu tiếng Anh giữ nguyên tiếng Anh)' : ''}. Không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.

8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.
- Xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; nhỏ, không che vùng tương tác.
- Chân trang hoặc màn kết quả có dòng: MiTi • Học bằng chuyển động.
- Không xóa hoặc đổi tên thương hiệu khi replay, khi vào gameplay hoặc ở chế độ không camera.

9. NGHIỆM THU
- ${ACCEPT.selfReport}
- ${ACCEPT.items}
- ${ACCEPT.printable}
- ${ACCEPT.failRule}
- ${ACCEPT.manual}
- Bảng kiểm in sẵn cho người thử nằm trong \`prompts/CHECKLIST_NGHIEP_THU.md\` của bản chuẩn MiTi; game phải tự kiểm được ${MACHINE_ITEMS.length} mục ở trên mà không cần ai đọc code.

10. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.
- Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".
- Tự kiểm tra trước khi xuất: camera xin sau nút Bắt đầu · có loading/error/định vị · 640×480 và lật gương · nền AR là khung hình camera với lớp phủ tối không vượt 0.45 · mọi tọa độ đi qua toScreen, không còn phép nhân thô với W/H · vật thể có z và bóng dưới chân · có ít nhất một vật ảo neo vào landmark cơ thể · gesture fire theo lượt chuyển + cooldown + confidence · không tính hover là đã chọn · calibration đo tầm tay và đặt ngưỡng theo đơn vị vừa đo · ${MOTION_SHORT} · ${PE_SHORT} · ${RETENTION_SHORT} · ${FEEL_SHORT} · ${HYPE_SHORT} · ${ANT_SHORT} · ${CLASSROOM_SHORT} · ${ACCESS_SHORT} · ${VERIFY_SHORT} · ${ADAPT_SHORT} · ${LIGHT_SHORT} · ${CELEBRATE_SHORT} · ${IDENTITY_SHORT} · ${RHYTHM_SHORT} · ${QUEUE_SHORT} · ${LESSON_SHORT} · ${CURRICULUM_SHORT} · ${SPORT_SHORT} · ${FAMILY_SHORT} · ${PACE_SHORT} · ${PLAYZONE_SHORT} · ${FOLK_SHORT} · ${QUIZ_SHORT} · ${ACCEPT_SHORT} · tab ẩn hoặc mất tiêu điểm là tự Pause, quay lại đếm 3-2-1 · nhận diện 1 lần mỗi 2–3 khung hình, particle có pool, tự giảm chi tiết khi FPS tụt · tổng kết ba thẻ "Làm tốt / Cần luyện / Động tác lần sau" · ${GESTURES[g.gestures[0]].vi.toLowerCase()} hoạt động đúng cơ chế · fallback chuột/chạm chơi trọn vẹn · QUESTION_DATA đủ ${bank.so} mục, mỗi mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · tổng kết theo nhóm lỗi · bộ sưu tập lưu localStorage · chữ ký MiTi ở ba màn · file chạy độc lập không lỗi console.
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
