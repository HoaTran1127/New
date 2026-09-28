# Prompt Gemini Canvas: Game AR Toán 5 - Thần Săn Giảm Giá (Tỉ Số Phần Trăm & Mua Sắm Siêu Thị)

> **Môn học:** Toán Lớp 5 (SGK Cánh Diều / Kết Nối Tri Thức / Chân Trời Sáng Tạo)  
> **Chủ đề bài học:** Tỉ số phần trăm (%), Tìm giá trị phần trăm của một số, Bài toán thực tế giảm giá / chiết khấu  
> **Khái niệm hình dung:** Thước đo 100% trực quan (Percentage Bar Gauge) chia tỷ lệ tương ứng giá tiền  
> **Cử chỉ AR:** 2 tay kéo thanh trượt phần trăm + Chém kiếm Neon (Slash) vào mức giá thực trả sau giảm giá

---

## 📋 NỘI DUNG PROMPT (DÁN TRỰC TIẾP VÀO GEMINI CANVAS)

```text
Hãy tạo một game Web AR học tập hoàn chỉnh, tương tác vận động thể chất bằng camera trong 1 FILE HTML DUY NHẤT dành cho học sinh Lớp 5 học chuyên đề "Tỉ Số Phần Trăm và Bài Toán Thực Tế Mua Sắm Siêu Thị".

Yêu cầu kỹ thuật cốt lõi:
1. Thư viện qua CDN:
   - Tailwind CSS (https://cdn.tailwindcss.com)
   - FontAwesome 6 (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)
   - MediaPipe Camera Utils (https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js)
   - MediaPipe Hands (https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js)
   - Tone.js (https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js)
2. Luôn lật ngang video webcam (transform: -scale-x-100) để tạo cảm giác soi gương AR.
3. Hỗ trợ dự phòng chuột/cảm ứng nếu học sinh không bật camera.

Cơ chế trực quan hóa tỉ số phần trăm:
1. Mỗi màn chơi là một quầy hàng siêu thị sinh động:
   - Món hàng: Balo phi hành gia giá gốc: 200.000 đồng.
   - Thẻ treo Sale: GIẢM GIÁ 20%!
2. Thanh năng lượng trực quan hóa (Percentage Gauge):
   - Toàn bộ thanh là 100% ứng với 200.000đ (mỗi 10% = 20.000đ).
   - Phần giảm giá: 20% sáng màu đỏ rực (2 vạch = 20.000 x 2 = 40.000đ).
   - Phần thực tế phải trả: 80% sáng màu xanh ngọc (8 vạch = 200.000 - 40.000 = 160.000đ).
3. Giúp học sinh thấy rõ mối quan hệ giữa 100%, số % được giảm và số % phải trả một cách trực giác chứ không phải áp dụng công thức mù quáng.

Cơ chế vận động thể chất AR:
1. Bàn tay của học sinh phát ra vệt kiếm Neon phát sáng màu hồng tím (Cyber Slash).
2. Câu hỏi hiển thị lên màn hình kèm giọng đọc sinh động:
   - "Balo giảm giá 20%, vậy số tiền được giảm là bao nhiêu?"
   - Ba bong bóng giá tiền bay lên: [40.000 đồng], [20.000 đồng], [10.000 đồng].
   - Học sinh vung tay chém đứt bong bóng đúng: [40.000 đồng].
3. Câu hỏi kế tiếp:
   - "Vậy khách hàng phải trả bao nhiêu tiền để mua balo?"
   - Ba thẻ bài rơi xuống: [160.000 đồng], [180.000 đồng], [240.000 đồng].
   - Học sinh dùng hai tay chụm lại hứng hoặc vung tay chém chuẩn xác thẻ bài [160.000 đồng].
4. Nếu chém nhầm: Màn hình nứt kính (Cracked glass effect), âm thanh tít tít máy tính tiền báo lỗi và popover nhắc nhở hiện ra: "Số tiền giảm = 200.000 x 20 : 100 = 40.000đ. Số tiền phải trả = 200.000 - 40.000 = 160.000đ bạn nhé!".

Giao diện & Trải nghiệm:
- Bối cảnh siêu thị tương lai vui nhộn, âm thanh ting-ting khi thanh toán thành công.
- Xe đẩy hàng AR chứa các món đồ học sinh đã giải đúng.
- Chế độ combo điểm thưởng khi tính nhẩm siêu tốc.
```
