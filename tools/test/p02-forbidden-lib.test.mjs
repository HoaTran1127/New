// Feature: new-repo-review-upgrade, Property 2: Không còn chuỗi cấm
// **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**
// Phần lib: mọi chuỗi xuất ra từ tools/lib/*.mjs (và output của modelLine /
// sharedRuleLines nếu có) không được chứa chuỗi cấm.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join, dirname } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const LIB = join(HERE, '..', 'lib');

const FORBIDDEN = [
  'không xếp hạng',
  'Không leaderboard',
  'maxNumHands: 2',
  'numHands = 2N',
  '7 lần chạm logo',
  'mục máy tự kiểm',
  'tờ rời',
  'Chế độ hai học sinh (nút bật/tắt',
].map((s) => s.toLowerCase());

// Thu thập đệ quy mọi chuỗi trong object/array (bỏ qua function).
function collect(value, path, out, seen = new Set()) {
  if (typeof value === 'string') { out.push({ path, text: value }); return; }
  if (value === null || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  for (const [k, v] of Object.entries(value)) collect(v, `${path}.${k}`, out, seen);
}

function violations(items) {
  const bad = [];
  for (const { path, text } of items) {
    const low = text.toLowerCase();
    for (const f of FORBIDDEN) if (low.includes(f)) bad.push(`${path} chứa "${f}"`);
  }
  return bad;
}

test('Feature: new-repo-review-upgrade, Property 2: Không còn chuỗi cấm', async () => {
  const items = [];
  const files = readdirSync(LIB).filter((f) => f.endsWith('.mjs'));
  const mods = {};
  for (const f of files) {
    const mod = await import(pathToFileURL(join(LIB, f)).href);
    mods[f] = mod;
    for (const [name, v] of Object.entries(mod)) collect(v, `${f}:${name}`, items);
  }

  // modelLine trên mọi mã cử chỉ đơn lẻ và mọi mảng gestures của GAMES.
  const { modelLine } = mods['players.mjs'];
  const { GESTURES } = await import('../data/gestures.mjs');
  const { GAMES } = await import('../data/games.mjs');
  for (const code of Object.keys(GESTURES)) {
    items.push({ path: `modelLine([${code}])`, text: String(modelLine([code])) });
  }
  for (const g of GAMES) {
    items.push({ path: `modelLine(${g.id})`, text: String(modelLine(g.gestures)) });
  }

  // sharedRuleLines (nếu skeleton.mjs đã xuất) trên mọi tổ hợp english × finger.
  const { sharedRuleLines } = mods['skeleton.mjs'];
  if (typeof sharedRuleLines === 'function') {
    for (const english of [true, false]) {
      for (const finger of [true, false, 'maybe']) {
        // Chữ ký chưa chốt: thử cả dạng object lẫn dạng tham số vị trí.
        let called = false;
        for (const args of [[{ english, finger }], [english, finger]]) {
          let res;
          try { res = sharedRuleLines(...args); } catch { continue; }
          called = true;
          collect(res, `sharedRuleLines(${english},${finger})`, items);
        }
        assert.ok(called, `sharedRuleLines(${english}, ${finger}) ném lỗi với mọi dạng tham số`);
      }
    }
  }

  const bad = violations(items);
  assert.deepEqual(bad, [], `Tìm thấy chuỗi cấm:\n${bad.join('\n')}`);
});

test('Feature: new-repo-review-upgrade, Property 2: tools/lib/anticipation.mjs đã bị xoá', () => {
  assert.equal(existsSync(join(LIB, 'anticipation.mjs')), false);
});
