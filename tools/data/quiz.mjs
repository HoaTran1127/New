// Ba mẫu câu "đố bạn" cho tám mạch kiến thức — tầng thứ hai mươi ba của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm chuỗi NFC trong prompts/0X-*/):
//   "đố bạn" 0/85 · "người đố" 0/85 · "em ra đề" 0/85 · "tự đặt đề" 0/85 · "điền vào chỗ trống" 0/85
//   "hoàn thành câu" 0/85 · "em đọc to" 0/85 · "tự viết đề" 0/85 — ngược lại "ngân hàng câu hỏi" 85/85,
//   "đề bài hiện" 85/85, "mic/micro" chỉ 3/85 (đúng ba game mã VOICE).
// Tức là trong cả 85 game, đề LUÔN do máy đưa ra và em không bao giờ là người đặt đề; tiếng nói của em
// chỉ được dùng ở ba game đó. Ở lớp 4–5 đây chính là hoạt động em thích nhất ("cho em được đố bạn")
// và cũng là mức khó nhất của thang nhận thức: muốn đố được, em phải hiểu cái đang học.
//
// Mẫu câu viết sẵn theo MẠCH kiến thức (không theo cụm 57 dòng) để em chỉ việc đọc và điền một số/một từ
// đang hiện trên thẻ: giáo viên không phải giải thích luật mới, lớp 45 em không ồn, và game không cần
// nhận diện tiếng nói (micro vẫn chỉ có ở ba game mã VOICE theo RULES).
//
// Ràng buộc kế thừa (không đặt số mới): 12 lượt và 3 hiệp (pe + lesson), một lượt cuối mỗi hiệp,
// 3 lượt một vai và bốn vai chờ (queue), thẻ tự tắt sau 6 giây và chữ >= 20px (curriculum),
// trần 8–10 phút một phiên (lesson), +5 điểm vào "Cả nhóm" và không vào "miti-best" (queue),
// ngân sách 3 câu thoại mỗi phút, mỗi câu <= 6 từ (identity), 1 sải tay + hình quạt 90 độ (playzone),
// giọng en-US cho học liệu tiếng Anh (rules), "miti-mute" (rhythm).

import { MACH_TEN } from './standards.mjs';

// Ba mẫu câu mỗi mạch, mỗi mẫu <= 8 từ và có ĐÚNG MỘT chỗ trống "…" để em điền số hoặc từ đang hiện trên thẻ.
export const QUIZ = {
  'Số và phép tính': [
    'Kết quả đúng là số …?',
    'Số còn thiếu là số …?',
    'Ở hàng …, chữ số là mấy?',
  ],
  'Hình học và đo lường': [
    'Hình này có … cạnh?',
    'Góc này là góc …?',
    'Chu vi hình bằng …?',
  ],
  'Giải toán có lời văn': [
    'Bước đầu ta tìm …?',
    'Đáp số của bài là …?',
    'Bài toán hỏi nhiều hơn …?',
  ],
  'Một số yếu tố thống kê và xác suất': [
    'Cột cao nhất là …?',
    'Bảng có … số liệu?',
    'Sự kiện nào chắc chắn …?',
  ],
  'Đọc và viết': [
    'Read the word: …?',
    'Which letter is missing, …?',
    'Spell the word: …?',
  ],
  'Nghe và nói': [
    'Can you say it, …?',
    'Say the number: …?',
    'Listen and repeat: …?',
  ],
  'Kiến thức ngôn ngữ': [
    'Choose the correct word, …?',
    'What is the opposite of …?',
    'Which word comes next, …?',
  ],
  'Ôn tập tổng hợp': [
    'Câu này đúng hay …?',
    'Bạn chọn đáp án …?',
    'Thiếu số nào đây, …?',
  ],
};

export function quizFrames(mach) {
  const q = QUIZ[mach];
  if (!q) throw new Error(`Thiếu mẫu câu đố bạn cho mạch kiến thức: ${mach} — bổ sung tools/data/quiz.mjs.`);
  return q;
}

export const QUIZ_KEYS = Object.keys(QUIZ);

// Chốt cứng: đủ tám mạch, mỗi mạch đúng ba mẫu, mọi mẫu có đúng một chỗ trống và <= 8 từ.
{
  const thieu = MACH_TEN.filter((m) => !QUIZ[m]);
  if (thieu.length) throw new Error(`tools/data/quiz.mjs thiếu mạch: ${thieu.join(', ')}`);
  const thua = QUIZ_KEYS.filter((m) => !MACH_TEN.includes(m));
  if (thua.length) throw new Error(`tools/data/quiz.mjs thừa mạch ngoài MACH: ${thua.join(', ')}`);
  for (const [mach, frames] of Object.entries(QUIZ)) {
    if (frames.length !== 3) throw new Error(`Mạch ${mach} phải có đúng 3 mẫu câu đố.`);
    for (const f of frames) {
      if ((f.match(/…/g) || []).length !== 1) throw new Error(`Mẫu câu "${f}" (mạch ${mach}) phải có đúng một chỗ trống.`);
      if (f.split(/\s+/).length > 8) throw new Error(`Mẫu câu "${f}" (mạch ${mach}) quá 8 từ.`);
    }
  }
}
