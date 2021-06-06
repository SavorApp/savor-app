import React from "react";
import Emoji from "react-native-emoji";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Map {
    [id: string]: JSX.Element;
}

interface Bundler {
    [id: string]: string;
}

export const cuisineMap: Map = {
    All: <Emoji name="rainbow-flag"/>,
    American: <Emoji name="us"/>,
    British: <Emoji name="gb"/>,
    Chinese: <Emoji name="cn"/>,
    French: <Emoji name="fr"/>,
    German: <Emoji name="de"/>,
    Greek: <Emoji name="flag-gr"/>,
    Indian: <Emoji name="flag-in"/>,
    Irish: <Emoji name="flag-ie" />,
    Italian: <Emoji name="it"/>,
    Japanese: <Emoji name="jp"/>,
    Korean: <Emoji name="kr"/>,
    Mexican: <Emoji name="flag-mx"/>,
    Spanish: <Emoji name="es" />,
    Thai: <Emoji name="flag-th"/>,
    Vietnamese: <Emoji name="flag-vn"/>
}

export const dishTypeMap: Map = {
    All: <MaterialCommunityIcons name="emoticon-outline" />,
    Breakfast: <MaterialCommunityIcons name="silverware-variant" />,
    Lunch: <MaterialCommunityIcons name="silverware-variant" />,
    Dinner: <MaterialCommunityIcons name="silverware-variant" />,
    Appetizer: <MaterialCommunityIcons name="silverware-spoon" />,
    Dessert: <MaterialCommunityIcons name="cupcake" />,
    Beverage: <MaterialCommunityIcons name="glass-cocktail" />
}

export const dishTypeBundler: Bundler = {
    breakfast: "breakfast,",
    lunch: "lunch,",
    dinner: "dinner,",
    appetizer: "appetizer,",
    dessert: "dessert,",
    beverage: "beverage,"
}
