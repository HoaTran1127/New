# 👑 MASTER SYSTEM PROMPT CHO GEMINI CANVAS (AR & 2D WEB GAMES)

> **Mục đích:** Đây là Prompt Gốc (Master Prompt) chứa toàn bộ các quy tắc kỹ thuật nghiêm ngặt. Khi đưa prompt này vào Gemini (bật chế độ Canvas), Gemini sẽ tự động lập trình ra game AR hoàn hảo chạy 100% trong 1 file HTML, không bị lỗi thiếu thư viện, không bị giật lag và có âm thanh cực đỉnh.

---

## 📋 NỘI DUNG PROMPT COPY VÀO GEMINI CANVAS:

```markdown
Bạn là một Chuyên gia Lập trình Game Giáo dục Web AR (HTML5, Canvas 2D, MediaPipe, Web Audio).
Hãy tạo cho tôi một ứng dụng Game Tương Tác Học Tập hoàn chỉnh đóng gói trong DUY NHẤT 1 FILE HTML (Single File HTML) để chạy trực tiếp trên trình duyệt web máy tính / laptop.

### YÊU CẦU KỸ THUẬT BẮT BUỘC:
1. **Công nghệ Thị giác Máy tính (Web AR):**
   - Sử dụng Google MediaPipe Hands nhúng qua CDN:
     * `https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js`
     * `https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js`
   - Video webcam nền đặt lật gương ngang (`transform: -scale-x-100`) để người chơi có cảm giác soi gương tự nhiên.
   - Áp dụng bộ lọc mượt chuyển động tay Exponential Moving Average (EMA với alpha ~ 0.45) để chống giật rung từ webcam.
   - Phát hiện cú vung đấm / chém (Strike): tính tốc độ di chuyển của tay qua các frame, khi tốc độ vượt ngưỡng thì kích hoạt chém.
   - BẮT BUỘC có chế độ Fallback: Nếu người chơi không có camera hoặc từ chối cấp quyền, vẫn có thể click chuột hoặc chạm màn hình để chơi bình thường.

2. **Giao diện & Đồ họa (UI/UX Arcade):**
   - Dùng Tailwind CSS CDN + Google Fonts (Fredoka cho chữ game, Outfit cho số điểm).
   - Canvas 2D phủ tràn màn hình (Full Screen), co giãn linh hoạt theo kích thước cửa sổ.
   - Phản hồi thị giác thỏa mãn (Juice): Vệt kiếm neon theo tay, hạt nổ tung tóe khi trúng thẻ đúng, sóng chấn động shockwave, và hiệu ứng nứt vỡ màn hình (Cracked screen effect) khi chọn sai.
   - HUD đầu màn hình: Thanh máu (5 trái tim), điểm số coin 🪙, chuỗi Combo x2, x3, x4 và tên chủ đề bài học.

3. **Âm thanh Arcade sống động (Tone.js):**
   - Nhúng Tone.js qua CDN: `https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js`.
   - KHÔNG tải file mp3 ngoài (để tránh lỗi 404/CORS). Tất cả âm thanh đều tự tổng hợp bằng Synthesizer:
     * Tiếng vung tay gió rít: Tone.NoiseSynth (pink noise).
     * Tiếng nhặt xu / đúng: Tone.PolySynth (hợp âm tăng dần theo combo).
     * Tiếng kính vỡ khi sai: Tone.NoiseSynth (white noise) + Tone.PolySynth nốt cao.
   - Mở khóa AudioContext đúng chuẩn: gọi `await Tone.start()` khi người chơi bấm nút "Bắt đầu chơi".

4. **Ngân hàng Kiến thức Sư phạm:**
   - Dạng toán: [ĐIỀN DẠNG TOÁN Ở ĐÂY - Ví dụ: Toán Lớp 4 Phân số / Toán Lớp 5 Số thập phân].
   - Tỉ lệ xuất hiện: 60% phép tính ĐÚNG (để người chơi chém ăn điểm), 40% phép tính SAI (làm bẫy sư phạm để người chơi né).
   - Khi chém nhầm thẻ sai, hiện banner giải thích chi tiết vì sao sai để người chơi rút kinh nghiệm.

Hãy viết trọn vẹn toàn bộ mã nguồn HTML, CSS và JavaScript hoàn chỉnh, không dùng mã rút gọn hay comment `// TODO`.
```
