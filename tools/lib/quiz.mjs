// Sáu quy định "đố bạn" — em đặt đề cho bạn trả lời bằng động tác, tầng thứ hai mươi ba.
//
// Khảo sát 85 prompt trước khi viết file này (đếm chuỗi NFC trong prompts/0X-*/ + tools/lib/ + 4 tài liệu):
// "đố bạn" 0/85 · "người đố" 0/85 · "em ra đề" 0/85 · "tự đặt đề" 0/85 · "hoàn thành câu" 0/85
// · "em đọc to" 0/85 · "mic/micro" 3/85 (đúng ba game mã VOICE). Chiều ngược: "ngân hàng câu hỏi" 85/85 và
// "đề bài hiện" 85/85 — nghĩa là trong mọi game, đề luôn do máy đưa ra, em chỉ là người trả lời.
//
// Ba chỗ hỏng đo được:
// (1) Không tầng nào đưa em lên vị trí NGƯỜI ĐẶT ĐỀ. verify.mjs bắt game tự kiểm chứng đề và
//     adapt.mjs chỉnh độ khó theo em, nhưng cả hai đều giả định máy ra đề. Muốn đố được một câu nằm
//     trong mạch đang học, em phải hiểu cái đó — đây là mức cao nhất của thang nhận thức và là hoạt động
//     lớp 4–5 đòi làm nhiều nhất ("cho em được đố bạn").
// (2) Tiếng nói của em gần như không có việc. QUEUE.roles mới cho vai "Thư ký" đọc lại đề theo máy;
//     còn lại 82 game không có chỗ nào em mở miệng nói tiếng Việt hay en-US, dù rules.mjs bắt em luyện phát âm.
// (3) Đề do bạn đặt ra thì em được đố KHÔNG có đường lùi: mọi prompt hiện chỉ có "sai thì mất 1 tim".
//     Thực tế lớp, em bị đố một câu ngoài tầm sẽ ngồi im hoặc khóc, nên tầng này bắt buộc có nút nhận thua
//     không bị phạt.
//
// Ràng buộc kế thừa (không đặt số mới): 12 lượt, 3 hiệp, một lượt cuối mỗi hiệp (pe + lesson), 3 lượt một
// vai và bốn vai chờ (queue), thẻ <= 3 dòng tự tắt sau 6 giây và chữ >= 20px (curriculum), trần 8–10 phút
// một phiên (lesson), +5 điểm vào "Cả nhóm" và không vào "miti-best" (queue), ngân sách 3 câu thoại mỗi phút
// và mỗi câu <= 6 từ (identity), 1 sải tay + hình quạt 90 độ (playzone), giọng en-US cho học liệu tiếng Anh
// (rules), micro chỉ ở ba game mã VOICE (data/gestures.mjs), "miti-mute" (rhythm).
//
// validate.mjs so khớp nguyên văn từng chuỗi ở dưới, nên sửa số ở đây là sửa ở 85 prompt, 425 block biến thể,
// 12 prompt legacy và bảng kiểm nghiệm thu cùng một lúc.

export const QUIZ = {
  // Nguồn đề: ba trên mười hai lượt do em đặt, chín lượt còn lại vẫn từ ngân hàng đề.
  nguonDe:
    'NGUỒN ĐỀ: trong 12 lượt, đúng BA lượt là lượt "Đố bạn" — mỗi hiệp MỘT lượt, luôn ở vị trí CUỐI hiệp. Đề của lượt đố do một em đọc NGUYÊN VĂN MỘT trong ba mẫu câu của mạch kiến thức game này, lấy từ `tools/data/quiz.mjs`, và điền đúng MỘT số hoặc MỘT từ đang hiện trên thẻ của lượt đó; game không nhận diện tiếng nói, em đọc to là đủ. Chín lượt còn lại vẫn lấy từ ngân hàng đề đã có, CẤM đảo thành 12/12 lượt đố, CẤM để em tự bịa đề ngoài phạm vi đã học của cụm (theo tầng tự kiểm chứng đề), CẤM biến mẫu câu đố thành điều kiện thắng — đáp án vẫn chốt bằng động tác của mã điều khiển.',

  // Cách đố: thẻ một hàng ba mẫu câu, không micro, không hiện sẵn đáp án.
  cachDo:
    'CÁCH ĐỐ: tới lượt đố thì HUD hiện thẻ "Đố bạn" bằng MỘT hàng ba mẫu câu đúng mạch, chữ >= 20px, không che đề bài, tự tắt sau 6 giây hoặc khi em chạm — lấy đúng trần thẻ báo-trước của tầng chuẩn kiến thức. Em đố bấm nút "Em đố" rồi đọc to MỘT mẫu câu trong 3 giây; CẤM game bật microphone ở lượt này (chỉ ba game mã VOICE mới có micro), CẤM bắt em viết hay gõ đề, CẤM hiện sẵn đáp án đúng trên thẻ "Đố bạn". Bản một học sinh: chính em bấm "Em đố", đọc mẫu câu rồi tự đáp, thẻ vẫn hiện đủ ba mẫu.',

  // Bạn đáp: một động tác của mã điều khiển, Thư ký đọc lại, không ai ngồi im.
  dapCuaBan:
    'BẠN ĐÁP: em được đố trả lời bằng ĐÚNG MỘT động tác thuộc mã điều khiển của game này, vẫn trong vòng 1 sải tay và hình quạt 90 độ PHÍA TRƯỚC mặt em, trong cùng thời gian thẻ của hiệp đang chạy; vai "Thư ký" đọc to lại cả đề lẫn đáp án đúng theo tầng vai chờ, CẤM biến lượt đố thành lượt ngồi xem. CẤM đổi động tác đặc trưng của môn vì lượt đố, CẤM đòi hai em chạm tay nhau hay quay mặt vào nhau. Game Tiếng Anh: em được đố đáp bằng động tác, mẫu câu đố đọc giọng en-US, động tác vẫn giữ nhãn tiếng Việt.',

  // Đề lệch: em đố câu ngoài phạm vi thì không ai bị phạt.
  xuLyLech:
    'ĐỀ LỆCH: nếu em điền số hoặc từ NGOÀI phạm vi đã học của cụm, hay mẫu câu em đọc không có đáp án đúng trong các thẻ đang bay, game KHÔNG trừ tim, KHÔNG cắt chuỗi đúng, mascot nói đúng MỘT câu đỡ (theo ngân sách 3 câu thoại mỗi phút, <= 6 từ), và thẻ "Đố bạn" tự đổi sang đề ngân hàng ở lượt kế. Em được đố bấm nút "Em chịu, bạn đáp giúp" thì bạn trả lời giúp, lượt đó không tính là sai và không bị bỏ. CẤM phạt em đặt đề sai, CẤM in chữ "đề sai" cạnh tên em, CẤM trừ điểm cả nhóm vì một đề lệch.',

  // Điểm: vào "Cả nhóm", không vào cá nhân, không xếp hạng người đố.
  diemVai:
    'ĐIỂM ĐỐ: một lượt đố hợp lệ cộng +5 điểm vào thanh "Cả nhóm <x>/<mốc>" đang có sẵn, KHÔNG cộng vào "miti-best", KHÔNG đổi thứ hạng của em đang chơi. Màn tổng kết in ĐÚNG MỘT dòng "Em đố hôm nay: <tên> <n> đề" nằm trong khối mà nút "Copy tờ rời" copy được, cùng khối với dòng "Bốn em hôm nay" của tầng vai chờ. CẤM xếp hạng riêng người đố, CẤM trừ điểm khi đề chưa có đáp án đúng, CẤM biến lượt đố thành lượt thi cá nhân.',

  // Nghiệm thu: lượt đố có thật hay chỉ là một cái nhãn trên màn hình.
  guard:
    '`verifyQuiz()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — đúng BA lượt "Đố bạn" một phiên ở cuối mỗi hiệp và chín lượt còn lại vẫn lấy từ ngân hàng đề · mẫu câu đố lấy NGUYÊN VĂN từ `tools/data/quiz.mjs` theo đúng mạch kiến thức của cụm, thẻ "Đố bạn" MỘT hàng ba mẫu câu chữ >= 20px tự tắt sau 6 giây, không bật microphone và không hiện sẵn đáp án · lượt đố được trả lời bằng đúng MỘT động tác của mã điều khiển trong vòng 1 sải tay, đề lệch không trừ tim không cắt chuỗi và nút "Em chịu, bạn đáp giúp" bấm được thật · điểm đố chỉ vào thanh "Cả nhóm" và dòng "Em đố hôm nay" nằm trong khối "Copy tờ rời". Thiếu điều nào thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản một học sinh, bản không camera và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều, vì một em đọc mẫu câu và một em đáp bằng động tác không phụ thuộc webcam.',
};

// Dòng rút gọn cho checklist và cho block biến thể.
export const QUIZ_SHORT =
  'đúng BA/12 lượt "Đố bạn" ở cuối mỗi hiệp, đề do em đọc nguyên văn một trong ba mẫu câu của tools/data/quiz.mjs theo đúng mạch kiến thức và điền MỘT số/từ đang hiện trên thẻ, chín lượt còn lại vẫn từ ngân hàng đề · thẻ "Đố bạn" một hàng ba mẫu câu >= 20px tự tắt sau 6 giây, không bật microphone, không hiện sẵn đáp án · em được đố đáp bằng đúng một động tác của mã điều khiển trong 1 sải tay, Thư ký đọc lại đề và đáp án · đề lệch không trừ tim, không cắt chuỗi, mascot nói một câu đỡ <= 6 từ, có nút "Em chịu, bạn đáp giúp" · +5 điểm đố vào "Cả nhóm", không vào "miti-best", tổng kết in "Em đố hôm nay: <tên> <n> đề" trong khối Copy tờ rời · verifyQuiz() kiểm lúc nạp';
