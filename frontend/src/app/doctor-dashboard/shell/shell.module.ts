import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/feature/material.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MessagesComponent } from '../messages/messages.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { PatientsComponent } from '../patients/patients.component';
import { StoreModule } from '@ngrx/store';
import { SettingsComponent } from '../settings/settings.component';
import { SidebarComponent } from 'src/app/shared/ui/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/shared/ui/header/header.component';

@NgModule({
  declarations: [
    ShellComponent,
    DashboardComponent,
    MessagesComponent,
    AppointmentsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule,
    SidebarComponent,
    HeaderComponent,
    RouterModule.forChild([
      { path: '', component: ShellComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'messages', component: MessagesComponent },
        { path: 'appointments', component: AppointmentsComponent },
        { path: 'patients', component: PatientsComponent },
        { path: 'settings', component: SettingsComponent },
      ] }
    ])
  ],
})
export class ShellModule { }
