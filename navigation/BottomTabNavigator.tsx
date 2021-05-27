/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from '../types';
import LoginScreen from '../screens/LoginScreen';
import ChefsScreen from '../screens/ChefsScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LoggedInStack = createStackNavigator<TabOneParamList>();
const LoggedOutStack = createStackNavigator<TabOneParamList>();

export function TabOneNavigator() {
  const isLoggedIn: Boolean = false;
  return (
    isLoggedIn ? (
      <LoggedInStack.Navigator screenOptions={{ headerShown: false }}>
        <LoggedInStack.Screen
          name="TabOneScreen"
          component={TabOneScreen}
        />
        <LoggedInStack.Screen
          name="ChefsScreen"
          component={ChefsScreen}
        />
      </LoggedInStack.Navigator>
    ) : (
      <LoggedOutStack.Navigator screenOptions={{ headerShown: false }}>
        <LoggedOutStack.Screen
          name="TabOneScreen"
          component={TabOneScreen}
        />
        <LoggedOutStack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
      </LoggedOutStack.Navigator>
    )
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator screenOptions={{ headerShown: false }}>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator screenOptions={{ headerShown: false }}>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
      />
    </TabThreeStack.Navigator>
  );
}