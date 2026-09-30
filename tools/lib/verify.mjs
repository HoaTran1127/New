// Tự kiểm ngân hàng câu hỏi + độ khó thích ứng, áp cho mọi prompt (game + biến thể + legacy).
// validate.mjs so khớp nguyên văn các chuỗi này; đổi ở đây phải chạy lại node tools/build.mjs.
// Lý do: mô hình sinh 40–60 mục chắc chắn có mục sai (hai đáp án cùng đúng, số vượt phạm vi),
// và độ khó gắn theo vị trí lượt làm trẻ yếu nản, trẻ giỏi chán. Cả hai sửa bằng code chạy trong HTML.
export const VERIFY = {
  // 5 luật cũ (selfCheck, distractorValid, rangeGuard, noGuessable, difficultySteps) gộp làm một.
  bank:
    'Viết verifyQuestionBank() chạy MỘT LẦN lúc nạp, trước vòng đầu, kiểm từng mục: answer có trong choices đúng một lần, không hai phương án trùng; explanation, errorTag, loiViet khác rỗng, errorTag thuộc danh sách khai báo; không trùng prompt; phương án nhiễu mô phỏng một lỗi thật (cấm số vô nghĩa, cấm nhiễu cũng đúng theo cách hiểu hợp lý); số trong phạm vi SGK (lớp 4: tự nhiên đến 100.000, mẫu phân số khác 0; lớp 5: thập phân tối đa 3 chữ số sau dấu phẩy, phần trăm 0–150), không chia cho 0, kết quả hữu hạn; Tiếng Anh chỉ dùng từ trong word list; đáp án đúng không là lớn nhất/nhỏ nhất hay dài nhất ở quá 20% số mục, vị trí đúng phân bố 1/3 ± 10%; level = số bước (1 / 2 / ≥ 3), mỗi level ≥ 1/4 số mục. Mục trượt thì loại khỏi vòng chơi và console.warn id + lý do tiếng Việt; thiếu mục thì chỉ báo ở màn giáo viên.',
};
export const ADAPT = {
  // 3 luật cũ (levelShift, failFloor, hiddenLevel) gộp làm một.
  level:
    'Độ khó theo năng lực, không theo vị trí lượt: 2 câu đúng liên tiếp lên một level (trần 3); 2 câu sai liên tiếp xuống một level, cùng errorTag câu vừa sai. Sàn chống nản: không để sai quá 3 câu liên tiếp, câu thứ tư là level 1 cùng errorTag kèm lời giải từng bước; chọn lại đúng không trừ tim lần hai, tổng kết ghi "em đã sửa được". Lượt 5 và 9 chỉ là mốc nhịp. Level ẩn: không hiện chữ level/trình độ; chỉ màn tổng kết giáo viên có phân bố và tỉ lệ đúng theo level.',
};
