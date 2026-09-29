// Bốn quy định lớp học ở tầng giao diện và tiến bộ — bổ sung cho tools/lib/rules.mjs (an toàn/hiệu năng)
// và tools/lib/feel.mjs (vận động/arcade). validate.mjs so khớp nguyên văn các chuỗi này.
//
// Lý do tồn tại: khi đem game webcam vào lớp thật, bốn thứ hỏng trước tiên là
// chữ đè lên người học sinh, camera yếu chỉ thấy tay mà game vẫn đòi toàn thân,
// mỗi phiên chơi bắt đầu lại từ số 0 nên không có tiến bộ tích lũy,
// và lớp đông thì một máy một em là quá chậm.

export const CLASSROOM = {
  // Chữ và HUD không được đè lên người học sinh.
  safeZone:
    'Vùng an toàn cho HUD: chia khung hình thành lưới 3×3; phần thân học sinh (ô giữa và ô giữa trên) là vùng CẤM đặt chữ — HUD, điểm, tim, đề bài, thẻ đáp án và mascot chỉ nằm ở dải trên cùng, hai cột biên và dải dưới. Chữ không được đè lên tay, mặt hay lồng ngực của các em. Vật thể tương tác vẫn được bay qua vùng giữa, nhưng mọi chữ hướng dẫn thì không.',

  // Không đòi hỏi mức nhận diện cao hơn những gì camera đang thấy.
  framing:
    'Đàm phán khung hình theo khả năng camera: khi bắt đầu, kiểm tra hệ thống đang thấy tới đâu — chỉ bàn tay (HandLandmarker), nửa thân trên (thêm vai 11/12) hay toàn thân (thêm hông 23/24) — rồi chọn cơ chế theo mức tốt nhất ĐANG CÓ, không đòi mức cao nhất. Thiếu vai thì bỏ động tác nghiêng thân, thiếu hông thì bỏ bước chân, chỉ thấy một tay thì chuyển sang cơ chế một tay. Hiện một dòng tiếng Việt nói rõ "camera đang thấy: hai tay + vai" và gợi ý lùi ra xa hoặc xoay người nếu thiếu bộ phận cần cho cơ chế đang chạy.',

  // Tiến bộ tích lũy qua nhiều phiên chơi, không lưu hình ảnh.
  mastery:
    'Hồ sơ tiến bộ xuyên phiên: lưu vào localStorage key "miti-mastery" một bản ghi nhỏ theo từng cụm kiến thức — số lần gặp, số lần đúng, errorTag sai nhiều nhất, số lần đúng liên tiếp và ngày chơi gần nhất; KHÔNG lưu ảnh, video hay dữ liệu cá nhân. Khi mở game, đọc hồ sơ trước rồi xếp câu theo ưu tiên: errorTag em sai nhiều nhất lên trước (lặp lại cách quãng), câu đã đúng 3 lần liên tiếp thì giãn ra; màn tổng kết so với lần chơi trước bằng một câu ("Em đã sửa được lỗi ... so với lần trước"). localStorage bị chặn hoặc mất hồ sơ thì game vẫn chạy trọn vẹn, chỉ bỏ phần so sánh.',

  // Lớp đông: hai em cùng một khung hình.
  twoPlayer:
    'Chế độ hai học sinh (nút bật/tắt, mặc định một người): HandLandmarker chạy maxNumHands: 2, chia khung hình thành hai nửa theo trục dọc và đánh dấu nửa của từng em bằng viền màu. Mỗi bàn tay chỉ chốt được đáp án trong nửa của mình — gán theo vai nếu có PoseLandmarker, không có pose thì gán theo tay trái/tay phải; điểm, tim và chuỗi của hai em tách riêng, không cộng gộp. Đề bài hiện chung ở giữa nhưng mỗi em có lượt riêng, em chốt trước được cộng chuỗi và em kia vẫn còn đủ thời gian trả lời. Không xếp hạng, không trừ điểm vì chậm hơn bạn.',
};

// Dòng rút gọn dùng cho checklist và block biến thể.
export const CLASSROOM_SHORT =
  'HUD không đè lên thân học sinh · chọn cơ chế theo mức camera đang thấy · hồ sơ "miti-mastery" xếp câu theo lỗi yếu nhất · có chế độ 2 người chơi maxNumHands: 2';
