// Sinh lại 12 prompt legacy (LEG-01..12) theo cấu trúc 5 mục chuẩn — cùng hợp đồng với
// prompts/01-toan4/L4-01-number-dash.md và tools/build-prompts.mjs.
// Ý TƯỞNG + MỤC TIÊU lấy từ tools/data/legacy.mjs và phần mở đầu của các file cũ
// (đã đọc và cô lại thành khối INFO dưới đây). RÀNG BUỘC dùng nguyên văn CORE từ tools/lib/core.mjs.
// 26 module quy định chung cũ đã bị xóa khỏi luồng sinh prompt — script này chỉ còn import core.mjs + tools/data.
// Trần cứng: 15.000 byte mỗi file.

import fs from 'fs';
import path from 'path';
import { LEGACY } from './data/legacy.mjs';
import { CORE, CORE_TITLE, CORE_SHORT } from './lib/core.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const LIMIT = 15000;

const TO_CAM = ['STEP', 'TWO_HAND_STRETCH', 'TWO_HAND_BALANCE', 'ANGLE_POSE'];
const bankLines = (g) => [
  `- Khai báo \`const QUESTION_DATA = [...]\` ở ĐẦU khối <script>, engine đặt phía sau.`,
  `- Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }; đề ≤16 từ, một ý duy nhất.`,
  `- Tối thiểu ${g.so} mục chia 3 mức độ (level 1/2/3), trong đó >= 60% \`dang: "nhin"\` (nhìn rồi chọn); \`dang: "tinh"\` chỉ MỘT phép tính một bước trong phạm vi SGK; mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; xáo vị trí đáp án bằng seed theo lượt.`,
  `- errorTag lấy đúng một trong: ${g.tags}. loiViet là cụm tiếng Việt in thường cùng chỉ lỗi đó, hiển thị cho học sinh.`,
  `- Phương án nhiễu phải là kết quả của một lỗi thật trong danh sách trên, không phải số ngẫu nhiên; không được có hai đáp án cùng đúng.`,
  `- Một mục mẫu để bám theo khuôn (viết tiếp ít nhất ${g.so - 1} mục nữa):`,
  `  ${g.mau}`,
];

// INFO: nội dung cô lại từ tiêu đề + mở đầu của từng file legacy cũ (không chép khối quy định cũ).
const INFO = {
  'LEG-01': {
    so: 30,
    y: [
      'Ba làn chạy trong "thành phố cửu chương"; thẻ phép tính rơi từ trên xuống theo chiều sâu z, đúng pha 60% / sai 40%.',
      'Vung đấm cả cánh tay: cả tay và thân đi hết >= 50% tầm với đã đo lúc calibration; đấm thẻ ĐÚNG để vỡ thẻ, né thẻ SAI.',
      'PUNCH — HandLandmarker; tâm bàn tay (trung bình landmark 5, 9, 13, 17) là quả đấm, vệt neon bám theo tay.',
      'Chuỗi đúng lên tới x5 với cao độ âm tăng dần; đấm nhầm làm màn hình rạn kính một nhịp rồi lùi lại sau lời giải.',
      'Cắt theo 3 hiệp × 4 lượt, giữa hiệp có trạm nghỉ 5 giây; thẻ vàng nhân đôi điểm, mỗi vòng đúng 2 thẻ.',
    ],
    m: [
      'Bám bảng cửu chương nhân chia 2–9 (lớp 4), cộng trừ phân số cùng mẫu, đổi đơn vị m², tấn–tạ–yến, số thập phân nhẩm kiểu 0,25 × 4, tỉ số %, vận tốc s = v × t (lớp 5).',
      'Học qua phản xạ: mỗi lượt chỉ một phép tính hoặc một lần nhận biết; nhìn là chọn được ở level 1, ước lượng ở level 3.',
      'Lỗi cần sửa: thuộc lẫn một cột trong bảng; quên đổi đơn vị; nhầm vị trí dấu phẩy ở số thập phân.',
      'Câu sai xếp lại cuối phiên để luyện; tổng kết nhóm theo loiViet kiểu "Em hay sai ở: …".',
    ],
    tags: 'sai_bang_nhan (nhầm kết quả một cột bảng nhân), doi_sai_don_vi (đổi sai m² / tấn / tạ / yến), dau_phay_thap_phan (đặt sai dấu phẩy số thập phân)',
    mau: 'id: "q1", level: 1, prompt: "Thẻ nào đúng?", choices: ["7 × 8 = 56","7 × 8 = 54","7 × 8 = 64"], answer: "7 × 8 = 56", explanation: "7 × 8 = 56 vì 7 × 7 = 49, thêm 7 nữa là 56.", errorTag: "sai_bang_nhan", dang: "nhin", loiViet: "nhầm kết quả một cột bảng nhân"',
  },
  'LEG-02': {
    so: 30,
    y: [
      'Vườn số rơi: quả mang phép tính và bom mang phép tính sai rơi tự do từ trên xuống; chiếc giỏ AR nằm sát mép dưới khung hình.',
      'Di chuyển cả thân và hai tay để đưa giỏ ngang qua quả ĐÚNG hứng lấy, tránh hẳn quả SAI — không thắng bằng cổ tay kề vai.',
      'GRAB — HandLandmarker; tâm bàn tay là miệng giỏ, trái/bàn tay kia buông tự nhiên.',
      'Hứng đúng: nổ hạt sao + tiếng "pop" ngắn; hứng sai: viền màn hình mờ dần 200–300 ms, dừng 2 giây hiện lời giải.',
      'Tỉ lệ quả đúng / bom sai ~65/35 trộn đều hai bên trái phải để không mỏi một bên.',
    ],
    m: [
      'Cộng trừ phân số cùng mẫu (lớp 4), phép tính số thập phân 1,2 + 0,8, tìm giá trị một số phần trăm, đường đi trong công thức s = v × t (lớp 5).',
      'Mỗi lượt một phép tính duy nhất; kết quả nằm trong phạm vi SGK đã học.',
      'Lỗi cần sửa: cộng cả tử lẫn mẫu khi cộng phân số; cộng lệch hàng khi tính số thập phân; nhân thay vì chia khi tìm phần trăm.',
      'Quả bỏ lỡ chỉ mất chuỗi, không trừ tim — vung bừa không thắng được.',
    ],
    tags: 'cong_ca_tu_va_mau (cộng cả tử lẫn mẫu khi cộng phân số), cong_lech_hang_thap_phan (cộng lệch hàng số thập phân), tim_phan_tram_nham_phep (nhầm phép khi tìm phần trăm)',
    mau: 'id: "q1", level: 1, prompt: "Quả nào ghi đúng kết quả?", choices: ["2/5 + 1/5 = 3/5","2/5 + 1/5 = 3/10","2/5 + 1/5 = 2/5"], answer: "2/5 + 1/5 = 3/5", explanation: "Cộng hai phân số cùng mẫu: giữ nguyên mẫu, cộng tử 2 + 1 = 3, được 3/5.", errorTag: "cong_ca_tu_va_mau", dang: "tinh", loiViet: "cộng cả tử lẫn mẫu khi cộng phân số"',
  },
  'LEG-03': {
    so: 30,
    y: [
      'Bong bóng bay từ dưới lên theo parabola rồi rơi xuống; mỗi bóng chứa một phép tính hoặc một con số.',
      'Đầu mỗi vòng hiện một điều kiện bằng lời, ví dụ "Chém các số chia hết cho 9!" hoặc "Chém các phép tính ĐÚNG!".',
      'SWIPE — HandLandmarker; vung tay tạo vệt kiếm neon; bóng chỉ vỡ khi vệt cắt qua nó ở lượt chuyển trạng thái, có cooldown.',
      'Chém bóng hợp lệ: đôi bóng tách ra + điểm chuỗi; chém bóng bẫy: trừ 1 tim + lời giải; bỏ lỡ bóng hợp lệ: chỉ mất chuỗi.',
      'Bóng bay chậm đủ lâu (3–4,5 giây) để em đọc điều kiện một lần là hiểu; không có đồng hồ rượt đuổi.',
    ],
    m: [
      'Dấu hiệu chia hết 2, 5, 9 (lớp 4); phân số và số thập phân (lớp 4–5); nhận biết kết quả đúng sai của một phép tính.',
      'Điều kiện mỗi vòng đổi cyclic giữa chia hết / bằng nhau / lớn hơn — cùng một kỹ năng nhìn-nhận ở ba mức độ tinh vi.',
      'Lỗi cần sửa: tưởng nhớ chia hết cho 9 là xét chữ số tận cùng; so phân số bằng cách nhìn tử số; quên rút gọn.',
      'Câu sai cùng errorTag quay lại sớm nhất ở level thấp hơn (sàn chống nản 3 câu).',
    ],
    tags: 'dau_hieu_chia_het_nham (nhầm dấu hiệu chia hết), so_sanh_phan_so_theo_tu (so phân số chỉ bằng tử số), bo_quen_rut_gon (bỏ quên bước rút gọn phân số)',
    mau: 'id: "q1", level: 1, prompt: "Bóng nào chia hết cho 9?", choices: ["45","38","52"], answer: "45", explanation: "45 có 4 + 5 = 9, chia hết cho 9; 38 có 3 + 8 = 11 nên không.", errorTag: "dau_hieu_chia_het_nham", dang: "nhin", loiViet: "nhầm dấu hiệu chia hết"',
  },
  'LEG-04': {
    so: 60,
    y: [
      'Thẻ từ vựng tiếng Anh rơi theo ba làn trong siêu thị Neon; một bảng nhiệm vụ trên đầu, ví dụ "Chém các loài động vật (Animals)".',
      'Vung cả cánh tay chém thẻ ĐÚNG chủ đề; chém thẻ bẫy (thuộc chủ đề khác lẫn vào) trừ 1 tim và hiện nghĩa tiếng Việt của từ.',
      'SWIPE — HandLandmarker; vệt kiếm neon; hover không phải hit, confidence thấp không chốt.',
      'Mỗi từ đúng được đọc to bằng window.speechSynthesis (en-US) kèm nút "Nghe lại"; nghĩa tiếng Việt hiện dưới thẻ.',
      'Chủ đề xoay vòng theo 5 cụm: Animals · Fruits & Food · School Things · Jobs & Occupations · Opposites.',
    ],
    m: [
      'Từ vựng SGK Tiếng Anh lớp 4–5 theo 5 chủ đề trên; mọi từ phải nằm trong word list đã khai báo, cấm từ ngoài danh sách.',
      'Học liệu tiếng Anh giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải bằng tiếng Việt.',
      'Lỗi cần sửa: nhầm từ cùng chủ đề nhưng khác cặp nghĩa (elephant / dolphin); lẫn từ trái nghĩa với từ mô tả; đánh vần gần giống.',
      'Từ vừa chém sai hiện lại cuối phiên kèm phát âm; tổng kết nhóm theo loiViet.',
    ],
    tags: 'nham_tu_cung_chu_de (chọn nhầm từ cùng chủ đề nhưng sai nghĩa), tra_trai_nghia_nham (lộn cặp trái nghĩa), noi_hinh_am_chu (nhìn mặt chữ gần giống mà chọn sai)',
    mau: 'id: "q1", level: 1, prompt: "Chém từ chỉ động vật.", choices: ["Elephant","Apple","Ruler"], answer: "Elephant", explanation: "Elephant là con voi — động vật. Apple là quả táo (trái cây), Ruler là thước kẻ (đồ dùng học tập).", errorTag: "nham_tu_cung_chu_de", dang: "nhin", loiViet: "chọn nhầm từ cùng chủ đề nhưng sai nghĩa"',
  },
  'LEG-05': {
    so: 30,
    y: [
      'Đường đua vũ trụ: phi thuyền AR lao tới, cổng năng lượng mang phép tính hoặc từ vựng xuất hiện hai bên trái phải.',
      'Nghiêng cả thân người sang phía cổng ĐÚNG để bay qua; né cổng SAI — động tác là cả thân, không phải lắc đầu.',
      'STEP + TWO_HAND_STRETCH — PoseLandmarker (pose_landmarker_lite.task) đo vai (11/12) và hông (23/24); camera chỉ thấy nửa thân trên thì hạ về hai tay dang ngang, kèm một dòng tiếng Việt nói rõ camera thấy tới đâu.',
      'Cổng đúng: tăng tốc + vệt sao băng; cổng sai: chạm chấn động nhẹ, dừng 2 giây hiện lời giải.',
      'Tốc độ cổng tăng nhẹ qua 3 hiệp nhưng thời gian đọc đề không bị rút.',
    ],
    m: [
      'Phân số bằng nhau (lớp 4), so sánh và sắp thứ tự số thập phân (lớp 5), ô nhân chia trong bảng.',
      'Mỗi cổng là một nhận biết bằng mắt ở level 1, một phép tính ở level 3; chỉ một ý mỗi lượt.',
      'Lỗi cần sửa: rút gọn sai khi so phân số; so thập phân theo số chữ số thay theo giá trị; nhầm một ô bảng nhân.',
      'Giữ nguyên tư thế nghiêng không được spam chốt; qua cổng do trượt tay may mắn không được cộng điểm động tác.',
    ],
    tags: 'rut_gon_sai (rút gọn phân số sai khi so sánh), so_thap_phan_theo_do_dai (so thập phân theo độ dài chứ không theo giá trị), sai_mot_o_bang (nhầm một ô trong bảng nhân chia)',
    mau: 'id: "q1", level: 1, prompt: "Cổng nào bằng 1/2?", choices: ["2/4","3/2","2/3"], answer: "2/4", explanation: "2/4 rút gọn bằng 1/2; 3/2 lớn hơn 1, 2/3 không rút được về 1/2.", errorTag: "rut_gon_sai", dang: "nhin", loiViet: "rút gọn phân số sai khi so sánh"',
  },
  'LEG-06': {
    so: 30,
    y: [
      'Đòn cân đòn thiên nga AR giữa khung hình: hai đĩa cân mang hai biểu thức, cánh cân nghiêng theo hai bàn tay của em.',
      'Tay trái cao hơn = vế trái nặng ( > ); tay phải cao hơn = vế phải nặng ( < ); hai tay ngang bằng = bằng nhau ( = ).',
      'TWO_HAND_BALANCE — HandLandmarker maxNumHands: 2, cổ tay landmark 0; giữ tư thế đúng 1,5 giây (có hysteresis + cooldown) mới chốt.',
      'Cân đúng: đĩa sáng lên, chuông đồng hồ reo; cân sai: đĩa lắc lư, dừng 2 giây hiện lời giải chỉ rõ phải quy đồng hay đổi đơn vị.',
      'Camera không thấy đủ hai tay thì một dòng tiếng Việt nhắc chỉnh vị trí, game chờ chứ không phạt.',
    ],
    m: [
      'So sánh phân số lớp 4 (quy đồng mẫu, tử bằng nhau); so sánh số thập phân lớp 5; so sánh số đo đại lượng về cùng đơn vị (tấn–kg, m²–dm²).',
      'Level 1 so hai vế lệch rõ bằng mắt, level 2 quy đồng một nhịp, level 3 ước lượng — luôn đúng một thao tác thăng bằng.',
      'Lỗi cần sửa: so tử mà quên mẫu; nghĩ thập phân nhiều chữ số hơn là lớn hơn; quên đổi đơn vị trước khi so.',
      'Hai vế có giá trị bằng nhau bắt buộc nghiêng hai tay ngang — chống đoán mò một chiều.',
    ],
    tags: 'so_tu_quen_mau (so phân số theo tử mà quên mẫu), thap_phan_nhieu_chu_lon_hon (tưởng nhiều chữ số là lớn hơn), chua_doi_don_vi (chưa đổi cùng đơn vị đã so)',
    mau: 'id: "q1", level: 2, prompt: "So sánh 3/4 và 5/8.", choices: ["3/4 > 5/8","3/4 < 5/8","3/4 = 5/8"], answer: "3/4 > 5/8", explanation: "Quy đồng: 3/4 = 6/8; 6/8 > 5/8 nên 3/4 > 5/8.", errorTag: "so_tu_quen_mau", dang: "nhin", loiViet: "so phân số theo tử mà quên mẫu"',
  },
  'LEG-07': {
    so: 60,
    y: [
      ' Ô chữ từ vựng treo trên đỉnh kèm hình gợi ý hoặc nghĩa tiếng Việt; bong bóng chữ cái bay lơ lửng khắp khung hình — cả chữ đúng lẫn chữ bẫy.',
      'Đầu ngón trỏ (landmark 8) là đũa phép ngôi sao; chạm bóng làm nó nổ "POP", chữ cái bay vào ô trống theo thứ tự.',
      'POINT — HandLandmarker; mỗi lượt duỗi cả cẳng tay đổi hướng vì bóng đặt ở bốn góc khác nhau.',
      'Chọn nhầm chữ bẫy: khói xám + trừ 1 tim; chọn đúng: nốt nhạc cao dần; ghép xong từ: đọc to bằng speechSynthesis (en-US) + nghĩa tiếng Việt + phiên âm.',
      'Thứ tự ô trống hiện rõ chỗ đã điền; bóng chữ rơi chậm để em với kịp, không đua thời gian.',
    ],
    m: [
      'Đánh vần từ SGK Tiếng Anh lớp 4–5 theo chủ đề động vật, đồ dùng học tập, nghề nghiệp, trái cây — mọi từ phải nằm trong word list đã khai báo.',
      'Mỗi từ 4–7 chữ cái; chữ bẫy là chữ gần giống mặt chữ hoặc âm của từ đang học.',
      'Lỗi cần sửa: ghép sai vị trí nguyên âm; thiếu chữ cái đôi; nhầm chữ có âm gần giống.',
      'Từ ghép sai hiện lại cuối phiên với ô trống đã gợi ý chữ đầu; phát âm lại bằng nút "Nghe lại".',
    ],
    tags: 'sai_vi_tri_nguyen_am (đặt nhầm nguyên âm trong từ), thieu_chu_doi (bỏ sót chữ cái đôi), nham_am_gan_giong (chọn chữ có âm gần giống)',
    mau: 'id: "q1", level: 1, prompt: "Ghép từ chỉ con voi: E _ E _ H _ N T.", choices: ["L, P, A","R, B, O","L, P, O"], answer: "L, P, A", explanation: "ELEPHANT gồm E-L-E-P-H-A-N-T; thiếu chữ L và A là lỗi hay gặp.", errorTag: "thieu_chu_doi", dang: "nhin", loiViet: "bỏ sót chữ cái đôi"',
  },
  'LEG-08': {
    so: 30,
    y: [
      'Toán có lời văn dạng "Tìm hai số khi biết tổng và tỉ số": mỗi màn là một tình huống thật (thu gom giấy vụn, trồng cây) với sơ đồ đoạn thẳng động.',
      'Sơ đồ hiện hai thanh chia ô bằng nhau (ví dụ tổ 1: 2 ô, tổ 2: 3 ô, tổng 45 kg); em đọc ngay tổng số phần.',
      'Giai đoạn 1 — TWO_HAND_STRETCH: dang hai tay kéo dãn sơ đồ để kích hoạt bài toán; giai đoạn 2 — PUNCH: đấm quả cầu năng lượng mang đáp án đúng (1 phần / số bé / số lớn).',
      'Ba quả cầu gồm 1 đáp án đúng và 2 quả bẫy mô phỏng lỗi thật (lấy tổng chia cho hiệu, quên chia số phần).',
      'Đấm nhầm: màn rạn nhẹ, dừng 2 giây hiện từng bước sơ đồ — mỗi bước một dòng, đúng dạng bài.',
    ],
    m: [
      'Giải bài toán tìm hai số khi biết tổng và tỉ số (lớp 4), các số trong phạm vi SGK; mở rộng tổng–hiệu ở level 3.',
      'Thứ tự bắt buộc: vẽ sơ đồ → tìm tổng số phần bằng nhau → tìm giá trị một phần → tìm hai số.',
      'Lỗi cần sửa: lấy tổng chia hiệu; đếm sai số phần trên sơ đồ; ra hai số mà quên thử lại tổng.',
      'Sơ đồ đoạn thẳng phải vẽ lại nguyên văn trong lời giải; engine dựng sẵn các bước, em chỉ làm bước cuối.',
    ],
    tags: 'tong_chia_hieu (lấy tổng chia hiệu thay vì chia số phần), dem_sai_so_phan (đếm sai số phần trên sơ đồ), thieu_thu_lai (tìm hai số mà quên thử lại tổng)',
    mau: 'id: "q1", level: 1, prompt: "Tổng 45 kg, tổ 1 bằng 2/3 tổ 2. Một phần là?", choices: ["9 kg","45 : 2 = 22 kg","45 − 3 = 42 kg"], answer: "9 kg", explanation: "Tổng số phần bằng nhau: 2 + 3 = 5. Một phần: 45 : 5 = 9 kg.", errorTag: "dem_sai_so_phan", dang: "tinh", loiViet: "đếm sai số phần trên sơ đồ"',
  },
  'LEG-09': {
    so: 30,
    y: [
      'Hai cánh tay em là hai cạnh của một góc: cổ tay trái làm đỉnh, tia laser AR nối hai bàn tay, thước đo độ ảo hiện số đo thời gian thực.',
      'Nhiệm vụ đọc to trên HUD: "Tạo GÓC VUÔNG để kích hoạt đại bác!" — em dang tay theo yêu cầu và giữ đúng 1 giây để bắn.',
      'ANGLE_POSE — PoseLandmarker đo vai–khuỷu–bàn tay; dung sai ±8° quanh 90°, góc nhọn < 90°, góc tù 90–180°, góc bẹt ≈ 180° (hai tay mở thẳng hàng).',
      'Thiên thạch mang biểu tượng góc rơi xuống; tạo sai loại góc: khiên nổ nhẹ, dừng 2 giây hiện "Góc của em đang 65° — góc nhọn; cần mở lớn hơn 90°".',
      'Màu chỉ là phụ: mỗi loại góc kèm tên chữ và hình ký hiệu — nhìn bằng mắt thường không cần phân biệt màu.',
    ],
    m: [
      'Nhận biết góc nhọn, góc vuông, góc tù, góc bẹt; đường thẳng song song và vuông góc (lớp 4).',
      'Level 1 tạo góc theo yêu cầu trực tiếp; level 2 đoán loại góc từ hình cho trước; level 3 so hai góc — không bao giờ quá một thao tác.',
      'Lỗi cần sửa: coi góc vuông là "vuông = đứng"; nhầm góc bẹt với góc vuông vì hai cạnh thẳng; không đọc được số đo thước đo.',
      'Mỗi lượt camera giữ khung vai–tay; mất một bên tay thì nhắc chỉnh vị trí bằng một dòng tiếng Việt, không trừ tim.',
    ],
    tags: 'nham_goc_bet_goc_vuong (lộn góc bẹt với góc vuông), doc_sai_thuoc_do (đọc sai số đo trên thước), dinh_nham_canh (nhầm cạnh của góc khi mô tả)',
    mau: 'id: "q1", level: 1, prompt: "Hình nào là góc vuông?", choices: ["Hai cạnh vuông góc, có ký hiệu vuông nhỏ","Hai cạnh thẳng hàng một đường","Hai cạnh khép nhỏ hơn 90°"], answer: "Hai cạnh vuông góc, có ký hiệu vuông nhỏ", explanation: "Góc vuông đúng 90°, có ký hiệu ô vuông nhỏ ở đỉnh; hai cạnh thẳng hàng là góc bẹt 180°.", errorTag: "nham_goc_bet_goc_vuong", dang: "nhin", loiViet: "lộn góc bẹt với góc vuông"',
  },
  'LEG-10': {
    so: 30,
    y: [
      'Đường cao tốc AR nối thành phố A và B: ô tô đỏ khởi hành từ A, xe xanh từ B ngược chiều; đồng hồ mô phỏng quay từng giờ, quãng đường hai xe rút ngắn bằng tổng vận tốc.',
      'Tay trái điều khiển xe A, tay phải xe B (TWO_HAND_BALANCE — HandLandmarker maxNumHands: 2); đúng lúc hai xe gặp nhau, vỗ hai bàn tay vào nhau (Rendezvous Clap) tại cờ hoa.',
      'Mốc câu hỏi: "Hai xe gặp nhau sau bao nhiêu giờ?" — ba cổng thời gian hiện ra, đẩy tay cho xe qua cổng đúng.',
      'Chọn sai: hai xe chết máy, dừng 2 giây hiện bảng "1 giờ rút ngắn 50 + 25 = 75 km; 150 : 75 = 2 giờ".',
      'Trục quãng đường chạy 0%→100% giúp em thấy trước điểm gặp nhau — trực quan hóa (v₁ + v₂) × t = s.',
    ],
    m: [
      'Vận tốc, quãng đường, thời gian (lớp 5); hai chuyển động ngược chiều gặp nhau; mở rộng cùng chiều đuổi kịp ở level 3.',
      'Mỗi lượt một phép: tính tổng vận tốc, hoặc tính t = s : (v₁ + v₂), hoặc tính quãng đường một xe.',
      'Lỗi cần sửa: lấy s chia riêng cho từng v; quên đổi phút sang giờ; nhầm gặp nhau và đuổi kịp.',
      'Số liệu tròn trong phạm vi nhẩm được; bảng động cơ và còi xe bằng Web Audio, phụ đề chữ cho mọi âm thanh.',
    ],
    tags: 'chia_rieng_tung_v (lấy s chia riêng từng vận tốc), quen_doi_don_vi_gio (quên đổi phút sang giờ), nham_gap_doi_duoi (lộn gặp nhau ngược chiều với đuổi kịp cùng chiều)',
    mau: 'id: "q1", level: 2, prompt: "Hai xe cách 150 km, gặp nhau sau mấy giờ?", choices: ["2 giờ","3 giờ","6 giờ"], answer: "2 giờ", explanation: "Mỗi giờ hai xe lại gần nhau 50 + 25 = 75 km. 150 : 75 = 2 giờ.", errorTag: "chia_rieng_tung_v", dang: "tinh", loiViet: "lấy s chia riêng từng vận tốc"',
  },
  'LEG-11': {
    so: 30,
    y: [
      'Lồng kính hình hộp chữ nhật trong suốt nhìn isometric; em là kiến trúc sư xếp khối lập phương 1 cm³ lấp đầy hộp theo kích thước cho trước.',
      'DRAG — kéo từng khối bằng hai tay thả vào đáy hộp cho tới khi đầy 4 × 3 ô; SWIPE vuốt từ dưới lên để nâng tầng khi đáy đã kín.',
      'Xong phần dựng hình, ba con số thể tích rơi xuống kèm đơn vị; đấm vỡ khối mang đáp án đúng để nhận cúp.',
      'Nhìn thấy từng lớp khối phát sáng xếp chồng — khắc sâu V = dài × rộng × cao = diện tích đáy × chiều cao.',
      'Bẫy ngay trên đáp án: số đúng đơn vị sai (24 cm²), cộng nhầm cạnh (9 cm³) — chọn nhầm hiện lời giải chỉ rõ đơn vị thể tích phải là cm³.',
    ],
    m: [
      'Thể tích hình hộp chữ nhật và hình lập phương; cm³, dm³ (lớp 5); đếm ô và ước lượng thể tích bằng mắt.',
      'Level 1 đếm khối đã xếp; level 2 tính một chiều khi biết V; level 3 ước lượng hộp nào chứa nhiều hơn — mỗi lượt một phép.',
      'Lỗi cần sửa: cộng ba cạnh thay vì nhân; lẫn cm² và cm³; nhầm khi đổi dm³ ra cm³.',
      'Mini-trạm giữa hiệp cho em xếp tự do một hình tùy thích — không hỏi bài, không trừ tim.',
    ],
    tags: 'cong_ba_canh (cộng ba cạnh thay vì nhân), don_vi_cm2_cm3 (lẫn xăng-ti-mét vuông và khối), doi_don_vi_sai (sai hệ số khi đổi dm³ ra cm³)',
    mau: 'id: "q1", level: 1, prompt: "Hộp 4 × 3 × 2 cm³ đầy khối 1 cm³. V bằng?", choices: ["24 cm³","12 cm³","9 cm³"], answer: "24 cm³", explanation: "Một lớp đáy: 4 × 3 = 12 khối; 2 lớp: 12 × 2 = 24 cm³.", errorTag: "cong_ba_canh", dang: "tinh", loiViet: "cộng ba cạnh thay vì nhân"',
  },
  'LEG-12': {
    so: 30,
    y: [
      'Siêu thị tương lai: mỗi màn một quầy hàng với thẻ Sale (ví dụ balo 200.000đ giảm 20%); thanh thước 100% chia vạch — mỗi vạch 10% sáng đỏ (phần giảm) và xanh (phần trả).',
      'DRAG — hai tay kéo thanh trượt phần trăm để ngắm tỉ lệ; SWIPE — chém bong bóng mang số tiền đúng với câu hỏi ("Số tiền được giảm là bao nhiêu?").',
      'Ba thẻ giá rơi xuống làm phương án; chém đúng: "ting" máy tính tiền + xe đẩy nhét thêm món hàng AR; chém sai: dừng 2 giây hiện phép tính đầy đủ.',
      'Câu hỏi kế tiếp tự động ("Khách phải trả bao nhiêu?") — thấy rõ quan hệ 100% = phần giảm + phần trả.',
      'Toàn bộ giá tiền là số tròn nghìn trong phạm vi tính nhẩm lớp 5.',
    ],
    m: [
      'Tỉ số phần trăm; tìm giá trị một số phần trăm của một số; bài toán giảm giá – chiết khấu thực tế (lớp 5).',
      'Level 1 đọc % trên thước; level 2 tính tiền giảm = giá × % : 100; level 3 so hai ưu đãi — mỗi lượt một phép.',
      'Lỗi cần sửa: lấy giá chia % thay vì nhân rồi chia 100; trừ phần trăm trực tiếp vào giá (200.000 − 20); lẫn "giảm tới" và "giảm ở".',
      'Xe đẩy AR chứa đồ đã giải đúng; tổng kết in "Em đã mua <n> món, sửa được <k> lỗi tính %".',
    ],
    tags: 'nham_phep_phan_tram (nhân chia sai thứ tự khi tính %), tru_truc_tiep_phan_tram (trừ % thẳng vào giá tiền), nham_giam_toi_giam_o (lộn giảm tới mức và giảm ở mức)',
    mau: 'id: "q1", level: 2, prompt: "Balo 200.000đ giảm 20%. Tiền được giảm?", choices: ["40.000đ","160.000đ","20.000đ"], answer: "40.000đ", explanation: "200.000 × 20 : 100 = 40.000đ. 160.000đ là tiền còn phải trả, không phải tiền giảm.", errorTag: "tru_truc_tiep_phan_tram", dang: "tinh", loiViet: "trừ % thẳng vào giá tiền"',
  },
};

const render = (l) => {
  const g = INFO[l.id];
  if (!g) throw new Error(`Thiếu nội dung cô lại cho ${l.id} — bổ sung vào INFO.`);
  const model = TO_CAM.some((x) => l.gestures.includes(x)) ? 'PoseLandmarker' : 'HandLandmarker';
  const english = l.mon === 'Tiếng Anh';
  const pham_vi = english
    ? `cấm từ ngoài word list Tiếng Anh lớp ${l.lop} đã khai báo; học liệu tiếng Anh giữ nguyên tiếng Anh, hướng dẫn và lời giải bằng tiếng Việt`
    : `chỉ dùng số trong phạm vi Toán lớp ${l.lop} đã học; không số âm ngoài phạm vi, không chia cho 0`;
  return `# ${l.id} — ${l.name}

> ${l.mon} lớp ${l.lop} · Điều khiển: ${l.gestures} · Model: ${model}
> **LEGACY (${l.id})** — ${l.mo_ta} Bản chuẩn để làm game mới: \`prompts/00-master-canvas-prompt.md\`; 85 prompt đặc thù: \`catalogs/GAME_CATALOG.csv\`.
> Prompt độc lập: copy nguyên khối \`text\` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

\`\`\`text
Tạo game giáo dục web AR một file HTML "${l.name.toUpperCase()}" cho học sinh Việt Nam lớp ${l.lop}, môn ${l.mon}, điều khiển bằng webcam.

1. Ý TƯỞNG
- Cơ chế gốc (giữ nguyên): ${l.mo_ta}
${g.y.map((x) => `- ${x}`).join('\n')}
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
${g.m.map((x) => `- ${x}`).join('\n')}
- Điều kiện thắng thua: hết 5 tim là thua, đủ 12 lượt là thắng; không điểm số cạnh tranh, không xếp hạng, không timer thi đua; tổng kết ba thẻ "Làm tốt / Cần luyện / Động tác lần sau".
- Màn tổng kết thêm bốn dòng "Gửi bố mẹ" bằng số thật: môn tập + số động tác, cụm kiến thức + số câu đúng, mẹo nhớ, một việc 3 phút không màn hình ở nhà.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

${CORE_TITLE}
${CORE}

4. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
${bankLines({ ...g, so: g.so }).join('\n')}
- Phạm vi dữ liệu: ${pham_vi}.
- Viết kèm hàm \`verifyQuestionBank()\` chạy một lần trước vòng chơi: answer phải có trong choices đúng một lần; explanation/loiViet khác rỗng; không trùng prompt; mỗi level chiếm tối thiểu 1/4 số mục; mục trượt bị loại kèm console.warn nêu id bằng tiếng Việt.

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ${CORE_SHORT}.
- Riêng ngân hàng: đủ ${g.so} mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài phạm vi trên; câu sai vào hàng đợi luyện lại trong cùng phiên.
\`\`\`

## Ghi chú cho người tạo prompt (không gửi Gemini)

- ${l.id} thuộc dòng prompt đời đầu: giữ cơ chế gốc, dùng ràng buộc cốt lõi hiện hành của \`tools/lib/core.mjs\`; mọi phụ thuộc cũ bị cấm đã được thay thế.
- Muốn đổi ý tưởng hoặc cơ chế: sửa khối INFO trong \`tools/upgrade-legacy.mjs\` rồi chạy \`node tools/upgrade-legacy.mjs\`.
- Muốn đổi quy định chung cho mọi game (kể cả 12 file này): sửa \`tools/lib/core.mjs\` rồi chạy lại script.
`;
};

let n = 0;
const sizes = [];
for (const l of LEGACY) {
  const text = render(l);
  const bytes = Buffer.byteLength(text, 'utf8');
  if (bytes > LIMIT) throw new Error(`${l.id}: ${bytes} byte vượt trần ${LIMIT} — cắt bớt nội dung trong INFO.`);
  fs.writeFileSync(path.join(ROOT, l.file), text, 'utf8');
  sizes.push(`${l.id} ${String(bytes).padStart(5)} B`);
  n++;
}
console.log(`Đã sinh lại ${n} prompt legacy theo cấu trúc 5 mục (trần ${LIMIT} B/file):\n  ${sizes.join('\n  ')}`);
