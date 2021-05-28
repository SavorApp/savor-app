import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import getCacheLoadData from "./src/hooks/onStartFetchData";
import useColorScheme from "./src/hooks/useColorScheme"
import Navigation from "./src/navigation"

export default function App() {
  const isLoadingComplete = getCacheLoadData();
  const colorScheme = useColorScheme();

  // Show splash screen while data is loading
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
