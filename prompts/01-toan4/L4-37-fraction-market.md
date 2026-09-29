# L4-37 — Fraction Market

Create a standalone single-file HTML game for Grade 4 Math.

Learning objective: recognize fractions, equivalent fractions, compare fractions and find a fraction of a collection.

Mission: shop for the exact fraction of items requested before the market timer expires.

Core gameplay: present fruit/objects as equal groups. A customer asks for a fraction such as 3/4. The player selects or physically grabs the correct number of equal parts. Add equivalent-fraction rounds and comparison rounds.

Primary control: GRAB/POINT. Webcam mode uses MediaPipe Hands with smoothed fingertip tracking, confidence >= 0.65, 250ms selection cooldown and explicit press/release state. Mouse/touch/keyboard fallback is mandatory.

Game loop: Start → calibration → tutorial → practice → 12-round market → feedback/explanation → mastery summary.

Data: at least 50 questions spanning proper fractions, equivalent models, fraction comparison and fraction-of-number. Include traps: unequal partitions, reversed numerator/denominator, non-equivalent visual groups and wrong whole.

Feedback: animate the fraction model and explain numerator, denominator and the whole after each answer. Recycle missed concepts later in the same session.

Accessibility/safety: large targets, reduced-motion mode, no upload, camera optional.

Output one complete HTML file, self-contained, no TODO/pseudocode.