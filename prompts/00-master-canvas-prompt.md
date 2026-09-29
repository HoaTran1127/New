# 👑 MASTER PROMPT — MiTi GEMINI CANVAS EDUCATION GAME

> Khung chuẩn của mọi prompt trong thư viện này. Muốn tạo game mới: copy khối bên dưới, thay phần **1. GAME SPEC** bằng nội dung game cụ thể, hoặc lấy một file prompt đã có sẵn spec.
>
> Chạy trên **Google Gemini → bật chế độ Canvas** để có nút Run/Preview chơi ngay.

## Prompt copy trực tiếp

```text
Bạn là chuyên gia thiết kế và lập trình game giáo dục HTML5 Canvas có tương tác webcam.

Hãy tạo một WEB GAME GIÁO DỤC HOÀN CHỈNH trong DUY NHẤT 1 FILE HTML, chạy được bằng cách mở file hoặc bấm Run/Preview trong Canvas.

========================
0. QUY TẮC ĐẦU RA (đọc trước, quan trọng nhất)
========================
- Một file HTML duy nhất: toàn bộ HTML + CSS + JavaScript nằm trong file đó.
- TOÀN BỘ CSS viết trong một khối <style> nội tuyến. KHÔNG phụ thuộc file .css ngoài.
- KHÔNG dùng https://cdn.tailwindcss.com (Play CDN bị chặn ở nhiều trường học và không dùng cho production).
- Chỉ được phép tải ngoài: MediaPipe (CDN + file model), và Font nếu có dự phòng hệ thống.
- Không dùng file ảnh, âm thanh, JSON ngoài. Asset vẽ bằng Canvas/SVG/CSS, âm thanh tổng hợp bằng Web Audio.
- Khai báo ngân hàng dữ liệu dưới dạng MỘT mảng JS có cấu trúc rõ (const QUESTION_DATA = [...]) đặt ở ĐẦU khối <script>,
  rồi mới đến code engine. Mỗi mục dữ liệu là một object hoàn chỉnh, có đủ đáp án và lời giải.
- TUYỆT ĐỐI không rút gọn: không "...", không "// code tương tự ở trên", không TODO, không pseudocode,
  không "bạn tự bổ sung". File phải chạy ngay sau khi lưu.
- Nếu CDN hoặc model tải lỗi: hiện thông báo tiếng Việt và tự chuyển sang chế độ chuột/chạm, game vẫn chơi được.

========================
1. GAME SPEC
========================
Tên game: [GAME NAME]
Khối lớp: [GRADE] — Môn: [SUBJECT]
Mục tiêu học tập: [LEARNING OBJECTIVE]
Nhiệm vụ một câu của học sinh: [PLAYER MISSION]
Bối cảnh: [SETTING]
Cơ chế chính: [PRIMARY MECHANIC]
Cử chỉ chính: [PRIMARY GESTURE] — Ý nghĩa cử chỉ: [GESTURE MEANING]
Nội dung bắt buộc: [CONTENT SCOPE]
Cấm: [CONTENT BOUNDARIES]

========================
2. NỀN AR + THỊ GIÁC MÁY TÍNH (camera LÀ thế giới game)
========================
NGUYÊN TẮC GỐC: khung hình webcam chính là màn chơi, không phải ảnh minh hoạ đặt cạnh màn chơi.
Trò chơi phải trông như thực tế tăng cường: vật thể ảo nằm trong không gian thật, bám vào người thật,
có chiều sâu, và học sinh thao tác bằng cơ thể trong khung hình đó.

2.0 Hợp đồng render AR (sai một chi tiết là mất chất thực tế ảo)
- Camera là MÀN CHƠI, không phải ảnh minh hoạ đặt cạnh màn chơi. Vật thể ảo phải nằm trong không gian thật,
  bám đúng vào người thật, có chiều sâu, và học sinh thao tác bằng cơ thể trong khung hình đó.
- CÁCH GỐC (ưu tiên, ít lệch nhất): vẽ thẳng khung hình camera vào canvas ở mỗi vòng lặp.
    ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1);            // lật gương ngang
    ctx.drawImage(video, offX, offY, drawW, drawH); ctx.restore(); // cover-fit, cắt viền chứ không giãn
- CÁCH THAY THẾ: <video> position:fixed; inset:0; width:100vw; height:100vh; object-fit:cover; opacity:1
  rồi <canvas> trong suốt đè khít lên trên. Cấm giảm opacity của video, cấm canvas vẽ nền đặc.
- Chọn MỘT trong hai cách, không trộn lẫn.
- Lớp tối chỉnh độ đọc chữ: cho phép ĐÚNG MỘT lớp phủ nửa tối màu lạnh (khuyến nghị rgba(8,5,20,0.35) đến 0.45)
  đè lên camera để thẻ/chữ nổi bật. Alpha của lớp phủ không được vượt 0.45 — quá tối thì camera biến thành phông nền đen, mất AR.
  Chữ và số trên vật thể phải có bản nền riêng (gradient plate + stroke) chứ không phụ thuộc lớp phủ này.
- HUD đặt ở lề trên/dưới, không choán vùng giữa nơi diễn ra tương tác.
- Không bắt buộc WebXR (nhiều máy phổ thông không có). Đây là Web AR 2.5D: ảnh thật + vật thể phối cảnh vẽ đè lên.

2.1 Đồng nhất tọa độ camera ↔ vật thể (lỗi giết chết chất AR phổ biến nhất)
- Cover-fit CẮT ảnh, nên pixel canvas KHÔNG trùng pixel camera theo tỉ lệ 1:1. Phải tính một lần rồi dùng chung:
    scale = Math.max(W / video.videoWidth, H / video.videoHeight);
    drawW = video.videoWidth * scale;  drawH = video.videoHeight * scale;
    offX  = (W - drawW) / 2;           offY = (H - drawH) / 2;
    toScreen(lx, ly) => ({ x: offX + (1 - lx) * drawW, y: offY + ly * drawH })  // lx,ly là landmark chuẩn hóa 0..1
- drawImage và MỌI logic game (spawn, va chạm, vật neo vào tay, hiệu ứng nổ) đều phải đi qua toScreen.
  CẤM viết lx * W hoặc ly * H — khi camera bị crop, thẻ sẽ bay lệch khỏi người học sinh và cảm giác AR sụp đổ.
- Canvas đặt kích thước theo devicePixelRatio (canvas.width = W * dpr; ctx.scale(dpr, dpr)) để ảnh và vật không lệch nét.
- Khi resize hoặc video đổi kích thước thật phải tính lại scale/offX/offY.

2.2 Chiều sâu trong thế giới AR (đọc được khoảng cách)
- Mỗi vật thể có z (1.6 = xa nhất, 0.35 = sát mặt người chơi). Khi z giảm thì vật LỚN DẦN và tiến về phía người chơi:
  size = sizeBase / z;  position = vanishingPoint + (screenCenter - vanishingPoint) * (1 / z - 1);
- Vẽ bóng mờ (ellipse, alpha 0.18–0.3) dưới chân vật trên "sàn" ảo; vật xa thì nhỏ + hơi mờ, vật gần thì to + rực.
- Vật thể rơi/theo làn là chấp nhận được, nhưng phải có ít nhất 2 mức z khác nhau trong cùng một lượt để thấy chiều sâu.
- "Đường tốc độ" (speed lines) hai bên mép khung hình + rung nhẹ khi tăng tốc: tạo cảm giác lao về phía trước như game arcade.

2.3 Neo vật thể ảo vào cơ thể học sinh (đây là thứ biến nó thành AR)
- Đọc landmark thô đã làm mượt, cập nhật MỖI khung hình: cổ tay tay = landmark 0, khuỷu = 13/14, vai = 11/12,
  hông = 23/24, mũi mặt = 0; bàn tay = trung bình landmark 5, 9, 13, 17.
- Vật ảo phải ĐEO/BUỘC vào người: găng neon bọc cổ tay, vòng sáng quanh lòng bàn tay, giỏ treo hai cổ tay,
  thước góc vẽ tại khuỷu, đĩa cân đặt trên hai bàn tay, khung xương neon tối giản dọc thân.
- Mất landmark hoặc confidence tụt: vật neo biến mất kèm hướng dẫn tiếng Việt ("Đưa tay vào khung hình"),
  không được nhảy lung tung hay đứng chốt ở vị trí cũ.

ƯU TIÊN MediaPipe Tasks Vision (API hiện hành), pin phiên bản và URL cụ thể:
  import { HandLandmarker, PoseLandmarker, FilesetResolver }
    from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs";
  wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm
  model tay: https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task
  model thân người: https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task
Chỉ dùng MediaPipe Legacy Solutions (@mediapipe/hands) khi buộc cho tương thích; khi đó PHẢI pin version đầy đủ.

Cấu hình camera:
- getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }).
- Ưu tiên khung hình 640×480 (tỉ lệ 4:3); nếu camera chỉ cho tỉ lệ khác thì crop/letterbox về vùng vẽ cố định,
  không để khung hình bị giãn làm sai tọa độ cử chỉ.
- Lật gương ngang khi hiển thị video và khi tính tọa độ. Landmark chuẩn hóa 0..1 phải đổi ra pixel bằng toScreen() ở mục 2.1,
  không bằng phép nhân thô với chiều rộng/chiều cao canvas.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU.
- Trạng thái hiển thị bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Có khung định vị/calibration để trẻ biết đặt tay hoặc đứng vào đâu; hướng dẫn 1 màn hình, không tutorial dài.

2.4 Calibration động — đo ngưỡng riêng cho từng học sinh (ngồi cạnh bạn cao thấp khác nhau là ngưỡng cố định hỏng ngay)
- Sau khi camera sẵn sàng, chạy màn calibration 3 giây ở tư thế trung tính: đo bề rộng hai vai, khoảng cách cổ tay trái–phải
  và tầm với xa nhất khi học sinh duỗi tay; từ đó suy ra ĐƠN VỊ CHUẨN của phiên chơi (ví dụ 1 đơn vị = 1/2 bề rộng vai).
- MỌI ngưỡng (độ nhanh cú vung, độ rộng tư thế cân bằng, ngưỡng góc, bán kính chấm chọn) tính theo đơn vị chuẩn đó,
  không dùng hằng số pixel cố định và không dùng ngưỡng không thứ nguyên.
- Nếu tầm đo được bất thường (quá gần → rất nhỏ, quá xa → sát mép khung), nhắc tiếng Việt "Lùi thêm một bước cho thấy hết hai tay"
  rồi đo lại; không vào vòng chơi với ngưỡng vừa đo sai.
- Trên HUD giữ nút "Chỉnh lại tư thế" để calibration lại trong 3 giây mà không tải lại trang, không mất điểm và lượt đang có.

Nhận diện chuyển động — đây là phần hay hỏng nhất, làm đúng như sau:
- Làm mượt landmark bằng EMA (alpha 0.4–0.5). Không đọc landmark thô trực tiếp trong logic gameplay.
- Cử chỉ là MACHINE TRẠNG THÁI, chỉ fire event ở LƯỢT CHUYỂN (idle → active). Giữ nguyên tư thế không được spam event.
- Dùng hysteresis hai ngưỡng (ngưỡng kích hoạt và ngưỡng nhả khác nhau) để không nhấp nháy ở ranh giới.
- Kiểm tra hình học KÉP trước khi chốt: ví dụ vừa đủ số ngón gập, vừa đủ gần tâm bàn tay; hoặc vừa đủ tốc độ vừa đúng hướng.
- Ngưỡng tốc độ phải có thứ nguyên rõ: tính theo giây (px/s hoặc normalized/s), không đo "quãng đường mỗi khung hình" vì sẽ đổi ngưỡng theo FPS.
- Cooldown sau mỗi event (khoảng 250–400ms tùy mechanic).
- Confidence thấp thì không chốt đáp án. Không coi "trỏ qua/hover" là "đã chọn" nếu mechanic cần chém/đấm/bốc/nhảy.
- Mỗi lần chỉ dùng MỘT mechanic chính; gesture phụ không được tranh chấp với gesture chính.

========================
3. FALLBACK (bắt buộc, không phải tùy chọn)
========================
- Mouse / cảm ứng / phím mũi tên phải mô phỏng ĐÚNG hành động chính (chém = kéo chuột nhanh, đấm = click, hứng = kéo giỏ).
- Có nhãn rõ trên màn hình: "Chế độ không dùng camera".
- Mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.
- Tự động chuyển sang fallback nếu camera bị từ chối, bị chặn, thiết bị yếu, hoặc CDN không tải được.
- Camera chỉ bật trong môi trường an toàn (HTTPS, localhost hoặc mở file trực tiếp). Nếu trình duyệt chặn vì lý do đó,
  báo một dòng tiếng Việt "Muốn dùng camera thì mở game qua HTTPS hoặc file trên máy em" rồi vào thẳng chế độ không camera,
  không để học sinh đứng chờ ở màn hình lỗi tiếng Anh.
- Thêm nút Tắt camera riêng, không cần tải lại trang.

========================
4. VÒNG LẶP GAME
========================
BẮT ĐẦU → KIỂM TRA THIẾT BỊ → ĐỊNH VỊ → CHO XEM CÁCH MOVE → LUYỆN MẪU → VÒNG CHƠI → PHẢN HỒI NGAY → GIẢI THÍCH TRỰC QUAN → CÂU TIẾP THEO → TỔNG KẾT → CHƠI LẠI.
Round đầu tiên phải hiểu được trong vài giây, không cần đọc hướng dẫn dài.

Cân bằng lượt chơi (chống ăn may):
- Vật thể ĐÚNG và vật thể SAI trộn theo tỉ lệ xấp xỉ 60/40 trong mỗi lượt; không để 12 lượt toàn một loại.
- Chạm vật SAI: trừ tim ngay + cắt chuỗi đúng. Bỏ lỡ vật ĐÚNG: chỉ cắt chuỗi đúng, KHÔNG trừ tim.
  Cặp hình phạt này làm vung tay bừa không thắng được mà đứng chờ cũng không bị phạt oan.
- Không thưởng tốc độ bằng cách cắt mất cơ hội học; đồng hồ (nếu có) chỉ rút ngắn thời gian hiển thị hạt hiệu ứng, không rút thời gian đọc đề.

4.1 Ngân sách hiệu năng (máy phổ thông, lớp học dùng chung)
- Mục tiêu 30 FPS. Chạy nhận diện bằng requestVideoFrameCallback hoặc 1 lần mỗi 2–3 khung hình; render chạy riêng theo requestAnimationFrame.
- Tái dùng pool cho particle và vệt hiệu ứng, không cấp phát object/array mới trong vòng vẽ; giới hạn particle ≤ 60.
- FPS trung bình dưới 28 trong 2 giây → tự giảm chi tiết (bớt hạt, tắt speed lines, nhận diện thưa hơn), TUYỆT đối không giảm nội dung học tập.
- Canvas theo devicePixelRatio nhưng cap ở 2; tính lại scale/offX/offY khi đổi cỡ cửa sổ.

4.2 Tự dừng khi rời màn hình
- document.visibilitychange hoặc window.blur → Tạm dừng ngay, dừng vòng nhận diện, giữ nguyên điểm và lượt.
- Khi quay lại: đếm 3-2-1 rồi mới nhận diện, đồng thời reset cooldown + bộ làm mượt, để một cú vung tay dở dang không biến thành nhát chém.

4.3 BIÊN ĐỘ VẬN ĐỘNG (nếu trẻ chỉ nhấc ngón tay thì chưa phải game vận động)
- Mỗi lượt bắt buộc một động tác lớn: cả cánh tay hoặc thân người đi hết quãng >= 50% tầm với đã đo lúc calibration;
  khuỷu duỗi gần thẳng khi chốt. Cấm thiết kế để nguyên một vòng chơi qua hết bằng cổ tay kề vai.
- Vùng đích dàn ra mép khung: tâm vùng đáp án cách trục cơ thể >= 45% tầm với, nằm trong 12% bề rộng tính từ cạnh khung,
  đổi vị trí giữa các lượt; không đặt hai vùng cạnh nhau và không chồng lên vùng ngực–mặt.
- Xen kẽ nhóm cơ: không để một bên tay/một hướng chịu quá 4 lượt liên tiếp; mỗi 3 lượt đổi mặt phẳng động tác
  (ngang tầm vai → với cao → xuống thấp trong tầm với an toàn).
- Nhịp hiệp: 12 lượt = 3 hiệp × 4 lượt; giữa hai hiệp là "trạm nghỉ" 5 giây đếm ngược, không tính sai, không mất tim.
  Một vòng chơi tương đương 4–6 phút đứng vận động vừa, vẫn tại chỗ.
- HUD nhắc bằng lời: mỗi lượt in một dòng chữ to đúng hướng phải với ("với tay sang trái", "với lên cao", "cúi xuống thấp")
  để trẻ hiểu hệ thống đang chờ một chuyển động, không phải một cú click.
- Đếm vận động: lưu số động tác hợp lệ + thời lượng chơi, hiển thị thẻ "Em đã vận động N động tác trong M phút" ở tổng kết;
  không phải điểm số, không so với bạn.

========================
5. HỌC TẬP DẪN LỐI (LEARNING-FIRST)
========================
- Chuyển động phải phục vụ trực tiếp mục tiêu học tập; nếu bỏ camera mà bài học mất ý nghĩa thì cử chỉ đang sai.
- Đúng: phản hồi tích cực ngay (không thưởng tốc độ bằng cách cắt mất cơ hội học).
- Sai: DỪNG 2 giây, giải thích bằng số, sơ đồ đoạn thẳng, lưới ô, hình cắt ghép, trục số hoặc animation.
- Phương án nhiễu phải mô hình hóa đúng lỗi học sinh thật sự hay mắc, không phải đáp án ngẫu nhiên vô nghĩa.
- Không để hiệu ứng hình ảnh che mất nội dung kiến thức, nhất là phần lời giải.
- Toàn bộ học liệu lấy từ QUESTION_DATA, không hard-code một câu hỏi duy nhất.
- Game Tiếng Anh theo nguyên tắc nghe-trước: phát audio TRƯỚC khi hiện chữ, mỗi lượt có nút phát lại; sai thì phát lại chậm hơn (0.8x)
  và chỉ hiện chữ sau khi học sinh đã chốt đáp án; từ bị nghe sai được xếp lại ở lượt sau trong cùng phiên.

========================
6. NGÂN HÀNG LỖI + TIẾN BỘ (học từ mô hình thư viện lỗi có nhãn)
========================
- Mỗi mục QUESTION_DATA có "errorTag" là mã máy của loại lỗi (ví dụ: thieu_muon, doi_chou_hai_hang, nham_gan_nghia) và "loiViet" là cụm tiếng Việt có dấu hiển thị cho học sinh.
- Câu sai được xếp lại vào CUỐI vòng chơi trong cùng phiên (hàng đợi luyện lại), và ưu tiên xuất hiện lại sớm.
- Màn tổng kết nhóm theo errorTag: "Em hay sai ở: nhớ khi trừ có mượn" — kèm đúng/sai theo kỹ năng, không chỉ điểm số.
- Màn tổng kết trình bày thành BA thẻ chữ to, trẻ đọc xong trong 5 giây:
  "Làm tốt: ..." (tối đa 2 kỹ năng đúng nhiều nhất) · "Cần luyện: ..." (loiViet của nhóm lỗi nhiều nhất) ·
  "Động tác lần sau: ..." (một câu nhắc tư thế/cử chỉ). Không so sánh điểm với bạn khác, không xếp hạng.
- Thưởng dạng BỘ SƯU TẬP: mỗi màn thắng thả ra 1 thẻ nhân vật/huy hiệu, lưu localStorage (key "miti-collection"),
  có màn "Sưu tập của em". Không thưởng ngẫu nhiên vô nghĩa, không cần server, không leaderboard.

========================
7. GIAO DIỆN
========================
- Màn hình Bắt đầu; hướng dẫn bằng icon + 1 câu ngắn; HUD gồm nhiệm vụ + điểm + chuỗi đúng + tiến độ + trạng thái camera.
- Vùng chơi lớn, chữ lớn (đề bài ≥ 28px trên desktop, ≥ 20px trên điện thoại), tương phản tốt, responsive dọc/ngang.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động, và nút "Chỉnh lại tư thế" (calibration lại 3 giây, không mất điểm và lượt).
- Game tự Pause khi tab ẩn hoặc mất tiêu điểm (mục 4.2); nút Tiếp tục to, một cái là đi tiếp được.
- Màn kết quả: số câu, đúng/sai, theo nhóm lỗi, kỹ năng cần luyện, nút Chơi lại và nút Chơi màn khác nếu có.
- Không leaderboard, không quảng cáo, không theo dõi người dùng.

========================
8. ÂM THANH + HIỆU ỨNG HÌNH ẢNH
========================
- Âm thanh tổng hợp bằng Web Audio API (resume AudioContext sau cú bấm đầu tiên). KHÔNG dùng Tone.js, không dùng file mp3 ngoài.
- Bật audio sau thao tác bấm của người dùng (AudioContext resume).
- Âm thanh phân biệt rõ: đúng (in âm vui), sai (cảnh báo nhẹ, không gây sợ), hết máu, hoàn thành màn.
- Hiệu ứng AR-arcade (chọn theo mechanic, vẽ trên canvas tại tọa độ toScreen): hạt nổ + shockwave tại điểm chạm,
  vệt kiếm neon bám theo tay, kính vỡ mạng nhện phủ khắp khung hình khi sai, viền neon phát sáng khi combo cao,
  flash đỏ ngắn khi mất máu, xu/điểm bay lên, đường tốc độ hai bên mép. Mọi hiệu ứng tôn trọng tùy chọn Giảm hiệu ứng.
- Hiệu ứng không được che kiến thức: khi DỪNG 2 giây để giải thích thì dừng spawn vật thể và làm mờ/giảm hạt nổ,
  lời giải phải đọc được trọn vẹn.
- Game Tiếng Anh: dùng window.speechSynthesis đọc từ/câu bằng giọng en-US hoặc en-GB, có nút phát lại.

8.1 CẢM GIÁC ARCADE (juice) — phần quyết định trẻ thấy "vui" hay "làm bài tập có nền camera"
- Hit-stop: khi chốt đúng, đóng băng mọi vật thể 70–90 ms, giật màn hình 4–6 px theo hướng động tác,
  thẻ đáp án lún còn 0.85 rồi nảy về 1.0 (squash & stretch). Người chơi phải NHÌN THẤY lực của cú chạm.
- Combo nhìn + nghe được: "x2, x3, x4…" hiện to dần kèm vệt neon nối từ tay tới vật; cao độ âm thanh đúng nhảy bậc
  theo combo (trần x5); đứt chuỗi thì âm rơi một cung và số combo tan thành hạt.
- Chữ khen bật tại điểm chạm: "ĐÚNG RỒI!", "QUÁ XA!", "CHỐT HẠ!" bay lên từ đúng vị trí vật vỡ rồi tan;
  câu sai dùng chữ đỡ ("Còn sát lắm!", "Thử lại nào!"), không chữ đỏ to gây sợ.
- Sự kiện ngẫu nhiên: mỗi vòng đúng 2 thẻ vàng "nhân đôi điểm trong 5 giây" + 1 "câu thử thách" phát ra từ z xa
  với âm báo riêng, biến mất sau 3 giây. Không làm thay đổi tỉ lệ 60/40 và ngân hàng dữ liệu.
- Mascot phản ứng: nhân vật của game đứng ở góc khung hình (không che người chơi), nghiêng người theo hướng với tay,
  ăn mừng khi combo >= 3, che mắt khi hụt, đưa tay chỉ về camera khi mất landmark.
- Mọi juice chạy trong ngân sách particle của mục 4.1 và tôn trọng nút "Giảm hiệu ứng chuyển động";
  khi hit-stop thì không tụt FPS (dùng freeze frame, không dùng sleep).

========================
9. AN TOÀN + RIÊNG TƯ + TIẾP CẬN
========================
- Không quay chạy nhảy; không yêu cầu rời khỏi vùng camera; mọi động tác đều có phiên bản ngồi tại chỗ.
- Không động tác nguy hiểm (không ném vật, không xoay cổ quá rộng). Có cảnh báo "Chơi đứng cách màn hình 1m, dọn vật sắc nhọn".
- Thiếu sáng là lỗi camera số một của lớp học: nếu khung hình quá tối hoặc ngược sáng, gợi ý một dòng tiếng Việt
  "Bật đèn lên hoặc quay lưng về phía cửa sổ để camera nhìn rõ em hơn" rồi vẫn cho chơi tiếp, không chặn màn chơi.
- KHÔNG upload video/ảnh từ camera. Chỉ dùng landmark và state trong bộ nhớ; không ghi video ra đĩa.
- Không thu thập dữ liệu cá nhân; tiến độ chỉ lưu localStorage của máy đó.
- Chữ dễ đọc, không truyền thông tin chỉ bằng màu (kèm hình hoặc chữ), có reduced-motion.

========================
10. MiTi — DẤU ẤN THƯƠNG HIỆU (bắt buộc trong file HTML)
========================
- Nhúng logo bằng inline SVG/CSS hoặc HTML thuần; không hotlink ảnh ngoài, không phụ thuộc repository.
- Góc trên trái: ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ.
- Logo xuất hiện ở màn hình Bắt đầu, HUD khi chơi và màn hình Kết quả; nhỏ, không che vùng tương tác.
- Chân trang hoặc vùng kết quả có dòng: MiTi • Học bằng chuyển động.
- Không đổi tên thương hiệu, không xóa logo khi vào gameplay, khi replay hoặc ở chế độ fallback.

========================
11. TỰ KIỂM TRA TRƯỚC KHI XUẤT CODE
========================
[ ] camera chỉ xin quyền sau nút BẮT ĐẦU
[ ] có trạng thái loading / permission / ready / tracking / error bằng tiếng Việt
[ ] có khung định vị + calibration 3 giây đo tầm tay và bề rộng vai; ngưỡng đặt theo đơn vị vừa đo, không theo pixel cố định
[ ] tỉ lệ vật thể đúng/sai xấp xỉ 60/40; chạm sai trừ tim, bỏ đúng chỉ mất chuỗi — vung bừa không thắng được
[ ] mỗi lượt là động tác >= 50% tầm với đã calibration; không có đường thắng cả vòng bằng cổ tay kề vai
[ ] vùng đích nằm sát mép khung và đổi vị trí theo lượt, không chồng lên ngực–mặt học sinh
[ ] xen kẽ trái/phải/hai tay, không quá 4 lượt liên tiếp cùng một bên; mỗi 3 lượt đổi mặt phẳng động tác
[ ] 3 hiệp × 4 lượt, giữa hiệp có trạm nghỉ 5 giây; tổng kết có thẻ đếm số động tác và phút chơi
[ ] nhận diện chạy 1 lần mỗi 2–3 khung hình, particle có pool, có chế độ tự giảm chi tiết khi FPS tụt
[ ] tab ẩn hoặc mất tiêu điểm là tự Pause; quay lại đếm 3-2-1 và reset cooldown cùng bộ làm mượt
[ ] khung hình tối/ngược sáng thì gợi ý chỉnh ánh sáng và vẫn chơi được tiếp
[ ] camera bị chặn vì môi trường không an toàn thì báo tiếng Việt rồi vào thẳng chế độ không camera
[ ] màn tổng kết đủ ba thẻ "Làm tốt / Cần luyện / Động tác lần sau"
[ ] videoConstraints 640×480 hoặc crop tương đương, có lật gương
[ ] camera phủ kín vùng chơi, lớp phủ tối không vượt alpha 0.45 (vẫn nhìn rõ người thật)
[ ] có hàm toScreen() dùng chung cho drawImage, spawn, va chạm và vật neo — không còn lx*W
[ ] có chiều sâu: vật thể mang z, lớn dần khi tiến về phía người chơi, có bóng dưới chân
[ ] có ít nhất một vật thể ảo neo vào landmark cơ thể và cập nhật theo từng khung hình
[ ] gesture fire theo lượt chuyển, có hysteresis + cooldown + confidence, không spam khi giữ tay
[ ] kiểm tra hình học kép trước khi chốt đáp án
[ ] hover không bị tính là chọn
[ ] cú chốt đúng có hit-stop 70–90 ms + giật màn hình 4–6 px + squash & stretch trên thẻ
[ ] combo hiển thị to dần, cao độ âm thanh tăng theo combo, đứt chuỗi có âm rơi và số tan thành hạt
[ ] chữ khen tiếng Việt bật lên tại đúng điểm chạm; câu sai dùng chữ đỡ, không chữ đỏ gây sợ
[ ] mỗi vòng có 2 thẻ vàng "x2 điểm trong 5 giây"; mascot phản ứng theo động tác và theo combo
[ ] fallback chuột/chạm/phím chơi trọn vẹn, tự kích hoạt khi camera lỗi
[ ] QUESTION_DATA có ít nhất 40 mục (Toán) hoặc 60 mục (Tiếng Anh), mỗi mục có đáp án + lời giải + errorTag + loiViet
[ ] dữ liệu đặt đầu file, code engine đặt sau, không có chỗ nào rút gọn
[ ] câu sai được đưa vào hàng đợi luyện lại, tổng kết nhóm theo errorTag
[ ] có chữ ký MiTi ở Bắt đầu / HUD / Kết quả
[ ] file chạy độc lập, không lỗi console, không TODO, không pseudocode

Sau khi tự kiểm tra, CHỈ xuất ra file HTML hoàn chỉnh, không kèm giải thích dài.
```

## Vì sao khung này chặt hơn bản trước

- **Tasks Vision thay Legacy Solutions**: `@mediapipe/hands` là API cũ không còn được phát triển; các URL mới ở mục 2 đã được kiểm chứng còn sống.
- **Bỏ Tailwind Play CDN**: nhiều trường chặn CDN và `cdn.tailwindcss.com` không dành cho production → CSS nội tuyến để game không vỡ giao diện.
- **Gesture là máy trạng thái + kiểm tra hình học kép**: lỗi phổ biến nhất của game webcam là một cái giữ tay sinh ra hàng loạt event.
- **Dữ liệu đứng trước code**: khi AI phải nghĩ về dữ liệu trước, nó ít bị cắt ngắn phần code và ít sinh đáp án ngẫu nhiên vô nghĩa.
- **errorTag + hàng đợi luyện lại**: màn tổng kết cho biết kỹ năng nào yếu thay vì chỉ báo điểm.
- **Bộ sưu tập theo màn**: phần thưởng có ý nghĩa và tích lũy qua các game, không phải điểm ngẫu nhiên.
- **toScreen() thay `lx * W`**: bản gốc *Subway Math Blitz AR* vẽ camera theo cover-fit nhưng tính tay bằng `(1 - cx) * canvas.width`;
  hai phép tính này lệch nhau đúng bằng phần ảnh bị cắt, nên thẻ bay cạnh người chứ không bám người. Gom về một hàm chiếu là hết.
- **Biên độ vận động ghi thành con số**: nếu prompt chỉ nói "game vận động", mô hình sẽ chọn ngưỡng nhỏ nhất có thể để nhận diện ổn —
  thường là nhấc ngón tay trước ngực. Ràng buộc ">= 50% tầm với + vùng đích sát mép" mới buộc mô hình đặt hitbox ở chỗ bắt buộc với tay.
- **Hit-stop + combo âm cao dần**: cảm giác "vui" của game arcade đến từ 80 ms đóng băng và cao độ tăng theo chuỗi, không từ số lượng hạt;
  hai thứ này rẻ nên request cụ thể, nếu không mô hình chỉ vẽ particle rồi thôi.
- **Hợp đồng render AR**: camera phủ kín + lớp tối không quá alpha 0.45 + chiều sâu z + vật neo vào landmark,
  để game trông như thực tế tăng cường thay vì "canvas 2D có webcam kèm theo".
- **Calibration động + ngưỡng theo đơn vị cơ thể**: mỗi học sinh đứng cách camera một khoảng khác nhau; ngưỡng pixel cố định
  khiến em ngồi gần thì fire liên tục, em ngồi xa thì vung hết cỡ vẫn không được tính.
- **60/40 + Pause tự động + ngân sách FPS**: ba quy tắc này đến từ lớp học thật — máy cấu hình thấp, tab bị ẩn khi cô chiếu màn hình,
  và học sinh nhanh chóng phát hiện rằng vung tay bừa vẫn thắng.
