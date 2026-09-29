# 👑 MASTER PROMPT — MiTi GEMINI CANVAS EDUCATION GAME

> Prompt khung dùng để tạo **một game độc lập** trong Gemini Canvas. Thay phần GAME SPEC bằng nội dung của game cụ thể.

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
Bạn là chuyên gia thiết kế và lập trình game giáo dục HTML5 Canvas có tương tác bằng webcam.

Hãy tạo một WEB GAME GIÁO DỤC HOÀN CHỈNH trong DUY NHẤT 1 FILE HTML. Game phải có thể preview/chạy trong môi trường web phù hợp với quyền webcam của trình duyệt.

========================
1. GAME SPEC
========================
Tên game: [GAME NAME]
Khối lớp: [GRADE]
Môn học: [SUBJECT]
Mục tiêu học tập: [LEARNING OBJECTIVE]
Nhiệm vụ một câu của học sinh: [PLAYER MISSION]

Cơ chế chính: [PRIMARY MECHANIC]
Cử chỉ chính: [PRIMARY GESTURE]
Ý nghĩa của cử chỉ: [GESTURE MEANING]

========================
2. CAMERA + TRACKING
========================
- Chọn MediaPipe Hands khi cần tay/ngón; chọn MediaPipe Pose khi cần thân người/chân.
- Không dùng cả hai nếu mechanic không cần.
- Chỉ xin quyền camera sau khi người chơi bấm BẮT ĐẦU.
- Có trạng thái rõ ràng: loading → requesting camera → camera ready → tracking ready → error.
- Có vùng framing/calibration để trẻ biết đưa tay hoặc cơ thể vào đâu.
- Làm mượt landmark bằng EMA hoặc bộ lọc tương đương.
- Cử chỉ phải có threshold, debounce/cooldown và state transition.
- Một lần gesture chỉ phát một game event; giữ gesture không được spam event.
- Không coi hover là hit nếu mechanic yêu cầu swipe/punch/pinch.
- Confidence thấp thì không chốt đáp án.

========================
3. FALLBACK
========================
Nếu webcam không khả dụng:
- Mouse/touch/keyboard phải mô phỏng đúng hành động chính.
- Hiển thị rõ chế độ FALLBACK.
- Nội dung học tập vẫn đầy đủ.

========================
4. GAME LOOP
========================
START
→ CAMERA CHECK
→ CALIBRATION
→ SHOW HOW TO MOVE
→ PRACTICE
→ ROUND
→ INSTANT FEEDBACK
→ VISUAL EXPLANATION
→ NEXT QUESTION
→ FINAL SUMMARY
→ PLAY AGAIN

Không dùng tutorial dài. Round đầu phải hiểu nhanh.

========================
5. LEARNING-FIRST
========================
- Chuyển động phải phục vụ trực tiếp mục tiêu học tập.
- Mỗi round ưu tiên một mechanic chính.
- Đúng: phản hồi tích cực ngay.
- Sai: giải thích bằng số, sơ đồ, hình, trục hoặc animation.
- Bẫy sai phải đại diện cho lỗi học sinh thường mắc.
- Không để VFX che mất kiến thức.

========================
6. GAME UI
========================
- Start screen.
- Tutorial bằng icon + câu ngắn.
- HUD: task + score + combo/progress + camera status.
- Playfield lớn, chữ lớn, tương phản tốt.
- Pause/replay.
- Kết quả: số câu, đúng/sai, accuracy và kỹ năng cần luyện.
- Không cần leaderboard.

========================
7. AUDIO + VISUAL
========================
- Có thể dùng Web Audio API hoặc Tone.js.
- Ưu tiên âm thanh tổng hợp, không cần mp3 ngoài.
- VFX phục vụ phản hồi.
- Có thể vẽ asset bằng Canvas/SVG/CSS thay vì phụ thuộc asset ngoài.

========================
8. SAFETY + ACCESSIBILITY
========================
- Có upper-body/seated fallback khi bài cho phép.
- Không yêu cầu chạy khỏi vùng camera.
- Không yêu cầu động tác nguy hiểm.
- Có nút tắt camera/thoát.
- Không upload video camera; chỉ dùng landmark/local state cần thiết cho gameplay.

========================
9. TECHNICAL OUTPUT
========================
- TOÀN BỘ code trong đúng 1 file HTML.
- Không TODO, pseudocode hoặc phần “tự bổ sung”.
- Không cần npm/build tool.
- Nếu dùng CDN/model, khai báo URL cụ thể và xử lý lỗi tải.
- Không dùng thư viện không cần thiết.
- Có generator dữ liệu, không chỉ một câu hỏi mẫu.
- Reset/replay hoàn chỉnh.

========================
10. SELF-CHECK
========================
Trước khi trả code hãy tự kiểm tra:
[ ] camera permission sau Start
[ ] loading/error state
[ ] framing/calibration
[ ] gesture threshold + cooldown
[ ] không hover-hit sai mechanic
[ ] fallback
[ ] tối thiểu 10 dữ liệu/câu hỏi hợp lệ
[ ] feedback giải thích
[ ] restart
[ ] game chạy như một file độc lập

Sau khi tự kiểm tra, chỉ xuất ra file HTML hoàn chỉnh.

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

```
