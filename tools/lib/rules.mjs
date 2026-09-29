// Các quy định chung áp cho mọi prompt (game + biến thể).
// validate.mjs kiểm đúng các cụm in hoa trong này, nên đổi ở đây phải đổi cả validate.

export const RULES = {
  // Vòng chơi: tỉ lệ thẻ và chống ăn may.
  antiLuck: 'Vật thể đúng và vật thể sai trộn theo tỉ lệ xấp xỉ 60/40 trong mỗi lượt; chạm vào vật SAI trừ tim ngay và cắt chuỗi đúng, còn BỎ LỠ vật ĐÚNG chỉ cắt chuỗi đúng chứ không trừ tim — vung tay bừa không thắng được, đứng chờ cũng không bị phạt oan.',

  // Calibration động theo cơ thể học sinh.
  calibration: 'Calibration 3 giây ở tư thế trung tính: đo bề rộng hai vai, khoảng cách cổ tay trái–phải và tầm với xa nhất, suy ra đơn vị chuẩn của phiên chơi rồi đặt MỌI ngưỡng (tốc độ vung, góc, bán kính chấm chọn) theo đơn vị đó, không dùng hằng số pixel cố định. Tầm đo bất thường thì nhắc chỉnh khoảng cách và đo lại. Có nút "Chỉnh lại tư thế" hiệu chỉnh lại không tải trang, không mất điểm và lượt.',

  // Ngân sách hiệu năng cho máy phổ thông.
  perf: 'Ngân sách hiệu năng: mục tiêu 30 FPS trên laptop trường học. Chạy nhận diện bằng requestVideoFrameCallback hoặc 1 lần mỗi 2–3 khung hình, render chạy riêng theo requestAnimationFrame; tái dùng pool cho particle và vệt hiệu ứng, không cấp phát object mới trong vòng vẽ, giới hạn particle <= 60; FPS trung bình dưới 28 trong 2 giây thì tự giảm chi tiết (bớt hạt, tắt đường tốc độ, nhận diện thưa hơn) chứ không giảm nội dung học tập; canvas theo devicePixelRatio nhưng cap ở 2 và tính lại khi đổi cỡ cửa sổ.',

  // Tự dừng khi rời tab.
  autoPause: 'Tự động Tạm dừng khi tab bị ẩn hoặc cửa sổ mất tiêu điểm (document.visibilitychange, window.blur): dừng vòng nhận diện, giữ nguyên điểm và lượt; khi quay lại đếm 3-2-1 rồi mới nhận diện tiếp và reset cooldown + bộ làm mượt để một cú vung tay dở dang không thành nhát chém.',

  // An toàn ánh sáng và không gian.
  safety: 'Trước khi chơi, một dòng nhắc tiếng Việt: "Dọn vật cản khỏi vùng đứng, giữ cách tường một bước, chỉ chuyển động trong tầm tay"; không có động tác nhảy, xoay người nhanh hay rời khỏi chỗ. Khung hình quá tối hoặc ngược sáng thì gợi ý "Bật đèn lên hoặc quay lưng về phía cửa sổ để camera nhìn rõ em hơn" rồi vẫn cho chơi tiếp.',

  // Màn tổng kết ba thẻ ngắn cho trẻ.
  summary: 'Màn tổng kết gồm ba thẻ chữ to đọc xong trong 5 giây: "Làm tốt: ..." (tối đa 2 kỹ năng đúng nhiều nhất), "Cần luyện: ..." (loiViet của nhóm lỗi nhiều nhất), "Động tác lần sau: ..." (một câu nhắc tư thế/cử chỉ). Kèm số câu đúng/sai theo mức độ, không so sánh với bạn khác.',

  // Ưu tiên nghe cho game Tiếng Anh.
  listening: 'Ưu tiên nghe: phát audio TRƯỚC khi hiện chữ, mỗi lượt có nút phát lại; trả lời sai thì phát lại chậm hơn (0.8x) và chỉ hiện chữ sau khi học sinh đã chốt đáp án; từ bị nghe sai được xếp lại ở lượt sau trong cùng phiên.',

  // Ràng buộc thư viện âm thanh.
  audio: 'Âm thanh tổng hợp bằng Web Audio API (resume AudioContext sau cú bấm đầu tiên), không dùng Tone.js, không dùng file mp3 ngoài.',

  // Giọng đọc cho học liệu Tiếng Anh.
  speechSynthesis: 'Học liệu tiếng Anh đọc bằng window.speechSynthesis giọng en-US hoặc en-GB.',
};
