import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { useMetronome } from '@/hooks/useMetronome';
import { useTapTempo } from '@/hooks/useTapTempo';
import { BeatIndicator } from '@/components/BeatIndicator';
import { TempoControl } from '@/components/TempoControl';
import { PlaybackControls } from '@/components/PlaybackControls';
import { TimeSignatureSelector } from '@/components/TimeSignatureSelector';
import { TapTempoButton } from '@/components/TapTempoButton';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { COLORS } from '@/constants/defaults';

export const MetronomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    state,
    start,
    stop,
    pause,
    setTempo,
    setTimeSignature,
    toggleSound,
    toggleVisual,
    toggleVibration,
  } = useMetronome();

  const { tap, tapCount, calculatedTempo } = useTapTempo();

  const handleApplyTapTempo = (tempo: number) => {
    setTempo(tempo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('app.name')}</Text>
            <Text style={styles.subtitle}>{t('app.tagline')}</Text>
          </View>

          {/* Beat Indicator */}
          <BeatIndicator
            totalBeats={state.timeSignature.beats}
            currentBeat={state.currentBeat}
            isPlaying={state.isPlaying}
            visualEnabled={state.visualEnabled}
          />

          {/* Playback Controls */}
          <PlaybackControls
            isPlaying={state.isPlaying}
            onPlay={start}
            onPause={pause}
            onStop={stop}
          />

          {/* Tempo Control */}
          <TempoControl
            tempo={state.tempo}
            onTempoChange={setTempo}
            disabled={state.isPlaying}
          />

          {/* Tap Tempo */}
          <TapTempoButton
            onTap={tap}
            tapCount={tapCount}
            calculatedTempo={calculatedTempo}
            onApply={handleApplyTapTempo}
          />

          {/* Time Signature */}
          <TimeSignatureSelector
            timeSignature={state.timeSignature}
            onSelect={setTimeSignature}
            disabled={state.isPlaying}
          />

          {/* Settings */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{t('settings.title')}</Text>

            <View style={styles.settingsCard}>
              <ToggleSwitch
                label={t('settings.sound')}
                value={state.soundEnabled}
                onToggle={toggleSound}
                icon="🔊"
              />

              <View style={styles.divider} />

              <ToggleSwitch
                label={t('settings.visual')}
                value={state.visualEnabled}
                onToggle={toggleVisual}
                icon="👁"
              />

              <View style={styles.divider} />

              <ToggleSwitch
                label={t('settings.vibration')}
                value={state.vibrationEnabled}
                onToggle={toggleVibration}
                icon="📳"
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  settingsSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
