import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { SavoredListScreen, RecipeScreen } from "../screens";
import { resetRecipeScreenLeave } from "../redux/actions";

export interface SavoredListNavigatorProps {
  navigation: StackNavigationProp<
    SavoredListStackParamList,
    "SavoredListScreen"
  >;
}

const SavoredListStack = createStackNavigator();

// SavoredList tab navigator
export default function SavoredListNavigator({
  navigation,
}: SavoredListNavigatorProps) {
  const dispatch = useDispatch();

  // Set leaveRecipeScreenState leave to false so that,
  // user can safely navigate to RecipeScreen
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(resetRecipeScreenLeave());
    });
  }, [navigation]);

  return (
    <SavoredListStack.Navigator>
      <SavoredListStack.Screen
        name="SavoredListScreen"
        component={SavoredListScreen}
        options={{
          headerTitle: () => {
            return (
              <View style={styles.headerContainer}>
                <Image
                  source={require("../../assets/header.png")}
                  style={styles.headerImage}
                />
              </View>
            );
          },
        }}
      />
      <SavoredListStack.Screen
        name="RecipeScreen"
        // TODO: Research whether there is another solution than to cast
        component={RecipeScreen as React.FC}
        options={{
          headerBackImage: () => <Ionicons name="chevron-back" size={36} />,
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            marginLeft: 12,
          },
          headerTitle: () => {
            return (
              <View style={styles.headerContainer}>
                <Text style={{fontSize: 24}}>Recipe Information</Text>
              </View>
            );
          },
        }}
      />
    </SavoredListStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },

  headerImage: {
    flex: 1,
    resizeMode: "contain",
    width: 200,
  },
});
