# AR Physical Math Playground — Architecture v2

## Mục tiêu

Một engine game chung cho Toán 4, nơi **curriculum → movement → game mechanic → feedback → mastery** được cấu hình bằng data thay vì copy-paste từng game.

## Layers

1. Camera Adapter
   - webcam permission
   - mirroring
   - framing
   - device capability

2. Vision Layer
   - HandTracker
   - PoseTracker (future)
   - confidence
   - timestamps
   - smoothing

3. Movement Interpreter
   - point
   - swipe
   - punch
   - pinch
   - grab/release
   - clap
   - two-hand stretch
   - raise left/right
   - angle pose
   - squat/jump/step
   - hold pose

4. Game Engine
   - state
   - spawn
   - collision
   - scoring
   - cooldown
   - timers
   - round lifecycle

5. Curriculum Content
   - learning objective
   - question generator
   - misconception/distractor
   - explanation
   - difficulty

6. Feedback
   - visual
   - audio
   - micro-explanation
   - mastery event

7. Progress
   - objective accuracy
   - response time
   - movement success
   - retry history
   - localStorage only for MVP

## Canonical event

MovementEvent {
  type,
  x,
  y,
  confidence,
  velocity,
  duration,
  timestamp
}

GameAction {
  action,
  sourceMovement,
  confidence,
  cooldownKey
}

LearningEvent {
  curriculumId,
  objectiveId,
  correct,
  misconceptionId,
  responseTime,
  movementType
}

## Design rule

Không để game đọc trực tiếp landmark thô nếu có thể. Game nên đọc MovementEvent/GameAction để thay HandTracker mà không phải viết lại game.

## Capability negotiation

Camera nhìn thấy:
- hand only → hand games
- upper body → hand + pose upper-body games
- full body → full-body games

Game tự chọn control mode phù hợp.
