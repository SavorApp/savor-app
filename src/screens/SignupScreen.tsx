import React from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedOutParamList } from "../../types"
import colorPalette from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");
export interface SignupProps {
    navigation: StackNavigationProp<LoggedOutParamList, "SignupScreen">
}

export default function SignupScreen({ navigation }: SignupProps) {

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
        backgroundColor: "yellow"
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