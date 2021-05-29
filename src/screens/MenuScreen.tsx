import React from "react";
import { StyleSheet, Dimensions, View, Text, Button } from "react-native";
import colorPalette from "../constants/ColorPalette";
import Constants from 'expo-constants';
import axios from "axios";
import CardStack, { Card } from 'react-native-card-stack-swiper';
import RecipeCard from '../components/RecipeCard';
import SwipeButtons from '../components/SwipeButtons';

// Importing JSON data for development and testing
import * as recipesJson from "../data/recipes.json";
import { initialState } from "../redux/reducers/recipe"
import { Recipe } from "../../types";

const _screen = Dimensions.get("screen");

// Initializing Spoonacular resources
const API_KEY = Constants.manifest.extra?.SPOONACULAR_API_KEY;
const randRecipeUrl = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&`


export default function MenuScreen() {
    const [randRecipes, setRandRecipes] = React.useState<Recipe[]>([initialState.recipe]);

    // Fetch random Recipes from Spoonacular
    async function fetchRandomRecipes() {
        // const resp = await axios.get(randRecipeUrl + "number=10&tags=gluten%20free,vegetarian,dinner,italian")
        // const fetchedRecipes = resp.data.recipes;

        // Filter random recipes based on filters, if applied
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
    }

    function onSwipedLeft() {
        console.log('Swiped left');
    }

    function onSwipedRight() {
        console.log('Swiped right');
    }

    function handleOnPress() {
        console.log('hello')
    }

    // On load, fetch/set random Recipes
    React.useEffect(() => {
        fetchRandomRecipes();
    }, []);

    // TODO: 
    // - On load/before render make API requests for randomized Recipes (Spoonacular)
    // - Apply filters
    // - Compare against User's viewed Recipes list if User is logged in
    // - Apply score and sorting if smart filter is turned on
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <CardStack style={styles.cardStack} ref={swiper => { swiper = swiper }} onSwipedLeft={onSwipedLeft} onSwipedRight={onSwipedRight}>
                    {randRecipes.map((rcp: Recipe) => {
                        return <Card ><RecipeCard rcp={rcp} id={rcp.id} /></Card>
                    })}
                </CardStack>
            </View>
            <SwipeButtons onPress={handleOnPress}/>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorPalette.background
    },

    subContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: _screen.width * 0.9,
        height: _screen.height * 0.6,
        borderRadius: 30,
        backgroundColor: colorPalette.primary
    },

    recipeTextTest: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: 8
    },

    cardStack: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})