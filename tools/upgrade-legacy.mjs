import fs from 'fs';
import path from 'path';
import { LEGACY } from './data/legacy.mjs';
import { sharedRuleLines, renderSections, SECTIONS } from './lib/skeleton.mjs';
import { isFingerGame, modelLine } from './lib/players.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

// Các phụ thuộc đời đầu đã bị chuẩn MiTi cấm: thay bằng công nghệ tương đương, không phá ý tưởng game.
// Quy tắc thế cả dòng (có URL) phải chạy trước quy tắc thế từ khóa.
const PATCHES = [
  [/- MediaPipe Camera Utils \([^)]*\)\n/g, ''],
  [/- MediaPipe Hands \([^)]*\)/g, '- MediaPipe Tasks Vision, phiên bản pin 1.0.1 (vision_bundle.mjs + wasm + hand_landmarker.task; pose_landmarker_lite.task nếu cần tư thế toàn thân)'],
  [/- Tone\.js \([^)]*\)/g, '- Âm thanh: tổng hợp bằng Web Audio API, không dùng file mp3 ngoài.'],
  [/FontAwesome 6 \([^)]*\)/g, 'Biểu tượng: inline SVG, không tải FontAwesome.'],
  [/- Tailwind CSS \(https:\/\/cdn\.tailwindcss\.com\)/g, '- Giao diện: CSS nội tuyến trong một khối <style>, không dùng Tailwind Play CDN.'],
  [/Tailwind CSS CDN/g, 'CSS nội tuyến (không dùng Tailwind Play CDN)'],
  [/giao diện Tailwind CSS đẹp mắt/g, 'giao diện CSS nội tuyến đẹp mắt'],
  [/Tone\.js CDN/g, 'Web Audio API (không cần CDN âm thanh)'],
  [/\bTone\.js\b/g, 'Web Audio API'],
  [/\bTone\.[A-Za-z]+/g, 'Web Audio API'],
  [/Dùng Google MediaPipe Hands nhúng qua CDN \([^)]*\)/g, 'Dùng MediaPipe Tasks Vision HandLandmarker (pin @1.0.1, file vision_bundle.mjs + wasm + hand_landmarker.task)'],
  [/Dùng MediaPipe Hands nhúng qua CDN \([^)]*\)/g, 'Dùng MediaPipe Tasks Vision HandLandmarker (pin @1.0.1, file vision_bundle.mjs + wasm + hand_landmarker.task)'],
  [/Dùng MediaPipe Hands \(hoặc MediaPipe Pose\) nhúng qua CDN/g, 'Dùng MediaPipe Tasks Vision: HandLandmarker cho thao tác tay, PoseLandmarker (pose_landmarker_lite.task) cho nghiêng người, đều pin @1.0.1'],
  [/Dùng MediaPipe Hands \([^)]*\)/g, 'Dùng MediaPipe Tasks Vision HandLandmarker (pin @1.0.1, vision_bundle.mjs + wasm + hand_landmarker.task)'],
  [/MediaPipe CDN/g, 'MediaPipe Tasks Vision CDN (pin @1.0.1)'],
];

// Khối cũ "YÊU CẦU BẮT BUỘC THEO CHUẨN MiTi" (chạy lần đầu) hoặc heading mục 1 (chạy lại) đánh dấu chỗ bắt đầu khối luật.
const OLD_MARK = 'YÊU CẦU BẮT BUỘC THEO CHUẨN MiTi';
const NEW_MARK = SECTIONS[0].title;

const bannerOf = (l) =>
  `> **LEGACY (LEG-${l.id.slice(4)})** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Tone.js bằng chuẩn hiện hành. Bản chuẩn để làm game mới: \`prompts/00-master-canvas-prompt.md\`; 85 prompt đặc thù nằm trong \`catalogs/GAME_CATALOG.csv\`.\n`;

// Khối luật chung (bản compact: thân legacy đã tự mô tả kỹ thuật) + dòng "model:" theo cơ chế của game.
function rulesFor(l, body) {
  const codes = l.gestures.split('+');
  const finger = isFingerGame(codes) || body.includes('HandLandmarker');
  const parts = sharedRuleLines({ english: l.mon === 'Tiếng Anh', camera: true, finger, compact: true });
  parts.tech = [...parts.tech, '- ' + modelLine(codes)];
  return renderSections(parts, l.file);
}

let changed = 0;
for (const l of LEGACY) {
  const file = path.join(ROOT, l.file);
  if (!fs.existsSync(file)) throw new Error('Thiếu file legacy: ' + l.file);
  let text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  for (const [re, to] of PATCHES) text = text.replace(re, to);

  if (!text.includes('LEGACY (LEG-')) {
    const lines = text.split('\n');
    const sep = lines.findIndex((x) => x.trim() === '---');
    if (sep < 0) throw new Error(l.file + ': không có dòng phân cách để gắn nhãn legacy');
    lines.splice(sep, 0, bannerOf(l));
    text = lines.join('\n');
  }

  const lines = text.split('\n');
  const last = lines.lastIndexOf('\`\`\`');
  if (last < 0) throw new Error(l.file + ': không tìm thấy khối prompt để chèn yêu cầu');
  let at = lines.findIndex((x) => x.startsWith(OLD_MARK));
  if (at < 0) at = lines.indexOf(NEW_MARK);
  // Chưa có khối luật thì chèn ngay sau phần mô tả game (trước dòng đóng khối prompt).
  if (at < 0 || at > last) { at = last; lines.splice(last, 0, ''); at = last + 1; }
  const body = lines.slice(0, at).join('\n');
  const end = lines.lastIndexOf('\`\`\`');
  lines.splice(at, end - at, rulesFor(l, body));
  text = lines.join('\n');

  fs.writeFileSync(file, text, 'utf8');
  changed++;
}
console.log(`Đã nâng cấp ${changed} prompt legacy (LEG-01..${String(changed).padStart(2, '0')}).`);
