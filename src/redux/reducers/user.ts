import { Action } from "../actions";

// Set User type
export type User = {
    id: number,
    username: string,
    image_url: string
}

// Set UserState type via interface
export interface UserState {
    user: User,
    isLoggedIn: Boolean
}

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
export const userReducer = (state: UserState = initialState, action: Action) => {
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