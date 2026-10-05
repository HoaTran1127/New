# E4-15 — Bản Đồ Phiêu Lưu Tiếng Anh

> Tiếng Anh lớp 4 · Điều khiển: Chỉ ngón tay trỏ (Point) · Cụm kiến thức: dao-kynang-e4
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "BẢN ĐỒ PHIÊU LƯU TIẾNG ANH" cho học sinh Việt Nam lớp 4, môn Tiếng Anh.

1. Ý TƯỞNG
- Bối cảnh: Quần đảo năm đảo kỹ năng: từ vựng, nghe, chính tả, câu, phát âm.
- Việc của học sinh mỗi lượt: Chỉ tay mở khoá từng bến đảo, hoàn thành ba câu trên đảo để lấy huy hiệu.
- Điều khiển: Chỉ ngón tay trỏ (Point). MediaPipe Tasks Vision HandLandmarker, đầu ngón trỏ landmark 8 làm con trỏ. Biên độ động tác: Ngón trỏ đi bằng cả cẳng tay: đáp án đặt ở bốn góc khác nhau của khung hình nên mỗi lượt là một lần duỗi khuỷu đổi hướng, không phải nhấc ngón ngay trước ngực.
- Không có camera thì chạm hoặc click vào đáp án thay cho con trỏ ngón tay, giữ 400ms để chốt như khi giữ tay.
- Mascot: **Đảo Con** — thích cắm cờ. Ba câu thoại: khen "Đảo mở rồi!" · đỡ khi sai "Câu này khó, thử lại" · hô mở đầu "Neo xuống đảo!".
- Bảng màu riêng: `--miti-1: #277DA1` (vật thể AR chính), `--miti-2: #FFD65C` (particle và viền hit), `--miti-3: #F05655` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: năm đảo lần lượt sáng đèn và một lá cờ cắm xuống đảo vừa hoàn thành. Đạo cụ AR neo vào người chơi: bản đồ cuộn đeo lưng, mở ra khi em chỉ đảo.
- Môn thể thao của game: **Bắn cung** — động tác đặc trưng "Giương tay chỉ đích", hiệu lệnh "Ngắm — phóng!", lời hay khi bạn sai "Bạn ngắm chuẩn quá!", duỗi cơ cuối buổi "Duỗi vai và cổ tay".
- Trò chơi dân gian dẫn dắt: **Chi chi chành chành** — cách chơi "Ngón trỏ chạm ô rồi rút theo nhịp", lời hô "Chi chi chành chành", đồ dùng AR "vạch phấn".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: bản đồ 5 đảo: từ vựng, nghe, chính tả, câu, phát âm; mỗi đảo 3 câu.
- Mạch kiến thức: **Ôn tập tổng hợp** — nhãn HUD "Ôn kỹ năng lớp 4" · **Tuần 30–35 · Học kì II**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Vận dụng tổng hợp từ vựng, nghe, chính tả, đặt câu và phát âm ở mỗi đảo của bản đồ."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Một đảo một kỹ năng, đừng vội sang đảo sau."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "chuyển đảo liên tiếp gây nhầm kỹ năng".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): chuyển đảo liên tiếp gây nhầm kỹ năng; không đạt chuẩn để mở đảo kế; bỏ đảo khó.
- Phạm vi: chỉ dùng nội dung Tiếng Anh lớp 4 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Bắn cung — <n> động tác" · "Con học Ôn kỹ năng lớp 4, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Một đảo một kỹ năng, đừng vội sang đảo sau." · "Việc 3 phút ở nhà: cả nhà cùng Giương tay chỉ đích rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Bản Đồ Phiêu Lưu Tiếng Anh, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- errorTag là mã máy của lỗi, lấy đúng một trong: xen_ke_ky_nang_gay_nhieu_loi, khong_dat_chuan_do_nang, bo_dao_thu. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: sau mỗi đảo hiện huy hiệu và danh sách từ cần luyện lại.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Đảo Từ vựng: chọn nghĩa của \"window\".", choices: ["cửa sổ","cánh cửa","mái nhà"], answer: "cửa sổ", explanation: "window = cửa sổ; door = cánh cửa — cặp từ dễ nhầm.", errorTag: "bo_dao_thu", dang: "nhin", loiViet: "bỏ đảo khó"
  id: "q2", level: 2, prompt: "Đảo Chính tả: từ nào viết đúng?", choices: ["yellow","yelow","yellou"], answer: "yellow", explanation: "yellow có hai chữ l và kết thúc \"ow\".", errorTag: "khong_dat_chuan_do_nang", dang: "nhin", loiViet: "không đạt chuẩn để mở đảo kế"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Tiếng Anh lớp 4; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `dao-kynang-e4` — đổi cluster nếu đổi dạng bài.
- Gesture: `POINT` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
