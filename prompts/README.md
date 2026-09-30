# 📚 MiTi — PROMPT LIBRARY

Đây là **thư viện prompt để tạo game**, không phải game engine.

**85 prompt game chuẩn** (40 Toán 4 · 15 Toán 5 · 15 Tiếng Anh 4 · 15 Tiếng Anh 5) + **12 prompt legacy** đời đầu, tất cả đều theo khung 9 mục (1 → 9) của [master prompt](00-master-canvas-prompt.md). Mọi prompt chơi được 1, 2 hoặc 3 bạn trên một máy.

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

- `00-master-canvas-prompt.md` — khung chuẩn 9 mục (1 → 9) khi tạo prompt mới, do `tools/build-master.mjs` sinh.
- `BRAND_MITI.md` — chuẩn thương hiệu.
- `templates/game-prompt-template.md` — biểu mẫu điền ô `[...]` (file `template-tao-game-moi.md` cũ chỉ còn trang trỏ tới đây).
- `01-toan4/` — 40 game Toán 4.
- `02-toan5/` — 15 game Toán 5.
- `03-english4/` — 15 game Tiếng Anh 4.
- `04-english5/` — 15 game Tiếng Anh 5.
- `01-prompt-…` đến `12-prompt-…` — **12 prompt legacy** đời đầu: giữ nguyên cơ chế game, đã thay MediaPipe Legacy/Tailwind CDN/Tone.js bằng chuẩn hiện hành và gắn nhãn `LEGACY`. Không dùng làm khuôn cho game mới.
- `VARIANTS_425.md` — 425 biến thể (85 game × 5 kiểu điều khiển), do `tools/build-variants.mjs` sinh.
- `CHECKLIST_NGHIEP_THU.md` — bảng kiểm cầm tay khi nhận file HTML về: 14 việc người thử, do `tools/build-acceptance.mjs` sinh từ `tools/lib/acceptance.mjs`.

## 👥 1, 2 hoặc 3 bạn cùng chơi

Mục "2. CHẾ ĐỘ 1/2/3 NGƯỜI VÀ THI ĐUA" của mọi prompt (nguồn `tools/lib/players.mjs` + `tools/lib/compete.mjs`):

- Trước ván chọn **1 · 2 · 3** người; màn hình chia N làn dọc, mỗi làn màu riêng + nhãn P1/P2/P3. Game gán làn theo vị trí cơ thể thật và chỉ tính động tác trong làn của chính em; không camera thì mỗi em một cụm phím.
- **Scoreboard** trực tiếp ở dải trên; hết ván có **Podium** (bằng điểm thì xét số câu đúng rồi thời gian, vẫn bằng thì đồng hạng).
- **Đuổi kịp có trần**: em kém người dẫn đầu từ 2 câu đúng được thẻ x2, tối đa một thẻ mỗi 3 câu; hệ số điểm không bao giờ vượt x2.
- **Danh hiệu cho mọi em** (Nhanh nhất · Chính xác nhất · Vận động nhiều nhất · Chuỗi dài nhất), kể cả em xếp cuối.
- **Chơi một mình**: không Podium, phá kỷ lục của chính em trong `miti-best` ("PHÁ KỶ LỤC!" + vệt ghost).

**Nhận tay khi 2–3 bạn** (game dùng ngón tay, `tools/lib/input.mjs`): **Tự động** bắt đầu **theo lượt** — máy chỉ nhận tay trong làn đang có lượt, mỗi em 8 câu; máy chậm, tay trượt/mơ hồ nhiều lần hoặc model tay tải lỗi thì tự chuyển sang **cổ tay đồng thời** và giữ nguyên điểm. Giáo viên có thể cố định một chế độ ở nút bánh răng.

## ✨ Hiệu ứng + "Giảm hiệu ứng"

`tools/lib/effects.mjs`: spotlight chuyển lượt, linh vật, confetti trong làn của em, điểm lăn số, Podium trồi lên, thẻ đuổi kịp lật 3D. Nhấp nháy ≤ 3 lần/giây; `prefers-reduced-motion` hoặc nút **"Giảm hiệu ứng"** thay rung, hit-stop và hạt bằng mờ dần tĩnh.

## 🪶 Prompt gọn, trải nghiệm học sinh trước

Khung 9 mục của `tools/lib/skeleton.mjs` đặt bốn mục **vòng lặp thu hút · chế độ 1/2/3 người · chơi vận động · ghi nhớ bài học** lên đầu, phần kỹ thuật xếp sau. Mỗi chỉ dẫn chỉ xuất hiện một lần, nên prompt còn khoảng **55–60% độ dài cũ**.

## 🏃 Thể dục có cấu trúc

`tools/lib/pe.mjs`: **khởi động 60–90 giây** trước hiệp 1 · nhịp thẻ **3,0–4,5 giây** vào, ở lại `<= 8` giây, **`>= 12` nhịp chuyển động mỗi phút** · thời gian vận động `>= 60%` phiên · **hạ nhiệt 45–60 giây** trước tổng kết · một dòng nhắc uống vài ngụm nước khi phiên `>= 6` phút · **trần tải trọng** (cấm nhảy tiếp đất, xoay thân nhanh quá 90 độ, giữ hai tay trên cao quá 15 giây).

## 🧠 Nhớ bài có lịch

`tools/lib/memory.mjs`: errorTag sửa đúng 2 lần liên tiếp được ôn lại ở **+1, +3, +7 ngày** (`miti-review`), tối đa 4/12 lượt là câu đến hạn; **>= 3/12 lượt xen cụm khác**; **10 giây "Em còn nhớ không?"** trước lượt 1 và **"Vì sao đúng?"** ở 4/12 lượt — sai không trừ tim. Tổng kết ghi "Lần sau có <n> câu đang chờ".

## 🔥 Cao trào của ván

`tools/lib/hype.mjs`: cú "ồ" ba giây đầu (vật thể AR bay ngang, không mở màn bằng chữ dài) · ba hiệp leo thang, hiệp 3 **HIỆP QUYẾT ĐỊNH** nhân đôi điểm, giữa hiệp nghỉ 5 giây · **mở thưởng** 2,5 giây cuối mỗi hiệp, luôn có quà, không đổi level thích ứng.

## ✅ Thử game trước khi vào lớp

[`CHECKLIST_NGHIEP_THU.md`](CHECKLIST_NGHIEP_THU.md) gồm **14 việc người thử** (khoảng 15 phút), trong đó có chơi 2 và 3 người, cố tình để bằng điểm, game tay trên máy yếu và bật "Giảm hiệu ứng". Việc nào chưa ổn thì sửa prompt rồi sinh lại, không sửa tay HTML.

## 🔁 Pipeline của thư viện

85 prompt game **được sinh tự động**, không sửa tay:

```
tools/data/games.mjs + clusters.mjs + gestures.mjs + examples.mjs + error-notes.mjs
tools/lib/skeleton.mjs · players.mjs · compete.mjs · input.mjs · effects.mjs · ar.mjs · rules.mjs · feel.mjs · classroom.mjs · access.mjs · verify.mjs · pe.mjs · memory.mjs · hype.mjs · acceptance.mjs
        └─ node tools/build.mjs ─→ catalogs/GAME_CATALOG.csv · .md · .js + prompts/0X-*/ + master + legacy + VARIANTS_425.md + prompts/CHECKLIST_NGHIEP_THU.md
```

Sửa nội dung ở `tools/data/` hoặc `tools/lib/` rồi build lại; `node tools/validate.mjs` sẽ báo nếu prompt thiếu mục, còn `MIXED`, rò ký tự template, thiếu chữ ký MiTi, vượt trần độ dài hoặc trỏ tới file không có thật. Chỉ chạy test: `node --test "tools/test/*.test.mjs"`.

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
