# ⚔️ PROMPT MẪU 3: MATH NINJA BUBBLE POP (CHÉM BONG BÓNG TOÁN HỌC)

> **Mô tả:** Cơ chế Fruit Ninja / Chém bóng. Các bong bóng mang số thập phân và phân số bay từ dưới lên theo đường cong parabol, người chơi vung tay chém vỡ bong bóng thỏa mãn điều kiện.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Hãy tạo một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "MATH NINJA BUBBLE POP - KIẾM THỦ TOÁN HỌC".

### CƠ CHẾ GAMEPLAY:
1. **Camera AI Hand Tracking:**
   - Dùng Google MediaPipe Hands nhúng qua CDN (`@mediapipe/hands` và `@mediapipe/camera_utils`).
   - Lấy tọa độ ngón trỏ hoặc bàn tay để tạo hiệu ứng "Lưỡi Kiếm Ánh Sáng Laser (Laser Katana)".
   - Vệt chém (Blade Trail) phát sáng rực rỡ màu xanh ngọc hoặc tím neon, mờ dần theo chuyển động vung tay.
   - Khi tay vung nhanh cắt qua bong bóng (Line Segment Intersection), bong bóng sẽ bị chém đứt đôi!

2. **Bong Bóng Bay Theo Đường Cong Parabol (Fruit Ninja Style):**
   - Các quả bong bóng nhiều màu sắc được bắn từ đáy màn hình bay vút lên trên rồi rơi xuống theo lực hấp dẫn gravity.
   - Bên trong mỗi quả bóng chứa một phép tính hoặc một con số (Toán Lớp 4 hoặc Lớp 5).

3. **Luật Chơi Thử Thách:**
   - Đề bài đưa ra yêu cầu ở đầu màn hình (Ví dụ: "Hãy chém các số chia hết cho 9!" hoặc "Chém các phép tính ĐÚNG!").
   - Chém trúng bóng HỢP LỆ: Bóng vỡ đôi, phát nổ hạt lấp lánh, âm thanh kiếm chém sắc bén (Tone.js), điểm số bay lên (+10 x Combo).
   - Chém nhầm bóng BẪY: Mất 1 mạng, xuất hiện sấm sét hoặc chớp đỏ cảnh báo.
   - Bỏ lỡ bóng hợp lệ rơi xuống đáy màn hình: Mất chuỗi Combo.

4. **Đồ Họa & Âm Thanh:**
   - Font chữ hoạt hình tiếng Việt (Fredoka, Outfit).
   - Đồ họa Canvas 2D mượt mà 60 FPS.
   - Âm thanh vung kiếm và tiếng bóng nổ "BOP" giòn giã được tổng hợp hoàn toàn bằng Tone.js.

Toàn bộ gói gọn trong 1 file HTML hoàn chỉnh sẵn sàng chạy trên trình duyệt máy tính.
```
