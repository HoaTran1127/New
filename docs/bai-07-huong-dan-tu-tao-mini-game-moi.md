# Bài 7: Hướng Dẫn Tự Phát Triển Thêm Mini-Game Mới

> **⚠️ Cập nhật chuẩn MiTi (2026-10)** — bài này vẫn đúng về ý tưởng, nhưng ba phụ thuộc đã đổi: **Tone.js → Web Audio API tự tổng hợp**, **MediaPipe Hands legacy → MediaPipe Tasks Vision pin `@1.0.1`** (vision_bundle.mjs + wasm + hand_landmarker.task), **Tailwind Play CDN → CSS nội tuyến một khối `<style>`**.
> Bản chuẩn để viết prompt cho Gemini Canvas: `prompts/00-master-canvas-prompt.md` — khung 5 mục (Ý TƯỞNG · MỤC TIÊU HỌC TẬP · RÀNG BUỘC CỐT LÕI · NGÂN HÀNG DỮ LIỆU · TỰ KIỂM TRA), trần 15 KB mỗi prompt. Mọi quy định dùng chung nằm trong 14 dòng `CORE_LINES` ở `tools/lib/core.mjs`; 425 biến thể điều khiển ở `prompts/VARIANTS_425.md`.
> Bài viết dưới đây mô tả kiến trúc cũ (nhiều module `tools/lib/*`, prompt dài hàng trăm KB), nên đọc để hiểu cơ chế chứ không copy cấu trúc. Mã nguồn demo trong `games/` là bản cũ, chưa theo hợp đồng AR này.


> **Hai đường song song, đừng nhầm.** Bài này dạy đường **tự code**: dùng `src/core/*.js` và `src/data/*.js` nhiều file, kiểu mà 4 demo trong `games/` đang chạy. Đường còn lại — **85 prompt game chuẩn** trong `prompts/` — bắt buộc Gemini xuất ra **1 file HTML duy nhất, CSS nội tuyến, không file .js ngoài**, nên không dùng `src/`. Chọn một đường rồi theo đến cùng.
>
> `src/data/*.js` là **bộ sinh câu hỏi theo topic** (10 chủ đề Toán), không phải ngân hàng `QUESTION_DATA` mà prompt yêu cầu. Game làm bằng prompt phải tự khai báo `QUESTION_DATA` trong file của nó.

## 1. Sức mạnh của Khung Sườn (Framework Architecture)
Khi bạn muốn tạo một mini-game mới, bạn **không bao giờ phải viết lại** các phần phức tạp sau:
- ❌ Không phải cấu hình lại AI MediaPipe Hands.
- ❌ Không phải viết lại các bộ tổng hợp âm thanh Tone.js.
- ❌ Không phải nhập lại hàng trăm câu hỏi toán học Lớp 4 & 5.

Tất cả những thứ đó đã được đóng gói thành các Module trong thư mục `src/`!

---

## 2. Nghiên cứu tình huống: Cách tạo game "AR Math Catcher" (Hứng Táo)
Hãy xem cách tựa game thứ 2 trong dự án (`games/math-catcher/`) được xây dựng:

1. **Khởi tạo trang HTML:** Chỉ cần import các file từ `src/`:
   ```html
   <script src="../../src/core/AudioManager.js"></script>
   <script src="../../src/core/HandTracker.js"></script>
   <script src="../../src/data/index.js"></script>
   ```

2. **Lấy câu hỏi toán học bất kỳ:**
   ```javascript
   const cauHoi = TopicRegistry.generateEquation();
   // Trả về: { text: "25% của 400", rightPart: "= 100", isCorrect: true, ... }
   ```

3. **Lấy tọa độ bàn tay để di chuyển Giỏ Hứng:**
   ```javascript
   const tracker = new HandTracker({ videoElement: video });
   tracker.init(
     () => console.log("Sẵn sàng"),
     (hands) => {
       if (hands.length > 0) {
         // Di chuyển tọa độ X của chiếc giỏ theo vị trí tay học sinh!
         basketX = hands[0].x * canvas.width;
       }
     }
   );
   ```

4. **Âm thanh khi hứng trúng:**
   ```javascript
   if (apple.isCorrect) {
     audio.playPop(); // Tiếng pop vui tai
   } else {
     audio.playGlassBreak(); // Tiếng kính vỡ cảnh báo
   }
   ```
👉 Bạn thấy đấy, toàn bộ game thứ hai chỉ mất chưa đầy **150 dòng code** vì 90% nền tảng đã có sẵn!

---

## 3. Gợi ý 3 Ý Tưởng Game Mới Bạn Có Thể Tự Triển Khai Tiếp

### Ý tưởng 1: Bắn Cung / Ném Phi Tiêu AR (Math Dart)
- Bàn tay học sinh tạo tư thế nhắm bắn (khớp ngón trỏ làm điểm ngắm).
- Các bia phép tính bay qua lại trên bầu trời. Khi học sinh khép ngón tay lại (Pinch gesture), mũi tên bắn ra trúng bia Đúng!

### Ý tưởng 2: Trắc Nghiệm Bằng Số Ngón Tay (Finger Count Quiz)
- Màn hình hiện câu hỏi trắc nghiệm có 4 đáp án A, B, C, D.
- MediaPipe đếm số ngón tay học sinh xòe ra:
  - 1 ngón $\rightarrow$ Chọn đáp án A
  - 2 ngón $\rightarrow$ Chọn đáp án B
  - 3 ngón $\rightarrow$ Chọn đáp án C
  - 4 ngón $\rightarrow$ Chọn đáp án D

### Ý tưởng 3: Đấu Trường Song Đấu 2 Người (Dual Player AR)
- Chia đôi màn hình: Nửa bên trái dành cho Bạn 1, nửa bên phải dành cho Bạn 2.
- MediaPipe đặt `maxNumHands: 2`. Tay của ai vung đấm vào đáp án đúng nhanh hơn sẽ giành được điểm!

---

Chúc bạn và các em học sinh có những giờ phút vừa học toán vừa vận động thật nhiều niềm vui và bổ ích! 🎉
