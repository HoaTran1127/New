// Bộ sinh ngẫu nhiên có seed cho property test (không phụ thuộc npm).
// Dùng: import { forAll, gens } from './gen.mjs';
//   forAll('tên', (r) => r.int(0, 10), (x) => x >= 0);
// Tái hiện lỗi: SEED=<số> node --test "tools/test/*.test.mjs"
// (Node ≥ 22 coi `node --test tools/test` là đường dẫn tệp, nên dùng glob.)

// mulberry32: PRNG 32-bit nhanh, tất định theo seed.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Tạo đối tượng rng với các hàm sinh cơ bản.
export function makeRng(seed) {
  const next = mulberry32(seed);
  const r = {
    seed: seed >>> 0,
    float01: () => next(),
    // Số nguyên trong [lo, hi] (gồm cả hai đầu).
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    // Số thực trong [lo, hi).
    float: (lo, hi) => lo + next() * (hi - lo),
    bool: (p = 0.5) => next() < p,
    pick: (arr) => {
      if (!arr.length) throw new Error('pick: mảng rỗng');
      return arr[Math.floor(next() * arr.length)];
    },
    // Fisher–Yates, trả mảng mới.
    shuffle: (arr) => {
      const out = arr.slice();
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    },
    // Mảng độ dài [minLen, maxLen], mỗi phần tử do gen(r, i) sinh.
    arrayOf: (gen, minLen, maxLen) => {
      const len = r.int(minLen, maxLen);
      const out = [];
      for (let i = 0; i < len; i++) out.push(gen(r, i));
      return out;
    },
  };
  return r;
}

// Hàm tiện ích độc lập (nhận rng làm tham số đầu).
export const int = (r, lo, hi) => r.int(lo, hi);
export const float01 = (r) => r.float01();
export const pick = (r, arr) => r.pick(arr);
export const shuffle = (r, arr) => r.shuffle(arr);
export const arrayOf = (r, gen, minLen, maxLen) => r.arrayOf(gen, minLen, maxLen);

function resolveSeed(seed) {
  const env = process.env.SEED;
  if (env !== undefined && env !== '') {
    const n = Number(env);
    if (!Number.isFinite(n)) throw new Error(`SEED không hợp lệ: ${env}`);
    return n >>> 0;
  }
  if (seed !== undefined) return seed >>> 0;
  return (Date.now() ^ Math.floor(Math.random() * 0x100000000)) >>> 0;
}

function show(v) {
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

// Chạy prop trên `runs` đầu vào do gen sinh. prop thất bại khi trả false hoặc ném lỗi.
// Khi thất bại: ném Error nêu tên, seed, lần lặp và đầu vào để tái hiện.
export function forAll(name, gen, prop, { runs = 100, seed } = {}) {
  const base = resolveSeed(seed);
  const r = makeRng(base);
  for (let i = 0; i < runs; i++) {
    const input = gen(r);
    let ok;
    let cause;
    try {
      ok = prop(input);
    } catch (e) {
      ok = false;
      cause = e;
    }
    if (ok === false) {
      const msg =
        `forAll "${name}" thất bại ở lần ${i + 1}/${runs}\n` +
        `  seed: ${base} (chạy lại: SEED=${base} node --test "tools/test/*.test.mjs")\n` +
        `  đầu vào: ${show(input)}` +
        (cause ? `\n  lỗi: ${cause && cause.message ? cause.message : cause}` : '');
      console.error(msg);
      const err = new Error(msg);
      if (cause) err.cause = cause;
      err.seed = base;
      err.input = input;
      throw err;
    }
  }
  return { seed: base, runs };
}

// ---------- Bộ sinh cho Yêu cầu 9–10 ----------

// FPS quanh ngưỡng 15, gồm đúng 15 và 14.99.
export const FPS_EDGES = [13, 14, 14.99, 15, 15.01, 16, 17];

export function fpsValue(r) {
  return r.bool(0.5) ? r.pick(FPS_EDGES) : Math.round(r.float(13, 17) * 100) / 100;
}

// Chuỗi mẫu { tMs, fps } tăng dần theo tMs, bước 16–200 ms.
export function fpsSamples(r, minLen = 1, maxLen = 60) {
  let t = r.int(0, 1000);
  return r.arrayOf(
    (rr, i) => {
      if (i > 0) t += rr.int(16, 200);
      return { tMs: t, fps: fpsValue(rr) };
    },
    minLen,
    maxLen,
  );
}

export const HAND_EVENTS = ['ok', 'miss', 'ambiguous'];

// Chuỗi sự kiện tay ghép từ các đoạn cùng loại; có đoạn dài ≥ 3.
export function handEvents(r, maxLen = 30) {
  const out = [];
  const target = r.int(0, maxLen);
  while (out.length < target) {
    const ev = r.pick(HAND_EVENTS);
    const run = r.bool(0.4) ? r.int(3, 6) : r.int(1, 2);
    for (let k = 0; k < run && out.length < target; k++) {
      // Trong đoạn không-ok, trộn miss/ambiguous để vẫn là chuỗi "không ok" liên tiếp.
      out.push(ev === 'ok' ? 'ok' : r.pick(['miss', 'ambiguous']));
    }
  }
  return out;
}

// switchAt cho N người, rounds vòng: biên 0, N−1, bội số của N, rounds·N − 1, null, hoặc ngẫu nhiên.
export function switchAtFor(r, n, rounds = 8) {
  const total = rounds * n;
  const multiples = [];
  for (let k = n; k < total; k += n) multiples.push(k);
  const edges = [0, n - 1, total - 1, null, ...multiples];
  if (r.bool(0.6)) return r.pick(edges);
  return r.int(0, total - 1);
}

// Ca kiểm answerSchedule với rounds = 8 (như prompt), N ∈ {2, 3}.
export function scheduleCase(r) {
  const n = r.pick([2, 3]);
  const rounds = 8;
  return { n, rounds, switchAt: switchAtFor(r, n, rounds) };
}

// Ca tổng quát: rounds ngẫu nhiên 1–12.
export function scheduleCaseGeneral(r) {
  const n = r.pick([2, 3]);
  const rounds = r.int(1, 12);
  return { n, rounds, switchAt: switchAtFor(r, n, rounds) };
}

// lowMs gồm biên 2999/3000/5999/6000.
export const LOW_MS_EDGES = [0, 2999, 3000, 5999, 6000];

export function lowMs(r) {
  return r.bool(0.5) ? r.pick(LOW_MS_EDGES) : r.int(0, 12000);
}

// Ca effectsBudget: { lowMs, reduced }.
export function effectsCase(r) {
  return { lowMs: lowMs(r), reduced: r.bool() };
}

export const INPUT_SETTINGS = ['auto', 'turn', 'wrist'];

// Chuỗi cặp (degraded, loadFailed) dài 1–30 kèm cài đặt, N, Finger_Game, loadFailed lúc khởi động.
// Có hẳn nhánh: cài đặt `turn` với loadFailed ở bước đầu.
export function transitionCase(r) {
  const forceEarlyFail = r.bool(0.2);
  const setting = forceEarlyFail ? 'turn' : r.pick(INPUT_SETTINGS);
  const n = r.pick([1, 2, 3]);
  const finger = forceEarlyFail ? true : r.bool(0.7);
  const bootLoadFailed = forceEarlyFail ? false : r.bool(0.15);
  const pFail = r.pick([0, 0.05, 0.2]);
  const pDeg = r.pick([0, 0.1, 0.3, 0.6]);
  const steps = r.arrayOf((rr) => ({ degraded: rr.bool(pDeg), loadFailed: rr.bool(pFail) }), 1, 30);
  if (forceEarlyFail) steps[0] = { degraded: r.bool(), loadFailed: true };
  return { setting, n, finger, loadFailed: bootLoadFailed, steps };
}

// Gom lại để import gọn.
export const gens = {
  fpsSamples,
  handEvents,
  switchAtFor,
  scheduleCase,
  scheduleCaseGeneral,
  lowMs,
  effectsCase,
  transitionCase,
};
