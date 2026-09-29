# L4-19 — Pizza Phân Số

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 4, môn Toán.

## 1. Mục tiêu và nhiệm vụ
**Mục tiêu học tập:** Nhận biết và biểu diễn phân số
**Nhiệm vụ học sinh:** Chọn phần bánh đúng với phân số
**Điều khiển chính:** POINT
**Chức năng chính:** "equal parts; fraction model"

## 2. Gameplay học qua hành động
- Thiết kế bối cảnh đúng tên game và biến mục tiêu thành hành động chơi trực tiếp.
- Có **12 lượt**, ngân hàng **ít nhất 40 câu/tình huống**, 3 mức độ khó.
- Xáo trộn đáp án và vị trí.
- Phương án nhiễu phải đại diện cho lỗi thường gặp.
- Câu sai: giải thích bằng trực quan + cho cơ hội luyện lại.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng.
- Không để hiệu ứng che kiến thức.

## 3. Camera / nhận diện
MediaPipe Hands; đầu ngón trỏ làm con trỏ; calibration; smoothing; confidence >= 0.65; chỉ chốt khi chạm hitbox.
- Xin quyền camera/micro chỉ sau **Bắt đầu**.
- Có trạng thái Đang tải → Xin quyền → Sẵn sàng → Đang nhận diện → Lỗi.
- Có calibration/framing, smoothing và ngưỡng confidence.
- Một gesture chỉ tạo một event; không spam khi giữ gesture.

## 4. Fallback
Mouse/touch/keyboard phải mô phỏng hành động chính.

## 5. Luồng
**Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại**

## 6. Ngôn ngữ
Tất cả UI, hướng dẫn, nút, feedback và lỗi bằng **tiếng Việt**. Chỉ kiến thức Tiếng Anh được dùng tiếng Anh. Chữ lớn, tương phản tốt, mobile-friendly, reduced-motion.

## 8. CHỮ KÝ MiTi
HTML đầu ra **bắt buộc** tự chứa chữ ký **MiTi**: biểu tượng ô bo góc #FFD84D có chữ M #07111F + wordmark **MiTi** đậm + dấu ✦. Đặt logo nhỏ ở Bắt đầu, HUD và Kết quả; không che gameplay. Có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không tham chiếu repository hoặc URL logo bên ngoài. Không xóa logo ở fallback/replay.

## 9. Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, không TODO, không pseudocode, không phụ thuộc repository này.