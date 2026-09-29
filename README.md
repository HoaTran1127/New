# 🟡 MiTi — Prompt Library Game Giáo Dục

**MiTi** là thư viện prompt giúp tạo game giáo dục web cho học sinh Việt Nam bằng **Google Gemini Canvas**.

## 🚀 Luồng sử dụng duy nhất

**1. MỞ DASHBOARD** → **2. CHỌN LỚP + MÔN** → **3. CHỌN GAME** → **4. MỞ PROMPT** → **5. COPY TOÀN BỘ** → **6. DÁN VÀO GEMINI CANVAS** → **7. GEMINI TẠO 1 FILE HTML** → **8. GAME CÓ CHỮ KÝ MiTi**

👉 [Mở MiTi Dashboard](index.html)

## 🎮 Kho game thật

| Nhóm | Số game |
|---|---:|
| Toán lớp 4 | 40 |
| Toán lớp 5 | 15 |
| Tiếng Anh lớp 4 | 15 |
| Tiếng Anh lớp 5 | 15 |
| **Tổng** | **85 game có file prompt thật** |

Trong 85 game này:
- **65 game gốc** có đủ **5 biến thể**.
- **325 prompt biến thể = 65 × 5**.
- **20 game mở rộng** là các game bổ sung ngoài bộ 65.

👉 [Xem 325 biến thể](prompts/VARIANTS_325.md)

## 🧭 4 nơi chính trong repository

**Dashboard** — `index.html`  
Nơi duy nhất người dùng nên bắt đầu.

**Catalogue** — `catalogs/GAME_CATALOG.md`  
Danh sách game, mục tiêu, nhiệm vụ, điều khiển và link prompt thật.

**Prompt Library** — `prompts/`  
Nơi chứa prompt chuẩn, master prompt và 325 biến thể.

**Reference** — `games/`, `src/`, `docs/`, `research/`  
Tài liệu/kỹ thuật/thử nghiệm. Không phải luồng sử dụng chính.

## ✂️ Cách chọn prompt

Mỗi game có:
- **Mục tiêu học tập**
- **Nhiệm vụ học sinh**
- **Cơ chế chơi**
- **Điều khiển**
- **Prompt copy trực tiếp**

5 biến thể của game gốc:
**Camera Point · Camera Swipe · Drag & Grab · Voice · No Camera**

## 🇻🇳 Chuẩn nội dung Việt Nam

Prompt phải yêu cầu:
- tiêu đề, nút, hướng dẫn và feedback bằng tiếng Việt;
- mục tiêu và nhiệm vụ phù hợp học sinh Việt Nam;
- nội dung môn Tiếng Anh chỉ giữ tiếng Anh ở chính phần kiến thức cần học;
- không dùng tiếng Anh cho UI nếu không cần thiết.

## 🟡 Chuẩn thương hiệu MiTi

**MiTi không chỉ là logo của repository. MiTi phải trở thành chữ ký của game được Gemini tạo ra.**

Mỗi prompt độc lập phải chứa yêu cầu:
- logo MiTi nhúng trực tiếp vào HTML;
- biểu tượng **M** + chữ **MiTi** + dấu ✦;
- xuất hiện ở Bắt đầu / HUD / Kết quả;
- dòng chữ **MiTi • Học bằng chuyển động**;
- không phụ thuộc asset của repository.

👉 [Xem Brand Contract](prompts/BRAND_MITI.md)

## 📁 Cấu trúc

- `index.html` — dashboard chính.
- `catalogs/GAME_CATALOG.csv` — dữ liệu catalogue chuẩn.
- `catalogs/GAME_CATALOG.md` — catalogue đọc nhanh.
- `prompts/00-master-canvas-prompt.md` — master prompt.
- `prompts/BRAND_MITI.md` — hợp đồng thương hiệu cho Gemini.
- `prompts/VARIANTS_325.md` — 325 prompt biến thể.
- `prompts/01-toan4/` — 40 game Toán 4.
- `prompts/02-toan5/` — 15 game Toán 5.
- `prompts/03-english4/` — 15 game Tiếng Anh 4.
- `prompts/04-english5/` — 15 game Tiếng Anh 5.

## ✅ Nguyên tắc chống file ảo

Catalogue chỉ được trỏ tới **file prompt tồn tại thật**.  
Dashboard chỉ được lấy dữ liệu từ catalogue.  
Không tạo card cho game không có prompt.  
Không dùng đường dẫn giả để làm giao diện đẹp.

> **Prompt là sản phẩm. Game HTML được Gemini sinh ra. MiTi là chữ ký đi cùng prompt vào game.**