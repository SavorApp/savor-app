import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ChefNavigator from "./ChefNav";
import MenuNavigator from "./MenuNav";
import SavoredListNavigator from "./SavoredListNav";
import { Dimensions, Platform, PlatformIOSStatic } from "react-native";
import { font } from "../constants/Styling";

const _screen = Dimensions.get("screen");

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const { tagSize } = font;

  let PlatformIdentifier;
  if (Platform.OS === "ios") {
    // Used to determine iPad vs non-iPad
    PlatformIdentifier = Platform as PlatformIOSStatic;
  } else {
    PlatformIdentifier = Platform;
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Menu"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelPosition: "below-icon",
        labelStyle: {
          fontSize:
            PlatformIdentifier.OS === "ios"
              ? PlatformIdentifier.isPad
                ? 16
                : tagSize
              : tagSize,
          marginBottom:
            PlatformIdentifier.OS === "ios"
              ? PlatformIdentifier.isPad
                ? 8
                : 0
              : 0,
        },
        style: {
          height:
            PlatformIdentifier.OS === "ios"
              ? PlatformIdentifier.isPad
                ? _screen.height * 0.1
                : _screen.height * 0.12
              : _screen.height * 0.12,
        },
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
  let PlatformIdentifier;
  if (Platform.OS === "ios") {
    // Used to determine iPad vs non-iPad
    PlatformIdentifier = Platform as PlatformIOSStatic;
  } else {
    PlatformIdentifier = Platform;
  }
  return (
    <MaterialCommunityIcons
      size={
        PlatformIdentifier.OS === "ios"
          ? PlatformIdentifier.isPad
            ? 55
            : 36
          : 36
      }
      {...props}
    />
  );
}
