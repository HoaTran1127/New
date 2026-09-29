// SINH TỰ ĐỘNG từ catalogs/GAME_CATALOG.csv + tools/data — KHÔNG sửa tay file này.
// Chạy: node tools/build.mjs
window.MITI_CATALOG = {
 "generatedBy": "tools/build-dashboard.mjs",
 "games": [
  {
   "id": "L4-01",
   "name": "Đường Đua Hàng Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Số tự nhiên đến 100000 và 1000000; giá trị theo hàng; viết dưới dạng tổng các hàng; số có chữ số 0 ở hàng trung gian",
   "mission": "Chỉ ngón tay chọn làn chứa số đúng theo yêu cầu về hàng và giá trị.",
   "cluster": "hang-so",
   "topic": "số tự nhiên đến 100000 và 1000000; giá trị theo hàng; viết dưới dạng tổng các hàng; số có chữ số 0 ở hàng trung gian",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-01-number-dash.md"
  },
  {
   "id": "L4-02",
   "name": "Núi Hàng Triệu",
   "grade": "4",
   "subject": "Toán",
   "objective": "So sánh hai số nhiều chữ số; sắp xếp 4 số theo thứ tự từ bé đến lớn và ngược lại; số lớn nhất có n chữ số",
   "mission": "Vuốt để đổi thứ tự các toa xe sao cho dãy số tăng dần hoặc giảm dần.",
   "cluster": "so-sanh-sap-xep",
   "topic": "so sánh hai số nhiều chữ số; sắp xếp 4 số theo thứ tự từ bé đến lớn và ngược lại; số lớn nhất có n chữ số",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/01-toan4/L4-02-million-mountain.md"
  },
  {
   "id": "L4-03",
   "name": "Ném Vòng Làm Tròn",
   "grade": "4",
   "subject": "Toán",
   "objective": "Làm tròn đến hàng chục, trăm, nghìn, chục nghìn, trăm nghìn; ước lượng tổng hiệu bằng cách làm tròn trước",
   "mission": "Đấm vào thẻ số đã được làm tròn đúng hàng yêu cầu.",
   "cluster": "lam-tron",
   "topic": "làm tròn đến hàng chục, trăm, nghìn, chục nghìn, trăm nghìn; ước lượng tổng hiệu bằng cách làm tròn trước",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/01-toan4/L4-03-rounding-hoops.md"
  },
  {
   "id": "L4-04",
   "name": "Vũ Điệu Chẵn Lẻ",
   "grade": "4",
   "subject": "Toán",
   "objective": "Nhận biết số chẵn số lẻ qua chữ số tận cùng; dãy số chẵn liên tiếp; tổng hiệu tính chẵn lẻ",
   "mission": "Nghiêng người bước sang vùng chẵn hoặc vùng lẻ theo thẻ số hiện trên đầu.",
   "cluster": "chan-le",
   "topic": "nhận biết số chẵn số lẻ qua chữ số tận cùng; dãy số chẵn liên tiếp; tổng hiệu tính chẵn lẻ",
   "controls": [
    "STEP"
   ],
   "controlLabels": [
    "Nghiêng người / bước sang vùng (Body tilt)"
   ],
   "prompt": "prompts/01-toan4/L4-04-even-odd-dance.md"
  },
  {
   "id": "L4-05",
   "name": "Nhà Máy Khối Lượng",
   "grade": "4",
   "subject": "Toán",
   "objective": "Tấn, tạ, kg, g; đổi đơn vị; so sánh khối lượng; tính tổng khối lượng nhiều vật",
   "mission": "Nắm và kéo kiện hàng thả đúng toa ghi đơn vị tương ứng.",
   "cluster": "khoi-luong",
   "topic": "tấn, tạ, kg, g; đổi đơn vị; so sánh khối lượng; tính tổng khối lượng nhiều vật",
   "controls": [
    "GRAB"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)"
   ],
   "prompt": "prompts/01-toan4/L4-05-weight-factory.md"
  },
  {
   "id": "L4-06",
   "name": "Xưởng Diện Tích",
   "grade": "4",
   "subject": "Toán",
   "objective": "Cm², dm², m²; đếm ô vuông để tính diện tích; diện tích hình chữ nhật, vuông",
   "mission": "Khom hai tay để căng một hình chữ nhật có đúng số ô vuông yêu cầu.",
   "cluster": "dien-tich-don-vi",
   "topic": "cm², dm², m²; đếm ô vuông để tính diện tích; diện tích hình chữ nhật, vuông",
   "controls": [
    "TWO_HAND_STRETCH"
   ],
   "controlLabels": [
    "Khom hai tay (Two-hand stretch)"
   ],
   "prompt": "prompts/01-toan4/L4-06-area-builder.md"
  },
  {
   "id": "L4-07",
   "name": "Cỗ Máy Thời Gian",
   "grade": "4",
   "subject": "Toán",
   "objective": "Đọc giờ trên đồng hồ; phút và giây; thế kỉ; khoảng thời gian giữa hai mốc; đổi ngày giờ",
   "mission": "Vặn kim bằng hai tay rồi chỉ vào mốc thời gian đúng với đề bài.",
   "cluster": "thoi-gian",
   "topic": "đọc giờ trên đồng hồ; phút và giây; thế kỉ; khoảng thời gian giữa hai mốc; đổi ngày giờ",
   "controls": [
    "POINT",
    "TWO_HAND_STRETCH"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Khom hai tay (Two-hand stretch)"
   ],
   "prompt": "prompts/01-toan4/L4-07-time-machine.md"
  },
  {
   "id": "L4-08",
   "name": "Anh Hùng Góc",
   "grade": "4",
   "subject": "Toán",
   "objective": "Góc nhọn, vuông, tù, bẹt; đỉnh, cạnh; đo góc bằng thước nửa tròn; góc ở đỉnh chung",
   "mission": "Dùng hai cánh tay tạo thành hai cạnh góc có số đo đúng yêu cầu và giữ trong 2 giây.",
   "cluster": "goc",
   "topic": "góc nhọn, vuông, tù, bẹt; đỉnh, cạnh; đo góc bằng thước nửa tròn; góc ở đỉnh chung",
   "controls": [
    "ANGLE_POSE"
   ],
   "controlLabels": [
    "Tạo góc bằng cánh tay (Angle pose)"
   ],
   "prompt": "prompts/01-toan4/L4-08-angle-hero.md"
  },
  {
   "id": "L4-09",
   "name": "Kiến Trúc Sư Laser",
   "grade": "4",
   "subject": "Toán",
   "objective": "Hai đường thẳng vuông góc, song song; kẻ đường vuông góc; nhận diện trong thực tế",
   "mission": "Kéo giãn hai tay để chỉnh hai tia laser vuông góc hoặc song song theo nhiệm vụ.",
   "cluster": "vuong-goc-song-song",
   "topic": "hai đường thẳng vuông góc, song song; kẻ đường vuông góc; nhận diện trong thực tế",
   "controls": [
    "TWO_HAND_STRETCH"
   ],
   "controlLabels": [
    "Khom hai tay (Two-hand stretch)"
   ],
   "prompt": "prompts/01-toan4/L4-09-laser-architect.md"
  },
  {
   "id": "L4-10",
   "name": "Đấm Bốc Toán",
   "grade": "4",
   "subject": "Toán",
   "objective": "Cộng trừ số có đến 6 chữ số; thành phần và giá trị biểu thức; tính giá trị biểu thức có ngoặc",
   "mission": "Đấm trúng thẻ chứa kết quả đúng của biểu thức.",
   "cluster": "cong-tru",
   "topic": "cộng trừ số có đến 6 chữ số; thành phần và giá trị biểu thức; tính giá trị biểu thức có ngoặc",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/01-toan4/L4-10-math-boxing.md"
  },
  {
   "id": "L4-11",
   "name": "Tên Lửa Phép Nhân",
   "grade": "4",
   "subject": "Toán",
   "objective": "Bảng cửu chương 2–9; nhân số có 2–3 chữ số với số có 1 chữ số; nhân nhẩm với 11; nhân với 10 100 1000",
   "mission": "Đấm vào bảng phóng mang kết quả nhân đúng để đẩy tên lửa lên.",
   "cluster": "nhan",
   "topic": "bảng cửu chương 2–9; nhân số có 2–3 chữ số với số có 1 chữ số; nhân nhẩm với 11; nhân với 10 100 1000",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/01-toan4/L4-11-multiplication-rocket.md"
  },
  {
   "id": "L4-12",
   "name": "Băng Chuyền Phép Chia",
   "grade": "4",
   "subject": "Toán",
   "objective": "Chia số có 2–3 chữ số cho 1–2 chữ số; số chia hết cho 2 3 5 9; chia nhẩm; chia hết và còn dư",
   "mission": "Nắm và thả số vật vào đúng số nhóm, phần còn lại rơi vào hộp số dư.",
   "cluster": "chia",
   "topic": "chia số có 2–3 chữ số cho 1–2 chữ số; số chia hết cho 2 3 5 9; chia nhẩm; chia hết và còn dư",
   "controls": [
    "GRAB"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)"
   ],
   "prompt": "prompts/01-toan4/L4-12-division-conveyor.md"
  },
  {
   "id": "L4-13",
   "name": "Phòng Thí Nghiệm Cân Bằng",
   "grade": "4",
   "subject": "Toán",
   "objective": "Tính chất giao hoán kết hợp; biểu thức có ngoặc; giá trị của biểu thức chữ; hai phép tính tương đương",
   "mission": "Kéo các thẻ số và dấu phép tính đặt lên đĩa để hai vế bằng nhau.",
   "cluster": "tat-ca",
   "topic": "tính chất giao hoán kết hợp; biểu thức có ngoặc; giá trị của biểu thức chữ; hai phép tính tương đương",
   "controls": [
    "GRAB",
    "POINT"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)",
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-13-balance-lab.md"
  },
  {
   "id": "L4-14",
   "name": "Tuyến Giao Hàng",
   "grade": "4",
   "subject": "Toán",
   "objective": "Bài toán rút về đơn vị; bài toán tìm hai số khi biết tổng và tỉ; tổng hiệu; các bước giải",
   "mission": "Chỉ tay chọn lần lượt trạm và phép tính đúng để hoàn thành lộ trình.",
   "cluster": "bai-toan-nhieu-buoc",
   "topic": "bài toán rút về đơn vị; bài toán tìm hai số khi biết tổng và tỉ; tổng hiệu; các bước giải",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-14-delivery-route.md"
  },
  {
   "id": "L4-15",
   "name": "Săn Dữ Liệu",
   "grade": "4",
   "subject": "Toán",
   "objective": "Dãy số liệu; bảng thống kê; số trung bình cộng; tìm lớn nhất nhỏ nhất trong bảng",
   "mission": "Nắm giữ đúng các thẻ số liệu thỏa mãn câu hỏi và né thẻ nhiễu.",
   "cluster": "bang-so-lieu",
   "topic": "dãy số liệu; bảng thống kê; số trung bình cộng; tìm lớn nhất nhỏ nhất trong bảng",
   "controls": [
    "GRAB"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)"
   ],
   "prompt": "prompts/01-toan4/L4-15-data-catch.md"
  },
  {
   "id": "L4-16",
   "name": "Xây Biểu Đồ Cột",
   "grade": "4",
   "subject": "Toán",
   "objective": "Đọc biểu đồ cột; biểu đồ cột đôi; tạo cột theo số liệu; câu hỏi so sánh trên biểu đồ",
   "mission": "Kéo dần các cột lên đúng chiều cao tương ứng số liệu, bám vào lưới ô.",
   "cluster": "bieu-do-cot",
   "topic": "đọc biểu đồ cột; biểu đồ cột đôi; tạo cột theo số liệu; câu hỏi so sánh trên biểu đồ",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/01-toan4/L4-16-bar-builder.md"
  },
  {
   "id": "L4-17",
   "name": "Chợ Tranh Toán",
   "grade": "4",
   "subject": "Toán",
   "objective": "Biểu đồ tranh; mỗi hình đại diện mấy đơn vị; đọc và xử lí số liệu trên biểu đồ tranh",
   "mission": "Nắm món hàng theo số lượng đọc được từ biểu đồ tranh và trả lại tiền thừa.",
   "cluster": "bieu-do-tranh",
   "topic": "biểu đồ tranh; mỗi hình đại diện mấy đơn vị; đọc và xử lí số liệu trên biểu đồ tranh",
   "controls": [
    "GRAB"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)"
   ],
   "prompt": "prompts/01-toan4/L4-17-picture-market.md"
  },
  {
   "id": "L4-18",
   "name": "Phòng Thí Nghiệm Xác Suất",
   "grade": "4",
   "subject": "Toán",
   "objective": "Chắc chắn, có thể, không thể; khả năng xảy ra của sự kiện rút bóng, quay thẻ, tung đồng xu",
   "mission": "Chỉ tay thả sự kiện vào ống CHẮC CHẮN, CÓ THỂ hoặc KHÔNG THỂ.",
   "cluster": "xac-suat",
   "topic": "chắc chắn, có thể, không thể; khả năng xảy ra của sự kiện rút bóng, quay thẻ, tung đồng xu",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-18-chance-lab.md"
  },
  {
   "id": "L4-19",
   "name": "Pizza Phân Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Khái niệm phân số; tử số mẫu số; phân số lớn hơn 1 bé hơn 1 bằng 1; đọc viết phân số; biểu diễn trên hình",
   "mission": "Chỉ tay cắt và chọn đúng số phần tương ứng với phân số đề bài.",
   "cluster": "phan-so-dau",
   "topic": "khái niệm phân số; tử số mẫu số; phân số lớn hơn 1 bé hơn 1 bằng 1; đọc viết phân số; biểu diễn trên hình",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-19-fraction-pizza.md"
  },
  {
   "id": "L4-20",
   "name": "Gương Phân Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị",
   "mission": "Kéo hai thanh phân số chồng lên nhau để chứng minh cùng một giá trị.",
   "cluster": "phan-so-bang-nhau",
   "topic": "rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/01-toan4/L4-20-fraction-mirror.md"
  },
  {
   "id": "L4-21",
   "name": "Ninja Phân Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị",
   "mission": "Vuốt chém quả bong bóng chứa phân số đã rút gọn đến tối giản.",
   "cluster": "phan-so-bang-nhau",
   "topic": "rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/01-toan4/L4-21-fraction-ninja.md"
  },
  {
   "id": "L4-22",
   "name": "Nhà Máy Quy Đồng",
   "grade": "4",
   "subject": "Toán",
   "objective": "Quy đồng mẫu số hai phân số; mẫu số chung; so sánh phân số khác mẫu",
   "mission": "Kéo hệ số nhân vào cả tử và mẫu của hai phân số để ra cùng mẫu số.",
   "cluster": "quy-dong-mau",
   "topic": "quy đồng mẫu số hai phân số; mẫu số chung; so sánh phân số khác mẫu",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/01-toan4/L4-22-common-denominator-factory.md"
  },
  {
   "id": "L4-23",
   "name": "Đua Phân Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị",
   "mission": "Vuốt sang phía phân số lớn hơn hoặc bé hơn theo yêu cầu từng lượt.",
   "cluster": "phan-so-bang-nhau",
   "topic": "rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/01-toan4/L4-23-fraction-race.md"
  },
  {
   "id": "L4-24",
   "name": "Hợp Nhất Phân Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số",
   "mission": "Nắm các thanh phân số cùng mẫu ghép lại thành thanh kết quả.",
   "cluster": "cong-tru-phan-so",
   "topic": "cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số",
   "controls": [
    "GRAB"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)"
   ],
   "prompt": "prompts/01-toan4/L4-24-fraction-fusion.md"
  },
  {
   "id": "L4-25",
   "name": "Lò Phản Ứng Phân Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số",
   "mission": "Chỉ tay chọn đáp án là hiệu của hai phân số cùng mẫu để khởi động lò.",
   "cluster": "cong-tru-phan-so",
   "topic": "cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-25-fraction-reactor.md"
  },
  {
   "id": "L4-26",
   "name": "Chia Kho Báu",
   "grade": "4",
   "subject": "Toán",
   "objective": "Tìm phân số của một số; chia một hình thành số phần bằng nhau rồi lấy mấy phần",
   "mission": "Nắm từng phần vàng thả vào rương sao cho đúng phân số của số lượng.",
   "cluster": "phan-so-cua-mot-so",
   "topic": "tìm phân số của một số; chia một hình thành số phần bằng nhau rồi lấy mấy phần",
   "controls": [
    "GRAB"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)"
   ],
   "prompt": "prompts/01-toan4/L4-26-treasure-split.md"
  },
  {
   "id": "L4-27",
   "name": "Cứu Hộ Tỉ Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Tỉ số; bài toán tìm hai số khi biết tổng và tỉ số; hiệu và tỉ số",
   "mission": "Chỉ và kéo các đoạn sơ đồ đúng tỉ số, tính ra số cần tìm để giải cứu.",
   "cluster": "ti-so-tong-hieu",
   "topic": "tỉ số; bài toán tìm hai số khi biết tổng và tỉ số; hiệu và tỉ số",
   "controls": [
    "POINT",
    "DRAG"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/01-toan4/L4-27-ratio-rescue.md"
  },
  {
   "id": "L4-28",
   "name": "Nhà Thám Hiểm Bản Đồ",
   "grade": "4",
   "subject": "Toán",
   "objective": "Tỉ lệ bản đồ; độ dài thật trên bản đồ; đọc phương hướng và khoảng cách",
   "mission": "Vuốt chọn con đường có độ dài thực đúng với khoảng cách trên bản đồ.",
   "cluster": "ti-le-ban-do",
   "topic": "tỉ lệ bản đồ; độ dài thật trên bản đồ; đọc phương hướng và khoảng cách",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/01-toan4/L4-28-map-explorer.md"
  },
  {
   "id": "L4-29",
   "name": "Kéo Hình Bình Hành",
   "grade": "4",
   "subject": "Toán",
   "objective": "Đặc điểm hình bình hành; diện tích đáy × chiều cao; chu vi",
   "mission": "Kéo mảnh tam giác của hình bình hành ghép lại thành chữ nhật cùng diện tích.",
   "cluster": "hinh-binh-hanh",
   "topic": "đặc điểm hình bình hành; diện tích đáy × chiều cao; chu vi",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/01-toan4/L4-29-parallelogram-pull.md"
  },
  {
   "id": "L4-30",
   "name": "Xây Hình Thoi",
   "grade": "4",
   "subject": "Toán",
   "objective": "Đặc điểm hình thoi; hai đường chéo vuông góc; diện tích tích hai đường chéo chia 2",
   "mission": "Nắm và xoay hai thanh chéo vuông góc tại trung điểm để tạo hình thoi đúng diện tích.",
   "cluster": "hinh-thoi",
   "topic": "đặc điểm hình thoi; hai đường chéo vuông góc; diện tích tích hai đường chéo chia 2",
   "controls": [
    "GRAB",
    "DRAG"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/01-toan4/L4-30-diamond-builder.md"
  },
  {
   "id": "L4-31",
   "name": "Bứt Tốc Tổng Hợp",
   "grade": "4",
   "subject": "Toán",
   "objective": "Ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4",
   "mission": "Vuốt né chướng ngại mang đáp án sai, vượt qua cổng mang đáp án đúng.",
   "cluster": "on-tap-toan-4",
   "topic": "ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/01-toan4/L4-31-mixed-sprint.md"
  },
  {
   "id": "L4-32",
   "name": "Đấu Trường Hình Học",
   "grade": "4",
   "subject": "Toán",
   "objective": "Ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4",
   "mission": "Bước nghiêng người vào vòm cổng chứa khẳng định đúng về góc, đường, diện tích.",
   "cluster": "on-tap-toan-4",
   "topic": "ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4",
   "controls": [
    "STEP"
   ],
   "controlLabels": [
    "Nghiêng người / bước sang vùng (Body tilt)"
   ],
   "prompt": "prompts/01-toan4/L4-32-geometry-arena.md"
  },
  {
   "id": "L4-33",
   "name": "Đấu Trường Phân Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số",
   "mission": "Nắm mảnh phân số tạo thành kết quả đúng và né mảnh gây sai mẫu số.",
   "cluster": "cong-tru-phan-so",
   "topic": "cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số",
   "controls": [
    "GRAB"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)"
   ],
   "prompt": "prompts/01-toan4/L4-33-fraction-arena.md"
  },
  {
   "id": "L4-34",
   "name": "Đấu Trường Dữ Liệu",
   "grade": "4",
   "subject": "Toán",
   "objective": "Dãy số liệu; bảng thống kê; số trung bình cộng; tìm lớn nhất nhỏ nhất trong bảng",
   "mission": "Chỉ tay vào giá trị trả lời cho câu hỏi đọc bảng, biểu đồ trong thời gian giới hạn.",
   "cluster": "bang-so-lieu",
   "topic": "dãy số liệu; bảng thống kê; số trung bình cộng; tìm lớn nhất nhỏ nhất trong bảng",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-34-data-arena.md"
  },
  {
   "id": "L4-35",
   "name": "Đại Đấu Trường Toán",
   "grade": "4",
   "subject": "Toán",
   "objective": "Ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4",
   "mission": "Đấm thẻ đáp án đúng ở mỗi cửa ải để hạ guardian của từng chủ đề.",
   "cluster": "on-tap-toan-4",
   "topic": "ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/01-toan4/L4-35-grand-math-arena.md"
  },
  {
   "id": "L4-36",
   "name": "Lò Rèn Hàng Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Số tự nhiên đến 100000 và 1000000; giá trị theo hàng; viết dưới dạng tổng các hàng; số có chữ số 0 ở hàng trung gian",
   "mission": "Chỉ ngón tay chọn khuôn hàng (chục nghìn, trăm nghìn…) chứa chữ số đúng yêu cầu.",
   "cluster": "hang-so",
   "topic": "số tự nhiên đến 100000 và 1000000; giá trị theo hàng; viết dưới dạng tổng các hàng; số có chữ số 0 ở hàng trung gian",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-36-place-value-forge.md"
  },
  {
   "id": "L4-37",
   "name": "Chợ Phân Số",
   "grade": "4",
   "subject": "Toán",
   "objective": "Tìm phân số của một số; chia một hình thành số phần bằng nhau rồi lấy mấy phần",
   "mission": "Nắm phần hàng đúng phân số người mua yêu cầu rồi cân và trả tiền thừa.",
   "cluster": "phan-so-cua-mot-so",
   "topic": "tìm phân số của một số; chia một hình thành số phần bằng nhau rồi lấy mấy phần",
   "controls": [
    "GRAB"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)"
   ],
   "prompt": "prompts/01-toan4/L4-37-fraction-market.md"
  },
  {
   "id": "L4-38",
   "name": "Giải Cứu Góc",
   "grade": "4",
   "subject": "Toán",
   "objective": "Góc nhọn, vuông, tù, bẹt; đỉnh, cạnh; đo góc bằng thước nửa tròn; góc ở đỉnh chung",
   "mission": "Chỉ tay tới nhân vật đang cầm góc đúng loại (nhọn, vuông, tù) và số đo đề bài.",
   "cluster": "goc",
   "topic": "góc nhọn, vuông, tù, bẹt; đỉnh, cạnh; đo góc bằng thước nửa tròn; góc ở đỉnh chung",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-38-angle-rescue.md"
  },
  {
   "id": "L4-39",
   "name": "Thám Tử Dữ Liệu",
   "grade": "4",
   "subject": "Toán",
   "objective": "Đọc biểu đồ cột; biểu đồ cột đôi; tạo cột theo số liệu; câu hỏi so sánh trên biểu đồ",
   "mission": "Chỉ vào bằng chứng trong bảng hoặc biểu đồ để trả lời từng nghi vấn.",
   "cluster": "bieu-do-cot",
   "topic": "đọc biểu đồ cột; biểu đồ cột đôi; tạo cột theo số liệu; câu hỏi so sánh trên biểu đồ",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/01-toan4/L4-39-data-detective.md"
  },
  {
   "id": "L4-40",
   "name": "Phòng Boss Toán",
   "grade": "4",
   "subject": "Toán",
   "objective": "Trận boss tổng hợp: 3 giai đoạn tăng độ khó với kiến thức đã học trong chương",
   "mission": "Đấm chuỗi đáp án đúng qua ba giai đoạn, mỗi giai đoạn được một lần dùng gợi ý.",
   "cluster": "boss-cong-thu",
   "topic": "trận boss tổng hợp: 3 giai đoạn tăng độ khó với kiến thức đã học trong chương",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/01-toan4/L4-40-math-boss-lab.md"
  },
  {
   "id": "T5-01",
   "name": "Nhiệm Vụ Phép Tính",
   "grade": "5",
   "subject": "Toán",
   "objective": "Cộng trừ số có đến 6 chữ số; thành phần và giá trị biểu thức; tính giá trị biểu thức có ngoặc",
   "mission": "Đấm vào bảng khoá mang giá trị đúng của biểu thức, tính theo thứ tự ưu tiên.",
   "cluster": "cong-tru",
   "topic": "cộng trừ số có đến 6 chữ số; thành phần và giá trị biểu thức; tính giá trị biểu thức có ngoặc",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/02-toan5/T5-01-multi-operation-quest.md"
  },
  {
   "id": "T5-02",
   "name": "Đường Đua Số Thập Phân",
   "grade": "5",
   "subject": "Toán",
   "objective": "Khái niệm số thập phân; hàng phần mười phần trăm phần nghìn; đọc viết số thập phân; so sánh; làm tròn",
   "mission": "Vuốt sang làn chứa số thập phân lớn hơn hoặc bé hơn theo yêu cầu.",
   "cluster": "thap-phan-khai-niem",
   "topic": "khái niệm số thập phân; hàng phần mười phần trăm phần nghìn; đọc viết số thập phân; so sánh; làm tròn",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/02-toan5/T5-02-decimal-dash.md"
  },
  {
   "id": "T5-03",
   "name": "Ghép Phân Số – Thập Phân – Phần Trăm",
   "grade": "5",
   "subject": "Toán",
   "objective": "Chuyển đổi phân số thập phân – số thập phân – phần trăm; so sánh ba dạng; xếp cặp bằng giá trị",
   "mission": "Kéo thẻ ở hai cột còn lại ghép vào cùng một giá trị với thẻ neo.",
   "cluster": "chuyen-dong-f-d-p",
   "topic": "chuyển đổi phân số thập phân – số thập phân – phần trăm; so sánh ba dạng; xếp cặp bằng giá trị",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/02-toan5/T5-03-fraction-decimal-percentage-memory.md"
  },
  {
   "id": "T5-04",
   "name": "Cửa Hàng Phần Trăm",
   "grade": "5",
   "subject": "Toán",
   "objective": "Tỉ số phần trăm; đọc viết phần trăm; tính phần trăm của một số; bài toán mua bán giảm giá lãi suất đơn giản",
   "mission": "Nắm món hàng có giá trị giảm hoặc giá trả đúng tỉ lệ phần trăm đề bài.",
   "cluster": "phan-tram",
   "topic": "tỉ số phần trăm; đọc viết phần trăm; tính phần trăm của một số; bài toán mua bán giảm giá lãi suất đơn giản",
   "controls": [
    "GRAB",
    "POINT"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)",
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/02-toan5/T5-04-percentage-shop.md"
  },
  {
   "id": "T5-05",
   "name": "Xây Kho Thể Tích",
   "grade": "5",
   "subject": "Toán",
   "objective": "Xăng-ti-mét khối, mét khối; thể tích hình hộp chữ nhật và lập phương; đếm khối lập phương 1cm³",
   "mission": "Kéo từng lớp khối lập phương 1cm dựng lên đúng chiều dài rộng cao yêu cầu.",
   "cluster": "the-tich",
   "topic": "xăng-ti-mét khối, mét khối; thể tích hình hộp chữ nhật và lập phương; đếm khối lập phương 1cm³",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/02-toan5/T5-05-volume-builder.md"
  },
  {
   "id": "T5-06",
   "name": "Đầu Bếp Tỉ Số",
   "grade": "5",
   "subject": "Toán",
   "objective": "Tỉ số nguyên liệu trong công thức nấu ăn; gấp hoặc giảm khẩu phần; bài toán liên quan đến rút về đơn vị",
   "mission": "Kéo nguyên liệu vào nồi sao cho các nguyên liệu giữ đúng tỉ lệ công thức.",
   "cluster": "ti-so-dau-bep",
   "topic": "tỉ số nguyên liệu trong công thức nấu ăn; gấp hoặc giảm khẩu phần; bài toán liên quan đến rút về đơn vị",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/02-toan5/t5-06.md"
  },
  {
   "id": "T5-07",
   "name": "Đua Chuyển Động",
   "grade": "5",
   "subject": "Toán",
   "objective": "Quãng đường vận tốc thời gian; đơn vị đo thời gian; hai chuyển động ngược chiều cùng khởi hành",
   "mission": "Chỉ tay chọn dữ kiện vận tốc và thời gian, dự đoán đúng điểm gặp nhau.",
   "cluster": "chuyen-dong-de",
   "topic": "quãng đường vận tốc thời gian; đơn vị đo thời gian; hai chuyển động ngược chiều cùng khởi hành",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/02-toan5/t5-07.md"
  },
  {
   "id": "T5-08",
   "name": "Phòng Tập Hình Học",
   "grade": "5",
   "subject": "Toán",
   "objective": "Chu vi diện tích các hình đã học; hình tròn tâm bán kính đường kính; thể tích hình hộp",
   "mission": "Bước sang trạm mang công thức đúng để tính chu vi hoặc diện tích được hỏi.",
   "cluster": "hinh-hoc-on-tap",
   "topic": "chu vi diện tích các hình đã học; hình tròn tâm bán kính đường kính; thể tích hình hộp",
   "controls": [
    "STEP"
   ],
   "controlLabels": [
    "Nghiêng người / bước sang vùng (Body tilt)"
   ],
   "prompt": "prompts/02-toan5/t5-08.md"
  },
  {
   "id": "T5-09",
   "name": "Cân Bằng Số Thập Phân",
   "grade": "5",
   "subject": "Toán",
   "objective": "So sánh và sắp thứ tự số thập phân; hai số thập phân bằng nhau; cân bằng hai vế thập phân",
   "mission": "Kéo giãn hai tay nâng hai số: tay cao hơn là số lớn hơn, cân khi hai số bằng nhau.",
   "cluster": "thap-phan-can-bang",
   "topic": "so sánh và sắp thứ tự số thập phân; hai số thập phân bằng nhau; cân bằng hai vế thập phân",
   "controls": [
    "TWO_HAND_BALANCE"
   ],
   "controlLabels": [
    "Cân bằng hai tay (Two-hand balance)"
   ],
   "prompt": "prompts/02-toan5/t5-09.md"
  },
  {
   "id": "T5-10",
   "name": "Đại Nhiệm Vụ Toán",
   "grade": "5",
   "subject": "Toán",
   "objective": "Ôn tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5",
   "mission": "Đấm phá phong ấn bằng đáp án đúng, chỉ tay chọn chiến lược giải trước khi tính.",
   "cluster": "on-tap-toan-5",
   "topic": "ôn tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5",
   "controls": [
    "PUNCH",
    "POINT"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)",
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/02-toan5/t5-10.md"
  },
  {
   "id": "T5-11",
   "name": "Cửa Hàng Thập Phân",
   "grade": "5",
   "subject": "Toán",
   "objective": "Khái niệm số thập phân; hàng phần mười phần trăm phần nghìn; đọc viết số thập phân; so sánh; làm tròn",
   "mission": "Chỉ món hàng cần mua rồi kéo các đồng tiền và hóa đơn khớp số tiền thập phân.",
   "cluster": "thap-phan-khai-niem",
   "topic": "khái niệm số thập phân; hàng phần mười phần trăm phần nghìn; đọc viết số thập phân; so sánh; làm tròn",
   "controls": [
    "POINT",
    "DRAG"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/02-toan5/T5-11-decimal-shop.md"
  },
  {
   "id": "T5-12",
   "name": "Phòng Thí Nghiệm Phần Trăm",
   "grade": "5",
   "subject": "Toán",
   "objective": "Tỉ số phần trăm; đọc viết phần trăm; tính phần trăm của một số; bài toán mua bán giảm giá lãi suất đơn giản",
   "mission": "Chỉ và kéo số ô tô màu đúng số phần trăm, sau đó đổi sang phân số và số thập phân.",
   "cluster": "phan-tram",
   "topic": "tỉ số phần trăm; đọc viết phần trăm; tính phần trăm của một số; bài toán mua bán giảm giá lãi suất đơn giản",
   "controls": [
    "POINT",
    "DRAG"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/02-toan5/T5-12-percentage-lab.md"
  },
  {
   "id": "T5-13",
   "name": "Kho Báu Thể Tích",
   "grade": "5",
   "subject": "Toán",
   "objective": "Xăng-ti-mét khối, mét khối; thể tích hình hộp chữ nhật và lập phương; đếm khối lập phương 1cm³",
   "mission": "Chỉ vào kích thước đo được rồi kéo khối lập phương kiểm chứng thể tích trước khi mở kho.",
   "cluster": "the-tich",
   "topic": "xăng-ti-mét khối, mét khối; thể tích hình hộp chữ nhật và lập phương; đếm khối lập phương 1cm³",
   "controls": [
    "POINT",
    "DRAG"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/02-toan5/T5-13-volume-vault.md"
  },
  {
   "id": "T5-14",
   "name": "Đua Bài Toán Chuyển Động",
   "grade": "5",
   "subject": "Toán",
   "objective": "Quãng đường vận tốc thời gian; đơn vị đo thời gian; hai chuyển động ngược chiều cùng khởi hành",
   "mission": "Chỉ dữ kiện đúng trên trục thời gian để tính vận tốc hoặc quãng đường còn thiếu.",
   "cluster": "chuyen-dong-de",
   "topic": "quãng đường vận tốc thời gian; đơn vị đo thời gian; hai chuyển động ngược chiều cùng khởi hành",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/02-toan5/T5-14-motion-word-problem.md"
  },
  {
   "id": "T5-15",
   "name": "Đấu Trường Chiến Thuật Toán",
   "grade": "5",
   "subject": "Toán",
   "objective": "Ôn tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5",
   "mission": "Nắm thẻ chiến lược (rút về đơn vị, tỉ số, sơ đồ đoạn thẳng) áp vào đề bài rồi chọn đáp án.",
   "cluster": "on-tap-toan-5",
   "topic": "ôn tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5",
   "controls": [
    "GRAB",
    "POINT"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)",
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/02-toan5/T5-15-math-strategy-arena.md"
  },
  {
   "id": "E4-01",
   "name": "Nhiệm Vụ Từ Vựng",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Từ vựng lớp 4: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng",
   "mission": "Vuốt chém tấm bảng mang từ tiếng Anh đúng với nghĩa hoặc tranh gợi ý.",
   "cluster": "tu-vung-e4",
   "topic": "từ vựng lớp 4: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/03-english4/E4-01-vocab-quest.md"
  },
  {
   "id": "E4-02",
   "name": "Chọn Đáp Án Nghe",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề",
   "mission": "Nghe và chỉ ngón tay vào tranh hoặc từ đúng với đoạn nghe.",
   "cluster": "nghe-e4",
   "topic": "nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/03-english4/E4-02-listening-pick.md"
  },
  {
   "id": "E4-03",
   "name": "Ghép Tranh – Từ",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Nối tranh với từ; kéo thả từ vào chỗ trống theo tranh; nhận diện từ qua hình",
   "mission": "Kéo thẻ từ tiếng Anh thả đúng ô tranh tương ứng.",
   "cluster": "ghep-tranh-tu",
   "topic": "nối tranh với từ; kéo thả từ vào chỗ trống theo tranh; nhận diện từ qua hình",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/03-english4/E4-03-picture-word-match.md"
  },
  {
   "id": "E4-04",
   "name": "Ngôi Sao Chính Tả",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5",
   "mission": "Đấm vào ngôi sao chứa cách viết đúng chính tả của từ được đọc.",
   "cluster": "chinh-ta",
   "topic": "điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/03-english4/E4-04-spelling-stars.md"
  },
  {
   "id": "E4-05",
   "name": "Nhiệm Vụ Điền Chữ",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5",
   "mission": "Chỉ vào chữ cái còn thiếu ở đúng vị trí trong từ.",
   "cluster": "chinh-ta",
   "topic": "điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/03-english4/E4-05-missing-letter-mission.md"
  },
  {
   "id": "E4-06",
   "name": "Xây Từ",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Bảng chữ cái bị xáo trộn: ghép thành từ đúng; mỗi từ có nghĩa gợi ý",
   "mission": "Kéo từng chữ cái thả vào ô trống theo đúng thứ tự của từ.",
   "cluster": "xay-tu",
   "topic": "bảng chữ cái bị xáo trộn: ghép thành từ đúng; mỗi từ có nghĩa gợi ý",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/03-english4/E4-06-word-builder.md"
  },
  {
   "id": "E4-07",
   "name": "Đua Xếp Câu",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Sắp xếp các từ đã cho thành câu có nghĩa; điền động từ to be a/an the",
   "mission": "Kéo các toa từ vào đúng trật tự để thành câu hoàn chỉnh có nghĩa.",
   "cluster": "xep-cau",
   "topic": "sắp xếp các từ đã cho thành câu có nghĩa; điền động từ to be a/an the",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/03-english4/E4-07-sentence-race.md"
  },
  {
   "id": "E4-08",
   "name": "Trí Nhớ Từ Vựng",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Lật thẻ ghép cặp từ với tranh/nghĩa; bộ 8-12 cặp mỗi chủ đề",
   "mission": "Chỉ tay lật thẻ để ghép đúng cặp từ tiếng Anh với tranh nghĩa.",
   "cluster": "trieu-tu-vung",
   "topic": "lật thẻ ghép cặp từ với tranh/nghĩa; bộ 8-12 cặp mỗi chủ đề",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/03-english4/E4-08-word-memory.md"
  },
  {
   "id": "E4-09",
   "name": "Đường Đua Nghe",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề",
   "mission": "Nghe rồi nghiêng người bước sang làn chứa từ hoặc số đúng.",
   "cluster": "nghe-e4",
   "topic": "nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề",
   "controls": [
    "STEP"
   ],
   "controlLabels": [
    "Nghiêng người / bước sang vùng (Body tilt)"
   ],
   "prompt": "prompts/03-english4/E4-09-listening-lane.md"
  },
  {
   "id": "E4-10",
   "name": "Đập Từ",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Từ vựng lớp 4: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng",
   "mission": "Đấm trúng bong bóng chứa từ đúng với nghĩa tiếng Việt hiện trên bảng.",
   "cluster": "tu-vung-e4",
   "topic": "từ vựng lớp 4: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/03-english4/E4-10-word-whack.md"
  },
  {
   "id": "E4-11",
   "name": "Xây Câu Chuyện Tranh",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Sắp xếp 3-5 tranh theo trình tự; chọn câu phù hợp với từng tranh",
   "mission": "Chỉ và kéo các tranh theo đúng trình tự, rồi ghép câu mô tả cho từng tranh.",
   "cluster": "ke-chuyen",
   "topic": "sắp xếp 3-5 tranh theo trình tự; chọn câu phù hợp với từng tranh",
   "controls": [
    "POINT",
    "DRAG"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/03-english4/E4-11-picture-story-builder.md"
  },
  {
   "id": "E4-12",
   "name": "Nghe Và Phân Loại",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Nghe rồi phân loại từ vào 3 nhóm chủ đề; nghe và chọn từ sai khác",
   "mission": "Nghe một từ, chỉ vào rổ chủ đề đúng rồi kéo thẻ từ vào rổ đó.",
   "cluster": "nghe-phan-loai",
   "topic": "nghe rồi phân loại từ vào 3 nhóm chủ đề; nghe và chọn từ sai khác",
   "controls": [
    "POINT",
    "DRAG"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/03-english4/E4-12-listen-and-sort.md"
  },
  {
   "id": "E4-13",
   "name": "Bóng Âm",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Âm và mẫu chữ thường gặp: sh ch th ph gh ea ee oo ai ay; chọn từ chứa âm mục tiêu",
   "mission": "Vuốt chém các quả bóng chứa từ có âm hoặc mẫu chữ mục tiêu.",
   "cluster": "phonics",
   "topic": "âm và mẫu chữ thường gặp: sh ch th ph gh ea ee oo ai ay; chọn từ chứa âm mục tiêu",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/03-english4/E4-13-phonics-pop.md"
  },
  {
   "id": "E4-14",
   "name": "Xây Câu Hỏi",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "What is this How much Where is Who are you How old và câu trả lời mẫu",
   "mission": "Chọn từ để hỏi trước rồi kéo các từ còn lại về đúng trật tự câu hỏi.",
   "cluster": "cau-hoi",
   "topic": "What is this How much Where is Who are you How old và câu trả lời mẫu",
   "controls": [
    "POINT",
    "DRAG"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/03-english4/E4-14-question-builder.md"
  },
  {
   "id": "E4-15",
   "name": "Bản Đồ Phiêu Lưu Tiếng Anh",
   "grade": "4",
   "subject": "Tiếng Anh",
   "objective": "Bản đồ 5 đảo: từ vựng, nghe, chính tả, câu, phát âm; mỗi đảo 3 câu",
   "mission": "Chỉ tay mở khoá từng bến đảo, hoàn thành ba câu trên đảo để lấy huy hiệu.",
   "cluster": "dao-kynang-e4",
   "topic": "bản đồ 5 đảo: từ vựng, nghe, chính tả, câu, phát âm; mỗi đảo 3 câu",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/03-english4/E4-15-english-adventure-map.md"
  },
  {
   "id": "E5-01",
   "name": "Trùm Nghe Hiểu",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề",
   "mission": "Nghe và chỉ vào đáp án đúng trong ba lựa chọn, mỗi lượt được nghe lại tối đa ba lần.",
   "cluster": "nghe-e4",
   "topic": "nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/04-english5/E5-01-listening-boss.md"
  },
  {
   "id": "E5-02",
   "name": "Mê Cung Câu",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any",
   "mission": "Kéo thẻ ngữ pháp đúng thả vào chỗ trống để mở lối đi tiếp.",
   "cluster": "nguphap-e5",
   "topic": "hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/04-english5/E5-02-sentence-maze.md"
  },
  {
   "id": "E5-03",
   "name": "Thợ Săn Từ",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Từ vựng lớp 4: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng",
   "mission": "Vuốt chém bụi cây chứa từ đúng với nghĩa và ngữ cảnh câu gợi ý.",
   "cluster": "tu-vung-e4",
   "topic": "từ vựng lớp 4: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/04-english5/E5-03-word-hunter.md"
  },
  {
   "id": "E5-04",
   "name": "Cổng Ngữ Pháp",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any",
   "mission": "Nghiêng người bước vào cổng chứa dạng động từ đúng với thì của câu.",
   "cluster": "nguphap-e5",
   "topic": "hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any",
   "controls": [
    "STEP"
   ],
   "controlLabels": [
    "Nghiêng người / bước sang vùng (Body tilt)"
   ],
   "prompt": "prompts/04-english5/E5-04-grammar-gates.md"
  },
  {
   "id": "E5-05",
   "name": "Hẻm Núi Điền Từ",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Đoạn văn có 5-8 chỗ trống chọn từ trong ngân hàng từ; dựa vào ngữ cảnh suy ra từ",
   "mission": "Kéo từ trong ngân hàng từ thả vào chỗ trống hợp ngữ cảnh.",
   "cluster": "dien-tu-trong-doan-van",
   "topic": "đoạn văn có 5-8 chỗ trống chọn từ trong ngân hàng từ; dựa vào ngữ cảnh suy ra từ",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/04-english5/E5-05-cloze-canyon.md"
  },
  {
   "id": "E5-06",
   "name": "Pháo Đài Chính Tả",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5",
   "mission": "Đấm quả đạn chứa từ viết đúng để bắn hạ loạt đạn sai.",
   "cluster": "chinh-ta",
   "topic": "điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/04-english5/E5-06-spelling-blaster.md"
  },
  {
   "id": "E5-07",
   "name": "Xây Cụm Từ",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Ghép từ thành cụm a pair of a glass of how many và đặt câu với cụm",
   "mission": "Kéo các mảnh từ ghép thành cụm hoàn chỉnh rồi đặt câu với cụm đó.",
   "cluster": "xay-cum-tu",
   "topic": "ghép từ thành cụm a pair of a glass of how many và đặt câu với cụm",
   "controls": [
    "DRAG"
   ],
   "controlLabels": [
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/04-english5/E5-07-phrase-builder.md"
  },
  {
   "id": "E5-08",
   "name": "Bộ Ba Trí Nhớ",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Ghép bộ ba từ tranh nghĩa tiếng Việt; 8 bộ mỗi lượt",
   "mission": "Lật ba thẻ cùng một bộ bằng ngón tay để ghép thành bộ ba đúng.",
   "cluster": "bo-ba-tri-nho",
   "topic": "ghép bộ ba từ tranh nghĩa tiếng Việt; 8 bộ mỗi lượt",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/04-english5/E5-08-memory-triplet.md"
  },
  {
   "id": "E5-09",
   "name": "Tuyến Đường Nói",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Nói câu ngắn theo tình huống qua Web Speech recognition; khung câu cho sẵn",
   "mission": "Nói to câu trả lời theo khung câu; micro nhận giọng và chấm từng từ.",
   "cluster": "noi",
   "topic": "nói câu ngắn theo tình huống qua Web Speech recognition; khung câu cho sẵn",
   "controls": [
    "VOICE"
   ],
   "controlLabels": [
    "Nói (Voice)"
   ],
   "prompt": "prompts/04-english5/E5-09-voice-route.md"
  },
  {
   "id": "E5-10",
   "name": "Đảo Ôn Tập",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Ôn tổng hợp nghe đọc viết nói ngữ pháp từ vựng tiếng Anh lớp 5",
   "mission": "Chỉ tay chọn từng câu hỏi trên đảo, đáp án đúng mở đường sang đảo kế tiếp.",
   "cluster": "on-tap-e5",
   "topic": "ôn tổng hợp nghe đọc viết nói ngữ pháp từ vựng tiếng Anh lớp 5",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/04-english5/E5-10-island-review.md"
  },
  {
   "id": "E5-11",
   "name": "Thám Tử Đọc Hiểu",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Đoạn văn 60-90 từ lớp 5: ý chính, chi tiết, trình tự, suy luận đơn giản; tìm bằng chứng gạch chân",
   "mission": "Đọc đoạn văn và chỉ tay gạch chân đúng câu chứa bằng chứng cho nghi vấn.",
   "cluster": "doc-hieu",
   "topic": "đoạn văn 60-90 từ lớp 5: ý chính, chi tiết, trình tự, suy luận đơn giản; tìm bằng chứng gạch chân",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/04-english5/E5-11-reading-detective.md"
  },
  {
   "id": "E5-12",
   "name": "Xây Ngữ Pháp",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any",
   "mission": "Chỉ ra chỗ sai trong câu rồi kéo thẻ sửa đúng để cây cầu mở màn tiếp.",
   "cluster": "nguphap-e5",
   "topic": "hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any",
   "controls": [
    "POINT",
    "DRAG"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/04-english5/E5-12-grammar-builder.md"
  },
  {
   "id": "E5-13",
   "name": "Nhiệm Vụ Nói",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Nói câu ngắn theo tình huống qua Web Speech recognition; khung câu cho sẵn",
   "mission": "Nghe tình huống và nói câu trả lời ngắn; hệ thống hiện transcript và chấm phát âm.",
   "cluster": "noi",
   "topic": "nói câu ngắn theo tình huống qua Web Speech recognition; khung câu cho sẵn",
   "controls": [
    "VOICE"
   ],
   "controlLabels": [
    "Nói (Voice)"
   ],
   "prompt": "prompts/04-english5/E5-13-speaking-mission.md"
  },
  {
   "id": "E5-14",
   "name": "Phòng Thí Nghiệm Tạo Từ",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Ghép từ thành cụm a pair of a glass of how many và đặt câu với cụm",
   "mission": "Chỉ gốc từ rồi kéo mảnh tiền tố hoặc hậu tố thả vào để biến đổi từ loại.",
   "cluster": "xay-cum-tu",
   "topic": "ghép từ thành cụm a pair of a glass of how many và đặt câu với cụm",
   "controls": [
    "POINT",
    "DRAG"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)",
    "Kéo thả (Drag)"
   ],
   "prompt": "prompts/04-english5/E5-14-word-formation-lab.md"
  },
  {
   "id": "E5-15",
   "name": "Cúp Thử Thách Tiếng Anh",
   "grade": "5",
   "subject": "Tiếng Anh",
   "objective": "Ôn tổng hợp nghe đọc viết nói ngữ pháp từ vựng tiếng Anh lớp 5",
   "mission": "Chỉ tay trả lời ở mỗi trạm, đủ điều kiện thì trạm sau mở khoá độ khó cao hơn.",
   "cluster": "on-tap-e5",
   "topic": "ôn tổng hợp nghe đọc viết nói ngữ pháp từ vựng tiếng Anh lớp 5",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/04-english5/E5-15-english-challenge-cup.md"
  }
 ],
 "legacy": [
  {
   "id": "LEG-01",
   "name": "Subway Math Blitz AR",
   "grade": "4-5",
   "subject": "Toán",
   "objective": "Thẻ phép tính rơi ba làn, đấm thẻ đúng, né thẻ sai.",
   "mission": "Thẻ phép tính rơi ba làn, đấm thẻ đúng, né thẻ sai.",
   "controls": [
    "PUNCH"
   ],
   "controlLabels": [
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/01-prompt-subway-math-blitz.md",
   "legacy": true
  },
  {
   "id": "LEG-02",
   "name": "AR Math Catcher",
   "grade": "4-5",
   "subject": "Toán",
   "objective": "Di chuyển giỏ hứng quả mang phép tính đúng, né bom sai.",
   "mission": "Di chuyển giỏ hứng quả mang phép tính đúng, né bom sai.",
   "controls": [
    "GRAB"
   ],
   "controlLabels": [
    "Nắm và thả (Grab / Catch)"
   ],
   "prompt": "prompts/02-prompt-math-catcher-ar.md",
   "legacy": true
  },
  {
   "id": "LEG-03",
   "name": "Math Ninja Bubble Pop",
   "grade": "4-5",
   "subject": "Toán",
   "objective": "Chém bong bóng phân số, số thập phân theo điều kiện.",
   "mission": "Chém bong bóng phân số, số thập phân theo điều kiện.",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/03-prompt-ninja-bubble-pop.md",
   "legacy": true
  },
  {
   "id": "LEG-04",
   "name": "English Vocabulary Ninja AR",
   "grade": "4-5",
   "subject": "Tiếng Anh",
   "objective": "Chém từ vựng tiếng Anh theo chủ đề hoặc từ đồng nghĩa.",
   "mission": "Chém từ vựng tiếng Anh theo chủ đề hoặc từ đồng nghĩa.",
   "controls": [
    "SWIPE"
   ],
   "controlLabels": [
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/04-prompt-english-vocab-ninja.md",
   "legacy": true
  },
  {
   "id": "LEG-05",
   "name": "Body Tilt & Dodge AR",
   "grade": "4-5",
   "subject": "Toán",
   "objective": "Nghiêng người đưa phi thuyền qua cổng đúng, né cổng sai.",
   "mission": "Nghiêng người đưa phi thuyền qua cổng đúng, né cổng sai.",
   "controls": [
    "STEP",
    "TWO_HAND_STRETCH"
   ],
   "controlLabels": [
    "Nghiêng người / bước sang vùng (Body tilt)",
    "Khom hai tay (Two-hand stretch)"
   ],
   "prompt": "prompts/05-prompt-body-tilt-dodge.md",
   "legacy": true
  },
  {
   "id": "LEG-06",
   "name": "Two Hands Balance AR",
   "grade": "4-5",
   "subject": "Toán",
   "objective": "Hai tay nâng hạ tạo đòn cân so sánh hai vế.",
   "mission": "Hai tay nâng hạ tạo đòn cân so sánh hai vế.",
   "controls": [
    "TWO_HAND_BALANCE"
   ],
   "controlLabels": [
    "Cân bằng hai tay (Two-hand balance)"
   ],
   "prompt": "prompts/06-prompt-two-hands-balance.md",
   "legacy": true
  },
  {
   "id": "LEG-07",
   "name": "AR Spelling Bee & Phonics",
   "grade": "4-5",
   "subject": "Tiếng Anh",
   "objective": "Bắt chữ cái bay lơ lửng để ghép từ tiếng Anh.",
   "mission": "Bắt chữ cái bay lơ lửng để ghép từ tiếng Anh.",
   "controls": [
    "POINT"
   ],
   "controlLabels": [
    "Chỉ ngón tay trỏ (Point)"
   ],
   "prompt": "prompts/07-prompt-finger-spell-english.md",
   "legacy": true
  },
  {
   "id": "LEG-08",
   "name": "Bí Ẩn Sơ Đồ Đoạn Thẳng",
   "grade": "4",
   "subject": "Toán",
   "objective": "Sơ đồ đoạn thẳng động cho toán tổng – tỉ số.",
   "mission": "Sơ đồ đoạn thẳng động cho toán tổng – tỉ số.",
   "controls": [
    "TWO_HAND_STRETCH",
    "PUNCH"
   ],
   "controlLabels": [
    "Khom hai tay (Two-hand stretch)",
    "Vung tay đấm (Punch)"
   ],
   "prompt": "prompts/08-prompt-toan4-tong-ti-so-do.md",
   "legacy": true
  },
  {
   "id": "LEG-09",
   "name": "Cánh Tay Ê-Ke & Pháo Đài Góc",
   "grade": "4",
   "subject": "Toán",
   "objective": "Hai cánh tay tạo góc và diện tích theo yêu cầu.",
   "mission": "Hai cánh tay tạo góc và diện tích theo yêu cầu.",
   "controls": [
    "ANGLE_POSE"
   ],
   "controlLabels": [
    "Tạo góc bằng cánh tay (Angle pose)"
   ],
   "prompt": "prompts/09-prompt-toan4-hinh-hoc-goc-dien-tich.md",
   "legacy": true
  },
  {
   "id": "LEG-10",
   "name": "Cao Tốc Tốc Độ",
   "grade": "5",
   "subject": "Toán",
   "objective": "Hai xe chuyển động đều, chạm tay đúng thời điểm gặp nhau.",
   "mission": "Hai xe chuyển động đều, chạm tay đúng thời điểm gặp nhau.",
   "controls": [
    "TWO_HAND_BALANCE"
   ],
   "controlLabels": [
    "Cân bằng hai tay (Two-hand balance)"
   ],
   "prompt": "prompts/10-prompt-toan5-chuyen-dong-gap-nhau.md",
   "legacy": true
  },
  {
   "id": "LEG-11",
   "name": "Kiến Trúc Sư Khối 3D",
   "grade": "5",
   "subject": "Toán",
   "objective": "Xếp lớp khối lập phương xây hình hộp, tính thể tích.",
   "mission": "Xếp lớp khối lập phương xây hình hộp, tính thể tích.",
   "controls": [
    "DRAG",
    "SWIPE"
   ],
   "controlLabels": [
    "Kéo thả (Drag)",
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/11-prompt-toan5-the-tich-hinh-khoi.md",
   "legacy": true
  },
  {
   "id": "LEG-12",
   "name": "Thần Săn Giảm Giá",
   "grade": "5",
   "subject": "Toán",
   "objective": "Kéo thanh trượt phần trăm, chém mức giá sau giảm giá.",
   "mission": "Kéo thanh trượt phần trăm, chém mức giá sau giảm giá.",
   "controls": [
    "DRAG",
    "SWIPE"
   ],
   "controlLabels": [
    "Kéo thả (Drag)",
    "Vuốt / chém (Swipe)"
   ],
   "prompt": "prompts/12-prompt-toan5-ti-so-phan-tram-chiet-khau.md",
   "legacy": true
  }
 ],
 "controls": [
  {
   "code": "POINT",
   "vi": "Chỉ ngón tay trỏ (Point)",
   "count": 34
  },
  {
   "code": "SWIPE",
   "vi": "Vuốt / chém (Swipe)",
   "count": 9
  },
  {
   "code": "PUNCH",
   "vi": "Vung tay đấm (Punch)",
   "count": 10
  },
  {
   "code": "GRAB",
   "vi": "Nắm và thả (Grab / Catch)",
   "count": 12
  },
  {
   "code": "DRAG",
   "vi": "Kéo thả (Drag)",
   "count": 23
  },
  {
   "code": "STEP",
   "vi": "Nghiêng người / bước sang vùng (Body tilt)",
   "count": 5
  },
  {
   "code": "TWO_HAND_STRETCH",
   "vi": "Khom hai tay (Two-hand stretch)",
   "count": 3
  },
  {
   "code": "TWO_HAND_BALANCE",
   "vi": "Cân bằng hai tay (Two-hand balance)",
   "count": 1
  },
  {
   "code": "ANGLE_POSE",
   "vi": "Tạo góc bằng cánh tay (Angle pose)",
   "count": 1
  },
  {
   "code": "VOICE",
   "vi": "Nói (Voice)",
   "count": 2
  }
 ]
};
