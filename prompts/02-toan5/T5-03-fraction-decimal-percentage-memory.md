# T5-03 — Fraction Decimal Percentage Memory

- **Khối:** Toán 5
- **Mục tiêu:** Liên hệ phân số, số thập phân và phần trăm.
- **Nhiệm vụ:** Tìm bộ ba biểu diễn cùng một giá trị.
- **Điều khiển:** POINT

## Prompt copy trực tiếp

```text
Tạo game memory "Fraction Decimal Percentage" cho Toán lớp 5 trong 1 HTML.
Mục tiêu: nhận biết các biểu diễn tương đương fraction ↔ decimal ↔ percentage.
Nhiệm vụ: lật thẻ và tìm đúng bộ ba.
Gameplay: mỗi session có 12–18 thẻ; ví dụ 1/2, 0.5, 50%. Có feedback trực quan bằng thanh 100%. Trộn vị trí mỗi session. Bẫy phải phản ánh lỗi đổi 0.5 thành 5% hoặc 1/4 thành 0.4.
Camera MediaPipe Hands fingertip point; debounce để tránh mở hai thẻ cùng lúc.
Fallback click/touch. Có 3 mức, score nhẹ, result/replay. Không upload video. 1 HTML.
```
