import React from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { resetReload } from "../redux/actions";
import axios from "axios";
import RecipeCardStack from "../components/RecipeCardStack";
import LoadingCardStack from "../components/LoadingCardStack";
import { applySmartFilter, constructEndpoint, removeRecentlyViewedRecipes } from "../utils";
// Importing JSON data for development and testing
import * as recipesJson from "../data/100Recipes.json";


// Initializing Spoonacular resources
const API_KEY = Constants.manifest.extra?.SPOONACULAR_API_KEY;
const RAND_RECIPE_BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&`;

export default function MenuScreen() {
  const dispatch = useDispatch();
  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );
  const filtersState = useSelector<RootState, FiltersState>(
    (state) => state.filtersState
  );
  const reloadRecipesState = useSelector<RootState, ReloadRecipesState>(
    (state) => state.reloadRecipesState
  );
  const [randRecipes, setRandRecipes] = React.useState<Recipe[]>([]);
  const [isCardStackLoading, setIsCardStackLoading] =
    React.useState<boolean>(true);

  // Fetch random Recipes from Spoonacular
  async function fetchRandomRecipes() {
    let fetchedRecipes: Recipe[];

    // Endpoint with filters included
    const ENDPOINT = constructEndpoint(filtersState.filters);      

    // Try to fatch data
    try {

      /*
      /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
      UN-COMMENT FOR SPOONACULAR API CALLS
      \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
      */

      // Spoonacular GET request
      // const resp = await axios.get(RAND_RECIPE_BASE_URL + ENDPOINT);
      // // Assign parse data.recipes to fit our Recipep[] type
      // fetchedRecipes = resp.data.recipes.map((rcp: Recipe) => {
      //   // For each Recipe, initialize an ingredients arrat containing ingredient names
      //   const ingredientsArray = (
      //     rcp.extendedIngredients as Array<Ingredient>
      //   ).map((ing: Ingredient): string => {
      //     return ing?.name;
      //   });
      //   // Return the Recipe object with ingredients = Ingredient[]
      //   return {
      //     id: rcp.id,
      //     sourceUrl: rcp.sourceUrl,
      //     image: rcp.image,
      //     imageType: rcp.imageType,
      //     title: rcp.title,
      //     diets: rcp.diets,
      //     cuisines: rcp.cuisines,
      //     dishTypes: rcp.dishTypes,
      //     vegetarian: rcp.vegetarian,
      //     vegan: rcp.vegan,
      //     glutenFree: rcp.glutenFree,
      //     dairyFree: rcp.dairyFree,
      //     veryHealthy: rcp.veryHealthy,
      //     cheap: rcp.cheap,
      //     veryPopular: rcp.veryPopular,
      //     sustainable: rcp.sustainable,
      //     aggregateLikes: rcp.aggregateLikes,
      //     spoonacularScore: rcp.spoonacularScore,
      //     healthScore: rcp.healthScore,
      //     pricePerServing: rcp.pricePerServing,
      //     readyInMinutes: rcp.readyInMinutes,
      //     ingredients: ingredientsArray,
      //     servings: rcp.servings,
      //     smartFilterScore: 0,
      //   };
      // });


      /*
      /\/\/\/\/\/\/\/\/\/\/\/\
      UN-COMMENT FOR JSON DATA
      \/\/\/\/\/\/\/\/\/\/\/\/
      */

      fetchedRecipes = recipesJson.recipes.map((rcp) => {
        const ingredientsArray = (
          rcp.extendedIngredients as Array<Ingredient>
        ).map((ing: Ingredient): string => {
          return ing?.name;
        });
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
          ingredients: ingredientsArray,
          smartFilterScore: 0,
        };
      });

      if (fetchedRecipes.length === 0) {
        Alert.alert(
          "No Recipes Found",
          "Please adjust your filter settings to allow for more recipes to show."
        );
      } else {
        // Remove already viewed Recipes
        const removedViewedRecipes = removeRecentlyViewedRecipes(fetchedRecipes, userRecipeListState.userRecipeList);

        // Apply smartFilter is set to true
        if (filtersState.filters.smartFilter) {
          const finalRandRecipes = applySmartFilter(
            removedViewedRecipes,
            userRecipeListState.userRecipeList
          );
          setRandRecipes(finalRandRecipes);
        } else {
          setRandRecipes(removedViewedRecipes);
        }
        setIsCardStackLoading(false);
      }

      // Catch server erorrs
    } catch (err) {
      // console.log(err)
      Alert.alert(
        "Server Error 🤕",
        "Sorry for the inconvenience, please try again later."
      );
    }
  }

  // On filter update
  React.useEffect(() => {
    setIsCardStackLoading(true);
    fetchRandomRecipes();
  }, [filtersState]);

// on reaload trigger
  React.useEffect(() => {
    // if reload recipe = true
    if (reloadRecipesState.reload) {
      setIsCardStackLoading(true);
      fetchRandomRecipes();
      dispatch(resetReload());
    }
  }, [reloadRecipesState]);


  return isCardStackLoading ? (
    <LoadingCardStack />
  ) : (
    <RecipeCardStack randRecipes={randRecipes} filtersState={filtersState}  />
  );
}