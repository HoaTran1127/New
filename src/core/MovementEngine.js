/**
 * MovementEngine.js
 * Chuẩn hóa chuyển động camera thành MovementEvent dùng chung cho mọi game AR.
 * Không chứa logic bài học; chỉ nhận hand/pose observations và phát event.
 */
class MovementEngine {
  constructor(options = {}) {
    this.cooldownMs = options.cooldownMs || 180;
    this.swipeThreshold = options.swipeThreshold || 0.75;
    this.punchThreshold = options.punchThreshold || 1.15;
    this.poseHoldMs = options.poseHoldMs || 450;
    this.lastAt = Object.create(null);
    this.previous = { hands: [], pose: null, time: 0 };
    this.holdStarted = Object.create(null);
  }

  _emit(type, payload = {}) {
    const now = performance.now();
    const last = this.lastAt[type] || 0;
    if (now - last < this.cooldownMs) return null;
    this.lastAt[type] = now;
    return {
      type,
      timestamp: now,
      confidence: payload.confidence ?? 1,
      source: payload.source || 'camera',
      ...payload
    };
  }

  update({ hands = [], pose = null, timestamp = performance.now() } = {}) {
    const events = [];
    const hand = hands[0];

    if (hand) {
      if (hand.strikePulse || hand.speed >= this.punchThreshold) {
        const e = this._emit('PUNCH', { x: hand.x, y: hand.y, handIndex: hand.index, confidence: hand.confidence ?? 1 });
        if (e) events.push(e);
      }

      if (hand.indexTip) {
        const prev = this.previous.hands[0];
        if (prev) {
          const dx = hand.indexTip.x - prev.indexTip.x;
          const dy = hand.indexTip.y - prev.indexTip.y;
          const dt = Math.max(16, timestamp - (prev.timestamp || timestamp - 16)) / 1000;
          const vx = dx / dt;
          const vy = dy / dt;
          const speed = Math.hypot(vx, vy);
          if (speed >= this.swipeThreshold) {
            const e = this._emit('SWIPE', {
              x: hand.indexTip.x, y: hand.indexTip.y,
              dx, dy, vx, vy, speed, handIndex: hand.index,
              direction: Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'RIGHT' : 'LEFT') : (dy > 0 ? 'DOWN' : 'UP'),
              confidence: hand.confidence ?? 1
            });
            if (e) events.push(e);
          }
        }

        const fist = hand.isFist;
        if (fist) {
          const e = this._emit('GRAB', { x: hand.indexTip.x, y: hand.indexTip.y, handIndex: hand.index, confidence: hand.confidence ?? 1 });
          if (e) events.push(e);
        }
      }

      if (hand.isPinching) {
        const e = this._emit('PINCH', { x: hand.indexTip?.x ?? hand.x, y: hand.indexTip?.y ?? hand.y, handIndex: hand.index, confidence: hand.confidence ?? 1 });
        if (e) events.push(e);
      }
    }

    if (hands.length >= 2) {
      const a = hands[0], b = hands[1];
      const dx = b.x - a.x, dy = b.y - a.y;
      const distance = Math.hypot(dx, dy);
      const prevA = this.previous.hands[0], prevB = this.previous.hands[1];
      const prevDistance = prevA && prevB ? Math.hypot(prevB.x - prevA.x, prevB.y - prevA.y) : distance;
      if (Math.abs(distance - prevDistance) > 0.012) {
        const e = this._emit('TWO_HAND_STRETCH', { distance, delta: distance - prevDistance, confidence: Math.min(a.confidence ?? 1, b.confidence ?? 1) });
        if (e) events.push(e);
      }
    }

    if (pose) {
      const p = this._interpretPose(pose);
      for (const candidate of p) {
        const e = this._emit(candidate.type, candidate);
        if (e) events.push(e);
      }
    }

    this.previous = {
      hands: hands.map(h => ({ ...h, indexTip: h.indexTip ? { ...h.indexTip } : null })),
      pose,
      time: timestamp
    };
    return events;
  }

  _interpretPose(pose) {
    const events = [];
    const lm = pose.landmarks || pose;
    const get = i => lm?.[i];
    if (!get(0)) return events;

    const nose = get(0), leftWrist = get(15), rightWrist = get(16);
    const leftHip = get(23), rightHip = get(24), leftKnee = get(25), rightKnee = get(26);

    if (leftWrist && rightWrist && leftWrist.visibility > 0.55 && rightWrist.visibility > 0.55) {
      if (leftWrist.y < nose.y - 0.06) events.push({ type: 'LEFT_RAISE', confidence: leftWrist.visibility });
      if (rightWrist.y < nose.y - 0.06) events.push({ type: 'RIGHT_RAISE', confidence: rightWrist.visibility });
      if (leftWrist.y < nose.y - 0.06 && rightWrist.y < nose.y - 0.06) {
        events.push({ type: 'BOTH_RAISE', confidence: Math.min(leftWrist.visibility, rightWrist.visibility) });
      }
    }

    if (leftHip && rightHip && leftKnee && rightKnee) {
      const kneeY = (leftKnee.y + rightKnee.y) / 2;
      const hipY = (leftHip.y + rightHip.y) / 2;
      if (kneeY < hipY + 0.05) {
        events.push({ type: 'JUMP', confidence: Math.min(leftKnee.visibility ?? 0, rightKnee.visibility ?? 0) });
      } else if (kneeY > hipY + 0.16) {
        events.push({ type: 'SQUAT', confidence: Math.min(leftKnee.visibility ?? 0, rightKnee.visibility ?? 0) });
      }
    }

    return events;
  }
}
if (typeof window !== 'undefined') window.MovementEngine = MovementEngine;
