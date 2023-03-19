import { Injectable } from '@angular/core';
import { from, of } from "rxjs";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { loginSuccess } from 'src/app/store/user/user.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afAuth: AngularFireAuth, private store : Store, private router : Router) { }

  init() {
    this.afAuth.onAuthStateChanged((res : any) => {
      let user : any = false
      if (res) {
        user = {
          uid: res.uid,
          email: res.email,
          displayName: res.displayName,
          photoURL: res.photoURL,
        }
      }
      this.store.dispatch(loginSuccess({ user }))
    })
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return from(this.afAuth.signInWithPopup(provider)).pipe(
      map((res: any) => {
        const user = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        }
        this.router.navigateByUrl('/dashboard/doctor')
        return user;
      })
    )
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/')
  }
}
