// Bảng việc NGƯỜI THỬ bấm tay — nguồn duy nhất cho prompts/CHECKLIST_NGHIEP_THU.md.
// Dành cho người lớn thử game trước khi đưa vào lớp; KHÔNG chèn vào prompt gửi Gemini.
// Mỗi mục là một câu hỏi tiếng Việt, làm theo đúng thứ tự, khoảng 15 phút.
export const HUMAN_CHECKS = [
  'đứng xa camera tới mức chỉ còn thấy hai bàn tay — game có hạ xuống mức "chỉ thấy tay" hay đứng màn chờ?',
  'giữ im một tư thế 5 giây — có bị spam cú chốt hay trừ tim không?',
  'lấy tay che nửa người — vật neo có biến mất kèm hướng dẫn tiếng Việt thay vì nhảy lung tung?',
  'tắt camera giữa ván — game có chuyển sang chơi không camera mà không mất điểm và lượt?',
  'rút mạng lúc đang tải model — có thông báo tiếng Việt và chơi tiếp được?',
  'cố tình sai 4 câu liên tiếp — câu thứ 4 có về mức dễ kèm lời giải từng bước?',
  'mở bằng điện thoại đặt dọc — đề bài còn >= 20px và hai tay còn trong khung hình?',
  'đưa cho một học sinh chưa đọc hướng dẫn chơi thử 60 giây — em có tự hiểu phải làm gì?',
  'chơi trọn một phiên rồi đứng lại 30 giây — em có thở nhanh hơn và người ấm lên rõ rệt?',
  'chơi 2 người — mỗi em có làn riêng, bảng điểm cập nhật trực tiếp và cuối ván có người thắng kèm danh hiệu cho cả hai?',
  'chơi 3 người — động tác của em này có bị tính nhầm cho em bên cạnh không, và cả ba đều được nhận diện suốt ván?',
  'cố tình để hai em bằng điểm cuối ván — game có xử lý đồng điểm công bằng và nói rõ kết quả?',
  'chơi game tay 3 người trên máy yếu — khi nhận diện kém game có tự chuyển sang chơi bằng cổ tay, hiện thông báo ngắn và giữ nguyên điểm?',
  'bật công tắc "Giảm hiệu ứng" — hoạt họa và nhấp nháy có dịu hẳn đi mà nội dung học và điểm vẫn nguyên?',
];
