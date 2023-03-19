import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MessagesComponent } from '../messages/messages.component';
import { SettingsComponent } from '../settings/settings.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/ui/header/header.component';
import { SidebarComponent } from 'src/app/shared/ui/sidebar/sidebar.component';



@NgModule({
  declarations: [
    ShellComponent,
    AppointmentsComponent,
    DashboardComponent,
    MessagesComponent,
    SettingsComponent,
  ],
  imports: [
    HeaderComponent,
    SidebarComponent,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ShellComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'messages', component: MessagesComponent },
        { path: 'appointments', component: AppointmentsComponent },
        { path: 'settings', component: SettingsComponent },
      ] }
    ])
  ]
})
export class ShellModule { }
