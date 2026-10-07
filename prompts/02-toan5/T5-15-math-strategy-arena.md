# T5-15 — Đấu Trường Chiến Thuật Toán

> Toán lớp 5 · Điều khiển: Nắm và thả (Grab / Catch) · Cụm kiến thức: on-tap-toan-5
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "ĐẤU TRƯỜNG CHIẾN THUẬT TOÁN" cho học sinh Việt Nam lớp 5, môn Toán.

1. Ý TƯỞNG
- Bối cảnh: Đấu trường chiến thuật, mỗi lượt phải chọn bài tấn công.
- Việc của học sinh mỗi lượt: Nắm thẻ chiến lược (rút về đơn vị, tỉ số, sơ đồ đoạn thẳng) áp vào đề bài rồi chọn đáp án.
- Điều khiển: Nắm và thả (Grab / Catch). HandLandmarker: tâm bàn tay = trung bình các landmark 5, 9, 13, 17; trạng thái nắm/xòe từ khoảng cách đầu ngón tới tâm. Biên độ động tác: Bốc và kéo: vật tới sát mép khung, học sinh với tay ra >= 45% tầm với để bốc rồi kéo về vị trí thả ở mép đối diện.
- Không có camera thì kéo vật bằng chuột hoặc một ngón tay, nhả ra để mô phỏng xòe tay.
- Mascot: **Tướng Trận** — hiền, hay bày kế. Ba câu thoại: khen "Đúng chiến thuật rồi!" · đỡ khi sai "Cách này chưa ổn đâu" · hô mở đầu "Bày binh pháp!".
- Bảng màu riêng: `--miti-1: #603808` (vật thể AR chính), `--miti-2: #DDB892` (particle và viền hit), `--miti-3: #A26769` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: bản đồ chiến thuật trải ra trước mặt em và quân cờ tự chạy theo sơ đồ đoạn thẳng. Đạo cụ AR neo vào người chơi: bảng chiến thuật đeo lưng, lật khi em nắm thẻ.
- Môn thể thao của game: **Bóng rổ** — động tác đặc trưng "Bắt bóng rồi đưa lên rổ", hiệu lệnh "Lên rổ!", lời hay khi bạn sai "Bạn bắt bóng chắc!", duỗi cơ cuối buổi "Duỗi chân sau nhịp ném".
- Trò chơi dân gian dẫn dắt: **Ô ăn quan** — cách chơi "Vốc đều tay rải quan xuống ô", lời hô "Rải một rải hai, đều tay", đồ dùng AR "viên sỏi".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: ôn tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5.
- Mạch kiến thức: **Ôn tập tổng hợp** — nhãn HUD "Ôn tập Toán lớp 5" · **Tuần 30–35 · Học kì II**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Ôn tập tổng hợp số thập phân, phân số, phần trăm, hình học, đo lường và bài toán chuyển động lớp 5."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Chọn cách giải trước, tính sau."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "chọn sai chiến lược giải".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): chọn sai chiến lược giải; bỏ bước thử lại; kết luận sai đơn vị.
- Phạm vi: chỉ dùng nội dung Toán lớp 5 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 5; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Bóng rổ — <n> động tác" · "Con học Ôn tập Toán lớp 5, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Chọn cách giải trước, tính sau." · "Việc 3 phút ở nhà: cả nhà cùng Bắt bóng rồi đưa lên rổ rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Đấu Trường Chiến Thuật Toán, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- errorTag là mã máy của lỗi, lấy đúng một trong: chon_sai_chi_luoc_giai, quen_thu_thi_giua_chung, ket_luan_sai_don_vi. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: chọn chiến lược (rút về đơn vị, tỉ số, sơ đồ đoạn thẳng) rồi mới tính.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 28 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Tính 3,5 × 4,2.", choices: ["14,7","14,70","1,47"], answer: "14,7", explanation: "Bỏ dấu phẩy: 35 × 42 = 1470; đếm 2 chữ số thập phân → 14,70 = 14,7.", errorTag: "chon_sai_chi_luoc_giai", dang: "tinh", loiViet: "chọn sai chiến lược giải"
  id: "q2", level: 2, prompt: "Một lớp 40 bạn, 60% thích toán. Có bao nhiêu bạn?", choices: ["24 bạn","26 bạn","16 bạn"], answer: "24 bạn", explanation: "40 : 100 × 60 = 24. Kiểm tra: 60% của 40 phải nhỏ hơn 40.", errorTag: "quen_thu_thi_giua_chung", dang: "tinh", loiViet: "bỏ bước thử lại"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Toán lớp 5; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `on-tap-toan-5` — đổi cluster nếu đổi dạng bài.
- Gesture: `GRAB+POINT` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
