import { UserRecipeListAction, UserRecipeListState } from "../../../types";

// Attempt authenticate user
// If user passes, fetch user's UserRecipeList
// Else, initialize empty UserRecipeList
// If user logs in, set UserRecipeListState to users data

// Initialize initial User Recipe List State
const initialState: UserRecipeListState = {
    userId: 1991,
    userRecipeList: [
        {
            id: 1919,
            title: "Recipe 1",
            cuisine: "american",
            dishType: "dinner",
            vegetarian: true,
            vegan: false,
            glutenFree: false,
            dairyFree: false,
            readyInMinutes: 15,
            servings: 2,
            isSavored: true
          },
          {
            id: 1929,
            title: "Recipe 2",
            cuisine: "japanese",
            dishType: "lunch",
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            dairyFree: true,
            readyInMinutes: 25,
            servings: 2,
            isSavored: true
          },
          {
            id: 1939,
            title: "Recipe 3",
            cuisine: "mexican",
            dishType: "beverage",
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: false,
            readyInMinutes: 20,
            servings: 4,
            isSavored: true
          },
          {
            id: 1949,
            title: "Recipe 4",
            cuisine: "italian",
            dishType: "dinner",
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            dairyFree: false,
            readyInMinutes: 30,
            servings: 2,
            isSavored: false
          }
    ]
}

// Initialize userRecipeListReducer with initialState and Action type
export const userRecipeListReducer = (state: UserRecipeListState = initialState, action: UserRecipeListAction) => {
    switch(action.type) {
        // When user swipes...
        case "ADD_USER_RECIPE_LIST": {
            return {
                ...state,
                userRecipeList: [
                    ...state.userRecipeList,
                    action.payload
                ]
            }
        }
        // Default...
        default: 
            return state;
    }
}