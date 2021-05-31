import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList } from "../../types";
import LoggedInNavigator from "./LoggedIn";
import LoggedOutNavigator from "./LoggedOut";
import MenuNavigator from "./Menu";
import SavoredListNavigator from "./SavoredList";
import { useSelector } from "react-redux";
import { RootState, UserState } from "../../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );

  // Getting isLoggedIn from the global state.
  let isLoggedIn: Boolean = userState.isLoggedIn;

  return (
    <BottomTab.Navigator
      initialRouteName="Menu"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Chef"
        component={isLoggedIn ? LoggedInNavigator : LoggedOutNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chef-hat" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="map-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SavoredList"
        component={SavoredListNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="silverware-variant" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}
