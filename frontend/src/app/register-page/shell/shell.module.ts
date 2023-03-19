import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from '../register-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/feature/material.module';



@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: RegisterPageComponent }
    ])
  ]
})
export class ShellModule { }
