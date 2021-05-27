import * as SplashScreen from 'expo-splash-screen';
import {useState, useEffect} from "react";
import axios from "axios";

export default function getCacheLoadData() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // TODO: Load any resources or data that we need prior to rendering the app
  useEffect(() => {
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
