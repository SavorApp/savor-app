import React from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { SavoredListParamList } from "../../types"
import colorPalette from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

export interface SavoredListProps {
    navigation: StackNavigationProp<SavoredListParamList, "SavoredListScreen">
}

export default function SavoredListScreen({ navigation }: SavoredListProps) {

    // TODO: Get Savored List from global state
    return (
        <View style={styles.container}>
            <Text> Savored List Screen </Text>
            <View style={styles.subContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("RecipeScreen", {recipeId: "recipeID_12345"})}
                >
                    <Text>Recipe 1</Text>

                </TouchableOpacity>
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
        backgroundColor: colorPalette.primary
    }
})