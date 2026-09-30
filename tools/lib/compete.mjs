// Sáu quy định THI ĐUA CÂN BẰNG cho chế độ 1/2/3 người — Scoreboard, Podium, phân định hòa,
// đuổi kịp có trần, danh hiệu cá nhân và kỷ lục của chính em khi chơi một mình.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: khi 2–3 em cùng đứng trước máy, các em muốn biết ai đang dẫn và ai thắng. Thi đua
// công khai giữ nhịp hào hứng, nhưng phải cân bằng: phân định hòa rõ ràng, em bị bỏ xa có cơ hội
// đuổi kịp (có trần để không lật kèo vô lý), và em nào cũng rời máy với một danh hiệu dựa trên số liệu thật.
// Khi chơi một mình thì không có Podium; mốc để phá là kỷ lục của chính em.
// Ngữ nghĩa chính xác của từng luật được khóa bằng hàm thuần trong tools/lib/compete-ref.mjs.

export const COMPETE = {
  // Điểm hiện ngay, theo màu làn, để cả nhóm thấy cuộc đua đang diễn ra.
  scoreboard:
    'N ≥ 2: Scoreboard trực tiếp ở dải trên, mỗi làn một ô P<n> cùng màu làn, điểm cập nhật NGAY sau mỗi câu, người dẫn đầu có vương miện nhỏ; điểm, tim, chuỗi tách riêng từng em.',

  // Cuối ván có người thắng, nhưng không em nào bị bỏ ngoài bục.
  podium:
    'Hết ván với N ≥ 2: Podium xếp theo tổng điểm, người thắng đứng bục giữa có pháo hoa 2 giây; mọi em đều lên bục kèm danh hiệu.',

  // Hòa phải được phân định bằng số liệu, không bằng may rủi.
  tieBreak:
    'Bằng tổng điểm thì xếp theo số câu đúng nhiều hơn, rồi tổng thời gian trả lời ngắn hơn; vẫn bằng thì ĐỒNG HẠNG, không tung đồng xu.',

  // Cơ hội đuổi kịp có điều kiện và có trần, để ván còn hồi hộp mà vẫn công bằng.
  catchUp:
    'Đuổi kịp: em kém người dẫn đầu từ 2 câu đúng trở lên được thẻ x2 cho câu kế tiếp, tối đa MỘT thẻ x2 mỗi 3 câu liên tiếp cho mỗi em. Hiệp quyết định (đã nhân đôi) thay thẻ x2 bằng "câu lội ngược dòng" +15 điểm; hệ số điểm không bao giờ vượt x2.',

  // Ai cũng có một điều để tự hào, và điều đó đến từ số liệu đo được trong ván.
  titles:
    'Danh hiệu cuối ván từ số liệu đo trong ván: Nhanh nhất (thời gian trả lời trung bình thấp nhất), Chính xác nhất (tỉ lệ đúng cao nhất), Vận động nhiều nhất (số động tác lớn), Chuỗi dài nhất (chuỗi đúng liên tiếp). Mỗi em ÍT NHẤT một danh hiệu, kể cả em xếp cuối — chưa có thì nhận theo chỉ số tốt nhất của chính em ("Bứt phá cuối ván", "Kiên trì").',

  // Chơi một mình: mốc để phá là kỷ lục của chính em (gộp personalBest + ghost cũ từ hype.mjs).
  solo:
    'N = 1: không có Podium; so với kỷ lục của chính em trong localStorage "miti-best" { điểm, chuỗi, giây lượt nhanh nhất, ngày }. Vượt kỷ lục thì nổ "PHÁ KỶ LỤC!" đúng một lần; vệt ghost alpha <= 0.35 chạy theo lượt nhanh nhất cũ. Chưa có kỷ lục thì ẩn dòng kỷ lục, không hiện số 0.',
};
