// Feature: new-repo-review-upgrade, Property 19: Khối nhập liệu tay in đúng loại game
// **Validates: Requirements 3.3, 9.1, 9.3, 9.4, 9.5, 9.13, 9.14, 9.17**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GAMES } from '../data/games.mjs';
import { render } from '../build-prompts.mjs';
import { INPUT } from '../lib/input.mjs';
import { isFingerGame, modelLine } from '../lib/players.mjs';

const count = (hay, needle) => hay.split(needle).length - 1;
const LOAD_FAIL = 'HandLandmarker tải model lỗi → vào thẳng Cổ tay đồng thời';

test('Property 19 (tiền đề): INPUT có câu 8 câu / 8 × N và câu model tay tải lỗi', () => {
  const all = Object.values(INPUT).join('\n');
  assert.ok(all.includes('8 câu'));
  assert.ok(all.includes('8 × N'));
  assert.ok(all.includes(LOAD_FAIL));
});

test('Feature: new-repo-review-upgrade, Property 19: Khối nhập liệu tay in đúng loại game', () => {
  assert.equal(GAMES.length, 85);
  const failures = [];
  for (const g of GAMES) {
    const out = render(g);
    const want = isFingerGame(g.gestures) ? 1 : 0;
    for (const [k, s] of Object.entries(INPUT)) {
      const n = count(out, s);
      if (n !== want) failures.push(`${g.id}: INPUT.${k} xuất hiện ${n} lần (cần ${want})`);
    }
    const ml = modelLine(g.gestures);
    if (count(out, ml) !== 1) failures.push(`${g.id}: câu model: xuất hiện ${count(out, ml)} lần`);
    if (ml.includes('numHands = 2N')) failures.push(`${g.id}: câu model: chứa numHands = 2N`);
    if (out.includes('numHands = 2N')) failures.push(`${g.id}: prompt chứa numHands = 2N`);
  }
  assert.deepEqual(failures, []);
});

test('Property 19 (ví dụ): game POINT có numHands = 2, game STEP L4-04 không có dòng INPUT', () => {
  const point = GAMES.find((g) => g.gestures[0] === 'POINT');
  assert.ok(point, 'cần ít nhất một game POINT');
  assert.ok(render(point).includes('numHands = 2'));

  const step = GAMES.find((g) => g.id === 'L4-04');
  assert.ok(step && step.gestures[0] === 'STEP', 'L4-04 phải là game STEP');
  const out = render(step);
  for (const [k, s] of Object.entries(INPUT)) assert.equal(count(out, s), 0, `L4-04 chứa INPUT.${k}`);
  assert.ok(!out.includes('numHands'), 'game STEP không nhắc numHands');
});
