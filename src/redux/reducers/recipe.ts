import { RecipeAction, RecipeState } from "../../../types";

// Initialize initial Recipe State
export const initialState: RecipeState = {
    recipe: {
        id: 1991,
        sourceUrl: "",
        image: "",
        imageType: "",
        title: "",
        diets: [],
        cuisines: [],
        dishTypes: [],
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        veryHealthy: false,
        cheap: false,
        veryPopular: false,
        sustainable: false,
        aggregateLikes: null,
        spoonacularScore: null,
        healthScore: null,
        pricePerServing: null,
        readyInMinutes: null,
        servings: null,
        ingredients: [],
        smartFilterScore: null
      }
}

// Initialize recipeReducer with initialState and Action type
export const recipeReducer = (state: RecipeState = initialState, action: RecipeAction) => {
    switch(action.type) {
        // When...
        case "NEW_ACTION_HERE": {
            return state
        }
        // Default...
        default: 
            return state;
    }
}