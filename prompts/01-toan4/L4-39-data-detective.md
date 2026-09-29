# L4-39 — Thám Tử Dữ Liệu

> Toán lớp 4 · Điều khiển: Chỉ ngón tay trỏ (Point) · Cụm kiến thức: bieu-do-cot
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "THÁM TỬ DỮ LIỆU" cho học sinh Việt Nam lớp 4, môn Toán.
Toàn bộ game nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

1. HỌC TẬP
- Mục tiêu học tập: đọc biểu đồ cột; biểu đồ cột đôi; tạo cột theo số liệu; câu hỏi so sánh trên biểu đồ.
- Nhiệm vụ của học sinh trong mỗi lượt: Chỉ vào bằng chứng trong bảng hoặc biểu đồ để trả lời từng nghi vấn.
- Phạm vi kiến thức: chỉ dùng nội dung Toán lớp 4 đã học. Cấm ra đề vượt chương trình, cấm số hoặc từ vựng ngoài phạm vi trên.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): đọc số ô mà quên nhân theo tỉ lệ chú giải; so sánh hai cột không cùng gốc; thiếu đơn vị trục.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. BỐI CẢNH VÀ VÒNG CHƠI
- Bối cảnh: Văn phòng thám tử với hồ sơ bảng biểu và biểu đồ.
- Cơ chế chính: Chỉ ngón tay trỏ (Point). Nhiệm vụ hiển thị bằng một dòng chữ to trên HUD, không cần đọc hướng dẫn.
- Độ dài: 12 lượt chính. Tăng độ khó ở lượt 5 và lượt 9 (thêm bước trung gian hoặc rút ngắn thời gian suy nghĩ).
- Điểm: +10 nhân chuỗi trả lời đúng. Sai không phạt bằng cách biến mất kiến thức: vẫn hiện lời giải đầy đủ.
- Điều kiện thua: hết 5 tim (mỗi đáp án sai trừ 1 tim). Điều kiện thắng: hết 12 lượt, hiện tổng kết.
- Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK Toán lớp 4.

3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet }.
- Tối thiểu 40 mục, chia 3 mức độ (level 1/2/3), mỗi mục có một đáp án đúng duy nhất kiểm chứng được bằng code.
- Đáp án phải tính lại được bằng số học trong code, không so khớp chuỗi tự do; mỗi phương án nhiễu là một kết quả thật của lỗi đã nêu, không phải số ngẫu nhiên.
- errorTag là mã máy của lỗi, lấy đúng một trong các nhãn: dem_o_sai_ty_le, so_sanh_chieu_cao_khong_cung_goc, thieu_don_vi_truc. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 1, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt; không để đáp án đúng luôn ở một vị trí.
- Trước khi viết engine, liệt kê trong comment 3 mục theo đúng khuôn rồi mới viết trọn mảng.
- Hai mục mẫu để bám theo khuôn (viết tiếp 38 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Biểu đồ cột, 1 ô = 5 quyển. Lớp 4A cao 6 ô. Lớp 4A có bao nhiêu quyển?", choices: ["30","6","35"], answer: "30", explanation: "Phải nhân theo chú giải tỉ lệ: 6 × 5 = 30 quyển.", errorTag: "dem_o_sai_ty_le", loiViet: "đọc số ô mà quên nhân theo tỉ lệ chú giải"
  id: "q2", level: 2, prompt: "Cột tháng 4 cao 90, cột tháng 5 cao 60. Tháng 4 nhiều hơn tháng 5 bao nhiêu?", choices: ["30","150","20"], answer: "30", explanation: "So sánh hai cột bằng cách trừ chiều cao: 90 − 60 = 30.", errorTag: "so_sanh_chieu_cao_khong_cung_goc", loiViet: "so sánh hai cột không cùng gốc"

4. CAMERA VÀ GESTURE
- MediaPipe Tasks Vision, pin phiên bản: import từ https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs
  wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm
  model: https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task (HandLandmarker)
- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }). Khung hình 4:3; nếu camera cho tỉ lệ khác thì crop về vùng vẽ cố định, không để giãn hình làm sai tọa độ. Lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU. Trạng thái bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Có khung định vị/calibration để học sinh biết đặt tay hoặc đứng ở đâu.
- Cử chỉ chính — Chỉ ngón tay trỏ (Point): MediaPipe Tasks Vision HandLandmarker, đầu ngón trỏ landmark 8 làm con trỏ.
- Điều kiện chốt đáp án (hit): Con trỏ phải nằm trong hitbox của đáp án trong ÍT NHẤT 3 khung hình liên tiếp rồi mới release bằng thao tác bấm/giữ 400ms; chỉ trỏ lướt qua (hover) không được tính là đã chọn.
- Làm mượt và chống spam: EMA alpha 0.45 trên tọa độ con trỏ; cooldown 300ms sau mỗi lần chốt.
- Ngưỡng tin cậy: confidence tay >= 0.6; đầu ngón tay phải ở trong vùng khung hình hợp lệ (lề 40px).
- Phản hồi hình ảnh cho người chơi: Học sinh nhìn thấy vòng ngắm sáng bám theo đầu ngón tay và hitbox sáng lên khi con trỏ ở trong.
- Cử chỉ chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim.
- Confidence thấp thì không chốt đáp án.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi tự chuyển sang chế độ không camera, game vẫn chơi đủ.

5. FALLBACK (bắt buộc)
- Mouse / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính: chạm hoặc click vào đáp án thay cho con trỏ ngón tay, giữ 400ms để chốt như khi giữ tay.
- Có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng, không cần tải lại trang.
- Mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.

6. PHẢN HỒI HỌC TẬP
- Đúng: phản hồi tích cực ngay (âm thanh vui + hạt sáng) và một dòng ghi nhớ ngắn.
- Sai: DỪNG 2 giây, kẻ đường ngang từ đỉnh cột tới trục số để đọc đúng giá trị; chỉ rõ bước hoặc chữ số hoặc từ cần sửa; không để hiệu ứng che lời giải.
- Câu sai được xếp vào CUỐI vòng chơi để luyện lại trong cùng phiên, ưu tiên xuất hiện lại sớm.
- Màn tổng kết nhóm theo errorTag: "Em hay sai ở: đọc số ô mà quên nhân theo tỉ lệ chú giải" — kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.
- Hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài của Toán lớp 4.

7. GIAO DIỆN VÀ AN TOÀN
- Bố cục: Bắt đầu → Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), tương phản tốt, responsive cả dọc và ngang.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động. Không leaderboard, không quảng cáo.
- Âm thanh tổng hợp bằng Web Audio API, bật sau cú bấm đầu tiên; không dùng file mp3.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Thám Tử Dữ Liệu, lưu localStorage key "miti-collection", có màn "Sưu tập của em".
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
- Tự kiểm tra trước khi xuất: camera xin sau nút Bắt đầu · có loading/error/định vị · 640×480 và lật gương · gesture fire theo lượt chuyển + cooldown + confidence · không tính hover là đã chọn · chỉ ngón tay trỏ (point) hoạt động đúng cơ chế · fallback chuột/chạm chơi trọn vẹn · QUESTION_DATA đủ 40 mục, mỗi mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · tổng kết theo nhóm lỗi · bộ sưu tập lưu localStorage · chữ ký MiTi ở ba màn · file chạy độc lập không lỗi console.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `bieu-do-cot` — đổi cluster nếu đổi dạng bài.
- Gesture: `POINT` — mỗi game tối đa 2 mã, mã đầu là mechanic chính.
- Muốn thêm nội dung mới: sửa `tools/data/games.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
