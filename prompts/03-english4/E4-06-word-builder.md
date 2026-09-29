# E4-06 — Xây Từ

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 4, môn Tiếng Anh.

## Mục tiêu học tập
Phát triển từ vựng, nghe, nói, đọc và viết tiếng Anh lớp 4

## Nhiệm vụ học sinh
Hoàn thành chuỗi nhiệm vụ ngôn ngữ và nhận phản hồi

## Gameplay
Điều khiển: **MIXED**. Chức năng: tương tác; phản hồi tức thì; tăng độ khó; ôn lại lỗi.
- 12 lượt; tối thiểu 60 mục học tập; 3 mức độ.
- Dùng từ/câu phù hợp trình độ lớp 4; random vị trí và tạo distractor theo lỗi phổ biến.
- Câu sai phải giải thích bằng tiếng Việt, chỉ ra kiến thức đúng và cho luyện lại.
- Đúng có feedback tức thì; có điểm, tiến độ, chuỗi đúng và tổng kết.

## Camera / tương tác
Dùng mechanic **MIXED** với threshold, smoothing, confidence và debounce/cooldown phù hợp; một gesture chỉ tạo một event.
Xin quyền camera/micro chỉ sau Bắt đầu; có loading/permission/ready/tracking/error và calibration/framing.

## Fallback
Mouse/touch/keyboard mô phỏng đầy đủ gameplay chính.

## Luồng
Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.

## Ngôn ngữ / an toàn
UI, nút, hướng dẫn và feedback bằng **tiếng Việt**. Từ/câu/audio tiếng Anh chỉ dùng cho phần kiến thức cần học. Responsive, chữ lớn, reduced-motion; không động tác nguy hiểm; không lưu/tải dữ liệu camera/micro.

## MiTi — CHỮ KÝ BẮT BUỘC
HTML phải tự chứa logo **MiTi**: ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + ✦; xuất hiện ở Bắt đầu, HUD và Kết quả; có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không phụ thuộc repository hoặc URL logo ngoài.

## Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, không TODO, không pseudocode, không phụ thuộc repository này.