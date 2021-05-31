import { userReducer } from "./user";
import { recipeReducer } from "./recipe"
import { userRecipeListReducer } from "./UserRecipeList"
import { filtersReducer } from "./filters"
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    userState: userReducer,
    recipeState: recipeReducer,
    userRecipeListState: userRecipeListReducer,
    filtersState: filtersReducer
});

export default rootReducer;