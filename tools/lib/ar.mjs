// Hợp đồng AR: thiếu một dòng là game chỉ còn canvas 2D có webcam kèm theo.
// validate.mjs kiểm đúng các cụm: toScreen(lx, ly), Math.max(W / video.videoWidth, alpha không vượt 0.45, z từ 1.6, NEO VÀO CƠ THỂ.
export const AR_RENDER = `- NỀN AR: khung hình webcam CHÍNH LÀ màn chơi. Mỗi khung vẽ video vào canvas, lật gương + cover-fit (cắt viền, không giãn):
    scale = Math.max(W / video.videoWidth, H / video.videoHeight)
    drawW = video.videoWidth * scale;  drawH = video.videoHeight * scale
    offX = (W - drawW) / 2;            offY = (H - drawH) / 2
    ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1); ctx.drawImage(video, offX, offY, drawW, drawH); ctx.restore();
- Phủ ĐÚNG MỘT lớp rgba(8,5,20,0.4), alpha không vượt 0.45; thẻ và đề tự có nền gradient + viền + bóng.
- HÀM CHIẾU DUY NHẤT: toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH } (lx, ly chuẩn hóa 0..1); spawn, va chạm, vật neo, hiệu ứng đều qua toScreen, CẤM lx * W hoặc ly * H.
- CHIỀU SÂU: vật thể mang z từ 1.6 (xa) về 0.35 (sát người chơi); cỡ vẽ = cỡ gốc / z; ellipse bóng mờ dưới vật.
- NEO VÀO CƠ THỂ: vật ảo buộc vào landmark thật, cập nhật mỗi khung — cổ tay 0, khuỷu 13/14, vai 11/12, hông 23/24, tâm bàn tay = trung bình 5, 9, 13, 17; mất landmark thì ẩn vật kèm hướng dẫn tiếng Việt.`;
// Bản một dòng cho legacy (sharedRuleLines compact): giữ đủ năm cụm validate kiểm.
export const AR_COMPACT =
  '- NỀN AR: video webcam lật gương CHÍNH LÀ màn chơi, cover-fit scale = Math.max(W / video.videoWidth, H / video.videoHeight); mọi tọa độ qua toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH }, CẤM lx * W; ĐÚNG MỘT lớp phủ tối, alpha không vượt 0.45; vật mang z từ 1.6 (xa) về 0.35 (gần), cỡ = cỡ gốc / z; NEO VÀO CƠ THỂ: vật ảo buộc vào landmark thật mỗi khung, mất landmark thì ẩn kèm hướng dẫn tiếng Việt.';
export const TASKS_VISION = {
  bundle: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs',
  wasm: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm',
  hand: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
  pose: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
};
