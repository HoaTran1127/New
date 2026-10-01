// Sáu quy định "sân chơi Việt Nam" — tầng thứ hai mươi hai của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm chuỗi trong prompts/0X-*/ + tools/lib/ + tools/data/ +
// 6 tài liệu): "dân gian" 0/85 · "đồng dao" 0/85 · "ô ăn quan" 0/85 · "nhảy dây" 0/85 · "kéo co" 0/85 ·
// "rồng rắn" 0/85 · "tập tầm vông" 0/85 · "chi chi chành chành" 0/85 · "kéo cưa lừa xẻ" 0/85 ·
// "thả đỉa ba ba" 0/85 · "bịt mắt bắt dê" 0/85 · "sân trường" 0/85 · "vạch phấn" 0/85 · "viên sỏi" 0/85.
// Chiều ngược lại cũng đã đo: "GO" 0/85, "COMBO" 0/85, "TEAM" 0/85, "SCORE" 0/85 — chữ Tây trên HUD đã bị
// RULES.language chặn từ lâu, nên lỗ hổng của vòng này KHÔNG phải ngôn ngữ mà là KHUNG CHƠI.
//
// Ba chỗ hỏng đo được:
// (1) tools/data/sports.mjs (vòng 18) gán cho mười bốn mã điều khiển mười bốn môn quốc tế — bắn cung, bóng
//     bàn, bóng chuyền, phi tiêu, yoga. Một lớp 45 em ở làng không có cung, không có bàn bóng, không có lưới;
//     sân trường em có đúng vạch phấn, một sợi dây nhảy và vài viên sỏi. Trẻ lớp 4 không hình dung được
//     động tác mình vừa làm là động tác của cái gì, nên "chất thể thao" chỉ là nhãn trang trí.
// (2) Không tầng nào quy định TIẾNG ĐẾM. rhythm.mjs cho BPM, celebrate.mjs cho SFX, identity.mjs cho ba câu
//     thoại — nhưng khoảng trống giữa các nhịp vẫn là beep điện tử. Trong khi đồng dao chính là nhịp tập thể
//     dục của trẻ Việt Nam: mỗi tiếng một nhịp, đếm được, và em thuộc trước khi em biết đọc.
// (3) Không quy định nào về ĐỒ DÙNG. Mô hình vì thế hay đòi em "cầm quả chuyền", "nhặt viên sỏi", "thổi
//     chiếc còi" — ở lớp 45 em tức là phát rồi thu, mất ba phút, và thành chỗ để vi khuẩn đi quanh.
//
// Ràng buộc kế thừa (không đặt số mới): 1 sải tay + hình quạt 90 độ + trần đứng một chân (playzone.mjs),
// 8 nhịp (rhythm.mjs + queue.mjs), trần 128 BPM, ngân sách 3 câu thoại/phút và mỗi câu <= 6 từ (identity.mjs),
// 3 lượt một vai (queue.mjs), "miti-mute" (rhythm.mjs), giọng en-US cho học liệu tiếng Anh (rules.mjs),
// alpha <= 0.45 cho đạo cụ AR (sport.mjs), 12 lượt và trần 8–10 phút (pe.mjs + lesson.mjs).

// Du lieu tro dan gian nam o tools/data/folk.mjs; lay cai ten FOLK duoi day cho tang nay nhu cac tang khac.

export const FOLK = {
  // Khung chơi phải là trò mà em đã chơi thật ở sân, không phải môn thể thao em chỉ thấy trên ti vi.
  chonTro:
    'TRÒ DẪN DẮT: mỗi game mang đúng MỘT trò chơi dân gian lấy NGUYÊN VĂN từ `tools/data/folk.mjs` theo đúng MÃ ĐIỀU KHIỂN của chính game (mười bốn mã, mười bốn trò), gồm tên trò (cột `tro`, <= 4 từ), một dòng cách chơi (cột `loiCho`, <= 8 từ) và loại động hay tĩnh (cột `dieu`). Tên trò xuất hiện ở dòng "Cách chơi" ngay dưới màn chào và ở nhãn mini-trạm, chữ >= 18px, CẤM xuất hiện ở góc HUD trên — chỗ đó thuộc về tên môn thể thao của vòng 18, hai nhãn giành nhau một góc thì em không đọc cái nào cả. CẤM bịa trò không ai chơi, CẤM gọi trò bằng tên chung chung ("vận động cùng bạn", "bài tập tay"), CẤM đổi trò giữa phiên. Không có trò nào trong bảng thì builder báo lỗi, không để mô hình tự chọn.',

  // Đồng dao là nhịp đếm thật của sân trường; beep điện tử thì em không nhớ nổi để hô theo.
  dongDao:
    'LỜI HÔ THEO NHỊP: đúng MỘT dòng chant lấy nguyên văn cột `chant` của `tools/data/folk.mjs` (<= 8 tiếng), vai "Cổ vũ" hô một lần ở ĐẦU mỗi hiệp theo vạch nhịp 8 nhịp của tầng nhạc nền — ba lần một phiên, không hơn. Dòng có cột `loai` = "dong dao" là đồng dao thật, CẤM gọi lời đếm (`loai` = "dem") bằng hai chữ "đồng dao" trước lớp. CẤM thay lời hô bằng beep đếm số, CẤM hô hai dòng liền nhau, CẤM biến chant thành câu hỏi hay thành điều kiện chốt đáp án. Chant do bạn hô nên KHÔNG tính vào ngân sách 3 câu thoại mỗi phút của mascot; mascot vẫn im khi `speechSynthesis` đọc đề. Game Tiếng Anh đổi chant thành đúng MỘT mẫu câu đang luyện (<= 8 từ, đọc giọng en-US), phần động tác giữ nguyên tiếng Việt. Bản "miti-mute" hoặc máy không tiếng thì chant hiện thành chữ trên vạch nhịp, mỗi tiếng sáng lên đúng một nhịp, không nhấp nháy quá 3 lần mỗi giây.',

  // Năm trò sân trường nổi tiếng nhất bị trần an toàn của vòng 21 loại — phải nói rõ, không để game tự bịa lại.
  banAnToan:
    'BẢN TẠI CHỖ: trò dẫn dắt chỉ lấy phần động tác an toàn, mọi lượt vẫn nằm TRONG vòng 1 sải tay và trong hình quạt 90 độ PHÍA TRƯỚC mặt em. Năm trò bị loại thẳng và CẤM dựng lại dưới mọi tên gọi: "Nhảy lò cò" và "Trồng cây chuối" (đòi đứng một chân), "Bịt mắt bắt dê" (che mắt thật trong lúc đi nhanh), "Rồng rắn chạy vòng" (nối đuôi chạy quanh sân), "Kéo co dây thật" (dây căng ngang người). Rồng rắn lên mây CHỈ còn phần hô – đáp, kéo co CHỈ còn bản dây AR do một em kéo về vạch. CẤM mọi động tác nắm tay bạn, đeo tay bạn, cõng bạn hay thổi vào mặt bạn. Chọn "chân đất / dép lê" hoặc bật "Lớp mình chật" ở thẻ "Dẹp chỗ chơi" KHÔNG làm đổi tên trò, chỉ đổi động tác sang bản tại chỗ — và tên trò đổi theo giữa phiên là lỗi, không phải tính năng.',

  // Đồ dùng sân trường là tám món ai cũng có; ngoài tám món đó là game không chơi được ở làng.
  doDung:
    'ĐỒ DÙNG: mỗi game gọi đúng MỘT đồ dùng sân trường bằng NGUYÊN VĂN một phần tử trong tám món của `FOLK_PROPS` (vạch phấn · dây nhảy · khăn vải · viên sỏi · gậy tre · quả cầu giấy · túi đậu · vòng tròn), lấy từ cột `doDung`, vẽ bằng đạo cụ AR một màu, không che đề bài (alpha <= 0.45 theo trần đạo cụ AR). CẤM đòi em cầm, nhặt, bốc, thổi, đội hay truyền tay vật thật ở mọi lượt trong 12 lượt — lớp 45 em thì phát và thu đồ là hết nửa tiết, và đó là chỗ vi khuẩn đi quanh. CẤM đồ dùng trường làng không có: ván trượt, giày patin, dơi bóng chày, lưới tennis, bóng rổ có bảng, gậy golf, cung tên thật. Đồ dùng không nằm trong tám món thì builder dừng, không để mô hình tự đặt tên.',

  // Máy một em chơi thì em khác chờ; trò đôi bạn phải dịch được sang đúng bốn em một máy.
  doiBan:
    'TRÒ ĐÔI BẠN TRÊN MỘT MÁY: trò nào gốc cần hai người thì bản chơi là HAI em đứng cạnh nhau cùng làm động tác tại chỗ, hai em còn lại giữ vai chờ theo tầng vai chờ và ĐỔI vai sau mỗi 3 lượt — vẫn đúng trần 3 lượt một vai, không lượt nào biến thành lượt xem. CẤM đòi thêm bạn ngoài lớp, CẤM đòi ra hành lang hoặc xuống sân để đủ người chơi, CẤM chờ đủ bốn em mới cho bắt đầu. Bản một học sinh: chính em hô chant bằng nút "Hô cùng bạn" hoặc tự đọc, HUD vai chờ ẩn hẳn, game vẫn trọn 12 lượt. Màn tổng kết in ĐÚNG MỘT dòng "Trò chơi hôm nay: <tên trò> — bản <động/tĩnh> tại chỗ" nằm trong khối mà nút "Copy tờ rời" copy được, để cô nối được game vào tiết Thể dục mục "Ôn trò chơi vận động"; CẤM in dòng đó khi phiên không có cú hô chant nào.',

  // Nghiệm thu: khung chơi Việt Nam có thật hay chỉ là một cái tên trang trí.
  guard:
    '`verifyFolk()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — trò dẫn dắt lấy NGUYÊN VĂN từ `tools/data/folk.mjs` theo đúng mã điều khiển của game, tên <= 4 từ hiện ở dòng "Cách chơi" và nhãn mini-trạm, không giành góc HUD của tên môn · chant lấy nguyên văn cột `chant` (<= 8 tiếng), hô đúng BA lần một phiên theo vạch nhịp 8 nhịp, bản tắt tiếng còn chữ trên vạch nhịp, và không lời đếm nào bị gọi là "đồng dao" · đồ dùng là đúng MỘT trong tám món `FOLK_PROPS` và không một lượt nào trong 12 lượt đòi em cầm vật thật · không trò nào thuộc năm trò đã loại ("Nhảy lò cò", "Trồng cây chuối", "Bịt mắt bắt dê", "Rồng rắn chạy vòng", "Kéo co dây thật") xuất hiện, mọi động tác nằm trong vòng 1 sải tay và bản dép lê / lớp chật vẫn giữ đúng tên trò. Thiếu điều nào thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản không camera, bản một học sinh và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều, vì sân chơi và lời hô không phụ thuộc webcam.',
};

// Dòng rút gọn cho checklist và cho block biến thể.
export const FOLK_SHORT =
  'trò dân gian dẫn dắt lấy nguyên văn từ tools/data/folk.mjs theo đúng mã điều khiển (tên <= 4 từ, dòng "Cách chơi" + nhãn mini-trạm >= 18px, không giành góc HUD của tên môn) · chant <= 8 tiếng hô đúng BA lần một phiên theo vạch nhịp 8 nhịp, lời đếm cấm gọi là đồng dao, game Tiếng Anh thay bằng một mẫu câu <= 8 từ giọng en-US, bản tắt tiếng hiện chữ trên vạch nhịp · năm trò bị loại (nhảy lò cò, trồng cây chuối, bịt mắt bắt dê, rồng rắn chạy vòng, kéo co dây thật) cấm dựng lại, mọi động tác trong 1 sải tay, dép lê và lớp chật chỉ đổi động tác không đổi tên trò · đúng MỘT đồ dùng trong tám món FOLK_PROPS vẽ AR alpha <= 0.45, cấm đòi cầm vật thật · trò đôi bạn chơi bằng hai em cạnh nhau, đổi vai sau 3 lượt, tổng kết in "Trò chơi hôm nay: <trò> — bản tại chỗ" trong khối "Copy tờ rời" · verifyFolk() kiểm lúc nạp';


