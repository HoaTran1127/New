// Feature: new-repo-review-upgrade, Property 17: Phát hiện nhận diện kém
// **Validates: Requirements 9.9**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { forAll, fpsSamples, handEvents } from './gen.mjs';
import { lowFpsSpan, missStreak, healthDegraded } from '../lib/compete-ref.mjs';

const NAME = 'Feature: new-repo-review-upgrade, Property 17: Phát hiện nhận diện kém';

// Tham chiếu độc lập: đoạn đuôi FPS < 15 liên tục, tính từ mẫu thấp đầu tiên của đoạn.
function refSpan(samples) {
  let start = -1;
  for (let i = samples.length - 1; i >= 0 && samples[i].fps < 15; i--) start = i;
  return start < 0 ? 0 : samples[samples.length - 1].tMs - samples[start].tMs;
}

const refStreak = (events) => {
  const k = events.lastIndexOf('ok');
  return events.length - 1 - k;
};

test(NAME, () => {
  forAll(
    'Property 17',
    (r) => {
      const samples = fpsSamples(r, 0, 60);
      const events = handEvents(r);
      const last = samples.length ? samples[samples.length - 1].tMs : 0;
      return {
        samples,
        events,
        badFps: r.pick([14.99, 14, 13, 0]),
        goodFps: r.pick([15, 15.01, 30, 60]),
        dt: r.int(16, 200),
        last,
        badEv: r.pick(['miss', 'ambiguous']),
      };
    },
    ({ samples, events, badFps, goodFps, dt, last, badEv }) => {
      const span = lowFpsSpan(samples);
      const misses = missStreak(events);
      assert.equal(span, refSpan(samples));
      assert.equal(misses, refStreak(events));
      assert.equal(healthDegraded(samples, misses), span >= 3000 || misses >= 3);

      // Thêm mẫu xấu: span không giảm, degraded không tắt
      const bad = [...samples, { tMs: last + dt, fps: badFps }];
      assert.ok(lowFpsSpan(bad) >= span, 'span giảm khi thêm mẫu FPS thấp');
      const badEvents = [...events, badEv];
      assert.equal(missStreak(badEvents), misses + 1);
      if (healthDegraded(samples, misses)) {
        assert.equal(healthDegraded(bad, missStreak(badEvents)), true, 'degraded tắt khi thêm mẫu xấu');
      }

      // Thêm mẫu tốt: reset về 0 và không còn degraded
      const good = [...samples, { tMs: last + dt, fps: goodFps }];
      assert.equal(lowFpsSpan(good), 0);
      const goodEvents = [...events, 'ok'];
      assert.equal(missStreak(goodEvents), 0);
      assert.equal(healthDegraded(good, missStreak(goodEvents)), false);
      return true;
    },
    { runs: 200 },
  );
});

test(`${NAME} (ví dụ biên)`, () => {
  assert.equal(lowFpsSpan([]), 0);
  assert.equal(missStreak([]), 0);
  assert.equal(lowFpsSpan([{ tMs: 0, fps: 14 }]), 0);
  const low = (a, b) => [{ tMs: a, fps: 14.99 }, { tMs: b, fps: 10 }];
  assert.equal(healthDegraded(low(0, 2999), 0), false);
  assert.equal(healthDegraded(low(0, 3000), 0), true);
  assert.equal(healthDegraded([{ tMs: 0, fps: 15 }, { tMs: 5000, fps: 15 }], 0), false);
  assert.equal(missStreak(['ok', 'miss', 'ambiguous']), 2);
  assert.equal(healthDegraded([], missStreak(['miss', 'ambiguous', 'miss'])), true);
});
