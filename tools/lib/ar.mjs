// Hợp đồng AR: thiếu một dòng là game chỉ còn canvas 2D có webcam kèm theo.
// build-prompts.mjs và build-variants.mjs cùng dùng khối này, validate.mjs kiểm đúng các từ khóa này.

export const AR_RENDER = `- NỀN AR (nguyên tắc gốc): khung hình webcam CHÍNH LÀ màn chơi, không phải ảnh nền trang trí. Vẽ video vào canvas ở mỗi khung hình, lật gương + cover-fit (cắt viền, không giãn hình):
    scale = Math.max(W / video.videoWidth, H / video.videoHeight)
    drawW = video.videoWidth * scale;  drawH = video.videoHeight * scale
    offX = (W - drawW) / 2;            offY = (H - drawH) / 2
    ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1); ctx.drawImage(video, offX, offY, drawW, drawH); ctx.restore();
  (Hoặc cách 2: thẻ video object-fit:cover phủ kín 100vw/100vh với opacity:1 rồi canvas trong suốt đè khít lên trên. Chọn một cách, không trộn lẫn.)
- Đọc chữ trên nền thật: phủ ĐÚNG MỘT lớp rgba(8,5,20,0.4) lên khung hình, alpha không vượt 0.45 (vẫn phải nhìn rõ người thật). Mỗi thẻ và đề bài phải tự có nền gradient + viền stroke + bóng, không phụ thuộc lớp phủ này.
- HÀM CHIẾU DUY NHẤT: toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH }, trong đó lx, ly là landmark chuẩn hóa 0..1.
  Vẽ video, vị trí spawn, va chạm, vật neo vào người và mọi hiệu ứng đều đi qua toScreen. CẤM viết lx * W hoặc ly * H: camera bị crop thì vật thể bay lệch khỏi người học sinh, mất hẳn chất AR.
- CHIỀU SÂU: mỗi vật thể mang z từ 1.6 (xa) về 0.35 (sát mặt người chơi); kích thước vẽ = cỡ gốc / z, vật xa nhỏ và hơi mờ, vật gần to và rực; vẽ ellipse bóng mờ dưới chân vật trên "sàn" ảo; thêm đường tốc độ (speed lines) dọc hai bên mép khi nhịp game nhanh lên.
- NEO VÀO CƠ THỂ: vật thể ảo phải đeo hoặc buộc vào landmark thật và cập nhật mỗi khung hình — cổ tay tay = landmark 0, khuỷu = 13/14, vai = 11/12, hông = 23/24, mũi = 0, tâm bàn tay = trung bình landmark 5, 9, 13, 17. Mất landmark hoặc confidence tụt thì vật neo biến mất kèm hướng dẫn tiếng Việt, không được nhảy lung tung.`;

// Bản rút gọn cho prompt biến thể (viết liền mạch, không xuống dòng code).
export const AR_SHORT = 'khung hình webcam CHÍNH LÀ màn chơi — vẽ video vào canvas mỗi khung hình theo cover-fit scale = Math.max(W / video.videoWidth, H / video.videoHeight) rồi lật gương; phủ đúng một lớp rgba(8,5,20,0.4) (alpha không vượt 0.45); mọi tọa độ landmark 0..1 đi qua hàm chiếu duy nhất toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH }, cấm lx * W; vật thể mang chiều sâu z từ 1.6 về 0.35, vẽ to lên theo 1/z kèm ellipse bóng dưới chân; ít nhất một vật ảo neo vào landmark cơ thể (cổ tay 0, khuỷu 13/14, vai 11/12, tâm bàn tay 5/9/13/17) và cập nhật mỗi khung hình.';

export const TASKS_VISION = {
  bundle: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs',
  wasm: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm',
  hand: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
  pose: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
};
