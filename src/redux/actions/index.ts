import { User, UserAction } from "../../../types"


// User Actions
export const setUser = (user: User):UserAction => {
    return {
        type: "LOGIN_USER",
        payload: user
    }
}

export const removeUser = (user: User):UserAction => {
    return {
        type: "LOGOUT_USER",
        payload: user
    }
}