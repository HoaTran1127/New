# L4-06 — Xưởng Diện Tích

> Toán lớp 4 · Điều khiển: Khom hai tay (Two-hand stretch) · Cụm kiến thức: dien-tich-don-vi
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "XƯỞNG DIỆN TÍCH" cho học sinh Việt Nam lớp 4, môn Toán.
Toàn bộ game nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

1. HỌC TẬP
- Mục tiêu học tập: cm², dm², m²; đếm ô vuông để tính diện tích; diện tích hình chữ nhật, vuông.
- Nhiệm vụ của học sinh trong mỗi lượt: Khom hai tay để căng một hình chữ nhật có đúng số ô vuông yêu cầu.
- Phạm vi kiến thức: chỉ dùng nội dung Toán lớp 4 đã học. Cấm ra đề vượt chương trình, cấm số hoặc từ vựng ngoài phạm vi trên.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): đếm ô dang dở sai; lẫn diện tích với chu vi; thiếu đơn vị mét vuông.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. BỐI CẢNH VÀ VÒNG CHƠI
- Bối cảnh: Xưởng xây dựng với lưới ô vuông 1cm.
- Cơ chế chính: Khom hai tay (Two-hand stretch). Nhiệm vụ hiển thị bằng một dòng chữ to trên HUD, không cần đọc hướng dẫn.
- Độ dài: 12 lượt chính. Tăng độ khó ở lượt 5 và lượt 9 (thêm bước trung gian hoặc rút ngắn thời gian suy nghĩ).
- Điểm: +10 nhân chuỗi trả lời đúng. Sai không phạt bằng cách biến mất kiến thức: vẫn hiện lời giải đầy đủ.
- Điều kiện thua: hết 5 tim (mỗi đáp án sai trừ 1 tim). Điều kiện thắng: hết 12 lượt, hiện tổng kết.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 4.

3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet }.
- Tối thiểu 40 mục, chia 3 mức độ (level 1/2/3), mỗi mục có một đáp án đúng duy nhất kiểm chứng được bằng code.
- Đáp án phải tính lại được bằng số học trong code, không so khớp chuỗi tự do; mỗi phương án nhiễu là một kết quả thật của lỗi đã nêu, không phải số ngẫu nhiên.
- errorTag là mã máy của lỗi, lấy đúng một trong các nhãn: dem_o_chuong_lac, nham_chu_vi_thanh_dien_tich, thieu_don_vi_vuong. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 1, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt; không để đáp án đúng luôn ở một vị trí.
- Trước khi viết engine, liệt kê trong comment 3 mục theo đúng khuôn rồi mới viết trọn mảng.
- Hai mục mẫu để bám theo khuôn (viết tiếp 38 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Hình chữ nhật 7 cm × 4 cm có diện tích bao nhiêu?", choices: ["28 cm²","22 cm²","28 cm"], answer: "28 cm²", explanation: "7 × 4 = 28 ô vuông 1 cm². 22 cm là chu vi (7+4)×2 — đừng nhầm hai đại lượng.", errorTag: "nham_chu_vi_thanh_dien_tich", loiViet: "lẫn diện tích với chu vi"
  id: "q2", level: 2, prompt: "Đếm lưới: hình tô phủ 14 ô vuông 1 cm² và 4 nửa ô. Diện tích?", choices: ["16 cm²","18 cm²","14 cm²"], answer: "16 cm²", explanation: "4 nửa ô ghép thành 2 ô nguyên; 14 + 2 = 16 cm².", errorTag: "dem_o_chuong_lac", loiViet: "đếm ô dang dở sai"

4. CAMERA VÀ GESTURE
- MediaPipe Tasks Vision, pin phiên bản: import từ https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs
  wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm
  model: https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task (PoseLandmarker)
- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }). Khung hình 4:3; nếu camera cho tỉ lệ khác thì crop về vùng vẽ cố định, không để giãn hình làm sai tọa độ. Lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU. Trạng thái bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Có khung định vị/calibration để học sinh biết đặt tay hoặc đứng ở đâu.
- Cử chỉ chính — Khom hai tay (Two-hand stretch): HandLandmarker hai tay hoặc PoseLandmarker hai cổ tay (15, 16) để đo khoảng cách và góc giữa hai tay.
- Điều kiện chốt đáp án (hit): Gameplay đọc khoảng cách giữa hai tay (chiều rộng) và/hoặc góc tạo bởi hai cánh tay; kết quả chỉ chốt khi học sinh GIỮ tư thế ổn định (độ lệch dưới ngưỡng) trong 1.5–2 giây.
- Làm mượt và chống spam: Lấy trung bình trượt 5 khung hình của khoảng cách; không chốt khi một tay bị mất landmark.
- Ngưỡng tin cậy: Hiện thanh tiến trình "giữ nguyên" khi đang căn chỉnh; sai quá ngưỡng thì thanh tụt về 0.
- Phản hồi hình ảnh cho người chơi: Hai điểm neo bám hai bàn tay, đường nối đổi màu khi đạt yêu cầu.
- Cử chỉ chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim.
- Confidence thấp thì không chốt đáp án.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi tự chuyển sang chế độ không camera, game vẫn chơi đủ.

5. FALLBACK (bắt buộc)
- Mouse / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính: kéo hai điểm neo bằng chuột hoặc hai ngón trên màn cảm ứng.
- Có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng, không cần tải lại trang.
- Mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.

6. PHẢN HỒI HỌC TẬP
- Đúng: phản hồi tích cực ngay (âm thanh vui + hạt sáng) và một dòng ghi nhớ ngắn.
- Sai: DỪNG 2 giây, tô màu từng ô vuông 1cm² rồi mới chuyển sang công thức dài × rộng; chỉ rõ bước hoặc chữ số hoặc từ cần sửa; không để hiệu ứng che lời giải.
- Câu sai được xếp vào CUỐI vòng chơi để luyện lại trong cùng phiên, ưu tiên xuất hiện lại sớm.
- Màn tổng kết nhóm theo errorTag: "Em hay sai ở: đếm ô dang dở sai" — kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.
- Hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài của Toán lớp 4.

7. GIAO DIỆN VÀ AN TOÀN
- Bố cục: Bắt đầu → Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), tương phản tốt, responsive cả dọc và ngang.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động. Không leaderboard, không quảng cáo.
- Âm thanh tổng hợp bằng Web Audio API, bật sau cú bấm đầu tiên; không dùng file mp3.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Xưởng Diện Tích, lưu localStorage key "miti-collection", có màn "Sưu tập của em".
- Ngồi tại chỗ vẫn chơi được; không yêu cầu chạy nhảy hay động tác nguy hiểm; không rời khỏi vùng camera.
- KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân.
- Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi, lời giải thích bằng TIẾNG VIỆT. Không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.

8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.
- Xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; nhỏ, không che vùng tương tác.
- Chân trang hoặc màn kết quả có dòng: MiTi • Học bằng chuyển động.
- Không xóa hoặc đổi tên thương hiệu khi replay, khi vào gameplay hoặc ở chế độ không camera.

9. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.
- Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".
- Tự kiểm tra trước khi xuất: camera xin sau nút Bắt đầu · có loading/error/định vị · 640×480 và lật gương · gesture fire theo lượt chuyển + cooldown + confidence · không tính hover là đã chọn · khom hai tay (two-hand stretch) hoạt động đúng cơ chế · fallback chuột/chạm chơi trọn vẹn · QUESTION_DATA đủ 40 mục, mỗi mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · tổng kết theo nhóm lỗi · bộ sưu tập lưu localStorage · chữ ký MiTi ở ba màn · file chạy độc lập không lỗi console.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `dien-tich-don-vi` — đổi cluster nếu đổi dạng bài.
- Gesture: `TWO_HAND_STRETCH` — mỗi game tối đa 2 mã, mã đầu là mechanic chính.
- Muốn thêm nội dung mới: sửa `tools/data/games.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
