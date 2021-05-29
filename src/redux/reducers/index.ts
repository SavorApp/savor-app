import { userReducer } from "./user";
import { recipeReducer } from "./recipe"
import { recipeListReducer } from "./recipeList"
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    userState: userReducer,
    recipeState: recipeReducer,
    recipeListState: recipeListReducer
});

export default rootReducer;