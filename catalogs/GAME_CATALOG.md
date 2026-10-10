# 🎮 MiTi — Danh mục game

**86 game có file prompt thật.** Mỗi dòng một game: mục tiêu học tập lấy theo cụm kiến thức, điều khiển là mã gesture cụ thể (không dùng MIXED), link prompt trỏ đúng file. Mạch Tiếng Anh chia theo band Cambridge YLE (Starters · Movers · Flyers), cột `lop` chỉ còn là chú giải SGK.

Nguồn dữ liệu: `tools/data/games.mjs` + `tools/data/yle.mjs`. Chạy `node tools/build.mjs` để dựng lại catalog, prompt và dashboard.

## Toán lớp 4 (41)

| ID | Tên game | Mục tiêu | Nhiệm vụ | Điều khiển | Prompt |
|---|---|---|---|---|---|
| L4-01 | Đường Đua Hàng Số | Số tự nhiên đến 100000 và 1000000; giá trị theo hàng; viết dưới dạng tổng các hàng; số có chữ số 0 ở hàng trung gian | Chỉ ngón tay chọn làn chứa số đúng theo yêu cầu về hàng và giá trị. | `POINT` | [Mở prompt](../prompts/01-toan4/L4-01-number-dash.md) |
| L4-02 | Núi Hàng Triệu | So sánh hai số nhiều chữ số; sắp xếp 4 số theo thứ tự từ bé đến lớn và ngược lại; số lớn nhất có n chữ số | Vuốt để đổi thứ tự các toa xe sao cho dãy số tăng dần hoặc giảm dần. | `SWIPE` | [Mở prompt](../prompts/01-toan4/L4-02-million-mountain.md) |
| L4-03 | Ném Vòng Làm Tròn | Làm tròn đến hàng chục, trăm, nghìn, chục nghìn, trăm nghìn; ước lượng tổng hiệu bằng cách làm tròn trước | Đấm vào thẻ số đã được làm tròn đúng hàng yêu cầu. | `PUNCH` | [Mở prompt](../prompts/01-toan4/L4-03-rounding-hoops.md) |
| L4-04 | Vũ Điệu Chẵn Lẻ | Nhận biết số chẵn số lẻ qua chữ số tận cùng; dãy số chẵn liên tiếp; tổng hiệu tính chẵn lẻ | Nghiêng người bước sang vùng chẵn hoặc vùng lẻ theo thẻ số hiện trên đầu. | `STEP` | [Mở prompt](../prompts/01-toan4/L4-04-even-odd-dance.md) |
| L4-05 | Nhà Máy Khối Lượng | Tấn, tạ, kg, g; đổi đơn vị; so sánh khối lượng; tính tổng khối lượng nhiều vật | Nắm và kéo kiện hàng thả đúng toa ghi đơn vị tương ứng. | `GRAB` | [Mở prompt](../prompts/01-toan4/L4-05-weight-factory.md) |
| L4-06 | Xưởng Diện Tích | Cm², dm², m²; đếm ô vuông để tính diện tích; diện tích hình chữ nhật, vuông | Khom hai tay để căng một hình chữ nhật có đúng số ô vuông yêu cầu. | `TWO_HAND_STRETCH` | [Mở prompt](../prompts/01-toan4/L4-06-area-builder.md) |
| L4-07 | Cỗ Máy Thời Gian | Đọc giờ trên đồng hồ; phút và giây; thế kỉ; khoảng thời gian giữa hai mốc; đổi ngày giờ | Vặn kim bằng hai tay rồi chỉ vào mốc thời gian đúng với đề bài. | `POINT` + `TWO_HAND_STRETCH` | [Mở prompt](../prompts/01-toan4/L4-07-time-machine.md) |
| L4-08 | Anh Hùng Góc | Góc nhọn, vuông, tù, bẹt; đỉnh, cạnh; đo góc bằng thước nửa tròn; góc ở đỉnh chung | Dùng hai cánh tay tạo thành hai cạnh góc có số đo đúng yêu cầu và giữ trong 2 giây. | `ANGLE_POSE` | [Mở prompt](../prompts/01-toan4/L4-08-angle-hero.md) |
| L4-09 | Kiến Trúc Sư Laser | Hai đường thẳng vuông góc, song song; kẻ đường vuông góc; nhận diện trong thực tế | Kéo giãn hai tay để chỉnh hai tia laser vuông góc hoặc song song theo nhiệm vụ. | `TWO_HAND_STRETCH` | [Mở prompt](../prompts/01-toan4/L4-09-laser-architect.md) |
| L4-10 | Đấm Bốc Toán | Cộng trừ số có đến 6 chữ số; thành phần và giá trị biểu thức; tính giá trị biểu thức có ngoặc | Đấm trúng thẻ chứa kết quả đúng của biểu thức. | `PUNCH` | [Mở prompt](../prompts/01-toan4/L4-10-math-boxing.md) |
| L4-11 | Tên Lửa Phép Nhân | Bảng cửu chương 2–9; nhân số có 2–3 chữ số với số có 1 chữ số; nhân nhẩm với 11; nhân với 10 100 1000 | Đấm vào bảng phóng mang kết quả nhân đúng để đẩy tên lửa lên. | `PUNCH` | [Mở prompt](../prompts/01-toan4/L4-11-multiplication-rocket.md) |
| L4-12 | Băng Chuyền Phép Chia | Chia số có 2–3 chữ số cho 1–2 chữ số; số chia hết cho 2 3 5 9; chia nhẩm; chia hết và còn dư | Nắm và thả số vật vào đúng số nhóm, phần còn lại rơi vào hộp số dư. | `GRAB` | [Mở prompt](../prompts/01-toan4/L4-12-division-conveyor.md) |
| L4-13 | Phòng Thí Nghiệm Cân Bằng | Tính chất giao hoán kết hợp; biểu thức có ngoặc; giá trị của biểu thức chữ; hai phép tính tương đương | Kéo các thẻ số và dấu phép tính đặt lên đĩa để hai vế bằng nhau. | `GRAB` + `POINT` | [Mở prompt](../prompts/01-toan4/L4-13-balance-lab.md) |
| L4-14 | Tuyến Giao Hàng | Bài toán rút về đơn vị; bài toán tìm hai số khi biết tổng và tỉ; tổng hiệu; các bước giải | Chỉ tay chọn lần lượt trạm và phép tính đúng để hoàn thành lộ trình. | `POINT` | [Mở prompt](../prompts/01-toan4/L4-14-delivery-route.md) |
| L4-15 | Săn Dữ Liệu | Dãy số liệu; bảng thống kê; số trung bình cộng; tìm lớn nhất nhỏ nhất trong bảng | Nắm giữ đúng các thẻ số liệu thỏa mãn câu hỏi và né thẻ nhiễu. | `GRAB` | [Mở prompt](../prompts/01-toan4/L4-15-data-catch.md) |
| L4-16 | Xây Biểu Đồ Cột | Đọc biểu đồ cột; biểu đồ cột đôi; tạo cột theo số liệu; câu hỏi so sánh trên biểu đồ | Kéo dần các cột lên đúng chiều cao tương ứng số liệu, bám vào lưới ô. | `DRAG` | [Mở prompt](../prompts/01-toan4/L4-16-bar-builder.md) |
| L4-17 | Chợ Tranh Toán | Biểu đồ tranh; mỗi hình đại diện mấy đơn vị; đọc và xử lí số liệu trên biểu đồ tranh | Nắm món hàng theo số lượng đọc được từ biểu đồ tranh và trả lại tiền thừa. | `GRAB` | [Mở prompt](../prompts/01-toan4/L4-17-picture-market.md) |
| L4-18 | Phòng Thí Nghiệm Xác Suất | Chắc chắn, có thể, không thể; khả năng xảy ra của sự kiện rút bóng, quay thẻ, tung đồng xu | Chỉ tay thả sự kiện vào ống CHẮC CHẮN, CÓ THỂ hoặc KHÔNG THỂ. | `POINT` | [Mở prompt](../prompts/01-toan4/L4-18-chance-lab.md) |
| L4-19 | Pizza Phân Số | Khái niệm phân số; tử số mẫu số; phân số lớn hơn 1 bé hơn 1 bằng 1; đọc viết phân số; biểu diễn trên hình | Chỉ tay cắt và chọn đúng số phần tương ứng với phân số đề bài. | `POINT` | [Mở prompt](../prompts/01-toan4/L4-19-fraction-pizza.md) |
| L4-20 | Gương Phân Số | Rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị | Kéo hai thanh phân số chồng lên nhau để chứng minh cùng một giá trị. | `DRAG` | [Mở prompt](../prompts/01-toan4/L4-20-fraction-mirror.md) |
| L4-21 | Ninja Phân Số | Rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị | Vuốt chém quả bong bóng chứa phân số đã rút gọn đến tối giản. | `SWIPE` | [Mở prompt](../prompts/01-toan4/L4-21-fraction-ninja.md) |
| L4-22 | Nhà Máy Quy Đồng | Quy đồng mẫu số hai phân số; mẫu số chung; so sánh phân số khác mẫu | Kéo hệ số nhân vào cả tử và mẫu của hai phân số để ra cùng mẫu số. | `DRAG` | [Mở prompt](../prompts/01-toan4/L4-22-common-denominator-factory.md) |
| L4-23 | Đua Phân Số | Rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị | Vuốt sang phía phân số lớn hơn hoặc bé hơn theo yêu cầu từng lượt. | `SWIPE` | [Mở prompt](../prompts/01-toan4/L4-23-fraction-race.md) |
| L4-24 | Hợp Nhất Phân Số | Cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số | Nắm các thanh phân số cùng mẫu ghép lại thành thanh kết quả. | `GRAB` | [Mở prompt](../prompts/01-toan4/L4-24-fraction-fusion.md) |
| L4-25 | Lò Phản Ứng Phân Số | Cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số | Chỉ tay chọn đáp án là hiệu của hai phân số cùng mẫu để khởi động lò. | `POINT` | [Mở prompt](../prompts/01-toan4/L4-25-fraction-reactor.md) |
| L4-26 | Chia Kho Báu | Tìm phân số của một số; chia một hình thành số phần bằng nhau rồi lấy mấy phần | Nắm từng phần vàng thả vào rương sao cho đúng phân số của số lượng. | `GRAB` | [Mở prompt](../prompts/01-toan4/L4-26-treasure-split.md) |
| L4-27 | Cứu Hộ Tỉ Số | Tỉ số; bài toán tìm hai số khi biết tổng và tỉ số; hiệu và tỉ số | Chỉ và kéo các đoạn sơ đồ đúng tỉ số, tính ra số cần tìm để giải cứu. | `POINT` + `DRAG` | [Mở prompt](../prompts/01-toan4/L4-27-ratio-rescue.md) |
| L4-28 | Nhà Thám Hiểm Bản Đồ | Tỉ lệ bản đồ; độ dài thật trên bản đồ; đọc phương hướng và khoảng cách | Vuốt chọn con đường có độ dài thực đúng với khoảng cách trên bản đồ. | `SWIPE` | [Mở prompt](../prompts/01-toan4/L4-28-map-explorer.md) |
| L4-29 | Kéo Hình Bình Hành | Đặc điểm hình bình hành; diện tích đáy × chiều cao; chu vi | Kéo mảnh tam giác của hình bình hành ghép lại thành chữ nhật cùng diện tích. | `DRAG` | [Mở prompt](../prompts/01-toan4/L4-29-parallelogram-pull.md) |
| L4-30 | Xây Hình Thoi | Đặc điểm hình thoi; hai đường chéo vuông góc; diện tích tích hai đường chéo chia 2 | Nắm và xoay hai thanh chéo vuông góc tại trung điểm để tạo hình thoi đúng diện tích. | `GRAB` + `DRAG` | [Mở prompt](../prompts/01-toan4/L4-30-diamond-builder.md) |
| L4-31 | Bứt Tốc Tổng Hợp | Ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4 | Vuốt né chướng ngại mang đáp án sai, vượt qua cổng mang đáp án đúng. | `SWIPE` | [Mở prompt](../prompts/01-toan4/L4-31-mixed-sprint.md) |
| L4-32 | Đấu Trường Hình Học | Ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4 | Bước nghiêng người vào vòm cổng chứa khẳng định đúng về góc, đường, diện tích. | `STEP` | [Mở prompt](../prompts/01-toan4/L4-32-geometry-arena.md) |
| L4-33 | Đấu Trường Phân Số | Cộng trừ hai phân số cùng mẫu số; hỗn số; phần nguyên phần phân số | Nắm mảnh phân số tạo thành kết quả đúng và né mảnh gây sai mẫu số. | `GRAB` | [Mở prompt](../prompts/01-toan4/L4-33-fraction-arena.md) |
| L4-34 | Đấu Trường Dữ Liệu | Dãy số liệu; bảng thống kê; số trung bình cộng; tìm lớn nhất nhỏ nhất trong bảng | Chỉ tay vào giá trị trả lời cho câu hỏi đọc bảng, biểu đồ trong thời gian giới hạn. | `POINT` | [Mở prompt](../prompts/01-toan4/L4-34-data-arena.md) |
| L4-35 | Đại Đấu Trường Toán | Ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4 | Đấm thẻ đáp án đúng ở mỗi cửa ải để hạ guardian của từng chủ đề. | `PUNCH` | [Mở prompt](../prompts/01-toan4/L4-35-grand-math-arena.md) |
| L4-36 | Lò Rèn Hàng Số | Số tự nhiên đến 100000 và 1000000; giá trị theo hàng; viết dưới dạng tổng các hàng; số có chữ số 0 ở hàng trung gian | Chỉ ngón tay chọn khuôn hàng (chục nghìn, trăm nghìn…) chứa chữ số đúng yêu cầu. | `POINT` | [Mở prompt](../prompts/01-toan4/L4-36-place-value-forge.md) |
| L4-37 | Chợ Phân Số | Tìm phân số của một số; chia một hình thành số phần bằng nhau rồi lấy mấy phần | Nắm phần hàng đúng phân số người mua yêu cầu rồi cân và trả tiền thừa. | `GRAB` | [Mở prompt](../prompts/01-toan4/L4-37-fraction-market.md) |
| L4-38 | Giải Cứu Góc | Góc nhọn, vuông, tù, bẹt; đỉnh, cạnh; đo góc bằng thước nửa tròn; góc ở đỉnh chung | Chỉ tay tới nhân vật đang cầm góc đúng loại (nhọn, vuông, tù) và số đo đề bài. | `POINT` | [Mở prompt](../prompts/01-toan4/L4-38-angle-rescue.md) |
| L4-39 | Thám Tử Dữ Liệu | Đọc biểu đồ cột; biểu đồ cột đôi; tạo cột theo số liệu; câu hỏi so sánh trên biểu đồ | Chỉ vào bằng chứng trong bảng hoặc biểu đồ để trả lời từng nghi vấn. | `POINT` | [Mở prompt](../prompts/01-toan4/L4-39-data-detective.md) |
| L4-40 | Phòng Boss Toán | Trận boss tổng hợp: 3 giai đoạn tăng độ khó với kiến thức đã học trong chương | Đấm chuỗi đáp án đúng qua ba giai đoạn, mỗi giai đoạn được một lần dùng gợi ý. | `PUNCH` | [Mở prompt](../prompts/01-toan4/L4-40-math-boss-lab.md) |
| L4-41 | Đập Chuột Thò Đầu | Cộng trừ số có đến 6 chữ số; thành phần và giá trị biểu thức; tính giá trị biểu thức có ngoặc | Vụt tay (cầm cuộn báo/vợt đập ruồi) đập trúng con chuột mang đáp án đúng của phép tính. | `SWAT` | [Mở prompt](../prompts/01-toan4/L4-41-whack-a-mole.md) |

## Toán lớp 5 (15)

| ID | Tên game | Mục tiêu | Nhiệm vụ | Điều khiển | Prompt |
|---|---|---|---|---|---|
| T5-01 | Nhiệm Vụ Phép Tính | Cộng trừ số có đến 6 chữ số; thành phần và giá trị biểu thức; tính giá trị biểu thức có ngoặc | Đấm vào bảng khoá mang giá trị đúng của biểu thức, tính theo thứ tự ưu tiên. | `PUNCH` | [Mở prompt](../prompts/02-toan5/T5-01-multi-operation-quest.md) |
| T5-02 | Đường Đua Số Thập Phân | Khái niệm số thập phân; hàng phần mười phần trăm phần nghìn; đọc viết số thập phân; so sánh; làm tròn | Vuốt sang làn chứa số thập phân lớn hơn hoặc bé hơn theo yêu cầu. | `SWIPE` | [Mở prompt](../prompts/02-toan5/T5-02-decimal-dash.md) |
| T5-03 | Ghép Phân Số – Thập Phân – Phần Trăm | Chuyển đổi phân số thập phân – số thập phân – phần trăm; so sánh ba dạng; xếp cặp bằng giá trị | Kéo thẻ ở hai cột còn lại ghép vào cùng một giá trị với thẻ neo. | `DRAG` | [Mở prompt](../prompts/02-toan5/T5-03-fraction-decimal-percentage-memory.md) |
| T5-04 | Cửa Hàng Phần Trăm | Tỉ số phần trăm; đọc viết phần trăm; tính phần trăm của một số; bài toán mua bán giảm giá lãi suất đơn giản | Nắm món hàng có giá trị giảm hoặc giá trả đúng tỉ lệ phần trăm đề bài. | `GRAB` + `POINT` | [Mở prompt](../prompts/02-toan5/T5-04-percentage-shop.md) |
| T5-05 | Xây Kho Thể Tích | Xăng-ti-mét khối, mét khối; thể tích hình hộp chữ nhật và lập phương; đếm khối lập phương 1cm³ | Kéo từng lớp khối lập phương 1cm dựng lên đúng chiều dài rộng cao yêu cầu. | `DRAG` | [Mở prompt](../prompts/02-toan5/T5-05-volume-builder.md) |
| T5-06 | Đầu Bếp Tỉ Số | Tỉ số nguyên liệu trong công thức nấu ăn; gấp hoặc giảm khẩu phần; bài toán liên quan đến rút về đơn vị | Kéo nguyên liệu vào nồi sao cho các nguyên liệu giữ đúng tỉ lệ công thức. | `DRAG` | [Mở prompt](../prompts/02-toan5/t5-06.md) |
| T5-07 | Đua Chuyển Động | Quãng đường vận tốc thời gian; đơn vị đo thời gian; hai chuyển động ngược chiều cùng khởi hành | Chỉ tay chọn dữ kiện vận tốc và thời gian, dự đoán đúng điểm gặp nhau. | `POINT` | [Mở prompt](../prompts/02-toan5/t5-07.md) |
| T5-08 | Phòng Tập Hình Học | Chu vi diện tích các hình đã học; hình tròn tâm bán kính đường kính; thể tích hình hộp | Bước sang trạm mang công thức đúng để tính chu vi hoặc diện tích được hỏi. | `STEP` | [Mở prompt](../prompts/02-toan5/t5-08.md) |
| T5-09 | Cân Bằng Số Thập Phân | So sánh và sắp thứ tự số thập phân; hai số thập phân bằng nhau; cân bằng hai vế thập phân | Kéo giãn hai tay nâng hai số: tay cao hơn là số lớn hơn, cân khi hai số bằng nhau. | `TWO_HAND_BALANCE` | [Mở prompt](../prompts/02-toan5/t5-09.md) |
| T5-10 | Đại Nhiệm Vụ Toán | Ôn tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5 | Đấm phá phong ấn bằng đáp án đúng, chỉ tay chọn chiến lược giải trước khi tính. | `PUNCH` + `POINT` | [Mở prompt](../prompts/02-toan5/t5-10.md) |
| T5-11 | Cửa Hàng Thập Phân | Khái niệm số thập phân; hàng phần mười phần trăm phần nghìn; đọc viết số thập phân; so sánh; làm tròn | Chỉ món hàng cần mua rồi kéo các đồng tiền và hóa đơn khớp số tiền thập phân. | `POINT` + `DRAG` | [Mở prompt](../prompts/02-toan5/T5-11-decimal-shop.md) |
| T5-12 | Phòng Thí Nghiệm Phần Trăm | Tỉ số phần trăm; đọc viết phần trăm; tính phần trăm của một số; bài toán mua bán giảm giá lãi suất đơn giản | Chỉ và kéo số ô tô màu đúng số phần trăm, sau đó đổi sang phân số và số thập phân. | `POINT` + `DRAG` | [Mở prompt](../prompts/02-toan5/T5-12-percentage-lab.md) |
| T5-13 | Kho Báu Thể Tích | Xăng-ti-mét khối, mét khối; thể tích hình hộp chữ nhật và lập phương; đếm khối lập phương 1cm³ | Chỉ vào kích thước đo được rồi kéo khối lập phương kiểm chứng thể tích trước khi mở kho. | `POINT` + `DRAG` | [Mở prompt](../prompts/02-toan5/T5-13-volume-vault.md) |
| T5-14 | Đua Bài Toán Chuyển Động | Quãng đường vận tốc thời gian; đơn vị đo thời gian; hai chuyển động ngược chiều cùng khởi hành | Chỉ dữ kiện đúng trên trục thời gian để tính vận tốc hoặc quãng đường còn thiếu. | `POINT` | [Mở prompt](../prompts/02-toan5/T5-14-motion-word-problem.md) |
| T5-15 | Đấu Trường Chiến Thuật Toán | Ôn tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5 | Nắm thẻ chiến lược (rút về đơn vị, tỉ số, sơ đồ đoạn thẳng) áp vào đề bài rồi chọn đáp án. | `GRAB` + `POINT` | [Mở prompt](../prompts/02-toan5/T5-15-math-strategy-arena.md) |

## Tiếng Anh · Pre A1 Starters (Cambridge) (10)

| ID | Tên game | Mục tiêu | Nhiệm vụ | Điều khiển | Prompt |
|---|---|---|---|---|---|
| ST-01 | Nhiệm Vụ Từ Vựng | Từ vựng Tiếng Anh: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng | Vuốt chém tấm bảng mang từ tiếng Anh đúng với nghĩa hoặc tranh gợi ý. | `SWIPE` | [Mở prompt](../prompts/03-english-starters/ST-01-vocab-quest.md) |
| ST-02 | Chọn Đáp Án Nghe | Nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề | Nghe và chỉ ngón tay vào tranh hoặc từ đúng với đoạn nghe. | `POINT` | [Mở prompt](../prompts/03-english-starters/ST-02-listen-pick.md) |
| ST-03 | Ghép Tranh – Từ | Nối tranh với từ; kéo thả từ vào chỗ trống theo tranh; nhận diện từ qua hình | Kéo thẻ từ tiếng Anh thả đúng ô tranh tương ứng. | `DRAG` | [Mở prompt](../prompts/03-english-starters/ST-03-picture-word-match.md) |
| ST-04 | Ngôi Sao Chính Tả | Điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5 | Đấm vào ngôi sao chứa cách viết đúng chính tả của từ được đọc. | `PUNCH` | [Mở prompt](../prompts/03-english-starters/ST-04-spelling-star.md) |
| ST-05 | Đua Xếp Câu | Sắp xếp các từ đã cho thành câu có nghĩa; điền động từ to be a/an the | Kéo các toa từ vào đúng trật tự để thành câu hoàn chỉnh có nghĩa. | `DRAG` | [Mở prompt](../prompts/03-english-starters/ST-05-sentence-race.md) |
| ST-06 | Trí Nhớ Từ Vựng | Lật thẻ ghép cặp từ với tranh/nghĩa; bộ 8-12 cặp mỗi chủ đề | Chỉ tay lật thẻ để ghép đúng cặp từ tiếng Anh với tranh nghĩa. | `POINT` | [Mở prompt](../prompts/03-english-starters/ST-06-word-memory.md) |
| ST-07 | Bóng Âm | Âm và mẫu chữ thường gặp: sh ch th ph gh ea ee oo ai ay; chọn từ chứa âm mục tiêu | Vuốt chém các quả bóng chứa từ có âm hoặc mẫu chữ mục tiêu. | `SWIPE` | [Mở prompt](../prompts/03-english-starters/ST-07-shadow-phonic.md) |
| ST-08 | Đập Từ | Từ vựng Tiếng Anh: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng | Đấm trúng bong bóng chứa từ đúng với nghĩa tiếng Việt hiện trên bảng. | `PUNCH` | [Mở prompt](../prompts/03-english-starters/ST-08-punch-word.md) |
| ST-09 | Nghe Và Phân Loại | Nghe rồi phân loại từ vào 3 nhóm chủ đề; nghe và chọn từ sai khác | Nghe một từ, chỉ vào rổ chủ đề đúng rồi kéo thẻ từ vào rổ đó. | `POINT` + `DRAG` | [Mở prompt](../prompts/03-english-starters/ST-09-listen-sort.md) |
| ST-10 | Bản Đồ Phiêu Lưu Tiếng Anh | Bản đồ 5 đảo: từ vựng, nghe, chính tả, câu, phát âm; mỗi đảo 3 câu | Chỉ tay mở khoá từng bến đảo, hoàn thành ba câu trên đảo để lấy huy hiệu. | `POINT` | [Mở prompt](../prompts/03-english-starters/ST-10-skill-map.md) |

## Tiếng Anh · A1 Movers (Cambridge) (10)

| ID | Tên game | Mục tiêu | Nhiệm vụ | Điều khiển | Prompt |
|---|---|---|---|---|---|
| MV-01 | Thợ Săn Từ | Từ vựng Tiếng Anh: Animals, School, Family, Jobs, Colours, Hobbies; nghĩa tiếng Việt tương ứng | Vuốt chém bụi cây chứa từ đúng với nghĩa và ngữ cảnh câu gợi ý. | `SWIPE` | [Mở prompt](../prompts/04-english-movers/MV-01-word-hunter.md) |
| MV-02 | Trùm Nghe Hiểu | Nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề | Nghe và chỉ vào đáp án đúng trong ba lựa chọn, mỗi lượt được nghe lại tối đa ba lần. | `POINT` | [Mở prompt](../prompts/04-english-movers/MV-02-listen-master.md) |
| MV-03 | Nhiệm Vụ Điền Chữ | Điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5 | Chỉ vào chữ cái còn thiếu ở đúng vị trí trong từ. | `POINT` | [Mở prompt](../prompts/04-english-movers/MV-03-fill-letter.md) |
| MV-04 | Xây Từ | Bảng chữ cái bị xáo trộn: ghép thành từ đúng; mỗi từ có nghĩa gợi ý | Kéo từng chữ cái thả vào ô trống theo đúng thứ tự của từ. | `DRAG` | [Mở prompt](../prompts/04-english-movers/MV-04-build-word.md) |
| MV-05 | Mê Cung Câu | Hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any | Kéo thẻ ngữ pháp đúng thả vào chỗ trống để mở lối đi tiếp. | `DRAG` | [Mở prompt](../prompts/04-english-movers/MV-05-maze-sentence.md) |
| MV-06 | Cổng Ngữ Pháp | Hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any | Nghiêng người bước vào cổng chứa dạng động từ đúng với thì của câu. | `STEP` | [Mở prompt](../prompts/04-english-movers/MV-06-grammar-gate.md) |
| MV-07 | Xây Câu Hỏi | What is this How much Where is Who are you How old và câu trả lời mẫu | Chọn từ để hỏi trước rồi kéo các từ còn lại về đúng trật tự câu hỏi. | `POINT` + `DRAG` | [Mở prompt](../prompts/04-english-movers/MV-07-build-question.md) |
| MV-08 | Bộ Ba Trí Nhớ | Ghép bộ ba từ tranh nghĩa tiếng Việt; 8 bộ mỗi lượt | Lật ba thẻ cùng một bộ bằng ngón tay để ghép thành bộ ba đúng. | `POINT` | [Mở prompt](../prompts/04-english-movers/MV-08-triple-memory.md) |
| MV-09 | Pháo Đài Chính Tả | Điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5 | Đấm quả đạn chứa từ viết đúng để bắn hạ loạt đạn sai. | `PUNCH` | [Mở prompt](../prompts/04-english-movers/MV-09-spelling-fort.md) |
| MV-10 | Đảo Ôn Tập | Ôn tổng hợp nghe đọc viết nói ngữ pháp từ vựng tiếng Anh | Chỉ tay chọn từng câu hỏi trên đảo, đáp án đúng mở đường sang đảo kế tiếp. | `POINT` | [Mở prompt](../prompts/04-english-movers/MV-10-revision-island.md) |

## Tiếng Anh · A2 Flyers (Cambridge) (10)

| ID | Tên game | Mục tiêu | Nhiệm vụ | Điều khiển | Prompt |
|---|---|---|---|---|---|
| FY-01 | Hẻm Núi Điền Từ | Đoạn văn có 5-8 chỗ trống chọn từ trong ngân hàng từ; dựa vào ngữ cảnh suy ra từ | Kéo từ trong ngân hàng từ thả vào chỗ trống hợp ngữ cảnh. | `DRAG` | [Mở prompt](../prompts/05-english-flyers/FY-01-canyon-cloze.md) |
| FY-02 | Xây Cụm Từ | Ghép từ thành cụm a pair of a glass of how many và đặt câu với cụm | Kéo các mảnh từ ghép thành cụm hoàn chỉnh rồi đặt câu với cụm đó. | `DRAG` | [Mở prompt](../prompts/05-english-flyers/FY-02-phrase-garden.md) |
| FY-03 | Tuyến Đường Nói | Nói câu ngắn theo tình huống qua Web Speech recognition; khung câu cho sẵn | Nói to câu trả lời theo khung câu; micro nhận giọng và chấm từng từ. | `VOICE` | [Mở prompt](../prompts/05-english-flyers/FY-03-speaking-route.md) |
| FY-04 | Nhiệm Vụ Nói | Nói câu ngắn theo tình huống qua Web Speech recognition; khung câu cho sẵn | Nghe tình huống và nói câu trả lời ngắn; hệ thống hiện transcript và chấm phát âm. | `VOICE` | [Mở prompt](../prompts/05-english-flyers/FY-04-speaking-mission.md) |
| FY-05 | Thám Tử Đọc Hiểu | Đoạn văn 60-90 từ lớp 5: ý chính, chi tiết, trình tự, suy luận đơn giản; tìm bằng chứng gạch chân | Đọc đoạn văn và chỉ tay gạch chân đúng câu chứa bằng chứng cho nghi vấn. | `POINT` | [Mở prompt](../prompts/05-english-flyers/FY-05-reading-detective.md) |
| FY-06 | Xây Ngữ Pháp | Hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any | Chỉ ra chỗ sai trong câu rồi kéo thẻ sửa đúng để cây cầu mở màn tiếp. | `POINT` + `DRAG` | [Mở prompt](../prompts/05-english-flyers/FY-06-grammar-workshop.md) |
| FY-07 | Xây Câu Chuyện Tranh | Sắp xếp 3-5 tranh theo trình tự; chọn câu phù hợp với từng tranh | Chỉ và kéo các tranh theo đúng trình tự, rồi ghép câu mô tả cho từng tranh. | `POINT` + `DRAG` | [Mở prompt](../prompts/05-english-flyers/FY-07-story-studio.md) |
| FY-08 | Đường Đua Nghe | Nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề | Nghe rồi nghiêng người bước sang làn chứa từ hoặc số đúng. | `STEP` | [Mở prompt](../prompts/05-english-flyers/FY-08-listen-race.md) |
| FY-09 | Phòng Thí Nghiệm Tạo Từ | Ghép từ thành cụm a pair of a glass of how many và đặt câu với cụm | Chỉ gốc từ rồi kéo mảnh tiền tố hoặc hậu tố thả vào để biến đổi từ loại. | `POINT` + `DRAG` | [Mở prompt](../prompts/05-english-flyers/FY-09-word-lab.md) |
| FY-10 | Cúp Thử Thách Tiếng Anh | Ôn tổng hợp nghe đọc viết nói ngữ pháp từ vựng tiếng Anh | Chỉ tay trả lời ở mỗi trạm, đủ điều kiện thì trạm sau mở khoá độ khó cao hơn. | `POINT` | [Mở prompt](../prompts/05-english-flyers/FY-10-english-cup.md) |

## Gesture được dùng

| Mã | Tên tiếng Việt | Số game |
|---|---|---|
| `POINT` | Chỉ ngón tay trỏ (Point) | 34 |
| `SWIPE` | Vuốt / chém (Swipe) | 9 |
| `PUNCH` | Vung tay đấm (Punch) | 10 |
| `GRAB` | Nắm và thả (Grab / Catch) | 12 |
| `DRAG` | Kéo thả (Drag) | 23 |
| `STEP` | Nghiêng người / bước sang vùng (Body tilt) | 5 |
| `TWO_HAND_STRETCH` | Khom hai tay (Two-hand stretch) | 3 |
| `TWO_HAND_BALANCE` | Cân bằng hai tay (Two-hand balance) | 1 |
| `ANGLE_POSE` | Tạo góc bằng cánh tay (Angle pose) | 1 |
| `VOICE` | Nói (Voice) | 2 |
| `SWAT` | Đập / vụt bằng vật cầm tay (Swat) | 1 |
