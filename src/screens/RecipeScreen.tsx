import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import colorPalette from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

export default function RecipeScreen({route}: {route: any}) {
    const { recipeId } = route.params;
    
    // TODO: take recipeId and make API request for Recipe information
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text> Recipe {recipeId} Screen </Text>
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