# E4-08 — Word Memory

- **Khối:** English 4
- **Mục tiêu:** Ghi nhớ liên kết từ–hình–nghĩa.
- **Nhiệm vụ:** Tìm các cặp thẻ phù hợp.
- **Điều khiển:** POINT

## Prompt copy trực tiếp

```text
Tạo game "Word Memory" cho English 4 trong 1 HTML duy nhất.
Mục tiêu: củng cố từ vựng bằng memory game.
Nhiệm vụ: lật thẻ và tìm cặp English word ↔ picture hoặc word ↔ meaning.
Có 12/16/20 thẻ theo level. Khi mở một thẻ, phát âm từ. Khi ghép đúng, giữ mở; sai thì úp lại sau 700ms. Xáo trộn toàn bộ vị trí mỗi session. Theo dõi accuracy và thời gian nhưng không tạo áp lực quá lớn.
Camera Hands, fingertip POINT để lật thẻ; debounce để không double flip.
Fallback click/touch.
Có hint, replay và danh sách từ đã luyện ở cuối. Không upload camera. 1 HTML, không TODO.
```
