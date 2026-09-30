// Tầng "chất thể thao": mỗi mã điều khiển phải là một môn thể thao thật của giờ giáo dục thể
// chất, không phải một cú vung tay vô danh.
//
// Khảo sát 85 prompt trước vòng 18 (đếm chuỗi trong prompt game đã sinh):
//   "môn thể thao" 0/85   "đồng đội" 0/85   "tinh thần thể thao" 0/85
//   "bảng thành tích" 0/85   "duỗi cơ" 0/85   "tư thế chuẩn bị" 0/85   "hồi tĩnh" 0/85
//   "nhịp thở" 0/85   "vươn vai" 0/85   "khẩu hiệu" 0/85
// pe.mjs đã quản lý LIỀU vận động (khởi động, biên độ, trạm nghỉ, hạ nhiệt), lesson.mjs đã quản
// lý THỜI LƯỢNG và ĐỘ MỆT — nhưng không tầng nào nói động tác đó là động tác của MÔN nào. Hệ quả
// đo được: game webcam lớp 4 chỉ còn là "vung tay chọn đáp án", trẻ không hình dung mình đang tập
// một môn thể thao, và hạ nhiệt 45–60 giây không có động tác duỗi cụ thể nào để làm theo.

// Ràng buộc sư phạm: mọi động tác dưới đây đều đứng tại chỗ hoặc bước ngắn, không nhảy tiếp
// đất, không xoay nhanh quá 90 độ, không giữ tay cao quá 15 giây — đúng trần tải trọng pe.mjs.
export const SPORTS = {
  POINT: {
    mon: 'Bắn cung',
    dongTac: 'Giương tay chỉ đích',
    hieuLenh: 'Ngắm — phóng!',
    loiHay: 'Bạn ngắm chuẩn quá!',
    duoiCo: 'Duỗi vai và cổ tay',
  },
  SWIPE: {
    mon: 'Bóng bàn',
    dongTac: 'Quét vợt sang hai bên',
    hieuLenh: 'Giao bóng!',
    loiHay: 'Bạn đánh bóng mạnh!',
    duoiCo: 'Xoay cổ tay nhẹ nhàng',
  },
  PUNCH: {
    mon: 'Boxing',
    dongTac: 'Đấm về phía trước',
    hieuLenh: 'Một — hai!',
    loiHay: 'Bạn ra đòn gọn!',
    duoiCo: 'Duỗi ngực và vai mở',
  },
  GRAB: {
    mon: 'Bóng rổ',
    dongTac: 'Bắt bóng rồi đưa lên rổ',
    hieuLenh: 'Lên rổ!',
    loiHay: 'Bạn bắt bóng chắc!',
    duoiCo: 'Duỗi chân sau nhịp ném',
  },
  DRAG: {
    mon: 'Kéo co',
    dongTac: 'Kéo dây về phía mình',
    hieuLenh: 'Kéo nào!',
    loiHay: 'Bạn kéo khỏe lắm!',
    duoiCo: 'Duỗi lưng khi buông dây',
  },
  STEP: {
    mon: 'Điền kinh',
    dongTac: 'Bước dài sang làn kế',
    hieuLenh: 'Vào chỗ — chạy!',
    loiHay: 'Bạn chạy nhanh!',
    duoiCo: 'Duỗi chân và bắp chuối',
  },
  TWO_HAND_STRETCH: {
    mon: 'Bơi lội',
    dongTac: 'Khai tay bơi tại chỗ',
    hieuLenh: 'Bơi nào!',
    loiHay: 'Bạn bơi đều tay!',
    duoiCo: 'Duỗi lưng bơi ếch đứng',
  },
  TWO_HAND_BALANCE: {
    mon: 'Thể dục dụng cụ',
    dongTac: 'Đứng một chân giang tay',
    hieuLenh: 'Đứng vững!',
    loiHay: 'Bạn giữ thăng bằng giỏi!',
    duoiCo: 'Duỗi trụ và gót chân',
  },
  ANGLE_POSE: {
    mon: 'Cử tạ',
    dongTac: 'Giữ tạ ngang vai',
    hieuLenh: 'Giữ nào!',
    loiHay: 'Bạn giữ chắc tay!',
    duoiCo: 'Duỗi vai xuống tay buông',
  },
  VOICE: {
    mon: 'Đồng diễn',
    dongTac: 'Hô khẩu hiệu đội',
    hieuLenh: 'Hô to nào!',
    loiHay: 'Bạn hô to rõ!',
    duoiCo: 'Thở sâu, vai hạ dần',
  },
  CLAP: {
    mon: 'Thể dục nhịp điệu',
    dongTac: 'Vỗ tay theo nhịp cao thấp',
    hieuLenh: 'Theo nhịp!',
    loiHay: 'Bạn bắt nhịp chuẩn!',
    duoiCo: 'Duỗi hông khi hạ nhịp',
  },
  PINCH: {
    mon: 'Phi tiêu',
    dongTac: 'Ngắm rồi phóng phi tiêu',
    hieuLenh: 'Trúng rồi!',
    loiHay: 'Bạn ngắm rất tập trung!',
    duoiCo: 'Duỗi ngón tay buông lỏng',
  },
  HOLD_POSE: {
    mon: 'Yoga',
    dongTac: 'Giữ tư thế cây ba giây',
    hieuLenh: 'Im nào!',
    loiHay: 'Bạn giữ chắc chắn!',
    duoiCo: 'Thở ra, cúi người duỗi',
  },
  FINGER_COUNT: {
    mon: 'Nhảy dây',
    dongTac: 'Giơ ngón đếm nhịp nhảy',
    hieuLenh: 'Nhảy đi!',
    loiHay: 'Bạn đếm đúng nhịp!',
    duoiCo: 'Duỗi cổ chân ngồi thấp',
  },
};

export function sport(code) {
  const s = SPORTS[code];
  if (!s) throw new Error(`Thiếu dòng môn thể thao cho mã điều khiển: ${code} — bổ sung tools/data/sports.mjs.`);
  return s;
}

export const SPORT_KEYS = Object.keys(SPORTS);
