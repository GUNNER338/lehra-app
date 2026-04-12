import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList, Animated } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';
import { ChevronDown } from 'lucide-react-native';

const Dropdown = ({ label, options, selectedValue, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={[styles.dropdownButton, SHADOWS.soft]} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>{selectedValue}</Text>
        <ChevronDown size={20} color={COLORS.primary} opacity={0.5} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, SHADOWS.medium]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.optionItem,
                    selectedValue === item && styles.selectedOption
                  ]} 
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedValue === item && styles.selectedOptionText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'Outfit_400Regular',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  selectedText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: 'Outfit_400Regular',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    maxHeight: '60%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: COLORS.background,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'Outfit_700Bold',
  },
  optionItem: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  selectedOption: {
    backgroundColor: COLORS.primary + '10',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: 'Outfit_400Regular',
  },
  selectedOptionText: {
    fontWeight: '700',
    color: COLORS.accent,
  },
});

export default Dropdown;
