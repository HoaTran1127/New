import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

// Trình tự build: dữ liệu -> prompt -> biến thể -> legacy -> master -> chú thích docs -> dashboard -> bảng kiểm -> kiểm tra -> test.
const STEPS = ['build-catalog.mjs', 'build-prompts.mjs', 'build-variants.mjs', 'upgrade-legacy.mjs', 'build-master.mjs', 'annotate-docs.mjs', 'build-dashboard.mjs', 'build-acceptance.mjs', 'validate.mjs'];

function run(label, args) {
  console.log('\n$ node ' + label);
  try {
    execFileSync(process.execPath, args, { stdio: 'inherit', cwd: ROOT });
  } catch (err) {
    const code = typeof err.status === 'number' ? err.status : 1;
    console.error('\nBUILD DỪNG tại ' + label + ' (mã thoát ' + code + ')');
    process.exit(code || 1);
  }
}

for (const s of STEPS) {
  run('tools/' + s, [path.join(ROOT, 'tools', s)]);
}

// Bước cuối: chạy toàn bộ test. Node >= 21 tự mở rộng glob (truyền nguyên văn qua execFileSync, không qua shell);
// Node cũ hơn thì liệt kê file test tường minh.
const nodeMajor = Number(process.versions.node.split('.')[0]);
const testArgs = nodeMajor >= 21
  ? ['tools/test/*.test.mjs']
  : fs.readdirSync(path.join(ROOT, 'tools', 'test')).filter(f => f.endsWith('.test.mjs')).sort().map(f => 'tools/test/' + f);
run('--test tools/test/*.test.mjs', ['--test', ...testArgs]);

console.log('\nBuild xong. Dashboard đọc catalogs/GAME_CATALOG.js; muốn thêm game thì sửa tools/data/games.mjs.');
