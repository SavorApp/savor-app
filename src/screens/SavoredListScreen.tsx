import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { SavoredListParamList } from "../../types"

export interface SavoredListProps {
    navigation: StackNavigationProp<SavoredListParamList, "SavoredListScreen">
}

export default function SavoredListScreen({ navigation }: SavoredListProps) {

    // TODO: Get Savored List from global state
    return (
        <View style={styles.container}>
            <Text> Savored List Screen </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("RecipeScreen", {recipeId: "recipeID_12345"})}
            >
                <Text>Recipe 1</Text>

            </TouchableOpacity>
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