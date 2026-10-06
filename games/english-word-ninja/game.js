/**
 * games/english-word-ninja/game.js
 * Game AR Vận Động Chém Từ Vựng Tiếng Anh
 */

const VOCAB_BANK = {
  ANIMALS: {
    name: 'Động Vật (Animals) 🦁',
    correct: [
      { en: 'TIGER', vi: 'Con hổ 🐯' },
      { en: 'ELEPHANT', vi: 'Con voi 🐘' },
      { en: 'MONKEY', vi: 'Con khỉ 🐒' },
      { en: 'DOLPHIN', vi: 'Cá heo 🐬' },
      { en: 'PENGUIN', vi: 'Chim cánh cụt 🐧' },
      { en: 'ZEBRA', vi: 'Ngựa vằn 🦓' },
      { en: 'RABBIT', vi: 'Con thỏ 🐰' }
    ],
    traps: [
      { en: 'APPLE', vi: 'Quả táo (Trái cây 🍎)' },
      { en: 'PENCIL', vi: 'Bút chì (Đồ dùng học tập ✏️)' },
      { en: 'DOCTOR', vi: 'Bác sĩ (Nghề nghiệp 👨‍⚕️)' },
      { en: 'PIZZA', vi: 'Bánh pizza (Thức ăn 🍕)' },
      { en: 'RULER', vi: 'Thước kẻ (Đồ dùng 📏)' }
    ]
  },
  FRUITS: {
    name: 'Trái Cây (Fruits) 🍎',
    correct: [
      { en: 'APPLE', vi: 'Quả táo 🍎' },
      { en: 'BANANA', vi: 'Quả chuối 🍌' },
      { en: 'ORANGE', vi: 'Quả cam 🍊' },
      { en: 'MANGO', vi: 'Quả xoài 🥭' },
      { en: 'GRAPE', vi: 'Quả nho 🍇' },
      { en: 'WATERMELON', vi: 'Dưa hấu 🍉' }
    ],
    traps: [
      { en: 'TIGER', vi: 'Con hổ (Động vật 🐯)' },
      { en: 'ERASER', vi: 'Cục tẩy (Đồ dùng ✏️)' },
      { en: 'PILOT', vi: 'Phi công (Nghề nghiệp 👨‍✈️)' },
      { en: 'MONKEY', vi: 'Con khỉ (Động vật 🐒)' }
    ]
  },
  SCHOOL: {
    name: 'Đồ Dùng Học Tập 📚',
    correct: [
      { en: 'PENCIL', vi: 'Bút chì ✏️' },
      { en: 'NOTEBOOK', vi: 'Vở ghi 📓' },
      { en: 'RULER', vi: 'Thước kẻ 📏' },
      { en: 'BACKPACK', vi: 'Cặp sách 🎒' },
      { en: 'ERASER', vi: 'Cục tẩy 🧹' }
    ],
    traps: [
      { en: 'ELEPHANT', vi: 'Con voi (Động vật 🐘)' },
      { en: 'BANANA', vi: 'Quả chuối (Trái cây 🍌)' },
      { en: 'FARMER', vi: 'Nông dân (Nghề nghiệp 🧑‍🌾)' }
    ]
  }
};

class WordCard {
  constructor(canvasWidth, item, isCorrect, categoryName) {
    this.item = item;
    this.isCorrect = isCorrect;
    this.categoryName = categoryName;

    this.width = Math.min(220, Math.max(150, canvasWidth / 3.8));
    this.height = 95;
    this.x = Math.random() * (canvasWidth - this.width - 40) + 20;
    this.y = -this.height - 10;
    this.vy = Math.random() * 0.8 + 2.0;

    this.color = isCorrect ? '#00F0FF' : '#FF2E93';
    this.bgGrad = isCorrect ? ['#0284C7', '#0369A1'] : ['#DB2777', '#9D174D'];
    this.wobble = Math.random() * Math.PI * 2;
  }

  update() {
    this.y += this.vy;
    this.wobble += 0.05;
    return this.y < window.innerHeight + 120;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(Math.sin(this.wobble) * 0.02);

    const hw = this.width / 2;
    const hh = this.height / 2;

    ctx.shadowBlur = 16;
    ctx.shadowColor = this.color;

    ctx.beginPath();
    ctx.roundRect(-hw, -hh, this.width, this.height, 16);
    const grad = ctx.createLinearGradient(0, -hh, 0, hh);
    grad.addColorStop(0, this.bgGrad[0]);
    grad.addColorStop(1, this.bgGrad[1]);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 18px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.item.en, 0, -8);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '600 12px "Fredoka", sans-serif';
    ctx.fillText(this.item.vi, 0, 16);

    ctx.restore();
  }

  isHit(x, y) {
    return (
      x >= this.x - 30 &&
      x <= this.x + this.width + 30 &&
      y >= this.y - 30 &&
      y <= this.y + this.height + 30
    );
  }
}

const EnglishApp = {
  canvas: null,
  ctx: null,
  video: null,
  audio: null,
  tracker: null,
  bladeTrail: null,
  crackedEffect: null,

  score: 0,
  lives: 5,
  cards: [],
  particles: [],
  currentTopicKey: 'ANIMALS',
  lastSpawn: 0,

  init() {
    this.canvas = document.getElementById('englishCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.video = document.getElementById('englishWebcam');
    this.audio = new AudioManager();
    this.bladeTrail = new BladeTrail(16, '#00F0FF');
    this.crackedEffect = new CrackedScreenEffect(window.innerWidth, window.innerHeight);

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Chuột
    this.canvas.addEventListener('mousemove', (e) => {
      this.strikeAt(e.clientX, e.clientY);
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
    else this.note('Chơi bằng chuột: vung con trỏ qua thẻ từ để chém.', 'ok');
  },

  note(msg, kind) {
    document.getElementById('cameraBar').classList.remove('hidden');
    const el = document.getElementById('cameraNote');
    el.textContent = msg;
    el.className = 'text-xs leading-relaxed ' +
      (kind === 'error' ? 'text-red-300' : kind === 'ok' ? 'text-emerald-300' : 'text-amber-200');
    document.getElementById('btnCamRetry').classList.toggle('hidden', kind !== 'error');
  },

  async startCamera() {
    await this.audio.init();
    this.note('Đang mở camera, em đưa tay vào khung hình nhé…', 'wait');
    if (this.tracker) this.tracker.stop();
    this.tracker = new HandTracker({
      videoElement: this.video,
      maxNumHands: 1,
      smoothingFactor: 0.45
    });

    this.tracker.init(
      () => this.note('Camera đã bật — vung tay chém từ theo nhiệm vụ.', 'ok'),
      (hands) => {
        if (hands.length > 0) {
          const h = hands[0];
          const px = h.x * this.canvas.width;
          const py = h.y * this.canvas.height;
          this.strikeAt(px, py);
        }
      },
      (err) => {
        this.note('Không bật được camera: ' + (err && err.message ? err.message : 'trình duyệt từ chối quyền') +
          '. Chuột vẫn chém được, em cứ chơi tiếp.', 'error');
      }
    );
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (this.crackedEffect) this.crackedEffect.resize(this.canvas.width, this.canvas.height);
  },

  spawnCard() {
    const now = performance.now();
    if (now - this.lastSpawn < 2000) return;
    this.lastSpawn = now;

    const topic = VOCAB_BANK[this.currentTopicKey];
    const isCorrect = Math.random() < 0.65;
    const pool = isCorrect ? topic.correct : topic.traps;
    const item = pool[Math.floor(Math.random() * pool.length)];

    this.cards.push(new WordCard(this.canvas.width, item, isCorrect, topic.name));
  },

  strikeAt(x, y) {
    this.bladeTrail.addPoint(x, y);

    for (let i = this.cards.length - 1; i >= 0; i--) {
      const card = this.cards[i];
      if (card.isHit(x, y)) {
        if (card.isCorrect) {
          this.score += 10;
          this.audio.playCorrect();
          for (let p = 0; p < 20; p++) {
            this.particles.push(new Particle(x, y, card.color));
          }
        } else {
          this.lives--;
          this.audio.playGlassBreak();
          this.crackedEffect.trigger(x, y);
          this.showWarning(card.item.en + " là " + card.item.vi + ", không thuộc chủ đề này!");
        }
        document.getElementById('englishScore').innerText = this.score;
        this.updateHearts();
        this.cards.splice(i, 1);
        break;
      }
    }
  },

  showWarning(msg) {
    const banner = document.getElementById('wrongWordBanner');
    const txt = document.getElementById('wrongWordExplanation');
    txt.innerText = msg;
    banner.classList.remove('opacity-0', '-translate-y-6', 'scale-95');
    banner.classList.add('opacity-100', 'translate-y-0', 'scale-100');
    setTimeout(() => {
      banner.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
      banner.classList.add('opacity-0', '-translate-y-6', 'scale-95');
    }, 2800);
  },

  loop(timestamp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.spawnCard();

    this.bladeTrail.draw(this.ctx);

    for (let i = this.cards.length - 1; i >= 0; i--) {
      const c = this.cards[i];
      if (!c.update()) {
        this.cards.splice(i, 1);
      } else {
        c.draw(this.ctx);
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (!this.particles[i].update()) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].draw(this.ctx);
      }
    }

    this.crackedEffect.update();
    this.crackedEffect.draw(this.ctx);

    requestAnimationFrame((t) => this.loop(t));
  },

  updateHearts() {
    const el = document.getElementById('englishHealth');
    el.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      if (i < this.lives) {
        el.innerHTML += '<i class="fa-solid fa-heart"></i>';
      } else {
        el.innerHTML += '<i class="fa-regular fa-heart opacity-30 text-slate-500"></i>';
      }
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  EnglishApp.init();
});
