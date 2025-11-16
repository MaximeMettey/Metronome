import AsyncStorage from '@react-native-async-storage/async-storage';
import { MetronomePreset, AppSettings } from '@/types';

const PRESETS_KEY = '@metronome_presets';
const SETTINGS_KEY = '@metronome_settings';

export class StorageService {
  async savePresets(presets: MetronomePreset[]): Promise<void> {
    try {
      await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
    } catch (error) {
      console.error('Failed to save presets:', error);
      throw error;
    }
  }

  async loadPresets(): Promise<MetronomePreset[]> {
    try {
      const data = await AsyncStorage.getItem(PRESETS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load presets:', error);
      return [];
    }
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  }

  async loadSettings(): Promise<AppSettings | null> {
    try {
      const data = await AsyncStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([PRESETS_KEY, SETTINGS_KEY]);
    } catch (error) {
      console.error('Failed to clear storage:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();
