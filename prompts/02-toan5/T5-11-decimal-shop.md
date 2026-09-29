# T5-11 — Cửa Hàng Thập Phân

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 5, môn Toán.

## Mục tiêu học tập
"Số thập phân; so sánh; cộng trừ"

## Nhiệm vụ học sinh
"Hoàn thành đơn hàng bằng số thập phân"

## Gameplay
Điều khiển: **POINT+DRAG**. Chức năng: "place value; decimal operations; money".
- 12 lượt; tối thiểu 40 câu/tình huống; 3 mức độ.
- Biến mục tiêu thành hành động chơi trực tiếp; random đáp án; distractor dựa trên lỗi thường gặp.
- Sai: giải thích từng bước và luyện lại; đúng: phản hồi ngay.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng.

## Camera / tương tác
Dùng mechanic **POINT+DRAG** với threshold, smoothing, confidence, debounce/cooldown; không spam event khi giữ gesture.
Xin quyền camera/micro sau Bắt đầu; có loading/permission/ready/tracking/error và calibration/framing.

## Fallback
Mouse/touch/keyboard mô phỏng được gameplay chính.

## Luồng
Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → Luyện mẫu → 12 lượt → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.

## Ngôn ngữ / an toàn
UI, nút, hướng dẫn và feedback bằng **tiếng Việt**; thuật ngữ Toán lớp 5 chính xác. Responsive, chữ lớn, reduced-motion; không động tác nguy hiểm; không lưu/tải dữ liệu camera/micro.

## MiTi — CHỮ KÝ BẮT BUỘC
HTML phải tự chứa logo **MiTi**: ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + ✦; xuất hiện ở Bắt đầu, HUD và Kết quả; có dòng **MiTi • Học bằng chuyển động**. Dùng inline SVG/CSS/HTML, không phụ thuộc repository hoặc URL logo ngoài.

## Đầu ra
Chỉ xuất **toàn bộ HTML hoàn chỉnh**, không TODO, không pseudocode, không phụ thuộc repository này.