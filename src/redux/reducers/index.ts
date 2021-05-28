import { userReducer, UserState } from "./user";
import { combineReducers } from "redux";

export type RootState = {
    userState: UserState
}

const rootReducer = combineReducers({
    userState: userReducer
});

export default rootReducer;