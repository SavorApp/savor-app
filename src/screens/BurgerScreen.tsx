import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function BurgerScreen() {

    // TODO:
    // - Add all filters
    // - Make API call to update user's filter record
    // - Update filters in global state for randomized Recipes
    return (
        <View style={styles.container}>
            <Text> Burger Screen </Text>
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