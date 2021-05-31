import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import Constants from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { addtoUserRecipeList } from "../redux/actions"
import axios from "axios";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import CardStack, { Card } from "react-native-card-stack-swiper";
import RecipeCard from "../components/RecipeCard";
import SwipeButtons from "../components/SwipeButtons";
import RecipeCardStack from "../components/RecipeCardStack"
import LoadingCardStack from "../components/LoadingCardStack"

// Importing JSON data for development and testing
import * as recipesJson from "../data/recipes.json";
import { initialState } from "../redux/reducers/recipe"
import { Recipe, RootState, UserState, FiltersState, UserRecipeListState, LoggedInParamList } from "../../types";

const _screen = Dimensions.get("screen");

// Initializing Spoonacular resources
const API_KEY = Constants.manifest.extra?.SPOONACULAR_API_KEY;
const randRecipeUrl = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&`


export default function MenuScreen() {
    // useDispatch allows us to dispatch Actions to mutate global store variables
    const [randRecipes, setRandRecipes] = React.useState<Recipe[]>([initialState.recipe]);
    const [isCardStackLoading, setIsCardStackLoading] = React.useState<boolean>(false);
    const filtersState = useSelector<RootState, FiltersState>((state) => state.filtersState);


    // Fetch random Recipes from Spoonacular
    async function fetchRandomRecipes() {
        // const resp = await axios.get(randRecipeUrl + "number=10&tags=gluten%20free,vegetarian,dinner,italian")
        // const fetchedRecipes = resp.data.recipes;

        // Filter random recipes based on filters
        // Filter random recipes based on already viewed recipes by user
        // Apply smart logic if turned on
        const filteredRecipes = recipesJson.recipes.map((rcp) => {
            return {
                id: rcp.id,
                sourceUrl: rcp.sourceUrl,
                image: rcp.image,
                imageType: rcp.imageType,
                title: rcp.title,
                diets: rcp.diets,
                cuisines: rcp.cuisines,
                dishTypes: rcp.dishTypes,
                vegetarian: rcp.vegetarian,
                vegan: rcp.vegan,
                glutenFree: rcp.glutenFree,
                dairyFree: rcp.dairyFree,
                veryHealthy: rcp.veryHealthy,
                cheap: rcp.cheap,
                veryPopular: rcp.veryPopular,
                sustainable: rcp.sustainable,
                aggregateLikes: rcp.aggregateLikes,
                spoonacularScore: rcp.spoonacularScore,
                healthScore: rcp.healthScore,
                pricePerServing: rcp.pricePerServing,
                readyInMinutes: rcp.readyInMinutes,
                servings: rcp.servings,
            }
        })

        setRandRecipes(filteredRecipes);
        setIsCardStackLoading(false)
    }

    // On focus, fetch/set random Recipes
    useFocusEffect(
        React.useCallback(() => {
            console.log("MenuScreen Focused")
            fetchRandomRecipes()
        }, [])
    );

    // On update
    React.useEffect(() => {
        console.log("FROM MENU SCREEN -> dishType:", filtersState.filters.dishType);
        // Fetch new recipes and apply new filters

        console.log("MenuScreen Filters changed");
        // Re-render the page to update entire cardstack with new stateful value

        setIsCardStackLoading(true)
        changeRandomRecipes();
    }, [filtersState])

    // Helper function 
    function shuffleRecipes(array: Recipe[]) {
        array.sort(() => Math.random() - .5);
    }

    function changeRandomRecipes() {
        const newRandomRecipes = recipesJson.recipes.map((rcp) => {
            return {
                id: rcp.id,
                sourceUrl: rcp.sourceUrl,
                image: rcp.image,
                imageType: rcp.imageType,
                title: rcp.title,
                diets: rcp.diets,
                cuisines: rcp.cuisines,
                dishTypes: rcp.dishTypes,
                vegetarian: rcp.vegetarian,
                vegan: rcp.vegan,
                glutenFree: rcp.glutenFree,
                dairyFree: rcp.dairyFree,
                veryHealthy: rcp.veryHealthy,
                cheap: rcp.cheap,
                veryPopular: rcp.veryPopular,
                sustainable: rcp.sustainable,
                aggregateLikes: rcp.aggregateLikes,
                spoonacularScore: rcp.spoonacularScore,
                healthScore: rcp.healthScore,
                pricePerServing: rcp.pricePerServing,
                readyInMinutes: rcp.readyInMinutes,
                servings: rcp.servings,
            }
        })

        shuffleRecipes(newRandomRecipes);
        setRandRecipes(newRandomRecipes);
        setIsCardStackLoading(false);
    }

    console.log("OUTSIDE MENU SCREEN -> dishType:", filtersState.filters.dishType);
    // Listen to when randRecipes get set
    // TODO: 
    // - On load/before render make API requests for randomized Recipes (Spoonacular)
    // - Apply filters
    // - Compare against User"s viewed Recipes list if User is logged in
    // - Apply score and sorting if smart filter is turned on
    return (

        isCardStackLoading ?
            <LoadingCardStack /> :
            <RecipeCardStack randRecipes={randRecipes} filtersState={filtersState} />
    )
}
