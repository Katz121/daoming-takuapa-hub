'use client';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientRunning = false;
  private ambientInterval: any = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Play realistic soothing ambient courtyard soundscape (Gentle Breeze + Pentatonic Wind Chimes)
   */
  startAmbientAtmosphere() {
    this.initContext();
    if (!this.ctx || this.isAmbientRunning) return;

    this.isAmbientRunning = true;
    const now = this.ctx.currentTime;

    // Master ambient gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.01, now);
    this.ambientGain.gain.linearRampToValueAtTime(0.18, now + 1.5);
    this.ambientGain.connect(this.ctx.destination);

    // 1. Warm Wind / Nature Drone (Pinkish Noise simulation with dual oscillators)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, now); // A2 warm drone

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(164.8, now); // E3 fifth

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, now);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.12, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(this.ambientGain);

    osc1.start();
    osc2.start();

    // 2. Periodic Pentatonic Chime bells (C, D, E, G, A pentatonic scale)
    const pentatonicFreqs = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    this.ambientInterval = setInterval(() => {
      if (!this.isAmbientRunning || !this.ctx || !this.ambientGain) return;

      const randomFreq = pentatonicFreqs[Math.floor(Math.random() * pentatonicFreqs.length)];
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      const chimeTime = this.ctx.currentTime;

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(randomFreq, chimeTime);

      chimeGain.gain.setValueAtTime(0.001, chimeTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.15, chimeTime + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 2.2);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.ambientGain);

      chimeOsc.start(chimeTime);
      chimeOsc.stop(chimeTime + 2.3);
    }, 1800);
  }

  stopAmbientAtmosphere() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.linearRampToValueAtTime(0.001, now + 0.8);
      setTimeout(() => {
        this.ambientGain?.disconnect();
        this.ambientGain = null;
        this.isAmbientRunning = false;
      }, 900);
    } else {
      this.isAmbientRunning = false;
    }
  }

  /**
   * Speak narrative transcript using Browser Speech Synthesis with natural Thai voice
   */
  speakNarration(text: string, lang: 'th' | 'en', onEnd?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'th' ? 'th-TH' : 'en-US';
    utterance.rate = 0.92; // Calm, storytelling pace
    utterance.pitch = 1.0;

    // Search for natural Thai voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => (lang === 'th' ? v.lang.includes('th') : v.lang.includes('en')));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  stopNarration() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Play interactive click feedback chime
   */
  playChime(freq = 659.25) {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  }
}

export const soundEngine = new SoundEngine();
