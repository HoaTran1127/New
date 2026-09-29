# E4-06 — Word Builder

- **Khối:** English 4
- **Mục tiêu:** Ghép chữ thành từ đúng.
- **Nhiệm vụ:** Kéo các chữ cái vào đúng vị trí.
- **Điều khiển:** GRAB

## Prompt copy trực tiếp

```text
Tạo game "Word Builder" cho English 4 trong 1 HTML duy nhất.
Mục tiêu: spelling và nhận biết cấu trúc từ.
Nhiệm vụ: dùng pinch/grab kéo các letter tiles vào đúng ô để ghép từ theo hình hoặc gợi ý.
Mỗi từ 3–7 ký tự, thêm tile nhiễu ở level cao. Tạo animation snap vào ô, phát âm từ sau khi hoàn thành và cho xem nghĩa/hình. Có ít nhất 50 từ theo chủ đề phù hợp.
Camera MediaPipe Hands với pinch press/hold/release, smoothing, confidence, cooldown. Không tính hover là kéo.
Fallback mouse drag/touch. Có difficulty, streak, hint giới hạn, summary/replay. Không upload video. Không TODO. 1 HTML.
```
