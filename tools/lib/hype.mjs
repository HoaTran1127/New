// Sáu quy định THI ĐUA + CAO TRÀO — phần "muốn chơi lại" mà tools/lib/feel.mjs (cảm giác từng cú chạm) chưa phủ.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: feel.mjs làm mỗi cú chạm đã đã mắt (hit-stop, combo, chữ khen, thẻ vàng), nhưng một game
// có cú chạm đẹp vẫn có thể nhàm sau phút thứ hai vì KHÔNG CÓ GÌ ĐỂ CHỜ ĐỢI: không mốc để phá, không hiệp
// căng hơn, không khoảnh khắc mở thưởng, không lý do reo lên. Khảo sát 85 prompt: "kỷ lục" = 0,
// "phá kỷ lục" = 0, "bóng ma" = 0, "mở thưởng/quay số" = 0, "hiệp quyết định" = 0, "đích chung" = 0.
// Ngược lại, thi đua trong lớp học rất dễ trượt sang xếp hạng bạn này bạn kia — thứ mà quy định
// "không leaderboard" và CLASSROOM.twoPlayer đã cấm — nên mọi mốc so sánh ở đây đều là với CHÍNH MÌNH
// hoặc với một ĐÍCH CHUNG mà cả nhóm cùng nhắm tới.

export const HYPE = {
  // Ba giây đầu quyết định em có tin đây là game thật không.
  hook:
    'Khoảnh khắc ba giây đầu: ngay khi vào gameplay (chưa vào lượt 1), chơi một cú "ồ" — một vật thể AR cỡ lớn bay ngang sát phía trước người chơi với vệt neon và tiếng "vút", mascot chào bằng đúng một dòng nhiệm vụ của lượt sắp tới ("Với tay đập vào phân số to bằng nửa người!"), chữ nhiệm vụ >= 44px. Không mở màn bằng màn chữ dài, không bằng bảng hướng dẫn; hướng dẫn vẫn nằm ở nút "Xem cách chuyển động". Bản không camera dùng vệt sáng mô phỏng trên nền tối, bản Giảm hiệu ứng thì vật thể trượt tới chậm và không rung màn hình.',

  // Mốc để phá phải là của chính em, không phải của bạn ngồi cạnh.
  personalBest:
    'Kỷ lục của chính em: lưu vào localStorage key "miti-best" ba số duy nhất { điểm cao nhất, chuỗi đúng dài nhất, ngày } — không tên, không ảnh, không nội dung câu hỏi; máy có nhiều em thì tính riêng cho từng nửa màn hình ở chế độ hai học sinh và không gộp. Từ hiệp 2, HUD có một dòng nhỏ "Kỷ lục: <n> · Em đang: <m>". Khi <m> vượt <n>, nổ đúng một lần sự kiện "PHÁ KỶ LỤC!" trong 1,2 giây (chữ to + âm riêng + một thẻ bộ sưu tập), và màn tổng kết có câu "Em hơn bản thân lần trước: +<x> điểm". Chưa có "miti-best" thì ẩn hẳn dòng kỷ lục, không hiện số 0.',

  // Đuổi theo vệt của chính mình phiên trước — hình thức thi đua không cần so với ai.
  ghost:
    'Vệt của em (ghost): ở lượt đầu tiên của mỗi hiệp, một vệt sáng KHÔNG PHẢI ảnh người (alpha <= 0.35, chỉ là dải sáng hình người cách điệu) chạy trước đúng nhịp của lượt tốt nhất mà em từng làm ở phiên trước (lưu { giây, combo } trong "miti-best"); về trước vệt thì +5 điểm thưởng và chữ "NHANH HƠN EM HÔM QUA!". Không có dữ liệu phiên trước thì bỏ hẳn vệt, không hiện chữ "thua" hay "chậm hơn". Bản Giảm hiệu ứng thay vệt bằng một con số ("Mốc của em: 3,2 giây").',

  // Ba hiệp phải khác nhau về độ căng, nếu không hiệp 3 cũng chỉ là hiệp 1 lặp lại.
  climax:
    'Hiệp quyết định: ba hiệp phải leo thang thật — hiệp 1 nền tĩnh, thời gian thẻ 4,5 giây; hiệp 2 viền HUD sáng dần theo combo, thời gian thẻ 3,75 giây; hiệp 3 mang nhãn "HIỆP QUYẾT ĐỊNH": điểm nhân đôi, thêm đúng 1 thẻ vàng, mascot hô mở đầu hiệp và âm nền nhanh hơn (vẫn dưới trần nhấp nháy 3 lần mỗi giây). Mỗi hiệp vẫn 4 lượt, vẫn trạm nghỉ 5 giây giữa hiệp, ngân hàng câu hỏi và mức độ KHÔNG đổi theo hiệp; sai ở hiệp 3 không bị phạt nặng hơn sai ở hiệp 1 (vẫn dừng 2 giây và hiện lời giải).',

  // Chờ đợi một phần thưởng cũng là một động lực; nhưng phần thưởng không được đổi nội dung học.
  reveal:
    'Nghi thức mở thưởng: cuối mỗi hiệp có 2,5 giây mở phong bao — ba nhịp quay qua đúng ba phương án (thẻ bộ sưu tập / +10 điểm / quyền chọn câu ở mức dễ hơn một bậc) rồi dừng lại một phương án, kèm tiếng "tách". Phần thưởng luôn có, không bao giờ "trắng", và KHÔNG đổi level thích ứng đang chạy (quyền chọn câu dễ hơn chỉ áp dụng cho đúng một lượt). Bản Giảm hiệu ứng và bản không camera mở ngay bằng chữ cùng nút "Nhận", không quay.',

  // Thi đua với một đích chung, tuyệt đối không biến thành bảng xếp hạng bạn bè.
  sharedGoal:
    'Đích chung của cả nhóm: một cột tiến độ "Cả nhóm: <x>/<mốc> câu đúng" (mốc mặc định 40, người lớn đổi được trong khoảng 20–60) nằm ở dải dưới màn chơi, tăng lên sau mỗi lượt đúng của bất kỳ em nào trên máy. Khi chạm mốc, cả màn ăn mừng 3 giây và mở một thẻ bộ sưu tập CHUNG. Cột này chỉ hiện tổng số câu đúng, KHÔNG hiện điểm từng em cạnh nhau, không tên, không hạng nhất — đây là đích chung, không phải bảng xếp hạng.',
};

// Dòng rút gọn dùng cho checklist, chuỗi quy ước và block biến thể.
export const HYPE_SHORT =
  'cú "ồ" 3 giây đầu · "miti-best" + sự kiện PHÁ KỶ LỤC · vệt ghost của chính em (alpha <= 0.35) · hiệp 3 "HIỆP QUYẾT ĐỊNH" nhân đôi điểm · nghi thức mở thưởng 2,5 giây cuối hiệp · đích chung "Cả nhóm <x>/<mốc>", không xếp hạng bạn';
