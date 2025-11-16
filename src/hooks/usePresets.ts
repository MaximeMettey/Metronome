import { useState, useEffect, useCallback } from 'react';
import { MetronomePreset } from '@/types';
import { storageService } from '@/services/StorageService';
import { DEFAULT_TIME_SIGNATURE } from '@/constants/timeSignatures';
import { DEFAULT_TEMPO, DEFAULT_VOLUME } from '@/constants/defaults';

const DEFAULT_PRESETS: MetronomePreset[] = [
  {
    id: 'default-1',
    name: 'Classical 4/4',
    tempo: 120,
    timeSignature: DEFAULT_TIME_SIGNATURE,
    soundType: 'click',
    polyrhythms: [],
    soundEnabled: true,
    visualEnabled: true,
    vibrationEnabled: false,
    volume: DEFAULT_VOLUME,
  },
  {
    id: 'default-2',
    name: 'Waltz 3/4',
    tempo: 180,
    timeSignature: { beats: 3, noteValue: 4, name: '3/4' },
    soundType: 'woodblock',
    polyrhythms: [],
    soundEnabled: true,
    visualEnabled: true,
    vibrationEnabled: false,
    volume: DEFAULT_VOLUME,
  },
  {
    id: 'default-3',
    name: 'Jazz 6/8',
    tempo: 144,
    timeSignature: { beats: 6, noteValue: 8, name: '6/8' },
    soundType: 'stick',
    polyrhythms: [],
    soundEnabled: true,
    visualEnabled: true,
    vibrationEnabled: false,
    volume: DEFAULT_VOLUME,
  },
];

export const usePresets = () => {
  const [presets, setPresets] = useState<MetronomePreset[]>(DEFAULT_PRESETS);
  const [selectedPreset, setSelectedPreset] = useState<MetronomePreset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = useCallback(async () => {
    try {
      const savedPresets = await storageService.loadPresets();
      if (savedPresets.length > 0) {
        setPresets([...DEFAULT_PRESETS, ...savedPresets]);
      }
    } catch (error) {
      console.error('Failed to load presets:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const savePreset = useCallback(async (preset: MetronomePreset) => {
    try {
      const userPresets = presets.filter(p => !p.id.startsWith('default-'));
      const updatedPresets = [...userPresets, preset];
      await storageService.savePresets(updatedPresets);
      setPresets([...DEFAULT_PRESETS, ...updatedPresets]);
    } catch (error) {
      console.error('Failed to save preset:', error);
      throw error;
    }
  }, [presets]);

  const deletePreset = useCallback(async (presetId: string) => {
    try {
      const updatedPresets = presets.filter(p => p.id !== presetId && !p.id.startsWith('default-'));
      await storageService.savePresets(updatedPresets);
      setPresets([...DEFAULT_PRESETS, ...updatedPresets]);
    } catch (error) {
      console.error('Failed to delete preset:', error);
      throw error;
    }
  }, [presets]);

  const selectPreset = useCallback((preset: MetronomePreset) => {
    setSelectedPreset(preset);
  }, []);

  return {
    presets,
    selectedPreset,
    loading,
    savePreset,
    deletePreset,
    selectPreset,
  };
};
