import React from "react";
import { StyleSheet, Dimensions, View, Text, ScrollView  } from "react-native";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import * as recipeJson from "../data/100Recipes.json";
import { RecipeScreenInfo } from "../../types";
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleBackground}>{recipeInfos.title}</Text>
        </View>
        <ScrollView style={styles.summaryContainer}>
          <HTML source={{html: recipeInfos.summary}}  />
        </ScrollView >
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
    height: _screen.height * 0.6,
    borderRadius: 30,
    backgroundColor: colorPalette.primary,
    ...shadowStyle
  },
  titleBackground: {
    color: "black",
    marginTop: 5,
    textAlign: "center",
  },
  titleContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "white",
    width: 250,
    borderRadius: 15,
    ...shadowStyle
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
});
