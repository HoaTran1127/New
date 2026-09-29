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
| Biến thể điều khiển (Point · Swipe · Drag/Grab · Voice · No Camera) | **425** | [prompts/VARIANTS_425.md](prompts/VARIANTS_425.md) — 85 game × 5 kiểu, sinh tự động |
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

### 🕹️ 10 kiểu điều khiển đang dùng (mỗi prompt khai báo rõ, không còn "MIXED")

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

`tools/data/gestures.mjs` còn định nghĩa sẵn **4 mã mở rộng** (chưa game nào dùng, dành cho prompt bạn tự viết thêm): `CLAP` (vỗ hai tay, chốt khi hai tâm bàn tay sát nhau dưới 12% bề rộng vai rồi phải tách ra mới tính nhịp kế), `PINCH` (bóp ngón cái–trỏ, ngưỡng theo bề rộng bàn tay + hysteresis để không nháy liên tục), `HOLD_POSE` (giữ bất động tư thế 1.5 giây, dùng cho game vẽ hình/so sánh góc), `FINGER_COUNT` (giơ 1–4 ngón để chọn đáp án, trung vị cửa sổ 7 khung hình nên không nháy khi ngón đang chuyển — hợp với học sinh lớp 4 mới làm quen camera). Cả 14 mã đều phải đủ 9 trường `vi · landmark · hinh_hoc · muot · nguong · nguoi_choi · bien_do · ar · fallback` — `node tools/validate.mjs` chặn nếu thiếu, và bắt template khai báo đủ mọi mã đang có.

### 🕶️ Chuẩn AR — camera CHÍNH LÀ màn chơi

Cả 85 prompt + 12 prompt legacy đều phải nêu đủ 5 ràng buộc này (thiếu một là game chỉ còn canvas 2D kèm webcam, không phải AR). `tools/validate.mjs` chặn bằng 6 regex:

| Ràng buộc | Nội dung phải có trong prompt |
|:---|:---|
| Nền AR | Vẽ video vào canvas mỗi khung hình, lật gương + **cover-fit** `scale = Math.max(W / video.videoWidth, H / video.videoHeight)`; hoặc `<video object-fit:cover opacity:1>` + canvas trong suốt. Chọn một cách. |
| Lớp phủ tối | Đúng MỘT lớp `rgba(8,5,20,0.4)`, **alpha không vượt 0.45**; thẻ tự có nền gradient + stroke, không nhờ lớp phủ. |
| Tọa độ | **Hàm chiếu duy nhất `toScreen(lx, ly)`** cho landmark 0..1. CẤM `lx * W` — camera bị crop là vật lệch khỏi người học sinh. |
| Chiều sâu | Mỗi vật mang `z từ 1.6` (xa) về 0.35 (sát mặt), vẽ theo 1/z + ellipse bóng dưới chân + speed lines. |
| Neo cơ thể | Vật ảo đeo vào landmark thật (cổ tay 0, khuỷu 13/14, vai 11/12, hông 23/24, tâm bàn tay 5/9/13/17); mất landmark thì biến mất kèm hướng dẫn tiếng Việt. |

Mỗi mã điều khiển trong `tools/data/gestures.mjs` có thêm trường `ar` mô tả cử chỉ đó hòa vào nền AR thế nào (găng neon bọc cổ tay, khung xương dọc thân, vệt kiếm mọc từ tay…), và được in vào mục 4 của prompt game.

### 🏫 Sáu quy định lớp học thật

Cả 85 prompt + 425 biến thể đều mang sáu dòng này (nguồn: `tools/lib/rules.mjs`, validate chặn nếu thiếu) — chúng sinh ra từ những gì hỏng khi đem game webcam vào lớp:

- **60/40 chống ăn may**: vật đúng/sai trộn xấp xỉ 60/40; chạm sai trừ tim, bỏ lỡ đúng chỉ mất chuỗi → vung tay bừa không thắng.
- **Calibration động 3 giây**: đo bề rộng vai + tầm tay của chính học sinh rồi đặt ngưỡng theo đơn vị vừa đo, thay vì hằng số pixel (ngồi gần thì fire liên tục, ngồi xa thì vung hết cỡ vẫn không được tính).
- **Tự Pause khi tab ẩn** (`visibilitychange`/`blur`) + đếm 3-2-1 khi quay lại, reset cooldown để một cú vung dở dang không thành nhát chém.
- **Ngân sách 30 FPS**: nhận diện 1 lần mỗi 2–3 khung hình, particle có pool, FPS < 28 thì tự giảm hiệu ứng — không bao giờ giảm nội dung học.
- **An toàn ánh sáng + không gian**: gợi ý bật đèn/chỉnh hướng ngược sáng (vẫn cho chơi tiếp), nhắc dọn vật cản và cách tường một bước.
- **Tổng kết ba thẻ** "Làm tốt / Cần luyện / Động tác lần sau" và nguyên tắc **nghe-trước** cho game Tiếng Anh (audio trước, chữ sau).

### 💪 Vận động to + cảm giác arcade

Hai lỗi khiến game webcam thất bại khi đưa vào lớp: trẻ chỉ nhấc ngón tay trước ngực (không phải vận động) và cú chạm không có phản ứng nào (chơi như làm bài tập). `tools/lib/feel.mjs` khóa cả hai, và được in vào 85 prompt + 425 biến thể + 12 legacy:

**Năm ràng buộc vận động (`MOTION`)**
- **Biên độ**: mỗi lượt là động tác >= 50% tầm với đã đo lúc calibration, khuỷu duỗi gần thẳng khi chốt — không có đường thắng cả vòng bằng cổ tay.
- **Vùng đích sát mép**: tâm vùng đáp án cách trục cơ thể >= 45% tầm với, nằm trong 12% bề rộng từ cạnh khung, đổi vị trí theo lượt.
- **Xen kẽ nhóm cơ**: một bên tay/một hướng không quá 4 lượt liên tiếp; mỗi 3 lượt đổi mặt phẳng động tác (ngang vai → với cao → xuống thấp).
- **3 hiệp + trạm nghỉ**: 12 lượt chia 3 hiệp, giữa hiệp nghỉ 5 giây đếm ngược, không trừ tim — tương đương 4–6 phút vận động vừa.
- **Thẻ đếm vận động**: "Em đã vận động N động tác trong M phút" ở màn tổng kết, không phải điểm và không so với bạn.

**Sáu ràng buộc arcade (`FEEL`)**
- **Hit-stop 70–90 ms** + giật màn hình 4–6 px + thẻ lún 0.85 rồi nảy (squash & stretch) — nhìn thấy lực của cú chạm.
- **Combo** "x2→x5" hiện to dần kèm vệt neon từ tay tới vật, cao độ âm thanh nhảy bậc theo chuỗi, đứt thì âm rơi và số tan thành hạt.
- **Chữ khen** tiếng Việt bật lên đúng điểm chạm; câu sai dùng chữ đỡ, không chữ đỏ gây sợ.
- **Thẻ vàng x2 điểm** (2 lần/vòng) + 1 câu thử thách xuất hiện từ z xa, biến mất sau 3 giây — hồi hộp mà không đổi dữ liệu học tập.
- **FX hòa vào nền AR** (particle, vệt kiếm từ cổ tay, kính vỡ mạng nhện từ điểm va chạm) trong trần alpha 0.45 và ngân sách particle.
- **Mascot phản ứng**: nghiêng theo hướng với tay, ăn mừng khi combo >= 3, che mắt khi hụt, chỉ về camera khi mất landmark.

Mỗi mã điều khiển còn có thêm trường `bien_do` mô tả động tác to riêng cho cơ chế đó (SWIPE chém từ vai >= 60% tầm với, TWO_HAND_STRETCH dang từ 40% → 100% sải tay…), được in vào mục 4 của prompt và block điều khiển của biến thể.

### 🎒 Bốn quy định lớp học thật (giao diện + tiến bộ)

Nguồn: `tools/lib/classroom.mjs` — cũng được in nguyên văn vào 85 prompt + 425 biến thể + 12 legacy, `validate.mjs` chặn nếu thiếu:

- **Vùng an toàn cho chữ**: chia khung hình 3×3, ô giữa và ô giữa trên (đúng chỗ thân học sinh) là vùng cấm đặt chữ; HUD, đề bài, thẻ đáp án và mascot chỉ ở dải trên, hai cột biên và dải dưới.
- **Đàm phán theo khả năng camera**: game tự nhận biết đang thấy tới đâu (chỉ tay / nửa thân trên / toàn thân) rồi chọn cơ chế theo mức tốt nhất đang có — thiếu vai thì bỏ nghiêng thân, thiếu hông thì bỏ bước chân — và báo bằng tiếng Việt, thay vì đòi toàn thân rồi kẹt ở màn lỗi.
- **Hồ sơ tiến bộ `miti-mastery`**: ghi số lần gặp, số lần đúng, errorTag sai nhiều nhất, chuỗi đúng và ngày chơi gần nhất theo từng cụm kiến thức (không lưu ảnh/video). Lần chơi sau tự xếp câu theo lỗi yếu nhất (lặp lại cách quãng) và tổng kết so với lần trước; mất hồ sơ thì vẫn chơi trọn.
- **Chế độ hai học sinh**: nút bật/tắt, `maxNumHands: 2`, chia khung hình hai nửa theo trục dọc, mỗi tay chỉ chốt trong nửa của mình (gán theo vai nếu có pose), điểm và tim tách riêng, không xếp hạng — lớp 35 em với vài máy tính vẫn chơi được. Biến thể VOICE không dùng chế độ này vì chỉ có một micro.

---

## 🔁 Pipeline: sửa dữ liệu một chỗ, mọi thứ dựng lại

```text
tools/data/games.mjs         85 game: tên, gesture, bối cảnh, nhiệm vụ, cụm kiến thức
tools/data/clusters.mjs      57 cụm kiến thức + nội dung + giải thích sư phạm
tools/data/gestures.mjs      mã điều khiển: landmark, hình học chốt, ngưỡng, bien_do, fallback + trường `ar`
tools/data/examples.mjs      câu mẫu few-shot cho từng cụm
tools/data/error-notes.mjs   nhãn lỗi tiếng Việt (errorTag + loiViet)
tools/lib/ar.mjs             hợp đồng AR (cover-fit, toScreen, alpha, z, neo landmark) — dùng chung mọi chỗ
tools/lib/rules.mjs          quy định lớp học (60/40, calibration, Pause, FPS, an toàn, tổng kết 3 thẻ)
tools/lib/feel.mjs           quy định vận động to + cảm giác arcade (biên độ, mép khung, trạm nghỉ, hit-stop, combo)
tools/lib/classroom.mjs      quy định lớp học thật (vùng an toàn cho chữ, đàm phán camera, miti-mastery, 2 học sinh)
        │
        └─ node tools/build.mjs
             ├─ catalogs/GAME_CATALOG.csv + .md
             ├─ prompts/01-toan4 · 02-toan5 · 03-english4 · 04-english5 (85 file)
             ├─ prompts/VARIANTS_425.md   (85 game × 5 kiểu điều khiển)
             ├─ prompts/01..12 legacy (nâng cấp phụ thuộc, gắn nhãn)
             ├─ catalogs/GAME_CATALOG.js  → index.html vẽ lưới + lọc + copy
             └─ node tools/validate.mjs   → chặn MIXED, thiếu hợp đồng AR, thiếu quy định lớp học,
                                            425 block biến thể, link gãy, thiếu chữ ký MiTi, rò ${}
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
