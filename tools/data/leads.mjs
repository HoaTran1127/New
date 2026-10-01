// Ba động tác "bạn dẫn" cho mười bốn mã điều khiển — tầng thứ hai mươi tư của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm chuỗi NFC trong prompts/0X-*/):
//   "em làm mẫu" 0/85 · "bạn làm mẫu" 0/85 · "bắt chước" 0/85 · "người dẫn" 0/85 · "em dẫn" 0/85
//   · "nhìn bạn" 0/85 · "làm theo bạn" 0/85 · "đồng diễn" 0/85 · "nhịp chung" 0/85
//   — ngược lại "mascot làm mẫu" 85/85 với trung bình 8 lần xuất hiện trong một prompt,
//   và 85/85 "làm mẫu" đều có chủ ngữ là mascot.
// Nghĩa là trong cả 85 game, người làm mẫu động tác LUÔN là máy; chưa tầng nào đặt một em lên vị trí
// bạn khác phải nhìn và bắt chước. Đây đúng là hoạt động mở đầu mọi tiết Thể dục lớp 4–5 ("cô trò dẫn
// nhau"), và là cách trẻ học động tác nhanh nhất — nhìn bạn rồi làm theo, không phải nghe máy mô tả.
//
// Danh sách chặn trước khi soạn (lấy từ các tầng đã có, không đặt trần mới):
// pe.mjs cấm nhảy rồi tiếp đất, cấm hai tay trên cao liên tục quá 15 giây, tối đa 3/12 lượt cúi thấp;
// playzone.mjs bản "dép lê" bỏ mọi động tác nhấc chân cao và đứng một chân, bản "lớp mình chật" đổi
// động tác di chuyển thành tại chỗ; sport.mjs đã có động tác đặc trưng của môn nên 42 dòng dưới đây
// KHÔNG trùng cột `dongTac`; folk.mjs đã loại "Nhảy lò cò", "Trồng cây chuối", "Bịt mắt bắt dê".
// Vì vậy mọi động tác ở đây là bản tại chỗ, tầm thấp, giữ trong vòng 1 sải tay và hình quạt 90 độ,
// để thẻ "Bạn dẫn" dùng được cho cả bốn bản mà không phải viết thêm luật tránh né.

import { SPORT_KEYS } from './sports.mjs';

// Ba động tác mỗi mã điều khiển, mỗi động tác <= 6 từ, em dẫn chọn MỘT và làm trong 5 giây.
export const LEADS = {
  POINT: [
    'Đưa một tay lên cao',
    'Chỉ tay ngang vai trái',
    'Hạ tay xuống đầu gối',
  ],
  SWIPE: [
    'Quét tay ngang trước bụng',
    'Gạt tay từ phải sang',
    'Vẽ tay vòng trước ngực',
  ],
  PUNCH: [
    'Đấm tay trái ra trước',
    'Đấm tay phải ra trước',
    'Đấm hai tay so le',
  ],
  GRAB: [
    'Nắm tay kéo về ngực',
    'Với tay lên rồi nắm',
    'Mở tay đẩy ra trước',
  ],
  DRAG: [
    'Kéo tay ngang qua người',
    'Đẩy tay ra trước chậm',
    'Vuốt tay từ cao xuống',
  ],
  STEP: [
    'Dậm chân tại chỗ',
    'Bước nhỏ sang bên trái',
    'Bước nhỏ sang bên phải',
  ],
  TWO_HAND_STRETCH: [
    'Duỗi hai tay ngang vai',
    'Vòng hai tay trước ngực',
    'Giơ hai tay chữ Y',
  ],
  TWO_HAND_BALANCE: [
    'Dang tay giữ thăng bằng',
    'Đứng yên một tay trước',
    'Chụm hai tay trước ngực',
  ],
  ANGLE_POSE: [
    'Nghiêng thân sang trái',
    'Nghiêng thân sang phải',
    'Uốn vai xuống từ từ',
  ],
  VOICE: [
    'Vẫy tay gọi bạn',
    'Đưa tay lên miệng',
    'Chỉ tay vào tai mình',
  ],
  CLAP: [
    'Vỗ hai tay trước ngực',
    'Vỗ một cái rồi dang tay',
    'Vỗ thấp gần đầu gối',
  ],
  PINCH: [
    'Se ngón tay trước mắt',
    'Nắm thả hai bàn tay',
    'Kéo ngón tay xuống thấp',
  ],
  HOLD_POSE: [
    'Giữ tay ngang vai đếm ba',
    'Đứng yên chống tay hông',
    'Gập khuỷu giữ ba nhịp',
  ],
  FINGER_COUNT: [
    'Xòe bàn tay lên cao',
    'Gấp ngón đếm ba số',
    'Đưa một ngón ra trước',
  ],
};

export function leadMoves(code) {
  const m = LEADS[code];
  if (!m) throw new Error(`Thiếu động tác bạn dẫn cho mã điều khiển: ${code} — bổ sung tools/data/leads.mjs.`);
  return m;
}

export const LEAD_KEYS = Object.keys(LEADS);

// Chốt cứng: đủ mười bốn mã điều khiển, mỗi mã đúng ba động tác, mọi động tác <= 6 từ và không lẫn ký tự CJK.
{
  const thieu = SPORT_KEYS.filter((c) => !LEADS[c]);
  if (thieu.length) throw new Error(`tools/data/leads.mjs thiếu mã điều khiển: ${thieu.join(', ')}`);
  const thua = LEAD_KEYS.filter((c) => !SPORT_KEYS.includes(c));
  if (thua.length) throw new Error(`tools/data/leads.mjs thừa mã ngoài SPORT_KEYS: ${thua.join(', ')}`);
  for (const [code, moves] of Object.entries(LEADS)) {
    if (moves.length !== 3) throw new Error(`Mã ${code} phải có đúng 3 động tác dẫn.`);
    for (const mv of moves) {
      if (mv.split(/\s+/).length > 6) throw new Error(`Động tác "${mv}" (mã ${code}) quá 6 từ.`);
      if (/[\u3400-\u9fff\u3040-\u30ff]/.test(mv)) throw new Error(`Động tác "${mv}" (mã ${code}) lẫn ký tự CJK.`);
    }
  }
}
