import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, SignupScreen, AboutUsScreen } from "../screens"

const LoggedOutStack = createStackNavigator();

// Chef tab navigator when User is logged out
export default function LoggedOutNavigator() {
    return (
        <LoggedOutStack.Navigator >
            <LoggedOutStack.Screen
                name="LoginScreen"
                component={LoginScreen}
            />
        </LoggedOutStack.Navigator>
    )
    
}