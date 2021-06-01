import React from "react";
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
// import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  SavoredListParamList,
  RootState,
  UserRecipeListState,
  UserRecipe,
} from "../../types";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { cuisineMap, dishTypeMap } from "../constants/Maps";
import { LinearGradient } from "expo-linear-gradient";

const _screen = Dimensions.get("screen");

export interface SavoredListScreenProps {
  navigation: StackNavigationProp<SavoredListParamList, "SavoredListScreen">;
}

export default function SavoredListScreen({ navigation }: SavoredListScreenProps) {
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );

  function getRandomNumber(): number {
    const savoredList = userRecipeListState.userRecipeList.filter((rcp) => {
      return rcp.isSavored;
    })
    return Math.floor(Math.random() * savoredList.length);
  }

  function RecipeListItem({rcp}: {rcp: UserRecipe}) {
    const newTitle = rcp.title.length >= 30 ? (rcp.title.slice(0, 30) + "...") : (rcp.title)
    return (
      <TouchableOpacity
        style={styles.recipeListItem}
        onPress={() => navigation.navigate("RecipeScreen", { recipeId: rcp.id })}
        activeOpacity={0.8}
      >
        <View style={styles.recipeListItemInner}>
          {cuisineMap[rcp.cuisine]}
          <View  style={styles.recipeListItemInnerContent}>
            <Text style={styles.recipeTitle}>{newTitle}</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.singleTagContainer}>
              {dishTypeMap[rcp.dishType]}
                <Text style={styles.tag}>{rcp.dishType[0].toUpperCase() + rcp.dishType.slice(1)}</Text>
              </View>
              {rcp.vegetarian && (
                <View style={styles.singleTagContainer}>
                  <MaterialCommunityIcons name="alpha-v-circle-outline" color="green" />
                  <Text style={styles.tag}>Vegetarian</Text>
                </View>
              )}
              {rcp.vegan && (
                <View style={styles.singleTagContainer}>
                  <MaterialCommunityIcons name="alpha-v-circle" color="green" />
                  <Text style={styles.tag}>Vegan</Text>
                </View>
              )}
              {rcp.glutenFree && (
                <View style={styles.singleTagContainer}>
                  <Text style={[styles.tag, {fontWeight: "bold"}]}>GF</Text>
                </View>
              )}
              {rcp.dairyFree && (
                <View style={styles.singleTagContainer}>
                  <Text style={[styles.tag, {fontWeight: "bold"}]}>DF</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  function renderItem({item}: {item: UserRecipe}) {
    return <RecipeListItem rcp={item}/>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.flatListContainer}
            data={userRecipeListState.userRecipeList.filter((rcp) => {
              // Select only Recipes where isSavored = true
              return rcp.isSavored;
            })}
            renderItem={(item) => renderItem(item)}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <TouchableOpacity
            onPress={() => navigation.navigate("RecipeScreen", {
              recipeId: userRecipeListState.userRecipeList[getRandomNumber()].id
            })}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={[colorPalette.popLight, colorPalette.popDark]}
                style={styles.truffleShuffleButton}
            >
                <Text
                    style={{color: "black"}}
                >Truffle Shuffle</Text>
            </LinearGradient>

        </TouchableOpacity>
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
    height: _screen.height * 0.75,
    borderRadius: 30,
    backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.86,
    height: _screen.height * 0.68,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  flatList: {
    padding: 8,
    marginVertical: Platform.OS === "android" ? 12 : 0,
    width: _screen.width * 0.83,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  flatListContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  recipeListItem: {
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    padding: 8,
    width: _screen.width * 0.81,
    borderRadius: 10,
    backgroundColor: colorPalette.background,
  },

  recipeListItemInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    width: _screen.width * 0.81
  },

  recipeListItemInnerContent: {
    paddingLeft: 6,
  },

  recipeTitle: {
    fontSize: 16,
  },

  tagsContainer: {
    flexDirection: "row",
  },

  singleTagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3,
    padding: 4,
    borderRadius:8,
    backgroundColor: colorPalette.trimLight
  },

  tag: {
    fontSize: 10,
  },

  truffleShuffleButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    width: 120,
    borderRadius: 10,
    padding: 8
}
});
