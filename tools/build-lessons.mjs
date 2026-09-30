import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { cluster } from './data/clusters.mjs';
import { EXAMPLES } from './data/examples.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { PROP_KEYS, prop } from './data/props.mjs';
import { buildLessons } from './data/lessons.mjs';
import { readCatalog } from './lib/csv.mjs';
import { AR_RENDER, TASKS_VISION } from './lib/ar.mjs';
import { RULES } from './lib/rules.mjs';
import { CLASSROOM } from './lib/classroom.mjs';
import { ACCESS, ACCESS_SHORT } from './lib/access.mjs';
import { CHALK, CHALK_SHORT } from './lib/chalk.mjs';
import { LESSON, LESSON_SHORT } from './lib/lesson.mjs';
import { HANDOUT, HANDOUT_SHORT } from './lib/handout.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'prompts', 'giao-an');

// In câu mẫu theo đúng khuôn LESSON_DATA để mô hình có khuôn mà bám.
const jsonBlock = (rows, tags, notes) =>
  rows
    .map((r, i) => {
      const o = {
        id: 'q' + (i + 1),
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

// Danh sách game cùng cụm: giáo viên muốn cho học sinh luyện tập sau tiết thì dùng bản này.
const gameLinks = (games, lop) =>
  games
    .map((g) => {
      const dir = lop === '4' ? '01-toan4' : '02-toan5';
      const hit = fs.readdirSync(path.join(ROOT, 'prompts', dir)).find((f) => f.toLowerCase().startsWith(g.id.toLowerCase()));
      return hit ? `\`${g.id} — ${g.name}\` (prompts/${dir}/${hit})` : `\`${g.id} — ${g.name}\``;
    })
    .join(' · ');

function render(L) {
  const cl = cluster(L.cluster);
  const notes = ERROR_NOTES[L.cluster].split('; ');

  return `# ${L.id} — ${L.ten}

> GIÁO ÁN GIẢNG BÀI · Toán lớp ${L.lop} · Cụm kiến thức: \`${L.cluster}\`
> Prompt độc lập: copy nguyên khối \`text\` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.
> ⚠️ Đây là **CÔNG CỤ GIẢNG BÀI cho giáo viên trình bày trước cả lớp**, KHÔNG phải game cho học sinh chơi.
> Bản game của cùng cụm kiến thức này: ${gameLinks(L.games, L.lop)}

\`\`\`text
Tạo CÔNG CỤ GIẢNG BÀI web "${L.ten.toUpperCase()}" cho giáo viên dạy môn Toán lớp ${L.lop} ở Việt Nam, trình bày trước cả lớp qua màn chiếu.
Toàn bộ nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

0. ĐÂY LÀ CÔNG CỤ GIẢNG BÀI, KHÔNG PHẢI GAME
- Người cầm lái là GIÁO VIÊN. Học sinh ngồi dưới xem màn chiếu, và được mời lên bảng theo lượt.
- ${LESSON.noGame}
- ${LESSON.teacher}
- ${LESSON.backRow}

1. MỤC TIÊU VÀ ĐỒ DÙNG
- Mục tiêu của tiết dạy: ${L.muc_tieu}.
- Phạm vi kiến thức: chỉ dùng nội dung Toán lớp ${L.lop} đã học. Cấm ra đề vượt chương trình.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): ${ERROR_NOTES[L.cluster]}.
- Đồ dùng thật cô giáo nên có trên bục để đối chiếu với bảng phấn ảo: ${L.vat}.
- ${LESSON.paperProps}
- Dòng ghi nhớ viết bằng phấn ở cuối tiết, đúng một câu: "${L.chot}"
- Sĩ số là dữ liệu đầu vào của tiết học, nhập một lần cho mỗi lớp cùng lượt với tên lớp: mọi con số về lớp đều chia cho M này — "đã lên 9/32", "camera thấy 8/32 em", "9/32 em còn vướng ở SƠ ĐỒ", độ phủ camera. Không có M thì ba con số kia phải ẩn đi, không được hiển thị một cột hoặc một phần trăm vô nghĩa.

2. MẠCH BÀI GỒM NĂM BƯỚC
- ${LESSON.flow}
- ${LESSON.fullPeriod}
- ${LESSON.predict}
- BƯỚC 1 · KHỞI ĐỘNG — giáo viên đọc to cho cả lớp, bảng chưa viết gì: "${L.khoi_dong}" Bảng chỉ hiện một vật thật duy nhất liên quan tới câu hỏi đó và một nút "Bắt đầu viết bảng".
- BƯỚC 2 · VẬT THẬT — vật vẽ phấn trên bảng là ${L.vat}. Một đơn vị đếm được là ${L.don_vi}. Điều khiển bằng ngón tay: ${L.ngon_tay}.
- BƯỚC 3 · SƠ ĐỒ — học sinh hoặc giáo viên tự tay dựng: ${L.so_do}. Sơ đồ này KHÔNG được hiện sẵn hoàn chỉnh; nó phải được kéo hoặc vẽ ra từng phần.
- BƯỚC 4 · PHÉP TÍNH — đọc đáp án ra từ vật và từ sơ đồ: ${L.doc}. Cách giải thích trực quan khi học sinh vướng: ${L.giai_thich}.
- BƯỚC 5 · LUYỆN TẬP CHUNG — cả lớp làm bài cùng dạng, giáo viên dùng nút "Cả lớp trả lời" để biểu quyết bằng ngón tay.
- Giáo viên bấm "Bước tiếp" để sang bước; mỗi bước dừng lại bao lâu là do giáo viên quyết định.
- ${LESSON.pace}
- ${LESSON.timeSlack}

3. DỮ LIỆU CỦA BÀI (LESSON_DATA)
- ${LESSON.fadedExample}
- Khai báo \`const LESSON_DATA = [...]\` ở ĐẦU khối <script>, phần engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, prompt, choices, answer, explanation, errorTag, loiViet }.
- Tối thiểu 6 mục: 2 mục mẫu cho sẵn bên dưới phải xuất hiện NGUYÊN VĂN, cộng thêm 4 mục nữa cùng cụm kiến thức và cùng độ khó của Toán lớp ${L.lop}. Mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- errorTag là mã máy của lỗi, lấy đúng một trong ${cl.tags.length} nhãn: ${cl.tags.join(', ')}. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 1 và là thứ hiển thị cho giáo viên.
- ${LESSON.verifyData}
- ${LESSON.numberFormat}
- Hai mục mẫu phải chép nguyên văn:
${jsonBlock(EXAMPLES[L.cluster], cl.tags, notes)}

4. BẢNG PHẤN VÀ VẬT THẬT — MƯỜI QUY ĐỊNH BẮT BUỘC
- CỠ BẢNG Ở CÔNG CỤ GIẢNG BÀI: mặc định dùng mức BẢNG TO, bảng phấn chiếm >= 70% màn chiếu; mức bảng chữ L <= 40% khung hình trong quy định bên dưới chỉ áp cho bản game học sinh tự chơi. Trần 70% chỉ nới xuống >= 55% ở "Chế độ không màn chiếu" (mục 8), không phải ở bản mặc định. Bảng phải nằm gọn trong vùng không bị thân người che và mép trên theo đúng trần đã quy định.
- ${CHALK.board}
- ${CHALK.chalkWrite}
- ${CHALK.concretize}
- ${CHALK.represent}
- ${CHALK.wordProblem}
- ${CHALK.fractionCut}
- ${CHALK.measure}
- ${CHALK.narrate}
- ${CHALK.handCare}
- ${CHALK.persist}

5. CẢ LỚP THAM GIA
- ${LESSON.classVote}
- ${LESSON.classBoard}
- ${LESSON.noSlate}
- ${LESSON.homeLanguage}
- ${LESSON.movementBreak}
- ${LESSON.roomFootprint}
- ${LESSON.tightRoomFocus}
- ${LESSON.detectionEquity}
- ${LESSON.pairShare}
- ${LESSON.groupWork}
- ${LESSON.handover}
- ${LESSON.boardEquity}
- ${LESSON.strayHands}
- ${LESSON.retain}
- ${LESSON.multiClass}
- ${LESSON.bigClass}

6. NỀN AR, CAMERA VÀ NHẬN DIỆN TAY
${AR_RENDER}
- MediaPipe Tasks Vision, pin phiên bản: import từ ${TASKS_VISION.bundle}
  wasm: ${TASKS_VISION.wasm}
  model: ${TASKS_VISION.hand} (HandLandmarker) và ${TASKS_VISION.pose} (PoseLandmarker, chỉ dùng để đặt mép trên của bảng theo landmark vai)
- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }). Ưu tiên khung 16:9 vì đầu ra là màn chiếu; nếu camera cho tỉ lệ khác thì crop về vùng vẽ cố định, không để giãn hình làm sai tọa độ. Lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi giáo viên bấm "Bật camera" hoặc "Mời em lên bảng". Trạng thái bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- ${LESSON.privacy}
- ${LESSON.cameraGeometry}
- ${CLASSROOM.framing}
- ${CLASSROOM.safeZone}
- Ở công cụ giảng bài thì dải trên cùng đặt thanh tiến trình năm bước và hai cột biên đặt dải điều khiển cùng khay vật thật; vì không có điểm, tim hay mascot nên toàn bộ chỗ đó dành cho nút bấm và nhãn bước.
- Calibration động: ${RULES.calibration} Calibration ở công cụ này là giáo viên đứng đúng chỗ sẽ đứng khi giảng, không phải học sinh.
- ${ACCESS.handedness}
- Camera chỉ bật được trong môi trường an toàn (HTTPS, localhost hoặc mở file trực tiếp). Nếu trình duyệt chặn, báo một dòng tiếng Việt "Muốn dùng camera thì mở file qua HTTPS hoặc bấm nút Bật camera lại" rồi dạy tiếp bằng chuột và bàn phím, không để giáo viên kẹt ở màn lỗi tiếng Anh.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi chạy tiếp ở chế độ không camera, tiết dạy vẫn đủ 100% nội dung.

7. DẠY KHI KHÔNG CÓ CAMERA, KHÔNG CÓ MẠNG, VÀ KHI MẤT ĐIỆN (bắt buộc, đây là chế độ dạy chính ở nhiều lớp)
- ${LESSON.noNetwork}
- ${LESSON.noAdmin}
- ${LESSON.powerCut}
- Chuột và bàn phím thay được MỌI thao tác tay: giữ chuột trái hoặc rê ngón tay trên màn hình cảm ứng là viết phấn, phím E là giẻ lau, phím cách là sang bước, mũi tên trái là lùi bước, R là phát lại bước, S là lưu bảng, P là in bảng.
- Kéo thả vật thật và thẻ đáp án bằng chuột; chấm ngón tay thay bằng một cú chạm.
- Có nhãn "Chế độ không dùng camera" ở góc màn chiếu và nút Bật camera riêng, không cần tải lại trang.

8. TIẾP CẬN, AN TOÀN VÀ HIỆU NĂNG
- ${LESSON.inclusion}
- ${LESSON.physicalAccess}
- ${LESSON.latePupil}
- ${LESSON.noProjector}
- ${ACCESS.contrast}
- ${ACCESS.notColorOnly}
- ${ACCESS.caption}
- ${ACCESS.flash}
- ${ACCESS.reducedMotion}
- Ở công cụ giảng bài không có hit-stop và không có mascot, nên chế độ Giảm hiệu ứng chỉ còn việc tắt particle, tắt speed lines và bỏ mọi chuyển động trang trí; chữ viết phấn, vật thật và sơ đồ vẫn hiện đầy đủ.
- ${RULES.autoPause} Ở công cụ giảng bài, tự Pause KHÔNG được làm mất nội dung đang có trên bảng: quay lại thì bảng còn nguyên như lúc rời đi.
- ${RULES.perf} Riêng khi đang viết phấn trên bảng thì ưu tiên nhận diện bàn tay mỗi khung hình và giảm particle, vì độ trễ nét viết quan trọng hơn hiệu ứng.
- ${LESSON.oldHardware}
- ${LESSON.browserCompat}
- ${RULES.audio}
- ${RULES.safety} Ở tiết giảng bài, nhắc thêm một dòng: "em lên bảng đứng chếch sang một bên, không đứng chắn màn chiếu".
- KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân của học sinh, kể cả tên trong hàng đợi lên bảng (tên chỉ nằm trong bộ nhớ của phiên đó).
- Toàn bộ giao diện, tên nút, hướng dẫn, thông báo lỗi và lời giải bằng TIẾNG VIỆT, dùng đúng thuật ngữ Toán của SGK lớp ${L.lop}. Không để thuật ngữ kỹ thuật (confidence, cooldown, landmark, localStorage) hiện trên giao diện.

9. TỪ BẢNG RA VỞ — PHIẾU BÀI TẬP, ĐÁP ÁN VÀ NỘI DUNG CHÉP
- ${HANDOUT.worksheet}
- ${HANDOUT.printRun}
- ${HANDOUT.answerKey}
- ${HANDOUT.notebook}
- ${LESSON.exitTicket}
- ${LESSON.fastFinishers}
- ${LESSON.repairWork}

10. TRƯỚC KHI LÊN LỚP VÀ SAU KHI DẠY XONG (ba việc chỉ có cô giáo làm được)
- ${LESSON.rehearsal}
- ${LESSON.lessonStudy}

11. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.
- Xuất hiện ở màn Mở bài, trên dải điều khiển khi giảng và ở trang bảng cuối tiết; nhỏ, không che bảng phấn và không che nút bấm.
- Chân trang có dòng: MiTi • Giảng bài bằng vật thật.
- Không xóa hoặc đổi tên thương hiệu khi in bảng, khi lưu bảng hay ở chế độ không camera.

12. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.
- Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".
- Tự kiểm tra trước khi xuất: ${LESSON_SHORT} · ${CHALK_SHORT} · ${HANDOUT_SHORT} · ${ACCESS_SHORT} · có đủ năm bước và không bước nào tự chuyển khi giáo viên chưa bấm · LESSON_DATA đủ 6 mục với 2 mục mẫu nguyên văn · bảng không tự lau ở bất kì bước nào · in được bản nền trắng chữ đen · phiếu bài tập in từ đúng LESSON_DATA và trang đáp án đi sau tách riêng · khung "Nội dung để chép" đúng ba dòng · có bộ đếm lượt "đã lên N/M" ở dải điều khiển và không khi nào lên màn chiếu · "Chạy thử 5 phút" và checklist 10 việc chạy được không cần camera · "Xuất cho đồng nghiệp" và "In phiếu dự giờ" không chứa tên học sinh · mọi tỉ lệ về lớp đều chia cho sĩ số đã nhập, chưa có sĩ số thì ẩn tỉ lệ · mất điện thì bản in + hình cắt giấy vẫn đi đủ năm bước · ba kịch bản "Còn 10 phút / Còn 5 phút / Còn 2 phút" chỉ lấy việc lớp đã làm, dư giờ không dạy sang kiến thức mới · lượt "Làm việc theo nhóm 4 em" có bốn vai trò gắn với vị trí ngồi, mỗi em viết đáp án riêng trước khi nhóm chốt, không xếp hạng nhóm · phiếu có khối "Ba bài chọn thêm" (củng cố · cùng đáp số khác cách · vận dụng thật) cho em xong sớm và không có dòng "cả lớp đợi bạn" · phần thập phân hiển thị bằng dấu phẩy và ô nhập chấp nhận "0,5" mà không đọc ra 0 · có "Có em vừa tới" và "Có em vắng buổi trước", không lưu tên hay lý do vắng · tiết sau có "Chữa bài" hai cột bằng phấn không tô đỏ, phiếu có dòng "Em chữa bài ở đây", không lưu và không hiện điểm · chữ ký MiTi ở ba chỗ · file chạy độc lập không lỗi console.
\`\`\`

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cụm kiến thức: \`${L.cluster}\` · Lớp ${L.lop} · Vật thật và sơ đồ lấy từ \`tools/data/props.mjs\`.
- Muốn đổi nội dung bài giảng: sửa \`tools/data/lessons.mjs\` (tên bài, câu khởi động, dòng ghi nhớ) rồi chạy \`node tools/build-lessons.mjs\`, không sửa tay file này.
- Muốn đổi quy định: sửa \`tools/lib/chalk.mjs\` (bảng phấn) hoặc \`tools/lib/lesson.mjs\` (chế độ giảng bài).
- Game cùng cụm để học sinh luyện sau tiết: ${L.games.map((g) => g.id).join(', ')}.
`;
}

function renderIndex(lessons) {
  const byLop = { 4: lessons.filter((l) => l.lop === '4'), 5: lessons.filter((l) => l.lop === '5') };
  const row = (l) =>
    `| \`${l.id}\` | [${l.ten}](${l.id}-${l.slug}.md) | \`${l.cluster}\` | ${l.games.map((g) => g.id).join(', ')} |`;

  return `# Bộ giáo án bảng phấn — công cụ giảng bài cho giáo viên

> ${lessons.length} giáo án Toán lớp 4–5, mỗi bài một file prompt độc lập dán vào **Google Gemini (bật chế độ Canvas)**.
> Sinh tự động bằng \`node tools/build-lessons.mjs\` — **không sửa tay** các file trong thư mục này.

## Đây là gì, và khác gì với 85 prompt game

| | Bộ giáo án này | 85 prompt game |
| --- | --- | --- |
| Ai dùng | **Giáo viên** trình bày, cả lớp xem màn chiếu | **Học sinh** tự chơi, một máy một em hoặc hai em |
| Nhịp | Chờ giáo viên bấm "Bước tiếp", không tự chuyển | 12 lượt, tăng độ khó ở lượt 5 và lượt 9 |
| Đầu ra | Bảng phấn trên màn chiếu **và** phiếu bài tập + trang đáp án in được | Chỉ là màn chơi trong trình duyệt |
| Động cơ | Không tim, không điểm, không combo, không xếp hạng | Có tim, điểm, chuỗi combo, thẻ vàng x2, mascot |
| Bảng phấn | Chiếm >= 70% màn chiếu, không bao giờ tự lau | Bảng chữ L <= 40% khung hình, tự lau sau mỗi lượt |
| Nguồn quy định | \`tools/lib/chalk.mjs\` + \`tools/lib/lesson.mjs\` + \`tools/lib/handout.mjs\` | \`tools/lib/feel.mjs\` + \`tools/lib/classroom.mjs\` |

Bảng phấn và vật thật (\`tools/lib/chalk.mjs\`, \`tools/data/props.mjs\`) là của riêng bộ giáo án — 85 prompt
game không mang một dòng nào trong đó, và ngược lại. Hai bộ đi từ cùng một cụm kiến thức nên cùng một bài
được dạy bằng cái pizza rồi luyện bằng chính cái pizza đó.

## Cách dùng

0. Tìm nhanh theo lớp: mở **Dashboard MiTi** → tab **"Giáo án giảng bài"** (${lessons.length} card), bấm "Sao chép giáo án" là lấy trọn khối prompt.
1. Mở file giáo án cần dạy, copy nguyên khối \`\`\`text\`\`\`.
2. Dán vào Google Gemini đã bật chế độ Canvas, gửi.
3. Gemini sinh ra MỘT file HTML độc lập. Mở file đó bằng trình duyệt, cắm máy chiếu.
4. Không có camera vẫn dạy được trọn vẹn: chuột và bàn phím thay mọi thao tác tay.

## Mỗi giáo án gồm năm bước

Cấu trúc này giống nhau ở cả ${lessons.length} bài để giáo viên thuộc được mạch:
**Khởi động** (2–3 phút, hỏi gắn với vật thật, chưa viết gì) → **Vật thật** (4–5 phút, thao tác tay)
→ **Sơ đồ** (3–4 phút, học sinh tự dựng biểu diễn bán cụ thể) → **Phép tính** (3–4 phút, mỗi con số
nối ngược về sơ đồ) → **Luyện tập chung** (3–4 phút, cả lớp biểu quyết bằng ngón tay). Tổng 15–20 phút.

## Toán lớp 4 (${byLop[4].length} giáo án)

| Mã | Bài giảng | Cụm kiến thức | Game cùng cụm |
| --- | --- | --- | --- |
${byLop[4].map(row).join('\n')}

## Toán lớp 5 (${byLop[5].length} giáo án)

| Mã | Bài giảng | Cụm kiến thức | Game cùng cụm |
| --- | --- | --- | --- |
${byLop[5].map(row).join('\n')}

## Muốn thêm hoặc sửa giáo án

- Thêm cụm kiến thức mới: sửa \`tools/data/clusters.mjs\`, \`tools/data/props.mjs\` (đủ 5 trường) và \`tools/data/lessons.mjs\` (đủ 3 trường), rồi chạy \`node tools/build.mjs\`.
- Đổi quy định bảng phấn: \`tools/lib/chalk.mjs\` (${Object.keys(CHALK).length} quy định).
- Đổi quy định từ bảng ra vở: \`tools/lib/handout.mjs\` (${Object.keys(HANDOUT).length} quy định).
- Đổi quy định chế độ giảng bài: \`tools/lib/lesson.mjs\` (${Object.keys(LESSON).length} quy định).
- \`node tools/validate.mjs\` sẽ chặn nếu thiếu quy định nào, nếu vật thật thiếu trường, hoặc nếu cơ chế game lọt vào giáo án.
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
