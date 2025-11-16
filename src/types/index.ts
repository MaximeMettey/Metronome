export interface TimeSignature {
  beats: number;
  noteValue: number;
  name: string;
}

export interface MetronomeState {
  isPlaying: boolean;
  tempo: number; // BPM
  timeSignature: TimeSignature;
  currentBeat: number;
  volume: number;
  soundEnabled: boolean;
  visualEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface PolyrhythmLayer {
  id: string;
  beats: number;
  subdivision: number;
  accent: number[];
  soundType: SoundType;
  volume: number;
  enabled: boolean;
}

export type SoundType = 'click' | 'woodblock' | 'cowbell' | 'beep' | 'clap' | 'stick';

export interface MetronomePreset {
  id: string;
  name: string;
  tempo: number;
  timeSignature: TimeSignature;
  soundType: SoundType;
  polyrhythms: PolyrhythmLayer[];
  soundEnabled: boolean;
  visualEnabled: boolean;
  vibrationEnabled: boolean;
  volume: number;
}

export interface AppSettings {
  language: string;
  theme: 'light' | 'dark' | 'auto';
  keepScreenOn: boolean;
  flashOnBeat: boolean;
  defaultPreset?: string;
}

export type LanguageCode = 'en' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'ja' | 'zh';
