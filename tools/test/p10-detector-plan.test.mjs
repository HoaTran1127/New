// Feature: new-repo-review-upgrade, Property 10: Kế hoạch nhận diện theo số người và Input_Mode
// **Validates: Requirements 3.1, 3.2, 3.3, 9.6, 9.11, 9.13**
import test from 'node:test';
import assert from 'node:assert/strict';
import { forAll } from './gen.mjs';
import { GESTURES } from '../data/gestures.mjs';
import { GAMES } from '../data/games.mjs';
import { detectorPlan, FINGER_CODES } from '../lib/players.mjs';

const LABEL = 'Feature: new-repo-review-upgrade, Property 10: Kế hoạch nhận diện theo số người và Input_Mode';

// Bảng chọn model TRƯỚC nâng cấp (viết lại độc lập ở đây làm oracle).
const PRE_UPGRADE_POSE = ['STEP', 'TWO_HAND_STRETCH', 'TWO_HAND_BALANCE', 'ANGLE_POSE'];
const soloOracle = (gestures) =>
  gestures.some((g) => PRE_UPGRADE_POSE.includes(g)) ? { pose: 1, hands: 0 } : { pose: 0, hands: 2 };

// Mọi mã đơn lẻ + mọi mảng cử chỉ thật của 85 game.
const CASES = [
  ...Object.keys(GESTURES).map((c) => ({ src: c, gestures: [c] })),
  ...GAMES.map((g) => ({ src: g.id, gestures: g.gestures })),
];

function check({ gestures, n, mode }) {
  const plan = detectorPlan(gestures, n, mode);
  if (n === 1) {
    const exp = soloOracle(gestures);
    assert.equal(plan.pose, exp.pose);
    assert.equal(plan.hands, exp.hands);
    return true;
  }
  assert.equal(plan.pose, n);
  assert.ok(plan.hands <= 2);
  if (!FINGER_CODES.includes(gestures[0])) {
    assert.equal(plan.hands, 0);
  } else if (mode === 'turn') {
    assert.equal(plan.hands, 2);
    assert.equal(plan.handLane, 'active');
  } else {
    assert.equal(plan.hands, 0);
    assert.deepEqual(plan.wrist, [15, 16]);
  }
  return true;
}

test(`${LABEL} — vét cạn GESTURES và game × N × mode`, () => {
  assert.ok(CASES.length > Object.keys(GESTURES).length);
  for (const c of CASES)
    for (const n of [1, 2, 3])
      for (const mode of ['turn', 'wrist']) {
        try {
          check({ ...c, n, mode });
        } catch (e) {
          e.message = `${c.src} ${JSON.stringify(c.gestures)} N=${n} mode=${mode}: ${e.message}`;
          throw e;
        }
      }
});

test(`${LABEL} — ngẫu nhiên`, () => {
  forAll(
    'detectorPlan',
    (r) => ({ ...r.pick(CASES), n: r.pick([1, 2, 3]), mode: r.pick(['turn', 'wrist']) }),
    check,
    { runs: 300 },
  );
});

test(`${LABEL} — N = 1 giữ model cũ (L4-07 vẫn là pose)`, () => {
  const l407 = GAMES.find((g) => g.id === 'L4-07');
  assert.deepEqual(l407.gestures, ['POINT', 'TWO_HAND_STRETCH']);
  for (const mode of ['turn', 'wrist']) assert.deepEqual(detectorPlan(l407.gestures, 1, mode), { pose: 1, hands: 0 });
  assert.deepEqual(detectorPlan(['POINT'], 1), { pose: 0, hands: 2 });
});
