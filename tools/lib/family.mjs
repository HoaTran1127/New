// Tầng "gia đình": màn tổng kết phải gửi về nhà được MỘT tờ ngắn bố mẹ đọc trong một hơi,
// có đúng một việc 3 phút làm cùng con không cần màn hình — không phải bài tập về nhà.
//
// Khảo sát 85 prompt trước vòng 19 (đếm chuỗi trong prompt game đã sinh):
//   "phụ huynh" 0/85   "gia đình" 0/85   "bố mẹ" 0/85   "ở nhà" 0/85   "bài tập về nhà" 0/85
//   "tờ rời" 85/85 — nhưng tờ rời hiện hành (lesson.mjs + curriculum.mjs) viết cho GIÁO VIÊN:
//   đối chiếu yêu cầu cần đạt, tính giờ lên lớp. Không một dòng nào nói cho người ở nhà biết
//   con vừa tập môn gì, mẹo nào, và làm gì cùng con mà không mở thêm một màn hình nữa.
// Hệ quả đo được: tiết học kết thúc ở cổng trường, cái trẻ nhớ cả tuần lại là cái màn hình
// nhắc trẻ cuối cùng. Tầng này nối đúng một sợi dây đó, và nối mà không biến game thành
// bài tập về nhà — thứ mà light.mjs đã chặn ngay trong lớp.

export const FAMILY = {
  guiBoMe:
    'Màn tổng kết in ĐÚNG MỘT khối "Gửi bố mẹ" gồm đúng BỐN dòng, mỗi dòng <= 20 từ, chữ >= 20px, nằm TRONG khối chữ mà nút "Copy tờ rời" copy được — không screensaver, không trang riêng, không phải mở thêm ứng dụng nào khác. Bốn dòng theo thứ tự: "Hôm nay con tập môn <môn> — <n> động tác" · "Con học <tên mạch ngắn>, <k> câu đúng trên <tổng>" · "Mẹo con mang về: <mẹo>" · "Việc 3 phút ở nhà: <một hoạt động>". Dòng nào thiếu dữ liệu thật thì in "chưa ghi được", CẤM bịa số, CẤM in hai khối "Gửi bố mẹ" trong một phiên.',

  baPhut:
    'Dòng "Việc 3 phút ở nhà" chứa đúng MỘT hoạt động dài 3 phút, KHÔNG màn hình và KHÔNG viết: cả nhà làm cùng nhau động tác đặc trưng của môn (cột `dongTac` trong `tools/data/sports.mjs`) rồi hỏi nhau MIỆNG đúng MỘT đề lấy nguyên văn từ `QUESTION_DATA` của phiên vừa chơi (đề <= 16 từ, theo trần của tầng nhẹ đầu). CẤM biến thành bài tập về nhà có ghi vở, CẤM giao thêm đề thứ hai, CẤM yêu cầu bố mẹ chụp ảnh hay quay video gửi lại, CẤM đòi mua thêm đồ dùng. Hoạt động này là để con nhắc lại bằng miệng, không phải để bố mẹ dạy lại — nên CẤM kèm thang điểm hay lời phê.',

  meoNha:
    'Dòng "Mẹo con mang về" lấy NGUYÊN VĂN cột `meo` (<= 12 từ) trong `tools/data/standards.mjs` của cụm vừa học — không viết lại, không tóm tắt, không đổi số — và đi kèm MỘT động tác 3 giây bố mẹ làm cùng con đúng bằng động tác mascot đã làm trong lớp. CẤM phát minh mẹo khác ở tờ gửi về, vì mẹo khác mẹo trên màn hình sẽ khiến con phải nhớ hai bản.',

  riengTu:
    'Khối "Gửi bố mẹ" chỉ nói về em đang chơi: CẤM in tên bạn khác, CẤM xếp hạng "con đứng thứ <n>", CẤM bất kỳ dòng so sánh nào với một em cụ thể. Thành tích tập thể chỉ được đọc bằng đúng MỘT dòng "Cả nhóm: <x>/<mốc>" mà tầng thi đua đã dựng, không kèm danh sách tên. CẤM nêu số điện thoại, email, ảnh hay bất kỳ dữ liệu cá nhân nào của gia đình vào khối chữ copy được này.',

  khongDoi:
    'CẤM khối "Gửi bố mẹ" dùng giọng đe dọa hay tạo nghĩa vụ: không "nếu không luyện con sẽ tụt", không "mỗi ngày bắt buộc 3 phút", không "nếu bỏ sẽ mất <n> sao". Dòng cuối của khối, ngay sau bốn dòng trên, là một dòng duy nhất <= 24 từ theo một trong hai dạng: "Nhà mình làm cùng nhau khi nào cũng được" hoặc "Khi nào con muốn chơi lại thì con tự bấm". CẤM in cả hai dòng.',

  guard:
    '`verifyFamily()` chạy MỘT LẦN lúc nạp và kiểm đúng bốn điều — khối "Gửi bố mẹ" có ĐÚNG MỘT lần và nằm trong khối "Copy tờ rời" copy được · bốn dòng in từ số thật của phiên (môn, động tác, mạch, mẹo, phút) chứ không phải chữ chép sẵn · hoạt động 3 phút không màn hình có thật và lấy đúng cột `dongTac` của môn · khối không có tên bạn khác, không có xếp hạng, không có dòng đe dọa. Thiếu điều nào thì `console.warn` tiếng Việt nêu điều lệch và bảng kiểm ghi CHƯA ĐẠT kèm câu nên sửa gì trong prompt. Bản một học sinh, bản không camera và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều trên.',
};

export const FAMILY_SHORT =
  'khối "Gửi bố mẹ" 4 dòng, mỗi dòng <= 20 từ, >= 20px, nằm trong khối "Copy tờ rời" · một việc 3 phút ở nhà không màn hình, không viết, lấy đúng động tác của môn (cột `dongTac`) + một đề <= 16 từ · "Mẹo con mang về" nguyên văn cột `meo` <= 12 từ kèm động tác 3 giây · không tên bạn khác, không xếp hạng, không đe dọa, không đòi ảnh · verifyFamily() kiểm lúc nạp';
