# L4-27 — Ratio Rescue

- **Khối:** Toán 4 — nội dung mở rộng, cần đối chiếu SGK/PPCT cụ thể.
- **Mục tiêu:** Trực quan hóa bài toán tổng-tỉ/hiệu-tỉ bằng sơ đồ đoạn thẳng.
- **Nhiệm vụ:** Kéo các đoạn bằng nhau để dựng sơ đồ đúng.
- **Điều khiển:** TWO_HAND_STRETCH

## Prompt copy trực tiếp

```text
Tạo game giáo dục "Ratio Rescue" bằng 1 file HTML duy nhất cho học sinh lớp 4.
Mục tiêu: dùng sơ đồ đoạn thẳng để hiểu bài toán tổng-tỉ hoặc hiệu-tỉ.
Nhiệm vụ: dùng hai tay kéo các thanh đoạn thẳng để tạo đúng số phần theo tỉ số, sau đó chọn giá trị từng phần và hai số.
Gameplay: hiển thị bài toán thực tế; tự dựng bar model theo tỉ số; cho học sinh thao tác từ tổng số phần → một phần → số bé/số lớn. Bẫy phản ánh lỗi lấy tổng chia nhầm một số hạng hoặc quên nhân số phần. Có ít nhất 10 bài số nguyên đẹp.
Camera MediaPipe Hands, hai tay, smoothing, confidence, stretch threshold, debounce; calibration sau Start.
Sai: animate lại sơ đồ và giải thích từng bước. Đúng: hoàn thành cứu hộ + điểm.
Fallback mouse/touch. UI chữ lớn, không leaderboard, không upload video, không TODO, 1 HTML.
```
