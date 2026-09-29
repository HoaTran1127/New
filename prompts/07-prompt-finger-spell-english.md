# 🐝 PROMPT MẪU 7: AR SPELLING BEE & PHONICS (GHÉP CHỮ TIẾNG ANH VẬN ĐỘNG)

> **Mô tả:** Game AR tương tác ngón tay (Finger Pinch / Touch). Học sinh đứng trước camera, dùng đầu ngón trỏ hoặc cử chỉ chạm tay để bắt các quả bóng chữ cái (A, B, C, D...) bay lơ lửng nhằm ghép thành từ vựng tiếng Anh theo yêu cầu.

> **LEGACY (LEG-07)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Bạn là một Chuyên gia Lập trình Game Giáo dục Web AR (HTML5, Canvas 2D, MediaPipe, Web Audio API).
Hãy tạo cho tôi một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "AR SPELLING BEE - ONG NHÍ GHÉP CHỮ TIẾNG ANH" dành cho học sinh tiểu học.

### 1. CƠ CHẾ TƯƠNG TÁC VẬN ĐỘNG:
- Dùng MediaPipe Tasks Vision HandLandmarker (pin @1.0.1, file vision_bundle.mjs + wasm + hand_landmarker.task).
- Đầu ngón tay trỏ của học sinh (Landmark 8) được biểu diễn như một "Chiếc Đũa Phép Ngôi Sao ⭐" phát sáng vệt cầu vồng.
- Khi đầu ngón tay chạm vào một bong bóng chữ cái (khoảng cách < bán kính bóng), quả bóng sẽ vỡ "POP" và chữ cái đó bay vào ô trống ghép từ.

### 2. CƠ CHẾ BÀI HỌC GHÉP TỪ:
- Trên đỉnh màn hình hiển thị hình ảnh gợi ý hoặc nghĩa tiếng Việt (Ví dụ: "Hình con voi 🐘" hoặc nghĩa "Quả táo").
- Bên dưới là các ô chữ còn thiếu: `E _ E P H _ N T` hoặc `A _ _ L E`.
- Các bong bóng mang các chữ cái khác nhau (cả chữ đúng và chữ bẫy) bay lơ lửng xung quanh người chơi.
- Học sinh phải vận động vươn tay sang trái, phải, lên cao để chạm đúng các chữ cái còn thiếu theo thứ tự chính xác.

### 3. THƯỞNG PHẠT & ÂM THANH:
- Chọn đúng chữ cái: Chữ bay vào vị trí khuyết, nổ hạt sao vàng, âm thanh nốt nhạc cao dần theo từng chữ cái ghép được.
- Hoàn thành trọn vẹn từ: Phát âm thanh chiến thắng (Victory Chime) và hiện phiên âm + nghĩa đầy đủ.
- Chọn nhầm chữ bẫy: Bóng phát nổ khói xám, âm thanh buzzer lỗi, trừ 1 lượt thử.

### 4. ĐỒ HỌA & CÔNG NGHỆ:
- 1 File HTML duy nhất, dùng CSS nội tuyến (không dùng Tailwind Play CDN), font Fredoka vui nhộn.
- Âm thanh sống động bằng Web Audio API.
- Hỗ trợ click chuột phòng khi không có camera.

Hãy viết trọn vẹn toàn bộ mã nguồn HTML, CSS và JavaScript hoàn chỉnh, sẵn sàng chạy ngay khi mở file!

YÊU CẦU BẮT BUỘC THEO CHUẨN MiTi (áp dụng cho bản prompt legacy này):
1. NGÂN HÀNG DỮ LIỆU: khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau. Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet }; tối thiểu 40 mục chia 3 mức độ; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo trộn vị trí đáp án bằng seed theo lượt.
2. CAMERA: MediaPipe Tasks Vision pin phiên bản (vision_bundle.mjs@1.0.1 + wasm + hand_landmarker.task, pose_landmarker_lite.task nếu cần tư thế toàn thân). getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }); khung 4:3, crop nếu camera tỉ lệ khác, lật gương ngang khi hiển thị và tính tọa độ.
3. CHỈ XIN QUYỀN CAMERA SAU khi học sinh bấm BẮT ĐẦU. Trạng thái tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại). Có khung định vị để học sinh biết đặt tay ở đâu.
4. CHỐNG CHỐT NHẦM: làm mượt EMA alpha 0.4–0.5; cử chỉ chỉ fire ở lượt chuyển trạng thái kèm hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim; hover không phải hit; confidence thấp thì không chốt.
5. FALLBACK: chuột / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính, có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng không tải lại trang. CDN hoặc model lỗi thì tự chuyển sang chế độ không camera, game vẫn chơi đủ, mục tiêu học tập vẫn đủ 100%.
6. PHẢN HỒI HỌC TẬP: sai thì dừng 2 giây, chỉ rõ bước hoặc chữ số hoặc từ cần sửa, không hiệu ứng nào che lời giải; câu sai xếp vào CUỐI vòng chơi để luyện lại; màn tổng kết nhóm theo loiViet kiểu "Em hay sai ở: ..." kèm số câu đúng/sai theo mức độ.
7. Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em". Chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive dọc và ngang, có Pause, Replay, Giảm hiệu ứng chuyển động; không leaderboard, không quảng cáo.
8. RIÊNG TƯ: không upload ảnh/video từ camera, chỉ giữ landmark trong bộ nhớ, không thu thập dữ liệu cá nhân. Toàn bộ UI, tên nút, hướng dẫn, thông báo và lời giải bằng TIẾNG VIỆT; không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.
9. CHỮ KÝ MiTi (bắt buộc trong HTML): ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang hoặc màn kết quả có dòng "MiTi • Học bằng chuyển động"; không xóa hoặc đổi tên thương hiệu khi replay hay ở chế độ không camera.
10. ĐẦU RA: duy nhất 1 file HTML hoàn chỉnh, CSS nội tuyến trong một khối <style>, không file .css/.js/.json/ảnh/mp3 ngoài, không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không lỗi console khi mở trực tiếp bằng trình duyệt.
```
