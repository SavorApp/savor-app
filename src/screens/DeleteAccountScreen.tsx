import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInParamList } from "../../types"

export interface DeleteAccountScreenProps {
    navigation: StackNavigationProp<LoggedInParamList, "DeleteAccountScreen">
}


export default function DeleteAccountScreen({ navigation }: DeleteAccountScreenProps) {

    return (
        <View style={styles.container}>
            <Text> Delete Account Screen </Text>
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