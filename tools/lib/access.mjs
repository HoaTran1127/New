// Sáu quy định tiếp cận + an toàn thần kinh, áp cho mọi prompt (game + biến thể + legacy).
// Bổ sung cho tools/lib/rules.mjs (an toàn cơ thể + hiệu năng) và tools/lib/feel.mjs (vận động/arcade).
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: game webcam có hiệu ứng mạnh và chơi trong lớp đông, nên bốn thứ hỏng trước tiên là
// hiệu ứng giật sáng quá nhanh (rủi ro với học sinh nhạy cảm ánh sáng), hiệu ứng chỉ tắt được bằng nút
// mà em nào cũng quên bấm, đúng/sai báo bằng đỏ–xanh lá nên học sinh mù màu chơi như bịt mắt,
// và cử chỉ một tay luôn giả định em thuận tay phải.

export const ACCESS = {
  // Trần nhấp nháy: an toàn thần kinh là ràng buộc cứng, không phải tùy chọn thẩm mỹ.
  flash:
    'Trần nhấp nháy an toàn: không hiệu ứng nào bật–tắt quá 3 lần mỗi giây, không giật sáng phủ toàn màn hình, và tổng diện tích vùng đang nhấp nháy không vượt 25% khung hình. "Flash khi mất máu" là viền mép đỏ mờ dần trong 200–300 ms chứ không phải cả khung hình giật trắng/đỏ; viền HUD theo combo thì đổi độ sáng MƯỢT (chuyển dần) thay vì bật tắt; particle và vệt neon không nhấp nháy theo nhịp. Nút Giảm hiệu ứng phải tắt được mọi hiệu ứng chớp, và nếu hệ thống đang đặt prefers-reduced-motion thì mặc định tắt sẵn.',

  // Cài đặt hệ thống của máy phải được tôn trọng mà không cần em tự tìm nút.
  reducedMotion:
    'Tự đọc cài đặt của máy: khi khởi động, chạy matchMedia("(prefers-reduced-motion: reduce)") và matchMedia("(prefers-contrast: more)") một lần rồi giữ kết quả. Nếu reduce là true thì BẬT SẴN chế độ Giảm hiệu ứng: tắt particle và speed lines, bỏ giật màn hình, hạ hit-stop xuống ~30 ms, mascot chỉ đổi biểu cảm chứ không nhảy — nhưng GIỮ NGUYÊN 100% nội dung học, số lượt, điểm và lời giải thích. Nút bật/tắt vẫn đó để em đổi lại theo ý mình, lựa chọn của em được lưu vào localStorage và không hỏi lại ở lần chơi sau.',

  // Màu không bao giờ là kênh thông tin duy nhất.
  notColorOnly:
    'Màu không bao giờ là kênh duy nhất: mọi trạng thái (đáp án đúng, đáp án sai, đang chọn, bị khóa, hết thời gian) phải phân biệt được bằng ÍT NHẤT HAI kênh ngoài màu — biểu tượng ✓ và ✗, một chữ tiếng Việt ngắn, hình dạng khác nhau (tròn/vuông/lục giác), độ đậm của viền và âm thanh khác nhau. Không dựa vào cặp đỏ–xanh lá để báo đúng/sai vì khoảng 8% học sinh nam và 0,5% học sinh nữ mù màu đỏ–lục; đã dùng màu thì hai màu phải khác hẳn nhau cả về độ sáng, và chế độ Giảm hiệu ứng không được bỏ mất kênh biểu tượng hay chữ.',

  // Âm thanh phải có bản chữ tương đương, và chữ phải có tiếng đọc.
  caption:
    'Mọi âm thanh đều có bản chữ tương đương: từ và câu tiếng Anh phát ra luôn đi kèm nút "Hiện chữ" bật được NGAY TỪ ĐẦU chứ không phải chờ trả lời sai mới hiện (nguyên tắc nghe-trước vẫn giữ: audio phát trước, chữ hiện khi em bấm hoặc sau khi chốt đáp án); lời giải, lời khen, thông báo lỗi và nội dung mascot nói đều có dạng chữ trên màn hình; âm báo combo, mất máu và thắng màn đều kèm một biểu tượng nhìn thấy được. Học sinh nghe kém hoặc chơi trong lớp ồn vẫn đạt 100% mục tiêu học tập mà không cần âm thanh; ngược lại học sinh đọc chưa vững vẫn chơi được bằng tai.',

  // Chữ phải đọc được trên khung hình thật, kể cả khi lớp phủ bị tắt.
  contrast:
    'Chữ đọc được trên nền thật: tỉ lệ tương phản giữa chữ và nền ngay sau lưng nó >= 4.5:1 (chữ lớn >= 24px thì >= 3:1); mỗi thẻ và đề bài tự có nền gradient tối + viền stroke >= 2px + bóng đổ, không trông chờ vào lớp phủ rgba(8,5,20,0.4). Dùng font sans-serif có dự phòng hệ thống, không chữ nghiêng mảnh, không chữ chỉ có viền, không tô gradient nhiều màu bên trong một dòng chữ. Tự kiểm bằng cách tắt lớp phủ đi: chữ vẫn phải đọc được trên khung hình đang sáng hoặc có cửa sổ phía sau.',

  // Cử chỉ một tay không được giả định tay thuận.
  handedness:
    'Tay thuận của học sinh: màn calibration hỏi bằng một chạm "Em thuận tay nào?" với ba lựa chọn Trái / Phải / Cả hai (mặc định Phải), rồi gán tay điều khiển theo lựa chọn đó — landmark đổi vai trò trái/phải, hướng dẫn bằng hình VÀ chữ được gương lại cho đúng ("với tay TRÁI sang trái"), vùng đích dàn ưu tiên về phía tay thuận và mốc tính biên độ 50% tầm với đo theo chính tay đó. Đổi tay thuận giữa chừng qua nút "Chỉnh lại tư thế", không mất điểm và không mất lượt; thuận tay trái không bị tính là sai tư thế, không bị trừ thời gian và không bị nhắc nhở.',
};

// Dòng rút gọn dùng cho checklist tự kiểm và cho block biến thể.
export const ACCESS_SHORT =
  'nhấp nháy <= 3 lần/giây và không phủ toàn màn hình · tự đọc prefers-reduced-motion rồi bật sẵn Giảm hiệu ứng · đúng/sai phân biệt bằng >= 2 kênh ngoài màu · mọi âm thanh có bản chữ · tương phản chữ >= 4.5:1 · có chọn tay thuận lúc calibration';
