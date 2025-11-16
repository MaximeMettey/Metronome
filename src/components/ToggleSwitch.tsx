import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/defaults';

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onToggle: () => void;
  icon?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  value,
  onToggle,
  icon,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={styles.labelContainer}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={[styles.switch, value && styles.switchActive]}>
        <View style={[styles.thumb, value && styles.thumbActive]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.text.dark,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    padding: 2,
  },
  switchActive: {
    backgroundColor: COLORS.primary,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbActive: {
    transform: [{ translateX: 20 }],
  },
});
