import React from "react";
import { StyleSheet, View, Image } from "react-native";
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
            <ChefStack.Screen
                name="ChefScreen"
                component={ChefScreen}
                options={{
                  headerTitle: () => {
                    return (
                        <View style={styles.headerContainer}>
                            <Image source={require("../../assets/header.png")} style={styles.headerImage}/>
                        </View>
                    )
                  }
                }}
            />
          ) : (
            <ChefStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerTitle: () => {
                    return (
                        <View style={styles.headerContainer}>
                            <Image source={require("../../assets/header.png")} style={styles.headerImage}/>
                        </View>
                    )
                  }
                }}
            />
          )}
        </ChefStack.Navigator>
    )
    
}

const styles = StyleSheet.create({
  headerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 8
  },

  headerImage: {
    flex: 1,
    resizeMode: "contain",
    width: 200,
  },
});
