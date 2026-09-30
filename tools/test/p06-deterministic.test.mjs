// Feature: new-repo-review-upgrade, Property 6: Sinh tất định
// **Validates: Requirements 6.1**
// Với mọi game trong GAMES, render hai lần cho chuỗi giống hệt; và 100 lần xáo thứ tự
// duyệt game (có seed) vẫn cho đúng chuỗi của lần render đầu tiên.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GAMES } from '../data/games.mjs';
import { render } from '../build-prompts.mjs';
import { forAll } from './gen.mjs';

// Lần render đầu tiên làm mốc so sánh.
const FIRST = new Map(GAMES.map((g) => [g.id, render(g)]));

test('Feature: new-repo-review-upgrade, Property 6: Sinh tất định (render hai lần)', () => {
  assert.equal(GAMES.length, 85);
  for (const g of GAMES) {
    assert.equal(render(g), FIRST.get(g.id), `${g.id}: render lần hai khác lần đầu`);
  }
});

test('Feature: new-repo-review-upgrade, Property 6: Sinh tất định (xáo thứ tự duyệt)', () => {
  forAll(
    'Property 6: thứ tự duyệt không đổi kết quả',
    (r) => r.shuffle(GAMES.map((_, i) => i)),
    (order) => {
      for (const i of order) {
        const g = GAMES[i];
        if (render(g) !== FIRST.get(g.id)) throw new Error(`${g.id}: khác bản render đầu`);
      }
      return true;
    },
    { runs: 100 },
  );
});
