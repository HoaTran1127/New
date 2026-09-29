# E4-13 — Phonics Pop

Create a standalone single-file English Grade 4 phonics game.

Learning objective: distinguish common English sounds, identify the sound in a word and connect sound patterns with spelling.

Mission: pop only the bubbles whose words contain the target sound or spelling pattern.

Gameplay: display a target sound/pattern such as /sh/, /ch/, /th/, /ee/, /oa/ and spawn word bubbles. Correct bubbles pop; distractors remain.

Optional webcam fingertip swipe/pop using MediaPipe Hands. Require confidence >= 0.65, smoothing, swipe velocity threshold, explicit action detection and 300ms cooldown. Mouse/touch fallback.

Generate at least 50 word items grouped by sound pattern. Avoid ambiguous pronunciation unless the word is explicitly marked as an exception.

After each miss, play the word and highlight the target sound pattern.

Include reduced motion, readable font, no camera upload. Output one complete HTML file, no TODOs.