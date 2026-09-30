// Sáu quy định NHẠC NỀN THEO NHỊP — khoảng trống giữa hai cú chạm phải có một nhịp để em vận động theo.
// validate.mjs so khớp nguyên văn các chuỗi này (Object.entries trong FULL_LAYERS) và ghim con số BPM/gain
// trong FULL_PINS, nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: khảo sát 85 prompt trước vòng 14 đếm được "nhạc nền" 0/85, "giai điệu" 0/85, "BPM" 0/85,
// "theo nhịp" 0/85. Hợp đồng âm thanh của celebrate.mjs cả sáu mục đều là điều CẤM (<= 200 ms, <= 0.25 gain,
// <= 4 giọng) — cần thiết để file Canvas không hành xác một lớp bốn em, nhưng hệ quả là giữa hai thẻ câu hỏi,
// game chỉ im lặng rồi "ting". Trẻ lớp 4–5 vận động theo tiếng: một nhịp trống đều khiến em khuỳnh tay
// đúng nhịp và hết hiệp thì em nhớ là mình vừa chơi gì, còn im lặng thì em đứng nhìn màn hình. Nhạc nền còn
// là chỗ duy nhất buộc "đứng yên 15 giây" phải thành "đứng theo nhịp" thay vì thành đếm ngược vô hình.
// Ràng buộc cứng: không file .mp3/.wav ngoài (đầu ra vẫn là MỘT file HTML), mọi thứ tổng hợp bằng Web Audio.

export const RHYTHM = {
  // Có nhịp thật, đo được bằng BPM, không phải "có nhạc nền" chung chung.
  beat:
    'Nhạc nền có nhịp thật, tự tổng hợp bằng Web Audio API (bốn nhịp một ô: kick + bass + hat + một lớp giai điệu), CẤM hotlink file .mp3/.wav/.ogg ngoài — đầu ra vẫn phải là một file HTML duy nhất. Tempo 100–116 BPM ở hiệp 1 và 2, mỗi ô nhịp 2–4 ô lặp liên tục không đổi. Nhạc chạy trên bus riêng với gain <= 0.18 và luôn thấp hơn bus SFX; chỉ bắt đầu SAU cú bấm "Bắt đầu" (theo hợp đồng âm thanh), mờ dần 300 ms khi Pause hoặc tab ẩn và vào lại khi chơi tiếp. Cấm một tiếng rít lặp lại nguyên văn, cấm âm báo theo từng khung hình, cấm nhạc lớn hơn tiếng mascot đọc đề.',

  // Nhịp nhạc biến thành nhịp cơ thể: đây là phần thể dục, không phải phần trang trí.
  move:
    'Nhịp nhạc là nhịp vận động: bốn động tác khởi động đếm 8 nhịp mỗi động tác theo đúng BPM của loop; trạm nghỉ 5 giây là mini-trạm đập 8 bong bóng theo đúng 8 nhịp; mỗi cú chốt đúng rơi vào một phách mạnh để em thấy động tác của mình khớp với tiếng. CẤM buộc em đổi tư thế nhanh hơn một lần mỗi nhịp, và trần 128 BPM để xung hình ảnh theo nhịp không vượt trần nhấp nháy 3 lần mỗi giây. HUD trong lúc đọc đề hiện vạch nhịp đang chạy (không phải đồng hồ đếm ngược) để em không đứng yên tuyệt đối.',

  // Nhạc phải nhường lời: đề bài được đọc to là phần nghe quan trọng nhất.
  duck:
    'Nhạc nhường lời: khi \`window.speechSynthesis\` đọc đề hoặc mascot nói một câu thoại, bus nhạc hạ xuống <= 30% gain trong suốt lúc đọc và trả lại trong 300–500 ms; giọng nhạc và giọng đọc không đè lên nhau. Tổng ngân sách giọng theo hợp đồng âm thanh: <= 4 giọng SFX + <= 3 giọng nhạc nền, không quá 7 giọng đang phát cùng lúc. Cấm dùng nhạc để báo hiệu đúng/sai — tín hiệu học tập vẫn là SFX và chữ trên HUD.',

  // Hiệp sau phải nghe khác hiệp trước, nếu không "HIỆP QUYẾT ĐỊNH" chỉ là chữ.
  crescendo:
    'Nhạc leo theo hiệp: hiệp 2 thêm một lớp bass, hiệp 3 thêm trống và nhích tempo +8 BPM (vẫn trong trần 128); 1,5 giây cuối hiệp 3 dồn nhịp; nghi thức mở thưởng cuối hiệp là 2,5 giây nhạc leo rồi vỡ òa khớp đúng lúc pháo giấy nổ. Nhạc cao trào chỉ đổi không khí, không đổi luật chơi, không cộng điểm, không rút thời gian đọc đề, và bản Giảm hiệu ứng chuyển động thì bỏ phần dồn nhịp nhưng giữ nguyên nội dung học.',

  // Bản tắt tiếng và bản giảm hiệu ứng vẫn phải còn nhịp — chỉ là nhịp nhìn được.
  quiet:
    'Nhịp cho người không nghe: khi "miti-mute" bật hoặc máy không có tiếng, game hiện một vạch nhịp đập theo đúng BPM ở mép dưới HUD (mờ dần, không nhấp nháy quá 3 lần mỗi giây, không vượt 25% khung hình) để em vẫn bắt được nhịp bằng mắt; máy bật sẵn \`prefers-reduced-motion\` thì vạch nhịp đứng yên và nhạc nền tắt hẳn, game vẫn chơi trọn 12 lượt. Nút "Tắt tiếng" phải tắt cả nhạc nền, không chỉ SFX, và lựa chọn đó đọc lại được từ "miti-mute" sau khi tải lại trang.',

  // Nhạc cũng phải tự chứng minh, không phải chữ kê sẵn trong prompt.
  guard:
    'Nhạc kiểm được bằng code: \`verifyMusic()\` chạy MỘT LẦN lúc nạp và kiểm — loop được tổng hợp bằng Web Audio (không có \`<audio src>\` hay \`fetch()\` file âm thanh nào), BPM nằm trong 100–128, gain bus nhạc <= 0.18, không một giọng nào phát trước cú bấm "Bắt đầu", bus nhạc hạ khi \`speechSynthesis\` đang đọc. Thiếu một trong năm điều đó thì \`console.warn\` nêu bằng tiếng Việt và bảng kiểm MiTi ghi CHƯA ĐẠT ở mục nhạc nền; game vẫn chơi được bình thường. Cấm báo "đã có nhạc" mà thực tế chỉ phát tiếng đúng một lần ở câu đầu tiên.',
};

// Dòng rút gọn cho chuỗi tự kiểm của prompt, block biến thể và legacy.
export const RHYTHM_SHORT =
  'nhạc nền tự tổng hợp Web Audio 100–116 BPM (hiệp 3 +8, trần 128), bus riêng gain <= 0.18, hotlink .mp3/.wav là lỗi · nhịp = nhịp vận động (khởi động 8 nhịp/động tác, trạm nghỉ 8 nhịp, chốt đúng rơi vào phách mạnh) · nhạc nhường speechSynthesis còn <= 30% gain · crescendo theo hiệp, không đổi luật · bản tắt tiếng có vạch nhịp <= 3 xung/giây, reduced-motion thì đứng yên · verifyMusic() kiểm lúc nạp';
