import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, tap } from "rxjs/operators";
import { UserService } from "src/app/shared/data-access/user.service";
import { login, loginSuccess, logout } from "./user.actions";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions<any>, private userService : UserService) {}

    login$ = createEffect(() : any => this.actions$.pipe(
        ofType(login.type),
        switchMap(() => this.userService.GoogleAuth().pipe(
            map((res : any) => loginSuccess({user : res.user}))
        ))
        )
    )

    logout$ = createEffect(() : any => this.actions$.pipe(
        ofType(logout.type),
        tap(() => this.userService.logout())
    ))
}