# 🟡 MiTi ✦ Học Bằng Chuyển Động
### 🎮 Thư Viện 85 Prompt Game Chuẩn (+12 Prompt Legacy) Tạo Game Web AR Tương Tác Qua Camera Bằng Google Gemini

[![Google Gemini](https://img.shields.io/badge/Google_Gemini-Canvas_Ready-8E75FF?style=for-the-badge&logo=googlegemini&logoColor=white)](https://gemini.google.com)
[![MediaPipe AI](https://img.shields.io/badge/AI_Vision-MediaPipe_Tasks_Vision_1.0.1-00F0FF?style=for-the-badge&logo=google&logoColor=black)](https://developers.google.com/mediapipe)
[![Web Audio](https://img.shields.io/badge/Audio-Web_Audio_API_tong_hop-FF007A?style=for-the-badge)](https://developer.mozilla.org/docs/Web/API/Web_Audio_API)
[![Live Studio](https://img.shields.io/badge/Web_Dashboard-Chọn_Game_Ngay-FFE600?style=for-the-badge&logo=githubpages&logoColor=black)](https://hoatran1127.github.io/gemini-canvas-ar-prompts/)

> 🎯 **North Star:** Vào thư viện ➔ Chọn game ➔ **Copy khối `text`** ➔ Dán vào **[Google Gemini](https://gemini.google.com) (bật Canvas)** ➔ Nhận 1 file HTML hoàn chỉnh, bật camera chơi bằng chuyển động.

---

## 🚀 Trải Nghiệm Nhanh Trực Tuyến

* 🌐 **[MỞ DASHBOARD MiTi (Chọn Game & Copy Prompt) →](https://hoatran1127.github.io/gemini-canvas-ar-prompts/)**
* 🕹️ **Chơi thử demo chạy sẵn trên trình duyệt:**
  * [Demo 1: Subway Math Blitz AR](https://hoatran1127.github.io/gemini-canvas-ar-prompts/games/math-blitz/) · [Demo 2: AR Math Catcher](https://hoatran1127.github.io/gemini-canvas-ar-prompts/games/math-catcher/)
  * [Demo 3: Math Ninja Bubble Pop](https://hoatran1127.github.io/gemini-canvas-ar-prompts/games/math-bubble/) · [Demo 4: English Word Ninja](https://hoatran1127.github.io/gemini-canvas-ar-prompts/games/english-word-ninja/)
  * *Demo trong `games/` là mã nguồn cũ để xem cơ chế; sản phẩm chính của repo là **prompt**, game mới do Gemini Canvas sinh từ prompt.*

---

## ⚡ 3 Bước Sử Dụng

```text
[1] CHỌN & COPY PROMPT         [2] BẬT CANVAS & DÁN VÀO GEMINI    [3] CHƠI GAME TRÊN WEBCAM
Mở file prompt trong prompts/  Mở gemini.google.com, BẬT          Gemini mở cửa sổ Canvas,
hoặc Dashboard, copy nguyên    CHẾ ĐỘ CANVAS ➔ Dán prompt ➔       bấm Run/Preview để chơi
khối ```text.                  Nhấn Enter để AI tạo game.         ngay bằng cử chỉ camera.
```

> [!IMPORTANT]
> **⚠️ BẮT BUỘC BẬT CHẾ ĐỘ CANVAS TRÊN GEMINI:**
> * **Không bật Canvas:** Gemini chỉ in code ra chat, bạn phải tự lưu file `.html` mới mở được.
> * **Bật Canvas:** Gemini hiện bảng bên phải có nút **"Run code" / "Preview"** để chơi ngay trên trình duyệt, không tải file.
> * *Chưa thấy nút Canvas?* Gõ thêm `Mở Canvas và tạo game:` ở đầu prompt.

---

## ✂️ Prompt Ngắn — Vì Sao Toàn Thư Viện Được Rút Gọn (vòng 2026-10)

Đo trên bản cũ: 85 file prompt nặng **13,49 MB** (trung bình **162 KB/file**), trong đó **~77% là chữ quy định chung lặp y hệt giữa 85 file**, còn **ý tưởng + mục tiêu học tập của từng game chỉ ~2,5%**. Prompt dài như vậy làm Gemini Canvas ngợp: model vật sang code vụn, lặng lẽ bỏ quy định ở giữa file, game sinh ra lộn xộn.

| Thành phần | Trước | Sau |
|:---|---:|---:|
| 85 prompt game | 13,49 MB (TB 162 KB) | **1,03 MB (TB 12 KB)** |
| 12 prompt legacy | ~124 KB/file | **9,8–10,2 KB/file** |
| `VARIANTS_425.md` | 64,05 MB | **4,66 MB** (mỗi block ≤ 11,3 KB) |
| `00-master-canvas-prompt.md` | 188 KB | **13,2 KB** |
| `templates/game-prompt-template.md` | 115,6 KB | **10,6 KB** |
| `CHECKLIST_NGHIEP_THU.md` | 52,3 KB | **9,7 KB** |

Mỗi prompt giờ có **đúng 5 mục**: `1. Ý TƯỞNG` · `2. MỤC TIÊU HỌC TẬP` · `3. RÀNG BUỘC CỐT LÕI` · `4. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)` · `5. TỰ KIỂM TRA TRƯỚC KHI XUẤT`.

Toàn bộ quy định dùng chung (1 file HTML, camera tắt mặc định, MediaPipe Tasks Vision `@1.0.1` + `toScreen`, chống spam cử chỉ, fallback chuột, không điểm/xếp hạng/timer, vận động thật + 5 bước, luân phiên 4 em, accessibility, tự Pause, chữ ký MiTi, không TODO) nằm trong **14 dòng `CORE_LINES` ở `tools/lib/core.mjs`** — nơi **duy nhất** để đổi quy định cho cả 85 prompt + 425 biến thể. `node tools/validate.mjs` in nguyên văn 14 dòng đó vào từng prompt và **báo đỏ nếu một prompt vượt trần 15.000 byte**.

---

## 🔥 PROMPT "ĂN LIỀN" — COPY TỪ FILE, KHÔNG SAI LỆCH BẢN

Toàn bộ prompt nằm trong file `.md` riêng, mỗi file một game, copy nguyên khối `text` là dùng được. README không nhân bản nội dung để tránh hai bản lệch nhau.

| Nhóm | Số lượng | Mở ở đâu |
|:---|:---:|:---|
| Prompt game chuẩn (Toán 4 · Toán 5 · Starters · Movers · Flyers) | **85** | [Dashboard MiTi](https://hoatran1127.github.io/gemini-canvas-ar-prompts/) hoặc [catalogs/GAME_CATALOG.md](catalogs/GAME_CATALOG.md) |
| Khung master 5 mục để tự viết prompt mới | 1 | [prompts/00-master-canvas-prompt.md](prompts/00-master-canvas-prompt.md) |
| Biểu mẫu điền nhanh | 1 | [prompts/templates/game-prompt-template.md](prompts/templates/game-prompt-template.md) |
| Bảng kiểm nghiệm thu cầm tay (14 mục cốt lõi + 6 việc người thử) | 1 | [prompts/CHECKLIST_NGHIEP_THU.md](prompts/CHECKLIST_NGHIEP_THU.md) |
| Biến thể điều khiển (Point · Swipe · Drag/Grab · Voice · No Camera) | **425** | [prompts/VARIANTS_425.md](prompts/VARIANTS_425.md) — 85 game × 5 kiểu, sinh tự động |
| Prompt legacy đời đầu (giữ cơ chế cũ, dùng ràng buộc cốt lõi hiện hành) | **12** | [prompts/README.md](prompts/README.md) |

## 📚 85 GAME CHUẨN: TOÁN THEO KHỐI LỚP, TIẾNG ANH THEO BAND CAMBRIDGE

| Môn Học & Khối Lớp | Số Lượng | Nội Dung Trọng Tâm | Link |
|:---|:---:|:---|:---|
| 🔢 **Toán Lớp 4** | **40** | Cấu tạo số, 4 phép tính, phân số, hình học, diện tích, góc, đổi đơn vị đo | [prompts/01-toan4/](prompts/01-toan4/) |
| 📐 **Toán Lớp 5** | **15** | Số thập phân, tỉ số %, chuyển động s = v × t, thể tích khối hộp | [prompts/02-toan5/](prompts/02-toan5/) |
| 🇬🇧 **Tiếng Anh · Pre A1 Starters** | **10** | Từ vựng nền tảng (Animals, School, Family, Colours), nghe chọn tranh, chính tả, ghép câu, phonics | [prompts/03-english-starters/](prompts/03-english-starters/) |
| 🌍 **Tiếng Anh · A1 Movers** | **10** | Quá khứ đơn, so sánh hơn/nhất, xây từ, đặt câu hỏi, bộ ba trí nhớ, ôn tổng hợp | [prompts/04-english-movers/](prompts/04-english-movers/) |
| 🎓 **Tiếng Anh · A2 Flyers** | **10** | Điền từ vào đoạn văn, cụm từ, nói mô tả tranh, đọc hiểu thám tử, kể chuyện | [prompts/05-english-flyers/](prompts/05-english-flyers/) |

Trình độ tiếng Anh chia theo **band Cambridge YLE** (wordlist 2025: 515 từ Starters · +379 Movers · +497 Flyers = **1 391 từ**), cộng từ SGK Việt Nam và số đếm trong `tools/data/yle.mjs` → dải từ tích luỹ **541 / 930 / 1 431**. Mỗi prompt in rõ band, trần từ vựng và 8 cấu trúc ngữ pháp của band; `validate.mjs` chặn câu mẫu dùng từ vượt band. Lớp 4/5 vẫn là metadata của từng game và dòng "Yêu cầu cần đạt" SGK vẫn in nguyên văn để giáo viên đối chiếu.

Ngân hàng dữ liệu mỗi prompt: **Toán tối thiểu 30 mục, Tiếng Anh tối thiểu 60 mục**, chia 3 mức độ, mỗi mục có `answer` + `explanation` + `loiViet` kiểm chứng được bằng code.

### 🕹️ 10 mã điều khiển đang dùng (đếm theo cử chỉ chính của 85 game)

| Mã | Học sinh làm gì | Số game |
|:---|:---|:---:|
| `POINT` | Chỉ ngón trỏ vào đáp án | 30 |
| `DRAG` | Kéo vật thả vào ô đích | 13 |
| `GRAB` | Nắm và bắt vật đang rơi / trôi | 12 |
| `PUNCH` | Vung tay đấm trúng thẻ đáp án | 10 |
| `SWIPE` | Vuốt / chém qua vật theo quỹ đạo | 9 |
| `STEP` | Nghiêng người hoặc bước sang vùng trái / phải | 5 |
| `TWO_HAND_STRETCH` | Khom hai tay căng giãn khoảng cách | 2 |
| `VOICE` | Nói to câu trả lời (Web Speech API) | 2 |
| `TWO_HAND_BALANCE` | Hai tay nâng / hạ tạo đòn cân | 1 |
| `ANGLE_POSE` | Hai cánh tay tạo thành góc có số đo | 1 |

Bốn mã `CLAP`, `PINCH`, `HOLD_POSE`, `FINGER_COUNT` đã định nghĩa trong `tools/data/gestures.mjs` nhưng chưa game nào dùng — dành cho prompt bạn tự viết thêm. Mỗi mã đủ 9 trường `vi · landmark · hinh_hoc · muot · nguong · nguoi_choi · bien_do · ar · fallback`; `tools/data/gestures.mjs` còn khai `BANK` (số câu tối thiểu theo môn).

---

## 🔁 Pipeline: Sửa Dữ Liệu Một Chỗ, Mọi Thứ Dựng Lại

```text
tools/data/games.mjs        85 game: tên, gesture, bối cảnh, nhiệm vụ, cụm kiến thức
tools/data/clusters.mjs     57 cụm kiến thức + nội dung + cách giải thích sư phạm
tools/data/gestures.mjs     14 mã điều khiển (9 trường) + BANK số câu theo môn
tools/data/identities.mjs   85 bản sắc riêng: mascot, tính cách, 3 câu thoại, 3 mã hex, khoảnh khắc, đạo cụ AR
tools/data/sports.mjs       14 môn thể thao theo mã điều khiển
tools/data/folk.mjs         14 trò chơi dân gian theo mã điều khiển
tools/data/standards.mjs    57 dòng chuẩn SGK: mạch, nhãn HUD, khoảng tuần, yêu cầu cần đạt, mẹo nhớ
tools/data/examples.mjs     mục QUESTION_DATA mẫu cho từng cụm (Toán) + 25 bộ theo band "ST:cluster" (EXAMPLES_YLE)
tools/data/yle.mjs          1 391 từ wordlist Cambridge YLE 2025 chia 3 band + 15 chủ đề + 8 cấu trúc/band + levelOf()
tools/data/error-notes.mjs  nhãn lỗi tiếng Việt (errorTag + loiViet)
tools/data/legacy.mjs       12 prompt đời đầu
        │
        ├─ node tools/build.mjs
        │    ├─ build-catalog.mjs     → catalogs/GAME_CATALOG.csv + .md
        │    ├─ build-prompts.mjs     → 85 file prompts/01-toan4 · 02-toan5 · 03-english-starters · 04-english-movers · 05-english-flyers
        │    ├─ build-variants.mjs    → prompts/VARIANTS_425.md (85 × 5 kiểu điều khiển)
        │    ├─ upgrade-legacy.mjs    → prompts/01..12 legacy (5 mục, ≤15 KB)
        │    ├─ annotate-docs.mjs     → chú thích chuẩn hiện hành vào 5 tài liệu docs/
        │    ├─ build-dashboard.mjs   → catalogs/GAME_CATALOG.js cho index.html
        │    ├─ build-acceptance.mjs  → prompts/CHECKLIST_NGHIEP_THU.md
        │    └─ validate.mjs          → chặn: thiếu 1 mục, thiếu 14 dòng CORE, vượt 15 KB,
        │                               mascot/màu trùng, từ tiếng Anh mẫu vượt band Cambridge,
        │                               chuỗi cấm (${}, Tailwind CDN,
        │                               @mediapipe/hands, camera_utils, chữ Trung Quốc, TODO)
tools/lib/core.mjs          ★ 14 dòng ràng buộc cốt lõi — nguồn duy nhất của mọi quy định chung
tools/lib/csv.mjs           đọc/ghi catalog
```

```bash
node tools/build.mjs      # dựng lại catalog, prompt, biến thể, legacy, dashboard, bảng kiểm rồi tự kiểm
node tools/validate.mjs   # chỉ kiểm tra
```

---

## 💡 Mẹo Chạy Game Mượt Trên Google Gemini

1. Mở **[gemini.google.com](https://gemini.google.com)** trên máy tính, trình duyệt Chrome/Edge (camera ổn định nhất).
2. Bấm nút **Canvas** trước khi gửi prompt; chưa thấy nút thì thêm tiền tố `Tạo trong Canvas:`.
3. Gemini code xong ➔ bấm **"Run code" / "Preview"** ➔ trình duyệt hỏi quyền Webcam ➔ **Allow / Cho phép**.
4. Camera bị chặn (môi trường không an toàn) thì game tự vào **chế độ không dùng camera** và vẫn chơi đủ mục tiêu học tập bằng chuột.
5. *(Tuỳ chọn offline)* Copy code, lưu thành `game.html` rồi nhấp đúp để mở chơi offline.
6. Game sinh ra thiếu một quy định nào đó ➔ **dán lại nguyên văn dòng quy định đó vào cuối prompt và sinh lại**, không sửa tay file HTML. Đối chiếu với [bảng kiểm nghiệm thu](prompts/CHECKLIST_NGHIEP_THU.md).

---

⭐ **Thấy hữu ích? Hãy bấm Star kho lưu trữ này để lưu lại khi cần nhé!**
