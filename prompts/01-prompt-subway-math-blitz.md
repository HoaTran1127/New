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

1. VÒNG LẶP THU HÚT
- Ba giây đầu: vừa vào gameplay (trước lượt 1), một vật thể AR lớn bay ngang sát người chơi kèm vệt neon và tiếng "vút"; mascot nói đúng một dòng nhiệm vụ, chữ >= 44px. Không mở màn bằng chữ dài (hướng dẫn ở nút "Xem cách chuyển động"). Không camera: vệt sáng trên nền tối; Giảm hiệu ứng: vật trượt chậm, không rung.
- Ba hiệp leo thang (chia đều số Main_Turn): hiệp 1 nền tĩnh, thẻ 4,5 giây; hiệp 2 viền HUD sáng dần theo combo, thẻ 3,75 giây; hiệp 3 "HIỆP QUYẾT ĐỊNH" nhân đôi điểm (hệ số không vượt x2), mascot hô mở hiệp, nhạc nhanh hơn. Giữa hai hiệp: trạm nghỉ 5 giây đếm 5-4-3-2-1, không tính sai, không mất tim. Ngân hàng câu và mức độ không đổi theo hiệp; sai ở hiệp 3 không phạt nặng hơn.
- Mở thưởng cuối mỗi hiệp: 2,5 giây quay qua ba phương án (thẻ bộ sưu tập / +10 điểm / một câu dễ hơn một bậc) rồi dừng kèm tiếng "tách"; luôn có thưởng, không đổi level thích ứng. Giảm hiệu ứng hoặc không camera: hiện ngay bằng chữ + nút "Nhận".
- Combo: chuỗi đúng hiện "x2, x3…" to dần, cao độ âm nhảy bậc (tối đa x5), đứt chuỗi thì âm rơi một cung; chữ khen ngắn ("ĐÚNG RỒI!", "CHỐT HẠ!") bay lên tại điểm chạm, câu sai dùng chữ đỡ ("Còn sát lắm!"), không chữ đỏ to. Mỗi vòng đúng 2 thẻ vàng "x2 điểm trong 5 giây" và 1 "câu thử thách" có âm báo riêng, tự biến mất sau 3 giây; tỉ lệ 60/40 và ngân hàng câu không đổi.
- Sắp tới mốc: em còn đúng 1 câu nữa chạm mốc 10 / 20 / 30 câu đúng thì làn của em hiện 1,5 giây "Còn 1 câu nữa tới mốc <m> — lượt kế x2 điểm"; đếm từ câu đúng thật, không hứa thưởng ảo.
- Điểm: +10 nhân chuỗi đúng; 5 tim, sai trừ 1 tim nhưng vẫn hiện đủ lời giải; 12 lượt chính (theo lượt ngón tay: 8 câu mỗi em), hết lượt là tổng kết.
- Chuyển lượt: spotlight quét sang làn mới (~400 ms), bùng màu làn mới, rồi đếm 3-2-1 đập (scale 1 → 1.2 → 1).
- Linh vật: đúng thì nhảy reo, sai thì gãi đầu động viên (không chế giễu), chuỗi dài thì múa ăn mừng.
- Trả lời đúng: hạt/confetti màu của em bắn ngay trong làn của em (tối đa 40 hạt, sống ≤ 800 ms).
- Khoảnh khắc lớn (chuỗi ≥ 3, vượt lên dẫn đầu, câu lội ngược dòng): rung màn hình ≤ 250 ms biên độ ≤ 8 px hoặc hit-stop 80–120 ms.
- Scoreboard: điểm lăn số tới giá trị mới (~500 ms); vương miện bay sang ô người dẫn đầu mới.
- Podium: các bậc trồi lên lần lượt từ hạng thấp tới hạng 1 (cách ~400 ms), rồi từng danh hiệu bật ra.
- Thẻ đuổi kịp lật 3D (~500 ms) để lộ "x2" hoặc "Lội ngược dòng".
- Hiệu chỉnh: làn đạt "P<n> sẵn sàng" thì viền phát sáng màu của em.
- Giới hạn: mọi nhấp nháy ≤ 3 lần/giây; Giảm hiệu ứng (prefers-reduced-motion hoặc nút "Giảm hiệu ứng") thay rung, hit-stop và hạt bằng mờ dần tĩnh; FPS < 15 suốt 3 giây thì TRƯỚC HẾT giảm hạt còn ≤ 12 và tắt rung, thấp thêm 3 giây mới giảm tần suất nhận diện (mỗi 2 khung).

2. CHẾ ĐỘ 1/2/3 NGƯỜI VÀ THI ĐUA
- Trước ván, màn "Mấy bạn cùng chơi?" có ba nút to 1 · 2 · 3 (mặc định 1, nhớ trong localStorage "miti-players").
- Chia màn hình thành N làn dọc bằng nhau (N = số người), mỗi làn viền màu riêng (vàng #FFD84D, xanh #4DD2FF, hồng #FF6FB1) kèm nhãn P1/P2/P3 để không phụ thuộc màu; N = 1 thì cả màn là một làn.
- Nhận diện khi N ≥ 2: game không lấy tay làm cơ chế chính dùng PoseLandmarker numPoses = N, mọi em chơi CÙNG LÚC trong làn của mình; game dùng tay/ngón tay theo mục "Cách nhận tay khi 2–3 bạn". N = 1 giữ model theo cơ chế của game.
- Gán làn mỗi khung theo tâm cơ thể = trung điểm hông 23/24 (thiếu hông thì vai 11/12), x đã lật gương: lane = min(N-1, floor(x·N)); không gán theo thứ tự model trả về.
- Chỉ ghi nhận động tác (với tay, nghiêng người, bước chân, cổ tay chạm mục tiêu) khi điểm chạm nằm trong làn của chính em; vật thể và đáp án sinh riêng từng làn, đề chung ở dải trên.
- Hiệu chỉnh từng làn trước đếm ngược: hướng dẫn "đứng lùi cách màn hình khoảng 2 m, cách nhau một sải tay, thấy cả người"; mỗi làn có ĐÚNG MỘT cơ thể liên tục 1 giây mới hiện "P<n> sẵn sàng"; đủ N làn mới đếm 3-2-1.
- Làn trống quá 2 giây: dừng đồng hồ riêng làn đó, hiện "P<n> quay lại vị trí nhé", làn khác chơi tiếp. Làn có hơn một cơ thể: hiện "Mỗi bạn đứng đúng làn của mình", ngưng ghi nhận làn đó tới khi còn một người.
- Không camera hoặc bị từ chối quyền: giữ N làn; P1 chạm/chuột trong làn 1 hoặc phím A/S/D, P2 phím mũi tên, P3 phím J/K/L; màn cảm ứng thì mỗi em chạm trong làn của mình.
- Cách nhận tay khi 2–3 bạn (nút bánh răng ở màn chọn số người): Tự động (mặc định) · Theo lượt ngón tay · Cổ tay đồng thời; nhớ trong localStorage "miti-input". N = 1 bỏ qua.
- Theo lượt (Tự động bắt đầu ở đây): trước ván báo "Máy đọc tay LẦN LƯỢT từng bạn nhé!"; mỗi lượt hiện Turn_Banner "Lượt của P<n> — sẵn sàng tay!" chữ lớn màu làn kèm giọng đọc rồi mới nhận đáp án; làn có lượt sáng, phóng to (~60% bề ngang), làn khác mờ 40%.
- Theo lượt: HandLandmarker numHands = 2, chỉ nhận tay có cổ tay (landmark 0) trong làn của bạn đang có lượt; PoseLandmarker numPoses = N chạy mỗi 3 khung giữ luật làn. Lượt xoay vòng P1 → P2 → … → PN → P1, mỗi em đúng 8 câu (tổng 8 × N lượt chính: 16 với 2 bạn, 24 với 3 bạn); đồng hồ chỉ chạy trong lượt của chính em.
- Tự động: FPS trung bình < 15 suốt 3 giây, hoặc 3 lần liên tiếp tay trượt (không thấy tay trong làn sau 1,5 giây) hay mơ hồ (confidence < 0.6, quá 2 tay trong làn, số ngón đổi ≥ 3 lần trong 1 giây) → chuyển NGAY sang Cổ tay đồng thời, thông báo ≤ 3 giây "Mình đổi sang chạm bằng cổ tay nhé!", giữ nguyên điểm mọi em. Lượt dở chơi lại bằng cổ tay, các bạn còn lại của vòng đó chơi tiếp lần lượt, từ vòng sau mọi em chơi cùng lúc tới khi mỗi em đủ 8 câu; không quay lại trong ván. HandLandmarker tải model lỗi → vào thẳng Cổ tay đồng thời kèm thông báo đó, ở MỌI cài đặt.
- Cổ tay đồng thời: tắt HandLandmarker; PoseLandmarker numPoses = N, cổ tay 15/16 của từng em là con trỏ; mỗi làn có mục tiêu riêng, cổ tay trong hitbox 3 khung liên tiếp là chốt; mọi em trả lời cùng lúc.
- Giáo viên chọn "Theo lượt ngón tay" hoặc "Cổ tay đồng thời" thì giữ suốt ván, không tự chuyển; ngoại lệ duy nhất: model tay tải lỗi.
- N ≥ 2: Scoreboard trực tiếp ở dải trên, mỗi làn một ô P<n> cùng màu làn, điểm cập nhật NGAY sau mỗi câu, người dẫn đầu có vương miện nhỏ; điểm, tim, chuỗi tách riêng từng em.
- Hết ván với N ≥ 2: Podium xếp theo tổng điểm, người thắng đứng bục giữa có pháo hoa 2 giây; mọi em đều lên bục kèm danh hiệu.
- Bằng tổng điểm thì xếp theo số câu đúng nhiều hơn, rồi tổng thời gian trả lời ngắn hơn; vẫn bằng thì ĐỒNG HẠNG, không tung đồng xu.
- Đuổi kịp: em kém người dẫn đầu từ 2 câu đúng trở lên được thẻ x2 cho câu kế tiếp, tối đa MỘT thẻ x2 mỗi 3 câu liên tiếp cho mỗi em. Hiệp quyết định (đã nhân đôi) thay thẻ x2 bằng "câu lội ngược dòng" +15 điểm; hệ số điểm không bao giờ vượt x2.
- Danh hiệu cuối ván từ số liệu đo trong ván: Nhanh nhất (thời gian trả lời trung bình thấp nhất), Chính xác nhất (tỉ lệ đúng cao nhất), Vận động nhiều nhất (số động tác lớn), Chuỗi dài nhất (chuỗi đúng liên tiếp). Mỗi em ÍT NHẤT một danh hiệu, kể cả em xếp cuối — chưa có thì nhận theo chỉ số tốt nhất của chính em ("Bứt phá cuối ván", "Kiên trì").
- N = 1: không có Podium; so với kỷ lục của chính em trong localStorage "miti-best" { điểm, chuỗi, giây lượt nhanh nhất, ngày }. Vượt kỷ lục thì nổ "PHÁ KỶ LỤC!" đúng một lần; vệt ghost alpha <= 0.35 chạy theo lượt nhanh nhất cũ. Chưa có kỷ lục thì ẩn dòng kỷ lục, không hiện số 0.

3. CHƠI VẬN ĐỘNG
- Biên độ: mỗi lượt cả cánh tay hoặc thân đi hết >= 50% tầm với đo lúc calibration (khuỷu gần thẳng khi chốt), không qua vòng bằng cổ tay kề vai; HUD nhắc hướng cần với ("với sang trái", "với lên cao", "cúi xuống thấp").
- Vùng đích: tâm vùng đáp án cách trục cơ thể >= 45% tầm với, trong 12% bề rộng tính từ mép khung, đổi chỗ mỗi lượt; không đặt hai vùng cạnh nhau hay chồng lên vùng ngực–mặt.
- Xen kẽ: một bên tay hoặc một hướng không quá 4 lượt liên tiếp; luân phiên trái – phải – hai tay – nghiêng thân, mỗi 3 lượt đổi mặt phẳng (ngang vai → với cao → thấp trong tầm an toàn).
- KHỞI ĐỘNG 60–90 giây trước hiệp 1 (không tính điểm, không trừ tim): đánh vai 10 nhịp, xoay cổ tay 10 vòng/bên, dang tay lên cao 8 nhịp, nâng gối 15 giây; hình que + chữ + đếm ngược; có nút "Bỏ khởi động" (tổng kết nhắc nhẹ). HẠ NHIỆT 45–60 giây trước tổng kết, không bỏ qua: duỗi tay ngang ngực 15 giây/bên, cúi chạm mũi chân 15 giây, kéo vai 10 nhịp, hít thở 4 vào – 4 ra. Giảm hiệu ứng chỉ rút ngắn, không bỏ. Chơi >= 6 phút hoặc phiên thứ hai liền: tổng kết nhắc MỘT dòng uống nước.
- Nhịp lượt: thẻ bay vào 3,0–4,5 giây, ở lại <= 8 giây, nghỉ giữa lượt <= 1,5 giây, không rút thời gian đọc đề; >= 12 nhịp chuyển động/phút (tay hoặc thân vượt 15% tầm với, tính cả khởi động và hạ nhiệt). Tổng kết in "Em đã chuyển động X giây trên Y giây", cần >= 60%; thiếu thì mời hiệp phụ 4 lượt nhẹ, không phạt.
- Trần tải trọng: cấm nhảy tiếp đất, cấm xoay thân nhanh quá 90 độ, cấm giữ hai tay trên cao quá 15 giây, tối đa 3/12 lượt cúi thấp; mất landmark 3 giây hoặc FPS tụt thì về nhịp chậm + một dòng nhắc chỉnh tư thế.
- Chống ăn may: Vật đúng/sai trộn xấp xỉ 60/40 mỗi lượt; chạm vật SAI trừ tim và cắt chuỗi, BỎ LỠ vật ĐÚNG chỉ cắt chuỗi, không trừ tim — vung tay bừa không thắng, đứng chờ không bị phạt oan.

4. GHI NHỚ BÀI HỌC
- Sai: DỪNG 2 giây, hiện lời giải, chỉ rõ bước/chữ số/từ cần sửa; câu sai xếp cuối vòng để luyện lại trong cùng phiên.
- Lịch ôn "miti-review" (localStorage, chỉ { id, errorTag, due, sai }, không tên, ảnh hay video): errorTag sửa đúng 2 lần liên tiếp thì ôn ở mốc +1, +3, +7 ngày. Đầu phiên đưa mục đến hạn vào tối đa 4/12 lượt, ưu tiên errorTag sai nhiều nhất; mục chưa đến hạn không xen vào. Quên khi ôn không trừ tim, không cắt chuỗi, chỉ hạ về +1 ngày. Tổng kết ghi "Em vẫn nhớ: ..." / "Cần ôn lại: ..." (mỗi nhóm tối đa 3) và "Lần sau có <n> câu đang chờ". Lịch tính theo máy, không theo từng em; localStorage bị chặn thì bỏ lịch, vẫn chơi trọn.
- Xen cụm: >= 3/12 lượt thuộc cụm khác (từ "miti-review" hoặc cùng khối, level thấp hơn), đặt xen kẽ, không dồn cuối phiên; trong một cụm giữ thứ tự dễ → khó.
- Gợi nhớ: trước lượt 1 chiếu 10 giây "Em còn nhớ không?" một câu đến hạn ôn (không gợi ý); sai không trừ tim, xếp lại vào lượt 3 kèm lời giải; phiên đầu trên máy thì bỏ qua. Ở 4/12 lượt, ngay sau cú chốt đúng, hỏi "Vì sao đúng?" 3 phương án trong 5 giây; sai không trừ tim, hiện một dòng lời giải, có nút "Thôi".
- Độ khó theo năng lực, không theo vị trí lượt: 2 câu đúng liên tiếp lên một level (trần 3); 2 câu sai liên tiếp xuống một level, cùng errorTag câu vừa sai. Sàn chống nản: không để sai quá 3 câu liên tiếp, câu thứ tư là level 1 cùng errorTag kèm lời giải từng bước; chọn lại đúng không trừ tim lần hai, tổng kết ghi "em đã sửa được". Lượt 5 và 9 chỉ là mốc nhịp. Level ẩn: không hiện chữ level/trình độ; chỉ màn tổng kết giáo viên có phân bố và tỉ lệ đúng theo level.
- Tổng kết theo errorTag ("Em hay sai ở: <loiViet>") kèm số câu đúng/sai theo mức độ, không chỉ báo điểm; ba thẻ "Làm tốt / Cần luyện / Động tác lần sau".

5. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- `const QUESTION_DATA = [...]` ở ĐẦU <script>, mỗi mục { id, level, prompt, choices, answer, explanation, errorTag, loiViet }, ≥ 40 mục, level 1/2/3 theo số bước, một đáp án đúng, xáo vị trí có seed; verifyQuestionBank() chạy trước vòng đầu, loại mục sai kèm console.warn tiếng Việt.

6. KỸ THUẬT: NỀN AR, CAMERA, FALLBACK
- NỀN AR: video webcam lật gương CHÍNH LÀ màn chơi, cover-fit scale = Math.max(W / video.videoWidth, H / video.videoHeight); mọi tọa độ qua toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH }, CẤM lx * W; ĐÚNG MỘT lớp phủ tối, alpha không vượt 0.45; vật mang z từ 1.6 (xa) về 0.35 (gần), cỡ = cỡ gốc / z; NEO VÀO CƠ THỂ: vật ảo buộc vào landmark thật mỗi khung, mất landmark thì ẩn kèm hướng dẫn tiếng Việt.
- Camera: Tasks Vision pin 1.0.1, getUserMedia facingMode "user" 640×480, lật gương; chỉ xin quyền SAU khi bấm BẮT ĐẦU, trạng thái tiếng Việt tới Lỗi (nút Thử lại); cử chỉ chốt ở lượt chuyển trạng thái (hysteresis + cooldown); lỗi camera/CDN/model thì vào "Chế độ không dùng camera" (chuột/chạm/phím, nút Tắt camera), học đủ 100%.
- model: N = 1 → https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task (HandLandmarker); N ≥ 2 → theo lượt: HandLandmarker numHands = 2 chỉ nhận tay trong làn của bạn đang tới lượt, kèm https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task (PoseLandmarker) numPoses = N chạy mỗi 3 khung hình để giữ luật làn; cổ tay: chỉ PoseLandmarker numPoses = N, cổ tay 15/16 làm con trỏ trong làn của từng em.

7. GIAO DIỆN, AN TOÀN, TIẾP CẬN
- Bố cục: Bắt đầu → Chọn số người (1/2/3) → Kiểm tra thiết bị → Hiệu chỉnh từng làn → 2 lượt luyện mẫu → KHỞI ĐỘNG 60–90 giây → 10 giây "Em còn nhớ không?" → 12 lượt chính (Scoreboard nếu ≥ 2 người) → Ôn câu sai → HẠ NHIỆT 45–60 giây → Podium / Kỷ lục cá nhân → Chơi lại.
- Chữ to (đề >= 28px), responsive; Pause, Replay, Tắt camera, Giảm hiệu ứng; tab ẩn thì tự Tạm dừng, về đếm 3-2-1; FPS dưới 28 giảm chi tiết, không giảm nội dung; âm thanh Web Audio API; bộ sưu tập "miti-collection". Không quảng cáo, không bảng xếp hạng online; Scoreboard chỉ gồm các em đang đứng trước máy.
- Không upload ảnh/video, chỉ giữ landmark trong bộ nhớ; UI tiếng Việt, không hiện thuật ngữ kỹ thuật; trạng thái đúng/sai phân biệt ngoài màu (✓ ✗, chữ); dọn vật cản, giữ cách tường một bước.

8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.
- Xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; nhỏ, không che vùng tương tác.
- Chân trang hoặc màn kết quả có dòng: MiTi • Học bằng chuyển động.
- Không xóa hoặc đổi tên thương hiệu khi replay, khi vào gameplay hoặc ở chế độ không camera.

9. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.
- Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".
- Tự kiểm trước khi xuất: camera sau nút Bắt đầu · nền AR + toScreen · chọn 1/2/3 người + gán làn + cách nhận tay · Scoreboard/Podium/kỷ lục + hiệu ứng · fallback chơi trọn · QUESTION_DATA đủ mục · localStorage ôn tập + bộ sưu tập · chữ ký MiTi.
- File chạy độc lập, không lỗi console.
```
