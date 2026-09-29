# L4-09 — Kiến Trúc Sư Laser

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 4, môn Toán.

## 1. Mục tiêu và nhiệm vụ
**Mục tiêu học tập:** Nhận biết quan hệ vuông góc và song song
**Nhiệm vụ học sinh:** Điều chỉnh các đường theo quan hệ yêu cầu
**Điều khiển chính:** TWO_HAND_STRETCH
**Chức năng chính:** "laser; snap; geometry"

## 2. Gameplay học qua hành động
- Bối cảnh và vật thể phải phục vụ trực tiếp mục tiêu trên.
- Có **12 lượt**, ngân hàng **ít nhất 40 câu/tình huống**, 3 mức độ khó.
- Xáo trộn đáp án; phương án nhiễu mô phỏng lỗi thường gặp.
- Câu sai được giải thích trực quan và tái xuất hiện để luyện lại.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng.
- Ưu tiên thao tác chính TWO_HAND_STRETCH thay vì mini-game rời mục tiêu.

## 3. Camera / nhận diện
MediaPipe Hands; theo dõi hai tay và khoảng cách; smoothing + threshold; thiếu một tay thì không chốt.
- Xin quyền camera/micro chỉ sau **Bắt đầu**.
- Có Đang tải → Xin quyền → Sẵn sàng → Đang nhận diện → Lỗi.
- Có calibration/framing; confidence thấp không chốt.
- Một gesture chỉ tạo một event; không spam khi giữ.

## 4. Fallback
Mouse/touch/keyboard phải mô phỏng đúng hành động chính. Game vẫn đầy đủ nội dung khi không có camera/micro.

## 5. Luồng
**Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại**

## 6. Ngôn ngữ và an toàn
UI, hướng dẫn, nút, phản hồi và thông báo phải bằng **tiếng Việt**. Với Tiếng Anh, chỉ dữ liệu kiến thức cần học dùng tiếng Anh. Responsive; chữ lớn; reduced-motion; không yêu cầu động tác nguy hiểm; không tải/lưu video hoặc âm thanh người chơi.

## 8. CHỮ KÝ MiTi
HTML đầu ra **bắt buộc** tự chứa chữ ký **MiTi**: biểu tượng ô bo góc #FFD84D có chữ M #07111F + wordmark **MiTi** đậm + dấu ✦. Đặt logo nhỏ ở Bắt đầu, HUD và Kết quả; không che gameplay. Có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không tham chiếu repository hoặc URL logo bên ngoài. Không xóa logo ở fallback/replay.

## 9. Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, chạy độc lập, không TODO, không pseudocode, không phụ thuộc repository này.