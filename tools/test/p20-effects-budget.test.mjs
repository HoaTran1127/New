// Feature: new-repo-review-upgrade, Property 20: Ngân sách hiệu ứng an toàn
// **Validates: Requirements 10.9, 10.10**
import test from 'node:test';
import assert from 'node:assert/strict';
import { forAll, effectsCase } from './gen.mjs';
import { effectsBudget } from '../lib/compete-ref.mjs';

const LABEL = 'Feature: new-repo-review-upgrade, Property 20: Ngân sách hiệu ứng an toàn';

test(`${LABEL} — flashMaxHz = 3; reduced tắt rung, hit-stop, hạt và bật mờ dần`, () => {
  forAll(
    'effectsBudget',
    effectsCase,
    ({ lowMs, reduced }) => {
      const b = effectsBudget(lowMs, reduced);
      if (b.flashMaxHz !== 3) return false;
      if (reduced) return b.shake === false && b.hitStop === false && b.particles === 0 && b.fade === true;
      return b.fade === false && b.particles > 0;
    },
    { runs: 300 },
  );
});

test(`${LABEL} — ví dụ cố định effectsBudget(0, true)`, () => {
  const b = effectsBudget(0, true);
  assert.equal(b.shake, false);
  assert.equal(b.hitStop, false);
  assert.equal(b.particles, 0);
  assert.equal(b.fade, true);
  assert.equal(b.flashMaxHz, 3);
});
