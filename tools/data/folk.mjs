// Tầng "sân chơi Việt Nam": mỗi mã điều khiển phải là một trò chơi dân gian CÓ THẬT ở sân trường
// tiểu học Việt Nam, không phải một cú vung tay vô danh và cũng không phải một môn thể thao mà
// làng không có sân.
//
// Khảo sát 85 prompt trước vòng 22 (đếm chuỗi trong prompt game đã sinh, 23 lib, 9 file dữ liệu,
// 6 tài liệu — C:/tmp/survey22c.mjs và C:/tmp/survey22d.mjs):
//   "dân gian" 0/85   "đồng dao" 0/85   "ô ăn quan" 0/85   "nhảy dây" 0/85   "kéo co" 0/85
//   "rồng rắn" 0/85   "tập tầm vông" 0/85   "chi chi chành chành" 0/85   "kéo cưa lừa xẻ" 0/85
//   "nu na nu nống" 0/85   "thả đỉa ba ba" 0/85   "bịt mắt bắt dê" 0/85   "trốn tìm" 0/85
//   "sân trường" 0/85   "vạch phấn" 0/85   "viên sỏi" 0/85   "túi đậu" 0/85
// Vấn đề KHÔNG phải chữ Tây trên HUD: "GO" "COMBO" "TEAM" "SCORE" đều 0/85, RULES.language đã chặn.
// Vấn đề là khung chơi. Vòng 18 gán cho mười bốn mã điều khiển mười bốn MÔN QUỐC TẾ — bắn cung, bóng
// bàn, bóng chuyền, cầu lông, phi tiêu, yoga — và đo được rằng một học sinh làng không có cung, không
// có lưới, không có bàn bóng; sân trường em có đúng vạch phấn, một sợi dây nhảy và vài viên sỏi. Hệ
// quả thật: em không hình dung được động tác mình đang làm là động tác của cái gì, còn giáo viên thì
// không nối được game vào tiết Thể dục (SGK lớp 4–5 mục "Ôn trò chơi vận động" chính là trò chơi dân gian).
//
// Ràng buộc sư phạm: mọi động tác dưới đây là bản TẠI CHỖ nằm trong vòng 1 sải tay, không đứng một
// chân, không che mắt, không nắm tay bạn, không dây thật — đúng trần tải trọng pe.mjs và trần chỗ chơi
// playzone.mjs. FOLK_BANNED liệt kê năm trò sân trường nổi tiếng bị chính hai trần đó loại, để game
// không tự ý sinh lại trò đã cấm.

// Ngân hàng đồ dùng sân trường: đạo cụ AR chỉ được gọi tên bằng đúng tám món này.
export const FOLK_PROPS = [
  'vạch phấn',
  'dây nhảy',
  'khăn vải',
  'viên sỏi',
  'gậy tre',
  'quả cầu giấy',
  'túi đậu',
  'vòng tròn',
];

// Năm trò sân trường nổi tiếng bị trần an toàn của vòng 21 loại thẳng cổ — ghi lại ở đây để validate
// chặn được game tự bịa lại chúng.
export const FOLK_BANNED = [
  { tro: 'Nhảy lò cò', lyDo: 'đòi đứng và bật trên MỘT chân, trái trần cấm mọi động tác đứng một chân' },
  { tro: 'Trồng cây chuối', lyDo: 'đứng một chân trồng ngược người, cần người lớn giữ và không có bản tại chỗ' },
  { tro: 'Bịt mắt bắt dê', lyDo: 'che mắt thật trong lúc đi nhanh thì em không thấy bàn ghế vừa dọn ở thẻ "Dẹp chỗ chơi"' },
  { tro: 'Rồng rắn chạy vòng', lyDo: 'nối đuôi chạy vòng quanh sân, ra khỏi vòng 1 sải tay và hình quạt 90 độ phía trước' },
  { tro: 'Kéo co dây thật', lyDo: 'dây thật căng ngang người, đứt dây là cả hàng ngã theo quán tính' },
];

// `loai` phân thành hai loại lời hô: "dong dao" là một dòng đồng dao thật trong trí nhớ sân trường,
// "dem" là lời đếm do thư viện soạn. CẤM gán nhãn "đồng dao" cho lời đếm — giáo viên nghe ra ngay và
// mất tin vào cả phần còn lại của game.
export const FOLK = {
  POINT: {
    tro: 'Chi chi chành chành',
    dieu: 'tinh',
    loiCho: 'Ngón trỏ chạm ô rồi rút theo nhịp',
    chant: 'Chi chi chành chành',
    loai: 'dong dao',
    doDung: 'vạch phấn',
  },
  SWIPE: {
    tro: 'Kéo cưa lừa xẻ',
    dieu: 'tinh',
    loiCho: 'Hai tay đẩy kéo đều theo vạch',
    chant: 'Kéo cưa lừa xẻ, ông thợ nào khỏe',
    loai: 'dong dao',
    doDung: 'gậy tre',
  },
  PUNCH: {
    tro: 'Ném còn',
    dieu: 'dong',
    loiCho: 'Đẩy tay hất quả còn qua vòng',
    chant: 'Một hai ba, ném!',
    loai: 'dem',
    doDung: 'vòng tròn',
  },
  GRAB: {
    tro: 'Ô ăn quan',
    dieu: 'tinh',
    loiCho: 'Vốc đều tay rải quan xuống ô',
    chant: 'Rải một rải hai, đều tay',
    loai: 'dem',
    doDung: 'viên sỏi',
  },
  DRAG: {
    tro: 'Kéo co',
    dieu: 'dong',
    loiCho: 'Hai tay kéo dải dây về vạch',
    chant: 'Một hai kéo, một hai kéo',
    loai: 'dem',
    doDung: 'khăn vải',
  },
  STEP: {
    tro: 'Nhảy dây',
    dieu: 'dong',
    loiCho: 'Nhún hai chân theo vạch nhịp',
    chant: 'Một hai, một hai, nhảy đều',
    loai: 'dem',
    doDung: 'dây nhảy',
  },
  TWO_HAND_STRETCH: {
    tro: 'Chim bay cò bay',
    dieu: 'dong',
    loiCho: 'Dang hai tay làm cánh đưa lên cao',
    chant: 'Chim bay cò bay',
    loai: 'dong dao',
    doDung: 'vạch phấn',
  },
  TWO_HAND_BALANCE: {
    tro: 'Gánh nước',
    dieu: 'dong',
    loiCho: 'Hai tay giữ hai bên cân nhau',
    chant: 'Gánh gánh gồng gồng',
    loai: 'dong dao',
    doDung: 'túi đậu',
  },
  ANGLE_POSE: {
    tro: 'Tâng cầu',
    dieu: 'dong',
    loiCho: 'Gập gối đưa mu chân đón cầu',
    chant: 'Một nhịp hai nhịp, cầu lên',
    loai: 'dem',
    doDung: 'quả cầu giấy',
  },
  VOICE: {
    tro: 'Rồng rắn lên mây',
    dieu: 'dong',
    loiCho: 'Hô lại đúng tiếng cuối của câu',
    chant: 'Rồng rắn lên mây, có cây lúc lắc',
    loai: 'dong dao',
    doDung: 'vạch phấn',
  },
  CLAP: {
    tro: 'Hát vè',
    dieu: 'dong',
    loiCho: 'Vỗ một nhịp đúng tiếng em đếm',
    chant: 'Một hai ba bốn, vỗ tay',
    loai: 'dem',
    doDung: 'khăn vải',
  },
  PINCH: {
    tro: 'Gắp cua bỏ giỏ',
    dieu: 'tinh',
    loiCho: 'Nhón hai ngón đưa cua về ô',
    chant: 'Gắp một gắp hai, bỏ giỏ',
    loai: 'dem',
    doDung: 'viên sỏi',
  },
  HOLD_POSE: {
    tro: 'Thả đỉa ba ba',
    dieu: 'tinh',
    loiCho: 'Đứng im trên vạch khi dứt câu',
    chant: 'Thả đỉa ba ba, con đỉa bắt mày',
    loai: 'dong dao',
    doDung: 'vạch phấn',
  },
  FINGER_COUNT: {
    tro: 'Tập tầm vông',
    dieu: 'tinh',
    loiCho: 'Đoán số ngón trong nắm tay bạn',
    chant: 'Tập tầm vông, tay không tay có',
    loai: 'dong dao',
    doDung: 'túi đậu',
  },
  SWAT: {
    tro: 'Đánh khăng',
    dieu: 'dong',
    loiCho: 'Vụt gậy trúng thanh khăng',
    chant: 'Một hai ba, vụt!',
    loai: 'dem',
    doDung: 'gậy tre',
  },
};

export function folk(code) {
  const f = FOLK[code];
  if (!f) throw new Error(`Thiếu dòng trò chơi dân gian cho mã điều khiển: ${code} — bổ sung tools/data/folk.mjs.`);
  return f;
}

export const FOLK_KEYS = Object.keys(FOLK);
