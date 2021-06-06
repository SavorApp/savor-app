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
import { RouteProp } from "@react-navigation/native";
import Constants from "expo-constants";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import HTML from "react-native-render-html";
import axios from "axios";
import * as recipeJson from "../data/100Recipes.json";
import LoadingRecipeInfo from "../components/LoadingRecipeInfo";

const _screen = Dimensions.get("screen");

export interface InstructionsScreenProps {
    navigation: StackNavigationProp<InstructionsScreenStackParamList, "InstructionsScreen">;
    route: RouteProp<{ params: { recipe: RecipeScreenInfo } }, "params">;
  }

export default function InstructionsScreen({ navigation, route }: InstructionsScreenProps) {
  const { recipe } = route.params;

return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.contentContainer}>
            <ScrollView style={styles.scrollView}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.subTitle}>Instructions</Text>
              </TouchableOpacity>
              <Text style={styles.subTitle}>Instructions</Text>
              <HTML source={{ html: (recipe.instructions || "") }} />
              <Text>{"\n\n\n"}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
)}

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
});
