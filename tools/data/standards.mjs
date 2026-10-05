// Bảng chuẩn kiến thức: mỗi cụm trong tools/data/clusters.mjs được gắn
//   mach  — mạch kiến thức theo Chương trình GDPT 2018 (cấp tiểu học),
//   ngan  — nhãn ngắn in trên HUD (<= 18 ký tự),
//   tuan  — khoảng tuần [mở bài, khép bài] trong năm học 35 tuần (vòng 20),
//   yc    — "yêu cầu cần đạt" NGUYÊN VĂN để in ở màn khởi động và màn tổng kết,
//   meo   — mẹo nhớ <= 12 từ kèm một động tác 3 giây.
// Prompt không được tự viết lại yc: dòng "Yêu cầu cần đạt: ..." copy từ bảng này,
// để giáo viên đối chiếu được game luyện đúng yêu cầu của lớp, không chỉ đúng chủ đề.
//
// Khảo sát 85 prompt trước vòng 17: "mạch kiến thức" 0/85, "yêu cầu cần đạt" 0/85,
// "chuẩn kiến thức" 0/85, "mẹo nhớ" 0/85. Tầng nhẹ đầu + tự kiểm chứng đề chỉ buộc
// "số/từ trong phạm vi SGK" mà không nêu SGK nào, mạch nào, cần đạt tới đâu.
//
// Khảo sát 85 prompt trước vòng 20: "tuần học" 0/85, "phân phối chương trình" 0/85,
// "học kì" 0/85 — kể cả catalogs/curriculum/toan-lop-4-5-sgk-matrix.md cũng 0 lần chữ
// "tuần". Game biết cụm thuộc mạch nào nhưng không biết mạch đó thường dạy từ tuần mấy,
// nên giáo viên cầm 85 thẻ không biết mở game nào vào tiết hôm nay.

const TOAN = 'Toán';
const ANH = 'Tiếng Anh';

// Tám mạch kiến thức hợp lệ — validate chặn mọi nhãn ngoài danh sách này.
export const MACH = {
  so: { mon: TOAN, ten: 'Số và phép tính' },
  hinh: { mon: TOAN, ten: 'Hình học và đo lường' },
  giai: { mon: TOAN, ten: 'Giải toán có lời văn' },
  so_lieu: { mon: TOAN, ten: 'Một số yếu tố thống kê và xác suất' },
  doc: { mon: ANH, ten: 'Đọc và viết' },
  nghe_noi: { mon: ANH, ten: 'Nghe và nói' },
  kien_thuc: { mon: ANH, ten: 'Kiến thức ngôn ngữ' },
  on_tap: { mon: 'Hai môn', ten: 'Ôn tập tổng hợp' },
};

const M = (k) => MACH[k].ten;

export const STANDARDS = {
  // ---- Toán 4 ----
  'hang-so': {
    mach: M('so'), ngan: 'Số tự nhiên',
    tuan: [1, 2],
    yc: 'Đọc, viết được số tự nhiên đến 100000 và 1000000; xác định được giá trị của mỗi chữ số theo hàng.',
    meo: 'Hàng nào chữ số đó, chữ 0 ở giữa vẫn phải viết.',
  },
  'so-sanh-sap-xep': {
    mach: M('so'), ngan: 'So sánh số',
    tuan: [2, 3],
    yc: 'So sánh được hai số tự nhiên có nhiều chữ số; sắp xếp được bốn số theo thứ tự từ bé đến lớn và ngược lại.',
    meo: 'Đếm số chữ trước, so từ trái sang phải.',
  },
  'lam-tron': {
    mach: M('so'), ngan: 'Làm tròn số',
    tuan: [3, 4],
    yc: 'Làm tròn được số tự nhiên đến hàng chục, trăm, nghìn, chục nghìn, trăm nghìn và ước lượng được tổng, hiệu.',
    meo: 'Gặp 5 trở lên thì nhích lên một vạch.',
  },
  'chan-le': {
    mach: M('so'), ngan: 'Chẵn lẻ',
    tuan: [4, 5],
    yc: 'Nhận biết được số chẵn, số lẻ dựa vào chữ số tận cùng; lập được dãy số chẵn, số lẻ liên tiếp.',
    meo: 'Chỉ nhìn chữ cuối, các hàng kia bỏ qua.',
  },
  'khoi-luong': {
    mach: M('hinh'), ngan: 'Khối lượng',
    tuan: [5, 6],
    yc: 'Nhận biết được gam, ki-lô-gam, tạ, tấn; đổi được đơn vị khối lượng và so sánh được khối lượng.',
    meo: 'Xuống hàng thêm 0, lên hàng bớt 0.',
  },
  'dien-tich-don-vi': {
    mach: M('hinh'), ngan: 'Diện tích',
    tuan: [6, 7],
    yc: 'Biết dùng xăng-ti-mét vuông, đề-xi-mét vuông, mét vuông; đếm ô vuông và tính được diện tích hình chữ nhật.',
    meo: 'Đếm ô trước, nhân sau; đơn vị có mũ hai.',
  },
  'thoi-gian': {
    mach: M('hinh'), ngan: 'Thời gian',
    tuan: [7, 8],
    yc: 'Đọc được giờ trên đồng hồ; đổi được giờ, phút, giây, ngày, tuần, thế kỉ; tính được khoảng thời gian.',
    meo: 'Một giờ sáu mươi phút, không phải một trăm.',
  },
  'goc': {
    mach: M('hinh'), ngan: 'Các loại góc',
    tuan: [8, 9],
    yc: 'Nhận biết được góc nhọn, góc vuông, góc tù, góc bẹt; đo được góc bằng thước đo góc nửa hình tròn.',
    meo: 'Vuông là chín mươi, tù mở to hơn, nhọn khép lại.',
  },
  'vuong-goc-song-song': {
    mach: M('hinh'), ngan: 'Hai đường thẳng',
    tuan: [9, 10],
    yc: 'Nhận biết được hai đường thẳng vuông góc, song song; kẻ được đường thẳng vuông góc qua một điểm.',
    meo: 'Song song không gặp nhau dù kéo dài.',
  },
  'cong-tru': {
    mach: M('so'), ngan: 'Cộng trừ',
    tuan: [11, 13],
    yc: 'Đặt tính và tính được cộng, trừ các số có đến sáu chữ số; tính được giá trị biểu thức có ngoặc.',
    meo: 'Mượn một ở hàng trên thì trừ lại một ngay.',
  },
  'nhan': {
    mach: M('so'), ngan: 'Phép nhân',
    tuan: [12, 14],
    yc: 'Thuộc bảng nhân 2 đến 9; nhân được số có hai, ba chữ số với số có một chữ số; nhân nhẩm được với 11, 10, 100.',
    meo: 'Nhân từng hàng rồi cộng, nhớ mang số nhớ.',
  },
  'chia': {
    mach: M('so'), ngan: 'Phép chia',
    tuan: [14, 16],
    yc: 'Chia được số có nhiều chữ số cho số có một, hai chữ số; nhận biết chia hết và chia có dư.',
    meo: 'Số dư luôn nhỏ hơn số chia.',
  },
  'tat-ca': {
    mach: M('so'), ngan: 'Tính chất chung',
    tuan: [16, 17],
    yc: 'Vận dụng được tính chất giao hoán, kết hợp; tính giá trị biểu thức chữ và nhận ra hai biểu thức bằng nhau.',
    meo: 'Ngoặc trước, nhân chia trước, cộng trừ sau.',
  },
  'bai-toan-nhieu-buoc': {
    mach: M('giai'), ngan: 'Giải nhiều bước',
    tuan: [17, 18],
    yc: 'Giải được bài toán có lời văn đến hai, ba bước, gồm bài toán rút về đơn vị và bài toán tìm hai số.',
    meo: 'Vẽ sơ đồ trước, tính bước thiếu trước.',
  },
  'bang-so-lieu': {
    mach: M('so_lieu'), ngan: 'Bảng số liệu',
    tuan: [18, 19],
    yc: 'Nhận biết và đọc được bảng số liệu; tìm được số lớn nhất, nhỏ nhất và số trung bình cộng.',
    meo: 'Cộng hết rồi chia cho số lượng.',
  },
  'bieu-do-cot': {
    mach: M('so_lieu'), ngan: 'Biểu đồ cột',
    tuan: [19, 20],
    yc: 'Đọc, mô tả và bổ sung được số liệu trên biểu đồ cột và biểu đồ cột đôi; trả lời câu hỏi so sánh.',
    meo: 'Kẻ ngang từ đỉnh cột xuống trục số.',
  },
  'bieu-do-tranh': {
    mach: M('so_lieu'), ngan: 'Biểu đồ tranh',
    tuan: [20, 21],
    yc: 'Đọc được biểu đồ tranh và hiểu mỗi hình đại diện cho mấy đơn vị; xử lí được số liệu đơn giản.',
    meo: 'Xem chú giải một hình bằng mấy trước khi đếm.',
  },
  'xac-suat': {
    mach: M('so_lieu'), ngan: 'Khả năng',
    tuan: [21, 22],
    yc: 'Nhận biết được các khả năng chắc chắn, có thể, không thể của một sự kiện trong ví dụ đơn giản.',
    meo: 'Trong hộp không có thì không thể xảy ra.',
  },
  'phan-so-dau': {
    mach: M('so'), ngan: 'Phân số',
    tuan: [22, 24],
    yc: 'Nhận biết được khái niệm ban đầu về phân số; đọc, viết và biểu diễn được phân số trên hình.',
    meo: 'Mẫu là số phần cắt ra, tử là phần lấy.',
  },
  'phan-so-bang-nhau': {
    mach: M('so'), ngan: 'Phân số bằng nhau',
    tuan: [24, 25],
    yc: 'Rút gọn được phân số; nhận biết được hai phân số bằng nhau và giải thích được bằng hình.',
    meo: 'Nhân chia tử với mẫu cùng một số.',
  },
  'quy-dong-mau': {
    mach: M('so'), ngan: 'Quy đồng mẫu',
    tuan: [25, 26],
    yc: 'Quy đồng được mẫu số hai phân số; so sánh được hai phân số khác mẫu số.',
    meo: 'Đổi mẫu thì phải đổi tử, cùng một số.',
  },
  'cong-tru-phan-so': {
    mach: M('so'), ngan: 'Cộng trừ phân số',
    tuan: [26, 28],
    yc: 'Cộng, trừ được hai phân số cùng mẫu số; nhận biết được hỗn số, phần nguyên và phần phân số.',
    meo: 'Cộng tử giữ mẫu; mẫu khác thì quy đồng.',
  },
  'phan-so-cua-mot-so': {
    mach: M('giai'), ngan: 'Phân số của một số',
    tuan: [28, 29],
    yc: 'Tìm được phân số của một số cho trước trong tình huống thực tế có chia đều các phần.',
    meo: 'Chia cho mẫu trước, nhân với tử sau.',
  },
  'ti-so-tong-hieu': {
    mach: M('giai'), ngan: 'Tổng, hiệu, tỉ số',
    tuan: [29, 31],
    yc: 'Giải được bài toán tìm hai số khi biết tổng và tỉ số hoặc hiệu và tỉ số của hai số đó.',
    meo: 'Vẽ đủ số phần rồi mới tìm một phần.',
  },
  'ti-le-ban-do': {
    mach: M('hinh'), ngan: 'Tỉ lệ bản đồ',
    tuan: [31, 32],
    yc: 'Sử dụng được tỉ lệ bản đồ để tính độ dài thật hoặc độ dài thu nhỏ; đọc được phương hướng, khoảng cách.',
    meo: 'Đo trên bản đồ rồi nhân theo hệ số.',
  },
  'hinh-binh-hanh': {
    mach: M('hinh'), ngan: 'Hình bình hành',
    tuan: [32, 33],
    yc: 'Nhận biết được đặc điểm hình bình hành; tính được chu vi và diện tích hình bình hành.',
    meo: 'Đáy nhân chiều cao vuông góc, đừng dùng cạnh xiên.',
  },
  'hinh-thoi': {
    mach: M('hinh'), ngan: 'Hình thoi',
    tuan: [33, 34],
    yc: 'Nhận biết được đặc điểm hình thoi và hai đường chéo vuông góc; tính được diện tích hình thoi.',
    meo: 'Hai đường chéo nhân nhau rồi chia đôi.',
  },
  'on-tap-toan-4': {
    mach: M('on_tap'), ngan: 'Ôn tập Toán lớp 4',
    tuan: [34, 35],
    yc: 'Ôn tập, củng cố số tự nhiên, bốn phép tính, phân số, hình học và đo lường đã học ở lớp 4.',
    meo: 'Nhận ra dạng bài trước, tính sau.',
  },

  // ---- Toán 5 ----
  'thap-phan-khai-niem': {
    mach: M('so'), ngan: 'Số thập phân',
    tuan: [1, 4],
    yc: 'Nhận biết được khái niệm số thập phân, hàng phần mười, phần trăm, phần nghìn; đọc, viết và so sánh được.',
    meo: 'Sau dấu phẩy: phần mười, rồi trăm, rồi nghìn.',
  },
  'chuyen-dong-f-d-p': {
    mach: M('so'), ngan: 'Ba dạng số',
    tuan: [5, 9],
    yc: 'Chuyển đổi được giữa phân số thập phân, số thập phân và tỉ số phần trăm; xếp cặp được các dạng bằng giá trị.',
    meo: 'Một phần hai bằng không phẩy năm.',
  },
  'phan-tram': {
    mach: M('so'), ngan: 'Phần trăm',
    tuan: [8, 12],
    yc: 'Nhận biết được tỉ số phần trăm; tính được phần trăm của một số và vận dụng vào bài toán mua bán, giảm giá.',
    meo: 'Chia cho trăm rồi nhân số phần trăm.',
  },
  'the-tich': {
    mach: M('hinh'), ngan: 'Thể tích',
    tuan: [17, 22],
    yc: 'Nhận biết được xăng-ti-mét khối, mét khối; tính được thể tích hình hộp chữ nhật và hình lập phương.',
    meo: 'Dài nhân rộng nhân cao, đơn vị là lập phương.',
  },
  'ti-so-dau-bep': {
    mach: M('giai'), ngan: 'Tỉ số nguyên liệu',
    tuan: [10, 14],
    yc: 'Vận dụng tỉ số để gấp hoặc giảm khẩu phần trong bài toán thực tế liên quan đến rút về đơn vị.',
    meo: 'Gấp đôi số người thì gấp đôi mọi thứ.',
  },
  'chuyen-dong-de': {
    mach: M('giai'), ngan: 'Chuyển động đều',
    tuan: [22, 27],
    yc: 'Tính được quãng đường, vận tốc, thời gian của chuyển động đều; xử lí được hai chuyển động ngược chiều.',
    meo: 'Quãng đường bằng vận tốc nhân thời gian.',
  },
  'hinh-hoc-on-tap': {
    mach: M('hinh'), ngan: 'Ôn hình học',
    tuan: [12, 17],
    yc: 'Tính được chu vi, diện tích các hình đã học, hình tròn; tính được thể tích hình hộp chữ nhật.',
    meo: 'Chu vi là vòng quanh, diện tích là lát đầy.',
  },
  'thap-phan-can-bang': {
    mach: M('so'), ngan: 'So sánh thập phân',
    tuan: [3, 7],
    yc: 'So sánh và sắp thứ tự được các số thập phân; nhận biết được hai số thập phân bằng nhau.',
    meo: 'Thẳng dấu phẩy rồi so từng hàng.',
  },
  'on-tap-toan-5': {
    mach: M('on_tap'), ngan: 'Ôn tập Toán lớp 5',
    tuan: [30, 35],
    yc: 'Ôn tập tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5.',
    meo: 'Chọn cách giải trước, tính sau.',
  },

  // ---- Tiếng Anh 4 ----
  'tu-vung': {
    mach: M('kien_thuc'), ngan: 'Từ vựng Tiếng Anh',
    tuan: [1, 10],
    yc: 'Nhận biết và gọi tên được từ vựng các chủ điểm Animals, School, Family, Jobs, Colours, Hobbies.',
    meo: 'Nhìn tranh, đọc to, nhớ nghĩa tiếng Việt.',
  },
  'nghe': {
    mach: M('nghe_noi'), ngan: 'Nghe Tiếng Anh',
    tuan: [2, 11],
    yc: 'Nghe và nhận biết được khoảng 10 đến 15 từ, số, màu theo chủ điểm; nghe và chọn được tranh tương ứng.',
    meo: 'Bắt âm đầu trước, nghĩa theo sau.',
  },
  'ghep-tranh-tu': {
    mach: M('kien_thuc'), ngan: 'Ghép tranh với từ',
    tuan: [3, 11],
    yc: 'Nhận diện được từ qua hình ảnh và ghép đúng từ với tranh; nêu được nghĩa tiếng Việt tương ứng.',
    meo: 'Đọc to từ rồi mới nhìn nghĩa.',
  },
  'chinh-ta': {
    mach: M('doc'), ngan: 'Chính tả',
    tuan: [5, 14],
    yc: 'Viết đúng chính tả các từ đã học; điền được chữ cái còn thiếu và sửa được lỗi trong từ.',
    meo: 'Đọc chậm, đánh vần từng chữ cái.',
  },
  'xay-tu': {
    mach: M('doc'), ngan: 'Xây từ',
    tuan: [6, 15],
    yc: 'Sắp xếp các chữ cái xáo trộn thành từ đúng theo gợi ý nghĩa và tranh.',
    meo: 'Tìm nguyên âm trước, ghép phụ âm sau.',
  },
  'xep-cau': {
    mach: M('doc'), ngan: 'Xếp câu',
    tuan: [9, 18],
    yc: 'Sắp xếp các từ đã cho thành câu có nghĩa; dùng đúng động từ to be và mạo từ a, an, the.',
    meo: 'Ai, làm gì, ở đâu, theo thứ tự đó.',
  },
  'trieu-tu-vung': {
    mach: M('kien_thuc'), ngan: 'Triển lãm từ vựng',
    tuan: [12, 21],
    yc: 'Ghi nhớ được 8 đến 12 cặp từ và tranh theo chủ điểm; tái hiện được nghĩa tiếng Việt của từ.',
    meo: 'Đọc to cả cặp, đừng chỉ nhớ vị trí.',
  },
  'phonics': {
    mach: M('kien_thuc'), ngan: 'Ngữ âm',
    tuan: [4, 13],
    yc: 'Nhận biết và phát âm được các âm và chữ cái thường gặp; chọn được từ chứa âm mục tiêu.',
    meo: 'Gạch chân chữ tạo âm rồi mới đọc.',
  },
  'cau-hoi': {
    mach: M('nghe_noi'), ngan: 'Câu hỏi',
    tuan: [16, 25],
    yc: 'Nghe và trả lời được các câu hỏi What, Where, Who, How much, How old theo cấu trúc cho sẵn.',
    meo: 'Từ để hỏi đứng đầu câu.',
  },
  'ke-chuyen': {
    mach: M('doc'), ngan: 'Kể chuyện tranh',
    tuan: [20, 29],
    yc: 'Sắp xếp được 3 đến 5 tranh theo trình tự và kể lại bằng câu đơn giản có dấu chấm câu.',
    meo: 'First, Next, Then, Last.',
  },
  'nghe-phan-loai': {
    mach: M('nghe_noi'), ngan: 'Nghe phân loại',
    tuan: [14, 23],
    yc: 'Nghe và phân loại được từ vào ba nhóm theo chủ điểm; nghe và chỉ ra được từ khác loại.',
    meo: 'Nghe lần một để chọn, lần hai để kiểm tra.',
  },
  'dao-kynang': {
    mach: M('on_tap'), ngan: 'Ôn kỹ năng Tiếng Anh',
    tuan: [30, 35],
    yc: 'Vận dụng tổng hợp từ vựng, nghe, chính tả, đặt câu và phát âm ở mỗi đảo của bản đồ.',
    meo: 'Một đảo một kỹ năng, đừng vội sang đảo sau.',
  },

  // ---- Tiếng Anh 5 ----
  'doc-hieu': {
    mach: M('doc'), ngan: 'Đọc hiểu',
    tuan: [1, 10],
    yc: 'Đọc hiểu đoạn văn 60 đến 90 từ: tìm được ý chính, chi tiết và suy luận đơn giản có bằng chứng trong bài.',
    meo: 'Ý chính thường nằm ở câu đầu hay câu cuối.',
  },
  'nguphap': {
    mach: M('kien_thuc'), ngan: 'Ngữ pháp Tiếng Anh',
    tuan: [4, 13],
    yc: 'Dùng được hiện tại đơn, hiện tại tiếp diễn, quá khứ đơn; phân biệt danh từ đếm được và không đếm được với some, any.',
    meo: 'Thấy dấu hiệu thời gian thì chia động từ theo thì.',
  },
  'dien-tu-trong-doan-van': {
    mach: M('doc'), ngan: 'Điền từ vào đoạn',
    tuan: [10, 19],
    yc: 'Điền được từ vào 5 đến 8 chỗ trống trong đoạn văn dựa vào ngữ cảnh; đọc lại được cả đoạn.',
    meo: 'Đọc cả câu trước, đoán nghĩa rồi mới chọn.',
  },
  'xay-cum-tu': {
    mach: M('kien_thuc'), ngan: 'Ghép cụm từ',
    tuan: [6, 15],
    yc: 'Ghép được các cụm từ thường dùng và đặt câu với cụm từ; không dịch word-by-word từ tiếng Việt.',
    meo: 'Cụm từ đi liền mạch, không tách từng chữ.',
  },
  'bo-ba-tri-nho': {
    mach: M('kien_thuc'), ngan: 'Bộ ba ghi nhớ',
    tuan: [14, 23],
    yc: 'Ghi nhớ được bộ ba từ, tranh và nghĩa tiếng Việt cho 8 cặp trong mỗi lượt.',
    meo: 'Khớp hai thẻ rồi mới tin thẻ thứ ba.',
  },
  'noi': {
    mach: M('nghe_noi'), ngan: 'Nói tình huống',
    tuan: [18, 27],
    yc: 'Nói được câu ngắn theo tình huống với khung câu cho sẵn; phát âm đủ âm đầu và âm cuối.',
    meo: 'Nói chậm, bật đủ âm đầu và âm cuối.',
  },
  'on-tap': {
    mach: M('on_tap'), ngan: 'Ôn tập Tiếng Anh',
    tuan: [30, 35],
    yc: 'Ôn tập tổng hợp bốn kỹ năng nghe, nói, đọc, viết cùng từ vựng và ngữ pháp tiếng Anh lớp 5.',
    meo: 'Làm câu chắc trước, câu khó sau.',
  },
  'boss-cong-thu': {
    mach: M('on_tap'), ngan: 'Trận boss tổng hợp',
    tuan: [32, 35],
    yc: 'Vận dụng tổng hợp kiến thức đã học trong chương qua ba giai đoạn tăng độ khó.',
    meo: 'Hít một nhịp rồi mới chọn đáp án.',
  },
};

const normalize = (k) => k.replace(/[^a-z0-9]/g, '');
const BY_KEY = {};
for (const k of Object.keys(STANDARDS)) BY_KEY[normalize(k)] = { ...STANDARDS[k], name: k };

export function standard(key) {
  const hit = BY_KEY[normalize(key)];
  if (!hit) throw new Error('Thiếu dòng chuẩn kiến thức cho cụm: ' + key + ' — bổ sung tools/data/standards.mjs.');
  return hit;
}

export const STANDARD_KEYS = Object.keys(STANDARDS);
export const MACH_TEN = Object.values(MACH).map((m) => m.ten);

// Lịch năm học 35 tuần mà tầng "tuần học" (tools/lib/pacing.mjs, vòng 20) neo vào.
// Một tuần trong bảng này KHÔNG phải lịch của riêng trường em: khoảng `tuan` của cụm
// là vị trí thường thấy ở ba bộ sách, giáo viên mới là người xác nhận tuần thật.
export const SCHOOL_YEAR = {
  soTuan: 35,
  hocKi: { 1: [1, 18], 2: [19, 35] },
  // Bốn mốc kiểm tra định kì. `nuocRut` tuần trước mỗi mốc là vùng nước rút.
  moc: [
    { ten: 'giữa học kì 1', tuan: 10 },
    { ten: 'cuối học kì 1', tuan: 18 },
    { ten: 'giữa học kì 2', tuan: 28 },
    { ten: 'cuối học kì 2', tuan: 35 },
  ],
  nuocRut: 2,
  tongOnTu: 33,
};

// Học kì của một tuần bất kỳ trong năm.
export const hocKiCua = (tuan) => (tuan <= SCHOOL_YEAR.hocKi[1][1] ? 1 : 2);
