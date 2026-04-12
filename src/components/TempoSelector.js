import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';
import * as Haptics from 'expo-haptics';
import { Plus, Minus } from 'lucide-react-native';

const TempoSelector = ({ tempo, setTempo }) => {
  const MIN_TEMPO = 40;
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
          style={[styles.button, SHADOWS.soft]} 
          onPress={handleDecrease}
          activeOpacity={0.7}
          disabled={tempo <= MIN_TEMPO}
        >
          <Minus size={28} color={tempo <= MIN_TEMPO ? COLORS.textSecondary : COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.displayContainer}>
          <Text style={styles.tempoValue}>{tempo}</Text>
          <Text style={styles.bpmLabel}>BPM</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, SHADOWS.soft]} 
          onPress={handleIncrease}
          activeOpacity={0.7}
          disabled={tempo >= MAX_TEMPO}
        >
          <Plus size={28} color={tempo >= MAX_TEMPO ? COLORS.textSecondary : COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: SPACING.lg,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Outfit_400Regular',
    marginBottom: SPACING.lg,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
  },
  displayContainer: {
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.xl,
  },
  tempoValue: {
    fontSize: 52,
    fontWeight: '800',
    color: COLORS.accent,
    fontFamily: 'Outfit_700Bold',
    lineHeight: 52,
  },
  bpmLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Outfit_400Regular',
    marginTop: -4,
    letterSpacing: 1,
  },
});

export default TempoSelector;
