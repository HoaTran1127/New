# ✅ BẢNG KIỂM NGHIỆM THU GAME MiTi

> Do `tools/build-acceptance.mjs` sinh ra từ `CORE_LINES` trong `tools/lib/core.mjs`. Đừng sửa tay file này — đổi ràng buộc cốt lõi trong lib rồi chạy lại script.
> Dùng khi: bạn vừa dán một prompt vào **Google Gemini (chế độ Canvas)**, nhận về một file HTML, và cần biết nó có đạt chuẩn MiTi không trước khi cho học sinh chơi; in ra giấy hoặc mở trên điện thoại.

## A. 14 mục theo ràng buộc cốt lõi — làm theo đúng từng dòng

- [ ] 1 file HTML duy nhất: `<style>`/`<script>` nội tuyến; không Tailwind Play CDN, không .css/.js/.json/mp3 ngoài; đồ hoạ VẼ BẰNG SVG INLINE / CSS / CANVAS 2D do code tự sinh (mascot, nền, đạo cụ là hình vector chi tiết đúng bảng màu, không dùng file ảnh ngoài); cấm bịa URL ảnh, cấm base64, cấm emoji thay ảnh; chỉ tải MediaPipe (CDN + model) và font có dự phòng.
  - Cách thử: Mở file nguồn, tìm `<link`, `<script src`, `fetch(`, `http` trong `src=`: ngoài MediaPipe và font, ảnh phải là `.webp` nội tuyến trong `assets/`; xoá tạm một file ảnh thì game vẫn chơi.
- [ ] Camera mặc định TẮT, có nút bật/tắt không cần tải lại trang; chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU; trạng thái bằng tiếng Việt (Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi + nút Thử lại). Không upload ảnh/video, chỉ giữ landmark trong bộ nhớ, không thu thập dữ liệu cá nhân.
  - Cách thử: Mở game mới tinh: vào tới màn Bắt đầu không bị hỏi quyền camera; bấm BẮT ĐẦU rồi mới thấy lời xin quyền, trạng thái bằng tiếng Việt.
- [ ] MediaPipe Tasks Vision, import từ `@mediapipe/tasks-vision@1.0.1`; cấu hình `getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } })`, lật gương ngang cả khi hiển thị lẫn khi tính tọa độ; trình duyệt chặn camera thì báo một dòng tiếng Việt rồi vào thẳng chế độ không camera.
  - Cách thử: Tìm chuỗi `tasks-vision@1.0.1` và `facingMode: "user"` trong nguồn; bật camera lên thì hình phải lộn gương như soi kính.
- [ ] Mọi tọa độ đi qua `toScreen(lx, ly)`; nền AR là chính khung hình camera với lớp phủ tối không vượt 0.45; vật thể có `z`, có bóng dưới chân và có ít nhất một vật ảo neo vào landmark cơ thể.
  - Cách thử: Cho một em đứng lệch trái khung hình: vật thể AR và bóng dưới chân phải đi theo em, không lệch pha; chữ vẫn đọc được sau lớp phủ.
- [ ] Cử chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng + cooldown + ngưỡng tin cậy; hover không tính là đã chọn; giữ nguyên tư thế không được spam event và không bị trừ tim; confidence thấp thì không chốt đáp án.
  - Cách thử: Giữ im một tư thế 5 giây trước camera: không được spam cú chốt và không bị trừ tim; đưa tay lướt qua đáp án mà chưa giữ cũng không chốt.
- [ ] FALLBACK bắt buộc: chuột / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính; có nhãn "Chế độ không dùng camera"; mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.
  - Cách thử: Tắt camera giữa vòng chơi rồi chơi trọn một phiên bằng chuột: vẫn đủ 12 lượt và mọi mục tiêu học tập, có nhãn "Chế độ không dùng camera".
- [ ] Không điểm số, không xếp hạng, không timer thi đua. Sai không phạt bằng cách biến mất kiến thức: dừng 2 giây và hiện lời giải đầy đủ bằng tiếng Việt, chỉ rõ chữ số / bước / từ cần sửa.
  - Cách thử: Cố tình trả lời sai một câu: màn dừng 2 giây và hiện lời giải đầy đủ tiếng Việt, chỉ rõ chữ số / bước / từ cần sửa; không có đồng hồ đua.
- [ ] Vận động thật: mỗi lượt một động tác rộng cả tay và thân, không nhấc ngón ngay trước ngực. Theo 5 bước: Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính, kèm Khởi động 60–90 giây và Hạ nhiệt 45–60 giây; một phiên ≤10 phút để vừa tiết 45 phút.
  - Cách thử: Xem trọn một phiên: có khởi động 60–90 giây, 2 lượt luyện mẫu trước 12 lượt chính, mỗi lượt một động tác rộng cả tay và thân, hạ nhiệt cuối phiên; tổng ≤10 phút.
- [ ] Lớp 4 em: một em chơi, ba em chờ có việc thật (đếm nhịp, cổ vũ, theo dõi đáp án), luân phiên theo sĩ số M với thời gian chờ ≤20 giây và nhãn "đến lượt em"; thành tích ghi cho cả đội, không so cá nhân.
  - Cách thử: Cho bốn em đứng quanh một máy: ba em chưa tới lượt phải có việc thật (đếm nhịp, cổ vũ, theo dõi đáp án), đổi lượt ≤20 giây, có nhãn "đến lượt em".
- [ ] Mọi học sinh dùng được: không chỉ báo hiệu bằng màu (kèm hình hoặc chữ), phụ đề tiếng Việt cho mọi âm thanh, chữ đề ≥28px desktop và ≥20px điện thoại, responsive dọc và ngang, nút Giảm hiệu ứng chuyển động, không nhấp nháy quá 3Hz, vùng chơi an toàn có thảm/cọc tiêu cảnh báo và nút "Chơi chậm lại" không bị trừ tim.
  - Cách thử: Che màn hình bằng một tay tưởng tượng mất màu: còn phân biệt đúng/sai bằng hình và chữ không; đọc đề bằng điện thoại đặt dọc chữ còn ≥20px; bấm nút Giảm hiệu ứng.
- [ ] Tab ẩn hoặc mất tiêu điểm là tự Pause, quay lại đếm 3-2-1. Máy yếu: nhận diện 1 lần mỗi 2–3 khung hình, particle dùng pool, tự giảm chi tiết khi FPS tụt.
  - Cách thử: Switch sang tab khác 10 giây rồi quay lại: game phải tự Pause và đếm 3-2-1 trước khi chơi tiếp.
- [ ] Mỗi lượt chỉ một ý, đề ≤16 từ. Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi và lời giải bằng TIẾNG VIỆT (học liệu tiếng Anh giữ nguyên tiếng Anh); không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trước mặt học sinh.
  - Cách thử: Đọc to đề câu đầu tiên một lần: nghe một lần là hiểu phải làm gì; quét màn hình tìm chữ kỹ thuật (confidence, cooldown, fallback) — không được hiện.
- [ ] Chữ ký MiTi: ô bo góc `#FFD84D` chứa chữ M màu `#07111F` + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; kèm dòng "MiTi • Học bằng chuyển động"; không xóa hay đổi tên ở chế độ không camera.
  - Cách thử: Kiểm logo MiTi ở cả ba màn Bắt đầu / HUD khi chơi / Kết quả, kèm dòng "MiTi • Học bằng chuyển động"; tắt camera vẫn còn nguyên.
- [ ] Chỉ xuất toàn bộ file HTML hoàn chỉnh: không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không giải thích dài.
  - Cách thử: Không dòng TODO, không "...", không pseudocode trong file; mở Console trình duyệt: hết một phiên không có lỗi đỏ.

Bản không camera (chơi bằng chuột/cảm ứng) vẫn phải đạt toàn bộ mục A, riêng mục camera thì kiểm phần lời hứa "vào thẳng chế độ không camera".

## B. 6 việc người thử phải làm tay — không tool nào thay được

1. ☐ Đưa cho một học sinh lớp 4 chưa từng đọc hướng dẫn chơi thử 60 giây — em có tự hiểu phải làm gì không?
2. ☐ Rút mạng lúc game đang tải model — có thông báo tiếng Việt rồi vào thẳng chế độ không camera, chơi được tiếp không?
3. ☐ Đứng xa camera tới mức chỉ còn thấy hai bàn tay — game có hạ cơ chế xuống mức "chỉ thấy tay" hay đứng màn chờ?
4. ☐ Cố tình sai 4 câu liên tiếp — câu thứ 4 có về mức dễ cùng loại lỗi, hiện lời giải từng bước và không trừ tim lần hai?
5. ☐ Bật sẵn Giảm hiệu ứng chuyển động (prefers-reduced-motion) trong hệ điều hành rồi mở game — hiệu ứng có tắt sẵn mà nội dung học vẫn nguyên?
6. ☐ Mở bằng điện thoại đặt dọc — đề bài còn ≥20px, hai tay còn trong khung hình, bố cục không bị cắt?

---

## C. Khi có dòng chưa đạt

Không tay sửa file HTML. Dán lại nguyên văn dòng ràng buộc tương ứng trong `tools/lib/core.mjs` vào cuối prompt (khối "3. RÀNG BUỘC CỐT LÕI"), sinh lại file rồi kiểm lại từ đầu. Sau hai lần vẫn lỗi → báo lại dòng nào chưa đạt kèm một câu nguyên nhân quan sát được.

## D. Biên bản

| Ô | Điền |
| :-- | :-- |
| Tên game | |
| Mã prompt (ví dụ `L4-01` hoặc `LEG-01`) | |
| Kiểu điều khiển đã chơi (camera / chuột-cảm ứng) | |
| Máy dùng để thử | |
| Người nghiệm thu · ngày giờ | |
| Số mục A đạt | ____ / 14 |
| Số việc B đạt | ____ / 6 |
| Kết luận | ☐ Đưa vào tiết học ☐ Sửa prompt rồi kiểm lại |

**Riêng tư:** bảng này chỉ tồn tại trên máy của bạn; game không upload ảnh, video hay kết quả nghiệm thu lên bất kỳ máy chủ nào.

*Miti • Học bằng chuyển động — bản chuẩn: `prompts/00-master-canvas-prompt.md` · 86 prompt: `catalogs/GAME_CATALOG.md`*
