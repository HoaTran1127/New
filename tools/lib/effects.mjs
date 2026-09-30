// Chín dòng HIỆU ỨNG dùng chung, in vào mục 1 của MỌI prompt — chuyển lượt, linh vật, hạt theo làn,
// khoảnh khắc lớn, Scoreboard, Podium, lật thẻ, làn sẵn sàng và giới hạn an toàn/hiệu năng.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: thi đua trước máy chỉ hào hứng khi mỗi sự kiện có phản hồi nhìn thấy ngay. Mỗi dòng
// chỉ nêu "khi nào → hiệu ứng gì → giới hạn", không mô tả cách code. Phần juice cũ của feel.mjs
// (hitStop, fx, mascot) và luật nhấp nháy của access.mjs đã chuyển về đây để mỗi chỉ dẫn xuất hiện một lần.
// Ngữ nghĩa ngân sách hiệu ứng được khóa bằng effectsBudget trong tools/lib/compete-ref.mjs.

export const EFFECTS = {
  // Chuyển lượt phải rõ ai vừa tới lượt; câu chữ tự nêu điều kiện nên vẫn in khi N = 1.
  turn:
    'Chuyển lượt: spotlight quét sang làn mới (~400 ms), bùng màu làn mới, rồi đếm 3-2-1 đập (scale 1 → 1.2 → 1).',

  // Linh vật khích lệ, không bao giờ chê.
  mascot:
    'Linh vật: đúng thì nhảy reo, sai thì gãi đầu động viên (không chế giễu), chuỗi dài thì múa ăn mừng.',

  // Hạt bắn trong làn của em để thành quả thuộc về đúng em.
  burst:
    'Trả lời đúng: hạt/confetti màu của em bắn ngay trong làn của em (tối đa 40 hạt, sống ≤ 800 ms).',

  // Khoảnh khắc lớn được nhấn mạnh, có trần biên độ và thời lượng.
  bigMoment:
    'Khoảnh khắc lớn (chuỗi ≥ 3, vượt lên dẫn đầu, câu lội ngược dòng): rung màn hình ≤ 250 ms biên độ ≤ 8 px hoặc hit-stop 80–120 ms.',

  board:
    'Scoreboard: điểm lăn số tới giá trị mới (~500 ms); vương miện bay sang ô người dẫn đầu mới.',

  podium:
    'Podium: các bậc trồi lên lần lượt từ hạng thấp tới hạng 1 (cách ~400 ms), rồi từng danh hiệu bật ra.',

  card:
    'Thẻ đuổi kịp lật 3D (~500 ms) để lộ "x2" hoặc "Lội ngược dòng".',

  ready:
    'Hiệu chỉnh: làn đạt "P<n> sẵn sàng" thì viền phát sáng màu của em.',

  // An toàn và hiệu năng: cắt hiệu ứng TRƯỚC, chỉ sau đó mới giảm tần suất nhận diện.
  limits:
    'Giới hạn: mọi nhấp nháy ≤ 3 lần/giây; Giảm hiệu ứng (prefers-reduced-motion hoặc nút "Giảm hiệu ứng") thay rung, hit-stop và hạt bằng mờ dần tĩnh; FPS < 15 suốt 3 giây thì TRƯỚC HẾT giảm hạt còn ≤ 12 và tắt rung, thấp thêm 3 giây mới giảm tần suất nhận diện (mỗi 2 khung).',
};
