// Sáu quy định "câu chốt" — bốn em lần lượt nói MỘT câu bằng lời của mình ở 20 giây cuối phiên,
// tầng thứ hai mươi lăm của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm chuỗi NFC, lower-case trong prompts/0X-*/):
// "điều em nhớ" 0/85 · "một câu chốt" 0/85 · "câu chốt" 0/85 · "hệ thống bài" 0/85
// · "bằng lời của em" 0/85 · "lời của em" 0/85 · "cả bốn em cùng" 0/85 · "bốn câu của bốn em" 0/85
// · "tự đánh giá" 0/85 · "ngón tay của em" 0/85 · "nhắc lại bằng lời" 0/85 · "kể lại một câu" 0/85
// · "20 giây cuối" 0/85. Chiều ngược: "thả lỏng" 85/85 và "giãn cơ" 85/85 (pe + sport đã phủ phần THỂ
// chất cuối tiết), "vì sao em chọn" 85/85 nhưng lúc nào cũng kèm BA phương án máy viết sẵn.
//
// Bốn chỗ hỏng đo được:
// (1) Cuối phiên, em chỉ NGHE. "Mẹo nhớ" do máy đọc (curriculum), "Mẹo con mang về" do máy nhắc
//     (family), "Vì sao đúng?" là trắc nghiệm ba lựa chọn (memory) — chưa một tầng nào bắt em PHÁT RA
//     MỘT câu do miệng em tự nối. Nói được bằng lời của mình là phép thử trung thực nhất của "hiểu bài":
//     làm đúng một động tác chưa chắc đã hiểu, nói được một câu thì chắc.
// (2) Đúng cái tiết Thể dục lớp 4–5 trong sách giáo khoa luôn có mà thư viện này chưa có: bước "hệ thống
//     bài" ở cuối tiết, cô hỏi "hôm nay em nhớ điều gì", bốn em lần lượt trả lời một câu.
// (3) Không có đường nào cho em TỰ nói mình hiểu tới đâu. Bốn mức gắng sức cuối mỗi hiệp là máy SUY TỪ
//     chuyển động ("ước lượng từ chuyển động, không phải đo mạch"), chưa lần nào chính em giơ tay tự báo.
// (4) Em rụt rè có đường nói không cần đứng lên (đố bạn) và đường dẫn không cần nói (bạn dẫn), nhưng vẫn
//     chưa có đường khép tiết cho em nào cũng có MỘT lượt lên tiếng, kể cả em chọn im lặng.
//
// Ràng buộc kế thừa (không đặt số mới): 12 lượt và 3 hiệp, một lượt cuối mỗi hiệp (pe + lesson); ba lượt
// đố ở cuối mỗi hiệp và BA mẫu câu nguyên văn theo mạch (quiz); 5 giây cho một lượt dẫn (lead); trạm nghỉ
// 5 giây giữa hiệp (feel); thẻ MỘT hàng chữ >= 20px tự tắt sau 6 giây (curriculum); trần 8–10 phút một
// phiên và tự khép ở phút 10 (lesson); +5 điểm vào "Cả nhóm", không vào "miti-best" (queue); 1 sải tay
// và hình quạt 90 độ, không chạm nhau (playzone); micro chỉ ở ba game mã VOICE (data/gestures); ngân
// sách 3 câu thoại mỗi phút và mỗi câu <= 6 từ (identity); động tác đặc trưng của môn (sport); giọng
// en-US cho học liệu tiếng Anh (rules); "miti-mute" (rhythm); nút "Copy tờ rời" (acceptance).
//
// validate.mjs so khớp nguyên văn từng chuỗi ở dưới, nên sửa số ở đây là sửa ở 85 prompt, 425 block biến
// thể, 12 prompt legacy và bảng kiểm nghiệm thu cùng một lúc.

export const TAKEAWAY = {
  // Vị trí: một khối duy nhất mỗi phiên, nằm TRONG trần 8–10 phút chứ không nối dài phiên.
  viTri:
    'CÂU CHỐT: một phiên có ĐÚNG MỘT khối "Câu chốt", dài ĐÚNG 20 giây, nằm ở CUỐI phiên — ngay SAU lượt đố thứ ba của hiệp 3 và TRƯỚC màn tổng kết. Hai mươi giây này nằm TRONG trần 8–10 phút đang có, KHÔNG kéo dài phiên, đồng hồ phiên chỉ khép ở phút thứ 10 SAU khi khối chốt xong. Khối chốt KHÔNG tính vào 12 lượt hỏi bài, CẤM biến thành lượt thứ 13, CẤM rút thời gian đọc đề, CÂU CHỐT không thay thế phần "thả lỏng" và "giãn cơ" đang có cuối phiên, CẤM để mascot chốt thay khi bản chơi có từ hai học sinh.',

  // Khung câu: em chọn một trong ba khung của đúng mạch kiến thức game này rồi tự nói phần bỏ trống.
  khungChon:
    'KHUNG CÂU: ba khung câu chốt của game này lấy NGUYÊN VĂN từ `tools/data/takeaways.mjs` theo đúng MẠCH kiến thức của cụm này, đặt ở BA nút chọn, mỗi nút MỘT hàng, chữ >= 20px. Em chạm vào MỘT khung rồi nói to phần bỏ trống "…" bằng lời của chính em; khung em đã chọn hiện trên thẻ "Câu chốt" bằng MỘT hàng, chữ >= 20px, không che đề bài, tự tắt sau 6 giây cùng nhịp trạm. Chỗ trống do EM nói, KHÔNG do game điền: CẤM game bật microphone ở khối chốt này (chỉ ba game mã VOICE mới có micro), CẤM nhận dạng giọng nói hay phiên âm câu của em, CẤM hiện sẵn đáp án đúng cạnh chỗ trống, CẤM bắt em đọc, viết hay gõ câu chốt, CẤM mascot đọc khung câu thành lời (mỗi câu mascot chỉ <= 6 từ).',

  // Bốn em bốn câu: ai cũng có một lượt lên tiếng, kể cả em chọn im lặng.
  bonEmNoi:
    'BỐN EM CÙNG CHỐT: cả bốn em đều có MỘT lượt trong khối 20 giây, mỗi em ĐÚNG 5 giây, theo thứ tự chỗ ngồi đang dùng cho tầng vai chờ; tới lượt thì thẻ "Câu chốt" hiện khung em đã chọn và một dòng nhắc "Đến lượt em". Em nói xong thì cô bấm nút "Em đã nói" để chuyển lượt. Em không muốn nói thì bấm nút "Em chưa nói được" rồi làm MỘT động tác của mã điều khiển game này thay cho câu nói, lượt vẫn tính và CẤM gọi lại lượt đó lần hai; CẤM ép, CẤM nhắc trước lớp "sao em không nói", CẤM in tên em cạnh chữ "chưa chịu nói". Bản một học sinh: em chọn MỘT khung, nói một câu, lượt vẫn khép bình thường.',

  // Tự đánh giá: chính em giơ ngón tay, không phải máy suy từ chuyển động.
  tuDanhGia:
    'TỰ ĐÁNH GIÁ: ngay sau câu chốt của mình, em giơ 1, 2 hay 3 ngón tay trước ngực trong tầm 1 sải tay (1 ngón = "em chưa rõ", 2 ngón = "em hiểu rồi", 3 ngón = "em giải thích được cho bạn"); cô bấm một trong ba mức đó ở hồ sơ phiên, game chỉ ghi con số em tự chọn. Mức tự đánh giá KHÔNG trừ tim, KHÔNG cắt chuỗi đúng, KHÔNG đổi độ khó đang có, KHÔNG hiện lên màn hình như một điểm, chỉ đi vào dòng tổng kết. Số ngón tay không phải cử chỉ điều khiển: CẤM game chờ nhận diện ngón tay để quay vòng, CẤM biến thành lượt hỏi bài thứ 13, CẤM bắt em nào giơ 3 ngón.',

  // Điểm và tờ rời: câu nào cũng đáng như câu nào, chỉ có một dòng đếm được.
  diemVaSheet:
    'ĐIỂM CHỐT: khi đủ bốn lượt trong khối khép lại, cộng +5 điểm vào thanh "Cả nhóm <x>/<mốc>" đang có sẵn, KHÔNG cộng vào "miti-best", KHÔNG đổi thứ hạng của em đang chơi. Màn tổng kết in ĐÚNG MỘT dòng "Em chốt hôm nay: <tên> <n> câu" nằm trong khối mà nút "Copy tờ rời" copy được, cùng khối với dòng "Bốn em hôm nay" của tầng vai chờ, dòng "Em đố hôm nay" của tầng đố bạn và dòng "Em dẫn hôm nay" của tầng bạn dẫn. CẤM xếp hạng câu chốt hay, dở; CẤM chấm câu này đúng hơn câu kia; CẤM in chữ "đúng" hay "sai" cạnh câu của em; CẤM đọc lại nguyên văn câu của em thành lời nhận xét trước lớp.',

  // Nghiệm thu: bốn em có thật sự mở miệng hay khối chốt chỉ là một cái nhãn.
  guard:
    '`verifyTakeaway()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — ĐÚNG MỘT khối "Câu chốt" mỗi phiên ở CUỐI phiên (sau lượt đố thứ ba, trước màn tổng kết), dài ĐÚNG 20 giây, bốn lượt × 5 giây, 12 lượt hỏi bài giữ nguyên và không lượt chốt nào bị tính thành lượt hỏi bài · ba khung câu hiện trên ba nút chọn lấy NGUYÊN VĂN từ `tools/data/takeaways.mjs` theo đúng mạch kiến thức của game, thẻ "Câu chốt" MỘT hàng chữ >= 20px tự tắt sau 6 giây, không bật microphone, không nhận dạng giọng nói, không hiện sẵn đáp án · bốn em đều có một lượt 5 giây, em từ chối được làm động tác thay và không bị gọi lại lần hai, mỗi em giơ 1–3 ngón tay tự đánh giá và mức đó không trừ tim không đổi độ khó · +5 điểm chốt chỉ vào thanh "Cả nhóm" và dòng "Em chốt hôm nay" nằm trong khối "Copy tờ rời". Thiếu điều nào thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản một học sinh, bản không camera, bản tắt tiếng, bản "dép lê" và bản "lớp mình chật" vẫn bắt buộc kiểm đủ bốn điều, vì nói một câu bằng lời của mình không phụ thuộc webcam.',
};

// Dòng rút gọn cho checklist và cho block biến thể.
export const TAKEAWAY_SHORT =
  'ĐÚNG MỘT khối "Câu chốt" mỗi phiên ở CUỐI phiên (sau lượt đố thứ ba, trước màn tổng kết), dài 20 giây = bốn lượt × 5 giây và không tính vào 12 lượt hỏi bài · ba khung câu lấy nguyên văn từ tools/data/takeaways.mjs theo đúng mạch kiến thức của game · ba nút chọn một hàng chữ >= 20px, thẻ "Câu chốt" một hàng >= 20px tự tắt sau 6 giây, không bật microphone, không nhận dạng giọng nói, không hiện sẵn đáp án · bốn em cùng chốt, em từ chối làm một động tác của mã điều khiển thay cho câu nói và không bị gọi lại lần hai · mỗi em giơ 1–3 ngón tay tự đánh giá, không trừ tim, không đổi độ khó · +5 điểm chốt vào "Cả nhóm", không vào "miti-best", tổng kết in "Em chốt hôm nay: <tên> <n> câu" trong khối Copy tờ rời · verifyTakeaway() kiểm lúc nạp';
