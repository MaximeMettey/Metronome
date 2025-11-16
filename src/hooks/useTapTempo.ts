import { useState, useCallback, useRef } from 'react';
import { TAP_TEMPO_TIMEOUT, TAP_TEMPO_MIN_TAPS } from '@/constants/defaults';

export const useTapTempo = () => {
  const [taps, setTaps] = useState<number[]>([]);
  const [calculatedTempo, setCalculatedTempo] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tap = useCallback(() => {
    const now = Date.now();

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTaps(prevTaps => {
      const newTaps = [...prevTaps, now];

      // Calculate tempo if we have enough taps
      if (newTaps.length >= TAP_TEMPO_MIN_TAPS) {
        const intervals: number[] = [];
        for (let i = 1; i < newTaps.length; i++) {
          intervals.push(newTaps[i] - newTaps[i - 1]);
        }

        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const tempo = Math.round(60000 / avgInterval);
        setCalculatedTempo(tempo);
      }

      return newTaps;
    });

    // Reset taps after timeout
    timeoutRef.current = setTimeout(() => {
      setTaps([]);
      setCalculatedTempo(null);
    }, TAP_TEMPO_TIMEOUT);
  }, []);

  const reset = useCallback(() => {
    setTaps([]);
    setCalculatedTempo(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return {
    tap,
    reset,
    tapCount: taps.length,
    calculatedTempo,
  };
};
