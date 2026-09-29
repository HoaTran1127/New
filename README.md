# 🟡 MiTi ✦ Học Bằng Chuyển Động
### 🎮 Thư Viện 85 Prompt Game Chuẩn (+12 Prompt Legacy) Tạo Game Web AR Tương Tác Qua Camera Bằng Google Gemini

[![Google Gemini](https://img.shields.io/badge/Google_Gemini-Canvas_Ready-8E75FF?style=for-the-badge&logo=googlegemini&logoColor=white)](https://gemini.google.com)
[![MediaPipe AI](https://img.shields.io/badge/AI_Vision-MediaPipe_Tasks_Vision_1.0.1-00F0FF?style=for-the-badge&logo=google&logoColor=black)](https://developers.google.com/mediapipe)
[![Web Audio](https://img.shields.io/badge/Audio-Web_Audio_API_tong_hop-FF007A?style=for-the-badge)](https://developer.mozilla.org/docs/Web/API/Web_Audio_API)
[![Live Studio](https://img.shields.io/badge/Web_Dashboard-Chọn_Game_Ngay-FFE600?style=for-the-badge&logo=githubpages&logoColor=black)](https://hoatran1127.github.io/New/)

> 🎯 **North Star:** Vào thư viện ➔ Chọn game yêu thích ➔ **1 Click Copy Prompt** ➔ Dán vào **[Google Gemini](https://gemini.google.com)** ➔ Nhận ngay mã nguồn Game Web AR 1 file HTML hoàn chỉnh, bật camera chơi chuyển động 60 FPS cực mượt!

---

## 🚀 Trải Nghiệm Nhanh Trực Tuyến

* 🌐 **[MỞ DASHBOARD MiTi (Chọn Game & Tự Động Tạo Prompt) →](https://hoatran1127.github.io/New/)**
* 🕹️ **Chơi thử game mẫu chạy sẵn trên trình duyệt:**
  * [Demo 1: Subway Math Blitz AR](https://hoatran1127.github.io/New/games/math-blitz/) (Đấm thẻ rơi 3 làn phong cách Subway Surfers)
  * [Demo 2: AR Math Catcher](https://hoatran1127.github.io/New/games/math-catcher/) (Dùng bàn tay làm giỏ di động hứng quả)
  * [Demo 3: Math Ninja Bubble Pop](https://hoatran1127.github.io/New/games/math-bubble/) (Vung ngón tay chém bong bóng phép tính)
  * [Demo 4: English Word Ninja](https://hoatran1127.github.io/New/games/english-word-ninja/) (Chém từ vựng tiếng Anh kèm phát âm)

---

## ⚡ 3 Bước Sử Dụng Trong 30 Giây

```text
[1] CHỌN & COPY PROMPT         [2] BẬT CANVAS & DÁN VÀO GEMINI    [3] CHƠI GAME TRÊN WEBCAM
Bấm mở game bên dưới hoặc      Mở gemini.google.com, BẬT          Gemini mở cửa sổ Canvas,
chọn trên Dashboard MiTi. ➔    CHẾ ĐỘ CANVAS ➔ Dán prompt ➔       bấm Run/Preview để chơi
Bấm copy toàn bộ prompt.       Nhấn Enter để AI tạo game.         ngay bằng cử chỉ camera!
```

> [!IMPORTANT]
> **⚠️ BẮT BUỘC CHỌN CHẾ ĐỘ CANVAS TRÊN GEMINI:**
> * **Nếu KHÔNG bật Canvas:** Gemini chỉ in ra chữ/code thông thường, bạn phải tự copy ra file `.html` lưu về máy mới mở được.
> * **Khi BẬT CANVAS:** Gemini sẽ kích hoạt giao diện chuyên dụng bên phải màn hình có nút **"Run code" / "Preview"** để bạn chơi game trực tiếp ngay trên trình duyệt mà không cần tải bất cứ file nào!
> * *Mẹo:* Nếu trên giao diện Gemini chưa thấy nút Canvas, bạn chỉ cần gõ thêm chữ `Mở Canvas và tạo game:` ở đầu prompt.

---

## 🔥 PROMPT "ĂN LIỀN" — COPY TỪ FILE, KHÔNG SAI LỆCH BẢN

Toàn bộ prompt nằm trong file `.md` riêng, mỗi file một game, copy nguyên khối `text` là dùng được. README không nhân bản nội dung để tránh hai bản lệch nhau.

| Nhóm | Số lượng | Mở ở đâu |
|:---|:---:|:---|
| Prompt game chuẩn (Toán 4 · Toán 5 · Tiếng Anh 4 · Tiếng Anh 5) | **85** | [Dashboard MiTi](https://hoatran1127.github.io/New/) — bấm **Sao chép prompt**, hoặc [catalogs/GAME_CATALOG.md](catalogs/GAME_CATALOG.md) |
| Khung master 9 mục để tự tạo prompt mới | 1 | [prompts/00-master-canvas-prompt.md](prompts/00-master-canvas-prompt.md) |
| Biểu mẫu điền nhanh | 1 | [prompts/templates/game-prompt-template.md](prompts/templates/game-prompt-template.md) |
| Biến thể điều khiển (Point · Swipe · Drag/Grab · Voice · No Camera) | **325** | [prompts/VARIANTS_325.md](prompts/VARIANTS_325.md) |
| Prompt legacy đời đầu (cơ chế arcade, đã nâng cấp lên chuẩn hiện hành) | **12** | Bảng mở rộng dưới đây |

<details>
<summary><b>12 prompt legacy (LEG-01 → LEG-12)</b> — giữ nguyên cơ chế game cũ, đã thay MediaPipe Legacy / Tailwind CDN / Tone.js bằng chuẩn hiện hành</summary>

| ID | Tên game | Môn · Lớp | Điều khiển | File |
|:---|:---|:---|:---|:---|
| LEG-01 | Subway Math Blitz AR | Toán · Lớp 4-5 | Vung tay đấm (Punch) | [prompts/01-prompt-subway-math-blitz.md](prompts/01-prompt-subway-math-blitz.md) |
| LEG-02 | AR Math Catcher | Toán · Lớp 4-5 | Nắm và thả (Grab / Catch) | [prompts/02-prompt-math-catcher-ar.md](prompts/02-prompt-math-catcher-ar.md) |
| LEG-03 | Math Ninja Bubble Pop | Toán · Lớp 4-5 | Vuốt / chém (Swipe) | [prompts/03-prompt-ninja-bubble-pop.md](prompts/03-prompt-ninja-bubble-pop.md) |
| LEG-04 | English Vocabulary Ninja AR | Tiếng Anh · Lớp 4-5 | Vuốt / chém (Swipe) | [prompts/04-prompt-english-vocab-ninja.md](prompts/04-prompt-english-vocab-ninja.md) |
| LEG-05 | Body Tilt & Dodge AR | Toán · Lớp 4-5 | Nghiêng người / bước sang vùng (Body tilt) + Khom hai tay (Two-hand stretch) | [prompts/05-prompt-body-tilt-dodge.md](prompts/05-prompt-body-tilt-dodge.md) |
| LEG-06 | Two Hands Balance AR | Toán · Lớp 4-5 | Cân bằng hai tay (Two-hand balance) | [prompts/06-prompt-two-hands-balance.md](prompts/06-prompt-two-hands-balance.md) |
| LEG-07 | AR Spelling Bee & Phonics | Tiếng Anh · Lớp 4-5 | Chỉ ngón tay trỏ (Point) | [prompts/07-prompt-finger-spell-english.md](prompts/07-prompt-finger-spell-english.md) |
| LEG-08 | Bí Ẩn Sơ Đồ Đoạn Thẳng | Toán · Lớp 4 | Khom hai tay (Two-hand stretch) + Vung tay đấm (Punch) | [prompts/08-prompt-toan4-tong-ti-so-do.md](prompts/08-prompt-toan4-tong-ti-so-do.md) |
| LEG-09 | Cánh Tay Ê-Ke & Pháo Đài Góc | Toán · Lớp 4 | Tạo góc bằng cánh tay (Angle pose) | [prompts/09-prompt-toan4-hinh-hoc-goc-dien-tich.md](prompts/09-prompt-toan4-hinh-hoc-goc-dien-tich.md) |
| LEG-10 | Cao Tốc Tốc Độ | Toán · Lớp 5 | Cân bằng hai tay (Two-hand balance) | [prompts/10-prompt-toan5-chuyen-dong-gap-nhau.md](prompts/10-prompt-toan5-chuyen-dong-gap-nhau.md) |
| LEG-11 | Kiến Trúc Sư Khối 3D | Toán · Lớp 5 | Kéo thả (Drag) + Vuốt / chém (Swipe) | [prompts/11-prompt-toan5-the-tich-hinh-khoi.md](prompts/11-prompt-toan5-the-tich-hinh-khoi.md) |
| LEG-12 | Thần Săn Giảm Giá | Toán · Lớp 5 | Kéo thả (Drag) + Vuốt / chém (Swipe) | [prompts/12-prompt-toan5-ti-so-phan-tram-chiet-khau.md](prompts/12-prompt-toan5-ti-so-phan-tram-chiet-khau.md) |

</details>

---

## 📚 85 GAME CHUẨN THEO MÔN & KHỐI LỚP

Tất cả các file prompt trong thư mục `prompts/` đều là **prompt thật**, có đường dẫn kiểm chứng được bằng `node tools/validate.mjs`:

| Môn Học & Khối Lớp | Số Lượng | Nội Dung Trọng Tâm | Link Xem Toàn Bộ Prompt |
|:---|:---:|:---|:---:|
| 🔢 **Toán Lớp 4** | **40 Game** | Cấu tạo số, 4 phép tính, phân số, hình học, diện tích, góc, đổi đơn vị đo lường... | [👉 Xem 40 Prompt Toán 4](prompts/01-toan4/) |
| 📐 **Toán Lớp 5** | **15 Game** | Số thập phân, tỉ số %, chuyển động s = v × t, thể tích khối hộp, phân số hỗn số... | [👉 Xem 15 Prompt Toán 5](prompts/02-toan5/) |
| 🇬🇧 **Tiếng Anh Lớp 4** | **15 Game** | Từ vựng chủ đề, nghe chọn tranh, chính tả từ ngữ, ghép câu, phát âm chuẩn... | [👉 Xem 15 Prompt Tiếng Anh 4](prompts/03-english4/) |
| 🌍 **Tiếng Anh Lớp 5** | **15 Game** | Đọc hiểu thám tử, ngữ pháp tương tác, thử thách câu đố, bản đồ phiêu lưu... | [👉 Xem 15 Prompt Tiếng Anh 5](prompts/04-english5/) |

### 🕹️ 10 kiểu điều khiển (mỗi prompt khai báo rõ, không còn "MIXED")

| Mã | Học sinh làm gì | Số game |
|:---|:---|:---:|
| `POINT` | Chỉ ngón trỏ vào đáp án, giữ 400ms để chốt | 34 |
| `DRAG` | Kéo vật thả vào ô đích, có grid snap | 23 |
| `GRAB` | Nắm và bắt vật đang rơi / đang trôi | 12 |
| `PUNCH` | Vung tay đấm trúng thẻ đáp án (state xòe → nắm) | 10 |
| `SWIPE` | Vuốt / chém qua vật theo quỹ đạo | 9 |
| `STEP` | Nghiêng người hoặc bước sang vùng trái / phải | 5 |
| `TWO_HAND_STRETCH` | Khom hai tay căng giãn khoảng cách | 3 |
| `VOICE` | Nói to câu trả lời, Web Speech API chấm từng từ | 2 |
| `TWO_HAND_BALANCE` | Hai tay nâng / hạ tạo đòn cân so sánh | 1 |
| `ANGLE_POSE` | Hai cánh tay tạo thành góc có số đo | 1 |

Số liệu do `tools/build-dashboard.mjs` đếm từ catalog — sửa game xong build lại là bảng này tự đúng nếu bạn chạy `node tools/build.mjs` trước khi commit.

---

## 🔁 Pipeline: sửa dữ liệu một chỗ, mọi thứ dựng lại

```text
tools/data/games.mjs         85 game: tên, gesture, bối cảnh, nhiệm vụ, cụm kiến thức
tools/data/clusters.mjs      57 cụm kiến thức + nội dung + giải thích sư phạm
tools/data/gestures.mjs      10 mã điều khiển: landmark, hình học chốt, ngưỡng, fallback
tools/data/examples.mjs      câu mẫu few-shot cho từng cụm
tools/data/error-notes.mjs   nhãn lỗi tiếng Việt (errorTag + loiViet)
        │
        └─ node tools/build.mjs
             ├─ catalogs/GAME_CATALOG.csv + .md
             ├─ prompts/01-toan4 · 02-toan5 · 03-english4 · 04-english5 (85 file)
             ├─ prompts/01..12 legacy (nâng cấp phụ thuộc, gắn nhãn)
             ├─ catalogs/GAME_CATALOG.js  → index.html vẽ lưới + lọc + copy
             └─ node tools/validate.mjs   → chặn MIXED, link gãy, thiếu chữ ký MiTi, rò ${}
```

```bash
node tools/build.mjs      # dựng lại catalog, prompt, dashboard rồi kiểm tra
node tools/validate.mjs   # chỉ kiểm tra
```

---

## 💡 Mẹo Chạy Game Cực Mượt Trên Google Gemini

1. Truy cập **[Google Gemini](https://gemini.google.com)** trên máy tính hoặc laptop (khuyến nghị dùng trình duyệt Chrome/Edge để camera ổn định nhất).
2. **Kích hoạt Canvas (Quan trọng nhất):**
   - Bấm vào nút **Canvas** (biểu tượng trang soạn thảo/cửa sổ code) ở khung chat trước khi gửi prompt.
   - *Nếu chưa thấy nút Canvas:* Thêm tiền tố `Tạo trong Canvas:` vào đầu prompt để Gemini tự động mở bảng tương tác.
3. **Chạy game trực tiếp:**
   - Khi Gemini code xong, bên phải màn hình sẽ có nút **"Run code"** hoặc **"Preview"** ➔ Bấm vào để kích hoạt game ngay trên trang web mà không cần tải file về máy.
   - Trình duyệt hiện thông báo hỏi quyền truy cập Webcam ➔ Bấm **"Allow / Cho phép"** để hệ thống nhận diện cử chỉ bàn tay/cơ thể và bắt đầu chơi!
4. *(Tùy chọn ngoại tuyến)*: Bạn cũng có thể bấm nút Copy code, lưu thành file `game.html` trên máy tính và nhấp đúp để mở chơi offline bất cứ lúc nào.

---

⭐ **Thấy hữu ích? Hãy bấm Star kho lưu trữ này để lưu lại khi cần nhé!**
