import fs from 'fs';
import path from 'path';
import { HUMAN_CHECKS } from './lib/acceptance.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'prompts', 'CHECKLIST_NGHIEP_THU.md');

// Bảng kiểm dành cho NGƯỜI LỚN thử game, không phải cho mô hình.
// Mọi dòng suy ra từ tools/lib/acceptance.mjs — sửa ở lib rồi chạy node tools/build.mjs.

const rows = HUMAN_CHECKS.map((s, i) => `${i + 1}. ${s}`).join('\n');

const out = `# ✅ BẢNG KIỂM NGHIỆM THU GAME MiTi

> **Do \`tools/build-acceptance.mjs\` sinh ra từ \`tools/lib/acceptance.mjs\`.** Đừng sửa tay file này — đổi nội dung trong lib rồi chạy \`node tools/build.mjs\`.

Dành cho người lớn (giáo viên, phụ huynh) thử game trước khi đưa vào lớp. Bạn vừa dán một prompt vào **Google Gemini → chế độ Canvas** và nhận về một game HTML. Làm lần lượt ${HUMAN_CHECKS.length} việc dưới đây, mất khoảng 15 phút. Việc nào trả lời "không" thì ghi lại, sửa prompt rồi sinh lại game — không sửa tay file HTML.

${rows}

---

*Miti • Học bằng chuyển động — bản chuẩn: \`prompts/00-master-canvas-prompt.md\` · danh mục prompt: \`catalogs/GAME_CATALOG.md\`*
`;

fs.writeFileSync(OUT, out, 'utf8');
console.log(`Đã sinh bảng kiểm ${HUMAN_CHECKS.length} việc người thử vào prompts/${path.basename(OUT)}.`);
