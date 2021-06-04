import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { SwipeButtonsParamList } from "../../types"
import { shadowStyle } from "../constants/ColorPalette";


export default function SwipeButtons({ handleOnPressLeft, handleOnPressRight, currentRecipe }: SwipeButtonsParamList) {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleOnPressLeft}>
                <Ionicons name="thumbs-down-sharp" size={24} color="#B50000" />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={() => {console.log(currentRecipe)}}>
                <Ionicons name="md-information-circle-sharp" size={24} color="grey" />
            </TouchableOpacity> */}
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