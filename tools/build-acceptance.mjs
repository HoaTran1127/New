import fs from 'fs';
import path from 'path';
import { ACCEPT, MACHINE_ITEMS, HUMAN_CHECKS, CAMERA_ONLY, OFFLINE_ITEMS, rowLabel } from './lib/acceptance.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'prompts', 'CHECKLIST_NGHIEP_THU.md');

// Bảng kiểm dành cho NGƯỜI, không phải cho mô hình: in ra giấy hoặc mở trên điện thoại khi đem game vào lớp.
// Mọi dòng ở đây suy ra từ tools/lib/acceptance.mjs — sửa quy định ở lib rồi chạy node tools/build.mjs.

const machineRows = MACHINE_ITEMS.map((s, i) => rowLabel(s, i)).join('\n');
const humanRows = HUMAN_CHECKS.map((s, i) => `${i + 1}. ${s}`).join('\n');

const out = `# ✅ BẢNG KIỂM NGHIỆM THU GAME MiTi

> **Do \`tools/build-acceptance.mjs\` sinh ra từ \`tools/lib/acceptance.mjs\`.** Đừng sửa tay file này — đổi quy định trong lib rồi chạy \`node tools/build.mjs\`.
>
> Dùng khi: bạn vừa dán một prompt vào **Google Gemini → chế độ Canvas**, nhận về một file HTML, và cần biết nó có thật sự đạt chuẩn MiTi không trước khi cho học sinh chơi.
> Thời lượng: khoảng 15 phút cho một game. In ra giấy hoặc mở trên điện thoại.

## 0. Mở bảng kiểm tự động trong game

${ACCEPT.selfReport}

${ACCEPT.printable}

---

## A. ${MACHINE_ITEMS.length} mục máy tự kiểm — mở bảng kiểm ở mục 0 và đọc kết quả

${ACCEPT.items}

Mục có dấu 📷 chỉ áp dụng khi chơi bằng camera; bản không camera bỏ ${CAMERA_ONLY.length} mục đó và vẫn phải đạt ${OFFLINE_ITEMS} mục còn lại.

Check nhanh khi mở bảng kiểm trong game:

${machineRows}

>Trạng thái ĐẠT / CHƯA ĐẠT phải do code kiểm lúc chạy. Nếu bảng chỉ là chữ tĩnh kê sẵn thì coi như **toàn bộ mục này CHƯA ĐẠT** — đó là lỗi nghiêm trọng nhất của một game giáo dục: nó trông như đã kiểm nhưng không kiểm gì.

---

## B. ${HUMAN_CHECKS.length} việc người thử phải bấm tay — làm theo đúng thứ tự

${ACCEPT.manual}

${humanRows}

---

## C. Khi có dòng CHƯA ĐẠT

${ACCEPT.failRule}

Câu cần trả lời trước khi nộp game: **thiếu mục nào thì sửa prompt thế nào?** Dán lại nguyên văn quy định tương ứng trong \`tools/lib/\` vào cuối prompt, rồi sinh lại file — không tay sửa file HTML.

---

## D. Biên bản

| Ô | Điền |
| :-- | :-- |
| Tên game | |
| Mã prompt (ví dụ \`L4-01\`) | |
| Kiểu điều khiển đã chơi (V1 POINT / V2 SWIPE / V3 DRAG / V4 VOICE / V5 không camera) | |
| Máy dùng để thử (tên hoặc số) | |
| Người nghiệm thu | |
| Ngày giờ | |
| Số mục máy tự kiểm ĐẠT | ____ / ${MACHINE_ITEMS.length} |
| Số việc người thử ĐẠT | ____ / ${HUMAN_CHECKS.length} |
| Kết luận | ☐ Đưa vào tiết học ☐ Sửa prompt rồi kiểm lại |

**Ghi chú riêng tư:** bảng này chỉ tồn tại trên máy của bạn và trong clipboard. Game không được upload ảnh, video hay kết quả nghiệm thu lên bất kỳ máy chủ nào.

---

*Miti • Học bằng chuyển động — bản chuẩn: \`prompts/00-master-canvas-prompt.md\` · 85 prompt: \`catalogs/GAME_CATALOG.md\` · 425 biến thể: \`prompts/VARIANTS_425.md\`*
`;

fs.writeFileSync(OUT, out, 'utf8');
console.log(`Đã sinh bảng kiểm nghiệm thu ${MACHINE_ITEMS.length} mục máy + ${HUMAN_CHECKS.length} việc người thử vào prompts/${path.basename(OUT)}.`);
