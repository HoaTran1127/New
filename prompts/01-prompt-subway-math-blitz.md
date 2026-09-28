# 🎯 PROMPT MẪU 1: SUBWAY MATH BLITZ AR (CHIẾN THẦN CỬU CHƯƠNG & TOÁN 4-5)

> **Mô tả:** Prompt tái tạo chính xác cơ chế của tựa game trong link bạn đã gửi: Thẻ bài rơi tự do phong cách Subway Surfers, người chơi dùng 1 bàn tay đấm thẻ đúng, né thẻ sai, nếu đấm nhầm thì kính màn hình vỡ toảng.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Hãy tạo một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "SUBWAY MATH BLITZ - CHIẾN THẦN TOÁN HỌC".

### CƠ CHẾ GAMEPLAY:
1. **Camera AI Hand Tracking:**
   - Dùng MediaPipe Hands (`@mediapipe/hands` và `@mediapipe/camera_utils`) để phát hiện 1 bàn tay của người chơi qua webcam.
   - Lật gương webcam (`transform: -scale-x-100`) và áp dụng bộ lọc mượt EMA để tay di chuyển ổn định.
   - Vẽ tâm ngắm đấm bốc 🥊 tại tọa độ bàn tay, kèm vệt kiếm neon rực rỡ bám theo tay.
   - Hỗ trợ cả chuột (click) và cảm ứng để phòng khi không có camera.

2. **Thẻ Bài Rơi (Subway Surfers Style):**
   - Màn hình chia thành 3 làn chạy. Các thẻ phép tính rơi đều từ trên xuống.
   - Thẻ được thiết kế hình chữ nhật bo góc, viền neon, có 5 chủ đề màu ngẫu nhiên: Chuối Vàng 🍌, Ván Trượt Xanh 🛹, Tên Lửa Hồng 🚀, Giày Nhún Lục 👟, Hộp Quà Tím 🎁.
   - Trên mỗi thẻ hiển thị phép tính Toán học (ví dụ: "7 × 8 = 56" hoặc "3/4 + 1/4 = 1").

3. **Luật Chơi & Thưởng Phạt:**
   - Người chơi có 5 Máu (trái tim ❤️).
   - Vung tay đấm trúng thẻ ĐÚNG:
     * Cộng điểm (+10 x Combo).
     * Nổ 24 mảnh hạt tung tóe và sóng chấn động.
     * Âm thanh nhặt xu vui nhộn (Tone.PolySynth) tăng cao độ theo chuỗi combo.
   - Đấm nhầm vào thẻ SAI:
     * Bị trừ 1 Máu.
     * Màn hình chớp đỏ, xuất hiện 15 tia rạn nứt kính mạng nhện tỏa ra từ điểm đấm.
     * Âm thanh kính vỡ toảng (Tone.NoiseSynth + Tone.PolySynth).
     * Rung nhẹ màn hình và hiện banner giải thích chi tiết đáp án đúng.
   - Hết 5 máu: Hiện bảng Game Over tổng kết điểm số, kỷ lục High Score và nút chơi lại.

4. **Nội Dung Bài Toán:**
   - Hỗ trợ chọn chủ đề:
     * Bảng Cửu Chương nhân chia 2 đến 9
     * Toán Lớp 4: Nhân nhẩm 11, cộng phân số cùng mẫu, đổi đơn vị m², tấn tạ yến
     * Toán Lớp 5: Tính nhẩm số thập phân (0.25 × 4, 0.5 × 6), tỉ số %, vận tốc s = v × t.
   - Tỉ lệ: 60% thẻ đúng, 40% thẻ sai làm bẫy.

Toàn bộ code gói gọn trong 1 file HTML, dùng Tailwind CSS CDN, Tone.js CDN, MediaPipe CDN, có giao diện hoạt hình màu sắc rực rỡ, sẵn sàng chạy ngay.
```
