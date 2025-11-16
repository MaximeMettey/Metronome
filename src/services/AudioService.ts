import { Audio } from 'expo-av';
import { SoundType } from '@/types';

export class AudioService {
  private sounds: Map<SoundType, Audio.Sound> = new Map();
  private volume: number = 0.8;

  async initialize(): Promise<void> {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Pre-load all sounds
      await this.loadSounds();
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  private async loadSounds(): Promise<void> {
    // For web/testing, we'll generate tones programmatically
    // In production, you would load actual sound files here
    const soundTypes: SoundType[] = ['click', 'woodblock', 'cowbell', 'beep', 'clap', 'stick'];

    for (const type of soundTypes) {
      try {
        // Placeholder - in production, load actual audio files
        // const { sound } = await Audio.Sound.createAsync(
        //   require(`../../assets/sounds/${type}.mp3`)
        // );
        // this.sounds.set(type, sound);
      } catch (error) {
        console.error(`Failed to load sound ${type}:`, error);
      }
    }
  }

  async playBeat(type: SoundType, isStrong: boolean): Promise<void> {
    try {
      // Use Web Audio API for precise timing
      if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
        this.playBeep(isStrong ? 1000 : 800, 0.1, isStrong ? 1.0 : 0.6);
      } else {
        // Fallback to Expo Audio for mobile
        const sound = this.sounds.get(type);
        if (sound) {
          await sound.setVolumeAsync(this.volume * (isStrong ? 1.0 : 0.6));
          await sound.replayAsync();
        }
      }
    } catch (error) {
      console.error('Failed to play beat:', error);
    }
  }

  private playBeep(frequency: number, duration: number, volumeMultiplier: number = 1.0): void {
    if (typeof window === 'undefined') return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(this.volume * volumeMultiplier, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    setTimeout(() => {
      audioContext.close();
    }, duration * 1000 + 100);
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  async cleanup(): Promise<void> {
    for (const sound of this.sounds.values()) {
      try {
        await sound.unloadAsync();
      } catch (error) {
        console.error('Failed to unload sound:', error);
      }
    }
    this.sounds.clear();
  }
}
