# L4-26 — Chia Kho Báu

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 4, môn Toán.

## Mục tiêu
Giải quyết bài toán chia phần

## Nhiệm vụ
Chia kho báu theo phân số hoặc tỉ số

## Cơ chế và nội dung
Điều khiển chính: **GRAB**. Chức năng: "groups; fraction-of-number".
- Thiết kế bối cảnh đúng tên game và mục tiêu.
- 12 lượt chơi; ngân hàng ít nhất 40 câu/tình huống; 3 mức độ.
- Random vị trí đáp án; distractor dựa trên lỗi thường gặp.
- Sai phải có giải thích trực quan và câu luyện lại; đúng có feedback ngay.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng.

## Camera / nhận diện
MediaPipe Hands; pinch/grab để bắt và release để thả; smoothing/hysteresis; cooldown 300ms.
- Xin quyền chỉ sau Bắt đầu.
- Có Đang tải → Xin quyền → Sẵn sàng → Đang nhận diện → Lỗi.
- Calibration/framing + smoothing + confidence; một gesture = một event.

## Fallback
Mouse/touch/keyboard mô phỏng được gameplay chính.

## Luồng
Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.

## Ngôn ngữ / an toàn
UI và phản hồi bằng **tiếng Việt**. Không yêu cầu động tác nguy hiểm; reduced-motion; không tải/lưu dữ liệu camera/microphone; responsive.

## MiTi — CHỮ KÝ BẮT BUỘC
HTML phải tự chứa logo **MiTi**: biểu tượng ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + ✦; xuất hiện ở Bắt đầu, HUD và Kết quả; có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không phụ thuộc repository hoặc URL logo ngoài.

## Đầu ra
Chỉ xuất toàn bộ **HTML hoàn chỉnh**, không TODO, không pseudocode, không phụ thuộc repository này.