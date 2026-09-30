// Feature: new-repo-review-upgrade, Property 12: Catch-up có điều kiện và có trần
// **Validates: Requirements 4.4, 4.5**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { forAll } from './gen.mjs';
import { catchUpEligible, grantDouble, multiplier } from '../lib/compete-ref.mjs';

const QUESTIONS = 12;

// Ván ngẫu nhiên: 2–3 người, mỗi người có xác suất đúng riêng (tạo khoảng cách điểm),
// hiệp quyết định là đoạn cuối ván bắt đầu từ climaxFrom (có thể không có).
const gameCase = (r) => {
  const n = r.pick([2, 3]);
  const skill = Array.from({ length: n }, () => r.pick([0.1, 0.3, 0.5, 0.8, 1]));
  const climaxFrom = r.pick([9, 10, 11, QUESTIONS, r.int(0, QUESTIONS)]);
  const answers = Array.from({ length: QUESTIONS }, () => skill.map((p) => r.bool(p)));
  return { n, climaxFrom, answers };
};

test('Feature: new-repo-review-upgrade, Property 12: Catch-up có điều kiện và có trần', () => {
  forAll(
    'Property 12',
    gameCase,
    ({ n, climaxFrom, answers }) => {
      const players = Array.from({ length: n }, (_, i) => ({ id: i + 1, correct: 0, score: 0 }));
      const history = players.map(() => []);
      for (let q = 0; q < QUESTIONS; q++) {
        const climax = q >= climaxFrom;
        const lead = Math.max(...players.map((p) => p.correct));
        players.forEach((p, i) => {
          const eligible = catchUpEligible(p, players);
          assert.equal(eligible, lead - p.correct >= 2, `eligible sai ở câu ${q}, người ${p.id}`);
          const recent = history[i].some((h) => q - h < 3);
          const double = grantDouble(history[i], q, eligible, climax);
          // x2 chỉ khi kém người dẫn đầu ≥ 2 câu đúng tại thời điểm đó
          if (double) assert.ok(lead - p.correct >= 2, `x2 khi không kém ≥ 2: câu ${q}, người ${p.id}`);
          // Được hỗ trợ khi đủ điều kiện, ngoài hiệp quyết định và chưa có x2 trong cửa sổ
          assert.equal(double, eligible && !climax && !recent, `grantDouble sai ở câu ${q}, người ${p.id}`);
          if (double) history[i].push(q);
          const m = multiplier(double, climax);
          assert.ok(m >= 1 && m <= 2, `hệ số ${m} vượt trần ở câu ${q}`);
          p.pending = m;
        });
        // Chấm câu sau khi mọi người đã được xét (trạng thái tại thời điểm câu hỏi)
        players.forEach((p, i) => {
          if (answers[q][i]) {
            p.correct++;
            p.score += 10 * p.pending;
          }
        });
      }
      // ≤ 1 thẻ x2 trong mọi cửa sổ 3 câu liên tiếp, mỗi người
      history.forEach((h, i) => {
        for (let s = 0; s + 2 < QUESTIONS; s++) {
          const inWin = h.filter((q) => q >= s && q <= s + 2).length;
          assert.ok(inWin <= 1, `người ${i + 1} có ${inWin} thẻ x2 trong câu ${s}..${s + 2}: ${h}`);
        }
      });
      return true;
    },
    { runs: 200 },
  );
});

test('Property 12 (ví dụ): kém 2 câu nhận x2, không nhận ở hiệp quyết định, hệ số không cộng dồn', () => {
  const players = [
    { id: 1, correct: 3 },
    { id: 2, correct: 1 },
  ];
  assert.equal(catchUpEligible(players[1], players), true);
  assert.equal(catchUpEligible(players[0], players), false);
  assert.equal(grantDouble([], 4, true, false), true);
  assert.equal(grantDouble([3], 5, true, false), false);
  assert.equal(grantDouble([3], 6, true, false), true);
  assert.equal(grantDouble([], 10, true, true), false);
  assert.equal(multiplier(true, true), 2);
  assert.equal(multiplier(false, false), 1);
});
