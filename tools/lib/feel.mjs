// Quy định "vận động to + cảm giác arcade" áp cho mọi prompt (game + biến thể + legacy).
// validate.mjs so khớp nguyên văn các chuỗi này, nên đổi ở đây phải chạy lại node tools/build.mjs.
// Lý do tồn tại: hai lỗi hay gặp nhất của game webcam là học sinh chỉ nhấc ngón tay ngồi một chỗ,
// và cú chạm không có phản ứng nào nên chơi như làm bài tập trên lớp.

export const MOTION = {
  // Mỗi lượt phải là một động tác thật.
  amplitude:
    'Biên độ động tác: mỗi lượt bắt buộc cả cánh tay hoặc thân người đi hết một quãng tối thiểu 50% tầm với đã đo lúc calibration (khuỷu duỗi gần thẳng khi chốt). Không được để một vòng chơi qua hết bằng động tác cổ tay kề vai; HUD nhắc to bằng tiếng Việt đúng hướng phải với ("với tay sang trái", "với lên cao", "cúi xuống thấp").',

  // Vùng đích phải nằm xa nhau và sát mép khung hình.
  reach:
    'Vùng đích dàn ra mép khung: tâm các vùng đáp án cách trục cơ thể học sinh >= 45% tầm với và nằm trong 12% bề rộng tính từ cạnh khung hình, đồng thời đổi vị trí giữa các lượt; cấm đặt hai vùng cạnh nhau. Vùng chạm không được chồng lên vùng ngực–mặt để chữ vẫn đọc được.',

  // Không dồn mệt vào một bên.
  variety:
    'Xen kẽ nhóm cơ: trong 12 lượt, không để cùng một bên tay hoặc một hướng chịu quá 4 lượt liên tiếp; luân phiên trái – phải – hai tay – nghiêng thân, và mỗi 3 lượt đổi mặt phẳng động tác (ngang tầm vai → với cao → xuống thấp trong tầm với an toàn).',

  // Hiệp + trạm nghỉ để giữ nhịp mà không quá sức.
  breather:
    'Nhịp vận động: 12 lượt chia thành 3 hiệp 4 lượt; giữa hai hiệp là "trạm nghỉ" 5 giây có đếm ngược 5-4-3-2-1 trên HUD, không tính sai, không mất tim, không trừ điểm. Mục tiêu một vòng chơi tương đương 4–6 phút đứng vận động vừa, vẫn tại chỗ và trong tầm tay.',

  // Cho giáo viên thấy đây là tiết học có vận động.
  meter:
    'Thước đo vận động: đếm số động tác hợp lệ và thời lượng chơi, hiển thị một thẻ "Em đã vận động N động tác trong M phút" ở màn tổng kết; con số này không phải điểm số và không so sánh với bạn nào.',
};

export const FEEL = {
  // Cú chạm phải "có lực" nhìn thấy được.
  hitStop:
    'Hit-stop: khi chốt đúng, đóng băng mọi vật thể 70–90 ms, giật màn hình 4–6 px theo hướng động tác, thẻ đáp án lún còn 0.85 rồi nảy về 1.0 (squash & stretch) — người chơi phải nhìn thấy lực của cú chạm, không chỉ nghe tiếng.',

  // Combo thấy được và nghe được.
  combo:
    'Combo nhìn thấy + nghe thấy: chuỗi đúng hiện "x2, x3, x4…" to dần kèm vệt neon nối từ tay học sinh tới vật vừa trúng; cao độ âm thanh đúng nhảy bậc thang theo combo (tối đa x5), đứt chuỗi thì âm rơi xuống một cung và số combo tan thành hạt.',

  // Chữ khen bật lên tại vị trí chạm.
  cheer:
    'Chữ khen bật lên tại điểm chạm: mỗi cú đúng đẩy một cụm tiếng Việt ngắn ("ĐÚNG RỒI!", "QUÁ XA!", "CHỐT HẠ!") bay lên từ đúng vị trí vật vỡ rồi tan; câu sai dùng chữ đỡ ("Còn sát lắm!", "Thử lại nào!"), không dùng chữ đỏ to gây sợ.',

  // Sự kiện ngẫu nhiên tạo hồi hộp mà không đổi nội dung học.
  bonus:
    'Sự kiện ngẫu nhiên: mỗi vòng có đúng 2 thẻ vàng "nhân đôi điểm trong 5 giây" và 1 "câu thử thách" phát ra từ z xa với âm báo riêng, biến mất sau 3 giây nếu không kịp với; tỉ lệ 60/40 và ngân hàng dữ liệu không đổi.',

  // FX arcade nhưng vẫn hòa vào khung hình thật.
  fx:
    'FX arcade hòa vào nền AR: particle màu nổ theo khối, vệt kiếm neon mọc từ cổ tay thật, kính vỡ mạng nhện lan từ điểm va chạm khi hụt, viền HUD nhấp nháy theo combo — tất cả vẽ trên canvas trong suốt phủ đúng khung hình camera, tôn trọng trần alpha 0.45 và ngân sách particle đã quy định.',

  // Nhân vật phản ứng để trẻ thấy có người chơi cùng.
  mascot:
    'Nhân vật phản ứng: mascot của game đứng ở một góc khung hình (không che người chơi), nghiêng người theo hướng với tay, giơ tay ăn mừng khi combo >= 3 và che mắt khi hụt; mất landmark thì mascot đưa tay chỉ về phía camera để nhắc chỉnh tư thế.',
};

// Dòng rút gọn cho checklist và cho block biến thể.
export const MOTION_SHORT =
  'động tác to (>= 50% tầm với), vùng đích sát mép khung, xen kẽ trái/phải, trạm nghỉ 5 giây giữa hiệp, đếm động tác ở tổng kết';
export const FEEL_SHORT =
  'hit-stop 70–90 ms + giật màn hình, combo có vệt neon và cao độ tăng, chữ khen bật tại điểm chạm, thẻ vàng x2 ngẫu nhiên, mascot phản ứng theo động tác';
