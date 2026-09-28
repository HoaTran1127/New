# 🏃 CẨM NANG CÁC CỬ CHỈ VẬN ĐỘNG THỂ CHẤT (KINESTHETIC MOVEMENT CATALOG)

> **Mục tiêu:** Tập hợp các động tác thể chất lành mạnh giúp học sinh tiểu học vừa học vừa vận động cơ thể, giải phóng năng lượng và rèn luyện phản xạ thị giác.

---

## 🤸 6 ĐỘNG TÁC VẬN ĐỘNG TRONG CÁC GAME AR

### 1. Vung Đấm Bốc 1 Tay (One-Hand Punch) 🥊
- **Động tác của học sinh:** Đứng thẳng cách camera 1.5m - 2m. Mắt quan sát thẻ rơi, khi phát hiện thẻ ĐÚNG thì vung tay đấm thẳng về phía trước như võ sĩ quyền anh.
- **Cách phát hiện trong code:** Tính vận tốc $\vec{v} = (\Delta x, \Delta y) / \Delta t$. Khi $v > 0.035$, kích hoạt sự kiện đấm.
- **Game ứng dụng:** *Subway Math Blitz AR, English Vocabulary Ninja*.

---

### 2. Giơ 2 Tay Làm Giỏ Hứng Hoặc Đòn Cân (Dual-Hand Basket / Scale) 🧺 ⚖️
- **Động tác của học sinh:** Vươn cả 2 cánh tay ra trước màn hình.
  - Di chuyển 2 tay cùng lúc sang trái/phải để làm chiếc giỏ hứng quả.
  - Hoặc nâng tay trái lên cao, hạ tay phải xuống thấp để mô phỏng đòn cân so sánh lớn hơn/bé hơn.
- **Cách phát hiện trong code:** Đặt `maxNumHands: 2`. Lấy tọa độ Y của tay trái (`hands[0].y`) và tay phải (`hands[1].y`). Góc nghiêng đòn cân $\theta = \arctan\left(\frac{y_2 - y_1}{x_2 - x_1}\right)$.
- **Game ứng dụng:** *AR Math Catcher, Two Hands Balance Scale*.

---

### 3. Nghiêng Người Sang Trái / Phải (Body Tilt & Dodge) 🏎️
- **Động tác của học sinh:** Đứng tự do, nghiêng cả thân người hoặc bước chân sang bên trái/phải để điều khiển nhân vật né chướng ngại vật và chui qua cổng năng lượng đúng.
- **Cách phát hiện trong code:** Theo dõi trọng tâm cổ tay và đầu ngón tay giữa hoặc trục tọa độ X trung bình. Khi lệch khỏi tâm màn hình $> 15\%$, kích hoạt rẽ hướng.
- **Game ứng dụng:** *Space Racer AR, Subway Runner*.

---

### 4. Vệt Kiếm Ánh Sáng Katana (Sword Slash) ⚔️
- **Động tác của học sinh:** Vung tay chém chéo, chém ngang như một kiếm thủ ninja thực thụ để chém vỡ các quả bóng phép tính bay từ dưới lên.
- **Cách phát hiện trong code:** Lưu mảng 16 vị trí gần nhất (`BladeTrail`). Kiểm tra giao điểm giữa đoạn thẳng di chuyển của tay với hình tròn bong bóng.
- **Game ứng dụng:** *Math Ninja Bubble Pop, Fruit Slasher*.

---

### 5. Chạm Ngón Tay Điểm Huyệt (Finger Touch / Pointing) ☝️
- **Động tác của học sinh:** Giơ ngón trỏ lên cao, vươn tay tới các vị trí khác nhau trong không gian để "chạm" vào chữ cái hoặc đáp án.
- **Cách phát hiện trong code:** Theo dõi khớp số 8 (Index Finger Tip). Bán kính va chạm thu nhỏ chỉ khoảng 25px để rèn luyện độ chính xác và khéo léo của ngón tay.
- **Game ứng dụng:** *AR Spelling Bee, Trắc nghiệm A B C D*.

---

### 6. Động Tác Vỗ Tay Kích Hoạt (Clap Trigger) 👏
- **Động tác của học sinh:** Đưa 2 bàn tay vỗ vào nhau khi muốn chốt đáp án hoặc kích hoạt tuyệt chiêu tối thượng.
- **Cách phát hiện trong code:** Khoảng cách giữa tâm bàn tay trái và bàn tay phải $< 0.08$ (tương đương 2 tay áp sát nhau).
- **Game ứng dụng:** *Kích hoạt bom hủy diệt, Chốt đáp án cân bằng*.
