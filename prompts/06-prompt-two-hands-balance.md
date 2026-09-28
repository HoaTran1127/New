# ⚖️ PROMPT MẪU 6: TWO HANDS BALANCE AR (GAME GIƠ 2 TAY CÂN BẰNG TOÁN HỌC)

> **Mô tả:** Game AR vận động 2 tay (Dual Hands Kinesthetic). Học sinh đứng trước camera giơ 2 tay lên cao hoặc hạ thấp mô phỏng chiếc Cân Đòn Thiên Nga để so sánh 2 vế phép tính: Lớn hơn (>), Bé hơn (<) hoặc Bằng nhau (=).

---

## 📋 NỘI DUNG PROMPT DÁN VÀO GEMINI CANVAS:

```markdown
Bạn là một Chuyên gia Lập trình Game Giáo dục Web AR (HTML5, Canvas 2D, MediaPipe, Tone.js).
Hãy tạo cho tôi một game Web AR tương tác vận động 2 tay 1 file HTML hoàn chỉnh có tên "AR BALANCE SCALE - ĐÒN CÂN TOÁN HỌC THỰC TẾ ẢO" dành cho học sinh Lớp 4 & 5.

### 1. CƠ CHẾ VẬN ĐỘNG 2 TAY (DUAL HAND TRACKING):
- Dùng Google MediaPipe Hands nhúng qua CDN (`maxNumHands: 2`).
- Nhận diện cả 2 bàn tay của học sinh qua webcam:
  * Tay trái nâng lên cao, tay phải hạ xuống -> Đòn cân nghiêng sang Phải (Vế Phải nặng hơn: Vế Trái < Vế Phải).
  * Tay phải nâng lên cao, tay trái hạ xuống -> Đòn cân nghiêng sang Trái (Vế Trái nặng hơn: Vế Trái > Vế Phải).
  * 2 tay giữ ngang bằng nhau -> Đòn cân thăng bằng (Vế Trái = Vế Phải).
- Khi học sinh giữ tư thế đòn cân chuẩn trong 1.5 giây (Hold Gesture), hệ thống chốt đáp án!

### 2. CƠ CHẾ BÀI HỌC SO SÁNH:
- Đĩa cân bên Trái và Đĩa cân bên Phải mang 2 biểu thức toán học hoặc số đo:
  * So sánh phân số Lớp 4: Ví dụ "3/4" và "5/8" -> Học sinh phải so sánh quy đồng mẫu để nghiêng tay về bên lớn hơn.
  * So sánh số thập phân Lớp 5: Ví dụ "0.75" và "0.8" -> Học sinh nghiêng tay về bên "0.8".
  * So sánh đơn vị đo: "1 tấn 20kg" và "1200kg".
  * So sánh bằng nhau: "2/4" và "1/2" -> Học sinh giơ 2 tay cân bằng!

### 3. HIỆU ỨNG & ÂM THANH:
- Đòn cân bằng gỗ hoặc kim loại vàng phát sáng được vẽ động trên Canvas 2D theo góc nghiêng giữa 2 bàn tay học sinh.
- Khi cân đúng: Nổ pháo hoa hạt vàng, tiếng chuông đồng hồ reo vang (Tone.PolySynth), +15 điểm.
- Khi cân sai: Tiếng lò xo trượt "boing", đĩa cân lắc lư cảnh báo và hiện lời giải thích chi tiết.
- Toàn bộ gói gọn trong 1 file HTML duy nhất, giao diện sắc nét, font chữ Fredoka.

Hãy viết trọn vẹn toàn bộ mã nguồn HTML, CSS và JavaScript hoàn chỉnh, sẵn sàng chạy ngay khi mở file!
```
