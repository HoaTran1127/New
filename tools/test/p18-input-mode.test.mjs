// Feature: new-repo-review-upgrade, Property 18: Máy trạng thái Input_Mode
// **Validates: Requirements 9.2, 9.9, 9.10, 9.12, 9.17**
import test from 'node:test';
import assert from 'node:assert/strict';
import { forAll, transitionCase } from './gen.mjs';
import { initialInputMode, inputModeTransition } from '../lib/compete-ref.mjs';

const LABEL = 'Feature: new-repo-review-upgrade, Property 18: Máy trạng thái Input_Mode';

test(`${LABEL} — chuỗi (degraded, loadFailed) qua inputModeTransition`, () => {
  forAll(
    'inputModeTransition',
    (r) => {
      const c = transitionCase(r);
      c.scores = Array.from({ length: c.n }, () => r.int(0, 500));
      return c;
    },
    ({ setting, n, finger, loadFailed, steps, scores }) => {
      const mode0 = initialInputMode(setting, n, finger, loadFailed);
      // Khởi đầu: N = 1 → solo, không Finger_Game → pose, loadFailed → wrist ở mọi cài đặt.
      const expected0 =
        n === 1 ? 'solo' : !finger ? 'pose' : loadFailed || setting === 'wrist' ? 'wrist' : 'turn';
      assert.equal(mode0, expected0);

      let state = { mode: mode0, scores: scores.slice(), noticeMs: 0 };
      let left = mode0 !== 'turn';
      for (const { degraded, loadFailed: lf } of steps) {
        const prev = state;
        const next = inputModeTransition(prev, setting, degraded, lf);
        const shouldSwitch = prev.mode === 'turn' && (lf || (setting === 'auto' && degraded));
        if (shouldSwitch) {
          assert.equal(next.mode, 'wrist');
          assert.equal(next.noticeMs, 3000);
        } else {
          assert.equal(next.mode, prev.mode);
          assert.equal(next.noticeMs, prev.noticeMs);
        }
        // Điểm giữ nguyên qua mọi bước.
        assert.deepEqual(next.scores, scores);
        // Đã rời 'turn' thì không bao giờ quay lại.
        if (left) assert.notEqual(next.mode, 'turn');
        if (next.mode !== 'turn') left = true;
        state = next;
      }
      return true;
    },
    { runs: 500 },
  );
});

test(`${LABEL} — ví dụ cố định`, () => {
  assert.equal(initialInputMode('turn', 3, true, true), 'wrist');
  const s = { mode: 'turn', scores: [5, 7], noticeMs: 0 };
  // Cài đặt 'turn': degraded không chuyển, loadFailed thì chuyển.
  assert.equal(inputModeTransition(s, 'turn', true, false).mode, 'turn');
  assert.deepEqual(inputModeTransition(s, 'turn', false, true), {
    mode: 'wrist',
    scores: [5, 7],
    noticeMs: 3000,
  });
  assert.equal(inputModeTransition(s, 'auto', true, false).mode, 'wrist');
});
