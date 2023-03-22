import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SettingsComponent } from '../settings/settings.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/ui/header/header.component';
import { SidebarComponent } from 'src/app/shared/ui/sidebar/sidebar.component';
import { MaterialModule } from 'src/app/shared/feature/material.module';
import { FormsModule } from '@angular/forms';
import { ConsultationsComponent } from '../consultations/consultations.component';
import { MedicalRecordComponent } from '../medical-record/medical-record.component';
import { EmptyTextPipe } from 'src/app/core/pipes/empty-text.pipe';



@NgModule({
  declarations: [
    ShellComponent,
    AppointmentsComponent,
    DashboardComponent,
    SettingsComponent,
    ConsultationsComponent,
    MedicalRecordComponent,
  ],
  imports: [
    HeaderComponent,
    SidebarComponent,
    CommonModule,
    MaterialModule,
    FormsModule,
    EmptyTextPipe,
    RouterModule.forChild([
      { path: '', component: ShellComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'appointments', component: AppointmentsComponent },
        { path: 'consultations', component: ConsultationsComponent },
        { path: 'medical-record', component: MedicalRecordComponent },
        { path: 'settings', component: SettingsComponent },
      ] }
    ])
  ]
})
export class ShellModule { }
