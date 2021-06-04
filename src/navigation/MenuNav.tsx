import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from "react-native";
import { MenuScreen } from "../screens"
import { useSelector } from "react-redux";

export interface MenuNavigatorProps {
    navigation: StackNavigationProp<MenuStackParamList, "BurgerScreen">
}

const MenuStack = createStackNavigator();
// Menu tab navigator header right contains burger icon
// which navigates to the BurgerScreen
export default function MenuNavigator({ navigation }: MenuNavigatorProps) {
    const userState = useSelector<RootState, UserState>(
        (state) => state.userState
      );
    
    return (
        <MenuStack.Navigator>
            <MenuStack.Screen
                name="MenuScreen"
                component={MenuScreen}
                options={{
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                if (userState.isLoggedIn) {
                                    navigation.navigate("BurgerScreen");
                                } else {
                                    navigation.navigate("ProtectedBurgerScreen");
                                }
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