import { UserRecipeListAction, UserRecipeListState } from "../../../types";

// Initialize initial User Recipe List State
const initialState: UserRecipeListState = {
  userId: "1991",
  userRecipeList: [],
};

// Initialize userRecipeListReducer with initialState and Action type
export const userRecipeListReducer = (
  state: UserRecipeListState = initialState,
  action: UserRecipeListAction
) => {
  switch (action.type) {
    // When user swipes...
    case "SET_USER_RECIPE_LIST_STATE": {
      return action.payload;
    }
    // When user swipes...
    case "ADD_TO_USER_RECIPE_LIST": {
      return {
        ...state,
        userRecipeList: [...state.userRecipeList, action.payload],
      };
    }
    // Default...
    default:
      return state;
  }
};
