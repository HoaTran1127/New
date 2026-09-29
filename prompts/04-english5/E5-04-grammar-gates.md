# E5-04 — Grammar Gates

- **Khối:** English 5
- **Mục tiêu:** Ngữ pháp câu đơn giản
- **Nhiệm vụ:** Chọn cổng có câu đúng
- **Điều khiển:** STEP

## Prompt copy trực tiếp

```text
Tạo game giáo dục "Grammar Gates" cho học sinh English 5 trong đúng 1 file HTML.

MỤC TIÊU HỌC TẬP
Ngữ pháp câu đơn giản

NHIỆM VỤ
Chọn cổng có câu đúng

GAMEPLAY
- three gates; tense/subject-verb traps.
- Mỗi round dùng một hành động chính; không nhồi nhiều gesture.
- Tạo ngân hàng nội dung ít nhất 60 items phù hợp trình độ lớp 5.
- Random vị trí đáp án và tránh pattern đoán bằng vị trí.
- Bẫy phải phản ánh lỗi thực tế như spelling gần đúng, word choice sai, subject-verb agreement hoặc distractor cùng chủ đề.
- Đúng có feedback ngay; sai có explanation/hint và cơ hội luyện lại.


CAMERA
- Dùng MediaPipe Hands hoặc Pose tùy mechanic; không bật cả hai nếu không cần.
- Xin camera sau Start; có loading, permission, ready, tracking và error.
- Có calibration/framing, smoothing, confidence threshold.
- Gesture có threshold, state, debounce/cooldown; một hành động chỉ tạo một event.
- Không chốt đáp án khi confidence thấp.

FALLBACK
- Mouse/touch/keyboard mô phỏng gameplay chính.
- Với voice, nếu speech recognition không có thì dùng nút chọn/keyboard thay thế.

UX
Start → Camera/Audio Check → Tutorial → Practice → Play → Result → Replay.
Chữ lớn, câu ngắn, màu tương phản. Không leaderboard áp lực.

SAFETY
Không upload video/audio. Không yêu cầu chạy khỏi vùng camera. Có chế độ ngồi khi phù hợp.

OUTPUT
- Trả toàn bộ mã trong 1 file HTML.
- Không TODO/pseudocode.
- Không npm/build.
- Có generator dữ liệu và reset/replay.
- Tự kiểm tra camera/audio/error/fallback trước khi trả code.
```
