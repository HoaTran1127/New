// Sinh prompts/00-master-canvas-prompt.md từ khung chung (tools/lib/skeleton.mjs).
// Không sửa tay tệp đầu ra: sửa luật ở tools/lib/*, mã cử chỉ ở tools/data/gestures.mjs rồi chạy lại script này.
import fs from 'fs';
import path from 'path';
import { SECTIONS, SIZE_RATIO, renderSections, sharedRuleLines } from './lib/skeleton.mjs';
import { TASKS_VISION } from './lib/ar.mjs';
import { GESTURES, BANK } from './data/gestures.mjs';
import { BASELINE } from './data/baseline.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const REL = 'prompts/00-master-canvas-prompt.md';
const FENCE = '```';

// Chuỗi đã gỡ khỏi thư viện; lọt lại vào master là lỗi (Yêu cầu 5.x, 10.12).
const FORBIDDEN = [
  'không xếp hạng', 'Không leaderboard', 'maxNumHands: 2', 'numHands = 2N', '7 lần chạm logo',
  'mục máy tự kiểm', 'tờ rời', 'Chế độ hai học sinh (nút bật/tắt',
];

const bullet = (s) => '- ' + s;

function buildParts() {
  const p = sharedRuleLines({ english: false, camera: true, finger: 'maybe' });
  // Phần riêng của master: chỗ trống cho game cụ thể + dòng model + nhánh Tiếng Anh có điều kiện.
  p.hook.unshift(bullet('Nhiệm vụ một câu của học sinh gắn với <MỤC TIÊU>, hiện to ngay trên HUD khi vào <TÊN GAME>.'));
  p.motion.unshift(bullet('Cử chỉ chính <CỬ CHỈ>: làm đúng dòng của mã đó trong BẢNG MÃ CỬ CHỈ ở đầu prompt (điều kiện chốt, fallback); mỗi lần chỉ một cơ chế chính.'));
  p.memory.unshift(bullet('Mọi phản hồi và lời giải phục vụ <MỤC TIÊU>; phương án nhiễu mô hình hóa đúng lỗi học sinh hay mắc.'));
  p.memory.push(bullet('Nếu là game Tiếng Anh: nghe trước rồi mới hiện chữ, đọc bằng window.speechSynthesis giọng en-US hoặc en-GB, mỗi lượt có nút phát lại.'));
  p.data.unshift(bullet(`Số mục tối thiểu: ${BANK['Toán'].so} (Toán) hoặc ${BANK['Tiếng Anh'].so} (Tiếng Anh); Toán tính lại đáp án bằng code, Tiếng Anh có gợi nghĩa tiếng Việt và audio.`));
  p.tech.push(bullet(`Model tay: ${TASKS_VISION.hand}; model thân người: ${TASKS_VISION.pose}. Chỉ tải model mà <CỬ CHỈ> cần.`));
  return p;
}

function gestureTable() {
  const rows = Object.entries(GESTURES).map(([code, g]) =>
    `- ${code} — ${g.vi}. Chốt: ${g.hinh_hoc} Fallback: ${g.fallback}.`);
  return ['BẢNG MÃ CỬ CHỈ (chỉ làm theo dòng của <CỬ CHỈ>, bỏ qua các dòng khác):', ...rows].join('\n');
}

function render() {
  const body = renderSections(buildParts(), REL);
  return [
    '# 👑 MASTER PROMPT — MiTi GEMINI CANVAS EDUCATION GAME',
    '',
    '> Khung chuẩn của mọi prompt trong thư viện. Muốn tạo game mới: copy khối bên dưới, điền ba chỗ trống `<TÊN GAME>`, `<MỤC TIÊU>`, `<CỬ CHỈ>` (một mã trong bảng mã cử chỉ ở đầu khối).',
    '>',
    '> Chạy trên **Google Gemini → bật chế độ Canvas** để có nút Run/Preview chơi ngay. Tệp này do `tools/build-master.mjs` sinh ra, không sửa tay.',
    '',
    '## Prompt copy trực tiếp',
    '',
    FENCE + 'text',
    'Bạn là chuyên gia thiết kế và lập trình game giáo dục HTML5 Canvas có tương tác webcam.',
    'Hãy tạo một WEB GAME GIÁO DỤC HOÀN CHỈNH trong DUY NHẤT 1 FILE HTML (CSS trong <style>, JS trong <script>, không Tailwind CDN, không ảnh/âm thanh/JSON ngoài; chỉ tải ngoài MediaPipe), chạy được bằng cách mở file hoặc bấm Run/Preview trong Canvas.',
    '',
    'Tên game: <TÊN GAME>',
    'Mục tiêu học tập: <MỤC TIÊU>',
    'Cử chỉ chính: <CỬ CHỈ>',
    '',
    gestureTable(),
    '',
    body,
    FENCE,
    '',
    '## Khung này ưu tiên gì',
    '',
    'Trải nghiệm của học sinh đứng trước mọi thứ khác. Ba giây đầu phải có một cú "ồ" để các em muốn chơi; 1, 2 hoặc 3 em cùng đứng trước một máy, mỗi em một làn, thi đua cân bằng để em nào cũng có lý do cố thêm một lượt; mỗi lượt là một động tác lớn của cả cơ thể; lời giải, ôn tập cách quãng và độ khó thích ứng giúp các em nhớ bài sau khi tắt máy; hiệu ứng làm mỗi cú chạm đã mắt nhưng không che kiến thức. Phần kỹ thuật (AR, camera, fallback) chỉ để phục vụ năm điều đó.',
    '',
  ].join('\n');
}

const text = render();
const cap = Math.floor(SIZE_RATIO * BASELINE[REL]);
if (text.length > cap) throw new Error(`${REL}: dài ${text.length} ký tự, vượt trần ${cap}`);
const hit = FORBIDDEN.filter((s) => text.includes(s));
if (hit.length) throw new Error(`${REL}: còn chuỗi cấm: ${hit.join(' | ')}`);
const missing = SECTIONS.filter((s) => !text.includes(s.title));
if (missing.length) throw new Error(`${REL}: thiếu heading ${missing.map((s) => s.title).join(', ')}`);

fs.writeFileSync(path.join(ROOT, REL), text, 'utf8');
console.log(`${REL}: ${text.length} ký tự (trần ${cap})`);
