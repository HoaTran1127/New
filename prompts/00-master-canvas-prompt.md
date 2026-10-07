# 👑 MASTER PROMPT — MiTi GEMINI CANVAS EDUCATION GAME

> Khung chuẩn của mọi prompt trong thư viện này. Muốn tạo game mới: copy khối `text` bên dưới, điền phần `[...]` ở mục 1 và 2, rồi dán vào **Google Gemini → bật chế độ Canvas** để có nút Run/Preview chơi ngay.
>
> Bản này là bản RÚT GỌN (2026-10-05). Trước đây master dài 188 KB và mỗi prompt game dài 162 KB; Gemini nhận quá nhiều quy định cùng lúc nên sinh game lan man, thiếu đúng cái được yêu cầu. Toàn bộ quy định chung giờ nén thành **14 dòng** ở mục 3, và mọi prompt có trần **15 KB**.
>
> Muốn đổi quy định chung cho cả thư viện: sửa `tools/lib/core.mjs` rồi chạy `node tools/build-prompts.mjs`.

## Prompt copy trực tiếp

```text
Bạn là chuyên gia thiết kế và lập trình game giáo dục HTML5 Canvas có tương tác webcam cho học sinh tiểu học Việt Nam.

Hãy tạo một WEB GAME GIÁO DỤC HOÀN CHỈNH mà học sinh đứng trước camera, dùng chính cơ thể mình để chơi.

1. Ý TƯỞNG
- Tên game: [GAME NAME]
- Khối lớp · Môn: [GRADE] · [Toán | Tiếng Anh · band Starters / Movers / Flyers]
- Bối cảnh: [SETTING]
- Việc của học sinh mỗi lượt: [PLAYER MISSION]
- Điều khiển: [mã gesture ở bảng tra cuối file] — nêu rõ landmark nào làm con trỏ và biên độ động tác (động tác phải rộng cả tay và thân, không phải nhấc ngón ngay trước ngực).
- Mascot: [TÊN MASCOT] — [tính cách một dòng]. Ba câu thoại: khen "..." · đỡ khi sai "..." · hô mở đầu "...".
- Bảng màu riêng: `--miti-1` (vật thể AR chính), `--miti-2` (particle và viền hit), `--miti-3` (điểm nhấn HUD) — ba mã hex tự chọn, nhất quán suốt game.
- Khoảnh khắc chữ ký: [một hiệu ứng chỉ có ở game này]. Đạo cụ AR neo vào người chơi: [một vật ảo gắn vào landmark cơ thể].
- Môn thể thao của game: [TÊN MÔN] — động tác đặc trưng "...", hiệu lệnh "...", lời hay khi bạn sai "...", duỗi cơ cuối buổi "...".
- Trò chơi dân gian dẫn dắt: [TÊN TRÒ] — cách chơi "...", lời hô "...", đồ dùng AR "..." (chỉ đồ dùng có sẵn ở sân trường).
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: [nội dung thật của chương trình, không tự bịa].
- Band Cambridge (chỉ game Tiếng Anh): [Pre A1 Starters · 541 từ | A1 Movers · 930 từ | A2 Flyers · 1.431 từ] — dải từ tích luỹ tới band đó theo wordlist 2025, kèm 8 cấu trúc ngữ pháp của band; từ lần đầu xuất hiện ở band cao hơn là lỗi, kể cả khi học sinh lớp 4–5 đã gặp.
- Mạch kiến thức: [MẠCH] — nhãn HUD "[NHÃN NGẮN]" · Tuần [a]–[b] · [Học kì I | Học kì II]. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "[YÊU CẦU CẦN ĐẠT]"
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "..."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "..."
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này, viết tiếng Việt có dấu): [2–4 lỗi].
- Phạm vi: chỉ dùng nội dung [môn] lớp [grade] đã học; game Tiếng Anh còn phải nằm trong đúng band đã chọn ở trên; cấm số hoặc từ vựng ngoài phạm vi trên.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ" (môn con tập và số động tác · mạch con học và số câu đúng · mẹo con mang về · việc 3 phút ở nhà cùng cả nhà).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề game, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

3. RÀNG BUỘC CỐT LÕI (thiếu bất kỳ dòng nào là hỏng)
- 1 file HTML duy nhất: `<style>`/`<script>` nội tuyến; không Tailwind Play CDN, không .css/.js/.json/mp3 ngoài; đồ hoạ chỉ dùng 3 file `.webp` trong `assets/` (`nen` bối cảnh, `mascot`, `vat-the` đạo cụ AR); cấm bịa URL ảnh, cấm base64, cấm emoji thay ảnh; thiếu file thì khối bo góc `--miti-1` + chữ, game vẫn chơi; chỉ tải MediaPipe (CDN + model) và font có dự phòng.
- Camera mặc định TẮT, có nút bật/tắt không cần tải lại trang; chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU; trạng thái bằng tiếng Việt (Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi + nút Thử lại). Không upload ảnh/video, chỉ giữ landmark trong bộ nhớ, không thu thập dữ liệu cá nhân.
- MediaPipe Tasks Vision, import từ `@mediapipe/tasks-vision@1.0.1`; cấu hình `getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } })`, lật gương ngang cả khi hiển thị lẫn khi tính tọa độ; trình duyệt chặn camera thì báo một dòng tiếng Việt rồi vào thẳng chế độ không camera.
- Mọi tọa độ đi qua `toScreen(lx, ly)`; nền AR là chính khung hình camera với lớp phủ tối không vượt 0.45; vật thể có `z`, có bóng dưới chân và có ít nhất một vật ảo neo vào landmark cơ thể.
- Cử chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng + cooldown + ngưỡng tin cậy; hover không tính là đã chọn; giữ nguyên tư thế không được spam event và không bị trừ tim; confidence thấp thì không chốt đáp án.
- FALLBACK bắt buộc: chuột / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính; có nhãn "Chế độ không dùng camera"; mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.
- Không điểm số, không xếp hạng, không timer thi đua. Sai không phạt bằng cách biến mất kiến thức: dừng 2 giây và hiện lời giải đầy đủ bằng tiếng Việt, chỉ rõ chữ số / bước / từ cần sửa.
- Vận động thật: mỗi lượt một động tác rộng cả tay và thân, không nhấc ngón ngay trước ngực. Theo 5 bước: Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính, kèm Khởi động 60–90 giây và Hạ nhiệt 45–60 giây; một phiên ≤10 phút để vừa tiết 45 phút.
- Lớp 4 em: một em chơi, ba em chờ có việc thật (đếm nhịp, cổ vũ, theo dõi đáp án), luân phiên theo sĩ số M với thời gian chờ ≤20 giây và nhãn "đến lượt em"; thành tích ghi cho cả đội, không so cá nhân.
- Mọi học sinh dùng được: không chỉ báo hiệu bằng màu (kèm hình hoặc chữ), phụ đề tiếng Việt cho mọi âm thanh, chữ đề ≥28px desktop và ≥20px điện thoại, responsive dọc và ngang, nút Giảm hiệu ứng chuyển động, không nhấp nháy quá 3Hz, vùng chơi an toàn có thảm/cọc tiêu cảnh báo và nút "Chơi chậm lại" không bị trừ tim.
- Tab ẩn hoặc mất tiêu điểm là tự Pause, quay lại đếm 3-2-1. Máy yếu: nhận diện 1 lần mỗi 2–3 khung hình, particle dùng pool, tự giảm chi tiết khi FPS tụt.
- Mỗi lượt chỉ một ý, đề ≤16 từ. Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi và lời giải bằng TIẾNG VIỆT (học liệu tiếng Anh giữ nguyên tiếng Anh); không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trước mặt học sinh.
- Chữ ký MiTi: ô bo góc `#FFD84D` chứa chữ M màu `#07111F` + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; kèm dòng "MiTi • Học bằng chuyển động"; không xóa hay đổi tên ở chế độ không camera.
- Chỉ xuất toàn bộ file HTML hoàn chỉnh: không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không giải thích dài.

4. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }.
- Tối thiểu 30 mục (Toán) hoặc 60 mục (Tiếng Anh), chia 3 mức độ (level 1/2/3), mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- errorTag là mã máy của lỗi (viết thường, không dấu, không khoảng trắng); loiViet là cụm tiếng Việt có dấu in thường hiển thị cho học sinh; mỗi câu sai lưu cả hai trường.
- Với Toán: mục `dang: "tinh"` phải tính lại được bằng ĐÚNG MỘT phép số học trong code, mục `dang: "nhin"` kiểm bằng số học hoặc số đo hình học; không so khớp chuỗi tự do.
- Với Tiếng Anh: mỗi mục có từ hoặc câu tiếng Anh, gợi nghĩa tiếng Việt, phiên âm khi phù hợp, audio bằng window.speechSynthesis; đáp án là chuỗi cố định.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Khi học sinh sai, phóng to hoặc tô đúng vị trí sai trong đề (chữ số, hàng, hay từ) rồi mới hiện lời giải.
- Hai mục mẫu để bám theo khuôn (viết tiếp cho đủ số mục tối thiểu):
  id: "q1", level: 1, prompt: "...", choices: ["...","...","..."], answer: "...", explanation: "...", errorTag: "...", dang: "nhin", loiViet: "..."

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy hết ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ số mục tối thiểu, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài phạm vi lớp đã nêu; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Bảng tra mã điều khiển (14 mã, nguồn `tools/data/gestures.mjs`)

| Mã | Tên trên HUD | Landmark |
|---|---|---|
| `POINT` | Chỉ ngón tay trỏ | HandLandmarker, đầu ngón trỏ (8) |
| `SWIPE` | Vuốt / chém | HandLandmarker, quỹ đạo ngón trỏ (8) qua 5–8 khung hình |
| `PUNCH` | Vung tay đấm | HandLandmarker, cổ tay (0) + mũi (15) + độ gập ngón |
| `GRAB` | Nắm và thả | HandLandmarker, tâm bàn tay (5, 9, 13, 17), trạng thái nắm/xòe |
| `DRAG` | Kéo thả | HandLandmarker, đầu ngón trỏ làm điểm kéo |
| `STEP` | Nghiêng người / bước sang vùng | PoseLandmarker, hai vai (11, 12) + mũi (0) |
| `TWO_HAND_STRETCH` | Khom hai tay | PoseLandmarker hai cổ tay (15, 16) hoặc HandLandmarker hai tay |
| `TWO_HAND_BALANCE` | Cân bằng hai tay | HandLandmarker hai tay, cao độ cổ tay (0) mỗi bên |
| `ANGLE_POSE` | Tạo góc bằng cánh tay | PoseLandmarker, vai (11, 12), khuỷu (13, 14), cổ tay (15, 16) |
| `FINGER_COUNT` | Đếm ngón tay chọn đáp án | HandLandmarker, số ngón duỗi theo góc khớp PIP–DIP |
| `PINCH` | Bóp ngón cái và ngón trỏ | HandLandmarker, khoảng cách đầu ngón 4 và 8 |
| `CLAP` | Vỗ hai tay | HandLandmarker, khoảng cách tâm hai bàn tay |
| `HOLD_POSE` | Giữ bất động tư thế | PoseLandmarker (hoặc HandLandmarker nếu chỉ giữ tay) |
| `VOICE` | Nói | Web Speech API SpeechRecognition (en-US/en-GB), không dùng MediaPipe |

Model bắt buộc theo mã: `STEP`, `TWO_HAND_STRETCH`, `TWO_HAND_BALANCE`, `ANGLE_POSE` dùng PoseLandmarker; các mã Hand còn lại dùng HandLandmarker. Mỗi game tối đa 2 mã, mã đầu là cơ chế chính; mã phụ chỉ dùng cho thao tác phụ và không được tranh chấp với mã chính.

## Ảnh đồ hoạ — lấy từ Canva, đừng để Gemini tự bịa

Gemini chỉ được tham chiếu file có thật trong `games/<ten-game>/assets/`; prompt không nêu URL ảnh nào khác. Bốn bước:

1. Canva: `mascot` 512×512, `vat-the` 512×512, `nen` 1600×900, cùng bảng màu `--miti-1/2/3` của game.
2. Share → Download → PNG nền trong suốt (Canva Free thì xuất nền trắng rồi tách nền sau).
3. Đổi tên không dấu, convert WebP chất lượng 80: sprite ≤30 KB, nền ≤120 KB. Bản đang chạy `l4-05-nha-may-khoi-luong`: 4 file, 22–116 KB, cả 4 trả về 200 trên Pages.
4. Upload vào `games/<ten-game>/assets/` trước, rồi dán prompt — tên file phải khớp từng chữ.

Thiếu ảnh thì game tự thay bằng khối bo góc `--miti-1` kèm chữ nên vẫn chơi được. Đó là lý do phải cấm emoji và cấm URL bịa: hai thứ này không báo lỗi, chỉ làm game trông rẻ tiền.

## Vì sao prompt ngắn lại (ghi chú cho tác giả)

- Prompt 162 KB tương đương cỡ 40.000 token quy định; Gemini Canvas dồn chú ý vào kỹ thuật AR rồi bỏ mục tiêu học tập, sinh game "linh tinh" như người dùng phản ánh.
- Đo trên 85 file cũ: 77% dung lượng (128,8 KB/file) là chữ quy định chung lặp lại nguyên văn, riêng bảng nghiệm thu cũ 25,8 KB; phần đặc thù game chỉ 2,5% (~4 KB).
- Cấu trúc mới đưa Ý TƯỞNG và MỤC TIÊU HỌC TẬP lên đầu, quy định chung xuống sau với đúng 14 dòng, tổng 12,4 KB/file.
- Muốn bổ sung quy định mới cho mọi game: thêm một dòng vào `CORE_LINES` trong `tools/lib/core.mjs`. `tools/validate.mjs` bắt mọi prompt chứa đủ các dòng đó và báo đỏ nếu file nào vượt 15 KB.
