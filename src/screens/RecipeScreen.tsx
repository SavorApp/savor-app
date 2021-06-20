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
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import HTML from "react-native-render-html";
import Constants from "expo-constants";
import axios from "axios";
import {
  borderLine,
  colorPalette,
  font,
  shadowStyle,
} from "../constants/Styling";
import LoadingRecipeInfo from "../components/LoadingRecipeInfo";
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
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const { recipeId } = route.params;
  const ENDPOINT = `${recipeId}/information?apiKey=${API_KEY}&includeNutrition=false`;

  const leaveRecipeScreen = useSelector<RootState, LeaveRecipeScreenState>(
    (state) => state.leaveRecipeScreenState
  );
  const [recipeInfo, setRecipeInfo] = React.useState<
    RecipeScreenInfo | undefined
  >({
    title: "",
    image: "",
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
        image: fetchedRecipe.image,
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
      <View>
        {filteredIngredients.map((ing) => {
          idx++;
          return (
            <View
              key={"c_" + idx.toString()}
              style={styles.ingredientContainer}
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
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{recipeInfo.title}</Text>
            <View style={styles.borderline} />
            <Image
              source={{ uri: recipeInfo.image || " " }}
              style={styles.image}
              resizeMode="contain"
            />

            <TouchableOpacity
              onPress={() => {
                setShowSummary(!showSummary);
              }}
              activeOpacity={0.8}
            >
              <View style={styles.accordion}>
                <Text style={styles.subTitle}>Summary</Text>
                <Ionicons
                  name={showSummary ? "chevron-up-sharp" : "chevron-down-sharp"}
                  size={24}
                />
              </View>
            </TouchableOpacity>
            {showSummary && (
              <HTML
                tagsStyles={{
                  div: { fontSize: font.contentSize, lineHeight: 24,},
                  b: { fontFamily: "OpenSansBold" },
                  a: { fontSize: font.contentSize, fontFamily: "OpenSans" },
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
                    showIngredients ? "chevron-up-sharp" : "chevron-down-sharp"
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
                    showInstructions ? "chevron-up-sharp" : "chevron-down-sharp"
                  }
                  size={24}
                />
              </View>
            </TouchableOpacity>
            {showInstructions && (
              <>
                <Text style={styles.subHeader}>
                  Preparation time:{" "}
                  <Text style={{ fontFamily: "OpenSans" }}>
                    {recipeInfo.readyInMinutes} min
                  </Text>
                </Text>
                <Text style={styles.subHeader}>
                  Servings:{" "}
                  <Text style={{ fontFamily: "OpenSans" }}>
                    {recipeInfo.servings}
                  </Text>
                  {"\n"}
                </Text>
                <HTML
                  tagsStyles={{
                    div: {
                      fontSize: font.contentSize,
                      lineHeight: 24,
                      fontFamily: "OpenSans",
                    },
                    ol: { fontSize: font.contentSize },
                    a: { fontSize: font.contentSize },
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
              <MaterialCommunityIcons name="food-apple-outline" color="green" />
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
              <Text style={styles.tagBold}>
                Gluten Free
              </Text>
            </View>
          )}
          {recipeInfo.dairyFree && (
            <View style={styles.singleTagContainer}>
              <Text style={styles.tagBold}>
                Dairy Free
              </Text>
            </View>
          )}
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    flex: 12,
    width: _screen.width * 0.93,
  },

  scrollView: {
    paddingTop: _screen.height * 0.01,
  },

  title: {
    fontSize: font.titleSize,
    textAlign: "center",
    fontFamily: "OpenSans",
  },

  image: {
    height: _screen.height * 0.3,
    width: _screen.width * 0.9,
    marginBottom: _screen.height * 0.01,
  },

  borderline: {
    alignSelf: "center",
    ...borderLine,
  },

  accordion: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: _screen.height * 0.01,
  },

  subTitle: {
    fontSize: font.subTitleSize,
    fontFamily: "OpenSansBold",
    marginBottom: _screen.height * 0.01,
  },

  touchableHeader: {
    marginTop: _screen.height * 0.03,
  },

  subHeader: {
    fontSize: font.subHeaderSize,
    fontFamily: "OpenSansBold",
  },

  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },

  ingredient: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
  },

  measurement: {
    justifyContent: "flex-start",
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
  },

  tagsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: _screen.height * 0.01,
  },

  singleTagContainer: {
    flexDirection: "row",
    marginHorizontal: 2,
    padding: 3,
    borderRadius: 8,
    backgroundColor: colorPalette.lightGray,
  },

  tag: {
    fontSize: font.tagSize,
    fontFamily: "OpenSans",
  },

  tagBold: {
    fontSize: font.tagSize,
    fontFamily: "OpenSansBold",
  },

  subContainer: {
    // justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.93,
    height: _screen.height * 0.7,
    borderRadius: 15,
    // backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },
});
