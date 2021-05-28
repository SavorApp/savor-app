import { userReducer } from "./user";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    userState: userReducer
});

export default rootReducer;