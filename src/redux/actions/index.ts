import { User } from "../reducers/user"

// Set Action type for User actions
export type Action = {type: string, payload: User}

// User Actions
export const setUser = (user: User):Action => {
    return {
        type: "LOGIN_USER",
        payload: user
    }
}