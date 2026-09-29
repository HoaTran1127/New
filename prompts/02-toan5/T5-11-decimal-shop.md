# T5-11 — Cửa Hàng Thập Phân

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 5, môn Tiếng Anh.

## Mục tiêu học tập
"Số thập phân; so sánh; cộng trừ"

## Nhiệm vụ học sinh
"Hoàn thành đơn hàng bằng số thập phân"

## Gameplay
Điều khiển: **POINT+DRAG**. Chức năng: "place value; decimal operations; money".
- Biến kiến thức thành hành động chơi trực tiếp.
- 12 lượt; ít nhất 40 câu/tình huống; 3 mức độ.
- Random đáp án; distractor mô phỏng lỗi thường gặp.
- Câu sai có giải thích trực quan + luyện lại; đúng có phản hồi ngay.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng.

## Camera
MediaPipe Hands; pinch/grab và release; smoothing/hysteresis; cooldown 300ms.
Xin quyền camera/micro sau Bắt đầu; có loading/permission/ready/tracking/error; calibration/framing; confidence thấp không chốt; một gesture chỉ tạo một event.

## Fallback
Mouse/touch/keyboard mô phỏng đầy đủ gameplay chính.

## Luồng
Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.

## Tiếng Việt và an toàn
UI, nút, hướng dẫn, feedback bằng tiếng Việt; thuật ngữ Toán lớp 5 chính xác; chữ lớn, responsive, reduced-motion; không động tác nguy hiểm; không tải/lưu dữ liệu camera/micro.

## MiTi — CHỮ KÝ BẮT BUỘC
HTML phải tự chứa logo **MiTi**: biểu tượng ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + ✦; xuất hiện ở Bắt đầu, HUD và Kết quả; có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không phụ thuộc repository hoặc URL logo ngoài.

## Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, không TODO, không pseudocode, không phụ thuộc repository này.