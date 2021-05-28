import { Action } from "../actions";

// Set User type
export type User = {
    id: number,
    username: string,
    image_url: string
}

// Set UserState type via interface
export interface UserState {
    user: User
}

// Initialize initial User State
const initialState = {
    user: {
        id: 1991,
        username: "",
        image_url: ""
    }
}

// Initialize userReducer with initialState and Action type
export const userReducer = (state: UserState = initialState, action: Action) => {
    switch(action.type) {
        // When user logs in...
        case "LOGIN_USER": {
            return {user: {...action.payload }}
        }
        default: 
            return state;
    }
}