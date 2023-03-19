import { ActionReducerMap } from "@ngrx/store";
import { State } from "./app.state";
import * as userReducer from "./user/user.reducer";

export const reducers : ActionReducerMap<State> = {
    user: userReducer.userReducer
}