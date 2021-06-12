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
import { updateSavorDb } from "../db/db";
import { useFonts } from "expo-font";
import { NONAME } from "dns";

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
  const savoredList = useSelector<RootState, UserRecipe[]>((state) => {
    return state.userRecipeListState.userRecipeList.filter((rcp) => {
      return rcp.isSavored;
    });
  });
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );

  const [loaded] = useFonts({
    Itim: require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  function getRandomNumber(): number {
    return Math.floor(Math.random() * savoredList.length);
  }

  function handleTruffleShuffle() {
    navigation.navigate("RecipeScreen", {
      recipeId: savoredList[getRandomNumber()].id,
    });
  }

  // below is the recipe list

  function RecipeListItem({
    rcp,
    rowHeightAnimatedValue,
    removeRow,
    leftActionState,
    rightActionState,
  }) {
    // {rcp}: {rcp: UserRecipe}
    const newTitle =
      rcp.title.length >= 30 ? rcp.title.slice(0, 30) + "..." : rcp.title;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 5,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <TouchableOpacity
        style={styles.recipeListItem}
        onPress={() =>
          navigation.navigate("RecipeScreen", { recipeId: rcp.id })
        }
        activeOpacity={0.8}
      >
        <View style={styles.recipeListItemInner}>
          <View style={styles.recipeListItemInnerContent}>
            <Text
              style={{
                ...styles.recipeTitle,
              }}
            >
              {newTitle}
            </Text>
            <View style={styles.tagsContainer}>
              <View style={{ ...styles.singleTagContainer, borderWidth: 0 }}>
                {cuisineMap[rcp.cuisine] || cuisineMap["All"]}
              </View>
              <View style={styles.singleTagContainer}>
                {dishTypeMap[rcp.dishType] || dishTypeMap["All"]}
                <Text style={styles.tag}>{rcp.dishType}</Text>
              </View>
              {rcp.vegetarian && (
                <View style={styles.singleTagContainer}>
                  <MaterialCommunityIcons
                    name="alpha-v-circle-outline"
                    color="green"
                  />
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
                  <Text style={[styles.tag, { fontWeight: "bold" }]}>GF</Text>
                </View>
              )}
              {rcp.dairyFree && (
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

  function renderItem({ item }: { item: UserRecipe }, rowMap) {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <RecipeListItem
        rcp={item}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow({ item }, rowMap)}
      />
    );
  }

  const onRowDidOpen = (item, rowMap) => {};

  const onLeftActionStatusChange = (item, rowMap) => {};

  const onRightActionStatusChange = (item, rowMap) => {};

  const onRightAction = (item, rowMap) => {};

  const onLeftAction = (item, rowMap) => {};
  const closedRow = ({ item }, rowMap) => {
    if (rowMap[item.id]) {
      rowMap[item.id].closeRow();
    }
  };

  const deleteRow = async ({ item }, rowMap) => {
    const rcpId = item.id;
    const user_id = userState.user.id;

    dispatch(unSavorRecipe(rcpId));

    if (userState.isLoggedIn) {
      const waitingForUnSavor = await updateSavorDb(user_id, rcpId, false);
      // console.log(waitingForUnSavor);
    }
  };

  const HiddenItemWithActions = (props) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
      data,
      rowMap,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View
        style={[styles.rowBack, { height: rowHeightAnimatedValue }]}
      >
        <Text>Left</Text>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={onClose}
        >
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={25}
            style={styles.trash}
            color="#fff"
          />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.backRightBtn,
            styles.backRightBtnRight,
            {
              flex: 1,
              width: rowActionAnimatedValue,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={onDelete}
          >
            <Animated.View
              style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: swipeAnimatedValue.interpolate({
                        inputRange: [-90, -45],
                        outputRange: [1, 0],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={25}
                color="#fff"
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };

  function renderHiddenItem({ item }, rowMap) {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);
    return (
      <HiddenItemWithActions
        data={item}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closedRow({ item }, rowMap)}
        onDelete={() => deleteRow({ item }, rowMap)}
      />
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
            data={savoredList}
            keyExtractor={(rowData, index) => {
              // console.log("I am rowData: ", rowData)
              return rowData.id.toString();
            }}
            renderItem={(rowData, rowMap) => renderItem(rowData, rowMap)}
            renderHiddenItem={(rowData, rowMap) => {
              return renderHiddenItem(rowData, rowMap);
            }}
            leftOpenValue={75}
            rightOpenValue={-150}
            disableRightSwipe
            onRowDidOpen={(rowData, rowMap) => onRowDidOpen(rowData, rowMap)}
            leftActivationValue={100}
            rightActivationValue={-200}
            leftActionValue={0}
            rightActionValue={-500}
            onLeftAction={(rowData, rowMap) => {
              return onLeftAction(rowData, rowMap);
            }}
            onRightAction={(rowData, rowMap) => {
              return onRightAction(rowData, rowMap);
            }}
            onLeftActionStatusChange={(rowData, rowMap) =>
              onLeftActionStatusChange(rowData, rowMap)
            }
            onRightActionStatusChange={(rowData, rowMap) =>
              onRightActionStatusChange(rowData, rowMap)
            }
          />
        </View>
        <TouchableOpacity
          onPress={savoredList.length === 0 ? () => {} : handleTruffleShuffle}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colorPalette.popLight, colorPalette.popDark]}
            style={styles.truffleShuffleButton}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "Itim",
                fontSize: 24,
                fontStyle: "bold",
              }}
            >
              Truffle Shuffle
            </Text>
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
    // backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.86,
    height: _screen.height * 0.68,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  flatList: {
    padding: 8,
    marginVertical: Platform.OS === "android" ? 12 : 0,
    width: _screen.width * 0.93,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
  },

  recipeListItem: {
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    padding: 3,
    width: _screen.width * 0.9,
    borderRadius: 7,
    backgroundColor: colorPalette.background,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },

  recipeListItemInner: {
    flexDirection: "row",
    alignItems: "center",
    width: _screen.width * 0.81,
  },

  recipeListItemInnerContent: {
    paddingLeft: 3,
    marginLeft: -15,
  },

  recipeTitle: {
    fontSize: 20,
    padding: 9,
    marginTop: -5,

    fontFamily: "Itim",
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
    marginLeft: 10,
    marginBottom: 5,
    borderColor: "black",
    borderWidth: 0.3,
    borderRadius: 8,
  },

  tag: {
    fontSize: 10,
  },

  truffleShuffleButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    width: 200,
    height: 50,
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
