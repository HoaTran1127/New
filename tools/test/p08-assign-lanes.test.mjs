// Feature: new-repo-review-upgrade, Property 8: Gán làn theo tâm cơ thể, không phụ thuộc thứ tự model
// **Validates: Requirements 3.4**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { forAll } from './gen.mjs';
import { assignLanes, laneOf } from '../lib/compete-ref.mjs';

// Tư thế có hông (có thể kèm vai) hoặc chỉ có vai; x đã lật gương trong [0, 1].
const pose = (r, i) => {
  const pair = () => [r.float01(), r.float01()];
  const kind = r.pick(['hips', 'shoulders', 'both']);
  const p = { id: `p${i}` };
  if (kind !== 'shoulders') p.hips = pair();
  if (kind !== 'hips') p.shoulders = pair();
  return p;
};

test('Feature: new-repo-review-upgrade, Property 8: Gán làn theo tâm cơ thể, không phụ thuộc thứ tự model', () => {
  forAll(
    'Property 8',
    (r) => {
      const poses = r.arrayOf(pose, 0, 5);
      return { n: r.pick([1, 2, 3]), poses, shuffled: r.shuffle(poses) };
    },
    ({ n, poses, shuffled }) => {
      const m = assignLanes(poses, n);
      assert.equal(m.size, poses.length);
      for (const p of poses) {
        const pts = p.hips ?? p.shoulders; // ưu tiên hông, thiếu hông thì vai
        const c = (pts[0] + pts[1]) / 2;
        assert.equal(m.get(p.id), laneOf(c, n), `sai làn cho ${JSON.stringify(p)}`);
      }
      const m2 = assignLanes(shuffled, n);
      assert.deepEqual(new Map([...m2].sort()), new Map([...m].sort()));
      return true;
    },
    { runs: 200 },
  );
});
