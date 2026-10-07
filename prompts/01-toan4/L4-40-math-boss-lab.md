# L4-40 — Phòng Boss Toán

> Toán lớp 4 · Điều khiển: Vung tay đấm (Punch) · Cụm kiến thức: boss-cong-thu
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "PHÒNG BOSS TOÁN" cho học sinh Việt Nam lớp 4, môn Toán.

1. Ý TƯỞNG
- Bối cảnh: Trạm cuối năm, mỗi boss là một chủ đề lớn của Toán 4.
- Việc của học sinh mỗi lượt: Đấm chuỗi đáp án đúng qua ba giai đoạn, mỗi giai đoạn được một lần dùng gợi ý.
- Điều khiển: Vung tay đấm (Punch). HandLandmarker: vị trí cổ tay (landmark 0) và mũi (landmark 15) để tính hướng đấm; độ gập các ngón để xác nhận nắm tay. Biên độ động tác: Đấm đổi tầm liên tục (trên vai – ngang ngực – dưới thắt lưng); cú đấm đi hết tay từ thế thủ trước ngực tới vật nằm sát mép khung.
- Không có camera thì click vào vật để mô phỏng cú đấm; rê chuột lên vật không được tính.
- Mascot: **Giai Ba** — lì lợm, biết chờ thời cơ. Ba câu thoại: khen "Boss mất một giai đoạn!" · đỡ khi sai "Còn gợi ý, dùng đi em" · hô mở đầu "Giao chiến, bắt đầu!".
- Bảng màu riêng: `--miti-1: #1B263B` (vật thể AR chính), `--miti-2: #F1FAEE` (particle và viền hit), `--miti-3: #FF5959` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: boss quỳ xuống, cả phòng hiện lời giải từng bước rồi pháo giấy nổ một lần. Đạo cụ AR neo vào người chơi: thanh máu boss trên đầu em, vơi theo từng giai đoạn.
- Môn thể thao của game: **Boxing** — động tác đặc trưng "Đấm về phía trước", hiệu lệnh "Một — hai!", lời hay khi bạn sai "Bạn ra đòn gọn!", duỗi cơ cuối buổi "Duỗi ngực và vai mở".
- Trò chơi dân gian dẫn dắt: **Ném còn** — cách chơi "Đẩy tay hất quả còn qua vòng", lời hô "Một hai ba, ném!", đồ dùng AR "vòng tròn".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: trận boss tổng hợp: 3 giai đoạn tăng độ khó với kiến thức đã học trong chương.
- Mạch kiến thức: **Ôn tập tổng hợp** — nhãn HUD "Trận boss tổng hợp" · **Tuần 32–35 · Học kì II**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Vận dụng tổng hợp kiến thức đã học trong chương qua ba giai đoạn tăng độ khó."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Hít một nhịp rồi mới chọn đáp án."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "nóng vội khi độ khó tăng".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): nóng vội khi độ khó tăng; quên chiến lược đã học; chọn đáp án khi chưa đủ thời gian nghĩ.
- Phạm vi: chỉ dùng nội dung Toán lớp 4 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 4; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Boxing — <n> động tác" · "Con học Trận boss tổng hợp, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Hít một nhịp rồi mới chọn đáp án." · "Việc 3 phút ở nhà: cả nhà cùng Đấm về phía trước rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Phòng Boss Toán, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- errorTag là mã máy của lỗi, lấy đúng một trong: muc_kho_cao_gay_sot, quen_chi_luoc, thieu_thoi_gian_suy_nghi. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: sau mỗi giai đoạn cho chọn 1 gợi ý miễn phí rồi mới tái hiện câu sai.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 28 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Giai đoạn 1: Tính 125 × 8.", choices: ["1 000","1 0000","960"], answer: "1 000", explanation: "125 × 8 = 1000 vì 125 × 4 = 500 rồi × 2.", errorTag: "quen_chi_luoc", dang: "tinh", loiViet: "quên chiến lược đã học"
  id: "q2", level: 2, prompt: "Giai đoạn 2: Diện tích hình thoi có hai đường chéo 10 cm và 6 cm.", choices: ["30 cm²","60 cm²","16 cm²"], answer: "30 cm²", explanation: "(10 × 6) : 2 = 30 cm²; giai đoạn này kiểm tra việc nhớ chia 2.", errorTag: "quen_chi_luoc", dang: "nhin", loiViet: "quên chiến lược đã học"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Toán lớp 4; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `boss-cong-thu` — đổi cluster nếu đổi dạng bài.
- Gesture: `PUNCH` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
