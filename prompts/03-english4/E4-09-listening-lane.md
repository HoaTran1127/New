# E4-09 — Listening Lane

- **Khối:** English 4
- **Mục tiêu:** Nghe từ/cụm từ và phản xạ nhận biết.
- **Nhiệm vụ:** Chọn làn chứa đáp án mình vừa nghe.
- **Điều khiển:** STEP

## Prompt copy trực tiếp

```text
Tạo game "Listening Lane" cho English 4 trong 1 HTML.
Mục tiêu: listening recognition.
Nhiệm vụ: nghe từ/cụm từ rồi bước sang lane chứa từ hoặc hình đúng.
Mỗi câu có 3 lane; vị trí đáp án ngẫu nhiên. Voice dùng Web Speech API, có Replay. Chủ đề: school, family, food, animals, daily routine, weather, places. Tối thiểu 60 items.
Camera MediaPipe Pose; detect left/right movement hoặc body-center zone, yêu cầu giữ hướng 250–400ms trước khi chốt. Có calibration và confidence. Fallback left/right keys hoặc click lane.
Sai: phát lại audio + highlight đáp án. Đúng: +score + streak.
Không yêu cầu chạy; chỉ step nhẹ trong vùng camera. 1 HTML, không upload video.
```
