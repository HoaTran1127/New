// Sinh 85 prompt game môn học từ tools/data + khung chung tools/lib/skeleton.mjs.
// render(game) là hàm thuần (chỉ đọc catalog lúc nạp module) để test import được;
// phần ghi tệp chỉ chạy khi gọi trực tiếp: node tools/build-prompts.mjs
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { GAMES } from './data/games.mjs';
import { GESTURES, BANK } from './data/gestures.mjs';
import { CLUSTER_KEYS, cluster } from './data/clusters.mjs';
import { EXAMPLES } from './data/examples.mjs';
import { ERROR_NOTES } from './data/error-notes.mjs';
import { readCatalog } from './lib/csv.mjs';
import { renderSections, sharedRuleLines } from './lib/skeleton.mjs';
import { isFingerGame, modelLine, VOICE_TURN } from './lib/players.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

const bullet = (s) => '- ' + s;

// Catalog là nguồn lớp/môn/đường dẫn prompt; đọc một lần, không ghi.
const ROWS = readCatalog(path.join(ROOT, 'catalogs/GAME_CATALOG.csv'));
const ROW_OF = new Map(ROWS.map((r) => [r.id, r]));

// In hai mục mẫu theo đúng khuôn QUESTION_DATA, có cả nhãn lỗi tiếng Việt hiển thị cho học sinh.
const jsonLines = (rows, tags, notes) =>
  rows.map((r, i) => {
    const o = {
      id: 'q' + (i + 1),
      level: i + 1,
      prompt: r.prompt,
      choices: r.choices ?? null,
      answer: r.answer,
      explanation: r.explanation,
      errorTag: r.errorTag,
      loiViet: notes[tags.indexOf(r.errorTag)] ?? notes[0],
    };
    return '  ' + Object.entries(o).map(([k, v]) => k + ': ' + JSON.stringify(v)).join(', ');
  });

function gestureLines(gestures, where) {
  const main = GESTURES[gestures[0]];
  if (!main) throw new Error(`${where}: không có khối gesture: ${gestures[0]}`);
  const out = [
    `Cử chỉ chính — ${main.vi}: ${main.landmark}`,
    `Biên độ động tác của cơ chế này: ${main.bien_do}`,
    `Điều kiện chốt đáp án (hit): ${main.hinh_hoc}`,
    `Làm mượt và chống spam: ${main.muot}`,
    `Ngưỡng tin cậy: ${main.nguong}`,
    `Phản hồi hình ảnh cho người chơi: ${main.nguoi_choi}`,
    `Hòa vào nền AR: ${main.ar}`,
  ];
  if (gestures[1]) {
    const sub = GESTURES[gestures[1]];
    if (!sub) throw new Error(`${where}: không có khối gesture phụ: ${gestures[1]}`);
    out.push(`Cử chỉ phụ — ${sub.vi}: ${sub.landmark} Chỉ dùng cho thao tác phụ, không tranh chấp với cử chỉ chính: ${sub.hinh_hoc}`);
  }
  return out.map(bullet);
}

// Chèn các dòng riêng của game vào sau vị trí `at` (mặc định cuối mảng).
const insert = (arr, lines, at = arr.length) => [...arr.slice(0, at), ...lines, ...arr.slice(at)];

export function render(g) {
  const row = ROW_OF.get(g.id);
  if (!row) throw new Error(`${g.id}: không có dòng trong catalogs/GAME_CATALOG.csv`);
  const where = `${g.id} (${row.prompt})`;

  const cl = cluster(g.cluster);
  const ex = EXAMPLES[g.cluster];
  const notes = ERROR_NOTES[g.cluster];
  const bank = BANK[row.mon];
  const main = GESTURES[g.gestures[0]];
  if (!cl) throw new Error(`${where}: không có cụm kiến thức ${g.cluster}`);
  if (!ex) throw new Error(`${where}: không có mục mẫu cho cụm ${g.cluster}`);
  if (!notes) throw new Error(`${where}: không có lỗi thường gặp cho cụm ${g.cluster}`);
  if (!bank) throw new Error(`${where}: không có BANK cho môn ${row.mon}`);
  if (!main) throw new Error(`${where}: không có khối gesture: ${g.gestures[0]}`);

  const english = row.mon === 'Tiếng Anh';
  const gradeTxt = `${row.mon} lớp ${row.lop}`;
  const voice = g.gestures.includes('VOICE');

  const parts = sharedRuleLines({ english, camera: true, finger: isFingerGame(g.gestures) });

  parts.players = insert(parts.players, voice ? [bullet(VOICE_TURN)] : [], 8);

  parts.motion = [
    bullet(`Bối cảnh: ${g.setting} Vật thể xuất hiện NGAY TRONG khung hình camera thật, tiến từ phía sau về phía người chơi.`),
    bullet(`Cơ chế chính: ${main.vi}; nhiệm vụ hiện bằng một dòng chữ to trên HUD.`),
    ...gestureLines(g.gestures, where),
    ...parts.motion,
  ];

  parts.memory = [
    bullet(`Nhiệm vụ mỗi lượt: ${g.mission}`),
    bullet(`Phạm vi: chỉ nội dung ${gradeTxt} đã học; cấm đề, số hoặc từ vựng vượt chương trình. Vòng đầu dễ để hiểu luật trong vài giây.`),
    bullet(`Lỗi thường gặp (mỗi câu sai ghi đúng một lỗi): ${notes}.`),
    bullet(`Lời giải khi sai: ${cl.giai_thich}; không để hiệu ứng che lời giải.`),
    ...parts.memory,
    ...(english
      ? []
      : [bullet(`Lời giải dùng đúng thuật ngữ Toán SGK ${gradeTxt}; hiện lại phép tính theo cột dọc hoặc sơ đồ đoạn thẳng đúng dạng bài.`)]),
  ];

  parts.data = [
    ...parts.data,
    bullet(`Tối thiểu ${bank.so} mục, đáp án kiểm chứng được bằng code. ${bank.luu_y}`),
    bullet(`errorTag lấy đúng một trong: ${cl.tags.join(', ')}; loiViet lấy nguyên văn một mục trong danh sách lỗi ở mục 4.`),
    bullet(`Hai mục mẫu để bám khuôn (viết tiếp ${bank.so - 2} mục nữa, không ít hơn):`),
    ...jsonLines(ex, cl.tags, notes.split('; ')),
  ];

  // tech[0] = AR_RENDER, tech[1] = dòng Tasks Vision → câu "model:" ngay sau.
  parts.tech = insert(parts.tech, [
    bullet(modelLine(g.gestures)),
    ...(voice ? [bullet('Riêng phần nói dùng Web Speech API SpeechRecognition (en-US), không dùng MediaPipe.')] : []),
  ], 2);
  parts.tech = [...parts.tech, bullet(`Fallback của cơ chế này: ${main.fallback}.`)];

  let body;
  try {
    body = renderSections(parts, where);
  } catch (e) {
    throw new Error(e.message.startsWith(where) ? e.message : `${where}: ${e.message}`);
  }

  return `# ${g.id} — ${g.name}

> ${row.mon} lớp ${row.lop} · Điều khiển: ${main.vi} · Cụm kiến thức: ${g.cluster}
> Prompt độc lập: copy nguyên khối \`text\` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

\`\`\`text
Tạo game giáo dục web "${g.name.toUpperCase()}" cho học sinh Việt Nam lớp ${row.lop}, môn ${row.mon}.
Mục tiêu học tập: ${cl.noi_dung}.
1 file HTML duy nhất (CSS trong <style>, JS nội tuyến), không Tailwind Play CDN, không tệp ngoài; chỉ tải MediaPipe (CDN + model) và font có dự phòng.

${body}
\`\`\`

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: \`${g.cluster}\` — đổi cluster nếu đổi dạng bài.
- Gesture: \`${g.rawGestures}\` — mỗi game tối đa 2 mã, mã đầu là mechanic chính.
- Muốn thêm nội dung mới: sửa \`tools/data/games.mjs\` rồi chạy \`node tools/build-prompts.mjs\`, không sửa tay file này.
`;
}

function main() {
  const byId = new Map(GAMES.map((g) => [g.id, g]));
  const missing = ROWS.filter((r) => !byId.has(r.id));
  if (missing.length) throw new Error('Thiếu enrichment cho: ' + missing.map((r) => `${r.id} (${r.prompt})`).join(', '));
  const orphan = GAMES.filter((g) => !ROW_OF.has(g.id));
  if (orphan.length) throw new Error('Enrichment không khớp catalog: ' + orphan.map((g) => g.id).join(', '));

  let n = 0;
  for (const r of ROWS) {
    const target = path.join(ROOT, r.prompt);
    if (!fs.existsSync(target)) throw new Error(`${r.id}: đường dẫn catalog không tồn tại: ${r.prompt}`);
    fs.writeFileSync(target, render(byId.get(r.id)), 'utf8');
    n++;
  }
  console.log('Đã sinh', n, 'prompt game.', CLUSTER_KEYS.length, 'cụm kiến thức.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
