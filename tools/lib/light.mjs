// Sáu quy định NHẸ ĐẦU — giữ môn Toán ở mức "hình dung được", để phần cứng đầu còn lại cho vui và vận động.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: qua chín vòng cộng quy định, bảng kiểm ngày một dài còn phần "làm bài toán" ngày một nặng.
// Điều tra 85 prompt cho thấy hợp đồng sinh đề buộc model viết câu "hai bước" rồi "ba bước trở lên hoặc hai
// lần đổi đơn vị", mọi điểm số gắn vào đáp án đúng (+10 nhân chuỗi), và không một quy định nào chặn số từ của
// đề hay số phép tính trong một lượt. Kết quả đúng như ca bệnh: học sinh cắm đầu tính nhẩm, cả thế giới AR,
// mascot, combo và bài thể dục phía sau trở thành phông nền của một bài kiểm tra có webcam.
// Lớp này không bỏ quy định học tập — nó chuyển gánh nặng từ "đầu tính" sang "mắt nhìn và người vận động",
// và biến nó thành con số kiểm được bằng code: tỉ lệ đề nhìn, số dấu phép tính, số từ, tỉ lệ điểm.

export const LIGHT = {
  // Gốc của bệnh nặng đầu: một lượt đòi nhiều phép tính.
  oneThought:
    'Một lượt một thao tác tư duy: mỗi lượt chỉ đòi MỘT phép tính hoặc MỘT lần nhận biết, không phải một bài toán. Đề có \`dang: "tinh"\` phải chứa tối đa MỘT dấu phép tính in ra trong \`prompt\` — \`verifyQuestionBank()\` đếm dấu phép tính nằm giữa hai khoảng trắng (+ − × :) — dấu gạch chéo trong phân số như 18/24 và dấu hai chấm sau nhãn "Giai đoạn 1:" và loại mục có từ hai dấu; tuyệt đối không ra đề kiểu "tính rồi so sánh", "rút về rồi quy đồng". Nếu kỹ năng SGK thật sự cần nhiều bước thì engine tự dựng sẵn các bước trước (cột dọc đã viết xong một dòng, sơ đồ đoạn thẳng đã chia sẵn ô, đơn vị đã đổi sẵn ở dòng trên), học sinh chỉ làm bước cuối bằng mắt.',

  // Phần lớn câu hỏi phải là nhìn–chỉ–chọn, không phải tính.
  visualShare:
    'Toán là hình dung, không phải tính nhẩm: mọi mục QUESTION_DATA có khóa \`dang\` nhận đúng một trong hai giá trị — \`"nhin"\` (nhìn rồi chọn: so độ dài, nhận dạng hình, ước lượng bằng mắt, đếm ô, đọc sơ đồ đoạn thẳng / biểu đồ / tia số / đồng hồ, tìm cặp bằng nhau, ghép hình, chọn số trên trục) hoặc \`"tinh"\` (MỘT phép tính một bước với số trong phạm vi SGK). \`verifyQuestionBank()\` đếm trên số mục đang phát hành: \`"nhin"\` phải đạt >= 60%; dưới ngưỡng thì bảng kiểm ghi CHƯA ĐẠT kèm tỉ lệ thật và lý do "ngân hàng quá nặng tính nhẩm", game vẫn chơi được nhưng không đạt chuẩn MiTi.',

  // Đề dài là thời gian học sinh phải ngồi giải mã câu chữ, thay vì nhìn và vận động.
  shortPrompt:
    'Đề ngắn tới mức nghe một lần là hiểu: \`prompt\` tối đa 16 từ (đếm theo khoảng trắng sau khi bỏ dấu câu; game Tiếng Anh chỉ đếm phần tiếng Việt, học liệu tiếng Anh không quá 3 từ), một mệnh đề duy nhất, có bao nhiêu số thì lấy bấy nhiêu, cấm mệnh đề phụ nối bằng "sau đó", "rồi", "biết rằng". Đề nào đọc hai lần mới hiểu thì viết lại hoặc bỏ. Mỗi lượt đọc to đề một lần bằng window.speechSynthesis (giọng vi-VN; phần tiếng Anh của game Tiếng Anh đọc giọng en-US) kèm nút "Nghe lại đề", để em đọc chậm vẫn theo kịp lớp mà không phải nhìn chữ lâu.',

  // Điểm phải trả cho động tác trước, đáp án sau.
  motionScores:
    'Thưởng đến từ động tác: một lượt có tối đa +9, chia thành +6 cho ĐỘNG TÁC (cả cánh tay hoặc thân người đi hết >= 50% tầm với đã calibration rồi chạm vào một vùng đích hợp lệ) và +3 cho ĐÁP ÁN ĐÚNG; chuỗi đúng, thẻ vàng và hiệp 3 nhân trên tổng đó, không chỉ nhân phần đáp án. Chạm vùng sai vẫn trừ tim đúng quy định chống ăn may. Particle, hit-stop và chữ khen nổ ngay tại điểm chạm TRƯỚC khi máy kịp biết đúng hay sai — chỉ âm thanh và màu khác nhau — để em thấy cú với tay của mình có sức mạnh thật, kể cả khi chọn sai. Không cộng điểm nào cho tốc độ đọc đề hay tốc độ tính.',

  // Đồng hồ là kẻ thù của đứa trẻ đang nghĩ.
  noRush:
    'Không có đồng hồ nào đuổi theo câu hỏi: thẻ đáp án nằm im tới khi em chốt, câu hỏi không hết giờ. Đồng hồ đếm ngược chỉ được xuất hiện ở khởi động, hạ nhiệt, trạm nghỉ, nghi thức mở thưởng và các mini-trạm vận động. Em đứng im 15 giây thì mascot tự làm mẫu hướng động tác và đọc lại đề một lần — không trừ tim, không tự sang câu, không tiếng báo lỗi. Mọi quy định "rút thời gian hiển thị" ở lượt 5, lượt 9 và hiệp 2–3 chỉ áp dụng cho thời gian BAY của thẻ, cấm động vào thời gian đọc đề.',

  // Chỗ trống duy nhất trong nhịp đã có: biến nó thành chỗ để hét lên.
  playStation:
    'Nghỉ cũng là chơi: trạm nghỉ 5 giây giữa hai hiệp không phải màn đếm ngược trống mà là một mini-trạm vận động KHÔNG hỏi bài — đập 3 bong bóng nổi trong khung hình, giữ thăng bằng hai tay 5 giây, lắc vai theo nhịp. Không tính đáp án, không trừ tim, không hiện lời giải, không tính vào 12 lượt hỏi bài và không đổi level thích ứng; hoàn thành thì +5 điểm động tác kèm một hiệu ứng lớn. Đây là chỗ trẻ được hét lên, và là lý do em quên rằng mình vừa học.',
};

// Dòng rút gọn cho chuỗi tự kiểm của prompt, block biến thể và legacy.
export const LIGHT_SHORT =
  'một lượt một thao tác tư duy (đề \`tinh\` <= 1 dấu phép tính) · >= 60% mục là \`dang: "nhin"\` nhìn–chỉ–chọn · đề <= 16 từ và đọc to bằng speechSynthesis · +6 động tác / +3 đáp án, FX nổ tại điểm chạm trước khi biết đúng sai · không đồng hồ đếm ngược trên câu hỏi · trạm nghỉ 5 giây là mini-trạm chơi không hỏi bài';
