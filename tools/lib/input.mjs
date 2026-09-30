// Sáu quy định NHẬP LIỆU TAY THÍCH ỨNG cho Finger_Game khi 2–3 em cùng chơi — cài đặt, theo lượt ngón tay,
// lọc tay theo làn, tự chuyển khi nhận tay kém, cổ tay đồng thời và chế độ cố định do giáo viên chọn.
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: nhận nhiều bàn tay cùng lúc làm máy yếu tụt khung hình và gán tay nhầm người. Vì vậy mặc định
// "Tự động" cho các em trả lời LẦN LƯỢT bằng ngón tay (chỉ nhận tay trong làn đang có lượt); khi máy chậm hoặc tay
// bị trượt/mơ hồ thì chuyển ngay sang cổ tay (PoseLandmarker) để mọi em chơi cùng lúc mà vẫn giữ nguyên điểm.
// Chỉ in vào prompt khi isFingerGame(g.gestures) (tools/lib/players.mjs); đặt ngay sau PLAYERS, trước COMPETE.

export const INPUT = {
  setting: 'Cách nhận tay khi 2–3 bạn (nút bánh răng ở màn chọn số người): Tự động (mặc định) · Theo lượt ngón tay · Cổ tay đồng thời; nhớ trong localStorage "miti-input". N = 1 bỏ qua.',
  turn:    'Theo lượt (Tự động bắt đầu ở đây): trước ván báo "Máy đọc tay LẦN LƯỢT từng bạn nhé!"; mỗi lượt hiện Turn_Banner "Lượt của P<n> — sẵn sàng tay!" chữ lớn màu làn kèm giọng đọc rồi mới nhận đáp án; làn có lượt sáng, phóng to (~60% bề ngang), làn khác mờ 40%.',
  hands:   'Theo lượt: HandLandmarker numHands = 2, chỉ nhận tay có cổ tay (landmark 0) trong làn của bạn đang có lượt; PoseLandmarker numPoses = N chạy mỗi 3 khung giữ luật làn. Lượt xoay vòng P1 → P2 → … → PN → P1, mỗi em đúng 8 câu (tổng 8 × N lượt chính: 16 với 2 bạn, 24 với 3 bạn); đồng hồ chỉ chạy trong lượt của chính em.',
  health:  'Tự động: FPS trung bình < 15 suốt 3 giây, hoặc 3 lần liên tiếp tay trượt (không thấy tay trong làn sau 1,5 giây) hay mơ hồ (confidence < 0.6, quá 2 tay trong làn, số ngón đổi ≥ 3 lần trong 1 giây) → chuyển NGAY sang Cổ tay đồng thời, thông báo ≤ 3 giây "Mình đổi sang chạm bằng cổ tay nhé!", giữ nguyên điểm mọi em. Lượt dở chơi lại bằng cổ tay, các bạn còn lại của vòng đó chơi tiếp lần lượt, từ vòng sau mọi em chơi cùng lúc tới khi mỗi em đủ 8 câu; không quay lại trong ván. HandLandmarker tải model lỗi → vào thẳng Cổ tay đồng thời kèm thông báo đó, ở MỌI cài đặt.',
  wrist:   'Cổ tay đồng thời: tắt HandLandmarker; PoseLandmarker numPoses = N, cổ tay 15/16 của từng em là con trỏ; mỗi làn có mục tiêu riêng, cổ tay trong hitbox 3 khung liên tiếp là chốt; mọi em trả lời cùng lúc.',
  fixed:   'Giáo viên chọn "Theo lượt ngón tay" hoặc "Cổ tay đồng thời" thì giữ suốt ván, không tự chuyển; ngoại lệ duy nhất: model tay tải lỗi.',
};
