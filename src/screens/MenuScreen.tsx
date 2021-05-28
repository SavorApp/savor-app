import React from "react";
import { StyleSheet, View, Text } from "react-native";


export default function MenuScreen() {

    // TODO: 
    // - On load/before render make API requests for randomized Recipes
    // - Apply filters
    // - Compare against User's viewed Recipes list if User is logged in
    // - Apply score and sorting if smart filter is turned on
    return (
        <View style={styles.container}>
            <Text> Menu Screen </Text>
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