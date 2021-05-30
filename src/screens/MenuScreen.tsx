import React from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import colorPalette from "../constants/ColorPalette";
import Constants from 'expo-constants';
import axios from "axios";
import CardStack, { Card } from 'react-native-card-stack-swiper';
import RecipeCard from '../components/RecipeCard';
import SwipeButtons from '../components/SwipeButtons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importing JSON data for development and testing
import * as recipesJson from "../data/recipes.json";
import { initialState } from "../redux/reducers/recipe"
import { Recipe, RootState, UserState } from "../../types";
import { useSelector } from "react-redux";

const _screen = Dimensions.get("screen");

// Initializing Spoonacular resources
const API_KEY = Constants.manifest.extra?.SPOONACULAR_API_KEY;
const randRecipeUrl = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&`


export default function MenuScreen() {
    const [randRecipes, setRandRecipes] = React.useState<Recipe[]>([initialState.recipe]);
    const userState = useSelector<RootState, UserState>((state) => state.userState);
    
    // FOR TEST PURPOSES
    const[swipedLeftRecipes, setSwipedLeftRecipes] = React.useState<Recipe[]>([]);
    const[swipedRightRecipes, setSwipedRightRecipes] = React.useState<Recipe[]>([]);

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

    async function onSwipedLeft(idx: number) {
        console.log('Swiped left');
        // const query = `query getUser {
        //     users{
        //       id
        //       username
        //     }
        //   }`

        // const user = await axios({
        //     url: 'https://savored-server.herokuapp.com/',
        //     method: 'get',
        //     data: {
        //         query: query,
        //     }
        // })
        // TODO: store it the database instead
        console.log(userState);
        swipedLeftRecipes.push(randRecipes[idx]);
        setSwipedLeftRecipes(swipedLeftRecipes);
    }

    function onSwipedRight(idx: number) {
        console.log('Swiped right');
        // TODO: store it the database instead
        console.log(userState);
        swipedRightRecipes.push(randRecipes[idx])
        setSwipedRightRecipes(swipedRightRecipes);
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
                <CardStack style={styles.cardStack} ref={swiper => { swiper = swiper }} disableBottomSwipe disableTopSwipe>
                    {randRecipes.map((rcp: Recipe, idx: number) => {
                        return <Card key={rcp.id} onSwipedLeft={() => { onSwipedLeft(idx) }} onSwipedRight={() => { onSwipedRight(idx) }}><RecipeCard rcp={rcp} id={rcp.id} /></Card>
                    })}
                </CardStack>
            </View>
            <TouchableOpacity  onPress={() => {this.swiper.swipeRight()}}>
                <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="black"/>
            </TouchableOpacity>
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