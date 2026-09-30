// Feature: new-repo-review-upgrade, Property 13: Ai cũng có danh hiệu, danh hiệu dựa trên số liệu
// **Validates: Requirements 4.6, 4.7**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { forAll } from './gen.mjs';
import { awardTitles, TITLES } from '../lib/compete-ref.mjs';

const METRICS = [
  [TITLES.fastest, 'avgMs', Math.min],
  [TITLES.accurate, 'accuracy', Math.max],
  [TITLES.mover, 'moves', Math.max],
  [TITLES.streak, 'bestStreak', Math.max],
];

// Giá trị lấy từ tập nhỏ để hay đồng giá trị; 25% ca mọi chỉ số bằng nhau.
const statsCase = (r) => {
  const n = r.int(1, 3);
  const one = (id) => ({
    id,
    avgMs: r.pick([800, 1200, 1500, r.int(300, 5000)]),
    accuracy: r.pick([0, 0.5, 1, Math.round(r.float01() * 100) / 100]),
    moves: r.pick([0, 10, 20, r.int(0, 60)]),
    bestStreak: r.pick([0, 1, 3, r.int(0, 12)]),
  });
  if (r.bool(0.25)) {
    const base = one(1);
    return Array.from({ length: n }, (_, i) => ({ ...base, id: i + 1 }));
  }
  return Array.from({ length: n }, (_, i) => one(i + 1));
};

test('Feature: new-repo-review-upgrade, Property 13: Ai cũng có danh hiệu, danh hiệu dựa trên số liệu', () => {
  const valid = new Set(Object.values(TITLES));
  forAll(
    'Property 13',
    statsCase,
    (stats) => {
      const out = awardTitles(stats);
      assert.equal(out.size, stats.length);
      for (const s of stats) {
        const list = out.get(s.id);
        assert.ok(Array.isArray(list) && list.length >= 1, `người ${s.id} không có danh hiệu`);
        list.forEach((t) => assert.ok(valid.has(t), `danh hiệu lạ: ${t}`));
      }
      for (const [title, key, pick] of METRICS) {
        const best = pick(...stats.map((s) => s[key]));
        for (const s of stats) {
          const has = out.get(s.id).includes(title);
          // Người nhận danh hiệu chỉ số có đúng giá trị tối ưu, và mọi người tối ưu đều nhận
          assert.equal(has, s[key] === best, `${title}: người ${s.id} (${key}=${s[key]}, tối ưu=${best})`);
        }
      }
      return true;
    },
    { runs: 200 },
  );
});

test('Property 13 (ví dụ): mọi chỉ số bằng nhau thì ai cũng nhận đủ bốn danh hiệu chỉ số', () => {
  const s = { avgMs: 1000, accuracy: 0.5, moves: 5, bestStreak: 2 };
  const out = awardTitles([1, 2, 3].map((id) => ({ id, ...s })));
  for (const id of [1, 2, 3]) {
    assert.deepEqual(out.get(id), [TITLES.fastest, TITLES.accurate, TITLES.mover, TITLES.streak]);
  }
});
