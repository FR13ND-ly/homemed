import { createReducer, on } from "@ngrx/store";
import { login, loginSuccess, logout } from "./user.actions";
import { initialState, noUser, UserState } from "./user.state";

export const userReducer = createReducer(
    
    initialState,

    on(login , (state : UserState) : UserState => {
        return state
    }),
    on(logout, (state: UserState) : UserState => noUser),

    on(loginSuccess, (state: UserState, { user }) : any => {
        console.log(user)
        return {
            initialized: true,
            user
        }
    })
)