import React from "react";
import { StyleSheet, Dimensions, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colorPalette from "../constants/ColorPalette";
import { useSelector, useDispatch } from "react-redux";
import { RootState, FiltersState, Filters } from "../../types";
import { updateFilters } from "../redux/actions";

const _screen = Dimensions.get("screen");


export default function BurgerScreen() {
    // userSelector allows us to access global store variables
    const filtersState = useSelector<RootState, FiltersState>((state) => state.filtersState);
    // useDispatch allows us to dispatch Actions to mutate global store variables
    const dispatch = useDispatch();
    // User input for all filters
    // initially set to the current filtersState.filters value
    const [userInput, setUserInput] = React.useState<Filters>(filtersState.filters);
    // All user input filters:
    const [smartFilter, setSmartFilter] = React.useState(filtersState.filters.smartFilter);
    // const [diets, setDiets] = React.useState([""]);
    // const [cuisines, setCuisines] = React.useState([""]);

    console.log("USER: ", userInput);
    console.log("SMART: ", smartFilter)
    console.log("STATE: ", filtersState.filters.smartFilter);

    function handleSmartFilterCheckbox() {
        // Toggle smartFilter state
        setSmartFilter(!smartFilter);

        // Update user input
        setUserInput({
            ...userInput,
            smartFilter: smartFilter
        });

        // Dispatch changed filter values
        dispatch(updateFilters(userInput));
    }


    // TODO:
    // - Add all filters
    // - Make API call to update user's filter record
    // - Update filters in global state for randomized Recipes
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text> Burger Screen </Text>
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
        justifyContent: "center",
        alignItems: "center",
        width: _screen.width*0.9,
        height: _screen.height*0.6,
        borderRadius: 30,
        backgroundColor: colorPalette.primary
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
})