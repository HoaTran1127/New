# 📝 Biểu mẫu tạo prompt game mới

File này đã được gộp vào bộ template chuẩn để tránh hai bản lệch nhau:

- [`templates/game-prompt-template.md`](templates/game-prompt-template.md) — biểu mẫu điền ô `[...]`, có metadata + khối prompt + checklist nghiệm thu.
- [`00-master-canvas-prompt.md`](00-master-canvas-prompt.md) — khung chuẩn 9 mục mà mọi prompt game phải theo.
- [`BRAND_MITI.md`](BRAND_MITI.md) — hợp đồng thương hiệu MiTi bắt buộc trong HTML đầu ra.

Luồng nhanh: copy biểu mẫu → điền → dán vào **Google Gemini (chế độ Canvas)** → nhận 1 file HTML.

Nếu muốn thêm game vào thư viện (để hiện trên dashboard), thêm một dòng vào `tools/data/games.mjs` rồi chạy `node tools/build.mjs`.
