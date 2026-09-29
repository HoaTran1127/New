# TEMPLATE — MiTi GAME PROMPT CHUẨN

## Metadata

- Game ID: [ID]
- Tên game: [NAME]
- Khối: [GRADE]
- Môn: [SUBJECT]
- Learning objective: [OBJECTIVE]
- Player mission: [ONE-SENTENCE MISSION]
- Primary mechanic: [MECHANIC]
- Primary gesture: [GESTURE]

## Prompt copy trực tiếp

========================
MiTi — DẤU ẤN THƯƠNG HIỆU
========================
Game HTML do bạn tạo BẮT BUỘC phải có chữ ký **MiTi** ngay trong giao diện, không phụ thuộc file của repository này.
- Nhúng logo bằng inline SVG/CSS hoặc HTML/CSS thuần; không hotlink ảnh bên ngoài.
- Góc trên trái: biểu tượng ô bo góc màu #FFD84D có chữ M màu #07111F + chữ **MiTi** đậm bên cạnh + dấu ✦ nhỏ.
- Logo phải xuất hiện ở màn hình Bắt đầu, HUD khi chơi và màn hình Kết quả; kích thước nhỏ, không che nội dung.
- Chân trang hoặc vùng kết quả có dòng: **MiTi • Học bằng chuyển động**.
- Không đổi tên thương hiệu, không xoá logo khi vào gameplay.
- Logo là một phần của HTML đầu ra, để khi lưu một file .html hoặc copy game sang nơi khác vẫn còn chữ ký MiTi.


```text
Hãy tạo game giáo dục "[NAME]" cho học sinh lớp [GRADE].

MỤC TIÊU HỌC TẬP
[OBJECTIVE]

NHIỆM VỤ CỦA HỌC SINH
[ONE-SENTENCE MISSION]

========================
GAMEPLAY
========================
- Bối cảnh: [...]
- Mục tiêu mỗi round: [...]
- Hành động chính: [...]
- Điều kiện đúng: [...]
- Điều kiện sai: [...]
- Win/Lose: [...]
- Scoring: [...]
- Difficulty progression: [...]
- Bẫy sai lầm phổ biến: [...]

========================
CAMERA + GESTURE
========================
- MediaPipe Hands / Pose: [...]
- Framing: [...]
- Calibration: [...]
- Gesture: [...]
- Threshold: [...]
- Cooldown/debounce: [...]
- Confidence: [...]
- Không kích hoạt lặp khi gesture được giữ.

========================
LEARNING FEEDBACK
========================
- Đúng: [...]
- Sai: [...]
- Visual explanation: [...]
- Mini explanation: [...]

========================
FALLBACK
========================
Mouse/touch/keyboard phải mô phỏng hành động chính.

========================
UI / UX
========================
Start → Camera Check → Tutorial → Practice → Play → Result → Replay.

========================
OUTPUT
========================
- 1 file HTML duy nhất.
- Không TODO/pseudocode.
- Không cần build system.
- Có generator dữ liệu.
- Có camera loading/error.
- Có restart hoàn chỉnh.
- Tự kiểm tra trước khi trả code.
- Kiểm tra logo MiTi đã nhúng thật vào HTML và xuất hiện ở Bắt đầu/HUD/Kết quả.
```
