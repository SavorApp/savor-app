import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SignupScreen, AboutUsScreen, DeleteAccountScreen, BurgerScreen, ProtectedBurgerScreen, InstructionsScreen } from '../screens';
import BottomTabNavigator from "./BottomTab";


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
      <NavigationContainer
        fallback={<Text>Loading...</Text>}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    );
}


const RootStack = createStackNavigator<RootStackParamList>();

// Root Navigator
// - Root -> Bottom Tab Navigator screen routes
// - Other screens -> Modals
function RootNavigator() {
  return (
    <RootStack.Navigator mode ="modal">
      <RootStack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }}/>
      <RootStack.Screen 
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerBackImage:  () => <Ionicons name="chevron-down-sharp" size={36} />,
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
        }}/>
      <RootStack.Screen 
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          headerBackImage:  () => <Ionicons name="chevron-down-sharp" size={36} />,
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
        }}/>
      <RootStack.Screen 
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
        options={{
          headerBackImage:  () => <Ionicons name="chevron-down-sharp" size={36} />,
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
        }}/>
      <RootStack.Screen 
        name="BurgerScreen"
        component={BurgerScreen}
        options={{
          headerBackImage:  () => <Ionicons name="chevron-down-sharp" size={36} />,
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
        }}/>
      <RootStack.Screen 
        name="ProtectedBurgerScreen"
        component={ProtectedBurgerScreen}
        options={{
          headerBackImage:  () => <Ionicons name="chevron-down-sharp" size={36} />,
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
        }}/>
      <RootStack.Screen 
        name="InstructionsScreen"
        component={InstructionsScreen}
        options={{
          headerBackImage:  () => <Ionicons name="chevron-down-sharp" size={36} />,
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
        }}/>
    </RootStack.Navigator>
  );
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
