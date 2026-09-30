// Feature: new-repo-review-upgrade, Property 21: Cắt hiệu ứng trước khi giảm nhận diện
// **Validates: Requirements 10.11**
import test from 'node:test';
import assert from 'node:assert/strict';
import { forAll, lowMs } from './gen.mjs';
import { effectsBudget } from '../lib/compete-ref.mjs';

const LABEL = 'Feature: new-repo-review-upgrade, Property 21: Cắt hiệu ứng trước khi giảm nhận diện';

test(`${LABEL} — đơn điệu theo lowMs, cắt hiệu ứng trước giảm nhận diện`, () => {
  forAll(
    'effectsOrder',
    (r) => {
      const a = lowMs(r);
      const b = lowMs(r);
      return { lo: Math.min(a, b), hi: Math.max(a, b), reduced: r.bool() };
    },
    ({ lo, hi, reduced }) => {
      const x = effectsBudget(lo, reduced);
      const y = effectsBudget(hi, reduced);
      // Đơn điệu: lowMs lớn hơn không bao giờ cho nhiều hiệu ứng hơn hay nhận diện dày hơn.
      if (y.particles > x.particles) return false;
      if (y.shake && !x.shake) return false;
      if (y.detectEvery < x.detectEvery) return false;
      // Thứ tự: đã giảm nhận diện thì hiệu ứng đã bị cắt.
      for (const b of [x, y]) {
        if (b.detectEvery === 2 && !(b.particles <= 12 && b.shake === false)) return false;
      }
      // Ngưỡng
      for (const [ms, b] of [[lo, x], [hi, y]]) {
        if (ms >= 3000 && !(b.particles <= 12 && b.shake === false)) return false;
        if (b.detectEvery !== (ms >= 6000 ? 2 : 1)) return false;
      }
      return true;
    },
    { runs: 300 },
  );
});

test(`${LABEL} — biên 2999/3000/5999/6000`, () => {
  const b2999 = effectsBudget(2999, false);
  const b3000 = effectsBudget(3000, false);
  const b5999 = effectsBudget(5999, false);
  const b6000 = effectsBudget(6000, false);
  assert.equal(b2999.shake, true);
  assert.ok(b2999.particles > 12);
  assert.equal(b2999.detectEvery, 1);
  assert.equal(b3000.shake, false);
  assert.ok(b3000.particles <= 12);
  assert.equal(b3000.detectEvery, 1);
  assert.equal(b5999.shake, false);
  assert.ok(b5999.particles <= 12);
  assert.equal(b5999.detectEvery, 1);
  assert.equal(b6000.shake, false);
  assert.ok(b6000.particles <= 12);
  assert.equal(b6000.detectEvery, 2);
});
