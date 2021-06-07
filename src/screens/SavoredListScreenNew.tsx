import React from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSelector, useDispatch } from "react-redux";
import { unSavorRecipe } from "../redux/actions";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { cuisineMap, dishTypeMap } from "../constants/Maps";
import { LinearGradient } from "expo-linear-gradient";
import { unSavorDB } from "../db/db";

const _screen = Dimensions.get("screen");

export interface SavoredListScreenProps {
  navigation: StackNavigationProp<
    SavoredListStackParamList,
    "SavoredListScreen"
  >;
}

export default function SavoredListScreen({
  navigation,
}: SavoredListScreenProps) {
  const dispatch = useDispatch();
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );

  function getRandomNumber(): number {
    const savoredList = userRecipeListState.userRecipeList.filter((rcp) => {
      return rcp.isSavored;
    });
    return Math.floor(Math.random() * savoredList.length);
  }


  function renderItem({ item }: { item: UserRecipe }) {
    const newTitle =
      item.title.length >= 30 ? item.title.slice(0, 30) + "..." : item.title;

    return (
      <TouchableOpacity
        style={styles.recipeListItem}
        onPress={() =>
          navigation.navigate("RecipeScreen", { recipeId: item.id })
        }
        activeOpacity={0.8}
      >
        <View style={styles.recipeListItemInner}>
          {cuisineMap[item.cuisine] || cuisineMap["All"]}
          <View style={styles.recipeListItemInnerContent}>
            <Text style={styles.recipeTitle}>{newTitle}</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.singleTagContainer}>
                {dishTypeMap[item.dishType] || dishTypeMap["All"]}
                <Text style={styles.tag}>{item.dishType}</Text>
              </View>
              {item.vegetarian && (
                <View style={styles.singleTagContainer}>
                  <MaterialCommunityIcons
                    name="alpha-v-circle-outline"
                    color="green"
                  />
                  <Text style={styles.tag}>Vegetarian</Text>
                </View>
              )}
              {item.vegan && (
                <View style={styles.singleTagContainer}>
                  <MaterialCommunityIcons name="alpha-v-circle" color="green" />
                  <Text style={styles.tag}>Vegan</Text>
                </View>
              )}
              {item.glutenFree && (
                <View style={styles.singleTagContainer}>
                  <Text style={[styles.tag, { fontWeight: "bold" }]}>GF</Text>
                </View>
              )}
              {item.dairyFree && (
                <View style={styles.singleTagContainer}>
                  <Text style={[styles.tag, { fontWeight: "bold" }]}>DF</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  async function deleteRow({item}: {item: UserRecipe}) {
    const rcpId = item.id;
    const user_id = userState.user.id;

    dispatch(unSavorRecipe(rcpId));

    if (userState.isLoggedIn) {
      const waitingForUnSavor = await unSavorDB(user_id, rcpId, false);
      console.log(waitingForUnSavor);
    }
  };


  function renderHiddenItem({ item }: {item: UserRecipe}) {

    return (
      <Animated.View>
        <Text>Left</Text>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <SwipeListView
            useFlatList={true}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContainer}
            data={userRecipeListState.userRecipeList.filter((rcp) => {
              return rcp.isSavored;
            })}
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            renderItem={(item) => renderItem(item)}
            renderHiddenItem={(item) => {
              return renderHiddenItem(item);
            }}
            leftOpenValue={75}
            rightOpenValue={-150}
            disableRightSwipe
            leftActivationValue={100}
            rightActivationValue={-200}
            leftActionValue={0}
            rightActionValue={-500}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RecipeScreen", {
              recipeId:
                userRecipeListState.userRecipeList[getRandomNumber()].id,
            })
          }
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colorPalette.popLight, colorPalette.popDark]}
            style={styles.truffleShuffleButton}
          >
            <Text style={{ color: "black" }}>Truffle Shuffle</Text>
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
    borderRadius: 15,
    backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.86,
    height: _screen.height * 0.68,
    borderRadius: 15,
    backgroundColor: colorPalette.secondary,
  },

  flatList: {
    padding: 8,
    marginVertical: Platform.OS === "android" ? 12 : 0,
    width: _screen.width * 0.83,
    borderRadius: 15,
    backgroundColor: colorPalette.secondary,
  },

  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
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
    width: _screen.width * 0.81,
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
    borderRadius: 8,
    backgroundColor: colorPalette.trimLight,
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
    padding: 8,
  },

  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    // marginBottom: 15,
    borderRadius: 5,
  },

  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },

  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 75,
  },

  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
});
