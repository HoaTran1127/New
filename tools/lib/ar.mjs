// Hợp đồng AR: thiếu một dòng là game chỉ còn canvas 2D có webcam kèm theo.
// build-prompts.mjs và build-variants.mjs cùng dùng khối này, validate.mjs kiểm đúng các từ khóa này.
//
// VÒNG 3 (2026-09-30) — vì sao phải tách khối: 39/39 file trong prompts/giao-an/ mang nguyên văn
// khối AR của game, trong đó có "khung hình webcam CHÍNH LÀ màn chơi", "vị trí spawn", "va chạm",
// "speed lines", "điểm, tim, mascot". Cùng lúc đó LESSON.noGame trong chính file lại cấm mascot và
// điểm, còn LESSON.teacher buộc bảng chiếm >= 70% màn chiếu — nghĩa là ba lệnh mâu thuẫn nhau được
// phát cùng một lúc cho mô hình. Hệ quả kỹ thuật thật: AR_RENDER vẽ video phủ kín 100vw/100vh và
// chiếu landmark theo (offX, offY, drawW, drawH) của CẢ khung hình, nên khi bảng phải nằm trong 70%
// thì nét phấn vẫn tính theo khung hình đầy đủ → tay em học sinh một nơi, nét phấn một nơi.
// Cách sửa: giữ nguyên khối game (85 prompt không được phép đổi), tách bốn mảnh kỹ thuật dùng chung
// và viết AR_LESSON cho hình học của màn chiếu — video là một PANEL soi tay, không phải nền lớp học.

// ---- Bốn mảnh kỹ thuật dùng chung, viết MỘT lần để hai bộ prompt không trôi nhau ----

// Công thức cover-fit + lật gương. Bộ game vẽ ra cả khung hình, bộ giáo án vẽ vào panel.
const COVER_FIT = `Vẽ video vào canvas ở mỗi khung hình, lật gương + cover-fit (cắt viền, không giãn hình):
    scale = Math.max(W / video.videoWidth, H / video.videoHeight)
    drawW = video.videoWidth * scale;  drawH = video.videoHeight * scale
    offX = (W - drawW) / 2;            offY = (H - drawH) / 2
    ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1); ctx.drawImage(video, offX, offY, drawW, drawH); ctx.restore();`;

const COVER_FIT_ALT = `(Hoặc cách 2: thẻ video object-fit:cover phủ kín 100vw/100vh với opacity:1 rồi canvas trong suốt đè khít lên trên. Chọn một cách, không trộn lẫn.)`;

const TO_SCREEN_CORE = `HÀM CHIẾU DUY NHẤT: toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH }, trong đó lx, ly là landmark chuẩn hóa 0..1.`;

const ANCHOR = `NEO VÀO CƠ THỂ: vật thể ảo phải đeo hoặc buộc vào landmark thật và cập nhật mỗi khung hình — cổ tay tay = landmark 0, khuỷu = 13/14, vai = 11/12, hông = 23/24, mũi = 0, tâm bàn tay = trung bình landmark 5, 9, 13, 17. Mất landmark hoặc confidence tụt thì vật neo biến mất kèm hướng dẫn tiếng Việt, không được nhảy lung tung.`;

export const AR_RENDER = `- NỀN AR (nguyên tắc gốc): khung hình webcam CHÍNH LÀ màn chơi, không phải ảnh nền trang trí. ${COVER_FIT}
  ${COVER_FIT_ALT}
- Đọc chữ trên nền thật: phủ ĐÚNG MỘT lớp rgba(8,5,20,0.4) lên khung hình, alpha không vượt 0.45 (vẫn phải nhìn rõ người thật). Mỗi thẻ và đề bài phải tự có nền gradient + viền stroke + bóng, không phụ thuộc lớp phủ này.
- ${TO_SCREEN_CORE}
  Vẽ video, vị trí spawn, va chạm, vật neo vào người và mọi hiệu ứng đều đi qua toScreen. CẤM viết lx * W hoặc ly * H: camera bị crop thì vật thể bay lệch khỏi người học sinh, mất hẳn chất AR.
- CHIỀU SÂU: mỗi vật thể mang z từ 1.6 (xa) về 0.35 (sát mặt người chơi); kích thước vẽ = cỡ gốc / z, vật xa nhỏ và hơi mờ, vật gần to và rực; vẽ ellipse bóng mờ dưới chân vật trên "sàn" ảo; thêm đường tốc độ (speed lines) dọc hai bên mép khi nhịp game nhanh lên.
- ${ANCHOR}`;

// Bản rút gọn cho prompt biến thể (viết liền mạch, không xuống dòng code).
export const AR_SHORT = 'khung hình webcam CHÍNH LÀ màn chơi — vẽ video vào canvas mỗi khung hình theo cover-fit scale = Math.max(W / video.videoWidth, H / video.videoHeight) rồi lật gương; phủ đúng một lớp rgba(8,5,20,0.4) (alpha không vượt 0.45); mọi tọa độ landmark 0..1 đi qua hàm chiếu duy nhất toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH }, cấm lx * W; vật thể mang chiều sâu z từ 1.6 về 0.35, vẽ to lên theo 1/z kèm ellipse bóng dưới chân; ít nhất một vật ảo neo vào landmark cơ thể (cổ tay 0, khuỷu 13/14, vai 11/12, tâm bàn tay 5/9/13/17) và cập nhật mỗi khung hình.';

// ---- Khối AR của CÔNG CỤ GIẢNG BÀI: màn chiếu có bảng phấn, camera chỉ là cửa sổ soi tay ----

export const AR_LESSON = `- BỐ CỤC MÀN CHIẾU (khác bản game ở đúng chỗ này): webcam KHÔNG phải nền trang trí phủ kín lớp học và KHÔNG phải "màn chơi". Bảng phấn là nhân vật chính, chiếm >= 70% diện tích màn chiếu; khung hình camera chỉ hiện trong MỘT PANEL soi tay dựng ở cột biên (rộng >= 24% diện tích màn chiếu) và chỉ khi có học sinh đang lên bảng — giáo viên bấm "Ẩn camera" thì panel đóng lại và mặt bảng được mở rộng, tiết dạy không đổi bố cục. ${COVER_FIT.replace('Vẽ video vào canvas ở mỗi khung hình', 'Vẽ video vào panel ở mỗi khung hình, với camX/camY/camW/camH là chữ nhật panel đã khoá bằng hiệu ứng neo panel chứ không đổi theo từng khung hình')}
  ${COVER_FIT_ALT.replace('phủ kín 100vw/100vh với opacity:1 rồi canvas trong suốt đè khít lên trên', 'đặt trong panel bằng object-fit:cover rồi canvas trong suốt đè khít lên panel')}
- Chữ trên nền camera: lớp phủ chỉ nằm TRONG panel (rgba(8,5,20,0.35), alpha không vượt 0.45, vẫn nhìn rõ người thật); mặt bảng phấn KHÔNG bị phủ tối, vì cả lớp nhìn bảng chứ không nhìn nền. Nhãn "em đang đứng trước bảng" và trạng thái nhận diện chỉ viết trong panel.
- HÀM CHIẾU DUY NHẤT: ${TO_SCREEN_CORE.replace('{ x: offX + (1 - lx) * drawW, y: offY + ly * drawH }', '{ x: camX + (1 - lx) * camW, y: camY + ly * camH }')} Toàn bộ landmark chỉ đi qua hàm chiếu này, CẤM viết lx * W hoặc ly * H. Điểm bàn tay sau khi chiếu là điểm MÀN CHIẾU, không phải điểm trên bảng — vì bảng nằm ở vùng khác panel.
- ÁNH XẠ TAY → MẶT BẢNG (quy định làm nên chất AR của công cụ giảng bài, thiếu nó thì tay một nơi nét phấn một nơi): dựng một phép biến đổi tuyến tính duy nhất boardFrom(cam) = { bx: ox + sx * (x - cx) / (dx - cx), by: oy + sy * (y - cy) / (dy - cy) } đưa điểm bàn tay từ một HÌNH CHỮ NHẬT TẦM TAY đã hiệu chỉnh về đúng hình chữ nhật mặt bảng. Bốn góc tầm tay lấy lúc calibration: giáo viên hoặc em lên bảng chạm bốn góc bảng bằng chuột (hoặc đặt tay ở bốn góc tầm với rồi bấm "Chốt tầm tay"), suy ra cx, cy, dx, dy và ánh xạ toàn bộ tầm với đó phủ kín mặt bảng. Bắt buộc: (a) một điểm bàn tay chỉ có MỘT ảnh chiếu trên bảng, không được nhân bản; (b) ngoài tầm đã hiệu chỉnh thì nét dừng ở mép bảng chứ không nhảy vọt; (c) đổi cỡ cửa sổ thì tính lại ox/oy/sx/sy theo tỉ lệ, không dùng toạ độ pixel đã chốt; (d) độ trễ giữa chuyển động tay và nét phấn < 150 ms, đo thật bằng performance.now() giữa hai khung hình và hiển thị con số đó ở panel.
- CHIỀU SÂU của vật thật trên bảng: mỗi vật vẽ phấn có z từ 1.6 (xa) về 0.35 (sát mặt người) cho khối 3D và bóng ellipse mờ dưới chân trên "sàn" ảo của mặt bảng; KHÔNG có speed lines, không có vật thể bay, không có spawn, không có va chạm — đây là tiết học, mọi chuyển động là thao tác giảng bài có chủ đích của giáo viên.
- ${ANCHOR} Ở công cụ giảng bài thì vật neo là viên phấn ảo, khay vật thật và thẻ đáp án nằm ở mặt bảng; phần thân học sinh trong panel không bị đè chữ.`;

export const AR_LESSON_SHORT =
  'bảng >= 70% màn chiếu, camera chỉ là panel soi tay >= 24% ở cột biên và đóng được · lớp phủ tối chỉ trong panel, mặt bảng không bị phủ tối · landmark đi qua toScreen theo chữ nhật panel (camX/camY/camW/camH), cấm lx * W · có phép biến đổi tay→mặt bảng hiệu chỉnh bằng bốn góc tầm tay, một điểm tay có đúng một điểm bảng, ngoài tầm thì nét dừng ở mép, đổi cỡ cửa sổ thì tính lại tỉ lệ, độ trễ nét < 150 ms có hiển thị con số · vật ảo có z và bóng dưới chân nhưng không speed lines, không vật bay, không spawn, không va chạm';

export const TASKS_VISION = {
  bundle: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs',
  wasm: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm',
  hand: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
  pose: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
};
