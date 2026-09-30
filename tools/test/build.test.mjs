// Test lỗi build có ngữ cảnh — Yêu cầu 6.4.
// Không chạy bước build thật, không ghi vào tools/data hay tệp đầu ra thật.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { render } from '../build-prompts.mjs';
import { GAMES } from '../data/games.mjs';

const TOOLS = path.resolve(import.meta.dirname, '..');

test('render: gesture không tồn tại → lỗi nêu id game và đường dẫn prompt', () => {
  const g = GAMES[0];
  assert.throws(
    () => render({ ...g, gestures: ['NOPE'] }),
    (err) => {
      assert.ok(err.message.includes(g.id), `thiếu id ${g.id}: ${err.message}`);
      assert.match(err.message, /prompts\/01-toan4\//);
      assert.ok(err.message.includes('NOPE'), err.message);
      return true;
    },
  );
});

test('build.mjs: bước lỗi → dừng ngay, nêu script và tệp hỏng, không chạy bước sau', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'build-failfast-'));
  try {
    const tools = path.join(tmp, 'tools');
    fs.mkdirSync(tools);
    fs.copyFileSync(path.join(TOOLS, 'build.mjs'), path.join(tools, 'build.mjs'));
    fs.writeFileSync(path.join(tools, 'build-catalog.mjs'), "throw new Error('tệp hỏng: prompts/x.md');\n", 'utf8');
    const marker = path.join(tmp, 'marker.txt');
    fs.writeFileSync(
      path.join(tools, 'build-prompts.mjs'),
      `import fs from 'fs';\nfs.writeFileSync(${JSON.stringify(marker)}, 'ran');\n`,
      'utf8',
    );
    const r = spawnSync(process.execPath, [path.join(tools, 'build.mjs')], { cwd: tmp, encoding: 'utf8' });
    const out = (r.stdout || '') + (r.stderr || '');
    assert.notEqual(r.status, 0, out);
    assert.ok(out.includes('BUILD DỪNG tại tools/build-catalog.mjs'), out);
    assert.ok(out.includes('prompts/x.md'), out);
    assert.equal(fs.existsSync(marker), false, 'bước sau build-catalog vẫn chạy');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
