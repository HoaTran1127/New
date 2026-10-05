# ST-04 — Ngôi Sao Chính Tả

> Tiếng Anh lớp 4 · Band Cambridge **Pre A1 Starters** (Pre-A1) · Điều khiển: Vung tay đấm (Punch) · Cụm kiến thức: chinh-ta
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "NGÔI SAO CHÍNH TẢ" cho học sinh Việt Nam lớp 4, môn Tiếng Anh, chuẩn Pre A1 Starters (Pre-A1) của Cambridge.

1. Ý TƯỞNG
- Bối cảnh: Vòm sao, mỗi ngôi sao là một cách viết của từ.
- Việc của học sinh mỗi lượt: Đấm vào ngôi sao chứa cách viết đúng chính tả của từ được đọc.
- Điều khiển: Vung tay đấm (Punch). HandLandmarker: vị trí cổ tay (landmark 0) và mũi (landmark 15) để tính hướng đấm; độ gập các ngón để xác nhận nắm tay. Biên độ động tác: Đấm đổi tầm liên tục (trên vai – ngang ngực – dưới thắt lưng); cú đấm đi hết tay từ thế thủ trước ngực tới vật nằm sát mép khung.
- Không có camera thì click vào vật để mô phỏng cú đấm; rê chuột lên vật không được tính.
- Mascot: **Sao Mai** — lung linh, nhắc em đếm chữ. Ba câu thoại: khen "Đúng chữ rồi!" · đỡ khi sai "Thiếu một chữ cái kia" · hô mở đầu "Đếm sao nào!".
- Bảng màu riêng: `--miti-1: #FFEA00` (vật thể AR chính), `--miti-2: #0D1B2A` (particle và viền hit), `--miti-3: #6A0DAD` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: chòm sao nối thành đúng từ rồi một vệt sao băng vạch ngang trong hai giây. Đạo cụ AR neo vào người chơi: vương miện sao trên đầu em, thêm một sao mỗi chuỗi đúng.
- Môn thể thao của game: **Boxing** — động tác đặc trưng "Đấm về phía trước", hiệu lệnh "Một — hai!", lời hay khi bạn sai "Bạn ra đòn gọn!", duỗi cơ cuối buổi "Duỗi ngực và vai mở".
- Trò chơi dân gian dẫn dắt: **Ném còn** — cách chơi "Đẩy tay hất quả còn qua vòng", lời hô "Một hai ba, ném!", đồ dùng AR "vòng tròn".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5.
- Band Cambridge: **Pre A1 Starters** (Pre-A1) — từ nền tảng: danh từ số ít/số nhiều, this/that, There is/are, can, like + V-ing, hiện tại đơn, tính từ sở hữu.
- Trần từ vựng: chỉ dùng 541 từ thuộc Starters trở xuống, ưu tiên 27 từ của chủ đề động vật: animal, bee, bird, cat, chicken, cow, crocodile, dog, duck, elephant, fish, fly, frog, giraffe, goat, horse, lizard, monkey, mouse, pet, polar bear, sheep, snake, spider, tail, tiger, zebra. Cấm mọi từ lần đầu xuất hiện ở band cao hơn; từ SGK Việt Nam ngoài danh sách trên chỉ được dùng nếu đã học ở Tiếng Anh lớp 4.
- Trần ngữ pháp: chỉ dùng 8 cấu trúc của Starters — Hiện tại đơn với like / love / hate ("I like swimming. / She likes cats.") · can chỉ năng lực ("I can ride a bike. / Can you swim?") · There is / There are ("There is a book on the desk. / There are two chairs.") · this / that, these / those ("What's this? — It's a pen.") · Danh từ số ít – số nhiều ("one cat – three cats / one box – two boxes") · Tính từ sở hữu ("my, your, his, her, our, their + bag") · Câu hỏi What / Where / Who / How many ("Where is the dog? — It’s under the table.") · a / an và giới từ in / on / under ("an apple, a ball, in the box, under the chair").
- Mạch kiến thức: **Đọc và viết** — nhãn HUD "Chính tả" · **Tuần 5–14 · Học kì I**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Viết đúng chính tả các từ đã học; điền được chữ cái còn thiếu và sửa được lỗi trong từ."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Đọc chậm, đánh vần từng chữ cái."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "thiếu chữ cái giữa từ".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): thiếu chữ cái giữa từ; nhầm i với y; viết nhầm phụ âm đôi.
- Phạm vi: chỉ dùng nội dung Tiếng Anh lớp 4 đã học và trong đúng band Starters; cấm số hoặc từ vựng ngoài phạm vi trên.
- Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Boxing — <n> động tác" · "Con học Chính tả, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Đọc chậm, đánh vần từng chữ cái." · "Việc 3 phút ở nhà: cả nhà cùng Đấm về phía trước rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Ngôi Sao Chính Tả, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- Chia mức theo band: level 1 lấy từ và cấu trúc cơ bản nhất của Starters; level 3 vẫn nằm trong Starters, tăng độ khó bằng câu dài hơn và phương án gần nghĩa hơn, không tăng bằng từ ngoài band.
- errorTag là mã máy của lỗi, lấy đúng một trong: thieu_chu_cai, nham_v_i_y, double_consonant. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: đánh đỏ vị trí sai và hiện từ đúng kèm phiên âm.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Từ nào viết đúng nghĩa \"màu xanh lá\"?", choices: ["green","gren","grean"], answer: "green", explanation: "green có hai chữ e liền nhau; 'gren' thiếu một chữ e.", errorTag: "thieu_chu_cai", dang: "nhin", loiViet: "thiếu chữ cái giữa từ"
  id: "q2", level: 2, prompt: "Chọn cách viết đúng của \"quả táo\".", choices: ["apple","aple","aplle"], answer: "apple", explanation: "apple nhân đôi chữ p nhưng chỉ có một chữ l.", errorTag: "double_consonant", dang: "nhin", loiViet: "viết nhầm phụ âm đôi"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Tiếng Anh lớp 4 và band Starters (so lại từng từ tiếng Anh trong đề và phương án với danh sách 541 từ ở mục 2, từ nào ngoài danh sách thì thay bằng từ trong danh sách); câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `chinh-ta` — đổi cluster nếu đổi dạng bài.
- Band Cambridge: `ST` (Pre A1 Starters) — đổi band thì phải đổi cả thư mục prompt, `EXAMPLES_YLE` và dải từ trong `tools/data/yle.mjs`.
- Gesture: `PUNCH` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
