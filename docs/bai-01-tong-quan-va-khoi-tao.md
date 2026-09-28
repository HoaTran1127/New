# Bài 1: Tổng Quan & Khởi Tạo Dự Án Game Toán AR

## 1. Mục tiêu bài học
- Hiểu nguyên lý hoạt động của một tựa game Thực Tế Ảo (Augmented Reality - AR) chạy trực tiếp trên trình duyệt Web (Web AR).
- Chuẩn bị cấu trúc thư mục tiêu chuẩn, dễ mở rộng và thêm bớt môn học về sau.
- Nhúng các thư viện mã nguồn mở cần thiết qua CDN (không cần cài đặt Node.js hay build tool phức tạp).

---

## 2. Nguyên lý Web AR không cần cài đặt
Thông thường, các ứng dụng AR đòi hỏi người dùng phải tải ứng dụng từ App Store / Google Play hoặc cài đặt kính VR đắt tiền. Tuy nhiên, với học sinh tiểu học:
- **Rào cản cài đặt:** Máy tính ở trường học hoặc laptop gia đình thường bị giới hạn quyền cài đặt phần mềm.
- **Giải pháp Web AR:** Chúng ta sử dụng luồng camera webcam từ thẻ HTML5 `<video>`, sau đó dùng mô hình AI thị giác máy tính chạy bằng WebAssembly/WebGL (**Google MediaPipe**) để nhận diện bàn tay theo thời gian thực (30 - 60 FPS).
- **Vẽ đè đồ họa:** Phía trên video webcam, chúng ta phủ một thẻ `<canvas>` trong suốt để vẽ các hiệu ứng game (thẻ phép tính, hạt nổ, vết kiếm chém, kính vỡ).

```
[ Webcam Máy Tính ] ──> [ Google MediaPipe AI ] ──> [ Tọa độ Bàn Tay (X, Y) ]
                                                                 │
                                                                 ▼
[ Màn hình Game ] <── [ HTML5 Canvas Đồ Họa ] <── [ Kiểm tra Va Chạm với Thẻ ]
```

---

## 3. Các thư viện cốt lõi được sử dụng
Chúng ta nhúng trực tiếp qua thẻ `<script>` từ mạng phân phối nội dung (CDN) uy tín:

1. **Google MediaPipe Hands:**
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
   <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
   ```
2. **Tone.js (Bộ tạo âm thanh Synthesizer):**
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js" crossorigin="anonymous"></script>
   ```
   *Lợi ích:* Không cần lưu trữ các file nhạc `.mp3` nặng nề, âm thanh phát sinh tức thời, không bị trễ (zero latency).
3. **Tailwind CSS & Google Fonts:**
   Giúp giao diện phong cách hoạt hình (Fredoka) và số thể thao (Outfit) thân thiện với học sinh.

---

## 4. Tư duy thiết kế tách lớp (Separation of Concerns)
Để bạn có thể thêm bài tập lớp 1, 2, 3, 4, 5 hay thậm chí môn Tiếng Anh, Lịch Sử về sau, dự án chia làm 3 lớp riêng biệt:

1. **Lớp Lõi (Core Engine):** Nằm trong `src/core/` (nhận diện tay, phát âm thanh, vẽ hạt nổ). Lớp này hoàn toàn độc lập với nội dung học.
2. **Lớp Dữ Liệu (Data Topics):** Nằm trong `src/data/`. Mỗi chủ đề toán học là một file độc lập. Muốn thêm dạng toán mới, bạn chỉ cần tạo thêm 1 file hoặc viết thêm vài dòng code mà không cần động vào logic game!
3. **Lớp Trò Chơi (Games):** Nằm trong `games/`. Mỗi thư mục là một tựa game với cơ chế chơi khác nhau nhưng dùng chung Lớp Lõi và Lớp Dữ Liệu.

---

👉 **Ở bài tiếp theo:** Chúng ta sẽ cùng nhau tìm hiểu cách bật Webcam và khai thác 21 khớp xương bàn tay của MediaPipe để bắt cử chỉ vung đấm!
