# L4-39 — Data Detective

Create a standalone single-file Grade 4 Math game.

Learning objective: read tables, picture charts and bar charts; answer questions from data.

Mission: investigate a mystery by finding evidence in the correct chart.

Gameplay: each case contains a small dataset and a visual chart. Ask questions about greatest/least, difference, total, frequency and simple comparisons. The player points to the correct evidence card or chart bar.

Camera: optional MediaPipe Hands index-fingertip tracking with smoothing, confidence >= 0.65 and 350ms selection cooldown. Mouse/touch fallback.

Game loop: briefing → evidence tutorial → 10 cases → evidence explanation → detective score.

Generate at least 30 datasets with varied categories and values. Randomize labels and answer positions. Include traps involving reading the wrong category, confusing total with difference and misreading the chart scale.

Feedback highlights the exact bars/cells used and computes the answer step by step.

Accessible, calm UI; no camera upload; no flashing. Output one complete HTML file, all data embedded, no TODOs.