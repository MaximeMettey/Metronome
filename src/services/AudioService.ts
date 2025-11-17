import { Audio } from 'expo-av';
import { SoundType } from '@/types';
import { Platform } from 'react-native';

export class AudioService {
  private sounds: Map<SoundType, Audio.Sound> = new Map();
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

      // Initialize Web Audio API if available
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
        }
      }
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  async playBeat(type: SoundType, isStrong: boolean): Promise<void> {
    try {
      // Use Web Audio API on web, simple beep on mobile
      if (this.audioContext && Platform.OS === 'web') {
        this.playBeep(isStrong ? 1000 : 800, 0.1, isStrong ? 1.0 : 0.6);
      } else {
        // On mobile, play a simple beep using Audio API
        await this.playMobileBeep(isStrong);
      }
    } catch (error) {
      console.error('Failed to play beat:', error);
    }
  }

  private async playMobileBeep(isStrong: boolean): Promise<void> {
    try {
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: `data:audio/wav;base64,${this.generateBeepWav(isStrong ? 1000 : 800, 0.1)}`,
        },
        { shouldPlay: true, volume: this.volume * (isStrong ? 1.0 : 0.6) }
      );

      // Unload after playing
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Failed to play mobile beep:', error);
    }
  }

  private generateBeepWav(frequency: number, duration: number): string {
    const sampleRate = 44100;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, numSamples * 2, true);

    // Generate sine wave samples
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const value = Math.sin(2 * Math.PI * frequency * t) * 0.3 * 32767;
      view.setInt16(44 + i * 2, value, true);
    }

    // Convert to base64
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
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
