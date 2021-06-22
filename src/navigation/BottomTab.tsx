import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ChefNavigator from "./ChefNav";
import MenuNavigator from "./MenuNav";
import SavoredListNavigator from "./SavoredListNav";
import { Dimensions } from "react-native";

const _screen = Dimensions.get("screen");

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Menu"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelPosition: "below-icon",
        style: { height: _screen.height * 0.12 },
      }}
    >
      <BottomTab.Screen
        name="Chef"
        component={ChefNavigator}
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
  return <MaterialCommunityIcons size={36} {...props} />;
}
