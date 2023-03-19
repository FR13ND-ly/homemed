import { Injectable } from '@angular/core';
import { from, of } from "rxjs";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afAuth: AngularFireAuth) { }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return from(this.afAuth.signInWithPopup(provider))
  }

  logout() {
    this.afAuth.signOut();
  }
}
