# E4-03 — Ghép Tranh – Từ

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 5, môn Tiếng Anh.

## Mục tiêu học tập
Phát triển từ vựng, nghe, nói, đọc và viết tiếng Anh lớp 4

## Nhiệm vụ học sinh
Hoàn thành chuỗi nhiệm vụ ngôn ngữ và nhận phản hồi

## Gameplay
Điều khiển: **MIXED**. Chức năng: tương tác; phản hồi tức thì; tăng độ khó; ôn lại lỗi.
- Bối cảnh và hành động chơi phục vụ trực tiếp kỹ năng tiếng Anh.
- 12 lượt; ít nhất 40 câu/tình huống; 3 mức độ.
- Ngân hàng nội dung tối thiểu 60 mục phù hợp lứa tuổi.
- Xáo trộn đáp án; distractor dựa trên lỗi ngôn ngữ phổ biến.
- Sai: giải thích bằng tiếng Việt, chỉ ra từ/cấu trúc đúng và cho luyện lại.
- Đúng: phản hồi tức thì; có phát âm/nghe lại khi phù hợp.
- Không dùng câu lệnh tiếng Việt thay cho phần kiến thức tiếng Anh cần luyện.

## Camera / tương tác
MediaPipe Hands; đầu ngón trỏ làm con trỏ; calibration; smoothing; confidence >= 0.65; chỉ chốt khi chạm.
- Xin quyền camera/micro chỉ sau Bắt đầu.
- Có Đang tải → Xin quyền → Sẵn sàng → Đang nhận diện → Lỗi.
- Calibration/framing + smoothing + confidence; một gesture chỉ tạo một event.

## Fallback
Mouse/touch/keyboard mô phỏng được hành động chính.

## Luồng
Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.

## Ngôn ngữ / an toàn
UI, nút, hướng dẫn và feedback bằng **tiếng Việt**; phần từ/câu/audio tiếng Anh giữ nguyên tiếng Anh khi đó là kiến thức mục tiêu. Responsive, chữ lớn, reduced-motion; không động tác nguy hiểm; không lưu hoặc tải dữ liệu camera/micro.

## MiTi — CHỮ KÝ BẮT BUỘC
HTML phải tự chứa logo **MiTi**: ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + ✦; xuất hiện ở Bắt đầu, HUD và Kết quả; có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không phụ thuộc repository hoặc URL logo ngoài.

## Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, không TODO, không pseudocode, không phụ thuộc repository này.