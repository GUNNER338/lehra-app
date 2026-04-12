import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import ScaleSelector from './ScaleSelector';
import Dropdown from './Dropdown';
import TempoSelector from './TempoSelector';

const SCALES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const INSTRUMENTS = ['Sitar', 'Harmonium', 'Sarangi', 'Dilruba'];
const RAAGS = ['Yaman', 'Bhairav', 'Darbari', 'Malkauns', 'Bhairavi', 'Todi'];

const MainScreen = () => {
  const [scaleIndex, setScaleIndex] = useState(0);
  const [instrument, setInstrument] = useState(INSTRUMENTS[0]);
  const [raag, setRaag] = useState(RAAGS[0]);
  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsPlaying(!isPlaying);
  };

  const increaseScale = () => {
    setScaleIndex((prev) => (prev + 1) % SCALES.length);
  };

  const decreaseScale = () => {
    setScaleIndex((prev) => (prev - 1 + SCALES.length) % SCALES.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dhir Dhir Music Academy</Text>
        <Text style={styles.headerSubtitle}>Lehra Control Panel</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ScaleSelector 
          scale={SCALES[scaleIndex]} 
          onIncrease={increaseScale} 
          onDecrease={decreaseScale} 
        />

        <View style={styles.divider} />

        <View style={styles.section}>
          <Dropdown 
            label="Select Instrument" 
            options={INSTRUMENTS} 
            selectedValue={instrument} 
            onValueChange={setInstrument} 
          />
          
          <Dropdown 
            label="Select Raag" 
            options={RAAGS} 
            selectedValue={raag} 
            onValueChange={setRaag} 
          />
        </View>

        <View style={styles.divider} />

        <TempoSelector tempo={tempo} setTempo={setTempo} />

        <TouchableOpacity 
          style={[
            styles.playButton, 
            isPlaying ? styles.pauseButtonActive : styles.playButtonActive,
            SHADOWS.medium
          ]}
          onPress={togglePlay}
          activeOpacity={0.8}
        >
          {isPlaying ? (
            <Pause size={32} color={COLORS.white} fill={COLORS.white} />
          ) : (
            <Play size={32} color={COLORS.white} fill={COLORS.white} />
          )}
          <Text style={styles.playButtonText}>
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'Outfit_700Bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.accent,
    fontFamily: 'Outfit_400Regular',
    marginTop: -2,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
    justifyContent: 'center',
  },
  section: {
    marginVertical: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(11, 45, 114, 0.05)',
    marginVertical: SPACING.md,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 30,
    marginTop: SPACING.lg,
    alignSelf: 'center',
    minWidth: 160,
  },
  playButtonActive: {
    backgroundColor: COLORS.primary,
  },
  pauseButtonActive: {
    backgroundColor: COLORS.accent,
  },
  playButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Outfit_700Bold',
    marginLeft: SPACING.sm,
    letterSpacing: 1,
  },
});

export default MainScreen;
