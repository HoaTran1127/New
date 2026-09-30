// Vận động to + cảm giác arcade, áp cho mọi prompt. validate.mjs so khớp nguyên văn: đổi ở đây phải chạy lại node tools/build.mjs.
// Hit-stop, hạt/FX và linh vật nằm ở tools/lib/effects.mjs; trạm nghỉ giữa hiệp ở HYPE.climax; đếm động tác ở COMPETE.titles.
export const MOTION = {
  amplitude:
    'Biên độ: mỗi lượt cả cánh tay hoặc thân đi hết >= 50% tầm với đo lúc calibration (khuỷu gần thẳng khi chốt), không qua vòng bằng cổ tay kề vai; HUD nhắc hướng cần với ("với sang trái", "với lên cao", "cúi xuống thấp").',
  reach:
    'Vùng đích: tâm vùng đáp án cách trục cơ thể >= 45% tầm với, trong 12% bề rộng tính từ mép khung, đổi chỗ mỗi lượt; không đặt hai vùng cạnh nhau hay chồng lên vùng ngực–mặt.',
  variety:
    'Xen kẽ: một bên tay hoặc một hướng không quá 4 lượt liên tiếp; luân phiên trái – phải – hai tay – nghiêng thân, mỗi 3 lượt đổi mặt phẳng (ngang vai → với cao → thấp trong tầm an toàn).',
};
export const FEEL = {
  juice:
    'Combo: chuỗi đúng hiện "x2, x3…" to dần, cao độ âm nhảy bậc (tối đa x5), đứt chuỗi thì âm rơi một cung; chữ khen ngắn ("ĐÚNG RỒI!", "CHỐT HẠ!") bay lên tại điểm chạm, câu sai dùng chữ đỡ ("Còn sát lắm!"), không chữ đỏ to. Mỗi vòng đúng 2 thẻ vàng "x2 điểm trong 5 giây" và 1 "câu thử thách" có âm báo riêng, tự biến mất sau 3 giây; tỉ lệ 60/40 và ngân hàng câu không đổi.',
  nearMiss:
    'Sắp tới mốc: em còn đúng 1 câu nữa chạm mốc 10 / 20 / 30 câu đúng thì làn của em hiện 1,5 giây "Còn 1 câu nữa tới mốc <m> — lượt kế x2 điểm"; đếm từ câu đúng thật, không hứa thưởng ảo.',
};
