# L4-28 — Nhà Thám Hiểm Bản Đồ

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 4, môn Toán.

## Mục tiêu
Đọc bản đồ và xác định vị trí

## Nhiệm vụ
Chọn đường đi và vị trí theo dữ kiện

## Cơ chế và nội dung
Điều khiển chính: **SWIPE**. Chức năng: "map scale".
- Thiết kế bối cảnh đúng tên game và mục tiêu.
- 12 lượt chơi; ngân hàng ít nhất 40 câu/tình huống; 3 mức độ.
- Random vị trí đáp án; distractor dựa trên lỗi thường gặp.
- Sai phải có giải thích trực quan và câu luyện lại; đúng có feedback ngay.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng.

## Camera / nhận diện
MediaPipe Hands; swipe theo hướng + vận tốc; smoothing; debounce/cooldown 450ms; giữ tay không spam.
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