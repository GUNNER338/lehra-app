import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';
import * as Haptics from 'expo-haptics';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const ScaleSelector = ({ scale, onIncrease, onDecrease }) => {
  const handleIncrease = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onIncrease();
  };

  const handleDecrease = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onDecrease();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Scale</Text>
      <View style={styles.selectorRow}>
        <TouchableOpacity 
          style={[styles.button, SHADOWS.medium]} 
          onPress={handleDecrease}
          activeOpacity={0.7}
        >
          <ChevronLeft size={32} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.scaleDisplay}>
          <Text style={styles.scaleText}>{scale}</Text>
          {scale !== 'D#' && (
            <Text style={styles.warningText}>Muted (Available in D#)</Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.button, SHADOWS.medium]} 
          onPress={handleIncrease}
          activeOpacity={0.7}
        >
          <ChevronRight size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.glass,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  label: {
    fontSize: 13,
    color: COLORS.accent,
    fontFamily: 'Outfit_700Bold',
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleDisplay: {
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.lg,
  },
  scaleText: {
    fontSize: 64,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'Outfit_700Bold',
    lineHeight: 74,
  },
  warningText: {
    fontSize: 10,
    color: COLORS.error,
    fontFamily: 'Outfit_400Regular',
    marginTop: -4,
    fontWeight: '600',
  }
});

export default ScaleSelector;
