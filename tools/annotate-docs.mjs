import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

// MARK mang số vòng: đổi NOTE thì MARK phải đổi theo, nếu không script sẽ bỏ qua
// và năm tài liệu docs/ vẫn giữ chú thích của vòng cũ trỏ vào module đã bị xóa.
const MARK = 'Cập nhật chuẩn MiTi (2026-10)';
const NOTE_PREFIX = '> **⚠️';

const NOTE = `\n> **⚠️ ${MARK}** — bài này vẫn đúng về ý tưởng, nhưng ba phụ thuộc đã đổi: **Tone.js → Web Audio API tự tổng hợp**, **MediaPipe Hands legacy → MediaPipe Tasks Vision pin \`@1.0.1\`** (vision_bundle.mjs + wasm + hand_landmarker.task), **Tailwind Play CDN → CSS nội tuyến một khối \`<style>\`**.
> Bản chuẩn để viết prompt cho Gemini Canvas: \`prompts/00-master-canvas-prompt.md\` — khung 5 mục (Ý TƯỞNG · MỤC TIÊU HỌC TẬP · RÀNG BUỘC CỐT LÕI · NGÂN HÀNG DỮ LIỆU · TỰ KIỂM TRA), trần 15 KB mỗi prompt. Mọi quy định dùng chung nằm trong 14 dòng \`CORE_LINES\` ở \`tools/lib/core.mjs\`; 425 biến thể điều khiển ở \`prompts/VARIANTS_425.md\`.
> Bài viết dưới đây mô tả kiến trúc cũ (nhiều module \`tools/lib/*\`, prompt dài hàng trăm KB), nên đọc để hiểu cơ chế chứ không copy cấu trúc. Mã nguồn demo trong \`games/\` là bản cũ, chưa theo hợp đồng AR này.\n`;

const FILES = [
  'docs/README.md',
  'docs/bai-01-tong-quan-va-khoi-tao.md',
  'docs/bai-04-thiet-ke-kho-toan-lop-4-5-va-sinh-de.md',
  'docs/bai-05-am-thanh-arcade-voi-tonejs.md',
  'docs/bai-07-huong-dan-tu-tao-mini-game-moi.md',
];

// Xóa chú thích cũ (mọi phiên bản MARK) rồi gắn chú thích hiện hành ngay sau H1.
const stripOldNote = (lines) => {
  const out = [];
  let dropping = false;
  for (const l of lines) {
    if (l.startsWith(NOTE_PREFIX) && l.includes('Cập nhật chuẩn MiTi')) {
      dropping = true;
      continue;
    }
    if (dropping) {
      if (l.trim() === '') {
        dropping = false;
        continue;
      }
      if (l.startsWith('>')) continue;
      dropping = false;
    }
    out.push(l);
  }
  return out;
};

let touched = 0;
for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) throw new Error('Thiếu file docs: ' + rel);
  let text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const lines = stripOldNote(text.split('\n'));
  const h1 = lines.findIndex((l) => l.startsWith('# '));
  if (h1 < 0) throw new Error('Không có dòng # để gắn chú thích: ' + rel);
  lines.splice(h1 + 1, 0, NOTE.trimEnd());
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  touched++;
}
console.log(`Đã gắn chú thích chuẩn hiện hành vào ${touched}/${FILES.length} tài liệu docs/.`);
