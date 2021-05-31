import React from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInParamList } from "../../types"
import { colorPalette, shadowStyle } from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

export interface DeleteAccountScreenProps {
    navigation: StackNavigationProp<LoggedInParamList, "DeleteAccountScreen">
}


export default function DeleteAccountScreen({ navigation }: DeleteAccountScreenProps) {

    return (
        <View style={styles.container}>
            <Text> Delete Account Screen </Text>
            <View style={styles.subContainer}>
                <Text> Are you sure you want to delete your account? </Text>
                <TouchableOpacity
                    onPress={() => {

                        // TODO: Sign Chef out & Delete Account
                        navigation.navigate("LoginScreen")
                    }}
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
        backgroundColor: colorPalette.primary,
        ...shadowStyle
    }
})