# TEMPLATE — MiTi GAME PROMPT CHUẨN

> Dùng khi muốn thêm **một game mới** vào thư viện. Điền các ô `[...]`, copy nguyên khối `text` bên dưới dán vào **Google Gemini → bật chế độ Canvas**.
>
> Nếu game sẽ vào catalog (hiện trên dashboard), thêm một dòng vào `tools/data/games.mjs` rồi chạy `node tools/build.mjs` — đừng sửa tay file prompt được sinh ra.

## Metadata (không gửi Gemini)

- Game ID: [ID] · Khối: [GRADE] · Môn: [SUBJECT]
- Cụm kiến thức: [CLUSTER] — phải có trong `tools/data/clusters.mjs`
- Điều khiển: [GESTURE] — **một trong 10 mã** `POINT · SWIPE · PUNCH · GRAB · DRAG · STEP · TWO_HAND_STRETCH · TWO_HAND_BALANCE · ANGLE_POSE · VOICE`, tối đa 2 mã, mã đầu là mechanic chính. **Không được ghi `MIXED`.**

## Prompt copy trực tiếp

```text
Tạo game giáo dục web "[TÊN GAME]" cho học sinh Việt Nam lớp [GRADE], môn [SUBJECT].
Toàn bộ game nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

1. HỌC TẬP
- Mục tiêu học tập: [MỤC TIÊU — cụ thể theo SGK, không viết "vận dụng kiến thức qua tình huống"].
- Nhiệm vụ của học sinh trong mỗi lượt: [MỘT HÀNH ĐỘNG ĐỌC RA ĐƯỢC NGAY].
- Phạm vi kiến thức: chỉ dùng nội dung [MÔN lớp [GRADE]] đã học. Cấm ra đề vượt chương trình.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): [LỖI 1]; [LỖI 2]; [LỖI 3].
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. BỐI CẢNH VÀ VÒNG CHƠI
- Bối cảnh: [BỐI CẢNH gắn thẳng với cơ chế học].
- Cơ chế chính: [TÊN GESTURE bằng tiếng Việt]. Nhiệm vụ hiển thị bằng một dòng chữ to trên HUD.
- Độ dài: 12 lượt chính. Tăng độ khó ở lượt 5 và lượt 9.
- Điểm: +10 nhân chuỗi trả lời đúng. Sai không xóa kiến thức: vẫn hiện lời giải đầy đủ.
- Điều kiện thua: hết 5 tim (mỗi đáp án sai trừ 1 tim). Điều kiện thắng: hết 12 lượt, hiện tổng kết.

3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet }.
- Tối thiểu [40 mục Toán / 60 mục Tiếng Anh], chia 3 mức độ, mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- errorTag là mã máy của lỗi; loiViet là cụm tiếng Việt có dấu lấy nguyên văn từ danh sách lỗi ở mục 1 và là thứ hiển thị cho học sinh.
- Xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt; không để đáp án đúng luôn ở một vị trí.
- Phương án nhiễu mô phỏng đúng lỗi thật của học sinh, không phải giá trị ngẫu nhiên vô nghĩa.
- Một mục mẫu để bám theo khuôn (viết tiếp cho đủ số mục, không được ít hơn):
  id: "q1", level: 1, prompt: "[...]", choices: ["[...]","[...]","[...]"], answer: "[...]", explanation: "[...]", errorTag: "[...]", loiViet: "[...]"

4. CAMERA VÀ GESTURE
- MediaPipe Tasks Vision, pin phiên bản: import từ https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs
  wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm
  model: https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task (HandLandmarker), pose_landmarker_lite.task nếu cần tư thế toàn thân.
- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }). Khung 4:3, crop nếu camera cho tỉ lệ khác, lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU. Trạng thái tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Có khung định vị/calibration để học sinh biết đặt tay hoặc đứng ở đâu.
- Cử chỉ chính — [GESTURE]: [landmark nào, hình học nào].
- Điều kiện chốt đáp án (hit): [điều kiện KHÔNG phải hover; ví dụ ở trong ô đích đủ 3 khung hình rồi mới release].
- Làm mượt và chống spam: EMA alpha 0.45; cử chỉ chỉ fire ở lượt chuyển trạng thái; hysteresis hai ngưỡng; cooldown 250–400ms; giữ nguyên tư thế không spam event, không trừ tim.
- Confidence thấp thì không chốt đáp án.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi tự chuyển sang chế độ không camera, game vẫn chơi đủ.

5. FALLBACK (bắt buộc)
- Mouse / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính: [mô phỏng thao tác chính].
- Có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng, không cần tải lại trang.
- Mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.

6. PHẢN HỒI HỌC TẬP
- Đúng: phản hồi tích cực ngay (âm thanh vui + hạt sáng) và một dòng ghi nhớ ngắn.
- Sai: DỪNG 2 giây, [trực quan hóa đúng dạng bài: cột dọc / sơ đồ đoạn thẳng / lưới ô / trục số]; chỉ rõ bước hoặc chữ số hoặc từ cần sửa; không để hiệu ứng che lời giải.
- Câu sai xếp vào CUỐI vòng chơi để luyện lại trong cùng phiên.
- Màn tổng kết nhóm theo loiViet: "Em hay sai ở: [...]" kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.

7. GIAO DIỆN VÀ AN TOÀN
- Bố cục: Bắt đầu → Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), tương phản tốt, responsive cả dọc và ngang.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động. Không leaderboard, không quảng cáo.
- Âm thanh tổng hợp bằng Web Audio API, bật sau cú bấm đầu tiên; không dùng file mp3.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em".
- Ngồi tại chỗ vẫn chơi được; không động tác nguy hiểm; không rời khỏi vùng camera.
- KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân.
- Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi, lời giải thích bằng TIẾNG VIỆT (chỉ học liệu tiếng Anh giữ nguyên tiếng Anh). Không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.

8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.
- Xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; nhỏ, không che vùng tương tác.
- Chân trang hoặc màn kết quả có dòng: MiTi • Học bằng chuyển động.
- Không xóa hoặc đổi tên thương hiệu khi replay, khi vào gameplay hoặc ở chế độ không camera.

9. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.
- Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".
- Tự kiểm tra trước khi xuất: camera xin sau nút Bắt đầu · có loading/error/định vị · 640×480 và lật gương · gesture fire theo lượt chuyển + cooldown + confidence · không tính hover là đã chọn · [cơ chế chính] hoạt động đúng · fallback chuột/chạm chơi trọn vẹn · QUESTION_DATA đủ số mục, mỗi mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · tổng kết theo nhóm lỗi · bộ sưu tập lưu localStorage · chữ ký MiTi ở ba màn · file chạy độc lập không lỗi console.
```

## Checklist trước khi nộp game mới

- [ ] Điều khiển là một trong 10 mã, **không có `MIXED`**.
- [ ] Mục tiêu học tập cụ thể theo SGK — **cấm** các câu chung chung kiểu "vận dụng kiến thức qua tình huống tương tác".
- [ ] Bối cảnh và cơ chế khớp nhau: bỏ camera đi thì bài học vẫn còn ý nghĩa, nhưng cử chỉ phải đang kiểm tra đúng kỹ năng.
- [ ] Mỗi mục QUESTION_DATA có `errorTag` + `loiViet`; danh sách lỗi ở mục 1 và danh sách nhãn ở mục 3 trùng nhau theo đúng thứ tự.
- [ ] Không còn `[...]`, không còn `${...}`, không còn dấu nháy lạ lọt vào câu.
- [ ] Đã chạy `node tools/build.mjs` và `node tools/validate.mjs` báo đạt.
