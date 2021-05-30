import React from "react";
import { StyleSheet, Dimensions, View, Text, Pressable, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Emoji from 'react-native-emoji';
import { StackNavigationProp } from '@react-navigation/stack';
import colorPalette from "../constants/ColorPalette";
import { useSelector, useDispatch } from "react-redux";
import { LoggedInParamList, RootState, FiltersState, Filters } from "../../types";
import { updateFilters } from "../redux/actions";

const _screen = Dimensions.get("screen");

export interface BurgerScreenProps {
    navigation: StackNavigationProp<LoggedInParamList, "BurgerScreen">
}

export default function BurgerScreen({ navigation }: BurgerScreenProps) {
    // Original state of users FilterState from redux store
    const filtersState = useSelector<RootState, FiltersState>((state) => state.filtersState);
    // useDispatch allows us to dispatch Actions to mutate global store variables
    const dispatch = useDispatch();
    
    /*
    _______________________
    All user input filters
    _______________________
    */
   // Smart Filter
    const [smartFilter, setSmartFilter] = React.useState(filtersState.filters.smartFilter);
    // Dish Types
    const [dishTypesOpen, setdishTypesOpen] = React.useState(false);
    // setting initial state type to 'any' due to restrictions with
    // data type provided by react-native-dropdown-picker for setValue<ValuType | ValueType[] | null>
    // ... in compreSettings() .length is used and, ValueType consists of a number data type
    //     which does not contain property length: causes Error
    const [dishTypes, setDishTypesValue] = React.useState<any>(filtersState.filters.dishTypes);
    const [dishTypesItems, setDishTypesItems] = React.useState([
        {label: "Breakfast", value: "breakfast",
            icon: () => <Ionicons name="restaurant" size={18} />},
        {label: "Lunch", value: "lunch",
            icon: () => <Ionicons name="restaurant" size={18} />},
        {label: "Dinner", value: "dinner",
            icon: () => <Ionicons name="restaurant" size={18} />},
        {label: "Dessert", value: "dessert",
            icon: () => <MaterialCommunityIcons name="cupcake" size={18} />},
        {label: "Beverage", value: "beverage",
            icon: () => <MaterialCommunityIcons name="glass-cocktail" size={18} />}
    ]);
    // Cuisines
    const [cuisineOpen, setCuisineOpen] = React.useState(false);
    // cuisines is a String data type with 1 cuisine value
    const [cuisine, setCuisineValue] = React.useState<any>(filtersState.filters.cuisine);
    const [cuisineItems, setCuisineItems] = React.useState([
        {label: "All", value: "",
            icon: () => <Emoji name="rainbow-flag" />},
        {label: "American", value: "american",
            icon: () => <Emoji name="us" />},
        {label: "Chinese", value: "chinese",
            icon: () => <Emoji name="cn"/>},
        {label: "French", value: "french",
            icon: () => <Emoji name="fr"/>},
        {label: "German", value: "german",
            icon: () => <Emoji name="de"/>},
        {label: "Greek", value: "greek",
            icon: () => <Emoji name="flag-gr"/>},
        {label: "Indian", value: "indian",
            icon: () => <Emoji name="flag-in"/>},
        {label: "Italian", value: "italian",
            icon: () => <Emoji name="it"/>},
        {label: "Japanese", value: "japanese",
            icon: () => <Emoji name="jp"/>},
        {label: "Korean", value: "korean",
            icon: () => <Emoji name="kr"/>},
        {label: "Mexican", value: "mexican",
            icon: () => <Emoji name="flag-mx"/>},
        {label: "Thai", value: "thai",
            icon: () => <Emoji name="flag-th"/>},
        {label: "Vietnamese", value: "vietnamese",
            icon: () => <Emoji name="flag-vn"/>}
    ]);
    // Vegetarian
    const [vegetarian, setVegetarian] = React.useState(filtersState.filters.vegetarian);
    // Vegan
    const [vegan, setVegan] = React.useState(filtersState.filters.vegan);
    // Gluten Free
    const [glutenFree, setGlutenFree] = React.useState(filtersState.filters.glutenFree);
    // Dairy Free
    const [dairyFree, setDairyFree] = React.useState(filtersState.filters.dairyFree);
    const [changesMade, setChangesMade] = React.useState(false)


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
    }, [smartFilter, dishTypes, cuisine, vegetarian, vegan, glutenFree, dairyFree]);

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
        // Check length first to save processing
        if (dishTypes.length !== filtersState.filters.dishTypes.length) {
            setChangesMade(true);
            return true;
        // Check each element in dishTypes against original state of filters
        } else {
            let different = false;
            for (let i = 0; i < dishTypes.length; i++) {
                if (!filtersState.filters.dishTypes.includes(dishTypes[i])) {
                    different = true;
                }
            }
            if (different) {
                setChangesMade(true);
                return true;
            } else {
                setChangesMade(false);
                return false;
            }
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
        dispatch(updateFilters({
            ...filtersState.filters,
            smartFilter: smartFilter,
            dishTypes: dishTypes,
            cuisine: cuisine,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            dairyFree: dairyFree
        }))

        navigation.navigate("MenuScreen");
    }


    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.title}>Recipe Filters</Text>
                <View style={[styles.filtersContainers, styles.smartFilterContainer]}>
                    <Text>Smart Filter: </Text>
                    <Pressable
                        style={[styles.checkboxBase, smartFilter && styles.checkboxChecked]}
                        onPress={handleSmartFilterCheckbox}>
                        {smartFilter ? (
                            <MaterialCommunityIcons name="check-bold" size={18} color="black" />
                        ) : (
                            <MaterialCommunityIcons name="check-outline" size={18} color={colorPalette.trim} />
                        )}
                    </Pressable>
                </View>
                
                <View style={[styles.filtersContainers, styles.dropDown, styles.z2]}>
                    <Text>Dish Types: </Text>
                    <DropDownPicker
                        zIndex={3000}
                        // zIndexInverse={1000}
                        multiple={true}
                        min={0}
                        max={5}
                        open={dishTypesOpen}
                        value={dishTypes}
                        items={dishTypesItems}
                        setOpen={setdishTypesOpen}
                        setValue={setDishTypesValue}
                        setItems={setDishTypesItems}
                        translation={{
                            PLACEHOLDER: "Select your type(s)",
                            SEARCH_PLACEHOLDER: "Type something...",
                            SELECTED_ITEMS_COUNT_TEXT: "{count} type(s) selected",
                            NOTHING_TO_SHOW: "There\'s nothing to show!"
                        }}
                        style={styles.dropdown}
                        containerStyle={styles.dropdown}
                        ArrowUpIconComponent={({}) => <MaterialCommunityIcons name="menu-up-outline" size={24} />}
                        ArrowDownIconComponent={({}) => <MaterialCommunityIcons name="menu-down-outline" size={24} />}

                    />
                </View>

                <View style={[styles.filtersContainers, styles.dropDown, styles.z1]}>
                    <Text>Cuisine: </Text>
                    <DropDownPicker
                        zIndex={2000}
                        // zIndexInverse={2000}
                        listMode="SCROLLVIEW"
                        open={cuisineOpen}
                        value={cuisine}
                        items={cuisineItems}
                        setOpen={setCuisineOpen}
                        setValue={setCuisineValue}
                        closeAfterSelecting={true}
                        setItems={setCuisineItems}
                        translation={{
                            PLACEHOLDER: "Select your cuisine",
                            SEARCH_PLACEHOLDER: "Type something...",
                            SELECTED_ITEMS_COUNT_TEXT: "{count} cuisine selected",
                            NOTHING_TO_SHOW: "There\'s nothing to show!"
                        }}
                        style={styles.dropdown}
                        containerStyle={styles.dropdown}
                        ArrowUpIconComponent={({}) => <MaterialCommunityIcons name="menu-up-outline" size={24} />}
                        ArrowDownIconComponent={({}) => <MaterialCommunityIcons name="menu-down-outline" size={24} />}
                        maxHeight={300}

                    />
                </View>

                <View style={[styles.filtersContainers, styles.checkBoxContainer]}>
                    <View style={styles.labelAndCheckbox}>
                        <Text>Vegetarian: </Text>
                        <Pressable
                            style={[styles.checkboxBase, vegetarian && styles.checkboxChecked, {marginRight: 35}]}
                            onPress={handleVegetarianCheckbox}>
                            {vegetarian ? (
                                <MaterialCommunityIcons name="check-bold" size={18} color="black" />
                            ) : (
                                <MaterialCommunityIcons name="check-outline" size={18} color={colorPalette.trim} />
                            )}
                        </Pressable>
                    </View>
                    <View style={styles.labelAndCheckbox}>
                    <Text>Vegan: </Text>
                        <Pressable
                            style={[styles.checkboxBase, vegan && styles.checkboxChecked, {marginRight: 35}]}
                            onPress={handleVeganCheckbox}>
                            {vegan ? (
                                <MaterialCommunityIcons name="check-bold" size={18} color="black" />
                            ) : (
                                <MaterialCommunityIcons name="check-outline" size={18} color={colorPalette.trim} />
                            )}
                        </Pressable>
                    </View>
                </View>

                <View style={[styles.filtersContainers, styles.checkBoxContainer]}>
                <View style={styles.labelAndCheckbox}>
                    <Text>Gluten Free: </Text>
                        <Pressable
                            style={[styles.checkboxBase, glutenFree && styles.checkboxChecked, {marginRight: 35}]}
                            onPress={handleGlutenFreeCheckbox}>
                            {glutenFree ? (
                                <MaterialCommunityIcons name="check-bold" size={18} color="black" />
                            ) : (
                                <MaterialCommunityIcons name="check-outline" size={18} color={colorPalette.trim} />
                            )}
                        </Pressable>
                    </View>
                    <View style={styles.labelAndCheckbox}>
                        <Text>Dairy Free: </Text>
                        <Pressable
                            style={[styles.checkboxBase, dairyFree && styles.checkboxChecked, {marginRight: 35}]}
                            onPress={handleDairyFreeCheckbox}>
                            {dairyFree ? (
                                <MaterialCommunityIcons name="check-bold" size={18} color="black" />
                            ) : (
                                <MaterialCommunityIcons name="check-outline" size={18} color={colorPalette.trim} />
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.applyContainer}>
                {changesMade && 
                    <TouchableOpacity
                    onPress={handleApply}
                    activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[colorPalette.popLight, colorPalette.popDark]}
                            style={styles.applyButton}
                        >
                            <Text
                                style={{color: "black"}}
                            >Apply</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorPalette.background
    },

    subContainer: {
        flex: 10,
        paddingBottom: 100,
        justifyContent: "center",
        alignItems: "center",
        width: _screen.width*0.9,
        height: _screen.height*0.6,
        borderRadius: 30,
        backgroundColor: colorPalette.primary
    },

    title: {
        marginBottom: 16,
        fontSize: 28,
        fontWeight: "bold",
        color: colorPalette.background
    },

    filtersContainers: {
        marginVertical: 8,
        width: _screen.width*0.85,
        height: _screen.height*0.04,
        borderRadius: 30,
        backgroundColor: colorPalette.secondary
    },

    smartFilterContainer: {
        flexDirection: "row",
        paddingHorizontal: 100,
        justifyContent: "space-between",
        alignItems: "center",
    },

    z1: {
        elevation: 1000,
        zIndex: 1000
    },

    z2: {
        elevation: 2000,
        zIndex: 2000
    },

    dropDown: {
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },

    dropdown: {
        width: _screen.width*0.5,
        height: _screen.height*0.03,
    },

    checkBoxContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: "center",
    },

    labelAndCheckbox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: _screen.width*0.4,

    },

    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'coral',
        backgroundColor: colorPalette.background,
      },
    
      checkboxChecked: {
        backgroundColor: colorPalette.popDark,
      },

      applyContainer: {
          flex: 1,
          marginVertical: 18
      },

      applyButton: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        width: 200,
        borderRadius: 10,
        padding: 8
    }
})