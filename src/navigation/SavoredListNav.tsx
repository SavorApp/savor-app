import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import { SavoredListScreen, RecipeScreen } from "../screens"

const SavoredListStack = createStackNavigator();

// SavoredList tab navigator
export default function SavoredListNavigator() {
    return (
        <SavoredListStack.Navigator>
            <SavoredListStack.Screen
                name="SavoredListScreen"
                component={SavoredListScreen}
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
            <SavoredListStack.Screen
                name="RecipeScreen"
                // TODO: Research whether there is another solution than to cast
                component={(RecipeScreen as React.FC)}
                options={{
                    headerBackImage:  () => <Ionicons name="chevron-back" size={36} />,
                    headerBackTitleVisible: false,
                    headerLeftContainerStyle: {
                        marginLeft: 12
                    },
                    headerTitle: () => {
                        return (
                            <View style={styles.headerContainer}>
                                <Image source={require("../../assets/header.png")} style={styles.headerImage}/>
                            </View>
                        )
                    }
                }}
            />
        </SavoredListStack.Navigator>
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

