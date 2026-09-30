// Sáu quy định KHOẢNH KHẮC ĂN MỪNG — chỗ trẻ hét lên thành tiếng, và hợp đồng để âm thanh không làm phiền cả lớp.
// validate.mjs so khớp nguyên văn các chuỗi này (Object.entries trong FULL_LAYERS), nên đổi ở đây phải chạy lại node tools/build.mjs.
//
// Lý do tồn tại: vòng 11 gỡ gánh nặng tính nhẩm rồi, nhưng đo lại 85 prompt bằng khảo sát từ khóa thì phần "ăn mừng"
// vẫn trống: confetti/pháo giấy 0/85, slow-motion 0/85, trần độ dài SFX 0/85, quy định không phát âm thanh trước cú
// bấm đầu 0/85, phản hồi rung 0/85. Mục 8.1 (feel.mjs) đã làm mỗi cú chạm có lực, mục 8.2 (hype.mjs) đã tạo mốc để
// chờ — nhưng giữa mốc và cảm giác vui không có gì nổ ra: tới mốc thì HUD chỉ đổi số. Với lớp 4–5, một loạt pháo giấy
// 40 hạt và ba giây cả lớp hô "3-2-1-CHỐT!" là thứ khiến em nhớ mình vừa chơi gì.
// Layer này cũng chặn hai tai nạn thật của file Canvas: AudioContext bị trình duyệt chặn nên game câm từ đầu tới cuối,
// và SFX dài 1 giây phát 60 lần mỗi phút trong một lớp bốn em cạnh nhau.

export const CELEBRATE = {
  // Mốc phải nổ ra, nhưng nổ mọi lúc thì không còn mốc.
  confetti:
    'Pháo giấy chỉ dành cho mốc: đúng bốn loại sự kiện được nổ pháo — chạm đích chung của nhóm, sự kiện "PHÁ KỶ LỤC!", mở thưởng ở cuối hiệp 3, và hoàn thành mini-trạm nghỉ. Đợt pháo có 40–60 hạt, spawn qua \`toScreen()\` tại điểm chạm cuối cùng (bản không camera thì spawn tại giữa khung hình), mỗi hạt xoay 1–3 vòng và rơi trong 1,2–1,8 giây, biến mất hẳn trước màn kế. CẤM nổ pháo mỗi câu đúng — câu đúng đã có particle của mục cảm giác arcade; pháo mất giá trị nếu thành tiếng chúc mặc định. Trần một đợt pháo mỗi 3 giây (theo trần nhấp nháy), bản Giảm hiệu ứng chuyển động thay pháo bằng một dải băng tĩnh + chữ "CHÀO!" to dần, không chớp.',

  // File Canvas câm hoặc rít là hai lỗi người dùng gặp ngay phút đầu.
  sfx:
    'Hợp đồng âm thanh để bốn em ngồi cạnh nhau vẫn học được: AudioContext chỉ được resume SAU cú bấm "Bắt đầu" (không có tiếng động nào trước cú bấm đó, kể cả tiếng nền); mỗi SFX dài tối đa 200 ms; master gain <= 0.25 và có nút "Tắt tiếng" lưu lựa chọn trong "miti-mute"; tối đa 4 giọng SFX đồng thời — nhạc nền nếu có chạy trên bus riêng với tối đa 3 giọng, tổng không quá 7 giọng đang phát cùng lúc — và giọng cũ mờ dần trong 60 ms thay vì cắt khớp. Cấm loop tiếng rít, cấm âm báo lặp mỗi khung hình, cấm âm thanh gây sợ cho câu sai (dùng tiếng "bụp" trầm). Khi tắt tiếng, mọi phản hồi vẫn phải đọc được bằng chữ + hình. Game Tiếng Anh: phần đọc từ bằng \`window.speechSynthesis\` đi qua MỘT hàng đợi duy nhất, không phát đồng thời với SFX để em không nghe lẫn tiếng.',

  // Chậm đúng hai khoảnh khắc là điện ảnh; chậm cả trận là game hỏng.
  slowmo:
    '"Viên đạn thời gian" — chỉ đúng hai khoảnh khắc được làm chậm: thẻ vàng vừa xuất hiện và 1,5 giây cuối của "HIỆP QUYẾT ĐỊNH". Tốc độ bay của thẻ giảm còn 0,45× trong 600 ms, cao độ âm rơi một quãng tám, viền màn hình tối dần 15% rồi trả lại ngay; mọi chuyển động khác (mascot, hạt, HUD) giữ nguyên nhịp. Slow-mo chỉ kéo DÀI thời gian thẻ bay, không rút ngắn thời gian em đọc đề và không tính lại nhịp thẻ 3,0–4,5 giây của mục thể dục; cấm slow-mo khi engine đang dừng 2 giây hiện lời giải. Bản Giảm hiệu ứng chuyển động bỏ hẳn slow-mo, chỉ đổi màu viền.',

  // Điện thoại đặt dọc trong lớp: cú chạm phải được trả lời bằng cả da thịt, không chỉ bằng mắt.
  haptics:
    'Rung có kiểm soát: \`navigator.vibrate(20)\` khi chốt đúng, 60 ms khi vỡ chuỗi, 100 ms khi chạm đích chung hoặc phá kỷ lục — tất cả bọc trong \`if (navigator.vibrate)\` để máy không hỗ trợ vẫn chạy bình thường, không tải plugin rung. Cấm rung liên tục hoặc rung theo từng khung hình; tắt rung khi máy đang ở chế độ Giảm hiệu ứng chuyển động hoặc "miti-mute" đang bật (rung là phản hồi cảm giác, nằm cùng công tắc với âm thanh). Bàn tính không có rung thì bỏ qua, không hiện thông báo lỗi.',

  // Hài hình thể là thứ khiến trẻ cười trước khi kịp hiểu bài.
  slapstick:
    'Hài hình thể 3 giây mỗi hiệp: mascot có đúng MỘT màn lố mỗi hiệp, kích hoạt khi chuỗi đúng đạt 3 — trượt vỏ chuối số rồi lộn vòng, đội ngược mũ bảo hiểm, nhảy quặp theo nhịp nhưng hụt nhịp cuối, giả vờ hoa mắt khi thẻ vàng bay qua. Màn hài diễn trong vùng HUD dưới (không che người chơi và không che chữ đề), tối đa 3 giây, không kèm chớp sáng hay đổi màu cả khung hình, không chậm nhịp thẻ. Chuỗi đứt thì mascot làm một nét mặt đỡ (ngáp, chống cằm, xoa mắt) trong 1 giây — hài nhưng không chế giễu học sinh.',

  // Bốn em một máy: cho cả nhóm cùng hô, đây là chỗ duy nhất tiếng ồn được khuyến khích.
  crowd:
    'Cho cả lớp hô cùng nhau: trước hiệp 3, mascot đếm to "Cả lớp: 3 – 2 – 1 – CHỐT!" trong 4 giây, chữ đếm hiện từng nhịp >= 60px ở nửa dưới màn hình, khuyến khích cả bốn em đang đứng cạnh máy cùng hô và cùng làm một động tác mở màn (hai tay lên cao rồi hạ xuống). Không tính điểm, không trừ tim, không cần camera nhận diện được ai, không so sánh ai hô to hơn ai; bản Giảm hiệu ứng chuyển động bỏ nhịp đếm hình, giữ nguyên dòng chữ. Đây là chỗ duy nhất game chủ động xin lớp ầm lên — các mục khác đều giữ trần âm lượng ở hợp đồng âm thanh.',
};

// Dòng rút gọn cho chuỗi tự kiểm của prompt, block biến thể và legacy.
export const CELEBRATE_SHORT =
  'pháo giấy 40–60 hạt chỉ ở 4 loại mốc (không nổ mỗi câu đúng) · AudioContext chỉ mở sau cú bấm Bắt đầu, SFX <= 200 ms, gain <= 0.25, <= 4 giọng SFX + nhạc nền <= 3 giọng bus riêng, có nút tắt tiếng lưu "miti-mute" · slow-mo 0,45× đúng 600 ms cho thẻ vàng và 1,5 giây cuối hiệp 3 · navigator.vibrate 20/60/100 ms bọc if · một màn hài hình thể 3 giây mỗi hiệp · 4 giây "Cả lớp: 3-2-1-CHỐT!" trước hiệp 3';
