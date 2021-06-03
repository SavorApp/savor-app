import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserRecipeListState } from "../redux/actions";
import { firebaseApp } from "../constants/Firebase";
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
            // TODO:
            // - Get cached data or,
            // - Make appropriate API requests
            console.log(currentUser.id);
            async function getCurrentUser() {
              const user = await axios(
                "https://savored-server.herokuapp.com/",
                {
                  method: "POST",
                  data: {
                    query: `
                 query getUser($_id: String!)
                 {user(_id:$_id) {
                  _id
                  username
                  recipes{
                  recipe_id
                  title
                  is_savored
                  summary
                   }         
                 }}
                    `,
                    variables: {
                      _id: currentUser.id,
                    },
                  },
                }
              );
              console.log(user.data.data.user?.recipes);
              if (Array.isArray(user.data.data.user?.recipes)) {
                dispatch(setUserRecipeListState(user.data.data.user?.recipes));
              }
            }
            getCurrentUser();
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
