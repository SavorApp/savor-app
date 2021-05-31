import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

export default function AboutUsScreen() {

    // TODO: Include information about us
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text> About Us Screen </Text>
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
        backgroundColor: colorPalette.primary,
        ...shadowStyle
    }
})