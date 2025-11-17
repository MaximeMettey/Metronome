import { Audio } from 'expo-av';
import { SoundType } from '@/types';
import { Platform } from 'react-native';

const POOL_SIZE = 8; // 8 instances per sound type

export class AudioService {
  private soundPools: Map<string, Audio.Sound[]> = new Map();
  private poolIndexes: Map<string, number> = new Map();
  private volume: number = 0.8;
  private audioContext: AudioContext | null = null;

  async initialize(): Promise<void> {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
        }
      } else {
        // Load sound files for mobile
        await this.loadSounds();
      }
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  private async loadSounds(): Promise<void> {
    try {
      const soundTypes = [
        { key: 'click-high', source: require('../../assets/sounds/click-high.wav') },
        { key: 'click-low', source: require('../../assets/sounds/click-low.wav') },
        { key: 'woodblock-high', source: require('../../assets/sounds/woodblock-high.wav') },
        { key: 'woodblock-low', source: require('../../assets/sounds/woodblock-low.wav') },
        { key: 'beep-high', source: require('../../assets/sounds/beep-high.wav') },
        { key: 'beep-low', source: require('../../assets/sounds/beep-low.wav') },
      ];

      // Create pool of sounds - multiple instances per type
      for (const { key, source } of soundTypes) {
        const pool: Audio.Sound[] = [];

        for (let i = 0; i < POOL_SIZE; i++) {
          const { sound } = await Audio.Sound.createAsync(
            source,
            { volume: this.volume, shouldPlay: false, isLooping: false },
            null,
            true // downloadFirst
          );
          pool.push(sound);
        }

        this.soundPools.set(key, pool);
        this.poolIndexes.set(key, 0);
      }

      console.log(`All sounds loaded (${POOL_SIZE} instances per type)`);
    } catch (error) {
      console.error('Failed to load sounds:', error);
    }
  }

  playBeat(type: SoundType, isStrong: boolean): void {
    try {
      if (this.audioContext && Platform.OS === 'web') {
        // Web: Use Web Audio API
        this.playBeep(isStrong ? 1000 : 800, 0.05, isStrong ? 1.0 : 0.6);
      } else {
        // Mobile: Use pre-loaded sounds
        this.playMobileBeep(type, isStrong);
      }
    } catch (error) {
      console.error('Failed to play beat:', error);
    }
  }

  private playMobileBeep(type: SoundType, isStrong: boolean): void {
    try {
      const soundKey = `${type}-${isStrong ? 'high' : 'low'}`;
      const pool = this.soundPools.get(soundKey);

      if (!pool || pool.length === 0) return;

      // Get next available sound from pool (round-robin)
      const index = this.poolIndexes.get(soundKey) || 0;
      const sound = pool[index];

      // Update index for next call
      this.poolIndexes.set(soundKey, (index + 1) % POOL_SIZE);

      // Stop then play - fire and forget both calls
      // This ensures the sound plays from the start even if it was playing
      sound.stopAsync().catch(() => {});
      sound.playAsync().catch(() => {});
    } catch (error) {
      // Silent catch to avoid console spam
    }
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

    // Update volume for all sounds in all pools
    for (const pool of this.soundPools.values()) {
      for (const sound of pool) {
        sound.setVolumeAsync(this.volume).catch(() => {});
      }
    }
  }

  async cleanup(): Promise<void> {
    for (const pool of this.soundPools.values()) {
      for (const sound of pool) {
        try {
          await sound.unloadAsync();
        } catch (error) {
          console.error('Failed to unload sound:', error);
        }
      }
    }
    this.soundPools.clear();
    this.poolIndexes.clear();

    if (this.audioContext) {
      await this.audioContext.close();
      this.audioContext = null;
    }
  }
}
