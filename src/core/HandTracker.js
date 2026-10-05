/**
 * HandTracker.js
 * Wrapper nhận diện cử chỉ bàn tay từ webcam bằng Google MediaPipe Hands
 * - Lọc nhiễu / chống rung tay bằng Exponential Moving Average (EMA)
 * - Tự động phát hiện vung đấm (Punch velocity), xòe tay, hoặc ngón trỏ
 * - Hỗ trợ cả chế độ 1 tay (Single Hand) và 2 tay (Dual Hands)
 */

class HandTracker {
  constructor(options = {}) {
    this.videoElement = options.videoElement || null;
    this.maxNumHands = options.maxNumHands || 1;
    this.cdnBase = options.cdnBase || 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/';
    this.minDetectionConfidence = options.minDetectionConfidence || 0.65;
    this.minTrackingConfidence = options.minTrackingConfidence || 0.65;
    this.smoothingFactor = options.smoothingFactor || 0.45; // EMA alpha
    this.strikeSpeedThreshold = options.strikeSpeedThreshold || 1.15;
    this.strikeReleaseThreshold = options.strikeReleaseThreshold || 0.55;
    this.strikeCooldownMs = options.strikeCooldownMs || 220;

    this.hands = null;
    this.camera = null;
    this.isRunning = false;
    this.lastHandsData = [];
    this.lastStrikeAt = [];
    this.onResultsCallback = null;
    this.onReadyCallback = null;
    this.onErrorCallback = null;
  }

  async init(onReady, onResults, onError) {
    this.onReadyCallback = onReady;
    this.onResultsCallback = onResults;
    this.onErrorCallback = onError;

    if (typeof Hands === 'undefined') {
      const err = new Error("Thư viện MediaPipe Hands chưa được nạp vào trang.");
      err.name = 'CdnError';
      if (this.onErrorCallback) this.onErrorCallback(err);
      return;
    }

    try {
      this.hands = new Hands({
        locateFile: (file) => this.cdnBase + file
      });

      this.hands.setOptions({
        maxNumHands: this.maxNumHands,
        modelComplexity: 1,
        minDetectionConfidence: this.minDetectionConfidence,
        minTrackingConfidence: this.minTrackingConfidence
      });

      this.hands.onResults((results) => this._handleResults(results));

      if (!this.videoElement) {
        this.videoElement = document.createElement('video');
        this.videoElement.setAttribute('playsinline', '');
        this.videoElement.style.display = 'none';
        document.body.appendChild(this.videoElement);
      }

      if (typeof Camera !== 'undefined') {
        this.camera = new Camera(this.videoElement, {
          onFrame: async () => {
            if (this.isRunning && this.videoElement.readyState >= 2) {
              await this.hands.send({ image: this.videoElement });
            }
          },
          width: 640,
          height: 480
        });
        await this.camera.start();
      } else {
        // Fallback getUserMedia trực tiếp
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' }
        });
        this.videoElement.srcObject = stream;
        await this.videoElement.play();
        this._startVideoLoop();
      }

      this.isRunning = true;
      if (this.onReadyCallback) this.onReadyCallback();
    } catch (err) {
      console.error("Khởi động HandTracker thất bại:", err);
      if (this.onErrorCallback) this.onErrorCallback(err);
    }
  }

  _startVideoLoop() {
    const loop = async () => {
      if (!this.isRunning) return;
      if (this.videoElement.readyState >= 2) {
        await this.hands.send({ image: this.videoElement });
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  _handleResults(results) {
    const processedHands = [];

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      for (let i = 0; i < results.multiHandLandmarks.length; i++) {
        const rawLandmarks = results.multiHandLandmarks[i];
        
        // Landmark 0: Cổ tay, 5: Khớp ngón trỏ, 9: Khớp ngón giữa, 17: Khớp ngón út, 8: Đầu ngón trỏ, 12: Đầu ngón giữa
        // Tâm bàn tay xấp xỉ từ khớp 0, 5, 9, 17
        const rawPalmX = (rawLandmarks[0].x + rawLandmarks[5].x + rawLandmarks[9].x + rawLandmarks[17].x) / 4;
        const rawPalmY = (rawLandmarks[0].y + rawLandmarks[5].y + rawLandmarks[9].y + rawLandmarks[17].y) / 4;
        const rawPalmZ = (rawLandmarks[0].z + rawLandmarks[5].z + rawLandmarks[9].z + rawLandmarks[17].z) / 4;

        // Đầu ngón trỏ
        const indexTipX = rawLandmarks[8].x;
        const indexTipY = rawLandmarks[8].y;

        // Trục X bị lật gương (Mirroring) để người chơi cảm giác tự nhiên như soi gương
        const mirroredPalmX = 1 - rawPalmX;
        const mirroredIndexX = 1 - indexTipX;

        // Bộ lọc EMA làm mượt chuyển động chống rung camera
        let prevHand = this.lastHandsData[i];
        let smoothX = mirroredPalmX;
        let smoothY = rawPalmY;
        let speed = 0;
        const now = performance.now();

        if (prevHand) {
          smoothX = prevHand.x + this.smoothingFactor * (mirroredPalmX - prevHand.x);
          smoothY = prevHand.y + this.smoothingFactor * (rawPalmY - prevHand.y);
          
          const dx = smoothX - prevHand.x;
          const dy = smoothY - prevHand.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const dt = Math.max(16, now - (prevHand.timestamp || now - 16));
          speed = distance / (dt / 1000);
        }

        // Kiểm tra nắm tay (Fist) hay xòe tay (Open Palm)
        // Nếu khoảng cách đầu ngón tay tới cổ tay nhỏ hơn khớp gốc -> Nắm đấm
        const wrist = rawLandmarks[0];
        const distIndex = Math.hypot(rawLandmarks[8].x - wrist.x, rawLandmarks[8].y - wrist.y);
        const distKnuckle = Math.hypot(rawLandmarks[5].x - wrist.x, rawLandmarks[5].y - wrist.y);
        const isFist = distIndex < distKnuckle * 1.15;

        // Cú vung đấm chém (Strike): Khi tốc độ tay vượt ngưỡng hoặc đang lao tới
        const wasStriking = Boolean(prevHand && prevHand.isStriking);
        const isStriking = wasStriking
          ? speed > this.strikeReleaseThreshold
          : speed > this.strikeSpeedThreshold;
        const canPulse = now - (this.lastStrikeAt[i] || 0) >= this.strikeCooldownMs;
        const strikePulse = isStriking && !wasStriking && canPulse;
        if (strikePulse) this.lastStrikeAt[i] = now;

        processedHands.push({
          index: i,
          x: smoothX,
          y: smoothY,
          z: rawPalmZ,
          indexTip: { x: mirroredIndexX, y: indexTipY },
          speed,
          isFist,
          isStriking,
          strikePulse,
          timestamp: now,
          landmarks: rawLandmarks
        });
      }
    }

    this.lastHandsData = processedHands;

    if (this.onResultsCallback) {
      this.onResultsCallback(processedHands);
    }
  }

  stop() {
    this.isRunning = false;
    this.lastHandsData = [];
    this.lastStrikeAt = [];
    if (this.camera && typeof this.camera.stop === 'function') {
      this.camera.stop();
    }
    if (this.videoElement && this.videoElement.srcObject) {
      const tracks = this.videoElement.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  }
}

if (typeof window !== 'undefined') {
  window.HandTracker = HandTracker;
}
