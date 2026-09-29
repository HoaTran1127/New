# 🍏 PROMPT MẪU 2: AR MATH CATCHER (HỨNG QUẢ TOÁN HỌC)

> **Mô tả:** Cơ chế hứng đồ rơi (Catcher Mechanics). Học sinh di chuyển bàn tay làm chiếc Giỏ hứng 🧺 để bắt các quả táo/bong bóng mang phép tính ĐÚNG và né quả bom SAI.

> **LEGACY (LEG-02)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Hãy tạo một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "AR MATH CATCHER - GIỎ HỨNG TOÁN HỌC".

### CƠ CHẾ GAMEPLAY:
1. **Camera AI Hand Tracking:**
   - Dùng MediaPipe Tasks Vision HandLandmarker (pin @1.0.1, file vision_bundle.mjs + wasm + hand_landmarker.task).
   - Lấy tọa độ bàn tay của người chơi qua webcam để điều khiển một "Chiếc Giỏ Hứng 🧺" di chuyển ngang ở phía đáy màn hình.
   - Hỗ trợ di chuyển chuột hoặc vuốt chạm cảm ứng phòng khi không có camera.

2. **Quả Táo Toán Học Rơi Tự Do:**
   - Các quả cầu / quả táo mang phép tính toán học (Toán Lớp 4 & 5) rơi từ trên xuống với vận tốc ngẫu nhiên.
   - Quả táo ĐÚNG: Có màu Xanh Ngọc Lục Bảo (#10B981) phát sáng viền trắng.
   - Quả táo SAI: Có màu Đỏ Cam Cảnh Báo (#EF4444) phát sáng.

3. **Luật Chơi:**
   - Người chơi có 3 Máu.
   - Hứng được Quả Đúng: +10 điểm, nổ hạt sao màu xanh lá, âm thanh "Pop" vui tai (Web Audio API).
   - Hứng nhầm Quả Sai: -1 máu, nổ mảnh vỡ đỏ, âm thanh cảnh báo lỗi (Web Audio API), hiện dòng thông báo giải thích ngắn vì sao phép tính bị sai.
   - Hết máu hiện Game Over và nút chơi lại.

4. **Nội Dung Học Tập:**
   - Tự động sinh ngẫu nhiên các câu hỏi Toán Lớp 4 & 5:
     * Cộng trừ phân số: 2/5 + 1/5 = 3/5
     * Phép tính số thập phân: 1.2 + 0.8 = 2.0
     * Tỉ số phần trăm: 50% của 200 = 100
     * Công thức chuyển động: s = v × t.
   - Tỉ lệ: 65% quả đúng, 35% quả sai.

Tất cả nằm trong 1 file HTML duy nhất, không dùng file mp3 ngoài, giao diện CSS nội tuyến đẹp mắt, font chữ Fredoka vui nhộn.

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
