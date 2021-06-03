import { FiltersAction, FiltersState } from "../../../types";

// Initialize initial Filters State
export const initialState: FiltersState = {
<<<<<<< HEAD
  filters: {
    smartFilter: false,
    dishType: "dinner",
    cuisine: "",
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    readyInMinutes: 0,
    servings: 0,
  },
};
=======
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
>>>>>>> 210f6c3dfad3a7a3bd5b2ae26993d60b795ed086

// Initialize filtersReducer with initialState and Action type
export const filtersReducer = (
  state: FiltersState = initialState,
  action: FiltersAction
) => {
  switch (action.type) {
    // When user changes a filter...
    case "SET_FILTERS": {
      return action.payload;
    }
    // When user changes a filter...
    case "UPDATE_FILTERS": {
      return {
        ...state,
        filters: { ...action.payload },
      };
    }
    case "RESET_FILTERS": {
      return {
        filters: {
          smartFilter: false,
          dishType: "dinner",
          cuisine: "",
          vegetarian: false,
          vegan: false,
          glutenFree: false,
          dairyFree: false,
          readyInMinutes: 0,
          servings: 0,
        },
      };
    }
    // Default...
    default:
      return state;
  }
};
