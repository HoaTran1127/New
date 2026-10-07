# L4-23 — Đua Phân Số

> Toán lớp 4 · Điều khiển: Vuốt / chém (Swipe) · Cụm kiến thức: phan-so-bang-nhau
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "ĐUA PHÂN SỐ" cho học sinh Việt Nam lớp 4, môn Toán.

1. Ý TƯỞNG
- Bối cảnh: Đường đua trên trục số, hai vận động viên là hai phân số.
- Việc của học sinh mỗi lượt: Vuốt sang phía phân số lớn hơn hoặc bé hơn theo yêu cầu từng lượt.
- Điều khiển: Vuốt / chém (Swipe). HandLandmarker, đường đi của đầu ngón trỏ (landmark 8) trong 5–8 khung hình gần nhất tạo thành vệt kiếm. Biên độ động tác: Chém từ vai bằng cả cánh tay, vệt cắt dài >= 60% tầm với và đổi độ cao nhát chém giữa các lượt; nhát hất bằng cổ tay không đủ ngưỡng tốc độ.
- Không có camera thì kéo chuột hoặc vuốt màn hình nhanh qua vật để tạo nhát chém.
- Mascot: **Rùa Nhanh** — tự tin vừa đủ. Ba câu thoại: khen "Về trước rồi!" · đỡ khi sai "Nhìn lại trục số đi" · hô mở đầu "Hai một, xuất phát!".
- Bảng màu riêng: `--miti-1: #FF9F1C` (vật thể AR chính), `--miti-2: #2EC4B6` (particle và viền hit), `--miti-3: #011627` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: hai vận động viên cùng chạy tới đúng vị trí trên trục số rồi vẫy tay với em. Đạo cụ AR neo vào người chơi: bảng tên vận động viên trên lưng em, đổi khi em vuốt.
- Môn thể thao của game: **Bóng bàn** — động tác đặc trưng "Quét vợt sang hai bên", hiệu lệnh "Giao bóng!", lời hay khi bạn sai "Bạn đánh bóng mạnh!", duỗi cơ cuối buổi "Xoay cổ tay nhẹ nhàng".
- Trò chơi dân gian dẫn dắt: **Kéo cưa lừa xẻ** — cách chơi "Hai tay đẩy kéo đều theo vạch", lời hô "Kéo cưa lừa xẻ, ông thợ nào khỏe", đồ dùng AR "gậy tre".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: rút gọn phân số; phân số bằng nhau; hai cách biểu diễn của cùng một giá trị.
- Mạch kiến thức: **Số và phép tính** — nhãn HUD "Phân số bằng nhau" · **Tuần 24–25 · Học kì II**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Rút gọn được phân số; nhận biết được hai phân số bằng nhau và giải thích được bằng hình."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Nhân chia tử với mẫu cùng một số."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "nhân tử mà không nhân mẫu".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): nhân tử mà không nhân mẫu; rút gọn chưa đến số tối giản; coi gần bằng là bằng nhau.
- Phạm vi: chỉ dùng nội dung Toán lớp 4 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 4; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Bóng bàn — <n> động tác" · "Con học Phân số bằng nhau, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Nhân chia tử với mẫu cùng một số." · "Việc 3 phút ở nhà: cả nhà cùng Quét vợt sang hai bên rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Đua Phân Số, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- errorTag là mã máy của lỗi, lấy đúng một trong: nhan_chia_tu_ma_khong_cung_so, rut_gon_chua_het, nham_phan_so_bang_nhau_voi_gan_bang. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: thanh phân số trượt: hai thanh bằng nhau khi tô trùng chiều dài.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 28 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Rút gọn 18/24 được phân số tối giản?", choices: ["3/4","9/12","6/8"], answer: "3/4", explanation: "Chia cả tử và mẫu cho ƯCLN(18, 24) = 6 → 3/4. 9/12 và 6/8 vẫn rút gọn tiếp được nên chưa tối giản.", errorTag: "rut_gon_chua_het", dang: "tinh", loiViet: "rút gọn chưa đến số tối giản"
  id: "q2", level: 2, prompt: "Phân số nào bằng 2/5?", choices: ["4/10","2/10","5/2"], answer: "4/10", explanation: "Nhân cả tử và mẫu của 2/5 với 2 được 4/10. 2/10 rút gọn thành 1/5, còn 5/2 là phân số đảo ngược.", errorTag: "nhan_chia_tu_ma_khong_cung_so", dang: "nhin", loiViet: "nhân tử mà không nhân mẫu"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Toán lớp 4; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `phan-so-bang-nhau` — đổi cluster nếu đổi dạng bài.
- Gesture: `SWIPE` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
