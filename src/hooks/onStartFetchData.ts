import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserRecipeListState } from "../redux/actions";
import { firebaseApp } from "../constants/Firebase";
import axios from "axios";
import { getCurrentUser } from "../db/db";

export default function getCacheLoadData() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const dispatch = useDispatch();

  // Attempt to authenticate user
  React.useLayoutEffect(() => {
    function loadData() {
      try {
        SplashScreen.preventAutoHideAsync();

        // If authentication passes, setUser
        // with currentUser
        firebaseApp.auth().onAuthStateChanged((user) => {
          const currentUser = {
            id: user?.uid,
            username: user?.email,
            image_url: user?.photoURL,
          };
          if (user !== null) {
            dispatch(setUser(currentUser));
            getCurrentUser(currentUser)
              .then((resp) => dispatch(setUserRecipeListState(resp.recipes)))
              .catch((err: Error) => console.log(err));
          }
        });
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
