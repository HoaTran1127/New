# Bài 3: Game Loop & Hiệu Ứng Đồ Họa 2D Canvas

## 1. Trái tim của Game: Vòng lặp trò chơi (Game Loop)
Trong phát triển game web, ta không dùng `setInterval` hay `setTimeout` vì chúng không đồng bộ với tần số quét của màn hình và dễ gây giật khung hình.
Thay vào đó, ta sử dụng chuẩn công nghiệp: `requestAnimationFrame(callback)`.

```javascript
function gameLoop(timestamp) {
  // 1. Xóa sạch khung hình cũ
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Cập nhật vị trí logic các đối tượng (Update)
  updateEntities();

  // 3. Vẽ lại các đối tượng ở vị trí mới (Draw)
  drawEntities();

  // 4. Lặp lại ở khung hình tiếp theo (60 FPS)
  requestAnimationFrame(gameLoop);
}
```

---

## 2. Hệ thống Thẻ Rơi Phân Làn (Lane-based Falling Cards)
Để các thẻ phép tính không đè lộn xộn lên nhau, màn hình được chia thành **3 hoặc 4 làn chạy** (tùy theo độ rộng màn hình máy tính hay điện thoại):

```
       Làn 0              Làn 1              Làn 2
  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
  │  7 × 8 = 56  │   │              │   │  3/4 + 1/4=1 │
  │   (Rơi v_y)  │   │              │   │   (Rơi v_y)  │
  └──────────────┘   └──────────────┘   └──────────────┘
```

Mỗi thẻ `FallingCardTarget` có:
- Tọa độ $x, y$ và kích thước width, height.
- Vận tốc rơi $v_y$ (tự động điều chỉnh theo độ khó Dễ / Vừa / Thần tốc).
- Hiệu ứng bồng bềnh nhẹ: `Math.sin(this.wobble) * 0.02` để thẻ trông sinh động như các vật phẩm trong Subway Surfers.

---

## 3. Các Hiệu Ứng Kích Thích Thị Giác (Juice & Polish)
Một game giáo dục hay phải đem lại phản hồi thị giác cực kỳ thỏa mãn (Satisfying Feedback) mỗi khi học sinh làm đúng hoặc sai:

### 3.1. Vết Kiếm Neon (Blade Trail)
Lưu lại mảng 16 vị trí gần nhất của bàn tay. Dùng `ctx.beginPath()` nối các điểm lại với độ mờ và độ dày giảm dần về đuôi:
```javascript
const ratio = 1 - (i / this.points.length);
ctx.lineWidth = ratio * 14;
ctx.strokeStyle = '#00F0FF';
ctx.shadowColor = '#00F0FF';
ctx.shadowBlur = 12;
```

### 3.2. Hạt nổ rực rỡ khi đấm trúng thẻ đúng (Particles)
Khi đấm thẻ đúng, sinh ra 24 mảnh vụn hình vuông bay theo các góc ngẫu nhiên $0 \rightarrow 2\pi$, chịu tác động của trọng lực `gravity = 0.28` và tự xoay quanh tâm:
```javascript
this.x += this.vx;
this.y += this.vy;
this.vy += this.gravity;
this.alpha -= 0.025; // Mờ dần rồi biến mất
```

### 3.3. Kính vỡ toảng khi đấm nhầm thẻ sai (Cracked Screen)
Nếu học sinh chém nhầm thẻ mang phép tính sai, màn hình sẽ chớp đỏ và xuất hiện **12 đến 18 tia nứt mạng nhện** tỏa ra từ điểm va chạm, kèm hiệu ứng rung màn hình (Screen Shake CSS):
```javascript
document.body.classList.add('shake-active');
setTimeout(() => document.body.classList.remove('shake-active'), 250);
```

---

👉 **Ở bài tiếp theo:** Chúng ta sẽ đi sâu vào "Linh hồn kiến thức" của game: Thiết kế ngân hàng câu hỏi Toán Lớp 4 & 5 và thuật toán sinh bẫy đúng/sai thông minh!
