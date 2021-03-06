import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import HTML from "react-native-render-html";
import { colorPalette, borderLine, font } from "../constants/Styling";
import { useFonts } from "expo-font";

const _screen = Dimensions.get("screen");

export interface MoreInfoScreenProps {
  route: RouteProp<{ params: { rcp: Recipe } }, "params">;
}

export default function MoreInfoScreen({ route }: MoreInfoScreenProps) {
  const { rcp } = route.params;
  const [showSummary, setShowSummary] = React.useState(false);
  const [showIngredients, setShowIngredients] = React.useState(false);
  const [showInstructions, setShowInstructions] = React.useState(false);

  const [fontsLoaded] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  // Filter through an array of ingredient name to remove duplicates and set the display
  function Ingredients({ ingredients }: { ingredients: string[] }) {
    let idx = 0;
    const filteredIngredients = Array.from(new Set(ingredients));

    return (
      <View>
        {filteredIngredients.map((ing) => {
          idx++;
          return (
            <View
              key={"c_" + idx.toString()}
              style={styles.ingredientContainer}
            >
              <Text key={"i_" + idx.toString()} style={styles.ingredient}>
                {ing}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{rcp.title}</Text>
            <View style={styles.borderline} />
            <TouchableOpacity
              style={styles.touchableHeader}
              onPress={() => {
                setShowSummary(!showSummary);
              }}
              activeOpacity={0.8}
            >
              <View style={styles.accordion}>
                <Text style={styles.subTitle}>Summary</Text>
                <Ionicons
                  name={showSummary ? "chevron-up-sharp" : "chevron-down-sharp"}
                  size={24}
                />
              </View>
            </TouchableOpacity>
            {showSummary && (
              <HTML
                tagsStyles={{
                  div: {
                    fontSize: font.contentSize,
                    lineHeight: 24,
                    fontFamily: "OpenSans",
                  },
                  b: { fontFamily: "OpenSansBold" },
                  a: { fontSize: font.contentSize, fontFamily: "OpenSans" },
                }}
                source={{ html: `<div>${rcp.summary} </div>` }}
              />
            )}
            <TouchableOpacity
              style={styles.touchableHeader}
              onPress={() => {
                setShowIngredients(!showIngredients);
              }}
              activeOpacity={0.8}
            >
              <View style={styles.accordion}>
                <Text style={styles.subTitle}>Ingredients</Text>
                <Ionicons
                  name={
                    showIngredients ? "chevron-up-sharp" : "chevron-down-sharp"
                  }
                  size={24}
                />
              </View>
            </TouchableOpacity>
            {showIngredients && <Ingredients ingredients={rcp.ingredients} />}
            <TouchableOpacity
              style={styles.touchableHeader}
              onPress={() => {
                setShowInstructions(!showInstructions);
              }}
              activeOpacity={0.8}
            >
              <View style={styles.accordion}>
                <Text style={styles.subTitle}>Instructions</Text>
                <Ionicons
                  name={
                    showInstructions ? "chevron-up-sharp" : "chevron-down-sharp"
                  }
                  size={24}
                />
              </View>
            </TouchableOpacity>
            {showInstructions && (
              <>
                <Text style={styles.subHeader}>
                  Preparation time:{" "}
                  <Text
                    style={{ fontFamily: "OpenSans" }}
                  >
                    {rcp.readyInMinutes} min
                  </Text>
                </Text>
                <Text style={styles.subHeader}>
                  Servings:{" "}
                  <Text
                    style={{ fontFamily: "OpenSans" }}
                  >
                    {rcp.servings}
                  </Text>
                  {"\n"}
                </Text>
                <HTML
                  tagsStyles={{
                    div: {
                      fontSize: font.contentSize,
                      lineHeight: 24,
                      fontFamily: "OpenSans",
                    },
                    ol: { fontSize: font.contentSize },
                    a: { fontSize: font.contentSize },
                  }}
                  source={{ html: `<div>${rcp.instructions}</div>` }}
                />
              </>
            )}
            <Text>{"\n\n\n"}</Text>
          </ScrollView>
        </View>
        <View style={styles.tagsContainer}>
          {rcp.veryHealthy && (
            <View style={styles.singleTagContainer}>
              <MaterialCommunityIcons name="food-apple-outline" color="green" />
              <Text style={styles.tag}>Healthy Choice</Text>
            </View>
          )}
          {rcp.vegetarian && (
            <View style={styles.singleTagContainer}>
              <MaterialCommunityIcons
                name="alpha-v-circle-outline"
                color="green"
              />
              <Text style={styles.tag}>Vegetarian</Text>
            </View>
          )}
          {rcp.vegan && (
            <View style={styles.singleTagContainer}>
              <MaterialCommunityIcons name="alpha-v-circle" color="green" />
              <Text style={styles.tag}>Vegan</Text>
            </View>
          )}
          {rcp.glutenFree && (
            <View style={styles.singleTagContainer}>
              <Text style={styles.tagBold}>
                Gluten Free
              </Text>
            </View>
          )}
          {rcp.dairyFree && (
            <View style={styles.singleTagContainer}>
              <Text style={styles.tagBold}>
                Dairy Free
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    flex: 12,
    width: _screen.width * 0.93,
  },

  scrollView: {
    paddingTop: _screen.height * 0.01,
  },

  title: {
    fontSize: font.titleSize,
    textAlign: "center",
    fontFamily: "OpenSans",
  },

  borderline: {
    alignSelf: "center",
    ...borderLine,
  },

  accordion: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: _screen.height * 0.01,
  },

  subTitle: {
    fontSize: font.subTitleSize,
    fontFamily: "OpenSansBold",
    marginBottom: _screen.height * 0.01,
  },

  touchableHeader: {
    marginTop: _screen.height * 0.03,
  },

  subHeader: {
    fontSize: font.subHeaderSize,
    fontFamily: "OpenSansBold",
  },

  ingredientContainer: {
    marginTop: 3,
  },

  ingredient: {
    fontSize: font.contentSize,
    fontFamily: "OpenSans",
  },

  tagsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: _screen.height * 0.01,
  },

  singleTagContainer: {
    flexDirection: "row",
    marginHorizontal: 2,
    padding: 3,
    borderRadius: 8,
    backgroundColor: colorPalette.lightGray,
  },

  tag: {
    fontSize: font.tagSize,
    fontFamily: "OpenSans",
  },

  tagBold: {
    fontSize: font.tagSize,
    fontFamily: "OpenSansBold",
  },
});
