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
13. LỚP HỌC THẬT: chữ và HUD không đè lên thân học sinh (chia khung hình 3×3, ô giữa và ô giữa trên là vùng cấm đặt chữ); chọn cơ chế theo mức camera đang thấy (chỉ tay / nửa thân trên / toàn thân) thay vì đòi mức cao nhất, thiếu vai thì bỏ nghiêng thân và hiện một dòng tiếng Việt nói rõ camera thấy tới đâu; lưu hồ sơ tiến bộ vào localStorage key "miti-mastery" theo cụm kiến thức (số lần gặp, số lần đúng, errorTag sai nhiều nhất, ngày chơi gần nhất — không lưu ảnh/video) rồi xếp câu theo lỗi yếu nhất và so sánh với lần chơi trước ở màn tổng kết; có nút bật chế độ hai học sinh chạy maxNumHands: 2, chia khung hình hai nửa theo trục dọc, mỗi tay chỉ chốt trong nửa của mình, điểm và tim tách riêng, không xếp hạng.
14. TIẾP CẬN + AN TOÀN THẦN KINH: không hiệu ứng nào bật–tắt quá 3 lần mỗi giây, không giật sáng phủ toàn màn hình và vùng đang nhấp nháy không vượt 25% khung hình (flash khi mất máu là viền mép mờ dần 200–300 ms, viền HUD theo combo thì đổi độ sáng mượt); lúc khởi động đọc matchMedia("(prefers-reduced-motion: reduce)") và nếu đúng thì BẬT SẴN chế độ Giảm hiệu ứng — tắt particle, bỏ giật màn hình, hit-stop hạ còn khoảng 30 ms — nhưng giữ nguyên 100% nội dung học, số lượt và lời giải, không bắt học sinh tự tìm nút; mọi trạng thái đúng/sai/đang chọn/bị khóa phân biệt được bằng ít nhất hai kênh ngoài màu (biểu tượng ✓ ✗, chữ tiếng Việt, hình dạng, âm thanh) chứ không chỉ dựa vào cặp đỏ–xanh lá; mọi âm thanh có bản chữ tương đương và nút "Hiện chữ" bật được ngay từ đầu; chữ so với nền ngay sau lưng nó đạt tương phản >= 4.5:1 (chữ lớn >= 24px thì >= 3:1), mỗi thẻ tự có nền + viền >= 2px + bóng đổ nên tắt lớp phủ đi vẫn đọc được; màn calibration hỏi một chạm "Em thuận tay nào?" (Trái / Phải / Cả hai, mặc định Phải) rồi gương lại hướng dẫn và gán tay điều khiển theo lựa chọn đó, đổi tay thuận giữa chừng không mất điểm và lượt.
15. CHỮ KÝ MiTi (bắt buộc trong HTML): ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang hoặc màn kết quả có dòng "MiTi • Học bằng chuyển động"; không xóa hoặc đổi tên thương hiệu khi replay hay ở chế độ không camera.
16. ĐẦU RA: duy nhất 1 file HTML hoàn chỉnh, CSS nội tuyến trong một khối <style>, không file .css/.js/.json/ảnh/mp3 ngoài, không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không lỗi console khi mở trực tiếp bằng trình duyệt.
```
