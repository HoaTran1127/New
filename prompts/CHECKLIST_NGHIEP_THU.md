# ✅ BẢNG KIỂM NGHIỆM THU GAME MiTi

> **Do `tools/build-acceptance.mjs` sinh ra từ `tools/lib/acceptance.mjs`.** Đừng sửa tay file này — đổi quy định trong lib rồi chạy `node tools/build.mjs`.
>
> Dùng khi: bạn vừa dán một prompt vào **Google Gemini → chế độ Canvas**, nhận về một file HTML, và cần biết nó có thật sự đạt chuẩn MiTi không trước khi cho học sinh chơi.
> Thời lượng: khoảng 15 phút cho một game. In ra giấy hoặc mở trên điện thoại.

## 0. Mở bảng kiểm tự động trong game

Bảng kiểm MiTi (tự nghiệm thu trong game): mọi game có một bảng ẩn mở bằng cách bấm 7 lần vào logo MiTi hoặc tổ hợp Ctrl+Alt+K. Bảng liệt kê TỪNG ràng buộc kèm trạng thái ĐẠT / CHƯA ĐẠT, và trạng thái đó phải do code kiểm thật lúc chạy — không phải một danh sách chữ tĩnh do người viết kê ra. Bảng nằm trong màn tổng kết và màn Bắt đầu, chỉ người lớn mở được, không ảnh hưởng điểm hay lượt chơi.

Xuất bản văn: bảng kiểm có nút "Xuất bản văn" sinh ra một khối chữ tiếng Việt copy được, gồm tên game, bản chuẩn MiTi, ngày giờ, kiểu điều khiển đang chạy, số mục ĐẠT / CHƯA ĐẠT và danh sách cụ thể từng mục chưa đạt kèm lý do. Khối chữ chỉ hiện trên màn hình và vào clipboard máy đó — KHÔNG gửi lên máy chủ nào, không để lại dữ liệu, không xin quyền.

---

## A. 33 mục máy tự kiểm — mở bảng kiểm ở mục 0 và đọc kết quả

Mục máy tự kiểm (33 mục, mỗi mục một hàm trả true/false): (1) QUESTION_DATA đủ số mục yêu cầu và verifyQuestionBank() ĐÃ chạy trước lượt chơi đầu tiên; (2) mọi mục đang phát hành có answer nằm trong choices đúng một lần; (3) drawImage khung hình webcam đi qua toScreen(lx, ly), không còn phép nhân thô với W/H 📷; (4) alpha lớp phủ tối đang dùng <= 0.45 📷; (5) có ít nhất một vật thể neo vào landmark và cập nhật mỗi khung hình 📷; (6) giữ nguyên một tư thế 2 giây không sinh thêm cú chốt nào (cooldown + hysteresis hoạt động) 📷; (7) tab ẩn là tự Pause và khi quay lại có đếm 3-2-1; (8) 12 lượt chia 3 hiệp và giữa hiệp có trạm nghỉ 5 giây; (9) matchMedia prefers-reduced-motion được đọc và có hiệu lực thật; (10) bộ đếm flash đo được không thành phần nào bật–tắt quá 3 lần mỗi giây; (11) tỉ lệ tương phản tính từ màu thật đang dùng >= 4.5:1 cho chữ thường và >= 3:1 cho chữ lớn; (12) lựa chọn tay thuận được áp dụng vào tay điều khiển 📷; (13) localStorage ghi và đọc được cả "miti-collection" lẫn "miti-mastery"; (14) 2 câu đúng liên tiếp làm level tăng và câu sai thứ 4 trong chuỗi bị rơi vào level 1 (thích ứng + sàn chống nản chạy thật); (15) không có URL bị cấm nào được tải — bốn thư viện mà bản chuẩn MiTi loại (xem mục phụ thuộc của prompt) phải không xuất hiện trong Network; (16) chữ ký MiTi có mặt ở cả ba màn Bắt đầu / HUD / Kết quả; (17) khởi động 60–90 giây đã chạy trước hiệp 1 và hạ nhiệt 45–60 giây đã chạy trước màn tổng kết; (18) nhịp thẻ đúng chuẩn: 3,0–4,5 giây bay vào, ở lại <= 8 giây, và phiên đạt >= 12 nhịp chuyển động mỗi phút (đếm theo ngưỡng 15% tầm với, chia số phút chơi thật); (19) đồng hồ thời gian vận động tích lũy đạt >= 60% thời lượng phiên 📷; (20) lịch ôn +1, +3, +7 ngày được ghi vào localStorage "miti-review" và đọc lại được sau khi đóng rồi mở lại tab; (21) phiên có >= 3 lượt thuộc cụm khác cụm chính và >= 1 lượt là câu đến hạn ôn, đếm từ danh sách lượt thật; (22) câu "Em còn nhớ không?" chạy 10 giây trước lượt 1 và trả lời sai ở đó không trừ tim, không cắt chuỗi đúng; (23) HUD có dòng "Kỷ lục: <n> · Em đang: <m>" và sự kiện PHÁ KỶ LỤC chỉ nổ khi điểm thật vượt mốc đã lưu trong "miti-best"; (24) hiệp 3 chạy "HIỆP QUYẾT ĐỊNH" (điểm nhân đôi, thêm 1 thẻ vàng) nhưng vẫn đúng 4 lượt và trạm nghỉ 5 giây; (25) nghi thức mở thưởng cuối mỗi hiệp dài 2,5 giây, luôn có phần thưởng, không đổi level thích ứng và mở ngay khi reduced-motion; (26) "miti-tokens" giữ được khiên chuỗi và quyền chọn câu sang phiên sau (tối đa 2); khiên vỡ khi dùng, chuỗi đúng không bị cắt nhưng vẫn trừ 1 tim, vẫn hiện lời giải và câu đó vẫn vào hàng đợi luyện lại; (27) màn tổng kết in đúng một dòng "Lần sau em quay lại sẽ có <n> câu đang chờ" với n đếm từ "miti-review" (mục đến hạn trong 7 ngày tới, trần 4), không có chuỗi ngày chơi và không dòng nào nhắc em đã nghỉ bao lâu; (28) tỉ lệ mục dang: "nhin" >= 60% và mọi mục dang: "tinh" chỉ mang một dấu phép tính với đề không quá 16 từ (đếm trên QUESTION_DATA đang phát hành); (29) điểm một lượt tách thành +6 cho động tác và +3 cho đáp án, hiệu ứng nổ tại điểm chạm trước khi máy biết đúng sai, và không thẻ câu hỏi nào có đồng hồ đếm ngược; (30) AudioContext chỉ resume SAU cú bấm "Bắt đầu" (không một SFX hay nốt nhạc nào phát trước cú bấm đó), mỗi SFX <= 200 ms, master gain <= 0.25, không quá 4 giọng SFX phát đồng thời (nhạc nền đi bus riêng <= 3 giọng, tổng mọi giọng <= 7), và trạng thái "miti-mute" vẫn đọc được sau khi tải lại trang; (31) pháo giấy nổ đúng bốn loại mốc với 40–60 hạt sinh qua hàm chiếu điểm chạm (không nổ ở câu đúng thường), slow-mo chỉ chạy 600 ms cho thẻ vàng và 1,5 giây cuối hiệp 3, và navigator.vibrate luôn nằm trong if (navigator.vibrate); (32) verifyIdentity() đã chạy lúc nạp: mascot tên riêng <= 2 từ hiện ở >= 5 chỗ, ba biến --miti-1/--miti-2/--miti-3 có thật trong CSS và khớp IDENTITY_DATA, đúng MỘT khoảnh khắc chữ ký dài >= 2 giây chỉ chạy 1 lần/phiên, một đạo cụ neo landmark, ba câu thoại <= 6 từ; (33) verifyMusic() đã chạy lúc nạp: loop nhạc nền tổng hợp bằng Web Audio (không có <audio src> hay fetch() file âm thanh ngoài), BPM nằm trong 100–128, gain bus nhạc <= 0.18, bus nhạc hạ xuống <= 30% khi speechSynthesis đang đọc, và bản "miti-mute" có vạch nhịp đập theo BPM thay cho tiếng.

Mục có dấu 📷 chỉ áp dụng khi chơi bằng camera; bản không camera bỏ 6 mục đó và vẫn phải đạt 27 mục còn lại.

Check nhanh khi mở bảng kiểm trong game:

- [ ] QUESTION_DATA đủ số mục yêu cầu và verifyQuestionBank() ĐÃ chạy trước lượt chơi đầu tiên
- [ ] mọi mục đang phát hành có answer nằm trong choices đúng một lần
- [ ] drawImage khung hình webcam đi qua toScreen(lx, ly), không còn phép nhân thô với W/H 📷
- [ ] alpha lớp phủ tối đang dùng <= 0.45 📷
- [ ] có ít nhất một vật thể neo vào landmark và cập nhật mỗi khung hình 📷
- [ ] giữ nguyên một tư thế 2 giây không sinh thêm cú chốt nào (cooldown + hysteresis hoạt động) 📷
- [ ] tab ẩn là tự Pause và khi quay lại có đếm 3-2-1
- [ ] 12 lượt chia 3 hiệp và giữa hiệp có trạm nghỉ 5 giây
- [ ] matchMedia prefers-reduced-motion được đọc và có hiệu lực thật
- [ ] bộ đếm flash đo được không thành phần nào bật–tắt quá 3 lần mỗi giây
- [ ] tỉ lệ tương phản tính từ màu thật đang dùng >= 4.5:1 cho chữ thường và >= 3:1 cho chữ lớn
- [ ] lựa chọn tay thuận được áp dụng vào tay điều khiển 📷
- [ ] localStorage ghi và đọc được cả "miti-collection" lẫn "miti-mastery"
- [ ] 2 câu đúng liên tiếp làm level tăng và câu sai thứ 4 trong chuỗi bị rơi vào level 1 (thích ứng + sàn chống nản chạy thật)
- [ ] không có URL bị cấm nào được tải — bốn thư viện mà bản chuẩn MiTi loại (xem mục phụ thuộc của prompt) phải không xuất hiện trong Network
- [ ] chữ ký MiTi có mặt ở cả ba màn Bắt đầu / HUD / Kết quả
- [ ] khởi động 60–90 giây đã chạy trước hiệp 1 và hạ nhiệt 45–60 giây đã chạy trước màn tổng kết
- [ ] nhịp thẻ đúng chuẩn: 3,0–4,5 giây bay vào, ở lại <= 8 giây, và phiên đạt >= 12 nhịp chuyển động mỗi phút (đếm theo ngưỡng 15% tầm với, chia số phút chơi thật)
- [ ] đồng hồ thời gian vận động tích lũy đạt >= 60% thời lượng phiên 📷
- [ ] lịch ôn +1, +3, +7 ngày được ghi vào localStorage "miti-review" và đọc lại được sau khi đóng rồi mở lại tab
- [ ] phiên có >= 3 lượt thuộc cụm khác cụm chính và >= 1 lượt là câu đến hạn ôn, đếm từ danh sách lượt thật
- [ ] câu "Em còn nhớ không?" chạy 10 giây trước lượt 1 và trả lời sai ở đó không trừ tim, không cắt chuỗi đúng
- [ ] HUD có dòng "Kỷ lục: <n> · Em đang: <m>" và sự kiện PHÁ KỶ LỤC chỉ nổ khi điểm thật vượt mốc đã lưu trong "miti-best"
- [ ] hiệp 3 chạy "HIỆP QUYẾT ĐỊNH" (điểm nhân đôi, thêm 1 thẻ vàng) nhưng vẫn đúng 4 lượt và trạm nghỉ 5 giây
- [ ] nghi thức mở thưởng cuối mỗi hiệp dài 2,5 giây, luôn có phần thưởng, không đổi level thích ứng và mở ngay khi reduced-motion
- [ ] "miti-tokens" giữ được khiên chuỗi và quyền chọn câu sang phiên sau (tối đa 2); khiên vỡ khi dùng, chuỗi đúng không bị cắt nhưng vẫn trừ 1 tim, vẫn hiện lời giải và câu đó vẫn vào hàng đợi luyện lại
- [ ] màn tổng kết in đúng một dòng "Lần sau em quay lại sẽ có <n> câu đang chờ" với n đếm từ "miti-review" (mục đến hạn trong 7 ngày tới, trần 4), không có chuỗi ngày chơi và không dòng nào nhắc em đã nghỉ bao lâu
- [ ] tỉ lệ mục dang: "nhin" >= 60% và mọi mục dang: "tinh" chỉ mang một dấu phép tính với đề không quá 16 từ (đếm trên QUESTION_DATA đang phát hành)
- [ ] điểm một lượt tách thành +6 cho động tác và +3 cho đáp án, hiệu ứng nổ tại điểm chạm trước khi máy biết đúng sai, và không thẻ câu hỏi nào có đồng hồ đếm ngược
- [ ] AudioContext chỉ resume SAU cú bấm "Bắt đầu" (không một SFX hay nốt nhạc nào phát trước cú bấm đó), mỗi SFX <= 200 ms, master gain <= 0.25, không quá 4 giọng SFX phát đồng thời (nhạc nền đi bus riêng <= 3 giọng, tổng mọi giọng <= 7), và trạng thái "miti-mute" vẫn đọc được sau khi tải lại trang
- [ ] pháo giấy nổ đúng bốn loại mốc với 40–60 hạt sinh qua hàm chiếu điểm chạm (không nổ ở câu đúng thường), slow-mo chỉ chạy 600 ms cho thẻ vàng và 1,5 giây cuối hiệp 3, và navigator.vibrate luôn nằm trong if (navigator.vibrate)
- [ ] verifyIdentity() đã chạy lúc nạp: mascot tên riêng <= 2 từ hiện ở >= 5 chỗ, ba biến --miti-1/--miti-2/--miti-3 có thật trong CSS và khớp IDENTITY_DATA, đúng MỘT khoảnh khắc chữ ký dài >= 2 giây chỉ chạy 1 lần/phiên, một đạo cụ neo landmark, ba câu thoại <= 6 từ
- [ ] verifyMusic() đã chạy lúc nạp: loop nhạc nền tổng hợp bằng Web Audio (không có <audio src> hay fetch() file âm thanh ngoài), BPM nằm trong 100–128, gain bus nhạc <= 0.18, bus nhạc hạ xuống <= 30% khi speechSynthesis đang đọc, và bản "miti-mute" có vạch nhịp đập theo BPM thay cho tiếng

>Trạng thái ĐẠT / CHƯA ĐẠT phải do code kiểm lúc chạy. Nếu bảng chỉ là chữ tĩnh kê sẵn thì coi như **toàn bộ mục này CHƯA ĐẠT** — đó là lỗi nghiêm trọng nhất của một game giáo dục: nó trông như đã kiểm nhưng không kiểm gì.

---

## B. 24 việc người thử phải bấm tay — làm theo đúng thứ tự

Bảng kiểm người thử (24 việc máy không tự kiểm được, làm theo đúng thứ tự, khoảng 15 phút): (1) đứng xa camera tới mức chỉ còn thấy hai bàn tay — game có hạ cơ chế xuống mức "chỉ thấy tay" hay đứng màn chờ?; (2) giữ im một tư thế 5 giây — có bị spam cú chốt hay trừ tim không?; (3) lấy tay che nửa người trước camera — vật neo có biến mất kèm hướng dẫn tiếng Việt thay vì nhảy lung tung?; (4) tắt camera giữa vòng chơi — game có vào tiếp chế độ không camera mà không mất điểm và lượt?; (5) rút mạng lúc đang tải model — có thông báo tiếng Việt và chơi được tiếp?; (6) đổi tay thuận sang Trái giữa chừng bằng nút "Chỉnh lại tư thế" — hướng dẫn có gương lại đúng bên?; (7) bật sẵn reduced-motion trong hệ điều hành rồi mở game — hiệu ứng có tắt sẵn và nội dung học vẫn nguyên?; (8) cố tình sai 4 câu liên tiếp — câu thứ 4 có về level 1 kèm lời giải từng bước và không trừ tim lần hai?; (9) mở bằng điện thoại đặt dọc — đề bài còn >= 20px và hai tay còn trong khung hình?; (10) đưa cho một học sinh lớp 4 chưa đọc hướng dẫn chơi thử 60 giây — em có tự hiểu phải làm gì không?; (11) chơi trọn một phiên rồi đứng lại 30 giây — em có thở nhanh hơn và người ấm lên rõ rệt không (bài test thể dục, không phải test code)?; (12) làm động tác cúi thấp ở lượt cuối rồi đứng thẳng lên nhanh — có choáng váng hay mất thăng bằng không (kiểm trần tải trọng và bước hạ nhiệt)?; (13) chơi hai phiên cách nhau một ngày — phiên sau có mở bằng đúng câu em làm hôm trước và xếp câu đến hạn ôn lên trước câu mới không?; (14) cố tình trả lời sai một câu từng đúng hai lần ở phiên hôm sau — game có giữ lời "quên thì không phạt" (không trừ tim, không cắt chuỗi) hay vẫn phạt em?; (15) vừa bấm BẮT ĐẦU được 3 giây — em có cảm giác đây là game thật (một cú "ồ") hay chỉ là màn chữ?; (16) chơi hai phiên liên tiếp — phiên sau có hiện đúng "Kỷ lục: <n>" của phiên trước và vệt ghost chạy theo đúng lượt tốt nhất không?; (17) chơi đến hiệp 3 — em có nhận ra hiệp này căng hơn thật (điểm nhân đôi, thẻ vàng thêm) mà câu hỏi không khó hơn không?; (18) để dành tới phiên sau rồi chơi tiếp — khiên chuỗi có còn trong "miti-tokens" và có dùng được thật không (làm sai một câu: chuỗi giữ mà tim vẫn giảm, lời giải vẫn hiện)?; (19) đọc dòng "Chương tiếp theo" và bấm "Xem trước" ở màn tổng kết — em có hỏi khi nào được chơi chương đó, hay dòng chữ bị đọc như quảng cáo?; (20) chơi liền 5 lượt đầu — em có phải nhíu mắt tính nhẩm không hay đang nhìn–chỉ–chọn rồi với tay? Nghe đề một lần có hiểu phải làm gì không?; (21) chơi tới 4 giây "Cả lớp: 3 – 2 – 1 – CHỐT!" trước hiệp 3 — bốn em đứng cạnh máy có thật sự hô theo và cùng làm một động tác mở màn, hay dòng chữ bị đọc lướt như một màn đếm mẫu?; (22) bật tiếng đầy đủ rồi mở game cho bốn em cùng chơi — SFX có ngắn và dễ chịu hay một tiếng "ting" lặp lại thành chói tai? Bấm "Tắt tiếng" rồi chơi trọn một hiệp: mọi phản hồi (đúng/sai/mốc) còn đọc được bằng chữ và hình không?; (23) chơi hai game cùng chủ đề liên tiếp rồi gập máy lại — em có gọi ra được tên mascot, màu và khoảnh khắc chữ ký của TỪNG game, hay với em vẫn là một game mặc hai bộ áo?; (24) nghe trọn một hiệp — nhạc có giữ nhịp cho em vận động theo (mỗi cú chốt rơi vào một phách mạnh) hay chỉ là tiếng nền vô định? Bấm "Tắt tiếng" rồi chơi tiếp: nhịp chuyển động có rớt dưới 12 lần mỗi phút không?. Ghi lại kết quả từng việc vào bảng kiểm trước khi nộp game.

1. đứng xa camera tới mức chỉ còn thấy hai bàn tay — game có hạ cơ chế xuống mức "chỉ thấy tay" hay đứng màn chờ?
2. giữ im một tư thế 5 giây — có bị spam cú chốt hay trừ tim không?
3. lấy tay che nửa người trước camera — vật neo có biến mất kèm hướng dẫn tiếng Việt thay vì nhảy lung tung?
4. tắt camera giữa vòng chơi — game có vào tiếp chế độ không camera mà không mất điểm và lượt?
5. rút mạng lúc đang tải model — có thông báo tiếng Việt và chơi được tiếp?
6. đổi tay thuận sang Trái giữa chừng bằng nút "Chỉnh lại tư thế" — hướng dẫn có gương lại đúng bên?
7. bật sẵn reduced-motion trong hệ điều hành rồi mở game — hiệu ứng có tắt sẵn và nội dung học vẫn nguyên?
8. cố tình sai 4 câu liên tiếp — câu thứ 4 có về level 1 kèm lời giải từng bước và không trừ tim lần hai?
9. mở bằng điện thoại đặt dọc — đề bài còn >= 20px và hai tay còn trong khung hình?
10. đưa cho một học sinh lớp 4 chưa đọc hướng dẫn chơi thử 60 giây — em có tự hiểu phải làm gì không?
11. chơi trọn một phiên rồi đứng lại 30 giây — em có thở nhanh hơn và người ấm lên rõ rệt không (bài test thể dục, không phải test code)?
12. làm động tác cúi thấp ở lượt cuối rồi đứng thẳng lên nhanh — có choáng váng hay mất thăng bằng không (kiểm trần tải trọng và bước hạ nhiệt)?
13. chơi hai phiên cách nhau một ngày — phiên sau có mở bằng đúng câu em làm hôm trước và xếp câu đến hạn ôn lên trước câu mới không?
14. cố tình trả lời sai một câu từng đúng hai lần ở phiên hôm sau — game có giữ lời "quên thì không phạt" (không trừ tim, không cắt chuỗi) hay vẫn phạt em?
15. vừa bấm BẮT ĐẦU được 3 giây — em có cảm giác đây là game thật (một cú "ồ") hay chỉ là màn chữ?
16. chơi hai phiên liên tiếp — phiên sau có hiện đúng "Kỷ lục: <n>" của phiên trước và vệt ghost chạy theo đúng lượt tốt nhất không?
17. chơi đến hiệp 3 — em có nhận ra hiệp này căng hơn thật (điểm nhân đôi, thẻ vàng thêm) mà câu hỏi không khó hơn không?
18. để dành tới phiên sau rồi chơi tiếp — khiên chuỗi có còn trong "miti-tokens" và có dùng được thật không (làm sai một câu: chuỗi giữ mà tim vẫn giảm, lời giải vẫn hiện)?
19. đọc dòng "Chương tiếp theo" và bấm "Xem trước" ở màn tổng kết — em có hỏi khi nào được chơi chương đó, hay dòng chữ bị đọc như quảng cáo?
20. chơi liền 5 lượt đầu — em có phải nhíu mắt tính nhẩm không hay đang nhìn–chỉ–chọn rồi với tay? Nghe đề một lần có hiểu phải làm gì không?
21. chơi tới 4 giây "Cả lớp: 3 – 2 – 1 – CHỐT!" trước hiệp 3 — bốn em đứng cạnh máy có thật sự hô theo và cùng làm một động tác mở màn, hay dòng chữ bị đọc lướt như một màn đếm mẫu?
22. bật tiếng đầy đủ rồi mở game cho bốn em cùng chơi — SFX có ngắn và dễ chịu hay một tiếng "ting" lặp lại thành chói tai? Bấm "Tắt tiếng" rồi chơi trọn một hiệp: mọi phản hồi (đúng/sai/mốc) còn đọc được bằng chữ và hình không?
23. chơi hai game cùng chủ đề liên tiếp rồi gập máy lại — em có gọi ra được tên mascot, màu và khoảnh khắc chữ ký của TỪNG game, hay với em vẫn là một game mặc hai bộ áo?
24. nghe trọn một hiệp — nhạc có giữ nhịp cho em vận động theo (mỗi cú chốt rơi vào một phách mạnh) hay chỉ là tiếng nền vô định? Bấm "Tắt tiếng" rồi chơi tiếp: nhịp chuyển động có rớt dưới 12 lần mỗi phút không?

---

## C. Khi có dòng CHƯA ĐẠT

Mục CHƯA ĐẠT phải giải thích được: mỗi dòng chưa đạt kèm một câu nguyên nhân kỹ thuật ngắn cho người lớn (ví dụ "toScreen không được dùng ở drawImage — vật thể đang tính bằng lx * W") và một câu nên sửa thế nào trong prompt. Cấm để bảng chỉ báo "lỗi" rồi im lặng, cấm đổ lỗi chung chung kiểu "hệ thống có vấn đề". Bảng không trừ tim, không chặn chơi; học sinh không nhìn thấy bảng này.

Câu cần trả lời trước khi nộp game: **thiếu mục nào thì sửa prompt thế nào?** Dán lại nguyên văn quy định tương ứng trong `tools/lib/` vào cuối prompt, rồi sinh lại file — không tay sửa file HTML.

---

## D. Biên bản

| Ô | Điền |
| :-- | :-- |
| Tên game | |
| Mã prompt (ví dụ `L4-01`) | |
| Kiểu điều khiển đã chơi (V1 POINT / V2 SWIPE / V3 DRAG / V4 VOICE / V5 không camera) | |
| Máy dùng để thử (tên hoặc số) | |
| Người nghiệm thu | |
| Ngày giờ | |
| Số mục máy tự kiểm ĐẠT | ____ / 33 |
| Số việc người thử ĐẠT | ____ / 24 |
| Kết luận | ☐ Đưa vào tiết học ☐ Sửa prompt rồi kiểm lại |

**Ghi chú riêng tư:** bảng này chỉ tồn tại trên máy của bạn và trong clipboard. Game không được upload ảnh, video hay kết quả nghiệm thu lên bất kỳ máy chủ nào.

---

*Miti • Học bằng chuyển động — bản chuẩn: `prompts/00-master-canvas-prompt.md` · 85 prompt: `catalogs/GAME_CATALOG.md` · 425 biến thể: `prompts/VARIANTS_425.md`*
