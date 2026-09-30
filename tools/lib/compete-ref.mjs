// Hàm tham chiếu thuần cho luật nhiều người chơi, thi đua, nhập liệu tay và hiệu ứng.
// KHÔNG chèn vào prompt: đây là đặc tả thực thi được để test (tools/test) và để câu chữ
// trong PLAYERS / INPUT / COMPETE / EFFECTS không lệch ý. Không có import, không có side effect.

// ───── LÀN (Yêu cầu 2, 3) ─────

// x đã lật gương, 0..1 → chỉ số làn 0..n-1 (n = 1 luôn là 0), đơn điệu theo x
export const laneOf = (x, n) => Math.min(n - 1, Math.max(0, Math.floor(x * n)));

// poses: [{ id, hips?: [x, x], shoulders?: [x, x] }] → Map<id, lane>; tâm hông, thiếu hông thì tâm vai.
// Tư thế không có cả hông lẫn vai bị bỏ qua. Kết quả không phụ thuộc thứ tự mảng.
export function assignLanes(poses, n) {
  const center = (p) => {
    const pts = p.hips ?? p.shoulders;
    return pts.reduce((a, b) => a + b, 0) / pts.length;
  };
  return new Map(
    poses.filter((p) => (p.hips ?? p.shoulders)?.length).map((p) => [p.id, laneOf(center(p), n)]),
  );
}

// count = số cơ thể trong làn; lastSeenMs = mốc gần nhất thấy cơ thể trong làn
export function laneStatus(count, lastSeenMs, nowMs) {
  if (count > 1) return 'crowded';
  if (count === 1) return 'ok';
  return nowMs - lastSeenMs > 2000 ? 'absent' : 'waiting';
}

// counts[i] = số cơ thể ở làn i; sẵn sàng khi mọi làn có đúng một cơ thể
export const calibrationReady = (counts) => counts.length > 0 && counts.every((c) => c === 1);

// Luật làn cho mọi điểm chạm (với tay, bước chân, cổ tay chạm mục tiêu)
export const acceptAction = (lane, hitX, n, status) => status === 'ok' && laneOf(hitX, n) === lane;

// ───── THI ĐUA (Yêu cầu 4) ─────

// Thứ tự: điểm giảm, câu đúng giảm, tổng thời gian tăng
const better = (a, b) => b.score - a.score || b.correct - a.correct || a.totalMs - b.totalMs;

// players: [{ id, score, correct, totalMs }] → [{ id, rank }] sắp theo hạng.
// rank = 1 + số người hơn hẳn (xếp hạng kiểu thi đấu 1, 1, 3): đồng hạng khi bằng cả ba chỉ số,
// không phụ thuộc thứ tự đầu vào.
export function rankPlayers(players) {
  const ranked = players.map((p) => ({
    id: p.id,
    rank: 1 + players.filter((q) => better(q, p) < 0).length,
  }));
  return ranked.sort((a, b) => a.rank - b.rank || String(a.id).localeCompare(String(b.id)));
}

// Em kém người dẫn đầu từ 2 câu đúng trở lên
export const catchUpEligible = (p, players) =>
  Math.max(...players.map((q) => q.correct)) - p.correct >= 2;

// history = chỉ số các câu em đã nhận x2; qIndex = câu hiện tại; climax = hiệp quyết định (đã nhân đôi)
export function grantDouble(history, qIndex, eligible, climax) {
  if (!eligible || climax) return false; // hiệp quyết định: dùng "câu lội ngược dòng" thay thẻ x2
  return !history.some((h) => Math.abs(qIndex - h) < 3); // ≤ 1 thẻ x2 trong mỗi cửa sổ 3 câu
}

// Hệ số điểm không bao giờ vượt x2 (thẻ x2 không cộng dồn với hiệp quyết định)
export const multiplier = (double, climax) => (double || climax ? 2 : 1);

export const TITLES = {
  fastest: 'Nhanh nhất',
  accurate: 'Chính xác nhất',
  mover: 'Vận động nhiều nhất',
  streak: 'Chuỗi dài nhất',
  lateBurst: 'Bứt phá cuối ván',
  persistent: 'Kiên trì',
};

// stats: [{ id, avgMs, accuracy, moves, bestStreak }] → Map<id, string[]>.
// Mỗi danh hiệu chỉ số trao cho mọi người có giá trị tối ưu (đồng giá trị thì cùng nhận).
// Ai chưa có danh hiệu nhận danh hiệu dự phòng theo chỉ số của chính em:
// có chuỗi đúng (bestStreak > 0) → "Bứt phá cuối ván", ngược lại → "Kiên trì".
export function awardTitles(stats) {
  const out = new Map(stats.map((s) => [s.id, []]));
  const metrics = [
    [TITLES.fastest, 'avgMs', Math.min],
    [TITLES.accurate, 'accuracy', Math.max],
    [TITLES.mover, 'moves', Math.max],
    [TITLES.streak, 'bestStreak', Math.max],
  ];
  for (const [title, key, pick] of metrics) {
    const valid = stats.filter((s) => Number.isFinite(s[key]));
    if (!valid.length) continue;
    const best = pick(...valid.map((s) => s[key]));
    valid.filter((s) => s[key] === best).forEach((s) => out.get(s.id).push(title));
  }
  for (const s of stats) {
    const list = out.get(s.id);
    if (!list.length) list.push(s.bestStreak > 0 ? TITLES.lateBurst : TITLES.persistent);
  }
  return out;
}

// N = 1: so với kỷ lục của chính em; best == null nghĩa là chưa có kỷ lục
export function soloResult(score, best) {
  const isNewBest = best == null || score > best;
  return { isNewBest, best: isNewBest ? score : best };
}

// ───── INPUT (Yêu cầu 9) ─────
// setting ∈ 'auto' | 'turn' | 'wrist'; mode ∈ 'solo' | 'pose' | 'turn' | 'wrist'

export const TURNS_PER_PLAYER = 8;

export function initialInputMode(setting, n, finger, loadFailed = false) {
  if (n === 1) return 'solo';
  if (!finger) return 'pose';
  if (loadFailed) return 'wrist'; // 9.17: model tay lỗi thắng mọi cài đặt
  return setting === 'wrist' ? 'wrist' : 'turn';
}

// Số Main_Turn theo chế độ khởi đầu (9.14, 9.15)
export const mainTurns = (mode, n) => (mode === 'turn' ? TURNS_PER_PLAYER * n : 12);

// id 1..n, vòng tròn P1 → … → Pn → P1
export const nextActivePlayer = (cur, n) => (cur % n) + 1;

// Lịch trả lời Finger_Game N ≥ 2 trong `rounds` vòng. switchAt: chỉ số lượt (0-based) bị hủy
// do chuyển sang cổ tay; null (hoặc ngoài [0, n·rounds)) = không chuyển.
// Lượt dở chơi lại bằng cổ tay, hoàn tất vòng dở lần lượt, các vòng sau đồng thời.
// Trả [{ mode: 'turn' | 'wrist-turn' | 'wrist', players: number[] }]; mỗi em đúng `rounds` câu.
export function answerSchedule(n, rounds, switchAt = null) {
  const total = n * rounds;
  const sw = switchAt != null && switchAt >= 0 && switchAt < total ? switchAt : null;
  const all = Array.from({ length: n }, (_, i) => i + 1);
  const steps = [];
  for (let t = 0; t < (sw ?? total); t++) steps.push({ mode: 'turn', players: [(t % n) + 1] });
  if (sw == null) return steps;
  const done = Math.floor(sw / n); // số vòng đã trọn trước lượt bị hủy
  for (let t = sw; t < (done + 1) * n; t++) steps.push({ mode: 'wrist-turn', players: [(t % n) + 1] });
  for (let r = done + 1; r < rounds; r++) steps.push({ mode: 'wrist', players: [...all] });
  return steps;
}

export function turnsBalanced(steps, n) {
  const c = Array(n).fill(0);
  steps.forEach((s) => s.players.forEach((p) => c[p - 1]++));
  return c.every((x) => x === c[0]);
}

// Turn_Mode: chỉ nhận tay có cổ tay trong làn của Active_Player; chỉ đồng hồ của Active_Player chạy
export const acceptHand = (wristX, n, active, mode) => mode !== 'turn' || laneOf(wristX, n) === active - 1;
export const timerRunning = (id, active, mode) => mode !== 'turn' || id === active;

// samples: [{ tMs, fps }] tăng dần theo tMs → số ms của đoạn FPS < 15 liên tục ở cuối chuỗi
export function lowFpsSpan(samples) {
  let i = samples.length - 1;
  if (i < 0 || samples[i].fps >= 15) return 0;
  while (i > 0 && samples[i - 1].fps < 15) i--;
  return samples[samples.length - 1].tMs - samples[i].tMs;
}

// events: ('ok' | 'miss' | 'ambiguous')[] → số sự kiện không 'ok' liên tiếp ở cuối
export function missStreak(events) {
  let k = 0;
  for (let i = events.length - 1; i >= 0 && events[i] !== 'ok'; i--) k++;
  return k;
}

// misses = missStreak(events)
export const healthDegraded = (samples, misses) => lowFpsSpan(samples) >= 3000 || misses >= 3;

// state = { mode, scores, noticeMs }. 'turn' → 'wrist' khi loadFailed (mọi cài đặt, ngoại lệ 9.12)
// hoặc 'auto' + degraded. Điểm giữ nguyên, không bao giờ quay lại 'turn'.
export function inputModeTransition(state, setting, degraded, loadFailed = false) {
  if (state.mode !== 'turn') return state;
  if (!loadFailed && (setting !== 'auto' || !degraded)) return state;
  return { ...state, mode: 'wrist', noticeMs: 3000 };
}

// ───── EFFECTS (Yêu cầu 10) ─────
// lowMs = lowFpsSpan(samples); reduced = prefers-reduced-motion || nút "Giảm hiệu ứng"
export function effectsBudget(lowMs, reduced) {
  const cut = lowMs >= 3000; // cắt hiệu ứng trước
  return {
    particles: reduced ? 0 : cut ? 12 : 40,
    shake: !reduced && !cut,
    hitStop: !reduced,
    fade: reduced, // mờ dần tĩnh thay cho rung, hit-stop, hạt
    flashMaxHz: 3,
    detectEvery: lowMs >= 6000 ? 2 : 1, // giảm tần suất nhận diện chỉ sau thêm 3 giây
  };
}
