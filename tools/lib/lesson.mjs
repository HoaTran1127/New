// Mười hai quy định của CÔNG CỤ GIẢNG BÀI: giáo viên trình bày, cả lớp xem.
// Đây là tầng tách hẳn khỏi tools/lib/feel.mjs (vận động to + cảm giác arcade của game học sinh).
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: một file HTML sinh ra từ prompt game và một file sinh ra từ prompt giáo án
// dùng chung bảng phấn và vật thật, nhưng KHÁC NHAU về nhịp và về động cơ. Game cần hồi hộp:
// tim, điểm, combo, đồng hồ đếm ngược, giật màn hình. Tiết giảng bài cần NGƯỢC LẠI hoàn toàn —
// nếu mang cơ chế game vào bảng phấn thì:
//   - cả lớp 35 em ngồi xem một em trên bảng mà vẫn bị trừ tim, nên em đó sợ sai hơn là muốn hiểu;
//   - nhịp game tự chuyển bước sau vài giây, trong khi giáo viên cần dừng lại giảng đúng chỗ đó;
//   - HandLandmarker bắt pinch của bất kì em nào ngồi dưới, nên bảng bị vẽ bậy từ xa;
//   - bảng tự lau sau mỗi lượt, mất luôn phần trình bày giáo viên muốn cả lớp nhìn lại.
// Vì vậy tám quy định này KHÔNG phải bản sao của feel.mjs mà là bản đối lập có chủ đích.
//
// Nguồn tham chiếu cho hướng thiết kế (đã kiểm chứng, không bịa số liệu): khung
// Concrete-Representational-Abstract dùng cho trình tự các bước giảng; nghiên cứu về mỏi tay
// khi tương tác bằng cử chỉ kéo dài ("gorilla arm") dùng cho quy định nhịp nghỉ. Chi tiết
// hai nguồn này nằm trong chú thích của tools/lib/chalk.mjs và tools/data/props.mjs.
//
// VÒNG 2 (2026-09-30) — bốn lỗ tìm được bằng grep trên chính 39 file prompts/giao-an/:
//   1. MÂU THUẪN CỠ CHỮ: cùng một file giáo án chứa "chữ phấn >= 40 px" của LESSON.teacher
//      và "chữ phấn >= 34 px trên desktop" mà nó in nguyên văn từ CHALK.board. Hai sàn khác
//      nhau, mô hình không biết nghe ai → boardText ra đời để tuyên bố quyền ưu tiên, và
//      teacher bỏ hết con số px của mình.
//   2. MÂU THUẪN CỠ BẢNG: "bảng to <= 68% khung hình" (CHALK.board) đứng cạnh
//      "bảng chiếm >= 70% màn chiếu" (LESSON.teacher) trong cùng file → cùng cách giải quyết.
//   3. HARDENING CỦA MAIN CHƯA LAN SANG GIÁO ÁN: verifyQuestionBank() được bắt buộc ở 85 prompt
//      game nhưng 0/39 giáo án nhắc tới, dù giáo án cũng có ngân hàng LESSON_DATA riêng →
//      build-lessons.mjs now in nguyên văn 5 quy định của tools/lib/verify.mjs.
//   4. BIỂU QUYẾT KHÔNG CHẠY ĐƯỢC VỚI ĐÁP ÁN KHÔNG PHẢI SỐ: classVote bắt "giơ số ngón tay
//      bằng đáp án mình chọn", trong khi LESSON_DATA của chính GA4-19 có đáp án "3/8", "8/3",
//      "7/5" → voteMap ánh xạ 1-4 ngón thành nhãn A-D và buộc thẻ đáp án mang nhãn in hoa.
//   Ngoài ra: flow chỉ nói "tổng 15-20 phút" mà không khớp với tiết 35 phút của tiểu học,
//   nên phần còn lại của tiết vô định; và classVote thu thập dữ liệu mà không trả lại quyết
//   định sư phạm cụ thể → diagnose gom theo errorTag và trỏ về đúng chặng CRA.
//
// VÒNG 3 (2026-09-30) — đếm trên chính 39 file prompts/giao-an/: "bộ xương" 0/39, trạng thái
// nhận diện hiển thị cho cả lớp 0/39, "hiển thị ảnh camera" 0/39. handCare có nói "mất tay quá
// 500 ms thì đóng băng nét" và teacher có nói camera là phần thêm vào, nhưng KHÔNG quy định nào
// bắt màn chiếu cho thấy máy đang thấy gì. Trong lớp thật: em lên bảng giơ tay trước màn chiếu
// mà cả lớp không biết viên phấn ảo ở đâu, tay đã được gán chưa, vì sao nét không ra — giáo viên
// phải quay lại giải thích bằng miệng, hỏng đúng cái tiết AR đem lại. recog biến câu hỏi
// "camera có thấy tay em không" thành thứ nhìn thấy được, kèm độ trễ đo thật thay cho cảm giác.
// Cung vòng này: khối AR của game bị in thẳng vào 39 giáo án (xem chú thích tools/lib/ar.mjs) → AR_LESSON.

export const LESSON = {
  // Giáo viên là người cầm lái; camera chỉ là công cụ phụ, không phải điều kiện để dạy.
  teacher:
    'CHẾ ĐỘ GIÁO VIÊN TRÌNH BÀY, CẢ LỚP XEM: giao diện mặc định là màn chiếu 16:9 và bảng phấn chiếm >= 70% diện tích màn chiếu, phần còn lại là dải điều khiển hẹp ở mép dưới. Cỡ chữ viết phấn và cỡ bảng theo đúng QUY ĐỊNH ƯU TIÊN CỞ CHỮ CỠ BẢNG (xem quy định boardText): chế độ giảng bài có sàn chữ riêng tính theo khoảng cách em cuối lớp, không dùng sàn 34 px của game. Giáo viên điều khiển ĐƯỢC TOÀN BỘ bài giảng bằng chuột và bàn phím mà không cần camera: phím cách hoặc nút "Bước tiếp" để sang bước, mũi tên trái để lùi, R để phát lại bước hiện tại, E để lau, S để lưu bảng. Camera chỉ bật khi giáo viên bấm "Mời em lên bảng"; có nút "Ẩn camera" để màn chiếu chỉ còn bảng phấn cho cả lớp nhìn, và nút "Bật camera" để soi thao tác tay. Không có camera thì bài giảng vẫn chạy trọn vẹn 100% nội dung — camera là phần thêm vào, không phải phần bắt buộc.',

  // Chữ 34 px của game là đọc ổn trước webcam, nhưng là chữ mù trên màn chiếu cuối phòng.
  boardText:
    'QUYỀN ƯU TIÊN CỠ CHỮ VÀ CỠ BẢNG KHI GIẢNG BÀI: khi chạy ở chế độ giáo viên trình bày thì mọi con số cỡ của bản game trong cùng file — trần "bảng chữ L <= 40% khung hình", trần "bảng to <= 68% khung hình" và sàn "chữ phấn 34 px desktop / 24 px điện thoại" — ĐỨNG HƯU, thay bằng mức của chế độ giảng bài: mặt bảng chiếm >= 70% diện tích màn chiếu, chữ phấn cao >= 50 px, nhãn số cạnh vật >= 40 px, chữ trên thẻ đáp án >= 44 px, nhãn bước trên thanh tiến trình >= 36 px. Không lấy các mức đó làm hằng số cứng: khi mở bài, bảng hỏi một chạm "em ngồi cuối lớp cách màn chiếu mấy mét?" (mặc định 8 mét, giáo viên sửa được) rồi tính chiều cao chữ tối thiểu theo công thức khoảng cách (mét) x 0.7 chia 100, đơn vị centimét, và tự đổi centimét ra px theo bề rộng thật của màn chiếu đang phát. Ví dụ lớp 8 mét thì chữ phải cao >= 5.6 cm; trên màn chiếu 65 inch có bề rộng 143 cm phát khung 1280 px thì 5.6 cm tương đương >= 50 px. Dải điều khiển luôn hiện một dòng tự kiểm "chữ cao X cm · em cuối lớp Y mét · ĐẠT hoặc CHƯA ĐẠT"; khi CHƯA ĐẠT thì bảng tự phóng toàn bộ chữ phấn lên đủ mức chứ không để giáo viên chỉnh từng chỗ, và sau khi phóng thì dòng tự kiểm phải cập nhật lại số đo.',


  // Đối lập có chủ đích với feel.mjs: không một cơ chế game nào được lọt vào tiết giảng bài.
  noGame:
    'KHÔNG cơ chế game nào trong tiết giảng bài: không tim, không mạng, không điểm số, không chuỗi combo, không bảng xếp hạng, không thẻ vàng nhân đôi, không đồng hồ đếm ngược gây áp lực, không hit-stop, không giật màn hình, không mascot ăn mừng và không màn "thua cuộc". Âm thanh chỉ dùng để xác nhận một thao tác đã nhận: một tiếng "tách" ngắn không quá 120 ms khi chốt, một tiếng "soạt" khi cắt vật, và không có nhạc nền. Sai thì KHÔNG có hiệu ứng tiêu cực nào — chỉ có một dòng phấn đỡ bằng chữ và giẻ lau xoá đúng dòng đó. Nút "Hiện chữ" bật phụ đề cho mọi âm thanh và mặc định là BẬT, vì phòng học có máy chiếu thì loa thường rè.',

  // Nhịp của tiết giảng chậm hơn nhịp game và do giáo viên quyết định, không do đồng hồ quyết định.
  pace:
    'NHỊP GIẢNG DO GIÁO VIÊN QUYẾT ĐỊNH: mọi bước dừng lại và CHỜ cho tới khi giáo viên bấm "Bước tiếp", không có bất kì khoảng thời gian chờ nào làm bài tự chuyển. Mọi chuyển động dựng cảnh (vật hiện ra, mảnh cắt tách ra, sơ đồ tự kẻ) kéo dài >= 600 ms thay vì tốc độ nhanh của game, và có một nút đổi tốc độ 0.5x / 1x / 1.5x đặt ở mép dưới. Có nút "Phát lại bước này" chạy lại đúng thao tác của bước hiện tại trong tối đa 8 giây, phát lại được không giới hạn số lần và KHÔNG bị tính là làm lại hay làm sai. Có nút "Lùi một bước" để quay lại sửa, và lùi bước thì phần đã viết đúng phía trên vẫn được giữ nguyên.',

  // Năm bước của một giáo án, có ngân sách phút khớp với một tiết 35 phút của tiểu học.
  flow:
    'NĂM BƯỚC CỦA MỘT GIÁO ÁN, nằm trong một tiết 35 phút (mặc định của tiểu học Việt Nam, giáo viên đổi được thành 40 phút): phần giảng theo mạch năm bước chiếm 15 đến 20 phút đầu, còn lại là luyện tập và chốt bài, nên ngân sách mỗi bước phải hiển thị cả hai con số "phút của bước" và "phút còn lại của tiết". (1) KHỞI ĐỘNG 2-3 phút — đặt một câu hỏi gắn với vật thật và chưa viết gì lên bảng; (2) VẬT THẬT 4-5 phút — thao tác tay trên vật đếm được, chưa có phép tính; (3) SƠ ĐỒ 3-4 phút — học sinh tự tay dựng biểu diễn bán cụ thể nối với vật vừa thao tác; (4) PHÉP TÍNH 3-4 phút — viết phép tính và nối mỗi con số ngược về sơ đồ; (5) LUYỆN TẬP CHUNG 3-4 phút — cả lớp làm một bài cùng dạng trên bảng. Mép trên màn chiếu có một thanh tiến trình ghi rõ "bước 3/5 · SƠ ĐỒ · còn 12 phút của tiết 35 phút" và giáo viên kéo được từng mốc để đổi ngân sách theo lớp mình; hết ngân sách thì thanh đổi sang chữ "quá giờ" chứ không tự cắt bài và không có tiếng báo hiệu nào. Không được gộp bước, không được bỏ bước 3 vì đó là bước hay bị bỏ nhất.',

  // Một em lên bảng, cả lớp vẫn theo dõi được: chuyển quyền phải nhanh, tường minh và trả lại được.
  handover:
    'NÚT "MỜI EM LÊN BẢNG": chuyển quyền điều khiển bằng tay cho một học sinh trong tối đa 5 giây kể từ lúc bấm. Hàng đợi tối đa 4 em hiện thành 4 ô trống ở mép dưới, giáo viên chạm vào một ô để ghi tên hoặc để trống; em đang cầm quyền có viền sáng quanh ô của mình. Lúc chuyển quyền, hệ thống GHI vị trí cổ tay (landmark 0) của bàn tay được gán và chỉ bàn tay đó viết và kéo được; mọi thao tác của em đó không bị chấm điểm và không hiện chữ đúng hay sai bằng màu — chỉ có dòng phấn đỡ nếu em dừng quá 20 giây. Trả quyền cho giáo viên bằng nút "Trả quyền", hoặc TỰ ĐỘNG sau 3 giây không có thao tác nào khi giáo viên đã bấm "Xong lượt em này". Một tiết có tối đa 12 lượt lên bảng, quá số đó thì nút tạm khoá kèm dòng chữ "để dành lượt cho tiết sau".',

  // Lớp 35 em: camera sẽ thấy rất nhiều bàn tay, và phần lớn số đó không được phép vẽ lên bảng.
  strayHands:
    'BỎ QUA BÀN TAY LẠ TRONG LỚP ĐÔNG: HandLandmarker chạy maxNumHands: 2 ở chế độ giảng bài. Một bàn tay chỉ có quyền vẽ khi gốc cổ tay (landmark 0) của nó nằm TRONG vùng bảng phấn cộng thêm 10% đệm mỗi phía; mọi bàn tay có gốc ngoài vùng đó bị bỏ qua hoàn toàn, kể cả khi đang pinch — nhờ vậy em ngồi dưới giơ tay phát biểu không vẽ bậy lên bảng được. Nếu có nhiều hơn một bàn tay nằm trong vùng bảng thì bảng TẠM KHOÁ nét vẽ và hiện một dòng phấn "cô giáo chọn tay nào viết" cùng hai ô chạm để giáo viên chỉ định, chứ hệ thống không tự đoán. Chỉ bàn tay đã được gán mới lau được bảng; nút "Lau" của giáo viên luôn hoạt động bằng chuột.',

  // Cả lớp trả lời cùng lúc bằng ngón tay, và kết quả dùng để giáo viên quyết định giảng lại chỗ nào.
  classVote:
    'CẢ LỚP TRẢ LỜI BẰNG NGÓN TAY: giáo viên bấm "Cả lớp trả lời" thì mọi học sinh giơ số ngón tay bằng đáp án mình chọn trong một cửa sổ 5 giây; HandLandmarker đếm số bàn tay theo từng nhóm đáp án và hiện kết quả thành các cột chấm tròn, mỗi cột một đáp án, chiều cao cột đúng bằng số em chọn. Camera một máy chỉ thấy được một phần lớp nên BẮT BUỘC có dòng chữ ghi rõ "camera thấy N em" và có nút "thêm 5 em" / "bớt 5 em" cho mỗi đáp án để giáo viên cộng tay số em ở hai bên hông phòng. Kết quả biểu quyết KHÔNG nêu tên em nào, KHÔNG xếp hạng, KHÔNG dùng để tính điểm; nó chỉ hiện ra để giáo viên quyết định giảng lại chỗ nào — nếu cột đáp án sai cao hơn 1/3 tổng số em thì bảng tự gợi ý một dòng "nên giảng lại bước SƠ ĐỒ" kèm nút nhảy về đúng bước đó.',

  // Đáp án Toán thường là phân số hoặc một câu chữ: đếm ngón theo GIÁ TRỊ đáp án là không dùng được.
  voteMap:
    'Biểu quyết bằng số ngón tay theo NHÃN đáp án chứ không theo giá trị đáp án: khi bấm "Cả lớp trả lời", màn chiếu hiện một bảng đối chiếu to >= 60 px — 1 ngón là A, 2 ngón là B, 3 ngón là C, 4 ngón là D, nắm bàn tay là "em chưa chắc". Quy định này bắt buộc vì đáp án Toán hay là phân số, số đo hoặc một mệnh đề, không phải lúc nào cũng đếm ngón mà ra được; nếu bài chỉ có 3 phương án thì hàng D phải gạch chéo kèm chữ "không có đáp án D" để không em nào giơ bốn ngón vì tưởng rằng được chọn. Mỗi thẻ đáp án trên bảng mang đúng một nhãn in hoa A, B, C, D cao >= 44 px và một lượt có tối đa 4 thẻ. Trong cửa sổ 5 giây, mỗi cột kết quả ghi kèm "camera thấy N em"; bàn tay giơ từ 5 ngón trở lên, hoặc số ngón đổi liên tục trong 500 ms cuối thì cột đó hiện chữ "không rõ" chứ hệ thống không tự đoán. Em ngồi cuối phòng ngoài tầm camera được giáo viên cộng bằng nút "thêm 5 em" / "bớt 5 em" ở từng cột, và số cộng tay đó hiện bằng chữ mờ khác với số đếm tự động để không ai tưởng đó là kết quả máy đếm.',

  // Cả lớp sai hàng loạt là dữ liệu dạy học, nhưng phải quay về đúng chặng CRA chứ không phải thành điểm.
  diagnose:
    'Bảng chẩn đoán cuối tiết, chỉ hiện trên dải điều khiển của giáo viên và KHÔNG chiếu lên bảng lớp: cuối tiết gom toàn bộ lượt trả lời của cả lớp theo errorTag rồi hiện tối đa 5 hàng, mỗi hàng là "lỗi bằng tiếng Việt · số em · tỉ lệ trên số em camera thấy · một nút Giảng lại" (ví dụ "đảo tử số và mẫu số · 14 em · 45%" ). Nút Giảng lại phải nhảy về ĐÚNG chặng đã sinh ra lỗi đó chứ không nhảy về đầu bài: lỗi viết số không nối được về sơ đồ thì nhảy về chặng SƠ ĐỒ, lỗi đặt tính và tính sai thì nhảy về chặng PHÉP TÍNH, lỗi hiểu nhầm đề thì nhảy về bước dựng cảnh của bài toán đố. TUYỆT ĐỐI không nêu tên học sinh, không xếp hạng em nào, không ghi kết quả biểu quyết vào hồ sơ nào đọc lại được sau tiết; muốn giữ thì giáo viên bấm "In bảng chẩn đoán" và bản in chỉ có số đếm. Cuối bảng có dòng "Tiết sau nên:" để giáo viên tự gõ, bên dưới là một câu gợi ý do bảng viết dựa trên lỗi nhiều nhất, hiện trong ngoặc và ghi rõ là gợi ý.',
  retain:
    'BẢNG KHÔNG BAO GIỜ TỰ LAU: mọi nét phấn của bước trước còn nguyên khi sang bước sau, và cả năm bước của giáo án cộng lại thành một trang bảng hoàn chỉnh để cuối tiết cả lớp nhìn lại mạch bài. Chỉ giáo viên lau được, bằng nút "Lau", bằng phím E hoặc bằng nắm bàn tay đã gán; em lên bảng chỉ lau được dòng mình vừa viết sai. Khi bảng đầy thì mở MỘT TRANG BẢNG MỚI và giữ trang cũ trong danh sách tối đa 8 trang ở mép dưới, có nút quay lại từng trang và nút "Gộp tất cả trang" để xem cả tiết trên một dải cuộn dọc. Có nút "In bảng" xuất ra bản in nền trắng chữ đen qua Ctrl+P, và trang in phải đọc được mà không cần màu. Nút "Lưu bảng" ghi lại toàn bộ trang vào localStorage theo quy định lưu bảng, để tiết sau giáo viên mở ra dạy tiếp.',

  // Không có phản hồi thì cả lớp không biết camera có thấy tay em trên bảng hay không: em đứng trước
  // màn chiếu sẽ đoán mò, và giáo viên mất luôn đúng thứ tiết AR này sinh ra để đưa cho lớp nhìn.
  recog:
    'PHẢN HỒI NHẬN DIỆN HIỆN LÊN MÀN CHIẾU cho cả lớp cùng thấy, vì người cầm lái là giáo viên nhưng người bị camera "read" là em đứng trước bảng: trong panel soi tay bắt buộc có (a) BỘ XƯƠNG bàn tay đã được gán — đủ 21 khớp, chấm khớp đường kính 6 px, nối xương 3 px, hai đầu ngón pinch (landmark 4 và 8) vẽ to 9 px và viền sáng lên đúng lúc đang pinch; bàn tay bị bộ quy định strayHands lọc thì KHÔNG vẽ bộ xương và cũng không khoanh đỏ, để không em nào bị chỉ trước lớp; (b) TRẠNG THÁI bằng chữ tiếng Việt in đậm cao >= 32 px, đổi theo hai tín hiệu chữ + hình chứ không chỉ bằng màu, trong bốn trạng thái "CHƯA CHỌN TAY" / "ĐANG NHẬN DIỆN" / "ĐÃ PINCH — em đang viết" / "MẤT TAY — em đưa tay vào vùng bảng"; (c) SỐ ĐO THẬT chứ không phải nhãn trang trí: "độ trễ X ms" lấy từ performance.now() giữa khung hình camera và khung hình vẽ nét, "camera thấy N bàn tay", "Nét đang viết: dài Y cm"; (d) khi độ trễ vượt 150 ms thì hiện thêm dòng "bảng đang chậm, cô trò mình dùng chuột được" và tiết học chạy tiếp bình thường, không được đơ, không được bắt em trên bảng làm lại. Bộ xương và trạng thái chỉ nằm trong panel, không vẽ lên mặt bảng. Ở chế độ không camera thì panel ẩn hẳn, không để ô đen chữ "không có camera". Trong chế độ Giảm hiệu ứng thì bộ xương, trạng thái và số đo độ trễ VẪN hiện đầy đủ vì đó là thông tin vận hành chứ không phải hiệu ứng.',
};

// Dòng rút gọn dùng cho checklist tự kiểm của mỗi giáo án.
export const LESSON_SHORT =
  'giáo viên trình bày trên màn chiếu 16:9, điều khiển trọn bài bằng chuột và bàn phím, camera chỉ bật khi mời em lên bảng · quyền ưu tiên cỡ giảng bài: bảng >= 70% màn chiếu, chữ phấn >= 50 px và tính lại theo khoảng cách em cuối lớp (mét x 0.7 chia 100, tính ra cm), có dòng tự kiểm ĐẠT / CHƯA ĐẠT · không tim, không điểm, không combo, không xếp hạng, không đồng hồ gây áp lực, không hit-stop, không giật màn hình · mọi bước chờ giáo viên bấm "Bước tiếp", dựng cảnh >= 600 ms, có phát lại bước tối đa 8 giây không giới hạn lần · năm bước Khởi động - Vật thật - Sơ đồ - Phép tính - Luyện tập chung trong tiết 35 phút, có thanh tiến trình kéo được · "Mời em lên bảng" chuyển quyền trong 5 giây, hàng đợi 4 em, ghi vị trí cổ tay landmark 0, tối đa 12 lượt một tiết · maxNumHands: 2 và bỏ qua mọi bàn tay có gốc ngoài vùng bảng cộng 10% đệm, nhiều tay trong bảng thì tạm khoá và hỏi giáo viên · biểu quyết 1 ngón A / 2 ngón B / 3 ngón C / 4 ngón D, nắm tay là chưa chắc, thẻ đáp án mang nhãn in hoa >= 44 px, ghi rõ camera thấy N em · bảng chẩn đoán cuối tiết theo errorTag, mỗi lỗi trỏ về đúng chặng CRA, không nêu tên và không xếp hạng · bảng không bao giờ tự lau, tối đa 8 trang, có nút in nền trắng chữ đen · panel soi tay hiện đủ 21 khớp (chấm 6 px, xương 3 px, ngón pinch 9 px) cho riêng bàn tay đã gán, trạng thái CHƯA CHỌN TAY / ĐANG NHẬN DIỆN / ĐÃ PINCH / MẤT TAY và độ trễ ms đo thật, vượt 150 ms thì báo và chạy tiếp bằng chuột';
