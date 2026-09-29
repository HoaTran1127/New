// 12 prompt đời đầu (LEG-01..12): vẫn giữ cơ chế game gốc nhưng đã gắn nhãn legacy
// và bổ sung khối yêu cầu chuẩn MiTi. Không dùng làm khuôn cho game mới.
export const LEGACY = [
  { id: 'LEG-01', file: 'prompts/01-prompt-subway-math-blitz.md', name: 'Subway Math Blitz AR', mon: 'Toán', lop: '4-5', gestures: 'PUNCH', mo_ta: 'Thẻ phép tính rơi ba làn, đấm thẻ đúng, né thẻ sai.' },
  { id: 'LEG-02', file: 'prompts/02-prompt-math-catcher-ar.md', name: 'AR Math Catcher', mon: 'Toán', lop: '4-5', gestures: 'GRAB', mo_ta: 'Di chuyển giỏ hứng quả mang phép tính đúng, né bom sai.' },
  { id: 'LEG-03', file: 'prompts/03-prompt-ninja-bubble-pop.md', name: 'Math Ninja Bubble Pop', mon: 'Toán', lop: '4-5', gestures: 'SWIPE', mo_ta: 'Chém bong bóng phân số, số thập phân theo điều kiện.' },
  { id: 'LEG-04', file: 'prompts/04-prompt-english-vocab-ninja.md', name: 'English Vocabulary Ninja AR', mon: 'Tiếng Anh', lop: '4-5', gestures: 'SWIPE', mo_ta: 'Chém từ vựng tiếng Anh theo chủ đề hoặc từ đồng nghĩa.' },
  { id: 'LEG-05', file: 'prompts/05-prompt-body-tilt-dodge.md', name: 'Body Tilt & Dodge AR', mon: 'Toán', lop: '4-5', gestures: 'STEP+TWO_HAND_STRETCH', mo_ta: 'Nghiêng người đưa phi thuyền qua cổng đúng, né cổng sai.' },
  { id: 'LEG-06', file: 'prompts/06-prompt-two-hands-balance.md', name: 'Two Hands Balance AR', mon: 'Toán', lop: '4-5', gestures: 'TWO_HAND_BALANCE', mo_ta: 'Hai tay nâng hạ tạo đòn cân so sánh hai vế.' },
  { id: 'LEG-07', file: 'prompts/07-prompt-finger-spell-english.md', name: 'AR Spelling Bee & Phonics', mon: 'Tiếng Anh', lop: '4-5', gestures: 'POINT', mo_ta: 'Bắt chữ cái bay lơ lửng để ghép từ tiếng Anh.' },
  { id: 'LEG-08', file: 'prompts/08-prompt-toan4-tong-ti-so-do.md', name: 'Bí Ẩn Sơ Đồ Đoạn Thẳng', mon: 'Toán', lop: '4', gestures: 'TWO_HAND_STRETCH+PUNCH', mo_ta: 'Sơ đồ đoạn thẳng động cho toán tổng – tỉ số.' },
  { id: 'LEG-09', file: 'prompts/09-prompt-toan4-hinh-hoc-goc-dien-tich.md', name: 'Cánh Tay Ê-Ke & Pháo Đài Góc', mon: 'Toán', lop: '4', gestures: 'ANGLE_POSE', mo_ta: 'Hai cánh tay tạo góc và diện tích theo yêu cầu.' },
  { id: 'LEG-10', file: 'prompts/10-prompt-toan5-chuyen-dong-gap-nhau.md', name: 'Cao Tốc Tốc Độ', mon: 'Toán', lop: '5', gestures: 'TWO_HAND_BALANCE', mo_ta: 'Hai xe chuyển động đều, chạm tay đúng thời điểm gặp nhau.' },
  { id: 'LEG-11', file: 'prompts/11-prompt-toan5-the-tich-hinh-khoi.md', name: 'Kiến Trúc Sư Khối 3D', mon: 'Toán', lop: '5', gestures: 'DRAG+SWIPE', mo_ta: 'Xếp lớp khối lập phương xây hình hộp, tính thể tích.' },
  { id: 'LEG-12', file: 'prompts/12-prompt-toan5-ti-so-phan-tram-chiet-khau.md', name: 'Thần Săn Giảm Giá', mon: 'Toán', lop: '5', gestures: 'DRAG+SWIPE', mo_ta: 'Kéo thanh trượt phần trăm, chém mức giá sau giảm giá.' },
];
