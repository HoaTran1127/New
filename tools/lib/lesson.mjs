// Sáu quy định "tiết học 45 phút + gắng sức thật" — tầng thứ mười sáu của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm từ khóa trong prompts/0X-*/):
//   "8–10 phút" = 0/85   "45 phút" = 0/85   "gắng sức" = 0/85   "đổ mồ hôi" = 0/85
//   "thở gấp" = 0/85   "hồi nhịp" = 0/85   "phiên <n> phút" = 0/85
// pe.mjs quản lý KHÔNG GIAN của một hoạt động thể dục (khởi động, biên độ, trạm nghỉ, hạ nhiệt, trần tải
// trọng) nhưng không tầng nào quản lý THỜI LƯỢNG một phiên và ĐỘ MỆT THẬT của em. Hai hệ quả đo được ở lớp:
// (1) một nhóm chơi say sưa 20 phút thì ba nhóm còn lại hết tiết chưa tới lượt — vòng 15 đã chia ĐỦ lượt
// giữa bốn em nhưng chưa chia THỜI GIAN; (2) "đồng hồ vận động >= 60% thời lượng phiên" chỉ đếm số lần đưa
// tay, nên không phân biệt bài vừa sức với bài quá sức — một bài thể dục đúng chuẩn phải có cả hai số.
//
// validate.mjs so khớp nguyên văn từng chuỗi ở dưới, nên sửa số ở đây là sửa ở 85 prompt,
// 425 block biến thể, 12 prompt legacy và bảng kiểm nghiệm thu cùng một lúc.

export const LESSON = {
  // Trần thời lượng một phiên — điều kiện để bốn nhóm cùng được chơi trong một tiết.
  sessionCap:
    'Một phiên chơi dài 8–10 phút và tự khép lại ở phút thứ 10: HUD có đồng hồ phiên "Còn <n> phút" (chữ >= 20px, không nhấp nháy, không đổi màu đỏ) chạy từ lúc bấm KHỞI ĐỘNG; 60–90 giây khởi động + 12 lượt chính + 45–60 giây hạ nhiệt phải nằm trọn trong trần đó. Phút thứ 10 rơi vào đâu thì game khép lại ở RANH GIỚI lượt kế tiếp chứ không cắt giữa lượt đang chơi, màn tổng kết tự hiện, không bắt em bấm "Kết thúc". Trần này chỉ tính cả phiên — từng thẻ câu hỏi vẫn KHÔNG có đồng hồ đếm ngược (đã cấm ở tầng nhẹ đầu).',

  // Thời lượng phải khớp phép tính của một tiết 45 phút, không phải một lời hứa.
  rotationFit:
    'Một tiết 45 phút phải chia được cho số nhóm: màn tổng kết in một dòng "Kế hoạch tiết 45 phút: <n> phiên × <n> phút + <n> phút đổi nhóm + 5 phút chốt tờ rời" tính từ thời lượng phiên thật vừa chơi, và giáo viên thấy ngay nếu bốn nhóm không vừa — khi đó dòng đó ghi thẳng "tiết này chỉ đủ 3 nhóm chơi, nhóm còn lại ôn bằng tờ rời", không để thầy cô tự tính lại. Nút "Kết phiên" cho giáo viên bấm bất cứ lúc nào: game đóng ngay ở ranh giới lượt kế tiếp, không trừ tim, không hỏi lý do, không tính là em bỏ dở.',

  // Độ gắng sức tự giác — con số duy nhất đo "mệt thật" mà không cần cảm biến.
  rpe:
    'Cuối MỖI hiệp, em tự báo gắng sức trên bốn mức: "dễ quá" · "vừa" · "mệt" · "kiệt" (bốn mức tương ứng 1–4), một hàng bốn nút >= 56px, chọn bằng cái chỉ tay hoặc chạm; không mức nào bị coi là sai, không trừ tim, không đổi điểm. Kết quả ghi vào localStorage "miti-effort" theo từng hiệp và đọc lại được ở phiên sau; màn tổng kết in "Gắng sức: hiệp 1 <mức> · hiệp 2 <mức> · hiệp 3 <mức>" trong khối mà nút "Copy tờ rời" copy được. Bản tắt tiếng và bản reduced-motion vẫn có đủ bốn mức bằng chữ và hình.',

  // Hồi nhịp giữa hiệp — chỗ thể dục thật khác chỗ game đứng với tay.
  recovery:
    'Giữa các hiệp có 15 giây "hồi nhịp": mascot hướng dẫn hít vào 4 nhịp – thở ra 6 nhịp theo vạch nhịp (không phải im lặng đứng chờ), HUD hiện "Nhịp của em: còn nhanh / vừa phải / chậm rồi" suy từ số động tác mỗi phút của 30 giây vừa qua, kèm ghi chú "ước lượng từ chuyển động, không phải đo mạch". Hiệp sau chỉ bắt đầu sau khi hồi nhịp xong; `prefers-reduced-motion` thì rút còn 10 giây đếm chữ, vẫn đủ 12 lượt chính.',

  // Bằng chứng cho giáo viên và gia đình: một phiên là một hoạt động thể dục có số, không phải "chơi vui".
  lessonSheet:
    'Màn tổng kết có khối "Bản tiết học" gồm đúng bốn dòng: "Phiên vừa chơi: <n> phút · vận động <n>%" (lấy từ đồng hồ phiên và đồng hồ vận động đang có), "Gắng sức: hiệp 1 <mức> · hiệp 2 <mức> · hiệp 3 <mức>", "Kế hoạch tiết 45 phút: <n> phiên × <n> phút", "Bốn em hôm nay: <tên> <n> động tác, <tên> <n> nhịp cổ vũ". Toàn bộ bốn dòng nằm trong khối chữ mà nút "Copy tờ rời" copy được; không dòng nào được bịa số — dòng nào thiếu dữ liệu thật thì in "chưa ghi được" thay vì đoán.',

  // Nghiệm thu: thời lượng và gắng sức có thật hay chỉ là chữ trên màn hình.
  guard:
    '`verifyLesson()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — đồng hồ phiên có thật và phiên tự khép ở phút thứ 10 tại ranh giới lượt · bốn mức gắng sức xuất hiện cuối mỗi hiệp và ghi đọc lại được từ "miti-effort" · 15 giây hồi nhịp chạy giữa các hiệp trước khi hiệp sau bắt đầu · khối "Bản tiết học" in đủ bốn dòng lấy từ số thật. Thiếu điều nào thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản không camera (điều khiển bằng chuột/chạm) vẫn bắt buộc đủ bốn điều trên, vì đồng hồ phiên và gắng sức không phụ thuộc camera.',
};

// Dòng rút gọn cho chuỗi "Tự kiểm tra trước khi xuất" của prompt và block biến thể.
export const LESSON_SHORT =
  'phiên 8–10 phút có đồng hồ "Còn <n> phút" và tự khép ở phút thứ 10 tại ranh giới lượt · dòng "Kế hoạch tiết 45 phút" in từ số thật, nút "Kết phiên" không trừ tim · bốn mức gắng sức (dễ quá / vừa / mệt / kiệt) >= 56px cuối mỗi hiệp ghi "miti-effort" · 15 giây hồi nhịp hít 4 nhịp – thở ra 6 nhịp giữa các hiệp · khối "Bản tiết học" bốn dòng copy được · verifyLesson() kiểm lúc nạp';
