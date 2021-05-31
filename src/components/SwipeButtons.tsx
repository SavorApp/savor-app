import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native"
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SwipeButtonsParamList } from "../../types"
import { shadowStyle } from "../constants/ColorPalette";


export default function SwipeButtons({ handleOnPressLeft, handleOnPressRight }: SwipeButtonsParamList) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleOnPressLeft}>
                <Feather name="x-circle" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleOnPressRight}>
                <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        height: 75,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"

    },
    button: {
        width: 50,
        height: 50,
        marginLeft: "5%",
        marginRight: "5%",
        backgroundColor: "white",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        ...shadowStyle,
        elevation: 9,
    },
})