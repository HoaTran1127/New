// Tám quy định tự kiểm chứng ngân hàng câu hỏi + độ khó thích ứng, áp cho mọi prompt (game + biến thể + legacy).
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: hai lỗi làm hỏng một game giáo dục mà không ai nhìn thấy khi test.
// Một là mô hình sinh 40–60 mục và chắc chắn vài mục sai — hai phương án cùng đúng, một phương án nhiễu
// tình cờ hợp lý, hoặc một số vượt ra ngoài chương trình. Không có cơ chế kiểm thì game âm thầm dạy sai.
// Hai là độ khó gắn theo VỊ TRÍ lượt chơi: trẻ yếu trượt liên tiếp rồi tắt game, trẻ giỏi thấy quá dễ.
// Cả hai đều sửa được bằng ràng buộc mà chính engine chạy được trong file HTML.

export const VERIFY = {
  // Engine phải tự kiểm đề của nó ngay khi nạp, không chờ người lớn đọc lại 60 mục.
  selfCheck:
    'Tự kiểm chứng khi nạp: viết hàm verifyQuestionBank() chạy MỘT LẦN trước vòng chơi đầu tiên và kiểm từng mục — answer phải có trong choices và chỉ xuất hiện đúng một lần (không có hai phương án trùng chữ); explanation, errorTag, loiViet phải khác rỗng; errorTag phải thuộc đúng danh sách đã khai báo; không hai mục nào trùng prompt (so sau khi bỏ khoảng thường và chữ thường); level chỉ nhận 1, 2 hoặc 3 và mỗi level phải chiếm tối thiểu 1/4 số mục. Mục nào trượt thì LOẠI KHỎI vòng chơi (không hiển thị) và ghi console.warn kèm id + lý do bằng tiếng Việt; số mục còn lại dưới ngưỡng thì hiện một dòng cảnh báo ở màn chỉ giáo viên thấy, không hiện cho học sinh.',

  // Phương án nhiễu phải sai theo MỘT LỖI THẬT, không được tình cờ đúng.
  distractorValid:
    'Mỗi phương án nhiễu là một lỗi thật: mọi phương án sai phải mô phỏng đúng một lỗi trong danh sách lỗi ở mục 1 (quên nhớ khi trừ, quên chia đôi khi tính diện tích tam giác, đếm sai chữ số sau dấu phẩy…), cấm giá trị ngẫu nhiên vô nghĩa như "3 + 2 = 99". Trước khi chốt một mục, thử từng phương án nhiễu bằng câu hỏi: "nói theo cách hiểu hợp lý nào đó thì phương án này có đúng không?" — nếu có thì phải thay phương án khác, vì hai đáp án cùng đúng khiến lời giải thành vô nghĩa. Không được để độ dài ký tự hay định dạng của phương án đúng nổi bật hơn các phương án còn lại.',

  // Số và từ phải nằm trong phạm vi đã cam đoan với giáo viên.
  rangeGuard:
    'Guard phạm vi kiến thức: mọi số trong đề Toán nằm trong phạm vi SGK đã khai báo ở mục 1 (lớp 4: số tự nhiên đến 100.000 và phân số có tử số, mẫu số là số tự nhiên khác 0; lớp 5: số thập phân tối đa 3 chữ số sau dấu phẩy, tỉ số phần trăm từ 0 đến 150); không có số âm ngoài phạm vi đã học, không có phép chia cho 0, kết quả phải hữu hạn và so sánh được chính xác bằng số học trong file (nếu bài ra dẫn đến số thập phân vô hạn thì đổi số khác). Với game Tiếng Anh, mọi từ trong prompt và choices phải lấy từ word list đã khai báo. Viết các ràng buộc này thành điều kiện kiểm thật trong verifyQuestionBank, không chỉ ghi trong comment.',

  // Trẻ ăn may bằng cấu trúc đáp án, không chỉ bằng cách vung tay bừa.
  noGuessable:
    'Chống đoán mò bằng cấu trúc: đáp án đúng không được là số lớn nhất hoặc nhỏ nhất trong các phương án ở quá 20% số mục, không được là phương án dài nhất ở quá 20%, và không được lặp lại nguyên văn một cụm từ hiếm xuất hiện trong đề bài (trẻ học được mẹo "chọn cái giống câu hỏi"). Vị trí đáp án đúng phải phân bố đều: mỗi vị trí xuất hiện trong 1/3 số mục ± 10%, kiểm bằng chính hàm seed đã dùng để xáo — đây là con số đếm được bằng code, không phải cảm giác.',

  // Nhãn level phải phản ánh số bước thật, không phải số trang trí.
  difficultySteps:
    'Level phải khớp số bước thật: level 1 giải được trong MỘT phép tính một bước; level 2 cần HAI bước (ví dụ đổi đơn vị rồi mới tính, hoặc tìm thành phần chưa biết); level 3 cần BA bước trở lên hoặc hai lần đổi đơn vị. Không được dán nhãn level 3 cho một phép tính một bước chỉ để đủ số mục mỗi level; nếu không nghĩ ra bước thứ ba thì để level 2.',
};

export const ADAPT = {
  // Độ khó đi theo năng lực trong phiên, không theo vị trí lượt chơi.
  levelShift:
    'Thích ứng trong phiên: engine ghi chuỗi đúng/sai liên tiếp của từng level. Hai câu ĐÚNG liên tiếp thì câu kế tiếp lấy ở level cao hơn một bậc (trần là level 3, ưu tiên cùng cụm kiến thức); hai câu SAI liên tiếp thì câu kế tiếp xuống một bậc và BẮT BUỘC cùng errorTag với câu vừa sai, để em sửa đúng chỗ yếu chứ không gặp chủ đề lạ. Không dùng hằng số "độ khó tăng ở lượt 5 và lượt 9" làm thang level nữa; lượt 5 và lượt 9 chỉ còn là mốc nhịp (thêm bước trung gian, rút thời gian hiển thị hạt) và không được rút thời gian đọc đề.',

  // Trần bảo vệ: một trẻ không được phép trượt 4 câu liên tiếp.
  failFloor:
    'Sàn chống nản: tuyệt đối không để học sinh sai quá 3 câu LIÊN TIẾP. Câu thứ tư bắt buộc là level 1 cùng errorTag, và trước khi cho chọn lại phải hiện lời giải TỪNG BƯỚC — mỗi bước một dòng, đúng dạng bài (cột dọc / sơ đồ đoạn thẳng / lưới ô / trục số). Chọn lại đúng thì không trừ tim lần hai và không tính là câu sai mới, chỉ không được cộng chuỗi; màn tổng kết ghi rõ "em đã sửa được" cho câu đó.',

  // Level là thông tin cho giáo viên, không phải nhãn hạng cho trẻ.
  hiddenLevel:
    'Level ẩn với học sinh: trên giao diện người chơi không xuất hiện chữ "level", "trình độ", số sao xếp hạng hay thanh tiến độ so với bạn; trẻ chỉ thấy nhiệm vụ tiếp theo. Chuỗi thích ứng chạy im lặng phía sau. Màn tổng kết dành cho giáo viên mới liệt kê phân bố số câu theo level và tỉ lệ đúng ở từng level, kèm dòng "Độ khó đang ở: ..." bằng tiếng Việt.',
};

// Dòng rút gọn cho checklist tự kiểm và block biến thể.
export const VERIFY_SHORT =
  'verifyQuestionBank() chạy lúc nạp và loại mục lỗi · mọi phương án nhiễu sai theo một lỗi thật · số và từ trong phạm vi SGK đã khai báo · đáp án đúng không đoán được bằng mẹo hình thức, vị trí phân bố đều 1/3 ± 10% · level khớp số bước thật';
export const ADAPT_SHORT =
  '2 đúng lên level / 2 sai xuống level cùng errorTag · không cho sai quá 3 câu liên tiếp, câu 4 là level 1 kèm lời giải từng bước · level ẩn với học sinh, chỉ hiện ở tổng kết cho giáo viên';
