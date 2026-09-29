# 📚 Series Hướng Dẫn Tự Phát Triển Game Toán Thực Tế Ảo (AR Math Games) Cho Học Sinh Lớp 4 & 5

> **⚠️ Cập nhật chuẩn MiTi (2026-09)** — bài này vẫn đúng về ý tưởng, nhưng ba phụ thuộc đã đổi: **Tone.js → Web Audio API tự tổng hợp**, **MediaPipe Hands legacy → MediaPipe Tasks Vision pin `@1.0.1`** (vision_bundle.mjs + wasm + hand_landmarker.task), **Tailwind Play CDN → CSS nội tuyến một khối `<style>`**. Bản chuẩn để viết prompt cho Gemini Canvas: `prompts/00-master-canvas-prompt.md` §2 (hợp đồng AR: cover-fit, `toScreen(lx, ly)`, lớp phủ alpha ≤ 0.45, chiều sâu z, neo landmark) + `tools/lib/ar.mjs` + `tools/lib/rules.mjs`; 425 prompt biến thể trong `prompts/VARIANTS_425.md`. Mã nguồn demo trong `games/` là bản cũ, chưa theo hợp đồng AR này.


Chào mừng thầy cô, phụ huynh và các bạn đam mê lập trình sáng tạo! Đây là bộ giáo trình hướng dẫn từng bước (Step-by-step) xây dựng tựa game **Subway Math Blitz AR** và nền tảng các trò chơi toán học tương tác qua webcam trực tiếp trên trình duyệt web, không cần cài app hay server phức tạp.

---

## 🗺️ Lộ Trình 7 Bài Học

| Bài | Tên Bài Học | Nội Dung Trọng Tâm |
| :---: | :--- | :--- |
| **01** | [Tổng quan & Khởi tạo dự án](bai-01-tong-quan-va-khoi-tao.md) | Kiến trúc tổng thể, cấu trúc thư mục, chuẩn bị thư viện CDN |
| **02** | [Camera & MediaPipe Hand Tracking](bai-02-camera-va-mediapipe-hand-tracking.md) | Mở webcam, lật gương, khử rung tay (EMA), bắt cử chỉ vung đấm |
| **03** | [Game Loop & Hiệu ứng Đồ họa Canvas](bai-03-game-loop-va-hieu-ung-canvas.md) | Vòng lặp game, thẻ rơi, vệt kiếm chém neon, rạn nứt kính vỡ |
| **04** | [Thiết kế Ngân hàng Toán Lớp 4 & 5](bai-04-thiet-ke-kho-toan-lop-4-5-va-sinh-de.md) | Quy chuẩn phân số, số thập phân, %, thuật toán sinh bẫy đúng/sai |
| **05** | [Hiệu ứng Âm thanh Arcade với Tone.js](bai-05-am-thanh-arcade-voi-tonejs.md) | Tổng hợp âm thanh tiếng vung tay, kính vỡ, nhặt tiền vàng bằng code |
| **06** | [Triển khai GitHub Pages Miễn Phí](bai-06-trien-khai-github-pages-va-chia-se.md) | Bật GitHub Pages 1-click, tạo mã QR cho học sinh mở trên máy tính |
| **07** | [Hướng dẫn Mở Rộng Mini-Game Mới](bai-07-huong-dan-tu-tao-mini-game-moi.md) | Dùng chung Core Engine để tạo game hứng táo, trắc nghiệm giơ tay... |

---

## 🏗️ Cấu Trúc Khung Sườn Dự Án (Architecture)

Dự án được thiết kế theo tư duy **Module hóa (Pluggable)** để sau này bạn có thể thêm bớt chủ đề toán học hoặc thêm mini-game mới cực kỳ dễ dàng:

```text
├── index.html                   # Dashboard 85 prompt + 12 legacy (lọc, tìm, 1-click copy)
├── prompts/                     # 85 prompt game chuẩn + 12 prompt legacy + master + biến thể
├── catalogs/                    # GAME_CATALOG.csv · .md · .js — sinh từ tools/data
├── tools/                       # Pipeline build: node tools/build.mjs
├── src/
│   ├── core/                    # Engine dùng chung cho các game TỰ CODE (không dùng cho prompt 1 file)
│   │   ├── HandTracker.js       # Bọc Google MediaPipe Hands, khử rung tay
│   │   ├── AudioManager.js      # Tạo âm thanh bằng Tone.js
│   │   └── ParticleSystem.js    # Hạt nổ, sóng xung kích, nứt vỡ kính
│   └── data/                    # Bộ sinh câu hỏi theo topic (khác với QUESTION_DATA trong prompt)
│       ├── index.js             # TopicRegistry tự động gom tất cả chủ đề
│       ├── topics-cuuchuong.js  # Bảng nhân chia 2-9
│       ├── topics-lop4.js       # Phân số, nhân 11, đổi đơn vị, chia hết
│       └── topics-lop5.js       # Số thập phân, %, s = v * t, hình học
└── games/
    ├── math-blitz/              # Demo 1: Đấm / Chém thẻ rơi (Subway Math Blitz)
    ├── math-catcher/            # Demo 2: Hứng quả táo toán học (Math Catcher)
    ├── math-bubble/             # Demo 3: Chém bong bóng phép tính
    └── english-word-ninja/      # Demo 4: Chém từ vựng tiếng Anh
```

> **Giáo trình này dạy đường "tự code" nhiều file.** 85 prompt trong `prompts/` đi đường khác: Gemini xuất **một file HTML duy nhất, CSS nội tuyến**, không nạp `src/core/*.js`. `src/data/*.js` cũng là **bộ sinh câu hỏi**, không phải ngân hàng `QUESTION_DATA` mà prompt yêu cầu. Xem rõ ở [bai-07](bai-07-huong-dan-tu-tao-mini-game-moi.md).

---

## 🚀 Cách Chạy Thử Trên Máy Tính Của Bạn

1. Bạn có thể mở trực tiếp file `index.html` trên trình duyệt Chrome, Edge hoặc Cốc Cốc. Lưu ý: lưới prompt và bộ lọc chạy bình thường, nhưng nút **Sao chép prompt** phải tải file `.md` nên cần mở qua localhost hoặc GitHub Pages (mở bằng `file://` trình duyệt chặn fetch).
2. Hoặc dùng tiện ích **Live Server** (trên VS Code / Antigravity) để mở cổng localhost (khuyên dùng để MediaPipe nạp model qua webcam mượt mà nhất):
   ```bash
   # Nếu bạn cài python:
   python -m http.server 8000
   # Mở trình duyệt vào: http://localhost:8000
   ```
3. Cho phép trình duyệt truy cập Webcam khi được hỏi. Đứng lùi ra xa khoảng **1.5m - 2m** và bắt đầu trải nghiệm!
