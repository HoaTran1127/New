# Bộ giáo án bảng phấn — công cụ giảng bài cho giáo viên

> 39 giáo án Toán lớp 4–5, mỗi bài một file prompt độc lập dán vào **Google Gemini (bật chế độ Canvas)**.
> Sinh tự động bằng `node tools/build-lessons.mjs` — **không sửa tay** các file trong thư mục này.

## Đây là gì, và khác gì với 85 prompt game

| | Bộ giáo án này | 85 prompt game |
| --- | --- | --- |
| Ai dùng | **Giáo viên** trình bày, cả lớp xem màn chiếu | **Học sinh** tự chơi, một máy một em hoặc hai em |
| Nhịp | Chờ giáo viên bấm "Bước tiếp", không tự chuyển | 12 lượt, tăng độ khó ở lượt 5 và lượt 9 |
| Động cơ | Không tim, không điểm, không combo, không xếp hạng | Có tim, điểm, chuỗi combo, thẻ vàng x2, mascot |
| Bảng phấn | Chiếm >= 70% màn chiếu, chữ phấn >= 50 px tính theo khoảng cách em cuối lớp, không bao giờ tự lau | Bảng chữ L <= 40% khung hình, chữ 34 px, tự lau sau mỗi lượt |
| Kiểm đề | `verifyQuestionBank()` chạy một lần trước Bước 5 | `verifyQuestionBank()` chạy trước vòng chơi đầu tiên |
| Camera | Panel soi tay >= 24% ở cột biên, bảng >= 70%; có bộ xương 21 khớp + trạng thái + độ trễ ms cho cả lớp nhìn; có phép biến đổi tay→mặt bảng | Video phủ kín khung hình vì khung hình CHÍNH LÀ màn chơi; vật thể bay, spawn, va chạm, speed lines |
| Nguồn quy định | `tools/lib/chalk.mjs` + `tools/lib/lesson.mjs` + `tools/lib/verify.mjs` + `AR_LESSON` trong `tools/lib/ar.mjs` | `tools/lib/feel.mjs` + `tools/lib/classroom.mjs` + `AR_RENDER` trong `tools/lib/ar.mjs` |

Hai bộ dùng chung một nguồn vật thật (`tools/data/props.mjs`) nên cùng một cụm kiến thức thì vật vẽ phấn
giống hệt nhau — học sinh gặp lại đúng cái pizza đó khi chuyển từ tiết giảng sang giờ luyện tập.

## Quy định hình học chỉ in vào bài có hình học

Mục 4 của giáo án có 11 quy định luôn đúng với mọi bài, cộng tối đa hai quy định nối theo cụm:

| Quy định | In vào bài | Vì sao không in đại trà |
| --- | --- | --- |
| `CHALK.solid3d` — cạnh khuất nét đứt, kéo ngang xoay khối, nút mở hộp trải lưới khai triển, xếp lớp đếm từng tầng | `the-tich` · `hinh-hoc-on-tap` | bài phân số hay chia số không có khối nào để xoay |
| `CHALK.bodyTool` — vai 11/12 làm đỉnh góc, hai khuỷu 13/14 làm hai tia, ê-ke và thước phủ lên ảnh để chốt lại | `goc` · `vuong-goc-song-song` · `hinh-binh-hanh` · `hinh-thoi` · `hinh-hoc-on-tap` | bắt học sinh đứng tạo góc vuông trong bài đo đại lượng là phản tác dụng |

`node tools/validate.mjs` kiểm cả hai chiều: bài thuộc danh sách mà thiếu thì báo "thiếu quy định",
bài không thuộc danh sách mà vẫn mang theo thì báo "lọt vào bài không có hình học", và tiêu đề mục 4
phải ghi đúng số quy định của chính bài đó.

## Cách dùng

1. Mở file giáo án cần dạy, copy nguyên khối ```text```.
2. Dán vào Google Gemini đã bật chế độ Canvas, gửi.
3. Gemini sinh ra MỘT file HTML độc lập. Mở file đó bằng trình duyệt, cắm máy chiếu.
4. Không có camera vẫn dạy được trọn vẹn: chuột và bàn phím thay mọi thao tác tay.

## Mỗi giáo án gồm năm bước

Cấu trúc này giống nhau ở cả 39 bài để giáo viên thuộc được mạch:
**Khởi động** (2–3 phút, hỏi gắn với vật thật, chưa viết gì) → **Vật thật** (4–5 phút, thao tác tay)
→ **Sơ đồ** (3–4 phút, học sinh tự dựng biểu diễn bán cụ thể) → **Phép tính** (3–4 phút, mỗi con số
nối ngược về sơ đồ) → **Luyện tập chung** (3–4 phút, cả lớp biểu quyết theo nhãn A–D).
Năm bước chiếm 15–20 phút đầu của **tiết 35 phút**; thời gian còn lại là luyện tập và chốt bài,
và thanh tiến trình trên màn chiếu luôn hiện cả "phút của bước" lẫn "phút còn lại của tiết".

Cuối tiết, bảng rút ra **bảng chẩn đoán cho riêng giáo viên**: số em mắc từng lỗi (theo `errorTag`)
và mỗi lỗi có một nút nhảy về đúng chặng CRA đã sinh ra lỗi đó. Không nêu tên, không xếp hạng,
không ghi sang hồ sơ đọc lại được sau tiết.

## Ba mức hỗ trợ của một tiết (trục thứ hai, đi cùng năm bước)

Năm bước là trục **kiến thức** (CRA). Trục còn lại là **lượng giàn giáo**, theo khung Gradual Release
of Responsibility — modelling → guided practice → independent practice
([NSW Education](https://education.nsw.gov.au/teaching-and-learning/curriculum/explicit-teaching/explicit-teaching-strategies/gradual-release-of-responsibility), kiểm chứng 2026-09-30):

| `ho_tro` | Bảng làm gì | Ai chạm vào bảng |
| --- | --- | --- |
| `cô làm mẫu` | bảng tự thao tác chậm, mỗi động tác kèm một dòng **nói to suy nghĩ** của cô; sơ đồ hiện sẵn một phần | chỉ giáo viên |
| `cả lớp làm cùng cô` | bảng **dừng ở từng bước** hỏi "tiếp theo làm gì?" rồi mới thi hành; sơ đồ hiện khung mờ đúng số phần còn thiếu | cả lớp biểu quyết, một em lên bảng |
| `em tự làm` | không sơ đồ dẫn, không gợi ý giữa bước; lời giải chỉ hiện **sau khi** lớp đã trả lời | em lên bảng |

6 mục bắt buộc chia **đúng 2-2-2**, và cổng ready đếm được: chỉ rời một mức khi >= 2/3 số em camera
thấy trả lời đúng, dưới 1/2 thì phải **thêm một mục ở chính mức đó**, quá 20 giây không ai trả lời thì
bấm "Làm mẫu lại" để **tăng** hỗ trợ trở lại. Lý do có mục này: bản trước đó của chính prompt này bắt
6 mục "cùng độ khó" (39/39 file) và không file nào nói tới làm mẫu (0/39) — tức là thả lớp rơi thẳng
từ chỗ cô cầm tay sang chỗ tự làm, đúng cái lỗi mà khung GRR cảnh báo.

## Hai kênh từ vựng game lọt vào giáo án, và cách chặn

`clusters.mjs`, `props.mjs`, `error-notes.mjs` là ba nguồn **dùng chung** với 85 prompt game, nên một
cụm sinh ra cho game sẽ mang theo tiếng của game. Vòng 5 đo được hai kênh và sửa cả hai ở tầng dữ liệu:

- **Lời mô tả** — 2/38 cụm Toán nói bằng ngôn ngữ trò chơi: `boss-cong-thu` ("trận boss", "thẻ gợi ý",
  "gợi ý miễn phí") và `on-tap-toan-4` ("mỗi cửa ải viết một dòng phấn"). Cách sửa là khối `giao_an`
  trong `tools/data/lessons.mjs`: ghi đè bẩy trường lời (`muc_tieu`, `giai_thich`, `vat`, `don_vi`,
  `ngon_tay`, `so_do`, `doc`) và mảng `loi_viet`, chỉ đổi cách nói chứ không đổi kiến thức. Builder và
  validator cùng đi qua `notesCuaGiaoAn()` nên không thể lệch nhau. `LESSON_BAN_WORDS` quét từng file
  `GA*.md` và báo đúng tên cụm cần thêm override.
- **Nhãn lỗi** — 23/114 câu mẫu (thuộc 14/38 cụm Toán) mang `errorTag` **ngoài** ba nhãn của cụm, nên
  khuôn cũ `notes[tags.indexOf(tag)] ?? notes[0]` dán cho chúng nhãn đầu tiên của cụm: câu "diện tích
  hình thoi, quên chia 2" bị dán thành "nóng vội khi độ khó tăng". Tệ hơn, prompt lại khai errorTag phải
  "thuộc đúng danh sách đã khai báo", tức là `verifyQuestionBank()` loại ngay hai mục bắt buộc lúc nạp.
  Cách sửa: bảng tra `tools/data/error-tags.mjs` cho 21 nhãn dùng chung, và `danhSachNhanLoi()` khai báo
  đủ cả nhãn của cụm lẫn nhãn mà hai mục mẫu thật sự dùng.

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
- Đổi quy định bảng phấn: `tools/lib/chalk.mjs` (10 quy định chung + 2 quy định hình học nối theo cụm, danh sách ở `SOLID_CLUSTERS` / `BODY_CLUSTERS`).
- Đổi quy định chế độ giảng bài: `tools/lib/lesson.mjs` (13 quy định).
- Đổi quy định tự kiểm đề: `tools/lib/verify.mjs` (dùng chung với 85 prompt game).
- Đổi bố cục AR của tiết học: `AR_LESSON` trong `tools/lib/ar.mjs`. `AR_RENDER` trong cùng file là khối của game — hai khối chiếu tọa độ theo hai hình chữ nhật khác nhau nên không đổi chỗ cho nhau được.
- Một `GA*.md` báo từ vựng game: **đừng** sửa `clusters.mjs` hay `props.mjs` — 85 prompt game đang đọc hai file đó — mà thêm khối `giao_an` cho cụm bị báo vào `tools/data/lessons.mjs`.
- Câu mẫu mới trong `examples.mjs` dùng `errorTag` ngoài ba nhãn của cụm: thêm mô tả tiếng Việt vào `tools/data/error-tags.mjs`, nếu không builder sẽ dừng và gọi tên đúng nhãn thiếu.
- `node tools/validate.mjs` sẽ chặn nếu thiếu quy định nào, nếu vật thật thiếu trường, nếu quy định hình học lọt vào bài không có hình học, hoặc nếu cơ chế game lọt vào giáo án.
