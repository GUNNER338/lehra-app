import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';
import * as Haptics from 'expo-haptics';
import { Plus, Minus } from 'lucide-react-native';

const TempoSelector = ({ tempo, setTempo }) => {
  const MIN_TEMPO = 70;
  const MAX_TEMPO = 200;
  const STEP = 5;

  const handleIncrease = () => {
    if (tempo < MAX_TEMPO) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTempo(prev => Math.min(prev + STEP, MAX_TEMPO));
    }
  };

  const handleDecrease = () => {
    if (tempo > MIN_TEMPO) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTempo(prev => Math.max(prev - STEP, MIN_TEMPO));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tempo (BPM)</Text>
      
      <View style={styles.stepperRow}>
        <TouchableOpacity 
          style={[styles.button, SHADOWS.light]} 
          onPress={handleDecrease}
          activeOpacity={0.7}
          disabled={tempo <= MIN_TEMPO}
        >
          <Minus size={28} color={tempo <= MIN_TEMPO ? COLORS.divider : COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.displayContainer}>
          <Text style={styles.tempoValue}>{tempo}</Text>
          <Text style={styles.bpmLabel}>BPM</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, SHADOWS.light]} 
          onPress={handleIncrease}
          activeOpacity={0.7}
          disabled={tempo >= MAX_TEMPO}
        >
          <Plus size={28} color={tempo >= MAX_TEMPO ? COLORS.divider : COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: SPACING.md,
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: 'Outfit_700Bold',
    marginBottom: SPACING.lg,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  displayContainer: {
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.xl,
  },
  tempoValue: {
    fontSize: 62,
    fontWeight: '900',
    color: COLORS.accent,
    fontFamily: 'Outfit_700Bold',
    lineHeight: 62,
    includeFontPadding: false,
  },
  bpmLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Outfit_400Regular',
    marginTop: -2,
    letterSpacing: 2,
    fontWeight: '600',
  },
});

export default TempoSelector;
