// Cấu trúc một buổi thể dục thu nhỏ: làm nóng → nhịp đo được → hạ nhiệt → nước, trong trần tải trọng an toàn.
// Đổi chuỗi ở đây phải chạy lại node tools/build.mjs.
export const PE = {
  // Làm nóng trước khi với tay mạnh, hạ nhiệt thay vì dừng đột ngột, nhắc nước một lần.
  warmCool:
    'KHỞI ĐỘNG 60–90 giây trước hiệp 1 (không tính điểm, không trừ tim): đánh vai 10 nhịp, xoay cổ tay 10 vòng/bên, dang tay lên cao 8 nhịp, nâng gối 15 giây; hình que + chữ + đếm ngược; có nút "Bỏ khởi động" (tổng kết nhắc nhẹ). HẠ NHIỆT 45–60 giây trước tổng kết, không bỏ qua: duỗi tay ngang ngực 15 giây/bên, cúi chạm mũi chân 15 giây, kéo vai 10 nhịp, hít thở 4 vào – 4 ra. Giảm hiệu ứng chỉ rút ngắn, không bỏ. Chơi >= 6 phút hoặc phiên thứ hai liền: tổng kết nhắc MỘT dòng uống nước.',
  // Nhịp đủ nhanh để tim còn nhịp, đủ chậm để đọc đề; vận động là con số, không phải lời khen.
  pace:
    'Nhịp lượt: thẻ bay vào 3,0–4,5 giây, ở lại <= 8 giây, nghỉ giữa lượt <= 1,5 giây, không rút thời gian đọc đề; >= 12 nhịp chuyển động/phút (tay hoặc thân vượt 15% tầm với, tính cả khởi động và hạ nhiệt). Tổng kết in "Em đã chuyển động X giây trên Y giây", cần >= 60%; thiếu thì mời hiệp phụ 4 lượt nhẹ, không phạt.',
  // Những động tác y tế trường học không cho làm hàng loạt.
  loadCap:
    'Trần tải trọng: cấm nhảy tiếp đất, cấm xoay thân nhanh quá 90 độ, cấm giữ hai tay trên cao quá 15 giây, tối đa 3/12 lượt cúi thấp; mất landmark 3 giây hoặc FPS tụt thì về nhịp chậm + một dòng nhắc chỉnh tư thế.',
};
// Bản không camera: đổi cách đo, giữ cấu trúc buổi tập.
export const PE_NO_CAMERA =
  'Bản không camera vẫn khởi động 60–90 giây và hạ nhiệt 45–60 giây dạng tại chỗ nhẹ (cổ tay – bàn chân – vai + hít thở); thay hai mục đo bằng camera bằng "số lượt em chủ động thao tác" (đủ 12/12 lượt); nhịp thẻ và trần tải trọng giữ nguyên.';
