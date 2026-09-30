// Bốn quy định "TỪ BẢNG RA VỞ" cho BỘ GIÁO ÁN: tiết giảng kết thúc ở bàn giấy của từng em.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: khảo sát 2026-09-30 trên 39 giáo án đã sinh cho thấy 0/39 có bất kì đầu ra nào
// cho tờ giấy. LESSON.retain mới có nút "In bảng" - tức là in lại ẢNH của bảng phấn, thứ mà một em
// ngồi cuối lớp chép tay còn nhanh hơn. Ba lỗ thật còn bỏ trống:
//   - giáo viên không có phiếu bài tập in từ đúng dữ liệu vừa giảng, nên hôm sau các em làm một
//     bài lạ hoàn toàn: chặng Abstract của khung CRA bị cắt ngay sau tiết học;
//   - không có trang đáp án riêng cho cô, nên muốn chấm thì phải đọc lại từng câu trên màn hình;
//   - nhiều lớp ở Việt Nam không có máy in, nên thứ cần nhất là bản ngắn để chép vào vở ô li.
// Vì vậy phiếu ở đây sinh ra từ LESSON_DATA đã được verifyLessonBank kiểm, chứ không phải một
// danh sách câu hỏi thứ hai tự bịa - hai danh sách khác nhau là lỗi mà không ai chấm kịp.

export const HANDOUT = {
  // Phiếu bài tập in từ chính ngân hàng câu hỏi của tiết dạy, không phải ảnh chụp bảng.
  worksheet:
    'NÚT "IN PHIẾU BÀI TẬP": sinh một phiếu A4 từ CHÍNH mảng LESSON_DATA đã kiểm chứng, không phải ảnh bảng phấn và không phải một danh sách câu hỏi thứ hai tự bịa. Phiếu có 6 đến 8 câu, mỗi câu lấy nguyên văn prompt và choices, theo đúng thứ tự đã giảng, và bắt buộc có ÍT NHẤT hai câu mang cùng một errorTag với lỗi cả lớp hay mắc nhất trong tiết — mục đích của phiếu là sửa đúng chỗ yếu đó. Đầu phiếu có hai dòng "Họ và tên: ...................." và "Lớp: ........" để viết tay, TUYỆT ĐỐI không in tên hay bất kì dữ liệu nào của học sinh. Mỗi câu chừa khoảng trắng để tính cao >= 3 cm và có một dòng nhỏ "Em viết phép tính hoặc sơ đồ ở đây" - vì chặng cuối của khung Concrete-Representational-Abstract là các em tự làm trên giấy. Phiếu chỉ dùng một màu đen trên nền trắng: mọi thông tin phải hiểu được khi máy in hết mực màu, khi phô-tô ba lần và khi đọc dưới ánh sáng yếu. Không phụ thuộc mạng để in: dùng \`window.print()\` với stylesheet in nội tuyến trong cùng file, và @page quy định khổ A4, lề 1.5 cm.',

  // Máy in của trường là một cái cho hai mươi mấy lớp, in một mặt và sắp hết mực.
  printRun:
    'MỘT LƯỢT IN CỦA CẢ LỚP PHẢI RA ÍT TỜ, VÀ CHỮ PHẢI ĐỌC ĐƯỢC TRÊN GIẤY: phiếu đã có khoảng trắng >= 3 cm và một màu đen, nhưng chưa có dòng nào nói chữ in ra to bao nhiêu và một lớp 45 em thì mất bao nhiêu tờ. (1) Cỡ chữ in trên phiếu >= 12 pt và không dưới 12 pt ở bất kì khối nào kể cả dòng hướng dẫn; khi phiếu tràn trang thì BỚT CÂU theo thứ tự 8 -> 6 -> 4, TUYỆT ĐỐI không thu nhỏ chữ và không nén khoảng trắng viết tay dưới 3 cm — một phiếu ít câu mà em đọc được tốt hơn một phiếu đủ câu mà em phải nheo mắt. (2) Mặc định in theo bàn chứ không theo em: MỘT tờ A4 in 2 mặt dùng cho HAI em ngồi cùng bàn (mỗi em một nửa trang, cắt theo đường kẻ dọc mảnh), hoặc một tờ cắt tư cho bàn 4 em khi cô cho làm theo nhóm; máy in của trường chỉ in một mặt thì in "lật theo cạnh dài" thành hai tờ rời, không in hai nội dung chồng lên nhau. (3) Chân mỗi trang in ghi ba số để cô đếm TRƯỚC khi bấm nút in: số câu, số trang, và số tờ cho cả lớp tính theo sĩ số M đã nhập ("45 em -> 23 tờ"); vượt 24 tờ một lượt thì công cụ hiện thêm một dòng "để dành N câu cho tiết sau hoặc cho làm theo bàn" và nút "In gọn" tự cắt còn 4 câu, vẫn >= 12 pt. (4) Hình trên phiếu in đen trắng phải phân biệt được bằng HOA VĂN, không bằng màu: phần đã tô trong hình phân số dùng sọc chéo, chấm hoặc gạch ngang; hai đại lượng cạnh nhau dùng hai hoa văn khác nhau kèm nhãn chữ, vì máy in một màu và bản phô-tô lần thứ ba đều biến màu thành xám như nhau. (5) Không máy in, không giấy: đúng ba dòng của nút "Nội dung để chép" là bản thay thế, và một tờ in ra để cô truyền tay theo bàn là bản dùng được — không tự bịa thêm phiếu dài hơn.',

  // Cô giáo chấm được ngay mà không phải đọc lại từng câu trên màn chiếu.
  answerKey:
    'TRANG ĐÁP ÁN RIÊNG CHO GIÁO VIÊN: đúng sau phiếu là một trang đáp án có cùng số câu theo cùng thứ tự, mỗi dòng ghi đáp án đúng, một lời giải không quá 12 từ, và nhãn lỗi học sinh hay mắc ở câu đó (\`loiViet\`) để cô biết em nào vướng chỗ nào. Trang đáp án in bằng một nút riêng "In đáp án", MẶC ĐỊNH không nằm trong lượt in của phiếu học sinh, và khi bấm "In phiếu bài tập" thì không được phép sót trang đáp án ở cuối: kiểm bằng cách mở xem trước in (Ctrl+P) và đếm số trang. Đáp án không được tồn tại dưới bất kì dạng nào trong trang in của học sinh, kể cả chữ màu trắng hay khối \`display:none\` mà trình duyệt vẫn in. Có một dòng nhỏ ở đầu trang đáp án ghi tên bài và ngày, để cô kẹp vào sổ đầu bài.',

  // Lớp không có máy in thì thứ cần nhất là bản ngắn để chép vào vở ô li.
  notebook:
    'NÚT "NỘI DUNG ĐỂ CHÉP": nhiều lớp không có máy in, nên mọi giáo án phải xuất được phần cốt để cả lớp chép vào vở ô li. Bảng hiện một khung chữ cao >= 40 px gồm đúng BA dòng theo thứ tự: (1) dòng ghi nhớ chốt của tiết, chép nguyên văn; (2) MỘT ví dụ đã làm thật trên bảng ở bước PHÉP TÍNH, kèm đường phấn nối từ mỗi con số về sơ đồ sinh ra nó - nếu lớp chưa dựng xong sơ đồ thì dòng này ghi "cả lớp sẽ chép ví dụ này sau"; (3) MỘT bài tập về nhà cùng dạng, lấy từ chính LESSON_DATA đã kiểm chứng, không tự bịa thêm số ngoài phạm vi SGK. Ba dòng đó copy được thành văn bản thuần (bôi đen rồi Ctrl+C ra được chữ có dấu, không ra ký tự lỗi), có nút "Xong, ẩn khung chép" để không che bảng khi giảng tiếp, và khi mở lại ở tiết sau thì đúng ba dòng đó vẫn còn.',
};

// Dòng rút gọn cho checklist tự kiểm của mỗi giáo án.
export const HANDOUT_SHORT =
  'phiếu A4 in từ đúng LESSON_DATA với >= 2 câu mang cùng lỗi hay mắc, có khoảng trắng >= 3 cm và dòng "Em viết phép tính hoặc sơ đồ ở đây", chỉ một màu đen và in được khi mất mạng · một lượt in của cả lớp ra ít tờ: chữ in >= 12 pt (tràn trang thì bớt câu 8 -> 6 -> 4 chứ không thu nhỏ chữ), mặc định một tờ A4 in 2 mặt cho hai em cùng bàn, chân trang ghi số câu - số trang - số tờ theo sĩ số, hình phân biệt bằng hoa văn chứ không bằng màu · trang đáp án in bằng nút riêng, không sót vào phiếu của học sinh · khung "Nội dung để chép" đúng ba dòng (ghi nhớ - ví dụ trên bảng - bài về nhà lấy từ LESSON_DATA), copy ra được văn bản có dấu';
