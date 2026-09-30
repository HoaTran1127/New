# 📚 MiTi — PROMPT LIBRARY

Đây là **thư viện prompt để tạo game**, không phải game engine.

**85 prompt game chuẩn** (40 Toán 4 · 15 Toán 5 · 15 Tiếng Anh 4 · 15 Tiếng Anh 5) + **12 prompt legacy** đời đầu, tất cả đều theo khung 9 mục của [master prompt](00-master-canvas-prompt.md).

## 🚀 Luồng chuẩn

**Dashboard → Chọn lớp/môn → Chọn game → Mở prompt → Copy toàn bộ → Dán Gemini Canvas → Gemini tạo 1 file HTML → Game giữ chữ ký MiTi**

👉 [Quay về MiTi Dashboard](../index.html)

## 🧩 Prompt chuẩn của từng game

Mỗi file game prompt là **độc lập**. Không cần Gemini biết repository này.

Một prompt chuẩn luôn mô tả:
- mục tiêu học tập;
- nhiệm vụ học sinh;
- cơ chế chơi và điều khiển;
- dữ liệu/câu hỏi + lỗi thường gặp;
- camera, calibration, smoothing, confidence và cooldown khi cần;
- fallback chuột/chạm/bàn phím;
- feedback học tập;
- luồng Bắt đầu → Chơi → Kết quả;
- an toàn và accessibility;
- đầu ra **một file HTML hoàn chỉnh**.

## 🟡 MiTi đi vào game bằng cách nào?

**Không chỉ có logo ở repository.** Mỗi prompt độc lập yêu cầu Gemini **nhúng chữ ký MiTi trực tiếp vào HTML đầu ra**.

Chữ ký gồm:
- biểu tượng **M** trong ô bo góc;
- chữ **MiTi**;
- dấu **✦**;
- dòng **MiTi • Học bằng chuyển động**.

Logo phải xuất hiện ở Bắt đầu, HUD và Kết quả, không phụ thuộc asset của repository.

👉 [Brand Contract](BRAND_MITI.md)
👉 [Logo nguồn](../brand/miti-logo.svg)

## 🎯 425 biến thể

**85 game × 5 biến thể = 425 prompt**, do `tools/build-variants.mjs` sinh từ `tools/data/games.mjs` — phủ đủ toàn bộ catalog, không còn 20 game thiếu biến thể như bản cũ.

1. Camera Point — chỉ tay
2. Camera Swipe — vuốt/chém
3. Drag & Grab — kéo/thả
4. Voice — giọng nói
5. No Camera — chuột/chạm/bàn phím

Bốn biến thể đầu dùng **cùng một hợp đồng AR** như prompt game: nền là khung hình webcam cover-fit, tọa độ qua `toScreen(lx, ly)`, vật thể có chiều sâu z và neo vào landmark. Muốn đổi nội dung thì sửa dữ liệu rồi chạy `node tools/build.mjs`, đừng sửa tay file sinh ra.

👉 [Mở 425 Prompt Variants](VARIANTS_425.md)

## 🗂️ Tổ chức thư mục

- `00-master-canvas-prompt.md` — khung chuẩn 9 mục khi tạo prompt mới.
- `BRAND_MITI.md` — chuẩn thương hiệu.
- `templates/game-prompt-template.md` — biểu mẫu điền ô `[...]` (file `template-tao-game-moi.md` cũ chỉ còn trang trỏ tới đây).
- `01-toan4/` — 40 game Toán 4.
- `02-toan5/` — 15 game Toán 5.
- `03-english4/` — 15 game Tiếng Anh 4.
- `04-english5/` — 15 game Tiếng Anh 5.
- `01-prompt-…` đến `12-prompt-…` — **12 prompt legacy** đời đầu: giữ nguyên cơ chế game, đã thay MediaPipe Legacy/Tailwind CDN/Tone.js bằng chuẩn hiện hành và gắn nhãn `LEGACY`. Không dùng làm khuôn cho game mới.
- `VARIANTS_425.md` — 425 biến thể (85 game × 5 kiểu điều khiển), do `tools/build-variants.mjs` sinh.
- `giao-an/` — **39 giáo án giảng bài** Toán 4–5 cho giáo viên trình bày trước cả lớp, do `tools/build-lessons.mjs` sinh. Đây là CÔNG CỤ DẠY HỌC, không phải game: xem [giao-an/README.md](giao-an/README.md).

## 🧑‍🏫 Bộ giáo án khác 85 prompt game ở chỗ nào

Bảng phấn và vật thật vẽ phấn (`tools/lib/chalk.mjs`, `tools/data/props.mjs`) là của RIÊNG bộ giáo án — 85 prompt game không mang một dòng nào trong đó. Cơ chế hai họ đối lập có chủ đích: giáo án mà lẫn tim, điểm, combo hay mascot thì em lên bảng sợ sai hơn là muốn hiểu.

| | `giao-an/` (39) | `01-toan4/` … `04-english5/` (85) |
| --- | --- | --- |
| Người dùng | Giáo viên trình bày, cả lớp xem | Học sinh tự chơi |
| Khung prompt | 13 mục (0 → 12) | 9 mục (1 → 9) |
| Nhịp | Chờ giáo viên bấm "Bước tiếp" | 12 lượt tự tăng độ khó |
| Quy định riêng | `tools/lib/chalk.mjs` (10) + `tools/lib/lesson.mjs` (38) + `tools/lib/handout.mjs` (3) | `tools/lib/feel.mjs` + `tools/lib/classroom.mjs` |
| Dữ liệu câu hỏi | `LESSON_DATA` ≥ 6 mục | `QUESTION_DATA` ≥ 40/60 mục |

`tools/validate.mjs` chặn cả hai chiều: giáo án thiếu một trong 55 quy định thì báo lỗi, mà cơ chế game (`QUESTION_DATA`, `miti-collection`, hit-stop, combo, mascot, 12 lượt chính, hết 5 tim…) lọt vào giáo án cũng báo lỗi.

## 🔁 Pipeline của thư viện

85 prompt game **được sinh tự động**, không sửa tay:

```
tools/data/games.mjs + clusters.mjs + gestures.mjs + examples.mjs + error-notes.mjs
        └─ node tools/build.mjs ─→ catalogs/GAME_CATALOG.csv · .md · .js + prompts/0X-*/ + index.html
```

Sửa nội dung ở `tools/data/` rồi build lại; `node tools/validate.mjs` sẽ báo nếu prompt thiếu mục, còn `MIXED`, rò ký tự template, thiếu chữ ký MiTi hoặc trỏ tới file không có thật.

## ✅ Quy tắc không tạo file ảo

Dashboard và catalogue chỉ trỏ tới prompt tồn tại thật (`tools/validate.mjs` kiểm tra từng đường dẫn).
ID và tên file prompt được giữ ổn định để link không gãy.
Không dùng tên file tưởng tượng chỉ để làm đẹp giao diện.

## 🔧 Khi tạo game mới

1. Chọn mục tiêu học tập.
2. Điền metadata và gameplay.
3. Áp dụng Master Prompt.
4. Bắt buộc áp dụng Brand Contract.
5. Kiểm tra fallback, feedback và HTML một file.
