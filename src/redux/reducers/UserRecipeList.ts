// Initialize initial User Recipe List State
const initialState: UserRecipeListState = {
  userRecipeList: [],
};

// Initialize userRecipeListReducer with initialState and Action type
export const userRecipeListReducer = (
  state: UserRecipeListState = initialState,
  action: UserRecipeListAction
) => {
  switch (action.type) {
    // When user swipes...
    case "SET_USER_RECIPE_LIST": {
      // TODO: clean this up
      // Rename references to recipe's id
      action.payload.map((item) => {
        item["id"] = item["recipe_id"];
        delete item["recipe_id"];
      });
      return {
        userRecipeList: action.payload,
      };
    }
    // When user swipes...
    case "ADD_TO_USER_RECIPE_LIST": {
      return {
        userRecipeList: [...state.userRecipeList, action.payload],
      };
    }
    case "UNSAVOR_RECIPE": {
      const newUserRecipeList = state.userRecipeList.map((rcp) => {
        if (rcp.id === action.payload) {
          rcp.isSavored = false;
        }
        return rcp;
      });
      return {
        userRecipeList: newUserRecipeList,
      };
    }
    case "RESET_USER_RECIPE_LIST": {
      return {
        userRecipeList: [],
      };
    }
    // Default...
    default:
      return state;
  }
};
