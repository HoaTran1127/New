# E5-09 — Tuyến Đường Nói

> Tiếng Anh lớp 5 · Điều khiển: Nói (Voice) · Cụm kiến thức: noi
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "TUYẾN ĐƯỜNG NÓI" cho học sinh Việt Nam lớp 5, môn Tiếng Anh.

1. Ý TƯỞNG
- Bối cảnh: Tuyến xe buýt dừng ở năm tình huống giao tiếp.
- Việc của học sinh mỗi lượt: Nói to câu trả lời theo khung câu; micro nhận giọng và chấm từng từ.
- Điều khiển: Nói (Voice). Web Speech API SpeechRecognition (ngôn ngữ en-US hoặc en-GB) cho phần phát âm; KHÔNG dùng MediaPipe. Biên độ động tác: Gắn một động tác tay vào lượt nói: sau khi nói xong, học sinh chỉ hoặc chạm thẻ đáp án ở sát mép khung; lúc chờ ghi âm thì hít một nhịp và đưa tay lên cao.
- Không có camera thì nút Nghe mẫu để nghe phát âm chuẩn rồi chọn đáp án bằng chuột.
- Mascot: **Tài Xế** — hay nhắc xuống đúng trạm. Ba câu thoại: khen "Nghe rõ lắm!" · đỡ khi sai "Nói chậm lại được không" · hô mở đầu "Xe tới trạm!".
- Bảng màu riêng: `--miti-1: #FCA311` (vật thể AR chính), `--miti-2: #007F5F` (particle và viền hit), `--miti-3: #118D2F` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: còi xe buýt vang lên và cả trạm vỗ tay theo đúng câu em vừa nói. Đạo cụ AR neo vào người chơi: tấm vé trên tay phải em, bấm lỗ mỗi trạm.
- Môn thể thao của game: **Đồng diễn** — động tác đặc trưng "Hô khẩu hiệu đội", hiệu lệnh "Hô to nào!", lời hay khi bạn sai "Bạn hô to rõ!", duỗi cơ cuối buổi "Thở sâu, vai hạ dần".
- Trò chơi dân gian dẫn dắt: **Rồng rắn lên mây** — cách chơi "Hô lại đúng tiếng cuối của câu", lời hô "Rồng rắn lên mây, có cây lúc lắc", đồ dùng AR "vạch phấn".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: nói câu ngắn theo tình huống qua Web Speech recognition; khung câu cho sẵn.
- Mạch kiến thức: **Nghe và nói** — nhãn HUD "Nói tình huống" · **Tuần 18–27 · Học kì II**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Nói được câu ngắn theo tình huống với khung câu cho sẵn; phát âm đủ âm đầu và âm cuối."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Nói chậm, bật đủ âm đầu và âm cuối."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "nuốt âm đầu hoặc âm cuối".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): nuốt âm đầu hoặc âm cuối; ngắt câu giữa cụm từ; lặp từ vô nghĩa khi do dự.
- Phạm vi: chỉ dùng nội dung Tiếng Anh lớp 5 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Đồng diễn — <n> động tác" · "Con học Nói tình huống, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Nói chậm, bật đủ âm đầu và âm cuối." · "Việc 3 phút ở nhà: cả nhà cùng Hô khẩu hiệu đội rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Tuyến Đường Nói, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- errorTag là mã máy của lỗi, lấy đúng một trong: thieu_am_dau_cuoi, ngat_giua_cau, trung_lap_phat_am. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: hiện transcript nhận được, gạch chân từ thiếu và cho thử lại 3 lần.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Tình huống: bạn hỏi đường tới thư viện. Nói câu:", choices: ["How do I get to the library","Where are you from","What time is it"], answer: "How do I get to the library", explanation: "Khung câu hỏi đường: How do I get to + địa điểm.", errorTag: "thieu_am_dau_cuoi", dang: "nhin", loiViet: "nuốt âm đầu hoặc âm cuối"
  id: "q2", level: 2, prompt: "Nói câu theo tranh: cậu bé đang ăn táo.", choices: ["He is eating an apple","He eats banana","She is drinking milk"], answer: "He is eating an apple", explanation: "Đủ chủ ngữ + hiện tại tiếp diễn + đúng danh từ \"an apple\".", errorTag: "ngat_giua_cau", dang: "nhin", loiViet: "ngắt câu giữa cụm từ"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Tiếng Anh lớp 5; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `noi` — đổi cluster nếu đổi dạng bài.
- Gesture: `VOICE` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
