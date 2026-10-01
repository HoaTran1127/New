// Sáu quy định "bạn dẫn" — một em làm mẫu động tác, ba em kia bắt chước, tầng thứ hai mươi tư.
//
// Khảo sát 85 prompt trước khi viết file này (đếm chuỗi NFC trong prompts/0X-*/ + tools/lib/):
// "em làm mẫu" 0/85 · "bạn làm mẫu" 0/85 · "bắt chước" 0/85 · "người dẫn" 0/85 · "em dẫn" 0/85
// · "nhìn bạn" 0/85 · "làm theo bạn" 0/85 · "đồng diễn" 0/85 · "nhịp chung" 0/85 — và trong tools/lib
// cả ba cụm "bắt chước" / "người dẫn" / "làm theo bạn" đều 0 file. Chiều ngược: "mascot làm mẫu" 85/85,
// riêng "làm mẫu" xuất hiện 8 lần trong một prompt và cả tám lần đều có mascot làm chủ ngữ.
//
// Bốn chỗ hỏng đo được:
// (1) Người làm mẫu động tác LUÔN là máy. Chưa một tầng nào đặt một em lên vị trí để ba em khác phải
//     nhìn và bắt chước, tức là bỏ mất đúng hoạt động mở đầu mọi tiết Thể dục lớp 4–5 ("cô trò dẫn nhau")
//     và cách trẻ nạp một động tác mới nhanh nhất — nhìn bạn rồi làm theo.
// (2) Tầng vai chờ (queue) cho ba em chưa tới lượt làm cổ vũ, trọng tài, thư ký; cả ba vai đều KHÔNG có
//     việc bằng tay ở vị trí dẫn đầu. Đố bạn (quiz) đưa MỘT em lên vị trí người đặt đề nhưng người đáp
//     vẫn chỉ lặp lại động tác mà máy đã biết. Động tác do chính một em sinh ra thì không tồn tại.
// (3) 85 prompt chỉ có một kiểu "làm theo": mascot làm mẫu 3 giây rồi em làm theo một mình. Không có
//     khoảnh khắc nào cả nhóm cùng làm một động tác theo cùng một nhịp — "nhịp chung" 0/85, "đồng diễn" 0/85.
// (4) Em rụt rè có thể nói mà không cần đứng lên (quiz đã mở đường đó), nhưng chưa có đường nào cho em
//     nói ít mà làm giỏi: dẫn một động tác không cần một lời nào, không micro, không đọc, không viết.
//
// Ràng buộc kế thừa (không đặt số mới): 12 lượt và 3 hiệp, trạm nghỉ 5 giây (feel), 60–90 giây khởi động
// và trần 8–10 phút một phiên (pe + lesson), mascot làm mẫu 3 giây (light: em đứng im 15 giây), một lượt
// cuối mỗi hiệp và ba lượt đố (quiz), 3 lượt một vai và bốn vai chờ (queue), thẻ MỘT hàng >= 20px tự tắt
// sau 6 giây (curriculum + quiz), +5 điểm vào "Cả nhóm" và không vào "miti-best" (queue), ngân sách 3 câu
// thoại mỗi phút và mỗi câu <= 6 từ (identity), 1 sải tay + hình quạt 90 độ và bản dép lê bỏ nhấc chân
// cao, bản lớp chật đổi động tác di chuyển thành tại chỗ (playzone), micro chỉ ở ba game mã VOICE (data/
// gestures.mjs), giọng en-US cho học liệu tiếng Anh (rules), "miti-mute" (rhythm), "Copy tờ rời" (accept).
//
// validate.mjs so khớp nguyên văn từng chuỗi ở dưới, nên sửa số ở đây là sửa ở 85 prompt, 425 block biến
// thể, 12 prompt legacy và bảng kiểm nghiệm thu cùng một lúc.

export const LEAD = {
  // Nguồn dẫn: ba lần một phiên ở đầu mỗi hiệp, động tác lấy từ ngân hàng theo đúng mã điều khiển.
  nguonDan:
    'BẠN DẪN: một phiên có ĐÚNG BA lần "Bạn dẫn" — mỗi hiệp MỘT lần, lần của hiệp 1 nằm ở 5 giây ĐẦU TIÊN sau nút "Bắt đầu" (trước lượt 1, không kéo dài khởi động quá trần 60–90 giây), lần của hiệp 2 và hiệp 3 nằm ngay SAU trạm nghỉ 5 giây giữa hai hiệp. Mỗi lần dẫn dài ĐÚNG 5 giây. Em dẫn làm MỘT trong ba động tác của `tools/data/leads.mjs` lấy theo đúng mã điều khiển của game này. BA lần dẫn KHÔNG tính vào 12 lượt hỏi bài, CẤM biến thành lượt thứ 13, CẤM đổi ngân hàng câu hỏi, CẤM rút thời gian đọc đề của lượt kế tiếp, CẤM để mascot dẫn thay khi bản chơi có từ hai học sinh.',

  // Cách dẫn: thẻ một hàng ba động tác, không micro, không đọc tên động tác.
  cachDan:
    'CÁCH DẪN: tới lượt dẫn thì HUD hiện thẻ "Bạn dẫn" bằng MỘT hàng ba động tác đúng mã điều khiển, chữ >= 20px, không che đề bài, tự tắt sau 5 giây cùng nhịp trạm — lấy đúng trần thẻ báo-trước của tầng chuẩn kiến thức. Em dẫn bấm nút "Em dẫn" rồi LÀM ĐÚNG MỘT động tác trong 5 giây, bằng tay và thân, không cần nói; CẤM game bật microphone ở lần dẫn này (chỉ ba game mã VOICE mới có micro), CẤM bắt em đọc, viết hay gõ tên động tác, CẤM hiện dấu ✓ cạnh một động tác cụ thể trên thẻ. Bản một học sinh: chính em bấm "Em dẫn", làm MỘT động tác rồi lặp lại đúng động tác đó thêm hai lần theo vạch nhịp 3 nhịp, thẻ vẫn hiện đủ ba động tác.',

  // Bắt chước: ba em kia nhìn và làm theo, mỗi em trong 1 sải tay của mình, không chấm ai giống hơn.
  lamTheo:
    'BẮT CHƯỚC: ba em còn lại nhìn em dẫn và bắt chước ĐÚNG MỘT động tác vừa làm, trong cùng 5 giây, mỗi em vẫn đứng tại chỗ của mình và trong vòng 1 sải tay cộng hình quạt 90 độ PHÍA TRƯỚC mặt em — CẤM xếp hàng vòng tròn, CẤM chạm tay hay chạm vai nhau, CẤM quay mặt vào nhau, CẤM rời khỏi chỗ. Game không nhận diện từng em và không so em nào giống hơn: cô bấm nút "Cả nhóm đã làm theo" là lượt dẫn khép lại. Lần dẫn không trừ tim, không cắt chuỗi đúng của bất kỳ em nào, không tính vào 12 lượt. Game Tiếng Anh: động tác dẫn vẫn mang nhãn tiếng Việt, thẻ "Bạn dẫn" không hiện từ tiếng Anh.',

  // Dẫn lệch: làm động tác ngoài thẻ hoặc đứng im thì không ai bị phạt.
  xuLyLech:
    'DẪN LỆCH: nếu em dẫn làm động tác NGOÀI ba động tác trên thẻ, làm quá tầm 1 sải tay, hoặc đứng im hết 5 giây, game KHÔNG trừ tim, KHÔNG cắt chuỗi đúng, mascot làm mẫu lại MỘT động tác trong ba động tác của thẻ đúng 3 giây (theo trần mascot làm mẫu) và cả nhóm bắt chước động tác đó; thẻ "Bạn dẫn" của hiệp kế vẫn lấy từ ngân hàng. Em bắt chước không kịp hoặc làm khác thì lượt đó không tính là sai cho em nào. CẤM phạt em đặt động tác lệch, CẤM in chữ "sai nhịp" hay "làm sai" cạnh tên em, CẤM trừ điểm cả nhóm vì một lần dẫn lệch.',

  // Điểm: vào "Cả nhóm", không vào cá nhân, không xếp hạng người dẫn.
  diemVai:
    'ĐIỂM DẪN: một lần dẫn khép lại hợp lệ cộng +5 điểm vào thanh "Cả nhóm <x>/<mốc>" đang có sẵn, KHÔNG cộng vào "miti-best", KHÔNG đổi thứ hạng của em đang chơi. Màn tổng kết in ĐÚNG MỘT dòng "Em dẫn hôm nay: <tên> <n> hiệp" nằm trong khối mà nút "Copy tờ rời" copy được, cùng khối với dòng "Bốn em hôm nay" của tầng vai chờ và dòng "Em đố hôm nay" của tầng đố bạn. CẤM xếp hạng riêng người dẫn, CẤM chấm điểm động tác đẹp hay xấu, CẤM biến 5 giây dẫn thành lượt thi cá nhân.',

  // Nghiệm thu: lần dẫn có thật hay chỉ là một cái nhãn trên màn hình.
  guard:
    '`verifyLead()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — ĐÚNG BA lần "Bạn dẫn" một phiên ở đầu mỗi hiệp, mỗi lần ĐÚNG 5 giây, 12 lượt hỏi bài giữ nguyên và không lượt dẫn nào bị tính thành lượt hỏi bài · động tác dẫn lấy NGUYÊN VĂN từ `tools/data/leads.mjs` theo đúng mã điều khiển của game, thẻ "Bạn dẫn" MỘT hàng ba động tác chữ >= 20px tự tắt sau 5 giây, không bật microphone và không đánh dấu ✓ động tác nào là đúng · ba em còn lại bắt chước trong vòng 1 sải tay và hình quạt 90 độ của chính mình, không chạm nhau, nút "Cả nhóm đã làm theo" bấm được thật, dẫn lệch hay đứng im đều không trừ tim và mascot làm mẫu lại 3 giây · +5 điểm dẫn chỉ vào thanh "Cả nhóm" và dòng "Em dẫn hôm nay" nằm trong khối "Copy tờ rời". Thiếu điều nào thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản một học sinh, bản không camera, bản tắt tiếng, bản "dép lê" và bản "lớp mình chật" vẫn bắt buộc kiểm đủ bốn điều, vì một em làm mẫu và ba em nhìn theo không phụ thuộc webcam.',
};

// Dòng rút gọn cho checklist và cho block biến thể.
export const LEAD_SHORT =
  'đúng BA lần "Bạn dẫn" một phiên ở đầu mỗi hiệp, mỗi lần 5 giây và không tính vào 12 lượt hỏi bài · động tác dẫn lấy nguyên văn một trong ba động tác của tools/data/leads.mjs theo đúng mã điều khiển · thẻ "Bạn dẫn" một hàng ba động tác >= 20px tự tắt sau 5 giây, không bật microphone, không đánh dấu ✓ · ba em còn lại bắt chước trong 1 sải tay và hình quạt 90 độ của mình, không chạm nhau, cô bấm "Cả nhóm đã làm theo" · dẫn lệch hoặc đứng im không trừ tim, mascot làm mẫu lại 3 giây · +5 điểm dẫn vào "Cả nhóm", không vào "miti-best", tổng kết in "Em dẫn hôm nay: <tên> <n> hiệp" trong khối Copy tờ rời · verifyLead() kiểm lúc nạp';
