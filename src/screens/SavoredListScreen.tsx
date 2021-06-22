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
import ConfettiCannon from "react-native-confetti-cannon";
import { useSelector, useDispatch } from "react-redux";
import { unSavorRecipe } from "../redux/actions";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colorPalette, font, shadowStyle } from "../constants/Styling";
import { cuisineMap, dishTypeMap } from "../constants/Maps";
import { LinearGradient } from "expo-linear-gradient";
import { updateSavorDb } from "../db/db";
import { useFonts } from "expo-font";

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
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
    Satisfy: require("../../assets/fonts/Satisfy-Regular.ttf"),
  });

  const dispatch = useDispatch();
  const savoredList = useSelector<RootState, UserRecipe[]>((state) => {
    return state.userRecipeListState.userRecipeList.filter((rcp) => {
      return rcp.isSavored;
    });
  });
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const explosion = React.useRef<ConfettiCannon>();

  function getRandomNumber(): number {
    return Math.floor(Math.random() * savoredList.length);
  }

  function handleTruffleShuffle() {
    explosion.current?.start();
    setTimeout(() => {
      navigation.navigate("RecipeScreen", {
        recipeId: savoredList[getRandomNumber()].id,
      });
    }, 2500);
  }


  function RecipeListItem({
    rcp,
    rowHeightAnimatedValue,
    removeRow,
    leftActionState,
    rightActionState,
  }) {

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
        activeOpacity={1}
      >
        <View style={styles.recipeListItemInner}>
          <View style={styles.recipeListItemInnerContent}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.recipeTitle,
              }}
            >
              {rcp.title}
            </Text>
            <View style={styles.tagsContainer}>
              <View style={styles.flagContainer}>
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
                  <Text style={styles.tagBold}>GF</Text>
                </View>
              )}
              {rcp.dairyFree && (
                <View style={styles.singleTagContainer}>
                  <Text style={styles.tagBold}>DF</Text>
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

  // const onLeftActionStatusChange = (item, rowMap) => {};

  // const onRightActionStatusChange = (item, rowMap) => {};

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
        style={{ ...styles.rowBack, height: rowHeightAnimatedValue }}
      >
        <TouchableOpacity
          style={{ ...styles.backRightBtn, ...styles.backRightBtnLeft }}
          onPress={onClose}
        >
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={24}
            color={colorPalette.white}
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
            onPress={onDelete}
          >
            <Animated.View
              style={[
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
                size={24}
                color={colorPalette.white}
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

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
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
            onLeftActionStatusChange={() => {}}
            onRightActionStatusChange={() => {}}
          />
        </View>
        <TouchableOpacity
          onPress={savoredList.length === 0 ? () => {} : handleTruffleShuffle}
          activeOpacity={0.8}
          style={styles.truffleShuffleButton1}
        >
          <LinearGradient
            colors={colorPalette.truffleShuffleGradient}
            style={styles.truffleShuffleButton2}
          >
            <Text
              style={styles.truffleShuffleText}
            >
              Truffle Shuffle!
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <ConfettiCannon
          count={300}
          colors={[
            "#ff5454",
            "#F7DD08",
            "##FFAA54",
            "#e64c4c",
            "#cc4343",
            "#ff6565",
            "#ff7676",
          ]}
          explosionSpeed={500}
          fallSpeed={2000}
          origin={{ x: _screen.width * 0.5, y: -_screen.height * 0.5 }}
          autoStart={false}
          fadeOut={true}
          ref={(confettiRef: any) => {
            explosion.current = confettiRef;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  contentContainer: {
    flex: 15,
    width: _screen.width,
  },

  flatList: {
    paddingTop: _screen.height * 0.01,
    ...shadowStyle
  },

  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  recipeListItem: {
    marginBottom: _screen.height * 0.01,
    padding: 3,
    width: _screen.width * 0.93,
    borderRadius: 8,
    backgroundColor: colorPalette.white
  },

  recipeListItemInner: {
    flexDirection: "row",
    alignItems: "center",
  },

  recipeListItemInnerContent: {
  },

  recipeTitle: {
    fontSize: font.subTitleSize,
    fontFamily: "OpenSans",
  },

  tagsContainer: {
    flexDirection: "row",
  },

  flagContainer: {
    marginHorizontal: 2,
  },

  singleTagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    padding: 3,
    borderRadius: 6,
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
  
  rowBack: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: _screen.width * 0.19,
    top: 0,
    bottom: 0,
    marginBottom: 8,
    borderRadius: 8
  },
  
  backRightBtnLeft: {
    backgroundColor: colorPalette.secondary,
    right: 75,
  },
  
  backRightBtnRight: {
    backgroundColor: colorPalette.removeRed,
    right: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  truffleShuffleButton1: {
    borderColor: colorPalette.darkGray,
    borderWidth: Platform.OS === "android" ? 0.5 : 0.3,
    borderRadius: 10,
    marginVertical: _screen.height * 0.01,
    ...shadowStyle
  },
  
  truffleShuffleButton2: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.9,
    height: _screen.height * 0.06,
    borderRadius: 10,
  },

  truffleShuffleText: {
    fontSize: font.titleSize,
    fontFamily: "Satisfy"
  }
});
