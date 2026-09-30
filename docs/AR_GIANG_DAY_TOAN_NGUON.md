# Giáo án AR trên bảng phấn — nguồn cộng đồng và bài học sau 10 vòng

Tài liệu này để **người khác tham khảo và nối tiếp**, không phải mô tả tính năng. Phần tính năng nằm ở
[`prompts/giao-an/README.md`](../prompts/giao-an/README.md); ở đây chỉ ghi: cái gì đã đo được, cái gì đã
thay đổi vì số liệu, và nên đọc gì trước khi sửa tiếp.

## Nguyên tắc làm việc đã trả giá mà thành

1. **Đo trước khi thêm quy định.** Mỗi vòng bắt đầu bằng một lệnh `grep` trên đúng 39 file giáo án đã sinh,
   chứ không bắt đầu bằng ý tưởng. Bảy vòng gần nhất đều tìm thấy lỗ 0/39 — nghĩa là nếu ngồi nghĩ thì
   sẽ nghĩ ra thứ đã có sẵn.
2. **Đo cả chỗ mình tự mâu thuẫn.** Vòng 9 không đi tìm ý mới: nó đọc lại chính các quy định đã có và thấy
   hai quy định cũ đòi cái không thể cùng có — một webcam vừa phải nhìn bàn tay em đứng trước bảng,
   vừa phải đếm ngón tay 35 em cuối phòng. Lỗi kiểu này `grep` thường không bắt được, vì mỗi từ khoá đều
   *có* trong file. Vòng 10 cũng là một phép chia bị bỏ sót: "12 lượt một tiết", "hàng đợi 4 em" và
   "lớp 35 em" đều nằm sẵn trong cùng một file, chỉ có 12 < 35 là chưa ai đem chia cho ai.
3. **Quy định phải có con số.** "Chữ phải to" không kiểm chứng được; "≥ 40 px **và** ≥ 5.5% chiều cao khung
   hình, ≤ 12 chữ một dòng" thì validator bắt được. Mọi quy định trong `tools/lib/*.mjs` là chuỗi nguyên văn,
   `tools/validate.mjs` so bằng `includes()`, nên lời văn và mắt kiểm không bao giờ lệch nhau.
4. **Chốt chặn hai chiều.** Cơ chế game lọt vào giáo án và quy định giáo án lọt sang game đều làm build đỏ.
   Thêm một quy định mới là tự động thêm một khoá bị cấm ở phía bên kia (`LESSON_FAMILY_RULES`).
5. **Probe đột biến là đơn vị kiểm thử thật.** 58 phép, mỗi phép phá đúng một thứ và đòi đúng thông báo.
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

## Muốn đóng góp thì sửa ở đâu

```text
tools/lib/chalk.mjs     10 quy định bảng phấn và vật thật      → sinh vào mục 4 của giáo án
tools/lib/lesson.mjs    29 quy định chế độ giảng bài           → sinh vào mục 0, 2, 3, 5, 6, 7, 8, 9, 10
tools/lib/handout.mjs   3 quy định từ bảng ra vở               → sinh vào mục 9
tools/data/props.mjs    vật thật + sơ đồ theo 38 cụm
tools/data/lessons.mjs  tên bài, câu khởi động, dòng ghi nhớ
tools/build-lessons.mjs ghép thành 39 file prompts/giao-an/
tools/validate.mjs      42 khoá của họ giáo án + chốt chặn ngược + 13 mục của khung
```

Quy trình một vòng nâng cấp: đo bằng `grep` trên `prompts/giao-an/GA*.md` → viết quy định có con số vào
`tools/lib/*.mjs` → gắn vào builder → thêm khoá vào `validate.mjs` → thêm probe đột biến →
`node tools/build.mjs` (phải xanh) → commit. Không sửa tay file sinh ra, không xây dựng thêm game HTML:
sản phẩm của repo này là **prompt**.
