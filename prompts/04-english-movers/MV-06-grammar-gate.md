# MV-06 — Cổng Ngữ Pháp

> Tiếng Anh lớp 5 · Band Cambridge **A1 Movers** (A1) · Điều khiển: Nghiêng người / bước sang vùng (Body tilt) · Cụm kiến thức: nguphap
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "CỔNG NGỮ PHÁP" cho học sinh Việt Nam lớp 5, môn Tiếng Anh, chuẩn A1 Movers (A1) của Cambridge.

ƯU TIÊN theo đúng thứ tự: (1) học sinh đạt mục tiêu học tập ở mục 2; (2) điều khiển AR ở mục 1 nhận diện được thật và fallback chuột chơi đủ 100%; (3) phần còn lại. File chật thì làm đơn giản chi tiết trang trí, không cắt mục 2 và mục 3.

1. Ý TƯỞNG
- Bối cảnh: Hàng cổng đá, mỗi cổng mang một dạng động từ.
- Việc của học sinh mỗi lượt: Nghiêng người bước vào cổng chứa dạng động từ đúng với thì của câu.
- Điều khiển: Nghiêng người / bước sang vùng (Body tilt). PoseLandmarker: hai vai (landmark 11, 12) và mũi (0) để tính góc nghiêng thân người so với phương thẳng đứng. Biên độ động tác: Nghiêng cả thân và chuyển trọng tâm hai chân: hai vùng nằm sát mép nên vai phải nghiêng rõ, không lách bằng cái xoay cổ tay.
- Không có camera thì phím mũi tên trái hoặc phải, hoặc chạm vào vùng, để đổi làn.
- Mascot **Cổng Thì** (nghiêm, hay hỏi thì nào) — khen "Vào đúng cổng!", hô mở đầu "Bước qua cổng!". Bảng màu: `--miti-1: #979DAC` (vật thể AR), `--miti-2: #FFB200` (particle, viền hit), `--miti-3: #432818` (HUD).
- Không khí giờ chơi (trang trí, được phép làm đơn giản): thể thao **Điền kinh** ("Bước dài sang làn kế", hạ nhiệt "Duỗi chân và bắp chuối") · dân gian **Nhảy dây** (đồ dùng AR "dây nhảy") · khoảnh khắc chữ ký cổng đúng mở ra kèm tiếng chuông và mascot đứng giữa hai cánh gật đầu · đạo cụ AR neo vào người chơi "bảng tên thì đeo trước ngực em, đổi khi em sang cổng".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any.
- Band Cambridge: **A1 Movers** (A1) — Starters + quá khứ đơn, so sánh hơn/nhất, will, must/have to, giới từ nơi chốn, đếm được/không đếm được, hiện tại tiếp diễn.
- Trần từ vựng: chỉ dùng 930 từ thuộc Movers trở xuống, ưu tiên 36 từ của chủ đề mô tả: angry, beautiful, big, clean, dirty, funny, good, happy, long, new, nice, old, sad, short, small, ugly, young, afraid, bad, clever, …. Cấm mọi từ lần đầu xuất hiện ở band cao hơn; từ SGK Việt Nam ngoài danh sách trên chỉ được dùng nếu đã học ở Tiếng Anh lớp 5.
- Trần ngữ pháp: chỉ dùng 8 cấu trúc của Movers — Quá khứ đơn (có quy tắc + bất quy tắc) ("I visited my grandma.") · So sánh hơn và so sánh nhất ("A whale is bigger than a dolphin.") · will cho dự đoán và tương lai ("It will rain tomorrow.") · must / have to / can’t (nghiêm cấm, buộc) ("You must be quiet in class.") · Đếm được – không đếm được, some / any ("some water, any eggs, a few apples, a little milk") · Giới từ nơi chốn – phương hướng ("next to, between, behind, in front of, opposite") · Hiện tại tiếp diễn đối chiếu hiện tại đơn ("Look! He is swimming.") · because / but / and nối câu ("I like summer because I can go swimming.").
- Mạch kiến thức: **Kiến thức ngôn ngữ** — nhãn HUD "Ngữ pháp Tiếng Anh" · **Tuần 4–13 · Học kì I**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Dùng được hiện tại đơn, hiện tại tiếp diễn, quá khứ đơn; phân biệt danh từ đếm được và không đếm được với some, any."
- Mẹo nhớ (bật ở cú đúng đầu cụm và sau câu sai cùng lỗi, mascot đọc to + làm mẫu 3 giây): "Thấy dấu hiệu thời gian thì chia động từ theo thì."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "thiếu dấu hiệu thì trong câu".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): thiếu dấu hiệu thì trong câu; chủ ngữ số ít nhưng động từ không thêm s hoặc es; dùng sai giới từ chỉ thời gian nơi chốn.
- Phạm vi: chỉ dùng nội dung Tiếng Anh lớp 5 đã học và trong đúng band Movers; cấm số hoặc từ vựng ngoài phạm vi trên.
- Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; khối "Gửi bố mẹ" bốn dòng điền số thật: "<n> động tác môn Điền kinh" · "Ngữ pháp Tiếng Anh: <k>/<tổng> câu đúng" · "Mẹo con mang về: Thấy dấu hiệu thời gian thì chia động từ theo thì." · "Việc 3 phút ở nhà: cả nhà cùng Bước dài sang làn kế".
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Cổng Ngữ Pháp, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- errorTag là mã máy của lỗi, lấy đúng một trong: thi_hieu_du_lu_lien_quan, dem_khong_dong_tu_them_s, gioi_tu_in_on_at. loiViet là cụm tiếng Việt in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, là thứ hiển thị cho học sinh; mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: sửa trực tiếp vị trí sai trong câu và giải thích bằng tiếng Việt.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Chọn dạng đúng: Yesterday we ... to the zoo.", choices: ["went","go","goes"], answer: "went", explanation: "Có \"Yesterday\" làm dấu hiệu thì nên động từ phải ở quá khứ đơn: went.", errorTag: "thi_hieu_du_lu_lien_quan", dang: "nhin", loiViet: "thiếu dấu hiệu thì trong câu"
  id: "q2", level: 2, prompt: "Chọn dạng đúng: My sister ... swimming every day.", choices: ["likes","like","liking"], answer: "likes", explanation: "Chủ ngữ số ít \"My sister\" ở hiện tại đơn thì động từ thêm s: likes.", errorTag: "dem_khong_dong_tu_them_s", dang: "nhin", loiViet: "chủ ngữ số ít nhưng động từ không thêm s hoặc es"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Tiếng Anh lớp 5 và band Movers (so lại từng từ tiếng Anh trong đề và phương án với danh sách 930 từ ở mục 2, từ nào ngoài danh sách thì thay bằng từ trong danh sách); câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `nguphap` — đổi cluster nếu đổi dạng bài.
- Band Cambridge: `MV` (A1 Movers) — đổi band thì phải đổi cả thư mục prompt, `EXAMPLES_YLE` và dải từ trong `tools/data/yle.mjs`.
- Gesture: `STEP` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: PoseLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
