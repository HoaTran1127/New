# L4-36 — Place Value Forge

Create a standalone single-file HTML educational game for Grade 4 Math.

## Learning objective
Practice place value, expanded form, reading and comparing multi-digit numbers.

## Mission
Forge the requested number by placing each digit into the correct place-value slot.

## Core gameplay
Show a number target or expanded-form clue. The player moves digit tiles into slots for ones, tens, hundreds, thousands, ten-thousands and hundred-thousands. Include distractor digits and mixed clue types.

## Controls
Primary: POINT/DRAG. If webcam is available, track one index fingertip with MediaPipe Hands. Use smoothing, confidence >= 0.65, drag hysteresis and 300ms drop cooldown. Never count hovering as a drop. Mouse/touch fallback must work.

## Game loop
Start → camera check → 20-second calibration → tutorial → practice → 10-question round → instant feedback → worked place-value explanation → summary → replay.

## Data
Generate at least 40 deterministic question templates. Include common errors such as swapped adjacent places, leading zero, and confusing digit value with digit name. Randomize distractor order and correct-answer position.

## Feedback
For every error, show the correct slot and explain the digit's value in that place. Track accuracy, response time and error type.

## UX and safety
Large high-contrast tiles, readable Grade-4 English UI, no flashing effects, no account, no video upload. Explain camera permission and provide a no-camera mode.

## Output
Return only one complete HTML file with inline CSS/JS and CDN imports if needed. No TODOs, pseudocode or missing functions. The game must run immediately after saving as .html.