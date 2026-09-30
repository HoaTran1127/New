# Bộ giáo án bảng phấn — công cụ giảng bài cho giáo viên

> 39 giáo án Toán lớp 4–5, mỗi bài một file prompt độc lập dán vào **Google Gemini (bật chế độ Canvas)**.
> Sinh tự động bằng `node tools/build-lessons.mjs` — **không sửa tay** các file trong thư mục này.

## Đây là gì, và khác gì với 85 prompt game

| | Bộ giáo án này | 85 prompt game |
| --- | --- | --- |
| Ai dùng | **Giáo viên** trình bày, cả lớp xem màn chiếu | **Học sinh** tự chơi, một máy một em hoặc hai em |
| Nhịp | Chờ giáo viên bấm "Bước tiếp", không tự chuyển | 12 lượt, tăng độ khó ở lượt 5 và lượt 9 |
| Đầu ra | Bảng phấn trên màn chiếu **và** phiếu bài tập + trang đáp án in được | Chỉ là màn chơi trong trình duyệt |
| Động cơ | Không tim, không điểm, không combo, không xếp hạng | Có tim, điểm, chuỗi combo, thẻ vàng x2, mascot |
| Bảng phấn | Chiếm >= 70% màn chiếu, không bao giờ tự lau | Bảng chữ L <= 40% khung hình, tự lau sau mỗi lượt |
| Nguồn quy định | `tools/lib/chalk.mjs` + `tools/lib/lesson.mjs` + `tools/lib/handout.mjs` | `tools/lib/feel.mjs` + `tools/lib/classroom.mjs` |

Bảng phấn và vật thật (`tools/lib/chalk.mjs`, `tools/data/props.mjs`) là của riêng bộ giáo án — 85 prompt
game không mang một dòng nào trong đó, và ngược lại. Hai bộ đi từ cùng một cụm kiến thức nên cùng một bài
được dạy bằng cái pizza rồi luyện bằng chính cái pizza đó.

## Cách dùng

0. Tìm nhanh theo lớp: mở **Dashboard MiTi** → tab **"Giáo án giảng bài"** (39 card), bấm "Sao chép giáo án" là lấy trọn khối prompt.
1. Mở file giáo án cần dạy, copy nguyên khối ```text```.
2. Dán vào Google Gemini đã bật chế độ Canvas, gửi.
3. Gemini sinh ra MỘT file HTML độc lập. Mở file đó bằng trình duyệt, cắm máy chiếu.
4. Không có camera vẫn dạy được trọn vẹn: chuột và bàn phím thay mọi thao tác tay.

## Mỗi giáo án gồm năm bước

Cấu trúc này giống nhau ở cả 39 bài để giáo viên thuộc được mạch:
**Khởi động** (2–3 phút, hỏi gắn với vật thật, chưa viết gì) → **Vật thật** (4–5 phút, thao tác tay)
→ **Sơ đồ** (3–4 phút, học sinh tự dựng biểu diễn bán cụ thể) → **Phép tính** (3–4 phút, mỗi con số
nối ngược về sơ đồ) → **Luyện tập chung** (3–4 phút, cả lớp biểu quyết bằng ngón tay). Tổng 15–20 phút.

## Toán lớp 4 (29 giáo án)

| Mã | Bài giảng | Cụm kiến thức | Game cùng cụm |
| --- | --- | --- | --- |
| `GA4-01` | [Giá trị theo hàng: cùng một chữ số, đáng giá bao nhiêu](GA4-01-hang-so.md) | `hang-so` | L4-01, L4-36 |
| `GA4-02` | [So sánh và sắp xếp số có nhiều chữ số](GA4-02-so-sanh-sap-xep.md) | `so-sanh-sap-xep` | L4-02 |
| `GA4-03` | [Làm tròn số bằng tia số](GA4-03-lam-tron.md) | `lam-tron` | L4-03 |
| `GA4-04` | [Số chẵn số lẻ nhìn ở chữ số tận cùng](GA4-04-chan-le.md) | `chan-le` | L4-04 |
| `GA4-05` | [Tấn, tạ, ki-lô-gam, gam và cân hai đĩa](GA4-05-khoi-luong.md) | `khoi-luong` | L4-05 |
| `GA4-06` | [Diện tích là số ô vuông phủ kín hình](GA4-06-dien-tich-don-vi.md) | `dien-tich-don-vi` | L4-06 |
| `GA4-07` | [Đọc giờ, phút và khoảng thời gian](GA4-07-thoi-gian.md) | `thoi-gian` | L4-07 |
| `GA4-08` | [Đo góc bằng thước nửa tròn](GA4-08-goc.md) | `goc` | L4-08, L4-38 |
| `GA4-09` | [Hai đường vuông góc và hai đường song song](GA4-09-vuong-goc-song-song.md) | `vuong-goc-song-song` | L4-09 |
| `GA4-10` | [Cộng trừ có nhớ và có mượn, nhìn bằng bó que](GA4-10-cong-tru.md) | `cong-tru` | L4-10 |
| `GA4-11` | [Phép nhân là cộng lặp lại, nhìn bằng mảng chấm](GA4-11-nhan.md) | `nhan` | L4-11 |
| `GA4-12` | [Chia đều và số dư](GA4-12-chia.md) | `chia` | L4-12 |
| `GA4-13` | [Hai vế của biểu thức như hai đĩa cân](GA4-13-tat-ca.md) | `tat-ca` | L4-13 |
| `GA4-14` | [Bài toán nhiều bước và sơ đồ đoạn thẳng](GA4-14-bai-toan-nhieu-buoc.md) | `bai-toan-nhieu-buoc` | L4-14 |
| `GA4-15` | [Đọc bảng số liệu không nhầm hàng, không nhầm cột](GA4-15-bang-so-lieu.md) | `bang-so-lieu` | L4-15, L4-34 |
| `GA4-16` | [Biểu đồ cột và đường dóng sang trục giá trị](GA4-16-bieu-do-cot.md) | `bieu-do-cot` | L4-16, L4-39 |
| `GA4-17` | [Biểu đồ tranh: một hình bằng mấy đơn vị](GA4-17-bieu-do-tranh.md) | `bieu-do-tranh` | L4-17 |
| `GA4-18` | [Chắc chắn, có thể, không thể](GA4-18-xac-suat.md) | `xac-suat` | L4-18 |
| `GA4-19` | [Phân số là mấy phần của một cái được chia đều](GA4-19-phan-so-dau.md) | `phan-so-dau` | L4-19 |
| `GA4-20` | [Hai phân số bằng nhau và rút gọn phân số](GA4-20-phan-so-bang-nhau.md) | `phan-so-bang-nhau` | L4-20, L4-21, L4-23 |
| `GA4-21` | [Quy đồng mẫu số để so sánh hai phân số](GA4-21-quy-dong-mau.md) | `quy-dong-mau` | L4-22 |
| `GA4-22` | [Cộng trừ phân số cùng mẫu trên trục](GA4-22-cong-tru-phan-so.md) | `cong-tru-phan-so` | L4-24, L4-25, L4-33 |
| `GA4-23` | [Tìm phân số của một số](GA4-23-phan-so-cua-mot-so.md) | `phan-so-cua-mot-so` | L4-26, L4-37 |
| `GA4-24` | [Tìm hai số khi biết tổng hoặc hiệu và tỉ số](GA4-24-ti-so-tong-hieu.md) | `ti-so-tong-hieu` | L4-27 |
| `GA4-25` | [Tỉ lệ bản đồ và độ dài thật](GA4-25-ti-le-ban-do.md) | `ti-le-ban-do` | L4-28 |
| `GA4-26` | [Diện tích hình bình hành bằng cách cắt và ghép](GA4-26-hinh-binh-hanh.md) | `hinh-binh-hanh` | L4-29 |
| `GA4-27` | [Diện tích hình thoi bằng hai đường chéo](GA4-27-hinh-thoi.md) | `hinh-thoi` | L4-30 |
| `GA4-28` | [Ôn tập cuối lớp 4 trên bốn trạm vật thật](GA4-28-on-tap-toan-4.md) | `on-tap-toan-4` | L4-31, L4-32, L4-35 |
| `GA4-29` | [Tổng hợp chương: chọn đúng công thức trước khi tính](GA4-29-boss-cong-thu.md) | `boss-cong-thu` | L4-40 |

## Toán lớp 5 (10 giáo án)

| Mã | Bài giảng | Cụm kiến thức | Game cùng cụm |
| --- | --- | --- | --- |
| `GA5-01` | [Cộng trừ có nhớ và có mượn, nhìn bằng bó que](GA5-01-cong-tru.md) | `cong-tru` | T5-01 |
| `GA5-02` | [Số thập phân sinh ra từ lưới 100 ô](GA5-02-thap-phan-khai-niem.md) | `thap-phan-khai-niem` | T5-02, T5-11 |
| `GA5-03` | [Ba dạng viết của cùng một giá trị](GA5-03-chuyen-dong-f-d-p.md) | `chuyen-dong-f-d-p` | T5-03 |
| `GA5-04` | [Tỉ số phần trăm và bài toán giảm giá](GA5-04-phan-tram.md) | `phan-tram` | T5-04, T5-12 |
| `GA5-05` | [Thể tích là số khối lập phương xếp đầy hình](GA5-05-the-tich.md) | `the-tich` | T5-05, T5-13 |
| `GA5-06` | [Gấp và giảm khẩu phần theo tỉ số nguyên liệu](GA5-06-ti-so-dau-bep.md) | `ti-so-dau-bep` | T5-06 |
| `GA5-07` | [Quãng đường, vận tốc, thời gian và hai xe ngược chiều](GA5-07-chuyen-dong-de.md) | `chuyen-dong-de` | T5-07, T5-14 |
| `GA5-08` | [Chu vi, diện tích, thể tích: chọn đúng công thức](GA5-08-hinh-hoc-on-tap.md) | `hinh-hoc-on-tap` | T5-08 |
| `GA5-09` | [So sánh số thập phân theo cột dấu phẩy](GA5-09-thap-phan-can-bang.md) | `thap-phan-can-bang` | T5-09 |
| `GA5-10` | [Ôn tập cuối lớp 5: chọn chiến lược trước khi tính](GA5-10-on-tap-toan-5.md) | `on-tap-toan-5` | T5-10, T5-15 |

## Muốn thêm hoặc sửa giáo án

- Thêm cụm kiến thức mới: sửa `tools/data/clusters.mjs`, `tools/data/props.mjs` (đủ 5 trường) và `tools/data/lessons.mjs` (đủ 3 trường), rồi chạy `node tools/build.mjs`.
- Đổi quy định bảng phấn: `tools/lib/chalk.mjs` (10 quy định).
- Đổi quy định từ bảng ra vở: `tools/lib/handout.mjs` (3 quy định).
- Đổi quy định chế độ giảng bài: `tools/lib/lesson.mjs` (38 quy định).
- `node tools/validate.mjs` sẽ chặn nếu thiếu quy định nào, nếu vật thật thiếu trường, hoặc nếu cơ chế game lọt vào giáo án.
