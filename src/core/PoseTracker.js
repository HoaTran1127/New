/**
 * PoseTracker.js
 * MediaPipe Pose wrapper. Chỉ xử lý landmark tại máy người chơi.
 */
class PoseTracker {
  constructor(options = {}) {
    this.videoElement = options.videoElement || null;
    this.minDetectionConfidence = options.minDetectionConfidence || 0.6;
    this.minTrackingConfidence = options.minTrackingConfidence || 0.6;
    this.pose = null;
    this.camera = null;
    this.isRunning = false;
    this.onReadyCallback = null;
    this.onResultsCallback = null;
    this.onErrorCallback = null;
  }

  async init(onReady, onResults, onError) {
    this.onReadyCallback = onReady;
    this.onResultsCallback = onResults;
    this.onErrorCallback = onError;
    if (typeof Pose === 'undefined') {
      const err = new Error('MediaPipe Pose chưa được nạp.');
      this.onErrorCallback?.(err);
      return;
    }
    try {
      this.pose = new Pose({ locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
      this.pose.setOptions({
        modelComplexity: 0,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: this.minDetectionConfidence,
        minTrackingConfidence: this.minTrackingConfidence
      });
      this.pose.onResults(results => {
        const landmarks = results.poseLandmarks || [];
        this.onResultsCallback?.({
          landmarks,
          confidence: landmarks.length ? Math.min(...landmarks.map(p => p.visibility ?? 1)) : 0,
          timestamp: performance.now()
        });
      });

      if (!this.videoElement) {
        this.videoElement = document.createElement('video');
        this.videoElement.setAttribute('playsinline', '');
        this.videoElement.style.display = 'none';
        document.body.appendChild(this.videoElement);
      }

      // Nếu HandTracker đã mở webcam, dùng chung stream/video thay vì xin quyền lần hai.
      if (this.videoElement.srcObject) {
        if (this.videoElement.readyState < 2) await this.videoElement.play();
        this.isRunning = true;
        this._startVideoLoop();
      } else if (typeof Camera !== 'undefined') {
        this.camera = new Camera(this.videoElement, {
          onFrame: async () => {
            if (this.isRunning && this.videoElement.readyState >= 2) await this.pose.send({ image: this.videoElement });
          },
          width: 640,
          height: 480
        });
        await this.camera.start();
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } });
        this.videoElement.srcObject = stream;
        await this.videoElement.play();
        this._startVideoLoop();
      }
      this.isRunning = true;
      this.onReadyCallback?.();
    } catch (err) {
      console.error('[PoseTracker] init failed', err);
      this.onErrorCallback?.(err);
    }
  }

  _startVideoLoop() {
    const loop = async () => {
      if (!this.isRunning) return;
      if (this.videoElement.readyState >= 2) await this.pose.send({ image: this.videoElement });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
    this.camera?.stop?.();
    const stream = this.videoElement?.srcObject;
    stream?.getTracks?.().forEach(track => track.stop());
  }
}
if (typeof window !== 'undefined') window.PoseTracker = PoseTracker;
