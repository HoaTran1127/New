# L4-28 — Map Explorer

- **Khối:** Toán 4 — nội dung mở rộng, cần đối chiếu SGK/PPCT cụ thể.
- **Mục tiêu:** Hiểu tỉ lệ bản đồ.
- **Nhiệm vụ:** Di chuyển giữa các mốc để nối khoảng cách bản đồ với khoảng cách thực.
- **Điều khiển:** STEP

## Prompt copy trực tiếp

```text
Tạo game "Map Explorer" giáo dục Toán lớp 4 trong 1 HTML duy nhất.
Mục tiêu: hiểu ý nghĩa tỉ lệ bản đồ.
Nhiệm vụ: học sinh di chuyển đến các mốc trên bản đồ và chọn khoảng cách thực tương ứng.
Gameplay: hiển thị bản đồ đơn giản, thước đo và tỉ lệ như 1:100000; tạo câu hỏi tìm khoảng cách thực hoặc khoảng cách trên bản đồ. Visualize mỗi cm trên bản đồ tương ứng bao nhiêu cm thực tế. Bẫy phản ánh quên đổi đơn vị. Có ít nhất 10 bài số dễ xử lý.
Camera MediaPipe Pose; bước trái/phải hoặc lean trái/phải, calibration; confidence và giữ hướng ngắn trước khi chốt.
Fallback phím trái/phải + click. Sai có minh họa quy đổi. Có Start/Tutorial/Play/Result/Replay. Không upload video, không TODO, 1 HTML.
```
