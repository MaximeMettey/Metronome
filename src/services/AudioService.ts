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
      // Load click sounds (default)
      const { sound: clickHigh } = await Audio.Sound.createAsync(
        require('../../assets/sounds/click-high.wav')
      );
      this.sounds.set('click-high', clickHigh);

      const { sound: clickLow } = await Audio.Sound.createAsync(
        require('../../assets/sounds/click-low.wav')
      );
      this.sounds.set('click-low', clickLow);

      // Load woodblock sounds
      const { sound: woodblockHigh } = await Audio.Sound.createAsync(
        require('../../assets/sounds/woodblock-high.wav')
      );
      this.sounds.set('woodblock-high', woodblockHigh);

      const { sound: woodblockLow } = await Audio.Sound.createAsync(
        require('../../assets/sounds/woodblock-low.wav')
      );
      this.sounds.set('woodblock-low', woodblockLow);

      // Load beep sounds
      const { sound: beepHigh } = await Audio.Sound.createAsync(
        require('../../assets/sounds/beep-high.wav')
      );
      this.sounds.set('beep-high', beepHigh);

      const { sound: beepLow } = await Audio.Sound.createAsync(
        require('../../assets/sounds/beep-low.wav')
      );
      this.sounds.set('beep-low', beepLow);

      console.log('All sounds loaded successfully');
    } catch (error) {
      console.error('Failed to load sounds:', error);
    }
  }

  async playBeat(type: SoundType, isStrong: boolean): Promise<void> {
    try {
      if (this.audioContext && Platform.OS === 'web') {
        // Web: Use Web Audio API
        this.playBeep(isStrong ? 1000 : 800, 0.05, isStrong ? 1.0 : 0.6);
      } else {
        // Mobile: Use pre-loaded sound files
        await this.playMobileBeep(type, isStrong);
      }
    } catch (error) {
      console.error('Failed to play beat:', error);
    }
  }

  private async playMobileBeep(type: SoundType, isStrong: boolean): Promise<void> {
    try {
      const soundKey = `${type}-${isStrong ? 'high' : 'low'}`;
      const sound = this.sounds.get(soundKey);

      if (sound) {
        await sound.setVolumeAsync(this.volume);
        await sound.setPositionAsync(0);
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Failed to play mobile beep:', error);
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
