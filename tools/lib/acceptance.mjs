// Năm quy định NGHIỆM THU — game phải tự chứng minh nó đạt chuẩn, và người thử có đúng một bảng để bấm theo.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: đây là khâu gãy nhất của quy trình "chỉ viết prompt". Người dùng dán prompt vào Gemini Canvas,
// nhận về một file HTML dài vài nghìn dòng, và không có cách nào biết nó có toScreen thật không,
// verifyQuestionBank có chạy không, hay mô hình đã lặng lẽ bỏ bớt ba quy định ở giữa file.
// Không có nghiệm thu thì 40 quy định chỉ là 40 lời mong đợi.

// 19 thứ máy kiểm được — nguồn cho ACCEPT.items và cho từng dòng của prompts/CHECKLIST_NGHIEP_THU.md.
export const MACHINE_ITEMS = [
  'QUESTION_DATA đủ số mục yêu cầu và verifyQuestionBank() ĐÃ chạy trước lượt chơi đầu tiên',
  'mọi mục đang phát hành có answer nằm trong choices đúng một lần',
  'drawImage khung hình webcam đi qua toScreen(lx, ly), không còn phép nhân thô với W/H',
  'alpha lớp phủ tối đang dùng <= 0.45',
  'có ít nhất một vật thể neo vào landmark và cập nhật mỗi khung hình',
  'giữ nguyên một tư thế 2 giây không sinh thêm cú chốt nào (cooldown + hysteresis hoạt động)',
  'tab ẩn là tự Pause và khi quay lại có đếm 3-2-1',
  '12 lượt chia 3 hiệp và giữa hiệp có trạm nghỉ 5 giây',
  'matchMedia prefers-reduced-motion được đọc và có hiệu lực thật',
  'bộ đếm flash đo được không thành phần nào bật–tắt quá 3 lần mỗi giây',
  'tỉ lệ tương phản tính từ màu thật đang dùng >= 4.5:1 cho chữ thường và >= 3:1 cho chữ lớn',
  'lựa chọn tay thuận được áp dụng vào tay điều khiển',
  'localStorage ghi và đọc được cả "miti-collection" lẫn "miti-mastery"',
  '2 câu đúng liên tiếp làm level tăng và câu sai thứ 4 trong chuỗi bị rơi vào level 1 (thích ứng + sàn chống nản chạy thật)',
  'không có URL bị cấm nào được tải — bốn thư viện mà bản chuẩn MiTi loại (xem mục phụ thuộc của prompt) phải không xuất hiện trong Network',
  'chữ ký MiTi có mặt ở cả ba màn Bắt đầu / HUD / Kết quả',
  'khởi động 60–90 giây đã chạy trước hiệp 1 và hạ nhiệt 45–60 giây đã chạy trước màn tổng kết',
  'nhịp thẻ đúng chuẩn: 3,0–4,5 giây bay vào, ở lại <= 8 giây, và phiên đạt >= 12 nhịp chuyển động mỗi phút (đếm theo ngưỡng 15% tầm với, chia số phút chơi thật)',
  'đồng hồ thời gian vận động tích lũy đạt >= 60% thời lượng phiên',
  'lịch ôn +1, +3, +7 ngày được ghi vào localStorage "miti-review" và đọc lại được sau khi đóng rồi mở lại tab',
  'phiên có >= 3 lượt thuộc cụm khác cụm chính và >= 1 lượt là câu đến hạn ôn, đếm từ danh sách lượt thật',
  'câu "Em còn nhớ không?" chạy 10 giây trước lượt 1 và trả lời sai ở đó không trừ tim, không cắt chuỗi đúng',
  'HUD có dòng "Kỷ lục: <n> · Em đang: <m>" và sự kiện PHÁ KỶ LỤC chỉ nổ khi điểm thật vượt mốc đã lưu trong "miti-best"',
  'hiệp 3 chạy "HIỆP QUYẾT ĐỊNH" (điểm nhân đôi, thêm 1 thẻ vàng) nhưng vẫn đúng 4 lượt và trạm nghỉ 5 giây',
  'nghi thức mở thưởng cuối mỗi hiệp dài 2,5 giây, luôn có phần thưởng, không đổi level thích ứng và mở ngay khi reduced-motion',
  '"miti-tokens" giữ được khiên chuỗi và quyền chọn câu sang phiên sau (tối đa 2); khiên vỡ khi dùng, chuỗi đúng không bị cắt nhưng vẫn trừ 1 tim, vẫn hiện lời giải và câu đó vẫn vào hàng đợi luyện lại',
  'màn tổng kết in đúng một dòng "Lần sau em quay lại sẽ có <n> câu đang chờ" với n đếm từ "miti-review" (mục đến hạn trong 7 ngày tới, trần 4), không có chuỗi ngày chơi và không dòng nào nhắc em đã nghỉ bao lâu',
];

// Những việc con người phải bấm tay — máy không tự kiểm được, nguồn cho ACCEPT.manual và bảng in.
export const HUMAN_CHECKS = [
  'đứng xa camera tới mức chỉ còn thấy hai bàn tay — game có hạ cơ chế xuống mức "chỉ thấy tay" hay đứng màn chờ?',
  'giữ im một tư thế 5 giây — có bị spam cú chốt hay trừ tim không?',
  'lấy tay che nửa người trước camera — vật neo có biến mất kèm hướng dẫn tiếng Việt thay vì nhảy lung tung?',
  'tắt camera giữa vòng chơi — game có vào tiếp chế độ không camera mà không mất điểm và lượt?',
  'rút mạng lúc đang tải model — có thông báo tiếng Việt và chơi được tiếp?',
  'đổi tay thuận sang Trái giữa chừng bằng nút "Chỉnh lại tư thế" — hướng dẫn có gương lại đúng bên?',
  'bật sẵn reduced-motion trong hệ điều hành rồi mở game — hiệu ứng có tắt sẵn và nội dung học vẫn nguyên?',
  'cố tình sai 4 câu liên tiếp — câu thứ 4 có về level 1 kèm lời giải từng bước và không trừ tim lần hai?',
  'mở bằng điện thoại đặt dọc — đề bài còn >= 20px và hai tay còn trong khung hình?',
  'đưa cho một học sinh lớp 4 chưa đọc hướng dẫn chơi thử 60 giây — em có tự hiểu phải làm gì không?',
  'chơi trọn một phiên rồi đứng lại 30 giây — em có thở nhanh hơn và người ấm lên rõ rệt không (bài test thể dục, không phải test code)?',
  'làm động tác cúi thấp ở lượt cuối rồi đứng thẳng lên nhanh — có choáng váng hay mất thăng bằng không (kiểm trần tải trọng và bước hạ nhiệt)?',
  'chơi hai phiên cách nhau một ngày — phiên sau có mở bằng đúng câu em làm hôm trước và xếp câu đến hạn ôn lên trước câu mới không?',
  'cố tình trả lời sai một câu từng đúng hai lần ở phiên hôm sau — game có giữ lời "quên thì không phạt" (không trừ tim, không cắt chuỗi) hay vẫn phạt em?',
  'vừa bấm BẮT ĐẦU được 3 giây — em có cảm giác đây là game thật (một cú "ồ") hay chỉ là màn chữ?',
  'chơi hai phiên liên tiếp — phiên sau có hiện đúng "Kỷ lục: <n>" của phiên trước và vệt ghost chạy theo đúng lượt tốt nhất không?',
  'chơi đến hiệp 3 — em có nhận ra hiệp này căng hơn thật (điểm nhân đôi, thẻ vàng thêm) mà câu hỏi không khó hơn không?',
  'để dành tới phiên sau rồi chơi tiếp — khiên chuỗi có còn trong "miti-tokens" và có dùng được thật không (làm sai một câu: chuỗi giữ mà tim vẫn giảm, lời giải vẫn hiện)?',
  'đọc dòng "Chương tiếp theo" và bấm "Xem trước" ở màn tổng kết — em có hỏi khi nào được chơi chương đó, hay dòng chữ bị đọc như quảng cáo?',
];

// Những mục máy chỉ kiểm được khi có webcam: bản không camera bỏ qua chúng, các mục còn lại vẫn phải đạt.
// Mục 19 (đồng hồ thời gian vận động) tính từ landmark cơ thể nên cũng thuộc nhóm 📷.
export const CAMERA_ONLY = [3, 4, 5, 6, 12, 19];
export const CAMERA_ITEMS = CAMERA_ONLY.length;
export const OFFLINE_ITEMS = MACHINE_ITEMS.length - CAMERA_ITEMS;

const numbered = (arr, mark = false) =>
  arr.map((s, i) => `(${i + 1}) ${s}${mark && CAMERA_ONLY.includes(i + 1) ? ' 📷' : ''}`).join('; ');

// Đánh dấu 📷 để hàng in ra cũng nói được mục này thuộc phiên bản nào.
export const rowLabel = (s, i) => `- [ ] ${s}${CAMERA_ONLY.includes(i + 1) ? ' 📷' : ''}`;

export const ACCEPT = {
  // Game phải tự kiểm chính mình và in ra kết quả, không chờ người lớn đọc code.
  selfReport:
    'Bảng kiểm MiTi (tự nghiệm thu trong game): mọi game có một bảng ẩn mở bằng cách bấm 7 lần vào logo MiTi hoặc tổ hợp Ctrl+Alt+K. Bảng liệt kê TỪNG ràng buộc kèm trạng thái ĐẠT / CHƯA ĐẠT, và trạng thái đó phải do code kiểm thật lúc chạy — không phải một danh sách chữ tĩnh do người viết kê ra. Bảng nằm trong màn tổng kết và màn Bắt đầu, chỉ người lớn mở được, không ảnh hưởng điểm hay lượt chơi.',

  // Bản không camera vẫn phải tự nghiệm thu, chỉ bỏ những mục ràng buộc với khung hình webcam.
  noCamera: `Bản không camera bỏ ${CAMERA_ONLY.length} mục gắn 📷 và vẫn phải đạt ${MACHINE_ITEMS.length - CAMERA_ONLY.length} mục còn lại; không được vì thiếu camera mà bỏ luôn bảng kiểm.`,

  // Những thứ máy kiểm được thì máy phải kiểm, đừng đùn đẩy cho người thử.
  items: `Mục máy tự kiểm (${MACHINE_ITEMS.length} mục, mỗi mục một hàm trả true/false): ${numbered(MACHINE_ITEMS, true)}.`,

  // Kết quả nghiệm thu phải thành một bản văn đưa cho giáo viên được.
  printable:
    'Xuất bản văn: bảng kiểm có nút "Xuất bản văn" sinh ra một khối chữ tiếng Việt copy được, gồm tên game, bản chuẩn MiTi, ngày giờ, kiểu điều khiển đang chạy, số mục ĐẠT / CHƯA ĐẠT và danh sách cụ thể từng mục chưa đạt kèm lý do. Khối chữ chỉ hiện trên màn hình và vào clipboard máy đó — KHÔNG gửi lên máy chủ nào, không để lại dữ liệu, không xin quyền.',

  // Một mục chưa đạt phải nói được vì sao, nếu không bảng kiểm thành trang chữ đỏ vô ích.
  failRule:
    'Mục CHƯA ĐẠT phải giải thích được: mỗi dòng chưa đạt kèm một câu nguyên nhân kỹ thuật ngắn cho người lớn (ví dụ "toScreen không được dùng ở drawImage — vật thể đang tính bằng lx * W") và một câu nên sửa thế nào trong prompt. Cấm để bảng chỉ báo "lỗi" rồi im lặng, cấm đổ lỗi chung chung kiểu "hệ thống có vấn đề". Bảng không trừ tim, không chặn chơi; học sinh không nhìn thấy bảng này.',

  // Phần máy không kiểm được thì phải có người bấm theo đúng thứ tự, trong thời lượng thật của một tiết học.
  manual: `Bảng kiểm người thử (${HUMAN_CHECKS.length} việc máy không tự kiểm được, làm theo đúng thứ tự, khoảng 15 phút): ${numbered(HUMAN_CHECKS)}. Ghi lại kết quả từng việc vào bảng kiểm trước khi nộp game.`,
};

// Dòng rút gọn cho checklist tự kiểm và block biến thể.
export const ACCEPT_SHORT =
  `bảng kiểm ẩn mở bằng 7 lần chạm logo MiTi, trạng thái do code kiểm thật · ${MACHINE_ITEMS.length} mục máy tự kiểm + ${HUMAN_CHECKS.length} việc người thử bấm tay · xuất được bản văn copy, không gửi đi đâu · mục chưa đạt phải có nguyên nhân và cách sửa`;
