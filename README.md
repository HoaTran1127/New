# 🟡 MiTi ✦ Học Bằng Chuyển Động
### 🎮 Thư Viện 85 Prompt Game Chuẩn (+12 Prompt Legacy) Tạo Game Web AR Tương Tác Qua Camera Bằng Google Gemini

[![Google Gemini](https://img.shields.io/badge/Google_Gemini-Canvas_Ready-8E75FF?style=for-the-badge&logo=googlegemini&logoColor=white)](https://gemini.google.com)
[![MediaPipe AI](https://img.shields.io/badge/AI_Vision-MediaPipe_Tasks_Vision_1.0.1-00F0FF?style=for-the-badge&logo=google&logoColor=black)](https://developers.google.com/mediapipe)
[![Web Audio](https://img.shields.io/badge/Audio-Web_Audio_API_tong_hop-FF007A?style=for-the-badge)](https://developer.mozilla.org/docs/Web/API/Web_Audio_API)
[![Live Studio](https://img.shields.io/badge/Web_Dashboard-Chọn_Game_Ngay-FFE600?style=for-the-badge&logo=githubpages&logoColor=black)](https://hoatran1127.github.io/New/)

> 🎯 **North Star:** Vào thư viện ➔ Chọn game yêu thích ➔ **1 Click Copy Prompt** ➔ Dán vào **[Google Gemini](https://gemini.google.com)** ➔ Nhận ngay mã nguồn Game Web AR 1 file HTML hoàn chỉnh, bật camera chơi chuyển động 60 FPS cực mượt!

> 🧑‍🏫 **Giáo viên muốn giảng bài thay vì cho học sinh chơi?** Thư viện có thêm **[39 giáo án bảng phấn](prompts/giao-an/README.md)** cho Toán lớp 4–5: giáo viên trình bày trên màn chiếu, mọi con số thành vật thật vẽ phấn cắt và kéo được bằng ngón tay, không tim không điểm không xếp hạng. Chi tiết ở mục **🧑‍🏫 Bộ giáo án giảng bài** phía dưới.

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

### ♿ Sáu quy định tiếp cận + an toàn thần kinh

Nguồn: `tools/lib/access.mjs` — in nguyên văn vào 85 prompt + 425 biến thể + 12 legacy, `validate.mjs` chặn nếu thiếu. Đây là nhóm quy định dễ bị bỏ nhất vì game vẫn "chạy được" mà không ai biết có em đang chơi mà không hiểu mình đúng hay sai:

- **Trần nhấp nháy 3 lần/giây**: không hiệu ứng nào bật–tắt quá 3 lần mỗi giây, không giật sáng phủ toàn màn hình, vùng đang chớp ≤ 25% khung hình. Flash khi mất máu là viền mép mờ dần 200–300 ms, viền HUD theo combo đổi độ sáng mượt.
- **Tự đọc `prefers-reduced-motion`**: đọc cài đặt máy lúc khởi động rồi **bật sẵn** chế độ Giảm hiệu ứng (tắt particle, bỏ giật màn hình, hit-stop còn ~30 ms) nhưng giữ nguyên 100% nội dung học — vì trong lớp thật thì không em nào bấm nút Giảm hiệu ứng.
- **Màu không là kênh duy nhất**: đúng/sai/đang chọn/bị khóa phân biệt được bằng ≥ 2 kênh ngoài màu (biểu tượng ✓ ✗, chữ, hình dạng, âm thanh); không dựa vào cặp đỏ–xanh lá vì khoảng 8% học sinh nam và 0,5% học sinh nữ mù màu đỏ–lục.
- **Phụ đề cho mọi âm thanh**: nút "Hiện chữ" bật được ngay từ đầu chứ không chờ trả lời sai; lời giải, lời khen, thông báo lỗi đều có dạng chữ — lớp ồn hay học sinh nghe kém vẫn đạt 100% mục tiêu, còn em đọc chưa vững vẫn chơi bằng tai.
- **Tương phản ≥ 4.5:1** giữa chữ và nền ngay sau lưng nó (chữ lớn ≥ 3:1), mỗi thẻ tự có nền + viền ≥ 2px + bóng đổ: tắt lớp phủ tối đi thì chữ vẫn đọc được trên khung hình có cửa sổ sáng phía sau.
- **Câu hỏi tay thuận**: calibration hỏi một chạm "Em thuận tay nào?" (Trái / Phải / Cả hai) rồi gương lại hướng dẫn và gán tay điều khiển theo lựa chọn đó, mốc biên độ 50% tầm với đo theo đúng tay — thuận tay trái không phải với chéo người suốt 12 lượt.

### 🧪 Đề phải tự kiểm chứng + độ khó theo năng lực

Nguồn: `tools/lib/verify.mjs`. Đây là tầng sửa hai lỗi **không ai nhìn thấy khi test**:

**Tự kiểm chứng (`VERIFY`)** — một mô hình sinh 40–60 mục chắc chắn vài mục lỗi, và game sẽ âm thầm dạy sai. Prompt cũ chỉ viết "mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code", đó là lời hứa chứ không phải cơ chế:

- **`verifyQuestionBank()` chạy một lần lúc nạp**: `answer` phải có trong `choices` và xuất hiện đúng một lần; `errorTag` thuộc đúng danh sách đã khai báo; không hai mục trùng `prompt`; mỗi level chiếm tối thiểu 1/4 số mục. Mục trượt bị **loại khỏi vòng chơi** + `console.warn` nêu id và lý do.
- **Mỗi phương án nhiễu sai theo MỘT LỖI THẬT** (quên nhớ, quên chia đôi diện tích tam giác…), không phải `3 + 2 = 99`; trước khi chốt mục phải thử "theo cách hiểu hợp lý nào thì phương án này đúng?".
- **Guard phạm vi**: mọi số nằm trong phạm vi SGK đã khai báo, không chia cho 0, kết quả hữu hạn; game Tiếng Anh thì mọi từ phải có trong word list.
- **Chống đoán mò bằng cấu trúc**: quy tắc 60/40 chặn vung tay bừa, nhưng trẻ còn mẹo "chọn số to nhất / cái lặp lại từ trong đề". Trần đếm được: không quá 20% cho mẹo to-nhất và dài-nhất, vị trí đáp án đúng phân bố đều `1/3 ± 10%` theo chính hàm seed.
- **Level khớp số bước thật**: 1 = một bước, 2 = hai bước, 3 = ba bước trở lên — không dán nhãn level 3 cho phép một bước chỉ để đủ chỉ tiêu.

**Thích ứng (`ADAPT`)** — prompt cũ ghi "tăng độ khó ở lượt 5 và lượt 9", tức là đảm bảo trẻ yếu trượt đúng lúc bài khó nhất:

- **2 câu đúng liên tiếp lên một level, 2 câu sai liên tiếp xuống một level và bắt buộc cùng `errorTag`** — sử đúng chỗ yếu, không gặp chủ đề lạ. Lượt 5 và 9 chỉ còn là mốc nhịp.
- **Sàn chống nản**: không em nào được sai quá 3 câu liên tiếp; câu thứ 4 là level 1 cùng `errorTag` kèm lời giải **từng bước** trước khi chọn lại, và chọn lại đúng thì không trừ tim lần hai.
- **Level ẩn với học sinh**: không "level", không sao xếp hạng; phân bố theo level chỉ hiện ở màn tổng kết dành cho giáo viên.

---

## 🧑‍🏫 Bộ giáo án giảng bài — bảng phấn và vật thật (39 giáo án Toán 4–5)

👉 **[Mở bộ giáo án](prompts/giao-an/README.md)** — thư mục `prompts/giao-an/`, sinh bằng `tools/build-lessons.mjs`.

Đây là **CÔNG CỤ GIẢNG BÀI cho giáo viên trình bày trước cả lớp**, tách hẳn khỏi 85 prompt game cho học sinh tự chơi. Bảng phấn và vật thật là của riêng bộ giáo án; 85 prompt game không mang một dòng nào trong đó. Hai bộ đi từ cùng một cụm kiến thức nên cùng một bài được dạy bằng cái pizza rồi luyện bằng chính cái pizza đó, nhưng cơ chế thì **đối lập nhau có chủ đích**:

| | 🧑‍🏫 Bộ giáo án (39) | 🎮 85 prompt game |
| --- | --- | --- |
| Ai dùng | Giáo viên trình bày, cả lớp xem màn chiếu | Học sinh tự chơi, một máy một hoặc hai em |
| Nhịp | Chờ giáo viên bấm "Bước tiếp", không tự chuyển | 12 lượt, tăng độ khó ở lượt 5 và lượt 9 |
| Động cơ | Không tim, không điểm, không combo, không xếp hạng | Có tim, điểm, chuỗi combo, thẻ vàng x2, mascot |
| Bảng phấn | ≥ 70% màn chiếu, **không bao giờ tự lau**, tối đa 8 trang | Bảng chữ L ≤ 40% khung hình, tự lau sau mỗi lượt |
| Camera | Phụ: dạy trọn vẹn bằng chuột và bàn phím | Chính: khung hình webcam là màn chơi |
| Nguồn quy định | `tools/lib/chalk.mjs` + `tools/lib/lesson.mjs` | `tools/lib/feel.mjs` + `tools/lib/classroom.mjs` |

### Mạch bài năm bước, giống nhau ở cả 39 giáo án

**Khởi động** 2–3 phút (hỏi gắn với vật thật, chưa viết gì lên bảng) → **Vật thật** 4–5 phút (thao tác tay trên vật đếm được) → **Sơ đồ** 3–4 phút (học sinh tự tay dựng biểu diễn bán cụ thể) → **Phép tính** 3–4 phút (mỗi con số nối ngược về sơ đồ) → **Luyện tập chung** 3–4 phút (cả lớp biểu quyết bằng ngón tay). Tổng 15–20 phút, có thanh tiến trình giáo viên kéo được để đổi ngân sách theo lớp mình.

Trình tự này theo khung **Concrete – Representational – Abstract**: lỗi kinh điển khi dạy Toán bằng vật thật là nhảy thẳng từ vật sang thuật toán, bỏ qua bước biểu diễn bán cụ thể. Vì vậy mỗi cụm trong `tools/data/props.mjs` có **5 trường** chứ không phải 4 — trường `so_do` là sơ đồ học sinh phải tự dựng, và `validate.mjs` chặn nếu để trống.

### 🖍️ Mười quy định bảng phấn + vật thật (`tools/lib/chalk.mjs`)

- **Bảng phấn ảo**: alpha nền **0.55–0.70** (vẫn thấy lớp học phía sau), nền `#2E4638`, viền gỗ 12–18 px, nét phấn 4–7 px `#F4F1E4` rơi 8–12 hạt bụi mỗi nét. **Mép trên không cao quá landmark vai + 15% chiều cao khung hình** — đứng sát bảng mà phải với quá đầu thì bàn tay bị chính thân người che khỏi camera.
- **Viết phấn bằng đầu ngón tay**: pinch ngón 4–8 (≤ 0.06 lần khoảng cách 5–17) thì đầu ngón 8 thành đầu phấn; **nắm bàn tay giữ 350–500 ms** là giẻ lau xoá bán kính 110 px; Hoàn tác 20 bước; không camera thì giữ chuột là viết, phím E là lau.
- **Mọi con số thành vật đếm được**: **7 là bảy quả táo vẽ phấn chứ không phải chữ "7"**; đủ 10 đơn vị gộp một bó; > 50 đơn vị hiện bó 10 + lẻ; nhãn số chỉ hiện **sau khi** đếm xong.
- **Ba chặng không nhảy cóc**: VẬT THẬT → SƠ ĐỒ → PHÉP TÍNH. Mỗi con số trong phép tính phải có một đường phấn nối ngược về bộ phận của sơ đồ sinh ra nó; số nào không nối được thì bảng gạch chân nét đứt và hỏi lại "số này lấy từ đâu trong sơ đồ?".
- **Bài toán đố dựng thành cảnh**: đề tối đa **2 dòng chữ**, mỗi danh từ là một hình vẽ phấn trong khay để kéo vào cảnh; ẩn số là ô nét đứt có dấu `?`; thả sai thì cảnh đã dựng **giữ nguyên**.
- **Phân số chia theo số phần 2–12**: khay 11 thẻ số phần cho mọi mẫu số (đề trong repo có cả 1/3, 1/5, 1/6), vẫn giữ đường tắt ngón tay 2/4/8. Luỹ thừa của 2 thì số nhát bằng `log2` số phần; không phải luỹ thừa thì bảng kẻ đường mốc mờ để quẹt xác nhận. Cùng một giá trị phải hiện được bằng **≥ 2 trong 4 mô hình** {diện tích, băng giấy, tia số, tập hợp}.
- **Số đo đọc từ dụng cụ có vạch**: đúng đơn vị đề dùng, cầm kéo được bằng ngón tay, có đường phấn nối từ mép vật sang vạch đang đọc.
- **Lời giải viết từng dòng ≤ 12 từ**, bảng không bao giờ tự viết hết — mỗi dòng hỏi lại một câu; sai thì gạch chéo `#C9564B` và giẻ lau chỉ xoá **đúng dòng đó**.
- **Chống mỏi tay** (viết phấn giữa không trung là động tác mỏi nhanh nhất của hand tracking): chế độ **chạm-bật viết** để không phải giữ pinch, **nghỉ bắt buộc sau 90 giây** pinch liên tục kèm đếm ngược 5 giây, khay phấn đặt ngang khuỷu tay làm điểm tựa, và **mất landmark quá 500 ms thì nét dở đóng băng tại chỗ** chứ không xoá hay nhảy nét.
- **Lưu bảng của tiết dạy**: tuần tự hoá nét vẽ + vật + sơ đồ vào `localStorage` khoá `miti-board`, tối đa **200 KB**, có nút Lưu / Mở / In (nền trắng chữ đen). **Tuyệt đối không lưu ảnh hay video camera.**

### 👩‍🏫 Mười một quy định chế độ giảng bài (`tools/lib/lesson.mjs`)

- **Giáo viên trình bày**: màn chiếu 16:9, bảng chiếm ≥ 70%, chữ phấn **≥ 40 px** (lớn hơn mức 34 px của game) vì người đọc đứng ở cuối phòng; điều khiển trọn bài bằng chuột và bàn phím, camera chỉ bật khi mời em lên bảng.
- **Không một cơ chế game nào**: không tim, điểm, combo, xếp hạng, đồng hồ gây áp lực, hit-stop, giật màn hình, mascot. Sai thì chỉ có một dòng phấn đỡ bằng chữ.
- **Nhịp do giáo viên quyết định**: dựng cảnh ≥ 600 ms, có nút đổi tốc độ 0.5x/1x/1.5x và **phát lại bước tối đa 8 giây, không giới hạn số lần**.
- **Năm bước có ngân sách phút** và thanh tiến trình kéo được; hết ngân sách thì báo "quá giờ" chứ không tự cắt bài.
- **"Mời em lên bảng"**: chuyển quyền trong ≤ 5 giây, hàng đợi 4 em, ghi vị trí cổ tay (landmark 0) của bàn tay được gán, tự trả quyền sau 3 giây không thao tác, tối đa 12 lượt một tiết.
- **Bỏ qua bàn tay lạ trong lớp đông**: `maxNumHands: 2`, mọi bàn tay có gốc cổ tay ngoài vùng bảng + 10% đệm bị bỏ qua hoàn toàn — em ngồi dưới giơ tay phát biểu không vẽ bậy lên bảng được; nhiều tay trong vùng bảng thì tạm khoá và hỏi giáo viên chứ không tự đoán.
- **Cả lớp trả lời bằng ngón tay**: đếm số bàn tay theo từng đáp án trong 5 giây, ghi rõ "camera thấy N em" và có nút cộng tay cho số em camera không thấy; cột đáp án sai cao hơn 1/3 thì bảng gợi ý giảng lại bước SƠ ĐỒ.
- **Bảng không bao giờ tự lau**: cả năm bước cộng lại thành một trang bảng hoàn chỉnh để cuối tiết cả lớp nhìn lại mạch bài.
- **Chữ phải đọc được từ dãy cuối lớp**: chuẩn là mắt một em cách màn chiếu 7–8 m chứ không phải laptop của cô — chữ phấn ≥ 40 px **và** ≥ 5.5% chiều cao khung hình (để máy chiếu 1024×768 vẫn ra cỡ), tối đa 12 chữ một dòng và 6 dòng một lúc, có nút "Chữ to cho lớp đông" ×1.4 và nút "Xem thử từ cuối lớp" thu 25% + mờ để cô tự kiểm ngay tại bàn.
- **Dạy được khi mất mạng**: mạng trường đứt là chuyện thường, nên CDN chết thì màn chờ chỉ tối đa **8 giây** rồi bảng phấn hiện ra dạy bình thường bằng chuột; không một lỗi tải nào được khoá nội dung; mở file trên máy khác, không mạng, không tài khoản vẫn chạy, và không có dữ liệu nào của lớp gửi đi.
- **`verifyLessonBank()` chạy lúc nạp và trước khi lưu bảng**: `answer` có trong `choices` đúng một lần, ≥ 6 mục phủ ≥ 3 nhãn lỗi, mọi phương án sai phải mô phỏng một lỗi thật (cấm `3 + 2 = 99`), số trong đề đúng phạm vi SGK. Mục lỗi bị loại kèm `console.warn` tiếng Việt, còn dưới 5 mục hợp lệ thì nút "Cả lớp trả lời" và "Lưu bảng" tự khoá — cảnh báo chỉ hiện ở dải điều khiển của cô, không hiện lên bảng trước 35 em.

### 📄 Ba quy định "từ bảng ra vở" (`tools/lib/handout.mjs`)

Một tiết giảng chỉ xong khi các em làm được bài trên giấy. Khảo sát 39 giáo án cho thấy **0/39** có bất kì đầu ra nào cho tờ giấy — nút "In bảng" mới là in lại ảnh bảng phấn.

- **Phiếu bài tập A4 sinh từ CHÍNH `LESSON_DATA`** đã được `verifyLessonBank()` kiểm, không phải danh sách câu hỏi thứ hai tự bịa: 6–8 câu theo đúng thứ tự đã giảng, bắt buộc **≥ 2 câu mang cùng một `errorTag`** với lỗi cả lớp hay mắc nhất, mỗi câu chừa khoảng trắng **≥ 3 cm** kèm dòng "Em viết phép tính hoặc sơ đồ ở đây". Chỉ một màu đen, in được khi mất mạng (`window.print()` + stylesheet nội tuyến, `@page` A4 lề 1.5 cm), có dòng "Họ và tên / Lớp" để viết tay và **không bao giờ in tên học sinh**.
- **Trang đáp án riêng cho cô**: in bằng nút riêng, mỗi dòng ghi đáp án + lời giải ≤ 12 từ + nhãn lỗi `loiViet`; khi "In phiếu bài tập" thì không được sót trang đáp án vào phiếu của học sinh — kể cả chữ màu trắng hay `display:none`.
- **Khung "Nội dung để chép"** cho lớp không có máy in: đúng **ba dòng** chữ ≥ 40 px — dòng ghi nhớ chốt, một ví dụ đã làm thật trên bảng ở bước PHÉP TÍNH, và một bài về nhà lấy từ `LESSON_DATA` (không tự bịa số ngoài SGK). Copy ra được văn bản thuần có dấu.

### Vật thật và sơ đồ theo cụm kiến thức (`tools/data/props.mjs`)

38 cụm Toán, mỗi cụm đủ 5 trường `vat · don_vi · ngon_tay · so_do · doc`, không để mô hình tự bịa:

| Cụm | Vật thật vẽ phấn | Ngón tay làm gì | Sơ đồ học sinh tự dựng |
| --- | --- | --- | --- |
| `phan-so-dau` | pizza tròn + băng giấy chữ nhật | giơ 2/4/8 ngón hoặc pinch thẻ số phần rồi quẹt một đường | ba mô hình cho cùng một phân số: hình tròn tô phần, băng chia khúc, tia số có vạch tại k/N |
| `chuyen-dong-de` | con đường kẻ phấn với hai xe ở hai đầu | nắm kéo từng xe, mỗi lần kéo tiến đúng số km ghi trên thân xe | đoạn thẳng hai mũi tên ngược chiều, tổng vận tốc ở giữa |
| `the-tich` | hộp trong suốt + khay khối lập phương 1 cm³ | xếp kín một lớp đáy rồi quẹt một đường để nhân lên một tầng | ba hình cạnh nhau: lớp đáy, một tầng, hộp hoàn chỉnh ghi ba cạnh |
| `khoi-luong` | cân hai đĩa + quả cân 1 g / 1 kg / 1 tạ / 1 tấn | nắm kéo quả cân bỏ lên đĩa, đĩa nặng hạ 12 độ | chuỗi mũi tên nhân chia 10 nối các ô tấn - tạ - kg - g |
| `phan-tram` | lưới 100 ô + bảng giá có thanh trượt giảm giá | kéo thanh trượt, lưới tự tô đúng số ô và giá tự tính lại | ba thanh trên cùng một trục: giá ban đầu, phần giảm, phần phải trả |
| `ti-so-dau-bep` | cái nồi + các bát nguyên liệu xếp quanh | quẹt tăng/giảm số khẩu phần, mọi bát nhân cùng hệ số | bảng một cột cho mỗi nguyên liệu, một hàng cho mỗi số khẩu phần |
| `hinh-binh-hanh` | hình bình hành có đường cao nét đứt | quẹt dọc đường cao cắt rời mảnh tam giác rồi kéo sang bên kia | hình chữ nhật ghép được trên lưới ô vuông, đáy và đường cao nối sang hai cạnh tương ứng |


---

## 🔁 Pipeline: sửa dữ liệu một chỗ, mọi thứ dựng lại

```text
tools/data/games.mjs         85 game: tên, gesture, bối cảnh, nhiệm vụ, cụm kiến thức
tools/data/clusters.mjs      57 cụm kiến thức + nội dung + giải thích sư phạm
tools/data/gestures.mjs      mã điều khiển: landmark, hình học chốt, ngưỡng, bien_do, fallback + trường `ar`
tools/data/examples.mjs      câu mẫu few-shot cho từng cụm
tools/data/error-notes.mjs   nhãn lỗi tiếng Việt (errorTag + loiViet)
tools/data/props.mjs         vật thật vẽ phấn cho 38 cụm Toán (vat · don_vi · ngon_tay · so_do · doc)
tools/data/lessons.mjs       38 giáo án: tên bài, câu khởi động, dòng ghi nhớ
tools/lib/ar.mjs             hợp đồng AR (cover-fit, toScreen, alpha, z, neo landmark) — dùng chung mọi chỗ
tools/lib/rules.mjs          quy định lớp học (60/40, calibration, Pause, FPS, an toàn, tổng kết 3 thẻ)
tools/lib/feel.mjs           quy định vận động to + cảm giác arcade (biên độ, mép khung, trạm nghỉ, hit-stop, combo)
tools/lib/classroom.mjs      quy định lớp học thật (vùng an toàn cho chữ, đàm phán camera, miti-mastery, 2 học sinh)
tools/lib/access.mjs         tiếp cận + an toàn thần kinh (trần nhấp nháy, reduced-motion, không chỉ dùng màu, phụ đề, tương phản, tay thuận)
tools/lib/verify.mjs         tự kiểm chứng đề + độ khó thích ứng (verifyQuestionBank, nhiễu theo lỗi thật, guard phạm vi, chống mẹo, level thích ứng, sàn chống nản)
tools/lib/chalk.mjs          bảng phấn + vật thật, 10 quy định — dùng cho BỘ GIÁO ÁN
tools/lib/lesson.mjs         chế độ giảng bài, 11 quy định — dùng cho BỘ GIÁO ÁN
tools/lib/handout.mjs        từ bảng ra vở, 3 quy định (phiếu in, đáp án, chép vào vở)
        │
        └─ node tools/build.mjs
             ├─ catalogs/GAME_CATALOG.csv + .md
             ├─ prompts/01-toan4 · 02-toan5 · 03-english4 · 04-english5 (85 file)
             ├─ prompts/VARIANTS_425.md   (85 game × 5 kiểu điều khiển)
             ├─ prompts/01..12 legacy (nâng cấp phụ thuộc, gắn nhãn)
             ├─ prompts/giao-an/ (39 giáo án + README)  ← tools/build-lessons.mjs
             ├─ catalogs/GAME_CATALOG.js  → index.html vẽ lưới + lọc + copy
             └─ node tools/validate.mjs   → chặn MIXED, thiếu hợp đồng AR, thiếu quy định lớp học,
                                            425 block biến thể, link gãy, thiếu chữ ký MiTi, rò ${},
                                            giáo án thiếu quy định bảng phấn / chế độ giảng bài /
                                            vật thật thiếu trường, và CƠ CHẾ GAME LỌT SANG GIÁO ÁN
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
