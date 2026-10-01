// Ba khung "câu chốt" cho tám mạch kiến thức — tầng thứ hai mươi lăm của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm chuỗi NFC, lower-case trong prompts/0X-*/):
//   "điều em nhớ" 0/85 · "một câu chốt" 0/85 · "câu chốt" 0/85 · "hệ thống bài" 0/85
//   · "bằng lời của em" 0/85 · "lời của em" 0/85 · "cả bốn em cùng" 0/85 · "bốn câu của bốn em" 0/85
//   · "tự đánh giá" 0/85 · "ngón tay của em" 0/85 · "nhắc lại bằng lời" 0/85 · "kể lại một câu" 0/85
//   · "20 giây cuối" 0/85
//   — ngược lại "thả lỏng" 85/85 và "giãn cơ" 85/85 (pe.mjs + sport.mjs đã phủ phần thân thể cuối tiết),
//   còn phần trí tuệ cuối tiết thì không: memory.mjs chỉ có "Vì sao đúng?" ở 4/12 lượt với BA phương án
//   do máy viết sẵn, curriculum.mjs đưa "Mẹo nhớ" do máy đọc, family.mjs mang mẹo VỀ NHÀ chứ em không nói.
// Nghĩa là sau chín phút vận động, chưa một tầng nào bắt em tự phát ra MỘT câu bằng miệng của chính em
// cho cái em vừa hiểu — đúng hoạt động khép mọi tiết Thể dục lớp 4–5 trong sách giáo khoa ("hệ thống bài":
// cô hỏi, bốn em lần lượt nói một câu) và là phép thử trung thực nhất: nói được bằng lời của mình thì mới
// thật sự hiểu. Một câu em tự nói còn nhớ lâu hơn ba lời giải thích em nghe.
//
// Danh sách chặn trước khi soạn (lấy từ các tầng đã có, không đặt trần mới):
// memory.mjs đã lấy "Vì sao em chọn câu trả lời này?" + 3 phương án; quiz.mjs đã lấy ba mẫu câu "Đố bạn"
// có dấu hỏi và có chỗ trống "…" để điền một số/một từ; lead.mjs đã lấy động tác dẫn; family.mjs đã lấy
// dòng "Mẹo con mang về"; lesson.mjs đã lấy khối "Bản tiết học". Vì vậy 24 khung dưới đây là CÂU KHẲNG
// ĐỊNH (không có dấu hỏi), luôn mở đầu bằng "Điều em nhớ:" để giáo viên nhìn một dòng là biết em vừa chốt
// cái gì, và chỗ trống "…" do EM nói to bằng miệng — game không bật microphone (chỉ ba game mã VOICE mới
// có micro), không nhận dạng giọng nói, không tự phiên âm câu của em.
//
// Ràng buộc kế thừa (không đặt số mới): 12 lượt và 3 hiệp (pe + lesson), 3 lượt đố ở cuối mỗi hiệp (quiz),
// 5 giây cho một lượt dẫn (lead), thẻ MỘT hàng chữ >= 20px tự tắt sau 6 giây (curriculum), trần 8–10 phút
// một phiên (lesson), +5 điểm vào "Cả nhóm" và không vào "miti-best" (queue), 1 sải tay + hình quạt 90 độ
// (playzone), ngân sách 3 câu thoại mỗi phút và mỗi câu <= 6 từ (identity), giọng en-US cho học liệu tiếng
// Anh (rules), "miti-mute" (rhythm), nút "Copy tờ rời" (acceptance).

import { MACH_TEN } from './standards.mjs';

// Ba khung mỗi mạch, mỗi khung <= 12 từ, có ĐÚNG MỘT chỗ trống "…" và không có dấu hỏi.
export const TAKEAWAY = {
  'Số và phép tính': [
    'Điều em nhớ: quy tắc em vừa dùng là …',
    'Điều em nhớ: phép tính em hay nhầm là …',
    'Điều em nhớ: em vừa thêm bớt ở hàng …',
  ],
  'Hình học và đo lường': [
    'Điều em nhớ: hình này có … cạnh',
    'Điều em nhớ: góc vuông lớn hơn góc …',
    'Điều em nhớ: em đo bằng đơn vị …',
  ],
  'Giải toán có lời văn': [
    'Điều em nhớ: bước đầu ta đi tìm …',
    'Điều em nhớ: đáp số của bài là …',
    'Điều em nhớ: đề bài hỏi về …',
  ],
  'Một số yếu tố thống kê và xác suất': [
    'Điều em nhớ: cột cao nhất chỉ …',
    'Điều em nhớ: bảng có … hàng số liệu',
    'Điều em nhớ: sự kiện chắc chắn là …',
  ],
  'Ôn tập tổng hợp': [
    'Điều em nhớ: câu dễ nhất với em là …',
    'Điều em nhớ: em còn nhầm ở chỗ …',
    'Điều em nhớ: lần sau em sẽ sửa …',
  ],
  'Kiến thức ngôn ngữ': [
    'Điều em nhớ: từ em học hôm nay là …',
    'Điều em nhớ: cặp trái ngược là …',
    'Điều em nhớ: chữ cái thiếu trong từ …',
  ],
  'Nghe và nói': [
    'Điều em nhớ: em nghe thấy số …',
    'Điều em nhớ: câu em vừa nói là …',
    'Điều em nhớ: bạn em vừa nói từ …',
  ],
  'Đọc và viết': [
    'Điều em nhớ: từ em vừa đọc là …',
    'Điều em nhớ: em đánh vần từ …',
    'Điều em nhớ: chữ cái đầu của từ …',
  ],
};

export function takeawayFrames(mach) {
  const t = TAKEAWAY[mach];
  if (!t) throw new Error(`Thiếu khung câu chốt cho mạch kiến thức: ${mach} — bổ sung tools/data/takeaways.mjs.`);
  return t;
}

export const TAKEAWAY_KEYS = Object.keys(TAKEAWAY);

// Chốt cứng: đủ tám mạch, mỗi mạch đúng ba khung, mọi khung mở đầu "Điều em nhớ:", có đúng một chỗ trống,
// không phải câu hỏi, <= 12 từ, không lẫn ký tự CJK và hai mươi tư khung đôi khác nhau.
{
  const thieu = MACH_TEN.filter((m) => !TAKEAWAY[m]);
  if (thieu.length) throw new Error(`tools/data/takeaways.mjs thiếu mạch: ${thieu.join(', ')}`);
  const thua = TAKEAWAY_KEYS.filter((m) => !MACH_TEN.includes(m));
  if (thua.length) throw new Error(`tools/data/takeaways.mjs thừa mạch ngoài MACH_TEN: ${thua.join(', ')}`);
  const all = [];
  for (const [mach, frames] of Object.entries(TAKEAWAY)) {
    if (frames.length !== 3) throw new Error(`Mạch ${mach} phải có đúng 3 khung câu chốt.`);
    for (const f of frames) {
      if (!f.startsWith('Điều em nhớ:')) throw new Error(`Khung "${f}" (mạch ${mach}) phải mở đầu bằng "Điều em nhớ:".`);
      if ((f.match(/…/g) || []).length !== 1) throw new Error(`Khung "${f}" (mạch ${mach}) phải có đúng một chỗ trống.`);
      if (f.includes('?')) throw new Error(`Khung "${f}" (mạch ${mach}) là câu hỏi — câu chốt phải là câu khẳng định.`);
      if (f.split(/\s+/).length > 12) throw new Error(`Khung "${f}" (mạch ${mach}) quá 12 từ.`);
      if (/[\u3400-\u9fff\u3040-\u30ff]/.test(f)) throw new Error(`Khung "${f}" (mạch ${mach}) lẫn ký tự CJK.`);
      all.push(f);
    }
    const trung = frames.filter((f, i) => frames.indexOf(f) !== i);
    if (trung.length) throw new Error(`Mạch ${mach} có khung trùng lặp: ${trung.join(' | ')}`);
  }
  const giongNhau = all.filter((f, i) => all.indexOf(f) !== i);
  if (giongNhau.length) throw new Error(`Hai mươi tư khung câu chốt bị trùng giữa các mạch: ${[...new Set(giongNhau)].join(' | ')}`);
  if (all.length !== 24) throw new Error(`tools/data/takeaways.mjs phải có đúng 24 khung, hiện có ${all.length}.`);
}
