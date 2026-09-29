# E5-04 — Cổng Ngữ Pháp

> Tiếng Anh lớp 5 · Điều khiển: Nghiêng người / bước sang vùng (Body tilt) · Cụm kiến thức: nguphap-e5
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "CỔNG NGỮ PHÁP" cho học sinh Việt Nam lớp 5, môn Tiếng Anh.
Toàn bộ game nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

1. HỌC TẬP
- Mục tiêu học tập: hiện tại đơn hiện tại tiếp diễn quá khứ; danh từ đếm được không đếm được; lượng từ some any.
- Nhiệm vụ của học sinh trong mỗi lượt: Nghiêng người bước vào cổng chứa dạng động từ đúng với thì của câu.
- Phạm vi kiến thức: chỉ dùng nội dung Tiếng Anh lớp 5 đã học. Cấm ra đề vượt chương trình, cấm số hoặc từ vựng ngoài phạm vi trên.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): thiếu dấu hiệu thì trong câu; chủ ngữ số ít nhưng động từ không thêm s hoặc es; dùng sai giới từ chỉ thời gian nơi chốn.
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. BỐI CẢNH VÀ VÒNG CHƠI
- Bối cảnh: Hàng cổng đá, mỗi cổng mang một dạng động từ.
- Cơ chế chính: Nghiêng người / bước sang vùng (Body tilt). Nhiệm vụ hiển thị bằng một dòng chữ to trên HUD, không cần đọc hướng dẫn.
- Độ dài: 12 lượt chính. Tăng độ khó ở lượt 5 và lượt 9 (thêm bước trung gian hoặc rút ngắn thời gian suy nghĩ).
- Điểm: +10 nhân chuỗi trả lời đúng. Sai không phạt bằng cách biến mất kiến thức: vẫn hiện lời giải đầy đủ.
- Điều kiện thua: hết 5 tim (mỗi đáp án sai trừ 1 tim). Điều kiện thắng: hết 12 lượt, hiện tổng kết.
- Từ và câu tiếng Anh xuất hiện trong phần học liệu; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt.

3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet }.
- Tối thiểu 60 mục, chia 3 mức độ (level 1/2/3), mỗi mục có một đáp án đúng duy nhất kiểm chứng được bằng code.
- Mỗi mục có từ hoặc câu tiếng Anh, gợi nghĩa tiếng Việt, phiên âm khi phù hợp, và audio bằng window.speechSynthesis; đáp án là chuỗi cố định.
- errorTag là mã máy của lỗi, lấy đúng một trong các nhãn: thi_hieu_du_lu_lien_quan, dem_khong_dong_tu_them_s, gioi_tu_in_on_at. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 1, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt; không để đáp án đúng luôn ở một vị trí.
- Trước khi viết engine, liệt kê trong comment 3 mục theo đúng khuôn rồi mới viết trọn mảng.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Chọn dạng đúng: She ... to school every day.", choices: ["goes","go","going"], answer: "goes", explanation: "Hiện tại đơn với chủ ngữ số ít ngôi 3 thêm -es: goes.", errorTag: "dem_khong_dong_tu_them_s", loiViet: "chủ ngữ số ít nhưng động từ không thêm s hoặc es"
  id: "q2", level: 2, prompt: "Chọn: Look! The boys ... football.", choices: ["are playing","play","plays"], answer: "are playing", explanation: "\"Look!\" báo hiệu hành động đang diễn ra → hiện tại tiếp diễn.", errorTag: "thi_hieu_du_lu_lien_quan", loiViet: "thiếu dấu hiệu thì trong câu"

4. CAMERA VÀ GESTURE
- MediaPipe Tasks Vision, pin phiên bản: import từ https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs
  wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm
  model: https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task (PoseLandmarker)
- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }). Khung hình 4:3; nếu camera cho tỉ lệ khác thì crop về vùng vẽ cố định, không để giãn hình làm sai tọa độ. Lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU. Trạng thái bằng tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Có khung định vị/calibration để học sinh biết đặt tay hoặc đứng ở đâu.
- Cử chỉ chính — Nghiêng người / bước sang vùng (Body tilt): PoseLandmarker: hai vai (landmark 11, 12) và mũi (0) để tính góc nghiêng thân người so với phương thẳng đứng.
- Điều kiện chốt đáp án (hit): Học sinh phải giữ tư thế nghiêng qua ngưỡng trong 2 khung hình liên tiếp để "chốt" vào vùng; khi đứng thẳng lại thì không đổi vùng.
- Làm mượt và chống spam: Góc nghiêng có deadzone ±6°, hysteresis ngưỡng nhả thấp hơn ngưỡng kích hoạt 3°; cooldown 500ms.
- Ngưỡng tin cậy: Yêu cầu thấy cả hai vai; vai bị khuất thì hiện "Đưa vai vào khung hình" và không chốt.
- Phản hồi hình ảnh cho người chơi: Khung xương neon tối giản + vạch chỉ vùng CHẴN/LẺ hoặc cổng trái/phải.
- Cử chỉ chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim.
- Confidence thấp thì không chốt đáp án.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi tự chuyển sang chế độ không camera, game vẫn chơi đủ.

5. FALLBACK (bắt buộc)
- Mouse / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính: phím mũi tên trái hoặc phải, hoặc chạm vào vùng, để đổi làn.
- Có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng, không cần tải lại trang.
- Mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.

6. PHẢN HỒI HỌC TẬP
- Đúng: phản hồi tích cực ngay (âm thanh vui + hạt sáng) và một dòng ghi nhớ ngắn.
- Sai: DỪNG 2 giây, sửa trực tiếp vị trí sai trong câu và giải thích bằng tiếng Việt; chỉ rõ bước hoặc chữ số hoặc từ cần sửa; không để hiệu ứng che lời giải.
- Câu sai được xếp vào CUỐI vòng chơi để luyện lại trong cùng phiên, ưu tiên xuất hiện lại sớm.
- Màn tổng kết nhóm theo errorTag: "Em hay sai ở: thiếu dấu hiệu thì trong câu" — kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.
- Dùng window.speechSynthesis đọc to từ/câu tiếng Anh (en-US hoặc en-GB) khi trả lời đúng, có nút phát lại ở màn học liệu.

7. GIAO DIỆN VÀ AN TOÀN
- Bố cục: Bắt đầu → Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính → Phản hồi → Ôn câu sai → Kết quả → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), tương phản tốt, responsive cả dọc và ngang.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động. Không leaderboard, không quảng cáo.
- Âm thanh tổng hợp bằng Web Audio API, bật sau cú bấm đầu tiên; không dùng file mp3.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Cổng Ngữ Pháp, lưu localStorage key "miti-collection", có màn "Sưu tập của em".
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
- Tự kiểm tra trước khi xuất: camera xin sau nút Bắt đầu · có loading/error/định vị · 640×480 và lật gương · gesture fire theo lượt chuyển + cooldown + confidence · không tính hover là đã chọn · nghiêng người / bước sang vùng (body tilt) hoạt động đúng cơ chế · fallback chuột/chạm chơi trọn vẹn · QUESTION_DATA đủ 60 mục, mỗi mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · tổng kết theo nhóm lỗi · bộ sưu tập lưu localStorage · chữ ký MiTi ở ba màn · file chạy độc lập không lỗi console.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `nguphap-e5` — đổi cluster nếu đổi dạng bài.
- Gesture: `STEP` — mỗi game tối đa 2 mã, mã đầu là mechanic chính.
- Muốn thêm nội dung mới: sửa `tools/data/games.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
