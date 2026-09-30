// Vật thật vẽ phấn cho từng cụm kiến thức Toán: biến mỗi con số trong đề thành một đồ vật đếm được
// và điều khiển được bằng ngón tay. Mỗi cụm có đúng 5 trường, validate.mjs chặn nếu thiếu trường nào:
//   vat        — vật thật vẽ bằng phấn trên bảng (danh từ cụ thể, không phải hình minh hoạ trừu tượng)
//   don_vi     — một đơn vị đếm được của vật đó (để học sinh đếm từng cái thay vì nhìn con số)
//   ngon_tay   — động tác ngón tay điều khiển vật đó, kèm con số kiểm được
//   so_do      — chặng REPRESENTATIONAL của khung Concrete-Representational-Abstract: biểu diễn bán
//                cụ thể mà học sinh phải TỰ TAY dựng sau khi thao tác với vật và trước khi viết phép
//                tính (sơ đồ đoạn thẳng, băng giấy, tia số, lưới ô vuông, bảng kẻ hàng cột)
//   doc        — cách đọc đáp án RA TỪ VẬT ĐÓ rồi mới viết phép tính bằng phấn
//
// Trường `so_do` được thêm ở vòng 2026-09-30: bốn trường cũ cho đủ chặng Concrete (vat, don_vi,
// ngon_tay) và chặng Abstract (doc) nhưng bỏ trống chặng giữa. Nhảy thẳng từ vật thật sang thuật
// toán là lỗi kinh điển mà khung CRA chỉ ra, và cũng là lý do học sinh làm được bài trên vật mà
// không tự làm được bài trên giấy.
//
// Lý do tồn tại: khảo sát 2026-09-30 trên 55 prompt Toán cho thấy 0/55 prompt có bảng phấn,
// 0/55 có vật thật đếm được, 0/55 có minh hoạ bài toán đố, và chỉ 1/55 nhắc tới pizza cho phân số.
// Đề bài hiện nay là CHỮ, lời giải hiện nay là CHỮ — học sinh lớp 4-5 làm đúng bằng cách nhớ mẫu
// chứ không bằng cách nhìn thấy số lượng. Module này buộc mọi con số phải có một vật tương ứng.
//
// Chỉ dùng cho môn Toán. Tiếng Anh có học liệu là từ và câu, không phải số lượng.

export const PROPS = {
  'hang-so': {
    vat: 'bảng lớp số 7 cột kẻ bằng phấn, từ cột đơn vị tới cột triệu, dưới mỗi cột là một khay que tính',
    don_vi: 'một que tính vẽ phấn; 10 que buộc lại thành một bó chục, 10 bó thành một bó trăm',
    ngon_tay: 'chấm đầu ngón trỏ vào một chữ số để cột đó phóng to 1.6 lần và que tính của cột đó hiện ra đủ số lượng',
    doc: 'đếm số bó và số que lẻ trong cột được hỏi rồi viết giá trị của chữ số đó bằng phấn ngay dưới cột',
    so_do: 'sơ đồ bó-que kẻ phấn: mỗi hàng một cột, trong cột vẽ đúng số bó trăm, bó chục và que lẻ rồi mới viết chữ số của hàng đó vào ô dưới cùng',
  },
  'so-sanh-sap-xep': {
    vat: 'hai khay que tính đặt cạnh nhau trên bảng và một dãy 4 ô phấn trống chờ xếp thẻ số',
    don_vi: 'một que tính; que đã buộc sẵn thành bó chục và bó trăm để nhìn là thấy số nào lớn hơn',
    ngon_tay: 'nắm kéo từng thẻ số từ khay thả vào một ô trống; thả sai ô thì thẻ nảy lại khay chứ không bị trừ tim',
    doc: 'so bó trăm trước rồi tới bó chục rồi que lẻ, viết dấu > < = bằng phấn vào giữa hai khay',
    so_do: 'hai băng chấm tròn đặt thẳng hàng theo cột đơn vị để băng dài hơn là số lớn hơn, kèm một tia số nằm ngang cho học sinh thả hai số lên đúng vị trí',
  },
  'lam-tron': {
    vat: 'tia số kẻ phấn nằm ngang với hai mốc tròn liền kề và một lá cờ nhỏ cầm được',
    don_vi: 'một vạch chia trên tia số, mỗi vạch đúng một đơn vị của hàng đang xét',
    ngon_tay: 'nắm kéo lá cờ dọc tia số; cờ tự hút vào vạch gần nhất khi thả cách vạch không quá 8% chiều dài tia',
    doc: 'cờ ngã về mốc nào thì số làm tròn là mốc đó; cờ dừng đúng giữa thì viết thêm dòng phấn "bằng nhau thì làm tròn lên"',
    so_do: 'tia số kẻ phấn có hai mốc tròn liền kề, một cung mũi tên từ số đang xét ngã về mốc gần hơn, và bảng hai cột "gần mốc nào / làm tròn thành" điền bằng phấn',
  },
  'chan-le': {
    vat: 'khóm chấm tròn vẽ phấn xếp thành hàng, cạnh đó là một ô trống để viết kết luận',
    don_vi: 'một chấm tròn; hai chấm ghép lại thành một cặp có nét phấn nối',
    ngon_tay: 'quẹt một đường ngang qua hàng chấm để tách từng cặp ra; chấm còn lại một mình thì nhấp nháy viền 2 lần',
    doc: 'còn chấm lẻ thì viết chữ LẼ, ghép hết cặp thì viết chữ CHẴN, kèm chữ số tận cùng được khoanh tròn',
    so_do: 'các chấm tròn xếp thành từng cặp có nét phấn nối, cặp đủ thì gạch một vạch đếm, chấm lẻ đứng riêng trong một ô vuông nét đứt',
  },
  'khoi-luong': {
    vat: 'cân hai đĩa vẽ phấn giữa bảng và khay quả cân ghi sẵn 1 g, 1 kg, 1 tạ, 1 tấn',
    don_vi: 'một quả cân; khối lượng của quả ghi bằng phấn ngay trên mặt quả',
    ngon_tay: 'nắm kéo quả cân từ khay thả lên một trong hai đĩa; đĩa nặng hơn hạ xuống 12 độ và kim nghiêng theo',
    doc: 'cộng số ghi trên các quả cân của từng đĩa rồi viết phép đổi đơn vị thành một dòng phấn dưới cân',
    so_do: 'một chuỗi mũi tên nhân và chia 10 nối các ô đơn vị tấn - tạ - kg - g, mỗi ô ghi bội số của ô bên cạnh, dưới cân là bảng đổi hai cột',
  },
  'dien-tich-don-vi': {
    vat: 'hình chữ nhật kẻ phấn trên bảng, phủ lưới ô vuông 1 cm² và một khay màu tô',
    don_vi: 'một ô vuông 1 cm²',
    ngon_tay: 'quẹt ngang một hàng để tô trọn hàng đó; mỗi hàng tô xong tự ghi thêm một mốc đếm 10, 20, 30',
    doc: 'đếm số hàng nhân số ô mỗi hàng, viết phép tính dài × rộng kèm đơn vị cm² ngay dưới hình',
    so_do: 'một hình chữ nhật trống chỉ ghi hai cạnh rồi tô lưới ô vuông bên trong, tách ra thành sơ đồ "số hàng × số ô mỗi hàng" đặt ngay dưới hình',
  },
  'thoi-gian': {
    vat: 'đồng hồ mặt phấn có kim ngắn kim dài, cạnh đó là dải 60 ô vuông nhỏ',
    don_vi: 'một phút bằng một ô vuông nhỏ trên dải 60 ô',
    ngon_tay: 'nắm kéo đầu kim phút quay thuận chiều; kim giờ tự nhích theo đúng tỉ lệ một phần mười hai vòng',
    doc: 'đếm số ô đã đi qua trên dải 60 ô rồi viết dòng phấn "kim ngắn chỉ giờ, kim dài chỉ phút"',
    so_do: 'dải 60 ô vuông được uốn thành vòng tròn đồng tâm với mặt đồng hồ, kèm mũi tên nối đầu kim phút với đúng ô thứ mấy trên dải',
  },
  'goc': {
    vat: 'thước nửa tròn vẽ phấn đặt lên một góc có đỉnh đánh chấm đậm và quạt góc tô được',
    don_vi: 'một độ; thước có vạch mỗi 10 độ đánh số và vạch nhỏ mỗi 1 độ',
    ngon_tay: 'nắm kéo tâm thước khớp vào đỉnh góc rồi quẹt để quay cạnh thứ hai; quạt góc tô đậm dần theo độ mở',
    doc: 'đọc số độ ở vạch có cạnh thứ hai đi qua rồi viết kèm tên loại góc nhọn, vuông, tù hay bẹt',
    so_do: 'quạt góc được tách thành các vạch 10 độ đếm được, kèm bảng ba cột "số đo / loại góc / so với góc vuông" điền bằng phấn',
  },
  'vuong-goc-song-song': {
    vat: 'hai đường thẳng vẽ phấn kéo dài được và một ê-ke phấn cầm rời',
    don_vi: 'một đoạn kéo dài thêm, mỗi lần kéo đúng 15% chiều dài đường hiện có',
    ngon_tay: 'nắm kéo đầu mút đường ra xa để kéo dài; đặt ê-ke vào giao điểm bằng một lần chấm ngón tay',
    doc: 'kéo dài hết bảng mà không gặp nhau thì viết SONG SONG; gặp nhau và ê-ke khít góc thì viết VUÔNG GÓC kèm ký hiệu góc vuông',
    so_do: 'hai đường thẳng kéo dài thành sơ đồ tia cắt nhau, ô vuông góc được đánh dấu tại giao điểm và một cặp mũi tên cùng chiều cho hai đường song song',
  },
  'cong-tru': {
    vat: 'phép tính đặt dọc kẻ phấn thẳng cột, kèm khay bó trăm, bó chục và que lẻ bên phải bảng',
    don_vi: 'một que tính ở hàng đơn vị, một bó chục, một bó trăm',
    ngon_tay: 'chấm vào một cột để cột đó sáng lên rồi nắm kéo một bó sang cột bên trái khi cần mượn; bó mượn tự tách thành 10 que lẻ',
    doc: 'viết kết quả từng cột từ phải sang trái; cột vừa nhớ hoặc vừa mượn được khoanh tròn bằng phấn màu',
    so_do: 'sơ đồ bó-que đặt cạnh phép tính dọc, mỗi lần mượn hoặc nhớ là một mũi tên nối từ cột này sang cột kia và ghi số đã mượn ngay trên mũi tên',
  },
  'nhan': {
    vat: 'các hàng chấm tròn vẽ phấn xếp thẳng hàng, mỗi hàng là một lần cộng thêm thừa số thứ nhất',
    don_vi: 'một chấm tròn; một hàng chấm bằng đúng một lần nhân',
    ngon_tay: 'quẹt một đường dọc để hiện thêm một hàng chấm; quẹt đủ số hàng bằng thừa số thứ hai thì bảng tự khoá',
    doc: 'đếm số hàng nhân số chấm mỗi hàng, viết tổng các hàng trước rồi mới rút thành phép nhân',
    so_do: 'mảng chấm hình chữ nhật có khung nét đứt bao quanh, tách thành các hàng bằng nhau và ghi tổng các hàng phía dưới TRƯỚC khi rút thành phép nhân',
  },
  'chia': {
    vat: 'băng chuyền phấn nằm ngang chở đồ vật và dãy khay nhóm bằng nhau vẽ bên dưới',
    don_vi: 'một đồ vật trên băng chuyền; một khay là một nhóm',
    ngon_tay: 'nắm kéo từng vật từ băng chuyền bỏ vào khay, chia lần lượt mỗi khay một vật cho tới khi băng chuyền hết',
    doc: 'đếm số khay chia đều làm thương; số vật không đủ chia còn nằm lại trên băng chuyền làm số dư',
    so_do: 'sơ đồ nhóm: các vòng tròn bằng nhau đại diện cho khay, mũi tên chia lần lượt mỗi vòng một vật, phần không đủ chia nằm ngoài vòng trong một ô nét đứt',
  },
  'tat-ca': {
    vat: 'cân hai đĩa lớn vẽ phấn, mỗi đĩa chở một vế của biểu thức, kèm khay khối giá trị',
    don_vi: 'một khối giá trị ghi số; mỗi vế của biểu thức đổi ra được một số khối',
    ngon_tay: 'nắm kéo khối số từ khay lên đĩa; đĩa nặng hơn hạ xuống và kim lệch khỏi vạch giữa',
    doc: 'cân thăng bằng thì viết dấu = ở giữa hai vế; chưa cân bằng thì gạch chân vế cần sửa bằng phấn màu',
    so_do: 'cân hai đĩa được vẽ lại thành sơ đồ hai vế, mỗi vế là một thanh khối giá trị xếp chồng, mũi tên "bớt cả hai bên" nối hai thanh khi cần rút gọn',
  },
  'bai-toan-nhieu-buoc': {
    vat: 'sơ đồ đoạn thẳng kẻ phấn chia phần và một bản đồ bước dọc mép phải bảng',
    don_vi: 'một phần bằng nhau trên đoạn thẳng; một thẻ bước trên bản đồ',
    ngon_tay: 'quẹt dọc đoạn thẳng để chia thêm phần bằng nhau; chấm vào thẻ bước để đánh dấu bước đang làm',
    doc: 'mỗi bước viết một dòng phấn có phép tính và đơn vị; đáp số ở bước cuối được khoanh tròn',
    so_do: 'sơ đồ đoạn thẳng chia phần bằng nhau, mỗi phần ghi nhãn một dữ kiện đã cho, ẩn số là một phần nét đứt có dấu "?" và bản đồ bước dọc mép phải bảng',
  },
  'bang-so-lieu': {
    vat: 'bảng số liệu kẻ phấn có tên hàng tên cột, mỗi ô chứa một chồng que tính',
    don_vi: 'một que trong ô; giá trị của ô bằng đúng số que đếm được',
    ngon_tay: 'chấm vào một ô để ô đó phóng to 1.5 lần và chồng que của nó tách ra cho đếm từng que',
    doc: 'đọc giá trị ô được hỏi rồi viết lại kèm cả tên hàng và tên cột để không nhầm sang cột bên cạnh',
    so_do: 'bảng kẻ phấn có tiêu đề hàng và tiêu đề cột tô nền khác nhau, ô đang hỏi được đóng khung và có hai đường phấn dóng ra đúng tên hàng và tên cột',
  },
  'bieu-do-cot': {
    vat: 'biểu đồ cột kẻ phấn có trục số chia vạch và các thân cột rỗng chờ đổ đầy',
    don_vi: 'một ô vuông đơn vị trong thân cột',
    ngon_tay: 'nắm kéo ô vuông từ khay thả vào cột; cột đầy dần từ dưới lên và tự hiện số ở đỉnh',
    doc: 'kẻ một đường phấn ngang từ đỉnh cột sang trục số để đọc giá trị, cấm ước lượng bằng mắt',
    so_do: 'trục số nằm ngang và trục giá trị thẳng đứng vẽ riêng trước, mỗi cột là một thanh chia ô đơn vị, kèm đường dóng ngang từ đỉnh cột sang trục giá trị',
  },
  'bieu-do-tranh': {
    vat: 'biểu đồ tranh vẽ phấn và một khung chú giải ghi "1 hình = n đơn vị" phóng to được',
    don_vi: 'một hình vẽ trong biểu đồ; nửa hình bằng nửa giá trị',
    ngon_tay: 'chấm vào từng hình để hình đó nhảy lên một nhịp và bộ đếm tăng đúng n đơn vị',
    doc: 'mở to khung chú giải trước rồi mới đếm; viết phép nhân số hình với n kèm đơn vị',
    so_do: 'khung chú giải "1 hình = n đơn vị" phóng to thành một ô riêng, dưới mỗi hình vẽ là một phép cộng lặp n + n + n trước khi rút thành phép nhân',
  },
  'xac-suat': {
    vat: 'hộp kín vẽ phấn chứa các quả bóng khác hình dạng và một đồng xu hai mặt nằm cạnh',
    don_vi: 'một quả bóng trong hộp; một mặt của đồng xu',
    ngon_tay: 'quẹt một đường để lắc hộp cho bóng tự trộn lại; chấm vào từng bóng thuận lợi để đếm',
    doc: 'viết tỉ số số bóng thuận lợi trên tổng số bóng rồi mới chọn Chắc chắn, Có thể hay Không thể',
    so_do: 'lưới ô vuông hoặc sơ đồ cây liệt kê mọi kết quả có thể, các kết quả thuận lợi được tô và ghi tỉ số số ô tô trên tổng số ô ngay dưới lưới',
  },
  'phan-so-dau': {
    vat: 'cái pizza tròn và băng giấy chữ nhật, cả hai vẽ bằng phấn và cắt được',
    don_vi: 'một miếng pizza hoặc một khúc băng giấy; các phần phải bằng nhau tuyệt đối',
    ngon_tay: 'giơ số ngón tay bằng số phần muốn chia rồi quẹt một đường qua tâm; quẹt thêm một đường là chia đôi số phần đang có',
    doc: 'chấm vào từng phần để tô; bộ đếm "đã tô k trên N phần" hiện dưới hình rồi mới viết phân số k/N bằng phấn',
    so_do: 'ba mô hình đặt cạnh nhau cho cùng một phân số: hình tròn tô phần, băng giấy chia khúc và tia số có vạch tại đúng vị trí k/N, nối với nhau bằng ba mũi tên đồng mức',
  },
  'phan-so-bang-nhau': {
    vat: 'hai thanh phân số cùng chiều dài đặt song song trên bảng',
    don_vi: 'một phần bằng nhau trên thanh; hai thanh luôn bằng nhau về chiều dài',
    ngon_tay: 'quẹt dọc một thanh để chia nhỏ thêm hoặc gộp phần lại; tỉ lệ phần đã tô không đổi theo',
    doc: 'hai phần tô trùng khít chiều dài thì viết hai phân số bằng nhau, rồi gạch bớt thừa số chung để rút gọn',
    so_do: 'hai băng giấy cùng chiều dài đặt song song, phần tô của hai băng được dóng thẳng đứng bằng nét đứt để thấy trùng khít, hai phân số viết dưới mỗi băng',
  },
  'quy-dong-mau': {
    vat: 'hai thanh phân số khác số phần và một mũi tên phấn nối hai thanh với nhau',
    don_vi: 'một phần bằng nhau; mẫu số chung là số phần của thanh sau khi chia nhỏ',
    ngon_tay: 'quẹt dọc một thanh để chia nhỏ thành số phần gấp lên; tử và mẫu cùng nhân nên độ dài phần tô giữ nguyên',
    doc: 'viết phép nhân cả tử và mẫu cho từng phân số rồi so sánh số phần đã tô trên cùng một mẫu số',
    so_do: 'hai băng giấy được chia lại trên một trục chung, mỗi lần chia nhỏ ghi một phép nhân cả tử và mẫu, mẫu số chung là tổng số vạch của trục',
  },
  'cong-tru-phan-so': {
    vat: 'các thanh phân số cùng mẫu trượt được trên một trục phấn nằm ngang',
    don_vi: 'một phần bằng nhau của cùng một mẫu số',
    ngon_tay: 'nắm kéo thanh thứ hai nối tiếp thanh thứ nhất để cộng, hoặc kéo lùi chồng lên để trừ',
    doc: 'đếm tổng số phần đã tô làm tử số và giữ nguyên mẫu số; vượt một thanh đầy thì viết thành hỗn số có phần nguyên',
    so_do: 'trục phân số nằm ngang, mỗi thanh là một đoạn trượt được trên trục: cộng là nối tiếp hai đoạn, trừ là chồng ngược lại, kết quả đọc ngay trên trục',
  },
  'phan-so-cua-mot-so': {
    vat: 'hòm kho báu vẽ phấn chứa đúng N đồng vàng và các khay chia nhóm',
    don_vi: 'một đồng vàng; N đồng chia được thành các nhóm bằng nhau',
    ngon_tay: 'quẹt để chia hòm thành đúng số nhóm bằng mẫu số, rồi nắm kéo số đồng của phần được lấy ra ngoài hòm',
    doc: 'viết phép chia N cho mẫu số để ra giá trị một phần, nhân với tử số rồi đếm lại số đồng đã kéo ra',
    so_do: 'N đồng vàng chia thành đúng mẫu số nhóm bằng nhau, một nhóm được đóng khung làm "giá trị một phần" rồi nhân lên số nhóm cần lấy',
  },
  'ti-so-tong-hieu': {
    vat: 'hai đoạn thẳng phấn đặt song song, chia phần theo tỉ số, kèm nhãn tổng và nhãn hiệu rời',
    don_vi: 'một phần bằng nhau; tổng số phần của hai đoạn bằng tổng hai số phần của tỉ số',
    ngon_tay: 'quẹt dọc mỗi đoạn để chia phần; nắm kéo nhãn tổng hoặc hiệu đặt vào đúng đầu đoạn thẳng',
    doc: 'viết giá trị một phần bằng tổng chia cho tổng số phần, nhân ra từng số và ghi đáp số kèm đơn vị',
    so_do: 'hai đoạn thẳng chia phần theo tỉ số đặt song song, nhãn tổng hoặc hiệu được dóng sang đúng tổng số phần, một phần được đóng khung và ghi giá trị',
  },
  'ti-le-ban-do': {
    vat: 'bản đồ kẻ phấn có thước tỉ lệ nằm góc bảng và một đoạn dây đo hai đầu cầm được',
    don_vi: 'một xăng-ti-mét đo trên bản đồ, ứng với số mét thật ghi ở thước tỉ lệ',
    ngon_tay: 'nắm kéo hai đầu dây đo đặt lên quãng đường trên bản đồ rồi dời nguyên dây sang thước tỉ lệ',
    doc: 'đọc số xăng-ti-mét trên thước rồi viết phép nhân với số mét thật của mỗi xăng-ti-mét',
    so_do: 'hai đoạn thẳng song song, một đoạn là số xăng-ti-mét trên bản đồ và đoạn kia là số mét thật, nối bằng một mũi tên nhân với hệ số tỉ lệ',
  },
  'hinh-binh-hanh': {
    vat: 'hình bình hành vẽ phấn có đường cao nét đứt và một mũi tên cắt cầm rời',
    don_vi: 'một ô vuông 1 cm² của lưới phủ bên trong hình',
    ngon_tay: 'quẹt một đường dọc theo đường cao để cắt rời mảnh tam giác rồi nắm kéo mảnh đó sang phía bên kia',
    doc: 'ghép lại thành hình chữ nhật để thấy chiều dài bằng đáy và chiều rộng bằng đường cao, rồi viết công thức đáy × chiều cao',
    so_do: 'hình bình hành cắt và ghép lại thành hình chữ nhật trên lưới ô vuông, cạnh đáy và đường cao ghi nhãn rồi nối bằng mũi tên sang hai cạnh tương ứng của hình chữ nhật mới',
  },
  'hinh-thoi': {
    vat: 'hình thoi vẽ phấn có hai đường chéo nét đứt, tách được thành bốn tam giác',
    don_vi: 'một tam giác bằng một phần tư hình thoi',
    ngon_tay: 'chấm vào hai đường chéo để tô đậm rồi nắm kéo từng tam giác xếp lại thành một hình chữ nhật',
    doc: 'hình chữ nhật ghép được có chiều dài bằng một đường chéo và chiều rộng bằng nửa đường chéo kia, viết tích hai đường chéo chia 2',
    so_do: 'bốn tam giác của hình thoi xếp lại thành một hình chữ nhật trên lưới ô vuông, hai đường chéo ghi nhãn rồi dóng sang chiều dài và chiều rộng của hình chữ nhật mới',
  },
  // Hình tròn chưa có game nào dùng; khối props này chỉ giáo án giảng bài cần (CHU_DE_CHI_CO_GIAO_AN).
  'hinh-tron': {
    vat: 'hình tròn vẽ phấn có tâm, một bán kính nét đứt và một điểm sơn trên vành; lăn được một vòng trên thước dây, cắt được thành tám quạt bằng nhau',
    don_vi: 'một quạt bằng một phần tám hình tròn',
    ngon_tay: 'chấm vào điểm sơn trên vành rồi quay quanh tâm cho vòng tròn lăn dọc thước dây; giữ hai đầu bán kính kéo dãn để thấy đường kính dài gấp đôi; kéo tám quạt xếp xen kẽ thành hình gần chữ nhật',
    doc: 'một vòng lăn đọc được độ dài trên thước dây: chu vi bằng đường kính nhân 3.14; hình ghép gần chữ nhật có cạnh dài bằng nửa chu vi và cạnh ngắn bằng bán kính, nên diện tích bằng bán kính nhân bán kính nhân 3.14',
    so_do: 'tám quạt của hình tròn xếp xen kẽ thành một hình gần chữ nhật trên lưới ô vuông, ghi nhãn "nửa chu vi" cho cạnh dài và "bán kính" cho cạnh ngắn rồi dóng hai nhãn sang hai cạnh của hình chữ nhật',
  },
  'on-tap-toan-4': {
    vat: 'bốn trạm vật thật đặt ở bốn góc bảng, mỗi trạm một mạch kiến thức lớp 4',
    don_vi: 'một vật thật của trạm đang mở: que tính, ô vuông, thanh phân số hoặc dụng cụ đo',
    ngon_tay: 'chấm vào một trạm để trạm đó phóng to ra giữa bảng; quẹt ngang để đổi trạm',
    doc: 'mỗi cửa ải viết một dòng phấn nhắc lại kiến thức của trạm vừa dùng trước khi ghi đáp số',
    so_do: 'một bản đồ bốn nhánh kẻ phấn, mỗi nhánh một mạch kiến thức lớp 4, trên nhánh ghi công thức và một ví dụ nhỏ; nhánh đang ôn được tô đậm',
  },
  'boss-cong-thu': {
    vat: 'ba vòng tròn đồng tâm vẽ phấn, mỗi vòng là một giai đoạn của trận boss',
    don_vi: 'một vật thật thuộc cụm kiến thức bị hỏi ở giai đoạn đó',
    ngon_tay: 'phá xong một giai đoạn thì quẹt một đường để giẻ lau xoá vòng đó và vòng kế tiếp sáng lên',
    doc: 'sau mỗi giai đoạn hiện một thẻ gợi ý bằng phấn; viết lại đúng công thức vừa dùng rồi mới đánh tiếp',
    so_do: 'ba vòng tròn đồng tâm vẽ lại thành bảng ba cột "giai đoạn / công thức cần dùng / lỗi hay mắc", mỗi cột điền bằng phấn trước khi vào giai đoạn đó',
  },
  'thap-phan-khai-niem': {
    vat: 'hình vuông đơn vị phủ lưới 100 ô vẽ phấn và một vạch trượt dọc mép phải hình',
    don_vi: 'một ô vuông nhỏ bằng một phần trăm; một hàng 10 ô bằng một phần mười',
    ngon_tay: 'nắm kéo vạch trượt để tô dần số ô; mỗi lần vượt 10 ô thì hàng đó tự gộp thành một vạch đậm',
    doc: 'đếm số hàng làm phần mười và số ô lẻ làm phần trăm rồi viết số thập phân kèm tên hàng',
    so_do: 'lưới 100 ô tách thành ba cột ghi phần mười, phần trăm và số thập phân tương ứng, kèm một tia số từ 0 đến 1 chia 10 phần rồi chia 100 phần',
  },
  'chuyen-dong-f-d-p': {
    vat: 'ba thanh băng dài bằng nhau đặt song song, ghi phân số, số thập phân và phần trăm',
    don_vi: 'một phần bằng nhau trên thanh; ba thanh luôn cùng chiều dài',
    ngon_tay: 'quẹt dọc một thanh để chia thành 10 hoặc 100 phần; phần tô màu giữ nguyên tỉ lệ',
    doc: 'ba phần tô dài bằng nhau thì nắm kéo ba thẻ gộp thành một bộ và viết dấu = nối cả ba dạng',
    so_do: 'ba băng cùng chiều dài dóng thẳng đứng bằng nét đứt và nối vào một trục duy nhất chia 10 rồi chia 100, dưới mỗi băng ghi dạng phân số, thập phân và phần trăm của cùng một phần tô',
  },
  'phan-tram': {
    vat: 'lưới 100 ô vẽ phấn và một bảng giá có thanh trượt giảm giá cầm được',
    don_vi: 'một ô vuông bằng một phần trăm',
    ngon_tay: 'nắm kéo thanh trượt phần trăm; lưới tự tô đúng số ô và bảng giá tự tính lại số tiền',
    doc: 'đếm số ô đã tô để đọc tỉ lệ, viết phép nhân số tiền với tỉ lệ rồi trừ ra số tiền phải trả',
    so_do: 'lưới 100 ô vẽ lại thành sơ đồ ba thanh trên cùng một trục: thanh giá ban đầu, thanh phần giảm và thanh số tiền phải trả',
  },
  'the-tich': {
    vat: 'hình hộp chữ nhật trong suốt vẽ phấn và khay khối lập phương 1 cm³ xếp được',
    don_vi: 'một khối lập phương cạnh 1 cm',
    ngon_tay: 'nắm kéo khối từ khay xếp kín một lớp đáy, rồi quẹt một đường để nhân lớp đó lên một tầng',
    doc: 'đếm số khối một lớp nhân với số lớp rồi viết phép tính kèm đơn vị cm³',
    so_do: 'ba hình vẽ cạnh nhau: một lớp đáy phủ kín khối, một tầng được nhân lên và hình hộp hoàn chỉnh ghi ba cạnh, kèm bảng ba cột "dài / rộng / cao"',
  },
  'ti-so-dau-bep': {
    vat: 'cái nồi vẽ phấn giữa bảng và các bát nguyên liệu xếp quanh nồi',
    don_vi: 'một bát nguyên liệu; một khẩu phần ăn',
    ngon_tay: 'quẹt để tăng hoặc giảm số khẩu phần; mọi bát nguyên liệu tự nhân lên cùng một hệ số',
    doc: 'viết tỉ số giữa hai nguyên liệu rồi nhân cả hai vế với số khẩu phần mới',
    so_do: 'bảng kẻ phấn có một cột cho mỗi nguyên liệu và một hàng cho mỗi số khẩu phần, hệ số nhân ghi ở ô góc và mọi ô trong cùng một hàng đều nhân hệ số đó',
  },
  'chuyen-dong-de': {
    vat: 'con đường kẻ phấn nằm ngang với hai xe ở hai đầu và một vạch gặp nhau kéo được',
    don_vi: 'một quãng đường mà một xe đi được trong một đơn vị thời gian, ghi ngay trên thân xe',
    ngon_tay: 'nắm kéo từng xe dọc con đường; mỗi lần kéo xe tiến thêm đúng số kilômét ghi trên thân xe',
    doc: 'viết quãng đường mỗi xe đi rồi cộng lại so với chiều dài con đường; thời gian gặp nhau bằng quãng đường chia cho tổng vận tốc',
    so_do: 'con đường vẽ lại thành sơ đồ đoạn thẳng có hai mũi tên ngược chiều, tổng vận tốc ghi ở giữa và quãng đường chia thành các phần bằng nhau ứng với mỗi đơn vị thời gian',
  },
  'hinh-hoc-on-tap': {
    vat: 'bốn hình vẽ phấn (chữ nhật, vuông, tròn, hộp) mỗi hình kèm một thẻ công thức đang úp',
    don_vi: 'một cạnh của hình hoặc một ô vuông đơn vị phủ trong hình',
    ngon_tay: 'chấm vào hình để lật thẻ công thức của đúng hình đó; nắm kéo thẻ sai trở lại tư thế úp',
    doc: 'đo cạnh bằng vạch phấn rồi thế số vào công thức vừa lật, viết kết quả kèm đơn vị',
    so_do: 'bảng bốn cột kẻ phấn "hình / công thức / số đo cần có / đơn vị kết quả", mỗi hàng được đo bằng vạch phấn trước khi thế số vào công thức',
  },
  'thap-phan-can-bang': {
    vat: 'bảng đặt tính kẻ phấn có cột dấu phẩy tô đậm và các thẻ chữ số chờ xếp',
    don_vi: 'một chữ số ở một hàng; cột dấu phẩy là mốc cố định không xê dịch',
    ngon_tay: 'nắm kéo từng thẻ chữ số thả vào đúng hàng; thẻ lệch cột dấu phẩy thì nảy ra ngoài',
    doc: 'so từng hàng từ trái sang phải kể từ dấu phẩy, viết dấu > < = rồi xếp lại thứ tự theo yêu cầu',
    so_do: 'bảng đặt tính kẻ lại thành lưới hàng và cột có cột dấu phẩy tô đậm, mỗi chữ số nằm đúng một ô và các ô cùng hàng được nối bằng nét đứt ngang',
  },
  'on-tap-toan-5': {
    vat: 'ba khay chiến lược đặt mép bảng: rút về đơn vị, tỉ số, sơ đồ đoạn thẳng',
    don_vi: 'một vật thật của chiến lược vừa chọn: que tính, đoạn thẳng chia phần hoặc lưới 100 ô',
    ngon_tay: 'nắm kéo một thẻ chiến lược thả lên đầu bài giải để chốt cách làm trước khi bắt đầu tính',
    doc: 'viết lời giải theo đúng chiến lược đã chọn, mỗi bước một dòng phấn có đơn vị',
    so_do: 'sơ đồ chiến lược ba nhánh kẻ phấn (rút về đơn vị, tỉ số, sơ đồ đoạn thẳng), nhánh được chọn tô đậm và mọi bước của bài giải phải nằm dọc theo nhánh đó',
  },
};

export const PROP_KEYS = Object.keys(PROPS);

// Ném lỗi ngay khi một cụm Toán chưa có vật thật — thiếu là prompt lại quay về mô tả bằng chữ.
export function prop(clusterKey) {
  const p = PROPS[clusterKey];
  if (!p) throw new Error('Cụm kiến thức chưa có vật thật vẽ phấn: ' + clusterKey);
  for (const f of PROP_FIELDS) if (!p[f] || !String(p[f]).trim()) throw new Error(`Vật thật của ${clusterKey} thiếu trường ${f}.`);
  return p;
}

export const PROP_FIELDS = ['vat', 'don_vi', 'ngon_tay', 'so_do', 'doc'];
