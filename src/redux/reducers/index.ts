import { userReducer } from "./user";
import { recipeReducer } from "./recipe"
import { recipeListReducer } from "./recipeList"
import { filtersReducer } from "./filters"
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    userState: userReducer,
    recipeState: recipeReducer,
    recipeListState: recipeListReducer,
    filtersState: filtersReducer
});

export default rootReducer;