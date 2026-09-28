# 🎬 BẢN ĐỒ HOẠT CẢNH & HIỆU ỨNG THỊ GIÁC (STORYBOARDS & VFX)

Tài liệu này tổng hợp các kịch bản hoạt cảnh (Storyboards) và hiệu ứng thị giác (VFX) mẫu để bạn yêu cầu Gemini Canvas lập trình chính xác từng phân đoạn trong game.

---

## 🎨 1. BẢNG PHÂN CẢNH TƯƠNG TÁC (SCENE STORYBOARD)

### Cảnh 1: Thẻ Bài Rơi Tự Do (Spawn & Fall Scene)
```text
  ┌──────────────────────────────────────────────────────────────┐
  │ [❤️ ❤️ ❤️ ❤️ ❤️]                                  [🪙 150] │
  │                                                              │
  │      ┌───────────────┐              ┌───────────────┐        │
  │      │  3/4 + 1/4 = 1│ (ĐÚNG)       │  7 × 8 = 54   │ (SAI)  │
  │      │     (Rơi ↓)   │              │     (Rơi ↓)   │        │
  │      └───────────────┘              └───────────────┘        │
  │                                                              │
  │                     🥊 [Tâm ngắm bàn tay học sinh]            │
  └──────────────────────────────────────────────────────────────┘
```
- **Mô tả hành vi:** Thẻ bài có bóng đổ neon (`shadowBlur = 18`), viền bo tròn 16px, bồng bềnh nhẹ theo trục X bằng hàm sin (`Math.sin(wobble) * 0.02`).
- **Prompt mẫu cho Gemini:** *"Các thẻ bài rơi từ trên xuống với gia tốc ổn định, có hiệu ứng bồng bềnh nhẹ để tạo cảm giác trôi nổi tự nhiên."*

---

### Cảnh 2: Chém Trúng Thẻ Đúng (Hit Correct Scene)
```text
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │                     ✨  * 💥 +10đ! *  ✨                      │
  │                    *  MẢNH NỔ TUNG TÓE  *                    │
  │                      [SÓNG CHẤN ĐỘNG]                        │
  │                          ((( 🥊 )))                          │
  │                                                              │
  │                 🔥 COMBO x3! (Chữ nảy tưng bừng)             │
  └──────────────────────────────────────────────────────────────┘
```
- **Mô tả hành vi:** Sinh ra 24 hạt đa giác bay theo các góc ngẫu nhiên, giảm dần độ mờ alpha, rơi theo trọng lực. Sóng chấn động tròn mở rộng từ tâm va chạm. Âm thanh Tone.PolySynth hợp âm tươi vui vang lên.
- **Prompt mẫu cho Gemini:** *"Khi tay chạm thẻ đúng, thẻ biến mất lập tức và phát nổ 24 hạt lấp lánh mang màu sắc của thẻ, kèm chữ bay +10 điểm và âm thanh nhặt xu hào hùng."*

---

### Cảnh 3: Đấm Nhầm Thẻ Sai - Phạt Nứt Màn Hình (Cracked Screen Scene)
```text
  ┌──────────────────────────────────────────────────────────────┐
  │  \        /       /              \           /            /  │
  │   \      /       /    💥💥💥      \         /            /   │
  │    \────/───────/──  [TÂM VA CHẠM] ──\───────/──────────/    │
  │     \  /       /         🥊           \     /          /     │
  │    (TIA RẠN NỨT MẠNG NHỆN TOẢ RA TOÀN BỘ MÀN HÌNH MÁY TÍNH)   │
  │                                                              │
  │   [ ⚠️ KÍNH VỠ TOẢNG! 7 × 8 = 56 CHỨ KHÔNG PHẢI 54! ]        │
  └──────────────────────────────────────────────────────────────┘
```
- **Mô tả hành vi:**
  1. Màn hình máy tính chớp màu đỏ nhạt trong 0.2 giây.
  2. Toàn bộ trang web rung lắc (CSS Screen Shake) trong 250ms.
  3. Canvas vẽ 15 đường nứt gãy khúc rạn mạng nhện màu trắng phát sáng tỏa ra khắp màn hình.
  4. Âm thanh kính vỡ râm ran (White Noise + PolySynth cao độ).
  5. Banner cảnh báo hiện ra giải thích rõ ràng lý do sai.
- **Prompt mẫu cho Gemini:** *"Nếu đấm nhầm thẻ sai, lập tức kích hoạt hiệu ứng kính vỡ mạng nhện tỏa ra từ điểm va chạm, màn hình rung lên và hiện banner giải thích chi tiết đáp án đúng để học sinh ghi nhớ."*

---

### Cảnh 4: Màn Hình Kết Thúc (Game Over Scene)
- Modal kính mờ tối màu (Backdrop Blur), bảng vàng vinh danh điểm số, số câu đúng/sai, độ chính xác (%) và nút bấm kích thước lớn "Chơi Lại Vòng Này".
