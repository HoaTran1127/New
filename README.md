# 🟡 MiTi — Prompt Library Game Giáo Dục

**MiTi** là thư viện prompt để tạo game giáo dục web cho học sinh Việt Nam bằng **Google Gemini Canvas**.

> **Chọn game → xem mục tiêu/nhiệm vụ → mở Prompt → copy → dán vào Gemini Canvas → tạo game HTML.**

## 🚀 Dashboard

👉 **[Mở MiTi Dashboard](index.html)**

Dashboard hiển thị toàn bộ **85 game có file prompt thật**, tìm kiếm theo lớp/môn/điều khiển và mở trực tiếp từng prompt.

## 📊 Kho hiện tại

| Hạng mục | Số lượng |
|---|---:|
| Game Toán lớp 4 | 40 |
| Game Toán lớp 5 | 15 |
| Game Tiếng Anh lớp 4 | 15 |
| Game Tiếng Anh lớp 5 | 15 |
| **Tổng game có file thật** | **85** |
| Game gốc dùng để tạo biến thể | **65** |
| Prompt biến thể | **325 = 65 × 5** |
| Game mở rộng ngoài bộ 65 | **20** |

### 5 biến thể của mỗi game gốc

1. **Camera Point** — chỉ tay
2. **Camera Swipe** — vuốt/chém
3. **Drag & Grab** — kéo/thả
4. **Voice** — giọng nói
5. **No Camera** — chuột/chạm/bàn phím

👉 [Mở 325 Prompt Variants](prompts/VARIANTS_325.md)

## 🇻🇳 Chuẩn hoá tiếng Việt

Nội dung hiển thị trong dashboard và catalogue dùng tiếng Việt:
- tên game hiển thị bằng tiếng Việt;
- mục tiêu học tập;
- nhiệm vụ học sinh;
- điều khiển;
- chức năng chính;
- hướng dẫn/feedback trong prompt.

**ID và đường dẫn file được giữ ổn định** để không phá liên kết kỹ thuật.

## 📁 Cấu trúc chính

- `index.html` — dashboard MiTi chính.
- `catalogs/GAME_CATALOG.csv` — catalogue dữ liệu chuẩn, **85 dòng game**.
- `catalogs/GAME_CATALOG.md` — catalogue đọc nhanh.
- `prompts/00-master-canvas-prompt.md` — master prompt.
- `prompts/VARIANTS_325.md` — 325 prompt biến thể.
- `prompts/01-toan4/` — 40 game Toán 4.
- `prompts/02-toan5/` — 15 game Toán 5.
- `prompts/03-english4/` — 15 game Tiếng Anh 4.
- `prompts/04-english5/` — 15 game Tiếng Anh 5.
- `games/` và `src/` — code demo/reference, không phải sản phẩm prompt chính.

## 🔎 Kiểm tra kho

Catalogue chỉ trỏ tới **file prompt tồn tại thật** trong bốn thư mục game. Không dùng đường dẫn giả để làm dashboard đẹp.

## 🧠 Nguyên tắc sản phẩm

**Prompt là sản phẩm. Code demo chỉ là reference.**

Mỗi prompt độc lập phải có thể copy vào Gemini Canvas mà không cần Gemini biết repository này.