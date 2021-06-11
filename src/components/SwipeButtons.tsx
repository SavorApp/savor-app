import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { shadowStyle } from "../constants/ColorPalette";
import { StackNavigationProp } from "@react-navigation/stack";

export default function SwipeButtons({ handleOnPressLeft, handleOnPressRight, rcp, navigateToMoreInfoScreen}: SwipeButtonsParamList) {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleOnPressLeft}>
                <Ionicons name="thumbs-down-sharp" size={24} color="#B50000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {rcp && navigateToMoreInfoScreen(rcp)}}>
                <Ionicons name="md-information-circle-sharp" size={24} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleOnPressRight}>
                <Ionicons name="thumbs-up-sharp" size={24} color="green" />
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