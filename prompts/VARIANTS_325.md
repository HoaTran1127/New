# 🎯 325 PROMPT VARIANTS — MiTi

**65 game gốc × 5 biến thể = 325 prompt độc lập.** Mỗi block dưới đây là một prompt hoàn chỉnh có thể copy riêng vào Gemini Canvas. Nội dung hướng tới học sinh Việt Nam lớp 4–5; giao diện, hướng dẫn và phản hồi trong game phải dùng tiếng Việt.

## Quy ước chung

Mỗi prompt yêu cầu Gemini tạo **một file HTML duy nhất**, không TODO, không pseudocode, dữ liệu câu hỏi nhúng trong file, feedback sau mỗi câu, difficulty tăng dần, tái xuất hiện câu sai, camera/microphone là tùy chọn trừ khi biến thể nói rõ, không tải video/audio lên server, có fallback phù hợp.


# L4-01 — Number Dash — 4 — Toán

## Prompt 001 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Number Dash**.

**Mục tiêu học tập:** Đọc, viết và nhận biết cấu tạo số đến 100000.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Number Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, viết và nhận biết cấu tạo số đến 100000. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 002 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Number Dash**.

**Mục tiêu học tập:** Đọc, viết và nhận biết cấu tạo số đến 100000.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Number Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, viết và nhận biết cấu tạo số đến 100000. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 003 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Number Dash**.

**Mục tiêu học tập:** Đọc, viết và nhận biết cấu tạo số đến 100000.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Number Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, viết và nhận biết cấu tạo số đến 100000. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 004 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Number Dash**.

**Mục tiêu học tập:** Đọc, viết và nhận biết cấu tạo số đến 100000.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Number Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, viết và nhận biết cấu tạo số đến 100000. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 005 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Number Dash**.

**Mục tiêu học tập:** Đọc, viết và nhận biết cấu tạo số đến 100000.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Number Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, viết và nhận biết cấu tạo số đến 100000. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-02 — Million Mountain — 4 — Toán

## Prompt 006 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Million Mountain**.

**Mục tiêu học tập:** Đọc, so sánh và sắp thứ tự số đến hàng triệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Million Mountain bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và sắp thứ tự số đến hàng triệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 007 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Million Mountain**.

**Mục tiêu học tập:** Đọc, so sánh và sắp thứ tự số đến hàng triệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Million Mountain bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và sắp thứ tự số đến hàng triệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 008 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Million Mountain**.

**Mục tiêu học tập:** Đọc, so sánh và sắp thứ tự số đến hàng triệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Million Mountain bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và sắp thứ tự số đến hàng triệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 009 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Million Mountain**.

**Mục tiêu học tập:** Đọc, so sánh và sắp thứ tự số đến hàng triệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Million Mountain bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và sắp thứ tự số đến hàng triệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 010 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Million Mountain**.

**Mục tiêu học tập:** Đọc, so sánh và sắp thứ tự số đến hàng triệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Million Mountain bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và sắp thứ tự số đến hàng triệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-03 — Rounding Hoops — 4 — Toán

## Prompt 011 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Rounding Hoops**.

**Mục tiêu học tập:** Làm tròn số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Rounding Hoops bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng làm tròn số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 012 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Rounding Hoops**.

**Mục tiêu học tập:** Làm tròn số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Rounding Hoops bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng làm tròn số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 013 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Rounding Hoops**.

**Mục tiêu học tập:** Làm tròn số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Rounding Hoops bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng làm tròn số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 014 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Rounding Hoops**.

**Mục tiêu học tập:** Làm tròn số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Rounding Hoops bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng làm tròn số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 015 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Rounding Hoops**.

**Mục tiêu học tập:** Làm tròn số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Rounding Hoops bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng làm tròn số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-04 — Even Odd Dance — 4 — Toán

## Prompt 016 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Even Odd Dance**.

**Mục tiêu học tập:** Nhận biết số chẵn và số lẻ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Even Odd Dance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết số chẵn và số lẻ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 017 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Even Odd Dance**.

**Mục tiêu học tập:** Nhận biết số chẵn và số lẻ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Even Odd Dance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết số chẵn và số lẻ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 018 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Even Odd Dance**.

**Mục tiêu học tập:** Nhận biết số chẵn và số lẻ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Even Odd Dance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết số chẵn và số lẻ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 019 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Even Odd Dance**.

**Mục tiêu học tập:** Nhận biết số chẵn và số lẻ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Even Odd Dance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết số chẵn và số lẻ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 020 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Even Odd Dance**.

**Mục tiêu học tập:** Nhận biết số chẵn và số lẻ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Even Odd Dance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết số chẵn và số lẻ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-05 — Weight Factory — 4 — Toán

## Prompt 021 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Weight Factory**.

**Mục tiêu học tập:** Đổi đơn vị khối lượng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Weight Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đổi đơn vị khối lượng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 022 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Weight Factory**.

**Mục tiêu học tập:** Đổi đơn vị khối lượng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Weight Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đổi đơn vị khối lượng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 023 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Weight Factory**.

**Mục tiêu học tập:** Đổi đơn vị khối lượng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Weight Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đổi đơn vị khối lượng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 024 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Weight Factory**.

**Mục tiêu học tập:** Đổi đơn vị khối lượng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Weight Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đổi đơn vị khối lượng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 025 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Weight Factory**.

**Mục tiêu học tập:** Đổi đơn vị khối lượng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Weight Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đổi đơn vị khối lượng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-06 — Area Builder — 4 — Toán

## Prompt 026 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Area Builder**.

**Mục tiêu học tập:** Nhận biết đơn vị và tính diện tích.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Area Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết đơn vị và tính diện tích. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 027 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Area Builder**.

**Mục tiêu học tập:** Nhận biết đơn vị và tính diện tích.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Area Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết đơn vị và tính diện tích. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 028 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Area Builder**.

**Mục tiêu học tập:** Nhận biết đơn vị và tính diện tích.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Area Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết đơn vị và tính diện tích. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 029 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Area Builder**.

**Mục tiêu học tập:** Nhận biết đơn vị và tính diện tích.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Area Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết đơn vị và tính diện tích. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 030 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Area Builder**.

**Mục tiêu học tập:** Nhận biết đơn vị và tính diện tích.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Area Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết đơn vị và tính diện tích. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-07 — Time Machine — 4 — Toán

## Prompt 031 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Time Machine**.

**Mục tiêu học tập:** Đọc và tính thời gian.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Time Machine bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tính thời gian. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 032 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Time Machine**.

**Mục tiêu học tập:** Đọc và tính thời gian.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Time Machine bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tính thời gian. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 033 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Time Machine**.

**Mục tiêu học tập:** Đọc và tính thời gian.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Time Machine bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tính thời gian. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 034 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Time Machine**.

**Mục tiêu học tập:** Đọc và tính thời gian.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Time Machine bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tính thời gian. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 035 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Time Machine**.

**Mục tiêu học tập:** Đọc và tính thời gian.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Time Machine bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tính thời gian. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-08 — Angle Hero — 4 — Toán

## Prompt 036 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Angle Hero**.

**Mục tiêu học tập:** Nhận biết và đo góc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Angle Hero bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và đo góc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 037 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Angle Hero**.

**Mục tiêu học tập:** Nhận biết và đo góc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Angle Hero bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và đo góc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 038 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Angle Hero**.

**Mục tiêu học tập:** Nhận biết và đo góc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Angle Hero bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và đo góc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 039 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Angle Hero**.

**Mục tiêu học tập:** Nhận biết và đo góc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Angle Hero bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và đo góc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 040 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Angle Hero**.

**Mục tiêu học tập:** Nhận biết và đo góc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Angle Hero bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và đo góc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-09 — Laser Architect — 4 — Toán

## Prompt 041 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Laser Architect**.

**Mục tiêu học tập:** Nhận biết quan hệ vuông góc và song song.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Laser Architect bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết quan hệ vuông góc và song song. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 042 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Laser Architect**.

**Mục tiêu học tập:** Nhận biết quan hệ vuông góc và song song.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Laser Architect bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết quan hệ vuông góc và song song. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 043 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Laser Architect**.

**Mục tiêu học tập:** Nhận biết quan hệ vuông góc và song song.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Laser Architect bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết quan hệ vuông góc và song song. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 044 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Laser Architect**.

**Mục tiêu học tập:** Nhận biết quan hệ vuông góc và song song.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Laser Architect bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết quan hệ vuông góc và song song. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 045 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Laser Architect**.

**Mục tiêu học tập:** Nhận biết quan hệ vuông góc và song song.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Laser Architect bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết quan hệ vuông góc và song song. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-10 — Math Boxing — 4 — Toán

## Prompt 046 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Math Boxing**.

**Mục tiêu học tập:** Cộng, trừ và biểu thức.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Math Boxing bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng, trừ và biểu thức. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 047 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Math Boxing**.

**Mục tiêu học tập:** Cộng, trừ và biểu thức.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Math Boxing bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng, trừ và biểu thức. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 048 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Math Boxing**.

**Mục tiêu học tập:** Cộng, trừ và biểu thức.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Math Boxing bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng, trừ và biểu thức. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 049 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Math Boxing**.

**Mục tiêu học tập:** Cộng, trừ và biểu thức.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Math Boxing bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng, trừ và biểu thức. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 050 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Math Boxing**.

**Mục tiêu học tập:** Cộng, trừ và biểu thức.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Math Boxing bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng, trừ và biểu thức. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-11 — Multiplication Rocket — 4 — Toán

## Prompt 051 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Multiplication Rocket**.

**Mục tiêu học tập:** Thực hiện phép nhân số tự nhiên.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multiplication Rocket bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép nhân số tự nhiên. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 052 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Multiplication Rocket**.

**Mục tiêu học tập:** Thực hiện phép nhân số tự nhiên.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multiplication Rocket bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép nhân số tự nhiên. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 053 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Multiplication Rocket**.

**Mục tiêu học tập:** Thực hiện phép nhân số tự nhiên.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multiplication Rocket bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép nhân số tự nhiên. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 054 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Multiplication Rocket**.

**Mục tiêu học tập:** Thực hiện phép nhân số tự nhiên.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multiplication Rocket bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép nhân số tự nhiên. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 055 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Multiplication Rocket**.

**Mục tiêu học tập:** Thực hiện phép nhân số tự nhiên.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multiplication Rocket bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép nhân số tự nhiên. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-12 — Division Conveyor — 4 — Toán

## Prompt 056 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Division Conveyor**.

**Mục tiêu học tập:** Thực hiện phép chia, thương và số dư.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Division Conveyor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép chia, thương và số dư. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 057 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Division Conveyor**.

**Mục tiêu học tập:** Thực hiện phép chia, thương và số dư.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Division Conveyor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép chia, thương và số dư. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 058 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Division Conveyor**.

**Mục tiêu học tập:** Thực hiện phép chia, thương và số dư.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Division Conveyor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép chia, thương và số dư. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 059 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Division Conveyor**.

**Mục tiêu học tập:** Thực hiện phép chia, thương và số dư.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Division Conveyor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép chia, thương và số dư. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 060 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Division Conveyor**.

**Mục tiêu học tập:** Thực hiện phép chia, thương và số dư.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Division Conveyor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng thực hiện phép chia, thương và số dư. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-13 — Balance Lab — 4 — Toán

## Prompt 061 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Balance Lab**.

**Mục tiêu học tập:** Nhận biết tính chất và biểu thức tương đương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Balance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết tính chất và biểu thức tương đương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 062 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Balance Lab**.

**Mục tiêu học tập:** Nhận biết tính chất và biểu thức tương đương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Balance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết tính chất và biểu thức tương đương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 063 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Balance Lab**.

**Mục tiêu học tập:** Nhận biết tính chất và biểu thức tương đương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Balance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết tính chất và biểu thức tương đương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 064 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Balance Lab**.

**Mục tiêu học tập:** Nhận biết tính chất và biểu thức tương đương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Balance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết tính chất và biểu thức tương đương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 065 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Balance Lab**.

**Mục tiêu học tập:** Nhận biết tính chất và biểu thức tương đương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Balance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết tính chất và biểu thức tương đương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-14 — Delivery Route — 4 — Toán

## Prompt 066 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Delivery Route**.

**Mục tiêu học tập:** Giải bài toán nhiều bước.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Delivery Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán nhiều bước. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 067 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Delivery Route**.

**Mục tiêu học tập:** Giải bài toán nhiều bước.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Delivery Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán nhiều bước. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 068 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Delivery Route**.

**Mục tiêu học tập:** Giải bài toán nhiều bước.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Delivery Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán nhiều bước. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 069 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Delivery Route**.

**Mục tiêu học tập:** Giải bài toán nhiều bước.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Delivery Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán nhiều bước. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 070 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Delivery Route**.

**Mục tiêu học tập:** Giải bài toán nhiều bước.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Delivery Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán nhiều bước. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-15 — Data Catch — 4 — Toán

## Prompt 071 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Catch**.

**Mục tiêu học tập:** Đọc và khai thác dãy số liệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Catch bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và khai thác dãy số liệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 072 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Catch**.

**Mục tiêu học tập:** Đọc và khai thác dãy số liệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Catch bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và khai thác dãy số liệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 073 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Catch**.

**Mục tiêu học tập:** Đọc và khai thác dãy số liệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Catch bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và khai thác dãy số liệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 074 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Catch**.

**Mục tiêu học tập:** Đọc và khai thác dãy số liệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Catch bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và khai thác dãy số liệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 075 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Catch**.

**Mục tiêu học tập:** Đọc và khai thác dãy số liệu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Catch bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và khai thác dãy số liệu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-16 — Bar Builder — 4 — Toán

## Prompt 076 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Bar Builder**.

**Mục tiêu học tập:** Đọc và tạo biểu đồ cột.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Bar Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tạo biểu đồ cột. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 077 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Bar Builder**.

**Mục tiêu học tập:** Đọc và tạo biểu đồ cột.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Bar Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tạo biểu đồ cột. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 078 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Bar Builder**.

**Mục tiêu học tập:** Đọc và tạo biểu đồ cột.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Bar Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tạo biểu đồ cột. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 079 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Bar Builder**.

**Mục tiêu học tập:** Đọc và tạo biểu đồ cột.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Bar Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tạo biểu đồ cột. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 080 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Bar Builder**.

**Mục tiêu học tập:** Đọc và tạo biểu đồ cột.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Bar Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và tạo biểu đồ cột. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-17 — Picture Market — 4 — Toán

## Prompt 081 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Picture Market**.

**Mục tiêu học tập:** Đọc biểu đồ tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Market bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc biểu đồ tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 082 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Picture Market**.

**Mục tiêu học tập:** Đọc biểu đồ tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Market bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc biểu đồ tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 083 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Picture Market**.

**Mục tiêu học tập:** Đọc biểu đồ tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Market bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc biểu đồ tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 084 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Picture Market**.

**Mục tiêu học tập:** Đọc biểu đồ tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Market bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc biểu đồ tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 085 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Picture Market**.

**Mục tiêu học tập:** Đọc biểu đồ tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Market bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc biểu đồ tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-18 — Chance Lab — 4 — Toán

## Prompt 086 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Chance Lab**.

**Mục tiêu học tập:** Nhận biết chắc chắn, có thể, không thể.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Chance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết chắc chắn, có thể, không thể. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 087 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Chance Lab**.

**Mục tiêu học tập:** Nhận biết chắc chắn, có thể, không thể.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Chance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết chắc chắn, có thể, không thể. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 088 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Chance Lab**.

**Mục tiêu học tập:** Nhận biết chắc chắn, có thể, không thể.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Chance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết chắc chắn, có thể, không thể. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 089 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Chance Lab**.

**Mục tiêu học tập:** Nhận biết chắc chắn, có thể, không thể.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Chance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết chắc chắn, có thể, không thể. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 090 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Chance Lab**.

**Mục tiêu học tập:** Nhận biết chắc chắn, có thể, không thể.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Chance Lab bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết chắc chắn, có thể, không thể. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-19 — Fraction Pizza — 4 — Toán

## Prompt 091 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Pizza**.

**Mục tiêu học tập:** Nhận biết và biểu diễn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Pizza bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và biểu diễn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 092 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Pizza**.

**Mục tiêu học tập:** Nhận biết và biểu diễn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Pizza bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và biểu diễn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 093 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Pizza**.

**Mục tiêu học tập:** Nhận biết và biểu diễn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Pizza bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và biểu diễn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 094 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Pizza**.

**Mục tiêu học tập:** Nhận biết và biểu diễn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Pizza bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và biểu diễn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 095 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Pizza**.

**Mục tiêu học tập:** Nhận biết và biểu diễn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Pizza bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và biểu diễn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-20 — Fraction Mirror — 4 — Toán

## Prompt 096 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Mirror**.

**Mục tiêu học tập:** Nhận biết phân số bằng nhau.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Mirror bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết phân số bằng nhau. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 097 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Mirror**.

**Mục tiêu học tập:** Nhận biết phân số bằng nhau.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Mirror bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết phân số bằng nhau. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 098 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Mirror**.

**Mục tiêu học tập:** Nhận biết phân số bằng nhau.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Mirror bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết phân số bằng nhau. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 099 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Mirror**.

**Mục tiêu học tập:** Nhận biết phân số bằng nhau.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Mirror bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết phân số bằng nhau. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 100 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Mirror**.

**Mục tiêu học tập:** Nhận biết phân số bằng nhau.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Mirror bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết phân số bằng nhau. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-21 — Fraction Ninja — 4 — Toán

## Prompt 101 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Ninja**.

**Mục tiêu học tập:** Rút gọn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Ninja bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng rút gọn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 102 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Ninja**.

**Mục tiêu học tập:** Rút gọn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Ninja bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng rút gọn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 103 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Ninja**.

**Mục tiêu học tập:** Rút gọn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Ninja bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng rút gọn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 104 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Ninja**.

**Mục tiêu học tập:** Rút gọn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Ninja bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng rút gọn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 105 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Ninja**.

**Mục tiêu học tập:** Rút gọn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Ninja bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng rút gọn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-22 — Common Denominator Factory — 4 — Toán

## Prompt 106 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Common Denominator Factory**.

**Mục tiêu học tập:** Quy đồng mẫu số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Common Denominator Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng quy đồng mẫu số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 107 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Common Denominator Factory**.

**Mục tiêu học tập:** Quy đồng mẫu số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Common Denominator Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng quy đồng mẫu số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 108 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Common Denominator Factory**.

**Mục tiêu học tập:** Quy đồng mẫu số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Common Denominator Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng quy đồng mẫu số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 109 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Common Denominator Factory**.

**Mục tiêu học tập:** Quy đồng mẫu số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Common Denominator Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng quy đồng mẫu số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 110 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Common Denominator Factory**.

**Mục tiêu học tập:** Quy đồng mẫu số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Common Denominator Factory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng quy đồng mẫu số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-23 — Fraction Race — 4 — Toán

## Prompt 111 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Race**.

**Mục tiêu học tập:** So sánh phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 112 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Race**.

**Mục tiêu học tập:** So sánh phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 113 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Race**.

**Mục tiêu học tập:** So sánh phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 114 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Race**.

**Mục tiêu học tập:** So sánh phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 115 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Race**.

**Mục tiêu học tập:** So sánh phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-24 — Fraction Fusion — 4 — Toán

## Prompt 116 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Fusion**.

**Mục tiêu học tập:** Cộng phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Fusion bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 117 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Fusion**.

**Mục tiêu học tập:** Cộng phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Fusion bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 118 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Fusion**.

**Mục tiêu học tập:** Cộng phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Fusion bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 119 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Fusion**.

**Mục tiêu học tập:** Cộng phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Fusion bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 120 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Fusion**.

**Mục tiêu học tập:** Cộng phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Fusion bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng cộng phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-25 — Fraction Reactor — 4 — Toán

## Prompt 121 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Reactor**.

**Mục tiêu học tập:** Trừ phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Reactor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng trừ phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 122 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Reactor**.

**Mục tiêu học tập:** Trừ phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Reactor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng trừ phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 123 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Reactor**.

**Mục tiêu học tập:** Trừ phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Reactor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng trừ phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 124 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Reactor**.

**Mục tiêu học tập:** Trừ phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Reactor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng trừ phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 125 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Reactor**.

**Mục tiêu học tập:** Trừ phân số cùng mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Reactor bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng trừ phân số cùng mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-26 — Treasure Split — 4 — Toán

## Prompt 126 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Treasure Split**.

**Mục tiêu học tập:** Tìm phân số của một số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Treasure Split bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm phân số của một số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 127 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Treasure Split**.

**Mục tiêu học tập:** Tìm phân số của một số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Treasure Split bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm phân số của một số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 128 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Treasure Split**.

**Mục tiêu học tập:** Tìm phân số của một số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Treasure Split bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm phân số của một số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 129 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Treasure Split**.

**Mục tiêu học tập:** Tìm phân số của một số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Treasure Split bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm phân số của một số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 130 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Treasure Split**.

**Mục tiêu học tập:** Tìm phân số của một số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Treasure Split bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm phân số của một số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-27 — Ratio Rescue — 4 — Toán

## Prompt 131 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Ratio Rescue**.

**Mục tiêu học tập:** Giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Rescue bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 132 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Ratio Rescue**.

**Mục tiêu học tập:** Giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Rescue bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 133 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Ratio Rescue**.

**Mục tiêu học tập:** Giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Rescue bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 134 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Ratio Rescue**.

**Mục tiêu học tập:** Giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Rescue bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 135 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Ratio Rescue**.

**Mục tiêu học tập:** Giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Rescue bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán theo sơ đồ tổng-tỉ/hiệu-tỉ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-28 — Map Explorer — 4 — Toán

## Prompt 136 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Map Explorer**.

**Mục tiêu học tập:** Đọc và sử dụng tỉ lệ bản đồ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Map Explorer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và sử dụng tỉ lệ bản đồ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 137 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Map Explorer**.

**Mục tiêu học tập:** Đọc và sử dụng tỉ lệ bản đồ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Map Explorer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và sử dụng tỉ lệ bản đồ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 138 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Map Explorer**.

**Mục tiêu học tập:** Đọc và sử dụng tỉ lệ bản đồ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Map Explorer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và sử dụng tỉ lệ bản đồ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 139 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Map Explorer**.

**Mục tiêu học tập:** Đọc và sử dụng tỉ lệ bản đồ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Map Explorer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và sử dụng tỉ lệ bản đồ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 140 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Map Explorer**.

**Mục tiêu học tập:** Đọc và sử dụng tỉ lệ bản đồ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Map Explorer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc và sử dụng tỉ lệ bản đồ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-29 — Parallelogram Pull — 4 — Toán

## Prompt 141 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Parallelogram Pull**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình bình hành.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Parallelogram Pull bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình bình hành. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 142 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Parallelogram Pull**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình bình hành.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Parallelogram Pull bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình bình hành. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 143 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Parallelogram Pull**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình bình hành.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Parallelogram Pull bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình bình hành. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 144 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Parallelogram Pull**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình bình hành.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Parallelogram Pull bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình bình hành. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 145 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Parallelogram Pull**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình bình hành.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Parallelogram Pull bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình bình hành. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-30 — Diamond Builder — 4 — Toán

## Prompt 146 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Diamond Builder**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình thoi.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Diamond Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình thoi. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 147 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Diamond Builder**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình thoi.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Diamond Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình thoi. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 148 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Diamond Builder**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình thoi.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Diamond Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình thoi. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 149 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Diamond Builder**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình thoi.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Diamond Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình thoi. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 150 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Diamond Builder**.

**Mục tiêu học tập:** Nhận biết và tính diện tích hình thoi.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Diamond Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và tính diện tích hình thoi. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-31 — Mixed Sprint — 4 — Toán

## Prompt 151 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Mixed Sprint**.

**Mục tiêu học tập:** Ôn số và phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Mixed Sprint bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn số và phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 152 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Mixed Sprint**.

**Mục tiêu học tập:** Ôn số và phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Mixed Sprint bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn số và phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 153 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Mixed Sprint**.

**Mục tiêu học tập:** Ôn số và phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Mixed Sprint bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn số và phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 154 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Mixed Sprint**.

**Mục tiêu học tập:** Ôn số và phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Mixed Sprint bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn số và phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 155 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Mixed Sprint**.

**Mục tiêu học tập:** Ôn số và phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Mixed Sprint bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn số và phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-32 — Geometry Arena — 4 — Toán

## Prompt 156 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Geometry Arena**.

**Mục tiêu học tập:** Ôn hình học và đo lường.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn hình học và đo lường. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 157 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Geometry Arena**.

**Mục tiêu học tập:** Ôn hình học và đo lường.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn hình học và đo lường. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 158 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Geometry Arena**.

**Mục tiêu học tập:** Ôn hình học và đo lường.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn hình học và đo lường. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 159 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Geometry Arena**.

**Mục tiêu học tập:** Ôn hình học và đo lường.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn hình học và đo lường. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 160 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Geometry Arena**.

**Mục tiêu học tập:** Ôn hình học và đo lường.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn hình học và đo lường. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-33 — Fraction Arena — 4 — Toán

## Prompt 161 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Arena**.

**Mục tiêu học tập:** Ôn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 162 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Arena**.

**Mục tiêu học tập:** Ôn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 163 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Arena**.

**Mục tiêu học tập:** Ôn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 164 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Arena**.

**Mục tiêu học tập:** Ôn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 165 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Fraction Arena**.

**Mục tiêu học tập:** Ôn phân số.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn phân số. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-34 — Data Arena — 4 — Toán

## Prompt 166 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Arena**.

**Mục tiêu học tập:** Ôn dữ liệu và khả năng xảy ra.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn dữ liệu và khả năng xảy ra. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 167 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Arena**.

**Mục tiêu học tập:** Ôn dữ liệu và khả năng xảy ra.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn dữ liệu và khả năng xảy ra. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 168 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Arena**.

**Mục tiêu học tập:** Ôn dữ liệu và khả năng xảy ra.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn dữ liệu và khả năng xảy ra. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 169 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Arena**.

**Mục tiêu học tập:** Ôn dữ liệu và khả năng xảy ra.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn dữ liệu và khả năng xảy ra. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 170 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Data Arena**.

**Mục tiêu học tập:** Ôn dữ liệu và khả năng xảy ra.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Data Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn dữ liệu và khả năng xảy ra. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# L4-35 — Grand Math Arena — 4 — Toán

## Prompt 171 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Grand Math Arena**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 4.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 4. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 172 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Grand Math Arena**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 4.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 4. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 173 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Grand Math Arena**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 4.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 4. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 174 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Grand Math Arena**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 4.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 4. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 175 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Toán, tên **Grand Math Arena**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 4.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Arena bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 4. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-01 — Multi Operation Quest — 5 — Toán

## Prompt 176 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Multi Operation Quest**.

**Mục tiêu học tập:** Giải biểu thức và bài toán nhiều phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multi Operation Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải biểu thức và bài toán nhiều phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 177 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Multi Operation Quest**.

**Mục tiêu học tập:** Giải biểu thức và bài toán nhiều phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multi Operation Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải biểu thức và bài toán nhiều phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 178 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Multi Operation Quest**.

**Mục tiêu học tập:** Giải biểu thức và bài toán nhiều phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multi Operation Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải biểu thức và bài toán nhiều phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 179 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Multi Operation Quest**.

**Mục tiêu học tập:** Giải biểu thức và bài toán nhiều phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multi Operation Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải biểu thức và bài toán nhiều phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 180 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Multi Operation Quest**.

**Mục tiêu học tập:** Giải biểu thức và bài toán nhiều phép tính.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Multi Operation Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải biểu thức và bài toán nhiều phép tính. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-02 — Decimal Dash — 5 — Toán

## Prompt 181 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Dash**.

**Mục tiêu học tập:** Đọc, so sánh và tính với số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và tính với số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 182 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Dash**.

**Mục tiêu học tập:** Đọc, so sánh và tính với số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và tính với số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 183 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Dash**.

**Mục tiêu học tập:** Đọc, so sánh và tính với số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và tính với số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 184 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Dash**.

**Mục tiêu học tập:** Đọc, so sánh và tính với số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và tính với số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 185 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Dash**.

**Mục tiêu học tập:** Đọc, so sánh và tính với số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Dash bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đọc, so sánh và tính với số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-03 — Fraction Decimal Percentage Memory — 5 — Toán

## Prompt 186 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Fraction Decimal Percentage Memory**.

**Mục tiêu học tập:** Liên hệ phân số, số thập phân và phần trăm.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Decimal Percentage Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng liên hệ phân số, số thập phân và phần trăm. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 187 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Fraction Decimal Percentage Memory**.

**Mục tiêu học tập:** Liên hệ phân số, số thập phân và phần trăm.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Decimal Percentage Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng liên hệ phân số, số thập phân và phần trăm. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 188 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Fraction Decimal Percentage Memory**.

**Mục tiêu học tập:** Liên hệ phân số, số thập phân và phần trăm.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Decimal Percentage Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng liên hệ phân số, số thập phân và phần trăm. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 189 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Fraction Decimal Percentage Memory**.

**Mục tiêu học tập:** Liên hệ phân số, số thập phân và phần trăm.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Decimal Percentage Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng liên hệ phân số, số thập phân và phần trăm. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 190 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Fraction Decimal Percentage Memory**.

**Mục tiêu học tập:** Liên hệ phân số, số thập phân và phần trăm.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Fraction Decimal Percentage Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng liên hệ phân số, số thập phân và phần trăm. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-04 — Percentage Shop — 5 — Toán

## Prompt 191 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Percentage Shop**.

**Mục tiêu học tập:** Giải bài toán phần trăm trong thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Percentage Shop bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán phần trăm trong thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 192 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Percentage Shop**.

**Mục tiêu học tập:** Giải bài toán phần trăm trong thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Percentage Shop bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán phần trăm trong thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 193 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Percentage Shop**.

**Mục tiêu học tập:** Giải bài toán phần trăm trong thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Percentage Shop bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán phần trăm trong thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 194 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Percentage Shop**.

**Mục tiêu học tập:** Giải bài toán phần trăm trong thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Percentage Shop bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán phần trăm trong thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 195 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Percentage Shop**.

**Mục tiêu học tập:** Giải bài toán phần trăm trong thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Percentage Shop bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán phần trăm trong thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-05 — Volume Builder — 5 — Toán

## Prompt 196 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Volume Builder**.

**Mục tiêu học tập:** Tính thể tích hình hộp chữ nhật và hình lập phương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Volume Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tính thể tích hình hộp chữ nhật và hình lập phương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 197 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Volume Builder**.

**Mục tiêu học tập:** Tính thể tích hình hộp chữ nhật và hình lập phương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Volume Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tính thể tích hình hộp chữ nhật và hình lập phương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 198 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Volume Builder**.

**Mục tiêu học tập:** Tính thể tích hình hộp chữ nhật và hình lập phương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Volume Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tính thể tích hình hộp chữ nhật và hình lập phương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 199 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Volume Builder**.

**Mục tiêu học tập:** Tính thể tích hình hộp chữ nhật và hình lập phương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Volume Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tính thể tích hình hộp chữ nhật và hình lập phương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 200 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Volume Builder**.

**Mục tiêu học tập:** Tính thể tích hình hộp chữ nhật và hình lập phương.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Volume Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tính thể tích hình hộp chữ nhật và hình lập phương. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-06 — Ratio Chef — 5 — Toán

## Prompt 201 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Ratio Chef**.

**Mục tiêu học tập:** Giải bài toán tỉ số trong ngữ cảnh thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Chef bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán tỉ số trong ngữ cảnh thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 202 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Ratio Chef**.

**Mục tiêu học tập:** Giải bài toán tỉ số trong ngữ cảnh thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Chef bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán tỉ số trong ngữ cảnh thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 203 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Ratio Chef**.

**Mục tiêu học tập:** Giải bài toán tỉ số trong ngữ cảnh thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Chef bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán tỉ số trong ngữ cảnh thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 204 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Ratio Chef**.

**Mục tiêu học tập:** Giải bài toán tỉ số trong ngữ cảnh thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Chef bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán tỉ số trong ngữ cảnh thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 205 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Ratio Chef**.

**Mục tiêu học tập:** Giải bài toán tỉ số trong ngữ cảnh thực tế.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Ratio Chef bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán tỉ số trong ngữ cảnh thực tế. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-07 — Motion Racer — 5 — Toán

## Prompt 206 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Motion Racer**.

**Mục tiêu học tập:** Giải bài toán chuyển động.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Motion Racer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán chuyển động. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 207 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Motion Racer**.

**Mục tiêu học tập:** Giải bài toán chuyển động.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Motion Racer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán chuyển động. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 208 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Motion Racer**.

**Mục tiêu học tập:** Giải bài toán chuyển động.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Motion Racer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán chuyển động. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 209 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Motion Racer**.

**Mục tiêu học tập:** Giải bài toán chuyển động.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Motion Racer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán chuyển động. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 210 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Motion Racer**.

**Mục tiêu học tập:** Giải bài toán chuyển động.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Motion Racer bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng giải bài toán chuyển động. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-08 — Geometry Gym — 5 — Toán

## Prompt 211 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Geometry Gym**.

**Mục tiêu học tập:** Ôn diện tích, chu vi và hình học.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Gym bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn diện tích, chu vi và hình học. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 212 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Geometry Gym**.

**Mục tiêu học tập:** Ôn diện tích, chu vi và hình học.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Gym bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn diện tích, chu vi và hình học. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 213 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Geometry Gym**.

**Mục tiêu học tập:** Ôn diện tích, chu vi và hình học.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Gym bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn diện tích, chu vi và hình học. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 214 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Geometry Gym**.

**Mục tiêu học tập:** Ôn diện tích, chu vi và hình học.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Gym bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn diện tích, chu vi và hình học. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 215 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Geometry Gym**.

**Mục tiêu học tập:** Ôn diện tích, chu vi và hình học.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Geometry Gym bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn diện tích, chu vi và hình học. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-09 — Decimal Balance — 5 — Toán

## Prompt 216 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Balance**.

**Mục tiêu học tập:** So sánh và cân bằng các số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Balance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh và cân bằng các số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 217 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Balance**.

**Mục tiêu học tập:** So sánh và cân bằng các số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Balance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh và cân bằng các số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 218 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Balance**.

**Mục tiêu học tập:** So sánh và cân bằng các số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Balance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh và cân bằng các số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 219 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Balance**.

**Mục tiêu học tập:** So sánh và cân bằng các số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Balance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh và cân bằng các số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 220 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Decimal Balance**.

**Mục tiêu học tập:** So sánh và cân bằng các số thập phân.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Decimal Balance bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng so sánh và cân bằng các số thập phân. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# T5-10 — Grand Math Quest — 5 — Toán

## Prompt 221 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Grand Math Quest**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 5.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 5. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 222 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Grand Math Quest**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 5.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 5. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 223 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Grand Math Quest**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 5.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 5. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 224 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Grand Math Quest**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 5.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 5. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 225 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Toán, tên **Grand Math Quest**.

**Mục tiêu học tập:** Ôn tổng hợp Toán 5.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grand Math Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp toán 5. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-01 — Vocabulary Quest — 4 — Tiếng Anh

## Prompt 226 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Vocabulary Quest**.

**Mục tiêu học tập:** Nhận biết và sử dụng từ vựng theo chủ đề.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Vocabulary Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và sử dụng từ vựng theo chủ đề. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 227 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Vocabulary Quest**.

**Mục tiêu học tập:** Nhận biết và sử dụng từ vựng theo chủ đề.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Vocabulary Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và sử dụng từ vựng theo chủ đề. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 228 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Vocabulary Quest**.

**Mục tiêu học tập:** Nhận biết và sử dụng từ vựng theo chủ đề.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Vocabulary Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và sử dụng từ vựng theo chủ đề. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 229 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Vocabulary Quest**.

**Mục tiêu học tập:** Nhận biết và sử dụng từ vựng theo chủ đề.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Vocabulary Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và sử dụng từ vựng theo chủ đề. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 230 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Vocabulary Quest**.

**Mục tiêu học tập:** Nhận biết và sử dụng từ vựng theo chủ đề.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Vocabulary Quest bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận biết và sử dụng từ vựng theo chủ đề. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-02 — Listening Pick — 4 — Tiếng Anh

## Prompt 231 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Pick**.

**Mục tiêu học tập:** Nghe và chọn từ hoặc hình đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Pick bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn từ hoặc hình đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 232 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Pick**.

**Mục tiêu học tập:** Nghe và chọn từ hoặc hình đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Pick bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn từ hoặc hình đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 233 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Pick**.

**Mục tiêu học tập:** Nghe và chọn từ hoặc hình đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Pick bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn từ hoặc hình đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 234 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Pick**.

**Mục tiêu học tập:** Nghe và chọn từ hoặc hình đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Pick bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn từ hoặc hình đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 235 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Pick**.

**Mục tiêu học tập:** Nghe và chọn từ hoặc hình đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Pick bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn từ hoặc hình đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-03 — Picture Word Match — 4 — Tiếng Anh

## Prompt 236 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Picture Word Match**.

**Mục tiêu học tập:** Ghép từ với tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Word Match bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ với tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 237 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Picture Word Match**.

**Mục tiêu học tập:** Ghép từ với tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Word Match bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ với tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 238 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Picture Word Match**.

**Mục tiêu học tập:** Ghép từ với tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Word Match bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ với tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 239 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Picture Word Match**.

**Mục tiêu học tập:** Ghép từ với tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Word Match bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ với tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 240 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Picture Word Match**.

**Mục tiêu học tập:** Ghép từ với tranh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Picture Word Match bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ với tranh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-04 — Spelling Stars — 4 — Tiếng Anh

## Prompt 241 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Spelling Stars**.

**Mục tiêu học tập:** Đánh vần từ quen thuộc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Stars bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần từ quen thuộc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 242 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Spelling Stars**.

**Mục tiêu học tập:** Đánh vần từ quen thuộc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Stars bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần từ quen thuộc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 243 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Spelling Stars**.

**Mục tiêu học tập:** Đánh vần từ quen thuộc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Stars bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần từ quen thuộc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 244 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Spelling Stars**.

**Mục tiêu học tập:** Đánh vần từ quen thuộc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Stars bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần từ quen thuộc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 245 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Spelling Stars**.

**Mục tiêu học tập:** Đánh vần từ quen thuộc.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Stars bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần từ quen thuộc. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-05 — Missing Letter Mission — 4 — Tiếng Anh

## Prompt 246 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Missing Letter Mission**.

**Mục tiêu học tập:** Điền chữ cái còn thiếu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Missing Letter Mission bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền chữ cái còn thiếu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 247 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Missing Letter Mission**.

**Mục tiêu học tập:** Điền chữ cái còn thiếu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Missing Letter Mission bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền chữ cái còn thiếu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 248 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Missing Letter Mission**.

**Mục tiêu học tập:** Điền chữ cái còn thiếu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Missing Letter Mission bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền chữ cái còn thiếu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 249 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Missing Letter Mission**.

**Mục tiêu học tập:** Điền chữ cái còn thiếu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Missing Letter Mission bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền chữ cái còn thiếu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 250 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Missing Letter Mission**.

**Mục tiêu học tập:** Điền chữ cái còn thiếu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Missing Letter Mission bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền chữ cái còn thiếu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-06 — Word Builder — 4 — Tiếng Anh

## Prompt 251 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Builder**.

**Mục tiêu học tập:** Ghép chữ thành từ đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép chữ thành từ đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 252 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Builder**.

**Mục tiêu học tập:** Ghép chữ thành từ đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép chữ thành từ đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 253 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Builder**.

**Mục tiêu học tập:** Ghép chữ thành từ đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép chữ thành từ đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 254 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Builder**.

**Mục tiêu học tập:** Ghép chữ thành từ đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép chữ thành từ đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 255 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Builder**.

**Mục tiêu học tập:** Ghép chữ thành từ đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép chữ thành từ đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-07 — Sentence Race — 4 — Tiếng Anh

## Prompt 256 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Sentence Race**.

**Mục tiêu học tập:** Sắp xếp và hoàn thành câu đơn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng sắp xếp và hoàn thành câu đơn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 257 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Sentence Race**.

**Mục tiêu học tập:** Sắp xếp và hoàn thành câu đơn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng sắp xếp và hoàn thành câu đơn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 258 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Sentence Race**.

**Mục tiêu học tập:** Sắp xếp và hoàn thành câu đơn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng sắp xếp và hoàn thành câu đơn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 259 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Sentence Race**.

**Mục tiêu học tập:** Sắp xếp và hoàn thành câu đơn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng sắp xếp và hoàn thành câu đơn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 260 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Sentence Race**.

**Mục tiêu học tập:** Sắp xếp và hoàn thành câu đơn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Race bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng sắp xếp và hoàn thành câu đơn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-08 — Word Memory — 4 — Tiếng Anh

## Prompt 261 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Memory**.

**Mục tiêu học tập:** Ghi nhớ và ghép cặp từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghi nhớ và ghép cặp từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 262 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Memory**.

**Mục tiêu học tập:** Ghi nhớ và ghép cặp từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghi nhớ và ghép cặp từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 263 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Memory**.

**Mục tiêu học tập:** Ghi nhớ và ghép cặp từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghi nhớ và ghép cặp từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 264 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Memory**.

**Mục tiêu học tập:** Ghi nhớ và ghép cặp từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghi nhớ và ghép cặp từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 265 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Memory**.

**Mục tiêu học tập:** Ghi nhớ và ghép cặp từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Memory bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghi nhớ và ghép cặp từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-09 — Listening Lane — 4 — Tiếng Anh

## Prompt 266 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Lane**.

**Mục tiêu học tập:** Nghe và chọn đáp án đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Lane bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn đáp án đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 267 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Lane**.

**Mục tiêu học tập:** Nghe và chọn đáp án đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Lane bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn đáp án đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 268 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Lane**.

**Mục tiêu học tập:** Nghe và chọn đáp án đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Lane bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn đáp án đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 269 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Lane**.

**Mục tiêu học tập:** Nghe và chọn đáp án đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Lane bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn đáp án đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 270 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Listening Lane**.

**Mục tiêu học tập:** Nghe và chọn đáp án đúng.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Lane bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe và chọn đáp án đúng. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E4-10 — Word Whack — 4 — Tiếng Anh

## Prompt 271 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Whack**.

**Mục tiêu học tập:** Nhận diện từ đúng trong thời gian ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Whack bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận diện từ đúng trong thời gian ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 272 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Whack**.

**Mục tiêu học tập:** Nhận diện từ đúng trong thời gian ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Whack bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận diện từ đúng trong thời gian ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 273 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Whack**.

**Mục tiêu học tập:** Nhận diện từ đúng trong thời gian ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Whack bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận diện từ đúng trong thời gian ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 274 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Whack**.

**Mục tiêu học tập:** Nhận diện từ đúng trong thời gian ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Whack bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận diện từ đúng trong thời gian ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 275 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 4, môn Tiếng Anh, tên **Word Whack**.

**Mục tiêu học tập:** Nhận diện từ đúng trong thời gian ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Whack bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nhận diện từ đúng trong thời gian ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 4 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-01 — Listening Boss — 5 — Tiếng Anh

## Prompt 276 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Listening Boss**.

**Mục tiêu học tập:** Nghe hiểu từ, cụm từ và câu ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Boss bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe hiểu từ, cụm từ và câu ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 277 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Listening Boss**.

**Mục tiêu học tập:** Nghe hiểu từ, cụm từ và câu ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Boss bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe hiểu từ, cụm từ và câu ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 278 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Listening Boss**.

**Mục tiêu học tập:** Nghe hiểu từ, cụm từ và câu ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Boss bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe hiểu từ, cụm từ và câu ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 279 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Listening Boss**.

**Mục tiêu học tập:** Nghe hiểu từ, cụm từ và câu ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Boss bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe hiểu từ, cụm từ và câu ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 280 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Listening Boss**.

**Mục tiêu học tập:** Nghe hiểu từ, cụm từ và câu ngắn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Listening Boss bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nghe hiểu từ, cụm từ và câu ngắn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-02 — Sentence Maze — 5 — Tiếng Anh

## Prompt 281 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Sentence Maze**.

**Mục tiêu học tập:** Xây dựng câu đúng ngữ pháp.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Maze bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng xây dựng câu đúng ngữ pháp. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 282 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Sentence Maze**.

**Mục tiêu học tập:** Xây dựng câu đúng ngữ pháp.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Maze bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng xây dựng câu đúng ngữ pháp. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 283 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Sentence Maze**.

**Mục tiêu học tập:** Xây dựng câu đúng ngữ pháp.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Maze bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng xây dựng câu đúng ngữ pháp. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 284 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Sentence Maze**.

**Mục tiêu học tập:** Xây dựng câu đúng ngữ pháp.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Maze bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng xây dựng câu đúng ngữ pháp. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 285 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Sentence Maze**.

**Mục tiêu học tập:** Xây dựng câu đúng ngữ pháp.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Sentence Maze bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng xây dựng câu đúng ngữ pháp. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-03 — Word Hunter — 5 — Tiếng Anh

## Prompt 286 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Word Hunter**.

**Mục tiêu học tập:** Tìm và sử dụng từ vựng theo ngữ cảnh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Hunter bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm và sử dụng từ vựng theo ngữ cảnh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 287 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Word Hunter**.

**Mục tiêu học tập:** Tìm và sử dụng từ vựng theo ngữ cảnh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Hunter bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm và sử dụng từ vựng theo ngữ cảnh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 288 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Word Hunter**.

**Mục tiêu học tập:** Tìm và sử dụng từ vựng theo ngữ cảnh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Hunter bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm và sử dụng từ vựng theo ngữ cảnh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 289 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Word Hunter**.

**Mục tiêu học tập:** Tìm và sử dụng từ vựng theo ngữ cảnh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Hunter bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm và sử dụng từ vựng theo ngữ cảnh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 290 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Word Hunter**.

**Mục tiêu học tập:** Tìm và sử dụng từ vựng theo ngữ cảnh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Word Hunter bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng tìm và sử dụng từ vựng theo ngữ cảnh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-04 — Grammar Gates — 5 — Tiếng Anh

## Prompt 291 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Grammar Gates**.

**Mục tiêu học tập:** Vận dụng ngữ pháp cơ bản.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grammar Gates bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng vận dụng ngữ pháp cơ bản. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 292 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Grammar Gates**.

**Mục tiêu học tập:** Vận dụng ngữ pháp cơ bản.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grammar Gates bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng vận dụng ngữ pháp cơ bản. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 293 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Grammar Gates**.

**Mục tiêu học tập:** Vận dụng ngữ pháp cơ bản.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grammar Gates bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng vận dụng ngữ pháp cơ bản. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 294 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Grammar Gates**.

**Mục tiêu học tập:** Vận dụng ngữ pháp cơ bản.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grammar Gates bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng vận dụng ngữ pháp cơ bản. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 295 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Grammar Gates**.

**Mục tiêu học tập:** Vận dụng ngữ pháp cơ bản.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Grammar Gates bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng vận dụng ngữ pháp cơ bản. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-05 — Cloze Canyon — 5 — Tiếng Anh

## Prompt 296 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Cloze Canyon**.

**Mục tiêu học tập:** Điền từ phù hợp vào đoạn văn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Cloze Canyon bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền từ phù hợp vào đoạn văn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 297 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Cloze Canyon**.

**Mục tiêu học tập:** Điền từ phù hợp vào đoạn văn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Cloze Canyon bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền từ phù hợp vào đoạn văn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 298 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Cloze Canyon**.

**Mục tiêu học tập:** Điền từ phù hợp vào đoạn văn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Cloze Canyon bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền từ phù hợp vào đoạn văn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 299 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Cloze Canyon**.

**Mục tiêu học tập:** Điền từ phù hợp vào đoạn văn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Cloze Canyon bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền từ phù hợp vào đoạn văn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 300 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Cloze Canyon**.

**Mục tiêu học tập:** Điền từ phù hợp vào đoạn văn.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Cloze Canyon bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng điền từ phù hợp vào đoạn văn. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-06 — Spelling Blaster — 5 — Tiếng Anh

## Prompt 301 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Spelling Blaster**.

**Mục tiêu học tập:** Đánh vần và viết đúng từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Blaster bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần và viết đúng từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 302 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Spelling Blaster**.

**Mục tiêu học tập:** Đánh vần và viết đúng từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Blaster bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần và viết đúng từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 303 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Spelling Blaster**.

**Mục tiêu học tập:** Đánh vần và viết đúng từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Blaster bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần và viết đúng từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 304 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Spelling Blaster**.

**Mục tiêu học tập:** Đánh vần và viết đúng từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Blaster bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần và viết đúng từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 305 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Spelling Blaster**.

**Mục tiêu học tập:** Đánh vần và viết đúng từ.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Spelling Blaster bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng đánh vần và viết đúng từ. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-07 — Phrase Builder — 5 — Tiếng Anh

## Prompt 306 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Phrase Builder**.

**Mục tiêu học tập:** Ghép cụm từ và câu theo mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Phrase Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép cụm từ và câu theo mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 307 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Phrase Builder**.

**Mục tiêu học tập:** Ghép cụm từ và câu theo mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Phrase Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép cụm từ và câu theo mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 308 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Phrase Builder**.

**Mục tiêu học tập:** Ghép cụm từ và câu theo mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Phrase Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép cụm từ và câu theo mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 309 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Phrase Builder**.

**Mục tiêu học tập:** Ghép cụm từ và câu theo mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Phrase Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép cụm từ và câu theo mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 310 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Phrase Builder**.

**Mục tiêu học tập:** Ghép cụm từ và câu theo mẫu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Phrase Builder bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép cụm từ và câu theo mẫu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-08 — Memory Triplet — 5 — Tiếng Anh

## Prompt 311 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Memory Triplet**.

**Mục tiêu học tập:** Ghép từ, nghĩa/tranh và câu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Memory Triplet bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ, nghĩa/tranh và câu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 312 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Memory Triplet**.

**Mục tiêu học tập:** Ghép từ, nghĩa/tranh và câu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Memory Triplet bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ, nghĩa/tranh và câu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 313 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Memory Triplet**.

**Mục tiêu học tập:** Ghép từ, nghĩa/tranh và câu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Memory Triplet bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ, nghĩa/tranh và câu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 314 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Memory Triplet**.

**Mục tiêu học tập:** Ghép từ, nghĩa/tranh và câu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Memory Triplet bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ, nghĩa/tranh và câu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 315 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Memory Triplet**.

**Mục tiêu học tập:** Ghép từ, nghĩa/tranh và câu.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Memory Triplet bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ghép từ, nghĩa/tranh và câu. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-09 — Voice Route — 5 — Tiếng Anh

## Prompt 316 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Voice Route**.

**Mục tiêu học tập:** Nói câu ngắn theo tình huống.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Voice Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nói câu ngắn theo tình huống. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 317 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Voice Route**.

**Mục tiêu học tập:** Nói câu ngắn theo tình huống.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Voice Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nói câu ngắn theo tình huống. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 318 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Voice Route**.

**Mục tiêu học tập:** Nói câu ngắn theo tình huống.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Voice Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nói câu ngắn theo tình huống. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 319 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Voice Route**.

**Mục tiêu học tập:** Nói câu ngắn theo tình huống.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Voice Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nói câu ngắn theo tình huống. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 320 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Voice Route**.

**Mục tiêu học tập:** Nói câu ngắn theo tình huống.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Voice Route bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng nói câu ngắn theo tình huống. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

# E5-10 — Island Review — 5 — Tiếng Anh

## Prompt 321 — V1 — CAMERA POINT

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Island Review**.

**Mục tiêu học tập:** Ôn tổng hợp kỹ năng tiếng Anh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Island Review bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; chấm chọn bằng đầu ngón trỏ; calibration 5 giây; confidence >= 0.65; smoothing; cooldown 350ms; hover không tính là trả lời.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp kỹ năng tiếng anh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 322 — V2 — CAMERA SWIPE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Island Review**.

**Mục tiêu học tập:** Ôn tổng hợp kỹ năng tiếng Anh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Island Review bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands; thao tác chính là swipe trái/phải hoặc swipe xuống; phát hiện vận tốc và hướng; confidence >= 0.65; debounce; cooldown 450ms; mouse fallback.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp kỹ năng tiếng anh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 323 — V3 — DRAG & GRAB

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Island Review**.

**Mục tiêu học tập:** Ôn tổng hợp kỹ năng tiếng Anh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Island Review bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Dùng MediaPipe Hands hoặc chuột cảm ứng; kéo thả vật/đáp án vào vùng mục tiêu; smoothing; trạng thái grab/release rõ ràng; confidence >= 0.65; cooldown 300ms.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp kỹ năng tiếng anh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 324 — V4 — VOICE

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Island Review**.

**Mục tiêu học tập:** Ôn tổng hợp kỹ năng tiếng Anh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Island Review bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Ưu tiên microphone và Web Speech API nếu trình duyệt hỗ trợ; người chơi nói đáp án/từ khóa; chỉ đánh giá nội dung có thể xác định chắc chắn; nếu không có speech recognition thì chuyển sang bàn phím.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp kỹ năng tiếng anh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---
## Prompt 325 — V5 — NO-CAMERA

## 🟡 MiTi — DẤU ẤN BẮT BUỘC TRONG GAME

Trong file HTML Gemini tạo ra, **bắt buộc nhúng chữ ký MiTi trực tiếp vào giao diện**, không tham chiếu repository hoặc asset bên ngoài.

- Logo: ô bo góc màu `#FFD84D` chứa chữ **M** màu `#07111F` + wordmark **MiTi** đậm + dấu **✦** nhỏ.
- Xuất hiện ở **Bắt đầu + HUD khi chơi + Kết quả**; nhỏ, không che vùng tương tác.
- Có dòng: **MiTi • Học bằng chuyển động**.
- Dùng inline SVG/CSS/HTML; không hotlink ảnh/logo.
- Không xóa hoặc thay đổi chữ **MiTi** ở các chế độ camera, fallback và replay.

Tạo một game giáo dục web **một file HTML duy nhất** dành cho học sinh Việt Nam lớp 5, môn Tiếng Anh, tên **Island Review**.

**Mục tiêu học tập:** Ôn tổng hợp kỹ năng tiếng Anh.

**Nhiệm vụ học sinh:** hoàn thành thử thách của Island Review bằng cách đưa ra đáp án đúng, sau đó xem giải thích ngắn bằng tiếng Việt.

**Biến thể điều khiển:** Không yêu cầu camera hoặc microphone; dùng chuột, cảm ứng và bàn phím; giữ nguyên mục tiêu học tập và gameplay; thiết kế để game vẫn vui và đầy đủ khi chạy trên máy không có camera.

**Gameplay:** tạo 12 lượt chơi. Mỗi lượt hiển thị một tình huống trực quan, 3–4 lựa chọn hoặc thao tác tương ứng với kỹ năng ôn tổng hợp kỹ năng tiếng anh. Đáp án đúng phải được xác định bằng dữ liệu rõ ràng, không sinh đáp án ngẫu nhiên không kiểm soát. Xáo trộn vị trí đáp án. Sau câu sai, giải thích vì sao sai và cho một câu luyện lại ở cuối vòng.

**Ngân hàng dữ liệu:** tạo tối thiểu 40 câu/tình huống có đáp án và lời giải ngắn, chia ít nhất 3 mức độ. Đưa vào dữ liệu các lỗi thường gặp của học sinh lớp 5 để làm phương án nhiễu. Không dùng nội dung vượt quá mục tiêu đã nêu.

**Luồng game:** Màn hình chào → hướng dẫn bằng tiếng Việt → 2 câu luyện mẫu → 12 lượt chính → bảng kết quả theo kỹ năng → luyện lại câu sai → chơi lại.

**Phản hồi học tập:** không chỉ hiện “Đúng/Sai”; phải chỉ ra đáp án, một bước giải thích trực quan và một mẹo ghi nhớ ngắn. Không thưởng tốc độ bằng cách làm giảm cơ hội học.

**UI:** chữ lớn, nút lớn, màu tương phản, tối ưu điện thoại/laptop, có chế độ giảm chuyển động. Tất cả tiêu đề, hướng dẫn, nút, feedback và thông báo lỗi phải bằng tiếng Việt. Các thuật ngữ tiếng Anh chỉ xuất hiện trong phần học Tiếng Anh cần thiết.

**Camera/privacy:** nếu dùng camera hoặc microphone, chỉ xin quyền sau khi người chơi bấm Bắt đầu; hiển thị trạng thái Đang kiểm tra → Đã sẵn sàng → Đang nhận diện; không gửi hoặc lưu dữ liệu camera/microphone. Luôn có nút “Chơi không cần camera/micro”.

**Kỹ thuật:** dùng HTML/CSS/JavaScript thuần; có thể dùng CDN MediaPipe nếu biến thể cần tracking; tách tracking khỏi game loop; smoothing; confidence threshold; debounce/cooldown; không coi hover là hành động nếu hành động yêu cầu swipe/grab/punch.

**Kết quả:** trả về toàn bộ mã HTML hoàn chỉnh, chạy được ngay khi lưu thành file .html. Không TODO, không pseudocode, không yêu cầu repository này, không phụ thuộc server backend.

---

## QA

Tổng số prompt: **325**. Công thức: 65 game × 5 biến thể. Các biến thể được thiết kế để cùng một mục tiêu học tập nhưng thay đổi cách tương tác, giúp Gemini Canvas tạo ra các phiên bản game khác nhau thay vì chỉ đổi màu giao diện.
