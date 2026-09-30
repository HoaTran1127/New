// Sáu quy định NGHIỆM THU — game phải tự chứng minh nó đạt chuẩn, và người thử có đúng một bảng để bấm theo.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: đây là khâu gãy nhất của quy trình "chỉ viết prompt". Người dùng dán prompt vào Gemini Canvas,
// nhận về một file HTML dài vài nghìn dòng, và không có cách nào biết nó có toScreen thật không,
// verifyQuestionBank có chạy không, hay mô hình đã lặng lẽ bỏ bớt ba quy định ở giữa file.
// Không có nghiệm thu thì 40 quy định chỉ là 40 lời mong đợi.

// Mỗi phần tử mảng dưới đây là một thứ máy kiểm được (đếm bằng MACHINE_ITEMS.length) — nguồn cho ACCEPT.items và cho từng dòng của prompts/CHECKLIST_NGHIEP_THU.md.
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
  'tỉ lệ mục dang: "nhin" >= 60% và mọi mục dang: "tinh" chỉ mang một dấu phép tính với đề không quá 16 từ (đếm trên QUESTION_DATA đang phát hành)',
  'điểm một lượt tách thành +6 cho động tác và +3 cho đáp án, hiệu ứng nổ tại điểm chạm trước khi máy biết đúng sai, và không thẻ câu hỏi nào có đồng hồ đếm ngược',
  'AudioContext chỉ resume SAU cú bấm "Bắt đầu" (không một SFX hay nốt nhạc nào phát trước cú bấm đó), mỗi SFX <= 200 ms, master gain <= 0.25, không quá 4 giọng SFX phát đồng thời (nhạc nền đi bus riêng <= 3 giọng, tổng mọi giọng <= 7), và trạng thái "miti-mute" vẫn đọc được sau khi tải lại trang',
  'pháo giấy nổ đúng bốn loại mốc với 40–60 hạt sinh qua hàm chiếu điểm chạm (không nổ ở câu đúng thường), slow-mo chỉ chạy 600 ms cho thẻ vàng và 1,5 giây cuối hiệp 3, và navigator.vibrate luôn nằm trong if (navigator.vibrate)',
  'verifyIdentity() đã chạy lúc nạp: mascot tên riêng <= 2 từ hiện ở >= 5 chỗ, ba biến --miti-1/--miti-2/--miti-3 có thật trong CSS và khớp IDENTITY_DATA, đúng MỘT khoảnh khắc chữ ký dài >= 2 giây chỉ chạy 1 lần/phiên, một đạo cụ neo landmark, ba câu thoại <= 6 từ',
  'verifyMusic() đã chạy lúc nạp: loop nhạc nền tổng hợp bằng Web Audio (không có <audio src> hay fetch() file âm thanh ngoài), BPM nằm trong 100–128, gain bus nhạc <= 0.18, bus nhạc hạ xuống <= 30% khi speechSynthesis đang đọc, và bản "miti-mute" có vạch nhịp đập theo BPM thay cho tiếng',
  'verifyQueue() đã chạy lúc nạp: ba vai chờ (cổ vũ đủ 8 nhịp · trọng tài giơ thẻ "Động tác to / nhỏ" · thư ký đọc lại đề và đáp án) có nhãn tên trên HUD, đồng hồ chờ chạy riêng và gọi đúng tên em đang chờ ở giây 15, bộ đếm "Lượt của em <n>/3" đổi vai đúng sau 3 lượt trong 12 lượt, và +5 điểm của vai chờ chỉ vào thanh "Cả nhóm" chứ không vào "miti-best"',
  'verifyLesson() đã chạy lúc nạp: đồng hồ phiên "Còn <n> phút" có thật và phiên tự khép ở phút thứ 10 tại RANH GIỚI lượt (không cắt giữa lượt, thẻ câu hỏi vẫn không có đồng hồ đếm ngược), bốn mức gắng sức "dễ quá / vừa / mệt / kiệt" hiện cuối mỗi hiệp và đọc lại được từ localStorage "miti-effort", 15 giây "hồi nhịp" hít 4 nhịp – thở ra 6 nhịp chạy xong trước khi hiệp sau bắt đầu, và khối "Bản tiết học" in đủ bốn dòng lấy từ số thật',
  'verifyStandard() đã chạy lúc nạp: mọi câu mang nhãn mạch nằm trong tám mạch của tools/data/standards.mjs và HUD có thật (nhãn <= 18 ký tự, >= 18px), dòng "Yêu cầu cần đạt:" xuất hiện ở đúng hai màn và khớp NGUYÊN VĂN bảng chuẩn (không viết lại, không tóm tắt), mạch chính <= 9/12 lượt kèm >= 3 lượt thuộc mạch khác và tổng kết in "Hôm nay em chạm <n> mạch", mỗi cụm có "Dễ nhầm" ở câu đầu (<= 16 từ) và "Mẹo nhớ" <= 12 từ kèm động tác 3 giây',
  'verifySport() đã chạy lúc nạp: tên môn thể thao <= 4 từ lấy từ tools/data/sports.mjs có thật trên HUD và ở đúng hai màn, động tác đặc trưng của môn (<= 6 từ) được mascot làm mẫu 3 giây kèm hiệu lệnh <= 4 từ, nghi thức tinh thần thể thao chạy đúng hai lần (chạm khuỷu 3 giây trước hiệp 1 + lời hay <= 6 từ khi bạn sai, không dòng chế bai), bảng thành tích ba mốc giảm dần cho CẢ ĐỘI lưu "miti-sport" và động tác duỗi riêng của môn 15 giây nằm trong hạ nhiệt 45–60 giây',
  'verifyFamily() đã chạy lúc nạp: màn tổng kết in ĐÚNG MỘT khối "Gửi bố mẹ" gồm đúng bốn dòng (mỗi dòng <= 20 từ, chữ >= 20px) nằm trong khối "Copy tờ rời" copy được, bốn dòng lấy từ số thật của phiên chứ không phải chữ chép sẵn (thiếu thì in "chưa ghi được", cấm bịa), dòng "Việc 3 phút ở nhà" là một hoạt động không màn hình không ghi vở lấy đúng cột dongTac của môn kèm MỘT đề <= 16 từ đã chơi, và khối không có tên bạn khác, không xếp hạng, không dữ liệu cá nhân, không dòng đe dọa',
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
  'chơi liền 5 lượt đầu — em có phải nhíu mắt tính nhẩm không hay đang nhìn–chỉ–chọn rồi với tay? Nghe đề một lần có hiểu phải làm gì không?',
  'chơi tới 4 giây "Cả lớp: 3 – 2 – 1 – CHỐT!" trước hiệp 3 — bốn em đứng cạnh máy có thật sự hô theo và cùng làm một động tác mở màn, hay dòng chữ bị đọc lướt như một màn đếm mẫu?',
  'bật tiếng đầy đủ rồi mở game cho bốn em cùng chơi — SFX có ngắn và dễ chịu hay một tiếng "ting" lặp lại thành chói tai? Bấm "Tắt tiếng" rồi chơi trọn một hiệp: mọi phản hồi (đúng/sai/mốc) còn đọc được bằng chữ và hình không?',
  'chơi hai game cùng chủ đề liên tiếp rồi gập máy lại — em có gọi ra được tên mascot, màu và khoảnh khắc chữ ký của TỪNG game, hay với em vẫn là một game mặc hai bộ áo?',
  'nghe trọn một hiệp — nhạc có giữ nhịp cho em vận động theo (mỗi cú chốt rơi vào một phách mạnh) hay chỉ là tiếng nền vô định? Bấm "Tắt tiếng" rồi chơi tiếp: nhịp chuyển động có rớt dưới 12 lần mỗi phút không?',
  'cho bốn em đứng quanh một máy chơi trọn một hiệp — ba em chưa tới lượt có thật sự vận động (vỗ đủ 8 nhịp, giơ thẻ, đọc lại đề và đáp án) hay vẫn đứng xem? Đứng im 20 giây tới lượt: mascot có gọi đúng tên em đang chờ và ra một động tác 5 giây không?',
  'bấm giờ thật khi nhóm đầu cầm máy — phiên có tự khép ở phút thứ 10 ngay tại ranh giới lượt (không cắt giữa một em đang chơi) và dòng "Kế hoạch tiết 45 phút" in ra có đủ chỗ cho bốn nhóm không? Hỏi em cuối mỗi hiệp "dễ quá / vừa / mệt / kiệt": tới hiệp 3 mức có tăng thật hay em toàn chọn "dễ quá"?',
  'đọc to dòng "Yêu cầu cần đạt:" ở màn tổng kết và đối chiếu với sách giáo khoa của lớp — dòng đó có đúng yêu cầu của cụm này không, hay chỉ là một câu chung chung ai cũng viết được? Hỏi em đang chơi "câu vừa rồi thuộc mạch nào" và "mẹo nhớ là gì": em trả lời được thì nhãn mạch và mẹo đã vào đầu, nếu em chỉ đọc lại chữ trên HUD thì hai dòng đó đang trang trí.',
  'hỏi em đang chơi "mình đang tập môn gì" và "lúc nãy cơ nào được duỗi" — em có gọi ra được tên môn và động tác duỗi, hay cả buổi với em chỉ là vung tay chọn đáp án? Xem trọn một hiệp: bốn em có thật sự chạm khuỷu trước hiệp 1 và có nói lời hay khi bạn sai không? Đọc bảng thành tích cuối phiên: đó là mốc của CẢ ĐỘI hay đã vô tình biến thành xếp hạng cá nhân?',
  'copy tờ rời đưa cho bố mẹ đọc tại chỗ — trong mười giây họ có nói lại được con vừa tập môn gì, mẹo nào và cả nhà cùng làm gì trong 3 phút không? Việc 3 phút đó có buộc ai mở thêm màn hình, ghi vở, chụp ảnh hay mua đồ không? Đọc to tờ gửi về: có tên bạn nào khác, có dòng so sánh hay dọa dẫm nào lọt vào tay người ở nhà không?',
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
