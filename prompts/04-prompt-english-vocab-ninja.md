# 🇬🇧 PROMPT MẪU 4: ENGLISH VOCABULARY NINJA AR (GAME TIẾNG ANH VẬN ĐỘNG)

> **Mô tả:** Game AR tương tác vận động dành cho môn Tiếng Anh Tiểu học (Lớp 3, 4, 5). Các từ vựng tiếng Anh rơi xuống, học sinh vung tay chém đúng từ theo yêu cầu đề bài (ví dụ: "Chém các loài động vật 🐯", "Chém các loại trái cây 🍎", hoặc "Chém từ đồng nghĩa / trái nghĩa").

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Bạn là một Chuyên gia Lập trình Game Giáo dục Web AR (HTML5, Canvas 2D, MediaPipe, Tone.js).
Hãy tạo cho tôi một game Web AR tương tác vận động 1 file HTML hoàn chỉnh có tên "ENGLISH WORD NINJA AR - HIỆP SĨ TỪ VỰNG TIẾNG ANH" dành cho học sinh tiểu học (Lớp 4 & 5).

### 1. CƠ CHẾ VẬN ĐỘNG THỂ CHẤT (KINÊSTHETIC AR):
- Dùng Google MediaPipe Hands nhúng qua CDN (`@mediapipe/hands` và `@mediapipe/camera_utils`).
- Camera lật gương (`transform: -scale-x-100`) và áp dụng bộ lọc mượt EMA để tay vung kiếm mượt mà.
- Học sinh đứng cách camera 1.5m - 2m, dùng 1 bàn tay như lưỡi kiếm ánh sáng Laser Neon vung chém vào không khí để chém vỡ các thẻ từ vựng đúng.
- Hỗ trợ cả chuột (click/move) để học sinh vẫn chơi được nếu máy tính chưa có webcam.

### 2. CƠ CHẾ GAMEPLAY & LUẬT CHƠI:
- Đề bài hiển thị ở đầu màn hình (Ví dụ: "NHIỆM VỤ: CHÉM CÁC TỪ THUỘC CHỦ ĐỀ ĐỘNG VẬT (ANIMALS) 🦁").
- Các thẻ từ vựng rơi từ trên xuống theo 3 làn chạy.
- Thẻ mang TỪ ĐÚNG (thuộc chủ đề): Vung tay chém trúng sẽ +10 điểm x Combo, thẻ nổ hạt sao rực rỡ kèm tiếng chuông nhặt xu vang lên (Tone.PolySynth).
- Thẻ mang TỪ SAI (bẫy - ví dụ lẫn từ thuộc chủ đề Fruits hoặc School): Nếu chém nhầm, màn hình nứt vỡ toảng mạng nhện, trừ 1 Máu và hiện nghĩa tiếng Việt cảnh báo.
- Có 5 Máu (trái tim ❤️), hết máu hiện bảng Game Over và High Score.

### 3. NỘI DUNG TỪ VỰNG TIẾNG ANH TIỂU HỌC:
Tự động sinh ngẫu nhiên theo các chủ đề bám sát SGK Tiếng Anh Lớp 4 & 5:
- Chủ đề 1: Animals 🐶 (Tiger, Elephant, Monkey, Dolphin, Penguin...)
- Chủ đề 2: Fruits & Food 🍎 (Apple, Banana, Orange, Pizza, Bread...)
- Chủ đề 3: School Things 📚 (Pencil, Ruler, Notebook, Eraser, Backpack...)
- Chủ đề 4: Jobs & Occupations 👨‍⚕️ (Doctor, Teacher, Pilot, Farmer, Cook...)
- Chủ đề 5: Opposites (Từ trái nghĩa: Big - Small, Fast - Slow, Hot - Cold...)

### 4. ĐỒ HỌA & ÂM THANH:
- Toàn bộ gói gọn trong 1 file HTML duy nhất.
- Dùng Tailwind CSS CDN + Google Fonts (Fredoka, Outfit).
- Âm thanh tự tổng hợp bằng Tone.js (không dùng file mp3 ngoài).
- Màu sắc rực rỡ phong cách EdTech hoạt hình.

Hãy viết trọn vẹn toàn bộ mã nguồn HTML, CSS và JavaScript hoàn chỉnh, sẵn sàng chạy ngay khi mở file!
```
