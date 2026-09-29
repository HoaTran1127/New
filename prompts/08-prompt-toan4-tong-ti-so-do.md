# Prompt Gemini Canvas: Game AR Toán 4 - Bí Ẩn Sơ Đồ Đoạn Thẳng (Tìm Hai Số Khi Biết Tổng Và Tỉ Số)

> **Môn học:** Toán Lớp 4 (Chương trình mới - Cánh Diều, Kết Nối Tri Thức, Chân Trời Sáng Tạo)  
> **Chủ đề bài học:** Tìm hai số khi biết Tổng và Tỉ số / Tổng và Hiệu  
> **Khái niệm hình dung:** Sơ đồ đoạn thẳng động (Dynamic Line Segment Diagram) trực quan hóa các phần bằng nhau  
> **Cử chỉ AR:** 2 tay kéo dãn đoạn thẳng + Vung tay đấm chọn quả cầu năng lượng (1 phần / số lớn / số bé)

> **LEGACY (LEG-08)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 4 học chuyên đề "Tìm hai số khi biết Tổng và Tỉ số".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Giao diện: CSS nội tuyến trong một khối <style>, không dùng Tailwind Play CDN.
   - Biểu tượng: inline SVG, không tải FontAwesome.
      - MediaPipe Tasks Vision, phiên bản pin 1.0.1 (vision_bundle.mjs + wasm + hand_landmarker.task; pose_landmarker_lite.task nếu cần tư thế toàn thân)
   - Âm thanh: tổng hợp bằng Web Audio API, không dùng file mp3 ngoài.
2. Luôn lật ngang video webcam (transform: -scale-x-100) để tạo cảm giác soi gương AR.
3. Hỗ trợ dự phòng chuột/cảm ứng nếu học sinh không bật camera.

Cơ chế trực quan hóa toán học (Trọng tâm giáo dục):
1. Mỗi màn chơi đưa ra một bài toán thực tế sinh động:
   - Ví dụ: "Lớp 4A thu gom được 45 kg giấy vụn. Số kg giấy vụn của tổ 1 bằng 2/3 số kg của tổ 2. Hỏi mỗi tổ thu được bao nhiêu kg?"
   - Màn hình AR vẽ SƠ ĐỒ ĐOẠN THẲNG TRỰC QUAN:
     + Thanh Tổ 1: 2 ô năng lượng Neon màu xanh lục [ ■ ][ ■ ]
     + Thanh Tổ 2: 3 ô năng lượng Neon màu vàng cam [ ■ ][ ■ ][ ■ ]
     + Tổng số ô = 2 + 3 = 5 ô bằng nhau, tổng = 45 kg.
2. Học sinh hình dung ngay: 5 ô = 45 kg => 1 ô = 45 : 5 = 9 kg.
   - Tổ 1 = 9 x 2 = 18 kg.
   - Tổ 2 = 9 x 3 = 27 kg.

Cơ chế vận động thể chất AR:
1. Giai đoạn 1 (Đếm phần): Học sinh giơ 2 bàn tay mở rộng ngang ngực tương ứng với sơ đồ đoạn thẳng để kích hoạt bài toán.
2. Giai đoạn 2 (Chọn đáp án): Ba quả cầu năng lượng mang các đáp án rơi xuống hoặc bay lơ lửng:
   - Một quả mang đáp án đúng: [1 phần = 9kg, Số bé = 18kg, Số lớn = 27kg]
   - Hai quả bẫy sai lầm phổ biến: [1 phần = 5kg (quên chia)], [Số bé = 15kg, Số lớn = 30kg (tính nhầm)]
3. Học sinh vung tay đấm (Punch) vào quả cầu đúng để ghi 100 điểm kèm âm thanh chiến thắng synthesizer rực rỡ và hiệu ứng pháo hoa hạt nổ (Particle Burst).
4. Nếu đấm nhầm đáp án bẫy: Màn hình nứt vỡ (Cracked Glass Effect), phát âm thanh trầm cảnh báo, trừ 1 tim và hiển thị ngay lời giải thích ngắn gọn: "Nhớ lấy Tổng (45) chia cho Tổng số phần (2+3=5) để ra 1 phần = 9 nhé!".

Giao diện & Trải nghiệm:
- Bảng HUD phong cách Sci-Fi Cyberpunk hiện đại dành cho trẻ em (màu sắc tươi sáng, font Fredoka/Outfit).
- Hiển thị 5 Trái Tim Máu, Điểm số, Chuỗi Combo x2 x3 khi làm đúng liên tiếp.
- Màn hình Game Over / Chiến Thắng có nút Chơi Lại (Play Again).

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
