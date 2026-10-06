/**
 * games/math-catcher/game.js
 * Mini-game AR Hứng Quả Toán Học
 * Chứng minh khả năng tái sử dụng HandTracker và TopicRegistry
 */

class MathApple {
  constructor(canvasWidth, equation) {
    this.equation = equation;
    this.radius = 42;
    this.x = Math.random() * (canvasWidth - 120) + 60;
    this.y = -60;
    this.vy = Math.random() * 1.5 + 2.0;
    this.color = equation.isCorrect ? '#10B981' : '#EF4444';
  }

  update() {
    this.y += this.vy;
    return this.y < window.innerHeight + 100;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Hình quả táo / bóng tròn
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fill();

    // Viền trắng
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

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
}

const CatcherApp = {
  canvas: null,
  ctx: null,
  video: null,
  audio: null,
  tracker: null,

  score: 0,
  lives: 3,
  apples: [],
  particles: [],
  basketX: window.innerWidth / 2,
  basketY: window.innerHeight - 90,
  basketWidth: 120,
  basketHeight: 40,
  lastSpawn: 0,

  init() {
    this.canvas = document.getElementById('catcherCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.video = document.getElementById('catcherWebcam');
    this.audio = new AudioManager();

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Chuột / Chạm
    window.addEventListener('mousemove', (e) => {
      this.basketX = e.clientX;
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
    else this.note('Chơi bằng chuột: đưa con trỏ ngang để di chuyển giỏ.', 'ok');
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
    this.basketY = window.innerHeight - 90;
  },

  async startCamera() {
    await this.audio.init();
    this.note('Đang mở camera, em đưa tay vào khung hình nhé…', 'wait');
    if (this.tracker) this.tracker.stop();
    this.tracker = new HandTracker({
      videoElement: this.video,
      maxNumHands: 1,
      smoothingFactor: 0.5
    });

    this.tracker.init(
      () => this.note('Camera đã bật — đưa tay ngang để di chuyển giỏ.', 'ok'),
      (hands) => {
        if (hands.length > 0) {
          this.basketX = hands[0].x * this.canvas.width;
        }
      },
      (err) => {
        this.note('Không bật được camera: ' + (err && err.message ? err.message : 'trình duyệt từ chối quyền') +
          '. Chuột vẫn điều khiển được giỏ, em cứ chơi tiếp.', 'error');
      }
    );
  },

  spawnApple() {
    const now = performance.now();
    if (now - this.lastSpawn < 2200) return;
    this.lastSpawn = now;

    const eq = TopicRegistry.generateEquation();
    this.apples.push(new MathApple(this.canvas.width, eq));
  },

  loop(timestamp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.spawnApple();

    // Vẽ giỏ hứng 🧺
    this.drawBasket();

    // Cập nhật và kiểm tra va chạm
    for (let i = this.apples.length - 1; i >= 0; i--) {
      const apple = this.apples[i];
      const alive = apple.update();

      // Kiểm tra va chạm với giỏ
      if (
        apple.y + apple.radius >= this.basketY &&
        apple.y - apple.radius <= this.basketY + this.basketHeight &&
        apple.x >= this.basketX - this.basketWidth / 2 &&
        apple.x <= this.basketX + this.basketWidth / 2
      ) {
        // Đã hứng được quả
        if (apple.equation.isCorrect) {
          this.score += 10;
          this.audio.playPop();
          for (let p = 0; p < 16; p++) {
            this.particles.push(new Particle(apple.x, apple.y, '#10B981'));
          }
        } else {
          this.lives--;
          this.audio.playGlassBreak();
          for (let p = 0; p < 20; p++) {
            this.particles.push(new Particle(apple.x, apple.y, '#EF4444'));
          }
        }
        document.getElementById('catcherScore').innerText = this.score;
        this.updateHearts();
        this.apples.splice(i, 1);
        continue;
      }

      if (!alive) {
        this.apples.splice(i, 1);
      } else {
        apple.draw(this.ctx);
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

  drawBasket() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.basketX, this.basketY);

    // Vẽ giỏ gỗ bo tròn phát sáng
    ctx.fillStyle = '#F59E0B';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#F59E0B';
    ctx.beginPath();
    ctx.roundRect(-this.basketWidth / 2, 0, this.basketWidth, this.basketHeight, [0, 0, 20, 20]);
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = '22px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🧺 GIỎ HỨNG', 0, 26);

    ctx.restore();
  },

  updateHearts() {
    const el = document.getElementById('catcherHealth');
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
  CatcherApp.init();
});
