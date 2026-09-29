# Prompt Gemini Canvas: Game AR Toán 5 - Kiến Trúc Sư Khối 3D (Thể Tích Hình Hộp Chữ Nhật & Lập Phương)

> **Môn học:** Toán Lớp 5 (SGK Cánh Diều / Kết Nối Tri Thức / Chân Trời Sáng Tạo)  
> **Chủ đề bài học:** Thể tích hình hộp chữ nhật và hình lập phương ($V = a \times b \times c$, $V = a^3$); Xăng-ti-mét khối, Đề-xi-mét khối  
> **Khái niệm hình dung:** Mô hình không gian 3D isometric xếp từng lớp khối lập phương đơn vị ($1\text{ cm}^3$) lấp đầy chiều dài, chiều rộng và chiều cao  
> **Cử chỉ AR:** 2 tay nhấc khối lập phương thả vào hộp + Vuốt tay từ dưới lên trên để nâng số tầng (chiều cao)

> **LEGACY (LEG-11)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 5 học chuyên đề "Thể Tích Hình Hộp Chữ Nhật và Hình Lập Phương".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Giao diện: CSS nội tuyến trong một khối <style>, không dùng Tailwind Play CDN.
   - Biểu tượng: inline SVG, không tải FontAwesome.
      - MediaPipe Tasks Vision, phiên bản pin 1.0.1 (vision_bundle.mjs + wasm + hand_landmarker.task; pose_landmarker_lite.task nếu cần tư thế toàn thân)
   - Âm thanh: tổng hợp bằng Web Audio API, không dùng file mp3 ngoài.
2. Luôn lật ngang video webcam (transform: -scale-x-100) để tạo cảm giác soi gương AR.
3. Hỗ trợ dự phòng chuột/cảm ứng nếu học sinh không bật camera.

Cơ chế trực quan hóa toán học:
1. Màn hình vẽ một chiếc lồng kính hình hộp chữ nhật trong suốt dưới góc nhìn Isometric 3D với kích thước cho trước:
   - Ví dụ: Chiều dài a = 4 cm, Chiều rộng b = 3 cm, Chiều cao c = 2 cm.
2. Trực quan hóa từng bước giúp bé hiểu rõ bản chất công thức:
   - Bước 1 (Diện tích đáy): Một hàng có 4 khối 1 cm³. Có 3 hàng như vậy -> 1 lớp đáy có 4 x 3 = 12 khối.
   - Bước 2 (Thể tích toàn khối): Cần xếp 2 tầng như thế -> Tổng số khối = 12 x 2 = 24 khối 1 cm³ = 24 cm³!
   - Học sinh nhìn thấy từng khối phát sáng xếp lớp chồng lên nhau, khắc sâu vì sao Thể tích = Dài x Rộng x Cao = Diện tích đáy x Chiều cao!

Cơ chế vận động thể chất AR:
1. Tay của học sinh mang găng tay cơ khí phát sáng AR.
2. Thử thách 1 - Xếp đáy hộp: Học sinh vung tay kéo các khối lập phương phát sáng thả vào mặt đáy hộp để lấp đầy 4 x 3 ô.
3. Thử thách 2 - Nâng chiều cao: Khi đáy đã đầy, học sinh dùng cả hai bàn tay hướng lên trời và đẩy người vươn cao (Vertical Reach) để nhân đôi số tầng, hoàn thiện chiếc hộp 3D lộng lẫy.
4. Thử thách 3 - Tính toán thể tích: Ba con số thể tích rơi xuống kèm đơn vị (cm³ vs cm² vs dm³):
   - Đáp án đúng: [24 cm³]
   - Đáp án bẫy: [24 cm²] (sai đơn vị diện tích), [9 cm³] (cộng nhầm 4+3+2), [18 cm³]
   - Học sinh vung tay đấm vỡ khối đáp án chính xác để nhận cúp Kiến Trúc Sư Vàng.
5. Nếu chọn nhầm đáp án bẫy đơn vị: Hộp kính nứt vỡ rạn nát, hiện dòng nhắc: "Thể tích phải đo bằng xăng-ti-mét KHỐI (cm³), không phải xăng-ti-mét vuông (cm²) nhé!".

Giao diện & Cảm giác chơi:
- Phong cách game xây dựng khối như Minecraft / Lego Hologram trong phòng thí nghiệm tương lai.
- Mỗi lần thả khối phát ra âm thanh gõ gỗ/thủy tinh vui tai, khi hoàn thành khối hộp phát nhạc khải hoàn huy hoàng.

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
