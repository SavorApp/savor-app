import { User, UserAction, Recipe, RecipeAction, UserRecipeListAction, Filters, FiltersAction, UserRecipe } from "../../../types"


// User Actions
export const setUser = (user: User):UserAction => {
    return {
        type: "LOGIN_USER",
        payload: user
    }
}

export const removeUser = (user: User):UserAction => {
    return {
        type: "LOGOUT_USER",
        payload: user
    }
}

// User Recipe List Actions
export const addtoUserRecipeList = (recipe: UserRecipe):UserRecipeListAction => {
    return {
        type: "ADD_USER_RECIPE_LIST",
        payload: recipe
    }
}

// Filters Actions
export const updateFilters = (filters: Filters):FiltersAction => {
    return {
        type: "UPDATE_FILTERS",
        payload: filters
    }
}