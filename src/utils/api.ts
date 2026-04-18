import { Platform } from 'react-native';

// If testing on a physical device, replace '192.168.1.11' with your computer's local IP address
const BASE_URL = 'http://192.168.1.11:5000';

export const fetchRaagData = async (raagName: string) => {
  try {
    const response = await fetch(`${BASE_URL}/raag/${raagName.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching raag data:', error);
    throw error;
  }
};

export const fetchScaleMapping = async (scale: string) => {
  try {
    const response = await fetch(`${BASE_URL}/map-scale?scale=${encodeURIComponent(scale)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching scale mapping:', error);
    throw error;
  }
};
