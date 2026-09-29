# Prompt Gemini Canvas: Game AR Toán 5 - Cao Tốc Tốc Độ (Toán Chuyển Động Đều & Hai Xe Gặp Nhau)

> **Môn học:** Toán Lớp 5 (SGK Cánh Diều / Kết Nối Tri Thức / Chân Trời Sáng Tạo)  
> **Chủ đề bài học:** Vận tốc ($v$), Quãng đường ($s$), Thời gian ($t$); Hai chuyển động cùng chiều / ngược chiều gặp nhau  
> **Khái niệm hình dung:** Mô hình chuyển động thời gian thực trên trục tọa độ quãng đường, trực quan hóa $(v_1 + v_2) \times t = s$  
> **Cử chỉ AR:** 2 tay điều khiển 2 phương tiện + Vỗ tay (Clap) / Chạm tay đúng thời khắc hai xe gặp nhau

> **LEGACY (LEG-10)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 5 học chuyên đề "Toán Chuyển Động Đều: Vận tốc, Quãng đường, Thời gian và Hai vật gặp nhau".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Giao diện: CSS nội tuyến trong một khối <style>, không dùng Tailwind Play CDN.
   - Biểu tượng: inline SVG, không tải FontAwesome.
      - MediaPipe Tasks Vision, phiên bản pin 1.0.1 (vision_bundle.mjs + wasm + hand_landmarker.task; pose_landmarker_lite.task nếu cần tư thế toàn thân)
   - Âm thanh: tổng hợp bằng Web Audio API, không dùng file mp3 ngoài.
2. Luôn lật ngang video webcam (transform: -scale-x-100) để tạo cảm giác soi gương AR.
3. Hỗ trợ dự phòng chuột/cảm ứng nếu học sinh không bật camera.

Cơ chế trực quan hóa bài toán chuyển động:
1. Màn hình hiển thị một cung đường đua nối giữa Thành phố A và Thành phố B (Ví dụ: khoảng cách AB = 150 km).
2. Xe ô tô màu đỏ xuất phát từ A với vận tốc v1 = 50 km/h.
   Xe máy màu xanh xuất phát từ B ngược chiều về A với vận tốc v2 = 25 km/h.
3. Đồng hồ thời gian mô phỏng (Virtual Clock) chạy từng giờ:
   - Sau 1 giờ: Quãng đường còn lại = 150 - (50 + 25) = 75 km.
   - Sau 2 giờ: Quãng đường rút ngắn về 0 km -> Hai xe gặp nhau!
   - Trực quan hóa công thức: Thời gian gặp nhau t = s : (v1 + v2) = 150 : 75 = 2 giờ!
4. Giúp học sinh hiểu sâu sắc: Cứ mỗi giờ trôi qua, hai xe lại cùng nhau rút ngắn một quãng đường bằng tổng hai vận tốc (v1 + v2).

Cơ chế vận động thể chất AR:
1. Bàn tay trái của bé điều khiển Xe A, bàn tay phải điều khiển Xe B.
2. Trên cung đường xuất hiện các biển báo mốc thời gian và câu hỏi:
   - "Hai xe sẽ gặp nhau sau bao nhiêu giờ?" -> Ba cổng năng lượng hiện ra: [2 giờ], [3 giờ], [1.5 giờ].
   - Học sinh giơ tay đẩy xe lao qua cổng thời gian chính xác [2 giờ].
3. Thử thách bắt trọn điểm hẹn (Rendezvous Clap): Khi hai xe tiến sát đến vị trí gặp nhau trên đường, học sinh phải vỗ 2 bàn tay vào nhau (khoảng cách 2 lòng bàn tay < 60px) đúng tại vị trí cờ hoa để hoàn tất thử thách đón khách an toàn.
4. Nếu chọn nhầm thời gian hoặc tính sai vận tốc: Hai xe bị chết máy, màn hình rung chuyển và nứt kính (Cracked glass), hiện bảng phân tích: "Sau 1 giờ hai xe đi được: 50 + 25 = 75 km. Vậy để đi hết 150 km cần: 150 : 75 = 2 giờ nhé!".

Giao diện & Cảm giác chơi:
- Giao diện như một bảng điều khiển trung tâm kiểm soát giao thông thông minh trong phim hoạt hình viễn tưởng.
- Có âm thanh còi xe vui nhộn, tiếng động cơ rồ ga chân thực khi trả lời đúng, tiếng phanh xe kít kít khi trả lời sai.
- 5 mạng chơi, thanh tiến trình quãng đường động chạy từ 0% đến 100%.

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
