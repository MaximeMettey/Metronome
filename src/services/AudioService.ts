import { SoundType } from '@/types';

export class AudioService {
  private volume: number = 0.8;
  private audioContext: AudioContext | null = null;

  async initialize(): Promise<void> {
    try {
      // Try to initialize Web Audio API on all platforms
      const AudioContextClass =
        (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) ||
        (global as any).AudioContext;

      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
        console.log('✅ Web Audio API initialized');
      } else {
        console.warn('❌ Web Audio API not available on this platform');
      }
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  playBeat(type: SoundType, isStrong: boolean): void {
    if (!this.audioContext) {
      console.warn('AudioContext not initialized, cannot play beat');
      return;
    }

    // Map sound types to frequencies
    const frequencies: Record<SoundType, { high: number; low: number }> = {
      click: { high: 1000, low: 800 },
      woodblock: { high: 1200, low: 900 },
      beep: { high: 880, low: 660 },
    };

    const freq = frequencies[type];
    const frequency = isStrong ? freq.high : freq.low;
    const duration = type === 'beep' ? 0.1 : type === 'woodblock' ? 0.08 : 0.05;
    const volumeMultiplier = isStrong ? 1.0 : 0.6;

    this.playBeep(frequency, duration, volumeMultiplier);
  }

  private playBeep(frequency: number, duration: number, volumeMultiplier: number = 1.0): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(this.volume * volumeMultiplier, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  async cleanup(): Promise<void> {
    if (this.audioContext) {
      try {
        await this.audioContext.close();
        this.audioContext = null;
      } catch (error) {
        console.error('Failed to close audio context:', error);
      }
    }
  }
}
