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
import { InvitePatientDialogComponent } from '../invite-patient-dialog/invite-patient-dialog.component';
import { FormsModule } from '@angular/forms';
import { AppointmentEditorComponent } from '../appointment-editor/appointment-editor.component';
import { AddAppointmentComponent } from '../add-appointment/add-appointment.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { ConsultationsComponent } from '../consultations/consultations.component';
import { TransferPatientDialogComponent } from '../transfer-patient-dialog/transfer-patient-dialog.component';
import { EmptyTextPipe } from 'src/app/core/pipes/empty-text.pipe';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

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
    PatientDetailsComponent,
    ConsultationsComponent,
    TransferPatientDialogComponent,
    ValidationErrorComponent
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
        { path: '', component: DashboardComponent },
        { path: 'appointments', component: AppointmentsComponent },
        { path: 'patients', component: PatientsComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'consultations', component: ConsultationsComponent },
        { path: 'patient/:uid', component: PatientDetailsComponent },
        { path: 'error', component: ValidationErrorComponent },
      ] }
    ])
  ],
})
export class ShellModule { }
