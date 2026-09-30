// Các quy định chung áp cho mọi prompt (game + biến thể).
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải đổi cả validate.
// Màn tổng kết (ba thẻ cũ) đã gộp vào dòng tổng kết mục 4 của skeleton.

export const RULES = {
  // Vòng chơi: tỉ lệ thẻ và chống ăn may.
  antiLuck: 'Vật đúng/sai trộn xấp xỉ 60/40 mỗi lượt; chạm vật SAI trừ tim và cắt chuỗi, BỎ LỠ vật ĐÚNG chỉ cắt chuỗi, không trừ tim — vung tay bừa không thắng, đứng chờ không bị phạt oan.',

  // Calibration động theo cơ thể học sinh.
  calibration: 'Calibration 3 giây tư thế trung tính: đo bề rộng vai, khoảng cách hai cổ tay, tầm với xa nhất rồi đặt MỌI ngưỡng (tốc độ vung, góc, bán kính chốt) theo đơn vị đó, không hằng số pixel; tầm đo bất thường thì nhắc chỉnh khoảng cách. Nút "Chỉnh lại tư thế" đo lại không tải trang, không mất điểm và lượt.',

  // Ngân sách hiệu năng cho máy phổ thông.
  perf: 'Hiệu năng: mục tiêu 30 FPS trên laptop trường học; nhận diện bằng requestVideoFrameCallback hoặc 1 lần mỗi 2–3 khung, render theo requestAnimationFrame; pool cho particle, không cấp phát object trong vòng vẽ, particle <= 60; FPS dưới 28 trong 2 giây thì giảm chi tiết, không giảm nội dung học; canvas theo devicePixelRatio cap ở 2.',

  // Tự dừng khi rời tab.
  autoPause: 'Tự Tạm dừng khi tab ẩn hoặc mất tiêu điểm (visibilitychange, blur): dừng nhận diện, giữ điểm và lượt; quay lại đếm 3-2-1 rồi mới nhận diện, reset cooldown + bộ làm mượt.',

  // An toàn ánh sáng và không gian.
  safety: 'Trước khi chơi nhắc: "Dọn vật cản khỏi vùng đứng, giữ cách tường một bước, chỉ chuyển động trong tầm tay"; không nhảy, không xoay người nhanh. Quá tối hoặc ngược sáng thì gợi ý "Bật đèn hoặc quay lưng về phía cửa sổ" rồi vẫn cho chơi.',

  // Ưu tiên nghe cho game Tiếng Anh.
  listening: 'Ưu tiên nghe: phát audio TRƯỚC khi hiện chữ, mỗi lượt có nút phát lại; sai thì phát lại chậm (0.8x), chỉ hiện chữ sau khi chốt đáp án; từ nghe sai xếp lại ở lượt sau.',

  // Ràng buộc thư viện âm thanh.
  audio: 'Âm thanh tổng hợp bằng Web Audio API (resume AudioContext sau cú bấm đầu), không Tone.js, không file mp3 ngoài.',

  // Giọng đọc cho học liệu Tiếng Anh.
  speechSynthesis: 'Học liệu tiếng Anh đọc bằng window.speechSynthesis giọng en-US hoặc en-GB.',
};
