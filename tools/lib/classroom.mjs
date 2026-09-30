// Quy định lớp học ở tầng giao diện — bổ sung cho rules.mjs (an toàn/hiệu năng) và feel.mjs (vận động).
// Người chơi nằm ở players.mjs (PLAYERS); ôn tập xuyên phiên ở memory.mjs (MEMORY.review).
// validate.mjs so khớp nguyên văn các chuỗi này.

export const CLASSROOM = {
  // Chữ không đè lên người học sinh.
  safeZone:
    'Vùng an toàn HUD: lưới 3×3, ô giữa và ô giữa trên (thân học sinh) CẤM đặt chữ; HUD, điểm, tim, đề, thẻ đáp án, mascot chỉ ở dải trên, hai cột biên và dải dưới; vật thể được bay qua vùng giữa.',

  // Chọn cơ chế theo mức camera đang thấy.
  framing:
    'Khung hình: lúc bắt đầu kiểm camera thấy chỉ tay, nửa thân (vai 11/12) hay toàn thân (hông 23/24), chọn cơ chế theo mức ĐANG CÓ (thiếu vai bỏ nghiêng thân, thiếu hông bỏ bước chân, một tay dùng cơ chế một tay); hiện "camera đang thấy: …" và gợi ý lùi xa nếu thiếu.',
};

// Dòng rút gọn cho checklist và block biến thể.
export const CLASSROOM_SHORT =
  'HUD không đè thân học sinh · chọn cơ chế theo mức camera đang thấy';
