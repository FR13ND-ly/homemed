import { createFeatureSelector, createSelector } from "@ngrx/store";

export const userSelector = createFeatureSelector("user")

export const getUser = createSelector(
    userSelector,
    (state: any) => state.user
)