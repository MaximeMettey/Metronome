import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@/constants/defaults';

interface TapTempoButtonProps {
  onTap: () => void;
  tapCount: number;
  calculatedTempo: number | null;
  onApply?: (tempo: number) => void;
}

export const TapTempoButton: React.FC<TapTempoButtonProps> = ({
  onTap,
  tapCount,
  calculatedTempo,
  onApply,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onTap}>
        <Text style={styles.buttonText}>{t('controls.tapTempo')}</Text>
        {tapCount > 0 && (
          <Text style={styles.tapCount}>
            {tapCount} {tapCount === 1 ? 'tap' : 'taps'}
          </Text>
        )}
      </TouchableOpacity>

      {calculatedTempo && onApply && (
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => onApply(calculatedTempo)}
        >
          <Text style={styles.applyText}>
            {t('controls.apply')}: {calculatedTempo} BPM
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  tapCount: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
  applyButton: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
