# Bài 4: Thiết Kế Ngân Hàng Câu Hỏi Toán Lớp 4 - 5 & Thuật Toán Sinh Bẫy

> **⚠️ Cập nhật chuẩn MiTi (2026-10)** — bài này vẫn đúng về ý tưởng, nhưng ba phụ thuộc đã đổi: **Tone.js → Web Audio API tự tổng hợp**, **MediaPipe Hands legacy → MediaPipe Tasks Vision pin `@1.0.1`** (vision_bundle.mjs + wasm + hand_landmarker.task), **Tailwind Play CDN → CSS nội tuyến một khối `<style>`**.
> Bản chuẩn để viết prompt cho Gemini Canvas: `prompts/00-master-canvas-prompt.md` — khung 5 mục (Ý TƯỞNG · MỤC TIÊU HỌC TẬP · RÀNG BUỘC CỐT LÕI · NGÂN HÀNG DỮ LIỆU · TỰ KIỂM TRA), trần 15 KB mỗi prompt. Mọi quy định dùng chung nằm trong 14 dòng `CORE_LINES` ở `tools/lib/core.mjs`; 425 biến thể điều khiển ở `prompts/VARIANTS_425.md`.
> Bài viết dưới đây mô tả kiến trúc cũ (nhiều module `tools/lib/*`, prompt dài hàng trăm KB), nên đọc để hiểu cơ chế chứ không copy cấu trúc. Mã nguồn demo trong `games/` là bản cũ, chưa theo hợp đồng AR này.


## 1. Tâm lý học trò chơi: Tỉ lệ Vàng Đúng / Sai
Trong game chém thẻ AR, nếu thẻ nào rơi xuống cũng Đúng thì trò chơi sẽ biến thành game "chém bừa vô thức". Ngược lại, nếu thẻ Sai quá nhiều, học sinh sẽ rụt rè không dám vung tay.
- **Tỉ lệ vàng:** `isCorrect` được thiết lập khoảng **60% ĐÚNG** và **40% SAI**.
- Học sinh luôn ở trạng thái tập trung cao độ: vừa đọc lướt phép tính vừa quyết định trong 0.5 giây xem có nên tung cú đấm hay không!

---

## 2. Bẫy Sư Phạm Thông Minh (Pedagogical Traps)
Khác với việc sinh số ngẫu nhiên vô nghĩa (như $3 + 2 = 99$), chúng ta cài cắm các **lỗi sai kinh điển mà học sinh lớp 4 & 5 hay mắc phải nhất trên lớp**:

| Dạng Toán | Phép Tính Đúng | Bẫy Sai Sư Phạm | Bài Học Rút Ra |
| :--- | :--- | :--- | :--- |
| **Phân số lớp 4** | $\frac{1}{3} + \frac{1}{3} = \frac{2}{3}$ | $\frac{1}{3} + \frac{1}{3} = \frac{2}{6}$ | Cộng phân số cùng mẫu thì giữ nguyên mẫu số! |
| **Số thập phân lớp 5** | $0.25 \times 4 = 1.0$ | $0.25 \times 4 = 10$ | Đếm đủ 2 chữ số sau dấu phẩy ở kết quả. |
| **Đổi đơn vị lớp 4** | $1\text{ m}^2 = 100\text{ dm}^2$ | $1\text{ m}^2 = 10\text{ dm}^2$ | Đơn vị diện tích mỗi bậc cách nhau 100 lần, không phải 10! |
| **Hình học lớp 5** | Tam giác đáy $6$, cao $4$ $\rightarrow S = 12$ | $\rightarrow S = 24$ | Diện tích tam giác bắt buộc phải chia cho 2! |
| **Toán chuyển động** | $s = 120\text{km}, v = 60\text{km/h} \rightarrow t = 2\text{h}$ | $\rightarrow t = 3\text{h}$ | Công thức thời gian $t = s : v$. |

Mỗi khi học sinh đấm nhầm thẻ sai, dòng chữ giải thích chi tiết sẽ hiện lên ngay lập tức (ví dụ: *"Quên chia cho 2! S tam giác = (6 × 4) : 2 = 12 chứ không phải 24"*). Đây chính là cách game hóa giúp học sinh nhớ lâu bài học.

---

## 3. Cấu trúc chuẩn của một Chủ Đề (Topic Object)
Mỗi chủ đề trong thư mục `src/data/` tuân thủ khuôn mẫu thống nhất:

```javascript
const ChuDeMoi = {
  id: 'lop5_phan_so_nang_cao',          // Mã định danh duy nhất
  grade: 5,                              // Khối lớp: 4, 5, hoặc 'all'
  title: 'Lớp 5: Nhân Chia Phân Số',    // Tên hiển thị trên menu
  badge: 'LỚP 5',                        // Nhãn gắn thẻ
  badgeColor: '#EC4899',                 // Màu viền nhãn
  description: 'Thực hành nhân chia hai phân số khác mẫu',

  generate() {
    // 1. Tự sinh số ngẫu nhiên
    // 2. Quyết định câu này là Đúng hay Sai (Math.random() < 0.6)
    // 3. Trả về đối tượng chứa dữ liệu câu hỏi
    return {
      isCorrect: true,                   // Thẻ này ĐÚNG hay SAI
      leftPart: "2/3 × 3/4",             // Vế trái phép tính
      rightPart: "= 1/2",                // Vế phải phép tính
      text: "2/3 × 3/4 = 1/2",           // Toàn văn
      explanation: "Rút gọn chéo: 2/3 × 3/4 = 2/4 = 1/2" // Lời giải thích
    };
  }
};
```

---

## 4. Cách Thêm Một Chủ Đề Mới Chỉ Với 1 Dòng Code
Nhờ có kiến trúc `TopicRegistry` (trong `src/data/index.js`), bạn chỉ cần gọi:
```javascript
TopicRegistry.registerTopic(ChuDeMoi);
```
Ngay lập tức, menu chọn chủ đề trong game sẽ tự động nhận diện dạng toán mới mà bạn không cần phải sửa bất kỳ dòng code giao diện nào!

---

👉 **Ở bài tiếp theo:** Chúng ta sẽ học cách tạo ra các âm thanh Arcade điện tử sống động bằng Tone.js mà không cần tìm kiếm file âm thanh trên mạng!
