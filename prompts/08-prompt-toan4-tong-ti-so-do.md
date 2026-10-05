# LEG-08 — Bí Ẩn Sơ Đồ Đoạn Thẳng

> Toán lớp 4 · Điều khiển: TWO_HAND_STRETCH+PUNCH · Model: PoseLandmarker
> **LEGACY (LEG-08)** — Sơ đồ đoạn thẳng động cho toán tổng – tỉ số. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù: `catalogs/GAME_CATALOG.csv`.
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web AR một file HTML "BÍ ẨN SƠ ĐỒ ĐOẠN THẲNG" cho học sinh Việt Nam lớp 4, môn Toán, điều khiển bằng webcam.

1. Ý TƯỞNG
- Cơ chế gốc (giữ nguyên): Sơ đồ đoạn thẳng động cho toán tổng – tỉ số.
- Toán có lời văn dạng "Tìm hai số khi biết tổng và tỉ số": mỗi màn là một tình huống thật (thu gom giấy vụn, trồng cây) với sơ đồ đoạn thẳng động.
- Sơ đồ hiện hai thanh chia ô bằng nhau (ví dụ tổ 1: 2 ô, tổ 2: 3 ô, tổng 45 kg); em đọc ngay tổng số phần.
- Giai đoạn 1 — TWO_HAND_STRETCH: dang hai tay kéo dãn sơ đồ để kích hoạt bài toán; giai đoạn 2 — PUNCH: đấm quả cầu năng lượng mang đáp án đúng (1 phần / số bé / số lớn).
- Ba quả cầu gồm 1 đáp án đúng và 2 quả bẫy mô phỏng lỗi thật (lấy tổng chia cho hiệu, quên chia số phần).
- Đấm nhầm: màn rạn nhẹ, dừng 2 giây hiện từng bước sơ đồ — mỗi bước một dòng, đúng dạng bài.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Giải bài toán tìm hai số khi biết tổng và tỉ số (lớp 4), các số trong phạm vi SGK; mở rộng tổng–hiệu ở level 3.
- Thứ tự bắt buộc: vẽ sơ đồ → tìm tổng số phần bằng nhau → tìm giá trị một phần → tìm hai số.
- Lỗi cần sửa: lấy tổng chia hiệu; đếm sai số phần trên sơ đồ; ra hai số mà quên thử lại tổng.
- Sơ đồ đoạn thẳng phải vẽ lại nguyên văn trong lời giải; engine dựng sẵn các bước, em chỉ làm bước cuối.
- Điều kiện thắng thua: hết 5 tim là thua, đủ 12 lượt là thắng; không điểm số cạnh tranh, không xếp hạng, không timer thi đua; tổng kết ba thẻ "Làm tốt / Cần luyện / Động tác lần sau".
- Màn tổng kết thêm bốn dòng "Gửi bố mẹ" bằng số thật: môn tập + số động tác, cụm kiến thức + số câu đúng, mẹo nhớ, một việc 3 phút không màn hình ở nhà.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }; đề ≤16 từ, một ý duy nhất.
- Tối thiểu 30 mục chia 3 mức độ (level 1/2/3), trong đó >= 60% `dang: "nhin"` (nhìn rồi chọn); `dang: "tinh"` chỉ MỘT phép tính một bước trong phạm vi SGK; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo vị trí đáp án bằng seed theo lượt.
- errorTag lấy đúng một trong: tong_chia_hieu (lấy tổng chia hiệu thay vì chia số phần), dem_sai_so_phan (đếm sai số phần trên sơ đồ), thieu_thu_lai (tìm hai số mà quên thử lại tổng). loiViet là cụm tiếng Việt in thường cùng chỉ lỗi đó, hiển thị cho học sinh.
- Phương án nhiễu phải là kết quả của một lỗi thật trong danh sách trên, không phải số ngẫu nhiên; không được có hai đáp án cùng đúng.
- Một mục mẫu để bám theo khuôn (viết tiếp ít nhất 29 mục nữa):
  id: "q1", level: 1, prompt: "Tổng 45 kg, tổ 1 bằng 2/3 tổ 2. Một phần là?", choices: ["9 kg","45 : 2 = 22 kg","45 − 3 = 42 kg"], answer: "9 kg", explanation: "Tổng số phần bằng nhau: 2 + 3 = 5. Một phần: 45 : 5 = 9 kg.", errorTag: "dem_sai_so_phan", dang: "tinh", loiViet: "đếm sai số phần trên sơ đồ"
- Phạm vi dữ liệu: chỉ dùng số trong phạm vi Toán lớp 4 đã học; không số âm ngoài phạm vi, không chia cho 0.
- Viết kèm hàm `verifyQuestionBank()` chạy một lần trước vòng chơi: answer phải có trong choices đúng một lần; explanation/loiViet khác rỗng; không trùng prompt; mỗi level chiếm tối thiểu 1/4 số mục; mục trượt bị loại kèm console.warn nêu id bằng tiếng Việt.

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi).
- Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài phạm vi trên; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- LEG-08 thuộc dòng prompt đời đầu: giữ cơ chế gốc, dùng ràng buộc cốt lõi hiện hành của `tools/lib/core.mjs`; mọi phụ thuộc cũ bị cấm đã được thay thế.
- Muốn đổi ý tưởng hoặc cơ chế: sửa khối INFO trong `tools/upgrade-legacy.mjs` rồi chạy `node tools/upgrade-legacy.mjs`.
- Muốn đổi quy định chung cho mọi game (kể cả 12 file này): sửa `tools/lib/core.mjs` rồi chạy lại script.
