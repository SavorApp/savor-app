import * as SplashScreen from "expo-splash-screen";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserRecipeList, setFilters } from "../redux/actions";
import { firebaseApp } from "../constants/Firebase";
import { getUserDb } from "../db/db";

export default function getCacheLoadData() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const filtersState = useSelector<RootState, FiltersState>(
    (state) => state.filtersState
  );

  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const dispatch = useDispatch();

  // Attempt to authenticate user
  React.useLayoutEffect(() => {
    function loadData() {
      try {
        SplashScreen.preventAutoHideAsync();

        // If authentication passes, setUser, setUserRecipeList, setFilters
        firebaseApp.auth().onAuthStateChanged((user) => {
          if (user) {
            const currentUser = {
              id: user.uid,
              username: user.email,
            };
            // Cache access-token on mobile storage
            cacheAccessToken(user.getIdToken());
            // Set gloabal state
            dispatch(setUser(currentUser));
            getUserDb(currentUser)
              .then((resp) => {
                // If we get a successful response...
                if (resp) {
                  // if recipes has an array of any length
                  if (resp.recipes) {
                    dispatch(setUserRecipeList(resp.recipes));
                  }
                  // if we have a filters record for the user
                  if (resp.filters[0]) {
                    dispatch(setFilters(resp.filters[0]));
                  }
                }
              })
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

  async function cacheAccessToken(
    PromisedAccessToken: Promise<string> | undefined
  ) {
    if (PromisedAccessToken) {
      const accessToken = await PromisedAccessToken;
      try {
        await AsyncStorage.setItem("access-token", accessToken);
      } catch (err) {
        // Handle failed asyncStorage error
      }
    } else {
      // Handle undefined Promise
    }
  }

  return isLoadingComplete;
}
