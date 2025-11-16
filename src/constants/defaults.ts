export const DEFAULT_TEMPO = 120;
export const MIN_TEMPO = 20;
export const MAX_TEMPO = 300;
export const TEMPO_STEP = 1;

export const DEFAULT_VOLUME = 0.8;

export const TAP_TEMPO_TIMEOUT = 3000; // ms
export const TAP_TEMPO_MIN_TAPS = 2;

export const VISUAL_FLASH_DURATION = 100; // ms

export const SOUND_TYPES = ['click', 'woodblock', 'cowbell', 'beep', 'clap', 'stick'] as const;

export const COLORS = {
  primary: '#4A90E2',
  secondary: '#7B68EE',
  accent: '#FF6B6B',
  background: {
    light: '#F5F5F5',
    dark: '#1a1a2e',
  },
  text: {
    light: '#333333',
    dark: '#FFFFFF',
  },
  beat: {
    strong: '#FF6B6B',
    weak: '#4A90E2',
    inactive: '#CCCCCC',
  },
};
