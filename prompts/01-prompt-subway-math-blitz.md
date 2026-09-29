# 🎯 PROMPT MẪU 1: SUBWAY MATH BLITZ AR (CHIẾN THẦN CỬU CHƯƠNG & TOÁN 4-5)

> **Mô tả:** Prompt tái tạo chính xác cơ chế của tựa game trong link bạn đã gửi: Thẻ bài rơi tự do phong cách Subway Surfers, người chơi dùng 1 bàn tay đấm thẻ đúng, né thẻ sai, nếu đấm nhầm thì kính màn hình vỡ toảng.

> **LEGACY (LEG-01)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Hãy tạo một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "SUBWAY MATH BLITZ - CHIẾN THẦN TOÁN HỌC".

### CƠ CHẾ GAMEPLAY:
1. **Camera AI Hand Tracking:**
   - Dùng MediaPipe Tasks Vision HandLandmarker (pin @1.0.1, vision_bundle.mjs + wasm + hand_landmarker.task) để phát hiện 1 bàn tay của người chơi qua webcam.
   - Lật gương webcam (`transform: -scale-x-100`) và áp dụng bộ lọc mượt EMA để tay di chuyển ổn định.
   - Vẽ tâm ngắm đấm bốc 🥊 tại tọa độ bàn tay, kèm vệt kiếm neon rực rỡ bám theo tay.
   - Hỗ trợ cả chuột (click) và cảm ứng để phòng khi không có camera.

2. **Thẻ Bài Rơi (Subway Surfers Style):**
   - Màn hình chia thành 3 làn chạy. Các thẻ phép tính rơi đều từ trên xuống.
   - Thẻ được thiết kế hình chữ nhật bo góc, viền neon, có 5 chủ đề màu ngẫu nhiên: Chuối Vàng 🍌, Ván Trượt Xanh 🛹, Tên Lửa Hồng 🚀, Giày Nhún Lục 👟, Hộp Quà Tím 🎁.
   - Trên mỗi thẻ hiển thị phép tính Toán học (ví dụ: "7 × 8 = 56" hoặc "3/4 + 1/4 = 1").

3. **Luật Chơi & Thưởng Phạt:**
   - Người chơi có 5 Máu (trái tim ❤️).
   - Vung tay đấm trúng thẻ ĐÚNG:
     * Cộng điểm (+10 x Combo).
     * Nổ 24 mảnh hạt tung tóe và sóng chấn động.
     * Âm thanh nhặt xu vui nhộn (Web Audio API) tăng cao độ theo chuỗi combo.
   - Đấm nhầm vào thẻ SAI:
     * Bị trừ 1 Máu.
     * Màn hình chớp đỏ, xuất hiện 15 tia rạn nứt kính mạng nhện tỏa ra từ điểm đấm.
     * Âm thanh kính vỡ toảng (Web Audio API + Web Audio API).
     * Rung nhẹ màn hình và hiện banner giải thích chi tiết đáp án đúng.
   - Hết 5 máu: Hiện bảng Game Over tổng kết điểm số, kỷ lục High Score và nút chơi lại.

4. **Nội Dung Bài Toán:**
   - Hỗ trợ chọn chủ đề:
     * Bảng Cửu Chương nhân chia 2 đến 9
     * Toán Lớp 4: Nhân nhẩm 11, cộng phân số cùng mẫu, đổi đơn vị m², tấn tạ yến
     * Toán Lớp 5: Tính nhẩm số thập phân (0.25 × 4, 0.5 × 6), tỉ số %, vận tốc s = v × t.
   - Tỉ lệ: 60% thẻ đúng, 40% thẻ sai làm bẫy.

Toàn bộ code gói gọn trong 1 file HTML, dùng CSS nội tuyến (không dùng Tailwind Play CDN), Web Audio API (không cần CDN âm thanh), MediaPipe Tasks Vision CDN (pin @1.0.1), có giao diện hoạt hình màu sắc rực rỡ, sẵn sàng chạy ngay.

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
