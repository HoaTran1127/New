# Prompt Gemini Canvas: Game AR Toán 5 - Thần Săn Giảm Giá (Tỉ Số Phần Trăm & Mua Sắm Siêu Thị)

> **Môn học:** Toán Lớp 5 (SGK Cánh Diều / Kết Nối Tri Thức / Chân Trời Sáng Tạo)  
> **Chủ đề bài học:** Tỉ số phần trăm (%), Tìm giá trị phần trăm của một số, Bài toán thực tế giảm giá / chiết khấu  
> **Khái niệm hình dung:** Thước đo 100% trực quan (Percentage Bar Gauge) chia tỷ lệ tương ứng giá tiền  
> **Cử chỉ AR:** 2 tay kéo thanh trượt phần trăm + Chém kiếm Neon (Slash) vào mức giá thực trả sau giảm giá

> **LEGACY (LEG-12)** — prompt đời đầu, giữ nguyên cơ chế game nhưng đã thay MediaPipe Legacy/Tailwind/Web Audio API bằng chuẩn hiện hành. Bản chuẩn để làm game mới: `prompts/00-master-canvas-prompt.md`; 85 prompt đặc thù nằm trong `catalogs/GAME_CATALOG.csv`.

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 5 học chuyên đề "Tỉ Số Phần Trăm và Bài Toán Thực Tế Mua Sắm Siêu Thị".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Giao diện: CSS nội tuyến trong một khối <style>, không dùng Tailwind Play CDN.
   - Biểu tượng: inline SVG, không tải FontAwesome.
      - MediaPipe Tasks Vision, phiên bản pin 1.0.1 (vision_bundle.mjs + wasm + hand_landmarker.task; pose_landmarker_lite.task nếu cần tư thế toàn thân)
   - Âm thanh: tổng hợp bằng Web Audio API, không dùng file mp3 ngoài.
2. Luôn lật ngang video webcam (transform: -scale-x-100) để tạo cảm giác soi gương AR.
3. Hỗ trợ dự phòng chuột/cảm ứng nếu học sinh không bật camera.

Cơ chế trực quan hóa tỉ số phần trăm:
1. Mỗi màn chơi là một quầy hàng siêu thị sinh động:
   - Món hàng: Balo phi hành gia giá gốc: 200.000 đồng.
   - Thẻ treo Sale: GIẢM GIÁ 20%!
2. Thanh năng lượng trực quan hóa (Percentage Gauge):
   - Toàn bộ thanh là 100% ứng với 200.000đ (mỗi 10% = 20.000đ).
   - Phần giảm giá: 20% sáng màu đỏ rực (2 vạch = 20.000 x 2 = 40.000đ).
   - Phần thực tế phải trả: 80% sáng màu xanh ngọc (8 vạch = 200.000 - 40.000 = 160.000đ).
3. Giúp học sinh thấy rõ mối quan hệ giữa 100%, số % được giảm và số % phải trả một cách trực giác chứ không phải áp dụng công thức mù quáng.

Cơ chế vận động thể chất AR:
1. Bàn tay của học sinh phát ra vệt kiếm Neon phát sáng màu hồng tím (Cyber Slash).
2. Câu hỏi hiển thị lên màn hình kèm giọng đọc sinh động:
   - "Balo giảm giá 20%, vậy số tiền được giảm là bao nhiêu?"
   - Ba bong bóng giá tiền bay lên: [40.000 đồng], [20.000 đồng], [10.000 đồng].
   - Học sinh vung tay chém đứt bong bóng đúng: [40.000 đồng].
3. Câu hỏi kế tiếp:
   - "Vậy khách hàng phải trả bao nhiêu tiền để mua balo?"
   - Ba thẻ bài rơi xuống: [160.000 đồng], [180.000 đồng], [240.000 đồng].
   - Học sinh dùng hai tay chụm lại hứng hoặc vung tay chém chuẩn xác thẻ bài [160.000 đồng].
4. Nếu chém nhầm: Màn hình nứt kính (Cracked glass effect), âm thanh tít tít máy tính tiền báo lỗi và popover nhắc nhở hiện ra: "Số tiền giảm = 200.000 x 20 : 100 = 40.000đ. Số tiền phải trả = 200.000 - 40.000 = 160.000đ bạn nhé!".

Giao diện & Trải nghiệm:
- Bối cảnh siêu thị tương lai vui nhộn, âm thanh ting-ting khi thanh toán thành công.
- Xe đẩy hàng AR chứa các món đồ học sinh đã giải đúng.
- Chế độ combo điểm thưởng khi tính nhẩm siêu tốc.

YÊU CẦU BẮT BUỘC THEO CHUẨN MiTi (áp dụng cho bản prompt legacy này):
1. NGÂN HÀNG DỮ LIỆU: khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau. Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet }; tối thiểu 40 mục chia 3 mức độ; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo trộn vị trí đáp án bằng seed theo lượt.
2. CAMERA: MediaPipe Tasks Vision pin phiên bản (vision_bundle.mjs@1.0.1 + wasm + hand_landmarker.task, pose_landmarker_lite.task nếu cần tư thế toàn thân). getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }); khung 4:3, crop nếu camera tỉ lệ khác, lật gương ngang khi hiển thị và tính tọa độ.
3. CHỈ XIN QUYỀN CAMERA SAU khi học sinh bấm BẮT ĐẦU. Trạng thái tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại). Có khung định vị để học sinh biết đặt tay ở đâu.
4. CHỐNG CHỐT NHẦM: làm mượt EMA alpha 0.4–0.5; cử chỉ chỉ fire ở lượt chuyển trạng thái kèm hysteresis hai ngưỡng và cooldown; giữ nguyên tư thế không được spam event, không được trừ tim; hover không phải hit; confidence thấp thì không chốt.
5. FALLBACK: chuột / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính, có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng không tải lại trang. CDN hoặc model lỗi thì tự chuyển sang chế độ không camera, game vẫn chơi đủ, mục tiêu học tập vẫn đủ 100%.
6. PHẢN HỒI HỌC TẬP: sai thì dừng 2 giây, chỉ rõ bước hoặc chữ số hoặc từ cần sửa, không hiệu ứng nào che lời giải; câu sai xếp vào CUỐI vòng chơi để luyện lại; màn tổng kết nhóm theo loiViet kiểu "Em hay sai ở: ..." kèm số câu đúng/sai theo mức độ.
7. Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em". Chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive dọc và ngang, có Pause, Replay, Giảm hiệu ứng chuyển động; không leaderboard, không quảng cáo.
8. RIÊNG TƯ: không upload ảnh/video từ camera, chỉ giữ landmark trong bộ nhớ, không thu thập dữ liệu cá nhân. Toàn bộ UI, tên nút, hướng dẫn, thông báo và lời giải bằng TIẾNG VIỆT; không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.
9. CHỮ KÝ MiTi (bắt buộc trong HTML): ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; chân trang hoặc màn kết quả có dòng "MiTi • Học bằng chuyển động"; không xóa hoặc đổi tên thương hiệu khi replay hay ở chế độ không camera.
10. ĐẦU RA: duy nhất 1 file HTML hoàn chỉnh, CSS nội tuyến trong một khối <style>, không file .css/.js/.json/ảnh/mp3 ngoài, không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không lỗi console khi mở trực tiếp bằng trình duyệt.
```
