import React from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInParamList } from "../../types"
import colorPalette from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");
export interface ChefScreenProps {
    navigation: StackNavigationProp<LoggedInParamList, "ChefScreen">
}

export default function ChefScreen({ navigation }: ChefScreenProps) {
    
    // TODO: Make this page look like a profile page
    return (
        <View style={styles.container}>
            <Text> Chefs Screen </Text>
            <View style={styles.subContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AboutUsScreen")}
                >
                    <Text>About Us</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {

                        // TODO: 
                        // - Log Chef out
                        // - Update global state
                        navigation.navigate("LoginScreen")
                    }}
                >
                    <Text>Logout</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("DeleteAccountScreen")}
                >
                    <Text>Delete Account</Text>

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