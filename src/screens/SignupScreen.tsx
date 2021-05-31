import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedOutParamList } from "../../types"
import colorPalette from "../constants/ColorPalette";
import {firebaseApp, api} from "../constants/Firebase"

const _screen = Dimensions.get("screen");
export interface SignupScreenProps {
    navigation: StackNavigationProp<LoggedOutParamList, "SignupScreen">
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    console.log("THIS IS EMAIL: ", email, "THIS IS PASSWORD: ", password)
    console.log("THIS IS API:", typeof api)

    const handleSignUp = async () => {
        if(email && password) {
            try {
                const user = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
                if(user) {
                    Alert.alert(JSON.stringify(user));
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert("Error", "Missing fields")
        }
    }

    return (
        <View style={styles.container}>
            <Text> Signup Screen </Text>
            <View style={styles.subContainer}>
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} />
                <TouchableOpacity
                    onPress={() => {

                        // TODO: 
                        // - Register user by making API request
                        handleSignUp()
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
        backgroundColor: colorPalette.primary
    }
})