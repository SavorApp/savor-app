import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { ChefScreen, LoginScreen } from "../screens";
import { useSelector, useDispatch } from "react-redux";
import { leaveRecipeScreen } from "../redux/actions";

export interface ChefNavigatorProps {
  navigation: StackNavigationProp<ChefStackParamList, "ChefScreen">;
}

const ChefStack = createStackNavigator();

// Chef tab navigator
export default function ChefNavigator({ navigation }: ChefNavigatorProps) {
  const dispatch = useDispatch();
  const userState = useSelector<RootState, UserState>(
    (state) => state.userState
  );

  // Set leaveRecipeScreenState leave to true so that,
  // when user navigates away from SavoredList,
  // SavoredList tab pops to SavoredList
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(leaveRecipeScreen());
    });
  }, [navigation]);

  // Getting isLoggedIn from the global state.
  let isLoggedIn: Boolean = userState.isLoggedIn;

  return (
    <ChefStack.Navigator>
      {isLoggedIn ? (
        <ChefStack.Screen
          name="ChefScreen"
          component={ChefScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ChefSettingsScreen");
                }}
              >
                <Ionicons
                  name="settings-sharp"
                  size={32}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
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
      ) : (
        <ChefStack.Screen
          name="LoginScreen"
          component={LoginScreen}
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
      )}
    </ChefStack.Navigator>
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
