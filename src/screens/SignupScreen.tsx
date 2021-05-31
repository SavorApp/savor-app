import React from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedOutParamList } from "../../types"
import { colorPalette, shadowStyle } from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");
export interface SignupScreenProps {
    navigation: StackNavigationProp<LoggedOutParamList, "SignupScreen">
}

export default function SignupScreen({ navigation }: SignupScreenProps) {

    return (
        <View style={styles.container}>
            <Text> Signup Screen </Text>
            <View style={styles.subContainer}>
                <TouchableOpacity
                    onPress={() => {

                        // TODO: 
                        // - Register user by making API request
                        navigation.goBack()
                    }}
                >
                    <Text>Register</Text>

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
        backgroundColor: colorPalette.primary,
        ...shadowStyle
    }
})