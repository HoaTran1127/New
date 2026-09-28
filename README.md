# 🎨 GEMINI CANVAS GAME PROMPT STUDIO & FORGE
### Bộ Tổng Hợp Master Prompt, Thư Viện Nhân Vật & Mẫu Game Thực Tế Ảo (Web AR) Cho Học Sinh Lớp 4 & 5

> **Kho tài nguyên chuyên dụng để đưa vào Google Gemini (Chế độ Canvas) để tự động sinh ra các tựa Game Giáo Dục Toán Học Thực Tế Ảo (Webcam AR / 2D Canvas) chỉ trong 30 giây.**

---

## 🌟 Dự Án Này Giải Quyết Vấn Đề Gì?

Khi dùng **Google Gemini (Canvas)** để tạo game, nếu viết prompt chung chung, AI thường sinh ra code thiếu thư viện, camera bị giật rung hoặc không có âm thanh.
Kho lưu trữ này cung cấp:
1. **Master Prompt Chuẩn:** Đã được tinh chỉnh hoàn hảo để Gemini Canvas lập trình game 1 file HTML mượt mà 60 FPS, nhận diện cử chỉ bàn tay (MediaPipe) và âm thanh sống động (Tone.js).
2. **Trình Tạo Prompt Tự Động (Web Studio):** Mở [`index.html`](index.html), chọn thể loại, khối lớp và nhân vật $\rightarrow$ Nhận ngay câu lệnh Prompt hoàn chỉnh kèm nút **Copy Prompt cho Gemini**.
3. **Katalog Nhân Vật & Hoạt Cảnh:** Bộ sưu tập 6 nhân vật mẫu (Ninja, Chuối Subway, Phi hành gia...) và sơ đồ phân cảnh (Vung tay $\rightarrow$ Nổ hạt $\rightarrow$ Kính vỡ mạng nhện).
4. **3 Bản Demo Mẫu Nhỏ:** Chơi thử ngay trên máy để xem trước cách prompt hoạt động thực tế.
5. **Khung Mở Rộng:** Form mẫu `template-tao-game-moi.md` để bạn tự thêm prompt mới mỗi khi có ý tưởng game mới.

---

## 📁 Cấu Trúc Kho Lưu Trữ

```text
Github/
├── index.html                   # Web Studio: Trình tạo prompt + Kho prompt + Demo mẫu
├── README.md                    # Tài liệu hướng dẫn chính
│
├── prompts/                     # TỔNG HỢP PROMPT DÀNH CHO GEMINI CANVAS
│   ├── README.md                # Hướng dẫn chi tiết cách dán vào Gemini
│   ├── 00-master-canvas-prompt.md # Master System Prompt (Khung xương kỹ thuật)
│   ├── 01-prompt-subway-math-blitz.md # Prompt tái tạo game như link chia sẻ
│   ├── 02-prompt-math-catcher-ar.md   # Prompt tạo game giỏ hứng quả
│   ├── 03-prompt-ninja-bubble-pop.md  # Prompt tạo game chém bong bóng số
│   └── template-tao-game-moi.md       # FORM MẪU ĐIỀN NHANH ĐỂ TẠO PROMPT MỚI
│
├── catalogs/                    # THƯ VIỆN NHÂN VẬT & HOẠT CẢNH MẪU
│   ├── characters/
│   │   ├── characters.json      # Dữ liệu 6 nhân vật mẫu, màu sắc, vũ khí
│   │   └── characters-guide.md  # Cách ghép nhân vật vào câu lệnh prompt
│   └── storyboards/
│       ├── game-flowchart.mermaid # Sơ đồ luồng game (Game Loop, State Machine)
│       └── visual-effects-guide.md# Kịch bản hoạt cảnh chi tiết (VFX, kính vỡ)
│
└── games/                       # 3 BẢN DEMO MẪU CHẠY TRỰC TIẾP
    ├── math-blitz/              # Demo 1: Subway Math Blitz AR
    ├── math-catcher/            # Demo 2: AR Math Catcher (Hứng táo)
    └── math-bubble/             # Demo 3: Math Ninja Bubble Pop
```

---

## 🚀 Cách Dùng Nhanh (Quick Start)

### Cách 1: Dùng Trình Tạo Prompt Trên Giao Diện Web
1. Truy cập trực tiếp link GitHub Pages: **[https://hoatran1127.github.io/New/](https://hoatran1127.github.io/New/)**
2. Chọn: Thể loại game $\rightarrow$ Dạng toán Lớp 4 / Lớp 5 $\rightarrow$ Nhân vật yêu thích.
3. Bấm nút **"Copy Prompt Cho Gemini"**.
4. Mở [Google Gemini](https://gemini.google.com), dán vào khung chat và bật chế độ **Canvas** $\rightarrow$ Thưởng thức game do AI sinh ra!

---

### Cách 2: Tự Viết Thêm Prompt Mới Khi Có Ý Tưởng Game Mới
1. Mở file [`prompts/template-tao-game-moi.md`](prompts/template-tao-game-moi.md).
2. Điền ý tưởng của bạn vào các mục: Thể loại, Nhân vật, Dạng bài tập.
3. Lưu file mới vào thư mục `prompts/` (ví dụ: `04-prompt-dua-xe-toan-hoc.md`) để bổ sung vào bộ sưu tập cá nhân!

---

## 🎮 Danh Sách 3 Game Demo Mẫu

- **Demo 1: Subway Math Blitz AR** ([`games/math-blitz/index.html`](games/math-blitz/index.html)): Thẻ bài rơi 3 làn phong cách Subway Surfers, đấm thẻ đúng, né thẻ sai, kính vỡ toảng mạng nhện khi chọn nhầm bẫy.
- **Demo 2: AR Math Catcher** ([`games/math-catcher/index.html`](games/math-catcher/index.html)): Dùng bàn tay làm giỏ di động hứng các quả táo phép tính đúng rơi xuống.
- **Demo 3: Math Ninja Bubble Pop** ([`games/math-bubble/index.html`](games/math-bubble/index.html)): Bong bóng bay lên từ đáy màn hình, vung ngón tay chém bóng theo phong cách Fruit Ninja.
