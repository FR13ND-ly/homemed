import { User } from "@angular/fire/auth";

export interface UserState {
    initialized: boolean;
    user: User | null | boolean;
};

export const initialState: UserState = {
    initialized: false,
    user: null
}

export const noUser = {
    initialized: true,
    user: null
}