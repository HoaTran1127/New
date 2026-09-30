// Feature: new-repo-review-upgrade, Property 3: Core_Section đứng trước phần kỹ thuật
// **Validates: Requirements 5.1**
// Với mọi game trong GAMES, prompt render ra có 4 heading core đứng trước heading
// "NGÂN HÀNG DỮ LIỆU" và "KỸ THUẬT", và cả 9 heading theo đúng thứ tự SECTIONS.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GAMES } from '../data/games.mjs';
import { render } from '../build-prompts.mjs';
import { SECTIONS } from '../lib/skeleton.mjs';

// Heading luôn đứng riêng một dòng (renderSections ghép title + '\n' + các dòng).
const headingPos = (text, title) => text.indexOf('\n' + title + '\n');

test('Feature: new-repo-review-upgrade, Property 3: Core_Section đứng trước phần kỹ thuật', () => {
  assert.equal(GAMES.length, 85);
  const dataTitle = SECTIONS.find((s) => s.key === 'data').title;
  const techTitle = SECTIONS.find((s) => s.key === 'tech').title;
  const core = SECTIONS.filter((s) => s.core);
  assert.equal(core.length, 4);

  for (const g of GAMES) {
    const out = render(g);
    const pos = SECTIONS.map((s) => headingPos(out, s.title));
    SECTIONS.forEach((s, i) => assert.ok(pos[i] >= 0, `${g.id}: thiếu heading "${s.title}"`));

    const dataPos = headingPos(out, dataTitle);
    const techPos = headingPos(out, techTitle);
    for (const s of core) {
      const p = headingPos(out, s.title);
      assert.ok(p < dataPos, `${g.id}: "${s.title}" không đứng trước "${dataTitle}"`);
      assert.ok(p < techPos, `${g.id}: "${s.title}" không đứng trước "${techTitle}"`);
    }
    for (let i = 1; i < pos.length; i++) {
      assert.ok(pos[i - 1] < pos[i], `${g.id}: "${SECTIONS[i - 1].title}" không đứng trước "${SECTIONS[i].title}"`);
    }
  }
});
