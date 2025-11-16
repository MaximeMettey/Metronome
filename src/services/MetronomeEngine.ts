import { TimeSignature } from '@/types';

export type BeatCallback = (beat: number, isStrong: boolean) => void;

export class MetronomeEngine {
  private tempo: number = 120;
  private timeSignature: TimeSignature;
  private isPlaying: boolean = false;
  private currentBeat: number = 0;
  private intervalId: NodeJS.Timeout | null = null;
  private beatCallback: BeatCallback | null = null;
  private scheduledBeats: number[] = [];
  private nextBeatTime: number = 0;
  private audioContext: AudioContext | null = null;
  private lookAhead: number = 25.0; // How frequently to call scheduling function (ms)
  private scheduleAheadTime: number = 0.1; // How far ahead to schedule audio (sec)

  constructor(timeSignature: TimeSignature) {
    this.timeSignature = timeSignature;
    if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setTempo(tempo: number): void {
    this.tempo = Math.max(20, Math.min(300, tempo));
  }

  getTempo(): number {
    return this.tempo;
  }

  setTimeSignature(timeSignature: TimeSignature): void {
    this.timeSignature = timeSignature;
    this.currentBeat = 0;
  }

  getTimeSignature(): TimeSignature {
    return this.timeSignature;
  }

  start(callback: BeatCallback): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.currentBeat = 0;
    this.beatCallback = callback;
    this.nextBeatTime = this.audioContext ? this.audioContext.currentTime : Date.now() / 1000;

    this.scheduleNextBeat();
    this.intervalId = setInterval(() => this.scheduleNextBeat(), this.lookAhead);
  }

  stop(): void {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentBeat = 0;
    this.scheduledBeats = [];
  }

  pause(): void {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resume(callback: BeatCallback): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.beatCallback = callback;
    this.nextBeatTime = this.audioContext ? this.audioContext.currentTime : Date.now() / 1000;

    this.scheduleNextBeat();
    this.intervalId = setInterval(() => this.scheduleNextBeat(), this.lookAhead);
  }

  getCurrentBeat(): number {
    return this.currentBeat;
  }

  private scheduleNextBeat(): void {
    if (!this.isPlaying || !this.beatCallback) return;

    const currentTime = this.audioContext ? this.audioContext.currentTime : Date.now() / 1000;
    const secondsPerBeat = 60.0 / this.tempo;

    while (this.nextBeatTime < currentTime + this.scheduleAheadTime) {
      const isStrongBeat = this.currentBeat === 0;

      // Schedule the beat callback
      const beatTime = this.nextBeatTime;
      const beat = this.currentBeat;

      setTimeout(() => {
        if (this.beatCallback) {
          this.beatCallback(beat, isStrongBeat);
        }
      }, (beatTime - currentTime) * 1000);

      // Advance to next beat
      this.nextBeatTime += secondsPerBeat;
      this.currentBeat = (this.currentBeat + 1) % this.timeSignature.beats;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  destroy(): void {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}
