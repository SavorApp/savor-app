import React, {useEffect} from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import getCacheLoadData from "./src/hooks/onStartFetchData";
import useColorScheme from "./src/hooks/useColorScheme"
import Navigation from "./src/navigation"
import {firebaseApp} from "./src/constants/Firebase"

export default function App() {
  const isLoadingComplete = getCacheLoadData();
  const colorScheme = useColorScheme();


  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => console.log(user));
  },[])
  

  // Show splash screen while data is loading
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
