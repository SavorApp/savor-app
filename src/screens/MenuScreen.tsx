import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import colorPalette from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

export default function MenuScreen() {

    // TODO: 
    // - Setup Recipe Reducers & brin in RecipeState
    // - On load/before render make API requests for randomized Recipes (Spoonacular)
    // - Apply filters
    // - Compare against User's viewed Recipes list if User is logged in
    // - Apply score and sorting if smart filter is turned on
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text> Menu Screen </Text>
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
    }
})