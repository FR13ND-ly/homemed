import { User } from "@angular/fire/auth";
import { createAction, props } from "@ngrx/store";

export const login = createAction("[User] Login",);

export const logout = createAction("[User] Logout");

export const loginSuccess = createAction(
    "[User] Login Success",
    props<{ user: any }>()
);