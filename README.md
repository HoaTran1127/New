# 🥊 AR Math Kids — Nền Tảng Game Toán Thực Tế Ảo Cho Học Sinh Lớp 4 & 5

> **Trò chơi vận động tương tác thực tế ảo (Web AR) rèn luyện phản xạ tính nhẩm môn Toán cho học sinh Tiểu học, chạy trực tiếp trên trình duyệt Web qua Webcam, bảo mật 100% và hoàn toàn miễn phí.**

---

## 🌟 Tính Năng Nổi Bật

- **📷 Không cần cài đặt (100% Client-side):** Sử dụng **Google MediaPipe Hands** nhận diện cử chỉ tay theo thời gian thực (30-60 FPS) trực tiếp trên trình duyệt Chrome/Edge/Cốc Cốc.
- **🔒 Bảo mật tuyệt đối:** Hình ảnh webcam chỉ được xử lý cục bộ trên máy tính của người dùng, không truyền bất kỳ dữ liệu video nào lên máy chủ.
- **📚 Bám sát chương trình Toán Lớp 4 & 5:**
  - **Lớp 4:** Nhân nhẩm 11, nhân chia số tròn chục, rút gọn & cộng trừ phân số cùng mẫu, đổi đơn vị đo đại lượng (tấn, tạ, yến, m², dm²), dấu hiệu chia hết cho 2, 3, 5, 9.
  - **Lớp 5:** Tính nhẩm số thập phân ($0.25 \times 4$), phân số nâng cao, tỉ số phần trăm ($10\%, 20\%, 50\%$), bài toán chuyển động đều ($s = v \times t$), diện tích tam giác & chu vi hình tròn.
  - **Ôn tập:** Bảng cửu chương nhân chia 2 đến 9.
- **⚡ Hệ thống phản hồi thị giác & âm thanh:**
  - Vết kiếm neon và hiệu ứng nổ hạt rực rỡ khi đấm trúng thẻ **ĐÚNG**.
  - Kính vỡ toảng rạn nứt mạng nhện kèm giải thích chi tiết khi đấm nhầm thẻ **SAI**.
  - Âm thanh arcade chân thực được tạo bằng **Tone.js** (không cần tải file mp3 ngoài).
  - Có chế độ chuột & cảm ứng màn hình phòng khi học sinh không có webcam.
- **🧩 Khung sườn cắm/rút (Pluggable Architecture):** Dễ dàng thêm/bớt chủ đề toán học hoặc tự viết thêm mini-game mới chỉ với vài dòng code!

---

## 🎮 Danh Sách Các Trò Chơi Trong Repo

| Trò Chơi | Đường Dẫn | Cơ Chế Chơi |
| :--- | :--- | :--- |
| **Subway Math Blitz AR** ⭐ | [`games/math-blitz/index.html`](games/math-blitz/index.html) | Đứng cách camera 1.5m - 2m, vung 1 bàn tay như đấm bốc chém vỡ thẻ phép tính **ĐÚNG**, né thẻ **SAI**. |
| **AR Math Catcher** 🍏 | [`games/math-catcher/index.html`](games/math-catcher/index.html) | Di chuyển bàn tay làm chiếc giỏ để hứng các quả táo mang phép tính **ĐÚNG** rơi xuống. |

---

## 📁 Cấu Trúc Dự Án (Repository Structure)

```text
├── index.html                   # Cổng Portal chọn game & xem thông tin
├── README.md                    # Tài liệu hướng dẫn chính
├── src/
│   ├── core/                    # Engine tái sử dụng chung cho mọi game
│   │   ├── HandTracker.js       # Nhận diện tay bằng MediaPipe, khử rung EMA
│   │   ├── AudioManager.js      # Tạo hiệu ứng âm thanh bằng Tone.js
│   │   └── ParticleSystem.js    # Hạt nổ, vết kiếm neon, sóng chấn động, kính vỡ
│   └── data/                    # Ngân hàng câu hỏi Toán học (DỄ DÀNG THÊM BỚT)
│       ├── index.js             # TopicRegistry quản lý tập trung
│       ├── topics-cuuchuong.js  # Bảng nhân chia 2 -> 9
│       ├── topics-lop4.js       # Kho bài tập Toán Lớp 4
│       └── topics-lop5.js       # Kho bài tập Toán Lớp 5
├── games/
│   ├── math-blitz/              # Game 1: Subway Math Blitz
│   └── math-catcher/            # Game 2: AR Math Catcher
└── docs/                        # SERIES HƯỚNG DẪN TỪ A-Z (7 BÀI HỌC)
    ├── README.md                # Lộ trình học
    ├── bai-01-tong-quan-va-khoi-tao.md
    ├── bai-02-camera-va-mediapipe-hand-tracking.md
    ├── bai-03-game-loop-va-hieu-ung-canvas.md
    ├── bai-04-thiet-ke-kho-toan-lop-4-5-va-sinh-de.md
    ├── bai-05-am-thanh-arcade-voi-tonejs.md
    ├── bai-06-trien-khai-github-pages-va-chia-se.md
    └── bai-07-huong-dan-tu-tao-mini-game-moi.md
```

---

## 🛠️ Cách Thêm Dạng Toán Mới Của Bạn

Để thêm một dạng toán mới (ví dụ: *Toán Lớp 3* hoặc *Tiếng Anh*), bạn chỉ cần mở file `src/data/topics-lop4.js` (hoặc tạo file mới) và viết theo mẫu:

```javascript
TopicRegistry.registerTopic({
  id: 'chu_de_moi',
  grade: 4,
  title: 'Tên Dạng Toán Của Bạn',
  badge: 'MỚI',
  badgeColor: '#10B981',
  description: 'Mô tả ngắn gọn về dạng toán',
  generate() {
    return {
      isCorrect: true,             // Thẻ này ĐÚNG hay SAI
      leftPart: '45 + 55',         // Vế trái
      rightPart: '= 100',          // Vế phải
      text: '45 + 55 = 100',       // Hiển thị đầy đủ
      explanation: '45 + 55 = 100' // Giải thích khi đấm nhầm
    };
  }
});
```
Menu chọn bài trong game sẽ **tự động cập nhật** mà không cần sửa giao diện!

---

## 🚀 Triển Khai Lên GitHub Pages Trong 2 Phút

1. Đẩy mã nguồn dự án lên kho lưu trữ GitHub của bạn:
   ```bash
   git add .
   git commit -m "feat: Ra mắt game toán AR lớp 4 và 5"
   git push origin main
   ```
2. Trên GitHub, vào **Settings** $\rightarrow$ **Pages**.
3. Tại **Build and deployment**, chọn Branch: `main` và thư mục `/ (root)`, sau đó bấm **Save**.
4. Đường link game của bạn sẽ sẵn sàng tại: `https://<ten-user>.github.io/<ten-repo>/`.

---

## 📖 Series Giáo Trình Hướng Dẫn Coding

Nếu bạn muốn tìm hiểu chi tiết cách từng dòng code hoạt động để tự chế tạo game của riêng mình hoặc hướng dẫn học sinh trong CLB STEM, hãy đọc trọn bộ **7 bài học** trong thư mục [`docs/`](docs/README.md).

---

❤️ *Dự án được xây dựng với mục tiêu mang lại niềm vui học tập và vận động cho học sinh tiểu học.*
