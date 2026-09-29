# 🟡 MiTi — BRAND CONTRACT CHO GEMINI

Đây là **hợp đồng thương hiệu** được nhúng vào mọi prompt độc lập.

## Kết quả bắt buộc

Khi Gemini tạo game, file HTML phải tự chứa chữ ký MiTi. Người dùng có thể tải/copy file HTML sang máy khác mà **không cần repository MiTi** nhưng logo vẫn còn.

## Quy chuẩn

- Thương hiệu: **MiTi**
- Biểu tượng: ô bo góc chứa chữ **M**
- Wordmark: **MiTi**
- Accent: dấu **✦** nhỏ
- Màu chính: `#FFD84D`
- Chữ tối: `#07111F`
- Chữ sáng: `#F8FAFC`
- Dòng chữ ký: **MiTi • Học bằng chuyển động**

## Vị trí

1. Màn hình Bắt đầu
2. HUD khi đang chơi
3. Màn hình Kết quả
4. Chân trang hoặc vùng thông tin

Logo phải nhỏ, nhất quán, không che vùng tương tác.

## Kỹ thuật

- Ưu tiên inline SVG/CSS.
- Không tham chiếu `brand/miti-logo.svg`.
- Không tải logo từ URL ngoài.
- Không bỏ logo ở chế độ camera, fallback hoặc replay.
- Không thay đổi chữ **MiTi**.

## SVG tham chiếu

Có thể dùng trực tiếp asset trong repository để đối chiếu hình thức, nhưng HTML sinh ra phải tự nhúng SVG/CSS và không phụ thuộc repository.

[MiTi logo](../brand/miti-logo.svg)
