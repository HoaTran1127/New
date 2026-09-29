# Prompt Research Standard

## Mục tiêu

Mỗi prompt phải có:
- Learning objective.
- Player mission.
- Gameplay mechanic.
- Camera/gesture specification.
- Content boundaries.
- Misconception/distractor logic.
- Feedback logic.
- Fallback.
- Safety/accessibility.
- Output contract.

## Quy tắc nghiên cứu

Nguồn ưu tiên:
- Public GitHub/community projects.
- Public game design documentation.
- Official curriculum/specifications.
- Official Gemini/Canvas documentation.

Research chỉ cung cấp pattern, không copy:
- mã nguồn;
- asset/hình ảnh độc quyền;
- tên game/brand/logo;
- exact visual identity;
- exact level content.

## Evidence tags

- `[Verified]`: đọc trực tiếp từ source.
- `[Inferred]`: suy ra từ nhiều source.
- `[Needs curriculum check]`: cần đối chiếu SGK/PPCT trước khi coi là coverage bắt buộc.

## Prompt quality gate

Prompt chưa đạt nếu:
- chỉ có ý tưởng mà không có gameplay state;
- thiếu camera/error/fallback;
- chỉ có một câu hỏi mẫu;
- không nói rõ điều kiện hit;
- không có feedback giải thích;
- quá nhiều gesture cùng lúc;
- yêu cầu công nghệ không cần thiết.