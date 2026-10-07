# L4-09 — Kiến Trúc Sư Laser

> Toán lớp 4 · Điều khiển: Khom hai tay (Two-hand stretch) · Cụm kiến thức: vuong-goc-song-song
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "KIẾN TRÚC SƯ LASER" cho học sinh Việt Nam lớp 4, môn Toán.

1. Ý TƯỞNG
- Bối cảnh: Công trường laser nơi các tia sáng cắt nhau tạo thành công trình.
- Việc của học sinh mỗi lượt: Kéo giãn hai tay để chỉnh hai tia laser vuông góc hoặc song song theo nhiệm vụ.
- Điều khiển: Khom hai tay (Two-hand stretch). HandLandmarker hai tay hoặc PoseLandmarker hai cổ tay (15, 16) để đo khoảng cách và góc giữa hai tay. Biên độ động tác: Khoảng cách hai tay mục tiêu trải từ 40% đến 100% tầm sải đã đo, mỗi lượt đổi mốc để học sinh dang hết tay rồi khép lại.
- Không có camera thì kéo hai điểm neo bằng chuột hoặc hai ngón trên màn cảm ứng.
- Mascot: **Tia Laser** — tỉ mỉ, hay nheo mắt. Ba câu thoại: khen "Tia thẳng hàng!" · đỡ khi sai "Vuông góc hơn chút đi" · hô mở đầu "Giăng hai tay ra!".
- Bảng màu riêng: `--miti-1: #EF476F` (vật thể AR chính), `--miti-2: #06D6A0` (particle và viền hit), `--miti-3: #118AB2` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: hai tia laser cắt nhau thành khung nhà hoàn chỉnh rồi bật đèn trong hai giây. Đạo cụ AR neo vào người chơi: găng phát tia gắn mu bàn tay, sáng khi hai tay cách nhau.
- Môn thể thao của game: **Bơi lội** — động tác đặc trưng "Khai tay bơi tại chỗ", hiệu lệnh "Bơi nào!", lời hay khi bạn sai "Bạn bơi đều tay!", duỗi cơ cuối buổi "Duỗi lưng bơi ếch đứng".
- Trò chơi dân gian dẫn dắt: **Chim bay cò bay** — cách chơi "Dang hai tay làm cánh đưa lên cao", lời hô "Chim bay cò bay", đồ dùng AR "vạch phấn".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: hai đường thẳng vuông góc, song song; kẻ đường vuông góc; nhận diện trong thực tế.
- Mạch kiến thức: **Hình học và đo lường** — nhãn HUD "Hai đường thẳng" · **Tuần 9–10 · Học kì I**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Nhận biết được hai đường thẳng vuông góc, song song; kẻ được đường thẳng vuông góc qua một điểm."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Song song không gặp nhau dù kéo dài."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "kết luận song song khi chưa kéo dài hai đường".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): kết luận song song khi chưa kéo dài hai đường; kẻ đường đi lệch đỉnh; lẫn vuông góc với thẳng hàng.
- Phạm vi: chỉ dùng nội dung Toán lớp 4 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 4; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Bơi lội — <n> động tác" · "Con học Hai đường thẳng, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Song song không gặp nhau dù kéo dài." · "Việc 3 phút ở nhà: cả nhà cùng Khai tay bơi tại chỗ rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Kiến Trúc Sư Laser, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- errorTag là mã máy của lỗi, lấy đúng một trong: keo_dai_nghi_la_song_song, qua_tam_dinh_khi_ke, nham_vuong_goc_voi_thang. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: kéo dài hai đường thành dải sáng để thấy chúng cắt nhau hay không cắt nhau.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 28 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Hai đường không cắt nhau dù kéo dài về hai phía thì quan hệ là?", choices: ["Song song","Vuông góc","Cắt nhau"], answer: "Song song", explanation: "Song song là không bao giờ cắt nhau; vuông góc là cắt nhau tạo góc 90°.", errorTag: "keo_dai_nghi_la_song_song", dang: "nhin", loiViet: "kết luận song song khi chưa kéo dài hai đường"
  id: "q2", level: 2, prompt: "Đường thẳng qua O trên d, cắt d tạo góc 90° gọi là gì?", choices: ["Đường vuông góc với d","Đường song song với d","Đường chéo"], answer: "Đường vuông góc với d", explanation: "Vì đi qua O và cắt d tại góc vuông nên d’ được gọi là đường vuông góc với d.", errorTag: "qua_tam_dinh_khi_ke", dang: "nhin", loiViet: "kẻ đường đi lệch đỉnh"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Toán lớp 4; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `vuong-goc-song-song` — đổi cluster nếu đổi dạng bài.
- Gesture: `TWO_HAND_STRETCH` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: PoseLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
