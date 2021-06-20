import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Emoji from "react-native-emoji";
import { borderLine, colorPalette, font } from "../constants/Styling";

const _screen = Dimensions.get("screen");

function FakeBurgerScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.filtersContainers, styles.smartFilterContainer]}>
        <Text style={styles.labelText}>Smart Recommendations: </Text>
        <Pressable
          style={[styles.checkboxBase, styles.checkboxChecked]}
          onPress={() => {}}
        >
          <MaterialCommunityIcons name="check-bold" size={18} color="#FF5454" />
        </Pressable>
      </View>
      <View style={styles.borderline} />
      <View style={[styles.filtersContainers, styles.dropDownContainer]}>
        <Text style={styles.labelText}>Dish Types: </Text>
        <View style={styles.dropdown}>
          <View style={styles.dropdownItem}>
            <MaterialCommunityIcons name="silverware-variant" size={18} />
            <Text style={{ paddingLeft: 6 }}>Dinner</Text>
          </View>
          <MaterialCommunityIcons name="menu-down-outline" size={24} />
        </View>
      </View>

      <View style={[styles.filtersContainers, styles.dropDownContainer]}>
        <Text style={styles.labelText}>Cuisine: </Text>
        <View style={styles.dropdown}>
          <View style={styles.dropdownItem}>
            <Emoji name="jp" />
            <Text style={{ paddingLeft: 6 }}>Japanese</Text>
          </View>
          <MaterialCommunityIcons name="menu-down-outline" size={24} />
        </View>
      </View>

      <View style={styles.borderline} />
      <View style={[styles.filtersContainers, styles.checkBoxContainer]}>
        <View style={styles.labelAndCheckbox}>
          <Text style={styles.labelText}>Vegetarian: </Text>
          <Pressable
            style={styles.checkboxBase}
            onPress={() => {}}
          ></Pressable>
        </View>

        <View style={styles.labelAndCheckbox}>
          <Text style={styles.labelText}>Vegan: </Text>
          <Pressable
            style={styles.checkboxBase}
            onPress={() => {}}
          ></Pressable>
        </View>
      </View>

      <View style={[styles.filtersContainers, styles.checkBoxContainer]}>
        <View style={styles.labelAndCheckbox}>
          <Text style={styles.labelText}>Gluten Free: </Text>
          <Pressable
            style={styles.checkboxBase}
            onPress={() => {}}
          ></Pressable>
        </View>

        <View style={styles.labelAndCheckbox}>
          <Text style={styles.labelText}>Dairy Free: </Text>
          <Pressable
            style={styles.checkboxBase}
            onPress={() => {}}
          ></Pressable>
        </View>
      </View>
    </View>
  );
}

export default function ProtectedBurgerScreen() {
  React.useEffect(() => {
    setTimeout(() => {
      Alert.alert(
        "😕Uh-Oh...",
        "Please create a Savor account or, login to apply Recipe Filters.\n\n" +
          "You will get access to our Smart Recommendation feature and, it's completely free!"
      );
    }, 500);
  });
  return (
    <View style={styles.overlay}>
      <FakeBurgerScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "relative",
    left: 0,
    top: 0,
    opacity: 0.4,
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: _screen.height * 0.03,
  },

  allFiltersContainer: {
    marginTop: _screen.height * 0.03,
  },

  z1: {
    elevation: 1000,
    zIndex: 1000,
  },

  z2: {
    elevation: 2000,
    zIndex: 2000,
  },

  filtersContainers: {
    marginVertical: _screen.height * 0.01,
    width: _screen.width * 0.93,
  },

  smartFilterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  labelText: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
  },

  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: _screen.width * 0.03,
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: _screen.width * 0.5,
    height: _screen.height * 0.03,
    paddingHorizontal: _screen.width * 0.01,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colorPalette.white,
  },

  dropdownItem: {
    flexDirection: "row",
  },

  dropdownText: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
  },

  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: _screen.width * 0.03,
  },

  labelAndCheckbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: _screen.width * 0.33,
  },

  checkboxBase: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: _screen.width * 0.03,
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colorPalette.darkGray,
    backgroundColor: colorPalette.white,
  },

  checkboxChecked: {},

  applyContainer: {
    flex: 2,
  },

  applyButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 30,
    borderRadius: 10,
    borderWidth: Platform.OS === "android" ? 0.5 : 0.3,
  },

  borderline: {
    alignSelf: "center",
    ...borderLine,
    marginVertical: _screen.height * 0.03,
  },
});
