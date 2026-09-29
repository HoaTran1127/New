# E4-03 — Picture Word Match

- **Khối:** English 4
- **Mục tiêu:** Liên kết từ, nghĩa và hình ảnh.
- **Nhiệm vụ:** Nối từ tiếng Anh với hình đúng.
- **Điều khiển:** PINCH/GRAB

## Prompt copy trực tiếp

```text
Tạo game "Picture Word Match" cho English 4 bằng 1 file HTML.
Mục tiêu: xây liên kết visual–word–meaning.
Nhiệm vụ: dùng pinch/grab kéo thẻ từ tới hình ảnh phù hợp.
Mỗi round có 4–6 cặp. Khi kéo đúng, hai thẻ kết nối bằng đường sáng và từ được phát âm. Khi sai, thẻ quay lại vị trí và hiện gợi ý hình/giọng đọc.
Ngân hàng từ theo các chủ đề quen thuộc, ít nhất 60 từ. Có difficulty 3x3 và 4x4.
Camera MediaPipe Hands với pinch state (press/hold/release), confidence và cooldown; không kích hoạt khi chỉ hover.
Fallback mouse drag/touch.
UI Start → Tutorial → Practice → Play → Result → Replay. Chữ lớn, màu rõ.
Không upload video. Không TODO/pseudocode. Một HTML.
```
