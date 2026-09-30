// Sáu quy định "vai chờ có vận động" — tầng thứ mười lăm của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm từ khóa trong prompts/0X-*/):
//   "bốn em" = 85/85   "cổ vũ" = 0/85   "trọng tài" = 0/85   "thư ký" = 0/85
//   "đến lượt" = 0/85   "xoay vòng" = 0/85   "chỗ đứng" = 0/85   "khoảng trống" = 0/85
// Tức là mọi prompt đều BIẾT một máy có bốn em đứng quanh, nhưng không prompt nào nói ba em
// còn lại làm gì trong khi một em cầm máy. Hệ quả thật ở lớp: một tiết 45 phút chia bốn nhóm,
// mỗi em chạm máy khoảng 4 phút, còn lại ba em đứng xem — đúng thứ mục tiêu thể dục cấm.
// CLASSROOM.twoPlayer mới chỉ giải quyết hai em CÙNG chơi; file này quy định ba em CHƯA tới lượt.
//
// validate.mjs so khớp nguyên văn từng chuỗi ở dưới, nên sửa số ở đây là sửa ở 85 prompt,
// 425 block biến thể, 12 prompt legacy và bảng kiểm nghiệm thu cùng một lúc.

export const QUEUE = {
  // Ba em chưa tới lượt phải có việc, không được đứng xem.
  roles:
    'Bốn vai trong một phiên một máy: một em đang chơi điều khiển bằng cơ thể, ba em còn lại mỗi em MỘT vai có động tác và có tên ngay trên HUD. Vai "Cổ vũ" giữ nhịp vỗ tay hoặc dậm chân theo vạch nhịp, mỗi lần đủ 8 nhịp (không cần camera thấy). Vai "Trọng tài" giơ thẻ "Động tác to" / "Động tác nhỏ" bằng tay lên ngang vai ngay sau mỗi cú chốt của bạn — em tự giơ là đủ, game không nhận diện thẻ. Vai "Thư ký" đọc to lại đề bài và đáp án đúng cùng lúc `speechSynthesis` chạy (đây là chỗ luyện phát âm tốt nhất của game Tiếng Anh). CẤM để một em làm "người xem" không có việc; chỉ có hai em thì bỏ vai Thư ký; chỉ có một em thì HUD vai chờ ẩn hẳn chứ không hiện ô trống, game vẫn chơi trọn 12 lượt.',

  // Lượt chơi chia đều theo số em, giáo viên đổi được bất cứ lúc nào.
  rotate:
    'Xoay vòng cứng theo lượt: 12 lượt chính chia đều cho số em đang chơi, mặc định bốn em là 3 lượt mỗi em. Bộ đếm `currentPlayer` quyết định ai đang cầm máy; HUD ghi "Lượt của em: <tên> · <n>/3" và đổi vai ngay khi em đó hết 3 lượt — hết lượt thì sang vai Cổ vũ ở hiệp sau chứ không được cầm máy hai lượt liên tiếp quá 3 lần. Nút "Đổi người chơi" cho giáo viên bấm bất cứ lúc nào: game đổi vai tức thì, không trừ tim, không hỏi lý do, không khóa lượt đang chạy. Một phiên mà một em chơi quá 6 trên 12 lượt là lỗi cân bằng, không phải "em đó nhanh hơn".',

  // Trần thời gian đứng không — con số duy nhất chứng minh tiết học vẫn là tiết vận động.
  waitCap:
    'Trần đứng chờ 20 giây: mỗi vai không cầm máy có một đồng hồ chờ riêng (không phải đồng hồ lượt chơi). Tới 15 giây thì mascot gọi đúng tên em đang chờ kèm một động tác 5 giây làm mẫu tại chỗ (hai tay lên cao rồi hạ, khuỵu gối, xoay hông — chọn theo hiệp đang chạy), hiện ở dải dưới HUD chứ không che đề bài; tới 20 giây mà em vẫn đứng im thì động tác đó tự bật thành nhiệm vụ "Cả nhóm cùng làm 5 giây" và tính +5 điểm cho thanh "Cả nhóm". Đồng hồ vận động AR vẫn chỉ đo em cầm máy; ba em vai chờ được đếm bằng số nhịp cổ vũ, số thẻ giơ và số lần đọc lại, ghi ở dòng "Bốn em hôm nay" chứ không nhập vào đồng hồ AR để tránh số ảo.',

  // Bốn em đứng quanh một máy: giãn cách và quyền vào khung hình.
  spacing:
    'Giãn cách khi bốn em cùng đứng: màn "Định vị" yêu cầu mỗi em đứng trong một vòng tròn 1 sải tay tính từ vai mình, máy đặt cách em đang chơi >= 1,2 m, hai em vai chờ đứng SAU vạch vai chứ không đứng sát hông bạn đang chơi. Camera không thấy hết bốn em là chuyện bình thường và KHÔNG được báo lỗi — chỉ em đang chơi cần vào khung hình (theo đàm phán mức camera). Trước mỗi lần đổi người có 20 giây "vào vị trí" đếm 3-2-1 theo nhịp nhạc, trong lúc đó không thẻ nào rơi và không đồng hồ nào tính. Cấm mọi nhiệm vụ đòi hai em chạm tay nhau, đổi chỗ cho nhau hoặc đi chéo qua vùng đang chơi khi thẻ còn đang bay.',

  // Điểm của vai chờ vào nhóm, không vào cá nhân — giữ luật thi đua đã có ở tầng hype.
  teamScore:
    'Điểm vai chờ đi vào "Cả nhóm", không vào cá nhân: mỗi lần Trọng tài giơ thẻ đúng lúc, Thư ký đọc lại đúng đáp án, hoặc Cổ vũ giữ đủ 8 nhịp thì +5 điểm động tác cho thanh "Cả nhóm <x>/<mốc>" đang có sẵn; điểm này KHÔNG cộng vào "miti-best", KHÔNG đổi thứ hạng của em đang chơi, và không trừ khi em làm sai. Màn tổng kết in thêm một dòng "Bốn em hôm nay: <tên> <n> động tác, <tên> <n> nhịp cổ vũ" cho giáo viên, nằm trong khối chữ mà nút "Copy tờ rời" copy được.',

  // Nghiệm thu: vai chờ có thật hay chỉ là chữ trên màn hình.
  guard:
    '`verifyQueue()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — ba vai chờ có thật với nhãn tên trên HUD, đồng hồ chờ chạy riêng cho vai không cầm máy và gọi tên em ở giây 15, bộ đếm "Lượt của em <n>/3" tăng đúng và đổi vai khi đủ 3 lượt, điểm vai chờ chỉ vào thanh "Cả nhóm". Thiếu điều nào thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản một học sinh: verifyQueue() bỏ qua hai mục vai chờ và đồng hồ chờ (không báo lỗi giả), vẫn bắt buộc kiểm bộ đếm lượt.',
};

// Dòng rút gọn cho chuỗi "Tự kiểm tra trước khi xuất" của prompt và block biến thể.
export const QUEUE_SHORT =
  'bốn vai có động tác (chơi · cổ vũ đủ 8 nhịp · trọng tài giơ thẻ · thư ký đọc lại đề và đáp án) · xoay vòng cứng 3 lượt/em trong 12 lượt với HUD "Lượt của em <n>/3", nút "Đổi người chơi" không trừ tim · trần 20 giây đứng chờ, giây 15 mascot gọi tên làm động tác 5 giây · mỗi em một vòng 1 sải tay, máy cách >= 1,2 m, 20 giây vào vị trí khi đổi người · +5 điểm vai chờ vào "Cả nhóm", không vào "miti-best" · verifyQueue() kiểm lúc nạp';
