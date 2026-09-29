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
2. THỊ GIÁC MÁY TÍNH (Web AR)
========================
ƯU TIÊN MediaPipe Tasks Vision (API hiện hành), pin phiên bản và URL cụ thể:
  import { HandLandmarker, PoseLandmarker, FilesetResolver }
    from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs";
  wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm
  model tay: https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task
  model thân người: https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task
Chỉ dùng MediaPipe Legacy Solutions (@mediapipe/hands) khi buộc cho tương thích; khi đó PHẢI pin version đầy đủ.

Cấu hình camera:
- getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }).
- Ưu tiên khung hình 640×480 (tỉ lệ 4:3). nếu camera chỉ cho tỉ lệ khác thì crop/letterbox về vùng vẽ cố định,
  không để khung hình bị giãn làm sai tọa độ cử chỉ.
- Lật gương ngang khi hiển thị video và khi tính tọa độ. Landmark được chuẩn hóa 0..1 → nhân với kích thước vùng vẽ thật.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU.
- Trạng thái hiển thị bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Có khung định vị/calibration để trẻ biết đặt tay hoặc đứng vào đâu; hướng dẫn 1 màn hình, không tutorial dài.

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
- Thêm nút Tắt camera riêng, không cần tải lại trang.

========================
4. VÒNG LẶP GAME
========================
BẮT ĐẦU → KIỂM TRA THIẾT BỊ → ĐỊNH VỊ → CHO XEM CÁCH MOVE → LUYỆN MẪU → VÒNG CHƠI → PHẢN HỒI NGAY → GIẢI THÍCH TRỰC QUAN → CÂU TIẾP THEO → TỔNG KẾT → CHƠI LẠI.
Round đầu tiên phải hiểu được trong vài giây, không cần đọc hướng dẫn dài.

========================
5. HỌC TẬP DẪN LỐI (LEARNING-FIRST)
========================
- Chuyển động phải phục vụ trực tiếp mục tiêu học tập; nếu bỏ camera mà bài học mất ý nghĩa thì cử chỉ đang sai.
- Đúng: phản hồi tích cực ngay (không thưởng tốc độ bằng cách cắt mất cơ hội học).
- Sai: DỪNG 2 giây, giải thích bằng số, sơ đồ đoạn thẳng, lưới ô, hình cắt ghép, trục số hoặc animation.
- Phương án nhiễu phải mô hình hóa đúng lỗi học sinh thật sự hay mắc, không phải đáp án ngẫu nhiên vô nghĩa.
- Không để hiệu ứng hình ảnh che mất nội dung kiến thức, nhất là phần lời giải.
- Toàn bộ học liệu lấy từ QUESTION_DATA, không hard-code một câu hỏi duy nhất.

========================
6. NGÂN HÀNG LỖI + TIẾN BỘ (học từ mô hình thư viện lỗi có nhãn)
========================
- Mỗi mục QUESTION_DATA có "errorTag" là mã máy của loại lỗi (ví dụ: thieu_muon, doi_chou_hai_hang, nham_gan_nghia) và "loiViet" là cụm tiếng Việt có dấu hiển thị cho học sinh.
- Câu sai được xếp lại vào CUỐI vòng chơi trong cùng phiên (hàng đợi luyện lại), và ưu tiên xuất hiện lại sớm.
- Màn tổng kết nhóm theo errorTag: "Em hay sai ở: nhớ khi trừ có mượn" — kèm đúng/sai theo kỹ năng, không chỉ điểm số.
- Thưởng dạng BỘ SƯU TẬP: mỗi màn thắng thả ra 1 thẻ nhân vật/huy hiệu, lưu localStorage (key "miti-collection"),
  có màn "Sưu tập của em". Không thưởng ngẫu nhiên vô nghĩa, không cần server, không leaderboard.

========================
7. GIAO DIỆN
========================
- Màn hình Bắt đầu; hướng dẫn bằng icon + 1 câu ngắn; HUD gồm nhiệm vụ + điểm + chuỗi đúng + tiến độ + trạng thái camera.
- Vùng chơi lớn, chữ lớn (đề bài ≥ 28px trên desktop, ≥ 20px trên điện thoại), tương phản tốt, responsive dọc/ngang.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động.
- Màn kết quả: số câu, đúng/sai, theo nhóm lỗi, kỹ năng cần luyện, nút Chơi lại và nút Chơi màn khác nếu có.
- Không leaderboard, không quảng cáo, không theo dõi người dùng.

========================
8. ÂM THANH + HIỆU ỨNG HÌNH ẢNH
========================
- Web Audio API tổng hợp (Tone.js chỉ khi đã pin version và có dự phòng không có thư viện). KHÔNG dùng file mp3 ngoài.
- Bật audio sau thao tác bấm của người dùng (AudioContext resume).
- Âm thanh phân biệt rõ: đúng (in âm vui), sai (cảnh báo nhẹ, không gây sợ), hết máu, hoàn thành màn.
- Hiệu ứng hạt nổ, shockwave, rung nhẹ màn hình; tôn trọng tùy chọn Giảm hiệu ứng.
- Game Tiếng Anh: dùng window.speechSynthesis đọc từ/câu bằng giọng en-US hoặc en-GB, có nút phát lại.

========================
9. AN TOÀN + RIÊNG TƯ + TIẾP CẬN
========================
- Không quay chạy nhảy; không yêu cầu rời khỏi vùng camera; mọi động tác đều có phiên bản ngồi tại chỗ.
- Không động tác nguy hiểm (không ném vật, không xoay cổ quá rộng). Có cảnh báo "Chơi đứng cách màn hình 1m, dọn vật sắc nhọn".
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
[ ] có khung định vị hoặc hướng dẫn đứng-ngồi
[ ] videoConstraints 640×480 hoặc crop tương đương, có lật gương
[ ] gesture fire theo lượt chuyển, có hysteresis + cooldown + confidence, không spam khi giữ tay
[ ] kiểm tra hình học kép trước khi chốt đáp án
[ ] hover không bị tính là chọn
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
