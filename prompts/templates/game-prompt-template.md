# Biểu mẫu prompt game mới — MiTi

> Điền mọi ô `[...]` rồi copy khối `text` dán vào **Google Gemini (chế độ Canvas)**. Đây là bản gọn (2026-10-05): prompt chỉ còn Ý TƯỞNG + MỤC TIÊU + 14 dòng ràng buộc cốt lõi, trần 15 KB.
>
> Thêm game vào thư viện (để hiện trên dashboard): thêm một dòng vào `tools/data/games.mjs` (game Tiếng Anh phải có `id` mở đầu bằng `ST-`/`MV-`/`FY-`, kèm `slug`, danh sách `topics` lấy trong `YLE_TOPIC_KEYS` và `lop` 4 hoặc 5), có `EXAMPLES_YLE['BAND:cluster']` và `identities.mjs`, rồi chạy `node tools/build-catalog.mjs && node tools/build-prompts.mjs`, không sửa tay file prompt đã sinh.

```text
Tạo game giáo dục web "[GAME NAME]" cho học sinh Việt Nam lớp [GRADE], môn [Toán | Tiếng Anh] (Tiếng Anh: band Cambridge [Pre A1 Starters | A1 Movers | A2 Flyers]).

ƯU TIÊN theo đúng thứ tự: (1) học sinh đạt mục tiêu học tập ở mục 2; (2) điều khiển AR ở mục 1 nhận diện được thật và fallback chuột chơi đủ 100%; (3) phần còn lại. File chật thì làm đơn giản chi tiết trang trí, không cắt mục 2 và mục 3.

1. Ý TƯỞNG
- Bối cảnh: [SETTING — một cảnh có thật ở sân trường/lớp học Việt Nam, không phải lâu đài xài chung của mọi game]
- Việc của học sinh mỗi lượt: [PLAYER MISSION — một hành động, một quyết định]
- Điều khiển: [GESTURE VI] — [landmark nào làm con trỏ]; biên độ: [động tác rộng cả tay và thân]
- Không có camera thì [FALLBACK — mô phỏng đúng hành động chính]
- Mascot **[MASCOT]** ([tính cách]) — khen "[...]" · hô mở đầu "[...]". Bảng màu riêng: `--miti-1: [#hex]` (vật thể AR chính), `--miti-2: [#hex]` (particle và viền hit), `--miti-3: [#hex]` (HUD).
- Không khí giờ chơi (trang trí, được phép làm đơn giản): thể thao **[MÔN]** (động tác đặc trưng "[...]", duỗi cơ hạ nhiệt "[...]") · dân gian **[TRÒ]** (đồ dùng AR "[...]") · khoảnh khắc chữ ký [hiệu ứng chỉ có ở game này] · đạo cụ AR neo vào người chơi [vật ảo gắn vào landmark cơ thể].
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: [LEARNING OBJECTIVE — lấy nguyên văn nội dung chương trình].
- Band Cambridge (chỉ game Tiếng Anh): [Pre A1 Starters · 541 từ | A1 Movers · 930 từ | A2 Flyers · 1.431 từ] — dải từ tích luỹ tới band theo wordlist Cambridge 2025 (`tools/data/yle.mjs`) + 8 cấu trúc ngữ pháp của band; ưu tiên từ thuộc chủ đề [KEY topic trong `tools/data/yle.mjs`].
- Mạch kiến thức: **[MẠCH]** — nhãn HUD "[NHÃN NGẮN]" · **Tuần [a]–[b] · [Học kì I | Học kì II]**. In nguyên văn hai nhãn này ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "[YÊU CẦU CẦN ĐẠT]"
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "[...]"
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "[...]"
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): [2–4 lỗi, tiếng Việt có dấu, ngăn bằng "; "].
- errorTag của từng lỗi (mã máy viết thường, không dấu, không khoảng trắng): [danh sách mã].
- Phạm vi: chỉ dùng nội dung [môn] lớp [grade] đã học; game Tiếng Anh phải nằm trong đúng band đã chọn; cấm số hoặc từ vựng ngoài phạm vi trên.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật ở trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ".
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề [GAME NAME], lưu localStorage key "miti-collection", có màn "Sưu tập của em".

3. RÀNG BUỘC CỐT LÕI (thiếu bất kỳ dòng nào là hỏng)
- 1 file HTML duy nhất: `<style>`/`<script>` nội tuyến; không Tailwind Play CDN, không .css/.js/.json/mp3 ngoài; đồ hoạ VẼ BẰNG SVG INLINE / CSS / CANVAS 2D do code tự sinh (mascot, nền, đạo cụ là hình vector chi tiết đúng bảng màu, không dùng file ảnh ngoài); cấm bịa URL ảnh, cấm base64, cấm emoji thay ảnh; chỉ tải MediaPipe (CDN + model) và font có dự phòng.
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
- Tối thiểu [30 mục Toán · 60 mục Tiếng Anh], chia 3 mức độ (level 1/2/3), mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- errorTag lấy đúng một trong các mã ở mục 2; loiViet là cụm tiếng Việt có dấu in thường, nguyên văn một mục trong danh sách lỗi, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- [Toán] mục `dang: "tinh"` phải tính lại được bằng ĐÚNG MỘT phép số học trong code, mục `dang: "nhin"` kiểm bằng số học hoặc số đo hình học; không so khớp chuỗi tự do.
- [Tiếng Anh] mỗi mục có từ hoặc câu tiếng Anh, gợi nghĩa tiếng Việt, phiên âm khi phù hợp, audio bằng window.speechSynthesis; đáp án là chuỗi cố định.
- Khi học sinh sai, [gợi ý hiển thị: phóng to/tô đúng vị trí sai trong đề].
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp cho đủ số mục tối thiểu):
  id: "q1", level: 1, prompt: "...", choices: ["...","...","..."], answer: "...", explanation: "...", errorTag: "...", dang: "nhin", loiViet: "..."

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ số mục tối thiểu, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài phạm vi lớp đã nêu; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Kiểm của tác giả trước khi gửi Gemini

- [ ] Không còn ô `[...]` nào.
- [ ] Mục 1 có bối cảnh, mascot, 3 mã hex, môn thể thao, trò chơi dân gian riêng — khác với game bên cạnh.
- [ ] Mục 2 ghi nguyên văn yêu cầu cần đạt của chương trình và đúng nhãn tuần.
- [ ] `errorTag` của câu mẫu nằm trong danh sách mã ở mục 2 (build sẽ cảnh báo lệch, xem `node tools/build-prompts.mjs`).
- [ ] File prompt ≤ 15 KB (`tools/validate.mjs` báo đỏ nếu vượt).
- [ ] Nguồn của mọi quy định chung là `tools/lib/core.mjs` — không dán thêm quy định dài vào prompt.
