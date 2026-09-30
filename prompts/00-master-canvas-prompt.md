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

2.0 Hợp đồng render AR (sai một chi tiết là mất chất thực tế ảo — nguồn: `tools/lib/ar.mjs`, validate chặn nếu thiếu)
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

2.5 Vùng an toàn cho chữ (chữ đè lên mặt học sinh là lỗi giao diện số một của game webcam)
- Chia khung hình thành lưới 3×3. Ô giữa và ô giữa trên là phần thân học sinh → VÙNG CẤM đặt chữ.
- HUD, điểm, tim, đề bài, thẻ đáp án, nút bấm và mascot chỉ nằm ở dải trên cùng, hai cột biên và dải dưới.
- Vật thể tương tác (thẻ bay, vật rơi) vẫn được đi qua vùng giữa; chỉ chữ hướng dẫn và khung HUD là không.
- Khi tính vị trí chữ, lấy tọa độ vai (landmark 11/12) nếu có pose để biết thân học sinh đang lệch về phía nào
  và dịch HUD sang phía trống; không có pose thì giữ HUD ở hai cột biên cố định.

2.6 Đàm phán theo khả năng camera (máy trường thường chỉ thấy nửa người, đừng đòi toàn thân)
- Khi bắt đầu, xác định hệ thống ĐANG thấy tới đâu: chỉ bàn tay (HandLandmarker) → nửa thân trên (thêm vai 11/12)
  → toàn thân (thêm hông 23/24). Chọn cơ chế theo mức tốt nhất đang có, không đòi mức cao nhất rồi báo lỗi.
- Thiếu vai thì bỏ động tác nghiêng thân; thiếu hông thì bỏ bước chân; chỉ thấy một tay thì chuyển sang cơ chế một tay.
- Hiện một dòng tiếng Việt nói rõ mức đang nhận diện ("Camera đang thấy: hai tay + vai") và gợi ý lùi ra xa
  hoặc xoay người nếu thiếu bộ phận mà cơ chế đang chạy cần.
- Mọi nhánh cơ chế đều phải chơi được trọn 12 lượt và giữ đủ mục tiêu học tập.

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
BẮT ĐẦU → KIỂM TRA THIẾT BỊ → ĐỊNH VỊ → CHO XEM CÁCH MOVE → LUYỆN MẪU → KHỞI ĐỘNG 60–90 GIÂY → 10 GIÂY "EM CÒN NHỚ KHÔNG?" → VÒNG CHƠI (12 lượt) → PHẢN HỒI NGAY → GIẢI THÍCH TRỰC QUAN → CÂU TIẾP THEO → HẠ NHIỆT 45–60 GIÂY → TỔNG KẾT → CHƠI LẠI.
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
4.4 ĐỘ KHÓ THÍCH ỨNG (độ khó đi theo năng lực, không theo vị trí lượt chơi)
========================
Nguồn: `tools/lib/verify.mjs` (khối `ADAPT`), validate chặn nếu thiếu.
- Hai câu ĐÚNG liên tiếp → câu kế tiếp lên một level (trần level 3), ưu tiên cùng cụm kiến thức.
  Hai câu SAI liên tiếp → xuống một level và BẮT BUỘC cùng `errorTag` với câu vừa sai, để em sửa đúng chỗ yếu
  chứ không phải gặp chủ đề lạ. Lượt 5 và lượt 9 chỉ còn là mốc NHỊP, không phải thang độ khó.
- SÀN CHỐNG NẢN: không để trẻ sai quá 3 câu liên tiếp. Câu thứ tư là level 1 cùng errorTag và hiện lời giải
  TỪNG BƯỚC (mỗi bước một dòng, đúng dạng bài: cột dọc / sơ đồ đoạn thẳng / lưới ô / trục số) TRƯỚC khi cho chọn lại.
  Chọn lại đúng thì không trừ tim lần hai, không tính là câu sai mới, chỉ không cộng chuỗi; tổng kết ghi "em đã sửa được".
- LEVEL ẨN VỚI HỌC SINH: không hiện chữ "level", "trình độ", số sao xếp hạng hay thanh tiến độ so với bạn.
  Chuỗi thích ứng chạy im lặng phía sau; phân bố số câu và tỉ lệ đúng theo level chỉ ở màn tổng kết cho giáo viên.

========================
4.5 THỂ DỤC CÓ CẤU TRÚC (nguồn: `tools/lib/pe.mjs`, validate chặn nếu thiếu)
========================
Mục tiêu của thư viện này là trò chơi giúp các con VẬN ĐỘNG THỂ DỤC mà vẫn hiểu bài. Một game buộc trẻ đứng với tay
hết tầm liên tục 12 lượt rồi tắt máy ngay — đó là rủi ro cơ bắp nguội, chưa phải bài thể dục. Sáu quy định dưới đây
biên phần "vận động to" ở mục 4.3 thành một tiết thể dục thu nhỏ: làm nóng → nhịp → đo cường độ → hạ nhiệt → nước → trần tải.

- KHỞI ĐỘNG 60–90 GIÂY trước hiệp 1, không tính điểm, không trừ tim: bốn động tác theo thứ tự — đánh nhẹ hai vai 10 nhịp,
  xoay cổ tay 10 vòng mỗi bên, dang hai tay lên cao rồi hạ 8 nhịp, bước tại chỗ nâng cao đầu gối 15 giây; hình que + chữ
  tiếng Việt + đồng hồ đếm ngược trên HUD. Bấm "Bỏ khởi động" vẫn được nhưng màn tổng kết nhắc một dòng nhẹ
  "Lần sau mình khởi động đủ nhé". Máy bật Giảm hiệu ứng thì rút thành cổ tay – cổ chân – hít thở tại chỗ, KHÔNG bỏ hẳn.
- NHỊP MỖI LƯỢT: thẻ đáp án bay vào 3,0–4,5 giây, ở lại tối đa 8 giây kể từ khi hiện hết, giữa hai lượt chừa <= 1,5 giây
  để về tư thế; thời gian đọc đề KHÔNG bị rút. CƯỜNG ĐỘ CẢ PHIÊN: >= 12 nhịp chuyển động mỗi phút, đếm mỗi lần bàn tay hoặc thân
  vượt ngưỡng 15% tầm với đã calibration — tính cả nhịp khởi động, cả nhịp với tới lẫn nhịp rút về trong 12 lượt, và nhịp hạ
  nhiệt — chia số phút chơi thật, không đếm phỏng đoán.
  Con số cũ "8 động tác lớn mỗi phút" là yêu cầu KHÔNG THỂ đạt: 12 lượt chia 4–6 phút nhiều lắm cũng chỉ 3 động tác mỗi phút,
  nên mọi game sẽ báo CHƯA ĐẠT ở mục cường độ. Đơn vị đếm phải là NHỊP vượt ngưỡng, không phải số lượt chơi.
- ĐỒNG HỒ THỜI GIAN VẬN ĐỘNG: tích lũy số giây tay/thân học sinh di chuyển thật (vượt ngưỡng 15% tầm với đã calibration);
  tổng kết in "Em đã chuyển động X giây trên tổng Y giây của phiên" và yêu cầu >= 60%. Dưới 60% thì mời thêm MỘT hiệp phụ
  4 lượt nhẹ, không trừ tim, không phạt, không hiện chữ "không đạt".
- HẠ NHIỆT 45–60 GIÂY trước màn tổng kết: duỗi tay ngang ngực 15 giây mỗi bên, cúi nhẹ chạm mũi bàn chân 15 giây,
  kéo vai ra sau 10 nhịp, kèm hít thở đếm 4 vào – 4 ra; mascot cùng làm, đồng hồ hiển thị trong khung hình camera.
  Không tính điểm, không trừ tim, không được bỏ bằng một nút "Bỏ qua" (chỉ ngắn lại khi máy bật Giảm hiệu ứng).
- NHẮC UỐNG NƯỚC: khi phiên chơi từ 6 phút hoặc đây là phiên thứ hai liên tiếp trong cùng thẻ học, tổng kết hiện đúng
  MỘT dòng "Mình uống vài ngụm nước rồi hãy chơi tiếp nhé" — không pop-up giữa vòng, không lặp lại, không chặn nút nào.
- TRẦN TẢI TRỌNG ĐỘNG: cấm nhảy rồi tiếp đất, cấm xoay thân nhanh quá 90 độ, cấm giữ hai tay trên cao liên tục quá 15 giây,
  tối đa 3/12 lượt là động tác cúi thấp. Mất landmark 3 giây hoặc FPS tụt thì hạ về nhịp chậm + một dòng tiếng Việt nhắc
  chỉnh tư thế, không dồn tiếp động tác cho đủ lượt.
- BẢN KHÔNG CAMERA vẫn giữ cấu trúc buổi tập: khởi động và hạ nhiệt chuyển thành bản tại chỗ nhẹ cho cổ tay – bàn chân – vai
  + hít thở; bỏ mục đồng hồ vận động >= 60%, thay bằng đếm "số lượt em chủ động thao tác trong phiên"; nhịp thẻ và trần tải
  trọng áp dụng nguyên văn.

4.6 TIẾT HỌC 45 PHÚT + GẮNG SỨC THẬT (bắt buộc — nguồn: `tools/lib/lesson.mjs`, validate chặn nếu thiếu) — phần quyết định một phiên có vừa với một tiết và em có mệt thật không

Mục 4.5 quản lý KHÔNG GIAN của một hoạt động thể dục (khởi động, biên độ, trạm nghỉ, hạ nhiệt, trần tải trọng). Khảo sát
85 prompt trước vòng 16: "8–10 phút" = 0/85, "45 phút" = 0/85, "gắng sức" = 0/85, "đổ mồ hôi" = 0/85, "thở gấp" = 0/85,
"hồi nhịp" = 0/85 — không tầng nào nói một phiên dài bao lâu và em đã mệt tới mức nào. Hai hệ quả thật ở lớp: một nhóm
chơi say sưa 20 phút thì ba nhóm còn lại hết tiết chưa tới lượt (vòng 15 đã chia ĐỦ lượt, chưa chia THỜI GIAN), và
"đồng hồ vận động >= 60% thời lượng phiên" chỉ đếm số lần đưa tay nên không phân biệt bài vừa sức với bài quá sức. Sáu
quy định dưới đây biến một phiên thành một hoạt động thể dục có thời lượng và có kiểm tra độ mệt.

- TRẦN 8–10 PHÚT CHO MỘT PHIÊN: HUD có đồng hồ phiên "Còn <n> phút" (chữ >= 20px, không nhấp nháy, không đổi màu đỏ) chạy
  từ lúc bấm KHỞI ĐỘNG; 60–90 giây khởi động + 12 lượt chính + 45–60 giây hạ nhiệt phải nằm trọn trong trần đó. Phút thứ 10
  rơi vào đâu thì game khép lại ở RANH GIỚI lượt kế tiếp chứ không cắt giữa lượt đang chơi, màn tổng kết tự hiện, không bắt
  em bấm "Kết thúc". Trần này chỉ tính cả phiên — từng thẻ câu hỏi vẫn KHÔNG có đồng hồ đếm ngược (đã cấm ở mục 6.3).
- KẾ HOẠCH TIẾT 45 PHÚT IN TỪ SỐ THẬT: màn tổng kết in một dòng "Kế hoạch tiết 45 phút: <n> phiên × <n> phút + <n> phút đổi
  nhóm + 5 phút chốt tờ rời" tính từ thời lượng phiên thật vừa chơi, và giáo viên thấy ngay nếu bốn nhóm không vừa — khi đó
  dòng đó ghi thẳng "tiết này chỉ đủ 3 nhóm chơi, nhóm còn lại ôn bằng tờ rời", không để thầy cô tự tính lại. Nút "Kết phiên"
  cho giáo viên bấm bất cứ lúc nào: game đóng ngay ở ranh giới lượt kế tiếp, không trừ tim, không hỏi lý do, không tính là em
  bỏ dở.
- BỐN MỨC GẮNG SỨC CUỐI MỖI HIỆP: em tự báo gắng sức trên "dễ quá" · "vừa" · "mệt" · "kiệt" (bốn mức tương ứng 1–4), một
  hàng bốn nút >= 56px, chọn bằng cái chỉ tay hoặc chạm; không mức nào bị coi là sai, không trừ tim, không đổi điểm. Kết quả
  ghi vào localStorage "miti-effort" theo từng hiệp và đọc lại được ở phiên sau; màn tổng kết in "Gắng sức: hiệp 1 <mức> ·
  hiệp 2 <mức> · hiệp 3 <mức>". Bản tắt tiếng và bản reduced-motion vẫn có đủ bốn mức bằng chữ và hình.
- 15 GIÂY HỒI NHỊP GIỮA HIỆP: mascot hướng dẫn hít vào 4 nhịp – thở ra 6 nhịp theo vạch nhịp (không phải im lặng đứng chờ),
  HUD hiện "Nhịp của em: còn nhanh / vừa phải / chậm rồi" suy từ số động tác mỗi phút của 30 giây vừa qua, kèm ghi chú
  "ước lượng từ chuyển động, không phải đo mạch". Hiệp sau chỉ bắt đầu sau khi hồi nhịp xong; `prefers-reduced-motion` thì rút
  còn 10 giây đếm chữ, vẫn đủ 12 lượt chính.
- KHỐI "BẢN TIẾT HỌC" ĐÚNG BỐN DÒNG: "Phiên vừa chơi: <n> phút · vận động <n>%" · "Gắng sức: hiệp 1 <mức> · hiệp 2 <mức> ·
  hiệp 3 <mức>" · "Kế hoạch tiết 45 phút: <n> phiên × <n> phút" · "Bốn em hôm nay: <tên> <n> động tác, <tên> <n> nhịp cổ vũ".
  Toàn bộ bốn dòng nằm trong khối chữ mà nút "Copy tờ rời" copy được; không dòng nào được bịa số — dòng nào thiếu dữ liệu thật
  thì in "chưa ghi được" thay vì đoán.
- TỰ KIỂM BẰNG `verifyLesson()`: chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — đồng hồ phiên có thật và phiên tự khép ở phút
  thứ 10 tại ranh giới lượt · bốn mức gắng sức xuất hiện cuối mỗi hiệp và ghi đọc lại được từ "miti-effort" · 15 giây hồi nhịp
  chạy giữa các hiệp trước khi hiệp sau bắt đầu · khối "Bản tiết học" in đủ bốn dòng lấy từ số thật. Thiếu điều nào thì
  `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản không camera vẫn
  bắt buộc đủ bốn điều, vì đồng hồ phiên và gắng sức không phụ thuộc camera.

4.7 CHUẨN KIẾN THỨC SGK (bắt buộc — nguồn: `tools/lib/curriculum.mjs` + `tools/data/standards.mjs`, validate chặn nếu thiếu) — phần quyết định một câu hỏi thuộc mạch nào và lớp cần đạt tới đâu

Tầng nhẹ đầu (mục 6) chặn đề quá nặng, tầng tự kiểm chứng đề (mục 5.5) chặn số hoặc từ ngoài phạm vi SGK — nhưng cả hai
chỉ nói "trong phạm vi", không câu nào nói nó thuộc MẠCH nào và yêu cầu cần đạt là gì. Khảo sát 85 prompt trước vòng 17:
"mạch kiến thức" = 0/85, "yêu cầu cần đạt" = 0/85, "chuẩn kiến thức" = 0/85, "mẹo nhớ" = 0/85, "Dễ nhầm" = 0/85. Hai hệ
quả thật ở lớp: giáo viên cầm tờ rời không đối chiếu được game với yêu cầu của lớp (vì dòng "mục tiêu" do mô hình tự viết
lại mỗi game một kiểu), và học sinh sập đúng cái bẫy mà sách đã ghi nhận ba mươi năm thì game coi như một errorTag vô danh
xuất hiện SAU khi em sai. Sáu quy định dưới đây lấy dữ liệu từ `tools/data/standards.mjs` (57 cụm × 4 cột), prompt không
được tự viết lại.

- NHÃN MẠCH TRÊN HUD, CHỈ TÁM MẠCH: mỗi câu mang đúng một nhãn mạch — Toán 4 mạch "Số và phép tính" · "Hình học và đo
  lường" · "Giải toán có lời văn" · "Một số yếu tố thống kê và xác suất"; Tiếng Anh 3 mạch "Đọc và viết" · "Nghe và nói" ·
  "Kiến thức ngôn ngữ"; hai môn chung mạch "Ôn tập tổng hợp". HUD góc trên trái hiện nhãn ngắn (cột `ngan`, <= 18 ký tự,
  chữ >= 18px, nền đặc, không nhấp nháy) đổi theo câu đang hỏi. CẤM tự đặt tên mạch ngoài bảng chuẩn, CẤM HUD không có
  nhãn mạch.
- DÒNG "YÊU CẦU CẦN ĐẠT" NGUYÊN VĂN Ở HAI MÀN: màn khởi động (3 giây đầu, TRƯỚC cú "ồ") và màn tổng kết mỗi nơi in đúng một
  dòng "Yêu cầu cần đạt: ..." lấy NGUYÊN VĂN từ `tools/data/standards.mjs` — không viết lại, không tóm tắt, không đổi số,
  chữ >= 20px, không che vùng chơi. Dòng ở màn tổng kết nằm trong khối mà nút "Copy tờ rời" copy được. Đây là dòng duy nhất
  để giáo viên đối chiếu game với sách mà không phải mở lại prompt.
- MẠCH CHÍNH <= 9/12 LƯỢT, >= 3 LƯỢT THUỘC MẠCH KHÁC: trong 12 lượt chính phải có >= 3 lượt thuộc mạch KHÁC mạch chính (tính
  cả lượt xen cụm của mục 5.7 nếu cụm đó khác mạch); câu khác mạch vẫn phải là cụm có thật trong bảng chuẩn của đúng môn và
  đúng lớp, cấm bịa chủ đề ngoài chương trình. Tổng kết in "Hôm nay em chạm <n> mạch: <tên ngắn 1>, <tên ngắn 2>" đúng bằng
  số mạch thật đã hỏi. Một game "Phân số" mà 12/12 lượt đều là phân số sẽ khiến em thuộc lòng một thao tác, không phải Toán.
- "DỄ NHẦM" BÁO TRƯỚC CÂU ĐẦU TIÊN CỦA CỤM: hiện một dòng "Dễ nhầm: <một lỗi>" lấy đúng một ý trong bảng lỗi của cụm, <= 16
  từ, chữ >= 20px, tự tắt sau 6 giây hoặc khi em chạm, không che đề. Đây là BÁO TRƯỚC trước khi học sinh bấm đáp án, khác
  hẳn chữ đỡ sau khi sai ở mục 3; các lượt sau của cùng cụm không lặp lại dòng này.
- "MẸO NHỚ" <= 12 TỪ KÈM MỘT ĐỘNG TÁC 3 GIÂY: mỗi cụm có đúng một mẹo nhớ trong bảng chuẩn, bật ở cú trả lời ĐÚNG của câu đầu
  cụm và ngay sau câu sai mang errorTag của cụm đó, mascot đọc to bằng `speechSynthesis`. Mỗi mẹo gắn MỘT động tác 3 giây
  mascot làm mẫu tại chỗ (dậm chân, đưa tay sang ngang, quay cổ tay) để em nhớ bằng cơ thể; động tác là hưởng ứng, KHÔNG phải
  điều kiện cộng điểm. Dòng mẹo nằm trong khối "Copy tờ rời".
- TỰ KIỂM BẰNG `verifyStandard()`: chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — mọi câu có nhãn mạch nằm trong bảng chuẩn và
  HUD có thật · dòng "Yêu cầu cần đạt:" xuất hiện ở đúng hai màn và khớp nguyên văn bảng chuẩn · mạch chính <= 9/12 lượt kèm
  >= 3 lượt khác mạch · mỗi cụm có "Dễ nhầm" ở câu đầu và "Mẹo nhớ" <= 12 từ kèm động tác 3 giây. Thiếu điều nào thì
  `console.warn` tiếng Việt nêu cụm hoặc lượt nào lệch và bảng kiểm ghi CHƯA ĐẠT. Bản một học sinh và bản không camera vẫn
  bắt buộc kiểm đủ bốn điều trên.

4.8 CHẤT THỂ THAO (bắt buộc — nguồn: `tools/lib/sport.mjs` + `tools/data/sports.mjs`, validate chặn nếu thiếu) — phần quyết định một cú vung tay có phải một môn thể thao hay không

Tầng thể dục (mục 4.5) quản lý LIỀU vận động, tầng tiết học (mục 4.6) quản lý THỜI LƯỢNG và ĐỘ MỆT — nhưng không mục nào nói
động tác em vừa làm là động tác của MÔN nào. Khảo sát 85 prompt trước vòng 18: "môn thể thao" = 0/85, "đồng đội" = 0/85, "tinh
thần thể thao" = 0/85, "bảng thành tích" = 0/85, "duỗi cơ" = 0/85, "khẩu hiệu" = 0/85. Hệ quả đo được: game webcam lớp 4 chỉ còn
là "vung tay chọn đáp án" — trẻ không hình dung mình đang tập một môn thể thao, còn giáo viên thì không có thành tích của cả đội
để tuyên dương. Sáu quy định dưới đây lấy dữ liệu từ `tools/data/sports.mjs` (14 mã điều khiển × 5 cột: `mon` · `dongTac` ·
`hieuLenh` · `loiHay` · `duoiCo`), prompt không được tự đặt tên môn.

- MỖI GAME MỘT MÔN THỂ THAO CÓ TÊN: tên môn của mã điều khiển chính (cột `mon`, <= 4 từ) hiện ở HUD góc trên phải (chữ >= 18px,
  nền đặc, không nhấp nháy) suốt phiên, kèm "Hôm nay ta tập môn ..." ở màn khởi động và "Môn thi đấu hôm nay: ..." ở màn tổng
  kết, nằm trong khối mà nút "Copy tờ rời" copy được. CẤM thay tên môn bằng mô tả động tác chung chung kiểu "vung tay chọn đáp
  án"; CẤM đổi môn giữa chừng trong một phiên.
- ĐỘNG TÁC CỦA MỌI LƯỢT LÀ ĐỘNG TÁC CỦA MÔN: động tác đặc trưng (cột `dongTac`, <= 6 từ) — giương tay chỉ đích của Bắn cung, kéo
  dây của Kéo co, bắt bóng lên rổ của Bóng rổ — mascot làm mẫu 3 giây ở đầu mỗi hiệp và hô hiệu lệnh của môn (cột `hieuLenh`,
  <= 4 từ) bằng `speechSynthesis` để cả nhóm hô lại trước lượt đầu tiên. Biên độ vẫn >= 50% tầm với và vẫn tuân nguyên văn trần
  tải trọng mục 4.5 (cấm nhảy tiếp đất, cấm xoay nhanh quá 90 độ, cấm giữ tay trên cao quá 15 giây). Tổng kết đếm "Em đã
  <động tác> <n> lần" bằng số thật, không phải số điểm.
- 12 LƯỢT LÀ MỘT ĐƯỜNG TIẾP SỨC: gậy tiếp sức ảo neo landmark bàn tay (alpha <= 0.45) nằm trong tay em đang chơi và truyền tay
  ngay khi em đó hết 3 lượt, truyền xong mới tới lượt kế, không cắt giữa lượt. CẤM coi rơi gậy là thua: gậy lệch chỉ hiện đúng
  một dòng "Không sao, chạy tiếp", không trừ tim, không trừ điểm. Mỗi hiệp khép bằng đúng một thanh đích chung của mục 8.2, nhãn
  đọc là "Đội mình: <x>/<mốc>" — CẤM dựng thêm bảng đích thứ hai.
- TINH THẦN THỂ THAO CHẠY ĐÚNG HAI LẦN MỘT PHIÊN: (1) trước hiệp 1, bốn em quay vào nhau chạm khuỷu hoặc bắt tay 3 giây, mascot
  hô "Chơi đẹp!"; (2) khi một em trả lời sai, em ở vai cổ vũ nói một lời hay <= 6 từ lấy từ cột `loiHay` của môn, hiện trên HUD
  4 giây kèm phụ đề chữ. CẤM mọi dòng chế bai ("Ôi sai rồi", "Dễ thế cũng sai", "Thua rồi") — sai là lúc cần lời hay nhất. Tổng
  kết in "Tinh thần thể thao: <n> lời hay đã nói", thiếu số thì in "chưa ghi được".
- BẢNG THÀNH TÍCH BA MỐC CHO CẢ ĐỘI, KHÔNG XẾP HẠNG CÁ NHÂN: ba mốc giảm dần Vàng >= <x>, Bạc >= <y>, Đồng >= <z> (x > y > z, đặt
  theo đúng 12 lượt của phiên) và đội nhận MỘT màu huy chương kèm số động tác thật; lưu localStorage "miti-sport" và đọc lại ở
  phiên sau bằng "Kỳ trước cả đội đạt <màu> — <n> động tác". CẤM xếp hạng cá nhân, CẤM so bảng thành tích giữa các máy hoặc giữa
  các nhóm, CẤM biến huy chương thành điều kiện mở khóa nội dung.
- HỒI TỈNH BẰNG ĐỘNG TÁC DUỖI CỦA CHÍNH MÔN: trong hạ nhiệt 45–60 giây của mục 4.5, động tác duỗi giữa là động tác duỗi riêng của
  môn (cột `duoiCo`, 15 giây — đúng suất thời lượng `tools/lib/pe.mjs` đã chia cho một động tác), hai động tác hai bên giữ nguyên
  "duỗi tay ngang ngực" và "kéo vai ra sau 10 nhịp". HUD "Cơ em đang duỗi: <tên>" (chữ >= 20px, không nhấp nháy) đổi theo động tác
  và mascot đọc tên cơ. CẤM duỗi bật nhịp (ballistic), CẤM ép em chạm gót tay xuống đất; `prefers-reduced-motion` rút còn HAI
  động tác duỗi, mỗi động tác 10 giây, vẫn nằm trong cửa sổ hạ nhiệt.
- TỰ KIỂM BẰNG `verifySport()`: chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — tên môn có thật trên HUD và ở đúng hai màn · động tác
  của môn được mascot làm mẫu 3 giây kèm hiệu lệnh · nghi thức tinh thần thể thao chạy đủ hai lần · bảng thành tích ba mốc và động
  tác duỗi của môn nằm trong hạ nhiệt. Thiếu điều nào thì `console.warn` tiếng Việt nêu điều nào lệch và bảng kiểm ghi CHƯA ĐẠT.
  Bản tắt tiếng, bản reduced-motion và bản không camera vẫn bắt buộc kiểm đủ bốn điều trên.

4.9 GIA ĐÌNH — TỜ GỬI BỐ MẸ (bắt buộc — nguồn: `tools/lib/family.mjs`, validate chặn nếu thiếu) — phần quyết định tiết học có đi được về nhà hay không

Tầng chuẩn kiến thức (mục 4.7) và tầng tiết học (mục 4.6) đã làm ra một "tờ rời" — nhưng tờ ấy viết cho GIÁO VIÊN: đối chiếu
yêu cầu cần đạt, tính giờ lên lớp. Khảo sát 85 prompt trước vòng 19: "phụ huynh" = 0/85, "gia đình" = 0/85, "bố mẹ" = 0/85,
"ở nhà" = 0/85, "bài tập về nhà" = 0/85, trong khi "tờ rời" đã 85/85. Hệ quả đo được: tiết học kết thúc ở cổng trường, còn
cái trẻ nhớ cả tuần lại là cái màn hình nhắc trẻ cuối cùng. Sáu quy định dưới đây nối đúng sợi dây đó — và nối mà KHÔNG biến
game thành bài tập về nhà, thứ mục 6.3 đã chặn ngay trong lớp. Tầng này không tự đặt con số nào: trần 16 từ lấy của mục 6.3,
trần 12 từ và động tác 3 giây lấy của mục 4.7, khối "Copy tờ rời" và dòng "Cả nhóm" lấy của mục 4.7 và 8.2.

- ĐÚNG MỘT KHỐI "GỬI BỐ MẸ", ĐÚNG BỐN DÒNG: màn tổng kết in một khối gồm "Hôm nay con tập môn <môn> — <n> động tác" ·
  "Con học <tên mạch ngắn>, <k> câu đúng trên <tổng>" · "Mẹo con mang về: <mẹo>" · "Việc 3 phút ở nhà: <một hoạt động>", mỗi
  dòng <= 20 từ, chữ >= 20px, nằm TRONG khối chữ mà nút "Copy tờ rời" copy được — không screensaver, không trang riêng, không
  bắt bố mẹ mở thêm ứng dụng nào khác. Dòng nào thiếu dữ liệu thật thì in "chưa ghi được"; CẤM bịa số, CẤM in hai khối.
- DÒNG CUỐI LÀ MỘT VIỆC 3 PHÚT KHÔNG MÀN HÌNH, KHÔNG VIẾT: cả nhà làm cùng nhau động tác đặc trưng của môn (cột `dongTac`
  trong `tools/data/sports.mjs`) rồi hỏi nhau MIỆNG đúng MỘT đề lấy nguyên văn từ `QUESTION_DATA` của phiên vừa chơi (đề
  <= 16 từ). CẤM biến thành bài tập về nhà có ghi vở, CẤM giao thêm đề thứ hai, CẤM yêu cầu bố mẹ chụp ảnh hay quay video gửi
  lại, CẤM đòi mua thêm đồ dùng; đây là để con nhắc lại bằng miệng chứ không phải để bố mẹ dạy lại — CẤM kèm thang điểm hay lời phê.
- "MẸO CON MANG VỀ" CHÉP NGUYÊN VĂN MẸO TRÊN MÀN HÌNH: lấy đúng cột `meo` (<= 12 từ) trong `tools/data/standards.mjs` của cụm
  vừa học — không viết lại, không tóm tắt, không đổi số — kèm MỘT động tác 3 giây bố mẹ làm cùng con đúng bằng động tác mascot
  đã làm trong lớp. CẤM phát minh mẹo khác ở tờ gửi về: hai bản mẹo lệch nhau buộc con phải nhớ hai lần.
- KHỐI NÀY CHỈ NÓI VỀ EM ĐANG CHƠI: CẤM in tên bạn khác, CẤM xếp hạng "con đứng thứ <n>", CẤM mọi dòng so sánh với một em cụ
  thể; thành tích tập thể chỉ được đọc bằng đúng MỘT dòng "Cả nhóm: <x>/<mốc>" mà mục 8.2 đã dựng, không kèm danh sách tên.
  CẤM nêu số điện thoại, email, ảnh hay bất kỳ dữ liệu cá nhân nào của gia đình vào khối chữ copy được này.
- CẤM GIỌNG ĐE DỌA VÀ CẤM TẠO NGHĨA VỤ: không "nếu không luyện con sẽ tụt", không "mỗi ngày bắt buộc 3 phút", không "nếu bỏ
  sẽ mất <n> sao". Ngay sau bốn dòng là MỘT dòng chốt duy nhất <= 24 từ, hoặc "Nhà mình làm cùng nhau khi nào cũng được", hoặc
  "Khi nào con muốn chơi lại thì con tự bấm" — CẤM in cả hai.
- TỰ KIỂM BẰNG `verifyFamily()`: chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — khối "Gửi bố mẹ" có ĐÚNG MỘT lần và nằm trong
  khối "Copy tờ rời" · bốn dòng in từ số thật của phiên chứ không phải chữ chép sẵn · hoạt động 3 phút không màn hình có thật
  và lấy đúng cột `dongTac` của môn · khối không có tên bạn khác, không xếp hạng, không dòng đe dọa. Thiếu điều nào thì
  `console.warn` tiếng Việt nêu điều lệch và bảng kiểm ghi CHƯA ĐẠT. Bản một học sinh, bản không camera và bản tắt tiếng vẫn
  bắt buộc kiểm đủ bốn điều trên.

4.10 TUẦN HỌC — LỚP ĐANG HỌC TỚI TUẦN MẤY (bắt buộc — nguồn: `tools/lib/pacing.mjs` + cột `tuan` của `tools/data/standards.mjs`, validate chặn nếu thiếu) — phần quyết định giáo viên cầm 85 thẻ game có biết mở thẻ nào cho tiết hôm nay hay không

Mục 4.7 đã buộc mỗi câu nói được mình thuộc mạch nào và lớp cần đạt tới đâu, `tools/lib/memory.mjs` đã hẹn ôn +1/+3/+7 ngày cho
TỪNG EM — nhưng không tầng nào trả lời câu hỏi đầu tiên của một giáo viên: "hôm nay tuần 13 thì tôi cho lớp chơi game nào?".
Khảo sát 85 prompt trước vòng 20: "tuần 1" = 0/85, "tuần 12" = 0/85, "theo tuần" = 0/85, "phân phối chương trình" = 0/85,
"học kì" = 0/85, "giữa kì" = 0/85, "đến tuần" = 0/85; chính `catalogs/curriculum/toan-lop-4-5-sgk-matrix.md` cũng 0 lần chữ
"tuần". Hệ quả: thư viện 85 game không có thứ tự sử dụng, còn lịch ôn thì chỉ đúng với em đã chơi nhiều phiên, không đúng với
cả lớp vừa bước vào tuần kiểm tra. Tầng này cũng không tự đặt con số: khoảng tuần lấy từ cột `tuan`, mốc kiểm tra lấy từ
`SCHOOL_YEAR`, còn >= 3/12 lượt xen thì trùng với ba lượt xen mạch của mục 4.7.

- NHÃN TUẦN Ở HAI MÀN, LẤY TỪ BẢNG CHUẨN: mỗi game in ĐÚNG MỘT nhãn "Tuần <a>–<b> · Học kì <n>" ở màn khởi động và màn tổng
  kết, chữ >= 18px, nằm TRONG khối "Copy tờ rời"; a và b chép nguyên văn cột `tuan` của cụm trong `tools/data/standards.mjs`,
  Học kì tính theo tuần mở bài (`tuan[0]` <= 18 là Học kì 1, từ 19 là Học kì 2). CẤM tự đặt khoảng tuần khác bảng, CẤM in "cả
  năm" hoặc để trống, CẤM một cụm phủ quá 10 tuần. Kèm đúng một dòng <= 14 từ "theo phân phối chung — cô xác nhận tuần của lớp
  em" để không ai nhầm bảng này với thời khóa biểu của trường.
- HỎI TUẦN ĐÚNG MỘT CÂU, Ở PHIÊN ĐẦU: "Lớp mình đang học tuần mấy?" hiện một lần với hàng nút số 1–35 gom theo tháng; bấm xong
  lưu localStorage "miti-week" và các phiên sau đọc lại chứ không hỏi nữa. Chưa chọn thì game vẫn chơi bình thường và HUD ghi
  "Tuần: chưa chọn" — CẤM chặn nút "Bắt đầu", CẤM hỏi giữa phiên, CẤM hỏi lại khi đã có "miti-week", CẤM tiện đó hỏi tên học
  sinh hay bất kỳ dữ liệu cá nhân nào.
- >= 3/12 LƯỢT LÀ CỤM ĐÃ QUA TUẦN: khi đã biết tuần của lớp, ít nhất ba lượt chính phải là cụm có `tuan[1]` nhỏ hơn tuần đó —
  đem cái đã học xong ra luyện lại, không đánh đố trước chương trình. Ba lượt này trùng được với ba lượt xen mạch của mục 4.7,
  miễn cụm chọn vừa khác mạch vừa đã qua tuần. Tổng kết in "Tuần <t> · em ôn lại <n> cụm đã học" bằng số thật. CẤM lấy một cụm
  chưa tới tuần mở bài làm đề MỚI.
- HAI TUẦN NƯỚC RÚT CHỈ ĐỔI THỨ TỰ, KHÔNG ĐỔI LUẬT: trong 2 tuần trước một mốc của `SCHOOL_YEAR.moc` (giữa học kì 1, cuối học
  kì 1, giữa học kì 2, cuối học kì 2), HUD in thêm "Còn <n> tuần tới kiểm tra <tên mốc>" và hai lượt ĐẦU lấy cụm có errorTag
  yếu nhất của em trong "miti-mastery". CẤM tăng độ khó, CẤM trừ tim nhiều hơn, CẤM biến 12 lượt thành đề thi thử có đồng hồ,
  CẤM kéo dài phiên quá trần 10 phút của mục 4.6, CẤM bỏ khởi động và hạ nhiệt để nhét thêm đề.
- TỪ TUẦN 33 LÀ TỔNG ÔN: đến hết tuần 35, >= 6/12 lượt chính là cụm đã học xong trước tuần hiện tại và CẤM giới thiệu cụm mới
  (không cụm nào có `tuan[0]` lớn hơn tuần hiện tại được xuất hiện). Tổng kết in "Cả năm có <k> cụm, em vững <m> cụm" với <k>
  đếm từ bảng chuẩn của đúng lớp, <m> đếm từ "miti-mastery" — thiếu số thì in "chưa ghi được", CẤM bịa.
- TỰ KIỂM BẰNG `verifyPacing()`: chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — mọi câu mang nhãn tuần khớp NGUYÊN VĂN cột
  `tuan` và khoảng đó nằm trong 1–35 · câu hỏi tuần chạy ĐÚNG MỘT lần ở phiên đầu, đọc lại được từ "miti-week", không chặn nút
  nào của màn Bắt đầu · khi đã có tuần của lớp thì >= 3/12 lượt là cụm có `tuan[1]` nhỏ hơn tuần đó · nhãn nước rút và chế độ
  tổng ôn đổi đúng theo `SCHOOL_YEAR` mà không đổi luật chơi, không đổi trần tải trọng của mục 4.5. Thiếu điều nào thì
  `console.warn` tiếng Việt nêu điều lệch và bảng kiểm ghi CHƯA ĐẠT. Bản không camera, bản một học sinh và bản tắt tiếng vẫn
  bắt buộc kiểm đủ bốn điều, vì tuần học không phụ thuộc webcam.

4.11 CHỖ CHƠI AN TOÀN — KHÔNG GIAN THẬT VÀ QUYỀN NGHỈ (bắt buộc — nguồn: `tools/lib/playzone.mjs`, validate chặn nếu thiếu) — phần quyết định một em có được đứng lên vung tay trước máy mà không sợ va bàn, trượt dép hay phải cắn răng chơi nốt

Mục 4.5 đã quy định thân thể (khởi động, biên độ, trần tải trọng, hạ nhiệt) và mục 7.2 đã quy định chỗ đứng của bốn em quanh một máy, nhưng khảo sát 85 prompt trước vòng 21 cho thấy cả phòng học thì trống: "dép" = 0/85, "quai hậu" = 0/85, "giày" = 0/85, "chân đất" = 0/85,
"sàn trơn" = 0/85, "bàn ghế" = 0/85, "chật" = 0/85, "đứng tại chỗ" = 0/85, "vùng vung tay" = 0/85. Dòng an toàn hiện hành của
`tools/lib/rules.mjs` thì có ở 85/85 prompt, nhưng chỉ là MỘT câu mơ hồ: nó đo khoảng cách bằng "một bước" trong khi mục 7.2 đã
đo bằng "1 sải tay" và "máy cách >= 1,2 m"; nó CẤM "rời khỏi chỗ" mà không có bản thay thế tại chỗ cho động tác đã thiết kế
theo hướng phải né hay lùi; và không có một chỗ nào để một em đang đau xin dừng mà không bị trừ tim hay bị hỏi lý do. Một em
đau vì va bàn hoặc sợ cô phê thì nghỉ hẳn môn này — tầng này quy định cái giường thật mà trò chơi đứng trên đó.

- THẺ DẸP CHỖ CHƠI NẰM TRONG KHỞI ĐỘNG, KHÔNG PHẢI MỘT MÀN HÌNH MỚI: thẻ "Dẹp chỗ chơi" chạy NGAY TRONG 60–90 GIÂY khởi động
  (mục 4.5) và tối đa 20 giây, gồm đúng BỐN dòng <= 12 từ với một nút "Chỗ chơi ổn rồi" >= 56px: "Vùng đứng mỗi em: một vòng
  1 sải tay tính từ vai" · "Bàn ghế, cặp, chai nước: ra khỏi vùng vung tay" · "Sàn: khô, không vừa lau, không dây điện ngang" ·
  "Máy: cách em đang chơi >= 1,2 m". CẤM mở thêm một màn hình riêng trước khởi động (sẽ vượt trần 8–10 phút của mục 4.6),
  CẤM dùng "một bước" làm đơn vị khoảng cách vì đã có 1 sải tay đo được, CẤM chặn nút "Bắt đầu", CẤM trừ tim vì chưa dẹp —
  giáo viên bấm "Bỏ qua" được, màn tổng kết chỉ nhắc một dòng nhẹ.
- HÀNG BA LỰA CHỌN GIÀY DÉP ĐỔI BỘ ĐỘNG TÁC, KHÔNG PHẠT EM: trên thẻ có một hàng ba lựa chọn "dép quai hậu" · "giày buộc dây" ·
  "chân đất / dép lê", chọn một lần lưu localStorage "miti-foot" và các phiên sau đọc lại. Chân đất / dép lê thì MỌI động tác
  nhấc chân cao, bước rời chỗ, khuỵu gối sâu đổi sang bản cẳng tay – vai tại chỗ và 0/12 lượt được là nhấc chân cao; dép quai
  hậu thì bỏ nhảy đổi chân nhưng vẫn được bước tại chỗ. CẤM từ đầu đến cuối phiên mọi động tác đòi đứng một chân, kể cả khi đã
  đi giày. CẤM trừ tim, CẤM hỏi lý do, CẤM in chữ "không an toàn" cạnh tên em; tổng kết chỉ ghi "Động tác hôm nay: bản tại chỗ
  (dép lê)" trong khối "Copy tờ rời".
- NÚT "LỚP MÌNH CHẬT" VÀ TRẦN KHÔNG GIAN 90 ĐỘ: một nút bật một lần, lưu "miti-space", mọi phiên sau giữ nguyên, CẤM hỏi lại
  giữa phiên. Bật thì mọi động tác đòi di chuyển chỗ (né sang bên, lùi, tiến, quay người, đi vòng) thành động tác TẠI CHỖ trong
  vòng 1 sải tay, vẫn giữ biên độ >= 15% tầm với đã calibration để >= 12 nhịp chuyển động mỗi phút và đồng hồ vận động >= 60%
  không đổi — CẤM trừ điểm, CẤM rút số lượt, CẤM hạ trần cường độ vì lớp chật. Trần không gian: thẻ và vật thể AR chỉ bay vào
  hình quạt 90 độ PHÍA TRƯỚC mặt em (mục 4.5 đã cấm xoay thân nhanh quá 90 độ), CẤM mọi chỉ dẫn "lùi lại", "né sang trái/phải"
  trong 12 lượt chơi. Bản không camera mặc định BẬT SẴN nút này.
- BỘ ĐỘNG TÁC CHỐT MỘT LẦN ĐẦU PHIÊN: sau thẻ dẹp chỗ chơi, engine lọc ngân hàng động tác theo giày dép đã chọn và nút chật,
  rồi giữ nguyên bộ đó trọn 12 lượt — CẤM mở rộng bộ động tác giữa phiên, vì một em đang với tay giữa hiệp mà bất ngờ phải lùi
  là cách ngã nhanh nhất. Nút "Xem cách chuyển động" liệt kê đúng bộ đang bật bằng chữ tiếng Việt + hình que, HUD ghi "Vùng
  chơi: tại chỗ" hoặc "Vùng chơi: 1 sải tay" chữ >= 18px. Đổi lựa chọn chỉ có hiệu lực ở PHIÊN kế tiếp.
- NÚT EM MỆT / EM ĐAU LÀ MỘT NÚT, KHÔNG PHẢI MỘT LỜI MỜI: hiện ĐÚNG MỘT chỗ ở góc dưới HUD, >= 56px, không bao giờ mờ, không
  bao giờ bị che, bấm được bằng chuột/chạm ở mọi bản; CẤM biến nó thành nút "Tạm dừng", CẤM mascot bình luận "cố lên". Một cú
  bấm: lượt đang chạy kết thúc bình thường rồi vào thẳng HẠ NHIỆT 45–60 GIÂY, CẤM trừ tim, CẤM trừ điểm, CẤM hỏi lý do, CẤM đòi
  cô giáo xác nhận; ghi "miti-stop" {phút, lượt} và tổng kết in "Em xin nghỉ ở phút <n> — nghỉ đúng lúc cũng là chơi giỏi".
- TỰ KIỂM BẰNG `verifyPlayzone()`: chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — thẻ "Dẹp chỗ chơi" có thật với đúng bốn dòng
  <= 12 từ, chạy trong 60–90 giây khởi động và tối đa 20 giây, không thêm màn hình trước nút "Bắt đầu" · ba lựa chọn giày dép
  và nút "Lớp mình chật" đổi ĐÚNG BỘ ĐỘNG TÁC (0/12 lượt nhấc chân cao khi chân đất / dép lê, không động tác đứng một chân nào,
  vật thể vào hình quạt 90 độ phía trước) và lưu "miti-foot" + "miti-space" · bộ động tác không đổi giữa phiên · nút "Em mệt /
  em đau" >= 56px luôn bấm được và một cú bấm vào thẳng hạ nhiệt 45–60 giây tại ranh giới lượt mà không trừ tim, có ghi
  "miti-stop". Thiếu điều nào thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT. Bản không camera, bản
  một học sinh và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều, vì bàn ghế và quyền nghỉ không phụ thuộc webcam.

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
5.1 NHỚ BÀI CÓ LỊCH (nguồn: `tools/lib/memory.mjs`, validate chặn nếu thiếu)
========================
Mục tiêu của thư viện là "hiểu bài NHỚ BÀI". Các quy định phía trên làm trẻ hiểu trong 5 phút; không có mốc ôn thì sau ba ngày
kiến thức quay về tay giáo viên. Sáu quy định dưới đây biến chữ "lặp lại cách quãng" thành ngày cụ thể đếm được bằng code.

- LỊCH ÔN CÓ MỐC NGÀY: một errorTag sửa đúng 2 lần liên tiếp → xếp ôn lại vào +1 ngày, +3 ngày, +7 ngày (theo ngày của máy);
  lần ôn nào cũng đúng thì giãn mốc kế tiếp thành +21 ngày. Đầu phiên đọc localStorage key "miti-review" (chỉ { id, due } —
  không tên học sinh, không ảnh, không video) và đưa các mục ĐÃ ĐẾN HẠN vào tối đa 4/12 lượt của phiên này, ưu tiên hơn câu mới;
  mục chưa đến hạn không được xen. localStorage bị chặn thì bỏ hẳn phần lịch và vẫn chơi trọn 12 lượt.
- XEN CỤM KIẾN THỨC: trong 12 lượt chính phải có >= 3 lượt thuộc cụm KHÁC cụm chính của game (lấy từ "miti-mastery" hoặc
  QUESTION_DATA cùng khối ở level thấp hơn), đặt xen kẽ chứ không dồn cuối phiên. Trong một cụm vẫn giữ thứ tự dễ → khó, không đảo bước.
- CÂU MỞ MÀN "EM CÒN NHỚ KHÔNG?": TRƯỚC lượt chính thứ nhất, chiếu 10 giây một câu em từng làm đúng ở phiên trước (theo lịch đến hạn,
  không gợi ý, không hiện đáp án); em trả lời bằng cơ chế điều khiển đang dùng hoặc chuột. Đúng → mascot reo và giãn sang mốc kế tiếp.
  Sai → KHÔNG trừ tim, KHÔNG tính là câu sai mới, chỉ xếp mục đó vào lượt 3 kèm lời giải từng bước. Phiên đầu trên máy (không hồ sơ)
  thì bỏ qua bước này, không báo lỗi.
- HỎI LẠI "VÌ SAO ĐÚNG?": ở đúng 4/12 lượt (một lượt mỗi hiệp và mọi lượt ôn), ngay sau cú chốt đúng, hiện câu
  "Vì sao em chọn câu trả lời này?" với 3 phương án trong tối đa 5 giây. Chọn đúng → cộng chuỗi; chọn sai → KHÔNG trừ tim và hiện
  lại một dòng lời giải. Câu này không tính vào 12 lượt, không rút thời gian đọc đề của lượt kế; bản Giảm hiệu ứng và bản không
  camera được bỏ bằng một nút "Thôi" mà không penalty. (Chỉ 4/12 lượt là để không phá nhịp >= 12 nhịp chuyển động mỗi phút ở 4.5.)
- QUÊN THÌ KHÔNG PHẠT: mục từng đúng >= 2 lần mà sai khi ôn lại → không trừ tim, không cắt chuỗi, chỉ hạ lịch về mốc ngắn nhất
  (+1 ngày) và ghi một dòng vào hồ sơ. Tổng kết thay vì điểm số hiện "Hôm nay em vẫn nhớ: ..." (tối đa 3 id ôn đúng) và
  "Cần ôn lại: ..." (tối đa 3 id đến hạn nhưng sai), kèm đúng một câu động viên có nội dung cụ thể, không phải chữ "Cố lên".
- TỜ RỜI CHO GIÁO VIÊN: màn tổng kết có nút "Copy tờ rời" sinh khối chữ tiếng Việt copy được — tên game, ba errorTag yếu nhất,
  số ngày từ lần chơi gần nhất, lịch ôn sắp tới (ngày + số câu), một đề xuất hành động kiểu "trước ngày 7/10 cho em ôn lại 3 lỗi
  thiếu mượn bằng 5 phút tại chỗ", và số động tác + phút vận động của phiên. Tờ rời chỉ hiện trên màn hình và vào clipboard máy đó,
  không gửi lên máy chủ nào, không chứa tên hay ảnh học sinh — dùng chung nguyên tắc riêng tư với bản nghiệm thu.

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

6.1 HỒ SƠ TIẾN BỘ XUYÊN PHIÊN (nguồn: `tools/lib/classroom.mjs`, validate chặn nếu thiếu — mỗi lần chơi phải kế thừa lần trước, không bắt đầu lại từ số 0)
- Lưu vào localStorage key "miti-mastery" một bản ghi nhỏ theo từng cụm kiến thức: số lần gặp, số lần đúng,
  errorTag sai nhiều nhất, số lần đúng liên tiếp, ngày chơi gần nhất. KHÔNG lưu ảnh, video hay dữ liệu cá nhân.
- Khi mở game, đọc hồ sơ trước rồi xếp câu theo ưu tiên: errorTag em sai nhiều nhất lên trước (lặp lại cách quãng),
  câu đã đúng 3 lần liên tiếp thì giãn ra. Câu mới vẫn phải xuất hiện để không kẹt ở lỗi cũ.
- Màn tổng kết so với lần chơi trước bằng đúng một câu: "Em đã sửa được lỗi ... so với lần trước"
  hoặc "Lần này em gặp ... lần, đúng ... lần". Không dùng chữ "kém hơn bạn".
- localStorage bị chặn (mở file trực tiếp ở một số trình duyệt, chế độ ẩn danh) hoặc hồ sơ hỏng thì bắt đầu lại
  từ hồ sơ trống, game vẫn chạy trọn vẹn — không báo lỗi, không chặn vào vòng chơi.

========================
6.2 TỰ KIỂM CHỨNG NGÂN HÀNG CÂU HỎI (nguồn: `tools/lib/verify.mjs`, validate chặn nếu thiếu — game không được âm thầm dạy sai)
========================
Nguồn: `tools/lib/verify.mjs` (khối `VERIFY`), validate chặn nếu thiếu. Một mô hình sinh 30–60 mục chắc chắn
vài mục lỗi; nếu chỉ viết "mỗi mục một đáp án đúng duy nhất" thì không gì đảm bảo. Engine phải tự kiểm đề của chính nó:
- `verifyQuestionBank()` chạy MỘT LẦN trước vòng chơi đầu tiên: `answer` có trong `choices` và chỉ xuất hiện đúng một lần;
  `explanation` / `errorTag` / `loiViet` khác rỗng; `errorTag` thuộc đúng danh sách đã khai báo; không hai mục trùng `prompt`;
  `level` chỉ nhận 1/2/3 và mỗi level chiếm tối thiểu 1/4 số mục; `dang` chỉ nhận "nhin"/"tinh", mục "tinh" có tối đa một dấu phép tính, đề không quá 16 từ. Mục trượt bị LOẠI KHỎI vòng chơi + `console.warn` nêu id và lý do.
- Mỗi phương án nhiễu phải sai theo MỘT LỖI THẬT trong danh sách lỗi. Thử từng nhiễu: "nói theo cách hiểu hợp lý nào
  thì phương án này đúng?" — nếu có thì thay phương án khác. Hai đáp án cùng đúng làm lời giải thành vô nghĩa.
- Guard phạm vi: số trong phạm vi SGK đã khai báo, không số âm ngoài phạm vi đã học, không chia cho 0, kết quả hữu hạn;
  game Tiếng Anh thì mọi từ phải có trong word list đã khai báo. Viết thành điều kiện kiểm thật, không chỉ ghi comment.
- Chống đoán mò bằng CẤU TRÚC (rule 60/40 chỉ chống vung bừa, không chống được mẹo chọn đáp án): đáp án đúng không được
  là số lớn nhất/nhỏ nhất ở quá 20% số mục, không được là phương án dài nhất ở quá 20%, không lặp nguyên văn cụm từ hiếm
  trong đề; vị trí đúng phân bố đều mỗi chỗ 1/3 số mục ± 10%, đếm được bằng chính hàm seed đã dùng để xáo.
- Level là bậc thang độ TINH VI của nhịp nhìn, không phải số phép tính: 1 = nhìn là chọn; 2 = nhìn kỹ một nhịp rồi loại trừ;
  3 = ước lượng trong khoảng hoặc so hai mốc — mọi level vẫn chỉ MỘT thao tác. Muốn khó hơn thì kéo hai phương án lại gần nhau,
  không phải ghép thêm phép tính (cả 6 luật "nhẹ đầu" ở mục 6.3 bên dưới).

========================
6.3 NHẸ ĐẦU — TOÁN HÌNH DUNG THAY VÌ TÍNH NẶNG (nguồn: `tools/lib/light.mjs`, validate chặn nếu thiếu) — phần quyết định trẻ đang CHƠI hay đang làm kiểm tra
========================
Nguồn: `tools/lib/light.mjs` (khối `LIGHT`), validate chặn nếu thiếu. Chín vòng cộng quy định đã đẩy cả 85 prompt
về phía "đưa bài toán rồi tính toán thi đấu": hợp đồng sinh đề buộc level 2 hai bước, level 3 ba bước trở lên,
điểm +10 chỉ gắn vào đáp án đúng, và không một con số nào trần độ dài đề (trung bình 10,4 từ nhưng có câu tới 21 từ).
Trẻ cắm đầu tính nhẩm thì mascot, combo, bài thể dục và thế giới AR phía sau chỉ còn là phông nền của một bài kiểm tra.
Lớp này chuyển gánh nặng từ **đầu tính** sang **mắt nhìn và người vận động**, và gắn nó vào con số kiểm được bằng code.
- **Một lượt một thao tác tư duy**: mục `dang: "tinh"` chỉ có tối đa MỘT dấu phép tính nằm giữa hai khoảng trắng (+ − × :),
  `verifyQuestionBank()` đếm và loại mục hai dấu. Kỹ năng cần nhiều bước thì engine dựng sẵn các bước trước — cột dọc đã viết
  một dòng, sơ đồ đã chia ô, đơn vị đã đổi — trẻ chỉ làm bước cuối.
- **>= 60% số mục là `dang: "nhin"`**: nhìn–chỉ–chọn (so độ dài, nhận dạng hình, ước lượng, đếm ô, đọc biểu đồ / tia số / đồng hồ,
  ghép hình). Dưới ngưỡng thì bảng kiểm ghi CHƯA ĐẠT kèm tỉ lệ thật: ngân hàng đó quá nặng tính nhẩm.
- **Đề <= 16 từ, một mệnh đề**, cấm "sau đó / rồi / biết rằng"; mỗi lượt đọc to đề bằng `speechSynthesis` kèm nút "Nghe lại đề".
- **Thưởng đến từ động tác**: một lượt tối đa +9, trong đó +6 cho ĐỘNG TÁC (đi hết >= 50% tầm với, chạm một vùng đích hợp lệ)
  và +3 cho đáp án đúng; chuỗi / thẻ vàng / hiệp 3 nhân trên tổng đó. Particle và hit-stop nổ tại điểm chạm TRƯỚC khi máy biết
  đúng hay sai. Không cộng điểm cho tốc độ đọc đề hay tốc độ tính.
- **Không đồng hồ nào đuổi theo câu hỏi**: thẻ nằm im tới khi em chốt; đếm ngược chỉ ở khởi động, hạ nhiệt, trạm nghỉ,
  mở thưởng và mini-trạm vận động. Đứng im 15 giây thì mascot làm mẫu + đọc lại đề, không trừ tim, không tự sang câu.
- **Trạm nghỉ 5 giây là một mini-trạm chơi** không hỏi bài (đập 3 bong bóng, giữ thăng bằng, lắc vai theo nhịp): không trừ tim,
  không tính vào 12 lượt, không đổi level, hoàn thành thì +5 điểm động tác. Đây là chỗ trẻ được hét lên.


========================
7. GIAO DIỆN
========================
- Màn hình Bắt đầu; hướng dẫn bằng icon + 1 câu ngắn; HUD gồm nhiệm vụ + điểm + chuỗi đúng + tiến độ + trạng thái camera.
- Vùng chơi lớn, chữ lớn (đề bài ≥ 28px trên desktop, ≥ 20px trên điện thoại), tương phản tốt, responsive dọc/ngang.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động, và nút "Chỉnh lại tư thế" (calibration lại 3 giây, không mất điểm và lượt).
- Game tự Pause khi tab ẩn hoặc mất tiêu điểm (mục 4.2); nút Tiếp tục to, một cái là đi tiếp được.
- Màn kết quả: số câu, đúng/sai, theo nhóm lỗi, kỹ năng cần luyện, nút Chơi lại và nút Chơi màn khác nếu có.
- Không leaderboard, không quảng cáo, không theo dõi người dùng.

7.1 CHẾ ĐỘ HAI HỌC SINH (lớp đông: một máy, một khung hình, hai em cùng chơi)
- Nút bật/tắt ở màn Bắt đầu, mặc định là một người chơi.
- Bật chế độ này thì HandLandmarker chạy maxNumHands: 2; chia khung hình thành hai nửa theo trục dọc
  và đánh dấu nửa của từng em bằng viền màu riêng + tên "Em bên trái" / "Em bên phải".
- Mỗi bàn tay chỉ chốt được đáp án nằm trong nửa của mình: gán tay theo vai (landmark 11/12) nếu có PoseLandmarker,
  không có pose thì gán theo tay trái/tay phải; tay vượt sang nửa kia thì không fire event.
- Điểm, tim và chuỗi đúng của hai em TÁCH RIÊNG, không cộng gộp, không hiển thị bảng so sánh.
- Đề bài hiện chung ở giữa nhưng mỗi em có lượt riêng; em chốt trước được cộng chuỗi, em kia vẫn còn đủ thời gian trả lời.
- Không xếp hạng, không trừ điểm vì chậm hơn bạn; màn tổng kết của chế độ này vẫn là ba thẻ cho TỪNG em.

7.2 BỐN EM MỘT MÁY: VAI CHỜ CÓ VẬN ĐỘNG (bắt buộc — nguồn: `tools/lib/queue.mjs`, validate chặn nếu thiếu) — phần quyết định ba em chưa tới lượt có phải đứng xem không

Mục 7.1 giải quyết hai em CÙNG chơi. Khảo sát 85 prompt trước vòng 15: "bốn em" = 85/85 nhưng "cổ vũ" 0/85,
"trọng tài" 0/85, "thư ký" 0/85, "đến lượt" 0/85 — mọi prompt đều biết một máy có bốn em đứng quanh, còn không
prompt nào nói ba em kia làm gì. Một tiết 45 phút chia bốn nhóm thì mỗi em chạm máy khoảng 4 phút, ba em còn lại
đứng xem: đúng điều mục tiêu thể dục cấm. Sáu quy định dưới đây biến thời gian chờ thành thời gian vận động.

- BỐN VAI, MỖI VAI CÓ ĐỘNG TÁC: một em cầm máy; vai "Cổ vũ" giữ nhịp vỗ tay hoặc dậm chân theo vạch nhịp, mỗi lần
  đủ 8 nhịp; vai "Trọng tài" giơ thẻ "Động tác to / nhỏ" ngang vai ngay sau cú chốt của bạn (em tự giơ là đủ, game
  không cần nhận diện thẻ); vai "Thư ký" đọc to lại đề bài VÀ đáp án đúng cùng lúc `speechSynthesis` chạy — chỗ luyện
  phát âm tốt nhất của game Tiếng Anh. Tên vai kèm tên em hiện trên HUD. CẤM để một em làm "người xem" không có việc;
  chỉ hai em thì bỏ vai Thư ký; chỉ một em thì ẩn hẳn HUD vai chờ chứ không để ô trống, game vẫn chơi trọn 12 lượt.
- XOAY VÒNG CỨNG 3 LƯỢT/EM: 12 lượt chính chia đều cho số em đang chơi (bốn em là 3 lượt mỗi em). Bộ đếm
  `currentPlayer` quyết định ai cầm máy, HUD ghi "Lượt của em: <tên> · <n>/3" và đổi vai ngay khi em đó đủ 3 lượt —
  hết lượt thì sang vai Cổ vũ ở hiệp sau. Một em chơi quá 6 trên 12 lượt là lỗi cân bằng, không phải "em đó nhanh
  hơn". Nút "Đổi người chơi" cho giáo viên bấm bất cứ lúc nào: đổi vai tức thì, không trừ tim, không hỏi lý do.
- TRẦN ĐỨNG CHỜ 20 GIÂY: mỗi vai không cầm máy có đồng hồ chờ riêng (không phải đồng hồ lượt chơi). Tới 15 giây,
  mascot gọi ĐÚNG TÊN em đang chờ kèm một động tác 5 giây làm mẫu tại chỗ (hai tay lên cao rồi hạ / khuỵu gối /
  xoay hông, chọn theo hiệp đang chạy), hiện ở dải dưới HUD chứ không che đề bài. Tới 20 giây mà em vẫn đứng im thì
  động tác đó tự bật thành nhiệm vụ "Cả nhóm cùng làm 5 giây" và +5 điểm cho thanh "Cả nhóm". Đồng hồ vận động AR
  vẫn chỉ đo em cầm máy; ba em vai chờ đếm bằng số nhịp cổ vũ, số thẻ giơ, số lần đọc lại và ghi ở dòng "Bốn em
  hôm nay", KHÔNG nhập vào đồng hồ AR để tránh số ảo.
- GIÃN CÁCH 1 SẢI TAY: màn "Định vị" yêu cầu mỗi em đứng trong một vòng tròn 1 sải tay tính từ vai mình, máy đặt
  cách em đang chơi >= 1,2 m, hai em vai chờ đứng SAU vạch vai chứ không sát hông bạn đang chơi. Camera không thấy
  hết bốn em là chuyện bình thường và KHÔNG được báo lỗi — chỉ em đang chơi cần vào khung hình. Trước mỗi lần đổi
  người có 20 giây "vào vị trí" đếm 3-2-1 theo nhịp nhạc, trong lúc đó không thẻ nào rơi. Cấm mọi nhiệm vụ đòi hai
  em chạm tay nhau, đổi chỗ cho nhau hoặc đi chéo qua vùng đang chơi khi thẻ còn đang bay.
- ĐIỂM VAI CHỜ VÀO "CẢ NHÓM": mỗi lần Trọng tài giơ thẻ đúng lúc, Thư ký đọc lại đúng đáp án, hoặc Cổ vũ giữ đủ
  8 nhịp thì +5 điểm động tác cho thanh "Cả nhóm <x>/<mốc>" đã có sẵn; điểm này KHÔNG cộng vào "miti-best", KHÔNG
  đổi thứ hạng của em đang chơi và không trừ khi em làm sai. Màn tổng kết in thêm một dòng "Bốn em hôm nay: <tên>
  <n> động tác, <tên> <n> nhịp cổ vũ" cho giáo viên, nằm trong khối chữ mà nút "Copy tờ rời" copy được.
- TỰ KIỂM BẰNG `verifyQueue()`: chạy MỘT LẦN lúc nạp, kiểm đúng bốn điều — ba vai chờ có thật kèm nhãn tên trên HUD;
  đồng hồ chờ chạy riêng và gọi tên em ở giây 15; bộ đếm "Lượt của em <n>/3" tăng đúng và đổi vai sau 3 lượt; điểm
  vai chờ chỉ vào thanh "Cả nhóm". Thiếu thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT
  kèm câu nên sửa gì trong prompt. Bản một học sinh: verifyQueue() bỏ qua hai mục vai chờ và đồng hồ chờ thay vì
  báo lỗi giả, vẫn bắt buộc kiểm bộ đếm lượt.
- Biến thể VOICE (Web Speech API chỉ có một micro) không dùng chế độ hai người; hiện dòng giải thích tiếng Việt khi em bấm vào.

========================
8. ÂM THANH + HIỆU ỨNG HÌNH ẢNH
========================
- Âm thanh tổng hợp bằng Web Audio API (resume AudioContext sau cú bấm đầu tiên). KHÔNG dùng Tone.js, không dùng file mp3 ngoài.
- Bật audio sau thao tác bấm của người dùng (AudioContext resume).
- Âm thanh phân biệt rõ: đúng (in âm vui), sai (cảnh báo nhẹ, không gây sợ), hết máu, hoàn thành màn.
- Hiệu ứng AR-arcade (chọn theo mechanic, vẽ trên canvas tại tọa độ toScreen): hạt nổ + shockwave tại điểm chạm,
  vệt kiếm neon bám theo tay, kính vỡ mạng nhện phủ khắp khung hình khi sai, viền neon phát sáng khi combo cao,
  viền mép đỏ mờ dần 200–300 ms khi mất máu (không giật sáng cả khung hình), xu/điểm bay lên, đường tốc độ hai bên mép.
  Mọi hiệu ứng tôn trọng tùy chọn Giảm hiệu ứng và trần nhấp nháy ở mục 9.1.
- Hiệu ứng không được che kiến thức: khi DỪNG 2 giây để giải thích thì dừng spawn vật thể và làm mờ/giảm hạt nổ,
  lời giải phải đọc được trọn vẹn.
- Game Tiếng Anh: dùng window.speechSynthesis đọc từ/câu bằng giọng en-US hoặc en-GB, có nút phát lại.

8.1 CẢM GIÁC ARCADE (juice — nguồn: `tools/lib/feel.mjs`, validate chặn nếu thiếu) — phần quyết định trẻ thấy "vui" hay "làm bài tập có nền camera"
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

8.2 THI ĐUA + CAO TRÀO (nguồn: `tools/lib/hype.mjs`, validate chặn nếu thiếu) — phần quyết định trẻ có CHỜ ĐỢI được chơi lần nữa

Juice ở 8.1 làm mỗi cú chạm đã mắt, nhưng một game cú chạm đẹp vẫn nhàm sau phút thứ hai nếu không có
gì để chờ: không mốc để phá, không hiệp căng hơn, không khoảnh khắc mở thưởng. Sáu quy định dưới đây ở
nguồn `tools/lib/hype.mjs`. Nguyên tắc xuyên suốt: thi đua với CHÍNH MÌNH hoặc với ĐÍCH CHUNG, không bao giờ
xếp hạng bạn ngồi cạnh (đây là lý do mục 7 cấm leaderboard và hai người chơi không so điểm nhau).

- CÚ "Ồ" BA GIÂY ĐẦU: ngay khi vào gameplay (chưa vào lượt 1), một vật thể AR cỡ lớn bay ngang sát phía trước
  người chơi kèm vệt neon và tiếng "vút", mascot chào bằng đúng một dòng nhiệm vụ, chữ nhiệm vụ >= 44px.
  Không mở màn bằng màn chữ dài hay bảng hướng dẫn; hướng dẫn nằm ở nút "Xem cách chuyển động".
  Bản không camera dùng vệt sáng trên nền tối; bản Giảm hiệu ứng cho vật thể trượt tới chậm và không giật màn hình.
- KỶ LỤC CỦA CHÍNH EM: localStorage key "miti-best" lưu đúng ba số { điểm cao nhất, chuỗi đúng dài nhất, ngày } —
  không tên, không ảnh, không nội dung câu hỏi; chế độ hai học sinh tính riêng từng nửa màn hình. Từ hiệp 2 HUD có dòng
  nhỏ "Kỷ lục: <n> · Em đang: <m>"; khi vượt thì nổ ĐÚNG MỘT lần "PHÁ KỶ LỤC!" 1,2 giây + âm riêng + một thẻ bộ sưu tập;
  tổng kết viết "Em hơn bản thân lần trước: +<x> điểm". Chưa có "miti-best" thì ẩn hẳn dòng kỷ lục, không hiện số 0.
- VỆT CỦA EM (ghost): lượt đầu mỗi hiệp, một dải sáng hình người cách điệu (alpha <= 0.35, KHÔNG phải ảnh/video người chơi)
  chạy trước đúng nhịp lượt tốt nhất phiên trước (lưu { giây, combo } trong "miti-best"); về trước vệt thì +5 điểm và chữ
  "NHANH HƠN EM HÔM QUA!". Không có dữ liệu thì bỏ vệt, không hiện chữ "thua"/"chậm hơn". Giảm hiệu ứng thay vệt bằng
  con số ("Mốc của em: 3,2 giây").
- HIỆP QUYẾT ĐỊNH: ba hiệp leo thang thật — hiệp 1 nền tĩnh, thẻ 4,5 giây; hiệp 2 viền HUD sáng theo combo, thẻ 3,75 giây;
  hiệp 3 nhãn "HIỆP QUYẾT ĐỊNH": điểm nhân đôi, thêm đúng 1 thẻ vàng, mascot hô mở hiệp, âm nền nhanh hơn (dưới trần 3 lần/giây).
  Mỗi hiệp vẫn 4 lượt, vẫn trạm nghỉ 5 giây, ngân hàng câu hỏi và level KHÔNG đổi theo hiệp; sai ở hiệp 3 không phạt nặng hơn hiệp 1.
- NGHI THỨC MỞ THƯỞNG: cuối mỗi hiệp 2,5 giây mở phong bao — ba nhịp quay qua đúng ba phương án (thẻ bộ sưu tập / +10 điểm / quyền
  chọn câu dễ hơn một bậc) rồi dừng, kèm tiếng "tách". Phần thưởng luôn có, không bao giờ "trắng", và KHÔNG đổi level thích ứng đang chạy
  (quyền chọn câu dễ hơn chỉ áp dụng cho đúng một lượt). Giảm hiệu ứng và bản không camera mở ngay bằng chữ + nút "Nhận".
- ĐÍCH CHUNG CỦA NHÓM: cột "Cả nhóm: <x>/<mốc> câu đúng" (mốc mặc định 40, người lớn đổi trong khoảng 20–60) ở dải dưới, tăng theo
  mỗi lượt đúng của bất kỳ em nào trên máy; chạm mốc thì cả màn ăn mừng 3 giây và mở một thẻ CHUNG. Cột chỉ hiện tổng số câu đúng,
  không hiện điểm từng em cạnh nhau, không tên, không hạng nhất — đích chung, không phải bảng xếp hạng.

8.3 HAM QUAY LẠI (nguồn: `tools/lib/anticipation.mjs`, validate chặn nếu thiếu) — phần quyết định trẻ có BẤM Chơi lại vào ngày hôm sau

8.1 làm cú chạm đã mắt, 8.2 làm một phiên chơi có cao trào; cả hai đều khép lại khi màn tổng kết hiện ra. Khảo sát
85 prompt: "hẹn gặp lại / ngày mai" = 0, "khiên / bảo vệ chuỗi" = 0, "phần thưởng để dành" = 0, "ô chưa mở trong bộ sưu tập" = 0,
"nghi thức lưu tiến trình" = 0. Trẻ lớp 4–5 quay lại vì hai thứ rất cụ thể: cảm giác mình SẮP chạm một mốc, và cảm giác có
thứ đang chờ mình. Nguồn `tools/lib/anticipation.mjs`. Cấm tuyệt đối: chuỗi ngày chơi, quyền thông báo, và mọi hình phạt cho việc nghỉ.

- BÁO SẮP TỚI MỐC: còn đúng 1 câu nữa là chạm mốc 10 / 20 / 30 câu đúng của phiên thì HUD hiện dòng "Còn 1 câu nữa tới mốc <m>
  — lượt kế nhân đôi điểm" trong 1,5 giây rồi tự ẩn; cột đích chung ghi "Cả nhóm còn <k> câu tới mốc <m>" chứ không phải một
  thanh tiến độ im lặng. Mọi số đếm từ câu đúng thật, không hứa thưởng ảo, không chớp quá 3 lần mỗi giây.
- KHIÊN CHUỖI ĐỂ DÀNH ("miti-tokens"): mỗi chuỗi đúng 5 câu phát 1 khiên, tích tối đa 2, lưu chỉ { khien, quyen_chon, ngay }.
  Sai khi còn khiên: khiên vỡ, chuỗi ĐÚNG không bị cắt nhưng vẫn trừ 1 tim, vẫn dừng 2 giây hiện lời giải, vẫn vào hàng đợi
  luyện lại và vẫn tính vào sàn chống nản. Quyền "chọn câu dễ hơn một bậc" của nghi thức mở thưởng cũng để dành sang phiên sau.
  Khiên là phần thưởng, không phải mạng thứ hai — hết 5 tim vẫn thua như cũ.
- KẾT THÚC HÉ MỞ: màn tổng kết hiện đúng MỘT dòng "Chương tiếp theo: <tên chương>" nối vào kết quả phiên này (thí dụ "Chương 3 mở
  khi em sửa xong 2 lỗi: <loiViet>, <loiViet>") kèm nút "Xem trước" chiếu 6 giây một vật thể AR của chương sau, không cho chơi, không
  tính điểm. Cấm đe dọa "không chơi lại là mất hết".
- HẸN LẦN SAU BẰNG SỐ CÂU THẬT: một dòng "Lần sau em quay lại sẽ có <n> câu đang chờ", <n> đếm từ "miti-review" (mục đến hạn trong
  7 ngày tới, trần 4). <n> = 0 thì "Chưa có câu nào chờ em — chơi thêm game khác để dành thẻ". Không xin quyền thông báo, không gửi
  đi đâu, không đếm chuỗi ngày, không hiện "em đã nghỉ X ngày".
- CHỖ TRỐNG GỌI TÊN: màn "Sưu tập của em" vẽ lưới 6 ô mỗi bộ chủ đề; ô chưa mở hiện khung nét đứt và "? ? ?" (không để đoán hình),
  kèm đúng một dòng "Bộ <chủ đề> còn thiếu <k> thẻ — thắng hiệp 3 ở các game cùng chủ đề để đủ bộ". <k> tính từ "miti-collection"
  của chính máy này, không so bộ sưu tập giữa các em.
- NGHI THỨC LƯU PHIÊN: bấm "Kết thúc" thì mascot cất thành tích trong 3 giây và hiện "Đã lưu: <điểm cao nhất>, chuỗi dài nhất <x>,
  <k> thẻ mới"; nút "Tắt máy" chỉ sáng sau dòng đó. localStorage bị chặn thì mascot nói "Máy này không giữ được tiến trình, em chơi
  tiếp từ đầu nhé" và mọi dòng kỷ lục ẩn hẳn, không hiện số 0. Giảm hiệu ứng rút còn 1 giây bằng chữ, không bỏ bước lưu.

8.4 KHOẢNH KHẮC ĂN MỪNG + HỢP ĐỒNG ÂM THANH (nguồn: `tools/lib/celebrate.mjs`, validate chặn nếu thiếu) — phần quyết định trẻ có HÉT LÊN được không, và game có chịu nổi loa của một lớp bốn em

8.1 làm cú chạm có lực, 8.2 tạo mốc để chờ; đo 85 prompt thì khoảng giữa vẫn trống: confetti/pháo giấy 0/85,
slow-motion 0/85, trần độ dài một SFX 0/85, quy định "không phát tiếng trước cú bấm đầu" 0/85, phản hồi rung 0/85.
Tới mốc mà chỉ một con số đổi màu thì mốc không có giá trị; và hai tai nạn thật của file Canvas là AudioContext bị
trình duyệt chặn (game câm từ đầu đến cuối) hoặc một tiếng "ting" 1 giây lặp 60 lần mỗi phút trong lớp đông.
Sáu quy định dưới đây ở nguồn `tools/lib/celebrate.mjs`, mọi con số đều kiểm được lúc chạy.

- PHÁO GIẤY CHỈ Ở MỐC: đúng bốn sự kiện được nổ — chạm đích chung của nhóm, "PHÁ KỶ LỤC!", mở thưởng cuối hiệp 3,
  xong mini-trạm nghỉ. Đợt pháo 40–60 hạt, sinh qua `toScreen()` tại điểm chạm cuối, xoay 1–3 vòng, rơi 1,2–1,8 giây rồi
  biến mất hẳn. CẤM nổ mỗi câu đúng (câu đúng đã có particle của 8.1); trần một đợt mỗi 3 giây theo mục 9.1;
  Giảm hiệu ứng chuyển pháo thành dải băng tĩnh + chữ "CHÀO!" to dần, không chớp.
- HỢP ĐỒNG ÂM THANH: AudioContext chỉ resume SAU cú bấm "Bắt đầu" — không một tiếng động nào trước đó, kể cả tiếng nền;
  mỗi SFX dài tối đa 200 ms; master gain <= 0.25; tối đa 4 giọng SFX đồng thời — nhạc nền nếu có chạy trên bus riêng
  với tối đa 3 giọng, tổng không quá 7 giọng (mục 8.6) — giọng cũ mờ dần trong 60 ms thay vì cắt khớp;
  có nút "Tắt tiếng" lưu trong "miti-mute". Cấm loop rít, cấm âm báo lặp mỗi khung hình, câu sai dùng tiếng "bụp" trầm chứ
  không phải tiếng báo động. Tắt tiếng rồi thì mọi phản hồi vẫn phải đọc được bằng chữ + hình. Game Tiếng Anh:
  `window.speechSynthesis` đi qua MỘT hàng đợi duy nhất, không phát đồng thời với SFX.
- VIÊN ĐẠN THỜI GIAN: chỉ đúng hai khoảnh khắc được chậm — thẻ vàng vừa xuất hiện và 1,5 giây cuối "HIỆP QUYẾT ĐỊNH".
  Tốc độ thẻ còn 0,45× trong 600 ms, cao độ rơi một quãng tám, viền tối dần 15% rồi trả lại; mascot, hạt, HUD giữ nguyên nhịp.
  Slow-mo chỉ kéo DÀI thời gian thẻ bay, không rút thời gian đọc đề, không tính lại nhịp thẻ 3,0–4,5 giây của mục 4.5,
  và cấm chạy khi engine đang dừng 2 giây hiện lời giải. Giảm hiệu ứng bỏ hẳn slow-mo, chỉ đổi màu viền.
- RUNG CÓ KIỂM SOÁT: `navigator.vibrate(20)` khi chốt đúng, 60 ms khi vỡ chuỗi, 100 ms khi chạm đích chung hoặc phá kỷ lục —
  tất cả bọc trong `if (navigator.vibrate)` để máy không hỗ trợ vẫn chạy, không tải plugin. Cấm rung liên tục hoặc rung theo
  khung hình; tắt rung khi Giảm hiệu ứng hoặc "miti-mute" đang bật; desktop bỏ qua im lặng, không báo lỗi.
- HÀI HÌNH THỂ 3 GIÂY: mỗi hiệp mascot có đúng một màn lố khi chuỗi đạt 3 (trượt vỏ chuối số rồi lộn vòng, đội ngược mũ,
  nhảy hụt nhịp cuối, hoa mắt khi thẻ vàng bay qua). Diễn ở nửa dưới màn hình, không che người chơi và không che chữ đề,
  tối đa 3 giây, không chớp sáng, không đổi màu cả khung hình, không chậm nhịp thẻ. Chuỗi đứt thì một nét mặt đỡ 1 giây
  (ngáp, chống cằm, xoa mắt) — hài nhưng không chế giễu học sinh.
- CHO CẢ LỚP HÔ CÙNG: trước hiệp 3, mascot đếm to "Cả lớp: 3 – 2 – 1 – CHỐT!" trong 4 giây, chữ đếm hiện từng nhịp >= 60px
  ở nửa dưới, khuyến khích bốn em đứng cạnh máy cùng hô và cùng làm một động tác mở màn (hai tay lên cao rồi hạ xuống).
  Không tính điểm, không trừ tim, không cần nhận diện được ai, không so ai hô to hơn ai. Đây là chỗ duy nhất game chủ động
  xin lớp ầm lên — mọi mục khác vẫn chịu trần âm lượng của hợp đồng âm thanh.

========================
8.5 BẢN SẮC RIÊNG CỦA TỪNG GAME (nguồn: `tools/lib/identity.mjs`, validate chặn nếu thiếu) — phần quyết định em có nói được "con chơi game Bống" chứ không phải "con chơi game số"
========================

8.1–8.4 làm mọi game giống nhau theo một chuẩn tốt; đo 85 prompt thì chuẩn đó có giá nhưng bản sắc thì không:
chỉ 1277/13692 dòng nội dung (9%) là riêng của từng game — trung bình 15 dòng riêng trên 161 dòng, còn mascot
có tên riêng 0/85, bảng màu riêng 0/85, khoảnh khắc cao trào riêng 0/85. Một lớp mở hai game liên tiếp sẽ thấy
cùng một con mascot vô danh, cùng một màu, cùng một màn pháo — không có gì để nhớ và để đòi chơi lại. Sáu quy
định dưới đây không thêm luật chơi; nó buộc mỗi game chứng minh mình khác 84 game kia bằng thứ đếm được.

- MASCOT CÓ TÊN, TỐI ĐA 2 TỪ: tên riêng lấy từ bối cảnh của chính game (nhà máy, đường đua, bếp, chợ, hang đá)
  và xuất hiện ở >= 5 chỗ: lời chào màn Bắt đầu, nhãn cạnh nhân vật trên HUD, mỗi câu thoại, tên mini-trạm nghỉ,
  màn tổng kết. CẤM gọi chung "bạn MiTi" hay "trợ lý" ở mọi nơi — MiTi là thương hiệu, mascot là nhân vật của
  riêng game này; một tên dùng cho 85 game thì coi như không có tên.
- BẢNG BA MÀU RIÊNG: khai một lần trong `:root` — `--miti-1` cho vật thể AR chính, `--miti-2` cho particle và viền
  hit, `--miti-3` cho điểm nhấn HUD (thẻ vàng, thanh đích chung). 85 bộ ba phải khác nhau và hai game cùng cụm
  kiến thức phải có `--miti-1` cách nhau >= 60/441 theo khoảng cách RGB. Chữ vẫn chịu tương phản >= 4.5:1 của 9.1;
  màu riêng không được làm chữ khó đọc.
- MỘT KHOẢNH KHẮC CHỮ KÝ: đúng MỘT hiệu ứng cao trào không có ở 84 game còn lại, 1 lần/phiên (thêm tối đa 1 lần ở
  nghi thức mở thưởng hiệp 3), dài >= 2 giây, không đổi luật chơi, không cộng điểm, không che đề bài, không nhấp
  nháy quá 3 lần/giây. Nó phải bật ra từ cơ chế của chính game — đường đua đổ vạch đích, bếp bùng lửa, hang đá ngân
  nhũ — chứ không phải một màn pháo chung chung.
- MỘT ĐẠO CỤ AR NEO VÀO NGƯỜI CHƠI: cờ đích sau vai, chiếc rổ trước ngực, ống nhòm trước mắt, thanh cân ngang thắt
  lưng — vẽ bằng `toScreen()` + một điểm neo khớp xương, đổi hình theo `--miti-1`, phản ứng theo chuỗi đúng / vỡ
  chuỗi / tới mốc. Bản không camera thì đạo cụ đứng yên ở góc HUD dưới chứ không biến mất; Giảm hiệu ứng bỏ đung
  đưa, giữ nguyên hình. Cấm đạo cụ che mặt, che chữ đề hoặc che vùng tay đang chấm điểm.
- BA CÂU THOẠI RIÊNG, MỖI CÂU <= 6 TỪ: một câu khen khi chốt đúng, một câu đỡ khi trả lời sai (không chế giễu), một
  câu hô mở đầu trước hiệp 1, đọc bằng `window.speechSynthesis` giọng vi-VN. Không câu nào lặp nguyên văn ở game
  khác, không một câu khen dùng cho 85 game, không quá 3 câu thoại mỗi phút (theo hợp đồng âm thanh 8.4); câu khen
  và câu đỡ vẫn hiện bằng chữ để bản tắt tiếng vẫn đọc được.
- TỰ KIỂM BẰNG `verifyIdentity()`: năm thành phần (tên mascot, bộ ba màu, chữ ký, đạo cụ, ba câu thoại) khai trong
  `const IDENTITY_DATA` đặt ở ĐẦU khối `<script>` trước engine; hàm chạy MỘT LẦN lúc nạp kiểm tên <= 2 từ, ba mã hex
  đúng dạng `#RRGGBB`, mỗi câu thoại <= 6 từ, đúng một chữ ký, đúng một đạo cụ có điểm neo, không trường nào rỗng.
  Trường thiếu thì `console.warn` bằng tiếng Việt, game vẫn chơi nhưng bảng kiểm ghi CHƯA ĐẠT ở mục bản sắc.

========================
8.6 NHẠC NỀN THEO NHỊP (nguồn: `tools/lib/rhythm.mjs`, validate chặn nếu thiếu) — phần quyết định em VẬN ĐỘNG THEO tiếng hay chỉ đứng nhìn màn hình
========================

8.4 đặt trần cho âm thanh, và cả sáu quy định ở đó đều là điều CẤM — cần thiết để file Canvas không hành xác một
lớp bốn em. Khảo sát 85 prompt trước vòng 14 đếm được "nhạc nền" 0/85, "giai điệu" 0/85, "BPM" 0/85, "theo nhịp"
0/85: giữa hai thẻ câu hỏi game chỉ im lặng rồi "ting". Trẻ lớp 4–5 bắt nhịp bằng tai — một nhịp trống đều khiến
em khuỳnh tay đúng nhịp và hết hiệp nhớ mình vừa chơi gì, còn im lặng thì em đứng chờ màn hình. Sáu quy định dưới
đây ở nguồn `tools/lib/rhythm.mjs`; ràng buộc cứng là không file âm thanh ngoài, đầu ra vẫn phải là MỘT file HTML.

- NHẠC CÓ NHỊP THẬT, TỰ TỔNG HỢP: loop bốn nhịp một ô (kick + bass + hat + một lớp giai điệu) dựng bằng Web Audio
  API, CẤM hotlink .mp3/.wav/.ogg. Tempo 100–116 BPM ở hiệp 1 và 2, mỗi ô nhịp 2–4 ô lặp liên tục không đổi; chạy
  trên bus nhạc riêng với gain <= 0.18 và luôn thấp hơn bus SFX; chỉ bắt đầu SAU cú bấm "Bắt đầu", mờ dần 300 ms
  khi Pause hoặc tab ẩn rồi vào lại khi chơi tiếp. Cấm một tiếng rít lặp nguyên văn, cấm nhạc to hơn tiếng mascot đọc đề.
- NHỊP NHẠC LÀ NHỊP VẬN ĐỘNG: bốn động tác khởi động đếm 8 nhịp mỗi động tác theo đúng BPM của loop; trạm nghỉ
  5 giây là mini-trạm đập 8 bong bóng theo đúng 8 nhịp; mỗi cú chốt đúng rơi vào một phách mạnh để em thấy động tác
  của mình khớp với tiếng. CẤM buộc em đổi tư thế nhanh hơn một lần mỗi nhịp, và trần 128 BPM để xung hình ảnh theo
  nhịp không vượt trần nhấp nháy 3 lần/giây của 9.1. Lúc đọc đề, HUD hiện vạch nhịp đang chạy — không phải đồng hồ
  đếm ngược mà mục 6.3 đã cấm.
- NHẠC NHƯỜNG LỜI: khi `window.speechSynthesis` đọc đề hoặc mascot nói một câu thoại, bus nhạc hạ xuống <= 30% gain
  trong suốt lúc đọc và trả lại trong 300–500 ms. Ngân sách giọng thống nhất với 8.4: <= 4 giọng SFX + <= 3 giọng nhạc
  nền, tổng không quá 7 giọng đang phát cùng lúc. Cấm dùng nhạc để báo hiệu đúng/sai — tín hiệu học tập vẫn là SFX
  và chữ trên HUD.
- NHẠC LEO THEO HIỆP: hiệp 2 thêm một lớp bass, hiệp 3 thêm trống và nhích tempo +8 BPM (vẫn trong trần 128); 1,5
  giây cuối hiệp 3 dồn nhịp; nghi thức mở thưởng cuối hiệp là 2,5 giây nhạc leo rồi vỡ òa khớp đúng lúc pháo giấy nổ
  của 8.4. Nhạc cao trào chỉ đổi không khí: không đổi luật chơi, không cộng điểm, không rút thời gian đọc đề.
- NHỊP CHO NGƯỜI KHÔNG NGHE: khi "miti-mute" bật, game hiện vạch nhịp đập theo đúng BPM ở mép dưới HUD (mờ dần,
  không nhấp nháy quá 3 lần mỗi giây, không vượt 25% khung hình) để em vẫn bắt nhịp bằng mắt; máy bật sẵn
  `prefers-reduced-motion` thì vạch nhịp đứng yên và nhạc nền tắt hẳn, game vẫn chơi trọn 12 lượt. Nút "Tắt tiếng"
  phải tắt cả nhạc nền chứ không chỉ SFX, và đọc lại được từ "miti-mute" sau khi tải lại trang.
- TỰ KIỂM BẰNG `verifyMusic()`: chạy MỘT LẦN lúc nạp, kiểm năm điều — loop tổng hợp bằng Web Audio (không có
  `<audio src>` hay `fetch()` file âm thanh nào), BPM nằm trong 100–128, gain bus nhạc <= 0.18, không giọng nào phát
  trước cú bấm "Bắt đầu", bus nhạc hạ khi `speechSynthesis` đang đọc. Thiếu một điều thì `console.warn` bằng tiếng
  Việt, game vẫn chơi, bảng kiểm ghi CHƯA ĐẠT ở mục nhạc nền. Cấm báo "đã có nhạc" khi thực tế chỉ một tiếng "ting" ở câu đầu.

========================
9. AN TOÀN + RIÊNG TƯ + TIẾP CẬN
========================
- Không quay chạy nhảy; không yêu cầu rời khỏi vùng camera; mọi động tác đều có phiên bản ngồi tại chỗ.
- Không động tác nguy hiểm (không ném vật, không xoay cổ quá rộng). Có cảnh báo "Chơi đứng cách màn hình 1m, dọn vật sắc nhọn".
- Thiếu sáng là lỗi camera số một của lớp học: nếu khung hình quá tối hoặc ngược sáng, gợi ý một dòng tiếng Việt
  "Bật đèn lên hoặc quay lưng về phía cửa sổ để camera nhìn rõ em hơn" rồi vẫn cho chơi tiếp, không chặn màn chơi.
- KHÔNG upload video/ảnh từ camera. Chỉ dùng landmark và state trong bộ nhớ; không ghi video ra đĩa.
- Không thu thập dữ liệu cá nhân; tiến độ chỉ lưu localStorage của máy đó.

9.1 TIẾP CẬN + AN TOÀN THẦN KINH (bắt buộc — nguồn: `tools/lib/access.mjs`, validate chặn nếu thiếu)
- TRẦN NHẤP NHÁY: không hiệu ứng nào bật–tắt quá 3 lần/giây, không giật sáng phủ toàn màn hình, tổng diện tích vùng
  đang nhấp nháy <= 25% khung hình. Flash khi mất máu là viền mép mờ dần 200–300 ms; viền HUD theo combo đổi độ sáng
  MƯỢT chứ không bật tắt; particle và vệt neon không chớp theo nhịp.
- TỰ ĐỌC CÀI ĐẶT MÁY: `matchMedia("(prefers-reduced-motion: reduce)")` và `matchMedia("(prefers-contrast: more)")`
  chạy một lần lúc khởi động. Reduce = true thì BẬT SẴN chế độ Giảm hiệu ứng (tắt particle + speed lines, bỏ giật màn
  hình, hit-stop hạ còn ~30 ms, mascot chỉ đổi biểu cảm) nhưng GIỮ NGUYÊN 100% nội dung học, số lượt, điểm và lời giải.
  Lựa chọn của em lưu vào localStorage, không hỏi lại lần sau, không bắt em tự tìm nút.
- MÀU KHÔNG LÀ KÊNH DUY NHẤT: đúng/sai/đang chọn/bị khóa/hết giờ phân biệt được bằng ÍT NHẤT HAI kênh ngoài màu —
  biểu tượng ✓ ✗, một chữ tiếng Việt ngắn, hình dạng khác nhau, độ đậm viền và âm thanh khác nhau. Không dựa vào cặp
  đỏ–xanh lá (khoảng 8% học sinh nam và 0,5% học sinh nữ mù màu đỏ–lục); đã dùng màu thì hai màu phải khác hẳn độ sáng.
- PHỤ ĐỀ CHO MỌI ÂM THANH: nút "Hiện chữ" bật được NGAY TỪ ĐẦU chứ không chờ sai mới hiện (nghe-trước vẫn giữ: audio
  phát trước, chữ hiện khi em bấm hoặc sau khi chốt); lời giải, lời khen, thông báo lỗi, chữ mascot nói đều có dạng chữ;
  âm báo combo/mất máu/thắng màn kèm biểu tượng nhìn thấy được. Lớp ồn hay học sinh nghe kém vẫn đạt 100% mục tiêu.
- TƯƠNG PHẢN: chữ so với nền ngay sau lưng nó >= 4.5:1 (chữ lớn >= 24px thì >= 3:1); mỗi thẻ tự có nền gradient tối +
  viền stroke >= 2px + bóng đổ, không trông chờ lớp phủ rgba(8,5,20,0.4). Không chữ nghiêng mảnh, không chữ chỉ có viền,
  không gradient nhiều màu trong một dòng. Tự kiểm: tắt lớp phủ đi thì chữ vẫn đọc được trên khung hình sáng.
- TAY THUẬN: calibration hỏi một chạm "Em thuận tay nào?" (Trái / Phải / Cả hai, mặc định Phải) rồi gán tay điều khiển
  theo đó — landmark đổi vai trò trái/phải, hướng dẫn hình VÀ chữ được gương lại đúng bên, vùng đích ưu tiên phía tay
  thuận, mốc 50% tầm với đo theo chính tay đó. Đổi giữa chừng qua nút "Chỉnh lại tư thế", không mất điểm và lượt.

========================
10. MiTi — DẤU ẤN THƯƠNG HIỆU (bắt buộc trong file HTML)
========================
- Nhúng logo bằng inline SVG/CSS hoặc HTML thuần; không hotlink ảnh ngoài, không phụ thuộc repository.
- Góc trên trái: ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ.
- Logo xuất hiện ở màn hình Bắt đầu, HUD khi chơi và màn hình Kết quả; nhỏ, không che vùng tương tác.
- Chân trang hoặc vùng kết quả có dòng: MiTi • Học bằng chuyển động.
- Không đổi tên thương hiệu, không xóa logo khi vào gameplay, khi replay hoặc ở chế độ fallback.

========================
11. NGHIỆM THU (game phải tự chứng minh nó đạt chuẩn — nguồn: `tools/lib/acceptance.mjs`, validate chặn nếu thiếu)
========================
Bối cảnh: người dùng dán prompt này vào Gemini Canvas, nhận về một file HTML dài vài nghìn dòng.
Không có cách nghiệm thu thì toàn bộ quy định phía trên chỉ là lời mong đợi — không ai biết file có toScreen thật không.

- BẢNG KIỂM TỰ ĐỘNG: game có một bảng ẩn, mở bằng cách bấm 7 lần vào logo MiTi hoặc tổ hợp Ctrl+Alt+K.
  Bảng liệt kê TỪNG ràng buộc kèm trạng thái ĐẠT / CHƯA ĐẠT. Trạng thái đó phải do code kiểm thật lúc chạy,
  không phải chữ tĩnh kê sẵn. Một bảng báo "ĐẠT" mà không kiểm gì là lỗi nghiêm trọng nhất của game giáo dục.
  Bảng chỉ người lớn mở được: không trừ tim, không chặn chơi, học sinh không nhìn thấy.
- 40 MỤC MÁY TỰ KIỂM, mỗi mục một hàm trả true/false:
  [1] QUESTION_DATA đủ số mục và verifyQuestionBank() ĐÃ chạy trước lượt chơi đầu tiên
  [2] mọi mục đang phát hành có answer nằm trong choices đúng một lần
  [3] 📷 drawImage khung hình webcam đi qua toScreen(lx, ly), không còn phép nhân thô với W/H
  [4] 📷 alpha lớp phủ tối đang dùng <= 0.45
  [5] 📷 có ít nhất một vật thể neo vào landmark và cập nhật mỗi khung hình
  [6] 📷 giữ nguyên một tư thế 2 giây không sinh thêm cú chốt nào (cooldown + hysteresis hoạt động)
  [7] tab ẩn là tự Pause và khi quay lại có đếm 3-2-1
  [8] 12 lượt chia 3 hiệp và giữa hiệp có trạm nghỉ 5 giây
  [9] matchMedia prefers-reduced-motion được đọc và có hiệu lực thật
  [10] bộ đếm flash đo được không thành phần nào bật–tắt quá 3 lần mỗi giây
  [11] tỉ lệ tương phản tính từ màu thật đang dùng >= 4.5:1 cho chữ thường và >= 3:1 cho chữ lớn
  [12] 📷 lựa chọn tay thuận được áp dụng vào tay điều khiển
  [13] localStorage ghi và đọc được cả "miti-collection" lẫn "miti-mastery"
  [14] 2 câu đúng liên tiếp làm level tăng và câu sai thứ 4 trong chuỗi rơi về level 1
  [15] không có URL bị cấm nào được tải (kiểm ở danh sách network request thật)
  [16] chữ ký MiTi có mặt ở cả ba màn Bắt đầu / HUD / Kết quả
  [17] khởi động 60–90 giây đã chạy trước hiệp 1 và hạ nhiệt 45–60 giây đã chạy trước màn tổng kết
  [18] nhịp thẻ đúng chuẩn: 3,0–4,5 giây bay vào, ở lại <= 8 giây, phiên đạt >= 12 nhịp chuyển động mỗi phút
  [19] 📷 đồng hồ thời gian vận động tích lũy đạt >= 60% thời lượng phiên
  [20] lịch ôn +1, +3, +7 ngày ghi được vào localStorage "miti-review" và đọc lại được sau khi đóng rồi mở tab
  [21] phiên có >= 3 lượt thuộc cụm khác cụm chính và >= 1 lượt là câu đến hạn ôn, đếm từ danh sách lượt thật
  [22] câu "Em còn nhớ không?" chạy 10 giây trước lượt 1 và trả lời sai ở đó không trừ tim, không cắt chuỗi đúng
  [23] HUD có dòng "Kỷ lục: <n> · Em đang: <m>" và PHÁ KỶ LỤC chỉ nổ khi điểm thật vượt mốc trong "miti-best"
  [24] hiệp 3 chạy "HIỆP QUYẾT ĐỊNH" (nhân đôi điểm, thêm 1 thẻ vàng) nhưng vẫn đúng 4 lượt + trạm nghỉ 5 giây
  [25] nghi thức mở thưởng cuối hiệp dài 2,5 giây, luôn có phần thưởng, không đổi level thích ứng, mở ngay khi reduced-motion
  [26] "miti-tokens" giữ được khiên chuỗi và quyền chọn câu sang phiên sau (tối đa 2); khiên vỡ vẫn trừ 1 tim, vẫn hiện lời giải, câu đó vẫn vào hàng đợi luyện lại
  [27] màn tổng kết in đúng một dòng "Lần sau em quay lại sẽ có <n> câu đang chờ" với n đếm từ "miti-review", không chuỗi ngày chơi, không dòng "em đã nghỉ X ngày"
  [28] tỉ lệ mục dang: "nhin" >= 60% và mọi mục dang: "tinh" chỉ mang một dấu phép tính với đề không quá 16 từ (đếm trên QUESTION_DATA đang phát hành)
  [29] điểm một lượt tách thành +6 cho động tác và +3 cho đáp án, hiệu ứng nổ tại điểm chạm trước khi máy biết đúng sai, không thẻ câu hỏi nào có đồng hồ đếm ngược
  [30] AudioContext chỉ resume SAU cú bấm "Bắt đầu" (không một SFX hay nốt nhạc nào phát trước đó), mỗi SFX <= 200 ms, master gain <= 0.25, không quá 4 giọng SFX phát đồng thời (nhạc nền đi bus riêng <= 3 giọng, tổng mọi giọng <= 7), và trạng thái "miti-mute" vẫn đọc được sau khi tải lại trang
  [31] pháo giấy nổ đúng bốn loại mốc với 40–60 hạt sinh qua hàm chiếu điểm chạm (không nổ ở câu đúng thường), slow-mo chỉ chạy 600 ms cho thẻ vàng và 1,5 giây cuối hiệp 3, navigator.vibrate luôn nằm trong if (navigator.vibrate)
  [32] verifyIdentity() đã chạy lúc nạp: mascot tên riêng <= 2 từ hiện ở >= 5 chỗ, ba biến --miti-1/--miti-2/--miti-3 có thật trong CSS và khớp IDENTITY_DATA, đúng MỘT khoảnh khắc chữ ký dài >= 2 giây chỉ chạy 1 lần/phiên, một đạo cụ neo landmark, ba câu thoại <= 6 từ
  [33] verifyMusic() đã chạy lúc nạp: loop nhạc nền tổng hợp bằng Web Audio (không có <audio src> hay fetch() file âm thanh ngoài), BPM nằm trong 100–128, gain bus nhạc <= 0.18, bus nhạc hạ xuống <= 30% khi speechSynthesis đang đọc, và bản "miti-mute" có vạch nhịp đập theo BPM thay cho tiếng
  [34] verifyQueue() đã chạy lúc nạp: ba vai chờ (cổ vũ đủ 8 nhịp · trọng tài giơ thẻ "Động tác to / nhỏ" · thư ký đọc lại đề và đáp án) có nhãn tên trên HUD, đồng hồ chờ chạy riêng và gọi đúng tên em đang chờ ở giây 15, bộ đếm "Lượt của em <n>/3" đổi vai đúng sau 3 lượt trong 12 lượt, và +5 điểm của vai chờ chỉ vào thanh "Cả nhóm" chứ không vào "miti-best"
  [35] verifyLesson() đã chạy lúc nạp: đồng hồ phiên "Còn <n> phút" có thật và phiên tự khép ở phút thứ 10 tại RANH GIỚI lượt, bốn mức gắng sức "dễ quá / vừa / mệt / kiệt" hiện cuối mỗi hiệp và đọc lại được từ localStorage "miti-effort", 15 giây "hồi nhịp" hít 4 nhịp – thở ra 6 nhịp chạy xong trước khi hiệp sau bắt đầu, và khối "Bản tiết học" in đủ bốn dòng lấy từ số thật
  [36] verifyStandard() đã chạy lúc nạp: mọi câu mang nhãn mạch nằm trong tám mạch của tools/data/standards.mjs và HUD có thật (nhãn <= 18 ký tự, >= 18px), dòng "Yêu cầu cần đạt:" xuất hiện ở đúng hai màn và khớp NGUYÊN VĂN bảng chuẩn, mạch chính <= 9/12 lượt kèm >= 3 lượt thuộc mạch khác và tổng kết in "Hôm nay em chạm <n> mạch", mỗi cụm có "Dễ nhầm" ở câu đầu (<= 16 từ) và "Mẹo nhớ" <= 12 từ kèm động tác 3 giây
  [37] verifySport() đã chạy lúc nạp: tên môn thể thao <= 4 từ lấy từ tools/data/sports.mjs có thật trên HUD và ở đúng hai màn, động tác đặc trưng của môn (<= 6 từ) được mascot làm mẫu 3 giây kèm hiệu lệnh <= 4 từ, nghi thức tinh thần thể thao chạy đúng hai lần (chạm khuỷu 3 giây trước hiệp 1 + lời hay <= 6 từ khi bạn sai, không dòng chế bai), bảng thành tích ba mốc giảm dần cho CẢ ĐỘI lưu "miti-sport" và động tác duỗi riêng của môn 15 giây nằm trong hạ nhiệt 45–60 giây
  [38] verifyFamily() đã chạy lúc nạp: màn tổng kết in ĐÚNG MỘT khối "Gửi bố mẹ" gồm đúng bốn dòng (mỗi dòng <= 20 từ, chữ >= 20px) nằm trong khối "Copy tờ rời" copy được, bốn dòng lấy từ số thật của phiên chứ không phải chữ chép sẵn (thiếu thì in "chưa ghi được", cấm bịa), dòng "Việc 3 phút ở nhà" là một hoạt động không màn hình không ghi vở lấy đúng cột dongTac của môn kèm MỘT đề <= 16 từ đã chơi, và khối không có tên bạn khác, không xếp hạng, không dữ liệu cá nhân, không dòng đe dọa
  [39] verifyPacing() đã chạy lúc nạp: mọi câu mang nhãn "Tuần <a>–<b> · Học kì <n>" khớp NGUYÊN VĂN cột tuan của tools/data/standards.mjs (khoảng nằm trong 1–35, một cụm phủ tối đa 10 tuần) và nhãn đó có thật ở hai màn với chữ >= 18px nằm trong khối "Copy tờ rời" · câu "Lớp mình đang học tuần mấy?" chạy ĐÚNG MỘT lần ở phiên đầu, đọc lại được từ "miti-week" và không chặn nút "Bắt đầu" · khi đã biết tuần của lớp thì >= 3/12 lượt là cụm có tuan[1] nhỏ hơn tuần đó · nhãn nước rút và chế độ tổng ôn đổi đúng theo SCHOOL_YEAR mà không đổi luật chơi, không đổi trần tải trọng
  [40] verifyPlayzone() đã chạy lúc nạp: thẻ "Dẹp chỗ chơi" có thật với đúng bốn dòng <= 12 từ, chạy trong 60–90 giây khởi động và tối đa 20 giây, không thêm màn hình trước nút "Bắt đầu" · ba lựa chọn giày dép lưu "miti-foot" (chân đất / dép lê thì 0/12 lượt nhấc chân cao, không một động tác đứng một chân nào) và nút "Lớp mình chật" lưu "miti-space" đổi động tác di chuyển thành tại chỗ mà vẫn >= 12 nhịp/phút, vật thể AR chỉ vào hình quạt 90 độ phía trước · bộ động tác chốt MỘT LẦN đầu phiên và không mở rộng giữa phiên · nút "Em mệt / em đau" >= 56px luôn bấm được, một cú bấm đưa thẳng vào hạ nhiệt 45–60 giây tại ranh giới lượt, không trừ tim, có ghi "miti-stop"
  Mục gắn 📷 chỉ áp dụng khi có webcam: bản không camera bỏ 6 mục đó và vẫn phải đạt 34 mục còn lại.
- XUẤT BẢN VĂN: bảng có nút "Xuất bản văn" sinh một khối chữ tiếng Việt copy được — tên game, bản chuẩn MiTi,
  ngày giờ, kiểu điều khiển đang chạy, số mục ĐẠT / CHƯA ĐẠT, danh sách mục chưa đạt kèm lý do.
  Khối chữ chỉ hiện trên màn hình và vào clipboard máy đó; không gửi lên máy chủ nào, không xin quyền, không để lại dữ liệu.
- MỤC CHƯA ĐẠT PHẢI GIẢI THÍCH ĐƯỢC: mỗi dòng kèm một câu nguyên nhân kỹ thuật cho người lớn
  (ví dụ "toScreen không được dùng ở drawImage — vật thể đang tính bằng lx * W") và một câu nên sửa thế nào trong prompt.
  Cấm báo "lỗi" rồi im lặng, cấm chữ chung chung kiểu "hệ thống có vấn đề".
- 31 VIỆC NGƯỜI THỬ PHẢI BẤM TAY (máy không tự kiểm được, làm theo đúng thứ tự, khoảng 15 phút):
  đứng xa tới mức chỉ còn hai bàn tay · giữ im một tư thế 5 giây · che nửa người bằng tay · tắt camera giữa vòng ·
  rút mạng lúc đang tải model · đổi tay thuận sang Trái giữa chừng · bật reduced-motion ở hệ điều hành rồi mở game ·
  cố tình sai 4 câu liên tiếp · mở bằng điện thoại đặt dọc · đưa một học sinh lớp 4 chưa đọc hướng dẫn chơi thử 60 giây ·
  chơi trọn một phiên rồi đứng lại 30 giây xem em có thở nhanh hơn và người ấm lên rõ rệt không ·
  làm động tác cúi thấp ở lượt cuối rồi đứng thẳng lên nhanh xem có choáng váng hay mất thăng bằng không ·
  chơi hai phiên cách nhau một ngày xem phiên sau có mở bằng đúng câu hôm trước và xếp câu đến hạn ôn lên trước câu mới không ·
  cố tình trả lời sai một câu từng đúng hai lần ở phiên hôm sau xem game có giữ lời "quên thì không phạt" hay vẫn trừ tim.
  vừa bấm BẮT ĐẦU được 3 giây — em có cảm giác đây là game thật (một cú "ồ") hay chỉ là màn chữ?
  chơi hai phiên liên tiếp — phiên sau có hiện đúng "Kỷ lục: <n>" của phiên trước và vệt ghost chạy theo đúng lượt tốt nhất không?
  chơi đến hiệp 3 — em có nhận ra hiệp này căng hơn thật (điểm nhân đôi, thẻ vàng thêm) mà câu hỏi không khó hơn không?
  để dành tới phiên sau rồi chơi tiếp — khiên chuỗi có còn trong "miti-tokens" và có dùng được thật không (làm sai một câu: chuỗi giữ mà tim vẫn giảm, lời giải vẫn hiện)?
  đọc dòng "Chương tiếp theo" và bấm "Xem trước" ở màn tổng kết — em có hỏi khi nào được chơi chương đó, hay dòng chữ bị đọc như quảng cáo?
  chơi liền 5 lượt đầu — em có phải nhíu mắt tính nhẩm không hay đang nhìn–chỉ–chọn rồi với tay? Nghe đề một lần có hiểu phải làm gì không?
  chơi tới 4 giây "Cả lớp: 3 – 2 – 1 – CHỐT!" trước hiệp 3 — bốn em đứng cạnh máy có thật sự hô theo và cùng làm một động tác mở màn, hay dòng chữ bị đọc lướt như một màn đếm mẫu?
  bật tiếng đầy đủ rồi mở game cho bốn em cùng chơi — SFX có ngắn và dễ chịu hay một tiếng "ting" lặp lại thành chói tai? Bấm "Tắt tiếng" rồi chơi trọn một hiệp: mọi phản hồi còn đọc được bằng chữ và hình không?
  chơi hai game cùng chủ đề liên tiếp rồi gập máy lại — em có gọi ra được tên mascot, màu và khoảnh khắc chữ ký của TỪNG game, hay với em vẫn là một game mặc hai bộ áo?
  nghe trọn một hiệp — nhạc có giữ nhịp cho em vận động theo (mỗi cú chốt rơi vào một phách mạnh) hay chỉ là tiếng nền vô định? Bấm "Tắt tiếng" rồi chơi tiếp: nhịp chuyển động có rớt dưới 12 lần mỗi phút không?
  cho bốn em đứng quanh một máy chơi trọn một hiệp — ba em chưa tới lượt có thật sự vận động (vỗ đủ 8 nhịp, giơ thẻ, đọc lại đề và đáp án) hay vẫn đứng xem? Đứng im 20 giây tới lượt: mascot có gọi đúng tên em đang chờ và ra một động tác 5 giây không?
  bấm giờ thật khi nhóm đầu cầm máy — phiên có tự khép ở phút thứ 10 ngay tại ranh giới lượt (không cắt giữa một em đang chơi) và dòng "Kế hoạch tiết 45 phút" in ra có đủ chỗ cho bốn nhóm không? Hỏi em cuối mỗi hiệp "dễ quá / vừa / mệt / kiệt": tới hiệp 3 mức có tăng thật hay em toàn chọn "dễ quá"?
  đọc to dòng "Yêu cầu cần đạt:" ở màn tổng kết và đối chiếu với sách giáo khoa của lớp — dòng đó có đúng yêu cầu của cụm này không, hay chỉ là một câu chung chung ai cũng viết được? Hỏi em đang chơi "câu vừa rồi thuộc mạch nào" và "mẹo nhớ là gì": em trả lời được thì nhãn mạch và mẹo đã vào đầu, nếu em chỉ đọc lại chữ trên HUD thì hai dòng đó đang trang trí.
  hỏi em đang chơi "mình đang tập môn gì" và "lúc nãy cơ nào được duỗi" — em có gọi ra được tên môn thể thao và động tác duỗi, hay cả buổi với em chỉ là vung tay chọn đáp án? Xem trọn một hiệp: bốn em có thật sự chạm khuỷu trước hiệp 1 và có nói lời hay khi bạn sai không? Đọc bảng thành tích cuối phiên: đó là mốc của CẢ ĐỘI hay đã vô tình thành xếp hạng cá nhân?
  copy tờ rời đưa cho bố mẹ đọc tại chỗ — trong mười giây họ có nói lại được con vừa tập môn gì, mẹo nào và cả nhà cùng làm gì trong 3 phút không? Việc 3 phút đó có buộc ai mở thêm màn hình, ghi vở, chụp ảnh hay mua đồ không? Đọc to tờ gửi về: có tên bạn nào khác, có dòng so sánh hay dọa dẫm nào lọt vào tay người ở nhà không?
  đọc nhãn tuần ở màn khởi động rồi đối chiếu với thời khóa biểu thật của lớp — game ghi "Tuần 22–24 · Học kì 2" có khớp với việc lớp đang học tới đâu, hay bảng tuần chỉ là chữ trang trí? Hỏi em "tuần trước lớp mình học bài gì": em trả lời được thì ba lượt ôn theo tuần đang ôn cái có thật, nếu em chỉ đọc lại chữ trên HUD thì ba lượt đó không ôn gì cả. Xem hai lượt đầu của phiên gần kỳ kiểm tra: đó có thật là chỗ em yếu nhất không, hay game vẫn xếp câu ngẫu nhiên rồi chỉ đổi mỗi dòng chữ "Còn 2 tuần tới kiểm tra"?
  đứng đúng chỗ em sẽ chơi rồi dang hai tay quay một vòng — có chạm bàn, ghế, cặp hay tường không, sàn có vừa lau chưa? Chọn "chân đất / dép lê" ở thẻ "Dẹp chỗ chơi" rồi chơi trọn một phiên: động tác nhấc chân cao có biến mất thật khỏi 12 lượt hay vẫn hiện ra? Bật "Lớp mình chật" giữa hai phiên: phiên sau có còn đòi em né sang bên hoặc lùi lại không? Cuối cùng bấm nút "Em mệt / em đau" ở hiệp 2 — game có đi thẳng vào hạ nhiệt mà không trừ tim, không hỏi lý do, không có dòng "cố lên" nào không, hay em vẫn phải chơi nốt cho đủ 12 lượt?
  Bảng in kèm từng việc và ô ghi kết quả: `prompts/CHECKLIST_NGHIEP_THU.md`.
- THIẾU MỤC NÀO THÌ SỬA PROMPT, KHÔNG SỬA TAY FILE HTML: dán lại nguyên văn quy định tương ứng vào cuối prompt rồi sinh lại file.

========================
12. TỰ KIỂM TRA TRƯỚC KHI XUẤT CODE
========================
[ ] camera chỉ xin quyền sau nút BẮT ĐẦU
[ ] có trạng thái loading / permission / ready / tracking / error bằng tiếng Việt
[ ] có khung định vị + calibration 3 giây đo tầm tay và bề rộng vai; ngưỡng đặt theo đơn vị vừa đo, không theo pixel cố định
[ ] tỉ lệ vật thể đúng/sai xấp xỉ 60/40; chạm sai trừ tim, bỏ đúng chỉ mất chuỗi — vung bừa không thắng được
[ ] mỗi lượt là động tác >= 50% tầm với đã calibration; không có đường thắng cả vòng bằng cổ tay kề vai
[ ] vùng đích nằm sát mép khung và đổi vị trí theo lượt, không chồng lên ngực–mặt học sinh
[ ] xen kẽ trái/phải/hai tay, không quá 4 lượt liên tiếp cùng một bên; mỗi 3 lượt đổi mặt phẳng động tác
[ ] 3 hiệp × 4 lượt, giữa hiệp có trạm nghỉ 5 giây; tổng kết có thẻ đếm số động tác và phút chơi
[ ] khởi động 60–90 giây chạy TRƯỚC hiệp 1 và hạ nhiệt 45–60 giây chạy TRƯỚC màn tổng kết, không tính điểm, không trừ tim
[ ] nhịp thẻ 3,0–4,5 giây bay vào, ở lại <= 8 giây, giữa hai lượt <= 1,5 giây; thời gian đọc đề không bị rút
[ ] phiên đạt >= 12 nhịp chuyển động mỗi phút và đồng hồ vận động >= 60% thời lượng, cả hai đếm từ code thật
[ ] không có động tác nhảy tiếp đất, xoay thân nhanh quá 90 độ, hay hai tay trên cao liên tục quá 15 giây; cúi thấp tối đa 3/12 lượt
[ ] nhắc uống nước đúng một dòng ở tổng kết khi phiên >= 6 phút, không pop-up giữa vòng chơi
[ ] HUD có đồng hồ phiên "Còn <n> phút" (>= 20px, không nhấp nháy, không đỏ) và phiên tự khép ở phút thứ 10 tại RANH GIỚI lượt, tổng kết tự hiện; thẻ câu hỏi vẫn không có đồng hồ đếm ngược
[ ] màn tổng kết in "Kế hoạch tiết 45 phút: <n> phiên × <n> phút + <n> phút đổi nhóm + 5 phút chốt tờ rời" từ số thật; nút "Kết phiên" đóng êm ở ranh giới lượt, không trừ tim, không hỏi lý do
[ ] bốn mức gắng sức "dễ quá" · "vừa" · "mệt" · "kiệt" (nút >= 56px) hiện cuối mỗi hiệp, ghi localStorage "miti-effort" và đọc lại được ở phiên sau, không mức nào bị coi là sai
[ ] giữa các hiệp có 15 giây "hồi nhịp" hít vào 4 nhịp – thở ra 6 nhịp theo vạch nhịp trước khi hiệp sau bắt đầu; reduced-motion rút còn 10 giây đếm chữ, vẫn đủ 12 lượt
[ ] khối "Bản tiết học" in đủ bốn dòng lấy từ số thật trong khối nút "Copy tờ rời" copy được; thiếu dữ liệu thì in "chưa ghi được", cấm bịa số
[ ] verifyLesson() chạy MỘT LẦN lúc nạp, kiểm đúng bốn điều của tiết học và bản không camera vẫn bắt buộc đủ bốn điều
[ ] mỗi câu mang một nhãn mạch trong tám mạch của tools/data/standards.mjs, HUD hiện nhãn <= 18 ký tự cỡ chữ >= 18px và đổi theo câu
[ ] dòng "Yêu cầu cần đạt:" in NGUYÊN VĂN ở màn khởi động và màn tổng kết, không viết lại không tóm tắt, dòng tổng kết nằm trong khối "Copy tờ rời"
[ ] mạch chính <= 9/12 lượt và >= 3 lượt thuộc mạch khác; câu khác mạch vẫn là cụm có thật trong bảng chuẩn của đúng môn đúng lớp
[ ] tổng kết in "Hôm nay em chạm <n> mạch: ..." đúng bằng số mạch thật đã hỏi, không đếm mạch đã ghi sẵn trong prompt
[ ] câu đầu mỗi cụm hiện "Dễ nhầm: <một lỗi>" <= 16 từ BÁO TRƯỚC khi em bấm, tắt sau 6 giây, không che đề; các lượt sau không lặp lại
[ ] mỗi cụm có đúng một "Mẹo nhớ" <= 12 từ, mascot đọc to kèm một động tác 3 giây làm mẫu; động tác không phải điều kiện cộng điểm
[ ] verifyStandard() chạy MỘT LẦN lúc nạp, kiểm đúng bốn điều của chuẩn kiến thức; bản một học sinh và bản không camera vẫn bắt buộc đủ bốn điều
[ ] game mang đúng MỘT môn thể thao của mã điều khiển mình (cột `mon` trong tools/data/sports.mjs, <= 4 từ), tên môn hiện ở HUD góc trên phải chữ >= 18px suốt phiên và đổi thì phải đổi cả phiên; CẤM mô tả chung chung, CẤM đổi môn giữa phiên
[ ] màn khởi động in "Hôm nay ta tập môn ..." và màn tổng kết in "Môn thi đấu hôm nay: ...", cả hai nằm trong khối "Copy tờ rời"
[ ] động tác của mọi lượt là động tác đặc trưng của môn (<= 6 từ), mascot làm mẫu 3 giây đầu mỗi hiệp và hô hiệu lệnh <= 4 từ để cả nhóm hô lại; tổng kết đếm "Em đã <động tác> <n> lần" bằng số thật
[ ] 12 lượt chơi là một đường tiếp sức: gậy ảo neo landmark bàn tay alpha <= 0.45, truyền tay sau 3 lượt; rơi gậy chỉ hiện "Không sao, chạy tiếp" và không trừ tim, không trừ điểm
[ ] nghi thức tinh thần thể thao chạy ĐÚNG hai lần một phiên: bốn em chạm khuỷu 3 giây trước hiệp 1 + lời hay <= 6 từ của vai cổ vũ khi bạn sai (hiện 4 giây kèm phụ đề); CẤM mọi dòng chế bai
[ ] bảng thành tích có ba mốc giảm dần cho CẢ ĐỘI và MỘT màu huy chương lưu "miti-sport", đọc lại bằng "Kỳ trước cả đội đạt <màu> — <n> động tác"; CẤM xếp hạng cá nhân, CẤM so giữa các máy, CẤM đổi huy chương lấy nội dung
[ ] động tác duỗi giữa của hạ nhiệt 45–60 giây là động tác duỗi riêng của môn (cột `duoiCo`, 15 giây) với HUD "Cơ em đang duỗi: <tên>" chữ >= 20px; CẤM duỗi bật nhịp, CẤM ép chạm gót tay, reduced-motion còn HAI động tác × 10 giây
[ ] verifySport() chạy MỘT LẦN lúc nạp, kiểm đúng bốn điều của chất thể thao; bản tắt tiếng, bản reduced-motion và bản không camera vẫn bắt buộc đủ bốn điều
[ ] errorTag sửa đúng 2 lần được xếp ôn vào +1/+3/+7 ngày trong "miti-review", ôn vững thì giãn +21 ngày
[ ] 3 giây đầu vào gameplay là một cú "ồ" bằng vật thể AR, không phải màn chữ
[ ] "miti-best" lưu đúng ba số, HUD hiệp 2 hiện "Kỷ lục: <n> · Em đang: <m>" và PHÁ KỶ LỤC chỉ nổ một lần
[ ] vệt ghost là dải sáng alpha <= 0.35 (không phải ảnh người chơi), không có dữ liệu thì ẩn, không chữ "thua"
[ ] hiệp 3 "HIỆP QUYẾT ĐỊNH" nhân đôi điểm nhưng vẫn 4 lượt + trạm nghỉ 5 giây, level không đổi theo hiệp
[ ] mở thưởng cuối hiệp 2,5 giây, luôn có quà, không đổi level thích ứng, reduced-motion thì mở ngay
[ ] cột "Cả nhóm: <x>/<mốc>" chỉ hiện tổng câu đúng, không điểm từng em cạnh nhau, không tên, không hạng nhất
[ ] còn 1 câu tới mốc 10/20/30 thì HUD bật dòng "Còn 1 câu nữa tới mốc <m>" 1,5 giây; đích chung hiện "Cả nhóm còn <k> câu tới mốc"
[ ] "miti-tokens" tích được tối đa 2 khiên chuỗi và giữ sang phiên sau; khiên vỡ vẫn trừ 1 tim, vẫn hiện lời giải, vẫn luyện lại câu sai
[ ] màn tổng kết có đúng một dòng "Chương tiếp theo" theo errorTag em còn yếu + nút "Xem trước" 6 giây, không đe dọa "không chơi là mất"
[ ] dòng "Lần sau em quay lại sẽ có <n> câu đang chờ" đếm từ "miti-review"; không chuỗi ngày chơi, không dòng "em đã nghỉ X ngày"
[ ] bộ sưu tập là lưới 6 ô, ô chưa mở là nét đứt "? ? ?" kèm "còn thiếu <k> thẻ", không so với bộ của bạn
[ ] bấm "Kết thúc" có nghi thức lưu phiên 3 giây "Đã lưu: ..." trước khi nút "Tắt máy" sáng; localStorage bị chặn thì ẩn mọi dòng kỷ lục
[ ] phiên có >= 3 lượt xen cụm khác và >= 1 lượt là câu đến hạn ôn; phiên đầu trên máy thì bỏ qua lịch mà không báo lỗi
[ ] 10 giây "Em còn nhớ không?" chạy trước lượt 1; sai ở đó không trừ tim, không cắt chuỗi, chỉ đưa vào lượt 3
[ ] "Vì sao đúng?" xuất hiện ở đúng 4/12 lượt, không tính vào 12 lượt, không rút thời gian đọc đề
[ ] câu quen lại mà sai không bị phạt; tổng kết có "Hôm nay em vẫn nhớ / Cần ôn lại" và nút "Copy tờ rời" cho giáo viên
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
[ ] chữ và HUD không đè lên thân học sinh (lưới 3×3, ô giữa và ô giữa trên là vùng cấm đặt chữ)
[ ] cơ chế chọn theo mức camera đang thấy (chỉ tay / nửa thân trên / toàn thân), có dòng tiếng Việt báo mức nhận diện
[ ] hồ sơ "miti-mastery" được đọc khi mở game và xếp câu theo errorTag yếu nhất; mất hồ sơ thì vẫn chơi trọn
[ ] có nút bật chế độ hai học sinh chạy maxNumHands: 2, hai nửa khung hình, điểm và tim tách riêng, không xếp hạng
[ ] không hiệu ứng nào nhấp nháy quá 3 lần/giây, không giật sáng phủ toàn màn hình, vùng chớp <= 25% khung hình
[ ] prefers-reduced-motion được đọc lúc khởi động và bật sẵn chế độ Giảm hiệu ứng, không bắt em tự tìm nút
[ ] đúng/sai phân biệt được bằng >= 2 kênh ngoài màu (biểu tượng ✓ ✗, chữ, hình dạng, âm thanh)
[ ] mọi audio có bản chữ tương đương; nút "Hiện chữ" bật được ngay từ đầu, không chờ trả lời sai
[ ] chữ so với nền thẻ >= 4.5:1 (chữ lớn >= 3:1), tắt lớp phủ đi vẫn đọc được trên khung hình sáng
[ ] calibration có hỏi tay thuận Trái/Phải/Cả hai và gương lại hướng dẫn đúng bên, không mất điểm khi đổi
[ ] verifyQuestionBank() chạy một lần lúc nạp và loại mục lỗi: answer có trong choices đúng một lần, errorTag hợp lệ, không trùng prompt, mỗi level >= 1/4
[ ] mỗi phương án nhiễu sai theo một lỗi thật trong danh sách lỗi, không có phương án tình cờ đúng
[ ] mọi số và từ nằm trong phạm vi SGK đã khai báo; không chia cho 0, không kết quả vô hạn
[ ] đáp án đúng không đoán được bằng mẹo hình thức; vị trí đúng phân bố đều 1/3 ± 10%
[ ] level là bậc thang độ tinh vi (1 nhìn là chọn, 2 loại trừ một nhịp, 3 ước lượng) và mọi lượt vẫn chỉ MỘT thao tác
[ ] mọi mục có `dang`; mục "tinh" có <= 1 dấu phép tính; >= 60% số mục là "nhin"; đề <= 16 từ và được đọc to
[ ] AudioContext chỉ resume sau cú bấm "Bắt đầu"; mỗi SFX <= 200 ms; master gain <= 0.25; <= 4 giọng SFX + nhạc nền <= 3 giọng trên bus riêng (tổng <= 7 giọng); nút "Tắt tiếng" lưu "miti-mute" và game vẫn chơi được khi câm
[ ] pháo giấy 40–60 hạt chỉ nổ ở 4 loại mốc qua toScreen; slow-mo 0,45× đúng 600 ms cho thẻ vàng + 1,5 giây cuối hiệp 3; navigator.vibrate 20/60/100 ms bọc trong if; mascot có một màn hài 3 giây mỗi hiệp; trước hiệp 3 có 4 giây "Cả lớp: 3 – 2 – 1 – CHỐT!"
[ ] nhạc nền tự tổng hợp bằng Web Audio (không `<audio src>`, không hotlink .mp3/.wav/.ogg), 100–116 BPM ở hiệp 1–2, bus nhạc riêng gain <= 0.18 và thấp hơn bus SFX
[ ] nhịp nhạc là nhịp vận động: khởi động 8 nhịp mỗi động tác, trạm nghỉ 8 bong bóng theo 8 nhịp, cú chốt đúng rơi vào phách mạnh; trần 128 BPM và không đòi đổi tư thế nhanh hơn một lần mỗi nhịp
[ ] bus nhạc hạ xuống <= 30% gain khi speechSynthesis đọc đề hoặc mascot nói, trả lại trong 300–500 ms; nhạc không báo hiệu đúng/sai
[ ] tắt tiếng còn vạch nhịp đập theo BPM ở mép dưới HUD (<= 3 xung/giây, <= 25% khung hình); reduced-motion thì vạch đứng yên, nhạc tắt hẳn và 12 lượt vẫn chơi trọn
[ ] verifyMusic() chạy một lần lúc nạp, kiểm năm điều (Web Audio, BPM 100–128, gain <= 0.18, im lặng trước "Bắt đầu", nhường speechSynthesis) và báo CHƯA ĐẠT bằng tiếng Việt khi thiếu
[ ] ba vai chờ có thật và có tên trên HUD: Cổ vũ giữ đủ 8 nhịp theo vạch nhịp, Trọng tài giơ thẻ "Động tác to / nhỏ" sau cú chốt của bạn, Thư ký đọc lại đề và đáp án cùng speechSynthesis; không em nào làm "người xem"
[ ] 12 lượt chia đều 3 lượt/em với HUD "Lượt của em: <tên> · <n>/3", đổi vai tự động khi đủ 3 lượt, có nút "Đổi người chơi" cho giáo viên không trừ tim và không hỏi lý do
[ ] trần đứng chờ 20 giây: đồng hồ chờ chạy riêng cho vai không cầm máy, giây 15 mascot gọi đúng tên em chờ kèm động tác 5 giây ở dải dưới HUD, không che đề
[ ] mỗi em đứng trong một vòng 1 sải tay, máy cách em đang chơi >= 1,2 m, camera không thấy đủ bốn em không phải lỗi, đổi người có 20 giây "vào vị trí" đếm 3-2-1 và không thẻ nào rơi
[ ] +5 điểm vai chờ chỉ vào thanh "Cả nhóm", không vào "miti-best" và không đổi thứ hạng em đang chơi; tổng kết có dòng "Bốn em hôm nay: <tên> <n> động tác" trong khối chữ Copy tờ rời
[ ] verifyQueue() chạy một lần lúc nạp, kiểm bốn điều (ba vai có nhãn tên · đồng hồ chờ gọi tên ở giây 15 · bộ đếm 3 lượt/em đổi vai đúng · điểm vào "Cả nhóm") và bỏ qua hai mục vai chờ ở bản một học sinh thay vì báo lỗi giả
[ ] 2 câu đúng liên tiếp lên một level, 2 câu sai liên tiếp xuống một level cùng errorTag
[ ] không cho sai quá 3 câu liên tiếp; câu thứ 4 là level 1 kèm lời giải từng bước, chọn lại đúng không trừ tim lần hai
[ ] không hiện "level"/sao xếp hạng cho học sinh; phân bố level chỉ ở màn tổng kết cho giáo viên
[ ] IDENTITY_DATA đặt ĐẦU khối <script> với đủ năm giá trị: mascot <= 2 từ, ba mã hex đúng dạng #RRGGBB, ba câu thoại <= 6 từ, đúng MỘT khoảnh khắc chữ ký, đúng MỘT đạo cụ có điểm neo landmark
[ ] verifyIdentity() chạy một lần lúc nạp và báo lỗi tiếng Việt nêu đúng trường lệch; không chép nguyên bản sắc của game khác cho qua luật
[ ] --miti-1/--miti-2/--miti-3 dùng thật trong CSS (vật thể AR / particle + viền hit / điểm nhấn HUD), không khai rồi bỏ
[ ] tên mascot xuất hiện ở >= 5 chỗ (lời chào màn Bắt đầu, nhãn cạnh nhân vật trên HUD, mỗi câu thoại, tên mini-trạm nghỉ, màn tổng kết); không gọi chung "bạn MiTi" hay "trợ lý"
[ ] khoảnh khắc chữ ký chạy 1 lần/phiên (tối đa thêm 1 lần ở nghi thức mở thưởng hiệp 3), dài >= 2 giây, không đổi luật, không cộng điểm, không che đề bài
[ ] đạo cụ AR neo landmark bằng toScreen(); bản không camera thì đạo cụ đứng yên ở góc HUD dưới chứ không biến mất
[ ] ba câu thoại đọc bằng speechSynthesis giọng vi-VN, <= 3 câu mỗi phút, câu khi sai là câu đỡ chứ không chế giễu
[ ] bảng kiểm ẩn mở bằng 7 lần chạm logo MiTi hoặc Ctrl+Alt+K, trạng thái ĐẠT do code kiểm thật lúc chạy
[ ] cả 40 mục máy tự kiểm đều có hàm kiểm tương ứng, không mục nào là chữ kê sẵn
[ ] mục CHƯA ĐẠT kèm nguyên nhân kỹ thuật + cách sửa trong prompt, không có dòng "lỗi hệ thống"
[ ] nút "Xuất bản văn" copy được khối chữ tiếng Việt, không gửi lên máy chủ nào
[ ] bản không camera bỏ đúng 6 mục 📷 và vẫn đạt 34 mục còn lại, không bỏ luôn bảng kiểm
[ ] fallback chuột/chạm/phím chơi trọn vẹn, tự kích hoạt khi camera lỗi
[ ] QUESTION_DATA có ít nhất 30 mục (Toán) hoặc 60 mục (Tiếng Anh), mỗi mục có đáp án + lời giải + errorTag + loiViet + dang
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
- **Vùng an toàn cho chữ theo lưới 3×3**: nếu chỉ nói "đừng che học sinh", mô hình vẫn đặt HUD giữa màn hình vì đó là chỗ dễ code nhất;
  quy thành vùng cấm cụ thể (ô giữa + ô giữa trên) mới kiểm được bằng mắt.
- **Đàm phán theo khả năng camera**: laptop trường học thường chỉ thấy tay và vai. Prompt đòi toàn thân sẽ ra game báo lỗi liên tục
  thay vì game chơi được — nên cho mô hình quyền hạ cơ chế xuống mức đang thấy và nói rõ bằng tiếng Việt.
- **Hồ sơ `miti-mastery`**: giá trị sư phạm nằm ở lần chơi thứ hai trở đi (lặp lại cách quãng theo lỗi yếu nhất).
  Không có hồ sơ thì mỗi phiên là một bài kiểm tra mới và giáo viên không thấy tiến bộ.
- **Hai học sinh một khung hình**: lớp 35 em với 5 máy tính chỉ khả thi nếu hai em chơi chung một khung; `maxNumHands: 2`
  có sẵn trong MediaPipe nên chi phí gần như bằng 0, nhưng phải nói rõ mới được dùng.
- **Trần nhấp nháy 3 lần/giây**: đây là ngưỡng an toàn với học sinh nhạy cảm ánh sáng, không phải gu thẩm mỹ. Prompt trước
  yêu cầu cả "flash đỏ khi mất máu" lẫn viền HUD chớp theo combo mà không có trần nào — đúng công thức sinh ra hiệu ứng giật sáng liên tục.
- **Tự đọc `prefers-reduced-motion`**: nút Giảm hiệu ứng gần như không bao giờ được bấm trong lớp; đọc cài đặt của máy thì
  em nào cần là có sẵn, và phải nói rõ "giảm hiệu ứng chứ không giảm nội dung học" để mô hình không cắt bớt lời giải cho nhẹ code.
- **Màu không là kênh duy nhất**: game báo đúng/sai bằng đỏ–xanh lá thì khoảng 8% học sinh nam chơi mà không biết mình đúng hay sai;
  chỉ nói "tương phản tốt, không chỉ dùng màu" là câu chung chung — phải ràng số kênh và nêu rõ cặp đỏ–xanh lá là cặp bị cấm dựa vào một mình.
- **Phụ đề bật được ngay từ đầu**: nguyên tắc nghe-trước của game Tiếng Anh rất dễ biến thành "không nghe được thì thua";
  cho nút "Hiện chữ" từ đầu thì học sinh nghe kém vẫn đạt mục tiêu, còn học sinh đọc chưa vững vẫn chơi bằng tai.
- **Tay thuận là một câu hỏi lúc calibration**: gần như mọi gesture một tay mặc định tay phải. Một chạm hỏi tay thuận rẻ hơn nhiều
  so với việc em thuận tay trái phải với chéo người suốt 12 lượt — và mốc biên độ 50% tầm với cũng phải đo theo đúng tay đó.
- **`verifyQuestionBank()` thay cho lời hứa "một đáp án đúng duy nhất"**: viết "mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code"
  là mô tả, không phải cơ chế — không ai kiểm 60 mục. Bắt engine tự kiểm lúc nạp thì mục lỗi bị loại NGAY, và game không âm thầm dạy sai.
  Đây là ràng buộc duy nhất trong bộ quy định mà học sinh không bao giờ thấy nhưng mọi câu hỏi đều đi qua.
- **Chống đoán mò bằng cấu trúc**: quy tắc 60/40 chặn vung tay bừa, nhưng trẻ còn một cách gian lận khác — nhìn hình thái đáp án
  ("câu trả lời luôn là số to nhất", "chọn cái nào lặp lại từ trong đề"). Chỉ có đếm được mới sửa được: 20% trần cho mẹo to/nhất-dài nhất
  và 1/3 ± 10% cho vị trí đáp án là hai con số viết thành assert trong code.
- **Độ khó theo năng lực, không theo vị trí**: "tăng độ khó ở lượt 5 và lượt 9" nhìn có vẻ hợp lý nhưng đảm bảo rằng trẻ yếu sẽ trượt
  đúng vào lúc bài khó nhất, và trẻ giỏi được thưởng bằng hai câu dễ. Hai chuỗi đúng/sai là bộ đếm đơn giản nhất chạy được trong 1 file.
- **Sàn chống nản 3 câu**: với game lớp học, bỏ một em ở lại sau 4 câu sai liên tiếp là mất em đó luôn. Câu thứ tư là level 1 cùng
  `errorTag` + lời giải từng bước biến thất bại thành đúng một lượt dạy kèm, và "chọn lại không trừ tim lần hai" giữ được động lực.
- **Hợp đồng render AR**: camera phủ kín + lớp tối không quá alpha 0.45 + chiều sâu z + vật neo vào landmark,
  để game trông như thực tế tăng cường thay vì "canvas 2D có webcam kèm theo".
- **Calibration động + ngưỡng theo đơn vị cơ thể**: mỗi học sinh đứng cách camera một khoảng khác nhau; ngưỡng pixel cố định
  khiến em ngồi gần thì fire liên tục, em ngồi xa thì vung hết cỡ vẫn không được tính.
- **60/40 + Pause tự động + ngân sách FPS**: ba quy tắc này đến từ lớp học thật — máy cấu hình thấp, tab bị ẩn khi cô chiếu màn hình,
  và học sinh nhanh chóng phát hiện rằng vung tay bừa vẫn thắng.
- **Bảng kiểm nghiệm thu nằm TRONG game**: quy trình của thư viện này là "chỉ viết prompt", file HTML do Gemini Canvas sinh ra
  và không ai đọc hết vài nghìn dòng để xem `toScreen` có thật được dùng ở `drawImage` hay không. Không có nghiệm thu thì
  toàn bộ quy định phía trên chỉ là lời mong đợi. Bắt game tự kiểm bằng hàm true/false biến lời hứa thành trạng thái đọc được.
- **Trạng thái phải do code kiểm, không phải chữ kê sẵn**: một bảng tĩnh in sẵn chữ "ĐẠT" còn hại hơn không có bảng,
  vì người lớn tưởng là đã kiểm. Đây là lý do quy định ghi rõ "không phải một danh sách chữ tĩnh".
- **Tách 40 mục máy / 31 việc người thử**: cái gì máy kiểm được thì đừng đùn cho giáo viên; cái máy không kiểm được
  (cháu có hiểu luật chơi mà không đọc hướng dẫn không, rút mạng thì sao) thì đừng giả vờ kiểm. Con số 15 phút là thời lượng
  một tiết thực tế, không phải danh sách dài vô hạn.
- **Mục chưa đạt phải nói nguyên nhân và cách sửa**: bảng kiểm chỉ báo "lỗi" sẽ bị bỏ qua; kèm câu "thiếu ở dòng nào,
  dán lại quy định nào vào prompt" thì người viết prompt sửa được ngay, và sửa prompt chứ không sửa tay file HTML.
- **Khởi động + hạ nhiệt là hai bước bị thiếu khi "vận động to" đã đủ**: vòng 3 buộc động tác >= 50% tầm với, và kết quả là
  game bắt trẻ với tay hết tầm ngay sau nút BẮT ĐẦU rồi tắt máy khi hết 12 lượt. Đứng lên ngồi xuống 4 phút với cơ nguội là cách
  nhanh nhất để một em đau vai và nghỉ luôn môn này — cấu trúc tiết thể dục (làm nóng → tập → giãn) phải viết thành quy định riêng.
- **Cường độ phải đo được, không được là cảm giác "hơi mệt"**: ">= 12 nhịp chuyển động mỗi phút" và "đồng hồ vận động >= 60% thời lượng"
  là hai con số giáo viên dự giờ kiểm được bằng mắt và code kiểm được bằng bộ đếm; không có chúng thì mọi game 12 lượt đều tự xưng là bài thể dục.
- **Trần tải trọng liệt kê từng động tác bị cấm**: nhảy tiếp đất, xoay thân nhanh quá 90 độ, giữ tay trên cao quá 15 giây là những thứ
  y tế trường học không cho làm hàng loạt. Nói "an toàn khi vận động" thì mô hình vẫn sinh động tác nhảy; phải kể tên mới chặn được.
- **Nhắc uống nước một dòng, không pop-up**: đây là lời khuyên cho giáo viên, không phải cơ chế chơi. Pop-up giữa vòng vừa cắt mạch vui
  vừa bị trẻ bấm bỏ; một dòng ở màn tổng kết thì người lớn đọc được mà học sinh không bị chặn.
- **"Cách quãng" phải thành mốc ngày**: quy định cũ chỉ viết "lặp lại cách quãng" trong ngoặc, nên mô hình chọn một hàng đợi
  "câu sai gần nhất" và coi thế là xong — trẻ gặp lại câu sai sau 30 giây chứ không phải sau 3 ngày, tức là không có trí nhớ dài hạn.
  +1/+3/+7/+21 là thang giãn cách quen dùng trong tài liệu sư phạm phổ thông và đếm được bằng `Date` trong một file HTML.
- **Trích hồi trước khi dạy lại**: câu "Em còn nhớ không?" 10 giây bắt trẻ kéo kiến thức ra khỏi trí nhớ TRƯỚC khi được xem lại —
  đó là cơ chế tạo trí nhớ, không phải bài kiểm tra thưởng phạt. Nếu để mô hình tự quyết thì nó Will hiển thị lại đáp án cho vui,
  nên quy định ghi "không gợi ý, không hiện đáp án".
- **Quên thì không được phạt**: nếu câu ôn lại mà trừ tim, trẻ học cách không mở game lần sau — đúng thứ mà một công cụ lớp học
  phải tránh nhất. Đổi phạt bằng "hạ lịch ôn về +1 ngày" biến lần quên thành một lượt dạy kèm, đồng bộ với sàn chống nản ở mục 4.4.
- **"Vì sao đúng?" chỉ ở 4/12 lượt**: tự giải thích giúp nhớ lâu nhưng mỗi câu hỏi thêm 5 giây ngồi yên; hỏi cả 12 lượt sẽ kéo
  nhịp xuống dưới 12 nhịp chuyển động mỗi phút ở mục 4.5. Chọn 4 (một mỗi hiệp + mọi lượt ôn) là chỗ hai mục tiêu không đạp nhau.
- **Tờ rời thay vì hệ thống báo cáo**: cô giáo không cần dashboard, cần một đoạn chữ copy được dán vào sổ chủ nhiệm. Vì thế tờ rời
  chỉ có 5 mục cố định, không tên học sinh, không gửi đi đâu — cùng nguyên tắc riêng tư với bản nghiệm thu.
- **Ba giây đầu là chỗ thư viện này trống nhất**: khảo sát 85 prompt đo được 0 lần các chữ "kỷ lục", "phá kỷ lục", "bóng ma",
  "mở thưởng", "hiệp quyết định", "đích chung" — bộ quy định đã đủ nhớ lâu và đủ vận động, nhưng không có gì tạo sự chờ đợi
  trước khi bấm Chơi. Một cú "ồ" bằng vật thể AR bay ngang + một dòng nhiệm vụ >= 44px rẻ hơn nhiều so với màn hướng dẫn mà
  không em nào đọc, và đó đúng là chỗ trẻ lớp 4–5 quyết định có chơi tiếp hay không.
- **Kỷ lục của chính em, không phải hạng của bạn**: thi đua trong lớp chỉ an toàn khi mốc so sánh là con số em đó đã đạt.
  `miti-best` vì thế chỉ giữ ba số { điểm cao nhất, chuỗi đúng dài nhất, ngày } — không tên, không ảnh, không nội dung câu hỏi —
  và "chưa có dữ liệu thì ẩn hẳn dòng kỷ lục" chặn đúng tình huống trẻ mới chơi thấy số 0 ngay HUD.
- **Vệt ghost là dải sáng alpha <= 0.35, không phải ảnh người**: "chơi với chính mình của phiên trước" là động lực rất mạnh,
  nhưng lưu ảnh hay khung hình người chơi thì phạm quy định riêng tư. Chỉ lưu { giây, combo } rồi dựng lại bằng một dải sáng
  cách điệu giữ được cảm giác rượt đuổi mà không giữ dữ liệu nào của em.
- **Hiệp 3 nhân đôi điểm nhưng KHÔNG khó hơn**: cao trào phải đến từ điểm và nhịp hình ảnh, không từ đề bài. Nếu hiệp cuối
  cũng tăng độ khó thì đây lại là "tăng độ khó theo vị trí" đội lốt — cái đã bị bỏ để nhường cho độ khó thích ứng — và trẻ yếu
  sẽ trượt đúng lúc bị cắt timer. Vẫn 4 lượt, vẫn trạm nghỉ 5 giây, sai vẫn dừng 2 giây và hiện lời giải.
- **Mở thưởng luôn có phần thưởng**: quay số mà ra "trắng" là cách nhanh nhất để trẻ thôi bấm lần sau. Ba phương án cố định
  (thẻ bộ sưu tập / +10 điểm / một lượt chọn câu dễ hơn một bậc) và "không đổi level thích ứng đang chạy" là để phần thưởng
  không âm thầm phá bộ đếm chuỗi ở mục độ khó thích ứng.
- **Đích chung thay bảng xếp hạng**: cột "Cả nhóm: <x>/<mốc>" cho cả lớp một lý do để cổ vũ nhau mà vẫn giữ nguyên tắc
  "không xếp hạng, không leaderboard" — mốc 40 câu đúng (người lớn chỉnh 20–60) là mức cho một nhóm nhỏ đổi máy nhau,
  không phải cuộc đua giữa các cá nhân.
- **"Sắp tới" mạnh hơn "đã xa"**: một đứa trẻ cách mốc 10 câu đúng còn đúng 1 câu sẽ bấm lượt tiếp vì một lý do rất khác
  khi đang ở câu thứ 3. Vì thế dòng "Còn 1 câu nữa tới mốc <m>" phải đếm từ số câu đúng thật, không phải một lời động viên
  chung chung — nếu không nó thành chữ trang trí mà không em nào tin.
- **Khiên chuỗi là phần thưởng, không phải mạng thứ hai**: nỗi sợ mất thứ mình đang có là đòn bẩy mạnh nhất ở nhóm tuổi
  này, nhưng nếu khiên giữ cả tim thì đổ sụp quy tắc 60/40 (vung bừa vẫn thắng) và sàn chống nản. Nên khiên chỉ giữ chuỗi,
  tim vẫn trừ, lời giải vẫn hiện, câu sai vẫn vào hàng đợi luyện lại, và tối đa 2 khiên.
- **Dòng "Chương tiếp theo" phải nối vào errorTag thật**: một lời hứa suông kiểu "tuần sau có boss lớn!" chỉ là quảng cáo.
  Bond vào đúng hai lỗi em còn yếu biến nó thành lời hứa học tập mà chính em đọc được.
- **Hẹn lần sau bằng số câu, không bằng "chuỗi ngày"**: streak ngày (streak) là cơ chế giữ chân hiệu quả nhất trong app
  người lớn và cũng độc hại nhất với trẻ — nghỉ một ngày thành mất công, mất công thành bỏ luôn. Ở đây "Lần sau sẽ có
  <n> câu đang chờ" đếm từ `miti-review`, và nghỉ chơi không có hình phạt nào.
- **Ô "? ? ?" và nghi thức "Đã lưu" là hai thứ rẻ mà trẻ đọc được ngay**: chỗ trống trong bộ sưu tập tự giải thích mà
  không cần dòng hướng dẫn nào; còn 3 giây mascot cất thành tích vào túi trả lời đúng câu hỏi trẻ 9 tuổi luôn hỏi khi
  tắt máy — "ủa vậy mai còn không?".
