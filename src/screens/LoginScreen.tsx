import React from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from "react-redux";
import { InputUser, LoggedOutParamList, RootState, UserState, User } from "../../types";
import { setUser } from "../redux/actions";
import colorPalette from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

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
            <View style={styles.subContainer}>
                <View style={styles.form}>
                    <View style={styles.input}>
                        <MaterialCommunityIcons
                            name="account-outline"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Username"
                            autoCapitalize="none"
                            onChangeText={(val) => usernameInputChange(val)}
                        />
                    </View>

                    <View style={styles.input}>
                        <MaterialCommunityIcons
                            name="lock-outline"
                            size={20}
                        />
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
        height: _screen.height*0.5,
        borderRadius: 30,
        backgroundColor: colorPalette.primary
    },

    form: {
        justifyContent: "center",
        alignItems: "center",
        width: _screen.width*0.7,
        height: _screen.height*0.4,
        borderRadius: 30,
        backgroundColor: colorPalette.secondary
    },

    input: {
        flexDirection: "row",
        marginTop: 10,
        paddingHorizontal: 3,
        borderBottomWidth: 1,
        borderBottomColor: colorPalette.alternate,
        width: _screen.width*0.7
    }
})