// Ba khung "mục tiêu của em" cho mười bốn mã điều khiển — tầng thứ hai mươi sáu của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm chuỗi NFC, lower-case trong prompts/0X-*/):
//   "hôm nay em sẽ" 0/85 · "em sẽ cố" 0/85 · "em cố gắng" 0/85 · "điều em muốn" 0/85 ·
//   "mong muốn của em" 0/85 · "em đăng ký" 0/85 · "thẻ mục tiêu" 0/85 · "bảng mục tiêu" 0/85 ·
//   "em làm được" 0/85 · "làm được một phần" 0/85 · "miti-goal" 0/85 · "lần trước em" 0/85 ·
//   "em tiến bộ" 0/85 · "so với chính em" 0/85 · "phiên của em" 0/85 · "game tự chọn" 0/85
//   — ngược lại "em chọn một" 85/85 và "em tự chọn" 85/85, nhưng cả hai chỗ đó là chọn ĐỒ VẬT/ĐÁP ÁN
//   trong lượt chơi, chưa lần nào em chọn cái em sẽ cố làm cho chính mình; "tiến bộ" 85/85 nhưng thuộc
//   hồ sơ "miti-mastery" do MÁY ghi theo cụm kiến thức, chưa lần nào chính em tự nhận.
// Nghĩa là 85 game đều để máy quyết độ khó, máy ghi thành tích, máy nhắc em cố lên — chưa game nào
// hỏi em MỘT câu mở đầu tiết: "hôm nay em sẽ cố điều gì?". Trong tiết Thể dục lớp 4–5, đây đúng là
// bước cán sự lớp hô "hôm nay cả lớp ta luyện …", và là cơ chế động lực ít tốn nhất: một ý định em
// tự nói ra làm em ở lại trò chơi lâu hơn một lời khen máy phát.
//
// Danh sách chặn trước khi soạn (lấy từ các tầng đã có, không đặt trần mới):
// lesson.mjs + pe.mjs đã chốt trần 8–10 phút một phiên và ba hiệp 12 lượt; playzone.mjs + light.mjs
// đã có 60–90 giây khởi động; curriculum.mjs đã có trần thẻ báo-trước MỘT hàng >= 20px tự tắt 6 giây;
// takeaway.mjs đã lấy khối 20 giây cuối phiên và 1–3 ngón tay tự đánh giá NỘI DUNG; queue.mjs đã lấy
// "+5 điểm vào Cả nhóm, không vào miti-best"; identity.mjs đã trần mascot <= 6 từ; pacing.mjs +
// verify đã lưu "miti-week" và "miti-mastery" — tầng này chỉ lấy thêm key "miti-goal", một bản ghi
// mỗi phiên. Vì vậy 42 dòng dưới đây là Ý ĐỊNH tự nói bằng miệng (game không bật microphone, không
// nhận dạng giọng nói), ai cũng làm được tại chỗ trong vòng 1 sải tay, và không dòng nào hứa hẹn một
// con số điểm hay một thành tích so với bạn.
import { SPORT_KEYS } from './sports.mjs';

// Ba khung mỗi mã điều khiển, mỗi khung <= 8 từ, mở đầu "Hôm nay em sẽ", không phải câu hỏi.
export const GOALS = {
  POINT: [
    'Hôm nay em sẽ chỉ đúng đích',
    'Hôm nay em sẽ giữ tay thật vững',
    'Hôm nay em sẽ nhắm trước khi chỉ',
  ],
  SWIPE: [
    'Hôm nay em sẽ vuốt chậm mà đều',
    'Hôm nay em sẽ quệt đủ tầm tay',
    'Hôm nay em sẽ nhìn trước rồi vuốt',
  ],
  PUNCH: [
    'Hôm nay em sẽ đấm đúng nhịp',
    'Hôm nay em sẽ thu tay về nhanh',
    'Hôm nay em sẽ giữ vai thả lỏng',
  ],
  GRAB: [
    'Hôm nay em sẽ nắm chắc rồi kéo',
    'Hôm nay em sẽ kéo hết tầm tay',
    'Hôm nay em sẽ chờ bạn làm xong',
  ],
  DRAG: [
    'Hôm nay em sẽ kéo đi một đường',
    'Hôm nay em sẽ giữ tay không rời',
    'Hôm nay em sẽ thả đúng chỗ dừng',
  ],
  STEP: [
    'Hôm nay em sẽ bước đều hai chân',
    'Hôm nay em sẽ nhấc chân vừa phải',
    'Hôm nay em sẽ hạ chân thật nhẹ',
  ],
  TWO_HAND_STRETCH: [
    'Hôm nay em sẽ với tay đủ xa',
    'Hôm nay em sẽ duỗi thẳng hai khuỷu',
    'Hôm nay em sẽ thở đều khi với',
  ],
  TWO_HAND_BALANCE: [
    'Hôm nay em sẽ giữ tay cân đối',
    'Hôm nay em sẽ đếm ba giây vững',
    'Hôm nay em sẽ giữ vòng tay rộng',
  ],
  ANGLE_POSE: [
    'Hôm nay em sẽ xoay đúng góc vai',
    'Hôm nay em sẽ giữ chắc tư thế',
    'Hôm nay em sẽ làm đều hai bên',
  ],
  VOICE: [
    'Hôm nay em sẽ đọc rõ một câu',
    'Hôm nay em sẽ nói đủ bạn nghe',
    'Hôm nay em sẽ nghe hết câu bạn',
  ],
  CLAP: [
    'Hôm nay em sẽ vỗ đúng nhịp',
    'Hôm nay em sẽ vỗ nhẹ mà đều',
    'Hôm nay em sẽ đếm tiếng vỗ',
  ],
  PINCH: [
    'Hôm nay em sẽ bóp đủ chặt',
    'Hôm nay em sẽ mở tay hết cỡ',
    'Hôm nay em sẽ thả tay đúng lúc',
  ],
  HOLD_POSE: [
    'Hôm nay em sẽ giữ đến hết nhịp',
    'Hôm nay em sẽ thở đều khi giữ',
    'Hôm nay em sẽ chưa vội bỏ tay',
  ],
  FINGER_COUNT: [
    'Hôm nay em sẽ giơ đúng số ngón',
    'Hôm nay em sẽ nhìn bạn rồi giơ',
    'Hôm nay em sẽ nói to số ngón',
  ],
};

export function goalLines(code) {
  const m = GOALS[code];
  if (!m) throw new Error(`Thiếu khung mục tiêu cho mã điều khiển: ${code} — bổ sung tools/data/goals.mjs.`);
  return m;
}

export const GOAL_KEYS = Object.keys(GOALS);

// Chốt cứng: đủ mười bốn mã điều khiển, mỗi mã đúng ba khung, mọi khung mở đầu "Hôm nay em sẽ",
// <= 8 từ, không phải câu hỏi, không lẫn ký tự CJK và bốn mươi hai khung đôi khác nhau.
{
  const thieu = SPORT_KEYS.filter((c) => !GOALS[c]);
  if (thieu.length) throw new Error(`tools/data/goals.mjs thiếu mã điều khiển: ${thieu.join(', ')}`);
  const thua = GOAL_KEYS.filter((c) => !SPORT_KEYS.includes(c));
  if (thua.length) throw new Error(`tools/data/goals.mjs thừa mã ngoài SPORT_KEYS: ${thua.join(', ')}`);
  const all = [];
  for (const [code, frames] of Object.entries(GOALS)) {
    if (frames.length !== 3) throw new Error(`Mã ${code} phải có đúng 3 khung mục tiêu.`);
    for (const g of frames) {
      if (!g.startsWith('Hôm nay em sẽ')) throw new Error(`Khung "${g}" (mã ${code}) phải mở đầu "Hôm nay em sẽ".`);
      if (g.includes('?')) throw new Error(`Khung "${g}" (mã ${code}) là câu hỏi — mục tiêu phải là câu em tự hứa.`);
      if (g.split(/\s+/).length > 8) throw new Error(`Khung "${g}" (mã ${code}) quá 8 từ.`);
      if (/[\u3400-\u9fff\u3040-\u30ff]/.test(g)) throw new Error(`Khung "${g}" (mã ${code}) lẫn ký tự CJK.`);
      all.push(g);
    }
    const trung = frames.filter((g, i) => frames.indexOf(g) !== i);
    if (trung.length) throw new Error(`Mã ${code} có khung trùng lặp: ${trung.join(' | ')}`);
  }
  const giongNhau = all.filter((g, i) => all.indexOf(g) !== i);
  if (giongNhau.length) throw new Error(`Bốn mươi hai khung mục tiêu bị trùng giữa các mã: ${[...new Set(giongNhau)].join(' | ')}`);
  if (all.length !== 42) throw new Error(`tools/data/goals.mjs phải có đúng 42 khung, hiện có ${all.length}.`);
}
