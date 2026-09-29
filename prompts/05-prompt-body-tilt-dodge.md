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
1. NỀN AR — khung hình webcam CHÍNH LÀ màn chơi, không phải ảnh nền trang trí:
   - Vẽ video vào canvas mỗi khung hình, lật gương + cover-fit: scale = Math.max(W / video.videoWidth, H / video.videoHeight); drawW = video.videoWidth * scale; drawH = video.videoHeight * scale; offX = (W - drawW) / 2; offY = (H - drawH) / 2.
   - HÀM CHIẾU DUY NHẤT toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH } dùng chung cho drawImage, spawn, va chạm, vật neo và hiệu ứng; cấm lx * W.
   - Lớp phủ tối để đọc chữ: ĐÚNG MỘT lớp rgba(8,5,20,0.4), alpha không vượt 0.45; mỗi thẻ tự có nền gradient + viền + bóng.
   - CHIỀU SÂU: mỗi vật thể mang z từ 1.6 (xa) về 0.35 (sát mặt người chơi), kích thước = cỡ gốc / z, có ellipse bóng mờ dưới chân; thêm đường tốc độ hai bên mép.
   - NEO VÀO CƠ THỂ: vật ảo đeo/buộc vào landmark thật và cập nhật mỗi khung hình (cổ tay 0, khuỷu 13/14, vai 11/12, hông 23/24, tâm bàn tay = trung bình 5, 9, 13, 17); mất landmark thì ẩn vật kèm hướng dẫn tiếng Việt.
2. NGÂN HÀNG DỮ LIỆU: khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau. Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet }; tối thiểu 40 mục chia 3 mức độ; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo trộn vị trí đáp án bằng seed theo lượt.
3. CAMERA: MediaPipe Tasks Vision pin phiên bản (vision_bundle.mjs@1.0.1 + wasm + hand_landmarker.task, pose_landmarker_lite.task nếu cần tư thế toàn thân). getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }); khung 4:3, crop nếu camera tỉ lệ khác, lật gương ngang khi hiển thị và tính tọa độ.
4. CHỈ XIN QUYỀN CAMERA SAU khi học sinh bấm BẮT ĐẦU. Trạng thái tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại). Có khung định vị để học sinh biết đặt tay ở đâu.
5. CHỐNG CHỐT NHẦM: làm mượt EMA alpha 0.4–0.5; cử chỉ chỉ fire ở lượt chuyển trạng thái kèm hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim; hover không phải hit; confidence thấp thì không chốt.
6. FALLBACK: chuột / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính, có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng không tải lại trang. CDN hoặc model lỗi thì tự chuyển sang chế độ không camera, game vẫn chơi đủ, mục tiêu học tập vẫn đủ 100%.
7. PHẢN HỒI HỌC TẬP: sai thì dừng 2 giây, chỉ rõ bước hoặc chữ số hoặc từ cần sửa, không hiệu ứng nào che lời giải; câu sai xếp vào CUỐI vòng chơi để luyện lại; màn tổng kết nhóm theo loiViet kiểu "Em hay sai ở: ..." kèm số câu đúng/sai theo mức độ.
8. Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em". Chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive dọc và ngang, có Pause, Replay, Giảm hiệu ứng chuyển động; không leaderboard, không quảng cáo.
9. RIÊNG TƯ: không upload ảnh/video từ camera, chỉ giữ landmark trong bộ nhớ, không thu thập dữ liệu cá nhân. Toàn bộ UI, tên nút, hướng dẫn, thông báo và lời giải bằng TIẾNG VIỆT; không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.
10. CHUYỂN ĐỘNG CÔNG BẰNG + MÁY YẾU: vật thể đúng và sai trộn theo tỉ lệ xấp xỉ 60/40, chạm sai trừ tim còn bỏ lỡ đúng chỉ mất chuỗi (vung bừa không thắng được); calibration 3 giây đo tầm tay và bề rộng vai rồi đặt ngưỡng theo đơn vị vừa đo, không dùng hằng số pixel cố định; tự Pause khi tab ẩn hoặc mất tiêu điểm và đếm 3-2-1 khi quay lại kèm reset cooldown; nhận diện chạy 1 lần mỗi 2–3 khung hình, particle có pool và không cấp phát trong vòng vẽ, FPS dưới 28 thì tự giảm hiệu ứng chứ không giảm nội dung học.
11. AN TOÀN LỚP HỌC: một dòng nhắc "Dọn vật cản khỏi vùng đứng, giữ cách tường một bước, chỉ chuyển động trong tầm tay"; khung hình tối hoặc ngược sáng thì gợi ý bật đèn/chỉnh hướng sáng và vẫn cho chơi tiếp; camera bị chặn vì môi trường không an toàn thì báo tiếng Việt rồi vào thẳng chế độ không camera; màn tổng kết trình bày ba thẻ chữ to "Làm tốt / Cần luyện / Động tác lần sau".
12. VẬN ĐỘNG TO + CẢM GIÁC ARCADE: mỗi lượt là một động tác lớn (cả cánh tay hoặc thân người đi hết >= 50% tầm với đã đo lúc calibration, không thắng cả vòng bằng cổ tay kề vai); vùng đích đặt sát mép khung hình và đổi vị trí theo lượt, xen kẽ trái/phải/hai tay để không mỏi một bên; 12 lượt chia 3 hiệp, giữa hai hiệp có "trạm nghỉ" 5 giây không trừ tim, màn tổng kết có thẻ đếm số động tác. Cú chốt đúng phải có hit-stop 70–90 ms + giật màn hình 4–6 px + thẻ lún 0.85 rồi nảy (squash & stretch), combo lên tới x5 với cao độ âm thanh tăng dần, chữ khen tiếng Việt bật lên ngay tại điểm chạm, mỗi vòng có 2 thẻ vàng "nhân đôi điểm trong 5 giây"; toàn bộ FX vẽ trên canvas trong phủ đúng khung hình camera và không được che lời giải.
13. CHỮ KÝ MiTi (bắt buộc trong HTML): ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang hoặc màn kết quả có dòng "MiTi • Học bằng chuyển động"; không xóa hoặc đổi tên thương hiệu khi replay hay ở chế độ không camera.
14. ĐẦU RA: duy nhất 1 file HTML hoàn chỉnh, CSS nội tuyến trong một khối <style>, không file .css/.js/.json/ảnh/mp3 ngoài, không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không lỗi console khi mở trực tiếp bằng trình duyệt.
```
