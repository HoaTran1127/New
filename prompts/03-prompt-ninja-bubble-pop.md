# ⚔️ PROMPT MẪU 3: MATH NINJA BUBBLE POP (CHÉM BONG BÓNG TOÁN HỌC)

> **Mô tả:** Cơ chế Fruit Ninja / Chém bóng. Các bong bóng mang số thập phân và phân số bay từ dưới lên theo đường cong parabol, người chơi vung tay chém vỡ bong bóng thỏa mãn điều kiện.

> **LEGACY (LEG-03)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Hãy tạo một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "MATH NINJA BUBBLE POP - KIẾM THỦ TOÁN HỌC".

### CƠ CHẾ GAMEPLAY:
1. **Camera AI Hand Tracking:**
   - Dùng MediaPipe Tasks Vision HandLandmarker (pin @1.0.1, file vision_bundle.mjs + wasm + hand_landmarker.task).
   - Lấy tọa độ ngón trỏ hoặc bàn tay để tạo hiệu ứng "Lưỡi Kiếm Ánh Sáng Laser (Laser Katana)".
   - Vệt chém (Blade Trail) phát sáng rực rỡ màu xanh ngọc hoặc tím neon, mờ dần theo chuyển động vung tay.
   - Khi tay vung nhanh cắt qua bong bóng (Line Segment Intersection), bong bóng sẽ bị chém đứt đôi!

2. **Bong Bóng Bay Theo Đường Cong Parabol (Fruit Ninja Style):**
   - Các quả bong bóng nhiều màu sắc được bắn từ đáy màn hình bay vút lên trên rồi rơi xuống theo lực hấp dẫn gravity.
   - Bên trong mỗi quả bóng chứa một phép tính hoặc một con số (Toán Lớp 4 hoặc Lớp 5).

3. **Luật Chơi Thử Thách:**
   - Đề bài đưa ra yêu cầu ở đầu màn hình (Ví dụ: "Hãy chém các số chia hết cho 9!" hoặc "Chém các phép tính ĐÚNG!").
   - Chém trúng bóng HỢP LỆ: Bóng vỡ đôi, phát nổ hạt lấp lánh, âm thanh kiếm chém sắc bén (Web Audio API), điểm số bay lên (+10 x Combo).
   - Chém nhầm bóng BẪY: Mất 1 mạng, xuất hiện sấm sét hoặc chớp đỏ cảnh báo.
   - Bỏ lỡ bóng hợp lệ rơi xuống đáy màn hình: Mất chuỗi Combo.

4. **Đồ Họa & Âm Thanh:**
   - Font chữ hoạt hình tiếng Việt (Fredoka, Outfit).
   - Đồ họa Canvas 2D mượt mà 60 FPS.
   - Âm thanh vung kiếm và tiếng bóng nổ "BOP" giòn giã được tổng hợp hoàn toàn bằng Web Audio API.

Toàn bộ gói gọn trong 1 file HTML hoàn chỉnh sẵn sàng chạy trên trình duyệt máy tính.

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
