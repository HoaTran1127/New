# E5-08 — Bộ Ba Trí Nhớ

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 5, môn Tiếng Anh.

## Mục tiêu học tập
Phát triển đọc, nghe, từ vựng, ngữ pháp và giao tiếp tiếng Anh lớp 5

## Nhiệm vụ học sinh
Hoàn thành chuỗi nhiệm vụ ngôn ngữ và nhận phản hồi

## Gameplay
Điều khiển: **MIXED**. Chức năng: tương tác; phản hồi tức thì; tăng độ khó; ôn lại lỗi.
- 12 lượt; ngân hàng tối thiểu 60 mục; 3 mức độ.
- Nội dung đọc/nghe/từ vựng/ngữ pháp/giao tiếp phải phù hợp lớp 5.
- Xáo trộn đáp án; distractor dựa trên lỗi phổ biến.
- Sai: giải thích bằng tiếng Việt, nêu câu/từ đúng và cho luyện lại; đúng: phản hồi tức thì.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng.

## Camera / tương tác
MediaPipe Hands; đầu ngón trỏ làm con trỏ; calibration; smoothing; confidence >= 0.65; chỉ chốt khi chạm.
- Xin quyền sau Bắt đầu; có loading/permission/ready/tracking/error.
- Calibration/framing + smoothing + confidence; một gesture chỉ tạo một event.

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