import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { TimeSignature } from '@/types';
import { TIME_SIGNATURES } from '@/constants/timeSignatures';
import { COLORS } from '@/constants/defaults';

interface TimeSignatureSelectorProps {
  timeSignature: TimeSignature;
  onSelect: (timeSignature: TimeSignature) => void;
  disabled?: boolean;
}

export const TimeSignatureSelector: React.FC<TimeSignatureSelectorProps> = ({
  timeSignature,
  onSelect,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (sig: TimeSignature) => {
    onSelect(sig);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{t('settings.timeSignature')}</Text>
        <TouchableOpacity
          style={[styles.selector, disabled && styles.disabled]}
          onPress={() => !disabled && setModalVisible(true)}
          disabled={disabled}
        >
          <Text style={styles.selectorText}>{timeSignature.name}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('settings.timeSignature')}</Text>

            <FlatList
              data={TIME_SIGNATURES}
              keyExtractor={(item) => item.name}
              numColumns={4}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.timeSignatureItem,
                    item.name === timeSignature.name && styles.selectedItem,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.timeSignatureText,
                      item.name === timeSignature.name && styles.selectedText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
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
    marginBottom: 8,
  },
  selector: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  disabled: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    maxWidth: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: COLORS.text.light,
  },
  timeSignatureItem: {
    flex: 1,
    margin: 4,
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.background.light,
    alignItems: 'center',
    minWidth: 70,
  },
  selectedItem: {
    backgroundColor: COLORS.primary,
  },
  timeSignatureText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.light,
  },
  selectedText: {
    color: 'white',
  },
});
