import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs';
import { AppointmentsService } from 'src/app/shared/data-access/appointments.service';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { getUser } from 'src/app/store/user/user.selector';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AppointmentEditorComponent } from './appointment-editor/appointment-editor.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
  constructor(
    private appointmentsService: AppointmentsService,
    private doctorService: DoctorService,
    private store: Store,
    public dialog: MatDialog
  ) {}

  uid: any = '';

  user$: any = this.store.select(getUser).pipe(
    filter((user) => !!user),
    tap((res) => (this.uid = res.uid))
  );

  appointments$: any = this.user$.pipe(
    filter((user) => !!user),
    switchMap((user: any) => this.appointmentsService.getAppointments(user.uid))
  );

  patients$: any = this.user$.pipe(
    filter((user) => !!user),
    switchMap((user: any) => this.doctorService.getPatients(user.uid))
  );

  onAddAppointment() {
    let dialog = this.dialog.open(AddAppointmentComponent)
    this.appointments$ = dialog.afterClosed().pipe(
      switchMap(() => this.user$.pipe(
        filter((user) => !!user),
        switchMap((user: any) => this.appointmentsService.getAppointments(user.uid)))
    ))
  }

  onDeleteAppointment(id: any) {
    this.appointmentsService.deleteAppointment(id).subscribe(() => {
      this.appointments$ = this.user$.pipe(
        filter((user) => !!user),
        switchMap((user: any) =>
          this.appointmentsService.getAppointments(user.uid)
        )
      );
    });
  }

  onEditAppointment(appointment: any) {
    let dialog = this.dialog.open(AppointmentEditorComponent, {
      data: appointment
    })
    this.appointments$ = dialog.afterClosed().pipe(
      switchMap(() => this.user$.pipe(
        filter((user) => !!user),
        switchMap((user: any) => this.appointmentsService.getAppointments(user.uid)))
    ))
  }
}
