import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorPalette, shadowStyle } from "../constants/Styling";
import { INGS_TO_EXCLUDE } from "../constants/IngredientsToExclude";
import { firebaseApp } from "../constants/Firebase";
import {
  removeUser,
  resetUserRecipeList,
  resetFilters,
} from "../redux/actions/index";
import { useFonts } from "expo-font";

const _screen = Dimensions.get("screen");

interface CounterObj {
  key: number;
  name: string;
  count: number;
}

export interface ChefScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "ChefScreen">;
}

export default function ChefScreen({ navigation }: ChefScreenProps) {
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const dispatch = useDispatch();
  const [blockLogout, setBlockLogout] = React.useState(false);

  function Metrics({ recipeList }: { recipeList: UserRecipe[] }) {
    const savoredRecipes = recipeList.filter((rcp) => {
      return rcp.isSavored;
    });

    // Object to contain overall counts for cuisines
    const cuisineCount: CountMap = {};
    const cuisineArray: CounterObj[] = [];
    // Object to contain overall counts for each ingredient
    const ingredientsCount: CountMap = {};
    const ingredientsArray: CounterObj[] = [];

    // Index for generating keys
    let idx: number;

    // Generate counts for each cuisine in user's UserRecipe list
    for (const rcp of savoredRecipes) {
      // Do not include "World Food" in cuisine metrics
      if (rcp.cuisine !== "World Food") {
        if (cuisineCount[rcp.cuisine]) {
          cuisineCount[rcp.cuisine]++;
        } else {
          cuisineCount[rcp.cuisine] = 1;
        }
      }
    }
    idx = 0;
    // Generate cuisine Array based on counts object
    for (const cuisine in cuisineCount) {
      cuisineArray.push({
        key: idx,
        name: cuisine,
        count: cuisineCount[cuisine],
      });
      idx++;
    }
    // Sort by descending count
    cuisineArray.sort((a: CounterObj, b: CounterObj) => {
      return b.count - a.count;
    });

    // Generate counts for each ingredient for each recipe in user's UserRecipe list
    for (const idx in savoredRecipes) {
      savoredRecipes[idx].ingredients.forEach((ing) => {
        let skip = false;
        // Skip any ingredients that are in INGS_TO_EXCLUDE
        // (Skipped if exIng is a sub-string of ing)
        for (const exIng of INGS_TO_EXCLUDE) {
          if (ing.includes(exIng)) {
            skip = true;
          }
        }
        if (!skip) {
          if (ingredientsCount[ing]) {
            ingredientsCount[ing]++;
          } else {
            ingredientsCount[ing] = 1;
          }
        }
      });
    }
    idx = 0;
    // Generate ingredients Array based on counts object
    for (const ing in ingredientsCount) {
      ingredientsArray.push({
        key: idx,
        name: ing,
        count: ingredientsCount[ing],
      });
      idx++;
    }
    // Sort by descending count
    ingredientsArray.sort((a: CounterObj, b: CounterObj) => {
      return b.count - a.count;
    });

    return (
      <View>
        <View style={{ ...styles.borderline, marginTop: 30 }} />
        <Text style={styles.subTitle2}>Taste Profile</Text>
        {cuisineArray[0] && (
          <Text style={styles.caption}>
            So far, you have savored
            <Text style={{ fontFamily: "OpenSansBold", }}> {cuisineArray.length} </Text>
            cuisine type(s). Your most savored cuisine is
            <Text style={{ fontFamily: "OpenSansBold", }}> {cuisineArray[0].name}</Text>
            {cuisineArray[1] ? (
              <Text>
                {" "}
                but, it looks like
                <Text style={{ fontFamily: "OpenSansBold", }}>
                  {" "}
                  {cuisineArray[1].name}{" "}
                </Text>
                food is a close second!
              </Text>
            ) : (
              <Text>.</Text>
            )}
          </Text>
        )}
        <View style={{ ...styles.borderline, marginTop: 45 }} />
        <Text style={styles.subTitle2}>Top Ingredients</Text>
        {ingredientsArray.map((ingObj) => {
          if (ingObj.count >= 3) {
            return (
              <Text
                style={{ ...styles.caption, fontStyle: "normal" }}
                key={"i_" + ingObj.key.toString()}
              >
                {ingObj.name}: {ingObj.count}
              </Text>
            );
          }
        })}
      </View>
    );
  }

  function handleLogout() {
    setBlockLogout(true);
    //Log out chef with firebase
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        // Remove cached access-token on mobile storage
        removeCachedAccessToken();
        // - Update global state
        dispatch(removeUser());
        dispatch(resetUserRecipeList());
        dispatch(resetFilters());
        setBlockLogout(false);
      })
      .catch((err: { code: string; message: string }) => {
        Alert.alert(
          "Internal Error 🤕",
          "Sorry for the inconvenience, please try again later."
        );
        setBlockLogout(false);
      });
  }

  async function removeCachedAccessToken() {
    try {
      await AsyncStorage.removeItem("access-token");
    } catch (err) {
      // Handle failed asyncStorage removal error
    }
  }
  // Load fonts
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
    Satisfy: require("../../assets/fonts/Satisfy-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Welcome Chef</Text>
          <Text style={styles.username}>{userState.user.username}</Text>
          <View style={styles.profileContainer}>
            <ScrollView style={styles.scrollView}>
              <Metrics recipeList={userRecipeListState.userRecipeList} />
              <Text>{"\n\n\n"}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colorPalette.background,
  },

  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.93,
    height: _screen.height * 0.7,
    borderRadius: 15,
    marginTop: 120,
    ...shadowStyle,
  },

  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.93,
    height: _screen.height * 0.7,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  title: {
    justifyContent: "flex-start",
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Satisfy",
    // fontWeight: "bold",
    // marginTop: -50,
    // color: colorPalette.background,
  },

  username: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 18,
    // fontFamily: "Satisfy",
    // fontWeight: "bold",
    // color: colorPalette.popDark,
  },

  scrollView: {
    padding: 8,
    marginVertical: Platform.OS === "android" ? 12 : 0,
    width: _screen.width * 0.93,
    borderRadius: 15,
  },

  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subTitle2: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 6,
    height: 45,
    fontFamily: "OpenSans",
  },

  caption: {
    // fontStyle: "italic",
    fontSize: 20,
    fontFamily: "OpenSans",
  },
  borderline: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    opacity: 0.2,
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    marginBottom: 10,
  },
});
