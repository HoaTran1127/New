# L4-38 — Angle Rescue

Build a standalone single-file HTML Grade 4 mathematics game.

Learning goal: identify acute, right and obtuse angles and estimate common angle measures.

Player mission: help a team of explorers choose the correct angle gate.

Gameplay: display an angle and a target such as acute, right, obtuse, 45 degrees, 90 degrees, 120 degrees or 135 degrees. The player selects the matching gate. Include a simple on-screen protractor and generous visual tolerance.

Input: optional webcam index-finger pointing with MediaPipe Hands. Use calibration, smoothing, confidence threshold 0.65, explicit selection state and a 500ms cooldown. Mouse, touch and keyboard controls must always be available. A camera is never required.

Create at least 36 questions and recycle missed concepts.

After every answer show the measured/expected angle, the angle type and a short explanation.

Use large controls, high contrast, reduced-motion mode and a camera-off mode. Do not upload or store camera frames.

Return one complete HTML file with inline CSS and JavaScript, embedded question data, no TODOs and no pseudocode.