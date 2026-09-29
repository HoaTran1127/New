# 🟡 MiTi ✦ Học bằng chuyển động

> **Chọn game → lấy prompt → vào Gemini → chọn Canva → gán prompt → tạo game.**

MiTi là thư viện **prompt game giáo dục**. Người dùng không cần đọc repository; chỉ cần chọn trò chơi và lấy đúng prompt.

## 🎮 CHỌN GAME

### 👩‍🏫 Chọn theo lớp + môn

|  | 🔢 Toán | 🇬🇧 Tiếng Anh |
|---|---|---|
| **Lớp 4** | [🎮 40 game Toán 4 →](prompts/01-toan4/) | [🎮 15 game Tiếng Anh 4 →](prompts/03-english4/) |
| **Lớp 5** | [🎮 15 game Toán 5 →](prompts/02-toan5/) | [🎮 15 game Tiếng Anh 5 →](prompts/04-english5/) |

### 🕹️ Chọn theo cách chơi

**🥊 Đấm** · **🗡️ Chém** · **🎯 Phản xạ** · **🧩 Kéo-thả** · **🔗 Ghép đôi** · **📷 Camera / chuyển động**

> 🔎 **[🚀 MỞ DASHBOARD MiTi →](index.html)** để tìm theo tên game, mục tiêu học, lớp, môn hoặc kiểu tương tác.

## ⚡ TẠO GAME — QUY TRÌNH BẮT BUỘC

**① Chọn game**  
↓  
**② Mở prompt thật**  
↓  
**③ Copy toàn bộ prompt**  
↓  
**④ Vào Gemini**  
↓  
**⑤ Chọn plugin Canva**  
↓  
**⑥ Gán / đưa prompt MiTi vào Canva**  
↓  
**⑦ Tạo game HTML**

### 🎯 Game mẫu

**L4-01 — Đường Đua Hàng Số**

🎯 Mục tiêu: học kiến thức Toán lớp 4  
🕹️ Trải nghiệm: học qua tương tác/game  
📄 **[MỞ PROMPT THẬT →](prompts/01-toan4/L4-01-number-dash.md)**

> **Không tạo game bằng cách bỏ qua bước Canva. Prompt MiTi phải được đưa vào Canva trước khi tạo game.**

## 🚀 DASHBOARD = CỬA CHỌN GAME

**[🎮 CHỌN GAME →](index.html)**

Dashboard lấy dữ liệu từ **GAME_CATALOG.csv** và chỉ được hiển thị game có **prompt thật**.

Luồng chuẩn:

**GAME_CATALOG.csv → Game → Prompt thật → Gemini → Canva → Game HTML**

## 🟡 CHỮ KÝ MiTi TRONG GAME

Mỗi prompt độc lập phải yêu cầu game được tạo ra có nhận diện:

**M + MiTi + ✦**  
**MiTi • Học bằng chuyển động**

Chữ ký được yêu cầu ở **Bắt đầu / HUD / Kết quả**.

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

## 📚 BIẾN THỂ

**[Xem 325 biến thể →](prompts/VARIANTS_325.md)**

## 🧭 CHỈ CẦN NHỚ

**README** → vào thư viện  
**Dashboard** → chọn game  
**Prompt** → copy  
**Gemini** → mở Canva  
**Canva** → gán prompt + tạo game  
**HTML** → game hoàn chỉnh

> **Prompt là sản phẩm. Canva là bước tạo game. MiTi là chữ ký đi cùng prompt vào game.**

## 🔒 NGUYÊN TẮC DỮ LIỆU

**Catalogue → Prompt thật → Gemini + Canva → Game HTML**

Không:

- card cho game không có prompt;
- đường dẫn giả;
- dữ liệu riêng lệch khỏi catalogue.

**Mục tiêu: vào → chọn → lấy prompt → Gemini → Canva → tạo game.**
