import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import colorPalette from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");


export default function BurgerScreen() {

    // TODO:
    // - Add all filters
    // - Make API call to update user's filter record
    // - Update filters in global state for randomized Recipes
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text> Burger Screen </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow"
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