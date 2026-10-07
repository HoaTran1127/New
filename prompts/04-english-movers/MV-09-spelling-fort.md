# MV-09 — Pháo Đài Chính Tả

> Tiếng Anh lớp 5 · Band Cambridge **A1 Movers** (A1) · Điều khiển: Vung tay đấm (Punch) · Cụm kiến thức: chinh-ta
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "PHÁO ĐÀI CHÍNH TẢ" cho học sinh Việt Nam lớp 5, môn Tiếng Anh, chuẩn A1 Movers (A1) của Cambridge.

1. Ý TƯỞNG
- Bối cảnh: Pháo đài phòng thủ, đạn lỗi chính tả bay tới.
- Việc của học sinh mỗi lượt: Đấm quả đạn chứa từ viết đúng để bắn hạ loạt đạn sai.
- Điều khiển: Vung tay đấm (Punch). HandLandmarker: vị trí cổ tay (landmark 0) và mũi (landmark 15) để tính hướng đấm; độ gập các ngón để xác nhận nắm tay. Biên độ động tác: Đấm đổi tầm liên tục (trên vai – ngang ngực – dưới thắt lưng); cú đấm đi hết tay từ thế thủ trước ngực tới vật nằm sát mép khung.
- Không có camera thì click vào vật để mô phỏng cú đấm; rê chuột lên vật không được tính.
- Mascot: **Pháo Thủ** — nóng tính, hay nhắc. Ba câu thoại: khen "Bắn trúng rồi!" · đỡ khi sai "Quả đó sai chính tả" · hô mở đầu "Nạp đạn, bắn!".
- Bảng màu riêng: `--miti-1: #22223B` (vật thể AR chính), `--miti-2: #9A8C98` (particle và viền hit), `--miti-3: #4E4C66` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: loạt đạn sai vỡ giữa không trung và pháo đài bắn lên một cờ hiệu. Đạo cụ AR neo vào người chơi: ống nhòm pháo đài trước ngực em, nòng quay khi em đấm.
- Môn thể thao của game: **Boxing** — động tác đặc trưng "Đấm về phía trước", hiệu lệnh "Một — hai!", lời hay khi bạn sai "Bạn ra đòn gọn!", duỗi cơ cuối buổi "Duỗi ngực và vai mở".
- Trò chơi dân gian dẫn dắt: **Ném còn** — cách chơi "Đẩy tay hất quả còn qua vòng", lời hô "Một hai ba, ném!", đồ dùng AR "vòng tròn".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: điền chữ cái còn thiếu; sửa lỗi chính tả; chọn cách viết đúng của từ lớp 4-5.
- Band Cambridge: **A1 Movers** (A1) — Starters + quá khứ đơn, so sánh hơn/nhất, will, must/have to, giới từ nơi chốn, đếm được/không đếm được, hiện tại tiếp diễn.
- Trần từ vựng: chỉ dùng 930 từ thuộc Movers trở xuống, ưu tiên 26 từ của chủ đề gia đình: baby, boy, brother, child, children, cousin, dad, family, father, friend, girl, grandfather, grandma, grandmother, grandpa, man, mother, mum, name, people, sister, woman, aunt, daughter, son, uncle. Cấm mọi từ lần đầu xuất hiện ở band cao hơn; từ SGK Việt Nam ngoài danh sách trên chỉ được dùng nếu đã học ở Tiếng Anh lớp 5.
- Trần ngữ pháp: chỉ dùng 8 cấu trúc của Movers — Quá khứ đơn (có quy tắc + bất quy tắc) ("I visited my grandma. / We went to the zoo yesterday.") · So sánh hơn và so sánh nhất ("A whale is bigger than a dolphin. / He is the fastest runner.") · will cho dự đoán và tương lai ("It will rain tomorrow. / I’ll be ten next year.") · must / have to / can’t (nghiêm cấm, buộc) ("You must be quiet in class. / You can’t run in the corridor.") · Đếm được – không đếm được, some / any ("some water, any eggs, a few apples, a little milk") · Giới từ nơi chốn – phương hướng ("next to, between, behind, in front of, opposite") · Hiện tại tiếp diễn đối chiếu hiện tại đơn ("Look! He is swimming. / He usually swims at weekends.") · because / but / and nối câu ("I like summer because I can go swimming.").
- Mạch kiến thức: **Đọc và viết** — nhãn HUD "Chính tả" · **Tuần 5–14 · Học kì I**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Viết đúng chính tả các từ đã học; điền được chữ cái còn thiếu và sửa được lỗi trong từ."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Đọc chậm, đánh vần từng chữ cái."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "thiếu chữ cái giữa từ".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): thiếu chữ cái giữa từ; nhầm i với y; viết nhầm phụ âm đôi.
- Phạm vi: chỉ dùng nội dung Tiếng Anh lớp 5 đã học và trong đúng band Movers; cấm số hoặc từ vựng ngoài phạm vi trên.
- Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Boxing — <n> động tác" · "Con học Chính tả, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Đọc chậm, đánh vần từng chữ cái." · "Việc 3 phút ở nhà: cả nhà cùng Đấm về phía trước rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Pháo Đài Chính Tả, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- Chia mức theo band: level 1 lấy từ và cấu trúc cơ bản nhất của Movers; level 3 vẫn nằm trong Movers, tăng độ khó bằng câu dài hơn và phương án gần nghĩa hơn, không tăng bằng từ ngoài band.
- errorTag là mã máy của lỗi, lấy đúng một trong: thieu_chu_cai, nham_v_i_y, double_consonant. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: đánh đỏ vị trí sai và hiện từ đúng kèm phiên âm.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Từ nào viết đúng: \"thành phố\"?", choices: ["city","sity","citys"], answer: "city", explanation: "city bắt đầu bằng 'c' và kết thúc bằng 'ty' với y, không phải 'sity'.", errorTag: "nham_v_i_y", dang: "nhin", loiViet: "nhầm i với y"
  id: "q2", level: 2, prompt: "Chọn cách viết đúng của \"giáo viên\".", choices: ["teacher","techer","teatcher"], answer: "teacher", explanation: "teacher = teach + er; 'techer' thiếu chữ a sau 'te'.", errorTag: "thieu_chu_cai", dang: "nhin", loiViet: "thiếu chữ cái giữa từ"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Tiếng Anh lớp 5 và band Movers (so lại từng từ tiếng Anh trong đề và phương án với danh sách 930 từ ở mục 2, từ nào ngoài danh sách thì thay bằng từ trong danh sách); câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `chinh-ta` — đổi cluster nếu đổi dạng bài.
- Band Cambridge: `MV` (A1 Movers) — đổi band thì phải đổi cả thư mục prompt, `EXAMPLES_YLE` và dải từ trong `tools/data/yle.mjs`.
- Gesture: `PUNCH` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
