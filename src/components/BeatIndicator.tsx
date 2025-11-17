import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '@/constants/defaults';

interface BeatIndicatorProps {
  totalBeats: number;
  currentBeat: number;
  isPlaying: boolean;
  visualEnabled: boolean;
}

export const BeatIndicator: React.FC<BeatIndicatorProps> = ({
  totalBeats,
  currentBeat,
  isPlaying,
  visualEnabled,
}) => {
  const beats = Array.from({ length: totalBeats }, (_, i) => i);

  return (
    <View style={styles.container}>
      {beats.map((beat) => (
        <BeatDot
          key={beat}
          isActive={isPlaying && beat === currentBeat}
          isStrong={beat === 0}
          visualEnabled={visualEnabled}
        />
      ))}
    </View>
  );
};

interface BeatDotProps {
  isActive: boolean;
  isStrong: boolean;
  visualEnabled: boolean;
}

const BeatDot: React.FC<BeatDotProps> = ({ isActive, isStrong, visualEnabled }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isActive && visualEnabled) {
      // Animate scale
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Animate opacity
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive, visualEnabled, scale, opacity]);

  const dotColor = isActive
    ? isStrong
      ? COLORS.beat.strong
      : COLORS.beat.weak
    : COLORS.beat.inactive;

  return (
    <Animated.View
      style={[
        styles.beat,
        { backgroundColor: dotColor },
        isStrong && styles.strongBeat,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 32,
  },
  beat: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  strongBeat: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
