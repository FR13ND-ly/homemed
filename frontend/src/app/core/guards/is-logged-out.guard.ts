import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import { userSelector } from 'src/app/store/user/user.selector';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedOutGuard implements CanActivate {
  
  constructor(private store : Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(userSelector).pipe(
      filter((res : any) => res.initialized),
      tap((res : any) => {
        if (res.user) this.router.navigateByUrl('/dashboard/doctor')
      }),
    );
  }
  
}
