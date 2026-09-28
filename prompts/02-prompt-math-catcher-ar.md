# 🍏 PROMPT MẪU 2: AR MATH CATCHER (HỨNG QUẢ TOÁN HỌC)

> **Mô tả:** Cơ chế hứng đồ rơi (Catcher Mechanics). Học sinh di chuyển bàn tay làm chiếc Giỏ hứng 🧺 để bắt các quả táo/bong bóng mang phép tính ĐÚNG và né quả bom SAI.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Hãy tạo một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "AR MATH CATCHER - GIỎ HỨNG TOÁN HỌC".

### CƠ CHẾ GAMEPLAY:
1. **Camera AI Hand Tracking:**
   - Dùng Google MediaPipe Hands nhúng qua CDN (`@mediapipe/hands` và `@mediapipe/camera_utils`).
   - Lấy tọa độ bàn tay của người chơi qua webcam để điều khiển một "Chiếc Giỏ Hứng 🧺" di chuyển ngang ở phía đáy màn hình.
   - Hỗ trợ di chuyển chuột hoặc vuốt chạm cảm ứng phòng khi không có camera.

2. **Quả Táo Toán Học Rơi Tự Do:**
   - Các quả cầu / quả táo mang phép tính toán học (Toán Lớp 4 & 5) rơi từ trên xuống với vận tốc ngẫu nhiên.
   - Quả táo ĐÚNG: Có màu Xanh Ngọc Lục Bảo (#10B981) phát sáng viền trắng.
   - Quả táo SAI: Có màu Đỏ Cam Cảnh Báo (#EF4444) phát sáng.

3. **Luật Chơi:**
   - Người chơi có 3 Máu.
   - Hứng được Quả Đúng: +10 điểm, nổ hạt sao màu xanh lá, âm thanh "Pop" vui tai (Tone.MembraneSynth).
   - Hứng nhầm Quả Sai: -1 máu, nổ mảnh vỡ đỏ, âm thanh cảnh báo lỗi (Tone.NoiseSynth), hiện dòng thông báo giải thích ngắn vì sao phép tính bị sai.
   - Hết máu hiện Game Over và nút chơi lại.

4. **Nội Dung Học Tập:**
   - Tự động sinh ngẫu nhiên các câu hỏi Toán Lớp 4 & 5:
     * Cộng trừ phân số: 2/5 + 1/5 = 3/5
     * Phép tính số thập phân: 1.2 + 0.8 = 2.0
     * Tỉ số phần trăm: 50% của 200 = 100
     * Công thức chuyển động: s = v × t.
   - Tỉ lệ: 65% quả đúng, 35% quả sai.

Tất cả nằm trong 1 file HTML duy nhất, không dùng file mp3 ngoài, giao diện Tailwind CSS đẹp mắt, font chữ Fredoka vui nhộn.
```
