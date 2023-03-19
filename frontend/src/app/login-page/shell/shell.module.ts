import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '../login-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/feature/material.module';



@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: LoginPageComponent }
    ])
  ]
})
export class ShellModule { }
