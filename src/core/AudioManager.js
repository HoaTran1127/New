/**
 * AudioManager.js
 * Quản lý toàn bộ hiệu ứng âm thanh Arcade tổng hợp qua Tone.js
 * Không cần tải bất kỳ file mp3 ngoài nào - hoạt động offline 100%
 */

class AudioManager {
  constructor() {
    this.isMuted = false;
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;
    try {
      if (typeof Tone !== 'undefined') {
        await Tone.start();

        // 1. Âm thanh Chém / Đấm vung gió (Whoosh)
        this.slashSynth = new Tone.NoiseSynth({
          noise: { type: 'pink' },
          envelope: { attack: 0.005, decay: 0.09, sustain: 0 }
        }).toDestination();
        this.slashSynth.volume.value = -6;

        // 2. Âm thanh Trả lời Đúng / Nhặt đồng xu vàng (PolySynth tươi vui)
        this.coinSynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' },
          envelope: { attack: 0.005, decay: 0.2, sustain: 0.05, release: 0.25 }
        }).toDestination();
        this.coinSynth.volume.value = 0;

        // 3. Âm thanh Kính Vỡ / Bị Phạt (Noise + Clink tần số cao)
        this.glassNoise = new Tone.NoiseSynth({
          noise: { type: 'white' },
          envelope: { attack: 0.001, decay: 0.4, sustain: 0 }
        }).toDestination();
        this.glassNoise.volume.value = 3;

        this.glassChink = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' },
          envelope: { attack: 0.001, decay: 0.35, sustain: 0, release: 0.25 }
        }).toDestination();
        this.glassChink.volume.value = 1;

        // 4. Âm thanh Trượt / Hụt thẻ (Sawtooth đục)
        this.missSynth = new Tone.Synth({
          oscillator: { type: 'sawtooth' },
          envelope: { attack: 0.02, decay: 0.18, sustain: 0, release: 0.1 }
        }).toDestination();
        this.missSynth.volume.value = -6;

        // 5. Âm thanh Nổ Bong bóng / Pop (Cho mini-game hứng bóng)
        this.popSynth = new Tone.MembraneSynth({
          pitchDecay: 0.05,
          octaves: 4,
          envelope: { attack: 0.001, decay: 0.15, sustain: 0 }
        }).toDestination();
        this.popSynth.volume.value = -2;

        // 6. Âm thanh Thăng cấp / Combo khủng
        this.levelUpSynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' },
          envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.4 }
        }).toDestination();
        this.levelUpSynth.volume.value = 2;

        this.isInitialized = true;
      }
    } catch (e) {
      console.warn("Audio Context chưa thể khởi động trước tương tác người dùng:", e);
    }
  }

  playSlash() {
    if (this.isMuted || !this.isInitialized) return;
    try { this.slashSynth.triggerAttackRelease("0.07"); } catch (e) {}
  }

  playCorrect(combo = 1) {
    if (this.isMuted || !this.isInitialized) return;
    try {
      const notes = combo > 4 
        ? ["C5", "E5", "G5", "C6"] 
        : (combo > 2 ? ["E5", "G#5", "B5"] : ["D5", "G5"]);
      this.coinSynth.triggerAttackRelease(notes, "0.18");
    } catch (e) {}
  }

  playGlassBreak() {
    if (this.isMuted || !this.isInitialized) return;
    try {
      this.glassNoise.triggerAttackRelease("0.35");
      this.glassChink.triggerAttackRelease(["C7", "F#7", "B7"], "0.3");
    } catch (e) {}
  }

  playMiss() {
    if (this.isMuted || !this.isInitialized) return;
    try { this.missSynth.triggerAttackRelease("D3", "0.15"); } catch (e) {}
  }

  playPop() {
    if (this.isMuted || !this.isInitialized) return;
    try { this.popSynth.triggerAttackRelease("G4", "0.1"); } catch (e) {}
  }

  playLevelUp() {
    if (this.isMuted || !this.isInitialized) return;
    try {
      this.levelUpSynth.triggerAttackRelease(["C5", "E5", "G5", "B5", "C6"], "0.4");
    } catch (e) {}
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

// Xuất ra biến toàn cục và module
if (typeof window !== 'undefined') {
  window.AudioManager = AudioManager;
}
