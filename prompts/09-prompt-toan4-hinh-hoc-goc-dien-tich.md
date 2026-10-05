# LEG-09 — Cánh Tay Ê-Ke & Pháo Đài Góc

> Toán lớp 4 · Điều khiển: ANGLE_POSE · Model: PoseLandmarker
> **LEGACY (LEG-09)** — Hai cánh tay tạo góc và diện tích theo yêu cầu. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù: `catalogs/GAME_CATALOG.csv`.
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web AR một file HTML "CÁNH TAY Ê-KE & PHÁO ĐÀI GÓC" cho học sinh Việt Nam lớp 4, môn Toán, điều khiển bằng webcam.

1. Ý TƯỞNG
- Cơ chế gốc (giữ nguyên): Hai cánh tay tạo góc và diện tích theo yêu cầu.
- Hai cánh tay em là hai cạnh của một góc: cổ tay trái làm đỉnh, tia laser AR nối hai bàn tay, thước đo độ ảo hiện số đo thời gian thực.
- Nhiệm vụ đọc to trên HUD: "Tạo GÓC VUÔNG để kích hoạt đại bác!" — em dang tay theo yêu cầu và giữ đúng 1 giây để bắn.
- ANGLE_POSE — PoseLandmarker đo vai–khuỷu–bàn tay; dung sai ±8° quanh 90°, góc nhọn < 90°, góc tù 90–180°, góc bẹt ≈ 180° (hai tay mở thẳng hàng).
- Thiên thạch mang biểu tượng góc rơi xuống; tạo sai loại góc: khiên nổ nhẹ, dừng 2 giây hiện "Góc của em đang 65° — góc nhọn; cần mở lớn hơn 90°".
- Màu chỉ là phụ: mỗi loại góc kèm tên chữ và hình ký hiệu — nhìn bằng mắt thường không cần phân biệt màu.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Nhận biết góc nhọn, góc vuông, góc tù, góc bẹt; đường thẳng song song và vuông góc (lớp 4).
- Level 1 tạo góc theo yêu cầu trực tiếp; level 2 đoán loại góc từ hình cho trước; level 3 so hai góc — không bao giờ quá một thao tác.
- Lỗi cần sửa: coi góc vuông là "vuông = đứng"; nhầm góc bẹt với góc vuông vì hai cạnh thẳng; không đọc được số đo thước đo.
- Mỗi lượt camera giữ khung vai–tay; mất một bên tay thì nhắc chỉnh vị trí bằng một dòng tiếng Việt, không trừ tim.
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
- Tối thiểu 30 mục chia 3 mức độ (level 1/2/3), trong đó >= 60% `dang: "nhin"` (nhìn rồi chọn); `dang: "tinh"` chỉ MỘT phép tính một bước trong phạm vi SGK; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo vị trí đáp án bằng seed theo lượt.
- errorTag lấy đúng một trong: nham_goc_bet_goc_vuong (lộn góc bẹt với góc vuông), doc_sai_thuoc_do (đọc sai số đo trên thước), dinh_nham_canh (nhầm cạnh của góc khi mô tả). loiViet là cụm tiếng Việt in thường cùng chỉ lỗi đó, hiển thị cho học sinh.
- Phương án nhiễu phải là kết quả của một lỗi thật trong danh sách trên, không phải số ngẫu nhiên; không được có hai đáp án cùng đúng.
- Một mục mẫu để bám theo khuôn (viết tiếp ít nhất 29 mục nữa):
  id: "q1", level: 1, prompt: "Hình nào là góc vuông?", choices: ["Hai cạnh vuông góc, có ký hiệu vuông nhỏ","Hai cạnh thẳng hàng một đường","Hai cạnh khép nhỏ hơn 90°"], answer: "Hai cạnh vuông góc, có ký hiệu vuông nhỏ", explanation: "Góc vuông đúng 90°, có ký hiệu ô vuông nhỏ ở đỉnh; hai cạnh thẳng hàng là góc bẹt 180°.", errorTag: "nham_goc_bet_goc_vuong", dang: "nhin", loiViet: "lộn góc bẹt với góc vuông"
- Phạm vi dữ liệu: chỉ dùng số trong phạm vi Toán lớp 4 đã học; không số âm ngoài phạm vi, không chia cho 0.
- Viết kèm hàm `verifyQuestionBank()` chạy một lần trước vòng chơi: answer phải có trong choices đúng một lần; explanation/loiViet khác rỗng; không trùng prompt; mỗi level chiếm tối thiểu 1/4 số mục; mục trượt bị loại kèm console.warn nêu id bằng tiếng Việt.

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi).
- Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài phạm vi trên; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- LEG-09 thuộc dòng prompt đời đầu: giữ cơ chế gốc, dùng ràng buộc cốt lõi hiện hành của `tools/lib/core.mjs`; mọi phụ thuộc cũ bị cấm đã được thay thế.
- Muốn đổi ý tưởng hoặc cơ chế: sửa khối INFO trong `tools/upgrade-legacy.mjs` rồi chạy `node tools/upgrade-legacy.mjs`.
- Muốn đổi quy định chung cho mọi game (kể cả 12 file này): sửa `tools/lib/core.mjs` rồi chạy lại script.
