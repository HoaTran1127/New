// Mười một quy định của CÔNG CỤ GIẢNG BÀI: giáo viên trình bày, cả lớp xem.
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
// Vì vậy mười một quy định này KHÔNG phải bản sao của feel.mjs mà là bản đối lập có chủ đích.
//
// Ba quy định đầu tiên (teacher, noGame, pace) giữ nhịp của tiết học; năm quy định giữa
// (flow, handover, strayHands, classVote, retain) lo chuyện 35 em cùng xem một bảng; ba quy định
// cuối (backRow, noNetwork, verifyData) thêm ở vòng 2026-09-30 sau khi đọc lại 39 giáo án đã sinh:
//   - 2/39 giáo án nhắc tới chuyện ngồi cuối lớp — cỡ chữ được quy định bằng px trên màn hình
//     của cô giáo, trong khi thứ cần bảo đảm là mắt một em cách màn chiếu 7-8 m;
//   - 0/39 có bất kì quy định nào về mất mạng — CDN chết thì màn chờ chiếm cả tiết dạy, và
//     mạng trường ở Việt Nam đứt là chuyện thường;
//   - 0/39 kiểm chứng LESSON_DATA — cùng lỗ hổng mà verify.mjs vừa bịt cho game, nhưng ở giáo án
//     thì hậu quả nặng hơn: một mục sai cô đọc trước 35 em, cả lớp học sai theo.
//
// Nguồn tham chiếu cho hướng thiết kế (đã kiểm chứng, không bịa số liệu): khung
// Concrete-Representational-Abstract dùng cho trình tự các bước giảng; nghiên cứu về mỏi tay
// khi tương tác bằng cử chỉ kéo dài ("gorilla arm") dùng cho quy định nhịp nghỉ. Chi tiết
// hai nguồn này nằm trong chú thích của tools/lib/chalk.mjs và tools/data/props.mjs.

export const LESSON = {
  // Giáo viên là người cầm lái; camera chỉ là công cụ phụ, không phải điều kiện để dạy.
  teacher:
    'CHẾ ĐỘ GIÁO VIÊN TRÌNH BÀY, CẢ LỚP XEM: giao diện mặc định là màn chiếu 16:9 và bảng phấn chiếm >= 70% diện tích màn chiếu, phần còn lại là dải điều khiển hẹp ở mép dưới. Chữ viết bằng phấn trên bảng cao >= 40 px (lớn hơn mức 34 px của game) và chữ trên thẻ đáp án cao >= 32 px, vì người đọc đứng ở cuối phòng chứ không đứng trước camera. Giáo viên điều khiển ĐƯỢC TOÀN BỘ bài giảng bằng chuột và bàn phím mà không cần camera: phím cách hoặc nút "Bước tiếp" để sang bước, mũi tên trái để lùi, R để phát lại bước hiện tại, E để lau, S để lưu bảng. Camera chỉ bật khi giáo viên bấm "Mời em lên bảng"; có nút "Ẩn camera" để màn chiếu chỉ còn bảng phấn cho cả lớp nhìn, và nút "Bật camera" để soi thao tác tay. Không có camera thì bài giảng vẫn chạy trọn vẹn 100% nội dung — camera là phần thêm vào, không phải phần bắt buộc.',

  // Đối lập có chủ đích với feel.mjs: không một cơ chế game nào được lọt vào tiết giảng bài.
  noGame:
    'KHÔNG cơ chế game nào trong tiết giảng bài: không tim, không mạng, không điểm số, không chuỗi combo, không bảng xếp hạng, không thẻ vàng nhân đôi, không đồng hồ đếm ngược gây áp lực, không hit-stop, không giật màn hình, không mascot ăn mừng và không màn "thua cuộc". Âm thanh chỉ dùng để xác nhận một thao tác đã nhận: một tiếng "tách" ngắn không quá 120 ms khi chốt, một tiếng "soạt" khi cắt vật, và không có nhạc nền. Sai thì KHÔNG có hiệu ứng tiêu cực nào — chỉ có một dòng phấn đỡ bằng chữ và giẻ lau xoá đúng dòng đó. Nút "Hiện chữ" bật phụ đề cho mọi âm thanh và mặc định là BẬT, vì phòng học có máy chiếu thì loa thường rè.',

  // Nhịp của tiết giảng chậm hơn nhịp game và do giáo viên quyết định, không do đồng hồ quyết định.
  pace:
    'NHỊP GIẢNG DO GIÁO VIÊN QUYẾT ĐỊNH: mọi bước dừng lại và CHỜ cho tới khi giáo viên bấm "Bước tiếp", không có bất kì khoảng thời gian chờ nào làm bài tự chuyển. Mọi chuyển động dựng cảnh (vật hiện ra, mảnh cắt tách ra, sơ đồ tự kẻ) kéo dài >= 600 ms thay vì tốc độ nhanh của game, và có một nút đổi tốc độ 0.5x / 1x / 1.5x đặt ở mép dưới. Có nút "Phát lại bước này" chạy lại đúng thao tác của bước hiện tại trong tối đa 8 giây, phát lại được không giới hạn số lần và KHÔNG bị tính là làm lại hay làm sai. Có nút "Lùi một bước" để quay lại sửa, và lùi bước thì phần đã viết đúng phía trên vẫn được giữ nguyên.',

  // Năm bước của một giáo án, có ngân sách phút cho từng bước để giáo viên canh giờ tiết dạy.
  flow:
    'NĂM BƯỚC CỦA MỘT GIÁO ÁN, tổng ngân sách 15 đến 20 phút: (1) KHỞI ĐỘNG 2-3 phút — đặt một câu hỏi gắn với vật thật và chưa viết gì lên bảng; (2) VẬT THẬT 4-5 phút — thao tác tay trên vật đếm được, chưa có phép tính; (3) SƠ ĐỒ 3-4 phút — học sinh tự tay dựng biểu diễn bán cụ thể nối với vật vừa thao tác; (4) PHÉP TÍNH 3-4 phút — viết phép tính và nối mỗi con số ngược về sơ đồ; (5) LUYỆN TẬP CHUNG 3-4 phút — cả lớp làm một bài cùng dạng trên bảng. Mép trên màn chiếu có một thanh tiến trình ghi rõ "bước 3/5 · SƠ ĐỒ · còn 12 phút" và giáo viên kéo được từng mốc để đổi ngân sách theo lớp mình; hết ngân sách thì thanh đổi sang chữ "quá giờ" chứ không tự cắt bài. Không được gộp bước, không được bỏ bước 3 vì đó là bước hay bị bỏ nhất.',

  // Một em lên bảng, cả lớp vẫn theo dõi được: chuyển quyền phải nhanh, tường minh và trả lại được.
  handover:
    'NÚT "MỜI EM LÊN BẢNG": chuyển quyền điều khiển bằng tay cho một học sinh trong tối đa 5 giây kể từ lúc bấm. Hàng đợi tối đa 4 em hiện thành 4 ô trống ở mép dưới, giáo viên chạm vào một ô để ghi tên hoặc để trống; em đang cầm quyền có viền sáng quanh ô của mình. Lúc chuyển quyền, hệ thống GHI vị trí cổ tay (landmark 0) của bàn tay được gán và chỉ bàn tay đó viết và kéo được; mọi thao tác của em đó không bị chấm điểm và không hiện chữ đúng hay sai bằng màu — chỉ có dòng phấn đỡ nếu em dừng quá 20 giây. Trả quyền cho giáo viên bằng nút "Trả quyền", hoặc TỰ ĐỘNG sau 3 giây không có thao tác nào khi giáo viên đã bấm "Xong lượt em này". Một tiết có tối đa 12 lượt lên bảng, quá số đó thì nút tạm khoá kèm dòng chữ "để dành lượt cho tiết sau".',

  // Lớp 35 em: camera sẽ thấy rất nhiều bàn tay, và phần lớn số đó không được phép vẽ lên bảng.
  strayHands:
    'BỎ QUA BÀN TAY LẠ TRONG LỚP ĐÔNG: HandLandmarker chạy maxNumHands: 2 ở chế độ giảng bài. Một bàn tay chỉ có quyền vẽ khi gốc cổ tay (landmark 0) của nó nằm TRONG vùng bảng phấn cộng thêm 10% đệm mỗi phía; mọi bàn tay có gốc ngoài vùng đó bị bỏ qua hoàn toàn, kể cả khi đang pinch — nhờ vậy em ngồi dưới giơ tay phát biểu không vẽ bậy lên bảng được. Nếu có nhiều hơn một bàn tay nằm trong vùng bảng thì bảng TẠM KHOÁ nét vẽ và hiện một dòng phấn "cô giáo chọn tay nào viết" cùng hai ô chạm để giáo viên chỉ định, chứ hệ thống không tự đoán. Chỉ bàn tay đã được gán mới lau được bảng; nút "Lau" của giáo viên luôn hoạt động bằng chuột.',

  // Cả lớp trả lời cùng lúc bằng ngón tay, và kết quả dùng để giáo viên quyết định giảng lại chỗ nào.
  classVote:
    'CẢ LỚP TRẢ LỜI BẰNG NGÓN TAY: giáo viên bấm "Cả lớp trả lời" thì mọi học sinh giơ số ngón tay bằng đáp án mình chọn trong một cửa sổ 5 giây; HandLandmarker đếm số bàn tay theo từng nhóm đáp án và hiện kết quả thành các cột chấm tròn, mỗi cột một đáp án, chiều cao cột đúng bằng số em chọn. Camera một máy chỉ thấy được một phần lớp nên BẮT BUỘC có dòng chữ ghi rõ "camera thấy N em" và có nút "thêm 5 em" / "bớt 5 em" cho mỗi đáp án để giáo viên cộng tay số em ở hai bên hông phòng. Kết quả biểu quyết KHÔNG nêu tên em nào, KHÔNG xếp hạng, KHÔNG dùng để tính điểm; nó chỉ hiện ra để giáo viên quyết định giảng lại chỗ nào — nếu cột đáp án sai cao hơn 1/3 tổng số em thì bảng tự gợi ý một dòng "nên giảng lại bước SƠ ĐỒ" kèm nút nhảy về đúng bước đó.',

  // Bảng của tiết dạy là bản ghi bài giảng: không thứ gì tự biến mất.
  retain:
    'BẢNG KHÔNG BAO GIỜ TỰ LAU: mọi nét phấn của bước trước còn nguyên khi sang bước sau, và cả năm bước của giáo án cộng lại thành một trang bảng hoàn chỉnh để cuối tiết cả lớp nhìn lại mạch bài. Chỉ giáo viên lau được, bằng nút "Lau", bằng phím E hoặc bằng nắm bàn tay đã gán; em lên bảng chỉ lau được dòng mình vừa viết sai. Khi bảng đầy thì mở MỘT TRANG BẢNG MỚI và giữ trang cũ trong danh sách tối đa 8 trang ở mép dưới, có nút quay lại từng trang và nút "Gộp tất cả trang" để xem cả tiết trên một dải cuộn dọc. Có nút "In bảng" xuất ra bản in nền trắng chữ đen qua Ctrl+P, và trang in phải đọc được mà không cần màu. Nút "Lưu bảng" ghi lại toàn bộ trang vào localStorage theo quy định lưu bảng, để tiết sau giáo viên mở ra dạy tiếp.',

  // Cỡ chữ đúng không phải đo trên laptop của cô giáo mà đo ở dãy bàn cuối lớp.
  backRow:
    'CHỮ PHẢI ĐỌC ĐƯỢC TỪ DÃY CUỐI LỚP: chuẩn là mắt một học sinh ngồi cách màn chiếu 7–8 m, không phải laptop của giáo viên. Ngoài mức >= 40 px, mọi chữ phấn còn phải cao >= 5.5% chiều cao khung hình để máy chiếu chỉ đạt 1024×768 vẫn ra cỡ đúng; nhãn trên thẻ đáp án và trên vật thật không nhỏ quá 4% chiều cao khung hình. Một dòng phấn tối đa 12 chữ và bảng tối đa 6 dòng chữ cùng một lúc — nhiều hơn thì tách sang trang bảng khác hoặc thay chữ bằng vật thật. Có nút "Chữ to cho lớp đông" phóng mọi chữ thêm 1.4 lần ngay lập tức mà không vỡ bố cục, và nút "Xem thử từ cuối lớp" phụ một bản thu 25% có phủ mờ nhẹ để cô kiểm ngay trên bàn giáo viên: dòng nào đọc không ra ở bản thu đó thì dòng đó quá nhỏ, phải viết lại to hơn hoặc bỏ đi.',

  // Phòng học Việt Nam mất mạng là chuyện bình thường; bài giảng không được chết theo CDN.
  noNetwork:
    'BÀI GIẢNG PHẢI ĐỨNG ĐƯỢC KHI MẤT MẠNG: toàn bộ nội dung chữ, số, vật thật, sơ đồ và lời giải của tiết dạy nằm trong chính file HTML, không gọi thêm bất kì API nào ngoài MediaPipe và font có dự phòng. CDN hỏng hoặc mạng trường chập chờn thì màn chờ chỉ tối đa 8 giây, hết 8 giây là tắt camera và mở bảng phấn dạy bình thường bằng chuột — tuyệt đối không để giáo viên đứng trước cả lớp chờ một thanh tải. Không có trạng thái lỗi nào được khoá nội dung bài giảng. Có nút "Thử lại camera" ở dải điều khiển để bật lại khi mạng về, kèm một dòng tiếng Việt "đang dạy không cần camera" thay vì một lỗi tiếng Anh. Mở file trên máy khác, không mạng, không tài khoản, thì bài giảng vẫn chạy và bảng đã lưu vẫn mở lại được nguyên vẹn; không có dữ liệu nào của lớp gửi đi.',

  // LESSON_DATA là đề bài cô giáo đọc trước 35 em: một mục sai là cả lớp học sai.
  verifyData:
    'LESSON_DATA PHẢI TỰ KIỂM CHỨNG LÚC NẠP: viết hàm verifyLessonBank() chạy MỘT LẦN trước khi bảng hiện ra, kiểm từng mục — `answer` phải có trong `choices` và chỉ xuất hiện đúng một lần, hai phương án không được trùng nhau sau khi bỏ khoảng trắng và đổi chữ thường; `prompt`, `explanation`, `errorTag`, `loiViet` phải khác rỗng; `errorTag` phải thuộc đúng danh sách nhãn lỗi đã khai báo ở mục 1; không hai mục nào trùng `prompt`; mảng phải có tối thiểu 6 mục và bao phủ ít nhất 3 nhãn lỗi khác nhau, vì bảng tổng kết nhóm theo lỗi mà chỉ một lỗi thì vô nghĩa. Mọi phương án sai phải mô phỏng đúng MỘT lỗi thật trong danh sách lỗi đó, cấm giá trị ngẫu nhiên vô nghĩa, và phương án đúng không được dài hơn hoặc nổi bật hơn các phương án còn lại. Mọi số trong đề phải nằm trong phạm vi SGK lớp đã cam đoan, không có phép chia cho 0. Mục nào trượt thì LOẠI KHỎI tiết giảng và ghi console.warn bằng tiếng Việt kèm id + lý do; còn dưới 5 mục hợp lệ thì hai nút "Cả lớp trả lời" và "Lưu bảng" tự khoá kèm một dòng chữ cho giáo viên, dòng cảnh báo này chỉ hiện ở dải điều khiển của cô, không hiện lên bảng trước lớp. Chạy lại hàm kiểm một lần nữa ngay trước khi lưu bảng.',
};

// Dòng rút gọn dùng cho checklist tự kiểm của mỗi giáo án.
export const LESSON_SHORT =
  'giáo viên trình bày trên màn chiếu 16:9, bảng chiếm >= 70% màn chiếu, chữ phấn >= 40 px, điều khiển trọn bài bằng chuột và bàn phím, camera chỉ bật khi mời em lên bảng · không tim, không điểm, không combo, không xếp hạng, không đồng hồ gây áp lực, không hit-stop, không giật màn hình · mọi bước chờ giáo viên bấm "Bước tiếp", dựng cảnh >= 600 ms, có phát lại bước tối đa 8 giây không giới hạn lần · năm bước Khởi động - Vật thật - Sơ đồ - Phép tính - Luyện tập chung, tổng 15-20 phút, có thanh tiến trình kéo được · "Mời em lên bảng" chuyển quyền trong 5 giây, hàng đợi 4 em, ghi vị trí cổ tay landmark 0, tối đa 12 lượt một tiết · maxNumHands: 2 và bỏ qua mọi bàn tay có gốc ngoài vùng bảng cộng 10% đệm, nhiều tay trong bảng thì tạm khoá và hỏi giáo viên · "Cả lớp trả lời" đếm ngón tay trong 5 giây, ghi rõ camera thấy N em, có nút cộng tay, sai quá 1/3 thì gợi ý giảng lại bước SƠ ĐỒ · bảng không bao giờ tự lau, tối đa 8 trang, có nút in nền trắng chữ đen · chữ >= 5.5% chiều cao khung hình, tối đa 12 chữ một dòng và 6 dòng một lúc, có nút "Chữ to cho lớp đông" 1.4 lần và "Xem thử từ cuối lớp" thu 25% · mất mạng thì màn chờ tối đa 8 giây rồi dạy tiếp bằng chuột, không lỗi nào khoá bài giảng, không dữ liệu nào gửi đi · verifyLessonBank() chạy lúc nạp và trước khi lưu: đáp án có trong choices đúng một lần, ≥ 6 mục phủ ≥ 3 nhãn lỗi, phương án nhiễu là một lỗi thật, mục lỗi bị loại và chỉ báo cho cô giáo';
