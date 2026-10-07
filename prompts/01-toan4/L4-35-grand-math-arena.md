# L4-35 — Đại Đấu Trường Toán

> Toán lớp 4 · Điều khiển: Vung tay đấm (Punch) · Cụm kiến thức: on-tap-toan-4
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "ĐẠI ĐẤU TRƯỜNG TOÁN" cho học sinh Việt Nam lớp 4, môn Toán.

1. Ý TƯỞNG
- Bối cảnh: Trận chung kết toàn cấp với bốn cửa ải tăng dần độ khó.
- Việc của học sinh mỗi lượt: Đấm thẻ đáp án đúng ở mỗi cửa ải để hạ guardian của từng chủ đề.
- Điều khiển: Vung tay đấm (Punch). HandLandmarker: vị trí cổ tay (landmark 0) và mũi (landmark 15) để tính hướng đấm; độ gập các ngón để xác nhận nắm tay. Biên độ động tác: Đấm đổi tầm liên tục (trên vai – ngang ngực – dưới thắt lưng); cú đấm đi hết tay từ thế thủ trước ngực tới vật nằm sát mép khung.
- Không có camera thì click vào vật để mô phỏng cú đấm; rê chuột lên vật không được tính.
- Mascot: **Bốn Ải** — oai vệ, hay hô tên chủ đề. Ba câu thoại: khen "Hạ một ải rồi!" · đỡ khi sai "Còn nước còn tát nha" · hô mở đầu "Ải nhất, mở!".
- Bảng màu riêng: `--miti-1: #9E0059` (vật thể AR chính), `--miti-2: #E8AA42` (particle và viền hit), `--miti-3: #FF4301` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: bốn guardian cùng cúi đầu ở ải cuối, đấu trường tắt rồi bật theo tên chủ đề. Đạo cụ AR neo vào người chơi: chiếc chuông trận đấu neo vai trái, rung mỗi lần phá cổng.
- Môn thể thao của game: **Boxing** — động tác đặc trưng "Đấm về phía trước", hiệu lệnh "Một — hai!", lời hay khi bạn sai "Bạn ra đòn gọn!", duỗi cơ cuối buổi "Duỗi ngực và vai mở".
- Trò chơi dân gian dẫn dắt: **Ném còn** — cách chơi "Đẩy tay hất quả còn qua vòng", lời hô "Một hai ba, ném!", đồ dùng AR "vòng tròn".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: ôn tổng hợp số tự nhiên, bốn phép tính, phân số, hình học và đo lường lớp 4.
- Mạch kiến thức: **Ôn tập tổng hợp** — nhãn HUD "Ôn tập Toán lớp 4" · **Tuần 34–35 · Học kì II**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Ôn tập, củng cố số tự nhiên, bốn phép tính, phân số, hình học và đo lường đã học ở lớp 4."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Nhận ra dạng bài trước, tính sau."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "nhầm loại phép tính khi ôn".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): nhầm loại phép tính khi ôn; quên rút gọn kết quả; đọc đề bỏ sót điều kiện.
- Phạm vi: chỉ dùng nội dung Toán lớp 4 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 4; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Boxing — <n> động tác" · "Con học Ôn tập Toán lớp 4, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Nhận ra dạng bài trước, tính sau." · "Việc 3 phút ở nhà: cả nhà cùng Đấm về phía trước rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Đại Đấu Trường Toán, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- Tối thiểu 30 mục, chia 3 mức độ (level 1/2/3), mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- Mục `dang: "tinh"` phải tính lại được bằng ĐÚNG MỘT phép số học trong code, mục `dang: "nhin"` kiểm bằng số học hoặc số đo hình học, không so khớp chuỗi tự do; mỗi phương án nhiễu là một kết quả thật của lỗi đã nêu, không phải số ngẫu nhiên.
- errorTag là mã máy của lỗi, lấy đúng một trong: tron_loai_phep_tinh, quen_rut_gon_ket_qua, doc_de_thieu_dieu_kien. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: gọi lại kiến thức lớp 4 tương ứng với từng cửa ải.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 28 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Số gồm 4 triệu, 0 trăm nghìn, 7 nghìn, 5 chục?", choices: ["4 007 050","4 070 050","4 700 500"], answer: "4 007 050", explanation: "Viết đủ cả ba lớp, hàng nào thiếu thì ghi 0.", errorTag: "doc_de_thieu_dieu_kien", dang: "nhin", loiViet: "đọc đề bỏ sót điều kiện"
  id: "q2", level: 2, prompt: "25 × 9 × 4 nên nhóm cặp nào để tính nhanh?", choices: ["25 × 4","9 × 4","25 × 9"], answer: "25 × 4", explanation: "Nhóm 25 × 4 = 100 rồi nhân 9, dựa vào tính chất giao hoán; chọn 25 × 9 vẫn đúng nhưng phải tính nhẩm dài hơn.", errorTag: "tron_loai_phep_tinh", dang: "nhin", loiViet: "nhầm loại phép tính khi ôn"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Toán lớp 4; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `on-tap-toan-4` — đổi cluster nếu đổi dạng bài.
- Gesture: `PUNCH` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
