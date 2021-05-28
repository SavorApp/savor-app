import { User, UserAction, UserState } from "../../../types";

// Initialize initial User State
// TODO: 
// - Check mobile cache storage for access_token
// - Attempt to authenticate user
// - else initialize with initialState
const initialState: UserState = {
    user: {
        id: 1991,
        username: "",
        image_url: ""
    },
    isLoggedIn: false
}

// Initialize userReducer with initialState and Action type
export const userReducer = (state: UserState = initialState, action: UserAction) => {
    switch(action.type) {
        // When user logs in...
        case "LOGIN_USER": {
            return {
                ...state,
                user: {...action.payload},
                isLoggedIn: true
            }
        }
        // When user logs out...
        case "LOGOUT_USER": {
            return initialState
        }
        // Default...
        default: 
            return state;
    }
}