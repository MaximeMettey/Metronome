import { useState, useEffect, useRef, useCallback } from 'react';
import { MetronomeEngine } from '@/services/MetronomeEngine';
import { AudioService } from '@/services/AudioService';
import { TimeSignature, MetronomeState, SoundType } from '@/types';
import { DEFAULT_TIME_SIGNATURE } from '@/constants/timeSignatures';
import { DEFAULT_TEMPO, DEFAULT_VOLUME } from '@/constants/defaults';
import * as Haptics from 'expo-haptics';

export const useMetronome = () => {
  const [state, setState] = useState<MetronomeState>({
    isPlaying: false,
    tempo: DEFAULT_TEMPO,
    timeSignature: DEFAULT_TIME_SIGNATURE,
    currentBeat: 0,
    volume: DEFAULT_VOLUME,
    soundEnabled: true,
    visualEnabled: true,
    vibrationEnabled: false,
  });

  const engineRef = useRef<MetronomeEngine | null>(null);
  const audioServiceRef = useRef<AudioService | null>(null);
  const soundTypeRef = useRef<SoundType>('click');
  const soundEnabledRef = useRef<boolean>(true);
  const vibrationEnabledRef = useRef<boolean>(false);

  useEffect(() => {
    // Initialize services
    engineRef.current = new MetronomeEngine(DEFAULT_TIME_SIGNATURE);
    audioServiceRef.current = new AudioService();
    audioServiceRef.current.initialize();

    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
      }
      if (audioServiceRef.current) {
        audioServiceRef.current.cleanup();
      }
    };
  }, []);

  const handleBeat = useCallback((beat: number, isStrong: boolean) => {
    setState(prev => ({ ...prev, currentBeat: beat }));

    // Play sound - use ref to get current value
    if (soundEnabledRef.current && audioServiceRef.current) {
      audioServiceRef.current.playBeat(soundTypeRef.current, isStrong);
    }

    // Vibration - use ref to get current value
    if (vibrationEnabledRef.current) {
      if (isStrong) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  }, []); // Empty deps - uses refs which don't need to be in deps

  const start = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.start(handleBeat);
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [handleBeat]);

  const stop = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.stop();
      setState(prev => ({ ...prev, isPlaying: false, currentBeat: 0 }));
    }
  }, []);

  const pause = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const resume = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.resume(handleBeat);
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [handleBeat]);

  const setTempo = useCallback((tempo: number) => {
    if (engineRef.current) {
      engineRef.current.setTempo(tempo);
      setState(prev => ({ ...prev, tempo }));
    }
  }, []);

  const setTimeSignature = useCallback((timeSignature: TimeSignature) => {
    if (engineRef.current) {
      engineRef.current.setTimeSignature(timeSignature);
      setState(prev => ({ ...prev, timeSignature, currentBeat: 0 }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioServiceRef.current) {
      audioServiceRef.current.setVolume(volume);
      setState(prev => ({ ...prev, volume }));
    }
  }, []);

  const toggleSound = useCallback(() => {
    setState(prev => {
      const newValue = !prev.soundEnabled;
      soundEnabledRef.current = newValue; // Update ref
      return { ...prev, soundEnabled: newValue };
    });
  }, []);

  const toggleVisual = useCallback(() => {
    setState(prev => ({ ...prev, visualEnabled: !prev.visualEnabled }));
  }, []);

  const toggleVibration = useCallback(() => {
    setState(prev => {
      const newValue = !prev.vibrationEnabled;
      vibrationEnabledRef.current = newValue; // Update ref
      return { ...prev, vibrationEnabled: newValue };
    });
  }, []);

  const setSoundType = useCallback((soundType: SoundType) => {
    soundTypeRef.current = soundType;
  }, []);

  return {
    state,
    start,
    stop,
    pause,
    resume,
    setTempo,
    setTimeSignature,
    setVolume,
    toggleSound,
    toggleVisual,
    toggleVibration,
    setSoundType,
  };
};
