// Sinh PHIẾU GIAO NHIỆM VỤ (markdown) từ một file JSON giáo án — teacher mode (issue #17).
// Đọc giáo án -> validate bằng tools/data/lesson-schema.mjs -> in phiếu ra stdout.
//
// Cách dùng:
//   node tools/build-lesson-plan.mjs [duong-dan-file-json]
// Mặc định đọc tools/data/lesson-example.json.
// Giáo án lỗi -> in lỗi tiếng Việt và thoát mã 1 (không sinh phiếu).
//
// Tool độc lập, KHÔNG nằm trong pipeline tools/build.mjs (pipeline sinh prompt
// không đổi). Không động vào engine game hay CORE lines; không thu thập dữ liệu.

import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { STANDARDS } from './data/standards.mjs';
import { readCatalog } from './lib/csv.mjs';
import {
  validateLesson,
  canhBaoGiaoAn,
  monCuaGame,
} from './data/lesson-schema.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const input = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(ROOT, 'tools', 'data', 'lesson-example.json');

let plan;
try {
  plan = JSON.parse(fs.readFileSync(input, 'utf8'));
} catch (e) {
  console.error(`Không đọc được file JSON: ${input} (${e.message})`);
  process.exit(1);
}

const loi = validateLesson(plan);
if (loi.length > 0) {
  console.error('Giáo án chưa hợp lệ, chưa sinh phiếu:');
  for (const m of loi) console.error(' - ' + m);
  process.exit(1);
}
for (const m of canhBaoGiaoAn(plan)) console.error('Cảnh báo: ' + m);

// ---- Tra cứu ----
const GAME_BY_ID = new Map(GAMES.map((g) => [g.id, g]));
const promptCua = new Map();
try {
  for (const row of readCatalog(path.join(ROOT, 'catalogs', 'GAME_CATALOG.csv'))) {
    if (row.id) promptCua.set(row.id, row.prompt || '');
  }
} catch { /* catalog thiếu thì vẫn sinh phiếu, chỉ trống cột prompt */ }

const worlds = plan.worldIds.map((id) => GAME_BY_ID.get(id)).filter(Boolean);
const skills = plan.skills && plan.skills.length
  ? plan.skills
  : [...new Set(worlds.map((w) => w.cluster))];

const DO_KHO = { 1: 'Dễ', 2: 'Trung bình', 3: 'Khó' };
// Theo CORE: một phiên game ≤ 10 phút (khởi động 60–90s + 12 lượt + hạ nhiệt).
const PHUT_MOI_GAME = 10;
const soGameVua = Math.max(1, Math.floor(plan.durationMinutes / PHUT_MOI_GAME));

const hang = (w, i) => {
  const st = STANDARDS[w.cluster];
  const nhan = st ? `${st.ngan} (cụm ${w.cluster})` : w.cluster;
  const prompt = promptCua.get(w.id) || '(xem catalogs/GAME_CATALOG.csv)';
  return `| ${i + 1} | ${w.id} ${w.name} | ${nhan} | ${w.gestures.join(' + ')} | ${prompt} |`;
};

const checklist = [
  'Mở sẵn prompt từng game trong danh sách (file .md ở cột Prompt) để dán vào Gemini Canvas nếu cần tạo lại.',
  'Kiểm tra camera + ánh sáng lớp; chuẩn bị chế độ không camera (chuột/cảm ứng) cho máy yếu.',
  'Chia lượt chơi theo sĩ số: mỗi em ≤ 20 giây chờ, các em chờ có việc (đếm nhịp, cổ vũ, theo dõi đáp án).',
  `Đặt độ khó ${plan.difficulty}/3 (${DO_KHO[plan.difficulty]}) — khớp level trong ngân hàng câu hỏi của game.`,
  'Chuẩn bị giấy/phiếu ghi nhận: sau mỗi game chép nhóm lỗi (errorTag) ở màn tổng kết.',
];

const out = [];
out.push(`# PHIẾU GIAO NHIỆM VỤ — ${plan.ten}`);
out.push('');
out.push(`- Tuần ${plan.tuan} · Môn ${plan.mon} · Lớp ${plan.lop}`);
out.push(`- Thời lượng: ${plan.durationMinutes} phút · Độ khó: ${plan.difficulty}/3 (${DO_KHO[plan.difficulty]}) · Sĩ số: ${plan.classSize} em`);
out.push(`- Kỹ năng: ${skills.map((s) => { const st = STANDARDS[s]; return st ? `${st.ngan} (\`${s}\`)` : `\`${s}\``; }).join(', ')}`);
if (plan.ghiChu) out.push(`- Ghi chú của cô: ${plan.ghiChu}`);
out.push('');
out.push('## Danh sách world');
out.push('');
out.push('| # | World | Kỹ năng | Điều khiển | Prompt |');
out.push('|---|-------|---------|------------|--------|');
worlds.forEach((w, i) => out.push(hang(w, i)));
out.push('');
out.push('## Gợi ý phân bổ thời gian');
out.push('');
out.push(`- Mỗi game một phiên ≤ ${PHUT_MOI_GAME} phút (khởi động + 12 lượt + hạ nhiệt, theo ràng buộc CORE).`);
out.push(`- Với ${plan.durationMinutes} phút: khoảng ${soGameVua} game là vừa; game thừa để dành buổi sau hoặc cho nhóm nhanh.`);
out.push('- Giữa hai game nghỉ 2–3 phút cho mắt và tay.');
out.push('');
out.push('## Checklist chuẩn bị cho cô');
out.push('');
for (const c of checklist) out.push(`- [ ] ${c}`);
out.push('');
out.push('## Sau buổi học — đọc báo cáo (không thu video/ảnh)');
out.push('');
out.push('Mỗi game đã có sẵn màn tổng kết, cô chỉ cần chép lại:');
out.push('- Ba thẻ "Làm tốt / Cần luyện / Động tác lần sau" của từng lượt chơi.');
out.push('- Nhóm câu sai theo **errorTag** (mã lỗi như `thieu_hang_trong`): gom các thẻ giống nhau để biết cả lớp yếu ở đâu, ra bài luyện bổ trợ đúng chỗ.');
out.push('- Khối **"Gửi bố mẹ"** trong game: 4 dòng điền số thật — dùng làm nội dung trao đổi với phụ huynh, không cần chụp màn hình trẻ.');
out.push('');
out.push('> Không thu video hay ảnh học sinh dưới mọi hình thức. Mọi số liệu đều đọc từ màn hình game, không lưu trữ tập trung.');
out.push('');
out.push('---');
out.push(`*Phiếu sinh tự động từ \`${path.basename(input)}\` bằng \`node tools/build-lesson-plan.mjs\`. Giáo án JSON do cô giữ; muốn đổi game chỉ cần sửa file JSON rồi chạy lại.*`);

console.log(out.join('\n'));
