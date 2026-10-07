# LEG-02 — AR Math Catcher

> Toán lớp 4-5 · Điều khiển: GRAB · Model: HandLandmarker
> **LEGACY (LEG-02)** — Di chuyển giỏ hứng quả mang phép tính đúng, né bom sai. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù: `catalogs/GAME_CATALOG.csv`.
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web AR một file HTML "AR MATH CATCHER" cho học sinh Việt Nam lớp 4-5, môn Toán, điều khiển bằng webcam.

1. Ý TƯỞNG
- Cơ chế gốc (giữ nguyên): Di chuyển giỏ hứng quả mang phép tính đúng, né bom sai.
- Vườn số rơi: quả mang phép tính và bom mang phép tính sai rơi tự do từ trên xuống; chiếc giỏ AR nằm sát mép dưới khung hình.
- Di chuyển cả thân và hai tay để đưa giỏ ngang qua quả ĐÚNG hứng lấy, tránh hẳn quả SAI — không thắng bằng cổ tay kề vai.
- GRAB — HandLandmarker; tâm bàn tay là miệng giỏ, trái/bàn tay kia buông tự nhiên.
- Hứng đúng: nổ hạt sao + tiếng "pop" ngắn; hứng sai: viền màn hình mờ dần 200–300 ms, dừng 2 giây hiện lời giải.
- Tỉ lệ quả đúng / bom sai ~65/35 trộn đều hai bên trái phải để không mỏi một bên.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Cộng trừ phân số cùng mẫu (lớp 4), phép tính số thập phân 1,2 + 0,8, tìm giá trị một số phần trăm, đường đi trong công thức s = v × t (lớp 5).
- Mỗi lượt một phép tính duy nhất; kết quả nằm trong phạm vi SGK đã học.
- Lỗi cần sửa: cộng cả tử lẫn mẫu khi cộng phân số; cộng lệch hàng khi tính số thập phân; nhân thay vì chia khi tìm phần trăm.
- Quả bỏ lỡ chỉ mất chuỗi, không trừ tim — vung bừa không thắng được.
- Điều kiện thắng thua: hết 5 tim là thua, đủ 12 lượt là thắng; không điểm số cạnh tranh, không xếp hạng, không timer thi đua; tổng kết ba thẻ "Làm tốt / Cần luyện / Động tác lần sau".
- Màn tổng kết thêm bốn dòng "Gửi bố mẹ" bằng số thật: môn tập + số động tác, cụm kiến thức + số câu đúng, mẹo nhớ, một việc 3 phút không màn hình ở nhà.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

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
- Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }; đề ≤16 từ, một ý duy nhất.
- Tối thiểu 30 mục chia 3 mức độ (level 1/2/3), trong đó >= 60% `dang: "nhin"` (nhìn rồi chọn); `dang: "tinh"` chỉ MỘT phép tính một bước trong phạm vi SGK; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo vị trí đáp án bằng seed theo lượt.
- errorTag lấy đúng một trong: cong_ca_tu_va_mau (cộng cả tử lẫn mẫu khi cộng phân số), cong_lech_hang_thap_phan (cộng lệch hàng số thập phân), tim_phan_tram_nham_phep (nhầm phép khi tìm phần trăm). loiViet là cụm tiếng Việt in thường cùng chỉ lỗi đó, hiển thị cho học sinh.
- Phương án nhiễu phải là kết quả của một lỗi thật trong danh sách trên, không phải số ngẫu nhiên; không được có hai đáp án cùng đúng.
- Một mục mẫu để bám theo khuôn (viết tiếp ít nhất 29 mục nữa):
  id: "q1", level: 1, prompt: "Quả nào ghi đúng kết quả?", choices: ["2/5 + 1/5 = 3/5","2/5 + 1/5 = 3/10","2/5 + 1/5 = 2/5"], answer: "2/5 + 1/5 = 3/5", explanation: "Cộng hai phân số cùng mẫu: giữ nguyên mẫu, cộng tử 2 + 1 = 3, được 3/5.", errorTag: "cong_ca_tu_va_mau", dang: "tinh", loiViet: "cộng cả tử lẫn mẫu khi cộng phân số"
- Phạm vi dữ liệu: chỉ dùng số trong phạm vi Toán lớp 4-5 đã học; không số âm ngoài phạm vi, không chia cho 0.
- Viết kèm hàm `verifyQuestionBank()` chạy một lần trước vòng chơi: answer phải có trong choices đúng một lần; explanation/loiViet khác rỗng; không trùng prompt; mỗi level chiếm tối thiểu 1/4 số mục; mục trượt bị loại kèm console.warn nêu id bằng tiếng Việt.

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi).
- Riêng ngân hàng: đủ 30 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài phạm vi trên; câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- LEG-02 thuộc dòng prompt đời đầu: giữ cơ chế gốc, dùng ràng buộc cốt lõi hiện hành của `tools/lib/core.mjs`; mọi phụ thuộc cũ bị cấm đã được thay thế.
- Muốn đổi ý tưởng hoặc cơ chế: sửa khối INFO trong `tools/upgrade-legacy.mjs` rồi chạy `node tools/upgrade-legacy.mjs`.
- Muốn đổi quy định chung cho mọi game (kể cả 12 file này): sửa `tools/lib/core.mjs` rồi chạy lại script.
