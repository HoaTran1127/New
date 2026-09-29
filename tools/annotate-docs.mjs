import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

const NOTE = `\n> **⚠️ Cập nhật chuẩn MiTi (2026-09)** — bài này vẫn đúng về ý tưởng, nhưng ba phụ thuộc đã đổi: **Tone.js → Web Audio API tự tổng hợp**, **MediaPipe Hands legacy → MediaPipe Tasks Vision pin \`@1.0.1\`** (vision_bundle.mjs + wasm + hand_landmarker.task), **Tailwind Play CDN → CSS nội tuyến một khối \`<style>\`**. Bản chuẩn để viết prompt cho Gemini Canvas: \`prompts/00-master-canvas-prompt.md\` §2 (hợp đồng AR: cover-fit, \`toScreen(lx, ly)\`, lớp phủ alpha ≤ 0.45, chiều sâu z, neo landmark) + \`tools/lib/ar.mjs\` + \`tools/lib/rules.mjs\`; 425 prompt biến thể trong \`prompts/VARIANTS_425.md\`. Mã nguồn demo trong \`games/\` là bản cũ, chưa theo hợp đồng AR này.\n`;
const MARK = 'Cập nhật chuẩn MiTi (2026-09)';

const FILES = [
  'docs/README.md',
  'docs/bai-01-tong-quan-va-khoi-tao.md',
  'docs/bai-04-thiet-ke-kho-toan-lop-4-5-va-sinh-de.md',
  'docs/bai-05-am-thanh-arcade-voi-tonejs.md',
  'docs/bai-07-huong-dan-tu-tao-mini-game-moi.md',
];

let touched = 0;
for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) throw new Error('Thiếu file docs: ' + rel);
  let text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  if (text.includes(MARK)) continue;
  const lines = text.split('\n');
  const h1 = lines.findIndex((l) => l.startsWith('# '));
  if (h1 < 0) throw new Error('Không có dòng # để gắn chú thích: ' + rel);
  lines.splice(h1 + 1, 0, NOTE);
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  touched++;
}
console.log(`Đã gắn chú thích chuẩn hiện hành vào ${touched}/${FILES.length} tài liệu docs/.`);
