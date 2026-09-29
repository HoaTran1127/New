# E4-07 — Đua Xếp Câu

> Tiếng Anh lớp 4 · Điều khiển: Kéo thả (Drag) · Cụm kiến thức: xep-cau
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "ĐUA XẾP CÂU" cho học sinh Việt Nam lớp 4, môn Tiếng Anh.
Toàn bộ game nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

1. HỌC TẬP
- Mục tiêu học tập: sắp xếp các từ đã cho thành câu có nghĩa; điền động từ to be a/an the.
- Nhiệm vụ của học sinh trong mỗi lượt: Kéo các toa từ vào đúng trật tự để thành câu hoàn chỉnh có nghĩa.
- Phạm vi kiến thức: chỉ dùng nội dung Tiếng Anh lớp 4 đã học. Cấm ra đề vượt chương trình, cấm số hoặc từ vựng ngoài phạm vi trên.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): thiếu động từ to be; đặt tính từ sai vị trí; sai trật tự từ trong câu khẳng định.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. BỐI CẢNH VÀ VÒNG CHƠI
- Bối cảnh: Đường băng tiếp sức, mỗi từ là một toa tàu.
- Cơ chế chính: Kéo thả (Drag). Nhiệm vụ hiển thị bằng một dòng chữ to trên HUD, không cần đọc hướng dẫn.
- Độ dài: 12 lượt chính. Tăng độ khó ở lượt 5 và lượt 9 (thêm bước trung gian hoặc rút ngắn thời gian suy nghĩ).
- Điểm: +10 nhân chuỗi trả lời đúng. Sai không phạt bằng cách biến mất kiến thức: vẫn hiện lời giải đầy đủ.
- Điều kiện thua: hết 5 tim (mỗi đáp án sai trừ 1 tim). Điều kiện thắng: hết 12 lượt, hiện tổng kết.
- Từ và câu tiếng Anh xuất hiện trong phần học liệu; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt.

3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet }.
- Tối thiểu 60 mục, chia 3 mức độ (level 1/2/3), mỗi mục có một đáp án đúng duy nhất kiểm chứng được bằng code.
- Mỗi mục có từ hoặc câu tiếng Anh, gợi nghĩa tiếng Việt, phiên âm khi phù hợp, và audio bằng window.speechSynthesis; đáp án là chuỗi cố định.
- errorTag là mã máy của lỗi, lấy đúng một trong các nhãn: thieu_to_be, vi_tri_tru_tu_sai, quyen_hien_tai_dong_tu. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 1, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt; không để đáp án đúng luôn ở một vị trí.
- Trước khi viết engine, liệt kê trong comment 3 mục theo đúng khuôn rồi mới viết trọn mảng.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Sắp xếp: is / This / my / mother", choices: ["This is my mother","is This my mother","This my is mother"], answer: "This is my mother", explanation: "Trật tự: chủ ngữ (This) + động từ to be (is) + cụm danh từ (my mother).", errorTag: "vi_tri_tru_tu_sai", loiViet: "đặt tính từ sai vị trí"
  id: "q2", level: 2, prompt: "Chọn đáp án: There ... two cats in the room.", choices: ["are","is","am"], answer: "are", explanation: "two cats là số nhiều nên dùng are.", errorTag: "thieu_to_be", loiViet: "thiếu động từ to be"

4. CAMERA VÀ GESTURE
- MediaPipe Tasks Vision, pin phiên bản: import từ https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs
  wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm
  model: https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task (HandLandmarker)
- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }). Khung hình 4:3; nếu camera cho tỉ lệ khác thì crop về vùng vẽ cố định, không để giãn hình làm sai tọa độ. Lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU. Trạng thái bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Có khung định vị/calibration để học sinh biết đặt tay hoặc đứng ở đâu.
- Cử chỉ chính — Kéo thả (Drag): HandLandmarker, đầu ngón trỏ làm điểm kéo; có thể thêm landmark 8 giữ vật.
- Điều kiện chốt đáp án (hit): Vật chỉ được tính là đúng khi thả VÀO TRONG ô đích (không phải chỉ đi ngang qua), và vị trí thả khớp ô đích sau khi snap lưới.
- Làm mượt và chống spam: Kèm vật theo ngón tay có độ trễ đàn hồi; grid snap; cooldown 200ms.
- Ngưỡng tin cậy: Nếu confidence tụt dưới ngưỡng khi đang kéo thì vật rơi về vị trí cũ, không tính là sai.
- Phản hồi hình ảnh cho người chơi: Ô đích sáng lên khi vật ở trong tầm thả.
- Cử chỉ chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim.
- Confidence thấp thì không chốt đáp án.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi tự chuyển sang chế độ không camera, game vẫn chơi đủ.

5. FALLBACK (bắt buộc)
- Mouse / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính: kéo thả bằng chuột hoặc chạm màn hình rồi thả vào ô đích.
- Có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng, không cần tải lại trang.
- Mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.

6. PHẢN HỒI HỌC TẬP
- Đúng: phản hồi tích cực ngay (âm thanh vui + hạt sáng) và một dòng ghi nhớ ngắn.
- Sai: DỪNG 2 giây, dán nhãn S-V-O dưới câu ghép đúng và đọc to câu; chỉ rõ bước hoặc chữ số hoặc từ cần sửa; không để hiệu ứng che lời giải.
- Câu sai được xếp vào CUỐI vòng chơi để luyện lại trong cùng phiên, ưu tiên xuất hiện lại sớm.
- Màn tổng kết nhóm theo errorTag: "Em hay sai ở: thiếu động từ to be" — kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.
- Dùng window.speechSynthesis đọc to từ/câu tiếng Anh (en-US hoặc en-GB) khi trả lời đúng, có nút phát lại ở màn học liệu.

7. GIAO DIỆN VÀ AN TOÀN
- Bố cục: Bắt đầu → Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), tương phản tốt, responsive cả dọc và ngang.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động. Không leaderboard, không quảng cáo.
- Âm thanh tổng hợp bằng Web Audio API, bật sau cú bấm đầu tiên; không dùng file mp3.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Đua Xếp Câu, lưu localStorage key "miti-collection", có màn "Sưu tập của em".
- Ngồi tại chỗ vẫn chơi được; không yêu cầu chạy nhảy hay động tác nguy hiểm; không rời khỏi vùng camera.
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
- Tự kiểm tra trước khi xuất: camera xin sau nút Bắt đầu · có loading/error/định vị · 640×480 và lật gương · gesture fire theo lượt chuyển + cooldown + confidence · không tính hover là đã chọn · kéo thả (drag) hoạt động đúng cơ chế · fallback chuột/chạm chơi trọn vẹn · QUESTION_DATA đủ 60 mục, mỗi mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · tổng kết theo nhóm lỗi · bộ sưu tập lưu localStorage · chữ ký MiTi ở ba màn · file chạy độc lập không lỗi console.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `xep-cau` — đổi cluster nếu đổi dạng bài.
- Gesture: `DRAG` — mỗi game tối đa 2 mã, mã đầu là mechanic chính.
- Muốn thêm nội dung mới: sửa `tools/data/games.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
