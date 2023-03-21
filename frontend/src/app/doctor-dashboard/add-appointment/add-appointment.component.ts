import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppointmentsService } from 'src/app/shared/data-access/appointments.service';
import { DoctorService } from 'src/app/shared/data-access/doctor.service';
import { getUser } from 'src/app/store/user/user.selector';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {

  constructor(
    private appointmentsService: AppointmentsService,
    private doctorService: DoctorService,
    private store: Store,
    public dialog: MatDialog
  ) {}

  uid!: any;

  user$: any = this.store.select(getUser).pipe(
    filter((user) => !!user),
    tap((res) => (this.uid = res.uid))
  );

  patients$: any = this.user$.pipe(
    filter((user) => !!user),
    switchMap((user: any) => this.doctorService.getPatients(user.uid))
  );

  addAppointment(form: any) {
    let appointments = {
      uid: this.uid,
      patientId: form.form.value.patient,
      scheduledDate: form.form.value.date.replace('T', ' '),
      title: form.form.value.title,
      duration: form.form.value.duration,
      description: form.form.value.details,
      important: form.form.value.important,
    };
    this.appointmentsService.addAppointment(appointments).subscribe(() => this.dialog.closeAll())
  }
}
