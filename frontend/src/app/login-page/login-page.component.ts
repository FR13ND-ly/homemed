import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';
import { FilesService } from '../shared/data-access/files.service';
import { UserService } from '../shared/data-access/user.service';
import { counties } from '../shared/utils/romanian-counties';
import { login, loginSuccess } from '../store/user/user.actions';
import { userSelector } from '../store/user/user.selector';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  
  constructor(private route : ActivatedRoute, private store : Store, private userService: UserService, private filesService : FilesService, private router : Router) {}

  user$ = this.store.select(userSelector)
  login: boolean = true

  user : any = {
    uid : 0,
    type : "doctor",
    name : "",
    email : "",
    photoURL : "",
    address : "",
    phone : "",
    doctorId : "",
    county : "",
    validationImageId : "",
    availableTimeStart : 8,
    availableTimeEnd : 22,
    invitationCode : "",
    birthday: ""
  }

  ngOnInit(): void {
    this.route.params.pipe(
      filter((params : any) => params.code),
    ).subscribe((params) => {
      this.user.invitationCode = params.code
      this.user.type = "patient"
    })
  }

  range = (start : any, stop : any) =>
    Array(Math.ceil(stop - start)).fill(start).map((x, y) => x + y)

  counties = [...counties]

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
      if (res.exists) return this.router.navigate(['/dashboard/', res.type, "main"])
      this.user.doctorId = res.doctorId
      this.login = false
    })
  }

  onUpload(e : any) {
    this.filesService.addFile(e.target.files[0]).subscribe()
  }

  onRegister() {
    this.userService.register(this.user).subscribe((res) => {
      this.store.dispatch(loginSuccess({user: res}))
      this.router.navigate(['/dashboard/', this.user.type, 'main'])
    })
  }

  onUploadValidationImage(e : any) {
    this.filesService.addFile(e.target.files[0]).subscribe((res : any) => {
      this.user.validationImageId = res
    })
  }
}
