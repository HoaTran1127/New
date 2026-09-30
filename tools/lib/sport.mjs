// Tầng "chất thể thao": một giờ giáo dục thể chất có TÊN MÔN, có đội, có nghi thức chơi đẹp,
// có thành tích của cả đội và có động tác duỗi cơ cuối buổi — năm thứ mà game webcam lớp 4–5
// đang thiếu (khảo sát 85 prompt: "môn thể thao" 0/85, "đồng đội" 0/85, "tinh thần thể thao"
// 0/85, "bảng thành tích" 0/85, "duỗi cơ" 0/85).

export const SPORT = {
  monDanh:
    'Mỗi game mang đúng MỘT môn thể thao thật, lấy từ `tools/data/sports.mjs` theo mã điều khiển của chính game — tên môn **<= 4 từ**, hiện ở HUD góc trên phải (chữ **>= 18px**, nền đặc, không nhấp nháy) suốt phiên, kèm màn khởi động một dòng "Hôm nay ta tập môn <môn>" và màn tổng kết một dòng "Môn thi đấu hôm nay: <môn>" nằm trong khối mà nút "Copy tờ rời" copy được. CẤM thay tên môn bằng mô tả động tác chung chung kiểu "vung tay chọn đáp án"; CẤM đổi môn giữa chừng trong một phiên.',

  dongTacChinh:
    'Động tác của MỌI lượt là động tác đặc trưng của môn đó (cột `dongTac`, **<= 6 từ**), mascot làm mẫu **3 giây** ở đầu mỗi hiệp và hô hiệu lệnh của môn (cột `hieuLenh`, **<= 4 từ**) bằng `speechSynthesis` để cả nhóm hô lại trước lượt đầu tiên. Biên độ vẫn **>= 50% tầm với** đã calibration và vẫn tuân nguyên văn trần tải trọng của tầng thể dục (`PE.loadCap`): cấm nhảy tiếp đất, cấm xoay nhanh quá 90 độ, cấm giữ tay trên cao quá 15 giây. Màn tổng kết đếm "**Em đã <động tác> <n> lần**" bằng số thật, không phải số điểm.',

  tiepSuc:
    '12 lượt chính là một **đường tiếp sức**: một gậy tiếp sức ảo (vật AR neo vào landmark bàn tay, alpha **<= 0.45**) nằm trong tay em đang chơi và được **truyền tay** sang em kế ngay khi em đó hết 3 lượt; truyền xong mới tới lượt kế, không cắt giữa lượt. CẤM coi rơi gậy là thua: gậy lệch chỉ hiện đúng một dòng "Không sao, chạy tiếp", **không trừ tim, không trừ điểm**. Mỗi hiệp khép bằng đúng MỘT thanh đích chung mà tầng thi đua đã dựng (`HYPE.sharedGoal`) — khi chạy tiếp sức thì nhãn đọc là "Đội mình: `<x>`/`<mốc>`", CẤM dựng thêm bảng đích thứ hai trên HUD.',

  tinhThan:
    'Nghi thức tinh thần thể thao chạy **đúng hai lần một phiên**: (1) trước hiệp 1, cả bốn em quay vào nhau chạm khuỷu hoặc bắt tay **3 giây**, mascot hô "Chơi đẹp!"; (2) khi một em trả lời sai, em đang ở vai cổ vũ nói một **lời hay <= 6 từ** lấy từ cột `loiHay` của môn, hiện trên HUD **4 giây** kèm phụ đề chữ. CẤM mọi dòng chế bai ("Ôi sai rồi", "Dễ thế cũng sai", "Thua rồi"); sai là lúc cần lời hay nhất. Tổng kết in "Tinh thần thể thao: `<n>` lời hay đã nói" bằng số đếm thật, thiếu số thì in "chưa ghi được".',

  thanhTich:
    'Bảng thành tích cuối phiên có **ba mốc giảm dần** cho CẢ ĐỘI (Vàng >= `<x>` động tác, Bạc >= `<y>`, Đồng >= `<z>`, với x > y > z và đặt theo đúng 12 lượt của phiên), đội nhận **một** màu huy chương in kèm số động tác thật. Lưu localStorage `"miti-sport"` (môn + huy chương + số động tác của phiên) và đọc lại ở phiên sau bằng một dòng "Kỳ trước cả đội đạt `<màu>` — `<n>` động tác". CẤM xếp hạng cá nhân, CẤM so bảng thành tích giữa các máy hoặc giữa các nhóm, CẤM biến huy chương thành điều kiện mở khóa nội dung.',

  hoiTinh:
    'Hạ nhiệt 45–60 giây của tầng thể dục có BA động tác giãn cơ chậm; tầng thể thao thay động tác GIỮA bằng động tác duỗi riêng của môn (cột `duoiCo`, **15 giây** — đúng thời lượng PE.coolDown đã chia cho một động tác, không được thay bằng "thả lỏng tự do"), hai động tác hai bên giữ nguyên "duỗi tay ngang ngực 15 giây mỗi bên" và "kéo vai ra sau 10 nhịp" kèm nhịp thở 4 vào – 4 ra. HUD "Cơ em đang duỗi: `<tên>`" (chữ **>= 20px**, không nhấp nháy) đổi theo động tác đang làm và mascot đọc tên cơ bằng `speechSynthesis`. CẤM duỗi bật nhịp (ballistic), CẤM ép em chạm gót tay xuống đất. `prefers-reduced-motion` rút còn HAI động tác duỗi, mỗi động tác 10 giây, vẫn nằm trong cửa sổ hạ nhiệt.',

  guard:
    '`verifySport()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — tên môn có thật trên HUD và ở đúng hai màn · động tác môn được mascot làm mẫu 3 giây kèm hiệu lệnh · nghi thức tinh thần thể thao chạy đủ hai lần (chạm khuỷu trước hiệp 1 + lời hay khi bạn sai) · bảng thành tích ba mốc và động tác duỗi của môn nằm trong hạ nhiệt. Thiếu điều nào thì `console.warn` tiếng Việt nêu rõ điều nào lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản tắt tiếng, bản reduced-motion và bản không camera **vẫn bắt buộc kiểm đủ bốn điều** trên.',
};

export const SPORT_SHORT =
  'tên môn thể thao <= 4 từ trên HUD + hai màn · động tác đặc trưng của môn <= 6 từ, mascot làm mẫu 3 giây kèm hiệu lệnh <= 4 từ · gậy tiếp sức ảo truyền tay sau 3 lượt, rơi gậy không trừ tim · chạm khuỷu 3 giây trước hiệp 1 + lời hay <= 6 từ khi bạn sai · bảng thành tích ba mốc cho cả đội, huy chương lưu "miti-sport", cấm xếp hạng cá nhân · động tác duỗi riêng của môn 15 giây trong hạ nhiệt 45–60 giây · verifySport() kiểm lúc nạp';
