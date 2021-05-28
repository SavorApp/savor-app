import React from "react";
import { StyleSheet, View, Text } from "react-native";


export default function AboutUsScreen() {

    // TODO: Include information about us
    return (
        <View style={styles.container}>
            <Text> About Us Screen </Text>
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