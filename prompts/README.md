# 📚 MiTi — PROMPT LIBRARY

Đây là **thư viện prompt để tạo game**, không phải game engine.

**85 prompt game chuẩn** (40 Toán 4 · 15 Toán 5 · 15 Tiếng Anh 4 · 15 Tiếng Anh 5) + **12 prompt legacy** đời đầu, tất cả đều theo khung 13 mục (0 → 12) của [master prompt](00-master-canvas-prompt.md).

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

- `00-master-canvas-prompt.md` — khung chuẩn 13 mục (0 → 12) khi tạo prompt mới.
- `BRAND_MITI.md` — chuẩn thương hiệu.
- `templates/game-prompt-template.md` — biểu mẫu điền ô `[...]` (file `template-tao-game-moi.md` cũ chỉ còn trang trỏ tới đây).
- `01-toan4/` — 40 game Toán 4.
- `02-toan5/` — 15 game Toán 5.
- `03-english4/` — 15 game Tiếng Anh 4.
- `04-english5/` — 15 game Tiếng Anh 5.
- `01-prompt-…` đến `12-prompt-…` — **12 prompt legacy** đời đầu: giữ nguyên cơ chế game, đã thay MediaPipe Legacy/Tailwind CDN/Tone.js bằng chuẩn hiện hành và gắn nhãn `LEGACY`. Không dùng làm khuôn cho game mới.
- `VARIANTS_425.md` — 425 biến thể (85 game × 5 kiểu điều khiển), do `tools/build-variants.mjs` sinh.
- `CHECKLIST_NGHIEP_THU.md` — bảng kiểm cầm tay khi nhận file HTML về: 25 mục máy tự kiểm + 17 việc người thử bấm tay, do `tools/build-acceptance.mjs` sinh từ `tools/lib/acceptance.mjs`.

## ✅ Nghiệm thu một game vừa sinh

Prompt dài tới mức không ai đọc hết file HTML để kiểm tra. Mọi prompt trong thư mục này đều đòi game một **bảng kiểm ẩn** mở bằng 7 lần bấm logo MiTi (hoặc `Ctrl+Alt+K`), trạng thái ĐẠT / CHƯA ĐẠT do code kiểm thật lúc chạy, kèm nút "Xuất bản văn" copy được biên bản.

👉 [Mở Bảng Kiểm Nghiệm Thu](CHECKLIST_NGHIEP_THU.md)

## 🏃 Thể dục có cấu trúc: một phiên chơi phải là một bài tập thật

`tools/lib/pe.mjs` buộc mọi prompt mang thêm cấu trúc của một tiết thể dục thu nhỏ: **khởi động 60–90 giây** trước hiệp 1 · **nhịp thẻ 3,0–4,5 giây vào, ở lại `<= 8` giây** và **`>= 12` nhịp chuyển động mỗi phút** (đếm mỗi lần tay hoặc thân vượt ngưỡng 15% tầm với, tính cả khởi động · 12 lượt · hạ nhiệt, chia số phút chơi thật) · **đồng hồ thời gian vận động `>= 60%`** thời lượng phiên · **hạ nhiệt 45–60 giây** trước màn tổng kết (không có nút "Bỏ qua") · **nhắc uống nước đúng một dòng "Mình uống vài ngụm nước rồi hãy chơi tiếp nhé"** khi phiên `>= 6` phút · **trần tải trọng** (cấm nhảy tiếp đất, xoay thân nhanh quá 90 độ, giữ hai tay trên cao quá 15 giây, cúi thấp tối đa 3/12 lượt). Ba mục cuối trong bảng kiểm máy tự kiểm chính là ba con số này, nên một file HTML "chơi như làm bài tập" sẽ bị báo CHƯA ĐẠT ngay.

## 🧠 Nhớ bài có lịch: chơi hôm nay, vẫn còn nhớ tuần sau

`tools/lib/memory.mjs` buộc phần "hiểu bài" thành "nhớ bài": errorTag sửa đúng 2 lần liên tiếp được xếp ôn lại vào **+1, +3, +7 ngày** (ôn vững thì giãn **+21 ngày**) trong localStorage `miti-review`; mỗi phiên phải có **>= 3/12 lượt xen cụm khác** và tối đa **4/12 lượt** là câu đến hạn; trước lượt 1 là **10 giây "Em còn nhớ không?"** lấy đúng câu em làm hôm trước — sai ở đó **không trừ tim, không cắt chuỗi**, chỉ đưa vào lượt 3 kèm lời giải từng bước; **"Vì sao đúng?"** xuất hiện ở đúng **4/12 lượt**; mục từng đúng hai lần mà quên thì hạ lịch về +1 ngày chứ không phạt. Màn tổng kết thêm nút **"Copy tờ rời"** cho giáo viên: ba errorTag yếu nhất, số ngày từ lần chơi gần nhất, lịch ôn sắp tới và một đề xuất hành động cụ thể — chỉ vào clipboard máy đó, không gửi đi đâu.

👉 Ba mục `[20] [21] [22]` của `CHECKLIST_NGHIEP_THU.md` kiểm đúng ba con số này.

## 🔥 Thi đua + cao trào: để em muốn quay lại lần nữa

`tools/lib/hype.mjs` bổ sung phần mà khảo sát 85 prompt đo được là **trống hoàn toàn** (các chữ "kỷ lục", "phá kỷ lục", "bóng ma", "mở thưởng/quay số", "hiệp quyết định", "đích chung" đều xuất hiện 0 lần): **sự chờ đợi**. Sáu quy định đều có con số để kiểm được:

| Quy định | Con số bắt buộc |
|---|---|
| Cú "ồ" ba giây đầu | vật thể AR bay ngang ngay khi vào gameplay, chữ nhiệm vụ `>= 44px`, không mở màn bằng bảng hướng dẫn |
| Kỷ lục của chính em | localStorage `miti-best` chỉ ba số `{ điểm cao nhất, chuỗi đúng dài nhất, ngày }`; HUD "Kỷ lục: <n> · Em đang: <m>" từ hiệp 2; sự kiện **PHÁ KỶ LỤC** nổ đúng một lần trong 1,2 giây |
| Vệt ghost của em | dải sáng alpha `<= 0.35` (không phải ảnh người) chạy theo nhịp lượt tốt nhất phiên trước; về trước thì `+5` điểm |
| Hiệp quyết định | thẻ 4,5 → 3,75 → hiệp 3 nhãn **HIỆP QUYẾT ĐỊNH** nhân đôi điểm, thêm 1 thẻ vàng; vẫn 4 lượt, vẫn trạm nghỉ 5 giây, độ khó không đổi |
| Nghi thức mở thưởng | 2,5 giây cuối mỗi hiệp, ba phương án, luôn có thưởng, không đổi level thích ứng |
| Đích chung | cột "Cả nhóm: <x>/<mốc>" (mặc định 40, đổi được 20–60) — chỉ tổng số câu đúng, **không xếp hạng bạn** |

Thi đua là với chính em hoặc với một đích chung, không bao giờ là bảng xếp hạng giữa các bạn trong lớp — nguyên tắc "Không leaderboard / Không xếp hạng" của `tools/lib/classroom.mjs` vẫn còn hiệu lực.

👉 Ba mục `[23] [24] [25]` của `CHECKLIST_NGHIEP_THU.md` kiểm đúng ba con số này.

## 🔁 Pipeline của thư viện

85 prompt game **được sinh tự động**, không sửa tay:

```
tools/data/games.mjs + clusters.mjs + gestures.mjs + examples.mjs + error-notes.mjs
tools/lib/ar.mjs · rules.mjs · feel.mjs · classroom.mjs · access.mjs · verify.mjs · pe.mjs · memory.mjs · acceptance.mjs
        └─ node tools/build.mjs ─→ catalogs/GAME_CATALOG.csv · .md · .js + prompts/0X-*/ + index.html + prompts/CHECKLIST_NGHIEP_THU.md
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
