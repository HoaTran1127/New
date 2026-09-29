# TEMPLATE — GAME PROMPT CHUẨN

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
```
