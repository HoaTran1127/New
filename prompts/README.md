# 📚 MiTi — PROMPT LIBRARY

Đây là **thư viện prompt để tạo game**, không phải game engine.

**85 prompt game chuẩn** (40 Toán 4 · 15 Toán 5 · 15 Tiếng Anh 4 · 15 Tiếng Anh 5) + **12 prompt legacy** đời đầu, tất cả đều theo khung 13 mục (0 → 12) của [master prompt](00-master-canvas-prompt.md).

## 🚀 Luồng chuẩn

**Dashboard → Chọn lớp/môn → Chọn game → Mở prompt → Copy toàn bộ → Dán Gemini Canvas → Gemini tạo 1 file HTML → Game giữ chữ ký MiTi**

👉 [Quay về MiTi Dashboard](../index.html)

## 🧩 Prompt chuẩn của từng game

Mỗi file game prompt là **độc lập**. Không cần Gemini biết repository này.

Một prompt chuẩn luôn mô tả:
- mục tiêu học tập;
- nhiệm vụ học sinh;
- cơ chế chơi và điều khiển;
- dữ liệu/câu hỏi + lỗi thường gặp;
- camera, calibration, smoothing, confidence và cooldown khi cần;
- fallback chuột/chạm/bàn phím;
- feedback học tập;
- luồng Bắt đầu → Chơi → Kết quả;
- an toàn và accessibility;
- đầu ra **một file HTML hoàn chỉnh**.

## 🟡 MiTi đi vào game bằng cách nào?

**Không chỉ có logo ở repository.** Mỗi prompt độc lập yêu cầu Gemini **nhúng chữ ký MiTi trực tiếp vào HTML đầu ra**.

Chữ ký gồm:
- biểu tượng **M** trong ô bo góc;
- chữ **MiTi**;
- dấu **✦**;
- dòng **MiTi • Học bằng chuyển động**.

Logo phải xuất hiện ở Bắt đầu, HUD và Kết quả, không phụ thuộc asset của repository.

👉 [Brand Contract](BRAND_MITI.md)
👉 [Logo nguồn](../brand/miti-logo.svg)

## 🎯 425 biến thể

**85 game × 5 biến thể = 425 prompt**, do `tools/build-variants.mjs` sinh từ `tools/data/games.mjs` — phủ đủ toàn bộ catalog, không còn 20 game thiếu biến thể như bản cũ.

1. Camera Point — chỉ tay
2. Camera Swipe — vuốt/chém
3. Drag & Grab — kéo/thả
4. Voice — giọng nói
5. No Camera — chuột/chạm/bàn phím

Bốn biến thể đầu dùng **cùng một hợp đồng AR** như prompt game: nền là khung hình webcam cover-fit, tọa độ qua `toScreen(lx, ly)`, vật thể có chiều sâu z và neo vào landmark. Muốn đổi nội dung thì sửa dữ liệu rồi chạy `node tools/build.mjs`, đừng sửa tay file sinh ra.

👉 [Mở 425 Prompt Variants](VARIANTS_425.md)

## 🗂️ Tổ chức thư mục

- `00-master-canvas-prompt.md` — khung chuẩn 13 mục (0 → 12) khi tạo prompt mới.
- `BRAND_MITI.md` — chuẩn thương hiệu.
- `templates/game-prompt-template.md` — biểu mẫu điền ô `[...]` (file `template-tao-game-moi.md` cũ chỉ còn trang trỏ tới đây).
- `01-toan4/` — 40 game Toán 4.
- `02-toan5/` — 15 game Toán 5.
- `03-english4/` — 15 game Tiếng Anh 4.
- `04-english5/` — 15 game Tiếng Anh 5.
- `01-prompt-…` đến `12-prompt-…` — **12 prompt legacy** đời đầu: giữ nguyên cơ chế game, đã thay MediaPipe Legacy/Tailwind CDN/Tone.js bằng chuẩn hiện hành và gắn nhãn `LEGACY`. Không dùng làm khuôn cho game mới.
- `VARIANTS_425.md` — 425 biến thể (85 game × 5 kiểu điều khiển), do `tools/build-variants.mjs` sinh.
- `CHECKLIST_NGHIEP_THU.md` — bảng kiểm cầm tay khi nhận file HTML về: 33 mục máy tự kiểm + 24 việc người thử bấm tay (trong đó 6 mục gắn 📷 chỉ có camera mới kiểm được; bản không camera bỏ 6 mục đó và vẫn phải đạt 27 mục còn lại), do `tools/build-acceptance.mjs` sinh từ `tools/lib/acceptance.mjs`.

## ✅ Nghiệm thu một game vừa sinh

Prompt dài tới mức không ai đọc hết file HTML để kiểm tra. Mọi prompt trong thư mục này đều đòi game một **bảng kiểm ẩn** mở bằng 7 lần bấm logo MiTi (hoặc `Ctrl+Alt+K`), trạng thái ĐẠT / CHƯA ĐẠT do code kiểm thật lúc chạy, kèm nút "Xuất bản văn" copy được biên bản.

👉 [Mở Bảng Kiểm Nghiệm Thu](CHECKLIST_NGHIEP_THU.md)

## 🏃 Thể dục có cấu trúc: một phiên chơi phải là một bài tập thật

`tools/lib/pe.mjs` buộc mọi prompt mang thêm cấu trúc của một tiết thể dục thu nhỏ: **khởi động 60–90 giây** trước hiệp 1 · **nhịp thẻ 3,0–4,5 giây vào, ở lại `<= 8` giây** và **`>= 12` nhịp chuyển động mỗi phút** (đếm mỗi lần tay hoặc thân vượt ngưỡng 15% tầm với, tính cả khởi động · 12 lượt · hạ nhiệt, chia số phút chơi thật) · **đồng hồ thời gian vận động `>= 60%`** thời lượng phiên · **hạ nhiệt 45–60 giây** trước màn tổng kết (không có nút "Bỏ qua") · **nhắc uống nước đúng một dòng "Mình uống vài ngụm nước rồi hãy chơi tiếp nhé"** khi phiên `>= 6` phút · **trần tải trọng** (cấm nhảy tiếp đất, xoay thân nhanh quá 90 độ, giữ hai tay trên cao quá 15 giây, cúi thấp tối đa 3/12 lượt). Ba mục cuối trong bảng kiểm máy tự kiểm chính là ba con số này, nên một file HTML "chơi như làm bài tập" sẽ bị báo CHƯA ĐẠT ngay.

## 🧠 Nhớ bài có lịch: chơi hôm nay, vẫn còn nhớ tuần sau

`tools/lib/memory.mjs` buộc phần "hiểu bài" thành "nhớ bài": errorTag sửa đúng 2 lần liên tiếp được xếp ôn lại vào **+1, +3, +7 ngày** (ôn vững thì giãn **+21 ngày**) trong localStorage `miti-review`; mỗi phiên phải có **>= 3/12 lượt xen cụm khác** và tối đa **4/12 lượt** là câu đến hạn; trước lượt 1 là **10 giây "Em còn nhớ không?"** lấy đúng câu em làm hôm trước — sai ở đó **không trừ tim, không cắt chuỗi**, chỉ đưa vào lượt 3 kèm lời giải từng bước; **"Vì sao đúng?"** xuất hiện ở đúng **4/12 lượt**; mục từng đúng hai lần mà quên thì hạ lịch về +1 ngày chứ không phạt. Màn tổng kết thêm nút **"Copy tờ rời"** cho giáo viên: ba errorTag yếu nhất, số ngày từ lần chơi gần nhất, lịch ôn sắp tới và một đề xuất hành động cụ thể — chỉ vào clipboard máy đó, không gửi đi đâu.

👉 Ba mục `[20] [21] [22]` của `CHECKLIST_NGHIEP_THU.md` kiểm đúng ba con số này.

## 🔥 Thi đua + cao trào: để em muốn quay lại lần nữa

`tools/lib/hype.mjs` bổ sung phần mà khảo sát 85 prompt đo được là **trống hoàn toàn** (các chữ "kỷ lục", "phá kỷ lục", "bóng ma", "mở thưởng/quay số", "hiệp quyết định", "đích chung" đều xuất hiện 0 lần): **sự chờ đợi**. Sáu quy định đều có con số để kiểm được:

| Quy định | Con số bắt buộc |
|---|---|
| Cú "ồ" ba giây đầu | vật thể AR bay ngang ngay khi vào gameplay, chữ nhiệm vụ `>= 44px`, không mở màn bằng bảng hướng dẫn |
| Kỷ lục của chính em | localStorage `miti-best` chỉ ba số `{ điểm cao nhất, chuỗi đúng dài nhất, ngày }`; HUD "Kỷ lục: <n> · Em đang: <m>" từ hiệp 2; sự kiện **PHÁ KỶ LỤC** nổ đúng một lần trong 1,2 giây |
| Vệt ghost của em | dải sáng alpha `<= 0.35` (không phải ảnh người) chạy theo nhịp lượt tốt nhất phiên trước; về trước thì `+5` điểm |
| Hiệp quyết định | thẻ 4,5 → 3,75 → hiệp 3 nhãn **HIỆP QUYẾT ĐỊNH** nhân đôi điểm, thêm 1 thẻ vàng; vẫn 4 lượt, vẫn trạm nghỉ 5 giây, độ khó không đổi |
| Nghi thức mở thưởng | 2,5 giây cuối mỗi hiệp, ba phương án, luôn có thưởng, không đổi level thích ứng |
| Đích chung | cột "Cả nhóm: <x>/<mốc>" (mặc định 40, đổi được 20–60) — chỉ tổng số câu đúng, **không xếp hạng bạn** |

Thi đua là với chính em hoặc với một đích chung, không bao giờ là bảng xếp hạng giữa các bạn trong lớp — nguyên tắc "Không leaderboard / Không xếp hạng" của `tools/lib/classroom.mjs` vẫn còn hiệu lực.

👉 Ba mục `[23] [24] [25]` của `CHECKLIST_NGHIEP_THU.md` kiểm đúng ba con số này.

## 🪝 Ham quay lại: để em mở lại game vào ngày hôm sau

`tools/lib/anticipation.mjs` vá lỗ hổng mà khảo sát 85 prompt đo được bằng số 0: "chương tiếp theo" 0 lần, "còn <n> câu nữa" 0 lần, "đang chờ" 0 lần, "để dành" 0 lần. Game kết thúc quá gọn gàng thì em đóng tab và chẳng có gì để chờ. Sáu quy định, đều có con số:

| Quy định | Con số bắt buộc |
|---|---|
| Sắp chạm mốc | 1,5 giây trước lượt kế: "Còn 1 câu nữa tới mốc <m>" với mốc 10/20/30 câu đúng, lượt đó nhân đôi điểm; nhóm thì "Cả nhóm còn <k> câu tới mốc <m>" |
| Khiên chuỗi để dành | localStorage `miti-tokens` `{ khiên, quyền chọn câu, ngày }`, tối đa **2**; khiên chỉ giữ chuỗi đúng — **vẫn trừ 1 tim, vẫn dừng 2 giây hiện lời giải, câu sai vẫn vào hàng đợi luyện lại**, hết 5 tim vẫn thua như cũ |
| Chương còn dở | màn tổng kết "Chương tiếp theo: <tên chương>" + nút "Xem trước" chiếu **6 giây**; cấm đe dọa "không chơi lại là mất hết" |
| Hẹn câu đang chờ | một dòng "Lần sau em quay lại sẽ có <n> câu đang chờ", `<n>` đếm từ `miti-review` (mục đến hạn trong 7 ngày tới, trần 4); `<n> = 0` thì "Chưa có câu nào chờ em" |
| Chỗ trống gọi tên | lưới bộ sưu tập 6 ô, ô chưa mở hiện `? ? ?`, kèm "Bộ <chủ đề> còn thiếu <k> thẻ" |
| Nghi thức lưu phiên | 3 giây "Đã lưu: <điểm cao nhất>, chuỗi dài nhất <x>, <k> thẻ mới"; localStorage bị chặn thì báo "Máy này không giữ được tiến trình"; reduced-motion rút còn 1 giây |

Ba biến thể độc hại của mấy cơ chế này bị cấm ngay trong quy định: **không chuỗi ngày chơi** (streak), **không xin quyền thông báo**, **không "sống lại" kiểu xóa hình phạt sư phạm** — và nghỉ chơi không bị phạt. Dòng hẹn quay lại chỉ đếm những câu đến hạn ôn, không bao giờ nhắc em đã nghỉ bao lâu ngày.

👉 Hai mục `[26] [27]` của `CHECKLIST_NGHIEP_THU.md` kiểm đúng hai con số này. Hai mục `[28] [29]` thuộc tầng "nhẹ đầu" bên dưới, `[30] [31]` thuộc tầng "khoảnh khắc ăn mừng".

## 🪶 Nhẹ đầu: Toán phải là hình dung, không phải tính nhẩm

Chín vòng cộng quy định đã kéo 85 prompt lệch sang "đưa bài toán rồi tính toán thi đấu": đề buộc **level 2 hai bước, level 3 ba bước trở lên**, điểm `+10` chỉ gắn vào đáp án đúng, và không luật nào trần độ dài đề. `tools/lib/light.mjs` đặt lại ba con số, đều kiểm bằng code:

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Một lượt một thao tác tư duy | mục `dang: "tinh"` có **`<= 1`** dấu phép tính (`+ − × :` nằm giữa hai khoảng trắng); bước trước engine dựng sẵn | `verifyQuestionBank()` + mục `[28]` |
| Thiểu số trực quan | **`>= 60%`** số mục đang phát hành là `dang: "nhin"` (nhìn–chỉ–chọn, ước lượng, đọc biểu đồ / tia số / sơ đồ) | `verifyQuestionBank()` + mục `[28]` |
| Đề ngắn, đọc được bằng tai | **`<= 16 từ`**, một mệnh đề, cấm "sau đó / rồi"; đọc to mỗi lượt bằng `speechSynthesis` + nút "Nghe lại đề" | `verifyQuestionBank()` + mục `[28]` |
| Thưởng từ động tác | **+6 động tác / +3 đáp án** cho một lượt (tối đa +9); không điểm nào cho tốc độ đọc hay tốc độ tính | mục `[29]` |
| Không áp lực thời gian | thẻ câu hỏi **không đồng hồ đếm ngược**; đứng im 15 giây → mascot làm mẫu, không trừ tim | mục `[29]` |
| Trạm nghỉ là trạm chơi | 5 giây giữa hai hiệp = mini-trạm vận động **không hỏi bài**, +5 điểm động tác | nhịp hiệp của `feel.mjs` |

Số mục tối thiểu môn Toán rút từ **40 xuống 30** (Tiếng Anh giữ 60 vì là từ vựng, không phải phép tính); 114 câu mẫu hiện có **78 câu `nhin` = 68%**. Level không còn nghĩa "mấy phép tính" mà là độ tinh vi của nhịp nhìn: 1 = nhìn là chọn, 2 = nhìn kỹ rồi loại trừ, 3 = ước lượng — vẫn đúng MỘT thao tác.

## 🎉 Khoảnh khắc ăn mừng: chỗ trẻ hét lên, và âm thanh chịu nổi một lớp bốn em

Vòng 11 gỡ gánh tính nhẩm xong, đo lại 85 prompt thì phần ăn mừng vẫn trống: **pháo giấy 0/85, slow-motion 0/85, trần độ dài SFX 0/85, "không phát tiếng trước cú bấm đầu" 0/85, rung 0/85**. Tới mốc mà chỉ một con số đổi màu thì mốc không có giá trị; và hai lỗi file Canvas gặp ngay phút đầu — game câm vì `AudioContext` chưa resume, hoặc một tiếng "ting" lặp 60 lần mỗi phút — đều nằm ở chỗ trống này. `tools/lib/celebrate.mjs` viết nó thành sáu con số:

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Pháo giấy chỉ ở mốc | đúng **4 sự kiện** (đích chung · PHÁ KỶ LỤC · mở thưởng hiệp 3 · xong mini-trạm), **40–60 hạt** sinh qua `toScreen()`, rơi **1,2–1,8 giây**, trần một đợt/3 giây | mục `[31]` |
| Hợp đồng âm thanh | `AudioContext` chỉ resume **sau cú bấm "Bắt đầu"**; mỗi SFX **`<= 200 ms`**; master gain **`<= 0.25`**; **`<= 4 giọng SFX`** + nhạc nền **`<= 3 giọng`** trên bus riêng (tổng **`<= 7 giọng`**); nút "Tắt tiếng" lưu `miti-mute` | mục `[30]` |
| Viên đạn thời gian | **0,45×** trong **600 ms**, **chỉ** thẻ vàng + 1,5 giây cuối hiệp 3; không rút thời gian đọc đề | mục `[31]` |
| Rung có kiểm soát | `navigator.vibrate` **20 / 60 / 100 ms**, luôn bọc `if (navigator.vibrate)`, tắt theo `miti-mute` và reduced-motion | mục `[31]` |
| Hài hình thể | mascot **đúng một** màn lố mỗi hiệp khi chuỗi đạt 3, **`<= 3 giây`**, không che chữ đề | việc người thử số 22 |
| Cho cả lớp hô cùng | **4 giây** "Cả lớp: 3 – 2 – 1 – CHỐT!" trước hiệp 3, chữ đếm **`>= 60px`**, không tính điểm, không trừ tim | việc người thử số 21 |

## 🎭 Bản sắc riêng: mỗi game một gương mặt, không phải 85 bộ áo của cùng một game

Vòng 12 xong, đo lại 85 prompt: chỉ **1277/13692 dòng nội dung (9%)** là riêng của từng game — trung bình 15 dòng riêng trên 161 dòng. Phần tạo nên "đây là game nào" trống tuyệt đối: **mascot có tên riêng 0/85, bảng màu riêng 0/85, khoảnh khắc cao trào riêng 0/85, đạo cụ riêng 0/85**. Hai game liên tiếp hiện ra cùng một con mascot không tên, cùng màu, cùng màn pháo, nên trẻ không nhớ mình vừa chơi game nào và chẳng có lý do quay lại game đó. `tools/lib/identity.mjs` biến "khác nhau" thành năm con số, còn `tools/data/identities.mjs` soạn sẵn **85 dòng** (mascot · tính cách · ba câu thoại · ba mã hex · khoảnh khắc chữ ký · đạo cụ AR) để prompt nào cũng mang đúng bản sắc của chính game nó mô tả:

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Mascot có tên | **`<= 2 từ`**, lấy từ bối cảnh của game, xuất hiện **`>= 5 chỗ`** (lời chào · nhãn HUD · mỗi câu thoại · tên mini-trạm nghỉ · tổng kết); cấm gọi chung "bạn MiTi"/"trợ lý" | `verifyIdentity()` + mục `[32]` |
| Bảng ba màu riêng | `--miti-1` vật thể AR · `--miti-2` particle + viền hit · `--miti-3` điểm nhấn HUD; 85 bộ ba khác nhau, hai game **cùng cụm** cách nhau **`>= 60/441` RGB** ở `--miti-1` | `validate.mjs` (dữ liệu) + mục `[32]` |
| Một khoảnh khắc chữ ký | **đúng MỘT** hiệu ứng không có ở 84 game còn lại, **`1 lần/phiên`** (thêm tối đa 1 lần ở mở thưởng hiệp 3), **`>= 2 giây`**, không đổi luật, không cộng điểm, không che đề | mục `[32]` |
| Một đạo cụ AR neo người | landmark cổ tay/vai/đầu/hông/lưng qua `toScreen()`, đổi theo `--miti-1`, phản ứng theo kết quả; bản không camera thì đứng yên ở góc HUD chứ **không biến mất** | mục `[5]` + `[32]` |
| Ba câu thoại riêng | mỗi câu **`<= 6 từ`**, đọc bằng `speechSynthesis` vi-VN: khen khi đúng · đỡ khi sai (không chế giễu) · hô mở đầu trước hiệp 1; không trùng nguyên văn ở game khác, **`<= 3 câu/phút`** | `verifyIdentity()` + mục `[32]` |
| Không chép của nhau | `const IDENTITY_DATA` đặt ĐẦU khối `<script>`; `verifyIdentity()` chạy một lần lúc nạp, trường thiếu thì `console.warn` tiếng Việt và bảng kiểm ghi CHƯA ĐẠT | mục `[32]` |

Học sinh chỉ nhớ được **một** thứ, nên mỗi game chỉ được có **một** khoảnh khắc chữ ký: đường đua thì đổ vạch đích, bếp thì bùng lửa, hang đá thì nhũ đá ngân. Việc người thử số 23 ("chơi hai game cùng chủ đề liên tiếp rồi gập máy lại — em có gọi ra được tên mascot, màu và khoảnh khắc chữ ký của TỪNG game, hay vẫn là một game mặc hai bộ áo?") là chỗ duy nhất máy không tự kiểm được, và cũng là chỗ duy nhất phát hiện cả thư viện đang là một game.

## 🥁 Nhạc nền theo nhịp: khoảng lặng giữa hai cú chạm phải có một nhịp để em vận động theo

Hợp đồng âm thanh ở mục trên toàn là điều CẤM, nên hệ quả đo được ở 85 prompt trước vòng 14: **"nhạc nền" 0/85, "giai điệu" 0/85, "BPM" 0/85, "theo nhịp" 0/85** — giữa hai thẻ câu hỏi game chỉ im lặng rồi "ting". Trẻ lớp 4–5 bắt nhịp bằng tai: nhịp trống đều khiến em khuỳnh tay đúng nhịp và hết hiệp nhớ mình vừa làm gì. `tools/lib/rhythm.mjs` viết chỗ trống đó thành sáu con số, với ràng buộc cứng là **không file âm thanh ngoài** (đầu ra vẫn là MỘT file HTML):

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Nhạc có nhịp thật | loop bốn nhịp tự tổng hợp bằng Web Audio, **100–116 BPM** ở hiệp 1–2, bus riêng **gain <= 0.18**, chỉ mở sau cú bấm "Bắt đầu"; hotlink .mp3/.wav/.ogg là lỗi | `verifyMusic()` + mục `[33]` |
| Nhịp = nhịp vận động | khởi động **8 nhịp/động tác**, trạm nghỉ **8 nhịp**, cú chốt đúng rơi vào **phách mạnh**; **trần 128 BPM** và không đòi đổi tư thế nhanh hơn một lần mỗi nhịp | mục `[33]` + nhịp thẻ của `pe.mjs` |
| Nhạc nhường lời | bus nhạc hạ còn **<= 30% gain** khi `speechSynthesis` đọc đề, trả lại 300–500 ms; ngân sách **4 giọng SFX + 3 giọng nhạc, tổng <= 7** | mục `[30]` + `[33]` |
| Nhạc leo theo hiệp | hiệp 2 thêm bass, hiệp 3 thêm trống và **+8 BPM** trong trần 128; mở thưởng = 2,5 giây nhạc leo khớp lúc pháo giấy nổ; không đổi luật, không cộng điểm | mục `[25]` + `[33]` |
| Nhịp nhìn được | bản tắt tiếng còn **vạch nhịp** theo BPM ở mép dưới HUD (**<= 3 xung/giây**, **<= 25% khung hình**); `prefers-reduced-motion` thì vạch đứng yên, nhạc tắt hẳn, vẫn trọn 12 lượt | mục `[9]` + `[33]` |
| Nhạc phải tự chứng minh | `verifyMusic()` chạy MỘT LẦN lúc nạp, kiểm năm điều (nguồn Web Audio, BPM 100–128, gain bus <= 0.18, im lặng trước "Bắt đầu", nhường lời đọc) | mục `[33]` |

Việc người thử số 24 ("nghe trọn một hiệp — nhạc có giữ nhịp cho em vận động theo hay chỉ là tiếng nền vô định? Tắt tiếng rồi chơi tiếp, nhịp chuyển động có rớt dưới 12 lần mỗi phút không?") là chỗ máy không tự kiểm được: nhạc thật hay nhạc kê chữ đều phát ra tiếng như nhau, nhưng chỉ nhạc đúng nhịp mới khiến em cử động theo.

## 🔁 Pipeline của thư viện

85 prompt game **được sinh tự động**, không sửa tay:

```
tools/data/games.mjs + clusters.mjs + gestures.mjs + examples.mjs + error-notes.mjs + identities.mjs
tools/lib/ar.mjs · rules.mjs · feel.mjs · classroom.mjs · access.mjs · light.mjs · celebrate.mjs · identity.mjs · rhythm.mjs · verify.mjs · pe.mjs · memory.mjs · hype.mjs · anticipation.mjs · acceptance.mjs
        └─ node tools/build.mjs ─→ catalogs/GAME_CATALOG.csv · .md · .js + prompts/0X-*/ + index.html + prompts/CHECKLIST_NGHIEP_THU.md
```

Sửa nội dung ở `tools/data/` rồi build lại; `node tools/validate.mjs` sẽ báo nếu prompt thiếu mục, còn `MIXED`, rò ký tự template, thiếu chữ ký MiTi hoặc trỏ tới file không có thật.

## ✅ Quy tắc không tạo file ảo

Dashboard và catalogue chỉ trỏ tới prompt tồn tại thật (`tools/validate.mjs` kiểm tra từng đường dẫn).
ID và tên file prompt được giữ ổn định để link không gãy.
Không dùng tên file tưởng tượng chỉ để làm đẹp giao diện.

## 🔧 Khi tạo game mới

1. Chọn mục tiêu học tập.
2. Điền metadata và gameplay.
3. Áp dụng Master Prompt.
4. Bắt buộc áp dụng Brand Contract.
5. Kiểm tra fallback, feedback và HTML một file.
