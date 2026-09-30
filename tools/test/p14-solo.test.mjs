// Feature: new-repo-review-upgrade, Property 14: Kỷ lục cá nhân khi chơi một mình
// **Validates: Requirements 4.8**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { forAll } from './gen.mjs';
import { soloResult } from '../lib/compete-ref.mjs';

// best: chưa có (null/undefined), bằng điểm, quanh điểm hoặc ngẫu nhiên
const soloCase = (r) => {
  const score = r.pick([0, r.int(0, 500)]);
  const kind = r.int(0, 4);
  const best =
    kind === 0 ? r.pick([null, undefined]) : kind === 1 ? score : kind === 2 ? score + r.pick([-1, 1]) : r.int(0, 500);
  return { score, best: best != null && best < 0 ? 0 : best };
};

test('Feature: new-repo-review-upgrade, Property 14: Kỷ lục cá nhân khi chơi một mình', () => {
  forAll(
    'Property 14',
    soloCase,
    ({ score, best }) => {
      const res = soloResult(score, best);
      const expectNew = best == null || score > best;
      assert.equal(res.isNewBest, expectNew, `isNewBest sai: score=${score}, best=${best}`);
      assert.equal(res.best, best == null ? score : Math.max(score, best), `kỷ lục mới sai`);
      // Áp dụng lại cùng điểm lần hai: không còn là kỷ lục mới, kỷ lục giữ nguyên
      const again = soloResult(score, res.best);
      assert.equal(again.isNewBest, false, `lần hai vẫn là kỷ lục mới: score=${score}`);
      assert.equal(again.best, res.best);
      return true;
    },
    { runs: 200 },
  );
});

test('Property 14 (ví dụ): ván đầu là kỷ lục, bằng kỷ lục không phải kỷ lục mới', () => {
  assert.deepEqual(soloResult(0, null), { isNewBest: true, best: 0 });
  assert.deepEqual(soloResult(50, 50), { isNewBest: false, best: 50 });
  assert.deepEqual(soloResult(40, 50), { isNewBest: false, best: 50 });
  assert.deepEqual(soloResult(60, 50), { isNewBest: true, best: 60 });
});
