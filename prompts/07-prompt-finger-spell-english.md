# 🐝 PROMPT MẪU 7: AR SPELLING BEE & PHONICS (GHÉP CHỮ TIẾNG ANH VẬN ĐỘNG)

> **Mô tả:** Game AR tương tác ngón tay (Finger Pinch / Touch). Học sinh đứng trước camera, dùng đầu ngón trỏ hoặc cử chỉ chạm tay để bắt các quả bóng chữ cái (A, B, C, D...) bay lơ lửng nhằm ghép thành từ vựng tiếng Anh theo yêu cầu.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Bạn là một Chuyên gia Lập trình Game Giáo dục Web AR (HTML5, Canvas 2D, MediaPipe, Tone.js).
Hãy tạo cho tôi một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "AR SPELLING BEE - ONG NHÍ GHÉP CHỮ TIẾNG ANH" dành cho học sinh tiểu học.

### 1. CƠ CHẾ TƯƠNG TÁC VẬN ĐỘNG:
- Dùng MediaPipe Hands nhúng qua CDN (`@mediapipe/hands` và `@mediapipe/camera_utils`).
- Đầu ngón tay trỏ của học sinh (Landmark 8) được biểu diễn như một "Chiếc Đũa Phép Ngôi Sao ⭐" phát sáng vệt cầu vồng.
- Khi đầu ngón tay chạm vào một bong bóng chữ cái (khoảng cách < bán kính bóng), quả bóng sẽ vỡ "POP" và chữ cái đó bay vào ô trống ghép từ.

### 2. CƠ CHẾ BÀI HỌC GHÉP TỪ:
- Trên đỉnh màn hình hiển thị hình ảnh gợi ý hoặc nghĩa tiếng Việt (Ví dụ: "Hình con voi 🐘" hoặc nghĩa "Quả táo").
- Bên dưới là các ô chữ còn thiếu: `E _ E P H _ N T` hoặc `A _ _ L E`.
- Các bong bóng mang các chữ cái khác nhau (cả chữ đúng và chữ bẫy) bay lơ lửng xung quanh người chơi.
- Học sinh phải vận động vươn tay sang trái, phải, lên cao để chạm đúng các chữ cái còn thiếu theo thứ tự chính xác.

### 3. THƯỞNG PHẠT & ÂM THANH:
- Chọn đúng chữ cái: Chữ bay vào vị trí khuyết, nổ hạt sao vàng, âm thanh nốt nhạc cao dần theo từng chữ cái ghép được.
- Hoàn thành trọn vẹn từ: Phát âm thanh chiến thắng (Victory Chime) và hiện phiên âm + nghĩa đầy đủ.
- Chọn nhầm chữ bẫy: Bóng phát nổ khói xám, âm thanh buzzer lỗi, trừ 1 lượt thử.

### 4. ĐỒ HỌA & CÔNG NGHỆ:
- 1 File HTML duy nhất, dùng Tailwind CSS CDN, font Fredoka vui nhộn.
- Âm thanh sống động bằng Tone.js.
- Hỗ trợ click chuột phòng khi không có camera.

Hãy viết trọn vẹn toàn bộ mã nguồn HTML, CSS và JavaScript hoàn chỉnh, sẵn sàng chạy ngay khi mở file!
```
