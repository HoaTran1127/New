# TEMPLATE — MiTi GAME PROMPT CHUẨN

> Dùng khi muốn thêm **một game mới** vào thư viện. Điền các ô `[...]`, copy nguyên khối `text` bên dưới dán vào **Google Gemini → bật chế độ Canvas**.
>
> Nếu game sẽ vào catalog (hiện trên dashboard), thêm một dòng vào `tools/data/games.mjs` rồi chạy `node tools/build.mjs` — đừng sửa tay file prompt được sinh ra.
>
> Biểu mẫu này là bản rút gọn của **khung 9 mục** trong `prompts/00-master-canvas-prompt.md` (thứ tự mục lấy từ `SECTIONS` trong `tools/lib/skeleton.mjs`); mục nào chưa rõ thì mở master đọc nguyên văn rồi điền, đừng tự nghĩ quy định mới.

## Metadata (không gửi Gemini)

- Game ID: [ID] · Khối: [GRADE] · Môn: [SUBJECT]
- Cụm kiến thức: [CLUSTER] — phải có trong `tools/data/clusters.mjs`
- Điều khiển: [GESTURE] — **một trong 14 mã** `POINT · SWIPE · PUNCH · GRAB · DRAG · STEP · TWO_HAND_STRETCH · TWO_HAND_BALANCE · ANGLE_POSE · VOICE` (10 mã đang có trong catalog) + `CLAP · PINCH · HOLD_POSE · FINGER_COUNT` (mã mở rộng), tối đa 2 mã, mã đầu là mechanic chính. **Không được ghi `MIXED`.**
- Game có dùng tay/ngón tay (POINT, GRAB, PINCH, FINGER_COUNT, CLAP…)? [CÓ / KHÔNG] — nếu CÓ thì giữ các dòng "Nếu game dùng tay/ngón tay" ở mục 2.

## Prompt copy trực tiếp

```text
Tạo game giáo dục web "[TÊN GAME]" cho học sinh Việt Nam lớp [GRADE], môn [SUBJECT].
Toàn bộ game nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

1. VÒNG LẶP THU HÚT
- Mục tiêu học tập: [MỤC TIÊU — cụ thể theo SGK, không viết "vận dụng kiến thức qua tình huống"]. Nhiệm vụ một câu của học sinh hiện to trên HUD: [MỘT HÀNH ĐỘNG ĐỌC RA ĐƯỢC NGAY].
- Ba giây đầu: một vật thể AR lớn bay ngang sát người chơi kèm vệt neon và tiếng "vút"; mascot nói đúng một dòng nhiệm vụ, chữ >= 44px. Không mở màn bằng chữ dài.
- Ba hiệp leo thang: hiệp 1 nền tĩnh, thẻ 4,5 giây; hiệp 2 viền HUD sáng dần theo combo, thẻ 3,75 giây; hiệp 3 "HIỆP QUYẾT ĐỊNH" nhân đôi điểm (hệ số không vượt x2). Giữa hai hiệp trạm nghỉ 5 giây, không tính sai, không mất tim; sai ở hiệp 3 không phạt nặng hơn.
- Mở thưởng cuối mỗi hiệp 2,5 giây (thẻ bộ sưu tập / +10 điểm / một câu dễ hơn một bậc), luôn có thưởng.
- Combo "x2, x3…" có cao độ âm tăng dần (tối đa x5); chữ khen bay lên tại điểm chạm, câu sai dùng chữ đỡ ("Còn sát lắm!"). Mỗi vòng 2 thẻ vàng "x2 điểm trong 5 giây" và 1 "câu thử thách".
- Điểm: +10 nhân chuỗi đúng; 5 tim, sai trừ 1 tim nhưng vẫn hiện đủ lời giải; 12 lượt chính (theo lượt ngón tay: 8 câu mỗi em).
- Hiệu ứng: hạt/confetti màu của em trong làn của em (tối đa 40 hạt), rung màn ≤ 250 ms hoặc hit-stop 80–120 ms ở khoảnh khắc lớn, điểm lăn số, vương miện bay sang người dẫn đầu, Podium trồi lên từng bậc. Mọi nhấp nháy ≤ 3 lần/giây; nút "Giảm hiệu ứng" (và prefers-reduced-motion) thay rung, hit-stop, hạt bằng mờ dần tĩnh.

2. CHẾ ĐỘ 1/2/3 NGƯỜI VÀ THI ĐUA
- Màn "Mấy bạn cùng chơi?" có ba nút to 1 · 2 · 3 (mặc định 1, nhớ trong localStorage "miti-players"). Chia màn thành N làn dọc bằng nhau, viền màu riêng (vàng #FFD84D, xanh #4DD2FF, hồng #FF6FB1) kèm nhãn P1/P2/P3.
- N ≥ 2: PoseLandmarker numPoses = N; gán làn theo trung điểm hông 23/24 (thiếu hông thì vai 11/12), x đã lật gương: lane = min(N-1, floor(x·N)). Chỉ ghi nhận động tác trong làn của chính em; mỗi làn phải có đúng một người mới "P<n> sẵn sàng".
- Nếu game dùng tay/ngón tay: nút bánh răng "Cách nhận tay khi 2–3 bạn": Tự động (mặc định) · Theo lượt ngón tay · Cổ tay đồng thời, nhớ trong localStorage "miti-input". Theo lượt: HandLandmarker numHands = 2, chỉ nhận tay trong làn của bạn đang có lượt, banner "Lượt của P<n> — sẵn sàng tay!". Tự động: FPS thấp hoặc tay mơ hồ 3 lần liên tiếp thì chuyển sang Cổ tay đồng thời (cổ tay 15/16 làm con trỏ), giữ nguyên điểm.
- N ≥ 2: Scoreboard trực tiếp ở dải trên, điểm/tim/chuỗi tách riêng từng em; hết ván có Podium, bằng điểm thì xét số câu đúng rồi thời gian, vẫn bằng thì ĐỒNG HẠNG.
- Thi đua cân bằng: em kém người dẫn đầu từ 2 câu đúng trở lên được thẻ x2 cho câu kế (tối đa một thẻ mỗi 3 câu). Mỗi em ÍT NHẤT một danh hiệu đo từ số liệu thật (Nhanh nhất, Chính xác nhất, Vận động nhiều nhất, Chuỗi dài nhất, Kiên trì…).
- Không camera: giữ N làn; P1 chạm/chuột làn 1 hoặc phím A/S/D, P2 phím mũi tên, P3 phím J/K/L.
- N = 1: không Podium; so với kỷ lục của chính em trong "miti-best"; vượt kỷ lục thì "PHÁ KỶ LỤC!" đúng một lần, vệt ghost alpha <= 0.35.

3. CHƠI VẬN ĐỘNG
- Cử chỉ chính — [GESTURE]: [landmark nào, hình học nào]. Điều kiện chốt: [chép dòng "Chốt" của mã trong bảng mã cử chỉ ở master — KHÔNG phải hover].
- Biên độ riêng của cơ chế: [chép trường `bien_do` của mã gesture trong `tools/data/gestures.mjs`]. Mỗi lượt tay hoặc thân đi hết >= 50% tầm với đo lúc calibration.
- Vùng đích cách trục cơ thể >= 45% tầm với, sát mép khung, đổi chỗ mỗi lượt; xen kẽ trái – phải – hai tay – nghiêng thân, một bên không quá 4 lượt liên tiếp.
- KHỞI ĐỘNG 60–90 giây trước hiệp 1 và HẠ NHIỆT 45–60 giây trước tổng kết; nhịp thẻ 3,0–4,5 giây vào, ở lại <= 8 giây; >= 12 nhịp chuyển động mỗi phút; chơi >= 6 phút thì tổng kết nhắc một dòng uống nước.
- Trần tải trọng: cấm nhảy tiếp đất, cấm xoay thân nhanh quá 90 độ, cấm giữ hai tay trên cao quá 15 giây, tối đa 3/12 lượt cúi thấp.
- Chống ăn may: vật đúng/sai xấp xỉ 60/40; chạm vật SAI trừ tim và cắt chuỗi, BỎ LỠ vật ĐÚNG chỉ cắt chuỗi.

4. GHI NHỚ BÀI HỌC
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi): [LỖI 1]; [LỖI 2]; [LỖI 3].
- Sai: DỪNG 2 giây, [trực quan hóa đúng dạng bài: cột dọc / sơ đồ đoạn thẳng / lưới ô / trục số], chỉ rõ bước cần sửa; câu sai xếp cuối vòng để luyện lại.
- Lịch ôn "miti-review" (chỉ { id, errorTag, due, sai }): ôn ở +1, +3, +7 ngày; đầu phiên đưa mục đến hạn vào tối đa 4/12 lượt; quên khi ôn không trừ tim. >= 3/12 lượt xen cụm khác. Trước lượt 1 chiếu 10 giây "Em còn nhớ không?"; 4/12 lượt hỏi "Vì sao đúng?" sau cú chốt đúng.
- Thích ứng: 2 đúng liên tiếp lên một level (trần 3), 2 sai liên tiếp xuống một level cùng errorTag; không để sai quá 3 câu liên tiếp. Level ẩn với học sinh.
- Tổng kết: "Em hay sai ở: <loiViet>" + ba thẻ "Làm tốt / Cần luyện / Động tác lần sau".
- [Game Tiếng Anh: nghe trước rồi mới hiện chữ, window.speechSynthesis giọng en-US hoặc en-GB, có nút phát lại.]

5. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>; mỗi mục { id, level, prompt, choices, answer, explanation, errorTag, loiViet }; tối thiểu [40 mục Toán / 60 mục Tiếng Anh], level 1/2/3 (level = số bước), mỗi level >= 1/4 số mục.
- Phương án nhiễu mô phỏng đúng một lỗi thật ở mục 4, không có nhiễu cũng đúng theo cách hiểu hợp lý; xáo vị trí đáp án có seed, vị trí đúng phân bố 1/3 ± 10%.
- verifyQuestionBank() chạy MỘT LẦN lúc nạp: answer có trong choices đúng một lần, trường khác rỗng, errorTag thuộc danh sách, không trùng prompt, số trong phạm vi SGK, không chia cho 0; mục trượt thì loại và console.warn id + lý do tiếng Việt.
- Mục mẫu: id: "q1", level: 1, prompt: "[...]", choices: ["[...]","[...]","[...]"], answer: "[...]", explanation: "[...]", errorTag: "[...]", loiViet: "[...]"

6. KỸ THUẬT: NỀN AR, CAMERA, FALLBACK
- Bối cảnh AR: [BỐI CẢNH gắn thẳng với cơ chế học]; [vật thể nào đi vào theo z từ 1.6 về 0.35, vật nào neo vào landmark nào].
- Khung hình webcam CHÍNH LÀ màn chơi: vẽ video lật gương + cover-fit; phủ đúng một lớp rgba(8,5,20,0.4), alpha không vượt 0.45; mọi tọa độ qua toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH }, CẤM lx * W hoặc ly * H.
- MediaPipe Tasks Vision pin 1.0.1: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs; chỉ tải model mà [GESTURE] cần.
- getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }), chỉ xin quyền SAU khi bấm BẮT ĐẦU; trạng thái tiếng Việt Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (nút Thử lại).
- Calibration 3 giây đo vai, cổ tay, tầm với rồi đặt mọi ngưỡng theo đơn vị đó; cử chỉ chỉ fire ở lượt chuyển trạng thái, hysteresis + cooldown, confidence thấp thì không chốt.
- Fallback: [mô phỏng thao tác chính bằng chuột / chạm / phím]; nhãn "Chế độ không dùng camera", nút Tắt camera không tải lại trang; CDN hay model lỗi thì vào thẳng chế độ này, mục tiêu học tập vẫn đủ 100%.

7. GIAO DIỆN, AN TOÀN, TIẾP CẬN
- Bố cục: Bắt đầu → Chọn số người (1/2/3) → Kiểm tra thiết bị → Hiệu chỉnh từng làn → 2 lượt luyện mẫu → KHỞI ĐỘNG → 10 giây "Em còn nhớ không?" → 12 lượt chính → Ôn câu sai → HẠ NHIỆT → Podium / Kỷ lục cá nhân → Chơi lại.
- Chữ to (đề >= 28px desktop, >= 20px điện thoại), tương phản >= 4.5:1; đúng/sai phân biệt bằng ✓ ✗ + chữ ngắn, không chỉ bằng màu; mọi âm thanh có phụ đề; hỏi "Em thuận tay nào?" lúc calibration.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng, "Chỉnh lại tư thế". Không quảng cáo, không bảng xếp hạng online; Scoreboard chỉ gồm các em đang đứng trước máy. Tab ẩn thì tự Tạm dừng, quay lại đếm 3-2-1.
- Hiệu năng: 30 FPS, particle có pool (<= 60), canvas cap devicePixelRatio 2; âm thanh bằng Web Audio API, không file mp3.
- Bộ sưu tập "miti-collection", lưới 6 ô mỗi bộ, ô chưa mở "? ? ?".
- Nhắc an toàn trước khi chơi: "Dọn vật cản khỏi vùng đứng, giữ cách tường một bước, chỉ chuyển động trong tầm tay". KHÔNG upload ảnh/video, chỉ dùng landmark trong bộ nhớ.
- Toàn bộ UI bằng TIẾNG VIỆT (chỉ học liệu tiếng Anh giữ nguyên tiếng Anh).

8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS.
- Xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang có dòng: MiTi • Học bằng chuyển động.

9. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không TODO, không pseudocode, không "...".
- Tự kiểm trước khi xuất: camera sau nút Bắt đầu · nền AR + toScreen · chọn 1/2/3 người + gán làn (+ cách nhận tay với game tay) · Scoreboard/Podium/kỷ lục + hiệu ứng · [cơ chế chính] hoạt động đúng · fallback chơi trọn · QUESTION_DATA đủ mục · localStorage ôn tập + bộ sưu tập · chữ ký MiTi · file chạy độc lập không lỗi console.
```

## Checklist trước khi nộp game mới

- [ ] Điều khiển là một trong 14 mã (10 mã catalog + `CLAP · PINCH · HOLD_POSE · FINGER_COUNT`), **không có `MIXED`**.
- [ ] Đủ 9 mục đúng thứ tự của master: Vòng lặp thu hút · Chế độ 1/2/3 người và thi đua · Chơi vận động · Ghi nhớ bài học · Ngân hàng dữ liệu · Kỹ thuật · Giao diện · Chữ ký MiTi · Đầu ra.
- [ ] Chế độ 1/2/3 người: làn dọc có màu + nhãn P1/P2/P3, gán làn theo hông/vai, Scoreboard + Podium + danh hiệu cho mọi em, thẻ đuổi kịp x2; game dùng tay có đủ ba cách nhận tay.
- [ ] Hiệu ứng có nút "Giảm hiệu ứng", nhấp nháy ≤ 3 lần/giây.
- [ ] Mục tiêu học tập cụ thể theo SGK; mỗi mục QUESTION_DATA có `errorTag` + `loiViet` khớp danh sách lỗi ở mục 4.
- [ ] Không còn `[...]`, không còn `${...}`.
- [ ] Đã chạy `node tools/build.mjs` báo đạt.
