# L4-19 — Pizza Phân Số

> Toán lớp 4 · Điều khiển: Chỉ ngón tay trỏ (Point) · Cụm kiến thức: phan-so-dau
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "PIZZA PHÂN SỐ" cho học sinh Việt Nam lớp 4, môn Toán.
Mục tiêu học tập: khái niệm phân số; tử số mẫu số; phân số lớn hơn 1 bé hơn 1 bằng 1; đọc viết phân số; biểu diễn trên hình.
1 file HTML duy nhất (CSS trong <style>, JS nội tuyến), không Tailwind Play CDN, không tệp ngoài; chỉ tải MediaPipe (CDN + model) và font có dự phòng.

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
- Bối cảnh: Tiệm pizza, mỗi chiếc bánh được cắt thành các phần bằng nhau. Vật thể xuất hiện NGAY TRONG khung hình camera thật, tiến từ phía sau về phía người chơi.
- Cơ chế chính: Chỉ ngón tay trỏ (Point); nhiệm vụ hiện bằng một dòng chữ to trên HUD.
- Cử chỉ chính — Chỉ ngón tay trỏ (Point): MediaPipe Tasks Vision HandLandmarker, đầu ngón trỏ landmark 8 làm con trỏ.
- Biên độ động tác của cơ chế này: Ngón trỏ đi bằng cả cẳng tay: đáp án đặt ở bốn góc khác nhau của khung hình nên mỗi lượt là một lần duỗi khuỷu đổi hướng, không phải nhấc ngón ngay trước ngực.
- Điều kiện chốt đáp án (hit): Con trỏ phải nằm trong hitbox của đáp án trong ÍT NHẤT 3 khung hình liên tiếp rồi mới release bằng thao tác bấm/giữ 400ms; chỉ trỏ lướt qua (hover) không được tính là đã chọn.
- Làm mượt và chống spam: EMA alpha 0.45 trên tọa độ con trỏ; cooldown 300ms sau mỗi lần chốt.
- Ngưỡng tin cậy: confidence tay >= 0.6; đầu ngón tay phải ở trong vùng khung hình hợp lệ (lề 40px).
- Phản hồi hình ảnh cho người chơi: Học sinh nhìn thấy vòng ngắm sáng bám theo đầu ngón tay và hitbox sáng lên khi con trỏ ở trong.
- Hòa vào nền AR: Vòng ngắm neon vẽ tại toScreen(landmark 8) nên đầu ngón tay thật và tâm ngắm trùng khít nhau; đáp án là các bảng ảo treo ở z khác nhau trong khung hình, bảng xa nhỏ hơn và mờ hơn, lại gần tầm với thì to dần và sáng lên.
- Biên độ: mỗi lượt cả cánh tay hoặc thân đi hết >= 50% tầm với đo lúc calibration (khuỷu gần thẳng khi chốt), không qua vòng bằng cổ tay kề vai; HUD nhắc hướng cần với ("với sang trái", "với lên cao", "cúi xuống thấp").
- Vùng đích: tâm vùng đáp án cách trục cơ thể >= 45% tầm với, trong 12% bề rộng tính từ mép khung, đổi chỗ mỗi lượt; không đặt hai vùng cạnh nhau hay chồng lên vùng ngực–mặt.
- Xen kẽ: một bên tay hoặc một hướng không quá 4 lượt liên tiếp; luân phiên trái – phải – hai tay – nghiêng thân, mỗi 3 lượt đổi mặt phẳng (ngang vai → với cao → thấp trong tầm an toàn).
- KHỞI ĐỘNG 60–90 giây trước hiệp 1 (không tính điểm, không trừ tim): đánh vai 10 nhịp, xoay cổ tay 10 vòng/bên, dang tay lên cao 8 nhịp, nâng gối 15 giây; hình que + chữ + đếm ngược; có nút "Bỏ khởi động" (tổng kết nhắc nhẹ). HẠ NHIỆT 45–60 giây trước tổng kết, không bỏ qua: duỗi tay ngang ngực 15 giây/bên, cúi chạm mũi chân 15 giây, kéo vai 10 nhịp, hít thở 4 vào – 4 ra. Giảm hiệu ứng chỉ rút ngắn, không bỏ. Chơi >= 6 phút hoặc phiên thứ hai liền: tổng kết nhắc MỘT dòng uống nước.
- Nhịp lượt: thẻ bay vào 3,0–4,5 giây, ở lại <= 8 giây, nghỉ giữa lượt <= 1,5 giây, không rút thời gian đọc đề; >= 12 nhịp chuyển động/phút (tay hoặc thân vượt 15% tầm với, tính cả khởi động và hạ nhiệt). Tổng kết in "Em đã chuyển động X giây trên Y giây", cần >= 60%; thiếu thì mời hiệp phụ 4 lượt nhẹ, không phạt.
- Trần tải trọng: cấm nhảy tiếp đất, cấm xoay thân nhanh quá 90 độ, cấm giữ hai tay trên cao quá 15 giây, tối đa 3/12 lượt cúi thấp; mất landmark 3 giây hoặc FPS tụt thì về nhịp chậm + một dòng nhắc chỉnh tư thế.
- Chống ăn may: Vật đúng/sai trộn xấp xỉ 60/40 mỗi lượt; chạm vật SAI trừ tim và cắt chuỗi, BỎ LỠ vật ĐÚNG chỉ cắt chuỗi, không trừ tim — vung tay bừa không thắng, đứng chờ không bị phạt oan.

4. GHI NHỚ BÀI HỌC
- Nhiệm vụ mỗi lượt: Chỉ tay cắt và chọn đúng số phần tương ứng với phân số đề bài.
- Phạm vi: chỉ nội dung Toán lớp 4 đã học; cấm đề, số hoặc từ vựng vượt chương trình. Vòng đầu dễ để hiểu luật trong vài giây.
- Lỗi thường gặp (mỗi câu sai ghi đúng một lỗi): đảo tử số và mẫu số; so sánh chỉ nhìn số phần tử; biểu diễn bằng các phần không bằng nhau.
- Lời giải khi sai: cắt hình thành các phần bằng nhau và tô đúng số phần tử số; không để hiệu ứng che lời giải.
- Sai: DỪNG 2 giây, hiện lời giải, chỉ rõ bước/chữ số/từ cần sửa; câu sai xếp cuối vòng để luyện lại trong cùng phiên.
- Lịch ôn "miti-review" (localStorage, chỉ { id, errorTag, due, sai }, không tên, ảnh hay video): errorTag sửa đúng 2 lần liên tiếp thì ôn ở mốc +1, +3, +7 ngày. Đầu phiên đưa mục đến hạn vào tối đa 4/12 lượt, ưu tiên errorTag sai nhiều nhất; mục chưa đến hạn không xen vào. Quên khi ôn không trừ tim, không cắt chuỗi, chỉ hạ về +1 ngày. Tổng kết ghi "Em vẫn nhớ: ..." / "Cần ôn lại: ..." (mỗi nhóm tối đa 3) và "Lần sau có <n> câu đang chờ". Lịch tính theo máy, không theo từng em; localStorage bị chặn thì bỏ lịch, vẫn chơi trọn.
- Xen cụm: >= 3/12 lượt thuộc cụm khác (từ "miti-review" hoặc cùng khối, level thấp hơn), đặt xen kẽ, không dồn cuối phiên; trong một cụm giữ thứ tự dễ → khó.
- Gợi nhớ: trước lượt 1 chiếu 10 giây "Em còn nhớ không?" một câu đến hạn ôn (không gợi ý); sai không trừ tim, xếp lại vào lượt 3 kèm lời giải; phiên đầu trên máy thì bỏ qua. Ở 4/12 lượt, ngay sau cú chốt đúng, hỏi "Vì sao đúng?" 3 phương án trong 5 giây; sai không trừ tim, hiện một dòng lời giải, có nút "Thôi".
- Độ khó theo năng lực, không theo vị trí lượt: 2 câu đúng liên tiếp lên một level (trần 3); 2 câu sai liên tiếp xuống một level, cùng errorTag câu vừa sai. Sàn chống nản: không để sai quá 3 câu liên tiếp, câu thứ tư là level 1 cùng errorTag kèm lời giải từng bước; chọn lại đúng không trừ tim lần hai, tổng kết ghi "em đã sửa được". Lượt 5 và 9 chỉ là mốc nhịp. Level ẩn: không hiện chữ level/trình độ; chỉ màn tổng kết giáo viên có phân bố và tỉ lệ đúng theo level.
- Tổng kết theo errorTag ("Em hay sai ở: <loiViet>") kèm số câu đúng/sai theo mức độ, không chỉ báo điểm; ba thẻ "Làm tốt / Cần luyện / Động tác lần sau".
- Lời giải dùng đúng thuật ngữ Toán SGK Toán lớp 4; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng đúng dạng bài.

5. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt sau; mỗi mục { id, level, prompt, choices, answer, explanation, errorTag, loiViet }, level 1/2/3, một đáp án đúng duy nhất.
- errorTag là mã máy của lỗi, loiViet là cụm tiếng Việt hiện cho học sinh; câu sai lưu cả hai. Xáo vị trí đáp án có seed theo lượt.
- Viết verifyQuestionBank() chạy MỘT LẦN lúc nạp, trước vòng đầu, kiểm từng mục: answer có trong choices đúng một lần, không hai phương án trùng; explanation, errorTag, loiViet khác rỗng, errorTag thuộc danh sách khai báo; không trùng prompt; phương án nhiễu mô phỏng một lỗi thật (cấm số vô nghĩa, cấm nhiễu cũng đúng theo cách hiểu hợp lý); số trong phạm vi SGK (lớp 4: tự nhiên đến 100.000, mẫu phân số khác 0; lớp 5: thập phân tối đa 3 chữ số sau dấu phẩy, phần trăm 0–150), không chia cho 0, kết quả hữu hạn; Tiếng Anh chỉ dùng từ trong word list; đáp án đúng không là lớn nhất/nhỏ nhất hay dài nhất ở quá 20% số mục, vị trí đúng phân bố 1/3 ± 10%; level = số bước (1 / 2 / ≥ 3), mỗi level ≥ 1/4 số mục. Mục trượt thì loại khỏi vòng chơi và console.warn id + lý do tiếng Việt; thiếu mục thì chỉ báo ở màn giáo viên.
- Tối thiểu 40 mục, đáp án kiểm chứng được bằng code. Đáp án phải tính lại được bằng số học trong code, không so khớp chuỗi tự do; mỗi phương án nhiễu là một kết quả thật của lỗi đã nêu, không phải số ngẫu nhiên.
- errorTag lấy đúng một trong: tử_số_mẫu_số_đảo, so_sanh_theo_so_phan_tu_thoi, bieu_dien_o_khong_bang_nhau; loiViet lấy nguyên văn một mục trong danh sách lỗi ở mục 4.
- Hai mục mẫu để bám khuôn (viết tiếp 38 mục nữa, không ít hơn):
  id: "q1", level: 1, prompt: "Hình vuông chia 8 phần bằng nhau, tô màu 3 phần. Phân số chỉ phần tô màu?", choices: ["3/8","8/3","3/5"], answer: "3/8", explanation: "Mẫu số là tổng số phần bằng nhau (8), tử số là số phần được lấy (3).", errorTag: "tu_so_mau_so_dao_nguoc", loiViet: "đảo tử số và mẫu số"
  id: "q2", level: 2, prompt: "Phân số nào lớn hơn 1?", choices: ["7/5","5/7","6/6"], answer: "7/5", explanation: "Lớn hơn 1 khi tử số lớn hơn mẫu số; 6/6 bằng 1, 5/7 bé hơn 1.", errorTag: "so_sanh_theo_so_phan_tu_thoi", loiViet: "so sánh chỉ nhìn số phần tử"

6. KỸ THUẬT: NỀN AR, CAMERA, FALLBACK
- NỀN AR: khung hình webcam CHÍNH LÀ màn chơi. Mỗi khung vẽ video vào canvas, lật gương + cover-fit (cắt viền, không giãn):
    scale = Math.max(W / video.videoWidth, H / video.videoHeight)
    drawW = video.videoWidth * scale;  drawH = video.videoHeight * scale
    offX = (W - drawW) / 2;            offY = (H - drawH) / 2
    ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1); ctx.drawImage(video, offX, offY, drawW, drawH); ctx.restore();
- Phủ ĐÚNG MỘT lớp rgba(8,5,20,0.4), alpha không vượt 0.45; thẻ và đề tự có nền gradient + viền + bóng.
- HÀM CHIẾU DUY NHẤT: toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH } (lx, ly chuẩn hóa 0..1); spawn, va chạm, vật neo, hiệu ứng đều qua toScreen, CẤM lx * W hoặc ly * H.
- CHIỀU SÂU: vật thể mang z từ 1.6 (xa) về 0.35 (sát người chơi); cỡ vẽ = cỡ gốc / z; ellipse bóng mờ dưới vật.
- NEO VÀO CƠ THỂ: vật ảo buộc vào landmark thật, cập nhật mỗi khung — cổ tay 0, khuỷu 13/14, vai 11/12, hông 23/24, tâm bàn tay = trung bình 5, 9, 13, 17; mất landmark thì ẩn vật kèm hướng dẫn tiếng Việt.
- MediaPipe Tasks Vision pin 1.0.1: import từ https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs; wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm.
- model: N = 1 → https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task (HandLandmarker); N ≥ 2 → theo lượt: HandLandmarker numHands = 2 chỉ nhận tay trong làn của bạn đang tới lượt, kèm https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task (PoseLandmarker) numPoses = N chạy mỗi 3 khung hình để giữ luật làn; cổ tay: chỉ PoseLandmarker numPoses = N, cổ tay 15/16 làm con trỏ trong làn của từng em.
- Camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }), khung 4:3 crop không giãn, lật gương khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi bấm BẮT ĐẦU. Trạng thái tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Khung hình: lúc bắt đầu kiểm camera thấy chỉ tay, nửa thân (vai 11/12) hay toàn thân (hông 23/24), chọn cơ chế theo mức ĐANG CÓ (thiếu vai bỏ nghiêng thân, thiếu hông bỏ bước chân, một tay dùng cơ chế một tay); hiện "camera đang thấy: …" và gợi ý lùi xa nếu thiếu.
- Vùng an toàn HUD: lưới 3×3, ô giữa và ô giữa trên (thân học sinh) CẤM đặt chữ; HUD, điểm, tim, đề, thẻ đáp án, mascot chỉ ở dải trên, hai cột biên và dải dưới; vật thể được bay qua vùng giữa.
- Calibration 3 giây tư thế trung tính: đo bề rộng vai, khoảng cách hai cổ tay, tầm với xa nhất rồi đặt MỌI ngưỡng (tốc độ vung, góc, bán kính chốt) theo đơn vị đó, không hằng số pixel; tầm đo bất thường thì nhắc chỉnh khoảng cách. Nút "Chỉnh lại tư thế" đo lại không tải trang, không mất điểm và lượt.
- Cử chỉ chỉ fire ở lượt chuyển trạng thái, hysteresis hai ngưỡng + cooldown; giữ nguyên tư thế không spam event; confidence thấp thì không chốt.
- Camera cần HTTPS, localhost hoặc file trên máy; bị chặn, CDN hay model lỗi thì báo một dòng tiếng Việt rồi vào thẳng chế độ không camera, game vẫn chơi đủ.
- Fallback chuột/chạm/phím mô phỏng đúng hành động chính; nhãn "Chế độ không dùng camera", nút Tắt camera không tải lại trang; mục tiêu học tập đủ 100%.
- Fallback của cơ chế này: chạm hoặc click vào đáp án thay cho con trỏ ngón tay, giữ 400ms để chốt như khi giữ tay.

7. GIAO DIỆN, AN TOÀN, TIẾP CẬN
- Bố cục: Bắt đầu → Chọn số người (1/2/3) → Kiểm tra thiết bị → Hiệu chỉnh từng làn → 2 lượt luyện mẫu → KHỞI ĐỘNG 60–90 giây → 10 giây "Em còn nhớ không?" → 12 lượt chính (Scoreboard nếu ≥ 2 người) → Ôn câu sai → HẠ NHIỆT 45–60 giây → Podium / Kỷ lục cá nhân → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive dọc và ngang.
- Tiếp cận: đúng/sai phân biệt bằng ✓ ✗ + chữ ngắn, không chỉ bằng màu (tránh cặp đỏ–xanh lá); âm thanh có phụ đề, nút "Hiện chữ" dùng được ngay; chữ tương phản với nền >= 4.5:1, thẻ có nền tối + viền.
- Tay thuận: calibration hỏi "Em thuận tay nào?" (Trái / Phải / Cả hai, mặc định Phải), gán tay điều khiển và gương hướng dẫn theo đó; đổi giữa chừng qua "Chỉnh lại tư thế" không mất điểm hay lượt.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng và nút "Chỉnh lại tư thế". Không quảng cáo, không bảng xếp hạng online; Scoreboard chỉ gồm các em đang đứng trước máy.
- Tự Tạm dừng khi tab ẩn hoặc mất tiêu điểm (visibilitychange, blur): dừng nhận diện, giữ điểm và lượt; quay lại đếm 3-2-1 rồi mới nhận diện, reset cooldown + bộ làm mượt.
- Hiệu năng: mục tiêu 30 FPS trên laptop trường học; nhận diện bằng requestVideoFrameCallback hoặc 1 lần mỗi 2–3 khung, render theo requestAnimationFrame; pool cho particle, không cấp phát object trong vòng vẽ, particle <= 60; FPS dưới 28 trong 2 giây thì giảm chi tiết, không giảm nội dung học; canvas theo devicePixelRatio cap ở 2.
- Âm thanh tổng hợp bằng Web Audio API (resume AudioContext sau cú bấm đầu), không Tone.js, không file mp3 ngoài.
- Bộ sưu tập: mỗi màn thắng mở 1 thẻ theo chủ đề game, lưu localStorage "miti-collection"; màn "Sưu tập của em" vẽ lưới 6 ô mỗi bộ (ô chưa mở là khung nét đứt "? ? ?") kèm dòng "Bộ <chủ đề> còn thiếu <k> thẻ", <k> tính từ chính máy này.
- Trước khi chơi nhắc: "Dọn vật cản khỏi vùng đứng, giữ cách tường một bước, chỉ chuyển động trong tầm tay"; không nhảy, không xoay người nhanh. Quá tối hoặc ngược sáng thì gợi ý "Bật đèn hoặc quay lưng về phía cửa sổ" rồi vẫn cho chơi.
- KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân.
- Toàn bộ UI, nút, hướng dẫn, thông báo, lời giải bằng TIẾNG VIỆT; không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện với học sinh.

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

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `phan-so-dau` — đổi cluster nếu đổi dạng bài.
- Gesture: `POINT` — mỗi game tối đa 2 mã, mã đầu là mechanic chính.
- Muốn thêm nội dung mới: sửa `tools/data/games.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
