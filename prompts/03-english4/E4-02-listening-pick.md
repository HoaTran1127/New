# E4-02 — Listening Pick

- **Khối:** English 4
- **Mục tiêu:** Nghe và nhận biết từ/cụm từ tiếng Anh.
- **Nhiệm vụ:** Nghe từ rồi chọn hình đúng.
- **Điều khiển:** POINT

## Prompt copy trực tiếp

```text
Tạo game "Listening Pick" cho English 4 trong 1 HTML.
Mục tiêu: luyện listening ở cấp từ/cụm từ ngắn.
Nhiệm vụ: nghe từ tiếng Anh rồi chạm vào hình đúng trong 2–4 lựa chọn.
Dùng Web Speech API để phát âm; có nút Replay. Có thể dùng phrase ngắn như "go to school", "have breakfast", nhưng phải phù hợp trình độ. Hình được vẽ bằng emoji/SVG/CSS để không phụ thuộc asset bản quyền.
Random hóa vị trí đáp án. Có 3 mức: 2, 3, 4 lựa chọn. Generator ít nhất 50 items.
Camera MediaPipe Hands; fingertip POINT làm cursor; smoothing + confidence + cooldown để tránh double hit.
Sai: phát lại từ, làm nổi bật hình đúng và cho trẻ thử lại; không chỉ hiện X đỏ.
Fallback mouse/touch.
Có Start, Listening indicator, Replay audio, score, streak, result.
Không upload camera/audio. Không TODO. 1 HTML.
```
