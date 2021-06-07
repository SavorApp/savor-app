import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { MenuScreen } from "../screens"
import { useSelector } from "react-redux";


export interface MenuNavigatorProps {
    navigation: StackNavigationProp<MenuStackParamList, "MenuScreen">
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
                    ),
                    headerTitle: () => {
                        return (
                            <View style={styles.headerContainer}>
                                <Image source={require("../../assets/header.png")} style={styles.headerImage}/>
                            </View>
                        )
                    }
                }}
            />
        </MenuStack.Navigator>
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
