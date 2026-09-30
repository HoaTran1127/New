// Sáu quy định NHỚ BÀI LÂU (retention) — tầng biến "hiểu bài" thành "vẫn còn hiểu bài sau một tuần".
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: vòng 3 buộc động tác to, vòng 5 cho game tự nghiệm thu, vòng 6 biến phiên chơi thành bài thể dục.
// Nhưng mục tiêu đề ra là "vận động thể dục vui vẻ CŨNG HIỂU BÀI NHỚ BÀI" thì phần "nhớ" vẫn chỉ có một chữ
// "lặp lại cách quãng" nằm trong ngoặc của CLASSROOM.mastery — không mốc thời gian, không bộ đếm, không gì kiểm được.
// Một game như thế dạy rất vui trong 5 phút và trả lại kiến thức cho cô giáo sau 3 ngày.
//
// Các mốc +1/+3/+7/+21 ngày lấy theo đường cong quên quen dùng trong tài liệu sư phạm phổ thông
// (ôn lại ngay trước lúc quên, mỗi lần nhớ được thì giãn ra), và mọi con số đều đếm được bằng code trong một file HTML.

export const RETENTION = {
  // "Cách quãng" phải là ngày cụ thể, không phải một tính từ.
  spacedQueue:
    'Lịch ôn có mốc ngày: khi một errorTag được sửa đúng 2 lần liên tiếp, xếp lịch ôn lại vào ba mốc +1 ngày, +3 ngày, +7 ngày (tính theo ngày của máy); lần ôn nào cũng đúng thì giãn mốc tiếp theo thành +21 ngày. Đầu mỗi phiên, đọc lịch trong localStorage key "miti-review" (chỉ { id, due } — không tên học sinh, không ảnh, không video) và đưa các mục ĐÃ ĐẾN HẠN vào tối đa 4/12 lượt của phiên này, ưu tiên hơn câu mới; mục chưa đến hạn không được xen vào. localStorage bị chặn thì game bỏ hẳn phần lịch và vẫn chơi trọn 12 lượt.',

  // Học xen kẽ cụm khó nhớ hơn học dồn một cụm, nhưng không được đổi thứ tự trong một cụm.
  interleave:
    'Xen cụm kiến thức: trong 12 lượt chính phải có >= 3 lượt thuộc cụm KHÁC cụm chính của game (lấy từ hồ sơ "miti-mastery" hoặc từ QUESTION_DATA cùng khối ở level thấp hơn), đặt xen kẽ chứ không dồn cuối phiên. Mục tiêu là nhớ lâu, không phải thuộc lòng 12 câu cùng một dạng. Trong một cụm vẫn giữ đúng thứ tự từ dễ đến khó, không đảo bước.',

  // Lấy kiến thức ra khỏi trí nhớ trước khi dạy lại — đây là phép đo, không phải phần thưởng.
  recallPrimer:
    'Câu mở màn "Em còn nhớ không?": TRƯỚC lượt chính thứ nhất, chiếu lại 10 giây một câu em đã làm đúng ở phiên trước (lấy theo lịch ôn đến hạn, không gợi ý, không hiện đáp án), em trả lời bằng đúng cơ chế điều khiển đang dùng hoặc bằng chuột. Đúng thì mascot reo và mục đó được giãn sang mốc kế tiếp; sai thì KHÔNG trừ tim, KHÔNG tính là câu sai mới, chỉ xếp mục đó vào lượt 3 của phiên này kèm lời giải từng bước. Phiên đầu tiên trên máy (không có hồ sơ) thì bỏ qua bước này, không báo lỗi.',

  // Tự giải thích là cơ chế giúp nhớ; nhưng chỉ ở vài lượt để không phá nhịp thể dục.
  explainBack:
    'Hỏi lại "Vì sao đúng?": ở đúng 4/12 lượt (một lượt mỗi hiệp và mọi lượt ôn), NGAY sau cú chốt đúng, hiện một câu "Vì sao em chọn câu trả lời này?" với 3 phương án ngắn trong tối đa 5 giây, chọn bằng cơ chế đang dùng hoặc chuột. Chọn đúng thì cộng chuỗi; chọn sai KHÔNG trừ tim và hiện lại một dòng lời giải. Câu này không tính vào 12 lượt, không rút thời gian đọc đề của lượt kế tiếp, và bản Giảm hiệu ứng hoặc bản không camera được bỏ bằng một nút "Thôi" mà không penalty.',

  // Đo trí nhớ thì không được phạt như đo kỹ năng — nếu phạt, trẻ sẽ học cách không chơi again.
  forgettingGuard:
    'Quên là chuyện bình thường: một mục từng đúng >= 2 lần mà sai khi ôn lại thì KHÔNG trừ tim, KHÔNG cắt chuỗi đúng, chỉ hạ lịch ôn về mốc ngắn nhất (+1 ngày) và ghi một dòng vào hồ sơ. Màn tổng kết thay vì điểm số phải hiện hai nhóm "Hôm nay em vẫn nhớ: ..." (tối đa 3 id đã ôn đúng) và "Cần ôn lại: ..." (tối đa 3 id đến hạn nhưng sai), kèm đúng một câu động viên có nội dung cụ thể, không phải chữ "Cố lên".',

  // Giáo viên cần một tờ rời, không cần một hệ thống quản lý học tập.
  teacherNote:
    'Tờ rời cho giáo viên: màn tổng kết có nút "Copy tờ rời" sinh một khối chữ tiếng Việt copy được, gồm tên game, ba errorTag yếu nhất, số ngày từ lần chơi gần nhất, lịch ôn sắp tới (ngày + số câu), một đề xuất hành động cụ thể kiểu "trước ngày 7/10 cho em ôn lại 3 lỗi thiếu mượn bằng 5 phút tại chỗ", và số động tác + phút vận động của phiên. Tờ rời chỉ hiện trên màn hình và vào clipboard máy đó, không gửi lên máy chủ nào, không chứa tên hay hình ảnh học sinh — dùng chung nguyên tắc riêng tư với bản nghiệm thu.',
};

// Dòng rút gọn cho checklist, block biến thể và chuỗi tự kiểm.
export const RETENTION_SHORT =
  'lịch ôn +1/+3/+7 ngày (giãn +21 khi nhớ vững) trong "miti-review" · >= 3/12 lượt xen cụm khác · 10 giây "Em còn nhớ không?" trước lượt 1 · "Vì sao đúng?" ở 4/12 lượt, không trừ tim · quên không phạt, tổng kết chia "vẫn nhớ / cần ôn lại" · tờ rời giáo viên copy được';
