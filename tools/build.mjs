import { execFileSync } from 'child_process';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

// Trình tự build: dữ liệu -> prompt -> biến thể -> legacy -> chú thích docs -> dashboard -> kiểm tra.
const STEPS = ['build-catalog.mjs', 'build-prompts.mjs', 'build-variants.mjs', 'upgrade-legacy.mjs', 'annotate-docs.mjs', 'build-dashboard.mjs', 'validate.mjs'];

for (const s of STEPS) {
  console.log('\n$ node tools/' + s);
  execFileSync(process.execPath, [path.join(ROOT, 'tools', s)], { stdio: 'inherit', cwd: ROOT });
}
console.log('\nBuild xong. Dashboard đọc catalogs/GAME_CATALOG.js; muốn thêm game thì sửa tools/data/games.mjs.');
