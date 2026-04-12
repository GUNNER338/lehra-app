import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';
import * as Haptics from 'expo-haptics';
import { ChevronUp, ChevronDown } from 'lucide-react-native';

const ScaleSelector = ({ scale, onIncrease, onDecrease }) => {
  const handleIncrease = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onIncrease();
  };

  const handleDecrease = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDecrease();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Scale</Text>
      <View style={styles.selectorRow}>
        <TouchableOpacity 
          style={[styles.button, SHADOWS.soft]} 
          onPress={handleDecrease}
          activeOpacity={0.7}
        >
          <ChevronDown size={28} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.scaleDisplay}>
          <Text style={styles.scaleText}>{scale}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, SHADOWS.soft]} 
          onPress={handleIncrease}
          activeOpacity={0.7}
        >
          <ChevronUp size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'Outfit_400Regular',
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleDisplay: {
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.xl,
  },
  scaleText: {
    fontSize: 56,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'Outfit_700Bold',
  },
});

export default ScaleSelector;
