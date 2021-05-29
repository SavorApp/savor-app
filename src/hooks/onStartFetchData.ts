import * as SplashScreen from 'expo-splash-screen';
import React from "react";
import axios from "axios";

export default function getCacheLoadData() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // TODO: Load any resources or data that we need prior to rendering the app
  React.useLayoutEffect(() => {
    async function loadData() {
      try {
        SplashScreen.preventAutoHideAsync();

        // TODO: 
        // - Get cached data or,
        // - Make appropriate API requests
        
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadData();
  }, []);

  return isLoadingComplete;
}
