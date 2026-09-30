// Mười hai quy định "bảng phấn + vật thật" cho môn Toán: biến đề bài thành thứ học sinh nhìn thấy,
// đếm được và điều khiển bằng ngón tay. validate.mjs so khớp nguyên văn các chuỗi này,
// nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại (khảo sát 2026-09-30 trên 55 prompt Toán của repo):
//   bảng phấn / viết phấn : 0/55
//   vật thật đếm được    : 0/55
//   minh hoạ bài toán đố : 0/55
//   pizza cho phân số    : 1/55
// Đề bài đang là CHỮ và lời giải đang là CHỮ, nên học sinh làm đúng bằng cách nhớ mẫu câu
// chứ không bằng cách nhìn thấy số lượng. Bảy quy định này buộc mọi con số phải có một vật
// tương ứng, và vật đó phải do chính tay các em cắt, kéo, đổ, xếp — không phải ảnh minh hoạ tĩnh.
//
// Chỉ áp cho môn Toán. Tiếng Anh có học liệu là từ và câu, không phải số lượng.
//
// Vòng nâng cấp 2026-09-30 (sau khi tách bộ giáo án riêng khỏi 85 prompt game) vá 5 lỗ hổng
// tìm được bằng nghiên cứu cộng đồng + grep chính repo này:
//   1. Thiếu chặng Representational của khung Concrete-Representational-Abstract: props.mjs cho vật
//      thật, quy định narrate cho phép tính, nhưng KHÔNG có bước biểu diễn bán cụ thể ở giữa —
//      đây đúng là lỗi kinh điển mà CRA chỉ ra (nhảy thẳng từ vật thật sang thuật toán). → represent
//   2. fractionCut chỉ nhận 2/4/8 ngón trong khi tools/data/examples.mjs ra đề 1/3, 1/5, 1/6,
//      học sinh không thể cắt được theo quy định cũ. → khay thẻ số phần 2-12
//   3. 0 quy định về mỏi tay: game chỉ 4-6 phút, tiết giảng bài 15-20 phút và có em lên bảng
//      viết dài ("gorilla arm"). → handCare
//   4. 0 quy định occlusion: đứng sát bảng và quay nghiêng thì tay dễ khuất sau thân và đầu. → handCare
//   5. Bảng của tiết dạy mất trắng khi tải lại trang. → persist
//
// VÒNG 3 (2026-09-30) — grep trên 39 file prompts/giao-an/ sau vòng 2 cho thấy hai lỗ hình học:
//   6. 0/39 giáo án có một chữ nào về cạnh khuất, xoay khối hay lưới khai triển. Hai chỗ duy nhất
//      chứa "nét đứt" là ô dấu "?" và gạch chân số; "xoay" chỉ xuất hiện trong câu an toàn
//      "không xoay người nhanh". Trong khi đó props.mjs mô tả "hình hộp chữ nhật trong suốt" và
//      "khay khối lập phương 1 cm³" — không có quy định nào buộc khối phải là khối ba chiều, nên
//      mô hình sẽ vẽ một hình thoi nét liền và học sinh không bao giờ thấy chuyện "xếp lớp". → solid3d
//   7. Bài góc và hai đường vuông góc chỉ có dụng cụ vẽ trên bảng (thước nửa tròn, ê-ke phấn),
//      không quy định nào cho học sinh DÙNG CƠ THỂ mình tạo góc dù game cùng cụm đã dùng ANGLE_POSE.
//      Góc là kiến thức mà trẻ lớp 4 hiểu bằng cánh tay trước khi hiểu bằng số đo. → bodyTool

export const CHALK = {
  // Bảng phấn là vật ảo bán trong suốt đứng trong lớp học thật, không phải tấm nền đục che mất camera.
  board:
    'Bảng phấn ảo trong không gian thật: bảng là một mặt phẳng bán trong suốt neo vào không gian lớp học, alpha nền bảng từ 0.55 đến 0.70 để vẫn nhìn mờ thấy tường, cửa sổ và bạn học phía sau — không được đục hoàn toàn. Nền bảng màu xanh bảng #2E4638, viền gỗ 12–18 px màu #8A5A2B, có khay phấn và một giẻ lau ở mép dưới. Nét phấn rộng 4–7 px màu #F4F1E4, đầu nét bo tròn, hơi run theo tốc độ tay và mỗi nét làm rơi 8–12 hạt bụi phấn trong 300 ms. Chữ viết bằng phấn cao >= 34 px trên desktop và >= 24 px trên điện thoại. Hai cỡ bảng: MẶC ĐỊNH là bảng chữ L chiếm <= 40% khung hình (dải trên cùng cao <= 22% cộng một cột biên rộng <= 27%, học sinh chọn cột trái hay phải lúc calibration) và GIỮ TRỐNG ô giữa nơi thân các em đứng; BẢNG TO chiếm <= 68% khung hình, chỉ bật được khi PoseLandmarker thấy hai vai 11/12 nằm gọn trong 1/3 khung hình (học sinh đứng nép sang một bên), không thấy vai thì khóa ở cỡ mặc định kèm một dòng phấn "em đứng nép sang một bên để mở bảng to". MÉP TRÊN CỦA BẢNG không được cao quá landmark vai (11 hoặc 12) cộng thêm 15% chiều cao khung hình: đứng sát bảng mà phải với tay quá đầu thì cánh tay và bàn tay sẽ bị chính thân người che khuất khỏi camera; không thấy vai thì lấy 78% chiều cao khung hình làm trần. Nền bảng là lớp riêng, KHÔNG tính vào lớp phủ tối rgba(8,5,20,0.4): toàn màn hình vẫn chỉ có đúng một lớp phủ tối và phần khung hình ngoài bảng giữ alpha không vượt 0.45.',

  // Đầu ngón tay là viên phấn, nắm bàn tay là giẻ lau — không cần chuột và không cần nút bấm.
  chalkWrite:
    'Viết phấn bằng đầu ngón tay: pinch ngón cái và ngón trỏ (landmark 4 và 8 cách nhau <= 0.06 lần khoảng cách landmark 5–17 của cùng bàn tay) thì đầu ngón 8 trở thành đầu phấn và nét vẽ đi đúng theo quỹ đạo landmark 8; thả pinch là nhấc phấn lên, không kéo dài nét. Nét vẽ làm mượt bằng EMA alpha 0.45 làm mức sàn và nâng lên bộ lọc One Euro khi nét nhanh bị trễ, độ dày đổi theo tốc độ tay (tay chậm 7 px, tay nhanh 4 px) để chữ viết trông như phấn thật. Giẻ lau: nắm bàn tay (bốn đỉnh ngón 8, 12, 16, 20 gập, mỗi đỉnh cách gốc ngón tương ứng <= 45% chiều dài đốt ngón) và giữ nguyên 350–500 ms tại một chỗ thì mọi nét phấn trong bán kính 110 px bị lau theo vòng xoáy, kèm hạt bụi phấn. Có nút "Xoá bảng" và nút "Hoàn tác" giữ tối đa 20 bước, cả hai dùng được bằng chuột. Chế độ không camera: giữ chuột trái hoặc rê ngón tay trên màn hình cảm ứng là viết phấn, phím E hoặc nút bấm giữ 400 ms là giẻ lau — đúng một hành vi đó, không đổi sang cơ chế khác.',

  // Con số không bao giờ đứng một mình: mỗi số là một chồng vật đếm được từng cái.
  concretize:
    'Mọi con số đều thành vật đếm được: KHÔNG một con số nào trong đề bài, trong dữ kiện hay trong đáp án được hiện trơ một mình trên bảng. Mỗi số phải hiện thành một khóm hoặc một chồng vật thật có ĐÚNG số đơn vị bằng giá trị của nó — 7 là bảy quả táo vẽ phấn chứ không phải chữ "7". Mỗi đơn vị đếm được bằng một lần chấm đầu ngón tay, và mỗi lần chấm thì bộ đếm cạnh khóm tăng lên 1, 2, 3 kèm tiếng "tách" ngắn. Cứ đủ 10 đơn vị thì tự gộp thành một bó hoặc một ô đậm để học sinh thấy cấu tạo thập phân. Số lớn hơn 50 đơn vị thì hiện theo bó 10 cộng đơn vị lẻ (350 hiện thành 35 bó, không vẽ 350 vật rời). Mỗi vật kèm một nhãn số viết phấn đặt sát vật, chữ số cao >= 28 px, và nhãn chỉ xuất hiện SAU khi học sinh đã đếm xong khóm đó — hiện nhãn trước là mất tác dụng đếm.',

  // Chặng giữa của khung Concrete - Representational - Abstract: bước hay bị bỏ nhất trong dạy Toán.
  represent:
    'Ba chặng VẬT THẬT rồi SƠ ĐỒ rồi PHÉP TÍNH, không được nhảy cóc: nhãn phấn ở góc trên bên phải bảng luôn ghi rõ đang ở chặng nào và chỉ sáng một chặng. CHẶNG VẬT THẬT chỉ có vật đếm được và thao tác tay, trên bảng chưa xuất hiện bất kì phép tính nào. CHẶNG SƠ ĐỒ là chặng hay bị bỏ qua nhất: học sinh phải TỰ TAY dựng một biểu diễn bán cụ thể (sơ đồ đoạn thẳng, băng giấy chia phần, tia số, lưới ô vuông, bảng kẻ hàng cột) bằng cách kéo hoặc vẽ, và sơ đồ đó nối tường minh với vật thật vừa thao tác — bảng không được hiện sẵn sơ đồ hoàn chỉnh. CHẶNG PHÉP TÍNH chỉ mở được sau khi sơ đồ đã dựng xong: mỗi con số viết trong phép tính phải có một đường phấn nối ngược về đúng bộ phận của sơ đồ sinh ra nó, và số nào không nối được về sơ đồ thì bị coi là viết bừa, bảng gạch chân số đó bằng nét đứt và hỏi lại "số này lấy từ đâu trong sơ đồ?". Có nút "Xem lại ba chặng" phát lại từng chặng một, mỗi chặng tối đa 8 giây, xem lại không bị tính là làm sai.',

  // Bài toán đố không còn là đoạn văn: kéo từng vật trong đề xuống bảng để dựng lại cảnh.
  wordProblem:
    'Bài toán đố dựng thành cảnh trên bảng: đề bài hiện tối đa 2 dòng chữ, phần còn lại phải thành hình. Đọc đề tới đâu vật hiện tới đó — mỗi danh từ chỉ người, vật hoặc số lượng trong đề là một hình vẽ phấn nằm trong khay cạnh bảng và học sinh nắm kéo nó thả vào đúng vị trí trong cảnh. Kéo một chiếc xe chở hàng vào bảng thì số kiện hàng trên xe hiện ĐÚNG bằng con số của đề; quá 20 kiện thì xếp thành chồng 10 kiện cộng kiện lẻ để vẫn đếm được. Mỗi dữ kiện đã cho ghi bằng phấn ngay cạnh vật tương ứng, không ghi thành một danh sách rời. Ẩn số là một ô vuông nét đứt có dấu "?" đặt đúng chỗ cần tìm, và học sinh phải nắm kéo đáp án từ khay thả vào ô đó. Thả sai thì ô "?" rung 2 lần trong 300 ms và vật bị trả lại khay, cảnh đã dựng được GIỮ NGUYÊN — không xoá bảng, không trừ tim, không bắt dựng lại từ đầu.',

  // Phân số phải được cắt bằng tay: khay thẻ đặt số phần, mỗi lần quẹt là một nhát cắt.
  fractionCut:
    'Phân số cắt bằng ngón tay hoặc bằng thẻ số phần: áp cho mọi bài có phân số, tỉ số hoặc phần trăm. Mép dưới bảng có một khay 11 thẻ số phần ghi 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 — pinch vào thẻ nào thì vật được chia thành đúng số phần đó, vì đề bài trong repo có cả 1/3, 1/5 và 1/6 chứ không chỉ 1/2, 1/4, 1/8. Vẫn giữ đường tắt bằng ngón tay cho ba mốc hay dùng: đếm số đỉnh ngón duỗi trong bốn ngón 8, 12, 16, 20, giơ 2 ngón là 1/2, 4 ngón là 1/4, 8 ngón là 1/8; ngón tay và thẻ số phần chọn cùng một giá trị thì cho cùng một kết quả. Số phần đã chọn được viết bằng phấn ngay dưới vật. Mỗi lần quẹt một đường qua vật là MỘT nhát cắt thật có vệt sáng dài >= 40% đường kính vật. Số phần là luỹ thừa của 2 (2, 4, 8) thì chia đôi liên tiếp nên số nhát bằng log2 của số phần (2 phần = 1 nhát, 4 phần = 2 nhát, 8 phần = 3 nhát). Số phần KHÔNG phải luỹ thừa của 2 (3, 5, 6, 7, 9, 10, 11, 12) thì bảng kẻ sẵn các đường mốc MỜ đúng bằng số phần và học sinh quẹt đè lên từng đường mốc để xác nhận, mỗi lần quẹt thì đường đó sáng hẳn lên kèm tiếng "soạt" — cấm tự chia bừa một số phần không bằng nhau. Sau mỗi nhát, hai phần kề nhau tách ra 6–10 px và bụi phấn bay ra từ mép cắt. Chưa chọn số phần thì KHÔNG cắt; chọn quá 12 thì bảng hiện dòng phấn "chia tối đa 12 phần thôi em". Chấm đầu ngón tay vào từng phần để tô màu phần đó (tô nghĩa là lấy đi), bộ đếm "đã tô k trên N phần" hiện ngay dưới hình và phân số k/N chỉ được viết ra SAU khi học sinh đã tô xong. Với phân số, số thập phân và phần trăm thì cùng một giá trị phải hiện được bằng ÍT NHẤT HAI trong bốn mô hình {diện tích, băng giấy, tia số, tập hợp} và có một nút "soi cả hai mô hình" làm sáng đồng thời hai mô hình đó trong 3 giây để học sinh thấy chúng là một.',

  // Số đo phải đọc được từ dụng cụ thật có vạch chia, không phải từ một con số hiện sẵn.
  measure:
    'Số đo đọc từ dụng cụ thật: mọi đại lượng trong đề (độ dài, khối lượng, diện tích, thể tích, thời gian, góc) đều phải hiện thành dụng cụ vẽ phấn có vạch chia ĐÚNG đơn vị mà đề bài dùng — thước có vạch cm, cân có quả cân, bình chia vạch, lưới ô vuông, mặt đồng hồ, thước nửa tròn. Dụng cụ đó phải cầm và kéo được bằng ngón tay: nắm kéo quả cân bỏ lên đĩa, nắm kéo kim đồng hồ, quẹt để tô từng ô vuông, nắm kéo khối lập phương xếp thành lớp. Khi đọc kết quả, bảng tự kẻ một đường phấn nối từ mép vật sang đúng vạch đang đọc để học sinh thấy mình đọc ở đâu. Con số đọc ra phải trùng giá trị của vạch, cấm làm tròn hiển thị và cấm hiện sẵn đáp số cạnh dụng cụ.',

  // Khối lớp 5 là khối ba chiều; vẽ nó thành hình phẳng trên bảng thì học sinh không thấy chuyện "xếp lớp".
  solid3d:
    'Vật có chiều sâu phải được dựng như khối ba chiều, không như hình phẳng: áp cho mọi bài có khối lập phương 1 cm³, hình hộp chữ nhật hoặc vật tròn có chiều cao. (a) CẠNH KHUẤT của khối bắt buộc vẽ nét đứt 3 px cùng màu phấn #F4F1E4 ở alpha 0.55, cạnh nhìn thấy vẽ nét liền 4–7 px — nếu cả mười hai cạnh đều nét liền thì học sinh chỉ thấy một hình thoi chứ không thấy một khối. (b) Mặt quay về phía người xem tô lưới ô đậm hơn mặt bên 20% để khối có hướng. (c) XOAY KHỐI: nắm kéo ngang trên thân khối (KHÔNG cần pinch, để khỏi mỏi tay) xoay khối từ -90° đến +90° quanh trục thẳng đứng, mỗi bước 15° có khựng nhẹ kèm tiếng "cạch", và mặt đang quay về phía người xem được gọi tên bằng phấn ("mặt trước", "mặt bên", "mặt trên"). (d) MỞ HỘP: nút "mở hộp" trải khối thành lưới khai triển ĐÚNG 6 mặt trong animation >= 800 ms, mỗi mặt giữ nguyên số ô 1 cm³ đếm được trên nó và mỗi cặp mặt đối diện tô cùng một hoa văn phấn để học sinh thấy chúng bằng nhau; nút "gấp lại" làm ngược lại, và khi gấp thì mỗi cạnh khớp vào đúng một cạnh của khối, đếm được 12 cặp khớp. (e) XẾP LỚP PHẢI ĐẾM ĐƯỢC TỪNG BƯỚC: lớp đáy hiện đúng dài × rộng ô tô đậm kèm nhãn "lớp 1: 12 khối", mỗi lần quẹt nhân một tầng thì chiều cao tăng đúng 1 cm và bộ đếm "tầng 2/3" hiện cạnh hình; phép tính thể tích chỉ được viết ra sau khi các tầng đã xếp xong. (f) Khối có chiều sâu z và bóng dưới chân theo hợp đồng AR, bóng đổi hướng và độ dài theo góc xoay chứ không đứng yên.',

  // Với góc và đường, thân người học sinh là dụng cụ đo đầu tiên; thước phấn chỉ là bước xác nhận.
  bodyTool:
    'Cơ thể là dụng cụ đo đầu tiên, thước phấn là bước xác nhận: áp cho bài có góc, hai đường vuông góc, hai đường song song và ôn tập hình học. (a) Nút "Cả lớp làm bằng tay" biến chính người đứng trước camera thành góc: ĐỈNH góc là một vai (landmark 11 hoặc 12, chọn vai thuận theo câu hỏi tay thuận lúc calibration), HAI TIA đi qua hai khuỷu (13 và 14); bảng tính góc từ hai vectơ vai→khuỷu rồi vẽ một cung phấn tại đỉnh kèm số đo, và phân loại đúng ngưỡng: 90° ± 8° là góc vuông, nhỏ hơn 82° là góc nhọn, lớn hơn 98° mà dưới 170° là góc tù, từ 170° đến 190° là góc bẹt. (b) Cung góc và số đo vẽ ngay tại vị trí khớp vai trên khung hình, chữ số cao >= 34 px, để cả lớp nhìn thấy góc của bạn mình mở to cỡ nào chứ không chỉ nghe nói. (c) Muốn kiểm chứng thì học sinh nắm kéo một ê-ke phấn hoặc thước nửa tròn phủ lên góc vừa tạo trên ảnh; hai cạnh khớp nhau thì vạch khớp sáng 400 ms — nhờ vậy "đo bằng mắt" biến thành "đo bằng dụng cụ". (d) Bài hai đường vuông góc thì hai cánh tay duỗi thẳng là hai đường thẳng, và vuông góc chỉ được xác nhận khi góc ở vai rơi vào 90° ± 8°; bài hai đường song song thì hai tay cùng duỗi về một phía và bảng kẻ hai nét phấn dọc theo hai cánh tay để học sinh thấy hai đường không gặp nhau dù kéo dài. (e) Không có camera, hoặc em ngồi cuối lớp ngoài tầm nhìn, thì vẫn làm được bằng chuột: kéo hai tia từ một đỉnh chung, số đo cập nhật theo từng px. (f) Động tác cơ thể chỉ diễn ra trong tầm tay: không nhảy, không xoay người nhanh, không rời khỏi chỗ.',

  // Bảng viết từng dòng và hỏi lại trước khi viết tiếp — không trình chiếu lời giải hoàn chỉnh.
  narrate:
    'Lời giải viết phấn từng bước: bài giải hiện ra từng dòng, mỗi dòng tối đa 12 từ và một lượt có tối đa 6 dòng. Bảng KHÔNG BAO GIỜ tự viết hết lời giải — sau mỗi dòng là một câu hỏi nhỏ một chạm ("bước tiếp theo cộng hay trừ?", "mấy kiện tất cả?") và bảng chỉ viết tiếp khi học sinh trả lời bằng ngón tay. Dòng đang làm được gạch chân bằng phấn; quẹt ngang sang phải để sang bước, quẹt sang trái để lùi về bước trước và sửa. Trả lời sai thì dòng sai bị gạch chéo bằng phấn đỏ nhạt #C9564B và giẻ lau chỉ xoá ĐÚNG dòng đó, mọi bước đúng phía trên được giữ nguyên — không xoá cả bảng vì một dòng sai. Xong lượt thì toàn bộ bài giải còn nguyên trên bảng trong 5 giây kèm một dòng phấn tóm tắt đáp số, và sau đó CHỈ lau khi người dạy bấm lau chứ bảng không tự lau.',

  // Viết phấn giữa không trung mỏi rất nhanh và tay rất dễ bị thân người che: tiết giảng dài 15-20 phút.
  handCare:
    'Chống mỏi tay và chống mất tay khi viết phấn, ba lớp bảo vệ bắt buộc: (1) CHẠM-BẬT VIẾT — pinch một lần là hạ phấn xuống và pinch lần nữa là nhấc phấn lên, không phải giữ pinch suốt một nét dài; giữ pinch liên tục vẫn chạy như cũ cho nét ngắn, và bảng hỏi một chạm "em muốn giữ pinch hay chạm-bật?" lúc calibration. (2) NGHỈ BẮT BUỘC — đồng hồ đếm thời gian pinch liên tục, đủ 90 giây thì hiện một dòng phấn "hạ tay nghỉ 5 giây" kèm đếm ngược 5-4-3-2-1, trong lúc đếm ngược mọi thao tác tay bị tạm khoá và thời gian không bị trừ vào bất kì đồng hồ nào; khay phấn ảo luôn được đặt ngang chiều cao khuỷu tay (landmark 13 hoặc 14) để học sinh có chỗ tựa cổ tay giữa hai nét. (3) MẤT TAY THÌ ĐÓNG BĂNG NÉT — landmark bàn tay biến mất quá 500 ms (tay ra khỏi khung hình, hoặc bị thân và đầu che khi đứng sát bảng và quay nghiêng) thì nét đang vẽ dở ĐỨNG YÊN tại chỗ, không bị xoá và không nhảy sang vị trí khác, kèm dòng phấn "em đưa tay vào vùng bảng"; thấy tay lại thì nét vẽ tiếp đúng từ điểm đang đóng băng. Khi đang ở chế độ bảng thì nhận diện bàn tay chạy MỖI khung hình (không giãn 2-3 khung như lúc né vật bay) và tự giảm particle để độ trễ nét viết dưới 150 ms.',

  // Bảng của tiết dạy là tài sản của giáo viên: mất trắng khi tải lại trang là mất cả bài giảng.
  persist:
    'Lưu bảng của tiết dạy: toàn bộ nét phấn, vật thật đã kéo, sơ đồ đã dựng và chặng CRA đang đứng được tuần tự hoá thành JSON rồi ghi vào localStorage dưới khoá "miti-board", dung lượng tối đa 200 KB; sắp vượt ngưỡng thì bảng báo một dòng tiếng Việt "bảng đã gần đầy, cô trò mình lưu bớt hoặc xoá một phần" chứ không âm thầm bỏ dữ liệu. Có hai nút dùng được bằng chuột và bằng chạm: "Lưu bảng" và "Mở bảng đã lưu", mở lại thì khôi phục đúng toạ độ từng nét và từng vật, kèm dòng phấn ghi thời điểm lưu. TUYỆT ĐỐI không lưu ảnh camera, không lưu khung hình video, không lưu dữ liệu nhận diện khuôn mặt hay dáng người — chỉ lưu toạ độ nét vẽ và trạng thái vật ảo. Có nút "Xoá bảng đã lưu" với một lần xác nhận bằng chữ, và khi localStorage bị chặn (mở file cục bộ ở một số trình duyệt) thì bảng vẫn dạy được trọn vẹn, chỉ mất tính năng lưu và hiện đúng một dòng giải thích.',
};

// Checklist rút gọn in ở mục 10. Mười vế đầu luôn đúng với mọi bài; hai vế hình học nối theo cụm
// y hệt chalkBlock — để thường trực thì bài "chữ số hàng thập phân" cũng bị đòi tự kiểm tra cạnh
// khuất của khối, tức là checklist tự mâu thuẫn với số quy định ở mục 4.
export const CHALK_SHORT_HINH = 'khi bài có khối: cạnh khuất nét đứt 3 px alpha 0.55, kéo ngang xoay -90° đến +90° mỗi 15°, nút mở hộp trải đúng 6 mặt lưới khai triển, xếp lớp đếm từng tầng';
export const CHALK_SHORT_THAN = 'khi bài có góc hoặc hai đường: vai 11/12 là đỉnh, hai khuỷu 13/14 là hai tia, 90° ± 8° là góc vuông, rồi xác nhận bằng ê-ke phủ lên ảnh';
export const CHALK_SHORT = 'bảng phấn ảo alpha 0.55–0.70, mép trên không quá vai + 15% chiều cao khung hình, bảng chữ L <= 40% hoặc bảng to <= 68% khi đứng nép · pinch ngón 4–8 để viết phấn và nắm bàn tay 350–500 ms để lau · không con số nào hiện trơ, mỗi số là một chồng vật đếm được và 10 đơn vị gộp thành một bó · đi đúng ba chặng VẬT THẬT rồi SƠ ĐỒ rồi PHÉP TÍNH, mỗi số trong phép tính có một đường phấn nối về sơ đồ · đề bài tối đa 2 dòng chữ, bài toán đố dựng thành cảnh bằng cách kéo từng vật, ẩn số là ô "?" · phân số chọn số phần 2–12 bằng khay thẻ hoặc bằng ngón tay 2/4/8, mỗi lần quẹt một nhát, tô từng phần rồi mới viết k/N, cùng một giá trị hiện được bằng >= 2 mô hình · đại lượng đo bằng dụng cụ có vạch đúng đơn vị và có đường phấn nối tới vạch đang đọc · lời giải viết từng dòng <= 12 từ, mỗi dòng hỏi một câu trước khi viết tiếp, sai chỉ xoá đúng dòng đó · chạm-bật viết, nghỉ bắt buộc sau 90 giây pinch, mất tay quá 500 ms thì đóng băng nét tại chỗ · lưu bảng vào localStorage khoá "miti-board" tối đa 200 KB, không lưu ảnh hay video camera';
// builder và validator cùng đi qua hàm này nên checklist và bộ kiểm không thể lệch nhau.
export const chalkShortFor = (c) =>
  [CHALK_SHORT, SOLID_CLUSTERS.includes(c) ? CHALK_SHORT_HINH : null, BODY_CLUSTERS.includes(c) ? CHALK_SHORT_THAN : null]
    .filter(Boolean)
    .join(' · ');

// Hai quy định hình học chỉ có nghĩa với đúng một số cụm kiến thức. In vào cả 44 giáo án thì mô
// hình sẽ vẽ cạnh khuất trong bài chia số và biến thân học sinh thành ê-ke trong bài phân số —
// vì vậy build-lessons.mjs nối có điều kiện và validate.mjs chặn cả hai chiều (thiếu và thừa).
// Lập bảng theo đúng chuỗi vat + so_do trong tools/data/props.mjs, không theo cảm giác chủ đề.
export const SOLID_CLUSTERS = ['the-tich', 'hinh-hoc-on-tap', 'dien-tich-xq-tp'];
export const BODY_CLUSTERS = ['goc', 'vuong-goc-song-song', 'hinh-binh-hanh', 'hinh-thoi', 'hinh-hoc-on-tap', 'hinh-tam-giac', 'hinh-thang'];

// Số quy định in bằng chữ trong tiêu đề mục 4. build-lessons.mjs và validate.mjs dùng chung bảng này
// để tiêu đề và bộ kiểm không bao giờ nói hai con số khác nhau.
export const SO_QUY_DINH = { 11: 'MƯỜI MỘT', 12: 'MƯỜI HAI', 13: 'MƯỜI BA' };
export const SO_TU_CHUNG = 11; // boardText + 10 quy định bảng phấn luôn có ở mọi bài
