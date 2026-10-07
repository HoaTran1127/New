# ST-10 — Bản Đồ Phiêu Lưu Tiếng Anh

> Tiếng Anh lớp 4 · Band Cambridge **Pre A1 Starters** (Pre-A1) · Điều khiển: Chỉ ngón tay trỏ (Point) · Cụm kiến thức: dao-kynang
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "BẢN ĐỒ PHIÊU LƯU TIẾNG ANH" cho học sinh Việt Nam lớp 4, môn Tiếng Anh, chuẩn Pre A1 Starters (Pre-A1) của Cambridge.

ƯU TIÊN theo đúng thứ tự: (1) học sinh đạt mục tiêu học tập ở mục 2; (2) điều khiển AR ở mục 1 nhận diện được thật và fallback chuột chơi đủ 100%; (3) phần còn lại. File chật thì làm đơn giản chi tiết trang trí, không cắt mục 2 và mục 3.

1. Ý TƯỞNG
- Bối cảnh: Quần đảo năm đảo kỹ năng: từ vựng, nghe, chính tả, câu, phát âm.
- Việc của học sinh mỗi lượt: Chỉ tay mở khoá từng bến đảo, hoàn thành ba câu trên đảo để lấy huy hiệu.
- Điều khiển: Chỉ ngón tay trỏ (Point). MediaPipe Tasks Vision HandLandmarker, đầu ngón trỏ landmark 8 làm con trỏ. Biên độ động tác: Ngón trỏ đi bằng cả cẳng tay: đáp án đặt ở bốn góc khác nhau của khung hình nên mỗi lượt là một lần duỗi khuỷu đổi hướng, không phải nhấc ngón ngay trước ngực.
- Không có camera thì chạm hoặc click vào đáp án thay cho con trỏ ngón tay, giữ 400ms để chốt như khi giữ tay.
- Mascot **Đảo Con** (thích cắm cờ) — khen "Đảo mở rồi!", hô mở đầu "Neo xuống đảo!". Bảng màu: `--miti-1: #277DA1` (vật thể AR), `--miti-2: #FFD65C` (particle, viền hit), `--miti-3: #F05655` (HUD).
- Không khí giờ chơi (trang trí, được phép làm đơn giản): thể thao **Bắn cung** ("Giương tay chỉ đích", hạ nhiệt "Duỗi vai và cổ tay") · dân gian **Chi chi chành chành** (đồ dùng AR "vạch phấn") · khoảnh khắc chữ ký năm đảo lần lượt sáng đèn và một lá cờ cắm xuống đảo vừa hoàn thành · đạo cụ AR neo vào người chơi "bản đồ cuộn đeo lưng, mở ra khi em chỉ đảo".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: bản đồ 5 đảo: từ vựng, nghe, chính tả, câu, phát âm; mỗi đảo 3 câu.
- Band Cambridge: **Pre A1 Starters** (Pre-A1) — từ nền tảng: danh từ số ít/số nhiều, this/that, There is/are, can, like + V-ing, hiện tại đơn, tính từ sở hữu.
- Trần từ vựng: chỉ dùng 541 từ thuộc Starters trở xuống, ưu tiên 49 từ của chủ đề động vật, trường học: animal, bee, bird, cat, chicken, cow, crocodile, dog, duck, elephant, fish, fly, frog, giraffe, goat, horse, lizard, monkey, mouse, pet, …. Cấm mọi từ lần đầu xuất hiện ở band cao hơn; từ SGK Việt Nam ngoài danh sách trên chỉ được dùng nếu đã học ở Tiếng Anh lớp 4.
- Trần ngữ pháp: chỉ dùng 8 cấu trúc của Starters — Hiện tại đơn với like / love / hate ("I like swimming.") · can chỉ năng lực ("I can ride a bike.") · There is / There are ("There is a book on the desk.") · this / that, these / those ("What's this? — It's a pen.") · Danh từ số ít – số nhiều ("one cat – three cats") · Tính từ sở hữu ("my, your, his, her, our, their + bag") · Câu hỏi What / Where / Who / How many ("Where is the dog? — It’s under the table.") · a / an và giới từ in / on / under ("an apple, a ball, in the box, under the chair").
- Mạch kiến thức: **Ôn tập tổng hợp** — nhãn HUD "Ôn kỹ năng Tiếng Anh" · **Tuần 30–35 · Học kì II**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Vận dụng tổng hợp từ vựng, nghe, chính tả, đặt câu và phát âm ở mỗi đảo của bản đồ."
- Mẹo nhớ (bật ở cú đúng đầu cụm và sau câu sai cùng lỗi, mascot đọc to + làm mẫu 3 giây): "Một đảo một kỹ năng, đừng vội sang đảo sau."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "chuyển đảo liên tiếp gây nhầm kỹ năng".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): chuyển đảo liên tiếp gây nhầm kỹ năng; không đạt chuẩn để mở đảo kế; bỏ đảo khó.
- Phạm vi: chỉ dùng nội dung Tiếng Anh lớp 4 đã học và trong đúng band Starters; cấm số hoặc từ vựng ngoài phạm vi trên.
- Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; khối "Gửi bố mẹ" bốn dòng điền số thật: "<n> động tác môn Bắn cung" · "Ôn kỹ năng Tiếng Anh: <k>/<tổng> câu đúng" · "Mẹo con mang về: Một đảo một kỹ năng, đừng vội sang đảo sau." · "Việc 3 phút ở nhà: cả nhà cùng Giương tay chỉ đích".
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Bản Đồ Phiêu Lưu Tiếng Anh, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

3. RÀNG BUỘC CỐT LÕI (thiếu bất kỳ dòng nào là hỏng)
- 1 file HTML duy nhất: `<style>`/`<script>` nội tuyến; không Tailwind Play CDN, không .css/.js/.json/mp3 ngoài; đồ hoạ chỉ dùng 3 file `.webp` trong `assets/` (`nen` bối cảnh, `mascot`, `vat-the` đạo cụ AR); cấm bịa URL ảnh, cấm base64, cấm emoji thay ảnh; thiếu file thì khối bo góc `--miti-1` + chữ, game vẫn chơi; chỉ tải MediaPipe (CDN + model) và font có dự phòng.
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
- Chữ ký MiTi: ô bo góc `#FFD84D` chứa chữ M màu `#07111F` + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; kèm dòng "MiTi • Học bằng chuyển động"; không xóa hay đổi tên ở chế độ không camera.
- Chỉ xuất toàn bộ file HTML hoàn chỉnh: không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không giải thích dài.

4. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }.
- Tối thiểu 60 mục, chia 3 mức độ (level 1/2/3), mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- Mỗi mục có từ hoặc câu tiếng Anh, gợi nghĩa tiếng Việt, phiên âm khi phù hợp, và audio bằng window.speechSynthesis; đáp án là chuỗi cố định.
- Chia mức theo band: level 1 lấy từ và cấu trúc cơ bản nhất của Starters; level 3 vẫn nằm trong Starters, tăng độ khó bằng câu dài hơn và phương án gần nghĩa hơn, không tăng bằng từ ngoài band.
- errorTag là mã máy của lỗi, lấy đúng một trong: xen_ke_ky_nang_gay_nhieu_loi, khong_dat_chuan_do_nang, bo_dao_thu. loiViet là cụm tiếng Việt in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, là thứ hiển thị cho học sinh; mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: sau mỗi đảo hiện huy hiệu và danh sách từ cần luyện lại.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Bến Từ vựng: chọn nghĩa của \"apple\".", choices: ["quả táo","quả cam","quả chuối"], answer: "quả táo", explanation: "apple = quả táo; orange = quả cam, banana = quả chuối.", errorTag: "bo_dao_thu", dang: "nhin", loiViet: "bỏ đảo khó"
  id: "q2", level: 2, prompt: "Bến Nghe: đảo kế tiếp mở khi đủ 3/3 câu đúng, em mới sai 1 câu. Làm gì?", choices: ["nghe lại và sửa câu còn sai","chuyển ngay sang đảo khác","bỏ luôn đảo này"], answer: "nghe lại và sửa câu còn sai", explanation: "Chuẩn mở đảo là 3/3 câu đúng, nên sửa câu còn sai thay vì bỏ dở.", errorTag: "khong_dat_chuan_do_nang", dang: "nhin", loiViet: "không đạt chuẩn để mở đảo kế"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Tiếng Anh lớp 4 và band Starters (so lại từng từ tiếng Anh trong đề và phương án với danh sách 541 từ ở mục 2, từ nào ngoài danh sách thì thay bằng từ trong danh sách); câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `dao-kynang` — đổi cluster nếu đổi dạng bài.
- Band Cambridge: `ST` (Pre A1 Starters) — đổi band thì phải đổi cả thư mục prompt, `EXAMPLES_YLE` và dải từ trong `tools/data/yle.mjs`.
- Gesture: `POINT` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
