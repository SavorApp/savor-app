import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import * as recipeJson from "../data/recipes.json"

const _screen = Dimensions.get("screen");

export default function RecipeScreen({ route }: { route: any }) {
  const { recipeId } = route.params;

  // TODO: take recipeId and make API request for Recipe information
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
      <View style={styles.titleContainer}>
      {recipeJson.recipes.map((rcp) => {
                      return <Text style={styles.titleBackground}>{}</Text>
                    })}
      
                    
                </View>
      </View>
    </View>
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
    marginBottom: 10,
    padding: 5,
    backgroundColor: "white",
    width: 250,
    borderRadius: 15,
    ...shadowStyle
},
});
