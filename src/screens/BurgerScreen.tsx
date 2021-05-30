import React from "react";
import { StyleSheet, Dimensions, View, Text, Pressable, TouchableOpacity } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
    // setting initial state type to any due to restrictions with
    // data type provided by react-native-dropdown-picker for setValue<ValuType | ValueType[] | null>
    // ... in compreSettings() dishtype.length is used and, ValuType consists of data type number
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
    // Diets
    const [diets, setDiets] = React.useState(filtersState.filters.diets);
    const [cuisines, setCuisines] = React.useState(filtersState.filters.cuisines);
    const [changesMade, setChangesMade] = React.useState(false)


    // Listen to when smartFilter changes.
    // If it does, compare the current filters to the original state of the filters
    React.useEffect(() => {
        console.log(dishTypes)
      compareSettings();
    }, [smartFilter, dishTypes]);

    // Compare each filter and decide to display the Apply button, or not
    function compareSettings() {
        // Simply Boolean comparison
        if (smartFilter !== filtersState.filters.smartFilter) {
            setChangesMade(true);
        } else {
            setChangesMade(false);
        }

        // Check length first to save processing
        if (dishTypes.length !== filtersState.filters.dishTypes.length) {
            setChangesMade(true);
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
            }
        }
    }

    function handleSmartFilterCheckbox() {
        // Toggle smartFilter state
        setSmartFilter(!smartFilter);
    }

    function handleApply() {
        // dispatch(updateFilters({
        //     ...filtersState.filters,
        //     smartFilter: smartFilter,
        //     diets: diets,
        //     cuisines: cuisines
        // }))

        // navigation.navigate("MenuScreen");
        console.log(dishTypes);
    }


    // TODO:
    // - Add all filters
    // - Make API call to update user's filter record
    // - Update filters in global state for randomized Recipes
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
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
                
                <View style={[styles.filtersContainers, styles.dishTypesContainer]}>
                    <Text>Dish Types: </Text>
                    <DropDownPicker
                        multiple={true}
                        min={0}
                        max={5}
                        open={dishTypesOpen}
                        value={dishTypes}
                        items={dishTypesItems}
                        setOpen={setdishTypesOpen}
                        setValue={setDishTypesValue}
                        translation={{
                            PLACEHOLDER: "Select your type(s)",
                            SEARCH_PLACEHOLDER: "Type something...",
                            SELECTED_ITEMS_COUNT_TEXT: "{count} type(s) selected",
                            NOTHING_TO_SHOW: "There\'s nothing to show!"
                        }}
                        style={styles.dropdown}
                        containerStyle={styles.dropdown}
                        ArrowUpIconComponent={({}) => <MaterialCommunityIcons name="food-apple" size={18} />}
                        ArrowDownIconComponent={({}) => <MaterialCommunityIcons name="food-apple-outline" size={18} />}

                    />
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
        justifyContent: "center",
        alignItems: "center",
        width: _screen.width*0.9,
        height: _screen.height*0.6,
        borderRadius: 30,
        backgroundColor: colorPalette.primary
    },

    filtersContainers: {
        marginVertical: 4,
        width: _screen.width*0.85,
        height: _screen.height*0.04,
        borderRadius: 30,
        backgroundColor: colorPalette.secondary
    },

    smartFilterContainer: {
        flexDirection: "row",
        paddingHorizontal: 80,
        justifyContent: "space-between",
        alignItems: "center",
    },

    dishTypesContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },

    dropdown: {
        width: _screen.width*0.5,
        height: _screen.height*0.03,
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