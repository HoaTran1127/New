# E4-11 — Xây Câu Chuyện Tranh

> Tiếng Anh lớp 4 · Điều khiển: Chỉ ngón tay trỏ (Point) · Cụm kiến thức: ke-chuyen
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "XÂY CÂU CHUYỆN TRANH" cho học sinh Việt Nam lớp 4, môn Tiếng Anh.

1. Ý TƯỞNG
- Bối cảnh: Studio kể chuyện với các khung tranh rời.
- Việc của học sinh mỗi lượt: Chỉ và kéo các tranh theo đúng trình tự, rồi ghép câu mô tả cho từng tranh.
- Điều khiển: Chỉ ngón tay trỏ (Point). MediaPipe Tasks Vision HandLandmarker, đầu ngón trỏ landmark 8 làm con trỏ. Biên độ động tác: Ngón trỏ đi bằng cả cẳng tay: đáp án đặt ở bốn góc khác nhau của khung hình nên mỗi lượt là một lần duỗi khuỷu đổi hướng, không phải nhấc ngón ngay trước ngực.
- Không có camera thì chạm hoặc click vào đáp án thay cho con trỏ ngón tay, giữ 400ms để chốt như khi giữ tay.
- Mascot: **Khung Tranh** — biết kể chuyện. Ba câu thoại: khen "Đúng trình tự rồi!" · đỡ khi sai "Tranh này ở sau nhé" · hô mở đầu "Chuyện bắt đầu!".
- Bảng màu riêng: `--miti-1: #FFC93C` (vật thể AR chính), `--miti-2: #D6001C` (particle và viền hit), `--miti-3: #FF7013` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: bốn khung tranh sáng thành một dải phim và mascot ngồi xem gật gù. Đạo cụ AR neo vào người chơi: máy quay mini neo vai trái, lia theo tay em kéo.
- Môn thể thao của game: **Bắn cung** — động tác đặc trưng "Giương tay chỉ đích", hiệu lệnh "Ngắm — phóng!", lời hay khi bạn sai "Bạn ngắm chuẩn quá!", duỗi cơ cuối buổi "Duỗi vai và cổ tay".
- Trò chơi dân gian dẫn dắt: **Chi chi chành chành** — cách chơi "Ngón trỏ chạm ô rồi rút theo nhịp", lời hô "Chi chi chành chành", đồ dùng AR "vạch phấn".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: sắp xếp 3-5 tranh theo trình tự; chọn câu phù hợp với từng tranh.
- Mạch kiến thức: **Đọc và viết** — nhãn HUD "Kể chuyện tranh" · **Tuần 20–29 · Học kì II**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Sắp xếp được 3 đến 5 tranh theo trình tự và kể lại bằng câu đơn giản có dấu chấm câu."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "First, Next, Then, Last."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "kể thiếu thứ tự các mệnh đề".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): kể thiếu thứ tự các mệnh đề; đặt câu thiếu dấu chấm; dùng nhầm động từ quá khứ so với tranh.
- Phạm vi: chỉ dùng nội dung Tiếng Anh lớp 4 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Bắn cung — <n> động tác" · "Con học Kể chuyện tranh, <k> câu đúng trên <tổng>" · "Mẹo con mang về: First, Next, Then, Last." · "Việc 3 phút ở nhà: cả nhà cùng Giương tay chỉ đích rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Xây Câu Chuyện Tranh, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

3. RÀNG BUỘC CỐT LÕI (thiếu bất kỳ dòng nào là hỏng)
- 1 file HTML duy nhất: `<style>` và `<script>` nội tuyến; không Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài; chỉ được tải MediaPipe (CDN + model) và font có dự phòng.
- Camera mặc định TẮT, có nút bật/tắt không cần tải lại trang; chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU; trạng thái bằng tiếng Việt (Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi + nút Thử lại). Không upload ảnh/video, chỉ giữ landmark trong bộ nhớ, không thu thập dữ liệu cá nhân.
- MediaPipe Tasks Vision, import từ `@mediapipe/tasks-vision@1.0.1`; cấu hình `getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } })`, lật gương ngang cả khi hiển thị lẫn khi tính tọa độ; trình duyệt chặn camera thì báo một dòng tiếng Việt rồi vào thẳng chế độ không camera.
- Mọi tọa độ đi qua `toScreen(lx, ly)`; nền AR là chính khung hình camera với lớp phủ tối không vượt 0.45; vật thể có `z`, có bóng dưới chân và có ít nhất một vật ảo neo vào landmark cơ thể.
- Cử chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng + cooldown + ngưỡng tin cậy; hover không tính là đã chọn; giữ nguyên tư thế không được spam event và không bị trừ tim; confidence thấp thì không chốt đáp án.
- FALLBACK bắt buộc: chuột / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính; có nhãn "Chế độ không dùng camera"; mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.
- Không điểm số, không xếp hạng, không timer thi đua. Sai không phạt bằng cách biến mất kiến thức: dừng 2 giây và hiện lời giải đầy đủ bằng tiếng Việt, chỉ rõ chữ số / bước / từ cần sửa.
- Vận động thật: mỗi lượt một động tác rộng cả tay và thân, không nhấc ngón ngay trước ngực. Theo 5 bước: Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính, kèm Khởi động 60–90 giây và Hạ nhiệt 45–60 giây; một phiên ≤10 phút để vừa tiết 45 phút.
- Lớp 4 em: một em chơi, ba em chờ có việc thật (đếm nhịp, cổ vũ, theo dõi đáp án), luân phiên theo sĩ số M với thời gian chờ ≤20 giây và nhãn "đến lượt em"; thành tích ghi cho cả đội, không so cá nhân.
- Mọi học sinh dùng được: không chỉ báo hiệu bằng màu (kèm hình hoặc chữ), phụ đề tiếng Việt cho mọi âm thanh, chữ đề ≥28px desktop và ≥20px điện thoại, responsive dọc và ngang, nút Giảm hiệu ứng chuyển động, không nhấp nháy quá 3Hz, vùng chơi an toàn có thảm/cọc tiêu cảnh báo và nút "Chơi chậm lại" không bị trừ tim.
- Tab ẩn hoặc mất tiêu điểm là tự Pause, quay lại đếm 3-2-1. Máy yếu: nhận diện 1 lần mỗi 2–3 khung hình, particle dùng pool, tự giảm chi tiết khi FPS tụt.
- Mỗi lượt chỉ một ý, đề ≤16 từ. Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi và lời giải bằng TIẾNG VIỆT (học liệu tiếng Anh giữ nguyên tiếng Anh); không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trước mặt học sinh.
- Chữ ký MiTi: ô bo góc `#FFD84D` chứa chữ M màu `#07111F` + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; kèm dòng "MiTi • Học bằng chuyển động"; không xóa hay đổi tên ở chế độ không camera.
- Chỉ xuất toàn bộ file HTML hoàn chỉnh: không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không giải thích dài.

4. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }.
- Tối thiểu 60 mục, chia 3 mức độ (level 1/2/3), mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- Mỗi mục có từ hoặc câu tiếng Anh, gợi nghĩa tiếng Việt, phiên âm khi phù hợp, và audio bằng window.speechSynthesis; đáp án là chuỗi cố định.
- errorTag là mã máy của lỗi, lấy đúng một trong: thieu_thu_tu_menh_de, thieu_dau_cham, nham_dong_tu_qua_khu. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: đọc toàn bộ câu chuyện sau khi xếp đúng để ôn ngữ cảnh.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Sắp 3 tranh: (1) Lan ăn kem, (2) Lan mua kem, (3) Vỏ kem trên đất.", choices: ["2 – 1 – 3","1 – 2 – 3","3 – 2 – 1"], answer: "2 – 1 – 3", explanation: "Trình tự hợp lý: mua trước, ăn sau, rồi mới có vỏ kem.", errorTag: "thieu_thu_tu_menh_de", dang: "nhin", loiViet: "kể thiếu thứ tự các mệnh đề"
  id: "q2", level: 2, prompt: "Chọn câu cho tranh \"cậu bé đang đọc sách\".", choices: ["He is reading a book","He plays football","He can swim"], answer: "He is reading a book", explanation: "Tranh diễn tả hành động đang xảy ra nên dùng thì hiện tại tiếp diễn.", errorTag: "nham_dong_tu_qua_khu", dang: "nhin", loiViet: "dùng nhầm động từ quá khứ so với tranh"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Tiếng Anh lớp 4; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `ke-chuyen` — đổi cluster nếu đổi dạng bài.
- Gesture: `POINT+DRAG` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
