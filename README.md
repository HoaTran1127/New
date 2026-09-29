# 🟡 MiTi ✦ Học Bằng Chuyển Động
### 🎮 Thư Viện 85+ Master Prompt Tạo Game Web AR Tương Tác Qua Camera Bằng Google Gemini

[![Google Gemini](https://img.shields.io/badge/Google_Gemini-Canvas_Ready-8E75FF?style=for-the-badge&logo=googlegemini&logoColor=white)](https://gemini.google.com)
[![MediaPipe AI](https://img.shields.io/badge/AI_Vision-MediaPipe_Hands-00F0FF?style=for-the-badge&logo=google&logoColor=black)](https://developers.google.com/mediapipe)
[![Web Audio](https://img.shields.io/badge/Audio-Tone.js_Arcade-FF007A?style=for-the-badge)](https://tonejs.github.io)
[![Live Studio](https://img.shields.io/badge/Web_Dashboard-Chọn_Game_Ngay-FFE600?style=for-the-badge&logo=githubpages&logoColor=black)](https://hoatran1127.github.io/New/)

> 🎯 **North Star:** Vào thư viện ➔ Chọn game yêu thích ➔ **1 Click Copy Prompt** ➔ Dán vào **[Google Gemini](https://gemini.google.com)** ➔ Nhận ngay mã nguồn Game Web AR 1 file HTML hoàn chỉnh, bật camera chơi chuyển động 60 FPS cực mượt!

---

## 🚀 Trải Nghiệm Nhanh Trực Tuyến

* 🌐 **[MỞ DASHBOARD MiTi (Chọn Game & Tự Động Tạo Prompt) →](https://hoatran1127.github.io/New/)**
* 🕹️ **Chơi thử game mẫu chạy sẵn trên trình duyệt:**
  * [Demo 1: Subway Math Blitz AR](https://hoatran1127.github.io/New/games/math-blitz/) (Đấm thẻ rơi 3 làn phong cách Subway Surfers)
  * [Demo 2: AR Math Catcher](https://hoatran1127.github.io/New/games/math-catcher/) (Dùng bàn tay làm giỏ di động hứng quả)
  * [Demo 3: Math Ninja Bubble Pop](https://hoatran1127.github.io/New/games/math-bubble/) (Vung ngón tay chém bong bóng phép tính)

---

## ⚡ 3 Bước Sử Dụng Trong 30 Giây

```text
[1] CHỌN & COPY PROMPT         [2] DÁN VÀO GOOGLE GEMINI         [3] CHƠI GAME BẰNG CAMERA
Bấm mở game bên dưới hoặc      Mở gemini.google.com, dán         Gemini sinh ra 1 file HTML,
chọn trên Dashboard MiTi. ➔    prompt vào ô chat (Canvas).  ➔    bấm Run/mở file và vận
Bấm copy toàn bộ prompt.       Nhấn Enter để AI lập trình.       động cơ thể trước webcam!
```

---

## 🔥 KHO PROMPT "ĂN LIỀN" (BẤM MỞ RA ĐỂ COPY DÙNG NGAY)

<details open>
<summary><h3>🍌 01. Subway Math Blitz AR (Đấm Thẻ 3 Làn - Kính Vỡ Toảng) [CỰC HOT ⭐]</h3></summary>

> **Phong cách:** Subway Surfers. Thẻ bài phép tính rơi tự do trên 3 làn chạy. Vung tay đấm trúng thẻ ĐÚNG để ăn điểm nổ hoa, né hoặc đấm nhầm thẻ SAI sẽ bị rạn nứt kính màn hình mạng nhện!

```markdown
Hãy tạo một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "SUBWAY MATH BLITZ - CHIẾN THẦN TOÁN HỌC".

### CƠ CHẾ GAMEPLAY:
1. Camera AI Hand Tracking:
   - Dùng MediaPipe Hands (@mediapipe/hands và @mediapipe/camera_utils qua CDN) phát hiện 1 bàn tay người chơi qua webcam.
   - Lật gương webcam (transform: -scale-x-100) và áp dụng bộ lọc mượt EMA để chống rung giật.
   - Vẽ tâm ngắm găng đấm bốc 🥊 tại tọa độ bàn tay với vệt hào quang neon bám theo.
   - Hỗ trợ cả chuột (click) và cảm ứng để phòng khi không có camera.

2. Thẻ Bài Rơi (Subway Surfers Style):
   - Màn hình chia thành 3 làn chạy. Các thẻ phép tính rơi đều từ trên xuống theo nhịp điệu.
   - Thẻ bo góc viền neon rực rỡ với 5 phong cách: Chuối Vàng 🍌, Ván Trượt Xanh 🛹, Tên Lửa Hồng 🚀, Giày Nhún Lục 👟, Hộp Quà Tím 🎁.
   - Trên mỗi thẻ hiển thị phép tính Toán học (Bảng cửu chương nhân chia, Toán Lớp 4-5).

3. Luật Chơi & Thưởng Phạt:
   - Người chơi có 5 Máu (❤️).
   - Vung tay đấm thẻ ĐÚNG: +10 điểm x Combo, nổ 24 mảnh hạt tung tóe, âm thanh nhặt xu vui nhộn (Tone.PolySynth) tăng cao độ theo chuỗi combo.
   - Đấm nhầm thẻ SAI: Trừ 1 Máu, màn hình chớp đỏ, xuất hiện 15 tia nứt kính mạng nhện tỏa ra từ điểm đấm, âm thanh kính vỡ toảng sống động (Tone.NoiseSynth + Tone.PolySynth).
   - Hết 5 máu: Hiện bảng tổng kết điểm số, kỷ lục High Score và nút chơi lại.

4. Nội Dung Kiến Thức:
   - Dạng bài: Bảng cửu chương nhân chia 2-9, nhân nhẩm số có 2 chữ số với 11, cộng trừ phân số, tính nhẩm số thập phân.
   - Tỉ lệ: 60% thẻ đúng để đấm, 40% thẻ sai làm bẫy sư phạm.

Toàn bộ code gói gọn trong 1 file HTML duy nhất, dùng Tailwind CSS CDN, Tone.js CDN, MediaPipe CDN, có logo "MiTi • Học bằng chuyển động", sẵn sàng chạy ngay.
```
</details>

---

<details>
<summary><h3>🥷 02. Math Ninja Bubble Pop (Vung Ngón Tay Chém Bong Bóng Phép Tính)</h3></summary>

> **Phong cách:** Fruit Ninja. Các bong bóng chứa phép tính bay bổng từ đáy màn hình. Người chơi vung ngón tay như đường kiếm sắc bén để chém nổ bong bóng đúng!

```markdown
Hãy tạo một game Web AR 1 file HTML hoàn chỉnh có tên "MATH NINJA: BUBBLE POP".

### CƠ CHẾ GAMEPLAY:
1. Nhận diện bàn tay & Vệt kiếm Ninja:
   - Dùng MediaPipe Hands bắt tọa độ đầu ngón tay trỏ.
   - Vẽ hiệu ứng vệt kiếm chém ánh sáng Neon (Blade Trail) mượt mà lướt theo chuyển động của ngón tay.
   - Khi tốc độ vung tay vượt ngưỡng, kích hoạt trạng thái CHÉM (Slice).

2. Bong bóng phép tính bay lên:
   - Các bong bóng xà phòng ngũ sắc nổi bồng bềnh từ cạnh dưới màn hình lên trên theo hiệu ứng vật lý.
   - Bên trong bong bóng chứa các đẳng thức toán học (ví dụ: "8 × 9 = 72", "1/2 + 1/4 = 3/4", "15 × 11 = 165").

3. Tương tác & Âm thanh Arcade:
   - Chém trúng bong bóng ĐÚNG: Bong bóng vỡ tung ra 30 bọt nước lung linh, phát âm thanh "bốp" vui tai kèm tiếng chuông ngân vàng, tăng điểm combo.
   - Chém nhầm bong bóng SAI (Bẫy gai nhọn): Màn hình rung chuyển, trừ 1 sinh mệnh, phát âm thanh cảnh báo xì lốp, hiện bảng giải thích ngắn gọn đáp án đúng.
   - Tích lũy Combo chém liên hoàn 3 bong bóng cùng lúc để kích hoạt chế độ "Cuồng Nộ": Mọi bong bóng bay chậm lại trong 5 giây.

Code gói gọn trong 1 file HTML, dùng Tone.js, Tailwind CSS, MediaPipe Hands CDN, có logo "MiTi • Học bằng chuyển động", chạy mượt 60 FPS.
```
</details>

---

<details>
<summary><h3>🏎️ 03. L4-01 Đường Đua Hàng Số (Toán Lớp 4 - Cấu Tạo Số)</h3></summary>

> **Môn:** Toán Lớp 4 SGK mới. Người chơi dùng ngón tay điều khiển làn đua, phân tích cấu tạo hàng triệu, hàng trăm nghìn để vượt qua các chướng ngại vật toán học.

```markdown
Tạo game giáo dục web một file HTML duy nhất cho học sinh Việt Nam lớp 4, môn Toán: "L4-01: ĐƯỜNG ĐUA HÀNG SỐ".

1. Thông tin học tập:
   - Mục tiêu: Đọc, viết và phân tích cấu tạo số tự nhiên nhiều chữ số (hàng đơn vị đến hàng triệu).
   - Nhiệm vụ: Đưa tay chọn đúng làn số có giá trị theo yêu cầu (ví dụ: "Tìm số có chữ số 7 ở hàng chục nghìn").
   - Điều khiển: MediaPipe Hands nhận diện đầu ngón tay trỏ làm con trỏ định hướng.

2. Gameplay & Cử chỉ:
   - Chia 3 làn chạy tốc độ tăng dần. Thẻ số lướt tới, học sinh giơ ngón tay chỉ vào làn đúng.
   - Tạo 12 lượt chơi chính với ngân hàng 40 câu hỏi phong phú.
   - Có cơ chế làm mượt EMA, chống giật webcam. Hỗ trợ cảm ứng/chuột nếu không có camera.
   - Khi chọn sai: Dừng 2 giây, phóng to chữ số hàng tương ứng kèm mũi tên giải thích trực quan rồi mới cho chơi tiếp.

3. Nhận diện thương hiệu & Kỹ thuật:
   - Có biểu tượng ô bo góc vàng #FFD84D có chữ M + chữ MiTi đậm + dấu ✦ nhỏ góc trên.
   - Dòng khẩu hiệu: "MiTi • Học bằng chuyển động".
   - Code trọn vẹn trong 1 file HTML duy nhất, không dùng code tóm tắt.
```
</details>

---

<details>
<summary><h3>🍎 04. AR Math Catcher (Dùng Bàn Tay Làm Giỏ Hứng Táo Phân Số)</h3></summary>

> **Phong cách:** Catcher Game. Quả táo mang các phân số rơi từ ngọn cây. Người chơi xòe bàn tay di chuyển qua lại để hứng các quả táo thỏa mãn điều kiện bài toán!

```markdown
Hãy tạo một game Web AR 1 file HTML hoàn chỉnh có tên "AR MATH CATCHER - THẦN ĐỒNG HỨNG QUẢ".

### CƠ CHẾ GAMEPLAY:
1. Bàn tay làm Giỏ Hứng:
   - Dùng MediaPipe Hands phát hiện lòng bàn tay người chơi.
   - Tại vị trí bàn tay, vẽ chiếc Giỏ Ma Thuật 🧺 co giãn đàn hồi theo cử chỉ xòe/nắm tay.
   - Khi di chuyển tay sang trái/phải trên camera, giỏ hứng lướt mượt mà theo trục ngang.

2. Quả táo phép tính rơi xuống:
   - Đề bài hiển thị trên mây: Ví dụ "Hãy hứng các phân số LỚN HƠN 1" hoặc "Hứng các số chia hết cho 9".
   - Các quả táo Táo Đỏ 🍎, Táo Vàng 🍏, Quả Bom 💣 rơi từ ngọn cây với tốc độ tăng dần.
   - Hứng đúng quả hợp lệ: Giỏ rung rinh phát sáng, hạt kim tuyến rơi lấp lánh, phát âm thanh "ting" tươi vui.
   - Hứng nhầm quả sai hoặc bom: Giỏ bốc khói đen, mất 1 lượt chơi, trừ điểm.

Code chuẩn 1 file HTML, dùng MediaPipe Hands, Tone.js tổng hợp âm thanh, đồ họa khu vườn rực rỡ, kèm logo MiTi.
```
</details>

---

<details>
<summary><h3>🏃 05. Body Tilt Dodge (Nghiêng Người Né Chướng Ngại Vật & Chọn Cổng Đúng)</h3></summary>

> **Phong cách:** Vận động toàn thân. Đứng trước camera, nghiêng người sang trái/phải để điều khiển nhân vật chạy xuyên qua cổng đáp án chính xác!

```markdown
Hãy tạo một game Web AR tương tác toàn thân 1 file HTML có tên "BODY TILT RUNNER: TOÁN HỌC VẬN ĐỘNG".

### CƠ CHẾ GAMEPLAY:
1. AI Pose Tracking:
   - Dùng MediaPipe Pose (@mediapipe/pose) nhận diện tư thế cơ thể qua webcam.
   - Tính toán góc nghiêng giữa hai vai và sống lưng: Nghiêng trái ➔ lướt sang làn trái; Nghiêng phải ➔ lướt sang làn phải.
   - Hiển thị khung xương neon tối giản để học sinh quan sát tư thế của mình.

2. Đường chạy 2 làn đối kháng:
   - Phía trước xuất hiện 2 cổng vòm mang 2 đáp án (Cổng Trái vs Cổng Phải).
   - Câu hỏi hiển thị to rõ giữa màn hình (Ví dụ: "Số nào là số nguyên tố? 17 hay 21?").
   - Người chơi phải nghiêng người để hướng nhân vật chạy xuyên qua cổng chính xác.

Code gói gọn trong 1 file HTML, dùng MediaPipe Pose CDN, Tone.js, Tailwind CSS, tối ưu FPS cực kỳ mượt mà.
```
</details>

---

<details>
<summary><h3>🔤 06. English Vocab Ninja (Chém Từ Vựng Tiếng Anh Vận Động)</h3></summary>

> **Phong cách:** Luyện từ vựng tiếng Anh qua phản xạ chuyển động tay. Nhìn hình ảnh/gợi ý tiếng Việt và chém đúng từ tiếng Anh tương ứng kèm phát âm chuẩn giọng bản xứ.

```markdown
Hãy tạo một game Web AR tương tác 1 file HTML có tên "ENGLISH VOCAB NINJA - CAO THỦ TỪ VỰNG".

### CƠ CHẾ GAMEPLAY:
1. Nhận diện bàn tay & Chém từ vựng:
   - Dùng MediaPipe Hands bắt chuyển động vung tay như kiếm đạo.
   - Trên màn hình hiển thị gợi ý nghĩa hoặc biểu tượng cảm xúc (Ví dụ: "Con voi 🐘", "Bác sĩ 👨‍⚕️", "Màu tím 🟣").
   - Các tấm bảng gỗ mang từ tiếng Anh bay lên (Ví dụ: "Elephant", "Tiger", "Doctor", "Purple").
   - Người chơi vung tay chém đôi tấm bảng chứa từ tiếng Anh chính xác.

2. Hiệu ứng & Phát âm:
   - Khi chém đúng: Tấm bảng đứt đôi chân thực, phát âm thanh chém kiếm sắc bén (Tone.js), đồng thời sử dụng Web Speech API (window.speechSynthesis) để đọc to từ vựng tiếng Anh chuẩn giọng bản xứ.
   - Chém sai: Bảng gỗ bật ngược lại kèm tiếng "boing", hiện phiên âm và nghĩa đúng để người chơi ôn tập.

Code gói gọn trong 1 file HTML, tích hợp sẵn các chủ đề từ vựng: Động vật (Animals), Trường học (School), Nghề nghiệp (Jobs), Gia đình (Family).
```
</details>

---

<details>
<summary><h3>👑 00. Master System Prompt (Dành Cho Bạn Muốn Tự Sáng Tạo Game Mọi Môn Học)</h3></summary>

> **Mục đích:** Khung xương kỹ thuật chuẩn mực nhất của MiTi để bạn tự đưa bất kỳ chủ đề bài học nào khác (Vật lý, Lịch sử, Địa lý...) vào Gemini.

```markdown
Bạn là một Chuyên gia Lập trình Game Giáo dục Web AR (HTML5, Canvas 2D, MediaPipe, Web Audio).
Hãy tạo cho tôi một ứng dụng Game Tương Tác Học Tập hoàn chỉnh đóng gói trong DUY NHẤT 1 FILE HTML (Single File HTML) để chạy trực tiếp trên trình duyệt web máy tính / laptop.

### YÊU CẦU KỸ THUẬT BẮT BUỘC:
1. Công nghệ Thị giác Máy tính (Web AR):
   - Sử dụng Google MediaPipe Hands nhúng qua CDN (@mediapipe/camera_utils và @mediapipe/hands).
   - Video webcam nền đặt lật gương ngang (transform: -scale-x-100) để soi gương tự nhiên.
   - Áp dụng bộ lọc mượt chuyển động tay Exponential Moving Average (EMA alpha ~ 0.45) chống giật rung.
   - BẮT BUỘC có chế độ Fallback chuột/cảm ứng nếu không có webcam.

2. Giao diện & Đồ họa (UI/UX Arcade):
   - Dùng Tailwind CSS CDN + Google Fonts (Fredoka và Outfit).
   - Canvas 2D phủ tràn màn hình, co giãn linh hoạt theo kích thước cửa sổ.
   - Hiệu ứng thị giác đã mắt: Vệt hào quang theo tay, hạt nổ tung tóe, chấn động shockwave và kính nứt vỡ khi sai.
   - Có logo nhận diện: Biểu tượng ô bo góc vàng #FFD84D có chữ M + chữ MiTi đậm + dòng chữ "MiTi • Học bằng chuyển động".

3. Âm thanh Arcade sống động (Tone.js):
   - Nhúng Tone.js CDN: https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js
   - KHÔNG dùng file mp3 ngoài. Tự tổng hợp âm thanh bằng Synthesizer: tiếng vung gió, tiếng nhặt xu hợp âm, tiếng kính vỡ khi trả lời sai.
   - Kích hoạt AudioContext qua await Tone.start() khi bấm bắt đầu chơi.

4. Nội dung bài học:
   - Chủ đề: [ĐIỀN CHỦ ĐỀ & DẠNG BÀI BẠN MUỐN Ở ĐÂY]
   - Tỉ lệ: 60% dữ liệu ĐÚNG để người chơi ăn điểm, 40% dữ liệu SAI làm bẫy sư phạm kèm giải thích chi tiết.

Hãy viết trọn vẹn mã nguồn HTML, CSS và JavaScript hoàn chỉnh, không dùng mã rút gọn hay comment `// TODO`.
```
</details>

---

## 📚 TOÀN BỘ 85+ GAME THEO MÔN & KHỐI LỚP

Tất cả các file prompt trong thư mục `prompts/` đều là **Prompt Thật** sẵn sàng sử dụng:

| Môn Học & Khối Lớp | Số Lượng | Nội Dung Trọng Tâm | Link Xem Toàn Bộ Prompt |
|:---|:---:|:---|:---:|
| 🔢 **Toán Lớp 4** | **40 Game** | Cấu tạo số, 4 phép tính, phân số, hình học, diện tích, góc, đổi đơn vị đo lường... | [👉 Xem 40 Prompt Toán 4](prompts/01-toan4/) |
| 📐 **Toán Lớp 5** | **15 Game** | Số thập phân, tỉ số %, chuyển động s = v × t, thể tích khối hộp, phân số hỗn số... | [👉 Xem 15 Prompt Toán 5](prompts/02-toan5/) |
| 🇬🇧 **Tiếng Anh Lớp 4** | **15 Game** | Từ vựng chủ đề, nghe chọn tranh, chính tả từ ngữ, ghép câu, phát âm chuẩn... | [👉 Xem 15 Prompt Tiếng Anh 4](prompts/03-english4/) |
| 🌍 **Tiếng Anh Lớp 5** | **15 Game** | Đọc hiểu thám tử, ngữ pháp tương tác, thử thách câu đố, bản đồ phiêu lưu... | [👉 Xem 15 Prompt Tiếng Anh 5](prompts/04-english5/) |

### 🕹️ Chọn Game Theo Kiểu Vận Động Tương Tác
* 🥊 **Đấm bốc (Punch):** Vung tay đấm vào các thẻ bài phép tính rơi theo làn.
* 🗡️ **Chém kiếm (Slash):** Vung ngón tay chém đôi các bong bóng số và từ vựng.
* 🧺 **Hứng bắt (Catch):** Dùng lòng bàn tay hứng các quả táo đáp án đúng.
* 🧘 **Nghiêng người (Body Tilt):** Nghiêng thân người sang trái/phải để điều khiển nhân vật chạy xuyên qua cổng.
* 👆 **Chỉ trỏ (Point):** Dùng đầu ngón tay làm con trỏ chuột bay tương tác với màn hình.
* 🤲 **Cân bằng hai tay (Balance):** Dùng 2 bàn tay làm đòn bẩy so sánh lớn hơn/bé hơn.

---

## 💡 Mẹo Chạy Game Cực Mượt Trên Google Gemini

1. Truy cập **[Google Gemini](https://gemini.google.com)** trên máy tính hoặc laptop (khuyến nghị dùng trình duyệt Chrome/Edge để camera ổn định nhất).
2. Dán prompt đã copy vào ô chat và gửi đi.
3. Khi Gemini tạo xong mã nguồn:
   - Bấm nút **"Run code"** hoặc **"Preview"** (nếu dùng giao diện Gemini Canvas).
   - Hoặc bấm copy mã code, lưu thành file `game.html` trên máy và nhấp đúp để mở.
4. Trình duyệt hiện thông báo hỏi quyền truy cập Webcam ➔ Bấm **"Allow / Cho phép"** để bắt đầu chơi!

---

⭐ **Thấy hữu ích? Hãy bấm Star kho lưu trữ này để lưu lại khi cần nhé!**
