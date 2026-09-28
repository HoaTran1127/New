# Prompt Gemini Canvas: Game AR Toán 4 - Bí Ẩn Sơ Đồ Đoạn Thẳng (Tìm Hai Số Khi Biết Tổng Và Tỉ Số)

> **Môn học:** Toán Lớp 4 (Chương trình mới - Cánh Diều, Kết Nối Tri Thức, Chân Trời Sáng Tạo)  
> **Chủ đề bài học:** Tìm hai số khi biết Tổng và Tỉ số / Tổng và Hiệu  
> **Khái niệm hình dung:** Sơ đồ đoạn thẳng động (Dynamic Line Segment Diagram) trực quan hóa các phần bằng nhau  
> **Cử chỉ AR:** 2 tay kéo dãn đoạn thẳng + Vung tay đấm chọn quả cầu năng lượng (1 phần / số lớn / số bé)

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 4 học chuyên đề "Tìm hai số khi biết Tổng và Tỉ số".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Tailwind CSS (https://cdn.tailwindcss.com)
   - FontAwesome 6 (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)
   - MediaPipe Camera Utils (https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js)
   - MediaPipe Hands (https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js)
   - Tone.js (https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js)
2. Luôn lật ngang video webcam (transform: -scale-x-100) để tạo cảm giác soi gương AR.
3. Hỗ trợ dự phòng chuột/cảm ứng nếu học sinh không bật camera.

Cơ chế trực quan hóa toán học (Trọng tâm giáo dục):
1. Mỗi màn chơi đưa ra một bài toán thực tế sinh động:
   - Ví dụ: "Lớp 4A thu gom được 45 kg giấy vụn. Số kg giấy vụn của tổ 1 bằng 2/3 số kg của tổ 2. Hỏi mỗi tổ thu được bao nhiêu kg?"
   - Màn hình AR vẽ SƠ ĐỒ ĐOẠN THẲNG TRỰC QUAN:
     + Thanh Tổ 1: 2 ô năng lượng Neon màu xanh lục [ ■ ][ ■ ]
     + Thanh Tổ 2: 3 ô năng lượng Neon màu vàng cam [ ■ ][ ■ ][ ■ ]
     + Tổng số ô = 2 + 3 = 5 ô bằng nhau, tổng = 45 kg.
2. Học sinh hình dung ngay: 5 ô = 45 kg => 1 ô = 45 : 5 = 9 kg.
   - Tổ 1 = 9 x 2 = 18 kg.
   - Tổ 2 = 9 x 3 = 27 kg.

Cơ chế vận động thể chất AR:
1. Giai đoạn 1 (Đếm phần): Học sinh giơ 2 bàn tay mở rộng ngang ngực tương ứng với sơ đồ đoạn thẳng để kích hoạt bài toán.
2. Giai đoạn 2 (Chọn đáp án): Ba quả cầu năng lượng mang các đáp án rơi xuống hoặc bay lơ lửng:
   - Một quả mang đáp án đúng: [1 phần = 9kg, Số bé = 18kg, Số lớn = 27kg]
   - Hai quả bẫy sai lầm phổ biến: [1 phần = 5kg (quên chia)], [Số bé = 15kg, Số lớn = 30kg (tính nhầm)]
3. Học sinh vung tay đấm (Punch) vào quả cầu đúng để ghi 100 điểm kèm âm thanh chiến thắng synthesizer rực rỡ và hiệu ứng pháo hoa hạt nổ (Particle Burst).
4. Nếu đấm nhầm đáp án bẫy: Màn hình nứt vỡ (Cracked Glass Effect), phát âm thanh trầm cảnh báo, trừ 1 tim và hiển thị ngay lời giải thích ngắn gọn: "Nhớ lấy Tổng (45) chia cho Tổng số phần (2+3=5) để ra 1 phần = 9 nhé!".

Giao diện & Trải nghiệm:
- Bảng HUD phong cách Sci-Fi Cyberpunk hiện đại dành cho trẻ em (màu sắc tươi sáng, font Fredoka/Outfit).
- Hiển thị 5 Trái Tim Máu, Điểm số, Chuỗi Combo x2 x3 khi làm đúng liên tiếp.
- Màn hình Game Over / Chiến Thắng có nút Chơi Lại (Play Again).
```
