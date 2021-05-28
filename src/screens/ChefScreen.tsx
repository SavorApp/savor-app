import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInParamList } from "../../types"

export interface ChefScreenProps {
    navigation: StackNavigationProp<LoggedInParamList, "ChefScreen">
}

export default function ChefScreen({ navigation }: ChefScreenProps) {
    
    // TODO: Make this page look like a profile page
    return (
        <View style={styles.container}>
            <Text> Chefs Screen </Text>
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