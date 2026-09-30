// Kiểm nhanh bộ sinh có seed.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  makeRng, forAll, fpsSamples, handEvents, scheduleCase, scheduleCaseGeneral,
  lowMs, transitionCase, LOW_MS_EDGES,
} from './gen.mjs';

test('cùng seed cho cùng chuỗi', () => {
  const a = makeRng(42), b = makeRng(42);
  for (let i = 0; i < 50; i++) assert.equal(a.float01(), b.float01());
});

test('int trong phạm vi, shuffle giữ phần tử', () => {
  forAll('int/shuffle', (r) => ({ x: r.int(-3, 5), s: r.shuffle([1, 2, 3, 4]) }), ({ x, s }) =>
    x >= -3 && x <= 5 && Number.isInteger(x) && [...s].sort().join() === '1,2,3,4', { seed: 1 });
});

test('forAll báo seed và đầu vào khi thất bại', () => {
  const err = (() => { try { forAll('luôn sai', (r) => r.int(0, 9), () => false, { seed: 7 }); } catch (e) { return e; } })();
  assert.ok(err, 'phải ném lỗi');
  assert.match(err.message, new RegExp(`seed: ${process.env.SEED ? Number(process.env.SEED) >>> 0 : 7}`));
  assert.match(err.message, /đầu vào:/);
});

test('bộ sinh Yêu cầu 9–10 đúng hình dạng', () => {
  forAll('shapes', (r) => ({
    fps: fpsSamples(r), ev: handEvents(r), sc: scheduleCase(r), sg: scheduleCaseGeneral(r),
    low: lowMs(r), tr: transitionCase(r),
  }), ({ fps, ev, sc, sg, low, tr }) => {
    for (let i = 1; i < fps.length; i++) {
      const d = fps[i].tMs - fps[i - 1].tMs;
      if (d < 16 || d > 200) return false;
    }
    if (!fps.every((s) => s.fps >= 13 && s.fps <= 17)) return false;
    if (!ev.every((e) => ['ok', 'miss', 'ambiguous'].includes(e))) return false;
    if (sc.rounds !== 8 || !(sc.switchAt === null || (sc.switchAt >= 0 && sc.switchAt < 8 * sc.n))) return false;
    if (sg.rounds < 1 || sg.rounds > 12) return false;
    if (!(low >= 0)) return false;
    return tr.steps.length >= 1 && tr.steps.length <= 30;
  }, { runs: 200, seed: 123 });
});

test('bộ sinh phủ các biên', () => {
  const r = makeRng(99);
  const seenLow = new Set(), seenSw = new Set(), fpsVals = new Set();
  let longRun = false, earlyTurnFail = false;
  for (let i = 0; i < 500; i++) {
    seenLow.add(lowMs(r));
    const sc = scheduleCase(r);
    if (sc.n === 3) seenSw.add(sc.switchAt);
    fpsSamples(r).forEach((s) => fpsVals.add(s.fps));
    if (/(miss|ambiguous),(miss|ambiguous),(miss|ambiguous)/.test(handEvents(r).join())) longRun = true;
    const tr = transitionCase(r);
    if (tr.setting === 'turn' && tr.steps[0].loadFailed) earlyTurnFail = true;
  }
  for (const e of LOW_MS_EDGES) assert.ok(seenLow.has(e), `thiếu lowMs ${e}`);
  for (const e of [0, 2, 3, 6, 23, null]) assert.ok(seenSw.has(e), `thiếu switchAt ${e}`);
  assert.ok(fpsVals.has(15) && fpsVals.has(14.99));
  assert.ok(longRun && earlyTurnFail);
});
