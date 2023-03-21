import { Injectable } from '@angular/core';
import { from, of } from "rxjs";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { loginSuccess } from 'src/app/store/user/user.actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly APIUrl = environment.apiURL + 'user/'

  constructor(private http: HttpClient, public afAuth: AngularFireAuth, private store : Store, private router : Router) { }

  init() {
    this.afAuth.onAuthStateChanged((res : any) => {
      if (!res) return;
      this.http.get(`${this.APIUrl}login/${res.uid}/`).subscribe((user : any) => {
        this.store.dispatch(loginSuccess({ user }))
      })
    })
  }

  checkExist(user : any) {
    return this.http.post(`${this.APIUrl}check/`, user)
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  register(user : any) {
    return this.http.post(`${this.APIUrl}register/`, user)
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
        // this.router.navigateByUrl('/dashboard/doctor')
        return user;
      })
    )
  }

  logout() {
    this.afAuth.signOut();
  }
}
