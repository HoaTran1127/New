// Tiếp cận: hai dòng dùng chung cho mọi prompt. Luật nhấp nháy + prefers-reduced-motion nằm ở EFFECTS.limits (tools/lib/effects.mjs).

export const ACCESS = {
  // Nhìn, nghe, đọc được: màu không là kênh duy nhất, âm thanh có chữ, chữ đủ tương phản.
  perceive:
    'Tiếp cận: đúng/sai phân biệt bằng ✓ ✗ + chữ ngắn, không chỉ bằng màu (tránh cặp đỏ–xanh lá); âm thanh có phụ đề, nút "Hiện chữ" dùng được ngay; chữ tương phản với nền >= 4.5:1, thẻ có nền tối + viền.',

  // Cử chỉ một tay không giả định tay phải.
  handedness:
    'Tay thuận: calibration hỏi "Em thuận tay nào?" (Trái / Phải / Cả hai, mặc định Phải), gán tay điều khiển và gương hướng dẫn theo đó; đổi giữa chừng qua "Chỉnh lại tư thế" không mất điểm hay lượt.',
};
