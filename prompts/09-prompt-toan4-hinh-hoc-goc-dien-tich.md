# Prompt Gemini Canvas: Game AR Toán 4 - Cánh Tay Ê-Ke & Pháo Đài Góc Hình Học

> **Môn học:** Toán Lớp 4 (SGK Chân Trời Sáng Tạo / Cánh Diều / Kết Nối Tri Thức)  
> **Chủ đề bài học:** Góc nhọn, góc vuông, góc tù, góc bẹt; Đường thẳng song song và vuông góc  
> **Khái niệm hình dung:** Đoạn thẳng & góc biến động theo thời gian thực (Real-time Dynamic Angle)  
> **Cử chỉ AR:** 2 cánh tay mở góc theo yêu cầu (nhỏ hơn 90°, đúng 90°, lớn hơn 90°, mở ngang 180°)

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 4 học chuyên đề "Góc Nhọn, Góc Vuông, Góc Tù, Góc Bẹt và Hình Học".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Tailwind CSS (https://cdn.tailwindcss.com)
   - FontAwesome 6 (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)
   - MediaPipe Camera Utils (https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js)
   - MediaPipe Hands (https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js)
   - Tone.js (https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js)
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
```
