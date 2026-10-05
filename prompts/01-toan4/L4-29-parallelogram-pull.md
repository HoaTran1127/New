# L4-29 — Kéo Hình Bình Hành

> Toán lớp 4 · Điều khiển: Kéo thả (Drag) · Cụm kiến thức: hinh-binh-hanh
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "KÉO HÌNH BÌNH HÀNH" cho học sinh Việt Nam lớp 4, môn Toán.

1. Ý TƯỞNG
- Bối cảnh: Sân khấu ảo thuật biến hình, các mảnh hình cắt rời.
- Việc của học sinh mỗi lượt: Kéo mảnh tam giác của hình bình hành ghép lại thành chữ nhật cùng diện tích.
- Điều khiển: Kéo thả (Drag). HandLandmarker, đầu ngón trỏ làm điểm kéo; có thể thêm landmark 8 giữ vật. Biên độ động tác: Đường kéo dài >= 50% bề rộng khung hình và luôn cắt qua vạch ngang thân; ô đích đặt hai bên trái phải chứ không xếp cạnh nhau.
- Không có camera thì kéo thả bằng chuột hoặc chạm màn hình rồi thả vào ô đích.
- Mascot: **Mảnh** — nhanh nhảu, thích biến hình. Ba câu thoại: khen "Thành chữ nhật rồi!" · đỡ khi sai "Mảnh này chưa khớp" · hô mở đầu "Ảo thuật, bắt đầu!".
- Bảng màu riêng: `--miti-1: #6A0572` (vật thể AR chính), `--miti-2: #F6FF71` (particle và viền hit), `--miti-3: #AB83A1` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: mảnh tam giác bay ngang hình và cả hình tự kéo thành chữ nhật cùng diện tích. Đạo cụ AR neo vào người chơi: đôi găng ảo thuật gia trên hai bàn tay, loáng sáng khi em kéo.
- Môn thể thao của game: **Kéo co** — động tác đặc trưng "Kéo dây về phía mình", hiệu lệnh "Kéo nào!", lời hay khi bạn sai "Bạn kéo khỏe lắm!", duỗi cơ cuối buổi "Duỗi lưng khi buông dây".
- Trò chơi dân gian dẫn dắt: **Kéo co** — cách chơi "Hai tay kéo dải dây về vạch", lời hô "Một hai kéo, một hai kéo", đồ dùng AR "khăn vải".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: đặc điểm hình bình hành; diện tích đáy × chiều cao; chu vi.
- Mạch kiến thức: **Hình học và đo lường** — nhãn HUD "Hình bình hành" · **Tuần 32–33 · Học kì II**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Nhận biết được đặc điểm hình bình hành; tính được chu vi và diện tích hình bình hành."
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "Đáy nhân chiều cao vuông góc, đừng dùng cạnh xiên."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "dùng cạnh bên làm chiều cao".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): dùng cạnh bên làm chiều cao; lẫn chu vi với diện tích; không đổi đơn vị hai đại lượng.
- Phạm vi: chỉ dùng nội dung Toán lớp 4 đã học; cấm số hoặc từ vựng ngoài phạm vi trên.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 4; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn Kéo co — <n> động tác" · "Con học Hình bình hành, <k> câu đúng trên <tổng>" · "Mẹo con mang về: Đáy nhân chiều cao vuông góc, đừng dùng cạnh xiên." · "Việc 3 phút ở nhà: cả nhà cùng Kéo dây về phía mình rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Kéo Hình Bình Hành, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

3. RÀNG BUỘC CỐT LÕI (thiếu bất kỳ dòng nào là hỏng)
- 1 file HTML duy nhất: `<style>` và `<script>` nội tuyến; không Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài; chỉ được tải MediaPipe (CDN + model) và font có dự phòng.
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
- Chữ ký MiTi: ô bo góc `#FFD84D` chứa chữ M màu `#07111F` + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; kèm dòng "MiTi • Học bằng chuyển động"; không xóa hay đổi tên ở chế độ không camera.
- Chỉ xuất toàn bộ file HTML hoàn chỉnh: không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không giải thích dài.

4. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }.
- Tối thiểu 30 mục, chia 3 mức độ (level 1/2/3), mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- Mục `dang: "tinh"` phải tính lại được bằng ĐÚNG MỘT phép số học trong code, mục `dang: "nhin"` kiểm bằng số học hoặc số đo hình học, không so khớp chuỗi tự do; mỗi phương án nhiễu là một kết quả thật của lỗi đã nêu, không phải số ngẫu nhiên.
- errorTag là mã máy của lỗi, lấy đúng một trong: dung_canh_ben_lam_chieu_cao, nham_chu_vi_voi_dien_tich, khong_doi_don_vi_hai_dai_luong. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: cắt một phần hình bình hành và ghép lại thành chữ nhật để thấy công thức.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp 28 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Hình bình hành có đáy 8 cm, chiều cao 5 cm. Diện tích?", choices: ["40 cm²","26 cm²","13 cm²"], answer: "40 cm²", explanation: "S = đáy × chiều cao = 8 × 5 = 40 cm². Chiều cao là khoảng cách vuông góc giữa hai đáy, không phải cạnh bên.", errorTag: "dung_canh_ben_lam_chieu_cao", dang: "tinh", loiViet: "dùng cạnh bên làm chiều cao"
  id: "q2", level: 2, prompt: "Hình bình hành đáy 12 cm, cạnh bên 7 cm. Chu vi?", choices: ["38 cm","84 cm","19 cm"], answer: "38 cm", explanation: "P = (12 + 7) × 2 = 38 cm.", errorTag: "nham_chu_vi_voi_dien_tich", dang: "nhin", loiViet: "lẫn chu vi với diện tích"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Toán lớp 4; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `hinh-binh-hanh` — đổi cluster nếu đổi dạng bài.
- Gesture: `DRAG` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
