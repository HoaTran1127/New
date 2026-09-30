// Luật NHỚ BÀI LÂU cho mục "4. GHI NHỚ BÀI HỌC": hiểu bài hôm nay và vẫn nhớ sau một tuần.
// validate.mjs so khớp nguyên văn các chuỗi này; đổi ở đây thì chạy lại node tools/build.mjs.
// Mốc +1/+3/+7 ngày theo đường cong quên; mọi con số đều đếm được bằng code trong một file HTML.
export const MEMORY = {
  // Gộp lịch ôn cách quãng + hồ sơ tiến bộ + quên không phạt + hẹn lần sau.
  review:
    'Lịch ôn "miti-review" (localStorage, chỉ { id, errorTag, due, sai }, không tên, ảnh hay video): errorTag sửa đúng 2 lần liên tiếp thì ôn ở mốc +1, +3, +7 ngày. Đầu phiên đưa mục đến hạn vào tối đa 4/12 lượt, ưu tiên errorTag sai nhiều nhất; mục chưa đến hạn không xen vào. Quên khi ôn không trừ tim, không cắt chuỗi, chỉ hạ về +1 ngày. Tổng kết ghi "Em vẫn nhớ: ..." / "Cần ôn lại: ..." (mỗi nhóm tối đa 3) và "Lần sau có <n> câu đang chờ". Lịch tính theo máy, không theo từng em; localStorage bị chặn thì bỏ lịch, vẫn chơi trọn.',
  // Học xen kẽ cụm giúp nhớ lâu hơn học dồn; trong một cụm vẫn giữ thứ tự dễ → khó.
  interleave:
    'Xen cụm: >= 3/12 lượt thuộc cụm khác (từ "miti-review" hoặc cùng khối, level thấp hơn), đặt xen kẽ, không dồn cuối phiên; trong một cụm giữ thứ tự dễ → khó.',
  // Gợi nhớ trước lượt 1 + tự giải thích sau cú chốt đúng; đây là phép đo, không phạt.
  recall:
    'Gợi nhớ: trước lượt 1 chiếu 10 giây "Em còn nhớ không?" một câu đến hạn ôn (không gợi ý); sai không trừ tim, xếp lại vào lượt 3 kèm lời giải; phiên đầu trên máy thì bỏ qua. Ở 4/12 lượt, ngay sau cú chốt đúng, hỏi "Vì sao đúng?" 3 phương án trong 5 giây; sai không trừ tim, hiện một dòng lời giải, có nút "Thôi".',
};
