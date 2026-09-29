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
15. TỰ KIỂM CHỨNG NGÂN HÀNG CÂU HỎI + ĐỘ KHÓ THÍCH ỨNG: viết hàm `verifyQuestionBank()` chạy MỘT LẦN trước vòng chơi đầu tiên và kiểm từng mục — `answer` phải có trong `choices` và xuất hiện đúng một lần; `explanation` / `errorTag` / `loiViet` khác rỗng; `errorTag` thuộc đúng danh sách đã khai báo; không hai mục trùng `prompt`; `level` chỉ nhận 1/2/3 và mỗi level chiếm tối thiểu 1/4 số mục; mục trượt thì loại khỏi vòng chơi kèm console.warn nêu id và lý do bằng tiếng Việt. Mỗi phương án nhiễu phải sai theo MỘT LỖI THẬT trong danh sách lỗi (cấm giá trị ngẫu nhiên vô nghĩa) và phải thử câu hỏi "theo cách hiểu hợp lý nào đó phương án này có đúng không" để không còn hai đáp án cùng đúng. Mọi số nằm trong phạm vi SGK đã khai báo, không số âm ngoài phạm vi đã học, không chia cho 0, kết quả hữu hạn; game Tiếng Anh thì mọi từ phải có trong word list đã khai báo. Đáp án đúng không được đoán bằng mẹo hình thức: không là số lớn nhất/nhỏ nhất ở quá 20% số mục, không là phương án dài nhất ở quá 20%, không lặp nguyên văn cụm từ hiếm trong đề, và vị trí đúng phân bố đều mỗi chỗ 1/3 số mục ± 10% (đếm bằng chính hàm seed đã xáo). Level phải khớp số bước thật: 1 = một phép tính một bước, 2 = hai bước, 3 = ba bước trở lên hoặc hai lần đổi đơn vị. Độ khó đi theo năng lực chứ không theo vị trí: 2 câu đúng liên tiếp thì lên một level, 2 câu sai liên tiếp thì xuống một level và BẮT BUỘC cùng errorTag với câu vừa sai; lượt 5 và lượt 9 chỉ còn là mốc nhịp. Sàn chống nản: không để học sinh sai quá 3 câu liên tiếp — câu thứ 4 là level 1 cùng errorTag, hiện lời giải TỪNG BƯỚC (mỗi bước một dòng, đúng dạng bài) trước khi cho chọn lại, chọn lại đúng thì không trừ tim lần hai và tổng kết ghi "em đã sửa được". Level ẩn với học sinh: không hiện chữ "level", "trình độ" hay số sao xếp hạng; phân bố theo level chỉ hiện ở màn tổng kết dành cho giáo viên.
16. CHỮ KÝ MiTi (bắt buộc trong HTML): ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang hoặc màn kết quả có dòng "MiTi • Học bằng chuyển động"; không xóa hoặc đổi tên thương hiệu khi replay hay ở chế độ không camera.
17. ĐẦU RA: duy nhất 1 file HTML hoàn chỉnh, CSS nội tuyến trong một khối <style>, không file .css/.js/.json/ảnh/mp3 ngoài, không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không lỗi console khi mở trực tiếp bằng trình duyệt.
```
