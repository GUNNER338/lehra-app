import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import ScaleSelector from './ScaleSelector';
import Dropdown from './Dropdown';
import TempoSelector from './TempoSelector';

import { fetchRaagData, fetchAllRaags, getAudioTempoUrl } from '../utils/api';

const SCALES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const INSTRUMENTS = ['Dilruba'];
const TAALS = ['Teentaal'];

const MainScreen = () => {
  const [scaleIndex, setScaleIndex] = useState(0);
  const [instrument, setInstrument] = useState(INSTRUMENTS[0]);
  const [raagList, setRaagList] = useState(['Yaman']);
  const [raag, setRaag] = useState('Yaman');
  const [taal, setTaal] = useState(TAALS[0]);
  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const list = await fetchAllRaags();
        if (list && list.length > 0) {
          setRaagList(list.map(r => r.charAt(0).toUpperCase() + r.slice(1)));
        }
        await fetchRaagData('yaman');
      } catch (err) {
        console.error('Failed to load initial data');
      }
    };
    loadInitialData();

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const stopSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      } catch (e) {
        console.error('Error stopping sound', e);
      }
    }
    setIsPlaying(false);
  };

  const playSound = async (targetTempo) => {
    setIsProcessing(true);
    try {
      if (soundRef.current) {
        // If already playing, just update the rate for instant feedback
        const rate = (targetTempo || tempo) / 120;
        await soundRef.current.setRateAsync(rate, true);
        setIsPlaying(true);
        setIsProcessing(false);
        return;
      }

      const url = getAudioTempoUrl(120); // Always fetch the base 120 BPM sample
      console.log('Loading base audio from:', url);

      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { 
          shouldPlay: true, 
          isLooping: true,
          rate: (targetTempo || tempo) / 120,
          shouldCorrectPitch: true, // IMPORTANT: Keeps Dilruba in D# while changing speed
        }
      );
      
      soundRef.current = sound;
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to play sound', error);
      setIsPlaying(false);
    } finally {
      setIsProcessing(false);
    }
  };

  // Real-time tempo update without restarting the sound
  useEffect(() => {
    if (isPlaying && soundRef.current && !isProcessing) {
      const updateRate = async () => {
        const rate = tempo / 120;
        await soundRef.current.setRateAsync(rate, true);
      };
      updateRate();
    }
  }, [tempo]);

  const togglePlay = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (isPlaying) {
      stopSound();
    } else {
      playSound();
    }
  };

  const increaseScale = () => {
    setScaleIndex((prev) => (prev + 1) % SCALES.length);
  };

  const decreaseScale = () => {
    setScaleIndex((prev) => (prev - 1 + SCALES.length) % SCALES.length);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>DHIR DHIR</Text>
            <Text style={styles.headerSubtitle}>MUSIC ACADEMY</Text>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>LEHRA PRO</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentWrapper}>
          <ScaleSelector 
            scale={SCALES[scaleIndex]} 
            onIncrease={increaseScale} 
            onDecrease={decreaseScale} 
          />

          <View style={styles.card}>
            <Dropdown 
              label="Instrument" 
              options={INSTRUMENTS} 
              selectedValue={instrument} 
              onValueChange={setInstrument} 
            />
            
            <Dropdown 
              label="Raag" 
              options={raagList} 
              selectedValue={raag} 
              onValueChange={setRaag} 
            />

            <Dropdown 
              label="Taal" 
              options={TAALS} 
              selectedValue={taal} 
              onValueChange={setTaal} 
            />
          </View>

          <View style={[styles.card, styles.tempoCard]}>
            <TempoSelector tempo={tempo} setTempo={setTempo} />
          </View>

          <TouchableOpacity 
            style={[
              styles.playButton, 
              isPlaying ? styles.pauseButtonActive : styles.playButtonActive,
              (isProcessing) && { opacity: 0.8 },
              SHADOWS.premium
            ]}
            onPress={togglePlay}
            activeOpacity={0.9}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color={COLORS.white} size="large" />
            ) : isPlaying ? (
              <View style={styles.playButtonIconContent}>
                <Pause size={42} color={COLORS.white} fill={COLORS.white} />
                <Text style={styles.playButtonText}>STOP</Text>
              </View>
            ) : (
              <View style={styles.playButtonIconContent}>
                <Play size={42} color={COLORS.white} fill={COLORS.white} />
                <Text style={styles.playButtonText}>PLAY</Text>
              </View>
            )}
          </TouchableOpacity>
          
          {isPlaying && !isProcessing && (
            <Text style={styles.playingText}>Playing Dilruba Lehra in D# </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: SPACING.xl,
    ...SHADOWS.premium,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: SPACING.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
    fontFamily: 'Outfit_700Bold',
    letterSpacing: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.parchment,
    fontFamily: 'Outfit_400Regular',
    letterSpacing: 3,
    marginTop: -2,
    opacity: 0.8,
  },
  headerBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: SPACING.sm,
  },
  headerBadgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  contentWrapper: {
    paddingHorizontal: SPACING.lg,
    marginTop: -SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: SPACING.lg,
    ...SHADOWS.light,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  tempoCard: {
    paddingVertical: SPACING.xl,
  },
  playButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    alignSelf: 'center',
  },
  playButtonIconContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonActive: {
    backgroundColor: COLORS.primary,
  },
  pauseButtonActive: {
    backgroundColor: COLORS.accent,
  },
  playButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
    fontFamily: 'Outfit_700Bold',
    marginTop: SPACING.xs,
    letterSpacing: 2,
  },
  playingText: {
    textAlign: 'center',
    marginTop: SPACING.lg,
    color: COLORS.primary,
    fontFamily: 'Outfit_400Regular',
    fontSize: 14,
    opacity: 0.6,
  }
});

export default MainScreen;
