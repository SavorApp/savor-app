import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from "react-redux";
import { UserState, User } from "../redux/reducers/user"
import { RootState } from "../redux/reducers/"
import { setUser } from "../redux/actions"
import { LoggedOutParamList } from "../../types"
import { InputUser } from "../dataTypes";

export interface LoginProps {
    navigation: StackNavigationProp<LoggedOutParamList, "LoginScreen">
}

export default function LoginScreen({ navigation }: LoginProps) {
    // userSelector allows us to access global store variables
    const userState = useSelector<RootState, UserState>((state) => state.userState);
    // useDispatch allows us to dispatch Actions to mutate global store variables
    const dispatch = useDispatch();
    const [userInput, setUserInput] = React.useState({username: "", password: ""})

    function usernameInputChange(val: string) {
        setUserInput({
            ...userInput,
            username: val
        })
    }

    function passwordInputChange(val: string) {
        setUserInput({
            ...userInput,
            password: val
        })
    }

    function handleLogin(data: InputUser) {
        console.log("USERNAME: ", data.username);
        console.log("PASSWORD: ", data.password);

        // Authenticate user and log user in
        // Use Oauth or axios, etc..
        // const user: User = <AUTHENTICATE>

        // receive user: User after authentication and setUser()
        // dispatch(setUser(user));
    }


    return (
        <View style={styles.container}>
            <Text> Login Screen </Text>

            <View>
                <TextInput
                    placeholder="Your Username"
                    autoCapitalize="none"
                    onChangeText={(val) => usernameInputChange(val)}
                />
            </View>

            <View>
                <TextInput
                    placeholder="Your Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={(val) => passwordInputChange(val)}
                />
            </View>

            <View>
                <TouchableOpacity
                onPress={() => {handleLogin(userInput)}}
                >
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </View>

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