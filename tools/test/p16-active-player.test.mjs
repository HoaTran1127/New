// Feature: new-repo-review-upgrade, Property 16: Chỉ Active_Player có hiệu lực trong Turn_Mode
// **Validates: Requirements 9.6, 9.8**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { forAll } from './gen.mjs';
import { acceptHand, timerRunning, laneOf } from '../lib/compete-ref.mjs';

const MODES = ['solo', 'pose', 'turn', 'wrist'];
const X_EDGES = [0, 1 / 3, 0.5, 2 / 3, 0.999999, 1];

test('Feature: new-repo-review-upgrade, Property 16: Chỉ Active_Player có hiệu lực trong Turn_Mode', () => {
  forAll(
    'Property 16',
    (r) => {
      const n = r.pick([2, 3]);
      return {
        n,
        mode: r.pick(MODES),
        active: r.int(1, n),
        id: r.int(1, n),
        wristX: r.bool(0.3) ? r.pick(X_EDGES) : r.float01(),
      };
    },
    ({ n, mode, active, id, wristX }) => {
      const hand = acceptHand(wristX, n, active, mode);
      const timer = timerRunning(id, active, mode);
      if (mode === 'turn') {
        assert.equal(hand, laneOf(wristX, n) === active - 1, `acceptHand(${wristX}, ${n}, ${active})`);
        assert.equal(timer, id === active, `timerRunning(${id}, ${active})`);
      } else {
        assert.equal(hand, true);
        assert.equal(timer, true);
      }
      return true;
    },
    { runs: 300 },
  );
});

test('Property 16: trong Turn_Mode đúng một đồng hồ chạy và đúng một làn nhận tay', () => {
  for (const n of [2, 3]) {
    for (let active = 1; active <= n; active++) {
      const running = Array.from({ length: n }, (_, i) => timerRunning(i + 1, active, 'turn'));
      assert.equal(running.filter(Boolean).length, 1);
      const accepted = Array.from({ length: n }, (_, lane) => acceptHand((lane + 0.5) / n, n, active, 'turn'));
      assert.deepEqual(accepted, Array.from({ length: n }, (_, lane) => lane === active - 1));
    }
  }
});
