import React from "react";
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
                    }
                }}
            />
        </SavoredListStack.Navigator>
    )
}
