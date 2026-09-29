# E4-01 — Vocabulary Quest

- **Khối:** English 4
- **Mục tiêu:** Nhận biết và dùng từ vựng theo chủ đề.
- **Nhiệm vụ:** Chạm/chỉ đúng từ hoặc hình ảnh theo yêu cầu nghe/nhìn.
- **Điều khiển:** POINT

## Prompt copy trực tiếp

```text
Tạo game giáo dục "Vocabulary Quest" cho học sinh English 4 trong đúng 1 file HTML.
Mục tiêu: củng cố từ vựng theo các chủ đề phù hợp chương trình tiểu học như school, family, home, food, animals, jobs, daily activities, places, weather.
Nhiệm vụ: học sinh nghe hoặc đọc yêu cầu rồi dùng ngón trỏ chạm đúng thẻ từ/hình ảnh.
Gameplay: mỗi round hiển thị 6–8 thẻ; phát âm từ mục tiêu bằng Web Speech API khi cần; xáo vị trí trái/phải; tránh để đáp án luôn ở một vị trí. Có picture mode, word mode và mixed mode. Tạo ngân hàng ít nhất 60 từ theo chủ đề, không dùng từ quá khó.
Camera MediaPipe Hands; landmark đầu ngón trỏ làm cursor; có smoothing, confidence, calibration, camera loading/error và hitbox; click chỉ chốt khi fingertip thực sự chạm thẻ.
Đúng: thẻ bật sáng, phát âm lại từ, +điểm. Sai: hiện nghĩa tiếng Việt hoặc hình minh họa và cho thử lại.
Có fallback mouse/touch.
UI thân thiện trẻ em, chữ lớn, Start → Tutorial → Practice → Play → Result → Replay.
Không upload video. Không TODO/pseudocode. 1 HTML duy nhất.
```
