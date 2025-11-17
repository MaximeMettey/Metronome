import { Audio } from 'expo-av';
import { SoundType } from '@/types';
import { Platform } from 'react-native';

export class AudioService {
  private sounds: Map<string, Audio.Sound> = new Map();
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

      // Load one sound per type
      for (const { key, source } of soundTypes) {
        const { sound } = await Audio.Sound.createAsync(
          source,
          {
            volume: this.volume,
            shouldPlay: false,
            isLooping: false,
          },
          null,
          true // downloadFirst for better performance
        );
        this.sounds.set(key, sound);
      }

      console.log('All sounds loaded successfully');
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
      const sound = this.sounds.get(soundKey);

      if (!sound) return;

      // Reset to start and play immediately - fire and forget
      // Don't call setVolumeAsync here to avoid crackles
      sound.setPositionAsync(0).catch(() => {});
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

    // Update volume for all loaded sounds
    for (const sound of this.sounds.values()) {
      sound.setVolumeAsync(this.volume).catch(() => {});
    }
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

    if (this.audioContext) {
      await this.audioContext.close();
      this.audioContext = null;
    }
  }
}
