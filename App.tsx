import React, {useEffect} from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import getCacheLoadData from "./src/hooks/onStartFetchData";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";

function App() {
  const isLoadingComplete = getCacheLoadData();
  const colorScheme = useColorScheme();

  // Show splash screen while data is loading
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}

// This exist so that we can communicate with our global state in the root
// - A replacement for "index.ts" if you will.
export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
