# 🎮 GEMINI CANVAS GAME PROMPT STUDIO

### Kho tổng hợp Prompt Game Giáo Dục Web Motion dành cho Gemini Canvas

Đây là **Prompt Library**: anh chọn một game, copy prompt và dán vào **Google Gemini Canvas** để Gemini tự tạo game HTML.

## Workflow

**GAME CATALOG → CHỌN GAME → COPY PROMPT → DÁN GEMINI CANVAS → PREVIEW → CHỈNH TIẾP TRONG CANVAS**

Mỗi game có 4 lớp thông tin:
1. **Mục tiêu học tập** — học sinh cần nắm điều gì.
2. **Nhiệm vụ** — học sinh phải làm gì.
3. **Chức năng/gameplay** — game vận hành thế nào.
4. **Prompt** — khối lệnh hoàn chỉnh để copy.

## Bắt đầu

👉 [Mở Game Catalogue](catalogs/GAME_CATALOG.md)

👉 [Mở thư viện Prompt](prompts/README.md)

👉 [GitHub Pages](https://hoatran1127.github.io/New/)

## Phạm vi hiện tại

- ✅ Prompt library.
- ✅ Game catalogue.
- ✅ Prompt master/template.
- ✅ Toán lớp 4 và lớp 5.
- ✅ English lớp 4 và lớp 5.
- ✅ Catalogue CSV hiện có **55 game entries**.
- ✅ Đợt mở rộng mới thêm **20 prompt**: 5 Toán 4 + 5 Toán 5 + 5 English 4 + 5 English 5.
- 🧪 Demo code trong games/ chỉ dùng để tham khảo và thử nghiệm.
- 🧪 Camera/gesture accuracy cần kiểm tra trên webcam và điều kiện ánh sáng thực tế.

## Nguyên tắc sản phẩm

**Prompt là sản phẩm. Code demo chỉ là reference.**

Mỗi prompt mới phải có thể copy độc lập vào Gemini Canvas; Gemini không cần biết repository này để tạo game.

Engine trong src/ không phải dependency bắt buộc của prompt.

## Research / QA

Đợt mở rộng 5 vòng được ghi tại:

research/PROMPT_LIBRARY_5_ROUND_EXPANSION.md