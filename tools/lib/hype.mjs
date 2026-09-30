// CAO TRÀO của ván: cú "ồ" mở màn, hiệp quyết định, nghi thức mở thưởng — phần "muốn chơi lại"
// mà tools/lib/feel.mjs (cảm giác từng cú chạm) chưa phủ. Thi đua giữa các em (Scoreboard, Podium,
// danh hiệu, catch-up) nằm ở tools/lib/compete.mjs; kỷ lục cá nhân + vệt ghost cho N = 1 ở COMPETE.solo.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
export const HYPE = {
  // Ba giây đầu quyết định em có tin đây là game thật không.
  hook:
    'Ba giây đầu: vừa vào gameplay (trước lượt 1), một vật thể AR lớn bay ngang sát người chơi kèm vệt neon và tiếng "vút"; mascot nói đúng một dòng nhiệm vụ, chữ >= 44px. Không mở màn bằng chữ dài (hướng dẫn ở nút "Xem cách chuyển động"). Không camera: vệt sáng trên nền tối; Giảm hiệu ứng: vật trượt chậm, không rung.',
  // Ba hiệp phải khác nhau về độ căng; trạm nghỉ giữa hiệp (trước đây MOTION.breather) nằm ở đây.
  climax:
    'Ba hiệp leo thang (chia đều số Main_Turn): hiệp 1 nền tĩnh, thẻ 4,5 giây; hiệp 2 viền HUD sáng dần theo combo, thẻ 3,75 giây; hiệp 3 "HIỆP QUYẾT ĐỊNH" nhân đôi điểm (hệ số không vượt x2), mascot hô mở hiệp, nhạc nhanh hơn. Giữa hai hiệp: trạm nghỉ 5 giây đếm 5-4-3-2-1, không tính sai, không mất tim. Ngân hàng câu và mức độ không đổi theo hiệp; sai ở hiệp 3 không phạt nặng hơn.',
  // Chờ đợi phần thưởng là động lực, nhưng phần thưởng không được đổi nội dung học.
  reveal:
    'Mở thưởng cuối mỗi hiệp: 2,5 giây quay qua ba phương án (thẻ bộ sưu tập / +10 điểm / một câu dễ hơn một bậc) rồi dừng kèm tiếng "tách"; luôn có thưởng, không đổi level thích ứng. Giảm hiệu ứng hoặc không camera: hiện ngay bằng chữ + nút "Nhận".',
};
