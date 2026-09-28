# Prompt Gemini Canvas: Game AR Toán 5 - Kiến Trúc Sư Khối 3D (Thể Tích Hình Hộp Chữ Nhật & Lập Phương)

> **Môn học:** Toán Lớp 5 (SGK Cánh Diều / Kết Nối Tri Thức / Chân Trời Sáng Tạo)  
> **Chủ đề bài học:** Thể tích hình hộp chữ nhật và hình lập phương ($V = a \times b \times c$, $V = a^3$); Xăng-ti-mét khối, Đề-xi-mét khối  
> **Khái niệm hình dung:** Mô hình không gian 3D isometric xếp từng lớp khối lập phương đơn vị ($1\text{ cm}^3$) lấp đầy chiều dài, chiều rộng và chiều cao  
> **Cử chỉ AR:** 2 tay nhấc khối lập phương thả vào hộp + Vuốt tay từ dưới lên trên để nâng số tầng (chiều cao)

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 5 học chuyên đề "Thể Tích Hình Hộp Chữ Nhật và Hình Lập Phương".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Tailwind CSS (https://cdn.tailwindcss.com)
   - FontAwesome 6 (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)
   - MediaPipe Camera Utils (https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js)
   - MediaPipe Hands (https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js)
   - Tone.js (https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js)
2. Luôn lật ngang video webcam (transform: -scale-x-100) để tạo cảm giác soi gương AR.
3. Hỗ trợ dự phòng chuột/cảm ứng nếu học sinh không bật camera.

Cơ chế trực quan hóa toán học:
1. Màn hình vẽ một chiếc lồng kính hình hộp chữ nhật trong suốt dưới góc nhìn Isometric 3D với kích thước cho trước:
   - Ví dụ: Chiều dài a = 4 cm, Chiều rộng b = 3 cm, Chiều cao c = 2 cm.
2. Trực quan hóa từng bước giúp bé hiểu rõ bản chất công thức:
   - Bước 1 (Diện tích đáy): Một hàng có 4 khối 1 cm³. Có 3 hàng như vậy -> 1 lớp đáy có 4 x 3 = 12 khối.
   - Bước 2 (Thể tích toàn khối): Cần xếp 2 tầng như thế -> Tổng số khối = 12 x 2 = 24 khối 1 cm³ = 24 cm³!
   - Học sinh nhìn thấy từng khối phát sáng xếp lớp chồng lên nhau, khắc sâu vì sao Thể tích = Dài x Rộng x Cao = Diện tích đáy x Chiều cao!

Cơ chế vận động thể chất AR:
1. Tay của học sinh mang găng tay cơ khí phát sáng AR.
2. Thử thách 1 - Xếp đáy hộp: Học sinh vung tay kéo các khối lập phương phát sáng thả vào mặt đáy hộp để lấp đầy 4 x 3 ô.
3. Thử thách 2 - Nâng chiều cao: Khi đáy đã đầy, học sinh dùng cả hai bàn tay hướng lên trời và đẩy người vươn cao (Vertical Reach) để nhân đôi số tầng, hoàn thiện chiếc hộp 3D lộng lẫy.
4. Thử thách 3 - Tính toán thể tích: Ba con số thể tích rơi xuống kèm đơn vị (cm³ vs cm² vs dm³):
   - Đáp án đúng: [24 cm³]
   - Đáp án bẫy: [24 cm²] (sai đơn vị diện tích), [9 cm³] (cộng nhầm 4+3+2), [18 cm³]
   - Học sinh vung tay đấm vỡ khối đáp án chính xác để nhận cúp Kiến Trúc Sư Vàng.
5. Nếu chọn nhầm đáp án bẫy đơn vị: Hộp kính nứt vỡ rạn nát, hiện dòng nhắc: "Thể tích phải đo bằng xăng-ti-mét KHỐI (cm³), không phải xăng-ti-mét vuông (cm²) nhé!".

Giao diện & Cảm giác chơi:
- Phong cách game xây dựng khối như Minecraft / Lego Hologram trong phòng thí nghiệm tương lai.
- Mỗi lần thả khối phát ra âm thanh gõ gỗ/thủy tinh vui tai, khi hoàn thành khối hộp phát nhạc khải hoàn huy hoàng.
```
