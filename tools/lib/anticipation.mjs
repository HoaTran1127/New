// Sáu quy định HAM QUAY LẠI — phần "em sẽ bấm Chơi lại" mà tools/lib/hype.mjs (cao trào trong một phiên) chưa phủ.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: hype.mjs làm một phiên chơi căng – nổ – có thưởng, nhưng khép lại phiên thì thư viện gần như
// im lặng. Khảo sát 85 prompt: "hẹn gặp lại / ngày mai / tuần sau" = 0, "khiên / bảo vệ chuỗi" = 0,
// "phần thưởng để dành / bật mí" = 0, "chuỗi ngày / mốc đang chờ" = 0, "chỗ trống chưa mở trong bộ sưu tập" = 0,
// "nghi thức lưu tiến trình" = 0. Màn tổng kết hiện tại chỉ làm hai việc: báo điểm và mời "Chơi lại".
// Trẻ lớp 4–5 quay lại vì hai thứ rất cụ thể: (1) cảm giác mình đang sắp chạm một mốc, (2) cảm giác có cái gì đó
// đang chờ mình. Cả hai đều không cần xếp hạng bạn, không cần tài khoản, không cần quyền thông báo.
// Vì vậy mọi quy định dưới đây chỉ được phép dựa vào dữ liệu của CHÍNH em trên CHÍNH máy này, và nghỉ chơi
// không bao giờ bị phạt — nhất quán với RETENTION.forgettingGuard và "sàn chống nản".

export const ANT = {
  // Cảm giác "sắp tới" mạnh hơn cảm giác "đã xa".
  nearMiss:
    'Báo sắp tới mốc: mỗi khi em còn đúng 1 câu nữa là chạm mốc 10 / 20 / 30 câu đúng của phiên, HUD hiện một dòng 1,5 giây "Còn 1 câu nữa tới mốc <m> — lượt kế nhân đôi điểm" rồi tự ẩn khi chạm mốc (ăn mừng để sự kiện đã có lo). Cột đích chung cũng phải ghi "Cả nhóm còn <k> câu tới mốc <m>" chứ không chỉ là một thanh tiến độ im lặng. Mọi con số ở dòng này đếm từ số câu đúng thật của phiên, không hứa phần thưởng ảo, không chớp quá 3 lần mỗi giây.',

  // Cho em một cái để không muốn làm hỏng: nhưng chỉ là phần thưởng, không phải mạng thứ hai.
  carryToken:
    'Phần thưởng để dành: mỗi chuỗi đúng 5 câu, em được phát 1 "khiên chuỗi", tích tối đa 2 trong localStorage key "miti-tokens" (chỉ { khien, quyen_chon, ngay } — không tên, không ảnh). Trả lời sai khi còn khiên: khiên tự vỡ, chuỗi đúng KHÔNG bị cắt, nhưng VẪN trừ 1 tim, VẪN dừng 2 giây và hiện lời giải đầy đủ, câu đó VẪN vào hàng đợi luyện lại và vẫn tính vào sàn chống nản 3 câu. Quyền "chọn câu dễ hơn một bậc" của nghi thức mở thưởng cũng được để dành sang phiên sau thay vì mất khi tắt máy. Hết 5 tim vẫn thua đúng như cũ.',

  // Một câu chuyện đang kể dở mạnh hơn một điểm số đã khép.
  openLoop:
    'Kết thúc hé mở: sau ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", màn tổng kết hiện đúng MỘT dòng "Chương tiếp theo: <tên chương>" nối vào kết quả phiên này — ví dụ "Chương 3 mở khi em sửa xong 2 lỗi: <loiViet>, <loiViet>" — kèm một nút "Xem trước" chiếu 6 giây một vật thể AR của chương sau, không cho chơi, không tính điểm. Cấm đe dọa kiểu "không chơi lại là mất hết": nghỉ chơi là bình thường và không có hình phạt nào cho việc nghỉ.',

  // Lý do quay lại phải là một thứ đang chờ, không phải một lời mời chung chung.
  comeback:
    'Hẹn lần sau bằng số câu thật: màn tổng kết in một dòng "Lần sau em quay lại sẽ có <n> câu đang chờ", với <n> đếm từ "miti-review" (số mục đến hạn trong 7 ngày tới, trần 4 vì trần lượt ôn mỗi phiên). <n> = 0 thì đổi thành "Chưa có câu nào chờ em — chơi thêm game khác để dành thẻ". Không xin quyền thông báo, không gửi đi đâu, không đếm "chuỗi ngày chơi", không hiện chữ "em đã nghỉ X ngày".',

  // Ô trống trong bộ sưu tập là lời mời mà trẻ đọc được ngay, không cần giải thích.
  collectionGap:
    'Chỗ trống gọi tên: màn "Sưu tập của em" vẽ lưới 6 ô cho mỗi bộ chủ đề; ô đã mở hiện thẻ, ô chưa mở hiện khung nét đứt và dấu "? ? ?" (không để em đoán hình). Kèm đúng một dòng "Bộ <chủ đề> còn thiếu <k> thẻ — thắng hiệp 3 ở các game cùng chủ đề để đủ bộ", với <k> tính từ "miti-collection" của chính máy này. Không hiện số thẻ của bạn nào khác, không so sánh bộ sưu tập giữa các em.',

  // Đóng phiên bằng một nghi thức ngắn để em tin là thành tích của mình còn nguyên.
  saveCeremony:
    'Nghi thức lưu phiên: khi em bấm "Kết thúc", game dành 3 giây cho mascot cất thành tích vào túi và hiện "Đã lưu: <điểm cao nhất>, chuỗi dài nhất <x>, <k> thẻ mới" rồi mới tắt; nút "Tắt máy" chỉ sáng sau khi dòng đó hiện. localStorage bị chặn thì mascot nói một dòng "Máy này không giữ được tiến trình, em chơi tiếp từ đầu nhé" và mọi dòng kỷ lục ẩn hẳn, không hiện số 0. Bản Giảm hiệu ứng rút nghi thức còn 1 giây bằng chữ, không bỏ bước lưu.',
};

// Dòng rút gọn dùng cho chuỗi tự kiểm và block biến thể.
export const ANT_SHORT =
  'dòng "Còn 1 câu nữa tới mốc <m>" (10/20/30) · khiên chuỗi trong "miti-tokens" (tối đa 2, vẫn trừ tim, vẫn hiện lời giải) · "Chương tiếp theo" + nút "Xem trước" 6 giây · hẹn "Lần sau sẽ có <n> câu đang chờ" từ "miti-review" · lưới 6 ô "? ? ?" cho bộ còn thiếu · nghi thức lưu phiên 3 giây "Đã lưu: ..."';
