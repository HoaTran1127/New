// Ba quy định "TỪ BẢNG RA VỞ" cho BỘ GIÁO ÁN: tiết giảng kết thúc ở bàn giấy của từng em.
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

  // Cô giáo chấm được ngay mà không phải đọc lại từng câu trên màn chiếu.
  answerKey:
    'TRANG ĐÁP ÁN RIÊNG CHO GIÁO VIÊN: đúng sau phiếu là một trang đáp án có cùng số câu theo cùng thứ tự, mỗi dòng ghi đáp án đúng, một lời giải không quá 12 từ, và nhãn lỗi học sinh hay mắc ở câu đó (\`loiViet\`) để cô biết em nào vướng chỗ nào. Trang đáp án in bằng một nút riêng "In đáp án", MẶC ĐỊNH không nằm trong lượt in của phiếu học sinh, và khi bấm "In phiếu bài tập" thì không được phép sót trang đáp án ở cuối: kiểm bằng cách mở xem trước in (Ctrl+P) và đếm số trang. Đáp án không được tồn tại dưới bất kì dạng nào trong trang in của học sinh, kể cả chữ màu trắng hay khối \`display:none\` mà trình duyệt vẫn in. Có một dòng nhỏ ở đầu trang đáp án ghi tên bài và ngày, để cô kẹp vào sổ đầu bài.',

  // Lớp không có máy in thì thứ cần nhất là bản ngắn để chép vào vở ô li.
  notebook:
    'NÚT "NỘI DUNG ĐỂ CHÉP": nhiều lớp không có máy in, nên mọi giáo án phải xuất được phần cốt để cả lớp chép vào vở ô li. Bảng hiện một khung chữ cao >= 40 px gồm đúng BA dòng theo thứ tự: (1) dòng ghi nhớ chốt của tiết, chép nguyên văn; (2) MỘT ví dụ đã làm thật trên bảng ở bước PHÉP TÍNH, kèm đường phấn nối từ mỗi con số về sơ đồ sinh ra nó - nếu lớp chưa dựng xong sơ đồ thì dòng này ghi "cả lớp sẽ chép ví dụ này sau"; (3) MỘT bài tập về nhà cùng dạng, lấy từ chính LESSON_DATA đã kiểm chứng, không tự bịa thêm số ngoài phạm vi SGK. Ba dòng đó copy được thành văn bản thuần (bôi đen rồi Ctrl+C ra được chữ có dấu, không ra ký tự lỗi), có nút "Xong, ẩn khung chép" để không che bảng khi giảng tiếp, và khi mở lại ở tiết sau thì đúng ba dòng đó vẫn còn.',
};

// Dòng rút gọn cho checklist tự kiểm của mỗi giáo án.
export const HANDOUT_SHORT =
  'phiếu A4 in từ đúng LESSON_DATA với >= 2 câu mang cùng lỗi hay mắc, có khoảng trắng >= 3 cm và dòng "Em viết phép tính hoặc sơ đồ ở đây", chỉ một màu đen và in được khi mất mạng · trang đáp án in bằng nút riêng, không sót vào phiếu của học sinh · khung "Nội dung để chép" đúng ba dòng (ghi nhớ - ví dụ trên bảng - bài về nhà lấy từ LESSON_DATA), copy ra được văn bản có dấu';
