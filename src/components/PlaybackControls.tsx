import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@/constants/defaults';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onStop,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.playButton]}
        onPress={isPlaying ? onPause : onPlay}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? '⏸' : '▶'}
        </Text>
        <Text style={styles.buttonLabel}>
          {t(isPlaying ? 'controls.pause' : 'controls.play')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.stopButton]}
        onPress={onStop}
      >
        <Text style={styles.buttonText}>⏹</Text>
        <Text style={styles.buttonLabel}>{t('controls.stop')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 24,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  playButton: {
    backgroundColor: COLORS.primary,
  },
  stopButton: {
    backgroundColor: COLORS.accent,
  },
  buttonText: {
    fontSize: 36,
    color: 'white',
  },
  buttonLabel: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
    fontWeight: '600',
  },
});
