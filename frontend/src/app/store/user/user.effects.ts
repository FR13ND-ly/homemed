import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs/operators";
import { UserService } from "src/app/shared/data-access/user.service";
import { login, loginSuccess, logout } from "./user.actions";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions<any>, private userService: UserService, private router: Router) {}

    login$ = createEffect(() : any => this.actions$.pipe(
        ofType(login.type),
        switchMap(() => this.userService.GoogleAuth().pipe(
            map((user : any) => loginSuccess({ user }))
        ))
        )
    )

    logout$ = createEffect(() : any => this.actions$.pipe(
        ofType(logout.type),
        tap(() => this.userService.logout())),
        { dispatch: false }
    )
}