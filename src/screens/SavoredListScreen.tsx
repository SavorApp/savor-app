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
import { useSelector, useDispatch } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { SavoredListParamList, RootState, UserRecipeListState } from "../../types";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

export interface SavoredListScreenProps {
  navigation: StackNavigationProp<SavoredListParamList, "SavoredListScreen">;
}

export default function SavoredListScreen({ navigation }: SavoredListScreenProps) {
  const userRecipeListState = useSelector<RootState, UserRecipeListState>((state) => state.userRecipeListState);


  const Item = ({ title }: any) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RecipeScreen", { recipeId: "recipeID_12345" })
        }
      >
        <Text style={styles.recipeTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );


  const renderItem = ({ item }: any) => {
    return <Item title={item.title} key={item.id} />;
  };

  // TODO: Get Savored List from global state
  return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.contentContainer}>
            <FlatList style={styles.flatList} contentContainerStyle={styles.flatListContainer} data={userRecipeListState.userRecipeList} renderItem={renderItem} />
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
    height: _screen.height * 0.75,
    borderRadius: 30,
    backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.86,
    height: _screen.height * 0.73,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  flatList: {
    // padding: 8,
    width: _screen.width * 0.83,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },

  flatListContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  item: {
    justifyContent: "center",
    alignItems: "center",
    // margin: 8,
    width: _screen.width * 0.8,
    borderRadius: 10,
    backgroundColor: colorPalette.background
  },
  
  recipeTitle: {
    fontSize: 16,
  },
});
