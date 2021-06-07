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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import HTML from "react-native-render-html";
import Constants from "expo-constants";
import axios from "axios";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import LoadingRecipeInfo from "../components/LoadingRecipeInfo";

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
    ingredients: [],
    veryHealthy: true,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    healthScore: 0,
    servings: 0,
    readyInMinutes: 0,
    diets: [""],
  });
  const [isInfoLoading, setIsInfoLoading] = React.useState(true);

  async function fetchRecipeInfo() {
    try {
      const resp = await axios.get(RECIPE_INFO_BASE_URL + ENDPOINT);
      const fetchedRecipe = resp.data;
      setRecipeInfo({
        title: fetchedRecipe.title,
        instructions: fetchedRecipe.instructions,
        summary: fetchedRecipe.summary,
        ingredients: fetchedRecipe.extendedIngredients,
        veryHealthy: fetchedRecipe.veryHealthy,
        vegetarian: fetchedRecipe.vegetarian,
        vegan: fetchedRecipe.vegan,
        glutenFree: fetchedRecipe.glutenFree,
        dairyFree: fetchedRecipe.dairyFree,
        healthScore: fetchedRecipe.healthScore,
        servings: fetchedRecipe.servings,
        readyInMinutes: fetchedRecipe.readyInMinutes,
        diets: fetchedRecipe.diets,
      });
      setIsInfoLoading(false);
    } catch {
      Alert.alert(
        "Server Error 🤕",
        "Sorry for the inconvenience, please try again later."
      );
      navigation.goBack();
    }
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

  function Ingredients({ ingredients }: { ingredients: Ingredient[] }) {
    let idx = 0;
    return (
      <View>
        {ingredients.map((ing) => {
          idx++;
          return (
            <View
              key={"c_" + ing.id.toString() + idx.toString()}
              style={styles.ingredientContainer}
            >
              <Text
                key={"i_" + ing.id.toString() + idx.toString()}
                style={styles.ingredient}
              >
                {ing.name}
              </Text>
              <Text
                key={"m_" + ing.id.toString() + idx.toString()}
                style={styles.measurement}
              >
                ({ing.measures.metric.amount}
                {ing.measures.metric.unitShort &&
                  " " + ing.measures.metric.unitShort}
                )
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

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
              <Ingredients ingredients={recipeInfo.ingredients} />
              <Text style={styles.subTitle}>Instructions</Text>
              <HTML source={{ html: recipeInfo.instructions }} />
              <Text style={styles.subTitle}>Additional Information</Text>
              <Text>Preparation time: {recipeInfo.readyInMinutes} min</Text>
              <Text>Servings: {recipeInfo.servings}</Text>
              <View style={styles.tagsContainer}>
                {recipeInfo.veryHealthy && (
                  <View style={styles.singleTagContainer}>
                    <MaterialCommunityIcons
                      name="food-apple-outline"
                      color="green"
                    />
                    <Text style={styles.tag}>Healthy Choice</Text>
                  </View>
                )}
                {recipeInfo.vegetarian && (
                  <View style={styles.singleTagContainer}>
                    <MaterialCommunityIcons
                      name="alpha-v-circle-outline"
                      color="green"
                    />
                    <Text style={styles.tag}>Vegetarian</Text>
                  </View>
                )}
                {recipeInfo.vegan && (
                  <View style={styles.singleTagContainer}>
                    <MaterialCommunityIcons
                      name="alpha-v-circle"
                      color="green"
                    />
                    <Text style={styles.tag}>Vegan</Text>
                  </View>
                )}
                {recipeInfo.glutenFree && (
                  <View style={styles.singleTagContainer}>
                    <Text style={[styles.tag, { fontWeight: "bold" }]}>
                      Gluten Free
                    </Text>
                  </View>
                )}
                {recipeInfo.dairyFree && (
                  <View style={styles.singleTagContainer}>
                    <Text style={[styles.tag, { fontWeight: "bold" }]}>
                      Dairy Free
                    </Text>
                  </View>
                )}
              </View>
              
              {/* Hesitant to include this because we may not want to show
              that a recipe is NOT veryHealthy, or NOT anyother things. It may
              make users feel bad when looking at recipes. I think we
              should stay as unbiased as possible and, only show tags for
              when they are true. I've included a Healthy choice tag */}
              {/* <Text style={styles.extra}>
                VeryHealthy: {recipeInfo.veryHealthy ? "✅" : "❌"}
              </Text>
              <Text style={styles.extra}>
                Vegetarian: {recipeInfo.vegetarian ? "✅" : "❌"}
              </Text>
              <Text style={styles.extra}>
                Vegan: {recipeInfo.vegan ? "✅" : "❌"}
              </Text>
              <Text style={styles.extra}>
                Dairy-Free: {recipeInfo.dairyFree ? "✅" : "❌"}
              </Text>

              <Text style={styles.extra}>
                Health score: {recipeInfo.healthScore}
              </Text>
              <Text style={styles.extra}>
                Prep Time: {recipeInfo.readyInMinutes} min
              </Text>
              <Text style={styles.extra}>Diets: {recipeInfo.diets}</Text> */}

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
    margin: 8,
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

  ingredientContainer: {
    flex: 1,
    flexDirection: "row",
  },

  ingredient: {
    justifyContent: "flex-start",
    width: "65%",
  },

  measurement: {
    justifyContent: "flex-start",
    width: "35%",
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },

  singleTagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3,
    marginTop: 3,
    padding: 4,
    borderRadius: 8,
    backgroundColor: colorPalette.trimLight,
  },

  tag: {
    fontSize: 10,
  },
});
