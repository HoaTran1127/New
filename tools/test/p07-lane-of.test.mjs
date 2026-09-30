// Feature: new-repo-review-upgrade, Property 7: Chia làn đúng phạm vi và đơn điệu
// **Validates: Requirements 2.2, 2.3**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { forAll } from './gen.mjs';
import { laneOf } from '../lib/compete-ref.mjs';

const EDGES = [0, 1 / 3, 0.5, 2 / 3, 1, 0.999999, 1e-9];
const x01 = (r) => (r.bool(0.3) ? r.pick(EDGES) : r.float01());

test('Feature: new-repo-review-upgrade, Property 7: Chia làn đúng phạm vi và đơn điệu', () => {
  forAll(
    'Property 7',
    (r) => ({ n: r.pick([1, 2, 3]), x: x01(r), y: x01(r) }),
    ({ n, x, y }) => {
      const lx = laneOf(x, n);
      const ly = laneOf(y, n);
      assert.ok(Number.isInteger(lx) && lx >= 0 && lx <= n - 1, `laneOf(${x}, ${n}) = ${lx}`);
      assert.ok(Number.isInteger(ly) && ly >= 0 && ly <= n - 1, `laneOf(${y}, ${n}) = ${ly}`);
      if (n === 1) assert.ok(lx === 0 && ly === 0);
      const [a, b] = x <= y ? [lx, ly] : [ly, lx];
      assert.ok(a <= b, `không đơn điệu: x=${x}, y=${y}, n=${n}`);
      return true;
    },
    { runs: 200 },
  );
});
