// Feature: new-repo-review-upgrade, Property 9: Máy trạng thái làn
// **Validates: Requirements 3.5, 3.6, 3.7, 3.8**
import test from 'node:test';
import assert from 'node:assert/strict';
import { forAll } from './gen.mjs';
import { laneOf, laneStatus, calibrationReady, acceptAction } from '../lib/compete-ref.mjs';

const LABEL = 'Feature: new-repo-review-upgrade, Property 9: Máy trạng thái làn';
const STATUSES = ['ok', 'waiting', 'absent', 'crowded'];
// Khoảng vắng quanh biên 2000 ms.
const GAP_EDGES = [0, 1, 1999, 2000, 2001, 5000];

test(`${LABEL} — laneStatus`, () => {
  forAll(
    'laneStatus',
    (r) => {
      const lastSeenMs = r.int(0, 100000);
      const gap = r.bool(0.6) ? r.pick(GAP_EDGES) : r.int(0, 6000);
      return { count: r.pick([0, 0, 1, 2, 3]), lastSeenMs, nowMs: lastSeenMs + gap };
    },
    ({ count, lastSeenMs, nowMs }) => {
      const s = laneStatus(count, lastSeenMs, nowMs);
      if (count > 1) return s === 'crowded';
      if (count === 1) return s === 'ok';
      return s === (nowMs - lastSeenMs > 2000 ? 'absent' : 'waiting');
    },
    { runs: 300 },
  );
});

test(`${LABEL} — biên 2000 ms`, () => {
  assert.equal(laneStatus(0, 1000, 3000), 'waiting'); // đúng 2000 ms: chưa vắng
  assert.equal(laneStatus(0, 1000, 3001), 'absent');
  assert.equal(laneStatus(2, 1000, 99999), 'crowded'); // đông thắng vắng
});

test(`${LABEL} — calibrationReady`, () => {
  forAll(
    'calibrationReady',
    (r) => {
      const n = r.int(1, 3);
      // Nghiêng về 1 để hay gặp ca sẵn sàng.
      return Array.from({ length: n }, () => (r.bool(0.7) ? 1 : r.pick([0, 2, 3])));
    },
    (counts) => calibrationReady(counts) === counts.every((c) => c === 1),
    { runs: 300 },
  );
  assert.equal(calibrationReady([]), false);
});

test(`${LABEL} — acceptAction (với tay, bước chân, cổ tay chạm)`, () => {
  forAll(
    'acceptAction',
    (r) => {
      const n = r.int(1, 3);
      const lane = r.int(0, n - 1);
      // Điểm chạm gồm biên làn k/n và hai đầu 0, 1.
      const edges = [0, 1, ...Array.from({ length: n + 1 }, (_, k) => k / n)];
      const hitX = r.bool(0.4) ? r.pick(edges) : r.float01();
      return { kind: r.pick(['reach', 'step', 'wrist']), n, lane, hitX, status: r.pick(STATUSES) };
    },
    ({ n, lane, hitX, status }) => {
      const hitLane = laneOf(hitX, n);
      if (!(hitLane >= 0 && hitLane <= n - 1)) return false;
      return acceptAction(lane, hitX, n, status) === (status === 'ok' && hitLane === lane);
    },
    { runs: 400 },
  );
});

test(`${LABEL} — ví dụ cổ tay chạm mục tiêu`, () => {
  assert.equal(acceptAction(1, 0.5, 3, 'ok'), true);
  assert.equal(acceptAction(1, 0.9, 3, 'ok'), false); // chạm sang làn P3
  assert.equal(acceptAction(1, 0.5, 3, 'crowded'), false);
  assert.equal(acceptAction(0, 1, 1, 'ok'), true); // N = 1, x = 1 vẫn là làn 0
});
