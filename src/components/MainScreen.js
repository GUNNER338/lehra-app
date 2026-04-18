import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import ScaleSelector from './ScaleSelector';
import Dropdown from './Dropdown';
import TempoSelector from './TempoSelector';
import LehraEngine from './LehraEngine';

import { fetchRaagData, fetchScaleMapping } from '../utils/api';

const SCALES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const INSTRUMENTS = ['Harmonium'];
const RAAGS = ['Yaman'];

const MainScreen = () => {
  const engineRef = useRef(null);
  const [isEngineReady, setIsEngineReady] = useState(false);
  const [scaleIndex, setScaleIndex] = useState(0);
  const [instrument, setInstrument] = useState(INSTRUMENTS[0]);
  const [raag, setRaag] = useState(RAAGS[0]);
  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backendRaagData, setBackendRaagData] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await fetchRaagData('yaman');
        setBackendRaagData(data);
        console.log('Backend Data Loaded:', data.raag);
      } catch (err) {
        console.error('Failed to load raag from backend, using local fallback');
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (isEngineReady) {
      engineRef.current?.setBpm(tempo);
    }
  }, [tempo, isEngineReady]);

  const togglePlay = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    if (!isPlaying) {
      if (backendRaagData) {
        // Use integrated backend data
        engineRef.current?.playPattern(raag, SCALES[scaleIndex], tempo, backendRaagData.notes);
      } else {
        // Fallback to local data
        engineRef.current?.play(raag, SCALES[scaleIndex], tempo);
      }
    } else {
      engineRef.current?.stop();
    }
    
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

        {!isEngineReady && (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator color={COLORS.primary} size="small" />
            <Text style={[styles.headerSubtitle, { marginTop: 5 }]}>Loading Harmonium...</Text>
          </View>
        )}

        <TouchableOpacity 
          style={[
            styles.playButton, 
            isPlaying ? styles.pauseButtonActive : styles.playButtonActive,
            (!isEngineReady) && { opacity: 0.5 },
            SHADOWS.medium
          ]}
          onPress={togglePlay}
          activeOpacity={0.8}
          disabled={!isEngineReady}
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

      <LehraEngine 
        ref={engineRef} 
        onLoad={() => setIsEngineReady(true)} 
      />
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
