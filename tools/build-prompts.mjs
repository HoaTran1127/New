import fs from 'fs';
import path from 'path';
import { GAMES } from './data/games.mjs';
import { GESTURES, BANK } from './data/gestures.mjs';
import { cluster } from './data/clusters.mjs';
import { EXAMPLES, EXAMPLES_YLE } from './data/examples.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { readCatalog } from './lib/csv.mjs';
import { CORE, CORE_TITLE, CORE_SHORT } from './lib/core.mjs';
import { standard } from './data/standards.mjs';
import { bandMeta, structureFor, topicWords, wordsFor, YLE_TOPIC_VI } from './data/yle.mjs';
import { sport } from './data/sports.mjs';
import { folk } from './data/folk.mjs';
import { identity } from './data/identities.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

const hocKi = (tuan) => (tuan <= 17 ? 'Học kì I' : 'Học kì II');

// In hai mục mẫu theo đúng khuôn QUESTION_DATA, có cả nhãn lỗi tiếng Việt hiển thị cho học sinh.
const jsonBlock = (rows, tags, notes) =>
  rows
    .map((r, i) => {
      const o = {
        id: 'q' + (i + 1),
        level: i + 1,
        prompt: r.prompt,
        choices: r.choices ?? null,
        answer: r.answer,
        explanation: r.explanation,
        errorTag: r.errorTag,
        dang: r.dang,
        loiViet: notes[tags.indexOf(r.errorTag)] ?? notes[0],
      };
      return '  ' + Object.entries(o).map(([k, v]) => k + ': ' + JSON.stringify(v)).join(', ');
    })
    .join('\n');

function render(c) {
  const g = c.game;
  const cl = cluster(g.cluster);
  const st = standard(g.cluster);
  const sp = sport(g.gestures[0]);
  const fk = folk(g.gestures[0]);
  const it = identity(g.id);
  if (!it) throw new Error(`Thiếu bản sắc cho game ${g.id} — bổ sung tools/data/identities.mjs.`);
  const main = GESTURES[g.gestures[0]];
  if (!main) throw new Error('Không có khối gesture: ' + g.gestures[0]);
  const bank = BANK[c.subject];
  const gradeTxt = c.subject === 'Toán' ? `Toán lớp ${c.grade}` : `Tiếng Anh lớp ${c.grade}`;
  const english = c.subject === 'Tiếng Anh';
  const errList = ERROR_NOTES[g.cluster];
  const model = g.gestures.some((x) => ['STEP', 'TWO_HAND_STRETCH', 'TWO_HAND_BALANCE', 'ANGLE_POSE'].includes(x))
    ? 'PoseLandmarker'
    : 'HandLandmarker';

  // Band Cambridge là trần tuyệt đối cho từ vựng + cấu trúc của game tiếng Anh.
  const bm = english ? bandMeta(c.band) : null;
  if (english && !bm) throw new Error('Catalog thiếu cột band cho game ' + g.id);
  const ex = english ? EXAMPLES_YLE[c.band + ':' + g.cluster] : EXAMPLES[g.cluster];
  if (!ex) throw new Error(`Thiếu mục mẫu cho "${c.band}:${g.cluster}" — bổ sung EXAMPLES_YLE trong tools/data/examples.mjs.`);
  const vocab = english
    ? [...new Set(g.topics.flatMap((t) => topicWords(t, c.band)))]
    : [];
  const bandBlock = english
    ? `- Band Cambridge: **${bm.ten}** (${bm.cefr}) — ${bm.moTa}
- Trần từ vựng: chỉ dùng ${wordsFor(c.band).size} từ thuộc ${bm.tukhoa} trở xuống, ưu tiên ${vocab.length} từ của chủ đề ${g.topics.map((t) => YLE_TOPIC_VI[t] ?? t).join(', ')}: ${vocab.slice(0, 28).join(', ')}${vocab.length > 28 ? ', …' : ''}. Cấm mọi từ lần đầu xuất hiện ở band cao hơn; từ SGK Việt Nam ngoài danh sách trên chỉ được dùng nếu đã học ở ${gradeTxt}.
- Trần ngữ pháp: chỉ dùng 8 cấu trúc của ${bm.tukhoa} — ${structureFor(c.band).map(([t, m]) => `${t} ("${m}")`).join(' · ')}.`
    : null;
  const noteBand = english
    ? '- Band Cambridge: `' + c.band + '` (' + bm.ten + ') — đổi band thì phải đổi cả thư mục prompt, `EXAMPLES_YLE` và dải từ trong `tools/data/yle.mjs`.\n'
    : '';

  return `# ${g.id} — ${g.name}

> ${c.subject} lớp ${c.grade}${english ? ` · Band Cambridge **${bm.ten}** (${bm.cefr})` : ''} · Điều khiển: ${main.vi} · Cụm kiến thức: ${g.cluster}
> Prompt độc lập: copy nguyên khối \`text\` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

\`\`\`text
Tạo game giáo dục web "${g.name.toUpperCase()}" cho học sinh Việt Nam lớp ${c.grade}, môn ${c.subject}${english ? `, chuẩn ${bm.ten} (${bm.cefr}) của Cambridge` : ''}.

1. Ý TƯỞNG
- Bối cảnh: ${g.setting}
- Việc của học sinh mỗi lượt: ${g.mission}
- Điều khiển: ${main.vi}. ${main.landmark} Biên độ động tác: ${main.bien_do}
- Không có camera thì ${main.fallback}.
- Mascot: **${it.mascot}** — ${it.tinhCach}. Ba câu thoại: khen "${it.lines[0]}" · đỡ khi sai "${it.lines[1]}" · hô mở đầu "${it.lines[2]}".
- Bảng màu riêng: \`--miti-1: ${it.palette[0]}\` (vật thể AR chính), \`--miti-2: ${it.palette[1]}\` (particle và viền hit), \`--miti-3: ${it.palette[2]}\` (điểm nhấn HUD).
- Khoảnh khắc chữ ký: ${it.signature}. Đạo cụ AR neo vào người chơi: ${it.prop}.
- Môn thể thao của game: **${sp.mon}** — động tác đặc trưng "${sp.dongTac}", hiệu lệnh "${sp.hieuLenh}", lời hay khi bạn sai "${sp.loiHay}", duỗi cơ cuối buổi "${sp.duoiCo}".
- Trò chơi dân gian dẫn dắt: **${fk.tro}** — cách chơi "${fk.loiCho}", lời hô "${fk.chant}", đồ dùng AR "${fk.doDung}".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: ${cl.noi_dung}.
${bandBlock ? bandBlock + '\n' : ''}- Mạch kiến thức: **${st.mach}** — nhãn HUD "${st.ngan}" · **Tuần ${st.tuan[0]}–${st.tuan[1]} · ${hocKi(st.tuan[0])}**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "${st.yc}"
- Mẹo nhớ (≤12 từ, bật ở cú đúng câu đầu cụm và sau câu sai cùng lỗi, mascot đọc to kèm một động tác 3 giây làm mẫu): "${st.meo}"
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "${errList.split('; ')[0]}".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): ${errList}.
- Phạm vi: chỉ dùng nội dung ${gradeTxt} đã học${english ? ` và trong đúng band ${bm.tukhoa}` : ''}; cấm số hoặc từ vựng ngoài phạm vi trên.
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
- ${bank.luu_y}${english ? `\n- Chia mức theo band: level 1 lấy từ và cấu trúc cơ bản nhất của ${bm.tukhoa}; level 3 vẫn nằm trong ${bm.tukhoa}, tăng độ khó bằng câu dài hơn và phương án gần nghĩa hơn, không tăng bằng từ ngoài band.` : ''}
- errorTag là mã máy của lỗi, lấy đúng một trong: ${cl.tags.join(', ')}. loiViet là cụm tiếng Việt có dấu in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, cùng chỉ lỗi đó và là thứ hiển thị cho học sinh. Mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: ${cl.giai_thich}.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Hai mục mẫu để bám theo khuôn (viết tiếp ${bank.so - 2} mục nữa, không được ít hơn):
${jsonBlock(ex, cl.tags, errList.split('; '))}

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ${CORE_SHORT}. Riêng ngân hàng: đủ ${bank.so} mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài ${gradeTxt}${english ? ` và band ${bm.tukhoa} (so lại từng từ tiếng Anh trong đề và phương án với danh sách ${wordsFor(c.band).size} từ ở mục 2, từ nào ngoài danh sách thì thay bằng từ trong danh sách)` : ''}; câu sai vào hàng đợi luyện lại trong cùng phiên.
\`\`\`

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: \`${g.cluster}\` — đổi cluster nếu đổi dạng bài.
${noteBand}- Gesture: \`${g.rawGestures}\` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: ${model}.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa \`tools/data/games.mjs\` / \`tools/data/clusters.mjs\` rồi chạy \`node tools/build-prompts.mjs\`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa \`tools/lib/core.mjs\`.
`;
}

const rows = readCatalog(path.join(ROOT, 'catalogs/GAME_CATALOG.csv'));
const byId = new Map(GAMES.map((g) => [g.id, g]));
const missing = rows.filter((r) => !byId.has(r.id));
if (missing.length) throw new Error('Thiếu enrichment cho: ' + missing.map((r) => r.id).join(', '));
const orphan = GAMES.filter((g) => !rows.find((r) => r.id === g.id));
if (orphan.length) throw new Error('Enrichment không khớp catalog: ' + orphan.map((g) => g.id).join(', '));

let n = 0;
const tagLoi = [];
for (const r of rows) {
  const g = byId.get(r.id);
  const target = path.join(ROOT, r.prompt);
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) throw new Error('Thư mục prompt không tồn tại: ' + dir);
  fs.writeFileSync(target, render({ grade: r.lop, subject: r.mon, band: r.band, id: r.id, game: g }), 'utf8');
  const tags = cluster(g.cluster).tags;
  const examples = r.band ? EXAMPLES_YLE[r.band + ':' + g.cluster] : EXAMPLES[g.cluster];
  for (const e of examples ?? []) {
    if (!tags.includes(e.errorTag)) tagLoi.push(`${g.id}: mẫu dùng errorTag "${e.errorTag}" nhưng cụm "${g.cluster}" chỉ có ${tags.join(', ')}`);
  }
  n++;
}
if (tagLoi.length) console.warn('\nCẢNH BÁO lệch dữ liệu (' + tagLoi.length + '):\n' + [...new Set(tagLoi)].slice(0, 8).join('\n'));
console.log('Đã sinh', n, 'prompt game.', 'Ràng buộc cốt lõi:', CORE.split('\n').length, 'dòng.');
