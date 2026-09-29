# E4-10 — Word Whack

- **Khối:** English 4
- **Mục tiêu:** Nhận diện từ mục tiêu nhanh.
- **Nhiệm vụ:** Đập/chạm đúng từ khi nó xuất hiện.
- **Điều khiển:** PUNCH

## Prompt copy trực tiếp

```text
Tạo game "Word Whack" cho English 4 trong 1 HTML.
Mục tiêu: nhận diện nhanh từ vựng theo chủ đề.
Nhiệm vụ: dùng cú punch để đập thẻ chứa từ được yêu cầu.
Thẻ xuất hiện ở các vị trí khác nhau. Mỗi round yêu cầu một từ/hình. Chỉ punch thật mới hit; hover không được tính. Có target speed tăng dần nhưng vẫn ưu tiên accuracy. Bẫy là từ cùng chủ đề nhưng khác mục tiêu.
Camera MediaPipe Hands; fist/strike pulse với velocity threshold + cooldown; smoothing + confidence.
Fallback click. Đúng +10 và combo; sai không trừ quá nặng, cho xem nghĩa/hình.
Có 30/60/90 giây, result/replay, local high score. Không upload video. 1 HTML.
```
