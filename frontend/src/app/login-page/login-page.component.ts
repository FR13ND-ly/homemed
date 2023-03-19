import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../store/user/user.actions';
import { userSelector } from '../store/user/user.selector';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private store : Store) {}

  user$ = this.store.select(userSelector)
  
  onGoogleLogin() {
    this.store.dispatch(login())
  }
}
