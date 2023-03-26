import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvantagesComponent } from '../ui/advantages/advantages.component';
import { HeroComponent } from '../ui/hero/hero.component';
import { FooterComponent } from '../ui/footer/footer.component';
import { InformationPaneComponent } from '../ui/information-pane/information-pane.component';
import { ReviewsComponent } from '../ui/reviews/reviews.component';
import { ShellComponent } from './shell.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../ui/header/header.component';
import { MaterialModule } from 'src/app/shared/feature/material.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdvantagesComponent,
    HeroComponent,
    FooterComponent,
    InformationPaneComponent,
    ReviewsComponent,
    HeaderComponent,
    ShellComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShellComponent }
    ])
  ]
})
export class ShellModule { }
