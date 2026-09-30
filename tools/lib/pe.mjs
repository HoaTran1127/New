// Sáu quy định THỂ DỤC CÓ CẤU TRÚC: khởi động → nhịp → đo cường độ → hạ nhiệt → nước → trần tải trọng.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: vòng 3 đã buộc "động tác >= 50% tầm với", nhưng chưa vòng nào hỏi ba câu của một hoạt động thể dục thật:
// (1) cơ thể được làm nóng trước khi với tay mạnh chưa, (2) cường độ có đo được không hay chỉ là cảm giác "hơi mệt",
// (3) kết thúc thì hạ nhiệt hay dừng đột ngột. Một game 12 lượt cho trẻ đứng với tay liên tục rồi tắt đi
// là rủi ro cơ bắp nguội, không phải bài thể dục — mà mục tiêu của thư viện này là "vận động thể dục vui vẻ + hiểu bài".
//
// Các mốc số lấy theo cấu trúc một tiết thể dục thu nhỏ: làm nóng 60–90 giây cho phiên 2–4 phút,
// nhịp tim tăng dần rồi hạ dần, và trần tải trọng dựa trên những động tác mà y tế trường học cấm (nhảy tiếp đất, xoay nhanh).

export const PE = {
  // Cơ thể nguội mà với tay hết tầm là cách nhanh nhất để một em đau vai và nghỉ luôn môn này.
  warmUp:
    'KHỞI ĐỘNG 60–90 GIÂY trước hiệp 1, không tính điểm và không trừ tim: bốn động tác làm nóng theo thứ tự — đánh nhẹ hai vai 10 nhịp, xoay cổ tay 10 vòng mỗi bên, dang hai tay lên cao rồi hạ 8 nhịp, bước tại chỗ nâng cao đầu gối 15 giây. Có hình que + chữ tiếng Việt + đồng hồ đếm ngược trên HUD; em bấm "Bỏ khởi động" vẫn được, nhưng game ghi lại và màn tổng kết nhắc một dòng nhẹ "Lần sau mình khởi động đủ nhé". Máy bật sẵn chế độ Giảm hiệu ứng thì bản khởi động rút thành cổ tay – cổ chân – hít thở tại chỗ, không bỏ hẳn bước này.',

  // Một lượt phải đủ nhanh để tim còn nhịp, đủ chậm để em kịp đọc đề.
  pace:
    'Nhịp mỗi lượt: thẻ đáp án bay vào trong 3,0–4,5 giây và ở lại tối đa 8 giây kể từ khi hiện hết; giữa hai lượt chừa <= 1,5 giây để em về tư thế; thời gian đọc đề KHÔNG bị rút (riêng thẻ vàng và thẻ thử thách đã có trần 3 giây ở quy tắc sự kiện ngẫu nhiên). Cường độ cả phiên: đạt >= 12 nhịp chuyển động mỗi phút, đếm mỗi lần bàn tay hoặc thân vượt ngưỡng 15% tầm với đã calibration — tính cả nhịp trong khởi động, cả nhịp với tới lẫn nhịp rút về ở 12 lượt, và nhịp hạ nhiệt — chia cho số phút chơi thật; không đếm phỏng đoán.',

  // "Có vận động không" phải là một con số, không phải một lời khen.
  activeShare:
    'Đồng hồ thời gian vận động: tích lũy số giây mà bàn tay hoặc thân học sinh đang di chuyển thật (vượt ngưỡng 15% tầm với đã calibration); màn tổng kết in "Em đã chuyển động X giây trên tổng Y giây của phiên" và yêu cầu tỉ lệ >= 60%. Dưới 60% thì game mời thêm MỘT hiệp phụ 4 lượt nhẹ, không trừ tim, không phạt, không hiện chữ "không đạt".',

  // Kết thúc đột ngột sau khi tim đang nhanh là điểm khác biệt giữa trò chơi và bài thể dục.
  coolDown:
    'HẠ NHIỆT 45–60 GIÂY khi phiên kết thúc (trước màn tổng kết): ba động tác giãn cơ chậm — duỗi tay ngang ngực 15 giây mỗi bên, cúi nhẹ chạm mũi bàn chân 15 giây, kéo vai ra sau 10 nhịp — kèm một nhịp hít thở đếm 4 vào – 4 ra; mascot cùng làm và đồng hồ hiển thị ngay trong khung hình camera. Hạ nhiệt không tính điểm, không trừ tim, không được bỏ qua bằng một nút "Bỏ qua" (chỉ được ngắn lại khi máy bật Giảm hiệu ứng).',

  // Một dòng nhắc, đúng một lần, không pop-up chặn màn.
  water:
    'Nhắc uống nước: khi tổng thời lượng chơi của phiên này từ 6 phút trở lên, hoặc đây là phiên thứ hai liên tiếp trong cùng thẻ học, màn tổng kết hiện đúng MỘT dòng "Mình uống vài ngụm nước rồi hãy chơi tiếp nhé" — không pop-up giữa vòng chơi, không lặp lại nếu em bấm Chơi tiếp, không chặn nút nào.',

  // Những động tác sau đây là thứ y tế trường học không cho phép làm hàng loạt.
  loadCap:
    'Trần tải trọng động: cấm mọi động tác nhảy rồi tiếp đất, cấm xoay thân nhanh quá 90 độ, cấm yêu cầu giữ hai tay trên cao liên tục quá 15 giây, và tối đa 3/12 lượt là động tác cúi thấp. Mất landmark 3 giây hoặc FPS tụt thì game hạ về nhịp chậm + một dòng tiếng Việt nhắc chỉnh tư thế, không được dồn tiếp động tác cho đủ lượt.',
};

// Bản không camera không đo được chuyển động cơ thể: đổi nội dung đo, giữ nguyên cấu trúc buổi tập.
export const PE_NO_CAMERA =
  'Bản không camera vẫn giữ cấu trúc buổi tập: khởi động 60–90 giây và hạ nhiệt 45–60 giây chuyển thành bản tại chỗ nhẹ cho cổ tay – bàn chân – vai + hít thở (vẫn không tính điểm, không trừ tim); hai mục đo bằng camera là "đồng hồ thời gian vận động >= 60%" và ">= 12 nhịp chuyển động mỗi phút" không áp dụng, thay bằng đếm "số lượt em chủ động thao tác trong phiên" (phiên 12 lượt phải đạt đủ 12 lượt thao tác, không tính cú click ngoài lượt); nhịp thẻ 3,0–4,5 giây vào / ở lại <= 8 giây, mục 📷 tay thuận và trần tải trọng vẫn áp dụng nguyên văn.';

// Dòng rút gọn cho checklist và cho block biến thể.
export const PE_SHORT =
  'khởi động 60–90 giây trước hiệp 1 · >= 12 nhịp chuyển động mỗi phút (đếm theo ngưỡng 15% tầm với) · đồng hồ vận động >= 60% thời lượng phiên · hạ nhiệt 45–60 giây · nhắc nước một lần · trần tải trọng (cấm nhảy tiếp đất, xoay nhanh > 90 độ, tay trên cao > 15 giây)';
