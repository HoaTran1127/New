# E4-15 — Bản Đồ Phiêu Lưu Tiếng Anh

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 5, môn Tiếng Anh.

## Mục tiêu học tập
"Ôn từ vựng; nghe; chính tả; câu; ngữ pháp"

## Nhiệm vụ học sinh
"Hoàn thành năm đảo kỹ năng"

## Gameplay
Điều khiển: **MIXED**. Chức năng: "adaptive review; vocabulary; listening; spelling; grammar".
- 12 lượt; ngân hàng tối thiểu 60 mục; 3 mức độ.
- Nội dung kiến thức tiếng Anh phải phù hợp trình độ lớp 4.
- Xáo trộn đáp án; distractor dựa trên lỗi từ vựng/chính tả/cấu trúc thường gặp.
- Sai: giải thích bằng tiếng Việt + chỉ ra đáp án đúng + luyện lại; đúng: phản hồi tức thì.
- Có điểm, tiến độ, chuỗi đúng và tổng kết.

## Camera / tương tác
MediaPipe Hands; đầu ngón trỏ làm con trỏ; calibration; smoothing; confidence >= 0.65; chỉ chốt khi chạm.
- Xin quyền sau Bắt đầu; có loading/permission/ready/tracking/error.
- Có calibration/framing, smoothing, confidence; một gesture chỉ tạo một event.

## Fallback
Mouse/touch/keyboard mô phỏng được gameplay chính.

## Luồng
Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.

## Ngôn ngữ / an toàn
UI, nút, hướng dẫn, feedback bằng **tiếng Việt**; từ/câu/audio tiếng Anh chỉ dùng cho phần kiến thức. Responsive, chữ lớn, reduced-motion; không động tác nguy hiểm; không lưu/tải dữ liệu camera/micro.

## MiTi — CHỮ KÝ BẮT BUỘC
HTML phải tự chứa logo **MiTi**: ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + ✦; xuất hiện ở Bắt đầu, HUD và Kết quả; có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không phụ thuộc repository hoặc URL logo ngoài.

## Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, không TODO, không pseudocode, không phụ thuộc repository này.