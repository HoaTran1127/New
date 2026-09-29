# 🟡 MiTi ✦ Học bằng chuyển động

> **Chọn game → lấy prompt → dán vào Gemini → tạo game.**

**Đây là thư viện để chọn trò chơi và lấy prompt thật — không phải README để đọc dài.**

## 🎮 CHỌN GAME NGAY

### 👩‍🏫 Chọn theo lớp + môn

|  | 🔢 Toán | 🇬🇧 Tiếng Anh |
|---|---|---|
| **Lớp 4** | [🎮 40 game Toán 4 →](prompts/01-toan4/) | [🎮 15 game Tiếng Anh 4 →](prompts/03-english4/) |
| **Lớp 5** | [🎮 15 game Toán 5 →](prompts/02-toan5/) | [🎮 15 game Tiếng Anh 5 →](prompts/04-english5/) |

### 🕹️ Chọn theo cách chơi

**🥊 Đấm** · **🗡️ Chém** · **🎯 Phản xạ** · **🧩 Kéo-thả** · **🔗 Ghép đôi** · **📷 Camera / chuyển động**

> 🔎 Muốn tìm theo **tên game, mục tiêu học, lớp, môn hoặc kiểu tương tác**?  
> **[🚀 MỞ DASHBOARD MiTi →](index.html)**

## ⚡ CÁCH LẤY PROMPT

**① Chọn game** → **② Mở prompt** → **③ Copy toàn bộ** → **④ Dán vào Gemini**

Không cần tự viết prompt. Không cần đọc các thư mục kỹ thuật.

### 🎯 Một game mẫu

**L4-01 — Đường Đua Hàng Số**

🎯 Mục tiêu: học kiến thức Toán lớp 4  
🕹️ Trải nghiệm: học qua tương tác/game  
📄 **[MỞ PROMPT THẬT →](prompts/01-toan4/L4-01-number-dash.md)**

## 🚀 DASHBOARD = CỬA VÀO CHÍNH

**[🎮 CHỌN GAME TRONG DASHBOARD →](index.html)**

Dashboard phải lấy dữ liệu từ **GAME_CATALOG.csv** và chỉ hiển thị các game có **prompt thật**.

Luồng dữ liệu:

**GAME_CATALOG.csv → Game → Prompt thật → Copy → Gemini → Game HTML**

## 🟡 MiTi ĐI CÙNG GAME

Mỗi prompt độc lập phải yêu cầu game được Gemini tạo ra có:

**M + MiTi + ✦**  
**MiTi • Học bằng chuyển động**

Chữ ký xuất hiện ở:

**Bắt đầu → HUD → Kết quả**

Game không được phụ thuộc asset bên ngoài repository.

👉 **[BRAND CONTRACT →](prompts/BRAND_MITI.md)**

## 🇻🇳 NGUYÊN TẮC NỘI DUNG

Giao diện game ưu tiên **tiếng Việt**:

- tiêu đề
- nút
- hướng dẫn
- phản hồi
- nhiệm vụ

Với môn Tiếng Anh, tiếng Anh tập trung ở phần **kiến thức đang học**; UI không dùng tiếng Anh một cách không cần thiết.

## ✨ THƯ VIỆN

| Bộ game | Số lượng |
|---|---:|
| 🔢 Toán 4 | 40 |
| 🔢 Toán 5 | 15 |
| 🇬🇧 Tiếng Anh 4 | 15 |
| 🇬🇧 Tiếng Anh 5 | 15 |
| **🎮 Tổng** | **85** |

**[📚 Xem 325 biến thể →](prompts/VARIANTS_325.md)**

## 🧭 CHỈ CẦN NHỚ

**README** → dẫn đường  
**Dashboard** → chọn game  
**Prompt** → copy  
**Gemini** → tạo game  
**MiTi ✦** → chữ ký đi cùng game

> **Prompt là sản phẩm. Game HTML được Gemini sinh ra. MiTi là chữ ký đi cùng prompt vào game.**

## 🔒 KHÔNG CÓ “GAME MA”

**Catalogue → Prompt thật → Game**

Không:

- card cho game không có prompt;
- đường dẫn giả;
- dữ liệu riêng lệch khỏi catalogue.

**Mục tiêu của MiTi rất đơn giản: vào → chọn → lấy prompt → tạo game → học.**
