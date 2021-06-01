import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import getCacheLoadData from "./src/hooks/onStartFetchData";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { firebaseApp } from "./src/constants/Firebase";

function App() {
  const isLoadingComplete = getCacheLoadData();
  const colorScheme = useColorScheme();

  const dispatch = useDispatch();

  // If already logged in - set user
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      const currentUser = {
        id: user?.uid,
        username: user?.email,
        image_url: user?.photoURL,
      };
      if (user !== null) {
        dispatch({ type: "LOGIN_USER", payload: currentUser });
      }
    });
  }, []);

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

// This exist so that we can communicate with our global state in the root - a replacement for "index.ts" if you will.
export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
