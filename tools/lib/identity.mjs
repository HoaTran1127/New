// Sáu quy định BẢN SẮC RIÊNG — để 85 game không còn là một game mặc 85 bộ áo.
// validate.mjs so khớp nguyên văn các chuỗi này (Object.entries trong FULL_LAYERS) và kiểm cả dữ liệu
// trong tools/data/identities.mjs, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: đo 85 prompt sau vòng 12 cho thấy chỉ 1277/13692 dòng nội dung (9%) là riêng của từng
// game — trung bình 15 dòng riêng trên 161 dòng, tức 85 prompt giống nhau 91%. Những thứ tạo nên "đây là
// game nào" thì trống tuyệt đối: bảng màu riêng 0/85, mascot có tên riêng 0/85, khoảnh khắc cao trào riêng
// 0/85, đạo cụ riêng 0/85. Học sinh lớp 4 mở hai game liên tiếp sẽ thấy cùng một con mascot không tên,
// cùng một màu, cùng một màn pháo — không có lý do để nhớ mình vừa chơi game nào và quay lại game đó.
// Lớp này không thêm luật mới vào cách chơi: nó buộc mỗi game phải chứng minh mình khác 84 game kia bằng
// những thứ đếm được — tên, mã màu, câu thoại, một khoảnh khắc chỉ có ở game này.

export const IDENTITY = {
  // Không tên thì không có nhân vật; không nhân vật thì game không có ai để nhớ.
  mascot:
    'Mascot phải có tên riêng, tối đa HAI từ, và tên đó xuất hiện ở >= 5 chỗ trong game: lời chào màn Bắt đầu, nhãn nhỏ cạnh nhân vật trên HUD, mỗi câu thoại, tên mini-trạm nghỉ, màn tổng kết. CẤM gọi chung là "bạn MiTi" hay "trợ lý" ở mọi nơi — MiTi là thương hiệu, mascot là nhân vật của riêng game này. Tên mascot lấy từ bối cảnh của chính game (nhà máy, đường đua, bếp, chợ, hang đá), không đặt một cái tên dùng lại cho cả 85 game.',

  // Màu là thứ trẻ nhớ trước cả luật chơi.
  palette:
    'Bảng màu riêng gồm ba mã hex khai một lần trong \`:root\`: \`--miti-1\` cho vật thể AR chính, \`--miti-2\` cho particle và viền hit, \`--miti-3\` cho điểm nhấn HUD (thẻ vàng, thanh đích chung). Cả 85 bộ ba phải khác nhau, và hai game cùng cụm kiến thức phải có \`--miti-1\` cách nhau tối thiểu 60/441 theo khoảng cách RGB — mở hai game cùng chủ đề cạnh nhau phải thấy ngay là hai thế giới khác nhau. Chữ và nền chữ vẫn tuân thủ tương phản >= 4.5:1 của mục tiếp cận; bảng màu riêng không được lấy cớ làm chữ khó đọc.',

  // Một khoảnh khắc chỉ có ở game này là thứ em kể lại ngày hôm sau.
  signature:
    'Đúng MỘT "khoảnh khắc chữ ký" mỗi game: một hiệu ứng cao trào không có ở 84 game còn lại, diễn ra 1 lần/phiên (thêm tối đa 1 lần ở nghi thức mở thưởng cuối hiệp 3), dài >= 2 giây, không đổi luật chơi, không cộng điểm, không che đề bài, không nhấp nháy quá 3 lần/giây. Khoảnh khắc này phải bật ra từ cơ chế của chính game — đường đua thì đổ vạch đích, bếp thì bùng lửa, hang đá thì nhũ đá ngân — chứ không phải một màn pháo giấy chung chung.',

  // Vật ảo dính vào người chơi: bằng chứng game đang nhìn thấy em.
  prop:
    'Một đạo cụ AR riêng của game neo vào landmark của học sinh (cổ tay, vai, đầu, hông, lưng) bằng \`toScreen()\` và một điểm neo khớp xương: cờ đích sau vai, chiếc rổ trước ngực, ống nhòm trước mắt, thanh cân ngang thắt lưng. Đạo cụ chỉ có ở game này, đổi hình theo \`--miti-1\`, phản ứng theo kết quả (chuỗi đúng, vỡ chuỗi, tới mốc). Bản không camera thì đạo cụ đứng yên ở góc HUD dưới, KHÔNG biến mất; bản Giảm hiệu ứng chuyển động thì bỏ đung đưa, giữ nguyên hình. Cấm đạo cụ che mặt, che chữ đề hoặc che vùng tay đang chấm điểm.',

  // Ba câu thoại để em nghe thấy giọng của riêng game mình.
  lines:
    'Ba câu thoại riêng cho mỗi game, đọc bằng \`window.speechSynthesis\` (giọng vi-VN), MỘT câu tối đa 6 từ theo ba vai: câu khen khi chốt đúng, câu đỡ khi trả lời sai (không chế giễu), câu hô mở đầu trước hiệp 1. Không câu nào được lặp nguyên văn ở game khác, không dùng một câu khen chung cho 85 game, không vượt quá 3 câu thoại mỗi phút (theo hợp đồng âm thanh). Câu sai và câu khen vẫn phải hiện bằng chữ, phụ đề chạy song song để bản tắt tiếng vẫn đọc được.',

  // Chặn kiểu chép khối bản sắc của game bên cạnh cho qua luật.
  guard:
    'Bản sắc phải tra được về đúng game này: năm thành phần (tên mascot, bộ ba màu, khoảnh khắc chữ ký, đạo cụ, ba câu thoại) khai trong \`const IDENTITY_DATA = {...}\` đặt ở ĐẦU khối <script> trước engine, và \`verifyIdentity()\` chạy MỘT LẦN lúc nạp để kiểm — tên mascot <= 2 từ, cả ba mã hex đúng dạng \`#RRGGBB\`, mỗi câu thoại <= 6 từ, đúng MỘT khoảnh khắc chữ ký, đúng MỘT đạo cụ có điểm neo landmark, không trường nào rỗng. Trường nào thiếu thì \`console.warn\` nêu tên trường bằng tiếng Việt, game vẫn chơi đủ nhưng bảng kiểm ghi CHƯA ĐẠT ở mục bản sắc. CẤM chép nguyên khối bản sắc của game khác vào cho qua luật.',
};

// Dòng rút gọn cho chuỗi tự kiểm của prompt, block biến thể và legacy.
export const IDENTITY_SHORT =
  'mascot tên riêng <= 2 từ xuất hiện >= 5 chỗ · bảng màu riêng \`--miti-1/2/3\`, hai game cùng cụm cách nhau >= 60/441 RGB · một khoảnh khắc chữ ký 1 lần/phiên >= 2 giây không đổi luật · một đạo cụ AR neo landmark · ba câu thoại riêng <= 6 từ đọc bằng speechSynthesis';
