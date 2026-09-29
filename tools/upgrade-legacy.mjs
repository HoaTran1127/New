import fs from 'fs';
import path from 'path';
import { LEGACY } from './data/legacy.mjs';

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

const REQUIREMENTS = `YÊU CẦU BẮT BUỘC THEO CHUẨN MiTi (áp dụng cho bản prompt legacy này):
1. NGÂN HÀNG DỮ LIỆU: khai báo \`const QUESTION_DATA = [...]\` ở ĐẦU khối <script>, engine đặt phía sau. Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet }; tối thiểu 40 mục chia 3 mức độ; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo trộn vị trí đáp án bằng seed theo lượt.
2. CAMERA: MediaPipe Tasks Vision pin phiên bản (vision_bundle.mjs@1.0.1 + wasm + hand_landmarker.task, pose_landmarker_lite.task nếu cần tư thế toàn thân). getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }); khung 4:3, crop nếu camera tỉ lệ khác, lật gương ngang khi hiển thị và tính tọa độ.
3. CHỈ XIN QUYỀN CAMERA SAU khi học sinh bấm BẮT ĐẦU. Trạng thái tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại). Có khung định vị để học sinh biết đặt tay ở đâu.
4. CHỐNG CHỐT NHẦM: làm mượt EMA alpha 0.4–0.5; cử chỉ chỉ fire ở lượt chuyển trạng thái kèm hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim; hover không phải hit; confidence thấp thì không chốt.
5. FALLBACK: chuột / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính, có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng không tải lại trang. CDN hoặc model lỗi thì tự chuyển sang chế độ không camera, game vẫn chơi đủ, mục tiêu học tập vẫn đủ 100%.
6. PHẢN HỒI HỌC TẬP: sai thì dừng 2 giây, chỉ rõ bước hoặc chữ số hoặc từ cần sửa, không hiệu ứng nào che lời giải; câu sai xếp vào CUỐI vòng chơi để luyện lại; màn tổng kết nhóm theo loiViet kiểu "Em hay sai ở: ..." kèm số câu đúng/sai theo mức độ.
7. Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em". Chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive dọc và ngang, có Pause, Replay, Giảm hiệu ứng chuyển động; không leaderboard, không quảng cáo.
8. RIÊNG TƯ: không upload ảnh/video từ camera, chỉ giữ landmark trong bộ nhớ, không thu thập dữ liệu cá nhân. Toàn bộ UI, tên nút, hướng dẫn, thông báo và lời giải bằng TIẾNG VIỆT; không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.
9. CHỮ KÝ MiTi (bắt buộc trong HTML): ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang hoặc màn kết quả có dòng "MiTi • Học bằng chuyển động"; không xóa hoặc đổi tên thương hiệu khi replay hay ở chế độ không camera.
10. ĐẦU RA: duy nhất 1 file HTML hoàn chỉnh, CSS nội tuyến trong một khối <style>, không file .css/.js/.json/ảnh/mp3 ngoài, không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không lỗi console khi mở trực tiếp bằng trình duyệt.`;

const bannerOf = (l) =>
  `> **LEGACY (LEG-${l.id.slice(4)})** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Tone.js bằng chuẩn hiện hành. Bản chuẩn để làm game mới: \`prompts/00-master-canvas-prompt.md\`; 85 prompt đặc thù nằm trong \`catalogs/GAME_CATALOG.csv\`.\n`;

let changed = 0;
for (const l of LEGACY) {
  const file = path.join(ROOT, l.file);
  if (!fs.existsSync(file)) throw new Error('Thiếu file legacy: ' + l.file);
  let text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  for (const [re, to] of PATCHES) text = text.replace(re, to);

  if (!text.includes('LEGACY (LEG-')) {
    const lines = text.split('\n');
    const sep = lines.findIndex((l) => l.trim() === '---');
    if (sep < 0) throw new Error('Không có dòng phân cách để gắn nhãn legacy: ' + l.file);
    lines.splice(sep, 0, bannerOf(l));
    text = lines.join('\n');
  }

  if (!text.includes('YÊU CẦU BẮT BUỘC THEO CHUẨN MiTi')) {
    const lines = text.split('\n');
    const last = lines.lastIndexOf('```');
    if (last < 0) throw new Error('Không tìm thấy khối prompt để chèn yêu cầu: ' + l.file);
    lines.splice(last, 0, '', REQUIREMENTS);
    text = lines.join('\n');
  }

  fs.writeFileSync(file, text, 'utf8');
  changed++;
}
console.log(`Đã nâng cấp ${changed} prompt legacy (LEG-01..${String(changed).padStart(2, '0')}).`);
