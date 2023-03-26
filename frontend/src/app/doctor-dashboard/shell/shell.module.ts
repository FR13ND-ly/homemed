import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/feature/material.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { PatientsComponent } from '../patients/patients.component';
import { StoreModule } from '@ngrx/store';
import { SettingsComponent } from '../settings/settings.component';
import { SidebarComponent } from 'src/app/shared/ui/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/shared/ui/header/header.component';
import { InvitePatientDialogComponent } from '../patients/invite-patient-dialog/invite-patient-dialog.component';
import { FormsModule } from '@angular/forms';
import { AddAppointmentComponent } from '../appointments/add-appointment/add-appointment.component';
import { ConsultationsComponent } from '../consultations/consultations.component';
import { EmptyTextPipe } from 'src/app/core/pipes/empty-text.pipe';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { AppointmentEditorComponent } from '../appointments/appointment-editor/appointment-editor.component';
import { TransferPatientDialogComponent } from '../patients/transfer-patient-dialog/transfer-patient-dialog.component';

@NgModule({
  declarations: [
    ShellComponent,
    DashboardComponent,
    AppointmentsComponent,
    SettingsComponent,
    InvitePatientDialogComponent,
    PatientsComponent,
    AppointmentEditorComponent,
    AddAppointmentComponent,
    ConsultationsComponent,
    ValidationErrorComponent,
    TransferPatientDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule,
    FormsModule,
    SidebarComponent,
    HeaderComponent,
    EmptyTextPipe,
    RouterModule.forChild([
      { path: '', component: ShellComponent, children: [
        { path: 'main', component: DashboardComponent },
        { path: 'appointments', component: AppointmentsComponent },
        { path: 'patients', component: PatientsComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'consultations', component: ConsultationsComponent },
        { path: 'error', component: ValidationErrorComponent },
      ] }
    ])
  ],
})
export class ShellModule { }
