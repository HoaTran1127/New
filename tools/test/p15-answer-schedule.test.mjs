// Feature: new-repo-review-upgrade, Property 15: Mỗi em đúng 8 câu theo lượt, kể cả khi chuyển giữa ván
// **Validates: Requirements 9.7, 9.10, 9.14, 9.15, 9.16**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { forAll, scheduleCase } from './gen.mjs';
import {
  answerSchedule,
  mainTurns,
  nextActivePlayer,
  TURNS_PER_PLAYER,
} from '../lib/compete-ref.mjs';

const NAME = 'Feature: new-repo-review-upgrade, Property 15: Mỗi em đúng 8 câu theo lượt, kể cả khi chuyển giữa ván';

const countPerPlayer = (steps, n) => {
  const c = Array(n).fill(0);
  steps.forEach((s) => s.players.forEach((p) => c[p - 1]++));
  return c;
};

test(NAME, () => {
  forAll(
    'Property 15',
    scheduleCase,
    ({ n, rounds, switchAt }) => {
      const steps = answerSchedule(n, rounds, switchAt);
      const counts = countPerPlayer(steps, n);
      assert.deepEqual(counts, Array(n).fill(rounds), `số câu mỗi em: ${counts}`);

      // Lượt theo vòng tròn: mỗi bước 'turn'/'wrist-turn' nối tiếp bằng nextActivePlayer
      const single = steps.filter((s) => s.mode !== 'wrist');
      single.forEach((s, i) => {
        assert.equal(s.players.length, 1);
        const expected = i === 0 ? 1 : nextActivePlayer(single[i - 1].players[0], n);
        assert.equal(s.players[0], expected, `bước ${i} sai thứ tự vòng tròn`);
      });
      // Bước đồng thời gồm đủ mọi người và đứng sau cùng
      const firstWrist = steps.findIndex((s) => s.mode === 'wrist');
      if (firstWrist >= 0) {
        steps.slice(firstWrist).forEach((s) => {
          assert.equal(s.mode, 'wrist');
          assert.deepEqual(s.players, Array.from({ length: n }, (_, i) => i + 1));
        });
      }

      if (switchAt == null) {
        assert.equal(steps.length, n * rounds);
        assert.equal(steps.length, mainTurns('turn', n));
        assert.ok(steps.every((s) => s.mode === 'turn'));
      } else {
        // Lượt bị hủy chơi lại bằng cổ tay; trước đó đúng switchAt lượt 'turn'
        assert.equal(steps.filter((s) => s.mode === 'turn').length, switchAt);
        assert.equal(steps[switchAt].mode, 'wrist-turn');
        assert.equal(steps[switchAt].players[0], (switchAt % n) + 1);
      }
      return true;
    },
    { runs: 200 },
  );
});

test(`${NAME} (ví dụ cố định)`, () => {
  assert.equal(TURNS_PER_PLAYER, 8);
  assert.equal(nextActivePlayer(3, 3), 1);
  assert.equal(nextActivePlayer(1, 3), 2);
  assert.equal(mainTurns('turn', 2), 16);
  assert.equal(mainTurns('turn', 3), 24);
  assert.equal(mainTurns('solo', 1), 12);

  const steps = answerSchedule(3, 8, 4);
  assert.deepEqual(steps.slice(0, 4), [
    { mode: 'turn', players: [1] },
    { mode: 'turn', players: [2] },
    { mode: 'turn', players: [3] },
    { mode: 'turn', players: [1] },
  ]);
  assert.deepEqual(steps[4], { mode: 'wrist-turn', players: [2] });
  assert.deepEqual(steps[5], { mode: 'wrist-turn', players: [3] });
  const rest = steps.slice(6);
  assert.equal(rest.length, 6);
  rest.forEach((s) => assert.deepEqual(s, { mode: 'wrist', players: [1, 2, 3] }));
  assert.deepEqual(countPerPlayer(steps, 3), [8, 8, 8]);
});
