import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from "react-native";
import { MenuScreen } from "../screens"
import { MenuStackParamList } from "../../types"

export interface MenuNavigatorProps {
    navigation: StackNavigationProp<MenuStackParamList, "BurgerScreen">
}

const MenuStack = createStackNavigator();
// Menu tab navigator header right contains burger icon
// which navigates to the BurgerScreen
export default function MenuNavigator({ navigation }: MenuNavigatorProps) {
    
    return (
        <MenuStack.Navigator>
            <MenuStack.Screen
                name="MenuScreen"
                component={MenuScreen}
                options={{
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                // Check if user is logged in, if so nevigate to BurgerScreen
                                navigation.navigate("BurgerScreen")
                                // else, nevigate to another component prompting user to login/create account
                            }}
                        >
                            <MaterialCommunityIcons
                                name="menu"
                                size={36}
                            />
                        </TouchableOpacity>
                    ) }}
            />
        </MenuStack.Navigator>
    )
    
}