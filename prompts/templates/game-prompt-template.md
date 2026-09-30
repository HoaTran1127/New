# TEMPLATE — MiTi GAME PROMPT CHUẨN

> Dùng khi muốn thêm **một game mới** vào thư viện. Điền các ô `[...]`, copy nguyên khối `text` bên dưới dán vào **Google Gemini → bật chế độ Canvas**.
>
> Nếu game sẽ vào catalog (hiện trên dashboard), thêm một dòng vào `tools/data/games.mjs` rồi chạy `node tools/build.mjs` — đừng sửa tay file prompt được sinh ra.
>
> Biểu mẫu này là bản rút gọn của **khung 13 mục** trong `prompts/00-master-canvas-prompt.md`; mục nào chưa rõ thì mở master đọc nguyên văn rồi điền, đừng tự nghĩ quy định mới.

## Metadata (không gửi Gemini)

- Game ID: [ID] · Khối: [GRADE] · Môn: [SUBJECT]
- Cụm kiến thức: [CLUSTER] — phải có trong `tools/data/clusters.mjs`
- Điều khiển: [GESTURE] — **một trong 14 mã** `POINT · SWIPE · PUNCH · GRAB · DRAG · STEP · TWO_HAND_STRETCH · TWO_HAND_BALANCE · ANGLE_POSE · VOICE` (10 mã đang có trong catalog) + `CLAP · PINCH · HOLD_POSE · FINGER_COUNT` (mã mở rộng), tối đa 2 mã, mã đầu là mechanic chính. **Không được ghi `MIXED`.**

## Prompt copy trực tiếp

```text
Tạo game giáo dục web "[TÊN GAME]" cho học sinh Việt Nam lớp [GRADE], môn [SUBJECT].
Toàn bộ game nằm trong DUY NHẤT 1 FILE HTML: HTML + CSS (trong một khối <style> nội tuyến) + JavaScript.
Không dùng Tailwind Play CDN, không file .css/.js/.json/ảnh/mp3 ngoài. Chỉ được tải MediaPipe (CDN + file model) và font có dự phòng.

1. HỌC TẬP
- Mục tiêu học tập: [MỤC TIÊU — cụ thể theo SGK, không viết "vận dụng kiến thức qua tình huống"].
- Nhiệm vụ của học sinh trong mỗi lượt: [MỘT HÀNH ĐỘNG ĐỌC RA ĐƯỢC NGAY].
- Phạm vi kiến thức: chỉ dùng nội dung [MÔN lớp [GRADE]] đã học. Cấm ra đề vượt chương trình.
- Lỗi học sinh thường mắc ở chủ đề này (mỗi câu sai ghi đúng một trong các lỗi này): [LỖI 1]; [LỖI 2]; [LỖI 3].
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.
- Lịch ôn có mốc ngày: errorTag sửa đúng 2 lần liên tiếp thì xếp ôn lại vào +1 ngày, +3 ngày, +7 ngày (theo ngày của máy), ôn đều đúng thì giãn mốc kế tiếp thành +21 ngày. Đầu phiên đọc localStorage key "miti-review" (chỉ { id, due }, không tên học sinh, không ảnh) và đưa mục đã đến hạn vào tối đa 4/12 lượt, ưu tiên hơn câu mới; chưa đến hạn thì không xen. localStorage bị chặn thì bỏ phần lịch, vẫn chơi trọn 12 lượt.
- Xen cụm kiến thức: trong 12 lượt chính phải có >= 3 lượt thuộc cụm khác cụm chính của game (lấy từ "miti-mastery" hoặc QUESTION_DATA cùng khối ở level thấp hơn), đặt xen kẽ chứ không dồn cuối phiên. Trong một cụm giữ nguyên thứ tự dễ → khó.
- Hiệp quyết định: ba hiệp leo thang thật — hiệp 1 nền tĩnh, thẻ 4,5 giây; hiệp 2 viền HUD sáng dần theo combo, thẻ 3,75 giây; hiệp 3 nhãn "HIỆP QUYẾT ĐỊNH": điểm nhân đôi, thêm đúng 1 thẻ vàng, mascot hô mở đầu hiệp, âm nền nhanh hơn (dưới trần nhấp nháy 3 lần mỗi giây). Mỗi hiệp vẫn 4 lượt, vẫn trạm nghỉ 5 giây, ngân hàng câu hỏi và mức độ KHÔNG đổi theo hiệp; sai ở hiệp 3 không nặng hơn sai ở hiệp 1.
- Kỷ lục của chính em: localStorage key "miti-best" chỉ ba số { điểm cao nhất, chuỗi đúng dài nhất, ngày }; từ hiệp 2 HUD có dòng "Kỷ lục: <n> · Em đang: <m>"; vượt mốc thì nổ đúng một lần "PHÁ KỶ LỤC!" 1,2 giây; chưa có dữ liệu thì ẩn hẳn dòng kỷ lục, không hiện số 0.
- Vệt của em (ghost): lượt đầu mỗi hiệp có dải sáng hình người cách điệu (alpha <= 0.35, không phải ảnh người) chạy theo nhịp lượt tốt nhất phiên trước; về trước vệt thì +5 điểm và chữ "NHANH HƠN EM HÔM QUA!". Không có dữ liệu thì bỏ vệt, không hiện chữ "thua".
- Đích chung của cả nhóm: cột tiến độ "Cả nhóm: <x>/<mốc> câu đúng" (mặc định 40, người lớn đổi 20–60) ở dải dưới màn; chạm mốc thì cả màn ăn mừng 3 giây. Chỉ hiện tổng số câu đúng — không điểm từng em cạnh nhau, không tên, không hạng nhất.
- Báo sắp tới mốc: còn đúng 1 câu nữa là chạm mốc 10 / 20 / 30 câu đúng của phiên thì HUD hiện "Còn 1 câu nữa tới mốc <m> — lượt kế nhân đôi điểm" trong 1,5 giây rồi tự ẩn; đích chung ghi "Cả nhóm còn <k> câu tới mốc <m>". Số đếm từ câu đúng thật, không hứa thưởng ảo.
- Khiên chuỗi để dành: mỗi chuỗi đúng 5 câu phát 1 khiên, tích tối đa 2 trong localStorage key "miti-tokens" (chỉ { khien, quyen_chon, ngay }); sai khi còn khiên thì khiên vỡ, chuỗi không bị cắt nhưng VẪN trừ 1 tim, VẪN hiện lời giải và câu đó VẪN vào hàng đợi luyện lại. Quyền "chọn câu dễ hơn một bậc" được để dành sang phiên sau. Khiên không phải mạng thứ hai: hết 5 tim vẫn thua.
- Câu mở màn "Em còn nhớ không?": TRƯỚC lượt chính 1, chiếu 10 giây một câu em từng làm đúng ở phiên trước (không gợi ý, không hiện đáp án), trả lời bằng cơ chế đang dùng hoặc chuột. Đúng thì giãn mốc ôn; sai thì KHÔNG trừ tim, không tính câu sai mới, chỉ xếp vào lượt 3 kèm lời giải từng bước. Phiên đầu trên máy thì bỏ qua bước này, không báo lỗi.
- Hỏi lại "Vì sao đúng?": ở đúng 4/12 lượt (một lượt mỗi hiệp + mọi lượt ôn), ngay sau cú chốt đúng, hiện câu "Vì sao em chọn câu trả lời này?" với 3 phương án trong <= 5 giây. Đúng thì cộng chuỗi, sai thì không trừ tim và hiện lại một dòng lời giải. Không tính vào 12 lượt, không rút thời gian đọc đề; bản Giảm hiệu ứng và bản không camera được bỏ bằng nút "Thôi" mà không phạt.
- Quên thì không phạt: mục từng đúng >= 2 lần mà sai khi ôn lại thì không trừ tim, không cắt chuỗi, chỉ hạ lịch về +1 ngày. Tổng kết hiện "Hôm nay em vẫn nhớ: ..." (tối đa 3 id ôn đúng) và "Cần ôn lại: ..." (tối đa 3 id đến hạn nhưng sai), kèm một câu động viên có nội dung cụ thể.
- Tờ rời cho giáo viên: nút "Copy tờ rời" ở màn tổng kết sinh khối chữ tiếng Việt copy được — tên game, ba errorTag yếu nhất, số ngày từ lần chơi gần nhất, lịch ôn sắp tới (ngày + số câu), một đề xuất hành động cụ thể, và số động tác + phút vận động. Chỉ hiện trên màn hình và vào clipboard máy đó, không gửi đi đâu, không chứa tên hay ảnh học sinh.
- Kết thúc hé mở: sau ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", hiện đúng MỘT dòng "Chương tiếp theo: <tên chương>" nối vào kết quả phiên này (thí dụ "Chương 3 mở khi em sửa xong 2 lỗi: <loiViet>, <loiViet>") kèm nút "Xem trước" chiếu 6 giây một vật thể AR của chương sau, không cho chơi, không tính điểm. Cấm đe dọa "không chơi lại là mất hết".
- Hẹn lần sau bằng số câu thật: một dòng "Lần sau em quay lại sẽ có <n> câu đang chờ", <n> đếm từ "miti-review" (mục đến hạn trong 7 ngày tới, trần 4). <n> = 0 thì đổi thành "Chưa có câu nào chờ em — chơi thêm game khác để dành thẻ". Không xin quyền thông báo, không chuỗi ngày chơi, không dòng "em đã nghỉ X ngày".
- Nghi thức lưu phiên: bấm "Kết thúc" thì mascot cất thành tích trong 3 giây và hiện "Đã lưu: <điểm cao nhất>, chuỗi dài nhất <x>, <k> thẻ mới"; nút "Tắt máy" chỉ sáng sau dòng đó. localStorage bị chặn thì mascot nói "Máy này không giữ được tiến trình, em chơi tiếp từ đầu nhé" và mọi dòng kỷ lục ẩn hẳn. Giảm hiệu ứng rút còn 1 giây bằng chữ, không bỏ bước lưu.

2. THẾ GIỚI AR VÀ VÒNG CHƠI
- Bối cảnh: [BỐI CẢNH gắn thẳng với cơ chế học].
- Không gian chơi: học sinh đứng trước camera và mọi vật thể xuất hiện NGAY TRONG khung hình thật của các em (đi vào từ phía sau, tiến về phía người chơi), không nằm trong một bảng game tách rời.
- Cơ chế chính: [TÊN GESTURE bằng tiếng Việt]. Nhiệm vụ hiển thị bằng một dòng chữ to trên HUD, không cần đọc hướng dẫn.
- Biên độ động tác: mỗi lượt bắt buộc cả cánh tay hoặc thân người đi hết một quãng tối thiểu 50% tầm với đã đo lúc calibration (khuỷu duỗi gần thẳng khi chốt). Không được để một vòng chơi qua hết bằng động tác cổ tay kề vai; HUD nhắc to bằng tiếng Việt đúng hướng phải với ("với tay sang trái", "với lên cao", "cúi xuống thấp").
- Vùng đích dàn ra mép khung: tâm các vùng đáp án cách trục cơ thể >= 45% tầm với và nằm trong 12% bề rộng tính từ cạnh khung hình, đồng thời đổi vị trí giữa các lượt; cấm đặt hai vùng cạnh nhau. Vùng chạm không được chồng lên vùng ngực–mặt để chữ vẫn đọc được.
- Xen kẽ nhóm cơ: trong 12 lượt, không để cùng một bên tay hoặc một hướng chịu quá 4 lượt liên tiếp; luân phiên trái – phải – hai tay – nghiêng thân, mỗi 3 lượt đổi mặt phẳng động tác (ngang tầm vai → với cao → xuống thấp trong tầm với an toàn).
- Nhịp vận động: 12 lượt chia thành 3 hiệp 4 lượt; giữa hai hiệp là "trạm nghỉ" 5 giây có đếm ngược, không tính sai, không mất tim, không trừ điểm. Một vòng chơi tương đương 4–6 phút đứng vận động vừa, vẫn tại chỗ.
- Nghỉ cũng là chơi: trạm nghỉ 5 giây là một mini-trạm vận động KHÔNG hỏi bài (đập 3 bong bóng trong khung hình, giữ thăng bằng hai tay, lắc vai theo nhịp) — không tính đáp án, không trừ tim, không hiện lời giải, không tính vào 12 lượt và không đổi level thích ứng; xong thì +5 điểm động tác kèm một hiệu ứng lớn.
- Khởi động: 60–90 giây trước hiệp 1, không tính điểm và không trừ tim — đánh nhẹ hai vai 10 nhịp, xoay cổ tay 10 vòng mỗi bên, dang hai tay lên cao rồi hạ 8 nhịp, bước tại chỗ nâng cao đầu gối 15 giây; hình que + chữ tiếng Việt + đồng hồ đếm ngược. Bấm "Bỏ khởi động" vẫn được nhưng tổng kết nhắc "Lần sau mình khởi động đủ nhé". Máy bật Giảm hiệu ứng thì rút thành cổ tay – cổ chân – hít thở tại chỗ, không bỏ hẳn bước này.
- Nhịp thẻ: đáp án bay vào trong 3,0–4,5 giây, ở lại tối đa 8 giây kể từ khi hiện hết, giữa hai lượt chừa <= 1,5 giây để về tư thế; thời gian đọc đề không bị rút. Cường độ cả phiên đạt >= 12 nhịp chuyển động mỗi phút, đếm mỗi lần bàn tay hoặc thân vượt ngưỡng 15% tầm với đã calibration (tính cả nhịp khởi động, nhịp với tới và nhịp rút về ở 12 lượt, nhịp hạ nhiệt) chia số phút chơi thật.
- Đồng hồ thời gian vận động: tích lũy số giây tay/thân học sinh di chuyển thật (vượt ngưỡng 15% tầm với đã calibration); tổng kết in "Em đã chuyển động X giây trên tổng Y giây của phiên" và yêu cầu >= 60%. Dưới 60% thì mời thêm MỘT hiệp phụ 4 lượt nhẹ, không trừ tim, không phạt, không hiện chữ "không đạt". Bản không camera thay bằng đếm "số lượt em chủ động thao tác trong phiên".
- Hạ nhiệt: 45–60 giây trước màn tổng kết — duỗi tay ngang ngực 15 giây mỗi bên, cúi nhẹ chạm mũi bàn chân 15 giây, kéo vai ra sau 10 nhịp, hít thở đếm 4 vào – 4 ra; mascot cùng làm, đồng hồ hiện trong khung hình camera. Không tính điểm, không trừ tim, không được bỏ bằng một nút "Bỏ qua".
- Trần tải trọng: cấm nhảy rồi tiếp đất, cấm xoay thân nhanh quá 90 độ, cấm giữ hai tay trên cao liên tục quá 15 giây, tối đa 3/12 lượt là động tác cúi thấp. Mất landmark 3 giây hoặc FPS tụt thì hạ về nhịp chậm kèm một dòng tiếng Việt nhắc chỉnh tư thế, không dồn tiếp động tác cho đủ lượt.
- Độ dài: 12 lượt chính. Lượt 5 và lượt 9 chỉ là mốc NHỊP: thêm một bước trung gian và rút thời gian hiển thị hạt, không rút thời gian đọc đề. Level không đổi theo vị trí mà do thích ứng quyết định (ba dòng dưới).
- Thích ứng trong phiên: 2 câu ĐÚNG liên tiếp thì câu kế lên một level (trần level 3, ưu tiên cùng cụm kiến thức); 2 câu SAI liên tiếp thì xuống một level và BẮT BUỘC cùng errorTag với câu vừa sai, để em sửa đúng chỗ yếu chứ không gặp chủ đề lạ.
- Sàn chống nản: tuyệt đối không để học sinh sai quá 3 câu LIÊN TIẾP. Câu thứ tư bắt buộc là level 1 cùng errorTag, và trước khi cho chọn lại phải hiện lời giải TỪNG BƯỚC — mỗi bước một dòng, đúng dạng bài (cột dọc / sơ đồ đoạn thẳng / lưới ô / trục số). Chọn lại đúng thì không trừ tim lần hai và không tính là câu sai mới, chỉ không được cộng chuỗi; tổng kết ghi "em đã sửa được".
- Level ẩn với học sinh: không hiện chữ "level", "trình độ", số sao hay thanh tiến độ so với bạn; trẻ chỉ thấy nhiệm vụ tiếp theo. Phân bố số câu và tỉ lệ đúng theo level chỉ xuất hiện ở màn tổng kết dành cho giáo viên.
- Điểm: +9 cho một lượt, tách thành +6 cho ĐỘNG TÁC (đi hết >= 50% tầm với, chạm một vùng đích hợp lệ) và +3 cho ĐÁP ÁN ĐÚNG; chuỗi đúng, thẻ vàng và hiệp 3 nhân trên tổng đó. Không cộng điểm cho tốc độ đọc đề hay tốc độ tính. Sai không xóa kiến thức: vẫn hiện lời giải đầy đủ.
- Không đồng hồ đuổi theo câu hỏi: thẻ đáp án nằm im tới khi em chốt; đếm ngược chỉ ở khởi động, hạ nhiệt, trạm nghỉ, mở thưởng và mini-trạm vận động. Đứng im 15 giây thì mascot làm mẫu hướng động tác và đọc lại đề một lần, không trừ tim, không tự sang câu.
- Điều kiện thua: hết 5 tim (mỗi đáp án sai trừ 1 tim). Điều kiện thắng: hết 12 lượt, hiện tổng kết.
- Chống ăn may: vật thể đúng và vật thể sai trộn theo tỉ lệ xấp xỉ 60/40 trong mỗi lượt; chạm vào vật SAI trừ tim ngay và cắt chuỗi đúng, còn BỎ LỠ vật ĐÚNG chỉ cắt chuỗi đúng chứ không trừ tim — vung tay bừa không thắng được, đứng chờ cũng không bị phạt oan.

3. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo khuôn { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }.
- Tối thiểu [30 mục Toán / 60 mục Tiếng Anh], chia 3 mức độ, mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code; `dang` nhận "nhin" (nhìn–chỉ–chọn, không tính) hoặc "tinh" (đúng MỘT phép tính một bước).
- errorTag là mã máy của lỗi; loiViet là cụm tiếng Việt có dấu lấy nguyên văn từ danh sách lỗi ở mục 1 và là thứ hiển thị cho học sinh.
- Xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt; không để đáp án đúng luôn ở một vị trí.
- Phương án nhiễu mô phỏng đúng lỗi thật của học sinh, không phải giá trị ngẫu nhiên vô nghĩa.
- Tự kiểm chứng khi nạp: viết hàm `verifyQuestionBank()` chạy MỘT LẦN trước vòng chơi đầu tiên — answer phải có trong choices và chỉ xuất hiện đúng một lần; explanation, errorTag, loiViet khác rỗng; errorTag thuộc đúng danh sách đã khai báo; không hai mục trùng prompt (so sau khi bỏ khoảng trắng và chữ thường); level chỉ nhận 1/2/3 và mỗi level chiếm tối thiểu 1/4 số mục; `dang` chỉ nhận "nhin"/"tinh", mục "tinh" có tối đa MỘT dấu phép tính nằm giữa hai khoảng trắng, mọi đề không quá 16 từ. Mục trượt thì LOẠI KHỎI vòng chơi kèm `console.warn` nêu id + lý do bằng tiếng Việt; dưới ngưỡng thì cảnh báo ở màn chỉ giáo viên thấy.
- Mỗi phương án nhiễu phải sai theo MỘT LỖI THẬT trong danh sách lỗi ở mục 1. Trước khi chốt mục, thử từng nhiễu bằng câu hỏi "nói theo cách hiểu hợp lý nào thì phương án này đúng?" — nếu có thì thay phương án khác; hai đáp án cùng đúng làm lời giải thành vô nghĩa. Phương án đúng không được nổi bật về độ dài hay định dạng.
- Guard phạm vi: mọi số nằm trong phạm vi SGK đã khai báo ở mục 1, không có số âm ngoài phạm vi đã học, không chia cho 0, kết quả hữu hạn và so sánh chính xác bằng số học trong file; game Tiếng Anh thì mọi từ phải có trong word list đã khai báo. Viết thành điều kiện kiểm thật trong `verifyQuestionBank`, không chỉ ghi comment.
- Chống đoán mò bằng cấu trúc: đáp án đúng không được là số lớn nhất/nhỏ nhất ở quá 20% số mục, không được là phương án dài nhất ở quá 20%, không lặp lại nguyên văn cụm từ hiếm trong đề; vị trí đáp án đúng phân bố đều mỗi chỗ 1/3 số mục ± 10% — đếm được bằng chính hàm seed đã dùng để xáo.
- Level là bậc thang độ tinh vi của nhịp nhìn, không phải số phép tính: 1 = nhìn là chọn được ngay; 2 = nhìn kỹ một nhịp rồi loại trừ; 3 = ước lượng trong khoảng hoặc so hai mốc — vẫn chỉ MỘT thao tác. Muốn câu khó hơn thì kéo hai phương án lại gần nhau hoặc nâng số trong phạm vi SGK, CẤM ghép thêm phép tính.
- Một lượt một thao tác tư duy: kỹ năng SGK cần nhiều bước thì engine dựng sẵn các bước trước (cột dọc đã viết một dòng, sơ đồ đã chia ô, đơn vị đã đổi ở dòng trên), học sinh chỉ làm bước cuối.
- >= 60% số mục đang phát hành phải là `dang: "nhin"` — kiểm bằng `verifyQuestionBank()`, dưới ngưỡng thì bảng kiểm ghi CHƯA ĐẠT kèm tỉ lệ thật.
- Đề <= 16 từ, một mệnh đề, cấm "sau đó / rồi / biết rằng"; mỗi lượt đọc to đề bằng `speechSynthesis` (vi-VN; phần tiếng Anh đọc en-US) kèm nút "Nghe lại đề".
- Một mục mẫu để bám theo khuôn (viết tiếp cho đủ số mục, không được ít hơn):
  id: "q1", level: 1, prompt: "[...]", choices: ["[...]","[...]","[...]"], answer: "[...]", explanation: "[...]", errorTag: "[...]", loiViet: "[...]", dang: "nhin"

4. NỀN AR, CAMERA VÀ GESTURE
- NỀN AR (nguyên tắc gốc): khung hình webcam CHÍNH LÀ màn chơi, không phải ảnh nền trang trí. Vẽ video vào canvas ở mỗi khung hình, lật gương + cover-fit (cắt viền, không giãn hình):
    scale = Math.max(W / video.videoWidth, H / video.videoHeight)
    drawW = video.videoWidth * scale;  drawH = video.videoHeight * scale
    offX = (W - drawW) / 2;            offY = (H - drawH) / 2
    ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1); ctx.drawImage(video, offX, offY, drawW, drawH); ctx.restore();
  (Hoặc cách 2: thẻ video object-fit:cover phủ kín 100vw/100vh với opacity:1 rồi canvas trong suốt đè khít lên trên. Chọn một cách, không trộn lẫn.)
- Đọc chữ trên nền thật: phủ ĐÚNG MỘT lớp rgba(8,5,20,0.4) lên khung hình, alpha không vượt 0.45 (vẫn phải nhìn rõ người thật). Mỗi thẻ và đề bài phải tự có nền gradient + viền stroke + bóng, không phụ thuộc lớp phủ này.
- HÀM CHIẾU DUY NHẤT: toScreen(lx, ly) = { x: offX + (1 - lx) * drawW, y: offY + ly * drawH }, trong đó lx, ly là landmark chuẩn hóa 0..1.
  Vẽ video, vị trí spawn, va chạm, vật neo vào người và mọi hiệu ứng đều đi qua toScreen. CẤM viết lx * W hoặc ly * H: camera bị crop thì vật thể bay lệch khỏi người học sinh, mất hẳn chất AR.
- CHIỀU SÂU: mỗi vật thể mang z từ 1.6 (xa) về 0.35 (sát mặt người chơi); kích thước vẽ = cỡ gốc / z, vật xa nhỏ và hơi mờ, vật gần to và rực; vẽ ellipse bóng mờ dưới chân vật trên "sàn" ảo; thêm đường tốc độ (speed lines) dọc hai bên mép khi nhịp game nhanh lên.
- NEO VÀO CƠ THỂ: vật thể ảo phải đeo hoặc buộc vào landmark thật và cập nhật mỗi khung hình — cổ tay tay = landmark 0, khuỷu = 13/14, vai = 11/12, hông = 23/24, mũi = 0, tâm bàn tay = trung bình landmark 5, 9, 13, 17. Mất landmark hoặc confidence tụt thì vật neo biến mất kèm hướng dẫn tiếng Việt, không được nhảy lung tung.
- AR riêng của game này: [vật thể nào đi vào theo z từ 1.6 về 0.35, vật nào neo vào landmark nào của học sinh].
- MediaPipe Tasks Vision, pin phiên bản: import từ https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/vision_bundle.mjs
  wasm: https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm
  model: https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task (HandLandmarker), pose_landmarker_lite.task nếu cần tư thế toàn thân.
- Cấu hình camera: getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } }). Khung 4:3, crop nếu camera cho tỉ lệ khác, lật gương ngang khi hiển thị và khi tính tọa độ.
- Chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU. Trạng thái tiếng Việt: Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi (kèm nút Thử lại).
- Đàm phán khung hình theo khả năng camera: khi bắt đầu, kiểm tra hệ thống đang thấy tới đâu — chỉ bàn tay (HandLandmarker), nửa thân trên (thêm vai 11/12) hay toàn thân (thêm hông 23/24) — rồi chọn cơ chế theo mức tốt nhất ĐANG CÓ, không đòi mức cao nhất. Thiếu vai thì bỏ động tác nghiêng thân, thiếu hông thì bỏ bước chân, chỉ thấy một tay thì chuyển sang cơ chế một tay. Hiện một dòng tiếng Việt nói rõ "camera đang thấy: hai tay + vai" và gợi ý lùi ra xa nếu thiếu.
- Vùng an toàn cho HUD: chia khung hình thành lưới 3×3; phần thân học sinh (ô giữa và ô giữa trên) là vùng CẤM đặt chữ — HUD, điểm, tim, đề bài, thẻ đáp án và mascot chỉ nằm ở dải trên cùng, hai cột biên và dải dưới. Chữ không được đè lên tay, mặt hay lồng ngực của các em.
- Calibration động: màn calibration 3 giây ở tư thế trung tính, đo bề rộng hai vai + khoảng cách cổ tay trái–phải + tầm với xa nhất, suy ra đơn vị chuẩn của phiên chơi rồi đặt MỌI ngưỡng (tốc độ vung, góc, bán kính chấm chọn) theo đơn vị đó, không dùng hằng số pixel cố định. Tầm đo bất thường thì nhắc chỉnh khoảng cách và đo lại. Có nút "Chỉnh lại tư thế" hiệu chỉnh lại không tải trang, không mất điểm và lượt.
- Camera chỉ bật được trong môi trường an toàn (HTTPS, localhost hoặc mở file trực tiếp); nếu bị chặn thì báo một dòng tiếng Việt "Muốn dùng camera thì mở game qua HTTPS hoặc file trên máy em" rồi vào thẳng chế độ không camera.
- Cử chỉ chính — [GESTURE]: [landmark nào, hình học nào].
- Biên độ riêng của cơ chế này: [chép trường `bien_do` của mã gesture trong `tools/data/gestures.mjs` — động tác nào phải to, tay đi hướng nào].
- Điều kiện chốt đáp án (hit): [điều kiện KHÔNG phải hover; ví dụ ở trong ô đích đủ 3 khung hình rồi mới release].
- Làm mượt và chống spam: EMA alpha 0.45; cử chỉ chỉ fire ở lượt chuyển trạng thái; hysteresis hai ngưỡng; cooldown 250–400ms; giữ nguyên tư thế không spam event, không trừ tim.
- Confidence thấp thì không chốt đáp án.
- Nếu CDN hoặc model không tải được: hiện thông báo tiếng Việt rồi tự chuyển sang chế độ không camera, game vẫn chơi đủ.

5. FALLBACK (bắt buộc)
- Mouse / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính: [mô phỏng thao tác chính].
- Có nhãn "Chế độ không dùng camera" và nút Tắt camera riêng, không cần tải lại trang.
- Mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.

6. PHẢN HỒI HỌC TẬP
- Đúng: phản hồi tích cực ngay (âm thanh vui + hạt sáng) và một dòng ghi nhớ ngắn.
- Hit-stop: khi chốt đúng, đóng băng mọi vật thể 70–90 ms, giật màn hình 4–6 px theo hướng động tác, thẻ đáp án lún còn 0.85 rồi nảy về 1.0 (squash & stretch) — người chơi phải nhìn thấy lực của cú chạm, không chỉ nghe tiếng.
- Chữ khen bật lên tại điểm chạm: mỗi cú đúng đẩy một cụm tiếng Việt ngắn ("ĐÚNG RỒI!", "QUÁ XA!", "CHỐT HẠ!") bay lên từ đúng vị trí vật vỡ rồi tan; câu sai dùng chữ đỡ ("Còn sát lắm!", "Thử lại nào!"), không dùng chữ đỏ to gây sợ.
- Sai: DỪNG 2 giây, [trực quan hóa đúng dạng bài: cột dọc / sơ đồ đoạn thẳng / lưới ô / trục số]; chỉ rõ bước hoặc chữ số hoặc từ cần sửa; không để hiệu ứng che lời giải.
- Câu sai xếp vào CUỐI vòng chơi để luyện lại trong cùng phiên.
- Màn tổng kết nhóm theo loiViet: "Em hay sai ở: [...]" kèm số câu đúng/sai theo mức độ, không chỉ báo điểm.
- Tổng kết trình bày thành ba thẻ chữ to đọc xong trong 5 giây: "Làm tốt: ..." (tối đa 2 kỹ năng đúng nhiều nhất), "Cần luyện: ..." (loiViet của nhóm lỗi nhiều nhất), "Động tác lần sau: ..." (một câu nhắc tư thế/cử chỉ). Không so sánh điểm với bạn khác.
- Thước đo vận động: đếm số động tác hợp lệ và thời lượng chơi, hiển thị một thẻ "Em đã vận động N động tác trong M phút" ở màn tổng kết; con số này không phải điểm số và không so sánh với bạn nào.
- Hồ sơ tiến bộ xuyên phiên: lưu vào localStorage key "miti-mastery" một bản ghi nhỏ theo từng cụm kiến thức — số lần gặp, số lần đúng, errorTag sai nhiều nhất, số lần đúng liên tiếp và ngày chơi gần nhất; KHÔNG lưu ảnh, video hay dữ liệu cá nhân. Khi mở game đọc hồ sơ trước rồi xếp câu theo ưu tiên (errorTag sai nhiều nhất lên trước, câu đúng 3 lần liên tiếp giãn ra); tổng kết so với lần chơi trước bằng một câu. Mất hồ sơ thì game vẫn chạy trọn vẹn.
- Game Tiếng Anh theo nguyên tắc nghe-trước: phát audio trước khi hiện chữ, có nút phát lại, sai thì phát lại chậm 0.8x và chỉ hiện chữ sau khi đã chốt đáp án, từ nghe sai được xếp lại ở lượt sau.

7. GIAO DIỆN VÀ AN TOÀN
- Bố cục: Bắt đầu → Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → KHỞI ĐỘNG 60–90 giây → 10 giây "Em còn nhớ không?" → 12 lượt chính → Phản hồi → Ôn câu sai → HẠ NHIỆT 45–60 giây → Kết quả → Chơi lại.
- Vùng chơi lớn, chữ to (đề bài >= 28px desktop, >= 20px điện thoại), responsive cả dọc và ngang.
- Tương phản chữ trên nền thật: chữ so với nền ngay sau lưng nó >= 4.5:1 (chữ lớn >= 24px thì >= 3:1); mỗi thẻ và đề bài tự có nền gradient tối + viền stroke >= 2px + bóng đổ, không trông chờ vào lớp phủ rgba(8,5,20,0.4). Không chữ nghiêng mảnh, không chữ chỉ có viền, không gradient nhiều màu trong một dòng. Tự kiểm: tắt lớp phủ đi thì chữ vẫn đọc được trên khung hình đang sáng.
- Có Pause, Replay, Tắt camera, Giảm hiệu ứng chuyển động và nút "Chỉnh lại tư thế". Không leaderboard, không quảng cáo.
- Trần nhấp nháy an toàn: không hiệu ứng nào bật–tắt quá 3 lần mỗi giây, không giật sáng phủ toàn màn hình, tổng diện tích vùng đang nhấp nháy <= 25% khung hình. "Flash khi mất máu" là viền mép đỏ mờ dần 200–300 ms; viền HUD theo combo đổi độ sáng MƯỢT chứ không bật tắt; particle và vệt neon không chớp theo nhịp.
- Tự đọc cài đặt của máy: lúc khởi động chạy matchMedia("(prefers-reduced-motion: reduce)") và matchMedia("(prefers-contrast: more)"); nếu reduce thì BẬT SẴN chế độ Giảm hiệu ứng (tắt particle và speed lines, bỏ giật màn hình, hit-stop hạ còn ~30 ms, mascot chỉ đổi biểu cảm) nhưng GIỮ NGUYÊN 100% nội dung học, số lượt, điểm và lời giải. Không bắt học sinh tự tìm nút; lựa chọn lưu localStorage và không hỏi lại lần sau.
- Màu không bao giờ là kênh duy nhất: mọi trạng thái (đúng, sai, đang chọn, bị khóa, hết giờ) phân biệt được bằng ÍT NHẤT HAI kênh ngoài màu — biểu tượng ✓ và ✗, một chữ tiếng Việt ngắn, hình dạng khác nhau, độ đậm viền và âm thanh khác nhau. Không dựa vào cặp đỏ–xanh lá (khoảng 8% học sinh nam mù màu đỏ–lục); đã dùng màu thì hai màu phải khác hẳn độ sáng.
- Phụ đề cho mọi âm thanh: nút "Hiện chữ" bật được NGAY TỪ ĐẦU chứ không chờ trả lời sai mới hiện (nguyên tắc nghe-trước vẫn giữ); lời giải, lời khen, thông báo lỗi và chữ mascot nói đều có dạng chữ; âm báo combo/mất máu/thắng màn kèm biểu tượng nhìn thấy được. Học sinh nghe kém hay lớp ồn vẫn đạt 100% mục tiêu học tập.
- Tay thuận của học sinh: màn calibration hỏi một chạm "Em thuận tay nào?" (Trái / Phải / Cả hai, mặc định Phải) rồi gán tay điều khiển theo đó — landmark đổi vai trò trái/phải, hướng dẫn bằng hình VÀ chữ được gương lại đúng bên, vùng đích ưu tiên phía tay thuận, mốc biên độ 50% tầm với đo theo chính tay đó. Đổi giữa chừng qua nút "Chỉnh lại tư thế", không mất điểm và lượt.
- Tự động Tạm dừng khi tab bị ẩn hoặc cửa sổ mất tiêu điểm (document.visibilitychange, window.blur): dừng vòng nhận diện, giữ nguyên điểm và lượt; khi quay lại đếm 3-2-1 rồi mới nhận diện và reset cooldown + bộ làm mượt.
- Ngân sách hiệu năng: mục tiêu 30 FPS; nhận diện chạy 1 lần mỗi 2–3 khung hình, render riêng theo requestAnimationFrame; particle dùng pool tái dùng, không cấp phát trong vòng vẽ, <= 60 hạt; FPS dưới 28 trong 2 giây thì tự giảm chi tiết chứ không giảm nội dung học; canvas theo devicePixelRatio nhưng cap ở 2.
- Âm thanh tổng hợp bằng Web Audio API (resume sau cú bấm đầu tiên), không dùng Tone.js, không dùng file mp3.
- Combo nhìn thấy + nghe thấy: chuỗi đúng hiện "x2, x3, x4…" to dần kèm vệt neon nối từ tay học sinh tới vật vừa trúng; cao độ âm thanh đúng nhảy bậc thang theo combo (tối đa x5), đứt chuỗi thì âm rơi xuống một cung và số combo tan thành hạt.
- FX arcade hòa vào nền AR: particle màu nổ theo khối, vệt kiếm neon mọc từ cổ tay thật, kính vỡ mạng nhện lan từ điểm va chạm khi hụt, viền HUD sáng DẦN theo combo (đổi độ sáng mượt, không bật tắt) — tất cả vẽ trên canvas trong suốt phủ đúng khung hình camera, tôn trọng trần alpha 0.45, trần nhấp nháy an toàn ở mục 7 và ngân sách particle.
- Sự kiện ngẫu nhiên: mỗi vòng có đúng 2 thẻ vàng "nhân đôi điểm trong 5 giây" và 1 "câu thử thách" phát ra từ z xa với âm báo riêng, biến mất sau 3 giây nếu không kịp với; tỉ lệ 60/40 và ngân hàng dữ liệu không đổi.
- Nhân vật phản ứng: mascot của game đứng ở một góc khung hình (không che người chơi), nghiêng người theo hướng với tay, giơ tay ăn mừng khi combo >= 3 và che mắt khi hụt; mất landmark thì mascot đưa tay chỉ về phía camera để nhắc chỉnh tư thế.
- Khoảnh khắc ba giây đầu: ngay khi vào gameplay (chưa vào lượt 1), chơi một cú "ồ" bằng một vật thể AR cỡ lớn bay ngang sát phía trước người chơi kèm vệt neon và tiếng "vút", mascot chào bằng đúng một dòng nhiệm vụ của lượt sắp tới, chữ nhiệm vụ >= 44px. Không mở màn bằng màn chữ dài hay bảng hướng dẫn. Bản không camera dùng vệt sáng trên nền tối; bản Giảm hiệu ứng trượt tới chậm, không rung màn hình.
- Nghi thức mở thưởng: cuối mỗi hiệp có 2,5 giây mở phong bao — ba nhịp quay qua đúng ba phương án (thẻ bộ sưu tập / +10 điểm / quyền chọn câu dễ hơn một bậc) rồi dừng lại một phương án kèm tiếng "tách". Phần thưởng luôn có, không bao giờ "trắng", và KHÔNG đổi level thích ứng đang chạy. Giảm hiệu ứng và bản không camera mở ngay bằng chữ + nút "Nhận".
- Chế độ hai học sinh (nút bật/tắt, mặc định một người): HandLandmarker chạy maxNumHands: 2, chia khung hình thành hai nửa theo trục dọc và đánh dấu nửa của từng em bằng viền màu. Mỗi bàn tay chỉ chốt được đáp án trong nửa của mình — gán theo vai nếu có PoseLandmarker, không có pose thì theo tay trái/tay phải; điểm, tim và chuỗi của hai em tách riêng, không cộng gộp. Mỗi em có lượt riêng, không xếp hạng, không trừ điểm vì chậm hơn bạn.
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ, lưu localStorage key "miti-collection", có màn "Sưu tập của em".
- Chỗ trống gọi tên: màn "Sưu tập của em" vẽ lưới 6 ô cho mỗi bộ chủ đề, ô chưa mở hiện khung nét đứt và dấu "? ? ?" (không để đoán hình), kèm đúng một dòng "Bộ <chủ đề> còn thiếu <k> thẻ — thắng hiệp 3 ở các game cùng chủ đề để đủ bộ". <k> tính từ "miti-collection" của chính máy này, không so bộ sưu tập giữa các em.
- Ngồi tại chỗ vẫn chơi được; không động tác nguy hiểm; không rời khỏi vùng camera.
- Nhắc uống nước: khi phiên chơi từ 6 phút hoặc đây là phiên thứ hai liên tiếp trong cùng thẻ học, màn tổng kết hiện đúng MỘT dòng "Mình uống vài ngụm nước rồi hãy chơi tiếp nhé" — không pop-up giữa vòng chơi, không lặp lại khi bấm Chơi tiếp, không chặn nút nào.
- Trước khi chơi nhắc một dòng: "Dọn vật cản khỏi vùng đứng, giữ cách tường một bước, chỉ chuyển động trong tầm tay". Khung hình tối hoặc ngược sáng thì gợi ý "Bật đèn lên hoặc quay lưng về phía cửa sổ để camera nhìn rõ em hơn" rồi vẫn cho chơi tiếp.
- KHÔNG upload ảnh/video từ camera; chỉ dùng landmark trong bộ nhớ; không thu thập dữ liệu cá nhân.
- Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi, lời giải thích bằng TIẾNG VIỆT (chỉ học liệu tiếng Anh giữ nguyên tiếng Anh). Không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trên giao diện học sinh.

8. MiTi — CHỮ KÝ BẮT BUỘC TRONG HTML
- Ô bo góc màu #FFD84D chứa chữ M màu #07111F + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS, không hotlink ảnh ngoài.
- Xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; nhỏ, không che vùng tương tác.
- Chân trang hoặc màn kết quả có dòng: MiTi • Học bằng chuyển động.
- Không xóa hoặc đổi tên thương hiệu khi replay, khi vào gameplay hoặc ở chế độ không camera.

9. NGHIỆM THU
- Bảng kiểm MiTi (tự nghiệm thu trong game): mở bằng 7 lần bấm vào logo MiTi hoặc Ctrl+Alt+K, liệt kê TỪNG ràng buộc kèm ĐẠT / CHƯA ĐẠT, trạng thái do code kiểm thật lúc chạy chứ không phải chữ kê sẵn; bảng ở màn tổng kết và màn Bắt đầu, chỉ người lớn mở, không ảnh hưởng điểm và lượt.
- Mục máy tự kiểm (29 mục, mỗi mục một hàm trả true/false): QUESTION_DATA + `verifyQuestionBank()` đã chạy · `answer` có trong `choices` đúng một lần · 📷 `drawImage` webcam đi qua `toScreen(lx, ly)` · 📷 alpha lớp phủ <= 0.45 · 📷 có vật neo landmark cập nhật mỗi khung hình · 📷 giữ tư thế 2 giây không spam cú chốt · tab ẩn tự Pause + đếm 3-2-1 · 3 hiệp + trạm nghỉ 5 giây · `prefers-reduced-motion` có hiệu lực · bộ đếm flash <= 3 lần/giây · tương phản tính từ màu thật >= 4.5:1 và 3:1 · 📷 tay thuận áp dụng vào tay điều khiển · localStorage "miti-collection" + "miti-mastery" · 2 đúng lên level và câu sai thứ 4 về level 1 · không tải URL bị cấm · chữ ký MiTi ở ba màn · khởi động 60–90 giây đã chạy trước hiệp 1 và hạ nhiệt 45–60 giây đã chạy trước màn tổng kết · nhịp thẻ 3,0–4,5 giây vào / ở lại <= 8 giây và phiên đạt >= 12 nhịp chuyển động mỗi phút · 📷 đồng hồ thời gian vận động >= 60% thời lượng phiên · lịch ôn +1/+3/+7 ngày ghi và đọc lại được từ "miti-review" · >= 3/12 lượt xen cụm khác và >= 1 lượt ôn đến hạn · 10 giây "Em còn nhớ không?" chạy trước lượt 1 và sai ở đó không trừ tim · khiên chuỗi trong "miti-tokens" giữ được sang phiên sau (tối đa 2) và khi vỡ vẫn trừ tim, vẫn hiện lời giải · màn tổng kết in đúng một dòng "Lần sau em quay lại sẽ có <n> câu đang chờ" đếm từ "miti-review" · tỉ lệ `dang: "nhin"` >= 60% và mọi mục `dang: "tinh"` chỉ một dấu phép tính, đề <= 16 từ · điểm một lượt tách +6 động tác / +3 đáp án, hiệu ứng nổ tại điểm chạm trước khi biết đúng sai, không thẻ câu hỏi nào có đồng hồ đếm ngược.
- 📷 = 6 mục chỉ kiểm được khi có camera; bản không camera bỏ 6 mục đó và vẫn phải đạt 23 mục còn lại.
- Nút "Xuất bản văn" sinh khối chữ tiếng Việt copy được (tên game, bản chuẩn, ngày giờ, kiểu điều khiển, số ĐẠT/CHƯA ĐẠT, lý do từng mục chưa đạt) — chỉ hiện trên màn hình và vào clipboard, không gửi lên máy chủ nào.
- Mỗi dòng CHƯA ĐẠT kèm một câu nguyên nhân kỹ thuật cho người lớn và một câu nên sửa thế nào trong prompt; cấm báo "lỗi" rồi im lặng.
- Bảng 20 việc người thử phải bấm tay (khoảng 15 phút, theo đúng thứ tự) in sẵn ở `prompts/CHECKLIST_NGHIEP_THU.md`.
- Thiếu mục nào thì dán lại nguyên văn quy định đó vào prompt rồi sinh lại file — **không** sửa tay file HTML.

10. ĐẦU RA
- Chỉ xuất toàn bộ file HTML hoàn chỉnh, không kèm giải thích dài.
- Không TODO, không pseudocode, không "...", không "// code tương tự ở trên", không phần "bạn tự bổ sung".
- Tự kiểm tra trước khi xuất: camera xin sau nút Bắt đầu · có loading/error/định vị · 640×480 và lật gương · nền AR là khung hình camera với lớp phủ tối không vượt 0.45 · mọi tọa độ đi qua toScreen, không còn phép nhân thô với W/H · vật thể có z và bóng dưới chân · có ít nhất một vật ảo neo vào landmark cơ thể · gesture fire theo lượt chuyển + cooldown + confidence · không tính hover là đã chọn · calibration đo tầm tay và đặt ngưỡng theo đơn vị vừa đo · động tác to (>= 50% tầm với), vùng đích sát mép khung, xen kẽ trái/phải, trạm nghỉ 5 giây giữa hiệp, đếm động tác ở tổng kết · khởi động 60–90 giây trước hiệp 1, >= 12 nhịp chuyển động mỗi phút, đồng hồ vận động >= 60% thời lượng phiên, hạ nhiệt 45–60 giây, nhắc nước một lần, trần tải trọng (cấm nhảy tiếp đất, xoay nhanh > 90 độ, tay trên cao > 15 giây) · hit-stop 70–90 ms + giật màn hình, combo có vệt neon và cao độ tăng, chữ khen bật tại điểm chạm, thẻ vàng x2 ngẫu nhiên, mascot phản ứng theo động tác · HUD không đè lên thân học sinh · chọn cơ chế theo mức camera đang thấy · hồ sơ "miti-mastery" xếp câu theo lỗi yếu nhất · có chế độ 2 người chơi maxNumHands: 2 · nhấp nháy <= 3 lần/giây và không phủ toàn màn hình · tự đọc prefers-reduced-motion rồi bật sẵn Giảm hiệu ứng · đúng/sai phân biệt bằng >= 2 kênh ngoài màu · mọi âm thanh có bản chữ · tương phản chữ >= 4.5:1 · có chọn tay thuận lúc calibration · tab ẩn là tự Pause, quay lại đếm 3-2-1 · nhận diện 1 lần mỗi 2–3 khung hình, particle có pool, tự giảm chi tiết khi FPS tụt · tổng kết ba thẻ "Làm tốt / Cần luyện / Động tác lần sau" · nhớ bài có lịch: ôn +1/+3/+7 ngày trong "miti-review", >= 3/12 lượt xen cụm khác, 10 giây "Em còn nhớ không?" trước lượt 1, "Vì sao đúng?" ở 4/12 lượt, quên không phạt, tờ rời copy được cho giáo viên · thi đua + cao trào: cú "ồ" 3 giây đầu, "miti-best" + sự kiện PHÁ KỶ LỤC, vệt ghost của chính em (alpha <= 0.35), hiệp 3 "HIỆP QUYẾT ĐỊNH" nhân đôi điểm, nghi thức mở thưởng 2,5 giây cuối hiệp, đích chung "Cả nhóm <x>/<mốc>", không xếp hạng bạn · nhẹ đầu: một lượt MỘT thao tác tư duy (đề `tinh` <= 1 dấu phép tính), >= 60% mục `dang: "nhin"`, đề <= 16 từ và đọc to bằng speechSynthesis, +6 động tác / +3 đáp án với FX nổ tại điểm chạm, không đồng hồ đếm ngược trên câu hỏi, trạm nghỉ 5 giây là mini-trạm chơi · ham quay lại: dòng "Còn 1 câu nữa tới mốc <m>" (10/20/30), khiên chuỗi trong "miti-tokens" (tối đa 2, vẫn trừ tim, vẫn hiện lời giải), "Chương tiếp theo" + nút "Xem trước" 6 giây, hẹn "Lần sau sẽ có <n> câu đang chờ" từ "miti-review", lưới 6 ô "? ? ?" cho bộ còn thiếu, nghi thức lưu phiên 3 giây "Đã lưu: ..." · bảng kiểm ẩn mở bằng 7 lần chạm logo, 29 mục máy tự kiểm bằng hàm true/false + 20 việc người thử, có nút xuất bản văn copy được · [cơ chế chính] hoạt động đúng · fallback chuột/chạm chơi trọn vẹn · QUESTION_DATA đủ số mục, mỗi mục có answer + explanation + loiViet · câu sai vào hàng đợi luyện lại · tổng kết theo nhóm lỗi · bộ sưu tập lưu localStorage · chữ ký MiTi ở ba màn · file chạy độc lập không lỗi console.
```

## Checklist trước khi nộp game mới

- [ ] Điều khiển là một trong 14 mã (10 mã catalog + `CLAP · PINCH · HOLD_POSE · FINGER_COUNT`), **không có `MIXED`**.
- [ ] Hợp đồng AR đã điền đủ: cover-fit + `toScreen(lx, ly)` + lớp phủ alpha ≤ 0.45 + chiều sâu z từ 1.6 + ít nhất một vật neo vào landmark.
- [ ] Phần vận động đã điền đủ: biên độ >= 50% tầm với, vùng đích sát mép khung, xen kẽ nhóm cơ, 3 hiệp + trạm nghỉ, thẻ đếm động tác.
- [ ] Phần arcade đã điền đủ: hit-stop, combo có cao độ tăng, chữ khen tại điểm chạm, thẻ vàng x2, mascot phản ứng.
- [ ] Phần thể dục có cấu trúc đã điền đủ: khởi động 60–90 giây trước hiệp 1, nhịp thẻ 3,0–4,5 giây vào / ở lại <= 8 giây, >= 12 nhịp chuyển động mỗi phút, đồng hồ vận động >= 60% thời lượng phiên, hạ nhiệt 45–60 giây, nhắc nước một dòng, trần tải trọng (cấm nhảy tiếp đất / xoay nhanh > 90 độ / tay trên cao > 15 giây / cúi thấp quá 3/12 lượt).
- [ ] Phần lớp học đã điền đủ: vùng an toàn cho chữ (lưới 3×3), đàm phán theo mức camera đang thấy, hồ sơ "miti-mastery", chế độ hai học sinh `maxNumHands: 2`.
- [ ] Phần tiếp cận đã điền đủ: trần nhấp nháy 3 lần/giây, tự đọc `prefers-reduced-motion`, đúng/sai có >= 2 kênh ngoài màu, phụ đề cho mọi âm thanh, tương phản >= 4.5:1, câu hỏi tay thuận.
- [ ] Phần nhẹ đầu đã điền đủ: một lượt MỘT thao tác tư duy (đề `tinh` có <= 1 dấu phép tính), >= 60% mục là `dang: "nhin"` nhìn–chỉ–chọn, đề <= 16 từ và được đọc to bằng `speechSynthesis`, điểm một lượt tách +6 động tác / +3 đáp án với hiệu ứng nổ tại điểm chạm trước khi biết đúng sai, không có đồng hồ đếm ngược trên câu hỏi, trạm nghỉ 5 giây là mini-trạm chơi không hỏi bài.
- [ ] Phần kiểm chứng đề đã điền đủ: `verifyQuestionBank()` chạy lúc nạp và loại mục lỗi, mọi nhiễu sai theo một lỗi thật, số/từ trong phạm vi SGK, đáp án đúng không đoán được bằng mẹo hình thức, level khớp số bước.
- [ ] Phần thích ứng đã điền đủ: 2 đúng lên level / 2 sai xuống level cùng `errorTag`, sàn chống nản 3 câu, level ẩn với học sinh — và **không** còn dòng "tăng độ khó ở lượt 5 và 9" như thang level.
- [ ] Phần nhớ bài đã điền đủ: lịch ôn +1/+3/+7 ngày trong `miti-review`, >= 3/12 lượt xen cụm khác, 10 giây "Em còn nhớ không?" trước lượt 1, "Vì sao đúng?" ở 4/12 lượt, quên không trừ tim, tổng kết "vẫn nhớ / cần ôn lại", nút "Copy tờ rời" cho giáo viên.
- [ ] Phần thi đua + cao trào đã điền đủ: cú "ồ" ba giây đầu, `miti-best` + sự kiện PHÁ KỶ LỤC, vệt ghost của chính em (alpha <= 0.35), hiệp 3 "HIỆP QUYẾT ĐỊNH" (nhân đôi điểm nhưng vẫn 4 lượt), nghi thức mở thưởng 2,5 giây cuối hiệp, đích chung "Cả nhóm: <x>/<mốc>" — **không** xếp hạng bạn.
- [ ] Phần ham quay lại đã điền đủ: dòng "Còn 1 câu nữa tới mốc <m>" (10/20/30 câu đúng), khiên chuỗi để dành trong `miti-tokens` (tối đa 2, vỡ khiên vẫn trừ 1 tim), "Chương tiếp theo" + nút "Xem trước" 6 giây, hẹn "Lần sau em quay lại sẽ có <n> câu đang chờ" từ `miti-review`, lưới 6 ô có chỗ trống "? ? ?", nghi thức lưu phiên 3 giây "Đã lưu: ..." — **không** chuỗi ngày chơi, **không** xin quyền thông báo, nghỉ chơi không bị phạt.
- [ ] Phần nghiệm thu đã điền đủ: bảng kiểm ẩn mở bằng 7 lần chạm logo, trạng thái do code kiểm thật, 29 mục máy tự kiểm, 20 việc người thử, nút xuất bản văn, mỗi mục chưa đạt kèm nguyên nhân + cách sửa prompt.
- [ ] Bối cảnh là AR thật: vật thể sinh trong khung hình camera (có z, có bóng dưới chân, có vật neo vào người), không phải bảng game đặt cạnh video.
- [ ] Mục tiêu học tập cụ thể theo SGK — **cấm** các câu chung chung kiểu "vận dụng kiến thức qua tình huống tương tác".
- [ ] Bối cảnh và cơ chế khớp nhau: bỏ camera đi thì bài học vẫn còn ý nghĩa, nhưng cử chỉ phải đang kiểm tra đúng kỹ năng.
- [ ] Mỗi mục QUESTION_DATA có `errorTag` + `loiViet`; danh sách lỗi ở mục 1 và danh sách nhãn ở mục 3 trùng nhau theo đúng thứ tự.
- [ ] Không còn `[...]`, không còn `${...}`, không còn dấu nháy lạ lọt vào câu.
- [ ] Đã chạy `node tools/build.mjs` và `node tools/validate.mjs` báo đạt.
