/**
 * games/math-bubble/game.js
 * Math Ninja Bubble Pop AR Game Logic
 */

class MathBubble {
  constructor(canvasWidth, canvasHeight, equation) {
    this.equation = equation;
    this.radius = 48;
    this.x = Math.random() * (canvasWidth - 140) + 70;
    this.y = canvasHeight + 60;
    // Bắn từ dưới lên với vận tốc âm
    this.vy = -(Math.random() * 2.5 + 4.0);
    this.vx = (Math.random() - 0.5) * 1.5;
    this.gravity = 0.045; // Bay chậm dần lên trên đỉnh rồi rơi nhẹ
    this.wobble = Math.random() * Math.PI * 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.wobble += 0.06;
    return this.y < window.innerHeight + 120;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    const r = this.radius + Math.sin(this.wobble) * 2;

    // Bong bóng trong suốt phát sáng viền neon
    const grad = ctx.createRadialGradient(-10, -10, 5, 0, 0, r);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.4, 'rgba(236, 72, 153, 0.4)');
    grad.addColorStop(1, 'rgba(168, 85, 247, 0.2)');

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.shadowBlur = 16;
    ctx.shadowColor = '#EC4899';
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Điểm bóng sáng trên bề mặt bóng
    ctx.beginPath();
    ctx.arc(-r * 0.35, -r * 0.35, r * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fill();

    // Chữ phép tính
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 13px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const parts = this.equation.text.split('=');
    if (parts.length === 2) {
      ctx.fillText(parts[0].trim(), 0, -8);
      ctx.fillText(`= ${parts[1].trim()}`, 0, 10);
    } else {
      ctx.fillText(this.equation.text, 0, 0);
    }

    ctx.restore();
  }

  isHit(x, y) {
    return Math.hypot(this.x - x, this.y - y) <= this.radius + 15;
  }
}

const BubbleApp = {
  canvas: null,
  ctx: null,
  video: null,
  audio: null,
  tracker: null,
  bladeTrail: null,

  score: 0,
  lives: 3,
  bubbles: [],
  particles: [],
  lastSpawn: 0,

  init() {
    this.canvas = document.getElementById('bubbleCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.video = document.getElementById('bubbleWebcam');
    this.audio = new AudioManager();
    this.bladeTrail = new BladeTrail(18, '#EC4899');

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Di chuột chém bóng
    this.canvas.addEventListener('mousemove', (e) => {
      this.checkSlash(e.clientX, e.clientY);
    });

    document.getElementById('btnStart').addEventListener('click', () => this.begin(true));
    document.getElementById('btnMouseOnly').addEventListener('click', () => this.begin(false));
    document.getElementById('btnCamRetry').addEventListener('click', () => this.startCamera());
  },

  begin(useCamera) {
    document.getElementById('startOverlay').classList.add('hidden');
    if (!this.running) {
      this.running = true;
      requestAnimationFrame((t) => this.loop(t));
    }
    if (useCamera) this.startCamera();
    else this.note('Chơi bằng chuột: vung con trỏ qua bóng để chém.', 'ok');
  },

  note(msg, kind) {
    document.getElementById('cameraBar').classList.remove('hidden');
    const el = document.getElementById('cameraNote');
    el.textContent = msg;
    el.className = 'text-xs leading-relaxed ' +
      (kind === 'error' ? 'text-red-300' : kind === 'ok' ? 'text-emerald-300' : 'text-amber-200');
    document.getElementById('btnCamRetry').classList.toggle('hidden', kind !== 'error');
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  async startCamera() {
    await this.audio.init();
    this.note('Đang mở camera, em đưa tay vào khung hình nhé…', 'wait');
    if (this.tracker) this.tracker.stop();
    this.tracker = new HandTracker({
      videoElement: this.video,
      maxNumHands: 1,
      smoothingFactor: 0.4
    });

    this.tracker.init(
      () => this.note('Camera đã bật — vung tay chém bóng đúng.', 'ok'),
      (hands) => {
        if (hands.length > 0) {
          const h = hands[0];
          const px = h.x * this.canvas.width;
          const py = h.y * this.canvas.height;
          this.checkSlash(px, py);
        }
      },
      (err) => {
        this.note('Không bật được camera: ' + (err && err.message ? err.message : 'trình duyệt từ chối quyền') +
          '. Chuột vẫn chém được, em cứ chơi tiếp.', 'error');
      }
    );
  },

  checkSlash(x, y) {
    this.bladeTrail.addPoint(x, y);

    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      if (b.isHit(x, y)) {
        if (b.equation.isCorrect) {
          this.score += 10;
          this.audio.playPop();
          for (let p = 0; p < 20; p++) {
            this.particles.push(new Particle(b.x, b.y, '#EC4899'));
          }
        } else {
          this.lives--;
          this.audio.playGlassBreak();
          for (let p = 0; p < 25; p++) {
            this.particles.push(new Particle(b.x, b.y, '#EF4444'));
          }
        }
        document.getElementById('bubbleScore').innerText = this.score;
        this.updateHearts();
        this.bubbles.splice(i, 1);
        break;
      }
    }
  },

  spawnBubble() {
    const now = performance.now();
    if (now - this.lastSpawn < 1800) return;
    this.lastSpawn = now;

    const eq = TopicRegistry.generateEquation();
    this.bubbles.push(new MathBubble(this.canvas.width, this.canvas.height, eq));
  },

  loop(timestamp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.spawnBubble();

    // Vẽ vết kiếm
    this.bladeTrail.draw(this.ctx);

    // Cập nhật bóng
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      if (!b.update()) {
        this.bubbles.splice(i, 1);
      } else {
        b.draw(this.ctx);
      }
    }

    // Cập nhật hạt
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (!this.particles[i].update()) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].draw(this.ctx);
      }
    }

    requestAnimationFrame((t) => this.loop(t));
  },

  updateHearts() {
    const el = document.getElementById('bubbleHealth');
    el.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      if (i < this.lives) {
        el.innerHTML += '<i class="fa-solid fa-heart"></i>';
      } else {
        el.innerHTML += '<i class="fa-regular fa-heart opacity-30 text-slate-500"></i>';
      }
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  BubbleApp.init();
});
