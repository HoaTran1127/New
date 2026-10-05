# 📝 Biểu mẫu tạo prompt game mới

File này đã được gộp vào bộ template chuẩn để tránh hai bản lệch nhau:

- [`templates/game-prompt-template.md`](templates/game-prompt-template.md) — biểu mẫu điền ô `[...]`, có metadata + khối prompt + checklist trước khi gửi Gemini.
- [`00-master-canvas-prompt.md`](00-master-canvas-prompt.md) — khung chuẩn 5 mục (Ý TƯỞNG · MỤC TIÊU HỌC TẬP · RÀNG BUỘC CỐT LÕI · NGÂN HÀNG DỮ LIỆU · TỰ KIỂM TRA) mà mọi prompt game phải theo, trần 15 KB.
- [`BRAND_MITI.md`](BRAND_MITI.md) — hợp đồng thương hiệu MiTi bắt buộc trong HTML đầu ra.

Luồng nhanh: copy biểu mẫu → điền → dán vào **Google Gemini (chế độ Canvas)** → nhận 1 file HTML.

Nếu muốn thêm game vào thư viện (để hiện trên dashboard), thêm một dòng vào `tools/data/games.mjs` rồi chạy `node tools/build.mjs`.
