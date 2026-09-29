# Community Game Patterns — Research Notes

Mục đích: dùng gameplay patterns công khai để thiết kế prompt mới. Không sao chép mã nguồn, visual identity hoặc nội dung nguyên bản.

## Hand / webcam motion

### Orb Catcher
- MediaPipe Tasks Vision chạy trong browser.
- Có gesture state machine + debounce.
- Tách game loop khỏi tracking loop.
Source: https://github.com/ihemu45/orb-catcher

### HandPlay
- Nhiều game webcam.
- Fruits Cut AR dùng fingertip làm blade, hai tay, mouse/touch fallback.
- Camera toggle, pause khi rời tab, camera diagnostics.
Source: https://github.com/ArthiKontham/HandPlay

### Zlice
- Index fingertip + swipe velocity.
- Collision point-to-segment/distance.
- Có tests cho tracking/slicing/physics.
Source: https://github.com/Axwathy/Zlice

### Pop Pop Popper
- Pinch = pop một vật; grab = smash một cụm.
- Tap/click fallback.
- Tracking local browser.
Source: https://github.com/rayhantr/pop-pop-popper

### Hand-Gesture-Puzzle
- Pinch-and-hold drag/drop.
- Hai tay chọn vùng.
- Nhiều difficulty.
Source: https://github.com/toxicbishop/Hand-Gesture-Puzzle

## English learning patterns

### Voice Games
- 10 mini-games: lane racer, bubble popper, boss fight, rocket climb, skate, asteroid destroyer, treasure hunter, sentence bird, echo memory, maze.
- Flow: choose game → vocabulary → difficulty → play → review.
- Custom word sets và per-word practice report.
Source: https://github.com/scaredofthesix/voice-games

### Phonics AI
- Listen → Practice → Play → Assess.
- Phoneme pop, word builder, sound match, pronunciation feedback.
Source: https://github.com/alfredang/phonics-ai

### SpellingGame
- Hình + mô tả để trẻ tự suy ra từ thay vì nhìn thấy toàn bộ đáp án.
- Hint và điểm theo từng chữ.
Source: https://github.com/RachWalm/spelling-game

### Spelling Space Adventure
- Round 10 từ; nghe → ghép chữ → TTS.
- Difficulty và touch-friendly.
Source: https://github.com/Reosoul/SpellingGame

### WordDrop
- Hình + audio + spelling.
- Sai thì replay audio.
- Từ khó được đưa trở lại để luyện.
Source: https://github.com/hh-ricco/worddrop

## Math patterns

### Math Quest
- 4th-grade quiz + first-person exploration.
- Math learning nhúng vào exploration.
Source: https://github.com/amahpour/math-quest

### Fraction Bingo / Memory
- Fraction arithmetic, simplify, fraction-decimal-percentage matching.
Sources:
- https://github.com/vehave/fraction-bingo-build
- https://github.com/vehave/fractions-memory-game-build

### Gorilla Math
- Grade 1–5 difficulty.
- Grade 4 multiplication/division/mixed operations; grade 5 advanced operations/fractions.
- Timed challenge + score.
Source: https://github.com/snedea/math-game

## Prompt implications

1. Một gesture nên có một meaning rõ.
2. Tracking nên có state + debounce/cooldown.
3. Tách tracking khỏi render loop khi có physics.
4. English listening nên audio-first.
5. Spelling nên đi từ picture/audio → letters.
6. Dùng exploration, memory, maze, racer, boss, building để tránh lặp một mechanic.
7. Có review theo item/skill, không chỉ high score.
8. Chỉ tái sử dụng interaction pattern; không sao chép code, asset, logo, tên game hoặc visual identity.