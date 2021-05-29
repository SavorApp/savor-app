import { FiltersAction, FiltersState } from "../../../types";

// Initialize initial Filter State
// TODO: 
// - Check mobile cache storage for cached-filters
// - Attempt to retrieve cached-filters and use to set initial state
// - else initialize with initialState
export const initialState: FiltersState = {
    userId: 1991,
    filters: {
        smartFilter: true
    }
}

// Initialize filtersReducer with initialState and Action type
export const filtersReducer = (state: FiltersState = initialState, action: FiltersAction) => {
    switch(action.type) {
        // When user changes a filter...
        case "UPDATE_FILTERS": {
            return {
                ...state,
                filters: {...action.payload}}
        }
        // Default...
        default: 
            return state;
    }
}