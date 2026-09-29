# T5-03 — Ghép Phân Số – Thập Phân – Phần Trăm

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 5, môn Tiếng Anh.

## Mục tiêu học tập
Vận dụng kiến thức Toán 5 qua tình huống tương tác

## Nhiệm vụ học sinh
Giải nhiệm vụ theo từng màn và nhận phản hồi

## Gameplay
Điều khiển chính: **MIXED**. Chức năng: tương tác; phản hồi tức thì; tăng độ khó; ôn lại lỗi.
- Dựng bối cảnh đúng tên game; hành động chơi phải phục vụ trực tiếp kiến thức.
- 12 lượt; ngân hàng tối thiểu 40 câu/tình huống, 3 mức độ.
- Random đáp án; distractor dựa trên lỗi thường gặp.
- Sai có lời giải từng bước và luyện lại; đúng có feedback ngay.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng.

## Camera / tương tác
MediaPipe Hands; đầu ngón trỏ làm con trỏ; calibration; smoothing; confidence >= 0.65; chỉ chốt khi chạm hitbox.
- Xin quyền thiết bị chỉ sau Bắt đầu; có loading/permission/ready/tracking/error.
- Calibration/framing; confidence thấp không chốt; một gesture chỉ tạo một event.

## Fallback
Mouse/touch/keyboard phải mô phỏng gameplay chính.

## Luồng
Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.

## Ngôn ngữ
Toàn bộ UI, nút, hướng dẫn, feedback bằng **tiếng Việt**. Nội dung toán dùng thuật ngữ Toán chuẩn, ví dụ số và đơn vị phù hợp lớp 5.

## An toàn / kỹ thuật
Responsive, chữ lớn, reduced-motion; không động tác nguy hiểm; không tải/lưu dữ liệu camera/microphone; HTML/CSS/JS thuần; CDN cụ thể nếu cần; không TODO.

## MiTi — CHỮ KÝ BẮT BUỘC
HTML phải tự chứa logo **MiTi**: biểu tượng ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + ✦; xuất hiện ở Bắt đầu, HUD và Kết quả; có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không phụ thuộc repository hoặc URL logo ngoài.

## Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, chạy độc lập.