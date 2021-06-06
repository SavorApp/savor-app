import React from "react";
import {
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from "react-redux";
import { unSavorRecipe } from "../redux/actions";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { cuisineMap, dishTypeMap } from "../constants/Maps";
import { LinearGradient } from "expo-linear-gradient";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from "axios";

const _screen = Dimensions.get("screen");

export interface SavoredListScreenProps {
  navigation: StackNavigationProp<SavoredListStackParamList, "SavoredListScreen">;
}

export default function SavoredListScreen({ navigation }: SavoredListScreenProps) {
  const dispatch = useDispatch();
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const userState = useSelector<RootState, userSate>(
    (state) => state.userState
  )
  console.log("user recipeListState is: ", userRecipeListState)
  console.log("userRecipeList is: ", userRecipeListState.userRecipeList)
  // const savoredList = userRecipeListState.userRecipeList.filter((rcp) => {
  //     return rcp.isSavored === true;
  //   })

  function getRandomNumber(): number {
    const savoredList = userRecipeListState.userRecipeList.filter((rcp) => {
      return rcp.isSavored;
    })
    return Math.floor(Math.random() * savoredList.length);
  }


// Delete recipe workings
  


// below is the recipe list

  function RecipeListItem({rcp, rowHeightAnimatedValue, removeRow, leftActionState, rightActionState}) { // {rcp}: {rcp: UserRecipe}
    // const {
    //   rowHeightAnimatedValue, 
    //   removeRow, 
    //   leftActionState, 
    //   rightActionState,
    //   rcp
    //   } = props;
    const newTitle = rcp.title.length >= 30 ? (rcp.title.slice(0, 30) + "...") : (rcp.title)

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        // duration: 100,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      
      <TouchableOpacity
          style={styles.recipeListItem}
          onPress={() => navigation.navigate("RecipeScreen", { recipeId: rcp.id})}
          activeOpacity={0.8}
        >
          <View style={styles.recipeListItemInner}>
            {cuisineMap[rcp.cuisine] || cuisineMap["All"]}
            <View  style={styles.recipeListItemInnerContent}>
              <Text style={styles.recipeTitle}>{newTitle}</Text>
              <View style={styles.tagsContainer}>
                <View style={styles.singleTagContainer}>
                {dishTypeMap[rcp.dishType] || dishTypeMap["All"]}
                  <Text style={styles.tag}>{rcp.dishType}</Text>
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

  function renderItem({item}: {item: UserRecipe}, rowMap) {
    const rowHeightAnimatedValue = new Animated.Value(60);
    console.log("Type rowHeight: ", typeof rowHeightAnimatedValue)
    console.log("Inside render item: ", item)
    return (
    <RecipeListItem 
      rcp={item}
      rowHeightAnimatedValue={rowHeightAnimatedValue} 
      removeRow={() => deleteRow({item}, rowMap)} 
    />
    ); // rowData used to be item
  };

  const onRowDidOpen = (item, rowMap) => {
    console.log('This row opened', item);
  };

  const onLeftActionStatusChange = (item, rowMap) => {
    console.log('onLeftActionStatusChange', item);
  };

  const onRightActionStatusChange = (item, rowMap) => {
    console.log('onRightActionStatusChange', item);
  };

  const onRightAction = (item, rowMap) => {
    console.log('onRightAction', item);
  };

  const onLeftAction = (item, rowMap) => {
    console.log('onLeftAction', item);
  };
  const closedRow = ({item}, rowMap) => {
    console.log("You pressed me")
    console.log("You are rowMap: ", rowMap)
    console.log("You are rowData id: ", item.id)
    if(rowMap[item.id]) {
      rowMap[item.id].closeRow();
    }
  }

  const deleteRow = ({item}, rowMap) => {
    console.log("I'm inside delete");
    console.log("What type am I: ", typeof item.id);
    // console.log("I am dispatch: ", dispatch)
    const recipeId = item.id
    // closedRow({item}, rowMap);
    dispatch(unSavorRecipe(recipeId))
    // if userSate.loggedIn is true call unsavoredDB
  /*
  if (userState.isLoggedIn) {
  async function unSavorDB(user_id: string | undefined, rcpId: number, isSavored: Boolean) {
    try {
      const recipe = await axios("https://localhost:4000/", {
        method: "POST",
        data: {
          query: `
                mutation updateRecipe(
                      $user_id: String!,
                      $id: Int!,
                      $isSavored: Boolean,
                `,
          variables: {
            // user_id: user_id,
            // id: rcpId,
            // isSavored: isSavored,
            user_id: user_id,
            id: rcpId,
            isSavored: isSavored,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
  } catch {
    // Handle error
  }
    }
// unSavorDB(userState.user.id, item.id, false)
unSavorDB("2", 10050, false)
  }  
 */  
  }

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue, 
      leftActionActivated, 
      rightActionActivated, 
      rowActionAnimatedValue, 
      rowHeightAnimatedValue, 
      onClose,
      onDelete, 
      data, 
      rowMap
      } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    return (
      // <View style={[styles.rowBack, {justifyContent: "flex-end"}]}>
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        <Text>Left</Text>
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
          <MaterialCommunityIcons name="close-circle-outline" size={25} style={styles.trash} color="#fff" />
        </TouchableOpacity>
        <Animated.View style={[styles.backRightBtn, styles.backRightBtnRight, {
          flex: 1, width: rowActionAnimatedValue
        }]}>
        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
           <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
        </TouchableOpacity>
      </ Animated.View>
        
      </ Animated.View>
    )
  }
  // renderHiddenItem={ (data, rowMap) => (
  //               <View style={styles.rowBack}>
  //                 <Text>Left</Text>
  //                 <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
  //                   <Text style={styles.backTextWhite}>{data.title}</Text>
  //                 </TouchableOpacity>
  //                 <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
  //                   <Text style={styles.backTextWhite}>Delete</Text>
  //                 </TouchableOpacity>
  //               </View>
  //             )}

  function renderHiddenItem({item}, rowMap) {
    console.log("find rowMap: ", rowMap)
    console.log("find data: ", {item})
    // console.log("find data id: ", rowData.item.id)
    const rowActionAnimatedValue = new Animated.Value(75)
    const rowHeightAnimatedValue = new Animated.Value(60)
    console.log(rowHeightAnimatedValue)
    return (
      <HiddenItemWithActions 
        // style={{justifyContent: "flex-end"}}
        data={item}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closedRow({item}, rowMap)}
        onDelete={() => deleteRow({item}, rowMap)}
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
              data={
                userRecipeListState.userRecipeList.filter((rcp) => {
                // Select only Recipes where isSavored = true
                return rcp.isSavored;
              })
              }
              keyExtractor={(rowData, index) => {
                console.log("I am rowData: ", rowData)
                console.log("I am rowData id: ", rowData.id)
                console.log("I am rowData id string: ", rowData.id.toString())
                return rowData.id.toString();
              }}
              renderItem={(rowData, rowMap) => renderItem(rowData, rowMap)}
              renderHiddenItem={(rowData, rowMap) => {
              console.log("Please rowMap: ", rowMap)
              return renderHiddenItem(rowData, rowMap)}}
              // keyExtractor={item => item.id.toString()}
              // keyExtractor={item => item.text}
              //keyExtractor={data => data.id.toString()}

              leftOpenValue={75}
              rightOpenValue={-150}
              disableRightSwipe

              onRowDidOpen={(rowData, rowMap) => onRowDidOpen(rowData, rowMap)}
              leftActivationValue={100}
              rightActivationValue={-200}
              leftActionValue={0}
              rightActionValue={-500}
              onLeftAction={(rowData, rowMap) => {
                console.log("Row Data: ", rowData)
                console.log("Row Map: ", rowMap)
                return onLeftAction(rowData, rowMap)}}
              onRightAction={(rowData, rowMap) => {
                console.log("Row Data: ", rowData)
                console.log("Row Map: ", rowMap)
                return onRightAction(rowData, rowMap)
                }
              }
              onLeftActionStatusChange={(rowData, rowMap) => onLeftActionStatusChange(rowData, rowMap)}
              onRightActionStatusChange={(rowData, rowMap) => onRightActionStatusChange(rowData, rowMap)}

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
},

rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    // marginBottom: 15,
    borderRadius: 5,
  },

  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },

  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },

  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
   trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  }
});
