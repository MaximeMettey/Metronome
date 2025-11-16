import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
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
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    if (isActive && visualEnabled) {
      scale.value = withSequence(
        withTiming(1.5, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      opacity.value = withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(0.3, { duration: 200 })
      );
    }
  }, [isActive, visualEnabled]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

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
        animatedStyle,
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
