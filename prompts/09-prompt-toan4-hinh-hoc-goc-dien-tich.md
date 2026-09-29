# Prompt Gemini Canvas: Game AR Toán 4 - Cánh Tay Ê-Ke & Pháo Đài Góc Hình Học

> **Môn học:** Toán Lớp 4 (SGK Chân Trời Sáng Tạo / Cánh Diều / Kết Nối Tri Thức)  
> **Chủ đề bài học:** Góc nhọn, góc vuông, góc tù, góc bẹt; Đường thẳng song song và vuông góc  
> **Khái niệm hình dung:** Đoạn thẳng & góc biến động theo thời gian thực (Real-time Dynamic Angle)  
> **Cử chỉ AR:** 2 cánh tay mở góc theo yêu cầu (nhỏ hơn 90°, đúng 90°, lớn hơn 90°, mở ngang 180°)

> **LEGACY (LEG-09)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 4 học chuyên đề "Góc Nhọn, Góc Vuông, Góc Tù, Góc Bẹt và Hình Học".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Giao diện: CSS nội tuyến trong một khối <style>, không dùng Tailwind Play CDN.
   - Biểu tượng: inline SVG, không tải FontAwesome.
      - MediaPipe Tasks Vision, phiên bản pin 1.0.1 (vision_bundle.mjs + wasm + hand_landmarker.task; pose_landmarker_lite.task nếu cần tư thế toàn thân)
   - Âm thanh: tổng hợp bằng Web Audio API, không dùng file mp3 ngoài.
2. Luôn lật ngang video webcam (transform: -scale-x-100) để tạo cảm giác soi gương AR.
3. Hỗ trợ dự phòng chuột/cảm ứng nếu học sinh không bật camera.

Cơ chế trực quan hóa toán học & Vận động cơ thể:
1. Hai bàn tay của học sinh được nối với nhau bằng tia laser AR phát sáng, tạo thành một góc hình học động trên màn hình:
   - Cổ tay / Lòng bàn tay trái làm đỉnh góc hoặc gốc tọa độ.
   - Bàn tay phải di chuyển mở rộng hoặc thu hẹp góc.
   - Trên màn hình hiển thị trực tiếp thước đo độ ảo (Protractor HUD) với số đo góc thời gian thực (°).
2. Quy định góc trong sách giáo khoa:
   - Góc nhọn: Lớn hơn 0° và bé hơn 90° (Màu xanh dương cyan).
   - Góc vuông: Đúng 90° (Màu vàng kim rực rỡ kèm ký hiệu vuông góc ■).
   - Góc tù: Lớn hơn 90° và bé hơn 180° (Màu tím neon).
   - Góc bẹt: Bằng 180° (Màu đỏ cam rực lửa, hai tay mở thẳng hàng).

Nhiệm vụ & Thử thách trong game:
1. Quái vật không gian hoặc thiên thạch mang biểu tượng các góc rơi từ trên xuống.
2. Nhiệm vụ hiện lên loa và HUD:
   - "Hãy mở GÓC TÙ để phóng khiên chắn năng lượng!" -> Học sinh phải dang 2 tay mở góc từ 95° đến 160°.
   - "Hãy tạo GÓC VUÔNG để kích hoạt đại bác Plasma!" -> Học sinh phải giơ 1 tay ngang, 1 tay dọc tạo góc xấp xỉ 90° (dung sai +/- 8°).
   - "Hãy tạo GÓC NHỌN để lách qua hẻm núi!" -> Học sinh khép 2 tay lại tạo góc dưới 80°.
3. Giữ tư thế chuẩn xác trong 1 giây để bắn hạ mục tiêu. Hiệu ứng laser quét và âm thanh synthesizer bùng nổ.
4. Nếu mở sai loại góc (ví dụ yêu cầu góc tù nhưng lại tạo góc nhọn): Khiên chắn phát nổ nứt màn hình (Cracked screen effect), trừ 1 tim và hiển thị thước đo chỉ rõ: "Góc hiện tại của bạn là 65° (Góc nhọn), cần mở rộng tay lớn hơn 90° nhé!".

Giao diện & Cảm giác chơi:
- Đồ họa Cyberpunk Học Đường, tạo cảm hứng như Iron Man đang vận hành giao diện ba chiều holographic.
- Điểm số tăng theo tốc độ phản xạ và độ chính xác của góc đo.

YÊU CẦU BẮT BUỘC THEO CHUẨN MiTi (áp dụng cho bản prompt legacy này):
1. NGÂN HÀNG DỮ LIỆU: khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau. Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet }; tối thiểu 40 mục chia 3 mức độ; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo trộn vị trí đáp án bằng seed theo lượt.
2. CAMERA: MediaPipe Tasks Vision pin phiên bản (vision_bundle.mjs@1.0.1 + wasm + hand_landmarker.task, pose_landmarker_lite.task nếu cần tư thế toàn thân). getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }); khung 4:3, crop nếu camera tỉ lệ khác, lật gương ngang khi hiển thị và tính tọa độ.
3. CHỈ XIN QUYỀN CAMERA SAU khi học sinh bấm BẮT ĐẦU. Trạng thái tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại). Có khung định vị để học sinh biết đặt tay ở đâu.
4. CHỐNG CHỐT NHẦM: làm mượt EMA alpha 0.4–0.5; cử chỉ chỉ fire ở lượt chuyển trạng thái kèm hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim; hover không phải hit; confidence thấp thì không chốt.
5. FALLBACK: chuột / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính, có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng không tải lại trang. CDN hoặc model lỗi thì tự chuyển sang chế độ không camera, game vẫn chơi đủ, mục tiêu học tập vẫn đủ 100%.
6. PHẢN HỒI HỌC TẬP: sai thì dừng 2 giây, chỉ rõ bước hoặc chữ số hoặc từ cần sửa, không hiệu ứng nào che lời giải; câu sai xếp vào CUỐI vòng chơi để luyện lại; màn tổng kết nhóm theo loiViet kiểu "Em hay sai ở: ..." kèm số câu đúng/sai theo mức độ.
7. Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em". Chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive dọc và ngang, có Pause, Replay, Giảm hiệu ứng chuyển động; không leaderboard, không quảng cáo.
8. RIÊNG TƯ: không upload ảnh/video từ camera, chỉ giữ landmark trong bộ nhớ, không thu thập dữ liệu cá nhân. Toàn bộ UI, tên nút, hướng dẫn, thông báo và lời giải bằng TIẾNG VIỆT; không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.
9. CHỮ KÝ MiTi (bắt buộc trong HTML): ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang hoặc màn kết quả có dòng "MiTi • Học bằng chuyển động"; không xóa hoặc đổi tên thương hiệu khi replay hay ở chế độ không camera.
10. ĐẦU RA: duy nhất 1 file HTML hoàn chỉnh, CSS nội tuyến trong một khối <style>, không file .css/.js/.json/ảnh/mp3 ngoài, không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không lỗi console khi mở trực tiếp bằng trình duyệt.
```
