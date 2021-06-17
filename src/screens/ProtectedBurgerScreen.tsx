import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Pressable,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Emoji from "react-native-emoji";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

function FakeBurgerScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={[styles.filtersContainers, styles.smartFilterContainer]}>
            <Text style={styles.filterLabel}>Smart Recommendations: </Text>
            <Pressable
              style={[styles.checkboxBase, styles.checkboxChecked]}
              onPress={() => {}}
            >
              <MaterialCommunityIcons name="check-bold" size={18} color="#FF5454" />
            </Pressable>
          </View>
          <View style={{ ...styles.borderline }} />
          <View
            style={[
              styles.filtersContainers,
              styles.dropDownContainer
            ]}
          >
            <Text style={styles.filterLabel}>Dish Types: </Text>
            <View style={styles.dropdown}>
              <View style={styles.dropdownItem}>
                <MaterialCommunityIcons name="silverware-variant" size={18} />
                <Text style={{paddingLeft: 6}}>Dinner</Text>
              </View>
              <MaterialCommunityIcons name="menu-down-outline" size={24} />
            </View>
          </View>

          <View
            style={[
              styles.filtersContainers,
              styles.dropDownContainer
            ]}
          >
            <Text style={styles.filterLabel}>Cuisine: </Text>
            <View style={styles.dropdown}>
              <View style={styles.dropdownItem}>
                <Emoji name="jp" />
                <Text style={{paddingLeft: 6}}>Japanese</Text>
              </View>
              <MaterialCommunityIcons name="menu-down-outline" size={24} />
            </View>
          </View>
          <View style={{ ...styles.borderline }} />
          <View style={[styles.filtersContainers, styles.checkBoxContainer]}>
            <View style={styles.labelAndCheckbox}>
              <Text style={styles.filterLabel}>Vegetarian: </Text>
              <Pressable
                style={[styles.checkboxBase, { marginRight: 35 }]}
                onPress={() => {}}
              >
              </Pressable>
            </View>
            <View style={styles.labelAndCheckbox}>
              <Text style={styles.filterLabel}>Vegan: </Text>
              <Pressable
                style={[styles.checkboxBase, { marginRight: 35 }]}
                onPress={() => {}}
              >
              </Pressable>
            </View>
          </View>

          <View style={[styles.filtersContainers, styles.checkBoxContainer]}>
            <View style={styles.labelAndCheckbox}>
              <Text style={styles.filterLabel}>Gluten Free: </Text>
              <Pressable
                style={[styles.checkboxBase, { marginRight: 35 }]}
                onPress={() => {}}
              >
              </Pressable>
            </View>
            <View style={styles.labelAndCheckbox}>
              <Text style={styles.filterLabel}>Dairy Free: </Text>
              <Pressable
                style={[styles.checkboxBase, { marginRight: 35 }]}
                onPress={() => {}}
              >
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.applyContainer} />
    </View>
  );
}

export default function ProtectedBurgerScreen() {
  React.useEffect(() => {
    setTimeout(() => {
      Alert.alert(
        "😕Uh-Oh...",
        "Please create a Savor account or, login to apply Recipe Filters.\n\n" +
        "You will get access to our Smart Recommendation feature and, it's completely free!")
    }, 500);
  })
  return (
    <View style={styles.overlay}>
      <FakeBurgerScreen />
    </View>
  )

}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "relative",
    left: 0,
    top: 0,
    opacity: 0.4
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colorPalette.background,
  },

  subContainer: {
    flex: 10,
    marginTop: 8,
    // paddingBottom: 100,
    // justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.9,
    height: _screen.height * 0.8,
    borderRadius: 15,
    paddingTop: 30,
    ...shadowStyle,
  },

  filtersContainers: {
    marginVertical: 8,
    width: _screen.width * 0.85,
    height: _screen.height * 0.04,
    borderRadius: 15,
    // backgroundColor: colorPalette.popLight,
  },

  smartFilterContainer: {
    flexDirection: "row",
    paddingHorizontal: 45,
    justifyContent: "space-between",
    alignItems: "center",
  },

  z1: {
    elevation: 1000,
    zIndex: 1000,
  },

  z2: {
    elevation: 2000,
    zIndex: 2000,
  },

  dropDownContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },

  dropdown: {
    flexDirection: "row",
    paddingTop: 1,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: _screen.width * 0.5,
    height: _screen.height * 0.03,
    borderRadius: 15,
    backgroundColor: colorPalette.background,
  },

  dropdownItem: {
    flexDirection: "row",
  },

  checkBoxContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },

  labelAndCheckbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: _screen.width * 0.44,
  },

  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: colorPalette.background,
  },

  checkboxChecked: {
    backgroundColor: "white",
  },

  applyContainer: {
    flex: 1,
    marginVertical: 50,
    paddingTop: 50
  },

  applyButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 200,
    borderRadius: 10,
    padding: 8,
    borderColor: "grey",
    borderWidth: 0.2
  },

  borderline: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: _screen.width * 0.85,
    opacity: 0.2,
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    marginVertical: 40,
  },

  filterLabel: {
    fontSize: 18,
  }
});

