// Tầng "chuẩn kiến thức SGK": mỗi câu hỏi phải biết mình thuộc mạch nào, luyện yêu cầu
// cần đạt nào, báo trước cái bẫy kinh điển và cho em một mẹo nhớ kèm động tác.
//
// Khảo sát 85 prompt trước vòng 17 (đếm chuỗi trong prompt game đã sinh):
//   "mạch kiến thức"   0/85   "yêu cầu cần đạt" 0/85   "chuẩn kiến thức" 0/85
//   "mẹo nhớ"          0/85   "Dễ nhầm"         0/85   "Ôn tập" với nhãn mạch  0/85
// Tầng nhẹ đầu (light.mjs) chặn đề quá nặng, tầng tự kiểm chứng đề (verify.mjs) chặn số
// ngoài phạm vi SGK — nhưng KHÔNG tầng nào nói đề đó thuộc mạch nào của Chương trình
// GDPT 2018 và lớp cần đạt tới đâu. Hệ quả thật: mô hình viết "Phân số" rồi ra đề toàn
// phân số trong phạm vi, mà không có một dòng nào để giáo viên đối chiếu với yêu cầu
// của lớp; và học sinh sai lặp một cái bẫy đã biết mà game không hề báo trước.

export const CURRICULUM = {
  machNhan:
    'Mỗi câu hỏi mang đúng một nhãn mạch kiến thức lấy từ `tools/data/standards.mjs` — chỉ tám mạch sau, cấm thêm mạch thứ chín: Toán 4 mạch "Số và phép tính" · "Hình học và đo lường" · "Giải toán có lời văn" · "Một số yếu tố thống kê và xác suất"; Tiếng Anh 3 mạch "Đọc và viết" · "Nghe và nói" · "Kiến thức ngôn ngữ"; hai môn chung mạch "Ôn tập tổng hợp". HUD góc trên trái hiện nhãn ngắn `"<nhãn ngắn>"` (cột `ngan`, <= 18 ký tự, chữ >= 18px, nền đặc, không nhấp nháy) và đổi theo câu đang hỏi. CẤM tự đặt tên mạch ngoài bảng chuẩn, CẤM HUD không có nhãn mạch.',

  ycDong:
    'Màn khởi động (3 giây đầu, TRƯỚC cú "ồ" bằng vật thể AR) và màn tổng kết mỗi nơi in đúng một dòng "Yêu cầu cần đạt: <nội dung>" lấy NGUYÊN VĂN từ bảng chuẩn của cụm — không viết lại, không tóm tắt, không đổi số, chữ >= 20px, không che vùng chơi. Dòng ở màn tổng kết nằm trong khối chữ mà nút "Copy tờ rời" copy được, để giáo viên đối chiếu game với yêu cầu cần đạt của lớp mà không phải mở lại prompt.',

  machTron:
    'Mạch chính của game chiếm tối đa 9/12 lượt; trong 12 lượt chính phải có >= 3 lượt thuộc mạch KHÁC mạch chính (tính cả những lượt xen cụm của tầng nhớ bài, nếu cụm đó thuộc mạch khác). Câu khác mạch vẫn phải là cụm có thật trong bảng chuẩn của đúng môn và đúng lớp, cấm bịa chủ đề ngoài chương trình. Màn tổng kết in "Hôm nay em chạm <n> mạch: <tên ngắn 1>, <tên ngắn 2>" đúng bằng số mạch thật đã hỏi.',

  bayTruoc:
    'Câu ĐẦU TIÊN của mỗi cụm xuất hiện trong phiên hiện một dòng "Dễ nhầm: <một lỗi>" — lấy đúng một ý trong bảng lỗi của cụm, <= 16 từ, chữ >= 20px, tự tắt sau 6 giây hoặc khi em chạm, không che đề. Đây là BÁO TRƯỚC trước khi học sinh bấm đáp án, khác hẳn chữ đỡ sau khi sai ở tầng cảm giác arcade; các lượt sau của cùng cụm không lặp lại dòng này.',

  meoDongTac:
    'Mỗi cụm có đúng một "Mẹo nhớ" <= 12 từ lấy từ bảng chuẩn, bật lên ở cú trả lời ĐÚNG của câu đầu cụm và ngay sau câu sai mang errorTag của cụm đó, mascot đọc to bằng `speechSynthesis`. Mỗi mẹo gắn với MỘT động tác 3 giây mascot làm mẫu tại chỗ (dậm chân, đưa tay sang ngang, quay cổ tay) để em nhớ bằng cơ thể; động tác là hưởng ứng, không phải điều kiện cộng điểm. Dòng mẹo nằm trong khối mà nút "Copy tờ rời" copy được.',

  guard:
    '`verifyStandard()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — mọi câu có nhãn mạch nằm trong bảng chuẩn và HUD có thật · dòng "Yêu cầu cần đạt:" xuất hiện ở đúng hai màn và khớp nguyên văn bảng chuẩn · mạch chính <= 9/12 lượt kèm >= 3 lượt khác mạch · mỗi cụm có "Dễ nhầm" ở câu đầu và "Mẹo nhớ" <= 12 từ kèm động tác 3 giây. Thiếu điều nào thì `console.warn` tiếng Việt nêu cụm hoặc lượt nào lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản một học sinh và bản không camera vẫn bắt buộc kiểm đủ bốn điều trên.',
};

export const CURRICULUM_SHORT =
  'nhãn mạch kiến thức trên HUD <= 18 ký tự lấy từ bảng chuẩn · dòng "Yêu cầu cần đạt:" in nguyên văn ở màn khởi động và màn tổng kết, copy được bằng "Copy tờ rời" · mạch chính <= 9/12 lượt và >= 3 lượt thuộc mạch khác · "Dễ nhầm" báo trước câu đầu mỗi cụm (<= 16 từ) · "Mẹo nhớ" <= 12 từ kèm động tác 3 giây · verifyStandard() kiểm lúc nạp';
