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
- `CHECKLIST_NGHIEP_THU.md` — bảng kiểm cầm tay khi nhận file HTML về: 45 mục máy tự kiểm + 36 việc người thử bấm tay (trong đó 6 mục gắn 📷 chỉ có camera mới kiểm được; bản không camera bỏ 6 mục đó và vẫn phải đạt 39 mục còn lại), do `tools/build-acceptance.mjs` sinh từ `tools/lib/acceptance.mjs`.

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

## 🧍‍🧍‍🧍 Vai chờ có vận động: một máy bốn em thì ba em chưa tới lượt phải có động tác

Đo 85 prompt trước vòng 15: **"bốn em" 85/85** nhưng **"cổ vũ" 0/85, "trọng tài" 0/85, "thư ký" 0/85, "đến lượt" 0/85, "xoay vòng" 0/85**. Mọi prompt đều biết lớp có bốn em đứng quanh một máy, không prompt nào nói ba em còn lại làm gì. Một tiết 45 phút chia bốn nhóm thì mỗi em chạm máy ~4 phút, ~35 phút còn lại là đứng xem — đúng thứ mục tiêu thể dục cấm. `tools/lib/queue.mjs` viết khoảng trống đó thành sáu quy định có con số (`CLASSROOM.twoPlayer` mới chỉ lo hai em **cùng chơi**):

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Bốn vai, mỗi vai một động tác | em chơi cầm máy · "Cổ vũ" vỗ tay/dậm chân **đủ 8 nhịp** mỗi lần · "Trọng tài" giơ thẻ "Động tác to / nhỏ" **ngang vai ngay sau cú chốt** · "Thư ký" đọc to lại **đề bài và đáp án đúng** khi `speechSynthesis` chạy; CẤM "người xem"; hai em bỏ vai Thư ký, một em ẩn HUD vai chờ | `verifyQueue()` + mục `[34]` |
| Xoay vòng cứng | 12 lượt chia đều, **3 lượt/em**; HUD "Lượt của em `<tên>` · `<n>/3`"; nút "Đổi người chơi" **không trừ tim**; một em chơi quá **6/12 lượt** là lỗi cân bằng | mục `[34]` |
| Trần đứng chờ | đồng hồ chờ riêng cho vai không cầm máy; **giây 15** mascot gọi **đúng tên** + động tác **5 giây** ở dải dưới HUD; **giây 20** thành "Cả nhóm cùng làm 5 giây"; điểm vai chờ **không** nhập đồng hồ AR | mục `[19]` + `[34]` |
| Giãn cách | mỗi em một vòng **1 sải tay**, máy cách em đang chơi **>= 1,2 m**, vai chờ đứng **SAU vạch vai**; camera không thấy hết bốn em **không phải lỗi**; **20 giây "vào vị trí"** 3-2-1 khi đổi người, không thẻ nào rơi | mục `[34]` |
| Điểm vào "Cả nhóm" | **`+5` điểm động tác** cho thanh "Cả nhóm `<x>`/`<mốc>`"; **không** vào `miti-best`, **không** đổi hạng em đang chơi, **không** trừ khi sai; tổng kết in "Bốn em hôm nay: ..." trong khối nút "Copy tờ rời" copy được | mục `[23]` + `[34]` |
| Vai chờ phải tự chứng minh | `verifyQueue()` chạy MỘT LẦN lúc nạp, kiểm bốn điều (nhãn tên trên HUD · đồng hồ chờ gọi tên ở giây 15 · `<n>/3` đổi vai sau 3 lượt · điểm chỉ vào "Cả nhóm"); bản một học sinh **bỏ qua hai mục vai chờ** thay vì báo lỗi giả | mục `[34]` |

Việc người thử số 25 ("cho bốn em đứng quanh một máy chơi trọn một hiệp — ba em chưa tới lượt có thật sự vận động hay vẫn đứng xem? Đứng im 20 giây tới lượt: mascot có gọi đúng tên em đang chờ và ra một động tác 5 giây không?") là chỗ duy nhất phát hiện một tiết học mà chỉ một em được động đậy: nhãn vai trên HUD và bộ đếm lượt thì máy kiểm được, còn việc em có thật vỗ tay hay chỉ đứng đọc nhãn thì không.

## ⏱ Tầng "tiết học 45 phút + gắng sức thật" — `tools/lib/lesson.mjs` (vòng 16)

Đo 85 prompt trước vòng 16: **"8–10 phút" 0/85, "45 phút" 0/85, "gắng sức" 0/85, "đổ mồ hôi" 0/85, "thở gấp" 0/85, "hồi nhịp" 0/85**. `pe.mjs` (mục 4.5) quản lý **không gian** của một hoạt động thể dục nhưng không tầng nào quản lý **THỜI LƯỢNG** một phiên và **ĐỘ MỆT THẬT** của em. Hai hệ quả đo được ở lớp: một nhóm chơi say sưa 20 phút thì ba nhóm còn lại hết tiết chưa tới lượt (vòng 15 đã chia đủ lượt, chưa chia giờ), và "đồng hồ vận động >= 60%" chỉ đếm số lần đưa tay nên không phân biệt vừa sức với quá sức.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Trần thời lượng một phiên | phiên **8–10 phút**; HUD "Còn `<n>` phút" (chữ **>= 20px**, không nhấp nháy, không đỏ); 60–90 giây khởi động + 12 lượt + 45–60 giây hạ nhiệt nằm trọn trong trần; phút thứ 10 thì khép ở **RANH GIỚI lượt kế tiếp**; thẻ câu hỏi vẫn **không** có đồng hồ đếm ngược | `verifyLesson()` + mục `[35]` |
| Kế hoạch tiết 45 phút | tổng kết in "Kế hoạch tiết 45 phút: `<n>` phiên × `<n>` phút + `<n>` phút đổi nhóm + 5 phút chốt tờ rời" từ số thật; không đủ thì ghi thẳng "tiết này chỉ đủ 3 nhóm chơi"; nút "Kết phiên" **không trừ tim, không hỏi lý do** | mục `[35]` |
| Bốn mức gắng sức | "dễ quá" · "vừa" · "mệt" · "kiệt" (1–4) cuối **mỗi** hiệp, hàng bốn nút **>= 56px**; không mức nào bị coi là sai; ghi localStorage `"miti-effort"` theo hiệp, đọc lại được phiên sau | mục `[35]` |
| Hồi nhịp giữa hiệp | **15 giây** "hồi nhịp" với **hít vào 4 nhịp – thở ra 6 nhịp** theo vạch nhịp, HUD "Nhịp của em: còn nhanh / vừa phải / chậm rồi" + ghi chú "không phải đo mạch"; reduced-motion còn **10 giây** đếm chữ | mục `[35]` |
| Bản tiết học | khối **đúng bốn dòng** (phút · vận động % / gắng sức ba hiệp / kế hoạch 45 phút / bốn em hôm nay) nằm trong khối nút "Copy tờ rời" copy được; thiếu số thật thì in "**chưa ghi được**" | mục `[35]` |
| Tiết học phải tự chứng minh | `verifyLesson()` chạy MỘT LẦN lúc nạp, kiểm **đúng bốn điều**; bản không camera **vẫn bắt buộc đủ bốn điều** vì đồng hồ phiên và gắng sức không phụ thuộc camera | mục `[35]` |

Việc người thử số 26 ("bấm giờ thật khi nhóm đầu cầm máy — phiên có tự khép ở phút thứ 10 ngay tại ranh giới lượt và dòng "Kế hoạch tiết 45 phút" có đủ chỗ cho bốn nhóm không? Cuối mỗi hiệp hỏi em mức gắng sức: tới hiệp 3 có tăng thật không?") là chỗ máy không tự kiểm được: game có đồng hồ thì máy kiểm được, còn việc một tiết học thật có chia đủ bốn nhóm và em có mệt thật thì phải có người đứng nhìn.

## 📘 Tầng "chuẩn kiến thức SGK" — `tools/lib/curriculum.mjs` + `tools/data/standards.mjs` (vòng 17)

Đo 85 prompt trước vòng 17: **"mạch kiến thức" 0/85, "yêu cầu cần đạt" 0/85, "chuẩn kiến thức" 0/85, "mẹo nhớ" 0/85, "Dễ nhầm" 0/85**. `light.mjs` chặn đề quá nặng, `verify.mjs` chặn số ngoài phạm vi SGK, nhưng **không tầng nào nói đề đó thuộc mạch nào của Chương trình GDPT 2018 và lớp cần đạt tới đâu**. Hai hệ quả đo được ở lớp: giáo viên không có dòng nào để đối chiếu tờ rời với yêu cầu của lớp, và học sinh sai lặp đúng một cái bẫy đã biết mà game không báo trước.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Nhãn mạch trên HUD | **đúng một** nhãn mỗi câu, chỉ **tám mạch** (Toán 4 mạch "Số và phép tính" · "Hình học và đo lường" · "Giải toán có lời văn" · "Một số yếu tố thống kê và xác suất"; Tiếng Anh "Đọc và viết" · "Nghe và nói" · "Kiến thức ngôn ngữ"; chung "Ôn tập tổng hợp"), **cấm thêm mạch thứ chín**; nhãn ngắn **<= 18 ký tự**, chữ **>= 18px**, nền đặc, không nhấp nháy, đổi theo câu | `verifyStandard()` + mục `[36]` |
| Dòng "Yêu cầu cần đạt:" | in **NGUYÊN VĂN** cột `yc` ở **đúng hai màn** (khởi động + tổng kết), **>= 20px**, nằm trong khối "Copy tờ rời" copy được; **không viết lại, không tóm tắt** | mục `[36]` |
| Xen mạch | mạch chính **<= 9/12 lượt**, **>= 3 lượt thuộc mạch khác**, tổng kết in "Hôm nay em chạm `<n>` mạch" | mục `[36]` |
| Bẫy báo trước | **"Dễ nhầm: …"** ở **câu ĐẦU TIÊN** mỗi cụm, **<= 16 từ**, lấy từ nhãn lỗi thật của cụm; **không phải điều kiện cộng điểm** | mục `[36]` |
| Mẹo nhớ | **<= 12 từ** kèm **một động tác 3 giây** | mục `[36]` |
| Chuẩn phải tự chứng minh | `verifyStandard()` chạy MỘT LẦN lúc nạp, kiểm **đúng bốn điều**; bản không camera **vẫn bắt buộc kiểm đủ bốn điều** vì mạch kiến thức không phụ thuộc camera | mục `[36]` |

Việc người thử số 27 ("đọc to dòng "Yêu cầu cần đạt:" ở màn tổng kết và đối chiếu với sách giáo khoa của lớp — có đúng yêu cầu cần đạt của mạch đó không? Hỏi em đang chơi "câu vừa rồi thuộc mạch nào" và "mẹo nhớ là gì"") là chỗ máy không tự kiểm được: `verifyStandard()` so được từng chữ với bảng chuẩn, còn việc một câu có thật nằm trong yêu cầu cần đạt của lớp thì phải có giáo viên cầm sách đối chiếu.

## 🏅 Tầng "chất thể thao" — `tools/lib/sport.mjs` + `tools/data/sports.mjs` (vòng 18)

Đo 85 prompt trước vòng 18: **"môn thể thao" 0/85, "đồng đội" 0/85, "tinh thần thể thao" 0/85, "bảng thành tích" 0/85, "duỗi cơ" 0/85, "khẩu hiệu" 0/85**. `pe.mjs` đã quản lý LIỀU vận động, `lesson.mjs` đã quản lý THỜI LƯỢNG và ĐỘ MỆT, `curriculum.mjs` đã gắn nhãn mạch cho từng câu — nhưng **không tầng nào nói động tác em vừa làm là động tác của môn thể thao nào**. Hệ quả đo được: game chỉ còn là "vung tay chọn đáp án", trẻ không gọi ra được mình đang tập môn gì, hạ nhiệt 45–60 giây không có động tác duỗi cụ thể, và giáo viên không có thành tích của cả đội để tuyên dương. Dữ liệu môn gắn theo **mã điều khiển** (14 dòng × 5 cột) nên 85 game không phải viết tay 85 lần.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Một môn thể thao có tên | cột `mon` **<= 4 từ** theo mã điều khiển của game, HUD góc trên phải **>= 18px** suốt phiên; "Hôm nay ta tập môn …" ở khởi động, "Môn thi đấu hôm nay: …" ở tổng kết, nằm trong khối "Copy tờ rời"; **cấm mô tả chung chung, cấm đổi môn giữa phiên** | `verifySport()` + mục `[37]` |
| Động tác đặc trưng của môn | cột `dongTac` **<= 6 từ**, mascot làm mẫu **3 giây** đầu mỗi hiệp, hiệu lệnh cột `hieuLenh` **<= 4 từ** đọc bằng `speechSynthesis`; biên độ **>= 50% tầm với** và theo trần tải trọng `pe.mjs`; tổng kết đếm "Em đã `<động tác>` `<n>` lần" | mục `[37]` |
| Đường tiếp sức | gậy ảo neo landmark bàn tay alpha **<= 0.45**, **truyền tay sau 3 lượt**; rơi gậy chỉ hiện "Không sao, chạy tiếp", **không trừ tim, không trừ điểm**; một thanh đích chung "Đội mình: `<x>`/`<mốc>`" | mục `[37]` |
| Tinh thần thể thao | **đúng hai lần một phiên**: chạm khuỷu **3 giây** trước hiệp 1 + **lời hay <= 6 từ** (cột `loiHay`) hiện **4 giây** khi bạn sai; **cấm mọi dòng chế bai**; tổng kết in "Tinh thần thể thao: `<n>` lời hay đã nói" | mục `[37]` |
| Bảng thành tích của đội | **ba mốc giảm dần** Vàng/Bạc/Đồng (x > y > z) cho **CẢ ĐỘI**, một màu huy chương lưu `"miti-sport"`, đọc lại bằng "Kỳ trước cả đội đạt `<màu>` — `<n>` động tác"; **cấm xếp hạng cá nhân, cấm so giữa các máy, cấm đổi huy chương lấy nội dung** | mục `[37]` |
| Hồi tĩnh có tên cơ | động tác duỗi giữa của hạ nhiệt **45–60 giây** là cột `duoiCo` của môn, **15 giây**; HUD "Cơ em đang duỗi: `<tên>`" **>= 20px**; **cấm duỗi bật nhịp, cấm ép chạm gót tay**; reduced-motion còn **HAI** động tác × 10 giây | mục `[37]` |

`verifySport()` chạy MỘT LẦN lúc nạp và kiểm **đúng bốn điều**; bản tắt tiếng, bản reduced-motion và bản **không camera vẫn bắt buộc kiểm đủ bốn điều** — tên môn, lời hay và bảng thành tích là chuyện của lớp học, không phụ thuộc webcam.

Việc người thử số 28 ("hỏi em đang chơi 'mình đang tập môn gì' và 'lúc nãy cơ nào được duỗi' — em có gọi ra được tên môn và động tác duỗi, hay cả buổi chỉ là vung tay chọn đáp án? Xem bốn em có chạm khuỷu và nói lời hay khi bạn sai không; đọc bảng thành tích: đó là mốc của CẢ ĐỘI hay đã thành xếp hạng cá nhân?") là chỗ máy không tự kiểm được: `verifySport()` thấy chuỗi tên môn trên HUD, còn việc trẻ có thật sự hình dung mình đang tập thể dục thể thao thì phải có người đứng hỏi.

## 👪 Tầng "gia đình" — `tools/lib/family.mjs` (vòng 19)

Đo 85 prompt trước vòng 19: **"phụ huynh" 0/85, "gia đình" 0/85, "bố mẹ" 0/85, "ở nhà" 0/85, "bài tập về nhà" 0/85**. Chữ "tờ rời" thì **85/85** — nhưng tờ rời của `lesson.mjs` + `curriculum.mjs` viết cho **giáo viên** (đối chiếu yêu cầu cần đạt, tính giờ lên lớp), không một dòng nào nói cho người ở nhà biết con vừa tập môn gì, mẹo nào và cả nhà làm gì cùng con mà không mở thêm một màn hình nữa. Hệ quả: **tiết học kết thúc ở cổng trường**, cái trẻ nhớ cả tuần lại là cái màn hình nhắc trẻ cuối cùng. Tầng này nối đúng một sợi dây đó — và nối mà **không biến game thành bài tập về nhà**, thứ mà `light.mjs` đã chặn ngay trong lớp.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Đúng MỘT khối "Gửi bố mẹ", đúng BỐN dòng | mỗi dòng **<= 20 từ**, chữ **>= 20px**, nằm **TRONG** khối nút "Copy tờ rời" copy được; thứ tự: môn + `<n>` động tác · mạch + `<k>`/`<tổng>` câu đúng · mẹo · việc 3 phút. Thiếu số thật thì in **"chưa ghi được"**, **cấm bịa**, **cấm in hai khối một phiên** | `verifyFamily()` + mục `[38]` |
| Một việc 3 phút ở nhà | **KHÔNG màn hình và KHÔNG viết**: cả nhà làm cùng nhau động tác của môn (cột `dongTac` trong `tools/data/sports.mjs`) rồi hỏi nhau **MIỆNG đúng MỘT đề** nguyên văn từ `QUESTION_DATA` của phiên vừa chơi, đề **<= 16 từ** theo trần `light.mjs`; **cấm ghi vở, cấm đề thứ hai, cấm đòi ảnh/video, cấm đòi mua đồ, cấm kèm thang điểm** | mục `[38]` |
| Mẹo nguyên văn | cột `meo` **<= 12 từ** trong `tools/data/standards.mjs`, **không viết lại, không tóm tắt, không đổi số**, kèm **một động tác 3 giây** bố mẹ làm cùng con đúng bằng động tác mascot đã làm trong lớp | mục `[38]` |
| Riêng tư, không so đo | **cấm tên bạn khác**, **cấm "con đứng thứ `<n>`"**, **cấm mọi dòng so sánh với một em cụ thể**; thành tích tập thể chỉ bằng **đúng một dòng** "Cả nhóm: `<x>`/`<mốc>`" của `hype.mjs`; **cấm số điện thoại, email, ảnh, dữ liệu cá nhân** vào khối copy được | mục `[38]` |
| Không đe dọa, không nghĩa vụ | **cấm** "nếu không luyện con sẽ tụt", "mỗi ngày bắt buộc 3 phút"; sau bốn dòng là **MỘT dòng duy nhất <= 24 từ**, hoặc "Nhà mình làm cùng nhau khi nào cũng được" hoặc "Khi nào con muốn chơi lại thì con tự bấm" — **cấm in cả hai** | mục `[38]` |

`verifyFamily()` chạy MỘT LẦN lúc nạp và kiểm **đúng bốn điều**; bản **một học sinh, bản không camera và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều** — tờ giấy về nhà không phụ thuộc webcam lẫn loa.

Việc người thử số 29 ("copy tờ rời đưa cho bố mẹ đọc tại chỗ — trong mười giây họ có nói lại được con vừa tập môn gì, mẹo nào và cả nhà cùng làm gì trong 3 phút không? Việc 3 phút đó có buộc ai mở thêm màn hình, ghi vở, chụp ảnh hay mua đồ không? Đọc to tờ gửi về: có tên bạn nào khác, có dòng so sánh hay dọa dẫm nào lọt vào tay người ở nhà không?") là chỗ máy không tự kiểm được: `verifyFamily()` đếm được bốn dòng và biết chúng đến từ số thật, còn việc một người lớn bận rộn có đọc nổi tờ đó trong mười giây hay không thì phải đưa tờ giấy cho họ thật.

## 📅 Tầng "tuần học" — `tools/lib/pacing.mjs` + cột `tuan` của `tools/data/standards.mjs` (vòng 20)

Đo 85 prompt trước vòng 20: **"tuần 1" 0/85, "tuần 12" 0/85, "theo tuần" 0/85, "phân phối chương trình" 0/85, "học kì" 0/85, "giữa kì" 0/85, "đến tuần" 0/85** — chính `catalogs/curriculum/toan-lop-4-5-sgk-matrix.md` cũng **0** lần chữ "tuần". `curriculum.mjs` (vòng 17) đã buộc mỗi câu nói được mình thuộc **mạch nào**, `memory.mjs` đã hẹn ôn +1/+3/+7 ngày cho **từng em**, nhưng không tầng nào trả lời câu hỏi đầu tiên của một giáo viên cầm 85 thẻ: **"hôm nay tuần 13 thì tôi cho lớp chơi game nào?"**. Hệ quả đo được: thư viện 85 game không có thứ tự sử dụng, còn lịch ôn chỉ đúng với em đã chơi nhiều phiên, không đúng với cả lớp vừa bước vào tuần kiểm tra.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Nhãn tuần ở hai màn, lấy nguyên văn từ bảng chuẩn | đúng MỘT nhãn "Tuần `<a>`–`<b>` · Học kì `<n>`" ở màn khởi động + màn tổng kết, chữ **>= 18px**, nằm **TRONG** khối "Copy tờ rời"; Học kì tính theo `tuan[0]` (**<= 18 là Học kì 1**, từ 19 là Học kì 2); **cấm** tự đặt khoảng tuần khác cột `tuan`, **cấm** in "cả năm" hoặc để trống, **cấm** một cụm phủ quá **10 tuần**; kèm đúng một dòng **<= 14 từ** "theo phân phối chung — cô xác nhận tuần của lớp em" | `verifyPacing()` + mục `[39]` |
| Hỏi tuần đúng một câu, chỉ ở phiên đầu | "Lớp mình đang học tuần mấy?" hiện **ĐÚNG MỘT LẦN** ở phiên đầu trên máy: hàng nút số **1–35** gom theo tháng, bấm xong lưu localStorage `"miti-week"` và các phiên sau đọc lại; chưa chọn thì vẫn chơi bình thường, HUD ghi "Tuần: chưa chọn"; **cấm chặn nút "Bắt đầu"**, **cấm** hỏi giữa phiên, **cấm** tiện hỏi tuần mà hỏi tên học sinh hay dữ liệu cá nhân nào khác | mục `[39]` |
| >= 3/12 lượt là cụm **đã qua** tuần | khi đã biết tuần của lớp, **>= 3/12 lượt** phải là cụm có `tuan[1]` nhỏ hơn tuần hiện tại — luyện cái cả lớp đã học xong chứ không đánh đố trước chương trình; ba lượt này **trùng được** với ba lượt xen mạch của tầng chuẩn kiến thức; tổng kết in "Tuần `<t>` · em ôn lại `<n>` cụm đã học" bằng số thật; **cấm** chọn cụm chưa tới tuần làm đề MỚI | mục `[39]` |
| Hai tuần nước rút: đổi thứ tự, không đổi luật | trong **2 tuần** trước một mốc của `SCHOOL_YEAR.moc` (giữa học kì 1, cuối học kì 1, giữa học kì 2, cuối học kì 2), HUD thêm "Còn `<n>` tuần tới kiểm tra `<tên mốc>`" và **hai lượt ĐẦU** lấy cụm có errorTag yếu nhất trong `"miti-mastery"`; **cấm** tăng độ khó, **cấm** trừ tim nhiều hơn, **cấm** biến 12 lượt thành đề thi thử có đồng hồ, **cấm** vượt trần 10 phút của tầng tiết học, **cấm** bỏ khởi động và hạ nhiệt để nhét thêm đề | mục `[39]` |
| Từ tuần 33 là tổng ôn | **>= 6/12 lượt** là cụm đã học xong và **cấm** giới thiệu cụm mới (không cụm nào có `tuan[0]` lớn hơn tuần hiện tại được xuất hiện); tổng kết in "Cả năm có `<k>` cụm, em vững `<m>` cụm" với `<k>` đếm từ bảng chuẩn của đúng lớp, `<m>` từ `"miti-mastery"` — thiếu số in **"chưa ghi được"**, **cấm bịa** | mục `[39]` |

`verifyPacing()` chạy MỘT LẦN lúc nạp và kiểm **đúng bốn điều**; **bản không camera, bản một học sinh và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều** — tuần học nằm trong quyển sổ liên lạc, không phụ thuộc webcam lẫn loa. Khoảng tuần ở đây là **phân phối chung** của năm học 35 tuần chứ không phải thời khóa biểu của trường: nhãn nào cũng đi kèm dòng "cô xác nhận tuần của lớp em", và câu hỏi tuần chỉ có hai lựa chọn thật — chọn một số 1–35, hoặc để trống để chơi như mọi khi.

Việc người thử số 30 ("đọc nhãn tuần ở màn khởi động rồi đối chiếu với thời khóa biểu thật của lớp — game ghi 'Tuần 22–24 · Học kì 2' có khớp với việc lớp đang học tới đâu không? Hỏi em 'tuần trước lớp mình học bài gì' rồi xem ba lượt ôn có đúng là cái đã học chứ không phải chương năm sau. Xem hai lượt đầu của phiên nước rút: có thật là hai cụm em yếu nhất, hay game chỉ đổi mỗi dòng chữ trên HUD?") là chỗ máy không tự kiểm được: `verifyPacing()` so được chuỗi nhãn với cột `tuan` và đếm được ba lượt đã qua tuần, còn việc nhãn đó có đúng với **lớp thật đang học tới đâu** thì chỉ cô giáo đối chiếu sổ đầu bài mới biết.

## 🧍 Tầng "chỗ chơi an toàn" — `tools/lib/playzone.mjs` (vòng 21)

Đo 85 prompt trước vòng 21: **"dép" 0/85, "giày" 0/85, "chân đất" 0/85, "dẹp chỗ" 0/85, "vùng vung tay" 0/85, "lớp mình chật" 0/85, "em mệt" 0/85** — còn `rules.mjs` thì **85/85** có một dòng an toàn. Dòng đó là: "Dọn vật cản khỏi vùng đứng, giữ cách tường **một bước**, chỉ chuyển động trong tầm tay". Ba defect đo được: (1) **"một bước" là đơn vị không ai đo** — lớp 4 có bước chân 40 cm và 70 cm, trong khi `queue.mjs` (vòng 15) đã chốt giãn cách **"1 sải tay"** và **máy cách >= 1,2 m**; hai tầng nói cùng một khoảng cách bằng hai đơn vị khác nhau; (2) dòng đó **cấm rời khỏi vùng camera** nhưng **không cho gì thay thế** — một lớp 45 em kê bàn ghế sát nhau thì học sinh chỉ có nước đứng sai luật hoặc không chơi; (3) **quền nghỉ của em không có nút**: `lesson.mjs` có bốn mức gắng sức >= 56px nhưng để em nói "em mệt" giữa hiệp thì phải tự tắt máy, và tự tắt thì mất điểm.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Thẻ "Dẹp chỗ chơi" nằm **trong** khởi động | chạy trong **60–90 giây** khởi động của `pe.mjs`, **tối đa 20 giây**, đúng **BỐN dòng <= 12 từ** ("Vùng đứng mỗi em: một vòng **1 sải tay** tính từ vai" · "Bàn ghế, cặp, chai nước: ra khỏi vùng vung tay" · "Sàn: khô, không vừa lau, không dây điện ngang" · "Máy: cách em đang chơi **>= 1,2 m**") + nút "Chỗ chơi ổn rồi" **>= 56px** và nút "Bỏ qua"; **cấm** mở thêm màn hình riêng trước nút "Bắt đầu", **cấm** dùng "một bước", **cấm** trừ tim | `verifyPlayzone()` + mục `[40]` |
| Hàng ba lựa chọn giày dép | "dép quai hậu" · "giày buộc dây" · "**chân đất / dép lê**", lưu localStorage `"miti-foot"`; chọn dép lê ⇒ **0/12 lượt nhấc chân cao** và đổi sang bản cẳng tay–vai tại chỗ, **cấm vĩnh viễn** mọi động tác đứng một chân; **cấm** in "không an toàn" cạnh tên em; tổng kết ghi "Động tác hôm nay: bản tại chỗ (dép lê)" | mục `[40]` |
| Nút "Lớp mình chật" + trần không gian 90 độ | lưu `"miti-space"` MỘT lần, bản không camera mặc định **BẬT SẴN**; động tác di chuyển thành **TẠI CHỖ** trong 1 sải tay mà vẫn giữ ngưỡng **>= 15% tầm với** để **>= 12 nhịp/phút** và **>= 60%** thời gian vận động của `pe.mjs` **không đổi**; **cấm** trừ điểm, rút số lượt, hạ trần; vật thể AR chỉ vào **hình quạt 90 độ PHÍA TRƯỚC**, **cấm** "lùi lại / né sang trái phải / quay người nhanh" TRONG 12 lượt | mục `[40]` |
| Bộ động tác chốt MỘT LẦN đầu phiên | danh sách động tác chốt **đúng một lần** trước hiệp 1 và **cấm mở rộng giữa phiên**; "Xem cách chuyển động" liệt kê đúng bộ đó; HUD "Vùng chơi: tại chỗ" / "Vùng chơi: 1 sải tay" **>= 18px**; đổi lựa chọn chỉ hiệu lực ở **phiên kế tiếp** | mục `[40]` |
| Nút "Em mệt / em đau" là MỘT nút | **đúng một chỗ** ở góc dưới HUD, **>= 56px**, không bao giờ mờ hay bị che; **cấm** biến thành "Tạm dừng", **cấm** mascot nói "cố lên"; một cú bấm ⇒ chơi hết lượt rồi vào thẳng **hạ nhiệt 45–60 giây**, **không trừ tim**, không trừ điểm, không hỏi lý do, không đòi cô xác nhận; ghi `"miti-stop"` {phút, lượt}; tổng kết in "Em xin nghỉ ở phút `<n>` — nghỉ đúng lúc cũng là chơi giỏi" | mục `[40]` |

`verifyPlayzone()` chạy MỘT LẦN lúc nạp và kiểm **đúng bốn điều**; thiếu thì `console.warn` tiếng Việt nêu điều lệch và bảng kiểm ghi CHƯA ĐẠT. **Bản không camera, bản một học sinh và bản tắt tiếng vẫn bắt buộc đủ bốn điều** — bàn ghế không biến mất vì thiếu webcam. Đơn vị khoảng cách của cả thư viện từ vòng 21 là **1 sải tay** và **>= 1,2 m**, không còn "một bước" ở đâu nữa (`validate.mjs` chặn cả hai chiều: thiếu `1 sải tay` trong `PLAYZONE.depCho` lẫn trong `QUEUE.spacing` đều báo lỗi).

Việc người thử số 31 ("quay một vòng dang hai tay ngay tại chỗ em sẽ đứng — bàn ghế, cặp, tường có nằm trong tầm vung không? Chọn 'dép lê' rồi chơi một phiên xem mọi động tác nhấc chân cao có biến mất thật không, hay chỉ đổi mỗi chữ. Bật 'Lớp mình chật' giữa hai phiên rồi đếm nhịp. Bấm 'Em mệt / em đau' ở hiệp 2: game có vào thẳng hạ nhiệt mà không trừ tim, không hỏi lý do, không một lời 'cố lên' nào không?") là chỗ máy không tự kiểm được: code biết bộ động tác đã được lọc và nút đủ lớn, còn **chỗ đó có thật sự trống không** thì chỉ người đứng vào chỗ của em, dang hai tay, mới biết.

## 🪁 Tầng "sân chơi Việt Nam" — `tools/lib/folk.mjs` + `tools/data/folk.mjs` (vòng 22)

Đo 85 prompt trước vòng 22: **"dân gian" 0/85, "đồng dao" 0/85, "ô ăn quan" 0/85, "nhảy dây" 0/85, "kéo co" 0/85, "rồng rắn" 0/85, "vạch phấn" 0/85, "viên sỏi" 0/85** — trong khi **"GO" 0/85** và **"TEAM" 0/85** nên `rules.mjs` đã chặn chữ Tây từ lâu: cái thiếu là **khung chơi**. Vòng 18 cho mỗi mã điều khiển một **môn quốc tế** (bắn cung, bóng bàn, phi tiêu) mà sân trường làng không có, SGK Thể dục 4–5 thì mục "Ôn trò chơi vận động" chính là **trò chơi dân gian**. Sáu quy định, đều có con số:

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Một **trò dẫn dắt** theo đúng mã điều khiển | 14 mã · 14 trò lấy NGUYÊN VĂN từ `tools/data/folk.mjs` (`GRAB` → Ô ăn quan, `POINT` → Chi chi chành chành, `TWO_HAND_BALANCE` → Gánh nước): `tro` **<= 4 từ** ở dòng "Cách chơi" + nhãn mini-trạm **>= 18px**, `loiCho` **<= 8 từ**, `dieu` = `dong`/`tinh`; **cấm** góc HUD trên (của tên môn), **cấm** đổi trò giữa phiên | `verifyFolk()` điều 1 |
| Một **lời hô theo nhịp** | `chant` **<= 8 tiếng**, hô **ĐẦU mỗi hiệp** theo **vạch nhịp 8 nhịp**, **BA lần một phiên**; `loai` = "dong dao" là đồng dao thật — **cấm** gọi lời đếm ("dem") là đồng dao, **cấm** beep, **cấm** biến chant thành câu hỏi; Tiếng Anh: **một mẫu câu <= 8 từ, giọng en-US**; tắt tiếng: chữ trên vạch nhịp, **<= 3 lần nhấp nháy/giây** | `verifyFolk()` điều 2 |
| **Bản tại chỗ**, không đổi tên trò | mọi lượt trong **1 sải tay** + **hình quạt 90 độ** phía trước; **năm trò bị loại** ("Nhảy lò cò", "Trồng cây chuối", "Bịt mắt bắt dê", "Rồng rắn chạy vòng", "Kéo co dây thật"); **cấm** nắm tay / đeo tay / cõng bạn / thổi vào mặt bạn | `verifyFolk()` điều 4 |
| **Một đồ dùng** trong tám món | `FOLK_PROPS` (vạch phấn · dây nhảy · khăn vải · viên sỏi · gậy tre · quả cầu giấy · túi đậu · vòng tròn), AR một màu **alpha <= 0.45**; **cấm** em cầm, nhặt, bốc, thổi, đội, truyền tay vật thật ở **mọi lượt trong 12 lượt** | `verifyFolk()` điều 3 |
| **Trò đôi bạn** trên một máy | hai em cạnh nhau cùng làm động tác tại chỗ, đổi vai **sau mỗi 3 lượt**; **cấm** đòi thêm bạn ngoài lớp, **cấm** chờ đủ bốn em; tổng kết in **ĐÚNG MỘT** dòng "Trò chơi hôm nay: <trò> — bản <động/tĩnh> tại chỗ" trong khối "Copy tờ rời" | `verifyFolk()` điều 1 + 4 |

`verifyFolk()` chạy MỘT LẦN lúc nạp và kiểm **đúng bốn điều**; thiếu thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT ở **mục `[41]`**. **Bản không camera, bản một học sinh và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều** — sân chơi và lời hô không phụ thuộc webcam.

Việc người thử số 32 ("chơi thử một phiên ngay tại chỗ em sẽ đứng — trò chơi dân gian hiện trên màn hình có phải trò em thật sự từng chơi ở sân trường, hay chỉ là cái tên dán lên một cú vung tay? Đọc to lời hô hai lần xem có khớp vạch nhịp, nhìn xuống tay xem game có đòi cầm vật thật, gọi tên năm trò đã loại xem có trò nào được dựng lại dưới tên khác không") là chỗ máy không tự kiểm được: `validate.mjs` so được chuỗi với `tools/data/folk.mjs`, còn **trò đó có thật ở sân trường em không** thì chỉ người lớn lên ở đó mới trả lời được.

## 🎤 Tầng "đố bạn" — `tools/lib/quiz.mjs` + `tools/data/quiz.mjs` (vòng 23)

Đo 85 prompt trước vòng 23: **"đố bạn" 0/85, "người đố" 0/85, "em ra đề" 0/85, "tự đặt đề" 0/85, "hoàn thành câu" 0/85, "em đọc to" 0/85**, micro chỉ **3/85** (đúng ba game mã VOICE) — ngược lại **"ngân hàng câu hỏi" 85/85, "đề bài hiện" 85/85**. Thư viện có tới tầng tự kiểm chứng đề và tầng độ khó thích ứng, nhưng cả hai đều giả định **máy** ra đề: em không bao giờ bị đặt vào mức phải hiểu câu hỏi đủ sâu để tự đặt nó cho bạn. Tầng này cho đúng BA/12 lượt thuộc về em.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Đúng **BA lượt "Đố bạn"** một phiên | mỗi hiệp **MỘT lượt** ở **CUỐI hiệp**, **9/12 lượt còn lại vẫn từ ngân hàng đề**; mẫu câu NGUYÊN VĂN từ `tools/data/quiz.mjs` (tám mạch × ba mẫu, mỗi mẫu **<= 8 từ**, đúng **một chỗ trống**), em điền **MỘT số/từ đang hiện trên thẻ** | `verifyQuiz()` điều 1 |
| Thẻ **"Đố bạn"** một hàng ba mẫu câu | **>= 20px**, **tự tắt sau 6 giây** hoặc khi chạm, **không microphone**, **không in sẵn đáp án**; bấm "Em đố" rồi đọc to **một mẫu trong 3 giây** | `verifyQuiz()` điều 2 |
| **Bạn đáp bằng một động tác** của mã điều khiển | trong **vòng 1 sải tay** + **hình quạt 90 độ**, cùng **thời gian thẻ của hiệp**; vai "Thư ký" đọc lại cả đề lẫn đáp án | `verifyQuiz()` điều 3 |
| **Đề lệch không phạt ai** | **không trừ tim, không cắt chuỗi**, mascot **một câu đỡ <= 6 từ**, lượt kế về đề ngân hàng, có nút **"Em chịu, bạn đáp giúp"** | `verifyQuiz()` điều 3 |
| **Điểm đố vào "Cả nhóm"** | **+5**, **không** vào "miti-best"; tổng kết in **"Em đố hôm nay: <tên> <n> đề"** trong khối "Copy tờ rời" | `verifyQuiz()` điều 4 |

`verifyQuiz()` chạy MỘT LẦN lúc nạp và kiểm **đúng bốn điều**; thiếu thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT ở **mục `[42]`**. Bản một học sinh, bản không camera và bản tắt tiếng vẫn bắt buộc kiểm đủ bốn điều, vì một em đọc mẫu câu và một em đáp bằng động tác không phụ thuộc webcam.

Việc người thử số 33 ("đọc to một mẫu câu "Đố bạn" ở cuối hiệp 1 rồi để bạn bên cạnh đáp bằng động tác — đề có nằm đúng mạch đang học và có đáp án thật trên thẻ không? cố tình điền một số ngoài phạm vi đã học xem game có trừ tim hay chỉ âm thầm đổi sang đề ngân hàng? bấm "Em chịu, bạn đáp giúp" rồi tìm dòng "Em đố hôm nay" trong khối "Copy tờ rời"") là chỗ máy không tự kiểm được: `validate.mjs` so được mẫu câu với `tools/data/quiz.mjs`, còn **đề đó có vừa sức em được đố không** thì chỉ người lớn đứng cạnh em mới trả lời được.

## 🫱 Tầng "bạn dẫn" — `tools/lib/lead.mjs` + `tools/data/leads.mjs` (vòng 24)

Đo 85 prompt trước vòng 24: **"em làm mẫu" 0/85, "bạn làm mẫu" 0/85, "bắt chước" 0/85, "người dẫn" 0/85, "em dẫn" 0/85, "đồng diễn" 0/85, "nhịp chung" 0/85** — ngược lại **"mascot làm mẫu" 85/85**, riêng chuỗi "làm mẫu" xuất hiện 8 lần trong một prompt và cả tám lần mascot là chủ ngữ. Nghĩa là người làm mẫu động tác chưa bao giờ là một em: ba em chưa tới lượt vẫn chỉ xem máy làm rồi bắt chước máy, còn "nhìn bạn rồi bắt chước bạn" — cách trẻ nạp một động tác mới nhanh nhất và là hoạt động mở đầu mọi tiết Thể dục lớp 4–5 — hoàn toàn vắng mặt. Tầng này đặt một em vào vị trí dẫn đầu trong 5 giây, không cần nói một lời nào.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Đúng **BA lần "Bạn dẫn"** một phiên | mỗi hiệp **MỘT lần**, mỗi lần **ĐÚNG 5 giây**, **không tính vào 12 lượt hỏi bài**; động tác NGUYÊN VĂN từ `tools/data/leads.mjs` (mười bốn mã điều khiển × ba động tác, mỗi động tác **<= 6 từ**) | `verifyLead()` điều 1 |
| Thẻ **"Bạn dẫn"** một hàng ba động tác | **>= 20px**, **tự tắt sau 5 giây**, **không microphone**, **không đánh dấu ✓**; em dẫn bấm "Em dẫn" rồi **làm** động tác, không cần nói | `verifyLead()` điều 2 |
| **Ba em còn lại bắt chước** | mỗi em trong **vòng 1 sải tay** + **hình quạt 90 độ** của chính mình, **không chạm nhau**, **không xếp vòng tròn**; cô bấm "Cả nhóm đã làm theo" | `verifyLead()` điều 3 |
| **Dẫn lệch không phạt ai** | **không trừ tim, không cắt chuỗi đúng**, mascot **làm mẫu lại 3 giây**, thẻ hiệp kế vẫn là ngân hàng; em bắt chước không kịp **không tính sai** | `verifyLead()` điều 3 |
| **Điểm dẫn vào "Cả nhóm"** | **+5**, **không** vào "miti-best"; tổng kết in **"Em dẫn hôm nay: <tên> <n> hiệp"** trong khối "Copy tờ rời" | `verifyLead()` điều 4 |

`verifyLead()` chạy MỘT LẦN lúc nạp và kiểm **đúng bốn điều**; thiếu thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT ở **mục `[43]`**. Bản một học sinh, bản không camera, bản tắt tiếng, bản "dép lê" và bản "lớp mình chật" vẫn bắt buộc kiểm đủ bốn điều, vì một em làm mẫu và ba em nhìn theo không phụ thuộc webcam.

Việc người thử số 34 ("để một em bấm "Em dẫn" và làm một động tác trong 5 giây — ba em kia có thật sự nhìn và bắt chước hay vẫn chỉ làm theo mascot? em dẫn làm động tác ngoài thẻ thì game có trừ tim không? dòng "Em dẫn hôm nay" có nằm trong khối "Copy tờ rời" không?") là chỗ máy không tự kiểm được: `validate.mjs` so được động tác với `tools/data/leads.mjs`, còn **ba em có bắt chước thật không** thì chỉ người lớn đứng cạnh mới trả lời được.

## 🗣 Tầng "câu chốt" — `tools/lib/takeaway.mjs` + `tools/data/takeaways.mjs` (vòng 25)

Đo 85 prompt trước vòng 25: **"điều em nhớ" 0/85, "một câu chốt" 0/85, "câu chốt" 0/85, "hệ thống bài" 0/85, "bằng lời của em" 0/85, "tự đánh giá" 0/85, "20 giây cuối" 0/85** — ngược lại **"thả lỏng" 85/85 và "giãn cơ" 85/85**, còn "vì sao em chọn" 85/85 thì lúc nào cũng kèm BA phương án máy viết sẵn. Phần thân thể cuối tiết đã đủ, phần trí tuệ cuối tiết thì không: "Mẹo nhớ" do máy đọc, "Mẹo con mang về" do máy nhắc, "Vì sao đúng?" là trắc nghiệm ba lựa chọn — chưa một tầng nào bắt em tự phát ra MỘT câu do miệng em nối, tức là bỏ mất bước "hệ thống bài" có thật trong mọi tiết Thể dục lớp 4–5. Tầng này cho mỗi em 5 giây nói, và một con số do chính em giơ tay.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Đúng **MỘT khối "Câu chốt"** một phiên | ở **CUỐI phiên** (sau lượt đố thứ ba, trước màn tổng kết), dài **ĐÚNG 20 giây = bốn lượt × 5 giây**, **không tính vào 12 lượt hỏi bài**, nằm trong trần 8–10 phút | `verifyTakeaway()` điều 1 |
| **Ba khung câu nguyên văn theo đúng mạch** | tám mạch × ba khung trong `tools/data/takeaways.mjs`, mọi khung mở đầu "Điều em nhớ:", có **đúng một chỗ trống "…"**, **không phải câu hỏi**, **<= 12 từ**; ba nút chọn **một hàng >= 20px**, thẻ "Câu chốt" **tự tắt sau 6 giây**, **không microphone**, **không nhận dạng giọng nói**, **không hiện sẵn đáp án** | `verifyTakeaway()` điều 2 |
| **Bốn em cùng chốt** | mỗi em **ĐÚNG 5 giây** theo thứ tự chỗ ngồi; em bấm "Em chưa nói được" thì làm **MỘT động tác của mã điều khiển** thay cho câu nói, lượt vẫn tính và **không bị gọi lại lần hai** | `verifyTakeaway()` điều 3 |
| **1–3 ngón tay tự đánh giá** | 1 = "chưa rõ", 2 = "hiểu rồi", 3 = "giải thích được cho bạn"; cô ghi mức em tự chọn, **không trừ tim, không cắt chuỗi, không đổi độ khó** | `verifyTakeaway()` điều 3 |
| **Điểm chốt vào "Cả nhóm"** | **+5**, **không** vào "miti-best", **không** xếp hạng, **không** in "đúng"/"sai" cạnh câu của em; tổng kết in **"Em chốt hôm nay: <tên> <n> câu"** trong khối "Copy tờ rời" | `verifyTakeaway()` điều 4 |

`verifyTakeaway()` chạy MỘT LẦN lúc nạp và kiểm **đúng bốn điều**; thiếu thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT ở **mục `[44]`**. Bản một học sinh, bản không camera, bản tắt tiếng, bản "dép lê" và bản "lớp mình chật" vẫn bắt buộc kiểm đủ bốn điều, vì nói một câu bằng lời của mình không phụ thuộc webcam.

Việc người thử số 35 ("bốn em ngồi thành một hàng chơi tới 20 giây cuối: mỗi em có thật sự nói MỘT câu bằng lời của mình hay máy đọc hộ? em nói câu na ná bạn có bị in chữ \"sai\" cạnh tên không? em khoanh tay không nói có bị gọi lại lượt thứ hai không? giơ 2 ngón thay vì 3 ngón có làm đổi độ khó hay mất tim không?") là chỗ máy không tự kiểm được: `validate.mjs` so được khung câu với `tools/data/takeaways.mjs`, còn **câu em nói có phải bằng lời của em không** thì chỉ người lớn ngồi cạnh mới trả lời được.

## 🎯 Tầng "mục tiêu của em" — `tools/lib/goal.mjs` + `tools/data/goals.mjs` (vòng 26)

Đo 85 prompt trước vòng 26: **"hôm nay em sẽ" 0/85, "em sẽ cố" 0/85, "điều em muốn" 0/85, "thẻ mục tiêu" 0/85, "em làm được" 0/85, "làm được một phần" 0/85, `miti-goal` 0/85, "em tiến bộ" 0/85, "so với chính em" 0/85** — ngược lại **"em chọn một" 85/85 và "em tự chọn" 85/85**, nhưng đó là chọn đồ vật hay đáp án trong lượt chơi, chưa lần nào em chọn cái em sẽ cố làm cho chính mình; "tiến bộ" 85/85 lại thuộc hồ sơ `miti-mastery` do MÁY ghi. Máy đang quyết hết: máy chỉnh độ khó, máy ghi thành tích, máy khen em cố gắng. Tầng này trả lại đúng bước mở đầu tiết Thể dục lớp 4–5 — cán sự hô "hôm nay cả lớp ta luyện …" rồi bốn em tự nhẩm phần của mình — và cho em một đường tự nhận cuối phiên chỉ so với chính em.

| Luật | Con số | Kiểm ở đâu |
|:---|:---|:---|
| Đúng **MỘT thẻ "Mục tiêu của em"** một phiên | chạy **TRONG 60–90 giây khởi động** đang có, **không thêm thời lượng phiên**, **không trễ nút "Bắt đầu"**, **không thêm màn hình** | `verifyGoal()` điều 1 |
| **Ba dòng nguyên văn theo đúng mã điều khiển** | mười bốn mã × ba dòng trong `tools/data/goals.mjs`, mọi dòng mở đầu "Hôm nay em sẽ", **<= 8 từ**; **ba nút chọn một hàng >= 20px**, **tự tắt sau 6 giây**, có nút **"Chưa chọn"** và **cấm hiện lại lần hai** | `verifyGoal()` điều 1 |
| **Game không chọn thay em** | **cấm chọn hộ, cấm chọn ngẫu nhiên, cấm mascot chọn thay, cấm viết lại câu khác với bảng** | `verifyGoal()` điều 1 |
| **Bốn em bốn mục tiêu, không đem ra so** | mỗi em **ĐÚNG MỘT** mục tiêu trong **vòng 1 sải tay**; **cấm in hai mục tiêu cạnh nhau**, **cấm đọc trước lớp**, **cấm gọi là cao hay thấp**, **cấm thành điểm / tim / chuỗi**, mascot **<= 6 từ MỘT lần** | `verifyGoal()` điều 2 |
| **Nhắc đầu hiệp tối đa BA lần một phiên** | một dòng **"Mục tiêu: <câu em đã chọn>"** ở **giây đầu tiên** mỗi hiệp, **>= 20px**, **một hàng**, **tắt sau 6 giây**, **không che đề**, **không cắt thời gian đọc đề**, **cấm lần thứ tư** | `verifyGoal()` điều 3 |
| **Cuối phiên em tự chạm ba nút, một bản ghi duy nhất** | "Em làm được rồi" / "Em làm được một phần" / "Em sẽ làm tiếp", **không trừ tim, không đổi độ khó, không tính vào 12 lượt, không thay khối "Câu chốt" 20 giây**; `miti-goal` **ĐÚNG MỘT bản ghi mỗi phiên**, tổng kết in **tối đa HAI dòng** trong khối "Copy tờ rời", **cấm bịa "Phiên trước em"**, **cấm biểu đồ và tỉ lệ %** | `verifyGoal()` điều 4 |

`verifyGoal()` chạy MỘT LẦN lúc nạp và kiểm **đúng bốn điều**; thiếu thì `console.warn` tiếng Việt nêu đúng phần lệch và bảng kiểm ghi CHƯA ĐẠT ở **mục `[45]`**. Bản một học sinh, bản không camera, bản tắt tiếng, bản "dép lê" và bản "lớp mình chật" vẫn bắt buộc kiểm đủ bốn điều, vì một câu em tự nhủ không phụ thuộc webcam.

Việc người thử số 36 ("bốn em ngồi lại thành một hàng ngay từ màn khởi động: mỗi em có thật sự tự chạm chọn một dòng "Hôm nay em sẽ …" hay máy điền hộ? có em nào bị đọc mục tiêu trước lớp, bị xếp hai mục tiêu cạnh nhau để so, hay bị trừ tim vì chưa đạt không? cuối phiên em chạm "Em sẽ làm tiếp" — trò chơi có phạt em, có in chữ "đạt" cạnh tên em, và tờ rời có bịa dòng "Phiên trước em" khi chưa có bản ghi `miti-goal` không?") là chỗ máy không tự kiểm được: `validate.mjs` so được dòng mục tiêu với `tools/data/goals.mjs`, còn **ý định đó có phải của chính em không** thì chỉ người lớn ngồi cạnh mới trả lời được.

## 🔁 Pipeline của thư viện

85 prompt game **được sinh tự động**, không sửa tay:

```
tools/data/games.mjs + clusters.mjs + gestures.mjs + examples.mjs + error-notes.mjs + identities.mjs + standards.mjs + sports.mjs + folk.mjs + quiz.mjs + leads.mjs + takeaways.mjs + goals.mjs
tools/lib/ar.mjs · rules.mjs · feel.mjs · classroom.mjs · access.mjs · light.mjs · celebrate.mjs · identity.mjs · rhythm.mjs · queue.mjs · lesson.mjs · curriculum.mjs · sport.mjs · family.mjs · pacing.mjs · playzone.mjs · folk.mjs · quiz.mjs · lead.mjs · takeaway.mjs · goal.mjs · verify.mjs · pe.mjs · memory.mjs · hype.mjs · anticipation.mjs · acceptance.mjs
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
