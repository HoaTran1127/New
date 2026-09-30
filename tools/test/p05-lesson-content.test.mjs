// Feature: new-repo-review-upgrade, Property 5: Giữ nguyên nội dung bài học
// **Validates: Requirements 5.5**
// Với mọi game trong GAMES, prompt render ra chứa tên game, mission, cluster.noi_dung,
// toàn văn ERROR_NOTES[cluster], mọi nhãn cluster.tags, BANK[môn].so và hai mục mẫu
// EXAMPLES[cluster] (prompt/answer/explanation) đúng như dữ liệu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { GAMES } from '../data/games.mjs';
import { BANK } from '../data/gestures.mjs';
import { cluster } from '../data/clusters.mjs';
import { EXAMPLES } from '../data/examples.mjs';
import { ERROR_NOTES } from '../data/error-notes.mjs';
import { readCatalog } from '../lib/csv.mjs';
import { render } from '../build-prompts.mjs';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const ROW_OF = new Map(readCatalog(path.join(ROOT, 'catalogs/GAME_CATALOG.csv')).map((r) => [r.id, r]));

test('Feature: new-repo-review-upgrade, Property 5: Giữ nguyên nội dung bài học', () => {
  assert.equal(GAMES.length, 85);
  for (const g of GAMES) {
    const out = render(g);
    const has = (needle, what) => assert.ok(out.includes(needle), `${g.id}: thiếu ${what}: ${String(needle).slice(0, 80)}`);

    const row = ROW_OF.get(g.id);
    assert.ok(row, `${g.id}: không có dòng catalog`);
    const cl = cluster(g.cluster);
    assert.ok(cl, `${g.id}: không có cụm ${g.cluster}`);
    const bank = BANK[row.mon];
    assert.ok(bank, `${g.id}: không có BANK cho ${row.mon}`);
    const ex = EXAMPLES[g.cluster];
    assert.ok(Array.isArray(ex) && ex.length >= 2, `${g.id}: EXAMPLES[${g.cluster}] cần ≥ 2 mục`);

    has(g.name, 'tên game');
    has(g.mission, 'mission');
    has(cl.noi_dung, 'cluster.noi_dung');
    has(ERROR_NOTES[g.cluster], 'ERROR_NOTES');
    for (const t of cl.tags) has(t, 'nhãn cluster');
    has(`Tối thiểu ${bank.so} mục`, 'BANK.so');

    // render in mục mẫu dạng `key: JSON.stringify(value)`.
    for (const e of ex.slice(0, 2)) {
      has('prompt: ' + JSON.stringify(e.prompt), 'prompt mục mẫu');
      has('answer: ' + JSON.stringify(e.answer), 'answer mục mẫu');
      has('explanation: ' + JSON.stringify(e.explanation), 'explanation mục mẫu');
    }
  }
});
