import React from "react";
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
    const dispatch = useDispatch();
    const [randRecipes, setRandRecipes] = React.useState<Recipe[]>([initialState.recipe]);
    const userState = useSelector<RootState, UserState>((state) => state.userState);
    const filtersState = useSelector<RootState, FiltersState>((state) => state.filtersState);
    const userRecipeListState = useSelector<RootState, UserRecipeListState>((state) => state.userRecipeListState);

    // FOR TEST PURPOSES
    const [swipedLeftRecipes, setSwipedLeftRecipes] = React.useState<Recipe[]>([]);
    const [swipedRightRecipes, setSwipedRightRecipes] = React.useState<Recipe[]>([]);
    let cardStackRef = React.useRef<CardStack | any>();

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
    }

    // On focus, fetch/set random Recipes
    useFocusEffect(
        React.useCallback(() => {
            console.log("MenuScreen Focused")
        }, [])
    );

    // On update
    React.useEffect(() => {
        console.log("FROM MENU SCREEN -> dishType:", filtersState.filters.dishType);
        // Fetch new recipes and apply new filters
        fetchRandomRecipes();
        console.log("MenuScreen Filters changed")
        // Re-render the page to update entire cardstack with new stateful values
      }, [filtersState.filters])

    console.log("OUTSIDE MENU SCREEN -> dishType:", filtersState.filters.dishType);
    // Listen to when randRecipes get set
    async function onSwipedLeft(idx: number) {
        console.log("Swiped left");
        // const query = `query getUser {
        //     users {
        //       id
        //       username
        //     }
        //   }`

        // const user = await axios({
        //     url: "https://savored-server.herokuapp.com/",
        //     method: "post",
        //     data: {
        //         query: query,
        //     }
        // })

        // TODO: store it the database instead
        console.log("onSwipedLeft -> dishType:", filtersState.filters.dishType);

        const recipeToBeAdded = {
            id: randRecipes[idx].id,
            title: randRecipes[idx].title,
            // Change cuisne and dishType to be comma separated string value
            cuisine: filtersState.filters.cuisine === "" ? randRecipes[idx].cuisines.toString() : filtersState.filters.cuisine,
            dishType: filtersState.filters.dishType === "" ? randRecipes[idx].dishTypes.toString() : filtersState.filters.dishType,
            vegetarian: randRecipes[idx].vegetarian,
            vegan: randRecipes[idx].vegan,
            glutenFree: randRecipes[idx].glutenFree,
            dairyFree: randRecipes[idx].dairyFree,
            readyInMinutes: randRecipes[idx].readyInMinutes,
            servings: randRecipes[idx].servings,
            isSavored: false
        }


        dispatch(addtoUserRecipeList(recipeToBeAdded))

        swipedLeftRecipes.push(randRecipes[idx]);
        setSwipedLeftRecipes(swipedLeftRecipes);
    }

    async function onSwipedRight(idx: number) {
        console.log("Swiped right");
        // const query = `query getUser {
        //     users {
        //       id
        //       username
        //     }
        //   }`

        // const user = await axios({
        //     url: "https://savored-server.herokuapp.com/",
        //     method: "post",
        //     data: {
        //         query: query,
        //     }
        // })

        // TODO: store it the database instead
        console.log("onSwipedRight -> dishType:", filtersState.filters.dishType);

        const recipeToBeAdded = {
            id: randRecipes[idx].id,
            title: randRecipes[idx].title,
            cuisine: filtersState.filters.cuisine === "" ? randRecipes[idx].cuisines.toString() : filtersState.filters.cuisine,
            dishType: filtersState.filters.dishType === "" ? randRecipes[idx].dishTypes.toString() : filtersState.filters.dishType,
            vegetarian: randRecipes[idx].vegetarian,
            vegan: randRecipes[idx].vegan,
            glutenFree: randRecipes[idx].glutenFree,
            dairyFree: randRecipes[idx].dairyFree,
            readyInMinutes: randRecipes[idx].readyInMinutes,
            servings: randRecipes[idx].servings,
            isSavored: true
        }


        dispatch(addtoUserRecipeList(recipeToBeAdded))

        swipedRightRecipes.push(randRecipes[idx])
        setSwipedRightRecipes(swipedRightRecipes);
    }

    function handleOnPressLeft() {
        cardStackRef.current.swipeLeft();
    }

    function handleOnPressRight() {
        cardStackRef.current.swipeRight();
    }


    // TODO: 
    // - On load/before render make API requests for randomized Recipes (Spoonacular)
    // - Apply filters
    // - Compare against User"s viewed Recipes list if User is logged in
    // - Apply score and sorting if smart filter is turned on
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                {/* {cardsLoading? (
                    <LoadingCard />
                ) : (
                    <RecipeCardStack filtersState={filtersState} />
                )} */}
                <CardStack 
                style={styles.cardStack} 
                ref={(cardStack: CardStack) => { cardStackRef.current = cardStack }} 
                renderNoMoreCards={() => { return <Text>No More Recipes</Text> }} 
                disableBottomSwipe 
                disableTopSwipe>
                    {randRecipes.map((rcp: Recipe, idx: number) => {
                        return (
                            <Card key={rcp.id} onSwipedLeft={() => { onSwipedLeft(idx) }} onSwipedRight={() => { onSwipedRight(idx) }}>
                                <RecipeCard rcp={rcp} id={rcp.id} />
                            </Card>
                        )
                    })}
                </CardStack>
            </View>
            <SwipeButtons handleOnPressLeft={handleOnPressLeft} handleOnPressRight={handleOnPressRight} />
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
        backgroundColor: colorPalette.primary,
        ...shadowStyle
    },

    recipeTextTest: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: 8
    },

    cardStack: {
        justifyContent: "center",
        alignItems: "center"
    }
})