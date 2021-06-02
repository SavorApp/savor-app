import React from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView, Platform  } from "react-native";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import * as recipeJson from "../data/100Recipes.json";
import { Ingredient, RecipeScreenInfo } from "../../types";
import LoadingRecipeInfo from "../components/loadingRecipeInfo";
import HTML from 'react-native-render-html';


const _screen = Dimensions.get("screen");

export default function RecipeScreen({ route }: { route: any }) {
  const { recipeId } = route.params;
  const [recipeInfos, setRecipeInfos] = React.useState<RecipeScreenInfo>({title: "", summary: "",});
  const [isInfoLoading, setIsInfoLoading] = React.useState(true);

  function getRecipeInfos() {
    const recipes = recipeJson.recipes;

    for (let recipe of recipes) {
        if (recipe.id === recipeId) {
          setRecipeInfos({
            title: recipe.title,
            summary: recipe.instructions,
            ingredients: (recipe.extendedIngredients as Array<Ingredient>).map((recipeInfo: Ingredient) => {
              return recipeInfo.name;
            }),

          })
          console.log("HELLO")
      }
    }
  }


  React.useEffect(() => {
    getRecipeInfos();
    setIsInfoLoading(false);

    // Load data
    //isLoading = false
  }, [isInfoLoading])

  // TODO: take recipeId and make API request for Recipe information
  return (
    recipeInfos.title ? 
    <View style={styles.container}>
      <View style={styles.subContainer}>
          <Text style={styles.title}>{recipeInfos.title}</Text>
        <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.subTitle}>Instructions</Text>
          <HTML source={{html: recipeInfos.summary}}/>
          <Text style={styles.subTitle}>Ingredients</Text>
          <Text style={styles.ingredients}>{recipeInfos.ingredients}</Text>
        </ScrollView >
        </View>
      </View>
    </View> :
    <LoadingRecipeInfo recipeId={recipeId} />
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
    ...shadowStyle
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
    ...shadowStyle
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
  ingredients: {

  }
});
