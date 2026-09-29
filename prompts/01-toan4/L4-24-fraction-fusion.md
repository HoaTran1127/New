# L4-24 — Fraction Fusion

- **Khối:** Toán 4
- **Mục tiêu:** Cộng phân số cùng mẫu.
- **Nhiệm vụ:** Ghép các phần để tạo tổng.
- **Điều khiển:** GRAB

## Prompt copy trực tiếp

```text
Tạo game giáo dục "Fraction Fusion" cho Toán lớp 4, 1 HTML duy nhất.
Mục tiêu: cộng phân số cùng mẫu và hiểu vì sao mẫu giữ nguyên.
Nhiệm vụ: pinch/grab kéo các phần phân số vào một thanh tổng hợp.
Gameplay: cho ví dụ như 2/7 + 3/7; hai thanh phân số được ghép thành 5/7. Không cộng mẫu. Tạo bẫy 5/14 và giải thích trực quan. Có generator ít nhất 10 bài và độ khó tăng dần.
Camera MediaPipe Hands, pinch/grab + release state, smoothing, confidence, cooldown, camera loading/error/calibration sau Start.
Đúng: fusion animation + điểm. Sai: giữ nguyên mô hình để chỉ ra mẫu không thay đổi.
Fallback mouse/touch. Có Start/Tutorial/Play/Summary/Replay. Không upload video, không TODO, 1 HTML.
```
