import React from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  borderLine,
  font,
} from "../constants/Styling";
import { INGS_TO_EXCLUDE } from "../constants/IngredientsToExclude";
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
  // Load fonts
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
    Satisfy: require("../../assets/fonts/Satisfy-Regular.ttf"),
  });

  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );


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
        <Text style={styles.subTitle}>Taste Profile</Text>
        {cuisineArray[0] && (
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>
              So far, you have savored
              <Text style={{ fontFamily: "OpenSansBold" }}>
                {" "}
                {cuisineArray.length}{" "}
              </Text>
              cuisine type(s). Your most savored cuisine is
              <Text style={{ fontFamily: "OpenSansBold" }}>
                {" "}
                {cuisineArray[0].name}
              </Text>
              {cuisineArray[1] ? (
                <Text>
                  {" "}
                  but, it looks like
                  <Text style={{ fontFamily: "OpenSansBold" }}>
                    {" "}
                    {cuisineArray[1].name}{" "}
                  </Text>
                  food is a close second!
                </Text>
              ) : (
                <Text>.</Text>
              )}
            </Text>
          </View>
        )}
        <View style={styles.borderline} />
        <Text style={styles.subTitle}>Top Ingredients</Text>
        {ingredientsArray.map((ingObj) => {
          if (ingObj.count >= 3) {
            return (
              <Text
                style={styles.caption}
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

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Chef</Text>
          <Text style={styles.username}>{userState.user.username}</Text>
          <View style={styles.borderline} />
        </View>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            <Metrics recipeList={userRecipeListState.userRecipeList} />
            <Text>{"\n\n\n"}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  headerContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: font.SatisfyTitleSize,
    fontFamily: "Satisfy",
    marginVertical: _screen.height * 0.01,
  },

  username: {
    fontSize: font.subTitleSize,
    fontFamily: "OpenSans",
    marginBottom: _screen.height * 0.01,
  },

  contentContainer: {
    flex: 15,
    width: _screen.width * 0.93,
  },

  scrollView: {
  },

  subTitle: {
    fontSize: font.subTitleSize,
    fontFamily: "OpenSans",
    marginBottom: _screen.height * 0.01
  },

  captionContainer: {
    marginBottom: _screen.height * 0.03
  },

  caption: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
    lineHeight: 24,
  },

  borderline: {
    alignSelf: "center",
    ...borderLine,
  },
});
