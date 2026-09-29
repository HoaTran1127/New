# 📚 PROMPT LIBRARY — GEMINI CANVAS

Đây là **thư viện prompt**, không phải thư viện game engine.

Quy trình sử dụng:

**GAME CATALOG → CHỌN GAME → MỞ PROMPT → COPY TOÀN BỘ → DÁN GEMINI CANVAS → PREVIEW → CHỈNH TIẾP**

## Chuẩn của mỗi prompt game

Mỗi prompt độc lập phải có:

- Mục tiêu học tập.
- Nhiệm vụ người chơi bằng một câu.
- Gameplay core.
- Gesture/control chính và ý nghĩa.
- Camera/tracking + calibration + confidence + cooldown.
- Dữ liệu câu hỏi và bẫy sai lầm phổ biến.
- Feedback học tập.
- UI/game loop.
- Fallback.
- Safety/accessibility.
- Output một file HTML duy nhất.

## Tài liệu trung tâm

- [Game Catalogue](../catalogs/GAME_CATALOG.md)
- [Master Prompt](00-master-canvas-prompt.md)
- [Prompt Template](templates/game-prompt-template.md)
- [Movement Catalog](../catalogs/storyboards/movement-kinesthetic-guide.md)
- [UX Benchmark](../docs/AR_GAME_UX_BENCHMARK.md)

## Nguyên tắc

**Prompt là sản phẩm. Code demo chỉ là reference.**

Mỗi prompt phải có thể copy độc lập; Gemini không cần biết repository này để tạo game.
