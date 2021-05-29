import { RecipeListAction, RecipeListState } from "../../../types";

// Initialize initial Recipe List State
const initialState: RecipeListState = {
    recipeList: [
        {
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
            aggregateLikes: 99,
            spoonacularScore: 99,
            healthScore: 99,
            pricePerServing: 199.1,
            readyInMinutes: 30,
            servings: 2
          }
    ]
}

// Initialize recipeListReducer with initialState and Action type
export const recipeListReducer = (state: RecipeListState = initialState, action: RecipeListAction) => {
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