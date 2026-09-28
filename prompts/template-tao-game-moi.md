# 📝 BIỂU MẪU (TEMPLATE) ĐIỀN NHANH ĐỂ TỰ TẠO PROMPT GAME MỚI CHO GEMINI CANVAS

> Khi bạn có một ý tưởng game mới (Toán học, Tiếng Anh, Khoa học...), hãy **sao chép mẫu này**, điền các thông tin trong ngoặc vuông `[...]` rồi dán vào Gemini (bật chế độ Canvas) để sinh ra game ngay lập tức!

---

```markdown
Hãy tạo một game Web AR tương tác 1 file HTML hoàn chỉnh có tên "[TÊN GAME CỦA BẠN - Ví dụ: THỦ THÀNH PHÂN SỐ AR]".

### 1. THỂ LOẠI & Ý TƯỞNG CỐT LÕI:
- Thể loại: [Chọn 1 trong các thể loại: Đấm bốc chém thẻ rơi / Hứng đồ vật / Bắn cung ngắm đích / Đua xe né vật cản / Chém bóng Fruit Ninja].
- Bối cảnh / Chủ đề hình ảnh: [Chọn phong cách: Không gian vũ trụ 🚀 / Đấu trường đường phố Subway 🛹 / Rừng xanh động vật 🦁 / Vương quốc kẹo ngọt 🍭].
- Nhân vật / Biểu tượng đại diện: [Ví dụ: Ninja Toán Học / Khỉ tinh nghịch / Xe đua F1].

### 2. CÔNG NGHỆ BẮT BUỘC:
- Dùng Google MediaPipe Hands nhúng qua CDN (`@mediapipe/hands` và `@mediapipe/camera_utils`) để bắt cử chỉ [Chọn: 1 bàn tay / Cả 2 bàn tay / Đầu ngón trỏ].
- Lật gương camera ngang (`transform: -scale-x-100`) và áp dụng bộ lọc mượt chuyển động tay EMA (alpha ~ 0.45).
- Hỗ trợ cả chuột (Click/Move) và cảm ứng để chơi được ngay cả khi không bật webcam.
- Âm thanh: Sử dụng Tone.js CDN tổng hợp âm thanh tại chỗ (không dùng file mp3 ngoài).

### 3. QUY TẮC GAMEPLAY & TƯƠNG TÁC:
- Mục tiêu của người chơi: [Mô tả người chơi cần làm gì, ví dụ: Vung tay chạm vào các thiên thạch mang đáp án đúng để phá hủy chúng].
- Khi làm ĐÚNG:
  * Điểm thưởng: [+10 điểm x Chuỗi Combo].
  * Hiệu ứng hình ảnh: [Nổ hạt màu sáng / Pháo hoa / Tia sét].
  * Âm thanh: [Hợp âm tươi vui tăng dần theo combo].
- Khi làm SAI:
  * Hình phạt: [Trừ 1 Máu trong tổng số 3 hoặc 5 Máu].
  * Hiệu ứng cảnh báo: [Rung màn hình / Chớp đỏ / Nứt vỡ kính / Hiện banner giải thích đáp án đúng].
- Điều kiện Thắng / Thua: [Hết máu thì Game Over hiện bảng điểm và nút chơi lại].

### 4. NỘI DUNG HỌC TẬP (MÔN HỌC & LỚP):
- Môn học: [Toán / Tiếng Việt / Tiếng Anh / Khoa Học].
- Khối lớp: [Lớp 1 / 2 / 3 / 4 / 5].
- Dạng bài tập cụ thể:
  * [Dạng 1: Ví dụ - Cộng trừ phân số cùng mẫu]
  * [Dạng 2: Ví dụ - Nhân số thập phân với 10, 100]
  * [Dạng 3: Ví dụ - Đổi đơn vị đo khối lượng]
- Tỉ lệ xuất hiện: 60% câu hỏi ĐÚNG (để người chơi hành động), 40% câu hỏi SAI (để người chơi né tránh).

Hãy viết toàn bộ mã nguồn vào 1 file HTML duy nhất (gồm HTML, CSS Tailwind, Canvas JS), giao diện hoạt hình màu sắc rực rỡ, sẵn sàng chạy ngay trên trình duyệt.
```

---

## 💡 MẸO NÂNG CAO KHI CHAT VỚI GEMINI CANVAS:
1. **Nếu muốn đổi màu sắc:** Chat với Gemini: *"Hãy đổi theme thẻ sang phong cách Cyberpunk neon phát sáng màu tím và vàng"*.
2. **Nếu muốn thêm bài tập:** Chat với Gemini: *"Hãy bổ sung thêm 10 bài toán về tìm x và tỉ số phần trăm vào ngân hàng câu hỏi"*.
3. **Nếu muốn tăng tốc độ:** Chat với Gemini: *"Hãy thêm thanh trượt Slider ở góc màn hình để điều chỉnh tốc độ rơi của thẻ"*.
