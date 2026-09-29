# L4-06 — Xưởng Diện Tích

Tạo game giáo dục web **một file HTML duy nhất** cho học sinh Việt Nam lớp 4, môn Toán.

## 1. Thông tin học tập
**Mục tiêu:** Tính diện tích bằng đơn vị vuông
**Nhiệm vụ học sinh:** Dựng mô hình có diện tích yêu cầu
**Điều khiển chính:** TWO_HAND_STRETCH
**Chức năng:** "grid; square units"

## 2. Gameplay
- Thiết kế bối cảnh đúng với tên game và biến mục tiêu học tập thành hành động chơi trực tiếp.
- Mỗi lượt chỉ có một nhiệm vụ chính; người chơi phải hiểu trong vài giây.
- Tạo **12 lượt chính**, có ít nhất **40 câu/tình huống hợp lệ**, chia 3 mức độ.
- Random vị trí đáp án; không để đáp án đúng luôn ở một vị trí.
- Tạo phương án nhiễu dựa trên lỗi học sinh thường mắc.
- Sau câu sai: giải thích ngắn, trực quan, chỉ ra bước/số/từ cần sửa; đưa câu luyện lại vào cuối vòng.
- Có điểm, tiến độ, chuỗi đúng và tổng kết kỹ năng cần luyện.

## 3. Camera / tương tác
MediaPipe Hands; theo dõi hai tay và khoảng cách tương đối, smoothing và ngưỡng thay đổi; debounce/cooldown; nếu thiếu một tay thì không chốt.
- Chỉ xin quyền camera/microphone sau khi bấm **Bắt đầu**.
- Có trạng thái: Đang tải → Xin quyền → Đã sẵn sàng → Đang nhận diện → Lỗi.
- Có calibration/framing để học sinh biết đứng/ngồi và đưa tay vào đâu.
- Làm mượt landmark; không chốt khi confidence thấp.
- Một gesture chỉ tạo một game event; không spam khi giữ gesture.

## 4. Fallback
Mouse/touch/keyboard phải mô phỏng được hành động chính để mục tiêu học tập vẫn chơi đầy đủ khi camera hoặc microphone không khả dụng.

## 5. Luồng game
**Bắt đầu → Kiểm tra thiết bị → Hiệu chỉnh → Hướng dẫn → 2 lượt luyện → 12 lượt chính → Phản hồi → Ôn câu sai → Kết quả → Chơi lại**

## 6. Ngôn ngữ nội dung
Tất cả nút, tiêu đề, hướng dẫn, thông báo lỗi và phản hồi phải bằng **tiếng Việt**. Với môn Tiếng Anh, chỉ phần kiến thức cần học mới dùng tiếng Anh. Không dùng văn bản UI tiếng Anh không cần thiết.

## 7. UI và an toàn
- Chữ lớn, nút lớn, tương phản tốt, responsive điện thoại/laptop.
- Có Pause, Replay, reduced-motion.
- Không yêu cầu chạy hoặc động tác nguy hiểm.
- Không lưu hoặc tải video camera/microphone lên server.
- Nếu dùng CDN/model, khai báo URL và xử lý lỗi tải.

MÌTI — CHỮ KÝ THƯƠNG HIỆU BẮT BUỘC
- HTML đầu ra phải tự chứa logo MiTi, không phụ thuộc repository hoặc file ngoài.
- Góc trên trái: biểu tượng ô bo góc #FFD84D có chữ M #07111F + chữ MiTi đậm + dấu ✦ nhỏ.
- Logo xuất hiện ở Bắt đầu, HUD khi chơi và Kết quả; không che nội dung.
- Có dòng: “MiTi • Học bằng chuyển động”.
- Dùng inline SVG/CSS/HTML; không hotlink logo và không xóa logo ở fallback/replay.

## 8. Đầu ra
Chỉ trả về **toàn bộ HTML hoàn chỉnh**. Không TODO, không pseudocode, không phần cần bổ sung, không phụ thuộc repository này.