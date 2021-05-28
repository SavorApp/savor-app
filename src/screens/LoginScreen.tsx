import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from "react-redux";
import { UserState, User } from "../redux/reducers/user"
import { setUser } from "../redux/actions"
import { LoggedOutParamList } from "../../types"

export interface LoginProps {
    navigation: StackNavigationProp<LoggedOutParamList, "LoginScreen">
}

export default function LoginScreen({ navigation }: LoginProps) {
    // userSelector allows us to access global store variables
    const user = useSelector<UserState, User>((state) => state.user);
    // useDispatch allows us to dispatch Actions to mutate global store variables
    const dispatch = useDispatch();

    React.useEffect(() => {
        // Log initialState user
        console.log("INITIAL USER: ", user);
    
        // Create fake user object
        const testUser = {
            id: 1991,
            username: "testuser",
            image_url: "myProfile.png"
        };
    
        // dispatch setUser with testUser to mutate current user
        // i.e. log user in so user is accessible globally
        function loginUser(user: User) {
            dispatch(setUser(user))
        } 
    
        // Login user
        // loginUser(testUser);
    
        // console.log("UPDATED USER: ", user);
    }, [])


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