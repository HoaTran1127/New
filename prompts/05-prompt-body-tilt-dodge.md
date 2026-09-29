# 🏃 PROMPT MẪU 5: BODY TILT & DODGE AR (GAME VẬN ĐỘNG NGHIÊNG NGƯỜI NÉ BẪY)

> **Mô tả:** Game AR vận động toàn thân (Active Body Movement). Học sinh đứng trước camera, nghiêng người sang trái hoặc sang phải (Body Tilt) hoặc vươn 2 tay để điều khiển chiếc Phi Thuyền bay qua cánh cổng mang phép tính hoặc từ vựng ĐÚNG, né cổng SAI.

> **LEGACY (LEG-05)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Bạn là một Chuyên gia Lập trình Game Giáo dục Web AR (HTML5, Canvas 2D, MediaPipe, Web Audio API).
Hãy tạo cho tôi một game Web AR tương tác vận động cơ thể 1 file HTML hoàn chỉnh có tên "AR SPACE RACER - PHI THUYỀN VẬN ĐỘNG HỌC TẬP" dành cho học sinh tiểu học.

### 1. CƠ CHẾ VẬN ĐỘNG TOÀN THÂN (BODY TILT / 2 HANDS):
- Dùng MediaPipe Tasks Vision: HandLandmarker cho thao tác tay, PoseLandmarker (pose_landmarker_lite.task) cho nghiêng người, đều pin @1.0.1.
- Học sinh đứng cách webcam 2 mét:
  * Khi học sinh nghiêng người hoặc di chuyển 2 bàn tay sang Trái: Phi thuyền bay lướt sang Trái.
  * Khi học sinh nghiêng người hoặc di chuyển 2 bàn tay sang Phải: Phi thuyền bay lướt sang Phải.
- Lật gương webcam (`transform: -scale-x-100`) và áp dụng bộ lọc EMA chống rung.
- Có chế độ phím mũi tên Trái/Phải và chuột để chơi dự phòng nếu không mở camera.

### 2. CƠ CHẾ GAMEPLAY & LUẬT CHƠI:
- Bối cảnh: Đường đua vũ trụ không gian 3 làn chạy. Phi thuyền lao nhanh về phía trước.
- Trên đường đua xuất hiện các "Cổng Năng Lượng Không Gian" mang các câu hỏi Toán Lớp 4-5 hoặc Tiếng Anh:
  * Cổng ĐÚNG (Màu xanh neon phát sáng): Bay qua sẽ tăng tốc cực đại (Hyper Speed), +20 điểm, nổ pháo hoa và phát âm thanh tăng tốc (Web Audio API).
  * Cổng SAI / Chướng ngại vật (Màu đỏ cảnh báo): Nếu đâm phải sẽ bị nổ phi thuyền, trừ 1 Máu, rung màn hình và rạn nứt kính buồng lái.
- Người chơi có 3 Máu, tốc độ bay tăng dần theo thời gian tạo cảm giác hồi hộp, kích thích học sinh vận động liên tục!

### 3. NỘI DUNG TÙY CHỌN:
- Chế độ Môn Toán: Phân số bằng nhau, số thập phân, bảng nhân chia.
- Chế độ Môn Tiếng Anh: Tìm từ đồng nghĩa, chọn từ đúng chính tả (Spelling).

### 4. ĐỒ HỌA & ÂM THANH:
- Đồ họa Canvas 2D phong cách Cyberpunk neon vũ trụ (hiệu ứng đường chân trời perspective, vệt sao sao băng trôi nhanh).
- Âm thanh động cơ synth và tiếng nổ không gian bằng Web Audio API.
- Đóng gói hoàn chỉnh trong 1 file HTML duy nhất.

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
