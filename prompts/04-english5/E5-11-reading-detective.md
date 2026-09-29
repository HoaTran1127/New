# E5-11 — Thám Tử Đọc Hiểu

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 5, môn Tiếng Anh.

## Mục tiêu học tập
"Ý chính; chi tiết; trình tự; suy luận đơn giản"

## Nhiệm vụ học sinh
"Tìm bằng chứng trong bài đọc"

## Gameplay
Điều khiển: **POINT**. Chức năng: "reading evidence; inference; context".
- 12 lượt; ngân hàng tối thiểu 60 mục; 3 mức độ.
- Nội dung tiếng Anh phù hợp trình độ lớp 5.
- Xáo trộn đáp án; distractor dựa trên lỗi phổ biến.
- Sai: giải thích bằng tiếng Việt, chỉ ra từ/cấu trúc đúng và cho luyện lại.
- Đúng: phản hồi tức thì; nghe lại/phát âm khi phù hợp.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng.

## Camera / tương tác
MediaPipe Hands; đầu ngón trỏ làm con trỏ; calibration; smoothing; confidence >= 0.65; chỉ chốt khi chạm.
- Xin quyền sau Bắt đầu; có loading/permission/ready/tracking/error.
- Có calibration/framing; confidence thấp không chốt; một gesture chỉ tạo một event.

## Fallback
Mouse/touch/keyboard mô phỏng được gameplay chính.

## Luồng
Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.

## Ngôn ngữ / an toàn
UI, nút, hướng dẫn và feedback bằng **tiếng Việt**; phần kiến thức tiếng Anh giữ tiếng Anh. Responsive, chữ lớn, reduced-motion; không động tác nguy hiểm; không lưu/tải dữ liệu camera/micro.

## MiTi — CHỮ KÝ BẮT BUỘC
HTML phải tự chứa logo **MiTi**: ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + ✦; xuất hiện ở Bắt đầu, HUD và Kết quả; có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không phụ thuộc repository hoặc URL logo ngoài.

## Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, không TODO, không pseudocode, không phụ thuộc repository này.