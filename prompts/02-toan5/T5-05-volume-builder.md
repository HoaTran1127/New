# T5-05 — Volume Builder

- **Khối:** Toán 5
- **Mục tiêu:** Hiểu thể tích hình hộp chữ nhật/hình lập phương và đơn vị khối.
- **Nhiệm vụ:** Xếp khối đơn vị rồi tính thể tích.
- **Điều khiển:** GRAB + TWO_HAND_STRETCH

## Prompt copy trực tiếp

```text
Tạo game "Volume Builder" cho Toán lớp 5 trong 1 HTML.
Mục tiêu: hiểu V = dài × rộng × cao và đơn vị cm³/dm³.
Nhiệm vụ: dùng pinch kéo khối lập phương đơn vị vào hộp, sau đó dùng hai tay kéo chiều cao.
Gameplay: xếp từng lớp; hiển thị số khối ở đáy, số tầng, tổng số khối. Sau khi xây xong chọn thể tích. Bẫy là dùng đơn vị cm² hoặc cộng ba kích thước.
Camera Hands; pinch/grab state và two-hand stretch; nếu không đủ confidence chuyển sang fallback.
Fallback mouse/touch. Có visual 3D giả lập bằng Canvas 2D/SVG, không cần Three.js nếu không cần.
Sai: animation lớp × tầng. Không upload video. 1 HTML, không TODO.
```
