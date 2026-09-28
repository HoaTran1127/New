/**
 * games/math-blitz/game.js
 * Subway Math Blitz AR Game Logic
 * Tích hợp HandTracker, AudioManager, ParticleSystem và TopicRegistry
 */

const CARD_THEMES = [
  { name: 'Chuối Vàng', border: '#FFE600', bgGrad: ['#FFB703', '#FB8500'], stroke: '#451A03', tag: '🍌 BANANA', tagColor: '#FEF08A' },
  { name: 'Ván Trượt Xanh', border: '#00F0FF', bgGrad: ['#0284C7', '#0369A1'], stroke: '#082F49', tag: '🛹 HOVER', tagColor: '#BAE6FD' },
  { name: 'Tên Lửa Hồng', border: '#FF2E93', bgGrad: ['#DB2777', '#9D174D'], stroke: '#500724', tag: '🚀 JETPACK', tagColor: '#FBCFE8' },
  { name: 'Giày Nhún Lục', border: '#10B981', bgGrad: ['#059669', '#047857'], stroke: '#022C22', tag: '👟 SNEAKER', tagColor: '#A7F3D0' },
  { name: 'Hộp Quà Tím', border: '#D946EF', bgGrad: ['#9333EA', '#6B21A8'], stroke: '#3B0764', tag: '🎁 MYSTERY', tagColor: '#E9D5FF' }
];

class FallingCardTarget {
  constructor(canvasWidth, canvasHeight, equation, laneIndex, totalLanes, baseSpeed = 2.0) {
    this.equation = equation;
    this.theme = CARD_THEMES[Math.floor(Math.random() * CARD_THEMES.length)];

    // Kích thước thẻ co giãn theo màn hình
    this.width = Math.min(220, Math.max(140, canvasWidth / (totalLanes + 0.6)));
    this.height = Math.min(130, Math.max(90, this.width * 0.62));

    const laneWidth = canvasWidth / totalLanes;
    this.x = laneWidth * laneIndex + (laneWidth - this.width) / 2;
    this.y = -this.height - 10;

    this.vy = baseSpeed + (Math.random() * 0.5 - 0.25);
    this.isDead = false;
    this.hitConfirmed = false;

    // Hiệu ứng bồng bềnh
    this.wobble = Math.random() * Math.PI * 2;
  }

  update() {
    this.y += this.vy;
    this.wobble += 0.05;
    return this.y < window.innerHeight + 150;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(Math.sin(this.wobble) * 0.02);

    const hw = this.width / 2;
    const hh = this.height / 2;

    // Bóng đổ thẻ
    ctx.shadowBlur = 18;
    ctx.shadowColor = this.theme.border;

    // Khung thẻ bo góc (Round Rect)
    ctx.beginPath();
    ctx.roundRect(-hw, -hh, this.width, this.height, 16);
    const grad = ctx.createLinearGradient(0, -hh, 0, hh);
    grad.addColorStop(0, this.theme.bgGrad[0]);
    grad.addColorStop(1, this.theme.bgGrad[1]);
    ctx.fillStyle = grad;
    ctx.fill();

    // Viền phát sáng
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = this.theme.border;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Tag nhãn nhỏ trên đầu thẻ
    ctx.fillStyle = this.theme.tagColor;
    ctx.font = '900 10px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.theme.tag, 0, -hh + 18);

    // Chữ phép tính
    const textLen = this.equation.text.length;
    let fontSize = Math.floor(this.width / Math.max(7, textLen * 0.65));
    fontSize = Math.min(22, Math.max(13, fontSize));

    ctx.font = `800 ${fontSize}px "Fredoka", sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3.5;

    // Vẽ 2 dòng nếu có leftPart và rightPart
    if (this.equation.leftPart && this.equation.rightPart) {
      ctx.strokeText(this.equation.leftPart, 0, 5);
      ctx.fillText(this.equation.leftPart, 0, 5);

      ctx.strokeText(this.equation.rightPart, 0, 5 + fontSize + 2);
      ctx.fillText(this.equation.rightPart, 0, 5 + fontSize + 2);
    } else {
      ctx.strokeText(this.equation.text, 0, 10);
      ctx.fillText(this.equation.text, 0, 10);
    }

    ctx.restore();
  }

  isHit(x, y, radius = 40) {
    return (
      x >= this.x - radius &&
      x <= this.x + this.width + radius &&
      y >= this.y - radius &&
      y <= this.y + this.height + radius
    );
  }
}

const GameApp = {
  canvas: null,
  ctx: null,
  video: null,
  audio: null,
  tracker: null,
  crackedEffect: null,
  bladeTrail: null,

  state: 'START', // START, PLAYING, GAMEOVER
  selectedGrade: 'all',
  selectedTopicId: null,
  baseSpeed: 2.0,

  cards: [],
  particles: [],
  shockwaves: [],
  scoreTexts: [],

  score: 0,
  highScore: 0,
  lives: 5,
  maxLives: 5,
  combo: 0,
  correctCount: 0,
  wrongCount: 0,

  lastSpawnTime: 0,
  spawnInterval: 2400, // ms
  totalLanes: 3,

  playerHands: [],

  init() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.video = document.getElementById('webcam');

    this.audio = new AudioManager();
    this.crackedEffect = new CrackedScreenEffect(window.innerWidth, window.innerHeight);
    this.bladeTrail = new BladeTrail(16, '#00F0FF');

    this.highScore = parseInt(localStorage.getItem('math_blitz_highscore') || '0', 10);

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.setupUI();
    this.renderTopicList();

    // Hỗ trợ chuột và cảm ứng màn hình phòng khi không có webcam
    this.setupPointerFallback();

    // Vòng lặp Render chính
    requestAnimationFrame((t) => this.gameLoop(t));
  },

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.totalLanes = window.innerWidth < 640 ? 3 : 4;
    if (this.crackedEffect) {
      this.crackedEffect.resize(this.canvas.width, this.canvas.height);
    }
  },

  setupUI() {
    // Nút Bật Camera & Bắt đầu
    document.getElementById('btnStartGame').addEventListener('click', () => {
      this.startGame();
    });

    // Nút Âm thanh
    document.getElementById('btnMute').addEventListener('click', () => {
      const isMuted = this.audio.toggleMute();
      const icon = document.getElementById('audioIcon');
      icon.className = isMuted 
        ? "fa-solid fa-volume-xmark text-red-400 text-sm sm:text-base" 
        : "fa-solid fa-volume-high text-amber-300 text-sm sm:text-base";
    });

    // Nút Chơi Lại
    document.getElementById('btnPlayAgain').addEventListener('click', () => {
      document.getElementById('gameOverModal').classList.add('hidden');
      document.getElementById('gameOverModal').classList.remove('flex');
      this.resetRound();
      this.state = 'PLAYING';
    });

    // Nút Đổi Chủ Đề
    document.getElementById('btnChangeTopic').addEventListener('click', () => {
      document.getElementById('gameOverModal').classList.add('hidden');
      document.getElementById('gameOverModal').classList.remove('flex');
      this.openTopicModal();
    });

    // Tabs chọn khối lớp
    const gradeTabs = document.querySelectorAll('.grade-tab-btn');
    gradeTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        gradeTabs.forEach(b => {
          b.classList.remove('active', 'border-cyan-400', 'bg-cyan-500', 'text-slate-950', 'shadow-md');
          b.classList.add('border-slate-700', 'bg-slate-800', 'text-slate-300');
        });
        btn.classList.add('active', 'border-cyan-400', 'bg-cyan-500', 'text-slate-950', 'shadow-md');
        btn.classList.remove('border-slate-700', 'bg-slate-800', 'text-slate-300');

        const g = btn.dataset.grade;
        this.selectedGrade = (g === '4' || g === '5') ? parseInt(g, 10) : g;
        this.renderTopicList();
      });
    });

    // Buttons chọn tốc độ
    const speedBtns = document.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        speedBtns.forEach(b => {
          b.classList.remove('active', 'border-amber-400', 'bg-amber-500', 'text-slate-950', 'shadow-md');
          b.classList.add('border-slate-700', 'bg-slate-800', 'text-slate-300');
        });
        btn.classList.add('active', 'border-amber-400', 'bg-amber-500', 'text-slate-950', 'shadow-md');
        btn.classList.remove('border-slate-700', 'bg-slate-800', 'text-slate-300');
        this.baseSpeed = parseFloat(btn.dataset.speed);
      });
    });
  },

  renderTopicList() {
    const container = document.getElementById('topicListContainer');
    let topics = [];

    if (this.selectedGrade === 'all') {
      topics = TopicRegistry.getAllTopics();
    } else if (this.selectedGrade === 'cuuchuong') {
      topics = TopicRegistry.getAllTopics().filter(t => t.id.includes('cuu_chuong'));
    } else {
      topics = TopicRegistry.getTopicsByGrade(this.selectedGrade);
    }

    container.innerHTML = '';

    // Lựa chọn "Ngẫu nhiên toàn bộ chủ đề"
    const randomCard = document.createElement('div');
    randomCard.className = `topic-card p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${!this.selectedTopicId ? 'selected border-cyan-400 bg-cyan-500/15' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'}`;
    randomCard.innerHTML = `
      <div class="flex items-center gap-2.5 text-left">
        <span class="text-xl">🎲</span>
        <div>
          <div class="font-extrabold text-xs text-white">Ngẫu Nhiên Toàn Bộ</div>
          <div class="text-[11px] text-slate-400">Trộn tất cả các chủ đề trong khối lớp đã chọn</div>
        </div>
      </div>
      <span class="text-xs text-cyan-400 font-black"><i class="fa-solid fa-check"></i></span>
    `;
    randomCard.onclick = () => {
      this.selectedTopicId = null;
      this.renderTopicList();
      document.getElementById('topicNameText').innerText = 'Ngẫu Nhiên Tổng Hợp';
    };
    container.appendChild(randomCard);

    topics.forEach(t => {
      const isSel = this.selectedTopicId === t.id;
      const card = document.createElement('div');
      card.className = `topic-card p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${isSel ? 'selected border-cyan-400 bg-cyan-500/15' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'}`;
      card.innerHTML = `
        <div class="flex items-center gap-2.5 text-left">
          <span class="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase text-slate-950" style="background:${t.badgeColor || '#00F0FF'}">
            ${t.badge || 'TOÁN'}
          </span>
          <div>
            <div class="font-extrabold text-xs text-white">${t.title}</div>
            <div class="text-[11px] text-slate-400 truncate max-w-[280px]">${t.description}</div>
          </div>
        </div>
        ${isSel ? '<span class="text-xs text-cyan-400 font-black"><i class="fa-solid fa-check"></i></span>' : ''}
      `;
      card.onclick = () => {
        this.selectedTopicId = t.id;
        this.renderTopicList();
        document.getElementById('topicNameText').innerText = t.title;
      };
      container.appendChild(card);
    });
  },

  openTopicModal() {
    this.state = 'PAUSED';
    const modal = document.getElementById('startModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    this.renderTopicList();
  },

  async startGame() {
    await this.audio.init();

    // Ẩn modal bắt đầu
    const modal = document.getElementById('startModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');

    // Khởi tạo MediaPipe HandTracker
    if (!this.tracker) {
      this.tracker = new HandTracker({
        videoElement: this.video,
        maxNumHands: 1, // 1 tay duy nhất chống spam
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
        smoothingFactor: 0.45
      });

      this.tracker.init(
        () => {
          console.log("[GameApp] HandTracker đã sẵn sàng.");
        },
        (hands) => {
          this.playerHands = hands;
        },
        (err) => {
          console.warn("[GameApp] Không thể mở webcam, chuyển sang chế độ chuột/chạm:", err);
        }
      );
    }

    this.resetRound();
    this.state = 'PLAYING';
  },

  resetRound() {
    this.cards = [];
    this.particles = [];
    this.shockwaves = [];
    this.scoreTexts = [];
    this.score = 0;
    this.lives = this.maxLives;
    this.combo = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.lastSpawnTime = 0;
    this.updateHUD();
  },

  updateHUD() {
    document.getElementById('scoreDisplay').innerText = this.score;

    // Render trái tim máu
    const healthBar = document.getElementById('healthBar');
    healthBar.innerHTML = '';
    for (let i = 0; i < this.maxLives; i++) {
      if (i < this.lives) {
        healthBar.innerHTML += '<i class="fa-solid fa-heart"></i>';
      } else {
        healthBar.innerHTML += '<i class="fa-regular fa-heart opacity-30 text-slate-500"></i>';
      }
    }

    // Render combo
    const comboContainer = document.getElementById('comboContainer');
    const comboText = document.getElementById('comboText');
    if (this.combo > 1) {
      comboContainer.style.opacity = '1';
      comboText.innerText = `COMBO x${this.combo}!`;
    } else {
      comboContainer.style.opacity = '0';
    }
  },

  showWrongBanner(explanation) {
    const banner = document.getElementById('wrongWarningBanner');
    const textEl = document.getElementById('wrongReasonText');
    textEl.innerText = explanation;

    banner.classList.remove('opacity-0', '-translate-y-6', 'scale-95');
    banner.classList.add('opacity-100', 'translate-y-0', 'scale-100');

    clearTimeout(this._bannerTimer);
    this._bannerTimer = setTimeout(() => {
      banner.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
      banner.classList.add('opacity-0', '-translate-y-6', 'scale-95');
    }, 2800);
  },

  setupPointerFallback() {
    // Nếu học sinh click chuột hoặc chạm màn hình
    const handlePointer = (e) => {
      if (this.state !== 'PLAYING') return;
      const rect = this.canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      this.strikeAt(px, py);
    };

    this.canvas.addEventListener('mousedown', handlePointer);
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        handlePointer(e.touches[0]);
      }
    }, { passive: true });
  },

  spawnCard() {
    const now = performance.now();
    if (now - this.lastSpawnTime < this.spawnInterval) return;

    this.lastSpawnTime = now;
    const laneIndex = Math.floor(Math.random() * this.totalLanes);

    const equation = TopicRegistry.generateEquation(this.selectedTopicId);
    const card = new FallingCardTarget(
      this.canvas.width,
      this.canvas.height,
      equation,
      laneIndex,
      this.totalLanes,
      this.baseSpeed
    );

    this.cards.push(card);
  },

  strikeAt(x, y) {
    this.audio.playSlash();
    this.shockwaves.push(new Shockwave(x, y, '#FFE600'));

    // Kiểm tra va chạm với các thẻ
    for (let i = this.cards.length - 1; i >= 0; i--) {
      const card = this.cards[i];
      if (card.isHit(x, y, 45)) {
        this.processHit(card, x, y);
        this.cards.splice(i, 1);
        break;
      }
    }
  },

  processHit(card, x, y) {
    if (card.equation.isCorrect) {
      // ĐẤM ĐÚNG!
      this.correctCount++;
      this.combo++;
      const gain = 10 * Math.min(5, this.combo);
      this.score += gain;

      this.audio.playCorrect(this.combo);

      // Hiệu ứng hạt nổ rực rỡ
      for (let p = 0; p < 24; p++) {
        this.particles.push(new Particle(x, y, card.theme.border));
      }
      this.scoreTexts.push(new FloatingScoreText(x, y - 20, `+${gain}`, '#FFE600', this.combo > 2));

      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('math_blitz_highscore', String(this.highScore));
      }
    } else {
      // ĐẤM VÀO THẺ SAI! PHẠT NỨT MÀN HÌNH & TRỪ MÁU
      this.wrongCount++;
      this.combo = 0;
      this.lives--;

      this.audio.playGlassBreak();
      this.crackedEffect.trigger(x, y);
      this.showWrongBanner(card.equation.explanation);

      // Rung màn hình
      document.body.classList.add('shake-active');
      setTimeout(() => document.body.classList.remove('shake-active'), 250);

      if (this.lives <= 0) {
        this.triggerGameOver();
      }
    }

    this.updateHUD();
  },

  triggerGameOver() {
    this.state = 'GAMEOVER';
    const modal = document.getElementById('gameOverModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    document.getElementById('finalScore').innerText = this.score;
    document.getElementById('highScore').innerText = this.highScore;
    document.getElementById('finalCorrect').innerText = this.correctCount;
    document.getElementById('finalWrong').innerText = this.wrongCount;
  },

  gameLoop(timestamp) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'PLAYING') {
      this.spawnCard();

      // Cập nhật thẻ rơi
      for (let i = this.cards.length - 1; i >= 0; i--) {
        const card = this.cards[i];
        const alive = card.update();
        if (!alive) {
          // Thẻ rơi khỏi đáy màn hình
          if (card.equation.isCorrect) {
            // Bỏ lỡ thẻ đúng: reset combo
            this.combo = 0;
            this.updateHUD();
          }
          this.cards.splice(i, 1);
        } else {
          card.draw(this.ctx);
        }
      }

      // Xử lý tay từ HandTracker
      if (this.playerHands.length > 0) {
        const h = this.playerHands[0];
        const hx = h.x * this.canvas.width;
        const hy = h.y * this.canvas.height;

        this.bladeTrail.addPoint(hx, hy);
        this.bladeTrail.draw(this.ctx);

        // Vẽ con trỏ đấm bốc / tâm ngắm phát sáng
        this.drawPunchCrosshair(hx, hy, h.isStriking, h.isFist);

        // Kiểm tra va chạm tay với thẻ
        for (let i = this.cards.length - 1; i >= 0; i--) {
          const card = this.cards[i];
          if (card.isHit(hx, hy, 40)) {
            this.processHit(card, hx, hy);
            this.cards.splice(i, 1);
            break;
          }
        }
      }

      // Cập nhật hiệu ứng hạt & chữ bay
      for (let i = this.particles.length - 1; i >= 0; i--) {
        if (!this.particles[i].update()) {
          this.particles.splice(i, 1);
        } else {
          this.particles[i].draw(this.ctx);
        }
      }

      for (let i = this.shockwaves.length - 1; i >= 0; i--) {
        if (!this.shockwaves[i].update()) {
          this.shockwaves.splice(i, 1);
        } else {
          this.shockwaves[i].draw(this.ctx);
        }
      }

      for (let i = this.scoreTexts.length - 1; i >= 0; i--) {
        if (!this.scoreTexts[i].update()) {
          this.scoreTexts.splice(i, 1);
        } else {
          this.scoreTexts[i].draw(this.ctx);
        }
      }

      // Hiệu ứng kính vỡ
      this.crackedEffect.update();
      this.crackedEffect.draw(this.ctx);
    }

    requestAnimationFrame((t) => this.gameLoop(t));
  },

  drawPunchCrosshair(x, y, isStriking, isFist) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);

    const radius = isStriking ? 34 : 26;
    const ringColor = isStriking ? '#FF007A' : '#00F0FF';

    // Vòng tròn phát sáng
    ctx.shadowBlur = isStriking ? 20 : 12;
    ctx.shadowColor = ringColor;
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Icon nắm đấm 🥊 hoặc tâm ngắm
    ctx.font = '20px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🥊', 0, 1);

    ctx.restore();
  }
};

window.GameApp = GameApp;

window.addEventListener('DOMContentLoaded', () => {
  GameApp.init();
});
