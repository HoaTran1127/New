# L4-21 — Fraction Ninja

- **Khối:** Toán 4
- **Mục tiêu:** Rút gọn phân số.
- **Nhiệm vụ:** Chém cặp tử và mẫu cùng chia hết cho một số.
- **Điều khiển:** SWIPE

## Prompt copy trực tiếp

```text
Tạo game giáo dục "Fraction Ninja" cho học sinh lớp 4 trong đúng 1 file HTML.
Mục tiêu: rút gọn phân số bằng cách tìm thừa số chung.
Nhiệm vụ: học sinh dùng ngón trỏ vung tay chém đúng thừa số chung để rút gọn phân số.
Gameplay: các phân số xuất hiện như mục tiêu ninja; mỗi round yêu cầu rút gọn một phân số. Hiển thị tử và mẫu lớn, các lựa chọn thừa số chung, chỉ chém thừa số hợp lệ. Sau mỗi bước animate phép chia cả tử và mẫu cho cùng số. Tạo ít nhất 10 câu hợp lệ.
Camera: MediaPipe Hands, xin quyền sau Start, có loading/camera-error/calibration, EMA, confidence, swipe threshold, debounce/cooldown và không spam event khi giữ tay.
Sai: giải thích “cả tử và mẫu phải cùng chia cho cùng một số”. Đúng: hiệu ứng chém + điểm + combo.
Fallback: mouse/touch mô phỏng swipe.
UI: Start → Camera Check → Tutorial → Practice → Play → Result → Replay. Chữ lớn, rõ.
Không upload video. Không TODO/pseudocode. Không npm/build. Trả toàn bộ HTML duy nhất.
```
