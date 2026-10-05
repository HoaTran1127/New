# E4-09 — Đường Đua Nghe

> Tiếng Anh lớp 4 · Điều khiển: Nghiêng người / bước sang vùng (Body tilt) · Cụm kiến thức: nghe-e4
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "ĐƯỜNG ĐUA NGHE" cho học sinh Việt Nam lớp 4, môn Tiếng Anh.

1. Ý TƯỞNG
- Bối cảnh: Ba làn chạy, mỗi làn mang một đáp án nghe được.
- Việc của học sinh mỗi lượt: Nghe rồi nghiêng người bước sang làn chứa từ hoặc số đúng.
- Điều khiển: Nghiêng người / bước sang vùng (Body tilt). PoseLandmarker: hai vai (landmark 11, 12) và mũi (0) để tính góc nghiêng thân người so với phương thẳng đứng. Biên độ động tác: Nghiêng cả thân và chuyển trọng tâm hai chân: hai vùng nằm sát mép nên vai phải nghiêng rõ, không lách bằng cái xoay cổ tay.
- Không có camera thì phím mũi tên trái hoặc phải, hoặc chạm vào vùng, để đổi làn.
- Mascot: **Tai Nhanh** — thính lắm, nghe một lần là ra. Ba câu thoại: khen "Đúng làn rồi!" · đỡ khi sai "Nghe lại rồi chọn nha" · hô mở đầu "Nghe, bước, chạy!".
- Bảng màu riêng: `--miti-1: #06D6A0` (vật thể AR chính), `--miti-2: #073B4C` (particle và viền hit), `--miti-3: #FFD166` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: làn đúng sáng đèn ba nhịp còn mascot chống nạnh ở vạch đích. Đạo cụ AR neo vào người chơi: đai đội trưởng trước ngực em, đổi màu khi em đổi bên.
- Môn thể thao của game: **Điền kinh** — động tác đặc trưng "Bước dài sang làn kế", hiệu lệnh "Vào chỗ — chạy!", lời hay khi bạn sai "Bạn chạy nhanh!", duỗi cơ cuối buổi "Duỗi chân và bắp chuối".
- Trò chơi dân gian dẫn dắt: **Nhảy dây** — cách chơi "Nhún hai chân theo vạch nhịp", lời hô "Một hai, một hai, nhảy đều", đồ dùng AR "dây nhảy".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: nghe và chọn từ tranh tương ứng; nghe và chọn số hoặc màu; khoảng 10-15 từ mỗi chủ đề.
- Mạch kiến thức: **Nghe và nói** — nhãn HUD "Nghe lớp 4" · **Tuần 2–11 · Học kì I**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Nghe và nhận biết được khoảng 10 đến 15 từ, số, màu theo chủ điểm; nghe và chọn được tranh tương ứng."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Bắt âm đầu trước, nghĩa theo sau."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "bỏ sót âm cuối s, ed, t".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): bỏ sót âm cuối s, ed, t; nhầm cặp từ có phiên âm gần giống; bỏ qua từ dài nhiều âm tiết.
- Phạm vi: chỉ dùng nội dung Tiếng Anh lớp 4 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Điền kinh — <n> động tác" · "Con học Nghe lớp 4, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Bắt âm đầu trước, nghĩa theo sau." · "Việc 3 phút ở nhà: cả nhà cùng Bước dài sang làn kế rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Đường Đua Nghe, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- errorTag là mã máy của lỗi, lấy đúng một trong: am_cuoi_s_ed_t, phien_am_gan_giong, bo_lo_tu_dai. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: highlight âm nghe được, cho bấm phát lại tối đa 3 lần rồi hiện transcript.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Nghe: \"schoolbag\". Chọn tranh đúng.", choices: ["cặp sách","quyển sách","cái bàn"], answer: "cặp sách", explanation: "schoolbag = cặp sách (danh từ ghép school + bag).", errorTag: "bo_lo_tu_dai", dang: "nhin", loiViet: "bỏ qua từ dài nhiều âm tiết"
  id: "q2", level: 2, prompt: "Nghe: \"thirteen\". Chọn số.", choices: ["13","30","3"], answer: "13", explanation: "thirteen /ˌθɜːˈtiːn/ = 13; phân biệt với thirty /ˈθɜː.ti/ = 30 ở trọng âm.", errorTag: "phien_am_gan_giong", dang: "nhin", loiViet: "nhầm cặp từ có phiên âm gần giống"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Tiếng Anh lớp 4; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `nghe-e4` — đổi cluster nếu đổi dạng bài.
- Gesture: `STEP` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: PoseLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
