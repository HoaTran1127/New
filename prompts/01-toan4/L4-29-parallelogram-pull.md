# L4-29 — Parallelogram Pull

- **Khối:** Toán 4 — nội dung mở rộng, cần đối chiếu SGK/PPCT cụ thể.
- **Mục tiêu:** Hiểu diện tích hình bình hành bằng cách biến đổi thành hình chữ nhật.
- **Nhiệm vụ:** Kéo phần thừa sang bên kia để biến thành hình chữ nhật.
- **Điều khiển:** TWO_HAND_STRETCH

## Prompt copy trực tiếp

```text
Tạo game giáo dục "Parallelogram Pull" cho Toán lớp 4 trong 1 HTML.
Mục tiêu: hiểu diện tích hình bình hành và mối quan hệ với hình chữ nhật.
Nhiệm vụ: dùng hai tay kéo phần tam giác ở một đầu sang đầu kia để biến hình bình hành thành hình chữ nhật.
Gameplay: hiển thị đáy và chiều cao; cho phép thao tác biến đổi hình; sau đó hỏi diện tích. Visual phải cho thấy chiều cao vuông góc và vì sao S = đáy × chiều cao. Bẫy nhầm dùng cạnh xiên làm chiều cao.
Camera MediaPipe Hands hai tay, tracking mượt, confidence, stretch threshold, cooldown, camera states.
Đúng + điểm; sai animate lại phép cắt-ghép và chỉ rõ chiều cao vuông góc.
Fallback mouse/touch. Không upload video, không TODO, 1 HTML.
```
