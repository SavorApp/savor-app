import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function RecipeScreen({route}: {route: any}) {
    const { recipeId } = route.params;
    
    // TODO: take recipeId and make API request for Recipe information
    return (
        <View style={styles.container}>
            <Text> Recipe {recipeId} Screen </Text>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow"
    }
})