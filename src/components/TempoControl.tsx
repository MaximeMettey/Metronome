import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MIN_TEMPO, MAX_TEMPO, COLORS } from '@/constants/defaults';

interface TempoControlProps {
  tempo: number;
  onTempoChange: (tempo: number) => void;
  disabled?: boolean;
}

export const TempoControl: React.FC<TempoControlProps> = ({
  tempo,
  onTempoChange,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const incrementTempo = (amount: number) => {
    const newTempo = Math.max(MIN_TEMPO, Math.min(MAX_TEMPO, tempo + amount));
    onTempoChange(newTempo);
  };

  const handleTempoInput = (value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      onTempoChange(Math.max(MIN_TEMPO, Math.min(MAX_TEMPO, numValue)));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('settings.tempo')}</Text>

      <View style={styles.controlRow}>
        <TouchableOpacity
          style={[styles.button, styles.smallButton, disabled && styles.disabled]}
          onPress={() => incrementTempo(-10)}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>-10</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.smallButton, disabled && styles.disabled]}
          onPress={() => incrementTempo(-1)}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>-1</Text>
        </TouchableOpacity>

        <View style={styles.tempoDisplay}>
          <TextInput
            style={styles.tempoInput}
            value={tempo.toString()}
            onChangeText={handleTempoInput}
            keyboardType="number-pad"
            editable={!disabled}
            selectTextOnFocus
          />
          <Text style={styles.bpmText}>{t('settings.bpm')}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.smallButton, disabled && styles.disabled]}
          onPress={() => incrementTempo(1)}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>+1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.smallButton, disabled && styles.disabled]}
          onPress={() => incrementTempo(10)}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>+10</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.dark,
    marginBottom: 12,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  tempoDisplay: {
    alignItems: 'center',
    minWidth: 100,
  },
  tempoInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    minWidth: 100,
  },
  bpmText: {
    fontSize: 14,
    color: COLORS.text.dark,
    marginTop: -8,
  },
  disabled: {
    opacity: 0.5,
  },
});
