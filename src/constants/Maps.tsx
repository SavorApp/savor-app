import React from "react";
import Emoji from "react-native-emoji";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Map {
    [id: string]: JSX.Element;
}

export const cuisineMap: Map = {
    All: <Emoji name="rainbow-flag"/>,
    American: <Emoji name="us"/>,
    Chinese: <Emoji name="cn"/>,
    French: <Emoji name="fr"/>,
    German: <Emoji name="de"/>,
    Greek: <Emoji name="flag-gr"/>,
    Indian: <Emoji name="flag-in"/>,
    Italian: <Emoji name="it"/>,
    Japanese: <Emoji name="jp"/>,
    Korean: <Emoji name="kr"/>,
    Mexican: <Emoji name="flag-mx"/>,
    Thai: <Emoji name="flag-th"/>,
    Vietnamese: <Emoji name="flag-vn"/>
}

export const dishTypeMap: Map = {
    All: <MaterialCommunityIcons name="emoticon-outline" />,
    breakfast: <MaterialCommunityIcons name="silverware-variant" />,
    lunch: <MaterialCommunityIcons name="silverware-variant" />,
    dinner: <MaterialCommunityIcons name="silverware-variant" />,
    dessert: <MaterialCommunityIcons name="cupcake" />,
    beverage: <MaterialCommunityIcons name="glass-cocktail" />
}