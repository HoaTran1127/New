# Giáo án AR trên bảng phấn — nguồn cộng đồng và bài học sau 22 vòng

Tài liệu này để **người khác tham khảo và nối tiếp**, không phải mô tả tính năng. Phần tính năng nằm ở
[`prompts/giao-an/README.md`](../prompts/giao-an/README.md); ở đây chỉ ghi: cái gì đã đo được, cái gì đã
thay đổi vì số liệu, và nên đọc gì trước khi sửa tiếp.

## Nguyên tắc làm việc đã trả giá mà thành

1. **Đo trước khi thêm quy định.** Mỗi vòng bắt đầu bằng một lệnh `grep` trên đúng 39 file giáo án đã sinh,
   chứ không bắt đầu bằng ý tưởng. Mười lăm vòng gần nhất đều tìm thấy lỗ 0/39 — nghĩa là nếu ngồi nghĩ thì
   sẽ nghĩ ra thứ đã có sẵn.
2. **Đo cả chỗ mình tự mâu thuẫn.** Vòng 9 không đi tìm ý mới: nó đọc lại chính các quy định đã có và thấy
   hai quy định cũ đòi cái không thể cùng có — một webcam vừa phải nhìn bàn tay em đứng trước bảng,
   vừa phải đếm ngón tay 35 em cuối phòng. Lỗi kiểu này `grep` thường không bắt được, vì mỗi từ khoá đều
   *có* trong file. Vòng 10 cũng là một phép chia bị bỏ sót: "12 lượt một tiết", "hàng đợi 4 em" và
   "lớp 35 em" đều nằm sẵn trong cùng một file, chỉ có 12 < 35 là chưa ai đem chia cho ai. Vòng 11 là một
   dạng lỗi thứ ba: một con số **đúng chuẩn** ("sĩ số tiểu học không quá 35") đã bị chép nguyên văn vào 39
   file như thể nó là số đo của lớp thật, và thành ra mọi tỉ lệ trong giáo án đều vô nghĩa ở lớp 45 em.
   Vòng 12 lại là một phía bị bỏ quên của chính quy định mình đã viết: `fullPeriod` (vòng 4) lo tiết cháy
   sang *dài* — báo "quá giờ" chứ không tự cắt — còn chiều ngược lại, lớp xong trước mười phút hoặc bị cắt
   giữa bước SƠ ĐỒ, thì 0/39 file có một kế hoạch nào. Vòng 13 tìm thấy cả hai kiểu cùng lúc: một phía bị bỏ
   quên (chuỗi bảng → phiếu → vở đã đi một chiều, 0/39 "trả bài" và 0/39 "chữa bài", nên phiếu in ra rồi
   không có đường quay lại tay các em) và một mâu thuẫn thật giữa hai thứ cùng nằm trong file: giáo án bắt
   bảng hiện "0,5" cho đúng cách các em viết, nhưng không một dòng nào quy định **chiều đọc vào** — mà
   `parseFloat('0,5')` trả về `0` và `Number('1.234,5')` trả `NaN`, tức là một đáp án đúng sẽ bị công cụ
   báo sai. Lỗi này vô hình với `grep` vì "dấu phẩy" có sẵn trong 4/39 file, chỉ có điều nó nằm ở bài dạy số
   thập phân chứ không nằm ở quy định hiển thị. Vòng 13 còn thử một cách đo mới: đo trên **dữ liệu** chứ
   không trên prompt. `verifyData` (viết từ vòng 2) bắt ngân hàng câu hỏi phủ "ít nhất 3 nhãn lỗi", nhưng
   `node -e` trên 38 cụm cho thấy cụm chẵn-lẻ chỉ khai 2 nhãn — một quy định mà chính giáo án của repo
   không thể tuân theo, và cách duy nhất để "tuân" là bịa nhãn thứ ba. Loại lỗi này không `grep` nào trên
   `prompts/giao-an/` thấy được, vì chuỗi sai nằm ở hai file dữ liệu khác nhau. Vòng 14 quay lại đo trên
   prompt và tìm ba phía chưa ai viết. Thứ nhất, giả định im lặng rằng mọi em đọc thông thạo tiếng Việt:
   0/39 "từ khó", 0/39 "giải nghĩa", 0/39 "ít chữ hơn", 0/39 "chỉ vào hình" — trong khi lớp tiểu học Việt
   Nam có em người dân tộc thiểu số hoặc em mới chuyển đến thành phố, với các em đó một câu Toán đánh sai vì
   chưa quen chữ chứ không vì chưa hiểu số, và tiết đầu thì không cách nào nhận ra em nào. Thứ hai, lượt
   "Bảng con" (viết từ vòng 6) giả định mỗi em đã có một cái bảng: 0/39 "không có bảng con", 0/39 "mặt sau vở",
   0/39 "nắp hộp" — sĩ số 45 em thì phải có 45 bảng + 45 bút, thứ nhiều trường không đủ. Thứ ba, phiếu (họ
   `handout.mjs`) chỉ nói khoảng trắng và một màu đen mà chưa nói in ra to bao nhiêu và mất bao nhiêu tờ:
   0/39 "cỡ chữ", 0/39 "in một mặt" — mà máy in trường thường một mặt và 45 em thì hai trang mỗi em là 90 tờ.
   Cả ba con số ≥ 15 × 20 cm / 8 → 6 → 4 và ≤ 8 chữ là ngưỡng **do dự án chọn**; riêng mức in ≥ 12 pt lấy từ
   một hướng dẫn đọc được thật (Dyslexia Scotland: "at least 12pt") và nguyên tắc "change the language, not
   the math" của Edutopia đứng sau quy định "Ít chữ hơn", cả hai ghi rõ ở phần "Vì sao chọn những con số đang dùng".
   Vòng 15 lại là một mâu thuẫn kiểu vòng 9 nằm ngay trong các quy định cũ: `flow` nhét năm bước vào 15–20 phút
   và `pace` bắt MỌI bước chờ giáo viên bấm, còn `handover`/`classVote`/`predict` bắt cả lớp trả lời bằng ngón
   tay và bảng con — tất cả đều giả định các em **ngồi bất động nhìn bảng 15–20 phút liên tục**. Needle "nghỉ
   giải lao"/"vận động giữa tiết"/"đứng dậy" = 0/39; từ "giải lao" duy nhất có mặt lại nằm trong `latePupil`
   với nghĩa CẤM ("không phải đợi giải lao"). Repo đã cite "gorilla arm" cho mỏi tay ở chalk nhưng chưa bao
   giờ cite chú ý trẻ nhỏ cho việc ngồi yên — nên `movementBreak` được viết để hai quy định cũ không còn vô
   tình đòi điều bất khả thi với trẻ 8–10 tuổi. Vòng 16 lặp lại đúng phép đó trên CHÍNH `movementBreak` vừa
   viết: bắt cả lớp đứng lên và "dùng người làm một phân số" là giả định có chỗ trống trên sàn, mà không quy
   định nào hỏi phòng rộng bao nhiêu — `bigClass` (vòng 11) hỏi sĩ số M, còn diện tích thì 0/39. Đem số liệu
   phòng học Việt Nam ra áp (định mức ~1,5 m²/đầu em, phòng 48 m² ~32 em mới đúng chuẩn) thì một lớp 45 em xếp
   vào 48 m² còn ~1,07 m²/đầu em: quy định của vòng 15 mô tả cái mà căn phòng đó không thể làm. `roomFootprint`
   sinh ra từ chỗ mâu thuẫn tự tạo đó, không phải từ một ý tưởng mới. Vòng 17 không đi tìm ý mới mà đo **tiếp**
hệ quả của vòng 16: `movementBreak` đặt ngưỡng ngồi liền ≤ 12 phút với giả định nhịp nghỉ còn là nhịp toàn
thân, nhưng `roomFootprint` vừa rút nhịp đó ở phòng chật (< 1,2 m²/đầu em) xuống còn vươn tay/xoay cổ — đúng
vào lớp đông và khó giữ trật tự nhất. Hai quy định ghép lại thành một lỗ mà từng quy định riêng không thấy:
chính lớp cần đổi tư thế nhiều nhất lại nhận nhịp yếu nhất mà vẫn chờ đủ 12 phút. Phép đo còn vạch ra một
lỗi hình học trong `roomFootprint`: nó đồng nhất "không có lối đi" với "không đứng được", trong khi một em
đứng thẳng lên rồi ngồi xuống trong chính chỗ ngồi của mình không cần lối đi — chỉ nhịp dang tay, xếp hàng,
dùng người làm phân số mới cần. `tightRoomFocus` sửa cả hai: giữ nhịp đứng-tại-chỗ, và bù cho biên độ nhỏ
bằng cách hạ ngưỡng ngồi xuống ≤ 8 phút trong nấc chật. Vòng 18 rời khỏi chuỗi vận động để đo một giả định im
lặng nằm sâu hơn, ngay trong **chính modality cảm biến** mà mọi quy định phản hồi đều đứng trên: HandLandmarker.
Toàn bộ vòng "camera thấy N/32 em", đếm ngón tay và lọc tay lạ (`classBoard`, `classVote`, `strayHands`,
`cameraGeometry`) đang coi việc nhận ra một bàn tay là **chính xác như nhau với mọi bàn tay**. Đo trên 39 giáo
án xác nhận độ lệch giữa cái có và cái thiếu: "HandLandmarker" và "camera thấy" có ở **39/39**, nhưng "tone
da", "da sẫm", "bàn tay nhỏ", "găng tay", "ướt", "không thấy tay" đều **0/39**. Nghiên cứu nhận diện tư thế
tay (bàn tay da sẫm *underrepresented* trong dữ liệu huấn luyện) và thị giác máy nói chung (Gender Shades, sai
lệch theo màu da trên khuôn mặt) cho thấy giả định kia sai có hệ thống. Hệ quả lớp học rất cụ thể: nếu máy
chỉ nhận ra 8 trong 12 bàn tay đang giơ, thì "camera thấy 8/32" — con số mà `privacy` và `cameraGeometry` bắt
in ra để trung thực — lại vô tình **khai sub những em bị lọt** (thường là em da sẫm, tay nhỏ, ngồi cuối phòng
ngược sáng), đúng cái bẫy "chỉ gọi mấy em đầu bàn" mà cả bộ giáo án này sinh ra để phá. `detectionEquity` chặn
lỗ đó: "camera thấy N" chỉ là cận dưới số tay máy nhận ra chứ không phải số em đã trả lời, mọi đáp án camera
có nút cộng tay +1/+5 cùng lượt, một bước tự kiểm độ phủ lúc chạy thử, và cấm tuyệt đối phân loại/lưu màu da.
Vòng 18 cũng sửa một lỗi **khả năng đọc của chính validator**: khi giáo án bị cắt, `validate.mjs` chỉ in 40 lỗi
đầu, nên phép thử cắt-file (P12) bỗng "thoát" chỉ vì hai quy định mới đẩy chẩn đoán "nội dung bị cắt" xuống
dưới cửa sổ in; bèn đưa kiểm tra cắt-file lên **đầu** vòng lặp để nó luôn được báo trước khi ngập trong lỗi dây
chuyền. Vòng 19 không đi tìm một quy định mới mà **đo độ tin cậy của chính bộ 44 quy định**: khi một quy định
dẫn chứng một quy định khác bằng `` `tênQuyDinh` ``, mô hình copy nguyên cái tên đó vào cả 39 giáo án, nên một
cái tên sai sẽ nhân bản 39 lần. Quét máy mọi token `` `camelCase` `` trong `LESSON`/`CHALK`/`HANDOUT` và đối
chiếu với danh sách khoá có thật, phát hiện `detectionEquity` (vòng 18) tham chiếu `wholeClassVote` trong khi
quy định đếm ngón tay thật tên là `classVote` — một con trỏ ma nằm trong cả 40 file (39 giáo án + chính file
nguồn). Vòng 19 sửa lại thành `classVote` và thêm một khoá **toàn-cục** vào validator: mọi tham chiếu chéo
phải khớp một khoá đã xuất, trừ đúng bốn tên được phép vì chúng là trường dữ liệu/API trình duyệt
(`errorTag`, `loiViet`, `localStorage`, `speechSynthesis`), cùng hai phép đột biến chứng minh khoá đó đỏ khi
đứa vào một cái tên ma. Vòng 20 đào tiếp đúng kiểu mâu thuẫn dây chuyền đó, nhưng giữa NHIỀU quy định với nhau:
`sáu` quy định (`boardEquity`, `classBoard`, `classVote`, `verifyData`, `oldHardware`, `timeSlack` + `roomFootprint`)
cùng hứa một thông tin "chỉ hiện ở dải điều khiển của cô, không hiện lên màn chiếu". Ghép lại, chúng mặc định
một máy tính có HAI tín hiệu xuất riêng — trong khi cắm HDMI vào máy chiếu thì mặc định thường là SOI GƯƠNG
(một màn hình nhân bản), và tài liệu của chính PowerPoint cho thấy ngay cả phần mềm trình chiếu chuyên dụng
cũng phải CHỦ ĐỘNG đổi 'display topology' sang Extend mới xem được ghi chú riêng; một file HTML trong trình
duyệt thì không có API nào làm việc đó. Đo trên 39 giáo án: "hai màn hình", "màn hình riêng", "màn hình mở rộng",
"trình chiếu" đều **0/39** — không quy định nào bảo đảm cái mà sáu quy định kia mặc định. Hậu quả nặng nhất:
nếu cứ soi gương thì bộ đếm "em nào chưa lên" của `boardEquity` hiện nguyên trước 35 em, bêu đúng những em rụt
rè mà `privacy`/`inclusion` đã cấm bêu. `privateView` bịt lỗ đó bằng đúng cách `powerCut` hỏi cắm-điện-hay-pin: hỏi
một dòng "CHUNG MÀN hay MÀN RIÊNG" với mặc định an toàn CHUNG MÀN, khi CHUNG MÀN thì rút mọi dòng riêng khỏi
màn hình và chuyển sang giữ-phím-để-xem, khi MÀN RIÊNG thì `window.open` cửa sổ chiếu chỉ-bảng. Vòng 21 vẫn đào
mâu thuẫn dây chuyền nhưng bằng **phép cộng số học** giữa bốn quy định: `fullPeriod` cho VẬN DỤNG 3–5 phút,
`exitTicket` giữ 2 phút CUỐI của nó làm vé, `movementBreak` để tổng nghỉ ≤ 3 phút "lấy từ VẬN DỤNG hoặc
`timeSlack` dôi ra", `tightRoomFocus` nâng trần nghỉ lên ≤ 4 phút khi chật. Cộng lại **nghỉ(4) + vé(2) = 6 > 5**
= trần cao nhất của VẬN DỤNG, và khi tiết đúng 35 phút thì `timeSlack` dôi = 0 nên nguồn thứ hai cũng cạn. Bốn
quy định đơn lẻ đều đúng, ghép thành một lời hứa không có chỗ trả — chính vòng 15 đã cắt nguồn mà nó rút; đo
"ngân sách nghỉ" · "co ngắn nhịp nghỉ" · "bỏ nhịp nghỉ" · "ưu tiên lấy từ" đều **0/39**. `breakReserve` biến nghỉ
thành một **dòng có thật trên thanh tiến trình** (2 phút, chật 3) rút theo đúng thứ tự timeSlack-dôi → VẬN DỤNG
trên 2 phút vé → LUYỆN TẬP 12→10, không bao giờ nuốt VẬT THẬT hay vé, và **tự co còn 15 giây** khi sát giờ.
Vòng 22 vẫn soi chính bộ quy định của mình nhưng chuyển từ *số học* sang *tiền đề*: nó hỏi "khi một quy định
ra lệnh THÊM một bước vào chỗ này, cái chỗ này có chứa nổi bước đó không?" `rehearsal` định nghĩa nút "Chạy thử
5 phút" là "**không cần camera** và không cần lớp", bấm qua "**đúng năm bước**", in "đã thử 5/5", kèm "ĐÚNG MỘT
danh sách **10 việc** · một trang A4". Thế mà ba quy định sau mỗi cái dặn "thêm đúng MỘT bước/việc" vào đúng
nút ấy, trong đó `detectionEquity` (v18) đòi "**đưa bàn tay vào trước camera**" — một bước chỉ làm được khi
camera BẬT, nằm ngay trong luồng được ĐỊNH NGHĨA là không-camera. Đây không phải cộng lệch mà là hai chỉ thị
loại trừ nhau mà mô hình sinh HTML phải vâng cả hai. Đo trên 39 giáo án: hai chuỗi "không cần camera" và "vào
trước camera" **cùng xuất hiện 39/39** (chúng chung sống trong mọi file, không hề được hoà), còn mọi cách hoà
giả tưởng — "nhành" · "tuỳ chọn" · "bật camera cho riêng" · "5/5 bước · nâng cao" — đều **0/39**. `rehearsalBudget`
chia chạy thử thành **ba nhành** (A không-camera đúng 5 bước; B có-camera cho bước độ phủ, bật–xin-phép–tắt; C
nâng-cao-tuỳ-chọn cho "Kiểm tra riêng tư" và mô phỏng "Còn 2 phút") và **phong ngân sách** (chữ "5 phút" chỉ tính
Nhành A; phiếu 10 việc CỐ ĐỊNH không phình). Khác mọi vòng trước, vòng 22 khoá mâu thuẫn bằng một **kiểm tra bắt
cặp** chứ không chỉ so chuỗi: validator đỏ nếu `detectionEquity` còn nói "vào trước camera" mà mất tham chiếu
`rehearsalBudget`, nên chính cái lệnh bật-camera-trong-luồng-không-camera ấy không thể quay lại lọt thỏm (P94).
3. **Quy định phải có con số.** "Chữ phải to" không kiểm chứng được; "≥ 40 px **và** ≥ 5.5% chiều cao khung
   hình, ≤ 12 chữ một dòng" thì validator bắt được. Mọi quy định trong `tools/lib/*.mjs` là chuỗi nguyên văn,
   `tools/validate.mjs` so bằng `includes()`, nên lời văn và mắt kiểm không bao giờ lệch nhau.
4. **Chốt chặn hai chiều.** Cơ chế game lọt vào giáo án và quy định giáo án lọt sang game đều làm build đỏ.
   Thêm một quy định mới là tự động thêm một khoá bị cấm ở phía bên kia (`LESSON_FAMILY_RULES`).
5. **Probe đột biến là đơn vị kiểm thử thật.** 94 phép, mỗi phép phá đúng một thứ và đòi đúng thông báo.
   Không có probe thì một quy định chỉ là câu văn đẹp.
6. **Tách công cụ giảng bài khỏi game.** Cùng một kiến thức, hai động cơ đối lập: game cần hồi hộp,
   tiết giảng cần giáo viên cầm lái. Nhét tim/điểm/combo vào bảng phấn làm em lên bảng sợ sai hơn là muốn hiểu.

## Số liệu đo được trên 39 giáo án, theo vòng

| Vòng | Đã đo | Đã vá |
| --- | --- | --- |
| 1 | bảng phấn và vật thật lẫn sang 85 prompt game | rút hẳn, giáo án có khung riêng |
| 2 | 2/39 nhắc dãy cuối lớp · 0/39 mất mạng · 0/39 tự kiểm `LESSON_DATA` | `backRow`, `noNetwork`, `verifyData` |
| 3 | 0/39 có đầu ra cho tờ giấy | `tools/lib/handout.mjs` (phiếu · đáp án · nội dung chép) |
| 4 | 0/39 nhắc 35 phút · 0/39 nhắc lớp khác · 0/39 chỗ cho em không lên bảng | `fullPeriod`, `multiClass`, `inclusion` |
| 5 | dashboard chỉ ghép `games + legacy`, giáo án nằm im trong thư mục | tab "Giáo án giảng bài", 136 card |
| 6 | 0/39 trả lời cả lớp không cần webcam · 0/39 nhắc quyền riêng tư khi quay cả lớp | `classBoard`, `privacy` |
| 7 | 0/39 nhịp nói-with-you · 0/39 đoán trước khi thao tác · 0/39 mẫu che dần · 0/39 vé kết thúc tiết | `pairShare`, `predict`, `fadedExample`, `exitTicket` |
| 8 | 0/39 phòng không có máy chiếu · 0/39 trần RAM và số model chạy cùng lúc · 0/39 phát hiện năng lực trình duyệt | `noProjector`, `oldHardware`, `browserCompat` |
| 9 | 0/39 nói camera quay cái gì (trong khi 39/39 đòi vừa soi bảng vừa đếm tay 35 em) · 0/39 nhắc quyền quản trị và `file://` · 0/39 nhắc em không giơ được tay | `cameraGeometry`, `noAdmin`, `physicalAccess` |
| 10 | 39/39 viết "12 lượt một tiết" và "35 em" nhưng 0/39 biết em nào đã lên · 0/39 cách chạy thử khi chưa có lớp · 0/39 nhắc đồng nghiệp, năm học sau, nhập/xuất giáo án | `boardEquity`, `rehearsal`, `lessonStudy` + mục 10 mới (khung thành 13 mục) |
| 11 | 39/39 chép "lớp 35 em" và "cách màn chiếu 7–8 m" như số đo lớp thật · 0/39 mất điện giữa tiết · 0/39 nhắc bộ đồ dùng dạy học hoặc đường vật thật bằng giấy | `bigClass`, `powerCut`, `paperProps` + mục 7 đổi tên để gồm cả mất điện |
| 12 | 0/39 "thừa giờ" · 0/39 "dư giờ" · 0/39 "cháy giáo án" (mới chỉ lo tiết cháy về phía dài) · 0/39 "làm việc theo nhóm" và 0/39 "bốn vai trò" · 0/39 "xong sớm" và 0/39 "làm xong trước" | `timeSlack`, `groupWork`, `fastFinishers` |
| 13 | 0/39 coi "dấu chấm" là một quy định hiển thị, 0/39 "dấu nhân"/"dấu chia", 0/39 `parseFloat`, 0/39 `toFixed` ("dấu phẩy" chỉ có ở 4/39 bài dạy số thập phân) · 0/39 "đến muộn" và 0/39 "vắng" · 0/39 "trả bài" và 0/39 "chữa bài" · **đo trên dữ liệu**: `verifyData` bắt phủ "≥ 3 nhãn lỗi" nhưng 1/38 cụm (chẵn-lẻ) chỉ khai 2 nhãn — giáo án đó vô nghiệm | `numberFormat`, `latePupil`, `repairWork` + `verifyData` đổi trần thành `min(3, số nhãn của cụm)` + validate chặn `tags`/`loiViet` lệch nhau |
| 14 | 0/39 "từ khó" · 0/39 "giải nghĩa" · 0/39 "ít chữ hơn" · 0/39 "chỉ vào hình" (giả định mọi em đọc thông thạo tiếng Việt) · 0/39 "không có bảng con" · 0/39 "mặt sau vở" · 0/39 "nắp hộp" (lượt Bảng con giả định mỗi em đã có bảng) · phiếu: 0/39 "cỡ chữ" · 0/39 "in một mặt" | `homeLanguage`, `noSlate` + `HANDOUT.printRun` (họ từ-bảng-ra-vở thành 4 quy định) |
| 15 | **mâu thuẫn pace × flow**: 0/39 "nghỉ giải lao" · 0/39 "vận động giữa tiết" · 0/39 "đứng dậy" · 0/39 "vươn vai" — năm bước 15–20 phút của `flow` và nhịp chờ của `pace` giả định 35 em ngồi bất động nhìn bảng; từ "giải lao" duy nhất có mặt lại là một câu CẤM trong `latePupil` | `movementBreak` (ngồi liền ≤ 12 phút → nhịp vận động 30–90s vẫn là Toán, nghỉ ngắn 1–3 phút tổng ≤ 3 phút không cắt VẬT THẬT, camera tắt, có phiên bản ngồi cho cả lớp) |
| 16 | **đo chính hệ quả của quy định vòng 15**: `movementBreak`/`groupWork`/`handover`/`boardEquity` âm thầm đòi khoảng trống trên sàn, trong khi `bigClass` mới hỏi SĨ SỐ chứ chưa hỏi diện tích — 0/39 "chật" · 0/39 "không đủ chỗ" · 0/39 "lối đi" · 0/39 "dịch bàn" · 0/39 "đứng tại chỗ" · 0/39 "chỗ đứng", dù "đứng lên" và "nhóm 4 em" có ở 39/39 file · số thật: định mức VN ~1,5 m²/đầu em, phòng 48 m² chỉ chuẩn ở ~32 em → 45 em/48 m² ~1,07 m² | `roomFootprint` (hỏi m² một lần → m²/đầu em; ≥ 1,8 + lối đi ≥ 60 cm mới cho đứng quay người/xếp hình; < 1,2 bỏ nhịp dịch ngang, giữ đứng-tại-chỗ (vòng 17 hiệu chỉnh); an toàn: không lách qua bạn, giữ lối thoát, không kê bàn chắn cửa) |
| 17 | **đo tiếp hệ quả của vòng 16**: `movementBreak` giữ ngưỡng ngồi liền ≤ 12 phút với giả định nhịp còn là nhịp toàn thân, nhưng `roomFootprint` vừa rút nhịp đó ở phòng chật (< 1,2 m²/đầu em) xuống còn vươn tay/xoay cổ — chính lớp đông-trật nhất nhận nhịp yếu nhất mà vẫn chờ đủ 12 phút; và `roomFootprint` đồng nhất "không lối đi" với "không đứng được" dù đứng-thẳng-tại-chỗ không cần lối đi | `tightRoomFocus` (nấc chật: giữ nhịp đứng-tại-chỗ 20–60s vẫn là Toán, hạ ngưỡng ngồi liền ≤ 12 → ≤ 8 phút, tổng nghỉ ≤ 4 phút, không cắt VẬT THẬT, camera vẫn tắt; sửa `roomFootprint` để chỉ cắt nhịp dịch ngang/di chuyển) |
| 18 | **đo giả định im lặng trong modality cảm biến trung tâm**: mọi vòng phản hồi chạy trên HandLandmarker và coi "nhận ra một bàn tay" là chính xác như nhau với mọi em — đo: "HandLandmarker" 39/39 và "camera thấy" 39/39, nhưng "tone da" 0/39 · "da sẫm" 0/39 · "bàn tay nhỏ" 0/39 · "găng tay" 0/39 · "ướt" 0/39 · "không thấy tay" 0/39 · "bỏ sót" 2/39; nguồn: tài liệu nhận diện tư thế tay (bàn tay da sẫm underrepresented trong dữ liệu huấn luyện) + Gender Shades (khuôn mặt, 0,8%→34,7%, chỉ dùng làm bằng chứng *chiều*) | `detectionEquity` ("camera thấy N" = cận dưới số TAY máy nhận ra, không phải số EM đã trả lời; mọi đáp án camera có nút cộng tay +1/+5 cùng lượt; một bước tự kiểm độ phủ lúc chạy thử → hay lọt thì chuyển mặc định bảng-con-nhập-tay; KHÔNG phân loại/chấm/lưu màu da, không xếp em hay bị lọt; ngưỡng "thường xuyên lọt" là dự án chọn). Kèm sửa lỗi đọc của validator: đưa kiểm tra "giáo án bị cắt" lên ĐẦU vòng lặp để không bị nhấn chìm dưới cửa sổ in 40 lỗi |
| 19 | **đo độ tin cậy của chính bộ quy định**: mô hình copy nguyên mọi tham chiếu chéo `` `tênQuyDinh` `` vào cả 39 giáo án, nên một cái tên sai nhân bản 39 lần — quét máy toàn bộ token `` `camelCase` `` trong `LESSON`/`CHALK`/`HANDOUT` đối chiếu danh sách khoá có thật: 15 tham chiếu hợp lệ, **1 tham chiếu ma** (`detectionEquity` → `wholeClassVote`, đúng ra `classVote`), còn 4 token là trường dữ liệu/API (`errorTag`, `loiViet`, `localStorage`, `speechSynthesis`) không phải quy định | sửa `wholeClassVote` → `classVote` (39 file + docs) + khoá toàn-cục mới trong validator: mọi `` `camelCase` `` bọc trong dấu chấm ngược phải khớp một khoá đã xuất, ngoại trừ đúng bốn tên dữ liệu/API; P86–P87 chứng minh khoá đỏ khi đứa vào tên ma |
| 20 | **đo mâu thuẫn dây chuyền giữa NHIỀU quy định**: sáu quy định (`boardEquity`, `classBoard`, `classVote`, `verifyData`, `oldHardware`, `timeSlack` + `roomFootprint`) cùng hứa "chỉ hiện ở dải điều khiển của cô, không hiện lên màn chiếu" — mặc định một máy hai tín hiệu xuất riêng, nhưng cắm HDMI mặc định thường là SOI GƯƠNG; đo: "hai màn hình" · "màn hình riêng" · "màn hình mở rộng" · "trình chiếu" đều **0/39**; nguồn: Microsoft PowerPoint (muốn xem ghi chú riêng phải **chủ động** đổi topology sang Extend — nói về chiều kiến trúc, không phải số liệu HTML) | `privateView` (hỏi một dòng "CHUNG MÀN / MÀN RIÊNG", mặc định an toàn CHUNG MÀN, không đoán — như `powerCut` hỏi cắm điện/pin; khi CHUNG MÀN rút mọi dòng riêng khỏi màn hình thường trực + giữ-phím-để-xem ẩn ≤ 0,3 s; khi MÀN RIÊNG `window.open` cửa sổ chiếu chỉ-bảng-không-dải-điều-khiển, chặn thì tự lùi về CHUNG MÀN; không in tên/dãy-ghế thường trực, "Kiểm tra riêng tư" trong chạy thử soi đúng màn máy chiếu đang phát; mốc 0,3 s + mặc định CHUNG MÀN là dự án chọn) |
| 21 | **đo mâu thuẫn bằng chính PHÉP CỘNG trên các con số của bốn quy định**: `fullPeriod` cho VẬN DỤNG 3–5′ · `exitTicket` giữ 2′ CUỐI của nó làm vé · `movementBreak` tổng nghỉ ≤ 3′ "lấy từ VẬN DỤNG hoặc `timeSlack` dôi" · `tightRoomFocus` nâng nghỉ lên ≤ 4′ khi chật → nghỉ(4) + vé(2) = **6 > 5** = trần VẬN DỤNG, và tiết đúng 35′ thì `timeSlack` dôi = 0 nên nguồn hai cũng cạn; đo: "ngân sách nghỉ" · "co ngắn nhịp nghỉ" · "bỏ nhịp nghỉ" · "ưu tiên lấy từ" đều **0/39**; nguồn: Understood.org (brain-break là chiến lược hành vi có bằng chứng, xếp 1–5 phút sau mỗi 10–25 phút tập trung — khớp đầu dưới mà `movementBreak` đã cite) | `breakReserve` (dòng nghỉ **có thật** trên thanh tiến trình `flow` — nấc thường 2′, chật 3′ — số dự án chọn để phép cộng trong 35′ đóng lại; rút đúng thứ tự timeSlack-dôi → VẬN DỤNG trên 2′ vé (không xuống dưới 2′) → LUYỆN TẬP 12→10, **tuyệt đối không** rút VẬT THẬT hay vé; khi "Còn < 3 phút"/"quá giờ"/cô bấm "Còn 2 phút" thì nhịp **tự CO còn 15 giây** (ba hơi thở + vươn tay, vẫn Toán, camera tắt); một nút "Bỏ nhịp nghỉ tiết này", bộ đếm "nghỉ đã dùng/còn lại" ở dải của cô; thêm một bước chạy thử mô phỏng "Còn 2 phút") |
| 22 | **đo TIỀN ĐỀ của chính các lệnh "thêm một bước"**: `rehearsal` định nghĩa "Chạy thử 5 phút" là "không cần camera · đúng năm bước · đã thử 5/5 · ĐÚNG MỘT danh sách 10 việc · một trang A4", nhưng `detectionEquity` (v18) + `privateView` (v20) + `breakReserve` (v21) mỗi cái dặn "thêm đúng MỘT bước/việc" vào đúng nút ấy, và bước của `detectionEquity` **cần camera BẬT** ("đưa bàn tay vào trước camera") — hai chỉ thị loại trừ nhau; đo: "không cần camera" **39/39** *và* "vào trước camera" **39/39** (chung sống), còn "nhành" · "tuỳ chọn" · "bật camera cho riêng" · "5/5 bước · nâng cao" đều **0/39** | `rehearsalBudget` (chia BA NHÀNH: A không-camera mặc định đúng 5 bước (chạy được khi máy không camera, đúng `oldHardware`/`noAdmin`); B có-camera cho bước độ phủ của `detectionEquity` — bật chủ động + xin phép một dòng + tắt hẳn khi ra (đèn đỏ theo `privacy`/`cameraGeometry`); C nâng-cao-tuỳ-chọn cho "Kiểm tra riêng tư" và mô phỏng "Còn 2 phút". Phong ngân sách: "5 phút" chỉ tính Nhành A (B/C +≤ 2′, dự án chọn), phiếu 10 việc CỐ ĐỊNH không phình. **Khoá bắt-cặp** mới trong validator: đỏ nếu `detectionEquity` còn "vào trước camera" mà mất tham chiếu `rehearsalBudget` — P94 chứng minh) |

## Vì sao chọn những con số đang dùng

- **Chữ phấn ≥ 40 px *và* ≥ 5.5% chiều cao khung hình.** px trên laptop của cô không phải thứ cần bảo đảm;
  mắt một em cách màn chiếu 7–8 m mới là thứ cần bảo đảm, nên quy định thứ hai khoá tỉ lệ để máy chiếu
  độ phân giải thấp vẫn ra cỡ chữ đúng.
- **Mẫu số 2–12 cho chia phân số**, không chỉ 2/4/8: SGK tiểu học Việt Nam dùng nhiều mẫu số khác nhau,
  và một bộ vật thật chỉ cắt được theo luỹ thừa của 2 sẽ dạy học sinh một thói quen sai.
- **Cửa sổ "nghĩ riêng" 15 giây, "nói với bạn" 40 giây, "đoán trước" ≥ 2 lần một tiết** — lấy từ nhịp hay
  dùng của ba kỹ thuật ở mục dưới, được ghi thành con số để validator kiểm được, **không phải số đo thực
  nghiệm của dự án này**.
- **Màn chờ CDN tối đa 8 giây, nghỉ bắt buộc 90 giây, đóng băng nét khi mất tay > 500 ms, `maxNumHands: 2`,
  trần `localStorage` 200 KB** — các ngưỡng này do dự án tự chọn cho thiết bị lớp học phổ thông ở Việt Nam
  và có thể cần chỉnh theo máy thật; xem mục "Việc còn mở".
- **Trần của `oldHardware` (640×480 → 320×240, dưới 15 FPS trong 3 giây thì tắt nhận diện tay, ≤ 2000 nét
  một trang, MỘT instance HandLandmarker)** — chọn theo cấu hình laptop văn phòng cũ phổ biến (2 nhân, 4 GB
  RAM) chứ **không phải** số đo trên thiết bị thật. Con số 15 FPS là ngưỡng "chậm rõ với mắt khi viết nét";
  ngưỡng thật của trẻ 9–10 tuổi viết phấn bằng camera thì chưa ai đo ở đây.
- **≥ 44 px cho nút chạm và ≥ 55% khung hình cho bảng ở chế độ không màn chiếu** — 44 px theo khuyến nghị
  vùng chạm thông dụng của giao diện cảm ứng; 55% là mức dự án tự chọn để trên laptop 13 inch vẫn còn chỗ
  cho dải điều khiển. Hai con số này khác nhau về bản chất: một cái là chuẩn ngành, một cái là phỏng đoán.
- **Hình học camera trong `cameraGeometry` (cách bảng 1,0–2,5 m, bàn tay ≥ 20% chiều cao khung hình,
  "Quay lớp" phải thấy ≥ 2/3 số em, đổi chế độ ≤ 2 giây, ngưỡng 50% sĩ số)** — **toàn bộ là do dự án tự
  chọn**. Đã mở ba trang hướng dẫn đặt camera nhận diện tay của nhà sản xuất để tìm số tham chiếu; cả ba
  đều không công bố bảng khoảng cách/ngưỡng nào, nên không được trích số liệu từ đó. Chỉ có một con số lấy
  được từ tài liệu thương mại là góc nhìn webcam phổ biến 60°/78°/90° (camera phòng 90–120°), và nó chỉ
  dùng để giải thích vì sao webcam laptop đặt ở bàn cô giáo không phủ được dãy cuối.
- **Vì sao bàn tay ở cuối phòng không dùng để viết phấn được**: bài báo MediaPipe Hands mô tả kiến trúc
  hai tầng — "a palm detector that operates on a full input image" rồi landmark model chạy trên vùng cắt.
  Palm phải hiện ra trong ảnh gốc thì cả pipeline mới có cái để cắt, nên tay ở xa và nhỏ là điểm yếu có
  tính nguyên tắc. Chiều ngược lại cũng phải nói thẳng: bài báo chỉ đo hiệu năng trên **mobile GPU**
  (Pixel 3, S20, iPhone 11) chứ không đo CPU, và tự nhận chịu được "large scale span (~20x)" — nên mọi con
  số FPS và khoảng cách trong repo này **không phải** số liệu của bài báo.
- **`clamp(round(M/3), 12, 16)` cho trần lượt lên bảng.** 35 em phải ra đúng 12 để khớp với quy định
  "MỜI EM LÊN BẢNG" đã có từ vòng 1 — đó là lý do mẫu số là 3 chứ không phải một con số đẹp hơn. Dải 12–16
  khoá để lớp 55 em không đòi 18 lượt (một tiết 35 phút không đủ chỗ) và lớp 24 em không bị ép xuống 8 lượt.
  **Đây là phép nội suy của dự án, không phải số liệu nào về thời gian lên bảng.**
- **Hai nấc 8 m và 12 m của nút "Xem thử từ cuối lớp"** — 8 m là mức đã dùng từ vòng 2; 12 m là mức tự chọn
  cho lớp đông phải xếp thêm bàn, không phải khoảng cách đo được ở một phòng học Việt Nam nào. Con số 40 em
  làm ngưỡng chuyển nấc lấy theo các bài báo về sĩ số: quy định của Bộ GD&ĐT là không quá 35, còn lớp thật
  ở đô thị thường vượt ngưỡng đó — nên ngưỡng phải đặt *trên* 35 thì mới có tác dụng.
- **`"wakeLock" in navigator` trong `powerCut`** — API có thật, được MDN và Chrome mô tả đúng hai điều mà
  quy định dùng: phải xin lại khi trang mất tiêu điểm, và không phải trình duyệt nào cũng có. Vòng này cố
  tình **không** đưa số phút trụ pin vào: `getBattery()` không chạy trên mọi trình duyệt nên mọi cam kết
  "dạy tiếp được 20 phút mất điện" đều là chữ bịa.
- **Một tờ A4 đủ bộ cho bàn 4 em, cắt trong ≤ 10 phút** — hai con số của `paperProps` do dự án ước lượng
  theo kích thước vật thật đã khai trong `tools/data/props.mjs` (pizza chia 8, dải phân số, lưới khối), chưa
  ai cắt thử. Đây là chỗ nên đo trước khi chỉnh: nếu cắt thật lâu hơn 10 phút thì đường "giấy cắt" sụp và
  lớp không có đồ dùng chỉ còn đường "viên phấn, nắp chai".
- **Ba kịch bản đóng bài 10 / 5 / 2 phút trong `timeSlack`** — ngưỡng 8 phút và 3 phút là cách chia một
  khoảng 10–15 phút dư thành " còn làm được một câu", "chỉ còn đọc vé", "chỉ còn chốt lại"; **do dự án tự
  chọn**, chưa đo xem giáo viên Việt Nam thường dư bao nhiêu phút. Điều lấy được từ tài liệu là *nguyên tắc*:
  ba nguồn về "early finishers" và "pace" đều nói cùng một việc — phần việc thêm phải đào sâu đúng nội dung
  đã học, không phải khối lượng mới. Câu cấm "dạy sang kiến thức mới lúc dư giờ" là suy ra từ chính nguyên
  tắc đó, không phải từ một chuẩn nào của Bộ.
- **Nhóm 4 em, bốn vai trò, 3–6 phút, tối đa 2 lượt một tiết** — sĩ số 4 em một bàn lấy theo cách xếp bàn
  phổ thông (và khớp với "một tờ A4 đủ bộ cho bàn 4 em" của vòng 11); "tối đa 2 lượt" là phép chia trần
  LUYỆN TẬP 12–15 phút cho hai lượt có chốt kết quả. Việc giao vai trò theo **vị trí ngồi** chứ không theo
  lực học là lựa chọn có chủ đích, theo hướng tài liệu về nhóm trong Toán tiểu học: vai trò là cách để mọi
  em có phần việc, không phải cách để chia trình độ. EEF có mục "collaborative learning" trong toolkit
  nhưng trang trả về 403 khi mở, nên **không** trích con số tiến bộ thêm bao nhiêu tháng của họ vào repo này.
- **"Cùng đáp số nhưng khác cách" là bài chọn thêm duy nhất có răng** — đây là ý lấy từ tài liệu "going
  deeper" (đào sâu bằng cách biểu diễn khác, không bằng thêm câu). Số lượng đúng 3 bài, không "thêm 10 câu",
  là quy định tự chọn của dự án để phiếu vẫn in trên một trang A4.
- **Dấu phẩy thập phân không phải sở thích thẩm mỹ mà là một chỗ sai tính toán được** — ba dòng Node kiểm
  lại được trước khi viết quy định: `new Intl.NumberFormat('vi-VN').format(0.5)` → `"0,5"`,
  `format(1234567.89)` → `"1.234.567,89"` (đúng cách SGK và vở viết), trong khi `(0.5).toFixed(1)` → `"0.5"`
  và `String(0.5)` → `"0.5"`; chiều đọc vào còn hỏng nặng hơn — `parseFloat('0,5')` → `0` và
  `Number('1.234,5')` → `NaN`. Một công cụ chỉ lo *hiển thị* sẽ in ra "0,5" rồi báo đáp án đúng của em là
  sai, nên `numberFormat` bắt thêm hàm chuẩn hoá đầu vào và bắt `verifyLessonBank()` kiểm chuỗi hiển thị.
  W3C ghi rõ dấu phân cách thập phân đổi theo ngôn ngữ và dấu chấm **không** phải mặc định toàn cầu; MDN là
  nguồn của chính `Intl.NumberFormat`. **Giới hạn chưa đo:** tỉ lệ máy/trình duyệt Việt Nam có sẵn dữ liệu
  locale `vi-VN` — vì vậy quy định cho phép fallback "đổi đúng một lần dấu chấm thành dấu phẩy" thay vì tin
  vào locale.
- **"≤ 1 phút" cho ba dòng bù bài khi em đến muộn, "≤ 3 phút" cho trang "ba việc của bài trước"** — cả hai
  là trần *thời gian tiết bị gián đoạn*, **do dự án tự chọn**, chưa có nguồn nào đo một em bắt kịp bài mất
  bao lâu. Cách chọn: 1 phút là lúc cả lớp vẫn nghe cô còn em cầm giấy đọc ba dòng; 3 phút nằm trong nửa dưới
  của khoảng 3–6 phút một lượt nhóm đã quy định ở vòng 12, tức là em xem trang bù ngay trong lúc lớp LUYỆN
  TẬP mà cô không phải dừng bước. Điều lấy được từ tài liệu là *nguyên tắc*: phải có một lộ trình ngắn cho
  em trở lại, không phải một chồng phiếu, và không hỏi lý do vắng trước lớp.
- **"Số hàng của trang chữa bài ≤ đúng số nhãn lỗi của cụm", "tổng chữa ≤ 4 phút", "dòng 'Em chữa bài ở
  đây' ≥ 1 cm", "không tô đỏ"** — con số này **đo từ dữ liệu, không chọn trên giấy**: `node -e` trên 38 cụm
  vật thật cho thấy `cluster(id).tags.length` bằng đúng số mục của `ERROR_NOTES[id]` ở **38/38** cụm, và
  phân bố là 37 cụm có 3 nhãn + 1 cụm (chẵn-lẻ) có 2 nhãn. Việc đo này còn tìm ra một quy định **vô
  nghiệm**: `verifyData` từ vòng 2 bắt LESSON_DATA "bao phủ ít nhất 3 nhãn lỗi", nhưng cụm chẵn-lẻ chỉ có
  2 nhãn, nên giáo án GA4-04 không thể nào qua được kiểm chứng của chính nó — đường duy nhất là bịa nhãn
  thứ ba ngoài danh sách. Từ vòng 13 trần phủ nhãn viết theo `min(3, số nhãn thật của cụm)`, `repairWork`
  cũng lấy trần 3 theo cùng phép đo, và `tools/validate.mjs` chặn nếu hai con số lệch nhau hoặc một cụm
  nào đó vượt 3 nhãn. 4 phút lấy đúng ngân sách một lượt lên bảng của `boardEquity`, và quy định nói rõ
  không được lấy từ bước VẬT THẬT vì tay các em đã bị cắt ở vòng 11. "≥ 1 cm" to hơn một dòng vở kẻ ngang
  để em viết chồng lên chứ không viết đè — **con số tự chọn, cô đo bằng thước được, không phải chuẩn in
  nào**. Hướng "chữa bằng nhận xét, không sửa hộ, không tô đỏ" theo tài liệu marking ở mục nguồn đọc; riêng
  "công cụ không lưu và không hiện điểm" là **lựa chọn của dự án** cho khớp với cam kết không giữ dữ liệu
  học sinh, không phải một quy định nào cấm hiển thị điểm.
- **"Ít chữ hơn" rút còn ≤ 8 chữ rồi còn hình + số** — ngưỡng 8 chữ **do dự án tự chọn**, chưa có nguồn nào
  đo một đề Toán lớp 4–5 mấy chữ thì em đọc tiếng Việt như ngôn ngữ thứ hai còn hiểu được. Cách chọn: 8 chữ
  là cỡ một câu lệnh ngắn ("Viên phấn này chia mấy phần?"), đủ để giữ lại con số và từ chỉ quan hệ nhưng bỏ
  được phần văn dẫn. Phần *nguyên tắc* thì có nguồn đàng hoàng: bài "Adapting Math Word Problems for ELLs"
  của Edutopia nêu thẳng khẩu hiệu **"change the language, not the math"** — rút câu bằng cách bỏ văn thừa, chia
  câu ghép, đổi về thì đơn giản, thay thuật ngữ bằng từ thường, chứ **không** hạ chuẩn Toán và **không** đổi số.
  Bài đó cũng khuyên lồng "mathematical models and manipulatives" (thanh phân số, khối) để giảm bớt gánh
  chữ, đúng là hình thức của "chỉ vào sơ đồ / kéo vật thật". Vì vậy quy định buộc giữ nguyên văn mọi con số,
  đơn vị và từ quan hệ. Cấm gọi em đọc to đề để "rèn tiếng Việt" và cấm dán bản dịch tiếng Anh là suy từ chính
  tài liệu EAL: với các em đó tiếng Anh cũng là chữ lạ, và đọc to trước lớp đổi cái khó lấy một cái khác
  (mất mặt) chứ không giải quyết gì.
- **Bảng con = bất kì mặt phẳng ≥ 15 × 20 cm, viết ≤ 20 giây, mở ≤ 5 giây, ≤ 3 lượt kiểm tra một tiết, cô đi
  nhìn 3–4 bàn trong ≤ 40 giây** — cả năm con số đều **do dự án tự chọn**, không phải chuẩn của bộ tài liệu
  mini-whiteboard nào. Cách chọn từng số: 15 × 20 cm là cỡ nửa trang vở hoặc một tờ A4 cắt đôi nên em viết
  được một chữ số hai chữ số; 20 giây đủ viết một đáp án mà không biến thành giờ thi; 5 giây là thời gian
  một lớp 45 em cùng úp-mở theo hiệu lệnh; 3 lượt lấy từ trần LUYỆN TẬP chia cho các nhịp khác; 40 giây là
  quãng cô đi được hai lượt bàn rồi quay lại mà không mất bài. Con số "cô chỉ thấy 4/11 bàn" là ví dụ sĩ số
  45 em xếp bàn 4, không phải số đo. Việc **cấm hỏi "ai làm đúng giơ tay"** dựa trên hai suy luận được nêu
  thẳng trong quy định: em nào cũng tự nhận đúng, và giơ tay là mẫu của 5–10% em hay phát biểu chứ không phải
  mẫu của cả lớp.
- **Chữ in trên phiếu ≥ 12 pt, bớt câu theo thứ tự 8 → 6 → 4, một tờ A4 in 2 mặt cho hai em, "45 em → 23 tờ",
  vượt 24 tờ thì gợi ý để dành** — mức **≥ 12 pt** có nguồn thật: hướng dẫn "Dyslexia-friendly typed formats"
  của Dyslexia Scotland ghi tài liệu in "should be at least 12pt", nên đây không còn là con số tự chọn. Trang
  về cỡ chữ cho người yếu thị lực (teachingvisuallyimpaired.com) khi mở không trả về nội dung đọc được nên
  không lấy thêm số từ đó. Cách chọn các số còn lại: 8 → 6 → 4 là bậc giảm để số câu luôn chẵn và in được theo
  nửa trang; "45 em → 23 tờ" là phép chia trần (45/2 = 22.5 → 23 tờ, mỗi tờ hai em) và ngưỡng 24 tờ chỉ
  là "nhiều hơn một xấp 20 tờ một chút" để gợi ý cắt bớt — không phải định mức giấy nào của trường. Quy tắc
  "phân biệt bằng hoa văn chứ không bằng màu" lấy từ thực tế máy in một màu và bản phô-tô nhiều lần làm mờ màu
  thành xám, đây là suy luận kỹ thuật chứ không trích một chuẩn in nào.
- **Ngồi liền ≤ 12 phút thì phải có một nhịp đổi tư thế, nhịp đó 30–90 giây, nghỉ ngắn trọn 1–3 phút và TỔNG
  nghỉ ≤ 3 phút một tiết** — khoảng "10–25 phút làm việc tập trung rồi nghỉ" và độ dài "một đến năm phút"
  là hai con số CÓ NGUỒN: Understood (brain breaks) ghi xếp nghỉ "after 10 to 25 minutes of intensive work"
  và mỗi nhịp "one to five minutes"; bài Brain Breaks trên PMC đo trên học sinh **lớp 3–5** với nhịp "3–5 min".
  Dự án chọn **12 phút** (về phía thấp của dải 10–25) vì BÀI MỚI của `flow` đã chiếm 15–20 phút — nếu chọn
  20 thì cả chặng bài mới trôi qua mà không một lần nhắc. Nhịp 30–90 giây và trần tổng 3 phút là **do dự án
  chọn** để một tiết 35 phút không bị nghỉ ăn mất hơn ~8% quỹ thời gian; quy định nói rõ phần nghỉ lấy từ
  VẬN DỤNG hoặc `timeSlack`, **không cắt bước VẬT THẬT** (tay các em đã bị cắt ở vòng 11). Ý "đứng = đồng ý
  một phát biểu, dùng người làm hình" lấy từ *nguyên tắc* embodied của CRA (tầng concrete là cơ thể/vật thật),
  **không** có nguồn nào quy định số giây hay số lần. Camera tắt trong nhịp vận động là **suy luận bắt buộc**
  từ `privacy` + `cameraGeometry` đã có, không phải một số liệu mới.
- **Ba nấc 1,8 / 1,2 m²/đầu em và lối đi ≥ 60 cm của `roomFootprint`** — hai con số phòng học là **có nguồn
  Việt Nam thật**: bài Giaoduc.net dẫn định mức "diện tích sàn xây dựng phòng học tập trường trung học phải
  đạt 1,5 m²/học sinh" và chỉ ra "phòng 48 m² sĩ số ~32 em mới đúng tiêu chuẩn tối thiểu" (⇒ 45 em trong 48 m²
  ≈ 1,07 m²/em); Hà Lan dùng chuẩn **3,5 m²/đầu em** cho phòng tiểu học, đặt trần trên của phổ không gian. Dự
  án **chọn 1,8** làm nấc "được đứng quay người + xếp hình bằng người" vì nó nằm *trên* định mức xây dựng 1,5
  (chỗ để ngồi ≠ chỗ để đứng dang tay), và **chọn 1,2** làm nấc "bỏ nhịp dịch ngang/di chuyển, chỉ còn đứng-tại-chỗ" vì dưới 1,2 thì ngay cả dang tay hay lùi ra để xếp hình cũng chật — con số 1,07 của lớp 45 em/48 m² rơi đúng vào nấc này, tức là quy định mô tả một tình huống có thật chứ không phải một cột mốc tùy ý. (Vòng 17 sửa lại mô tả nấc 1,2: phòng chật chỉ cắt các nhịp cần *dịch ngang hoặc đi lại*, vẫn giữ nhịp *đứng thẳng tại chỗ* vì đứng lên trong chính chỗ ngồi không cần lối đi.) Ngưỡng "lối đi ≥ 60 cm" là **ước lượng tự chọn**
  cho bề rộng một em lách qua bàn, chưa có số đo hành lang nào của Bộ; ba nấc trên là cách chia khoảng, không
  phải định mức của một quy chuẩn xây dựng nào, và dự án chưa khảo sát phân bố diện tích phòng học Việt Nam.
- **Ngưỡng ≤ 8 phút, nhịp 20–60 giây và trần ≤ 4 phút của `tightRoomFocus`** — đây là **ba lựa chọn của dự
  án**, không nguồn nào quy định số phút cho một nhịp bị rút biên độ. Có hai điểm neo *định hướng*: trang chú
  ý theo tuổi nêu quy tắc "2–3 phút cho mỗi năm tuổi" (trẻ 9–10 tuổi giữ nhịp cỡ **18–30 phút**), và bản tổng
  hệ thống 'active school breaks' kết luận vận động vừa–nặng cải thiện chú ý rõ hơn ngồi yên — cả hai chỉ nói
  *chiều* (nhịp yếu thì nên tới sớm hơn), **không** chỉ ra con số 8. Dự án chọn 8 vì nó nằm dưới cả hai ngưỡng
  10–25 phút của tài liệu brain-break (vòng 15) lẫn cận dưới 18 phút của quy tắc theo tuổi, lấy cho một nhịp
  biên-độ-nhỏ; số phút dôi ra được bù vào trần tổng (3 → 4 phút) để không cắt bước VẬT THẬT. Bản tổng hệ thống
  đó cũng nói rõ "tính không đồng nhất của giao thức ngăn chốt liều chuẩn xác", nên repo cố tình không bịa một
  con số nào thành "chuẩn khoa học".
- **Ngưỡng "thường xuyên lọt" của `detectionEquity` (2 em phải cộng tay trong một nhịp, hoặc 3 nhịp liên tiếp
  máy thấy thấp hơn rõ rệt số tay cô quan sát)** — đây là **lựa chọn của dự án**, không nguồn nào quy định một
  bàn tay da sẫm hay tay nhỏ thì mô hình bỏ sót bao nhiêu %. Hai nguồn chỉ dựng được *hướng* rủi ro, không phải
  *định lượng cho HandLandmarker*: tài liệu nhận diện tư thế tay (arXiv 2406.03599) nói bàn tay da sẫm
  "underrepresented" trong bộ dữ liệu OneHand10k và điều đó "biasing models toward homogeneous populations",
  còn Gender Shades đưa con số lệch lớn (0,8% → 34,7%) nhưng là trên **khuôn mặt** của hệ nhận dạng thương
  mại, không phải trên bàn tay. Dự án cố ý KHÔNG nhân hai con số đó thành "HandLandmarker sai X% với em da
  sẫm" — thay vào đó ra một ngưỡng HÀNH VI cho cô (bao nhiêu lần phải cứu bằng nút cộng tay thì đổi kênh), vì
  thứ đo được trong một lớp thật là "máy có theo kịp mắt cô không", không phải độ chính xác thống kê của mô
  hình. Ngưỡng 2 và 3 nhịp chọn thấp để một em liên tục bị lọt không phải chịu nhiều nhịp bị ghi sai.
- **Mặc định an toàn "CHUNG MÀN" và mốc ẩn ≤ 0,3 giây của `privateView`** — vòng 20 không có số liệu ngoại
  vi nào về tỉ lệ lớp soi gương, nên hai con số đều là **lựa chọn của dự án**: mặc định CHUNG MÀN vì đó là giả
  định ĐÚ khi chưa biết (một file HTML không đọc được topology, thà giả định thứ an toàn hơn cho học sinh);
  0,3 giây là mốc "nhanh hơn một cái chớp mắt của cả lớp" để giữ-phím-để-xem không bao giờ để lộ dòng riêng
  khi cô buông tay giữa lúc 35 em đang nhìn. Cách hỏi một dòng không đoán cũng mô phỏng đúng `powerCut`
  ("máy đang cắm điện hay chạy pin?") — cùng nguyên tắc: không có API tin cậy thì hỏi người dùng một câu tiếng
  Việt, không đoán.
- **Dòng nghỉ 2 phút (thường) / 3 phút (chật) và nhịp tự co 15 giây của `breakReserve`** — vòng 21 không lấy
  số từ một nghiên cứu nào, mà lấy từ **chính phép cộng nội bộ**: để `movementBreak` (≤ 3′, `tightRoomFocus`
  ≤ 4′) và `exitTicket` (2′ vé) cùng sống trong VẬN DỤNG (3–5′) thì phần nghỉ phải tụt xuống **2′** ở nấc
  thường và **3′** ở nấc chật (tương ứng `movementBreak` và `tightRoomFocus` cũ), nhờ vậy nghỉ(≤ 3–4) + vé(2)
  vẫn đóng được trong trần 5′ của VẬN DỤNG mà không cắt VẬT THẬT. Khoảng 1–5 phút mà Understood nêu cho mỗi
  nhịp brain-break chỉ *chặn trên*; con số 2/3 cụ thể là dự án chọn. Nhịp **15 giây** là phiên bản tối-thiểu
  khi "Còn 2 phút": đủ cho ba hơi thở + vươn tay quá đầu — vẫn là Toán theo đúng tinh thần `movementBreak` —
  mà không nuốt vé. Thứ tự rút (timeSlack-dôi → VẬN DỤNG trên 2′ vé → LUYỆN TẬP 12→10) cũng là lựa chọn của
  dự án, ưu tiên hy sinh phần *luyện thêm* trước phần *kiểm tra cuối tiết*.
- **"Đúng năm bước", "10 việc · một trang A4" và trần "+2 phút" mỗi nhành của `rehearsalBudget`** — vòng 22
  không bịa số mới mà **giữ nguyên** ba con số đã có trước đó: năm bước là mạch bài của `flow` (Khởi động ·
  Vật thật · Sơ đồ · Phép tính · Luyện tập), 10 việc là danh sách gốc của `rehearsal`, và cả hai bị chính các
  lệnh "thêm một bước" làm lệch. Điểm mới là **phong** chúng lại (không một bước camera nào vào Nhành A, phiếu
  không phình quá 10 việc) chứ không tăng trần. Trần **"+2 phút cho mỗi nhành B/C"** là **lựa chọn của dự án**:
  Nhành B có thao tác camera thật (bật, đưa tay vào, đọc kết quả, tắt) nên nhiều hơn một cú bấm, nhưng phải
  đủ nhỏ để cả ba nhành vẫn gọi là "một lượt chạy thử buổi tối" chứ thành một buổi tập huấn. Không nguồn ngoài
  nào quy định con số này; nó chỉ khoá để chữ "5 phút" của `rehearsal` không bị ba phép cộng âm thầm làm thành
  nói khoác.

## Nguồn đọc cho từng cụm quy định

**Trình tự vật thật → sơ đồ → phép tính (khung CRA, ba chặng của bảng phấn)**
- [Concrete, Representational, Abstract (CRA) — Mathematics Hub (Úc)](https://www.mathematicshub.edu.au/plan-teach-and-assess/teaching/teaching-strategies/concrete-representational-abstract-cra/)
- [Using the CRA Framework in Elementary Math — Edutopia](https://www.edutopia.org/article/using-cra-framework-elementary-math/)
- [Concrete–Representational–Abstract (CRA) Instructional Approach — Education Sciences (MDPI)](https://www.mdpi.com/2227-7102/13/10/1061)
- [CRA và VRA (Virtual-Representational-Abstract) — Kapor Foundation](https://kaporfoundation.org/strategies_guide/cra-concrete-representational-abstractvra-virtual-representational-abstract/)

**Làm mẫu rồi che dần (worked example + fading)**
- [Worked-example effect — Wikipedia](https://en.wikipedia.org/wiki/Worked-example_effect)
- [Evidence from the Worked Example Effect (Booth, Meljan & cộng sự) — ERIC ED566953](https://files.eric.ed.gov/fulltext/ED566953.pdf)
- [The effect of worked examples on learning solution steps — Taylor & Francis 2023](https://www.tandfonline.com/doi/full/10.1080/01443410.2023.2273762)
- [Incorporating faded worked-examples into the mathematics classroom — Oxford University](https://ora.ox.ac.uk/objects/uuid:c2ccd457-2953-4d38-bbc9-23f99267c7a6/files/mb6f3a869d19533fcb1ef3675ad0e45d3)

**Nghĩ riêng → nói với bạn → chia trước lớp, và thời gian chờ**
- [How effective is Think Pair Share? — Durrington Research School](https://researchschool.org.uk/durrington/news/how-effective-is-think-pair-share)
- [Think, Pair, Share — Center for Teaching and Learning, University of Kent](https://www.kent.edu/ctl/think-pair-share)
- [Think, Pair, Share: a three-step collaborative learning strategy — Chartered College of Teaching](https://my.chartered.college/research-hub/think-pair-share-a-three-step-collaborative-learning-strategy-that-helps-pupils-consider-questions-in-more-depth/)

**Vé kết thúc tiết**
- [Classroom exit slips for formative assessment — Australian Educational Research](https://www.edresearch.edu.au/guides-resources/practice-resources/classroom-exit-slips)
- [Gaining Understanding of What Your Students Know — Edutopia](https://www.edutopia.org/practice/exit-tickets-checking-understanding)
- [Iteratively-Designed Exit Tickets Enhance Student Learning — Taylor & Francis 2024](https://www.tandfonline.com/doi/full/10.1080/87567555.2024.2355210)

**Camera trong lớp học: đồng ý, ghi hình, equity**
- [Cameras On or Off? A Critical Analysis of Privacy, Equity — Education Sciences (MDPI)](https://www.mdpi.com/2227-7102/16/2/256)
- [Recommendation on camera surveillance in school — ÚOOÚ (Cơ quan bảo vệ dữ liệu Séc)](https://www.entserv.eu/uoou-publishes-recommendation-on-camera-surveillance-in-school/)
- [Privacy Dos and Don'ts for online learning in public K-12 classes — NPC Philippines](https://privacy.gov.ph/npc-phe-bulletin-no-16-privacy-dos-and-donts-for-online-learning-in-public-k-12-classes/)
- [On or off? California schools weigh webcam concerns — EdSource](https://edsource.org/2020/on-or-off-california-schools-weigh-webcam-concerns-during-distance-learning/638984)

**Nhận diện tay trên thiết bị lớp học**
- [MediaPipe Hands: On-device Real-time Hand Tracking — arXiv 2006.10214](https://arxiv.org/abs/2006.10214)
- [On-Device, Real-Time Hand Tracking with MediaPipe — Google Research](https://research.google/blog/on-device-real-time-hand-tracking-with-mediapipe/)
- [Bản đầy đủ có hình của bài báo — ar5iv 2006.10214](https://ar5iv.labs.arxiv.org/html/2006.10214) — nguồn của câu "palm detector operates on a full input image" và "large scale span (~20x)".

**Đặt camera nhận diện tay ở đâu (mới đọc vòng 9, các trang này KHÔNG có bảng số nào)**
- [Webcam Hand Tracking Camera Setup — Lighting and Framing](https://gesturesynth.me/webcam-hand-tracking-camera-setup/)
- [Camera Setup for Hand Tracking: Framing and FPS](https://neural-lab.com/blog/camera-setup-for-hand-tracking)
- [Camera Placement — Ultraleap documentation](https://docs.ultraleap.com/touchfree-user-manual/camera-placement.html)
- [How to choose a webcam? The viewing angle](https://www.onedirect.co.uk/content/video-conferencing/webcam/angle-of-view) — trang duy nhất trong nhóm này có con số (góc nhìn phổ biến 60°/78°/90°, camera phòng 90–120°).
Ghi lại để người sau khỏi mất công: ba trang đầu được mở bằng trình duyệt trong vòng 9 và không trả về
khoảng cách làm việc, ngưỡng cỡ bàn tay hay FPS nào. Nếu cần số thật thì phải tự đo, đừng trích lại các
trang đó như thể chúng có số.

**Máy trong trường: không quyền quản trị, không cài phần mềm**
- [Allowing teachers to install software on school PCs — Spiceworks Community](https://community.spiceworks.com/t/allowing-teachers-to-install-software-on-school-pcs/569567)
- [Allow non-admin users access to apps — Microsoft Tech Community](https://techcommunity.microsoft.com/discussions/windows11/allow-non-admin-users-access-to-apps/4296087)

**Em không giơ được tay, không đi lại được: lớp học hoà nhập**
- [Inclusive Teaching: Physical Disability — ADCET (Úc)](https://www.adcet.edu.au/inclusive-teaching/specific-disabilities/physical-disability)
- [Teaching Students with Physical Disabilities — Accessible Campus (Canada)](https://accessiblecampus.ca/tools-resources/educators-tool-kit/teaching-tips/teaching-students-with-physical-disabilities/)

**Ai được gọi lên bảng: chọn ngẫu nhiên có kiểm soát, không chọn em xung phong mãi**
- [Does Cold Calling Work? Here's What the Research Says — Edutopia](https://www.edutopia.org/article/does-cold-calling-work-heres-what-the-research-says/)
- [Constructing a Framework of Random Call Components — PMC (research về gọi tên ngẫu nhiên)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8697661/)
- [Equity Sticks — EducationCloset / eEducation protocols](https://www.eleducation.org/curriculum/protocols/equity-sticks/)
- [Engage Every Student with 'Pull a Stick' — DataWorks](https://dataworks-ed.com/blog/2025/06/engage-every-student-with-pull-a-stick/)
Bốn nguồn này là lý do `boardEquity` tồn tại (phải biết em nào chưa lên), nhưng chúng **không** dẫn đường
cho chi tiết gây tranh cãi nhất: gọi tên ngẫu nhiên thô (equity sticks) khác với quyền được im lặng. Ở
đây chọn nửa sau — bộ đếm để cô tự cân đối, không phải quay số trước 35 em, và tuyệt đối không phát tên
công khai ai chưa lên lần nào.

**Cô tập dượt trước khi lên lớp**
- [Rehearsing Lessons Together Helps Teachers Build Good Habits — Edutopia](https://www.edutopia.org/article/rehearsing-lessons-together/)
- [Using role play to strengthen teaching practice — Education Endowment Foundation](https://educationendowmentfoundation.org.uk/news/eef-blog-rehearse-and-repeat)
- [Rehearsal: Turning practise into action — Evidence to Action (Victoria, Úc)](https://arc.educationapps.vic.gov.au/learning/sites/evidence-to-action/11697)
Đó là chỗ dựa của nút "Chạy thử 5 phút": dụng cụ dạy học mà chỉ chạy được khi có lớp đứng trước thì
không ai dám thử lần đầu.

**Giáo án là đồ dùng chung của tổ chuyên môn**
- [Những tiết dự giờ được chuẩn bị quá kỹ, vậy có nên tiếp tục duy trì? — Giáo dục Việt Nam](https://giaoduc.net.vn/nhung-tiet-du-gio-duoc-chuan-bi-qua-ky-vay-co-nen-tiep-tuc-duy-tri-post240669.gd)
- [Sinh hoạt chuyên môn theo hướng nghiên cứu bài học — Trường Tiểu học Trường Thạch (Hà Nội)](http://thtruongthachdab.giaoducmelinh.edu.vn/tin-tuc-su-kien/tin-cua-truong/sinh-hoat-chuyen-mon-theo-nghien-cuu-bai-hoc-to-1.html)
Hai bài này là lý do `lessonStudy` yêu cầu phiếu dự giờ ghi theo **việc học sinh đã làm** (bước nào dừng
lâu, câu nào sai theo nhãn lỗi nào) thay vì ghi theo cảm giác về tiết dạy — chính là chỗ sinh hoạt
chuyên môn theo nghiên cứu bài học khác với dự giờ kiểu cũ.

**Máy thật trong lớp học: không máy chiếu, máy cũ, trình duyệt khác nhau**
- [Secure contexts — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts) — `getUserMedia` chỉ chạy trên HTTPS hoặc `localhost`; mở file giáo án bằng `file://` hay HTTP thì camera mất mà không có lỗi nào của model cả, nên `browserCompat` phải thử đúng ba đường mở.
- [MediaDevices: getUserMedia() — MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) — các lỗi `NotAllowedError`, `NotFoundError`, `NotReadableError` là tên tiếng Anh; quy định yêu cầu dịch ra tiếng Việt kèm cách xử lý.
- [Browser detection using the user agent string — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Browser_detection_using_the_user_agent) — cơ sở cho "không khai phiên bản trình duyệt, chỉ kiểm năng lực rồi tự lùi về chuột".
- [Exploring the issue of digital divide in teaching and learning (BYOD classrooms) — Queen's University Belfast](https://pure.qub.ac.uk/files/187871215/BYOD_Classrooms_Digital_Divide_Issues_Revision_4.pdf)
- [Education Equity in Crisis: The Digital Divide — The Education Trust](https://west.edtrust.org/resource/education-equity-in-crisis-the-digital-divide/) — thiết bị trong lớp không đồng đều là chuyện hệ thống, không phải ngoại lệ, nên chế độ không màn chiếu và "Chạy nhẹ" là đường dạy chính chứ không phải phần cứu hộ.

**Sĩ số một lớp tiểu học Việt Nam: chuẩn 35, thực tế cao hơn (đo vòng 11)**
- [Bộ GD&ĐT chỉ đạo sĩ số tiểu học không quá 35 học sinh/lớp — thực tế khó thực hiện — Báo Đầu tư](https://baodautu.vn/bo-gddt-chi-dao-si-so-tieu-hoc-khong-qua-35-hoc-sinhlop-thuc-te-kho-thuc-hien-d221653.html)
- [Phụ huynh Hà Nội mong sĩ số 35 học sinh/lớp nhưng biết là không dễ đạt — Giáo dục Việt Nam](https://giaoduc.net.vn/phu-huynh-ha-noi-mong-si-so-35-hoc-sinhlop-nhung-biet-la-khong-de-de-dat-post244628.gd)
- [Quy định sĩ số lớp ở tiểu học không quá 35, chuyên gia nói gì? — VietnamNet](https://vietnamnet.vn/quy-dinh-si-so-lop-o-tieu-hoc-khong-qua-35-chuyen-gia-noi-gi-2308652.html)
- [Yêu cầu sĩ số lớp tiểu học không quá 35 học sinh liệu có khả thi? — ANTV](https://antv.gov.vn/xa-hoi-4/quy-dinh-truong-tieu-hoc-si-so-khong-qua-35-hoc-sinh-tren-lop-kho-thuc-hien-F55D7EAE8.html)
Bốn bài này là toàn bộ căn cứ của `bigClass`: 35 là **chuẩn xếp lớp**, không phải sĩ số điển hình, nên nó
không được đứng ở vị trí một con số đo được. Lưu ý các bài không đưa một phân bố sĩ số nào (không có "% lớp
trên 45"), nên `bigClass` chỉ đặt ngưỡng 40 em và nói rõ đó là ngưỡng do dự án chọn.

**Giữ màn hình sáng suốt tiết (Screen Wake Lock)**
- [Screen Wake Lock API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)
- [Stay awake with the Screen Wake Lock API — Chrome for Developers](https://developer.chrome.com/docs/capabilities/web-apis/wake-lock)
- [WakeLock — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WakeLock)
- [Wake Lock Demo — MDN dom-examples](https://mdn.github.io/dom-examples/screen-wake-lock-api/)
Hai trang đầu là căn cứ cho đúng hai câu trong `powerCut`: phải xin lock lại sau khi trang mất tiêu điểm,
và phải kiểm tra sự có mặt của API thay vì giả định. Máy chiếu tự tắt nguồn thì API không cứu được — đó là
lý do quy định này đặt bản in lên trước wake lock.

**Vật thật tự làm, giá rẻ khi lớp không có bộ đồ dùng**
- [Foundation phase teachers' use of manipulatives to teach — South African Journal of Education (SAJCE)](https://sajce.co.za/index.php/sajce/article/view/495/869)
- [Development and Validation of Locally Sourced Math Manipulatives — AJARR](https://journalajarr.com/index.php/AJARR/article/view/963)
- [Teaching resources: Using manipulatives in mathematics learning — ACER](https://people.acer.org/en/publications/teaching-resources-using-manipulatives-in-mathematics-learning)
Nhóm này trả lời câu "không có đồ dùng thì có dạy được vật thật không" bằng đúng hướng `paperProps` chọn:
đồ tự làm tại chỗ vẫn được tính là vật thật, với điều kiện giữ nguyên đơn vị đếm. Các bài không so sánh
điểm số giữa đồ tự làm và bộ kit mua sẵn, nên không dòng nào trong repo này nói "đồ giấy tốt bằng đồ nhựa".

**Lớp làm xong sớm: không thưởng bằng thêm bài, cho chọn và đào sâu (đo vòng 12)**
- [Your Student Finished Early — Now What? — Edutopia](https://www.edutopia.org/article/fast-finishers-school-keeping-students-any-grade-engaged/) — bài này là căn cứ trực tiếp cho câu "không bao giờ 'thêm 10 câu'" và cho ý "cho em chọn theo thực đơn hoạt động có chủ đích thay vì luyện tập lặp lại": tác giả viết rõ việc giao thêm bài giống hệt là một cuộc chạy đua tích luỹ điểm thay vì xây kỹ năng.
- [Going Deeper: Achieving greater depth in the primary classroom — NRich (Cambridge)](https://nrich.maths.org/going-deeper-achieving-greater-depth-primary-classroom) — nguồn của ý "cùng đáp số, khác cách": đào sâu bằng cách biểu diễn khác, không bằng số câu nhiều hơn.
- [Simple and meaningful activities for early finishers — Truth for Teachers](https://truthforteachers.com/simple-and-meaningful-activities-for-early-finishers/)

**Nhịp tiết dạy: cháy giờ và thừa giờ là hai bài toán khác nhau**
- [Pacing and time allocation at the micro- and meso-level within the class hour — ResearchGate](https://www.researchgate.net/publication/47446874_Pacing_and_time_allocation_at_the_micro-_and_meso-level_within_the_class_hour_Why_pacing_is_important_how_to_study_it_and_what_it_implies_for_individual_lesson_planning) — nghiên cứu về cách phân phối giờ trong một tiết và hàm ý cho việc soạn bài.
- [Unpacking the "Pace" Problem: Moving Beyond a Vague Target — University of Newcastle teacher training](https://uonhistoryteachertraining.school.blog/2025/03/11/unpacking-the-pace-problem-moving-beyond-a-vague-target/) — "pace" là mục tiêu mơ hồ nhất trong sổ dự giờ; `timeSlack` dịch nó thành hai con số đo được ("đã dùng X · còn Y") và ba kịch bản bấm được.
- [Always feel rushed in class? — Truth for Teachers (podcast)](https://truthforteachers.com/truth-for-teachers-podcast/time-management-in-classroom-teaching/)

**Làm việc theo nhóm trong Toán tiểu học**
- [How I Get Kids to Actually Participate in Math Group Work — Edutopia](https://www.edutopia.org/article/math-group-work-participation/)
- [Using Roles in Group Work — Center for Teaching and Learning, WashU](https://ctl.wustl.edu/resources/using-roles-in-group-work/)
- [Collaborative learning approaches — Education Endowment Foundation](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/collaborative-learning-approaches) — **trang này trả về 403 khi mở bằng công cụ trong vòng 12**, nên repo chỉ dùng nó làm đầu mối tra cứu, không trích bất kì con số tiến bộ nào của EEF.
- [The Collaborative Math Classroom — Heinemann](https://www.heinemann.com/blog/the-collaborative-math-classroom-a-vision-of-teaching-and-learning-mathematics)
Bài của Edutopia đáng chú ý ở một chỗ: tác giả kể lại một tiết nhóm mà "không ai được giao vai trò" và kết quả là
chỉ vài em nói. `groupWork` vì thế bắt buộc bốn vai trò gắn với vị trí ngồi, và bắt mỗi em viết đáp án riêng
trước khi nhóm chốt — đó là phần "trách nhiệm cá nhân" mà các tài liệu nhóm đều nhắc, chứ không phải sáng kiến
của dự án này.

**Định dạng số theo ngôn ngữ: vì sao phần thập phân phải là dấu phẩy (đo vòng 13)**
- [Intl.NumberFormat — JavaScript — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) — nguồn của chính API được quy định dùng, và của việc nó in ra theo locale chứ không theo ý người viết code.
- [Number, currency, and unit formatting — W3C i18n QA](https://w3c.github.io/i18n-drafts/questions/qa-number-format.en.html) — tài liệu này trả lời thẳng câu "dấu chấm hay dấu phẩy là mặc định?": **không có mặc định toàn cầu**, dấu phân cách đổi theo ngôn ngữ/vùng. Căn cứ cho cả mục (1) và (2) của `numberFormat`.
- [Number formatting — Data visualisation guide, Liên minh Châu Âu](https://data.europa.eu/apps/data-visualisation-guide/number-formatting) — một bảng khác về cùng một việc: cùng một con số, hai cách viết, và cách sai thì người đọc hiểu sai.
- [Hàng của số thập phân. Đọc, viết số thập phân — VietJack (Toán 5)](https://vietjack.com/toan-5-kn/ly-thuyet-hang-cua-so-thap-phan-doc-viet-so-thap-phan.jsp) và [bản của Loigiaihay](https://loigiaihay.com/ly-thuyet-hang-cua-so-thap-phan-doc-viet-so-thap-phan-c109a14568.html) — cách SGK lớp 5 yêu cầu viết và đọc, tức là thứ mà bảng của công cụ phải khớp. Hai trang này là tài liệu tham khảo phổ thông, không phải văn bản chuẩn của Bộ.
Phần kiểm chứng được của quy định (không cần tin ai): `Intl.NumberFormat('vi-VN').format(0.5)` → `"0,5"`, `parseFloat('0,5')` → `0`, `Number('1.234,5')` → `NaN`, `(0.5).toFixed(1)` → `"0.5"`.

**Trả bài và chữa bài: sửa bằng nhận xét, không sửa hộ, không tô đỏ (đo vòng 13)**
- [What does research tell us about effective marking in maths? — Chartered College of Teaching](https://my.chartered.college/research-hub/what-does-research-tell-us-about-effective-marking-in-maths/) — căn cứ trực tiếp cho trang bảng hai cột: nhận xét chỉ ra *cách làm* chứ không chỉ đóng dấu đúng/sai, và học sinh tự sửa phần của mình.
- [There's More to Math Feedback Than 'Correct' and 'Incorrect' — Edutopia](https://www.edutopia.org/article/theres-more-math-feedback-correct-and-incorrect/) — nguồn của câu "không có dòng 'bài của em … sai'".
- [Developmental Marking and Feedback Policy — Brighton Academy (PDF)](https://resources.finalsite.net/images/v1601457616/brightonacademiestrustorguk/yijgbys5n9wantrtbnwo/lin-assessment-policy-appendix-1-developmental-marking-and-feedback-policy.pdf) — một chính sách marking cụ thể của trường: mã lỗi thống nhất và học sinh viết câu trả lời lại. `loiViet` lấy cảm hứng từ cách làm này; **danh sách nhãn của mỗi cụm vẫn do `tools/data/error-notes.mjs` cấp (2–3 nhãn), không lấy số từ tài liệu**.
- [Marking and Feedback: Is Whole Class Feedback the Answer? — British School Voices](https://voices.britishschool.nl/2020-03-05/marking-and-feedback-is-whole-class-feedback-the-answer/) — "whole class feedback" là chữa cả lớp thay vì chấm từng bài, tức là hình dạng của nút "Chữa bài".
- [Is green the new red? — British Council France](https://www.britishcouncil.fr/blog/green-new-red-how-does-colour-we-use-correct-students%E2%80%99-work-influence-their-perceptions-0) và [Should you switch from red ink to blue ink for marking? — Strategy Education](https://strategyeducation.co.uk/should-you-switch-from-red-ink-to-blue-ink-for-marking/) — hai bài bàn về tác động cảm xúc của mực đỏ. Repo chỉ dùng chúng làm căn cứ *phong cách* (phấn trắng, hai cột đặt cạnh nhau, không tô đỏ), **không trích số liệu** từ chúng; nghiên cứu "Seeing red" trên ScienceDirect đo cảm nhận về người chấm chứ không đo kết quả học.
- [Spacing and retrieval — Australian Education Research Organisation](https://www.edresearch.edu.au/summaries-explainers/explainers/spacing-retrieval) và [Evidence of the Spacing Effect (PMC8759977)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8759977/) — căn cứ cho việc `repairWork` đặt bước chữa bài ở **tiết tiếp theo** của cùng lớp chứ không ở cuối tiết vừa dạy: để bài "nguội" một chút rồi mới chữa thì nhớ lâu hơn. Hai nguồn nói về nguyên tắc, không có ngưỡng phút nào cho lớp Việt Nam.
- [Không trả bài kiểm tra cho học sinh, phụ huynh dễ nghi ngờ giáo viên thiên vị — Giáo dục & Thời đại](https://giaoduc.net.vn/khong-tra-bai-kiem-tra-cho-hoc-sinh-phu-huynh-de-nghi-ngo-giao-vien-thien-vi-post227523.gd) — bối cảnh Việt Nam cho câu "phiếu phải quay lại tay các em": ở trường phổ thông Việt Nam việc trả bài là một kỳ vọng của phụ huynh, nên quy định bắt buộc một bản in có giá trị (phiếu của em + trang đáp án của cô) thay vì chỉ lưu trên máy.

**Em trở lại sau giờ vắng: một lộ trình ngắn, không hỏi lý do trước lớp (đo vòng 13)**
- [Helping Students Return From a Long Absence — Edutopia](https://www.edutopia.org/article/students-returning-extended-absence/)
- [Seven Ways to Help Students Catch Up After a School Absence — Two Writing Teachers](https://twowritingteachers.org/2022-10-03/seven-ways-to-help-students-catch-up-after-a-school-absence/) — nguồn của ý "ba việc của bài trước" thay vì "chồng phiếu": bắt lại đúng những gì lớp đã làm, không dạy lại cả bài.
- [How do we help absent students catch up? — Meet Every Learner's Needs](https://meeteverylearnersneeds.substack.com/p/how-do-we-help-absent-students-catch)
Cả ba đều bàn về vắng dài ngày, nhiều tuần; `latePupil` rút phần dùng được cho một buổi (dựng lại đúng ba bước đã làm từ bài đã lưu, cho xem lúc lớp đang làm bài, không dạy lại từ đầu) và giữ nguyên phần mà chúng cảnh báo: không biến em thành người phải giải thích trước lớp ngay phút vừa tới.

**Học sinh nói tiếng Việt như ngôn ngữ thứ hai: đổi cách nói, không đổi Toán (đo vòng 14)**
- [Adapting Math Word Problems for ELLs — Edutopia](https://www.edutopia.org/article/teaching-word-problems-ells/) — căn cứ trực tiếp cho `homeLanguage`: bài nêu khẩu hiệu "change the language, not the math" (rút văn thừa, chia câu ghép, đổi thì đơn giản, thay thuật ngữ bằng từ thường) và khuyên dùng "mathematical models and manipulatives" để giảm gánh chữ. **Không** đưa ngưỡng số chữ nào, nên "≤ 8 chữ" vẫn là con số dự án tự chọn.
- [5 Powerful Math Strategies for Multilingual Learners — ASCD](https://www.ascd.org/blogs/5-powerful-math-strategies-for-multilingual-learners) — nguồn của nhịp cho em diễn đạt bằng cách khác ngoài nói/đọc.
- [Engaging multilingual learners in mathematics — WIDA (University of Wisconsin)](https://wida.wisc.edu/news/engaging-multilingual-learners-mathematics) và [Math Instruction for English Language Learners — Colorín Colorado](https://www.colorincolorado.org/article/math-instruction-english-language-learners) — nền cho phần cấm "gọi em đọc to đề để rèn ngôn ngữ" và cấm dán bản dịch: cả hai đều bàn về giữ nội dung Toán trong tầm với của em thay vì biến giờ Toán thành giờ đọc. Repo không nhân số liệu tiến bộ nào từ các trang này.

**Bảng con khi lớp không có bảng con (đo vòng 14)**
- [Mini whiteboards — Chartered College of Teaching](https://my.chartered.college/wp-content/uploads/2018/10/9.-Mini-Whiteboards.pdf) — một bài "so what" gọn về vì sao mặt phẳng viết cá nhân giúp mọi em cùng trả lời thay vì vài em xung phong. Đây là căn cứ *nguyên tắc* cho `noSlate`, không phải nơi lấy số 15 × 20 cm hay 20 giây.
- [6 Ways to Use Clipboards and Whiteboards to Boost Participation — Edutopia](https://www.edutopia.org/article/low-tech-student-participation-tools-increase-participation/) — ý "low-tech participation tool": khi không có bảng thì giấy/bìa/nắp vẫn dùng được, đúng bốn mặt phẳng mà `noSlate` liệt kê.
- [Mini Whiteboards: 8 Whole-Class Checks (and When Not To) — Structural Learning](https://www.structural-learning.com/post/mini-whiteboards-classroom-teachers-guide) — phần "when not to" khớp với cảnh báo của `noSlate` về kiểm tra quá nhiều lượt biến tiết học thành giờ thi.

**Một lượt in của cả lớp: cỡ chữ và số tờ (đo vòng 14)**
- [Dyslexia-friendly typed formats — Dyslexia Scotland](https://dyslexiascotland.org.uk/dyslexia-friendly-typed-formats/) — nguồn của mức in **≥ 12 pt** ("should be at least 12pt"); trang này cũng nói rõ nghiên cứu **không** cho sans-serif lợi thế nhất quán so với serif, nên `printRun` không ép phông chữ, chỉ ép cỡ chữ và hoa văn phân biệt thay cho màu.
- [Accessible design for print — Ministry of Social Development (New Zealand)](https://msd.govt.nz/about-msd-and-our-work/work-programmes/accessibility/accessibility-guide/design-for-print.html) — cùng hướng dẫn về khoảng trắng và tương phản khi in một màu, củng hộ thêm cho quy tắc "phân biệt bằng hoa văn chứ không bằng màu".
- [Font Legibility for Students who are Blind or Visually Impaired — Teaching Visually Impaired](https://www.teachingvisuallyimpaired.com/font-legibility.html) — mở ra **không lấy được nội dung** ở phiên đo này nên **không** trích số từ trang; ghi lại để người sau thử lại. Số tờ ("45 em → 23 tờ") và bậc 8 → 6 → 4 vẫn là phép chia và lựa chọn của dự án, không có nguồn in ấn nào đằng sau.

**Nhịp vận động giữa tiết cho chú ý tiểu học (đo vòng 15)**
- [Brain breaks: An evidence-based behavior strategy — Understood](https://www.understood.org/en/articles/evidence-based-behavior-strategy-brain-breaks) — nguồn của dải **"sau 10–25 phút làm việc tập trung"** và độ dài mỗi nhịp **"one to five minutes"**; hai con số này đứng trực tiếp sau ngưỡng 12 phút và nhịp 1–3 phút của `movementBreak`.
- [Implementation of Brain Breaks® in the Classroom and Effects on Attention — PMC6025620](https://pmc.ncbi.nlm.nih.gov/articles/PMC6025620/) — đo trên học sinh **lớp 3–5** với nhịp "3–5 phút", ghi nhận cải thiện chú ý và hành vi vào việc; là căn cứ rằng đối tượng của repo (lớp 4–5) nằm đúng mẫu được nghiên cứu, và **không** là nơi lấy số giây 30–90 hay trần tổng 3 phút (hai số đó dự án tự chọn).
- [The Effect of the Brain Breaks Physical Activity Program — MDPI Behavioral Sciences 2026](https://www.mdpi.com/2076-328X/16/5/804) và [A short-medium time point evaluation of active breaks — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1755296625000341) — hai nghiên cứu cùng chiều về interval vận động ngắn; dùng làm bằng chứng *rằng cần nhịp*, không dùng để trích "tăng X% điểm".
Ba dòng sau (`camera TẮT`, "phiên bản ngồi cho cả lớp", "không thi ai đứng nhanh") không lấy từ tài liệu brain-break nào: dòng đầu là **hệ quả bắt buộc** của `privacy` + `cameraGeometry` đã có, hai dòng sau là **áp dụng nguyên tắc** `physicalAccess` (không chỉ mặt em khuyết tật) và `noGame` (không thi đua) sang tình huống đứng–ngồi.

**Khoảng trống sàn của phòng học cho nhịp đứng và xếp hình bằng người (đo vòng 16)**
- [Size of the classroom — Ouders & Onderwijs (Hà Lan)](https://oudersenonderwijs.nl/en/size-of-the-classroom/) — nguồn của con số đối chiếu **"Primary school: 3.5 square meters of floor space per student"**; trang nói rõ đây là **trung bình toàn khuôn viên**, không phải mức tối thiểu cho một phòng lẻ. Dùng để cho thấy ngưỡng 1,8 m²/đầu em của `roomFootprint` nằm thấp hơn nhiều ngay cả so với một mức trung bình toàn trường của nước phát triển, nên không phải yêu cầu xa xỉ. Đây là mốc *so sánh*, không phải nơi lấy ba nấc 1,8/1,2 hay lối đi 60 cm.
- [Tính định mức GV trung học vùng 3, 45 HS/lớp, nhiều nơi phòng học quá chật choáng — Giáo dục & Thời đại](https://giaoduc.net.vn/tinh-dinh-muc-gv-trung-hoc-vung-3-45-hslop-nhieu-noi-phong-hoc-qua-chat-choi-post245818.gd) — bài trong nước dẫn định mức **"phòng học tập phải đạt 1,5 m²/học sinh"** (bậc trung học) và tự tính ra rằng **"diện tích phòng học 48 m², sĩ số khoảng 32 em/lớp mới đúng tiêu chuẩn tối thiểu"**, trong khi quy mô cho phép tới 45 em; chính chỗ vênh đó làm các hoạt động tương tác không còn chỗ đứng. Là căn cứ *bối cảnh Việt Nam* để `roomFootprint` phải có nấc "chỉ đứng-tại-chỗ, bỏ nhịp dịch ngang" khi lớp 45 em chỉ còn ~1,07 m²/đầu em. (Số 1,5 m² và phép chia 48 m²/~32 em lấy nguyên văn từ bài; bài áp cho bậc trung học, dự án suy sang tiểu học theo cùng logic diện tích.)
- Hai nguồn thử mà **không** trích được số: hướng dẫn diện tích của một hãng thiết kế nội thất trường học trả về chỉ mã HTML không có con số, và tài liệu chuẩn Anh (Building Bulletin 103) nằm sau bản PDF không lấy được ở phiên đo. Ghi lại để người sau tìm bản chuẩn xây dựng trường của Việt Nam (QCVN và văn bản định mức của Bộ) thay cho con số nước ngoài.
- Ba ngưỡng **1,8 / 1,2 m²/đầu em và lối đi ≥ 60 cm** là cách dự án chia ba nấc (đầy đủ / đứng tại chỗ / chỉ ngồi), **không** lấy nguyên văn từ nguồn nào ở trên; hai mốc ngoài (3,5 m² Hà Lan, 1,5 m² định mức VN) chỉ dùng để *neo* hai ranh giới đó vào thực tế, còn 60 cm lối đi là ước lượng theo chiều một người đi nghiêng, chưa phải số đo.

**Vì sao nhịp yếu (phòng chật) phải tới sớm hơn (đo vòng 17)**
- [Normal Attention Span Expectations By Age — Brain Balance Centers](https://www.brainbalancecenters.com/blog/normal-attention-span-expectations-by-age) — nêu quy tắc kinh nghiệm "2–3 phút cho mỗi năm tuổi", với trẻ **8 tuổi ≈ 16–24 phút**, **10 tuổi ≈ 20–30 phút**; trang tự nói đây là mức nền và phụ thuộc từng trẻ. Dùng làm *điểm neo*: ngưỡng 12 phút (lớp rộng, nhịp toàn thân) và 8 phút (lớp chật, nhịp đứng-tại-chỗ) đều nằm **dưới** cận dưới ~16 phút ấy, tức là cả hai là lựa chọn "cho nghỉ sớm hơn mức phải", không phải giới hạn chú ý. Đây **không** phải nơi lấy con số 8 (số đó dự án tự chọn).
- [Active School Breaks and Students' Attention: A Systematic Review — PMC8224334](https://pmc.ncbi.nlm.nih.gov/articles/PMC8224334/) — kết luận cùng chiều rằng vận động cường độ vừa–nặng cải thiện chú ý rõ hơn ngồi yên, "một đợt ngắn có thể hiệu quả hơn một đợt dài", và các giao thức thường ngắt những bloc giảng dài. Quan trọng không kém: bản tổng hệ thống **nói rõ tính không đồng nhất của giao thức khiến không chốt được liều chuẩn xác**, nên vòng 17 chỉ mượn *chiều* kết luận (nhịp biên độ nhỏ → bù bằng tần suất) chứ **không** biến 8 phút/20–60 giây/4 phút thành số "khoa học". Ngưỡng của `movementBreak` (vòng 15, từ Understood) vẫn giữ cho lớp rộng; `tightRoomFocus` chỉ hạ nó ở nấc chật của `roomFootprint`.

**Nhận diện bàn tay không công bằng theo màu da/tay nhỏ/ánh sáng (đo vòng 18)**
- [Synthetic Data for Inclusive, Robust, Hand Pose Estimation — arXiv 2406.03599](https://arxiv.org/html/2406.03599v2) — nguồn *trực tiếp đúng modality*: tài liệu ghi bàn tay "darker skin color ... are noticeably underrepresented in OneHand10k" và việc thiếu dữ liệu huấn luyện đó làm giảm chất lượng cho các nhóm bị đại diện ít, "biasing models toward homogeneous populations". Đây là bằng chứng **cùng bài toán (tư thế bàn tay)**, nên là trục chính của `detectionEquity`. Lưu ý trung thực: trang này đưa *hướng* (kém hơn cho tay da sẫm) chứ **không** cho một con số % lỗi riêng cho HandLandmarker — dự án vì thế không trích "sai X%" mà chỉ ra ngưỡng hành vi cho cô.
- [Study finds gender and skin-type bias in commercial AI systems (Gender Shades) — MIT News](https://news.mit.edu/2018/study-finds-gender-skin-type-bias-artificial-intelligence-systems-0212) và [buolamwini18a (PMLR v81)](https://proceedings.mlr.press/v81/buolamwini18a/buolamwini18a.pdf) — bằng chứng kinh điển rằng cùng hệ thị giác thương mại, sai lệch có thể từ "0.8 percent for light-skinned men" lên "34.7 percent for dark-skinned women". **Trung thực về phạm vi: đây là nhận dạng KHUÔN MẶT, không phải bàn tay**; chỉ dùng để cho thấy rủi ro lệch theo màu da là có thật và lớn trong thị giác máy, **không** biến 0,8%/34,7% thành con số cho HandLandmarker.
- Nguồn thử mà **không** định lượng được cho MediaPipe ở phiên đo: một bản đánh giá ["Quantifying Similarities Between MediaPipe and a Known ..." — PMC11683656](https://pmc.ncbi.nlm.nih.gov/articles/PMC11683656/) so MediaPipe với hệ chuẩn nhưng không cho chênh lệch theo màu da; ghi lại để vòng sau nếu có benchmark HandLandmarker theo complexion thì thay ngưỡng hành vi bằng số thật.
- Toàn bộ **ngưỡng của `detectionEquity`** (2 em phải cộng tay bằng tay trong một nhịp, 3 nhịp liên tiếp máy thấy thấp hơn mắt cô) là **lựa chọn của dự án**, không nguồn nào quy định; các nguồn trên chỉ dựng *hướng* rủi ro, không quy mô hoá cho bàn tay.
- [Present on multiple monitors (and view speaker notes privately) — Microsoft Support](https://support.microsoft.com/en-us/powerpoint/present-on-multiple-monitors-and-view-speaker-notes-privately) — nguồn cho `privateView` (vòng 20): tài liệu xác nhận muốn xem ghi chú riêng thì phần mềm phải **chủ động** chuyển "display topology" sang **Extend** ("PowerPoint automatically changes your display settings ... to Extend"). Đây là bằng chứng *cho chiều ngược lại* với giả định im lặng của sáu quy định cũ: nếu ngay PowerPoint chuyên dụng còn phải tự bật hai-màn thì một trang HTML (không có API đổi topology của hệ điều hành) càng không thể mặc định cô đã ở MÀN RIÊNG. Trung thực về phạm vi: nguồn nói về PowerPoint, không phải về HTML/`window.open`; dự án chỉ lấy *nguyên tắc kiến trúc* (xem riêng ⇔ cần Extend), không trích thành số liệu.

Lưu ý cách dùng danh mục này: các trang trên là **nguồn để hiểu vì sao chọn kỹ thuật**, không phải nơi trích
số liệu hiệu quả. Dự án này chưa chạy thử nghiệm lớp học nào, nên không con số nào ở trên được nhân lên
thành "tăng X% điểm".

## Việc còn mở (ghi lại để người sau làm tiếp)

- **Tinh chỉnh One Euro bằng số đo thật.** Bộ lọc đang dùng hằng số tự chọn; cần chuỗi phút dạy thật để
  hồi quy lại `minCutoff`/`beta` cho trẻ 9–10 tuổi.
- **Ngưỡng pinch `≤ 0.06 × khoảng cách cổ tay–ngón giữa (landmark 0–9)`.** Chưa kiểm trên bàn tay học sinh
  tiểu học; nếu sai thì quy định "viết phấn bằng pinch" chỉ chạy được với người lớn.
- **Bộ giáo án Tiếng Anh** — hiện mới phủ Toán 4–5 (39/39 file là Toán).
- **Đo thực địa một tiết 35 phút**: thời gian thật từng chặng, số lượt lên bảng, số vé còn vướng — những gì
  `exitTicket` và dòng tổng kết thu được chính là dữ liệu cho vòng sau.
- **Chưa có số đo về chính cái máy.** Trần 15 FPS, cỡ nút 44 px, 55% khung hình và ba mức thiết bị ở
  `noProjector` đều là phỏng đoán theo cấu hình văn phòng phổ biến. Dự án chưa chạy ở một lớp thật nào,
  nên chưa biết tỉ lệ phòng không có máy chiếu và chưa biết laptop trường thường có bao nhiêu RAM.
- **Nút "Báo cáo máy" chưa có nơi nhận.** Quy định chỉ chép ra bốn dòng để cô dán sang máy khác có mạng;
  vẫn thiếu một kênh (mail, form, issue mẫu) để những dòng đó quay về được với người bảo trì bộ giáo án.
  Không có kênh này thì "chạy được trên máy nào" mãi mãi là phỏng đoán.
- **Chưa đo được độ phủ thật của một webcam trong lớp 35 em.** Ngưỡng "thấy ≥ 2/3 số em" và "dưới 50% sĩ
  số thì dùng bảng con" là số tự chọn; cần một phép đo thật (đặt máy ở ba vị trí, đếm số em vào khung) để
  thay bằng số có nghĩa.
- **Chưa biết `file://` có đọc được model ở những trình duyệt nào.** `noAdmin` cố tình không khẳng định mà
  bắt công cụ phải thử và báo kết quả thật — nghĩa là chính repo này cũng chưa có số liệu, và mục "Báo cáo
  máy" ở trên là con đường duy nhất để có.
- **Theo dõi lượt lên bảng qua nhiều tiết vẫn là phiếu giấy.** `boardEquity` giữ đúng cam kết không lưu tên
  nên bộ đếm chết theo phiên; cây cầu hiện tại là trang A4 "dãy 3, ghế 5" để cô tick tay. Nếu muốn có lịch
  sử lâu dài thì phải quyết định một trong hai: hoặc lưu danh định vị trí ngồi (vẫn là dữ liệu học sinh),
  hoặc chấp nhận không có lịch sử. Đó là quyết định của người dùng cuối, chưa nên tự chốt trong prompt.

- **Phân bố sĩ số thật của một lớp tiểu học Việt Nam chưa ai đo.** `bigClass` chỉ biết rằng chuẩn là 35 và
  lớp đô thị có thể trên 45; ngưỡng 40 em để đổi nấc "Xem thử từ cuối lớp" và để bật mẫu đại diện là ngưỡng
  tự chọn. Nếu có số liệu thật (tỉ lệ lớp trên 45 theo vùng) thì ngưỡng đó phải dịch chuyển, và mọi con số
  khác chia theo M cũng đổi theo.
- **Chưa cắt thử một bộ vật thật bằng giấy.** "một tờ A4 đủ bộ cho bàn 4 em, cắt trong ≤ 10 phút" là ước
  lượng từ kích thước hình trong `props.mjs`. Cần một lần cắt thật để biết hình nào cắt được, hình nào vỡ
  ra vụn vô dụng (đặc biệt là dải phân số mẫu 12 và lưới khối hộp).
- **Wake lock không phải pin.** `powerCut` giữ màn hình sáng chứ không giữ máy chạy; chưa đo laptop trường
  trụ được bao lâu khi rút sạc, nên chưa thể hứa "còn đủ pin cho 35 phút". Bản in vẫn là đường bảo hiểm
  duy nhất đã ghi trong quy định.

- **Nhóm 4 em giả định bàn xếp bốn chỗ.** Nhiều trường tiểu học Việt Nam xếp bàn đôi, và khi đó "một bàn
  bốn em" phải ghép hai bàn — công cụ chưa có nút nào hỏi cô về kiểu xếp bàn. `groupWork` đang suy ra số
  bàn từ sĩ số (45 em → 11 bàn) chứ không từ sơ đồ lớp thật.
- **Hai lượt nhóm có thật sự nhét được vào 12–15 phút LUYỆN TẬP?** Trần "tối đa 2 lượt" là phép chia trên
  giấy. Chưa có một tiết dạy thật nào để biết thời gian xếp lại vai trò và chốt kết quả tốn bao nhiêu,
  và cũng chưa biết lượt thứ hai có bị cô giáo bỏ vì cháy giờ hay không.
- **Kịch bản "Còn 10 phút" có thể cạn câu.** `LESSON_DATA` yêu cầu tối thiểu 6 mục, nên nếu cô đã dùng hết
  trong bốn bước thì không còn "câu chưa dùng" để mở. Hướng sửa đúng là thêm trường chọn thêm (bài đào sâu
  có sẵn dữ liệu, kiểm chứng được như `LESSON_DATA`) vào `tools/data/lessons.mjs` thay vì để công cụ tự bịa
  — hiện tại quy định chỉ nói *nguyên tắc* của ba bài, chưa có dữ liệu chốt cho từng bài.
- **Ngưỡng 8 phút / 3 phút của `timeSlack` chưa dựng theo số đo nào** — xem mục "Vì sao chọn những con số
  đang dùng". Muốn có số thật thì phải ghi lại giờ dùng thật của từng chặng trong vài tiết dạy.
- **Chưa biết bao nhiêu máy có locale `vi-VN`** (đo vòng 13). `Intl.NumberFormat('vi-VN')` chạy được ở mọi
  trình duyệt hiện nay, nhưng **kết quả** phụ thuộc dữ liệu locale của máy; chưa có laptop trường nào được
  đo. Đường lui mà `numberFormat` cho phép (đổi đúng một lần dấu chấm thập phân thành dấu phẩy) vì thế vẫn
  là phỏng đoán chưa thử. Cách làm gọn: mục "Báo cáo máy" (đã mở từ vòng 8) nên in thêm một dòng "số thử:
  0,5 hay 0.5" — một dòng thôi, không cần camera hay mạng.
- **Hàm chuẩn hoá số đầu vào chưa có bảng thử.** Quy định mô tả ba bước (bỏ dấu chấm phân cách nghìn, đổi
  dấu phẩy thành dấu chấm, rồi mới tính) nhưng chưa có danh sách chuỗi bắt buộc đọc đúng. Một bảng vài dòng
  là đủ để vòng sau nhúng vào `verifyLessonBank()`: `0,5` · `0.5` · `1,25` · `1.234,5` · `17,25 cm` ·
  `5/8` · `0,500` · `1,05` — và mỗi dòng phải cho ra đúng số đo mà SGK chấp nhận.
- **Trần 3 nhãn lỗi giờ là số đo, nhưng chưa chắc là số đủ.** `validate.mjs` đã chặn nếu một cụm vượt 3
  nhãn, nghĩa là muốn dạy thêm lỗi (ví dụ "nhầm 1,25 thành 125" cho số thập phân) thì phải xoá một nhãn cũ
  hoặc chủ động nâng trần ở CẢ HAI chỗ (`verifyData`, `repairWork`) — vòng sau nên quyết định theo phiếu
  thật của một lớp chứ không nâng trần trước.
- **Trang "ba việc của bài trước" của `latePupil` chưa có dữ liệu riêng.** Quy định bắt dựng lại từ bài đã
  lưu (vật thật · sơ đồ · phép tính của bài trước), và ba trường đó có sẵn, nhưng chưa kiểm tra rằng với
  cụm hai xe chuyển động (`chuyen-dong-f-d-p`, `chuyen-dong-de`) một trang như vậy vẫn đủ để em bắt kịp —
  bài đó mạch chính là dải thời gian chứ không phải hình chia phần.
- **Bước chữa bài chưa có chỗ trong ngân sách 35 phút.** `repairWork` đặt ở tiết tiếp theo với trần 4 phút,
  còn `pace`/`fullPeriod` không trừ 4 phút đó khỏi chặng nào. Vòng sau phải quyết nó đứng cạnh KHỞI ĐỘNG
  (cắt 4 phút của Khởi động) hay cạnh LUYỆN TẬP (cắt 4 phút của Luyện tập) — hiện tại prompt để trống, tức
  là mỗi công cụ sẽ tự chọn một chỗ khác nhau.
- **"≤ 8 chữ" của nút "Ít chữ hơn" chưa có phép thử nào.** `homeLanguage` nói hai mức rút (≤ 8 chữ, rồi chỉ
  còn hình + số) nhưng chưa có bảng câu bắt buộc rút đúng. Vòng sau nên thêm vào `verifyLessonBank()` một
  khoá: với mỗi `prompt` trong `LESSON_DATA`, chuỗi "ít chữ hơn" phải ≤ 8 chữ và **giữ nguyên mọi chữ số +
  đơn vị + từ quan hệ** có trong bản đầy đủ — rút mà mất số là rút sai. Chưa có lớp thật nào được đo để biết
  8 chữ đã đủ ngắn cho em đọc tiếng Việt như ngôn ngữ thứ hai chưa.
- **Chưa biết bao nhiêu lớp tiểu học Việt Nam không đủ bảng con.** `noSlate` suy ra từ "45 bảng + 45 bút là
  nhiều trường không đủ" chứ chưa có khảo sát; cần một câu hỏi trong "Báo cáo máy" hoặc phiếu dự giờ ("lớp
  này có bao nhiêu bảng con?") để đường mặt-phẳng-thay-thế thành dữ liệu thật thay vì giả định.
- **Bốn mặt phẳng thay thế chưa cắt/úp thử.** "≥ 15 × 20 cm", "viết ≤ 20 giây", "mở ≤ 5 giây", "cô đi nhìn
  3–4 bàn trong ≤ 40 giây" đều là con số tự chọn; cần một lần tập thật với một bàn để biết úp-mở cả lớp có
  vào 5 giây không và mặt sau vở có đủ to để viết một số có hai chữ số hay không.
- **"45 em → 23 tờ" chỉ đúng khi in 2 mặt cho hai em.** `printRun` mặc định in theo bàn, nhưng máy in một mặt
  thì một tờ thành hai tờ → 45 tờ. Chưa có định mức giấy của trường nào để biết ngưỡng "vượt 24 tờ thì gợi ý
  để dành" có ý nghĩa không; nên lấy số tờ thật cô phải chi mỗi tuần trước khi chỉnh ngưỡng.
- **Cỡ chữ 12 pt là mức sàn chứ không phải mức tối ưu.** Nguồn Dyslexia Scotland chỉ nói "at least 12pt"; phiếu
  in hai mặt cho hai em rồi cắt đôi thì mỗi em chỉ còn một phần tư trang, chưa chắc bốn câu 12 pt nhét nổi.
  Cần in thử một phiếu thật để biết số câu tối đa trên nửa trang ở 12 pt, rồi mới chốt bậc 8 → 6 → 4.
- **Nhịp 30–90 giây và trần tổng 3 phút của `movementBreak` chưa dựng theo số đo lớp thật.** Dải "10–25 phút"
  và "1–5 phút" là của tài liệu nước ngoài đo trên lớp 3–5 phương Tây; ngưỡng 12 phút và trần 3 phút ở đây là
  dự án nội suy cho một tiết Việt Nam 35 phút. Muốn có số thật thì phải ghi lại: lớp ngồi được bao lâu trước
  khi rã, một nhịp đổi tư thế thật mất bao nhiêu giây, và cô có phải cắt bước nào vì nghỉ quá dài không.
- **Chưa biết bao nhiêu em trong một lớp không đứng được.** `movementBreak` đưa ra phiên bản ngồi cho cả lớp
  (đúng hướng `physicalAccess`: không chỉ mặt một em), nhưng repo chưa có khảo sát tỉ lệ em đi lại khó khăn ở
  một lớp tiểu học Việt Nam. Con số "một webcam không theo nổi 35 em dịch chuyển" là suy luận hình học, chưa
  phải phép đo.
- **"Đứng = đồng ý một phát biểu" có vô tình lộ em yếu không?** Quy định đã cấm dùng đứng–ngồi để lộ đúng–sai,
  nhưng một câu hỏi "phát biểu nào đúng" vẫn biến nhịp vận động thành phiếu công khai. Vòng sau nên chỉ cho
  phép kiểu câu "em đoán/em nghĩ" ở nhịp này, và cân nhắc để cô đọc đáp án SAU khi cả lớp ngồi xuống để không
  so sánh được ai đứng sớm.
- **Phân bố diện tích phòng học tiểu học Việt Nam chưa ai đo.** `roomFootprint` chỉ có hai mốc neo (3,5 m²
  trung bình toàn khuôn viên của Hà Lan và định mức 1,5 m² cho phòng trung học trong bài Giáo dục & Thời đại);
  dự án chưa khảo sát xem bao nhiêu phòng tiểu học thật đạt 1,8 m²/đầu em, bao nhiêu phòng rớt xuống dưới 1,2.
  Muốn chỉnh ba nấc thì phải có số đo thật của vài lớp (chiều dài × chiều rộng trừ bục và tủ).
- **Ngưỡng 1,8 và 1,2 m² là bucket do dự án chọn, không phải chuẩn xây dựng.** Chúng nằm giữa hai mốc ngoài
  chứ không theo một QCVN nào đã đọc được ở phiên đo; khi tìm ra chuẩn diện tích phòng học tiểu học của Bộ,
  phải thay hai số đó bằng số của chuẩn và giữ nguyên logic ba nấc.
- **60 cm cho lối đi là ước lượng hình người, chưa phải số đo an toàn.** Con số lấy theo "một người đi nghiêng
  qua bạn"; lối thoát hiểm thật của một phòng học thường rộng hơn và do quy định PCCC của trường quyết định,
  không phải prompt. `roomFootprint` cố tình chỉ nhắc "giữ lối thoát thông" chứ không thay thế sơ đồ thoát hiểm.
- **Nhịp đứng–ngồi vẫn có thể lộ em yếu nếu cô công bố đáp án ngay.** Bản hiện tại cấm dùng đứng–ngồi để chỉ
  đúng–sai từng em, nhưng chưa cưỡng chế được thứ tự công bố; hướng đóng lỗ hổng này là ép nhịp chỉ dùng câu
  "em đoán/em nghĩ" và đọc đáp án sau khi cả lớp đã ngồi — đã ghi ở mục trên, vòng sau cần biến thành khoá
  trong `validate.mjs` nếu thêm ví dụ câu vào `LESSON_DATA`.
- **8 phút và 4 phút của `tightRoomFocus` chưa có số đo cho phòng chật.** Không nghiên cứu nào ở phiên đo nối
  "phòng < 1,2 m²/đầu em" với "trẻ 9–10 tuổi giữ chú ý được đúng bao nhiêu phút khi chỉ vận động tại chỗ"; dự
  án nội suy từ *chiều* kết luận (nhịp yếu hơn → tới sớm hơn). Muốn có số thật thì phải ghi ở một lớp chật:
  lớp ngồi được bao lâu trước khi rã khi nhịp chỉ là đứng-tại-chỗ, so với một lớp rộng cùng bài.
- **Đứng-tại-chỗ có thật sự là một "nhịp nghỉ" về sinh lý không?** Bản tổng hệ thống ghi lợi ích chú ý đến chủ
  yếu từ vận động vừa–nặng; một nhịp nhón gót/vươn tay 20–60 giây rất có thể không "reset" được như một vòng
  đi lại. Nếu đo ra đúng là nó yếu thật, hướng sửa đúng không phải hạ ngưỡng mãi xuống (6, 4 phút…) mà là
  đổi chiến lược: dồn nhịp vào đúng chỗ chuyển tiếp vật thật → sơ đồ để việc đổi hoạt động tự nó cho các em
  đứng lên, thay vì một nhịp rời.
- **Nhịp "đứng lên khi số lớn hơn 0,5" có lặp lại lỗi lộ đáp án của vòng 15–16 không.** `tightRoomFocus` nhắc
  camera tắt và không thi đua, nhưng một câu "đứng nếu đồng ý X > 0,5" vẫn có thể thành phiếu đúng–sai công khai
  nếu X là một phát biểu kiểm tra. Quy định cần ép mọi nhịp đếm ở phòng chật về dạng "em đoán / em chọn", và
  chỉ cho công bố đáp án sau khi cả lớp đã ngồi — cùng nguyên tắc đã ghi cho nhịp đứng–ngồi toàn thân.
- **Ngân sách nghỉ của phòng chật chưa chạy thử trên tiết 35 phút.** Tổng nghỉ ≤ 4 phút (`tightRoomFocus`) so
  với ≤ 3 phút (`movementBreak`) + ngưỡng ngồi ≤ 8 phút + năm bước 15–20 phút của `pace`: chưa có lần nào xếp
  lịch thật để biết một tiết chật có nhét đủ nhịp mà **không** phải cắt VẬT THẬT như quy định cấm hay không.
  Đây là bài kiểm tra bằng đồng hồ bấm, thuộc nhóm "đo thực địa một tiết 35 phút" đã mở từ đầu.
- **Chưa có benchmark HandLandmarker theo màu da/tay nhỏ.** Vòng 18 dựng `detectionEquity` trên *hướng* rủi ro
  (tài liệu bàn tay + Gender Shades trên khuôn mặt), chưa có con số % bỏ sót riêng cho HandLandmarker với từng
  nhóm bàn tay. Nếu vòng sau tìm được benchmark đó thì thay ngưỡng hành vi (2 em / 3 nhịp) bằng số đo, và có
  thể đổi khuyến nghị "rẻ nhất" (chuyển bảng con) thành "chỉ cần chỉnh lại độ sáng/góc".
- **Bước tự kiểm độ phủ chưa có giao diện cụ thể.** `detectionEquity` nói cô đưa "vài bàn tay khác nhau" vào
  trước camera, nhưng chưa định nghĩa công cụ hiển thị gì để cô đọc được "máy thấy thiếu": cần một màn hình
  đếm tay thời gian thực có bật/tắt được trong 'Chạy thử', đối chiếu số tay máy nhận với số ngón cô giơ.
- **Không phân loại màu da nhưng cũng không đo được mình có đang bỏ sót ai không.** Cấm lưu màu da là đúng
  `privacy`, nhưng hệ quả là công cụ KHÔNG tự biết "tay da sẫm bị lọt nhiều hơn" — nó chỉ thấy tổng số tay.
  Chỗ dựa duy nhất là mắt cô và nút cộng tay; đây là đánh đổi có chủ đích giữa quyền riêng tư và khả năng tự
  phát hiện thiên kiến, cần người dùng cuối quyết nếu muốn nâng cấp (ví dụ đo theo cụm không định danh).
- **Ngưỡng 2 em / 3 nhịp và việc "chuyển mặc định sang bảng-con" chưa chạy thử ở lớp thật.** giống mọi ngưỡng
  hành vi khác, chưa có một tiết nào đếm xem cô phải bấm cộng tay bao nhiêu lần trước khi nên bỏ kênh camera.
  Dữ liệu này nằm gọn trong mục "Báo cáo máy" đã mở từ vòng 8: in thêm vài dòng "số lần cộng tay/thấy tay" là
  đủ, không cần camera ghi hình hay lưu danh tính.
- **`window.open` hai cửa sổ chưa chạy thử trên máy chiếu thật.** `privateView` (vòng 20) hứa khi chọn MÀN
  RIÊNG thì tách cửa sổ chiếu chỉ-bảng, nhưng chưa có lần nào cắm một máy chiếu thật để biết: trình duyệt
  trường có chặn popup không (dính `noAdmin`), kéo cửa sổ sang màn thứ hai có giữ đúng 16:9 không, và khi rút
  cáp HDMI giữa tiết thì cửa sổ chiếu chết kiểu gì. Nếu popup bị chặn phổ biến thì đường MÀN RIÊNG gần như vô
  dụng và toàn bộ rơi về nhánh CHUNG MÀN giữ-phím-để-xem — kiểm tra thực địa này nằm cùng nhóm "chạy trên máy
  thật" đã mở từ vòng 8.
- **Không đọc được topology thật, nên mặc định có thể sai một cách vô hình.** `powerCut` hỏi cắm-điện/pin vì
  `getBattery` tồn tại (dù không phổ biến); còn chế độ SOI/MỞ RỘNG thì **không** có API web nào đọc được, nên
  `privateView` buộc phải tin câu trả lời của cô. Nếu cô bấm MÀN RIÊNG nhưng Windows vẫn đang Duplicate thì
  dòng riêng vẫn lộ mà công cụ không hay biết. Nút "Kiểm tra riêng tư" chỉ là bản soi của CHÍNH cửa sổ đang
  mở, không phải bằng chứng máy chiếu thấy gì — vòng sau nên nghĩ cách để cô xác nhận chéo (ví dụ một hình
  chỉ hiện trên cửa sổ chiếu, cô quay xuống hỏi "cả lớp thấy hình gì").
- **`breakReserve` mới chốt được phần *số học*, chưa chốt được phần *đo* .** Vòng 21 bảo đảm nghỉ + vé đóng
  được trong 35 phút trên giấy, nhưng chưa có một tiết thật nào đếm xem: dòng nghỉ 2′ có thật sự bị cô bấm
  "Bỏ" quá thường xuyên không (nếu có thì nghỉ nên thành tuỳ chọn thay vì mặc định có sẵn), và nhịp tự co
  15 giây có đủ để một lớp 35 em bình tĩnh lại hay chỉ thành một lần đứng-up-ngồi-down chiếu lệ. Cùng họ với
  khoản nợ "số lần cộng tay/thấy tay" ở trên: chỉ cần in thêm vài dòng "số tiết đã bỏ nhịp · số lần co 15 giây"
  vào mục "Báo cáo máy" là có dữ liệu, không cần ghi hình hay lưu danh tính.
- **`rehearsalBudget` khoá được *cấu trúc* ba nhành, chưa khoá được *hành vi* Nhành B trên máy trường.** Vòng
  22 bảo đảm bước camera không còn lọt vào luồng không-camera (P94), nhưng chưa chạy thử trên một trình duyệt
  trường thật để biết: gọi `getUserMedia` ngay trong Nhành B của một lượt chạy thử buổi tối thì có bị chặn như
  ở luồng dạy thật không (dính `noAdmin`, `browserCompat`), và "tắt hẳn stream khi rời nhành" có thật sự nhả đèn
  đỏ trên mọi máy hay chỉ ẩn lớp phủ. Nhánh an toàn đã định sẵn ("máy này không có camera để thử, bỏ qua được"),
  nên lỗ này không khoá bài — chỉ làm mất đúng bước tự kiểm độ phủ, tức là quay về tình trạng trước vòng 18.
  Kiểm tra thực địa này cùng nhóm "chạy trên máy thật" đã mở từ vòng 8.
- **Danh sách trắng `errorTag`/`loiViet`/`localStorage`/`speechSynthesis` là danh sách tay.** Khoá tham chiếu
  chéo của vòng 19 chỉ trừ đúng bốn token đó vì chúng là trường dữ liệu và API trình duyệt, không phải quy
  định. Một vòng sau thêm quy định mới mà bọc tên một hàm/API khác trong dấu chấm ngược thì validator sẽ đỏ
  báo "quy định ma" dù không sai — lúc đó phải cân nhắc tách cơ chế khỏi cách viết: hoặc đánh dấu tham chiếu
  quy định bằng một cú pháp riêng (`→`ruleName`←`), hoặc để khoá chỉ bắt tên *khớp khuôn quy định* mà không có
  trong danh sách. Cách hiện tại đơn giản và an toàn cho 47 quy định, nhưng cần người sau biết nó là nợ kỹ
  thuật có chủ đích chứ không phải thiếu sót.

## Muốn đóng góp thì sửa ở đâu

```text
tools/lib/chalk.mjs     10 quy định bảng phấn và vật thật      → sinh vào mục 4 của giáo án
tools/lib/lesson.mjs    47 quy định chế độ giảng bài           → sinh vào mục 0, 1, 2, 3, 5, 6, 7, 8, 9, 10
tools/lib/handout.mjs   4 quy định từ bảng ra vở               → sinh vào mục 9
tools/data/props.mjs    vật thật + sơ đồ theo 38 cụm
tools/data/lessons.mjs  tên bài, câu khởi động, dòng ghi nhớ
tools/build-lessons.mjs ghép thành 39 file prompts/giao-an/
tools/validate.mjs      61 khoá của họ giáo án + chốt chặn ngược + 13 mục của khung
                        + trần số hàng "Chữa bài" đo thẳng từ clusters.mjs/error-notes.mjs
```

Quy trình một vòng nâng cấp: đo bằng `grep` trên `prompts/giao-an/GA*.md` → viết quy định có con số vào
`tools/lib/*.mjs` → gắn vào builder → thêm khoá vào `validate.mjs` → thêm probe đột biến →
`node tools/build.mjs` (phải xanh) → commit. Không sửa tay file sinh ra, không xây dựng thêm game HTML:
sản phẩm của repo này là **prompt**.
