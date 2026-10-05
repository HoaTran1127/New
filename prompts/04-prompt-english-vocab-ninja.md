# LEG-04 — English Vocabulary Ninja AR

> Tiếng Anh lớp 4-5 · Điều khiển: SWIPE · Model: HandLandmarker
> **LEGACY (LEG-04)** — Chém từ vựng tiếng Anh theo chủ đề hoặc từ đồng nghĩa. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù: `catalogs/GAME_CATALOG.csv`.
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web AR một file HTML "ENGLISH VOCABULARY NINJA AR" cho học sinh Việt Nam lớp 4-5, môn Tiếng Anh, điều khiển bằng webcam.

1. Ý TƯỞNG
- Cơ chế gốc (giữ nguyên): Chém từ vựng tiếng Anh theo chủ đề hoặc từ đồng nghĩa.
- Thẻ từ vựng tiếng Anh rơi theo ba làn trong siêu thị Neon; một bảng nhiệm vụ trên đầu, ví dụ "Chém các loài động vật (Animals)".
- Vung cả cánh tay chém thẻ ĐÚNG chủ đề; chém thẻ bẫy (thuộc chủ đề khác lẫn vào) trừ 1 tim và hiện nghĩa tiếng Việt của từ.
- SWIPE — HandLandmarker; vệt kiếm neon; hover không phải hit, confidence thấp không chốt.
- Mỗi từ đúng được đọc to bằng window.speechSynthesis (en-US) kèm nút "Nghe lại"; nghĩa tiếng Việt hiện dưới thẻ.
- Chủ đề xoay vòng theo 5 cụm: Animals · Fruits & Food · School Things · Jobs & Occupations · Opposites.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Từ vựng SGK Tiếng Anh lớp 4–5 theo 5 chủ đề trên; mọi từ phải nằm trong word list đã khai báo, cấm từ ngoài danh sách.
- Học liệu tiếng Anh giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải bằng tiếng Việt.
- Lỗi cần sửa: nhầm từ cùng chủ đề nhưng khác cặp nghĩa (elephant / dolphin); lẫn từ trái nghĩa với từ mô tả; đánh vần gần giống.
- Từ vừa chém sai hiện lại cuối phiên kèm phát âm; tổng kết nhóm theo loiViet.
- Điều kiện thắng thua: hết 5 tim là thua, đủ 12 lượt là thắng; không điểm số cạnh tranh, không xếp hạng, không timer thi đua; tổng kết ba thẻ "Làm tốt / Cần luyện / Động tác lần sau".
- Màn tổng kết thêm bốn dòng "Gửi bố mẹ" bằng số thật: môn tập + số động tác, cụm kiến thức + số câu đúng, mẹo nhớ, một việc 3 phút không màn hình ở nhà.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }; đề ≤16 từ, một ý duy nhất.
- Tối thiểu 60 mục chia 3 mức độ (level 1/2/3), trong đó >= 60% `dang: "nhin"` (nhìn rồi chọn); `dang: "tinh"` chỉ MỘT phép tính một bước trong phạm vi SGK; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo vị trí đáp án bằng seed theo lượt.
- errorTag lấy đúng một trong: nham_tu_cung_chu_de (chọn nhầm từ cùng chủ đề nhưng sai nghĩa), tra_trai_nghia_nham (lộn cặp trái nghĩa), noi_hinh_am_chu (nhìn mặt chữ gần giống mà chọn sai). loiViet là cụm tiếng Việt in thường cùng chỉ lỗi đó, hiển thị cho học sinh.
- Phương án nhiễu phải là kết quả của một lỗi thật trong danh sách trên, không phải số ngẫu nhiên; không được có hai đáp án cùng đúng.
- Một mục mẫu để bám theo khuôn (viết tiếp ít nhất 59 mục nữa):
  id: "q1", level: 1, prompt: "Chém từ chỉ động vật.", choices: ["Elephant","Apple","Ruler"], answer: "Elephant", explanation: "Elephant là con voi — động vật. Apple là quả táo (trái cây), Ruler là thước kẻ (đồ dùng học tập).", errorTag: "nham_tu_cung_chu_de", dang: "nhin", loiViet: "chọn nhầm từ cùng chủ đề nhưng sai nghĩa"
- Phạm vi dữ liệu: cấm từ ngoài word list Tiếng Anh lớp 4-5 đã khai báo; học liệu tiếng Anh giữ nguyên tiếng Anh, hướng dẫn và lời giải bằng tiếng Việt.
- Viết kèm hàm `verifyQuestionBank()` chạy một lần trước vòng chơi: answer phải có trong choices đúng một lần; explanation/loiViet khác rỗng; không trùng prompt; mỗi level chiếm tối thiểu 1/4 số mục; mục trượt bị loại kèm console.warn nêu id bằng tiếng Việt.

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi).
- Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài phạm vi trên; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- LEG-04 thuộc dòng prompt đời đầu: giữ cơ chế gốc, dùng ràng buộc cốt lõi hiện hành của `tools/lib/core.mjs`; mọi phụ thuộc cũ bị cấm đã được thay thế.
- Muốn đổi ý tưởng hoặc cơ chế: sửa khối INFO trong `tools/upgrade-legacy.mjs` rồi chạy `node tools/upgrade-legacy.mjs`.
- Muốn đổi quy định chung cho mọi game (kể cả 12 file này): sửa `tools/lib/core.mjs` rồi chạy lại script.
