# L4-36 — Lò Rèn Hàng Số

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 4, môn Toán.

## Mục tiêu
Đọc và phân tích giá trị theo hàng

## Nhiệm vụ
Rèn số đúng trong lò hàng số

## Cơ chế chơi
Điều khiển chính: **POINT**. Các chức năng: "place value; expanded form; distractors".
- Biến mục tiêu học tập thành hành động chơi trực tiếp.
- 12 lượt; ngân hàng ít nhất 40 câu/tình huống; 3 mức độ khó.
- Đáp án xáo trộn; bẫy phản ánh lỗi thường gặp.
- Sai: giải thích trực quan + luyện lại; đúng: phản hồi tức thì.
- Có điểm, tiến độ, chuỗi đúng và tổng kết.

## Camera / nhận diện
MediaPipe Hands; đầu ngón trỏ làm con trỏ; calibration; smoothing; confidence >= 0.65; chỉ chốt khi chạm hitbox.
- Xin quyền chỉ sau Bắt đầu.
- Có Đang tải → Xin quyền → Sẵn sàng → Đang nhận diện → Lỗi.
- Calibration/framing + smoothing + confidence; một gesture chỉ tạo một event.

## Fallback
Mouse/touch/keyboard mô phỏng được gameplay chính.

## Luồng
Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.

## Ngôn ngữ / an toàn
UI, hướng dẫn, nút và feedback bằng **tiếng Việt**. Với môn Tiếng Anh, chỉ dữ liệu học dùng tiếng Anh. Responsive, chữ lớn, reduced-motion; không động tác nguy hiểm; không tải/lưu video hoặc âm thanh.

## MiTi — CHỮ KÝ BẮT BUỘC
HTML phải tự chứa logo **MiTi**: biểu tượng ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + ✦; xuất hiện ở Bắt đầu, HUD và Kết quả; có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không phụ thuộc repository hoặc URL logo ngoài.

## Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, không TODO, không pseudocode, không phụ thuộc repository này.