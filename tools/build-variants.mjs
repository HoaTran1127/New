// Sinh prompts/VARIANTS_425.md — 85 game × 5 biến thể điều khiển = 425 block.
// Mỗi block = Ý TƯỞNG + MỤC TIÊU + một khối RÀNG BUỘC CỐT LÕI 14 dòng (tools/lib/core.mjs)
// + ngân hàng dữ liệu + tự kiểm tra. Không import 26 module quy định chung cũ.
// Trần: 15.000 byte / block. Chạy độc lập: `node tools/build-variants.mjs`.

import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { GESTURES, BANK } from './data/gestures.mjs';
import { cluster } from './data/clusters.mjs';
import { standard } from './data/standards.mjs';
import { sport } from './data/sports.mjs';
import { folk } from './data/folk.mjs';
import { identity } from './data/identities.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { readCatalog } from './lib/csv.mjs';
import { CORE, CORE_TITLE, CORE_SHORT } from './lib/core.mjs';
import { bandMeta, structureFor, wordsFor } from './data/yle.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'prompts', 'VARIANTS_425.md');
const BYTE_CAP = 15000;

// 5 biến thể điều khiển cho CÙNG một game: cùng thế giới, cùng ngân hàng dữ liệu, khác mỗi cách chốt đáp án.
const VARIANTS = [
  { code: 'V1', label: 'CAMERA POINT', gesture: 'POINT' },
  { code: 'V2', label: 'CAMERA SWIPE', gesture: 'SWIPE' },
  { code: 'V3', label: 'DRAG & GRAB', gesture: 'DRAG' },
  { code: 'V4', label: 'VOICE', gesture: 'VOICE' },
  { code: 'V5', label: 'NO-CAMERA', gesture: null },
];

const hocKi = (tuan) => (tuan <= 17 ? 'Học kì I' : 'Học kì II');
const bytes = (s) => Buffer.byteLength(s, 'utf8');

// Phần biến thể: chỉ đổi cách chơi / chốt đáp án theo mã gesture, lấy từ tools/data/gestures.mjs.
function controlLines(v) {
  if (!v.gesture) {
    return `- Cách chơi (biến thể ${v.code} — ${v.label}, KHÔNG CAMERA): di chuyển con trỏ bằng phím mũi tên / WASD, chốt đáp án bằng Space hoặc Enter; chuột và chạm màn hình mô phỏng ĐÚNG hành động chính của game. Đây là bản chơi trọn 12 lượt, vẫn đạt 100% mục tiêu học tập trên máy không có webcam / không có micro / mạng trường chặn CDN, có nhãn "Chế độ không dùng camera".`;
  }
  const gm = GESTURES[v.gesture];
  return `- Cách chơi (biến thể ${v.code} — ${v.label}): ${gm.vi}. ${gm.landmark}
- Chốt đáp án: ${gm.hinh_hoc}
- Biên độ động tác: ${gm.bien_do}
- Không có camera thì ${gm.fallback}.`;
}

function block(n, row, g, v) {
  const cl = cluster(g.cluster);
  const st = standard(g.cluster);
  const sp = sport(v.gesture || g.gestures[0]);
  const fk = folk(v.gesture || g.gestures[0]);
  const bank = BANK[row.mon];
  const it = identity(g.id);
  if (!it) throw new Error(`Thiếu bản sắc cho game ${g.id} — bổ sung tools/data/identities.mjs.`);
  const errList = ERROR_NOTES[g.cluster];
  const gradeTxt = row.mon === 'Toán' ? `Toán lớp ${row.lop}` : `Tiếng Anh lớp ${row.lop}`;
  const english = row.mon === 'Tiếng Anh';
  const bm = english ? bandMeta(row.band) : null;
  if (english && !bm) throw new Error('Catalog thiếu cột band cho game ' + row.id);
  const bandLines = english
    ? `- Band Cambridge: **${bm.ten}** (${bm.cefr}) — ${bm.moTa}
- Trần từ vựng: ${wordsFor(row.band).size} từ thuộc ${bm.tukhoa} trở xuống; cấm từ lần đầu xuất hiện ở band cao hơn.
- Trần ngữ pháp: 8 cấu trúc của ${bm.tukhoa} — ${structureFor(row.band).map(([t]) => t).join(' · ')}.`
    : null;
  const model = g.gestures.some((x) => ['STEP', 'TWO_HAND_STRETCH', 'TWO_HAND_BALANCE', 'ANGLE_POSE'].includes(x))
    ? 'PoseLandmarker'
    : 'HandLandmarker';

  return `## Prompt ${String(n).padStart(3, '0')} — ${row.id} — ${v.code} — ${v.label}

**Game:** ${row.ten_game} · ${gradeTxt}${english ? ' · Band ' + bm.ten : ''} · Cụm kiến thức: \`${g.cluster}\` · Biến thể điều khiển: ${v.code} ${v.label}

\`\`\`text
Tạo game giáo dục web "${g.name.toUpperCase()}" cho học sinh Việt Nam lớp ${row.lop}, môn ${row.mon}${english ? `, chuẩn ${bm.ten} (${bm.cefr}) của Cambridge` : ''} (biến thể ${v.code} — ${v.label}).

1. Ý TƯỞNG
- Bối cảnh: ${g.setting}
- Việc của học sinh mỗi lượt: ${g.mission}
${controlLines(v)}
- Mascot: **${it.mascot}** — ${it.tinhCach}. Ba câu thoại: khen "${it.lines[0]}" · đỡ khi sai "${it.lines[1]}" · hô mở đầu "${it.lines[2]}".
- Bảng màu riêng: \`--miti-1: ${it.palette[0]}\` (vật thể AR chính), \`--miti-2: ${it.palette[1]}\` (particle và viền hit), \`--miti-3: ${it.palette[2]}\` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: ${it.signature}. Đạo cụ AR neo vào người chơi: ${it.prop}.
- Môn thể thao của game: **${sp.mon}** — động tác đặc trưng "${sp.dongTac}", hiệu lệnh "${sp.hieuLenh}", lời hay khi bạn sai "${sp.loiHay}", duỗi cơ cuối buổi "${sp.duoiCo}".
- Trò chơi dân gian dẫn dắt: **${fk.tro}** — cách chơi "${fk.loiCho}", lời hô "${fk.chant}", đồ dùng AR "${fk.doDung}".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: ${cl.noi_dung}.
${bandLines ? bandLines + '\n' : ''}- Mạch kiến thức: **${st.mach}** — nhãn HUD "${st.ngan}" · **Tuần ${st.tuan[0]}–${st.tuan[1]} · ${hocKi(st.tuan[0])}**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "${st.yc}"
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "${st.meo}"
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "${errList.split('; ')[0]}".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): ${errList}.
- Phạm vi: chỉ dùng nội dung ${gradeTxt} đã học${english ? ` và trong đúng band ${bm.tukhoa} (level 3 tăng khó bằng câu dài hơn, không bằng từ ngoài band)` : ''}; cấm số hoặc từ vựng ngoài phạm vi trên.
- ${english ? 'Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.' : 'Toàn bộ lời giải phải dùng đúng thuật ngữ Toán của SGK ' + gradeTxt + '; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng cho đúng dạng bài.'}
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; thêm bốn dòng "Gửi bố mẹ": "Hôm nay con tập môn ${sp.mon} — <n> động tác" · "Con học ${st.ngan}, <k> câu đúng trên <tổng>" · "Mẹo con mang về: ${st.meo}" · "Việc 3 phút ở nhà: cả nhà cùng ${sp.dongTac} rồi hỏi nhau miệng một đề vừa chơi" (thay <n>, <k>, <tổng> bằng số thật).
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề ${g.name}, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

${CORE_TITLE}
${CORE}

4. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo \`const QUESTION_DATA = [...]\` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }.
- Tối thiểu ${bank.so} mục, chia 3 mức độ (level 1/2/3), mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- ${bank.luu_y}
- errorTag là mã máy của lỗi, lấy đúng một trong: ${cl.tags.join(', ')}. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: ${cl.giai_thich}.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ${CORE_SHORT}. Riêng ngân hàng: đủ ${bank.so} mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài ${gradeTxt}${english ? ` và band ${bm.tukhoa} (so từng từ tiếng Anh với danh sách ${wordsFor(row.band).size} từ ở mục 2)` : ''}; câu sai vào hàng đợi luyện lại trong cùng phiên. Model nhận diện: ${model}.
\`\`\`

---
`;
}

const rows = readCatalog(path.join(ROOT, 'catalogs', 'GAME_CATALOG.csv'));
const byId = new Map(GAMES.map((g) => [g.id, g]));
if (rows.length !== 85) throw new Error(`Cần đúng 85 game để sinh biến thể, catalog có ${rows.length}.`);

let out = `# 🎯 425 PROMPT BIẾN THỂ — MiTi (85 game × 5 kiểu điều khiển)

> **File này do \`tools/build-variants.mjs\` sinh ra từ \`tools/data/*\` + khối ràng buộc cốt lõi \`tools/lib/core.mjs\`.** Muốn đổi nội dung thì sửa dữ liệu hoặc CORE rồi chạy \`node tools/build-variants.mjs\`, đừng sửa tay.
>
> 85 game trong catalog × 5 biến thể điều khiển = **425 prompt độc lập**. Mỗi block \`## Prompt NNN\` copy nguyên khối \`text\` bên trong là dán được vào **Google Gemini → chế độ Canvas** ra một game 1 file HTML.
>
> Năm biến thể: **V1 CAMERA POINT** (chỉ ngón trỏ) · **V2 CAMERA SWIPE** (vuốt chém) · **V3 DRAG & GRAB** (kéo thả) · **V4 VOICE** (nói to đáp án) · **V5 NO-CAMERA** (phím + chuột). Cùng một thế giới và cùng một ngân hàng dữ liệu, chỉ khác cách chốt đáp án.
>
> Mỗi prompt gồm 5 mục gọn: **1. Ý TƯỞNG** (bối cảnh, nhân vật, cách chơi biến thể) · **2. MỤC TIÊU HỌC TẬP** (cụm kiến thức + chuẩn SGK, với game tiếng Anh là band Cambridge ST/MV/FY) · **3. RÀNG BUỘC CỐT LÕI** (14 dòng, bản nén của toàn bộ quy định chung — như nhau ở mọi block) · **4. NGÂN HÀNG DỮ LIỆU** · **5. TỰ KIỂM TRA**. Trần 15.000 byte / block.
>
> Ràng buộc cốt lõi đầy đủ chỉ có trong \`tools/lib/core.mjs\` — sửa một dòng là đổi cả 425 block. Bảng game + copy nhanh: \`index.html\` hoặc \`catalogs/GAME_CATALOG.md\`.

`;

let n = 0;
let maxBytes = 0;
let maxId = '';
let totalBlockBytes = 0;
for (const row of rows) {
  const g = byId.get(row.id);
  if (!g) throw new Error(`Thiếu enrichment cho game ${row.id} — không sinh được biến thể.`);
  out += `# ${row.id} — ${row.ten_game} — ${row.lop} — ${row.mon}\n\n`;
  for (const v of VARIANTS) {
    const b = block(++n, row, g, v);
    const size = bytes(b);
    if (size > BYTE_CAP) throw new Error(`Block ${n} (${row.id} ${v.code}) nặng ${size} byte, vượt trần ${BYTE_CAP}.`);
    totalBlockBytes += size;
    if (size > maxBytes) { maxBytes = size; maxId = `${row.id} ${v.code}`; }
    out += b;
  }
}

if (n !== 425) throw new Error(`Số block biến thể là ${n}, phải là 425.`);
fs.writeFileSync(OUT, out, 'utf8');

const totalBytes = bytes(out);
console.log(
  `Đã sinh ${n} block biến thể (85 game × 5 kiểu điều khiển) vào prompts/${path.basename(OUT)}.
  byte trung bình/block : ${Math.round(totalBlockBytes / n)}
  block lớn nhất        : ${maxBytes} byte (${maxId})  [trần ${BYTE_CAP}]
  tổng dung lượng file  : ${(totalBytes / 1024 / 1024).toFixed(2)} MB (${totalBytes} byte)`,
);
