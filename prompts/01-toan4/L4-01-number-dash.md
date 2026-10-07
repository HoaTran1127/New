# L4-01 — Đường Đua Hàng Số

> Toán lớp 4 · Điều khiển: Chỉ ngón tay trỏ (Point) · Cụm kiến thức: hang-so
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "ĐƯỜNG ĐUA HÀNG SỐ" cho học sinh Việt Nam lớp 4, môn Toán.

ƯU TIÊN theo đúng thứ tự: (1) học sinh đạt mục tiêu học tập ở mục 2; (2) điều khiển AR ở mục 1 nhận diện được thật và fallback chuột chơi đủ 100%; (3) phần còn lại. File chật thì làm đơn giản chi tiết trang trí, không cắt mục 2 và mục 3.

1. Ý TƯỞNG
- Bối cảnh: Đường đua ba làn trong thành phố số, mỗi làn là một dãy thẻ số.
- Việc của học sinh mỗi lượt: Chỉ ngón tay chọn làn chứa số đúng theo yêu cầu về hàng và giá trị.
- Điều khiển: Chỉ ngón tay trỏ (Point). MediaPipe Tasks Vision HandLandmarker, đầu ngón trỏ landmark 8 làm con trỏ. Biên độ động tác: Ngón trỏ đi bằng cả cẳng tay: đáp án đặt ở bốn góc khác nhau của khung hình nên mỗi lượt là một lần duỗi khuỷu đổi hướng, không phải nhấc ngón ngay trước ngực.
- Không có camera thì chạm hoặc click vào đáp án thay cho con trỏ ngón tay, giữ 400ms để chốt như khi giữ tay.
- Mascot **Út Nitro** (sốt sắng, hô to trước mỗi cú phóng) — khen "Về đích quá đỉnh!", hô mở đầu "Ba hai một, phóng!". Bảng màu: `--miti-1: #E63946` (vật thể AR), `--miti-2: #2A9D8F` (particle, viền hit), `--miti-3: #FFD166` (HUD).
- Không khí giờ chơi (trang trí, được phép làm đơn giản): thể thao **Bắn cung** ("Giương tay chỉ đích", hạ nhiệt "Duỗi vai và cổ tay") · dân gian **Chi chi chành chành** (đồ dùng AR "vạch phấn") · khoảnh khắc chữ ký ba làn số cùng sáng đèn rồi đổ về vạch đích thành một vệt sáng · đạo cụ AR neo vào người chơi "cờ đích nhỏ sau vai phải, vẫy khi chuỗi đúng đạt 3".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: số tự nhiên đến 100000 và 1000000; giá trị theo hàng; viết dưới dạng tổng các hàng; số có chữ số 0 ở hàng trung gian.
- Mạch kiến thức: **Số và phép tính** — nhãn HUD "Số tự nhiên" · **Tuần 1–2 · Học kì I**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Đọc, viết được số tự nhiên đến 100000 và 1000000; xác định được giá trị của mỗi chữ số theo hàng."
- Mẹo nhớ (bật ở cú đúng đầu cụm và sau câu sai cùng lỗi, mascot đọc to + làm mẫu 3 giây): "Hàng nào chữ số đó, chữ 0 ở giữa vẫn phải viết."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "bỏ sót hàng ở giữa khi viết số".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): bỏ sót hàng ở giữa khi viết số; nhầm chữ số hai hàng gần nhau; đọc sai giá trị chữ số theo hàng.
- Phạm vi: chỉ dùng nội dung Toán lớp 4 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 4; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; khối "Gửi bố mẹ" bốn dòng điền số thật: "<n> động tác môn Bắn cung" · "Số tự nhiên: <k>/<tổng> câu đúng" · "Mẹo con mang về: Hàng nào chữ số đó, chữ 0 ở giữa vẫn phải viết." · "Việc 3 phút ở nhà: cả nhà cùng Giương tay chỉ đích".
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Đường Đua Hàng Số, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- Tối thiểu 30 mục, chia 3 mức độ (level 1/2/3), mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- Mục `dang: "tinh"` phải tính lại được bằng ĐÚNG MỘT phép số học trong code, mục `dang: "nhin"` kiểm bằng số học hoặc số đo hình học, không so khớp chuỗi tự do; mỗi phương án nhiễu là một kết quả thật của lỗi đã nêu, không phải số ngẫu nhiên.
- errorTag là mã máy của lỗi, lấy đúng một trong: thieu_hang_trong, doi_chou_hai_hang, doc_nham_hang. loiViet là cụm tiếng Việt in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, là thứ hiển thị cho học sinh; mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: phóng to chữ số đang xét trên bảng lớp số (hàng đơn vị → hàng triệu) và tô màu hàng được hỏi.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 28 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Số nào có chữ số 7 ở hàng chục nghìn?", choices: ["748 560","174 560","480 756"], answer: "748 560", explanation: "Ở 748 560 chữ số 7 đứng hàng chục nghìn vì đếm từ phải sang: 0-đơn vị, 6-chục, 5-trăm, 8-nghìn, 4-chục nghìn, 7-trăm nghìn. Số còn lại 174 560 có 7 ở hàng nghìn.", errorTag: "doc_nham_hang", dang: "nhin", loiViet: "đọc sai giá trị chữ số theo hàng"
  id: "q2", level: 2, prompt: "Số gồm 3 trăm nghìn, 5 chục nghìn, 2 trăm, 4 chục, 1 đơn vị là?", choices: ["350 241","352 241","305 241"], answer: "350 241", explanation: "Hàng nghìn bằng 0 nên vẫn phải viết chữ số 0 ở vị trí đó: 3-5-0 / 2-4-1.", errorTag: "thieu_hang_trong", dang: "nhin", loiViet: "bỏ sót hàng ở giữa khi viết số"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Toán lớp 4; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `hang-so` — đổi cluster nếu đổi dạng bài.
- Gesture: `POINT` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
