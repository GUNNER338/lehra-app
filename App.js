import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';
import { 
  useFonts, 
  Outfit_400Regular, 
  Outfit_700Bold, 
  Outfit_800ExtraBold 
} from '@expo-google-fonts/outfit';
import * as SplashScreenNative from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreenCustom from './src/components/SplashScreen';
import MainScreen from './src/components/MainScreen';

// Keep the splash screen visible while we fetch resources
SplashScreenNative.preventAutoHideAsync();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  let [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
    Outfit_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the native splash screen and show our custom one
      SplashScreenNative.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const content = showSplash ? (
    <SplashScreenCustom onFinish={() => setShowSplash(false)} />
  ) : (
    <MainScreen />
  );

  return (
    <SafeAreaProvider>
      {content}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
