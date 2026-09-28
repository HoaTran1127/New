/**
 * ParticleSystem.js
 * Quản lý các hiệu ứng đồ họa 2D Canvas cho game:
 * - Hạt nổ rực rỡ (Particles)
 * - Vết chém ánh sáng (Blade/Laser Trails)
 * - Sóng xung kích (Shockwaves)
 * - Kính nứt mạng nhện khi trả lời sai (Cracked Screen)
 * - Chữ bay điểm số & combo (Floating Texts)
 */

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.size = Math.random() * 7 + 4;
    this.alpha = 1;
    this.decay = Math.random() * 0.03 + 0.02;
    this.gravity = 0.28;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= this.decay;
    this.rotation += this.rotSpeed;
    return this.alpha > 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

class Shockwave {
  constructor(x, y, color = '#FFE600') {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.maxRadius = 90;
    this.color = color;
    this.alpha = 0.9;
    this.lineWidth = 6;
  }

  update() {
    this.radius += 5.5;
    this.alpha -= 0.045;
    this.lineWidth = Math.max(1, this.lineWidth * 0.94);
    return this.alpha > 0 && this.radius < this.maxRadius;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

class FloatingScoreText {
  constructor(x, y, text, color = '#FFE600', isBig = false) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.isBig = isBig;
    this.vy = -3.5;
    this.alpha = 1;
    this.scale = isBig ? 1.4 : 1.0;
  }

  update() {
    this.y += this.vy;
    this.vy *= 0.94;
    this.alpha -= 0.022;
    return this.alpha > 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.font = `900 ${this.isBig ? 32 : 24}px "Outfit", sans-serif`;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.textAlign = 'center';
    ctx.strokeText(this.text, this.x, this.y);
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

class CrackedScreenEffect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cracks = [];
    this.alpha = 0;
    this.flashRed = 0;
  }

  resize(w, h) {
    this.width = w;
    this.height = h;
  }

  trigger(centerX, centerY) {
    this.alpha = 1.0;
    this.flashRed = 0.55;

    // Sinh 12 đến 18 tia rạn nứt mạng nhện từ tâm va chạm
    const rays = [];
    const count = Math.floor(Math.random() * 6) + 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const rayLen = Math.random() * 260 + 120;
      const segments = [];
      let cx = centerX;
      let cy = centerY;
      const segCount = 4;
      for (let s = 0; s < segCount; s++) {
        const segDist = (rayLen / segCount) * (s + 1);
        const curAngle = angle + (Math.random() - 0.5) * 0.4;
        const nx = centerX + Math.cos(curAngle) * segDist;
        const ny = centerY + Math.sin(curAngle) * segDist;
        segments.push({ x1: cx, y1: cy, x2: nx, y2: ny });
        cx = nx;
        cy = ny;
      }
      rays.push(segments);
    }
    this.cracks = rays;
  }

  update() {
    if (this.flashRed > 0) this.flashRed -= 0.04;
    if (this.alpha > 0) this.alpha -= 0.015; // Giảm dần sau khoảng 1-2s
  }

  draw(ctx) {
    if (this.flashRed > 0) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.flashRed);
      ctx.fillStyle = '#DC2626';
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.restore();
    }

    if (this.alpha > 0 && this.cracks.length > 0) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00F0FF';

      for (const ray of this.cracks) {
        for (const seg of ray) {
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  }
}

class BladeTrail {
  constructor(maxPoints = 16, color = '#00F0FF') {
    this.points = [];
    this.maxPoints = maxPoints;
    this.color = color;
  }

  addPoint(x, y) {
    this.points.unshift({ x, y, time: Date.now() });
    if (this.points.length > this.maxPoints) {
      this.points.pop();
    }
  }

  draw(ctx) {
    if (this.points.length < 2) return;
    ctx.save();
    for (let i = 0; i < this.points.length - 1; i++) {
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const ratio = 1 - (i / this.points.length);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = ratio * 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = ratio * 0.75;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    ctx.restore();
  }
}

if (typeof window !== 'undefined') {
  window.Particle = Particle;
  window.Shockwave = Shockwave;
  window.FloatingScoreText = FloatingScoreText;
  window.CrackedScreenEffect = CrackedScreenEffect;
  window.BladeTrail = BladeTrail;
}
