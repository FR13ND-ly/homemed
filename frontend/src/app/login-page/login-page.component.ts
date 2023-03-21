import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { FilesService } from '../shared/data-access/files.service';
import { UserService } from '../shared/data-access/user.service';
import { login, loginSuccess } from '../store/user/user.actions';
import { userSelector } from '../store/user/user.selector';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  
  constructor(private store : Store, private userService: UserService, private filesService : FilesService, private router : Router) {}

  user$ = this.store.select(userSelector)
  login: boolean = true

  user : any = {
    uid : 0,
    type : "doctor",
    name : "",
    email : "",
    photoURL : "",
    address : "2",
    phone : "3",
    doctorId : "",
    validationImageId : "",
    invitationCode : "",
    birthday: ""
  }

  onGoogleLogin() {
    this.userService.GoogleAuth().pipe(
      map((user : any) => {
        this.user.uid = user.uid
        this.user.email = user.email
        this.user.name = user.displayName
        this.user.photoURL = user.photoURL
        return {...user, type: this.user.type}
      }),
      switchMap((user : any) => this.userService.checkExist(user))
    ).subscribe((res : any) : any => {
      if (res.exists) return this.router.navigate(['/dashboard/', res.type])
      this.user.doctorId = res.doctorId
      this.login = false
    })
  }

  onUpload(e : any) {
    this.filesService.addFile(e.target.files[0]).subscribe((res : any) => console.log(res))
  }

  onRegister() {
    this.userService.register(this.user).subscribe((res) => {
      this.store.dispatch(loginSuccess({user: res}))
      this.router.navigate(['/dashboard/', this.user.type])
    })
  }

  onUploadValidationImage(e : any) {
    this.filesService.addFile(e.target.files[0]).subscribe((res : any) => {
      this.user.validationImageId = res
    })
  }
}
