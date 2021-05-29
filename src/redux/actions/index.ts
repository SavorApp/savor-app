import { User, UserAction, Recipe, RecipeAction, RecipeListAction, Filters, FiltersAction } from "../../../types"


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

// Recipe Actions
export const recipeAction = (recipe: Recipe):RecipeAction => {
    return {
        type: "NEW_ACTION_HERE",
        payload: recipe
    }
}

// Recipe List Actions
export const recipeListAction = (recipeList: Recipe[]):RecipeListAction => {
    return {
        type: "NEW_ACTION_HERE",
        payload: recipeList
    }
}

// Filters Actions
export const updateFilters = (filters: Filters):FiltersAction => {
    return {
        type: "UPDATE_FILTERS",
        payload: filters
    }
}