import React from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SavoredListParamList } from "../../types";
import colorPalette from "../constants/ColorPalette";
//Import for dev
import * as recipesJson from "../data/recipes.json";

const _screen = Dimensions.get("screen");

export interface SavoredListScreenProps {
  navigation: StackNavigationProp<SavoredListParamList, "SavoredListScreen">;
}

export default function SavoredListScreen({ navigation }: SavoredListScreenProps) {
  const Item = ({ title }: any) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RecipeScreen", { recipeId: "recipeID_12345" })
        }
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  const DATA = recipesJson.recipes;
  const renderItem = ({ item }: any) => {
    return <Item title={item.title} key={item.id} />;
  };

  // TODO: Get Savored List from global state
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: colorPalette.background,
  },
  item: {
    backgroundColor: colorPalette.primary,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
});
