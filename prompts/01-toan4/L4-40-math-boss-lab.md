# L4-40 — Math Boss Lab

Create a standalone single-file Grade 4 Math review game.

Learning objective: integrate number sense, operations, fractions, measurement, geometry and data.

Mission: defeat a sequence of six bosses by solving the exact skill each boss tests.

Gameplay: each boss uses a distinct mechanic: Number Forge, Operation Punch, Fraction Shield, Measurement Aim, Geometry Align and Data Detective. Keep mechanics lightweight and educational rather than combat-heavy.

Camera: optional hand/pose control with MediaPipe. Each gesture must map to one explicit action, use confidence >= 0.65, smoothing, state/debounce and 300–500ms cooldown. Never use hover as a hit. Mouse/touch/keyboard fallback.

Campaign: calibration → tutorial → 6 boss stages → adaptive review of missed skills → final mastery report.

Generate at least 60 questions with skill tags. If a learner misses a skill twice, bring back a simpler example before increasing difficulty.

Feedback explains the mathematical reasoning, not merely correct/incorrect.

Accessibility: reduced motion, large text, camera-off mode, no upload. Output one complete HTML file, no TODOs.