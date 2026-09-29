# 🟡 MiTi ✦ Học bằng chuyển động

> **Chọn một game → mở prompt → copy → dán vào Gemini → tạo game.**

MiTi là thư viện **prompt game giáo dục cho học sinh Việt Nam**.
Bạn **không cần đọc toàn bộ repository** để bắt đầu.

---

## 🚀 LẤY PROMPT NGAY

### Bước 1 — Chọn lớp và môn

| | Toán | Tiếng Anh |
|---|---|---|
| **Lớp 4** | [🎮 40 game Toán 4](prompts/01-toan4/) | [🎮 15 game Tiếng Anh 4](prompts/03-english4/) |
| **Lớp 5** | [🎮 15 game Toán 5](prompts/02-toan5/) | [🎮 15 game Tiếng Anh 5](prompts/04-english5/) |

Hoặc mở **[📚 Dashboard MiTi](index.html)** để tìm kiếm và lọc game.

### Bước 2 — Chọn game

Mỗi game có một **file prompt thật**.

Prompt cho biết:
- 🎯 Học sinh cần học gì
- 🕹️ Học sinh phải làm gì
- 📷 Game tương tác bằng cách nào
- 💬 Feedback ra sao
- ✦ Cách MiTi xuất hiện trong game

### Bước 3 — Mở prompt

Chọn file `.md` của game.

Ví dụ: **[L4-01 — Đường Đua Hàng Số](prompts/01-toan4/L4-01-number-dash.md)**

### Bước 4 — Copy toàn bộ prompt

**Copy nguyên prompt, không cắt bớt.**

### Bước 5 — Dán vào Gemini

Dán prompt vào Gemini Canvas và yêu cầu Gemini tạo game.

### Bước 6 — Nhận game

**Prompt MiTi → Gemini → 1 file HTML → Game giáo dục hoàn chỉnh**

Game được tạo phải giữ chữ ký:

> **MiTi ✦**  
> **MiTi • Học bằng chuyển động**

---

## ⚡ Nếu chỉ muốn nhớ một thứ

```text
DASHBOARD
   ↓
CHỌN LỚP + MÔN
   ↓
CHỌN GAME
   ↓
MỞ PROMPT
   ↓
COPY TOÀN BỘ
   ↓
DÁN VÀO GEMINI
   ↓
TẠO GAME HTML
   ↓
MiTi ✦
```

**Không cần đọc `docs/`, `research/`, `src/` hay các file kỹ thuật để lấy prompt.**

---

## 🎮 85 GAME CÓ PROMPT THẬT

| Bộ | Số game |
|---|---:|
| Toán lớp 4 | 40 |
| Toán lớp 5 | 15 |
| Tiếng Anh lớp 4 | 15 |
| Tiếng Anh lớp 5 | 15 |
| **Tổng** | **85** |

**Catalogue chuẩn:** [GAME_CATALOG.csv](catalogs/GAME_CATALOG.csv)

Catalogue là nơi kiểm tra: **game nào tồn tại → prompt nằm ở đâu → mục tiêu → nhiệm vụ → kiểu tương tác.**

> **Không có file prompt thật → không được coi là game trong thư viện.**

---

## ✨ 325 BIẾN THỂ

Bộ biến thể dùng để tạo nhiều cách chơi khác nhau từ các game gốc.

👉 **[Xem 325 biến thể](prompts/VARIANTS_325.md)**

---

## 🇻🇳 CHUẨN NỘI DUNG

Mỗi prompt phải yêu cầu:
- Tiêu đề, nút, hướng dẫn và feedback bằng **tiếng Việt**.
- Mục tiêu và nhiệm vụ phù hợp **học sinh Việt Nam**.
- Với môn Tiếng Anh, **chỉ phần kiến thức cần học mới dùng tiếng Anh**.
- Không dùng tiếng Anh cho UI nếu không cần thiết.

---

## 🟡 CHỮ KÝ MiTi

MiTi không chỉ là logo của repository.

**MiTi phải đi cùng game được Gemini tạo ra.**

Mỗi prompt độc lập phải yêu cầu:
- Nhúng trực tiếp nhận diện MiTi vào HTML.
- Biểu tượng **M + MiTi + ✦**.
- Xuất hiện ở **Bắt đầu / HUD / Kết quả**.
- Hiển thị **MiTi • Học bằng chuyển động**.
- Không phụ thuộc asset bên ngoài repository.

👉 **[Brand Contract — BRAND_MITI.md](prompts/BRAND_MITI.md)**

---

## 🧭 Chỉ cần biết 4 nơi

| Nơi | Dùng để làm gì? |
|---|---|
| **[Dashboard](index.html)** | ⭐ Điểm bắt đầu |
| **[GAME_CATALOG.csv](catalogs/GAME_CATALOG.csv)** | 🔎 Tìm game và prompt |
| **[prompts/](prompts/)** | 📄 Lấy prompt |
| **[BRAND_MITI.md](prompts/BRAND_MITI.md)** | ✦ Chuẩn chữ ký MiTi |

Các thư mục kỹ thuật, nghiên cứu và thử nghiệm **không nằm trong luồng lấy prompt**.

---

## 🔒 Nguyên tắc dữ liệu

**Catalogue → Prompt thật → Game**

Không được:
- tạo card cho game không có prompt;
- trỏ catalogue tới file không tồn tại;
- dùng đường dẫn giả;
- tạo dữ liệu riêng trong dashboard khác với catalogue.

> **Prompt là sản phẩm. Game HTML được Gemini sinh ra. MiTi là chữ ký đi cùng prompt vào game.**