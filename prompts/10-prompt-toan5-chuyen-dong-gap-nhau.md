# Prompt Gemini Canvas: Game AR Toán 5 - Cao Tốc Tốc Độ (Toán Chuyển Động Đều & Hai Xe Gặp Nhau)

> **Môn học:** Toán Lớp 5 (SGK Cánh Diều / Kết Nối Tri Thức / Chân Trời Sáng Tạo)  
> **Chủ đề bài học:** Vận tốc ($v$), Quãng đường ($s$), Thời gian ($t$); Hai chuyển động cùng chiều / ngược chiều gặp nhau  
> **Khái niệm hình dung:** Mô hình chuyển động thời gian thực trên trục tọa độ quãng đường, trực quan hóa $(v_1 + v_2) \times t = s$  
> **Cử chỉ AR:** 2 tay điều khiển 2 phương tiện + Vỗ tay (Clap) / Chạm tay đúng thời khắc hai xe gặp nhau

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 5 học chuyên đề "Toán Chuyển Động Đều: Vận tốc, Quãng đường, Thời gian và Hai vật gặp nhau".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Tailwind CSS (https://cdn.tailwindcss.com)
   - FontAwesome 6 (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)
   - MediaPipe Camera Utils (https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js)
   - MediaPipe Hands (https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js)
   - Tone.js (https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js)
2. Luôn lật ngang video webcam (transform: -scale-x-100) để tạo cảm giác soi gương AR.
3. Hỗ trợ dự phòng chuột/cảm ứng nếu học sinh không bật camera.

Cơ chế trực quan hóa bài toán chuyển động:
1. Màn hình hiển thị một cung đường đua nối giữa Thành phố A và Thành phố B (Ví dụ: khoảng cách AB = 150 km).
2. Xe ô tô màu đỏ xuất phát từ A với vận tốc v1 = 50 km/h.
   Xe máy màu xanh xuất phát từ B ngược chiều về A với vận tốc v2 = 25 km/h.
3. Đồng hồ thời gian mô phỏng (Virtual Clock) chạy từng giờ:
   - Sau 1 giờ: Quãng đường còn lại = 150 - (50 + 25) = 75 km.
   - Sau 2 giờ: Quãng đường rút ngắn về 0 km -> Hai xe gặp nhau!
   - Trực quan hóa công thức: Thời gian gặp nhau t = s : (v1 + v2) = 150 : 75 = 2 giờ!
4. Giúp học sinh hiểu sâu sắc: Cứ mỗi giờ trôi qua, hai xe lại cùng nhau rút ngắn một quãng đường bằng tổng hai vận tốc (v1 + v2).

Cơ chế vận động thể chất AR:
1. Bàn tay trái của bé điều khiển Xe A, bàn tay phải điều khiển Xe B.
2. Trên cung đường xuất hiện các biển báo mốc thời gian và câu hỏi:
   - "Hai xe sẽ gặp nhau sau bao nhiêu giờ?" -> Ba cổng năng lượng hiện ra: [2 giờ], [3 giờ], [1.5 giờ].
   - Học sinh giơ tay đẩy xe lao qua cổng thời gian chính xác [2 giờ].
3. Thử thách bắt trọn điểm hẹn (Rendezvous Clap): Khi hai xe tiến sát đến vị trí gặp nhau trên đường, học sinh phải vỗ 2 bàn tay vào nhau (khoảng cách 2 lòng bàn tay < 60px) đúng tại vị trí cờ hoa để hoàn tất thử thách đón khách an toàn.
4. Nếu chọn nhầm thời gian hoặc tính sai vận tốc: Hai xe bị chết máy, màn hình rung chuyển và nứt kính (Cracked glass), hiện bảng phân tích: "Sau 1 giờ hai xe đi được: 50 + 25 = 75 km. Vậy để đi hết 150 km cần: 150 : 75 = 2 giờ nhé!".

Giao diện & Cảm giác chơi:
- Giao diện như một bảng điều khiển trung tâm kiểm soát giao thông thông minh trong phim hoạt hình viễn tưởng.
- Có âm thanh còi xe vui nhộn, tiếng động cơ rồ ga chân thực khi trả lời đúng, tiếng phanh xe kít kít khi trả lời sai.
- 5 mạng chơi, thanh tiến trình quãng đường động chạy từ 0% đến 100%.
```
