import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedOutParamList } from "../../types"

export interface SignupProps {
    navigation: StackNavigationProp<LoggedOutParamList, "SignupScreen">
}

export default function SignupScreen({ navigation }: SignupProps) {

    return (
        <View style={styles.container}>
            <Text> Signup Screen </Text>
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