# L4-26 — Chia Kho Báu

> Toán lớp 4 · Điều khiển: Nắm và thả (Grab / Catch) · Cụm kiến thức: phan-so-cua-mot-so
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "CHIA KHO BÁU" cho học sinh Việt Nam lớp 4, môn Toán.
Toàn bộ game nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

1. HỌC TẬP
- Mục tiêu học tập: tìm phân số của một số; chia một hình thành số phần bằng nhau rồi lấy mấy phần.
- Nhiệm vụ của học sinh trong mỗi lượt: Nắm từng phần vàng thả vào rương sao cho đúng phân số của số lượng.
- Phạm vi kiến thức: chỉ dùng nội dung Toán lớp 4 đã học. Cấm ra đề vượt chương trình, cấm số hoặc từ vựng ngoài phạm vi trên.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): chia thiếu cho mẫu số trước khi nhân; nhầm phép nhân và phép chia; chia các phần không bằng nhau.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. THẾ GIỚI AR VÀ VÒNG CHƠI
- Bối cảnh: Hầm kho báu của hải tặc cần chia công bằng theo phân số.
- Không gian chơi: học sinh đứng trước camera và mọi vật thể xuất hiện NGAY TRONG khung hình thật của các em (đi vào từ phía sau, tiến về phía người chơi), không nằm trong một bảng game tách rời.
- Cơ chế chính: Nắm và thả (Grab / Catch). Nhiệm vụ hiển thị bằng một dòng chữ to trên HUD, không cần đọc hướng dẫn.
- Biên độ động tác: mỗi lượt bắt buộc cả cánh tay hoặc thân người đi hết một quãng tối thiểu 50% tầm với đã đo lúc calibration (khuỷu duỗi gần thẳng khi chốt). Không được để một vòng chơi qua hết bằng động tác cổ tay kề vai; HUD nhắc to bằng tiếng Việt đúng hướng phải với ("với tay sang trái", "với lên cao", "cúi xuống thấp").
- Vùng đích dàn ra mép khung: tâm các vùng đáp án cách trục cơ thể học sinh >= 45% tầm với và nằm trong 12% bề rộng tính từ cạnh khung hình, đồng thời đổi vị trí giữa các lượt; cấm đặt hai vùng cạnh nhau. Vùng chạm không được chồng lên vùng ngực–mặt để chữ vẫn đọc được.
- Xen kẽ nhóm cơ: trong 12 lượt, không để cùng một bên tay hoặc một hướng chịu quá 4 lượt liên tiếp; luân phiên trái – phải – hai tay – nghiêng thân, và mỗi 3 lượt đổi mặt phẳng động tác (ngang tầm vai → với cao → xuống thấp trong tầm với an toàn).
- Nhịp vận động: 12 lượt chia thành 3 hiệp 4 lượt; giữa hai hiệp là "trạm nghỉ" 5 giây có đếm ngược 5-4-3-2-1 trên HUD, không tính sai, không mất tim, không trừ điểm. Mục tiêu một vòng chơi tương đương 4–6 phút đứng vận động vừa, vẫn tại chỗ và trong tầm tay.
- Độ dài: 12 lượt chính. Tăng độ khó ở lượt 5 và lượt 9 (thêm bước trung gian hoặc rút ngắn thời gian suy nghĩ).
- Điểm: +10 nhân chuỗi trả lời đúng. Sai không phạt bằng cách biến mất kiến thức: vẫn hiện lời giải đầy đủ.
- Điều kiện thua: hết 5 tim (mỗi đáp án sai trừ 1 tim). Điều kiện thắng: hết 12 lượt, hiện tổng kết.
- Chống ăn may: Vật thể đúng và vật thể sai trộn theo tỉ lệ xấp xỉ 60/40 trong mỗi lượt; chạm vào vật SAI trừ tim ngay và cắt chuỗi đúng, còn BỎ LỠ vật ĐÚNG chỉ cắt chuỗi đúng chứ không trừ tim — vung tay bừa không thắng được, đứng chờ cũng không bị phạt oan.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 4.

3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet }.
- Tối thiểu 40 mục, chia 3 mức độ (level 1/2/3), mỗi mục có một đáp án đúng duy nhất kiểm chứng được bằng code.
- Đáp án phải tính lại được bằng số học trong code, không so khớp chuỗi tự do; mỗi phương án nhiễu là một kết quả thật của lỗi đã nêu, không phải số ngẫu nhiên.
- errorTag là mã máy của lỗi, lấy đúng một trong các nhãn: chia_thieu_bang_so_phan_chia, nham_phep_nhan_phep_chia, do_dai_cac_phan_bang_nhau. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 1, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt; không để đáp án đúng luôn ở một vị trí.
- Trước khi viết engine, liệt kê trong comment 3 mục theo đúng khuôn rồi mới viết trọn mảng.
- Hai mục mẫu để bám theo khuôn (viết tiếp 38 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Tìm 2/5 của 30 kg gạo.", choices: ["12 kg","75 kg","6 kg"], answer: "12 kg", explanation: "30 : 5 × 2 = 12 kg. Chia theo mẫu số trước rồi nhân theo tử số.", errorTag: "chia_thieu_bang_so_phan_chia", loiViet: "chia thiếu cho mẫu số trước khi nhân"
  id: "q2", level: 2, prompt: "Lớp có 28 bạn, 3/4 số bạn thích bơi. Có bao nhiêu bạn thích bơi?", choices: ["21 bạn","37 bạn","7 bạn"], answer: "21 bạn", explanation: "28 : 4 = 7, 7 × 3 = 21 bạn.", errorTag: "do_dai_cac_phan_bang_nhau", loiViet: "chia các phần không bằng nhau"

4. NỀN AR, CAMERA VÀ GESTURE
- NỀN AR (nguyên tắc gốc): khung hình webcam CHÍNH LÀ màn chơi, không phải ảnh nền trang trí. Vẽ video vào canvas ở mỗi khung hình, lật gương + cover-fit (cắt viền, không giãn hình):
    scale = Math.max(W / video.videoWidth, H / video.videoHeight)
    drawW = video.videoWidth * scale;  drawH = video.videoHeight * scale
    offX = (W - drawW) / 2;            offY = (H - drawH) / 2
    ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1); ctx.drawImage(video, offX, offY, drawW, drawH); ctx.restore();
  (Hoặc cách 2: thẻ video object-fit:cover phủ kín 100vw/100vh với opacity:1 rồi canvas trong suốt đè khít lên trên. Chọn một cách, không trộn lẫn.)
- Đọc chữ trên nền thật: phủ ĐÚNG MỘT lớp rgba(8,5,20,0.4) lên khung hình, alpha không vượt 0.45 (vẫn phải nhìn rõ người thật). Mỗi thẻ và đề bài phải tự có nền gradient + viền stroke + bóng, không phụ thuộc lớp phủ này.
- HÀM CHIẾU DUY NHẤT: toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH }, trong đó lx, ly là landmark chuẩn hóa 0..1.
  Vẽ video, vị trí spawn, va chạm, vật neo vào người và mọi hiệu ứng đều đi qua toScreen. CẤM viết lx * W hoặc ly * H: camera bị crop thì vật thể bay lệch khỏi người học sinh, mất hẳn chất AR.
- CHIỀU SÂU: mỗi vật thể mang z từ 1.6 (xa) về 0.35 (sát mặt người chơi); kích thước vẽ = cỡ gốc / z, vật xa nhỏ và hơi mờ, vật gần to và rực; vẽ ellipse bóng mờ dưới chân vật trên "sàn" ảo; thêm đường tốc độ (speed lines) dọc hai bên mép khi nhịp game nhanh lên.
- NEO VÀO CƠ THỂ: vật thể ảo phải đeo hoặc buộc vào landmark thật và cập nhật mỗi khung hình — cổ tay tay = landmark 0, khuỷu = 13/14, vai = 11/12, hông = 23/24, mũi = 0, tâm bàn tay = trung bình landmark 5, 9, 13, 17. Mất landmark hoặc confidence tụt thì vật neo biến mất kèm hướng dẫn tiếng Việt, không được nhảy lung tung.
- MediaPipe Tasks Vision, pin phiên bản: import từ https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs
  wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm
  model: https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task (HandLandmarker)
- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }). Khung hình 4:3; nếu camera cho tỉ lệ khác thì crop về vùng vẽ cố định, không để giãn hình làm sai tọa độ. Lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU. Trạng thái bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Calibration động: Calibration 3 giây ở tư thế trung tính: đo bề rộng hai vai, khoảng cách cổ tay trái–phải và tầm với xa nhất, suy ra đơn vị chuẩn của phiên chơi rồi đặt MỌI ngưỡng (tốc độ vung, góc, bán kính chấm chọn) theo đơn vị đó, không dùng hằng số pixel cố định. Tầm đo bất thường thì nhắc chỉnh khoảng cách và đo lại. Có nút "Chỉnh lại tư thế" hiệu chỉnh lại không tải trang, không mất điểm và lượt.
- Camera chỉ bật được trong môi trường an toàn (HTTPS, localhost hoặc mở file trực tiếp). Nếu trình duyệt chặn, báo một dòng tiếng Việt "Muốn dùng camera thì mở game qua HTTPS hoặc file trên máy em" rồi vào thẳng chế độ không camera, không để học sinh kẹt ở màn lỗi tiếng Anh.
- Cử chỉ chính — Nắm và thả (Grab / Catch): HandLandmarker: tâm bàn tay = trung bình các landmark 5, 9, 13, 17; trạng thái nắm/xòe từ khoảng cách đầu ngón tới tâm.
- Biên độ động tác của cơ chế này: Bốc và kéo: vật tới sát mép khung, học sinh với tay ra >= 45% tầm với để bốc rồi kéo về vị trí thả ở mép đối diện.
- Điều kiện chốt đáp án (hit): Chỉ fire ở LƯỢT CHUYỂN trạng thái: xòe → nắm mới tính là bốc, nắm → xòe mới tính là thả. Giữ nguyên bàn tay không được spam event.
- Làm mượt và chống spam: EMA alpha 0.45; vùng hứng có bán kính bám theo độ xòe tay; debounce 250ms giữa hai lần chuyển trạng thái.
- Ngưỡng tin cậy: Kiểm tra hình học kép: vừa đủ số ngón gập/xòe vừa đủ gần tâm; confidence >= 0.6.
- Phản hồi hình ảnh cho người chơi: Vật bám theo lòng bàn tay và rung nhẹ khi vào vùng hợp lệ.
- Hòa vào nền AR: Vòng sáng quanh lòng bàn tay có bán kính bằng độ xòe tay thật; vật vừa bốc bị TREO DƯỚI bàn tay và đu đưa theo quán tính khi học sinh di chuyển; thả tay thì vật rơi có gia tốc và bóng dưới sàn co dần — nhìn là biết nó đang nằm trong không gian thật.
- Cử chỉ chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim.
- Confidence thấp thì không chốt đáp án.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi tự chuyển sang chế độ không camera, game vẫn chơi đủ.

5. FALLBACK (bắt buộc)
- Mouse / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính: kéo vật bằng chuột hoặc một ngón tay, nhả ra để mô phỏng xòe tay.
- Có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng, không cần tải lại trang.
- Mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.

6. PHẢN HỒI HỌC TẬP
- Đúng: phản hồi tích cực ngay (âm thanh vui + hạt sáng) và một dòng ghi nhớ ngắn.
- Hit-stop: khi chốt đúng, đóng băng mọi vật thể 70–90 ms, giật màn hình 4–6 px theo hướng động tác, thẻ đáp án lún còn 0.85 rồi nảy về 1.0 (squash & stretch) — người chơi phải nhìn thấy lực của cú chạm, không chỉ nghe tiếng.
- Chữ khen bật lên tại điểm chạm: mỗi cú đúng đẩy một cụm tiếng Việt ngắn ("ĐÚNG RỒI!", "QUÁ XA!", "CHỐT HẠ!") bay lên từ đúng vị trí vật vỡ rồi tan; câu sai dùng chữ đỡ ("Còn sát lắm!", "Thử lại nào!"), không dùng chữ đỏ to gây sợ.
- Sai: DỪNG 2 giây, chia kho báu thành đúng số phần rồi tô số phần lấy đi; chỉ rõ bước hoặc chữ số hoặc từ cần sửa; không để hiệu ứng che lời giải.
- Câu sai được xếp vào CUỐI vòng chơi để luyện lại trong cùng phiên, ưu tiên xuất hiện lại sớm.
- Màn tổng kết nhóm theo errorTag: "Em hay sai ở: chia thiếu cho mẫu số trước khi nhân" — kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.
- Màn tổng kết gồm ba thẻ chữ to đọc xong trong 5 giây: "Làm tốt: ..." (tối đa 2 kỹ năng đúng nhiều nhất), "Cần luyện: ..." (loiViet của nhóm lỗi nhiều nhất), "Động tác lần sau: ..." (một câu nhắc tư thế/cử chỉ). Kèm số câu đúng/sai theo mức độ, không so sánh với bạn khác.
- Thước đo vận động: đếm số động tác hợp lệ và thời lượng chơi, hiển thị một thẻ "Em đã vận động N động tác trong M phút" ở màn tổng kết; con số này không phải điểm số và không so sánh với bạn nào.
- Hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài của Toán lớp 4.

7. GIAO DIỆN VÀ AN TOÀN
- Bố cục: Bắt đầu → Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), tương phản tốt, responsive cả dọc và ngang.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động và nút "Chỉnh lại tư thế". Không leaderboard, không quảng cáo.
- Tự động Tạm dừng khi tab bị ẩn hoặc cửa sổ mất tiêu điểm (document.visibilitychange, window.blur): dừng vòng nhận diện, giữ nguyên điểm và lượt; khi quay lại đếm 3-2-1 rồi mới nhận diện tiếp và reset cooldown + bộ làm mượt để một cú vung tay dở dang không thành nhát chém.
- Ngân sách hiệu năng: mục tiêu 30 FPS trên laptop trường học. Chạy nhận diện bằng requestVideoFrameCallback hoặc 1 lần mỗi 2–3 khung hình, render chạy riêng theo requestAnimationFrame; tái dùng pool cho particle và vệt hiệu ứng, không cấp phát object mới trong vòng vẽ, giới hạn particle <= 60; FPS trung bình dưới 28 trong 2 giây thì tự giảm chi tiết (bớt hạt, tắt đường tốc độ, nhận diện thưa hơn) chứ không giảm nội dung học tập; canvas theo devicePixelRatio nhưng cap ở 2 và tính lại khi đổi cỡ cửa sổ.
- Âm thanh tổng hợp bằng Web Audio API (resume AudioContext sau cú bấm đầu tiên), không dùng Tone.js, không dùng file mp3 ngoài.
- Combo nhìn thấy + nghe thấy: chuỗi đúng hiện "x2, x3, x4…" to dần kèm vệt neon nối từ tay học sinh tới vật vừa trúng; cao độ âm thanh đúng nhảy bậc thang theo combo (tối đa x5), đứt chuỗi thì âm rơi xuống một cung và số combo tan thành hạt.
- FX arcade hòa vào nền AR: particle màu nổ theo khối, vệt kiếm neon mọc từ cổ tay thật, kính vỡ mạng nhện lan từ điểm va chạm khi hụt, viền HUD nhấp nháy theo combo — tất cả vẽ trên canvas trong suốt phủ đúng khung hình camera, tôn trọng trần alpha 0.45 và ngân sách particle đã quy định.
- Sự kiện ngẫu nhiên: mỗi vòng có đúng 2 thẻ vàng "nhân đôi điểm trong 5 giây" và 1 "câu thử thách" phát ra từ z xa với âm báo riêng, biến mất sau 3 giây nếu không kịp với; tỉ lệ 60/40 và ngân hàng dữ liệu không đổi.
- Nhân vật phản ứng: mascot của game đứng ở một góc khung hình (không che người chơi), nghiêng người theo hướng với tay, giơ tay ăn mừng khi combo >= 3 và che mắt khi hụt; mất landmark thì mascot đưa tay chỉ về phía camera để nhắc chỉnh tư thế.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Chia Kho Báu, lưu localStorage key "miti-collection", có màn "Sưu tập của em".
- Ngồi tại chỗ vẫn chơi được; không yêu cầu chạy nhảy hay động tác nguy hiểm; không rời khỏi vùng camera.
- Trước khi chơi, một dòng nhắc tiếng Việt: "Dọn vật cản khỏi vùng đứng, giữ cách tường một bước, chỉ chuyển động trong tầm tay"; không có động tác nhảy, xoay người nhanh hay rời khỏi chỗ. Khung hình quá tối hoặc ngược sáng thì gợi ý "Bật đèn lên hoặc quay lưng về phía cửa sổ để camera nhìn rõ em hơn" rồi vẫn cho chơi tiếp.
- KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân.
- Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi, lời giải thích bằng TIẾNG VIỆT. Không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.

8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.
- Xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; nhỏ, không che vùng tương tác.
- Chân trang hoặc màn kết quả có dòng: MiTi • Học bằng chuyển động.
- Không xóa hoặc đổi tên thương hiệu khi replay, khi vào gameplay hoặc ở chế độ không camera.

9. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.
- Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".
- Tự kiểm tra trước khi xuất: camera xin sau nút Bắt đầu · có loading/error/định vị · 640×480 và lật gương · nền AR là khung hình camera với lớp phủ tối không vượt 0.45 · mọi tọa độ đi qua toScreen, không còn phép nhân thô với W/H · vật thể có z và bóng dưới chân · có ít nhất một vật ảo neo vào landmark cơ thể · gesture fire theo lượt chuyển + cooldown + confidence · không tính hover là đã chọn · calibration đo tầm tay và đặt ngưỡng theo đơn vị vừa đo · động tác to (>= 50% tầm với), vùng đích sát mép khung, xen kẽ trái/phải, trạm nghỉ 5 giây giữa hiệp, đếm động tác ở tổng kết · hit-stop 70–90 ms + giật màn hình, combo có vệt neon và cao độ tăng, chữ khen bật tại điểm chạm, thẻ vàng x2 ngẫu nhiên, mascot phản ứng theo động tác · tab ẩn hoặc mất tiêu điểm là tự Pause, quay lại đếm 3-2-1 · nhận diện 1 lần mỗi 2–3 khung hình, particle có pool, tự giảm chi tiết khi FPS tụt · tổng kết ba thẻ "Làm tốt / Cần luyện / Động tác lần sau" · nắm và thả (grab / catch) hoạt động đúng cơ chế · fallback chuột/chạm chơi trọn vẹn · QUESTION_DATA đủ 40 mục, mỗi mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · tổng kết theo nhóm lỗi · bộ sưu tập lưu localStorage · chữ ký MiTi ở ba màn · file chạy độc lập không lỗi console.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `phan-so-cua-mot-so` — đổi cluster nếu đổi dạng bài.
- Gesture: `GRAB` — mỗi game tối đa 2 mã, mã đầu là mechanic chính.
- Muốn thêm nội dung mới: sửa `tools/data/games.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
