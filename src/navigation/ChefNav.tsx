import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChefScreen, LoginScreen } from "../screens"
import { useSelector } from "react-redux";

const ChefStack = createStackNavigator();

// Chef tab navigator 
export default function ChefNavigator() {
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );

  // Getting isLoggedIn from the global state.
  let isLoggedIn: Boolean = userState.isLoggedIn;

  
    return (
        <ChefStack.Navigator >
          {isLoggedIn ? (
            <ChefStack.Screen name="ChefScreen" component={ChefScreen} />
          ) : (
            <ChefStack.Screen
                name="LoginScreen"
                component={LoginScreen}
            />
          )}
        </ChefStack.Navigator>
    )
    
}
