import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { cluster } from './data/clusters.mjs';
import { EXAMPLES } from './data/examples.mjs';
import { danhSachNhanLoi, noteChoLoi } from './data/error-tags.mjs';
import { PROP_KEYS, prop } from './data/props.mjs';
import { buildLessons, notesCuaGiaoAn, CHUA_CO_GAME_CUM, CHU_DE_CHI_CO_GIAO_AN } from './data/lessons.mjs';
import { readCatalog } from './lib/csv.mjs';
import { AR_LESSON, TASKS_VISION } from './lib/ar.mjs';
import { RULES } from './lib/rules.mjs';
import { CLASSROOM } from './lib/classroom.mjs';
import { ACCESS, ACCESS_SHORT } from './lib/access.mjs';
import { CHALK, CHALK_SHORT, SOLID_CLUSTERS, BODY_CLUSTERS, SO_QUY_DINH, SO_TU_CHUNG } from './lib/chalk.mjs';
import { LESSON, LESSON_SHORT, HO_TRO } from './lib/lesson.mjs';
import { VERIFY, VERIFY_SHORT } from './lib/verify.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'prompts', 'giao-an');

// In câu mẫu theo đúng khuôn LESSON_DATA để mô hình có khuôn mà bám.
// Hai mục mẫu mang hai mức hỗ trợ ĐẦU TIÊN của bậc thang (làm mẫu rồi cùng làm), vì phần tử thứ
// ba trở đi do mô hình tự viết và phải tự xếp đủ 2-2-2 theo quy định release.
const HO_TRO_MAU = [HO_TRO[0], HO_TRO[1]];
const jsonBlock = (rows, clusterKey, notes) =>
  rows
    .map((r, i) => {
      const o = {
        id: 'q' + (i + 1),
        prompt: r.prompt,
        choices: r.choices ?? null,
        answer: r.answer,
        explanation: r.explanation,
        errorTag: r.errorTag,
        loiViet: noteChoLoi(clusterKey, notes, r.errorTag),
        ho_tro: HO_TRO_MAU[i] ?? HO_TRO[2],
      };
      return '  ' + Object.entries(o).map(([k, v]) => k + ': ' + JSON.stringify(v)).join(', ');
    })
    .join('\n');

// Danh sách game cùng cụm: giáo viên muốn cho học sinh luyện tập sau tiết thì dùng bản này.
const gameLinks = (games, lop) =>
  games
    .map((g) => {
      const dir = lop === '4' ? '01-toan4' : '02-toan5';
      const hit = fs.readdirSync(path.join(ROOT, 'prompts', dir)).find((f) => f.toLowerCase().startsWith(g.id.toLowerCase()));
      return hit ? `\`${g.id} — ${g.name}\` (prompts/${dir}/${hit})` : `\`${g.id} — ${g.name}\``;
    })
    .join(' · ');

// Dòng "Bản game..." ở đầu giáo án: bài thường nối sang game cùng cụm, bài lesson-only thì phải nói
// rõ là chưa có, để người đọc không đi tìm một file không tồn tại.
const banGameLine = (L) =>
  L.games.length ? `> Bản game của cùng cụm kiến thức này: ${gameLinks(L.games, L.lop)}` : `> ${CHUA_CO_GAME_CUM}`;

// Hai quy định hình học chỉ in vào bài có hình học — xem SOLID_CLUSTERS / BODY_CLUSTERS trong chalk.mjs.
const them = (c) => (SOLID_CLUSTERS.includes(c) ? 1 : 0) + (BODY_CLUSTERS.includes(c) ? 1 : 0);

// Mục 4 của giáo án: 10 quy định bảng phấn luôn có, hai quy định hình học nối xen giữa theo cụm
// (xen ở đây để khối 3D và góc đứng cạnh narrate, đúng chỗ mạch bài cần chúng).
const chalkBlock = (c) => {
  const list = [CHALK.board, CHALK.chalkWrite, CHALK.concretize, CHALK.represent, CHALK.wordProblem, CHALK.fractionCut, CHALK.measure];
  if (SOLID_CLUSTERS.includes(c)) list.push(CHALK.solid3d);
  if (BODY_CLUSTERS.includes(c)) list.push(CHALK.bodyTool);
  list.push(CHALK.narrate, CHALK.handCare, CHALK.persist);
  return list.map((r) => `- ${r}`).join('\n');
};


function render(L) {
  const notes = notesCuaGiaoAn(L);
  const nhanLoi = danhSachNhanLoi(L.cluster, EXAMPLES[L.cluster]);

  return `# ${L.id} — ${L.ten}

> GIÁO ÁN GIẢNG BÀI · Toán lớp ${L.lop} · Cụm kiến thức: \`${L.cluster}\`
> Prompt độc lập: copy nguyên khối \`text\` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.
> ⚠️ Đây là **CÔNG CỤ GIẢNG BÀI cho giáo viên trình bày trước cả lớp**, KHÔNG phải game cho học sinh chơi.
${banGameLine(L)}

\`\`\`text
Tạo CÔNG CỤ GIẢNG BÀI web "${L.ten.toUpperCase()}" cho giáo viên dạy môn Toán lớp ${L.lop} ở Việt Nam, trình bày trước cả lớp qua màn chiếu.
Toàn bộ nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

0. ĐÂY LÀ CÔNG CỤ GIẢNG BÀI, KHÔNG PHẢI GAME
- Người cầm lái là GIÁO VIÊN. Học sinh ngồi dưới xem màn chiếu, và được mời lên bảng theo lượt.
- ${LESSON.noGame}
- ${LESSON.teacher}

1. MỤC TIÊU VÀ ĐỒ DÙNG
- Mục tiêu của tiết dạy: ${L.muc_tieu}.
- Phạm vi kiến thức: chỉ dùng nội dung Toán lớp ${L.lop} đã học. Cấm ra đề vượt chương trình.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): ${notes.join('; ')}.
- Đồ dùng thật cô giáo nên có trên bục để đối chiếu với bảng phấn ảo: ${L.vat}.
- Dòng ghi nhớ viết bằng phấn ở cuối tiết, đúng một câu: "${L.chot}"

2. MẠCH BÀI GỒM NĂM BƯỚC
- ${LESSON.flow}
- BƯỚC 1 · KHỞI ĐỘNG — giáo viên đọc to cho cả lớp, bảng chưa viết gì: "${L.khoi_dong}" Bảng chỉ hiện một vật thật duy nhất liên quan tới câu hỏi đó và một nút "Bắt đầu viết bảng".
- BƯỚC 2 · VẬT THẬT — vật vẽ phấn trên bảng là ${L.vat}. Một đơn vị đếm được là ${L.don_vi}. Điều khiển bằng ngón tay: ${L.ngon_tay}.
- BƯỚC 3 · SƠ ĐỒ — học sinh hoặc giáo viên tự tay dựng: ${L.so_do}. Sơ đồ này KHÔNG được hiện sẵn hoàn chỉnh; nó phải được kéo hoặc vẽ ra từng phần.
- BƯỚC 4 · PHÉP TÍNH — đọc đáp án ra từ vật và từ sơ đồ: ${L.doc}. Cách giải thích trực quan khi học sinh vướng: ${L.giai_thich}.
- BƯỚC 5 · LUYỆN TẬP CHUNG — cả lớp làm bài cùng dạng, giáo viên dùng nút "Cả lớp trả lời" để biểu quyết bằng số ngón tay theo NHÃN đáp án (1 ngón A, 2 ngón B, 3 ngón C, 4 ngón D), không theo giá trị đáp án.
- Ba chặng CRA và ba MỨC HỖ TRỢ là hai trục khác nhau của cùng một tiết: VẬT THẬT và SƠ ĐỒ đi ở mức "cô làm mẫu" rồi "cả lớp làm cùng cô", PHÉP TÍNH là lúc lớp đã theo kịp, còn LUYỆN TẬP CHUNG là mức "em tự làm". Không được để học sinh rơi thẳng từ chỗ cô cầm tay sang chỗ tự làm: ${LESSON.release}
- Giáo viên bấm "Bước tiếp" để sang bước; mỗi bước dừng lại bao lâu là do giáo viên quyết định.
- ${LESSON.pace}

3. DỮ LIỆU CỦA BÀI (LESSON_DATA) VÀ TỰ KIỂM CHỨNG
- Khai báo \`const LESSON_DATA = [...]\` ở ĐẦU khối <script>, phần engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, prompt, choices, answer, explanation, errorTag, loiViet, ho_tro }.
- Trường \`ho_tro\` nhận đúng một trong ba chuỗi: ${HO_TRO.map((h) => '"' + h + '"').join(', ')}. Trong 6 mục bắt buộc, chia ĐÚNG 2 mục "cô làm mẫu" + 2 mục "cả lớp làm cùng cô" + 2 mục "em tự làm"; bộ đếm này kiểm bằng code ngay trong verifyQuestionBank() và mục nào làm sai phân bố thì xử lý như mục lỗi.
- Tối thiểu 6 mục: 2 mục mẫu cho sẵn bên dưới phải xuất hiện NGUYÊN VĂN (kèm nguyên hai giá trị \`ho_tro\` của chúng), cộng thêm 4 mục nữa cùng cụm kiến thức và cùng phạm vi Toán lớp ${L.lop}. Ba mức hỗ trợ KHÁC NHAU ở lượng giàn giáo trên bảng chứ không phải ở độ khó đề bài — vẫn giữ nguyên một mức độ khó hợp lệ của lớp ${L.lop}, chỉ khác nhau chỗ bảng có làm mẫu hộ, có hỏi từng bước, hay để em tự làm. Mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- errorTag là mã máy của lỗi, lấy đúng một trong các nhãn: ${nhanLoi.join(', ')}. Danh sách này gồm ba nhãn của chủ đề VÀ mọi nhãn hai mục mẫu đang dùng — mục mới tự viết mà dùng nhãn ngoài danh sách thì chính nó bị verifyQuestionBank() loại. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mô tả trong danh sách lỗi ở mục 1 hoặc mô tả in ngay dưới mục mẫu, và là thứ hiển thị cho giáo viên.
- Trong công cụ giảng bài thì LESSON_DATA đóng đúng vai trò mà QUESTION_DATA đóng trong game, nên BỐN quy định kiểm chứng dưới đây áp nguyên văn cho LESSON_DATA; hàm verifyQuestionBank() chạy MỘT LẦN trước BƯỚC 5 (Luyện tập chung), không chạy trước bước nào khác vì bốn bước đầu là giảng, không phải làm bài. LESSON_DATA của giáo án KHÔNG có trường level (một bài giảng chỉ có một mạch độ khó), vì vậy mọi điều khoản về level trong các quy định dưới đây được bỏ qua một cách tường minh, còn mọi điều khoản khác giữ nguyên. Mục nào trượt thì loại khỏi danh sách hỏi và ghi console.warn bằng tiếng Việt; số mục còn lại dưới 4 thì dải điều khiển của giáo viên báo "ngân hàng câu hỏi của bài này còn N mục, giáo viên tự ra thêm" chứ không hỏi lại mục lỗi.
- ${VERIFY.selfCheck}
- ${VERIFY.distractorValid}
- ${VERIFY.rangeGuard}
- ${VERIFY.noGuessable}
- Hai mục mẫu phải chép nguyên văn:
${jsonBlock(EXAMPLES[L.cluster], L.cluster, notes)}

4. BẢNG PHẤN VÀ VẬT THẬT — ${SO_QUY_DINH[SO_TU_CHUNG + them(L.cluster)]} QUY ĐỊNH BẮT BUỘC
- ${LESSON.boardText}
${chalkBlock(L.cluster)}

5. CẢ LỚP THAM GIA
- ${LESSON.classVote}
- ${LESSON.voteMap}
- ${LESSON.handover}
- ${LESSON.strayHands}
- ${LESSON.diagnose}
- ${LESSON.retain}

6. NỀN AR, CAMERA VÀ NHẬN DIỆN TAY
${AR_LESSON}
- MediaPipe Tasks Vision, pin phiên bản: import từ ${TASKS_VISION.bundle}
  wasm: ${TASKS_VISION.wasm}
  model: ${TASKS_VISION.hand} (HandLandmarker) và ${TASKS_VISION.pose} (PoseLandmarker, chỉ dùng để đặt mép trên của bảng theo landmark vai)
- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }). Ưu tiên khung 16:9 vì đầu ra là màn chiếu; nếu camera cho tỉ lệ khác thì crop về vùng vẽ cố định, không để giãn hình làm sai tọa độ. Lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi giáo viên bấm "Bật camera" hoặc "Mời em lên bảng". Trạng thái bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- ${CLASSROOM.framing}
- ${CLASSROOM.safeZone}
- ${LESSON.recog}
- Vùng an toàn ở chế độ giảng bài: dải trên cùng đặt thanh tiến trình năm bước, hai cột biên đặt dải điều khiển cùng khay vật thật, panel soi tay nằm ở một cột biên; vì không có điểm, tim hay nhân vật mừng thắng nên toàn bộ chỗ đó dành cho nút bấm và nhãn bước.
- Calibration động: ${RULES.calibration} Calibration ở công cụ này là giáo viên đứng đúng chỗ sẽ đứng khi giảng, không phải học sinh, và phải lấy thêm bốn góc tầm tay để chốt phép biến đổi boardFrom(cam) của quy định ÁNH XẠ TAY → MẶT BẢNG ở trên; bấm "Chỉnh lại tư thế" thì tính lại cả đơn vị người lẫn bốn góc đó, không mất nét phấn nào đang có trên bảng.
- ${ACCESS.handedness}
- Camera chỉ bật được trong môi trường an toàn (HTTPS, localhost hoặc mở file trực tiếp). Nếu trình duyệt chặn, báo một dòng tiếng Việt "Muốn dùng camera thì mở file qua HTTPS hoặc bấm nút Bật camera lại" rồi dạy tiếp bằng chuột và bàn phím, không để giáo viên kẹt ở màn lỗi tiếng Anh.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi chạy tiếp ở chế độ không camera, tiết dạy vẫn đủ 100% nội dung.

7. CHẾ ĐỘ KHÔNG CAMERA (bắt buộc, đây là chế độ dạy chính ở nhiều lớp)
- Chuột và bàn phím thay được MỌI thao tác tay: giữ chuột trái hoặc rê ngón tay trên màn hình cảm ứng là viết phấn, phím E là giẻ lau, phím cách là sang bước, mũi tên trái là lùi bước, R là phát lại bước, S là lưu bảng, P là in bảng.
- Kéo thả vật thật và thẻ đáp án bằng chuột; chấm ngón tay thay bằng một cú chạm.
- Có nhãn "Chế độ không dùng camera" ở góc màn chiếu và nút Bật camera riêng, không cần tải lại trang.

8. TIẾP CẬN, AN TOÀN VÀ HIỆU NĂNG
- ${ACCESS.contrast}
- ${ACCESS.notColorOnly}
- ${ACCESS.caption}
- ${ACCESS.flash}
- ${ACCESS.reducedMotion}
- Ở công cụ giảng bài không có hit-stop và không có nhân vật mừng thắng, nên chế độ Giảm hiệu ứng chỉ còn việc tắt particle và bỏ mọi chuyển động trang trí; chữ viết phấn, vật thật, sơ đồ, bộ xương bàn tay, trạng thái nhận diện và dòng độ trễ vẫn hiện đầy đủ vì bốn thứ cuối là thông tin vận hành chứ không phải hiệu ứng.
- ${RULES.autoPause} Ở công cụ giảng bài, tự Pause KHÔNG được làm mất nội dung đang có trên bảng: quay lại thì bảng còn nguyên như lúc rời đi.
- ${RULES.perf} Riêng khi đang viết phấn trên bảng thì ưu tiên nhận diện bàn tay mỗi khung hình và giảm particle, vì độ trễ nét viết quan trọng hơn hiệu ứng.
- ${RULES.audio}
- ${RULES.safety} Ở tiết giảng bài, nhắc thêm một dòng: "em lên bảng đứng chếch sang một bên, không đứng chắn màn chiếu".
- KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân của học sinh, kể cả tên trong hàng đợi lên bảng (tên chỉ nằm trong bộ nhớ của phiên đó).
- Toàn bộ giao diện, tên nút, hướng dẫn, thông báo lỗi và lời giải bằng TIẾNG VIỆT, dùng đúng thuật ngữ Toán của SGK lớp ${L.lop}. Không để thuật ngữ kỹ thuật (confidence, cooldown, landmark, localStorage) hiện trên giao diện.

9. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.
- Xuất hiện ở màn Mở bài, trên dải điều khiển khi giảng và ở trang bảng cuối tiết; nhỏ, không che bảng phấn và không che nút bấm.
- Chân trang có dòng: MiTi • Giảng bài bằng vật thật.
- Không xóa hoặc đổi tên thương hiệu khi in bảng, khi lưu bảng hay ở chế độ không camera.

10. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.
- Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".
- Tự kiểm tra trước khi xuất: ${LESSON_SHORT} · ${CHALK_SHORT} · ${VERIFY_SHORT} · ${ACCESS_SHORT} · có đủ năm bước và không bước nào tự chuyển khi giáo viên chưa bấm · LESSON_DATA đủ 6 mục với 2 mục mẫu nguyên văn, mỗi mục có \`ho_tro\` và phân bố đúng 2-2-2, đã chạy qua verifyQuestionBank() trước bước 5 · mọi thẻ đáp án mang nhãn in hoa A-D và bảng đối chiếu ngón tay hiện đủ · panel soi tay có bộ xương 21 khớp cho riêng tay đã gán, có trạng thái bốn mức và độ trễ ms đo thật · một điểm bàn tay chỉ có một điểm trên mặt bảng, ngoài tầm thì nét dừng ở mép · bài có khối thì đủ cạnh khuất + xoay + mở hộp, bài có góc hoặc hai đường thì đủ bộ dụng cụ thân người · cỡ chữ đang phát đạt theo dòng tự kiểm ĐẠT / CHƯA ĐẠT · bảng không tự lau ở bất kì bước nào · in được bản nền trắng chữ đen · chữ ký MiTi ở ba chỗ · file chạy độc lập không lỗi console.
\`\`\`

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cụm kiến thức: \`${L.cluster}\` · Lớp ${L.lop} · Vật thật và sơ đồ lấy từ \`tools/data/props.mjs\`.
- Muốn đổi nội dung bài giảng: sửa \`tools/data/lessons.mjs\` (tên bài, câu khởi động, dòng ghi nhớ) rồi chạy \`node tools/build-lessons.mjs\`, không sửa tay file này.
- Muốn đổi quy định: sửa \`tools/lib/chalk.mjs\` (bảng phấn) hoặc \`tools/lib/lesson.mjs\` (chế độ giảng bài).
- ${L.games.length ? `Game cùng cụm để học sinh luyện sau tiết: ${L.games.map((g) => g.id).join(', ')}.` : 'Bài này chưa có game cùng cụm trong catalog. Muốn nối game vào thì viết prompt game trước, thêm dòng vào GAME_CATALOG.csv, rồi bỏ khai báo tương ứng trong \`CHU_DE_CHI_CO_GIAO_AN\` của \`tools/data/lessons.mjs\` và build lại.'}
`;
}

function renderIndex(lessons) {
  const byLop = { 4: lessons.filter((l) => l.lop === '4'), 5: lessons.filter((l) => l.lop === '5') };
  const row = (l) =>
    `| \`${l.id}\` | [${l.ten}](${l.id}-${l.slug}.md) | \`${l.cluster}\` | ${l.games.length ? l.games.map((g) => g.id).join(', ') : '*(chưa có game cùng cụm)*'} |`;

  return `# Bộ giáo án bảng phấn — công cụ giảng bài cho giáo viên

> ${lessons.length} giáo án Toán lớp 4–5, mỗi bài một file prompt độc lập dán vào **Google Gemini (bật chế độ Canvas)**.
> Sinh tự động bằng \`node tools/build-lessons.mjs\` — **không sửa tay** các file trong thư mục này.

## Đây là gì, và khác gì với 85 prompt game

| | Bộ giáo án này | 85 prompt game |
| --- | --- | --- |
| Ai dùng | **Giáo viên** trình bày, cả lớp xem màn chiếu | **Học sinh** tự chơi, một máy một em hoặc hai em |
| Nhịp | Chờ giáo viên bấm "Bước tiếp", không tự chuyển | 12 lượt, tăng độ khó ở lượt 5 và lượt 9 |
| Động cơ | Không tim, không điểm, không combo, không xếp hạng | Có tim, điểm, chuỗi combo, thẻ vàng x2, mascot |
| Bảng phấn | Chiếm >= 70% màn chiếu, chữ phấn >= 50 px tính theo khoảng cách em cuối lớp, không bao giờ tự lau | Bảng chữ L <= 40% khung hình, chữ 34 px, tự lau sau mỗi lượt |
| Kiểm đề | \`verifyQuestionBank()\` chạy một lần trước Bước 5 | \`verifyQuestionBank()\` chạy trước vòng chơi đầu tiên |
| Camera | Panel soi tay >= 24% ở cột biên, bảng >= 70%; có bộ xương 21 khớp + trạng thái + độ trễ ms cho cả lớp nhìn; có phép biến đổi tay→mặt bảng | Video phủ kín khung hình vì khung hình CHÍNH LÀ màn chơi; vật thể bay, spawn, va chạm, speed lines |
| Nguồn quy định | \`tools/lib/chalk.mjs\` + \`tools/lib/lesson.mjs\` + \`tools/lib/verify.mjs\` + \`AR_LESSON\` trong \`tools/lib/ar.mjs\` | \`tools/lib/feel.mjs\` + \`tools/lib/classroom.mjs\` + \`AR_RENDER\` trong \`tools/lib/ar.mjs\` |

Hai bộ dùng chung một nguồn vật thật (\`tools/data/props.mjs\`) nên cùng một cụm kiến thức thì vật vẽ phấn
giống hệt nhau — học sinh gặp lại đúng cái pizza đó khi chuyển từ tiết giảng sang giờ luyện tập. Ngoại lệ
là ${CHU_DE_CHI_CO_GIAO_AN.length} chủ đề mới chỉ có giáo án (\`${CHU_DE_CHI_CO_GIAO_AN.map((t) => t.cluster).join('`, `')}\`), một phía chưa có gì để gặp lại.

## Quy định hình học chỉ in vào bài có hình học

Mục 4 của giáo án có 11 quy định luôn đúng với mọi bài, cộng tối đa hai quy định nối theo cụm:

| Quy định | In vào bài | Vì sao không in đại trà |
| --- | --- | --- |
| \`CHALK.solid3d\` — cạnh khuất nét đứt, kéo ngang xoay khối, nút mở hộp trải lưới khai triển, xếp lớp đếm từng tầng | \`${SOLID_CLUSTERS.join('\` · \`')}\` | bài phân số hay chia số không có khối nào để xoay |
| \`CHALK.bodyTool\` — vai 11/12 làm đỉnh góc, hai khuỷu 13/14 làm hai tia, ê-ke và thước phủ lên ảnh để chốt lại | \`${BODY_CLUSTERS.join('\` · \`')}\` | bắt học sinh đứng tạo góc vuông trong bài đo đại lượng là phản tác dụng |

\`node tools/validate.mjs\` kiểm cả hai chiều: bài thuộc danh sách mà thiếu thì báo "thiếu quy định",
bài không thuộc danh sách mà vẫn mang theo thì báo "lọt vào bài không có hình học", và tiêu đề mục 4
phải ghi đúng số quy định của chính bài đó.

## Cách dùng

1. Mở file giáo án cần dạy, copy nguyên khối \`\`\`text\`\`\`.
2. Dán vào Google Gemini đã bật chế độ Canvas, gửi.
3. Gemini sinh ra MỘT file HTML độc lập. Mở file đó bằng trình duyệt, cắm máy chiếu.
4. Không có camera vẫn dạy được trọn vẹn: chuột và bàn phím thay mọi thao tác tay.

## Mỗi giáo án gồm năm bước

Cấu trúc này giống nhau ở cả ${lessons.length} bài để giáo viên thuộc được mạch:
**Khởi động** (2–3 phút, hỏi gắn với vật thật, chưa viết gì) → **Vật thật** (4–5 phút, thao tác tay)
→ **Sơ đồ** (3–4 phút, học sinh tự dựng biểu diễn bán cụ thể) → **Phép tính** (3–4 phút, mỗi con số
nối ngược về sơ đồ) → **Luyện tập chung** (3–4 phút, cả lớp biểu quyết theo nhãn A–D).
Năm bước chiếm 15–20 phút đầu của **tiết 35 phút**; thời gian còn lại là luyện tập và chốt bài,
và thanh tiến trình trên màn chiếu luôn hiện cả "phút của bước" lẫn "phút còn lại của tiết".

Cuối tiết, bảng rút ra **bảng chẩn đoán cho riêng giáo viên**: số em mắc từng lỗi (theo \`errorTag\`)
và mỗi lỗi có một nút nhảy về đúng chặng CRA đã sinh ra lỗi đó. Không nêu tên, không xếp hạng,
không ghi sang hồ sơ đọc lại được sau tiết.

## Ba mức hỗ trợ của một tiết (trục thứ hai, đi cùng năm bước)

Năm bước là trục **kiến thức** (CRA). Trục còn lại là **lượng giàn giáo**, theo khung Gradual Release
of Responsibility — modelling → guided practice → independent practice
([NSW Education](https://education.nsw.gov.au/teaching-and-learning/curriculum/explicit-teaching/explicit-teaching-strategies/gradual-release-of-responsibility), kiểm chứng 2026-09-30):

| \`ho_tro\` | Bảng làm gì | Ai chạm vào bảng |
| --- | --- | --- |
| \`${HO_TRO[0]}\` | bảng tự thao tác chậm, mỗi động tác kèm một dòng **nói to suy nghĩ** của cô; sơ đồ hiện sẵn một phần | chỉ giáo viên |
| \`${HO_TRO[1]}\` | bảng **dừng ở từng bước** hỏi "tiếp theo làm gì?" rồi mới thi hành; sơ đồ hiện khung mờ đúng số phần còn thiếu | cả lớp biểu quyết, một em lên bảng |
| \`${HO_TRO[2]}\` | không sơ đồ dẫn, không gợi ý giữa bước; lời giải chỉ hiện **sau khi** lớp đã trả lời | em lên bảng |

6 mục bắt buộc chia **đúng 2-2-2**, và cổng ready đếm được: chỉ rời một mức khi >= 2/3 số em camera
thấy trả lời đúng, dưới 1/2 thì phải **thêm một mục ở chính mức đó**, quá 20 giây không ai trả lời thì
bấm "Làm mẫu lại" để **tăng** hỗ trợ trở lại. Lý do có mục này: bản trước đó của chính prompt này bắt
6 mục "cùng độ khó" (39/39 file) và không file nào nói tới làm mẫu (0/39) — tức là thả lớp rơi thẳng
từ chỗ cô cầm tay sang chỗ tự làm, đúng cái lỗi mà khung GRR cảnh báo.

## Hai kênh từ vựng game lọt vào giáo án, và cách chặn

\`clusters.mjs\`, \`props.mjs\`, \`error-notes.mjs\` là ba nguồn **dùng chung** với 85 prompt game, nên một
cụm sinh ra cho game sẽ mang theo tiếng của game. Vòng 5 đo được hai kênh và sửa cả hai ở tầng dữ liệu:

- **Lời mô tả** — 2/38 cụm Toán nói bằng ngôn ngữ trò chơi: \`boss-cong-thu\` ("trận boss", "thẻ gợi ý",
  "gợi ý miễn phí") và \`on-tap-toan-4\` ("mỗi cửa ải viết một dòng phấn"). Cách sửa là khối \`giao_an\`
  trong \`tools/data/lessons.mjs\`: ghi đè bẩy trường lời (\`muc_tieu\`, \`giai_thich\`, \`vat\`, \`don_vi\`,
  \`ngon_tay\`, \`so_do\`, \`doc\`) và mảng \`loi_viet\`, chỉ đổi cách nói chứ không đổi kiến thức. Builder và
  validator cùng đi qua \`notesCuaGiaoAn()\` nên không thể lệch nhau. \`LESSON_BAN_WORDS\` quét từng file
  \`GA*.md\` và báo đúng tên cụm cần thêm override.
- **Nhãn lỗi** — 23/114 câu mẫu (thuộc 14/38 cụm Toán) mang \`errorTag\` **ngoài** ba nhãn của cụm, nên
  khuôn cũ \`notes[tags.indexOf(tag)] ?? notes[0]\` dán cho chúng nhãn đầu tiên của cụm: câu "diện tích
  hình thoi, quên chia 2" bị dán thành "nóng vội khi độ khó tăng". Tệ hơn, prompt lại khai errorTag phải
  "thuộc đúng danh sách đã khai báo", tức là \`verifyQuestionBank()\` loại ngay hai mục bắt buộc lúc nạp.
  Cách sửa: bảng tra \`tools/data/error-tags.mjs\` cho 21 nhãn dùng chung, và \`danhSachNhanLoi()\` khai báo
  đủ cả nhãn của cụm lẫn nhãn mà hai mục mẫu thật sự dùng.

## Giáo án không khớp 1-1 với game nữa

\`prompts/giao-an/\` sinh ra từ catalog game: mỗi cặp (cụm Toán, lớp) có game là có một giáo án. Điều đó đúng
cho ${lessons.length - CHU_DE_CHI_CO_GIAO_AN.length} bài, nhưng chưa đúng với phần còn lại của sách giáo khoa: một chủ đề cô
phải dạy trên lớp thì phải có bài giảng, kể cả khi thư viện chưa viết game nào cho nó. Hai cơ chế trong
\`tools/data/lessons.mjs\` mở đường đó, và validator chỉ cho đi đúng hai đường này:

- **\`CHU_DE_CHI_CO_GIAO_AN\`** — khai báo tường minh cặp (cụm, lớp) chỉ có giáo án. ${CHU_DE_CHI_CO_GIAO_AN.length} bài đang dùng: ${CHU_DE_CHI_CO_GIAO_AN.map((t) => `\`${t.cluster}\` lớp ${t.lop}`).join(', ')}.
  Cụm vẫn phải đủ bộ như mọi cụm (\`clusters.mjs\` + \`props.mjs\` 5 trường + \`examples.mjs\` ≥ 2 câu +
  \`error-notes.mjs\` đúng 3 mô tả + ba trường viết tay), chỉ mảng game là trống. Đầu file giáo án thay dòng
  "Bản game của cùng cụm" bằng một câu nói thẳng là chưa có, để cô không đi tìm file không tồn tại và mô
  hình không tự bịa thêm màn chơi. Giáo án có game mà không khai báo ở đây bị chặn; khai báo mà catalog
  thật ra đã có game cặp đó cũng bị chặn.
- **\`giao_an.theo_lop\`** — cùng một cụm dạy ở hai lớp thì lời giảng phải khác nhau. \`cong-tru\` là một:
  mục tiêu trong catalog cho cả hai lớp chỉ ghi một dòng, nên lớp 4 giữ "cộng trừ có nhớ và có mượn, nhìn
  bằng bó que", còn lớp 5 (game T5-01 tính theo thứ tự ưu tiên) đọc "giá trị biểu thức: tính trước, tính sau".
  Lớp phủ này chỉ đổi cách nói theo đúng vế kiến thức đã có trong \`noi_dung\` của cụm, không thêm phạm vi mới.

## Toán lớp 4 (${byLop[4].length} giáo án)

| Mã | Bài giảng | Cụm kiến thức | Game cùng cụm |
| --- | --- | --- | --- |
${byLop[4].map(row).join('\n')}

## Toán lớp 5 (${byLop[5].length} giáo án)

| Mã | Bài giảng | Cụm kiến thức | Game cùng cụm |
| --- | --- | --- | --- |
${byLop[5].map(row).join('\n')}

## Muốn thêm hoặc sửa giáo án

- Thêm cụm kiến thức mới: sửa \`tools/data/clusters.mjs\`, \`tools/data/props.mjs\` (đủ 5 trường), \`tools/data/examples.mjs\` (ít nhất 2 câu), \`tools/data/error-notes.mjs\` (đúng 3 mô tả, ứng nghiệm 3 nhãn \`tags\`) và \`tools/data/lessons.mjs\` (đủ 3 trường), rồi chạy \`node tools/build.mjs\`. Nếu chủ đề chưa có game nào, khai thêm \`{ cluster, lop }\` vào \`CHU_DE_CHI_CO_GIAO_AN\` trong \`tools/data/lessons.mjs\` — thiếu khai báo thì validator báo giáo án "lọt vào không qua quy trình".
- Cùng một cụm dạy hai lớp mà lời giảng cần khác nhau: thêm \`giao_an.theo_lop\` trong \`tools/data/lessons.mjs\` với khóa \`'4'\` hoặc \`'5'\`; lớp phủ chỉ được phép chứa ba trường viết tay và bảy trường lời, validator so nguồn từng trường nên không thể im lặng bỏ qua.
- Đổi quy định bảng phấn: \`tools/lib/chalk.mjs\` (10 quy định chung + 2 quy định hình học nối theo cụm, danh sách ở \`SOLID_CLUSTERS\` / \`BODY_CLUSTERS\`).
- Đổi quy định chế độ giảng bài: \`tools/lib/lesson.mjs\` (13 quy định).
- Đổi quy định tự kiểm đề: \`tools/lib/verify.mjs\` (dùng chung với 85 prompt game).
- Đổi bố cục AR của tiết học: \`AR_LESSON\` trong \`tools/lib/ar.mjs\`. \`AR_RENDER\` trong cùng file là khối của game — hai khối chiếu tọa độ theo hai hình chữ nhật khác nhau nên không đổi chỗ cho nhau được.
- Một \`GA*.md\` báo từ vựng game: **đừng** sửa \`clusters.mjs\` hay \`props.mjs\` — 85 prompt game đang đọc hai file đó — mà thêm khối \`giao_an\` cho cụm bị báo vào \`tools/data/lessons.mjs\`.
- Câu mẫu mới trong \`examples.mjs\` dùng \`errorTag\` ngoài ba nhãn của cụm: thêm mô tả tiếng Việt vào \`tools/data/error-tags.mjs\`, nếu không builder sẽ dừng và gọi tên đúng nhãn thiếu.
- \`node tools/validate.mjs\` sẽ chặn nếu thiếu quy định nào, nếu vật thật thiếu trường, nếu quy định hình học lọt vào bài không có hình học, hoặc nếu cơ chế game lọt vào giáo án.
`;
}

const rows = readCatalog(path.join(ROOT, 'catalogs', 'GAME_CATALOG.csv'));
const lessons = buildLessons(rows, { cluster, prop, EXAMPLES, GAMES });

fs.mkdirSync(OUT_DIR, { recursive: true });
// Dọn file giáo án cũ không còn khớp danh sách, tránh để sót bài đã bị đổi tên.
const wanted = new Set([...lessons.map((l) => `${l.id}-${l.slug}.md`), 'README.md']);
for (const f of fs.readdirSync(OUT_DIR)) if (!wanted.has(f)) fs.rmSync(path.join(OUT_DIR, f));

for (const L of lessons) {
  const file = path.join(OUT_DIR, `${L.id}-${L.slug}.md`);
  fs.writeFileSync(file, render(L), 'utf8');
}
fs.writeFileSync(path.join(OUT_DIR, 'README.md'), renderIndex(lessons), 'utf8');

const dup = lessons.filter((l, i) => lessons.findIndex((x) => x.id === l.id) !== i);
if (dup.length) throw new Error('Trùng mã giáo án: ' + dup.map((l) => l.id).join(', '));
console.log(`Đã sinh ${lessons.length} giáo án (lớp 4: ${lessons.filter((l) => l.lop === '4').length}, lớp 5: ${lessons.filter((l) => l.lop === '5').length}) + 1 trang mục lục vào prompts/giao-an/. ${PROP_KEYS.length} cụm vật thật.`);
