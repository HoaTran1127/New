# E4-07 — Sentence Race

- **Khối:** English 4
- **Mục tiêu:** Sắp xếp từ thành câu đơn giản đúng.
- **Nhiệm vụ:** Sắp xếp các thẻ từ thành câu.
- **Điều khiển:** GRAB

## Prompt copy trực tiếp

```text
Tạo game "Sentence Race" cho English 4 trong 1 HTML.
Mục tiêu: trật tự từ trong câu đơn giản và đọc hiểu cơ bản.
Nhiệm vụ: kéo các word tiles vào đúng thứ tự trước khi xe đến đích.
Dùng mẫu câu phù hợp tiểu học như "I play football after school." hoặc "She has breakfast at seven.". Xáo trộn từ, có punctuation tile ở level cao. Sau khi đúng, phát âm câu bằng Web Speech API và highlight subject/verb/time phrase theo màu nhẹ.
Camera Hands pinch drag; state press/hold/release; smoothing/confidence/cooldown. Fallback mouse/touch.
Sai: chỉ ra vị trí sai và cho gợi ý, không reset toàn bộ quá sớm.
Có 3 level, timer nhẹ, score, result. Không upload camera. 1 HTML.
```
