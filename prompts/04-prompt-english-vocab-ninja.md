# 🇬🇧 PROMPT MẪU 4: ENGLISH VOCABULARY NINJA AR (GAME TIẾNG ANH VẬN ĐỘNG)

> **Mô tả:** Game AR tương tác vận động dành cho môn Tiếng Anh Tiểu học (Lớp 3, 4, 5). Các từ vựng tiếng Anh rơi xuống, học sinh vung tay chém đúng từ theo yêu cầu đề bài (ví dụ: "Chém các loài động vật 🐯", "Chém các loại trái cây 🍎", hoặc "Chém từ đồng nghĩa / trái nghĩa").

> **LEGACY (LEG-04)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Bạn là một Chuyên gia Lập trình Game Giáo dục Web AR (HTML5, Canvas 2D, MediaPipe, Web Audio API).
Hãy tạo cho tôi một game Web AR tương tác vận động 1 file HTML hoàn chỉnh có tên "ENGLISH WORD NINJA AR - HIỆP SĨ TỪ VỰNG TIẾNG ANH" dành cho học sinh tiểu học (Lớp 4 & 5).

### 1. CƠ CHẾ VẬN ĐỘNG THỂ CHẤT (KINÊSTHETIC AR):
- Dùng MediaPipe Tasks Vision HandLandmarker (pin @1.0.1, file vision_bundle.mjs + wasm + hand_landmarker.task).
- Camera lật gương (`transform: -scale-x-100`) và áp dụng bộ lọc mượt EMA để tay vung kiếm mượt mà.
- Học sinh đứng cách camera 1.5m - 2m, dùng 1 bàn tay như lưỡi kiếm ánh sáng Laser Neon vung chém vào không khí để chém vỡ các thẻ từ vựng đúng.
- Hỗ trợ cả chuột (click/move) để học sinh vẫn chơi được nếu máy tính chưa có webcam.

### 2. CƠ CHẾ GAMEPLAY & LUẬT CHƠI:
- Đề bài hiển thị ở đầu màn hình (Ví dụ: "NHIỆM VỤ: CHÉM CÁC TỪ THUỘC CHỦ ĐỀ ĐỘNG VẬT (ANIMALS) 🦁").
- Các thẻ từ vựng rơi từ trên xuống theo 3 làn chạy.
- Thẻ mang TỪ ĐÚNG (thuộc chủ đề): Vung tay chém trúng sẽ +10 điểm x Combo, thẻ nổ hạt sao rực rỡ kèm tiếng chuông nhặt xu vang lên (Web Audio API).
- Thẻ mang TỪ SAI (bẫy - ví dụ lẫn từ thuộc chủ đề Fruits hoặc School): Nếu chém nhầm, màn hình nứt vỡ toảng mạng nhện, trừ 1 Máu và hiện nghĩa tiếng Việt cảnh báo.
- Có 5 Máu (trái tim ❤️), hết máu hiện bảng Game Over và High Score.

### 3. NỘI DUNG TỪ VỰNG TIẾNG ANH TIỂU HỌC:
Tự động sinh ngẫu nhiên theo các chủ đề bám sát SGK Tiếng Anh Lớp 4 & 5:
- Chủ đề 1: Animals 🐶 (Tiger, Elephant, Monkey, Dolphin, Penguin...)
- Chủ đề 2: Fruits & Food 🍎 (Apple, Banana, Orange, Pizza, Bread...)
- Chủ đề 3: School Things 📚 (Pencil, Ruler, Notebook, Eraser, Backpack...)
- Chủ đề 4: Jobs & Occupations 👨‍⚕️ (Doctor, Teacher, Pilot, Farmer, Cook...)
- Chủ đề 5: Opposites (Từ trái nghĩa: Big - Small, Fast - Slow, Hot - Cold...)

### 4. ĐỒ HỌA & ÂM THANH:
- Toàn bộ gói gọn trong 1 file HTML duy nhất.
- Dùng CSS nội tuyến (không dùng Tailwind Play CDN) + Google Fonts (Fredoka, Outfit).
- Âm thanh tự tổng hợp bằng Web Audio API (không dùng file mp3 ngoài).
- Màu sắc rực rỡ phong cách EdTech hoạt hình.

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
