# 📚 MiTi — PROMPT LIBRARY

Đây là **thư viện prompt để tạo game**, không phải game engine.

**85 prompt game chuẩn** (40 Toán 4 · 15 Toán 5 · 15 Tiếng Anh 4 · 15 Tiếng Anh 5) + **12 prompt legacy** đời đầu, tất cả theo khung **5 mục** của [master prompt](00-master-canvas-prompt.md) và nằm dưới trần **15 KB mỗi prompt**.

## ✂️ Vì sao prompt ngắn (vòng rút gọn 2026-10)

Đo trên bản trước khi rút: 85 file prompt nặng **13,49 MB**, trung bình **162 KB/file**, trong đó **~77% là chữ quy định chung lặp lại y hệt giữa 85 file** (riêng khối nghiệm thu 25,8 KB), còn **ý tưởng + mục tiêu học tập của từng game chỉ ~2,5%**. Prompt dài như vậy làm Gemini Canvas "ngợp": model vật sang code vụn, bỏ quy định ở giữa file, game sinh ra lộn xộn.

Bản hiện hành: **1,09 MB cho 85 file, trung bình 12,8 KB/file (khối `text` 57 dòng)**, tức giảm ~92%. Toàn bộ quy định dùng chung được nén thành **14 dòng `CORE_LINES` trong `tools/lib/core.mjs`** và in nguyên văn vào mọi prompt; mỗi prompt chỉ còn phần riêng của game mình. Ngay dưới tên game là một dòng **ƯU TIÊN** bắt Gemini giữ thứ tự *mục tiêu học tập → nhận diện chuyển động → phần còn lại*, và năm dòng trang trí đã nén thành hai dòng dán nhãn "trang trí, được phép làm đơn giản".

## 🚀 Luồng chuẩn

**Dashboard → Chọn lớp/môn → Chọn game → Copy khối `text` → Dán vào Gemini (bật Canvas) → Gemini sinh 1 file HTML → chơi bằng nút Run/Preview**

👉 [Quay về MiTi Dashboard](../index.html)

## 🧩 Cấu trúc một prompt game

Mỗi file là **prompt độc lập** — không cần Gemini biết repository này. Khối `text` gồm đúng 5 mục theo thứ tự:

| Mục | Nội dung | Nguồn dữ liệu |
|:---|:---|:---|
| Dòng mở đầu | thứ tự ưu tiên: mục tiêu học tập → nhận diện chuyển động + fallback → phần còn lại; chi tiết trang trí được phép giản tiện | `tools/build-prompts.mjs`, `tools/build-variants.mjs` |
| **1. Ý TƯỞNG** | bối cảnh, nhiệm vụ mỗi lượt, cơ chế + cử chỉ, biên độ động tác, fallback không camera, mascot + bảng màu, một dòng "không khí giờ chơi" gộp thể thao · dân gian · khoảnh khắc chữ ký · đạo cụ AR | `tools/data/games.mjs`, `gestures.mjs`, `identities.mjs`, `sports.mjs`, `folk.mjs` |
| **2. MỤC TIÊU HỌC TẬP** | mục tiêu, mạch kiến thức + nhãn HUD, tuần học, "Yêu cầu cần đạt" nguyên văn, mẹo nhớ, "Dễ nhầm", lỗi thường mắc, phạm vi, điều kiện thắng/thua, chống ăn may, màn tổng kết + bốn dòng "Gửi bố mẹ", bộ sưu tập | `tools/data/clusters.mjs`, `standards.mjs`, `error-notes.mjs` |
| **3. RÀNG BUỘC CỐT LÕI** | 14 dòng: 1 file HTML + 3 ảnh `.webp` trong `assets/` (Canva) · camera tắt mặc định · MediaPipe Tasks Vision `@1.0.1` + `toScreen` · gesture chống spam · fallback chuột · không điểm/xếp hạng/timer · vận động thật + 5 bước · luân phiên 4 em · accessibility · tự Pause · chữ ký MiTi · không TODO | `tools/lib/core.mjs` (nơi **duy nhất** để đổi quy định chung) |
| **4. NGÂN HÀNG DỮ LIỆU** | khuôn `QUESTION_DATA` `{ id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }`, số mục tối thiểu, hai mục mẫu, ràng buộc phương án nhiễu | `tools/data/examples.mjs`, `gestures.mjs` (`BANK`) |
| **5. TỰ KIỂM TRA TRƯỚC KHI XUẤT** | một dòng liệt kê ràng buộc cốt lõi + check ngân hàng dữ liệu | sinh từ `CORE_SHORT` |

## 🟡 MiTi đi vào game bằng cách nào?

**Không chỉ có logo ở repository.** Dòng cuối của khối RÀNG BUỘC CỐT LÕI bắt Gemini nhúng chữ ký MiTi vào HTML đầu ra: biểu tượng **M** trong ô bo góc `#FFD84D`, chữ **MiTi** đậm, dấu **✦**, dòng **MiTi • Học bằng chuyển động**, ở cả ba màn Bắt đầu · HUD · Kết quả, vẽ bằng inline SVG/CSS.

👉 [Brand Contract](BRAND_MITI.md) · 👉 [Logo nguồn](../brand/miti-logo.svg)

## 🎯 425 biến thể

**85 game × 5 kiểu điều khiển = 425 block**, do `tools/build-variants.mjs` sinh từ `tools/data/games.mjs`: Camera Point · Camera Swipe · Drag & Grab · Voice · No Camera.

Bản file: **4,58 MB**, trung bình 11,3 KB/block, block lớn nhất **12,0 KB** (trần 15 KB). Bốn biến thể đầu giữ nguyên hợp đồng AR: khung hình webcam cover-fit làm nền, tọa độ qua `toScreen(lx, ly)`, vật thể có `z` và neo landmark. block tiếng Anh in thêm band Cambridge + trần 541/930/1 431 từ. Muốn đổi nội dung thì sửa dữ liệu rồi chạy `node tools/build.mjs`, đừng sửa tay file sinh ra.

👉 [Mở 425 Prompt Variants](VARIANTS_425.md)

## 🗂️ Tổ chức thư mục

- `00-master-canvas-prompt.md` — khung 5 mục + bảng 14 mã điều khiển, để tự viết prompt mới.
- `templates/game-prompt-template.md` — biểu mẫu điền ô `[...]` (`template-tao-game-moi.md` cũ chỉ còn trang trỏ tới đây).
- `01-toan4/` · `02-toan5/` — 55 prompt Toán theo khối lớp.
- `03-english-starters/` · `04-english-movers/` · `05-english-flyers/` — 30 prompt Tiếng Anh, mỗi band 10 game, ID `ST-01…`, `MV-01…`, `FY-01…`. Trần từ vựng và ngữ pháp của từng prompt lấy theo wordlist Cambridge YLE (`tools/data/yle.mjs`).
- `01-prompt-…` đến `12-prompt-…` — **12 prompt legacy** (9,8–10,2 KB/file): giữ cơ chế game cũ, dùng ràng buộc cốt lõi hiện hành. Không dùng làm khuôn cho game mới.
- `VARIANTS_425.md` — 425 biến thể điều khiển.
- `CHECKLIST_NGHIEP_THU.md` — bảng kiểm cầm tay: **14 mục theo ràng buộc cốt lõi + 6 việc người thử làm tay**, do `tools/build-acceptance.mjs` sinh từ `CORE_LINES`.

## ✅ Nghiệm thu một game vừa sinh

Bảng kiểm in ra để cầm tay khi nhận file HTML: mỗi mục có một câu "cách thử" cụ thể, kèm mục **C. Khi có dòng chưa đạt** (dán lại nguyên văn ràng buộc tương ứng vào prompt rồi sinh lại — không sửa tay HTML) và **D. Biên bản** copy được. Chỉ in những gì `tools/lib/core.mjs` thật sự đòi; không kê mục không có trong prompt.

👉 [Mở Bảng Kiểm Nghiệm Thu](CHECKLIST_NGHIEP_THU.md)

## 🔧 Khi tạo game mới

1. Thêm một dòng vào `tools/data/games.mjs` (id · tên · gesture · cluster · bối cảnh · nhiệm vụ) và một dòng bản sắc vào `tools/data/identities.mjs`.
2. Chạy `node tools/build.mjs` — dựng catalog, 85+ prompt, 425 biến thể, rồi tự kiểm.
3. Không tạo file prompt tay: `node tools/validate.mjs` chặn prompt thiếu mục, thiếu 14 dòng CORE, vượt 15 KB, hoặc mascot/bảng màu trùng game khác.
