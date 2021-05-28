import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedOutParamList } from "../../types"

export interface LoginProps {
    navigation: StackNavigationProp<LoggedOutParamList, "LoginScreen">
}

export default function LoginScreen({ navigation }: LoginProps) {

    // TODO: 
    // - Authenticate User
    // - Update global state if Authentication passes
    return (
        <View style={styles.container}>
            <Text> Login Screen </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("SignupScreen")}
            >
                <Text>Sign Up</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("AboutUsScreen")}
            >
                <Text>About Us</Text>

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