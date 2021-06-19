import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Emoji from "react-native-emoji";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  borderLine,
  colorPalette,
  font,
  shadowStyle,
} from "../constants/Styling";
import { useSelector, useDispatch } from "react-redux";
import { updateFilters } from "../redux/actions";
import { updateFiltersDb } from "../db/db";
import { useFonts } from "expo-font";

const _screen = Dimensions.get("screen");

export interface BurgerScreenProps {
  navigation: StackNavigationProp<MenuStackParamList, "BurgerScreen">;
}

export default function BurgerScreen({ navigation }: BurgerScreenProps) {
  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  // Original state of users FilterState from redux store
  const filtersState = useSelector<RootState, FiltersState>(
    (state) => state.filtersState
  );
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );
  const dispatch = useDispatch();

  /*
    _______________________
    All user input filters
    _______________________
    */
  // Smart Filter
  const [smartFilter, setSmartFilter] = React.useState(
    filtersState.filters.smartFilter
  );
  // Dish Types
  const [dishTypeOpen, setdishTypeOpen] = React.useState(false);
  // setting initial state type to 'any' due to restrictions with
  // data type provided by react-native-dropdown-picker for setValue<ValuType | ValueType[] | null>
  // ... in compreSettings() .length is used and, ValueType consists of a number data type
  //     which does not contain property length: causes Error
  const [dishType, setDishTypeValue] = React.useState<any>(
    filtersState.filters.dishType
  );
  const [dishTypeItems, setDishTypeItems] = React.useState([
    {
      label: "All",
      value: "",
      icon: () => <MaterialCommunityIcons name="emoticon-outline" size={18} />,
    },
    {
      label: "Breakfast",
      value: "breakfast",
      icon: () => (
        <MaterialCommunityIcons name="silverware-variant" size={18} />
      ),
    },
    {
      label: "Lunch",
      value: "lunch",
      icon: () => (
        <MaterialCommunityIcons name="silverware-variant" size={18} />
      ),
    },
    {
      label: "Dinner",
      value: "dinner",
      icon: () => (
        <MaterialCommunityIcons name="silverware-variant" size={18} />
      ),
    },
    {
      label: "Appetizer",
      value: "appetizer",
      icon: () => <MaterialCommunityIcons name="silverware-spoon" size={18} />,
    },
    {
      label: "Dessert",
      value: "dessert",
      icon: () => <MaterialCommunityIcons name="cupcake" size={18} />,
    },
    {
      label: "Beverage",
      value: "beverage",
      icon: () => <MaterialCommunityIcons name="glass-cocktail" size={18} />,
    },
  ]);
  // Cuisines
  const [cuisineOpen, setCuisineOpen] = React.useState(false);
  // cuisines is a String data type with 1 cuisine value
  const [cuisine, setCuisineValue] = React.useState<any>(
    filtersState.filters.cuisine
  );
  const [cuisineItems, setCuisineItems] = React.useState([
    { label: "All", value: "", icon: () => <Emoji name="rainbow-flag" /> },
    { label: "American", value: "american", icon: () => <Emoji name="us" /> },
    { label: "British", value: "british", icon: () => <Emoji name="gb" /> },
    { label: "Chinese", value: "chinese", icon: () => <Emoji name="cn" /> },
    { label: "French", value: "french", icon: () => <Emoji name="fr" /> },
    { label: "German", value: "german", icon: () => <Emoji name="de" /> },
    { label: "Greek", value: "greek", icon: () => <Emoji name="flag-gr" /> },
    { label: "Indian", value: "indian", icon: () => <Emoji name="flag-in" /> },
    { label: "Irish", value: "irish", icon: () => <Emoji name="flag-ie" /> },
    { label: "Italian", value: "italian", icon: () => <Emoji name="it" /> },
    { label: "Japanese", value: "japanese", icon: () => <Emoji name="jp" /> },
    { label: "Korean", value: "korean", icon: () => <Emoji name="kr" /> },
    {
      label: "Mexican",
      value: "mexican",
      icon: () => <Emoji name="flag-mx" />,
    },
    { label: "Spanish", value: "spanish", icon: () => <Emoji name="es" /> },
    { label: "Thai", value: "thai", icon: () => <Emoji name="flag-th" /> },
    {
      label: "Vietnamese",
      value: "vietnamese",
      icon: () => <Emoji name="flag-vn" />,
    },
  ]);
  // Vegetarian
  const [vegetarian, setVegetarian] = React.useState(
    filtersState.filters.vegetarian
  );
  // Vegan
  const [vegan, setVegan] = React.useState(filtersState.filters.vegan);
  // Gluten Free
  const [glutenFree, setGlutenFree] = React.useState(
    filtersState.filters.glutenFree
  );
  // Dairy Free
  const [dairyFree, setDairyFree] = React.useState(
    filtersState.filters.dairyFree
  );
  const [changesMade, setChangesMade] = React.useState(false);

  // Listen to when any filters change
  // If they do, compare the current filters to the original state of the filters
  React.useEffect(() => {
    // Only continue to next if nothing changed...
    // Check if smart filter changed
    let somethingChanged = compareSmartFilter();
    // Check if vegetarian filter changed
    if (!somethingChanged) somethingChanged = compareVegetarian();
    // Check if vegan filter changed
    if (!somethingChanged) somethingChanged = compareVegan();
    // Check if glutenFree filter changed
    if (!somethingChanged) somethingChanged = compareGlutenFree();
    // Check if dairyFree filter changed
    if (!somethingChanged) somethingChanged = compareDairyFree();
    // Check if dish types changed
    if (!somethingChanged) somethingChanged = compreDishType();
    // Check if cuisine changed
    if (!somethingChanged) somethingChanged = compareCuisine();
  }, [
    smartFilter,
    dishType,
    cuisine,
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
  ]);

  // Listen to when only vegan changes
  React.useEffect(() => {
    // If vegan is true, set appropriate filters to true
    if (vegan) {
      setVegetarian(true);
      setDairyFree(true);
    }
  }, [vegan]);

  // Compare smartFilter and decide to display the Apply button, or not
  function compareSmartFilter() {
    // Simply Boolean comparison
    if (smartFilter !== filtersState.filters.smartFilter) {
      setChangesMade(true);
      return true;
    } else {
      setChangesMade(false);
      return false;
    }
  }

  // Compare vegetarian and decide to display the Apply button, or not
  function compareVegetarian() {
    // Simply Boolean comparison
    if (vegetarian !== filtersState.filters.vegetarian) {
      setChangesMade(true);
      return true;
    } else {
      setChangesMade(false);
      return false;
    }
  }

  // Compare vegan and decide to display the Apply button, or not
  function compareVegan() {
    // Simply Boolean comparison
    if (vegan !== filtersState.filters.vegan) {
      setChangesMade(true);
      return true;
    } else {
      setChangesMade(false);
      return false;
    }
  }

  // Compare glutenFree and decide to display the Apply button, or not
  function compareGlutenFree() {
    // Simply Boolean comparison
    if (glutenFree !== filtersState.filters.glutenFree) {
      setChangesMade(true);
      return true;
    } else {
      setChangesMade(false);
      return false;
    }
  }

  // Compare dairyFree and decide to display the Apply button, or not
  function compareDairyFree() {
    // Simply Boolean comparison
    if (dairyFree !== filtersState.filters.dairyFree) {
      setChangesMade(true);
      return true;
    } else {
      setChangesMade(false);
      return false;
    }
  }

  // Compare dishType and decide to display the Apply button, or not
  function compreDishType() {
    // Simply String comparison
    if (dishType !== filtersState.filters.dishType) {
      setChangesMade(true);
      return true;
      // Check each element in dishTypes against original state of filters
    } else {
      setChangesMade(false);
      return false;
    }
  }

  // Compare cuisine and decide to display the Apply button, or not
  function compareCuisine() {
    // Simply String comparison
    if (cuisine !== filtersState.filters.cuisine) {
      setChangesMade(true);
      return true;
    } else {
      setChangesMade(false);
      return false;
    }
  }

  function handleSmartFilterCheckbox() {
    // Toggle smartFilter state
    setSmartFilter(!smartFilter);
  }

  function handleVegetarianCheckbox() {
    // Toggle vegetarian state
    setVegetarian(!vegetarian);
  }

  function handleVeganCheckbox() {
    // Toggle vegan state
    setVegan(!vegan);
  }

  function handleGlutenFreeCheckbox() {
    // Toggle glutenFree state
    setGlutenFree(!glutenFree);
  }

  function handleDairyFreeCheckbox() {
    // Toggle dairyFree state
    setDairyFree(!dairyFree);
  }

  function handleApply() {
    // Update only changed values
    const filters = {
      ...filtersState.filters,
      smartFilter: smartFilter,
      dishType: dishType,
      cuisine: cuisine,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      dairyFree: dairyFree,
    };

    dispatch(updateFilters(filters));

    // TODO: WRITE TO DB
    // - Update filters table with userState.id and,
    //   updated Filters.
    updateFiltersDb(userState.user.id, filters);

    // Navigate back to MenuScreen
    navigation.goBack();
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.allFiltersContainer}>
          <View style={[styles.filtersContainers, styles.smartFilterContainer]}>
            <Text style={styles.labelText}>Smart Recommendations: </Text>
            <Pressable
              style={[styles.checkboxBase, smartFilter && styles.checkboxChecked]}
              onPress={handleSmartFilterCheckbox}
            >
              {smartFilter && (
                <MaterialCommunityIcons
                  name="check-bold"
                  size={18}
                  color="#FF5454"
                />
              )}
            </Pressable>
          </View>
          <View style={styles.borderline} />
          <View
            style={[
              styles.filtersContainers,
              styles.dropDownContainer,
              styles.z2,
            ]}
          >
            <Text style={styles.labelText}>Dish Types: </Text>
            <DropDownPicker
              zIndex={3000}
              listMode="SCROLLVIEW"
              open={dishTypeOpen}
              value={dishType}
              items={dishTypeItems}
              setOpen={setdishTypeOpen}
              setValue={setDishTypeValue}
              closeAfterSelecting={true}
              setItems={setDishTypeItems}
              textStyle={styles.dropdownText}
              translation={{
                PLACEHOLDER: "Select your type(s)",
                SEARCH_PLACEHOLDER: "Type something...",
                SELECTED_ITEMS_COUNT_TEXT: "{count} type(s) selected",
                NOTHING_TO_SHOW: "There's nothing to show!",
              }}
              style={styles.dropdown}
              containerStyle={styles.dropdown}
              ArrowUpIconComponent={({}) => (
                <MaterialCommunityIcons name="menu-up-outline" size={24} />
              )}
              ArrowDownIconComponent={({}) => (
                <MaterialCommunityIcons name="menu-down-outline" size={24} />
              )}
              maxHeight={300}
            />
          </View>

          <View
            style={[
              styles.filtersContainers,
              styles.dropDownContainer,
              styles.z1,
            ]}
          >
            <Text style={styles.labelText}>Cuisine: </Text>
            <DropDownPicker
              zIndex={2000}
              listMode="SCROLLVIEW"
              open={cuisineOpen}
              value={cuisine}
              items={cuisineItems}
              setOpen={setCuisineOpen}
              setValue={setCuisineValue}
              closeAfterSelecting={true}
              setItems={setCuisineItems}
              textStyle={styles.dropdownText}
              translation={{
                PLACEHOLDER: "Select your cuisine",
                SEARCH_PLACEHOLDER: "Type something...",
                SELECTED_ITEMS_COUNT_TEXT: "{count} cuisine selected",
                NOTHING_TO_SHOW: "There's nothing to show!",
              }}
              style={styles.dropdown}
              containerStyle={styles.dropdown}
              ArrowUpIconComponent={({}) => (
                <MaterialCommunityIcons name="menu-up-outline" size={24} />
              )}
              ArrowDownIconComponent={({}) => (
                <MaterialCommunityIcons name="menu-down-outline" size={24} />
              )}
              maxHeight={300}
            />
          </View>
          <View style={styles.borderline} />
          <View style={[styles.filtersContainers, styles.checkBoxContainer]}>
            <View style={styles.labelAndCheckbox}>
              <Text style={styles.labelText}>Vegetarian: </Text>
              <Pressable
                style={[
                  styles.checkboxBase,
                  vegetarian && styles.checkboxChecked
                ]}
                onPress={handleVegetarianCheckbox}
              >
                {vegetarian && (
                  <MaterialCommunityIcons
                    name="check-bold"
                    size={18}
                    color={colorPalette.primary}
                  />
                )}
              </Pressable>
            </View>
            <View style={styles.labelAndCheckbox}>
              <Text style={styles.labelText}>Vegan: </Text>
              <Pressable
                style={[
                  styles.checkboxBase,
                  vegan && styles.checkboxChecked
                ]}
                onPress={handleVeganCheckbox}
              >
                {vegan && (
                  <MaterialCommunityIcons
                    name="check-bold"
                    size={18}
                    color={colorPalette.primary}
                  />
                )}
              </Pressable>
            </View>
          </View>

          <View style={[styles.filtersContainers, styles.checkBoxContainer]}>
            <View style={styles.labelAndCheckbox}>
              <Text style={styles.labelText}>Gluten Free: </Text>
              <Pressable
                style={[
                  styles.checkboxBase,
                  glutenFree && styles.checkboxChecked
                ]}
                onPress={handleGlutenFreeCheckbox}
              >
                {glutenFree && (
                  <MaterialCommunityIcons
                    name="check-bold"
                    size={18}
                    color={colorPalette.primary}
                  />
                )}
              </Pressable>
            </View>
            <View style={styles.labelAndCheckbox}>
              <Text style={styles.labelText}>Dairy Free: </Text>
              <Pressable
                style={[
                  styles.checkboxBase,
                  dairyFree && styles.checkboxChecked
                ]}
                onPress={handleDairyFreeCheckbox}
              >
                {dairyFree && (
                  <MaterialCommunityIcons
                    name="check-bold"
                    size={18}
                    color={colorPalette.primary}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.applyContainer}>
          {changesMade && (
            <TouchableOpacity onPress={handleApply} activeOpacity={0.8}>
              <LinearGradient
                colors={colorPalette.primaryGradient}
                style={styles.applyButton}
              >
                <Text style={{ ...styles.labelText, color: colorPalette.white}}>Apply</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  allFiltersContainer: {
    flex: 18,
    marginTop: _screen.height * 0.03
  },

  z1: {
    elevation: 1000,
    zIndex: 1000,
  },

  z2: {
    elevation: 2000,
    zIndex: 2000,
  },

  filtersContainers: {
    marginVertical: _screen.height * 0.01,
    width: _screen.width * 0.93,
  },

  smartFilterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  labelText: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
  },

  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: _screen.width * 0.03,
  },

  dropdown: {
    width: _screen.width * 0.5,
    height: _screen.height * 0.03,
  },

  dropdownText: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans"
  },

  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: _screen.width * 0.03,
  },

  labelAndCheckbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: _screen.width * 0.33,
  },

  checkboxBase: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: _screen.width * 0.03,
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colorPalette.darkGray,
    backgroundColor: colorPalette.white,
  },

  checkboxChecked: {
  },

  applyContainer: {
    flex: 2,
  },

  applyButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 30,
    borderRadius: 10,
    borderWidth: Platform.OS === "android" ? 0.5 : 0.3,
  },

  borderline: {
    alignSelf: "center",
    ...borderLine,
    marginVertical: _screen.height * 0.03,
  },
});
