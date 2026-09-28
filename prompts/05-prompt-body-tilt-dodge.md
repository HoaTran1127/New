# 🏃 PROMPT MẪU 5: BODY TILT & DODGE AR (GAME VẬN ĐỘNG NGHIÊNG NGƯỜI NÉ BẪY)

> **Mô tả:** Game AR vận động toàn thân (Active Body Movement). Học sinh đứng trước camera, nghiêng người sang trái hoặc sang phải (Body Tilt) hoặc vươn 2 tay để điều khiển chiếc Phi Thuyền bay qua cánh cổng mang phép tính hoặc từ vựng ĐÚNG, né cổng SAI.

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Bạn là một Chuyên gia Lập trình Game Giáo dục Web AR (HTML5, Canvas 2D, MediaPipe, Tone.js).
Hãy tạo cho tôi một game Web AR tương tác vận động cơ thể 1 file HTML hoàn chỉnh có tên "AR SPACE RACER - PHI THUYỀN VẬN ĐỘNG HỌC TẬP" dành cho học sinh tiểu học.

### 1. CƠ CHẾ VẬN ĐỘNG TOÀN THÂN (BODY TILT / 2 HANDS):
- Dùng MediaPipe Hands (hoặc MediaPipe Pose) nhúng qua CDN.
- Học sinh đứng cách webcam 2 mét:
  * Khi học sinh nghiêng người hoặc di chuyển 2 bàn tay sang Trái: Phi thuyền bay lướt sang Trái.
  * Khi học sinh nghiêng người hoặc di chuyển 2 bàn tay sang Phải: Phi thuyền bay lướt sang Phải.
- Lật gương webcam (`transform: -scale-x-100`) và áp dụng bộ lọc EMA chống rung.
- Có chế độ phím mũi tên Trái/Phải và chuột để chơi dự phòng nếu không mở camera.

### 2. CƠ CHẾ GAMEPLAY & LUẬT CHƠI:
- Bối cảnh: Đường đua vũ trụ không gian 3 làn chạy. Phi thuyền lao nhanh về phía trước.
- Trên đường đua xuất hiện các "Cổng Năng Lượng Không Gian" mang các câu hỏi Toán Lớp 4-5 hoặc Tiếng Anh:
  * Cổng ĐÚNG (Màu xanh neon phát sáng): Bay qua sẽ tăng tốc cực đại (Hyper Speed), +20 điểm, nổ pháo hoa và phát âm thanh tăng tốc (Tone.js).
  * Cổng SAI / Chướng ngại vật (Màu đỏ cảnh báo): Nếu đâm phải sẽ bị nổ phi thuyền, trừ 1 Máu, rung màn hình và rạn nứt kính buồng lái.
- Người chơi có 3 Máu, tốc độ bay tăng dần theo thời gian tạo cảm giác hồi hộp, kích thích học sinh vận động liên tục!

### 3. NỘI DUNG TÙY CHỌN:
- Chế độ Môn Toán: Phân số bằng nhau, số thập phân, bảng nhân chia.
- Chế độ Môn Tiếng Anh: Tìm từ đồng nghĩa, chọn từ đúng chính tả (Spelling).

### 4. ĐỒ HỌA & ÂM THANH:
- Đồ họa Canvas 2D phong cách Cyberpunk neon vũ trụ (hiệu ứng đường chân trời perspective, vệt sao sao băng trôi nhanh).
- Âm thanh động cơ synth và tiếng nổ không gian bằng Tone.js.
- Đóng gói hoàn chỉnh trong 1 file HTML duy nhất.

Hãy viết trọn vẹn toàn bộ mã nguồn HTML, CSS và JavaScript hoàn chỉnh, sẵn sàng chạy ngay khi mở file!
```
