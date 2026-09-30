// Feature: new-repo-review-upgrade, Property 1: Mỗi chỉ dẫn cần giữ xuất hiện đúng một lần
// **Validates: Requirements 2.1, 2.2, 3.9, 4.1, 5.4, 5.6, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.12**
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GAMES } from '../data/games.mjs';
import { render } from '../build-prompts.mjs';
import { readCatalog } from '../lib/csv.mjs';
import path from 'path';
import { PLAYERS } from '../lib/players.mjs';
import { COMPETE } from '../lib/compete.mjs';
import { EFFECTS } from '../lib/effects.mjs';
import { HYPE } from '../lib/hype.mjs';
import { FEEL, MOTION } from '../lib/feel.mjs';
import { MEMORY } from '../lib/memory.mjs';
import { VERIFY, ADAPT } from '../lib/verify.mjs';
import { PE } from '../lib/pe.mjs';
import { ACCESS } from '../lib/access.mjs';
import { CLASSROOM } from '../lib/classroom.mjs';
import { AR_RENDER } from '../lib/ar.mjs';
import { RULES } from '../lib/rules.mjs';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const MON = new Map(readCatalog(path.join(ROOT, 'catalogs/GAME_CATALOG.csv')).map((r) => [r.id, r.mon]));

const count = (hay, needle) => hay.split(needle).length - 1;

// Mọi chuỗi phải có đúng một lần ở mọi game (không phụ thuộc môn).
const ALWAYS = [
  ['PLAYERS', PLAYERS],
  ['COMPETE', COMPETE],
  ['EFFECTS', EFFECTS],
  ['HYPE', HYPE],
  ['FEEL', FEEL],
  ['MOTION', MOTION],
  ['MEMORY', MEMORY],
  ['ADAPT', { level: ADAPT.level }],
  ['VERIFY', { bank: VERIFY.bank }],
  ['PE', { warmCool: PE.warmCool, pace: PE.pace, loadCap: PE.loadCap }],
  ['ACCESS', ACCESS],
  ['CLASSROOM', CLASSROOM],
  ['AR', { AR_RENDER }],
  ['RULES', Object.fromEntries(Object.entries(RULES).filter(([k]) => k !== 'listening' && k !== 'speechSynthesis'))],
].flatMap(([layer, obj]) => Object.entries(obj).map(([k, s]) => [`${layer}.${k}`, s]));

test('Feature: new-repo-review-upgrade, Property 1: Mỗi chỉ dẫn cần giữ xuất hiện đúng một lần', () => {
  assert.equal(GAMES.length, 85);
  const failures = [];
  for (const g of GAMES) {
    const out = render(g);
    const english = MON.get(g.id) === 'Tiếng Anh';
    const needles = [
      ...ALWAYS,
      ['RULES.listening', RULES.listening, english ? 1 : 0],
      ...(english ? [['RULES.speechSynthesis', RULES.speechSynthesis, 1]] : []),
    ];
    for (const [name, needle, want = 1] of needles) {
      assert.ok(typeof needle === 'string' && needle.length > 0, `${name} phải là chuỗi khác rỗng`);
      const n = count(out, needle);
      if (n !== want) failures.push(`${g.id}: ${name} xuất hiện ${n} lần (cần ${want})`);
    }
  }
  assert.deepEqual(failures, []);
});

test('Property 1 (ví dụ): có cả game Tiếng Anh và Toán trong 85 game', () => {
  const mons = new Set(GAMES.map((g) => MON.get(g.id)));
  assert.ok(mons.has('Tiếng Anh'));
  assert.ok([...mons].some((m) => m !== 'Tiếng Anh'));
});
