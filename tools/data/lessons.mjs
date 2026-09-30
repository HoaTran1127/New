// Nội dung riêng của từng GIÁO ÁN: mỗi cụm kiến thức Toán một bài giảng.
// Ba trường phải tự viết tay vì không thể suy ra từ dữ liệu có sẵn:
//   ten        — tên bài giảng, đặt theo cách giáo viên nói với lớp chứ không theo tên game
//   khoi_dong  — câu hỏi mở đầu bước 1: gắn với vật thật trong đời, CHƯA viết gì lên bảng
//   chot       — dòng ghi nhớ viết bằng phấn ở cuối bài, một câu duy nhất, <= 25 từ
//
// Phần còn lại của giáo án được build-lessons.mjs ghép từ nguồn có sẵn để không trùng lặp nội dung:
//   mục tiêu và lỗi hay mắc   ← tools/data/clusters.mjs (noi_dung, giai_thich, tags)
//   vật thật và sơ đồ         ← tools/data/props.mjs (vat, don_vi, ngon_tay, so_do, doc)
//   bài luyện tập cả lớp      ← tools/data/examples.mjs (đúng hai câu của cụm đó)
//   game để luyện sau tiết    ← catalog, các game cùng cụm kiến thức
//
// Lý do tồn tại: công cụ giảng bài khác game học sinh ở chỗ nó phải có MỘT mạch bài duy nhất
// đi từ vật thật tới phép tính, và mạch đó phải giống nhau ở mọi bài để giáo viên thuộc được.
// Nếu để mô hình tự bịa mạch bài cho từng cụm thì 44 giáo án sẽ ra 44 kiểu dạy khác nhau.

import { ERROR_NOTES } from './error-notes.mjs';

const L = {
  'hang-so': {
    ten: 'Giá trị theo hàng: cùng một chữ số, đáng giá bao nhiêu',
    khoi_dong: 'Cô có 350 000 đồng và cô cũng có 350 đồng. Cả hai số đều có chữ số 3 và chữ số 5, vậy vì sao một số lại lớn gấp hơn một nghìn lần số kia?',
    chot: 'Cùng một chữ số nhưng đứng ở hàng khác nhau thì giá trị khác nhau; hàng bên trái luôn gấp 10 lần hàng ngay bên phải nó.',
  },
  'so-sanh-sap-xep': {
    ten: 'So sánh và sắp xếp số có nhiều chữ số',
    khoi_dong: 'Hai bạn thi viết số lớn hơn: một bạn chỉ được viết 5 chữ số, một bạn được viết 6 chữ số. Chưa cần đọc hết số, ai chắc chắn thắng?',
    chot: 'So sánh bắt đầu từ số chữ số rồi mới so từ hàng lớn nhất xuống; đừng nhìn chữ số đầu tiên mà kết luận ngay.',
  },
  'lam-tron': {
    ten: 'Làm tròn số bằng tia số',
    khoi_dong: 'Mua món đồ giá 48 nghìn, cô đưa tờ 50 nghìn. Vì sao cả người bán và cô đều nói gọn là "gần 50 nghìn"?',
    chot: 'Làm tròn là tìm mốc tròn gần nhất trên tia số; chữ số quyết định nằm ngay bên phải hàng đang làm tròn, từ 5 trở lên thì làm tròn lên.',
  },
  'chan-le': {
    ten: 'Số chẵn số lẻ nhìn ở chữ số tận cùng',
    khoi_dong: 'Xếp 15 bạn của lớp mình thành từng đôi để múa. Có bạn nào phải đứng một mình không?',
    chot: 'Chỉ chữ số tận cùng quyết định chẵn hay lẻ; ghép hết thành đôi là chẵn, còn một mình là lẻ.',
  },
  'khoi-luong': {
    ten: 'Tấn, tạ, ki-lô-gam, gam và cân hai đĩa',
    khoi_dong: 'Một con voi và một túi đường. Vì sao không ai nói "con voi nặng 3 ki-lô-gam" dù số 3 rất nhỏ?',
    chot: 'Một tấn bằng 10 tạ bằng 1000 kg; đổi đơn vị là nhân hoặc chia đúng 10 mỗi bậc, và phải đổi về cùng đơn vị trước khi so sánh.',
  },
  'dien-tich-don-vi': {
    ten: 'Diện tích là số ô vuông phủ kín hình',
    khoi_dong: 'Muốn lát kín nền phòng học thì cần biết chiều dài của phòng, hay cần biết bao nhiêu viên gạch?',
    chot: 'Diện tích đếm bằng ô vuông đơn vị nên đơn vị là cm², dm², m²; hình chữ nhật là dài nhân rộng, đừng nhầm sang chu vi.',
  },
  'thoi-gian': {
    ten: 'Đọc giờ, phút và khoảng thời gian',
    khoi_dong: 'Kim dài chỉ số 6. Đó là 6 phút hay 30 phút?',
    chot: 'Mỗi số trên mặt đồng hồ ứng với 5 phút; kim ngắn chỉ giờ, kim dài chỉ phút, còn khoảng thời gian là hiệu của hai mốc.',
  },
  'goc': {
    ten: 'Đo góc bằng thước nửa tròn',
    khoi_dong: 'Cánh cửa mở hé và cánh cửa mở toang. Góc nào lớn hơn, và làm sao biết nó lớn hơn bao nhiêu độ?',
    chot: 'Góc vuông 90 độ là mốc so sánh: nhỏ hơn là góc nhọn, lớn hơn mà chưa thẳng là góc tù, đúng 180 độ là góc bẹt.',
  },
  'vuong-goc-song-song': {
    ten: 'Hai đường vuông góc và hai đường song song',
    khoi_dong: 'Ngay trong lớp mình, tìm hai vật song song với nhau và hai vật vuông góc với nhau?',
    chot: 'Kéo dài mãi mà không gặp nhau là song song; gặp nhau và khít đúng góc của ê-ke là vuông góc.',
  },
  'cong-tru': {
    ten: 'Cộng trừ có nhớ và có mượn, nhìn bằng bó que',
    khoi_dong: 'Có 3 bó chục và 2 que lẻ. Muốn bớt đi 5 que thì làm thế nào khi số que lẻ không đủ để bớt?',
    chot: 'Thiếu ở một hàng thì mượn một bó của hàng bên trái và bó đó tách thành đúng 10 que; nhớ và mượn phải ghi lại chứ không tính nhẩm rồi quên.',
    // Cùng một cụm nhưng hai lớp dạy hai chuyện: lớp 4 học đặt tính và nhớ/mượn, lớp 5 (T5-01 Nhiệm Vụ
    // Phép Tính) mở đầu năm bằng giá trị biểu thức và thứ tự thực hiện phép tính. Lời giảng phân nhánh
    // theo lớp; cụm `cong-tru` trong clusters.mjs vẫn phủ cả hai vì nó ghi đủ vế "giá trị biểu thức".
    giao_an: {
      theo_lop: {
        5: {
          ten: 'Giá trị biểu thức: tính trước, tính sau',
          khoi_dong: 'Trong biểu thức 24 + 6 × 3, làm phép tính nào trước để cả lớp không tranh nhau hai đáp số?',
          chot: 'Không có ngoặc thì nhân chia trước, cộng trừ sau; có ngoặc thì làm trong ngoặc trước; đặt tính dọc vẫn phải đúng hàng và đúng chỗ mượn.',
          muc_tieu: 'tính giá trị biểu thức có đến hai phép tính và có ngoặc, đặt tính dọc đúng hàng với số có đến 6 chữ số',
        },
      },
    },
  },
  'nhan': {
    ten: 'Phép nhân là cộng lặp lại, nhìn bằng mảng chấm',
    khoi_dong: 'Mỗi hộp có 6 cái bút và có 4 hộp. Đếm từng cái một hay có cách nào nhanh hơn?',
    chot: 'a nhân b là b hàng, mỗi hàng có a chấm; tính tổng các hàng trước rồi mới rút thành phép nhân để thấy nhân chính là cộng lặp lại.',
  },
  'chia': {
    ten: 'Chia đều và số dư',
    khoi_dong: '17 cái kẹo chia đều cho 5 bạn. Còn thừa mấy cái và vì sao không chia tiếp được nữa?',
    chot: 'Chia là phát lần lượt mỗi nhóm một đơn vị cho tới khi hết; phần còn lại không đủ cho mỗi nhóm một đơn vị nữa là số dư, và số dư luôn nhỏ hơn số chia.',
  },
  'tat-ca': {
    ten: 'Hai vế của biểu thức như hai đĩa cân',
    khoi_dong: 'Một cái cân đang thăng bằng. Bỏ thêm 2 quả cân vào CẢ HAI đĩa thì cân sẽ thế nào?',
    chot: 'Cộng hoặc trừ cả hai vế cùng một lượng thì cân vẫn thăng bằng; nhờ đó tìm được số còn thiếu mà không phải đoán thử.',
  },
  'bai-toan-nhieu-buoc': {
    ten: 'Bài toán nhiều bước và sơ đồ đoạn thẳng',
    khoi_dong: 'Một bài toán đố dài bốn dòng chữ. Làm sao biết phải tính cái gì trước?',
    chot: 'Vẽ sơ đồ trước rồi mới tính; mỗi bước một phép tính kèm đơn vị, và đáp số nằm ở bước cuối cùng.',
  },
  'bang-so-lieu': {
    ten: 'Đọc bảng số liệu không nhầm hàng, không nhầm cột',
    khoi_dong: 'Trong bảng điểm của cả lớp, làm sao tìm đúng điểm của một bạn mà không đọc sang bạn ngồi bên cạnh?',
    chot: 'Phải dóng đúng cả tên hàng và tên cột mới đọc được giá trị của một ô; số trung bình cộng bằng tổng chia cho số phần tử.',
  },
  'bieu-do-cot': {
    ten: 'Biểu đồ cột và đường dóng sang trục giá trị',
    khoi_dong: 'Hai cột cao gần bằng nhau. Làm sao biết cột nào cao hơn mà không đoán bằng mắt?',
    chot: 'Kẻ một đường dóng ngang từ đỉnh cột sang trục giá trị rồi đọc đúng vạch; cấm ước lượng bằng mắt.',
  },
  'bieu-do-tranh': {
    ten: 'Biểu đồ tranh: một hình bằng mấy đơn vị',
    khoi_dong: 'Biểu đồ vẽ 3 cái kẹo, nhưng chú giải ghi "1 hình = 5 cái". Vậy thực ra có mấy cái?',
    chot: 'Mở khung chú giải ra đọc trước rồi mới đếm hình; số hình nhân với giá trị một hình, còn nửa hình thì tính nửa giá trị.',
  },
  'xac-suat': {
    ten: 'Chắc chắn, có thể, không thể',
    khoi_dong: 'Trong hộp kín chỉ có bóng đỏ. Nhắm mắt rút một quả. Có thể rút ra bóng xanh không?',
    chot: 'Liệt kê hết các kết quả có thể rồi đếm kết quả thuận lợi; không có kết quả thuận lợi là không thể, mọi kết quả đều thuận lợi là chắc chắn.',
  },
  'phan-so-dau': {
    ten: 'Phân số là mấy phần của một cái được chia đều',
    khoi_dong: 'Một cái pizza cắt cho 4 bạn, mỗi bạn một miếng. Làm sao nói gọn "một miếng trong bốn miếng bằng nhau"?',
    chot: 'Mẫu số là số phần bằng nhau của cả cái, tử số là số phần được lấy; các phần phải bằng nhau tuyệt đối thì mới gọi là phân số.',
  },
  'phan-so-bang-nhau': {
    ten: 'Hai phân số bằng nhau và rút gọn phân số',
    khoi_dong: 'Bạn An ăn 1/2 cái bánh, bạn Bình ăn 2/4 cái bánh cùng loại. Ai ăn nhiều hơn?',
    chot: 'Hai phần tô trùng khít nhau trên hai băng bằng chiều dài là hai phân số bằng nhau; chia cả tử và mẫu cho cùng một số khác 0 thì giá trị không đổi.',
  },
  'quy-dong-mau': {
    ten: 'Quy đồng mẫu số để so sánh hai phân số',
    khoi_dong: 'Không có hình vẽ nào cả, làm sao biết 1/3 và 1/4 cái nào lớn hơn?',
    chot: 'Muốn so sánh hai phân số khác mẫu thì phải chia lại cả hai trên cùng một trục; nhân cả tử và mẫu nên độ dài phần tô không thay đổi.',
  },
  'cong-tru-phan-so': {
    ten: 'Cộng trừ phân số cùng mẫu trên trục',
    khoi_dong: 'Ăn 1/4 cái bánh rồi ăn thêm 2/4 cái nữa. Làm sao nhìn một cái là thấy ngay 3/4?',
    chot: 'Cùng mẫu số thì cộng hoặc trừ tử số và giữ nguyên mẫu; vượt quá một cái đầy thì viết thành hỗn số có phần nguyên.',
  },
  'phan-so-cua-mot-so': {
    ten: 'Tìm phân số của một số',
    khoi_dong: 'Một hòm có 12 đồng vàng, lấy ra 1/3 hòm. Lấy mấy đồng?',
    chot: 'Chia số đó cho mẫu số để ra giá trị một phần, rồi nhân với tử số; phải chia thành nhóm bằng nhau trước rồi mới lấy phần.',
  },
  'ti-so-tong-hieu': {
    ten: 'Tìm hai số khi biết tổng hoặc hiệu và tỉ số',
    khoi_dong: 'Hai anh em có tất cả 30 viên bi, số bi của anh gấp đôi số bi của em. Không đoán thử, làm sao chia đúng?',
    chot: 'Chia tổng hoặc hiệu thành các phần bằng nhau theo tỉ số; giá trị một phần bằng tổng chia cho tổng số phần.',
  },
  'ti-le-ban-do': {
    ten: 'Tỉ lệ bản đồ và độ dài thật',
    khoi_dong: 'Đo trên bản đồ được 3 cm. Ngoài đời thật con đường đó dài bao nhiêu?',
    chot: 'Một xăng-ti-mét trên bản đồ ứng với một số mét thật ghi ở thước tỉ lệ; độ dài thật bằng số đo trên bản đồ nhân với hệ số tỉ lệ.',
  },
  'hinh-binh-hanh': {
    ten: 'Diện tích hình bình hành bằng cách cắt và ghép',
    khoi_dong: 'Hình bình hành không phải hình chữ nhật. Vậy công thức dài nhân rộng còn dùng được không?',
    chot: 'Cắt mảnh tam giác theo đường cao rồi ghép sang phía bên kia thành hình chữ nhật; đáy thành chiều dài và đường cao thành chiều rộng.',
  },
  'hinh-thoi': {
    ten: 'Diện tích hình thoi bằng hai đường chéo',
    khoi_dong: 'Bốn tam giác của một hình thoi xếp lại với nhau thì thành hình gì?',
    chot: 'Hai đường chéo của hình thoi vuông góc và cắt nhau tại trung điểm mỗi đường; ghép bốn tam giác thành hình chữ nhật nên diện tích là tích hai đường chéo chia 2.',
  },
  // Chủ đề SGK lớp 5 chưa có game nào trong catalog, nên giáo án này đứng một mình (CHU_DE_CHI_CO_GIAO_AN).
  'hinh-tron': {
    ten: 'Chu vi và diện tích hình tròn: một vòng lăn và tám quạt ghép',
    khoi_dong: 'Cho cái bánh xe này lăn đúng một vòng trên sàn. Vết sơn trên vành vẽ được một đoạn dài bao nhiêu, và đoạn đó liên quan gì tới cái bánh xe?',
    chot: 'Chu vi hình tròn bằng đường kính nhân 3,14; cắt hình tròn thành nhiều quạt bằng nhau rồi ghép xen kẽ thành hình gần chữ nhật, nên diện tích bằng bán kính nhân bán kính nhân 3,14.',
  },
  'hinh-tam-giac': {
    ten: 'Diện tích tam giác: ghép hai tấm bìa thành một hình bình hành',
    khoi_dong: 'Chỉ có một tấm bìa hình tam giác. Làm sao dùng nó tìm ra diện tích mà không phải đếm từng ô vuông?',
    chot: 'Hai tam giác giống hệt ghép lại thành hình bình hành nên diện tích tam giác bằng đáy nhân chiều cao chia 2, và chiều cao phải vuông góc với đáy.',
  },
  'hinh-thang': {
    ten: 'Diện tích hình thang: xoay một mảnh để về hình đã học',
    khoi_dong: 'Hình thang có hai đáy dài ngắn khác nhau. Cắt chỗ nào và ghép vào đâu để nó thành hình mình đã có công thức?',
    chot: 'Cắt mảnh tam giác theo đường cao rồi xoay 180 độ ghép sang đầu kia được hình bình hành có đáy bằng tổng hai đáy, nên diện tích hình thang bằng tổng hai đáy nhân chiều cao chia 2.',
  },
  'dien-tich-xq-tp': {
    ten: 'Mở hộp: bốn mặt xung quanh và sáu mặt toàn phần',
    khoi_dong: 'Dán giấy kín cái hộp này thì tốn nhiều giấy hơn là dán riêng bốn mặt xung quanh, hay bằng nhau?',
    chot: 'Diện tích xung quanh bằng chu vi đáy nhân chiều cao; diện tích toàn phần bằng diện tích xung quanh cộng hai mặt đáy, và hình lập phương có sáu mặt bằng nhau.',
  },
  'nhan-phan-so': {
    ten: 'Nhân phân số bằng tấm lưới tô kép',
    khoi_dong: 'Tấm bảng che mất 2/3 chiều dài và 3/4 chiều rộng của một bức tường. Muốn biết nó che mấy phần tường, ta cộng hay nhân hai phân số?',
    chot: 'Nhân hai phân số thì lấy tử nhân tử, mẫu nhân mẫu; tô lưới theo hai hướng thì phần ô tô kép đúng bằng tích đó, và kết quả phải rút gọn.',
  },
  'chia-phan-so': {
    ten: 'Chia phân số: kéo cạnh chưa biết của mảnh vườn',
    khoi_dong: 'Mảnh vườn hình chữ nhật rộng 4/5 m và phủ đúng 2/3 m² đất. Phải kéo cạnh dài tới ô nào thì diện tích vừa bằng 2/3?',
    chot: 'Muốn chia một phân số cho một phân số, ta nhân phân số thứ nhất với phân số thứ hai viết ngược; tìm cạnh chưa biết của hình chữ nhật chính là làm ngược lại phép nhân diện tích.',
  },
  'nhan-chia-thap-phan': {
    ten: 'Nhân chia số thập phân: ô phủ thảm và dấu phẩy chạy trên bảng hàng',
    khoi_dong: 'Lớp mình dài 8,4 m và rộng 5,2 m. Trải thảm ô vuông xuống thì phủ bao nhiêu ô, và dấu phẩy của kết quả nên ngắt ở chỗ nào?',
    chot: 'Nhân hai số thập phân thì nhân như số tự nhiên, rồi đếm tổng chữ số thập phân của hai thừa số để ngắt tích từ phải sang; nhân với 0,1 hay chia cho 10 đều dịch dấu phẩy sang trái một chữ số, còn chia cho 0,1 thì dịch sang phải.',
  },
  'bieu-do-quat': {
    ten: 'Biểu đồ hình quạt tròn: một vòng tròn mang đúng 100%',
    khoi_dong: 'Cả cái bánh tròn này là 160 quyển sách của thư viện. Một quạt bằng nửa cái bánh thì có bao nhiêu quyển, và vì sao?',
    chot: 'Mỗi quạt là một tỉ số phần trăm của cùng một tổng 100%; muốn ra số lượng thì lấy tổng nhân số phần trăm rồi chia 100, còn hai quạt của hai biểu đồ có tổng khác nhau thì chưa so được bằng mắt.',
  },
  'on-tap-toan-4': {
    ten: 'Ôn tập cuối lớp 4 trên bốn trạm vật thật',
    khoi_dong: 'Suốt năm lớp 4, chúng mình đã dùng những vật thật nào để học Toán?',
    chot: 'Mỗi mạch kiến thức có một vật thật và một sơ đồ riêng; nhận ra bài thuộc mạch nào thì chọn đúng vật của mạch đó.',
    // Hai trường này của cụm gốc nói bằng tiếng trò chơi ("cửa ải"); giáo án phải nói bằng tiếng lớp.
    giao_an: {
      giai_thich: 'gọi lại kiến thức lớp 4 tương ứng với từng trạm',
      doc: 'mỗi trạm viết một dòng phấn nhắc lại kiến thức của trạm vừa dùng trước khi ghi đáp số',
    },
  },
  'boss-cong-thu': {
    ten: 'Tổng hợp chương: chọn đúng công thức trước khi tính',
    khoi_dong: 'Đọc xong đề bài, việc đầu tiên là tính luôn hay là nhận ra đề đang hỏi công thức nào?',
    chot: 'Viết lại đúng công thức cần dùng rồi mới thế số; sai công thức thì tính cẩn thận đến mấy cũng ra đáp số sai.',
    // Cụm này sinh ra cho game "trận boss ba giai đoạn", nên mục tiêu, lời giải thích và cả năm
    // trường vật thật của nó đều mang cơ chế trò chơi (vòng sáng lên khi "phá xong", thẻ gợi ý
    // miễn phí). Giáo án giữ nguyên mạch ba bước nhưng phải nói bằng ngôn ngữ của một tiết học.
    giao_an: {
      muc_tieu: 'Tổng hợp ba mạch kiến thức đã học trong chương theo đúng ba bước của một bài giải: đọc đề để nhận ra mạch nào, chọn công thức của mạch đó, rồi kiểm lại đáp số',
      giai_thich: 'sau mỗi bước giáo viên hỏi cả lớp "công thức nào vừa dùng?" rồi mới viết bước tiếp; bước nào lớp còn vướng thì dựng lại sơ đồ của bước đó từ đầu, không đưa sẵn đáp án',
      vat: 'ba vòng tròn đồng tâm vẽ phấn, mỗi vòng là một bước của lời giải: đọc đề, chọn công thức, kiểm lại đáp số',
      don_vi: 'một vật thật của mạch kiến thức đang được hỏi ở bước đó',
      ngon_tay: 'viết xong một bước thì quẹt một đường để đóng vòng đó lại và vòng kế tiếp sáng lên; nội dung đã viết không bị xoá',
      doc: 'sau mỗi bước hiện một dòng phấn ghi tên công thức vừa dùng; viết lại đúng công thức đó rồi mới sang bước tiếp',
      so_do: 'ba vòng tròn đồng tâm vẽ lại thành bảng ba cột "bước / công thức cần dùng / lỗi hay mắc", mỗi cột điền bằng phấn trước khi vào bước đó',
      // Ba nhãn lỗi của cụm này describe phản ứng khi chơi (nóng vội, thiếu thời gian nghĩ), vô nghĩa
      // trên bảng chẩn đoán của một tiết học không có đồng hồ. giáo án đổi lời, vẫn giữ ba nhãn để
      // errorTag của game cùng cụm và của giáo án nói chuyện được với nhau.
      loi_viet: [
        'đọc vội đề nên nhận sai mạch kiến thức',
        'viết phép tính trước khi chọn công thức',
        'thế số xong bỏ qua bước kiểm lại đáp số',
      ],
    },
  },
  'thap-phan-khai-niem': {
    ten: 'Số thập phân sinh ra từ lưới 100 ô',
    khoi_dong: 'Một cái bánh chia thành 100 phần bằng nhau, ăn 25 phần. Nói gọn bằng MỘT số thì nói thế nào?',
    chot: 'Phần mười, phần trăm, phần nghìn là các hàng đứng sau dấu phẩy; 25/100 viết là 0,25 và đọc là không phẩy hai mươi lăm.',
  },
  'chuyen-dong-f-d-p': {
    ten: 'Ba dạng viết của cùng một giá trị',
    khoi_dong: '1/2, 0,5 và 50% là một thứ hay là ba thứ khác nhau?',
    chot: 'Phân số thập phân, số thập phân và phần trăm là ba cách viết của cùng một lượng; dóng ba băng trên một trục thì thấy chúng trùng khít.',
  },
  'phan-tram': {
    ten: 'Tỉ số phần trăm và bài toán giảm giá',
    khoi_dong: 'Cái áo giá 200 nghìn được giảm 20%. Vậy được giảm bao nhiêu tiền và phải trả bao nhiêu?',
    chot: 'Phần trăm của một số bằng số đó nhân với tỉ lệ rồi chia cho 100; số tiền phải trả bằng giá ban đầu trừ đi phần được giảm.',
  },
  'the-tich': {
    ten: 'Thể tích là số khối lập phương xếp đầy hình',
    khoi_dong: 'Một cái hộp phải xếp bao nhiêu khối cạnh 1 cm thì đầy kín?',
    chot: 'Thể tích đếm bằng khối lập phương đơn vị nên đơn vị là cm³ hoặc m³; xếp kín một lớp đáy rồi nhân với số lớp.',
  },
  'ti-so-dau-bep': {
    ten: 'Gấp và giảm khẩu phần theo tỉ số nguyên liệu',
    khoi_dong: 'Công thức nấu cho 2 người, nhưng nhà mình có 6 người ăn. Mỗi nguyên liệu phải làm gì?',
    chot: 'Mọi nguyên liệu cùng nhân một hệ số thì tỉ số giữa chúng không đổi; hệ số bằng số khẩu phần mới chia cho số khẩu phần cũ.',
  },
  'chuyen-dong-de': {
    ten: 'Quãng đường, vận tốc, thời gian và hai xe ngược chiều',
    khoi_dong: 'Hai xe đi ngược chiều từ hai đầu một con đường. Làm sao biết chúng gặp nhau ở chỗ nào?',
    chot: 'Quãng đường bằng vận tốc nhân thời gian; hai chuyển động ngược chiều thì mỗi đơn vị thời gian khoảng cách ngắn đi đúng bằng tổng hai vận tốc.',
  },
  'hinh-hoc-on-tap': {
    ten: 'Chu vi, diện tích, thể tích: chọn đúng công thức',
    khoi_dong: 'Bốn hình đã học thì có bốn công thức khác nhau. Làm sao để không dùng nhầm?',
    chot: 'Đo đủ số đo mà công thức cần rồi mới thế số; chu vi và diện tích khác đơn vị, diện tích và thể tích cũng khác đơn vị.',
  },
  'thap-phan-can-bang': {
    ten: 'So sánh số thập phân theo cột dấu phẩy',
    khoi_dong: '0,5 và 0,48: số nào lớn hơn, và vì sao nhiều chữ số hơn chưa chắc đã lớn hơn?',
    chot: 'Xếp thẳng cột dấu phẩy rồi so từng hàng từ trái sang phải; thêm chữ số 0 vào cuối phần thập phân thì giá trị không đổi.',
  },
  'on-tap-toan-5': {
    ten: 'Ôn tập cuối lớp 5: chọn chiến lược trước khi tính',
    khoi_dong: 'Một bài toán đố lớp 5 có tới ba cách làm. Làm sao biết cách nào nên dùng?',
    chot: 'Chốt chiến lược trước khi tính: rút về đơn vị, dùng tỉ số hay vẽ sơ đồ đoạn thẳng; mọi bước phải nằm dọc theo chiến lược đã chọn.',
  },
};

export const LESSON_EXTRA = L;
export const LESSON_EXTRA_KEYS = Object.keys(L);
export const LESSON_FIELDS = ['ten', 'khoi_dong', 'chot'];
// Các trường được phép ghi đè cho riêng giáo án. Đây là những chuỗi lấy từ clusters.mjs và
// props.mjs — hai nguồn DÙNG CHUNG với 85 prompt game — nên một số cụm mang cơ chế trò chơi
// ("trận boss", "cửa ải", "thẻ gợi ý miễn phí"). Override chỉ thay lời, không thay kiến thức:
// vẫn cùng một mạch ba bước, chỉ nói bằng ngôn ngữ của một tiết học.
export const OVERRIDE_FIELDS = ['muc_tieu', 'giai_thich', 'vat', 'don_vi', 'ngon_tay', 'so_do', 'doc'];
// loi_viet là MẢNG, ghi đè danh sách lỗi in ở mục 1 cho riêng giáo án: ba nhãn lỗi của cụm boss
// mô tả phản ứng của người chơi game (nóng vội, thiếu thời gian nghĩ) chứ không mô tả lỗi Toán.
export const OVERRIDE_LIST_FIELDS = ['loi_viet'];
export const hasOverride = (clusterKey) => Boolean(L[clusterKey] && L[clusterKey].giao_an);

// Chủ đề SGK thật sự có trong chương trình Toán 4–5 nhưng thư viện 85 prompt game chưa có game nào.
// Giáo án KHÔNG được khớp 1-1 với game nữa: cô dạy chủ đề này trên lớp thì phải có bài giảng, dù
// sau tiết chưa có game cho em tự luyện. Mỗi mục là một cặp (cụm, lớp); dữ liệu của cụm vẫn phải
// đủ bộ như mọi cụm khác (clusters.mjs + props.mjs + examples.mjs + error-notes.mjs + ba trường
// viết tay ở file này), chỉ phần "game cùng cụm" là được phép trống.
export const CHU_DE_CHI_CO_GIAO_AN = [
  { cluster: 'hinh-tron', lop: '5' },
  { cluster: 'hinh-tam-giac', lop: '5' },
  { cluster: 'hinh-thang', lop: '5' },
  { cluster: 'dien-tich-xq-tp', lop: '5' },
  { cluster: 'nhan-phan-so', lop: '4' },
  { cluster: 'chia-phan-so', lop: '4' },
  { cluster: 'nhan-chia-thap-phan', lop: '5' },
  { cluster: 'bieu-do-quat', lop: '5' },
];

// Dòng thay cho "Bản game của cùng cụm kiến thức này" ở bài chưa có game. Builder in ra, validator
// đòi đúng chuỗi này — viết ở đây để hai bên không tự bịa một câu khác nhau.
export const CHUA_CO_GAME_CUM =
  'Chủ đề này **chưa có bản game cùng cụm** trong thư viện prompt game — sau tiết, giáo viên tự ra đề luyện trên giấy hoặc trên bảng, KHÔNG bịa thêm màn chơi vào bài giảng.';

// Danh sách lỗi in ở mục 1 của giáo án: lời override nếu cụm có, nếu không thì nguyên văn
// ERROR_NOTES. Builder và validator đi qua đúng một cửa này nên không thể lệch nhau.
export const notesCuaGiaoAn = (L) => L.loi_viet || ERROR_NOTES[L.cluster].split('; ');

// Ghép một giáo án hoàn chỉnh: nội dung tự viết tay + dữ liệu có sẵn của cụm kiến thức.
// `rows` là các dòng của catalogs/GAME_CATALOG.csv, nguồn duy nhất cho biết cụm nào dạy ở lớp nào.
export function buildLessons(rows, { cluster, prop, EXAMPLES, GAMES }) {
  const byId = new Map(rows.map((r) => [r.id, r]));
  const math = GAMES.filter((g) => byId.get(g.id)?.mon === 'Toán');
  if (!math.length) throw new Error('Catalog không có game Toán nào — không dựng được giáo án.');

  // Một cụm có thể được dạy ở cả lớp 4 và lớp 5 (ví dụ cong-tru): mỗi cặp (cụm, lớp) là một giáo án,
  // vì mục tiêu và độ khó của cùng một mạch kiến thức ở hai lớp là khác nhau.
  const grouped = new Map();
  for (const g of math) {
    const r = byId.get(g.id);
    const key = `${g.cluster}|${r.lop}`;
    if (!grouped.has(key)) grouped.set(key, { cluster: g.cluster, lop: r.lop, games: [] });
    grouped.get(key).games.push({ id: g.id, name: g.name });
  }
  // Chủ đề SGK chưa có game: giáo án vẫn phải tồn tại, chỉ thiếu phần "game cùng cụm để luyện sau tiết".
  for (const them of CHU_DE_CHI_CO_GIAO_AN) {
    const key = `${them.cluster}|${them.lop}`;
    if (grouped.has(key)) throw new Error(`CHU_DE_CHI_CO_GIAO_AN: cặp ${key} đã có game trong catalog, không cần khai báo thêm.`);
    if (!['4', '5'].includes(String(them.lop))) throw new Error(`CHU_DE_CHI_CO_GIAO_AN: lớp "${them.lop}" không hợp lệ (chỉ 4 hoặc 5).`);
    grouped.set(key, { cluster: them.cluster, lop: String(them.lop), games: [] });
  }

  const out = [];
  const seq = { 4: 0, 5: 0 };
  for (const item of grouped.values()) {
    const extra = L[item.cluster];
    if (!extra) throw new Error(`Cụm ${item.cluster} chưa có nội dung giáo án trong tools/data/lessons.mjs.`);
    for (const f of LESSON_FIELDS) if (!extra[f] || !String(extra[f]).trim()) throw new Error(`Giáo án ${item.cluster} thiếu trường ${f}.`);
    const cl = cluster(item.cluster);
    const p = prop(item.cluster);
    const ex = EXAMPLES[item.cluster];
    if (!ex || ex.length < 2) throw new Error(`Cụm ${item.cluster} không có đủ 2 câu mẫu để làm phần luyện tập cả lớp.`);
    seq[item.lop] += 1;
    const ov = extra.giao_an || {};
    // theo_lop: cùng một cụm nhưng hai lớp dạy hai nội dung khác nhau (cong-tru lớp 4 là số tự nhiên,
    // lớp 5 là số thập phân), nên lời của giáo án phải phân nhánh theo lớp chứ không dùng chung.
    const theoLop = ov.theo_lop || {};
    for (const lopK of Object.keys(theoLop)) {
      if (!['4', '5'].includes(String(lopK))) throw new Error(`Giáo án ${item.cluster}: theo_lop chứa lớp "${lopK}" không hợp lệ.`);
      for (const f of Object.keys(theoLop[lopK])) {
        if (!OVERRIDE_FIELDS.includes(f) && !OVERRIDE_LIST_FIELDS.includes(f) && !LESSON_FIELDS.includes(f)) {
          throw new Error(`Giáo án ${item.cluster} lớp ${lopK}: "${f}" không phải trường được phép ghi đè theo lớp.`);
        }
      }
    }
    const ovHop = { ...ov, ...(theoLop[item.lop] || {}) };
    delete ovHop.theo_lop;
    for (const f of Object.keys(ovHop)) {
      if (!OVERRIDE_FIELDS.includes(f) && !OVERRIDE_LIST_FIELDS.includes(f) && !LESSON_FIELDS.includes(f)) {
        throw new Error(`Giáo án ${item.cluster}: "${f}" không phải trường được phép override.`);
      }
      if (OVERRIDE_LIST_FIELDS.includes(f)) {
        const arr = ovHop[f];
        if (!Array.isArray(arr)) throw new Error(`Giáo án ${item.cluster}: override ${f} phải là mảng.`);
        if (arr.length !== cl.tags.length) {
          throw new Error(`Giáo án ${item.cluster}: ${f} có ${arr.length} mô tả nhưng cụm khai ${cl.tags.length} nhãn errorTag.`);
        }
        for (const s of arr) {
          if (!String(s).trim()) throw new Error(`Giáo án ${item.cluster}: một mục trong override ${f} rỗng.`);
          if (String(s).includes(';')) throw new Error(`Giáo án ${item.cluster}: mục "${s}" của ${f} chứa dấu chấm phẩy, trùng ký tự phân cách danh sách lỗi.`);
        }
        continue;
      }
      const v = String(ovHop[f]).trim();
      if (!v) throw new Error(`Giáo án ${item.cluster}: trường override ${f} rỗng.`);
      // Bảy trường lời in kèm dấu chấm nối sẵn trong khuôn; ba trường viết tay thì nằm trong ngoặc kép.
      if (OVERRIDE_FIELDS.includes(f) && /[.;,]$/.test(v)) {
        throw new Error(`Giáo án ${item.cluster}: override ${f} thừa dấu câu ở cuối ("${v.slice(-12)}") — khuôn in sẽ nối thêm dấu chấm, thành hai dấu.`);
      }
    }
    out.push({
      id: `GA${item.lop}-${String(seq[item.lop]).padStart(2, '0')}`,
      slug: item.cluster,
      lop: item.lop,
      cluster: item.cluster,
      // chỉ_co_giao_an: bài SGK chưa có game nào cùng cụm, nên giáo án không có phần "game để luyện
      // sau tiết" và validator không đòi cặp này phải xuất hiện trong catalog.
      chi_co_giao_an: item.games.length === 0,
      ten: ovHop.ten || extra.ten,
      khoi_dong: ovHop.khoi_dong || extra.khoi_dong,
      chot: ovHop.chot || extra.chot,
      muc_tieu: ovHop.muc_tieu || cl.noi_dung.charAt(0).toUpperCase() + cl.noi_dung.slice(1),
      giai_thich: ovHop.giai_thich || cl.giai_thich,
      loi: cl.tags,
      loi_viet: ovHop.loi_viet || null,
      vat: ovHop.vat || p.vat,
      don_vi: ovHop.don_vi || p.don_vi,
      ngon_tay: ovHop.ngon_tay || p.ngon_tay,
      so_do: ovHop.so_do || p.so_do,
      doc: ovHop.doc || p.doc,
      luyen_tap: ex,
      games: item.games,
    });
  }
  return out;
}
