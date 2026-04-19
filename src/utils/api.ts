import { raags } from '../data/raagData';

export const fetchAllRaags = async () => {
  try {
    // Simulating local data access
    return Object.keys(raags);
  } catch (error) {
    console.error('Error getting raag list:', error);
    return ['Yaman']; // Fallback
  }
};

export const fetchRaagData = async (raagName: string) => {
  try {
    const data = raags[raagName.toLowerCase()];
    if (!data) throw new Error('Raag not found');
    return data;
  } catch (error) {
    console.error('Error getting raag data:', error);
    throw error;
  }
};

export const fetchScaleMapping = async (scale: string) => {
  try {
    // Simple mock scale mapping
    return {
      baseScale: scale,
      transposition: 0
    };
  } catch (error) {
    console.error('Error getting scale mapping:', error);
    throw error;
  }
};
