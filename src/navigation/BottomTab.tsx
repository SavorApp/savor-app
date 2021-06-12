import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ChefNavigator from "./ChefNav";
import MenuNavigator from "./MenuNav";
import SavoredListNavigator from "./SavoredListNav";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Menu"
      tabBarOptions={{
        // activeTintColor: Colors[colorScheme].tint,
        activeTintColor: "#FF5454",
        // inactiveTintColor: "#2e2e2e",
        style: {
          elevation: 70,
          height: 100,
          // backgroundColor: "#ed4a45",
        },
        // showLabel: false,
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
  return (
    <MaterialCommunityIcons style={{ marginTop: 10 }} size={40} {...props} />
  );
}

const styles = StyleSheet.create({});
