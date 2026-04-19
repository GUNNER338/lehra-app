import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';
import { ChevronDown, Check } from 'lucide-react-native';

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
        style={[styles.dropdownButton, SHADOWS.light]} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.selectedText}>{selectedValue}</Text>
        <ChevronDown size={20} color={COLORS.accent} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, SHADOWS.premium]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <View style={styles.modalHandle} />
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.listContent}
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
                  {selectedValue === item && (
                    <Check size={18} color={COLORS.accent} />
                  )}
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
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: 'Outfit_700Bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '700',
    paddingLeft: 4,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md + 2,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  selectedText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: 'Outfit_400Regular',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 35, 126, 0.4)', // Themed overlay
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '70%',
    paddingBottom: SPACING.xxl,
  },
  modalHeader: {
    padding: SPACING.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.divider,
    borderRadius: 2,
    position: 'absolute',
    top: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'Outfit_700Bold',
    marginTop: 8,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderRadius: 16,
    marginVertical: 4,
  },
  selectedOption: {
    backgroundColor: COLORS.primary + '08',
  },
  optionText: {
    fontSize: 17,
    color: COLORS.primary,
    fontFamily: 'Outfit_400Regular',
  },
  selectedOptionText: {
    fontWeight: '700',
    color: COLORS.accent,
  },
});

export default Dropdown;
