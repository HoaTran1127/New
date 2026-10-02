// Sáu quy định "mục tiêu của em" — mỗi em tự nói một ý định đầu phiên rồi tự nhận ở cuối phiên,
// tầng thứ hai mươi sáu của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm chuỗi NFC, lower-case trong prompts/0X-*/):
// "hôm nay em sẽ" 0/85 · "em sẽ cố" 0/85 · "em cố gắng" 0/85 · "điều em muốn" 0/85 · "mong muốn của em"
// 0/85 · "em đăng ký" 0/85 · "thẻ mục tiêu" 0/85 · "bảng mục tiêu" 0/85 · "em làm được" 0/85 ·
// "làm được một phần" 0/85 · "miti-goal" 0/85 · "lần trước em" 0/85 · "em tiến bộ" 0/85 ·
// "so với chính em" 0/85 · "phiên của em" 0/85 · "game tự chọn" 0/85.
// Chiều ngược: "em chọn một" 85/85 và "em tự chọn" 85/85 — nhưng cả hai chỗ đó là chọn ĐỒ VẬT hay ĐÁP ÁN
// trong lượt chơi, chưa lần nào em chọn cái em sẽ cố làm cho chính mình; "tiến bộ" 85/85 nhưng thuộc hồ sơ
// "miti-mastery" do MÁY ghi theo cụm kiến thức, chưa lần nào chính em tự nhận.
//
// Bốn chỗ hỏng đo được:
// (1) Máy quyết hết. Máy chỉnh độ khó (adapt), máy ghi thành tích (miti-best), máy nhận xét em cố gắng
//     (hype) — em không có một câu nào nói ra điều em muốn làm được trong tiết này.
// (2) Thiếu đúng bước mở đầu tiết Thể dục lớp 4–5: cán sự hô "hôm nay cả lớp ta luyện …", bốn em tự nhẩm
//     phần của mình. Sách giáo khoa coi đây là bước định hướng, không phải trang trí.
// (3) Không có đường nào cho em RÚT KHỎI vòng chơi một cách chủ động. playzone cho em nghỉ vì mệt, access
//     cho em giảm nhịp, nhưng chưa nơi nào em tự đặt ra một giới hạn cho chính mình rồi tự nhận đã làm tới đâu.
// (4) "Cố lên!" của mascot (hype) là lời máy khen; một ý định em tự nói làm em ở lại trò chơi lâu hơn và
//     là cơ sở để em so với CHÍNH MÌNH, không so với ba bạn bên cạnh.
//
// Ràng buộc kế thừa (không đặt số mới): 60–90 giây khởi động trước nút "Bắt đầu" (light + playzone); thẻ
// MỘT hàng chữ >= 20px tự tắt sau 6 giây (curriculum); ba nhịp nhắc một phiên vì tiết có ba hiệp (pe +
// lesson); 12 lượt hỏi bài giữ nguyên, CẤM thành lượt thứ 13 (quiz + lead); +5 điểm chỉ vào "Cả nhóm",
// không vào "miti-best" (queue); 1 sải tay và hình quạt 90 độ (playzone); mascot <= 6 từ và 3 câu mỗi phút
// (identity); micro chỉ ở ba game mã VOICE (data/gestures); khối "Câu chốt" 20 giây cuối phiên đã lấy chỗ
// tự đánh giá bằng 1–3 ngón tay (takeaway) nên tầng này KHÔNG dùng lại ngón tay, chỉ dùng ba nút chạm;
// hồ sơ xuyên phiên đã có "miti-best" (queue), "miti-effort" (lesson), "miti-week" (pacing), "miti-mastery"
// (curriculum) — tầng này xin thêm đúng một key "miti-goal"; nút "Copy tờ rời" (acceptance).

export const GOAL = {
  // Vị trí: một thẻ duy nhất mỗi phiên, nằm TRONG 60–90 giây khởi động đang có.
  theChon:
    'THẺ MỤC TIÊU: một phiên có ĐÚNG MỘT thẻ "Mục tiêu của em", chạy trong 60–90 giây khởi động đang có, KHÔNG thêm thời lượng phiên và KHÔNG trễ nút "Bắt đầu". Ba dòng mục tiêu của game này lấy NGUYÊN VĂN từ `tools/data/goals.mjs` theo đúng MÃ ĐIỀU KHIỂN của game, đặt ở BA nút chọn, mỗi nút MỘT hàng, chữ >= 20px. Em chạm MỘT nút rồi nói thầm hoặc nói to đúng câu em đã chọn; CẤM game chọn hộ, CẤM chọn ngẫu nhiên, CẤM để mascot chọn thay, CẤM viết lại câu khác với bảng. Em chưa muốn chọn thì bấm nút "Chưa chọn", thẻ tắt và CẤM hiện lại lần hai trong phiên. Thẻ tự tắt sau 6 giây cùng nhịp trạm, lấy đúng trần thẻ báo-trước của tầng chuẩn kiến thức, không che đề bài.',

  // Bốn em bốn mục tiêu: không so sánh là điều khoản cốt lõi.
  bonEmBonMucTieu:
    'BỐN EM BỐN MỤC TIÊU: mỗi em ĐÚNG MỘT mục tiêu cho riêng mình, chọn tại chỗ trong vòng 1 sải tay, không cần đứng lên. CẤM in hai mục tiêu cạnh nhau để so; CẤM đọc mục tiêu của em này trước lớp; CẤM gọi mục tiêu nào là cao hay thấp, khó hay dễ hơn; CẤM xếp hàng hay chia nhóm theo mục tiêu; CẤM biến mục tiêu thành điểm, thành tim hay thành chuỗi đúng. Mascot chỉ nói <= 6 từ một lần (chữ "Cả nhóm sẵn sàng!" là đủ), CẤM nhắc lại mục tiêu của em nào. Bản một học sinh: em vẫn có ba nút chọn và một lượt tự nhận như bình thường.',

  // Nhắc lại: đúng một dòng nhỏ đầu mỗi hiệp, không cắt thời gian đọc đề.
  nhacDauHiep:
    'NHẮC ĐẦU HIỆP: TỐI ĐA BA lần một phiên, đúng một dòng ở GIÂY ĐẦU TIÊN của mỗi hiệp — "Mục tiêu: <đúng câu em đã chọn>". Dòng nhỏ nằm ở góc HUD, chữ >= 20px, MỘT hàng, tự tắt sau 6 giây, KHÔNG che đề bài, KHÔNG bật tiếng, KHÔNG cắt thời gian đọc đề của lượt kế tiếp, CẤM hiện thêm lần thứ tư trong phiên. Em bấm "Chưa chọn" thì dòng nhắc không hiện và CẤM in chữ "chưa có mục tiêu" cạnh tên em.',

  // Tự ghi nhận: ba nút chạm, không điểm, không phạt, không lấy lại chỗ tầng câu chốt.
  tuGhiNhan:
    'TỰ GHI NHẬN: ở màn tổng kết, mỗi em có ĐÚNG MỘT lượt chạm một trong BA nút "Em làm được rồi", "Em làm được một phần", "Em sẽ làm tiếp". Ba nút này KHÔNG phải cử chỉ điều khiển: CẤM game chờ nhận diện động tác để ghi nhận, CẤM bật microphone (chỉ ba game mã VOICE mới có micro), CẤM nhận dạng giọng nói hay phiên âm câu của em. Trạng thái KHÔNG trừ tim, KHÔNG cắt chuỗi đúng, KHÔNG đổi độ khó đang có, KHÔNG hiện thành điểm hay thứ hạng, CẤM so em này với em khác, CẤM in chữ "đạt" cạnh tên em như một lời phê. Lượt chạm không tính vào 12 lượt hỏi bài, CẤM biến thành lượt thứ 13, và KHÔNG thay khối "Câu chốt" 20 giây đang có.',

  // Hồ sơ xuyên phiên: một bản ghi, một dòng, không biểu đồ, không bịa số.
  luuXuyenPhien:
    'HỒ SƠ MỤC TIÊU: lưu vào localStorage key "miti-goal" ĐÚNG MỘT bản ghi mỗi phiên, dạng "<mã game>|<trạng thái>|<ngày>". Màn tổng kết in TỐI ĐA HAI dòng trong cùng khối mà nút "Copy tờ rời" copy được: "Mục tiêu hôm nay: <tên> <trạng thái>" và, chỉ khi bản ghi phiên trước CÓ THẬT, "Phiên trước em: <trạng thái>". Thiếu bản ghi thì CẤM in dòng thứ hai, CẤM bịa "em tiến bộ". CẤM dựng biểu đồ, CẤM tính tỉ lệ %, CẤM chuỗi ngày, CẤM so sánh với bạn nào; hồ sơ này không phải điểm số. Phụ huynh hoặc giáo viên muốn xoá thì bấm nút "Xoá hồ sơ của em" — xoá riêng key "miti-goal", không đụng "miti-best", "miti-effort", "miti-week", "miti-mastery".',

  // Nghiệm thu: mục tiêu có thật do em chọn, hay máy tự điền cho đủ khối.
  guard:
    '`verifyGoal()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — ĐÚNG MỘT thẻ "Mục tiêu của em" mỗi phiên trong 60–90 giây khởi động, ba nút chọn MỘT hàng chữ >= 20px lấy NGUYÊN VĂN từ `tools/data/goals.mjs` theo đúng mã điều khiển, game không chọn hộ và không chọn ngẫu nhiên · mỗi em một mục tiêu, không in hai mục tiêu cạnh nhau, không đọc mục tiêu của em khác trước lớp, mascot <= 6 từ · dòng nhắc đầu hiệp tối đa BA lần một phiên, không che đề, không cắt thời gian đọc đề, không thành lượt hỏi bài thứ 13, không trừ tim · màn tổng kết có ba nút tự ghi nhận, đúng MỘT bản ghi "miti-goal" mỗi phiên và dòng "Mục tiêu hôm nay: <tên> <trạng thái>" nằm trong khối "Copy tờ rời". Thiếu điều nào thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản một học sinh, bản không camera, bản tắt tiếng, bản "dép lê" và bản "lớp mình chật" vẫn bắt buộc kiểm đủ bốn điều, vì một câu em tự nhủ không phụ thuộc webcam.',
};

// Dòng rút gọn cho checklist và cho block biến thể.
export const GOAL_SHORT =
  'ĐÚNG MỘT thẻ "Mục tiêu của em" mỗi phiên trong 60–90 giây khởi động · ba nút chọn một hàng chữ >= 20px lấy nguyên văn từ tools/data/goals.mjs theo đúng mã điều khiển, game không chọn hộ, không chọn ngẫu nhiên · thẻ tự tắt sau 6 giây, có nút "Chưa chọn" và không hiện lại lần hai · bốn em bốn mục tiêu riêng, không in cạnh nhau để so, không đọc trước lớp, không thành điểm hay thứ hạng, mascot <= 6 từ · dòng nhắc đầu hiệp tối đa ba lần một phiên, không che đề, không cắt thời gian đọc đề · màn tổng kết ba nút "Em làm được rồi / Em làm được một phần / Em sẽ làm tiếp", không trừ tim, không đổi độ khó, không tính vào 12 lượt · một bản ghi "miti-goal" mỗi phiên, dòng "Mục tiêu hôm nay: <tên> <trạng thái>" trong khối Copy tờ rời, không biểu đồ không tỉ lệ % · verifyGoal() kiểm lúc nạp';
