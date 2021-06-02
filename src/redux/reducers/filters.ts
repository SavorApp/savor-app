import { FiltersAction, FiltersState } from "../../../types";

// Initialize initial Filters State
export const initialState: FiltersState = {
    userId: "1991",
    filters: {
        smartFilter: false,
        dishType: "dinner",
        cuisine: "",
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        readyInMinutes: 0,
        servings: 0
    }
}

// Initialize filtersReducer with initialState and Action type
export const filtersReducer = (state: FiltersState = initialState, action: FiltersAction) => {
    switch(action.type) {
        // When user changes a filter...
        case "SET_FILTERS": {
            return action.payload;
        }
        // When user changes a filter...
        case "UPDATE_FILTERS": {
            return {
                ...state,
                filters: {...action.payload}
            };
        }
        // Default...
        default: 
            return state;
    }
}