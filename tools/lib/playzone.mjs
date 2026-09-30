// Sáu quy định "chỗ chơi an toàn" — tầng thứ hai mươi mốt của thư viện prompt.
//
// Khảo sát 85 prompt trước khi viết file này (đếm từ khóa trong prompts/0X-*/ + tools/lib/ + 4 tài liệu):
//   "dép" 0/85   "quai hậu" 0/85   "giày" 0/85   "chân đất" 0/85   "sàn trơn" 0/85   "bàn ghế" 0/85
//   "dẹp" 0/85   "chật" 0/85   "quạt trần" 0/85   "cửa kính" 0/85   "đứng tại chỗ" 0/85
//   "không di chuyển" 0/85   "vùng vung tay" 0/85   "sân rộng" 0/85   "em mệt" (nút bấm) 0/85
// Trong khi đó RULES.safety (tools/lib/rules.mjs) thì có thật — 85/85 prompt đều mang đúng MỘT dòng:
//   "Dọn vật cản khỏi vùng đứng, giữ cách tường một bước, chỉ chuyển động trong tầm tay".
// Ba chỗ hỏng đo được của dòng đó: (1) "một bước" là đơn vị KHÔNG đo được, trong khi tầng vai chờ đã chốt
// "1 sải tay" và "máy cách >= 1,2 m" — hai tầng nói về cùng một khoảng cách bằng hai đơn vị khác nhau;
// (2) nó CẤM "rời khỏi chỗ" nhưng không tầng nào quy định bản thay thế cho động tác đòi di chuyển,
// nên một lớp 45 em chen chúc bàn ghế vẫn sinh ra thẻ đòi em né sang bên; (3) không có quy định nào về giày dép,
// sàn vừa lau, và không có cách nào để một em đang đau xin dừng mà không bị trừ tim hay bị hỏi lý do.
// Mục tiêu của thư viện là "vận động thể dục vui vẻ mà vẫn hiểu bài": một em đau vì va bàn hoặc vì sợ
// cô phê thì nghỉ hẳn môn này, nên tầng này quy định KHÔNG GIAN THẬT và QUYỀN NGHỈ, không phải lời nhắc.
//
// validate.mjs so khớp nguyên văn từng chuỗi ở dưới, nên sửa số ở đây là sửa ở 85 prompt,
// 425 block biến thể, 12 prompt legacy và bảng kiểm nghiệm thu cùng một lúc.

export const PLAYZONE = {
  // Đơn vị đo phải là sải tay đã có ở tầng vai chờ, không phải "một bước" mơ hồ.
  depCho:
    'THẺ "DẸP CHỖ CHƠI": chạy NGAY TRONG 60–90 GIÂY khởi động (theo trần thời lượng 8–10 phút của tầng tiết học — CẤM mở thêm một màn hình riêng trước khởi động), gồm đúng BỐN dòng <= 12 từ và một nút "Chỗ chơi ổn rồi" >= 56px: "Vùng đứng mỗi em: một vòng 1 sải tay tính từ vai" · "Bàn ghế, cặp, chai nước: ra khỏi vùng vung tay" · "Sàn: khô, không vừa lau, không dây điện ngang" · "Máy: cách em đang chơi >= 1,2 m". Thẻ ở tối đa 20 giây rồi tự trôi theo khởi động; CẤM dùng "một bước" làm đơn vị khoảng cách vì đã có 1 sải tay đo được. Giáo viên bỏ qua được bằng một nút "Bỏ qua" — game ghi lại và màn tổng kết nhắc đúng một dòng nhẹ "Lần sau mình dẹp chỗ chơi trước nhé", CẤM chặn nút "Bắt đầu", CẤM trừ tim vì chưa dẹp.',

  // Dép lê và chân đất là chuyện bình thường ở lớp; game phải đổi nội dung đo, không phạt em.
  giayDep:
    'Ở thẻ "Dẹp chỗ chơi" có MỘT hàng ba lựa chọn giày dép — "dép quai hậu" · "giày buộc dây" · "chân đất / dép lê" — chọn một lần, lưu localStorage "miti-foot", các phiên sau đọc lại chứ không hỏi nữa. Chọn "chân đất / dép lê" thì MỌI động tác nhấc chân cao, bước rời chỗ hoặc khuỵu gối sâu bị đổi sang bản cẳng tay – vai tại chỗ, và 0/12 lượt được là động tác nhấc chân cao; "dép quai hậu" thì bỏ động tác nhảy đổi chân nhưng vẫn được bước tại chỗ. CẤM từ đầu đến cuối phiên mọi động tác đòi đứng một chân hay giữ thăng bằng một chân (kể cả khi đã đi giày). CẤM trừ tim, CẤM hỏi lý do, CẤM in chữ "không an toàn" cạnh tên em — dòng tổng kết chỉ ghi "Động tác hôm nay: bản tại chỗ (dép lê)" nằm trong khối mà nút "Copy tờ rời" copy được.',

  // "Cấm rời khỏi chỗ" mà không có bản thay thế thì lớp chật không chơi được — đây là bản thay thế.
  lopChat:
    'Một nút "Lớp mình chật" ở thẻ "Dẹp chỗ chơi": bật một lần, lưu localStorage "miti-space", mọi phiên sau giữ nguyên, CẤM hỏi lại giữa phiên. Bật thì mọi động tác đòi di chuyển chỗ (né sang bên, lùi, tiến, quay người, đi vòng) tự chuyển thành động tác TẠI CHỖ ngay trong vòng 1 sải tay, vẫn giữ biên độ >= 15% tầm với đã calibration để hai con số đo cường độ không đổi: >= 12 nhịp chuyển động mỗi phút và đồng hồ vận động >= 60%. CẤM trừ điểm, CẤM rút số lượt, CẤM hạ trần cường độ vì chật. Trần không gian: thẻ và vật thể AR chỉ bay vào hình quạt 90 độ PHÍA TRƯỚC mặt em, CẤM mọi chỉ dẫn "lùi lại", "né sang trái/phải", "quay người nhanh" TRONG 12 lượt chơi (nhắc "lùi ra xa" lúc calibration để lấy đủ khung hình vẫn được phép) — hợp với trần tải trọng đã cấm xoay thân nhanh quá 90 độ. Bản không camera (máy đặt trên bàn, chơi bằng chuột/chạm) mặc định BẬT SẴN nút này, vẫn bắt buộc đủ thẻ dẹp chỗ chơi và nút xin nghỉ.',

  // Không được làm em bất ngờ giữa phiên bằng một động tác cần chỗ hơn chỗ đã khai.
  locDongTac:
    'Bộ động tác chốt MỘT LẦN đầu phiên: sau thẻ "Dẹp chỗ chơi", engine lọc ngân hàng động tác theo đúng giày dép đã chọn và nút "Lớp mình chật", rồi giữ nguyên bộ đó trọn 12 lượt — CẤM mở rộng bộ động tác giữa phiên (một em đang với tay giữa hiệp mà bất ngờ phải lùi là cách gãy người nhanh nhất). Nút "Xem cách chuyển động" liệt kê đúng bộ đang bật bằng chữ tiếng Việt + hình que, và HUD ghi "Vùng chơi: tại chỗ" hoặc "Vùng chơi: 1 sải tay" ở chữ >= 18px. Đổi lựa chọn giày dép hoặc nút chật chỉ có hiệu lực ở PHIÊN kế tiếp, sau khi màn tổng kết đã đóng.',

  // Quyền xin nghỉ phải là một nút, không phải một lời mời.
  nutMet:
    'Nút "Em mệt / em đau" hiện ĐÚNG MỘT chỗ ở góc dưới HUD, >= 56px, không bao giờ mờ, không bao giờ bị che, bấm được bằng chuột/chạm ở mọi bản kể cả bản camera; CẤM biến nó thành nút "Tạm dừng" (tạm dừng đã có ở quy định tab ẩn) và CẤM mascot bình luận "cố lên". Một cú bấm: lượt đang chạy vẫn kết thúc bình thường rồi game vào thẳng HẠ NHIỆT 45–60 GIÂY, không chơi nốt 12 lượt, CẤM trừ tim, CẤM trừ điểm, CẤM hỏi lý do, CẤM đòi cô giáo xác nhận. Ghi {"miti-stop": {phút, lượt}} vào localStorage và màn tổng kết in đúng một dòng "Em xin nghỉ ở phút <n> — nghỉ đúng lúc cũng là chơi giỏi" trong khối "Copy tờ rời"; phiên không có cú bấm thì CẤM in dòng đó.',

  // Nghiệm thu: không gian thật và quyền nghỉ có thật hay chỉ là một câu nhắc.
  guard:
    '`verifyPlayzone()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — thẻ "Dẹp chỗ chơi" có thật với đúng bốn dòng <= 12 từ, chạy trong 60–90 giây khởi động và tối đa 20 giây, không thêm màn hình trước nút "Bắt đầu" · ba lựa chọn giày dép và nút "Lớp mình chật" đổi ĐÚNG BỘ ĐỘNG TÁC (0/12 lượt nhấc chân cao khi chân đất / dép lê, không động tác đứng một chân nào, mọi vật thể vào hình quạt 90 độ phía trước) và lưu "miti-foot" + "miti-space" · bộ động tác không đổi giữa phiên · nút "Em mệt / em đau" >= 56px luôn bấm được và một cú bấm đưa thẳng vào hạ nhiệt 45–60 giây tại ranh giới lượt mà không trừ tim, có ghi "miti-stop". Thiếu điều nào thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản không camera, bản một học sinh và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều, vì bàn ghế và quyền nghỉ không phụ thuộc webcam.',
};

// Dòng rút gọn cho checklist và cho block biến thể.
export const PLAYZONE_SHORT =
  'thẻ "Dẹp chỗ chơi" 4 dòng <= 12 từ chạy trong 60–90 giây khởi động, tối đa 20 giây, đo bằng 1 sải tay + máy cách >= 1,2 m (không dùng "một bước") · ba lựa chọn giày dép lưu "miti-foot": chân đất / dép lê thì 0/12 lượt nhấc chân cao, cấm mọi động tác đứng một chân · nút "Lớp mình chật" lưu "miti-space" đổi động tác di chuyển thành tại chỗ mà vẫn >= 12 nhịp/phút và vận động >= 60%, vật thể chỉ vào hình quạt 90 độ phía trước · bộ động tác chốt một lần đầu phiên, cấm mở rộng giữa phiên · nút "Em mệt / em đau" >= 56px luôn bấm được, vào thẳng hạ nhiệt 45–60 giây tại ranh giới lượt, không trừ tim, ghi "miti-stop" · verifyPlayzone() kiểm lúc nạp';
