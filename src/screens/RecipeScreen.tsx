import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Constants from "expo-constants";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import HTML from "react-native-render-html";
import axios from "axios";
import * as recipeJson from "../data/100Recipes.json";
import LoadingRecipeInfo from "../components/loadingRecipeInfo";

const _screen = Dimensions.get("screen");

export interface RecipeScreenProps {
  navigation: StackNavigationProp<RecipeScreenStackParamList, "RecipeScreen">;
  route: RouteProp<{ params: { recipeId: string } }, "params">;
}

const API_KEY = Constants.manifest.extra?.SPOONACULAR_API_KEY;
const RECIPE_INFO_BASE_URL = `https://api.spoonacular.com/recipes/`;

export default function RecipeScreen({ route, navigation }: RecipeScreenProps) {
  const { recipeId } = route.params;
  const ENDPOINT = `${recipeId}/information?apiKey=${API_KEY}&includeNutrition=false`;

  const [recipeInfo, setRecipeInfo] = React.useState<
    RecipeScreenInfo | undefined
  >({
    title: "",
    instructions: "",
    summary: "",
    ingredients: [""], // Change to array with ingredient objects that contain measurement information also
    veryHealthy: true,
    vegetarian: true,
    vegan: true,
    dairyFree: true,
    healthScore: 0,
    prepTime: 0,
    diets: [""],
  });
  const [isInfoLoading, setIsInfoLoading] = React.useState(true);

  async function fetchRecipeInfo() {
    try {
      // const resp = await axios.get(RECIPE_INFO_BASE_URL + ENDPOINT);
      // const fetchedRecipe = resp.data;
      // setRecipeInfo({
      //   title: fetchedRecipe.title,
      //   instructions: fetchedRecipe.instructions,
      //   summary: fetchedRecipe.summary,
      //   ingredients: (
      //     fetchedRecipe.extendedIngredients as Array<Ingredient>
      //   ).map((ing: Ingredient) => {
      //     return ing.name;
      //   }),
      //   veryHealthy: fetchedRecipe.veryHealthy,
      //   vegetarian: fetchedRecipe.vegetarian,
      //   vegan: fetchedRecipe.vegan,
      //   dairyFree: fetchedRecipe.dairyFree,
      //   healthScore: fetchedRecipe.healthScore,
      //   prepTime: fetchedRecipe.readyInMinutes,
      //   diets: fetchedRecipe.diets,
      // });
      // setIsInfoLoading(false);
    } catch {
      Alert.alert(
        "Server Error 🤕",
        "Sorry for the inconvenience, please try again later."
      );
      navigation.goBack();
    }

    // FOR TESTING USE JSON
    // const recipes = recipeJson.recipes;

    // for (let recipe of recipes) {
    //   if (recipe.id === recipeId) {
    //     setRecipeInfo({
    //       title: recipe.title,
    //       instructions: recipe.instructions,
    //       summary: recipe.summary,
    //       ingredients: (recipe.extendedIngredients as Array<Ingredient>).map((ing: Ingredient) => {
    //         return ing.name;
    //       }),
    //       veryHealthy: recipe.veryHealthy,
    //       vegetarian: recipe.vegetarian,
    //       vegan: recipe.vegan,
    //       dairyFree: recipe.dairyFree,
    //       healthScore: recipe.healthScore,
    //       prepTime: recipe.readyInMinutes,
    //       diets: recipe.diets,

    //     })
    // }
    // }
  }

  // On load, fetch Recipe data via Spoonacular API
  React.useEffect(() => {
    fetchRecipeInfo();
  }, []);

  // On navigate away, goBack to SavoredListScreen
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      navigation.goBack();
    });

    return unsubscribe;
  }, [navigation]);

  return isInfoLoading ? (
    <LoadingRecipeInfo recipeId={recipeId} />
  ) : (
    recipeInfo && (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>{recipeInfo.title}</Text>
          <View style={styles.contentContainer}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.subTitle}>Summary</Text>
              <HTML source={{ html: recipeInfo.summary }} />
              <Text style={styles.subTitle}>Ingredients</Text>
              {recipeInfo.ingredients.map((ing) => {
                return <Text>{ing}</Text>;
              })}
              <Text style={styles.subTitle}>Instructions</Text>
              <HTML source={{ html: recipeInfo.instructions }} />
              <Text style={styles.subTitle}>Extra-Information</Text>
              <Text style={styles.ingredients}>
                VeryHealthy: {recipeInfo.veryHealthy ? "✅" : "❌"}
              </Text>
              <Text style={styles.ingredients}>
                Vegetarian: {recipeInfo.vegetarian ? "✅" : "❌"}
              </Text>
              <Text style={styles.ingredients}>
                Vegan: {recipeInfo.vegan ? "✅" : "❌"}
              </Text>
              <Text style={styles.ingredients}>
                Dairy-Free: {recipeInfo.dairyFree ? "✅" : "❌"}
              </Text>

              <Text style={styles.ingredients}>
                Health score: {recipeInfo.healthScore}
              </Text>
              <Text style={styles.ingredients}>
                Prep Time: {recipeInfo.prepTime} min
              </Text>
              <Text style={styles.ingredients}>Diets: {recipeInfo.diets}</Text>
              <Text>{"\n\n\n"}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorPalette.background,
  },

  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.9,
    height: _screen.height * 0.8,
    borderRadius: 30,
    backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },
  title: {
    marginVertical: 8,
    fontSize: 25,
    fontWeight: "bold",
    color: colorPalette.background,
    textAlign: "center",
  },

  summaryBackground: {
    color: "black",
    marginTop: 5,
    textAlign: "center",
    height: _screen.height * 0.6,
  },
  summaryContainer: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 15,
    width: _screen.width * 0.7,
    ...shadowStyle,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.85,
    height: _screen.height * 0.65,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },
  scrollView: {
    padding: 8,
    marginVertical: Platform.OS === "android" ? 12 : 0,
    width: _screen.width * 0.83,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  ingredients: {},
});
