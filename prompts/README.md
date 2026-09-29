# 📚 MiTi — PROMPT LIBRARY

Đây là **thư viện prompt để tạo game**, không phải game engine.

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

## 🎯 325 biến thể

**65 game gốc × 5 biến thể = 325 prompt**

1. Camera Point — chỉ tay
2. Camera Swipe — vuốt/chém
3. Drag & Grab — kéo/thả
4. Voice — giọng nói
5. No Camera — chuột/chạm/bàn phím

👉 [Mở 325 Prompt Variants](VARIANTS_325.md)

## 🗂️ Tổ chức thư mục

- 00-master-canvas-prompt.md — khung chuẩn khi tạo prompt mới.
- BRAND_MITI.md — chuẩn thương hiệu.
- templates/ — mẫu prompt.
- 01-toan4/ — 40 game Toán 4.
- 02-toan5/ — 15 game Toán 5.
- 03-english4/ — 15 game Tiếng Anh 4.
- 04-english5/ — 15 game Tiếng Anh 5.
- VARIANTS_325.md — 325 biến thể của 65 game gốc.

## ✅ Quy tắc không tạo file ảo

Dashboard và catalogue chỉ trỏ tới prompt tồn tại thật.
ID/đường dẫn file được giữ ổn định.
Không dùng tên file tưởng tượng chỉ để làm đẹp giao diện.

## 🔧 Khi tạo game mới

1. Chọn mục tiêu học tập.
2. Điền metadata và gameplay.
3. Áp dụng Master Prompt.
4. Bắt buộc áp dụng Brand Contract.
5. Kiểm tra fallback, feedback và HTML một file.
