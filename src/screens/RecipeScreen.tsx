import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import HTML from "react-native-render-html";
import Constants from "expo-constants";
import axios from "axios";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import LoadingRecipeInfo from "../components/loadingRecipeInfo";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";

const _screen = Dimensions.get("screen");

export interface RecipeScreenProps {
  navigation: StackNavigationProp<SavoredListStackParamList, "RecipeScreen">;
  route: RouteProp<{ params: { recipeId: string } }, "params">;
}

const API_KEY = Constants.manifest.extra?.SPOONACULAR_API_KEY;
const RECIPE_INFO_BASE_URL = `https://api.spoonacular.com/recipes/`;

export default function RecipeScreen({ route, navigation }: RecipeScreenProps) {
  const { recipeId } = route.params;
  const ENDPOINT = `${recipeId}/information?apiKey=${API_KEY}&includeNutrition=false`;

  const leaveRecipeScreen = useSelector<RootState, LeaveRecipeScreenState>(
    (state) => state.leaveRecipeScreenState
  );
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
  const [showSummary, setShowSummary] = React.useState(false);
  const [showIngredients, setShowIngredients] = React.useState(false);
  const [showInstructions, setShowInstructions] = React.useState(false);
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

  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    Satisfy: require("../../assets/fonts/Satisfy-Regular.ttf"),
  });

  // Listen to leaveRecipeScreen global state, goBack to SavoredListScreen if true
  React.useEffect(() => {
    if (leaveRecipeScreen.leave) {
      navigation.popToTop();
    }
  }, [leaveRecipeScreen]);

  // Filter through an array of ingredient name to remove duplicates and set the display
  function Ingredients({ ingredients }: { ingredients: Ingredient[] }) {
    let idx = 0;
    const filteredIngredients = Array.from(
      new Set(ingredients.map((ing) => ing.name))
    ).map((name) => {
      return ingredients.find((ing) => ing.name === name);
    });

    return (
      <View style={{ marginTop: 4 }}>
        {filteredIngredients.map((ing) => {
          idx++;
          return (
            <View
              key={"c_" + idx.toString()}
              style={{ ...styles.ingredientContainer, marginTop: 8 }}
            >
              <Text key={"i_" + idx.toString()} style={styles.ingredient}>
                {ing?.name}
              </Text>
              <Text key={"m_" + idx.toString()} style={styles.measurement}>
                ({ing!.measures.metric.amount}
                {ing!.measures.metric.unitShort &&
                  " " + ing!.measures.metric.unitShort}
                )
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  return isInfoLoading && fontsLoaded ? (
    <LoadingRecipeInfo recipeId={recipeId} />
  ) : (
    recipeInfo && (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>{recipeInfo.title}</Text>
          <View style={styles.contentContainer}>
            <ScrollView style={styles.scrollView}>
              <TouchableOpacity
                onPress={() => {
                  setShowSummary(!showSummary);
                }}
                activeOpacity={0.8}
              >
                <View style={styles.accordion}>
                  <Text style={styles.subTitle}>Summary</Text>
                  <Ionicons
                    name={
                      showSummary ? "chevron-up-sharp" : "chevron-down-sharp"
                    }
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              {showSummary && (
                <HTML
                  tagsStyles={{
                    div: { fontSize: 18, lineHeight: 28, marginTop: 12 },
                    a: { fontSize: 18 },
                  }}
                  source={{ html: `<div>${recipeInfo.summary} </div>` }}
                />
              )}
              <TouchableOpacity
                style={styles.touchableHeader}
                onPress={() => {
                  setShowIngredients(!showIngredients);
                }}
                activeOpacity={0.8}
              >
                <View style={styles.accordion}>
                  <Text style={styles.subTitle}>Ingredients</Text>
                  <Ionicons
                    name={
                      showIngredients
                        ? "chevron-up-sharp"
                        : "chevron-down-sharp"
                    }
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              {showIngredients && (
                <Ingredients ingredients={recipeInfo.ingredients} />
              )}
              <TouchableOpacity
                style={styles.touchableHeader}
                onPress={() => {
                  setShowInstructions(!showInstructions);
                }}
                activeOpacity={0.8}
              >
                <View style={styles.accordion}>
                  <Text style={styles.subTitle}>Instructions</Text>
                  <Ionicons
                    name={
                      showInstructions
                        ? "chevron-up-sharp"
                        : "chevron-down-sharp"
                    }
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              {showInstructions && (
                <>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      marginTop: 12,
                    }}
                  >
                    Preparation time:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {recipeInfo.readyInMinutes} min
                    </Text>
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Servings:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {recipeInfo.servings}
                    </Text>
                    {"\n"}
                  </Text>
                  <HTML
                    tagsStyles={{
                      div: { fontSize: 18, lineHeight: 28 },
                      ol: { fontSize: 18 },
                      li: { fontSize: 18, marginTop: -5 },
                      a: { fontSize: 18 },
                    }}
                    source={{ html: `<div>${recipeInfo.instructions}</div>` }}
                  />
                </>
              )}
              <Text>{"\n\n\n"}</Text>
            </ScrollView>
          </View>
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
                <MaterialCommunityIcons name="alpha-v-circle" color="green" />
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
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colorPalette.background,
  },

  subContainer: {
    // justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.93,
    height: _screen.height * 0.68,
    borderRadius: 15,
    // backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  title: {
    margin: 8,
    marginTop: 30,
    fontSize: 25,
    fontWeight: "bold",
    // color: colorPalette.background,
    textAlign: "center",
    fontFamily: "OpenSans",
  },

  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  touchableHeader: {
    marginTop: 30,
  },

  accordion: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  contentContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.93,
    height: _screen.height * 0.68,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  scrollView: {
    padding: 8,
    marginVertical: Platform.OS === "android" ? 12 : 0,
    width: _screen.width * 0.93,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  ingredientContainer: {
    flex: 1,
    flexDirection: "row",
  },

  ingredient: {
    justifyContent: "flex-start",
    width: "65%",
    fontSize: 18,
  },

  measurement: {
    justifyContent: "flex-start",
    width: "35%",
    fontSize: 18,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    marginHorizontal: 16,
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
