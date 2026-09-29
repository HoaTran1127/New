# Bài 2: Camera & MediaPipe Hand Tracking Trong Web AR

## 1. Google MediaPipe Hands là gì?
Google MediaPipe Hands là mô hình học máy (Machine Learning) có khả năng xác định chính xác **21 khớp xương 3D** trên bàn tay người từ hình ảnh camera 2D thông thường.

Các điểm mốc quan trọng nhất cho game:
- **Khớp 0:** Cổ tay (Wrist)
- **Khớp 5, 9, 13, 17:** Các khớp gốc của 4 ngón tay
- **Khớp 8:** Đầu ngón trỏ (Index finger tip)
- **Khớp 12:** Đầu ngón giữa (Middle finger tip)

---

## 2. Bí quyết 1: Lật gương (Mirror Effect)
Mặc định webcam truyền về hình ảnh thật, nhưng con người khi nhìn vào màn hình máy tính luôn có thói quen như **soi gương** (đưa tay phải lên thì hình ảnh bên phải màn hình phải di chuyển theo).
Nếu không lật gương, học sinh sẽ bị ngược tay và rất khó điều khiển!

Ta xử lý lật gương ở 2 nơi:
1. **Thẻ Video CSS:** Lật ngược khung hình hiển thị:
   ```html
   <video id="webcam" class="transform -scale-x-100"></video>
   ```
2. **Tọa độ Toán học:** Đảo ngược trục X từ MediaPipe ($0.0 \rightarrow 1.0$):
   ```javascript
   const mirroredX = 1 - rawLandmark.x;
   ```

---

## 3. Bí quyết 2: Bộ lọc làm mượt chống rung tay (EMA Filter)
Webcam giá rẻ thường có hiện tượng khung hình bị rung lắc (jitter) hoặc ánh sáng thay đổi khiến tọa độ tay nhảy qua lại. Để đường đấm mượt mà, ta áp dụng công thức **Trung bình động lũy thừa (Exponential Moving Average - EMA)**:

$$\text{smoothX} = \text{prevX} + \alpha \times (\text{currentX} - \text{prevX})$$

Trong đó hệ số $\alpha \approx 0.45$:
- Nếu $\alpha$ quá nhỏ: tay di chuyển bị trễ (lag).
- Nếu $\alpha$ quá lớn: tay bị giật rung theo nhiễu camera.
- Giá trị $0.45$ mang lại cảm giác phản hồi cực nhạy nhưng vẫn êm ái!

Đoạn mã triển khai trong `src/core/HandTracker.js`:
```javascript
if (prevHand) {
  smoothX = prevHand.x + this.smoothingFactor * (mirroredPalmX - prevHand.x);
  smoothY = prevHand.y + this.smoothingFactor * (rawPalmY - prevHand.y);
  
  // Tính tốc độ di chuyển của tay trong khung hình hiện tại
  const dx = smoothX - prevHand.x;
  const dy = smoothY - prevHand.y;
  speed = Math.sqrt(dx * dx + dy * dy);
}
```

---

## 4. Bí quyết 3: Bắt cú vung đấm (Punch / Strike Detection)
Làm sao phân biệt học sinh đang giơ tay bình thường với lúc học sinh **vung tay đấm vào thẻ**?
- `speed` được chuẩn hoá theo thời gian chứ không theo khung hình: `distance / (dt / 1000)`, tức **số lần chiều rộng khung hình mỗi giây** (`src/core/HandTracker.js:136-138`).
- Ngưỡng thật trong engine: `strikeSpeedThreshold = 1.15` để **bắt đầu** cú đấm và `strikeReleaseThreshold = 0.55` để **thả** trạng thái — hai ngưỡng khác nhau cố ý (hysteresis) để tư thế giữ nguyên không spam event.
- Ngoài hysteresis còn `strikeCooldownMs`: hai cú đấm liên tiếp phải cách nhau một khoảng, nên vung tay lia lịa không trừ tim học sinh.
- Mẹo chống nhận nhầm: kết hợp hình học bàn tay — `isFist` so khoảng cách đầu ngón trỏ → cổ tay với khớp ngón (`HandTracker.js:143-146`). Đấm thật là **xòe → nắm**, không chỉ là tay di chuyển nhanh.
- Đồng thời vẽ hiệu ứng tâm ngắm đấm bốc 🥊 đổi từ màu Xanh Cyan sang màu Hồng Neon phát sáng, báo hiệu cú đánh uy lực!

> Bản cũ của bài này ghi `speed > 0.035` (tính theo khung hình). Con số đó đã lỗi thời so với engine hiện tại; nếu bạn làm game bằng prompt MiTi, ngưỡng và hysteresis đã được khai báo thẳng trong prompt.

---

👉 **Ở bài tiếp theo:** Chúng ta sẽ học cách lập trình Vòng lặp trò chơi (Game Loop) bằng Canvas 2D, sinh các thẻ phép tính rơi và vẽ hiệu ứng chém kiếm neon tuyệt đẹp!
