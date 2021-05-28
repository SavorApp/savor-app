import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChefScreen, LoginScreen } from "../screens"

const LoggedInStack = createStackNavigator();

// Chef tab navigator when User is logged in
export default function LoggedInNavigator() {
    return (
        <LoggedInStack.Navigator>
            <LoggedInStack.Screen
                name="ChefScreen"
                component={ChefScreen}
            />
            <LoggedInStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerLeft: () => undefined }}
            />
        </LoggedInStack.Navigator>
    )
    
}