import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { raags } from '../data/raagData';

// Get the host IP dynamically (e.g., 192.168.1.11)
const debuggerHost = Constants.expoConfig?.hostUri;
const localhost = debuggerHost ? debuggerHost.split(':')[0] : 'localhost';

// Backend runs on port 3000 now as per appConfig
const BASE_URL = Platform.OS === 'android' && !debuggerHost 
  ? 'http://10.0.2.2:3000' 
  : `http://${localhost}:3000`;

export const fetchAllRaags = async () => {
  try {
    return Object.keys(raags);
  } catch (error) {
    console.error('Error getting raag list:', error);
    return ['Yaman'];
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

/**
 * Returns the URL for the tempo-adjusted audio stream.
 * Note: Since the backend streams the file, we can use this URL directly in an Audio player.
 */
export const getAudioTempoUrl = (bpm: number): string => {
  return `${BASE_URL}/audio/tempo?bpm=${bpm}`;
};

export const getBaseUrl = () => BASE_URL;
