// Unit test cho renderSections (tools/lib/skeleton.mjs) — Yêu cầu 5.6.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SECTIONS, renderSections } from '../lib/skeleton.mjs';

// Đủ mọi mục, mỗi mục một dòng riêng biệt.
const fullParts = () =>
  Object.fromEntries(SECTIONS.map((s) => [s.key, [`- Luật riêng của mục ${s.key}.`]]));

test('renderSections: thiếu mục → lỗi nêu id và tiêu đề mục', () => {
  for (const s of SECTIONS) {
    const parts = fullParts();
    delete parts[s.key];
    assert.throws(
      () => renderSections(parts, 'g-demo-01'),
      (e) => e.message.includes('g-demo-01') && e.message.includes(`thiếu mục ${s.title}`),
    );
  }
  // Mục chỉ có dòng trống cũng tính là thiếu.
  const blank = { ...fullParts(), memory: ['', '   '] };
  const mem = SECTIONS.find((s) => s.key === 'memory');
  assert.throws(() => renderSections(blank, 'prompts/x.md'), new RegExp(`prompts/x\\.md: thiếu mục ${mem.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
});

test('renderSections: dòng trùng (kể cả khác mục) → lỗi nêu 40 ký tự đầu', () => {
  const dup = '- Dòng luật rất dài được lặp lại ở hai mục khác nhau để kiểm tra';
  const parts = { ...fullParts(), hook: [dup], output: ['  ' + dup + '  '] };
  assert.throws(
    () => renderSections(parts, 'g1'),
    (e) => e.message === `g1: dòng luật lặp: ${dup.slice(0, 40)}` && !e.message.includes(dup.slice(0, 41)),
  );
});

test('renderSections: đầu vào đủ → heading theo đúng thứ tự SECTIONS, không phụ thuộc thứ tự khóa', () => {
  const parts = fullParts();
  const reversed = Object.fromEntries(Object.entries(parts).reverse());
  const out = renderSections(reversed, 'g1');
  assert.equal(out, renderSections(parts, 'g1'));
  const idx = SECTIONS.map((s) => out.indexOf(s.title));
  idx.forEach((i) => assert.ok(i >= 0));
  assert.deepEqual(idx, [...idx].sort((a, b) => a - b));
  const blocks = out.split('\n\n');
  assert.equal(blocks.length, SECTIONS.length);
  blocks.forEach((b, i) => assert.equal(b.split('\n')[0], SECTIONS[i].title));
});
