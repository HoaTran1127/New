# PROMPT LIBRARY — 5-ROUND EXPANSION LOG

Date: 2026-09-29

> **Status note (đọc trước):** đây là nhật ký lịch sử, số liệu trong bài đã lỗi thời. Catalog hiện tại có **85 dòng game chuẩn** (`catalogs/GAME_CATALOG.csv`, sinh lại bằng `node tools/build.mjs`) cộng **12 prompt legacy**. Mọi con số "55/35/20 rows" bên dưới chỉ mô tả thời điểm viết log.
> **05/10/2026:** các id `E4-*/E5-*` và thư mục `prompts/03-english4`, `prompts/04-english5` nêu trong log không còn tồn tại. Nhánh tiếng Anh đã chia lại theo band Cambridge: `ST-*` → `prompts/03-english-starters/`, `MV-*` → `prompts/04-english-movers/`, `FY-*` → `prompts/05-english-flyers/` (10 game/band), trần từ vựng và ngữ pháp lấy theo `tools/data/yle.mjs`.

## Objective
Expand the Gemini Canvas Prompt Library for Grade 4–5 Math and English while keeping the repository focused on standalone prompts, not a game-engine implementation.

## Round 1 — Inventory audit
Checked the live GitHub repository HoaTran1127/New.
- Before expansion, catalogs/GAME_CATALOG.csv contained 35 Grade 4 Math rows.
- Existing English 4, English 5 and Grade 5 Math prompt folders were present in repository history/search, but the catalogue was incomplete.
- Prompt filenames were not always predictable from earlier notes, so paths must be discovered from GitHub rather than guessed.
- prompts/README.md defines the quality target: objective, mission, gameplay, controls, camera/tracking, calibration/confidence/cooldown, question data, feedback, game loop, fallback, safety/accessibility and single-file output.

## Round 2 — Gap analysis
Identified gaps not sufficiently represented by the catalogue:
- Grade 4 Math: place value construction, fraction-in-context practice, angle classification/measurement, data evidence reading and cumulative review.
- Grade 5 Math: decimals in context, percentage representations, volume, motion word problems and strategy selection.
- English 4: picture-story sequencing, listening classification, phonics patterns, question formation and integrated review.
- English 5: reading evidence, grammar repair, speaking practice, word formation and integrated review.
Design rule: add new mechanics and learning targets instead of cosmetic clones.

## Round 3 — Prompt generation
Added 20 standalone prompts.

Grade 4 Math: L4-36 Place Value Forge; L4-37 Fraction Market; L4-38 Angle Rescue; L4-39 Data Detective; L4-40 Math Boss Lab.
Grade 5 Math: T5-11 Decimal Shop; T5-12 Percentage Lab; T5-13 Volume Vault; T5-14 Motion Word-Problem Racer; T5-15 Math Strategy Arena.
English 4: E4-11 Picture Story Builder; E4-12 Listen and Sort; E4-13 Phonics Pop; E4-14 Question Builder; E4-15 English Adventure Map.
English 5: E5-11 Reading Detective; E5-12 Grammar Builder; E5-13 Speaking Mission; E5-14 Word Formation Lab; E5-15 English Challenge Cup.
Every new prompt is intended to be copied independently into Gemini Canvas and does not depend on src/ or games/.

## Round 4 — Repository/path verification
Verified newly created prompt files through the GitHub Contents API using exact repository paths. Earlier 404s were traced to incorrect guessed filenames, not missing repository content.

## Round 5 — Catalogue and quality gate
Updated catalogs/GAME_CATALOG.csv with all 20 new entries and exact prompt paths.
New catalogue rows now cover 5 additional games in each of four grade/subject buckets.
The CSV now contains 55 catalogue rows: the original 35 rows plus 20 new rows. Some older prompt files exist in the repository but were not previously represented in the CSV.

## Research patterns incorporated
- short rounds with immediate instructional feedback
- weak-skill recycling and spaced review
- picture + audio + spelling combinations
- evidence-based reading tasks
- conservative observable voice-practice checks
- fingertip selection, swipe and drag interactions
- explicit camera calibration, confidence thresholds, smoothing and cooldowns
- mouse/touch/keyboard fallbacks
- privacy-first camera/microphone handling
- adaptive difficulty by skill rather than speed alone

Public pattern references used:
- https://github.com/scaredofthesix/voice-games
- https://github.com/alfredang/phonics-ai
- https://github.com/RachWalm/spelling-game
- https://github.com/hh-ricco/worddrop
- https://github.com/amahpour/math-quest
- https://github.com/vehave/fractions-memory-game-build
- https://github.com/vehave/fraction-bingo-build
- https://github.com/ihemu45/orb-catcher
- https://github.com/ArthiKontham/HandPlay
- https://github.com/Axwathy/Zlice
- https://support.google.com/gemini/answer/15235603

## Next expansion targets
1. curriculum-specific alignment per textbook/PPCT
2. more Grade 5 English listening/speaking variants
3. more non-camera mechanics so camera remains optional
4. bilingual teacher-facing metadata
5. automated validation that every CSV prompt path exists
6. richer searchable catalogue UI with copy-prompt action