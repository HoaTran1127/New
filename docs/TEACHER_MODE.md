# Teacher Mode — Chế độ giáo viên (issue #17)

Tài liệu thiết kế cho **teacher mode**: cô chọn world/skill, giao nhiệm vụ
(thời lượng, độ khó, sĩ số), và xem báo cáo mastery/error summary sau buổi học.

## 1. Nguyên tắc thiết kế

1. **Tái dùng, không phát minh lại.** Repo đã có sẵn mọi dữ liệu teacher mode cần:
   - 85 worlds trong `tools/data/games.mjs` (id, tên, gesture, cụm kiến thức).
   - Bảng chuẩn `tools/data/standards.mjs`: mỗi cụm có mạch kiến thức, nhãn ngắn,
     khoảng tuần `[tuan]` dạy trong năm học 35 tuần, "yêu cầu cần đạt" nguyên văn.
   - Thư viện lỗi `tools/data/clusters.mjs`: mỗi cụm có `errorTag` để game nhóm
     câu sai ở màn tổng kết (thay vì chỉ báo đúng/sai).
   - Game đã có sẵn: màn tổng kết 3 thẻ ("Làm tốt / Cần luyện / Động tác lần sau"),
     nhóm câu sai theo errorTag, và khối **"Gửi bố mẹ"** (4 dòng điền số thật).
   Teacher mode chỉ **đóng gói** các dữ liệu này thành quy trình cho cô.
2. **Lớp dữ liệu + tài liệu, không sửa engine.** Không động vào game engine,
   không sửa 14 dòng CORE (`tools/lib/core.mjs`), không đổi pipeline
   `tools/build.mjs`.
3. **Không thu video/ảnh trẻ.** Mọi báo cáo đều đọc từ màn hình game
   (màn tổng kết, khối "Gửi bố mẹ"); không lưu trữ tập trung, không upload.

## 2. Flow 1 — Cô chọn world/skill theo tuần học

Vấn đề cũ: giáo viên cầm 85 thẻ game không biết mở game nào vào tiết hôm nay
(khảo sát trong `tools/data/standards.mjs`: 0/85 prompt nhắc "tuần học").

Cách làm mới:
1. Cô xác định **tuần học** hiện tại (1–35) và môn/lớp.
2. Tra bảng chuẩn: mỗi cụm kiến thức có khoảng tuần `[mở bài, khép bài]`
   (ví dụ cụm `hang-so` → tuần 1–2, nhãn "Số tự nhiên").
3. Lọc worlds theo cụm: mọi game trong `tools/data/games.mjs` đều mang `cluster`,
   nên chọn game đúng cụm là đúng tuần dạy.
4. File `catalogs/GAME_CATALOG.csv` (cột `prompt`) cho biết file prompt `.md`
   của từng game để cô mở/dán vào Gemini Canvas khi cần.

> Quy tắc: 1 buổi học = 1–3 worlds cùng cụm (đừng trộn nhiều cụm trong một tiết).

## 3. Flow 2 — Giao nhiệm vụ: thời lượng, độ khó, sĩ số

Giáo án là **một file JSON** theo schema trong `tools/data/lesson-schema.mjs`:

| Trường | Ý nghĩa |
|---|---|
| `ten` | Tên giáo án |
| `tuan` | Tuần học 1–35 |
| `mon` | `"Toán"` hoặc `"Tiếng Anh"` (phải khớp môn của worlds) |
| `lop` | `4` hoặc `5` (phải khớp lớp của worlds) |
| `worldIds` | Mảng id game, ví dụ `["L4-01", "L4-36"]` (phải tồn tại trong catalog) |
| `skills` | Mảng cụm kiến thức (tùy chọn — bỏ trống thì tự suy từ worlds) |
| `durationMinutes` | 5–45 phút (mỗi game một phiên ≤ 10 phút theo CORE) |
| `difficulty` | 1=dễ, 2=trung bình, 3=khó (khớp level 1/2/3 trong ngân hàng câu hỏi của game) |
| `classSize` | Sĩ số 1–60 (để chia lượt; mỗi em chờ ≤ 20 giây theo CORE) |
| `ghiChu` | Dặn dò thêm (tùy chọn) |

Chạy tool sinh phiếu:

```bash
node tools/build-lesson-plan.mjs tools/data/lesson-example.json > phieu-tuan-1.md
```

Tool validate bằng `validateLesson()` (lỗi in tiếng Việt, có lỗi thì không sinh phiếu),
in cảnh báo khi world thuộc cụm thường dạy tuần khác (ví dụ đặt game tuần 1–2
vào giáo án tuần 8), rồi sinh **phiếu giao nhiệm vụ** gồm: danh sách world
(id, tên, kỹ năng, điều khiển, đường dẫn prompt), gợi ý phân bổ thời gian,
checklist chuẩn bị cho cô, và mục "Sau buổi học".

## 4. Flow 3 — Báo cáo mastery/error summary sau buổi học

Không cần phần mềm chấm điểm riêng — game đã sinh sẵn báo cáo, cô chỉ chép lại:

1. **Màn tổng kết mỗi game**: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau".
2. **Nhóm câu sai theo errorTag**: các câu sai cùng mã lỗi (ví dụ
   `thieu_hang_trong` — bỏ sót hàng ở giữa khi viết số) được gom lại với nhau.
   Cô đếm số lượt mỗi errorTag → biết cả lớp yếu ở kỹ năng nào → ra bài luyện
   bổ trợ đúng chỗ (đúng vòng: chấm bài → bắt lỗi → ra bài luyện).
3. **Khối "Gửi bố mẹ"**: 4 dòng điền số thật trong game — dùng làm nội dung
   trao đổi với phụ huynh, không cần chụp màn hình có mặt trẻ.

Mẫu "sổ theo dõi" gợi ý cho cô (giấy hoặc file riêng, không lưu trong repo):

```
Tuần 1 · L4-01 · 35 em
- thieu_hang_trong: 9 lượt  → bài luyện: viết số có chữ số 0 ở giữa
- doc_nham_hang:   4 lượt  → bài luyện: đọc giá trị theo hàng
```

## 5. Mô hình dữ liệu (tóm tắt)

```
Giáo án JSON (tools/data/lesson-example.json)
   │ validate bởi tools/data/lesson-schema.mjs
   ▼
Phiếu giao nhiệm vụ .md (tools/build-lesson-plan.mjs)
   │ cô dùng để chuẩn bị + chia lượt
   ▼
Buổi học (game chạy như cũ, không đổi)
   │ màn tổng kết + errorTag + "Gửi bố mẹ"
   ▼
Sổ theo dõi của cô (ngoài repo)
```

## 6. Acceptance criteria

- [ ] Giáo án JSON mẫu validate đạt (không lỗi).
- [ ] Giáo án sai (id game lạ, sai môn/lớp, thiếu trường) bị từ chối kèm lỗi tiếng Việt dễ hiểu.
- [ ] Cảnh báo hiện khi world thuộc cụm dạy tuần khác với tuần trong giáo án.
- [ ] Phiếu sinh ra liệt kê đúng world/skill/duration/difficulty, có checklist và mục "Sau buổi học".
- [ ] `node tools/build.mjs` vẫn pass như trước (không phá pipeline sinh prompt).
- [ ] Không có thay đổi nào ở engine game, CORE lines, hay pipeline build.
- [ ] Tài liệu ghi rõ không thu video/ảnh học sinh.

## 7. Đã xác minh / [Chưa xác minh]

**Đã xác minh:**
- 85 worlds trong `tools/data/games.mjs`; mọi cluster đều có mặt trong
  `tools/data/standards.mjs` (kiểm bằng script: 57/57 cụm khớp).
- Cấu trúc màn tổng kết (3 thẻ, nhóm lỗi theo errorTag) và khối "Gửi bố mẹ"
  có thật trong prompt game (kiểm file `prompts/01-toan4/L4-01-number-dash.md`:
  5 vị trí nhắc `errorTag`, có khối "Gửi bố mẹ").
- Schema + tool chạy được trên Node 24 (`node --check` đạt, chạy thử với
  file mẫu sinh phiếu thành công).

**[Chưa xác minh]:**
- Chưa thử quy trình với giáo viên thật trong lớp học (flow chọn game theo tuần,
  độ dài phiếu có vừa in một mặt giấy không).
- Chưa kiểm chứng 61 khoảng tuần trong `STANDARDS` khớp 100% phân phối chương
  trình thực tế của từng bộ SGK (Cánh Diều / Kết nối tri thức / Chân trời sáng tạo).
- Báo cáo errorTag hiện do cô chép tay từ màn hình — chưa có công cụ tổng hợp
  tự động (cố ý để ngoài phạm vi: tránh lưu trữ dữ liệu học sinh tập trung).
