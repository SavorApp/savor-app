import React from "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    Platform,
    Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import HTML from "react-native-render-html";
import Constants from "expo-constants";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";

const _screen = Dimensions.get("screen");

export interface MoreInfoScreenProps {
    route: RouteProp<{ params: { rcp: Recipe } }, "params">;
}

export default function MoreInfoScreen({ route }: MoreInfoScreenProps) {
    const { rcp } = route.params;


    // Remove duplicates in array of elements and then map through it to organize the layout
    function Ingredients({ ingredients }: { ingredients: string[] }) {
        const filteredIngredients = [...new Set(ingredients)];

        return (
            <View>
                {filteredIngredients.map((ing, idx) => {
                    return (
                        <View
                            key={"c_" + idx.toString()}
                            style={styles.ingredientContainer}
                        >
                            <Text
                                key={"i_" + idx.toString()}
                                style={styles.ingredient}
                            >
                                {ing}
                            </Text>
                        </View>
                    );
                })}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.title}>{rcp.title}</Text>
                <View style={styles.contentContainer}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.infoTitle}>Quick Info</Text>
                        <Text style={styles.subTitle}>What you will need</Text>
                        <Ingredients ingredients={rcp.ingredients} />
                        <Text style={styles.subTitle}>Instructions</Text>
                        <HTML source={{ html: rcp.instructions }} />
                        <Text style={styles.subTitle}>Additional Information</Text>
                        <Text>Preparation time: {rcp.readyInMinutes} min</Text>
                        <Text>Servings: {rcp.servings}</Text>
                        <View style={styles.tagsContainer}>
                            {rcp.veryHealthy && (
                                <View style={styles.singleTagContainer}>
                                    <MaterialCommunityIcons
                                        name="food-apple-outline"
                                        color="green"
                                    />
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
                                    <MaterialCommunityIcons
                                        name="alpha-v-circle"
                                        color="green"
                                    />
                                    <Text style={styles.tag}>Vegan</Text>
                                </View>
                            )}
                            {rcp.glutenFree && (
                                <View style={styles.singleTagContainer}>
                                    <Text style={[styles.tag, { fontWeight: "bold" }]}>
                                        Gluten Free
                    </Text>
                                </View>
                            )}
                            {rcp.dairyFree && (
                                <View style={styles.singleTagContainer}>
                                    <Text style={[styles.tag, { fontWeight: "bold" }]}>
                                        Dairy Free
                    </Text>
                                </View>
                            )}
                        </View>
                        <Text>{"\n\n\n"}</Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorPalette.background,
    },

    subContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: _screen.width * 0.9,
        height: _screen.height * 0.8,
        borderRadius: 15,
        backgroundColor: colorPalette.primary,
        ...shadowStyle,
    },
    title: {
        margin: 8,
        fontSize: 25,
        fontWeight: "bold",
        color: colorPalette.background,
        textAlign: "center",
    },

    infoTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        textAlign: "center"
    },

    summaryBackground: {
        color: "black",
        marginTop: 5,
        textAlign: "center",
        height: _screen.height * 0.6,
    },

    summaryContainer: {
        marginBottom: 10,
        padding: 5,
        backgroundColor: "white",
        borderRadius: 15,
        width: _screen.width * 0.7,
        ...shadowStyle,
    },

    contentContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: _screen.width * 0.85,
        height: _screen.height * 0.65,
        borderRadius: 15,
        backgroundColor: colorPalette.secondary,
    },

    scrollView: {
        padding: 8,
        marginVertical: Platform.OS === "android" ? 12 : 0,
        width: _screen.width * 0.83,
        borderRadius: 15,
        backgroundColor: colorPalette.secondary,
    },

    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },

    ingredientContainer: {
        flex: 1,
        flexDirection: "row",
    },

    ingredient: {
        justifyContent: "flex-start",
        width: "65%",
    },

    measurement: {
        justifyContent: "flex-start",
        width: "35%",
    },

    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
    },

    singleTagContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 3,
        marginTop: 3,
        padding: 4,
        borderRadius: 8,
        backgroundColor: colorPalette.trimLight,
    },

    tag: {
        fontSize: 10,
    },
});
