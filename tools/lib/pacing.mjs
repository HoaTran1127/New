// Tầng "tuần học": mỗi cụm biết mình thường được dạy từ tuần nào tới tuần nào, game biết
// lớp đang học tuần mấy, và vì đó mà chọn đúng game cho tiết hôm nay + tự chuyển sang ôn
// khi sắp tới mốc kiểm tra. Không phải lịch chính thức của trường — cô giáo mới là người xác nhận.
//
// Khảo sát 85 prompt trước vòng 20 (đếm chuỗi trong prompt game đã sinh):
//   "tuần 1" 0/85   "tuần 12" 0/85   "theo tuần" 0/85   "phân phối chương trình" 0/85
//   "học kì" 0/85   "giữa kì" 0/85   "đến tuần" 0/85
//   catalogs/curriculum/toan-lop-4-5-sgk-matrix.md: chữ "tuần" xuất hiện 0 lần.
// curriculum.mjs (vòng 17) đã buộc mỗi câu nói được mình thuộc mạch nào và lớp cần đạt tới
// đâu, memory.mjs đã hẹn ôn +1/+3/+7 ngày cho TỪNG EM — nhưng không tầng nào trả lời câu hỏi
// đầu tiên của một giáo viên cầm 85 thẻ game: "hôm nay tuần 13 thì tôi cho lớp chơi game nào?".
// Hệ quả đo được: thư viện 85 game không có thứ tự sử dụng, còn lịch ôn thì chỉ đúng với em
// đã chơi nhiều phiên, không đúng với cả lớp vừa bước vào tuần kiểm tra.

import { SCHOOL_YEAR, hocKiCua } from '../data/standards.mjs';

export const PACE = {
  nhanTuan:
    'Mỗi game in ĐÚNG MỘT nhãn "Tuần <a>–<b> · Học kì <n>" ở màn khởi động và ở màn tổng kết, lấy NGUYÊN VĂN cột `tuan` của cụm trong `tools/data/standards.mjs` (Học kì tính theo tuần MỞ bài: `tuan[0]` <= 18 là Học kì 1, từ 19 là Học kì 2), chữ >= 18px, nằm TRONG khối chữ mà nút "Copy tờ rời" copy được. CẤM tự đặt khoảng tuần khác bảng chuẩn, CẤM in "cả năm" hoặc để trống, CẤM một cụm phủ quá 10 tuần. Kèm đúng một dòng <= 14 từ "theo phân phối chung — cô xác nhận tuần của lớp em" để không ai nhầm bảng này với thời khóa biểu của trường.',

  hoiMotCau:
    'Câu "Lớp mình đang học tuần mấy?" hiện ĐÚNG MỘT LẦN, ở phiên ĐẦU TIÊN trên máy: một hàng nút số 1–' + SCHOOL_YEAR.soTuan + ' gom theo tháng, bấm xong lưu localStorage "miti-week" và các phiên sau đọc lại chứ không hỏi nữa. Chưa chọn thì game vẫn chơi bình thường và HUD ghi "Tuần: chưa chọn" — CẤM chặn nút "Bắt đầu", CẤM hỏi giữa phiên, CẤM hỏi lại ở phiên sau khi đã có "miti-week", CẤM tiện đó hỏi tên học sinh hay bất kỳ dữ liệu cá nhân nào.',

  onTheoTuan:
    'Khi đã biết tuần của lớp, >= 3/12 lượt chính là cụm CÓ KHOẢNG TUẦN ĐÃ KẾT THÚC TRƯỚC tuần hiện tại (cột `tuan` có b < tuần đang học) — tức cụm em đã học xong, đem ra luyện lại chứ không đánh đố trước chương trình. Ba lượt này trùng được với ba lượt xen mạch của tầng chuẩn kiến thức, miễn cụm được chọn vừa khác mạch vừa đã qua tuần. Tổng kết in "Tuần <t> · em ôn lại <n> cụm đã học" bằng số thật. CẤM chọn làm đề MỚI một cụm chưa tới tuần mở bài.',

  nuocRut:
    'Trong ' + SCHOOL_YEAR.nuocRut + ' tuần trước một mốc kiểm tra của `SCHOOL_YEAR.moc` (giữa học kì 1, cuối học kì 1, giữa học kì 2, cuối học kì 2), HUD in thêm "Còn <n> tuần tới kiểm tra <tên mốc>" và hai lượt ĐẦU của phiên lấy cụm có errorTag yếu nhất của em trong "miti-mastery". Đây là đổi THỨ TỰ, không phải đổi LUẬT: CẤM tăng độ khó, CẤM trừ tim nhiều hơn, CẤM biến 12 lượt thành đề thi thử có đồng hồ, CẤM kéo dài phiên quá trần 10 phút của tầng tiết học, CẤM bỏ khởi động và hạ nhiệt để nhét thêm đề.',

  tongOn:
    'Từ tuần ' + SCHOOL_YEAR.tongOnTu + ' đến hết tuần ' + SCHOOL_YEAR.soTuan + ', >= 6/12 lượt chính là cụm đã học xong trước tuần hiện tại và CẤM giới thiệu cụm mới (không cụm nào có a lớn hơn tuần hiện tại được xuất hiện). Tổng kết in "Cả năm có <k> cụm, em vững <m> cụm" với <k> đếm từ bảng chuẩn của đúng lớp, <m> đếm từ "miti-mastery" — thiếu số thì in "chưa ghi được", CẤM bịa.',

  guard:
    '`verifyPacing()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — mọi câu mang nhãn tuần khớp NGUYÊN VĂN cột `tuan` của `tools/data/standards.mjs` và khoảng đó nằm trong 1–' + SCHOOL_YEAR.soTuan + ' · câu hỏi tuần chạy ĐÚNG MỘT lần ở phiên đầu, đọc lại được từ "miti-week", và không chặn nút nào của màn Bắt đầu · khi đã có tuần của lớp, >= 3/12 lượt là cụm có `tuan[1]` nhỏ hơn tuần đó · nhãn nước rút và chế độ tổng ôn đổi đúng theo `SCHOOL_YEAR` mà không đổi luật chơi, không đổi trần tải trọng của tầng thể dục. Thiếu điều nào thì `console.warn` tiếng Việt nêu điều lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản không camera, bản một học sinh và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều, vì tuần học không phụ thuộc webcam.',
};

export const hocKi = hocKiCua;
export const NAM_HOC = SCHOOL_YEAR;

export const PACE_SHORT =
  'nhãn "Tuần <a>–<b> · Học kì <n>" lấy nguyên văn cột tuan của tools/data/standards.mjs, tối đa 10 tuần một cụm · hỏi "lớp mình đang học tuần mấy?" đúng MỘT lần ở phiên đầu, lưu "miti-week", không chặn nút "Bắt đầu" · >= 3/12 lượt là cụm đã học xong trước tuần của lớp · ' +
  SCHOOL_YEAR.nuocRut +
  ' tuần trước mốc kiểm tra: ưu tiên cụm yếu nhất ở hai lượt đầu, cấm đổi luật · từ tuần ' +
  SCHOOL_YEAR.tongOnTu +
  ': >= 6/12 lượt ôn, cấm cụm mới · verifyPacing() kiểm lúc nạp';
