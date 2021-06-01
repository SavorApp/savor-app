import * as SplashScreen from 'expo-splash-screen';
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions"
import { firebaseApp } from '../constants/Firebase';
import axios from "axios";

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


            // TODO: WRITE TO DB
            
            // - Get user's UserRecipeList & dispatch
            //   - axios API call to recipe table with currentUser.id or currentUser.email
            //   - const resp = await axios.post();
            //   - resp.data should look like {userId: USER_ID, userRecipeList: UserRecipe[]}
            //   - dispatch(setUserRecipeListState(resp.data))

            // - Get user's filters & dispatch
            //   - axios API call to filters table with currentUser.id or currentUser.email
            //   - const resp = await axios.post();
            //   - resp.data should look like {userId: USER_ID, filters: Filters}
            //   - dispatch(setFilters(resp.data))
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
