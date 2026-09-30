// Feature: new-repo-review-upgrade, Property 11: Xếp hạng và phân định hòa
// **Validates: Requirements 4.2, 4.3**
import test from 'node:test';
import assert from 'node:assert/strict';
import { forAll } from './gen.mjs';
import { rankPlayers } from '../lib/compete-ref.mjs';

const LABEL = 'Feature: new-repo-review-upgrade, Property 11: Xếp hạng và phân định hòa';

// Giá trị từ tập nhỏ để hay gặp hòa ở từng chỉ số.
const genPlayers = (r) =>
  r.arrayOf(
    (rr, i) => ({
      id: `P${i + 1}`,
      score: rr.pick([0, 10, 20]),
      correct: rr.pick([0, 1, 2]),
      totalMs: rr.pick([1000, 2000]),
    }),
    1,
    3,
  );

// So thứ tự độc lập: < 0 nghĩa là a hơn b.
const cmp = (a, b) => b.score - a.score || b.correct - a.correct || a.totalMs - b.totalMs;

test(LABEL, () => {
  forAll(
    'rankPlayers',
    (r) => {
      const players = genPlayers(r);
      return { players, shuffled: r.shuffle(players) };
    },
    ({ players, shuffled }) => {
      const out = rankPlayers(players);
      const byId = new Map(players.map((p) => [p.id, p]));
      const rank = new Map(out.map((x) => [x.id, x.rank]));

      // Đủ và đúng id, sắp theo hạng không giảm.
      assert.equal(out.length, players.length);
      assert.deepEqual([...rank.keys()].sort(), players.map((p) => p.id).sort());
      for (let i = 1; i < out.length; i++) assert.ok(out[i - 1].rank <= out[i].rank);

      for (const a of players)
        for (const b of players) {
          const c = cmp(a, b);
          // Hạng nhỏ hơn thì hơn hoặc bằng theo thứ tự.
          if (rank.get(a.id) < rank.get(b.id)) assert.ok(c <= 0, `${a.id} hạng cao hơn nhưng kém ${b.id}`);
          // Bằng cả ba chỉ số ↔ cùng hạng; hơn hẳn → hạng nhỏ hơn hẳn.
          if (c === 0) assert.equal(rank.get(a.id), rank.get(b.id));
          if (c < 0) assert.ok(rank.get(a.id) < rank.get(b.id));
        }

      // Có người hạng 1 và người hạng 1 có điểm cao nhất.
      const maxScore = Math.max(...players.map((p) => p.score));
      const winners = out.filter((x) => x.rank === 1);
      assert.ok(winners.length >= 1);
      for (const w of winners) assert.equal(byId.get(w.id).score, maxScore);

      // Hoán vị đầu vào không đổi hạng của từng id.
      const out2 = rankPlayers(shuffled);
      for (const x of out2) assert.equal(x.rank, rank.get(x.id));
      return true;
    },
    { runs: 500 },
  );
});

test(`${LABEL} — ví dụ hòa kiểu 1, 1, 3`, () => {
  const out = rankPlayers([
    { id: 'P1', score: 20, correct: 2, totalMs: 1000 },
    { id: 'P2', score: 20, correct: 2, totalMs: 1000 },
    { id: 'P3', score: 10, correct: 2, totalMs: 500 },
  ]);
  assert.deepEqual(out, [{ id: 'P1', rank: 1 }, { id: 'P2', rank: 1 }, { id: 'P3', rank: 3 }]);
  // Hòa điểm, phân định bằng câu đúng rồi thời gian.
  const tb = rankPlayers([
    { id: 'P1', score: 10, correct: 1, totalMs: 900 },
    { id: 'P2', score: 10, correct: 2, totalMs: 3000 },
    { id: 'P3', score: 10, correct: 1, totalMs: 800 },
  ]);
  assert.deepEqual(tb, [{ id: 'P2', rank: 1 }, { id: 'P3', rank: 2 }, { id: 'P1', rank: 3 }]);
});
